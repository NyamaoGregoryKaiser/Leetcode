```javascript
/**
 * Problem 5: Find the Duplicate Number
 *
 * Given an array `nums` containing `n + 1` integers where each integer is in the range `[1, n]` inclusive.
 * There is only one repeated number in `nums`, return this repeated number.
 *
 * You must solve the problem without modifying the array `nums` and uses only constant extra space.
 *
 * Example 1:
 * Input: nums = [1,3,4,2,2]
 * Output: 2
 *
 * Example 2:
 * Input: nums = [3,1,3,4,2]
 * Output: 3
 *
 * Constraints:
 * 1 <= n <= 10^5
 * nums.length == n + 1
 * 1 <= nums[i] <= n
 * All the integers in `nums` appear only once except for precisely one integer which appears two or more times.
 *
 * Follow-up:
 * How can we prove that at least one duplicate number must exist in `nums`?
 *   (By Pigeonhole Principle: N+1 items to be placed into N unique bins, at least one bin must contain more than one item.)
 * Can you solve the problem in linear runtime complexity?
 *   (Yes, using approaches like Floyd's cycle detection or a hash set.)
 */

/**
 * Approach 1: Using a Hash Set
 *
 * This is a straightforward approach. Iterate through the array, adding each number to a Set.
 * If a number is already in the Set, it's the duplicate.
 *
 * @param {number[]} nums The input array.
 * @returns {number} The duplicate number.
 */
function findDuplicateHashSet(nums) {
    const seen = new Set();
    for (const num of nums) {
        if (seen.has(num)) {
            return num;
        }
        seen.add(num);
    }
    return -1; // Should not reach here based on problem constraints
}

/**
 * Complexity Analysis for findDuplicateHashSet:
 * - Time Complexity: O(N)
 *   - We iterate through the array once.
 *   - Set operations (add, has) on average take O(1) time.
 *   - Total: O(N).
 * - Space Complexity: O(N)
 *   - In the worst case, all numbers are unique until the last one, requiring the Set to store N-1 unique numbers.
 *   - Total: O(N).
 *
 * Note: This approach modifies the array in the sense of using extra space, but not by changing its contents.
 */


/**
 * Approach 2: Sorting the Array
 *
 * If we sort the array, any duplicate numbers will appear next to each other.
 * We can then iterate through the sorted array and find adjacent identical elements.
 *
 * @param {number[]} nums The input array (will be modified by sorting).
 * @returns {number} The duplicate number.
 */
function findDuplicateSorting(nums) {
    // Sorting modifies the original array, which violates one of the constraints.
    // However, it's a valid approach if modification is allowed.
    nums.sort((a, b) => a - b); // O(N log N) time, O(log N) or O(N) space depending on sort implementation

    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] === nums[i + 1]) {
            return nums[i];
        }
    }
    return -1; // Should not reach here based on problem constraints
}

/**
 * Complexity Analysis for findDuplicateSorting:
 * - Time Complexity: O(N log N)
 *   - Dominant factor is sorting, which takes O(N log N) time.
 *   - The linear scan after sorting takes O(N).
 *   - Total: O(N log N).
 * - Space Complexity: O(log N) or O(N)
 *   - Depending on the specific sort implementation (e.g., heapsort is O(1) auxiliary, quicksort is O(log N) average,
 *     mergesort is O(N)). JavaScript's `sort` is typically Timsort, which is O(N) worst-case.
 *
 * Note: This approach violates the "without modifying the array" constraint.
 */


/**
 * Approach 3: Optimal - Floyd's Tortoise and Hare (Cycle Detection)
 *
 * This is the most elegant and optimal solution, meeting the O(N) time and O(1) space constraints
 * without modifying the array. It transforms the problem into finding the start of a cycle in a linked list.
 *
 * How it works:
 * The array `nums` contains numbers from `1` to `n`.
 * We can imagine this array as a linked list where `index -> nums[index]` is the "next" pointer.
 * Since all numbers are `1` to `n`, and there are `n+1` numbers, there must be at least one duplicate.
 * This duplicate means at least two indices point to the same next number, creating a cycle.
 * Because all numbers are `1` to `n`, and indices are `0` to `n`, we avoid index 0 as a starting point,
 * essentially treating `nums[0]` as the value for an imaginary node before the actual 'linked list'.
 * Or, more simply, we can think of `nums[i]` as pointing to the *value* `nums[i]`, not the index `nums[i]`.
 * No, the correct way is to consider `nums[i]` as the *next index*.
 * If `nums = [1,3,4,2,2]`:
 * 0 -> nums[0] = 1
 * 1 -> nums[1] = 3
 * 2 -> nums[2] = 4
 * 3 -> nums[3] = 2
 * 4 -> nums[4] = 2
 *
 * This forms a sequence: 0 -> 1 -> 3 -> 2 -> 4 -> 2 -> 4 -> ...
 * The cycle is 2 -> 4 -> 2. The entry point of the cycle is 2, which is our duplicate.
 *
 * Algorithm (similar to finding cycle start in linked list):
 * 1. Find the intersection point of the two pointers (tortoise and hare).
 *    - `slow` pointer moves one step at a time: `slow = nums[slow]`
 *    - `fast` pointer moves two steps at a time: `fast = nums[nums[fast]]`
 *    - Start both `slow` and `fast` from `nums[0]`.
 *    - They will eventually meet inside the cycle if a cycle exists.
 * 2. Find the "entrance" to the cycle.
 *    - Reset `slow` to the beginning of the "list" (or the value that starts the sequence, `nums[0]` if considering 0 as start).
 *    - Move `slow` and `fast` one step at a time until they meet again.
 *    - This meeting point is the start of the cycle, which is the duplicate number.
 *
 * Why start at `nums[0]`? The problem states numbers are `1` to `n`.
 * So `nums[i]` can never be `0`. This means index `0` is a unique starting point that leads into the `1` to `n` range.
 * The duplicate will be one of the numbers from `1` to `n`.
 *
 * @param {number[]} nums The input array.
 * @returns {number} The duplicate number.
 */
function findDuplicateFloyd(nums) {
    // Pointers for Tortoise and Hare algorithm
    let tortoise = nums[0];
    let hare = nums[0];

    // Step 1: Find the intersection point (where tortoise and hare meet)
    // The hare moves twice as fast as the tortoise.
    // They are guaranteed to meet inside the cycle if a cycle exists.
    do {
        tortoise = nums[tortoise];        // Tortoise moves 1 step
        hare = nums[nums[hare]];          // Hare moves 2 steps
    } while (tortoise !== hare);

    // Step 2: Find the entrance to the cycle (which is the duplicate number)
    // Reset tortoise to the beginning (initial value).
    // Now move both tortoise and hare one step at a time until they meet again.
    // This meeting point is the start of the cycle, which is the duplicate.
    tortoise = nums[0];
    while (tortoise !== hare) {
        tortoise = nums[tortoise];
        hare = nums[hare];
    }

    return hare; // Or tortoise, they are at the same position
}

/**
 * Complexity Analysis for findDuplicateFloyd:
 * - Time Complexity: O(N)
 *   - The `do-while` loop: `hare` travels at most `2N` steps, `tortoise` at most `N` steps before they meet.
 *   - The `while` loop: `tortoise` starts from `nums[0]` and `hare` from the meeting point. They traverse
 *     at most `N` steps before meeting at the cycle entrance.
 *   - Total: O(N) + O(N) = O(N).
 * - Space Complexity: O(1)
 *   - Only a few constant extra variables (`tortoise`, `hare`) are used.
 *   - The array is not modified.
 */


module.exports = {
    findDuplicateHashSet,
    findDuplicateSorting,
    findDuplicateFloyd, // Optimal solution for space and time without modification
};
```