#include "utils.h" // For printVector, generateRandomSortedVector, etc.
#include <vector>
#include <iostream>
#include <algorithm> // For std::lower_bound, std::upper_bound (for verification)

// ====================================================================================================
// Problem 1: Classic Binary Search
// Find a target element in a sorted array.
// ====================================================================================================

/**
 * @brief Performs an iterative binary search to find an element in a sorted vector.
 * @param arr The sorted vector of integers to search within.
 * @param target The integer value to search for.
 * @return The index of the target element if found, otherwise -1.
 * @complexity Time: O(log N) - Each step halves the search space.
 *             Space: O(1) - Uses a constant amount of extra space.
 */
int binarySearchIterative(const std::vector<int>& arr, int target) {
    int low = 0;
    int high = arr.size() - 1;

    while (low <= high) {
        // Calculate mid to prevent potential integer overflow:
        // (low + high) / 2 could overflow if low and high are very large.
        // low + (high - low) / 2 is safer.
        int mid = low + (high - low) / 2;

        if (arr[mid] == target) {
            return mid; // Target found
        } else if (arr[mid] < target) {
            low = mid + 1; // Target is in the right half
        } else { // arr[mid] > target
            high = mid - 1; // Target is in the left half
        }
    }

    return -1; // Target not found
}

/**
 * @brief Performs a recursive binary search to find an element in a sorted vector.
 * @param arr The sorted vector of integers to search within.
 * @param target The integer value to search for.
 * @param low The starting index of the current search space.
 * @param high The ending index of the current search space.
 * @return The index of the target element if found, otherwise -1.
 * @complexity Time: O(log N) - Each recursive call halves the search space.
 *             Space: O(log N) - Due to recursive call stack depth.
 */
int binarySearchRecursive(const std::vector<int>& arr, int target, int low, int high) {
    if (low > high) {
        return -1; // Base case: Search space is empty, target not found
    }

    int mid = low + (high - low) / 2;

    if (arr[mid] == target) {
        return mid; // Target found
    } else if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, high); // Search right half
    } else { // arr[mid] > target
        return binarySearchRecursive(arr, target, low, mid - 1); // Search left half
    }
}

// Wrapper for recursive binary search for cleaner external call
int binarySearchRecursiveWrapper(const std::vector<int>& arr, int target) {
    if (arr.empty()) return -1;
    return binarySearchRecursive(arr, target, 0, arr.size() - 1);
}

// ====================================================================================================
// Problem 2: Find First and Last Occurrence of an Element
// Find the index of the first and last occurrence of a target in a sorted array with duplicates.
// ====================================================================================================

/**
 * @brief Finds the index of the first occurrence of a target element in a sorted vector.
 *        This is akin to std::lower_bound.
 * @param arr The sorted vector of integers to search within.
 * @param target The integer value to search for.
 * @return The index of the first occurrence of the target, or -1 if not found.
 * @complexity Time: O(log N)
 *             Space: O(1)
 */
int findFirstOccurrence(const std::vector<int>& arr, int target) {
    int low = 0;
    int high = arr.size() - 1;
    int result = -1; // Stores the potential first occurrence index

    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) {
            result = mid;      // Found a potential first occurrence
            high = mid - 1;    // Try to find an earlier occurrence in the left half
        } else if (arr[mid] < target) {
            low = mid + 1;     // Target is in the right half
        } else { // arr[mid] > target
            high = mid - 1;    // Target is in the left half
        }
    }
    return result;
}

/**
 * @brief Finds the index of the last occurrence of a target element in a sorted vector.
 *        This is akin to std::upper_bound minus 1 (if target found).
 * @param arr The sorted vector of integers to search within.
 * @param target The integer value to search for.
 * @return The index of the last occurrence of the target, or -1 if not found.
 * @complexity Time: O(log N)
 *             Space: O(1)
 */
