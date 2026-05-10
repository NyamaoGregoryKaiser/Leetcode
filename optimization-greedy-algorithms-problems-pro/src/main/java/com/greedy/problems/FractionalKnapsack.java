package com.greedy.problems;

import com.greedy.utils.DataStructures.Item;

import java.util.Arrays;
import java.util.Comparator;

/**
 * **Problem: Fractional Knapsack Problem**
 *
 * Given a set of items, each with a weight `w_i` and a value `v_i`,
 * and a knapsack with a maximum capacity `W`.
 * The goal is to choose items to put into the knapsack such that the total
 * value is maximized, and the total weight does not exceed `W`.
 *
 * **Key Difference from 0/1 Knapsack:**
 * In Fractional Knapsack, we can take *fractions* of items. This means we can
 * take a portion of an item's weight and get a proportional fraction of its value.
 * This ability to take fractions is what makes a greedy approach optimal.
 * In 0/1 Knapsack (where items must be taken whole or not at all), a greedy approach
 * does not work, and Dynamic Programming or branch-and-bound is required.
 *
 * **Greedy Strategy:**
 * The greedy choice is to prioritize items that offer the most value per unit of weight.
 * 1. Calculate the value-to-weight ratio (v/w) for each item.
 * 2. Sort the items in descending order based on this ratio.
 * 3. Iterate through the sorted items. For each item:
 *    a. If the item can fit entirely into the remaining knapsack capacity, take it whole.
 *    b. If the item cannot fit entirely, take a fraction of it to fill the remaining capacity.
 * 4. Stop when the knapsack is full.
 *
 * **Why this greedy strategy works (Informal Proof/Intuition):**
 * **Greedy Choice Property:** Suppose there is an optimal solution `OPT` that does not follow
 * the greedy strategy (i.e., it includes an item `A` with a lower value/weight ratio
 * while excluding an item `B` with a higher value/weight ratio, where `B` could have been taken
 * instead of `A` or a part of `A`).
 * We can "swap" a portion of `A` with `B`. If we replace `x` units of weight of `A` with `x` units
 * of weight of `B`, the total weight remains the same. Since `B` has a higher `v/w` ratio, the total
 * value will either increase or stay the same. This shows we can always transform `OPT` into another
 * optimal solution that follows the greedy choice.
 *
 * **Optimal Substructure Property:** If we take a certain amount of an item (either whole or fractional),
 * the problem reduces to a smaller knapsack capacity and the remaining items. The optimal solution
 * for this subproblem, combined with the item(s) already taken, forms the optimal solution for the original problem.
 */
public class FractionalKnapsack {

    /**
     * Solves the Fractional Knapsack Problem using a greedy approach.
     *
     * @param capacity The maximum weight capacity of the knapsack.
     * @param items    An array of Item objects, each with a weight and a value.
     * @return The maximum total value that can be obtained.
     */
    public double solveFractionalKnapsack(int capacity, Item[] items) {
        // Handle edge cases
        if (capacity <= 0 || items == null || items.length == 0) {
            return 0.0;
        }

        // Step 1 & 2: Sort items by value-per-weight ratio in descending order.
        // We use a custom comparator.
        Arrays.sort(items, Comparator.comparingDouble((Item item) -> item.valuePerWeight).reversed());

        double totalValue = 0.0;
        int remainingCapacity = capacity;

        // Step 3: Iterate through the sorted items.
        for (Item item : items) {
            // If the knapsack has no more capacity, stop.
            if (remainingCapacity <= 0) {
                break;
            }

            // Case a: Item can be taken whole.
            if (item.weight <= remainingCapacity) {
                totalValue += item.value;
                remainingCapacity -= item.weight;
                // System.out.println("Took whole: " + item + ", Remaining Capacity: " + remainingCapacity); // Debug
            }
            // Case b: Item cannot be taken whole, take a fraction.
            else {
                // Calculate the fraction of the item that can be taken.
                double fraction = (double) remainingCapacity / item.weight;
                totalValue += fraction * item.value;
                remainingCapacity = 0; // Knapsack is now full.
                // System.out.println("Took fraction: " + fraction + " of " + item + ", Remaining Capacity: " + remainingCapacity); // Debug
            }
        }

        return totalValue;
    }

    /**
     * **Time Complexity Analysis:**
     * - Calculating value-per-weight for each item: O(N), where N is the number of items.
     *   (This is done during Item object creation, or can be done in a loop before sorting).
     * - Sorting the items: O(N log N) due to `Arrays.sort`. This is the dominant factor.
     * - Iterating through sorted items to fill the knapsack: O(N), as each item is processed once.
     * - Overall Time Complexity: O(N log N).
     *
     * **Space Complexity Analysis:**
     * - Storing the items: O(N) for the input array.
     * - Sorting: `Arrays.sort` for objects uses O(log N) to O(N) auxiliary space depending on the implementation
     *   (e.g., Timsort used by Java might be O(N) in worst case for scratch array).
     * - Variables: O(1) for `totalValue`, `remainingCapacity`, etc.
     * - Overall Space Complexity: O(N) (due to input array and potential sort overhead).
     */

    /**
     * **Contrast with 0/1 Knapsack (Dynamic Programming):**
     *
     * In the 0/1 Knapsack problem, items cannot be broken. A greedy approach based on value/weight ratio
     * fails. For example:
     * Capacity W = 50
     * Items:
     *   A: {W=10, V=60}, Ratio=6
     *   B: {W=20, V=100}, Ratio=5
     *   C: {W=30, V=120}, Ratio=4
     *
     * Greedy (by ratio):
     * 1. Take A (W=10, V=60). Remaining W=40. Total V=60.
     * 2. Take B (W=20, V=100). Remaining W=20. Total V=160.
     * 3. Cannot take C.
     * Total Value = 160.
     *
     * Optimal (0/1):
     * Take B and C. (W=20+30=50, V=100+120=220).
     * Total Value = 220.
     *
     * This example clearly shows why greedy fails for 0/1 Knapsack.
     * The 0/1 Knapsack problem typically requires Dynamic Programming (O(N*W))
     * or a more complex algorithm like branch and bound for optimality.
     */
}