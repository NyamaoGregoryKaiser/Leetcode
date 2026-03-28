```cpp
#include <iostream>
#include <vector>
#include <algorithm> // For std::sort
#include <iomanip>   // For std::fixed, std::setprecision
#include <numeric>   // For std::iota

// Include the Fractional Knapsack greedy implementation
// Note: This needs to be compiled with greedy_algorithms.cpp
// g++ -std=c++17 -O2 -Wall brute_force_vs_greedy/knapsack_greedy_comparison.cpp src/greedy_algorithms.cpp -Isrc/utils -o knapsack_greedy_comparison
#include "../src/greedy_algorithms.cpp" // Includes Item and fractionalKnapsack

/**
 * @file knapsack_greedy_comparison.cpp
 * @brief Demonstrates the greedy approach for Fractional Knapsack and explains
 *        why it typically fails for the 0/1 Knapsack problem.
 *
 * This file explicitly compares the output of a greedy strategy (based on value/weight ratio)
 * for the 0/1 Knapsack versus the optimal solution (which often comes from DP or brute-force
 * for small N).
 */

/**
 * @brief Represents an item for 0/1 Knapsack with weight, value, and ratio.
 *        Same structure as Item in greedy_algorithms.cpp, but here for clarity.
 */
struct Item01_Comp {
    int weight;
    int value;
    double ratio; // value / weight
    int id;       // Original ID for tracking

    Item01_Comp(int w = 0, int v = 0, int i = 0) : weight(w), value(v), id(i) {
        if (w > 0) {
            ratio = static_cast<double>(v) / w;
        } else {
            ratio = 0.0;
        }
    }

    // Sort by ratio in descending order
    bool operator<(const Item01_Comp& other) const {
        return ratio > other.ratio;
    }
};

/**
 * @brief A greedy approach for 0/1 Knapsack based on value-to-weight ratio.
 *        This is NOT optimal for 0/1 Knapsack. It's provided to show the failure.
 *
 * @param items A vector of `Item01_Comp` objects.
 * @param capacity The maximum capacity of the knapsack.
 * @return The total value obtained by this sub-optimal greedy strategy.
 *
 * @complexity
 *   - Time: O(N log N) due to sorting.
 *   - Space: O(N) for sorting if copy is made.
 */
double knapsack01GreedySuboptimal(std::vector<Item01_Comp> items, int capacity) {
    if (items.empty() || capacity <= 0) {
        return 0.0;
    }

    // Sort items by value-to-weight ratio in descending order
    std::sort(items.begin(), items.end());

    double total_value = 0.0;
    int current_capacity = capacity;

    std::cout << "  Greedy (0/1) Selection Order (by Ratio):" << std::endl;

    for (const auto& item : items) {
        if (current_capacity <= 0) {
            break;
        }

        // For 0/1 Knapsack, we must take the whole item or none.
        if (item.weight <= current_capacity) {
            total_value += item.value;
            current_capacity -= item.weight;
            std::cout << "    - Took Item ID " << item.id << " (W:" << item.weight << ", V:" << item.value << ", R:" << std::fixed << std::setprecision(2) << item.ratio << "). Remaining capacity: " << current_capacity << std::endl;
        } else {
            std::cout << "    - Skipped Item ID " << item.id << " (W:" << item.weight << ", V:" << item.value << ", R:" << std::fixed << std::setprecision(2) << item.ratio << ") (too heavy)." << std::endl;
        }
    }
    return total_value;
}


int main() {
    std::cout << "--- Knapsack Problem Comparison: Fractional vs. 0/1 Greedy vs. 0/1 Optimal ---" << std::endl;

    // --- Scenario 1: Where 0/1 Greedy fails to be optimal ---
    // This is a classic example:
    // Items: A(w=10, v=60), B(w=20, v=100), C(w=30, v=120)
    // Ratios: A:6, B:5, C:4
    // Capacity: 50
    //
    // Optimal 0/1 solution: Take B and C (20+30=50 weight, 100+120=220 value).
    // Greedy 0/1 solution:
    // 1. Take A (w=10, v=60). Cap: 40.
    // 2. Take B (w=20, v=100). Cap: 20.
    // 3. Skip C (w=30 > Cap=20).
    // Total value: 60+100=160. This is sub-optimal.

    std::cout << "\n--- Scenario 1: Greedy 0/1 is Suboptimal ---" << std::endl;
    std::vector<Item01_Comp> items01_scenario1 = {
        Item01_Comp(10, 60, 1),
        Item01_Comp(20, 100, 2),
        Item01_Comp(30, 120, 3)
    };
    int capacity_scenario1 = 50;

    std::cout << "Items (W, V, Ratio):" << std::endl;
    for (const auto& item : items01_scenario1) {
        std::cout << "  ID " << item.id << ": (" << item.weight << ", " << item.value << ", " << std::fixed << std::setprecision(2) << item.ratio << ")" << std::endl;
    }
    std::cout << "Knapsack Capacity: " << capacity_scenario1 << std::endl;

    // Run 0/1 Knapsack with sub-optimal greedy strategy
    double greedy_01_value = knapsack01GreedySuboptimal(items01_scenario1, capacity_scenario1);
    std::cout << "0/1 Knapsack (Greedy by Ratio) Value: " << std::fixed << std::setprecision(2) << greedy_01_value << std::endl;
    std::cout << "Optimal 0/1 Knapsack Value (known): 220.00 (Items 2 and 3)" << std::endl;
    std::cout << "Conclusion: Greedy for 0/1 Knapsack fails here. It yields 160.00 vs optimal 220.00." << std::endl;

    // Run Fractional Knapsack (optimal greedy strategy)
    // Convert Item01_Comp to Item struct for fractionalKnapsack
    std::vector<Item> fractional_items_scenario1;
    for(const auto& item : items01_scenario1) {
        fractional_items_scenario1.emplace_back(item.weight, item.value);
    }
    double fractional_value = fractionalKnapsack(fractional_items_scenario1, capacity_scenario1);
    std::cout << "\nFractional Knapsack (Greedy by Ratio) Value: " << std::fixed << std::setprecision(2) << fractional_value << std::endl;
    // Expected fractional: 60 (Item 1) + 100 (Item 2) + (20/30)*120 (fraction of Item 3) = 60 + 100 + 80 = 240.00
    std::cout << "Conclusion: Fractional Knapsack's greedy strategy is optimal, yielding 240.00." << std::endl;


    // --- Scenario 2: Where 0/1 Greedy *might* produce an optimal result by chance ---
    // It's possible for greedy 0/1 to produce the optimal solution for *some* test cases,
    // but this doesn't mean the algorithm is generally optimal.
    std::cout << "\n--- Scenario 2: Greedy 0/1 happens to be Optimal ---" << std::endl;
    std::vector<Item01_Comp> items01_scenario2 = {
        Item01_Comp(10, 100, 1), // Ratio 10
        Item01_Comp(1, 1, 2),    // Ratio 1
        Item01_Comp(1, 1, 3),    // Ratio 1
        Item01_Comp(1, 1, 4),    // Ratio 1
    };
    int capacity_scenario2 = 10;

    std::cout << "Items (W, V, Ratio):" << std::endl;
    for (const auto& item : items01_scenario2) {
        std::cout << "  ID " << item.id << ": (" << item.weight << ", " << item.value << ", " << std::fixed << std::setprecision(2) << item.ratio << ")" << std::endl;
    }
    std::cout << "Knapsack Capacity: " << capacity_scenario2 << std::endl;

    double greedy_01_value2 = knapsack01GreedySuboptimal(items01_scenario2, capacity_scenario2);
    std::cout << "0/1 Knapsack (Greedy by Ratio) Value: " << std::fixed << std::setprecision(2) << greedy_01_value2 << std::endl;
    std::cout << "Optimal 0/1 Knapsack Value (known): 100.00 (Item 1)" << std::endl;
    std::cout << "Conclusion: In this specific case, greedy 0/1 happens to find the optimal solution by taking the item with highest ratio." << std::endl;


    std::cout << "\nSummary:" << std::endl;
    std::cout << "The Fractional Knapsack problem can be optimally solved using a greedy approach "
              << "(by sorting items based on their value-to-weight ratio)." << std::endl;
    std::cout << "The 0/1 Knapsack problem (where items cannot be broken) CANNOT generally be "
              << "solved optimally by the same greedy strategy. It requires dynamic programming or "
              << "branch and bound for an optimal solution." << std::endl;

    return 0;
}

```