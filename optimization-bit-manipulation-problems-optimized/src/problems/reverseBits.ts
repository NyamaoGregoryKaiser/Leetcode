```typescript
/**
 * Problem: Reverse Bits
 *
 * Reverse bits of a given 32-bit unsigned integer.
 *
 * For example, given input 43261596 (binary: `00000010100101000001111010011100`),
 * return 964176192 (binary: `00111001011110000010100101000000`).
 *
 * Constraints:
 * - The input is a 32-bit unsigned integer.
 * - The result should also be a 32-bit unsigned integer.
 */

/**
 * Approach 1: Iterative Shifting
 *
 * This method iterates 32 times, extracting the least significant bit (LSB) from the input number
 * and appending it to the most significant bit (MSB) of the result.
 *
 * In each iteration:
 * 1. Left-shift the `reversed` result by 1 to make space for the next bit.
 * 2. Get the LSB of `n` using `n & 1`.
 * 3. Add this LSB to `reversed`.
 * 4. Right-shift `n` by 1 to process the next bit.
 *
 * @param n The 32-bit unsigned integer to reverse.
 * @returns The reversed 32-bit unsigned integer.
 * @complexity
 * Time: O(W) where W is the word size (32 bits). So, O(1).
 * Space: O(1)
 */
export function reverseBits_iterative(n: number): number {
    let reversed = 0;
    let num = n >>> 0; // Ensure n is treated as an unsigned 32-bit integer

    for (let i = 0; i < 32; i++) {
        // Left shift the reversed result to make space for the next bit
        reversed <<= 1;

        // Add the LSB of num to reversed
        reversed |= (num & 1);

        // Right shift num to process the next bit
        num >>>= 1;
    }

    return reversed >>> 0; // Ensure the final result is treated as unsigned 32-bit
}

/**
 * Approach 2: Divide and Conquer / Parallel Swapping
 *
 * This is a more advanced technique that swaps blocks of bits in parallel.
 * It takes advantage of bitwise operations to reverse multiple bits at once.
 * This can be faster on some architectures due to reduced loop iterations and parallel bit operations.
 *
 * Steps:
 * 1. Swap adjacent bits (1-bit groups).
 * 2. Swap adjacent 2-bit groups.
 * 3. Swap adjacent 4-bit groups (1 byte).
 * 4. Swap adjacent 8-bit groups (2 bytes).
 * 5. Swap adjacent 16-bit groups (4 bytes).
 *
 * Example for 8 bits: `abcdefgh`
 * 1. Swap 1-bit groups: `badcfehg` (using mask `0x55` = `01010101`)
 *    `((n & 0x55) << 1) | ((n >> 1) & 0x55)`
 * 2. Swap 2-bit groups: `dcbahgfe` (using mask `0x33` = `00110011`)
 *    `((n & 0x33) << 2) | ((n >> 2) & 0x33)`
 * 3. Swap 4-bit groups: `hgfedcba` (using mask `0x0F` = `00001111`)
 *    `((n & 0x0F) << 4) | ((n >> 4) & 0x0F)`
 *
 * @param n The 32-bit unsigned integer to reverse.
 * @returns The reversed 32-bit unsigned integer.
 * @complexity
 * Time: O(log W) where W is the word size (32 bits). Since W is constant, O(1).
 * Space: O(1)
 */
export function reverseBits_divideAndConquer(n: number): number {
    let num = n >>> 0; // Ensure n is treated as an unsigned 32-bit integer

    // Swap adjacent 1-bit groups (e.g., abcd -> badc)
    // Mask: 01010101...0101 (0x55555555)
    num = ((num & 0x55555555) << 1) | ((num >>> 1) & 0x55555555);

    // Swap adjacent 2-bit groups (e.g., badc -> cdab)
    // Mask: 00110011...0011 (0x33333333)
    num = ((num & 0x33333333) << 2) | ((num >>> 2) & 0x33333333);

    // Swap adjacent 4-bit groups (e.g., cdab -> efgh)
    // Mask: 00001111...00001111 (0x0F0F0F0F)
    num = ((num & 0x0F0F0F0F) << 4) | ((num >>> 4) & 0x0F0F0F0F);

    // Swap adjacent 8-bit groups (bytes)
    // Mask: 0000000011111111... (0x00FF00FF)
    num = ((num & 0x00FF00FF) << 8) | ((num >>> 8) & 0x00FF00FF);

    // Swap adjacent 16-bit groups (half-words)
    // Mask: 00000000000000001111111111111111 (0x0000FFFF)
    num = ((num & 0x0000FFFF) << 16) | ((num >>> 16) & 0x0000FFFF);

    return num >>> 0; // Ensure the final result is treated as unsigned 32-bit
}
```