```cpp
#include <iostream>
#include <vector>
#include <iomanip> // For std::fixed, std::setprecision

#include "problems.h"
#include "utilities.h" // For general utilities like MathUtils

void print_separator() {
    std::cout << "\n------------------------------------------------\n" << std::endl;
}

int main() {
    std::cout << "Math Problems Demonstration\n" << std::endl;

    // --- Problem 1: GCD & LCM ---
    std::cout << "--- Problem 1: Greatest Common Divisor (GCD) & Least Common Multiple (LCM) ---" << std::endl;
    long long num1 = 48, num2 = 18;
    long long num3 = 101, num4 = 103; // Primes
    long long num5 = 0, num6 = 7;
    long long num7 = -48, num8 = 18;

    std::cout << "GCD(" << num1 << ", " << num2 << "):" << std::endl;
    std::cout << "  Naive: " << GCD_LCM::gcd_naive(num1, num2) << std::endl; // Expected: 6
    std::cout << "  Euclidean Recursive: " << GCD_LCM::gcd_euclidean_recursive(num1, num2) << std::endl; // Expected: 6
    std::cout << "  Euclidean Iterative: " << GCD_LCM::gcd_euclidean_iterative(num1, num2) << std::endl; // Expected: 6

    std::cout << "GCD(" << num3 << ", " << num4 << "):" << std::endl; // Expected: 1
    std::cout << "  Euclidean Iterative: " << GCD_LCM::gcd_euclidean_iterative(num3, num4) << std::endl;

    std::cout << "GCD(" << num5 << ", " << num6 << "):" << std::endl; // Expected: 7
    std::cout << "  Euclidean Iterative: " << GCD_LCM::gcd_euclidean_iterative(num5, num6) << std::endl;

    std::cout << "GCD(" << num7 << ", " << num8 << ") (with negative):" << std::endl; // Expected: 6
    std::cout << "  Euclidean Iterative: " << GCD_LCM::gcd_euclidean_iterative(num7, num8) << std::endl;

    std::cout << "\nLCM(" << num1 << ", " << num2 << "):" << std::endl;
    std::cout << "  Result: " << GCD_LCM::lcm(num1, num2) << std::endl; // Expected: (48*18)/6 = 144

    std::cout << "LCM(" << num3 << ", " << num4 << "):" << std::endl;
    std::cout << "  Result: " << GCD_LCM::lcm(num3, num4) << std::endl; // Expected: 101*103 = 10403

    std::cout << "LCM(" << num5 << ", " << num6 << "):" << std::endl;
    std::cout << "  Result: " << GCD_LCM::lcm(num5, num6) << std::endl; // Expected: 0

    print_separator();

    // --- Problem 2: Prime Number Generation ---
    std::cout << "--- Problem 2: Prime Number Generation ---" << std::endl;
    int prime_limit = 50;
    std::cout << "Primes up to " << prime_limit << " (using Sieve):" << std::endl;
    std::vector<int> primes = PrimeNumbers::get_primes_list_sieve(prime_limit);
    std::cout << "  [ ";
    for (int p : primes) {
        std::cout << p << " ";
    }
    std::cout << "]" << std::endl;

    std::cout << "\nIs prime check (naive):" << std::endl;
    std::cout << "  is_prime_naive(29): " << (PrimeNumbers::is_prime_naive(29) ? "true" : "false") << std::endl; // Expected: true
    std::cout << "  is_prime_naive(91): " << (PrimeNumbers::is_prime_naive(91) ? "true" : "false") << std::endl; // Expected: false (7*13)
    std::cout << "  is_prime_naive(1): " << (PrimeNumbers::is_prime_naive(1) ? "true" : "false") << std::endl;   // Expected: false

    print_separator();

    // --- Problem 3: Power (x^n) Calculation ---
    std::cout << "--- Problem 3: Power (x^n) Calculation ---" << std::endl;
    double base1 = 2.0;
    int exp1 = 10;
    double base2 = 2.5;
    int exp2 = -2;
    double base3 = 5.0;
    int exp3 = 0;
    double base4 = 0.0;
    int exp4 = 5;
    double base5 = 0.0;
    int exp5 = 0;
    double base6 = 0.0;
    int exp6 = -3;

    std::cout << std::fixed << std::setprecision(10); // For floating point precision

    std::cout << base1 << "^" << exp1 << ":" << std::endl; // Expected: 1024
    std::cout << "  Naive: " << PowerCalculation::power_naive(base1, exp1) << std::endl;
    std::cout << "  Binary Rec: " << PowerCalculation::power_binary_exponentiation_recursive(base1, exp1) << std::endl;
    std::cout << "  Binary Iter: " << PowerCalculation::power_binary_exponentiation_iterative(base1, exp1) << std::endl;

    std::cout << base2 << "^" << exp2 << ":" << std::endl; // Expected: 0.16
    std::cout << "  Naive: " << PowerCalculation::power_naive(base2, exp2) << std::endl;
    std::cout << "  Binary Rec: " << PowerCalculation::power_binary_exponentiation_recursive(base2, exp2) << std::endl;
    std::cout << "  Binary Iter: " << PowerCalculation::power_binary_exponentiation_iterative(base2, exp2) << std::endl;

    std::cout << base3 << "^" << exp3 << ":" << std::endl; // Expected: 1
    std::cout << "  Naive: " << PowerCalculation::power_naive(base3, exp3) << std::endl;
    std::cout << "  Binary Rec: " << PowerCalculation::power_binary_exponentiation_recursive(base3, exp3) << std::endl;
    std::cout << "  Binary Iter: " << PowerCalculation::power_binary_exponentiation_iterative(base3, exp3) << std::endl;

    std::cout << base4 << "^" << exp4 << ":" << std::endl; // Expected: 0
    std::cout << "  Binary Iter: " << PowerCalculation::power_binary_exponentiation_iterative(base4, exp4) << std::endl;

    std::cout << base5 << "^" << exp5 << ":" << std::endl; // Expected: 1 (0^0 convention)
    std::cout << "  Binary Iter: " << PowerCalculation::power_binary_exponentiation_iterative(base5, exp5) << std::endl;

    std::cout << base6 << "^" << exp6 << ":" << std::endl; // Expected: 0 (0^negative undefined, returning 0 for practical)
    std::cout << "  Binary Iter: " << PowerCalculation::power_binary_exponentiation_iterative(base6, exp6) << std::endl;


    print_separator();

    // --- Problem 4: Nth Fibonacci Number ---
    std::cout << "--- Problem 4: Nth Fibonacci Number ---" << std::endl;
    int fib_n1 = 10; // Expected F(10) = 55
    int fib_n2 = 0;  // Expected F(0) = 0
    int fib_n3 = 1;  // Expected F(1) = 1
    int fib_n4 = 2;  // Expected F(2) = 1
    int fib_n_large = 40; // For comparison of efficiency

    std::cout << "F(" << fib_n1 << "):" << std::endl;
    std::cout << "  Naive Rec: " << Fibonacci::fibonacci_recursive_naive(fib_n1) << std::endl;
    std::cout << "  Memoized Rec: " << Fibonacci::fibonacci_recursive_memoized(fib_n1) << std::endl;
    std::cout << "  Iterative: " << Fibonacci::fibonacci_iterative(fib_n1) << std::endl;

    std::cout << "F(" << fib_n2 << "):" << std::endl;
    std::cout << "  Iterative: " << Fibonacci::fibonacci_iterative(fib_n2) << std::endl;

    std::cout << "F(" << fib_n3 << "):" << std::endl;
    std::cout << "  Iterative: " << Fibonacci::fibonacci_iterative(fib_n3) << std::endl;

    std::cout << "F(" << fib_n4 << "):" << std::endl;
    std::cout << "  Iterative: " << Fibonacci::fibonacci_iterative(fib_n4) << std::endl;

    std::cout << "F(" << -5 << ") (invalid):" << std::endl;
    std::cout << "  Iterative: " << Fibonacci::fibonacci_iterative(-5) << std::endl; // Expected: -1

    std::cout << "\nFor large N (e.g., F(" << fib_n_large << ")) naive recursion is very slow:" << std::endl;
    // std::cout << "  Naive Rec: " << Fibonacci::fibonacci_recursive_naive(fib_n_large) << std::endl; // WARNING: This will take a long time!
    std::cout << "  Memoized Rec F(" << fib_n_large << "): " << Fibonacci::fibonacci_recursive_memoized(fib_n_large) << std::endl; // Expected F(40)=102334155
    std::cout << "  Iterative F(" << fib_n_large << "): " << Fibonacci::fibonacci_iterative(fib_n_large) << std::endl;             // Expected F(40)=102334155

    print_separator();

    return 0;
}
```