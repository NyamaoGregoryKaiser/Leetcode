import pytest
import math
from problems.problem_04_power_function import (
    power_naive,
    power_binary_exponentiation_recursive,
    power_binary_exponentiation_iterative
)

# Use a small tolerance for floating point comparisons
FLOAT_TOLERANCE = 1e-9

# Test cases (x, n, expected_result)
test_cases = [
    (2.0, 10, 1024.0),
    (2.1, 3, 9.261),
    (2.0, -2, 0.25),
    (0.0, 5, 0.0),
    (5.0, 0, 1.0),
    (-2.0, 3, -8.0),
    (-2.0, 2, 4.0),
    (1.0, 1000, 1.0),
    (-1.0, 1000, 1.0),
    (-1.0, 1001, -1.0),
    (0.5, 4, 0.0625), # 1/16
    (0.5, -4, 16.0),
    (10.0, 1, 10.0),
    (10.0, -1, 0.1),
]

@pytest.mark.parametrize("x, n, expected", test_cases)
def test_power_naive(x, n, expected):
    result = power_naive(x, n)
    assert math.isclose(result, expected, rel_tol=FLOAT_TOLERANCE)

@pytest.mark.parametrize("x, n, expected", test_cases)
def test_power_binary_exponentiation_recursive(x, n, expected):
    result = power_binary_exponentiation_recursive(x, n)
    assert math.isclose(result, expected, rel_tol=FLOAT_TOLERANCE)

@pytest.mark.parametrize("x, n, expected", test_cases)
def test_power_binary_exponentiation_iterative(x, n, expected):
    result = power_binary_exponentiation_iterative(x, n)
    assert math.isclose(result, expected, rel_tol=FLOAT_TOLERANCE)

# Edge cases for x=0 and negative N
def test_power_x_zero_negative_n():
    assert power_naive(0.0, -5) == float('inf')
    assert power_binary_exponentiation_recursive(0.0, -5) == float('inf')
    assert power_binary_exponentiation_iterative(0.0, -5) == float('inf')

# Test with large exponents for optimized methods (naive would be too slow)
def test_power_large_n_optimized():
    # Test positive large N
    assert math.isclose(power_binary_exponentiation_iterative(2.0, 30), 2**30, rel_tol=FLOAT_TOLERANCE)
    assert math.isclose(power_binary_exponentiation_recursive(2.0, 30), 2**30, rel_tol=FLOAT_TOLERANCE)
    # Test negative large N
    assert math.isclose(power_binary_exponentiation_iterative(2.0, -30), 1 / (2**30), rel_tol=FLOAT_TOLERANCE)
    assert math.isclose(power_binary_exponentiation_recursive(2.0, -30), 1 / (2**30), rel_tol=FLOAT_TOLERANCE)

    # Test with maximum possible N (2^31 - 1)
    MAX_INT = 2**31 - 1
    assert math.isclose(power_binary_exponentiation_iterative(1.0, MAX_INT), 1.0, rel_tol=FLOAT_TOLERANCE)
    assert math.isclose(power_binary_exponentiation_recursive(1.0, MAX_INT), 1.0, rel_tol=FLOAT_TOLERANCE)
    assert math.isclose(power_binary_exponentiation_iterative(-1.0, MAX_INT), -1.0, rel_tol=FLOAT_TOLERANCE)
    assert math.isclose(power_binary_exponentiation_recursive(-1.0, MAX_INT), -1.0, rel_tol=FLOAT_TOLERANCE)

    # Test with minimum possible N (-2^31)
    MIN_INT = -(2**31)
    assert math.isclose(power_binary_exponentiation_iterative(1.0, MIN_INT), 1.0, rel_tol=FLOAT_TOLERANCE)
    assert math.isclose(power_binary_exponentiation_recursive(1.0, MIN_INT), 1.0, rel_tol=FLOAT_TOLERANCE)
    assert math.isclose(power_binary_exponentiation_iterative(-1.0, MIN_INT), 1.0, rel_tol=FLOAT_TOLERANCE) # Even power
    assert math.isclose(power_binary_exponentiation_recursive(-1.0, MIN_INT), 1.0, rel_tol=FLOAT_TOLERANCE) # Even power

    # Test values that become very large or very small (approach float limits)
    # power(1.000000001, 1000000000) should be approx e, but might hit inf/0 for huge numbers
    # We rely on Python's float behavior here.
    assert power_binary_exponentiation_iterative(1.000000001, 10**9) == power_binary_exponentiation_recursive(1.000000001, 10**9)
    # The actual value is approx 2.71828... (e)
    # Python's float precision will handle this for a while.
    # For very large N, it would yield inf.
    assert math.isclose(power_binary_exponentiation_iterative(1.000000001, 10**9), 2.718281828, rel_tol=1e-5)

    # Test values that are large for `x`
    assert math.isclose(power_binary_exponentiation_iterative(99.0, 5), 99.0**5, rel_tol=FLOAT_TOLERANCE)
    assert math.isclose(power_binary_exponentiation_iterative(99.0, -5), 99.0**-5, rel_tol=FLOAT_TOLERANCE)

# Naive method should not be called with extremely large N, as it would be too slow.
# This test is just for documentation and knowing the limits.
@pytest.mark.timeout(5) # Set a timeout for this test
def test_power_naive_large_n_timeout():
    with pytest.raises(TimeoutError): # This would typically be pytest.fail or it might just take a very long time
        # This test is more conceptual; in a real pytest environment,
        # it might just run for a long time or hit a memory limit before a specific TimeoutError.
        # Python's default for loops don't raise TimeoutError directly.
        # We'd typically use a mark to skip or xfail such a test.
        # For a practical test, we'll just check that it would be slow.
        # The timeout decorator should catch it if it takes too long.
        power_naive(2.0, 2**20) # This is 1,048,576 iterations