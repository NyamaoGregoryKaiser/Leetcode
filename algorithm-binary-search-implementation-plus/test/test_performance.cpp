#include "../src/utils.h"
#include "../src/main_algorithms.cpp" // Include .cpp directly for simpler compilation
#include "../src/brute_force_vs_optimized.cpp" // Include .cpp directly
#include <iostream>
#include <vector>
#include <chrono>
#include <random>
#include <algorithm> // For std::find, std::min_element

// Timer utility for measuring execution time
class Timer {
public:
    Timer() : start_time(std::chrono::high_resolution_clock::now()) {}

    void reset() {
        start_time = std::chrono::high_resolution_clock::now();
    }

    double elapsed_ms() const {
        auto end_time = std::chrono::high_resolution_clock::now();
        return std::chrono::duration_cast<std::chrono::nanoseconds>(end_time - start_time).count() / 1000000.0;
    }

private:
    std::chrono::high_resolution_clock::time_point start_time;
};

void benchmarkBinaryVsLinearSearch(int max_size) {
    std::cout << "\n--- Benchmarking Linear Search vs. Binary Search (Problem 1) ---" << std::endl;
    std::cout << "Array Size\tLinear Search (ms)\tBinary Search (ms)" << std::endl;
    std::cout << "---------------------------------------------------------" << std::endl;

    Timer timer;
    std::random_device rd;
    std::mt19937 gen(rd());

    for (int size = 1000; size <= max_size; size *= 10) {
        std::vector<int> arr = generateRandomSortedVector(size, 0, size * 2);
        
        // Pick a target likely to be found, or not found at the end to ensure worst case for linear.
        int target_found_worst_case = arr.empty() ? -1 : arr[size - 1]; // Last element
        int target_not_found_worst_case = size * 2 + 1; // Element after max value

        // Linear Search - Worst case (target not found or at the end)
        timer.reset();
        linearSearch(arr, target_not_found_worst_case);
        double linear_time = timer.elapsed_ms();

        // Binary Search
        timer.reset();
        binarySearchIterative(arr, target_not_found_worst_case);
        double binary_time = timer.elapsed_ms();

        std::cout.precision(4);
        std::cout << std::fixed << size << "\t\t" << linear_time << "\t\t\t" << binary_time << std::endl;
    }
}

void benchmarkMinInRotatedVsLinear(int max_size) {
    std::cout << "\n--- Benchmarking Linear Min vs. Binary Min in Rotated Array (Problem 4) ---" << std::endl;
    std::cout << "Array Size\tLinear Min (ms)\t\tBinary Min (ms)" << std::endl;
    std::cout << "---------------------------------------------------------" << std::endl;

    Timer timer;
    for (int size = 1000; size <= max_size; size *= 10) {
        std::vector<int> arr = generateRandomRotatedSortedVector(size, 0, size * 2);

        timer.reset();
        findMinInRotatedSortedArray_Linear(arr);
        double linear_time = timer.elapsed_ms();

        timer.reset();
        findMinInRotatedSortedArray_V2(arr);
        double binary_time = timer.elapsed_ms();

        std::cout.precision(4);
        std::cout << std::fixed << size << "\t\t" << linear_time << "\t\t\t" << binary_time << std::endl;
    }
}

void benchmarkSqrtVsLinear(int max_val) {
    std::cout << "\n--- Benchmarking Linear Sqrt vs. Binary Sqrt (Problem 5) ---" << std::endl;
    std::cout << "Input Value\tLinear Sqrt (ms)\tBinary Sqrt (ms)" << std::endl;
    std::cout << "---------------------------------------------------------" << std::endl;

    Timer timer;
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib(1, max_val);

    for (long long val = 10000; val <= max_val; val *= 10) {
        // Run multiple times for average, as a single large number might not be enough for good timing
        int num_runs = 1000;
        double linear_total_time = 0.0;
        double binary_total_time = 0.0;

        for (int i = 0; i < num_runs; ++i) {
            int current_x = distrib(gen); // Use random values within the range
            if (current_x < 1) current_x = 1; // Ensure valid input

            timer.reset();
            mySqrt_Linear_V2(current_x);
            linear_total_time += timer.elapsed_ms();

            timer.reset();
            mySqrt(current_x);
            binary_total_time += timer.elapsed_ms();
        }

        std::cout.precision(4);
        std::cout << std::fixed << val << "\t\t" << (linear_total_time / num_runs) << "\t\t\t" << (binary_total_time / num_runs) << std::endl;
    }
}


int main() {
    std::cout << "=== Running Performance Benchmarks ===" << std::endl;

    benchmarkBinaryVsLinearSearch(1000000); // Test up to 1 million elements
    benchmarkMinInRotatedVsLinear(1000000); // Test up to 1 million elements
    benchmarkSqrtVsLinear(2147483647);      // Test up to INT_MAX

    std::cout << "\n=== Performance Benchmarks Completed ===" << std::endl;
    return 0;
}