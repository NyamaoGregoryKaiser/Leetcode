import timeit
import matplotlib.pyplot as plt
import os
import random
from typing import List, Callable
from collections import defaultdict

# Add parent directory to path to import modules from src/
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from src.algorithms import (
    max_subarray_sum_brute_force, max_subarray_sum_kadane,
    rotate_array_extra_space, rotate_array_reverse,
    product_except_self_brute_force, product_except_self_optimized,
    merge_intervals,
    find_missing_positive_optimized, find_missing_positive_set_based
)
from src.utils import generate_random_array

# --- Configuration ---
NUM_RUNS = 10  # Number of times to run each function for averaging
SMALL_ARRAY_SIZES = [10, 50, 100, 200, 500]
MEDIUM_ARRAY_SIZES = [1000, 2000, 5000, 10000]
LARGE_ARRAY_SIZES = [20000, 50000, 100000] # Use with caution, O(N^2) algorithms will be very slow
ARRAY_SIZES = SMALL_ARRAY_SIZES + MEDIUM_ARRAY_SIZES # + LARGE_ARRAY_SIZES

RESULT_DIR = "results"
os.makedirs(RESULT_DIR, exist_ok=True)

# --- Benchmark Functions ---

def benchmark_function(func: Callable, setup_code: str, num_runs: int = NUM_RUNS) -> float:
    """
    Benchmarks a given function using timeit.

    Args:
        func (Callable): The function to benchmark.
        setup_code (str): Python code to run once before timing for setup.
        num_runs (int): Number of repetitions for each call to timeit.repeat.

    Returns:
        float: The average execution time in seconds.
    """
    timer = timeit.Timer(stmt="func(arr_copy)", setup=setup_code + "\narr_copy = list(arr)\n", globals={'func': func})
    # timeit.repeat returns a list of execution times for 'repeat' runs
    # we take the minimum of these to get the most optimistic (fastest) time,
    # then average these minimums over num_runs. Or simply take the average of all.
    # For robust benchmarks, timeit recommends min(times) for best-case.
    # For practical comparison over varying sizes, we'll average.
    times = timer.repeat(repeat=num_runs, number=1) # number=1 means each timeit call runs 'func' once
    return sum(times) / num_runs

def run_benchmarks(problem_name: str, functions: dict, array_sizes: List[int],
                   array_generator: Callable, **generator_kwargs) -> defaultdict:
    """
    Runs benchmarks for a set of functions for a given problem across various array sizes.

    Args:
        problem_name (str): The name of the problem.
        functions (dict): A dictionary where keys are function names (str) and values are
                          the function objects (Callable) to be benchmarked.
        array_sizes (List[int]): List of array sizes to test.
        array_generator (Callable): Function to generate test arrays for a given size.
        **generator_kwargs: Additional keyword arguments for the array_generator.

    Returns:
        defaultdict: A dictionary storing execution times for each function and array size.
                     {func_name: {size: avg_time}}
    """
    results = defaultdict(lambda: {})
    print(f"\n--- Benchmarking: {problem_name} ---")

    for size in array_sizes:
        print(f"  Benchmarking with array size: {size}...")
        # Generate the array once for the current size
        arr = array_generator(size, **generator_kwargs)
        # We need a string representation of the array for timeit setup_code
        # Be careful with very large arrays, repr() can be huge.
        # For very large arrays, it's better to pass the array object directly to timeit.Timer
        # as a global, rather than embedding its repr in the setup string.
        # However, for our current sizes, repr should be fine.
        setup_arr_str = f"arr = {repr(arr)}"

        for func_name, func_obj in functions.items():
            try:
                # Some algorithms modify the input array, so we pass a copy to func
                # via `arr_copy` in the setup_code.
                time_taken = benchmark_function(func_obj, setup_arr_str)
                results[func_name][size] = time_taken
                print(f"    - {func_name}: {time_taken:.6f} seconds")
            except Exception as e:
                print(f"    - {func_name}: Error - {e}")
                results[func_name][size] = float('nan') # Mark as Not a Number

    return results

def plot_results(problem_name: str, results: defaultdict, output_dir: str):
    """
    Plots the benchmark results and saves the plot as an image.

    Args:
        problem_name (str): The name of the problem for the plot title.
        results (defaultdict): The benchmark results.
        output_dir (str): Directory to save the plot.
    """
    plt.figure(figsize=(12, 7))
    for func_name, times_by_size in results.items():
        if not any(not (val is None or val != val) for val in times_by_size.values()): # Check for all NaN/None
            print(f"Skipping plotting for {func_name} due to all NaN/None results.")
            continue
        sizes = sorted(times_by_size.keys())
        times = [times_by_size[s] for s in sizes]
        plt.plot(sizes, times, label=func_name, marker='o', linestyle='--')

    plt.title(f'{problem_name} - Performance Comparison')
    plt.xlabel('Array Size (N)')
    plt.ylabel('Average Execution Time (seconds)')
    plt.xscale('log') # Use log scale for x-axis if sizes vary widely
    plt.yscale('log') # Use log scale for y-axis if times vary widely
    plt.legend()
    plt.grid(True, which="both", ls="-", alpha=0.5)
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, f'{problem_name.replace(" ", "_").lower()}_benchmark.png'))
    plt.close()
    print(f"Plot saved for {problem_name} to {output_dir}/{problem_name.replace(' ', '_').lower()}_benchmark.png")

