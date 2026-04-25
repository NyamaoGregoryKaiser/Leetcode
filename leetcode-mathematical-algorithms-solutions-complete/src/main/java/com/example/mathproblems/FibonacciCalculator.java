```java
package com.example.mathproblems;

import java.math.BigInteger;

/**
 * Utility class for calculating Fibonacci numbers using various approaches:
 * naive recursive, iterative (dynamic programming), and matrix exponentiation.
 * Supports calculations for large N using BigInteger for optimized methods.
 */
public class FibonacciCalculator {

    /**
     * Calculates the n-th Fibonacci number using a naive recursive approach.
     * F(n) = F(n-1) + F(n-2) with F(0)=0, F(1)=1.
     * This method directly implements the mathematical definition.
     *
     * Time Complexity: O(2^n) - Exponential. Many subproblems are recomputed multiple times.
     *                  For example, to compute F(5), it computes F(4) and F(3).
     *                  F(4) then computes F(3) and F(2), so F(3) is computed twice, etc.
     * Space Complexity: O(n) - Due to the recursion stack depth.
     *
     * @param n The index of the Fibonacci number to calculate (n >= 0).
     * @return The n-th Fibonacci number.
     * @throws IllegalArgumentException if n is negative.
     */
    public BigInteger fibonacciNaiveRecursive(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("Fibonacci index cannot be negative.");
        }
        if (n == 0) {
            return BigInteger.ZERO;
        }
        if (n == 1) {
            return BigInteger.ONE;
        }
        return fibonacciNaiveRecursive(n - 1).add(fibonacciNaiveRecursive(n - 2));
    }

    /**
     * Calculates the n-th Fibonacci number using an iterative approach with dynamic programming.
     * This method avoids redundant calculations by storing previously computed values.
     * It uses only two variables to store the last two Fibonacci numbers, making it very space-efficient.
     *
     * Time Complexity: O(n) - Linear. Each Fibonacci number up to 'n' is computed once.
     * Space Complexity: O(1) - Constant space, as only a fixed number of variables are used.
     *
     * @param n The index of the Fibonacci number to calculate (n >= 0).
     * @return The n-th Fibonacci number.
     * @throws IllegalArgumentException if n is negative.
     */
    public BigInteger fibonacciIterativeDP(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("Fibonacci index cannot be negative.");
        }
        if (n == 0) {
            return BigInteger.ZERO;
        }
        if (n == 1) {
            return BigInteger.ONE;
        }

        BigInteger a = BigInteger.ZERO; // F(0)
        BigInteger b = BigInteger.ONE;  // F(1)

        for (int i = 2; i <= n; i++) {
            BigInteger next = a.add(b);
            a = b;
            b = next;
        }
        return b;
    }

    /**
     * Calculates the n-th Fibonacci number using matrix exponentiation.
     * This is the most efficient method for very large 'n', especially if 'n' can be billions.
     * The method is based on the property:
     * | F(n+1)  F(n)   |   =   | 1  1 | ^ n
     * | F(n)    F(n-1) |       | 1  0 |
     *
     * We need to compute (M^n) where M = {{1, 1}, {1, 0}}.
     * Matrix exponentiation can be done efficiently using binary exponentiation (divide and conquer)
     * in O(log n) matrix multiplications. Each matrix multiplication is a constant time operation (2x2).
     *
     * Time Complexity: O(log n) - Due to binary exponentiation. Each matrix multiplication
     *                  is a constant number of arithmetic operations (8 multiplications, 4 additions for 2x2).
     * Space Complexity: O(log n) - Due to the recursion stack depth of binary exponentiation,
     *                   or O(1) if implemented iteratively. (Our implementation is iterative for `matrixPower` for space efficiency).
     *
     * @param n The index of the Fibonacci number to calculate (n >= 0).
     * @return The n-th Fibonacci number.
     * @throws IllegalArgumentException if n is negative.
     */
    public BigInteger fibonacciMatrixExponentiation(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("Fibonacci index cannot be negative.");
        }
        if (n == 0) {
            return BigInteger.ZERO;
        }
        if (n == 1) {
            return BigInteger.ONE;
        }

        // Base matrix for Fibonacci relation: {{1, 1}, {1, 0}}
        BigInteger[][] baseMatrix = {
                {BigInteger.ONE, BigInteger.ONE},
                {BigInteger.ONE, BigInteger.ZERO}
        };

        // Compute baseMatrix ^ (n-1)
        BigInteger[][] resultMatrix = matrixPower(baseMatrix, n - 1);

        // The n-th Fibonacci number F(n) is element [0][0] of the result matrix,
        // or specifically (F(n-1) + F(n-2)) which is F(n) in the original definition.
        // | F(n)   F(n-1) |
        // | F(n-1) F(n-2) | = {{1,1},{1,0}}^(n-1) applied to F(1)=1, F(0)=0.
        // So F(n) is resultMatrix[0][0] or resultMatrix[0][1] + resultMatrix[1][1] (which is F(n-1)+F(n-2))
        // Or simply, resultMatrix[0][0] * F(1) + resultMatrix[0][1] * F(0) = resultMatrix[0][0] * 1 + resultMatrix[0][1] * 0 = resultMatrix[0][0]
        return resultMatrix[0][0];
    }

    /**
     * Helper method to multiply two 2x2 matrices.
     * M_res = M1 * M2
     *
     * | a b |   | e f |   =   | ae + bg   af + bh |
     * | c d | * | g h |       | ce + dg   cf + dh |
     *
     * @param m1 The first 2x2 matrix.
     * @param m2 The second 2x2 matrix.
     * @return The product matrix (2x2).
     */
    private BigInteger[][] multiplyMatrices(BigInteger[][] m1, BigInteger[][] m2) {
        BigInteger[][] result = new BigInteger[2][2];
        result[0][0] = m1[0][0].multiply(m2[0][0]).add(m1[0][1].multiply(m2[1][0]));
        result[0][1] = m1[0][0].multiply(m2[0][1]).add(m1[0][1].multiply(m2[1][1]));
        result[1][0] = m1[1][0].multiply(m2[0][0]).add(m1[1][1].multiply(m2[1][0]));
        result[1][1] = m1[1][0].multiply(m2[0][1]).add(m1[1][1].multiply(m2[1][1]));
        return result;
    }

    /**
     * Helper method to compute matrix power (M^p) using binary exponentiation (exponentiation by squaring).
     * This allows computing M^p in O(log p) matrix multiplications.
     *
     * @param matrix The base 2x2 matrix.
     * @param p The power to raise the matrix to (p >= 0).
     * @return The matrix M^p.
     */
    private BigInteger[][] matrixPower(BigInteger[][] matrix, int p) {
        // Identity matrix for 2x2
        BigInteger[][] result = {
                {BigInteger.ONE, BigInteger.ZERO},
                {BigInteger.ZERO, BigInteger.ONE}
        };

        // Current matrix (starts as base matrix)
        BigInteger[][] currentMatrix = matrix;

        while (p > 0) {
            if (p % 2 == 1) { // If power is odd, multiply result by currentMatrix
                result = multiplyMatrices(result, currentMatrix);
            }
            // Square the currentMatrix for the next iteration (currentMatrix = currentMatrix * currentMatrix)
            currentMatrix = multiplyMatrices(currentMatrix, currentMatrix);
            p /= 2; // Halve the power
        }
        return result;
    }
}
```