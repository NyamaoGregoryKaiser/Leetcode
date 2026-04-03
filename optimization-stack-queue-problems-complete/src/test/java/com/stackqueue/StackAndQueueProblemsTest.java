```java
package com.stackqueue;

import com.stackqueue.problems.StackAndQueueProblems;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Stack and Queue Problems Tests")
class StackAndQueueProblemsTest {

    private StackAndQueueProblems problems;

    @BeforeEach
    void setUp() {
        problems = new StackAndQueueProblems();
    }

    @Nested
    @DisplayName("Problem 3: Valid Parentheses")
    class ValidParenthesesTests {

        @Test
        @DisplayName("should return true for valid parentheses strings")
        void testValidStrings() {
            assertTrue(problems.isValid("()"));
            assertTrue(problems.isValid("()[]{}"));
            assertTrue(problems.isValid("{[]}"));
            assertTrue(problems.isValid("({[]})"));
            assertTrue(problems.isValid("")); // Empty string is valid
            assertTrue(problems.isValid("((()))[[[]]]"));
        }

        @Test
        @DisplayName("should return false for invalid parentheses strings")
        void testInvalidStrings() {
            assertFalse(problems.isValid("(")); // Unmatched open
            assertFalse(problems.isValid("]")); // Unmatched close
            assertFalse(problems.isValid("([)]")); // Mismatched order
            assertFalse(problems.isValid("{[}]")); // Mismatched order and type
            assertFalse(problems.isValid("(((")); // Unclosed open brackets
            assertFalse(problems.isValid(")))")); // Unopened close brackets
            assertFalse(problems.isValid("}{")); // Mismatched type
            assertFalse(problems.isValid("(()")); // Unclosed open
            assertFalse(problems.isValid("] (")); // Edge: starting with close then open
        }

        @Test
        @DisplayName("should handle null input")
        void testNullInput() {
            assertTrue(problems.isValid(null)); // As per problem convention, null or empty is valid
        }

        @Test
        @DisplayName("should handle single character strings")
        void testSingleCharacterString() {
            assertFalse(problems.isValid("["));
            assertFalse(problems.isValid("}"));
        }
    }

    @Nested
    @DisplayName("Problem 4: Daily Temperatures")
    class DailyTemperaturesTests {

        @Test
        @DisplayName("should return correct waiting days for various temperature arrays (Optimized)")
        void testDailyTemperaturesOptimized() {
            assertArrayEquals(new int[]{1, 1, 4, 2, 1, 1, 0, 0}, problems.dailyTemperatures(new int[]{73, 74, 75, 71, 69, 72, 76, 73}));
            assertArrayEquals(new int[]{1, 1, 0}, problems.dailyTemperatures(new int[]{30, 40, 50}));
            assertArrayEquals(new int[]{0, 0, 0}, problems.dailyTemperatures(new int[]{30, 30, 30}));
            assertArrayEquals(new int[]{0, 0, 0}, problems.dailyTemperatures(new int[]{50, 40, 30}));
            assertArrayEquals(new int[]{8, 1, 5, 4, 3, 2, 1, 1, 0, 0}, problems.dailyTemperatures(new int[]{89, 62, 70, 58, 47, 47, 46, 76, 100, 70}));
            assertArrayEquals(new int[]{0}, problems.dailyTemperatures(new int[]{100})); // Single element
            assertArrayEquals(new int[]{0, 0}, problems.dailyTemperatures(new int[]{100, 90})); // Decreasing
            assertArrayEquals(new int[]{1, 0}, problems.dailyTemperatures(new int[]{90, 100})); // Increasing
            assertArrayEquals(new int[]{1, 0, 1, 0, 1, 0}, problems.dailyTemperatures(new int[]{1,2,1,2,1,2}));
        }

        @Test
        @DisplayName("should handle empty or null input (Optimized)")
        void testEmptyAndNullTemperaturesOptimized() {
            assertArrayEquals(new int[0], problems.dailyTemperatures(new int[]{}));
            assertArrayEquals(new int[0], problems.dailyTemperatures(null));
        }

        @Test
        @DisplayName("should return correct waiting days for various temperature arrays (Brute Force)")
        void testDailyTemperaturesBruteForce() {
            assertArrayEquals(new int[]{1, 1, 4, 2, 1, 1, 0, 0}, problems.dailyTemperaturesBruteForce(new int[]{73, 74, 75, 71, 69, 72, 76, 73}));
            assertArrayEquals(new int[]{1, 1, 0}, problems.dailyTemperaturesBruteForce(new int[]{30, 40, 50}));
            assertArrayEquals(new int[]{0, 0, 0}, problems.dailyTemperaturesBruteForce(new int[]{30, 30, 30}));
            assertArrayEquals(new int[]{0, 0, 0}, problems.dailyTemperaturesBruteForce(new int[]{50, 40, 30}));
            assertArrayEquals(new int[]{8, 1, 5, 4, 3, 2, 1, 1, 0, 0}, problems.dailyTemperaturesBruteForce(new int[]{89, 62, 70, 58, 47, 47, 46, 76, 100, 70}));
            assertArrayEquals(new int[]{0}, problems.dailyTemperaturesBruteForce(new int[]{100}));
            assertArrayEquals(new int[]{0, 0}, problems.dailyTemperaturesBruteForce(new int[]{100, 90}));
            assertArrayEquals(new int[]{1, 0}, problems.dailyTemperaturesBruteForce(new int[]{90, 100}));
            assertArrayEquals(new int[]{1, 0, 1, 0, 1, 0}, problems.dailyTemperaturesBruteForce(new int[]{1,2,1,2,1,2}));
        }

        @Test
        @DisplayName("should handle empty or null input (Brute Force)")
        void testEmptyAndNullTemperaturesBruteForce() {
            assertArrayEquals(new int[0], problems.dailyTemperaturesBruteForce(new int[]{}));
            assertArrayEquals(new int[0], problems.dailyTemperaturesBruteForce(null));
        }
    }

    @Nested
    @DisplayName("Problem 5: Sliding Window Maximum")
    class SlidingWindowMaximumTests {

        @Test
        @DisplayName("should return correct maximums for various arrays (Optimized Deque)")
        void testMaxSlidingWindowOptimized() {
            assertArrayEquals(new int[]{3, 3, 5, 5, 6, 7}, problems.maxSlidingWindow(new int[]{1, 3, -1, -3, 5, 3, 6, 7}, 3));
            assertArrayEquals(new int[]{1}, problems.maxSlidingWindow(new int[]{1}, 1));
            assertArrayEquals(new int[]{1, -1}, problems.maxSlidingWindow(new int[]{1, -1}, 1));
            assertArrayEquals(new int[]{3, 3, 2, 5}, problems.maxSlidingWindow(new int[]{1, 3, 1, 2, 0, 5}, 3));
            assertArrayEquals(new int[]{10, 10, 9, 9, 10, 10, 10, 10, 10}, problems.maxSlidingWindow(new int[]{10, 9, 8, 7, 6, 10, 10, 10, 10, 10}, 2));
            assertArrayEquals(new int[]{7, 7, 7, 7, 7}, problems.maxSlidingWindow(new int[]{7, 6, 5, 4, 3, 2, 1}, 3)); // Decreasing
            assertArrayEquals(new int[]{3, 4, 5, 6, 7}, problems.maxSlidingWindow(new int[]{1, 2, 3, 4, 5, 6, 7}, 3)); // Increasing
            assertArrayEquals(new int[]{5, 5, 5, 5, 5}, problems.maxSlidingWindow(new int[]{5, 5, 5, 5, 5, 5, 5}, 3)); // All same
            assertArrayEquals(new int[]{11}, problems.maxSlidingWindow(new int[]{9,11}, 2));
            assertArrayEquals(new int[]{11, 11}, problems.maxSlidingWindow(new int[]{4, -2, 11, -4}, 2));
            assertArrayEquals(new int[]{10, 10, 10, 10}, problems.maxSlidingWindow(new int[]{1, 10, -5, 10, 5, 10, -10}, 3));
        }

        @Test
        @DisplayName("should handle edge cases for k (Optimized Deque)")
        void testMaxSlidingWindowEdgeKOptimized() {
            assertArrayEquals(new int[0], problems.maxSlidingWindow(new int[]{}, 0));
            assertArrayEquals(new int[0], problems.maxSlidingWindow(null, 3));
            assertArrayEquals(new int[0], problems.maxSlidingWindow(new int[]{1,2,3}, 0));

            // k larger than array length
            assertArrayEquals(new int[]{3}, problems.maxSlidingWindow(new int[]{1, 2, 3}, 5));
            assertArrayEquals(new int[]{10}, problems.maxSlidingWindow(new int[]{10}, 5));
            assertArrayEquals(new int[]{-1}, problems.maxSlidingWindow(new int[]{-5, -1, -10}, 5));
        }

        @Test
        @DisplayName("should return correct maximums for various arrays (Brute Force)")
        void testMaxSlidingWindowBruteForce() {
            assertArrayEquals(new int[]{3, 3, 5, 5, 6, 7}, problems.maxSlidingWindowBruteForce(new int[]{1, 3, -1, -3, 5, 3, 6, 7}, 3));
            assertArrayEquals(new int[]{1}, problems.maxSlidingWindowBruteForce(new int[]{1}, 1));
            assertArrayEquals(new int[]{1, -1}, problems.maxSlidingWindowBruteForce(new int[]{1, -1}, 1));
            assertArrayEquals(new int[]{3, 3, 2, 5}, problems.maxSlidingWindowBruteForce(new int[]{1, 3, 1, 2, 0, 5}, 3));
            assertArrayEquals(new int[]{7, 7, 7, 7, 7}, problems.maxSlidingWindowBruteForce(new int[]{7, 6, 5, 4, 3, 2, 1}, 3)); // Decreasing
            assertArrayEquals(new int[]{3, 4, 5, 6, 7}, problems.maxSlidingWindowBruteForce(new int[]{1, 2, 3, 4, 5, 6, 7}, 3)); // Increasing
            assertArrayEquals(new int[]{5, 5, 5, 5, 5}, problems.maxSlidingWindowBruteForce(new int[]{5, 5, 5, 5, 5, 5, 5}, 3)); // All same
            assertArrayEquals(new int[]{11}, problems.maxSlidingWindowBruteForce(new int[]{9,11}, 2));
            assertArrayEquals(new int[]{11, 11}, problems.maxSlidingWindowBruteForce(new int[]{4, -2, 11, -4}, 2));
        }

        @Test
        @DisplayName("should handle edge cases for k (Brute Force)")
        void testMaxSlidingWindowEdgeKBruteForce() {
            assertArrayEquals(new int[0], problems.maxSlidingWindowBruteForce(new int[]{}, 0));
            assertArrayEquals(new int[0], problems.maxSlidingWindowBruteForce(null, 3));
            assertArrayEquals(new int[0], problems.maxSlidingWindowBruteForce(new int[]{1,2,3}, 0));

            // k larger than array length
            assertArrayEquals(new int[]{3}, problems.maxSlidingWindowBruteForce(new int[]{1, 2, 3}, 5));
            assertArrayEquals(new int[]{10}, problems.maxSlidingWindowBruteForce(new int[]{10}, 5));
            assertArrayEquals(new int[]{-1}, problems.maxSlidingWindowBruteForce(new int[]{-5, -1, -10}, 5));
        }
    }
}
```