```typescript
/**
 * @fileoverview Implementations for finding the length of the Longest Increasing Subsequence (LIS).
 * Given an integer array nums, return the length of the longest strictly increasing subsequence.
 * A subsequence is a sequence that can be derived from an array by deleting some or no elements
 * without changing the order of the remaining elements.
 * For example, [3,6,2,7] is a subsequence of the array [0,3,1,6,2,2,7].
 */

/**
 * 1. Recursive (Brute Force)
 * Calculates the length of LIS using a naive recursive approach.
 * This method considers all possible subsequences, leading to exponential time complexity.
 *
 * Time Complexity: O(2^n) - For each element, we either include it or exclude it.
 * Space Complexity: O(n) - Due to recursion stack depth.
 *
 * @param nums The input array of numbers.
 * @returns The length of the longest increasing subsequence.
 */
export function lis_recursive(nums: number[]): number {
    const n = nums.length;
    let maxLength = 0;

    // Helper function to find LIS ending at index `currentIdx`
    // with `prevElement` being the last element included in the subsequence.
    function findLIS(currentIdx: number, prevElement: number): number {
        // Base case: If we have processed all elements, return 0.
        if (currentIdx === n) {
            return 0;
        }

        // Option 1: Exclude the current element (nums[currentIdx])
        let lenExclude = findLIS(currentIdx + 1, prevElement);

        // Option 2: Include the current element if it's greater than the previous element
        let lenInclude = 0;
        if (nums[currentIdx] > prevElement) {
            lenInclude = 1 + findLIS(currentIdx + 1, nums[currentIdx]);
        }

        // Return the maximum of the two options
        return Math.max(lenExclude, lenInclude);
    }

    // Start the recursion. Use negative infinity as the initial previous element
    // to ensure the first element of nums can always be included.
    maxLength = findLIS(0, -Infinity);

    return maxLength;
}

/**
 * 2. Memoization (Top-Down Dynamic Programming)
 * Calculates the length of LIS using memoization to store results of subproblems.
 * This approach avoids redundant calculations by caching the LIS length for
 * a given `currentIdx` and `prevIdx`.
 *
 * Time Complexity: O(n^2) - There are n * n states (currentIdx, prevIdx), and each state takes O(1) to compute.
 * Space Complexity: O(n^2) - For the memoization table and recursion stack.
 *
 * @param nums The input array of numbers.
 * @returns The length of the longest increasing subsequence.
 */
export function lis_memoized(nums: number[]): number {
    const n = nums.length;
    // memo[currentIdx][prevIdx + 1] stores the LIS length.
    // prevIdx + 1 is used because prevIdx can be -1 (no previous element),
    // so we shift indices to make it 0-based for array access.
    const memo: number[][] = Array(n)
        .fill(0)
        .map(() => Array(n + 1).fill(-1));

    function findLIS(currentIdx: number, prevIdx: number): number {
        if (currentIdx === n) {
            return 0;
        }

        // Adjust prevIdx for memoization table access
        const memoPrevIdx = prevIdx + 1;

        // Check if the result is already computed
        if (memo[currentIdx][memoPrevIdx] !== -1) {
            return memo[currentIdx][memoPrevIdx];
        }

        // Option 1: Exclude the current element
        let lenExclude = findLIS(currentIdx + 1, prevIdx);

        // Option 2: Include the current element if it's greater than the previous one
        let lenInclude = 0;
        if (prevIdx === -1 || nums[currentIdx] > nums[prevIdx]) {
            lenInclude = 1 + findLIS(currentIdx + 1, currentIdx);
        }

        // Store and return the maximum of the two options
        const result = Math.max(lenExclude, lenInclude);
        memo[currentIdx][memoPrevIdx] = result;
        return result;
    }

    // Start the recursion with currentIdx = 0 and prevIdx = -1 (no element chosen yet)
    return findLIS(0, -1);
}

/**
 * 3. Tabulation (Bottom-Up Dynamic Programming)
 * Calculates the length of LIS iteratively using a DP array.
 * `dp[i]` stores the length of the LIS ending at index `i`.
 * To calculate `dp[i]`, we look at all `dp[j]` where `j < i` and `nums[j] < nums[i]`.
 * `dp[i] = 1 + max(dp[j])` for all valid `j`, or `1` if no such `j` exists.
 * The overall LIS is the maximum value in the `dp` array.
 *
 * Time Complexity: O(n^2) - Two nested loops, each iterating up to n times.
 * Space Complexity: O(n) - For the DP array.
 *
 * @param nums The input array of numbers.
 * @returns The length of the longest increasing subsequence.
 */
export function lis_tabulated(nums: number[]): number {
    const n = nums.length;
    if (n === 0) return 0;

    // dp[i] stores the length of the LIS ending at index i.
    // Initialize all dp[i] to 1, because each element itself is an LIS of length 1.
    const dp: number[] = new Array(n).fill(1);
    let maxLength = 1;

    // Iterate through the array starting from the second element
    for (let i = 1; i < n; i++) {
        // For each element nums[i], look at all elements before it (nums[j])
        for (let j = 0; j < i; j++) {
            // If nums[i] can extend the LIS ending at nums[j]
            if (nums[i] > nums[j]) {
                // Update dp[i] if we found a longer LIS
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        // Update the overall maximum LIS length found so far
        maxLength = Math.max(maxLength, dp[i]);
    }

    return maxLength;
}

/**
 * 4. N log N approach (using patience sorting / binary search)
 * Calculates the length of LIS in O(N log N) time complexity.
 * This approach maintains an array `tails` where `tails[i]` stores the smallest
 * tail of all increasing subsequences of length `i+1`.
 * When iterating through `nums`:
 * - If `num` is greater than all `tails`, extend the longest subsequence.
 * - If `num` is smaller than or equal to some `tails`, find the smallest `tail` that is >= `num`
 *   and replace it with `num`. This ensures `tails` remains sorted and we are choosing the
 *   smallest possible ending for subsequences of a given length, allowing for longer subsequences later.
 * Binary search is used to find the correct position to insert/replace in `tails`.
 *
 * Time Complexity: O(n log n) - Each number leads to a binary search in `tails` array.
 * Space Complexity: O(n) - For the `tails` array.
 *
 * @param nums The input array of numbers.
 * @returns The length of the longest increasing subsequence.
 */
export function lis_nLogn(nums: number[]): number {
    if (nums.length === 0) return 0;

    // tails[i] is the smallest end element of an increasing subsequence of length i+1.
    // The tails array will always be sorted in increasing order.
    const tails: number[] = [];

    for (const num of nums) {
        // Use binary search to find the position to insert 'num'
        let i = 0;
        let j = tails.length;

        while (i < j) {
            const mid = Math.floor((i + j) / 2);
            if (tails[mid] < num) {
                i = mid + 1;
            } else {
                j = mid;
            }
        }

        // If 'num' is greater than all existing tails,
        // it means we can extend the longest subsequence found so far.
        if (i === tails.length) {
            tails.push(num);
        } else {
            // Otherwise, replace the smallest tail greater than or equal to 'num'
            // with 'num'. This creates a new increasing subsequence of the same length
            // but with a smaller ending element, which is more "flexible" for future elements.
            tails[i] = num;
        }
    }

    // The length of the 'tails' array is the length of the LIS.
    return tails.length;
}
```