```java
package com.example.stackqueue;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Queue Problems")
class QueueProblemsTest {

    @Nested
    @DisplayName("Problem 4: CustomQueueViaStacks")
    class QueueViaStacksTest {

        @Test
        @DisplayName("Should support push, pop, peek, empty operations for Integers")
        void testIntegerQueueOperations() {
            CustomQueueViaStacks<Integer> myQueue = new CustomQueueViaStacks<>();

            // Initial state
            assertTrue(myQueue.empty());
            assertEquals(0, myQueue.size());

            // Push elements
            myQueue.push(1); // Queue: [1]
            assertFalse(myQueue.empty());
            assertEquals(1, myQueue.size());

            myQueue.push(2); // Queue: [1, 2]
            assertEquals(2, myQueue.size());

            myQueue.push(3); // Queue: [1, 2, 3]
            assertEquals(3, myQueue.size());

            // Peek front element
            assertEquals(1, myQueue.peek()); // Peek 1
            assertEquals(3, myQueue.size()); // Size should not change

            // Pop elements
            assertEquals(1, myQueue.pop()); // Pop 1, Queue: [2, 3]
            assertEquals(2, myQueue.size());

            assertEquals(2, myQueue.peek()); // Peek 2
            assertEquals(2, myQueue.size());

            assertEquals(2, myQueue.pop()); // Pop 2, Queue: [3]
            assertEquals(1, myQueue.size());

            assertEquals(3, myQueue.pop()); // Pop 3, Queue: []
            assertEquals(0, myQueue.size());
            assertTrue(myQueue.empty());
        }

        @Test
        @DisplayName("Should handle multiple transfers between stacks")
        void testMultipleTransfers() {
            CustomQueueViaStacks<Character> myQueue = new CustomQueueViaStacks<>();

            myQueue.push('a'); // input: [a]
            myQueue.push('b'); // input: [a, b]
            assertEquals('a', myQueue.peek()); // transfer, output: [a, b]
            assertEquals('a', myQueue.pop()); // output: [b]

            myQueue.push('c'); // input: [c], output: [b]
            myQueue.push('d'); // input: [c, d], output: [b]

            assertEquals('b', myQueue.peek()); // output: [b], no transfer needed
            assertEquals('b', myQueue.pop()); // output: []

            assertEquals('c', myQueue.peek()); // transfer, output: [c, d]
            assertEquals('c', myQueue.pop()); // output: [d]

            assertEquals('d', myQueue.pop()); // output: []
            assertTrue(myQueue.empty());
        }

        @Test
        @DisplayName("Should handle strings correctly")
        void testStringQueueOperations() {
            CustomQueueViaStacks<String> myQueue = new CustomQueueViaStacks<>();
            myQueue.push("hello");
            myQueue.push("world");

            assertEquals("hello", myQueue.peek());
            assertEquals("hello", myQueue.pop());
            assertEquals("world", myQueue.peek());
            myQueue.push("java");
            assertEquals("world", myQueue.pop());
            assertEquals("java", myQueue.pop());
            assertTrue(myQueue.empty());
        }

        @Test
        @DisplayName("Should behave correctly when popping all elements")
        void testPopAllElements() {
            CustomQueueViaStacks<Integer> myQueue = new CustomQueueViaStacks<>();
            myQueue.push(10);
            myQueue.push(20);
            myQueue.push(30);

            assertFalse(myQueue.empty());
            assertEquals(3, myQueue.size());

            assertEquals(10, myQueue.pop());
            assertEquals(20, myQueue.pop());
            assertEquals(30, myQueue.pop());

            assertTrue(myQueue.empty());
            assertEquals(0, myQueue.size());
        }

        @Test
        @DisplayName("Should throw exception when pop/peek on empty queue (default Stack behavior)")
        void testPopPeekOnEmpty() {
            CustomQueueViaStacks<Integer> myQueue = new CustomQueueViaStacks<>();
            assertTrue(myQueue.empty());

            assertThrows(java.util.EmptyStackException.class, myQueue::pop);
            assertThrows(java.util.EmptyStackException.class, myQueue::peek);

            myQueue.push(1);
            assertEquals(1, myQueue.pop());
            assertTrue(myQueue.empty());

            assertThrows(java.util.EmptyStackException.class, myQueue::pop);
        }
    }
}
```