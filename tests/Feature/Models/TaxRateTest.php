<?php

declare(strict_types=1);

use App\Models\TaxRate;

test('tax rate model uses string primary key', function () {
    $taxRate = TaxRate::factory()->create();

    expect($taxRate->id)->toBeString();
    expect($taxRate->incrementing)->toBeFalse();
    expect($taxRate->getKeyType())->toBe('string');
});

test('tax rate has correct fillable attributes', function () {
    $taxRate = new TaxRate();

    expect($taxRate->getFillable())->toContain('id', 'name', 'rate', 'is_inclusive', 'applies_to', 'category_id');
});

test('tax rate is_inclusive is cast to boolean', function () {
    $taxRate = TaxRate::factory()->create(['is_inclusive' => true]);

    expect($taxRate->is_inclusive)->toBeTrue();
    expect($taxRate->is_inclusive)->toBeBool();
});

test('tax rate rate is cast to float', function () {
    $taxRate = TaxRate::factory()->create(['rate' => '7.50']);

    expect($taxRate->rate)->toBeFloat();
});

test('tax rate optionally belongs to category', function () {
    $taxRate = TaxRate::factory()->create(['category_id' => null]);

    expect($taxRate->category)->toBeNull();
});
