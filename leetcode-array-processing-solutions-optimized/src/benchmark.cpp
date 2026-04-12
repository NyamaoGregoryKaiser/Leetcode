```cpp
#include "main_algorithms.cpp" // Include main algorithms
#include "brute_force_solutions.cpp" // Include brute force solutions
#include "utils.h" // For utility functions
#include <iostream>
#include <chrono>
#include <functional>
#include <random>

// Macro for benchmarking functions
#define BENCHMARK_FN(name, func, ...) \
    do { \
        auto start = std::chrono::high_resolution_clock::now(); \
        func(__VA_ARGS__); \
        auto end = std::chrono::high_resolution_clock::now(); \
        std::chrono::duration<double, std::milli> duration = end - start; \
        std::cout << #name << ": " << duration.count() << " ms" << std::endl; \
    } while (0)

// Helper function to run and print benchmark results
template <typename Func, typename... Args>
void run_benchmark(const std::string& description, Func func, Args&&... args) {
    std::cout << "  " << description << ": ";
    auto start = std::chrono::high_resolution_clock::now();
    func(std::forward<Args>(args)...);
    auto end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double, std::milli> duration = end - start;
    std::cout << duration.count() << " ms" << std::endl;
}

int main() {
    std::cout << "--- Array Manipulation Benchmarks ---" << std::endl;

    // --- Problem 1: Maximum Subarray Sum ---
    std::cout << "\nProblem 1: Maximum Subarray Sum" << std::endl;
    int array_sizes[] = {1000, 10000, 100000, 1000000}; // Various sizes

    for (int size : array_sizes) {
        std::cout << "\nArray Size: " << size << std::endl;
        std::vector<int> nums_original = Utils::generateRandomVector(size, -100, 100);

        // Kadane's Algorithm
        std::vector<int> nums_kadane = nums_original; // copy for each run
        run_benchmark("Kadane's Algorithm",
                      [&]() { ArrayManipulation::MaxSubarraySum::kadanesAlgorithm(nums_kadane); });

        // Brute Force
        std::vector<int> nums_brute = nums_original;
        // Brute force is too slow for large inputs, only run for smaller sizes
        if (size <= 10000) {
            run_benchmark("Brute Force",
                          [&]() { ArrayManipulation::MaxSubarraySum::bruteForce(nums_brute); });
        } else {
            std::cout << "  Brute Force: Skipped for large size " << size << " (too slow)" << std::endl;
        }
    }

    // --- Problem 2: Product of Array Except Self ---
    std::cout << "\nProblem 2: Product of Array Except Self" << std::endl;
    for (int size : array_sizes) {
        std::cout << "\nArray Size: " << size << std::endl;
        std::vector<int> nums_original = Utils::generateRandomVector(size, 1, 10); // Use positive to avoid products of 0 easily

        // Optimal Two Pass
        std::vector<int> nums_prod_optimal = nums_original;
        run_benchmark("Optimal (Two Pass)",
                      [&]() { ArrayManipulation::ProductExceptSelf::productExceptSelfOptimal(nums_prod_optimal); });

        // Brute Force
        std::vector<int> nums_prod_brute = nums_original;
        if (size <= 10000) {
            run_benchmark("Brute Force",
                          [&]() { ArrayManipulation::ProductExceptSelf::bruteForce(nums_prod_brute); });
        } else {
            std::cout << "  Brute Force: Skipped for large size " << size << " (too slow)" << std::endl;
        }
    }

    // --- Problem 3: Trapping Rain Water ---
    std::cout << "\nProblem 3: Trapping Rain Water" << std::endl;
    for (int size : array_sizes) {
        std::cout << "\nArray Size: " << size << std::endl;
        std::vector<int> heights_original = Utils::generateRandomVector(size, 0, 100);

        // Two Pointers
        std::vector<int> heights_tp = heights_original;
        run_benchmark("Two Pointers (Optimal)",
                      [&]() { ArrayManipulation::TrappingRainWater::trapRainWaterTwoPointers(heights_tp); });

        // Monotonic Stack
        std::vector<int> heights_stack = heights_original;
        run_benchmark("Monotonic Stack",
                      [&]() { ArrayManipulation::TrappingRainWater::trapRainWaterStack(heights_stack); });

        // Dynamic Programming
        std::vector<int> heights_dp = heights_original;
        run_benchmark("DP Solution",
                      [&]() { ArrayManipulation::TrappingRainWater::dpSolution(heights_dp); });

        // Brute Force
        std::vector<int> heights_brute = heights_original;
        if (size <= 1000) { // Brute force very slow for large sizes
            run_benchmark("Brute Force",
                          [&]() { ArrayManipulation::TrappingRainWater::bruteForce(heights_brute); });
        } else {
            std::cout << "  Brute Force: Skipped for large size " << size << " (too slow)" << std::endl;
        }
    }

    // --- Problem 4: Rotate Array ---
    std::cout << "\nProblem 4: Rotate Array" << std::endl;
    for (int size : array_sizes) {
        std::cout << "\nArray Size: " << size << std::endl;
        int k = size / 3; // Rotate by approximately 1/3 of the array length

        // Reversal Method (Optimal)
        std::vector<int> nums_rotate_reversal = Utils::generateRandomVector(size, 0, 100);
        run_benchmark("Reversal Method (Optimal)",
                      [&]() { ArrayManipulation::RotateArray::rotateReversal(nums_rotate_reversal, k); });

        // Temporary Array Method
        std::vector<int> nums_rotate_temp = Utils::generateRandomVector(size, 0, 100);
        run_benchmark("Temporary Array Method",
                      [&]() { ArrayManipulation::RotateArray::rotateTempArray(nums_rotate_temp, k); });

        // Naive (K single rotations)
        std::vector<int> nums_rotate_naive = Utils::generateRandomVector(size, 0, 100);
        if (size <= 1000 && k <= 1000) { // Naive is O(N*k) so k must also be small
             run_benchmark("Naive (K single rotations)",
                           [&]() { ArrayManipulation::RotateArray::rotateNaive(nums_rotate_naive, k); });
        } else {
            std::cout << "  Naive (K single rotations): Skipped for large size or k " << size << "/" << k << " (too slow)" << std::endl;
        }
    }

    // --- Problem 5: Merge Sorted Arrays ---
    std::cout << "\nProblem 5: Merge Sorted Arrays" << std::endl;
    for (int size : array_sizes) {
        std::cout << "\nArray Size (m+n): " << size << std::endl;
        int m = size / 2;
        int n = size - m;

        // Generate two sorted halves
        std::vector<int> part1 = Utils::generateRandomVector(m, 0, 500);
        std::sort(part1.begin(), part1.end());
        std::vector<int> part2 = Utils::generateRandomVector(n, 0, 500);
        std::sort(part2.begin(), part2.end());

        // Optimal (Two Pointers from end)
        std::vector<int> nums1_optimal(size);
        std::copy(part1.begin(), part1.end(), nums1_optimal.begin());
        run_benchmark("Optimal (Two Pointers from End)",
                      [&]() { ArrayManipulation::MergeSortedArrays::mergeOptimal(nums1_optimal, m, part2, n); });

        // Auxiliary Array Method
        std::vector<int> nums1_aux(size);
        std::copy(part1.begin(), part1.end(), nums1_aux.begin());
        run_benchmark("Auxiliary Array Method",
                      [&]() { ArrayManipulation::MergeSortedArrays::mergeAuxiliaryArray(nums1_aux, m, part2, n); });

        // Using std::sort
        std::vector<int> nums1_sort(size);
        std::copy(part1.begin(), part1.end(), nums1_sort.begin());
        run_benchmark("Using std::sort",
                      [&]() { ArrayManipulation::MergeSortedArrays::mergeUsingSort(nums1_sort, m, part2, n); });
    }

    std::cout << "\n--- Benchmarks Complete ---" << std::endl;
    return 0;
}
```