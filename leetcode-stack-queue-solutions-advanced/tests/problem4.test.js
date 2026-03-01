/**
 * @file Test suite for the Evaluate Reverse Polish Notation problem.
 * @module tests/problem4.test
 */

const evalRPN = require('../src/problems/problem4-evaluate-reverse-polish-notation/evalRPN');

describe('evalRPN', () => {
    // Test case 1: Basic addition
    test('should correctly evaluate basic addition', () => {
        expect(evalRPN(["2", "1", "+"])).toBe(3); // (2 + 1) = 3
    });

    // Test case 2: Basic multiplication
    test('should correctly evaluate basic multiplication', () => {
        expect(evalRPN(["4", "3", "*"])).toBe(12); // (4 * 3) = 12
    });

    // Test case 3: Mixed operations
    test('should correctly evaluate mixed operations', () => {
        expect(evalRPN(["2", "1", "+", "3", "*"])).toBe(9); // ((2 + 1) * 3) = 9
    });

    // Test case 4: Division (positive truncation)
    test('should correctly evaluate division with positive truncation', () => {
        expect(evalRPN(["13", "5", "/"])).toBe(2); // (13 / 5) = 2 (truncates to 2)
    });

    // Test case 5: Division (negative truncation)
    test('should correctly evaluate division with negative truncation', () => {
        expect(evalRPN(["-13", "5", "/"])).toBe(-2); // (-13 / 5) = -2 (truncates to -2)
        expect(evalRPN(["13", "-5", "/"])).toBe(-2); // (13 / -5) = -2 (truncates to -2)
        expect(evalRPN(["-13", "-5", "/"])).toBe(2); // (-13 / -5) = 2 (truncates to 2)
    });

    // Test case 6: More complex example
    test('should correctly evaluate a more complex expression', () => {
        expect(evalRPN(["4", "13", "5", "/", "+"])).toBe(6); // (4 + (13 / 5)) = 4 + 2 = 6
    });

    // Test case 7: LeetCode example 3
    test('should correctly evaluate a complex example from LeetCode', () => {
        const tokens = ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"];
        expect(evalRPN(tokens)).toBe(22);
    });

    // Test case 8: Single number token
    test('should return the number itself if input is a single number', () => {
        expect(evalRPN(["5"])).toBe(5);
    });

    // Test case 9: Subtraction
    test('should correctly handle subtraction', () => {
        expect(evalRPN(["5", "2", "-"])).toBe(3); // (5 - 2) = 3
        expect(evalRPN(["2", "5", "-"])).toBe(-3); // (2 - 5) = -3
    });

    // Test case 10: Division by 1
    test('should handle division by 1', () => {
        expect(evalRPN(["10", "1", "/"])).toBe(10);
    });

    // Test case 11: Division result 0
    test('should handle division resulting in 0', () => {
        expect(evalRPN(["1", "2", "/"])).toBe(0); // 1/2 truncates to 0
        expect(evalRPN(["-1", "2", "/"])).toBe(0); // -1/2 truncates to 0
    });

    // Test case 12: Invalid input - empty array
    test('should throw error for empty input array', () => {
        expect(() => evalRPN([])).toThrow("Input array of tokens cannot be empty.");
    });

    // Test case 13: Invalid input - not enough operands (too many operators)
    test('should throw error for not enough operands', () => {
        expect(() => evalRPN(["+", "1"])).toThrow("Invalid RPN expression: Not enough operands for operator.");
        expect(() => evalRPN(["1", "+"])).toThrow("Invalid RPN expression: Not enough operands for operator.");
    });

    // Test case 14: Invalid input - too many operands (too few operators)
    test('should throw error for too many operands', () => {
        expect(() => evalRPN(["1", "2", "3"])).toThrow("Invalid RPN expression: Too many operands or operators remaining.");
    });
});