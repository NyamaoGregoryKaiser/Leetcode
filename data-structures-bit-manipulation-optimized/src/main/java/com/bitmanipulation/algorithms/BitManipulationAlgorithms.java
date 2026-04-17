```java
package com.bitmanipulation.algorithms;

/**
 * This class provides implementations for various Bit Manipulation problems
 * commonly encountered in coding interviews. Each problem has its optimal
 * bitwise solution, along with alternative approaches and complexity analysis.
 *
 * All methods are designed to work with Java's 32-bit signed integers,
 * unless specified (e.g., when simulating unsigned behavior with >>>).
 */
public class BitManipulationAlgorithms {

    // --- Problem 1: Count Set Bits (Hamming Weight) ---
    // Write a function that takes an unsigned integer and returns the number of '1' bits
    // it has (also known as the Hamming weight).
    // Example: Input: 00000000000000000000000000001011 (decimal 11) -> Output: 3

    /**
     * Approach 1: Iterative check of LSB (Least Significant Bit) by right shifting.
     * For unsigned integers, `>>>` (unsigned right shift) is generally preferred
     * to ensure leading zeros are filled, regardless of the original number's sign bit.
     *
     * Time Complexity: O(k), where k is the number of bits in the integer (e.g., 32 for int).
     * Space Complexity: O(1)
     *
     * @param n The integer to count set bits for.
     * @return The number of set bits.
     */
    public int countSetBitsLoop(int n) {
        int count = 0;
        // Loop 32 times for a 32-bit integer.
        // For each bit, check if it's 1.
        for (int i = 0; i < 32; i++) {
            // Check the LSB: (n & 1) will be 1 if the LSB is set, 0 otherwise.
            if ((n & 1) == 1) {
                count++;
            }
            // Right shift n by 1. For unsigned behavior, use '>>>'.
            // This moves the next bit to the LSB position for the next iteration.
            n >>>= 1;
        }
        return count;
    }

    /**
     * Approach 2: Brian Kernighan's Algorithm.
     * This algorithm is more efficient than looping through all bits, especially for sparse numbers
     * (numbers with few set bits). It works by repeatedly turning off the rightmost set bit
     * until the number becomes 0. Each time a bit is turned off, we increment the count.
     * The trick `n & (n - 1)` effectively clears the rightmost set bit.
     *
     * Time Complexity: O(S), where S is the number of set bits (Hamming weight).
     *                  In the worst case (all bits set), it's O(k), where k is bit length.
     * Space Complexity: O(1)
     *
     * @param n The integer to count set bits for.
     * @return The number of set bits.
     */
    public int countSetBitsBrianKernighan(int n) {
        int count = 0;
        // Continue looping as long as n has at least one set bit.
        while (n != 0) {
            // n & (n - 1) clears the rightmost set bit.
            // Example: n = 12 (0...01100)
            // n - 1 = 11 (0...01011)
            // n & (n - 1) = 0...01000 (8) -- rightmost '1' at bit 2 cleared.
            n = n & (n - 1);
            count++;
        }
        return count;
    }

    /**
     * Approach 3: Lookup Table.
     * This approach precomputes the Hamming weight for all possible 8-bit values (0-255).
     * Then, for a 32-bit integer, it extracts each of its four bytes and sums their
     * precomputed weights. This is extremely fast for repeated calls after initialization.
     *
     * Precomputation Time Complexity: O(2^8) = O(256)
     * Query Time Complexity: O(1) (4 array lookups and 3 additions).
     * Space Complexity: O(2^8) for the lookup table.
     *
     * @param n The integer to count set bits for.
     * @return The number of set bits.
     */
    private static final byte[] BYTE_BIT_COUNT = new byte[256];
    static {
        // Initialize the lookup table.
        // For each 8-bit value (0 to 255), calculate its set bit count
        // using Brian Kernighan's algorithm.
        for (int i = 0; i < 256; i++) {
            BYTE_BIT_COUNT[i] = (byte) new BitManipulationAlgorithms().countSetBitsBrianKernighan(i);
        }
    }

    public int countSetBitsLookupTable(int n) {
        // Extract each byte of the 32-bit integer and sum their precomputed counts.
        // (n & 0xFF) extracts the least significant byte.
        // (n >>> 8) & 0xFF extracts the second byte.
        // And so on for the third and fourth bytes.
        return BYTE_BIT_COUNT[n & 0xFF] +
               BYTE_BIT_COUNT[(n >>> 8) & 0xFF] +
               BYTE_BIT_COUNT[(n >>> 16) & 0xFF] +
               BYTE_BIT_COUNT[(n >>> 24) & 0xFF];
    }

    /**
     * Approach 4: Java API `Integer.bitCount()`.
     * This method directly uses the built-in function, which is often implemented
     * using highly optimized CPU instructions (popcount on modern CPUs).
     *
     * Time Complexity: O(1) (effectively, as it's a single CPU instruction).
     * Space Complexity: O(1)
     *
     * @param n The integer to count set bits for.
     * @return The number of set bits.
     */
    public int countSetBitsJavaAPI(int n) {
        return Integer.bitCount(n);
    }


    // --- Problem 2: Single Number ---
    // Given a non-empty array of integers, every element appears twice except for one.
    // Find that single one.
    // Constraint: Your algorithm should have a linear runtime complexity. Could you
    //             implement it without using extra memory?
    // Example: Input: [2, 2, 1] -> Output: 1

    /**
     * Approach: Using XOR property.
     * The XOR (exclusive OR) operator has two key properties:
     * 1. A ^ A = 0 (XORing a number with itself results in zero)
     * 2. A ^ 0 = A (XORing a number with zero results in the number itself)
     *
     * If we XOR all numbers in the array, all numbers that appear twice will cancel
     * each other out (A ^ A = 0), leaving only the unique number (0 ^ B = B).
     *
     * Time Complexity: O(N), where N is the number of elements in the array.
     * Space Complexity: O(1), as no extra memory (beyond input array) is used.
     *
     * @param nums An array of integers where all elements appear twice except for one.
     * @return The single unique number.
     * @throws IllegalArgumentException if the input array is null or empty.
     */
    public int singleNumber(int[] nums) {
        if (nums == null || nums.length == 0) {
            throw new IllegalArgumentException("Input array cannot be null or empty.");
        }

        int uniqueNumber = 0; // Initialize with 0, as XORing with 0 doesn't change the number.
        for (int num : nums) {
            uniqueNumber ^= num; // Accumulate XORs
        }
        return uniqueNumber;
    }


    // --- Problem 3: Reverse Bits ---
    // Reverse bits of a given 32-bit unsigned integer.
    // Example: Input: 00000010100101000001111010011100 (decimal 43261596)
    //          Output: 00111001011110000010100101000000 (decimal 964176192)

    /**
     * Approach: Iterative Bit Shifting and Masking.
     * We iterate 32 times, processing one bit from the input `n` at each step.
     * In each iteration, we take the least significant bit (LSB) of `n` and append
     * it to the `result` by shifting `result` left and then ORing the LSB.
     * The input `n` is right-shifted to expose the next bit.
     *
     * Time Complexity: O(k), where k is the number of bits (32 for a 32-bit integer).
     * Space Complexity: O(1)
     *
     * @param n The 32-bit unsigned integer to reverse. (Java's int is signed, but problem treats it as unsigned).
     * @return The integer with its bits reversed.
     */
    public int reverseBits(int n) {
        int reversed = 0;
        // Iterate 32 times for a 32-bit integer
        for (int i = 0; i < 32; i++) {
            // 1. Shift the `reversed` result one position to the left.
            // This makes space for the new bit from `n` at the LSB position.
            reversed <<= 1;

            // 2. Get the least significant bit (LSB) of `n`.
            // (n & 1) will be 1 if the LSB of n is set, 0 otherwise.
            int lsb_n = n & 1;

            // 3. OR the LSB of `n` into the `reversed` result.
            // This places the current bit from `n` into the new LSB of `reversed`.
            reversed |= lsb_n;

            // 4. Right shift `n` by 1.
            // This prepares `n` for the next iteration by moving the next bit to its LSB.
            // Use unsigned right shift '>>>' because the problem specifies an "unsigned integer".
            n >>>= 1;
        }
        return reversed;
    }


    // --- Problem 4: Power of Two ---
    // Given an integer n, return true if it is a power of two. Otherwise, return false.
    // An integer n is a power of two, if there exists an integer x such that n == 2^x.
    // Examples: n = 1 (2^0) -> true, n = 16 (2^4) -> true, n = 3 -> false

    /**
     * Approach 1: Bitwise AND Trick (Optimal).
     * A positive integer is a power of two if and only if it has exactly one bit set
     * in its binary representation.
     * The expression `n & (n - 1)` has the effect of turning off the rightmost set bit.
     * - If n is a power of two (e.g., 8 = 0...01000), then n - 1 (7 = 0...00111).
     *   `n & (n - 1)` will be 0 (0...01000 & 0...00111 = 0).
     * - If n is not a power of two (e.g., 6 = 0...00110), then n - 1 (5 = 0...00101).
     *   `n & (n - 1)` will be non-zero (0...00110 & 0...00101 = 0...00100 = 4).
     *
     * We also need to check `n > 0` because 0 is not a power of two, and negative numbers
     * are not considered powers of two by definition (2^x is always positive).
     * `0 & (-1)` would incorrectly evaluate to `0`.
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     *
     * @param n The integer to check.
     * @return True if n is a power of two, false otherwise.
     */
    public boolean isPowerOfTwo(int n) {
        // A number n is a power of two if it's positive and has only one bit set.
        // (n & (n - 1)) clears the rightmost set bit. If n has only one set bit,
        // then (n & (n - 1)) will be 0.
        return n > 0 && (n & (n - 1)) == 0;
    }

    /**
     * Approach 2: Loop and Division (Alternative/Brute Force).
     *
     * Time Complexity: O(log n) because we repeatedly divide by 2.
     * Space Complexity: O(1)
     *
     * @param n The integer to check.
     * @return True if n is a power of two, false otherwise.
     */
    public boolean isPowerOfTwoLoop(int n) {
        // Powers of two must be positive.
        if (n <= 0) {
            return false;
        }
        // If n is 1, it's 2^0, so it's a power of two.
        if (n == 1) {
            return true;
        }
        // Keep dividing n by 2 as long as it's even.
        // If at any point n becomes odd (and not 1), it's not a power of two.
        while (n % 2 == 0) {
            n /= 2;
        }
        // If n eventually becomes 1, it was a power of two.
        return n == 1;
    }


    // --- Problem 5: Insert M into N (Update Bits) ---
    // You are given two 32-bit numbers, N and M, and two bit positions, i and j.
    // Write a method to insert M into N such that M starts at bit j and ends at bit i.
    // You can assume that M will fit into the space between i and j.
    // Example: N = 10000000000 (1024 decimal), M = 10011 (19 decimal), i = 2, j = 6
    // Output: N = 10001001100 (1164 decimal)

    /**
     * Approach: Masking and ORing.
     * This problem requires clearing a specific range of bits in N and then
     * inserting M into that cleared section.
     *
     * Steps:
     * 1. Create a mask that has 0s from bit i to j (inclusive) and 1s everywhere else.
     * 2. Clear the bits in N within the range [i, j] by performing `N & mask`.
     * 3. Shift M left by `i` positions so it aligns with the target range [i, j].
     * 4. OR the shifted M with the cleared N.
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     *
     * @param N The base integer.
     * @param M The integer to insert.
     * @param i The starting bit position (inclusive, 0-indexed).
     * @param j The ending bit position (inclusive, 0-indexed).
     * @return The modified integer N with M inserted.
     * @throws IllegalArgumentException if i > j or if i or j are out of 0-31 range.
     */
    public int insertBits(int N, int M, int i, int j) {
        // Validate inputs
        if (i < 0 || i > 31 || j < 0 || j > 31 || i > j) {
            throw new IllegalArgumentException("Invalid bit positions: i=" + i + ", j=" + j);
        }

        // Step 1: Create a mask to clear bits from i to j in N.
        // This mask will have 1s everywhere except for the range [i, j].

        // Part 1: All 1s up to bit j+1 (inclusive), then 0s.
        // Example: If j=6, then j+1=7. (1 << (j + 1)) results in ...010000000 (1 at bit 7).
        //          Shifting this left (or simply making it for j+1) gives us 1s at higher positions.
        // Special case: if j is 31, then (1 << 32) would overflow for int.
        // If j is 31, we need a mask of all ones.
        int allOnes = ~0; // All 1s: 111...111

        int leftMask;
        if (j == 31) {
            // If j is 31, we need to clear bits up to MSB, so the left part of the mask
            // should cover nothing (i.e., be all 0s, as it's clearing *beyond* j).
            // This effectively means we only care about the rightMask.
            leftMask = 0;
        } else {
            // Creates a number with 1s from bit j+1 onwards, and 0s below j+1.
            // Example: j=6 -> (1 << 7) -> ...010000000. Left part of mask: 11...10000000
            leftMask = (allOnes << (j + 1));
        }


        // Part 2: All 0s from bit i onwards, then 1s.
        // Example: i=2 -> (1 << 2) -> 0...00100. Subtracting 1 gives 0...00011.
        // This mask has 1s from bit 0 to i-1.
        int rightMask = ((1 << i) - 1);

        // Combine the left and right masks to get the final mask for clearing bits.
        // This mask will have 1s outside the range [i, j] and 0s within [i, j].
        int clearMask = leftMask | rightMask;

        // Step 2: Clear the bits in N within the range [i, j].
        int N_cleared = N & clearMask;

        // Step 3: Shift M left by `i` positions.
        // This aligns M to be inserted into the cleared space.
        int M_shifted = M << i;

        // Step 4: OR the shifted M with the cleared N.
        // This places M into the designated bit range.
        int result = N_cleared | M_shifted;

        return result;
    }
}
```