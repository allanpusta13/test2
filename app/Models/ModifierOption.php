<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

final class ModifierOption extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'modifier_id',
        'name',
        'extra_price',
    ];

    protected $casts = [
        'extra_price' => 'float',
    ];

    public function modifier(): BelongsTo
    {
        return $this->belongsTo(Modifier::class, 'modifier_id');
    }

    protected static function boot(): void
    {
        parent::boot();

        self::creating(function (ModifierOption $option): void {
            if (empty($option->id)) {
                $option->id = 'mopt-'.Str::uuid()->toString();
            }
        });
    }
}
