```typescript
/**
 * src/algorithms/isPowerOfTwo.ts
 *
 * Problem: Power of Two
 *
 * Given an integer `n`, return `true` if it is a power of two. Otherwise, return `false`.
 * An integer `n` is a power of two, if there exists an integer `x` such that `n == 2^x`.
 *
 * Examples:
 * 1 (2^0) -> true
 * 2 (2^1) -> true
 * 4 (2^2) -> true
 * 3 -> false
 * 0 -> false
 * -16 -> false
 */

/**
 * Approach 1: Iterative Division
 *
 * This approach repeatedly divides the number by 2 as long as it's even.
 * If, after all divisions, the number becomes 1, then it was a power of two.
 * It also handles edge cases for n <= 0.
 *
 * Example: n = 8
 * 1. n = 8, n % 2 == 0. n = 8 / 2 = 4.
 * 2. n = 4, n % 2 == 0. n = 4 / 2 = 2.
 * 3. n = 2, n % 2 == 0. n = 2 / 2 = 1.
 * 4. n = 1. Loop terminates. Return true.
 *
 * Time Complexity: O(log N). In the worst case, we divide N by 2 until it becomes 1.
 * Space Complexity: O(1)
 *
 * @param n The integer to check.
 * @returns True if n is a power of two, false otherwise.
 */
export function isPowerOfTwo_Iterative(n: number): boolean {
    if (n <= 0) {
        return false; // Powers of two are strictly positive.
    }
    while (n % 2 === 0) {
        n /= 2;
    }
    return n === 1;
}

/**
 * Approach 2: Bit Manipulation (Optimal)
 *
 * This is the most elegant and efficient solution using bitwise operations.
 *
 * Key Property: A positive integer `n` is a power of two if and only if it has
 *               exactly one '1' bit in its binary representation.
 *
 * Example:
 * 1 (2^0): 0001
 * 2 (2^1): 0010
 * 4 (2^2): 0100
 * 8 (2^3): 1000
 *
 * Consider `n - 1` for a power of two `n`:
 * If n = 8 (1000 in binary)
 * n - 1 = 7 (0111 in binary)
 *
 * Performing `n & (n - 1)`:
 *   1000 (n)
 * & 0111 (n - 1)
 * ------
 *   0000
 *
 * If `n` is a power of two, its binary representation is `1` followed by `k` zeros.
 * `n - 1` will be `k` ones.
 * So, `n & (n - 1)` will always be `0`.
 *
 * This approach also requires `n` to be positive, as 0 and negative numbers
 * would either fail the initial check or yield incorrect results with the bitwise logic.
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 *
 * @param n The integer to check.
 * @returns True if n is a power of two, false otherwise.
 */
export function isPowerOfTwo_BitManipulation(n: number): boolean {
    // 1. n must be positive. Powers of two are always > 0.
    // 2. A power of two in binary has exactly one '1' bit.
    //    When you subtract 1 from a power of two, all the trailing zeros become ones,
    //    and the single '1' bit becomes a zero.
    //    e.g., 8 (1000) - 1 = 7 (0111)
    //    e.g., 4 (0100) - 1 = 3 (0011)
    //    Thus, `n & (n - 1)` will be 0 if `n` is a power of two.
    return n > 0 && (n & (n - 1)) === 0;
}

/**
 * Main function to export the preferred/most optimal solution.
 */
export const isPowerOfTwo = isPowerOfTwo_BitManipulation;
```