```cpp
#include "problems.h"
#include "utilities.h" // For MathUtils, potentially others

#include <numeric> // For std::gcd (C++17) - though we implement our own
#include <cmath>   // For std::abs, std::pow

// --- Problem 1: Greatest Common Divisor (GCD) & Least Common Multiple (LCM) ---

namespace GCD_LCM {

    /**
     * @brief Calculates the Greatest Common Divisor (GCD) of two numbers using a naive approach.
     *        It iterates from min(a,b) down to 1, checking for divisibility.
     * @param a The first non-negative integer.
     * @param b The second non-negative integer.
     * @return The GCD of a and b. Returns 0 if both a and b are 0 (undefined or convention).
     *         Handles negative inputs by taking their absolute values.
     * @complexity
     *   Time: O(min(a,b)) in the worst case (e.g., if a and b are coprime).
     *   Space: O(1)
     */
    long long gcd_naive(long long a, long long b) {
        // Handle negative inputs: GCD is typically defined for non-negative integers.
        // We take the absolute values as GCD(a, b) = GCD(|a|, |b|).
        a = MathUtils::absolute(a);
        b = MathUtils::absolute(b);

        if (a == 0 && b == 0) return 0; // Convention: GCD(0,0) is often undefined or 0.
        if (a == 0) return b;
        if (b == 0) return a;

        long long result = 1;
        for (long long i = std::min(a, b); i >= 1; --i) {
            if (a % i == 0 && b % i == 0) {
                result = i;
                break;
            }
        }
        return result;
    }

    /**
     * @brief Calculates the Greatest Common Divisor (GCD) of two numbers using the Euclidean Algorithm (recursive).
     *        Based on the property: GCD(a, b) = GCD(b, a % b). Base case: GCD(a, 0) = a.
     * @param a The first non-negative integer.
     * @param b The second non-negative integer.
     * @return The GCD of a and b.
     *         Handles negative inputs by taking their absolute values.
     * @complexity
     *   Time: O(log(min(a,b))) - The number of recursive calls is logarithmic with respect to the smaller number.
     *   Space: O(log(min(a,b))) - Due to the recursion stack depth.
     */
    long long gcd_euclidean_recursive(long long a, long long b) {
        // Handle negative inputs: GCD is typically defined for non-negative integers.
        // We take the absolute values as GCD(a, b) = GCD(|a|, |b|).
        a = MathUtils::absolute(a);
        b = MathUtils::absolute(b);

        // Base case: if b is 0, then a is the GCD
        if (b == 0) {
            return a;
        }
        // Recursive step: GCD(a, b) = GCD(b, a % b)
        return gcd_euclidean_recursive(b, a % b);
    }

    /**
     * @brief Calculates the Greatest Common Divisor (GCD) of two numbers using the Euclidean Algorithm (iterative).
     *        Uses the property: GCD(a, b) = GCD(b, a % b).
     * @param a The first non-negative integer.
     * @param b The second non-negative integer.
     * @return The GCD of a and b.
     *         Handles negative inputs by taking their absolute values.
     * @complexity
     *   Time: O(log(min(a,b))) - The number of iterations is logarithmic with respect to the smaller number.
     *   Space: O(1) - Constant extra space.
     */
    long long gcd_euclidean_iterative(long long a, long long b) {
        // Handle negative inputs: GCD is typically defined for non-negative integers.
        // We take the absolute values as GCD(a, b) = GCD(|a|, |b|).
        a = MathUtils::absolute(a);
        b = MathUtils::absolute(b);

        // Iterate until b becomes 0
        while (b != 0) {
            long long temp = b;
            b = a % b;
            a = temp;
        }
        return a; // When b is 0, a holds the GCD
    }

    /**
     * @brief Calculates the Least Common Multiple (LCM) of two numbers.
     *        Uses the property: LCM(a, b) = (|a * b|) / GCD(a, b).
     * @param a The first integer.
     * @param b The second integer.
     * @return The LCM of a and b. Returns 0 if either a or b is 0.
     *         Handles negative inputs by taking their absolute values.
     * @complexity
     *   Time: O(log(min(a,b))) - Dominated by the GCD calculation.
     *   Space: O(1) - Constant extra space (or O(log) if recursive GCD is used).
     */
    long long lcm(long long a, long long b) {
        // LCM is typically defined for positive integers. Taking absolute values for consistency.
        a = MathUtils::absolute(a);
        b = MathUtils::absolute(b);

        if (a == 0 || b == 0) {
            return 0; // LCM of any number with 0 is 0.
        }

        // Using the formula: LCM(a, b) = (a * b) / GCD(a, b)
        // To prevent overflow, we can compute (a / GCD(a, b)) * b.
        return (a / gcd_euclidean_iterative(a, b)) * b;
    }

} // namespace GCD_LCM


// --- Problem 2: Prime Number Generation (Sieve of Eratosthenes) ---

namespace PrimeNumbers {

    /**
     * @brief Checks if a number is prime using a naive trial division method.
     *        It iterates from 2 up to the square root of n.
     * @param n The integer to check for primality.
     * @return True if n is prime, false otherwise.
     * @complexity
     *   Time: O(sqrt(n))
     *   Space: O(1)
     */
    bool is_prime_naive(int n) {
        if (n <= 1) return false; // Numbers less than or equal to 1 are not prime
        if (n <= 3) return true;  // 2 and 3 are prime
        if (n % 2 == 0 || n % 3 == 0) return false; // Multiples of 2 or 3 are not prime

        // Check for factors from 5 onwards
        // All primes greater than 3 can be expressed in the form 6k ± 1
        for (int i = 5; i * i <= n; i = i + 6) {
            if (n % i == 0 || n % (i + 2) == 0) {
                return false;
            }
        }
        return true;
    }

    /**
     * @brief Generates all prime numbers up to a given limit using the Sieve of Eratosthenes.
     *        Marks multiples of each prime as not prime.
     * @param limit The upper bound (inclusive) for finding primes.
     * @return A boolean vector where `result[i]` is true if `i` is prime, false otherwise.
     * @complexity
     *   Time: O(N log log N) - Very efficient for finding all primes up to N.
     *   Space: O(N) - To store the boolean array.
     */
    std::vector<bool> sieve_of_eratosthenes(int limit) {
        if (limit < 0) return {}; // Handle invalid limit
        std::vector<bool> is_prime(limit + 1, true); // Initialize all numbers as potentially prime

        if (limit >= 0) is_prime[0] = false; // 0 is not prime
        if (limit >= 1) is_prime[1] = false; // 1 is not prime

        // Start from 2. If i is prime, mark all its multiples as not prime.
        // We only need to check up to sqrt(limit) because any composite number n
        // must have at least one prime factor less than or equal to sqrt(n).
        for (int p = 2; p * p <= limit; ++p) {
            // If is_prime[p] is still true, then it is a prime
            if (is_prime[p]) {
                // Mark all multiples of p (starting from p*p) as not prime.
                // Multiples less than p*p would have already been marked by smaller primes.
                for (int i = p * p; i <= limit; i += p) {
                    is_prime[i] = false;
                }
            }
        }
        return is_prime;
    }

    /**
     * @brief Generates a list of prime numbers up to a given limit using the Sieve of Eratosthenes.
     *        This function is a wrapper around `sieve_of_eratosthenes` to return a list of primes.
     * @param limit The upper bound (inclusive) for finding primes.
     * @return A vector containing all prime numbers up to 'limit'.
     * @complexity
     *   Time: O(N log log N) - Dominated by the sieve generation.
     *   Space: O(N) - For the boolean sieve array, plus O(pi(N)) for the result list (where pi(N) is the prime-counting function, approximately N/log N).
     */
    std::vector<int> get_primes_list_sieve(int limit) {
        std::vector<bool> is_prime = sieve_of_eratosthenes(limit);
        std::vector<int> primes_list;
        for (int p = 2; p <= limit; ++p) {
            if (is_prime[p]) {
                primes_list.push_back(p);
            }
        }
        return primes_list;
    }

} // namespace PrimeNumbers

// --- Problem 3: Power (x^n) Calculation ---

namespace PowerCalculation {

    /**
     * @brief Calculates x raised to the power of n using a naive iterative approach.
     *        Multiplies base 'n' times. Handles negative 'n' by taking reciprocal.
     * @param base The base number.
     * @param exponent The integer exponent.
     * @return The result of base^exponent.
     * @complexity
     *   Time: O(|n|) - Linear with respect to the absolute value of the exponent.
     *   Space: O(1)
     */
    double power_naive(double base, int exponent) {
        if (base == 0.0) {
            if (exponent == 0) return 1.0; // Convention: 0^0 is 1
            return 0.0; // 0^positive = 0, 0^negative is undefined (return 0.0 for practical purposes or error)
        }
        if (exponent == 0) return 1.0;

        double result = 1.0;
        long long abs_exponent = MathUtils::absolute(static_cast<long long>(exponent)); // Use long long for absolute value to handle INT_MIN

        for (long long i = 0; i < abs_exponent; ++i) {
            result *= base;
        }

        return (exponent < 0) ? (1.0 / result) : result;
    }

    /**
     * @brief Calculates x raised to the power of n using Binary Exponentiation (recursive).
     *        Also known as Exponentiation by Squaring. Efficiently computes x^n by halving the exponent.
     * @param base The base number.
     * @param exponent The integer exponent.
     * @return The result of base^exponent.
     * @complexity
     *   Time: O(log |n|) - Each recursive call roughly halves the exponent.
     *   Space: O(log |n|) - Due to the recursion stack depth.
     */
    double power_binary_exponentiation_recursive(double base, int exponent) {
        // Handle edge cases
        if (base == 0.0) {
            if (exponent == 0) return 1.0; // Convention: 0^0 is 1
            return 0.0; // 0^positive = 0, 0^negative is undefined (return 0.0 for practical purposes or error)
        }
        if (exponent == 0) return 1.0;
        if (base == 1.0) return 1.0; // 1 to any power is 1

        double result = 1.0;
        long long exp_abs = exponent; // Use long long to handle INT_MIN safely
        bool is_negative_exp = false;

        if (exp_abs < 0) {
            is_negative_exp = true;
            exp_abs = MathUtils::absolute(exp_abs); // Convert to positive exponent
        }

        // Recursive helper function
        // Note: For large exponents, passing `exp_abs` as `long long` is safer.
        // But for `int` exponent as per function signature, it fits within `int`.
        // The cast to `long long` for `exp_abs` is primarily for `INT_MIN` case
        // where `abs(INT_MIN)` is `INT_MIN` in 2's complement systems.
        // `MathUtils::absolute` correctly handles this.
        std::function<double(double, long long)> calculate_power =
            [&](double b, long long e) -> double {
            if (e == 0) return 1.0;
            double half_power = calculate_power(b, e / 2);
            if (e % 2 == 0) {
                return half_power * half_power;
            } else {
                return half_power * half_power * b;
            }
        };

        result = calculate_power(base, exp_abs);

        return is_negative_exp ? (1.0 / result) : result;
    }

    /**
     * @brief Calculates x raised to the power of n using Binary Exponentiation (iterative).
     *        Efficiently computes x^n by repeatedly squaring the base and adjusting the result.
     * @param base The base number.
     * @param exponent The integer exponent.
     * @return The result of base^exponent.
     * @complexity
     *   Time: O(log |n|) - Iterates through the bits of the exponent.
     *   Space: O(1) - Constant extra space.
     */
    double power_binary_exponentiation_iterative(double base, int exponent) {
        // Handle edge cases
        if (base == 0.0) {
            if (exponent == 0) return 1.0; // Convention: 0^0 is 1
            return 0.0; // 0^positive = 0, 0^negative is undefined (return 0.0 for practical purposes or error)
        }
        if (exponent == 0) return 1.0;
        if (base == 1.0) return 1.0; // 1 to any power is 1

        double result = 1.0;
        long long exp_abs = exponent; // Use long long to handle INT_MIN safely
        bool is_negative_exp = false;

        if (exp_abs < 0) {
            is_negative_exp = true;
            exp_abs = MathUtils::absolute(exp_abs); // Convert to positive exponent
        }

        double current_base = base;
        while (exp_abs > 0) {
            // If the current bit of exponent is 1 (i.e., exponent is odd)
            if (exp_abs % 2 == 1) {
                result *= current_base;
            }
            // Square the base for the next iteration (next bit)
            current_base *= current_base;
            // Halve the exponent (shift right by 1 bit)
            exp_abs /= 2;
        }

        return is_negative_exp ? (1.0 / result) : result;
    }

} // namespace PowerCalculation

// --- Problem 4: Nth Fibonacci Number ---

namespace Fibonacci {

    /**
     * @brief Calculates the Nth Fibonacci number using a naive recursive approach.
     *        F(n) = F(n-1) + F(n-2) with F(0)=0, F(1)=1.
     * @param n The index of the Fibonacci number to calculate (n >= 0).
     * @return The Nth Fibonacci number. Returns -1 for invalid input (n < 0).
     * @complexity
     *   Time: O(2^n) - Exponential due to redundant calculations (e.g., F(2) is calculated multiple times for F(5)).
     *   Space: O(n) - Due to the maximum depth of the recursion stack.
     */
    long long fibonacci_recursive_naive(int n) {
        if (n < 0) return -1; // Invalid input
        if (n == 0) return 0;
        if (n == 1) return 1;

        return fibonacci_recursive_naive(n - 1) + fibonacci_recursive_naive(n - 2);
    }

    /**
     * @brief Helper function for recursive Fibonacci with Memoization.
     *        Hides the memoization table from the public API.
     * @param n The index of the Fibonacci number to calculate.
     * @param memo_table A reference to the memoization vector.
     * @return The Nth Fibonacci number.
     */
    long long fibonacci_recursive_memoized_helper(int n, std::vector<long long>& memo_table) {
        if (n < 0) return -1; // Invalid input
        if (n == 0) return 0;
        if (n == 1) return 1;

        // If the result is already computed, return it
        if (memo_table[n] != -1) { // -1 indicates not computed
            return memo_table[n];
        }

        // Compute and store the result
        memo_table[n] = fibonacci_recursive_memoized_helper(n - 1, memo_table) +
                        fibonacci_recursive_memoized_helper(n - 2, memo_table);
        return memo_table[n];
    }

    /**
     * @brief Calculates the Nth Fibonacci number using recursive approach with Memoization (Dynamic Programming).
     *        Avoids redundant calculations by storing previously computed results.
     * @param n The index of the Fibonacci number to calculate (n >= 0).
     * @return The Nth Fibonacci number. Returns -1 for invalid input (n < 0).
     * @complexity
     *   Time: O(n) - Each Fibonacci number from 2 to n is computed only once.
     *   Space: O(n) - For the memoization table and O(n) for the recursion stack.
     */
    long long fibonacci_recursive_memoized(int n) {
        if (n < 0) return -1;
        // Initialize memoization table with -1 (or some indicator for not computed)
        // Size n+1 to store F(0) through F(n)
        std::vector<long long> memo_table(n + 1, -1);
        return fibonacci_recursive_memoized_helper(n, memo_table);
    }

    /**
     * @brief Calculates the Nth Fibonacci number using an iterative approach (Bottom-Up Dynamic Programming).
     *        Builds up the sequence from F(0) and F(1).
     * @param n The index of the Fibonacci number to calculate (n >= 0).
     * @return The Nth Fibonacci number. Returns -1 for invalid input (n < 0).
     * @complexity
     *   Time: O(n) - Linear, as it iterates from 2 up to n.
     *   Space: O(1) - Only a few variables are used to store the last two Fibonacci numbers.
     */
    long long fibonacci_iterative(int n) {
        if (n < 0) return -1; // Invalid input
        if (n == 0) return 0;
        if (n == 1) return 1;

        long long a = 0; // Represents F(i-2)
        long long b = 1; // Represents F(i-1)
        long long current_fib = 0; // Represents F(i)

        // Iterate from 2 up to n
        for (int i = 2; i <= n; ++i) {
            current_fib = a + b;
            a = b; // Update a to be the previous b
            b = current_fib; // Update b to be the current F(i)
        }
        return current_fib;
    }

} // namespace Fibonacci
```