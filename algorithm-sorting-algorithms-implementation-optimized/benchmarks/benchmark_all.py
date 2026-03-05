import timeit
import random
from typing import List, Callable, Dict, Any

from core_algorithms.quicksort_mergesort import QuickSort, MergeSort
from core_algorithms.kth_largest_element import KthLargestElement
from core_algorithms.sort_colors import SortColors
from core_algorithms.merge_intervals import MergeIntervals
from utils.array_generator import ArrayGenerator

def run_benchmark(
    function: Callable,
    setup_code: str,
    number: int = 100,
    globals_dict: Dict[str, Any] = None
) -> float:
    """
    Runs a benchmark for a given function and returns its execution time.
    """
    if globals_dict is None:
        globals_dict = globals()
    
    timer = timeit.Timer(stmt="func()", setup=setup_code, globals={"func": function, **globals_dict})
    
    try:
        # Use repeat to get more reliable statistics, but return min for simple comparison
        times = timer.repeat(repeat=3, number=number)
        return min(times)
    except Exception as e:
        print(f"Error during benchmarking {function.__name__}: {e}")
        return float('inf') # Indicate failure or very long time

def benchmark_sorting_algorithms(size: int):
    print(f"\n--- Benchmarking Sorting Algorithms (Array Size: {size}) ---")
    
    # Setup for each algorithm
    # QuickSort modifies in-place, MergeSort.sort returns new list, MergeSort.sort_in_place modifies in-place
    
    # Random array
    random_arr = ArrayGenerator.generate_random_array(size)
    
    # Sorted array (worst case for naive Quicksort, best for many other sorts)
    sorted_arr = ArrayGenerator.generate_sorted_array(size)
    
    # Reverse sorted array (worst case for naive Quicksort)
    reverse_sorted_arr = ArrayGenerator.generate_reverse_sorted_array(size, size * 2)

    # Duplicates array
    duplicates_arr = ArrayGenerator.generate_array_with_duplicates(size, 0, size // 10)

    test_cases = {
        "Random": random_arr,
        "Sorted": sorted_arr,
        "Reverse Sorted": reverse_sorted_arr,
        "Duplicates": duplicates_arr
    }

    results = {}

    for name, original_array in test_cases.items():
        print(f"\n  Dataset: {name}")
        
        # Bench QuickSort (Lomuto, non-randomized)
        arr_copy = list(original_array)
        time_qs_lomuto = run_benchmark(lambda: QuickSort.sort(arr_copy, use_hoare=False, randomized=False), 
                                     f"arr_copy = {original_array!r}",
                                     globals_dict=globals())
        results[f"QuickSort (Lomuto) - {name}"] = time_qs_lomuto
        print(f"    QuickSort (Lomuto): {time_qs_lomuto:.6f} seconds")

        # Bench QuickSort (Hoare, non-randomized)
        arr_copy = list(original_array)
        time_qs_hoare = run_benchmark(lambda: QuickSort.sort(arr_copy, use_hoare=True, randomized=False), 
                                    f"arr_copy = {original_array!r}",
                                    globals_dict=globals())
        results[f"QuickSort (Hoare) - {name}"] = time_qs_hoare
        print(f"    QuickSort (Hoare): {time_qs_hoare:.6f} seconds")

        # Bench QuickSort (Randomized Lomuto)
        arr_copy = list(original_array)
        time_qs_rand_lomuto = run_benchmark(lambda: QuickSort.sort(arr_copy, use_hoare=False, randomized=True), 
                                          f"arr_copy = {original_array!r}",
                                          globals_dict=globals())
        results[f"QuickSort (Rand Lomuto) - {name}"] = time_qs_rand_lomuto
        print(f"    QuickSort (Rand Lomuto): {time_qs_rand_lomuto:.6f} seconds")

        # Bench QuickSort (Randomized Hoare)
        arr_copy = list(original_array)
        time_qs_rand_hoare = run_benchmark(lambda: QuickSort.sort(arr_copy, use_hoare=True, randomized=True), 
                                         f"arr_copy = {original_array!r}",
                                         globals_dict=globals())
        results[f"QuickSort (Rand Hoare) - {name}"] = time_qs_rand_hoare
        print(f"    QuickSort (Rand Hoare): {time_qs_rand_hoare:.6f} seconds")
        
        # Bench MergeSort (Out-of-place)
        arr_copy = list(original_array)
        time_ms_out = run_benchmark(lambda: MergeSort.sort(arr_copy), 
                                   f"arr_copy = {original_array!r}",
                                   globals_dict=globals())
        results[f"MergeSort (Out-of-place) - {name}"] = time_ms_out
        print(f"    MergeSort (Out-of-place): {time_ms_out:.6f} seconds")

        # Bench MergeSort (In-place - actually O(N) aux space)
        arr_copy = list(original_array)
        time_ms_in_place = run_benchmark(lambda: MergeSort.sort_in_place(arr_copy), 
                                       f"arr_copy = {original_array!r}",
                                       globals_dict=globals())
        results[f"MergeSort (In-place) - {name}"] = time_ms_in_place
        print(f"    MergeSort (In-place): {time_ms_in_place:.6f} seconds")

        # Bench Python's Timsort (built-in)
        arr_copy = list(original_array)
        time_timsort = run_benchmark(lambda: arr_copy.sort(), 
                                   f"arr_copy = {original_array!r}",
                                   globals_dict=globals())
        results[f"Python Timsort - {name}"] = time_timsort
        print(f"    Python Timsort: {time_timsort:.6f} seconds")

def benchmark_kth_largest(size: int):
    print(f"\n--- Benchmarking Kth Largest Element (Array Size: {size}) ---")
    
    random_arr = ArrayGenerator.generate_random_array(size, 0, size * 10)
    k_val = random.randint(1, size) # Random k
    
    test_data = {
        "Random": (random_arr, k_val),
        "Sorted (k=mid)": (ArrayGenerator.generate_sorted_array(size), size // 2),
        "Reverse Sorted (k=mid)": (ArrayGenerator.generate_reverse_sorted_array(size, size * 10), size // 2),
        "Duplicates (k=mid)": (ArrayGenerator.generate_array_with_duplicates(size, 0, 10), size // 2)
    }

    for name, (arr, k) in test_data.items():
        print(f"\n  Dataset: {name}, k: {k}")
        
        # Bench Quickselect
        arr_copy_qs = list(arr)
        time_qs = run_benchmark(lambda: KthLargestElement.find_kth_largest_quickselect(arr_copy_qs, k), 
                               f"from core_algorithms.kth_largest_element import KthLargestElement; arr_copy_qs = {arr!r}; k_val = {k}",
                               globals_dict=globals())
        print(f"    Quickselect: {time_qs:.6f} seconds")

        # Bench Heap
        arr_copy_heap = list(arr)
        time_heap = run_benchmark(lambda: KthLargestElement.find_kth_largest_heap(arr_copy_heap, k), 
                                 f"from core_algorithms.kth_largest_element import KthLargestElement; arr_copy_heap = {arr!r}; k_val = {k}",
                                 globals_dict=globals())
        print(f"    Heap: {time_heap:.6f} seconds")

        # Bench Full Sort
        arr_copy_sort = list(arr)
        time_sort = run_benchmark(lambda: KthLargestElement.find_kth_largest_sort(arr_copy_sort, k), 
                                 f"from core_algorithms.kth_largest_element import KthLargestElement; arr_copy_sort = {arr!r}; k_val = {k}",
                                 globals_dict=globals())
        print(f"    Full Sort: {time_sort:.6f} seconds")

def benchmark_sort_colors(size: int):
    print(f"\n--- Benchmarking Sort Colors (Array Size: {size}) ---")
    
    # Colors are 0, 1, 2
    random_colors = [random.randint(0, 2) for _ in range(size)]
    
    test_data = {
        "Random Colors": random_colors,
        "Mostly 0s": [0]*(size // 2) + [1]*(size // 4) + [2]*(size - size//2 - size//4),
        "Mostly 2s": [2]*(size // 2) + [1]*(size // 4) + [0]*(size - size//2 - size//4),
        "Sorted Colors": sorted(random_colors),
        "Reverse Sorted Colors": sorted(random_colors, reverse=True)
    }

    for name, arr in test_data.items():
        print(f"\n  Dataset: {name}")
        
        # Bench Dutch National Flag
        arr_copy_dnf = list(arr)
        time_dnf = run_benchmark(lambda: SortColors.sort_colors_dutch_national_flag(arr_copy_dnf), 
                                f"from core_algorithms.sort_colors import SortColors; arr_copy_dnf = {arr!r}",
                                globals_dict=globals())
        print(f"    Dutch National Flag: {time_dnf:.6f} seconds")

        # Bench Counting Sort
        arr_copy_counting = list(arr)
        time_counting = run_benchmark(lambda: SortColors.sort_colors_counting_sort(arr_copy_counting), 
                                     f"from core_algorithms.sort_colors import SortColors; arr_copy_counting = {arr!r}",
                                     globals_dict=globals())
        print(f"    Counting Sort: {time_counting:.6f} seconds")

        # Bench Python's Timsort
        arr_copy_timsort = list(arr)
        time_timsort = run_benchmark(lambda: SortColors.sort_colors_python_sort(arr_copy_timsort), 
                                    f"from core_algorithms.sort_colors import SortColors; arr_copy_timsort = {arr!r}",
                                    globals_dict=globals())
        print(f"    Python Timsort: {time_timsort:.6f} seconds")

def benchmark_merge_intervals(size: int):
    print(f"\n--- Benchmarking Merge Intervals (Number of Intervals: {size}) ---")
    
    # Generate intervals. Ensure some overlap likelihood.
    intervals_no_overlap = []
    intervals_with_overlap = []
    current_start = 0
    for _ in range(size):
        end = current_start + random.randint(1, 5) # Small intervals, potential for overlap
        intervals_with_overlap.append([current_start, end])
        current_start = end + random.randint(1, 3) # Gap for no overlap
        intervals_no_overlap.append([current_start, current_start + random.randint(1, 2)])
        current_start += random.randint(1, 5)

    random.shuffle(intervals_with_overlap) # Make sure it's not pre-sorted for test
    random.shuffle(intervals_no_overlap)

    test_data = {
        "Heavy Overlap (Unsorted)": intervals_with_overlap,
        "No Overlap (Unsorted)": intervals_no_overlap,
        "Sorted Heavy Overlap": sorted(intervals_with_overlap, key=lambda x: x[0])
    }
    
    for name, intervals_list in test_data.items():
        print(f"\n  Dataset: {name}")
        
        # Bench Optimal Merge
        intervals_copy_optimal = [list(i) for i in intervals_list]
        time_optimal = run_benchmark(lambda: MergeIntervals.merge(intervals_copy_optimal), 
                                    f"from core_algorithms.merge_intervals import MergeIntervals; intervals_copy_optimal = {intervals_list!r}",
                                    globals_dict=globals())
        print(f"    Optimal Merge (Sorted): {time_optimal:.6f} seconds")

        # Bench Naive Merge (no initial sort, single pass logic)
        # This will be slow/incorrect for unsorted lists, but measures its execution.
        intervals_copy_naive = [list(i) for i in intervals_list]
        time_naive = run_benchmark(lambda: MergeIntervals.merge_naive_no_initial_sort(intervals_copy_naive), 
                                  f"from core_algorithms.merge_intervals import MergeIntervals; intervals_copy_naive = {intervals_list!r}",
                                  globals_dict=globals())
        print(f"    Naive Merge (No initial sort, single pass): {time_naive:.6f} seconds")


if __name__ == '__main__':
    # Define array sizes for benchmarking
    SMALL_SIZE = 1_000
    MEDIUM_SIZE = 10_000
    LARGE_SIZE = 50_000

    print("Starting Benchmarks...")
    print(f"Note: Times are typically minimum of 3 runs, each running the function {run_benchmark.__defaults__[2]} times.")

    # Benchmark Problem 1: Quicksort & Mergesort
    benchmark_sorting_algorithms(SMALL_SIZE)
    benchmark_sorting_algorithms(MEDIUM_SIZE)
    # For very large arrays, naive quicksort (non-randomized on sorted data) can hit recursion limits
    # and be very slow (N^2), so skip it or warn if it's expected to be bad.
    # benchmark_sorting_algorithms(LARGE_SIZE) # May be too slow for non-randomized Quicksort on worst-case data.

    # Benchmark Problem 2: Kth Largest Element
    benchmark_kth_largest(SMALL_SIZE)
    benchmark_kth_largest(MEDIUM_SIZE)
    benchmark_kth_largest(LARGE_SIZE)

    # Benchmark Problem 3: Sort Colors
    benchmark_sort_colors(SMALL_SIZE)
    benchmark_sort_colors(MEDIUM_SIZE)
    benchmark_sort_colors(LARGE_SIZE)

    # Benchmark Problem 4: Merge Intervals
    # Interval counts, not array size for individual numbers
    benchmark_merge_intervals(SMALL_SIZE // 10) # Smaller number of intervals for clarity
    benchmark_merge_intervals(MEDIUM_SIZE // 10)
    benchmark_merge_intervals(LARGE_SIZE // 10)

    print("\nBenchmarks Complete.")