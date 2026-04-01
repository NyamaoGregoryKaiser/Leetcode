```javascript
/**
 * tests/problems.test.js
 *
 * Test suite for the optimal math problem solutions found in src/problems.js.
 * Uses Jest for comprehensive testing, including happy paths, edge cases, and error handling.
 */

const {
    gcd,
    lcm,
    sieveOfEratosthenes,
    power,
    nthFibonacci,
    combinations
} = require('../src/problems');

describe('Math Problems - Optimal Solutions', () => {

    // --- GCD Tests ---
    describe('gcd(a, b)', () => {
        test('should return correct GCD for positive integers', () => {
            expect(gcd(48, 18)).toBe(6);
            expect(gcd(101, 103)).toBe(1); // Co-prime
            expect(gcd(7, 7)).toBe(7);
            expect(gcd(12, 0)).toBe(12);
            expect(gcd(0, 5)).toBe(5);
            expect(gcd(0, 0)).toBe(0); // Standard definition
            expect(gcd(270, 192)).toBe(6);
            expect(gcd(17, 1)).toBe(1);
            expect(gcd(1, 1)).toBe(1);
        });

        test('should handle large numbers correctly', () => {
            expect(gcd(123456789, 987654321)).toBe(9);
            expect(gcd(999999999, 1000000000)).toBe(1);
        });

        test('should throw error for non-integer inputs', () => {
            expect(() => gcd(4.5, 18)).toThrow("Inputs must be integers.");
            expect(() => gcd(48, '18')).toThrow("Inputs must be integers.");
        });

        test('should throw error for negative inputs', () => {
            expect(() => gcd(-48, 18)).toThrow("Inputs must be non-negative for standard GCD definition.");
            expect(() => gcd(48, -18)).toThrow("Inputs must be non-negative for standard GCD definition.");
        });
    });

    // --- LCM Tests ---
    describe('lcm(a, b)', () => {
        test('should return correct LCM for positive integers', () => {
            expect(lcm(4, 6)).toBe(12);
            expect(lcm(7, 3)).toBe(21);
            expect(lcm(12, 18)).toBe(36);
            expect(lcm(5, 5)).toBe(5);
            expect(lcm(1, 10)).toBe(10);
        });

        test('should handle zero inputs correctly', () => {
            expect(lcm(0, 5)).toBe(0);
            expect(lcm(5, 0)).toBe(0);
            expect(lcm(0, 0)).toBe(0);
        });

        test('should handle large numbers correctly', () => {
            expect(lcm(1000000, 2000000)).toBe(2000000);
            expect(lcm(999999, 1000000)).toBe(999999000000); // 999999 * 1000000 / gcd(999999, 1000000) = 999999 * 1000000 / 1
        });

        test('should throw error for non-integer inputs', () => {
            expect(() => lcm(4.5, 6)).toThrow("Inputs must be integers.");
            expect(() => lcm(4, '6')).toThrow("Inputs must be integers.");
        });

        test('should throw error for negative inputs', () => {
            expect(() => lcm(-4, 6)).toThrow("Inputs must be non-negative for standard LCM definition.");
            expect(() => lcm(4, -6)).toThrow("Inputs must be non-negative for standard LCM definition.");
        });
    });

    // --- Sieve of Eratosthenes Tests ---
    describe('sieveOfEratosthenes(limit)', () => {
        test('should return correct primes up to a small limit', () => {
            expect(sieveOfEratosthenes(10)).toEqual([2, 3, 5, 7]);
            expect(sieveOfEratosthenes(2)).toEqual([2]);
            expect(sieveOfEratosthenes(3)).toEqual([2, 3]);
            expect(sieveOfEratosthenes(1)).toEqual([]);
            expect(sieveOfEratosthenes(0)).toEqual([]);
        });

        test('should return correct primes up to a larger limit', () => {
            const primesUpTo30 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
            expect(sieveOfEratosthenes(30)).toEqual(primesUpTo30);
            const primesUpTo50 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
            expect(sieveOfEratosthenes(50)).toEqual(primesUpTo50);
        });

        test('should handle edge case of 0 and 1', () => {
            expect(sieveOfEratosthenes(0)).toEqual([]);
            expect(sieveOfEratosthenes(1)).toEqual([]);
        });

        test('should throw error for non-integer or negative limit', () => {
            expect(() => sieveOfEratosthenes(10.5)).toThrow("Limit must be a non-negative integer.");
            expect(() => sieveOfEratosthenes('10')).toThrow("Limit must be a non-negative integer.");
            expect(() => sieveOfEratosthenes(-5)).toThrow("Limit must be a non-negative integer.");
        });
    });

    // --- Power Function Tests ---
    describe('power(base, exp)', () => {
        test('should return correct results for positive exponents', () => {
            expect(power(2, 3)).toBe(8);
            expect(power(5, 2)).toBe(25);
            expect(power(10, 0)).toBe(1);
            expect(power(7, 1)).toBe(7);
            expect(power(3, 4)).toBe(81);
        });

        test('should return correct results for negative exponents', () => {
            expect(power(2, -2)).toBe(0.25); // 1/4
            expect(power(3, -1)).toBeCloseTo(1 / 3);
            expect(power(10, -3)).toBe(0.001);
        });

        test('should handle base of 0', () => {
            expect(power(0, 5)).toBe(0);
            expect(power(0, 0)).toBe(1); // Standard mathematical/combinatorial definition
            expect(power(0, -2)).toBe(Infinity); // 1 / (0*0) is 1/0, which is Infinity
        });

        test('should handle base of 1', () => {
            expect(power(1, 100)).toBe(1);
            expect(power(1, -100)).toBe(1);
            expect(power(1, 0)).toBe(1);
        });

        test('should handle large exponents', () => {
            expect(power(2, 30)).toBe(1073741824);
            expect(power(3, 20)).toBe(3486784401);
        });

        test('should throw error for non-integer exponent', () => {
            expect(() => power(2, 3.5)).toThrow("Base must be a number and exponent must be an integer.");
            expect(() => power(2, '3')).toThrow("Base must be a number and exponent must be an integer.");
        });

        test('should throw error for non-number base', () => {
            expect(() => power('2', 3)).toThrow("Base must be a number and exponent must be an integer.");
        });
    });

    // --- Nth Fibonacci Number Tests ---
    describe('nthFibonacci(n)', () => {
        test('should return correct Fibonacci numbers for small n', () => {
            expect(nthFibonacci(0)).toBe(0);
            expect(nthFibonacci(1)).toBe(1);
            expect(nthFibonacci(2)).toBe(1);
            expect(nthFibonacci(3)).toBe(2);
            expect(nthFibonacci(4)).toBe(3);
            expect(nthFibonacci(5)).toBe(5);
            expect(nthFibonacci(6)).toBe(8);
            expect(nthFibonacci(7)).toBe(13);
            expect(nthFibonacci(8)).toBe(21);
            expect(nthFibonacci(9)).toBe(34);
            expect(nthFibonacci(10)).toBe(55);
        });

        test('should return correct Fibonacci numbers for larger n', () => {
            expect(nthFibonacci(20)).toBe(6765);
            expect(nthFibonacci(30)).toBe(832040);
            expect(nthFibonacci(45)).toBe(1134903170); // Within safe integer limit
        });

        test('should throw error for negative n', () => {
            expect(() => nthFibonacci(-1)).toThrow("Input 'n' must be a non-negative integer.");
            expect(() => nthFibonacci(-5)).toThrow("Input 'n' must be a non-negative integer.");
        });

        test('should throw error for non-integer n', () => {
            expect(() => nthFibonacci(3.5)).toThrow("Input 'n' must be a non-negative integer.");
            expect(() => nthFibonacci('abc')).toThrow("Input 'n' must be a non-negative integer.");
        });
    });

    // --- Combinations (N choose K) Tests ---
    describe('combinations(n, k)', () => {
        test('should return correct combinations for valid inputs', () => {
            expect(combinations(5, 2)).toBe(10); // C(5,2) = (5*4)/(2*1) = 10
            expect(combinations(4, 2)).toBe(6);  // C(4,2) = (4*3)/(2*1) = 6
            expect(combinations(10, 3)).toBe(120); // C(10,3) = (10*9*8)/(3*2*1) = 120
            expect(combinations(7, 4)).toBe(35); // C(7,4) = C(7,3) = (7*6*5)/(3*2*1) = 35
        });

        test('should handle edge cases: k=0, k=n', () => {
            expect(combinations(5, 0)).toBe(1);
            expect(combinations(5, 5)).toBe(1);
            expect(combinations(1, 0)).toBe(1);
            expect(combinations(1, 1)).toBe(1);
        });

        test('should return 0 when k > n', () => {
            expect(combinations(3, 5)).toBe(0);
            expect(combinations(0, 1)).toBe(0);
        });

        test('should handle large numbers without overflow for result within safe integer limit', () => {
            expect(combinations(20, 10)).toBe(184756);
            expect(combinations(30, 15)).toBe(155117520);
            expect(combinations(50, 25)).toBe(126410606437752); // Large, but fits in safe integer.
        });

        test('should throw error for negative inputs', () => {
            expect(() => combinations(-5, 2)).toThrow("Inputs 'n' and 'k' must be non-negative.");
            expect(() => combinations(5, -2)).toThrow("Inputs 'n' and 'k' must be non-negative.");
        });

        test('should throw error for non-integer inputs', () => {
            expect(() => combinations(5.5, 2)).toThrow("Inputs 'n' and 'k' must be integers.");
            expect(() => combinations(5, 2.5)).toThrow("Inputs 'n' and 'k' must be integers.");
            expect(() => combinations('5', 2)).toThrow("Inputs 'n' and 'k' must be integers.");
        });
    });
});
```