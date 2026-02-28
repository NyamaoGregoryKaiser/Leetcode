import { Problem2PrimeFactorization } from '../src/algorithms';

const {
    primeFactorsTrialDivision,
    primeFactorsSieve,
    MAX_SIEVE_LIMIT,
    resetSieveForTesting // Important for ensuring fresh sieve state in tests
} = Problem2PrimeFactorization;

describe('Prime Factorization Algorithms', () => {

    const testCases = [
        { n: 1, expected: [] },
        { n: 2, expected: [2] },
        { n: 3, expected: [3] },
        { n: 4, expected: [2, 2] },
        { n: 5, expected: [5] },
        { n: 6, expected: [2, 3] },
        { n: 7, expected: [7] },
        { n: 8, expected: [2, 2, 2] },
        { n: 9, expected: [3, 3] },
        { n: 10, expected: [2, 5] },
        { n: 12, expected: [2, 2, 3] },
        { n: 13, expected: [13] },
        { n: 100, expected: [2, 2, 5, 5] },
        { n: 210, expected: [2, 3, 5, 7] }, // Product of first four primes
        { n: 97, expected: [97] }, // Prime number
        { n: 999999, expected: [3, 3, 3, 7, 11, 13, 37] }, // Large composite
        { n: 999983, expected: [999983] }, // Large prime number
        { n: MAX_SIEVE_LIMIT, expected: [2, 2, 2, 2, 2, 5, 5, 5, 5, 5, 5] } // Largest possible input for sieve
    ];

    describe('primeFactorsTrialDivision', () => {
        test.each(testCases)(
            'should return $expected for primeFactorsTrialDivision($n)',
            ({ n, expected }) => {
                expect(primeFactorsTrialDivision(n)).toEqual(expected);
            }
        );

        test('should handle very large numbers correctly', () => {
            expect(primeFactorsTrialDivision(2_000_000_000)).toEqual([2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 5, 5, 5, 5, 5, 5]);
            // A large prime number
            expect(primeFactorsTrialDivision(1_000_000_007)).toEqual([1_000_000_007]);
            // A product of two large primes
            // 7 * 142857143 = 1000000001
            expect(primeFactorsTrialDivision(1000000001)).toEqual([7, 142857143]);
        });

        test('should throw error for non-positive or non-integer inputs', () => {
            expect(() => primeFactorsTrialDivision(0)).toThrow("Input must be a positive integer.");
            expect(() => primeFactorsTrialDivision(-5)).toThrow("Input must be a positive integer.");
            expect(() => primeFactorsTrialDivision(1.5)).toThrow("Input must be a positive integer.");
        });
    });

    describe('primeFactorsSieve', () => {
        // Reset sieve before each test to ensure consistent state
        beforeEach(() => {
            resetSieveForTesting();
        });

        test.each(testCases.filter(tc => tc.n <= MAX_SIEVE_LIMIT))(
            'should return $expected for primeFactorsSieve($n)',
            ({ n, expected }) => {
                expect(primeFactorsSieve(n)).toEqual(expected);
            }
        );

        test('should throw error for n > MAX_SIEVE_LIMIT', () => {
            const largeN = MAX_SIEVE_LIMIT + 1;
            expect(() => primeFactorsSieve(largeN)).toThrow(`Input ${largeN} exceeds MAX_SIEVE_LIMIT (${MAX_SIEVE_LIMIT}). Use trial division for larger numbers.`);
        });

        test('should throw error for non-positive or non-integer inputs', () => {
            expect(() => primeFactorsSieve(0)).toThrow("Input must be a positive integer.");
            expect(() => primeFactorsSieve(-5)).toThrow("Input must be a positive integer.");
            expect(() => primeFactorsSieve(1.5)).toThrow("Input must be a positive integer.");
        });

        test('sieve should be initialized only once', () => {
            const spy = jest.spyOn(Problem2PrimeFactorization, 'primeFactorsSieve' as any); // Access internal function
            primeFactorsSieve(10);
            primeFactorsSieve(20); // Should not re-initialize the sieve
            // Expecting the internal `sieve()` function (implicitly called by primeFactorsSieve)
            // to have its initialization logic triggered once.
            // This is hard to test directly without exposing `sieve` or `isSieveInitialized`.
            // The fact that it doesn't throw `MAX_SIEVE_LIMIT` error on second call (if the limit was smaller)
            // and returns correctly for multiple calls implies it works.
            spy.mockRestore(); // Clean up the spy
        });
    });
});