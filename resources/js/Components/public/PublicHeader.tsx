import React from 'react';
import { router, Link } from '@inertiajs/react';
import { useRestaurant } from '../Context/RestaurantContext';
import { Utensils, ReceiptText, ShoppingBag, Lock, LogOut } from 'lucide-react';
import { Button } from './ui/button';

interface PublicHeaderProps {
  activeTab: 'menu' | 'tracker';
}

export const PublicHeader: React.FC<PublicHeaderProps> = ({ activeTab }) => {
  const { settings, cart, setIsCartOpen, currentUser, logout, t } = useRestaurant();
  const cartTotalQty = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-800 bg-stone-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Header */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.visit('/')}
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base text-stone-100 group-hover:text-amber-400 transition-colors">
                {settings.name}
              </span>
              <p className="text-[11px] text-stone-400 hidden sm:block truncate max-w-xs">
                {settings.tagline}
              </p>
            </div>
          </button>
        </div>

        {/* Public Navigation Tabs: Digital Menu & Order Tracking */}
        <nav className="flex items-center gap-1 bg-stone-900 p-1 rounded-2xl border border-stone-800 text-xs font-semibold">
          <button
            id="public-tab-menu"
            onClick={() => router.visit('/')}
            className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'menu'
                ? 'bg-amber-500 text-stone-950 font-extrabold shadow-sm'
                : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Digital Menu</span>
          </button>

          <button
            id="public-tab-tracker"
            onClick={() => router.visit('/tracker')}
            className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'tracker'
                ? 'bg-amber-500 text-stone-950 font-extrabold shadow-sm'
                : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800'
            }`}
          >
            <ReceiptText className="w-4 h-4" />
            <span>Order Tracking</span>
          </button>
        </nav>

        {/* Controls: Cart & Staff Access */}
        <div className="flex items-center gap-2">
          {activeTab === 'menu' && (
            <Button
              id="header-cart-btn"
              variant="default"
              size="sm"
              onClick={() => setIsCartOpen(true)}
              className="relative h-9 px-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl gap-1.5 shadow-md shadow-amber-500/20"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Order Slip</span>
              {cartTotalQty > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-stone-950 text-amber-400 rounded-full text-[10px] font-black">
                  {cartTotalQty}
                </span>
              )}
            </Button>
          )}

          {currentUser ? (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.visit('/pos')}
                className="h-9 px-3 rounded-xl border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500 hover:text-stone-950 text-xs font-bold"
              >
                Backoffice
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                title="Sign Out"
                className="h-9 w-9 text-stone-400 hover:text-red-400 hover:bg-stone-900 rounded-xl"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-3 rounded-xl border-stone-800 bg-stone-900/80 text-stone-300 hover:text-amber-400 hover:border-amber-500/40 text-xs font-semibold gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Staff Sign In</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
