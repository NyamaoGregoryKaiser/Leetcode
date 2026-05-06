"""
Test module for "Kth Smallest Element in a Sorted Matrix" problem.
Tests functions from algorithms.problem_kth_smallest_matrix.
"""

import pytest
from algorithms.problem_kth_smallest_matrix import (
    kth_smallest_matrix_brute_force,
    kth_smallest_matrix_optimal,
    _count_less_equal
)

# Test cases for kth_smallest_matrix_optimal and kth_smallest_matrix_brute_force
# Format: (matrix, k, expected_value)
TEST_CASES_KTH_SMALLEST = [
    # Example from problem statement
    ([[1, 5, 9], [10, 11, 13], [12, 13, 15]], 8, 13),
    ([[1, 5, 9], [10, 11, 13], [12, 13, 15]], 1, 1),
    ([[1, 5, 9], [10, 11, 13], [12, 13, 15]], 9, 15),

    # Different k values
    ([[1, 2], [3, 4]], 1, 1),
    ([[1, 2], [3, 4]], 2, 2),
    ([[1, 2], [3, 4]], 3, 3),
    ([[1, 2], [3, 4]], 4, 4),

    # Larger matrix
    ([[1, 4, 7, 11, 15],
      [2, 5, 8, 12, 19],
      [3, 6, 9, 16, 22],
      [10, 13, 14, 17, 24],
      [18, 21, 23, 26, 30]], 5, 5), # 5th smallest is 5
    ([[1, 4, 7, 11, 15],
      [2, 5, 8, 12, 19],
      [3, 6, 9, 16, 22],
      [10, 13, 14, 17, 24],
      [18, 21, 23, 26, 30]], 12, 14), # 12th smallest is 14
    ([[1, 4, 7, 11, 15],
      [2, 5, 8, 12, 19],
      [3, 6, 9, 16, 22],
      [10, 13, 14, 17, 24],
      [18, 21, 23, 26, 30]], 25, 30), # 25th smallest is 30

    # Duplicates
    ([[1, 1, 3], [3, 3, 6], [6, 6, 9]], 1, 1),
    ([[1, 1, 3], [3, 3, 6], [6, 6, 9]], 2, 1),
    ([[1, 1, 3], [3, 3, 6], [6, 6, 9]], 3, 3),
    ([[1, 1, 3], [3, 3, 6], [6, 6, 9]], 5, 3), # 5th smallest is 3
    ([[1, 1, 3], [3, 3, 6], [6, 6, 9]], 7, 6),

    # Single row/column
    ([[1, 2, 3, 4, 5]], 3, 3),
    ([[1], [2], [3], [4], [5]], 2, 2),

    # 1x1 matrix
    ([[10]], 1, 10),
]

# Test cases for _count_less_equal helper function
# Format: (matrix, value, expected_count)
TEST_CASES_COUNT_LESS_EQUAL = [
    ([[1, 5, 9], [10, 11, 13], [12, 13, 15]], 0, 0),
    ([[1, 5, 9], [10, 11, 13], [12, 13, 15]], 1, 1),
    ([[1, 5, 9], [10, 11, 13], [12, 13, 15]], 4, 1),
    ([[1, 5, 9], [10, 11, 13], [12, 13, 15]], 9, 3),
    ([[1, 5, 9], [10, 11, 13], [12, 13, 15]], 10, 4),
    ([[1, 5, 9], [10, 11, 13], [12, 13, 15]], 13, 8),
    ([[1, 5, 9], [10, 11, 13], [12, 13, 15]], 15, 9),
    ([[1, 5, 9], [10, 11, 13], [12, 13, 15]], 16, 9),
    ([[1, 1, 3], [3, 3, 6], [6, 6, 9]], 1, 2),
    ([[1, 1, 3], [3, 3, 6], [6, 6, 9]], 3, 5),
    ([[1, 1, 3], [3, 3, 6], [6, 6, 9]], 5, 5),
    ([[1, 1, 3], [3, 3, 6], [6, 6, 9]], 6, 7),
    ([[10]], 5, 0),
    ([[10]], 10, 1),
    ([[10]], 15, 1),
]


@pytest.mark.parametrize("matrix, value, expected_count", TEST_CASES_COUNT_LESS_EQUAL)
def test_count_less_equal(matrix, value, expected_count):
    """Test the _count_less_equal helper function."""
    assert _count_less_equal(matrix, value) == expected_count


@pytest.mark.parametrize("matrix, k, expected_value", TEST_CASES_KTH_SMALLEST)
def test_kth_smallest_matrix_optimal(matrix, k, expected_value):
    """Test the optimal O(N log(Max-Min)) binary search solution."""
    result = kth_smallest_matrix_optimal(matrix, k)
    assert result == expected_value


@pytest.mark.parametrize("matrix, k, expected_value", TEST_CASES_KTH_SMALLEST)
def test_kth_smallest_matrix_brute_force(matrix, k, expected_value):
    """Test the brute-force O(N^2 log(N^2)) solution."""
    result = kth_smallest_matrix_brute_force(matrix, k)
    assert result == expected_value


# Test for invalid k values (should raise ValueError)
@pytest.mark.parametrize("matrix, k", [
    ([[1]], 0),
    ([[1]], 2),
    ([[1,2],[3,4]], 0),
    ([[1,2],[3,4]], 5),
])
def test_kth_smallest_matrix_invalid_k(matrix, k):
    """Test that invalid k values raise ValueError."""
    with pytest.raises(ValueError):
        kth_smallest_matrix_optimal(matrix, k)
    with pytest.raises(ValueError):
        kth_smallest_matrix_brute_force(matrix, k)


# Test for empty matrix (should raise ValueError)
@pytest.mark.parametrize("matrix", [
    [],
    [[]],
    [[], []]
])
def test_kth_smallest_matrix_empty_matrix(matrix):
    """Test that empty matrices raise ValueError."""
    with pytest.raises(ValueError):
        kth_smallest_matrix_optimal(matrix, 1)
    with pytest.raises(ValueError):
        kth_smallest_matrix_brute_force(matrix, 1)