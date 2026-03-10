import pytest
from main_algorithms.rotated_sorted_array import search_rotated_sorted_array

@pytest.mark.parametrize("nums, target, expected", [
    # Basic rotated cases
    ([4,5,6,7,0,1,2], 0, 4),
    ([4,5,6,7,0,1,2], 3, -1), # Target not present
    ([4,5,6,7,0,1,2], 7, 3), # Target in first sorted part
    ([4,5,6,7,0,1,2], 4, 0), # Target at start of first sorted part
    ([4,5,6,7,0,1,2], 2, 6), # Target at end of second sorted part

    # No rotation
    ([0,1,2,4,5,6,7], 0, 0),
    ([0,1,2,4,5,6,7], 4, 3),
    ([0,1,2,4,5,6,7], 7, 6),
    ([0,1,2,4,5,6,7], 3, -1),

    # Single element array
    ([1], 1, 0),
    ([1], 0, -1),

    # Two elements array
    ([1,3], 1, 0),
    ([1,3], 3, 1),
    ([3,1], 3, 0),
    ([3,1], 1, 1),
    ([1,3], 2, -1),
    ([3,1], 2, -1),

    # Three elements array
    ([3,5,1], 3, 0),
    ([3,5,1], 5, 1),
    ([3,5,1], 1, 2),
    ([5,1,3], 5, 0),
    ([5,1,3], 1, 1),
    ([5,1,3], 3, 2),
    ([1,3,5], 1, 0),
    ([1,3,5], 3, 1),
    ([1,3,5], 5, 2),
    ([3,5,1], 2, -1),

    # Larger arrays
    ([6,7,8,9,0,1,2,3,4,5], 0, 4),
    ([6,7,8,9,0,1,2,3,4,5], 9, 3),
    ([6,7,8,9,0,1,2,3,4,5], 5, 9),
    ([6,7,8,9,0,1,2,3,4,5], 10, -1),

    # Pivot at index 0 (effectively no rotation, or rotated by full length)
    ([1,2,3,4,5], 1, 0),
    ([1,2,3,4,5], 5, 4),

    # Pivot at last index (last element moved to front)
    ([2,3,4,5,1], 1, 4),
    ([2,3,4,5,1], 2, 0),

    # Duplicates are not allowed per constraints, so no tests for that.
])
def test_search_rotated_sorted_array(nums, target, expected):
    """
    Test cases for searching in a rotated sorted array.
    """
    result = search_rotated_sorted_array(nums, target)
    assert result == expected