int findLastOccurrence(const std::vector<int>& arr, int target) {
    int low = 0;
    int high = arr.size() - 1;
    int result = -1; // Stores the potential last occurrence index

    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) {
            result = mid;     // Found a potential last occurrence
            low = mid + 1;    // Try to find a later occurrence in the right half
        } else if (arr[mid] < target) {
            low = mid + 1;    // Target is in the right half
        } else { // arr[mid] > target
            high = mid - 1;   // Target is in the left half
        }
    }
    return result;
}

// ====================================================================================================
// Problem 3: Search in Rotated Sorted Array
// Search for a target in a sorted array that has been rotated at an unknown pivot.
// e.g., [4,5,6,7,0,1,2] - originally [0,1,2,4,5,6,7]
// ====================================================================================================

/**
 * @brief Searches for a target value in a rotated sorted array.
 * @param arr The rotated sorted vector of integers.
 * @param target The integer value to search for.
 * @return The index of the target element if found, otherwise -1.
 * @complexity Time: O(log N)
 *             Space: O(1)
 */
int searchInRotatedSortedArray(const std::vector<int>& arr, int target) {
    if (arr.empty()) return -1;

    int low = 0;
    int high = arr.size() - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;

        if (arr[mid] == target) {
            return mid;
        }

        // Determine which half is sorted
        if (arr[low] <= arr[mid]) { // Left half is sorted
            if (target >= arr[low] && target < arr[mid]) {
                high = mid - 1; // Target is in the sorted left half
            } else {
                low = mid + 1;  // Target is in the unsorted right half
            }
        } else { // Right half is sorted (arr[mid] < arr[low])
            if (target > arr[mid] && target <= arr[high]) {
                low = mid + 1;  // Target is in the sorted right half
            } else {
                high = mid - 1; // Target is in the unsorted left half
            }
        }
    }

    return -1; // Target not found
}

// ====================================================================================================
// Problem 4: Find Minimum in Rotated Sorted Array
// Find the minimum element in a rotated sorted array.
// ====================================================================================================

/**
 * @brief Finds the minimum element in a rotated sorted array.
 * @param arr The rotated sorted vector of integers.
 * @return The minimum element in the array. Assumes array is non-empty.
 * @complexity Time: O(log N)
 *             Space: O(1)
 */
int findMinInRotatedSortedArray(const std::vector<int>& arr) {
    if (arr.empty()) {
        // Handle error or define behavior for empty array.
        // For interview, clarify this edge case. Here, let's return -1 or throw.
        std::cerr << "Error: findMinInRotatedSortedArray called with empty array." << std::endl;
        return -1; // Or throw std::runtime_error("Empty array");
    }
    if (arr.size() == 1) {
        return arr[0];
    }

    int low = 0;
    int high = arr.size() - 1;

    // If the array is not rotated (or rotated n times), the first element is the minimum.
    // This also means arr[low] <= arr[high]
    if (arr[low] <= arr[high]) {
        return arr[low];
    }

    while (low <= high) {
        int mid = low + (high - low) / 2;

        // Check if mid is the pivot point (minimum element)
        // condition 1: arr[mid] is smaller than its previous element (arr[mid-1])
        if (mid > 0 && arr[mid] < arr[mid - 1]) {
            return arr[mid];
        }
        // condition 2: arr[mid+1] is smaller than arr[mid]
        // (This would mean arr[mid+1] is the minimum, and mid is the largest in first sorted part)
        if (mid < arr.size() - 1 && arr[mid + 1] < arr[mid]) {
            return arr[mid + 1];
        }

        // Decide whether to go left or right
        if (arr[low] <= arr[mid]) {
            // Left half is sorted. Minimum must be in the unsorted right half.
            low = mid + 1;
        } else { // arr[mid] < arr[low]
            // Right half is sorted. Minimum must be in the left half (including mid).
            // It means pivot is in the left half.
            high = mid - 1;
        }
    }
    return -1; // Should not reach here for a valid rotated sorted array
}

