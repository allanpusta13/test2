<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

final class Role extends Model
{
    use HasFactory;

    public const ROLE_ADMIN = 'admin';

    public const ROLE_CASHIER = 'cashier';

    public const ROLE_KITCHEN_STAFF = 'kitchen_staff';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'name',
        'is_system',
    ];

    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class, 'role_permission', 'role_id', 'permission_id');
    }

    protected static function boot(): void
    {
        parent::boot();

        self::creating(function (Role $role): void {
            if (empty($role->id)) {
                $role->id = 'role-'.Str::uuid()->toString();
            }
        });
    }

    protected function casts(): array
    {
        return [
            'is_system' => 'boolean',
        ];
    }
}
