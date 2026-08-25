import React, { useEffect } from 'react';
import AppLayout from '../Layouts/AppLayout';
import { useRestaurant } from '../Context/RestaurantContext';
import { AdminInventory } from '../Components/admin/AdminInventory';
import { PageProps } from '../types';

export default function Inventory(props: PageProps) {
  const { setActiveSurface, setActiveAdminTab, setInventoryItems } = useRestaurant();

  useEffect(() => {
    setActiveSurface('admin');
    setActiveAdminTab('inventory');
    if (props.inventory) setInventoryItems(props.inventory);
  }, [props]);

  return (
    <AppLayout title="Derived Stock & Inventory Ledger - Artisan POS">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <AdminInventory />
      </div>
    </AppLayout>
  );
}
