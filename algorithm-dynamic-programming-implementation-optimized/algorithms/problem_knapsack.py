"""
Problem: 0/1 Knapsack Problem

Given a set of items, each with a weight and a value, determine the number of each
item to include in a collection so that the total weight is less than or equal to
a given capacity and the total value is as large as possible.

This is the 0/1 Knapsack problem, meaning each item can either be fully included (1)
or not included at all (0). We cannot take fractions of items.

Input:
- `weights`: A list of integers representing the weights of items.
- `values`: A list of integers representing the values of items.
- `capacity`: An integer representing the maximum weight capacity of the knapsack.

Output:
- The maximum total value that can be obtained.
"""

def knapsack_recursive(weights: list[int], values: list[int], capacity: int) -> int:
    """
    Approach 1: Brute Force Recursion
    Calculates the maximum value using pure recursion.

    Logic:
    For each item, we have two choices:
    1. Include the item: If its weight is less than or equal to the remaining capacity.
       In this case, its value is added, and we recursively solve for the remaining items
       with reduced capacity.
    2. Exclude the item: We recursively solve for the remaining items with the same capacity.

    The base cases are when there are no items left or the capacity becomes 0.

    This approach recomputes the same subproblems multiple times, leading to
    exponential time complexity.

    Time Complexity: O(2^n) - Where 'n' is the number of items. Each item presents
                     two choices, leading to an exponential search space.
    Space Complexity: O(n) - Due to the recursion stack depth.
    """
    n = len(weights)
    if n != len(values):
        raise ValueError("Weights and values lists must have the same length.")

    def solve(idx: int, current_capacity: int) -> int:
        # Base case: No items left or capacity is exhausted
        if idx == n or current_capacity == 0:
            return 0

        # If current item's weight exceeds remaining capacity, we must exclude it
        if weights[idx] > current_capacity:
            return solve(idx + 1, current_capacity)
        else:
            # Option 1: Include the current item
            # Add its value and recurse with reduced capacity and next item
            include_item_value = values[idx] + solve(idx + 1, current_capacity - weights[idx])

            # Option 2: Exclude the current item
            # Recurse with same capacity and next item
            exclude_item_value = solve(idx + 1, current_capacity)

            # Return the maximum of the two options
            return max(include_item_value, exclude_item_value)

    return solve(0, capacity)


def knapsack_memoization(weights: list[int], values: list[int], capacity: int) -> int:
    """
    Approach 2: Memoization (Top-Down Dynamic Programming)
    Calculates the maximum value using recursion with memoization.

    Logic:
    Similar to the brute force recursive approach, but we store the results of
    subproblems in a `memo` table (a 2D array or dictionary).
    The state of a subproblem is defined by `(idx, current_capacity)`.
    Before computing `solve(idx, current_capacity)`, we check if `memo[idx][current_capacity]`
    is already computed. If it is, return the stored value. Otherwise, compute it,
    store it, and then return.

    This avoids redundant computations, transforming the time complexity from exponential
    to polynomial.

    Time Complexity: O(n * W) - Where 'n' is the number of items and 'W' is the capacity.
                     Each state `(idx, current_capacity)` is computed once.
    Space Complexity: O(n * W) - For the memoization table and the recursion stack.
    """
    n = len(weights)
    if n != len(values):
        raise ValueError("Weights and values lists must have the same length.")

    # Initialize a 2D memoization table with -1 (or None) to indicate uncomputed states
    # memo[idx][current_capacity] stores the max value for items from 'idx' onwards
    # with 'current_capacity'.
    memo = [[-1] * (capacity + 1) for _ in range(n)]

    def solve(idx: int, current_capacity: int) -> int:
        # Base case: No items left or capacity is exhausted
        if idx == n or current_capacity == 0:
            return 0

        # If this state has already been computed, return the cached result
        if memo[idx][current_capacity] != -1:
            return memo[idx][current_capacity]

        # Option 1: If current item's weight exceeds remaining capacity, we must exclude it
        if weights[idx] > current_capacity:
            memo[idx][current_capacity] = solve(idx + 1, current_capacity)
        else:
            # Option 2: Choose between including or excluding the current item
            include_item_value = values[idx] + solve(idx + 1, current_capacity - weights[idx])
            exclude_item_value = solve(idx + 1, current_capacity)
            memo[idx][current_capacity] = max(include_item_value, exclude_item_value)

        return memo[idx][current_capacity]

    return solve(0, capacity)


