/**
 * problem2-prime-factorization/primeFactors-trial-division.ts
 *
 * Implements prime factorization using the trial division method.
 * This is a straightforward approach where we try to divide the given number `n`
 * by small prime numbers starting from 2.
 *
 * Time Complexity: O(sqrt(N))
 *   In the worst case (N is prime or N is a product of two large primes), the loop
 *   for `i` goes up to `sqrt(N)`. The inner `while` loop runs `log_i N` times.
 *   Overall, it's dominated by the outer loop up to `sqrt(N)`.
 * Space Complexity: O(log N)
 *   To store the list of prime factors. In the worst case, for N = 2^k, there are k
 *   prime factors, and k is approximately log2(N).
 */

/**
 * Finds the prime factors of a positive integer `n` using the trial division method.
 *
 * @param n The positive integer to factorize.
 * @returns An array of prime factors of `n`. Returns an empty array for `n = 1`.
 * @throws Error if `n` is less than 1.
 */
export function primeFactorsTrialDivision(n: number): number[] {
    if (n < 1 || !Number.isInteger(n)) {
        throw new Error("Input must be a positive integer.");
    }
    if (n === 1) {
        return []; // 1 has no prime factors
    }

    const factors: number[] = [];

    // Step 1: Handle factor 2
    // Divide by 2 until it's no longer divisible.
    // This special handling for 2 allows the main loop to increment by 2 (checking only odd numbers).
    while (n % 2 === 0) {
        factors.push(2);
        n /= 2;
    }

    // Step 2: Handle odd factors
    // Start from 3 and increment by 2 (checking only odd numbers).
    // We only need to check up to sqrt(n) because if n has a prime factor greater than sqrt(n),
    // it must also have a prime factor smaller than sqrt(n) (or be prime itself).
    for (let i = 3; i * i <= n; i += 2) {
        // While i divides n, add i to factors and divide n by i.
        while (n % i === 0) {
            factors.push(i);
            n /= i;
        }
    }

    // Step 3: Handle the remaining factor (if any)
    // If n is still greater than 1 after the loop, it means the remaining n
    // is a prime number itself (and was greater than sqrt of the original n).
    if (n > 2) { // Changed from n > 1 to n > 2 for clarity and correctness with remaining prime factors
        factors.push(n);
    }

    return factors;
}