```typescript
/**
 * @file bitManipulationProblems.ts
 * @description Implements various bit manipulation problems with optimal solutions,
 *              multiple approaches, detailed comments, and complexity analysis.
 */

import { NamedSolution, UInt32, NumberInput } from './types';
import { toBinaryString } from '../utils/bitUtils'; // For debugging/explanation

// --- Problem 1: Count Set Bits (Hamming Weight) ---
// Description: Given an unsigned integer, count the number of '1' bits it has.

/**
 * Approach 1: Brute Force (Iterate and check LSB)
 * Iterates through all bits, checking the least significant bit (LSB)
 * and right-shifting the number until it becomes 0.
 *
 * Time Complexity: O(log N) where N is the value of the number (or O(k) where k is the number of bits, e.g., 32 for UInt32).
 * Space Complexity: O(1)
 */
export const countSetBits_bruteForce: NamedSolution<UInt32, number> = {
    name: "countSetBits_bruteForce",
    solve: (n: UInt32): number => {
        let count = 0;
        // Need to use >>> for unsigned right shift
        // Loop continues as long as there are bits left to check
        while (n !== 0) {
            // Check if the least significant bit is 1
            if ((n & 1) === 1) {
                count++;
            }
            // Right shift n by 1 bit to check the next bit
            n >>>= 1;
        }
        return count;
    }
};

/**
 * Approach 2: Brian Kernighan's Algorithm (Optimal)
 * This algorithm efficiently clears the least significant set bit (LSB)
 * in each iteration. The loop runs only as many times as there are set bits.
 *
 * How it works: `n & (n - 1)` clears the rightmost set bit.
 * Example:
 *   n = 10 (binary 1010)
 *   n-1 = 9 (binary 1001)
 *   n & (n-1) = 1010 & 1001 = 1000 (8) -- cleared the rightmost '1'
 *   count = 1
 *
 * Time Complexity: O(k) where k is the number of set bits in N (k <= log N).
 *                  In the worst case (all bits set), it's O(log N).
 * Space Complexity: O(1)
 */
export const countSetBits_brianKernighan: NamedSolution<UInt32, number> = {
    name: "countSetBits_brianKernighan",
    solve: (n: UInt32): number => {
        let count = 0;
        // Loop continues as long as there are set bits in n
        while (n !== 0) {
            // Clear the least significant set bit
            n = n & (n - 1);
            count++;
        }
        return count;
    }
};

/**
 * Approach 3: Precomputed Lookup Table (for specific bit widths)
 * For small fixed-width integers (e.g., 8-bit bytes), a lookup table can be
 * used to count bits very quickly. This approach is demonstrated here for a 32-bit integer
 * by breaking it into 4 bytes and summing their precomputed set bit counts.
 *
 * This approach has a precomputation cost, but O(1) query time for fixed-size inputs.
 * For general N, it's not applicable. Here, we precompute for 256 possible byte values.
 *
 * Time Complexity:
 *   - Precomputation: O(2^BYTE_SIZE * BYTE_SIZE) e.g. O(256 * 8)
 *   - Query: O(NUM_BYTES) e.g. O(4) for 32-bit integer, effectively O(1)
 * Space Complexity: O(2^BYTE_SIZE) e.g. O(256) for the lookup table.
 */
const BYTE_SIZE = 8; // Number of bits in a byte
const LOOKUP_TABLE_SIZE = 1 << BYTE_SIZE; // 2^8 = 256
const setBitsLookupTable: number[] = new Array(LOOKUP_TABLE_SIZE);

// Precompute the lookup table upon module load
for (let i = 0; i < LOOKUP_TABLE_SIZE; i++) {
    setBitsLookupTable[i] = countSetBits_brianKernighan.solve(i);
}

export const countSetBits_lookupTable: NamedSolution<UInt32, number> = {
    name: "countSetBits_lookupTable",
    solve: (n: UInt32): number => {
        let count = 0;
        // Extract each byte and sum its set bits using the lookup table
        count += setBitsLookupTable[n & 0xFF];        // Least significant byte
        count += setBitsLookupTable[(n >>> 8) & 0xFF];  // Second byte
        count += setBitsLookupTable[(n >>> 16) & 0xFF]; // Third byte
        count += setBitsLookupTable[(n >>> 24) & 0xFF]; // Most significant byte
        return count;
    }
};


// --- Problem 2: Check if a Number is a Power of Two ---
// Description: Given an integer N, determine if it is a power of two.
// A number N is a power of two if N = 2^k for some non-negative integer k.

/**
 * Approach 1: Brute Force (Loop and Divide)
 * Repeatedly divide the number by 2 until it becomes 1. If at any point it's not
 * divisible by 2 or becomes 0 before 1, it's not a power of two.
 *
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
export const isPowerOfTwo_bruteForce: NamedSolution<NumberInput, boolean> = {
    name: "isPowerOfTwo_bruteForce",
    solve: (n: NumberInput): boolean => {
        if (n <= 0) { // Powers of two are positive (1, 2, 4, ...)
            return false;
        }
        while (n % 2 === 0) {
            n /= 2;
        }
        return n === 1;
    }
};

/**
 * Approach 2: Bit Manipulation (Optimal)
 * A number is a power of two if and only if it has exactly one set bit in its binary representation.
 * Example:
 *   1 (0001)
 *   2 (0010)
 *   4 (0100)
 *   8 (1000)
 *
 * The trick: `n & (n - 1)` clears the least significant set bit.
 * If `n` is a power of two, it has only one set bit. So `n - 1` will have all bits
 * to the right of that single set bit set to 1, and that single set bit will become 0.
 *
 * Example: n = 8 (1000)
 *   n - 1 = 7 (0111)
 *   n & (n - 1) = 1000 & 0111 = 0000 (0)
 *
 * So, if `n` is a power of two, `n & (n - 1)` will be 0.
 * We also need to handle the case `n <= 0`.
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
export const isPowerOfTwo_bitManipulation: NamedSolution<NumberInput, boolean> = {
    name: "isPowerOfTwo_bitManipulation",
    solve: (n: NumberInput): boolean => {
        // A number must be positive to be a power of two.
        // 0 is not a power of two. Negative numbers are not powers of two.
        // The condition `n & (n - 1) === 0` also incorrectly returns true for `n = 0`.
        return n > 0 && (n & (n - 1)) === 0;
    }
};


// --- Problem 3: Reverse Bits ---
// Description: Reverse the bits of a given 32-bit unsigned integer.

/**
 * Approach 1: Iterative Bit-by-Bit (Optimal and General)
 * Iterates 32 times, taking the LSB of the input number and appending it
 * to the result (by left-shifting the result and ORing the LSB).
 *
 * Time Complexity: O(k) where k is the number of bits (e.g., 32 for UInt32).
 * Space Complexity: O(1)
 */
export const reverseBits_iterative: NamedSolution<UInt32, UInt32> = {
    name: "reverseBits_iterative",
    solve: (n: UInt32): UInt32 => {
        let reversed = 0;
        // We always process 32 bits for a 32-bit unsigned integer
        for (let i = 0; i < 32; i++) {
            // Left shift the `reversed` result to make space for the next bit
            reversed <<= 1;
            // Get the least significant bit (LSB) of `n`
            const lsb = n & 1;
            // OR the LSB into `reversed`
            reversed |= lsb;
            // Right shift `n` to process the next bit
            n >>>= 1; // Unsigned right shift
        }
        return reversed >>> 0; // Ensure result is treated as unsigned 32-bit integer
    }
};

/**
 * Approach 2: Byte-by-Byte Lookup Table (Precomputation & Faster for fixed-size numbers)
 * This approach is similar to `countSetBits_lookupTable`. It precomputes
 * the reversed bits for each possible byte (0-255). Then, for a 32-bit integer,
 * it extracts each byte, reverses it using the table, and reconstructs the 32-bit result
 * by placing the reversed bytes in the correct shifted positions.
 *
 * Time Complexity:
 *   - Precomputation: O(2^BYTE_SIZE * BYTE_SIZE) e.g. O(256 * 8)
 *   - Query: O(NUM_BYTES) e.g. O(4) for 32-bit integer, effectively O(1)
 * Space Complexity: O(2^BYTE_SIZE) e.g. O(256) for the lookup table.
 */
const reversedByteLookupTable: UInt32[] = new Array(LOOKUP_TABLE_SIZE);

// Precompute the lookup table for reversed bytes
// This uses the iterative method for each byte, as an example.
for (let i = 0; i < LOOKUP_TABLE_SIZE; i++) {
    let byteReversed = 0;
    let tempByte = i;
    for (let j = 0; j < BYTE_SIZE; j++) {
        byteReversed <<= 1;
        byteReversed |= (tempByte & 1);
        tempByte >>>= 1;
    }
    reversedByteLookupTable[i] = byteReversed;
}

export const reverseBits_lookupTable: NamedSolution<UInt32, UInt32> = {
    name: "reverseBits_lookupTable",
    solve: (n: UInt32): UInt32 => {
        // Extract each byte, reverse it, and place it in the correct 32-bit position
        // The most significant byte of `n` becomes the least significant byte of `reversed`.
        // The least significant byte of `n` becomes the most significant byte of `reversed`.
        const byte1 = (n >>> 0) & 0xFF; // Least significant byte of n
        const byte2 = (n >>> 8) & 0xFF;
        const byte3 = (n >>> 16) & 0xFF;
        const byte4 = (n >>> 24) & 0xFF; // Most significant byte of n

        let reversed = 0;
        // Reverse byte1 and place it in the most significant byte position (bits 24-31)
        reversed |= (reversedByteLookupTable[byte1] << 24);
        // Reverse byte2 and place it in the next position (bits 16-23)
        reversed |= (reversedByteLookupTable[byte2] << 16);
        // Reverse byte3 and place it in the next position (bits 8-15)
        reversed |= (reversedByteLookupTable[byte3] << 8);
        // Reverse byte4 and place it in the least significant byte position (bits 0-7)
        reversed |= reversedByteLookupTable[byte4];

        return reversed >>> 0; // Ensure unsigned 32-bit result
    }
};


// --- Problem 4: Single Number ---
// Description: Given a non-empty array of integers, every element appears twice
//              except for one. Find that single one.

/**
 * Approach 1: Hash Map / Set
 * Iterate through the array, storing counts in a hash map or adding/removing from a set.
 *
 * Time Complexity: O(N) to iterate and store/access in hash map.
 * Space Complexity: O(N) in worst case (if all numbers are unique until the end).
 */
export const singleNumber_hashMap: NamedSolution<number[], number> = {
    name: "singleNumber_hashMap",
    solve: (nums: number[]): number => {
        const seen = new Set<number>();
        for (const num of nums) {
            if (seen.has(num)) {
                seen.delete(num);
            } else {
                seen.add(num);
            }
        }
        // The set will contain only the single number
        if (seen.size === 1) {
            return seen.values().next().value;
        }
        throw new Error("Invalid input: no single number found or more than one.");
    }
};

/**
 * Approach 2: Bit Manipulation (XOR Property) (Optimal)
 * The XOR operator has the following properties:
 * 1. `x ^ 0 = x` (Identity)
 * 2. `x ^ x = 0` (Self-inverse)
 * 3. `x ^ y = y ^ x` (Commutativity)
 * 4. `(x ^ y) ^ z = x ^ (y ^ z)` (Associativity)
 *
 * Because of commutativity and associativity, the order of XOR operations doesn't matter.
 * If we XOR all numbers in the array, all pairs of identical numbers will cancel out (x ^ x = 0),
 * leaving only the unique number (0 ^ unique_num = unique_num).
 *
 * Example: [2, 1, 4, 1, 2]
 *   result = 0
 *   result = 0 ^ 2 = 2
 *   result = 2 ^ 1 = 3 (binary 011)
 *   result = 3 ^ 4 = 7 (binary 111)
 *   result = 7 ^ 1 = 6 (binary 110)
 *   result = 6 ^ 2 = 4 (binary 100)
 *
 * Time Complexity: O(N) to iterate through the array once.
 * Space Complexity: O(1)
 */
export const singleNumber_xor: NamedSolution<number[], number> = {
    name: "singleNumber_xor",
    solve: (nums: number[]): number => {
        let result = 0;
        for (const num of nums) {
            result ^= num;
        }
        return result;
    }
};


// --- Problem 5: Insert M into N ---
// Description: Given two 32-bit numbers, N and M, and two bit positions, i and j.
//              Insert M into N such that M starts at bit j and ends at bit i.
//              You can assume that M will fit in the range from i to j.
// Example: N = 10000000000 (binary 1024), M = 10011 (binary 19), i = 2, j = 6
// Output: 10001001100 (binary 1092)
// This problem implies clearing bits in N from i to j, then inserting M shifted to position i.

/**
 * Approach 1: Bit Manipulation (Clear then Insert) (Optimal)
 * This involves two main steps:
 * 1. Clear the bits in N from position i to j.
 * 2. Shift M to the left by i positions and OR it with the modified N.
 *
 * To clear bits from i to j:
 *   - Create a mask for bits from 0 to i-1: `(1 << i) - 1` (e.g., if i=2, 00...011)
 *   - Create a mask for bits from j+1 to 31: `~((1 << (j + 1)) - 1)` (e.g., if j=6, 11...10000000)
 *   - Combine these two masks using OR: `left_mask | right_mask`
 *   - OR, more simply: `all_ones ^ mask_of_ones_from_i_to_j`
 *       where `mask_of_ones_from_i_to_j` = `((1 << (j - i + 1)) - 1) << i`
 *
 * Let's use the standard approach:
 *   - Create a mask `allOnes`: `~0` (all bits set to 1, or `0xFFFFFFFF`)
 *   - Create a left part of the mask: `left = allOnes << (j + 1)` (sets bits from j+1 to 31 to 1)
 *   - Create a right part of the mask: `right = (1 << i) - 1` (sets bits from 0 to i-1 to 1)
 *   - Combine: `mask = left | right` (this mask has 0s from i to j, and 1s elsewhere)
 *
 *   - Clear bits in N: `N_cleared = N & mask`
 *   - Shift M: `M_shifted = M << i`
 *   - Insert M: `result = N_cleared | M_shifted`
 *
 * Time Complexity: O(1) (fixed number of bit operations)
 * Space Complexity: O(1)
 */
export const insertMIntoN_optimal: NamedSolution<
    { N: UInt32, M: UInt32, i: number, j: number },
    UInt32
> = {
    name: "insertMIntoN_optimal",
    solve: ({ N, M, i, j }: { N: UInt32, M: UInt32, i: number, j: number }): UInt32 => {
        // Input validation (optional, but good practice)
        if (i < 0 || j > 31 || i > j) {
            throw new Error("Invalid bit range: 0 <= i <= j <= 31 is required.");
        }
        if (M >= (1 << (j - i + 1))) {
            // Check if M fits into the allocated space (j-i+1 bits)
            // Example: if M=100 (binary 4), j-i+1=2, (1 << 2) = 4. M must be < 4.
            throw new Error("M does not fit into the specified bit range [i, j].");
        }

        // --- Step 1: Create a mask to clear bits from i to j in N ---
        // All ones: ...11111111
        const allOnes = ~0; // In 32-bit, this is 0xFFFFFFFF

        // Create the left part of the mask: 1s from bit j+1 to 31, 0s from 0 to j
        // Example: j=6 => 11111111111111111111111110000000 (bits 7-31 are 1s)
        const leftMask = allOnes << (j + 1);

        // Create the right part of the mask: 1s from bit 0 to i-1, 0s from i to 31
        // Example: i=2 => 00000000000000000000000000000011 (bits 0-1 are 1s)
        const rightMask = (1 << i) - 1;

        // Combine left and right masks. This creates a mask with 0s between i and j,
        // and 1s everywhere else.
        // Example i=2, j=6: leftMask | rightMask = 11...10000000 | 00...00011 = 11...100000011
        const clearMask = leftMask | rightMask;
        // console.log(`DEBUG: N: ${toBinaryString(N, 32)}`);
        // console.log(`DEBUG: M: ${toBinaryString(M, 32)}`);
        // console.log(`DEBUG: i=${i}, j=${j}`);
        // console.log(`DEBUG: leftMask: ${toBinaryString(leftMask, 32)}`);
        // console.log(`DEBUG: rightMask: ${toBinaryString(rightMask, 32)}`);
        // console.log(`DEBUG: clearMask: ${toBinaryString(clearMask, 32)}`);

        // Clear bits in N from i to j
        const N_cleared = N & clearMask;
        // console.log(`DEBUG: N_cleared: ${toBinaryString(N_cleared, 32)}`);

        // --- Step 2: Shift M to the correct position (starting at bit i) ---
        const M_shifted = M << i;
        // console.log(`DEBUG: M_shifted: ${toBinaryString(M_shifted, 32)}`);

        // --- Step 3: Insert M into N by ORing N_cleared and M_shifted ---
        const result = N_cleared | M_shifted;

        return result >>> 0; // Ensure the result is treated as an unsigned 32-bit integer
    }
};

/**
 * Consolidate all solutions for export and easy access.
 */
export const allBitManipulationSolutions = {
    countSetBits: {
        bruteForce: countSetBits_bruteForce,
        brianKernighan: countSetBits_brianKernighan,
        lookupTable: countSetBits_lookupTable,
    },
    isPowerOfTwo: {
        bruteForce: isPowerOfTwo_bruteForce,
        bitManipulation: isPowerOfTwo_bitManipulation,
    },
    reverseBits: {
        iterative: reverseBits_iterative,
        lookupTable: reverseBits_lookupTable,
    },
    singleNumber: {
        hashMap: singleNumber_hashMap,
        xor: singleNumber_xor,
    },
    insertMIntoN: {
        optimal: insertMIntoN_optimal,
    },
};

// Export individual solutions for direct access in tests or benchmarks
export {
    countSetBits_bruteForce,
    countSetBits_brianKernighan,
    countSetBits_lookupTable,
    isPowerOfTwo_bruteForce,
    isPowerOfTwo_bitManipulation,
    reverseBits_iterative,
    reverseBits_lookupTable,
    singleNumber_hashMap,
    singleNumber_xor,
    insertMIntoN_optimal,
};
```