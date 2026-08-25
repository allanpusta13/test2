import React, { useEffect } from 'react';
import AppLayout from '../Layouts/AppLayout';
import { useRestaurant } from '../Context/RestaurantContext';
import { AdminMenu } from '../Components/admin/AdminMenu';
import { PageProps } from '../types';

export default function Menu(props: PageProps) {
  const { setActiveSurface, setActiveAdminTab, setMenuItems, setCategories } = useRestaurant();

  useEffect(() => {
    setActiveSurface('admin');
    setActiveAdminTab('menu');
    if (props.menuItems) setMenuItems(props.menuItems);
    if (props.categories) setCategories(props.categories);
  }, [props]);

  return (
    <AppLayout title="Menu & Recipe Catalog - Artisan POS">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <AdminMenu />
      </div>
    </AppLayout>
  );
}
