import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { useRestaurant } from '../../Context/RestaurantContext';
import { laravelApi, formatLaravelErrors } from '../../lib/api';
import { 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  Coins, 
  Printer, 
  CheckCircle2, 
  Utensils, 
  ShoppingBag, 
  AlertCircle,
  WifiOff,
  Sparkles,
  ArrowRight,
  User,
  Hash,
  ReceiptText,
  Eye
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Separator } from '../ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Label } from '../ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { MenuItem, OrderItem, OrderType, SelectedModifier } from '../../types';

export const AdminPos: React.FC = () => {
  const {
    settings,
    categories,
    menuItems,
    orders,
    printEscPosReceipt,
    setReceiptModalOrder,
    setViewingOrder,
    getPaymentStatus,
    getUnpaidBalance,
    isOffline,
    currentUser,
  } = useRestaurant();

  const [activeCategoryId, setActiveCategoryId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Active POS Cart / Ticket
  const [posItems, setPosItems] = useState<OrderItem[]>([]);
  const [orderType, setOrderType] = useState<OrderType>('dine_in');
  const [tableNumber, setTableNumber] = useState('Table 1');
  const [customerName, setCustomerName] = useState('Walk-in Guest');
  const [notes, setNotes] = useState('');

  // Payment Modal
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [cashTendered, setCashTendered] = useState<string>('');
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Dish Modifier selection for POS
  const [configuringDish, setConfiguringDish] = useState<MenuItem | null>(null);
  const [selectedMods, setSelectedMods] = useState<SelectedModifier[]>([]);
  const [dishNotes, setDishNotes] = useState('');

  const subtotal = posItems.reduce((sum, item) => sum + item.total_price, 0);
  const tax = Number((subtotal * settings.tax_rate).toFixed(2));
  const grandTotal = Number((subtotal + tax).toFixed(2));

  const filteredDishes = menuItems.filter(item => {
    const matchesCat = activeCategoryId === 'all' || item.category_id === activeCategoryId;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleDishClick = (dish: MenuItem) => {
    if (!dish.is_available) return;

    if (dish.modifier_groups.length > 0) {
      // Open quick modifier picker
      setConfiguringDish(dish);
      const defMods: SelectedModifier[] = [];
      dish.modifier_groups.forEach(g => {
        if (g.required && g.options.length > 0) {
          defMods.push({
            group_name: g.name,
            option_name: g.options[0].name,
            extra_price: g.options[0].extra_price,
          });
        }
      });
      setSelectedMods(defMods);
      setDishNotes('');
    } else {
      // Add immediately
      addItemToPos(dish, [], '');
    }
  };

  const addItemToPos = (dish: MenuItem, mods: SelectedModifier[], specialNotes: string) => {
    const extraPrice = mods.reduce((sum, m) => sum + m.extra_price, 0);
    const unitPrice = dish.price + extraPrice;

    setPosItems(prev => {
      const existing = prev.find(
        i =>
          i.menu_item_id === dish.id &&
          JSON.stringify(i.selected_modifiers) === JSON.stringify(mods) &&
          i.notes === specialNotes
      );

      if (existing) {
        return prev.map(i =>
          i === existing
            ? { ...i, quantity: i.quantity + 1, total_price: Number((unitPrice * (i.quantity + 1)).toFixed(2)) }
            : i
        );
      }

      return [
        ...prev,
        {
          id: `oi-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          menu_item_id: dish.id,
          name: dish.name,
          quantity: 1,
          unit_price: unitPrice,
          total_price: unitPrice,
          notes: specialNotes || undefined,
          selected_modifiers: mods,
        },
      ];
    });

    setConfiguringDish(null);
  };

  const updateItemQty = (index: number, delta: number) => {
    setPosItems(prev =>
      prev
        .map((item, idx) => {
          if (idx === index) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            return {
              ...item,
              quantity: nextQty,
              total_price: Number((item.unit_price * nextQty).toFixed(2)),
            };
          }
          return item;
        })
        .filter(Boolean) as OrderItem[]
    );
  };

  const clearPosTicket = () => {
    setPosItems([]);
    setCustomerName('Walk-in Guest');
    setNotes('');
  };

  const isCashierOrAdmin = currentUser && (currentUser.role === 'cashier' || currentUser.role === 'admin');

  const handleOpenPayment = () => {
    if (posItems.length === 0) return;
    if (!isCashierOrAdmin) {
      setPaymentError('Only authorized Cashiers can collect payments at the POS counter register.');
      setIsPaymentModalOpen(true);
      return;
    }
    setCashTendered(grandTotal.toString());
    setPaymentError(null);
    setIsPaymentModalOpen(true);
  };

  const handleProcessCashOrder = async (tenderAmount: number) => {
    if (!isCashierOrAdmin) {
      setPaymentError('Payment failed: Only authorized Cashiers can tender cash at the counter.');
      return;
    }

    if (tenderAmount < grandTotal) {
      setPaymentError(`Tendered amount ($${tenderAmount.toFixed(2)}) is less than total ($${grandTotal.toFixed(2)})`);
      return;
    }

    try {
      const result = await laravelApi.pos.createOrder({
        customer_name: customerName.trim() || 'Walk-in Guest',
        type: orderType,
        table_number: orderType === 'dine_in' ? tableNumber : undefined,
        notes: notes.trim() || undefined,
        items: posItems,
      });

      await laravelApi.pos.recordPayment({
        order_id: result.id,
        amount: grandTotal,
        tendered: tenderAmount,
        notes: `Tendered $${tenderAmount.toFixed(2)} cash at counter register by Cashier ${currentUser.name}`,
        cashier_name: currentUser.name,
      });

      router.reload({ only: ['orders'] });
      setIsPaymentModalOpen(false);
      clearPosTicket();
    } catch (err) {
      const errors = formatLaravelErrors(err);
      setPaymentError(errors.join('\n'));
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col lg:flex-row bg-stone-950 overflow-hidden">
      
      {/* Left Area: Menu Catalog & Categories */}
      <div className="flex-1 flex flex-col border-r border-stone-800 h-full overflow-hidden">
        
        {/* Top Filter Bar */}
        <div className="p-3.5 border-b border-stone-800 bg-stone-900/60 flex items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <Input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Filter quick menu items..."
              className="pl-9 h-9 text-xs bg-stone-950 border-stone-800 rounded-xl"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Recent Orders dropdown to view any order with payment status */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs border-stone-800 bg-stone-950 hover:bg-stone-900 text-stone-300 hover:text-amber-400 gap-1.5 rounded-xl font-bold"
                >
                  <ReceiptText className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Recent Tickets</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-stone-900 border-stone-800 text-stone-200 p-1 rounded-xl">
                <DropdownMenuLabel className="text-xs font-bold text-stone-400 flex items-center justify-between px-2 py-1.5">
                  <span>Recent POS & Customer Orders</span>
                  <span className="text-[10px] text-amber-400">{orders.length} total</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-stone-800" />
                <div className="max-h-72 overflow-y-auto space-y-1 p-1">
                  {orders.slice(0, 6).map(ord => {
                    const pStatus = getPaymentStatus(ord);
                    const due = getUnpaidBalance(ord);

                    return (
                      <button
                        key={ord.id}
                        onClick={() => setViewingOrder(ord)}
                        className="w-full text-left p-2 rounded-lg bg-stone-950/60 hover:bg-stone-800/80 border border-stone-800/60 transition flex items-center justify-between gap-2 text-xs group cursor-pointer"
                      >
                        <div className="space-y-0.5 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-amber-400">#{ord.order_number}</span>
                            <span className="text-stone-300 font-semibold truncate">{ord.customer_name}</span>
                          </div>
                          <div className="text-[10px] text-stone-500">
                            {ord.items.length} items • {new Date(ord.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>

                        <div className="text-right shrink-0 space-y-0.5">
                          <div className="font-mono font-bold text-stone-200">${ord.total.toFixed(2)}</div>
                          <Badge
                            variant={
                              pStatus === 'paid'
                                ? 'success'
                                : pStatus === 'partially_paid'
                                ? 'amber'
                                : 'destructive'
                            }
                            className="text-[9px] px-1.5 py-0 capitalize font-bold block"
                          >
                            {pStatus.replace('_', ' ')}
                          </Badge>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {isOffline && (
              <Badge variant="amber" className="text-[10px] gap-1 animate-pulse">
                <WifiOff className="w-3 h-3" />
                POS Offline (Queuing Local)
              </Badge>
            )}
            <Badge variant="outline" className="text-[10px] font-mono border-stone-700">
              Cashier: {currentUser?.name || 'Staff'}
            </Badge>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="p-2 border-b border-stone-800/80 bg-stone-900/30 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveCategoryId('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              activeCategoryId === 'all'
                ? 'bg-amber-500 text-stone-950'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            All Items ({menuItems.length})
          </button>
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCategoryId(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeCategoryId === c.id
                  ? 'bg-amber-500 text-stone-950'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Dishes Grid */}
        <div className="flex-1 p-3.5 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 content-start">
          {filteredDishes.map(dish => (
            <button
              key={dish.id}
              onClick={() => handleDishClick(dish)}
              disabled={!dish.is_available}
              className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between h-28 relative cursor-pointer group ${
                dish.is_available
                  ? 'bg-stone-900/90 border-stone-800 hover:border-amber-500/80 hover:bg-stone-850 shadow-sm'
                  : 'bg-stone-950 border-stone-900 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="space-y-0.5">
                <div className="flex items-start justify-between gap-1">
                  <h4 className="text-xs font-bold text-stone-100 line-clamp-2 group-hover:text-amber-400">
                    {dish.name}
                  </h4>
                </div>
                {dish.modifier_groups.length > 0 && (
                  <span className="text-[10px] text-stone-400 block font-mono">
                    +{dish.modifier_groups.length} mods
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-800/60">
                <span className="text-xs font-black text-amber-400">
                  ${dish.price.toFixed(2)}
                </span>
                <span className="w-5 h-5 rounded-lg bg-stone-800 text-stone-300 flex items-center justify-center text-xs group-hover:bg-amber-500 group-hover:text-stone-950 transition">
                  +
                </span>
              </div>
            </button>
          ))}
        </div>

      </div>

      {/* Right Area: Active POS Ticket & Cash Register */}
      <div className="w-full lg:w-96 bg-stone-900 flex flex-col h-full border-t lg:border-t-0 border-stone-800">
        
        {/* Ticket Header & Type Controls */}
        <div className="p-3.5 border-b border-stone-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-stone-100 uppercase tracking-wider flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-amber-400" />
              Current POS Ticket
            </span>
            {posItems.length > 0 && (
              <button
                onClick={clearPosTicket}
                className="text-stone-400 hover:text-red-400 text-xs font-semibold"
              >
                Clear
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setOrderType('dine_in')}
              className={`p-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer border ${
                orderType === 'dine_in'
                  ? 'bg-amber-500 text-stone-950 border-amber-500'
                  : 'bg-stone-950 border-stone-800 text-stone-400'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Dine-In</span>
            </button>
            <button
              type="button"
              onClick={() => setOrderType('takeaway')}
              className={`p-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer border ${
                orderType === 'takeaway'
                  ? 'bg-amber-500 text-stone-950 border-amber-500'
                  : 'bg-stone-950 border-stone-800 text-stone-400'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Takeaway</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Input
              value={customerName}
              onChange={e => setCustomerName(e.target.value)}
              placeholder="Guest Name"
              className="h-8 text-xs bg-stone-950 border-stone-800"
            />
            {orderType === 'dine_in' ? (
              <Input
                value={tableNumber}
                onChange={e => setTableNumber(e.target.value)}
                placeholder="Table #"
                className="h-8 text-xs bg-stone-950 border-stone-800"
              />
            ) : (
              <div className="h-8 flex items-center px-2.5 rounded-xl bg-stone-950 text-stone-400 text-xs border border-stone-800">
                Front Counter
              </div>
            )}
          </div>
        </div>

        {/* Ticket Items List */}
        <div className="flex-1 p-3 overflow-y-auto space-y-2">
          {posItems.length === 0 ? (
            <div className="py-12 text-center text-stone-500 space-y-2">
              <Coins className="w-8 h-8 mx-auto text-stone-600" />
              <p className="text-xs">Ticket is empty</p>
              <p className="text-[11px] text-stone-600">Click dishes on the left to add items</p>
            </div>
          ) : (
            posItems.map((item, idx) => (
              <div
                key={item.id}
                className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs flex flex-col gap-1.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-bold text-stone-200">{item.name}</span>
                    {item.selected_modifiers.length > 0 && (
                      <div className="text-[10px] text-stone-400">
                        {item.selected_modifiers.map(m => m.option_name).join(', ')}
                      </div>
                    )}
                    {item.notes && (
                      <span className="text-[10px] text-amber-400 italic block">
                        "{item.notes}"
                      </span>
                    )}
                  </div>
                  <span className="font-extrabold text-amber-400 whitespace-nowrap">
                    ${item.total_price.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1.5 border-t border-stone-900">
                  <div className="flex items-center gap-1 bg-stone-900 border border-stone-800 rounded-lg p-0.5">
                    <button
                      onClick={() => updateItemQty(idx, -1)}
                      className="w-5 h-5 flex items-center justify-center text-stone-300 hover:text-stone-100"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold text-stone-100">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateItemQty(idx, 1)}
                      className="w-5 h-5 flex items-center justify-center text-stone-300 hover:text-stone-100"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <span className="text-[11px] text-stone-500">
                    @ ${item.unit_price.toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Financials & Cash Pay Button */}
        <div className="p-3.5 border-t border-stone-800 bg-stone-950 space-y-2.5">
          <div className="space-y-1 text-xs text-stone-300">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold text-stone-100">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax ({(settings.tax_rate * 100).toFixed(2)}%):</span>
              <span className="font-semibold text-stone-100">${tax.toFixed(2)}</span>
            </div>
            <Separator className="my-1" />
            <div className="flex justify-between text-base font-black text-stone-100">
              <span>Total Due:</span>
              <span className="text-amber-400 font-mono">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <Button
            id="pos-cash-tender-btn"
            disabled={posItems.length === 0}
            onClick={handleOpenPayment}
            className="w-full h-12 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm rounded-xl gap-2 shadow-lg shadow-amber-500/20"
          >
            <Coins className="w-5 h-5" />
            <span>Tender Cash & Print (${grandTotal.toFixed(2)})</span>
          </Button>
        </div>

      </div>

      {/* POS Quick Modifier Dialog */}
      {configuringDish && (
        <Dialog open={!!configuringDish} onOpenChange={open => !open && setConfiguringDish(null)}>
          <DialogContent className="max-w-md bg-stone-900 border-stone-800 text-stone-100 p-5 rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-base font-extrabold">{configuringDish.name}</DialogTitle>
              <DialogDescription className="text-xs text-stone-400">
                Select required options and add-ons
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2 max-h-72 overflow-y-auto">
              {configuringDish.modifier_groups.map(group => (
                <div key={group.id} className="space-y-1.5 border-t border-stone-800 pt-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>{group.name}</span>
                    {group.required && <Badge variant="amber" className="text-[9px]">Req</Badge>}
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {group.options.map(opt => {
                      const isSel = selectedMods.some(
                        m => m.group_name === group.name && m.option_name === opt.name
                      );
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            if (group.max_selection === 1) {
                              setSelectedMods(prev => [
                                ...prev.filter(m => m.group_name !== group.name),
                                { group_name: group.name, option_name: opt.name, extra_price: opt.extra_price },
                              ]);
                            } else {
                              setSelectedMods(prev =>
                                isSel
                                  ? prev.filter(m => !(m.group_name === group.name && m.option_name === opt.name))
                                  : [...prev, { group_name: group.name, option_name: opt.name, extra_price: opt.extra_price }]
                              );
                            }
                          }}
                          className={`p-2 rounded-xl text-left text-xs border transition cursor-pointer ${
                            isSel
                              ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                              : 'bg-stone-950 border-stone-800 text-stone-300'
                          }`}
                        >
                          <div className="truncate">{opt.name}</div>
                          <div className="text-[10px] text-amber-400 font-bold">
                            {opt.extra_price > 0 ? `+$${opt.extra_price.toFixed(2)}` : 'Free'}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <Input
                  value={dishNotes}
                  onChange={e => setDishNotes(e.target.value)}
                  placeholder="POS Kitchen note (e.g. well done)"
                  className="text-xs bg-stone-950 border-stone-800"
                />
              </div>
            </div>

            <Button
              onClick={() => addItemToPos(configuringDish, selectedMods, dishNotes)}
              className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs h-10 rounded-xl"
            >
              Add Dish to POS Ticket
            </Button>
          </DialogContent>
        </Dialog>
      )}

      {/* Fast Cash Tender Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="max-w-md bg-stone-900 border-stone-800 text-stone-100 p-5 rounded-2xl space-y-4">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-base font-black flex items-center gap-2">
                <Coins className="w-5 h-5 text-amber-400" />
                <span>Counter Register</span>
              </DialogTitle>
              <Badge variant="outline" className="text-[10px] border-amber-500/40 bg-amber-500/10 text-amber-300">
                Cashier: {currentUser?.name || 'Authorized Cashier'}
              </Badge>
            </div>
            <DialogDescription className="text-xs text-stone-400">
              Counter cash settlement • Total Due: <strong className="text-amber-400 text-sm font-black font-mono">${grandTotal.toFixed(2)}</strong>
            </DialogDescription>
          </DialogHeader>

          {/* Quick Cash Buttons */}
          <div className="space-y-2">
            <Label className="text-xs font-bold text-stone-300">Quick Tender Shortcuts</Label>
            <div className="grid grid-cols-4 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCashTendered(grandTotal.toFixed(2))}
                className="h-10 text-xs font-mono font-bold border-stone-700 bg-stone-950"
              >
                Exact (${grandTotal.toFixed(2)})
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setCashTendered('20')}
                className="h-10 text-xs font-mono font-bold border-stone-700 bg-stone-950"
              >
                $20.00
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setCashTendered('50')}
                className="h-10 text-xs font-mono font-bold border-stone-700 bg-stone-950"
              >
                $50.00
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setCashTendered('100')}
                className="h-10 text-xs font-mono font-bold border-stone-700 bg-stone-950"
              >
                $100.00
              </Button>
            </div>
          </div>

          {/* Cash Input */}
          <div className="space-y-1.5">
            <Label htmlFor="cash-input" className="text-xs font-bold text-stone-300">
              Custom Amount Tendered ($)
            </Label>
            <Input
              id="cash-input"
              type="number"
              step="0.01"
              value={cashTendered}
              onChange={e => setCashTendered(e.target.value)}
              className="text-lg font-mono font-bold h-11 bg-stone-950 border-stone-800 text-amber-400"
            />
          </div>

          {/* Change Display */}
          {Number(cashTendered) >= grandTotal && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-emerald-300">
              <span className="text-xs font-bold">Change to Return:</span>
              <span className="text-lg font-mono font-black text-emerald-400">
                ${(Number(cashTendered) - grandTotal).toFixed(2)}
              </span>
            </div>
          )}

          {paymentError && (
            <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{paymentError}</span>
            </div>
          )}

          <Button
            onClick={() => handleProcessCashOrder(Number(cashTendered))}
            disabled={!cashTendered || Number(cashTendered) < grandTotal}
            className="w-full h-11 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm rounded-xl gap-2 shadow-lg shadow-amber-500/20"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Complete Sale & Print Receipt</span>
          </Button>

        </DialogContent>
      </Dialog>

    </div>
  );
};
