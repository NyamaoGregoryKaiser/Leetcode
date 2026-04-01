```javascript
/**
 * src/problems.js
 *
 * This file contains optimal and efficient implementations for various mathematical problems.
 * Each function includes detailed comments, time/space complexity analysis, and explanations.
 */

// Import any necessary helpers
const { factorial } = require('./utils');

/**
 * Problem 1: Greatest Common Divisor (GCD) using Euclidean Algorithm
 *
 * The GCD of two integers is the largest positive integer that divides both numbers
 * without leaving a remainder.
 *
 * Optimal Approach: Euclidean Algorithm (Iterative)
 * The algorithm is based on the principle that the greatest common divisor of two
 * numbers does not change if the larger number is replaced by its difference with
 * the smaller number. This process continues until one of the numbers is zero,
 * and the other number is the GCD. More efficiently, it uses the remainder:
 * gcd(a, b) = gcd(b, a % b)
 *
 * @param {number} a The first non-negative integer.
 * @param {number} b The second non-negative integer.
 * @returns {number} The greatest common divisor of a and b.
 *
 * Time Complexity: O(log(min(a, b))) - The number of steps is logarithmic with respect to the smaller of the two numbers.
 *                   This is because the remainder decreases significantly in each step.
 * Space Complexity: O(1) - Uses a constant amount of extra space.
 */
function gcd(a, b) {
    // Ensure inputs are non-negative integers
    if (typeof a !== 'number' || typeof b !== 'number' || !Number.isInteger(a) || !Number.isInteger(b)) {
        throw new Error("Inputs must be integers.");
    }
    if (a < 0 || b < 0) {
        throw new Error("Inputs must be non-negative for standard GCD definition.");
    }

    // Base cases:
    // If b is 0, then a is the GCD
    while (b !== 0) {
        const remainder = a % b; // Calculate the remainder
        a = b;                   // Update a to be the previous b
        b = remainder;           // Update b to be the remainder
    }
    return a; // When b becomes 0, a holds the GCD
}

/**
 * Problem 2: Least Common Multiple (LCM) using GCD
 *
 * The LCM of two integers is the smallest positive integer that is divisible by
 * both numbers.
 *
 * Optimal Approach: Using GCD
 * There's a direct relationship between LCM and GCD:
 * LCM(a, b) = |a * b| / GCD(a, b)
 * This formula is efficient because GCD can be computed efficiently.
 *
 * @param {number} a The first non-negative integer.
 * @param {number} b The second non-negative integer.
 * @returns {number} The least common multiple of a and b.
 *
 * Time Complexity: O(log(min(a, b))) - Dominated by the GCD calculation.
 * Space Complexity: O(1) - Uses a constant amount of extra space.
 */
function lcm(a, b) {
    // Input validation similar to GCD
    if (typeof a !== 'number' || typeof b !== 'number' || !Number.isInteger(a) || !Number.isInteger(b)) {
        throw new Error("Inputs must be integers.");
    }
    if (a < 0 || b < 0) {
        throw new Error("Inputs must be non-negative for standard LCM definition.");
    }

    // Handle edge case where one or both numbers are 0.
    // The LCM of 0 and any number is 0.
    if (a === 0 || b === 0) {
        return 0;
    }

    // Calculate LCM using the formula: LCM(a, b) = (a * b) / GCD(a, b)
    // To prevent potential overflow issues with `a * b` for very large numbers,
    // it's sometimes safer to calculate `(a / gcd(a, b)) * b`.
    const commonDivisor = gcd(a, b);
    return (a / commonDivisor) * b;
}

/**
 * Problem 3: Sieve of Eratosthenes for finding prime numbers up to a limit
 *
 * The Sieve of Eratosthenes is an ancient algorithm for finding all prime numbers
 * up to a specified integer. It works by iteratively marking as composite (i.e., not prime)
 * the multiples of each prime, starting with the first prime number, 2.
 *
 * Optimal Approach: Sieve of Eratosthenes
 * 1. Create a boolean array `isPrime[0...limit]` and initialize all entries as true.
 *    `isPrime[0]` and `isPrime[1]` are marked false.
 * 2. Start from p = 2. While p*p <= limit:
 *    a. If `isPrime[p]` is true, then p is a prime.
 *    b. Mark all multiples of p (p*p, p*p + p, p*p + 2p, ...) up to `limit` as false.
 *       We start from p*p because smaller multiples (like 2*p, 3*p) would have already
 *       been marked by smaller primes (2, 3 respectively).
 *    c. Increment p.
 * 3. All numbers `i` for which `isPrime[i]` is true are prime numbers.
 *
 * @param {number} limit The upper bound (inclusive) up to which primes should be found.
 * @returns {number[]} An array containing all prime numbers up to `limit`.
 *
 * Time Complexity: O(limit * log(log(limit))) - This is a very efficient prime-finding algorithm.
 *                  The outer loop runs up to sqrt(limit). The inner loop marks multiples.
 *                  Each number is visited a number of times proportional to its number of prime factors.
 *                  The harmonic series sum property leads to this complexity.
 * Space Complexity: O(limit) - An array of size `limit + 1` is used to store primality information.
 */
function sieveOfEratosthenes(limit) {
    if (typeof limit !== 'number' || !Number.isInteger(limit) || limit < 0) {
        throw new Error("Limit must be a non-negative integer.");
    }

    // Create a boolean array 'isPrime[0...limit]' and initialize all entries as true.
    // A value in isPrime[i] will be true if i is prime, false otherwise.
    const isPrime = new Array(limit + 1).fill(true);

    // 0 and 1 are not prime numbers
    if (limit >= 0) isPrime[0] = false;
    if (limit >= 1) isPrime[1] = false;

    // Start checking from p = 2. We only need to check up to sqrt(limit)
    // because if a number n has a prime factor greater than sqrt(n), it must
    // also have a prime factor smaller than sqrt(n).
    for (let p = 2; p * p <= limit; p++) {
        // If isPrime[p] is still true, then it is a prime
        if (isPrime[p]) {
            // Mark all multiples of p as not prime.
            // Start from p*p because smaller multiples (2p, 3p, etc.) would
            // have already been marked by smaller primes.
            for (let i = p * p; i <= limit; i += p) {
                isPrime[i] = false;
            }
        }
    }

    // Collect all prime numbers
    const primes = [];
    for (let i = 2; i <= limit; i++) {
        if (isPrime[i]) {
            primes.push(i);
        }
    }

    return primes;
}

/**
 * Problem 4: Power Function (x^n) using Binary Exponentiation (Exponentiation by Squaring)
 *
 * Calculate x raised to the power of n (x^n).
 *
 * Optimal Approach: Binary Exponentiation (Exponentiation by Squaring)
 * This method drastically reduces the number of multiplications required, especially for large exponents.
 * It's based on the idea that:
 * - If n is even, x^n = (x^2)^(n/2)
 * - If n is odd, x^n = x * x^(n-1) = x * (x^2)^((n-1)/2)
 * This can be implemented iteratively by checking bits of n in binary representation.
 *
 * @param {number} base The base number (x).
 * @param {number} exp The exponent (n). Can be positive, negative, or zero.
 * @returns {number} The result of base^exp.
 *
 * Time Complexity: O(log(abs(exp))) - The number of multiplications is proportional to the number of bits in `exp`.
 * Space Complexity: O(1) - Uses a constant amount of extra space.
 */
function power(base, exp) {
    if (typeof base !== 'number' || typeof exp !== 'number' || !Number.isInteger(exp)) {
        throw new Error("Base must be a number and exponent must be an integer.");
    }

    // Handle special cases:
    if (exp === 0) {
        // x^0 = 1 for any x (including 0^0 which is typically 1 in combinatorics, though undefined in pure math)
        return 1;
    }
    if (base === 0) {
        // 0^n = 0 for n > 0
        return 0;
    }

    let result = 1;
    let currentBase = base;
    let currentExp = Math.abs(exp); // Work with positive exponent first

    // Iterate while currentExp is greater than 0
    while (currentExp > 0) {
        // If the current bit of exp is 1 (i.e., exp is odd)
        if (currentExp % 2 === 1) {
            result *= currentBase; // Multiply result by currentBase
        }
        currentBase *= currentBase; // Square the currentBase (e.g., x -> x^2 -> x^4 -> x^8)
        currentExp = Math.floor(currentExp / 2); // Halve the exponent (e.g., n -> n/2 -> n/4)
    }

    // If the original exponent was negative, the result is 1 / (base^|exp|)
    if (exp < 0) {
        return 1 / result;
    }

    return result;
}

/**
 * Problem 5: Nth Fibonacci Number
 *
 * The Fibonacci sequence is a series of numbers where each number is the sum of
 * the two preceding ones, usually starting with 0 and 1.
 * F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2) for n > 1.
 *
 * Optimal Approach: Iterative Dynamic Programming
 * This approach builds the sequence from the bottom up, storing only the last two
 * numbers needed to calculate the next, thus avoiding redundant calculations and
 * stack overflow issues of naive recursion.
 *
 * @param {number} n The index of the Fibonacci number to find (non-negative integer).
 * @returns {number} The Nth Fibonacci number.
 *
 * Time Complexity: O(n) - The loop runs n-1 times.
 * Space Complexity: O(1) - Uses a constant amount of extra space (two variables).
 *
 * Alternative (More optimal for very large N): Matrix Exponentiation (O(log n))
 * This approach is typically used for extremely large N (e.g., 10^18) where O(N) is too slow.
 * It involves raising a 2x2 matrix to the power of N using binary exponentiation for matrices.
 * This implementation focuses on the more common iterative DP.
 */
function nthFibonacci(n) {
    if (typeof n !== 'number' || !Number.isInteger(n) || n < 0) {
        throw new Error("Input 'n' must be a non-negative integer.");
    }

    if (n === 0) return 0; // F(0) = 0
    if (n === 1) return 1; // F(1) = 1

    let a = 0; // Represents F(i-2)
    let b = 1; // Represents F(i-1)
    let temp;

    // Start from i = 2 up to n
    for (let i = 2; i <= n; i++) {
        temp = a + b; // Calculate F(i) = F(i-2) + F(i-1)
        a = b;        // Update F(i-2) to F(i-1)
        b = temp;     // Update F(i-1) to F(i)
    }

    return b; // b will hold F(n)
}

/**
 * Problem 6: Combinations (N choose K)
 *
 * Calculates the number of ways to choose k items from a set of n items without regard to the order.
 * Denoted as C(n, k) or (n k).
 * Formula: C(n, k) = n! / (k! * (n-k)!)
 *
 * Optimal Approach: Pascal's Triangle (Row/Diagonal optimization) or Formula with pre-cancellation
 * Direct factorial calculation can lead to very large intermediate numbers, potentially exceeding
 * JavaScript's safe integer limit, even if the final result fits.
 * A more robust approach is to simplify the formula:
 * C(n, k) = (n * (n-1) * ... * (n-k+1)) / (k * (k-1) * ... * 1)
 * This involves k multiplications and k divisions, mitigating intermediate overflow.
 * Also, C(n, k) = C(n, n-k), so we can choose min(k, n-k) to reduce iterations.
 *
 * @param {number} n The total number of items (non-negative integer).
 * @param {number} k The number of items to choose (non-negative integer).
 * @returns {number} The number of combinations C(n, k).
 *
 * Time Complexity: O(k) - The loop runs k times (or min(k, n-k) times).
 * Space Complexity: O(1) - Uses a constant amount of extra space.
 */
function combinations(n, k) {
    if (typeof n !== 'number' || typeof k !== 'number' || !Number.isInteger(n) || !Number.isInteger(k)) {
        throw new Error("Inputs 'n' and 'k' must be integers.");
    }
    if (n < 0 || k < 0) {
        throw new Error("Inputs 'n' and 'k' must be non-negative.");
    }
    if (k > n) {
        return 0; // Cannot choose more items than available
    }
    if (k === 0 || k === n) {
        return 1; // C(n, 0) = 1, C(n, n) = 1
    }

    // Optimization: C(n, k) = C(n, n-k)
    // Choose the smaller value between k and n-k to minimize calculations
    k = Math.min(k, n - k);

    let result = 1;
    for (let i = 0; i < k; i++) {
        result = result * (n - i) / (i + 1);
    }

    // Ensure the result is an integer (due to floating point division, although it should be exact)
    return Math.round(result);
}


module.exports = {
    gcd,
    lcm,
    sieveOfEratosthenes,
    power,
    nthFibonacci,
    combinations,
};
```