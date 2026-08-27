import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { useRestaurant } from '../../Context/RestaurantContext';
import { laravelApi, formatLaravelErrors } from '../../lib/api';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { 
  Coins, 
  CheckCircle2, 
  Sparkles, 
  Utensils, 
  ShoppingBag, 
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { OrderType } from '../../types';

export const CheckoutDialog: React.FC = () => {
  const {
    settings,
    cart,
    clearCart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    setActiveSurface,
    setActiveTrackingToken,
  } = useRestaurant();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderType, setOrderType] = useState<OrderType>('dine_in');
  const [tableNumber, setTableNumber] = useState('Table 5');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.total_price, 0);
  const tax = Number((subtotal * settings.tax_rate).toFixed(2));
  const grandTotal = Number((subtotal + tax).toFixed(2));

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMsg('Please provide your name for order identification.');
      return;
    }
    if (orderType === 'dine_in' && !tableNumber.trim()) {
      setErrorMsg('Please specify your table number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const subtotal = cart.reduce((sum, item) => sum + item.total_price, 0);
      const tax = Number((subtotal * settings.tax_rate).toFixed(2));
      const total = Number((subtotal + tax).toFixed(2));

      const result = await laravelApi.home.submitOrder({
        customer_name: customerName.trim(),
        customer_phone: customerPhone.trim() || undefined,
        type: orderType,
        table_number: orderType === 'dine_in' ? tableNumber.trim() : undefined,
        notes: notes.trim() || undefined,
        idempotency_key: `client-idem-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        subtotal,
        tax_total: tax,
        total,
        items: cart.map(c => ({
          id: `oi-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          menu_item_id: c.menu_item_id,
          name: c.name,
          quantity: c.quantity,
          unit_price: c.unit_price,
          total_price: c.total_price,
          notes: c.notes,
          selected_modifiers: c.selected_modifiers,
        })),
      });

      clearCart();
      setIsCheckoutOpen(false);
      setActiveTrackingToken(result.tracking_token);
      setActiveSurface('public_tracker');
    } catch (err) {
      const errors = formatLaravelErrors(err);
      setErrorMsg(errors.join('\n'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
      <DialogContent className="max-w-lg bg-stone-900 border-stone-800 text-stone-100 p-0 rounded-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-5 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
              <Coins className="w-4 h-4" />
            </div>
            <div>
              <DialogTitle className="text-base font-extrabold text-stone-100">
                Confirm Order & Cash Payment
              </DialogTitle>
              <DialogDescription className="text-xs text-stone-400">
                Total Due: <strong className="text-amber-400 font-extrabold">${grandTotal.toFixed(2)}</strong> (Pay at Counter)
              </DialogDescription>
            </div>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="p-5 space-y-5">
          
          {/* Prominent Cash Policy Confirmation */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-1">
            <div className="flex items-center gap-2 font-bold text-amber-400">
              <Coins className="w-4 h-4" />
              <span>Cash-Only Counter Policy</span>
            </div>
            <p className="leading-relaxed">
              No online card processing required. Your order will be transmitted directly to the kitchen queue upon submission. Please tender cash at the cashier counter.
            </p>
          </div>

          {/* Dining Type Option */}
          <div className="space-y-2">
            <Label className="text-xs font-bold text-stone-300">Dining Option</Label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setOrderType('dine_in')}
                className={`p-3 rounded-xl border text-left cursor-pointer transition flex items-center gap-2.5 ${
                  orderType === 'dine_in'
                    ? 'border-amber-500 bg-amber-500/15 text-stone-100'
                    : 'border-stone-800 bg-stone-950/60 text-stone-400 hover:border-stone-700'
                }`}
              >
                <Utensils className="w-4 h-4 text-amber-400" />
                <div>
                  <p className="text-xs font-bold">Dine-In Table</p>
                  <p className="text-[10px] text-stone-400">Delivered to table</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('takeaway')}
                className={`p-3 rounded-xl border text-left cursor-pointer transition flex items-center gap-2.5 ${
                  orderType === 'takeaway'
                    ? 'border-amber-500 bg-amber-500/15 text-stone-100'
                    : 'border-stone-800 bg-stone-950/60 text-stone-400 hover:border-stone-700'
                }`}
              >
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <div>
                  <p className="text-xs font-bold">Takeaway / Pickup</p>
                  <p className="text-[10px] text-stone-400">Pick up at counter</p>
                </div>
              </button>
            </div>
          </div>

          {/* Customer Name & Table/Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <Label htmlFor="checkout-name" className="text-xs font-semibold text-stone-300">
                Your Name <span className="text-amber-400">*</span>
              </Label>
              <Input
                id="checkout-name"
                required
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                placeholder="e.g. Marco B."
                className="text-xs bg-stone-950 border-stone-800"
              />
            </div>

            {orderType === 'dine_in' ? (
              <div className="space-y-1.5">
                <Label htmlFor="checkout-table" className="text-xs font-semibold text-stone-300">
                  Table Number <span className="text-amber-400">*</span>
                </Label>
                <Input
                  id="checkout-table"
                  required
                  value={tableNumber}
                  onChange={e => setTableNumber(e.target.value)}
                  placeholder="e.g. Table 4"
                  className="text-xs bg-stone-950 border-stone-800"
                />
              </div>
            ) : (
              <div className="space-y-1.5">
                <Label htmlFor="checkout-phone" className="text-xs font-semibold text-stone-300">
                  Mobile Phone (for SMS Ready alert)
                </Label>
                <Input
                  id="checkout-phone"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="text-xs bg-stone-950 border-stone-800"
                />
              </div>
            )}
          </div>

          {/* Special Order Notes */}
          <div className="space-y-1.5">
            <Label htmlFor="checkout-notes" className="text-xs font-semibold text-stone-300">
              Special Order Notes
            </Label>
            <Textarea
              id="checkout-notes"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Any special handling or pickup instructions..."
              rows={2}
              className="text-xs bg-stone-950 border-stone-800"
            />
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="pt-3 border-t border-stone-800 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCheckoutOpen(false)}
              className="border-stone-800 text-stone-400 hover:text-stone-100 text-xs h-11 px-4"
            >
              Back to Cart
            </Button>

            <Button
              id="submit-order-btn"
              type="submit"
              disabled={isSubmitting}
              className="flex-1 h-11 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm rounded-xl gap-2 shadow-lg shadow-amber-500/20"
            >
              <span>Submit Order • Pay ${grandTotal.toFixed(2)}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
