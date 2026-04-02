```typescript
/**
 * @fileoverview Brute-force or less optimal solutions for array manipulation problems.
 * These implementations are provided to illustrate alternative (often less efficient)
 * approaches and highlight the benefits of optimization.
 */

// Problem 1: Rotate Array (Brute Force / Auxiliary Array)

/**
 * Rotates an array to the right by k steps using an auxiliary array.
 * This is a straightforward approach but uses O(N) extra space.
 *
 * The algorithm works by creating a new array, placing elements from `nums`
 * into their rotated positions, and then copying the new array back to `nums`.
 *
 * @param nums The array of numbers to rotate. Modified in-place.
 * @param k The number of steps to rotate the array to the right.
 * @returns void (modifies nums in-place).
 *
 * Time Complexity: O(N), where N is the number of elements in `nums`.
 *   - One pass to populate the new array, one pass to copy back.
 * Space Complexity: O(N)
 *   - An auxiliary array of size N is created.
 */
export function rotateArrayBruteForce(nums: number[], k: number): void {
    const n = nums.length;
    if (n === 0 || k === 0) {
        return;
    }

    k %= n; // Handle cases where k > n

    if (k === 0) {
        return;
    }

    const rotated = new Array(n);
    for (let i = 0; i < n; i++) {
        // Calculate the new position for each element.
        // (i + k) % n gives the new index after rotating right by k steps.
        rotated[(i + k) % n] = nums[i];
    }

    // Copy elements back to the original array
    for (let i = 0; i < n; i++) {
        nums[i] = rotated[i];
    }
}

// Problem 2: Product of Array Except Self (Brute Force - using division implicitly)

/**
 * Calculates the product of all elements except self for each element.
 * This version uses division and handles zero values carefully.
 * This is generally not the preferred solution for interview problems that
 * explicitly forbid division, but it's an alternative.
 *
 * The algorithm calculates the total product of the array.
 * Then, for each element, it divides the total product by that element.
 * Special handling is required for zeros:
 * - If there are two or more zeros, all results will be zero.
 * - If there is exactly one zero, only the element at the zero's index will
 *   have a non-zero product (product of all other numbers).
 * - If no zeros, standard division applies.
 *
 * @param nums The input array of integers.
 * @returns An array where `answer[i]` is the product of all elements in `nums` except `nums[i]`.
 *
 * Time Complexity: O(N), where N is the number of elements in `nums`.
 *   - One pass to find total product and count zeros.
 *   - One pass to compute results.
 * Space Complexity: O(1) (excluding the output array).
 */
export function productExceptSelfBruteForceWithDivision(nums: number[]): number[] {
    const n = nums.length;
    const answer: number[] = new Array(n).fill(0); // Initialize with 0 for safety

    if (n === 0) {
        return [];
    }
    if (n === 1) {
        return [1];
    }

    let totalProduct = 1;
    let zeroCount = 0;
    let indexOfSingleZero = -1;

    // First pass: calculate total product and count zeros
    for (let i = 0; i < n; i++) {
        if (nums[i] === 0) {
            zeroCount++;
            indexOfSingleZero = i;
            continue; // Skip multiplying by zero to avoid making totalProduct 0 prematurely
        }
        totalProduct *= nums[i];
    }

    // Second pass: fill the answer array
    if (zeroCount > 1) {
        // If two or more zeros, all products will be 0
        return answer; // Already filled with zeros
    } else if (zeroCount === 1) {
        // If exactly one zero, only that position will have a non-zero product
        answer[indexOfSingleZero] = totalProduct; // totalProduct here is product of non-zero elements
        return answer; // Other positions remain 0
    } else {
        // No zeros, regular division
        for (let i = 0; i < n; i++) {
            answer[i] = totalProduct / nums[i];
        }
    }

    return answer;
}


// Problem 3: Merge Intervals (Brute Force - O(N^2) comparison)

/**
 * Merges overlapping intervals using a brute-force approach.
 * This method involves repeatedly iterating and merging until no more merges are possible.
 * It's less efficient than the sort-based approach.
 *
 * @param intervals An array of intervals, where each interval is [start, end].
 * @returns An array of non-overlapping intervals.
 *
 * Time Complexity: O(N^2) in the worst case, where N is the number of intervals.
 *   - In each pass, we might find one merge. If there are many overlaps, multiple passes
 *     might be needed. Each pass iterates N elements.
 *   - E.g., [[1,10],[2,3],[4,5],[6,7]] would require several passes.
 * Space Complexity: O(N) for the new array each time we merge.
 */
export function mergeIntervalsBruteForce(intervals: number[][]): number[][] {
    if (intervals.length <= 1) {
        return intervals;
    }

    let merged = false;
    // We need to keep iterating as long as we make merges
    // because merging [1,5] and [4,8] creates [1,8], which might then merge with [7,10]
    // which was not adjacent to [1,5] initially.
    do {
        merged = false;
        const newIntervals: number[][] = [];
        const used = new Array(intervals.length).fill(false);

        for (let i = 0; i < intervals.length; i++) {
            if (used[i]) continue;

            let current = intervals[i];
            let foundOverlap = false;

            for (let j = i + 1; j < intervals.length; j++) {
                if (used[j]) continue;

                const next = intervals[j];

                // Check for overlap: [a,b] and [c,d] overlap if a <= d AND c <= b
                if (Math.max(current[0], next[0]) <= Math.min(current[1], next[1])) {
                    // Overlap found, merge them
                    current = [Math.min(current[0], next[0]), Math.max(current[1], next[1])];
                    used[j] = true; // Mark next interval as used
                    foundOverlap = true;
                    merged = true; // Indicate that a merge happened
                }
            }
            newIntervals.push(current);
        }
        intervals = newIntervals; // Update intervals for the next pass
    } while (merged);

    // After all merges, the intervals might not be sorted, so sort them for consistent output.
    // This sorting adds O(N log N) to the overall complexity.
    // Without this final sort, the output order is unpredictable.
    intervals.sort((a, b) => a[0] - b[0]);

    return intervals;
}

// Problem 4: Trapping Rain Water (Dynamic Programming approach)

/**
 * Calculates the amount of rain water that can be trapped using Dynamic Programming.
 * This approach achieves O(N) time complexity and O(N) extra space complexity.
 *
 * The algorithm works in three passes:
 * 1. Create a `leftMax` array: `leftMax[i]` stores the maximum height of a bar to the left
 *    of or including `i`.
 * 2. Create a `rightMax` array: `rightMax[i]` stores the maximum height of a bar to the right
 *    of or including `i`.
 * 3. Iterate through the `height` array. For each bar at index `i`, the amount of water it can trap is:
 *    `min(leftMax[i], rightMax[i]) - height[i]`. Sum these values.
 *
 * @param height An array of non-negative integers representing the elevation map.
 * @returns The total amount of rain water that can be trapped.
 *
 * Time Complexity: O(N), where N is the number of bars (elements in `height`).
 *   - One pass to fill `leftMax`, one pass to fill `rightMax`, one pass to calculate water.
 * Space Complexity: O(N)
 *   - Two auxiliary arrays (`leftMax` and `rightMax`), each of size N, are created.
 */
export function trapRainWaterDP(height: number[]): number {
    const n = height.length;
    if (n <= 2) {
        return 0;
    }

    // Step 1: Create leftMax array
    const leftMax: number[] = new Array(n).fill(0);
    leftMax[0] = height[0];
    for (let i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], height[i]);
    }

    // Step 2: Create rightMax array
    const rightMax: number[] = new Array(n).fill(0);
    rightMax[n - 1] = height[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], height[i]);
    }

    // Step 3: Calculate trapped water
    let totalWater = 0;
    for (let i = 0; i < n; i++) {
        // The amount of water trapped above bar `i` is determined by the minimum
        // of the maximum height to its left and its right, minus its own height.
        totalWater += Math.max(0, Math.min(leftMax[i], rightMax[i]) - height[i]);
    }

    return totalWater;
}
```