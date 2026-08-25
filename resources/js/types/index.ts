export type RoleType = 'admin' | 'cashier' | 'kitchen_staff';

export interface RestaurantSettings {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  currency: string;
  tax_rate: number; // e.g. 0.08875 (8.875%)
  hours: string;
  cash_policy_notice: string;
  receipt_header: string;
  receipt_footer: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: RoleType;
  avatar?: string;
  created_at: string;
}

export interface RolePermission {
  id: string;
  code: string;
  name: string;
  description: string;
  module: 'Menu' | 'Orders & POS' | 'Inventory' | 'Kitchen' | 'Users & Roles';
  allowed_roles: RoleType[];
}

export interface ModifierOption {
  id: string;
  name: string;
  extra_price: number;
}

export interface ModifierGroup {
  id: string;
  name: string;
  required: boolean;
  min_selection: number;
  max_selection: number;
  options: ModifierOption[];
}

export interface RecipeIngredient {
  inventory_item_id: string;
  quantity_used: number; // in ingredient units (e.g. 0.25 kg, 1 count)
}

export interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  is_available: boolean;
  modifier_groups: ModifierGroup[];
  recipe: RecipeIngredient[];
}

export interface Category {
  id: string;
  name: string;
  sort_order: number;
  icon?: string;
}

export interface SelectedModifier {
  group_name: string;
  option_name: string;
  extra_price: number;
}

export interface OrderItem {
  id: string;
  menu_item_id: string;
  name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  notes?: string;
  selected_modifiers: SelectedModifier[];
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
export type OrderType = 'dine_in' | 'takeaway';
export type PaymentStatus = 'unpaid' | 'partially_paid' | 'paid';

export interface Payment {
  id: string;
  order_id: string;
  amount: number;
  tendered: number;
  change_returned: number;
  method: 'cash';
  cashier_id: string;
  cashier_name: string;
  created_at: string;
  notes?: string;
}

export interface Order {
  id: string;
  order_number: string;
  status: OrderStatus;
  type: OrderType;
  table_number?: string;
  customer_name: string;
  customer_phone?: string;
  notes?: string;
  idempotency_key: string;
  tracking_token: string;
  items: OrderItem[];
  subtotal: number;
  tax_total: number;
  total: number;
  payments: Payment[];
  created_at: string;
  updated_at: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  unit: string;
  low_stock_threshold: number;
  category: string;
  cost_per_unit?: number;
}

export type TransactionType = 'restock' | 'prep_deduction' | 'waste' | 'audit_adjustment' | 'cancellation_reversal';

export interface InventoryTransaction {
  id: string;
  inventory_item_id: string;
  inventory_item_name: string;
  quantity: number; // signed: negative for deductions/waste, positive for restocks/reversals
  type: TransactionType;
  reference: string; // e.g. "Order #1002" or "Supplier Restock #449"
  notes?: string;
  created_at: string;
}

export interface OfflineAction {
  id: string;
  idempotency_key: string;
  action_type: 'create_order' | 'record_payment';
  payload: any;
  queued_at: string;
  status: 'queued' | 'synced' | 'failed';
}

export interface EscPosJob {
  id: string;
  order_id: string;
  order_number: string;
  created_at: string;
  raw_text: string;
  hex_bytes: string;
  paper_width: '58mm' | '80mm';
  status: 'printed' | 'pending';
}

export type AppSurface = 'public_menu' | 'public_tracker' | 'admin';

export type AdminView = 
  | 'menu' 
  | 'orders' 
  | 'pos' 
  | 'inventory' 
  | 'kitchen' 
  | 'users' 
  | 'roles';

export interface NavLinkItem {
  name: string;
  url: string;
  icon: string;
  surface: AppSurface;
  tab?: AdminView;
  role?: RoleType;
}

export interface AppRoutes {
  home: string;
  pos: string;
  kitchen: string;
  orders: string;
  menu: string;
  inventory: string;
  tracker: string;
  users: string;
  nav_links: NavLinkItem[];
}

export type TranslationMap = Record<string, any>;

export interface PageProps<T = Record<string, unknown>> {
  auth?: {
    user: User | null;
  };
  flash?: {
    success?: string;
    error?: string;
  };
  locale?: string;
  locales?: Record<string, string>;
  translations?: TranslationMap;
  routes?: AppRoutes;
  settings?: RestaurantSettings;
  categories?: Category[];
  menuItems?: MenuItem[];
  inventory?: InventoryItem[];
  transactions?: InventoryTransaction[];
  orders?: Order[];
  users?: User[];
  rolesPermissions?: RolePermission[];
  currentSurface?: AppSurface;
  currentAdminTab?: AdminView;
  token?: string;
  [key: string]: unknown;
}
