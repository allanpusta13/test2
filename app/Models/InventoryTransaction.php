<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

final class InventoryTransaction extends Model
{
    use HasFactory;

    public const TYPE_RESTOCK = 'restock';

    public const TYPE_PREP_DEDUCTION = 'prep_deduction';

    public const TYPE_WASTE = 'waste';

    public const TYPE_AUDIT_ADJUSTMENT = 'audit_adjustment';

    public const TYPE_CANCELLATION_REVERSAL = 'cancellation_reversal';

    public $incrementing = false;

    protected $fillable = [
        'id',
        'inventory_item_id',
        'inventory_item_name',
        'quantity',
        'type',
        'reference',
        'notes',
    ];

    protected $keyType = 'string';

    protected $casts = [
        'quantity' => 'float',
    ];

    public function inventoryItem(): BelongsTo
    {
        return $this->belongsTo(InventoryItem::class, 'inventory_item_id');
    }

    protected static function boot(): void
    {
        parent::boot();

        self::creating(function (InventoryTransaction $transaction): void {
            if (empty($transaction->id)) {
                $transaction->id = 'tx-'.Str::uuid()->toString();
            }
            if (empty($transaction->inventory_item_name) && $transaction->inventory_item_id) {
                $item = InventoryItem::find($transaction->inventory_item_id);
                if ($item) {
                    $transaction->inventory_item_name = $item->name;
                }
            }
        });
    }
}
