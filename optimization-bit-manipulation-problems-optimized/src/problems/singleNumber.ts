```typescript
/**
 * Problem: Single Number
 *
 * Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one.
 *
 * You must implement a solution with a linear runtime complexity and use only constant extra space.
 *
 * Constraints:
 * - 1 <= nums.length <= 3 * 10^4
 * - -3 * 10^4 <= nums[i] <= 3 * 10^4
 * - Each element in the array appears twice except for one element which appears only once.
 */

/**
 * Approach 1: Using a Hash Map (or Set)
 *
 * This approach iterates through the array and uses a hash map (or a Set in JavaScript)
 * to keep track of element occurrences. If an element is seen for the first time, it's added
 * to the map/set. If it's seen again, it's removed. The element remaining in the map/set
 * at the end is the single number.
 *
 * @param nums An array of integers where every element appears twice except for one.
 * @returns The single number that appears only once.
 * @complexity
 * Time: O(N) because we iterate through the array once. Map operations (add, delete, check) are O(1) on average.
 * Space: O(N) in the worst case, if all elements are unique before the duplicates are encountered (e.g., [1, 2, 3, 2, 1]).
 *        This does not meet the "constant extra space" requirement.
 */
export function singleNumber_hashMap(nums: number[]): number {
    const seen = new Set<number>();

    for (const num of nums) {
        if (seen.has(num)) {
            seen.delete(num);
        } else {
            seen.add(num);
        }
    }

    // The Set will contain only the single number
    return seen.values().next().value;
}

/**
 * Approach 2: Using XOR Property (Optimal)
 *
 * This approach leverages the properties of the XOR bitwise operator:
 * 1. `a ^ 0 = a` (XORing with zero returns the number itself)
 * 2. `a ^ a = 0` (XORing a number with itself returns zero)
 * 3. XOR is commutative: `a ^ b = b ^ a`
 * 4. XOR is associative: `(a ^ b) ^ c = a ^ (b ^ c)`
 *
 * If we XOR all the numbers in the array, all numbers that appear twice will cancel each other out (result in 0).
 * The only number remaining will be the one that appears once.
 *
 * Example: nums = [4, 1, 2, 1, 2]
 * result = 0
 * result = 0 ^ 4 = 4
 * result = 4 ^ 1 = 5 (binary 100 ^ 001 = 101)
 * result = 5 ^ 2 = 7 (binary 101 ^ 010 = 111)
 * result = 7 ^ 1 = 6 (binary 111 ^ 001 = 110)
 * result = 6 ^ 2 = 4 (binary 110 ^ 010 = 100)
 *
 * The final result is 4, which is the single number.
 *
 * @param nums An array of integers where every element appears twice except for one.
 * @returns The single number that appears only once.
 * @complexity
 * Time: O(N) because we iterate through the array once.
 * Space: O(1) because we only use a single variable for the XOR sum. This meets the constant space requirement.
 */
export function singleNumber_xor(nums: number[]): number {
    let result = 0; // Initialize with 0, as a ^ 0 = a

    for (const num of nums) {
        result ^= num;
    }

    return result;
}

/**
 * Variation: Single Number II (Every element appears three times except for one)
 *
 * If every element appears three times except for one, the XOR trick no longer works directly.
 * Instead, we count the bits at each position. If a bit position has a sum that is not a multiple of 3,
 * then the unique number must have a '1' at that bit position.
 *
 * Example: [2,2,3,2] -> [010, 010, 011, 010]
 * Bits at position 0: 0 + 0 + 1 + 0 = 1. Since 1 % 3 = 1, the unique number has a 1 at bit 0.
 * Bits at position 1: 1 + 1 + 1 + 1 = 4. Since 4 % 3 = 1, the unique number has a 1 at bit 1.
 * Bit sum for unique number: 11 (binary) = 3.
 *
 * @param nums An array where every element appears three times except for one.
 * @returns The single number that appears only once.
 * @complexity
 * Time: O(N * W) where N is array length and W is word size (32). So O(N) as W is constant.
 * Space: O(1)
 */
export function singleNumber_threeTimes(nums: number[]): number {
    let single = 0;

    // Iterate over each bit position (0 to 31 for 32-bit integers)
    for (let i = 0; i < 32; i++) {
        let sum = 0;
        // Calculate the sum of the i-th bit for all numbers
        for (const num of nums) {
            // Check if the i-th bit of 'num' is set
            if ((num >>> i) & 1) { // Using unsigned right shift to handle negative numbers correctly for bitwise ops
                sum++;
            }
        }

        // If the sum of the i-th bits is not a multiple of 3,
        // it means the unique number has a '1' at this bit position.
        if (sum % 3 !== 0) {
            // Set the i-th bit in our 'single' result
            single |= (1 << i);
        }
    }

    // In JavaScript, numbers are 64-bit floats, but bitwise operations implicitly convert
    // them to 32-bit signed integers. If the most significant bit (31st bit) is set,
    // the result might be interpreted as negative.
    // To ensure a consistent unsigned 32-bit result if this function were strictly for unsigned,
    // one might do `return single >>> 0;`. However, the problem specifies integers which can be negative.
    // The current approach correctly reconstructs the signed integer.
    return single;
}
```