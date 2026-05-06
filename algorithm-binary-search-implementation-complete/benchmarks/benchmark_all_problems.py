"""
Performance benchmarking script for Binary Search problems.

This script compares the runtime of optimal (Binary Search based) solutions
against their brute-force (linear scan or sort-based) counterparts.
It uses `timeit` for accurate measurements over large, randomly generated datasets.
"""

import timeit
from functools import partial
import random
from typing import Callable, List

from algorithms.core_binary_search import (
    linear_search, binary_search_iterative,
    binary_search_template_leftmost, binary_search_template_rightmost,
    find_first_occurrence_using_leftmost_template,
    find_last_occurrence_using_rightmost_template
)
from algorithms.problem_search_rotated_array import (
    search_rotated_array_brute_force, search_rotated_array_optimal
)
from algorithms.problem_find_first_last import (
    find_first_last_brute_force, find_first_last_optimal
)
from algorithms.problem_kth_smallest_matrix import (
    kth_smallest_matrix_brute_force, kth_smallest_matrix_optimal
)
from utils.array_generator import (
    generate_sorted_array, generate_rotated_sorted_array, generate_sorted_matrix
)

def run_benchmark(
    func: Callable,
    setup_code: str,
    num_runs: int = 10,
    repeat_count: int = 5
) -> List[float]:
    """
    Runs a benchmark for a given function.

    Args:
        func (Callable): The function to benchmark.
        setup_code (str): Python code to run once before each measurement.
        num_runs (int): Number of executions for each measurement.
        repeat_count (int): How many times to repeat the measurement.

    Returns:
        List[float]: A list of elapsed times for each repetition.
    """
    # Use partial to bind arguments to the function, making it callable with no arguments for timeit
    wrapper = partial(func)
    
    # timeit.repeat returns a list of execution times for 'repeat_count' runs.
    # Each run consists of 'num_runs' calls to the function.
    times = timeit.repeat(wrapper, setup=setup_code, number=num_runs, repeat=repeat_count)
    return times

def print_results(title: str, optimal_times: List[float], brute_force_times: List[float]):
    """Prints formatted benchmark results."""
    print(f"\n--- {title} ---")
    optimal_avg = sum(optimal_times) / len(optimal_times)
    brute_force_avg = sum(brute_force_times) / len(brute_force_times)

    print(f"Optimal ({optimal_times[0].__code__.co_name}): Avg time = {optimal_avg:.6f} seconds")
    print(f"Brute Force ({brute_force_times[0].__code__.co_name}): Avg time = {brute_force_avg:.6f} seconds")
    
    if optimal_avg < brute_force_avg:
        speedup = brute_force_avg / optimal_avg
        print(f"Optimal solution is ~{speedup:.2f}x faster.")
    else:
        print("Brute force was faster or comparable (might be due to small input size or overhead).")

