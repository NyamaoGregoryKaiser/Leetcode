```java
package com.bitmanipulation.problems;

import com.bitmanipulation.utils.BitUtils;

/**
 * Problem 1: Count Set Bits (Hamming Weight)
 * Given an unsigned integer, count the number of '1' bits it has (also known as the Hamming weight).
 *
 * Constraints:
 * The input is a 32-bit unsigned integer.
 *
 * Examples:
 * Input: 00000000000000000000000000001011 (11)
 * Output: 3
 *
 * Input: 00000000000000000000000010000000 (128)
 * Output: 1
 *
 * Input: 11111111111111111111111111111101 (-3 in two's complement, representing 4294967293 unsigned)
 * Output: 31
 */
public class Problem1_CountSetBits {

    /**
     * Approach 1: Iterative (Check each bit)
     * This method iterates through all 32 bits of the integer, checking the least significant bit (LSB)
     * in each iteration. If the LSB is 1, the count is incremented. The integer is then right-shifted
     * by one to move the next bit to the LSB position.
     *
     * Time Complexity: O(k), where k is the number of bits in the integer (typically 32 for an int).
     *                  This is constant time, O(1), for fixed-size integers.
     * Space Complexity: O(1)
     *
     * @param n The unsigned integer.
     * @return The number of set bits.
     */
    public int countSetBits_Iterative(int n) {
        int count = 0;
        // Iterate 32 times for a 32-bit integer.
        // Even if 'n' becomes 0 early, we still loop 32 times as we are checking each bit position.
        for (int i = 0; i < 32; i++) {
            // Check if the least significant bit (LSB) is 1.
            // (n & 1) will be 1 if LSB is 1, otherwise 0.
            if ((n & 1) == 1) {
                count++;
            }
            // Right shift n by 1 bit.
            // For unsigned integers, Java's `>>>` (unsigned right shift) is often safer
            // to prevent sign extension issues when dealing with large positive numbers that
            // appear negative due to two's complement. For `int` `n`, `n >>>= 1` is appropriate.
            n >>>= 1;
        }
        return count;
    }

    /**
     * Approach 2: Brian Kernighan's Algorithm
     * This algorithm is more efficient because it only iterates as many times as there are set bits.
     * The trick `n & (n - 1)` unsets the least significant set bit (rightmost 1-bit) in `n`.
     * By repeatedly applying this operation until `n` becomes 0, we can count the number of set bits.
     *
     * Example: n = 11 (0000...1011)
     * 1. count = 0, n = 1011
     * 2. n-1 = 1010. n & (n-1) = 1011 & 1010 = 1010. count = 1.
     * 3. n = 1010. n-1 = 1001. n & (n-1) = 1010 & 1001 = 1000. count = 2.
     * 4. n = 1000. n-1 = 0111. n & (n-1) = 1000 & 0111 = 0000. count = 3.
     * 5. n = 0. Loop terminates.
     *
     * Time Complexity: O(S), where S is the number of set bits (Hamming weight).
     *                  In the worst case (all bits set), S=32, so O(32) or O(1).
     *                  In the best case (n=0), S=0, so O(1).
     * Space Complexity: O(1)
     *
     * @param n The unsigned integer.
     * @return The number of set bits.
     */
    public int countSetBits_BrianKernighan(int n) {
        int count = 0;
        // Loop continues as long as there are set bits in n.
        while (n != 0) {
            // Unset the least significant set bit.
            n = n & (n - 1);
            count++;
        }
        return count;
    }

    /**
     * Approach 3: Lookup Table (Precomputation)
     * This method is efficient if `countSetBits` is called many times for numbers within a certain range.
     * We can precompute the set bits for all 8-bit numbers (0-255) and store them in a table.
     * Then, for a 32-bit integer, we can break it into four 8-bit chunks and sum up their set bit counts.
     *
     * This approach demonstrates a trade-off: increased space (for the lookup table) for potentially faster
     * average-case time if many calls are made. For a single call, it might be slower due to table initialization.
     *
     * Note: The lookup table `LOOKUP_TABLE` is initialized once statically.
     *
     * Time Complexity: O(1) for each call after precomputation.
     *                  Precomputation: O(2^B * B) where B is chunk size (e.g., 8 bits).
     * Space Complexity: O(2^B) for the lookup table.
     *
     * @param n The unsigned integer.
     * @return The number of set bits.
     */
    private static final byte[] LOOKUP_TABLE = new byte[256]; // For 8-bit numbers (0-255)

    static {
        // Precompute set bits for all 8-bit numbers
        for (int i = 0; i < 256; i++) {
            LOOKUP_TABLE[i] = (byte) new Problem1_CountSetBits().countSetBits_BrianKernighan(i);
        }
        System.out.println("Problem1_CountSetBits: Lookup table initialized for 8-bit values.");
    }

    public int countSetBits_LookupTable(int n) {
        // Break 32-bit integer into four 8-bit chunks and sum their set bit counts from the lookup table.
        // We use `& 0xFF` to get the last 8 bits, as int casts to byte can result in negative values for numbers > 127.
        // The unsigned right shift `>>>` ensures correct positive values for each 8-bit chunk.
        return LOOKUP_TABLE[n & 0xFF] +            // Last 8 bits
               LOOKUP_TABLE[(n >>> 8) & 0xFF] +    // Next 8 bits
               LOOKUP_TABLE[(n >>> 16) & 0xFF] +   // Next 8 bits
               LOOKUP_TABLE[(n >>> 24) & 0xFF];    // First 8 bits
    }


    /**
     * Approach 4: Built-in Function
     * Most modern programming languages provide built-in functions to count set bits,
     * which are typically highly optimized (often using hardware instructions like POPCNT).
     * In Java, this is `Integer.bitCount()`.
     *
     * Time Complexity: O(1) (highly optimized, often constant time at hardware level).
     * Space Complexity: O(1)
     *
     * @param n The unsigned integer.
     * @return The number of set bits.
     */
    public int countSetBits_BuiltIn(int n) {
        return Integer.bitCount(n);
    }

    // Helper method for demonstration
    public void demonstrate() {
        System.out.println("--- Problem 1: Count Set Bits (Hamming Weight) ---");
        int num1 = 11; // 0...01011, expected: 3
        int num2 = 0;  // 0, expected: 0
        int num3 = Integer.MAX_VALUE; // 0111...111, expected: 31
        int num4 = -1; // 1111...111 (all ones in two's complement), expected: 32 (unsigned perspective)
        int num5 = 128; // 0...10000000, expected: 1
        int num6 = 0xAAAAAAAA; // 1010...1010, expected: 16

        int[] testNumbers = {num1, num2, num3, num4, num5, num6};

        for (int num : testNumbers) {
            System.out.println("Number: " + num + " (" + BitUtils.toBinaryString(num) + ")");
            System.out.println("  Iterative: " + countSetBits_Iterative(num));
            System.out.println("  Brian Kernighan: " + countSetBits_BrianKernighan(num));
            System.out.println("  Lookup Table: " + countSetBits_LookupTable(num));
            System.out.println("  Built-in: " + countSetBits_BuiltIn(num));
            System.out.println("---------------------------------");
        }
    }
}
```