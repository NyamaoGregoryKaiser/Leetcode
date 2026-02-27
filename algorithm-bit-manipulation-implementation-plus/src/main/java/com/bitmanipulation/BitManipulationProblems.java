```java
package com.bitmanipulation;

/**
 * BitManipulationProblems.java
 *
 * This class contains implementations for several common and challenging
 * Bit Manipulation problems frequently encountered in coding interviews.
 * Each problem includes multiple approaches, detailed comments, and complexity analysis.
 *
 * Problems Covered:
 * 1. Count Set Bits (Hamming Weight)
 * 2. Single Number (Find the unique element in an array where others appear twice)
 * 3. Power of Two (Check if a number is a power of two)
 * 4. Reverse Bits (Reverse the bits of an unsigned integer)
 * 5. Update Bits (Insert M into N from bit j to i)
 */
public class BitManipulationProblems {

    /**
     * Problem 1: Count Set Bits (Hamming Weight)
     * Write a function that takes an unsigned integer and returns the number of '1' bits it has
     * (also known as the Hamming weight).
     *
     * For example, the 32-bit integer 11 (binary 00000000000000000000000000001011) has a Hamming weight of 3.
     *
     * Constraints:
     * - The input is treated as an unsigned 32-bit integer.
     * - In Java, `int` is signed. For negative numbers, unsigned right shift `>>>` is crucial.
     *
     * Solutions:
     * 1. Iteration and Check LSB
     * 2. Brian Kernighan's Algorithm (Optimized)
     * 3. Java Built-in (for comparison)
     */

    /**
     * Solution 1.1: Iteration and Check LSB (Least Significant Bit)
     * Iterates through each bit of the number from right to left, checking if the LSB is 1.
     * Then performs an unsigned right-shift on the number to process the next bit.
     *
     * @param n The input integer.
     * @return The number of set bits.
     *
     * Time Complexity: O(k), where k is the number of bits in the integer (typically 32 for int).
     *                  In each step, we perform a bitwise AND and a right shift.
     * Space Complexity: O(1), as no extra space proportional to input size is used.
     */
    public int countSetBits_Iteration(int n) {
        int count = 0;
        // Loop until all bits are shifted out.
        // Using `n != 0` is sufficient here. If `n` becomes negative, `>>>` will eventually make it 0.
        while (n != 0) {
            count += (n & 1); // Check if the least significant bit is 1.
                              // `n & 1` evaluates to 1 if LSB is 1, else 0.
            n >>>= 1;         // Unsigned right shift by 1 to process the next bit.
                              // Crucial for handling negative inputs correctly as 'unsigned'.
        }
        return count;
    }

    /**
     * Solution 1.2: Brian Kernighan's Algorithm
     * This algorithm clears the least significant set bit in each iteration.
     * The number of iterations equals the number of set bits, making it efficient for sparse numbers.
     * Key operation: `n = n & (n - 1)`
     *
     * How it works:
     * Consider a number `n` in binary, say `...10000`.
     * `n - 1` would be `...01111`.
     * Performing `n & (n - 1)` results in `...00000`, effectively turning off the rightmost set bit.
     * Each iteration reduces the number of set bits by one until `n` becomes 0.
     *
     * @param n The input integer.
     * @return The number of set bits.
     *
     * Time Complexity: O(s), where s is the number of set bits (Hamming weight).
     *                  This is generally faster than O(k) for sparse numbers (few set bits).
     *                  Worst case is O(k) if all bits are set (e.g., -1 or Integer.MAX_VALUE).
     * Space Complexity: O(1).
     */
    public int countSetBits_BrianKernighan(int n) {
        int count = 0;
        while (n != 0) {
            n = n & (n - 1); // Clear the least significant set bit.
            count++;         // Increment count for each set bit found.
        }
        return count;
    }

    /**
     * Solution 1.3: Java Built-in Function
     * For completeness and usually the most performant approach in competitive programming/production.
     * The JVM often leverages hardware instructions (like `POPCOUNT` or `POPCNT`) for this operation.
     *
     * @param n The input integer.
     * @return The number of set bits.
     *
     * Time Complexity: O(1) - The JVM typically leverages hardware instructions for this operation.
     * Space Complexity: O(1).
     */
    public int countSetBits_BuiltIn(int n) {
        return Integer.bitCount(n);
    }


    /**
     * Problem 2: Single Number
     * Given a non-empty array of integers, every element appears twice except for one. Find that single one.
     * Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?
     *
     * Example 1:
     * Input: [2,2,1]
     * Output: 1
     *
     * Example 2:
     * Input: [4,1,2,1,2]
     * Output: 4
     *
     * Constraints:
     * - The array is non-empty.
     * - Elements are integers.
     *
     * Solutions:
     * 1. XOR Property (Optimal)
     * 2. Using a HashMap (Brute Force/Alternative, uses extra memory) - implemented in BruteForceSolutions.java
     */

    /**
     * Solution 2.1: XOR Property
     * The XOR bitwise operation has three key properties:
     * 1. Commutative: A ^ B = B ^ A
     * 2. Associative: A ^ (B ^ C) = (A ^ B) ^ C
     * 3. Identity: X ^ 0 = X
     * 4. Inverse: X ^ X = 0
     *
     * If we XOR all elements in the array, all numbers that appear twice will cancel each other out (X ^ X = 0).
     * The single number, XORed with 0 (the result of all pairs canceling out), will remain (X ^ 0 = X).
     *
     * @param nums The input array of integers.
     * @return The single number that appears only once.
     *
     * Time Complexity: O(N), where N is the number of elements in the array. We iterate through the array once.
     * Space Complexity: O(1), as no extra memory is used apart from the result variable.
     */
    public int singleNumber_XOR(int[] nums) {
        int single = 0; // Initialize with 0, as X ^ 0 = X
        for (int num : nums) {
            single ^= num; // XOR each number with the running result
        }
        return single;
    }


    /**
     * Problem 3: Power of Two
     * Given an integer n, return true if it is a power of two. Otherwise, return false.
     * An integer n is a power of two, if there exists an integer x such that n == 2^x.
     *
     * Example 1:
     * Input: n = 1
     * Output: true (2^0 = 1)
     *
     * Example 2:
     * Input: n = 16
     * Output: true (2^4 = 16)
     *
     * Example 3:
     * Input: n = 3
     * Output: false
     *
     * Constraints:
     * -2^31 <= n <= 2^31 - 1
     *
     * Solutions:
     * 1. Bitwise AND (Optimal)
     * 2. Loop and Divide (Alternative)
     */

    /**
     * Solution 3.1: Bitwise AND Trick
     * A number `n` is a power of two if and only if `n > 0` and `(n & (n - 1)) == 0`.
     *
     * How it works:
     * If `n` is a power of two, its binary representation has exactly one '1' bit and all other bits are '0'.
     * Example: 8 (1000_2)
     * `n - 1` will have all bits to the right of the single '1' bit set to '1', and that single '1' bit will be '0'.
     * Example: 8 - 1 = 7 (0111_2)
     *
     * So, `n & (n - 1)` will always be 0.
     * Example: 1000_2 & 0111_2 = 0000_2
     *
     * If `n` is not a power of two, it has more than one '1' bit. `n & (n - 1)` will clear its rightmost set bit,
     * but other set bits will remain, so the result will not be 0.
     * Example: 6 (0110_2)
     * 6 - 1 = 5 (0101_2)
     * 6 & 5 = 0100_2 (which is not 0)
     *
     * We must also check `n > 0` because 0 is not a power of two, and negative numbers also have this property due to two's complement.
     *
     * @param n The input integer.
     * @return True if n is a power of two, false otherwise.
     *
     * Time Complexity: O(1), as it involves a constant number of bitwise operations.
     * Space Complexity: O(1).
     */
    public boolean isPowerOfTwo_Bitwise(int n) {
        // A power of two must be positive.
        // And `n & (n - 1)` will be 0 if only one bit is set.
        return n > 0 && (n & (n - 1)) == 0;
    }

    /**
     * Solution 3.2: Loop and Divide (Alternative)
     * Repeatedly divides `n` by 2 until it becomes 1. If at any point `n` is not divisible by 2
     * (meaning its LSB is 1 when it shouldn't be for an even number, or it's not 1 at the end),
     * or if `n` starts <= 0, then it's not a power of two.
     *
     * @param n The input integer.
     * @return True if n is a power of two, false otherwise.
     *
     * Time Complexity: O(log N), where N is the input number. Each division by 2 reduces N by half.
     * Space Complexity: O(1).
     */
    public boolean isPowerOfTwo_Loop(int n) {
        if (n <= 0) { // Powers of two are always positive.
            return false;
        }
        while (n % 2 == 0) { // While n is even
            n /= 2;          // Divide by 2
        }
        return n == 1; // If n reduces to 1, it was a power of two.
    }


    /**
     * Problem 4: Reverse Bits
     * Reverse the bits of a given 32-bit unsigned integer.
     *
     * Example:
     * Input: 00000010100101000001111010011100 (binary representation of some integer)
     * Output: 00111001011110000010100101000000 (reversed)
     *
     * Note:
     * - In Java, `int` is signed. We treat the input as an unsigned 32-bit integer.
     * - The `>>>` operator is important for unsigned right shift.
     *
     * Solutions:
     * 1. Iteration and Bit Manipulation (Optimal)
     * 2. Iteration with Bit Swapping (Less efficient for general case)
     * 3. Java Built-in (for comparison) - Not directly available for bit reversal,
     *    but `Integer.reverse()` does exactly this.
     */

    /**
     * Solution 4.1: Iteration and Bit Manipulation
     * Iterates through all 32 bits. In each step:
     * 1. Extracts the LSB of the original number `n`.
     * 2. Appends this LSB to the result by left-shifting `result` and OR-ing the LSB.
     * 3. Right-shifts `n` to process the next bit.
     *
     * This method effectively builds the reversed number bit by bit.
     *
     * @param n The input unsigned integer.
     * @return The integer with its bits reversed.
     *
     * Time Complexity: O(k), where k is the number of bits (32 for an int).
     *                  We iterate 32 times, performing constant-time bitwise operations.
     * Space Complexity: O(1).
     */
    public int reverseBits_Iteration(int n) {
        int result = 0;
        for (int i = 0; i < 32; i++) {
            // Left shift the result to make space for the next bit
            result <<= 1;
            // Get the least significant bit of n
            int lsb = n & 1;
            // OR the LSB into the result
            result |= lsb;
            // Right shift n to process the next bit
            n >>>= 1; // Use unsigned right shift
        }
        return result;
    }

    /**
     * Solution 4.2: Java Built-in Function
     * Java's `Integer.reverse()` method directly reverses the bit order of an int.
     * This is the most efficient method in a Java context, typically implemented with
     * highly optimized machine instructions.
     *
     * @param n The input integer.
     * @return The integer with its bits reversed.
     *
     * Time Complexity: O(1) - Implemented efficiently at the JVM/hardware level.
     * Space Complexity: O(1).
     */
    public int reverseBits_BuiltIn(int n) {
        return Integer.reverse(n);
    }


    /**
     * Problem 5: Update Bits (Insert M into N)
     * You are given two 32-bit numbers, N and M, and two bit positions, i and j.
     * Write a method to insert M into N such that M starts at bit j and ends at bit i.
     * You can assume that bits j through i have enough space to fit M.
     * That is, if M has length k, you can assume j - i + 1 >= k.
     *
     * Example:
     * N = 10000000000 (binary) = 1024
     * M = 10011 (binary) = 19
     * i = 2, j = 6
     * Output: N = 10001001100 (binary) = 1164
     *
     * Constraints:
     * - 0 <= i <= j < 32
     * - N, M are 32-bit integers.
     *
     * Solutions:
     * 1. Clear bits in N, then set bits from M (Optimal)
     */

    /**
     * Solution 5.1: Clear bits in N, then set bits from M
     * This approach involves two main steps:
     * 1. Clear the bits in `N` from position `i` to `j`.
     * 2. Shift `M` to align it with position `i` and then OR it with the modified `N`.
     *
     * Step 1: Clear bits from i to j in N
     * To clear the bits from i to j, we need a mask with 0s in that range and 1s elsewhere.
     * - Create a mask for bits from 0 to i-1: `(1 << i) - 1` (e.g., if i=2, mask is 00...00011)
     * - Create a mask for bits from j+1 to 31: `~((1 << (j + 1)) - 1)` (e.g., if j=6, then (1 << 7)-1 is 0...1111111, negate it to get 1...11111110000000)
     *   Alternatively, `~0 << (j + 1)` which creates 1s from j+1 to 31, and 0s from 0 to j.
     * - Combine these two masks using OR: `leftMask | rightMask`.
     * - Apply the combined mask to N using AND: `N & combinedMask`.
     *
     * Step 2: Shift M and insert into N
     * - Left shift `M` by `i` positions: `M << i`. This aligns M to start at bit `i`.
     * - OR this shifted `M` with the cleared `N`: `(N & combinedMask) | (M << i)`.
     *
     * @param n The base integer.
     * @param m The integer to be inserted.
     * @param i The starting bit position (inclusive).
     * @param j The ending bit position (inclusive).
     * @return The modified integer N with M inserted.
     *
     * Time Complexity: O(1), involves a fixed number of bitwise operations.
     * Space Complexity: O(1).
     */
    public int updateBits(int n, int m, int i, int j) {
        // Step 1: Create a mask to clear bits from i to j in N.
        // Part 1: All 1s from bit j+1 to the end (left part).
        // e.g., if j=6, we want 111...1110000000
        int leftMask = ~0 << (j + 1); // ~0 is all 1s. Left shift creates 0s at the right.

        // Part 2: All 1s from bit 0 to i-1 (right part).
        // e.g., if i=2, we want 000...000000011
        // (1 << i) creates 0...0100 (if i=2)
        // (1 << i) - 1 creates 0...0011 (if i=2)
        int rightMask = (1 << i) - 1;

        // Combine the two masks to get 1s everywhere except between i and j (inclusive).
        int combinedMask = leftMask | rightMask;

        // Step 2: Clear bits from i to j in N.
        // N_cleared will have 0s from bit i to j, and original bits elsewhere.
        int nCleared = n & combinedMask;

        // Step 3: Shift M to align with bit i.
        // M_shifted will have M starting at position i.
        int mShifted = m << i;

        // Step 4: OR the cleared N with the shifted M to insert M.
        // This inserts M into the cleared section of N.
        return nCleared | mShifted;
    }


    /**
     * Helper to print integer in binary format for debugging/explanation.
     * @param num The integer to print.
     * @return A 32-bit binary string representation.
     */
    public static String toBinaryString(int num) {
        return String.format("%32s", Integer.toBinaryString(num)).replace(' ', '0');
    }
}
```