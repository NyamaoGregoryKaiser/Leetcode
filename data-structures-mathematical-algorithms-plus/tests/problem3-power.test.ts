import { Problem3PowerFunction } from '../src/algorithms';

const {
    powerNaiveIterative,
    powerBinaryExponentiation
} = Problem3PowerFunction;

describe('Power Function (x^n) Algorithms', () => {

    // Helper to check floating point equality with a tolerance
    const expectCloseTo = (received: number, expected: number, precision: number = 7) => {
        expect(received).toBeCloseTo(expected, precision);
    };

    const testCases = [
        // Positive exponents
        { x: 2, n: 0, expected: 1 },
        { x: 2, n: 1, expected: 2 },
        { x: 2, n: 2, expected: 4 },
        { x: 2, n: 3, expected: 8 },
        { x: 2, n: 10, expected: 1024 },
        { x: 3, n: 4, expected: 81 },
        { x: 5, n: 0, expected: 1 },

        // Negative exponents
        { x: 2, n: -1, expected: 0.5 },
        { x: 2, n: -2, expected: 0.25 },
        { x: 2, n: -3, expected: 0.125 },
        { x: 3, n: -2, expected: 1 / 9 },

        // Floating point base
        { x: 2.5, n: 2, expected: 6.25 },
        { x: 2.1, n: 3, expected: 9.261 },
        { x: 0.5, n: 4, expected: 0.0625 },
        { x: 0.5, n: -2, expected: 4 },

        // Zero base
        { x: 0, n: 0, expected: 1 }, // Conventionally 0^0 = 1
        { x: 0, n: 1, expected: 0 },
        { x: 0, n: 5, expected: 0 },

        // One base
        { x: 1, n: 100, expected: 1 },
        { x: 1, n: -100, expected: 1 },

        // Negative base
        { x: -2, n: 1, expected: -2 },
        { x: -2, n: 2, expected: 4 },
        { x: -2, n: 3, expected: -8 },
        { x: -2, n: 4, expected: 16 },
        { x: -2, n: -1, expected: -0.5 },
        { x: -2, n: -2, expected: 0.25 },
        { x: -1, n: 100, expected: 1 },
        { x: -1, n: 101, expected: -1 },

        // Large exponents (will be slow for naive, fast for binary)
        { x: 2, n: 30, expected: Math.pow(2, 30) }, // 1073741824
        { x: 1.000001, n: 100000, expected: Math.pow(1.000001, 100000) }
    ];

    describe('powerNaiveIterative', () => {
        test.each(testCases)(
            'should return $expected for powerNaiveIterative($x, $n)',
            ({ x, n, expected }) => {
                expectCloseTo(powerNaiveIterative(x, n), expected);
            }
        );

        test('should throw error for 0 to negative power', () => {
            expect(() => powerNaiveIterative(0, -1)).toThrow("Division by zero: Cannot calculate 0 to a negative power.");
            expect(() => powerNaiveIterative(0, -5)).toThrow("Division by zero: Cannot calculate 0 to a negative power.");
        });
    });

    describe('powerBinaryExponentiation', () => {
        test.each(testCases)(
            'should return $expected for powerBinaryExponentiation($x, $n)',
            ({ x, n, expected }) => {
                expectCloseTo(powerBinaryExponentiation(x, n), expected);
            }
        );

        test('should throw error for 0 to negative power', () => {
            expect(() => powerBinaryExponentiation(0, -1)).toThrow("Division by zero: Cannot calculate 0 to a negative power.");
            expect(() => powerBinaryExponentiation(0, -5)).toThrow("Division by zero: Cannot calculate 0 to a negative power.");
        });
    });
});