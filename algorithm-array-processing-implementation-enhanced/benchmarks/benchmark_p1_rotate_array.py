import timeit
import random
import sys
import os

# Add the project root to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from problems.p1_rotate_array import (
    rotate_array_brute_force,
    rotate_array_extra_space,
    rotate_array_reverse,
    rotate_array_cyclic_replacements
)
from utils.array_utils import print_array_line

def run_benchmark(func, test_cases, setup_code, number_of_runs=1000):
    results = {}
    for n_val, k_val in test_cases:
        # Create data setup for timeit
        setup = f"""
from __main__ import {func.__name__}
import random
original_arr = list(range({n_val}))
k = {k_val}
arr = list(original_arr) # Make a fresh copy for each run
"""
        # Execute the benchmark
        # We wrap in a lambda to ensure the function is called with the mutable list copy
        timer = timeit.Timer(lambda: func(arr, k), setup=setup)
        
        try:
            times = timer.repeat(repeat=3, number=number_of_runs)
            avg_time_ms = min(times) * 1000 / number_of_runs # Best of 3 runs
            results[(n_val, k_val)] = avg_time_ms
        except Exception as e:
            results[(n_val, k_val)] = f"Error: {e}"
            
    return results

if __name__ == "__main__":
    print("--- Benchmarking Rotate Array Algorithms ---")

    test_configurations = [
        # (array_size, k_value)
        (100, 1),      # Small array, small k
        (100, 50),     # Small array, k = n/2
        (100, 99),     # Small array, k = n-1
        (1000, 1),     # Medium array, small k
        (1000, 500),   # Medium array, k = n/2
        (1000, 999),   # Medium array, k = n-1
        (10000, 1),    # Large array, small k
        (10000, 5000), # Large array, k = n/2
        (10000, 9999), # Large array, k = n-1
        (50000, 1),    # Very Large array, small k
        (50000, 25000),# Very Large array, k = n/2
    ]

    functions_to_benchmark = [
        rotate_array_brute_force,
        rotate_array_extra_space,
        rotate_array_reverse,
        rotate_array_cyclic_replacements
    ]

    print(f"{'Algorithm':<25} | {'N, K':<15} | {'Avg Time (ms)':<15}")
    print("-" * 60)

    for func in functions_to_benchmark:
        print(f"{func.__name__:<25} |")
        
        # Prepare setup code for timeit. We need 'arr' to be available.
        # The 'arr' is re-copied within each timeit execution via 'setup' string.
        setup_code = "" # The run_benchmark function handles the setup

        results = run_benchmark(func, test_configurations, setup_code, number_of_runs=100)
        
        for (n, k), time_taken in results.items():
            if isinstance(time_taken, float):
                print(f"{'':<25} | {f'{n}, {k}':<15} | {time_taken:<15.6f}")
            else:
                print(f"{'':<25} | {f'{n}, {k}':<15} | {time_taken:<15}")
        print("-" * 60)

    print("\nBenchmark Finished.")
    print("Note: Times are in milliseconds (ms) and represent the minimum of 3 runs.")
    print("Lower is better. Optimal solutions (Reverse, Cyclic) should show O(N) behavior.")
    print("Brute force will be significantly slower for larger N, especially with large K.")
    print("Extra space is O(N) but might have higher constant factors than Reverse/Cyclic.")