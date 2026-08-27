import React, { useState } from 'react';
import { useRestaurant } from '../../Context/RestaurantContext';
import { 
  ReceiptText, 
  Clock, 
  CheckCircle2, 
  Utensils, 
  ShoppingBag, 
  Coins, 
  Printer, 
  Copy, 
  Check, 
  AlertCircle, 
  ChefHat, 
  X, 
  Sparkles,
  ArrowRight,
  ExternalLink,
  Ban,
  User as UserIcon,
  Phone,
  Layers,
  FileText,
  Lock,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Order, OrderStatus } from '../../types';

export const OrderDetailsDialog: React.FC = () => {
  const {
    orders,
    viewingOrder,
    setViewingOrder,
    getPaymentStatus,
    getAmountPaid,
    getUnpaidBalance,
    updateOrderStatus,
    recordCashPayment,
    printEscPosReceipt,
    setReceiptModalOrder,
    setActiveSurface,
    setActiveTrackingToken,
    currentUser,
  } = useRestaurant();

  // Find live instance of viewing order to ensure reactive state updates
  const order: Order | null = viewingOrder
    ? orders.find(o => o.id === viewingOrder.id) || viewingOrder
    : null;

  const [copiedToken, setCopiedToken] = useState(false);
  const [tenderAmount, setTenderAmount] = useState<string>('');
  const [paymentNotes, setPaymentNotes] = useState('');
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!order) return null;

  const unpaidBalance = getUnpaidBalance(order);
  const totalPaid = getAmountPaid(order);
  const paymentStatus = getPaymentStatus(order);
  const isCashierOrAdmin = currentUser && (currentUser.role === 'cashier' || currentUser.role === 'admin');

  const handleCopyToken = () => {
    navigator.clipboard.writeText(order.tracking_token);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const handleRecordPayment = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!isCashierOrAdmin) {
      setPaymentError('Payment restricted: Customers pay at the counter, and only authorized Cashiers can record payments.');
      return;
    }

    const amount = Number(tenderAmount);

    if (isNaN(amount) || amount <= 0) {
      setPaymentError('Please enter a valid payment amount.');
      return;
    }

    setPaymentError(null);
    try {
      const recorded = recordCashPayment(
        order.id,
        Math.min(amount, unpaidBalance),
        amount,
        paymentNotes || `Cash received at counter by Cashier ${currentUser.name}`
      );

      setPaymentSuccess(true);
      setTenderAmount('');
      setPaymentNotes('');
      setTimeout(() => setPaymentSuccess(false), 3000);

      // Also offer updated receipt
      const updated = orders.find(o => o.id === order.id);
      if (updated) {
        printEscPosReceipt(updated);
      }
    } catch (err: any) {
      setPaymentError(err?.message || 'Failed to record payment');
    }
  };

  const handleOpenTracker = () => {
    setActiveTrackingToken(order.tracking_token);
    setActiveSurface('public_tracker');
    setViewingOrder(null);
  };

  const handleQuickPreset = (preset: number) => {
    setTenderAmount(preset.toFixed(2));
  };

  const lifecycleStages: { id: OrderStatus; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'pending', label: 'Ticket Received', icon: Clock },
    { id: 'preparing', label: 'Kitchen In Prep', icon: ChefHat },
    { id: 'ready', label: 'Ready at Pass', icon: Sparkles },
    { id: 'completed', label: 'Completed / Served', icon: CheckCircle2 },
  ];

  const currentStageIdx = order.status === 'cancelled' ? -1 : lifecycleStages.findIndex(s => s.id === order.status);

  return (
    <Dialog open={!!viewingOrder} onOpenChange={open => !open && setViewingOrder(null)}>
      <DialogContent 
        className="max-w-2xl max-h-[90vh] bg-stone-900 border-stone-800 text-stone-100 p-0 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-stone-800 bg-stone-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xl sm:text-2xl font-black text-amber-400">
                #{order.order_number}
              </span>

              {/* Order Channel Badge */}
              <Badge 
                variant="outline" 
                className="text-xs font-semibold border-stone-700 bg-stone-900 text-stone-300 gap-1"
              >
                {order.type === 'dine_in' ? (
                  <>
                    <Utensils className="w-3.5 h-3.5 text-amber-400" />
                    <span>Dine-In {order.table_number ? `(${order.table_number})` : ''}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Takeaway Pickup</span>
                  </>
                )}
              </Badge>

              {/* Kitchen Status Badge */}
              <Badge
                variant={
                  order.status === 'completed'
                    ? 'success'
                    : order.status === 'ready'
                    ? 'amber'
                    : order.status === 'preparing'
                    ? 'default'
                    : order.status === 'cancelled'
                    ? 'destructive'
                    : 'secondary'
                }
                className="text-xs uppercase font-black tracking-wider px-2.5 py-0.5"
              >
                {order.status}
              </Badge>

              {/* Payment Status Badge */}
              <Badge
                variant={
                  paymentStatus === 'paid'
                    ? 'success'
                    : paymentStatus === 'partially_paid'
                    ? 'amber'
                    : 'destructive'
                }
                className="text-xs capitalize font-bold px-2.5 py-0.5"
              >
                {paymentStatus.replace('_', ' ')}
              </Badge>
            </div>

            <p className="text-xs text-stone-400 flex flex-wrap items-center gap-2">
              <span>Placed {new Date(order.created_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</span>
              <span>•</span>
              <span className="font-mono text-stone-400">
                Token: <strong className="text-stone-200">{order.tracking_token}</strong>
              </span>
              <button
                onClick={handleCopyToken}
                className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 transition underline underline-offset-2 ml-1"
                title="Copy tracking token"
              >
                {copiedToken ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedToken ? 'Copied' : 'Copy'}</span>
              </button>
            </p>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* 1. Lifecycle Progression Tracker & Quick Actions */}
          <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Kitchen & Service Lifecycle
              </h3>
              
              {/* Quick status transitions */}
              <div className="flex items-center gap-1.5">
                {order.status === 'pending' && (
                  <Button
                    size="sm"
                    onClick={() => updateOrderStatus(order.id, 'preparing')}
                    className="h-7 text-xs bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg gap-1"
                  >
                    <ChefHat className="w-3 h-3" />
                    Start Prep
                  </Button>
                )}
                {order.status === 'preparing' && (
                  <Button
                    size="sm"
                    onClick={() => updateOrderStatus(order.id, 'ready')}
                    className="h-7 text-xs bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    Mark Ready at Pass
                  </Button>
                )}
                {order.status === 'ready' && (
                  <Button
                    size="sm"
                    onClick={() => updateOrderStatus(order.id, 'completed')}
                    className="h-7 text-xs bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold rounded-lg gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    Complete / Served
                  </Button>
                )}
                {order.status !== 'completed' && order.status !== 'cancelled' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateOrderStatus(order.id, 'cancelled')}
                    className="h-7 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg"
                  >
                    <Ban className="w-3 h-3 mr-1" />
                    Cancel Order
                  </Button>
                )}
              </div>
            </div>

            {/* Stepper Display */}
            {order.status === 'cancelled' ? (
              <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>This order was cancelled. Reserved inventory was restored to ledger.</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {lifecycleStages.map((stage, idx) => {
                  const Icon = stage.icon;
                  const isDone = currentStageIdx > idx;
                  const isCurrent = currentStageIdx === idx;

                  return (
                    <div
                      key={stage.id}
                      className={`p-2.5 rounded-lg border text-center flex flex-col items-center gap-1 transition ${
                        isCurrent
                          ? 'bg-amber-500/15 border-amber-500/50 text-amber-300 font-bold'
                          : isDone
                          ? 'bg-stone-900 border-stone-800 text-stone-300'
                          : 'bg-stone-900/40 border-stone-800/60 text-stone-600'
                      }`}
                    >
                      <div className={`size-6 rounded-full flex items-center justify-center ${
                        isCurrent ? 'bg-amber-500 text-stone-950' : isDone ? 'bg-stone-800 text-amber-400' : 'bg-stone-950 text-stone-600'
                      }`}>
                        {isDone ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-[11px] leading-tight">{stage.label}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. Customer & Service Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider flex items-center gap-1">
                <UserIcon className="w-3 h-3 text-amber-400" />
                Customer Contact
              </span>
              <p className="text-sm font-bold text-stone-100">{order.customer_name}</p>
              {order.customer_phone ? (
                <p className="text-xs text-stone-400 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-stone-500" />
                  {order.customer_phone}
                </p>
              ) : (
                <p className="text-xs text-stone-500 italic">No phone provided</p>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider flex items-center gap-1">
                <Layers className="w-3 h-3 text-amber-400" />
                Fulfillment Location
              </span>
              <p className="text-sm font-bold text-stone-100">
                {order.type === 'dine_in' ? `Table ${order.table_number || 'Unassigned'}` : 'Takeaway Pickup Counter'}
              </p>
              <p className="text-xs text-stone-400">
                Cashier/Register Source: Front-of-House POS
              </p>
            </div>
          </div>

          {/* 3. Itemized Order Contents ("everything within that order") */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-amber-400" />
                Itemized Order Contents ({order.items.reduce((s, i) => s + i.quantity, 0)} items)
              </h3>
            </div>

            <div className="rounded-xl border border-stone-800 overflow-hidden bg-stone-950">
              <div className="divide-y divide-stone-800">
                {order.items.map((item, idx) => (
                  <div key={item.id || idx} className="p-3.5 space-y-1.5 hover:bg-stone-900/30 transition">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="size-6 rounded-md bg-stone-900 border border-stone-800 flex items-center justify-center text-xs font-mono font-bold text-amber-400 shrink-0">
                          {item.quantity}x
                        </span>
                        <div>
                          <p className="text-sm font-bold text-stone-100">{item.name}</p>
                          <p className="text-[11px] text-stone-400 font-mono">
                            ${item.unit_price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                      <span className="font-mono text-sm font-bold text-stone-200">
                        ${item.total_price.toFixed(2)}
                      </span>
                    </div>

                    {/* Modifiers / Customizations */}
                    {item.selected_modifiers && item.selected_modifiers.length > 0 && (
                      <div className="pl-8 flex flex-wrap gap-1.5 pt-0.5">
                        {item.selected_modifiers.map((mod, mIdx) => (
                          <span
                            key={mIdx}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-stone-900 border border-stone-800 text-stone-300 flex items-center gap-1"
                          >
                            <span className="text-stone-400">{mod.group_name}:</span>
                            <span className="font-semibold text-amber-300">{mod.option_name}</span>
                            {mod.extra_price > 0 && (
                              <span className="text-stone-400 font-mono">+${mod.extra_price.toFixed(2)}</span>
                            )}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Item Notes / Cooking Instructions */}
                    {item.notes && (
                      <div className="pl-8 text-xs text-amber-400/90 italic flex items-center gap-1">
                        <span>Note: &ldquo;{item.notes}&rdquo;</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Order-level special instructions */}
              {order.notes && (
                <div className="p-3 bg-stone-900/50 border-t border-stone-800 text-xs text-stone-300 flex items-start gap-2">
                  <FileText className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-200">General Order Note: </span>
                    <span className="italic">{order.notes}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 4. Payment Breakdown & Transaction History */}
          <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                Payment Summary & Financial Breakdown
              </h3>
              <Badge
                variant={
                  paymentStatus === 'paid'
                    ? 'success'
                    : paymentStatus === 'partially_paid'
                    ? 'amber'
                    : 'destructive'
                }
                className="text-[10px] capitalize font-bold"
              >
                {paymentStatus.replace('_', ' ')}
              </Badge>
            </div>

            {/* Calculations Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              <div className="p-3 rounded-lg bg-stone-900 border border-stone-800">
                <span className="text-[10px] text-stone-400 block">Subtotal</span>
                <span className="text-sm font-mono font-bold text-stone-200">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="p-3 rounded-lg bg-stone-900 border border-stone-800">
                <span className="text-[10px] text-stone-400 block">Tax</span>
                <span className="text-sm font-mono font-bold text-stone-200">${order.tax_total.toFixed(2)}</span>
              </div>
              <div className="p-3 rounded-lg bg-stone-900 border border-stone-800">
                <span className="text-[10px] text-stone-400 block">Total Bill</span>
                <span className="text-sm font-mono font-bold text-stone-100">${order.total.toFixed(2)}</span>
              </div>
              <div className={`p-3 rounded-lg border ${
                unpaidBalance > 0 ? 'bg-amber-500/10 border-amber-500/40 text-amber-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              }`}>
                <span className="text-[10px] block opacity-80">
                  {unpaidBalance > 0 ? 'Balance Due' : 'Paid in Full'}
                </span>
                <span className="text-sm font-mono font-black">
                  ${unpaidBalance > 0 ? unpaidBalance.toFixed(2) : totalPaid.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Payment Transactions Ledger */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-stone-300 block">
                Payment Transactions Ledger ({order.payments ? order.payments.length : 0})
              </span>

              {order.payments && order.payments.length > 0 ? (
                <div className="rounded-lg border border-stone-800 divide-y divide-stone-800/80 overflow-hidden bg-stone-900/50">
                  {order.payments.map((p, pIdx) => (
                    <div key={p.id || pIdx} className="p-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 font-bold text-stone-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Cash Payment (${p.amount.toFixed(2)})</span>
                        </div>
                        <p className="text-[11px] text-stone-400">
                          Cashier: <strong className="text-stone-300">{p.cashier_name}</strong> •{' '}
                          {new Date(p.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          {p.notes ? ` • ${p.notes}` : ''}
                        </p>
                      </div>
                      <div className="text-right font-mono text-xs text-stone-400">
                        <div>Tendered: <span className="text-stone-200">${p.tendered.toFixed(2)}</span></div>
                        {p.change_returned > 0 && (
                          <div className="text-emerald-400 text-[11px]">
                            Change: ${p.change_returned.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-stone-900 border border-stone-800 text-xs text-stone-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>No cash payments recorded yet. Total balance of ${order.total.toFixed(2)} remains due.</span>
                </div>
              )}
            </div>

            {/* Inline Collect Cash Form (Restricted to Authorized Cashiers at Counter) */}
            {unpaidBalance > 0 && order.status !== 'cancelled' && (
              isCashierOrAdmin ? (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-3 pt-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                      <Coins className="w-3.5 h-3.5" />
                      <span>Counter Cash Register</span>
                      <Badge variant="outline" className="text-[10px] border-amber-500/40 bg-amber-500/20 text-amber-300 font-normal">
                        Cashier: {currentUser?.name}
                      </Badge>
                    </div>
                    <span className="text-xs font-mono font-bold text-stone-300">
                      Remaining Due: <strong className="text-amber-400 font-extrabold">${unpaidBalance.toFixed(2)}</strong>
                    </span>
                  </div>

                  <p className="text-[11px] text-stone-400">
                    Customer is paying at the counter. Tender cash below to record the payment and issue change:
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickPreset(unpaidBalance)}
                      className="h-7 text-xs border-amber-500/40 bg-amber-500/10 hover:bg-amber-500 hover:text-stone-950 text-amber-300 font-mono font-bold"
                    >
                      Exact (${unpaidBalance.toFixed(2)})
                    </Button>
                    {[20, 50, 100].map(amt => (
                      amt >= unpaidBalance && (
                        <Button
                          key={amt}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickPreset(amt)}
                          className="h-7 text-xs border-stone-800 bg-stone-900 hover:bg-stone-800 text-stone-300 font-mono"
                        >
                          ${amt}.00
                        </Button>
                      )
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-[11px] text-stone-300 font-bold">Amount Tendered ($)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={tenderAmount}
                        onChange={e => setTenderAmount(e.target.value)}
                        className="text-xs font-mono font-bold bg-stone-950 border-stone-800 text-amber-400 h-8"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[11px] text-stone-300 font-bold">Register Note (Optional)</Label>
                      <Input
                        placeholder="e.g. Paid at front counter"
                        value={paymentNotes}
                        onChange={e => setPaymentNotes(e.target.value)}
                        className="text-xs bg-stone-950 border-stone-800 h-8"
                      />
                    </div>
                  </div>

                  {Number(tenderAmount) > unpaidBalance && (
                    <div className="text-xs font-bold text-emerald-400 flex justify-between bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                      <span>Change to Return:</span>
                      <span className="font-mono">${(Number(tenderAmount) - unpaidBalance).toFixed(2)}</span>
                    </div>
                  )}

                  {paymentError && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {paymentError}
                    </p>
                  )}

                  {paymentSuccess && (
                    <p className="text-xs text-emerald-400 flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      Payment successfully recorded by Cashier & receipt queued!
                    </p>
                  )}

                  <Button
                    onClick={() => handleRecordPayment()}
                    className="w-full h-9 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-lg gap-1.5"
                  >
                    <Coins className="w-3.5 h-3.5" />
                    Record Cash Payment (Cashier)
                  </Button>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 space-y-2">
                  <div className="flex items-center gap-2 text-stone-300 text-xs font-bold">
                    <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Pay at Counter • Cashier-Only Action</span>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Customers can only pay at the counter. Only an authorized <strong className="text-stone-200">Cashier</strong> at the register can collect cash and add payments to this ticket.
                  </p>
                  <div className="flex items-center gap-2 pt-1 text-[11px] text-stone-400">
                    <span>Current Auth Context:</span>
                    <Badge variant="outline" className="text-[10px] border-stone-700 bg-stone-950 font-mono">
                      {currentUser ? `${currentUser.name} (${currentUser.role?.replace('_', ' ')})` : 'Public Customer'}
                    </Badge>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-stone-800 bg-stone-950 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                printEscPosReceipt(order);
                setReceiptModalOrder(order);
              }}
              className="h-9 border-stone-800 bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-bold gap-1.5 rounded-xl"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>Thermal Receipt</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenTracker}
              className="h-9 border-stone-800 bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-bold gap-1.5 rounded-xl"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Open Live</span> Tracker
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewingOrder(null)}
            className="h-9 text-xs text-stone-400 hover:text-stone-100 rounded-xl"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
