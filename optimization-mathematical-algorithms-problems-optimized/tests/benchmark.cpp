```cpp
#include <iostream>
#include <vector>
#include <cmath>
#include <numeric>
#include <random>

#include "problems.h"
#include "utilities.h" // For Benchmark::Timer

// Function to print a separator for readability
void print_separator() {
    std::cout << "\n----------------------------------------\n" << std::endl;
}

// --- Benchmark for GCD & LCM ---
void benchmark_gcd_lcm() {
    std::cout << "--- Benchmarking GCD & LCM ---" << std::endl;
    Benchmark::Timer timer;
    long long a = 98765432101234567LL; // Large numbers for GCD
    long long b = 123456789098765432LL;

    std::cout << "GCD(" << a << ", " << b << "):" << std::endl;

    double duration_naive = timer.measure([&]() {
        // Naive is too slow for very large numbers; use smaller ones for a meaningful test
        // Or comment out if the numbers are too large for O(N) complexity
        // GCD_LCM::gcd_naive(100000, 75000);
    });
    // Benchmark::print_benchmark_result("GCD Naive (smaller inputs)", duration_naive);


    double duration_euclidean_rec = timer.measure([&]() {
        GCD_LCM::gcd_euclidean_recursive(a, b);
    });
    Benchmark::print_benchmark_result("GCD Euclidean Recursive", duration_euclidean_rec);

    double duration_euclidean_iter = timer.measure([&]() {
        GCD_LCM::gcd_euclidean_iterative(a, b);
    });
    Benchmark::print_benchmark_result("GCD Euclidean Iterative", duration_euclidean_iter);

    std::cout << "\nLCM(" << a << ", " << b << "):" << std::endl;
    double duration_lcm = timer.measure([&]() {
        GCD_LCM::lcm(a, b);
    });
    Benchmark::print_benchmark_result("LCM (using Euclidean)", duration_lcm);

    long long gcd_result = GCD_LCM::gcd_euclidean_iterative(a,b);
    long long lcm_result = GCD_LCM::lcm(a,b);
    std::cout << "  GCD Result: " << gcd_result << std::endl;
    std::cout << "  LCM Result: " << lcm_result << std::endl;

    // Check relationship (a*b)/GCD = LCM, but careful with overflow for large numbers
    // Here we'll just print the calculated values.
}

// --- Benchmark for Prime Number Generation ---
void benchmark_prime_numbers() {
    std::cout << "\n--- Benchmarking Prime Number Generation ---" << std::endl;
    Benchmark::Timer timer;

    int limit_large = 1000000; // 1 million
    int limit_medium = 100000; // 100k
    int test_num_large = 999999; // For is_prime_naive check (composite)
    int test_num_prime = 999983; // A large prime

    std::cout << "is_prime_naive(" << test_num_large << "):" << std::endl;
    double duration_is_prime_naive_comp = timer.measure([&]() {
        PrimeNumbers::is_prime_naive(test_num_large);
    });
    Benchmark::print_benchmark_result("  Composite " + std::to_string(test_num_large), duration_is_prime_naive_comp);

    std::cout << "is_prime_naive(" << test_num_prime << "):" << std::endl;
    double duration_is_prime_naive_prime = timer.measure([&]() {
        PrimeNumbers::is_prime_naive(test_num_prime);
    });
    Benchmark::print_benchmark_result("  Prime " + std::to_string(test_num_prime), duration_is_prime_naive_prime);


    std::cout << "\nSieve of Eratosthenes (limit " << limit_medium << "):" << std::endl;
    double duration_sieve_medium_bool = timer.measure([&]() {
        PrimeNumbers::sieve_of_eratosthenes(limit_medium);
    });
    Benchmark::print_benchmark_result("  Sieve (bool vector) " + std::to_string(limit_medium), duration_sieve_medium_bool);

    double duration_sieve_medium_list = timer.measure([&]() {
        PrimeNumbers::get_primes_list_sieve(limit_medium);
    });
    Benchmark::print_benchmark_result("  Sieve (primes list) " + std::to_string(limit_medium), duration_sieve_medium_list);


    std::cout << "\nSieve of Eratosthenes (limit " << limit_large << "):" << std::endl;
    double duration_sieve_large_bool = timer.measure([&]() {
        PrimeNumbers::sieve_of_eratosthenes(limit_large);
    });
    Benchmark::print_benchmark_result("  Sieve (bool vector) " + std::to_string(limit_large), duration_sieve_large_bool);

    double duration_sieve_large_list = timer.measure([&]() {
        PrimeNumbers::get_primes_list_sieve(limit_large);
    });
    Benchmark::print_benchmark_result("  Sieve (primes list) " + std::to_string(limit_large), duration_sieve_large_list);

    // Verify a count for large sieve
    std::vector<bool> primes_bool = PrimeNumbers::sieve_of_eratosthenes(limit_large);
    long long count = 0;
    for(int i = 0; i <= limit_large; ++i) {
        if(primes_bool[i]) count++;
    }
    std::cout << "  Total primes found up to " << limit_large << ": " << count << std::endl; // Should be 78498
}

// --- Benchmark for Power Calculation ---
void benchmark_power_calculation() {
    std::cout << "\n--- Benchmarking Power (x^n) Calculation ---" << std::endl;
    Benchmark::Timer timer;

    double base = 1.000000001; // Slightly > 1 to avoid trivial 1^n=1
    int exponent_small = 10;
    int exponent_medium = 1000;
    int exponent_large = 100000000; // 10^8
    int exponent_neg = -exponent_large;

    std::cout << "Base: " << base << std::endl;

    std::cout << "Exponent: " << exponent_small << std::endl;
    double duration_naive_small = timer.measure([&]() {
        PowerCalculation::power_naive(base, exponent_small);
    });
    Benchmark::print_benchmark_result("  Naive", duration_naive_small);

    double duration_binary_rec_small = timer.measure([&]() {
        PowerCalculation::power_binary_exponentiation_recursive(base, exponent_small);
    });
    Benchmark::print_benchmark_result("  Binary Recursive", duration_binary_rec_small);

    double duration_binary_iter_small = timer.measure([&]() {
        PowerCalculation::power_binary_exponentiation_iterative(base, exponent_small);
    });
    Benchmark::print_benchmark_result("  Binary Iterative", duration_binary_iter_small);


    std::cout << "\nExponent: " << exponent_medium << std::endl;
    double duration_naive_medium = timer.measure([&]() {
        PowerCalculation::power_naive(base, exponent_medium);
    });
    Benchmark::print_benchmark_result("  Naive", duration_naive_medium);

    double duration_binary_rec_medium = timer.measure([&]() {
        PowerCalculation::power_binary_exponentiation_recursive(base, exponent_medium);
    });
    Benchmark::print_benchmark_result("  Binary Recursive", duration_binary_rec_medium);

    double duration_binary_iter_medium = timer.measure([&]() {
        PowerCalculation::power_binary_exponentiation_iterative(base, exponent_medium);
    });
    Benchmark::print_benchmark_result("  Binary Iterative", duration_binary_iter_medium);


    std::cout << "\nExponent: " << exponent_large << std::endl;
    // Naive for exponent_large is prohibitively slow, skip or use a very fast base like 1.0.
    // double duration_naive_large = timer.measure([&]() { PowerCalculation::power_naive(base, exponent_large); });
    // Benchmark::print_benchmark_result("  Naive", duration_naive_large);

    double duration_binary_rec_large = timer.measure([&]() {
        PowerCalculation::power_binary_exponentiation_recursive(base, exponent_large);
    });
    Benchmark::print_benchmark_result("  Binary Recursive", duration_binary_rec_large);

    double duration_binary_iter_large = timer.measure([&]() {
        PowerCalculation::power_binary_exponentiation_iterative(base, exponent_large);
    });
    Benchmark::print_benchmark_result("  Binary Iterative", duration_binary_iter_large);

    std::cout << "\nExponent: " << exponent_neg << std::endl;
    double duration_binary_iter_neg = timer.measure([&]() {
        PowerCalculation::power_binary_exponentiation_iterative(base, exponent_neg);
    });
    Benchmark::print_benchmark_result("  Binary Iterative (Negative Exp)", duration_binary_iter_neg);

    // Verify results for a large exponent
    double result_iter = PowerCalculation::power_binary_exponentiation_iterative(base, exponent_large);
    std::cout << std::fixed << std::setprecision(10);
    std::cout << "  Calculated " << base << "^" << exponent_large << ": " << result_iter << std::endl;
    // Compare with std::pow
    // std::cout << "  std::pow(" << base << ", " << exponent_large << "): " << std::pow(base, exponent_large) << std::endl;

}

// --- Benchmark for Fibonacci Numbers ---
void benchmark_fibonacci() {
    std::cout << "\n--- Benchmarking Fibonacci Numbers ---" << std::endl;
    Benchmark::Timer timer;

    int fib_n_small = 15;
    int fib_n_medium = 30;
    int fib_n_large = 45; // naive will be very slow here
    int fib_n_vlarge = 90; // For iterative, fits long long

    std::cout << "N = " << fib_n_small << std::endl;
    double duration_fib_naive_small = timer.measure([&]() {
        Fibonacci::fibonacci_recursive_naive(fib_n_small);
    });
    Benchmark::print_benchmark_result("  Naive Recursive", duration_fib_naive_small);

    double duration_fib_memo_small = timer.measure([&]() {
        Fibonacci::fibonacci_recursive_memoized(fib_n_small);
    });
    Benchmark::print_benchmark_result("  Memoized Recursive", duration_fib_memo_small);

    double duration_fib_iter_small = timer.measure([&]() {
        Fibonacci::fibonacci_iterative(fib_n_small);
    });
    Benchmark::print_benchmark_result("  Iterative", duration_fib_iter_small);


    std::cout << "\nN = " << fib_n_medium << std::endl;
    double duration_fib_naive_medium = timer.measure([&]() {
        Fibonacci::fibonacci_recursive_naive(fib_n_medium);
    });
    Benchmark::print_benchmark_result("  Naive Recursive", duration_fib_naive_medium);

    double duration_fib_memo_medium = timer.measure([&]() {
        Fibonacci::fibonacci_recursive_memoized(fib_n_medium);
    });
    Benchmark::print_benchmark_result("  Memoized Recursive", duration_fib_memo_medium);

    double duration_fib_iter_medium = timer.measure([&]() {
        Fibonacci::fibonacci_iterative(fib_n_medium);
    });
    Benchmark::print_benchmark_result("  Iterative", duration_fib_iter_medium);


    std::cout << "\nN = " << fib_n_large << std::endl;
    // Naive recursive for fib_n_large is likely too slow, comment out for typical runs
    // double duration_fib_naive_large = timer.measure([&]() { Fibonacci::fibonacci_recursive_naive(fib_n_large); });
    // Benchmark::print_benchmark_result("  Naive Recursive", duration_fib_naive_large);

    double duration_fib_memo_large = timer.measure([&]() {
        Fibonacci::fibonacci_recursive_memoized(fib_n_large);
    });
    Benchmark::print_benchmark_result("  Memoized Recursive", duration_fib_memo_large);

    double duration_fib_iter_large = timer.measure([&]() {
        Fibonacci::fibonacci_iterative(fib_n_large);
    });
    Benchmark::print_benchmark_result("  Iterative", duration_fib_iter_large);

    std::cout << "\nN = " << fib_n_vlarge << std::endl;
    double duration_fib_iter_vlarge = timer.measure([&]() {
        Fibonacci::fibonacci_iterative(fib_n_vlarge);
    });
    Benchmark::print_benchmark_result("  Iterative", duration_fib_iter_vlarge);

    // Print a large Fibonacci number result
    std::cout << "  F(" << fib_n_vlarge << ") = " << Fibonacci::fibonacci_iterative(fib_n_vlarge) << std::endl;
}

int main() {
    std::cout << "Running all benchmarks..." << std::endl;

    benchmark_gcd_lcm();
    print_separator();
    benchmark_prime_numbers();
    print_separator();
    benchmark_power_calculation();
    print_separator();
    benchmark_fibonacci();
    print_separator();

    std::cout << "Benchmarks finished." << std::endl;

    return 0;
}
```