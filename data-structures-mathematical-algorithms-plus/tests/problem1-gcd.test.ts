import { Problem1GCD } from '../src/algorithms';

const {
    gcdBruteForce,
    gcdEuclideanRecursive,
    gcdEuclideanIterative
} = Problem1GCD;

describe('Greatest Common Divisor (GCD) Algorithms', () => {

    const testCases = [
        { a: 48, b: 18, expected: 6 },
        { a: 18, b: 48, expected: 6 }, // Order shouldn't matter
        { a: 101, b: 103, expected: 1 }, // Primes
        { a: 7, b: 7, expected: 7 },
        { a: 0, b: 5, expected: 5 }, // GCD(0, X) = X
        { a: 5, b: 0, expected: 5 }, // GCD(X, 0) = X
        { a: 0, b: 0, expected: 0 }, // GCD(0, 0) = 0 (conventionally)
        { a: 121, b: 11, expected: 11 },
        { a: 13, b: 17, expected: 1 }, // Relatively prime
        { a: 1, b: 100, expected: 1 },
        { a: 100, b: 1, expected: 1 },
        { a: 210, b: 45, expected: 15 },
        { a: 1000000, b: 7, expected: 1 }, // Large, relatively prime
        { a: 999999, b: 3, expected: 3 }, // Large, common factor
        { a: 123456789, b: 987654321, expected: 9 } // Large numbers
    ];

    describe('gcdBruteForce', () => {
        test.each(testCases)(
            'should return $expected for gcdBruteForce($a, $b)',
            ({ a, b, expected }) => {
                expect(gcdBruteForce(a, b)).toBe(expected);
            }
        );

        test('should throw error for negative inputs', () => {
            expect(() => gcdBruteForce(-10, 5)).toThrow("Inputs must be non-negative integers for GCD.");
            expect(() => gcdBruteForce(10, -5)).toThrow("Inputs must be non-negative integers for GCD.");
            expect(() => gcdBruteForce(-10, -5)).toThrow("Inputs must be non-negative integers for GCD.");
        });
    });

    describe('gcdEuclideanRecursive', () => {
        test.each(testCases)(
            'should return $expected for gcdEuclideanRecursive($a, $b)',
            ({ a, b, expected }) => {
                expect(gcdEuclideanRecursive(a, b)).toBe(expected);
            }
        );

        test('should throw error for negative inputs', () => {
            expect(() => gcdEuclideanRecursive(-10, 5)).toThrow("Inputs must be non-negative integers for GCD.");
            expect(() => gcdEuclideanRecursive(10, -5)).toThrow("Inputs must be non-negative integers for GCD.");
            expect(() => gcdEuclideanRecursive(-10, -5)).toThrow("Inputs must be non-negative integers for GCD.");
        });
    });

    describe('gcdEuclideanIterative', () => {
        test.each(testCases)(
            'should return $expected for gcdEuclideanIterative($a, $b)',
            ({ a, b, expected }) => {
                expect(gcdEuclideanIterative(a, b)).toBe(expected);
            }
        );

        test('should throw error for negative inputs', () => {
            expect(() => gcdEuclideanIterative(-10, 5)).toThrow("Inputs must be non-negative integers for GCD.");
            expect(() => gcdEuclideanIterative(10, -5)).toThrow("Inputs must be non-negative integers for GCD.");
            expect(() => gcdEuclideanIterative(-10, -5)).toThrow("Inputs must be non-negative integers for GCD.");
        });
    });
});