import React from 'react';
import { useRestaurant } from '../../Context/RestaurantContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Coins, 
  AlertCircle, 
  Sparkles 
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    settings,
    cart,
    removeFromCart,
    updateCartItemQty,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
  } = useRestaurant();

  const subtotal = cart.reduce((sum, item) => sum + item.total_price, 0);
  const tax = Number((subtotal * settings.tax_rate).toFixed(2));
  const grandTotal = Number((subtotal + tax).toFixed(2));

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
      <DialogContent className="max-w-md bg-stone-900 border-stone-800 text-stone-100 p-0 rounded-2xl max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <DialogTitle className="text-base font-extrabold text-stone-100">Your Order Cart</DialogTitle>
              <DialogDescription className="text-[11px] text-stone-400">
                {cart.length === 0 ? 'Your cart is empty' : `${cart.length} unique items selected`}
              </DialogDescription>
            </div>
          </div>

          {cart.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCart}
              className="text-stone-400 hover:text-red-400 text-xs h-8 px-2 gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </Button>
          )}
        </div>

        {/* Cash Policy Notice (Mandate §1 & §4) */}
        <div className="mx-4 mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
          <Coins className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-snug">
            <strong className="font-bold text-amber-400">Cash-Only Counter:</strong> {settings.cash_policy_notice}
          </p>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-800/80 text-stone-500 mx-auto flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <p className="text-stone-300 text-sm font-semibold">No items in your cart yet</p>
              <p className="text-stone-500 text-xs max-w-xs mx-auto">
                Explore our wood-fired pizzas, handmade pastas, and classic desserts to build your order.
              </p>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={item.cart_id}
                className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800 flex flex-col gap-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-100">{item.name}</h4>
                    {item.selected_modifiers.length > 0 && (
                      <div className="mt-1 space-y-0.5">
                        {item.selected_modifiers.map((m, idx) => (
                          <p key={idx} className="text-[11px] text-stone-400">
                            • {m.group_name}: <span className="text-amber-400/90">{m.option_name}</span>
                            {m.extra_price > 0 && ` (+$${m.extra_price.toFixed(2)})`}
                          </p>
                        ))}
                      </div>
                    )}
                    {item.notes && (
                      <p className="text-[11px] text-amber-300/80 italic mt-1">
                        Note: "{item.notes}"
                      </p>
                    )}
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-amber-400 whitespace-nowrap">
                    ${item.total_price.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-800/60">
                  <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 rounded-lg p-0.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateCartItemQty(item.cart_id, -1)}
                      className="h-6 w-6 text-stone-300"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-5 text-center text-xs font-bold text-stone-100">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateCartItemQty(item.cart_id, 1)}
                      className="h-6 w-6 text-stone-300"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.cart_id)}
                    className="h-7 px-2 text-stone-500 hover:text-red-400 text-[11px]"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary Breakdown & Checkout Button */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-800 bg-stone-950 space-y-3">
            <div className="space-y-1.5 text-xs text-stone-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-100">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax ({(settings.tax_rate * 100).toFixed(3)}%)</span>
                <span className="font-semibold text-stone-100">${tax.toFixed(2)}</span>
              </div>
              <Separator className="my-1.5" />
              <div className="flex justify-between text-sm sm:text-base font-black text-stone-100">
                <span>Total Due</span>
                <span className="text-amber-400">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button
              id="proceed-checkout-btn"
              onClick={handleProceedToCheckout}
              className="w-full h-11 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm rounded-xl gap-2 shadow-lg shadow-amber-500/20"
            >
              <span>Proceed to Cash Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}

      </DialogContent>
    </Dialog>
  );
};

export default CartDrawer;
