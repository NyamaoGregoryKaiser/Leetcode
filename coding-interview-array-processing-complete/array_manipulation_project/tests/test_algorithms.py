import pytest
from src.algorithms import (
    max_subarray_sum_brute_force, max_subarray_sum_kadane,
    rotate_array_extra_space, rotate_array_reverse,
    product_except_self_brute_force, product_except_self_optimized,
    merge_intervals,
    find_missing_positive_optimized, find_missing_positive_set_based
)

# --- Test Cases for Maximum Subarray Sum ---

@pytest.mark.parametrize("arr, expected", [
    ([1], 1),
    ([-1], -1),
    ([1, 2, 3], 6),
    ([-2, 1, -3, 4, -1, 2, 1, -5, 4], 6), # Standard Kadane example
    ([5, 4, -1, 7, 8], 23),
    ([-2, -3, -1], -1), # All negative numbers
    ([0, 0, 0], 0),
    ([0, -1, 0], 0),
    ([1, -5, 1, 2], 3),
    ([1, -2, 3, 4, -5, 6], 7),
    ([7, -3, 4, -1, -2, 1, 5, -3], 13), # Multiple positive segments
])
def test_max_subarray_sum(arr, expected):
    """
    Test cases for both max_subarray_sum_brute_force and max_subarray_sum_kadane.
    """
    assert max_subarray_sum_brute_force(arr) == expected
    assert max_subarray_sum_kadane(arr) == expected

def test_max_subarray_sum_empty_array():
    """
    Test case for empty array input, which should raise a ValueError.
    """
    with pytest.raises(ValueError):
        max_subarray_sum_brute_force([])
    with pytest.raises(ValueError):
        max_subarray_sum_kadane([])

# --- Test Cases for Rotate Array ---

@pytest.mark.parametrize("nums_initial, k, expected", [
    ([1, 2, 3, 4, 5, 6, 7], 3, [5, 6, 7, 1, 2, 3, 4]),
    ([-1, -100, 3, 99], 2, [3, 99, -1, -100]),
    ([1, 2], 1, [2, 1]),
    ([1, 2], 2, [1, 2]), # k = n, no change
    ([1, 2], 3, [2, 1]), # k > n
    ([1], 0, [1]),
    ([1], 1, [1]),
    ([1], 5, [1]),
    ([], 5, []), # Empty array
    ([1, 2, 3, 4, 5, 6], 0, [1, 2, 3, 4, 5, 6]), # k = 0
])
def test_rotate_array(nums_initial, k, expected):
    """
    Test cases for both rotate_array_extra_space and rotate_array_reverse.
    Note: Arrays are modified in-place, so a copy is made for each test.
    """
    # Test rotate_array_extra_space
    nums_copy_1 = list(nums_initial)
    rotate_array_extra_space(nums_copy_1, k)
    assert nums_copy_1 == expected

    # Test rotate_array_reverse
    nums_copy_2 = list(nums_initial)
    rotate_array_reverse(nums_copy_2, k)
    assert nums_copy_2 == expected

# --- Test Cases for Product of Array Except Self ---

@pytest.mark.parametrize("nums, expected", [
    ([1, 2, 3, 4], [24, 12, 8, 6]),
    ([-1, 1, 0, -3, 3], [0, 0, 9, 0, 0]),
    ([0, 0], [0, 0]),
    ([1, 0], [0, 1]),
    ([5], [1]),
    ([1, 2], [2, 1]),
    ([-1, -2, -3], [-6, -3, -2]),
    ([1, 2, 3, 0, 4], [0, 0, 0, 24, 0]),
])
def test_product_except_self(nums, expected):
    """
    Test cases for both product_except_self_brute_force and product_except_self_optimized.
    """
    assert product_except_self_brute_force(nums) == expected
    assert product_except_self_optimized(nums) == expected

def test_product_except_self_empty_array():
    """
    Test case for empty array input.
    """
    assert product_except_self_brute_force([]) == []
    assert product_except_self_optimized([]) == []

# --- Test Cases for Merge Overlapping Intervals ---

@pytest.mark.parametrize("intervals, expected", [
    ([[1, 3], [2, 6], [8, 10], [15, 18]], [[1, 6], [8, 10], [15, 18]]),
    ([[1, 4], [4, 5]], [[1, 5]]),
    ([[1, 4], [0, 4]], [[0, 4]]),
    ([[1, 4], [0, 0]], [[0, 0], [1, 4]]),
    ([[1, 4], [0, 1]], [[0, 4]]),
    ([[1, 4], [2, 3]], [[1, 4]]), # Contained interval
    ([[1, 4], [0, 5]], [[0, 5]]), # Contains another
    ([], []), # Empty list
    ([[1, 5]], [[1, 5]]), # Single interval
    ([[1, 2], [3, 4], [5, 6]], [[1, 2], [3, 4], [5, 6]]), # No overlap
    ([[1, 10], [2, 3], [4, 5], [6, 7]], [[1, 10]]), # Many contained/overlapping
    ([[2, 3], [4, 5], [6, 7], [8, 9], [1, 10]], [[1, 10]]), # Unsorted, full overlap
    ([[2, 4], [1, 5], [3, 6]], [[1, 6]]), # Chained overlap
])
def test_merge_intervals(intervals, expected):
    """
    Test cases for merge_intervals.
    """
    assert merge_intervals(intervals) == expected

# --- Test Cases for Find Missing Positive ---

@pytest.mark.parametrize("nums, expected", [
    ([1, 2, 0], 3),
    ([3, 4, -1, 1], 2),
    ([7, 8, 9, 11, 12], 1),
    ([1], 2),
    ([2], 1),
    ([-5, -2, 0, 1, 2, 3, 5], 4),
    ([1, 2, 3, 4, 5], 6),
    ([], 1),
    ([1, 1], 2),
    ([1, 1000], 2),
    ([1000, 1], 2),
    ([2, 2], 1),
    ([0], 1),
    ([-1, -2, -3], 1),
    ([5, 1, 2, 3, 4], 6), # Array already almost sorted
    ([4, 1, 2, 3], 5),
    ([1, 3, 2], 4),
])
def test_find_missing_positive(nums, expected):
    """
    Test cases for find_missing_positive_optimized and find_missing_positive_set_based.
    Note: `find_missing_positive_optimized` modifies the array in-place,
          so a copy is made for each test.
    """
    # Test find_missing_positive_optimized
    nums_copy_1 = list(nums)
    assert find_missing_positive_optimized(nums_copy_1) == expected

    # Test find_missing_positive_set_based
    nums_copy_2 = list(nums) # Not strictly needed as set-based doesn't modify, but for consistency.
    assert find_missing_positive_set_based(nums_copy_2) == expected