```cpp
#include <iostream>
#include <vector>
#include <chrono>
#include <functional> // For std::function
#include <numeric> // For std::iota
#include "array_manipulator.hpp"
#include "test_utils.hpp" // For utility functions like generateRandomVector

// Helper function to measure execution time
template <typename Func>
long long measureTime(Func func) {
    auto start = std::chrono::high_resolution_clock::now();
    func();
    auto end = std::chrono::high_resolution_clock::now();
    return std::chrono::duration_cast<std::chrono::microseconds>(end - start).count();
}

int main() {
    ArrayManipulator manipulator;
    std::cout << "--- Array Manipulation Benchmarks ---" << std::endl;

    // --- Rotate Array Benchmarks ---
    std::cout << "\n--- Rotate Array ---" << std::endl;
    std::vector<int> rotate_sizes = {1000, 10000, 100000, 1000000};
    int k_value = 1000; // A fixed k, or k=N/2 for worst case

    for (int size : rotate_sizes) {
        std::vector<int> original_nums(size);
        std::iota(original_nums.begin(), original_nums.end(), 1); // Fill with 1 to N
        
        // Ensure k is within bounds and effective
        int k_effective = k_value % size;
        if (k_effective == 0) k_effective = size / 3; // Choose a non-zero k for actual rotation

        std::cout << "Array Size: " << size << ", k: " << k_effective << std::endl;

        // Approach 1: Temporary Array
        std::vector<int> nums_temp = original_nums;
        long long time_temp = measureTime([&]() {
            manipulator.rotate_temp_array(nums_temp, k_effective);
        });
        std::cout << "  Temp Array: " << time_temp << " us" << std::endl;

        // Approach 2: Reverse
        std::vector<int> nums_reverse = original_nums;
        long long time_reverse = measureTime([&]() {
            manipulator.rotate_reverse(nums_reverse, k_effective);
        });
        std::cout << "  Reverse:    " << time_reverse << " us" << std::endl;

        // Approach 3: Juggling Algorithm
        std::vector<int> nums_juggling = original_nums;
        long long time_juggling = measureTime([&]() {
            manipulator.rotate_juggling(nums_juggling, k_effective);
        });
        std::cout << "  Juggling:   " << time_juggling << " us" << std::endl;

        // Approach 4: Brute-Force (only for smaller sizes or very small k due to O(N*K) complexity)
        if (size <= 10000 && k_effective < 100) { // Limit brute-force benchmarks
            std::vector<int> nums_brute = original_nums;
            long long time_brute = measureTime([&]() {
                manipulator.rotate_brute_force(nums_brute, k_effective);
            });
            std::cout << "  Brute-Force: " << time_brute << " us" << std::endl;
        } else if (size <= 10000) {
            std::cout << "  Brute-Force: Skipped (k too large for N*K complexity)" << std::endl;
        } else {
             std::cout << "  Brute-Force: Skipped (array size too large for N*K complexity)" << std::endl;
        }
        std::cout << std::endl;
    }

    // --- Find the Duplicate Number Benchmarks ---
    std::cout << "\n--- Find Duplicate Number ---" << std::endl;
    std::vector<int> duplicate_sizes = {1000, 10000, 100000, 1000000, 5000000}; // N+1 integers
    
    for (int n_val : duplicate_sizes) {
        // n_val is 'n' in problem description, array size is n+1
        std::vector<int> original_nums = TestUtils::generateDuplicateVector(n_val);
        
        std::cout << "Array Size: " << n_val + 1 << " (n=" << n_val << ")" << std::endl;

        // Approach 1: Sort
        std::vector<int> nums_sort = original_nums; // Pass by value for sort
        long long time_sort = measureTime([&]() {
            volatile int result = manipulator.findDuplicate_sort(nums_sort); (void)result;
        });
        std::cout << "  Sort:        " << time_sort << " us" << std::endl;

        // Approach 2: Hash Set
        long long time_hash_set = measureTime([&]() {
            volatile int result = manipulator.findDuplicate_hashSet(original_nums); (void)result;
        });
        std::cout << "  Hash Set:    " << time_hash_set << " us" << std::endl;

        // Approach 3: Floyd's Cycle Detection
        long long time_floyd = measureTime([&]() {
            volatile int result = manipulator.findDuplicate_floyd(original_nums); (void)result;
        });
        std::cout << "  Floyd's:     " << time_floyd << " us" << std::endl;

        // Approach 4: Binary Search
        long long time_binary_search = measureTime([&]() {
            volatile int result = manipulator.findDuplicate_binarySearch(original_nums); (void)result;
        });
        std::cout << "  Binary Search: " << time_binary_search << " us" << std::endl;
        std::cout << std::endl;
    }

    // --- Trapping Rain Water Benchmarks ---
    std::cout << "\n--- Trapping Rain Water ---" << std::endl;
    std::vector<int> trap_sizes = {1000, 10000, 100000, 1000000, 5000000};
    
    for (int size : trap_sizes) {
        std::vector<int> height = TestUtils::generateElevationMap(size, 10000); // Max height 10k
        
        std::cout << "Array Size: " << size << std::endl;

        // Approach 1: Two Pointers
        long long time_two_pointers = measureTime([&]() {
            volatile int result = manipulator.trap_twoPointers(height); (void)result;
        });
        std::cout << "  Two Pointers:     " << time_two_pointers << " us" << std::endl;

        // Approach 2: Dynamic Programming
        long long time_dp = measureTime([&]() {
            volatile int result = manipulator.trap_dynamicProgramming(height); (void)result;
        });
        std::cout << "  Dynamic Programming: " << time_dp << " us" << std::endl;

        // Approach 3: Monotonic Stack
        long long time_stack = measureTime([&]() {
            volatile int result = manipulator.trap_monotonicStack(height); (void)result;
        });
        std::cout << "  Monotonic Stack:  " << time_stack << " us" << std::endl;
        std::cout << std::endl;
    }

    // --- Product of Array Except Self Benchmarks ---
    std::cout << "\n--- Product of Array Except Self ---" << std::endl;
    std::vector<int> product_sizes = {1000, 10000, 100000, 1000000, 5000000};
    
    for (int size : product_sizes) {
        // Values from 1 to 5 to avoid overflow for large products
        std::vector<int> nums = TestUtils::generateRandomVector(size, 1, 5);
        
        std::cout << "Array Size: " << size << std::endl;

        // Approach 1: Two-Pass
        long long time_two_pass = measureTime([&]() {
            std::vector<int> result = manipulator.productExceptSelf_twoPass(nums); (void)result;
        });
        std::cout << "  Two-Pass:     " << time_two_pass << " us" << std::endl;

        // Approach 2: Brute-Force (only for smaller sizes due to O(N^2) complexity)
        if (size <= 10000) { // Limit brute-force benchmarks
            long long time_brute = measureTime([&]() {
                std::vector<int> result = manipulator.productExceptSelf_bruteForce(nums); (void)result;
            });
            std::cout << "  Brute-Force:  " << time_brute << " us" << std::endl;
        } else {
             std::cout << "  Brute-Force: Skipped (array size too large for N^2 complexity)" << std::endl;
        }
        std::cout << std::endl;
    }

    return 0;
}
```