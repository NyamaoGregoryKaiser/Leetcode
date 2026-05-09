import timeit
import random
import sys
import os

# Add the project root to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from problems.p2_max_subarray_sum import (
    max_subarray_brute_force,
    max_subarray_dp_kadane
)
from utils.array_utils import print_array_line

def run_benchmark(func, arr_data, number_of_runs=1000):
    results = {}
    for n_val, arr_name, arr_list in arr_data:
        setup = f"""
from __main__ import {func.__name__}
arr = {arr_list}
"""
        timer = timeit.Timer(lambda: func(arr), setup=setup)
        
        try:
            times = timer.repeat(repeat=3, number=number_of_runs)
            avg_time_ms = min(times) * 1000 / number_of_runs
            results[(n_val, arr_name)] = avg_time_ms
        except Exception as e:
            results[(n_val, arr_name)] = f"Error: {e}"
            
    return results

if __name__ == "__main__":
    print("--- Benchmarking Maximum Subarray Sum Algorithms ---")

    # Generate test arrays with different characteristics and sizes
    test_data_sets = []

    # All positive
    for n in [100, 1000, 10000, 50000]:
        test_data_sets.append((n, f"AllPos_{n}", list(range(1, n + 1))))
    
    # All negative
    for n in [100, 1000, 10000, 50000]:
        test_data_sets.append((n, f"AllNeg_{n}", [-i for i in range(1, n + 1)]))

    # Mixed with a clear positive subarray
    for n in [100, 1000, 10000, 50000]:
        arr = [-1] * (n // 4) + list(range(1, n // 2 + 1)) + [-1] * (n // 4)
        if n > 0 and n % 4 != 0: # Adjust for exact length
             arr = [-1] * (n // 4) + list(range(1, n // 2 + 1)) + [-1] * (n - (n//4) - (n//2))
        test_data_sets.append((n, f"MixedPosMid_{n}", arr))

    # Mixed with many small subarrays
    for n in [100, 1000, 10000, 50000]:
        arr = [random.randint(-100, 100) for _ in range(n)]
        test_data_sets.append((n, f"MixedRandom_{n}", arr))

    functions_to_benchmark = [
        max_subarray_brute_force,
        max_subarray_dp_kadane
    ]

    print(f"{'Algorithm':<25} | {'N, Data Type':<20} | {'Avg Time (ms)':<15}")
    print("-" * 65)

    for func in functions_to_benchmark:
        print(f"{func.__name__:<25} |")
        
        results = run_benchmark(func, test_data_sets, number_of_runs=100)
        
        for (n, data_type), time_taken in results.items():
            if isinstance(time_taken, float):
                print(f"{'':<25} | {f'{n}, {data_type}':<20} | {time_taken:<15.6f}")
            else:
                print(f"{'':<25} | {f'{n}, {data_type}':<20} | {time_taken:<15}")
        print("-" * 65)

    print("\nBenchmark Finished.")
    print("Note: Times are in milliseconds (ms) and represent the minimum of 3 runs.")
    print("Kadane's algorithm (DP) should show O(N) performance, while brute force is O(N^2).")
    print("The difference will be drastic for larger N.")