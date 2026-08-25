import axios, { AxiosError, AxiosInstance } from 'axios';
import { 
  Category, 
  MenuItem, 
  InventoryItem, 
  InventoryTransaction, 
  Order, 
  OrderStatus, 
  Payment, 
  RestaurantSettings, 
  User 
} from '../types';

/**
 * Laravel Client Configuration
 * Supports standard web session cookie and direct page controller endpoints.
 */

export const LARAVEL_BASE_URL = import.meta.env.VITE_LARAVEL_URL || window.location.origin;
export const API_BASE_URL = LARAVEL_BASE_URL;

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
  timeout: 10000,
});

// Request Interceptor: Attach Bearer Token if stored
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('laravel_auth_token') || sessionStorage.getItem('laravel_auth_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Uniform error handling & 401 redirection hook
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('laravel_auth_token');
    }
    return Promise.reject(error);
  }
);

/**
 * Helper to extract Laravel 422 validation error messages
 */
export function formatLaravelErrors(error: unknown): string[] {
  if (axios.isAxiosError(error) && error.response?.status === 422) {
    const errorData = error.response.data as { message?: string; errors?: Record<string, string[]> };
    if (errorData.errors) {
      return Object.values(errorData.errors).flat();
    }
    if (errorData.message) {
      return [errorData.message];
    }
  }
  if (axios.isAxiosError(error)) {
    const msg = (error.response?.data as { message?: string })?.message;
    return [msg || error.message || 'An unexpected error occurred.'];
  }
  return ['An unexpected error occurred.'];
}

/**
 * Helper to unwrap Laravel Resource / Controller responses
 */
function unwrap<T>(data: any): T {
  if (data && typeof data === 'object' && 'data' in data) {
    return data.data as T;
  }
  return data as T;
}

/**
 * Page Controllers Endpoint Definitions
 */
