import pytest
from algorithms.problem_fibonacci_sequence import (
    fibonacci_recursive,
    fibonacci_memoization,
    fibonacci_memoization_lru_cache,
    fibonacci_tabulation,
    fibonacci_space_optimized
)

# Define test cases: (n, expected_result)
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
    (10, 55),
    (15, 610),
    (20, 6765),
    (30, 832040),
    (35, 9227465),
    (40, 102334155),
]

# List of all Fibonacci functions to test
fib_functions = [
    fibonacci_recursive,
    fibonacci_memoization,
    fibonacci_memoization_lru_cache,
    fibonacci_tabulation,
    fibonacci_space_optimized
]

# For fibonacci_recursive, we limit the test cases due to its exponential time complexity.
# It would be too slow for n > ~30.
fib_recursive_test_cases = [
    (0, 0), (1, 1), (2, 1), (3, 2), (4, 3), (5, 5), (6, 8), (7, 13), (8, 21), (9, 34), (10, 55), (20, 6765)
]

@pytest.mark.parametrize("n, expected", fib_recursive_test_cases)
def test_fibonacci_recursive(n, expected):
    assert fibonacci_recursive(n) == expected

@pytest.mark.parametrize("n, expected", test_cases)
def test_fibonacci_memoization(n, expected):
    assert fibonacci_memoization(n) == expected

@pytest.mark.parametrize("n, expected", test_cases)
def test_fibonacci_memoization_lru_cache(n, expected):
    # Clear cache before each test to ensure fresh computation if function is reused
    fibonacci_memoization_lru_cache.cache_clear()
    assert fibonacci_memoization_lru_cache(n) == expected

@pytest.mark.parametrize("n, expected", test_cases)
def test_fibonacci_tabulation(n, expected):
    assert fibonacci_tabulation(n) == expected

@pytest.mark.parametrize("n, expected", test_cases)
def test_fibonacci_space_optimized(n, expected):
    assert fibonacci_space_optimized(n) == expected

# Test edge cases for negative input
@pytest.mark.parametrize("func", fib_functions)
def test_fibonacci_negative_input(func):
    with pytest.raises(ValueError, match="Input must be a non-negative integer"):
        func(-1)
    with pytest.raises(ValueError, match="Input must be a non-negative integer"):
        func(-5)

# Test with a very large number that might cause issues with recursion depth
# for non-iterative solutions if not properly memoized/tabulated.
# Note: For fibonacci_recursive, this would definitely cause a RecursionError or timeout.
@pytest.mark.parametrize("func", [
    fibonacci_memoization,
    fibonacci_memoization_lru_cache,
    fibonacci_tabulation,
    fibonacci_space_optimized
])
def test_fibonacci_large_n(func):
    # F(90) is a large number, but computable within reasonable time for O(N) solutions
    # The actual value of F(90) = 2880067194370816120
    assert func(90) == 2880067194370816120

    # Test clearing lru_cache for good measure
    if func == fibonacci_memoization_lru_cache:
        func.cache_clear()
        assert func(90) == 2880067194370816120