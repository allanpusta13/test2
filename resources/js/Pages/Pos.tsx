import React, { useEffect } from 'react';
import AppLayout from '../Layouts/AppLayout';
import { useRestaurant } from '../Context/RestaurantContext';
import { AdminPos } from '../Components/admin/AdminPos';
import { PageProps } from '../types';

export default function Pos(props: PageProps) {
  const { setActiveSurface, setActiveAdminTab, setMenuItems, setCategories } = useRestaurant();

  useEffect(() => {
    setActiveSurface('admin');
    setActiveAdminTab('pos');
    if (props.menuItems) setMenuItems(props.menuItems);
    if (props.categories) setCategories(props.categories);
  }, [props]);

  return (
    <AppLayout title="POS Fast Cash Terminal - Artisan POS">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <AdminPos />
      </div>
    </AppLayout>
  );
}
