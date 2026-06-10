```javascript
/**
 * @fileoverview Implementation of the Fractional Knapsack Problem using a Greedy approach.
 *
 * Problem Description:
 * Given a set of items, each with a weight and a value, and a knapsack with a
 * maximum weight capacity. The goal is to maximize the total value of items
 * that can be put into the knapsack. Unlike the 0/1 Knapsack problem, items
 * can be broken down, meaning we can take fractions of items.
 *
 * Example:
 * Items: [{ weight: 10, value: 60 }, { weight: 20, value: 100 }, { weight: 30, value: 120 }]
 * Knapsack Capacity: 50
 *
 * Value/Weight Ratios:
 * Item 1: 60/10 = 6
 * Item 2: 100/20 = 5
 * Item 3: 120/30 = 4
 *
 * Greedy Solution:
 * 1. Take 10kg of Item 1 (value 60). Remaining capacity: 40. Total value: 60.
 * 2. Take 20kg of Item 2 (value 100). Remaining capacity: 20. Total value: 60 + 100 = 160.
 * 3. Take 20kg (2/3 fraction) of Item 3 (value 120 * (20/30) = 80). Remaining capacity: 0. Total value: 160 + 80 = 240.
 *
 * Optimal Solution: 240
 *
 * Greedy Choice Property:
 * The optimal strategy for the Fractional Knapsack problem is to always pick
 * the item (or fraction of an item) that has the highest value-to-weight ratio
 * (also known as density). This is because by taking items with higher density,
 * we are maximizing the value gained per unit of weight, thus ensuring the
 * most efficient use of the knapsack's limited capacity.
 *
 * Proof of Correctness (Intuition via Exchange Argument):
 * Assume there is an optimal solution `OPT` that does not follow the greedy strategy.
 * This means `OPT` contains less of an item `i` with a higher value-to-weight ratio (`vi/wi`)
 * and/or more of an item `j` with a lower value-to-weight ratio (`vj/wj`) than the greedy solution `G`.
 *
 * Let `vi/wi > vj/wj`.
 * In `OPT`, suppose we took `x_i` of item `i` and `x_j` of item `j`.
 * In `G`, we would have taken `x_i'` of item `i` and `x_j'` of item `j`, where `x_i' >= x_i` and `x_j' <= x_j`.
 *
 * Consider swapping a small amount `delta_w` of item `j` from `OPT` with an equal amount `delta_w` of item `i`.
 * This swap is possible if `OPT` took some `j` that `G` didn't (or less of `i` that `G` did).
 * The weight in the knapsack remains the same (`+delta_w` of `i`, `-delta_w` of `j`).
 * The change in total value would be `(delta_w / w_i) * v_i - (delta_w / w_j) * v_j`
 * which simplifies to `delta_w * (v_i/w_i - v_j/w_j)`.
 * Since `v_i/w_i > v_j/w_j`, this difference is positive.
 * Thus, by making this swap, we can increase the total value without exceeding the capacity.
 * We can continue such swaps until the solution matches the greedy one, proving that
 * the greedy strategy is optimal.
 */

/**
 * Solves the Fractional Knapsack problem to maximize total value within capacity.
 *
 * @param {number} capacity - The maximum weight capacity of the knapsack.
 * @param {Array<Object>} items - An array of item objects.
 *   Each item object must have 'weight' and 'value' properties (numbers).
 *   Example: [{ weight: 10, value: 60 }, { weight: 20, value: 100 }]
 * @returns {Object} An object containing:
 *   - {number} totalValue: The maximum total value achievable.
 *   - {Array<Object>} selectedItems: An array of objects, each with item details and 'fraction' taken.
 *     Example: [{ item: { weight: 10, value: 60 }, fraction: 1 }]
 *
 * Time Complexity: O(N log N) due to sorting, where N is the number of items.
 *                  The iteration takes O(N) time.
 * Space Complexity: O(N) for storing augmented items and the result array.
 */
function fractionalKnapsack(capacity, items) {
  // Edge case: If capacity is 0 or no items, return 0 value and empty items.
  if (capacity <= 0 || !items || items.length === 0) {
    return { totalValue: 0, selectedItems: [] };
  }

  // 1. Calculate the value-to-weight ratio for each item.
  // Store this ratio along with the original item data.
  const augmentedItems = items.map(item => ({
    ...item,
    ratio: item.value / item.weight
  }));

  // 2. Sort the items by their value-to-weight ratio in descending order.
  // This is the core greedy step.
  augmentedItems.sort((a, b) => b.ratio - a.ratio);

  let totalValue = 0;
  let currentCapacity = capacity;
  const selectedItems = [];

  // 3. Iterate through the sorted items and fill the knapsack.
  for (const item of augmentedItems) {
    // If the current item's weight is less than or equal to the remaining capacity,
    // take the whole item.
    if (item.weight <= currentCapacity) {
      selectedItems.push({ item: { ...item }, fraction: 1 });
      totalValue += item.value;
      currentCapacity -= item.weight;
    } else {
      // If the current item's weight is greater than the remaining capacity,
      // take a fraction of the item to fill the knapsack completely.
      const fraction = currentCapacity / item.weight;
      selectedItems.push({ item: { ...item }, fraction: fraction });
      totalValue += item.value * fraction;
      currentCapacity = 0; // Knapsack is now full.
      break; // No more capacity left, stop iterating.
    }
  }

  // Return the total maximized value and the list of selected items/fractions.
  return {
    totalValue: parseFloat(totalValue.toFixed(4)), // Use toFixed for precision with floats
    selectedItems: selectedItems.map(si => ({
        ...si,
        item: {
            id: si.item.id, // Ensure id is carried through if present
            weight: si.item.weight,
            value: si.item.value
        },
        fraction: parseFloat(si.fraction.toFixed(4))
    }))
  };
}

export default fractionalKnapsack;
```