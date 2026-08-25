import React, { useEffect } from 'react';
import AppLayout from '../Layouts/AppLayout';
import { useRestaurant } from '../Context/RestaurantContext';
import { AdminOrders } from '../Components/admin/AdminOrders';
import { PageProps } from '../types';

export default function Orders(props: PageProps) {
  const { setActiveSurface, setActiveAdminTab, setOrders } = useRestaurant();

  useEffect(() => {
    setActiveSurface('admin');
    setActiveAdminTab('orders');
    if (props.orders) setOrders(props.orders);
  }, [props]);

  return (
    <AppLayout title="Orders & Register Directory - Artisan POS">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <AdminOrders />
      </div>
    </AppLayout>
  );
}
