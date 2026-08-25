import React, { useEffect } from 'react';
import AppLayout from '../Layouts/AppLayout';
import { useRestaurant } from '../Context/RestaurantContext';
import { AdminKitchen } from '../Components/admin/AdminKitchen';
import { PageProps } from '../types';

export default function Kitchen(props: PageProps) {
  const { setActiveSurface, setActiveAdminTab, setOrders } = useRestaurant();

  useEffect(() => {
    setActiveSurface('admin');
    setActiveAdminTab('kitchen');
    if (props.orders) setOrders(props.orders);
  }, [props]);

  return (
    <AppLayout title="Kitchen Display System (KDS) - Artisan POS">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <AdminKitchen />
      </div>
    </AppLayout>
  );
}
