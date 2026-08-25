import './bootstrap';
import '../css/app.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { RestaurantProvider } from './Context/RestaurantContext';

const appName = import.meta.env.VITE_APP_NAME || 'Artisan POS & Kitchen';

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  resolve: async (name) => {
    const pages = import.meta.glob('./Pages/**/*.tsx');
    const pageResolver = pages[`./Pages/${name}.tsx`];
    if (!pageResolver) {
      // Fallback for default or case variation
      const fallback = pages['./Pages/Index.tsx'] || pages['./Pages/App.tsx'];
      if (fallback) {
        return (await fallback()) as any;
      }
      throw new Error(`Inertia page "${name}" not found in resources/js/Pages/`);
    }
    return (await pageResolver()) as any;
  },
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(
      <RestaurantProvider>
        <App {...props} />
      </RestaurantProvider>
    );
  },
  progress: {
    color: '#f59e0b',
    showSpinner: true,
  },
});
