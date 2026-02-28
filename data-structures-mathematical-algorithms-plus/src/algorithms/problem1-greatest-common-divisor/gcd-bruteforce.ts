/**
 * problem1-greatest-common-divisor/gcd-bruteforce.ts
 *
 * Implements the Greatest Common Divisor (GCD) using a brute-force approach.
 * This method iterates downwards from the minimum of the two numbers until it finds a common divisor.
 *
 * Time Complexity: O(min(a, b))
 *   In the worst case, if one number is 1 or they are relatively prime, the loop runs min(a,b) times.
 *   For example, gcd(1000000, 1) or gcd(999999, 999997).
 * Space Complexity: O(1)
 *   Only a few variables are used, independent of input size.
 */

/**
 * Calculates the Greatest Common Divisor (GCD) of two non-negative integers using a brute-force approach.
 *
 * @param a The first non-negative integer.
 * @param b The second non-negative integer.
 * @returns The GCD of `a` and `b`. Returns 0 if both `a` and `b` are 0.
 */
export function gcdBruteForce(a: number, b: number): number {
    // Ensure inputs are non-negative.
    // If negative inputs are allowed by problem spec, adjust accordingly.
    if (a < 0 || b < 0) {
        throw new Error("Inputs must be non-negative integers for GCD.");
    }

    // Base case: If one number is 0, the GCD is the other number.
    // This handles gcd(X, 0) = X and gcd(0, X) = X.
    // Also covers gcd(0, 0) which is conventionally 0.
    if (a === 0) {
        return b;
    }
    if (b === 0) {
        return a;
    }

    // Determine the smaller of the two numbers.
    // The GCD cannot be greater than the smaller of the two numbers.
    const minVal = Math.min(a, b);

    // Iterate downwards from minVal to 1.
    // The first number 'i' that divides both 'a' and 'b' is their GCD.
    for (let i = minVal; i >= 1; i--) {
        if (a % i === 0 && b % i === 0) {
            return i; // Found the greatest common divisor
        }
    }

    // This line should technically not be reached if a and b are positive,
    // as 1 is always a common divisor. It's here for type safety, but the
    // logic guarantees a return before this if a or b > 0.
    // If a or b were 0, they would be handled by the base cases.
    return 1; // Fallback, though not expected for positive inputs.
}