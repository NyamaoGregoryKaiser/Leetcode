import functools
import time
from typing import List

# --- Problem: Fibonacci Sequence ---
# Re-demonstrates Fibonacci to explicitly show Brute Force vs. Optimized DP.

# Approach 1: Pure Brute-Force Recursive
# Time Complexity: O(2^n) - Exponential, due to redundant calculations.
# Space Complexity: O(n) - For the recursion stack.
def fibonacci_brute_force(n: int) -> int:
    """
    Computes the nth Fibonacci number using a pure brute-force recursive approach.
    This will recompute the same subproblems many times.
    """
    if n <= 1:
        return n
    return fibonacci_brute_force(n - 1) + fibonacci_brute_force(n - 2)

# Approach 2: Optimized DP (Memoization)
# This is the same as `fibonacci_memoized` in dp_problems.py,
# included here for direct comparison.
# Time Complexity: O(n)
# Space Complexity: O(n)
@functools.lru_cache(None)
def fibonacci_optimized(n: int) -> int:
    """
    Computes the nth Fibonacci number using recursion with memoization (optimized DP).
    Uses functools.lru_cache for efficient caching of results.
    """
    if n <= 1:
        return n
    return fibonacci_optimized(n - 1) + fibonacci_optimized(n - 2)

# --- Problem: 0/1 Knapsack Problem ---
# Re-demonstrates Knapsack to explicitly show Brute Force vs. Optimized DP.

# Approach 1: Pure Brute-Force Recursive
# Time Complexity: O(2^N) - For each item, we have two choices (include/exclude).
# Space Complexity: O(N) - For the recursion stack depth.
def knapsack_brute_force(weights: List[int], values: List[int], capacity: int) -> int:
    """
    Solves the 0/1 Knapsack problem using a pure brute-force recursive approach.
    Explores all 2^N subsets of items.
    """
    n = len(weights)

    def solve(idx: int, current_capacity: int) -> int:
        # Base Case: No more items or no capacity left
        if idx == n or current_capacity == 0:
            return 0

        # Option 1: Exclude the current item
        exclude_val = solve(idx + 1, current_capacity)

        # Option 2: Include the current item (if possible)
        include_val = 0
        if weights[idx] <= current_capacity:
            include_val = values[idx] + solve(idx + 1, current_capacity - weights[idx])

        return max(exclude_val, include_val)

    return solve(0, capacity)

# Approach 2: Optimized DP (Memoization)
# This is the same as `knapsack_memoized` in dp_problems.py,
# included here for direct comparison.
# Time Complexity: O(N * W)
# Space Complexity: O(N * W)
def knapsack_optimized(weights: List[int], values: List[int], capacity: int) -> int:
    """
    Solves the 0/1 Knapsack problem using recursion with memoization (optimized DP).
    """
    n = len(weights)
    memo = {}

    def solve(idx: int, current_capacity: int) -> int:
        if idx == n or current_capacity == 0:
            return 0
        if (idx, current_capacity) in memo:
            return memo[(idx, current_capacity)]

        exclude_val = solve(idx + 1, current_capacity)

        include_val = 0
        if weights[idx] <= current_capacity:
            include_val = values[idx] + solve(idx + 1, current_capacity - weights[idx])

        memo[(idx, current_capacity)] = max(exclude_val, include_val)
        return memo[(idx, current_capacity)]

    return solve(0, capacity)

if __name__ == "__main__":
    print("--- Fibonacci Sequence Brute-Force vs. Optimized ---")
    n_fib = 35 # A value that makes brute-force noticeably slow

    start_time = time.perf_counter()
    # For large n, brute_force will take too long. Let's use a smaller n for BF.
    print(f"Fibonacci Brute Force (n={min(n_fib, 20)}):")
    try:
        if n_fib <= 20: # Limit for practical brute force
            result_bf = fibonacci_brute_force(n_fib)
            print(f"Result: {result_bf}, Time: {time.perf_counter() - start_time:.4f} seconds")
        else:
            print(f"Skipping brute force for n={n_fib} as it's too slow. Try n <= 20.")
    except RecursionError:
        print("Recursion depth exceeded for brute force.")

    start_time = time.perf_counter()
    print(f"\nFibonacci Optimized (n={n_fib}):")
    result_opt = fibonacci_optimized(n_fib)
    print(f"Result: {result_opt}, Time: {time.perf_counter() - start_time:.6f} seconds")
    # Clear cache for subsequent calls if any, though not strictly needed here
    fibonacci_optimized.cache_clear()


    print("\n--- 0/1 Knapsack Brute-Force vs. Optimized ---")
    knapsack_weights = [10, 20, 30, 40, 50]
    knapsack_values = [60, 100, 120, 150, 200]
    knapsack_capacity = 100
    # For a larger N, brute force becomes infeasible
    # N=15 items already 2^15 = 32768 calls at top level, branching from there.

    print(f"Knapsack Brute Force (N={len(knapsack_weights)}, W={knapsack_capacity}):")
    start_time = time.perf_counter()
    result_bf_knapsack = knapsack_brute_force(knapsack_weights, knapsack_values, knapsack_capacity)
    print(f"Result: {result_bf_knapsack}, Time: {time.perf_counter() - start_time:.6f} seconds")

    print(f"\nKnapsack Optimized (N={len(knapsack_weights)}, W={knapsack_capacity}):")
    start_time = time.perf_counter()
    result_opt_knapsack = knapsack_optimized(knapsack_weights, knapsack_values, knapsack_capacity)
    print(f"Result: {result_opt_knapsack}, Time: {time.perf_counter() - start_time:.6f} seconds")