```python
import time
import functools
import sys
from collections import namedtuple

# Ensure custom decorators are available
sys.path.append('.') # Add current directory to path
from utils.decorators import time_it

# Import all algorithms
from algorithms.fibonacci import Fibonacci
from algorithms.knapsack_01 import Knapsack01
from algorithms.longest_common_subsequence import LongestCommonSubsequence
from algorithms.word_break import WordBreak
from algorithms.min_cost_climbing_stairs import MinCostClimbingStairs


# Define a structure for test cases
TestCase = namedtuple('TestCase', ['name', 'args', 'expected'])

def run_benchmarks():
    print("--- Starting Dynamic Programming Benchmarks ---")
    print("Note: Brute-force methods are often omitted for large inputs due to extreme slowness or recursion depth.")

    # --- Fibonacci Benchmarks ---
    print("\n=== Fibonacci Numbers ===")
    fib_tests = [
        TestCase('Small N (Brute-force/DP)', (15,), None),
        TestCase('Medium N (DP)', (30,), None),
        TestCase('Larger N (DP)', (35,), None),
    ]

    for test in fib_tests:
        n = test.args[0]
        print(f"\nBenchmarking Fibonacci for N={n}")
        if n < 20: # Limit brute-force for practical execution
            @time_it
            def run_fib_bruteforce(n_val):
                return Fibonacci.fib_recursive_bruteforce(n_val)
            run_fib_bruteforce(n)

        # Clear memoization caches before each run
        Fibonacci.fib_memoization_lru_cache.cache_clear()
        @time_it
        def run_fib_memo_lru(n_val):
            return Fibonacci.fib_memoization_lru_cache(n_val)
        run_fib_memo_lru(n)

        # Custom memoization might persist cache between calls, creating misleading benchmark.
        # For a fair comparison, a fresh decorated function would be needed or explicit cache clear.
        # For now, we'll skip for general benchmarking to avoid complexity.
        # @time_it
        # def run_fib_memo_custom(n_val):
        #    return Fibonacci.fib_memoization_custom(n_val)
        # run_fib_memo_custom(n)

        @time_it
        def run_fib_tabulation(n_val):
            return Fibonacci.fib_tabulation(n_val)
        run_fib_tabulation(n)

        @time_it
        def run_fib_space_optimized(n_val):
            return Fibonacci.fib_space_optimized(n_val)
        run_fib_space_optimized(n)

    # --- 0/1 Knapsack Benchmarks ---
    print("\n=== 0/1 Knapsack Problem ===")
    # Small N, W for brute-force
    weights_small = [1, 2, 3, 4]
    values_small = [10, 20, 30, 40]
    capacity_small = 7
    # Medium N, W for DP
    weights_medium = [i for i in range(1, 16)] # 15 items
    values_medium = [i * 10 for i in range(1, 16)]
    capacity_medium = 100
    # Larger N, W for DP (N=20, W=200)
    weights_large = [i for i in range(1, 21)] # 20 items
    values_large = [i * 5 + i % 3 for i in range(1, 21)]
    capacity_large = 200

    knapsack_tests = [
        TestCase('Small (N=4, W=7)', (weights_small, values_small, capacity_small), None),
        TestCase('Medium (N=15, W=100)', (weights_medium, values_medium, capacity_medium), None),
        TestCase('Large (N=20, W=200)', (weights_large, values_large, capacity_large), None),
    ]

    for test in knapsack_tests:
        weights, values, capacity = test.args
        N = len(weights)
        print(f"\nBenchmarking Knapsack for N={N}, W={capacity}")

        if N < 16 and capacity < 150: # Limit brute-force for practical execution
            @time_it
            def run_knapsack_bruteforce(w, v, c):
                return Knapsack01.knapsack_recursive_bruteforce(w, v, c)
            run_knapsack_bruteforce(weights, values, capacity)

        Knapsack01.knapsack_memoization.cache_clear()
        @time_it
        def run_knapsack_memo(w, v, c):
            return Knapsack01.knapsack_memoization(tuple(w), tuple(v), c)
        run_knapsack_memo(weights, values, capacity)

        @time_it
        def run_knapsack_tabulation(w, v, c):
            return Knapsack01.knapsack_tabulation(w, v, c)
        run_knapsack_tabulation(weights, values, capacity)

        @time_it
        def run_knapsack_space_optimized(w, v, c):
            return Knapsack01.knapsack_tabulation_space_optimized(w, v, c)
        run_knapsack_space_optimized(weights, values, capacity)

    # --- Longest Common Subsequence Benchmarks ---
    print("\n=== Longest Common Subsequence ===")
    s1_small, s2_small = "ABCDEFGH", "AXBYCZD" # m=8, n=7, LCS=3
    s1_medium, s2_medium = "AGGTABAGGTAB", "GXTXAYBGXTXAYB" # m=12, n=14, LCS=8 (2*LCS for AGGTAB, GXTXAYB)
    s1_long, s2_long = "ABCDEFGHIJ" * 2, "ACEGIKMOQ" * 2 # m=20, n=18
    s1_very_long = "GTCACGCGGCGTCACGCGGC" * 2
    s2_very_long = "GAGCGCAAGGGCTCAAGCGCAAGGGCTC" * 2 # m=40, n=56

    lcs_tests = [
        TestCase('Small (m=8, n=7)', (s1_small, s2_small), None),
        TestCase('Medium (m=12, n=14)', (s1_medium, s2_medium), None),
        TestCase('Long (m=20, n=18)', (s1_long, s2_long), None),
        TestCase('Very Long (m=40, n=56)', (s1_very_long, s2_very_long), None),
    ]

    for test in lcs_tests:
        s1, s2 = test.args
        m, n = len(s1), len(s2)
        print(f"\nBenchmarking LCS for m={m}, n={n}")

        if m < 15 and n < 15: # Limit brute-force
            @time_it
            def run_lcs_bruteforce(str1, str2):
                return LongestCommonSubsequence.lcs_recursive_bruteforce(str1, str2)
            run_lcs_bruteforce(s1, s2)

        LongestCommonSubsequence.lcs_memoization.cache_clear()
        @time_it
        def run_lcs_memo(str1, str2, len1, len2):
            return LongestCommonSubsequence.lcs_memoization(str1, str2, len1, len2)
        run_lcs_memo(s1, s2, m, n)

        @time_it
        def run_lcs_tabulation(str1, str2):
            return LongestCommonSubsequence.lcs_tabulation(str1, str2)
        run_lcs_tabulation(s1, s2)

        @time_it
        def run_lcs_space_optimized(str1, str2):
            return LongestCommonSubsequence.lcs_space_optimized(str1, str2)
        run_lcs_space_optimized(s1, s2)

    # --- Word Break Benchmarks ---
    print("\n=== Word Break Problem ===")
    # Small for brute-force
    s_small = "applepen"
    dict_small = {"apple", "pen"}
    # Medium for DP
    s_medium = "leetcodeleet" * 2
    dict_medium = {"leet", "code", "leetcode"}
    # Long for DP (challenging brute force)
    s_long = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab"
    dict_long = {"a", "aa", "aaa", "aaaa", "aaaaa", "aaaaaa", "aaaaaaa", "aaaaaaaa", "aaaaaaaaa", "aaaaaaaaaa"}


    word_break_tests = [
        TestCase('Small (len=8)', (s_small, dict_small), None),
        TestCase('Medium (len=24)', (s_medium, dict_medium), None),
        TestCase('Long (len=160)', (s_long, dict_long), None),
    ]

    for test in word_break_tests:
        s, word_dict = test.args
        N = len(s)
        print(f"\nBenchmarking Word Break for string length={N}")

        if N < 20: # Limit brute-force
            @time_it
            def run_word_break_bruteforce(s_val, d_val):
                return WordBreak.word_break_recursive_bruteforce(s_val, d_val)
            run_word_break_bruteforce(s, word_dict)

        WordBreak.word_break_memoization.cache_clear()
        @time_it
        def run_word_break_memo(s_val, d_val_frozen, start_idx):
            return WordBreak.word_break_memoization(s_val, d_val_frozen, start_idx)
        run_word_break_memo(s, frozenset(word_dict), 0)

        @time_it
        def run_word_break_tabulation(s_val, d_val):
            return WordBreak.word_break_tabulation(s_val, d_val)
        run_word_break_tabulation(s, word_dict)

    # --- Min Cost Climbing Stairs Benchmarks ---
    print("\n=== Min Cost Climbing Stairs ===")
    # Small for brute-force
    cost_small = [10, 15, 20, 5, 12, 8]
    # Medium for DP
    cost_medium = [i % 100 + 1 for i in range(50)] # 50 steps
    # Large for DP
    cost_large = [i % 10 + 1 for i in range(1000)] # 1000 steps

    min_cost_tests = [
        TestCase('Small (N=6)', (cost_small,), None),
        TestCase('Medium (N=50)', (cost_medium,), None),
        TestCase('Large (N=1000)', (cost_large,), None),
    ]

    for test in min_cost_tests:
        cost = test.args[0]
        N = len(cost)
        print(f"\nBenchmarking Min Cost Climbing Stairs for N={N}")

        if N < 25: # Limit brute-force
            @time_it
            def run_min_cost_bruteforce(c_val):
                return MinCostClimbingStairs.min_cost_recursive_bruteforce(c_val)
            run_min_cost_bruteforce(cost)

        MinCostClimbingStairs.min_cost_memoization.cache_clear()
        @time_it
        def run_min_cost_memo(c_val_tuple):
            return min(
                MinCostClimbingStairs.min_cost_memoization(c_val_tuple, 0),
                MinCostClimbingStairs.min_cost_memoization(c_val_tuple, 1)
            )
        run_min_cost_memo(tuple(cost))

        @time_it
        def run_min_cost_tabulation(c_val):
            return MinCostClimbingStairs.min_cost_tabulation(c_val)
        run_min_cost_tabulation(cost)

        @time_it
        def run_min_cost_space_optimized(c_val):
            return MinCostClimbingStairs.min_cost_space_optimized(c_val)
        run_min_cost_space_optimized(cost)


    print("\n--- Benchmarks Finished ---")

if __name__ == '__main__':
    run_benchmarks()
```