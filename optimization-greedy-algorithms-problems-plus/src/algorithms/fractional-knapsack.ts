```typescript
/**
 * src/algorithms/fractional-knapsack.ts
 *
 * This file implements the Fractional Knapsack Problem using a greedy approach.
 *
 * Problem Description:
 * Given a set of items, each with a weight and a value, and a knapsack with a maximum
 * capacity, the goal is to determine the items (or fractions of items) to include in
 * the knapsack so that the total value is maximized. Items can be broken down (fractions
 * of items can be taken), which is the key difference from the 0/1 Knapsack Problem.
 *
 * Example:
 * Capacity: 50
 * Items:
 *   Item 1: Value=60, Weight=10
 *   Item 2: Value=100, Weight=20
 *   Item 3: Value=120, Weight=30
 *
 * Value/Weight Ratios:
 *   Item 1: 60/10 = 6
 *   Item 2: 100/20 = 5
 *   Item 3: 120/30 = 4
 *
 * Optimal selection (greedy):
 * 1. Take Item 1 (ratio 6): Capacity remaining = 50 - 10 = 40. Total value = 60.
 * 2. Take Item 2 (ratio 5): Capacity remaining = 40 - 20 = 20. Total value = 60 + 100 = 160.
 * 3. Take 20/30 (2/3) of Item 3 (ratio 4): Capacity remaining = 20 - 20 = 0.
 *    Value added = (2/3) * 120 = 80. Total value = 160 + 80 = 240.
 *
 * Max Value: 240
 */

/**
 * Represents an item with a value and weight.
 */
export interface Item {
    id: number | string; // Optional identifier for debugging/tracking
    value: number;
    weight: number;
}

/**
 * Represents a selected item or a fraction of an item in the knapsack.
 */
export interface KnapsackItemResult {
    item: Item;
    fraction: number; // The fraction of the item taken (0 to 1)
    valueAdded: number; // The actual value contributed by this item/fraction
    weightTaken: number; // The actual weight contributed by this item/fraction
}

/**
 * Solves the Fractional Knapsack Problem using a greedy approach.
 *
 * The greedy strategy for fractional knapsack is to prioritize items
 * with the highest value-to-weight ratio. Since we can take fractions,
 * this local optimal choice (picking the "most valuable per unit of weight" item)
 * always leads to a globally optimal solution.
 *
 * Algorithm Steps:
 * 1. Calculate the value-to-weight ratio for each item.
 * 2. Sort the items in descending order based on their value-to-weight ratio.
 * 3. Iterate through the sorted items:
 *    a. If the current item's weight is less than or equal to the remaining knapsack capacity,
 *       take the entire item. Add its value and weight to the total.
 *    b. If the current item's weight is greater than the remaining knapsack capacity,
 *       take a fraction of the item that exactly fills the remaining capacity.
 *       Calculate the value and weight for this fraction, add them to the total, and stop.
 * 4. Return the maximum total value.
 *
 * Time Complexity:
 * - Calculating ratios for N items: O(N).
 * - Sorting items: O(N log N).
 * - Iterating and filling knapsack: O(N) in the worst case (if all items are taken partially).
 * - Total Time Complexity: O(N log N) due to sorting.
 *
 * Space Complexity:
 * - Storing items with ratios (if new objects are created): O(N).
 * - Storing the result set: O(N) in the worst case (all items are taken).
 * - Total Space Complexity: O(N).
 *
 * @param capacity The maximum weight capacity of the knapsack.
 * @param items An array of Item objects.
 * @returns An object containing the maximum total value and the details of items taken.
 */
export function fractionalKnapsack(capacity: number, items: Item[]): { maxValue: number; itemsTaken: KnapsackItemResult[] } {
    // Edge case: Invalid capacity or no items
    if (capacity <= 0 || !items || items.length === 0) {
        return { maxValue: 0, itemsTaken: [] };
    }

    // 1. Calculate value-to-weight ratio for each item and store them along with original items.
    // This helper type is used for sorting.
    type ItemWithRatio = Item & { ratio: number };

    const itemsWithRatios: ItemWithRatio[] = items.map(item => ({
        ...item,
        ratio: item.weight === 0 ? (item.value > 0 ? Infinity : 0) : item.value / item.weight // Handle zero weight to avoid division by zero
    }));

    // 2. Sort items in descending order based on their value-to-weight ratio.
    // Items with higher ratios (more value per unit weight) come first.
    // If ratios are equal, a secondary sort (e.g., by value descending or id ascending)
    // can provide a deterministic output, but doesn't affect the max value.
    itemsWithRatios.sort((a, b) => b.ratio - a.ratio);

    let currentWeight = 0;
    let totalValue = 0;
    const itemsTaken: KnapsackItemResult[] = [];

    // 3. Iterate through sorted items and fill the knapsack.
    for (const itemWithRatio of itemsWithRatios) {
        const { item, ratio } = itemWithRatio;

        // Calculate how much weight of the current item can be added.
        const remainingCapacity = capacity - currentWeight;

        // If taking the whole item is possible:
        if (item.weight <= remainingCapacity) {
            currentWeight += item.weight;
            totalValue += item.value;
            itemsTaken.push({ item: item, fraction: 1, valueAdded: item.value, weightTaken: item.weight });
        } else {
            // If the item is too heavy, take a fraction of it to fill the remaining capacity.
            const fraction = remainingCapacity / item.weight;
            const valueAdded = fraction * item.value;
            const weightTaken = fraction * item.weight;

            currentWeight += weightTaken;
            totalValue += valueAdded;
            itemsTaken.push({ item: item, fraction: fraction, valueAdded: valueAdded, weightTaken: weightTaken });

            // Knapsack is full, stop processing further items.
            break;
        }

        // If capacity is exactly filled, break. This check is primarily for cases where
        // `item.weight === remainingCapacity` leading to `currentWeight === capacity`.
        if (currentWeight === capacity) {
            break;
        }
    }

    // Return the maximum total value and the list of items (or fractions) taken.
    // Use toFixed to avoid floating point precision issues for comparison, if exact numbers are needed.
    return { maxValue: parseFloat(totalValue.toFixed(4)), itemsTaken };
}

// --- Brute Force vs. Optimized (Greedy) Discussion ---
/*
* Brute Force Approach:
*   For the 0/1 Knapsack problem (where items cannot be fractured), a brute force
*   approach would involve checking all 2^N subsets of items to find the one that
*   fits within capacity and maximizes value. This is O(2^N).
*   For Fractional Knapsack, brute force is less clearly defined in the same way
*   because of fractions. One might think of it as iterating through items, and for
*   each item considering taking 0% to 100% in small increments, which would be
*   even more complex. Dynamic Programming is typically used for 0/1 Knapsack.

* Optimized (Greedy) Approach:
*   The greedy strategy is optimal for the Fractional Knapsack Problem.
*   Proof of Optimality (informal exchange argument):
*   Suppose there is an optimal solution `OPT` that does not follow the greedy strategy.
*   This means `OPT` contains items `i` and `j` such that `ratio_i < ratio_j`, but `OPT`
*   either takes more of `i` than `j` (if both are taken partially), or takes `i` fully
*   while only taking `j` partially or not at all, when `j` could have been taken more.
*   We can "exchange" a small amount of `i` for an equal amount of weight of `j`.
*   Let `delta_w` be a small weight. If we remove `delta_w` of item `i` (value `delta_w * ratio_i`)
*   and add `delta_w` of item `j` (value `delta_w * ratio_j`), the total weight remains the same.
*   Since `ratio_j > ratio_i`, the value gained (`delta_w * ratio_j`) is greater than
*   the value lost (`delta_w * ratio_i`). This increases the total value of the solution
*   without exceeding capacity, contradicting the optimality of `OPT`.
*   Therefore, an optimal solution must always prioritize items with higher value-to-weight ratios.
*/

// --- ASCII Art Diagram for Fractional Knapsack Logic ---
/*
Knapsack Capacity: C=50

Items:
  Item A: Value=60, Weight=10  (Ratio = 6)
  Item B: Value=100, Weight=20 (Ratio = 5)
  Item C: Value=120, Weight=30 (Ratio = 4)
  Item D: Value=15,  Weight=5   (Ratio = 3)

Sorted by Ratio (descending): A (6), B (5), C (4), D (3)

Knapsack:
+-------------------------------------------------+
|                                                 | Capacity = 50
+-------------------------------------------------+

1. Pick Item A (Ratio 6, Weight 10, Value 60)
   - Capacity remaining: 50 - 10 = 40
   - Total Value: 60
   - Items Taken: [A (100%)]
+-------------------------------------------------+
|AAAAA AAAAA                                      | Capacity = 40
+-------------------------------------------------+

2. Pick Item B (Ratio 5, Weight 20, Value 100)
   - Capacity remaining: 40 - 20 = 20
   - Total Value: 60 + 100 = 160
   - Items Taken: [A (100%), B (100%)]
+-------------------------------------------------+
|AAAAA AAAAABBBBB BBBBB BBBBB BBBBB              | Capacity = 20
+-------------------------------------------------+

3. Pick Item C (Ratio 4, Weight 30, Value 120)
   - Capacity remaining: 20. Item C weight = 30.
   - Take 20/30 (2/3) of Item C.
   - Weight taken = (2/3) * 30 = 20
   - Value added = (2/3) * 120 = 80
   - Capacity remaining: 20 - 20 = 0
   - Total Value: 160 + 80 = 240
   - Items Taken: [A (100%), B (100%), C (66.67%)]
+-------------------------------------------------+
|AAAAA AAAAABBBBB BBBBB BBBBB BBBBBCCCCC CCCCC   | Capacity = 0
+-------------------------------------------------+

Knapsack is full. Max Value = 240. Items Taken: A (100%), B (100%), C (2/3)
*/
```