/**
 * problem3-power-function/power-naive-iterative.ts
 *
 * Implements the power function (x^n) using a naive iterative approach.
 * This method simply multiplies `x` by itself `n` times.
 * It handles positive, negative, and zero exponents, and considers the base `x`.
 *
 * Time Complexity: O(|n|)
 *   The loop runs `|n|` times, performing a multiplication in each iteration.
 * Space Complexity: O(1)
 *   Only a few variables are used, independent of `n`.
 */

/**
 * Calculates `x` raised to the power `n` (`x^n`) using a naive iterative approach.
 *
 * @param x The base number (can be float).
 * @param n The exponent (integer, can be positive, negative, or zero).
 * @returns The result of `x^n`.
 * @throws Error if `x` is 0 and `n` is negative (division by zero).
 */
export function powerNaiveIterative(x: number, n: number): number {
    // Edge case: x^0 = 1 for any x (including x=0, conventionally)
    if (n === 0) {
        return 1;
    }

    // Handle negative exponents: x^-n = 1 / x^n
    let exponent = Math.abs(n);
    let result = 1.0;

    // Perform multiplications
    for (let i = 0; i < exponent; i++) {
        result *= x;
    }

    // If the original exponent was negative, invert the result.
    if (n < 0) {
        // Handle potential division by zero if x is 0 and n is negative.
        // 0^-n is undefined for n > 0.
        if (x === 0) {
            throw new Error("Division by zero: Cannot calculate 0 to a negative power.");
        }
        return 1 / result;
    }

    return result;
}