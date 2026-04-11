```cpp
#include "../src/array_manipulator.h"
#include "../src/utils.h"
#include <iostream>
#include <vector>
#include <chrono>
#include <string>
#include <numeric> // For std::iota

// A simple macro for timing functions
#define TIME_FUNCTION(func_call, label) \
    do { \
        auto start = std::chrono::high_resolution_clock::now(); \
        func_call; \
        auto end = std::chrono::high_resolution_clock::now(); \
        std::chrono::duration<double, std::milli> duration = end - start; \
        std::cout << "  " << label << ": " << duration.count() << " ms\n"; \
    } while (0)


void benchmarkTwoSum() {
    std::cout << "\n--- Benchmarking Two Sum ---\n";
    std::vector<int> sizes = {1000, 10000, 50000}; //, 100000}; // 100k can be slow for N^2

    for (int size : sizes) {
        std::cout << "Input size: " << size << std::endl;
        std::vector<int> nums = generateShuffledVector(size, 1); // Unique numbers from 1 to size
        int target = nums[size/2] + nums[size/4]; // Ensure a solution exists

        // Benchmarking Brute Force
        if (size <= 10000) { // Limit brute force for very large inputs
            std::vector<int> result_brute;
            TIME_FUNCTION(result_brute = ArrayManipulator::twoSum_bruteForce(nums, target), "Brute Force (O(N^2))");
        } else {
            std::cout << "  Brute Force (O(N^2)): Skipped for large size " << size << "\n";
        }

        // Benchmarking Hash Map
        std::vector<int> result_hash;
        TIME_FUNCTION(result_hash = ArrayManipulator::twoSum_hashMap(nums, target), "Hash Map (O(N))");
        std::cout << std::endl;
    }
}

void benchmarkRotateArray() {
    std::cout << "\n--- Benchmarking Rotate Array ---\n";
    std::vector<int> sizes = {10000, 100000, 1000000};
    int k_small = 10;
    int k_large_relative = 100; // k is some fraction of N

    for (int size : sizes) {
        std::cout << "Input size: " << size << std::endl;
        std::vector<int> nums_base(size);
        std::iota(nums_base.begin(), nums_base.end(), 0); // Fill with 0, 1, 2, ...

        // Test with small k
        int k = k_small;
        std::cout << "  Rotation k=" << k << std::endl;
        std::vector<int> nums_copy = nums_base;
        TIME_FUNCTION(ArrayManipulator::rotate_extraArray(nums_copy, k), "Extra Array (O(N))");

        // Bubble sort with small k. For large N, large k it would be too slow.
        if ((long long)size * k <= 100000000) { // Limit N*k to prevent extremely long runs
            nums_copy = nums_base;
            TIME_FUNCTION(ArrayManipulator::rotate_bubble(nums_copy, k), "Bubble Rotate (O(N*k))");
        } else {
            std::cout << "  Bubble Rotate (O(N*k)): Skipped for large size*k " << (long long)size * k << "\n";
        }

        nums_copy = nums_base;
        TIME_FUNCTION(ArrayManipulator::rotate_reversal(nums_copy, k), "Reversal (O(N))");

        // Test with k proportional to N (for bubble rotate comparison)
        k = size / k_large_relative; // Make k relatively large
        if (k == 0) k = 1;
        std::cout << "  Rotation k=N/" << k_large_relative << " (~" << k << ")" << std::endl;
        nums_copy = nums_base;
        TIME_FUNCTION(ArrayManipulator::rotate_extraArray(nums_copy, k), "Extra Array (O(N))");
        
        if ((long long)size * k <= 100000000) { // Limit N*k to prevent extremely long runs
             nums_copy = nums_base;
             TIME_FUNCTION(ArrayManipulator::rotate_bubble(nums_copy, k), "Bubble Rotate (O(N*k))");
        } else {
            std::cout << "  Bubble Rotate (O(N*k)): Skipped for large size*k " << (long long)size * k << "\n";
        }

        nums_copy = nums_base;
        TIME_FUNCTION(ArrayManipulator::rotate_reversal(nums_copy, k), "Reversal (O(N))");
        std::cout << std::endl;
    }
}

void benchmarkMergeIntervals() {
    std::cout << "\n--- Benchmarking Merge Intervals ---\n";
    std::vector<int> sizes = {10000, 100000, 500000};

    for (int size : sizes) {
        std::cout << "Input size: " << size << std::endl;
        std::vector<std::vector<int>> intervals(size);
        for (int i = 0; i < size; ++i) {
            intervals[i] = {i * 2, i * 2 + 1}; // Non-overlapping initially
        }
        // Introduce some overlaps to make merging non-trivial
        if (size > 1) {
            intervals[size/4][1] = intervals[size/4 + 1][1]; // merge a few
            intervals[size/2][1] = intervals[size/2 + 2][1];
            intervals[3*size/4][1] = intervals[3*size/4 + 1][1];
        }
        // Make sure intervals are not perfectly sorted to force the sort step
        std::random_device rd;
        std::mt19937 gen(rd());
        std::shuffle(intervals.begin(), intervals.end(), gen);

        std::vector<std::vector<int>> result;
        TIME_FUNCTION(result = ArrayManipulator::mergeIntervals_sortAndMerge(intervals), "Sort and Merge (O(N log N))");
        std::cout << std::endl;
    }
}

void benchmarkTrappingRainWater() {
    std::cout << "\n--- Benchmarking Trapping Rain Water ---\n";
    std::vector<int> sizes = {10000, 100000, 1000000}; // 1M

    for (int size : sizes) {
        std::cout << "Input size: " << size << std::endl;
        std::vector<int> height = generateRandomVector(size, 0, 100); // Heights between 0 and 100

        // Benchmarking Brute Force
        if (size <= 10000) { // Limit brute force for very large inputs
            int water_brute;
            TIME_FUNCTION(water_brute = ArrayManipulator::trapRainWater_bruteForce(height), "Brute Force (O(N^2))");
        } else {
            std::cout << "  Brute Force (O(N^2)): Skipped for large size " << size << "\n";
        }

        // Benchmarking Precompute Max Heights
        int water_precompute;
        TIME_FUNCTION(water_precompute = ArrayManipulator::trapRainWater_precomputeMax(height), "Precompute Max (O(N))");

        // Benchmarking Two-Pointer
        int water_two_pointer;
        TIME_FUNCTION(water_two_pointer = ArrayManipulator::trapRainWater_twoPointer(height), "Two-Pointer (O(N))");
        std::cout << std::endl;
    }
}

int main() {
    std::cout << "Running benchmarks...\n";

    benchmarkTwoSum();
    benchmarkRotateArray();
    benchmarkMergeIntervals();
    benchmarkTrappingRainWater();

    std::cout << "\nAll benchmarks complete.\n";

    return 0;
}
```