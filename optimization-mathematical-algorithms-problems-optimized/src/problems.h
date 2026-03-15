```cpp
#ifndef PROBLEMS_H
#define PROBLEMS_H

#include <vector>
#include <utility> // For std::pair
#include <algorithm> // For std::min, std::max

// --- Problem 1: Greatest Common Divisor (GCD) & Least Common Multiple (LCM) ---

namespace GCD_LCM {

    // Naive approach for GCD (for comparison)
    // Time Complexity: O(min(a,b))
    // Space Complexity: O(1)
    long long gcd_naive(long long a, long long b);

    // Euclidean Algorithm (Recursive) for GCD
    // Time Complexity: O(log(min(a,b)))
    // Space Complexity: O(log(min(a,b))) due to recursion stack
    long long gcd_euclidean_recursive(long long a, long long b);

    // Euclidean Algorithm (Iterative) for GCD
    // Time Complexity: O(log(min(a,b)))
    // Space Complexity: O(1)
    long long gcd_euclidean_iterative(long long a, long long b);

    // Least Common Multiple (LCM) using GCD
    // Time Complexity: O(log(min(a,b))) (dominated by GCD)
    // Space Complexity: O(1)
    long long lcm(long long a, long long b);

} // namespace GCD_LCM

// --- Problem 2: Prime Number Generation (Sieve of Eratosthenes) ---

namespace PrimeNumbers {

    // Naive check if a number is prime (trial division)
    // Time Complexity: O(sqrt(n))
    // Space Complexity: O(1)
    bool is_prime_naive(int n);

    // Sieve of Eratosthenes to generate primes up to 'limit'
    // Returns a boolean vector where `primes[i]` is true if i is prime.
    // Time Complexity: O(N log log N)
    // Space Complexity: O(N)
    std::vector<bool> sieve_of_eratosthenes(int limit);

    // Sieve of Eratosthenes to generate primes up to 'limit'
    // Returns a vector of prime numbers themselves.
    // Time Complexity: O(N log log N)
    // Space Complexity: O(N) for boolean array + O(pi(N)) for primes list
    std::vector<int> get_primes_list_sieve(int limit);

} // namespace PrimeNumbers

// --- Problem 3: Power (x^n) Calculation ---

namespace PowerCalculation {

    // Naive iterative approach for x^n
    // Time Complexity: O(n)
    // Space Complexity: O(1)
    double power_naive(double base, int exponent);

    // Binary Exponentiation (Exponentiation by Squaring) - Recursive
    // Handles positive, negative, and zero exponents.
    // Time Complexity: O(log |n|)
    // Space Complexity: O(log |n|) due to recursion stack
    double power_binary_exponentiation_recursive(double base, int exponent);

    // Binary Exponentiation (Exponentiation by Squaring) - Iterative
    // Handles positive, negative, and zero exponents.
    // Time Complexity: O(log |n|)
    // Space Complexity: O(1)
    double power_binary_exponentiation_iterative(double base, int exponent);

} // namespace PowerCalculation

// --- Problem 4: Nth Fibonacci Number ---

namespace Fibonacci {

    // Naive recursive approach for Nth Fibonacci number
    // Time Complexity: O(2^n) - Exponential
    // Space Complexity: O(n) due to recursion stack
    long long fibonacci_recursive_naive(int n);

    // Recursive approach with Memoization (Dynamic Programming)
    // Time Complexity: O(n)
    // Space Complexity: O(n) for memoization table + O(n) for recursion stack
    long long fibonacci_recursive_memoized(int n);
    // Helper for fibonacci_recursive_memoized, hides memo_table
    long long fibonacci_recursive_memoized_helper(int n, std::vector<long long>& memo_table);

    // Iterative approach (Bottom-Up Dynamic Programming)
    // Time Complexity: O(n)
    // Space Complexity: O(1)
    long long fibonacci_iterative(int n);

} // namespace Fibonacci

#endif // PROBLEMS_H
```