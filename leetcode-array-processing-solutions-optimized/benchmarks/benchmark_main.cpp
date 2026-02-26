#include "include/array_manipulation.h"
#include "include/utils.h"
#include <iostream>
#include <vector>
#include <chrono>
#include <numeric> // For std::iota
#include <random>  // For random numbers

// Helper to measure execution time
long long measureTimeMs(std::function<void()> func) {
    auto start = std::chrono::high_resolution_clock::now();
    func();
    auto end = std::chrono::high_resolution_clock::now();
    return std::chrono::duration_cast<std::chrono::milliseconds>(end - start).count();
}

void benchmarkRotateArray() {
    std::cout << "--- Benchmarking Rotate Array ---" << std::endl;
    std::vector<int> sizes = {1000, 10000, 100000, 1000000}; // Various array sizes

    for (int n : sizes) {
        std::vector<int> original_nums(n);
        std::iota(original_nums.begin(), original_nums.end(), 0); // Fill with 0, 1, ..., n-1
        int k = n / 3; // Rotate by n/3 steps

        std::cout << "Array size: " << n << ", k: " << k << std::endl;

        // Approach 1: Temporary Array
        std::vector<int> nums_a1 = original_nums;
        long long time_a1 = measureTimeMs([&]() {
            RotateArray::rotate_approach1(nums_a1, k);
        });
        std::cout << "  Approach 1 (Temp Array):    " << time_a1 << " ms" << std::endl;

        // Approach 2: Reversal
        std::vector<int> nums_a2 = original_nums;
        long long time_a2 = measureTimeMs([&]() {
            RotateArray::rotate_approach2(nums_a2, k);
        });
        std::cout << "  Approach 2 (Reversal):      " << time_a2 << " ms" << std::endl;

        // Approach 3: Juggling Cycle
        std::vector<int> nums_a3 = original_nums;
        long long time_a3 = measureTimeMs([&]() {
            RotateArray::rotate_approach3(nums_a3, k);
        });
        std::cout << "  Approach 3 (Juggling Cycle):" << time_a3 << " ms" << std::endl;
        std::cout << std::endl;
    }
}

void benchmarkProductExceptSelf() {
    std::cout << "--- Benchmarking Product of Array Except Self ---" << std::endl;
    std::vector<int> sizes = {1000, 10000, 100000, 1000000}; // Various array sizes

    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib(-10, 10); // Values between -10 and 10

    for (int n : sizes) {
        std::vector<int> nums(n);
        for (int i = 0; i < n; ++i) {
            nums[i] = distrib(gen);
        }

        std::cout << "Array size: " << n << std::endl;

        // Approach 1: Two-pass
        long long time_a1 = measureTimeMs([&]() {
            ProductExceptSelf::productExceptSelf_approach1(nums);
        });
        std::cout << "  Approach 1 (Two-pass): " << time_a1 << " ms" << std::endl;
        std::cout << std::endl;
    }
}

void benchmarkMergeIntervals() {
    std::cout << "--- Benchmarking Merge Intervals ---" << std::endl;
    std::vector<int> sizes = {1000, 10000, 100000}; // Max intervals to avoid excessive runtime

    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib(1, 1000000); // Interval values up to 1M

    for (int n : sizes) {
        std::vector<std::vector<int>> intervals(n);
        for (int i = 0; i < n; ++i) {
            int start = distrib(gen);
            int end = start + distrib(gen) % 100; // Intervals are relatively short
            intervals[i] = {start, end};
        }

        std::cout << "Number of intervals: " << n << std::endl;

        // Approach 1: Sort and merge
        // Note: `merge_approach1` modifies the input vector, so pass a copy for fair timing.
        long long time_a1 = measureTimeMs([&]() {
            std::vector<std::vector<int>> current_intervals = intervals; // Copy for each run
            MergeIntervals::merge_approach1(current_intervals);
        });
        std::cout << "  Approach 1 (Sort and Merge): " << time_a1 << " ms" << std::endl;
        std::cout << std::endl;
    }
}

void benchmarkTrappingRainWater() {
    std::cout << "--- Benchmarking Trapping Rain Water ---" << std::endl;
    std::vector<int> sizes = {1000, 10000, 100000, 1000000}; // Various array sizes

    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib(0, 10000); // Heights between 0 and 10000

    for (int n : sizes) {
        std::vector<int> height(n);
        for (int i = 0; i < n; ++i) {
            height[i] = distrib(gen);
        }

        std::cout << "Array size: " << n << std::endl;

        // Approach 1: Two Pointers
        long long time_a1 = measureTimeMs([&]() {
            TrappingRainWater::trap_approach1(height);
        });
        std::cout << "  Approach 1 (Two Pointers): " << time_a1 << " ms" << std::endl;

        // Approach 2: Stack
        long long time_a2 = measureTimeMs([&]() {
            TrappingRainWater::trap_approach2(height);
        });
        std::cout << "  Approach 2 (Stack):        " << time_a2 << " ms" << std::endl;
        std::cout << std::endl;
    }
}

int main() {
    std::cout << "Array Manipulation Benchmarks" << std::endl;
    std::cout << "=============================" << std::endl << std::endl;

    benchmarkRotateArray();
    benchmarkProductExceptSelf();
    benchmarkMergeIntervals();
    benchmarkTrappingRainWater();

    return 0;
}
---