// A more streamlined approach for findMinInRotatedSortedArray
// This approach focuses on narrowing down the search space to the unsorted part
// where the minimum must reside.
int findMinInRotatedSortedArray_V2(const std::vector<int>& arr) {
    if (arr.empty()) {
        std::cerr << "Error: findMinInRotatedSortedArray_V2 called with empty array." << std::endl;
        return -1;
    }

    int low = 0;
    int high = arr.size() - 1;
    int min_val = arr[0]; // Initialize with first element, which is a potential min.

    while (low <= high) {
        // If this segment is sorted, its first element is the minimum in this segment
        // and thus a candidate for the global minimum.
        if (arr[low] <= arr[high]) {
            min_val = std::min(min_val, arr[low]);
            break; // The entire segment is sorted, we found the min.
        }

        int mid = low + (high - low) / 2;
        min_val = std::min(min_val, arr[mid]); // mid is always a potential minimum

        if (arr[low] <= arr[mid]) {
            // Left half is sorted. The pivot (minimum) must be in the right half.
            // So we can discard the left half.
            low = mid + 1;
        } else {
            // Right half is sorted. The pivot (minimum) must be in the left half (including mid).
            // So we can discard the right half.
            high = mid - 1;
        }
    }
    return min_val;
}


// ====================================================================================================
// Problem 5: Square Root (Integer) using Binary Search
// Find the integer square root of a non-negative integer x.
// Return only the integer part. (e.g., sqrt(8) = 2, sqrt(4) = 2)
// This is an example of "Binary Search on the Answer".
// The search space is not the array elements, but the possible values of the square root itself.
// ====================================================================================================

/**
 * @brief Computes the integer square root of a non-negative integer x using binary search.
 * @param x The non-negative integer for which to compute the square root.
 * @return The integer part of the square root of x.
 * @complexity Time: O(log X) - Search space is from 0 to X.
 *             Space: O(1)
 */
int mySqrt(int x) {
    if (x < 0) {
        std::cerr << "Error: mySqrt called with negative input." << std::endl;
        return -1; // Or throw std::invalid_argument("Input must be non-negative");
    }
    if (x == 0 || x == 1) {
        return x;
    }

    int low = 1;
    int high = x; // The square root of x cannot be greater than x itself (for x >= 1)
    int ans = 0;  // Stores the largest 'mid' whose square is <= x

    while (low <= high) {
        // Using long long for mid*mid to prevent overflow, as x can be up to 2^31 - 1
        // and mid can be up to 2^31 - 1. (mid*mid could exceed int max)
        long long mid = low + (high - low) / 2;
        long long mid_squared = mid * mid;

        if (mid_squared == x) {
            return mid; // Exact square root found
        } else if (mid_squared < x) {
            ans = mid;         // mid is a potential answer, but try a larger value
            low = mid + 1;
        } else { // mid_squared > x
            high = mid - 1;    // mid is too large, search in the lower half
        }
    }
    return ans; // 'ans' will hold the largest integer whose square is less than or equal to x
}

