import React from 'react';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, SidebarFooter, 
  SidebarGroup, SidebarGroupLabel, SidebarGroupContent,
  SidebarMenu, SidebarMenuItem, SidebarMenuButton,
  SidebarTrigger, SidebarRail, SidebarInset, SidebarSeparator
} from '@/Components/ui/sidebar';
import { 
  Utensils, 
  ReceiptText, 
  Calculator, 
  ChefHat, 
  Store, 
  Users, 
  ShieldCheck,
  Boxes,
  UtensilsCrossed,
  SlidersHorizontal,
  Sparkles,
  Search,
  Lock,
  LogOut,
  ChevronRight,
  RotateCw,
  Wifi,
  WifiOff,
  Clock,
  type LucideIcon,
} from 'lucide-react';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { CartDrawer } from '@/Components/public/CartDrawer';
import { CheckoutDialog } from '@/Components/public/CheckoutDialog';
import { DishCustomizerDialog } from '@/Components/public/DishCustomizerDialog';
import { EscPosReceiptModal } from '@/Components/shared/EscPosReceiptModal';
import { OrderDetailsDialog } from '@/Components/shared/OrderDetailsDialog';
import { LaravelIntegrationDialog } from '@/Components/admin/LaravelIntegrationDialog';
import { LoginDialog } from '@/Components/auth/LoginDialog';
import { useRestaurant } from '@/Context/RestaurantContext';

interface AppLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export default function AppLayout({ title = 'Artisan POS & Kitchen', children }: AppLayoutProps) {
  const {
    isCartOpen,
    setIsCartOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    selectedDishForCustomizer,
    setSelectedDishForCustomizer,
    receiptModalOrder,
    setReceiptModalOrder,
    viewingOrder,
    setViewingOrder,
    isLaravelModalOpen,
    setIsLaravelModalOpen,
    activeSurface,
    setActiveSurface,
    settings,
    t,
    currentUser,
    orders,
    menuItems,
    inventoryItems,
    inventoryTransactions,
    users,
    sidebarNav,
    logout
  } = useRestaurant();

