```cpp
#include <iostream>
#include <vector>
#include <cmath> // For std::abs with double, std::numeric_limits
#include <limits> // For std::numeric_limits

#include "problems.h"
#include "utilities.h" // For TestFramework

// Using a small epsilon for floating point comparisons
const double EPSILON = 1e-9;

void test_gcd_lcm() {
    std::cout << "\n--- Testing GCD & LCM ---" << std::endl;

    // GCD Naive
    TestFramework::TestCase::assert_equals(GCD_LCM::gcd_naive(48, 18), 6LL, "GCD Naive (48, 18)");
    TestFramework::TestCase::assert_equals(GCD_LCM::gcd_naive(17, 5), 1LL, "GCD Naive (17, 5) - coprime");
    TestFramework::TestCase::assert_equals(GCD_LCM::gcd_naive(100, 0), 100LL, "GCD Naive (100, 0)");
    TestFramework::TestCase::assert_equals(GCD_LCM::gcd_naive(0, 100), 100LL, "GCD Naive (0, 100)");
    TestFramework::TestCase::assert_equals(GCD_LCM::gcd_naive(0, 0), 0LL, "GCD Naive (0, 0)");
    TestFramework::TestCase::assert_equals(GCD_LCM::gcd_naive(-48, 18), 6LL, "GCD Naive (-48, 18)");

    // GCD Euclidean Recursive
    TestFramework::TestCase::assert_equals(GCD_LCM::gcd_euclidean_recursive(48, 18), 6LL, "GCD Euclidean Rec (48, 18)");
    TestFramework::TestCase::assert_equals(GCD_LCM::gcd_euclidean_recursive(17, 5), 1LL, "GCD Euclidean Rec (17, 5)");
    TestFramework::TestCase::assert_equals(GCD_LCM::gcd_euclidean_recursive(100, 0), 100LL, "GCD Euclidean Rec (100, 0)");
    TestFramework::TestCase::assert_equals(GCD_LCM::gcd_euclidean_recursive(0, 100), 100LL, "GCD Euclidean Rec (0, 100)");
    TestFramework::TestCase::assert_equals(GCD_LCM::gcd_euclidean_recursive(0, 0), 0LL, "GCD Euclidean Rec (0, 0)");
    TestFramework::TestCase::assert_equals(GCD_LCM::gcd_euclidean_recursive(-48, 18), 6LL, "GCD Euclidean Rec (-48, 18)");

    // GCD Euclidean Iterative
    TestFramework::TestCase::assert_equals(GCD_LCM::gcd_euclidean_iterative(48, 18), 6LL, "GCD Euclidean Iter (48, 18)");
    TestFramework::TestCase::assert_equals(GCD_LCM::gcd_euclidean_iterative(17, 5), 1LL, "GCD Euclidean Iter (17, 5)");
    TestFramework::TestCase::assert_equals(GCD_LCM::gcd_euclidean_iterative(100, 0), 100LL, "GCD Euclidean Iter (100, 0)");
    TestFramework::TestCase::assert_equals(GCD_LCM::gcd_euclidean_iterative(0, 100), 100LL, "GCD Euclidean Iter (0, 100)");
    TestFramework::TestCase::assert_equals(GCD_LCM::gcd_euclidean_iterative(0, 0), 0LL, "GCD Euclidean Iter (0, 0)");
    TestFramework::TestCase::assert_equals(GCD_LCM::gcd_euclidean_iterative(-48, -18), 6LL, "GCD Euclidean Iter (-48, -18)");
    TestFramework::TestCase::assert_equals(GCD_LCM::gcd_euclidean_iterative(std::numeric_limits<long long>::max(), 1), 1LL, "GCD Euclidean Iter (LL_MAX, 1)");

    // LCM
    TestFramework::TestCase::assert_equals(GCD_LCM::lcm(48, 18), 144LL, "LCM (48, 18)"); // (48*18)/6 = 144
    TestFramework::TestCase::assert_equals(GCD_LCM::lcm(17, 5), 85LL, "LCM (17, 5)"); // 17*5 = 85
    TestFramework::TestCase::assert_equals(GCD_LCM::lcm(100, 0), 0LL, "LCM (100, 0)");
    TestFramework::TestCase::assert_equals(GCD_LCM::lcm(0, 100), 0LL, "LCM (0, 100)");
    TestFramework::TestCase::assert_equals(GCD_LCM::lcm(7, 7), 7LL, "LCM (7, 7)");
    TestFramework::TestCase::assert_equals(GCD_LCM::lcm(-6, 8), 24LL, "LCM (-6, 8)"); // (abs(-6)*abs(8))/gcd(6,8) = (48)/2 = 24
}

void test_prime_numbers() {
    std::cout << "\n--- Testing Prime Number Generation ---" << std::endl;

    // is_prime_naive
    TestFramework::TestCase::assert_true(PrimeNumbers::is_prime_naive(2), "is_prime_naive(2)");
    TestFramework::TestCase::assert_true(PrimeNumbers::is_prime_naive(3), "is_prime_naive(3)");
    TestFramework::TestCase::assert_false(PrimeNumbers::is_prime_naive(4), "is_prime_naive(4)");
    TestFramework::TestCase::assert_true(PrimeNumbers::is_prime_naive(7), "is_prime_naive(7)");
    TestFramework::TestCase::assert_false(PrimeNumbers::is_prime_naive(9), "is_prime_naive(9)");
    TestFramework::TestCase::assert_true(PrimeNumbers::is_prime_naive(13), "is_prime_naive(13)");
    TestFramework::TestCase::assert_false(PrimeNumbers::is_prime_naive(1), "is_prime_naive(1)");
    TestFramework::TestCase::assert_false(PrimeNumbers::is_prime_naive(0), "is_prime_naive(0)");
    TestFramework::TestCase::assert_true(PrimeNumbers::is_prime_naive(97), "is_prime_naive(97)");
    TestFramework::TestCase::assert_false(PrimeNumbers::is_prime_naive(91), "is_prime_naive(91)"); // 7*13

    // Sieve of Eratosthenes (boolean vector)
    std::vector<bool> expected_sieve_10 = {false, false, true, true, false, true, false, true, false, false, false}; // Primes: 2,3,5,7
    TestFramework::TestCase::assert_vector_equals(PrimeNumbers::sieve_of_eratosthenes(10), expected_sieve_10, "Sieve of Eratosthenes (limit 10)");
    std::vector<bool> expected_sieve_0 = {false};
    TestFramework::TestCase::assert_vector_equals(PrimeNumbers::sieve_of_eratosthenes(0), expected_sieve_0, "Sieve of Eratosthenes (limit 0)");
    std::vector<bool> expected_sieve_1 = {false, false};
    TestFramework::TestCase::assert_vector_equals(PrimeNumbers::sieve_of_eratosthenes(1), expected_sieve_1, "Sieve of Eratosthenes (limit 1)");

    // Get Primes List Sieve
    std::vector<int> expected_primes_10 = {2, 3, 5, 7};
    TestFramework::TestCase::assert_vector_equals(PrimeNumbers::get_primes_list_sieve(10), expected_primes_10, "Get Primes List Sieve (limit 10)");
    std::vector<int> expected_primes_2 = {2};
    TestFramework::TestCase::assert_vector_equals(PrimeNumbers::get_primes_list_sieve(2), expected_primes_2, "Get Primes List Sieve (limit 2)");
    std::vector<int> expected_primes_1 = {};
    TestFramework::TestCase::assert_vector_equals(PrimeNumbers::get_primes_list_sieve(1), expected_primes_1, "Get Primes List Sieve (limit 1)");
    std::vector<int> expected_primes_50 = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47};
    TestFramework::TestCase::assert_vector_equals(PrimeNumbers::get_primes_list_sieve(50), expected_primes_50, "Get Primes List Sieve (limit 50)");
}

void test_power_calculation() {
    std::cout << "\n--- Testing Power Calculation ---" << std::endl;

    // Helper for fuzzy comparison of doubles
    auto fuzzy_equals = [](double a, double b) {
        return std::abs(a - b) < EPSILON;
    };

    // power_naive
    TestFramework::TestCase::assert_true(fuzzy_equals(PowerCalculation::power_naive(2.0, 3), 8.0), "power_naive(2, 3)");
    TestFramework::TestCase::assert_true(fuzzy_equals(PowerCalculation::power_naive(3.0, 0), 1.0), "power_naive(3, 0)");
    TestFramework::TestCase::assert_true(fuzzy_equals(PowerCalculation::power_naive(2.0, -2), 0.25), "power_naive(2, -2)");
    TestFramework::TestCase::assert_true(fuzzy_equals(PowerCalculation::power_naive(10.0, 1), 10.0), "power_naive(10, 1)");
    TestFramework::TestCase::assert_true(fuzzy_equals(PowerCalculation::power_naive(0.0, 5), 0.0), "power_naive(0, 5)");
    TestFramework::TestCase::assert_true(fuzzy_equals(PowerCalculation::power_naive(0.0, 0), 1.0), "power_naive(0, 0) - convention");
    // Test for 0.0 to negative exponent (undefined, but we return 0.0)
    TestFramework::TestCase::assert_true(fuzzy_equals(PowerCalculation::power_naive(0.0, -5), 0.0), "power_naive(0, -5) - practical");

    // power_binary_exponentiation_recursive
    TestFramework::TestCase::assert_true(fuzzy_equals(PowerCalculation::power_binary_exponentiation_recursive(2.0, 3), 8.0), "power_binary_exponentiation_recursive(2, 3)");
    TestFramework::TestCase::assert_true(fuzzy_equals(PowerCalculation::power_binary_exponentiation_recursive(3.0, 0), 1.0), "power_binary_exponentiation_recursive(3, 0)");
    TestFramework::TestCase::assert_true(fuzzy_equals(PowerCalculation::power_binary_exponentiation_recursive(2.0, -2), 0.25), "power_binary_exponentiation_recursive(2, -2)");
    TestFramework::TestCase::assert_true(fuzzy_equals(PowerCalculation::power_binary_exponentiation_recursive(10.0, 1), 10.0), "power_binary_exponentiation_recursive(10, 1)");
    TestFramework::TestCase::assert_true(fuzzy_equals(PowerCalculation::power_binary_exponentiation_recursive(0.0, 5), 0.0), "power_binary_exponentiation_recursive(0, 5)");
    TestFramework::TestCase::assert_true(fuzzy_equals(PowerCalculation::power_binary_exponentiation_recursive(0.0, 0), 1.0), "power_binary_exponentiation_recursive(0, 0)");
    TestFramework::TestCase::assert_true(fuzzy_equals(PowerCalculation::power_binary_exponentiation_recursive(0.0, -5), 0.0), "power_binary_exponentiation_recursive(0, -5)");
    TestFramework::TestCase::assert_true(fuzzy_equals(PowerCalculation::power_binary_exponentiation_recursive(1.0, 100), 1.0), "power_binary_exponentiation_recursive(1, 100)");

    // power_binary_exponentiation_iterative
    TestFramework::TestCase::assert_true(fuzzy_equals(PowerCalculation::power_binary_exponentiation_iterative(2.0, 3), 8.0), "power_binary_exponentiation_iterative(2, 3)");
    TestFramework::TestCase::assert_true(fuzzy_equals(PowerCalculation::power_binary_exponentiation_iterative(3.0, 0), 1.0), "power_binary_exponentiation_iterative(3, 0)");
    TestFramework::TestCase::assert_true(fuzzy_equals(PowerCalculation::power_binary_exponentiation_iterative(2.0, -2), 0.25), "power_binary_exponentiation_iterative(2, -2)");
    TestFramework::TestCase::assert_true(fuzzy_equals(PowerCalculation::power_binary_exponentiation_iterative(10.0, 1), 10.0), "power_binary_exponentiation_iterative(10, 1)");
    TestFramework::TestCase::assert_true(fuzzy_equals(PowerCalculation::power_binary_exponentiation_iterative(0.0, 5), 0.0), "power_binary_exponentiation_iterative(0, 5)");
    TestFramework::TestCase::assert_true(fuzzy_equals(PowerCalculation::power_binary_exponentiation_iterative(0.0, 0), 1.0), "power_binary_exponentiation_iterative(0, 0)");
    TestFramework::TestCase::assert_true(fuzzy_equals(PowerCalculation::power_binary_exponentiation_iterative(0.0, -5), 0.0), "power_binary_exponentiation_iterative(0, -5)");
    TestFramework::TestCase::assert_true(fuzzy_equals(PowerCalculation::power_binary_exponentiation_iterative(1.0, -100), 1.0), "power_binary_exponentiation_iterative(1, -100)");
}

void test_fibonacci() {
    std::cout << "\n--- Testing Fibonacci Numbers ---" << std::endl;

    // Expected Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...
    std::vector<long long> expected_fib = {0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181};

    // fibonacci_recursive_naive
    for (int i = 0; i < expected_fib.size(); ++i) {
        TestFramework::TestCase::assert_equals(Fibonacci::fibonacci_recursive_naive(i), expected_fib[i], "fibonacci_recursive_naive(" + std::to_string(i) + ")");
    }
    TestFramework::TestCase::assert_equals(Fibonacci::fibonacci_recursive_naive(-1), -1LL, "fibonacci_recursive_naive(-1)");

    // fibonacci_recursive_memoized
    for (int i = 0; i < expected_fib.size(); ++i) {
        TestFramework::TestCase::assert_equals(Fibonacci::fibonacci_recursive_memoized(i), expected_fib[i], "fibonacci_recursive_memoized(" + std::to_string(i) + ")");
    }
    TestFramework::TestCase::assert_equals(Fibonacci::fibonacci_recursive_memoized(-1), -1LL, "fibonacci_recursive_memoized(-1)");
    TestFramework::TestCase::assert_equals(Fibonacci::fibonacci_recursive_memoized(40), 102334155LL, "fibonacci_recursive_memoized(40)");

    // fibonacci_iterative
    for (int i = 0; i < expected_fib.size(); ++i) {
        TestFramework::TestCase::assert_equals(Fibonacci::fibonacci_iterative(i), expected_fib[i], "fibonacci_iterative(" + std::to_string(i) + ")");
    }
    TestFramework::TestCase::assert_equals(Fibonacci::fibonacci_iterative(-1), -1LL, "fibonacci_iterative(-1)");
    TestFramework::TestCase::assert_equals(Fibonacci::fibonacci_iterative(40), 102334155LL, "fibonacci_iterative(40)");
    TestFramework::TestCase::assert_equals(Fibonacci::fibonacci_iterative(90), 2880067194370816120LL, "fibonacci_iterative(90)"); // Large number to check long long
}

int main() {
    std::cout << "Running all tests..." << std::endl;

    test_gcd_lcm();
    test_prime_numbers();
    test_power_calculation();
    test_fibonacci();

    TestFramework::TestCase::summarize_results();

    return TestFramework::TestCase::failed_tests > 0 ? 1 : 0;
}
```