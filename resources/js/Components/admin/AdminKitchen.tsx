import React, { useState, useEffect } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { 
  ChefHat, 
  Clock, 
  Flame, 
  CheckCircle2, 
  Utensils, 
  ShoppingBag, 
  AlertTriangle, 
  Sparkles,
  ArrowRight,
  Boxes,
  Eye,
  GripVertical,
  MoveRight,
  RotateCcw,
  Archive,
  Ban,
  CheckCheck,
  ChevronDown,
  Layers
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Order, OrderStatus } from '../../types';

export const AdminKitchen: React.FC = () => {
  const {
    orders,
    updateOrderStatus,
    menuItems,
    inventoryItems,
    currentUser,
    setViewingOrder,
  } = useRestaurant();

  const [currentTime, setCurrentTime] = useState(Date.now());
  const [draggedOrderId, setDraggedOrderId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<OrderStatus | null>(null);
  const [channelFilter, setChannelFilter] = useState<'all' | 'dine_in' | 'takeaway'>('all');
  const [showCompletedCol, setShowCompletedCol] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 10000);
    return () => clearInterval(timer);
  }, []);

  const filteredOrders = orders.filter(o => {
    if (channelFilter === 'all') return true;
    return o.type === channelFilter;
  });

  const pendingOrders = filteredOrders.filter(o => o.status === 'pending');
  const preparingOrders = filteredOrders.filter(o => o.status === 'preparing');
  const readyOrders = filteredOrders.filter(o => o.status === 'ready');
  const completedOrders = filteredOrders.filter(o => o.status === 'completed');

  const getElapsedMinutes = (dateStr: string): number => {
    const diff = currentTime - new Date(dateStr).getTime();
    return Math.floor(diff / 60000);
  };

  const handleDragStart = (e: React.DragEvent, order: Order) => {
    e.dataTransfer.setData('text/plain', order.id);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedOrderId(order.id);
  };

  const handleDragEnd = () => {
    setDraggedOrderId(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e: React.DragEvent, targetStatus: OrderStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverColumn !== targetStatus) {
      setDragOverColumn(targetStatus);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only reset if actually leaving the container
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = (e: React.DragEvent, targetStatus: OrderStatus) => {
    e.preventDefault();
    const orderId = e.dataTransfer.getData('text/plain') || draggedOrderId;
    if (orderId) {
      updateOrderStatus(orderId, targetStatus);
    }
    setDraggedOrderId(null);
    setDragOverColumn(null);
  };

  const renderKitchenTicket = (order: Order, stage: OrderStatus) => {
    const elapsedMins = getElapsedMinutes(order.created_at);
    const isBeingDragged = draggedOrderId === order.id;

    return (
      <Card
        key={order.id}
        draggable={true}
        onDragStart={(e) => handleDragStart(e, order)}
        onDragEnd={handleDragEnd}
        className={`bg-stone-900 border text-stone-100 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 shadow-md select-none ${
          isBeingDragged
            ? 'opacity-40 scale-95 border-amber-400 border-dashed ring-2 ring-amber-400/40'
            : 'hover:shadow-lg'
        } ${
          stage === 'pending'
            ? 'border-amber-500/50 bg-stone-900/95 hover:border-amber-500'
            : stage === 'preparing'
            ? 'border-orange-500/40 bg-stone-900 hover:border-orange-500'
            : stage === 'ready'
            ? 'border-emerald-500/40 bg-stone-900 hover:border-emerald-500'
            : 'border-stone-800 bg-stone-950/80 opacity-90'
        }`}
      >
        {/* Ticket Header & Drag Handle */}
        <div className={`p-3.5 border-b flex items-center justify-between cursor-grab active:cursor-grabbing ${
          stage === 'pending' ? 'bg-amber-500/15 border-amber-500/30' :
          stage === 'preparing' ? 'bg-orange-500/10 border-orange-500/20' :
          stage === 'ready' ? 'bg-emerald-500/10 border-emerald-500/20' :
          'bg-stone-950 border-stone-800'
        }`}>
          <div className="flex items-center gap-2">
            <div 
              className="text-stone-500 hover:text-amber-400 p-0.5 rounded cursor-grab"
              title="Drag and drop this ticket to any status column"
            >
              <GripVertical className="w-4 h-4" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-base font-black text-amber-400">
                  #{order.order_number}
                </span>
                <Badge variant="outline" className="text-[10px] font-mono border-stone-700 bg-stone-950">
                  {order.type === 'dine_in' ? order.table_number || 'Dine-In' : 'TAKEAWAY'}
                </Badge>
              </div>
              <p className="text-[11px] text-stone-300 font-semibold mt-0.5">
                Guest: {order.customer_name}
              </p>
            </div>
          </div>

          {/* Elapsed Timer Badge & View Order Details */}
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewingOrder(order)}
              className="h-7 px-2 text-[11px] font-bold border-stone-700 bg-stone-950/80 hover:bg-stone-900 text-stone-300 hover:text-amber-400 gap-1 rounded-lg"
              title="View full order contents & payment status"
            >
              <Eye className="w-3 h-3 text-amber-400" />
              <span>Details</span>
            </Button>

            <span
              className={`px-2 py-1 rounded-lg text-xs font-mono font-black flex items-center gap-1 ${
                stage === 'completed'
                  ? 'bg-stone-800 text-stone-400'
                  : elapsedMins > 20
                  ? 'bg-red-500 text-stone-950 animate-pulse'
                  : elapsedMins > 10
                  ? 'bg-amber-500 text-stone-950'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}
            >
              <Clock className="w-3 h-3" />
              {elapsedMins}m
            </span>
          </div>
        </div>

        {/* Dish Items & Modifiers */}
        <div className="p-3.5 space-y-3 flex-1 overflow-y-auto max-h-72">
          {order.items.map((item) => {
            const menuItem = menuItems.find(m => m.id === item.menu_item_id);

            return (
              <div
                key={item.id}
                className="p-2.5 rounded-xl bg-stone-950/80 border border-stone-800 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs font-bold text-stone-100">
                  <span className="text-amber-400 font-black text-sm mr-1.5">{item.quantity}x</span>
                  <span className="flex-1">{item.name}</span>
                </div>

                {/* Modifiers List */}
                {item.selected_modifiers.length > 0 && (
                  <div className="space-y-0.5 text-[11px] text-amber-200/90 pl-4 border-l-2 border-amber-500/40">
                    {item.selected_modifiers.map((m, i) => (
                      <p key={i}>• {m.group_name}: <strong>{m.option_name}</strong></p>
                    ))}
                  </div>
                )}

                {/* Special Line Instruction */}
                {item.notes && (
                  <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-300 text-[11px] italic">
                    Note: "{item.notes}"
                  </div>
                )}

                {/* Recipe Ingredients to prep (BOM) */}
                {menuItem?.recipe && menuItem.recipe.length > 0 && (
                  <div className="text-[10px] text-stone-400 flex items-center gap-1 pt-1">
                    <Boxes className="w-3 h-3 text-stone-400" />
                    <span>BOM: {menuItem.recipe.length} recipe ingredients</span>
                  </div>
                )}
              </div>
            );
          })}

          {order.notes && (
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
              <span className="font-bold block text-[10px] uppercase">Special Ticket Note:</span>
              <p className="italic">{order.notes}</p>
            </div>
          )}
        </div>

        {/* Bump Action Buttons & Move to Any Status Dropdown */}
        <div className="p-3 border-t border-stone-800 bg-stone-950/80 flex items-center justify-between gap-2">
          {/* Quick Primary Bump Button */}
          {stage === 'pending' && (
            <Button
              onClick={() => updateOrderStatus(order.id, 'preparing')}
              className="flex-1 h-10 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs rounded-xl gap-2 shadow-sm"
            >
              <Flame className="w-4 h-4" />
              <span>Start Prep</span>
            </Button>
          )}

          {stage === 'preparing' && (
            <Button
              onClick={() => updateOrderStatus(order.id, 'ready')}
              className="flex-1 h-10 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs rounded-xl gap-2 shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Mark Ready</span>
            </Button>
          )}

          {stage === 'ready' && (
            <Button
              onClick={() => updateOrderStatus(order.id, 'completed')}
              className="flex-1 h-10 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs rounded-xl gap-2"
            >
              <CheckCheck className="w-4 h-4 text-emerald-400" />
              <span>Complete</span>
            </Button>
          )}

          {stage === 'completed' && (
            <Button
              onClick={() => updateOrderStatus(order.id, 'ready')}
              variant="outline"
              className="flex-1 h-10 border-stone-800 hover:bg-stone-900 text-stone-300 hover:text-amber-400 font-bold text-xs rounded-xl gap-1.5"
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>Recall to Ready</span>
            </Button>
          )}

          {/* Move to Any Status Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-10 px-2.5 border-stone-800 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-400 text-xs font-bold rounded-xl gap-1"
                title="Move ticket to any status"
              >
                <MoveRight className="w-3.5 h-3.5 text-amber-400" />
                <ChevronDown className="w-3 h-3 text-stone-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 bg-stone-900 border-stone-800 text-stone-200 p-1.5 rounded-2xl shadow-2xl">
              <DropdownMenuLabel className="text-[10px] text-stone-400 font-mono uppercase tracking-wider px-2 py-1">
                Move #{order.order_number} to:
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-stone-800" />

              <DropdownMenuItem
                disabled={order.status === 'pending'}
                onClick={() => updateOrderStatus(order.id, 'pending')}
                className="text-xs text-amber-300 font-bold py-2 cursor-pointer focus:bg-amber-500/20 rounded-xl"
              >
                <Clock className="w-3.5 h-3.5 mr-2 text-amber-400" />
                1. Move to Incoming (Pending)
              </DropdownMenuItem>

              <DropdownMenuItem
                disabled={order.status === 'preparing'}
                onClick={() => updateOrderStatus(order.id, 'preparing')}
                className="text-xs text-orange-300 font-bold py-2 cursor-pointer focus:bg-orange-500/20 rounded-xl"
              >
                <Flame className="w-3.5 h-3.5 mr-2 text-orange-400" />
                2. Move to In Prep / Oven
              </DropdownMenuItem>

              <DropdownMenuItem
                disabled={order.status === 'ready'}
                onClick={() => updateOrderStatus(order.id, 'ready')}
                className="text-xs text-emerald-300 font-bold py-2 cursor-pointer focus:bg-emerald-500/20 rounded-xl"
              >
                <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-emerald-400" />
                3. Move to Ready at Pass
              </DropdownMenuItem>

              <DropdownMenuItem
                disabled={order.status === 'completed'}
                onClick={() => updateOrderStatus(order.id, 'completed')}
                className="text-xs text-stone-300 font-bold py-2 cursor-pointer focus:bg-stone-800 rounded-xl"
              >
                <Archive className="w-3.5 h-3.5 mr-2 text-stone-400" />
                4. Move to Completed
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-stone-800" />

              <DropdownMenuItem
                disabled={order.status === 'cancelled'}
                onClick={() => updateOrderStatus(order.id, 'cancelled')}
                className="text-xs text-red-400 font-bold py-2 cursor-pointer focus:bg-red-500/20 rounded-xl"
              >
                <Ban className="w-3.5 h-3.5 mr-2 text-red-400" />
                Cancel Ticket & Reverse Stock
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      
      {/* KDS Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold shadow-sm">
              <ChefHat className="w-4 h-4" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-100">
              Kitchen Display System (KDS)
            </h1>
            <Badge variant="outline" className="text-[10px] font-mono border-amber-500/40 text-amber-400">
              Station: Main Line & Wood Oven
            </Badge>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Real-time ticket expediting with automatic Bill of Materials (BOM) inventory deductions and drag-and-drop workflow
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Channel Filters */}
          <div className="flex items-center bg-stone-900 border border-stone-800 rounded-xl p-1">
            <button
              onClick={() => setChannelFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                channelFilter === 'all' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              All Orders
            </button>
            <button
              onClick={() => setChannelFilter('dine_in')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                channelFilter === 'dine_in' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Dine-In
            </button>
            <button
              onClick={() => setChannelFilter('takeaway')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                channelFilter === 'takeaway' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Takeaway
            </button>
          </div>

          {/* Toggle Completed Column */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCompletedCol(!showCompletedCol)}
            className={`h-9 border-stone-800 text-xs font-bold rounded-xl gap-1.5 ${
              showCompletedCol ? 'bg-stone-800 text-amber-400 border-amber-500/40' : 'bg-stone-900 text-stone-300 hover:text-stone-100'
            }`}
          >
            <Archive className="w-3.5 h-3.5" />
            <span>Completed ({completedOrders.length})</span>
          </Button>

          <div className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-amber-400 font-mono font-bold">
            Active: {pendingOrders.length + preparingOrders.length + readyOrders.length}
          </div>
        </div>
      </div>

      {/* Drag & Drop Hint Banner */}
      <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Drag & Drop Ready:</strong> Grab any ticket by its header to drag it into any status column, or use the <strong>Move ➔</strong> button on each ticket.
          </span>
        </div>
        {draggedOrderId && (
          <Badge variant="amber" className="text-[10px] animate-pulse">
            Dragging #{orders.find(o => o.id === draggedOrderId)?.order_number} ... Drop into any column below
          </Badge>
        )}
      </div>

      {/* Dynamic KDS Multi-Column Drag & Drop Board */}
      <div className={`grid gap-6 ${
        showCompletedCol
          ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'
          : 'grid-cols-1 lg:grid-cols-3'
      }`}>
        
        {/* Column 1: Incoming / Pending */}
        <div 
          onDragOver={(e) => handleDragOver(e, 'pending')}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'pending')}
          className={`space-y-3.5 p-3 rounded-3xl transition-all duration-200 ${
            dragOverColumn === 'pending'
              ? 'bg-amber-500/15 ring-2 ring-amber-400 border border-amber-400 shadow-xl'
              : 'bg-stone-950/40 border border-stone-900'
          }`}
        >
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <h2 className="text-xs font-black text-amber-300 uppercase tracking-wider">
                1. Incoming ({pendingOrders.length})
              </h2>
            </div>
            <span className="text-[11px] text-stone-400">Awaiting acceptance</span>
          </div>

          {/* Active Drop Placeholder */}
          {dragOverColumn === 'pending' && (
            <div className="p-4 rounded-2xl border-2 border-dashed border-amber-400 bg-amber-500/20 text-center text-amber-300 text-xs font-bold animate-pulse">
              ⬇ Drop here to set status to Incoming (Pending)
            </div>
          )}

          <div className="space-y-4 min-h-[140px]">
            {pendingOrders.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-stone-900/40 border border-stone-800/80 text-stone-500 text-xs flex flex-col items-center justify-center gap-1.5">
                <Clock className="w-6 h-6 text-stone-700" />
                <span>No new incoming tickets</span>
                <span className="text-[10px] text-stone-600">Drag tickets here to reset to pending</span>
              </div>
            ) : (
              pendingOrders.map(ord => renderKitchenTicket(ord, 'pending'))
            )}
          </div>
        </div>

        {/* Column 2: In Preparation */}
        <div 
          onDragOver={(e) => handleDragOver(e, 'preparing')}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'preparing')}
          className={`space-y-3.5 p-3 rounded-3xl transition-all duration-200 ${
            dragOverColumn === 'preparing'
              ? 'bg-orange-500/15 ring-2 ring-orange-400 border border-orange-400 shadow-xl'
              : 'bg-stone-950/40 border border-stone-900'
          }`}
        >
          <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400" />
              <h2 className="text-xs font-black text-orange-300 uppercase tracking-wider">
                2. In Prep / Oven ({preparingOrders.length})
              </h2>
            </div>
            <span className="text-[11px] text-stone-400">BOM Stock Deducted</span>
          </div>

          {/* Active Drop Placeholder */}
          {dragOverColumn === 'preparing' && (
            <div className="p-4 rounded-2xl border-2 border-dashed border-orange-400 bg-orange-500/20 text-center text-orange-300 text-xs font-bold animate-pulse">
              ⬇ Drop here to start prep & deduct raw stock
            </div>
          )}

          <div className="space-y-4 min-h-[140px]">
            {preparingOrders.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-stone-900/40 border border-stone-800/80 text-stone-500 text-xs flex flex-col items-center justify-center gap-1.5">
                <Flame className="w-6 h-6 text-stone-700" />
                <span>No dishes currently in preparation</span>
                <span className="text-[10px] text-stone-600">Drag tickets here to start cooking</span>
              </div>
            ) : (
              preparingOrders.map(ord => renderKitchenTicket(ord, 'preparing'))
            )}
          </div>
        </div>

        {/* Column 3: Ready at Pass */}
        <div 
          onDragOver={(e) => handleDragOver(e, 'ready')}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'ready')}
          className={`space-y-3.5 p-3 rounded-3xl transition-all duration-200 ${
            dragOverColumn === 'ready'
              ? 'bg-emerald-500/15 ring-2 ring-emerald-400 border border-emerald-400 shadow-xl'
              : 'bg-stone-950/40 border border-stone-900'
          }`}
        >
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h2 className="text-xs font-black text-emerald-300 uppercase tracking-wider">
                3. Ready at Pass ({readyOrders.length})
              </h2>
            </div>
            <span className="text-[11px] text-stone-400">Ready to serve/pickup</span>
          </div>

          {/* Active Drop Placeholder */}
          {dragOverColumn === 'ready' && (
            <div className="p-4 rounded-2xl border-2 border-dashed border-emerald-400 bg-emerald-500/20 text-center text-emerald-300 text-xs font-bold animate-pulse">
              ⬇ Drop here to mark dishes ready at pass
            </div>
          )}

          <div className="space-y-4 min-h-[140px]">
            {readyOrders.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-stone-900/40 border border-stone-800/80 text-stone-500 text-xs flex flex-col items-center justify-center gap-1.5">
                <CheckCircle2 className="w-6 h-6 text-stone-700" />
                <span>No tickets waiting at pass</span>
                <span className="text-[10px] text-stone-600">Drag tickets here when completed cooking</span>
              </div>
            ) : (
              readyOrders.map(ord => renderKitchenTicket(ord, 'ready'))
            )}
          </div>
        </div>

        {/* Column 4 (Optional / Toggleable): Completed & Served */}
        {showCompletedCol && (
          <div 
            onDragOver={(e) => handleDragOver(e, 'completed')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'completed')}
            className={`space-y-3.5 p-3 rounded-3xl transition-all duration-200 ${
              dragOverColumn === 'completed'
                ? 'bg-stone-800/80 ring-2 ring-stone-400 border border-stone-400 shadow-xl'
                : 'bg-stone-950/40 border border-stone-900'
            }`}
          >
            <div className="p-3 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Archive className="w-4 h-4 text-stone-400" />
                <h2 className="text-xs font-black text-stone-300 uppercase tracking-wider">
                  4. Completed ({completedOrders.length})
                </h2>
              </div>
              <span className="text-[11px] text-stone-500">Fulfilled orders</span>
            </div>

            {/* Active Drop Placeholder */}
            {dragOverColumn === 'completed' && (
              <div className="p-4 rounded-2xl border-2 border-dashed border-stone-400 bg-stone-800/60 text-center text-stone-200 text-xs font-bold animate-pulse">
                ⬇ Drop here to complete & archive ticket
              </div>
            )}

            <div className="space-y-4 min-h-[140px]">
              {completedOrders.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-stone-900/40 border border-stone-800/80 text-stone-500 text-xs flex flex-col items-center justify-center gap-1.5">
                  <Archive className="w-6 h-6 text-stone-700" />
                  <span>No completed tickets</span>
                  <span className="text-[10px] text-stone-600">Drag tickets here to finish</span>
                </div>
              ) : (
                completedOrders.slice(0, 10).map(ord => renderKitchenTicket(ord, 'completed'))
              )}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
