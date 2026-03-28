```cpp
#include <iostream>
#include <vector>
#include <algorithm> // For std::max
#include <chrono>    // For benchmarking
#include <numeric>   // For std::iota

/**
 * @file knapsack_brute_force.cpp
 * @brief Brute-force (recursive) solution for the 0/1 Knapsack Problem.
 *
 * This implementation exhaustively explores all possible subsets of items
 * to find the one that maximizes total value without exceeding capacity.
 * This demonstrates why a simple greedy approach doesn't work for 0/1 Knapsack
 * and highlights the exponential complexity.
 */

/**
 * @brief Struct to represent an item with weight and value.
 */
struct Item01 {
    int weight;
    int value;
    int id; // For identification

    Item01(int w = 0, int v = 0, int i = 0) : weight(w), value(v), id(i) {}
};

/**
 * @brief Solves the 0/1 Knapsack Problem using a recursive brute-force approach.
 *
 * For each item, there are two choices: either include it in the knapsack or not.
 * This function explores all such combinations.
 *
 * @param items A vector of `Item01` objects.
 * @param capacity The maximum capacity of the knapsack.
 * @param item_index The current item being considered (starts from the last item and goes down).
 * @return The maximum total value that can be obtained.
 *
 * @complexity
 *   - Time: O(2^N), where N is the number of items. This is because for each item,
 *           we make two recursive calls (include or exclude).
 *   - Space: O(N) for the recursion stack depth.
 */
int knapsackBruteForceRecursive(const std::vector<Item01>& items, int capacity, int item_index) {
    // Base Case 1: If no items left or capacity is 0, no more value can be added.
    if (item_index < 0 || capacity <= 0) {
        return 0;
    }

    // Base Case 2: If the current item's weight exceeds the remaining capacity,
    // we cannot include it. Move to the next item (without including this one).
    if (items[item_index].weight > capacity) {
        return knapsackBruteForceRecursive(items, capacity, item_index - 1);
    }

    // Recursive Step: Consider two possibilities for the current item:
    // 1. Include the current item: Add its value and recurse with reduced capacity and next item.
    int value_if_included = items[item_index].value +
                            knapsackBruteForceRecursive(items, capacity - items[item_index].weight, item_index - 1);

    // 2. Exclude the current item: Recurse with the same capacity and next item.
    int value_if_excluded = knapsackBruteForceRecursive(items, capacity, item_index - 1);

    // Return the maximum of these two possibilities.
    return std::max(value_if_included, value_if_excluded);
}

// Wrapper function to start the recursion from the last item
int knapsackBruteForce(const std::vector<Item01>& items, int capacity) {
    if (items.empty() || capacity <= 0) {
        return 0;
    }
    return knapsackBruteForceRecursive(items, capacity, items.size() - 1);
}


int main() {
    std::cout << "--- 0/1 Knapsack Problem: Brute-Force Solution ---" << std::endl;

    // Example 1: Small set of items
    std::vector<Item01> items1 = {
        Item01(10, 60, 1), // Ratio 6
        Item01(20, 100, 2), // Ratio 5
        Item01(30, 120, 3)  // Ratio 4
    };
    int capacity1 = 50;

    std::cout << "\nExample 1:" << std::endl;
    std::cout << "Items (Weight, Value): ";
    for (const auto& item : items1) {
        std::cout << "(" << item.weight << ", " << item.value << ") ";
    }
    std::cout << "\nKnapsack Capacity: " << capacity1 << std::endl;

    auto start1 = std::chrono::high_resolution_clock::now();
    int max_value1 = knapsackBruteForce(items1, capacity1);
    auto end1 = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> elapsed1 = end1 - start1;

    std::cout << "Maximum value (Brute Force): " << max_value1 << std::endl; // Expected: 220 (Items 1 and 3: 10+30=40 weight, 60+120=180 value. Then Item 2 is left 20, 100.
                                                                           // Items 2 and 3: 20+30=50 weight, 100+120=220 value. This is optimal.)
    std::cout << "Time taken: " << elapsed1.count() * 1000.0 << " ms" << std::endl;

    // Example 2: More items to demonstrate exponential growth
    std::vector<Item01> items2 = {
        Item01(2, 3, 1), Item01(3, 4, 2), Item01(4, 5, 3), Item01(5, 6, 4),
        Item01(1, 2, 5), Item01(3, 5, 6), Item01(2, 4, 7), Item01(6, 7, 8),
        Item01(7, 8, 9), Item01(8, 9, 10), Item01(9, 10, 11), Item01(10, 12, 12)
    };
    int capacity2 = 30; // Max N of 12 for 2^12 = 4096 calls, manageable.

    std::cout << "\nExample 2: " << items2.size() << " items" << std::endl;
    std::cout << "Knapsack Capacity: " << capacity2 << std::endl;

    auto start2 = std::chrono::high_resolution_clock::now();
    int max_value2 = knapsackBruteForce(items2, capacity2);
    auto end2 = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> elapsed2 = end2 - start2;

    std::cout << "Maximum value (Brute Force): " << max_value2 << std::endl;
    std::cout << "Time taken: " << elapsed2.count() * 1000.0 << " ms" << std::endl;

    // Try a larger N (e.g., 20 items) might take too long for interactive demo
    // std::vector<Item01> items3;
    // for (int i = 0; i < 20; ++i) {
    //     items3.emplace_back(rand() % 10 + 1, rand() % 20 + 1, i);
    // }
    // int capacity3 = 50;
    // std::cout << "\nExample 3: " << items3.size() << " items (Might take long)" << std::endl;
    // auto start3 = std::chrono::high_resolution_clock::now();
    // int max_value3 = knapsackBruteForce(items3, capacity3);
    // auto end3 = std::chrono::high_resolution_clock::now();
    // std::chrono::duration<double> elapsed3 = end3 - start3;
    // std::cout << "Maximum value (Brute Force): " << max_value3 << std::endl;
    // std::cout << "Time taken: " << elapsed3.count() << " seconds" << std::endl;


    std::cout << "\nNote: For 0/1 Knapsack, the greedy approach (sorting by value/weight ratio)"
              << " does NOT guarantee an optimal solution. Dynamic Programming or Branch and Bound are typically used for optimal solutions." << std::endl;

    return 0;
}

```