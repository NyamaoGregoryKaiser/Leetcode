```typescript
/**
 * Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence.
 *
 * You must write an algorithm that runs in O(n) time.
 *
 * Example 1:
 * Input: nums = [100,4,200,1,3,2]
 * Output: 4
 * Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Its length is 4.
 *
 * Example 2:
 * Input: nums = [0,3,7,2,5,8,4,6,0,1]
 * Output: 9
 * Explanation: The longest consecutive elements sequence is [0, 1, 2, 3, 4, 5, 6, 7, 8]. Its length is 9.
 *
 * Constraints:
 * 0 <= nums.length <= 10^5
 * -10^9 <= nums[i] <= 10^9
 */

/**
 * Optimal Solution: Using a Hash Set (Set in TypeScript/JavaScript)
 *
 * Approach:
 * The naive approach might be to sort the array first (O(N log N)) and then iterate to find the longest sequence.
 * However, the problem explicitly asks for an O(N) solution.
 *
 * 1. Store all numbers from the input array into a Hash Set. This allows for O(1) average time complexity
 *    for lookups (`has`) and insertions (`add`).
 * 2. Initialize `longestStreak` to 0.
 * 3. Iterate through each `num` in the original `nums` array (or the set, it doesn't matter much).
 * 4. For each `num`, check if `num - 1` exists in the hash set.
 *    a. If `num - 1` DOES exist, it means `num` is part of a longer sequence that started before `num`.
 *       We don't need to process `num` as a potential start of a sequence because we'll process it
 *       when we find the actual start of that sequence (e.g., if `nums = [1,2,3]`, when we are at `2`,
 *       `1` exists, so `2` is not the start. We only care about `1` as the start).
 *    b. If `num - 1` DOES NOT exist, it means `num` *could* be the start of a new consecutive sequence.
 *       i. Start a `currentNum` variable from `num` and `currentStreak` from 1.
 *       ii. While `currentNum + 1` exists in the hash set:
 *           - Increment `currentNum`.
 *           - Increment `currentStreak`.
 *       iii. After the inner loop, update `longestStreak = Math.max(longestStreak, currentStreak)`.
 * 5. Return `longestStreak`.
 *
 * Why is this O(N)?
 * - Step 1: Populating the hash set takes O(N) time.
 * - Step 3-4: We iterate through each `num` in the original array once (outer loop).
 * - Step 4.b.ii: The inner `while` loop seems problematic, but critically, each number is visited by the inner `while` loop AT MOST ONCE.
 *   Once a number `x` is part of a sequence `x, x+1, ..., y`, and we started processing that sequence from `x`,
 *   all numbers `x+1` through `y` will be 'consumed' by that `while` loop. When we later encounter `x+1` (or `x+2`, etc.)
 *   in the outer loop, its `num - 1` (e.g., `x`) will exist in the set, and we'll skip it (Step 4.a).
 *   Thus, each number leads to a constant number of operations *plus* its contribution to incrementing `currentStreak`
 *   in one specific sequence check. The total work for the inner `while` loop across all outer iterations sums up to O(N).
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N) (for the hash set)
 */
export function longestConsecutiveSequence(nums: number[]): number {
    // Edge case: if the array is empty, no sequence can be formed.
    if (nums.length === 0) {
        return 0;
    }

    // 1. Store all numbers in a Set for O(1) average time complexity lookups.
    const numSet = new Set<number>(nums);
    let longestStreak = 0;

    // 3. Iterate through each unique number in the original array.
    //    Using the original array ensures we process numbers from the input,
    //    but iterating `numSet` would also work (and avoid duplicates).
    //    The key is to use `numSet.has()` for efficient checks.
    for (const num of numSet) { // Iterating through numSet to handle duplicates gracefully and ensuring O(N) distinct numbers.
        // 4. Check if `num` is the potential start of a sequence.
        //    A number `num` is the start of a sequence if `num - 1` does NOT exist in the set.
        if (!numSet.has(num - 1)) {
            let currentNum = num;
            let currentStreak = 1;

            // 4.b.ii. While `currentNum + 1` exists in the set, extend the sequence.
            while (numSet.has(currentNum + 1)) {
                currentNum++;
                currentStreak++;
            }

            // 4.b.iii. Update the overall longest streak found so far.
            longestStreak = Math.max(longestStreak, currentStreak);
        }
    }

    return longestStreak;
}
```