"""
Test module for "Find First and Last Position of Element in Sorted Array" problem.
Tests functions from algorithms.problem_find_first_last.
"""

import pytest
from algorithms.problem_find_first_last import (
    find_first_last_brute_force,
    find_first_last_optimal
)

# Test cases for find_first_last_optimal and find_first_last_brute_force
# Format: (nums, target, expected_range)
TEST_CASES_FIRST_LAST = [
    # General cases
    ([5, 7, 7, 8, 8, 10], 8, [3, 4]),
    ([5, 7, 7, 8, 8, 10], 7, [1, 2]),
    ([5, 7, 7, 8, 8, 10], 5, [0, 0]),
    ([5, 7, 7, 8, 8, 10], 10, [5, 5]),
    ([5, 7, 7, 8, 8, 10], 6, [-1, -1]), # Target not found
    ([5, 7, 7, 8, 8, 10], 4, [-1, -1]), # Target less than min
    ([5, 7, 7, 8, 8, 10], 11, [-1, -1]),# Target greater than max

    # Edge cases
    ([], 0, [-1, -1]),                  # Empty array
    ([1], 1, [0, 0]),                   # Single element, found
    ([1], 0, [-1, -1]),                 # Single element, not found
    ([1, 1, 1, 1, 1], 1, [0, 4]),       # All elements are target
    ([1, 2, 3], 1, [0, 0]),
    ([1, 2, 3], 2, [1, 1]),
    ([1, 2, 3], 3, [2, 2]),
    ([1, 2, 3], 0, [-1, -1]),
    ([1, 1, 2, 2, 2, 3, 3, 3, 3], 1, [0, 1]),
    ([1, 1, 2, 2, 2, 3, 3, 3, 3], 2, [2, 4]),
    ([1, 1, 2, 2, 2, 3, 3, 3, 3], 3, [5, 8]),
    ([1, 1, 2, 2, 2, 3, 3, 3, 3], 4, [-1, -1]),
]

@pytest.mark.parametrize("nums, target, expected_range", TEST_CASES_FIRST_LAST)
def test_find_first_last_optimal(nums, target, expected_range):
    """Test the optimal O(log N) solution using two binary searches."""
    result = find_first_last_optimal(nums, target)
    assert result == expected_range

@pytest.mark.parametrize("nums, target, expected_range", TEST_CASES_FIRST_LAST)
def test_find_first_last_brute_force(nums, target, expected_range):
    """Test the brute-force O(N) linear scan solution."""
    result = find_first_last_brute_force(nums, target)
    assert result == expected_range