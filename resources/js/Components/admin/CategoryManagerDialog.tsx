import React, { useState, useMemo } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { 
  Layers, 
  Plus, 
  Trash2, 
  Edit3, 
  MoveUp, 
  MoveDown, 
  Check, 
  X, 
  AlertCircle,
  Tag,
  Utensils,
  Pizza,
  Coffee,
  Wine,
  Sparkles,
  Flame,
  Cake,
  FolderPlus,
  Boxes,
  Salad,
  Search,
  CheckCircle2,
  Package,
  TrendingUp,
  Scale
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Category, CategoryScope } from '../../types';

interface CategoryManagerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultScope?: 'all' | 'menu' | 'ledger';
}

const AVAILABLE_ICONS = [
  { label: 'Utensils', name: 'Utensils', icon: Utensils },
  { label: 'Pizza', name: 'Pizza', icon: Pizza },
  { label: 'Pasta/Dish', name: 'Flame', icon: Flame },
  { label: 'Produce/Salad', name: 'Salad', icon: Salad },
  { label: 'Beverage/Wine', name: 'Wine', icon: Wine },
  { label: 'Coffee/Roast', name: 'Coffee', icon: Coffee },
  { label: 'Dessert/Bakery', name: 'Cake', icon: Cake },
  { label: 'Boxes/Dry Goods', name: 'Boxes', icon: Boxes },
  { label: 'Dairy/Layers', name: 'Layers', icon: Layers },
  { label: 'Specialty', name: 'Sparkles', icon: Sparkles },
  { label: 'General/Tag', name: 'Tag', icon: Tag },
];

