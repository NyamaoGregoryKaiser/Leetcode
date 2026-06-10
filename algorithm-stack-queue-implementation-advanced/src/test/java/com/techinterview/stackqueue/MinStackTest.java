```java
package com.techinterview.stackqueue;

import com.techinterview.stackqueue.problems.MinStack;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Test class for {@link MinStack}.
 */
public class MinStackTest {

    private MinStack minStack;

    @BeforeEach
    void setUp() {
        minStack = new MinStack();
    }

    @Test
    @DisplayName("Should correctly handle basic push, pop, top, getMin operations")
    void testBasicOperations() {
        minStack.push(-2);
        minStack.push(0);
        minStack.push(-3);

        assertEquals(-3, minStack.getMin(), "Min after -3 should be -3");
        assertEquals(-3, minStack.top(), "Top after -3 should be -3");

        minStack.pop(); // Pop -3
        assertEquals(0, minStack.top(), "Top after popping -3 should be 0");
        assertEquals(-2, minStack.getMin(), "Min after popping -3 should be -2");

        minStack.pop(); // Pop 0
        assertEquals(-2, minStack.top(), "Top after popping 0 should be -2");
        assertEquals(-2, minStack.getMin(), "Min after popping 0 should be -2");
    }

    @Test
    @DisplayName("Should handle elements pushed in ascending order")
    void testAscendingOrder() {
        minStack.push(1);
        assertEquals(1, minStack.getMin());
        minStack.push(2);
        assertEquals(1, minStack.getMin());
        minStack.push(3);
        assertEquals(1, minStack.getMin());

        minStack.pop(); // Pop 3
        assertEquals(1, minStack.getMin());
        minStack.pop(); // Pop 2
        assertEquals(1, minStack.getMin());
        minStack.pop(); // Pop 1
        assertTrue(minStack.mainStack.isEmpty(), "Main stack should be empty");
        assertTrue(minStack.minStack.isEmpty(), "Min stack should be empty");
    }

    @Test
    @DisplayName("Should handle elements pushed in descending order")
    void testDescendingOrder() {
        minStack.push(3);
        assertEquals(3, minStack.getMin());
        minStack.push(2);
        assertEquals(2, minStack.getMin());
        minStack.push(1);
        assertEquals(1, minStack.getMin());

        minStack.pop(); // Pop 1
        assertEquals(2, minStack.getMin());
        minStack.pop(); // Pop 2
        assertEquals(3, minStack.getMin());
        minStack.pop(); // Pop 3
        assertTrue(minStack.mainStack.isEmpty());
        assertTrue(minStack.minStack.isEmpty());
    }

    @Test
    @DisplayName("Should handle duplicate minimum values")
    void testDuplicateMins() {
        minStack.push(5);
        minStack.push(2);
        minStack.push(2); // Duplicate min
        minStack.push(1);
        minStack.push(2); // Another non-min 2
        minStack.push(0); // New min

        assertEquals(0, minStack.getMin(), "Min should be 0");
        minStack.pop(); // Pop 0
        assertEquals(1, minStack.getMin(), "Min should be 1 after popping 0");
        minStack.pop(); // Pop 2
        assertEquals(1, minStack.getMin(), "Min should still be 1 after popping 2");
        minStack.pop(); // Pop 1
        assertEquals(2, minStack.getMin(), "Min should be 2 after popping 1");
        minStack.pop(); // Pop 2 (first of the duplicate 2s)
        assertEquals(2, minStack.getMin(), "Min should still be 2 after popping one of the 2s");
        minStack.pop(); // Pop 2 (second of the duplicate 2s)
        assertEquals(5, minStack.getMin(), "Min should be 5 after popping all 2s");
    }

    @Test
    @DisplayName("Should throw IllegalStateException when popping from an empty stack")
    void testPopFromEmptyStack() {
        assertThrows(IllegalStateException.class, minStack::pop,
                "Popping from empty stack should throw IllegalStateException");
        minStack.push(1);
        minStack.pop();
        assertThrows(IllegalStateException.class, minStack::pop,
                "Popping from stack with one element then empty should throw IllegalStateException");
    }

    @Test
    @DisplayName("Should throw IllegalStateException when getting top from an empty stack")
    void testTopFromEmptyStack() {
        assertThrows(IllegalStateException.class, minStack::top,
                "Getting top from empty stack should throw IllegalStateException");
        minStack.push(1);
        minStack.pop();
        assertThrows(IllegalStateException.class, minStack::top,
                "Getting top from stack with one element then empty should throw IllegalStateException");
    }

    @Test
    @DisplayName("Should throw IllegalStateException when getting min from an empty stack")
    void testGetMinFromEmptyStack() {
        assertThrows(IllegalStateException.class, minStack::getMin,
                "Getting min from empty stack should throw IllegalStateException");
        minStack.push(1);
        minStack.pop();
        assertThrows(IllegalStateException.class, minStack::getMin,
                "Getting min from stack with one element then empty should throw IllegalStateException");
    }

    @Test
    @DisplayName("Should handle a mix of positive and negative numbers")
    void testMixedNumbers() {
        minStack.push(10);
        minStack.push(-5);
        minStack.push(20);
        minStack.push(-10);
        assertEquals(-10, minStack.getMin());
        minStack.push(5);
        assertEquals(-10, minStack.getMin());
        minStack.pop(); // 5
        assertEquals(-10, minStack.getMin());
        minStack.pop(); // -10
        assertEquals(-5, minStack.getMin());
        minStack.pop(); // 20
        assertEquals(-5, minStack.getMin());
        minStack.pop(); // -5
        assertEquals(10, minStack.getMin());
        minStack.pop(); // 10
        assertThrows(IllegalStateException.class, minStack::getMin);
    }
}
```