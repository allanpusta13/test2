<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

class MenuItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'category_id',
        'name',
        'description',
        'price',
        'image',
        'is_available',
        'modifier_groups',
        'recipe',
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    protected $casts = [
        'price' => 'float',
        'is_available' => 'boolean',
        'modifier_groups' => 'array',
        'recipe' => 'array',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (MenuItem $item): void {
            if (empty($item->id)) {
                $item->id = 'item-' . Str::uuid()->toString();
            }
            if (!isset($item->modifier_groups)) {
                $item->modifier_groups = [];
            }
            if (!isset($item->recipe)) {
                $item->recipe = [];
            }
        });
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function scopeAvailable(Builder $query): Builder
    {
        return $query->where('is_available', true);
    }
}
