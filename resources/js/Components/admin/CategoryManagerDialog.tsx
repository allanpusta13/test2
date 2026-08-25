import React, { useState } from 'react';
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
  FolderPlus
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Category } from '../../types';

interface CategoryManagerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AVAILABLE_ICONS = [
  { label: 'Utensils', name: 'Utensils', icon: Utensils },
  { label: 'Pizza', name: 'Pizza', icon: Pizza },
  { label: 'Pasta/Dish', name: 'Flame', icon: Flame },
  { label: 'Beverage/Wine', name: 'Wine', icon: Wine },
  { label: 'Coffee', name: 'Coffee', icon: Coffee },
  { label: 'Dessert', name: 'Cake', icon: Cake },
  { label: 'Special', name: 'Sparkles', icon: Sparkles },
  { label: 'General', name: 'Tag', icon: Tag },
];

export const CategoryManagerDialog: React.FC<CategoryManagerDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const {
    categories,
    setCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    menuItems,
    setMenuItems,
  } = useRestaurant();

  // Create new category form
  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('Utensils');
  const [createError, setCreateError] = useState<string | null>(null);

  // Editing category state
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editIcon, setEditIcon] = useState('Utensils');

  // Deletion confirmation
  const [deletingCat, setDeletingCat] = useState<Category | null>(null);
  const [reassignCatId, setReassignCatId] = useState<string>('');

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

    addCategory(newCatName.trim(), newCatIcon);
    setNewCatName('');
    setNewCatIcon('Utensils');
    setCreateError(null);
  };

  const handleStartEdit = (cat: Category) => {
    setEditingCatId(cat.id);
    setEditName(cat.name);
    setEditIcon(cat.icon || 'Utensils');
  };

  const handleSaveEdit = (id: string) => {
    if (!editName.trim()) return;
    updateCategory(id, {
      name: editName.trim(),
      icon: editIcon,
    });
    setEditingCatId(null);
  };

  const handleCancelEdit = () => {
    setEditingCatId(null);
    setEditName('');
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
    const itemsInCat = menuItems.filter(i => i.category_id === cat.id);
    if (itemsInCat.length > 0) {
      // Find another category to suggest reassigning to
      const otherCat = categories.find(c => c.id !== cat.id);
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
      <DialogContent className="max-w-2xl bg-stone-900 border-stone-800 text-stone-100 p-6 rounded-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-stone-100">
                Menu Category Manager
              </DialogTitle>
              <DialogDescription className="text-xs text-stone-400">
                Create, organize, rename, reorder, and delete catalog categories
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Create New Category Form */}
          <form
            onSubmit={handleCreateCategory}
            className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                <FolderPlus className="w-3.5 h-3.5" />
                Add New Menu Category
              </h3>
              <span className="text-[11px] text-stone-400 font-mono">
                {categories.length} existing categories
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div className="sm:col-span-6 space-y-1">
                <Label className="text-[11px] text-stone-300">Category Name *</Label>
                <Input
                  value={newCatName}
                  onChange={e => {
                    setNewCatName(e.target.value);
                    if (createError) setCreateError(null);
                  }}
                  placeholder="e.g. Wood-Fired Pizza, Starters, Drinks"
                  className="bg-stone-900 border-stone-800 text-stone-100 text-xs h-9 rounded-xl focus:border-amber-500"
                />
              </div>

              <div className="sm:col-span-3 space-y-1">
                <Label className="text-[11px] text-stone-300">Icon / Type</Label>
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

          {/* List of Existing Categories */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs text-stone-400 px-1 font-semibold">
              <span>Categories & Display Order</span>
              <span>Dishes Assigned / Actions</span>
            </div>

            <div className="space-y-2">
              {categories.map((cat, index) => {
                const dishCount = menuItems.filter(i => i.category_id === cat.id).length;
                const isEditing = editingCatId === cat.id;

                if (isEditing) {
                  return (
                    <div
                      key={cat.id}
                      className="p-3 rounded-2xl bg-stone-950 border border-amber-500/50 flex flex-col sm:flex-row items-center gap-3 transition"
                    >
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                        <Input
                          value={editName}
                          onChange={e => setEditName(e.target.value)}
                          placeholder="Category name"
                          className="bg-stone-900 border-stone-800 text-xs h-8 rounded-lg"
                          autoFocus
                        />
                        <select
                          value={editIcon}
                          onChange={e => setEditIcon(e.target.value)}
                          className="bg-stone-900 border border-stone-800 text-stone-200 text-xs h-8 rounded-lg px-2"
                        >
                          {AVAILABLE_ICONS.map(ic => (
                            <option key={ic.name} value={ic.name}>
                              {ic.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
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
                  );
                }

                return (
                  <div
                    key={cat.id}
                    className="p-3 rounded-2xl bg-stone-950/60 border border-stone-800/80 hover:border-stone-700 transition flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Reorder Buttons */}
                      <div className="flex flex-col gap-0.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleMoveCategory(index, 'up')}
                          disabled={index === 0}
                          className="p-1 rounded text-stone-500 hover:text-amber-400 disabled:opacity-20 disabled:hover:text-stone-500 transition cursor-pointer"
                          title="Move Category Up"
                        >
                          <MoveUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveCategory(index, 'down')}
                          disabled={index === categories.length - 1}
                          className="p-1 rounded text-stone-500 hover:text-amber-400 disabled:opacity-20 disabled:hover:text-stone-500 transition cursor-pointer"
                          title="Move Category Down"
                        >
                          <MoveDown className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="w-7 h-7 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-amber-400 font-bold shrink-0">
                        <span className="font-mono text-xs">{index + 1}</span>
                      </div>

                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-100 text-xs truncate">
                            {cat.name}
                          </span>
                          <Badge variant="outline" className="text-[10px] py-0 px-1.5 border-stone-800 text-stone-400 bg-stone-900">
                            {cat.icon || 'Utensils'}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Badge
                        variant={dishCount > 0 ? 'secondary' : 'outline'}
                        className="text-[10px] font-mono px-2 py-0.5"
                      >
                        {dishCount} {dishCount === 1 ? 'dish' : 'dishes'}
                      </Badge>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStartEdit(cat)}
                        className="h-7 px-2 text-stone-400 hover:text-stone-100 text-xs rounded-lg"
                        title="Rename or edit category"
                      >
                        <Edit3 className="w-3 h-3" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleConfirmDelete(cat)}
                        disabled={categories.length <= 1}
                        className="h-7 px-2 text-stone-500 hover:text-red-400 text-xs rounded-lg disabled:opacity-30"
                        title={categories.length <= 1 ? "At least one category is required" : "Delete category"}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Delete with Reassign Dialog Warning */}
        {deletingCat && (
          <div className="mt-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-3">
            <div className="flex items-start gap-2 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">
                  Category "{deletingCat.name}" contains {menuItems.filter(i => i.category_id === deletingCat.id).length} menu dishes.
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
                  .filter(c => c.id !== deletingCat.id)
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
