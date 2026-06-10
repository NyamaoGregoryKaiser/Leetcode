```java
package com.techinterview.stackqueue;

import com.techinterview.stackqueue.problems.QueueUsingStacks;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Test class for {@link QueueUsingStacks}.
 */
public class QueueUsingStacksTest {

    private QueueUsingStacks myQueue;

    @BeforeEach
    void setUp() {
        myQueue = new QueueUsingStacks();
    }

    @Test
    @DisplayName("Should correctly implement basic queue operations")
    void testBasicOperations() {
        assertTrue(myQueue.empty(), "Queue should be empty initially");

        myQueue.push(1);
        assertFalse(myQueue.empty(), "Queue should not be empty after push");
        assertEquals(1, myQueue.peek(), "Peek should return 1");

        myQueue.push(2);
        assertEquals(1, myQueue.peek(), "Peek should still return 1");

        assertEquals(1, myQueue.pop(), "Pop should return 1");
        assertFalse(myQueue.empty(), "Queue should not be empty after first pop");
        assertEquals(2, myQueue.peek(), "Peek should return 2");

        myQueue.push(3);
        assertEquals(2, myQueue.peek(), "Peek should return 2");

        assertEquals(2, myQueue.pop(), "Pop should return 2");
        assertEquals(3, myQueue.peek(), "Peek should return 3");

        assertEquals(3, myQueue.pop(), "Pop should return 3");
        assertTrue(myQueue.empty(), "Queue should be empty after all pops");
    }

    @Test
    @DisplayName("Should handle operations with only one element")
    void testSingleElementOperations() {
        myQueue.push(10);
        assertFalse(myQueue.empty());
        assertEquals(10, myQueue.peek());
        assertEquals(10, myQueue.pop());
        assertTrue(myQueue.empty());
    }

    @Test
    @DisplayName("Should handle pushing after popping makes queue empty")
    void testPushAfterEmpty() {
        myQueue.push(1);
        myQueue.pop(); // Queue is empty
        myQueue.push(2);
        assertEquals(2, myQueue.peek());
        myQueue.push(3);
        assertEquals(2, myQueue.pop());
        assertEquals(3, myQueue.peek());
        assertEquals(3, myQueue.pop());
        assertTrue(myQueue.empty());
    }

    @Test
    @DisplayName("Should handle multiple push operations followed by multiple pop operations")
    void testBatchOperations() {
        for (int i = 0; i < 10; i++) {
            myQueue.push(i);
        }
        assertFalse(myQueue.empty());
        assertEquals(0, myQueue.peek());

        for (int i = 0; i < 5; i++) {
            assertEquals(i, myQueue.pop());
        }
        assertFalse(myQueue.empty());
        assertEquals(5, myQueue.peek());

        for (int i = 10; i < 15; i++) {
            myQueue.push(i);
        }
        assertEquals(5, myQueue.peek()); // 5, 6, 7, 8, 9, 10, 11, 12, 13, 14

        for (int i = 5; i < 15; i++) {
            assertEquals(i, myQueue.pop());
        }
        assertTrue(myQueue.empty());
    }

    @Test
    @DisplayName("Should throw IllegalStateException when popping from an empty queue")
    void testPopFromEmptyQueue() {
        assertTrue(myQueue.empty());
        assertThrows(IllegalStateException.class, myQueue::pop,
                "Popping from empty queue should throw IllegalStateException");
        myQueue.push(1);
        myQueue.pop();
        assertThrows(IllegalStateException.class, myQueue::pop,
                "Popping from queue with one element then empty should throw IllegalStateException");
    }

    @Test
    @DisplayName("Should throw IllegalStateException when peeking into an empty queue")
    void testPeekFromEmptyQueue() {
        assertTrue(myQueue.empty());
        assertThrows(IllegalStateException.class, myQueue::peek,
                "Peeking into empty queue should throw IllegalStateException");
        myQueue.push(1);
        myQueue.pop();
        assertThrows(IllegalStateException.class, myQueue::peek,
                "Peeking into queue with one element then empty should throw IllegalStateException");
    }
}
```