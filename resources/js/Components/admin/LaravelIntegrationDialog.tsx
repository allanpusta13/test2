import React, { useState } from 'react';
import { useRestaurant } from '../../Context/RestaurantContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import {
  Server,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Code2,
  Layers,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  Globe,
  Radio,
  FileCode2,
  Terminal,
  Database
} from 'lucide-react';

export const LaravelIntegrationDialog: React.FC = () => {
  const {
    currentUser,
    backendStatus,
    apiBaseUrl,
    isSyncing,
    lastSyncTime,
    isLaravelModalOpen,
    setIsLaravelModalOpen,
    syncFromBackend,
    testBackendConnection,
    requestStaffAccess,
  } = useRestaurant();

  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; latencyMs: number; error?: string } | null>(null);
  const [syncFeedback, setSyncFeedback] = useState<{ success: boolean; message: string; counts?: any } | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // If user is not authenticated or not an admin, restrict access
  if (isLaravelModalOpen && (!currentUser || currentUser.role !== 'admin')) {
    return (
      <Dialog open={isLaravelModalOpen} onOpenChange={setIsLaravelModalOpen}>
        <DialogContent className="max-w-md bg-stone-900 border-stone-800 text-stone-100 p-6 rounded-3xl space-y-4">
          <DialogHeader className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mx-auto flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <DialogTitle className="text-lg font-black text-stone-100">
              Administrator Access Required
            </DialogTitle>
            <DialogDescription className="text-xs text-stone-400">
              The Laravel Backend Integration and Database Synchronization tools are restricted to Administrators only.
            </DialogDescription>
          </DialogHeader>

          <div className="pt-2 flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsLaravelModalOpen(false)}
              className="flex-1 border-stone-800 text-stone-300 hover:bg-stone-800"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setIsLaravelModalOpen(false);
                requestStaffAccess('admin', 'menu', 'Please sign in with administrator credentials to access Laravel Integration.');
              }}
              className="flex-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold"
            >
              Sign In as Admin
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleTestPing = async () => {
    setIsTesting(true);
    setTestResult(null);
    const res = await testBackendConnection();
    setTestResult(res);
    setIsTesting(false);
  };

  const handleSyncData = async () => {
    setSyncFeedback(null);
    const res = await syncFromBackend();
    setSyncFeedback(res);
  };

  const routesPhpCode = `<?php

use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Route;
use App\\Http\\Controllers\\CategoryController;
use App\\Http\\Controllers\\MenuItemController;
use App\\Http\\Controllers\\OrderController;
use App\\Http\\Controllers\\PaymentController;
use App\\Http\\Controllers\\InventoryController;
use App\\Http\\Controllers\\UserController;
use App\\Http\\Controllers\\SettingController;
use App\\Http\\Controllers\\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes for React POS & Storefront Frontend
| Base URL: http://localhost:8000/api
|--------------------------------------------------------------------------
*/

// Health Check Endpoint (Used by frontend to measure latency)
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'server' => 'Laravel ' . app()->version(),
        'timestamp' => now()->toIso8601String()
    ]);
});

// Authentication (Laravel Sanctum / Bearer Token)
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');

// Public or Authenticated Catalog
Route::apiResource('categories', CategoryController::class);
Route::apiResource('menu-items', MenuItemController::class);
Route::patch('menu-items/{menuItem}/toggle-availability', [MenuItemController::class, 'toggleAvailability']);

// Orders & Counter Cash Payments
Route::apiResource('orders', OrderController::class);
Route::patch('orders/{order}/status', [OrderController::class, 'updateStatus']);
Route::post('orders/{order}/payments', [PaymentController::class, 'store']);

// Raw Inventory & Transaction Ledger
Route::get('inventory/items', [InventoryController::class, 'indexItems']);
Route::post('inventory/items', [InventoryController::class, 'storeItem']);
Route::put('inventory/items/{id}', [InventoryController::class, 'updateItem']);
Route::get('inventory/transactions', [InventoryController::class, 'indexTransactions']);
Route::post('inventory/transactions', [InventoryController::class, 'storeTransaction']);

// Staff Directory & RBAC Users
Route::apiResource('users', UserController::class);

// Restaurant Global Settings
Route::get('settings', [SettingController::class, 'show']);
Route::put('settings', [SettingController::class, 'update']);
`;

  const corsPhpCode = `<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    | File: config/cors.php
    |--------------------------------------------------------------------------
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:5173',
        env('FRONTEND_URL', '*'),
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true, // Set to true for Sanctum cookie sessions
];
`;

  const envGuideCode = `# Frontend Environment Variable (.env.local or .env in project root)
# If your Laravel is on port 8000:
VITE_LARAVEL_URL=http://localhost:8000
VITE_API_BASE_URL=http://localhost:8000/api
`;

  return (
    <Dialog open={isLaravelModalOpen} onOpenChange={setIsLaravelModalOpen}>
      <DialogContent className="max-w-3xl bg-stone-900 border-stone-800 text-stone-100 p-6 rounded-3xl max-h-[90vh] overflow-y-auto space-y-5">
        
        {/* Header */}
        <DialogHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle className="text-lg font-black text-stone-100 flex items-center gap-2">
                  <span>Laravel Backend Integration</span>
                  <Badge 
                    variant="outline" 
                    className={`text-[10px] font-mono capitalize ${
                      backendStatus === 'connected' 
                        ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' 
                        : backendStatus === 'checking'
                        ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                        : 'border-stone-700 bg-stone-800 text-stone-400'
                    }`}
                  >
                    {backendStatus === 'connected' ? '🟢 Live Connected' : backendStatus === 'checking' ? '🟡 Checking...' : '⚪ Local Demo Mode'}
                  </Badge>
                </DialogTitle>
                <DialogDescription className="text-xs text-stone-400">
                  Connect your existing Laravel controllers, migrations, and routes directly to this React interface.
                </DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Live Connection Diagnostics & Controls */}
        <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800/90 space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-300">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>Configured API Endpoint:</span>
              </div>
              <p className="text-xs font-mono font-bold text-amber-400 bg-stone-900 px-2.5 py-1 rounded-lg border border-stone-800 inline-block">
                {apiBaseUrl}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleTestPing}
                disabled={isTesting}
                className="h-8 text-xs border-stone-700 hover:bg-stone-800 text-stone-200 gap-1.5 rounded-xl font-medium"
              >
                <Radio className={`w-3.5 h-3.5 text-amber-400 ${isTesting ? 'animate-pulse' : ''}`} />
                <span>{isTesting ? 'Testing Ping...' : 'Test Connection'}</span>
              </Button>

              <Button
                size="sm"
                onClick={handleSyncData}
                disabled={isSyncing}
                className="h-8 text-xs bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold gap-1.5 rounded-xl shadow-md shadow-amber-500/20"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Syncing...' : 'Sync Live Data'}</span>
              </Button>
            </div>
          </div>

          {/* Test result banner */}
          {testResult && (
            <div className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 ${
              testResult.ok 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                : 'bg-red-500/10 border-red-500/30 text-red-300'
            }`}>
              <div className="flex items-center gap-2">
                {testResult.ok ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
                <span>
                  {testResult.ok ? 'Laravel backend responded successfully!' : `Connection failed: ${testResult.error || 'Server unreachable'}`}
                </span>
              </div>
              <span className="font-mono font-bold text-[10px] bg-stone-950 px-2 py-0.5 rounded border border-current">
                {testResult.latencyMs} ms
              </span>
            </div>
          )}

          {/* Sync feedback banner */}
          {syncFeedback && (
            <div className={`p-2.5 rounded-xl border text-xs space-y-1 ${
              syncFeedback.success 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            }`}>
              <div className="flex items-center gap-2">
                {syncFeedback.success ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />}
                <span className="font-medium">{syncFeedback.message}</span>
              </div>
              {syncFeedback.counts && (
                <div className="flex flex-wrap gap-2 text-[10px] font-mono pt-1 text-stone-300">
                  {Object.entries(syncFeedback.counts).map(([k, v]) => (
                    <Badge key={k} variant="outline" className="border-stone-700 bg-stone-900">
                      {k}: {String(v)}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}

          {lastSyncTime && !syncFeedback && (
            <p className="text-[11px] text-stone-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Last synchronized from Laravel at <strong className="text-stone-200">{lastSyncTime}</strong></span>
            </p>
          )}
        </div>

        {/* Integration Documentation Tabs */}
        <Tabs defaultValue="routes" className="w-full space-y-3">
          <TabsList className="bg-stone-950 border border-stone-800 p-1 rounded-xl h-auto grid grid-cols-3 gap-1">
            <TabsTrigger value="routes" className="text-xs data-[state=active]:bg-amber-500 data-[state=active]:text-stone-950 font-bold rounded-lg py-1.5">
              <FileCode2 className="w-3.5 h-3.5 mr-1.5" />
              routes/api.php
            </TabsTrigger>
            <TabsTrigger value="cors" className="text-xs data-[state=active]:bg-amber-500 data-[state=active]:text-stone-950 font-bold rounded-lg py-1.5">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
              CORS & Sanctum
            </TabsTrigger>
            <TabsTrigger value="models" className="text-xs data-[state=active]:bg-amber-500 data-[state=active]:text-stone-950 font-bold rounded-lg py-1.5">
              <Database className="w-3.5 h-3.5 mr-1.5" />
              REST JSON Schema
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: routes/api.php */}
          <TabsContent value="routes" className="space-y-2 mt-0">
            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-400">Add these routes to your Laravel <code className="text-amber-400 font-mono">routes/api.php</code>:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(routesPhpCode, 'routes')}
                className="h-7 text-xs border-stone-700 hover:bg-stone-800 text-stone-300 gap-1 rounded-lg"
              >
                {copiedKey === 'routes' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'routes' ? 'Copied' : 'Copy PHP'}</span>
              </Button>
            </div>
            <pre className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 text-[11px] font-mono text-stone-300 overflow-x-auto max-h-72 leading-relaxed selection:bg-amber-500 selection:text-stone-950">
              {routesPhpCode}
            </pre>
          </TabsContent>

          {/* Tab 2: CORS & Sanctum */}
          <TabsContent value="cors" className="space-y-2 mt-0">
            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-400">Ensure CORS credentials are enabled in <code className="text-amber-400 font-mono">config/cors.php</code>:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(corsPhpCode, 'cors')}
                className="h-7 text-xs border-stone-700 hover:bg-stone-800 text-stone-300 gap-1 rounded-lg"
              >
                {copiedKey === 'cors' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'cors' ? 'Copied' : 'Copy config'}</span>
              </Button>
            </div>
            <pre className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 text-[11px] font-mono text-stone-300 overflow-x-auto max-h-72 leading-relaxed">
              {corsPhpCode}
            </pre>
          </TabsContent>

          {/* Tab 3: Models & Payloads */}
          <TabsContent value="models" className="space-y-3 mt-0">
            <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 space-y-2.5 text-xs text-stone-300">
              <p className="font-bold text-stone-100 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-amber-400" />
                <span>Expected Response Formats:</span>
              </p>
              <p className="text-stone-400 text-[11px]">
                The API client automatically unwraps both standard raw arrays <code className="text-stone-200">[ ... ]</code> and standard Laravel Resource wrappers <code className="text-stone-200">&#123; "data": [ ... ] &#125;</code>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono pt-1">
                <div className="p-2 rounded-lg bg-stone-900 border border-stone-800 space-y-1">
                  <span className="font-bold text-amber-400">Order Model</span>
                  <p className="text-stone-400 text-[10px]">
                    id, order_number, status, type, customer_name, total, items, payments, tracking_token
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-stone-900 border border-stone-800 space-y-1">
                  <span className="font-bold text-amber-400">MenuItem Model</span>
                  <p className="text-stone-400 text-[10px]">
                    id, category_id, name, price, description, is_available, modifier_groups, recipe
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-stone-900 border border-stone-800 space-y-1">
                  <span className="font-bold text-amber-400">Payment Model</span>
                  <p className="text-stone-400 text-[10px]">
                    id, order_id, amount, tendered, change_returned, method: 'cash', cashier_name
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-stone-900 border border-stone-800 space-y-1">
                  <span className="font-bold text-amber-400">Inventory Ledger</span>
                  <p className="text-stone-400 text-[10px]">
                    items (id, name, unit, threshold) & transactions (quantity, type, reference)
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="flex justify-between items-center pt-2 border-t border-stone-800">
          <span className="text-[11px] text-stone-500 font-mono">
            API Client: Axios with Sanctum Cookie & Bearer Token Interceptors
          </span>
          <Button
            onClick={() => setIsLaravelModalOpen(false)}
            className="h-8 text-xs bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold rounded-xl"
          >
            Close Guide
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default LaravelIntegrationDialog;
