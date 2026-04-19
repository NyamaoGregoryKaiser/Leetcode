import sys
import os
import time
from collections import defaultdict

# Add the project root to the sys.path to allow imports
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from algorithms import fibonacci, knapsack, longest_common_subsequence, unique_paths
from utils.performance_profiler import time_function

def run_benchmark(func, *args, **kwargs):
    """Runs a function and returns its execution time."""
    _, time_ms = time_function(func, *args, **kwargs)
    return time_ms

def print_results(problem_name, results):
    """Prints benchmark results for a given problem."""
    print(f"\n--- {problem_name} Benchmarks ---")
    for method, time_ms in results.items():
        print(f"{method:25}: {time_ms:.4f} ms")
    print("---------------------------------")

def benchmark_fibonacci():
    """Benchmarks Fibonacci number calculations."""
    n = 35 # A reasonable number for comparing recursive vs DP without extreme wait times
    results = {}

    print(f"\nBenchmarking Fibonacci for n = {n}...")

    # Recursive (Brute Force) - Can be very slow for n > 35-40
    try:
        results['fib_recursive'] = run_benchmark(fibonacci.fib_recursive, n)
    except RecursionError:
        results['fib_recursive'] = "RecursionError"
    except Exception as e:
        results['fib_recursive'] = f"Error: {e}"

    # Memoization (Top-Down DP)
    results['fib_memo'] = run_benchmark(fibonacci.fib_memo, n, {})

    # Tabulation (Bottom-Up DP)
    results['fib_tabulation'] = run_benchmark(fibonacci.fib_tabulation, n)

    # Space-Optimized
    results['fib_space_optimized'] = run_benchmark(fibonacci.fib_space_optimized, n)

    print_results("Fibonacci", results)

def benchmark_knapsack():
    """Benchmarks 0/1 Knapsack problem."""
    weights = [10, 20, 30, 40, 50]
    values = [60, 100, 120, 150, 180]
    capacity = 100
    n = len(weights)
    results = {}

    print(f"\nBenchmarking 0/1 Knapsack (n={n}, capacity={capacity})...")

    # Recursive (Brute Force)
    try:
        results['knapsack_recursive'] = run_benchmark(knapsack.knapsack_recursive, weights, values, capacity, n)
    except RecursionError:
        results['knapsack_recursive'] = "RecursionError (too deep)"
    except Exception as e:
        results['knapsack_recursive'] = f"Error: {e}"

    # Memoization (Top-Down DP)
    results['knapsack_memo'] = run_benchmark(knapsack.knapsack_memo, weights, values, capacity, n, {})

    # Tabulation (Bottom-Up DP)
    results['knapsack_tabulation'] = run_benchmark(knapsack.knapsack_tabulation, weights, values, capacity)

    print_results("0/1 Knapsack", results)

def benchmark_longest_common_subsequence():
    """Benchmarks Longest Common Subsequence (LCS) problem."""
    s1 = "AGGTAB" * 5
    s2 = "GXTXAYB" * 5
    m = len(s1)
    n = len(s2)
    results = {}

    print(f"\nBenchmarking LCS (s1 len={m}, s2 len={n})...")

    # Recursive (Brute Force)
    try:
        results['lcs_recursive'] = run_benchmark(longest_common_subsequence.lcs_recursive, s1, s2, m, n)
    except RecursionError:
        results['lcs_recursive'] = "RecursionError (too deep)"
    except Exception as e:
        results['lcs_recursive'] = f"Error: {e}"


    # Memoization (Top-Down DP)
    memo = defaultdict(int) # Use defaultdict for easier memoization table
    results['lcs_memo'] = run_benchmark(longest_common_subsequence.lcs_memo, s1, s2, m, n, memo)

    # Tabulation (Bottom-Up DP)
    results['lcs_tabulation'] = run_benchmark(longest_common_subsequence.lcs_tabulation, s1, s2)

    print_results("LCS", results)

def benchmark_unique_paths():
    """Benchmarks Unique Paths problem."""
    m_val, n_val = 15, 15 # Grid size
    results = {}

    print(f"\nBenchmarking Unique Paths (m={m_val}, n={n_val})...")

    # Recursive (Brute Force)
    try:
        results['unique_paths_recursive'] = run_benchmark(unique_paths.unique_paths_recursive, m_val, n_val, 0, 0)
    except RecursionError:
        results['unique_paths_recursive'] = "RecursionError (too deep)"
    except Exception as e:
        results['unique_paths_recursive'] = f"Error: {e}"


    # Memoization (Top-Down DP)
    memo = {} # Dictionary for memoization
    results['unique_paths_memo'] = run_benchmark(unique_paths.unique_paths_memo, m_val, n_val, 0, 0, memo)

    # Tabulation (Bottom-Up DP)
    results['unique_paths_tabulation'] = run_benchmark(unique_paths.unique_paths_tabulation, m_val, n_val)

    # Space-Optimized
    results['unique_paths_space_optimized'] = run_benchmark(unique_paths.unique_paths_space_optimized, m_val, n_val)

    print_results("Unique Paths", results)


if __name__ == "__main__":
    print("Starting all benchmarks...")
    benchmark_fibonacci()
    benchmark_knapsack()
    benchmark_longest_common_subsequence()
    benchmark_unique_paths()
    print("\nAll benchmarks complete.")