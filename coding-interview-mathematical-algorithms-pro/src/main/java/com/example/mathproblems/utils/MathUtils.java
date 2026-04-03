package com.example.mathproblems.utils;

/**
 * MathUtils.java
 *
 * A collection of general utility methods for mathematical operations.
 * These are simple helpers that might be useful across different math problems.
 */
public class MathUtils {

    /**
     * Checks if an integer is even.
     *
     * @param n The integer to check.
     * @return true if n is even, false otherwise.
     */
    public static boolean isEven(int n) {
        return n % 2 == 0;
    }

    /**
     * Checks if an integer is odd.
     *
     * @param n The integer to check.
     * @return true if n is odd, false otherwise.
     */
    public static boolean isOdd(int n) {
        return n % 2 != 0;
    }

    /**
     * Clamps a value between a minimum and a maximum.
     *
     * @param value The value to clamp.
     * @param min The minimum allowed value.
     * @param max The maximum allowed value.
     * @return The clamped value.
     */
    public static int clamp(int value, int min, int max) {
        return Math.max(min, Math.min(value, max));
    }

    /**
     * Returns the absolute difference between two integers.
     *
     * @param a The first integer.
     * @param b The second integer.
     * @return The absolute difference.
     */
    public static int absDifference(int a, int b) {
        return Math.abs(a - b);
    }

    /**
     * Calculates the sum of all integers from 1 to n (inclusive).
     * Uses the formula n * (n + 1) / 2.
     *
     * @param n The upper limit for the sum.
     * @return The sum of integers from 1 to n.
     * @throws IllegalArgumentException if n is negative.
     */
    public static long sumUpToN(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("Input 'n' must be non-negative.");
        }
        return (long) n * (n + 1) / 2;
    }
}