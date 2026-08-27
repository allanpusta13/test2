import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { TooltipProvider } from '@/Components/ui/tooltip';
import { RestaurantProvider } from '@/Context/RestaurantContext';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx')
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <RestaurantProvider initialPageProps={props.initialPage?.props}>
                <TooltipProvider>
                    <App {...props} />
                </TooltipProvider>
            </RestaurantProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// Register service worker for PWA support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed: ', error);
            });
    });
}