// Function to demonstrate all algorithms
void runAllMainAlgorithmsDemo() {
    std::cout << "=== Running Main Algorithms Demo ===" << std::endl;

    // --- Problem 1: Classic Binary Search ---
    std::cout << "\n--- Problem 1: Classic Binary Search ---" << std::endl;
    std::vector<int> arr1 = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};
    printVector(arr1, "Array: ");
    int target1_found = 7;
    int target1_not_found = 10;

    std::cout << "Target " << target1_found << " (Iterative): " << binarySearchIterative(arr1, target1_found) << std::endl;
    std::cout << "Target " << target1_not_found << " (Iterative): " << binarySearchIterative(arr1, target1_not_found) << std::endl;
    std::cout << "Target " << target1_found << " (Recursive): " << binarySearchRecursiveWrapper(arr1, target1_found) << std::endl;
    std::cout << "Target " << target1_not_found << " (Recursive): " << binarySearchRecursiveWrapper(arr1, target1_not_found) << std::endl;

    // --- Problem 2: Find First/Last Occurrence ---
    std::cout << "\n--- Problem 2: Find First/Last Occurrence ---" << std::endl;
    std::vector<int> arr2 = {1, 2, 3, 3, 3, 4, 5, 5, 6};
    printVector(arr2, "Array with duplicates: ");
    int target2_dup = 3;
    int target2_single = 5;
    int target2_not_found = 7;

    std::cout << "Target " << target2_dup << " -> First: " << findFirstOccurrence(arr2, target2_dup)
              << ", Last: " << findLastOccurrence(arr2, target2_dup) << std::endl;
    std::cout << "Target " << target2_single << " -> First: " << findFirstOccurrence(arr2, target2_single)
              << ", Last: " << findLastOccurrence(arr2, target2_single) << std::endl;
    std::cout << "Target " << target2_not_found << " -> First: " << findFirstOccurrence(arr2, target2_not_found)
              << ", Last: " << findLastOccurrence(arr2, target2_not_found) << std::endl;

    // --- Problem 3: Search in Rotated Sorted Array ---
    std::cout << "\n--- Problem 3: Search in Rotated Sorted Array ---" << std::endl;
    std::vector<int> arr3 = {4, 5, 6, 7, 0, 1, 2};
    printVector(arr3, "Rotated Array: ");
    int target3_found1 = 0;
    int target3_found2 = 5;
    int target3_not_found = 3;

    std::cout << "Target " << target3_found1 << ": " << searchInRotatedSortedArray(arr3, target3_found1) << std::endl;
    std::cout << "Target " << target3_found2 << ": " << searchInRotatedSortedArray(arr3, target3_found2) << std::endl;
    std::cout << "Target " << target3_not_found << ": " << searchInRotatedSortedArray(arr3, target3_not_found) << std::endl;

    // --- Problem 4: Find Minimum in Rotated Sorted Array ---
    std::cout << "\n--- Problem 4: Find Minimum in Rotated Sorted Array ---" << std::endl;
    std::vector<int> arr4_1 = {4, 5, 6, 7, 0, 1, 2}; // Min is 0
    std::vector<int> arr4_2 = {3, 1, 2};             // Min is 1
    std::vector<int> arr4_3 = {1, 2, 3};             // Not rotated, min is 1
    std::vector<int> arr4_4 = {2, 1};                // Two elements, min is 1

    printVector(arr4_1, "Array 1: ");
    std::cout << "Min (V1): " << findMinInRotatedSortedArray(arr4_1) << std::endl;
    std::cout << "Min (V2): " << findMinInRotatedSortedArray_V2(arr4_1) << std::endl;
    printVector(arr4_2, "Array 2: ");
    std::cout << "Min (V1): " << findMinInRotatedSortedArray(arr4_2) << std::endl;
    std::cout << "Min (V2): " << findMinInRotatedSortedArray_V2(arr4_2) << std::endl;
    printVector(arr4_3, "Array 3: ");
    std::cout << "Min (V1): " << findMinInRotatedSortedArray(arr4_3) << std::endl;
    std::cout << "Min (V2): " << findMinInRotatedSortedArray_V2(arr4_3) << std::endl;
    printVector(arr4_4, "Array 4: ");
    std::cout << "Min (V1): " << findMinInRotatedSortedArray(arr4_4) << std::endl;
    std::cout << "Min (V2): " << findMinInRotatedSortedArray_V2(arr4_4) << std::endl;


    // --- Problem 5: Square Root (Integer) ---
    std::cout << "\n--- Problem 5: Square Root (Integer) ---" << std::endl;
    int x1 = 4;
    int x2 = 8;
    int x3 = 0;
    int x4 = 2147395600; // Large number, max int is 2147483647

    std::cout << "sqrt(" << x1 << ") = " << mySqrt(x1) << std::endl; // Expected: 2
    std::cout << "sqrt(" << x2 << ") = " << mySqrt(x2) << std::endl; // Expected: 2
    std::cout << "sqrt(" << x3 << ") = " << mySqrt(x3) << std::endl; // Expected: 0
    std::cout << "sqrt(" << x4 << ") = " << mySqrt(x4) << std::endl; // Expected: 46340 (sqrt(2147395600) is approx 46340.95)

    std::cout << "\n=== End Main Algorithms Demo ===" << std::endl;
}

// If this file is compiled and run directly for quick testing
// int main() {
//     runAllMainAlgorithmsDemo();
//     return 0;
// }