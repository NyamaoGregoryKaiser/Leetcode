/**
 * problem1-greatest-common-divisor/gcd-euclidean-iterative.ts
 *
 * Implements the Greatest Common Divisor (GCD) using the Euclidean algorithm
 * in an iterative manner. This is generally preferred over the recursive version
 * in production environments to avoid potential stack overflow issues with very
 * large inputs, though for GCD, the logarithmic depth makes it less of a concern.
 *
 * The iterative version follows the same mathematical principle as the recursive one:
 * gcd(a, b) = gcd(b, a % b).
 *
 * Time Complexity: O(log(min(a, b)))
 *   Similar to the recursive version, the number of steps is logarithmic.
 * Space Complexity: O(1)
 *   Only a few variables are used, independent of input size, making it very memory efficient.
 */

/**
 * Calculates the Greatest Common Divisor (GCD) of two non-negative integers
 * using the iterative Euclidean algorithm.
 *
 * @param a The first non-negative integer.
 * @param b The second non-negative integer.
 * @returns The GCD of `a` and `b`. Returns 0 if both `a` and `b` are 0.
 */
export function gcdEuclideanIterative(a: number, b: number): number {
    // Ensure inputs are non-negative.
    // If negative inputs are allowed by problem spec, take absolute values.
    if (a < 0 || b < 0) {
        throw new Error("Inputs must be non-negative integers for GCD.");
    }

    // Loop until b becomes 0.
    // In each iteration, 'a' takes the value of 'b', and 'b' takes the value of 'a % b'.
    // This continues until 'b' is 0, at which point 'a' holds the GCD.
    while (b !== 0) {
        const temp = b; // Store the current value of b
        b = a % b;      // New b is the remainder of a divided by current b
        a = temp;       // New a is the old b
    }

    // When b becomes 0, a contains the GCD.
    // This correctly handles:
    // - gcd(X, 0) = X (loop won't run, returns initial a)
    // - gcd(0, X) = X (first iteration: temp=X, b=0%X=0, a=X; loop ends, returns X)
    // - gcd(0, 0) = 0 (loop won't run, returns initial a which is 0)
    return a;
}