def main():
    print("Starting Binary Search Benchmarks...\n")

    # --- Configuration ---
    ARRAY_SIZE = 1_000_000
    MATRIX_SIZE = 1000 # For N x N matrix
    NUM_RUNS_PER_TEST = 10 # Number of iterations for timeit.repeat
    REPEAT_COUNT = 5 # Number of times to repeat the whole test set

    # --- 1. Core Binary Search ---
    print(f"Benchmarking Core Binary Search with array size: {ARRAY_SIZE}")
    sorted_arr = generate_sorted_array(ARRAY_SIZE, 0, ARRAY_SIZE * 10)
    target_found = random.choice(sorted_arr)
    target_not_found = ARRAY_SIZE * 10 + 1

    # Benchmarking `binary_search_iterative` vs `linear_search` (target found)
    setup = f"from __main__ import binary_search_iterative, linear_search; arr = {sorted_arr}; target = {target_found}"
    bs_iter_times = run_benchmark(lambda: binary_search_iterative(sorted_arr, target_found), setup, NUM_RUNS_PER_TEST, REPEAT_COUNT)
    linear_times = run_benchmark(lambda: linear_search(sorted_arr, target_found), setup, NUM_RUNS_PER_TEST, REPEAT_COUNT)
    print_results("Core Binary Search (Target Found)", bs_iter_times, linear_times)

    # Benchmarking `binary_search_iterative` vs `linear_search` (target not found)
    setup = f"from __main__ import binary_search_iterative, linear_search; arr = {sorted_arr}; target = {target_not_found}"
    bs_iter_times_nf = run_benchmark(lambda: binary_search_iterative(sorted_arr, target_not_found), setup, NUM_RUNS_PER_TEST, REPEAT_COUNT)
    linear_times_nf = run_benchmark(lambda: linear_search(sorted_arr, target_not_found), setup, NUM_RUNS_PER_TEST, REPEAT_COUNT)
    print_results("Core Binary Search (Target Not Found)", bs_iter_times_nf, linear_times_nf)

    # Benchmarking template functions (leftmost/rightmost)
    arr_with_duplicates = sorted([random.randint(0, 100) for _ in range(ARRAY_SIZE // 100)])
    arr_with_duplicates.extend([50] * (ARRAY_SIZE - len(arr_with_duplicates))) # Add many duplicates
    arr_with_duplicates.sort() # Ensure it's sorted with new duplicates
    target_dup = 50
    target_no_dup = random.choice([x for x in arr_with_duplicates if arr_with_duplicates.count(x) == 1])

    setup_dup = f"from __main__ import find_first_occurrence_using_leftmost_template, find_last_occurrence_using_rightmost_template; arr = {arr_with_duplicates}; target = {target_dup}"
    first_occ_times = run_benchmark(lambda: find_first_occurrence_using_leftmost_template(arr_with_duplicates, target_dup), setup_dup, NUM_RUNS_PER_TEST, REPEAT_COUNT)
    last_occ_times = run_benchmark(lambda: find_last_occurrence_using_rightmost_template(arr_with_duplicates, target_dup), setup_dup, NUM_RUNS_PER_TEST, REPEAT_COUNT)
    print(f"\n--- Core Binary Search Templates (Array size: {len(arr_with_duplicates)}) ---")
    print(f"First Occurrence (Target {target_dup}): Avg time = {sum(first_occ_times)/len(first_occ_times):.6f} seconds")
    print(f"Last Occurrence (Target {target_dup}): Avg time = {sum(last_occ_times)/len(last_occ_times):.6f} seconds")


    # --- 2. Search in Rotated Sorted Array ---
    print(f"\nBenchmarking Search in Rotated Sorted Array with array size: {ARRAY_SIZE}")
    rotated_arr = generate_rotated_sorted_array(ARRAY_SIZE, 0, ARRAY_SIZE * 10, random.randint(0, ARRAY_SIZE - 1))
    target_rot_found = random.choice(rotated_arr)
    target_rot_not_found = ARRAY_SIZE * 10 + 1

    # Benchmarking `search_rotated_array_optimal` vs `search_rotated_array_brute_force` (target found)
    setup = f"from __main__ import search_rotated_array_optimal, search_rotated_array_brute_force; arr = {rotated_arr}; target = {target_rot_found}"
    rot_optimal_times = run_benchmark(lambda: search_rotated_array_optimal(rotated_arr, target_rot_found), setup, NUM_RUNS_PER_TEST, REPEAT_COUNT)
    rot_brute_times = run_benchmark(lambda: search_rotated_array_brute_force(rotated_arr, target_rot_found), setup, NUM_RUNS_PER_TEST, REPEAT_COUNT)
    print_results("Search Rotated Array (Target Found)", rot_optimal_times, rot_brute_times)

    # Benchmarking `search_rotated_array_optimal` vs `search_rotated_array_brute_force` (target not found)
    setup = f"from __main__ import search_rotated_array_optimal, search_rotated_array_brute_force; arr = {rotated_arr}; target = {target_rot_not_found}"
    rot_optimal_times_nf = run_benchmark(lambda: search_rotated_array_optimal(rotated_arr, target_rot_not_found), setup, NUM_RUNS_PER_TEST, REPEAT_COUNT)
    rot_brute_times_nf = run_benchmark(lambda: search_rotated_array_brute_force(rotated_arr, target_rot_not_found), setup, NUM_RUNS_PER_TEST, REPEAT_COUNT)
    print_results("Search Rotated Array (Target Not Found)", rot_optimal_times_nf, rot_brute_times_nf)


    # --- 3. Find First and Last Position ---
    print(f"\nBenchmarking Find First and Last Position with array size: {ARRAY_SIZE}")
    # Use array with many duplicates for good test case
    sorted_arr_dup = [i // 10 for i in range(ARRAY_SIZE)] # e.g., [0,0,0,0,0,0,0,0,0,0,1,1,1...]
    target_dup = random.choice(sorted_arr_dup)
    target_not_found_dup = ARRAY_SIZE // 10 + 10 # A value likely not in the array

    # Benchmarking `find_first_last_optimal` vs `find_first_last_brute_force` (target found)
    setup = f"from __main__ import find_first_last_optimal, find_first_last_brute_force; arr = {sorted_arr_dup}; target = {target_dup}"
    ffl_optimal_times = run_benchmark(lambda: find_first_last_optimal(sorted_arr_dup, target_dup), setup, NUM_RUNS_PER_TEST, REPEAT_COUNT)
    ffl_brute_times = run_benchmark(lambda: find_first_last_brute_force(sorted_arr_dup, target_dup), setup, NUM_RUNS_PER_TEST, REPEAT_COUNT)
    print_results("Find First/Last (Target Found)", ffl_optimal_times, ffl_brute_times)

    # Benchmarking `find_first_last_optimal` vs `find_first_last_brute_force` (target not found)
    setup = f"from __main__ import find_first_last_optimal, find_first_last_brute_force; arr = {sorted_arr_dup}; target = {target_not_found_dup}"
    ffl_optimal_times_nf = run_benchmark(lambda: find_first_last_optimal(sorted_arr_dup, target_not_found_dup), setup, NUM_RUNS_PER_TEST, REPEAT_COUNT)
    ffl_brute_times_nf = run_benchmark(lambda: find_first_last_brute_force(sorted_arr_dup, target_not_found_dup), setup, NUM_RUNS_PER_TEST, REPEAT_COUNT)
    print_results("Find First/Last (Target Not Found)", ffl_optimal_times_nf, ffl_brute_times_nf)


    # --- 4. Kth Smallest Element in a Sorted Matrix ---
    print(f"\nBenchmarking Kth Smallest Element in Sorted Matrix with size: {MATRIX_SIZE}x{MATRIX_SIZE}")
    matrix = generate_sorted_matrix(MATRIX_SIZE, MATRIX_SIZE, 0, MATRIX_SIZE * MATRIX_SIZE)
    # k can be any valid index
    k_val = random.randint(1, MATRIX_SIZE * MATRIX_SIZE)
    
    # Benchmarking `kth_smallest_matrix_optimal` vs `kth_smallest_matrix_brute_force`
    setup_matrix = f"""
from __main__ import kth_smallest_matrix_optimal, kth_smallest_matrix_brute_force
matrix = {matrix}
k = {k_val}
"""
    kth_optimal_times = run_benchmark(lambda: kth_smallest_matrix_optimal(matrix, k_val), setup_matrix, num_runs=1, repeat_count=REPEAT_COUNT) # num_runs=1 for matrix as it's expensive
    kth_brute_times = run_benchmark(lambda: kth_smallest_matrix_brute_force(matrix, k_val), setup_matrix, num_runs=1, repeat_count=REPEAT_COUNT)
    print_results(f"Kth Smallest Matrix (k={k_val})", kth_optimal_times, kth_brute_times)


    print("\nBenchmarks finished.")

if __name__ == "__main__":
    main()