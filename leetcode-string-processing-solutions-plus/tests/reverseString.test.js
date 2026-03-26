/**
 * tests/reverseString.test.js
 *
 * Test file for the reverseString algorithm implementations.
 */

const {
    reverseStringIterative,
    reverseStringTwoPointersInPlace,
    reverseStringRecursiveInPlace
} = require('../src/algorithms/reverseString');

describe('reverseStringIterative', () => {
    test('should reverse a simple string', () => {
        expect(reverseStringIterative("hello")).toBe("olleh");
    });

    test('should reverse a string with even length', () => {
        expect(reverseStringIterative("abcd")).toBe("dcba");
    });

    test('should reverse a string with odd length', () => {
        expect(reverseStringIterative("abcde")).toBe("edcba");
    });

    test('should return an empty string for an empty input', () => {
        expect(reverseStringIterative("")).toBe("");
    });

    test('should return the same string for a single character input', () => {
        expect(reverseStringIterative("a")).toBe("a");
    });

    test('should handle strings with spaces', () => {
        expect(reverseStringIterative("hello world")).toBe("dlrow olleh");
    });

    test('should handle strings with special characters', () => {
        expect(reverseStringIterative("!@#$")).toBe("$#@!");
    });

    test('should throw error for non-string input', () => {
        expect(() => reverseStringIterative(123)).toThrow(TypeError);
        expect(() => reverseStringIterative(null)).toThrow(TypeError);
        expect(() => reverseStringIterative(undefined)).toThrow(TypeError);
        expect(() => reverseStringIterative([])).toThrow(TypeError);
    });
});

describe('reverseStringTwoPointersInPlace', () => {
    test('should reverse a simple character array in-place', () => {
        const s = ["h", "e", "l", "l", "o"];
        reverseStringTwoPointersInPlace(s);
        expect(s).toEqual(["o", "l", "l", "e", "h"]);
    });

    test('should reverse an even length character array in-place', () => {
        const s = ["a", "b", "c", "d"];
        reverseStringTwoPointersInPlace(s);
        expect(s).toEqual(["d", "c", "b", "a"]);
    });

    test('should reverse an odd length character array in-place', () => {
        const s = ["a", "b", "c", "d", "e"];
        reverseStringTwoPointersInPlace(s);
        expect(s).toEqual(["e", "d", "c", "b", "a"]);
    });

    test('should handle an empty array', () => {
        const s = [];
        reverseStringTwoPointersInPlace(s);
        expect(s).toEqual([]);
    });

    test('should handle a single character array', () => {
        const s = ["z"];
        reverseStringTwoPointersInPlace(s);
        expect(s).toEqual(["z"]);
    });

    test('should handle array with spaces', () => {
        const s = ["h", " ", "w"];
        reverseStringTwoPointersInPlace(s);
        expect(s).toEqual(["w", " ", "h"]);
    });

    test('should handle array with special characters', () => {
        const s = ["!", "@", "#"];
        reverseStringTwoPointersInPlace(s);
        expect(s).toEqual(["#", "@", "!"]);
    });

    test('should throw error for non-array input', () => {
        expect(() => reverseStringTwoPointersInPlace("hello")).toThrow(TypeError);
        expect(() => reverseStringTwoPointersInPlace(123)).toThrow(TypeError);
        expect(() => reverseStringTwoPointersInPlace(null)).toThrow(TypeError);
    });

    test('should throw error for array with non-character elements', () => {
        expect(() => reverseStringTwoPointersInPlace([1, 2, 3])).toThrow(TypeError);
        expect(() => reverseStringTwoPointersInPlace(["a", "bc", "d"])).toThrow(TypeError); // "bc" is not single char
    });
});

describe('reverseStringRecursiveInPlace', () => {
    test('should reverse a simple character array recursively in-place', () => {
        const s = ["h", "e", "l", "l", "o"];
        reverseStringRecursiveInPlace(s);
        expect(s).toEqual(["o", "l", "l", "e", "h"]);
    });

    test('should reverse an even length character array recursively in-place', () => {
        const s = ["a", "b", "c", "d"];
        reverseStringRecursiveInPlace(s);
        expect(s).toEqual(["d", "c", "b", "a"]);
    });

    test('should reverse an odd length character array recursively in-place', () => {
        const s = ["a", "b", "c", "d", "e"];
        reverseStringRecursiveInPlace(s);
        expect(s).toEqual(["e", "d", "c", "b", "a"]);
    });

    test('should handle an empty array recursively', () => {
        const s = [];
        reverseStringRecursiveInPlace(s);
        expect(s).toEqual([]);
    });

    test('should handle a single character array recursively', () => {
        const s = ["z"];
        reverseStringRecursiveInPlace(s);
        expect(s).toEqual(["z"]);
    });

    test('should handle array with spaces recursively', () => {
        const s = ["h", " ", "w"];
        reverseStringRecursiveInPlace(s);
        expect(s).toEqual(["w", " ", "h"]);
    });

    test('should handle array with special characters recursively', () => {
        const s = ["!", "@", "#"];
        reverseStringRecursiveInPlace(s);
        expect(s).toEqual(["#", "@", "!"]);
    });

    test('should throw error for non-array input recursively', () => {
        expect(() => reverseStringRecursiveInPlace("hello")).toThrow(TypeError);
        expect(() => reverseStringRecursiveInPlace(123)).toThrow(TypeError);
        expect(() => reverseStringRecursiveInPlace(null)).toThrow(TypeError);
    });

    test('should throw error for array with non-character elements recursively', () => {
        expect(() => reverseStringRecursiveInPlace([1, 2, 3])).toThrow(TypeError);
        expect(() => reverseStringRecursiveInPlace(["a", "bc", "d"])).toThrow(TypeError);
    });
});