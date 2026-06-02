```typescript
/**
 * src/bitManipulation.ts
 *
 * This file contains implementations of various common bit manipulation problems,
 * each with optimal solutions and, where applicable, alternative approaches.
 * Detailed comments, time/space complexity analysis, and edge case considerations
 * are provided for each function.
 */

/**
 * Problem 1: Counting Set Bits (Hamming Weight)
 *
 * Write a function that takes an unsigned integer and returns the number of '1' bits it has
 * (also known as the Hamming weight).
 *
 * Example:
 * Input: n = 00000000000000000000000000001011 (binary) => 11 (decimal)
 * Output: 3
 */

/**
 * Approach 1.1: Simple Iteration (Bit Shifting)
 *
 * This approach iterates through each bit of the number, checking if the least significant bit (LSB)
 * is 1. It then right-shifts the number to check the next bit.
 *
 * @param n The input unsigned integer.
 * @returns The number of set bits (1s).
 *
 * Time Complexity: O(log N) where N is the value of the number, or O(1) assuming fixed 32-bit integer (32 iterations).
 * Space Complexity: O(1)
 */
export function countSetBitsSimple(n: number): number {
    let count = 0;
    // We assume n is treated as an unsigned 32-bit integer for consistency
    // Although JavaScript numbers are 64-bit floats, bitwise operations
    // treat them as 32-bit signed integers, so we handle the "unsigned"
    // aspect by assuming non-negative input and processing up to 32 bits.
    let num = n >>> 0; // Ensure it's treated as unsigned 32-bit for consistency

    while (num > 0) {
        // Check if the least significant bit is 1
        if ((num & 1) === 1) {
            count++;
        }
        // Right-shift the number by 1 to process the next bit
        num >>>= 1; // Unsigned right shift
    }
    return count;
}

/**
 * Approach 1.2: Brian Kernighan's Algorithm
 *
 * This algorithm is more efficient because it only iterates as many times as there are set bits.
 * It works by repeatedly flipping the least significant set bit to 0. The expression `num & (num - 1)`
 * clears the rightmost set bit in `num`.
 *
 * Example:
 * num = 11 (binary: 0...01011)
 * 1. num = 0...01011, count = 0
 *    num - 1 = 0...01010
 *    num & (num - 1) = 0...01010  (LSB cleared)
 *    count = 1
 * 2. num = 0...01010, count = 1
 *    num - 1 = 0...01001
 *    num & (num - 1) = 0...01000  (LSB cleared)
 *    count = 2
 * 3. num = 0...01000, count = 2
 *    num - 1 = 0...00111
 *    num & (num - 1) = 0...00000  (LSB cleared)
 *    count = 3
 * 4. num = 0, loop terminates.
 *
 * @param n The input unsigned integer.
 * @returns The number of set bits (1s).
 *
 * Time Complexity: O(k) where k is the number of set bits. In the worst case (all bits are 1), it's O(log N) or O(32).
 * Space Complexity: O(1)
 */
export function countSetBitsBrianKernighan(n: number): number {
    let count = 0;
    let num = n >>> 0; // Ensure treated as unsigned 32-bit

    while (num > 0) {
        // This operation clears the rightmost set bit
        num = num & (num - 1);
        count++;
    }
    return count;
}

/**
 * Problem 2: Single Number
 *
 * Given a non-empty array of integers, every element appears twice except for one. Find that single one.
 *
 * Constraints:
 * - Your algorithm should have a linear runtime complexity.
 * - Could you implement it without using extra memory?
 *
 * Example:
 * Input: nums = [2,2,1]
 * Output: 1
 *
 * Input: nums = [4,1,2,1,2]
 * Output: 4
 */

/**
 * Approach 2.1: XOR Property
 *
 * This is the optimal solution leveraging the properties of the XOR bitwise operator:
 * 1. `a ^ 0 = a` (XOR with zero yields the number itself)
 * 2. `a ^ a = 0` (XOR with itself yields zero)
 * 3. `a ^ b ^ a = (a ^ a) ^ b = 0 ^ b = b` (XOR is commutative and associative)
 *
 * By XORing all numbers in the array, all elements that appear twice will cancel each other out
 * (since `a ^ a = 0`), leaving only the single unique number.
 *
 * @param nums An array of integers where one element appears once and others twice.
 * @returns The single unique number.
 *
 * Time Complexity: O(N) where N is the number of elements in the array. We iterate through the array once.
 * Space Complexity: O(1) as no extra memory is used beyond a single variable for the XOR sum.
 */
export function singleNumber(nums: number[]): number {
    let uniqueNum = 0; // Initialize with 0, as x ^ 0 = x

    for (const num of nums) {
        uniqueNum ^= num; // XOR each number with the running XOR sum
    }

    return uniqueNum;
}

/**
 * Approach 2.2: Hash Map (Alternative - Not optimal for constraints)
 *
 * This approach uses a hash map (or Set) to keep track of numbers encountered.
 * If a number is seen for the second time, it's removed from the map.
 * The remaining number in the map is the unique one.
 *
 * This approach does not meet the "without using extra memory" constraint.
 *
 * @param nums An array of integers.
 * @returns The single unique number.
 *
 * Time Complexity: O(N) on average, due to map insertions/deletions. Worst case for hash collisions could be O(N^2) but rare.
 * Space Complexity: O(N) in the worst case (if all numbers are unique until the end), as the map stores elements.
 */
export function singleNumberHashMap(nums: number[]): number {
    const seen = new Set<number>();
    for (const num of nums) {
        if (seen.has(num)) {
            seen.delete(num);
        } else {
            seen.add(num);
        }
    }
    // The only remaining element in the set is the single number.
    // Since constraints state a single number always exists, we can safely
    // assume `seen.values().next().value` will yield the result.
    return seen.values().next().value;
}

/**
 * Problem 3: Power of Two
 *
 * Given an integer `n`, return `true` if it is a power of two. Otherwise, return `false`.
 * An integer `n` is a power of two if there exists an integer `x` such that `n == 2^x`.
 *
 * Example:
 * Input: n = 1 -> Output: true (2^0)
 * Input: n = 16 -> Output: true (2^4)
 * Input: n = 3 -> Output: false
 */

/**
 * Approach 3.1: Bitwise AND Trick
 *
 * A positive integer `n` is a power of two if and only if it has exactly one set bit in its binary representation.
 * For example:
 * 1 (2^0) = 0001
 * 2 (2^1) = 0010
 * 4 (2^2) = 0100
 * 8 (2^3) = 1000
 *
 * If `n` has only one set bit, then `n - 1` will have all bits to the right of that set bit as 1s,
 * and that set bit itself will be 0.
 *
 * Example with `n = 8 (1000b)`:
 * n     = 1000
 * n - 1 = 0111
 * n & (n - 1) = 0000
 *
 * This property `n & (n - 1) === 0` holds true for all powers of two (and only for powers of two)
 * and is a very efficient way to check.
 *
 * Edge Cases:
 * - `n <= 0`: Powers of two are always positive. So, `n` must be greater than 0.
 * - `n = 1`: This is `2^0`, and the condition `1 & (1 - 1) = 1 & 0 = 0` holds.
 *
 * @param n The integer to check.
 * @returns True if n is a power of two, false otherwise.
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
export function isPowerOfTwo(n: number): boolean {
    // Powers of two are always positive. 0, negative numbers are not powers of two.
    // And for any power of two 'n', 'n' will have only one bit set.
    // 'n - 1' will have all bits to the right of that set bit as 1s, and that set bit itself as 0.
    // Therefore, 'n & (n - 1)' will be 0.
    return n > 0 && (n & (n - 1)) === 0;
}

/**
 * Approach 3.2: Iterative Division (Alternative)
 *
 * This approach repeatedly divides `n` by 2 until it becomes 1. If at any point `n` is not divisible by 2
 * (i.e., it's odd and not 1), then it's not a power of two.
 *
 * @param n The integer to check.
 * @returns True if n is a power of two, false otherwise.
 *
 * Time Complexity: O(log N) where N is the value of the number.
 * Space Complexity: O(1)
 */
export function isPowerOfTwoIterative(n: number): boolean {
    if (n <= 0) {
        return false; // Powers of two are always positive
    }
    while (n % 2 === 0) {
        n /= 2;
    }
    return n === 1;
}

/**
 * Problem 4: Reverse Bits
 *
 * Reverse bits of a given 32-bit unsigned integer.
 *
 * Example:
 * Input: n = 00000010100101000001111010011100 (binary representation of 43261596)
 * Output: 00111001011110000010100101000000 (binary representation of 964176192)
 *
 * Note:
 * - In C++/Java, the input is typically `uint32_t`. In JavaScript, numbers are 64-bit floats,
 *   but bitwise operators operate on 32-bit signed integers. We'll handle this by assuming
 *   the input is a positive integer that fits within a 32-bit unsigned range and
 *   explicitly using unsigned right shifts.
 */

/**
 * Approach 4.1: Iterative Shifting and Combining
 *
 * This approach iterates 32 times (for a 32-bit integer). In each iteration:
 * 1. It extracts the least significant bit (LSB) of the original number `n`.
 * 2. It shifts the `result` to the left by one position to make space for the new bit.
 * 3. It adds the extracted LSB to the `result`.
 * 4. It right-shifts `n` by one position to process the next bit.
 *
 * Example (for an 8-bit number `n = 00001011`):
 * initial: result = 0, n = 00001011
 *
 * Iteration 1 (i=0):
 *   LSB of n = 1 (00001011 & 1)
 *   result = (0 << 1) | 1 = 00000001
 *   n = 00000101 (n >>> 1)
 *
 * Iteration 2 (i=1):
 *   LSB of n = 1 (00000101 & 1)
 *   result = (00000001 << 1) | 1 = 00000011
 *   n = 00000010
 *
 * Iteration 3 (i=2):
 *   LSB of n = 0 (00000010 & 1)
 *   result = (00000011 << 1) | 0 = 00000110
 *   n = 00000001
 *
 * Iteration 4 (i=3):
 *   LSB of n = 1 (00000001 & 1)
 *   result = (00000110 << 1) | 1 = 00001101
 *   n = 00000000
 *
 * ... continuing for 32 iterations ...
 *
 * After 32 iterations, `result` will contain the reversed bits.
 *
 * @param n The 32-bit unsigned integer to reverse.
 * @returns The integer with its bits reversed.
 *
 * Time Complexity: O(1) (fixed 32 iterations).
 * Space Complexity: O(1)
 */
export function reverseBits(n: number): number {
    let result = 0;
    // We expect a 32-bit unsigned integer. JavaScript's bitwise ops treat numbers as 32-bit signed,
    // so we need to be careful with negative numbers and unsigned shifts.
    // For this problem, 'n' is given as an unsigned integer, so we can assume it's positive.

    for (let i = 0; i < 32; i++) {
        // 1. Shift the current result to the left to make space for the new bit.
        result = result << 1;

        // 2. Extract the least significant bit (LSB) from 'n'.
        //    'n & 1' will be 1 if LSB is 1, and 0 if LSB is 0.
        const lsb = n & 1;

        // 3. Add the extracted LSB to the result.
        //    Using '|' (bitwise OR) effectively sets the LSB of `result` to `lsb`.
        result = result | lsb;

        // 4. Right-shift 'n' by 1 to process the next bit (moving towards LSB).
        //    Using '>>>' (unsigned right shift) ensures that leading bits are filled with zeros,
        //    which is important for maintaining the unsigned nature for large numbers.
        n = n >>> 1;
    }

    // JavaScript bitwise operations produce 32-bit signed integers.
    // If the reversed number has its 31st bit (0-indexed) set, it might be interpreted as negative.
    // To ensure it's treated as unsigned as per the problem, we can use `>>> 0` again,
    // but the problem typically implies the mathematical value of the unsigned number.
    // The `result` variable will correctly hold the value.
    return result >>> 0; // Ensure the final result is treated as unsigned 32-bit.
}

/**
 * Example usage (for local testing or demonstration):
 *
 * Uncomment the block below to run these functions directly.
 */
/*
if (require.main === module) {
    console.log("--- Bit Manipulation Problems ---");

    // Problem 1: Counting Set Bits
    console.log("\nProblem 1: Counting Set Bits");
    const num1 = 11; // Binary: 0...01011
    console.log(`Number: ${num1} (binary: ${num1.toString(2)})`);
    console.log(`  Simple: ${countSetBitsSimple(num1)} set bits`); // Expected: 3
    console.log(`  Kernighan: ${countSetBitsBrianKernighan(num1)} set bits`); // Expected: 3

    const num2 = 255; // Binary: 0...11111111
    console.log(`Number: ${num2} (binary: ${num2.toString(2)})`);
    console.log(`  Simple: ${countSetBitsSimple(num2)} set bits`); // Expected: 8
    console.log(`  Kernighan: ${countSetBitsBrianKernighan(num2)} set bits`); // Expected: 8

    const num3 = 0;
    console.log(`Number: ${num3} (binary: ${num3.toString(2)})`);
    console.log(`  Simple: ${countSetBitsSimple(num3)} set bits`); // Expected: 0
    console.log(`  Kernighan: ${countSetBitsBrianKernighan(num3)} set bits`); // Expected: 0

    // Problem 2: Single Number
    console.log("\nProblem 2: Single Number");
    const arr1 = [2, 2, 1];
    console.log(`Array: [${arr1}] -> Single Number: ${singleNumber(arr1)}`); // Expected: 1
    console.log(`Array: [${arr1}] -> Single Number (HashMap): ${singleNumberHashMap(arr1)}`); // Expected: 1

    const arr2 = [4, 1, 2, 1, 2];
    console.log(`Array: [${arr2}] -> Single Number: ${singleNumber(arr2)}`); // Expected: 4
    console.log(`Array: [${arr2}] -> Single Number (HashMap): ${singleNumberHashMap(arr2)}`); // Expected: 4

    const arr3 = [1];
    console.log(`Array: [${arr3}] -> Single Number: ${singleNumber(arr3)}`); // Expected: 1

    // Problem 3: Power of Two
    console.log("\nProblem 3: Power of Two");
    console.log(`Is 1 a power of two? (Bitwise): ${isPowerOfTwo(1)}`); // Expected: true
    console.log(`Is 1 a power of two? (Iterative): ${isPowerOfTwoIterative(1)}`); // Expected: true
    console.log(`Is 16 a power of two? (Bitwise): ${isPowerOfTwo(16)}`); // Expected: true
    console.log(`Is 16 a power of two? (Iterative): ${isPowerOfTwoIterative(16)}`); // Expected: true
    console.log(`Is 3 a power of two? (Bitwise): ${isPowerOfTwo(3)}`); // Expected: false
    console.log(`Is 3 a power of two? (Iterative): ${isPowerOfTwoIterative(3)}`); // Expected: false
    console.log(`Is 0 a power of two? (Bitwise): ${isPowerOfTwo(0)}`); // Expected: false
    console.log(`Is 0 a power of two? (Iterative): ${isPowerOfTwoIterative(0)}`); // Expected: false
    console.log(`Is -16 a power of two? (Bitwise): ${isPowerOfTwo(-16)}`); // Expected: false

    // Problem 4: Reverse Bits
    console.log("\nProblem 4: Reverse Bits");
    const n1 = 43261596; // 00000010100101000001111010011100
    const reversed1 = reverseBits(n1); // Expected: 964176192 (00111001011110000010100101000000)
    console.log(`Original: ${n1} (binary: ${n1.toString(2).padStart(32, '0')})`);
    console.log(`Reversed: ${reversed1} (binary: ${reversed1.toString(2).padStart(32, '0')})`);

    const n2 = 1; // 0...0001
    const reversed2 = reverseBits(n2); // Expected: 2147483648 (1000...0000)
    console.log(`Original: ${n2} (binary: ${n2.toString(2).padStart(32, '0')})`);
    console.log(`Reversed: ${reversed2} (binary: ${reversed2.toString(2).padStart(32, '0')})`);

    const n3 = 0; // 0...0000
    const reversed3 = reverseBits(n3); // Expected: 0
    console.log(`Original: ${n3} (binary: ${n3.toString(2).padStart(32, '0')})`);
    console.log(`Reversed: ${reversed3} (binary: ${reversed3.toString(2).padStart(32, '0')})`);
}
*/
```