"""
This module contains comprehensive unit tests for all binary search problems
implemented in the project using pytest.
"""

import pytest
from typing import List, Tuple

# Import optimal solutions
from main_algorithms.standard_binary_search import (
    binary_search_iterative,
    find_first_occurrence,
    find_last_occurrence,
    find_first_and_last_occurrence
)
from main_algorithms.search_rotated_sorted_array import search_rotated_array
from main_algorithms.find_peak_element import find_peak_element
from main_algorithms.kth_smallest_in_sorted_matrix import kth_smallest_element

# Import brute-force solutions for sanity checks (optional, but good for confidence)
from solutions_bruteforce.bruteforce_search import (
    linear_search,
    bruteforce_find_first_occurrence,
    bruteforce_find_last_occurrence,
    bruteforce_find_first_and_last_occurrence
)
from solutions_bruteforce.bruteforce_rotated_search import bruteforce_search_rotated_array
from solutions_bruteforce.bruteforce_peak_element import bruteforce_find_peak_element

# Import recursive solutions for comparison
from solutions_recursive.recursive_binary_search import (
    binary_search_recursive,
    find_first_occurrence_recursive,
    find_last_occurrence_recursive,
    find_first_and_last_occurrence_recursive
)


# --- Test Cases for Standard Binary Search ---
@pytest.mark.parametrize("arr, target, expected", [
    ([1, 2, 3, 4, 5], 3, 2),
    ([1, 2, 3, 4, 5], 1, 0),
    ([1, 2, 3, 4, 5], 5, 4),
    ([1, 2, 3, 4, 5], 0, -1),
    ([1, 2, 3, 4, 5], 6, -1),
    ([], 5, -1),
    ([5], 5, 0),
    ([5], 1, -1),
    ([1, 3, 5, 7, 9], 3, 1),
    ([1, 3, 5, 7, 9], 8, -1),
    ([2, 4, 6, 8, 10, 12, 14, 16], 10, 4),
    ([2, 4, 6, 8, 10, 12, 14, 16], 11, -1),
    (list(range(1000)), 500, 500),
    (list(range(1000)), -1, -1),
    (list(range(1000)), 1000, -1),
])
def test_binary_search_iterative(arr: List[int], target: int, expected: int):
    assert binary_search_iterative(arr, target) == expected
    # Optional: cross-check with brute-force
    assert binary_search_iterative(arr, target) == linear_search(arr, target)

@pytest.mark.parametrize("arr, target, expected", [
    ([1, 2, 3, 4, 5], 3, 2),
    ([1, 2, 3, 4, 5], 1, 0),
    ([1, 2, 3, 4, 5], 5, 4),
    ([1, 2, 3, 4, 5], 0, -1),
    ([1, 2, 3, 4, 5], 6, -1),
    ([], 5, -1),
    ([5], 5, 0),
    ([5], 1, -1),
])
def test_binary_search_recursive(arr: List[int], target: int, expected: int):
    assert binary_search_recursive(arr, target) == expected


# --- Test Cases for First Occurrence ---
@pytest.mark.parametrize("arr, target, expected", [
    ([1, 2, 3, 3, 3, 4, 5], 3, 2),
    ([3, 3, 3, 4, 5], 3, 0),
    ([1, 2, 3, 4, 5], 3, 2), # No duplicates, should find index
    ([1, 2, 4, 5], 3, -1),
    ([], 1, -1),
    ([5], 5, 0),
    ([5], 1, -1),
    ([1, 1, 1, 1, 1], 1, 0),
    ([1, 2, 2, 2, 3], 2, 1),
    ([1, 2, 3, 4, 5, 5, 5, 5, 6], 5, 5),
    (list(range(1000)), 500, 500),
])
def test_find_first_occurrence(arr: List[int], target: int, expected: int):
    assert find_first_occurrence(arr, target) == expected
    assert find_first_occurrence_recursive(arr, target) == expected
    # Optional: cross-check with brute-force
    assert find_first_occurrence(arr, target) == bruteforce_find_first_occurrence(arr, target)


# --- Test Cases for Last Occurrence ---
@pytest.mark.parametrize("arr, target, expected", [
    ([1, 2, 3, 3, 3, 4, 5], 3, 4),
    ([1, 2, 3, 3, 3], 3, 4),
    ([1, 2, 3, 4, 5], 3, 2), # No duplicates, should find index
    ([1, 2, 4, 5], 3, -1),
    ([], 1, -1),
    ([5], 5, 0),
    ([5], 1, -1),
    ([1, 1, 1, 1, 1], 1, 4),
    ([1, 2, 2, 2, 3], 2, 3),
    ([1, 2, 3, 4, 5, 5, 5, 5, 6], 5, 8),
    (list(range(1000)), 500, 500),
])
def test_find_last_occurrence(arr: List[int], target: int, expected: int):
    assert find_last_occurrence(arr, target) == expected
    assert find_last_occurrence_recursive(arr, target) == expected
    # Optional: cross-check with brute-force
    assert find_last_occurrence(arr, target) == bruteforce_find_last_occurrence(arr, target)


