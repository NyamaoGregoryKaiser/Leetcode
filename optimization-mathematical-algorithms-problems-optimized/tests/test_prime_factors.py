import pytest
from problems.problem_01_prime_factors import (
    get_prime_factors_brute_force,
    get_prime_factors_optimized,
    get_prime_factors_with_counts_optimized
)

@pytest.mark.parametrize("func", [
    get_prime_factors_brute_force,
    get_prime_factors_optimized
])
def test_prime_factors_basic(func):
    assert func(12) == [2, 2, 3]
    assert func(7) == [7]
    assert func(100) == [2, 2, 5, 5]
    assert func(2) == [2]
    assert func(4) == [2, 2]
    assert func(1) == []
    assert func(0) == []
    assert func(13) == [13]
    assert func(25) == [5, 5]
    assert func(30) == [2, 3, 5]
    assert func(8) == [2, 2, 2]

@pytest.mark.parametrize("func", [
    get_prime_factors_brute_force,
    get_prime_factors_optimized
])
def test_prime_factors_large_numbers(func):
    # A large composite number
    assert func(999999999) == [3, 3, 3, 7, 11, 13, 37]
    # A large prime number
    assert func(15485863) == [15485863] # 15485863 is a prime number
    # A large number with many factors of 2
    assert func(2**20) == [2] * 20
    # A large composite number formed by large primes
    # 1000000007 is a prime
    # 1000000000039 is a prime
    # 1000000007 * 1000000000039 = 10000000070000000000000273 - too large for direct check with current sqrt limit
    # For now, let's stick to numbers that fit within typical calculation bounds without arbitrary precision issues.
    assert func(2 * 3 * 5 * 7 * 11 * 13 * 17) == [2, 3, 5, 7, 11, 13, 17] # 510510
    assert func(510510) == [2, 3, 5, 7, 11, 13, 17]


def test_prime_factors_optimized_negative_input():
    with pytest.raises(ValueError, match="Input must be a positive integer."):
        get_prime_factors_optimized(-5)
    with pytest.raises(ValueError, match="Input must be a positive integer."):
        get_prime_factors_brute_force(-1) # Though brute force allows it to terminate, it's not well-defined.

# Test the version that returns counts
def test_prime_factors_with_counts_optimized():
    assert get_prime_factors_with_counts_optimized(12) == {2: 2, 3: 1}
    assert get_prime_factors_with_counts_optimized(7) == {7: 1}
    assert get_prime_factors_with_counts_optimized(100) == {2: 2, 5: 2}
    assert get_prime_factors_with_counts_optimized(1) == {}
    assert get_prime_factors_with_counts_optimized(0) == {}
    assert get_prime_factors_with_counts_optimized(999999999) == {3: 3, 7: 1, 11: 1, 13: 1, 37: 1}
    assert get_prime_factors_with_counts_optimized(2**10) == {2: 10}
    assert get_prime_factors_with_counts_optimized(13) == {13: 1}

def test_prime_factors_with_counts_optimized_negative_input():
    with pytest.raises(ValueError, match="Input must be a positive integer."):
        get_prime_factors_with_counts_optimized(-10)

# Add a check for the internal assumption on negative numbers for completeness.
# The current implementations implicitly handle `n < 1` by returning `[]` or `{}`.
# Let's adjust them to explicitly raise a ValueError for negative inputs to be strict.
# (This modification should be done in the problem file itself if desired.)
# For now, the test expects a ValueError. If the problem file doesn't raise, this test fails.
# Re-checked problem files, added ValueError for negative.
def test_prime_factors_negative_input_raises_error():
    with pytest.raises(ValueError, match="Input must be a positive integer."):
        get_prime_factors_optimized(-10)
    with pytest.raises(ValueError, match="Input must be a positive integer."):
        get_prime_factors_brute_force(-10)
    with pytest.raises(ValueError, match="Input must be a positive integer."):
        get_prime_factors_with_counts_optimized(-10)