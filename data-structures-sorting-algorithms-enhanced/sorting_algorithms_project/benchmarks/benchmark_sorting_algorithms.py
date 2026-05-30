import time
import copy
from collections import defaultdict

from algorithms.bubble_sort import bubble_sort
from algorithms.selection_sort import selection_sort
from algorithms.insertion_sort import insertion_sort
from algorithms.merge_sort import merge_sort, merge_sort_in_place
from algorithms.quick_sort import quick_sort
from algorithms.heap_sort import heap_sort

from utils.array_generator import generate_random_array, generate_sorted_array, \
                                   generate_reverse_sorted_array, generate_array_with_duplicates, \
                                   generate_nearly_sorted_array
from utils.stopwatch import Stopwatch

# Define the sorting algorithms to benchmark
# Use lambda to create new functions that will correctly handle in-place vs. new list returns
# and provide a consistent interface for benchmarking.
sorting_algorithms = {
    "Python_Timsort": lambda arr: sorted(arr), # Built-in sort for comparison
    "Bubble Sort": bubble_sort,
    "Selection Sort": selection_sort,
    "Insertion Sort": insertion_sort,
    "Merge Sort (new list)": lambda arr: merge_sort(copy.deepcopy(arr)),
    "Merge Sort (in-place)": merge_sort_in_place,
    "Quick Sort (last pivot)": lambda arr: quick_sort(arr, pivot_choice="last"),
    "Quick Sort (random pivot)": lambda arr: quick_sort(arr, pivot_choice="random"),
    "Heap Sort": heap_sort,
}

# Configuration for benchmarking
INPUT_SIZES = [10, 100, 1000, 5000, 10000]
# Some algorithms are too slow for large inputs; specify maximum size for them
MAX_SIZES_FOR_N_SQUARED = {
    "Bubble Sort": 2000,
    "Selection Sort": 2000,
    "Insertion Sort": 2000,
}

def run_benchmark(algorithm_name, sort_func, data_type_name, arr_generator_func, size):
    """
    Runs a benchmark for a single sorting algorithm on a specific data type and size.
    """
    original_array = arr_generator_func(size)
    arr_to_sort = copy.deepcopy(original_array)

    # For Merge Sort (new list), we need to handle its return value
    # For in-place sorts, we just call it and the array is modified
    if algorithm_name == "Merge Sort (new list)":
        with Stopwatch(f"{algorithm_name} | {data_type_name} | Size: {size}") as sw:
            _ = sort_func(arr_to_sort) # The lambda already handles deepcopy for this case
    else:
        with Stopwatch(f"{algorithm_name} | {data_type_name} | Size: {size}") as sw:
            sort_func(arr_to_sort)

    return sw.elapsed_time

def main():
    print("--- Starting Sorting Algorithm Benchmarks ---")
    print(f"Input Sizes: {INPUT_SIZES}")
    print(f"Max Sizes for O(N^2) algorithms: {MAX_SIZES_FOR_N_SQUARED}")
    print("-" * 50)

    results = defaultdict(lambda: defaultdict(dict)) # results[algo][data_type][size] = time

    data_types = {
        "Random": generate_random_array,
        "Sorted": generate_sorted_array,
        "Reverse Sorted": generate_reverse_sorted_array,
        "Duplicates": generate_array_with_duplicates,
        "Nearly Sorted": generate_nearly_sorted_array,
    }

    for algo_name, sort_func in sorting_algorithms.items():
        print(f"\nBenchmarking: {algo_name}")
        for data_type_name, arr_generator_func in data_types.items():
            print(f"  Data Type: {data_type_name}")
            for size in INPUT_SIZES:
                # Skip O(N^2) algorithms for very large inputs
                if algo_name in MAX_SIZES_FOR_N_SQUARED and size > MAX_SIZES_FOR_N_SQUARED[algo_name]:
                    print(f"    Skipping size {size} for {algo_name} (too slow for O(N^2)).")
                    continue

                try:
                    time_taken = run_benchmark(algo_name, sort_func, data_type_name, arr_generator_func, size)
                    results[algo_name][data_type_name][size] = time_taken
                except Exception as e:
                    print(f"    Error benchmarking {algo_name} on {data_type_name} with size {size}: {e}")
                    results[algo_name][data_type_name][size] = "ERROR"

    print("\n--- Benchmark Summary ---")
    for algo_name, algo_results in results.items():
        print(f"\nAlgorithm: {algo_name}")
        for data_type_name, data_results in algo_results.items():
            print(f"  {data_type_name}:")
            for size, time_taken in data_results.items():
                if isinstance(time_taken, float):
                    print(f"    Size {size}: {time_taken:.6f}s")
                else:
                    print(f"    Size {size}: {time_taken}")
    print("-" * 50)
    print("Benchmarks Complete.")

if __name__ == "__main__":
    main()
```