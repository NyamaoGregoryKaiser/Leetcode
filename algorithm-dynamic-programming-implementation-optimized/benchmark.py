import time
from utils.stopwatch import Stopwatch
from algorithms.problem_fibonacci_sequence import (
    fibonacci_recursive,
    fibonacci_memoization,
    fibonacci_memoization_lru_cache,
    fibonacci_tabulation,
    fibonacci_space_optimized
)
from algorithms.problem_knapsack import (
    knapsack_recursive,
    knapsack_memoization,
    knapsack_tabulation,
    knapsack_space_optimized
)
from algorithms.problem_longest_common_subsequence import (
    lcs_recursive,
    lcs_memoization,
    lcs_tabulation,
    lcs_reconstruct_path # We'll just time the tabulation part here
)
from algorithms.problem_coin_change import (
    coin_change_min_coins_recursive,
    coin_change_min_coins_memoization,
    coin_change_min_coins_tabulation,
    coin_change_ways_recursive,
    coin_change_ways_memoization,
    coin_change_ways_tabulation
)

def run_fibonacci_benchmarks():
    print("\n--- Benchmarking Fibonacci Sequence ---")
    n_small = 20
    n_medium = 35
    n_large = 10000 # For O(N) solutions

    print(f"\nFibonacci(N={n_small})")
    with Stopwatch("  Recursive"):
        fibonacci_recursive(n_small)
    with Stopwatch("  Memoization"):
        fibonacci_memoization(n_small)
    with Stopwatch("  Memoization (lru_cache)"):
        fibonacci_memoization_lru_cache.cache_clear() # Clear cache for fair comparison
        fibonacci_memoization_lru_cache(n_small)
    with Stopwatch("  Tabulation"):
        fibonacci_tabulation(n_small)
    with Stopwatch("  Space-Optimized"):
        fibonacci_space_optimized(n_small)

    print(f"\nFibonacci(N={n_medium})")
    print("  Recursive: (Skipping, too slow for N=35)") # fibonacci_recursive(n_medium) would take too long
    # with Stopwatch("  Recursive"):
    #     fibonacci_recursive(n_medium)
    with Stopwatch("  Memoization"):
        fibonacci_memoization(n_medium)
    with Stopwatch("  Memoization (lru_cache)"):
        fibonacci_memoization_lru_cache.cache_clear()
        fibonacci_memoization_lru_cache(n_medium)
    with Stopwatch("  Tabulation"):
        fibonacci_tabulation(n_medium)
    with Stopwatch("  Space-Optimized"):
        fibonacci_space_optimized(n_medium)

    print(f"\nFibonacci(N={n_large})")
    print("  Recursive: (Skipping, exponential time)")
    print("  Memoization: (Skipping, likely RecursionError for N=10000)")
    # fibonacci_memoization_lru_cache.cache_clear() # It's actually fine if Python's recursion limit is raised
    # with Stopwatch("  Memoization (lru_cache)"):
    #     fibonacci_memoization_lru_cache(n_large) # might hit recursion limit if too deep
    with Stopwatch("  Tabulation"):
        fibonacci_tabulation(n_large)
    with Stopwatch("  Space-Optimized"):
        fibonacci_space_optimized(n_large)

def run_knapsack_benchmarks():
    print("\n--- Benchmarking 0/1 Knapsack Problem ---")
    weights_small = [10, 20, 30]
    values_small = [60, 100, 120]
    capacity_small = 50

    weights_medium = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    values_medium = [1, 5, 2, 8, 4, 10, 3, 12, 6, 15, 7, 18, 9, 20, 11]
    capacity_medium = 30 # n=15, W=30 => 15*30 = 450 states

    weights_large = list(range(1, 51)) # 50 items
    values_large = [i * 2 for i in weights_large]
    capacity_large = 100 # n=50, W=100 => 50*100 = 5000 states

    print(f"\nKnapsack (Small: n={len(weights_small)}, W={capacity_small})")
    with Stopwatch("  Recursive"):
        knapsack_recursive(weights_small, values_small, capacity_small)
    with Stopwatch("  Memoization"):
        knapsack_memoization(weights_small, values_small, capacity_small)
    with Stopwatch("  Tabulation"):
        knapsack_tabulation(weights_small, values_small, capacity_small)
    with Stopwatch("  Space-Optimized"):
        knapsack_space_optimized(weights_small, values_small, capacity_small)

    print(f"\nKnapsack (Medium: n={len(weights_medium)}, W={capacity_medium})")
    print("  Recursive: (Skipping, too slow)") # knapsack_recursive(weights_medium, values_medium, capacity_medium)
    with Stopwatch("  Memoization"):
        knapsack_memoization(weights_medium, values_medium, capacity_medium)
    with Stopwatch("  Tabulation"):
        knapsack_tabulation(weights_medium, values_medium, capacity_medium)
    with Stopwatch("  Space-Optimized"):
        knapsack_space_optimized(weights_medium, values_medium, capacity_medium)

    print(f"\nKnapsack (Large: n={len(weights_large)}, W={capacity_large})")
    print("  Recursive: (Skipping, exponential time)")
    with Stopwatch("  Memoization"):
        knapsack_memoization(weights_large, values_large, capacity_large)
    with Stopwatch("  Tabulation"):
        knapsack_tabulation(weights_large, values_large, capacity_large)
    with Stopwatch("  Space-Optimized"):
        knapsack_space_optimized(weights_large, values_large, capacity_large)


