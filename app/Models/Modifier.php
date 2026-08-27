<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

final class Modifier extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'name',
    ];

    public function options(): HasMany
    {
        return $this->hasMany(ModifierOption::class, 'modifier_id');
    }

    protected static function boot(): void
    {
        parent::boot();

        self::creating(function (Modifier $modifier): void {
            if (empty($modifier->id)) {
                $modifier->id = 'mod-'.Str::uuid()->toString();
            }
        });
    }
}
