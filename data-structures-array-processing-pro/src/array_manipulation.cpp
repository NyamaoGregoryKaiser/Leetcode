#include "array_manipulation.hpp"
#include <algorithm> // For std::reverse, std::sort
#include <numeric>   // For std::gcd (C++17)

// --- Problem 1: Rotate Array ---
namespace RotateArray {

    /**
     * @brief Rotates an array to the right by k steps using brute force.
     *        This involves shifting elements one by one, k times.
     * @param nums The vector of integers to be rotated.
     * @param k The number of steps to rotate.
     *
     * Time Complexity: O(n*k) - In the worst case (k near n), this can be O(n^2).
     * Space Complexity: O(1) - Constant extra space.
     */
    void rotateBruteForce(std::vector<int>& nums, int k) {
        if (nums.empty() || k == 0) return;

        int n = nums.size();
        k %= n; // Normalize k to be within [0, n-1]

        for (int i = 0; i < k; ++i) {
            int last_element = nums[n - 1];
            for (int j = n - 1; j > 0; --j) {
                nums[j] = nums[j - 1];
            }
            nums[0] = last_element;
        }
    }

    /**
     * @brief Rotates an array to the right by k steps using an auxiliary array.
     *        Elements are placed directly into their final positions in a new array,
     *        then copied back to the original.
     * @param nums The vector of integers to be rotated.
     * @param k The number of steps to rotate.
     *
     * Time Complexity: O(n) - One pass to copy to temp, one pass to copy back.
     * Space Complexity: O(n) - Requires an auxiliary array of size n.
     */
    void rotateWithExtraSpace(std::vector<int>& nums, int k) {
        if (nums.empty() || k == 0) return;

        int n = nums.size();
        k %= n; // Normalize k

        std::vector<int> temp(n);
        for (int i = 0; i < n; ++i) {
            temp[(i + k) % n] = nums[i]; // Place nums[i] at its new position
        }
        nums = temp; // Copy back to original vector
    }

    /**
     * @brief Rotates an array to the right by k steps using the three reversals method.
     *        1. Reverse the entire array.
     *        2. Reverse the first k elements.
     *        3. Reverse the remaining (n-k) elements.
     * @param nums The vector of integers to be rotated.
     * @param k The number of steps to rotate.
     *
     * Time Complexity: O(n) - Three passes over the array.
     * Space Complexity: O(1) - In-place rotation.
     */
    void rotateThreeReversals(std::vector<int>& nums, int k) {
        if (nums.empty() || k == 0) return;

        int n = nums.size();
        k %= n; // Normalize k

        if (k == 0) return; // No rotation needed

        // Example: nums = [1,2,3,4,5,6,7], k = 3
        // 1. Reverse entire array: [7,6,5,4,3,2,1]
        std::reverse(nums.begin(), nums.end());

        // 2. Reverse first k elements: [5,6,7,4,3,2,1] (first 3 elements reversed)
        std::reverse(nums.begin(), nums.begin() + k);

        // 3. Reverse remaining (n-k) elements: [5,6,7,1,2,3,4] (remaining 4 elements reversed)
        std::reverse(nums.begin() + k, nums.end());
    }

    /**
     * @brief Rotates an array to the right by k steps using the Juggling Algorithm.
     *        This method cyclically shifts elements by GCD(n, k) cycles.
     * @param nums The vector of integers to be rotated.
     * @param k The number of steps to rotate.
     *
     * Time Complexity: O(n) - Each element is moved exactly once.
     * Space Complexity: O(1) - In-place rotation.
     */
    void rotateJugglingAlgorithm(std::vector<int>& nums, int k) {
        if (nums.empty() || k == 0) return;

        int n = nums.size();
        k %= n; // Normalize k

        if (k == 0) return; // No rotation needed

        // Use std::gcd for C++17 or implement custom GCD
        // For older C++, a custom GCD function would be needed.
        // int common_divisor = std::gcd(n, k); // C++17 feature
        int common_divisor = std::gcd(n, k); // Use std::gcd which is available in C++17

        for (int i = 0; i < common_divisor; ++i) {
            // Move elements in a cycle
            int temp = nums[i];
            int j = i;
            while (true) {
                int next_idx = (j - k + n) % n; // Calculate previous index (for right rotation)
                if (next_idx == i) { // If we complete a cycle
                    break;
                }
                nums[j] = nums[next_idx];
                j = next_idx;
            }
            nums[j] = temp;
        }
    }

} // namespace RotateArray

