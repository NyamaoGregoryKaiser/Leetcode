import pytest
from src.problems.gcd_lcm import GCDLCM
from src.problems.prime_numbers import PrimeNumbers
from src.problems.modular_exponentiation import ModularExponentiation
from src.problems.fibonacci import Fibonacci

# --- GCD / LCM Tests ---
@pytest.mark.parametrize("a, b, expected_gcd", [
    (48, 18, 6),
    (18, 48, 6),
    (101, 103, 1), # Coprime
    (7, 7, 7),
    (0, 5, 5),
    (5, 0, 5),
    (0, 0, 0),
    (1, 1, 1),
    (12, 6, 6),
    (100, 25, 25),
    (99, 11, 11),
    (2*3*5*7, 2*3*5*11, 2*3*5) # 210, 330, GCD=30
])
def test_gcd(a, b, expected_gcd):
    assert GCDLCM.gcd_euclidean_recursive(a, b) == expected_gcd
    assert GCDLCM.gcd_euclidean_iterative(a, b) == expected_gcd

@pytest.mark.parametrize("a, b, expected_lcm", [
    (48, 18, 144),
    (18, 48, 144),
    (101, 103, 10403), # 101 * 103
    (7, 7, 7),
    (0, 5, 0),
    (5, 0, 0),
    (0, 0, 0),
    (1, 1, 1),
    (12, 6, 12),
    (100, 25, 100),
    (99, 11, 99),
    (210, 330, 2310) # LCM(2*3*5*7, 2*3*5*11) = 2*3*5*7*11 = 2310
])
def test_lcm(a, b, expected_lcm):
    assert GCDLCM.lcm_from_gcd(a, b) == expected_lcm

def test_gcd_lcm_edge_cases_and_errors():
    with pytest.raises(ValueError, match="Inputs must be non-negative integers."):
        GCDLCM.gcd_euclidean_recursive(-4, 2)
    with pytest.raises(ValueError, match="Inputs must be non-negative integers."):
        GCDLCM.gcd_euclidean_iterative(4, -2)
    with pytest.raises(ValueError, match="Inputs must be non-negative integers."):
        GCDLCM.lcm_from_gcd(-4, 2)
    with pytest.raises(TypeError, match="Inputs must be integers."):
        GCDLCM.gcd_euclidean_recursive(4.0, 2)
    with pytest.raises(TypeError, match="Inputs must be integers."):
        GCDLCM.lcm_from_gcd(4, "2")

# --- Prime Numbers Tests ---
@pytest.mark.parametrize("n, expected_is_prime", [
    (2, True),
    (3, True),
    (5, True),
    (7, True),
    (11, True),
    (13, True),
    (17, True),
    (19, True),
    (23, True),
    (1, False),
    (0, False),
    (4, False),
    (6, False),
    (9, False),
    (25, False),
    (131, True), # A prime number
    (1000000007, True), # Large prime
    (1000000001, False), # 1000000001 = 17 * 58823529
    (999999937, True) # Another large prime
])
def test_is_prime_trial_division(n, expected_is_prime):
    assert PrimeNumbers.is_prime_trial_division(n) == expected_is_prime

@pytest.mark.parametrize("limit, expected_primes", [
    (0, []),
    (1, []),
    (2, [2]),
    (3, [2, 3]),
    (10, [2, 3, 5, 7]),
    (20, [2, 3, 5, 7, 11, 13, 17, 19]),
    (50, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47])
])
def test_sieve_of_eratosthenes(limit, expected_primes):
    assert PrimeNumbers.sieve_of_eratosthenes(limit) == expected_primes
    assert PrimeNumbers.sieve_of_eratosthenes_optimized_space(limit) == expected_primes

def test_prime_numbers_edge_cases_and_errors():
    with pytest.raises(TypeError, match="Input must be an integer."):
        PrimeNumbers.is_prime_trial_division(1.5)
    with pytest.raises(ValueError, match="Input limit must be a non-negative integer."):
        PrimeNumbers.sieve_of_eratosthenes(-1)
    with pytest.raises(TypeError, match="Input limit must be an integer."):
        PrimeNumbers.sieve_of_eratosthenes_optimized_space(10.0)

