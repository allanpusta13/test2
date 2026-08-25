import React, { useState, useEffect } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { MenuItem, SelectedModifier } from '../../types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Plus, Minus, Check, AlertCircle, ShoppingBag } from 'lucide-react';

export const DishCustomizerDialog: React.FC = () => {
  const {
    selectedDishForCustomizer,
    setSelectedDishForCustomizer,
    addToCart,
    setIsCartOpen,
    inventoryItems,
  } = useRestaurant();

  const [quantity, setQuantity] = useState(1);
  const [selectedModifiers, setSelectedModifiers] = useState<SelectedModifier[]>([]);
  const [specialNotes, setSpecialNotes] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedDishForCustomizer) {
      setQuantity(1);
      setSpecialNotes('');
      setValidationError(null);

      // Pre-select default first options for required modifier groups
      const initialMods: SelectedModifier[] = [];
      selectedDishForCustomizer.modifier_groups.forEach(group => {
        if (group.required && group.options.length > 0) {
          initialMods.push({
            group_name: group.name,
            option_name: group.options[0].name,
            extra_price: group.options[0].extra_price,
          });
        }
      });
      setSelectedModifiers(initialMods);
    }
  }, [selectedDishForCustomizer]);

  if (!selectedDishForCustomizer) return null;

  const dish = selectedDishForCustomizer;

  const handleModifierToggle = (
    groupName: string,
    optName: string,
    extraPrice: number,
    maxSelection: number,
    required: boolean
  ) => {
    setSelectedModifiers(prev => {
      const isAlreadySelected = prev.some(
        m => m.group_name === groupName && m.option_name === optName
      );

      if (maxSelection === 1) {
        // Single selection (Radio behavior)
        const filtered = prev.filter(m => m.group_name !== groupName);
        return [...filtered, { group_name: groupName, option_name: optName, extra_price: extraPrice }];
      } else {
        // Multi-selection (Checkbox behavior)
        if (isAlreadySelected) {
          return prev.filter(m => !(m.group_name === groupName && m.option_name === optName));
        } else {
          const currentGroupSelections = prev.filter(m => m.group_name === groupName);
          if (currentGroupSelections.length >= maxSelection) {
            return prev; // capped at max
          }
          return [...prev, { group_name: groupName, option_name: optName, extra_price: extraPrice }];
        }
      }
    });
  };

  const calculateItemUnitPrice = (): number => {
    const modsTotal = selectedModifiers.reduce((sum, m) => sum + m.extra_price, 0);
    return dish.price + modsTotal;
  };

  const singleUnitPrice = calculateItemUnitPrice();
  const totalPrice = singleUnitPrice * quantity;

  const handleAddToCart = () => {
    // Validate required groups
    for (const group of dish.modifier_groups) {
      if (group.required) {
        const count = selectedModifiers.filter(m => m.group_name === group.name).length;
        if (count < group.min_selection) {
          setValidationError(`Please select an option for "${group.name}".`);
          return;
        }
      }
    }

    addToCart({
      id: `item-${Date.now()}`,
      menu_item_id: dish.id,
      name: dish.name,
      quantity,
      unit_price: singleUnitPrice,
      total_price: Number(totalPrice.toFixed(2)),
      notes: specialNotes.trim() || undefined,
      selected_modifiers: selectedModifiers,
    });

    setSelectedDishForCustomizer(null);
    setIsCartOpen(true);
  };

  return (
    <Dialog open={!!selectedDishForCustomizer} onOpenChange={open => !open && setSelectedDishForCustomizer(null)}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto bg-stone-900 border-stone-800 text-stone-100 p-0 rounded-2xl">
        
        {/* Dish Hero Image & Header */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-stone-950">
          <img
            src={dish.image}
            alt={dish.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-black text-stone-100 drop-shadow-md">{dish.name}</h2>
              <p className="text-amber-400 font-extrabold text-base">${dish.price.toFixed(2)} base</p>
            </div>
            <Badge variant="amber" className="text-xs">
              {dish.is_available ? 'In Stock' : 'Sold Out'}
            </Badge>
          </div>
        </div>

        <div className="p-5 space-y-6">
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">{dish.description}</p>

          {/* BOM Recipe Transparency (Recipe Bill of Materials §5) */}
          {dish.recipe && dish.recipe.length > 0 && (
            <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/80 text-xs">
              <span className="font-bold text-stone-400 block mb-1 uppercase tracking-wider text-[10px]">
                Key Fresh Ingredients (BOM Recipe)
              </span>
              <div className="flex flex-wrap gap-1.5">
                {dish.recipe.map(r => {
                  const inv = inventoryItems.find(i => i.id === r.inventory_item_id);
                  return (
                    <span key={r.inventory_item_id} className="px-2 py-0.5 rounded-lg bg-stone-800 text-stone-300 text-[11px]">
                      {inv ? inv.name : 'Ingredient'} ({r.quantity_used} {inv?.unit})
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Modifier Groups */}
          {dish.modifier_groups.map(group => (
            <div key={group.id} className="space-y-2 border-t border-stone-800 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-stone-200">{group.name}</h4>
                  <p className="text-[11px] text-stone-400">
                    {group.required ? 'Required choice' : 'Optional add-ons'} • Max {group.max_selection}
                  </p>
                </div>
                {group.required && (
                  <Badge variant="outline" className="text-[10px] border-amber-500/40 text-amber-400">
                    Required
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {group.options.map(opt => {
                  const isSelected = selectedModifiers.some(
                    m => m.group_name === group.name && m.option_name === opt.name
                  );

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() =>
                        handleModifierToggle(
                          group.name,
                          opt.name,
                          opt.extra_price,
                          group.max_selection,
                          group.required
                        )
                      }
                      className={`flex items-center justify-between p-3 rounded-xl border text-left transition cursor-pointer ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10 text-stone-100'
                          : 'border-stone-800 bg-stone-950/40 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-${group.max_selection === 1 ? 'full' : 'md'} border flex items-center justify-center ${
                            isSelected
                              ? 'bg-amber-500 border-amber-500 text-stone-950'
                              : 'border-stone-700 bg-stone-900'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-semibold">{opt.name}</span>
                      </div>
                      <span className="text-xs font-bold text-amber-400">
                        {opt.extra_price > 0 ? `+$${opt.extra_price.toFixed(2)}` : 'Included'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Kitchen / Dietary Special Notes */}
          <div className="border-t border-stone-800 pt-4 space-y-2">
            <Label htmlFor="special-notes" className="text-xs font-bold text-stone-300">
              Kitchen Instructions / Allergies
            </Label>
            <Textarea
              id="special-notes"
              value={specialNotes}
              onChange={e => setSpecialNotes(e.target.value)}
              placeholder="e.g. Extra crispy crust, dressing on the side, no onions..."
              rows={2}
              className="text-xs bg-stone-950 border-stone-800 focus:border-amber-500"
            />
          </div>

          {validationError && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}
        </div>

        {/* Footer: Quantity & Add Button */}
        <div className="p-4 border-t border-stone-800 bg-stone-950/90 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 p-1 rounded-xl">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="h-8 w-8 text-stone-300 hover:text-stone-100"
            >
              <Minus className="w-3.5 h-3.5" />
            </Button>
            <span className="w-6 text-center text-xs font-extrabold text-stone-100">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
              className="h-8 w-8 text-stone-300 hover:text-stone-100"
            >
              <Plus className="w-3.5 h-3.5" />
            </Button>
          </div>

          <Button
            id="dish-add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={!dish.is_available}
            className="flex-1 h-11 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm rounded-xl gap-2 shadow-lg shadow-amber-500/20"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Cart • ${totalPrice.toFixed(2)}</span>
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default DishCustomizerDialog;
