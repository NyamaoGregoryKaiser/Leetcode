```javascript
const { reverse } = require('./utils');

/**
 * Problem 1: Maximum Sum of K-sized Subarray
 *
 * Given an array of positive numbers and a positive integer 'k',
 * find the maximum sum of any contiguous subarray of size 'k'.
 */

/**
 * Optimal Solution: Sliding Window
 * Time Complexity: O(N) - We iterate through the array once.
 * Space Complexity: O(1) - We only use a few variables.
 *
 * @param {number[]} nums The input array of numbers.
 * @param {number} k The size of the subarray.
 * @returns {number} The maximum sum of any contiguous subarray of size k.
 */
function maxSubarraySumSlidingWindow(nums, k) {
    // Handle edge cases
    if (!nums || nums.length === 0 || k <= 0 || k > nums.length) {
        if (k === 0 && nums.length > 0) return 0; // Sum of 0 elements is 0
        return 0; // Or throw an error for invalid input
    }

    let windowSum = 0;
    let maxSum = 0;
    let windowStart = 0;

    // Calculate the sum of the first window (initial windowSum and maxSum)
    for (let i = 0; i < k; i++) {
        windowSum += nums[i];
    }
    maxSum = windowSum; // Initialize maxSum with the first window's sum

    // Slide the window across the array
    for (let windowEnd = k; windowEnd < nums.length; windowEnd++) {
        // Subtract the element going out of the window
        windowSum -= nums[windowStart];
        // Add the new element coming into the window
        windowSum += nums[windowEnd];
        // Update maxSum if the current windowSum is greater
        maxSum = Math.max(maxSum, windowSum);
        // Shrink the window from the start
        windowStart++;
    }

    return maxSum;
}


/**
 * Problem 2: Rotate Array
 *
 * Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.
 * The operation must be performed in-place.
 */

/**
 * Approach 1: Brute Force (Iterative shifting)
 * Shifts elements one by one, k times.
 * Time Complexity: O(N * K) - For each of k rotations, we shift N-1 elements.
 * Space Complexity: O(1) - In-place modification.
 *
 * @param {number[]} nums The array to rotate.
 * @param {number} k The number of steps to rotate.
 */
function rotateArrayBruteForce(nums, k) {
    if (!nums || nums.length < 2 || k === 0) {
        return; // No rotation needed or possible
    }

    const n = nums.length;
    k %= n; // Normalize k to be within [0, n-1]

    for (let i = 0; i < k; i++) {
        const lastElement = nums[n - 1]; // Store the last element
        // Shift all elements from right to left by one position
        for (let j = n - 1; j > 0; j--) {
            nums[j] = nums[j - 1];
        }
        nums[0] = lastElement; // Place the stored last element at the beginning
    }
}

/**
 * Approach 2: Using Extra Space (Temporary Array)
 * Create a new array, place elements at their new positions, then copy back.
 * Although this one is technically in-place for interview purposes (as it modifies the original array),
 * it uses O(N) extra space which might not be what O(1) in-place implies.
 * Time Complexity: O(N) - One pass to copy, one pass to copy back.
 * Space Complexity: O(N) - For the temporary array.
 *
 * @param {number[]} nums The array to rotate.
 * @param {number} k The number of steps to rotate.
 */
function rotateArrayExtraSpace(nums, k) {
    if (!nums || nums.length < 2 || k === 0) {
        return;
    }

    const n = nums.length;
    k %= n;

    const temp = new Array(n);
    // Place elements into their new positions in the temp array
    for (let i = 0; i < n; i++) {
        temp[(i + k) % n] = nums[i];
    }

    // Copy elements back to the original array
    for (let i = 0; i < n; i++) {
        nums[i] = temp[i];
    }
}

/**
 * Approach 3: Reversal Algorithm (Optimal In-Place)
 * Reverses parts of the array to achieve rotation.
 * Time Complexity: O(N) - Three reversals, each taking O(N) time.
 * Space Complexity: O(1) - In-place modification.
 *
 * The logic is:
 * 1. Reverse the entire array.
 * 2. Reverse the first k elements.
 * 3. Reverse the remaining n-k elements.
 *
 * @param {number[]} nums The array to rotate.
 * @param {number} k The number of steps to rotate.
 */
function rotateArrayReversal(nums, k) {
    if (!nums || nums.length < 2 || k === 0) {
        return;
    }

    const n = nums.length;
    k %= n; // Normalize k

    // Example: nums = [1,2,3,4,5,6,7], k = 3
    // 1. Reverse entire array: [7,6,5,4,3,2,1]
    reverse(nums, 0, n - 1);
    // 2. Reverse first k elements: [5,6,7,4,3,2,1]
    reverse(nums, 0, k - 1);
    // 3. Reverse remaining n-k elements: [5,6,7,1,2,3,4]
    reverse(nums, k, n - 1);
}

/**
 * Approach 4: Cyclic Replacements (In-Place)
 * Moves elements to their correct positions one by one in cycles.
 * This is conceptually harder but truly O(1) space and O(N) time.
 * Time Complexity: O(N) - Each element is moved exactly once.
 * Space Complexity: O(1) - In-place modification.
 *
 * @param {number[]} nums The array to rotate.
 * @param {number} k The number of steps to rotate.
 */
function rotateArrayCyclicReplacement(nums, k) {
    if (!nums || nums.length < 2 || k === 0) {
        return;
    }

    const n = nums.length;
    k %= n; // Normalize k

    let count = 0; // Count of elements moved
    let start = 0; // Starting point for each cycle

    while (count < n) {
        let current = start;
        let prevValue = nums[start]; // Value to be moved
        do {
            const nextIdx = (current + k) % n; // Calculate the next position
            const temp = nums[nextIdx]; // Store the value at the next position
            nums[nextIdx] = prevValue; // Place the 'prevValue' into 'nextIdx'
            prevValue = temp; // The stored value becomes the 'prevValue' for the next step
            current = nextIdx; // Move to the next position in the cycle
            count++;
        } while (start !== current && count < n); // Continue until cycle completes or all elements are moved
        start++; // Move to the next starting point for a new cycle
    }
}


/**
 * Problem 3: Product of Array Except Self
 *
 * Given an integer array nums, return an array answer such that answer[i] is equal to
 * the product of all the elements of nums except nums[i].
 * The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
 * You must write an algorithm that runs in O(n) time and without using the division operation.
 */

/**
 * Approach 1: Brute Force (with nested loops - for understanding, not optimal)
 * For each element, iterate through the rest of the array to calculate the product.
 * This approach is generally too slow for interview constraints.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N) for the result array.
 *
 * @param {number[]} nums The input array.
 * @returns {number[]} The array of products.
 */
function productExceptSelf(nums) {
    if (!nums || nums.length === 0) return [];
    const n = nums.length;
    const result = new Array(n).fill(1); // Initialize with 1s

    for (let i = 0; i < n; i++) {
        let currentProduct = 1;
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                currentProduct *= nums[j];
            }
        }
        result[i] = currentProduct;
    }
    return result;
}

/**
 * Approach 2: Optimal Solution (Prefix and Suffix Products)
 * Calculates prefix products in one pass and suffix products in another.
 * Time Complexity: O(N) - Two passes through the array.
 * Space Complexity: O(1) (excluding the output array itself, as per problem statement)
 *                   or O(N) if output array counted.
 *
 * @param {number[]} nums The input array.
 * @returns {number[]} The array of products.
 */
function productExceptSelfOptimal(nums) {
    if (!nums || nums.length === 0) return [];
    const n = nums.length;
    const answer = new Array(n);

    // Pass 1: Calculate left products
    // answer[i] will contain the product of all elements to the left of i
    // answer[0] will be 1 (as there are no elements to the left of the first element)
    answer[0] = 1;
    for (let i = 1; i < n; i++) {
        answer[i] = nums[i - 1] * answer[i - 1];
    }

    // Pass 2: Calculate right products and combine with left products
    // `rightProduct` will store the product of all elements to the right of the current index
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        // For the current element, `answer[i]` already holds the left product.
        // Multiply it by the `rightProduct` to get the final result.
        answer[i] = answer[i] * rightProduct;
        // Update `rightProduct` for the next iteration (moving left)
        rightProduct = rightProduct * nums[i];
    }

    return answer;
}


/**
 * Problem 4: Merge Overlapping Intervals
 *
 * Given an array of intervals where intervals[i] = [start_i, end_i],
 * merge all overlapping intervals, and return an array of the non-overlapping
 * intervals that cover all the intervals in the input.
 */

/**
 * Optimal Solution: Sort and Merge
 * Time Complexity: O(N log N) - Dominated by sorting.
 * Space Complexity: O(N) - For storing the merged intervals (in the worst case, no overlap).
 *
 * @param {number[][]} intervals An array of intervals, where each interval is [start, end].
 * @returns {number[][]} An array of merged, non-overlapping intervals.
 */
function mergeIntervals(intervals) {
    if (!intervals || intervals.length <= 1) {
        return intervals;
    }

    // Step 1: Sort the intervals by their start times.
    // If start times are equal, sort by end times (optional, but good for determinism)
    intervals.sort((a, b) => {
        if (a[0] !== b[0]) {
            return a[0] - b[0];
        }
        return a[1] - b[1];
    });

    const merged = [];
    // Add the first interval to the merged list
    merged.push(intervals[0]);

    // Step 2: Iterate through the rest of the intervals and merge
    for (let i = 1; i < intervals.length; i++) {
        const currentInterval = intervals[i];
        const lastMergedInterval = merged[merged.length - 1];

        // Check for overlap: If the current interval's start is less than or equal to
        // the last merged interval's end, they overlap.
        if (currentInterval[0] <= lastMergedInterval[1]) {
            // Merge: Extend the end of the last merged interval
            lastMergedInterval[1] = Math.max(lastMergedInterval[1], currentInterval[1]);
        } else {
            // No overlap: Add the current interval as a new non-overlapping interval
            merged.push(currentInterval);
        }
    }

    return merged;
}

/**
 * Approach 2: Merge Intervals without initial full sort (Less common/efficient for general case)
 * This is generally not advisable or competitive with the sorting approach,
 * as it would involve inserting into a sorted list, which is still O(N) per insertion.
 * A complete sort up front is usually more efficient.
 * This is primarily for demonstrating an alternative thought process that might try to avoid `sort()`.
 * But in JS, `sort()` is efficient.
 *
 * This version will *still* need sorting or a similar structure if intervals are completely unsorted.
 * The core challenge is making sure intervals are processed in an order that allows merging.
 * Without an initial sort, finding the correct interval to merge with is costly.
 *
 * Here, for illustrative purposes, let's just make it clear that without sorting,
 * the problem becomes much harder to solve efficiently. This function will explicitly mention it.
 *
 * @param {number[][]} intervals An array of intervals, where each interval is [start, end].
 * @returns {number[][]} An array of merged, non-overlapping intervals.
 */
function mergeIntervalsNoSort(intervals) {
    // This function will simply highlight that without sorting, an efficient
    // solution to merge ALL overlapping intervals is extremely difficult or impossible
    // while maintaining O(N log N) or O(N) time complexity for arbitrary input.
    // A naive approach would be to take an interval and compare it with ALL other intervals,
    // merging where possible, and repeating until no more merges can be made.
    // This leads to O(N^2) or worse.

    // For practical purposes in an interview, if sorting is not explicitly forbidden,
    // it's almost always the first and best approach for this problem.
    // If it were forbidden, the constraints on intervals (e.g., they are already sorted,
    // or they are within a small fixed range) would need to be very different.

    // To prevent confusion, this version will simply call the sorted one and explain.
    console.warn("`mergeIntervalsNoSort` is generally not an efficient approach for " +
                 "arbitrarily unsorted intervals to achieve O(N log N). " +
                 "The optimal solution *requires* an initial sort.");
    return mergeIntervals(intervals); // Fallback to the sorted approach
}


module.exports = {
    maxSubarraySumSlidingWindow,
    rotateArrayBruteForce,
    rotateArrayExtraSpace,
    rotateArrayReversal,
    rotateArrayCyclicReplacement,
    productExceptSelf, // Brute force
    productExceptSelfOptimal, // Optimal
    mergeIntervals, // Optimal with sort
    mergeIntervalsNoSort // Illustrative, points to sorting as necessity
};
```