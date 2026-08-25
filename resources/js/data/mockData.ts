import { 
  RestaurantSettings, 
  User, 
  RolePermission, 
  Category, 
  MenuItem, 
  InventoryItem, 
  InventoryTransaction, 
  Order,
  RoleType 
} from '../types';

/**
 * Frontend Placeholders & Initial Skeleton Templates.
 * All actual live content, catalog items, pricing, inventory ledgers, and configurations
 * are dynamically hydrated from the Laravel backend (/api/bootstrap and RESTful controller endpoints).
 */

export const RESTAURANT_SETTINGS: RestaurantSettings = {
  name: '...',
  tagline: '...',
  address: '...',
  phone: '...',
  currency: '$',
  tax_rate: 0.08,
  hours: '...',
  cash_policy_notice: '...',
  receipt_header: '...',
  receipt_footer: '...',
};

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Staff Administrator',
    email: 'elena@artisanbistro.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    created_at: '2026-08-01T09:00:00Z',
  },
  {
    id: 'usr-2',
    name: 'Cashier Staff',
    email: 'sophia@artisanbistro.com',
    role: 'cashier',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    created_at: '2026-08-02T10:00:00Z',
  },
  {
    id: 'usr-3',
    name: 'Kitchen Cook',
    email: 'luigi@artisanbistro.com',
    role: 'kitchen_staff',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    created_at: '2026-08-02T11:00:00Z',
  },
];

export const FIXED_ROLE_PERMISSIONS: RolePermission[] = [
  {
    id: 'perm-1',
    code: 'menu.manage',
    name: 'Manage Menu & Modifiers',
    description: 'Create, update, delete dishes, prices, modifier groups, and BOM recipes',
    module: 'Menu',
    allowed_roles: ['admin'],
  },
  {
    id: 'perm-2',
    code: 'orders.view',
    name: 'View Order Directory',
    description: 'Browse current and past customer orders across the restaurant',
    module: 'Orders & POS',
    allowed_roles: ['admin', 'cashier'],
  },
  {
    id: 'perm-3',
    code: 'orders.pos_create',
    name: 'Create POS Walk-In Orders',
    description: 'Use the fast POS terminal to take customer orders directly',
    module: 'Orders & POS',
    allowed_roles: ['admin', 'cashier'],
  },
  {
    id: 'perm-4',
    code: 'orders.payment_collect',
    name: 'Record Cash Payments',
    description: 'Tender cash payments, calculate change, and print ESC/POS receipts',
    module: 'Orders & POS',
    allowed_roles: ['admin', 'cashier'],
  },
  {
    id: 'perm-5',
    code: 'inventory.view_and_adjust',
    name: 'Inventory Stock & Ledger',
    description: 'View derived stock levels, record restocks, log waste, and perform stock audits',
    module: 'Inventory',
    allowed_roles: ['admin'],
  },
  {
    id: 'perm-6',
    code: 'kitchen.kds_screen',
    name: 'Kitchen Display System (KDS)',
    description: 'View live tickets, bump orders to preparing (deducting BOM stock), and mark ready',
    module: 'Kitchen',
    allowed_roles: ['admin', 'kitchen_staff'],
  },
  {
    id: 'perm-7',
    code: 'users.manage',
    name: 'User Directory Management',
    description: 'View and manage restaurant staff user accounts with fixed system roles',
    module: 'Users & Roles',
    allowed_roles: ['admin'],
  },
  {
    id: 'perm-8',
    code: 'roles.view_matrix',
    name: 'View Fixed System Roles Matrix',
    description: 'Inspect global immutable role-to-permission security rules',
    module: 'Users & Roles',
    allowed_roles: ['admin', 'cashier', 'kitchen_staff'],
  },
];

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-1', name: '...', type: 'menu', sort_order: 1, icon: 'Pizza' },
  { id: 'cat-2', name: '...', type: 'menu', sort_order: 2, icon: 'UtensilsCrossed' },
  { id: 'cat-3', name: '...', type: 'menu', sort_order: 3, icon: 'Salad' },
  { id: 'cat-4', name: '...', type: 'menu', sort_order: 4, icon: 'Cake' },
  { id: 'cat-5', name: '...', type: 'menu', sort_order: 5, icon: 'Wine' },
  { id: 'cat-led-1', name: '...', type: 'ledger', sort_order: 6, icon: 'Boxes' },
];

export const INITIAL_INVENTORY_ITEMS: InventoryItem[] = [];

export const INITIAL_TRANSACTIONS: InventoryTransaction[] = [];

export const INITIAL_ORDERS: Order[] = [];

export const INITIAL_MENU_ITEMS: MenuItem[] = [];
