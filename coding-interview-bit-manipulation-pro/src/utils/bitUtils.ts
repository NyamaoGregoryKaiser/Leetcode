```typescript
/**
 * @file bitUtils.ts
 * @description Provides common bit utility functions for visualization,
 *              debugging, and basic bit operations.
 */

/**
 * Converts a number to its binary string representation.
 * Pads with leading zeros to the specified width.
 *
 * @param num The number to convert.
 * @param width The desired total width of the binary string (e.g., 32 for UInt32).
 * @returns A string representing the binary form of the number.
 */
export function toBinaryString(num: number, width: number = 32): string {
    // Handle negative numbers for completeness, though many problems deal with unsigned.
    // For unsigned 32-bit, `(num >>> 0).toString(2)` is more appropriate.
    const binary = (num >>> 0).toString(2);
    // Pad with leading zeros if the width is specified and the binary string is shorter.
    return binary.padStart(width, '0');
}

/**
 * Checks if the Kth bit (0-indexed from right) of a number is set (1).
 *
 * @param num The number to check.
 * @param k The 0-indexed position of the bit to check.
 * @returns True if the Kth bit is 1, false otherwise.
 */
export function getBit(num: number, k: number): boolean {
    if (k < 0 || k >= 32) { // Assuming 32-bit integers
        throw new Error("Bit position K must be between 0 and 31.");
    }
    return ((num >>> 0) & (1 << k)) !== 0;
}

/**
 * Sets the Kth bit (0-indexed from right) of a number to 1.
 *
 * @param num The number to modify.
 * @param k The 0-indexed position of the bit to set.
 * @returns The new number with the Kth bit set.
 */
export function setBit(num: number, k: number): number {
    if (k < 0 || k >= 32) {
        throw new Error("Bit position K must be between 0 and 31.");
    }
    return (num >>> 0) | (1 << k);
}

/**
 * Clears the Kth bit (0-indexed from right) of a number to 0.
 *
 * @param num The number to modify.
 * @param k The 0-indexed position of the bit to clear.
 * @returns The new number with the Kth bit cleared.
 */
export function clearBit(num: number, k: number): number {
    if (k < 0 || k >= 32) {
        throw new Error("Bit position K must be between 0 and 31.");
    }
    const mask = ~(1 << k);
    return (num >>> 0) & mask;
}

/**
 * Updates the Kth bit (0-indexed from right) of a number to a specified value (0 or 1).
 *
 * @param num The number to modify.
 * @param k The 0-indexed position of the bit to update.
 * @param bitValue The new value for the bit (0 or 1).
 * @returns The new number with the Kth bit updated.
 */
export function updateBit(num: number, k: number, bitValue: 0 | 1): number {
    if (bitValue !== 0 && bitValue !== 1) {
        throw new Error("Bit value must be 0 or 1.");
    }
    // First, clear the Kth bit
    const clearedNum = clearBit(num, k);
    // Then, if bitValue is 1, set the Kth bit
    return clearedNum | (bitValue << k);
}

/**
 * Toggles the Kth bit (0-indexed from right) of a number.
 *
 * @param num The number to modify.
 * @param k The 0-indexed position of the bit to toggle.
 * @returns The new number with the Kth bit toggled.
 */
export function toggleBit(num: number, k: number): number {
    if (k < 0 || k >= 32) {
        throw new Error("Bit position K must be between 0 and 31.");
    }
    return (num >>> 0) ^ (1 << k);
}
```