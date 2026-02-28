import { Problem4NthFibonacci } from '../src/algorithms';

const {
    fibonacciDynamicProgramming,
    fibonacciMatrixExponentiation
} = Problem4NthFibonacci;

describe('Nth Fibonacci Number Algorithms', () => {

    const testCases = [
        { n: 0, expected: 0 },
        { n: 1, expected: 1 },
        { n: 2, expected: 1 },
        { n: 3, expected: 2 },
        { n: 4, expected: 3 },
        { n: 5, expected: 5 },
        { n: 6, expected: 8 },
        { n: 7, expected: 13 },
        { n: 8, expected: 21 },
        { n: 9, expected: 34 },
        { n: 10, expected: 55 },
        { n: 15, expected: 610 },
        { n: 20, expected: 6765 },
        { n: 30, expected: 832040 },
        { n: 40, expected: 102334155 },
        { n: 45, expected: 1134903170 }, // Maximum safe integer for JS is 2^53 - 1, F(45) fits.
        // F(46) = 1836311903, F(47) = 2971215073, F(48) = 4807526976
        // F(78) is the largest Fibonacci number that can be represented exactly as a JavaScript number.
        // F(78) = 8944394323791464
        // F(79) = 14472334024676221, exceeds MAX_SAFE_INTEGER for F(79) but JS handles it as a float.
        // For larger n, results might be approximations due to floating point precision.
        // We'll test up to N=78 for exact values.
        { n: 78, expected: 8944394323791464 }
    ];

    describe('fibonacciDynamicProgramming', () => {
        test.each(testCases)(
            'should return $expected for fibonacciDynamicProgramming($n)',
            ({ n, expected }) => {
                expect(fibonacciDynamicProgramming(n)).toBe(expected);
            }
        );

        test('should throw error for negative input', () => {
            expect(() => fibonacciDynamicProgramming(-1)).toThrow("Input must be a non-negative integer for Fibonacci sequence.");
            expect(() => fibonacciDynamicProgramming(-5)).toThrow("Input must be a non-negative integer for Fibonacci sequence.");
        });

        test('should throw error for non-integer input', () => {
            expect(() => fibonacciDynamicProgramming(1.5)).toThrow("Input must be a non-negative integer for Fibonacci sequence.");
        });
    });

    describe('fibonacciMatrixExponentiation', () => {
        test.each(testCases)(
            'should return $expected for fibonacciMatrixExponentiation($n)',
            ({ n, expected }) => {
                expect(fibonacciMatrixExponentiation(n)).toBe(expected);
            }
        );

        test('should throw error for negative input', () => {
            expect(() => fibonacciMatrixExponentiation(-1)).toThrow("Input must be a non-negative integer for Fibonacci sequence.");
            expect(() => fibonacciMatrixExponentiation(-5)).toThrow("Input must be a non-negative integer for Fibonacci sequence.");
        });

        test('should throw error for non-integer input', () => {
            expect(() => fibonacciMatrixExponentiation(1.5)).toThrow("Input must be a non-negative integer for Fibonacci sequence.");
        });
    });
});