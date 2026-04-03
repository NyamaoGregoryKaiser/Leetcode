```java
package com.stackqueue;

import com.stackqueue.problems.MyStack;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("MyStack (Implement Stack using Queues) Tests")
class MyStackTest {

    private MyStack myStack;

    @BeforeEach
    void setUp() {
        myStack = new MyStack();
    }

    @Test
    @DisplayName("should push elements and then peek/pop in LIFO order")
    void testPushAndPopBasic() {
        myStack.push(1);
        myStack.push(2);
        myStack.push(3);

        assertFalse(myStack.empty());
        assertEquals(3, myStack.top(), "Top should return 3 (last element pushed)");
        assertEquals(3, myStack.pop(), "Pop should return 3");

        assertFalse(myStack.empty());
        assertEquals(2, myStack.top(), "Top should return 2");
        assertEquals(2, myStack.pop(), "Pop should return 2");

        assertFalse(myStack.empty());
        assertEquals(1, myStack.top(), "Top should return 1");
        assertEquals(1, myStack.pop(), "Pop should return 1");

        assertTrue(myStack.empty(), "Stack should be empty after popping all elements");
    }

    @Test
    @DisplayName("should handle interleaved push and pop operations correctly")
    void testInterleavedOperations() {
        myStack.push(10);
        assertEquals(10, myStack.top());
        myStack.push(20);
        assertEquals(20, myStack.pop()); // Pop 20
        myStack.push(30);
        myStack.push(40);
        assertEquals(40, myStack.top());
        assertEquals(40, myStack.pop()); // Pop 40
        assertEquals(30, myStack.pop()); // Pop 30
        myStack.push(50);
        assertEquals(50, myStack.top());
        assertEquals(50, myStack.pop()); // Pop 50
        assertEquals(10, myStack.pop()); // Pop 10
        assertTrue(myStack.empty());
    }

    @Test
    @DisplayName("should be empty initially")
    void testEmptyInitially() {
        assertTrue(myStack.empty(), "Stack should be empty initially");
    }

    @Test
    @DisplayName("should return true for empty after popping last element")
    void testEmptyAfterAllPopped() {
        myStack.push(1);
        myStack.pop();
        assertTrue(myStack.empty(), "Stack should be empty after popping the only element");
    }

    @Test
    @DisplayName("should throw NoSuchElementException when pop on empty stack")
    void testPopOnEmptyStackThrowsException() {
        assertTrue(myStack.empty());
        assertThrows(NoSuchElementException.class, () -> myStack.pop(),
                "Pop on empty stack should throw NoSuchElementException");
    }

    @Test
    @DisplayName("should throw NoSuchElementException when top on empty stack")
    void testTopOnEmptyStackThrowsException() {
        assertTrue(myStack.empty());
        assertThrows(NoSuchElementException.class, () -> myStack.top(),
                "Top on empty stack should throw NoSuchElementException");
    }

    @Test
    @DisplayName("should handle large number of elements")
    void testLargeNumberOfElements() {
        int numElements = 1000; // Reduced for MyStack due to O(N) push complexity
        for (int i = 0; i < numElements; i++) {
            myStack.push(i);
        }

        assertFalse(myStack.empty());
        assertEquals(numElements - 1, myStack.top());

        for (int i = numElements - 1; i >= 0; i--) {
            assertEquals(i, myStack.pop());
        }
        assertTrue(myStack.empty());
    }

    @Test
    @DisplayName("should handle multiple pushes then multiple pops")
    void testMultiplePushesThenPops() {
        myStack.push(1);
        myStack.push(2);
        myStack.push(3);
        assertEquals(3, myStack.pop());
        assertEquals(2, myStack.pop());
        myStack.push(4);
        assertEquals(4, myStack.pop());
        assertEquals(1, myStack.pop());
        assertTrue(myStack.empty());
    }
}
```