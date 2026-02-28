/**
 * problem1-greatest-common-divisor/gcd-euclidean-recursive.ts
 *
 * Implements the Greatest Common Divisor (GCD) using the Euclidean algorithm
 * in a recursive manner.
 *
 * The Euclidean algorithm is based on the principle that the greatest common divisor
 * of two numbers does not change if the larger number is replaced by its difference
 * with the smaller number. This process is repeated until one of the numbers is zero,
 * and the other number is the GCD. More efficiently, it uses the modulo operator:
 * gcd(a, b) = gcd(b, a % b).
 *
 * Time Complexity: O(log(min(a, b)))
 *   The number of steps is logarithmic with respect to the smaller of the two numbers.
 *   This is because the remainder `a % b` is always less than `b`, and it decreases
 *   rapidly, at least by half every two steps.
 * Space Complexity: O(log(min(a, b)))
 *   Due to the recursive call stack depth. Each recursive call adds a frame to the stack.
 */

/**
 * Calculates the Greatest Common Divisor (GCD) of two non-negative integers
 * using the recursive Euclidean algorithm.
 *
 * @param a The first non-negative integer.
 * @param b The second non-negative integer.
 * @returns The GCD of `a` and `b`. Returns 0 if both `a` and `b` are 0.
 */
export function gcdEuclideanRecursive(a: number, b: number): number {
    // Ensure inputs are non-negative.
    // If negative inputs are allowed by problem spec, take absolute values.
    if (a < 0 || b < 0) {
        throw new Error("Inputs must be non-negative integers for GCD.");
    }

    // Base case: If b is 0, then a is the GCD.
    // This covers:
    // 1. gcd(X, 0) = X
    // 2. The termination condition of the recursive calls (when the remainder becomes 0).
    // 3. If both a and b are 0 initially, gcd(0, 0) will return 0 correctly.
    if (b === 0) {
        return a;
    }

    // Recursive step: gcd(a, b) = gcd(b, a % b)
    // The larger number (a) is replaced by the remainder of a divided by b.
    // The smaller number (b) becomes the new 'a' in the next step.
    return gcdEuclideanRecursive(b, a % b);
}