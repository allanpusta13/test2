import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import CartDrawer from '../Components/public/CartDrawer';
import CheckoutDialog from '../Components/public/CheckoutDialog';
import DishCustomizerDialog from '../Components/public/DishCustomizerDialog';
import EscPosReceiptModal from '../Components/shared/EscPosReceiptModal';
import OrderDetailsDialog from '../Components/shared/OrderDetailsDialog';
import LaravelIntegrationDialog from '../Components/admin/LaravelIntegrationDialog';
import LoginDialog from '../Components/auth/LoginDialog';
import { useRestaurant } from '../Context/RestaurantContext';

interface AppLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export default function AppLayout({ title = 'Artisan POS & Kitchen', children }: AppLayoutProps) {
  const {
    isCartOpen,
    setIsCartOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    selectedDishForCustomizer,
    setSelectedDishForCustomizer,
    receiptModalOrder,
    setReceiptModalOrder,
    viewingOrder,
    setViewingOrder,
    isLaravelModalOpen,
    setIsLaravelModalOpen,
  } = useRestaurant();

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      <Head title={title} />
      
      {/* Top Header / Navigation Bar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Global Interactive Drawers & Overlays */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <CheckoutDialog isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
      <DishCustomizerDialog dish={selectedDishForCustomizer} onClose={() => setSelectedDishForCustomizer(null)} />
      <EscPosReceiptModal order={receiptModalOrder} onClose={() => setReceiptModalOrder(null)} />
      <OrderDetailsDialog order={viewingOrder} onClose={() => setViewingOrder(null)} />
      <LaravelIntegrationDialog isOpen={isLaravelModalOpen} onClose={() => setIsLaravelModalOpen(false)} />
      <LoginDialog />
    </div>
  );
}
