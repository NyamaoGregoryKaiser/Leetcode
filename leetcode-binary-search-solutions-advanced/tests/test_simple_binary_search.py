import pytest
from main_algorithms.simple_binary_search import binary_search_iterative

@pytest.mark.parametrize("nums, target, expected", [
    # Basic cases
    ([-1,0,3,5,9,12], 9, 4),
    ([-1,0,3,5,9,12], 2, -1),
    ([5], 5, 0),
    ([1, 2, 3, 4, 5], 1, 0),
    ([1, 2, 3, 4, 5], 5, 4),
    ([1, 2, 3, 4, 5], 3, 2),

    # Edge cases
    ([], 7, -1), # Empty array
    ([1], 0, -1), # Single element, target not present
    ([1], 2, -1), # Single element, target not present
    ([1, 3, 5, 7, 9], 0, -1), # Target smaller than smallest element
    ([1, 3, 5, 7, 9], 10, -1), # Target larger than largest element

    # Larger arrays
    (list(range(100)), 50, 50),
    (list(range(100)), 0, 0),
    (list(range(100)), 99, 99),
    (list(range(100)), -1, -1),
    (list(range(100)), 100, -1),

    # Array with negative numbers
    ([-10, -5, 0, 5, 10], -5, 1),
    ([-10, -5, 0, 5, 10], 0, 2),
    ([-10, -5, 0, 5, 10], -15, -1),
    ([-10, -5, 0, 5, 10], 15, -1),

    # Array with two elements
    ([1, 2], 1, 0),
    ([1, 2], 2, 1),
    ([1, 2], 0, -1),
    ([1, 2], 3, -1),

    # Array with odd length
    ([2, 4, 6, 8, 10], 6, 2),
    ([2, 4, 6, 8, 10], 2, 0),
    ([2, 4, 6, 8, 10], 10, 4),

    # Array with even length
    ([2, 4, 6, 8], 4, 1),
    ([2, 4, 6, 8], 8, 3),
])
def test_binary_search_iterative(nums, target, expected):
    """
    Test cases for the iterative binary search function.
    """
    result = binary_search_iterative(nums, target)
    assert result == expected