# --- Main Benchmark Execution ---

if __name__ == "__main__":
    # Problem 1: Max Subarray Sum
    max_subarray_functions = {
        "Brute Force (O(N^2))": max_subarray_sum_brute_force,
        "Kadane's (O(N))": max_subarray_sum_kadane,
    }
    max_subarray_results = run_benchmarks(
        "Max Subarray Sum", max_subarray_functions, ARRAY_SIZES,
        generate_random_array, min_val=-10, max_val=10
    )
    plot_results("Max Subarray Sum", max_subarray_results, RESULT_DIR)

    # Problem 2: Rotate Array
    # Need to generate a fresh array for each function's run as they modify in-place
    rotate_array_functions = {
        "Extra Space (O(N) time, O(N) space)": rotate_array_extra_space,
        "Reverse (O(N) time, O(1) space)": rotate_array_reverse,
    }
    # For rotate_array, 'k' is fixed to a reasonable value for benchmarking purposes.
    # 'k' does not change the complexity substantially.
    fixed_k = 10
    print(f"\nNote: Benchmarking Rotate Array with k={fixed_k}")
    rotate_array_results = defaultdict(lambda: {})
    for size in ARRAY_SIZES:
        print(f"  Benchmarking with array size: {size}...")
        arr_base = generate_random_array(size, min_val=0, max_val=100) # Values don't matter much for rotation
        setup_arr_str = f"arr_base = {repr(arr_base)}\nfixed_k = {fixed_k}"

        for func_name, func_obj in rotate_array_functions.items():
            # timeit.Timer takes a global scope where 'func' and 'arr' are defined.
            # We explicitly pass the copy here to ensure the original array isn't mutated
            # before another function gets to it for the same size.
            timer = timeit.Timer(
                stmt="func(list(arr_base), fixed_k)",
                setup=setup_arr_str,
                globals={'func': func_obj, 'list': list}
            )
            try:
                times = timer.repeat(repeat=NUM_RUNS, number=1)
                avg_time = sum(times) / NUM_RUNS
                rotate_array_results[func_name][size] = avg_time
                print(f"    - {func_name}: {avg_time:.6f} seconds")
            except Exception as e:
                print(f"    - {func_name}: Error - {e}")
                rotate_array_results[func_name][size] = float('nan')
    plot_results("Rotate Array", rotate_array_results, RESULT_DIR)


    # Problem 3: Product of Array Except Self
    product_except_self_functions = {
        "Brute Force (O(N^2))": product_except_self_brute_force,
        "Optimized (O(N) time, O(1) space)": product_except_self_optimized,
    }
    product_except_self_results = run_benchmarks(
        "Product Except Self", product_except_self_functions, ARRAY_SIZES,
        generate_random_array, min_val=-5, max_val=5, allow_duplicates=True # Include zeros for robust test
    )
    plot_results("Product Except Self", product_except_self_results, RESULT_DIR)

    # Problem 4: Merge Overlapping Intervals
    # Intervals need to be generated differently.
    def generate_intervals(size: int, max_coord: int = 1000) -> List[List[int]]:
        intervals = []
        for _ in range(size):
            start = random.randint(0, max_coord)
            end = random.randint(start, start + random.randint(1, max_coord // 10)) # Ensure intervals have some length
            intervals.append([start, end])
        return intervals

    merge_intervals_functions = {
        "Optimized (O(N log N))": merge_intervals,
    }
    merge_intervals_results = run_benchmarks(
        "Merge Overlapping Intervals", merge_intervals_functions, ARRAY_SIZES,
        generate_intervals, max_coord=5000 # Larger coords to prevent too much overlap for N log N to show well
    )
    plot_results("Merge Overlapping Intervals", merge_intervals_results, RESULT_DIR)

    # Problem 5: Find Smallest Missing Positive
    find_missing_functions = {
        "Optimized (O(N) time, O(1) space)": find_missing_positive_optimized,
        "Set-based (O(N) time, O(N) space)": find_missing_positive_set_based,
    }
    # For this problem, numbers need to include negatives, positives, and potentially zeros
    # for a good mix. max_val and min_val should cover a range where a missing positive
    # is likely to be found.
    find_missing_results = run_benchmarks(
        "Find Missing Positive", find_missing_functions, ARRAY_SIZES,
        generate_random_array, min_val=-ARRAY_SIZES[-1]//2, max_val=ARRAY_SIZES[-1] # Range to ensure positives are present
    )
    plot_results("Find Missing Positive", find_missing_results, RESULT_DIR)

    print(f"\nBenchmarks completed. Plots saved in the '{RESULT_DIR}' directory.")
    print("Check the generated PNG files for performance graphs.")