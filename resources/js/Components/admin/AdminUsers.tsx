import React, { useState, useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { router } from '@inertiajs/react';
import { useRestaurant } from '../../Context/RestaurantContext';
import { laravelApi, formatLaravelErrors } from '../../lib/api';
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  Mail, 
  Calendar, 
  Edit2, 
  Trash2, 
  Check, 
  ChefHat, 
  Coins, 
  Shield,
  LayoutGrid,
  Table as TableIcon
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { User, RoleType } from '../../types';
import { DataTable } from '../ui/data-table';
import { DataTableColumnHeader } from '../ui/data-table-column-header';

export const AdminUsers: React.FC = () => {
  const { users, setUsers, currentUser } = useRestaurant();

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<RoleType>('cashier');
  const [avatar, setAvatar] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesRole = roleFilter === 'all' || u.role === roleFilter;
      const matchesSearch =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.role.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRole && matchesSearch;
    });
  }, [users, roleFilter, searchQuery]);

  const handleOpenCreate = () => {
    setEditingUser(null);
    setName('');
    setEmail('');
    setRole('cashier');
    setAvatar('');
    setIsUserModalOpen(true);
  };

  const handleOpenEdit = (user: User) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setAvatar(user.avatar || '');
    setIsUserModalOpen(true);
  };

  const handleSaveUser = async () => {
    if (!name.trim() || !email.trim()) return;

    try {
      if (editingUser) {
        await laravelApi.users.updateUser(editingUser.id, {
          name: name.trim(),
          email: email.trim(),
          role_id: role === 'admin' ? 'role-admin' : role === 'cashier' ? 'role-cashier' : 'role-kitchen-staff',
          avatar: avatar.trim() || undefined,
        });
      } else {
        await laravelApi.users.createUser({
          name: name.trim(),
          email: email.trim(),
          role_id: role === 'admin' ? 'role-admin' : role === 'cashier' ? 'role-cashier' : 'role-kitchen-staff',
          avatar: avatar.trim() || undefined,
        });
      }
      router.reload({ only: ['users'] });
      setIsUserModalOpen(false);
    } catch (err) {
      const errors = formatLaravelErrors(err);
      alert(errors.join('\n'));
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (id === currentUser?.id) {
      alert('You cannot delete your own active user account.');
      return;
    }
    if (confirm('Are you sure you want to deactivate this staff account?')) {
      try {
        await laravelApi.users.deleteUser(id);
        router.reload({ only: ['users'] });
      } catch (err) {
        const errors = formatLaravelErrors(err);
        alert(errors.join('\n'));
      }
    }
  };

  const getRoleIcon = (r: RoleType) => {
    switch (r) {
      case 'admin': return <Shield className="w-3.5 h-3.5 text-amber-400" />;
      case 'cashier': return <Coins className="w-3.5 h-3.5 text-emerald-400" />;
      case 'kitchen_staff': return <ChefHat className="w-3.5 h-3.5 text-orange-400" />;
    }
  };

  // DataTable column definitions
  const columns = useMemo<ColumnDef<User>[]>(() => [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Staff Member" />
      ),
      cell: ({ row }) => {
        const user = row.original;
        const isSelf = user.id === currentUser?.id;
        return (
          <div className="flex items-center gap-3">
            <Avatar className="w-9 h-9 border border-stone-800 shrink-0 bg-stone-950">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-xs font-bold">{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-0.5">
              <div className="font-bold text-stone-100 text-xs flex items-center gap-1.5">
                <span>{user.name}</span>
                {isSelf && (
                  <Badge variant="outline" className="text-[9px] py-0 px-1 border-amber-500/40 text-amber-400">
                    You
                  </Badge>
                )}
              </div>
              <div className="text-[11px] text-stone-400 flex items-center gap-1">
                <Mail className="w-3 h-3 text-stone-500" />
                <span>{user.email}</span>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'role',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="System Role" />
      ),
      cell: ({ row }) => {
        const r = row.original.role;
        return (
          <Badge
            variant={
              r === 'admin'
                ? 'amber'
                : r === 'kitchen_staff'
                ? 'default'
                : 'secondary'
            }
            className="text-[10px] capitalize gap-1 font-bold"
          >
            {getRoleIcon(r)}
            <span>{r?.replace('_', ' ') || 'unknown'}</span>
          </Badge>
        );
      },
    },
    {
      id: 'security_scope',
      header: 'Authorization Scope',
      cell: ({ row }) => {
        const r = row.original.role;
        return (
          <span className="text-xs text-stone-300">
            {r === 'admin'
              ? 'Full Owner / GM Authority'
              : r === 'cashier'
              ? 'Front-of-House POS & Cash Register'
              : 'Kitchen KDS Station & BOM Deduction'}
          </span>
        );
      },
    },
    {
      accessorKey: 'created_at',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Registered Date" />
      ),
      cell: ({ row }) => {
        const date = new Date(row.original.created_at);
        return (
          <span className="font-mono text-xs text-stone-400">
            {date.toLocaleDateString()}
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const user = row.original;
        const isSelf = user.id === currentUser?.id;

        return (
          <div className="flex items-center justify-end gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleOpenEdit(user)}
              className="h-8 border-stone-800 text-stone-300 hover:text-stone-100 text-xs rounded-lg gap-1 px-2"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit</span>
            </Button>

            {!isSelf && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteUser(user.id)}
                className="h-8 w-8 text-stone-500 hover:text-red-400 rounded-lg"
                title="Deactivate Account"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        );
      },
    },
  ], [currentUser]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-stone-100">Restaurant Staff Directory</h1>
            <Badge variant="amber" className="text-[10px] font-mono">
              {users.length} Active Accounts
            </Badge>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Manage authenticated restaurant users and assign fixed system roles
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-stone-900 border border-stone-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
                viewMode === 'table' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Data Table View"
            >
              <TableIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
                viewMode === 'grid' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Card Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <Button
            onClick={handleOpenCreate}
            className="h-10 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl gap-2 shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Staff Member</span>
          </Button>
        </div>
      </div>

      {/* Role Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-2 bg-stone-900 border border-stone-800 rounded-2xl scrollbar-none">
        <button
          onClick={() => setRoleFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
            roleFilter === 'all' ? 'bg-amber-500 text-stone-950' : 'bg-stone-950 text-stone-400 border border-stone-800'
          }`}
        >
          All Roles ({users.length})
        </button>
        {(['admin', 'cashier', 'kitchen_staff'] as RoleType[]).map(r => {
          const count = users.filter(u => u.role === r).length;
          return (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition cursor-pointer whitespace-nowrap ${
                roleFilter === r ? 'bg-amber-500 text-stone-950' : 'bg-stone-950 text-stone-400 border border-stone-800'
              }`}
            >
              {r.replace('_', ' ')} ({count})
            </button>
          );
        })}
      </div>

      {/* Content */}
      {viewMode === 'table' ? (
        <DataTable
          columns={columns}
          data={filteredUsers}
          searchPlaceholder="Search staff by name or email..."
          globalFilter={searchQuery}
          onGlobalFilterChange={setSearchQuery}
          pageSize={10}
          pageSizeOptions={[10, 20]}
          emptyMessage="No staff accounts match the filter."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map(user => (
            <Card
              key={user.id}
              className="bg-stone-900 border-stone-800 text-stone-100 rounded-2xl p-5 space-y-4 hover:border-stone-700 transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 border-2 border-stone-800">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-sm font-bold text-stone-100">{user.name}</h3>
                    <p className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
                      <Mail className="w-3 h-3 text-stone-500" />
                      {user.email}
                    </p>
                  </div>
                </div>

                <Badge
                  variant={
                    user.role === 'admin'
                      ? 'amber'
                      : user.role === 'kitchen_staff'
                      ? 'default'
                      : 'secondary'
                  }
                  className="text-[10px] capitalize gap-1 font-bold"
                >
                  {getRoleIcon(user.role)}
                  <span>{user.role.replace('_', ' ')}</span>
                </Badge>
              </div>

              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs space-y-1">
                <div className="flex justify-between text-stone-400">
                  <span>Account Created:</span>
                  <span className="text-stone-300 font-mono">
                    {new Date(user.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Security Access:</span>
                  <span className="text-stone-300">
                    {user.role === 'admin' ? 'Full Access' : user.role === 'cashier' ? 'POS & Orders' : 'KDS Station'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1 border-t border-stone-800/80">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenEdit(user)}
                  className="h-8 border-stone-800 text-stone-300 hover:text-stone-100 text-xs gap-1"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </Button>

                {user.id !== currentUser?.id && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteUser(user.id)}
                    className="h-8 w-8 text-stone-500 hover:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* User Create/Edit Dialog */}
      {isUserModalOpen && (
        <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
          <DialogContent className="max-w-md bg-stone-900 border-stone-800 text-stone-100 p-5 rounded-2xl space-y-4">
            <DialogHeader>
              <DialogTitle className="text-base font-black">
                {editingUser ? `Edit Staff: ${editingUser.name}` : 'Register New Staff Member'}
              </DialogTitle>
              <DialogDescription className="text-xs text-stone-400">
                Set name, email, and assign an immutable fixed system role
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-1 text-xs">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-stone-300">Full Name</Label>
                <Input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Marco Rossi"
                  className="text-xs bg-stone-950 border-stone-800"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-stone-300">Email Address</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="e.g. marco@artisanbistro.com"
                  className="text-xs bg-stone-950 border-stone-800"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-stone-300">Fixed System Role</Label>
                <Select value={role} onValueChange={(val: RoleType) => setRole(val)}>
                  <SelectTrigger className="text-xs bg-stone-950 border-stone-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin (General Manager / Owner)</SelectItem>
                    <SelectItem value="cashier">Cashier (Front of House & POS)</SelectItem>
                    <SelectItem value="kitchen_staff">Kitchen Staff (KDS & Line Cook)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-stone-300">Avatar Image URL (Optional)</Label>
                <Input
                  value={avatar}
                  onChange={e => setAvatar(e.target.value)}
                  placeholder="https://..."
                  className="text-xs bg-stone-950 border-stone-800"
                />
              </div>
            </div>

            <Button
              onClick={handleSaveUser}
              className="w-full h-11 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-sm"
            >
              Save Staff Account
            </Button>
          </DialogContent>
        </Dialog>
      )}

    </div>
  );
};
