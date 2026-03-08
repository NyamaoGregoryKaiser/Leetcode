#include "timer.h"
#include "binary_search_problems.h"
#include "brute_force_solutions.h"
#include <vector>
#include <algorithm> // For std::sort, std::iota
#include <random>    // For std::mt19937, std::shuffle
#include <iostream>
#include <numeric>   // For std::iota

// Helper to generate large sorted vector
std::vector<int> generate_sorted_vector(int size) {
    std::vector<int> vec(size);
    std::iota(vec.begin(), vec.end(), 0); // Fills with 0, 1, 2, ...
    return vec;
}

// Helper to generate large rotated sorted vector
std::vector<int> generate_rotated_vector(int size, int pivot_index) {
    std::vector<int> vec(size);
    std::iota(vec.begin(), vec.end(), 0);
    std::rotate(vec.begin(), vec.begin() + pivot_index, vec.end());
    return vec;
}

// Helper to generate large vector with duplicates
std::vector<int> generate_duplicates_vector(int size, int num_unique) {
    std::vector<int> vec(size);
    for (int i = 0; i < size; ++i) {
        vec[i] = i % num_unique; // Create duplicates
    }
    std::sort(vec.begin(), vec.end()); // Ensure it's sorted
    return vec;
}

void benchmark_standard_search(int size, int target_present, int target_absent) {
    std::vector<int> nums = generate_sorted_vector(size);

    std::cout << "\n--- Benchmarking Standard Search (Size: " << size << ") ---" << std::endl;

    Timer timer;

    // Binary Search Iterative (Present)
    timer.reset();
    BinarySearch::searchIterative(nums, target_present);
    timer.print_elapsed("BS_Iterative (Present)");

    // Binary Search Iterative (Absent)
    timer.reset();
    BinarySearch::searchIterative(nums, target_absent);
    timer.print_elapsed("BS_Iterative (Absent)");

    // Binary Search Recursive (Present)
    timer.reset();
    BinarySearch::searchRecursive(nums, target_present);
    timer.print_elapsed("BS_Recursive (Present)");

    // Brute Force Linear Search (Present)
    timer.reset();
    BruteForce::linearSearch(nums, target_present);
    timer.print_elapsed("BruteForce_Linear (Present)");

    // Brute Force Linear Search (Absent - worst case)
    timer.reset();
    BruteForce::linearSearch(nums, target_absent);
    timer.print_elapsed("BruteForce_Linear (Absent)");
}

void benchmark_first_last_occurrence(int size, int target_with_dups, int target_no_dups) {
    std::vector<int> nums = generate_duplicates_vector(size, size / 10); // E.g., 10 distinct values repeating

    std::cout << "\n--- Benchmarking First/Last Occurrence (Size: " << size << ") ---" << std::endl;

    Timer timer;

    timer.reset();
    BinarySearch::findFirstOccurrence(nums, target_with_dups);
    timer.print_elapsed("FindFirstOccurrence (Dups)");

    timer.reset();
    BinarySearch::findLastOccurrence(nums, target_with_dups);
    timer.print_elapsed("FindLastOccurrence (Dups)");

    timer.reset();
    BinarySearch::findFirstOccurrence(nums, target_no_dups);
    timer.print_elapsed("FindFirstOccurrence (No Dups)");

    timer.reset();
    BinarySearch::findLastOccurrence(nums, target_no_dups);
    timer.print_elapsed("FindLastOccurrence (No Dups)");
}

void benchmark_rotated_search(int size, int target_present, int target_absent) {
    // Pivot at roughly mid to ensure significant rotation
    std::vector<int> nums = generate_rotated_vector(size, size / 2);

    std::cout << "\n--- Benchmarking Rotated Sorted Array Search (Size: " << size << ") ---" << std::endl;

    Timer timer;

    // Binary Search Rotated (Present)
    timer.reset();
    BinarySearch::searchRotatedSortedArray(nums, target_present);
    timer.print_elapsed("BS_Rotated (Present)");

    // Binary Search Rotated (Absent)
    timer.reset();
    BinarySearch::searchRotatedSortedArray(nums, target_absent);
    timer.print_elapsed("BS_Rotated (Absent)");

    // Brute Force Linear Search (Present)
    timer.reset();
    BruteForce::linearSearchRotated(nums, target_present);
    timer.print_elapsed("BruteForce_Rotated (Present)");

    // Brute Force Linear Search (Absent)
    timer.reset();
    BruteForce::linearSearchRotated(nums, target_absent);
    timer.print_elapsed("BruteForce_Rotated (Absent)");
}

void benchmark_mysqrt(int x_large) {
    std::cout << "\n--- Benchmarking mySqrt (Input: " << x_large << ") ---" << std::endl;

    Timer timer;

    // Binary Search mySqrt
    timer.reset();
    BinarySearch::mySqrt(x_large);
    timer.print_elapsed("BS_mySqrt");

    // Brute Force mySqrtLinear
    timer.reset();
    BruteForce::mySqrtLinear(x_large);
    timer.print_elapsed("BruteForce_mySqrtLinear");
}

void benchmark_kth_smallest(int size1, int size2, int k_mid) {
    std::vector<int> nums1 = generate_sorted_vector(size1);
    // Add an offset to nums2 to ensure distinct values if needed, but not strictly required for sorting
    std::vector<int> nums2(size2);
    std::iota(nums2.begin(), nums2.end(), size1 / 2); // Start from a value that overlaps

    std::cout << "\n--- Benchmarking Kth Smallest in Two Sorted Arrays (Size1: " << size1 << ", Size2: " << size2 << ", k: " << k_mid << ") ---" << std::endl;

    Timer timer;

    // Binary Search Kth Smallest
    timer.reset();
    BinarySearch::findKthSmallestInTwoSortedArrays(nums1, nums2, k_mid);
    timer.print_elapsed("BS_KthSmallest");

    // Brute Force Merge and Find
    timer.reset();
    BruteForce::findKthSmallestInTwoSortedArraysMerge(nums1, nums2, k_mid);
    timer.print_elapsed("BruteForce_KthSmallestMerge");
}

int main() {
    std::cout << "Starting Binary Search Benchmarks...\n" << std::endl;

    int large_size = 1000000; // 1 million elements
    int medium_size = 100000; // 100 thousand elements
    int small_size = 10000;   // 10 thousand elements

    // Standard Search
    benchmark_standard_search(large_size, large_size / 4, large_size + 1);

    // First/Last Occurrence (use a smaller size as duplicates might make generation complex for huge arrays)
    benchmark_first_last_occurrence(medium_size, medium_size / 20, medium_size + 1);

    // Rotated Sorted Array Search
    benchmark_rotated_search(large_size, large_size / 4, large_size + 1);

    // mySqrt (using INT_MAX)
    benchmark_mysqrt(2147483647); // INT_MAX

    // Kth Smallest in Two Sorted Arrays
    benchmark_kth_smallest(medium_size, medium_size, medium_size + medium_size / 2); // k = total_size / 2

    std::cout << "\nBinary Search Benchmarks Finished." << std::endl;

    return 0;
}
---