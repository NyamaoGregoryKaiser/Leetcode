```java
package com.stackqueue.problems;

import java.util.LinkedList;
import java.util.Queue;

/**
 * Problem 2: Implement Stack using Queues
 *
 * Implements a last-in-first-out (LIFO) stack using only one queue.
 * The implemented stack should support all the functions of a normal stack:
 * push, top, pop, and empty.
 *
 * Approach: Using a single Queue
 * The trick is to ensure that the most recently added element (which should be the "top" of the stack)
 * is always at the front of the queue, ready for pop or top operations.
 *
 * - push(x): Add x to the rear of the queue. Then, rotate the queue by moving all elements
 *   that were *before* x to the rear. This moves x to the front.
 * - pop(): Remove the element from the front of the queue.
 * - top(): Peek at the element at the front of the queue.
 *
 * Time Complexity:
 * - push: O(N), where N is the number of elements in the stack. This is because we add the new element
 *   and then rotate all N-1 previous elements.
 * - pop: O(1). We just perform a standard queue poll operation.
 * - top: O(1). We just perform a standard queue peek operation.
 * - empty: O(1).
 *
 * Space Complexity: O(N), where N is the total number of elements in the stack.
 */
public class MyStack {

    private Queue<Integer> q; // We use a LinkedList as it implements the Queue interface

    /**
     * Constructor to initialize the stack.
     * Initializes an empty LinkedList which acts as a queue.
     */
    public MyStack() {
        q = new LinkedList<>();
    }

    /**
     * Pushes element x onto the top of the stack.
     * To achieve LIFO behavior with a FIFO queue:
     * 1. Add the new element 'x' to the back of the queue.
     * 2. Rotate the queue: move all elements that were originally in the queue (N-1 elements)
     *    from the front to the back. This makes 'x' the new front element.
     *
     * @param x The element to push.
     */
    public void push(int x) {
        int size = q.size();
        q.offer(x); // Add new element to the back

        // Rotate the queue: move (size) elements from front to back.
        // This brings the newly added 'x' to the front.
        for (int i = 0; i < size; i++) {
            q.offer(q.poll()); // Dequeue from front and enqueue to back
        }
        // System.out.println("Pushed " + x + ". Queue: " + q);
    }

    /**
     * Removes the element on the top of the stack and returns it.
     * Since the 'push' operation ensures the top element is always at the front of the queue,
     * we simply poll it.
     *
     * @return The element at the top of the stack.
     * @throws java.util.NoSuchElementException if the stack is empty (via q.poll()).
     */
    public int pop() {
        // System.out.println("Before pop. Queue: " + q);
        Integer poppedValue = q.poll();
        if (poppedValue == null) {
            throw new java.util.NoSuchElementException("Stack is empty.");
        }
        // System.out.println("Popped " + poppedValue + ". Queue: " + q);
        return poppedValue;
    }

    /**
     * Returns the element on the top of the stack without removing it.
     * Since the 'push' operation ensures the top element is always at the front of the queue,
     * we simply peek it.
     *
     * @return The element at the top of the stack.
     * @throws java.util.NoSuchElementException if the stack is empty (via q.peek()).
     */
    public int top() {
        Integer topValue = q.peek();
        if (topValue == null) {
            throw new java.util.NoSuchElementException("Stack is empty.");
        }
        // System.out.println("Top: " + topValue + ". Queue: " + q);
        return topValue;
    }

    /**
     * Returns true if the stack is empty, false otherwise.
     *
     * @return True if empty, false otherwise.
     */
    public boolean empty() {
        return q.isEmpty();
    }
}

/**
 * Your MyStack object will be instantiated and called as such:
 * MyStack obj = new MyStack();
 * obj.push(x);
 * int param_2 = obj.pop();
 * int param_3 = obj.top();
 * boolean param_4 = obj.empty();
 */
```