# --- Test Cases for First and Last Occurrence ---
@pytest.mark.parametrize("arr, target, expected", [
    ([1, 2, 3, 3, 3, 4, 5], 3, (2, 4)),
    ([1, 2, 3, 4, 5], 3, (2, 2)),
    ([1, 2, 4, 5], 3, (-1, -1)),
    ([], 1, (-1, -1)),
    ([5], 5, (0, 0)),
    ([1, 1, 1, 1, 1], 1, (0, 4)),
    ([1, 2, 2, 2, 3], 2, (1, 3)),
    ([1, 2, 3, 4, 5, 5, 5, 5, 6], 5, (5, 8)),
])
def test_find_first_and_last_occurrence(arr: List[int], target: int, expected: Tuple[int, int]):
    assert find_first_and_last_occurrence(arr, target) == expected
    assert find_first_and_last_occurrence_recursive(arr, target) == expected
    # Optional: cross-check with brute-force
    assert find_first_and_last_occurrence(arr, target) == bruteforce_find_first_and_last_occurrence(arr, target)


# --- Test Cases for Search in Rotated Sorted Array ---
@pytest.mark.parametrize("nums, target, expected", [
    ([4, 5, 6, 7, 0, 1, 2], 0, 4),
    ([4, 5, 6, 7, 0, 1, 2], 3, -1),
    ([1], 0, -1),
    ([1], 1, 0),
    ([1, 2], 1, 0),
    ([1, 2], 2, 1),
    ([2, 1], 1, 1),
    ([2, 1], 2, 0),
    ([3, 1, 2], 1, 1),
    ([3, 1, 2], 2, 2),
    ([3, 1, 2], 3, 0),
    ([5, 1, 2, 3, 4], 1, 1),
    ([5, 1, 2, 3, 4], 5, 0),
    ([1, 3], 3, 1),
    ([1, 3], 1, 0),
    ([], 5, -1),
    ([4, 5, 6, 7, 8, 1, 2, 3], 8, 4),
    ([4, 5, 6, 7, 8, 1, 2, 3], 3, 7),
    ([4, 5, 6, 7, 8, 1, 2, 3], 0, -1),
    ([10, 11, 12, 13, 14, 15, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 6, 12),
])
def test_search_rotated_array(nums: List[int], target: int, expected: int):
    assert search_rotated_array(nums, target) == expected
    # Optional: cross-check with brute-force
    assert search_rotated_array(nums, target) == bruteforce_search_rotated_array(nums, target)


# --- Test Cases for Find Peak Element ---
@pytest.mark.parametrize("nums, expected_possible_indices", [
    ([1, 2, 3, 1], {2}),
    ([1, 2, 1, 3, 5, 6, 4], {1, 5}), # Multiple peaks, any is fine
    ([1], {0}),
    ([1, 2], {1}),
    ([2, 1], {0}),
    ([3, 2, 1], {0}),
    ([1, 2, 3], {2}),
    ([10, 20, 15, 2, 23, 90, 67], {1, 5}),
    ([1, 1, 1], {0, 1, 2}), # Note: problem statement usually ensures nums[i] != nums[i+1].
                             # If duplicates are allowed, any point could be considered a peak
                             # depending on strict definition. This implementation finds one.
    ([0, 1, 0], {1}),
    ([0, 0, 1, 0, 0], {2}),
])
def test_find_peak_element(nums: List[int], expected_possible_indices: set):
    # For peak element, multiple valid answers exist, so we check if the result is one of them.
    if not nums: # Handle empty array case explicitly as our solution returns -1
        assert find_peak_element(nums) == -1
        return

    result = find_peak_element(nums)
    assert result in expected_possible_indices

    # Optional: cross-check with brute-force
    # Brute force might return the first peak found. We just check if it's a valid peak.
    if bruteforce_find_peak_element(nums) != -1: # bruteforce also returns -1 for empty, so check
        bf_result = bruteforce_find_peak_element(nums)
        assert bf_result in expected_possible_indices


@pytest.mark.parametrize("nums", [
    [],
])
def test_find_peak_element_empty(nums: List[int]):
    assert find_peak_element(nums) == -1
    assert bruteforce_find_peak_element(nums) == -1


# --- Test Cases for Kth Smallest Element in Sorted Matrix ---
@pytest.mark.parametrize("matrix, k, expected", [
    ([[1, 5, 9], [10, 11, 13], [12, 13, 15]], 8, 13),
    ([[1, 2], [1, 3]], 3, 2),
    ([[-5]], 1, -5),
    ([[1, 4, 7, 11], [2, 5, 8, 12], [3, 6, 9, 16], [10, 13, 14, 17]], 5, 5),
    ([[1, 4, 7, 11], [2, 5, 8, 12], [3, 6, 9, 16], [10, 13, 14, 17]], 10, 10),
    ([[1, 4, 7, 11], [2, 5, 8, 12], [3, 6, 9, 16], [10, 13, 14, 17]], 16, 17),
    ([[1, 1, 3], [1, 2, 3], [2, 3, 3]], 1, 1),
    ([[1, 1, 3], [1, 2, 3], [2, 3, 3]], 3, 1),
    ([[1, 1, 3], [1, 2, 3], [2, 3, 3]], 5, 2),
    ([[1, 1, 3], [1, 2, 3], [2, 3, 3]], 9, 3),
    ([[1]], 1, 1),
])
def test_kth_smallest_element(matrix: List[List[int]], k: int, expected: int):
    assert kth_smallest_element(matrix, k) == expected

@pytest.mark.parametrize("matrix, k", [
    ([], 1),
    ([[1]], 0),
    ([[1, 2], [3, 4]], 5),
    ([[1]], -1),
])
def test_kth_smallest_element_invalid_inputs(matrix: List[List[int]], k: int):
    with pytest.raises(ValueError):
        kth_smallest_element(matrix, k)