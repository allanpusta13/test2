import React, { useState } from 'react';
import { useRestaurant } from '../../Context/RestaurantContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { 
  Lock, 
  Mail, 
  AlertCircle, 
  Loader2, 
  CheckCircle2,
  Eye,
  EyeOff
} from 'lucide-react';

interface LoginFormProps {
  onSuccess?: () => void;
  redirectTab?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login } = useRestaurant();
  
  const [email, setEmail] = useState('elena@artisanbistro.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
    </div>
  );
};

export default LoginForm;

