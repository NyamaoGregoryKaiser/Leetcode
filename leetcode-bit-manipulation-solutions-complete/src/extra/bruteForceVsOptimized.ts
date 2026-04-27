```typescript
/**
 * src/extra/bruteForceVsOptimized.ts
 *
 * This file demonstrates "brute-force" or less optimized solutions
 * for some of the bit manipulation problems, allowing for comparison
 * with their optimized bitwise counterparts.
 */

import {
    countSetBits_LSB,
    countSetBits_BrianKernighan
} from '../algorithms/countSetBits';
import {
    isPowerOfTwo_Iterative,
    isPowerOfTwo_BitManipulation
} from '../algorithms/isPowerOfTwo';

/**
 * Brute-force/Simple approach for Counting Set Bits.
 *
 * Alias for `countSetBits_LSB` which iterates through all 32 bits.
 * Although O(32) is constant, it's generally slower than Brian Kernighan's
 * if the number of set bits is small.
 *
 * @param n The unsigned integer.
 * @returns The number of set bits.
 */
export const countSetBitsBruteForce = countSetBits_LSB;

/**
 * Optimized approach for Counting Set Bits.
 *
 * Alias for `countSetBits_BrianKernighan`. This algorithm
 * is generally faster as it only iterates as many times as there are set bits.
 *
 * @param n The unsigned integer.
 * @returns The number of set bits.
 */
export const countSetBitsOptimized = countSetBits_BrianKernighan;

/**
 * Brute-force/Simple approach for Checking Power of Two.
 *
 * Alias for `isPowerOfTwo_Iterative` which uses repeated division.
 *
 * @param n The integer to check.
 * @returns True if n is a power of two, false otherwise.
 */
export const isPowerOfTwoBruteForce = isPowerOfTwo_Iterative;

/**
 * Optimized approach for Checking Power of Two.
 *
 * Alias for `isPowerOfTwo_BitManipulation` which uses the `n > 0 && (n & (n - 1)) === 0` trick.
 * This is an O(1) solution.
 *
 * @param n The integer to check.
 * @returns True if n is a power of two, false otherwise.
 */
export const isPowerOfTwoOptimized = isPowerOfTwo_BitManipulation;

// Example Usage (can be called from a main script or test)
export function demonstrateBruteForceVsOptimized() {
    console.log("\n--- Brute Force vs. Optimized Demonstrations ---");

    const num1 = 11; // 0...01011 (3 set bits)
    const num2 = 0b10000000000000000000000000000000; // Max positive 32-bit (1 set bit)
    const num3 = 0b11111111111111111111111111111111; // All 32 bits set

    console.log(`\nCounting Set Bits for ${num1}:`);
    console.log(`  Brute Force (LSB): ${countSetBitsBruteForce(num1)}`);
    console.log(`  Optimized (Kernighan): ${countSetBitsOptimized(num1)}`);

    console.log(`\nCounting Set Bits for ${num2} (large power of 2):`);
    console.log(`  Brute Force (LSB): ${countSetBitsBruteForce(num2)}`);
    console.log(`  Optimized (Kernighan): ${countSetBitsOptimized(num2)}`);

    console.log(`\nCounting Set Bits for ${num3} (all bits set):`);
    console.log(`  Brute Force (LSB): ${countSetBitsBruteForce(num3)}`);
    console.log(`  Optimized (Kernighan): ${countSetBitsOptimized(num3)}`);

    const powerOfTwoNum = 64;
    const nonPowerOfTwoNum = 63;
    const zeroNum = 0;
    const negativeNum = -8;

    console.log(`\nIs Power of Two for ${powerOfTwoNum}:`);
    console.log(`  Brute Force (Iterative): ${isPowerOfTwoBruteForce(powerOfTwoNum)}`);
    console.log(`  Optimized (Bit Manipulation): ${isPowerOfTwoOptimized(powerOfTwoNum)}`);

    console.log(`\nIs Power of Two for ${nonPowerOfTwoNum}:`);
    console.log(`  Brute Force (Iterative): ${isPowerOfTwoBruteForce(nonPowerOfTwoNum)}`);
    console.log(`  Optimized (Bit Manipulation): ${isPowerOfTwoOptimized(nonPowerOfTwoNum)}`);

    console.log(`\nIs Power of Two for ${zeroNum}:`);
    console.log(`  Brute Force (Iterative): ${isPowerOfTwoBruteForce(zeroNum)}`);
    console.log(`  Optimized (Bit Manipulation): ${isPowerOfTwoOptimized(zeroNum)}`);

    console.log(`\nIs Power of Two for ${negativeNum}:`);
    console.log(`  Brute Force (Iterative): ${isPowerOfTwoBruteForce(negativeNum)}`);
    console.log(`  Optimized (Bit Manipulation): ${isPowerOfTwoOptimized(negativeNum)}`);
}

```