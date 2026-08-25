import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { 
  Search, 
  ReceiptText, 
  Clock, 
  CheckCircle2, 
  ChefHat, 
  Utensils, 
  Coins, 
  MapPin, 
  AlertCircle, 
  QrCode,
  ArrowRight,
  RefreshCw,
  Copy,
  Printer
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { OrderStatus } from '../../types';

export const PublicOrderTracker: React.FC = () => {
  const {
    settings,
    orders,
    activeTrackingToken,
    setActiveTrackingToken,
    getPaymentStatus,
    getAmountPaid,
    getUnpaidBalance,
    printEscPosReceipt,
    setReceiptModalOrder,
  } = useRestaurant();

  const [searchToken, setSearchToken] = useState(activeTrackingToken || '');
  const [copiedToken, setCopiedToken] = useState(false);

  // Find order by matching tracking token or order number
  const currentOrder = orders.find(
    o =>
      (searchToken && o.tracking_token.toLowerCase() === searchToken.trim().toLowerCase()) ||
      (searchToken && o.order_number.toLowerCase() === searchToken.trim().toLowerCase()) ||
      (activeTrackingToken && o.tracking_token === activeTrackingToken)
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchToken.trim()) {
      setActiveTrackingToken(searchToken.trim().toUpperCase());
    }
  };

  const getStepState = (targetStatus: OrderStatus, currentStatus: OrderStatus) => {
    const sequence: OrderStatus[] = ['pending', 'preparing', 'ready', 'completed'];
    const targetIdx = sequence.indexOf(targetStatus);
    const currentIdx = sequence.indexOf(currentStatus);

    if (currentStatus === 'cancelled') return 'cancelled';
    if (currentIdx > targetIdx) return 'completed';
    if (currentIdx === targetIdx) return 'current';
    return 'upcoming';
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <div className="min-h-screen bg-stone-950 pb-20">
      
      {/* Tracker Header */}
      <section className="border-b border-stone-800 bg-stone-900/40 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="amber" className="text-[10px] font-bold">
              Customer Live Tracker
            </Badge>
            <span className="text-stone-400 text-xs">• Real-Time Broadcast Stream</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-stone-100">
            Track Your Order & Cash Payment Status
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 max-w-xl">
            Enter your anonymous signed order tracking token (or order ticket #) to view live kitchen progress and front-of-house cash payment confirmation.
          </p>

          {/* Search Token Form */}
          <form onSubmit={handleSearch} className="flex gap-2 pt-2 max-w-md">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <Input
                value={searchToken}
                onChange={e => setSearchToken(e.target.value)}
                placeholder="Enter Token (e.g. OT-98F12A or AB-1001)"
                className="pl-9 text-xs font-mono bg-stone-900 border-stone-800 uppercase focus:border-amber-500 rounded-xl"
              />
            </div>
            <Button
              type="submit"
              className="h-10 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl px-4"
            >
              Lookup Ticket
            </Button>
          </form>

          {/* Quick links for demo */}
          <div className="flex items-center gap-2 text-xs text-stone-400 flex-wrap pt-1">
            <span>Recent orders:</span>
            {orders.slice(0, 4).map(o => (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  setSearchToken(o.tracking_token);
                  setActiveTrackingToken(o.tracking_token);
                }}
                className="px-2 py-0.5 rounded-md bg-stone-900 border border-stone-800 text-amber-400 font-mono text-[11px] hover:border-amber-500/50 cursor-pointer"
              >
                #{o.order_number} ({o.status})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Order Details View */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
        {!currentOrder ? (
          <Card className="bg-stone-900/60 border-stone-800 text-center py-16 px-4 rounded-2xl">
            <div className="w-14 h-14 rounded-full bg-stone-800 text-stone-400 mx-auto flex items-center justify-center mb-3">
              <ReceiptText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-200">No active ticket selected</h3>
            <p className="text-xs text-stone-400 max-w-sm mx-auto mt-1 mb-4">
              Please enter your order tracking token above, or select one of the recent restaurant tickets.
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            
            {/* Status Card & Progress Timeline */}
            <Card className="bg-stone-900 border-stone-800 text-stone-100 rounded-2xl overflow-hidden shadow-xl">
              
              <div className="p-5 sm:p-6 border-b border-stone-800/80 bg-stone-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs text-stone-400">TICKET #</span>
                    <h2 className="text-xl font-black text-amber-400 font-mono">{currentOrder.order_number}</h2>
                    <Badge
                      variant={
                        currentOrder.status === 'completed'
                          ? 'success'
                          : currentOrder.status === 'ready'
                          ? 'amber'
                          : currentOrder.status === 'preparing'
                          ? 'default'
                          : 'secondary'
                      }
                      className="text-xs uppercase"
                    >
                      {currentOrder.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-stone-300 mt-1">
                    {currentOrder.type === 'dine_in'
                      ? `Dine-In • ${currentOrder.table_number || 'Table'}`
                      : 'Takeaway / Pickup at Counter'}{' '}
                    • Guest: <strong>{currentOrder.customer_name}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center gap-2 text-xs font-mono">
                    <span className="text-stone-400">Token:</span>
                    <span className="text-amber-400 font-bold">{currentOrder.tracking_token}</span>
                    <button
                      onClick={() => copyToClipboard(currentOrder.tracking_token)}
                      className="text-stone-400 hover:text-stone-100 p-0.5"
                      title="Copy Token"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {copiedToken && <span className="text-[10px] text-emerald-400 font-bold">Copied!</span>}
                </div>
              </div>

              {/* Step Progress Timeline */}
              <div className="p-5 sm:p-6 bg-stone-950/40">
                <div className="grid grid-cols-4 gap-2 sm:gap-4 relative">
                  
                  {/* Step 1: Received */}
                  <div className="text-center space-y-2">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl mx-auto flex items-center justify-center transition ${
                        getStepState('pending', currentOrder.status) === 'current'
                          ? 'bg-amber-500 text-stone-950 font-black ring-4 ring-amber-500/20'
                          : getStepState('pending', currentOrder.status) === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-stone-800 text-stone-500'
                      }`}
                    >
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-200">1. Received</p>
                      <p className="text-[10px] text-stone-400 hidden sm:block">Transmitted to queue</p>
                    </div>
                  </div>

                  {/* Step 2: Preparing */}
                  <div className="text-center space-y-2">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl mx-auto flex items-center justify-center transition ${
                        getStepState('preparing', currentOrder.status) === 'current'
                          ? 'bg-amber-500 text-stone-950 font-black ring-4 ring-amber-500/20 animate-pulse'
                          : getStepState('preparing', currentOrder.status) === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-stone-800 text-stone-500'
                      }`}
                    >
                      <ChefHat className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-200">2. In Kitchen</p>
                      <p className="text-[10px] text-stone-400 hidden sm:block">Wood oven baking</p>
                    </div>
                  </div>

                  {/* Step 3: Ready */}
                  <div className="text-center space-y-2">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl mx-auto flex items-center justify-center transition ${
                        getStepState('ready', currentOrder.status) === 'current'
                          ? 'bg-emerald-500 text-stone-950 font-black ring-4 ring-emerald-500/20 animate-bounce'
                          : getStepState('ready', currentOrder.status) === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-stone-800 text-stone-500'
                      }`}
                    >
                      <Utensils className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-200">3. Ready</p>
                      <p className="text-[10px] text-stone-400 hidden sm:block">At pass / Counter</p>
                    </div>
                  </div>

                  {/* Step 4: Completed */}
                  <div className="text-center space-y-2">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl mx-auto flex items-center justify-center transition ${
                        getStepState('completed', currentOrder.status) === 'current' ||
                        getStepState('completed', currentOrder.status) === 'completed'
                          ? 'bg-emerald-500 text-stone-950 font-black'
                          : 'bg-stone-800 text-stone-500'
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-200">4. Completed</p>
                      <p className="text-[10px] text-stone-400 hidden sm:block">Collected / Closed</p>
                    </div>
                  </div>

                </div>
              </div>

            </Card>

            {/* Two-Column Grid: Cash Payment Ledger & Itemized Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Cash Payment Ledger (Cash-Only Derived Status §4) */}
              <Card className="bg-stone-900 border-stone-800 text-stone-100 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-amber-400" />
                    <h3 className="text-sm font-bold">Counter Cash Payment</h3>
                  </div>
                  <Badge
                    variant={
                      getPaymentStatus(currentOrder) === 'paid'
                        ? 'success'
                        : getPaymentStatus(currentOrder) === 'partially_paid'
                        ? 'amber'
                        : 'destructive'
                    }
                    className="text-[11px] capitalize"
                  >
                    {getPaymentStatus(currentOrder).replace('_', ' ')}
                  </Badge>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Total Order Amount:</span>
                    <span className="font-extrabold text-stone-100">${currentOrder.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Cash Tendered to Cashier:</span>
                    <span className="font-bold text-emerald-400">${getAmountPaid(currentOrder).toFixed(2)}</span>
                  </div>
                  <Separator className="my-1" />
                  <div className="flex justify-between font-black text-sm">
                    <span className="text-stone-200">Remaining Balance:</span>
                    <span className={getUnpaidBalance(currentOrder) > 0 ? 'text-amber-400' : 'text-emerald-400'}>
                      ${getUnpaidBalance(currentOrder).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Payments Recorded */}
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    Payment Receipts ({currentOrder.payments.length})
                  </p>
                  {currentOrder.payments.length === 0 ? (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                      No cash payment recorded yet. Please tender cash to the cashier at the counter.
                    </div>
                  ) : (
                    currentOrder.payments.map((p, idx) => (
                      <div key={p.id} className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs space-y-1">
                        <div className="flex justify-between font-bold text-stone-200">
                          <span>Payment #{idx + 1} ({p.method.toUpperCase()})</span>
                          <span className="text-emerald-400">+${p.amount.toFixed(2)}</span>
                        </div>
                        <p className="text-[11px] text-stone-400">
                          Cashier: {p.cashier_name} • {new Date(p.created_at).toLocaleTimeString()}
                        </p>
                        {p.notes && <p className="text-[11px] text-stone-400 italic">{p.notes}</p>}
                      </div>
                    ))
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    printEscPosReceipt(currentOrder);
                    setReceiptModalOrder(currentOrder);
                  }}
                  className="w-full h-9 border-stone-800 text-stone-300 hover:text-stone-100 text-xs gap-2"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-400" />
                  <span>View ESC/POS Thermal Receipt</span>
                </Button>
              </Card>

              {/* Itemized Order Summary */}
              <Card className="bg-stone-900 border-stone-800 text-stone-100 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold">Ordered Dishes</h3>
                  <span className="text-xs text-stone-400">{currentOrder.items.length} items</span>
                </div>

                <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                  {currentOrder.items.map(item => (
                    <div key={item.id} className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs space-y-1">
                      <div className="flex justify-between font-bold text-stone-200">
                        <span>{item.quantity}x {item.name}</span>
                        <span className="text-amber-400">${item.total_price.toFixed(2)}</span>
                      </div>
                      {item.selected_modifiers.length > 0 && (
                        <div className="space-y-0.5 text-[11px] text-stone-400 pl-2">
                          {item.selected_modifiers.map((m, i) => (
                            <p key={i}>• {m.group_name}: {m.option_name} {m.extra_price > 0 && `(+$${m.extra_price.toFixed(2)})`}</p>
                          ))}
                        </div>
                      )}
                      {item.notes && (
                        <p className="text-[11px] text-amber-300/80 italic pl-2">
                          Note: "{item.notes}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {currentOrder.notes && (
                  <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/80 text-xs">
                    <span className="text-stone-400 font-bold block mb-0.5">Order Instructions:</span>
                    <p className="text-stone-300 italic">{currentOrder.notes}</p>
                  </div>
                )}

                <div className="pt-2 border-t border-stone-800 space-y-1 text-xs text-stone-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-stone-200">${currentOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax ({(settings.tax_rate * 100).toFixed(3)}%)</span>
                    <span className="text-stone-200">${currentOrder.tax_total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-stone-100 pt-1">
                    <span>Total</span>
                    <span className="text-amber-400">${currentOrder.total.toFixed(2)}</span>
                  </div>
                </div>

              </Card>

            </div>

          </div>
        )}
      </main>

    </div>
  );
};

export default PublicOrderTracker;
