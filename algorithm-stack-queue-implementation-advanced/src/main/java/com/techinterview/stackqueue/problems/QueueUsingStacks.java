```java
package com.techinterview.stackqueue.problems;

import java.util.Stack;

/**
 * Problem: Implement Queue using Stacks
 * Implement a first-in-first-out (FIFO) queue using only two stacks.
 * The implemented queue should support all the functions of a normal queue (push, peek, pop, empty).
 *
 * Implement the MyQueue class:
 * - MyQueue() Initializes the queue object.
 * - void push(int x) Pushes element x to the back of the queue.
 * - int pop() Removes the element from the front of the queue and returns it.
 * - int peek() Returns the element at the front of the queue.
 * - boolean empty() Returns true if the queue is empty, false otherwise.
 *
 * Notes:
 * - You must use only standard operations of a stack, which means only push to top, peek/pop from top, size, and is empty operations are valid.
 * - Depending on your language, a deque (double-ended queue) may be used to implement a stack.
 */
public class QueueUsingStacks {

    // stack1 (s1): Used for pushing new elements. Behaves like the "input" stack.
    private Stack<Integer> s1;
    // stack2 (s2): Used for popping/peeking elements. Behaves like the "output" stack.
    private Stack<Integer> s2;

    /**
     * Constructor: Initializes the queue object.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    public QueueUsingStacks() {
        s1 = new Stack<>();
        s2 = new Stack<>();
    }

    /**
     * Push: Pushes element x to the back of the queue.
     * New elements are always pushed onto s1.
     * Time Complexity: O(1) amortized. A single push is O(1).
     * Space Complexity: O(N) where N is the total number of elements currently in the queue.
     */
    public void push(int x) {
        s1.push(x);
    }

    /**
     * Pop: Removes the element from the front of the queue and returns it.
     * To achieve FIFO behavior, the oldest element needs to be at the top.
     * We achieve this by transferring elements from s1 to s2.
     * If s2 is empty, all elements from s1 are moved to s2. This reverses their order,
     * making the oldest element from s1 (which was pushed first) the top of s2.
     * If s2 is not empty, it means it already contains elements that were previously
     * transferred and are older than any new elements in s1. So, we just pop from s2.
     *
     * Time Complexity: Amortized O(1).
     *   In the worst case (s2 is empty and s1 contains N elements), N push/pop operations occur.
     *   However, each element is pushed onto s1 once and then popped from s1 once,
     *   and pushed onto s2 once and then popped from s2 once.
     *   Total 4 operations per element over its lifetime, distributed across multiple pops.
     *   Thus, average time complexity per operation is O(1).
     * Space Complexity: O(1) (excluding stack storage, which is O(N))
     */
    public int pop() {
        // Ensure that s2 has elements to pop. If not, transfer from s1.
        shiftElements();
        if (s2.isEmpty()) {
            throw new IllegalStateException("Queue is empty. Cannot pop.");
        }
        return s2.pop();
    }

    /**
     * Peek: Returns the element at the front of the queue.
     * Similar logic to pop, but we only peek the top of s2.
     * Time Complexity: Amortized O(1). (Same reasoning as pop)
     * Space Complexity: O(1)
     */
    public int peek() {
        // Ensure that s2 has elements to peek. If not, transfer from s1.
        shiftElements();
        if (s2.isEmpty()) {
            throw new IllegalStateException("Queue is empty. Cannot peek.");
        }
        return s2.peek();
    }

    /**
     * Empty: Returns true if the queue is empty, false otherwise.
     * The queue is empty if both s1 and s2 are empty.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    public boolean empty() {
        return s1.isEmpty() && s2.isEmpty();
    }

    /**
     * Helper method to transfer elements from s1 to s2.
     * This method is called by pop() and peek() whenever s2 is empty.
     * It ensures that s2 is populated with elements in the correct order for FIFO operations.
     */
    private void shiftElements() {
        if (s2.isEmpty()) {
            while (!s1.isEmpty()) {
                s2.push(s1.pop());
            }
        }
    }

    /**
     * Alternative Approach 1: Always transfer on Push (less efficient)
     *
     * This approach maintains the invariant that s2 always has elements in queue order.
     * On every push, all elements from s2 are moved to s1, then the new element is pushed to s1,
     * then all elements are moved back from s1 to s2.
     *
     * public class MyQueueAlwaysTransferOnPush {
     *     private Stack<Integer> s1; // Temporary stack
     *     private Stack<Integer> s2; // Main queue-like stack
     *
     *     public MyQueueAlwaysTransferOnPush() {
     *         s1 = new Stack<>();
     *         s2 = new Stack<>();
     *     }
     *
     *     public void push(int x) {
     *         // Move all elements from s2 to s1
     *         while (!s2.isEmpty()) {
     *             s1.push(s2.pop());
     *         }
     *         // Push the new element to s1
     *         s1.push(x);
     *         // Move all elements back from s1 to s2
     *         while (!s1.isEmpty()) {
     *             s2.push(s1.pop());
     *         }
     *     }
     *
     *     public int pop() {
     *         if (s2.isEmpty()) {
     *             throw new IllegalStateException("Queue is empty");
     *         }
     *         return s2.pop();
     *     }
     *
     *     public int peek() {
     *         if (s2.isEmpty()) {
     *             throw new IllegalStateException("Queue is empty");
     *         }
     *         return s2.peek();
     *     }
     *
     *     public boolean empty() {
     *         return s2.isEmpty();
     *     }
     * }
     *
     * Analysis of Alternative 1:
     * - Push: O(N) operations in worst case (N elements moved twice).
     * - Pop: O(1)
     * - Peek: O(1)
     * This approach is less efficient for push-heavy operations compared to the two-stack approach where transfers only happen on demand.
     * The provided solution (amortized O(1) for all ops) is generally preferred.
     */
}
```