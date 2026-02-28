/**
 * problem4-nth-fibonacci/fibonacci-matrix-exponentiation.ts
 *
 * Implements the Nth Fibonacci number calculation using Matrix Exponentiation.
 * This is an advanced technique that allows calculating the Nth Fibonacci number
 * in logarithmic time complexity, significantly faster than O(N) methods for large N.
 *
 * The key idea is based on the matrix transformation:
 * | F(n+1) |   | 1  1 | ^ n   | F(1) |
 * | F(n)   | = | 1  0 |     * | F(0) |
 *
 * Given F(0)=0 and F(1)=1, we have:
 * | F(n+1) |   | 1  1 | ^ n   | 1 |
 * | F(n)   | = | 1  0 |     * | 0 |
 *
 * So, to find F(n), we need to compute the Nth power of the matrix M = | 1  1 |
 *                                                                       | 1  0 |
 * And then extract the element M_pow[1][0] (or M_pow[0][1] depending on definition).
 *
 * The matrix power `M^n` is computed using binary exponentiation (exponentiation by squaring)
 * for matrices, which takes O(log n) matrix multiplications. Each matrix multiplication
 * for 2x2 matrices takes a constant number of arithmetic operations (8 multiplications, 4 additions).
 *
 * Time Complexity: O(log n)
 *   Due to binary exponentiation of the 2x2 matrix.
 * Space Complexity: O(1)
 *   If the matrix power function is iterative, or O(log n) if recursive due to call stack.
 *   Here, we use a recursive matrix power, so it's O(log n) space.
 */

import { Matrix, multiplyMatrices, powerMatrix } from '../../utils/matrix';

/**
 * The base Fibonacci matrix.
 * M = | 1  1 |
 *     | 1  0 |
 */
const FIB_BASE_MATRIX: Matrix = [
    [1, 1],
    [1, 0],
];

/**
 * Calculates the Nth Fibonacci number using matrix exponentiation.
 *
 * @param n The index of the Fibonacci number to calculate (non-negative integer).
 * @returns The Nth Fibonacci number.
 * @throws Error if `n` is negative or not an integer.
 */
export function fibonacciMatrixExponentiation(n: number): number {
    if (n < 0 || !Number.isInteger(n)) {
        throw new Error("Input must be a non-negative integer for Fibonacci sequence.");
    }

    // Base cases
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }

    // Calculate (FIB_BASE_MATRIX)^ (n-1)
    // We raise to (n-1) because the formula derived applies for F(n) based on F(1) and F(0).
    // Specifically, if we want F(n) and F(n-1), we need M^(n-1).
    // | F(n)   |   | 1  1 |^(n-1)   | F(1) |   | 1  1 |^(n-1)   | 1 |
    // | F(n-1) | = | 1  0 |        * | F(0) | = | 1  0 |        * | 0 |
    //
    // So F(n) will be matrix_pow[0][0] * F(1) + matrix_pow[0][1] * F(0)
    // = matrix_pow[0][0] * 1 + matrix_pow[0][1] * 0
    // = matrix_pow[0][0]
    // And F(n-1) will be matrix_pow[1][0] * F(1) + matrix_pow[1][1] * F(0)
    // = matrix_pow[1][0] * 1 + matrix_pow[1][1] * 0
    // = matrix_pow[1][0]

    const resultMatrix = powerMatrix(FIB_BASE_MATRIX, n - 1);

    // The Nth Fibonacci number is the element at [0][0] of the resulting matrix
    return resultMatrix[0][0];
}