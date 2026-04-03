package com.example.mathproblems;

import com.example.mathproblems.algorithms.MathAlgorithms;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.*;

/**
 * MathAlgorithmsTest.java
 *
 * This class contains comprehensive JUnit 5 tests for the MathAlgorithms class.
 * It covers various test cases, including base cases, edge cases, typical inputs,
 * and large numbers where applicable, for Fibonacci, GCD/LCM, Power, and Square Root problems.
 */
class MathAlgorithmsTest {

    private MathAlgorithms algorithms;

    @BeforeEach
    void setUp() {
        algorithms = new MathAlgorithms();
    }

    // --- Fibonacci Number Tests ---

    @DisplayName("Fibonacci: Test recursive with small inputs")
    @ParameterizedTest(name = "F({0}) should be {1}")
    @CsvSource({
            "0, 0",
            "1, 1",
            "2, 1",
            "3, 2",
            "4, 3",
            "5, 5",
            "10, 55",
            "15, 610"
    })
    void testFibonacciRecursive(int n, long expected) {
        assertEquals(expected, algorithms.fibonacciRecursive(n));
    }

    @DisplayName("Fibonacci: Test recursive with negative input")
    @Test
    void testFibonacciRecursiveNegative() {
        assertThrows(IllegalArgumentException.class, () -> algorithms.fibonacciRecursive(-1));
    }

    @DisplayName("Fibonacci: Test memoized with various inputs")
    @ParameterizedTest(name = "F({0}) should be {1}")
    @CsvSource({
            "0, 0",
            "1, 1",
            "2, 1",
            "10, 55",
            "20, 6765",
            "30, 832040",
            "45, 1134903170" // Larger number, still fits in long
    })
    void testFibonacciMemoized(int n, long expected) {
        assertEquals(expected, algorithms.fibonacciMemoized(n));
    }

    @DisplayName("Fibonacci: Test memoized with negative input")
    @Test
    void testFibonacciMemoizedNegative() {
        assertThrows(IllegalArgumentException.class, () -> algorithms.fibonacciMemoized(-1));
    }

    @DisplayName("Fibonacci: Test iterative with various inputs")
    @ParameterizedTest(name = "F({0}) should be {1}")
    @CsvSource({
            "0, 0",
            "1, 1",
            "2, 1",
            "10, 55",
            "20, 6765",
            "30, 832040",
            "45, 1134903170",
            "50, 12586269025L" // Larger number
    })
    void testFibonacciIterative(int n, long expected) {
        assertEquals(expected, algorithms.fibonacciIterative(n));
    }

    @DisplayName("Fibonacci: Test iterative with negative input")
    @Test
    void testFibonacciIterativeNegative() {
        assertThrows(IllegalArgumentException.class, () -> algorithms.fibonacciIterative(-1));
    }

    @DisplayName("Fibonacci: Test space optimized with various inputs")
    @ParameterizedTest(name = "F({0}) should be {1}")
    @CsvSource({
            "0, 0",
            "1, 1",
            "2, 1",
            "10, 55",
            "20, 6765",
            "30, 832040",
            "45, 1134903170",
            "50, 12586269025L"
    })
    void testFibonacciSpaceOptimized(int n, long expected) {
        assertEquals(expected, algorithms.fibonacciSpaceOptimized(n));
    }

    @DisplayName("Fibonacci: Test space optimized with negative input")
    @Test
    void testFibonacciSpaceOptimizedNegative() {
        assertThrows(IllegalArgumentException.class, () -> algorithms.fibonacciSpaceOptimized(-1));
    }

    // --- GCD and LCM Tests ---

    @DisplayName("GCD Iterative: Test with various positive inputs")
    @ParameterizedTest(name = "GCD({0}, {1}) should be {2}")
    @CsvSource({
            "48, 18, 6",
            "18, 48, 6",
            "7, 5, 1",
            "100, 10, 10",
            "0, 5, 5",
            "5, 0, 5",
            "0, 0, 0",
            "1, 1, 1",
            "99, 11, 11",
            "101, 103, 1" // Two primes
    })
    void testGcdIterative(int a, int b, int expected) {
        assertEquals(expected, algorithms.gcdIterative(a, b));
    }

