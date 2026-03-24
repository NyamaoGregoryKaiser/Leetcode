/**
 * @fileoverview Test suite for Fibonacci Sequence implementations.
 */

const {
    fibonacciBruteForce,
    fibonacciMemoization,
    fibonacciTabulation,
    fibonacciSpaceOptimized,
} = require('../src/problems/fibonacci');

describe('Fibonacci Sequence', () => {

    // Test cases for brute force (limited by performance)
    describe('fibonacciBruteForce', () => {
        it('should return 0 for n = 0', () => {
            expect(fibonacciBruteForce(0)).toBe(0);
        });
        it('should return 1 for n = 1', () => {
            expect(fibonacciBruteForce(1)).toBe(1);
        });
        it('should return correct Fibonacci numbers for small n', () => {
            expect(fibonacciBruteForce(2)).toBe(1);
            expect(fibonacciBruteForce(3)).toBe(2);
            expect(fibonacciBruteForce(4)).toBe(3);
            expect(fibonacciBruteForce(5)).toBe(5);
            expect(fibonacciBruteForce(10)).toBe(55);
        });
        // This test might be slow, but shows correctness.
        // For larger N, brute force will take too long and potentially exceed call stack.
        // it('should return correct Fibonacci numbers for larger n', () => {
        //     expect(fibonacciBruteForce(20)).toBe(6765);
        // });
        it('should handle negative input (returns -1 as per implementation)', () => {
            expect(fibonacciBruteForce(-1)).toBe(-1);
            expect(fibonacciBruteForce(-5)).toBe(-1);
        });
    });

    // Test cases for memoization
    describe('fibonacciMemoization', () => {
        it('should return 0 for n = 0', () => {
            expect(fibonacciMemoization(0)).toBe(0);
        });
        it('should return 1 for n = 1', () => {
            expect(fibonacciMemoization(1)).toBe(1);
        });
        it('should return correct Fibonacci numbers for small n', () => {
            expect(fibonacciMemoization(2)).toBe(1);
            expect(fibonacciMemoization(3)).toBe(2);
            expect(fibonacciMemoization(4)).toBe(3);
            expect(fibonacciMemoization(5)).toBe(5);
            expect(fibonacciMemoization(10)).toBe(55);
        });
        it('should return correct Fibonacci numbers for large n', () => {
            expect(fibonacciMemoization(30)).toBe(832040);
            expect(fibonacciMemoization(40)).toBe(102334155);
        });
        it('should handle negative input (returns -1 as per implementation)', () => {
            expect(fibonacciMemoization(-1)).toBe(-1);
            expect(fibonacciMemoization(-5)).toBe(-1);
        });
    });

    // Test cases for tabulation
    describe('fibonacciTabulation', () => {
        it('should return 0 for n = 0', () => {
            expect(fibonacciTabulation(0)).toBe(0);
        });
        it('should return 1 for n = 1', () => {
            expect(fibonacciTabulation(1)).toBe(1);
        });
        it('should return correct Fibonacci numbers for small n', () => {
            expect(fibonacciTabulation(2)).toBe(1);
            expect(fibonacciTabulation(3)).toBe(2);
            expect(fibonacciTabulation(4)).toBe(3);
            expect(fibonacciTabulation(5)).toBe(5);
            expect(fibonacciTabulation(10)).toBe(55);
        });
        it('should return correct Fibonacci numbers for large n', () => {
            expect(fibonacciTabulation(30)).toBe(832040);
            expect(fibonacciTabulation(40)).toBe(102334155);
            expect(fibonacciTabulation(50)).toBe(12586269025);
        });
        it('should handle negative input (returns -1 as per implementation)', () => {
            expect(fibonacciTabulation(-1)).toBe(-1);
            expect(fibonacciTabulation(-5)).toBe(-1);
        });
    });

    // Test cases for space-optimized tabulation
    describe('fibonacciSpaceOptimized', () => {
        it('should return 0 for n = 0', () => {
            expect(fibonacciSpaceOptimized(0)).toBe(0);
        });
        it('should return 1 for n = 1', () => {
            expect(fibonacciSpaceOptimized(1)).toBe(1);
        });
        it('should return correct Fibonacci numbers for small n', () => {
            expect(fibonacciSpaceOptimized(2)).toBe(1);
            expect(fibonacciSpaceOptimized(3)).toBe(2);
            expect(fibonacciSpaceOptimized(4)).toBe(3);
            expect(fibonacciSpaceOptimized(5)).toBe(5);
            expect(fibonacciSpaceOptimized(10)).toBe(55);
        });
        it('should return correct Fibonacci numbers for large n', () => {
            expect(fibonacciSpaceOptimized(30)).toBe(832040);
            expect(fibonacciSpaceOptimized(40)).toBe(102334155);
            expect(fibonacciSpaceOptimized(50)).toBe(12586269025);
        });
        it('should handle negative input (returns -1 as per implementation)', () => {
            expect(fibonacciSpaceOptimized(-1)).toBe(-1);
            expect(fibonacciSpaceOptimized(-5)).toBe(-1);
        });
    });
});