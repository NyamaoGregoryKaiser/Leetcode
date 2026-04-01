```javascript
/**
 * tests/bruteForceProblems.test.js
 *
 * Test suite for the brute-force/naive math problem solutions found in src/bruteForceProblems.js.
 * These tests ensure correctness, primarily for benchmarking purposes, as efficiency is not the goal here.
 */

const {
    gcdBruteForce,
    sieveOfEratosthenesBruteForce,
    powerBruteForce,
    nthFibonacciRecursive,
    combinationsBruteForce
} = require('../src/bruteForceProblems');

describe('Math Problems - Brute Force Solutions', () => {

    // --- GCD Brute Force Tests ---
    describe('gcdBruteForce(a, b)', () => {
        test('should return correct GCD for positive integers', () => {
            expect(gcdBruteForce(48, 18)).toBe(6);
            expect(gcdBruteForce(101, 103)).toBe(1);
            expect(gcdBruteForce(7, 7)).toBe(7);
            expect(gcdBruteForce(12, 0)).toBe(12);
            expect(gcdBruteForce(0, 5)).toBe(5);
            expect(gcdBruteForce(0, 0)).toBe(0);
        });

        test('should throw error for non-integer inputs', () => {
            expect(() => gcdBruteForce(4.5, 18)).toThrow("Inputs must be integers.");
            expect(() => gcdBruteForce(48, '18')).toThrow("Inputs must be integers.");
        });

        test('should throw error for negative inputs', () => {
            expect(() => gcdBruteForce(-48, 18)).toThrow("Inputs must be non-negative.");
            expect(() => gcdBruteForce(48, -18)).toThrow("Inputs must be non-negative.");
        });
    });

    // --- Sieve of Eratosthenes Brute Force Tests ---
    describe('sieveOfEratosthenesBruteForce(limit)', () => {
        test('should return correct primes up to a small limit', () => {
            expect(sieveOfEratosthenesBruteForce(10)).toEqual([2, 3, 5, 7]);
            expect(sieveOfEratosthenesBruteForce(2)).toEqual([2]);
            expect(sieveOfEratosthenesBruteForce(3)).toEqual([2, 3]);
            expect(sieveOfEratosthenesBruteForce(1)).toEqual([]);
            expect(sieveOfEratosthenesBruteForce(0)).toEqual([]);
        });

        test('should return correct primes up to a larger limit', () => {
            const primesUpTo30 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
            expect(sieveOfEratosthenesBruteForce(30)).toEqual(primesUpTo30);
        });

        test('should throw error for non-integer or negative limit', () => {
            expect(() => sieveOfEratosthenesBruteForce(10.5)).toThrow("Limit must be a non-negative integer.");
            expect(() => sieveOfEratosthenesBruteForce(-5)).toThrow("Limit must be a non-negative integer.");
        });
    });

    // --- Power Brute Force Tests ---
    describe('powerBruteForce(base, exp)', () => {
        test('should return correct results for positive exponents', () => {
            expect(powerBruteForce(2, 3)).toBe(8);
            expect(powerBruteForce(5, 2)).toBe(25);
            expect(powerBruteForce(10, 0)).toBe(1);
            expect(powerBruteForce(7, 1)).toBe(7);
        });

        test('should return correct results for negative exponents', () => {
            expect(powerBruteForce(2, -2)).toBe(0.25);
            expect(powerBruteForce(3, -1)).toBeCloseTo(1 / 3);
        });

        test('should handle base of 0', () => {
            expect(powerBruteForce(0, 5)).toBe(0);
            expect(powerBruteForce(0, 0)).toBe(1);
            expect(powerBruteForce(0, -2)).toBe(Infinity);
        });

        test('should throw error for non-integer exponent', () => {
            expect(() => powerBruteForce(2, 3.5)).toThrow("Base must be a number and exponent must be an integer.");
        });
    });

    // --- Nth Fibonacci Recursive Tests ---
    describe('nthFibonacciRecursive(n)', () => {
        test('should return correct Fibonacci numbers for small n', () => {
            expect(nthFibonacciRecursive(0)).toBe(0);
            expect(nthFibonacciRecursive(1)).toBe(1);
            expect(nthFibonacciRecursive(2)).toBe(1);
            expect(nthFibonacciRecursive(3)).toBe(2);
            expect(nthFibonacciRecursive(4)).toBe(3);
            expect(nthFibonacciRecursive(5)).toBe(5);
            expect(nthFibonacciRecursive(10)).toBe(55);
        });

        test('should throw error for negative n', () => {
            expect(() => nthFibonacciRecursive(-1)).toThrow("Input 'n' must be a non-negative integer.");
        });
    });

    // --- Combinations Brute Force Tests ---
    describe('combinationsBruteForce(n, k)', () => {
        test('should return correct combinations for valid inputs', () => {
            expect(combinationsBruteForce(5, 2)).toBe(10);
            expect(combinationsBruteForce(4, 2)).toBe(6);
            expect(combinationsBruteForce(10, 3)).toBe(120);
        });

        test('should handle edge cases: k=0, k=n', () => {
            expect(combinationsBruteForce(5, 0)).toBe(1);
            expect(combinationsBruteForce(5, 5)).toBe(1);
        });

        test('should return 0 when k > n', () => {
            expect(combinationsBruteForce(3, 5)).toBe(0);
        });

        test('should throw error for negative inputs', () => {
            expect(() => combinationsBruteForce(-5, 2)).toThrow("Inputs 'n' and 'k' must be non-negative.");
        });

        test('should throw error for non-integer inputs', () => {
            expect(() => combinationsBruteForce(5.5, 2)).toThrow("Inputs 'n' and 'k' must be integers.");
        });
    });
});
```