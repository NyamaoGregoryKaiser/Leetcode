/**
 * tests/validParentheses.test.js
 *
 * Test file for the validParentheses algorithm implementations.
 */

const {
    isValidParenthesesUsingArrayAsStack,
    isValidParenthesesUsingCustomStack
} = require('../src/algorithms/validParentheses');

// Test suite for isValidParenthesesUsingArrayAsStack
describe('isValidParenthesesUsingArrayAsStack', () => {
    // Test cases for valid parentheses
    test('should return true for simple valid parentheses', () => {
        expect(isValidParenthesesUsingArrayAsStack("()")).toBe(true);
    });

    test('should return true for multiple types of valid parentheses', () => {
        expect(isValidParenthesesUsingArrayAsStack("()[]{}")).toBe(true);
    });

    test('should return true for nested valid parentheses', () => {
        expect(isValidParenthesesUsingArrayAsStack("({[]})")).toBe(true);
    });

    test('should return true for complex nested valid parentheses', () => {
        expect(isValidParenthesesUsingArrayAsStack("{[]()}(){[][]}")).toBe(true);
    });

    // Test cases for invalid parentheses
    test('should return false for unmatched closing bracket', () => {
        expect(isValidParenthesesUsingArrayAsStack("([)]")).toBe(false);
    });

    test('should return false for unmatched opening bracket', () => {
        expect(isValidParenthesesUsingArrayAsStack("(((")).toBe(false);
    });

    test('should return false for wrong closing type', () => {
        expect(isValidParenthesesUsingArrayAsStack("([)]")).toBe(false);
    });

    test('should return false for unmatched open bracket at end', () => {
        expect(isValidParenthesesUsingArrayAsStack("({[})")).toBe(false);
    });

    test('should return false for empty string', () => {
        // Technically an empty string is considered valid as it has no invalid brackets.
        // The algorithm handles this correctly as stack remains empty.
        expect(isValidParenthesesUsingArrayAsStack("")).toBe(true);
    });

    test('should return false for string with odd length', () => {
        expect(isValidParenthesesUsingArrayAsStack("(")).toBe(false);
        expect(isValidParenthesesUsingArrayAsStack("}")).toBe(false);
        expect(isValidParenthesesUsingArrayAsStack("([]")).toBe(false);
    });

    test('should return false for string starting with closing bracket', () => {
        expect(isValidParenthesesUsingArrayAsStack("]")).toBe(false);
        expect(isValidParenthesesUsingArrayAsStack("}(")).toBe(false);
    });

    test('should return false for string with extra closing brackets', () => {
        expect(isValidParenthesesUsingArrayAsStack("())")).toBe(false);
        expect(isValidParenthesesUsingArrayAsStack("({)})")).toBe(false);
    });

    // Edge cases and error handling
    test('should throw error for non-string input', () => {
        expect(() => isValidParenthesesUsingArrayAsStack(123)).toThrow(TypeError);
        expect(() => isValidParenthesesUsingArrayAsStack(null)).toThrow(TypeError);
        expect(() => isValidParenthesesUsingArrayAsStack(undefined)).toThrow(TypeError);
        expect(() => isValidParenthesesUsingArrayAsStack([])).toThrow(TypeError);
    });
});

// Test suite for isValidParenthesesUsingCustomStack
describe('isValidParenthesesUsingCustomStack', () => {
    // Test cases for valid parentheses
    test('should return true for simple valid parentheses', () => {
        expect(isValidParenthesesUsingCustomStack("()")).toBe(true);
    });

    test('should return true for multiple types of valid parentheses', () => {
        expect(isValidParenthesesUsingCustomStack("()[]{}")).toBe(true);
    });

    test('should return true for nested valid parentheses', () => {
        expect(isValidParenthesesUsingCustomStack("({[]})")).toBe(true);
    });

    test('should return true for complex nested valid parentheses', () => {
        expect(isValidParenthesesUsingCustomStack("{[]()}(){[][]}")).toBe(true);
    });

    // Test cases for invalid parentheses
    test('should return false for unmatched closing bracket', () => {
        expect(isValidParenthesesUsingCustomStack("([)]")).toBe(false);
    });

    test('should return false for unmatched opening bracket', () => {
        expect(isValidParenthesesUsingCustomStack("(((")).toBe(false);
    });

    test('should return false for wrong closing type', () => {
        expect(isValidParenthesesUsingCustomStack("([)]")).toBe(false);
    });

    test('should return false for unmatched open bracket at end', () => {
        expect(isValidParenthesesUsingCustomStack("({[})")).toBe(false);
    });

    test('should return false for empty string', () => {
        expect(isValidParenthesesUsingCustomStack("")).toBe(true);
    });

    test('should return false for string with odd length', () => {
        expect(isValidParenthesesUsingCustomStack("(")).toBe(false);
        expect(isValidParenthesesUsingCustomStack("}")).toBe(false);
        expect(isValidParenthesesUsingCustomStack("([]")).toBe(false);
    });

    test('should return false for string starting with closing bracket', () => {
        expect(isValidParenthesesUsingCustomStack("]")).toBe(false);
        expect(isValidParenthesesUsingCustomStack("}(")).toBe(false);
    });

    test('should return false for string with extra closing brackets', () => {
        expect(isValidParenthesesUsingCustomStack("())")).toBe(false);
        expect(isValidParenthesesUsingCustomStack("({)})")).toBe(false);
    });

    // Edge cases and error handling
    test('should throw error for non-string input', () => {
        expect(() => isValidParenthesesUsingCustomStack(123)).toThrow(TypeError);
        expect(() => isValidParenthesesUsingCustomStack(null)).toThrow(TypeError);
        expect(() => isValidParenthesesUsingCustomStack(undefined)).toThrow(TypeError);
        expect(() => isValidParenthesesUsingCustomStack([])).toThrow(TypeError);
    });
});