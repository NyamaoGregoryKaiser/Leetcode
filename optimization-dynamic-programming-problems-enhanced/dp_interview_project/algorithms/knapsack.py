"""
Problem: 0/1 Knapsack Problem

Given a set of items, each with a weight and a value, determine the maximum
value that can be collected by selecting a subset of the items such that
their total weight does not exceed a given knapsack capacity.
Each item can either be included (1) or not included (0) in the knapsack.

Example:
Weights: [1, 2, 3]
Values: [6, 10, 12]
Capacity: 5

Possible items combinations within capacity 5:
- {Item 0 (w=1, v=6), Item 1 (w=2, v=10), Item 2 (w=3, v=12)}
- Take item 0 (w=1, v=6), remaining capacity 4.
  - Take item 1 (w=2, v=10), remaining capacity 2.
    - Take no more. Total value = 6+10 = 16.
  - Take item 2 (w=3, v=12), remaining capacity 1.
    - Take no more. Total value = 6+12 = 18.
- Take item 1 (w=2, v=10), remaining capacity 3.
  - Take item 2 (w=3, v=12) - too heavy.
  - Take item 0 (w=1, v=6), remaining capacity 2.
    - Take no more. Total value = 10+6 = 16.
- Take item 2 (w=3, v=12), remaining capacity 2.
  - Take item 0 (w=1, v=6), remaining capacity 1.
    - Take no more. Total value = 12+6 = 18.
  - Take item 1 (w=2, v=10) - too heavy.

The maximum value is 22 (by taking items with weights 2 and 3, values 10 and 12).
Wait, example combination is actually 1 item (w=2, v=10) + 1 item (w=3, v=12) => weight 5, value 22.
Or item 0 (w=1, v=6) + item 2 (w=3, v=12) => weight 4, value 18.
The optimal for [1,2,3], [6,10,12], capacity 5 is 22 (item 1 and item 2).

Constraints:
- All weights and values are positive integers.
- Capacity is a non-negative integer.
"""

def knapsack_recursive(weights: list[int], values: list[int], capacity: int, n: int) -> int:
    """
    Approach 1: Brute Force Recursion

    This approach explores all possible subsets of items and checks if their
    total weight is within the capacity.

    Logic:
    - Base Case: If there are no items left (n=0) or capacity is 0, the max value is 0.
    - Recursive Step for item `n-1` (the last item in the current consideration):
      - **Case 1: Item `n-1`'s weight is greater than current `capacity`:**
        We cannot include this item. The solution is the same as solving the knapsack
        problem for `n-1` items with the same `capacity`.
        `knapsack(weights, values, capacity, n-1)`
      - **Case 2: Item `n-1`'s weight is less than or equal to `capacity`:**
        We have two choices:
        a) **Include the item:** Add its value `values[n-1]` to the maximum value
           obtained from the remaining `n-1` items with reduced capacity
           (`capacity - weights[n-1]`).
           `values[n-1] + knapsack(weights, values, capacity - weights[n-1], n-1)`
        b) **Exclude the item:** The value is the same as solving the knapsack
           problem for `n-1` items with the same `capacity`.
           `knapsack(weights, values, capacity, n-1)`
        We take the maximum of these two choices.

    Time Complexity: O(2^n) - For each item, we have two choices (include/exclude),
                     leading to an exponential number of subproblems.
    Space Complexity: O(n) - Due to the recursion stack depth.
    """
    # Base Case: If no items left or capacity is 0, no value can be gained.
    if n == 0 or capacity == 0:
        return 0

    # If weight of the nth item is more than Knapsack capacity, then
    # this item cannot be included in the optimal solution.
    if weights[n - 1] > capacity:
        return knapsack_recursive(weights, values, capacity, n - 1)
    else:
        # Return the maximum of two cases:
        # 1. nth item included
        # 2. nth item not included
        include_item = values[n - 1] + knapsack_recursive(weights, values, capacity - weights[n - 1], n - 1)
        exclude_item = knapsack_recursive(weights, values, capacity, n - 1)
        return max(include_item, exclude_item)


