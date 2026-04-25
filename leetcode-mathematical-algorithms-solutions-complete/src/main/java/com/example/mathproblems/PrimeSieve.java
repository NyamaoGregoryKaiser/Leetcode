```java
package com.example.mathproblems;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Utility class for generating prime numbers and checking primality using
 * the Sieve of Eratosthenes and trial division.
 */
public class PrimeSieve {

    /**
     * Generates all prime numbers up to a given limit 'n' using the
     * Sieve of Eratosthenes algorithm.
     *
     * The Sieve of Eratosthenes is an ancient algorithm for finding all
     * prime numbers up to any given limit. It works by iteratively marking
     * as composite (i.e., not prime) the multiples of each prime, starting
     * with the first prime number, 2. The multiples are marked by setting
     * their corresponding index in a boolean array to false.
     *
     * Algorithm steps:
     * 1. Create a boolean array `isPrime[0...n]`, initialized to true.
     *    `isPrime[i]` will be false if `i` is not a prime, else true.
     * 2. Mark 0 and 1 as not prime (`isPrime[0] = isPrime[1] = false`).
     * 3. Iterate from `p = 2` up to `sqrt(n)`:
     *    a. If `isPrime[p]` is true, then `p` is a prime number.
     *    b. Mark all multiples of `p` (starting from `p*p`) as not prime:
     *       `isPrime[i] = false` for `i = p*p, p*p + p, p*p + 2p, ...` up to `n`.
     *       We start from `p*p` because smaller multiples (e.g., `2p`, `3p`)
     *       would have already been marked by smaller primes (e.g., 2, 3).
     * 4. After the loop, all numbers `i` for which `isPrime[i]` is true are prime.
     *
     * Time Complexity: O(n log log n) - This is a very efficient prime generation algorithm.
     *                  The outer loop runs up to sqrt(n). The inner loop marks multiples.
     *                  The sum of (n/p) for p primes is n log log n.
     * Space Complexity: O(n) - A boolean array of size `n+1` is used to store primality.
     *
     * @param n The upper limit (inclusive) for prime generation.
     * @return A list of prime numbers up to 'n'.
     * @throws IllegalArgumentException if 'n' is negative.
     */
    public List<Integer> sieveOfEratosthenes(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("Limit 'n' must be non-negative for Sieve of Eratosthenes.");
        }
        if (n < 2) {
            return new ArrayList<>(); // No primes less than 2
        }

        boolean[] isPrime = new boolean[n + 1];
        Arrays.fill(isPrime, true); // Initialize all numbers as potentially prime
        isPrime[0] = false; // 0 is not prime
        isPrime[1] = false; // 1 is not prime

        // Start checking from 2 up to sqrt(n)
        for (int p = 2; p * p <= n; p++) {
            // If isPrime[p] is still true, then it is a prime
            if (isPrime[p]) {
                // Mark all multiples of p as not prime
                // Start from p*p because multiples less than p*p
                // (e.g., 2p, 3p, ..., (p-1)p) would have already been marked
                // by smaller prime factors (2, 3, ..., p-1).
                for (int i = p * p; i <= n; i += p) {
                    isPrime[i] = false;
                }
            }
        }

        // Collect all prime numbers
        List<Integer> primes = new ArrayList<>();
        for (int i = 2; i <= n; i++) {
            if (isPrime[i]) {
                primes.add(i);
            }
        }

        return primes;
    }

    /**
     * Checks if a given number 'num' is prime using trial division.
     * This method is suitable for checking the primality of a single number,
     * especially when 'num' is not excessively large. For checking many numbers
     * up to a limit, the Sieve of Eratosthenes is more efficient.
     *
     * Algorithm steps:
     * 1. Handle base cases: numbers less than 2 are not prime. 2 and 3 are prime.
     * 2. Check divisibility by 2 and 3.
     * 3. For numbers greater than 3, check divisibility by numbers of the form `6k ± 1`.
     *    This optimization comes from the fact that all primes greater than 3
     *    can be expressed in this form.
     *
     * Time Complexity: O(sqrt(num)) - In the worst case, we check divisibility
     *                  up to the square root of the number.
     * Space Complexity: O(1) - Constant space.
     *
     * @param num The integer to check for primality.
     * @return true if 'num' is prime, false otherwise.
     */
    public boolean isPrimeTrialDivision(int num) {
        if (num < 2) {
            return false; // Numbers less than 2 are not prime
        }
        if (num == 2 || num == 3) {
            return true; // 2 and 3 are prime
        }
        if (num % 2 == 0 || num % 3 == 0) {
            return false; // Multiples of 2 or 3 (other than 2,3 themselves) are not prime
        }

        // Check for factors from 5 onwards
        // All primes greater than 3 are of the form 6k ± 1.
        // So we only need to check divisors of the form (6k-1) and (6k+1).
        // This loop increments 'i' by 6 in each step, checking 'i' and 'i+2'.
        for (int i = 5; i * i <= num; i = i + 6) {
            if (num % i == 0 || num % (i + 2) == 0) {
                return false;
            }
        }

        return true; // If no divisors found, it's prime
    }
}
```