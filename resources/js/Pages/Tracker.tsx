import React, { useEffect } from 'react';
import AppLayout from '../Layouts/AppLayout';
import { useRestaurant } from '../Context/RestaurantContext';
import { PublicOrderTracker } from '../Components/public/PublicOrderTracker';
import { PageProps } from '../types';

export default function Tracker(props: PageProps) {
  const { setActiveSurface, setActiveTrackingToken } = useRestaurant();

  useEffect(() => {
    setActiveSurface('public_tracker');
    if (props.token && typeof props.token === 'string') {
      setActiveTrackingToken(props.token);
    }
  }, [props]);

  return (
    <AppLayout title="Live Customer Order Tracker - Artisan Bistro">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <PublicOrderTracker />
      </div>
    </AppLayout>
  );
}
