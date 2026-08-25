import React, { useEffect } from 'react';
import AppLayout from '../Layouts/AppLayout';
import { useRestaurant } from '../Context/RestaurantContext';
import { PublicMenu } from '../Components/public/PublicMenu';
import { PublicOrderTracker } from '../Components/public/PublicOrderTracker';
import { AdminLayout } from '../Components/admin/AdminLayout';
import { PageProps } from '../types';

export default function Index(props: PageProps) {
  const { 
    activeSurface,
    setCategories,
    setMenuItems,
    setOrders,
    setInventoryItems,
    setUsers,
    setSettings,
    setCurrentUser,
  } = useRestaurant();

  // Hydrate initial props from Laravel Inertia if provided
  useEffect(() => {
    if (props.categories && props.categories.length > 0) {
      setCategories(props.categories);
    }
    if (props.menuItems && props.menuItems.length > 0) {
      setMenuItems(props.menuItems);
    }
    if (props.orders && props.orders.length > 0) {
      setOrders(props.orders);
    }
    if (props.inventory && props.inventory.length > 0) {
      setInventoryItems(props.inventory);
    }
    if (props.users && props.users.length > 0) {
      setUsers(props.users);
    }
    if (props.settings) {
      setSettings(props.settings);
    }
    if (props.auth?.user) {
      setCurrentUser(props.auth.user);
    }
  }, [props]);

  return (
    <AppLayout title="Artisan POS, Kitchen KDS & Storefront">
      {activeSurface === 'public_menu' && <PublicMenu />}
      {activeSurface === 'public_tracker' && <PublicOrderTracker />}
      {activeSurface === 'admin' && <AdminLayout />}
    </AppLayout>
  );
}
