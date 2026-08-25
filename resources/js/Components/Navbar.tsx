import React from 'react';
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
  Check
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
  } = useRestaurant();

  const cartTotalQty = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-800 bg-stone-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveSurface('public_menu')}
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
            onClick={() => setActiveSurface('public_menu')}
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
            onClick={() => setActiveSurface('public_tracker')}
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
            onClick={() => setActiveSurface('admin')}
            className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              activeSurface === 'admin'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800/60'
            }`}
          >
            <ChefHat className="w-3.5 h-3.5" />
            <span>{t('app.nav.backoffice', {}, 'Restaurant Operations')}</span>
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

          {/* Laravel API Connection Trigger */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLaravelModalOpen(true)}
            className={`h-8 px-2 text-[11px] gap-1.5 rounded-xl border ${
              backendStatus === 'connected'
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                : 'border-stone-800 text-stone-400 hover:text-stone-200 hover:border-amber-500/40'
            }`}
            title="Laravel 13 Data Bridge"
          >
            <Server className={`w-3.5 h-3.5 ${backendStatus === 'connected' ? 'text-emerald-400' : 'text-amber-400'}`} />
            <span className="hidden md:inline font-mono">
              {backendStatus === 'connected' ? 'Laravel 13' : 'Backend'}
            </span>
          </Button>

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

          {/* Auth & Role Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 sm:h-9 px-2 sm:px-2.5 rounded-xl border-stone-800 gap-2 bg-stone-900/80">
                <Avatar className="w-5 h-5 sm:w-6 sm:h-6">
                  {currentUser?.avatar ? (
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  ) : (
                    <AvatarFallback className="text-[10px] bg-amber-500 text-stone-950 font-bold">G</AvatarFallback>
                  )}
                </Avatar>
                <div className="text-left hidden lg:block">
                  <p className="text-xs font-bold text-stone-100 leading-tight">
                    {currentUser ? currentUser.name.split(' ')[0] : t('app.roles.guest', {}, 'Guest')}
                  </p>
                  <p className="text-[10px] text-amber-400 font-mono leading-none">
                    {currentUser ? t(`app.roles.${currentUser.role}`, {}, currentUser.role.replace('_', ' ')) : t('app.roles.guest', {}, 'Customer')}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64 p-2 bg-stone-900 border-stone-800">
              <DropdownMenuLabel>
                <div className="flex items-center justify-between">
                  <span>{t('users.title', {}, 'Staff Roles')}</span>
                  <Badge variant="outline" className="text-[9px] font-mono border-amber-500/40 text-amber-400">Laravel Auth</Badge>
                </div>
                <p className="text-[10px] text-stone-400 font-normal mt-0.5">
                  Simulate role-gated access (RBAC)
                </p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* Seeded Staff Roles */}
              {users.map(user => (
                <DropdownMenuItem
                  key={user.id}
                  onClick={() => setCurrentUser(user)}
                  className={`flex items-center justify-between p-2 rounded-xl cursor-pointer ${
                    currentUser?.id === user.id ? 'bg-amber-500/15 text-amber-300' : ''
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Avatar className="w-7 h-7">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs font-bold text-stone-100">{user.name}</p>
                      <p className="text-[10px] text-stone-400 capitalize">{t(`app.roles.${user.role}`, {}, user.role.replace('_', ' '))}</p>
                    </div>
                  </div>
                  {currentUser?.id === user.id && (
                    <Badge variant="amber" className="text-[9px] py-0 px-1">Active</Badge>
                  )}
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />

              {/* Public Customer / Guest option */}
              <DropdownMenuItem
                onClick={() => {
                  setCurrentUser(null);
                  setActiveSurface('public_menu');
                }}
                className={`flex items-center justify-between p-2 rounded-xl cursor-pointer ${
                  currentUser === null ? 'bg-amber-500/15 text-amber-300' : ''
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-stone-800 text-stone-300 flex items-center justify-center text-xs font-bold">
                    G
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-100">{t('app.roles.guest', {}, 'Public Guest')}</p>
                    <p className="text-[10px] text-stone-400">Anonymous Storefront Customer</p>
                  </div>
                </div>
                {currentUser === null && (
                  <Badge variant="amber" className="text-[9px] py-0 px-1">Active</Badge>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
