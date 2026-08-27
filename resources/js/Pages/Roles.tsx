import React, { useEffect } from 'react';
import AppLayout from '../Layouts/AppLayout';
import { useRestaurant } from '../Context/RestaurantContext';
import { AdminRoles } from '../Components/admin/AdminRoles';
import { PageProps } from '../types';

export default function Roles(props: PageProps) {
  const { setActiveSurface, setActiveAdminTab } = useRestaurant();

  useEffect(() => {
    setActiveSurface('admin');
    setActiveAdminTab('roles');
  }, []);

  return (
    <AppLayout title="RBAC Permissions - Artisan POS">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <AdminRoles />
      </div>
    </AppLayout>
  );
}
