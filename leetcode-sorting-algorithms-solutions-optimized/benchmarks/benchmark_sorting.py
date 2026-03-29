import timeit
import random
import sys
from collections import defaultdict

# Add parent directory to path to import algorithms correctly
sys.path.insert(0, './algorithms')
sys.path.insert(0, './utils')

from sorting_algorithms import insertion_sort, merge_sort, quick_sort
from variations import (
    find_kth_largest_by_sorting,
    find_kth_largest_by_heap,
    find_kth_largest_by_quickselect,
    sort_colors_dutch_national_flag,
    sort_colors_counting_sort,
    wiggle_sort_sort_then_swap,
    wiggle_sort_linear_pass
)
from helpers import (
    generate_random_array,
    generate_sorted_array,
    generate_reverse_sorted_array,
    generate_nearly_sorted_array,
    generate_few_unique_elements_array
)

# --- Configuration ---
NUM_RUNS = 5  # Number of times to run each benchmark
SMALL_N = 100
MEDIUM_N = 1000
LARGE_N = 10000
VERY_LARGE_N = 50000

# To control recursion depth for QuickSort with large inputs in Python,
# though randomized pivot helps mitigate this in average cases.
# Be cautious, increasing too much can lead to stack overflow for deeply recursive calls.
# It's usually better to optimize QuickSort for non-recursive or iterative approach if N is truly huge.
# sys.setrecursionlimit(max(sys.getrecursionlimit(), VERY_LARGE_N * 2))

# Dictionary to store results
results = defaultdict(lambda: defaultdict(lambda: defaultdict(float)))

def run_benchmark(setup_code, statement, test_name, algo_name, N_val):
    """Runs a single benchmark and stores the average time."""
    try:
        times = timeit.repeat(
            stmt=statement,
            setup=setup_code,
            number=1,  # Number of executions of the statement
            repeat=NUM_RUNS # Number of times to repeat the whole execution
        )
        avg_time = sum(times) / NUM_RUNS
        results[test_name][algo_name][N_val] = avg_time
        print(f"  {test_name} - {algo_name} (N={N_val}): {avg_time:.6f} seconds")
    except RecursionError:
        print(f"  {test_name} - {algo_name} (N={N_val}): FAILED (RecursionError)")
        results[test_name][algo_name][N_val] = float('inf') # Indicate failure
    except Exception as e:
        print(f"  {test_name} - {algo_name} (N={N_val}): FAILED ({e})")
        results[test_name][algo_name][N_val] = float('inf')


def benchmark_general_sorts():
    print("--- Benchmarking General Purpose Sorting Algorithms ---")
    sizes = [SMALL_N, MEDIUM_N, LARGE_N, VERY_LARGE_N]
    sort_functions = {
        "Python_Timsort": lambda arr: arr.sort(),
        "Insertion_Sort": insertion_sort,
        "Merge_Sort": merge_sort, # Note: Merge Sort returns a new list
        "Quick_Sort": quick_sort,
    }

    test_data_generators = {
        "Random": generate_random_array,
        "Sorted": generate_sorted_array,
        "Reverse_Sorted": generate_reverse_sorted_array,
        "Nearly_Sorted": lambda n: generate_nearly_sorted_array(n, num_swaps=int(n*0.01)), # 1% swaps
    }

    for data_type, generator_func in test_data_generators.items():
        print(f"\n>> Data Type: {data_type}")
        for N in sizes:
            # Generate the base array once per N and data type
            base_arr = generator_func(N)

            for algo_name, sort_func in sort_functions.items():
                if algo_name == "Insertion_Sort" and N > MEDIUM_N:
                    # Insertion sort is too slow for very large N, skip for practical reasons
                    print(f"  Skipping Insertion_Sort for N={N} (too slow)")
                    continue

                if algo_name == "Merge_Sort":
                    # Merge Sort returns a new list, so no copy needed for in-place
                    setup = f"""
from algorithms.sorting_algorithms import merge_sort
arr = {base_arr}
"""
                    statement = "merge_sort(arr)"
                else:
                    # For in-place sorts (including Python's list.sort() which is in-place Timsort)
                    # We pass a copy to ensure the original is not modified for subsequent tests
                    setup = f"""
from algorithms.sorting_algorithms import insertion_sort, quick_sort
# Python's list.sort() is Timsort
sort_func = lambda arr_list: arr_list.sort() if '{algo_name}' == 'Python_Timsort' else {{'Insertion_Sort': insertion_sort, 'Quick_Sort': quick_sort}}['{algo_name}']
original_arr = {base_arr}
arr = list(original_arr) # Copy for each run
"""
                    statement = "sort_func(arr)"
                
                run_benchmark(setup, statement, data_type, algo_name, N)

