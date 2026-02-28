/**
 * problem4-nth-fibonacci/fibonacci-dynamic-programming.ts
 *
 * Implements the Nth Fibonacci number calculation using an iterative dynamic programming
 * approach with space optimization.
 *
 * The Fibonacci sequence is defined by F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2) for n > 1.
 *
 * This bottom-up approach calculates Fibonacci numbers starting from F(0) and F(1)
 * up to F(n), storing only the last two values to compute the next.
 *
 * Time Complexity: O(n)
 *   A loop runs `n` times (or `n-1` times for `n >= 2`), performing constant time operations
 *   in each iteration.
 * Space Complexity: O(1)
 *   Only a constant number of variables (two previous Fibonacci numbers) are stored,
 *   regardless of the value of `n`.
 */

/**
 * Calculates the Nth Fibonacci number using iterative dynamic programming with O(1) space.
 *
 * @param n The index of the Fibonacci number to calculate (non-negative integer).
 * @returns The Nth Fibonacci number.
 * @throws Error if `n` is negative or not an integer.
 */
export function fibonacciDynamicProgramming(n: number): number {
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

    // Initialize the first two Fibonacci numbers
    let a = 0; // Represents F(i-2)
    let b = 1; // Represents F(i-1)
    let temp: number;

    // Iterate from 2 up to n
    for (let i = 2; i <= n; i++) {
        temp = a + b; // Calculate F(i) = F(i-2) + F(i-1)
        a = b;        // Update F(i-2) to F(i-1)
        b = temp;     // Update F(i-1) to F(i)
    }

    // After the loop, `b` will hold F(n)
    return b;
}