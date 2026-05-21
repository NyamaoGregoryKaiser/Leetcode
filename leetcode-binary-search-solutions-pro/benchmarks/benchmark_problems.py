"""
This module contains performance benchmarking scripts for various binary search problems.
It compares the execution time of optimal (binary search) solutions against brute-force
(linear scan) solutions for varying input sizes.
"""

import time
import random
from typing import List, Callable

# Import algorithms
from main_algorithms.standard_binary_search import (
    binary_search_iterative,
    find_first_occurrence,
    find_last_occurrence,
    find_first_and_last_occurrence
)
from main_algorithms.search_rotated_sorted_array import search_rotated_array
from main_algorithms.find_peak_element import find_peak_element
from main_algorithms.kth_smallest_in_sorted_matrix import kth_smallest_element

from solutions_bruteforce.bruteforce_search import (
    linear_search,
    bruteforce_find_first_occurrence,
    bruteforce_find_last_occurrence,
    bruteforce_find_first_and_last_occurrence
)
from solutions_bruteforce.bruteforce_rotated_search import bruteforce_search_rotated_array
from solutions_bruteforce.bruteforce_peak_element import bruteforce_find_peak_element

from utils.array_generators import generate_sorted_array, generate_rotated_array, generate_matrix


def benchmark_function(func: Callable, *args, num_runs: int = 100) -> float:
    """
    Benchmarks a given function by running it multiple times and returning the average execution time.

    Args:
        func (Callable): The function to benchmark.
        *args: Arguments to pass to the function.
        num_runs (int): Number of times to run the function for averaging.

    Returns:
        float: The average execution time in milliseconds.
    """
    total_time = 0
    for _ in range(num_runs):
        start_time = time.perf_counter()
        func(*args)
        end_time = time.perf_counter()
        total_time += (end_time - start_time)
    return (total_time / num_runs) * 1000 # Convert to milliseconds


