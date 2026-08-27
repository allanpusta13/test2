import React from 'react';
import { router } from '@inertiajs/react';
import { useRestaurant } from '../Context/RestaurantContext';
import { 
  Utensils, 
  ShoppingBag, 
  RotateCw, 
  Wifi, 
  WifiOff, 
  ReceiptText, 
  ChefHat, 
  Server,
  Languages,
  Check,
  Lock,
  LogOut,
  ShieldCheck,
  Calculator,
  UserCheck
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export const Navbar: React.FC = () => {
  const {
    locale,
    setLocale,
    locales,
    t,
    settings,
    currentUser,
    setCurrentUser,
    users,
    activeSurface,
    setActiveSurface,
    isOffline,
    setIsOffline,
    offlineQueue,
    syncOfflineQueue,
    cart,
    setIsCartOpen,
    backendStatus,
    setIsLaravelModalOpen,
    isAuthModalOpen,
    setIsAuthModalOpen,
    requestStaffAccess,
    quickLogin,
    logout,
  } = useRestaurant();

  const cartTotalQty = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-800 bg-stone-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              setActiveSurface('public_menu');
              router.visit('/');
            }}
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base text-stone-100 group-hover:text-amber-400 transition-colors">
                  {settings.name}
                </span>
                <Badge variant="outline" className="hidden sm:inline-flex text-[10px] py-0 px-1.5 border-amber-500/30 text-amber-400 font-mono">
                  Cash Only
                </Badge>
              </div>
              <p className="text-[11px] text-stone-400 hidden sm:block truncate max-w-xs">
                {settings.tagline}
              </p>
            </div>
          </button>
        </div>

        {/* Primary Surface Switcher */}
        <nav className="flex items-center gap-1.5 bg-stone-900/90 p-1 rounded-2xl border border-stone-800 text-xs font-semibold">
          <button
            id="nav-public-menu"
            onClick={() => {
              setActiveSurface('public_menu');
              router.visit('/');
            }}
            className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              activeSurface === 'public_menu'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800/60'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>{t('app.nav.menu', {}, 'Digital Menu')}</span>
          </button>

          <button
            id="nav-public-tracker"
            onClick={() => {
              setActiveSurface('public_tracker');
              router.visit('/tracker');
            }}
            className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              activeSurface === 'public_tracker'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800/60'
            }`}
          >
            <ReceiptText className="w-3.5 h-3.5" />
            <span>{t('app.nav.track_order', {}, 'Track Order')}</span>
          </button>

          <button
            id="nav-admin-panel"
            onClick={() => {
              if (requestStaffAccess('admin', 'pos', 'Please authenticate with your staff credentials to access operations.')) {
                router.visit('/pos');
              }
            }}
            className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              activeSurface === 'admin'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800/60'
            }`}
          >
            <ChefHat className="w-3.5 h-3.5" />
            <span>{t('app.nav.backoffice', {}, 'Restaurant Operations')}</span>
            {!currentUser && (
              <span className="w-2 h-2 rounded-full bg-amber-400/80 animate-pulse ml-0.5" />
            )}
          </button>
        </nav>

        {/* Controls: Language Switcher, Cart, Offline Simulator, & Auth Role Switcher */}
        <div className="flex items-center gap-2">
          
          {/* Language Switcher (English / Italian) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-2.5 text-xs gap-1.5 rounded-xl border-stone-800 bg-stone-900/80 text-stone-300 hover:text-amber-400 hover:border-amber-500/40"
                title="Change Language / Cambia Lingua"
              >
                <Languages className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold uppercase text-[11px]">{locale}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 p-1.5 bg-stone-900 border-stone-800">
              <DropdownMenuLabel className="text-[10px] text-stone-400 font-mono">
                {t('app.common.language', {}, 'Language / Lingua')}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {Object.entries(locales).map(([code, label]) => (
                <DropdownMenuItem
                  key={code}
                  onClick={() => setLocale(code)}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer text-xs ${
                    locale === code ? 'bg-amber-500/15 text-amber-300 font-bold' : 'text-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs">{code === 'it' ? '🇮🇹' : '🇺🇸'}</span>
                    <span>{label}</span>
                  </div>
                  {locale === code && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Laravel API Connection Trigger (Admin Only) */}
          {currentUser?.role === 'admin' && (
            <Button
              id="nav-laravel-integration-btn"
              variant="outline"
              size="sm"
              onClick={() => setIsLaravelModalOpen(true)}
              className={`h-8 px-2 text-[11px] gap-1.5 rounded-xl border ${
                backendStatus === 'connected'
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                  : 'border-stone-800 text-stone-400 hover:text-stone-200 hover:border-amber-500/40'
              }`}
              title="Laravel 13 Data Bridge (Admin Only)"
            >
              <Server className={`w-3.5 h-3.5 ${backendStatus === 'connected' ? 'text-emerald-400' : 'text-amber-400'}`} />
              <span className="hidden md:inline font-mono">
                {backendStatus === 'connected' ? 'Laravel 13' : 'Backend'}
              </span>
            </Button>
          )}

          {/* Offline Mode & Sync Indicator */}
          <div className="hidden lg:flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOffline(!isOffline)}
              className={`h-8 px-2.5 text-[11px] gap-1.5 rounded-xl ${
                isOffline 
                  ? 'border-amber-500/50 bg-amber-500/10 text-amber-300' 
                  : 'border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
              title={isOffline ? 'POS is currently in Offline Mode' : 'Toggle Offline Mode for POS Testing'}
            >
              {isOffline ? <WifiOff className="w-3.5 h-3.5 text-amber-400" /> : <Wifi className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{isOffline ? 'Offline' : 'Live Sync'}</span>
            </Button>

            {offlineQueue.length > 0 && (
              <Button
                variant="default"
                size="sm"
                onClick={syncOfflineQueue}
                className="h-8 px-2 text-[11px] bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold gap-1 animate-pulse rounded-xl"
                title="Sync pending offline mutations"
              >
                <RotateCw className="w-3 h-3" />
                <span>Sync ({offlineQueue.length})</span>
              </Button>
            )}
          </div>

          {/* Cart Trigger (visible in public menu) */}
          {activeSurface === 'public_menu' && (
            <Button
              id="header-cart-btn"
              variant="default"
              size="sm"
              onClick={() => setIsCartOpen(true)}
              className="relative h-8 sm:h-9 px-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl gap-1.5 shadow-md shadow-amber-500/20"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">{t('menu.cart_title', {}, 'Order Slip')}</span>
              {cartTotalQty > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-stone-950 text-amber-400 rounded-full text-[10px] font-black">
                  {cartTotalQty}
                </span>
              )}
            </Button>
          )}

          {/* Auth & Role Switcher / Sign In Button */}
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 sm:h-9 px-2 sm:px-2.5 rounded-xl border-stone-800 gap-2 bg-stone-900/80 hover:border-amber-500/40">
                  <Avatar className="w-5 h-5 sm:w-6 sm:h-6 border border-stone-700">
                    {currentUser?.avatar ? (
                      <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    ) : (
                      <AvatarFallback className="text-[10px] bg-amber-500 text-stone-950 font-bold">
                        {currentUser.name[0]}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-bold text-stone-100 leading-tight">
                      {currentUser.name.split(' ')[0]}
                    </p>
                    <p className="text-[10px] text-amber-400 font-mono leading-none capitalize">
                      {t(`app.roles.${currentUser?.role}`, {}, currentUser?.role?.replace('_', ' ') || 'cashier')}
                    </p>
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-64 p-2 bg-stone-900 border-stone-800 text-stone-100 shadow-xl rounded-2xl">
                <DropdownMenuLabel>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">{currentUser.name}</span>
                    <Badge variant="outline" className="text-[9px] font-mono border-amber-500/40 text-amber-400">
                      Laravel Auth
                    </Badge>
                  </div>
                  <p className="text-[10px] text-stone-400 font-normal mt-0.5">
                    {currentUser.email}
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-stone-800" />

                {/* Sign Out */}
                <DropdownMenuItem
                  onClick={logout}
                  className="flex items-center gap-2.5 p-2 rounded-xl cursor-pointer text-xs text-red-400 hover:text-red-300 hover:bg-red-950/40"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="font-semibold">Sign Out (Laravel Logout)</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAuthModalOpen(true)}
              className="h-8 sm:h-9 px-3 rounded-xl border-amber-500/40 bg-amber-500/10 hover:bg-amber-500 text-amber-300 hover:text-stone-950 font-bold text-xs gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Staff Sign In</span>
            </Button>
          )}

        </div>
      </div>
    </header>
  );
};

export default Navbar;
