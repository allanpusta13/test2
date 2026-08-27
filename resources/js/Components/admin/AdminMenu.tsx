import React, { useState, useMemo, useRef } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { router } from '@inertiajs/react';
import { useRestaurant } from '../../Context/RestaurantContext';
import { laravelApi, formatLaravelErrors } from '../../lib/api';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Check, 
  Boxes, 
  Layers, 
  SlidersHorizontal, 
  Utensils, 
  AlertCircle,
  Eye,
  EyeOff,
  LayoutGrid,
  Table as TableIcon,
  Sparkles,
  UploadCloud,
  Image as ImageIcon,
  X
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { MenuItem, Category, ModifierGroup, RecipeIngredient } from '../../types';
import { DataTable } from '../ui/data-table';
import { DataTableColumnHeader } from '../ui/data-table-column-header';
import { CategoryManagerDialog } from './CategoryManagerDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export const AdminMenu: React.FC = () => {
  const {
    categories,
    menuItems,
    inventoryItems,
    toggleDishAvailability,
  } = useRestaurant();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);

  const menuCategories = useMemo(() => {
    return categories.filter(c => c.type === 'menu' || !c.type || c.type === 'both');
  }, [categories]);

  // Form fields for editing/creating
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('15.00');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'cat-1');
  const [image, setImage] = useState('');
  const [modifierGroups, setModifierGroups] = useState<ModifierGroup[]>([]);
  const [recipe, setRecipe] = useState<RecipeIngredient[]>([]);

  // Image Upload state & file handling
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, WebP, or GIF).');
      return;
    }
    if (file.size > 6 * 1024 * 1024) {
      setUploadError('Image size exceeds 6MB. Please upload a smaller image.');
      return;
    }
    setUploadError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        setImage(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesCat = activeCategory === 'all' || item.category_id === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [menuItems, activeCategory, searchQuery]);

  const handleOpenEdit = (item: MenuItem) => {
    setEditingItem(item);
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price.toString());
    setCategoryId(item.category_id);
    setImage(item.image);
    setModifierGroups([...item.modifier_groups]);
    setRecipe([...item.recipe]);
    setIsCreateOpen(true);
  };

  const handleOpenCreate = () => {
    setEditingItem(null);
    setName('');
    setDescription('');
    setPrice('18.00');
    setCategoryId(categories[0]?.id || 'cat-1');
    setImage('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80');
    setModifierGroups([]);
    setRecipe([]);
    setIsCreateOpen(true);
  };

  const handleSaveItem = async () => {
    if (!name.trim()) return;

    const payload = {
      category_id: categoryId,
      name: name.trim(),
      description: description.trim(),
      price: Number(price) || 0,
      image: image.trim() || undefined,
      modifier_groups: modifierGroups,
      recipe: recipe,
    };

    try {
      if (editingItem) {
        await laravelApi.menu.updateMenuItem(editingItem.id, payload);
      } else {
        await laravelApi.menu.createMenuItem(payload);
      }
      router.reload({ only: ['menuItems', 'categories'] });
      setIsCreateOpen(false);
    } catch (err) {
      const errors = formatLaravelErrors(err);
      alert(errors.join('\n'));
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (confirm('Are you sure you want to remove this menu item?')) {
      try {
        await laravelApi.menu.deleteMenuItem(id);
        router.reload({ only: ['menuItems'] });
      } catch (err) {
        const errors = formatLaravelErrors(err);
        alert(errors.join('\n'));
      }
    }
  };

  const handleToggleAvailability = async (id: string) => {
    try {
      await laravelApi.menu.toggleAvailability(id);
      router.reload({ only: ['menuItems'] });
    } catch (err) {
      const errors = formatLaravelErrors(err);
      alert(errors.join('\n'));
    }
  };

  const handleAddRecipeIngredient = () => {
    if (inventoryItems.length === 0) return;
    setRecipe(prev => [...prev, { inventory_item_id: inventoryItems[0].id, quantity_used: 0.1 }]);
  };

  const handleRemoveRecipeIngredient = (index: number) => {
    setRecipe(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleUpdateRecipeIngredient = (index: number, itemId: string, qty: number) => {
    setRecipe(prev =>
      prev.map((r, idx) => (idx === index ? { inventory_item_id: itemId, quantity_used: qty } : r))
    );
  };

  // Dynamic Modifier Group Helpers
  const handleAddModifierGroup = () => {
    const uid = Date.now();
    const newGroup: ModifierGroup = {
      id: `mg-${uid}-${Math.random().toString(36).substring(2, 6)}`,
      name: 'Custom Modifier Group',
      required: false,
      min_selection: 0,
      max_selection: 1,
      options: [
        { id: `opt-${uid}-1`, name: 'Standard Choice', extra_price: 0 },
        { id: `opt-${uid}-2`, name: 'Extra Add-on', extra_price: 1.50 },
      ],
    };
    setModifierGroups(prev => [...prev, newGroup]);
  };

  const handleRemoveModifierGroup = (groupIndex: number) => {
    setModifierGroups(prev => prev.filter((_, idx) => idx !== groupIndex));
  };

  const handleUpdateModifierGroup = <K extends keyof ModifierGroup>(
    groupIndex: number,
    field: K,
    value: ModifierGroup[K]
  ) => {
    setModifierGroups(prev =>
      prev.map((g, idx) => (idx === groupIndex ? { ...g, [field]: value } : g))
    );
  };

  const handleAddModifierOption = (groupIndex: number) => {
    const uid = Date.now();
    setModifierGroups(prev =>
      prev.map((g, idx) => {
        if (idx !== groupIndex) return g;
        const newOpt = {
          id: `opt-${uid}-${g.options.length + 1}`,
          name: `Option ${g.options.length + 1}`,
          extra_price: 0,
        };
        return { ...g, options: [...g.options, newOpt] };
      })
    );
  };

  const handleRemoveModifierOption = (groupIndex: number, optIndex: number) => {
    setModifierGroups(prev =>
      prev.map((g, idx) => {
        if (idx !== groupIndex) return g;
        return { ...g, options: g.options.filter((_, oIdx) => oIdx !== optIndex) };
      })
    );
  };

  const handleUpdateModifierOption = (
    groupIndex: number,
    optIndex: number,
    field: 'name' | 'extra_price',
    value: string | number
  ) => {
    setModifierGroups(prev =>
      prev.map((g, idx) => {
        if (idx !== groupIndex) return g;
        const updatedOpts = g.options.map((opt, oIdx) => {
          if (oIdx !== optIndex) return opt;
          return {
            ...opt,
            [field]: field === 'extra_price' ? Number(value) || 0 : value,
          };
        });
        return { ...g, options: updatedOpts };
      })
    );
  };

  const handleApplyPresetTemplate = (preset: 'crust' | 'cheese' | 'temperature' | 'toppings' | 'beverage') => {
    let newGroup: ModifierGroup;
    const uid = Date.now();
    if (preset === 'crust') {
      newGroup = {
        id: `mg-${uid}`,
        name: 'Crust & Dough Selection',
        required: true,
        min_selection: 1,
        max_selection: 1,
        options: [
          { id: `opt-${uid}-1`, name: 'Classic Neapolitan (Soft & Airy)', extra_price: 0 },
          { id: `opt-${uid}-2`, name: 'Thin & Crispy Romana', extra_price: 0 },
          { id: `opt-${uid}-3`, name: 'Gluten-Free Artisan Dough', extra_price: 3.50 },
        ],
      };
    } else if (preset === 'cheese') {
      newGroup = {
        id: `mg-${uid}`,
        name: 'Cheese & Dairy Choices',
        required: false,
        min_selection: 0,
        max_selection: 3,
        options: [
          { id: `opt-${uid}-1`, name: 'Extra Mozzarella di Bufala DOP', extra_price: 2.50 },
          { id: `opt-${uid}-2`, name: 'Aged Parmigiano Reggiano 24mo', extra_price: 2.00 },
          { id: `opt-${uid}-3`, name: 'Creamy Burrata Pugliese', extra_price: 4.00 },
          { id: `opt-${uid}-4`, name: 'Lactose-Free Mozzarella', extra_price: 1.50 },
        ],
      };
    } else if (preset === 'temperature') {
      newGroup = {
        id: `mg-${uid}`,
        name: 'Doneness & Temperature',
        required: true,
        min_selection: 1,
        max_selection: 1,
        options: [
          { id: `opt-${uid}-1`, name: 'Rare (Warm Red Center)', extra_price: 0 },
          { id: `opt-${uid}-2`, name: 'Medium Rare (Warm Pink Center)', extra_price: 0 },
          { id: `opt-${uid}-3`, name: 'Medium (Warm Pinkish Center)', extra_price: 0 },
          { id: `opt-${uid}-4`, name: 'Well Done', extra_price: 0 },
        ],
      };
    } else if (preset === 'toppings') {
      newGroup = {
        id: `mg-${uid}`,
        name: 'Gourmet Extra Toppings',
        required: false,
        min_selection: 0,
        max_selection: 5,
        options: [
          { id: `opt-${uid}-1`, name: 'Prosciutto di Parma 20-Month', extra_price: 3.50 },
          { id: `opt-${uid}-2`, name: 'Shaved Black Summer Truffle', extra_price: 5.00 },
          { id: `opt-${uid}-3`, name: 'Spicy Calabrian \'Nduja', extra_price: 2.50 },
          { id: `opt-${uid}-4`, name: 'Wild Foraged Porcini Mushrooms', extra_price: 3.00 },
          { id: `opt-${uid}-5`, name: 'Organic Hot Chili Honey Drizzle', extra_price: 1.50 },
        ],
      };
    } else {
      newGroup = {
        id: `mg-${uid}`,
        name: 'Beverage Ice & Sweetness',
        required: false,
        min_selection: 0,
        max_selection: 1,
        options: [
          { id: `opt-${uid}-1`, name: 'Regular Ice', extra_price: 0 },
          { id: `opt-${uid}-2`, name: 'Less Ice', extra_price: 0 },
          { id: `opt-${uid}-3`, name: 'No Ice', extra_price: 0 },
          { id: `opt-${uid}-4`, name: 'Extra Cold', extra_price: 0 },
        ],
      };
    }
    setModifierGroups(prev => [...prev, newGroup]);
  };

  // DataTable columns definition
  const columns = useMemo<ColumnDef<MenuItem>[]>(() => [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Dish & Recipe" />
      ),
      cell: ({ row }) => {
        const dish = row.original;
        return (
          <div className="flex items-center gap-3">
            <img
              src={dish.image}
              alt={dish.name}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-xl object-cover border border-stone-800 shrink-0 bg-stone-950"
            />
            <div className="space-y-0.5 max-w-xs">
              <div className="font-bold text-stone-100 text-xs">{dish.name}</div>
              <div className="text-[11px] text-stone-400 line-clamp-1">{dish.description}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'category_id',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Category" />
      ),
      cell: ({ row }) => {
        const cat = categories.find(c => c.id === row.original.category_id);
        return (
          <Badge variant="outline" className="text-[11px] border-stone-700 bg-stone-950 font-medium">
            {cat?.name || 'Category'}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'price',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Base Price" />
      ),
      cell: ({ row }) => (
        <span className="font-mono font-black text-amber-400 text-xs">
          ${row.original.price.toFixed(2)}
        </span>
      ),
    },
    {
      id: 'bom_and_mods',
      header: 'BOM Ingredients & Options',
      cell: ({ row }) => {
        const dish = row.original;
        return (
          <div className="flex items-center gap-2 text-[11px]">
            <span className="px-2 py-0.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-300 flex items-center gap-1 font-mono">
              <Boxes className="w-3 h-3 text-amber-400" />
              {dish.recipe.length} raw BOM
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-400 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3 text-stone-400" />
              {dish.modifier_groups.length} mod group{dish.modifier_groups.length !== 1 ? 's' : ''}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: 'is_available',
      header: 'Availability',
      cell: ({ row }) => {
        const dish = row.original;
        return (
          <button
            onClick={() => handleToggleAvailability(dish.id)}
            className="cursor-pointer"
            title="Click to toggle availability"
          >
            <Badge
              variant={dish.is_available ? 'amber' : 'destructive'}
              className="text-[10px] uppercase font-bold"
            >
              {dish.is_available ? 'Available' : 'Sold Out'}
            </Badge>
          </button>
        );
      },
    },
    {
      id: 'actions',
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const dish = row.original;
        return (
          <div className="flex items-center justify-end gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleOpenEdit(dish)}
              className="h-8 border-stone-800 text-stone-300 hover:text-stone-100 text-xs rounded-lg gap-1 px-2.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit & BOM</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteItem(dish.id)}
              className="h-8 w-8 text-stone-500 hover:text-red-400 rounded-lg"
              title="Delete Item"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        );
      },
    },
  ], [categories, toggleDishAvailability]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-stone-100">
              Menu Catalog & Bill of Materials (BOM)
            </h1>
            <Badge variant="amber" className="text-[10px] font-mono">
              {menuItems.length} Dishes
            </Badge>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Configure dishes, prices, modifier choices, and recipe raw inventory linkings
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
            variant="outline"
            onClick={() => setIsCategoryManagerOpen(true)}
            className="h-10 border-stone-800 bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-amber-400 font-bold text-xs rounded-xl gap-2 shadow-sm"
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Manage Categories</span>
          </Button>

          <Button
            onClick={handleOpenCreate}
            className="h-10 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Dish Item</span>
          </Button>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-2 bg-stone-900 border border-stone-800 rounded-2xl scrollbar-none">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
            activeCategory === 'all' ? 'bg-amber-500 text-stone-950' : 'bg-stone-950 text-stone-400 border border-stone-800'
          }`}
        >
          All Categories ({menuItems.length})
        </button>
        {menuCategories.map(cat => {
          const count = menuItems.filter(i => i.category_id === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id ? 'bg-amber-500 text-stone-950' : 'bg-stone-950 text-stone-400 border border-stone-800'
              }`}
            >
              {cat.name} ({count})
            </button>
          );
        })}
        <button
          onClick={() => setIsCategoryManagerOpen(true)}
          className="px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap bg-stone-950/80 hover:bg-stone-800 text-amber-400 hover:text-amber-300 border border-dashed border-amber-500/40 flex items-center gap-1"
          title="Add or manage categories"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Category</span>
        </button>
      </div>

      {/* View Content */}
      {viewMode === 'table' ? (
        <DataTable
          columns={columns}
          data={filteredItems}
          searchPlaceholder="Search menu dishes..."
          globalFilter={searchQuery}
          onGlobalFilterChange={setSearchQuery}
          pageSize={10}
          pageSizeOptions={[10, 20, 50]}
          emptyMessage="No menu dishes match the current filter."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(dish => {
            const category = categories.find(c => c.id === dish.category_id);

            return (
              <Card
                key={dish.id}
                className="bg-stone-900 border-stone-800 text-stone-100 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-stone-700 transition"
              >
                {/* Top Banner with Image */}
                <div className="relative h-40 w-full overflow-hidden bg-stone-950">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <Badge variant="outline" className="text-[10px] bg-stone-950/80 border-stone-700 text-stone-300">
                      {category?.name || 'Category'}
                    </Badge>
                    <button
                      onClick={() => handleToggleAvailability(dish.id)}
                      className="cursor-pointer"
                      title={dish.is_available ? 'Mark as Sold Out' : 'Mark as Available'}
                    >
                      <Badge variant={dish.is_available ? 'amber' : 'destructive'} className="text-[10px]">
                        {dish.is_available ? 'Available' : 'Sold Out'}
                      </Badge>
                    </button>
                  </div>

                  <div className="absolute bottom-3 left-4">
                    <span className="text-amber-400 font-black text-lg drop-shadow-md">
                      ${dish.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-sm text-stone-100">{dish.name}</h3>
                    <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  {/* BOM Recipe & Modifiers info */}
                  <div className="pt-2 border-t border-stone-800/80 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-[11px] text-stone-400">
                      <span className="flex items-center gap-1">
                        <SlidersHorizontal className="w-3 h-3 text-amber-400" />
                        {dish.modifier_groups.length} Modifier Group{dish.modifier_groups.length !== 1 ? 's' : ''}
                      </span>
                      <span className="flex items-center gap-1">
                        <Boxes className="w-3 h-3 text-amber-400" />
                        {dish.recipe.length} BOM Ingredient{dish.recipe.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="pt-3 border-t border-stone-800 flex items-center justify-between gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenEdit(dish)}
                      className="flex-1 h-8 border-stone-800 text-stone-300 hover:text-stone-100 text-xs rounded-xl gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit & BOM</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteItem(dish.id)}
                      className="h-8 w-8 text-stone-500 hover:text-red-400 rounded-xl"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Create / Edit Dish Modal */}
      {isCreateOpen && (
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent className="max-w-2xl bg-stone-900 border-stone-800 text-stone-100 p-5 rounded-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <DialogHeader>
              <DialogTitle className="text-base font-black">
                {editingItem ? `Edit Dish: ${editingItem.name}` : 'Create New Menu Dish'}
              </DialogTitle>
              <DialogDescription className="text-xs text-stone-400">
                Update general details, pricing, modifier choices, and linked BOM inventory ingredients
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              
              {/* Name & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-stone-300">Dish Name</Label>
                  <Input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Quattro Formaggi Wood-Fired Pizza"
                    className="text-xs bg-stone-950 border-stone-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-stone-300">Category</Label>
                  <Select value={categoryId} onValueChange={setCategoryId}>
                    <SelectTrigger className="text-xs bg-stone-950 border-stone-800">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {menuCategories.map(c => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-stone-300">Base Price ($)</Label>
                <Input
                  type="number"
                  step="0.25"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  className="text-xs font-mono font-bold bg-stone-950 border-stone-800 text-amber-400"
                />
              </div>

              {/* Dish Image Upload (Drag-and-Drop + Click to Upload) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold text-stone-300">Dish Photo</Label>
                  {image && (
                    <span className="text-[11px] font-medium text-amber-400">
                      Image attached
                    </span>
                  )}
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                  accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
                  className="hidden"
                />

                {image ? (
                  <div className="relative flex flex-col sm:flex-row items-center gap-3 p-3 bg-stone-950 border border-stone-800 rounded-xl">
                    <div className="relative size-20 sm:size-24 rounded-lg overflow-hidden shrink-0 bg-stone-900 border border-stone-800">
                      <img
                        src={image}
                        alt="Dish Preview"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-1 text-center sm:text-left min-w-0">
                      <p className="text-xs font-bold text-stone-200 truncate">Uploaded Dish Photo</p>
                      <p className="text-[11px] text-stone-400">
                        Ready for display in customer catalog and POS order menus.
                      </p>
                      <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                          className="h-7 text-xs border-stone-700 bg-stone-900 hover:bg-stone-800 text-stone-300"
                        >
                          <UploadCloud className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                          Replace
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setImage('')}
                          className="h-7 text-xs text-stone-400 hover:text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-3.5 h-3.5 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-5 text-center transition cursor-pointer flex flex-col items-center justify-center gap-2 ${
                      isDragging
                        ? 'border-amber-500 bg-amber-500/10'
                        : 'border-stone-800 hover:border-stone-700 bg-stone-950/60 hover:bg-stone-950'
                    }`}
                  >
                    <div className="size-10 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-amber-400">
                      <UploadCloud className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-200">
                        <span className="text-amber-400 hover:underline">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        PNG, JPG, WebP, GIF or SVG (max. 6MB)
                      </p>
                    </div>
                  </div>
                )}

                {uploadError && (
                  <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {uploadError}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-stone-300">Description</Label>
                <Textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={2}
                  placeholder="Ingredients, preparation details, flavor profile..."
                  className="text-xs bg-stone-950 border-stone-800"
                />
              </div>

              {/* Dynamic Modifiers & Customization Groups */}
              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-black text-amber-400 flex items-center gap-1.5">
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      Dynamic Modifiers & Options ({modifierGroups.length})
                    </h4>
                    <p className="text-[11px] text-stone-400">
                      Configure customizer groups, required choices, extra price add-ons, and limits
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    {/* Quick Preset Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs border-stone-700 bg-stone-900 text-stone-300 hover:text-amber-400 gap-1"
                        >
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          <span>+ Quick Preset</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56 bg-stone-900 border-stone-800 text-stone-200 text-xs">
                        <DropdownMenuLabel className="text-[10px] text-stone-400 uppercase tracking-wider">
                          Insert Modifier Template
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-stone-800" />
                        <DropdownMenuItem onClick={() => handleApplyPresetTemplate('crust')} className="cursor-pointer hover:bg-stone-800">
                          🍕 Crust & Dough Selection
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleApplyPresetTemplate('cheese')} className="cursor-pointer hover:bg-stone-800">
                          🧀 Cheese & Dairy Add-ons
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleApplyPresetTemplate('temperature')} className="cursor-pointer hover:bg-stone-800">
                          🥩 Doneness / Temperature
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleApplyPresetTemplate('toppings')} className="cursor-pointer hover:bg-stone-800">
                          🥓 Gourmet Extra Toppings
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleApplyPresetTemplate('beverage')} className="cursor-pointer hover:bg-stone-800">
                          🧊 Beverage Ice & Sweetness
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddModifierGroup}
                      className="h-7 text-xs border-stone-700 bg-stone-900 text-amber-400 hover:bg-stone-800"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Group
                    </Button>
                  </div>
                </div>

                {modifierGroups.length === 0 ? (
                  <div className="p-4 rounded-xl border border-dashed border-stone-800 bg-stone-900/40 text-center space-y-2">
                    <p className="text-xs text-stone-400">
                      No custom modifiers attached to this dish yet.
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Add modifiers like size choices, cheese selection, meat temperatures, or paid extra toppings.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddModifierGroup}
                      className="h-7 text-xs border-stone-700 text-amber-400"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Create First Modifier Group
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {modifierGroups.map((group, gIdx) => (
                      <div
                        key={group.id || gIdx}
                        className="p-3 rounded-xl bg-stone-900/90 border border-stone-800 space-y-3"
                      >
                        {/* Group Header Controls */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800/80 pb-2.5">
                          <div className="flex-1 min-w-0">
                            <Input
                              value={group.name}
                              onChange={e => handleUpdateModifierGroup(gIdx, 'name', e.target.value)}
                              placeholder="Group Name (e.g. Size, Crust, Extra Toppings)"
                              className="h-8 text-xs font-bold text-stone-100 bg-stone-950 border-stone-800"
                            />
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <label className="flex items-center gap-1.5 text-xs text-stone-300 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={group.required}
                                onChange={e => {
                                  handleUpdateModifierGroup(gIdx, 'required', e.target.checked);
                                  if (e.target.checked && group.min_selection === 0) {
                                    handleUpdateModifierGroup(gIdx, 'min_selection', 1);
                                  }
                                }}
                                className="rounded bg-stone-950 border-stone-700 text-amber-500 focus:ring-0 cursor-pointer"
                              />
                              <span>Required</span>
                            </label>

                            <div className="flex items-center gap-1 text-[11px] text-stone-400">
                              <span>Max:</span>
                              <Input
                                type="number"
                                min="1"
                                max="20"
                                value={group.max_selection}
                                onChange={e => handleUpdateModifierGroup(gIdx, 'max_selection', Math.max(1, Number(e.target.value) || 1))}
                                className="h-7 w-14 text-xs font-mono bg-stone-950 border-stone-800 text-center"
                              />
                            </div>

                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveModifierGroup(gIdx)}
                              className="h-7 w-7 text-stone-500 hover:text-red-400"
                              title="Delete Modifier Group"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>

                        {/* Options List */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] uppercase font-bold text-stone-400 tracking-wider px-1">
                            <span>Modifier Option</span>
                            <span>Extra Price ($)</span>
                          </div>

                          {group.options.map((opt, optIdx) => (
                            <div key={opt.id || optIdx} className="flex items-center gap-2">
                              <Input
                                value={opt.name}
                                onChange={e => handleUpdateModifierOption(gIdx, optIdx, 'name', e.target.value)}
                                placeholder="Option name (e.g. Extra Mozzarella, Medium Rare)"
                                className="flex-1 h-7 text-xs bg-stone-950 border-stone-800"
                              />
                              <div className="w-24">
                                <Input
                                  type="number"
                                  step="0.25"
                                  min="0"
                                  value={opt.extra_price}
                                  onChange={e => handleUpdateModifierOption(gIdx, optIdx, 'extra_price', e.target.value)}
                                  placeholder="0.00"
                                  className="h-7 text-xs font-mono font-bold bg-stone-950 border-stone-800 text-amber-400"
                                />
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveModifierOption(gIdx, optIdx)}
                                className="h-7 w-7 text-stone-500 hover:text-red-400"
                                disabled={group.options.length <= 1}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}

                          <div className="pt-1 flex justify-start">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleAddModifierOption(gIdx)}
                              className="h-6 text-[11px] text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 gap-1 px-2"
                            >
                              <Plus className="w-3 h-3" />
                              Add Option to {group.name || 'Group'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recipe Bill of Materials (BOM) linking */}
              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-black text-amber-400 flex items-center gap-1.5">
                      <Boxes className="w-3.5 h-3.5" />
                      Recipe Bill of Materials (BOM)
                    </h4>
                    <p className="text-[11px] text-stone-400">
                      Ingredients automatically deducted when line cook starts prep
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddRecipeIngredient}
                    className="h-7 text-xs border-stone-700 bg-stone-900"
                  >
                    + Add Ingredient
                  </Button>
                </div>

                {recipe.length === 0 ? (
                  <p className="text-xs text-stone-500 italic">
                    No raw ingredients linked to this dish. Stock will not be deducted.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {recipe.map((rec, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Select
                          value={rec.inventory_item_id}
                          onValueChange={val => handleUpdateRecipeIngredient(idx, val, rec.quantity_used)}
                        >
                          <SelectTrigger className="flex-1 h-8 text-xs bg-stone-900 border-stone-800">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {inventoryItems.map(inv => (
                              <SelectItem key={inv.id} value={inv.id}>
                                {inv.name} ({inv.unit})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <div className="w-24">
                          <Input
                            type="number"
                            step="0.01"
                            value={rec.quantity_used}
                            onChange={e => handleUpdateRecipeIngredient(idx, rec.inventory_item_id, Number(e.target.value))}
                            className="h-8 text-xs font-mono bg-stone-900 border-stone-800"
                          />
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveRecipeIngredient(idx)}
                          className="h-8 w-8 text-stone-500 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            <div className="pt-3 border-t border-stone-800 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsCreateOpen(false)}
                className="border-stone-800 text-xs h-10 px-4"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveItem}
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs h-10 px-5 rounded-xl"
              >
                Save Menu Item
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Category Manager Dialog */}
      <CategoryManagerDialog
        open={isCategoryManagerOpen}
        onOpenChange={setIsCategoryManagerOpen}
        defaultScope="menu"
      />

    </div>
  );
};
