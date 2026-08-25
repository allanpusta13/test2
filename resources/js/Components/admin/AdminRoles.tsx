import React, { useState, useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  XCircle, 
  Info, 
  Shield, 
  Coins, 
  ChefHat, 
  Search 
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { DataTable } from '../ui/data-table';
import { DataTableColumnHeader } from '../ui/data-table-column-header';

interface PermissionDefinition {
  code: string;
  name: string;
  category: string;
  admin: boolean;
  cashier: boolean;
  kitchen_staff: boolean;
}

const PERMISSIONS_MATRIX: PermissionDefinition[] = [
  // POS & Ordering
  { code: 'pos.create_order', name: 'Create POS Ticket', category: 'POS & Front-of-House', admin: true, cashier: true, kitchen_staff: false },
  { code: 'pos.collect_cash', name: 'Record Cash Tender & Print ESC/POS', category: 'POS & Front-of-House', admin: true, cashier: true, kitchen_staff: false },
  { code: 'orders.view_all', name: 'View All Live & Historical Orders', category: 'POS & Front-of-House', admin: true, cashier: true, kitchen_staff: true },
  { code: 'orders.cancel', name: 'Cancel Order & Reverse Prep Deductions', category: 'POS & Front-of-House', admin: true, cashier: false, kitchen_staff: false },
  
  // Kitchen KDS
  { code: 'kds.view_queue', name: 'Access Real-Time Kitchen Display', category: 'Kitchen Operations', admin: true, cashier: false, kitchen_staff: true },
  { code: 'kds.bump_status', name: 'Bump Status (Prep -> Ready -> Complete)', category: 'Kitchen Operations', admin: true, cashier: false, kitchen_staff: true },
  { code: 'kds.trigger_bom', name: 'Automatic BOM Recipe Inventory Deduction', category: 'Kitchen Operations', admin: true, cashier: false, kitchen_staff: true },

  // Menu & BOM
  { code: 'menu.manage', name: 'Create / Edit / Archive Dishes & Prices', category: 'Menu & Recipes', admin: true, cashier: false, kitchen_staff: false },
  { code: 'menu.toggle_availability', name: 'Toggle Sold-Out / Availability Status', category: 'Menu & Recipes', admin: true, cashier: true, kitchen_staff: true },
  { code: 'menu.configure_bom', name: 'Link Raw Recipe Ingredients to Dishes', category: 'Menu & Recipes', admin: true, cashier: false, kitchen_staff: false },

  // Inventory & Ledger
  { code: 'inventory.view_ledger', name: 'View Derived Stock & Audit Trail', category: 'Inventory Ledger', admin: true, cashier: false, kitchen_staff: false },
  { code: 'inventory.restock', name: 'Append Inflow / Restock Transactions', category: 'Inventory Ledger', admin: true, cashier: false, kitchen_staff: false },
  { code: 'inventory.waste', name: 'Log Spoilage & Waste Deductions', category: 'Inventory Ledger', admin: true, cashier: false, kitchen_staff: false },
  { code: 'inventory.audit', name: 'Execute Physical Count Calibration Audit', category: 'Inventory Ledger', admin: true, cashier: false, kitchen_staff: false },

  // System Administration
  { code: 'users.manage', name: 'Manage Staff User Accounts & Roles', category: 'Administration', admin: true, cashier: false, kitchen_staff: false },
  { code: 'settings.manage', name: 'Update Restaurant Profile, Tax & Print Footer', category: 'Administration', admin: true, cashier: false, kitchen_staff: false },
];

export const AdminRoles: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => {
    return Array.from(new Set(PERMISSIONS_MATRIX.map(p => p.category)));
  }, []);

  const filteredPermissions = useMemo(() => {
    return PERMISSIONS_MATRIX.filter(p => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const columns = useMemo<ColumnDef<PermissionDefinition>[]>(() => [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Permission & Scope" />
      ),
      cell: ({ row }) => (
        <div className="space-y-0.5">
          <span className="font-bold text-stone-100 block text-xs">{row.original.name}</span>
          <code className="text-[10px] text-stone-500 font-mono">{row.original.code}</code>
        </div>
      ),
    },
    {
      accessorKey: 'category',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Functional Area" />
      ),
      cell: ({ row }) => (
        <Badge variant="outline" className="text-[10px] border-stone-700 bg-stone-950 font-medium">
          {row.original.category}
        </Badge>
      ),
    },
    {
      accessorKey: 'admin',
      header: () => <div className="text-center">Admin (GM)</div>,
      cell: ({ row }) => (
        <div className="flex justify-center">
          {row.original.admin ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <XCircle className="w-4 h-4 text-stone-600" />
          )}
        </div>
      ),
    },
    {
      accessorKey: 'cashier',
      header: () => <div className="text-center">Cashier (FOH)</div>,
      cell: ({ row }) => (
        <div className="flex justify-center">
          {row.original.cashier ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <XCircle className="w-4 h-4 text-stone-600" />
          )}
        </div>
      ),
    },
    {
      accessorKey: 'kitchen_staff',
      header: () => <div className="text-center">Kitchen Staff (KDS)</div>,
      cell: ({ row }) => (
        <div className="flex justify-center">
          {row.original.kitchen_staff ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <XCircle className="w-4 h-4 text-stone-600" />
          )}
        </div>
      ),
    },
  ], []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-black text-stone-100">Fixed System Roles & Permissions</h1>
          <Badge variant="outline" className="text-[10px] font-mono border-amber-500/40 text-amber-400">
            Immutable Architecture
          </Badge>
        </div>
        <p className="text-xs text-stone-400 mt-1">
          In accordance with the Single-Restaurant Blueprint (§3 & §4.1), role definitions and authorization scopes are fixed in code to prevent privilege escalation.
        </p>
      </div>

      {/* Roles Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Admin */}
        <Card className="bg-stone-900 border-amber-500/30 text-stone-100 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold shadow-lg shadow-amber-500/20">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-amber-400">Admin (Owner / GM)</h3>
              <p className="text-[11px] text-stone-400">Full control across all modules</p>
            </div>
          </div>
          <p className="text-xs text-stone-300 leading-relaxed">
            Authorized to configure menu catalogs, audit the immutable inventory ledger, oversee cash tenders, and manage user accounts.
          </p>
        </Card>

        {/* Cashier */}
        <Card className="bg-stone-900 border-emerald-500/30 text-stone-100 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-stone-950 flex items-center justify-center font-bold shadow-lg shadow-emerald-500/20">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-emerald-400">Cashier (FOH Staff)</h3>
              <p className="text-[11px] text-stone-400">POS & Cash Drawer</p>
            </div>
          </div>
          <p className="text-xs text-stone-300 leading-relaxed">
            Front-of-house register operator. Creates dine-in & takeaway tickets, tenders cash, computes change, and prints thermal ESC/POS receipts.
          </p>
        </Card>

        {/* Kitchen Staff */}
        <Card className="bg-stone-900 border-orange-500/30 text-stone-100 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-stone-950 flex items-center justify-center font-bold shadow-lg shadow-orange-500/20">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-orange-400">Kitchen Staff (Line Cook)</h3>
              <p className="text-[11px] text-stone-400">KDS Station & Expeditor</p>
            </div>
          </div>
          <p className="text-xs text-stone-300 leading-relaxed">
            Interacts exclusively with the live KDS display. Bumping orders automatically executes recipe BOM inventory deductions in the ledger.
          </p>
        </Card>

      </div>

      {/* Permissions Matrix DataTable */}
      <div className="space-y-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-2 bg-stone-900 border border-stone-800 rounded-2xl scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
              selectedCategory === 'all' ? 'bg-amber-500 text-stone-950' : 'bg-stone-950 text-stone-400 border border-stone-800'
            }`}
          >
            All Areas ({PERMISSIONS_MATRIX.length})
          </button>
          {categories.map(cat => {
            const count = PERMISSIONS_MATRIX.filter(p => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat ? 'bg-amber-500 text-stone-950' : 'bg-stone-950 text-stone-400 border border-stone-800'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        <DataTable
          columns={columns}
          data={filteredPermissions}
          searchPlaceholder="Search permission scope or code..."
          globalFilter={searchQuery}
          onGlobalFilterChange={setSearchQuery}
          pageSize={20}
          pageSizeOptions={[10, 20, 30]}
          emptyMessage="No permissions match the search criteria."
        />
      </div>

    </div>
  );
};
