```java
package com.arraymanipulation.problems;

import com.arraymanipulation.utils.ArrayUtils;

import java.util.Arrays;
import java.util.Collections;

/**
 * This class contains implementations for various array manipulation problems,
 * offering multiple approaches (brute-force, optimized, in-place, etc.) for
 * common interview questions. Each method includes detailed comments, time,
 * and space complexity analysis.
 */
public class ArrayManipulationProblems {

    /**
     * Problem 1: Rotate Array
     * Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.
     * The array should be modified in-place if possible.
     * <p>
     * Example:
     * Input: nums = [1,2,3,4,5,6,7], k = 3
     * Output: [5,6,7,1,2,3,4]
     * <p>
     * Explanation:
     * rotate 1 steps to the right: [7,1,2,3,4,5,6]
     * rotate 2 steps to the right: [6,7,1,2,3,4,5]
     * rotate 3 steps to the right: [5,6,7,1,2,3,4]
     */
    public void rotateArray(int[] nums, int k, SolutionApproach approach) {
        if (nums == null || nums.length == 0 || k < 0) {
            return; // No rotation needed or invalid input
        }

        int n = nums.length;
        k %= n; // Effective rotations (k can be greater than n)

        if (k == 0) {
            return; // No rotation needed
        }

        switch (approach) {
            case BRUTE_FORCE:
                rotateArrayBruteForce(nums, k);
                break;
            case EXTRA_SPACE:
                rotateArrayExtraSpace(nums, k);
                break;
            case REVERSAL:
                rotateArrayReversal(nums, k);
                break;
            default:
                System.out.println("Unsupported approach for Rotate Array: " + approach);
                // Fallback to reversal as it's optimal and in-place
                rotateArrayReversal(nums, k);
        }
    }

    /**
     * Approach 1.1: Rotate Array - Brute Force (Repeatedly shift one element)
     * For each of the 'k' rotations, we shift every element one position to the right.
     * The last element moves to the first position.
     *
     * @param nums The array to rotate.
     * @param k    The number of steps to rotate.
     *
     * Time Complexity: O(k * n)
     *   - In the worst case, k can be up to n-1. So, O(n^2).
     *   - Each rotation involves iterating through n elements.
     * Space Complexity: O(1)
     *   - Only a few extra variables are used.
     */
    private void rotateArrayBruteForce(int[] nums, int k) {
        int n = nums.length;
        for (int i = 0; i < k; i++) {
            int lastElement = nums[n - 1];
            for (int j = n - 1; j > 0; j--) {
                nums[j] = nums[j - 1];
            }
            nums[0] = lastElement;
        }
    }

    /**
     * Approach 1.2: Rotate Array - Using Extra Space
     * Create a new array and place elements into their correct rotated positions.
     * Then, copy elements back from the new array to the original array.
     *
     * @param nums The array to rotate.
     * @param k    The number of steps to rotate.
     *
     * Time Complexity: O(n)
     *   - One pass to copy to the new array.
     *   - One pass to copy back to the original array.
     * Space Complexity: O(n)
     *   - A new array of size 'n' is created.
     */
    private void rotateArrayExtraSpace(int[] nums, int k) {
        int n = nums.length;
        int[] rotated = new int[n];

        for (int i = 0; i < n; i++) {
            rotated[(i + k) % n] = nums[i];
        }

        System.arraycopy(rotated, 0, nums, 0, n);
    }

    /**
     * Approach 1.3: Rotate Array - Reversal Algorithm (Optimal and In-place)
     * This approach leverages the property that reversing a segment of an array
     * can help achieve the desired rotation.
     * Steps:
     * 1. Reverse the entire array.
     * 2. Reverse the first 'k' elements.
     * 3. Reverse the remaining 'n-k' elements.
     *
     * Example: nums = [1,2,3,4,5,6,7], k = 3
     * 1. Reverse all: [7,6,5,4,3,2,1]
     * 2. Reverse first k (3) elements: [5,6,7,4,3,2,1]
     * 3. Reverse remaining n-k (4) elements: [5,6,7,1,2,3,4] (Desired Output)
     *
     * @param nums The array to rotate.
     * @param k    The number of steps to rotate.
     *
     * Time Complexity: O(n)
     *   - Three passes over the array (or parts of it), each linear.
     * Space Complexity: O(1)
     *   - All operations are performed in-place.
     */
    private void rotateArrayReversal(int[] nums, int k) {
        int n = nums.length;
        // Step 1: Reverse the entire array
        reverse(nums, 0, n - 1);
        // Step 2: Reverse the first k elements
        reverse(nums, 0, k - 1);
        // Step 3: Reverse the remaining n-k elements
        reverse(nums, k, n - 1);
    }

    /**
     * Helper method to reverse a portion of an array in-place.
     *
     * @param nums  The array.
     * @param start The starting index (inclusive).
     * @param end   The ending index (inclusive).
     */
    private void reverse(int[] nums, int start, int end) {
        while (start < end) {
            int temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start++;
            end--;
        }
    }

    /**
     * Problem 2: Maximum Subarray Sum (Kadane's Algorithm)
     * Find the contiguous subarray within an array (containing at least one number)
     * which has the largest sum.
     * <p>
     * Example:
     * Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
     * Output: 6 (The subarray [4,-1,2,1] has the largest sum = 6)
     */
    public int maxSubArray(int[] nums, SolutionApproach approach) {
        if (nums == null || nums.length == 0) {
            throw new IllegalArgumentException("Input array cannot be null or empty.");
        }

        switch (approach) {
            case BRUTE_FORCE:
                return maxSubArrayBruteForce(nums);
            case KADANES_ALGORITHM:
                return maxSubArrayKadane(nums);
            default:
                System.out.println("Unsupported approach for Max Subarray Sum: " + approach);
                // Fallback to Kadane's as it's optimal
                return maxSubArrayKadane(nums);
        }
    }

    /**
     * Approach 2.1: Max Subarray Sum - Brute Force
     * Check every possible subarray sum and keep track of the maximum.
     *
     * @param nums The input array.
     * @return The maximum subarray sum.
     *
     * Time Complexity: O(n^2)
     *   - Two nested loops: outer loop for start index, inner loop for end index.
     * Space Complexity: O(1)
     *   - Only a few extra variables are used.
     */
    private int maxSubArrayBruteForce(int[] nums) {
        int n = nums.length;
        int maxSum = Integer.MIN_VALUE;

        for (int i = 0; i < n; i++) { // Start of subarray
            int currentSum = 0;
            for (int j = i; j < n; j++) { // End of subarray
                currentSum += nums[j];
                maxSum = Math.max(maxSum, currentSum);
            }
        }
        return maxSum;
    }

    /**
     * Approach 2.2: Max Subarray Sum - Kadane's Algorithm (Optimal Dynamic Programming/Greedy)
     * This algorithm iterates through the array, keeping track of the maximum sum
     * ending at the current position (`currentMax`) and the overall maximum sum found
     * so far (`globalMax`).
     *
     * If `currentMax` becomes negative, it's reset to 0 (or the current element
     * if we are guaranteed at least one number). The logic relies on the fact
     * that a negative prefix will never contribute to a larger sum.
     *
     * @param nums The input array.
     * @return The maximum subarray sum.
     *
     * Time Complexity: O(n)
     *   - A single pass through the array.
     * Space Complexity: O(1)
     *   - Only a few extra variables are used.
     */
    private int maxSubArrayKadane(int[] nums) {
        int n = nums.length;
        int globalMax = nums[0]; // Initialize with the first element
        int currentMax = nums[0]; // Max sum ending at current position

        for (int i = 1; i < n; i++) {
            // Option 1: Start a new subarray with nums[i]
            // Option 2: Extend the previous subarray by adding nums[i]
            currentMax = Math.max(nums[i], currentMax + nums[i]);
            globalMax = Math.max(globalMax, currentMax);
        }
        return globalMax;
    }

    /**
     * Problem 3: Trapping Rain Water
     * Given n non-negative integers representing an elevation map where the width
     * of each bar is 1, compute how much water it can trap after raining.
     * <p>
     * Example:
     * Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
     * Output: 6
     * Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1].
     * In this case, 6 units of rain water (blue section) are being trapped.
     * Visual:
     *
     *       _
     *   _  | | _   _
     *  | |_| | | |_| |
     * _|_|_|_|_|_|_|_|_|_
     * 0 1 0 2 1 0 1 3 2 1 2 1
     */
    public int trapRainWater(int[] height, SolutionApproach approach) {
        if (height == null || height.length < 3) { // Minimum 3 bars to trap water
            return 0;
        }

        switch (approach) {
            case BRUTE_FORCE:
                return trapRainWaterBruteForce(height);
            case DYNAMIC_PROGRAMMING: // Using precomputed leftMax and rightMax arrays
            case LEFT_RIGHT_MAX:
                return trapRainWaterDP(height);
            case TWO_POINTERS:
                return trapRainWaterTwoPointers(height);
            default:
                System.out.println("Unsupported approach for Trapping Rain Water: " + approach);
                // Fallback to Two Pointers as it's optimal
                return trapRainWaterTwoPointers(height);
        }
    }

    /**
     * Approach 3.1: Trapping Rain Water - Brute Force
     * For each bar, calculate how much water it can hold. The water trapped
     * above a bar `i` is `min(max_left, max_right) - height[i]`.
     * `max_left` is the maximum height of a bar to its left.
     * `max_right` is the maximum height of a bar to its right.
     *
     * @param height The array representing elevation map.
     * @return Total trapped water.
     *
     * Time Complexity: O(n^2)
     *   - For each element, we iterate left and right to find max heights.
     * Space Complexity: O(1)
     *   - Only a few extra variables are used.
     */
    private int trapRainWaterBruteForce(int[] height) {
        int n = height.length;
        int totalWater = 0;

        // We cannot trap water at the first and last bar.
        for (int i = 1; i < n - 1; i++) {
            int leftMax = 0;
            // Find the maximum height bar on the left of current bar
            for (int j = 0; j <= i; j++) {
                leftMax = Math.max(leftMax, height[j]);
            }

            int rightMax = 0;
            // Find the maximum height bar on the right of current bar
            for (int j = i; j < n; j++) {
                rightMax = Math.max(rightMax, height[j]);
            }

            // Water trapped at current bar is min(left_max, right_max) - height[i]
            totalWater += Math.max(0, Math.min(leftMax, rightMax) - height[i]);
        }
        return totalWater;
    }

    /**
     * Approach 3.2: Trapping Rain Water - Dynamic Programming (Precompute Max Heights)
     * Instead of recomputing `leftMax` and `rightMax` for each bar, we can precompute
     * these arrays in two passes.
     * 1. Create `leftMax[]` array: `leftMax[i]` stores the maximum height encountered from index 0 to `i`.
     * 2. Create `rightMax[]` array: `rightMax[i]` stores the maximum height encountered from index `n-1` to `i`.
     * 3. In a final pass, for each bar `i`, calculate `min(leftMax[i], rightMax[i]) - height[i]`
     *    and sum it up.
     *
     * @param height The array representing elevation map.
     * @return Total trapped water.
     *
     * Time Complexity: O(n)
     *   - One pass to fill `leftMax` array.
     *   - One pass to fill `rightMax` array.
     *   - One pass to calculate total water. Total = 3 * O(n) = O(n).
     * Space Complexity: O(n)
     *   - Two auxiliary arrays (`leftMax` and `rightMax`) of size 'n' are used.
     */
    private int trapRainWaterDP(int[] height) {
        int n = height.length;
        int[] leftMax = new int[n];
        int[] rightMax = new int[n];

        // Fill leftMax array
        leftMax[0] = height[0];
        for (int i = 1; i < n; i++) {
            leftMax[i] = Math.max(leftMax[i - 1], height[i]);
        }

        // Fill rightMax array
        rightMax[n - 1] = height[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            rightMax[i] = Math.max(rightMax[i + 1], height[i]);
        }

        int totalWater = 0;
        // Calculate trapped water
        for (int i = 0; i < n; i++) {
            totalWater += Math.max(0, Math.min(leftMax[i], rightMax[i]) - height[i]);
        }
        return totalWater;
    }

    /**
     * Approach 3.3: Trapping Rain Water - Two Pointers (Optimal and O(1) Space)
     * This approach optimizes the DP approach by using two pointers, `left` and `right`,
     * and maintaining `maxLeft` and `maxRight` values without needing extra arrays.
     * The key insight is that if `height[left] < height[right]`, then the water trapped
     * at `left` depends only on `maxLeft` (as `maxRight` is guaranteed to be at least
     * `height[right]`, which is greater than `height[left]`).
     *
     * @param height The array representing elevation map.
     * @return Total trapped water.
     *
     * Time Complexity: O(n)
     *   - Single pass through the array.
     * Space Complexity: O(1)
     *   - Only a few extra variables are used.
     */
    private int trapRainWaterTwoPointers(int[] height) {
        int n = height.length;
        int left = 0, right = n - 1;
        int maxLeft = 0, maxRight = 0; // Max height encountered from left/right
        int totalWater = 0;

        while (left < right) {
            if (height[left] < height[right]) {
                // If height[left] is smaller, water trapped at 'left' depends on maxLeft
                // because maxRight will be at least height[right], which is greater than height[left]
                if (height[left] >= maxLeft) {
                    maxLeft = height[left]; // Update maxLeft if current bar is taller
                } else {
                    totalWater += maxLeft - height[left]; // Water trapped
                }
                left++;
            } else {
                // If height[right] is smaller (or equal), water trapped at 'right' depends on maxRight
                if (height[right] >= maxRight) {
                    maxRight = height[right]; // Update maxRight if current bar is taller
                } else {
                    totalWater += maxRight - height[right]; // Water trapped
                }
                right--;
            }
        }
        return totalWater;
    }

    /**
     * Problem 4: Product of Array Except Self
     * Given an integer array nums, return an array `answer` such that `answer[i]`
     * is equal to the product of all the elements of `nums` except `nums[i]`.
     * The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.
     * You must write an algorithm that runs in O(n) time without using the division operation.
     * <p>
     * Example:
     * Input: nums = [1,2,3,4]
     * Output: [24,12,8,6]
     * Explanation:
     * answer[0] = 2 * 3 * 4 = 24
     * answer[1] = 1 * 3 * 4 = 12
     * answer[2] = 1 * 2 * 4 = 8
     * answer[3] = 1 * 2 * 3 = 6
     */
    public int[] productExceptSelf(int[] nums, SolutionApproach approach) {
        if (nums == null || nums.length == 0) {
            return new int[0]; // Or throw IllegalArgumentException
        }

        switch (approach) {
            case BRUTE_FORCE:
                return productExceptSelfBruteForce(nums);
            case PREFIX_SUM: // This refers to prefix/suffix products, not sum. Renamed for clarity.
            case OPTIMIZED:
                return productExceptSelfTwoPass(nums);
            default:
                System.out.println("Unsupported approach for Product Except Self: " + approach);
                // Fallback to two-pass as it's optimal and meets constraints
                return productExceptSelfTwoPass(nums);
        }
    }

    /**
     * Approach 4.1: Product of Array Except Self - Brute Force (using division)
     * Calculate the total product of all elements. Then for each element `nums[i]`,
     * `answer[i]` is `total_product / nums[i]`.
     * This approach has issues with zeros (division by zero) and violates the
     * "no division" constraint.
     * If there are zeros, the logic becomes more complex. If there's one zero,
     * only the element at that zero's index will have a non-zero product. If
     * there are two or more zeros, all elements will have a product of zero.
     * This implementation will handle multiple zeros but still uses division.
     *
     * @param nums The input array.
     * @return An array where answer[i] is the product of all elements except nums[i].
     *
     * Time Complexity: O(n)
     *   - One pass to calculate total product and count zeros.
     *   - One pass to calculate results.
     * Space Complexity: O(1) (excluding output array)
     */
    private int[] productExceptSelfBruteForce(int[] nums) {
        int n = nums.length;
        int[] answer = new int[n];
        int totalProduct = 1;
        int zeroCount = 0;
        int indexOfFirstZero = -1;

        for (int i = 0; i < n; i++) {
            if (nums[i] == 0) {
                zeroCount++;
                if (indexOfFirstZero == -1) {
                    indexOfFirstZero = i;
                }
            } else {
                totalProduct *= nums[i];
            }
        }

        if (zeroCount > 1) {
            // If there are two or more zeros, all products will be 0
            return new int[n]; // All elements already initialized to 0
        } else if (zeroCount == 1) {
            // If there's exactly one zero, only the element at its index will have a non-zero product
            answer[indexOfFirstZero] = totalProduct;
            return answer;
        } else {
            // No zeros, regular division
            for (int i = 0; i < n; i++) {
                answer[i] = totalProduct / nums[i];
            }
            return answer;
        }
    }

    /**
     * Approach 4.2: Product of Array Except Self - Two Pass (Optimal, O(1) Space without output array, no division)
     * This approach fulfills the O(n) time and "no division" constraints.
     * It uses two passes:
     * 1. Left Pass: Calculate prefix products. `answer[i]` stores the product of all elements to its left.
     * 2. Right Pass: Calculate suffix products. Iterate from right to left, multiplying `answer[i]` by the
     *    product of all elements to its right.
     *
     * Initialize `answer` array:
     * `answer[0] = 1` (no elements to the left of the first element)
     * For `i` from 1 to `n-1`: `answer[i] = answer[i-1] * nums[i-1]`
     * After this pass, `answer[i]` contains the product of all elements before `nums[i]`.
     *
     * Then, for the right pass, use a variable `rightProduct` initialized to 1:
     * For `i` from `n-1` down to 0:
     *   `answer[i] = answer[i] * rightProduct` (combine left product with right product)
     *   `rightProduct = rightProduct * nums[i]` (update right product for next iteration)
     *
     * @param nums The input array.
     * @return An array where answer[i] is the product of all elements except nums[i].
     *
     * Time Complexity: O(n)
     *   - One pass for prefix products.
     *   - One pass for suffix products and final calculation.
     * Space Complexity: O(1) (excluding the output array, which is required by the problem statement)
     *   - If the output array is not counted, then it's O(1).
     */
    private int[] productExceptSelfTwoPass(int[] nums) {
        int n = nums.length;
        int[] answer = new int[n];

        // Step 1: Calculate prefix products and store them in the 'answer' array
        // answer[i] will store product of nums[0...i-1]
        answer[0] = 1;
        for (int i = 1; i < n; i++) {
            answer[i] = answer[i - 1] * nums[i - 1];
        }
        // At this point, answer = [1, nums[0], nums[0]*nums[1], ...]
        // e.g., nums = [1,2,3,4] -> answer = [1, 1, 2, 6]

        // Step 2: Calculate suffix products and combine with prefix products
        // 'rightProduct' will store product of nums[i+1...n-1]
        int rightProduct = 1;
        for (int i = n - 1; i >= 0; i--) {
            answer[i] = answer[i] * rightProduct; // Combine left products with right products
            rightProduct *= nums[i]; // Update rightProduct for the next iteration (to the left)
        }
        // Example trace with nums = [1,2,3,4] and initial answer = [1, 1, 2, 6]:
        // i=3: answer[3] = answer[3] * 1 = 6 * 1 = 6. rightProduct = 1 * nums[3] = 1 * 4 = 4. answer = [1,1,2,6]
        // i=2: answer[2] = answer[2] * 4 = 2 * 4 = 8. rightProduct = 4 * nums[2] = 4 * 3 = 12. answer = [1,1,8,6]
        // i=1: answer[1] = answer[1] * 12 = 1 * 12 = 12. rightProduct = 12 * nums[1] = 12 * 2 = 24. answer = [1,12,8,6]
        // i=0: answer[0] = answer[0] * 24 = 1 * 24 = 24. rightProduct = 24 * nums[0] = 24 * 1 = 24. answer = [24,12,8,6]

        return answer;
    }
}
```