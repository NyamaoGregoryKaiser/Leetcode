```javascript
/**
 * src/utils.js
 *
 * This file contains general-purpose mathematical helper functions that can be used across different problems.
 */

/**
 * Calculates the factorial of a non-negative integer n.
 * n! = n * (n-1) * ... * 1
 *
 * @param {number} n The non-negative integer.
 * @returns {number} The factorial of n. Returns 1 for n=0.
 * @throws {Error} If n is negative or not an integer.
 *
 * Time Complexity: O(n) - The loop runs n times.
 * Space Complexity: O(1) - Uses a constant amount of extra space.
 */
function factorial(n) {
    if (typeof n !== 'number' || !Number.isInteger(n)) {
        throw new Error("Input must be an integer.");
    }
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers.");
    }
    if (n === 0) {
        return 1;
    }
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

/**
 * Checks if a number is prime using trial division.
 * This is a basic approach and not optimal for very large numbers.
 * Optimal solutions involve pre-computation (Sieve) or more advanced primality tests.
 *
 * @param {number} num The number to check for primality.
 * @returns {boolean} True if the number is prime, false otherwise.
 *
 * Time Complexity: O(sqrt(num)) - The loop runs up to the square root of num.
 * Space Complexity: O(1) - Uses a constant amount of extra space.
 */
function isPrimeTrialDivision(num) {
    if (typeof num !== 'number' || !Number.isInteger(num)) {
        return false; // Or throw an error, depending on requirements
    }
    if (num <= 1) return false;
    if (num <= 3) return true; // 2 and 3 are prime
    if (num % 2 === 0 || num % 3 === 0) return false; // multiples of 2 or 3 are not prime

    // Check for factors from 5 up to sqrt(num)
    // All primes > 3 can be written in the form 6k ± 1
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) {
            return false;
        }
    }
    return true;
}

module.exports = {
    factorial,
    isPrimeTrialDivision,
};
```