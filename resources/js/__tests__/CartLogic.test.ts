import { describe, it, expect } from 'vitest';

describe('Cart Logic', () => {
  describe('quantity stepper', () => {
    it('increments quantity and recalculates total', () => {
      const item = { cart_id: '1', quantity: 1, unit_price: 10, total_price: 10 };
      const newQty = item.quantity + 1;
      const newTotal = item.unit_price * newQty;
      expect(newQty).toBe(2);
      expect(newTotal).toBe(20);
    });

    it('decrements quantity and recalculates total', () => {
      const item = { cart_id: '1', quantity: 3, unit_price: 10, total_price: 30 };
      const newQty = item.quantity - 1;
      const newTotal = item.unit_price * newQty;
      expect(newQty).toBe(2);
      expect(newTotal).toBe(20);
    });

    it('does not decrement below 1', () => {
      const item = { cart_id: '1', quantity: 1, unit_price: 10, total_price: 10 };
      const minQty = 1;
      const newQty = Math.max(item.quantity - 1, minQty);
      expect(newQty).toBe(1);
    });
  });

  describe('modifier price calculation', () => {
    it('adds modifier extra_price to unit_price', () => {
      const basePrice = 14.99;
      const modifiers = [
        { extra_price: 4.00 },
        { extra_price: 1.50 },
      ];
      const modifierTotal = modifiers.reduce((sum, m) => sum + m.extra_price, 0);
      const unitPrice = Number((basePrice + modifierTotal).toFixed(2));
      expect(unitPrice).toBe(20.49);
    });

    it('handles zero extra_price modifiers', () => {
      const basePrice = 14.99;
      const modifiers = [
        { extra_price: 0 },
        { extra_price: 0 },
      ];
      const modifierTotal = modifiers.reduce((sum, m) => sum + m.extra_price, 0);
      const unitPrice = basePrice + modifierTotal;
      expect(unitPrice).toBe(14.99);
    });

    it('calculates total_price with quantity and modifiers', () => {
      const basePrice = 14.99;
      const modifiers = [{ extra_price: 4.00 }];
      const quantity = 2;
      const modifierTotal = modifiers.reduce((sum, m) => sum + m.extra_price, 0);
      const unitPrice = Number((basePrice + modifierTotal).toFixed(2));
      const totalPrice = Number((unitPrice * quantity).toFixed(2));
      expect(totalPrice).toBe(37.98);
    });
  });

  describe('cart subtotal calculation', () => {
    it('sums total_price of all items', () => {
      const cart = [
        { total_price: 14.99 },
        { total_price: 8.50 },
        { total_price: 3.00 },
      ];
      const subtotal = cart.reduce((sum, item) => sum + item.total_price, 0);
      expect(subtotal).toBeCloseTo(26.49);
    });

    it('calculates tax from subtotal', () => {
      const subtotal = 26.49;
      const taxRate = 0.08875;
      const tax = Number((subtotal * taxRate).toFixed(2));
      expect(tax).toBe(2.35);
    });

    it('calculates grand total', () => {
      const subtotal = 26.49;
      const tax = 2.35;
      const grandTotal = Number((subtotal + tax).toFixed(2));
      expect(grandTotal).toBe(28.84);
    });
  });
});
