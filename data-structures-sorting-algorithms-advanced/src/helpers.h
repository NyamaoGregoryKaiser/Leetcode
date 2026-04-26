```cpp
#ifndef HELPERS_H
#define HELPERS_H

#include <iostream>
#include <vector>
#include <string>
#include <algorithm> // For std::swap
#include <random>    // For random_device, mt19937, uniform_int_distribution
#include <chrono>    // For std::chrono::high_resolution_clock

namespace SortingAlgorithms {

// --- Utility Functions ---

/**
 * @brief Swaps two elements in memory.
 * @tparam T The type of elements to swap.
 * @param a Reference to the first element.
 * @param b Reference to the second element.
 */
template <typename T>
void swap(T& a, T& b) {
    T temp = a;
    a = b;
    b = temp;
}

/**
 * @brief Prints the elements of a vector to standard output.
 * @tparam T The type of elements in the vector.
 * @param vec The vector to print.
 * @param msg An optional message to display before the vector.
 */
template <typename T>
void print_vector(const std::vector<T>& vec, const std::string& msg = "") {
    if (!msg.empty()) {
        std::cout << msg;
    }
    std::cout << "[";
    for (size_t i = 0; i < vec.size(); ++i) {
        std::cout << vec[i];
        if (i < vec.size() - 1) {
            std::cout << ", ";
        }
    }
    std::cout << "]" << std::endl;
}

/**
 * @brief Generates a vector of random integers.
 * @param size The number of elements in the vector.
 * @param min_val The minimum possible value for an element.
 * @param max_val The maximum possible value for an element.
 * @return A vector of random integers.
 */
std::vector<int> generate_random_vector(size_t size, int min_val = 0, int max_val = 100) {
    std::vector<int> vec(size);
    std::random_device rd;
    std::mt19937 gen(rd()); // Seed with a random device
    std::uniform_int_distribution<> distrib(min_val, max_val);

    for (size_t i = 0; i < size; ++i) {
        vec[i] = distrib(gen);
    }
    return vec;
}

// --- Simple Test Framework ---

static int test_count = 0;
static int test_failed_count = 0;

/**
 * @brief A simple assertion function for testing.
 * @tparam T The type of values being compared.
 * @param actual The actual value.
 * @param expected The expected value.
 * @param test_name A descriptive name for the test.
 * @param line The line number where the assertion occurred (automatic).
 */
template <typename T>
void assert_equal(const T& actual, const T& expected, const std::string& test_name, int line) {
    test_count++;
    if (actual == expected) {
        std::cout << "[PASS] " << test_name << " (Line: " << line << ")" << std::endl;
    } else {
        std::cout << "[FAIL] " << test_name << " (Line: " << line << ")"
                  << " - Expected: " << expected << ", Got: " << actual << std::endl;
        test_failed_count++;
    }
}

/**
 * @brief A specialized assertion for comparing vectors.
 * @tparam T The type of elements in the vectors.
 * @param actual The actual vector.
 * @param expected The expected vector.
 * @param test_name A descriptive name for the test.
 * @param line The line number where the assertion occurred (automatic).
 */
template <typename T>
void assert_vector_equal(const std::vector<T>& actual, const std::vector<T>& expected, const std::string& test_name, int line) {
    test_count++;
    if (actual == expected) {
        std::cout << "[PASS] " << test_name << " (Line: " << line << ")" << std::endl;
    } else {
        std::cout << "[FAIL] " << test_name << " (Line: " << line << ")" << std::endl;
        std::cout << "       Expected: ";
        print_vector(expected);
        std::cout << "       Actual:   ";
        print_vector(actual);
        test_failed_count++;
    }
}

/**
 * @brief Prints a summary of the test results.
 */
void print_test_summary() {
    std::cout << "\n--- Test Summary ---" << std::endl;
    std::cout << "Total Tests Run: " << test_count << std::endl;
    std::cout << "Tests Passed: " << (test_count - test_failed_count) << std::endl;
    std::cout << "Tests Failed: " << test_failed_count << std::endl;
    std::cout << "--------------------" << std::endl;
    if (test_failed_count > 0) {
        std::cout << "Some tests failed. Please check the output above." << std::endl;
    } else {
        std::cout << "All tests passed successfully!" << std::endl;
    }
}

// Macro to simplify test calls
#define ASSERT_EQUAL(actual, expected, name) assert_equal(actual, expected, name, __LINE__)
#define ASSERT_VECTOR_EQUAL(actual, expected, name) assert_vector_equal(actual, expected, name, __LINE__)


// --- Timer for Benchmarking ---
class Timer {
public:
    Timer() : start_time_(std::chrono::high_resolution_clock::now()) {}

    void reset() {
        start_time_ = std::chrono::high_resolution_clock::now();
    }

    double elapsed_milliseconds() const {
        auto end_time = std::chrono::high_resolution_clock::now();
        return std::chrono::duration<double, std::milli>(end_time - start_time_).count();
    }

private:
    std::chrono::high_resolution_clock::time_point start_time_;
};

} // namespace SortingAlgorithms

#endif // HELPERS_H
```