```java
package com.example.stackqueue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Stack Problems")
class StackProblemsTest {

    private StackProblems stackProblems;

    @BeforeEach
    void setUp() {
        stackProblems = new StackProblems();
    }

    @Nested
    @DisplayName("Problem 1: CustomMinStack")
    class MinStackTest {

        @Test
        @DisplayName("Should support push, pop, top, getMin operations correctly")
        void testMinStackOperations() {
            CustomMinStack minStack = new CustomMinStack();

            // Test 1: Empty stack
            assertTrue(minStack.isEmpty());
            assertEquals(0, minStack.size());

            // Push 1: [ -2 ] min: -2
            minStack.push(-2);
            assertEquals(-2, minStack.top());
            assertEquals(-2, minStack.getMin());
            assertFalse(minStack.isEmpty());
            assertEquals(1, minStack.size());

            // Push 2: [ -2, 0 ] min: -2
            minStack.push(0);
            assertEquals(0, minStack.top());
            assertEquals(-2, minStack.getMin());
            assertEquals(2, minStack.size());

            // Push 3: [ -2, 0, -3 ] min: -3
            minStack.push(-3);
            assertEquals(-3, minStack.top());
            assertEquals(-3, minStack.getMin());
            assertEquals(3, minStack.size());

            // Pop 1: [ -2, 0 ] min: -2 (since -3 was popped)
            minStack.pop();
            assertEquals(0, minStack.top());
            assertEquals(-2, minStack.getMin());
            assertEquals(2, minStack.size());

            // Top: 0
            assertEquals(0, minStack.top());
            // GetMin: -2
            assertEquals(-2, minStack.getMin());

            // Push 4: [ -2, 0, -1 ] min: -2 (since -1 > -2)
            minStack.push(-1);
            assertEquals(-1, minStack.top());
            assertEquals(-2, minStack.getMin());
            assertEquals(3, minStack.size());

            // Pop 2: [ -2, 0 ] min: -2
            minStack.pop();
            assertEquals(0, minStack.top());
            assertEquals(-2, minStack.getMin());
            assertEquals(2, minStack.size());
        }

        @Test
        @DisplayName("Should handle duplicate minimums correctly")
        void testMinStackWithDuplicates() {
            CustomMinStack minStack = new CustomMinStack();
            minStack.push(2);
            minStack.push(0);
            minStack.push(3);
            minStack.push(0); // Duplicate minimum

            assertEquals(0, minStack.top());
            assertEquals(0, minStack.getMin());

            minStack.pop(); // Pop 0
            assertEquals(3, minStack.top());
            assertEquals(0, minStack.getMin()); // Min should still be 0

            minStack.pop(); // Pop 3
            assertEquals(0, minStack.top());
            assertEquals(0, minStack.getMin()); // Min should still be 0

            minStack.pop(); // Pop 0
            assertEquals(2, minStack.top());
            assertEquals(2, minStack.getMin()); // Min should now be 2
        }

        @Test
        @DisplayName("Should handle single element stack")
        void testMinStackSingleElement() {
            CustomMinStack minStack = new CustomMinStack();
            minStack.push(5);
            assertEquals(5, minStack.top());
            assertEquals(5, minStack.getMin());
            minStack.pop();
            assertTrue(minStack.isEmpty());
        }

        @Test
        @DisplayName("Should handle all elements in decreasing order")
        void testMinStackDecreasingOrder() {
            CustomMinStack minStack = new CustomMinStack();
            minStack.push(5);
            minStack.push(4);
            minStack.push(3);
            minStack.push(2);
            minStack.push(1);

            assertEquals(1, minStack.getMin());
            minStack.pop(); // Pop 1
            assertEquals(2, minStack.getMin());
            minStack.pop(); // Pop 2
            assertEquals(3, minStack.getMin());
        }

        @Test
        @DisplayName("Should handle all elements in increasing order")
        void testMinStackIncreasingOrder() {
            CustomMinStack minStack = new CustomMinStack();
            minStack.push(1);
            minStack.push(2);
            minStack.push(3);
            minStack.push(4);
            minStack.push(5);

            assertEquals(1, minStack.getMin());
            minStack.pop(); // Pop 5
            assertEquals(1, minStack.getMin());
            minStack.pop(); // Pop 4
            assertEquals(1, minStack.getMin());
            minStack.pop(); // Pop 3
            assertEquals(1, minStack.getMin());
            minStack.pop(); // Pop 2
            assertEquals(1, minStack.getMin());
            minStack.pop(); // Pop 1
            assertTrue(minStack.isEmpty());
        }
    }

    @Nested
    @DisplayName("Problem 2: Valid Parentheses")
    class ValidParenthesesTest {

        @ParameterizedTest(name = "String: {0} -> Expected: {1}")
        @CsvSource({
                "'()', true",
                "'()[]{}', true",
                "'{[]}', true",
                "'((()))', true",
                "'(([]{}))', true",
                "'([{}])', true",
                "'((()))', true",
                "'(()', false",
                "'({[', false",
                "')(', false",
                "'({)}', false",
                "'[', false",
                "']', false",
                "'(]', false",
                "'([)]', false",
                "'', true", // Empty string is valid
                "' ', false" // Space is not a bracket, so technically invalid
        })
        void testValidParentheses(String s, boolean expected) {
            assertEquals(expected, stackProblems.isValidParentheses(s));
        }

        @Test
        @DisplayName("Should handle long valid string")
        void testLongValidString() {
            String longValid = "((([]){()}[]{}))";
            assertTrue(stackProblems.isValidParentheses(longValid));
        }

        @Test
        @DisplayName("Should handle long invalid string")
        void testLongInvalidString() {
            String longInvalid = "((([]){()}[]{})))"; // Extra closing paren
            assertFalse(stackProblems.isValidParentheses(longInvalid));
        }
    }

    @Nested
    @DisplayName("Problem 3: Trapping Rain Water")
    class TrappingRainWaterTest {

        @ParameterizedTest(name = "Heights: {0} -> Expected: {1}")
        @CsvSource({
                "'0,1,0,2,1,0,1,3,2,1,2,1', 6",
                "'4,2,0,3,2,5', 9",
                "'0,1,0', 0", // Not enough walls
                "'2,0,2', 2",
                "'3,0,0,2,0,4', 10",
                "'4,2,3', 1",
                "'', 0", // Empty array
                "'1', 0", // Single element
                "'1,2', 0", // Two elements
                "'5,5,5,5,5', 0", // Flat ground
                "'5,4,3,2,1', 0", // Decreasing
                "'1,2,3,4,5', 0", // Increasing
                "'0,0,0,0,0', 0",
                "'6,4,2,0,3,2,5', 13", // Larger example
                "'9,8,7,6,5,4,3,2,1,0', 0", // Decreasing
                "'0,1,2,3,4,5,6,7,8,9', 0", // Increasing
                "'4,9,4,5,3,2', 2"
        })
        void testTrapRainWaterMonotonicStack(String heightStr, int expectedWater) {
            int[] height = parseToIntArray(heightStr);
            assertEquals(expectedWater, stackProblems.trapRainWaterMonotonicStack(height), "Monotonic Stack failed for: " + heightStr);
        }

        @ParameterizedTest(name = "Heights: {0} -> Expected: {1}")
        @CsvSource({
                "'0,1,0,2,1,0,1,3,2,1,2,1', 6",
                "'4,2,0,3,2,5', 9",
                "'0,1,0', 0", // Not enough walls
                "'2,0,2', 2",
                "'3,0,0,2,0,4', 10",
                "'4,2,3', 1",
                "'', 0", // Empty array
                "'1', 0", // Single element
                "'1,2', 0", // Two elements
                "'5,5,5,5,5', 0", // Flat ground
                "'5,4,3,2,1', 0", // Decreasing
                "'1,2,3,4,5', 0", // Increasing
                "'0,0,0,0,0', 0",
                "'6,4,2,0,3,2,5', 13", // Larger example
                "'9,8,7,6,5,4,3,2,1,0', 0", // Decreasing
                "'0,1,2,3,4,5,6,7,8,9', 0", // Increasing
                "'4,9,4,5,3,2', 2"
        })
        void testTrapRainWaterTwoPointers(String heightStr, int expectedWater) {
            int[] height = parseToIntArray(heightStr);
            assertEquals(expectedWater, stackProblems.trapRainWaterTwoPointers(height), "Two Pointers failed for: " + heightStr);
        }

        private int[] parseToIntArray(String s) {
            if (s == null || s.trim().isEmpty()) {
                return new int[0];
            }
            String[] parts = s.split(",");
            int[] arr = new int[parts.length];
            for (int i = 0; i < parts.length; i++) {
                arr[i] = Integer.parseInt(parts[i].trim());
            }
            return arr;
        }
    }
}
```