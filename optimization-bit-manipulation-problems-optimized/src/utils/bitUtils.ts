```typescript
/**
 * Converts a number to its 32-bit binary string representation.
 * @param num The number to convert.
 * @returns A string representing the 32-bit binary form of the number.
 * @complexity Time: O(1) (fixed 32 bits), Space: O(1)
 */
export function toBinaryString(num: number): string {
    // Ensure the number is treated as a 32-bit unsigned integer
    const val = num >>> 0; 
    let binary = val.toString(2);
    // Pad with leading zeros to ensure 32 bits
    return binary.padStart(32, '0');
}

/**
 * Counts the number of set bits (1s) in a number.
 * This is a helper function that might be useful for debugging or simple checks.
 * Uses Brian Kernighan's algorithm.
 * @param n The number to count set bits for.
 * @returns The number of set bits.
 * @complexity Time: O(k) where k is the number of set bits, Space: O(1)
 */
export function countSetBitsKernel(n: number): number {
    let count = 0;
    while (n !== 0) {
        n &= (n - 1); // This operation turns off the rightmost set bit
        count++;
    }
    return count;
}

/**
 * Generates a mask with 'length' number of set bits from the right.
 * E.g., generateRightMask(3) -> 0b00...0111
 * @param length The number of set bits in the mask.
 * @returns A number representing the right-aligned mask.
 * @complexity Time: O(1), Space: O(1)
 */
export function generateRightMask(length: number): number {
    if (length <= 0) return 0;
    if (length >= 32) return -1 >>> 0; // All bits set for 32 bits
    return (1 << length) - 1;
}

/**
 * Swaps two bits at given positions `i` and `j` in a number `n`.
 * @param n The number to modify.
 * @param i The position of the first bit.
 * @param j The position of the second bit.
 * @returns The number with bits at `i` and `j` swapped.
 * @complexity Time: O(1), Space: O(1)
 */
export function swapBits(n: number, i: number, j: number): number {
    // Extract the bits at positions i and j
    const bitI = (n >>> i) & 1;
    const bitJ = (n >>> j) & 1;

    // If bits are different, swap them
    if (bitI !== bitJ) {
        // Create a mask with 1s at positions i and j
        const mask = (1 << i) | (1 << j);
        // XOR with the mask flips the bits at i and j
        n ^= mask;
    }
    return n;
}
```