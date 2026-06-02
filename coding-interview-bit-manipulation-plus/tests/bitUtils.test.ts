```typescript
/**
 * tests/bitUtils.test.ts
 *
 * This file contains test suites for the common bit manipulation utility functions
 * implemented in `src/bitUtils.ts`. It uses Jest to verify the correct behavior
 * of `getBit`, `setBit`, `clearBit`, `updateBit`, `toggleBit`, `isEven`, `isOdd`,
 * `countLeadingZeros`, `abs`, and `swap` functions across various scenarios,
 * including edge cases and error handling for invalid input.
 */

import {
    getBit,
    setBit,
    clearBit,
    updateBit,
    toggleBit,
    isEven,
    isOdd,
    countLeadingZeros,
    abs,
    swap
} from '../src/bitUtils';

describe('Bit Utilities', () => {

    describe('getBit', () => {
        const num = 0b10110; // Decimal 22

        it('should return 0 for an unset bit', () => {
            expect(getBit(num, 0)).toBe(0); // LSB
            expect(getBit(num, 2)).toBe(1);
            expect(getBit(num, 3)).toBe(0);
        });

        it('should return 1 for a set bit', () => {
            expect(getBit(num, 1)).toBe(1);
            expect(getBit(num, 3)).toBe(1);
            expect(getBit(num, 4)).toBe(1); // MSB for 0b10110
        });

        it('should work with 0', () => {
            expect(getBit(0, 0)).toBe(0);
            expect(getBit(0, 15)).toBe(0);
        });

        it('should handle large positive numbers', () => {
            const largeNum = 2147483647; // 0x7FFFFFFF (all ones except MSB for 32-bit signed)
            expect(getBit(largeNum, 0)).toBe(1);
            expect(getBit(largeNum, 30)).toBe(1);
            expect(getBit(largeNum, 31)).toBe(0); // MSB of signed 32-bit is 0
        });

        it('should throw error for out of bounds index', () => {
            expect(() => getBit(num, -1)).toThrow("Bit position 'i' must be between 0 and 31 for a 32-bit integer.");
            expect(() => getBit(num, 32)).toThrow("Bit position 'i' must be between 0 and 31 for a 32-bit integer.");
        });
    });

    describe('setBit', () => {
        const num = 0b10100; // Decimal 20

        it('should set an unset bit to 1', () => {
            expect(setBit(num, 0)).toBe(0b10101); // LSB, from 0 to 1
            expect(setBit(num, 1)).toBe(0b10110); // from 0 to 1
            expect(setBit(num, 2)).toBe(0b10100); // already 1, no change
        });

        it('should not change a bit already set to 1', () => {
            expect(setBit(num, 2)).toBe(num); // Bit at pos 2 is already 1
            expect(setBit(num, 4)).toBe(num); // Bit at pos 4 is already 1
        });

        it('should work with 0', () => {
            expect(setBit(0, 0)).toBe(1); // 0b0001
            expect(setBit(0, 5)).toBe(32); // 0b100000
        });

        it('should throw error for out of bounds index', () => {
            expect(() => setBit(num, -1)).toThrow("Bit position 'i' must be between 0 and 31 for a 32-bit integer.");
            expect(() => setBit(num, 32)).toThrow("Bit position 'i' must be between 0 and 31 for a 32-bit integer.");
        });
    });

    describe('clearBit', () => {
        const num = 0b10111; // Decimal 23

        it('should clear a set bit to 0', () => {
            expect(clearBit(num, 0)).toBe(0b10110); // LSB, from 1 to 0
            expect(clearBit(num, 1)).toBe(0b10101); // from 1 to 0
        });

        it('should not change a bit already cleared to 0', () => {
            expect(clearBit(num, 3)).toBe(num); // Bit at pos 3 is already 0
            expect(clearBit(num, 5)).toBe(num); // Bit at pos 5 is already 0
        });

        it('should work with 0', () => {
            expect(clearBit(0, 0)).toBe(0);
        });

        it('should throw error for out of bounds index', () => {
            expect(() => clearBit(num, -1)).toThrow("Bit position 'i' must be between 0 and 31 for a 32-bit integer.");
            expect(() => clearBit(num, 32)).toThrow("Bit position 'i' must be between 0 and 31 for a 32-bit integer.");
        });
    });

    describe('updateBit', () => {
        const num = 0b10110; // Decimal 22

        it('should set a bit to 1 when bitValue is true', () => {
            expect(updateBit(num, 0, true)).toBe(0b10111); // LSB from 0 to 1
            expect(updateBit(num, 1, true)).toBe(0b10110); // Bit at 1 is already 1
        });

        it('should clear a bit to 0 when bitValue is false', () => {
            expect(updateBit(num, 0, false)).toBe(0b10110); // Bit at 0 is already 0
            expect(updateBit(num, 1, false)).toBe(0b10100); // Bit at 1 from 1 to 0
        });

        it('should work correctly for various positions', () => {
            expect(updateBit(0b0000, 2, true)).toBe(0b0100);
            expect(updateBit(0b0100, 2, false)).toBe(0b0000);
            expect(updateBit(0b1010, 0, true)).toBe(0b1011);
            expect(updateBit(0b1010, 1, false)).toBe(0b1000);
        });

        it('should throw error for out of bounds index', () => {
            expect(() => updateBit(num, -1, true)).toThrow("Bit position 'i' must be between 0 and 31 for a 32-bit integer.");
            expect(() => updateBit(num, 32, false)).toThrow("Bit position 'i' must be between 0 and 31 for a 32-bit integer.");
        });
    });

    describe('toggleBit', () => {
        const num = 0b10110; // Decimal 22

        it('should toggle an unset bit to 1', () => {
            expect(toggleBit(num, 0)).toBe(0b10111); // LSB from 0 to 1
            expect(toggleBit(num, 2)).toBe(0b10010); // Bit at 2 from 1 to 0
        });

        it('should toggle a set bit to 0', () => {
            expect(toggleBit(num, 1)).toBe(0b10100); // Bit at 1 from 1 to 0
            expect(toggleBit(num, 4)).toBe(0b00110); // Bit at 4 from 1 to 0
        });

        it('should work with 0', () => {
            expect(toggleBit(0, 0)).toBe(1);
            expect(toggleBit(0, 5)).toBe(32);
        });

        it('should throw error for out of bounds index', () => {
            expect(() => toggleBit(num, -1)).toThrow("Bit position 'i' must be between 0 and 31 for a 32-bit integer.");
            expect(() => toggleBit(num, 32)).toThrow("Bit position 'i' must be between 0 and 31 for a 32-bit integer.");
        });
    });

    describe('isEven', () => {
        it('should return true for even numbers', () => {
            expect(isEven(0)).toBe(true);
            expect(isEven(2)).toBe(true);
            expect(isEven(10)).toBe(true);
            expect(isEven(1000)).toBe(true);
            expect(isEven(-2)).toBe(true);
            expect(isEven(-10)).toBe(true);
        });

        it('should return false for odd numbers', () => {
            expect(isEven(1)).toBe(false);
            expect(isEven(7)).toBe(false);
            expect(isEven(99)).toBe(false);
            expect(isEven(-1)).toBe(false);
            expect(isEven(-7)).toBe(false);
        });
    });

    describe('isOdd', () => {
        it('should return true for odd numbers', () => {
            expect(isOdd(1)).toBe(true);
            expect(isOdd(7)).toBe(true);
            expect(isOdd(99)).toBe(true);
            expect(isOdd(-1)).toBe(true);
            expect(isOdd(-7)).toBe(true);
        });

        it('should return false for even numbers', () => {
            expect(isOdd(0)).toBe(false);
            expect(isOdd(2)).toBe(false);
            expect(isOdd(10)).toBe(false);
            expect(isOdd(1000)).toBe(false);
            expect(isOdd(-2)).toBe(false);
            expect(isOdd(-10)).toBe(false);
        });
    });

    describe('countLeadingZeros', () => {
        it('should return 32 for 0', () => {
            expect(countLeadingZeros(0)).toBe(32);
        });

        it('should return 31 for 1 (0...0001)', () => {
            expect(countLeadingZeros(1)).toBe(31);
        });

        it('should return 30 for 2 (0...0010)', () => {
            expect(countLeadingZeros(2)).toBe(30);
        });

        it('should return 28 for 8 (0...1000)', () => {
            expect(countLeadingZeros(8)).toBe(28);
        });

        it('should return 0 for 2^31 (1000...0000, MSB set as unsigned)', () => {
            // JavaScript's Math.clz32 treats input as unsigned 32-bit.
            // 2^31 is the MSB being 1, so no leading zeros.
            expect(countLeadingZeros(2147483648)).toBe(0);
        });

        it('should return 1 for 2^30 (0100...0000)', () => {
            expect(countLeadingZeros(1073741824)).toBe(1);
        });

        it('should return the correct count for various numbers', () => {
            expect(countLeadingZeros(0b1)).toBe(31);
            expect(countLeadingZeros(0b10)).toBe(30);
            expect(countLeadingZeros(0b100)).toBe(29);
            expect(countLeadingZeros(0b1111111111111111111111111111111)).toBe(1); // 2^31-1
            expect(countLeadingZeros(0xFFFFFFFF)).toBe(0); // All ones
        });
    });

    describe('abs', () => {
        it('should return the number itself for positive numbers', () => {
            expect(abs(0)).toBe(0);
            expect(abs(1)).toBe(1);
            expect(abs(100)).toBe(100);
            expect(abs(2147483647)).toBe(2147483647); // Max positive signed 32-bit int
        });

        it('should return the positive equivalent for negative numbers', () => {
            expect(abs(-1)).toBe(1);
            expect(abs(-50)).toBe(50);
            expect(abs(-2147483648)).toBe(2147483648); // Min negative signed 32-bit int (Special case: abs value is greater than max positive)
        });
    });

    describe('swap', () => {
        it('should swap two positive integers', () => {
            let a = 5;
            let b = 10;
            [a, b] = swap(a, b);
            expect(a).toBe(10);
            expect(b).toBe(5);
        });

        it('should swap two negative integers', () => {
            let a = -5;
            let b = -10;
            [a, b] = swap(a, b);
            expect(a).toBe(-10);
            expect(b).toBe(-5);
        });

        it('should swap a positive and a negative integer', () => {
            let a = 5;
            let b = -10;
            [a, b] = swap(a, b);
            expect(a).toBe(-10);
            expect(b).toBe(5);
        });

        it('should handle one of the numbers being zero', () => {
            let a = 0;
            let b = 100;
            [a, b] = swap(a, b);
            expect(a).toBe(100);
            expect(b).toBe(0);

            let x = -50;
            let y = 0;
            [x, y] = swap(x, y);
            expect(x).toBe(0);
            expect(y).toBe(-50);
        });

        it('should handle both numbers being the same', () => {
            let a = 7;
            let b = 7;
            [a, b] = swap(a, b);
            expect(a).toBe(7);
            expect(b).toBe(7);
        });
    });
});
```