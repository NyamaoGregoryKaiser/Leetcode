```java
package com.bitmanipulation.problems;

import com.bitmanipulation.utils.BitUtils;

/**
 * Problem 4: Reverse Bits
 * Reverse the bits of a given 32-bit unsigned integer.
 *
 * Constraints:
 * The input is a 32-bit unsigned integer.
 *
 * Examples:
 * Input: n = 00000010100101000001111010011100 (binary representation of 43261596)
 * Output: 00111001011110000010100101000000 (binary representation of 964176192)
 *
 * Input: n = 11111111111111111111111111111101 (binary representation of -3 or 4294967293 unsigned)
 * Output: 10111111111111111111111111111111 (binary representation of 3221225471)
 */
public class Problem4_ReverseBits {

    /**
     * Approach 1: Iterative Bit Shifting
     * This method iterates 32 times (once for each bit). In each iteration:
     * 1. It extracts the least significant bit (LSB) of the input number `n` using `(n & 1)`.
     * 2. It appends this LSB to the `reversed` result by left-shifting `reversed` and OR-ing the LSB.
     * 3. It then right-shifts `n` to process the next bit.
     *
     * Example: n = 0000...1011 (11)
     * Initial: reversed = 0
     * Iter 1: n=...1011. LSB = 1. reversed = (0 << 1) | 1 = 1. n = ...0101 (n >>= 1)
     * Iter 2: n=...0101. LSB = 1. reversed = (1 << 1) | 1 = 3. n = ...0010
     * Iter 3: n=...0010. LSB = 0. reversed = (3 << 1) | 0 = 6. n = ...0001
     * Iter 4: n=...0001. LSB = 1. reversed = (6 << 1) | 1 = 13. n = ...0000
     * ...
     * After 32 iterations, `reversed` will contain the reversed bits of the original `n`.
     *
     * Note on unsigned vs signed: Java `int` is signed. When performing `n >>= 1`, it performs arithmetic right shift,
     * which preserves the sign bit. However, for an "unsigned" 32-bit integer, we should use `n >>>= 1`
     * (unsigned right shift) to always fill with 0s from the left. This is crucial for numbers where the MSB is 1
     * (i.e., numbers that are negative in Java's signed representation but positive in unsigned context).
     * The problem asks for "unsigned integer", so `>>>` is appropriate for `n`.
     * The `reversed` variable is built up from LSBs, so it will always be positive until a 1 reaches the MSB,
     * which is fine.
     *
     * Time Complexity: O(k), where k is the number of bits (32 for an int). This is O(1).
     * Space Complexity: O(1)
     *
     * @param n The 32-bit unsigned integer.
     * @return The integer with its bits reversed.
     */
    public int reverseBits_Iterative(int n) {
        int reversed = 0;
        // Iterate 32 times for a 32-bit integer.
        for (int i = 0; i < 32; i++) {
            // Left shift the 'reversed' result to make space for the next bit.
            reversed <<= 1;
            // Get the least significant bit (LSB) of 'n'.
            // (n & 1) will be 1 if LSB is 1, otherwise 0.
            int lsb = (n & 1);
            // OR the LSB into the 'reversed' result.
            reversed |= lsb;
            // Right shift 'n' by 1 bit to process the next bit.
            // Use unsigned right shift (>>>) for unsigned integer behavior.
            n >>>= 1;
        }
        return reversed;
    }

    /**
     * Approach 2: Byte-wise Reversal with Precomputation/Lookup Table
     * This approach breaks the 32-bit integer into four 8-bit chunks (bytes).
     * It then reverses each byte using a precomputed lookup table and combines them.
     * This can be faster if the function is called many times, as the precomputation cost is amortized.
     *
     * The lookup table `REVERSE_BYTE_TABLE` stores the reversed form of every 8-bit number (0-255).
     *
     * Time Complexity: O(1) for each call after precomputation.
     *                  Precomputation: O(2^8 * 8) which is O(256 * 8) constant time.
     * Space Complexity: O(2^8) for the lookup table.
     *
     * @param n The 32-bit unsigned integer.
     * @return The integer with its bits reversed.
     */
    private static final int[] REVERSE_BYTE_TABLE = new int[256];

    static {
        // Precompute reversed bytes for all 8-bit numbers (0-255)
        for (int i = 0; i < 256; i++) {
            int byteVal = i;
            int reversedByte = 0;
            // Reverse bits for an 8-bit number using the iterative approach
            for (int j = 0; j < 8; j++) {
                reversedByte <<= 1;
                reversedByte |= (byteVal & 1);
                byteVal >>>= 1;
            }
            REVERSE_BYTE_TABLE[i] = reversedByte;
        }
        System.out.println("Problem4_ReverseBits: Reverse byte lookup table initialized.");
    }

    public int reverseBits_LookupTable(int n) {
        int reversed = 0;
        // Extract each byte, reverse it using the lookup table, and place it in the correct position.
        // For a 32-bit number AABBCCDD (where AA is MSB byte, DD is LSB byte):
        // Reversing the entire 32-bit number means DD will become MSB byte, and AA will become LSB byte.
        // So, we reverse DD, then left-shift it by 24 bits.
        // We reverse CC, then left-shift it by 16 bits, etc.

        // Byte 0 (LSB 8 bits of n), reverse, then shift to MSB 8 bits of result
        reversed |= (REVERSE_BYTE_TABLE[n & 0xFF] << 24);
        // Byte 1 (next 8 bits of n), reverse, then shift to next MSB 8 bits of result
        reversed |= (REVERSE_BYTE_TABLE[(n >>> 8) & 0xFF] << 16);
        // Byte 2 (next 8 bits of n), reverse, then shift to next LSB 8 bits of result
        reversed |= (REVERSE_BYTE_TABLE[(n >>> 16) & 0xFF] << 8);
        // Byte 3 (MSB 8 bits of n), reverse, then shift to LSB 8 bits of result
        reversed |= (REVERSE_BYTE_TABLE[(n >>> 24) & 0xFF]);

        return reversed;
    }

    // Helper method for demonstration
    public void demonstrate() {
        System.out.println("\n--- Problem 4: Reverse Bits ---");
        int num1 = 43261596; // 00000010100101000001111010011100
        int num2 = -3;      // 11111111111111111111111111111101 (unsigned interpretation of this bit pattern)
        int num3 = 1;       // 00...001
        int num4 = Integer.MIN_VALUE; // 1000...000 (2^31)

        int[] testNumbers = {num1, num2, num3, num4};

        for (int num : testNumbers) {
            String originalBinary = BitUtils.toBinaryString(num);
            int reversedIterative = reverseBits_Iterative(num);
            int reversedLookup = reverseBits_LookupTable(num);

            System.out.println("Original: " + num);
            System.out.println("  Binary: " + originalBinary);
            System.out.println("  Reversed (Iterative): " + reversedIterative);
            System.out.println("  Binary: " + BitUtils.toBinaryString(reversedIterative));
            System.out.println("  Reversed (Lookup Table): " + reversedLookup);
            System.out.println("  Binary: " + BitUtils.toBinaryString(reversedLookup));
            System.out.println("  Are results consistent? " + (reversedIterative == reversedLookup));
            System.out.println("---------------------------------");
        }
    }
}
```