// --- Problem 2: Product of Array Except Self ---
namespace ProductExceptSelf {

    /**
     * @brief Calculates product of array except self using division.
     *        First calculates total product, then divides by nums[i].
     *        Handles zero cases.
     * @param nums The input vector of integers.
     * @return A new vector where each element is the product of all other elements.
     *
     * Time Complexity: O(n) - One pass to find total product and count zeros, one pass to fill result.
     * Space Complexity: O(1) - Excluding the output array.
     */
    std::vector<int> productExceptSelfWithDivision(const std::vector<int>& nums) {
        int n = nums.size();
        std::vector<int> result(n);

        long long total_product = 1;
        int zero_count = 0;

        for (int x : nums) {
            if (x == 0) {
                zero_count++;
            } else {
                total_product *= x;
            }
        }

        for (int i = 0; i < n; ++i) {
            if (zero_count > 1) {
                // If more than one zero, all results will be 0
                result[i] = 0;
            } else if (zero_count == 1) {
                // If exactly one zero:
                // If nums[i] is the zero, result[i] is total product of non-zeros.
                // Otherwise, result[i] is 0.
                result[i] = (nums[i] == 0) ? total_product : 0;
            } else {
                // No zeros: just divide total product by nums[i]
                result[i] = total_product / nums[i];
            }
        }
        return result;
    }

    /**
     * @brief Calculates product of array except self using prefix and suffix products.
     *        This is the optimal solution without using division.
     *        1. Calculate prefix products: `prefix_products[i]` stores product of `nums[0]...nums[i-1]`.
     *        2. Calculate suffix products: `suffix_products[i]` stores product of `nums[i+1]...nums[n-1]`.
     *        3. `result[i] = prefix_products[i] * suffix_products[i]`.
     * @param nums The input vector of integers.
     * @return A new vector where each element is the product of all other elements.
     *
     * Time Complexity: O(n) - Three passes (one for prefix, one for suffix, one for final result).
     * Space Complexity: O(1) - Excluding the output array (can optimize to use output array itself for one of the passes).
     */
    std::vector<int> productExceptSelfOptimal(const std::vector<int>& nums) {
        int n = nums.size();
        std::vector<int> result(n);

        // Step 1: Calculate prefix products
        // result[i] will store the product of elements to the left of nums[i]
        // For result[0], there are no elements to the left, so product is 1.
        result[0] = 1;
        for (int i = 1; i < n; ++i) {
            result[i] = result[i - 1] * nums[i - 1];
        }
        // At this point, result = [1, nums[0], nums[0]*nums[1], ..., nums[0]*...*nums[n-2]]

        // Step 2: Calculate suffix products and combine with prefix products
        // Use a variable `right_product` to store the product of elements to the right.
        // Initialize `right_product` to 1.
        int right_product = 1;
        for (int i = n - 1; i >= 0; --i) {
            // result[i] already holds product of elements to its left.
            // Multiply it by `right_product` (product of elements to its right).
            result[i] *= right_product;

            // Update `right_product` for the next iteration (moving left).
            right_product *= nums[i];
        }
        // Final result = [P_left[0]*P_right[0], P_left[1]*P_right[1], ..., P_left[n-1]*P_right[n-1]]
        // where P_left[i] is product of nums[0...i-1] and P_right[i] is product of nums[i+1...n-1].

        return result;
    }

} // namespace ProductExceptSelf

// --- Problem 3: Maximum Subarray Sum ---
namespace MaxSubarray {

