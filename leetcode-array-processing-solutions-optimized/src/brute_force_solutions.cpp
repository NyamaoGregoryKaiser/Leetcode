```cpp
#include <vector>
#include <numeric> // For std::accumulate
#include <algorithm> // For std::max, std::min, std::swap, std::rotate

namespace ArrayManipulation {

// --- Brute Force / Naive solutions for comparison ---

// Problem 1: Maximum Subarray Sum
namespace MaxSubarraySum {

    /**
     * @brief Brute-force solution for Maximum Subarray Sum.
     *
     * This approach iterates through all possible subarrays, calculates their sum,
     * and keeps track of the maximum sum found.
     * A subarray is defined by its start and end indices (i, j).
     *
     * Example: nums = [-2, 1, -3, 4]
     * i=0:
     *   j=0: [-2] sum=-2. max_sum=-2
     *   j=1: [-2, 1] sum=-1. max_sum=-1
     *   j=2: [-2, 1, -3] sum=-4. max_sum=-1
     *   j=3: [-2, 1, -3, 4] sum=-0. max_sum=0
     * i=1:
     *   j=1: [1] sum=1. max_sum=1
     *   j=2: [1, -3] sum=-2. max_sum=1
     *   j=3: [1, -3, 4] sum=2. max_sum=2
     * i=2:
     *   j=2: [-3] sum=-3. max_sum=2
     *   j=3: [-3, 4] sum=1. max_sum=2
     * i=3:
     *   j=3: [4] sum=4. max_sum=4
     * Final: max_sum = 4
     *
     * @param nums The input integer array.
     * @return The maximum subarray sum.
     *
     * @complexity
     * Time: O(N^2) - Two nested loops iterate through all possible start and end points of subarrays.
     * Space: O(1) - Only a few constant extra variables.
     */
    int bruteForce(const std::vector<int>& nums) {
        if (nums.empty()) {
            return 0;
        }

        int max_so_far = nums[0];

        // Iterate through all possible starting points
        for (size_t i = 0; i < nums.size(); ++i) {
            int current_subarray_sum = 0;
            // Iterate through all possible ending points for the current starting point
            for (size_t j = i; j < nums.size(); ++j) {
                current_subarray_sum += nums[j];
                max_so_far = std::max(max_so_far, current_subarray_sum);
            }
        }

        return max_so_far;
    }

} // namespace MaxSubarraySum

// Problem 2: Product of Array Except Self
namespace ProductExceptSelf {

    /**
     * @brief Brute-force solution for Product of Array Except Self.
     *
     * For each element `nums[i]`, iterate through the entire array again
     * and multiply all elements except `nums[i]`.
     *
     * @param nums The input integer array.
     * @return An array where answer[i] is the product of all elements except nums[i].
     *
     * @complexity
     * Time: O(N^2) - For each of N elements, we iterate through N-1 other elements.
     * Space: O(N) - To store the result array.
     */
    std::vector<int> bruteForce(const std::vector<int>& nums) {
        int n = nums.size();
        if (n == 0) return {};
        if (n == 1) return {1};

        std::vector<int> answer(n);

        for (int i = 0; i < n; ++i) {
            long long current_product = 1; // Use long long to prevent overflow during intermediate products
            for (int j = 0; j < n; ++j) {
                if (i != j) {
                    current_product *= nums[j];
                }
            }
            answer[i] = static_cast<int>(current_product);
        }
        return answer;
    }

} // namespace ProductExceptSelf

// Problem 3: Trapping Rain Water
namespace TrappingRainWater {

    /**
     * @brief Brute-force solution for Trapping Rain Water.
     *
     * For each bar `height[i]`, calculate how much water it can trap.
     * The water trapped at `height[i]` depends on the maximum height of bars to its left
     * and the maximum height of bars to its right.
     * Water trapped at `i` = `min(max_left_i, max_right_i) - height[i]`.
     * Iterate through all bars (except the first and last, which cannot trap water).
     * For each bar, scan left to find `max_left` and scan right to find `max_right`.
     *
     * @param height The elevation map.
     * @return The total amount of trapped rain water.
     *
     * @complexity
     * Time: O(N^2) - For each of N bars, we might scan left and right for N elements, roughly N + N operations.
     * Space: O(1) - Constant extra variables.
     */
    int bruteForce(const std::vector<int>& height) {
        int n = height.size();
        if (n <= 2) { // Arrays of size 0, 1, or 2 cannot trap water
            return 0;
        }

        int total_water = 0;

        for (int i = 1; i < n - 1; ++i) { // Iterate from 1 to n-2, as ends can't trap water
            int max_left = 0;
            // Find max height to the left of current bar
            for (int j = 0; j < i; ++j) {
                max_left = std::max(max_left, height[j]);
            }

            int max_right = 0;
            // Find max height to the right of current bar
            for (int j = i + 1; j < n; ++j) {
                max_right = std::max(max_right, height[j]);
            }

            // Water trapped at current bar is min(max_left, max_right) - height[i]
            // Only add if it's positive.
            total_water += std::max(0, std::min(max_left, max_right) - height[i]);
        }

        return total_water;
    }

    /**
     * @brief Dynamic Programming solution for Trapping Rain Water.
     *
     * This approach preprocesses `max_left` and `max_right` arrays to store the
     * maximum height encountered from the left up to index `i`, and from the right
     * down to index `i`.
     *
     * `left_max[i]` = max height to the left of or at `i`.
     * `right_max[i]` = max height to the right of or at `i`.
     *
     * Water trapped at `i` = `min(left_max[i], right_max[i]) - height[i]`.
     *
     * @param height The elevation map.
     * @return The total amount of trapped rain water.
     *
     * @complexity
     * Time: O(N) - Three passes: one for `left_max`, one for `right_max`, one for calculating water.
     * Space: O(N) - Two additional arrays `left_max` and `right_max` are used.
     */
    int dpSolution(const std::vector<int>& height) {
        int n = height.size();
        if (n <= 2) {
            return 0;
        }

        std::vector<int> left_max(n);
        std::vector<int> right_max(n);

        // Fill left_max array
        left_max[0] = height[0];
        for (int i = 1; i < n; ++i) {
            left_max[i] = std::max(left_max[i - 1], height[i]);
        }

        // Fill right_max array
        right_max[n - 1] = height[n - 1];
        for (int i = n - 2; i >= 0; --i) {
            right_max[i] = std::max(right_max[i + 1], height[i]);
        }

        int total_water = 0;
        // Calculate trapped water
        for (int i = 0; i < n; ++i) {
            // Water can only be trapped if min(left_max, right_max) is greater than current bar height
            total_water += std::max(0, std::min(left_max[i], right_max[i]) - height[i]);
        }

        return total_water;
    }

} // namespace TrappingRainWater

// Problem 4: Rotate Array
namespace RotateArray {

    /**
     * @brief Naive solution for Rotate Array using repeated single-element rotation.
     *
     * Rotate the array by 1 step, k times.
     * To rotate by 1 step: store the last element, shift all other elements to the right,
     * then place the stored element at the beginning.
     *
     * @param nums The integer array to be rotated (modified in-place).
     * @param k The number of steps to rotate to the right.
     *
     * @complexity
     * Time: O(N*k) - Performing k single-element rotations. Each single rotation is O(N).
     * Space: O(1) - All operations are performed in-place.
     */
    void rotateNaive(std::vector<int>& nums, int k) {
        int n = nums.size();
        if (n == 0 || k == 0) {
            return;
        }

        k %= n; // Normalize k

        for (int step = 0; step < k; ++step) {
            int last_element = nums[n - 1];
            for (int i = n - 1; i > 0; --i) {
                nums[i] = nums[i - 1];
            }
            nums[0] = last_element;
        }
    }

} // namespace RotateArray

// Problem 5: Merge Sorted Arrays
namespace MergeSortedArrays {

    /**
     * @brief Simple solution for Merge Sorted Arrays using `std::sort`.
     *
     * This method copies `nums2` into the available space in `nums1` and then
     * uses the standard library's sort function to sort the entire `nums1` array.
     *
     * @param nums1 The first array with m elements, followed by n zeros (modified in-place).
     * @param m The number of valid elements in nums1.
     * @param nums2 The second array with n elements.
     * @param n The number of valid elements in nums2.
     *
     * @complexity
     * Time: O((m+n) log(m+n)) - Copying is O(n), sorting is O((m+n) log(m+n)).
     * Space: O(1) - If `std::sort` uses an in-place sort like Introsort.
     *               However, it might use auxiliary space depending on the implementation
     *               and the specific algorithm chosen (e.g., merge sort uses O(N) space).
     *               For competitive programming, `std::sort` is often considered O(log N) or O(N) space.
     */
    void mergeUsingSort(std::vector<int>& nums1, int m, const std::vector<int>& nums2, int n) {
        // Copy elements from nums2 into the end of nums1
        for (int i = 0; i < n; ++i) {
            nums1[m + i] = nums2[i];
        }

        // Sort the entire nums1 array
        std::sort(nums1.begin(), nums1.begin() + m + n);
    }

    /**
     * @brief Solution for Merge Sorted Arrays using Auxiliary Array.
     *
     * This method creates a temporary array, merges both into it, then copies back.
     *
     * @param nums1 The first array with m elements, followed by n zeros (modified in-place).
     * @param m The number of valid elements in nums1.
     * @param nums2 The second array with n elements.
     * @param n The number of valid elements in nums2.
     *
     * @complexity
     * Time: O(m + n) - Single pass to merge, single pass to copy back.
     * Space: O(m + n) - An auxiliary array of size m+n is used.
     */
    void mergeAuxiliaryArray(std::vector<int>& nums1, int m, const std::vector<int>& nums2, int n) {
        std::vector<int> merged_array(m + n);
        int p1 = 0; // Pointer for nums1
        int p2 = 0; // Pointer for nums2
        int p_merged = 0; // Pointer for merged_array

        while (p1 < m && p2 < n) {
            if (nums1[p1] <= nums2[p2]) {
                merged_array[p_merged++] = nums1[p1++];
            } else {
                merged_array[p_merged++] = nums2[p2++];
            }
        }

        // Copy remaining elements from nums1
        while (p1 < m) {
            merged_array[p_merged++] = nums1[p1++];
        }

        // Copy remaining elements from nums2
        while (p2 < n) {
            merged_array[p_merged++] = nums2[p2++];
        }

        // Copy merged_array back to nums1
        for (int i = 0; i < m + n; ++i) {
            nums1[i] = merged_array[i];
        }
    }


} // namespace MergeSortedArrays

} // namespace ArrayManipulation
```