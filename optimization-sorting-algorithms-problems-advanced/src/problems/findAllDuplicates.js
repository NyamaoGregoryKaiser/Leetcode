/**
 * src/problems/findAllDuplicates.js
 *
 * Problem: Find All Duplicates in an Array
 * Given an array of integers `nums` of length `n` where all integers are in the range `[1, n]`
 * and each integer appears once or twice, return an array of all the integers that appear twice.
 *
 * You must write an algorithm that runs in O(N) time and uses only O(1) additional space.
 *
 * Example:
 * Input: nums = [4,3,2,7,8,2,3,1]
 * Output: [2,3]
 *
 * Input: nums = [1,1,2]
 * Output: [1]
 *
 * Input: nums = [1]
 * Output: []
 */

/**
 * Approach 1: Using Sorting (Brute Force / Non-O(1) space if not in-place)
 *
 * Sorts the array, then iterates through it to find adjacent duplicates.
 *
 * Time Complexity: O(N log N) due to sorting.
 * Space Complexity: O(1) if sorting is in-place (like QuickSort, HeapSort);
 *                   O(N) if sorting creates a new array (like MergeSort).
 *
 * @param {number[]} nums The input array.
 * @returns {number[]} An array of duplicate numbers.
 */
function findAllDuplicates_Sorting(nums) {
    if (!nums || nums.length < 2) {
        return [];
    }

    // Sort the array. Using JavaScript's built-in sort (often Timsort, O(N log N) time, O(N) space)
    nums.sort((a, b) => a - b);

    const duplicates = [];
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] === nums[i + 1]) {
            duplicates.push(nums[i]);
            // Skip over all duplicates to avoid adding the same one multiple times
            while (i < nums.length - 1 && nums[i] === nums[i + 1]) {
                i++;
            }
        }
    }
    return duplicates;
}

/**
 * Approach 2: Using a Hash Set (Optimized for Time, not Space)
 *
 * Iterates through the array, adding elements to a set. If an element is already
 * in the set, it's a duplicate.
 *
 * Time Complexity: O(N) - Each element is processed constant number of times.
 * Space Complexity: O(N) - In the worst case, all unique elements are stored in the set.
 *
 * @param {number[]} nums The input array.
 * @returns {number[]} An array of duplicate numbers.
 */
function findAllDuplicates_HashSet(nums) {
    if (!nums || nums.length < 2) {
        return [];
    }

    const seen = new Set();
    const duplicates = [];

    for (const num of nums) {
        if (seen.has(num)) {
            duplicates.push(num);
        } else {
            seen.add(num);
        }
    }
    return duplicates;
}


/**
 * Approach 3: In-Place Modification (Optimal O(N) Time, O(1) Space)
 * This approach leverages the constraint that numbers are in the range [1, n].
 *
 * The idea is to use the array itself as a hash map. For each number `num`, we go to
 * the index `abs(num) - 1`. If the number at that index is positive, we make it negative.
 * If we encounter a number `num` and find that `nums[abs(num) - 1]` is already negative,
 * it means we have seen `abs(num)` before, so `abs(num)` is a duplicate.
 *
 * Note: This modifies the original array.
 *
 * Time Complexity: O(N) - Each element is visited at most twice.
 * Space Complexity: O(1) - No auxiliary data structures are used.
 *
 * @param {number[]} nums The input array, guaranteed to have numbers in [1, n].
 * @returns {number[]} An array of duplicate numbers.
 */
function findAllDuplicates_InPlace(nums) {
    if (!nums || nums.length < 2) {
        return [];
    }

    const duplicates = [];

    for (let i = 0; i < nums.length; i++) {
        // Get the absolute value of the current number, as it might have been negated.
        const num = Math.abs(nums[i]);
        // The index corresponding to this number (since numbers are 1-based, indices are 0-based)
        const index = num - 1;

        // If the number at this index is negative, it means we have visited this position before,
        // implying that 'num' is a duplicate.
        if (nums[index] < 0) {
            duplicates.push(num);
        } else {
            // Otherwise, mark this position as visited by negating the number at 'index'.
            nums[index] = -nums[index];
        }
    }

    // Optional: Restore the array to its original state if modification is not allowed
    // for subsequent operations. For this problem, usually not required.
    // for (let i = 0; i < nums.length; i++) {
    //     nums[i] = Math.abs(nums[i]);
    // }

    return duplicates;
}

module.exports = {
    findAllDuplicates_Sorting,
    findAllDuplicates_HashSet,
    findAllDuplicates_InPlace
};