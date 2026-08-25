import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';
import { PageProps as AppPageProps, User } from './index';

declare global {
  interface Window {
    axios: AxiosInstance;
  }

  // Ziggy route helper support
  let route: typeof ziggyRoute;
}

declare module '@inertiajs/core' {
  interface PageProps extends AppPageProps {
    auth: {
      user: User | null;
    };
  }
}
