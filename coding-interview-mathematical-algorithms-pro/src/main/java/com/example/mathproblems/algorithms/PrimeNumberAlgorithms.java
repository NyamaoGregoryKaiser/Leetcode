package com.example.mathproblems.algorithms;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

/**
 * PrimeNumberAlgorithms.java
 *
 * This class provides various algorithms related to prime numbers,
 * including primality testing, prime factorization, and generating primes
 * using the Sieve of Eratosthenes.
 */
public class PrimeNumberAlgorithms {

    // --- Problem 5: Primality Test ---

    /**
     * Determines if a given non-negative integer is a prime number using trial division.
     * A prime number is a natural number greater than 1 that has no positive divisors
     * other than 1 and itself.
     * This naive method checks divisibility by all numbers from 2 up to n-1.
     *
     * @param n The non-negative integer to test.
     * @return true if n is prime, false otherwise.
     * @throws IllegalArgumentException if n is negative.
     *
     * Time Complexity: O(n) - Checks divisibility up to n.
     * Space Complexity: O(1) - Constant extra space.
     */
    public boolean isPrimeNaive(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("Input must be a non-negative integer.");
        }
        if (n <= 1) {
            return false; // 0 and 1 are not prime
        }
        for (int i = 2; i < n; i++) {
            if (n % i == 0) {
                return false; // Found a divisor, so not prime
            }
        }
        return true; // No divisors found
    }

    /**
     * Determines if a given non-negative integer is a prime number using an optimized trial division.
     * Optimizations:
     * 1. Check only up to sqrt(n) because if n has a divisor greater than sqrt(n),
     *    it must also have a divisor smaller than sqrt(n).
     * 2. Handle 2 and 3 explicitly.
     * 3. Check for divisibility by numbers of the form 6k +/- 1, as all primes greater than 3
     *    can be expressed in this form.
     *
     * @param n The non-negative integer to test.
     * @return true if n is prime, false otherwise.
     * @throws IllegalArgumentException if n is negative.
     *
     * Time Complexity: O(sqrt(n) / 6) which is effectively O(sqrt(n)).
     * Space Complexity: O(1) - Constant extra space.
     */
    public boolean isPrimeOptimized(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("Input must be a non-negative integer.");
        }
        if (n <= 1) {
            return false;
        }
        if (n <= 3) {
            return true; // 2 and 3 are prime
        }
        if (n % 2 == 0 || n % 3 == 0) {
            return false; // Multiples of 2 or 3 are not prime
        }

        // Check for divisors from 5 up to sqrt(n)
        // All primes greater than 3 are of the form 6k +/- 1.
        // So, we only need to check i and i+2 for divisibility.
        for (int i = 5; (long) i * i <= n; i = i + 6) {
            if (n % i == 0 || n % (i + 2) == 0) {
                return false;
            }
        }
        return true;
    }

    // --- Problem 6: Prime Factorization ---

    /**
     * Computes the prime factorization of a given positive integer n.
     * The result is a map where keys are prime factors and values are their exponents.
     * Uses an optimized trial division approach.
     *
     * @param n The positive integer to factorize.
     * @return A map representing the prime factorization {prime -> exponent}.
     * @throws IllegalArgumentException if n is non-positive.
     *
     * Time Complexity: O(sqrt(n)) - In the worst case (n is prime), we check up to sqrt(n).
     * Space Complexity: O(log n) - In the worst case (many small prime factors), the map size is logarithmic.
     */
    public Map<Integer, Integer> primeFactorization(int n) {
        if (n <= 0) {
            throw new IllegalArgumentException("Input must be a positive integer for prime factorization.");
        }
        Map<Integer, Integer> factors = new HashMap<>();

        // Handle factor 2
        while (n % 2 == 0) {
            factors.put(2, factors.getOrDefault(2, 0) + 1);
            n /= 2;
        }

        // Handle factor 3
        while (n % 3 == 0) {
            factors.put(3, factors.getOrDefault(3, 0) + 1);
            n /= 3;
        }

        // Handle factors from 5 onwards (form 6k +/- 1)
        for (int i = 5; (long) i * i <= n; i = i + 6) {
            while (n % i == 0) {
                factors.put(i, factors.getOrDefault(i, 0) + 1);
                n /= i;
            }
            while (n % (i + 2) == 0) {
                factors.put(i + 2, factors.getOrDefault(i + 2, 0) + 1);
                n /= (i + 2);
            }
        }

        // If n is still greater than 1, it must be a prime factor itself (larger than sqrt(original n))
        if (n > 1) {
            factors.put(n, factors.getOrDefault(n, 0) + 1);
        }

        return factors;
    }


    // --- Problem 7: Sieve of Eratosthenes ---

    /**
     * Generates all prime numbers up to a given limit 'n' using the Sieve of Eratosthenes.
     * This method returns a boolean array where `primes[i]` is true if `i` is prime, false otherwise.
     *
     * The Sieve works by iteratively marking as composite (not prime) the multiples
     * of each prime, starting with the first prime number 2.
     *
     * @param n The upper limit (inclusive) for finding primes.
     * @return A boolean array indicating primality for numbers up to n.
     * @throws IllegalArgumentException if n is negative.
     *
     * Time Complexity: O(n log log n) - Very efficient for finding all primes up to n.
     * Space Complexity: O(n) - For the boolean array.
     */
    public boolean[] sieveOfEratosthenesBooleanArray(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("Upper limit for sieve cannot be negative.");
        }
        if (n < 2) {
            return new boolean[n + 1]; // All false
        }

        boolean[] isPrime = new boolean[n + 1];
        Arrays.fill(isPrime, true); // Assume all numbers are prime initially

        isPrime[0] = false; // 0 is not prime
        isPrime[1] = false; // 1 is not prime

        // Start from 2, iterate up to sqrt(n)
        for (int p = 2; (long) p * p <= n; p++) {
            // If isPrime[p] is still true, then it is a prime
            if (isPrime[p]) {
                // Mark all multiples of p as not prime, starting from p*p
                // because smaller multiples (p*2, p*3...) would have already
                // been marked by smaller primes (2, 3...)
                for (int i = p * p; i <= n; i += p) {
                    isPrime[i] = false;
                }
            }
        }
        return isPrime;
    }

    /**
     * Generates all prime numbers up to a given limit 'n' using the Sieve of Eratosthenes.
     * This method returns a List of integers containing all prime numbers up to n.
     *
     * @param n The upper limit (inclusive) for finding primes.
     * @return A List of prime numbers up to n.
     * @throws IllegalArgumentException if n is negative.
     *
     * Time Complexity: O(n log log n) - Dominated by the Sieve computation.
     * Space Complexity: O(n) - For the boolean array and the list of primes.
     */
    public List<Integer> sieveOfEratosthenesToList(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("Upper limit for sieve cannot be negative.");
        }
        List<Integer> primesList = new ArrayList<>();
        if (n < 2) {
            return primesList;
        }

        boolean[] isPrime = sieveOfEratosthenesBooleanArray(n);

        // Collect all primes into a list
        for (int i = 2; i <= n; i++) {
            if (isPrime[i]) {
                primesList.add(i);
            }
        }
        return primesList;
    }
}