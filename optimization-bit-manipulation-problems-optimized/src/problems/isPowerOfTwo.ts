```typescript
/**
 * Problem: Power of Two
 *
 * Given an integer `n`, return `true` if it is a power of two. Otherwise, return `false`.
 *
 * An integer `n` is a power of two, if there exists an integer `x` such that `n == 2^x`.
 *
 * Constraints:
 * - -2^31 <= n <= 2^31 - 1
 */

/**
 * Approach 1: Iterative Division
 *
 * This method repeatedly divides `n` by 2 until it reaches 1.
 * If at any point `n` is not divisible by 2 (i.e., `n % 2 !== 0`), or `n` becomes 0, it's not a power of two.
 *
 * @param n The integer to check.
 * @returns True if n is a power of two, false otherwise.
 * @complexity
 * Time: O(log N) because we repeatedly divide N by 2.
 * Space: O(1)
 */
export function isPowerOfTwo_iterative(n: number): boolean {
    // Powers of two are always positive. 0 is not a power of two.
    if (n <= 0) {
        return false;
    }

    // Keep dividing n by 2 until it becomes 1
    while (n % 2 === 0) {
        n /= 2;
    }

    // If n is a power of two, it must eventually become 1
    return n === 1;
}

/**
 * Approach 2: Using Logarithm (Mathematical Approach)
 *
 * A number `n` is a power of two if `log2(n)` is an integer.
 * This can be checked by `log10(n) / log10(2)` or `Math.log(n) / Math.log(2)`.
 * Due to floating-point precision issues, direct comparison `x === Math.floor(x)` might fail.
 * A common way to handle this is to check if `x` is very close to `Math.round(x)`.
 *
 * @param n The integer to check.
 * @returns True if n is a power of two, false otherwise.
 * @complexity
 * Time: O(1) (logarithm calculation is typically O(1) for built-in functions).
 * Space: O(1)
 */
export function isPowerOfTwo_logarithm(n: number): boolean {
    if (n <= 0) {
        return false;
    }

    const logBase2 = Math.log2(n);
    // Check if the logarithm is an integer.
    // Due to potential floating point inaccuracies, comparing to rounded value is safer.
    return Math.abs(logBase2 - Math.round(logBase2)) < 1e-9; // Using a small epsilon
}

/**
 * Approach 3: Bitwise Check (Optimal)
 *
 * A positive integer `n` is a power of two if and only if it has exactly one set bit ('1' bit) in its binary representation.
 *
 * For example:
 * 1 (2^0): 0001
 * 2 (2^1): 0010
 * 4 (2^2): 0100
 * 8 (2^3): 1000
 *
 * Consider `n` and `n - 1`:
 * If `n` is a power of two, its binary representation is `100...0`.
 * Then `n - 1` will be `011...1`.
 *
 * Performing a bitwise AND operation: `n & (n - 1)`
 * `100...0`
 * `& 011...1`
 * `-----------`
 * ` 000...0` (which is 0)
 *
 * This property `n & (n - 1) === 0` holds true only for powers of two (and for 0, which we must exclude).
 *
 * @param n The integer to check.
 * @returns True if n is a power of two, false otherwise.
 * @complexity
 * Time: O(1)
 * Space: O(1)
 */
export function isPowerOfTwo_bitwise(n: number): boolean {
    // Powers of two must be positive.
    // If n <= 0, it's not a power of two.
    // The check `n & (n - 1) === 0` would evaluate to true for n = 0, so we must explicitly exclude it.
    // For n = 0: 0 & (-1) = 0.
    if (n <= 0) {
        return false;
    }

    // A number that is a power of two has only one '1' bit.
    // For example, 8 (1000), 7 (0111). 8 & 7 = 0.
    // For example, 6 (0110), 5 (0101). 6 & 5 = 0100 (4), not 0.
    return (n & (n - 1)) === 0;
}
```