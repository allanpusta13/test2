import React from 'react';
import { useRestaurant } from '../../Context/RestaurantContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { LoginForm } from './LoginForm';
import { ShieldCheck, Utensils } from 'lucide-react';
import { Badge } from '../ui/badge';

export const LoginDialog: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, settings, authRedirectContext } = useRestaurant();

  return (
    <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
      <DialogContent className="sm:max-w-md bg-stone-950 border-stone-800 text-stone-100 p-6 rounded-3xl shadow-2xl">
        <DialogHeader className="text-center sm:text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mx-auto flex items-center justify-center mb-1">
            <ShieldCheck className="w-6 h-6" />
          </div>
          
          <div className="flex items-center justify-center gap-2">
            <DialogTitle className="text-lg font-black text-stone-100">
              Staff Portal Authentication
            </DialogTitle>
            <Badge variant="outline" className="text-[10px] border-amber-500/30 text-amber-400 font-mono">
              Laravel Auth
            </Badge>
          </div>

          <DialogDescription className="text-xs text-stone-400">
            {authRedirectContext?.reason ? (
              <span className="text-amber-300 font-medium">{authRedirectContext.reason}</span>
            ) : (
              `Access authorized staff workspaces for ${settings.name}. Admin, Cashier, and Kitchen Staff roles enforced.`
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <LoginForm onSuccess={() => setIsAuthModalOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
