```java
package com.example.mathproblems;

/**
 * Utility class for calculating Greatest Common Divisor (GCD) and Least Common Multiple (LCM).
 * Provides multiple approaches for GCD, demonstrating efficiency differences.
 */
public class GCDCalculator {

    /**
     * Calculates the Greatest Common Divisor (GCD) of two non-negative integers
     * using the Euclidean Algorithm (iterative approach).
     * This is generally the most efficient and preferred method for GCD.
     *
     * The Euclidean algorithm is based on the principle that the greatest common
     * divisor of two numbers does not change if the larger number is replaced
     * by its difference with the smaller number. This process continues until
     * one of the numbers is zero, and the other number is the GCD.
     * A more efficient version replaces the larger number with the remainder
     * when divided by the smaller number.
     *
     * Time Complexity: O(log(min(a, b))) - The number of steps is proportional
     *                  to the number of digits in the smaller number, specifically
     *                  logarithmic with respect to the input values.
     * Space Complexity: O(1) - Constant space, as only a few variables are used.
     *
     * @param a The first non-negative integer.
     * @param b The second non-negative integer.
     * @return The GCD of 'a' and 'b'.
     * @throws IllegalArgumentException if 'a' or 'b' is negative.
     */
    public long gcdIterative(long a, long b) {
        if (a < 0 || b < 0) {
            throw new IllegalArgumentException("Inputs must be non-negative for GCD.");
        }
        while (b != 0) {
            long temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    /**
     * Calculates the Greatest Common Divisor (GCD) of two non-negative integers
     * using the Euclidean Algorithm (recursive approach).
     * This method is conceptually identical to the iterative version but uses
     * recursion.
     *
     * The base case is when 'b' is 0, in which case 'a' is the GCD.
     * Otherwise, the GCD(a, b) is the same as GCD(b, a % b).
     *
     * Time Complexity: O(log(min(a, b))) - Similar to the iterative version,
     *                  the number of recursive calls is logarithmic.
     * Space Complexity: O(log(min(a, b))) - Due to the recursion stack,
     *                   the space complexity is proportional to the depth of recursion.
     *                   This is generally less desirable than the iterative O(1) space.
     *
     * @param a The first non-negative integer.
     * @param b The second non-negative integer.
     * @return The GCD of 'a' and 'b'.
     * @throws IllegalArgumentException if 'a' or 'b' is negative.
     */
    public long gcdRecursive(long a, long b) {
        if (a < 0 || b < 0) {
            throw new IllegalArgumentException("Inputs must be non-negative for GCD.");
        }
        if (b == 0) {
            return a;
        }
        return gcdRecursive(b, a % b);
    }

    /**
     * Calculates the Greatest Common Divisor (GCD) of two non-negative integers
     * using the Binary GCD algorithm (Stein's algorithm).
     * This algorithm avoids divisions and multiplications, relying solely on
     * subtractions, comparisons, and shifts, which can be faster on some
     * architectures, especially for very large numbers or when division is expensive.
     *
     * The algorithm works by:
     * 1. Handling cases where one or both numbers are zero.
     * 2. Dividing out common factors of 2.
     * 3. Repeatedly reducing the larger of the two odd numbers using subtraction
     *    and division by 2 until one becomes 0.
     *
     * Time Complexity: O((log a + log b)^2) or O(log^2 N) in general cases,
     *                  but often considered O(log(min(a, b))) on average for practical inputs
     *                  due to efficient bitwise operations. It performs a number of steps
     *                  proportional to the sum of the number of bits in 'a' and 'b'.
     * Space Complexity: O(1) - Constant space.
     *
     * @param u The first non-negative integer.
     * @param v The second non-negative integer.
     * @return The GCD of 'u' and 'v'.
     * @throws IllegalArgumentException if 'u' or 'v' is negative.
     */
    public long gcdBinary(long u, long v) {
        if (u < 0 || v < 0) {
            throw new IllegalArgumentException("Inputs must be non-negative for GCD.");
        }
        // GCD(0, v) = v; GCD(u, 0) = u; GCD(0, 0) = 0
        if (u == 0) return v;
        if (v == 0) return u;

        // Find common factors of 2
        // k is the power of 2 that divides both u and v
        int k = 0;
        while (((u | v) & 1) == 0 && u != 0 && v != 0) { // while both are even
            u >>= 1;
            v >>= 1;
            k++;
        }
        // At this point, u or v (or both) are odd.
        // If one of them is 0, the loop condition above already handled it.
        // It's guaranteed that u or v (or both) are odd at this point if they were not 0.

        // Make u odd
        while ((u & 1) == 0 && u != 0) { // while u is even
            u >>= 1;
        }

        // Now u is odd.
        // The main loop: repeatedly subtract the smaller from the larger
        // and divide by 2 until one becomes 0.
        do {
            // Make v odd
            while ((v & 1) == 0 && v != 0) { // while v is even
                v >>= 1;
            }

            // Now both u and v are odd.
            // If v > u, swap them to ensure u >= v for subtraction.
            if (u < v) {
                long temp = u;
                u = v;
                v = temp;
            }
            // Subtracting odd from odd results in even, so divide by 2.
            u = (u - v);
        } while (u != 0 && v != 0);

        // One of them is 0. The other is the GCD of the odd parts.
        // Multiply back the common factors of 2 (2^k).
        return v << k; // If u is 0, v is the GCD. (Actually, (u == 0 ? v : u) << k)
                       // After loop, u becomes 0 first if u was larger or equal,
                       // or v becomes 0 if v was larger and then swapped to u.
                       // The final non-zero value is the GCD of the odd parts.
                       // Because of the 'u = u - v' at the end of the loop,
                       // the final non-zero value will be 'v'.
    }


    /**
     * Calculates the Least Common Multiple (LCM) of two non-negative integers.
     * The LCM is derived from the GCD using the formula:
     * LCM(a, b) = |a * b| / GCD(a, b)
     *
     * This method uses the iterative Euclidean algorithm for GCD as it's
     * generally the most robust and widely accepted.
     *
     * Time Complexity: O(log(min(a, b))) - Dominated by the GCD calculation.
     * Space Complexity: O(1) - Constant space.
     *
     * @param a The first non-negative integer.
     * @param b The second non-negative integer.
     * @return The LCM of 'a' and 'b'. Returns 0 if either 'a' or 'b' is 0.
     * @throws IllegalArgumentException if 'a' or 'b' is negative.
     * @throws ArithmeticException if the product 'a * b' overflows long before division by GCD.
     *                            This can happen for very large inputs.
     */
    public long lcm(long a, long b) {
        if (a < 0 || b < 0) {
            throw new IllegalArgumentException("Inputs must be non-negative for LCM.");
        }
        if (a == 0 || b == 0) {
            return 0; // LCM with 0 is 0
        }

        // To prevent overflow for (a * b), we can divide first:
        // LCM(a, b) = (a / GCD(a, b)) * b
        // This works because GCD(a,b) always divides 'a' (or 'b') completely.
        return (a / gcdIterative(a, b)) * b;
    }
}
```