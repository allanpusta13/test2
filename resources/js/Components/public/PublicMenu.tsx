import React, { useState, useRef } from 'react';
import { useRestaurant } from '../../Context/RestaurantContext';
import { 
  Search, 
  Sparkles, 
  Pizza, 
  UtensilsCrossed, 
  Salad, 
  Cake, 
  Wine, 
  Coins, 
  Clock, 
  MapPin, 
  Plus, 
  Flame, 
  Coffee, 
  Tag, 
  Utensils,
  ChefHat,
  ArrowDown,
  ShieldCheck,
  ReceiptText,
  Star,
  Timer,
  ShoppingBag
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { DishCustomizerDialog } from './DishCustomizerDialog';
import { CartDrawer } from './CartDrawer';
import { CheckoutDialog } from './CheckoutDialog';

export const PublicMenu: React.FC = () => {
  const {
    t,
    settings,
    categories,
    menuItems,
    setSelectedDishForCustomizer,
    inventoryItems,
    setActiveSurface,
    setIsCartOpen,
    cart,
  } = useRestaurant();

  const [activeCategoryId, setActiveCategoryId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const menuCatalogRef = useRef<HTMLDivElement>(null);

  const scrollToMenu = () => {
    menuCatalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const getCategoryIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Pizza': return <Pizza className="w-4 h-4" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-4 h-4" />;
      case 'Utensils': return <Utensils className="w-4 h-4" />;
      case 'Salad': return <Salad className="w-4 h-4" />;
      case 'Cake': return <Cake className="w-4 h-4" />;
      case 'Wine': return <Wine className="w-4 h-4" />;
      case 'Coffee': return <Coffee className="w-4 h-4" />;
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Tag': return <Tag className="w-4 h-4" />;
      default: return <Utensils className="w-4 h-4" />;
    }
  };

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategoryId === 'all' || item.category_id === activeCategoryId;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Featured signature chef specials
  const featuredDishes = menuItems.slice(0, 3);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-950 pb-24 text-stone-100 selection:bg-amber-500 selection:text-stone-950">
      
      {/* 1. HERO WELCOME SECTION */}
      <section className="relative border-b border-stone-800 bg-stone-950 overflow-hidden">
        {/* Ambient Warm Atmosphere Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 sm:pt-14 sm:pb-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Hero Story & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5 shadow-sm">
                  <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  Wood-Fired Neapolitan Kitchen
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-stone-900 text-stone-300 border border-stone-800 flex items-center gap-1.5">
                  <Timer className="w-3.5 h-3.5 text-amber-400" />
                  Live Wait Time: ~15-20 mins
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-stone-100 tracking-tight leading-[1.1]">
                  {t('menu.title', {}, 'Handcrafted with Fire & Passion.')}
                </h1>
                <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                  {t('menu.subtitle', {}, `Welcome to ${settings.name}. Enjoy 72-hour naturally fermented sourdough pizzas, slow-simmered hand-cut pastas, and authentic Italian classics baked in our 900°F wood oven.`)}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  id="hero-explore-menu-btn"
                  onClick={scrollToMenu}
                  className="h-12 px-6 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm rounded-2xl gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
                >
                  <Utensils className="w-4 h-4" />
                  <span>{t('menu.all_categories', {}, 'Explore Menu & Order')}</span>
                  <ArrowDown className="w-4 h-4 ml-1 opacity-70" />
                </Button>

                <Button
                  id="hero-track-order-btn"
                  variant="outline"
                  onClick={() => setActiveSurface('public_tracker')}
                  className="h-12 px-5 border-stone-800 bg-stone-900/90 hover:bg-stone-800 text-stone-200 hover:text-amber-400 font-bold text-xs sm:text-sm rounded-2xl gap-2"
                >
                  <ReceiptText className="w-4 h-4 text-amber-400" />
                  <span>{t('app.nav.track_order', {}, 'Track Active Order')}</span>
                </Button>

                {cartItemCount > 0 && (
                  <Button
                    onClick={() => setIsCartOpen(true)}
                    className="h-12 px-5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs sm:text-sm rounded-2xl gap-2 shadow-md animate-pulse"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{t('menu.cart_title', {}, 'Order Slip')} ({cartItemCount})</span>
                  </Button>
                )}
              </div>

              {/* Location & Quick Info Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-stone-800/80 text-xs text-stone-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate">{settings.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{settings.hours}</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card: Cash Policy & Chef Promise */}
            <div className="lg:col-span-5 space-y-4">
              {/* Highlight Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-stone-900/90 to-stone-950 border border-stone-800 shadow-2xl relative overflow-hidden space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold border border-amber-500/30">
                      <Coins className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-xs font-black uppercase tracking-wider text-amber-400">
                        Cash-Only Counter Policy
                      </h2>
                      <p className="text-[11px] text-stone-400">Direct Register Settlement</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[10px] border-amber-500/40 text-amber-400 font-mono">
                    Zero Card Fees
                  </Badge>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed">
                  {t('app.cash_notice', {}, settings.cash_policy_notice)}
                </p>

                <div className="p-3 rounded-2xl bg-stone-950/80 border border-stone-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-400">{t('menu.dine_in', {}, 'Dine-In')} & {t('menu.takeaway', {}, 'Takeaway')}:</span>
                    <span className="text-amber-400 font-bold">Pay Cash at Register</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-400">Sales Tax:</span>
                    <span className="font-mono text-stone-200 font-bold">{(settings.tax_rate * 100).toFixed(3)}%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-400">Receipts:</span>
                    <span className="text-emerald-400 font-bold">Printed ESC/POS Thermal Tickets</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-stone-400 pt-1">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{t('menu.pay_at_counter_reminder', {}, 'Place your order online, get your ticket number, and pay at the counter upon collection.')}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THREE ARTISAN CRAFT PILLARS */}
      <section className="border-b border-stone-800/80 bg-stone-900/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800/80 flex items-start gap-4 hover:border-amber-500/40 transition">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                <Flame className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h2 className="text-sm font-bold text-stone-100">900°F Wood-Fired Oven</h2>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Bakes blistered leopard-crust Neapolitan pies in under 90 seconds with authentic oak & cherry wood.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800/80 flex items-start gap-4 hover:border-amber-500/40 transition">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h2 className="text-sm font-bold text-stone-100">72-Hour Sourdough Fermentation</h2>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Italian Caputo '00' flour fermented slowly for airy, easily digestible dough with deep complex flavor.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800/80 flex items-start gap-4 hover:border-amber-500/40 transition">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                <ChefHat className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h2 className="text-sm font-bold text-stone-100">Farm-Fresh Italian Ingredients</h2>
                <p className="text-xs text-stone-400 leading-relaxed">
                  D.O.P. San Marzano tomatoes, fresh Buffalo Mozzarella, aged Parmigiano, and organic local basil.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CHEF'S SIGNATURE SPECIALS SPOTLIGHT */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>Chef's Handpicked Highlights</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-100 mt-1">
              Signature Creations
            </h2>
          </div>
          <p className="text-xs text-stone-400">
            Customer favorites baked fresh to order
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredDishes.map(dish => (
            <div
              key={dish.id}
              onClick={() => setSelectedDishForCustomizer(dish)}
              className="p-4 rounded-3xl bg-stone-900/80 border border-stone-800 hover:border-amber-500/60 transition group cursor-pointer flex flex-col justify-between space-y-3"
            >
              <div className="relative h-44 rounded-2xl overflow-hidden bg-stone-950">
                <img
                  src={dish.image}
                  alt={dish.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 right-2.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-stone-950 shadow-sm">
                    Signature
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-3">
                  <span className="font-mono font-black text-base text-amber-400 bg-stone-950/80 px-2.5 py-0.5 rounded-lg border border-stone-800">
                    ${dish.price.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-bold text-sm text-stone-100 group-hover:text-amber-400 transition-colors">
                  {dish.name}
                </h3>
                <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                  {dish.description}
                </p>
              </div>

              <Button
                size="sm"
                className="w-full h-9 bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-stone-950 font-bold text-xs rounded-xl gap-1.5 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t('menu.customize', {}, 'Customize & Order')}</span>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE MENU CATALOG & SEARCH */}
      <div ref={menuCatalogRef} className="scroll-mt-20">
        
        {/* Sticky Filter & Search Bar */}
        <section className="sticky top-16 z-30 bg-stone-950/95 backdrop-blur-md border-y border-stone-800/80 py-4 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              
              {/* Search Bar */}
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <Input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={t('menu.search_placeholder', {}, 'Search pizzas, pastas, drinks...')}
                  className="pl-9 text-xs bg-stone-900 border-stone-800 focus:border-amber-500 rounded-xl text-stone-100 placeholder:text-stone-500 h-10"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
                <button
                  onClick={() => setActiveCategoryId('all')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                    activeCategoryId === 'all'
                      ? 'bg-amber-500 text-stone-950 shadow-sm'
                      : 'bg-stone-900 border border-stone-800 text-stone-300 hover:text-stone-100 hover:border-stone-700'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t('menu.all_categories', {}, 'All Specialties')} ({menuItems.length})</span>
                </button>

                {categories.map(cat => {
                  const catItemCount = menuItems.filter(i => i.category_id === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategoryId(cat.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                        activeCategoryId === cat.id
                          ? 'bg-amber-500 text-stone-950 shadow-sm'
                          : 'bg-stone-900 border border-stone-800 text-stone-300 hover:text-stone-100 hover:border-stone-700'
                      }`}
                    >
                      {getCategoryIcon(cat.icon)}
                      <span>{cat.name}</span>
                      <span className="text-[10px] opacity-70 font-mono">({catItemCount})</span>
                    </button>
                  );
                })}
              </div>

            </div>

          </div>
        </section>

        {/* Menu Items Grid */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {filteredItems.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-stone-900 text-stone-500 mx-auto flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <p className="text-stone-300 font-bold text-base">{t('orders.no_orders', {}, 'No matching dishes found')}</p>
              <p className="text-stone-500 text-xs">Try adjusting your search query or choosing another category above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(dish => (
                <Card
                  key={dish.id}
                  className="overflow-hidden border-stone-800 bg-stone-900/90 text-stone-100 rounded-3xl flex flex-col justify-between hover:border-stone-700 transition group shadow-lg"
                >
                  {/* Dish Photo */}
                  <div className="relative h-52 w-full overflow-hidden bg-stone-950">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent opacity-80" />
                    
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      {dish.modifier_groups && dish.modifier_groups.length > 0 && (
                        <Badge variant="outline" className="text-[10px] bg-stone-950/90 backdrop-blur-sm border-stone-700 text-stone-300 font-semibold">
                          {t('menu.customizable', {}, 'Customizable')}
                        </Badge>
                      )}
                      <Badge variant={dish.is_available ? 'amber' : 'destructive'} className="text-[10px]">
                        {dish.is_available ? t('menu.available', {}, 'Available') : t('menu.sold_out', {}, 'Sold Out')}
                      </Badge>
                    </div>

                    <div className="absolute bottom-3 left-4">
                      <span className="text-amber-400 font-black text-xl drop-shadow-md">
                        ${dish.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-extrabold text-base text-stone-100 group-hover:text-amber-400 transition-colors">
                        {dish.name}
                      </h3>
                      <p className="text-xs text-stone-400 line-clamp-3 leading-relaxed">
                        {dish.description}
                      </p>
                    </div>

                    {/* Recipe Ingredients Transparency */}
                    {dish.recipe && dish.recipe.length > 0 && (
                      <div className="pt-3 border-t border-stone-800/80">
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          Key Ingredients:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {dish.recipe.slice(0, 3).map(r => {
                            const item = inventoryItems.find(i => i.id === r.inventory_item_id);
                            return (
                              <span key={r.inventory_item_id} className="text-[10px] px-2 py-0.5 rounded-lg bg-stone-950 text-stone-300 border border-stone-800 font-medium">
                                {item?.name}
                              </span>
                            );
                          })}
                          {dish.recipe.length > 3 && (
                            <span className="text-[10px] px-1.5 py-0.5 text-stone-400">
                              +{dish.recipe.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <Button
                      id={`dish-btn-${dish.id}`}
                      onClick={() => setSelectedDishForCustomizer(dish)}
                      disabled={!dish.is_available}
                      className="w-full h-11 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs rounded-xl gap-2 shadow-sm transition"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{t('menu.add_to_order', {}, 'Customize & Add to Cart')}</span>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* 5. GUEST FAQ & RESTAURANT INFORMATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="p-8 rounded-3xl bg-stone-900/60 border border-stone-800 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-stone-100 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              Visit & Dine With Us
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              {settings.address}
            </p>
            <p className="text-xs text-stone-400">
              Tel: <a href={`tel:${settings.phone}`} className="text-amber-400 hover:underline">{settings.phone}</a>
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-sm text-stone-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              Kitchen Hours
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              {settings.hours}
            </p>
            <p className="text-[11px] text-stone-400">
              Dine-in seating & takeaway pickup available all day.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-sm text-stone-100 flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-400" />
              Cash-Only Transparency
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              {t('app.cash_notice', {}, 'We operate exclusively on cash to avoid credit processor fees and keep our artisanal ingredients premium yet affordable.')}
            </p>
          </div>

        </div>
      </section>

      {/* Sub-Dialogs & Cart */}
      <DishCustomizerDialog />
      <CartDrawer />
      <CheckoutDialog />

    </div>
  );
};
