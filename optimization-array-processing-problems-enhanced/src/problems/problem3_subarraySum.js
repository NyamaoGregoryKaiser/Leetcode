```javascript
/**
 * Problem 3: Subarray Sum Equals K
 *
 * Given an array of integers `nums` and an integer `k`, return the total number of
 * continuous subarrays whose sum equals `k`.
 *
 * A subarray is a contiguous non-empty sequence of elements within an array.
 *
 * Example 1:
 * Input: nums = [1,1,1], k = 2
 * Output: 2
 * Explanation: The subarrays are [1,1] (sum=2) and [1,1] (sum=2). There are two such subarrays.
 *
 * Example 2:
 * Input: nums = [1,2,3], k = 3
 * Output: 2
 * Explanation: The subarrays are [1,2] (sum=3) and [3] (sum=3).
 *
 * Constraints:
 * 1 <= nums.length <= 2 * 10^4
 * -1000 <= nums[i] <= 1000
 * -10^7 <= k <= 10^7
 */

/**
 * Approach 1: Brute Force
 *
 * This approach iterates through all possible continuous subarrays and calculates their sum.
 * For each starting index `i`, it iterates through all possible ending indices `j` (where `j >= i`).
 * The sum of `nums[i...j]` is calculated and compared to `k`.
 *
 * @param {number[]} nums The array of integers.
 * @param {number} k The target sum.
 * @returns {number} The total number of subarrays whose sum equals `k`.
 */
function subarraySumBruteForce(nums, k) {
    let count = 0;
    const n = nums.length;

    // Iterate over all possible starting points `i`
    for (let i = 0; i < n; i++) {
        let currentSum = 0;
        // Iterate over all possible ending points `j` for the current `i`
        for (let j = i; j < n; j++) {
            currentSum += nums[j]; // Add current element to the sum of subarray [i...j]
            if (currentSum === k) {
                count++;
            }
        }
    }
    return count;
}

/**
 * Complexity Analysis for subarraySumBruteForce:
 * - Time Complexity: O(N^2)
 *   - The outer loop runs N times.
 *   - The inner loop runs N times in the worst case (when i=0).
 *   - Inside the inner loop, constant time operations are performed.
 *   - Total: N * N = N^2 operations.
 * - Space Complexity: O(1)
 *   - Only a few constant extra variables are used.
 */


/**
 * Approach 2: Optimal - Prefix Sums with Hash Map
 *
 * This approach uses the concept of prefix sums and a hash map to achieve O(N) time complexity.
 *
 * Let `P[i]` be the prefix sum `nums[0] + nums[1] + ... + nums[i-1]`.
 * Then the sum of any subarray `nums[i...j]` can be calculated as `P[j+1] - P[i]`.
 * We are looking for subarrays where `P[j+1] - P[i] = k`.
 * Rearranging this, we get `P[i] = P[j+1] - k`.
 *
 * As we iterate through the array and calculate the current prefix sum (`currentSum`):
 * - We check if `currentSum - k` exists in our hash map.
 * - If it does, it means there was a previous prefix sum `P[i]` such that `P[j+1] - P[i] = k`.
 *   The number of times `P[i]` has occurred tells us how many subarrays ending at `j` have sum `k`.
 * - We then add `currentSum` to our hash map, incrementing its count.
 *
 * The hash map stores `(prefix_sum -> count_of_occurrences)`.
 *
 * Example Walkthrough: `nums = [1,1,1], k = 2`
 * - `map = {0: 1}` (Initialize with prefix sum 0 occurring once, for the case where `currentSum === k`)
 * - `currentSum = 0`, `count = 0`
 *
 * 1. `num = 1` (i=0)
 *    - `currentSum = 0 + 1 = 1`
 *    - `neededSum = currentSum - k = 1 - 2 = -1`
 *    - `map.has(-1)`? No.
 *    - `map.set(1, (map.get(1) || 0) + 1)` -> `map = {0: 1, 1: 1}`
 *
 * 2. `num = 1` (i=1)
 *    - `currentSum = 1 + 1 = 2`
 *    - `neededSum = currentSum - k = 2 - 2 = 0`
 *    - `map.has(0)`? Yes, count is 1.
 *    - `count += map.get(0)` -> `count = 0 + 1 = 1` (Subarray [1,1] has sum 2)
 *    - `map.set(2, (map.get(2) || 0) + 1)` -> `map = {0: 1, 1: 1, 2: 1}`
 *
 * 3. `num = 1` (i=2)
 *    - `currentSum = 2 + 1 = 3`
 *    - `neededSum = currentSum - k = 3 - 2 = 1`
 *    - `map.has(1)`? Yes, count is 1.
 *    - `count += map.get(1)` -> `count = 1 + 1 = 2` (Subarray [1,1] from index 1 has sum 2)
 *    - `map.set(3, (map.get(3) || 0) + 1)` -> `map = {0: 1, 1: 1, 2: 1, 3: 1}`
 *
 * Final `count = 2`.
 *
 * @param {number[]} nums The array of integers.
 * @param {number} k The target sum.
 * @returns {number} The total number of subarrays whose sum equals `k`.
 */
function subarraySumOptimal(nums, k) {
    let count = 0;
    let currentSum = 0;
    // Map to store (prefix_sum -> count_of_occurrences)
    // Initialize with {0: 1} to handle cases where the entire array up to current index
    // sums to k (i.e., currentSum - k = 0, and we need prefix sum 0).
    const sumCountMap = new Map();
    sumCountMap.set(0, 1);

    for (let i = 0; i < nums.length; i++) {
        currentSum += nums[i];

        // If (currentSum - k) exists in the map, it means there's a prefix sum `x` such that
        // `currentSum - x = k`. The count of `x` in the map tells us how many such subarrays exist.
        if (sumCountMap.has(currentSum - k)) {
            count += sumCountMap.get(currentSum - k);
        }

        // Add the current prefix sum to the map (or increment its count)
        sumCountMap.set(currentSum, (sumCountMap.get(currentSum) || 0) + 1);
    }

    return count;
}

/**
 * Complexity Analysis for subarraySumOptimal:
 * - Time Complexity: O(N)
 *   - We iterate through the array once.
 *   - Map operations (get, set, has) on average take O(1) time.
 *   - Total: O(N).
 * - Space Complexity: O(N)
 *   - In the worst case, all prefix sums are unique, so the map stores N entries.
 *   - Total: O(N).
 */

module.exports = {
    subarraySumBruteForce,
    subarraySumOptimal, // Optimal solution
};
```