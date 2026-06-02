```typescript
/**
 * src/bitUtils.ts
 *
 * This file provides a collection of fundamental helper functions for performing common
 * bit manipulation operations. These utilities can be useful when solving more complex
 * bit-related problems or understanding how bits are individually managed within an integer.
 *
 * All functions assume a 32-bit integer context, as JavaScript bitwise operations
 * typically convert numbers to 32-bit signed integers before performing operations.
 * Unsigned right shift (`>>>`) is used where appropriate to handle potential sign issues.
 */

/**
 * Gets the value of the bit at a specific position `i` in a number `num`.
 *
 * @param num The integer from which to get the bit.
 * @param i The 0-indexed position of the bit (0 for LSB, 31 for MSB in a 32-bit int).
 * @returns 1 if the bit at position `i` is set, 0 otherwise.
 * @throws Error if `i` is out of the 0-31 range for a 32-bit integer.
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
export function getBit(num: number, i: number): 0 | 1 {
    if (i < 0 || i > 31) {
        throw new Error("Bit position 'i' must be between 0 and 31 for a 32-bit integer.");
    }
    // Create a bitmask with a 1 at position `i` (1 << i).
    // Perform a bitwise AND with `num`.
    // If the result is non-zero, the bit at `i` was set.
    return ((num & (1 << i)) !== 0) ? 1 : 0;
}

/**
 * Sets the bit at a specific position `i` in a number `num` to 1.
 *
 * @param num The integer in which to set the bit.
 * @param i The 0-indexed position of the bit.
 * @returns The new integer with the bit at position `i` set.
 * @throws Error if `i` is out of the 0-31 range.
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
export function setBit(num: number, i: number): number {
    if (i < 0 || i > 31) {
        throw new Error("Bit position 'i' must be between 0 and 31 for a 32-bit integer.");
    }
    // Create a bitmask with a 1 at position `i` (1 << i).
    // Perform a bitwise OR with `num`. This will set the bit at `i` to 1
    // without affecting other bits.
    return num | (1 << i);
}

/**
 * Clears the bit at a specific position `i` in a number `num` to 0.
 *
 * @param num The integer in which to clear the bit.
 * @param i The 0-indexed position of the bit.
 * @returns The new integer with the bit at position `i` cleared.
 * @throws Error if `i` is out of the 0-31 range.
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
export function clearBit(num: number, i: number): number {
    if (i < 0 || i > 31) {
        throw new Error("Bit position 'i' must be between 0 and 31 for a 32-bit integer.");
    }
    // Create a bitmask with a 1 at position `i` (1 << i).
    // Invert the bitmask (~(1 << i)). This creates a mask with 0 at position `i`
    // and 1s everywhere else.
    // Perform a bitwise AND with `num`. This will clear the bit at `i` to 0
    // without affecting other bits.
    return num & (~(1 << i));
}

/**
 * Updates the bit at a specific position `i` in a number `num` to a given `bitValue`.
 *
 * @param num The integer to update.
 * @param i The 0-indexed position of the bit.
 * @param bitValue The new value for the bit (true for 1, false for 0).
 * @returns The new integer with the bit at position `i` updated.
 * @throws Error if `i` is out of the 0-31 range.
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
export function updateBit(num: number, i: number, bitValue: boolean): number {
    if (i < 0 || i > 31) {
        throw new Error("Bit position 'i' must be between 0 and 31 for a 32-bit integer.");
    }
    // First, clear the bit at position `i` regardless of its current value.
    let updatedNum = num & (~(1 << i)); // Using clearBit logic

    // Then, if `bitValue` is true (meaning we want to set it to 1),
    // create a mask with 1 at position `i` and OR it with `updatedNum`.
    if (bitValue) {
        updatedNum = updatedNum | (1 << i); // Using setBit logic
    }
    // If bitValue is false, the bit is already cleared by the first step, so no further action needed.

    return updatedNum;
}

/**
 * Toggles the bit at a specific position `i` in a number `num` (flips 0 to 1, or 1 to 0).
 *
 * @param num The integer to update.
 * @param i The 0-indexed position of the bit.
 * @returns The new integer with the bit at position `i` toggled.
 * @throws Error if `i` is out of the 0-31 range.
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
export function toggleBit(num: number, i: number): number {
    if (i < 0 || i > 31) {
        throw new Error("Bit position 'i' must be between 0 and 31 for a 32-bit integer.");
    }
    // XORing a bit with 1 flips it, XORing with 0 keeps it the same.
    // So, XORing `num` with a mask that has only the `i`-th bit set (1 << i)
    // will toggle that specific bit.
    return num ^ (1 << i);
}

/**
 * Checks if the number `num` is even.
 *
 * @param num The integer to check.
 * @returns True if `num` is even, false otherwise.
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
export function isEven(num: number): boolean {
    // An even number always has its least significant bit (LSB) as 0.
    // An odd number always has its LSB as 1.
    // `num & 1` extracts the LSB.
    return (num & 1) === 0;
}

/**
 * Checks if the number `num` is odd.
 *
 * @param num The integer to check.
 * @returns True if `num` is odd, false otherwise.
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
export function isOdd(num: number): boolean {
    // An odd number always has its least significant bit (LSB) as 1.
    return (num & 1) === 1;
}

/**
 * Counts the number of leading zeros in the 32-bit binary representation of `num`.
 *
 * @param num The integer.
 * @returns The count of leading zeros.
 *
 * Time Complexity: O(log N) or O(32) (fixed).
 * Space Complexity: O(1)
 */
export function countLeadingZeros(num: number): number {
    // Using `Math.clz32` (Count Leading Zeros 32) built-in function for efficiency.
    // This function returns the number of leading zero bits in the 32-bit binary representation of a number.
    // For example, Math.clz32(1) returns 31 because 1 is 0b00...001 (31 zeros).
    // Math.clz32(0) returns 32 because 0 is 0b00...000 (32 zeros).
    return Math.clz32(num);
}

/**
 * Computes the absolute value of an integer without using conditional statements or Math.abs.
 * Uses 2's complement properties.
 *
 * @param num The integer.
 * @returns The absolute value of `num`.
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
export function abs(num: number): number {
    // For a 32-bit signed integer, the sign bit is the 31st bit.
    // If num is negative, sign = -1 (0xFFFFFFFF). If positive, sign = 0.
    // This works because (num >> 31) propagates the sign bit.
    const sign = num >> 31;

    // If num is negative:
    // (num ^ sign) = (num XOR 0xFFFFFFFF) = ~num (bitwise NOT)
    // (~num) + 1 = -num (2's complement negation)
    // If num is positive:
    // (num ^ 0) = num
    // (num) - 0 = num
    return (num ^ sign) - sign;
}

/**
 * Swaps two integers without using a temporary variable.
 * Uses XOR properties:
 * A ^ B = C
 * C ^ A = B
 * C ^ B = A
 *
 * @param a First integer.
 * @param b Second integer.
 * @returns An array containing the swapped integers [b, a].
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1) (excluding the return array itself)
 */
export function swap(a: number, b: number): [number, number] {
    a = a ^ b;
    b = a ^ b; // b becomes original a
    a = a ^ b; // a becomes original b
    return [a, b];
}

```