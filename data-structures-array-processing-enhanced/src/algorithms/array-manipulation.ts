```typescript
/**
 * @fileoverview Optimal solutions for common array manipulation problems.
 * Each problem includes detailed comments explaining the logic, time, and space complexity.
 */

import { reverseSubarray } from '../utils/array-helpers';

// Problem 1: Rotate Array
// Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.

/**
 * Rotates an array to the right by k steps using the Reversal Algorithm.
 * This is an in-place algorithm that achieves O(1) extra space complexity.
 *
 * The algorithm works in three steps:
 * 1. Reverse the entire array.
 *    Example: [1,2,3,4,5,6,7], k = 3
 *             -> [7,6,5,4,3,2,1]
 * 2. Reverse the first k elements.
 *    Example: [7,6,5,4,3,2,1]
 *             -> [5,6,7,4,3,2,1] (first 3 elements: 7,6,5 reversed to 5,6,7)
 * 3. Reverse the remaining n-k elements.
 *    Example: [5,6,7,4,3,2,1]
 *             -> [5,6,7,1,2,3,4] (remaining 4 elements: 4,3,2,1 reversed to 1,2,3,4)
 * The array is now rotated.
 *
 * @param nums The array of numbers to rotate. Modified in-place.
 * @param k The number of steps to rotate the array to the right.
 * @returns void (modifies nums in-place).
 *
 * Time Complexity: O(N), where N is the number of elements in `nums`.
 *   - Each reversal takes O(N) operations, and there are three reversals.
 * Space Complexity: O(1)
 *   - Only a few extra variables are used, no additional data structures proportional to input size.
 */
export function rotateArray(nums: number[], k: number): void {
    const n = nums.length;
    if (n === 0 || k === 0) {
        return; // No rotation needed for empty array or zero steps
    }

    // Ensure k is within the bounds of array length (k can be larger than n)
    // Rotating k times is equivalent to rotating k % n times.
    k %= n;

    // If k is 0 after modulo, no rotation is needed
    if (k === 0) {
        return;
    }

    // Step 1: Reverse the entire array
    // Example: [1,2,3,4,5,6,7], k=3 -> [7,6,5,4,3,2,1]
    reverseSubarray(nums, 0, n - 1);

    // Step 2: Reverse the first k elements
    // Example: [7,6,5,4,3,2,1] -> [5,6,7,4,3,2,1]
    reverseSubarray(nums, 0, k - 1);

    // Step 3: Reverse the remaining n-k elements
    // Example: [5,6,7,4,3,2,1] -> [5,6,7,1,2,3,4]
    reverseSubarray(nums, k, n - 1);
}

// Problem 2: Product of Array Except Self
// Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].
// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
// You must write an algorithm that runs in O(N) time and without using the division operation.

/**
 * Calculates the product of all elements except self for each element in the array.
 * Achieves O(N) time complexity and O(1) auxiliary space complexity (excluding the output array).
 * The output array is considered required space and not extra space.
 *
 * The algorithm uses two passes:
 * 1. First pass (left-to-right): Calculate the product of all elements to the left of each index.
 *    Store these in the `result` array. `result[i]` will temporarily hold product of `nums[0...i-1]`.
 *    Initialize `result[0] = 1`.
 * 2. Second pass (right-to-left): Calculate the product of all elements to the right of each index.
 *    Multiply this right product with the already accumulated left product in `result[i]`.
 *    Maintain a `rightProduct` variable, initialized to 1.
 *
 * @param nums The input array of integers.
 * @returns An array where `answer[i]` is the product of all elements in `nums` except `nums[i]`.
 *
 * Time Complexity: O(N), where N is the number of elements in `nums`.
 *   - Two passes over the array, each taking O(N) time.
 * Space Complexity: O(1) (excluding the output array `answer`).
 *   - If the output array counts towards space, then it's O(N).
 */
export function productExceptSelf(nums: number[]): number[] {
    const n = nums.length;
    const answer: number[] = new Array(n).fill(1); // Initialize answer array with 1s

    if (n === 0) {
        return [];
    }
    if (n === 1) {
        return [1]; // Product of an empty set is 1, as per problem constraints and edge cases
    }

    // First pass: Calculate left products
    // answer[i] will store product of nums[0] * ... * nums[i-1]
    let leftProduct = 1;
    for (let i = 0; i < n; i++) {
        answer[i] = leftProduct; // Store product of elements to the left of i
        leftProduct *= nums[i]; // Update leftProduct for the next iteration
    }
    // After this loop, for i=0, answer[0]=1. For i>0, answer[i] = nums[0] * ... * nums[i-1]

    // Second pass: Calculate right products and multiply with left products
    // rightProduct will store product of nums[i+1] * ... * nums[n-1]
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        answer[i] *= rightProduct; // Multiply current left product (answer[i]) by right product
        rightProduct *= nums[i];   // Update rightProduct for the next iteration
    }
    // After this loop, answer[i] holds (product of elements to the left of i) * (product of elements to the right of i)

    return answer;
}

// Problem 3: Merge Intervals
// Given an array of intervals where intervals[i] = [start, end], merge all overlapping intervals,
// and return an array of the non-overlapping intervals that cover all the intervals in the input.

interface Interval {
    start: number;
    end: number;
}

/**
 * Merges overlapping intervals in an array.
 * Achieves O(N log N) time complexity and O(N) space complexity.
 *
 * The algorithm works in two main steps:
 * 1. Sort the intervals based on their start times. This is crucial
 *    because it ensures that when we consider an interval, all potential
 *    overlapping intervals that start *before* it have already been processed
 *    or are immediately next in line.
 * 2. Iterate through the sorted intervals. Maintain a `mergedIntervals` list.
 *    For each interval:
 *    - If `mergedIntervals` is empty, or the current interval's start is
 *      greater than the end of the last merged interval, then there's no
 *      overlap. Add the current interval to `mergedIntervals`.
 *    - Otherwise (if there's an overlap), merge the current interval with
 *      the last merged interval by updating the end of the last merged
 *      interval to be the maximum of its current end and the current
 *      interval's end.
 *
 * @param intervals An array of intervals, where each interval is [start, end].
 * @returns An array of non-overlapping intervals.
 *
 * Time Complexity: O(N log N), where N is the number of intervals.
 *   - Dominated by the sorting step (O(N log N)).
 *   - The iteration through sorted intervals takes O(N) time.
 * Space Complexity: O(N)
 *   - For storing the sorted intervals (if not in-place sort, or copy) and the `mergedIntervals` array.
 *   - In TypeScript, `sort` often uses extra space depending on implementation. `mergedIntervals` takes up to O(N) space.
 */
export function mergeIntervals(intervals: number[][]): number[][] {
    if (intervals.length <= 1) {
        return intervals; // No merging needed for 0 or 1 interval
    }

    // 1. Sort intervals by their start times
    // O(N log N) time, O(N) space (for sort, depending on implementation)
    intervals.sort((a, b) => a[0] - b[0]);

    const mergedIntervals: number[][] = [];

    // 2. Iterate through sorted intervals and merge
    // O(N) time
    for (const currentInterval of intervals) {
        // If the mergedIntervals list is empty or the current interval does not overlap
        // with the last merged interval (i.e., its start is after the last merged interval's end),
        // then add the current interval as a new interval.
        if (mergedIntervals.length === 0 || currentInterval[0] > mergedIntervals[mergedIntervals.length - 1][1]) {
            mergedIntervals.push(currentInterval);
        } else {
            // Otherwise, there is an overlap. Merge the current interval with the last one.
            // Update the end of the last merged interval to be the maximum of its current end
            // and the current interval's end.
            mergedIntervals[mergedIntervals.length - 1][1] = Math.max(
                mergedIntervals[mergedIntervals.length - 1][1],
                currentInterval[1]
            );
        }
    }

    return mergedIntervals;
}


// Problem 4: Trapping Rain Water
// Given n non-negative integers representing an elevation map where the width of each bar is 1,
// compute how much water it can trap after raining.

/**
 * Calculates the amount of rain water that can be trapped using the Two-Pointer approach.
 * This approach achieves O(N) time complexity and O(1) extra space complexity.
 *
 * The core idea is that the amount of water trapped at a certain position `i` depends on the
 * maximum height of bars to its left and to its right. Specifically, `water[i] = max(0, min(leftMax, rightMax) - height[i])`.
 *
 * The two-pointer approach avoids explicit computation of `leftMax` and `rightMax` arrays by
 * moving pointers inwards from both ends of the `height` array.
 *
 * - Initialize `left = 0`, `right = n - 1`.
 * - Initialize `leftMax = 0`, `rightMax = 0`.
 * - Initialize `totalWater = 0`.
 *
 * - While `left < right`:
 *   - If `height[left] < height[right]`:
 *     - If `height[left] >= leftMax`: Update `leftMax = height[left]`. (No water trapped here as it's a new max)
 *     - Else (`height[left] < leftMax`): Water can be trapped. Add `leftMax - height[left]` to `totalWater`.
 *     - Move `left` pointer: `left++`.
 *   - Else (`height[right] <= height[left]`):
 *     - If `height[right] >= rightMax`: Update `rightMax = height[right]`. (No water trapped here)
 *     - Else (`height[right] < rightMax`): Water can be trapped. Add `rightMax - height[right]` to `totalWater`.
 *     - Move `right` pointer: `right--`.
 *
 * The logic `height[left] < height[right]` ensures that when we process `height[left]`, we are
 * certain that there is a bar `height[right]` that is at least as tall as `height[left]`,
 * meaning `leftMax` is the *bottleneck* on the left side. Symmetrically for the right side.
 *
 * @param height An array of non-negative integers representing the elevation map.
 * @returns The total amount of rain water that can be trapped.
 *
 * Time Complexity: O(N), where N is the number of bars (elements in `height`).
 *   - The two pointers traverse the array once from ends to the middle.
 * Space Complexity: O(1)
 *   - Only a few variables are used to store pointers and max heights.
 */
export function trapRainWater(height: number[]): number {
    const n = height.length;
    if (n <= 2) {
        return 0; // Cannot trap water with 0, 1, or 2 bars
    }

    let left = 0;
    let right = n - 1;
    let leftMax = 0;
    let rightMax = 0;
    let totalWater = 0;

    // The loop continues as long as the left pointer is less than the right pointer.
    while (left < right) {
        // Compare the heights at the current left and right pointers.
        // We always process the side with the smaller height, because that side
        // is the limiting factor for water trapping in its current "segment".
        if (height[left] < height[right]) {
            // If the current left bar is taller than or equal to the current max height seen from the left,
            // then it becomes the new leftMax. No water can be trapped at this specific bar.
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                // If the current left bar is shorter than the leftMax, it means water can be trapped above it.
                // The amount of water is the difference between leftMax and the current bar's height.
                totalWater += leftMax - height[left];
            }
            // Move the left pointer one step to the right.
            left++;
        } else {
            // Symmetrical logic for the right side when height[right] is smaller or equal to height[left].
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                totalWater += rightMax - height[right];
            }
            // Move the right pointer one step to the left.
            right--;
        }
    }

    return totalWater;
}
```