"""
Test module for "Search in Rotated Sorted Array" problem.
Tests functions from algorithms.problem_search_rotated_array.
"""

import pytest
from algorithms.problem_search_rotated_array import (
    search_rotated_array_brute_force,
    search_rotated_array_optimal
)

# Test cases for search_rotated_array_optimal and search_rotated_array_brute_force
# Format: (nums, target, expected_idx)
# Note: For optimal solution, if target is found, the index must be correct.
# For brute force, any valid index where the target is found is acceptable.
TEST_CASES_ROTATED = [
    # General cases
    ([4, 5, 6, 7, 0, 1, 2], 0, 4),
    ([4, 5, 6, 7, 0, 1, 2], 3, -1),
    ([4, 5, 6, 7, 0, 1, 2], 4, 0),
    ([4, 5, 6, 7, 0, 1, 2], 2, 6),
    ([1, 2, 3, 4, 5, 6, 7], 1, 0),  # No rotation
    ([1, 2, 3, 4, 5, 6, 7], 7, 6),  # No rotation
    ([1, 2, 3, 4, 5, 6, 7], 4, 3),  # No rotation
    ([1, 2, 3, 4, 5, 6, 7], 8, -1), # No rotation, not found

    # Edge cases
    ([], 5, -1),                   # Empty array
    ([1], 1, 0),                   # Single element, found
    ([1], 0, -1),                  # Single element, not found
    ([3, 1], 1, 1),                # Two elements, target second
    ([3, 1], 3, 0),                # Two elements, target first
    ([5, 1, 3], 5, 0),             # Three elements, target first
    ([5, 1, 3], 1, 1),             # Three elements, target middle
    ([5, 1, 3], 3, 2),             # Three elements, target last
    ([5, 1, 3], 0, -1),            # Three elements, not found
    ([1, 3], 3, 1),                # Two elements, target second (no rotation effectively)

    # Larger arrays
    ([6, 7, 8, 9, 10, 0, 1, 2, 3, 4, 5], 0, 5),
    ([6, 7, 8, 9, 10, 0, 1, 2, 3, 4, 5], 8, 2),
    ([6, 7, 8, 9, 10, 0, 1, 2, 3, 4, 5], 5, 10),
    ([6, 7, 8, 9, 10, 0, 1, 2, 3, 4, 5], 11, -1),

    # Duplicate value (problem statement implies distinct values, but good to test if it handles it)
    # The problem statement in the algorithms file says "distinct values", so this test might not be
    # strictly necessary for this specific problem, but it's good for general robustness.
    # ([1, 1, 1, 1, 1, 0, 1], 0, 5), # This specific case can break the O(logN) guarantee if not handled carefully
    # ([1,0,1,1,1], 0, 1), # Another tricky case with duplicates
]


@pytest.mark.parametrize("nums, target, expected_idx", TEST_CASES_ROTATED)
def test_search_rotated_array_optimal(nums, target, expected_idx):
    """Test the optimal O(log N) binary search solution."""
    result = search_rotated_array_optimal(nums, target)
    assert result == expected_idx


@pytest.mark.parametrize("nums, target, expected_idx", TEST_CASES_ROTATED)
def test_search_rotated_array_brute_force(nums, target, expected_idx):
    """Test the brute-force O(N) linear search solution."""
    result = search_rotated_array_brute_force(nums, target)
    assert result == expected_idx