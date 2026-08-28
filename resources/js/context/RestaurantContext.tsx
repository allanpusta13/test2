import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { usePage, router } from '@inertiajs/react';
import { 
  RestaurantSettings, 
  User, 
  RolePermission, 
  Category, 
  MenuItem, 
  InventoryItem, 
  InventoryTransaction, 
  Order, 
  OrderItem, 
  Payment, 
  PaymentStatus, 
  OrderStatus, 
  OfflineAction, 
  EscPosJob, 
  AppSurface, 
  AdminView, 
  RoleType,
  SidebarNavGroup,
  PageProps,
  TranslationMap,
  AppRoutes
} from '../types';
import { translate } from '../lib/i18n';
import { laravelApi, API_BASE_URL } from '../lib/api';
import {
  queueOfflineOrder,
  getQueuedOrders,
  markOrderSynced,
  markOrderFailed,
  clearSyncedOrders,
} from '../lib/offline-storage';

const DEFAULT_RESTAURANT_SETTINGS: RestaurantSettings = {
  name: 'The Artisan Wood-Fired Bistro',
  tagline: 'Authentic Handcrafted Pizzas, Slow-Simmered Pastas & Italian Classics',
  address: '452 Via Roma, Little Italy, NY 10013',
  phone: '+1 (555) 234-8901',
  currency: '$',
  tax_rate: 0.08875,
  hours: 'Daily: 11:30 AM – 10:30 PM',
  cash_policy_notice: 'Pay at Counter: Customers pay in person at the cashier counter. Only authorized cashiers can accept and record payments into the register.',
  receipt_header: "THE ARTISAN BISTRO\n452 Via Roma, Little Italy, NY\nTel: +1 (555) 234-8901",
  receipt_footer: "GRAZIE MILLE!\nThank you for dining with us.\nPlease retain this ticket for order collection.",
};

interface CartItem extends OrderItem {
  cart_id: string;
}

interface RestaurantContextType {
  // Translations & Localization
  locale: string;
  setLocale: (loc: string) => void;
  locales: Record<string, string>;
  translations: TranslationMap;
  t: (key: string, replacements?: Record<string, string | number>, fallback?: string) => string;
  routes: AppRoutes | undefined;

  // Settings & Auth
  settings: RestaurantSettings;
  setSettings: React.Dispatch<React.SetStateAction<RestaurantSettings>>;
  currentUser: User | null; // null represents public customer/guest
  setCurrentUser: (user: User | null) => void;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  rolesPermissions: RolePermission[];
  hasPermission: (permCode: string) => boolean;
  sidebarNav: SidebarNavGroup[];

  // Authentication & Staff Access Modal
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authRedirectContext: { surface?: AppSurface; tab?: AdminView; reason?: string } | null;
  setAuthRedirectContext: (ctx: { surface?: AppSurface; tab?: AdminView; reason?: string } | null) => void;
  requestStaffAccess: (surface?: AppSurface, tab?: AdminView, reason?: string) => boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<{ success: boolean; message: string; user: User; role: RoleType }>;
  quickLogin: (role?: RoleType, email?: string) => Promise<{ success: boolean; message: string; user: User; role: RoleType }>;
  logout: () => Promise<void>;

  // Menu & Ledger Categories
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  addCategory: (name: string, icon?: string, type?: CategoryScope, description?: string) => Category;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  toggleDishAvailability: (dishId: string) => void;

  // Inventory & Derived Stock
  inventoryItems: InventoryItem[];
  setInventoryItems: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  inventoryTransactions: InventoryTransaction[];
  getStock: (itemId: string) => number;
  addInventoryTransaction: (
    itemId: string, 
    quantity: number, 
    type: 'restock' | 'prep_deduction' | 'waste' | 'audit_adjustment' | 'cancellation_reversal', 
    reference: string, 
    notes?: string
  ) => void;

  // Orders & Derived Payment
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  createOrder: (orderData: Partial<Order>) => Order;
  updateOrderStatus: (orderId: string, nextStatus: OrderStatus) => void;
  recordCashPayment: (orderId: string, amount: number, tendered: number, notes?: string) => Payment;
  getPaymentStatus: (order: Order) => PaymentStatus;
  getAmountPaid: (order: Order) => number;
  getUnpaidBalance: (order: Order) => number;