export const laravelApi = {
  // Public Menu & Customer Ordering Page (HomeController)
  home: {
    getList: async (): Promise<any> => {
      const res = await apiClient.get<{ data?: any } | any>('/list');
      return unwrap<any>(res.data) || {};
    },
    getCategories: async (): Promise<Category[]> => {
      const res = await apiClient.get<{ data?: Category[] } | Category[]>('/menu-categories');
      return unwrap<Category[]>(res.data) || [];
    },
    getDish: async (id: string): Promise<MenuItem> => {
      const res = await apiClient.get<{ data?: MenuItem } | MenuItem>(`/menu-dishes/${id}`);
      return unwrap<MenuItem>(res.data);
    },
    submitOrder: async (orderData: Partial<Order>): Promise<Order> => {
      const res = await apiClient.post<{ data?: Order } | Order>('/order', orderData);
      return unwrap<Order>(res.data);
    },
  },

  // POS Page (PosController)
  pos: {
    getList: async (): Promise<any> => {
      const res = await apiClient.get<{ data?: any } | any>('/pos/list');
      return unwrap<any>(res.data) || {};
    },
    createOrder: async (orderData: Partial<Order>): Promise<Order> => {
      const res = await apiClient.post<{ data?: Order } | Order>('/pos/orders', orderData);
      return unwrap<Order>(res.data);
    },
    recordPayment: async (paymentData: { order_id: string; amount: number; tendered: number; notes?: string; cashier_name?: string }): Promise<Payment> => {
      const res = await apiClient.post<{ data?: { payment: Payment } } | any>('/pos/payments', paymentData);
      return res.data?.data?.payment || res.data?.data || res.data;
    },
    getReceipt: async (orderId: string, width: number = 58): Promise<any> => {
      const res = await apiClient.get(`/pos/receipt/${orderId}`, { params: { width } });
      return res.data;
    },
  },

  // Kitchen Page (KitchenController)
  kitchen: {
    getList: async (): Promise<Order[]> => {
      const res = await apiClient.get<{ data?: Order[] } | Order[]>('/kitchen/list');
      return unwrap<Order[]>(res.data) || [];
    },
    getFeed: async (): Promise<Order[]> => {
      const res = await apiClient.get<{ data?: Order[] } | Order[]>('/kitchen/list');
      return unwrap<Order[]>(res.data) || [];
    },
    bumpOrder: async (orderId: string, status?: OrderStatus): Promise<Order> => {
      const res = await apiClient.post<{ data?: Order } | Order>(`/kitchen/orders/${orderId}/bump`, { status });
      return unwrap<Order>(res.data);
    },
    updateStatus: async (orderId: string, status: OrderStatus, notes?: string): Promise<Order> => {
      const res = await apiClient.patch<{ data?: Order } | Order>(`/kitchen/orders/${orderId}/status`, { status, notes });
      return unwrap<Order>(res.data);
    },
  },

  // Orders Management Page (OrderController)
  orders: {
    getList: async (params?: Record<string, string | number>): Promise<Order[]> => {
      const res = await apiClient.get<{ data?: Order[] } | Order[]>('/orders/list', { params });
      return unwrap<Order[]>(res.data) || [];
    },
    getOrders: async (params?: Record<string, string | number>): Promise<Order[]> => {
      const res = await apiClient.get<{ data?: Order[] } | Order[]>('/orders/list', { params });
      return unwrap<Order[]>(res.data) || [];
    },
    getOrder: async (id: string): Promise<Order> => {
      const res = await apiClient.get<{ data?: Order } | Order>(`/orders/${id}`);
      return unwrap<Order>(res.data);
    },
    createOrder: async (orderData: Partial<Order>): Promise<Order> => {
      const res = await apiClient.post<{ data?: Order } | Order>('/orders', orderData);
      return unwrap<Order>(res.data);
    },
    updateStatus: async (orderId: string, status: OrderStatus, notes?: string): Promise<Order> => {
      const res = await apiClient.patch<{ data?: Order } | Order>(`/orders/${orderId}/status`, { status, notes });
      return unwrap<Order>(res.data);
    },
    deleteOrder: async (orderId: string): Promise<void> => {
      await apiClient.delete(`/orders/${orderId}`);
    },
  },

  // Menu Management Page (MenuController)
  menu: {
    getList: async (params?: Record<string, any>): Promise<MenuItem[]> => {
      const res = await apiClient.get<{ data?: MenuItem[] } | MenuItem[]>('/menu/list', { params });
      return unwrap<MenuItem[]>(res.data) || [];
    },
    getCategories: async (): Promise<Category[]> => {
      const res = await apiClient.get<{ data?: Category[] } | Category[]>('/menu/categories');
      return unwrap<Category[]>(res.data) || [];
    },
    createCategory: async (data: Partial<Category>): Promise<Category> => {
      const res = await apiClient.post<{ data?: Category } | Category>('/menu/categories', data);
      return unwrap<Category>(res.data);
    },
    updateCategory: async (id: string, data: Partial<Category>): Promise<Category> => {
      const res = await apiClient.put<{ data?: Category } | Category>(`/menu/categories/${id}`, data);
      return unwrap<Category>(res.data);
    },
    deleteCategory: async (id: string): Promise<void> => {
      await apiClient.delete(`/menu/categories/${id}`);
    },
    reorderCategories: async (categories: { id: string; sort_order: number }[]): Promise<Category[]> => {
      const res = await apiClient.post<{ data?: Category[] } | Category[]>('/menu/categories/reorder', { categories });
      return unwrap<Category[]>(res.data) || [];
    },
    getMenuItems: async (params?: Record<string, any>): Promise<MenuItem[]> => {
      const res = await apiClient.get<{ data?: MenuItem[] } | MenuItem[]>('/menu/list', { params });
      return unwrap<MenuItem[]>(res.data) || [];
    },
    createMenuItem: async (item: Partial<MenuItem>): Promise<MenuItem> => {
      const res = await apiClient.post<{ data?: MenuItem } | MenuItem>('/menu/items', item);
      return unwrap<MenuItem>(res.data);
    },
    updateMenuItem: async (id: string, item: Partial<MenuItem>): Promise<MenuItem> => {
      const res = await apiClient.put<{ data?: MenuItem } | MenuItem>(`/menu/items/${id}`, item);
      return unwrap<MenuItem>(res.data);
    },
    deleteMenuItem: async (id: string): Promise<void> => {
      await apiClient.delete(`/menu/items/${id}`);
    },
    toggleAvailability: async (id: string, isAvailable?: boolean): Promise<MenuItem> => {
      const res = await apiClient.post<{ data?: MenuItem } | MenuItem>(`/menu/items/${id}/toggle-availability`, { is_available: isAvailable });
      return unwrap<MenuItem>(res.data);
    },
  },

  // Inventory Page (InventoryController)
  inventory: {
    getList: async (params?: Record<string, any>): Promise<InventoryItem[]> => {
      const res = await apiClient.get<{ data?: InventoryItem[] } | InventoryItem[]>('/inventory/list', { params });
      return unwrap<InventoryItem[]>(res.data) || [];
    },
    getItems: async (params?: Record<string, any>): Promise<InventoryItem[]> => {
      const res = await apiClient.get<{ data?: InventoryItem[] } | InventoryItem[]>('/inventory/list', { params });
      return unwrap<InventoryItem[]>(res.data) || [];
    },
    createItem: async (item: Partial<InventoryItem>): Promise<InventoryItem> => {
      const res = await apiClient.post<{ data?: InventoryItem } | InventoryItem>('/inventory/items', item);
      return unwrap<InventoryItem>(res.data);
    },
    updateItem: async (id: string, item: Partial<InventoryItem>): Promise<InventoryItem> => {
      const res = await apiClient.put<{ data?: InventoryItem } | InventoryItem>(`/inventory/items/${id}`, item);
      return unwrap<InventoryItem>(res.data);
    },
    deleteItem: async (id: string): Promise<void> => {
      await apiClient.delete(`/inventory/items/${id}`);
    },
    getTransactions: async (params?: Record<string, any>): Promise<InventoryTransaction[]> => {
      const res = await apiClient.get<{ data?: InventoryTransaction[] } | InventoryTransaction[]>('/inventory/transactions', { params });
      return unwrap<InventoryTransaction[]>(res.data) || [];
    },
    recordTransaction: async (tx: {
      inventory_item_id: string;
      quantity: number;
      type: string;
      reference: string;
      notes?: string;
    }): Promise<any> => {
      const res = await apiClient.post('/inventory/transactions', tx);
      return res.data;
    },
  },

  // Tracker Page (TrackerController)
  tracker: {
    lookup: async (token: string): Promise<Order> => {
      const res = await apiClient.get<{ data?: Order } | Order>(`/tracker/order/${token}`);
      return unwrap<Order>(res.data);
    },
  },

  // Staff Users Page (UserController)
  users: {
    getList: async (params?: Record<string, any>): Promise<User[]> => {
      const res = await apiClient.get<{ data?: User[] } | User[]>('/users/list', { params });
      return unwrap<User[]>(res.data) || [];
    },
    getUsers: async (params?: Record<string, any>): Promise<User[]> => {
      const res = await apiClient.get<{ data?: User[] } | User[]>('/users/list', { params });
      return unwrap<User[]>(res.data) || [];
    },
    createUser: async (user: Partial<User>): Promise<User> => {
      const res = await apiClient.post<{ data?: User } | User>('/users', user);
      return unwrap<User>(res.data);
    },
    updateUser: async (id: string, user: Partial<User>): Promise<User> => {
      const res = await apiClient.put<{ data?: User } | User>(`/users/${id}`, user);
      return unwrap<User>(res.data);
    },
    deleteUser: async (id: string): Promise<void> => {
      await apiClient.delete(`/users/${id}`);
    },
    getRolesMatrix: async (): Promise<any> => {
      const res = await apiClient.get('/roles/matrix');
      return unwrap<any>(res.data);
    },
  },

  // Authentication & Session (Laravel Auth)
  auth: {
    login: async (credentials: { email: string; password: string; remember?: boolean }): Promise<{
      success: boolean;
      message: string;
      user: User;
      role: string;
      intended_surface?: { surface: string; tab: string; title: string };
    }> => {
      const res = await apiClient.post('/login', credentials);
      return res.data;
    },
    quickLogin: async (options: { role?: string; email?: string }): Promise<{
      success: boolean;
      message: string;
      user: User;
      role: string;
      intended_surface?: { surface: string; tab: string; title: string };
    }> => {
      const res = await apiClient.post('/auth/quick-login', options);
      return res.data;
    },
    logout: async (): Promise<{ success: boolean; message: string }> => {
      const res = await apiClient.post('/logout');
      return res.data;
    },
    getUser: async (): Promise<{
      success: boolean;
      authenticated: boolean;
      user: User | null;
      role?: string | null;
    }> => {
      const res = await apiClient.get('/auth/user');
      return res.data;
    },
    getDemoAccounts: async (): Promise<any> => {
      const res = await apiClient.get('/auth/demo-accounts');
      return res.data;
    },
  },

  // Settings Controller
  settings: {
    getSettings: async (): Promise<RestaurantSettings> => {
      const res = await apiClient.get<{ data?: RestaurantSettings } | RestaurantSettings>('/settings');
      return unwrap<RestaurantSettings>(res.data);
    },
    updateSettings: async (settings: Partial<RestaurantSettings>): Promise<RestaurantSettings> => {
      const res = await apiClient.put<{ data?: RestaurantSettings } | RestaurantSettings>('/settings', settings);
      return unwrap<RestaurantSettings>(res.data);
    },
  },

  // Localization Controller
  locale: {
    set: async (locale: string): Promise<any> => {
      const res = await apiClient.post(`/locale/${locale}`);
      return res.data;
    },
    getTranslations: async (locale?: string): Promise<any> => {
      const res = await apiClient.get(`/translations${locale ? `/${locale}` : ''}`);
      return res.data;
    },
  },

  // Health / Connection Check
  health: {
    check: async (): Promise<{ ok: boolean; latencyMs: number; error?: string }> => {
      const start = Date.now();
      try {
        await apiClient.get('/menu-categories', { timeout: 3500 });
        return { ok: true, latencyMs: Date.now() - start };
      } catch (err: any) {
        return { 
          ok: false, 
          latencyMs: Date.now() - start, 
          error: err.response?.data?.message || err.message || 'Page controller unreachable' 
        };
      }
    }
  }
};
