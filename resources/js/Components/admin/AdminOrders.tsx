import React, { useState, useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useRestaurant } from '../../context/RestaurantContext';
import { 
  Search, 
  Coins, 
  Printer, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Utensils, 
  ShoppingBag, 
  AlertCircle, 
  ReceiptText,
  MoreHorizontal,
  ChevronRight,
  Sparkles,
  Eye
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Order, OrderStatus, PaymentStatus } from '../../types';
import { DataTable } from '../ui/data-table';
import { DataTableColumnHeader } from '../ui/data-table-column-header';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export const AdminOrders: React.FC = () => {
  const {
    orders,
    updateOrderStatus,
    recordCashPayment,
    getPaymentStatus,
    getAmountPaid,
    getUnpaidBalance,
    printEscPosReceipt,
    setReceiptModalOrder,
    setViewingOrder,
    currentUser,
  } = useRestaurant();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Payment Collection Modal State
  const [collectingOrder, setCollectingOrder] = useState<Order | null>(null);
  const [tenderAmount, setTenderAmount] = useState<string>('');
  const [paymentNotes, setPaymentNotes] = useState('');
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const isCashierOrAdmin = currentUser && (currentUser.role === 'cashier' || currentUser.role === 'admin');

  const handleOpenPaymentModal = (order: Order) => {
    if (!isCashierOrAdmin) {
      setViewingOrder(order);
      return;
    }
    const due = getUnpaidBalance(order);
    setCollectingOrder(order);
    setTenderAmount(due.toFixed(2));
    setPaymentNotes('');
    setPaymentError(null);
  };

  const handleConfirmCashPayment = () => {
    if (!collectingOrder) return;
    if (!isCashierOrAdmin) {
      setPaymentError('Only authorized Cashiers can record counter cash payments.');
      return;
    }
    const amountToPay = Number(tenderAmount);
    const unpaid = getUnpaidBalance(collectingOrder);

    if (isNaN(amountToPay) || amountToPay <= 0) {
      setPaymentError('Please enter a valid payment amount.');
      return;
    }

    try {
      recordCashPayment(
        collectingOrder.id,
        Math.min(amountToPay, unpaid),
        amountToPay,
        paymentNotes || `Cash payment recorded at counter by Cashier ${currentUser.name}`
      );

      const updated = orders.find(o => o.id === collectingOrder.id);
      if (updated) {
        printEscPosReceipt(updated);
        setReceiptModalOrder(updated);
      }

      setCollectingOrder(null);
    } catch (err: any) {
      setPaymentError(err?.message || 'Failed to record payment');
    }
  };

  // Filtered orders feed for DataTable
  const filteredOrders = useMemo(() => {
    return orders.filter(ord => {
      const matchesStatus = statusFilter === 'all' || ord.status === statusFilter;
      const pStatus = getPaymentStatus(ord);
      const matchesPayment = paymentFilter === 'all' || pStatus === paymentFilter;
      const matchesSearch =
        ord.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ord.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ord.tracking_token.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesPayment && matchesSearch;
    });
  }, [orders, statusFilter, paymentFilter, searchQuery, getPaymentStatus]);

  // Column definitions for shadcn DataTable
  const columns = useMemo<ColumnDef<Order>[]>(() => [
    {
      accessorKey: 'order_number',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ticket #" />
      ),
      cell: ({ row }) => {
        const order = row.original;
        return (
          <div 
            onClick={() => setViewingOrder(order)}
            className="space-y-1 cursor-pointer group"
          >
            <div className="flex items-center gap-1.5 font-mono font-black text-amber-400 text-xs group-hover:underline">
              <span>#{order.order_number}</span>
              <Eye className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
            </div>
            <div className="text-[10px] text-stone-500 font-mono">
              Token: <span className="text-stone-300 font-semibold">{order.tracking_token}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'customer_name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer & Channel" />
      ),
      cell: ({ row }) => {
        const order = row.original;
        return (
          <div 
            onClick={() => setViewingOrder(order)}
            className="space-y-0.5 cursor-pointer group"
          >
            <div className="font-bold text-stone-100 text-xs group-hover:text-amber-400 transition-colors">
              {order.customer_name}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-stone-400">
              {order.type === 'dine_in' ? (
                <span className="flex items-center gap-1 text-amber-400 font-medium">
                  <Utensils className="w-3 h-3" />
                  Dine-In ({order.table_number || 'T-?'})
                </span>
              ) : (
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <ShoppingBag className="w-3 h-3" />
                  Takeaway
                </span>
              )}
            </div>
          </div>
        );
      },
    },
    {
      id: 'items',
      header: 'Items Ordered',
      cell: ({ row }) => {
        const order = row.original;
        const totalItems = order.items.reduce((s, i) => s + i.quantity, 0);
        return (
          <div 
            onClick={() => setViewingOrder(order)}
            className="space-y-1 max-w-xs cursor-pointer group"
          >
            <div className="text-xs text-stone-300 flex items-center gap-1 group-hover:text-amber-300 transition-colors">
              <span className="font-semibold">{totalItems} item{totalItems !== 1 ? 's' : ''}:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {order.items.slice(0, 2).map((item) => (
                <span
                  key={item.id}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-stone-950 border border-stone-800 text-stone-300 whitespace-nowrap group-hover:border-stone-700"
                >
                  {item.quantity}x {item.name}
                </span>
              ))}
              {order.items.length > 2 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-950 border border-stone-800 text-amber-400">
                  +{order.items.length - 2} more
                </span>
              )}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Kitchen Status" />
      ),
      cell: ({ row }) => {
        const st = row.original.status;
        return (
          <Badge
            variant={
              st === 'completed'
                ? 'success'
                : st === 'ready'
                ? 'amber'
                : st === 'preparing'
                ? 'default'
                : st === 'cancelled'
                ? 'destructive'
                : 'secondary'
            }
            className="text-[10px] uppercase font-bold tracking-wider"
          >
            {st}
          </Badge>
        );
      },
    },
    {
      id: 'payment_status',
      header: 'Payment Status',
      cell: ({ row }) => {
        const order = row.original;
        const pStatus = getPaymentStatus(order);
        const unpaid = getUnpaidBalance(order);
        return (
          <div className="space-y-1">
            <Badge
              variant={
                pStatus === 'paid'
                  ? 'success'
                  : pStatus === 'partially_paid'
                  ? 'amber'
                  : 'destructive'
              }
              className="text-[10px] capitalize"
            >
              {pStatus.replace('_', ' ')}
            </Badge>
            {unpaid > 0 && order.status !== 'cancelled' && (
              <div className="text-[10px] text-amber-400 font-mono">
                Due: ${unpaid.toFixed(2)}
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'total',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total & Balance" />
      ),
      cell: ({ row }) => {
        const order = row.original;
        const paid = getAmountPaid(order);
        const unpaid = getUnpaidBalance(order);
        return (
          <div className="space-y-0.5 font-mono text-xs">
            <div className="font-bold text-stone-100">${order.total.toFixed(2)}</div>
            <div className="text-[10px] text-stone-400">
              Paid: <span className="text-emerald-400 font-semibold">${paid.toFixed(2)}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'created_at',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Time" />
      ),
      cell: ({ row }) => {
        const date = new Date(row.original.created_at);
        return (
          <div className="text-xs text-stone-400 space-y-0.5">
            <div className="font-mono text-stone-300">
              {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-[10px] text-stone-500">
              {date.toLocaleDateString([], { month: 'short', day: 'numeric' })}
            </div>
          </div>
        );
      },
    },
    {
      id: 'actions',
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const order = row.original;
        const unpaid = getUnpaidBalance(order);

        return (
          <div className="flex items-center justify-end gap-1.5">
            {/* View Order with everything & payment status */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewingOrder(order)}
              className="h-8 border-stone-800 bg-stone-950 hover:bg-stone-900 text-stone-200 hover:text-amber-400 text-[11px] font-bold rounded-lg gap-1 px-2.5"
              title="View Order Details & Payments"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">View</span>
            </Button>

            {unpaid > 0 && order.status !== 'cancelled' && (
              <Button
                size="sm"
                onClick={() => handleOpenPaymentModal(order)}
                className="h-8 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-[11px] rounded-lg gap-1 px-2.5 shadow-sm"
              >
                <Coins className="w-3 h-3" />
                <span>Pay (${unpaid.toFixed(2)})</span>
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                printEscPosReceipt(order);
                setReceiptModalOrder(order);
              }}
              className="h-8 border-stone-800 text-stone-300 hover:text-stone-100 text-[11px] rounded-lg gap-1 px-2"
              title="Print Receipt"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-stone-400 hover:text-stone-100 rounded-lg"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-stone-900 border-stone-800 text-stone-200">
                <DropdownMenuLabel className="text-[10px] text-stone-400">Order Management</DropdownMenuLabel>
                
                <DropdownMenuItem
                  onClick={() => setViewingOrder(order)}
                  className="text-xs text-amber-400 font-bold"
                >
                  <Eye className="w-3.5 h-3.5 mr-2" />
                  View Full Order & Payments
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-stone-800" />

                {order.status === 'pending' && (
                  <DropdownMenuItem
                    onClick={() => updateOrderStatus(order.id, 'preparing')}
                    className="text-xs text-amber-400"
                  >
                    Send to Kitchen (In Prep)
                  </DropdownMenuItem>
                )}

                {order.status === 'preparing' && (
                  <DropdownMenuItem
                    onClick={() => updateOrderStatus(order.id, 'ready')}
                    className="text-xs text-amber-400"
                  >
                    Mark as Ready at Pass
                  </DropdownMenuItem>
                )}

                {order.status === 'ready' && (
                  <DropdownMenuItem
                    onClick={() => updateOrderStatus(order.id, 'completed')}
                    className="text-xs text-emerald-400"
                  >
                    Mark as Completed / Served
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator className="bg-stone-800" />

                {order.status !== 'completed' && order.status !== 'cancelled' && (
                  <DropdownMenuItem
                    onClick={() => updateOrderStatus(order.id, 'cancelled')}
                    className="text-xs text-red-400"
                  >
                    Cancel Order
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ], [getPaymentStatus, getUnpaidBalance, getAmountPaid, printEscPosReceipt, setReceiptModalOrder, setViewingOrder, updateOrderStatus]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      
      {/* Header & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-stone-100">Orders & Cash Register Directory</h1>
            <Badge variant="amber" className="text-[10px] font-mono">
              {orders.length} Total Tickets
            </Badge>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Real-time restaurant tickets, cash payment settlement, and thermal receipts using shadcn DataTable
          </p>
        </div>

        {/* Financial Summary */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs">
            <span className="text-stone-400 block text-[10px]">Unsettled Cash:</span>
            <span className="font-bold text-amber-400">
              ${orders.reduce((sum, o) => sum + getUnpaidBalance(o), 0).toFixed(2)}
            </span>
          </div>
          <div className="px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs">
            <span className="text-stone-400 block text-[10px]">Total Collected:</span>
            <span className="font-bold text-emerald-400">
              ${orders.reduce((sum, o) => sum + getAmountPaid(o), 0).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar Controls */}
      <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              statusFilter === 'all' ? 'bg-amber-500 text-stone-950' : 'bg-stone-950 text-stone-400 border border-stone-800'
            }`}
          >
            All Statuses ({orders.length})
          </button>
          {(['pending', 'preparing', 'ready', 'completed', 'cancelled'] as OrderStatus[]).map(st => {
            const count = orders.filter(o => o.status === st).length;
            return (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold capitalize transition cursor-pointer whitespace-nowrap ${
                  statusFilter === st ? 'bg-amber-500 text-stone-950' : 'bg-stone-950 text-stone-400 border border-stone-800'
                }`}
              >
                {st} ({count})
              </button>
            );
          })}
        </div>

        {/* Payment Filter */}
        <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800 shrink-0">
          <span className="text-[10px] text-stone-400 font-bold uppercase px-2">Payment:</span>
          {(['all', 'unpaid', 'partially_paid', 'paid'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPaymentFilter(p)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize transition cursor-pointer ${
                paymentFilter === p ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {p === 'all' ? 'All' : p.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* shadcn DataTable Component */}
      <DataTable
        columns={columns}
        data={filteredOrders}
        searchPlaceholder="Search #ticket, guest name, token..."
        globalFilter={searchQuery}
        onGlobalFilterChange={setSearchQuery}
        pageSize={10}
        pageSizeOptions={[10, 20, 50]}
        emptyMessage="No matching orders found. Try adjusting your status or search filters."
      />

      {/* Collect Cash Modal */}
      {collectingOrder && (
        <Dialog open={!!collectingOrder} onOpenChange={open => !open && setCollectingOrder(null)}>
          <DialogContent className="max-w-md bg-stone-900 border-stone-800 text-stone-100 p-5 rounded-2xl space-y-4">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-base font-black flex items-center gap-2">
                  <Coins className="w-5 h-5 text-amber-400" />
                  <span>Counter Cash Register</span>
                </DialogTitle>
                <Badge variant="outline" className="text-[10px] border-amber-500/40 bg-amber-500/10 text-amber-300">
                  Cashier: {currentUser?.name}
                </Badge>
              </div>
              <DialogDescription className="text-xs text-stone-400">
                Tender cash for Order #{collectingOrder.order_number} ({collectingOrder.customer_name}) at the front counter.
              </DialogDescription>
            </DialogHeader>

            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1 text-xs">
              <div className="flex justify-between text-stone-400">
                <span>Total Bill:</span>
                <span>${collectingOrder.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Already Tendered:</span>
                <span className="text-emerald-400">${getAmountPaid(collectingOrder).toFixed(2)}</span>
              </div>
              <Separator className="my-1" />
              <div className="flex justify-between font-black text-sm text-stone-100">
                <span>Remaining Balance Due:</span>
                <span className="text-amber-400 font-mono">${getUnpaidBalance(collectingOrder).toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="tender-amount" className="text-xs font-bold text-stone-300">
                Cash Tendered ($)
              </Label>
              <Input
                id="tender-amount"
                type="number"
                step="0.01"
                value={tenderAmount}
                onChange={e => setTenderAmount(e.target.value)}
                className="text-base font-mono font-bold bg-stone-950 border-stone-800 text-amber-400 h-10"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="tender-notes" className="text-xs font-bold text-stone-300">
                Register Notes (Optional)
              </Label>
              <Input
                id="tender-notes"
                value={paymentNotes}
                onChange={e => setPaymentNotes(e.target.value)}
                placeholder="e.g. Paid with exact change at register"
                className="text-xs bg-stone-950 border-stone-800"
              />
            </div>

            {Number(tenderAmount) > getUnpaidBalance(collectingOrder) && (
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex justify-between font-bold">
                <span>Change to Return:</span>
                <span className="text-emerald-400 font-mono">
                  ${(Number(tenderAmount) - getUnpaidBalance(collectingOrder)).toFixed(2)}
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
              onClick={handleConfirmCashPayment}
              className="w-full h-11 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs rounded-xl gap-2 shadow-lg shadow-amber-500/20"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Record Cash Payment & Print Receipt</span>
            </Button>
          </DialogContent>
        </Dialog>
      )}

    </div>
  );
};
