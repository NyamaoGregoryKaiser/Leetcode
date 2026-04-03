```java
package com.stackqueue;

import com.stackqueue.problems.MyQueue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.EmptyStackException;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("MyQueue (Implement Queue using Stacks) Tests")
class MyQueueTest {

    private MyQueue myQueue;

    @BeforeEach
    void setUp() {
        myQueue = new MyQueue();
    }

    @Test
    @DisplayName("should push elements and then peek/pop in FIFO order")
    void testPushAndPopBasic() {
        myQueue.push(1);
        myQueue.push(2);
        myQueue.push(3);

        assertFalse(myQueue.empty());
        assertEquals(1, myQueue.peek(), "Peek should return 1 (first element pushed)");
        assertEquals(1, myQueue.pop(), "Pop should return 1");

        assertFalse(myQueue.empty());
        assertEquals(2, myQueue.peek(), "Peek should return 2");
        assertEquals(2, myQueue.pop(), "Pop should return 2");

        assertFalse(myQueue.empty());
        assertEquals(3, myQueue.peek(), "Peek should return 3");
        assertEquals(3, myQueue.pop(), "Pop should return 3");

        assertTrue(myQueue.empty(), "Queue should be empty after popping all elements");
    }

    @Test
    @DisplayName("should handle interleaved push and pop operations correctly")
    void testInterleavedOperations() {
        myQueue.push(10);
        assertEquals(10, myQueue.peek());
        myQueue.push(20);
        assertEquals(10, myQueue.pop()); // Pop 10
        myQueue.push(30);
        myQueue.push(40);
        assertEquals(20, myQueue.peek());
        assertEquals(20, myQueue.pop()); // Pop 20
        assertEquals(30, myQueue.pop()); // Pop 30
        myQueue.push(50);
        assertEquals(40, myQueue.peek());
        assertEquals(40, myQueue.pop()); // Pop 40
        assertEquals(50, myQueue.pop()); // Pop 50
        assertTrue(myQueue.empty());
    }

    @Test
    @DisplayName("should be empty initially")
    void testEmptyInitially() {
        assertTrue(myQueue.empty(), "Queue should be empty initially");
    }

    @Test
    @DisplayName("should return true for empty after popping last element")
    void testEmptyAfterAllPopped() {
        myQueue.push(1);
        myQueue.pop();
        assertTrue(myQueue.empty(), "Queue should be empty after popping the only element");
    }

    @Test
    @DisplayName("should throw EmptyStackException when pop on empty queue")
    void testPopOnEmptyQueueThrowsException() {
        assertTrue(myQueue.empty());
        assertThrows(EmptyStackException.class, () -> myQueue.pop(),
                "Pop on empty queue should throw EmptyStackException");
    }

    @Test
    @DisplayName("should throw EmptyStackException when peek on empty queue")
    void testPeekOnEmptyQueueThrowsException() {
        assertTrue(myQueue.empty());
        assertThrows(EmptyStackException.class, () -> myQueue.peek(),
                "Peek on empty queue should throw EmptyStackException");
    }

    @Test
    @DisplayName("should handle large number of elements")
    void testLargeNumberOfElements() {
        int numElements = 10000;
        for (int i = 0; i < numElements; i++) {
            myQueue.push(i);
        }

        assertFalse(myQueue.empty());
        assertEquals(0, myQueue.peek());

        for (int i = 0; i < numElements; i++) {
            assertEquals(i, myQueue.pop());
        }
        assertTrue(myQueue.empty());
    }

    @Test
    @DisplayName("should handle sequence of push followed by all pops")
    void testPushAllThenPopAll() {
        myQueue.push(1);
        myQueue.push(2);
        myQueue.push(3);
        myQueue.push(4);
        myQueue.push(5);

        assertEquals(1, myQueue.pop());
        assertEquals(2, myQueue.pop());
        assertEquals(3, myQueue.pop());
        assertEquals(4, myQueue.pop());
        assertEquals(5, myQueue.pop());
        assertTrue(myQueue.empty());
    }

    @Test
    @DisplayName("should handle sequence of pop followed by push (and potential re-transfer)")
    void testPopThenPush() {
        myQueue.push(1);
        assertEquals(1, myQueue.pop());
        assertTrue(myQueue.empty());

        myQueue.push(2);
        myQueue.push(3);
        assertEquals(2, myQueue.pop()); // This triggers transfer
        myQueue.push(4);
        assertEquals(3, myQueue.peek());
        assertEquals(3, myQueue.pop());
        assertEquals(4, myQueue.pop()); // This triggers transfer if outStack is empty (it is)
        assertTrue(myQueue.empty());
    }
}
```