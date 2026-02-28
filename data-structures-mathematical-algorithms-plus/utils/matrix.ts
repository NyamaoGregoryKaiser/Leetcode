/**
 * utils/matrix.ts
 *
 * Provides utility functions for matrix operations, specifically for 2x2 matrices,
 * which are used in the Fibonacci Matrix Exponentiation algorithm.
 */

import { Matrix } from './types';

/**
 * Creates an identity matrix of a given size.
 * For Fibonacci, we only need 2x2.
 * @param size The dimension of the square identity matrix (e.g., 2 for 2x2).
 * @returns An identity matrix.
 */
export function createIdentityMatrix(size: number): Matrix {
    const matrix: Matrix = [];
    for (let i = 0; i < size; i++) {
        matrix[i] = [];
        for (let j = 0; j < size; j++) {
            matrix[i][j] = (i === j) ? 1 : 0;
        }
    }
    return matrix;
}

/**
 * Multiplies two 2x2 matrices.
 *
 * A = | a b |   B = | e f |
 *     | c d |       | g h |
 *
 * A * B = | ae + bg   af + bh |
 *         | ce + dg   cf + dh |
 *
 * @param A The first 2x2 matrix.
 * @param B The second 2x2 matrix.
 * @returns The resulting 2x2 matrix from A * B.
 * @throws Error if matrices are not 2x2 or invalid.
 */
export function multiplyMatrices(A: Matrix, B: Matrix): Matrix {
    // Basic validation for 2x2 matrices
    if (!A || A.length !== 2 || A[0].length !== 2 ||
        !B || B.length !== 2 || B[0].length !== 2) {
        throw new Error("multiplyMatrices requires valid 2x2 matrices.");
    }

    const C: Matrix = [
        [0, 0],
        [0, 0]
    ];

    // For a 2x2 matrix multiplication:
    // C[0][0] = A[0][0]*B[0][0] + A[0][1]*B[1][0]
    // C[0][1] = A[0][0]*B[0][1] + A[0][1]*B[1][1]
    // C[1][0] = A[1][0]*B[0][0] + A[1][1]*B[1][0]
    // C[1][1] = A[1][0]*B[0][1] + A[1][1]*B[1][1]

    C[0][0] = A[0][0] * B[0][0] + A[0][1] * B[1][0];
    C[0][1] = A[0][0] * B[0][1] + A[0][1] * B[1][1];
    C[1][0] = A[1][0] * B[0][0] + A[1][1] * B[1][0];
    C[1][1] = A[1][0] * B[0][1] + A[1][1] * B[1][1];

    return C;
}

/**
 * Calculates the matrix `M` raised to the power `p` (M^p) using binary exponentiation (recursive).
 * This works for square matrices. For Fibonacci, it's 2x2.
 *
 * Base cases:
 * M^0 = Identity Matrix
 * M^1 = M
 *
 * Recursive step:
 * If p is even: M^p = (M^(p/2)) * (M^(p/2))
 * If p is odd:  M^p = M * (M^((p-1)/2)) * (M^((p-1)/2))
 *
 * @param M The square matrix to be raised to a power.
 * @param p The non-negative integer exponent.
 * @returns The resulting matrix M^p.
 * @throws Error if `p` is negative.
 */
export function powerMatrix(M: Matrix, p: number): Matrix {
    if (p < 0) {
        throw new Error("Exponent 'p' must be a non-negative integer for matrix power.");
    }
    if (M.length === 0 || M[0].length === 0 || M.length !== M[0].length) {
        throw new Error("Input matrix must be a non-empty square matrix.");
    }

    const size = M.length;

    // Base case: M^0 = Identity Matrix
    if (p === 0) {
        return createIdentityMatrix(size);
    }

    // Base case: M^1 = M
    if (p === 1) {
        // Return a copy to prevent accidental modification of the original matrix
        return M.map(row => [...row]);
    }

    // Recursive step: Binary Exponentiation
    // Calculate M^(p/2)
    const halfPow = powerMatrix(M, Math.floor(p / 2));
    // Multiply halfPow by itself
    let result = multiplyMatrices(halfPow, halfPow);

    // If p is odd, multiply by M one more time
    if (p % 2 === 1) {
        result = multiplyMatrices(result, M);
    }

    return result;
}