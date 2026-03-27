```java
package com.bitmanipulation.problems;

import com.bitmanipulation.utils.BitUtils;

/**
 * Problem 3: Power of Two
 * Given an integer `n`, return `true` if it is a power of two. Otherwise, return `false`.
 * An integer `n` is a power of two, if there exists an integer `x` such that `n == 2^x`.
 *
 * Constraints:
 * -2^31 <= n <= 2^31 - 1
 *
 * Examples:
 * Input: n = 1
 * Output: true (2^0)
 *
 * Input: n = 16
 * Output: true (2^4)
 *
 * Input: n = 3
 * Output: false
 *
 * Input: n = 0
 * Output: false (0 is not a power of two)
 *
 * Input: n = -16
 * Output: false (negative numbers are not powers of two)
 */
public class Problem3_PowerOfTwo {

    /**
     * Approach 1: Iterative Division
     * A number `n` is a power of two if and only if `n > 0` and it is repeatedly divisible by 2
     * until it becomes 1. If at any point it's not divisible by 2 (and not 1), or if it's 0 or negative,
     * it's not a power of two.
     *
     * Time Complexity: O(log n). The number of divisions by 2 is proportional to log base 2 of n.
     * Space Complexity: O(1)
     *
     * @param n The integer to check.
     * @return True if n is a power of two, false otherwise.
     */
    public boolean isPowerOfTwo_Iterative(int n) {
        if (n <= 0) { // Powers of two are strictly positive
            return false;
        }
        while (n % 2 == 0) { // While n is even and greater than 0
            n /= 2;
        }
        return n == 1; // If it's a power of two, it must eventually reduce to 1
    }

    /**
     * Approach 2: Bitwise AND (`n & (n - 1)`)
     * This is the most common and efficient bit manipulation trick for this problem.
     *
     * A number `n` is a power of two if and only if it has exactly one '1' bit in its binary representation.
     *
     * Examples:
     * 1 (2^0): 0001
     * 2 (2^1): 0010
     * 4 (2^2): 0100
     * 8 (2^3): 1000
     *
     * If `n` is a power of two, then `n` will have the form `10...0` (a single 1 followed by zeros).
     * `n - 1` will have the form `01...1` (a zero followed by ones, up to the position of the 1 in `n`).
     *
     * So, `n & (n - 1)` will always be 0 for powers of two.
     * Example: n = 8 (1000)
     *          n - 1 = 7 (0111)
     *          n & (n - 1) = 1000 & 0111 = 0000 (0)
     *
     * We also need to handle edge cases:
     * - `n <= 0`: Powers of two are always positive.
     * - `n = 0`: 0 is not a power of two. `0 & (0-1)` is `0 & (-1)` which is `0`. So `n > 0` check is crucial.
     * - `n = 1`: 1 is a power of two (2^0). `1 & (1-1)` is `1 & 0`, which is `0`. So this works correctly.
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     *
     * @param n The integer to check.
     * @return True if n is a power of two, false otherwise.
     */
    public boolean isPowerOfTwo_BitwiseAND(int n) {
        // Powers of two must be strictly positive.
        // And they must have exactly one set bit.
        // n & (n - 1) clears the least significant set bit.
        // If n has only one set bit, then n & (n - 1) will be 0.
        return (n > 0) && ((n & (n - 1)) == 0);
    }

    /**
     * Approach 3: Check for single set bit (Using `Integer.bitCount`)
     * This approach explicitly counts the number of set bits. If it's 1 and the number is positive,
     * then it's a power of two.
     *
     * Time Complexity: O(1) (Java's `Integer.bitCount` is highly optimized, often using hardware instructions).
     * Space Complexity: O(1)
     *
     * @param n The integer to check.
     * @return True if n is a power of two, false otherwise.
     */
    public boolean isPowerOfTwo_BitCount(int n) {
        // Powers of two must be strictly positive.
        // Then, check if it has exactly one set bit.
        return (n > 0) && (Integer.bitCount(n) == 1);
    }

    // Helper method for demonstration
    public void demonstrate() {
        System.out.println("\n--- Problem 3: Power of Two ---");
        int[] testNumbers = {1, 2, 3, 4, 0, 16, 32, 1024, 1023, -1, -2, Integer.MAX_VALUE, Integer.MIN_VALUE};

        for (int num : testNumbers) {
            System.out.println("Number: " + num + " (" + BitUtils.toBinaryString(num) + ")");
            System.out.println("  Iterative: " + isPowerOfTwo_Iterative(num));
            System.out.println("  Bitwise AND (n & n-1): " + isPowerOfTwo_BitwiseAND(num));
            System.out.println("  Built-in bitCount: " + isPowerOfTwo_BitCount(num));
            System.out.println("---------------------------------");
        }
    }
}
```