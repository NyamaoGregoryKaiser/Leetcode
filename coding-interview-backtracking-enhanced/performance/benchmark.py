import timeit
import functools
from typing import List
import os
import sys

# Add the src directory to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src')))

from subsets import find_subsets, find_subsets_alternative_approach
from permutations import find_permutations, find_permutations_swap_approach
from combination_sum_ii import combination_sum_ii
from n_queens import solve_n_queens

# --- Helper for pretty printing ---
def print_benchmark_results(title, results):
    print(f"\n--- {title} ---")
    for name, duration in results.items():
        print(f"{name:<30}: {duration:.6f} seconds")

# --- Benchmarking functions ---

def benchmark_subsets():
    print("Benchmarking Subsets")
    test_cases = {
        "N=0 (empty)": [],
        "N=1": [1],
        "N=3": [1, 2, 3],
        "N=5": [1, 2, 3, 4, 5],
        "N=10": list(range(10)),
    }
    
    results = {}
    for name, nums in test_cases.items():
        # Using functools.partial to pass arguments to the benchmarked function
        results[f"find_subsets ({name})"] = timeit.timeit(
            functools.partial(find_subsets, nums), number=100
        )
        results[f"find_subsets_alternative ({name})"] = timeit.timeit(
            functools.partial(find_subsets_alternative_approach, nums), number=100
        )
    print_benchmark_results("Subsets Performance", results)

def benchmark_permutations():
    print("\nBenchmarking Permutations")
    test_cases = {
        "N=0 (empty)": [],
        "N=1": [1],
        "N=3": [1, 2, 3],
        "N=5": [1, 2, 3, 4, 5],
        "N=6": [1, 2, 3, 4, 5, 6],
    }

    results = {}
    for name, nums in test_cases.items():
        # Permutations grow very fast (N!), so smaller N for more reasonable run times.
        # N=6 already generates 720 permutations, copying each takes time.
        results[f"find_permutations ({name})"] = timeit.timeit(
            functools.partial(find_permutations, nums), number=10
        )
        results[f"find_permutations_swap ({name})"] = timeit.timeit(
            functools.partial(find_permutations_swap_approach, nums), number=10
        )
    print_benchmark_results("Permutations Performance", results)

def benchmark_combination_sum_ii():
    print("\nBenchmarking Combination Sum II")
    test_cases = {
        "Small (distinct)": ([1, 2, 3], 4),
        "Medium (duplicates)": ([10, 1, 2, 7, 6, 1, 5], 8),
        "Large (many ones)": ([1] * 20, 10), # Should show effect of pruning
        "Large (sparse)": (list(range(1, 21)), 25),
        "Large (no solution)": (list(range(10, 30)), 5)
    }

    results = {}
    for name, (candidates, target) in test_cases.items():
        # The number of solutions can vary greatly, so number=1 might be enough for some large cases
        # Or reduce number for large test cases.
        num_runs = 1 if len(candidates) > 10 else 100
        results[f"combination_sum_ii ({name})"] = timeit.timeit(
            functools.partial(combination_sum_ii, candidates, target), number=num_runs
        )
    print_benchmark_results("Combination Sum II Performance", results)

def benchmark_n_queens():
    print("\nBenchmarking N-Queens")
    test_cases = {
        "N=1": 1,
        "N=4": 4,
        "N=6": 6, # 4 solutions
        "N=8": 8, # 92 solutions
        "N=9": 9, # 352 solutions
    }

    results = {}
    for name, n_val in test_cases.items():
        # N-Queens performance drops sharply with N, adjust number of runs.
        num_runs = 1 if n_val >= 8 else (10 if n_val >= 6 else 100)
        results[f"solve_n_queens ({name})"] = timeit.timeit(
            functools.partial(solve_n_queens, n_val), number=num_runs
        )
    print_benchmark_results("N-Queens Performance", results)

if __name__ == "__main__":
    benchmark_subsets()
    benchmark_permutations()
    benchmark_combination_sum_ii()
    benchmark_n_queens()

    print("\n--- Benchmarking Complete ---")