    /**
     * @brief Finds the maximum sum of a contiguous subarray using brute force.
     *        Checks all possible subarrays.
     * @param nums The input vector of integers.
     * @return The maximum subarray sum.
     *
     * Time Complexity: O(n^2) - Nested loops to iterate through all subarrays.
     * Space Complexity: O(1) - Constant extra space.
     */
    int maxSubArrayBruteForce(const std::vector<int>& nums) {
        if (nums.empty()) return 0; // Or throw an exception, depending on problem constraints

        int max_so_far = nums[0];

        for (int i = 0; i < nums.size(); ++i) {
            int current_sum = 0;
            for (int j = i; j < nums.size(); ++j) {
                current_sum += nums[j];
                max_so_far = std::max(max_so_far, current_sum);
            }
        }
        return max_so_far;
    }

    /**
     * @brief Finds the maximum sum of a contiguous subarray using Kadane's Algorithm.
     *        This is a dynamic programming approach that iterates through the array once.
     *        It keeps track of the maximum sum ending at the current position (`current_max`)
     *        and the overall maximum sum found so far (`global_max`).
     * @param nums The input vector of integers.
     * @return The maximum subarray sum.
     *
     * Time Complexity: O(n) - Single pass through the array.
     * Space Complexity: O(1) - Constant extra space.
     */
    int maxSubArrayKadane(const std::vector<int>& nums) {
        if (nums.empty()) return 0; // Or throw an exception, depending on problem constraints

        int global_max = nums[0];      // Overall maximum sum found
        int current_max = nums[0];     // Maximum sum ending at the current position

        for (size_t i = 1; i < nums.size(); ++i) {
            // At each position `i`, the `current_max` is either:
            // 1. The current element `nums[i]` itself (starting a new subarray).
            // 2. The current element `nums[i]` added to the `current_max` from the previous position
            //    (extending the existing subarray).
            current_max = std::max(nums[i], current_max + nums[i]);

            // Update `global_max` if `current_max` is greater.
            global_max = std::max(global_max, current_max);
        }
        return global_max;
    }

} // namespace MaxSubarray

// --- Problem 4: Merge Intervals ---
namespace MergeIntervals {

    /**
     * @brief Merges overlapping intervals.
     *        1. Sorts the intervals based on their start times.
     *        2. Iterates through the sorted intervals, merging them if they overlap.
     * @param intervals A vector of intervals, where each interval is a vector of two integers [start, end].
     * @return A new vector of merged, non-overlapping intervals.
     *
     * Time Complexity: O(N log N) - Dominated by the sorting step.
     * Space Complexity: O(N) - In the worst case, if no intervals overlap, the result list will have N intervals.
     */
    std::vector<std::vector<int>> merge(std::vector<std::vector<int>>& intervals) {
        if (intervals.empty()) {
            return {};
        }

        // Step 1: Sort intervals by their start times.
        // This is crucial because it ensures we only need to look at the current
        // interval and the previous merged interval to determine overlap.
        std::sort(intervals.begin(), intervals.end(), [](const std::vector<int>& a, const std::vector<int>& b) {
            return a[0] < b[0];
        });

        std::vector<std::vector<int>> merged_intervals;
        merged_intervals.push_back(intervals[0]); // Start with the first interval

        // Step 2: Iterate through the sorted intervals and merge.
        for (size_t i = 1; i < intervals.size(); ++i) {
            // Get the last merged interval.
            std::vector<int>& last_merged = merged_intervals.back();
            // Get the current interval being considered.
            const std::vector<int>& current_interval = intervals[i];

            // Check for overlap: If the current interval's start is less than or equal to
            // the last merged interval's end, they overlap.
            if (current_interval[0] <= last_merged[1]) {
                // Merge: Extend the end of the last merged interval.
                // The new end is the maximum of the current interval's end and
                // the last merged interval's end.
                last_merged[1] = std::max(last_merged[1], current_interval[1]);
            } else {
                // No overlap: Add the current interval as a new, separate merged interval.
                merged_intervals.push_back(current_interval);
            }
        }

        return merged_intervals;
    }

} // namespace MergeIntervals