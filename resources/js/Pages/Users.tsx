import React, { useEffect } from 'react';
import AppLayout from '../Layouts/AppLayout';
import { useRestaurant } from '../Context/RestaurantContext';
import { AdminUsers } from '../Components/admin/AdminUsers';
import { PageProps } from '../types';

export default function Users(props: PageProps) {
  const { setActiveSurface, setActiveAdminTab, setUsers } = useRestaurant();

  useEffect(() => {
    setActiveSurface('admin');
    setActiveAdminTab('users');
    if (props.users) setUsers(props.users);
  }, [props]);

  return (
    <AppLayout title="Staff Directory & RBAC Governance - Artisan POS">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <AdminUsers />
      </div>
    </AppLayout>
  );
}
