import React, { useEffect, useCallback } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import { useRestaurant } from '../Context/RestaurantContext';
import { LoginForm } from '../Components/auth/LoginForm';
import { Utensils } from 'lucide-react';

export default function Login() {
  const { currentUser, settings } = useRestaurant();

  const getRedirectPath = (role?: string) => {
    if (role === 'kitchen_staff') return '/kitchen';
    return '/pos';
  };

  useEffect(() => {
    if (currentUser) {
      router.visit(getRedirectPath(currentUser.role));
    }
  }, [currentUser]);

  const handleLoginSuccess = useCallback((user?: { role?: string }) => {
    router.visit(getRedirectPath(user?.role));
  }, []);

  return (
    <AppLayout title="Staff Sign In">
      <Head title="Staff Sign In" />
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          {/* Brand */}
          <div className="text-center space-y-3">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20">
              <Utensils className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-stone-100">
                {settings.name || 'Artisan Bistro'}
              </h1>
              <p className="text-sm text-stone-400 mt-1">
                Staff Portal — Sign in to access operations
              </p>
            </div>
          </div>

          {/* Login Form */}
          <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-6 shadow-xl">
            <LoginForm onSuccess={handleLoginSuccess} />
          </div>

          {/* Back to menu */}
          <div className="text-center">
            <button
              onClick={() => router.visit('/')}
              className="text-xs text-stone-500 hover:text-amber-400 transition-colors cursor-pointer"
            >
              ← Back to Digital Menu
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
