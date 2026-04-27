```typescript
/**
 * src/utils/binaryUtils.ts
 *
 * This file contains utility functions related to binary representations.
 * These helpers can be useful for debugging bit manipulation algorithms
 * or for visualizing bit patterns.
 */

/**
 * Converts a number to its 32-bit binary string representation.
 * Pads with leading zeros to ensure a 32-bit length.
 * Handles both positive and negative numbers (using two's complement for negative).
 *
 * @param num The number to convert.
 * @returns A 32-character string representing the binary form of the number.
 */
export function toBinaryString32(num: number): string {
    // JavaScript bitwise operations treat numbers as 32-bit signed integers.
    // Convert to an unsigned 32-bit integer first to handle negative numbers
    // correctly in binary representation (two's complement).
    const unsigned32 = num >>> 0; // Unsigned right shift by 0 converts to unsigned 32-bit

    // Convert to binary string
    let binary = unsigned32.toString(2);

    // Pad with leading zeros to ensure 32 bits
    while (binary.length < 32) {
        binary = '0' + binary;
    }
    return binary;
}

/**
 * Formats a binary string by adding spaces for readability (e.g., every 4 bits).
 *
 * @param binaryString The binary string to format.
 * @param groupSize The number of bits per group (default is 8 for bytes).
 * @returns A formatted binary string.
 */
export function formatBinaryString(binaryString: string, groupSize: number = 8): string {
    let formatted = '';
    for (let i = 0; i < binaryString.length; i++) {
        formatted += binaryString[i];
        if ((i + 1) % groupSize === 0 && (i + 1) !== binaryString.length) {
            formatted += ' ';
        }
    }
    return formatted;
}

/**
 * Prints a number along with its 32-bit binary representation.
 * Useful for debugging bitwise operations.
 *
 * @param label A label to prefix the output (e.g., "Input:", "Result:").
 * @param num The number to print.
 */
export function printBinary(label: string, num: number): void {
    const binaryStr = toBinaryString32(num);
    console.log(`${label}: ${num} (binary: ${formatBinaryString(binaryStr, 8)})`);
}

```