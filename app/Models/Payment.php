<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

final class Payment extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $fillable = [
        'id',
        'order_id',
        'amount',
        'tendered',
        'change_returned',
        'method',
        'cashier_id',
        'cashier_name',
        'notes',
    ];

    protected $keyType = 'string';

    protected $casts = [
        'amount' => 'float',
        'tendered' => 'float',
        'change_returned' => 'float',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    protected static function boot(): void
    {
        parent::boot();

        self::creating(function (Payment $payment): void {
            if (empty($payment->id)) {
                $payment->id = 'pay-'.Str::uuid()->toString();
            }
            if (empty($payment->method)) {
                $payment->method = 'cash';
            }
            if ($payment->tendered > 0 && $payment->amount > 0 && ! isset($payment->change_returned)) {
                $payment->change_returned = max(0.0, round((float) $payment->tendered - (float) $payment->amount, 2));
            }
        });
    }
}
