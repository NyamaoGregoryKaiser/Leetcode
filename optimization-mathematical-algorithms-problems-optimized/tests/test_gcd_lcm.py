import pytest
from problems.problem_03_gcd_lcm import (
    gcd_brute_force,
    gcd_euclidean_recursive,
    gcd_euclidean_iterative,
    lcm_from_gcd
)

# Test cases for GCD
gcd_test_cases = [
    (48, 18, 6),
    (17, 5, 1),
    (0, 5, 5),
    (5, 0, 5),
    (0, 0, 0),
    (100, 1, 1),
    (27, 81, 27),
    (1, 1, 1),
    (12, 12, 12),
    (99, 11, 11),
    (13, 26, 13),
    (20, 30, 10),
    (210, 45, 15),
    (1024, 512, 512),
    (1023, 27, 3), # 1023 = 3 * 11 * 31, 27 = 3^3
    (987654321, 123456789, 9) # 987654321 = 9 * 109739369, 123456789 = 9 * 13717421
]

@pytest.mark.parametrize("a, b, expected", gcd_test_cases)
def test_gcd_brute_force(a, b, expected):
    assert gcd_brute_force(a, b) == expected

@pytest.mark.parametrize("a, b, expected", gcd_test_cases)
def test_gcd_euclidean_recursive(a, b, expected):
    assert gcd_euclidean_recursive(a, b) == expected

@pytest.mark.parametrize("a, b, expected", gcd_test_cases)
def test_gcd_euclidean_iterative(a, b, expected):
    assert gcd_euclidean_iterative(a, b) == expected

# Test GCD with negative inputs (should raise ValueError)
def test_gcd_negative_inputs():
    with pytest.raises(ValueError, match="Inputs must be non-negative integers."):
        gcd_brute_force(-5, 10)
    with pytest.raises(ValueError, match="Inputs must be non-negative integers."):
        gcd_euclidean_recursive(5, -10)
    with pytest.raises(ValueError, match="Inputs must be non-negative integers."):
        gcd_euclidean_iterative(-5, -10)

# Test cases for LCM
# LCM(a, b) = |a * b| / GCD(a, b)
lcm_test_cases = [
    (4, 6, 12),
    (2, 7, 14),
    (0, 5, 0),
    (5, 0, 0),
    (0, 0, 0),
    (1, 100, 100),
    (12, 18, 36),
    (1, 1, 1),
    (13, 26, 26),
    (20, 30, 60),
    (210, 45, 630),
    (1024, 512, 1024),
    (1023, 27, 9207) # LCM(1023, 27) = (1023 * 27) / GCD(1023, 27) = (1023 * 27) / 3 = 1023 * 9 = 9207
]

@pytest.mark.parametrize("a, b, expected", lcm_test_cases)
def test_lcm_from_gcd(a, b, expected):
    # Test with default iterative Euclidean GCD
    assert lcm_from_gcd(a, b) == expected
    # Test with recursive Euclidean GCD
    assert lcm_from_gcd(a, b, gcd_func=gcd_euclidean_recursive) == expected
    # Test with brute-force GCD (should still work, just slower)
    assert lcm_from_gcd(a, b, gcd_func=gcd_brute_force) == expected

# Test LCM with negative inputs (should raise ValueError)
def test_lcm_negative_inputs():
    with pytest.raises(ValueError, match="Inputs must be non-negative integers."):
        lcm_from_gcd(-5, 10)
    with pytest.raises(ValueError, match="Inputs must be non-negative integers."):
        lcm_from_gcd(5, -10)
    with pytest.raises(ValueError, match="Inputs must be non-negative integers."):
        lcm_from_gcd(-5, -10)

# Test edge cases where a*b might overflow in other languages, but Python handles large ints.
# Test with very large numbers (Python ints handle arbitrary precision)
def test_gcd_lcm_very_large_numbers():
    a = 10**18 + 7  # A large prime
    b = 2 * (10**18 + 7) # Multiples of a large prime
    assert gcd_euclidean_iterative(a, b) == a
    assert lcm_from_gcd(a, b) == b

    c = 12345678901234567890
    d = 98765432109876543210
    # GCD(c, d) is 10
    assert gcd_euclidean_iterative(c, d) == 10
    # LCM(c, d) will be (c * d) / 10
    assert lcm_from_gcd(c, d) == (c * d) // 10