def knapsack_tabulation(weights: list[int], values: list[int], capacity: int) -> int:
    """
    Approach 3: Tabulation (Bottom-Up Dynamic Programming)
    Calculates the maximum value using an iterative approach with a 2D DP table.

    Logic:
    We create a 2D DP table `dp` where `dp[i][w]` represents the maximum value
    that can be obtained with the first `i` items (items from index 0 to `i-1`)
    and a knapsack capacity of `w`.

    The table is filled row by row (for each item) and column by column (for each capacity).
    The recurrence relation is:
    `dp[i][w] = dp[i-1][w]` (if item `i-1` is excluded)
    `dp[i][w] = max(dp[i-1][w], values[i-1] + dp[i-1][w - weights[i-1]])`
    (if item `i-1` is included, provided `weights[i-1] <= w`)

    Base cases:
    - `dp[0][w] = 0` for all `w` (no items, no value).
    - `dp[i][0] = 0` for all `i` (capacity 0, no value).

    The final answer is `dp[n][capacity]`.

    Time Complexity: O(n * W) - Two nested loops, one for items and one for capacity.
    Space Complexity: O(n * W) - For the 2D DP table.
    """
    n = len(weights)
    if n != len(values):
        raise ValueError("Weights and values lists must have the same length.")

    # dp[i][w] will store the maximum value for first 'i' items with capacity 'w'
    # 'i' ranges from 0 to n (n+1 rows)
    # 'w' ranges from 0 to capacity (capacity+1 columns)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    # Fill the DP table
    # Iterate through each item (from 1 to n)
    for i in range(1, n + 1):
        # Iterate through each possible capacity (from 0 to W)
        for w in range(capacity + 1):
            # Current item's weight and value (using i-1 because weights/values are 0-indexed)
            current_weight = weights[i - 1]
            current_value = values[i - 1]

            # Option 1: Don't include the current item (same as max value with previous i-1 items)
            dp[i][w] = dp[i - 1][w]

            # Option 2: Include the current item if it fits
            if current_weight <= w:
                # Compare not including (dp[i-1][w]) with including (value + dp[i-1][remaining_capacity])
                dp[i][w] = max(dp[i][w], current_value + dp[i - 1][w - current_weight])

    return dp[n][capacity]


def knapsack_space_optimized(weights: list[int], values: list[int], capacity: int) -> int:
    """
    Approach 4: Space-Optimized Tabulation
    Calculates the maximum value using an iterative approach with O(W) space complexity.

    Logic:
    Observe that in the tabulation approach, to compute `dp[i][w]`, we only need
    values from the previous row (`dp[i-1][...]`). This means we don't need to
    store the entire 2D table. We can optimize space by using only two rows
    (current and previous) or even a single 1D array.

    Using a single 1D array `dp_current` of size `capacity + 1`:
    `dp_current[w]` will store the maximum value for the current set of items
    with capacity `w`.
    When processing a new item, we update `dp_current` values.
    To ensure we use values from the *previous* state for `dp_current[w - current_weight]`,
    we must iterate the `w` loop in *reverse* order (from `capacity` down to `current_weight`).
    If we iterate forwards, `dp_current[w - current_weight]` would already be updated
    with the *current* item, leading to taking the same item multiple times (unbounded knapsack).

    Time Complexity: O(n * W) - Two nested loops.
    Space Complexity: O(W) - For the 1D DP array.
    """
    n = len(weights)
    if n != len(values):
        raise ValueError("Weights and values lists must have the same length.")

    # dp[w] will store the maximum value for current items with capacity 'w'
    # Initialize with 0s.
    dp_current = [0] * (capacity + 1)

    # Iterate through each item
    for i in range(n):
        current_weight = weights[i]
        current_value = values[i]

        # Iterate through capacity from right to left
        # This is crucial: we need to use values from the previous row (or previous item's state)
        # when calculating `dp_current[w - current_weight]`.
        # By iterating right-to-left, `dp_current[w - current_weight]` still holds
        # the value *before* considering the current item (or from previous item's row).
        for w in range(capacity, current_weight - 1, -1):
            # max(
            #   dp_current[w],                                  # Don't include current item
            #   current_value + dp_current[w - current_weight]  # Include current item
            # )
            dp_current[w] = max(dp_current[w], current_value + dp_current[w - current_weight])

    return dp_current[capacity]


