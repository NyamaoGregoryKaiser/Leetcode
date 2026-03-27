```java
package com.bitmanipulation.utils;

/**
 * Utility class for common bit manipulation operations and visualizations.
 */
public class BitUtils {

    /**
     * Converts an integer to its 32-bit binary string representation.
     * Includes leading zeros for full 32-bit representation.
     *
     * @param n The integer to convert.
     * @return A 32-character string representing the binary form of n.
     */
    public static String toBinaryString(int n) {
        // Use Integer.toBinaryString which handles negative numbers correctly with two's complement.
        // Then pad with leading zeros to ensure a 32-bit length.
        String binaryString = Integer.toBinaryString(n);
        if (binaryString.length() < 32) {
            // Pad with leading zeros.
            // For positive numbers, this just adds 0s.
            // For negative numbers, toBinaryString already gives 32 bits (or fewer if leading 1s are condensed).
            // Example: -1 is "11111111111111111111111111111111"
            // Example: 5 is "101", need to pad to "00...0101"
            return String.format("%32s", binaryString).replace(' ', '0');
        }
        // If it's already 32 bits (like for -1) or somehow longer (not typical for int), return as is.
        // It's possible for toBinaryString to return less than 32 bits for negative numbers if
        // the leading 1s are not all shown. So we ensure it's always 32 bits.
        // A simple way to get a 32-bit string explicitly:
        return String.format("%32s", Integer.toBinaryString(n)).replace(' ', '0');
    }

    /**
     * Converts a long to its 64-bit binary string representation.
     * Includes leading zeros for full 64-bit representation.
     *
     * @param n The long to convert.
     * @return A 64-character string representing the binary form of n.
     */
    public static String toBinaryString(long n) {
        String binaryString = Long.toBinaryString(n);
        if (binaryString.length() < 64) {
            return String.format("%64s", binaryString).replace(' ', '0');
        }
        return String.format("%64s", Long.toBinaryString(n)).replace(' ', '0');
    }

    /**
     * Converts a byte to its 8-bit binary string representation.
     * Includes leading zeros for full 8-bit representation.
     *
     * @param b The byte to convert.
     * @return An 8-character string representing the binary form of b.
     */
    public static String toBinaryString(byte b) {
        return String.format("%8s", Integer.toBinaryString(b & 0xFF)).replace(' ', '0');
    }

    /**
     * Prints an integer in decimal and its 32-bit binary representation.
     * @param label A label for the output.
     * @param value The integer to print.
     */
    public static void printBinary(String label, int value) {
        System.out.printf("%-20s: %12d (%s)%n", label, value, toBinaryString(value));
    }

    /**
     * Prints a long in decimal and its 64-bit binary representation.
     * @param label A label for the output.
     * @param value The long to print.
     */
    public static void printBinary(String label, long value) {
        System.out.printf("%-20s: %20d (%s)%n", label, value, toBinaryString(value));
    }
}
```