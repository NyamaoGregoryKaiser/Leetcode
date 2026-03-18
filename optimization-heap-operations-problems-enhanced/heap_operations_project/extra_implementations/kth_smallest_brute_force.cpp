```cpp
#include <iostream>
#include <vector>
#include <algorithm> // For std::sort and std::nth_element
#include <stdexcept> // For std::invalid_argument

/**
 * @file kth_smallest_brute_force.cpp
 * @brief Demonstrates brute-force and `std::nth_element` approaches for Kth Smallest Element.
 */

namespace KthSmallestBruteForce {

    /**
     * @brief Finds the Kth smallest element by sorting the entire array.
     *
     * This is a straightforward, but generally less efficient than heap-based
     * or `std::nth_element` approaches if only the Kth element is needed.
     * It modifies the input array by sorting it.
     *
     * @param nums The input array of integers (will be sorted).
     * @param k The desired rank (1-indexed).
     * @return The Kth smallest element.
     * @throws std::invalid_argument if k is out of bounds or nums is empty.
     *
     * Time Complexity: O(N log N) - for sorting the array.
     * Space Complexity: O(log N) or O(N) depending on sort implementation (e.g., quicksort recursion stack or merge sort temp array).
     *                   If `std::sort` uses IntroSort (hybrid), it's typically O(log N) auxiliary space.
     */
    int findKthSmallestBySorting(std::vector<int>& nums, int k) {
        if (nums.empty() || k <= 0 || k > nums.size()) {
            throw std::invalid_argument("Invalid input: array is empty or k is out of bounds.");
        }

        // Sort the entire array
        std::sort(nums.begin(), nums.end());

        // The Kth smallest element will be at index k-1
        return nums[k - 1];
    }

    /**
     * @brief Finds the Kth smallest element using `std::nth_element`.
     *
     * `std::nth_element` is a partial sort algorithm. It rearranges the elements
     * in the range `[first, last)` such that the element at the `nth` position
     * is the element that would be in that position in a sorted sequence.
     * All elements before this position are less than or equal to it,
     * and all elements after are greater than or equal to it.
     *
     * @param nums The input array of integers (will be partially sorted).
     * @param k The desired rank (1-indexed).
     * @return The Kth smallest element.
     * @throws std::invalid_argument if k is out of bounds or nums is empty.
     *
     * Time Complexity: O(N) on average - worst case O(N^2) (though rare for good implementations).
     * Space Complexity: O(log N) - for recursion stack.
     */
    int findKthSmallestNthElement(std::vector<int>& nums, int k) {
        if (nums.empty() || k <= 0 || k > nums.size()) {
            throw std::invalid_argument("Invalid input: array is empty or k is out of bounds.");
        }

        // Use std::nth_element to find the Kth smallest element.
        // It partitions the array such that the element at (nums.begin() + k - 1)
        // is the element that would be in that position in a sorted array.
        // All elements before it are less than or equal, all after are greater than or equal.
        std::nth_element(nums.begin(), nums.begin() + k - 1, nums.end());

        // The element at index k-1 is the Kth smallest
        return nums[k - 1];
    }

} // namespace KthSmallestBruteForce

int main() {
    std::vector<int> nums1 = {3, 2, 1, 5, 6, 4};
    int k1 = 2; // 2nd smallest is 2
    std::vector<int> nums1_copy_sort = nums1;
    std::vector<int> nums1_copy_nth = nums1;

    std::cout << "Original nums: ";
    for (int n : nums1) std::cout << n << " ";
    std::cout << std::endl;

    try {
        int result_sort = KthSmallestBruteForce::findKthSmallestBySorting(nums1_copy_sort, k1);
        std::cout << "Kth Smallest (k=" << k1 << ") by Sorting: " << result_sort << std::endl; // Expected: 2
        std::cout << "Array after sort: ";
        for (int n : nums1_copy_sort) std::cout << n << " ";
        std::cout << std::endl;

        int result_nth = KthSmallestBruteForce::findKthSmallestNthElement(nums1_copy_nth, k1);
        std::cout << "Kth Smallest (k=" << k1 << ") by nth_element: " << result_nth << std::endl; // Expected: 2
        std::cout << "Array after nth_element: ";
        for (int n : nums1_copy_nth) std::cout << n << " ";
        std::cout << std::endl;

        std::vector<int> nums2 = {7, 10, 4, 3, 20, 15};
        int k2 = 3; // 3rd smallest is 7
        std::vector<int> nums2_copy_sort = nums2;
        std::vector<int> nums2_copy_nth = nums2;

        std::cout << "\nOriginal nums2: ";
        for (int n : nums2) std::cout << n << " ";
        std::cout << std::endl;

        result_sort = KthSmallestBruteForce::findKthSmallestBySorting(nums2_copy_sort, k2);
        std::cout << "Kth Smallest (k=" << k2 << ") by Sorting: " << result_sort << std::endl; // Expected: 7
        result_nth = KthSmallestBruteForce::findKthSmallestNthElement(nums2_copy_nth, k2);
        std::cout << "Kth Smallest (k=" << k2 << ") by nth_element: " << result_nth << std::endl; // Expected: 7

        // Test edge cases
        std::vector<int> empty_nums;
        try {
            KthSmallestBruteForce::findKthSmallestBySorting(empty_nums, 1);
        } catch (const std::invalid_argument& e) {
            std::cout << "\nCaught expected error for empty nums: " << e.what() << std::endl;
        }
        try {
            KthSmallestBruteForce::findKthSmallestNthElement(nums1, 7); // k > size
        } catch (const std::invalid_argument& e) {
            std::cout << "Caught expected error for k > size: " << e.what() << std::endl;
        }

    } catch (const std::exception& e) {
        std::cerr << "An unexpected error occurred: " << e.what() << std::endl;
        return 1;
    }

    return 0;
}
```