    @DisplayName("GCD Iterative: Test with negative inputs")
    @Test
    void testGcdIterativeNegative() {
        assertThrows(IllegalArgumentException.class, () -> algorithms.gcdIterative(-1, 5));
        assertThrows(IllegalArgumentException.class, () -> algorithms.gcdIterative(5, -1));
        assertThrows(IllegalArgumentException.class, () -> algorithms.gcdIterative(-1, -5));
    }

    @DisplayName("GCD Recursive: Test with various positive inputs")
    @ParameterizedTest(name = "GCD({0}, {1}) should be {2}")
    @CsvSource({
            "48, 18, 6",
            "18, 48, 6",
            "7, 5, 1",
            "100, 10, 10",
            "0, 5, 5",
            "5, 0, 5",
            "0, 0, 0",
            "1, 1, 1",
            "99, 11, 11",
            "101, 103, 1"
    })
    void testGcdRecursive(int a, int b, int expected) {
        assertEquals(expected, algorithms.gcdRecursive(a, b));
    }

    @DisplayName("GCD Recursive: Test with negative inputs")
    @Test
    void testGcdRecursiveNegative() {
        assertThrows(IllegalArgumentException.class, () -> algorithms.gcdRecursive(-1, 5));
        assertThrows(IllegalArgumentException.class, () -> algorithms.gcdRecursive(5, -1));
        assertThrows(IllegalArgumentException.class, () -> algorithms.gcdRecursive(-1, -5));
    }

    @DisplayName("LCM: Test with various positive inputs")
    @ParameterizedTest(name = "LCM({0}, {1}) should be {2}")
    @CsvSource({
            "4, 6, 12",
            "6, 4, 12",
            "7, 5, 35",
            "10, 100, 100",
            "0, 5, 0",
            "5, 0, 0",
            "0, 0, 0",
            "1, 1, 1",
            "99, 11, 99",
            "101, 103, 10403", // Product of two primes
            "2147483647, 2, 4294967294L" // Prime * 2, checks long overflow
    })
    void testLcm(int a, int b, long expected) {
        assertEquals(expected, algorithms.lcm(a, b));
    }

    @DisplayName("LCM: Test with negative inputs")
    @Test
    void testLcmNegative() {
        assertThrows(IllegalArgumentException.class, () -> algorithms.lcm(-1, 5));
        assertThrows(IllegalArgumentException.class, () -> algorithms.lcm(5, -1));
        assertThrows(IllegalArgumentException.class, () -> algorithms.lcm(-1, -5));
    }

    // --- Power Function Tests ---

    private static final double DELTA = 1e-9; // Tolerance for double comparisons

    @DisplayName("Power Naive: Test with various inputs")
    @ParameterizedTest(name = "{0}^{1} should be {2}")
    @CsvSource({
            "2.0, 10, 1024.0",
            "2.0, 0, 1.0",
            "2.0, -2, 0.25",
            "0.0, 5, 0.0",
            "0.0, 0, 1.0",
            "1.0, 100, 1.0",
            "-2.0, 2, 4.0",
            "-2.0, 3, -8.0",
            "-2.0, -2, 0.25",
            "0.5, -1, 2.0"
    })
    void testPowerNaive(double x, int n, double expected) {
        assertEquals(expected, algorithms.powerNaive(x, n), DELTA);
    }

    @DisplayName("Power Naive: Test with 0 raised to negative power")
    @Test
    void testPowerNaiveZeroNegative() {
        assertThrows(ArithmeticException.class, () -> algorithms.powerNaive(0.0, -1));
    }

    @DisplayName("Power Optimized Recursive: Test with various inputs")
    @ParameterizedTest(name = "{0}^{1} should be {2}")
    @CsvSource({
            "2.0, 10, 1024.0",
            "2.0, 0, 1.0",
            "2.0, -2, 0.25",
            "0.0, 5, 0.0",
            "0.0, 0, 1.0",
            "1.0, 100, 1.0",
            "-2.0, 2, 4.0",
            "-2.0, 3, -8.0",
            "-2.0, -2, 0.25",
            "0.5, -1, 2.0",
            "3.0, 15, 14348907.0"
    })
    void testPowerOptimizedRecursive(double x, int n, double expected) {
        assertEquals(expected, algorithms.powerOptimizedRecursive(x, n), DELTA);
    }

