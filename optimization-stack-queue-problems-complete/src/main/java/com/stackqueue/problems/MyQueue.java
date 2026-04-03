```java
package com.stackqueue.problems;

import java.util.Stack;

/**
 * Problem 1: Implement Queue using Stacks
 *
 * Implements a first-in-first-out (FIFO) queue using only two stacks.
 * The implemented queue should support all the functions of a normal queue:
 * push, peek, pop, and empty.
 *
 * Approach:
 * We use two stacks: 'inStack' and 'outStack'.
 * - 'inStack' is used for pushing new elements.
 * - 'outStack' is used for popping and peeking elements.
 *
 * When an element needs to be popped or peeked, if 'outStack' is empty,
 * all elements are transferred from 'inStack' to 'outStack'. This effectively
 * reverses the order of elements, making the oldest element in 'inStack'
 * (which is at its bottom) appear at the top of 'outStack'.
 *
 * Time Complexity:
 * - push: O(1) - Always pushes to inStack.
 * - pop: Amortized O(1) - In the worst case, an O(N) transfer happens, but each element is moved at most twice
 *        (from inStack to outStack, and then popped from outStack) across its lifetime.
 *        Thus, N operations take O(N) total time, leading to O(1) amortized time per operation.
 * - peek: Amortized O(1) - Similar to pop.
 * - empty: O(1)
 *
 * Space Complexity: O(N), where N is the total number of elements in the queue.
 * In the worst case, all elements might reside in inStack or outStack, or split between them.
 */
public class MyQueue {

    private Stack<Integer> inStack;    // Stack for incoming elements (push)
    private Stack<Integer> outStack;   // Stack for outgoing elements (pop/peek)

    /**
     * Constructor to initialize the queue.
     * Initializes two empty stacks.
     */
    public MyQueue() {
        inStack = new Stack<>();
        outStack = new Stack<>();
    }

    /**
     * Pushes element x to the back of the queue.
     * This operation always adds to the inStack.
     *
     * @param x The element to push.
     */
    public void push(int x) {
        inStack.push(x);
        // System.out.println("Pushed " + x + ". inStack: " + inStack + ", outStack: " + outStack);
    }

    /**
     * Removes the element from the front of the queue and returns it.
     * If outStack is empty, all elements are transferred from inStack to outStack first.
     *
     * @return The element at the front of the queue.
     * @throws java.util.EmptyStackException if the queue is empty.
     */
    public int pop() {
        // Ensure outStack has elements to pop.
        // If outStack is empty, transfer all elements from inStack to outStack.
        transferElementsIfOutStackEmpty();
        // System.out.println("Before pop. inStack: " + inStack + ", outStack: " + outStack);
        int poppedValue = outStack.pop();
        // System.out.println("Popped " + poppedValue + ". inStack: " + inStack + ", outStack: " + outStack);
        return poppedValue;
    }

    /**
     * Returns the element at the front of the queue without removing it.
     * If outStack is empty, all elements are transferred from inStack to outStack first.
     *
     * @return The element at the front of the queue.
     * @throws java.util.EmptyStackException if the queue is empty.
     */
    public int peek() {
        // Ensure outStack has elements to peek.
        // If outStack is empty, transfer all elements from inStack to outStack.
        transferElementsIfOutStackEmpty();
        // System.out.println("Peeked " + outStack.peek() + ". inStack: " + inStack + ", outStack: " + outStack);
        return outStack.peek();
    }

    /**
     * Returns true if the queue is empty, false otherwise.
     * The queue is empty if both inStack and outStack are empty.
     *
     * @return True if empty, false otherwise.
     */
    public boolean empty() {
        return inStack.empty() && outStack.empty();
    }

    /**
     * Helper method to transfer elements from inStack to outStack.
     * This operation occurs only when outStack is empty, ensuring that
     * elements are popped in FIFO order.
     */
    private void transferElementsIfOutStackEmpty() {
        if (outStack.empty()) {
            // While inStack is not empty, pop elements and push them onto outStack.
            // This reverses their order.
            while (!inStack.empty()) {
                outStack.push(inStack.pop());
            }
        }
    }
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * MyQueue obj = new MyQueue();
 * obj.push(x);
 * int param_2 = obj.pop();
 * int param_3 = obj.peek();
 * boolean param_4 = obj.empty();
 */
```