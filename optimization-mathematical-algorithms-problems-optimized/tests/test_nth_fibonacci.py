import pytest
from problems.problem_02_nth_fibonacci import (
    fibonacci_naive_recursive,
    fibonacci_memoized,
    fibonacci_iterative_dp,
    fibonacci_matrix_exponentiation
)

# Test cases for all functions
test_cases = [
    (0, 0),
    (1, 1),
    (2, 1),
    (3, 2),
    (4, 3),
    (5, 5),
    (6, 8),
    (7, 13),
    (8, 21),
    (9, 34),
    (10, 55),
    (20, 6765),
    (30, 832040),
]

# Test naive recursive (only for small N due to performance)
@pytest.mark.parametrize("n, expected", test_cases[:10]) # Limiting to N=9
def test_fibonacci_naive_recursive(n, expected):
    assert fibonacci_naive_recursive(n) == expected

def test_fibonacci_naive_recursive_negative():
    with pytest.raises(ValueError, match="Input must be a non-negative integer."):
        fibonacci_naive_recursive(-1)

# Test memoized, iterative, and matrix exponentiation for wider range of N
@pytest.mark.parametrize("func", [
    fibonacci_memoized,
    fibonacci_iterative_dp,
    fibonacci_matrix_exponentiation
])
@pytest.mark.parametrize("n, expected", test_cases)
def test_fibonacci_all_optimized(func, n, expected):
    # Memoized needs an empty dict for each call
    if func == fibonacci_memoized:
        assert func(n, {}) == expected
    else:
        assert func(n) == expected

# Test larger N for efficient methods
@pytest.mark.parametrize("func", [
    fibonacci_memoized,
    fibonacci_iterative_dp,
    fibonacci_matrix_exponentiation
])
def test_fibonacci_large_n(func):
    if func == fibonacci_memoized:
        assert func(50, {}) == 12586269025
        assert func(100, {}) == 354224848179261915075
    else:
        assert func(50) == 12586269025
        assert func(100) == 354224848179261915075
    # Matrix exponentiation can handle even larger, but standard iterative is fine for this range in tests.
    if func == fibonacci_matrix_exponentiation:
        # F(1000) is a very large number, Python handles arbitrary precision.
        # This will be correct as Python integers handle arbitrary size.
        # fibonacci_iterative_dp(1000) calculation is 434 digits long.
        assert func(1000) == fibonacci_iterative_dp(1000)

@pytest.mark.parametrize("func", [
    fibonacci_memoized,
    fibonacci_iterative_dp,
    fibonacci_matrix_exponentiation
])
def test_fibonacci_negative_input_optimized(func):
    with pytest.raises(ValueError, match="Input must be a non-negative integer."):
        if func == fibonacci_memoized:
            func(-1, {})
        else:
            func(-1)

# Test specific matrix exponentiation behavior for n=0, n=1, n=2
def test_fibonacci_matrix_exponentiation_small_n():
    assert fibonacci_matrix_exponentiation(0) == 0
    assert fibonacci_matrix_exponentiation(1) == 1
    assert fibonacci_matrix_exponentiation(2) == 1
    assert fibonacci_matrix_exponentiation(3) == 2

# Test a slightly larger n for recursion depth check for naive
# @pytest.mark.xfail(reason="Naive recursive solution hits recursion limit or is too slow for N > ~35")
# def test_fibonacci_naive_recursive_large_fail():
#     fibonacci_naive_recursive(40) # Should hit recursion limit or timeout if not xfail