def knapsack_memo(weights: list[int], values: list[int], capacity: int, n: int, memo: dict = None) -> int:
    """
    Approach 2: Memoization (Top-Down Dynamic Programming)

    This optimizes the brute-force recursion by storing the results of subproblems
    in a dictionary (memoization table) to avoid redundant calculations.

    Logic:
    - The state of the problem is defined by `(n, capacity)`, meaning the maximum
      value using `n` items with a given `capacity`.
    - Before computing `knapsack(n, capacity)`, check if `memo[(n, capacity)]` exists.
      If yes, return the cached value.
    - Otherwise, compute it using the same recursive logic as `knapsack_recursive`,
      store the result in `memo`, and then return it.

    Time Complexity: O(n * capacity) - Each state `(n, capacity)` is computed only once.
                     There are `n` items and `capacity` states for the capacity,
                     leading to `n * capacity` unique subproblems.
    Space Complexity: O(n * capacity) - For the `memo` dictionary and recursion stack.
    """
    if memo is None:
        memo = {}

    # Check if the result for this subproblem is already computed
    if (n, capacity) in memo:
        return memo[(n, capacity)]

    # Base Case: If no items left or capacity is 0, no value can be gained.
    if n == 0 or capacity == 0:
        return 0

    # If weight of the nth item is more than Knapsack capacity, then
    # this item cannot be included in the optimal solution.
    if weights[n - 1] > capacity:
        result = knapsack_memo(weights, values, capacity, n - 1, memo)
    else:
        # Calculate maximum of two cases:
        # 1. nth item included
        include_item = values[n - 1] + knapsack_memo(weights, values, capacity - weights[n - 1], n - 1, memo)
        # 2. nth item not included
        exclude_item = knapsack_memo(weights, values, capacity, n - 1, memo)
        result = max(include_item, exclude_item)

    # Store the computed result in memo table
    memo[(n, capacity)] = result
    return result


def knapsack_tabulation(weights: list[int], values: list[int], capacity: int) -> int:
    """
    Approach 3: Tabulation (Bottom-Up Dynamic Programming)

    This approach builds a 2D DP table `dp` where `dp[i][w]` represents the maximum
    value that can be obtained using the first `i` items with a knapsack capacity of `w`.

    DP Table: `dp[i][w]`
        `i`: Represents the number of items considered (from 0 to `n`).
        `w`: Represents the current knapsack capacity (from 0 to `capacity`).

    Logic:
    - Initialize a `dp` table of size `(n+1) x (capacity+1)` with zeros.
    - Iterate `i` from 1 to `n` (items):
      - Iterate `w` from 1 to `capacity` (weights):
        - If the weight of the `i-th` item (`weights[i-1]`) is less than or equal to `w`:
          - We have two choices:
            a) **Include item `i-1`:** `values[i-1]` + `dp[i-1][w - weights[i-1]]` (value from `i-1` items with remaining capacity)
            b) **Exclude item `i-1`:** `dp[i-1][w]` (value from `i-1` items with same capacity)
          - `dp[i][w] = max(include_item, exclude_item)`
        - Else (weight of `i-th` item is greater than `w`):
          - We cannot include this item. `dp[i][w] = dp[i-1][w]`

    Visualizing the DP table:
    (Example: weights = [1,2,3], values = [6,10,12], capacity = 5)

         0  1  2  3  4  5  <- capacity (w)
    dp[0][.] = 0 (no items)
    dp[1][.] (item 0: w=1, v=6)
    dp[2][.] (item 1: w=2, v=10)
    dp[3][.] (item 2: w=3, v=12)

    Initial DP table:
       w=0 1 2 3 4 5
    i=0: 0 0 0 0 0 0
    i=1: 0 0 0 0 0 0
    i=2: 0 0 0 0 0 0
    i=3: 0 0 0 0 0 0

    After filling:
       w=0 1  2  3  4  5
    i=0: 0 0  0  0  0  0
    i=1: 0 6  6  6  6  6   (Item 0: w=1, v=6. Max value up to capacity w)
    i=2: 0 6 10 16 16 16  (Item 1: w=2, v=10. Taking item 0 and 1: w=1+2=3, v=6+10=16. Max with capacity 5 is still 16.
                           For w=2, take item 1 (v=10). For w=3, take item 1 + item 0 (v=10+6=16).
                           For w=4, still 16 (item 0+1). For w=5, still 16.)
    i=3: 0 6 10 16 18 22  (Item 2: w=3, v=12.
                           For w=4, can take item 2 (v=12) + item 0 (v=6), total w=4, v=18.
                           For w=5, can take item 2 (v=12) + item 1 (v=10), total w=5, v=22.)

    The final answer is `dp[n][capacity]`.

    Time Complexity: O(n * capacity) - Two nested loops.
    Space Complexity: O(n * capacity) - For the `dp` table.
    """
    n = len(weights)

    # dp[i][w] will store the maximum value for 'i' items and 'w' capacity
    dp = [[0 for _ in range(capacity + 1)] for _ in range(n + 1)]

    # Build dp table in a bottom-up manner
    for i in range(1, n + 1):  # Iterate through items (from 1 to n)
        for w in range(1, capacity + 1):  # Iterate through capacities (from 1 to capacity)
            current_item_weight = weights[i - 1]
            current_item_value = values[i - 1]

            if current_item_weight <= w:
                # Option 1: Include the current item
                # Value = current_item_value + max_value_from_remaining_items_and_capacity
                value_if_included = current_item_value + dp[i - 1][w - current_item_weight]
                # Option 2: Exclude the current item
                # Value = max_value_from_previous_items_with_same_capacity
                value_if_excluded = dp[i - 1][w]
                dp[i][w] = max(value_if_included, value_if_excluded)
            else:
                # If current item's weight is more than current capacity,
                # we cannot include it. So, take the value from previous items.
                dp[i][w] = dp[i - 1][w]

    return dp[n][capacity]


