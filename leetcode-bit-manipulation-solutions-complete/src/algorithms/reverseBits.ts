```typescript
/**
 * src/algorithms/reverseBits.ts
 *
 * Problem: Reverse Bits
 *
 * Reverse the bits of a given 32-bit unsigned integer.
 *
 * Example:
 * Input: n = 00000010100101000001111010011100 (binary)
 * Output: 00111001011110000010100101000000 (binary)
 *
 * Note:
 * - In JavaScript, numbers are typically 64-bit floating-point.
 * - However, bitwise operations (`&`, `|`, `^`, `~`, `<<`, `>>`, `>>>`)
 *   treat their operands as 32-bit signed integers, and return a 32-bit signed integer.
 * - For unsigned operations or to maintain all 32 bits including a sign bit,
 *   the unsigned right shift `>>>` can be crucial, and we need to be careful
 *   about the final interpretation.
 * - The problem usually implies treating the input as if it were a 32-bit unsigned integer,
 *   even if the language's native number type is different.
 */

/**
 * Approach 1: Iterative Bit-by-Bit Reversal
 *
 * This approach iterates 32 times, taking the least significant bit (LSB) from the
 * input number `n` and placing it at the least significant position of the result,
 * then shifting the result left and the input number right.
 *
 * Algorithm:
 * 1. Initialize `reversed = 0`.
 * 2. Loop 32 times (for a 32-bit integer):
 *    a. Left shift `reversed` by 1 (`reversed <<= 1`). This makes space for the next bit from `n`.
 *    b. Get the LSB of `n`: `(n & 1)`.
 *    c. Add this LSB to `reversed`: `reversed |= (n & 1)`.
 *    d. Right shift `n` by 1 (`n >>>= 1`) to discard the processed bit and expose the next LSB.
 * 3. After 32 iterations, `reversed` will hold the completely reversed 32-bit integer.
 *
 * Time Complexity: O(1) - Always performs 32 iterations for a 32-bit integer.
 * Space Complexity: O(1)
 *
 * @param n The 32-bit unsigned integer to reverse.
 * @returns The reversed 32-bit unsigned integer.
 */
export function reverseBits_Iterative(n: number): number {
    let reversed = 0;
    // Ensure n is treated as an unsigned 32-bit integer for consistency,
    // though the problem context implies it's already in that range.
    let num = n >>> 0;

    for (let i = 0; i < 32; i++) {
        // 1. Left shift 'reversed' by 1 to make space for the next bit
        reversed <<= 1;

        // 2. Get the least significant bit (LSB) of 'num'
        // If the LSB of 'num' is 1, then (num & 1) will be 1.
        // If the LSB of 'num' is 0, then (num & 1) will be 0.
        // We use bitwise OR to set this bit in 'reversed'.
        reversed |= (num & 1);

        // 3. Right shift 'num' by 1 (unsigned) to process the next bit in the original number
        num >>>= 1;
    }

    // The result from JavaScript bitwise operations is always a signed 32-bit integer.
    // If the most significant bit (bit 31) of the reversed number is 1,
    // JS will interpret it as a negative number.
    // The problem asks for an *unsigned* integer. To correctly return this,
    // we use an unsigned right shift by 0 to ensure the number is treated as unsigned
    // at the final return, even if its bit 31 is set.
    return reversed >>> 0;
}

/**
 * Approach 2: Grouped Bit Swapping (Precomputation / More Complex Shifts)
 *
 * This approach swaps bits in groups. It can be faster in certain architectures
 * with specific instructions, but in pure JavaScript, it might not offer significant
 * speedup compared to the iterative method due to how bitwise operations are handled.
 * It's more complex to write and understand but demonstrates another pattern.
 *
 * The idea is to swap adjacent bits, then adjacent 2-bit groups, then 4-bit, 8-bit, etc.
 *
 * For a 32-bit number:
 * 1. Swap adjacent 1-bit groups (i.e., swap bit 0 with 1, bit 2 with 3, etc.)
 *    `((n & 0xAAAAAAAA) >>> 1) | ((n & 0x55555555) << 1)`
 *    `0xAAAAAAAA` = `10101010...` (selects odd bits, 1-indexed)
 *    `0x55555555` = `01010101...` (selects even bits, 0-indexed)
 * 2. Swap adjacent 2-bit groups
 *    `((n & 0xCCCCCCCC) >>> 2) | ((n & 0x33333333) << 2)`
 *    `0xCCCCCCCC` = `11001100...`
 *    `0x33333333` = `00110011...`
 * 3. Swap adjacent 4-bit groups (nibbles)
 *    `((n & 0xF0F0F0F0) >>> 4) | ((n & 0x0F0F0F0F) << 4)`
 * 4. Swap adjacent 8-bit groups (bytes)
 *    `((n & 0xFF00FF00) >>> 8) | ((n & 0x00FF00FF) << 8)`
 * 5. Swap adjacent 16-bit groups (words)
 *    `((n & 0xFFFF0000) >>> 16) | ((n & 0x0000FFFF) << 16)`
 *
 * Time Complexity: O(log K) where K is the number of bits (log 32 = 5 steps).
 *                  This is a constant number of operations (5 bitwise operations per step, 5 steps).
 * Space Complexity: O(1)
 *
 * @param n The 32-bit unsigned integer to reverse.
 * @returns The reversed 32-bit unsigned integer.
 */
export function reverseBits_GroupedSwaps(n: number): number {
    let num = n >>> 0; // Ensure unsigned 32-bit interpretation

    // Swap adjacent 1-bit groups (bits 0 with 1, 2 with 3, etc.)
    // 0xAAAAAAAA = 10101010... (mask for bits at odd positions 1,3,5...)
    // 0x55555555 = 01010101... (mask for bits at even positions 0,2,4...)
    num = ((num & 0xAAAAAAAA) >>> 1) | ((num & 0x55555555) << 1);

    // Swap adjacent 2-bit groups
    // 0xCCCCCCCC = 11001100...
    // 0x33333333 = 00110011...
    num = ((num & 0xCCCCCCCC) >>> 2) | ((num & 0x33333333) << 2);

    // Swap adjacent 4-bit groups (nibbles)
    // 0xF0F0F0F0 = 1111000011110000...
    // 0x0F0F0F0F = 0000111100001111...
    num = ((num & 0xF0F0F0F0) >>> 4) | ((num & 0x0F0F0F0F) << 4);

    // Swap adjacent 8-bit groups (bytes)
    // 0xFF00FF00 = 1111111100000000...
    // 0x00FF00FF = 0000000011111111...
    num = ((num & 0xFF00FF00) >>> 8) | ((num & 0x00FF00FF) << 8);

    // Swap adjacent 16-bit groups (words)
    // 0xFFFF0000 = 16 ones followed by 16 zeros
    // 0x0000FFFF = 16 zeros followed by 16 ones
    num = ((num & 0xFFFF0000) >>> 16) | ((num & 0x0000FFFF) << 16);

    return num >>> 0; // Ensure unsigned 32-bit interpretation for the final result
}

/**
 * Main function to export the preferred solution.
 * The iterative approach is often simpler to understand and implement in an interview,
 * and its performance is very consistent. The grouped swaps approach is more
 * advanced but less intuitive for many.
 */
export const reverseBits = reverseBits_Iterative;
```