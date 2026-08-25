import React from 'react';
import { RestaurantProvider, useRestaurant } from './Context/RestaurantContext';
import { Navbar } from './Components/Navbar';
import { PublicMenu } from './Components/public/PublicMenu';
import { PublicOrderTracker } from './Components/public/PublicOrderTracker';
import { AdminLayout } from './Components/admin/AdminLayout';
import { CartDrawer } from './Components/public/CartDrawer';
import { DishCustomizerDialog } from './Components/public/DishCustomizerDialog';
import { CheckoutDialog } from './Components/public/CheckoutDialog';
import { EscPosReceiptModal } from './Components/shared/EscPosReceiptModal';
import { OrderDetailsDialog } from './Components/shared/OrderDetailsDialog';
import { LaravelIntegrationDialog } from './Components/admin/LaravelIntegrationDialog';

const AppContent: React.FC = () => {
  const { activeSurface } = useRestaurant();

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-500 selection:text-stone-950 antialiased flex flex-col">
      {/* Top Navigation & Role Bar for Customer Views */}
      {activeSurface !== 'admin' && <Navbar />}

      {/* Main Surface Routing */}
      <main className="flex-1 flex flex-col min-h-0">
        {activeSurface === 'public_menu' && <PublicMenu />}
        {activeSurface === 'public_tracker' && <PublicOrderTracker />}
        {activeSurface === 'admin' && <AdminLayout />}
      </main>

      {/* Global Interactive Drawers & Dialogs */}
      <CartDrawer />
      <DishCustomizerDialog />
      <CheckoutDialog />
      <EscPosReceiptModal />
      <OrderDetailsDialog />
      <LaravelIntegrationDialog />
    </div>
  );
};

export function App() {
  return (
    <RestaurantProvider>
      <AppContent />
    </RestaurantProvider>
  );
}

export default App;
