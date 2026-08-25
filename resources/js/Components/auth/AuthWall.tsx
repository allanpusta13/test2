import React from 'react';
import { useRestaurant } from '../../Context/RestaurantContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { LoginForm } from './LoginForm';
import { ShieldAlert, Store, Utensils, Lock } from 'lucide-react';
import { Badge } from '../ui/badge';

interface AuthWallProps {
  requiredRole?: string;
  moduleName?: string;
}

export const AuthWall: React.FC<AuthWallProps> = ({ moduleName = 'Store Operations' }) => {
  const { settings, setActiveSurface } = useRestaurant();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 sm:p-6">
      <Card className="w-full max-w-lg bg-stone-900/90 border-stone-800 text-stone-100 shadow-2xl rounded-3xl backdrop-blur-md overflow-hidden">
        <CardHeader className="text-center pb-2 pt-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center mb-2 shadow-lg shadow-amber-500/10">
            <Lock className="w-7 h-7" />
          </div>
          
          <div className="flex items-center justify-center gap-2">
            <CardTitle className="text-xl font-black text-stone-100">
              Staff Login Required
            </CardTitle>
            <Badge variant="outline" className="text-[10px] border-amber-500/40 text-amber-400 font-mono">
              Laravel Auth
            </Badge>
          </div>

          <CardDescription className="text-xs text-stone-400 max-w-sm mx-auto mt-1">
            Access to <strong>{moduleName}</strong> at <em>{settings.name}</em> requires authentication. Please sign in with your staff account (Admin, Cashier, or Kitchen Staff).
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-2 px-6 pb-6 space-y-4">
          <LoginForm />

          <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs">
            <span className="text-stone-400 text-[11px]">Visiting as a customer?</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveSurface('public_menu')}
              className="text-xs rounded-xl border-stone-800 hover:border-amber-500/40 text-stone-300 hover:text-amber-400 gap-1.5"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Return to Digital Menu</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthWall;
