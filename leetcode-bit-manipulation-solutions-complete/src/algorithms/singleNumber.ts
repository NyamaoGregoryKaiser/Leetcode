```typescript
/**
 * src/algorithms/singleNumber.ts
 *
 * Problem: Single Number
 *
 * Given a non-empty array of integers `nums`, every element appears twice except for one.
 * Find that single one.
 *
 * You must implement a solution with a linear runtime complexity and use only constant extra space.
 *
 * Example:
 * Input: nums = [2,2,1]
 * Output: 1
 *
 * Input: nums = [4,1,2,1,2]
 * Output: 4
 */

/**
 * Approach 1: Hash Map (Not constant space, but common initial thought)
 *
 * This approach uses a hash map (or a frequency counter) to store the count
 * of each number. It iterates through the array once to populate the map,
 * then iterates through the map to find the number with a count of 1.
 *
 * Time Complexity: O(N) because we iterate through the array twice in the worst case
 *                  (once to populate map, once to iterate map keys). Hash map operations
 *                  (insert, lookup) are O(1) on average.
 * Space Complexity: O(N) in the worst case, if all elements are unique.
 *                   This violates the "constant extra space" requirement.
 *
 * @param nums The array of integers.
 * @returns The single non-duplicate number.
 */
export function singleNumber_HashMap(nums: number[]): number {
    const counts = new Map<number, number>();
    for (const num of nums) {
        counts.set(num, (counts.get(num) || 0) + 1);
    }
    for (const [num, count] of counts.entries()) {
        if (count === 1) {
            return num;
        }
    }
    throw new Error("No single number found - invalid input based on problem statement.");
}


/**
 * Approach 2: Bit Manipulation (XOR) - Optimal
 *
 * This is the optimal solution that satisfies both linear time and constant space constraints.
 * It leverages the properties of the XOR bitwise operator (`^`):
 *
 * Properties of XOR:
 * 1. `a ^ 0 = a` (XOR with zero returns the number itself)
 * 2. `a ^ a = 0` (XOR a number with itself returns zero)
 * 3. `a ^ b ^ a = (a ^ a) ^ b = 0 ^ b = b` (Commutative and associative property, allows reordering)
 *
 * Algorithm:
 * Initialize a variable `single` to 0.
 * Iterate through each number in the array:
 *   `single = single ^ num`
 *
 * When we XOR all numbers in the array:
 * - Numbers that appear twice will cancel each other out (e.g., `x ^ x = 0`).
 * - The single unique number will be XORed with 0 (which is the result of all pairs canceling out),
 *   resulting in the unique number itself.
 *
 * Example: nums = [4, 1, 2, 1, 2]
 * single = 0
 * single = 0 ^ 4  = 4   (binary: 0100)
 * single = 4 ^ 1  = 5   (binary: 0101)
 * single = 5 ^ 2  = 7   (binary: 0111)
 * single = 7 ^ 1  = 6   (binary: 0110)
 * single = 6 ^ 2  = 4   (binary: 0100)
 *
 * Result: 4
 *
 * Time Complexity: O(N) - We iterate through the array once.
 * Space Complexity: O(1) - Only a single variable `single` is used.
 *
 * @param nums The array of integers.
 * @returns The single non-duplicate number.
 */
export function singleNumber_XOR(nums: number[]): number {
    let single = 0;
    for (const num of nums) {
        single ^= num;
    }
    return single;
}

/**
 * Main function to export the preferred/most optimal solution.
 */
export const singleNumber = singleNumber_XOR;
```