# Note: A space-optimized version for Knapsack is possible, reducing O(N*W) to O(W)
# by only using the previous row's data. This can be implemented using two arrays
# (current_row_dp, prev_row_dp) or even one array updated in reverse order.
# For simplicity, and because the O(N*W) space is common, it's not included here,
# but it's a good interview follow-up.

if __name__ == "__main__":
    print("--- 0/1 Knapsack Problem ---")

    test_cases = [
        ([1, 2, 3], [6, 10, 12], 5, 22), # Example from problem description
        ([4, 5, 1], [1, 2, 3], 4, 3),    # Optimal: Take item with w=1, v=3. Capacity=4. Max value 3.
                                         # (Take only item with w=1, v=3 for capacity=4)
                                         # For capacity 4, options:
                                         #   - take (w=4,v=1) => 1
                                         #   - take (w=1,v=3) => 3
                                         #   - take none => 0
                                         # Max is 3.
        ([10, 20, 30], [60, 100, 120], 50, 220), # Optimal: take w=20,v=100 and w=30,v=120
        ([1, 1, 1], [10, 20, 30], 2, 50), # Optimal: take any two 1-weight items, best is 20+30=50
        ([], [], 10, 0),                 # Empty items
        ([100], [100], 10, 0),           # Item too heavy
        ([10], [10], 100, 10),           # Knapsack larger than item
        ([10], [10], 0, 0)               # Zero capacity
    ]

    for weights, values, capacity, expected in test_cases:
        n = len(weights)
        print(f"\nWeights: {weights}, Values: {values}, Capacity: {capacity}")

        # Recursive (Brute Force) - For larger N, this will be too slow
        if n < 20 and capacity < 20: # Heuristic to avoid excessively long runs
            res_recursive = knapsack_recursive(weights, values, capacity, n)
            print(f"  Recursive: {res_recursive}")
            assert res_recursive == expected, f"Recursive failed for weights {weights}, capacity {capacity}. Expected {expected}, got {res_recursive}"
        else:
            print("  Recursive: Skipped (inputs too large for brute force)")

        # Memoization (Top-Down DP)
        memo = {}
        res_memo = knapsack_memo(weights, values, capacity, n, memo)
        print(f"  Memoization: {res_memo}")
        assert res_memo == expected, f"Memoization failed for weights {weights}, capacity {capacity}. Expected {expected}, got {res_memo}"

        # Tabulation (Bottom-Up DP)
        res_tab = knapsack_tabulation(weights, values, capacity)
        print(f"  Tabulation: {res_tab}")
        assert res_tab == expected, f"Tabulation failed for weights {weights}, capacity {capacity}. Expected {expected}, got {res_tab}"

        print(f"  All optimized methods match expected result {expected}")