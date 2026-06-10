```javascript
/**
 * @fileoverview Test suite for the Fractional Knapsack Problem.
 */

import fractionalKnapsack from '../src/problems/fractionalKnapsack';

describe('fractionalKnapsack', () => {
  // Test Case 1: Basic scenario with full items and a fraction
  test('should correctly calculate max value for a mixed scenario', () => {
    const capacity = 50;
    const items = [
      { id: 'A', weight: 10, value: 60 }, // Ratio 6
      { id: 'B', weight: 20, value: 100 }, // Ratio 5
      { id: 'C', weight: 30, value: 120 }  // Ratio 4
    ];
    // Sorted by ratio: A (6), B (5), C (4)
    // Take A (10kg, 60 value), remaining capacity 40. Total value 60.
    // Take B (20kg, 100 value), remaining capacity 20. Total value 160.
    // Take 20/30 (2/3) of C (20kg, 120 * (2/3) = 80 value). Remaining capacity 0. Total value 240.
    const expected = {
      totalValue: 240,
      selectedItems: [
        { item: { id: 'A', weight: 10, value: 60 }, fraction: 1 },
        { item: { id: 'B', weight: 20, value: 100 }, fraction: 1 },
        { item: { id: 'C', weight: 30, value: 120 }, fraction: 0.6667 }
      ]
    };
    const result = fractionalKnapsack(capacity, items);
    expect(result.totalValue).toBeCloseTo(expected.totalValue, 4); // Use toBeCloseTo for floating point
    // Compare selected items, ignoring the 'ratio' property if it's there and sorting for consistency
    const sortedResultItems = result.selectedItems.sort((a, b) => a.item.id.localeCompare(b.item.id));
    const sortedExpectedItems = expected.selectedItems.sort((a, b) => a.item.id.localeCompare(b.item.id));
    expect(sortedResultItems.length).toEqual(sortedExpectedItems.length);
    sortedResultItems.forEach((resItem, index) => {
      const expItem = sortedExpectedItems[index];
      expect(resItem.item.id).toEqual(expItem.item.id);
      expect(resItem.item.weight).toEqual(expItem.item.weight);
      expect(resItem.item.value).toEqual(expItem.item.value);
      expect(resItem.fraction).toBeCloseTo(expItem.fraction, 4);
    });
  });

  // Test Case 2: Only one item, fits completely
  test('should select the single item if it fits entirely', () => {
    const capacity = 100;
    const items = [{ id: 'X', weight: 50, value: 200 }]; // Ratio 4
    const expected = {
      totalValue: 200,
      selectedItems: [{ item: { id: 'X', weight: 50, value: 200 }, fraction: 1 }]
    };
    const result = fractionalKnapsack(capacity, items);
    expect(result.totalValue).toBeCloseTo(expected.totalValue, 4);
    expect(result.selectedItems.length).toEqual(1);
    expect(result.selectedItems[0].item.id).toEqual(expected.selectedItems[0].item.id);
    expect(result.selectedItems[0].fraction).toBeCloseTo(expected.selectedItems[0].fraction, 4);
  });

  // Test Case 3: Only one item, taken as a fraction
  test('should select a fraction of the single item if it does not fit entirely', () => {
    const capacity = 25;
    const items = [{ id: 'X', weight: 50, value: 200 }]; // Ratio 4
    const expected = {
      totalValue: 100, // 25/50 * 200 = 100
      selectedItems: [{ item: { id: 'X', weight: 50, value: 200 }, fraction: 0.5 }]
    };
    const result = fractionalKnapsack(capacity, items);
    expect(result.totalValue).toBeCloseTo(expected.totalValue, 4);
    expect(result.selectedItems.length).toEqual(1);
    expect(result.selectedItems[0].item.id).toEqual(expected.selectedItems[0].item.id);
    expect(result.selectedItems[0].fraction).toBeCloseTo(expected.selectedItems[0].fraction, 4);
  });

  // Test Case 4: Knapsack capacity is 0
  test('should return 0 value and empty items for zero capacity', () => {
    const capacity = 0;
    const items = [{ id: 'A', weight: 10, value: 60 }];
    const expected = { totalValue: 0, selectedItems: [] };
    expect(fractionalKnapsack(capacity, items)).toEqual(expected);
  });

  // Test Case 5: Empty items array
  test('should return 0 value and empty items for empty items array', () => {
    const capacity = 50;
    const items = [];
    const expected = { totalValue: 0, selectedItems: [] };
    expect(fractionalKnapsack(capacity, items)).toEqual(expected);
  });

  // Test Case 6: Items with zero weight (should handle division by zero carefully or filter out)
  // For simplicity, we assume valid positive weights. Test with very small weight.
  test('should handle items with very small weights', () => {
    const capacity = 10;
    const items = [
      { id: 'A', weight: 0.001, value: 100 }, // Ratio 100000
      { id: 'B', weight: 5, value: 10 }      // Ratio 2
    ];
    // Sorted: A, B
    // Take A (0.001kg, 100 value), remaining capacity 9.999. Total value 100.
    // Take all of B (5kg, 10 value), remaining capacity 4.999. Total value 110.
    const expected = {
      totalValue: 110,
      selectedItems: [
        { item: { id: 'A', weight: 0.001, value: 100 }, fraction: 1 },
        { item: { id: 'B', weight: 5, value: 10 }, fraction: 1 }
      ]
    };
    const result = fractionalKnapsack(capacity, items);
    expect(result.totalValue).toBeCloseTo(expected.totalValue, 4);
    expect(result.selectedItems.length).toEqual(2);
  });

  // Test Case 7: All items taken completely
  test('should take all items if they all fit and fill completely', () => {
    const capacity = 100;
    const items = [
      { id: 'X', weight: 20, value: 200 }, // Ratio 10
      { id: 'Y', weight: 30, value: 150 }, // Ratio 5
      { id: 'Z', weight: 40, value: 80 }   // Ratio 2
    ];
    // Sorted: X, Y, Z
    // Take X (20kg, 200), cap 80.
    // Take Y (30kg, 150), cap 50.
    // Take Z (40kg, 80), cap 10.
    const expected = {
      totalValue: 200 + 150 + 80, // 430
      selectedItems: [
        { item: { id: 'X', weight: 20, value: 200 }, fraction: 1 },
        { item: { id: 'Y', weight: 30, value: 150 }, fraction: 1 },
        { item: { id: 'Z', weight: 40, value: 80 }, fraction: 1 }
      ]
    };
    const result = fractionalKnapsack(capacity, items);
    expect(result.totalValue).toBeCloseTo(expected.totalValue, 4);
    expect(result.selectedItems.length).toEqual(3);
  });

  // Test Case 8: Items with same ratio, should still yield correct total value
  test('should handle items with identical value-to-weight ratios', () => {
    const capacity = 50;
    const items = [
      { id: 'A', weight: 10, value: 20 }, // Ratio 2
      { id: 'B', weight: 15, value: 30 }, // Ratio 2
      { id: 'C', weight: 20, value: 40 }  // Ratio 2
    ];
    // All have ratio 2. Order depends on sort stability but total value will be capacity * ratio.
    // 50 * 2 = 100
    const expectedValue = 100;
    const result = fractionalKnapsack(capacity, items);
    expect(result.totalValue).toBeCloseTo(expectedValue, 4);
    // It should take items until capacity is full.
    const totalWeightTaken = result.selectedItems.reduce((sum, si) => sum + (si.item.weight * si.fraction), 0);
    expect(totalWeightTaken).toBeCloseTo(capacity, 4);
  });

  // Test Case 9: Decimal weights and values
  test('should handle decimal weights and values', () => {
    const capacity = 7.5;
    const items = [
      { id: 'A', weight: 2.5, value: 10.0 }, // Ratio 4
      { id: 'B', weight: 3.0, value: 12.0 }, // Ratio 4
      { id: 'C', weight: 4.0, value: 10.0 }  // Ratio 2.5
    ];
    // Sorted (A, B due to stable sort, then C)
    // Take A (2.5kg, 10.0 value), remaining capacity 5.0. Total value 10.0
    // Take B (3.0kg, 12.0 value), remaining capacity 2.0. Total value 22.0
    // Take 2.0/4.0 (0.5) of C (2.0kg, 10.0 * 0.5 = 5.0 value). Remaining capacity 0. Total value 27.0
    const expected = {
      totalValue: 27.0,
      selectedItems: [
        { item: { id: 'A', weight: 2.5, value: 10.0 }, fraction: 1 },
        { item: { id: 'B', weight: 3.0, value: 12.0 }, fraction: 1 },
        { item: { id: 'C', weight: 4.0, value: 10.0 }, fraction: 0.5 }
      ]
    };
    const result = fractionalKnapsack(capacity, items);
    expect(result.totalValue).toBeCloseTo(expected.totalValue, 4);
    const sortedResultItems = result.selectedItems.sort((a, b) => a.item.id.localeCompare(b.item.id));
    const sortedExpectedItems = expected.selectedItems.sort((a, b) => a.item.id.localeCompare(b.item.id));
    expect(sortedResultItems.length).toEqual(sortedExpectedItems.length);
    sortedResultItems.forEach((resItem, index) => {
      const expItem = sortedExpectedItems[index];
      expect(resItem.item.id).toEqual(expItem.item.id);
      expect(resItem.fraction).toBeCloseTo(expItem.fraction, 4);
    });
  });
});
```