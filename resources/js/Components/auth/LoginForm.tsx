import React, { useState } from 'react';
import { useRestaurant } from '../../Context/RestaurantContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  Lock, 
  Mail, 
  Key, 
  ShieldCheck, 
  ChefHat, 
  Calculator, 
  Sparkles, 
  ArrowRight, 
  AlertCircle, 
  Loader2, 
  CheckCircle2,
  Eye,
  EyeOff
} from 'lucide-react';
import { RoleType } from '../../types';

interface LoginFormProps {
  onSuccess?: () => void;
  redirectTab?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login, quickLogin, users, t } = useRestaurant();
  
  const [email, setEmail] = useState('elena@artisanbistro.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'credentials' | 'quick'>('quick');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const result = await login(email, password, remember);
      if (result.success) {
        setSuccessMessage(`Authenticated as ${result.user.name} (${result.user.role})`);
        setTimeout(() => {
          if (onSuccess) onSuccess();
        }, 400);
      } else {
        setErrorMessage(result.message || 'Invalid email or password');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication request failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickRoleSelect = async (role: RoleType, userEmail?: string) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const result = await quickLogin(role, userEmail);
      if (result.success) {
        setSuccessMessage(`Signed in as ${result.user.name}`);
        setTimeout(() => {
          if (onSuccess) onSuccess();
        }, 300);
      } else {
        setErrorMessage(result.message || 'Quick login failed');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error executing quick login');
    } finally {
      setIsLoading(false);
    }
  };

  const demoRoles = [
    {
      role: 'admin' as RoleType,
      name: 'Elena Rostova',
      email: 'elena@artisanbistro.com',
      title: 'Store Administrator',
      description: 'Full management access: Menu, Recipes, Inventory, Staff & Settings',
      icon: ShieldCheck,
      badge: 'All Permissions',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    },
    {
      role: 'cashier' as RoleType,
      name: 'Sophia Rossi',
      email: 'sophia@artisanbistro.com',
      title: 'Front Desk Cashier',
      description: 'POS Register Terminal, cash/card payment collection & receipt printing',
      icon: Calculator,
      badge: 'POS & Payments',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    },
    {
      role: 'kitchen_staff' as RoleType,
      name: 'Luigi Vanni',
      email: 'luigi@artisanbistro.com',
      title: 'Line Cook / Kitchen Staff',
      description: 'Kitchen Display System (KDS) live queues, bumping & prep recipes',
      icon: ChefHat,
      badge: 'KDS & Prep',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {errorMessage && (
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1 leading-relaxed">
            <span className="font-semibold block text-red-300">Authentication Error</span>
            {errorMessage}
          </div>
        </div>
      )}

      {successMessage && (
        <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-200 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{successMessage}</span>
        </div>
      )}

      <Tabs 
        defaultValue="quick" 
        value={activeTab} 
        onValueChange={(val) => setActiveTab(val as 'credentials' | 'quick')}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 bg-stone-900 border border-stone-800 p-1 rounded-xl">
          <TabsTrigger 
            value="quick" 
            className="text-xs font-semibold data-[state=active]:bg-amber-500 data-[state=active]:text-stone-950 rounded-lg transition"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Quick Role Login
          </TabsTrigger>
          <TabsTrigger 
            value="credentials" 
            className="text-xs font-semibold data-[state=active]:bg-amber-500 data-[state=active]:text-stone-950 rounded-lg transition"
          >
            <Key className="w-3.5 h-3.5 mr-1.5" />
            Email & Password
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Quick Role Selection (Instant Staff Sign-In) */}
        <TabsContent value="quick" className="mt-3 space-y-2.5">
          <p className="text-[11px] text-stone-400 text-center px-2">
            Select a staff role to authenticate with Laravel Session & RBAC permissions:
          </p>

          <div className="space-y-2">
            {demoRoles.map((item) => {
              const matchedUser = users.find(u => u.role === item.role);
              const avatarSrc = matchedUser?.avatar || item.avatar;
              const displayName = matchedUser?.name || item.name;
              const displayEmail = matchedUser?.email || item.email;

              return (
                <button
                  key={item.role}
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleQuickRoleSelect(item.role, displayEmail)}
                  className="w-full text-left p-3 rounded-2xl bg-stone-900/90 hover:bg-stone-800/90 border border-stone-800 hover:border-amber-500/50 transition-all duration-150 group cursor-pointer flex items-center justify-between gap-3 relative overflow-hidden shadow-sm"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative">
                      <Avatar className="w-10 h-10 border border-stone-700">
                        <AvatarImage src={avatarSrc} alt={displayName} />
                        <AvatarFallback className="bg-stone-800 text-stone-200 font-bold text-xs">
                          {displayName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-stone-950 border border-stone-800 text-amber-400">
                        <item.icon className="w-3 h-3" />
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-stone-100 group-hover:text-amber-400 transition-colors truncate">
                          {displayName}
                        </span>
                        <Badge variant="outline" className={`text-[9px] py-0 px-1.5 ${item.badgeColor}`}>
                          {item.badge}
                        </Badge>
                      </div>
                      <p className="text-[10px] text-stone-400 truncate mt-0.5 font-mono">
                        {displayEmail}
                      </p>
                      <p className="text-[10px] text-stone-400 truncate mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 pl-2">
                    <div className="w-8 h-8 rounded-xl bg-stone-800 group-hover:bg-amber-500 group-hover:text-stone-950 text-stone-300 flex items-center justify-center transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </TabsContent>

        {/* Tab 2: Standard Laravel Credentials Form */}
        <TabsContent value="credentials" className="mt-3">
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="space-y-1.5">
              <Label htmlFor="auth-email" className="text-xs font-medium text-stone-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                Staff Email Address
              </Label>
              <Input
                id="auth-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff@artisanbistro.com"
                required
                className="bg-stone-900 border-stone-800 text-stone-100 text-xs h-9 rounded-xl focus-visible:ring-amber-500/50"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="auth-password" className="text-xs font-medium text-stone-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-stone-400" />
                  Password
                </Label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] text-stone-400 hover:text-stone-200 flex items-center gap-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span>{showPassword ? 'Hide' : 'Show'}</span>
                </button>
              </div>
              <Input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-stone-900 border-stone-800 text-stone-100 text-xs h-9 rounded-xl focus-visible:ring-amber-500/50"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-stone-700 bg-stone-900 text-amber-500 focus:ring-amber-500/40 text-xs"
                />
                <span className="text-[11px] text-stone-400">Remember session</span>
              </label>

              <span className="text-[10px] text-stone-400 font-mono">
                Default: password123
              </span>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs h-9 rounded-xl shadow-md shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Authenticate & Enter Workspace</span>
                </>
              )}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginForm;