def benchmark_kth_largest():
    print("\n--- Benchmarking Kth Largest Element ---")
    sizes = [SMALL_N, MEDIUM_N, LARGE_N, VERY_LARGE_N]
    k_values = {
        "Small_K": lambda n: 1,
        "Medium_K": lambda n: n // 2,
        "Large_K": lambda n: n - 1 # N-1th largest is the smallest
    }
    kth_largest_functions = {
        "Sorting": find_kth_largest_by_sorting,
        "Heap": find_kth_largest_by_heap,
        "Quickselect": find_kth_largest_by_quickselect,
    }

    for k_type, k_func_gen in k_values.items():
        print(f"\n>> K Type: {k_type}")
        for N in sizes:
            k = k_func_gen(N)
            base_arr = generate_random_array(N)

            for algo_name, func in kth_largest_functions.items():
                # Kth largest functions may modify array for quickselect or sort copy internally
                # Ensure a fresh copy of array is used for each run
                setup = f"""
from algorithms.variations import {func.__name__}
original_arr = {base_arr}
target_k = {k}
func = {func.__name__}
"""
                statement = "func(list(original_arr), target_k)" # Pass a copy of the original_arr
                run_benchmark(setup, statement, f"KthLargest_{k_type}", algo_name, N)

def benchmark_sort_colors():
    print("\n--- Benchmarking Sort Colors ---")
    sizes = [SMALL_N, MEDIUM_N, LARGE_N, VERY_LARGE_N]
    sort_colors_functions = {
        "Dutch_National_Flag": sort_colors_dutch_national_flag,
        "Counting_Sort": sort_colors_counting_sort,
        "Python_Timsort_for_012": lambda arr: arr.sort() # As a baseline
    }

    # Data is always 0s, 1s, 2s, but could be mixed or specific distribution
    test_data_generators = {
        "Random_012": lambda n: generate_few_unique_elements_array(n, [0, 1, 2]),
        "Only_0_1": lambda n: generate_few_unique_elements_array(n, [0, 1]),
        "Only_1_2": lambda n: generate_few_unique_elements_array(n, [1, 2]),
        "Reverse_012": lambda n: [2]*(n//3) + [1]*(n//3) + [0]*(n - 2*(n//3)) # specific reverse sorted mix
    }

    for data_type, generator_func in test_data_generators.items():
        print(f"\n>> Data Type: {data_type}")
        for N in sizes:
            base_arr = generator_func(N)

            for algo_name, func in sort_colors_functions.items():
                setup = f"""
from algorithms.variations import sort_colors_dutch_national_flag, sort_colors_counting_sort
original_arr = {base_arr}
arr = list(original_arr) # Ensure fresh copy for in-place modification
"""
                if algo_name == "Python_Timsort_for_012":
                    statement = "arr.sort()"
                else:
                    statement = f"{func.__name__}(arr)"

                run_benchmark(setup, statement, f"SortColors_{data_type}", algo_name, N)

def benchmark_wiggle_sort():
    print("\n--- Benchmarking Wiggle Sort ---")
    sizes = [SMALL_N, MEDIUM_N, LARGE_N, VERY_LARGE_N]
    wiggle_functions = {
        "Sort_Then_Swap": wiggle_sort_sort_then_swap,
        "Linear_Pass": wiggle_sort_linear_pass,
    }

    test_data_generators = {
        "Random": generate_random_array,
        "Sorted": generate_sorted_array,
        "Reverse_Sorted": generate_reverse_sorted_array,
    }

    for data_type, generator_func in test_data_generators.items():
        print(f"\n>> Data Type: {data_type}")
        for N in sizes:
            base_arr = generator_func(N)

            for algo_name, func in wiggle_functions.items():
                setup = f"""
from algorithms.variations import {func.__name__}
original_arr = {base_arr}
arr = list(original_arr) # Ensure fresh copy for in-place modification
"""
                statement = f"{func.__name__}(arr)"
                run_benchmark(setup, statement, f"WiggleSort_{data_type}", algo_name, N)


def print_summary():
    print("\n\n--- BENCHMARK SUMMARY (Average Time in Seconds) ---")
    for test_type, algos in results.items():
        print(f"\n## {test_type.replace('_', ' ')}")
        # Extract all N values found for this test type to ensure consistent column order
        all_n_values = sorted(list(set(n_val for algo_res in algos.values() for n_val in algo_res.keys())))
        if not all_n_values:
            continue

        header = "| Algorithm | " + " | ".join(f"N={n}" for n in all_n_values) + " |"
        print(header)
        print("|-----------|" + "---|" * len(all_n_values))

        for algo_name, n_results in algos.items():
            row = f"| {algo_name.replace('_', ' ')} |"
            for N in all_n_values:
                time = n_results.get(N, float('nan')) # Use nan for missing values
                if time == float('inf'):
                    row += " FAILED |"
                elif time < 0.000001 and time > 0: # Represent very small times nicely
                    row += f" <0.000001 |"
                else:
                    row += f" {time:.6f} |"
            print(row)

if __name__ == "__main__":
    print(f"Starting benchmarks with {NUM_RUNS} runs per test...")
    benchmark_general_sorts()
    benchmark_kth_largest()
    benchmark_sort_colors()
    benchmark_wiggle_sort()
    print("\nAll benchmarks complete.")
    print_summary()