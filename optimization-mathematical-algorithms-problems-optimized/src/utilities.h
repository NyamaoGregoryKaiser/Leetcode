```cpp
#ifndef UTILITIES_H
#define UTILITIES_H

#include <iostream>
#include <vector>
#include <string>
#include <chrono>
#include <iomanip> // For std::fixed and std::setprecision

// --- Custom Test Framework ---
namespace TestFramework {

class TestCase {
public:
    static int total_tests;
    static int failed_tests;

    // Helper to print test status
    static void print_status(const std::string& test_name, bool passed) {
        std::cout << (passed ? "[PASS]" : "[FAIL]") << " " << test_name << std::endl;
        total_tests++;
        if (!passed) {
            failed_tests++;
        }
    }

    // Assert function for boolean conditions
    static void assert_true(bool condition, const std::string& test_name) {
        print_status(test_name, condition);
    }

    // Assert function for equality
    template<typename T>
    static void assert_equals(const T& expected, const T& actual, const std::string& test_name) {
        bool passed = (expected == actual);
        if (!passed) {
            std::cerr << "    Expected: " << expected << ", Actual: " << actual << std::endl;
        }
        print_status(test_name, passed);
    }

    // Assert function for vector equality
    template<typename T>
    static void assert_vector_equals(const std::vector<T>& expected, const std::vector<T>& actual, const std::string& test_name) {
        bool passed = (expected == actual);
        if (!passed) {
            std::cerr << "    Expected: [";
            for (const auto& val : expected) std::cerr << val << " ";
            std::cerr << "], Actual: [";
            for (const auto& val : actual) std::cerr << val << " ";
            std::cerr << "]" << std::endl;
        }
        print_status(test_name, passed);
    }

    static void summarize_results() {
        std::cout << "\n--- Test Summary ---" << std::endl;
        std::cout << "Total tests run: " << total_tests << std::endl;
        std::cout << "Tests passed: " << (total_tests - failed_tests) << std::endl;
        std::cout << "Tests failed: " << failed_tests << std::endl;
        std::cout << "--------------------" << std::endl;
        if (failed_tests > 0) {
            std::cerr << "!!! Some tests FAILED !!!" << std::endl;
        } else {
            std::cout << "All tests PASSED!" << std::endl;
        }
    }
};

int TestCase::total_tests = 0;
int TestCase::failed_tests = 0;

} // namespace TestFramework

// --- Benchmarking Utilities ---
namespace Benchmark {

class Timer {
private:
    std::chrono::high_resolution_clock::time_point start_time;

public:
    void start() {
        start_time = std::chrono::high_resolution_clock::now();
    }

    double stop() {
        auto end_time = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double> duration = end_time - start_time;
        return duration.count(); // Returns duration in seconds
    }

    template<typename Func, typename... Args>
    double measure(Func func, Args&&... args) {
        start();
        func(std::forward<Args>(args)...);
        return stop();
    }
};

// Helper function to print benchmark results
void print_benchmark_result(const std::string& name, double duration_seconds) {
    std::cout << std::fixed << std::setprecision(6);
    std::cout << "  " << name << ": " << duration_seconds * 1000.0 << " ms" << std::endl;
}

} // namespace Benchmark

// --- Common Math Utilities ---
namespace MathUtils {

// Function to check if a number is negative, useful for input validation
bool is_negative(long long n) {
    return n < 0;
}

// Function to get absolute value (can use std::abs, but for illustration)
long long absolute(long long n) {
    return (n < 0) ? -n : n;
}

} // namespace MathUtils

#endif // UTILITIES_H
```