  const ICON_MAP: Record<string, LucideIcon> = {
    Calculator,
    ReceiptText,
    ChefHat,
    UtensilsCrossed,
    Boxes,
    Users,
    ShieldCheck,
    Store,
    Utensils,
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      <Head title={title} />

      {['admin', 'pos', 'kitchen'].includes(activeSurface) ? (
        <>
          {activeSurface === 'admin' && <Navbar />}
          <div className="flex flex-1">
            <SidebarProvider defaultOpen={true}>
              <Sidebar collapsible="icon" className="border-r border-stone-800 bg-stone-900/95 backdrop-blur-md">
                {/* Sidebar Header: Restaurant Brand */}
                <SidebarHeader className="p-3 border-b border-stone-800">
                  <div className="flex items-center gap-3 px-1 py-1 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-stone-950 font-black shadow-md shadow-amber-500/20">
                      <ChefHat className="size-5" />
                    </div>
                    <div className="flex flex-col truncate group-data-[collapsible=icon]:hidden">
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-sm text-stone-100 truncate">
                          {settings.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-stone-400 font-mono tracking-tight truncate">
                        Admin Backoffice
                      </span>
                    </div>
                  </div>
                </SidebarHeader>

                {/* Sidebar Content: Navigation */}
                <SidebarContent className="px-2 py-3 space-y-3">
                  {sidebarNav.map(group => (
                    <SidebarGroup key={group.label} className="p-0">
                      <SidebarGroupLabel className="text-[10px] uppercase font-bold text-stone-500 tracking-wider px-2 py-1 mb-1">
                        {group.label}
                      </SidebarGroupLabel>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {group.items.map(item => {
                                const Icon = ICON_MAP[item.icon] || Utensils;
                                const isActive = activeSurface === item.id;

                                let displayCount: string | number | undefined;
                                if (item.count === 'activeOrders') {
                                  displayCount = orders?.filter(o => o.status !== 'completed' && o.status !== 'cancelled').length || 0;
                                  if (displayCount === 0) displayCount = undefined;
                                } else if (item.count === 'pendingPrep') {
                                  displayCount = orders?.filter(o => o.status === 'confirmed' || o.status === 'preparing').length || 0;
                                  if (displayCount === 0) displayCount = undefined;
                                } else if (item.count === 'menuItems') {
                                  displayCount = menuItems?.length;
                                } else if (item.count === 'lowStock') {
                                  const low = inventoryItems?.filter(i => {
                                    const stock = inventoryTransactions
                                      .filter(t => t.inventory_item_id === i.id)
                                      .reduce((sum, t) => sum + t.quantity, 0);
                                    return stock <= i.low_stock_threshold;
                                  }).length || 0;
                                  displayCount = low > 0 ? `${low} Low` : undefined;
                                } else if (item.count === 'users') {
                                  displayCount = users?.length;
                                }

                                const isDynamicAmber = item.badgeVariant === 'dynamic-amber' && displayCount;
                                const isDynamicRed = item.badgeVariant === 'dynamic-red' && displayCount;

                                return (
                                  <SidebarMenuItem key={item.id}>
                                    <SidebarMenuButton
                                      isActive={isActive}
                                      tooltip={item.title}
                                      onClick={() => {
                                        setActiveSurface(item.id as AppSurface);
                                        router.visit(item.route);
                                      }}
                                      className={`relative transition-all rounded-xl ${
                                        isActive
                                          ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20 hover:bg-amber-400 hover:text-stone-950'
                                          : 'text-stone-300 hover:bg-stone-800 hover:text-stone-100'
                                      }`}
                                    >
                                      <Icon className={`size-4 shrink-0 ${isActive ? 'text-stone-950' : 'text-stone-400'}`} />
                                      <span className="truncate flex-1 text-xs">{item.title}</span>
                                      {displayCount !== undefined ? (
                                        <span
                                          className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full shrink-0 ml-auto group-data-[collapsible=icon]:hidden ${
                                            isActive
                                              ? 'bg-stone-950 text-amber-400'
                                              : isDynamicRed
                                              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                              : isDynamicAmber
                                              ? 'bg-amber-500/20 text-amber-300'
                                              : 'bg-stone-800 text-stone-400'
                                          }`}
                                        >
                                          {displayCount}
                                        </span>
                                      ) : item.badge ? (
                                        <span
                                          className={`text-[9px] font-mono px-1.5 py-0.2 rounded shrink-0 ml-auto group-data-[collapsible=icon]:hidden ${
                                            isActive
                                              ? 'bg-stone-950 text-amber-400 font-bold'
                                              : item.badgeVariant === 'outline'
                                              ? 'bg-stone-800 text-stone-400 border border-stone-700/50'
                                              : item.badgeVariant === 'amber' || isDynamicAmber
                                              ? 'bg-amber-500/20 text-amber-300'
                                              : 'bg-stone-800 text-stone-400'
                                          }`}
                                        >
                                          {item.badge}
                                        </span>
                                      ) : null}
                                    </SidebarMenuButton>
                                  </SidebarMenuItem>
                                );
                              })}
                            </SidebarMenu>
                          </SidebarGroupContent>
                        </SidebarGroup>
                      ))}
                </SidebarContent>

                {/* Sidebar Footer: Quick Links */}
                <SidebarFooter className="p-3 border-t border-stone-800 space-y-2">
                  {/* Quick Switch to Customer Storefront */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setActiveSurface('public_menu');
                      router.visit('/');
                    }}
                    className="w-full justify-start gap-2 h-9 text-xs border-stone-800 hover:border-amber-500/50 hover:bg-stone-800 text-stone-300 hover:text-amber-400 rounded-xl group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center"
                    title="Switch to Customer Storefront"
                  >
                    <Store className="size-4 shrink-0 text-amber-400" />
                    <span className="truncate group-data-[collapsible=icon]:hidden">Customer Storefront</span>
                  </Button>

                  {/* Current Staff User Dropdown */}
                  {currentUser && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button 
                          id="admin-sidebar-user-menu"
                          className="flex w-full items-center gap-2.5 rounded-xl p-1.5 text-left hover:bg-stone-800 transition cursor-pointer border border-stone-800/80 group-data-[collapsible=icon]:p-1 group-data-[collapsible=icon]:justify-center"
                        >
                          <Avatar className="size-8 rounded-lg shrink-0">
                            {currentUser?.avatar ? (
                              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                            ) : (
                              <AvatarFallback className="bg-amber-500/20 text-amber-400 text-xs font-bold">
                                {currentUser?.name?.[0] || 'S'}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          
                          <div className="flex flex-col flex-1 truncate group-data-[collapsible=icon]:hidden">
                            <span className="text-xs font-bold text-stone-100 truncate">
                              {currentUser?.name || 'Staff User'}
                            </span>
                            <span className="text-[10px] text-amber-400 font-mono capitalize truncate">
                              {currentUser?.role?.replace('_', ' ') || 'cashier'}
                            </span>
                          </div>

                          <ChevronRight className="size-3.5 text-stone-500 shrink-0 group-data-[collapsible=icon]:hidden" />
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end" side="right" className="w-56 p-2 bg-stone-900 border-stone-800 shadow-2xl">
                        <DropdownMenuLabel className="p-2">
                          <p className="text-xs font-bold text-stone-100">{currentUser?.name}</p>
                          <p className="text-[10px] text-stone-400 font-mono">{currentUser?.email}</p>
                          <div className="mt-1">
                            <Badge variant="amber" className="text-[9px] uppercase font-mono">
                              {currentUser?.role?.replace('_', ' ') || 'cashier'}
                            </Badge>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-stone-800" />
                        
                        <DropdownMenuItem
                          onClick={logout}
                          className="flex items-center gap-2 p-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg cursor-pointer"
                        >
                          <LogOut className="size-3.5" />
                          <span>Sign Out (Laravel Logout)</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                  
                  <SidebarRail />
                </SidebarFooter>
              </Sidebar>
              <div className="flex-1 flex flex-col">
                <main className="flex-1 pb-4">{children}</main>
                <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
                <CheckoutDialog isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
                <DishCustomizerDialog dish={selectedDishForCustomizer} onClose={() => setSelectedDishForCustomizer(null)} />
                <EscPosReceiptModal order={receiptModalOrder} onClose={() => setReceiptModalOrder(null)} />
                <OrderDetailsDialog order={viewingOrder} onClose={() => setViewingOrder(null)} />
                <LaravelIntegrationDialog isOpen={isLaravelModalOpen} onClose={() => setIsLaravelModalOpen(false)} />
                <LoginDialog />
              </div>
            </SidebarProvider>
          </div>
        </>
      ) : (
        <>
          <nav className="flex items-center gap-1.5 bg-stone-900/90 p-1 rounded-2xl border border-stone-800 text-xs font-semibold mb-4">
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
          </nav>
          <main className="flex-1">{children}</main>
          <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          <CheckoutDialog isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
          <DishCustomizerDialog dish={selectedDishForCustomizer} onClose={() => setSelectedDishForCustomizer(null)} />
          <EscPosReceiptModal order={receiptModalOrder} onClose={() => setReceiptModalOrder(null)} />
          <OrderDetailsDialog order={viewingOrder} onClose={() => setViewingOrder(null)} />
          <LaravelIntegrationDialog isOpen={isLaravelModalOpen} onClose={() => setIsLaravelModalOpen(false)} />
          <LoginDialog />
        </>
      )}
    </div>
  );
}