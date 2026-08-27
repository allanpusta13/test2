<?php

declare(strict_types=1);

use App\Models\Modifier;
use App\Models\ModifierOption;

test('modifier model uses string primary key', function () {
    $modifier = Modifier::factory()->create();

    expect($modifier->id)->toBeString();
    expect($modifier->incrementing)->toBeFalse();
    expect($modifier->getKeyType())->toBe('string');
});

test('modifier has many options', function () {
    $modifier = Modifier::factory()->create();
    $option1 = ModifierOption::factory()->create(['modifier_id' => $modifier->id]);
    $option2 = ModifierOption::factory()->create(['modifier_id' => $modifier->id]);

    expect($modifier->options)->toHaveCount(2);
});

test('modifier option belongs to modifier', function () {
    $modifier = Modifier::factory()->create();
    $option = ModifierOption::factory()->create(['modifier_id' => $modifier->id]);

    expect($option->modifier->id)->toBe($modifier->id);
});

test('modifier option uses string primary key', function () {
    $option = ModifierOption::factory()->create();

    expect($option->id)->toBeString();
    expect($option->incrementing)->toBeFalse();
    expect($option->getKeyType())->toBe('string');
});

test('modifier option has correct fillable attributes', function () {
    $option = new ModifierOption();

    expect($option->getFillable())->toContain('id', 'modifier_id', 'name', 'extra_price');
});

test('modifier option extra_price is cast to float', function () {
    $option = ModifierOption::factory()->create(['extra_price' => '2.50']);

    expect($option->extra_price)->toBeFloat();
});

test('deleting modifier cascades to options', function () {
    $modifier = Modifier::factory()->create();
    $option = ModifierOption::factory()->create(['modifier_id' => $modifier->id]);

    $modifier->delete();

    expect(ModifierOption::find($option->id))->toBeNull();
});
