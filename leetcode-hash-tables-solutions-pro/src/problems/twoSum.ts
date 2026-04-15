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
 * Example 1:
 * Input: nums = [2,7,11,15], target = 9
 * Output: [0,1]
 * Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
 *
 * Example 2:
 * Input: nums = [3,2,4], target = 6
 * Output: [1,2]
 *
 * Example 3:
 * Input: nums = [3,3], target = 6
 * Output: [0,1]
 */

/**
 * Optimal Solution: Using a Hash Map (Map in TypeScript/JavaScript)
 *
 * Approach:
 * 1. Initialize an empty hash map (Map<number, number> where key is the number and value is its index).
 * 2. Iterate through the `nums` array with both the index `i` and the current number `num`.
 * 3. For each `num`, calculate the `complement` needed to reach the `target` (`complement = target - num`).
 * 4. Check if the `complement` already exists in the hash map.
 *    a. If it does, it means we have found two numbers that sum up to `target`.
 *       The current `num` at index `i` and the `complement` found at `map.get(complement)` are our answer.
 *       Return `[map.get(complement), i]`.
 *    b. If it doesn't exist, store the current `num` and its index `i` in the hash map (`map.set(num, i)`).
 *       We store `num` because it might be the complement for a future number.
 * 5. If the loop finishes without finding a pair (which should not happen based on problem constraints
 *    "each input would have exactly one solution"), return an empty array or throw an error.
 *
 * Time Complexity: O(N)
 * We iterate through the array once. Each lookup and insertion into the hash map takes O(1) on average.
 * In the worst case (hash collisions leading to linked lists), it could be O(N) for a single operation,
 * but for typical hash map implementations and good hash functions, average case dominates.
 *
 * Space Complexity: O(N)
 * In the worst case, we might store all N numbers in the hash map if no pair is found until the last element.
 */
export function twoSum(nums: number[], target: number): number[] {
    // A Map stores key-value pairs and remembers the original insertion order of the keys.
    // It's generally preferred over plain objects when keys might not be strings, or when
    // order/size tracking is important. Here, it maps a number to its index.
    const numMap = new Map<number, number>();

    for (let i = 0; i < nums.length; i++) {
        const currentNum = nums[i];
        const complement = target - currentNum;

        // Check if the complement exists in our map
        if (numMap.has(complement)) {
            // If it exists, we found our pair.
            // The value associated with the complement key is its index.
            // The current index `i` is for `currentNum`.
            return [numMap.get(complement)!, i];
        }

        // If the complement is not found, add the current number and its index to the map.
        // This makes it available as a potential complement for subsequent numbers.
        numMap.set(currentNum, i);
    }

    // According to the problem statement ("exactly one solution"), this line should theoretically not be reached.
    // However, it's good practice to handle the case where no solution is found.
    return [];
}
```