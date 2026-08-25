<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'order_id',
        'menu_item_id',
        'name',
        'quantity',
        'unit_price',
        'total_price',
        'notes',
        'selected_modifiers',
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    protected $casts = [
        'quantity' => 'integer',
        'unit_price' => 'float',
        'total_price' => 'float',
        'selected_modifiers' => 'array',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (OrderItem $item): void {
            if (empty($item->id)) {
                $item->id = 'oi-' . Str::uuid()->toString();
            }
            if (!isset($item->selected_modifiers)) {
                $item->selected_modifiers = [];
            }
            if (empty($item->total_price)) {
                $item->total_price = (float) $item->unit_price * max(1, (int) $item->quantity);
            }
        });
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    public function menuItem(): BelongsTo
    {
        return $this->belongsTo(MenuItem::class, 'menu_item_id');
    }
}