export const CategoryManagerDialog: React.FC<CategoryManagerDialogProps> = ({
  open,
  onOpenChange,
  defaultScope = 'all',
}) => {
  const {
    categories,
    setCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    menuItems,
    setMenuItems,
    inventoryItems,
    setInventoryItems,
    getStock,
  } = useRestaurant();

  // Search & Scope Filter State
  const [activeScope, setActiveScope] = useState<'all' | 'menu' | 'ledger'>(defaultScope);
  const [searchQuery, setSearchQuery] = useState('');

  // Create new category form
  const [newCatName, setNewCatName] = useState('');
  const [newCatType, setNewCatType] = useState<CategoryScope>('menu');
  const [newCatIcon, setNewCatIcon] = useState('Utensils');
  const [newCatDescription, setNewCatDescription] = useState('');
  const [createError, setCreateError] = useState<string | null>(null);

  // Editing category state
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editType, setEditType] = useState<CategoryScope>('menu');
  const [editIcon, setEditIcon] = useState('Utensils');
  const [editDescription, setEditDescription] = useState('');

  // Deletion confirmation state
  const [deletingCat, setDeletingCat] = useState<Category | null>(null);
  const [reassignCatId, setReassignCatId] = useState<string>('');

  // Counts for pills
  const menuCategoriesCount = useMemo(() => {
    return categories.filter(c => c.type === 'menu' || (!c.type && !c.id.startsWith('cat-led'))).length;
  }, [categories]);

  const ledgerCategoriesCount = useMemo(() => {
    return categories.filter(c => c.type === 'ledger' || c.type === 'both' || c.id.startsWith('cat-led')).length;
  }, [categories]);

  // Normalize category type
  const getResolvedCategoryType = (cat: Category): 'menu' | 'ledger' | 'both' => {
    if (cat.type) return cat.type;
    if (cat.id.startsWith('cat-led')) return 'ledger';
    return 'menu';
  };

  // Filtered categories
  const filteredCategories = useMemo(() => {
    return categories.filter(cat => {
      const resolvedType = getResolvedCategoryType(cat);
      const matchesScope = 
        activeScope === 'all' || 
        resolvedType === activeScope || 
        resolvedType === 'both';

      const matchesSearch = 
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resolvedType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cat.description && cat.description.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesScope && matchesSearch;
    });
  }, [categories, activeScope, searchQuery]);

  // Derived metrics helper for each category
  const getCategoryMetrics = (cat: Category) => {
    const resolvedType = getResolvedCategoryType(cat);
    const linkedDishes = menuItems.filter(i => i.category_id === cat.id);
    
    // Inventory items can match by category name or id
    const linkedInventory = inventoryItems.filter(i => 
      i.category.toLowerCase() === cat.name.toLowerCase() ||
      (cat.name.toLowerCase().includes('dry') && i.category.toLowerCase().includes('dry')) ||
      (cat.name.toLowerCase().includes('dairy') && i.category.toLowerCase().includes('dairy')) ||
      (cat.name.toLowerCase().includes('canned') && i.category.toLowerCase().includes('canned')) ||
      (cat.name.toLowerCase().includes('produce') && i.category.toLowerCase().includes('produce')) ||
      (cat.name.toLowerCase().includes('meat') && i.category.toLowerCase().includes('meat')) ||
      (cat.name.toLowerCase().includes('specialty') && i.category.toLowerCase().includes('specialty')) ||
      (cat.name.toLowerCase().includes('bakery') && i.category.toLowerCase().includes('bakery')) ||
      (cat.name.toLowerCase().includes('beverage') && i.category.toLowerCase().includes('beverage'))
    );

    const totalDerivedStock = linkedInventory.reduce((sum, item) => sum + getStock(item.id), 0);
    const lowStockCount = linkedInventory.filter(item => getStock(item.id) <= item.low_stock_threshold).length;

    return {
      resolvedType,
      dishesCount: linkedDishes.length,
      inventoryCount: linkedInventory.length,
      totalDerivedStock,
      lowStockCount,
      linkedDishes,
      linkedInventory,
    };
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) {
      setCreateError('Please provide a category name.');
      return;
    }
    const nameExists = categories.some(
      c => c.name.toLowerCase() === newCatName.trim().toLowerCase()
    );
    if (nameExists) {
      setCreateError('A category with this name already exists.');
      return;
    }

    addCategory(newCatName.trim(), newCatIcon, newCatType, newCatDescription.trim());
    setNewCatName('');
    setNewCatType('menu');
    setNewCatIcon('Utensils');
    setNewCatDescription('');
    setCreateError(null);
  };

  const handleStartEdit = (cat: Category) => {
    setEditingCatId(cat.id);
    setEditName(cat.name);
    setEditType(getResolvedCategoryType(cat));
    setEditIcon(cat.icon || (getResolvedCategoryType(cat) === 'ledger' ? 'Boxes' : 'Utensils'));
    setEditDescription(cat.description || '');
  };

  const handleSaveEdit = (id: string) => {
    if (!editName.trim()) return;
    updateCategory(id, {
      name: editName.trim(),
      type: editType,
      icon: editIcon,
      description: editDescription.trim() || undefined,
    });
    setEditingCatId(null);
  };

  const handleCancelEdit = () => {
    setEditingCatId(null);
    setEditName('');
    setEditDescription('');
  };

  const handleMoveCategory = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= categories.length) return;

    const updated = [...categories];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    // update sort_orders
    const reordered = updated.map((cat, idx) => ({
      ...cat,
      sort_order: idx + 1,
    }));
    setCategories(reordered);
  };

  const handleConfirmDelete = (cat: Category) => {
    const metrics = getCategoryMetrics(cat);
    if (metrics.dishesCount > 0) {
      const otherCat = categories.find(c => c.id !== cat.id && getResolvedCategoryType(c) === 'menu');
      setReassignCatId(otherCat?.id || '');
      setDeletingCat(cat);
    } else {
      deleteCategory(cat.id);
    }
  };

  const handleExecuteDeleteWithReassign = () => {
    if (!deletingCat) return;

    if (reassignCatId) {
      // Reassign dishes
      setMenuItems(prev =>
        prev.map(item =>
          item.category_id === deletingCat.id
            ? { ...item, category_id: reassignCatId }
            : item
        )
      );
    }
    deleteCategory(deletingCat.id);
    setDeletingCat(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent id="category-manager-modal" className="max-w-4xl bg-stone-900 border-stone-800 text-stone-100 p-6 rounded-3xl max-h-[92vh] flex flex-col">
        <DialogHeader className="shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold shadow-md">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle className="text-lg font-black text-stone-100 flex items-center gap-2">
                  Unified Category & Ledger Table
                </DialogTitle>
                <DialogDescription className="text-xs text-stone-400">
                  Manage both Menu and Inventory Ledger categories on a single unified table with live derived metrics.
                </DialogDescription>
              </div>
            </div>

            {/* Scope Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-stone-950 p-1 rounded-xl border border-stone-800 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveScope('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeScope === 'all'
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                All ({categories.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveScope('menu')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                  activeScope === 'menu'
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Utensils className="w-3 h-3" />
                <span>Menu ({menuCategoriesCount})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveScope('ledger')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                  activeScope === 'ledger'
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Boxes className="w-3 h-3" />
                <span>Ledger ({ledgerCategoriesCount})</span>
              </button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 pt-2 overflow-y-auto pr-1 flex-1">
          {/* Create New Category Form */}
          <form
            onSubmit={handleCreateCategory}
            className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                <FolderPlus className="w-3.5 h-3.5" />
                Add New Unified Category
              </h3>
              <span className="text-[11px] text-stone-400 font-mono">
                {categories.length} total categories registered
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div className="sm:col-span-4 space-y-1">
                <Label className="text-[11px] text-stone-300">Category Name *</Label>
                <Input
                  value={newCatName}
                  onChange={e => {
                    setNewCatName(e.target.value);
                    if (createError) setCreateError(null);
                  }}
                  placeholder="e.g. Wood-Fired Pizza, Dairy, Meat"
                  className="bg-stone-900 border-stone-800 text-stone-100 text-xs h-9 rounded-xl focus:border-amber-500"
                />
              </div>

              {/* Type Selector (Identifies Menu Category vs Ledger Category) */}
              <div className="sm:col-span-3 space-y-1">
                <Label className="text-[11px] text-stone-300">Category Scope / Type *</Label>
                <select
                  value={newCatType}
                  onChange={e => {
                    const t = e.target.value as CategoryScope;
                    setNewCatType(t);
                    if (t === 'ledger' && newCatIcon === 'Utensils') {
                      setNewCatIcon('Boxes');
                    }
                  }}
                  className="w-full bg-stone-900 border border-stone-800 text-stone-200 text-xs h-9 rounded-xl px-2.5 focus:outline-none focus:border-amber-500 font-medium"
                >
                  <option value="menu">🍽️ Menu Category</option>
                  <option value="ledger">📦 Ledger / Stock Category</option>
                  <option value="both">🔄 Dual (Menu & Ledger)</option>
                </select>
              </div>

              <div className="sm:col-span-2 space-y-1">
                <Label className="text-[11px] text-stone-300">Icon</Label>
                <select
                  value={newCatIcon}
                  onChange={e => setNewCatIcon(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 text-stone-200 text-xs h-9 rounded-xl px-2.5 focus:outline-none focus:border-amber-500"
                >
                  {AVAILABLE_ICONS.map(ic => (
                    <option key={ic.name} value={ic.name}>
                      {ic.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-3">
                <Button
                  id="add-category-btn"
                  type="submit"
                  className="w-full h-9 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl gap-1.5 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Category</span>
                </Button>
              </div>
            </div>

            {createError && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {createError}
              </p>
            )}
          </form>

          {/* Quick Search & Count Bar */}
          <div className="flex items-center justify-between gap-3 px-1">
            <div className="relative flex-1 max-w-xs">
              <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search categories & ledger..."
                className="bg-stone-950 border-stone-800 text-stone-200 text-xs h-8 pl-8 rounded-xl"
              />
            </div>
            <span className="text-[11px] text-stone-400 font-mono">
              Showing {filteredCategories.length} of {categories.length} entries
            </span>
          </div>

          {/* Unified Category Table */}
          <div className="border border-stone-800 rounded-2xl overflow-hidden bg-stone-950/60">
            <div className="grid grid-cols-12 gap-2 px-4 py-2.5 bg-stone-900/80 border-b border-stone-800 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-4">Category Name</div>
              <div className="col-span-3">Category Type</div>
              <div className="col-span-3">Associated Items & Derived Ledger</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>

            <div className="divide-y divide-stone-800/60">
              {filteredCategories.length === 0 ? (
                <div className="py-12 text-center text-stone-500 space-y-2">
                  <Layers className="w-8 h-8 mx-auto text-stone-600" />
                  <p className="text-xs">No categories match the selected filter or search query.</p>
                </div>
              ) : (
                filteredCategories.map((cat, index) => {
                  const isEditing = editingCatId === cat.id;
                  const metrics = getCategoryMetrics(cat);
                  const resolvedType = metrics.resolvedType;

                  if (isEditing) {
                    return (
                      <div
                        key={cat.id}
                        className="p-3 bg-stone-950 border-y border-amber-500/50 flex flex-col gap-2 transition"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                          <div className="sm:col-span-4">
                            <Input
                              value={editName}
                              onChange={e => setEditName(e.target.value)}
                              placeholder="Category name"
                              className="bg-stone-900 border-stone-800 text-xs h-8 rounded-lg"
                              autoFocus
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <select
                              value={editType}
                              onChange={e => setEditType(e.target.value as CategoryScope)}
                              className="w-full bg-stone-900 border border-stone-800 text-stone-200 text-xs h-8 rounded-lg px-2"
                            >
                              <option value="menu">🍽️ Menu Category</option>
                              <option value="ledger">📦 Ledger / Stock Category</option>
                              <option value="both">🔄 Dual (Menu & Ledger)</option>
                            </select>
                          </div>

                          <div className="sm:col-span-3">
                            <select
                              value={editIcon}
                              onChange={e => setEditIcon(e.target.value)}
                              className="w-full bg-stone-900 border border-stone-800 text-stone-200 text-xs h-8 rounded-lg px-2"
                            >
                              {AVAILABLE_ICONS.map(ic => (
                                <option key={ic.name} value={ic.name}>
                                  {ic.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="sm:col-span-2 flex items-center justify-end gap-1.5">
                            <Button
                              size="sm"
                              onClick={() => handleSaveEdit(cat.id)}
                              className="h-8 px-3 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-lg gap-1"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Save</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={handleCancelEdit}
                              className="h-8 px-2 text-stone-400 hover:text-stone-200 text-xs rounded-lg"
                            >
                              <X className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={cat.id}
                      className="grid grid-cols-12 gap-2 px-4 py-3 items-center hover:bg-stone-900/40 transition group"
                    >
                      {/* Order & Reorder Controls */}
                      <div className="col-span-1 flex items-center justify-center gap-1">
                        <div className="flex flex-col">
                          <button
                            type="button"
                            onClick={() => handleMoveCategory(index, 'up')}
                            disabled={index === 0}
                            className="p-0.5 rounded text-stone-500 hover:text-amber-400 disabled:opacity-20 transition cursor-pointer"
                            title="Move Category Up"
                          >
                            <MoveUp className="w-2.5 h-2.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveCategory(index, 'down')}
                            disabled={index === categories.length - 1}
                            className="p-0.5 rounded text-stone-500 hover:text-amber-400 disabled:opacity-20 transition cursor-pointer"
                            title="Move Category Down"
                          >
                            <MoveDown className="w-2.5 h-2.5" />
                          </button>
                        </div>
                        <span className="font-mono text-xs text-stone-500">{index + 1}</span>
                      </div>

                      {/* Category Name & Icon */}
                      <div className="col-span-4 flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-amber-400 font-bold shrink-0">
                          {cat.icon === 'Pizza' ? <Pizza className="w-3.5 h-3.5 text-amber-400" /> :
                           cat.icon === 'Wine' ? <Wine className="w-3.5 h-3.5 text-purple-400" /> :
                           cat.icon === 'Coffee' ? <Coffee className="w-3.5 h-3.5 text-amber-300" /> :
                           cat.icon === 'Cake' ? <Cake className="w-3.5 h-3.5 text-pink-400" /> :
                           cat.icon === 'Flame' ? <Flame className="w-3.5 h-3.5 text-orange-400" /> :
                           cat.icon === 'Salad' ? <Salad className="w-3.5 h-3.5 text-emerald-400" /> :
                           cat.icon === 'Boxes' ? <Boxes className="w-3.5 h-3.5 text-sky-400" /> :
                           cat.icon === 'Layers' ? <Layers className="w-3.5 h-3.5 text-indigo-400" /> :
                           cat.icon === 'Sparkles' ? <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> :
                           <Tag className="w-3.5 h-3.5 text-stone-400" />}
                        </div>

                        <div className="min-w-0">
                          <div className="font-bold text-stone-100 text-xs truncate">
                            {cat.name}
                          </div>
                          {cat.description && (
                            <p className="text-[10px] text-stone-400 truncate max-w-xs">{cat.description}</p>
                          )}
                        </div>
                      </div>

                      {/* Category Type Column (Identifies Menu vs Ledger) */}
                      <div className="col-span-3 flex items-center gap-1.5">
                        {resolvedType === 'menu' ? (
                          <Badge
                            variant="outline"
                            className="text-[10px] font-semibold border-amber-500/30 bg-amber-500/10 text-amber-300 gap-1"
                          >
                            <Utensils className="w-3 h-3" />
                            <span>Menu Category</span>
                          </Badge>
                        ) : resolvedType === 'ledger' ? (
                          <Badge
                            variant="outline"
                            className="text-[10px] font-semibold border-sky-500/30 bg-sky-500/10 text-sky-300 gap-1"
                          >
                            <Boxes className="w-3 h-3" />
                            <span>Ledger / Stock</span>
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-[10px] font-semibold border-emerald-500/30 bg-emerald-500/10 text-emerald-300 gap-1"
                          >
                            <Package className="w-3 h-3" />
                            <span>Dual (Menu & Ledger)</span>
                          </Badge>
                        )}
                      </div>

                      {/* Associated Items & Derived Ledger Balance Column */}
                      <div className="col-span-3 space-y-0.5">
                        {resolvedType === 'menu' ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-stone-200">
                              {metrics.dishesCount} {metrics.dishesCount === 1 ? 'dish' : 'dishes'}
                            </span>
                            <span className="text-[10px] text-stone-500">on menu</span>
                          </div>
                        ) : (
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-mono font-bold text-sky-300">
                                {metrics.inventoryCount} raw item{metrics.inventoryCount !== 1 ? 's' : ''}
                              </span>
                              <span className="text-[10px] text-stone-500">•</span>
                              <span className="text-[11px] font-mono font-bold text-emerald-400">
                                {metrics.totalDerivedStock.toFixed(1)} derived total
                              </span>
                            </div>
                            {metrics.lowStockCount > 0 && (
                              <span className="text-[10px] text-amber-400 font-semibold flex items-center gap-1">
                                <AlertCircle className="w-2.5 h-2.5" />
                                {metrics.lowStockCount} item{metrics.lowStockCount > 1 ? 's' : ''} low stock
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="col-span-1 flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleStartEdit(cat)}
                          className="h-7 w-7 text-stone-400 hover:text-stone-100 rounded-lg"
                          title="Edit Category"
                        >
                          <Edit3 className="w-3 h-3" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleConfirmDelete(cat)}
                          disabled={categories.length <= 1}
                          className="h-7 w-7 text-stone-500 hover:text-red-400 rounded-lg disabled:opacity-30"
                          title="Delete Category"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Delete with Reassign Dialog Warning */}
        {deletingCat && (
          <div className="mt-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-3 shrink-0">
            <div className="flex items-start gap-2 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">
                  Category "{deletingCat.name}" has {menuItems.filter(i => i.category_id === deletingCat.id).length} menu dishes assigned.
                </p>
                <p className="text-[11px] text-stone-400 mt-0.5">
                  Select where to reassign these dishes before removing the category:
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2">
              <select
                value={reassignCatId}
                onChange={e => setReassignCatId(e.target.value)}
                className="w-full sm:w-auto flex-1 bg-stone-900 border border-stone-800 text-stone-200 text-xs h-8 rounded-lg px-2.5 focus:outline-none"
              >
                {categories
                  .filter(c => c.id !== deletingCat.id && getResolvedCategoryType(c) === 'menu')
                  .map(c => (
                    <option key={c.id} value={c.id}>
                      Reassign dishes to: {c.name}
                    </option>
                  ))}
              </select>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={handleExecuteDeleteWithReassign}
                  className="h-8 text-xs font-bold rounded-lg px-3 flex-1 sm:flex-initial"
                >
                  Reassign & Delete
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setDeletingCat(null)}
                  className="h-8 border-stone-800 text-xs rounded-lg px-3"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
