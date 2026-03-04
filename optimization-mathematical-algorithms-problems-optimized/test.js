import { SieveOfEratosthenes } from '../src/problems/sieveOfEratosthenes';

describe('SieveOfEratosthenes', () => {
    describe('Sieve construction and basic functionality', () => {
        test('should correctly identify primes up to 10', () => {
            const sieve = new SieveOfEratosthenes(10);
            expect(sieve.isPrime(2)).toBe(true);
            expect(sieve.isPrime(3)).toBe(true);
            expect(sieve.isPrime(4)).toBe(false);
            expect(sieve.isPrime(5)).toBe(true);
            expect(sieve.isPrime(6)).toBe(false);
            expect(sieve.isPrime(7)).toBe(true);
            expect(sieve.isPrime(8)).toBe(false);
            expect(sieve.isPrime(9)).toBe(false);
            expect(sieve.isPrime(10)).toBe(false);
        });

        test('should return correct prime list up to 10', () => {
            const sieve = new SieveOfEratosthenes(10);
            expect(sieve.getPrimesUpTo(10)).toEqual([2, 3, 5, 7]);
        });

        test('should handle limit 0', () => {
            const sieve = new SieveOfEratosthenes(0);
            expect(sieve.isPrime(0)).toBe(false);
            expect(sieve.getPrimesUpTo(0)).toEqual([]);
        });

        test('should handle limit 1', () => {
            const sieve = new SieveOfEratosthenes(1);
            expect(sieve.isPrime(0)).toBe(false);
            expect(sieve.isPrime(1)).toBe(false);
            expect(sieve.getPrimesUpTo(1)).toEqual([]);
        });

        test('should handle limit 2', () => {
            const sieve = new SieveOfEratosthenes(2);
            expect(sieve.isPrime(2)).toBe(true);
            expect(sieve.getPrimesUpTo(2)).toEqual([2]);
        });
    });

    describe('Edge cases and ranges', () => {
        test('should correctly handle querying numbers outside the sieve range', () => {
            const sieve = new SieveOfEratosthenes(10);
            expect(sieve.isPrime(11)).toBe(false); // Out of range, considered false by implementation
            expect(sieve.isPrime(-1)).toBe(false); // Out of range, considered false
        });

        test('should return empty array for getPrimesUpTo(limit < 2)', () => {
            const sieve = new SieveOfEratosthenes(20);
            expect(sieve.getPrimesUpTo(0)).toEqual([]);
            expect(sieve.getPrimesUpTo(1)).toEqual([]);
        });

        test('should return primes only up to the specified upperBound even if sieve limit is higher', () => {
            const sieve = new SieveOfEratosthenes(50);
            expect(sieve.getPrimesUpTo(20)).toEqual([2, 3, 5, 7, 11, 13, 17, 19]);
        });
    });

    describe('Larger limits', () => {
        test('should correctly identify primes up to 30', () => {
            const sieve = new SieveOfEratosthenes(30);
            const expectedPrimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
            expect(sieve.getPrimesUpTo(30)).toEqual(expectedPrimes);
            expect(sieve.isPrime(29)).toBe(true);
            expect(sieve.isPrime(27)).toBe(false); // 3*9
        });

        test('should correctly identify primes up to 100', () => {
            const sieve = new SieveOfEratosthenes(100);
            const expectedPrimes = [
                2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97
            ];
            expect(sieve.getPrimesUpTo(100)).toEqual(expectedPrimes);
            expect(sieve.isPrime(97)).toBe(true);
            expect(sieve.isPrime(99)).toBe(false);
        });

        test('should handle a moderately large limit (e.g., 1000)', () => {
            const sieve = new SieveOfEratosthenes(1000);
            expect(sieve.isPrime(997)).toBe(true); // Largest prime below 1000
            expect(sieve.isPrime(999)).toBe(false); // 999 = 3 * 3 * 3 * 37
            expect(sieve.isPrime(991)).toBe(true);
            expect(sieve.getPrimesUpTo(1000).length).toBe(168); // There are 168 primes up to 1000
        });

        test('should handle maximum specified limit (e.g., 10^6)', () => {
            const MAX_LIMIT = 1_000_000;
            const sieve = new SieveOfEratosthenes(MAX_LIMIT);
            expect(sieve.isPrime(2)).toBe(true);
            expect(sieve.isPrime(3)).toBe(true);
            expect(sieve.isPrime(5)).toBe(true);
            expect(sieve.isPrime(7)).toBe(true);
            expect(sieve.isPrime(MAX_LIMIT - 1)).toBe(false); // 999999 = 3*3*3*7*11*13*37
            expect(sieve.isPrime(999983)).toBe(true); // A prime close to the limit
            expect(sieve.getPrimesUpTo(MAX_LIMIT).length).toBe(78498); // Number of primes up to 1,000,000
        });
    });

    test('should throw error for negative limit in constructor', () => {
        expect(() => new SieveOfEratosthenes(-1)).toThrow("Limit for Sieve of Eratosthenes must be non-negative.");
        expect(() => new SieveOfEratosthenes(-100)).toThrow("Limit for Sieve of Eratosthenes must be non-negative.");
    });
});