    @DisplayName("Power Optimized Recursive: Test with 0 raised to negative power")
    @Test
    void testPowerOptimizedRecursiveZeroNegative() {
        assertThrows(ArithmeticException.class, () -> algorithms.powerOptimizedRecursive(0.0, -1));
    }

    @DisplayName("Power Optimized Recursive: Test with Integer.MIN_VALUE exponent")
    @Test
    void testPowerOptimizedRecursiveMinIntExponent() {
        // x^(MIN_INT) should be 1 / (x^MAX_INT * x) roughly, with 1/x for odd power adjustment.
        // For x=2, MIN_INT = -2147483648
        // Equivalent to (1/2)^2147483648
        double x = 2.0;
        int n = Integer.MIN_VALUE;
        double expected = 1.0 / Math.pow(x, Math.abs((double)n)); // Use Math.pow as reference
        assertEquals(expected, algorithms.powerOptimizedRecursive(x, n), DELTA * Math.pow(10, 100)); // Large delta for tiny numbers
    }

    @DisplayName("Power Optimized Iterative: Test with various inputs")
    @ParameterizedTest(name = "{0}^{1} should be {2}")
    @CsvSource({
            "2.0, 10, 1024.0",
            "2.0, 0, 1.0",
            "2.0, -2, 0.25",
            "0.0, 5, 0.0",
            "0.0, 0, 1.0",
            "1.0, 100, 1.0",
            "-2.0, 2, 4.0",
            "-2.0, 3, -8.0",
            "-2.0, -2, 0.25",
            "0.5, -1, 2.0",
            "3.0, 15, 14348907.0"
    })
    void testPowerOptimizedIterative(double x, int n, double expected) {
        assertEquals(expected, algorithms.powerOptimizedIterative(x, n), DELTA);
    }

    @DisplayName("Power Optimized Iterative: Test with 0 raised to negative power")
    @Test
    void testPowerOptimizedIterativeZeroNegative() {
        assertThrows(ArithmeticException.class, () -> algorithms.powerOptimizedIterative(0.0, -1));
    }

    @DisplayName("Power Optimized Iterative: Test with Integer.MIN_VALUE exponent")
    @Test
    void testPowerOptimizedIterativeMinIntExponent() {
        double x = 2.0;
        int n = Integer.MIN_VALUE;
        double expected = 1.0 / Math.pow(x, Math.abs((double)n));
        assertEquals(expected, algorithms.powerOptimizedIterative(x, n), DELTA * Math.pow(10, 100));
    }

    // --- Integer Square Root Tests ---

    @DisplayName("Sqrt Binary Search: Test with various inputs")
    @ParameterizedTest(name = "sqrt({0}) should be {1}")
    @CsvSource({
            "0, 0",
            "1, 1",
            "2, 1",
            "3, 1",
            "4, 2",
            "8, 2",
            "9, 3",
            "16, 4",
            "25, 5",
            "99, 9",
            "100, 10",
            "2147395599, 46340" // Max integer for which sqrt is int: (46340)^2 = 2147395600
    })
    void testMySqrtBinarySearch(int x, int expected) {
        assertEquals(expected, algorithms.mySqrtBinarySearch(x));
    }

    @DisplayName("Sqrt Binary Search: Test with negative input")
    @Test
    void testMySqrtBinarySearchNegative() {
        assertThrows(IllegalArgumentException.class, () -> algorithms.mySqrtBinarySearch(-1));
    }

    @DisplayName("Sqrt Newton Method: Test with various inputs")
    @ParameterizedTest(name = "sqrt({0}) should be {1}")
    @CsvSource({
            "0, 0",
            "1, 1",
            "2, 1",
            "3, 1",
            "4, 2",
            "8, 2",
            "9, 3",
            "16, 4",
            "25, 5",
            "99, 9",
            "100, 10",
            "2147395599, 46340"
    })
    void testMySqrtNewtonMethod(int x, int expected) {
        assertEquals(expected, algorithms.mySqrtNewtonMethod(x));
    }

    @DisplayName("Sqrt Newton Method: Test with negative input")
    @Test
    void testMySqrtNewtonMethodNegative() {
        assertThrows(IllegalArgumentException.class, () -> algorithms.mySqrtNewtonMethod(-1));
    }
}