# --- Modular Exponentiation Tests ---
@pytest.mark.parametrize("base, exp, mod, expected_result", [
    (2, 10, 1000, 24), # 2^10 = 1024, 1024 % 1000 = 24
    (3, 5, 7, 5), # 3^5 = 243, 243 % 7 = 5
    (7, 1000, 13, 9), # (7^12)^83 * 7^4 % 13 = 1^83 * (7^2)^2 % 13 = (49%13)^2 % 13 = 10^2 % 13 = 100 % 13 = 9
    (0, 5, 10, 0),
    (5, 0, 10, 1),
    (1, 100, 10, 1),
    (10, 2, 3, 1), # 10^2 = 100, 100 % 3 = 1
    (2, 1, 10, 2),
    (2, 20, 10**9 + 7, pow(2, 20, 10**9 + 7)) # Large prime mod
])
def test_modular_exponentiation(base, exp, mod, expected_result):
    # Naive is only tested for smaller exponents due to performance
    if exp < 15:
        assert ModularExponentiation.power_naive(base, exp, mod) == expected_result
    
    assert ModularExponentiation.power_binary_iterative(base, exp, mod) == expected_result
    assert ModularExponentiation.power_binary_recursive(base, exp, mod) == expected_result
    assert ModularExponentiation.power_python_builtin(base, exp, mod) == expected_result

def test_modular_exponentiation_edge_cases_and_errors():
    with pytest.raises(ValueError, match="Exponent must be non-negative."):
        ModularExponentiation.power_binary_iterative(2, -1, 10)
    with pytest.raises(ValueError, match="Modulus must be positive."):
        ModularExponentiation.power_binary_iterative(2, 5, 0)
    with pytest.raises(ValueError, match="Modulus must be positive."):
        ModularExponentiation.power_binary_recursive(2, 5, 0)
    with pytest.raises(TypeError, match="Inputs must be integers."):
        ModularExponentiation.power_binary_iterative(2.0, 5, 10)
    with pytest.raises(TypeError, match="Inputs must be integers."):
        ModularExponentiation.power_python_builtin(2, 5.0, 10)

# --- Fibonacci Tests ---
@pytest.mark.parametrize("n, expected_fib", [
    (0, 0),
    (1, 1),
    (2, 1),
    (3, 2),
    (4, 3),
    (5, 5),
    (6, 8),
    (7, 13),
    (10, 55),
    (15, 610),
    (20, 6765)
])
def test_fibonacci_small_n(n, expected_fib):
    assert Fibonacci.fib_recursive_naive(n) == expected_fib
    assert Fibonacci.fib_recursive_memoized(n) == expected_fib
    assert Fibonacci.fib_iterative_dp(n) == expected_fib
    assert Fibonacci.fib_iterative_space_optimized(n) == expected_fib
    assert Fibonacci.fib_matrix_exponentiation(n) == expected_fib

@pytest.mark.parametrize("n, expected_fib", [
    (30, 832040),
    (35, 9227465),
    (40, 102334155),
])
def test_fibonacci_larger_n(n, expected_fib):
    # Skip naive recursive for large N due to exponential time complexity
    # assert Fibonacci.fib_recursive_naive(n) == expected_fib
    assert Fibonacci.fib_recursive_memoized(n) == expected_fib
    assert Fibonacci.fib_iterative_dp(n) == expected_fib
    assert Fibonacci.fib_iterative_space_optimized(n) == expected_fib
    assert Fibonacci.fib_matrix_exponentiation(n) == expected_fib

def test_fibonacci_edge_cases_and_errors():
    with pytest.raises(ValueError, match="Input must be a non-negative integer."):
        Fibonacci.fib_iterative_dp(-1)
    with pytest.raises(TypeError, match="Input must be an integer."):
        Fibonacci.fib_recursive_naive(5.0)
    with pytest.raises(TypeError, match="Input must be an integer."):
        Fibonacci.fib_matrix_exponentiation("10")
---