#include "utils.h" // For printVector, generateRandomSortedVector
#include <vector>
#include <iostream>
#include <algorithm> // For std::find
#include <chrono>    // For performance measurement

// Brute Force for Problem 1: Linear Search
// ====================================================================================================

/**
 * @brief Performs a linear search to find an element in a vector.
 * @param arr The vector of integers to search within.
 * @param target The integer value to search for.
 * @return The index of the target element if found, otherwise -1.
 * @complexity Time: O(N) - In the worst case, iterates through all N elements.
 *             Space: O(1) - Uses a constant amount of extra space.
 */
int linearSearch(const std::vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); ++i) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1; // Target not found
}

// Optimized for Problem 1: Binary Search (from main_algorithms.cpp)
// We'll declare it here and assume it's linked from main_algorithms.cpp
// or copy its definition if compiling this file standalone.
// For project structure, it's better to declare here and define in main_algorithms.cpp or in a common header.
// For this example, let's redeclare as extern.
extern int binarySearchIterative(const std::vector<int>& arr, int target);

// Brute Force for Problem 4: Linear Scan for Minimum in Rotated Sorted Array
// ====================================================================================================

/**
 * @brief Finds the minimum element in a rotated sorted array using linear scan.
 * @param arr The rotated sorted vector of integers.
 * @return The minimum element in the array. Assumes array is non-empty.
 * @complexity Time: O(N) - Iterates through all N elements.
 *             Space: O(1) - Uses a constant amount of extra space.
 */
int findMinInRotatedSortedArray_Linear(const std::vector<int>& arr) {
    if (arr.empty()) {
        std::cerr << "Error: findMinInRotatedSortedArray_Linear called with empty array." << std::endl;
        return -1;
    }
    int min_val = arr[0];
    for (size_t i = 1; i < arr.size(); ++i) {
        if (arr[i] < min_val) {
            min_val = arr[i];
        }
    }
    return min_val;
}

// Optimized for Problem 4: Binary Search for Minimum (from main_algorithms.cpp)
extern int findMinInRotatedSortedArray_V2(const std::vector<int>& arr);


// Brute Force for Problem 5: Linear Scan for Square Root
// ====================================================================================================

/**
 * @brief Computes the integer square root of a non-negative integer x using linear scan.
 * @param x The non-negative integer for which to compute the square root.
 * @return The integer part of the square root of x.
 * @complexity Time: O(sqrt(X)) - Iterates up to sqrt(X) times.
 *             Space: O(1)
 */
int mySqrt_Linear(int x) {
    if (x < 0) {
        std::cerr << "Error: mySqrt_Linear called with negative input." << std::endl;
        return -1;
    }
    if (x == 0 || x == 1) {
        return x;
    }

    for (long long i = 1; i <= x; ++i) { // i can go up to x, so i*i needs long long
        if (i * i > x) {
            return i - 1; // i is too large, so i-1 is the integer square root
        }
    }
    return 1; // Should only be reached if x=1 (handled) or for very specific edge cases.
              // More robust: consider x = MAX_INT, then i*i might overflow even long long if i > sqrt(MAX_INT).
              // Max i is about 46340, i*i is within long long.
              // A safer loop condition would be i <= x / i.
}

// Corrected linear sqrt with safer loop condition
int mySqrt_Linear_V2(int x) {
    if (x < 0) {
        std::cerr << "Error: mySqrt_Linear_V2 called with negative input." << std::endl;
        return -1;
    }
    if (x == 0 || x == 1) {
        return x;
    }

    int ans = 1; // Smallest possible sqrt for x >= 1
    for (long long i = 1; i * i <= x; ++i) {
        ans = i;
    }
    return ans;
}

// Optimized for Problem 5: Binary Search for Square Root (from main_algorithms.cpp)
extern int mySqrt(int x);


// Function to run demonstrations for brute force vs. optimized
void runBruteForceVsOptimizedDemo() {
    std::cout << "=== Running Brute Force vs. Optimized Demo ===" << std::endl;

    // --- Problem 1 Comparison: Linear Search vs. Binary Search ---
    std::cout << "\n--- Problem 1 Comparison: Linear Search vs. Binary Search ---" << std::endl;
    std::vector<int> arr1 = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};
    printVector(arr1, "Array: ");
    int target1_found = 17;
    int target1_not_found = 8;

    std::cout << "Target " << target1_found << " (Linear): " << linearSearch(arr1, target1_found) << std::endl;
    std::cout << "Target " << target1_found << " (Binary): " << binarySearchIterative(arr1, target1_found) << std::endl;
    std::cout << "Target " << target1_not_found << " (Linear): " << linearSearch(arr1, target1_not_found) << std::endl;
    std::cout << "Target " << target1_not_found << " (Binary): " << binarySearchIterative(arr1, target1_not_found) << std::endl;

    // --- Problem 4 Comparison: Linear Scan vs. Binary Search for Min ---
    std::cout << "\n--- Problem 4 Comparison: Linear Scan vs. Binary Search for Min ---" << std::endl;
    std::vector<int> arr4_1 = {4, 5, 6, 7, 0, 1, 2};
    std::vector<int> arr4_2 = {3, 1, 2};
    std::vector<int> arr4_3 = {1, 2, 3};

    printVector(arr4_1, "Rotated Array 1: ");
    std::cout << "Min (Linear): " << findMinInRotatedSortedArray_Linear(arr4_1) << std::endl;
    std::cout << "Min (Binary): " << findMinInRotatedSortedArray_V2(arr4_1) << std::endl;

    printVector(arr4_2, "Rotated Array 2: ");
    std::cout << "Min (Linear): " << findMinInRotatedSortedArray_Linear(arr4_2) << std::endl;
    std::cout << "Min (Binary): " << findMinInRotatedSortedArray_V2(arr4_2) << std::endl;

    printVector(arr4_3, "Sorted Array 3: ");
    std::cout << "Min (Linear): " << findMinInRotatedSortedArray_Linear(arr4_3) << std::endl;
    std::cout << "Min (Binary): " << findMinInRotatedSortedArray_V2(arr4_3) << std::endl;

    // --- Problem 5 Comparison: Linear Scan vs. Binary Search for Square Root ---
    std::cout << "\n--- Problem 5 Comparison: Linear Scan vs. Binary Search for Square Root ---" << std::endl;
    int x1 = 4;
    int x2 = 8;
    int x3 = 100;
    int x4 = 2147395600;

    std::cout << "sqrt(" << x1 << ") (Linear): " << mySqrt_Linear_V2(x1) << std::endl;
    std::cout << "sqrt(" << x1 << ") (Binary): " << mySqrt(x1) << std::endl;

    std::cout << "sqrt(" << x2 << ") (Linear): " << mySqrt_Linear_V2(x2) << std::endl;
    std::cout << "sqrt(" << x2 << ") (Binary): " << mySqrt(x2) << std::endl;

    std::cout << "sqrt(" << x3 << ") (Linear): " << mySqrt_Linear_V2(x3) << std::endl;
    std::cout << "sqrt(" << x3 << ") (Binary): " << mySqrt(x3) << std::endl;

    // Note: for very large X, linear approach might be too slow to observe directly in a demo
    std::cout << "sqrt(" << x4 << ") (Linear): " << mySqrt_Linear_V2(x4) << std::endl;
    std::cout << "sqrt(" << x4 << ") (Binary): " << mySqrt(x4) << std::endl;


    std::cout << "\n=== End Brute Force vs. Optimized Demo ===" << std::endl;
}