import pytest
from main_algorithms.find_first_last_position import find_first_last_position

@pytest.mark.parametrize("nums, target, expected", [
    # Basic cases with duplicates
    ([5,7,7,8,8,10], 8, [3,4]),
    ([5,7,7,8,8,10], 7, [1,2]),
    ([5,7,7,8,8,10], 5, [0,0]),
    ([5,7,7,8,8,10], 10, [5,5]),

    # Target not found
    ([5,7,7,8,8,10], 6, [-1,-1]),
    ([5,7,7,8,8,10], 4, [-1,-1]),
    ([5,7,7,8,8,10], 11, [-1,-1]),

    # Empty array
    ([], 0, [-1,-1]),

    # Single element array
    ([1], 1, [0,0]),
    ([1], 0, [-1,-1]),

    # All elements are the target
    ([1,1,1,1,1], 1, [0,4]),

    # No duplicates
    ([1,2,3,4,5], 3, [2,2]),
    ([1,2,3,4,5], 1, [0,0]),
    ([1,2,3,4,5], 5, [4,4]),

    # Larger array with duplicates
    ([1,1,1,2,2,3,3,3,3,4,4,5,5,5,5,5], 1, [0,2]),
    ([1,1,1,2,2,3,3,3,3,4,4,5,5,5,5,5], 2, [3,4]),
    ([1,1,1,2,2,3,3,3,3,4,4,5,5,5,5,5], 3, [5,8]),
    ([1,1,1,2,2,3,3,3,3,4,4,5,5,5,5,5], 4, [9,10]),
    ([1,1,1,2,2,3,3,3,3,4,4,5,5,5,5,5], 5, [11,15]),

    # Target not in large array
    ([1,1,1,2,2,3,3,3,3,4,4,5,5,5,5,5], 0, [-1,-1]),
    ([1,1,1,2,2,3,3,3,3,4,4,5,5,5,5,5], 6, [-1,-1]),
    ([1,1,1,2,2,3,3,3,3,4,4,5,5,5,5,5], 2.5, [-1,-1]), # Test a value between elements

    # Array with negative numbers
    ([-5,-5,-3,-1,0,0,0,2,2], -5, [0,1]),
    ([-5,-5,-3,-1,0,0,0,2,2], 0, [4,6]),
    ([-5,-5,-3,-1,0,0,0,2,2], 2, [7,8]),
    ([-5,-5,-3,-1,0,0,0,2,2], -4, [-1,-1]),
])
def test_find_first_last_position(nums, target, expected):
    """
    Test cases for finding the first and last position of an element.
    """
    result = find_first_last_position(nums, target)
    assert result == expected