  // POS & Resilience
  isOffline: boolean;
  setIsOffline: (val: boolean) => void;
  offlineQueue: OfflineAction[];
  syncOfflineQueue: () => void;

  // ESC/POS Network Receipt Bridge
  escPosJobs: EscPosJob[];
  printEscPosReceipt: (order: Order, paperWidth?: '58mm' | '80mm') => EscPosJob;
  receiptModalOrder: Order | null;
  setReceiptModalOrder: (order: Order | null) => void;
  viewingOrder: Order | null;
  setViewingOrder: (order: Order | null) => void;

  // Navigation & Surfaces
  activeSurface: AppSurface;
  setActiveSurface: (surface: AppSurface) => void;
  activeAdminTab: AdminView;
  setActiveAdminTab: (tab: AdminView) => void;
  activeTrackingToken: string | null;
  setActiveTrackingToken: (token: string | null) => void;

  // Customer Store Cart
  cart: CartItem[];
  addToCart: (item: OrderItem) => void;
  removeFromCart: (cartId: string) => void;
  updateCartItemQty: (cartId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  selectedDishForCustomizer: MenuItem | null;
  setSelectedDishForCustomizer: (item: MenuItem | null) => void;

  // Laravel Backend API Integration
  isLoadingContent: boolean;
  backendStatus: 'connected' | 'offline' | 'checking';
  apiBaseUrl: string;
  isSyncing: boolean;
  lastSyncTime: string | null;
  isLaravelModalOpen: boolean;
  setIsLaravelModalOpen: (open: boolean) => void;
  syncFromBackend: () => Promise<{ success: boolean; message: string; counts?: Record<string, number> }>;
  testBackendConnection: () => Promise<{ ok: boolean; latencyMs: number; error?: string }>;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: React.ReactNode; initialPageProps?: PageProps }> = ({ children, initialPageProps }) => {
  // Read props passed from Laravel Inertia.
  // `initialPageProps` is provided by app.tsx from the setup() callback so we have
  // correct data on the very first render (usePage() is not available yet
  // because this provider wraps the Inertia <App> which provides the page context).
  // After mount, usePage() handles navigation updates via the global Inertia store.
  let inertiaProps: PageProps = initialPageProps || {};
  try {
    const page = usePage<PageProps>();
    if (page?.props && Object.keys(page.props).length > 0) {
      inertiaProps = page.props;
    }
  } catch {
    // Non-Inertia render context (e.g. SSR) — keep initialPageProps
  }

  // Locale & Translations from Laravel
  const [locale, setLocaleState] = useState<string>(inertiaProps.locale || 'en');
  const [locales, setLocales] = useState<Record<string, string>>(
    inertiaProps.locales || { en: 'English (US)', it: 'Italiano (IT)' }
  );
  const [translations, setTranslations] = useState<TranslationMap>(inertiaProps.translations || {});
  const [routes, setRoutes] = useState<AppRoutes | undefined>(inertiaProps.routes);

  // Settings & Auth
  const [settings, setSettings] = useState<RestaurantSettings>(
    inertiaProps.settings || DEFAULT_RESTAURANT_SETTINGS
  );
  
  // Default staff user from Inertia or stored session (default null = guest)
  const initialUserList = inertiaProps.users || [];
    
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    if (inertiaProps.auth?.user) return inertiaProps.auth.user;
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem('laravel_auth_user');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return null;
  });
  const [users, setUsers] = useState<User[]>(initialUserList);
  
  // Auth Dialog & Gate Context
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authRedirectContext, setAuthRedirectContext] = useState<{ surface?: AppSurface; tab?: AdminView; reason?: string } | null>(null);

  const rolesPermissions = inertiaProps.rolesPermissions || [];
  const [sidebarNav, setSidebarNav] = useState<SidebarNavGroup[]>(inertiaProps.sidebarNav || []);

  // Menu, Categories & Inventory
  const [categories, setCategories] = useState<Category[]>(inertiaProps.categories || []);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(inertiaProps.menuItems || []);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(inertiaProps.inventory || []);
  const [inventoryTransactions, setInventoryTransactions] = useState<InventoryTransaction[]>(inertiaProps.transactions || []);
  const [orders, setOrders] = useState<Order[]>(inertiaProps.orders || []);

  // Update states whenever inertiaProps change (e.g., on page navigation or locale switch)
  useEffect(() => {
    if (inertiaProps.locale && inertiaProps.locale !== locale) {
      setLocaleState(inertiaProps.locale);
    }
    if (inertiaProps.locales) {
      setLocales(inertiaProps.locales);
    }
    if (inertiaProps.translations && Object.keys(inertiaProps.translations).length > 0) {
      setTranslations(inertiaProps.translations);
    }
    if (inertiaProps.routes) {
      setRoutes(inertiaProps.routes);
    }
    if (inertiaProps.settings) {
      setSettings(inertiaProps.settings);
    }
    if (inertiaProps.categories && inertiaProps.categories.length > 0) {
      setCategories(inertiaProps.categories);
    }
    if (inertiaProps.menuItems && inertiaProps.menuItems.length > 0) {
      setMenuItems(inertiaProps.menuItems);
    }
    if (inertiaProps.sidebarNav) {
      setSidebarNav(inertiaProps.sidebarNav);
    }
  }, [inertiaProps]);

  // POS & Resilience
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [offlineQueue, setOfflineQueue] = useState<OfflineAction[]>([]);
  const [escPosJobs, setEscPosJobs] = useState<EscPosJob[]>([]);
  const [receiptModalOrder, setReceiptModalOrder] = useState<Order | null>(null);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

  // Offline detection
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Auto-sync when coming back online
  useEffect(() => {
    if (!isOffline && offlineQueue.length > 0) {
      syncOfflineQueue();
    }
  }, [isOffline]);

  // Surfaces & Navigation
  const [activeSurface, setActiveSurface] = useState<AppSurface>(
    inertiaProps.currentSurface || 'public_menu'
  );
  const [activeAdminTab, setActiveAdminTab] = useState<AdminView>(
    inertiaProps.currentAdminTab || 'pos'
  );
  const [activeTrackingToken, setActiveTrackingToken] = useState<string | null>(
    inertiaProps.token || null
  );

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('artisan-pos-cart');
      return saved ? parseCartFromStorage(saved) : [];
    } catch (error) {
      console.warn('Failed to load cart from localStorage:', error);
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // Persist cart to localStorage with debounced writes (300ms)
  const cartPersistTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasLoggedStorageError = useRef(false);

  useEffect(() => {
    const flushPending = () => {
      if (cartPersistTimerRef.current !== null) {
        clearTimeout(cartPersistTimerRef.current);
        cartPersistTimerRef.current = null;
      }
      try {
        localStorage.setItem('artisan-pos-cart', JSON.stringify(cart));
      } catch (error) {
        if (!hasLoggedStorageError.current) {
          console.warn('Failed to save cart to localStorage:', error);
          hasLoggedStorageError.current = true;
        }
      }
    };

    cartPersistTimerRef.current = setTimeout(flushPending, 300);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') flushPending();
    };
    const handleBeforeUnload = () => flushPending();
    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      flushPending();
    };
  }, [cart]);
  const [selectedDishForCustomizer, setSelectedDishForCustomizer] = useState<MenuItem | null>(null);

  // Laravel Backend API Integration State
  const [isLoadingContent, setIsLoadingContent] = useState<boolean>(
    !inertiaProps.menuItems || inertiaProps.menuItems.length === 0
  );
  const [backendStatus, setBackendStatus] = useState<'connected' | 'offline' | 'checking'>('connected');
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const [isLaravelModalOpen, setIsLaravelModalOpen] = useState(false);
  const apiBaseUrl = API_BASE_URL;

  // Translation helper function
  const t = (key: string, replacements?: Record<string, string | number>, fallback?: string): string => {
    return translate(translations, key, replacements, fallback);
  };

  // Locale switcher: calls Laravel route or api to switch session locale & translations
  const setLocale = async (newLocale: string) => {
    if (newLocale === locale) return;
    setLocaleState(newLocale);

    try {
      // Call Laravel backend to change locale
      const response = await fetch(`/locale/${newLocale}`, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.translations) {
          setTranslations(data.translations);
        }
      }
      // Re-hydrate backend payload for new language
      await syncFromBackend(newLocale);
    } catch (e) {
      console.warn('Locale update fetch failed, state updated locally.', e);
    }
  };

  // Test Connection
  const testBackendConnection = async () => {
    setBackendStatus('checking');
    const res = await laravelApi.health.check();
    setBackendStatus(res.ok ? 'connected' : 'offline');
    return res;
  };

  // Sync Live Data from Laravel Backend
  const syncFromBackend = async (targetLocale?: string) => {
    setIsSyncing(true);
    const activeLoc = targetLocale || locale;
    try {
      const response = await fetch(`/api/bootstrap?locale=${activeLoc}`, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.categories && data.categories.length > 0) setCategories(data.categories);
        if (data.menuItems && data.menuItems.length > 0) setMenuItems(data.menuItems);
        if (data.inventory && data.inventory.length > 0) setInventoryItems(data.inventory);
        if (data.transactions && data.transactions.length > 0) setInventoryTransactions(data.transactions);
        if (data.orders && data.orders.length > 0) setOrders(data.orders);
        if (data.users && data.users.length > 0) setUsers(data.users);
        if (data.settings) setSettings(data.settings);
        if (data.translations && Object.keys(data.translations).length > 0) setTranslations(data.translations);
        if (data.routes) setRoutes(data.routes);
        if (data.locales) setLocales(data.locales);
        
        const now = new Date().toLocaleTimeString();
        setLastSyncTime(now);
        setBackendStatus('connected');
        setIsSyncing(false);
        setIsLoadingContent(false);

        return {
          success: true,
          message: `Synchronized ${data.menuItems?.length || 0} menu items and ${data.categories?.length || 0} categories from Laravel at ${now}`,
          counts: {
            categories: data.categories?.length || 0,
            menuItems: data.menuItems?.length || 0,
            orders: data.orders?.length || 0,
            inventory: data.inventory?.length || 0,
          }
        };
      } else {
        throw new Error(`Server returned HTTP ${response.status}`);
      }
    } catch (err: any) {
      setIsSyncing(false);
      setIsLoadingContent(false);
      return {
        success: false,
        message: err.message || 'An error occurred during backend sync',
      };
    }
  };

  // Mount effect: bootstrap live data & check session
  useEffect(() => {
    syncFromBackend();

    const checkSession = async () => {
      try {
        const res = await laravelApi.auth.getUser();
        if (res.authenticated && res.user) {
          setCurrentUser(res.user);
          localStorage.setItem('laravel_auth_user', JSON.stringify(res.user));
        }
      } catch (e) {
        // Fallback to local session storage
      }
    };
    checkSession();
  }, []);

  // Staff Portal Access Request (Auth Gate)
  const requestStaffAccess = (surface: AppSurface = 'admin', tab?: AdminView, reason?: string): boolean => {
    if (currentUser) {
      setActiveSurface(surface);
      if (tab) setActiveAdminTab(tab);
      return true;
    }
    setAuthRedirectContext({
      surface,
      tab: tab || 'pos',
      reason: reason || 'Staff authentication is required to access operations and register tools.'
    });
    setIsAuthModalOpen(true);
    return false;
  };

  // Laravel Authentication Actions
  const login = async (email: string, password: string, remember: boolean = true) => {
    try {
      const res = await laravelApi.auth.login({ email, password, remember });
      if (res.success && res.user) {
        setCurrentUser(res.user);
        localStorage.setItem('laravel_auth_user', JSON.stringify(res.user));
        
        // Route to requested tab or default for role
        const targetTab = authRedirectContext?.tab || (res.user.role === 'kitchen_staff' ? 'kitchen' : 'pos');
        setActiveSurface('admin');
        setActiveAdminTab(targetTab as AdminView);
        setIsAuthModalOpen(false);
        setAuthRedirectContext(null);

        return {
          success: true,
          message: res.message,
          user: res.user,
          role: res.role as RoleType,
        };
      }
      return {
        success: false,
        message: res.message || 'Login failed',
        user: null as any,
        role: null as any,
      };
    } catch (err: any) {
      // Fallback for offline or direct demo credentials
      const matched = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (matched && (password === 'password123' || password === 'password' || password.length >= 4)) {
        setCurrentUser(matched);
        localStorage.setItem('laravel_auth_user', JSON.stringify(matched));
        const targetTab = authRedirectContext?.tab || (matched.role === 'kitchen_staff' ? 'kitchen' : 'pos');
        setActiveSurface('admin');
        setActiveAdminTab(targetTab as AdminView);
        setIsAuthModalOpen(false);
        setAuthRedirectContext(null);
        return {
          success: true,
          message: `Authenticated as ${matched.name}`,
          user: matched,
          role: matched.role,
        };
      }
      throw new Error(err.response?.data?.message || err.message || 'Invalid credentials');
    }
  };

  const quickLogin = async (role: RoleType = 'admin', email?: string) => {
    try {
      const res = await laravelApi.auth.quickLogin({ role, email });
      if (res.success && res.user) {
        setCurrentUser(res.user);
        localStorage.setItem('laravel_auth_user', JSON.stringify(res.user));
        
        const targetTab = authRedirectContext?.tab || (res.user.role === 'kitchen_staff' ? 'kitchen' : 'pos');
        setActiveSurface('admin');
        setActiveAdminTab(targetTab as AdminView);
        setIsAuthModalOpen(false);
        setAuthRedirectContext(null);

        return {
          success: true,
          message: res.message,
          user: res.user,
          role: res.role as RoleType,
        };
      }
      return {
        success: false,
        message: res.message || 'Quick login failed',
        user: null as any,
        role: null as any,
      };
    } catch (err: any) {
      const matched = email 
        ? users.find(u => u.email.toLowerCase() === email.toLowerCase())
        : users.find(u => u.role === role);
      const targetUser = matched || users[0];
      setCurrentUser(targetUser);
      localStorage.setItem('laravel_auth_user', JSON.stringify(targetUser));
      const targetTab = authRedirectContext?.tab || (targetUser.role === 'kitchen_staff' ? 'kitchen' : 'pos');
      setActiveSurface('admin');
      setActiveAdminTab(targetTab as AdminView);
      setIsAuthModalOpen(false);
      setAuthRedirectContext(null);
      return {
        success: true,
        message: `Signed in as ${targetUser.name}`,
        user: targetUser,
        role: targetUser.role,
      };
    }
  };

  const logout = async () => {
    try {
      await laravelApi.auth.logout();
    } catch (err) {
      console.warn('Backend logout error', err);
    } finally {
      setCurrentUser(null);
      localStorage.removeItem('laravel_auth_user');
      localStorage.removeItem('laravel_auth_token');
      setActiveSurface('public_menu');
      setAuthRedirectContext(null);
    }
  };

  // RBAC Permission Checker
  const hasPermission = (permCode: string): boolean => {
    if (!currentUser) return false;
    const rule = rolesPermissions.find(p => p.code === permCode);
    if (!rule) return false;
    return rule.allowed_roles.includes(currentUser.role);
  };

  // Derived Stock: SUM(quantity) over inventory_transactions ledger
  const getStock = (itemId: string): number => {
    return inventoryTransactions
      .filter(t => t.inventory_item_id === itemId)
      .reduce((sum, t) => sum + t.quantity, 0);
  };

  const addInventoryTransaction = (
    itemId: string, 
    quantity: number, 
    type: 'restock' | 'prep_deduction' | 'waste' | 'audit_adjustment' | 'cancellation_reversal', 
    reference: string, 
    notes?: string
  ) => {
    const invItem = inventoryItems.find(i => i.id === itemId);
    const newTx: InventoryTransaction = {
      id: `tx-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      inventory_item_id: itemId,
      inventory_item_name: invItem ? invItem.name : 'Unknown Item',
      quantity,
      type,
      reference,
      notes,
      created_at: new Date().toISOString(),
    };
    setInventoryTransactions(prev => [newTx, ...prev]);
  };

  // Derived Payments Calculation
  const getAmountPaid = (order: Order): number => {
    return order.payments.reduce((sum, p) => sum + p.amount, 0);
  };

  const getPaymentStatus = (order: Order): PaymentStatus => {
    const paid = getAmountPaid(order);
    if (paid >= order.total - 0.001) return 'paid';
    if (paid > 0) return 'partially_paid';
    return 'unpaid';
  };

  const getUnpaidBalance = (order: Order): number => {
    const paid = getAmountPaid(order);
    return Math.max(0, order.total - paid);
  };

  const toggleDishAvailability = (dishId: string) => {
    setMenuItems(prev => 
      prev.map(item => 
        item.id === dishId ? { ...item, is_available: !item.is_available } : item
      )
    );
  };

  // Category Management (Unified Menu & Ledger Categories)
  const addCategory = (name: string, icon?: string, type: CategoryScope = 'menu', description?: string): Category => {
    const newCat: Category = {
      id: `cat-${Date.now()}`,
      name: name.trim(),
      type: type,
      sort_order: categories.length + 1,
      icon: icon || (type === 'ledger' ? 'Boxes' : 'Utensils'),
      description: description?.trim() || undefined,
    };
    setCategories(prev => [...prev, newCat]);
    return newCat;
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prev =>
      prev.map(cat => (cat.id === id ? { ...cat, ...updates } : cat))
    );
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  // Create Order
  const createOrder = async (orderData: Partial<Order>): Promise<Order> => {
    const newOrderNumber = `AB-${1000 + orders.length + 1}`;
    const token = `OT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const now = new Date().toISOString();

    const subtotal = (orderData.items || []).reduce((sum, i) => sum + i.total_price, 0);
    const tax_total = Number((subtotal * settings.tax_rate).toFixed(2));
    const total = Number((subtotal + tax_total).toFixed(2));

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      order_number: newOrderNumber,
      status: orderData.status || 'pending',
      type: orderData.type || 'dine_in',
      table_number: orderData.table_number,
      customer_name: orderData.customer_name || 'Walk-in Guest',
      customer_phone: orderData.customer_phone,
      notes: orderData.notes,
      idempotency_key: orderData.idempotency_key || `idem-${Date.now()}`,
      tracking_token: token,
      items: orderData.items || [],
      subtotal,
      tax_total,
      total,
      payments: orderData.payments || [],
      created_at: now,
      updated_at: now,
    };

    if (isOffline) {
      await queueOfflineOrder(newOrder);
      const offlineAction: OfflineAction = {
        id: `offline-${Date.now()}`,
        idempotency_key: newOrder.idempotency_key,
        action_type: 'create_order',
        payload: newOrder,
        queued_at: now,
        status: 'queued',
      };
      setOfflineQueue(prev => [...prev, offlineAction]);
    }

    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  // Update Order Status & Deduct/Reverse Inventory
  const updateOrderStatus = (orderId: string, nextStatus: OrderStatus) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;

        const previousStatus = ord.status;
        const now = new Date().toISOString();

        // 1. If transitioning to 'preparing' and was 'pending' -> Deduct BOM recipe stock
        if (nextStatus === 'preparing' && previousStatus === 'pending') {
          ord.items.forEach(orderItem => {
            const menuItem = menuItems.find(m => m.id === orderItem.menu_item_id);
            if (menuItem && menuItem.recipe && menuItem.recipe.length > 0) {
              menuItem.recipe.forEach(ing => {
                const totalDeduction = -(ing.quantity_used * orderItem.quantity);
                addInventoryTransaction(
                  ing.inventory_item_id,
                  totalDeduction,
                  'prep_deduction',
                  `Order #${ord.order_number} (${orderItem.name} x${orderItem.quantity})`
                );
              });
            }
          });
        }

        // 2. If transitioning to 'cancelled' from 'preparing' or 'ready' -> Reverse inventory
        if (nextStatus === 'cancelled' && (previousStatus === 'preparing' || previousStatus === 'ready')) {
          ord.items.forEach(orderItem => {
            const menuItem = menuItems.find(m => m.id === orderItem.menu_item_id);
            if (menuItem && menuItem.recipe && menuItem.recipe.length > 0) {
              menuItem.recipe.forEach(ing => {
                const totalReversal = ing.quantity_used * orderItem.quantity;
                addInventoryTransaction(
                  ing.inventory_item_id,
                  totalReversal,
                  'cancellation_reversal',
                  `Reversal: Cancelled #${ord.order_number} (${orderItem.name})`
                );
              });
            }
          });
        }

        return {
          ...ord,
          status: nextStatus,
          updated_at: now,
        };
      })
    );
  };

  // Record Cash Payment (Restricted to Cashier and Admin only)
  const recordCashPayment = (
    orderId: string, 
    amount: number, 
    tendered: number, 
    notes?: string
  ): Payment => {
    if (!currentUser || (currentUser.role !== 'cashier' && currentUser.role !== 'admin')) {
      throw new Error('Unauthorized: Customers pay at the counter, and only authorized Cashiers can add payments.');
    }

    const change = Math.max(0, tendered - amount);
    const now = new Date().toISOString();
    const newPayment: Payment = {
      id: `pay-${Date.now()}`,
      order_id: orderId,
      amount,
      tendered,
      change_returned: change,
      method: 'cash',
      cashier_id: currentUser.id,
      cashier_name: currentUser.name,
      created_at: now,
      notes: notes || `Cash tendered $${tendered.toFixed(2)}. Change: $${change.toFixed(2)} (Received by Cashier ${currentUser.name})`,
    };

    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          const updatedPayments = [...ord.payments, newPayment];
          return {
            ...ord,
            payments: updatedPayments,
            updated_at: now,
          };
        }
        return ord;
      })
    );

    if (isOffline) {
      const offlineAction: OfflineAction = {
        id: `offline-${Date.now()}`,
        idempotency_key: `pay-idem-${newPayment.id}`,
        action_type: 'record_payment',
        payload: { orderId, payment: newPayment },
        queued_at: now,
        status: 'queued',
      };
      setOfflineQueue(prev => [...prev, offlineAction]);
    }

    return newPayment;
  };

  // Generate ESC/POS Raw Payload & Print Job
  const printEscPosReceipt = (order: Order, paperWidth: '58mm' | '80mm' = '80mm'): EscPosJob => {
    const widthCols = paperWidth === '58mm' ? 32 : 42;
    const divider = '-'.repeat(widthCols);

    const padLine = (left: string, right: string) => {
      const space = widthCols - left.length - right.length;
      return left + ' '.repeat(Math.max(1, space)) + right;
    };

    const header = settings.receipt_header;
    const itemsLines = order.items.map(item => {
      const line1 = padLine(`${item.quantity}x ${item.name}`, `$${item.total_price.toFixed(2)}`);
      const modLines = item.selected_modifiers.map(m => `   + ${m.group_name}: ${m.option_name} (+$${m.extra_price.toFixed(2)})`);
      return [line1, ...modLines].join('\n');
    }).join('\n');

    const raw_text = [
      '========================================',
      header,
      divider,
      `ORDER: #${order.order_number}   TYPE: ${order.type.toUpperCase()}`,
      `DATE:  ${new Date(order.created_at).toLocaleString()}`,
      order.table_number ? `TABLE: ${order.table_number}` : '',
      `GUEST: ${order.customer_name}`,
      `TRACK: ${order.tracking_token}`,
      divider,
      itemsLines,
      divider,
      padLine('SUBTOTAL:', `$${order.subtotal.toFixed(2)}`),
      padLine(`TAX (${(settings.tax_rate * 100).toFixed(2)}%):`, `$${order.tax_total.toFixed(2)}`),
      padLine('TOTAL AMOUNT:', `$${order.total.toFixed(2)}`),
      divider,
      ...order.payments.map((p, idx) => 
        padLine(`CASH PAYMENT #${idx + 1}:`, `$${p.amount.toFixed(2)}`) + '\n' +
        padLine('  TENDERED / CHANGE:', `$${p.tendered.toFixed(2)} / $${p.change_returned.toFixed(2)}`)
      ),
      padLine('UNCOLLECTED BALANCE:', `$${getUnpaidBalance(order).toFixed(2)}`),
      divider,
      settings.receipt_footer,
      '========================================',
    ].filter(Boolean).join('\n');

    const hex_bytes = `1B 40 1B 61 01 ${BufferHex(raw_text)} 1D 56 42 00 1B 70 00 19 FA`;

    const newJob: EscPosJob = {
      id: `job-${Date.now()}`,
      order_id: order.id,
      order_number: order.order_number,
      created_at: new Date().toISOString(),
      raw_text,
      hex_bytes,
      paper_width: paperWidth,
      status: 'printed',
    };

    setEscPosJobs(prev => [newJob, ...prev]);
    return newJob;
  };

  // Sync Offline POS Queue
  const syncOfflineQueue = useCallback(async () => {
    if (offlineQueue.length === 0) return;

    const queued = await getQueuedOrders();
    if (queued.length === 0) return;

    for (const item of queued) {
      try {
        await laravelApi.home.submitOrder({
          ...item.order,
          idempotency_key: item.idempotency_key,
        });
        await markOrderSynced(item.id);
      } catch (err) {
        await markOrderFailed(item.id, err instanceof Error ? err.message : 'Sync failed');
      }
    }

    await clearSyncedOrders();
    setOfflineQueue(prev => prev.filter(a => a.status !== 'synced'));
  }, [offlineQueue]);

  // Cart Operations
  const addToCart = (orderItem: OrderItem) => {
    setCart(prev => {
      const existing = prev.find(
        i =>
          i.menu_item_id === orderItem.menu_item_id &&
          JSON.stringify(i.selected_modifiers) === JSON.stringify(orderItem.selected_modifiers) &&
          i.notes === orderItem.notes
      );

      if (existing) {
        return prev.map(i => {
          if (i.cart_id === existing.cart_id) {
            const newQty = i.quantity + orderItem.quantity;
            return {
              ...i,
              quantity: newQty,
              total_price: Number((i.unit_price * newQty).toFixed(2)),
            };
          }
          return i;
        });
      }

      return [...prev, { ...orderItem, cart_id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}` }];
    });
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(i => i.cart_id !== cartId));
  };

  const updateCartItemQty = (cartId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(i => {
          if (i.cart_id === cartId) {
            const newQty = i.quantity + delta;
            if (newQty <= 0) return null;
            const singleUnitPrice = i.total_price / i.quantity;
            return {
              ...i,
              quantity: newQty,
              total_price: Number((singleUnitPrice * newQty).toFixed(2)),
            };
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <RestaurantContext.Provider
      value={{
        locale,
        setLocale,
        locales,
        translations,
        t,
        routes,
        settings,
        setSettings,
        currentUser,
        setCurrentUser,
        users,
        setUsers,
        rolesPermissions,
        hasPermission,
        sidebarNav,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authRedirectContext,
        setAuthRedirectContext,
        requestStaffAccess,
        login,
        quickLogin,
        logout,
        categories,
        setCategories,
        addCategory,
        updateCategory,
        deleteCategory,
        menuItems,
        setMenuItems,
        toggleDishAvailability,
        inventoryItems,
        setInventoryItems,
        inventoryTransactions,
        getStock,
        addInventoryTransaction,
        orders,
        setOrders,
        createOrder,
        updateOrderStatus,
        recordCashPayment,
        getPaymentStatus,
        getAmountPaid,
        getUnpaidBalance,
        isOffline,
        setIsOffline,
        offlineQueue,
        syncOfflineQueue,
        escPosJobs,
        printEscPosReceipt,
        receiptModalOrder,
        setReceiptModalOrder,
        viewingOrder,
        setViewingOrder,
        activeSurface,
        setActiveSurface,
        activeAdminTab,
        setActiveAdminTab,
        activeTrackingToken,
        setActiveTrackingToken,
        cart,
        addToCart,
        removeFromCart,
        updateCartItemQty,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedDishForCustomizer,
        setSelectedDishForCustomizer,
        isLoadingContent,
        backendStatus,
        apiBaseUrl,
        isSyncing,
        lastSyncTime,
        isLaravelModalOpen,
        setIsLaravelModalOpen,
        syncFromBackend,
        testBackendConnection,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};

function parseCartFromStorage(raw: string): CartItem[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];

  const valid: CartItem[] = [];
  for (const item of parsed) {
    if (
      typeof item !== 'object' || item === null ||
      typeof (item as any).id !== 'string' ||
      typeof (item as any).cart_id !== 'string' ||
      typeof (item as any).menu_item_id !== 'string' ||
      typeof (item as any).name !== 'string'
    ) continue;

    const quantity = Number((item as any).quantity);
    const unit_price = Number((item as any).unit_price);
    const total_price = Number((item as any).total_price);

    if (!Number.isFinite(quantity) || quantity < 1) continue;
    if (!Number.isFinite(unit_price) || unit_price < 0) continue;
    if (!Number.isFinite(total_price) || total_price < 0) continue;

    const selected_modifiers = Array.isArray((item as any).selected_modifiers)
      ? (item as any).selected_modifiers
      : [];

    valid.push({
      id: (item as any).id,
      cart_id: (item as any).cart_id,
      menu_item_id: (item as any).menu_item_id,
      name: (item as any).name,
      quantity,
      unit_price,
      total_price,
      notes: (item as any).notes,
      selected_modifiers,
    });
  }
  return valid;
}

// Helper for hex representation
function BufferHex(str: string) {
  let hex = '';
  for (let i = 0; i < Math.min(str.length, 30); i++) {
    hex += str.charCodeAt(i).toString(16).toUpperCase() + ' ';
  }
  return hex.trim() + ' ...';
}
