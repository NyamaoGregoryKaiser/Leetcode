```javascript
/**
 * src/bruteForceProblems.js
 *
 * This file contains brute-force or naive implementations for various mathematical problems.
 * These are often less efficient but conceptually simpler, and are included for
 * comparison purposes (e.g., in benchmarks) against their optimized counterparts.
 */

const { isPrimeTrialDivision, factorial } = require('./utils');

/**
 * Brute-force approach for Greatest Common Divisor (GCD).
 *
 * Iterates downwards from the minimum of the two numbers until a common divisor is found.
 *
 * @param {number} a The first non-negative integer.
 * @param {number} b The second non-negative integer.
 * @returns {number} The greatest common divisor of a and b.
 *
 * Time Complexity: O(min(a, b)) - In the worst case, it checks every number down to 1.
 * Space Complexity: O(1) - Uses a constant amount of extra space.
 */
function gcdBruteForce(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number' || !Number.isInteger(a) || !Number.isInteger(b)) {
        throw new Error("Inputs must be integers.");
    }
    if (a < 0 || b < 0) {
        throw new Error("Inputs must be non-negative.");
    }
    if (a === 0 && b === 0) {
        return 0; // Or throw error/handle as per specific definition
    }
    if (a === 0) return b;
    if (b === 0) return a;

    const minVal = Math.min(a, b);
    for (let i = minVal; i >= 1; i--) {
        if (a % i === 0 && b % i === 0) {
            return i;
        }
    }
    return 1; // Should not be reached if inputs are positive, but as a fallback.
}

/**
 * Brute-force approach for finding prime numbers up to a limit.
 *
 * Checks each number from 2 up to the limit for primality using a trial division method.
 *
 * @param {number} limit The upper bound (inclusive) up to which primes should be found.
 * @returns {number[]} An array containing all prime numbers up to `limit`.
 *
 * Time Complexity: O(limit * sqrt(limit)) - For each number up to limit, isPrimeTrialDivision takes O(sqrt(number)).
 * Space Complexity: O(limit) - To store the resulting primes.
 */
function sieveOfEratosthenesBruteForce(limit) {
    if (typeof limit !== 'number' || !Number.isInteger(limit) || limit < 0) {
        throw new Error("Limit must be a non-negative integer.");
    }

    const primes = [];
    for (let i = 2; i <= limit; i++) {
        if (isPrimeTrialDivision(i)) { // Uses the helper from utils.js
            primes.push(i);
        }
    }
    return primes;
}

/**
 * Naive approach for the Power Function (x^n).
 *
 * Calculates x^n by repeatedly multiplying x by itself n times.
 *
 * @param {number} base The base number (x).
 * @param {number} exp The exponent (n). Can be positive, negative, or zero.
 * @returns {number} The result of base^exp.
 *
 * Time Complexity: O(abs(exp)) - Performs `abs(exp)` multiplications.
 * Space Complexity: O(1) - Uses a constant amount of extra space.
 */
function powerBruteForce(base, exp) {
    if (typeof base !== 'number' || typeof exp !== 'number' || !Number.isInteger(exp)) {
        throw new Error("Base must be a number and exponent must be an integer.");
    }

    if (exp === 0) {
        return 1;
    }
    if (base === 0) {
        return 0;
    }

    let result = 1;
    const absExp = Math.abs(exp);

    for (let i = 0; i < absExp; i++) {
        result *= base;
    }

    if (exp < 0) {
        return 1 / result;
    }
    return result;
}

/**
 * Naive recursive approach for Nth Fibonacci Number.
 *
 * Directly implements the recursive definition: F(n) = F(n-1) + F(n-2).
 * Suffers from severe performance issues due to redundant calculations (exponential complexity).
 *
 * @param {number} n The index of the Fibonacci number to find (non-negative integer).
 * @returns {number} The Nth Fibonacci number.
 *
 * Time Complexity: O(2^n) - Each call generates two more calls, leading to an exponential growth in calls.
 *                  Specifically, it's roughly proportional to the Nth Fibonacci number itself.
 * Space Complexity: O(n) - Due to recursive call stack depth.
 */
function nthFibonacciRecursive(n) {
    if (typeof n !== 'number' || !Number.isInteger(n) || n < 0) {
        throw new Error("Input 'n' must be a non-negative integer.");
    }

    if (n === 0) return 0;
    if (n === 1) return 1;

    return nthFibonacciRecursive(n - 1) + nthFibonacciRecursive(n - 2);
}

/**
 * Brute-force approach for Combinations (N choose K) using direct factorial calculation.
 *
 * C(n, k) = n! / (k! * (n-k)!)
 * This method can suffer from overflow issues with intermediate factorial calculations
 * even if the final result fits within JavaScript's safe integer range.
 *
 * @param {number} n The total number of items.
 * @param {number} k The number of items to choose.
 * @returns {number} The number of combinations C(n, k).
 *
 * Time Complexity: O(n) - Dominated by factorial calculations.
 * Space Complexity: O(1) - Uses constant extra space (excluding stack for recursive factorial).
 */
function combinationsBruteForce(n, k) {
    if (typeof n !== 'number' || typeof k !== 'number' || !Number.isInteger(n) || !Number.isInteger(k)) {
        throw new Error("Inputs 'n' and 'k' must be integers.");
    }
    if (n < 0 || k < 0) {
        throw new Error("Inputs 'n' and 'k' must be non-negative.");
    }
    if (k > n) {
        return 0;
    }
    if (k === 0 || k === n) {
        return 1;
    }

    // Direct factorial calculation (potential for overflow)
    const nFact = factorial(n);
    const kFact = factorial(k);
    const nMinusKFact = factorial(n - k);

    return nFact / (kFact * nMinusKFact);
}


module.exports = {
    gcdBruteForce,
    sieveOfEratosthenesBruteForce,
    powerBruteForce,
    nthFibonacciRecursive,
    combinationsBruteForce,
};
```