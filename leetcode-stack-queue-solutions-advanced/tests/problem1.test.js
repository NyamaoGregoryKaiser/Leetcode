/**
 * @file Test suite for the Valid Parentheses problem.
 * @module tests/problem1.test
 */

const validParentheses = require('../src/problems/problem1-valid-parentheses/validParentheses');

describe('validParentheses', () => {
    // Test case 1: Basic valid parentheses
    test('should return true for "()"', () => {
        expect(validParentheses("()")).toBe(true);
    });

    // Test case 2: Multiple types of valid parentheses
    test('should return true for "()[]{}"', () => {
        expect(validParentheses("()[]{}")).toBe(true);
    });

    // Test case 3: Nested valid parentheses
    test('should return true for "([{}])"', () => {
        expect(validParentheses("([{}])")).toBe(true);
    });

    // Test case 4: Another nested valid case
    test('should return true for "{[]}"', () => {
        expect(validParentheses("{[]}")).toBe(true);
    });

    // Test case 5: Mismatched closing bracket
    test('should return false for "(]"', () => {
        expect(validParentheses("(]")).toBe(false);
    });

    // Test case 6: Unclosed opening bracket
    test('should return false for "([)"', () => {
        expect(validParentheses("([)")).toBe(false);
    });

    // Test case 7: Unopened closing bracket
    test('should return false for "]"', () => {
        expect(validParentheses("]")).toBe(false);
    });

    // Test case 8: Empty string (valid according to common interpretations)
    test('should return true for an empty string ""', () => {
        expect(validParentheses("")).toBe(true);
    });

    // Test case 9: String with only opening brackets (invalid)
    test('should return false for "((("', () => {
        expect(validParentheses("(((")).toBe(false);
    });

    // Test case 10: String with only closing brackets (invalid)
    test('should return false for ")))"', () => {
        expect(validParentheses(")))")).toBe(false);
    });

    // Test case 11: Mixed but invalid order
    test('should return false for "{[}]"', () => {
        expect(validParentheses("{[}]")).toBe(false);
    });

    // Test case 12: Long and complex valid string
    test('should return true for a complex valid string', () => {
        const complexValid = "({[](){}}){[]}";
        expect(validParentheses(complexValid)).toBe(true);
    });

    // Test case 13: Long and complex invalid string
    test('should return false for a complex invalid string', () => {
        const complexInvalid = "({[()]}){[]}}"; // Extra closing brace
        expect(validParentheses(complexInvalid)).toBe(false);
    });

    // Test case 14: Another complex invalid string
    test('should return false for another complex invalid string', () => {
        const complexInvalid2 = "((()))]"; // Mismatched
        expect(validParentheses(complexInvalid2)).toBe(false);
    });

    // Test case 15: Single pair, reversed
    test('should return false for ")("', () => {
        expect(validParentheses(")(")).toBe(false);
    });

    // Test case 16: Non-parenthesis characters (assuming input is guaranteed to be only valid chars for this problem)
    // If problem statement changes, this test would need adjustment.
    // For now, assume valid input characters per problem definition.
});