/**
 * problem3-power-function/power-binary-exponentiation.ts
 *
 * Implements the power function (x^n) using the "Binary Exponentiation"
 * also known as "Exponentiation by Squaring" algorithm.
 * This method significantly reduces the number of multiplications compared to the naive approach.
 *
 * The core idea is based on the binary representation of `n`.
 * If `n` is even: `x^n = (x^(n/2))^2`
 * If `n` is odd: `x^n = x * x^(n-1) = x * (x^((n-1)/2))^2`
 *
 * This can be implemented iteratively by checking the least significant bit of `n`.
 *
 * Time Complexity: O(log |n|)
 *   The number of multiplications is proportional to the number of bits in `|n|`, which is `log |n|`.
 * Space Complexity: O(1)
 *   Only a few variables are used, independent of `n`.
 */

/**
 * Calculates `x` raised to the power `n` (`x^n`) using binary exponentiation.
 * This is an optimized approach.
 *
 * @param x The base number (can be float).
 * @param n The exponent (integer, can be positive, negative, or zero).
 * @returns The result of `x^n`.
 * @throws Error if `x` is 0 and `n` is negative (division by zero).
 */
export function powerBinaryExponentiation(x: number, n: number): number {
    // Edge case: x^0 = 1 for any x (including x=0, conventionally).
    // This is a common mathematical convention.
    if (n === 0) {
        return 1;
    }

    // Handle negative exponents: x^-n = 1 / x^n
    // We calculate x^|n| and then take its reciprocal.
    let currentN = n;
    if (n < 0) {
        // If x is 0 and n is negative, it's division by zero.
        // 0 to any negative power is undefined.
        if (x === 0) {
            throw new Error("Division by zero: Cannot calculate 0 to a negative power.");
        }
        currentN = -n; // Work with positive exponent
    }

    let result = 1.0;
    let currentX = x; // This will be squared repeatedly

    // Iterate while the exponent is greater than 0
    while (currentN > 0) {
        // If the current exponent is odd (least significant bit is 1)
        // This means we need to multiply our `result` by `currentX`.
        if (currentN % 2 === 1) {
            result *= currentX;
        }
        // Square `currentX` for the next iteration.
        // This effectively moves to the next bit (higher power of 2).
        currentX *= currentX;
        // Divide the exponent by 2 (integer division), effectively shifting bits right.
        currentN = Math.floor(currentN / 2);
    }

    // If the original exponent was negative, return the reciprocal of the calculated result.
    if (n < 0) {
        return 1 / result;
    }

    return result;
}