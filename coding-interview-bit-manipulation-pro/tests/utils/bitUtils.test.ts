```typescript
/**
 * @file bitUtils.test.ts
 * @description Jest test suite for helper bit utility functions.
 */

import {
    toBinaryString,
    getBit,
    setBit,
    clearBit,
    updateBit,
    toggleBit
} from '../../src/utils/bitUtils';

describe('toBinaryString', () => {
    it('should convert positive numbers to binary string with padding', () => {
        expect(toBinaryString(0, 8)).toBe('00000000');
        expect(toBinaryString(1, 8)).toBe('00000001');
        expect(toBinaryString(10, 8)).toBe('00001010');
        expect(toBinaryString(255, 8)).toBe('11111111');
        expect(toBinaryString(255, 16)).toBe('0000000011111111');
    });

    it('should default to 32-bit width if not specified', () => {
        expect(toBinaryString(1)).toBe('00000000000000000000000000000001');
        expect(toBinaryString(2147483647)).toBe('01111111111111111111111111111111'); // Max 31-bit signed int
    });

    it('should handle large 32-bit unsigned numbers', () => {
        expect(toBinaryString(4294967295, 32)).toBe('11111111111111111111111111111111'); // 0xFFFFFFFF
        expect(toBinaryString(2147483648, 32)).toBe('10000000000000000000000000000000'); // 2^31
    });

    it('should correctly handle numbers that already fit the width', () => {
        expect(toBinaryString(0b1010, 4)).toBe('1010');
    });
});

describe('getBit', () => {
    const num = 0b10110; // 22 in decimal
    it('should return true if the bit is set', () => {
        expect(getBit(num, 1)).toBe(true); // 0-indexed LSB is 0, 1st bit is 1
        expect(getBit(num, 3)).toBe(true); // 3rd bit is 1
        expect(getBit(num, 4)).toBe(true); // 4th bit is 1
    });

    it('should return false if the bit is not set', () => {
        expect(getBit(num, 0)).toBe(false); // 0th bit is 0
        expect(getBit(num, 2)).toBe(false); // 2nd bit is 0
        expect(getBit(num, 5)).toBe(false); // 5th bit (beyond actual number) is 0
    });

    it('should throw an error for invalid bit position', () => {
        expect(() => getBit(num, -1)).toThrow("Bit position K must be between 0 and 31.");
        expect(() => getBit(num, 32)).toThrow("Bit position K must be between 0 and 31.");
    });
});

describe('setBit', () => {
    const num = 0b10110; // 22
    it('should set a bit to 1 if it was 0', () => {
        const expected = 0b10111; // 23
        expect(setBit(num, 0)).toBe(expected);
        expect(toBinaryString(setBit(num, 0), 5)).toBe('10111');

        const expected2 = 0b101110; // 46
        expect(setBit(num, 5)).toBe(expected2);
        expect(toBinaryString(setBit(num, 5), 6)).toBe('101110');
    });

    it('should not change the number if the bit was already 1', () => {
        expect(setBit(num, 1)).toBe(num);
        expect(toBinaryString(setBit(num, 1), 5)).toBe('10110');
    });

    it('should throw an error for invalid bit position', () => {
        expect(() => setBit(num, -1)).toThrow("Bit position K must be between 0 and 31.");
        expect(() => setBit(num, 32)).toThrow("Bit position K must be between 0 and 31.");
    });
});

describe('clearBit', () => {
    const num = 0b10110; // 22
    it('should clear a bit to 0 if it was 1', () => {
        const expected = 0b00110; // 6
        expect(clearBit(num, 4)).toBe(expected);
        expect(toBinaryString(clearBit(num, 4), 5)).toBe('00110');

        const expected2 = 0b10100; // 20
        expect(clearBit(num, 1)).toBe(expected2);
        expect(toBinaryString(clearBit(num, 1), 5)).toBe('10100');
    });

    it('should not change the number if the bit was already 0', () => {
        expect(clearBit(num, 0)).toBe(num);
        expect(toBinaryString(clearBit(num, 0), 5)).toBe('10110');
    });

    it('should throw an error for invalid bit position', () => {
        expect(() => clearBit(num, -1)).toThrow("Bit position K must be between 0 and 31.");
        expect(() => clearBit(num, 32)).toThrow("Bit position K must be between 0 and 31.");
    });
});

describe('updateBit', () => {
    const num = 0b10110; // 22
    it('should set a bit to 1', () => {
        const expected = 0b10111; // 23
        expect(updateBit(num, 0, 1)).toBe(expected);
        expect(toBinaryString(updateBit(num, 0, 1), 5)).toBe('10111');
    });

    it('should clear a bit to 0', () => {
        const expected = 0b10100; // 20
        expect(updateBit(num, 1, 0)).toBe(expected);
        expect(toBinaryString(updateBit(num, 1, 0), 5)).toBe('10100');
    });

    it('should not change if already the desired value', () => {
        expect(updateBit(num, 1, 1)).toBe(num);
        expect(toBinaryString(updateBit(num, 1, 1), 5)).toBe('10110');
        expect(updateBit(num, 0, 0)).toBe(num);
        expect(toBinaryString(updateBit(num, 0, 0), 5)).toBe('10110');
    });

    it('should throw an error for invalid bit position or value', () => {
        expect(() => updateBit(num, -1, 1)).toThrow("Bit position K must be between 0 and 31.");
        expect(() => updateBit(num, 32, 0)).toThrow("Bit position K must be between 0 and 31.");
        // @ts-ignore: Intentionally testing invalid bitValue type
        expect(() => updateBit(num, 0, 2)).toThrow("Bit value must be 0 or 1.");
    });
});

describe('toggleBit', () => {
    const num = 0b10110; // 22
    it('should toggle a 0 bit to 1', () => {
        const expected = 0b10111; // 23
        expect(toggleBit(num, 0)).toBe(expected);
        expect(toBinaryString(toggleBit(num, 0), 5)).toBe('10111');
    });

    it('should toggle a 1 bit to 0', () => {
        const expected = 0b10100; // 20
        expect(toggleBit(num, 1)).toBe(expected);
        expect(toBinaryString(toggleBit(num, 1), 5)).toBe('10100');
    });

    it('should toggle multiple bits correctly', () => {
        let current = num; // 10110
        current = toggleBit(current, 0); // 10111
        current = toggleBit(current, 2); // 10111 ^ 00100 = 10011 (19)
        current = toggleBit(current, 4); // 10011 ^ 10000 = 00011 (3)
        expect(current).toBe(0b00011);
        expect(toBinaryString(current, 5)).toBe('00011');
    });

    it('should throw an error for invalid bit position', () => {
        expect(() => toggleBit(num, -1)).toThrow("Bit position K must be between 0 and 31.");
        expect(() => toggleBit(num, 32)).toThrow("Bit position K must be between 0 and 31.");
    });
});
```