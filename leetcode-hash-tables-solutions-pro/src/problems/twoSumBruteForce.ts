```typescript
/**
 * Given an array of integers `nums` and an integer `target`,
 * return indices of the two numbers such that they add up to `target`.
 *
 * You may assume that each input would have exactly one solution,
 * and you may not use the same element twice.
 *
 * You can return the answer in any order.
 *
 * This file provides a brute-force solution for comparison with the optimal Hash Map solution.
 */

/**
 * Brute-Force Solution: Using nested loops.
 *
 * Approach:
 * 1. Iterate through the array with an outer loop using index `i` from 0 to `nums.length - 2`.
 * 2. For each `nums[i]`, start an inner loop with index `j` from `i + 1` to `nums.length - 1`.
 *    This ensures that we don't use the same element twice and avoid redundant pairs (e.g., [0,1] vs [1,0]).
 * 3. Inside the inner loop, check if `nums[i] + nums[j]` equals `target`.
 * 4. If they do, return `[i, j]`.
 * 5. If no such pair is found after checking all combinations, return an empty array
 *    (though problem constraints suggest a solution will always exist).
 *
 * Time Complexity: O(N^2)
 * The nested loops mean that for each element, we potentially iterate through the rest of the array.
 * If the array has N elements, the outer loop runs N times, and the inner loop runs up to N-1 times.
 * This results in approximately N * (N-1)/2 operations, which simplifies to O(N^2).
 *
 * Space Complexity: O(1)
 * No additional data structures are used beyond a few variables for loop indices and sum.
 */
export function twoSumBruteForce(nums: number[], target: number): number[] {
    const n = nums.length;

    // Outer loop iterates from the first element up to the second-to-last element.
    // We need at least two elements to form a pair.
    for (let i = 0; i < n - 1; i++) {
        // Inner loop starts from the element *after* the current outer loop element.
        // This ensures we pick distinct elements and avoid checking the same pair twice.
        for (let j = i + 1; j < n; j++) {
            // Check if the sum of the two elements equals the target.
            if (nums[i] + nums[j] === target) {
                // If found, return their indices.
                return [i, j];
            }
        }
    }

    // If no solution is found after checking all possible pairs, return an empty array.
    // (As per problem description, this path should not be reached).
    return [];
}
```