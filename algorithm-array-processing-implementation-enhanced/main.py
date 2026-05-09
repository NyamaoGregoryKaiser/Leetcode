import sys
import os

# Add the project root to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))

from problems.p1_rotate_array import (
    rotate_array_brute_force,
    rotate_array_extra_space,
    rotate_array_reverse,
    rotate_array_cyclic_replacements
)
from problems.p2_max_subarray_sum import (
    max_subarray_brute_force,
    max_subarray_dp_kadane
)
from problems.p3_merge_intervals import merge_intervals_sorted
from problems.p4_two_sum_variations import (
    two_sum_hash_map,
    two_sum_two_pointers_sorted,
    three_sum,
    four_sum
)
from problems.p5_next_permutation import next_permutation_in_place
from utils.array_utils import print_array_line

def run_p1_rotate_array():
    print("\n--- Problem 1: Rotate Array ---")
    arr = [1, 2, 3, 4, 5, 6, 7]
    k = 3
    print(f"Original array: {print_array_line(arr)}, k = {k}")

    # Make copies for each method as some operate in-place
    arr_bf = list(arr)
    rotate_array_brute_force(arr_bf, k)
    print(f"Brute Force:    {print_array_line(arr_bf)}")

    arr_es = list(arr)
    rotate_array_extra_space(arr_es, k)
    print(f"Extra Space:    {print_array_line(arr_es)}")

    arr_rev = list(arr)
    rotate_array_reverse(arr_rev, k)
    print(f"Reverse Method: {print_array_line(arr_rev)}")

    arr_cyc = list(arr)
    rotate_array_cyclic_replacements(arr_cyc, k)
    print(f"Cyclic Rep.:    {print_array_line(arr_cyc)}")

    arr_small = [1, 2]
    k_small = 3
    print(f"\nOriginal array: {print_array_line(arr_small)}, k = {k_small} (k > len(arr))")
    arr_small_rev = list(arr_small)
    rotate_array_reverse(arr_small_rev, k_small)
    print(f"Reverse Method: {print_array_line(arr_small_rev)}")

def run_p2_max_subarray_sum():
    print("\n--- Problem 2: Maximum Subarray Sum ---")
    arrays = [
        [-2, 1, -3, 4, -1, 2, 1, -5, 4],
        [1],
        [5, 4, -1, 7, 8],
        [-1, -2, -3, -4],
        [0]
    ]

    for arr in arrays:
        sum_bf = max_subarray_brute_force(arr)
        sum_kadane = max_subarray_dp_kadane(arr)
        print(f"Array: {print_array_line(arr)}")
        print(f"  Brute Force Sum: {sum_bf}")
        print(f"  Kadane's Sum:    {sum_kadane}")
        assert sum_bf == sum_kadane, f"Mismatch for {arr}"

def run_p3_merge_intervals():
    print("\n--- Problem 3: Merge Intervals ---")
    intervals_sets = [
        [[1, 3], [2, 6], [8, 10], [15, 18]],
        [[1, 4], [4, 5]],
        [[1, 4], [0, 4]],
        [[1, 4], [0, 0]],
        [[1, 2], [3, 4], [5, 6]],
        []
    ]

    for intervals in intervals_sets:
        print(f"Input:  {print_array_line(intervals)}")
        merged = merge_intervals_sorted(intervals)
        print(f"Output: {print_array_line(merged)}")

def run_p4_two_sum_variations():
    print("\n--- Problem 4: Two Sum Variations ---")
    nums_two_sum = [2, 7, 11, 15]
    target_two_sum = 9
    print(f"Two Sum: {print_array_line(nums_two_sum)}, target = {target_two_sum}")
    print(f"  Hash Map:       {two_sum_hash_map(nums_two_sum, target_two_sum)}")
    print(f"  Two Pointers:   {two_sum_two_pointers_sorted(list(nums_two_sum), target_two_sum)}") # Pass copy

    nums_three_sum = [-1, 0, 1, 2, -1, -4]
    print(f"\nThree Sum: {print_array_line(nums_three_sum)}")
    print(f"  Result: {print_array_line(three_sum(nums_three_sum))}")

    nums_four_sum = [1, 0, -1, 0, -2, 2]
    target_four_sum = 0
    print(f"\nFour Sum: {print_array_line(nums_four_sum)}, target = {target_four_sum}")
    print(f"  Result: {print_array_line(four_sum(nums_four_sum, target_four_sum))}")

    nums_three_sum_dups = [0,0,0,0]
    print(f"\nThree Sum Duplicates: {print_array_line(nums_three_sum_dups)}")
    print(f"  Result: {print_array_line(three_sum(nums_three_sum_dups))}")

def run_p5_next_permutation():
    print("\n--- Problem 5: Next Permutation ---")
    test_cases = [
        [1, 2, 3],      # Expected: [1, 3, 2]
        [3, 2, 1],      # Expected: [1, 2, 3]
        [1, 1, 5],      # Expected: [1, 5, 1]
        [1, 5, 1],      # Expected: [5, 1, 1]
        [1, 3, 2],      # Expected: [2, 1, 3]
        [2, 1, 3],      # Expected: [2, 3, 1]
        [2, 3, 1],      # Expected: [3, 1, 2]
        [5, 4, 7, 5, 3, 2] # Expected: [5, 4, 7, 2, 3, 5]
    ]

    for i, nums in enumerate(test_cases):
        original_nums = list(nums)
        next_permutation_in_place(nums)
        print(f"Original: {print_array_line(original_nums)} -> Next Permutation: {print_array_line(nums)}")

if __name__ == "__main__":
    run_p1_rotate_array()
    run_p2_max_subarray_sum()
    run_p3_merge_intervals()
    run_p4_two_sum_variations()
    run_p5_next_permutation()