def run_lcs_benchmarks():
    print("\n--- Benchmarking Longest Common Subsequence ---")
    s1_small, s2_small = "ABCBDAB", "BDCABA" # m=7, n=6 => 7*6 = 42 states
    s1_medium, s2_medium = "AGTC" * 10, "XGTY" * 10 # m=40, n=40 => 40*40 = 1600 states
    s1_large, s2_large = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" * 5, "AZBYCXDWEVFUGTSHRQPOIJLKMN" * 5 # m=130, n=130 => 130*130 = 16900 states

    print(f"\nLCS (Small: m={len(s1_small)}, n={len(s2_small)})")
    with Stopwatch("  Recursive"):
        lcs_recursive(s1_small, s2_small)
    with Stopwatch("  Memoization"):
        lcs_memoization(s1_small, s2_small)
    with Stopwatch("  Tabulation"):
        lcs_tabulation(s1_small, s2_small)
    # lcs_reconstruct_path internally calls lcs_tabulation, so just time tabulation.

    print(f"\nLCS (Medium: m={len(s1_medium)}, n={len(s2_medium)})")
    print("  Recursive: (Skipping, too slow)") # lcs_recursive(s1_medium, s2_medium)
    with Stopwatch("  Memoization"):
        lcs_memoization(s1_medium, s2_medium)
    with Stopwatch("  Tabulation"):
        lcs_tabulation(s1_medium, s2_medium)

    print(f"\nLCS (Large: m={len(s1_large)}, n={len(s2_large)})")
    print("  Recursive: (Skipping, exponential time)")
    with Stopwatch("  Memoization"):
        lcs_memoization(s1_large, s2_large)
    with Stopwatch("  Tabulation"):
        lcs_tabulation(s1_large, s2_large)


def run_coin_change_min_benchmarks():
    print("\n--- Benchmarking Coin Change (Min Coins) ---")
    coins_small = [1, 2, 5]
    amount_small = 11

    coins_medium = [1, 2, 5, 10, 25]
    amount_medium = 100 # amount=100, num_coins=5 => 100*5 = 500 states

    coins_large = [1, 5, 10, 25, 50, 100]
    amount_large = 5000 # amount=5000, num_coins=6 => 30000 states

    print(f"\nMin Coins (Small: amount={amount_small}, coins={coins_small})")
    with Stopwatch("  Recursive"):
        coin_change_min_coins_recursive(coins_small, amount_small)
    with Stopwatch("  Memoization"):
        coin_change_min_coins_memoization(coins_small, amount_small)
    with Stopwatch("  Tabulation"):
        coin_change_min_coins_tabulation(coins_small, amount_small)

    print(f"\nMin Coins (Medium: amount={amount_medium}, coins={coins_medium})")
    print("  Recursive: (Skipping, too slow)") # coin_change_min_coins_recursive(coins_medium, amount_medium)
    with Stopwatch("  Memoization"):
        coin_change_min_coins_memoization(coins_medium, amount_medium)
    with Stopwatch("  Tabulation"):
        coin_change_min_coins_tabulation(coins_medium, amount_medium)

    print(f"\nMin Coins (Large: amount={amount_large}, coins={coins_large})")
    print("  Recursive: (Skipping, exponential time)")
    with Stopwatch("  Memoization"):
        coin_change_min_coins_memoization(coins_large, amount_large)
    with Stopwatch("  Tabulation"):
        coin_change_min_coins_tabulation(coins_large, amount_large)


def run_coin_change_ways_benchmarks():
    print("\n--- Benchmarking Coin Change (Number of Ways) ---")
    coins_small = [1, 2, 5]
    amount_small = 5

    coins_medium = [1, 2, 5, 10, 25]
    amount_medium = 100

    coins_large = [1, 5, 10, 25, 50, 100]
    amount_large = 5000

    print(f"\nWays (Small: amount={amount_small}, coins={coins_small})")
    with Stopwatch("  Recursive"):
        coin_change_ways_recursive(coins_small, amount_small)
    with Stopwatch("  Memoization"):
        coin_change_ways_memoization(coins_small, amount_small)
    with Stopwatch("  Tabulation"):
        coin_change_ways_tabulation(coins_small, amount_small)

    print(f"\nWays (Medium: amount={amount_medium}, coins={coins_medium})")
    print("  Recursive: (Skipping, too slow)") # coin_change_ways_recursive(coins_medium, amount_medium)
    with Stopwatch("  Memoization"):
        coin_change_ways_memoization(coins_medium, amount_medium)
    with Stopwatch("  Tabulation"):
        coin_change_ways_tabulation(coins_medium, amount_medium)

    print(f"\nWays (Large: amount={amount_large}, coins={coins_large})")
    print("  Recursive: (Skipping, exponential time)")
    with Stopwatch("  Memoization"):
        coin_change_ways_memoization(coins_large, amount_large)
    with Stopwatch("  Tabulation"):
        coin_change_ways_tabulation(coins_large, amount_large)


if __name__ == "__main__":
    print("Starting DP Benchmarks...")
    run_fibonacci_benchmarks()
    run_knapsack_benchmarks()
    run_lcs_benchmarks()
    run_coin_change_min_benchmarks()
    run_coin_change_ways_benchmarks()
    print("\nDP Benchmarks Finished.")