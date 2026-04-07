```typescript
/**
 * tests/fractional-knapsack.test.ts
 *
 * Test suite for the Fractional Knapsack Problem.
 */

import { Item, KnapsackItemResult, fractionalKnapsack } from '../src/algorithms/fractional-knapsack';
import { deepClone, shuffleArray } from '../src/utils/helpers';

describe('Fractional Knapsack Problem', () => {

    // Helper to create an item
    const createItem = (id: number | string, value: number, weight: number): Item => ({ id, value, weight });

    // Test case 1: Basic scenario with distinct ratios
    test('should maximize value for a basic set of items', () => {
        const capacity = 50;
        const items: Item[] = [
            createItem('A', 60, 10), // Ratio 6
            createItem('B', 100, 20), // Ratio 5
            createItem('C', 120, 30), // Ratio 4
        ];

        const { maxValue, itemsTaken } = fractionalKnapsack(capacity, items);

        expect(maxValue).toBe(240); // 60 (Item A) + 100 (Item B) + (20/30)*120 (Fraction of Item C) = 60 + 100 + 80 = 240

        expect(itemsTaken.length).toBe(3);
        // Using `expect.arrayContaining` for flexible order check, but also check contents
        expect(itemsTaken).toEqual(expect.arrayContaining([
            expect.objectContaining({ item: items[0], fraction: 1, valueAdded: 60, weightTaken: 10 }), // Item A
            expect.objectContaining({ item: items[1], fraction: 1, valueAdded: 100, weightTaken: 20 }), // Item B
            expect.objectContaining({ item: items[2], fraction: 20/30, valueAdded: 80, weightTaken: 20 }), // Item C (fraction)
        ]));
    });

    // Test case 2: Capacity less than smallest item's weight
    test('should handle capacity less than any item weight', () => {
        const capacity = 5;
        const items: Item[] = [
            createItem('A', 60, 10), // Ratio 6
            createItem('B', 100, 20), // Ratio 5
        ];

        const { maxValue, itemsTaken } = fractionalKnapsack(capacity, items);
        // Item A has best ratio (60/10=6). Capacity is 5. Take 5/10 (0.5) of A.
        // Value = 0.5 * 60 = 30. Weight = 0.5 * 10 = 5.
        expect(maxValue).toBe(30);
        expect(itemsTaken.length).toBe(1);
        expect(itemsTaken[0]).toEqual(expect.objectContaining({
            item: items[0],
            fraction: 0.5,
            valueAdded: 30,
            weightTaken: 5
        }));
    });

    // Test case 3: Empty items array
    test('should return 0 value and empty array for no items', () => {
        const capacity = 100;
        const items: Item[] = [];
        const { maxValue, itemsTaken } = fractionalKnapsack(capacity, items);
        expect(maxValue).toBe(0);
        expect(itemsTaken).toEqual([]);
    });

    // Test case 4: Zero capacity
    test('should return 0 value and empty array for zero capacity', () => {
        const capacity = 0;
        const items: Item[] = [createItem('A', 10, 5)];
        const { maxValue, itemsTaken } = fractionalKnapsack(capacity, items);
        expect(maxValue).toBe(0);
        expect(itemsTaken).toEqual([]);
    });

    // Test case 5: Capacity exactly fits all items
    test('should take all items if capacity exactly fits them', () => {
        const capacity = 60;
        const items: Item[] = [
            createItem('A', 60, 10), // Ratio 6
            createItem('B', 100, 20), // Ratio 5
            createItem('C', 120, 30), // Ratio 4
        ];
        // Total weight = 10 + 20 + 30 = 60.
        // Total value = 60 + 100 + 120 = 280.
        const { maxValue, itemsTaken } = fractionalKnapsack(capacity, items);
        expect(maxValue).toBe(280);
        expect(itemsTaken.length).toBe(3);
        expect(itemsTaken).toEqual(expect.arrayContaining([
            expect.objectContaining({ item: items[0], fraction: 1, valueAdded: 60, weightTaken: 10 }),
            expect.objectContaining({ item: items[1], fraction: 1, valueAdded: 100, weightTaken: 20 }),
            expect.objectContaining({ item: items[2], fraction: 1, valueAdded: 120, weightTaken: 30 }),
        ]));
    });

    // Test case 6: Items with same value-to-weight ratio
    test('should handle items with the same value-to-weight ratio', () => {
        const capacity = 30;
        const items: Item[] = [
            createItem('A', 100, 10), // Ratio 10
            createItem('B', 200, 20), // Ratio 10
            createItem('C', 50, 10), // Ratio 5
        ];
        // A and B have ratio 10. C has ratio 5.
        // Sorted: A, B (or B, A), C.
        // Take A (100,10): value 100, weight 10. Remaining capacity 20.
        // Take B (200,20): value 200, weight 20. Remaining capacity 0.
        // Total value = 100 + 200 = 300.
        const { maxValue, itemsTaken } = fractionalKnapsack(capacity, items);
        expect(maxValue).toBe(300);
        expect(itemsTaken.length).toBe(2);
        expect(itemsTaken).toEqual(expect.arrayContaining([
            expect.objectContaining({ item: items[0], fraction: 1, valueAdded: 100, weightTaken: 10 }),
            expect.objectContaining({ item: items[1], fraction: 1, valueAdded: 200, weightTaken: 20 }),
        ]));
    });

    // Test case 7: Floating point values for weights and values
    test('should handle floating point values for weights and values', () => {
        const capacity = 15.5;
        const items: Item[] = [
            createItem('A', 12.5, 2.5), // Ratio 5
            createItem('B', 21.0, 3.0), // Ratio 7
            createItem('C', 18.0, 4.0), // Ratio 4.5
        ];
        // Sorted by ratio: B (7), A (5), C (4.5)
        // 1. Take B (21.0, 3.0). Capacity left: 15.5 - 3.0 = 12.5. Value: 21.0
        // 2. Take A (12.5, 2.5). Capacity left: 12.5 - 2.5 = 10.0. Value: 21.0 + 12.5 = 33.5
        // 3. Take C (18.0, 4.0). Capacity left: 10.0 - 4.0 = 6.0. Value: 33.5 + 18.0 = 51.5
        // All fit, total value: 51.5. (No, the total weight is 3+2.5+4 = 9.5 which is not 15.5)
        // My manual trace was flawed. Let's re-trace:
        // Capacity: 15.5
        // Items sorted: B (val:21, wt:3, ratio:7), A (val:12.5, wt:2.5, ratio:5), C (val:18, wt:4, ratio:4.5)
        // 1. Take B (val:21, wt:3). currentWeight=3, totalValue=21. capacity_remaining = 12.5. itemsTaken=[B(100%)]
        // 2. Take A (val:12.5, wt:2.5). currentWeight=3+2.5=5.5, totalValue=21+12.5=33.5. capacity_remaining = 10. itemsTaken=[B(100%), A(100%)]
        // 3. Take C (val:18, wt:4). currentWeight=5.5+4=9.5, totalValue=33.5+18=51.5. capacity_remaining = 6. itemsTaken=[B(100%), A(100%), C(100%)]
        // All items taken, total weight 9.5 <= capacity 15.5.
        // Max value should be sum of all values.
        expect(maxValue).toBe(51.5);
        expect(itemsTaken.length).toBe(3);
        expect(itemsTaken).toEqual(expect.arrayContaining([
            expect.objectContaining({ item: items[1], fraction: 1, valueAdded: 21.0, weightTaken: 3.0 }), // Item B
            expect.objectContaining({ item: items[0], fraction: 1, valueAdded: 12.5, weightTaken: 2.5 }), // Item A
            expect.objectContaining({ item: items[2], fraction: 1, valueAdded: 18.0, weightTaken: 4.0 }), // Item C
        ]));
    });

    // Test case 8: Large number of random items
    test('should work for a large set of random items', () => {
        const numItems = 1000;
        const maxWeight = 50;
        const maxValuePerWeight = 100;
        const capacity = numItems * maxWeight / 2; // Roughly half the total potential weight
        const items: Item[] = [];
        for (let i = 0; i < numItems; i++) {
            const weight = Math.random() * maxWeight + 1; // Weight between 1 and maxWeight+1
            const value = weight * (Math.random() * maxValuePerWeight + 1); // Value > weight, for positive ratio
            items.push(createItem(i, value, weight));
        }

        const { maxValue, itemsTaken } = fractionalKnapsack(capacity, items);

        expect(maxValue).toBeGreaterThan(0);
        expect(itemsTaken.length).toBeGreaterThan(0);

        let totalWeightInKnapsack = 0;
        let totalValueInKnapsack = 0;
        for (const { weightTaken, valueAdded } of itemsTaken) {
            totalWeightInKnapsack += weightTaken;
            totalValueInKnapsack += valueAdded;
        }

        // Allow for minor floating point inaccuracies
        expect(totalWeightInKnapsack).toBeLessThanOrEqual(capacity + 1e-9); // Capacity might be filled to float limit
        expect(totalWeightInKnapsack).toBeCloseTo(capacity); // Should be very close to capacity if not all items fit
        expect(totalValueInKnapsack).toBeCloseTo(maxValue);
    });

    // Test case 9: All items have zero weight (edge case for ratio calculation)
    test('should handle items with zero weight', () => {
        const capacity = 10;
        const items: Item[] = [
            createItem('A', 100, 0), // Infinite ratio (if value > 0)
            createItem('B', 50, 0),  // Infinite ratio
            createItem('C', 20, 10), // Ratio 2
            createItem('D', 0, 0),   // Ratio 0 (or undefined, handling as 0)
        ];

        const { maxValue, itemsTaken } = fractionalKnapsack(capacity, items);
        // Items A, B will be picked first due to Infinity ratio.
        // A(100,0), B(50,0). Then C(20,10). Total Value 100+50+20=170.
        // Total Weight 0+0+10=10, which exactly fits.
        expect(maxValue).toBe(170);
        expect(itemsTaken.length).toBe(3);
        // Expect items A, B, C to be present. Order within A,B is not fixed, but C will be last of these three.
        expect(itemsTaken).toEqual(expect.arrayContaining([
            expect.objectContaining({ item: items[0], fraction: 1, valueAdded: 100, weightTaken: 0 }),
            expect.objectContaining({ item: items[1], fraction: 1, valueAdded: 50, weightTaken: 0 }),
            expect.objectContaining({ item: items[2], fraction: 1, valueAdded: 20, weightTaken: 10 }),
        ]));
    });

    // Test case 10: Input array order should not affect the result
    test('should give the same result regardless of input order', () => {
        const capacity = 50;
        const originalItems: Item[] = [
            createItem('A', 60, 10), // Ratio 6
            createItem('B', 100, 20), // Ratio 5
            createItem('C', 120, 30), // Ratio 4
        ];
        const expectedMaxValue = 240;

        const shuffledItems = shuffleArray(deepClone(originalItems)); // Use deepClone to avoid modifying original

        const { maxValue } = fractionalKnapsack(capacity, shuffledItems);
        expect(maxValue).toBe(expectedMaxValue);
    });
});
```