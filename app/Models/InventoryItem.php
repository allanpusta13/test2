<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

class InventoryItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'unit',
        'low_stock_threshold',
        'category',
        'cost_per_unit',
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    protected $casts = [
        'low_stock_threshold' => 'float',
        'cost_per_unit' => 'float',
    ];

    protected $appends = [
        'derived_stock',
        'is_low_stock',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (InventoryItem $item): void {
            if (empty($item->id)) {
                $item->id = 'inv-' . Str::uuid()->toString();
            }
        });
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(InventoryTransaction::class, 'inventory_item_id')->orderByDesc('created_at');
    }

    public function getDerivedStockAttribute(): float
    {
        return (float) $this->transactions()->sum('quantity');
    }

    public function getIsLowStockAttribute(): bool
    {
        return $this->getDerivedStockAttribute() <= (float) $this->low_stock_threshold;
    }

    public function scopeLowStock(Builder $query): Builder
    {
        return $query->whereHas('transactions', function (Builder $q) {
            // Evaluated dynamically or through derived calculation
        });
    }
}
