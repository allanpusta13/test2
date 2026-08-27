<?php

declare(strict_types=1);

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

final class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    public const ROLE_ADMIN = Role::ROLE_ADMIN;

    public const ROLE_CASHIER = Role::ROLE_CASHIER;

    public const ROLE_KITCHEN_STAFF = Role::ROLE_KITCHEN_STAFF;

    public $incrementing = false;

    /**
     * The primary key type and incrementing settings.
     */
    protected $keyType = 'string';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'id',
        'name',
        'email',
        'password',
        'role_id',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'app_authentication_secret',
        'app_authentication_recovery_codes',
        'associated_role',
    ];

    protected $appends = ['role'];

    /**
     * Get the role that this user belongs to.
     */
    public function associatedRole(): BelongsTo
    {
        return $this->belongsTo(Role::class, 'role_id');
    }

    /**
     * Get the role name string — this is what the frontend expects as `role`.
     */
    public function getRoleAttribute(): string
    {
        return $this->associatedRole?->name ?? 'cashier';
    }

    /**
     * Get the role model for internal use (e.g. permission checks).
     */
    public function getRoleModel(): ?Role
    {
        return $this->associatedRole;
    }

    /**
     * Role checks helper methods.
     */
    public function isAdmin(): bool
    {
        return $this->getRoleAttribute() === Role::ROLE_ADMIN;
    }

    public function isCashier(): bool
    {
        return $this->getRoleAttribute() === Role::ROLE_CASHIER;
    }

    public function isKitchenStaff(): bool
    {
        return $this->getRoleAttribute() === Role::ROLE_KITCHEN_STAFF;
    }

    public function hasRole(string ...$roleNames): bool
    {
        return in_array($this->getRoleAttribute(), $roleNames, true);
    }

    /**
     * Resolve the role relationship for eager loading.
     */
    public function resolveRelation($relation)
    {
        if ($relation === 'role') {
            return $this->associatedRole();
        }

        return parent::resolveRelation($relation);
    }

    public function getAppAuthenticationSecret(): ?string
    {
        return $this->app_authentication_secret;
    }

    public function saveAppAuthenticationSecret(?string $secret): void
    {
        $this->app_authentication_secret = $secret;
        $this->save();
    }

    public function getAppAuthenticationHolderName(): string
    {
        return $this->email;
    }

    /** @phpstan-ignore-next-line */
    public function getAppAuthenticationRecoveryCodes(): ?array
    {
        /** @phpstan-ignore-next-line */
        return $this->app_authentication_recovery_codes;
    }

    public function saveAppAuthenticationRecoveryCodes(?array $codes): void
    {
        /** @phpstan-ignore-next-line  */
        $this->app_authentication_recovery_codes = $codes;
        $this->save();
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'app_authentication_secret' => 'encrypted',
            'app_authentication_recovery_codes' => 'encrypted:array',
        ];
    }
}
