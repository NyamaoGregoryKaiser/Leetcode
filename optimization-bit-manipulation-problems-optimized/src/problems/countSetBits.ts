```typescript
/**
 * Problem: Count Set Bits (Hamming Weight)
 *
 * Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).
 *
 * For example, the 32-bit integer `00000000000000000000000000001011` has a Hamming weight of 3.
 *
 * Constraints:
 * - The input must be a 32-bit unsigned integer.
 */

/**
 * Approach 1: Iterative Bit Check (Naive/Brute Force)
 *
 * This method iterates through each bit of the number, checking if the least significant bit (LSB) is 1.
 * It then right-shifts the number to check the next bit.
 *
 * @param n The 32-bit unsigned integer.
 * @returns The number of set bits (1s).
 * @complexity
 * Time: O(log N) where N is the value of the number, or O(W) where W is the word size (32 for this problem).
 *       Since W is constant (32), it's O(1).
 * Space: O(1)
 */
export function countSetBits_iterative(n: number): number {
    let count = 0;
    // Use unsigned right shift to handle negative numbers as unsigned 32-bit
    // In JavaScript, numbers are 64-bit floats, but bitwise ops treat them as 32-bit signed ints.
    // The `>>> 0` converts to unsigned 32-bit.
    let num = n >>> 0; 

    while (num > 0) {
        // Check if the LSB is 1
        if ((num & 1) === 1) {
            count++;
        }
        // Right-shift to check the next bit
        num >>>= 1;
    }
    return count;
}

/**
 * Approach 2: Brian Kernighan's Algorithm
 *
 * This is an optimized approach. It repeatedly flips the least significant set bit to 0
 * and increments a counter until the number becomes 0.
 * The key operation `n & (n - 1)` clears the least significant set bit.
 *
 * Example:
 * n = 11 (binary 1011)
 * 1. count = 0
 * 2. n = 1011
 *    n-1 = 1010
 *    n & (n-1) = 1010 (10) -> count = 1
 * 3. n = 1010
 *    n-1 = 1001
 *    n & (n-1) = 1000 (8) -> count = 2
 * 4. n = 1000
 *    n-1 = 0111
 *    n & (n-1) = 0000 (0) -> count = 3
 * 5. n = 0, loop terminates. Return 3.
 *
 * @param n The 32-bit unsigned integer.
 * @returns The number of set bits (1s).
 * @complexity
 * Time: O(k) where k is the number of set bits. In the worst case (all bits are 1), k = W (32), so O(W) or O(1).
 * Space: O(1)
 */
export function countSetBits_brianKernighan(n: number): number {
    let count = 0;
    let num = n >>> 0; // Ensure unsigned 32-bit

    while (num > 0) {
        // This operation turns off the rightmost set bit
        num &= (num - 1);
        count++;
    }
    return count;
}

/**
 * Approach 3: Lookup Table (Precomputation)
 *
 * This method uses a precomputed lookup table for byte-sized chunks.
 * It breaks the 32-bit integer into 4 bytes and sums up the set bits for each byte from the lookup table.
 *
 * This approach is generally faster than iterative methods for very large numbers of calls,
 * as it avoids repeated bitwise operations in a loop for each call, replacing them with array lookups.
 * The table needs to be pre-filled once.
 *
 * @complexity
 * Time: O(1) after precomputation (fixed 4 lookups). Precomputation is O(2^8 * W) where W is word size of byte (8).
 * Space: O(2^8) = O(256) for the lookup table.
 */
// Precompute set bits for all possible byte values (0-255)
const byteHammingWeight: number[] = new Array(256);
(function precomputeByteWeights() {
    for (let i = 0; i < 256; i++) {
        // Use Brian Kernighan's for precomputation for efficiency
        let count = 0;
        let num = i;
        while (num > 0) {
            num &= (num - 1);
            count++;
        }
        byteHammingWeight[i] = count;
    }
})(); // Immediately Invoked Function Expression (IIFE) to precompute once

export function countSetBits_lookupTable(n: number): number {
    let num = n >>> 0; // Ensure unsigned 32-bit
    let count = 0;

    // Sum the Hamming weight of each byte
    // 1st byte (LSB): num & 0xFF (00000000 00000000 00000000 11111111)
    count += byteHammingWeight[num & 0xFF];
    num >>>= 8; // Shift right by 8 bits to get the next byte

    // 2nd byte
    count += byteHammingWeight[num & 0xFF];
    num >>>= 8;

    // 3rd byte
    count += byteHammingWeight[num & 0xFF];
    num >>>= 8;

    // 4th byte (MSB)
    count += byteHammingWeight[num & 0xFF];

    return count;
}

/**
 * Approach 4: Divide and Conquer / Parallel Summation (No explicit function provided as it's more complex for interview)
 *
 * This method aggregates bits in parallel. It uses masks to sum adjacent bits.
 * For a 32-bit number, it can be done in log2(32) = 5 steps.
 *
 * Example for 8 bits:
 * n = b7 b6 b5 b4 b3 b2 b1 b0
 *
 * Step 1: Sum adjacent pairs (2-bit chunks)
 * n = (n & 0x55) + ((n >> 1) & 0x55)
 * 0x55 = 01010101
 * After this, each 2-bit chunk holds the sum of the two original bits. Max sum is 2 (0b10).
 *
 * Step 2: Sum adjacent 2-bit chunks (4-bit chunks)
 * n = (n & 0x33) + ((n >> 2) & 0x33)
 * 0x33 = 00110011
 * Each 4-bit chunk holds the sum of four original bits. Max sum is 4 (0b0100).
 *
 * Step 3: Sum adjacent 4-bit chunks (8-bit chunks)
 * n = (n & 0x0F) + ((n >> 4) & 0x0F)
 * 0x0F = 00001111
 * Each 8-bit chunk holds the sum of eight original bits. Max sum is 8 (0b01000).
 *
 * The general form for 32-bit integers:
 * export function countSetBits_divideAndConquer(n: number): number {
 *     let num = n >>> 0;
 *     num = (num & 0x55555555) + ((num >>> 1) & 0x55555555); // Sum adjacent 1-bit pairs (groups of 2 bits)
 *     num = (num & 0x33333333) + ((num >>> 2) & 0x33333333); // Sum adjacent 2-bit pairs (groups of 4 bits)
 *     num = (num & 0x0F0F0F0F) + ((num >>> 4) & 0x0F0F0F0F); // Sum adjacent 4-bit pairs (groups of 8 bits)
 *     num = (num & 0x00FF00FF) + ((num >>> 8) & 0x00FF00FF); // Sum adjacent 8-bit pairs (groups of 16 bits)
 *     num = (num & 0x0000FFFF) + ((num >>> 16) & 0x0000FFFF); // Sum adjacent 16-bit pairs (groups of 32 bits)
 *     return num;
 * }
 * This method is often the fastest on modern CPUs due to parallelism, but is less intuitive for interviews unless specifically asked.
 * Its complexity is O(log W) where W is the word size, or O(1).
 */
```