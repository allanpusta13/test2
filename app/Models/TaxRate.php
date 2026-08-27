<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

final class TaxRate extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'name',
        'rate',
        'is_inclusive',
        'applies_to',
        'category_id',
    ];

    protected $casts = [
        'rate' => 'float',
        'is_inclusive' => 'boolean',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    protected static function boot(): void
    {
        parent::boot();

        self::creating(function (TaxRate $taxRate): void {
            if (empty($taxRate->id)) {
                $taxRate->id = 'tax-'.Str::uuid()->toString();
            }
        });
    }
}
