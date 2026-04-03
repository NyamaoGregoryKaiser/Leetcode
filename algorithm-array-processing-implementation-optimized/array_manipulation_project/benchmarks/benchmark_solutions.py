import timeit
import random
from src.problems.array_rotation import (
    rotate_array_brute_force,
    rotate_array_extra_space,
    rotate_array_reversal
)
from src.problems.subarray_sum_equals_k import (
    subarray_sum_brute_force,
    subarray_sum_prefix_hashmap
)
from src.problems.merge_intervals import merge_intervals_sort
from src.problems.trapping_rain_water import (
    trap_rain_water_brute_force,
    trap_rain_water_dp,
    trap_rain_water_two_pointers
)
from src.utils.array_helpers import generate_random_array

def run_benchmark(func, setup_code, number=1000):
    """
    Runs a benchmark for a given function and setup code.

    Args:
        func (callable): The function to benchmark.
        setup_code (str): Python code to set up the environment for func.
        number (int): The number of times to execute the statement.

    Returns:
        float: The total time taken for `number` executions.
    """
    stmt = f"{func.__name__}(list_copy, *args_copy)" # func expects list_copy and *args_copy
    # Use setup_code + local definition of list_copy and args_copy
    full_setup = f"""
from __main__ import {func.__name__}
import copy
original_list, original_args = {setup_code}
list_copy = copy.deepcopy(original_list)
args_copy = copy.deepcopy(original_args)
"""
    times = timeit.repeat(stmt, setup=full_setup, repeat=3, number=number)
    return min(times)

def benchmark_array_rotation():
    """Benchmarks different array rotation approaches."""
    print("\n--- Benchmarking Array Rotation ---")
    sizes = [100, 1000, 10000]
    k_values = [1, 50, 100, 500] # k as a percentage of N, or fixed

    for N in sizes:
        print(f"\nArray Size: {N}")
        base_array = generate_random_array(N)
        for k_percent in k_values:
            k = int(N * (k_percent / 100)) if k_percent > 0 and k_percent <= 100 else k_percent # Handle k for k > 100%
            if k == 0: k = 1 # Ensure k is at least 1 for rotation effect
            k = k % N if N > 0 else 0
            if k == 0 and N > 1: k = 1 # Ensure actual rotation for benchmark if k became 0

            setup_str = f"({base_array}, ({k},))" # (array, (k,))

            # Brute Force
            if N <= 1000: # Brute force is too slow for N=10000
                time_brute = run_benchmark(rotate_array_brute_force, setup_str, number=10)
                print(f"  k={k} ({(k/N*100):.1f}% of N): Brute Force: {time_brute:.6f}s (10 runs)")

            # Extra Space
            time_extra = run_benchmark(rotate_array_extra_space, setup_str, number=1000)
            print(f"  k={k} ({(k/N*100):.1f}% of N): Extra Space: {time_extra:.6f}s (1000 runs)")

            # Reversal
            time_reversal = run_benchmark(rotate_array_reversal, setup_str, number=1000)
            print(f"  k={k} ({(k/N*100):.1f}% of N): Reversal: {time_reversal:.6f}s (1000 runs)")

def benchmark_subarray_sum_equals_k():
    """Benchmarks different subarray sum approaches."""
    print("\n--- Benchmarking Subarray Sum Equals K ---")
    sizes = [100, 1000, 5000] # Brute force is too slow for 10000

    for N in sizes:
        print(f"\nArray Size: {N}")
        base_array = generate_random_array(N, -100, 100)
        k_target = random.randint(-50, 50)

        setup_str = f"({base_array}, ({k_target},))"

        # Brute Force
        if N <= 1000: # Brute force O(N^2) becomes very slow
            time_brute = run_benchmark(subarray_sum_brute_force, setup_str, number=1) # Reduced runs
            print(f"  k={k_target}: Brute Force: {time_brute:.6f}s (1 run)")
        
        # Prefix Sum with Hash Map
        time_hashmap = run_benchmark(subarray_sum_prefix_hashmap, setup_str, number=100)
        print(f"  k={k_target}: Prefix Sum (HashMap): {time_hashmap:.6f}s (100 runs)")

def benchmark_merge_intervals():
    """Benchmarks merge intervals approach."""
    print("\n--- Benchmarking Merge Intervals ---")
    sizes = [100, 1000, 10000]

    for N in sizes:
        print(f"\nNumber of Intervals: {N}")
        # Generate random intervals (ensuring end >= start)
        intervals = []
        for _ in range(N):
            start = random.randint(0, N * 2)
            end = start + random.randint(1, N // 2 + 1)
            intervals.append([start, end])
        
        setup_str = f"({intervals}, ())" # (intervals_list, tuple_of_empty_args)

        time_merge = run_benchmark(merge_intervals_sort, setup_str, number=100)
        print(f"  Merge Intervals (Sort): {time_merge:.6f}s (100 runs)")

def benchmark_trapping_rain_water():
    """Benchmarks different trapping rain water approaches."""
    print("\n--- Benchmarking Trapping Rain Water ---")
    sizes = [100, 1000, 10000, 100000]

    for N in sizes:
        print(f"\nArray Size: {N}")
        base_array = generate_random_array(N, 0, N // 2) # Heights up to N/2

        setup_str = f"({base_array}, ())" # (height_list, tuple_of_empty_args)

        # Brute Force
        if N <= 1000: # Brute force O(N^2) is very slow
            time_brute = run_benchmark(trap_rain_water_brute_force, setup_str, number=1)
            print(f"  Brute Force: {time_brute:.6f}s (1 run)")

        # Dynamic Programming
        time_dp = run_benchmark(trap_rain_water_dp, setup_str, number=100)
        print(f"  Dynamic Programming: {time_dp:.6f}s (100 runs)")

        # Two Pointers
        time_two_pointers = run_benchmark(trap_rain_water_two_pointers, setup_str, number=100)
        print(f"  Two Pointers: {time_two_pointers:.6f}s (100 runs)")


if __name__ == "__main__":
    print("Starting Benchmarks...")
    benchmark_array_rotation()
    benchmark_subarray_sum_equals_k()
    benchmark_merge_intervals()
    benchmark_trapping_rain_water()
    print("\nBenchmarks Finished.")