# Example usage:
if __name__ == "__main__":
    test_cases = [
        ([1, 2, 3], [6, 10, 12], 5, 22), # Items: (w=1,v=6), (w=2,v=10), (w=3,v=12), Capacity=5. Expected: 10+12=22 (items 2 and 3)
        ([1, 3, 4, 5], [1, 4, 5, 7], 7, 9), # Items: (w=1,v=1), (w=3,v=4), (w=4,v=5), (w=5,v=7), Capacity=7. Expected: 3+4=9 (items 3 and 4)
        ([2, 3, 4, 5], [3, 4, 5, 6], 5, 7), # Items: (w=2,v=3), (w=3,v=4), (w=4,v=5), (w=5,v=6), Capacity=5. Expected: 2+3=7 (items 2 and 3)
        ([10, 20, 30], [60, 100, 120], 50, 220), # Items: (w=10,v=60), (w=20,v=100), (w=30,v=120), Capacity=50. Expected: 10+20=180 (incorrect: 20+30=220)
        ([], [], 10, 0), # No items
        ([100], [10], 50, 0), # Item too heavy
        ([10], [100], 10, 100), # Single item fits
        ([10], [100], 5, 0), # Single item doesn't fit
    ]

    print("--- 0/1 Knapsack Problem ---")

    for weights, values, capacity, expected in test_cases:
        print(f"\nItems (W,V): {list(zip(weights, values))}, Capacity: {capacity}")
        print(f"  Expected Max Value: {expected}")
        print(f"  Recursive (Brute Force): {knapsack_recursive(weights, values, capacity)}")
        print(f"  Memoization (Top-Down): {knapsack_memoization(weights, values, capacity)}")
        print(f"  Tabulation (Bottom-Up): {knapsack_tabulation(weights, values, capacity)}")
        print(f"  Space-Optimized: {knapsack_space_optimized(weights, values, capacity)}")

    # Test with a larger example
    large_weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    large_values = [1, 5, 2, 8, 4, 10, 3, 12, 6, 15, 7, 18, 9, 20, 11]
    large_capacity = 30
    large_expected = 100 # Manually calculated example: e.g., taking items (1,1), (2,5), (3,2), (4,8), (5,4), (6,10), (7,3), (8,12), (9,6), (10,15), (11,7), (12,18), (13,9), (14,20), (15,11) for max value 100

    print(f"\n--- Larger Test Case ---")
    print(f"Items: {len(large_weights)}, Capacity: {large_capacity}")
    print(f"  Expected Max Value: {large_expected}")
    # knapsack_recursive(large_weights, large_values, large_capacity) would be too slow
    print(f"  Memoization (Top-Down): {knapsack_memoization(large_weights, large_values, large_capacity)}")
    print(f"  Tabulation (Bottom-Up): {knapsack_tabulation(large_weights, large_values, large_capacity)}")
    print(f"  Space-Optimized: {knapsack_space_optimized(large_weights, large_values, large_capacity)}")