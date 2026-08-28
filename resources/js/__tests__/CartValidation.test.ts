import { describe, it, expect } from 'vitest';

// Inline copy of the helper for isolated testing
function parseCartFromStorage(raw: string) {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];

  const valid: any[] = [];
  for (const item of parsed) {
    if (
      typeof item !== 'object' || item === null ||
      typeof (item as any).id !== 'string' ||
      typeof (item as any).cart_id !== 'string' ||
      typeof (item as any).menu_item_id !== 'string' ||
      typeof (item as any).name !== 'string'
    ) continue;

    const quantity = Number((item as any).quantity);
    const unit_price = Number((item as any).unit_price);
    const total_price = Number((item as any).total_price);

    if (!Number.isFinite(quantity) || quantity < 1) continue;
    if (!Number.isFinite(unit_price) || unit_price < 0) continue;
    if (!Number.isFinite(total_price) || total_price < 0) continue;

    const selected_modifiers = Array.isArray((item as any).selected_modifiers)
      ? (item as any).selected_modifiers
      : [];

    valid.push({
      id: (item as any).id,
      cart_id: (item as any).cart_id,
      menu_item_id: (item as any).menu_item_id,
      name: (item as any).name,
      quantity,
      unit_price,
      total_price,
      notes: (item as any).notes,
      selected_modifiers,
    });
  }
  return valid;
}

const validItem = {
  id: 'item-1',
  cart_id: 'cart-1',
  menu_item_id: 'menu-1',
  name: 'Margherita Pizza',
  quantity: 2,
  unit_price: 14.99,
  total_price: 29.98,
  selected_modifiers: [],
};

describe('parseCartFromStorage', () => {
  it('parses a valid cart', () => {
    const result = parseCartFromStorage(JSON.stringify([validItem]));
    expect(result).toHaveLength(1);
    expect(result[0].quantity).toBe(2);
    expect(result[0].total_price).toBe(29.98);
  });

  it('returns [] for non-array input', () => {
    expect(parseCartFromStorage('{"foo":"bar"}')).toEqual([]);
    expect(parseCartFromStorage('"string"')).toEqual([]);
    expect(parseCartFromStorage('42')).toEqual([]);
  });

  it('returns [] for invalid JSON', () => {
    expect(parseCartFromStorage('not json')).toEqual([]);
  });

  it('returns [] for empty array', () => {
    expect(parseCartFromStorage('[]')).toEqual([]);
  });

  it('drops items missing required string fields', () => {
    const items = [
      validItem,
      { ...validItem, id: undefined, cart_id: 'cart-2' },
    ];
    const result = parseCartFromStorage(JSON.stringify(items));
    expect(result).toHaveLength(1);
    expect(result[0].cart_id).toBe('cart-1');
  });

  it('drops items with quantity < 1', () => {
    const items = [validItem, { ...validItem, cart_id: 'cart-2', quantity: 0 }];
    const result = parseCartFromStorage(JSON.stringify(items));
    expect(result).toHaveLength(1);
  });

  it('drops items with non-finite quantity', () => {
    const items = [validItem, { ...validItem, cart_id: 'cart-2', quantity: NaN }];
    const result = parseCartFromStorage(JSON.stringify(items));
    expect(result).toHaveLength(1);
  });

  it('drops items with negative price', () => {
    const items = [validItem, { ...validItem, cart_id: 'cart-2', unit_price: -5 }];
    const result = parseCartFromStorage(JSON.stringify(items));
    expect(result).toHaveLength(1);
  });

  it('coerces string-encoded numbers', () => {
    const items = [{ ...validItem, quantity: '3', unit_price: '10', total_price: '30' }];
    const result = parseCartFromStorage(JSON.stringify(items));
    expect(result).toHaveLength(1);
    expect(result[0].quantity).toBe(3);
    expect(result[0].unit_price).toBe(10);
  });

  it('rejects null/undefined numeric fields', () => {
    const items = [validItem, { ...validItem, cart_id: 'cart-2', quantity: null }];
    const result = parseCartFromStorage(JSON.stringify(items));
    expect(result).toHaveLength(1);
  });

  it('defaults selected_modifiers to [] if not an array', () => {
    const items = [{ ...validItem, selected_modifiers: 'bad' }];
    const result = parseCartFromStorage(JSON.stringify(items));
    expect(result).toHaveLength(1);
    expect(result[0].selected_modifiers).toEqual([]);
  });

  it('passes items with extra unknown fields', () => {
    const items = [{ ...validItem, extra: 'unknown', nested: { a: 1 } }];
    const result = parseCartFromStorage(JSON.stringify(items));
    expect(result).toHaveLength(1);
  });
});
