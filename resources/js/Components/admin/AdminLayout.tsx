import React from 'react';
import { router } from '@inertiajs/react';
import { useRestaurant } from '../../Context/RestaurantContext';
import { 
  Calculator, 
  ReceiptText, 
  ChefHat, 
  UtensilsCrossed, 
  Boxes, 
  Users, 
  ShieldCheck, 
  ShieldAlert,
  Store,
  Wifi,
  WifiOff,
  RotateCw,
  Clock,
  Sparkles,
  Search,
  Lock,
  LogOut,
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
  ArrowUpRight,
  Server
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarTrigger,
  SidebarRail,
  SidebarInset,
  SidebarSeparator,
} from '../ui/sidebar';
import { AdminView } from '../../types';
import { AdminPos } from './AdminPos';
import { AdminOrders } from './AdminOrders';
import { AdminKitchen } from './AdminKitchen';
import { AdminMenu } from './AdminMenu';
import { AdminInventory } from './AdminInventory';
import { AdminUsers } from './AdminUsers';
import { AdminRoles } from './AdminRoles';
import { AuthWall } from '../auth/AuthWall';

export const AdminLayout: React.FC = () => {
  const { 
    settings,
    currentUser, 
    setCurrentUser,
    users,
    activeAdminTab, 
    setActiveAdminTab, 
    setActiveSurface,
    orders,
    menuItems,
    inventoryItems,
    inventoryTransactions,
    isOffline,
    setIsOffline,
    offlineQueue,
    syncOfflineQueue,
    backendStatus,
    setIsLaravelModalOpen,
    logout,
    quickLogin,
  } = useRestaurant();

  // If user is not authenticated, display full Auth Wall requiring login
  if (!currentUser) {
    return <AuthWall moduleName="Restaurant Backoffice & POS" />;
  }

  // Metrics for badges
  const pendingPrepCount = orders.filter(o => o.status === 'confirmed' || o.status === 'preparing').length;
  const activeOrdersCount = orders.filter(o => o.status !== 'completed' && o.status !== 'cancelled').length;
  
  // Stock alerts calculation
  const lowStockCount = inventoryItems.filter(item => {
    const stock = inventoryTransactions
      .filter(t => t.inventory_item_id === item.id)
      .reduce((sum, t) => sum + t.quantity, 0);
    return stock <= item.low_stock_threshold;
  }).length;

  // Role Permissions Guard
  const canAccessTab = (tab: AdminView): boolean => {
    if (!currentUser) return false;
    if (currentUser.role === 'admin') return true;

    if (currentUser.role === 'cashier') {
      return ['pos', 'orders', 'roles'].includes(tab);
    }

    if (currentUser.role === 'kitchen_staff') {
      return ['kitchen', 'orders', 'roles'].includes(tab);
    }

    return false;
  };

  const navGroups = [
    {
      label: 'Operations & Service',
      items: [
        {
          id: 'pos' as AdminView,
          title: 'POS Terminal',
          icon: Calculator,
          roles: ['admin', 'cashier'],
          badge: 'Cash Only',
          badgeVariant: 'amber',
        },
        {
          id: 'orders' as AdminView,
          title: 'Orders & Register',
          icon: ReceiptText,
          roles: ['admin', 'cashier', 'kitchen_staff'],
          count: activeOrdersCount > 0 ? activeOrdersCount : undefined,
          badgeVariant: 'default',
        },
        {
          id: 'kitchen' as AdminView,
          title: 'Kitchen KDS',
          icon: ChefHat,
          roles: ['admin', 'kitchen_staff'],
          count: pendingPrepCount > 0 ? pendingPrepCount : undefined,
          badgeVariant: pendingPrepCount > 0 ? 'amber' : 'default',
        },
      ]
    },
    {
      label: 'Inventory & Catalog',
      items: [
        {
          id: 'menu' as AdminView,
          title: 'Menu & Recipes',
          icon: UtensilsCrossed,
          roles: ['admin'],
          count: menuItems.length,
          badgeVariant: 'default',
        },
        {
          id: 'inventory' as AdminView,
          title: 'Derived Ledger',
          icon: Boxes,
          roles: ['admin'],
          count: lowStockCount > 0 ? `${lowStockCount} Low` : undefined,
          badgeVariant: lowStockCount > 0 ? 'destructive' : 'default',
        },
      ]
    },
    {
      label: 'Staff & Governance',
      items: [
        {
          id: 'users' as AdminView,
          title: 'Staff Directory',
          icon: Users,
          roles: ['admin'],
          count: users.length,
          badgeVariant: 'default',
        },
        {
          id: 'roles' as AdminView,
          title: 'RBAC Permissions',
          icon: ShieldCheck,
          roles: ['admin', 'cashier', 'kitchen_staff'],
          badge: 'Matrix',
          badgeVariant: 'outline',
        },
      ]
    }
  ];

  // Helper for active tab metadata
  const currentTabMeta = navGroups
    .flatMap(g => g.items)
    .find(i => i.id === activeAdminTab);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-stone-950 text-stone-100">
        
        {/* shadcn Sidebar Component */}
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

          {/* Sidebar Content: Navigation Groups */}
          <SidebarContent className="px-2 py-3 space-y-3">
            {navGroups.map((group) => (
              <SidebarGroup key={group.label} className="p-0">
                <SidebarGroupLabel className="text-[10px] uppercase font-bold text-stone-500 tracking-wider px-2 py-1 mb-1">
                  {group.label}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isAllowed = canAccessTab(item.id);
                      const isActive = activeAdminTab === item.id;

                      return (
                        <SidebarMenuItem key={item.id}>
                          <SidebarMenuButton
                            isActive={isActive}
                            tooltip={item.title}
                            onClick={() => {
                              if (isAllowed) {
                                setActiveAdminTab(item.id);
                                const routeMap: Record<string, string> = {
                                  pos: '/pos',
                                  orders: '/orders',
                                  kitchen: '/kitchen',
                                  menu: '/menu',
                                  inventory: '/inventory',
                                  users: '/users',
                                  roles: '/users',
                                };
                                if (routeMap[item.id]) {
                                  router.visit(routeMap[item.id]);
                                }
                              }
                            }}
                            className={`relative transition-all rounded-xl ${
                              isActive
                                ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20 hover:bg-amber-400 hover:text-stone-950'
                                : isAllowed
                                ? 'text-stone-300 hover:bg-stone-800 hover:text-stone-100'
                                : 'text-stone-600 hover:bg-transparent cursor-not-allowed opacity-50'
                            }`}
                          >
                            <Icon className={`size-4 shrink-0 ${isActive ? 'text-stone-950' : isAllowed ? 'text-stone-400' : 'text-stone-600'}`} />
                            <span className="truncate flex-1 text-xs">{item.title}</span>
                            
                            {!isAllowed ? (
                              <Lock className="size-3 text-stone-600 shrink-0 ml-auto group-data-[collapsible=icon]:hidden" />
                            ) : item.count !== undefined ? (
                              <span
                                className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full shrink-0 ml-auto group-data-[collapsible=icon]:hidden ${
                                  isActive
                                    ? 'bg-stone-950 text-amber-400'
                                    : item.badgeVariant === 'destructive'
                                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                    : item.badgeVariant === 'amber'
                                    ? 'bg-amber-500/20 text-amber-300'
                                    : 'bg-stone-800 text-stone-400'
                                }`}
                              >
                                {item.count}
                              </span>
                            ) : item.badge ? (
                              <span
                                className={`text-[9px] font-mono px-1.5 py-0.2 rounded shrink-0 ml-auto group-data-[collapsible=icon]:hidden ${
                                  isActive
                                    ? 'bg-stone-950 text-amber-400 font-bold'
                                    : 'bg-stone-800 text-stone-400 border border-stone-700/50'
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

          {/* Sidebar Footer: Staff Account Profile & Quick Links */}
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

          </SidebarFooter>

          <SidebarRail />
        </Sidebar>

        {/* Sidebar Inset: Header Topbar & Tab Content */}
        <SidebarInset className="flex-1 flex flex-col min-w-0 bg-stone-950">
          
          {/* Admin Header Topbar */}
          <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-stone-800 bg-stone-950/90 px-4 backdrop-blur-md">
            
            {/* Left: Sidebar Trigger & Breadcrumb */}
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div className="h-4 w-px bg-stone-800" />
              
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-stone-500 hidden sm:inline">Admin</span>
                <span className="text-xs text-stone-600 hidden sm:inline">/</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-stone-100">
                    {currentTabMeta?.title || 'Dashboard'}
                  </span>
                  {currentTabMeta?.badge && (
                    <Badge variant="outline" className="text-[9px] font-mono py-0 px-1.5 border-amber-500/30 text-amber-400">
                      {currentTabMeta.badge}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Network status & quick actions */}
            <div className="flex items-center gap-2">
              
              {/* Laravel Backend Integration Modal Trigger (Admin Only) */}
              {currentUser?.role === 'admin' && (
                <Button
                  id="admin-laravel-integration-btn"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsLaravelModalOpen(true)}
                  className={`h-8 px-2.5 text-xs gap-1.5 rounded-xl border ${
                    backendStatus === 'connected'
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                      : 'border-stone-800 text-stone-300 hover:text-stone-100 hover:border-amber-500/40'
                  }`}
                  title="Configure and sync with Laravel backend API (Admin Only)"
                >
                  <Server className={`size-3.5 ${backendStatus === 'connected' ? 'text-emerald-400' : 'text-amber-400'}`} />
                  <span className="hidden sm:inline font-mono">
                    {backendStatus === 'connected' ? 'Laravel: Live' : 'Laravel API'}
                  </span>
                </Button>
              )}

              {/* POS Network Status / Offline Simulator */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsOffline(!isOffline)}
                className={`h-8 px-2.5 text-xs gap-1.5 rounded-xl border ${
                  isOffline 
                    ? 'border-amber-500/50 bg-amber-500/10 text-amber-300' 
                    : 'border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
                title={isOffline ? 'POS is currently in Offline Mode' : 'Toggle Offline Mode for POS Testing'}
              >
                {isOffline ? <WifiOff className="size-3.5 text-amber-400" /> : <Wifi className="size-3.5 text-emerald-400" />}
                <span className="hidden sm:inline font-mono">{isOffline ? 'Offline' : 'Online'}</span>
              </Button>

              {offlineQueue.length > 0 && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={syncOfflineQueue}
                  className="h-8 px-2.5 text-xs bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold gap-1.5 rounded-xl animate-pulse"
                >
                  <RotateCw className="size-3.5" />
                  <span>Sync ({offlineQueue.length})</span>
                </Button>
              )}

              {/* Customer Storefront switch */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setActiveSurface('public_menu');
                  router.visit('/');
                }}
                className="h-8 text-xs border-stone-800 hover:border-amber-500/50 hover:bg-stone-900 text-stone-300 hover:text-amber-400 gap-1.5 rounded-xl"
              >
                <Store className="size-3.5 text-amber-400" />
                <span className="hidden lg:inline">Storefront</span>
              </Button>

              {/* Active Orders Quick Counter */}
              <div 
                onClick={() => setActiveAdminTab('orders')}
                className="hidden md:flex items-center gap-2 px-3 py-1 bg-stone-900 border border-stone-800 rounded-xl cursor-pointer hover:border-stone-700 transition"
              >
                <div className="size-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-semibold text-stone-300">
                  {activeOrdersCount} Active Order{activeOrdersCount === 1 ? '' : 's'}
                </span>
              </div>

            </div>

          </header>

          {/* Main Content Workspace */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
            {!canAccessTab(activeAdminTab) ? (
              <div className="max-w-md mx-auto my-20 p-8 text-center bg-stone-900 border border-stone-800 rounded-3xl space-y-4 shadow-xl">
                <div className="w-14 h-14 rounded-2xl bg-red-500/20 text-red-400 mx-auto flex items-center justify-center">
                  <ShieldAlert className="w-7 h-7" />
                </div>
                <h3 className="text-base font-black text-stone-100">Access Restricted</h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Your active staff account (<strong>{currentUser?.name}</strong>, role: <strong>{currentUser?.role}</strong>) does not have permission to access the <strong>{currentTabMeta?.title}</strong> module.
                </p>
                <Button
                  onClick={() => {
                    const fallbackTab = currentUser?.role === 'kitchen_staff' ? 'kitchen' : 'pos';
                    setActiveAdminTab(fallbackTab);
                  }}
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl"
                >
                  Return to Authorized Workspace
                </Button>
              </div>
            ) : (
              <div className="min-w-0">
                {activeAdminTab === 'pos' && <AdminPos />}
                {activeAdminTab === 'orders' && <AdminOrders />}
                {activeAdminTab === 'kitchen' && <AdminKitchen />}
                {activeAdminTab === 'menu' && <AdminMenu />}
                {activeAdminTab === 'inventory' && <AdminInventory />}
                {activeAdminTab === 'users' && <AdminUsers />}
                {activeAdminTab === 'roles' && <AdminRoles />}
              </div>
            )}
          </main>

        </SidebarInset>

      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
