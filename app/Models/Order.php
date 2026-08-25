<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

class Order extends Model
{
    use HasFactory;

    public const STATUS_PENDING = 'pending';
    public const STATUS_PREPARING = 'preparing';
    public const STATUS_READY = 'ready';
    public const STATUS_COMPLETED = 'completed';
    public const STATUS_CANCELLED = 'cancelled';

    public const TYPE_DINE_IN = 'dine_in';
    public const TYPE_TAKEAWAY = 'takeaway';

    protected $fillable = [
        'id',
        'order_number',
        'status',
        'type',
        'table_number',
        'customer_name',
        'customer_phone',
        'notes',
        'idempotency_key',
        'tracking_token',
        'subtotal',
        'tax_total',
        'total',
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    protected $casts = [
        'subtotal' => 'float',
        'tax_total' => 'float',
        'total' => 'float',
    ];

    protected $appends = [
        'amount_paid',
        'payment_status',
        'unpaid_balance',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (Order $order): void {
            if (empty($order->id)) {
                $order->id = 'ord-' . Str::uuid()->toString();
            }
            if (empty($order->order_number)) {
                $order->order_number = 'AB-' . random_int(1000, 9999);
            }
            if (empty($order->tracking_token)) {
                $order->tracking_token = 'OT-' . strtoupper(Str::random(6));
            }
            if (empty($order->status)) {
                $order->status = self::STATUS_PENDING;
            }
        });
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class, 'order_id');
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class, 'order_id')->orderByDesc('created_at');
    }

    public function getAmountPaidAttribute(): float
    {
        return (float) $this->payments()->sum('amount');
    }

    public function getUnpaidBalanceAttribute(): float
    {
        $balance = $this->total - $this->getAmountPaidAttribute();
        return max(0.0, round($balance, 2));
    }

    public function getPaymentStatusAttribute(): string
    {
        $paid = $this->getAmountPaidAttribute();
        if ($paid <= 0) {
            return 'unpaid';
        }
        if ($paid >= $this->total - 0.01) {
            return 'paid';
        }
        return 'partial';
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->whereIn('status', [self::STATUS_PENDING, self::STATUS_PREPARING, self::STATUS_READY]);
    }

    public function scopePending(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_PENDING);
    }

    public function scopePreparing(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_PREPARING);
    }

    public function scopeReady(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_READY);
    }

    public function scopeCompleted(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_COMPLETED);
    }

    public function scopeCancelled(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_CANCELLED);
    }
}
