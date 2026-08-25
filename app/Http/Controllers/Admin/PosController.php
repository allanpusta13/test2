<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Order\StoreOrderRequest;
use App\Http\Requests\Payment\StorePaymentRequest;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Services\RestaurantDataService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PosController extends Controller
{
    protected function getEffectiveLocale(Request $request): string
    {
        $locale = $request->get('locale') ?? Session::get('locale') ?? config('app.locale', 'en');
        if (!in_array($locale, ['en', 'it'], true)) {
            $locale = 'en';
        }
        App::setLocale($locale);
        return $locale;
    }

    /**
     * Display POS Register Screen (Inertia page).
     */
    public function index(Request $request): Response
    {
        $locale = $this->getEffectiveLocale($request);
        $payload = RestaurantDataService::getSharedPayload($locale);
        $payload['currentSurface'] = 'admin';
        $payload['currentAdminTab'] = 'pos';

        return Inertia::render('Pos', $payload);
    }

    /**
     * API JSON listing of POS catalog, menu categories, and active register orders.
     */
    public function list(Request $request): JsonResponse
    {
        $locale = $this->getEffectiveLocale($request);
        $shared = RestaurantDataService::getSharedPayload($locale);

        return response()->json([
            'success' => true,
            'data' => [
                'categories' => $shared['categories'] ?? [],
                'menu_items' => $shared['menuItems'] ?? [],
                'recent_orders' => Order::with(['items', 'payments'])
                    ->orderByDesc('created_at')
                    ->limit(20)
                    ->get(),
            ],
        ]);
    }

    /**
     * Form metadata and checkout defaults for POS (CRUD create).
     */
    public function create(Request $request): JsonResponse
    {
        $settings = RestaurantDataService::getSettings();

        return response()->json([
            'success' => true,
            'data' => [
                'tax_rate' => $settings['tax_rate'] ?? 0.08875,
                'default_order_type' => Order::TYPE_DINE_IN,
                'tables' => range(1, 20),
                'quick_cash_denominations' => [5, 10, 20, 50, 100],
            ],
        ]);
    }

    /**
     * Store an order from POS register terminal (CRUD store).
     */
    public function store(StoreOrderRequest $request): JsonResponse
    {
        $validated = $request->validated();

        if (!empty($validated['idempotency_key'])) {
            $existing = Order::with(['items', 'payments'])
                ->where('idempotency_key', $validated['idempotency_key'])
                ->first();

            if ($existing) {
                return response()->json([
                    'success' => true,
                    'message' => 'Order retrieved via idempotency key',
                    'data' => $existing,
                ]);
            }
        }

        $order = DB::transaction(function () use ($validated): Order {
            $order = Order::create([
                'id' => $validated['id'] ?? ('ord-' . Str::uuid()->toString()),
                'order_number' => $validated['order_number'] ?? ('AB-' . random_int(1000, 9999)),
                'status' => Order::STATUS_PENDING,
                'type' => $validated['type'],
                'table_number' => $validated['table_number'] ?? null,
                'customer_name' => $validated['customer_name'] ?? 'Walk-In Guest',
                'customer_phone' => $validated['customer_phone'] ?? null,
                'notes' => $validated['notes'] ?? null,
                'idempotency_key' => $validated['idempotency_key'] ?? null,
                'tracking_token' => 'OT-' . strtoupper(Str::random(6)),
                'subtotal' => $validated['subtotal'],
                'tax_total' => $validated['tax_total'],
                'total' => $validated['total'],
            ]);

            foreach ($validated['items'] as $itemData) {
                OrderItem::create([
                    'id' => 'oi-' . Str::uuid()->toString(),
                    'order_id' => $order->id,
                    'menu_item_id' => $itemData['menu_item_id'] ?? null,
                    'name' => $itemData['name'],
                    'quantity' => (int) $itemData['quantity'],
                    'unit_price' => (float) $itemData['unit_price'],
                    'total_price' => (float) $itemData['total_price'],
                    'notes' => $itemData['notes'] ?? null,
                    'selected_modifiers' => $itemData['selected_modifiers'] ?? [],
                ]);
            }

            return $order;
        });

        return response()->json([
            'success' => true,
            'message' => 'POS Order created successfully',
            'data' => $order->load(['items', 'payments']),
        ], 201);
    }

    /**
     * Alias for store.
     */
    public function storeOrder(StoreOrderRequest $request): JsonResponse
    {
        return $this->store($request);
    }

    /**
     * Show single POS order (CRUD show).
     */
    public function show(string $id): JsonResponse
    {
        $order = Order::with(['items.menuItem', 'payments'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $order,
        ]);
    }

    /**
     * Edit order data in POS (CRUD edit).
     */
    public function edit(string $id): JsonResponse
    {
        $order = Order::with(['items.menuItem', 'payments'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $order,
        ]);
    }

    /**
     * Update order details (CRUD update).
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $order = Order::with(['items', 'payments'])->findOrFail($id);

        if ($request->filled('table_number')) {
            $order->table_number = $request->input('table_number');
        }
        if ($request->filled('notes')) {
            $order->notes = $request->input('notes');
        }
        if ($request->filled('customer_name')) {
            $order->customer_name = $request->input('customer_name');
        }
        $order->save();

        return response()->json([
            'success' => true,
            'message' => 'Order updated successfully',
            'data' => $order->fresh(['items', 'payments']),
        ]);
    }

    /**
     * Delete order (CRUD destroy / delete).
     */
    public function destroy(string $id): JsonResponse
    {
        $order = Order::findOrFail($id);
        $order->delete();

        return response()->json([
            'success' => true,
            'message' => 'POS order deleted',
        ]);
    }

    /**
     * Delete alias.
     */
    public function delete(string $id): JsonResponse
    {
        return $this->destroy($id);
    }

    /**
     * Record cash payment into register.
     */
    public function recordPayment(StorePaymentRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $payment = DB::transaction(function () use ($validated): Payment {
            $order = Order::findOrFail($validated['order_id']);

            $amount = (float) $validated['amount'];
            $tendered = (float) $validated['tendered'];
            $changeReturned = max(0.0, round($tendered - $amount, 2));

            $payment = Payment::create([
                'id' => $validated['id'] ?? ('pay-' . Str::uuid()->toString()),
                'order_id' => $order->id,
                'amount' => $amount,
                'tendered' => $tendered,
                'change_returned' => $changeReturned,
                'method' => 'cash',
                'cashier_id' => $validated['cashier_id'] ?? null,
                'cashier_name' => $validated['cashier_name'] ?? 'Cashier',
                'notes' => $validated['notes'] ?? "Paid {$tendered} cash. Change returned: {$changeReturned}",
            ]);

            return $payment;
        });

        $order = Order::with(['items', 'payments'])->find($validated['order_id']);

        return response()->json([
            'success' => true,
            'message' => 'Cash payment recorded successfully into register',
            'data' => [
                'payment' => $payment,
                'order' => $order,
                'change_returned' => $payment->change_returned,
                'payment_status' => $order->payment_status,
                'unpaid_balance' => $order->unpaid_balance,
            ],
        ], 201);
    }

    /**
     * Generate thermal ESC/POS receipt payload.
     */
    public function printReceipt(Request $request, string $orderId): JsonResponse
    {
        $order = Order::with(['items', 'payments'])->findOrFail($orderId);
        $settings = RestaurantDataService::getSettings();
        $paperWidth = (int) $request->query('width', 58); // 58 or 80 mm
        $charWidth = ($paperWidth >= 80) ? 48 : 32;

        $lines = [];
        $lines[] = $this->centerText($settings['name'] ?? 'THE ARTISAN BISTRO', $charWidth);
        $lines[] = $this->centerText($settings['address'] ?? '', $charWidth);
        $lines[] = $this->centerText('TEL: ' . ($settings['phone'] ?? ''), $charWidth);
        $lines[] = str_repeat('-', $charWidth);
        $lines[] = $this->twoColumn("ORDER: #{$order->order_number}", date('m/d/Y H:i', strtotime((string) $order->created_at)), $charWidth);
        $lines[] = $this->twoColumn("TYPE: " . strtoupper(str_replace('_', ' ', $order->type)), ($order->table_number ?? 'Counter'), $charWidth);
        $lines[] = $this->twoColumn("GUEST: " . $order->customer_name, "TRACK: " . $order->tracking_token, $charWidth);
        $lines[] = str_repeat('=', $charWidth);
        $lines[] = $this->twoColumn('ITEM', 'PRICE', $charWidth);
        $lines[] = str_repeat('-', $charWidth);

        foreach ($order->items as $item) {
            $nameStr = "{$item->quantity}x {$item->name}";
            $priceStr = sprintf('$%.2f', $item->total_price);
            $lines[] = $this->twoColumn($nameStr, $priceStr, $charWidth);

            if (!empty($item->selected_modifiers) && is_array($item->selected_modifiers)) {
                foreach ($item->selected_modifiers as $mod) {
                    $modName = '  + ' . ($mod['option_name'] ?? '');
                    $modPrice = (isset($mod['extra_price']) && (float) $mod['extra_price'] > 0)
                        ? sprintf('+$%.2f', (float) $mod['extra_price'])
                        : '';
                    $lines[] = $this->twoColumn($modName, $modPrice, $charWidth);
                }
            }
        }

        $lines[] = str_repeat('-', $charWidth);
        $lines[] = $this->twoColumn('SUBTOTAL:', sprintf('$%.2f', $order->subtotal), $charWidth);
        $lines[] = $this->twoColumn('TAX (8.875%):', sprintf('$%.2f', $order->tax_total), $charWidth);
        $lines[] = $this->twoColumn('TOTAL AMOUNT:', sprintf('$%.2f', $order->total), $charWidth);
        $lines[] = str_repeat('=', $charWidth);

        if ($order->payments->isNotEmpty()) {
            foreach ($order->payments as $payment) {
                $lines[] = $this->twoColumn('CASH TENDERED:', sprintf('$%.2f', $payment->tendered), $charWidth);
                $lines[] = $this->twoColumn('CHANGE RETURNED:', sprintf('$%.2f', $payment->change_returned), $charWidth);
                $lines[] = $this->twoColumn('PAID CASH:', sprintf('$%.2f', $payment->amount), $charWidth);
                if ($payment->cashier_name) {
                    $lines[] = "CASHIER: {$payment->cashier_name}";
                }
            }
        } else {
            $lines[] = $this->centerText('*** UNPAID / PAY AT COUNTER ***', $charWidth);
        }

        $lines[] = str_repeat('-', $charWidth);
        $lines[] = $this->centerText('GRAZIE MILLE!', $charWidth);
        $lines[] = $this->centerText('Thank you for dining with us!', $charWidth);
        $lines[] = $this->centerText('Track online with token: ' . $order->tracking_token, $charWidth);
        $lines[] = "\n\n";

        $rawText = implode("\n", $lines);
        $escPosHex = '1b40' . bin2hex($rawText) . '0a0a1d564200';

        return response()->json([
            'success' => true,
            'paper_width' => $paperWidth,
            'char_width' => $charWidth,
            'raw_text' => $rawText,
            'esc_pos_hex' => $escPosHex,
            'order' => $order,
        ]);
    }

    protected function centerText(string $text, int $width): string
    {
        $len = strlen($text);
        if ($len >= $width) {
            return substr($text, 0, $width);
        }
        $left = (int) floor(($width - $len) / 2);
        return str_repeat(' ', $left) . $text;
    }

    protected function twoColumn(string $left, string $right, int $width): string
    {
        $rightLen = strlen($right);
        $leftMax = $width - $rightLen - 1;
        if (strlen($left) > $leftMax) {
            $left = substr($left, 0, $leftMax);
        }
        $spaceNeeded = max(1, $width - strlen($left) - $rightLen);
        return $left . str_repeat(' ', $spaceNeeded) . $right;
    }
}
