```java
package com.bitmanipulation.algorithms;

/**
 * Helper utility class for common bit manipulation operations.
 * These methods can be useful building blocks or for testing specific bit patterns.
 */
public class BitUtils {

    // Prevent instantiation
    private BitUtils() {}

    /**
     * Checks if the k-th bit (0-indexed) of a number `n` is set.
     *
     * @param n The integer to check.
     * @param k The 0-indexed position of the bit to check.
     * @return true if the k-th bit is set, false otherwise.
     */
    public static boolean getBit(int n, int k) {
        // Create a mask with only the k-th bit set (1 << k)
        // Perform bitwise AND with n. If the result is non-zero, the bit is set.
        // Example: n = 5 (0101), k = 2
        // (1 << 2) = 0100
        // (0101 & 0100) = 0100 (non-zero), so bit 2 is set.
        return ((n >> k) & 1) == 1;
        // Alternative: return (n & (1 << k)) != 0;
    }

    /**
     * Sets the k-th bit (0-indexed) of a number `n`.
     *
     * @param n The integer to modify.
     * @param k The 0-indexed position of the bit to set.
     * @return The modified integer with the k-th bit set.
     */
    public static int setBit(int n, int k) {
        // Create a mask with only the k-th bit set (1 << k)
        // Perform bitwise OR with n. This will turn on the k-th bit
        // without affecting other bits.
        // Example: n = 5 (0101), k = 1
        // (1 << 1) = 0010
        // (0101 | 0010) = 0111 (7)
        return n | (1 << k);
    }

    /**
     * Clears the k-th bit (0-indexed) of a number `n`.
     *
     * @param n The integer to modify.
     * @param k The 0-indexed position of the bit to clear.
     * @return The modified integer with the k-th bit cleared.
     */
    public static int clearBit(int n, int k) {
        // Create a mask with only the k-th bit set (1 << k)
        // Invert the mask (~(1 << k)) to get all ones except at the k-th position.
        // Perform bitwise AND with n. This will clear the k-th bit
        // without affecting other bits.
        // Example: n = 5 (0101), k = 2
        // (1 << 2) = 0100
        // ~(0100) = 1011 (assuming 4-bit for example, actual 32-bit would be 1...11011)
        // (0101 & 1011) = 0001 (1)
        return n & (~(1 << k));
    }

    /**
     * Toggles the k-th bit (0-indexed) of a number `n`.
     * If the k-th bit is 0, it becomes 1. If it's 1, it becomes 0.
     *
     * @param n The integer to modify.
     * @param k The 0-indexed position of the bit to toggle.
     * @return The modified integer with the k-th bit toggled.
     */
    public static int toggleBit(int n, int k) {
        // Create a mask with only the k-th bit set (1 << k)
        // Perform bitwise XOR with n. XORing with 1 flips the bit,
        // XORing with 0 keeps the bit as is.
        // Example: n = 5 (0101), k = 1
        // (1 << 1) = 0010
        // (0101 ^ 0010) = 0111 (7) - bit 1 was 0, became 1
        // Example: n = 7 (0111), k = 1
        // (1 << 1) = 0010
        // (0111 ^ 0010) = 0101 (5) - bit 1 was 1, became 0
        return n ^ (1 << k);
    }

    /**
     * Updates the k-th bit (0-indexed) of a number `n` to a specific value.
     *
     * @param n The integer to modify.
     * @param k The 0-indexed position of the bit to update.
     * @param bitValue The new value for the k-th bit (0 or 1).
     * @return The modified integer with the k-th bit updated.
     * @throws IllegalArgumentException if bitValue is not 0 or 1.
     */
    public static int updateBit(int n, int k, int bitValue) {
        if (bitValue != 0 && bitValue != 1) {
            throw new IllegalArgumentException("bitValue must be 0 or 1.");
        }
        // First, clear the k-th bit
        n = clearBit(n, k);
        // Then, if bitValue is 1, set the k-th bit.
        // This is done by ORing n with (bitValue << k)
        // If bitValue is 0, (0 << k) is 0, so ORing with 0 does nothing.
        // If bitValue is 1, (1 << k) sets the k-th bit.
        return n | (bitValue << k);
    }

    /**
     * Converts an integer to its 32-bit binary string representation.
     * This is useful for debugging and visualization.
     *
     * @param n The integer to convert.
     * @return A 32-character string representing the binary form of n.
     */
    public static String toBinaryString(int n) {
        return String.format("%32s", Integer.toBinaryString(n)).replace(' ', '0');
    }
}
```