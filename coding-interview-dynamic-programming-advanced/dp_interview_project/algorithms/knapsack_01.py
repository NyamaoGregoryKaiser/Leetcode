```python
import functools
from typing import List, Tuple

class Knapsack01:
    """
    Implementations for the 0/1 Knapsack Problem.
    Given weights and values of N items, put some items in a knapsack of capacity W
    to get the maximum total value in the knapsack. Each item can only be picked once.
    """

    @staticmethod
    def knapsack_recursive_bruteforce(weights: List[int], values: List[int], capacity: int) -> int:
        """
        Solves the 0/1 Knapsack problem using a naive recursive (brute-force) approach.
        At each item, we have two choices: either include it or exclude it.

        Args:
            weights (List[int]): List of weights of the items.
            values (List[int]): List of values of the items.
            capacity (int): The maximum capacity of the knapsack.

        Returns:
            int: The maximum total value that can be obtained.

        Time Complexity: O(2^N) - For N items, at each item we have 2 choices, leading to exponential complexity.
        Space Complexity: O(N) - Due to the recursion stack depth.
        """
        n = len(weights)

        def solve(idx, current_capacity):
            # Base Case: If no items left or capacity is 0
            if idx == n or current_capacity == 0:
                return 0

            # If the weight of the current item exceeds the current capacity, skip it
            if weights[idx] > current_capacity:
                return solve(idx + 1, current_capacity)
            else:
                # Option 1: Include the current item
                # Value of current item + max value from remaining items with reduced capacity
                include_item = values[idx] + solve(idx + 1, current_capacity - weights[idx])

                # Option 2: Exclude the current item
                # Max value from remaining items with same capacity
                exclude_item = solve(idx + 1, current_capacity)

                return max(include_item, exclude_item)

        return solve(0, capacity)

    @staticmethod
    @functools.lru_cache(maxsize=None)
    def knapsack_memoization(weights_tuple: Tuple[int, ...], values_tuple: Tuple[int, ...], capacity: int) -> int:
        """
        Solves the 0/1 Knapsack problem using memoization (top-down Dynamic Programming).
        Stores the results of subproblems (idx, current_capacity) to avoid redundant computations.

        Args:
            weights_tuple (Tuple[int, ...]): Tuple of weights (must be hashable for lru_cache).
            values_tuple (Tuple[int, ...]): Tuple of values (must be hashable for lru_cache).
            capacity (int): The maximum capacity of the knapsack.

        Returns:
            int: The maximum total value that can be obtained.

        Time Complexity: O(N * W) - Where N is the number of items and W is the knapsack capacity.
                                     Each state (idx, current_capacity) is computed once.
        Space Complexity: O(N * W) - For the memoization table (cache) and recursion stack.
        """
        weights = list(weights_tuple) # Convert back to list for indexing if needed, but not strictly
        values = list(values_tuple)   # necessary if we only use idx

        n = len(weights)

        # Inner recursive function to be memoized
        # We need to pass immutable states (idx, current_capacity) to lru_cache
        # weights and values are implicitly available in the closure
        def solve_memo(idx, current_cap):
            # Base Case: No items left or no capacity
            if idx == n or current_cap == 0:
                return 0

            # If the weight of the current item exceeds the current capacity, skip it
            if weights[idx] > current_cap:
                return solve_memo(idx + 1, current_cap)
            else:
                # Option 1: Include the current item
                include_item = values[idx] + solve_memo(idx + 1, current_cap - weights[idx])

                # Option 2: Exclude the current item
                exclude_item = solve_memo(idx + 1, current_cap)

                return max(include_item, exclude_item)

        # lru_cache works on the function itself, not directly on a method's inner function.
        # So we wrap the actual logic in an auxiliary function `_knapsack_memo_helper`
        # and then apply lru_cache to it.
        # Alternatively, the outer function could be directly decorated if it takes `idx` and `current_cap`
        # as arguments directly. For a class method, we need a slight adjustment.
        # For simplicity, we make the memoized function an internal helper.
        # The key for lru_cache needs to be the actual arguments changing, which are `idx` and `current_cap`.
        # So we define `_solve_memo` and decorate it inside the static method.

        # The trick for lru_cache with static methods and external context is to pass
        # the context (weights, values, n) implicitly or to use a closure carefully.
        # Here, the `knapsack_memoization` method itself is decorated and acts as the entry point.
        # We need to make sure the arguments `weights_tuple`, `values_tuple`, `capacity` are part of the cache key.
        # However, typically memoization is applied to the recursive helper function `solve_memo`.

        # Let's adjust for a more standard lru_cache application.
        # lru_cache cannot directly cache a method with `self` or `cls` arguments,
        # and it needs hashable arguments. The weights_tuple and values_tuple
        # are made hashable for the outer call, but the inner recursion depends on `idx` and `current_cap`.

        # To properly use lru_cache for the inner recursive state:
        @functools.lru_cache(maxsize=None)
        def _solve_memo_inner(idx, current_cap):
            if idx == n or current_cap == 0:
                return 0
            if weights[idx] > current_cap:
                return _solve_memo_inner(idx + 1, current_cap)
            else:
                include_item = values[idx] + _solve_memo_inner(idx + 1, current_cap - weights[idx])
                exclude_item = _solve_memo_inner(idx + 1, current_cap)
                return max(include_item, exclude_item)

        # We call the memoized inner function
        return _solve_memo_inner(0, capacity)


    @staticmethod
    def knapsack_tabulation(weights: List[int], values: List[int], capacity: int) -> int:
        """
        Solves the 0/1 Knapsack problem using tabulation (bottom-up Dynamic Programming).
        Builds a DP table where dp[i][w] represents the maximum value that can be
        obtained with the first 'i' items and a knapsack capacity of 'w'.

        Args:
            weights (List[int]): List of weights of the items.
            values (List[int]): List of values of the items.
            capacity (int): The maximum capacity of the knapsack.

        Returns:
            int: The maximum total value that can be obtained.

        Time Complexity: O(N * W) - Where N is the number of items and W is the knapsack capacity.
                                     Two nested loops iterate N*W times.
        Space Complexity: O(N * W) - For the 2D DP table. Can be optimized to O(W) if only the
                                      previous row is needed.
        """
        n = len(weights)

        # dp[i][w] will store the maximum value for first 'i' items with capacity 'w'
        # dp table size: (n+1) rows, (capacity+1) columns
        dp = [[0 for _ in range(capacity + 1)] for _ in range(n + 1)]

        # Fill the dp table
        # i iterates through items (from 1 to n, 0-indexed item is i-1)
        # w iterates through capacities (from 0 to capacity)
        for i in range(1, n + 1):
            for w in range(capacity + 1):
                # Current item's weight and value
                current_item_weight = weights[i - 1]
                current_item_value = values[i - 1]

                # Case 1: If current item's weight is more than current capacity 'w'
                # We cannot include this item, so take value from the previous item (dp[i-1][w])
                if current_item_weight > w:
                    dp[i][w] = dp[i - 1][w]
                # Case 2: We can include the current item
                # We have two choices:
                #   a) Exclude the current item: dp[i-1][w]
                #   b) Include the current item: current_item_value + dp[i-1][w - current_item_weight]
                #      (value of current item + max value of remaining capacity from previous items)
                else:
                    dp[i][w] = max(dp[i - 1][w], current_item_value + dp[i - 1][w - current_item_weight])

        return dp[n][capacity]

    @staticmethod
    def knapsack_tabulation_space_optimized(weights: List[int], values: List[int], capacity: int) -> int:
        """
        Solves the 0/1 Knapsack problem using space-optimized tabulation (bottom-up Dynamic Programming).
        Reduces the space complexity from O(N*W) to O(W) by only using one row of the DP table.

        Args:
            weights (List[int]): List of weights of the items.
            values (List[int]): List of values of the items.
            capacity (int): The maximum capacity of the knapsack.

        Returns:
            int: The maximum total value that can be obtained.

        Time Complexity: O(N * W) - Two nested loops iterate N*W times.
        Space Complexity: O(W) - Only a 1D DP array of size (capacity+1) is used.
        """
        n = len(weights)

        # dp[w] will store the maximum value for the current set of items with capacity 'w'
        # Initialize with 0s for a capacity up to `capacity`.
        dp = [0] * (capacity + 1)

        # Iterate through each item
        for i in range(n):
            current_item_weight = weights[i]
            current_item_value = values[i]

            # Iterate through capacity from right to left
            # This is crucial for 0/1 Knapsack space optimization.
            # If we iterate left to right, we might use the current item multiple times
            # (treating it like unbounded knapsack) because dp[w - current_item_weight]
            # would already contain the value considering the current item.
            # Right-to-left ensures that dp[w - current_item_weight] refers to the
            # state *before* considering the current item.
            for w in range(capacity, current_item_weight - 1, -1):
                # Two choices for dp[w]:
                # 1. Exclude current item: dp[w] (value from previous iteration, before considering current item)
                # 2. Include current item: current_item_value + dp[w - current_item_weight]
                dp[w] = max(dp[w], current_item_value + dp[w - current_item_weight])

        return dp[capacity]


# Example Usage:
if __name__ == '__main__':
    print("--- 0/1 Knapsack Problem ---")

    # Example 1
    weights1 = [1, 2, 3]
    values1 = [6, 10, 12]
    capacity1 = 5
    print(f"\nItems: weights={weights1}, values={values1}, capacity={capacity1}")
    print(f"Brute Force: {Knapsack01.knapsack_recursive_bruteforce(weights1, values1, capacity1)}")
    print(f"Memoization: {Knapsack01.knapsack_memoization(tuple(weights1), tuple(values1), capacity1)}")
    Knapsack01.knapsack_memoization.cache_clear() # Clear cache for next calls if needed
    print(f"Tabulation: {Knapsack01.knapsack_tabulation(weights1, values1, capacity1)}")
    print(f"Space Optimized Tabulation: {Knapsack01.knapsack_tabulation_space_optimized(weights1, values1, capacity1)}")
    # Expected: max(10+0, 12+6) = 22 (items 2 and 3 if weights are 2 and 3, values 10 and 12, capacity 5)
    # Correct for example: W=1,V=6; W=2,V=10; W=3,V=12. Cap=5.
    # items 1 and 3 (weights 1+3=4, values 6+12=18)
    # items 2 and ? (weights 2, values 10)
    # If using first two: 1+2=3 < 5, 6+10=16
    # If using items 2 and 3: 2+3=5, 10+12=22. This is correct.

    # Example 2
    weights2 = [10, 20, 30]
    values2 = [60, 100, 120]
    capacity2 = 50
    print(f"\nItems: weights={weights2}, values={values2}, capacity={capacity2}")
    print(f"Brute Force: {Knapsack01.knapsack_recursive_bruteforce(weights2, values2, capacity2)}")
    print(f"Memoization: {Knapsack01.knapsack_memoization(tuple(weights2), tuple(values2), capacity2)}")
    Knapsack01.knapsack_memoization.cache_clear()
    print(f"Tabulation: {Knapsack01.knapsack_tabulation(weights2, values2, capacity2)}")
    print(f"Space Optimized Tabulation: {Knapsack01.knapsack_tabulation_space_optimized(weights2, values2, capacity2)}")
    # Expected: items 10 and 20 (weights 10+20=30, values 60+100=160).
    # If 20+30=50, values 100+120=220. This is the max.

    # Edge cases
    print("\n--- Edge Cases ---")
    print(f"Empty items: {Knapsack01.knapsack_tabulation([], [], 10)}") # Expected: 0
    print(f"Zero capacity: {Knapsack01.knapsack_tabulation([1,2], [10,20], 0)}") # Expected: 0
    print(f"Smallest item too heavy: {Knapsack01.knapsack_tabulation([100], [500], 50)}") # Expected: 0
    print(f"Single item, fits: {Knapsack01.knapsack_tabulation([10], [100], 10)}") # Expected: 100
```