def run_benchmarks():
    """
    Runs benchmarks for all implemented binary search problems against their
    brute-force counterparts.
    """
    print("--- Binary Search Algorithm Benchmarks ---")
    print(f"{'Input Size':<15} | {'Algorithm':<30} | {'Avg Time (ms)':<15} | {'Speedup'}")
    print("-" * 75)

    input_sizes = [100, 1_000, 10_000, 100_000, 1_000_000]
    num_runs = 50 # Reduce runs for larger inputs to keep total benchmark time reasonable

    # --- 1. Standard Binary Search ---
    print("\n[Problem: Standard Binary Search]")
    for size in input_sizes:
        arr = generate_sorted_array(size)
        target = random.choice(arr) if size > 0 else 0 # Target usually exists
        if size > 0 and random.random() < 0.2: # Occasionally target not found
            target = random.randint(arr[-1] + 1, arr[-1] + 100)
        
        if size == 0: target = 0 # Handle empty array case
            
        bs_time = benchmark_function(binary_search_iterative, arr, target, num_runs=num_runs)
        ls_time = benchmark_function(linear_search, arr, target, num_runs=num_runs)
        
        speedup = ls_time / bs_time if bs_time > 0 else float('inf')
        
        print(f"{size:<15} | {'Binary Search (Iterative)':<30} | {bs_time:<15.4f} | {speedup:.2f}x")
        print(f"{'':<15} | {'Linear Search (Brute-force)':<30} | {ls_time:<15.4f} | {'1.00x'}")
        if size == input_sizes[-1]: # For the largest size, also benchmark recursive
            bs_rec_time = benchmark_function(binary_search_recursive, arr, target, num_runs=num_runs)
            speedup_rec = ls_time / bs_rec_time if bs_rec_time > 0 else float('inf')
            print(f"{'':<15} | {'Binary Search (Recursive)':<30} | {bs_rec_time:<15.4f} | {speedup_rec:.2f}x")
        print("-" * 75)

    # --- 2. Find First/Last Occurrence ---
    print("\n[Problem: Find First/Last Occurrence]")
    # For this, ensure arrays with duplicates are generated for realistic tests
    input_sizes_first_last = [100, 1_000, 10_000, 100_000, 500_000]
    for size in input_sizes_first_last:
        arr = generate_sorted_array(size, min_val=0, max_val=size//10, allow_duplicates=True) # Many duplicates
        if size > 0:
            target = random.choice(arr)
        else:
            target = 0
            
        bs_first_time = benchmark_function(find_first_occurrence, arr, target, num_runs=num_runs)
        bf_first_time = benchmark_function(bruteforce_find_first_occurrence, arr, target, num_runs=num_runs)
        speedup_first = bf_first_time / bs_first_time if bs_first_time > 0 else float('inf')
        
        bs_last_time = benchmark_function(find_last_occurrence, arr, target, num_runs=num_runs)
        bf_last_time = benchmark_function(bruteforce_find_last_occurrence, arr, target, num_runs=num_runs)
        speedup_last = bf_last_time / bs_last_time if bs_last_time > 0 else float('inf')

        print(f"{size:<15} | {'First Occurrence (Optimal)':<30} | {bs_first_time:<15.4f} | {speedup_first:.2f}x")
        print(f"{'':<15} | {'First Occurrence (Brute-force)':<30} | {bf_first_time:<15.4f} | {'1.00x'}")
        print(f"{'':<15} | {'Last Occurrence (Optimal)':<30} | {bs_last_time:<15.4f} | {speedup_last:.2f}x")
        print(f"{'':<15} | {'Last Occurrence (Brute-force)':<30} | {bf_last_time:<15.4f} | {'1.00x'}")
        print("-" * 75)


    # --- 3. Search in Rotated Sorted Array ---
    print("\n[Problem: Search in Rotated Sorted Array]")
    for size in input_sizes:
        arr = generate_rotated_array(size)
        target = random.choice(arr) if size > 0 else 0
        if size > 0 and random.random() < 0.2:
            target = random.randint(max(arr) + 1, max(arr) + 100) # Target not found
        
        bs_rotated_time = benchmark_function(search_rotated_array, arr, target, num_runs=num_runs)
        bf_rotated_time = benchmark_function(bruteforce_search_rotated_array, arr, target, num_runs=num_runs)
        
        speedup_rotated = bf_rotated_time / bs_rotated_time if bs_rotated_time > 0 else float('inf')
        
        print(f"{size:<15} | {'Rotated Search (Optimal)':<30} | {bs_rotated_time:<15.4f} | {speedup_rotated:.2f}x")
        print(f"{'':<15} | {'Rotated Search (Brute-force)':<30} | {bf_rotated_time:<15.4f} | {'1.00x'}")
        print("-" * 75)


    # --- 4. Find Peak Element ---
    print("\n[Problem: Find Peak Element]")
    # Peak element brute-force is also linear scan, so similar speedup profile.
    for size in input_sizes:
        arr = generate_sorted_array(size) # Start with sorted to guarantee peak at ends
        if size > 1:
            # Introduce a random peak
            peak_idx = random.randint(0, size - 1)
            arr[peak_idx] = random.randint(arr[peak_idx] + 1, arr[peak_idx] + 100)
            if peak_idx > 0: arr[peak_idx] = max(arr[peak_idx], arr[peak_idx-1] + 1)
            if peak_idx < size - 1: arr[peak_idx] = max(arr[peak_idx], arr[peak_idx+1] + 1)
        
        bs_peak_time = benchmark_function(find_peak_element, arr, num_runs=num_runs)
        bf_peak_time = benchmark_function(bruteforce_find_peak_element, arr, num_runs=num_runs)
        
        speedup_peak = bf_peak_time / bs_peak_time if bs_peak_time > 0 else float('inf')
        
        print(f"{size:<15} | {'Peak Element (Optimal)':<30} | {bs_peak_time:<15.4f} | {speedup_peak:.2f}x")
        print(f"{'':<15} | {'Peak Element (Brute-force)':<30} | {bf_peak_time:<15.4f} | {'1.00x'}")
        print("-" * 75)


    # --- 5. Kth Smallest Element in Sorted Matrix ---
    print("\n[Problem: Kth Smallest Element in Sorted Matrix]")
    matrix_sizes = [10, 50, 100, 200, 500] # N x N matrix, so N is row/col count
    num_runs_matrix = 10 # Fewer runs due to higher complexity per run
    
    # Brute-force for matrix: Flatten and sort (O(N^2 log(N^2))) or use min-heap (O(K log(N)))
    # For now, we only benchmark the optimal solution.
    # Implementing a brute-force for this would be complex for a simple linear scan,
    # and even min-heap approaches have different complexities.
    for size in matrix_sizes:
        matrix = generate_matrix(size, size, min_val=0, max_val=size*size*2)
        k = random.randint(1, size * size)
        
        kth_smallest_time = benchmark_function(kth_smallest_element, matrix, k, num_runs=num_runs_matrix)
        
        # Brute-force for this problem: Flatten the matrix and sort it
        # flatten_matrix = sorted([item for sublist in matrix for item in sublist])
        # bf_kth_time = benchmark_function(lambda m, k_val: flatten_matrix[k_val-1], matrix, k, num_runs=num_runs_matrix)
        # speedup_kth = bf_kth_time / kth_smallest_time if kth_smallest_time > 0 else float('inf')
        # print(f"{size}x{size:<12} | {'Kth Smallest (Optimal)':<30} | {kth_smallest_time:<15.4f} | {speedup_kth:.2f}x (vs flatten/sort)")
        
        print(f"{size}x{size:<12} | {'Kth Smallest (Optimal)':<30} | {kth_smallest_time:<15.4f} | {'N/A'}")
        print("-" * 75)


if __name__ == '__main__':
    run_benchmarks()