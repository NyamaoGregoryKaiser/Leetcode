```java
package com.example.stackqueue;

import java.util.Stack;

/**
 * Problem 4: Implement Queue using Stacks
 * Implement a first-in-first-out (FIFO) queue using only two stacks.
 * The implemented queue should support all the functions of a normal queue (push, peek, pop, empty).
 *
 * You must use only standard operations of a stack -- meaning only push to top, peek/pop from top, size, and is empty operations are valid.
 *
 * Approaches:
 * 1. Two Stacks (Optimal):
 *    - Use two stacks: `inputStack` and `outputStack`.
 *    - `inputStack` is used for `push` operations. Elements are pushed directly here.
 *    - `outputStack` is used for `pop` and `peek` operations.
 *    - When `pop` or `peek` is called:
 *      - If `outputStack` is empty, transfer all elements from `inputStack` to `outputStack`. This reverses the order,
 *        making the oldest element in `inputStack` (which is at the bottom) become the top of `outputStack`.
 *      - Then, perform `pop` or `peek` on `outputStack`.
 *    - If `outputStack` is not empty, simply perform `pop` or `peek` on `outputStack`.
 *
 *    - Time Complexity:
 *      - `push`: O(1) amortized. A single push is O(1).
 *      - `pop`/`peek`: O(1) amortized. When elements are transferred from `inputStack` to `outputStack`, it takes O(N) time.
 *        However, each element is pushed onto `inputStack` once and popped once, then pushed onto `outputStack` once and popped once.
 *        So, each element incurs a constant number of operations (4 stack operations total over its lifetime).
 *        Thus, N operations take O(N) time, leading to O(1) amortized time per operation.
 *      - `empty`: O(1).
 *    - Space Complexity: O(N) as all elements are stored across the two stacks.
 *
 * Chosen Approach for implementation: Two Stacks (Approach 1). This is the standard and most efficient way.
 */
public class CustomQueueViaStacks<T> {

    // Stack for incoming elements (push operation)
    private Stack<T> inputStack;
    // Stack for outgoing elements (pop and peek operations)
    private Stack<T> outputStack;

    /**
     * Constructor to initialize the QueueViaStacks object.
     * Initializes both input and output stacks.
     */
    public CustomQueueViaStacks() {
        inputStack = new Stack<>();
        outputStack = new Stack<>();
    }

    /**
     * Pushes element `x` to the back of the queue.
     *
     * Time Complexity: O(1)
     *   - Stack push operation is O(1).
     * Space Complexity: O(1) amortized for each element.
     *
     * @param x The element to be pushed.
     */
    public void push(T x) {
        inputStack.push(x);
    }

    /**
     * Removes the element from the front of the queue and returns it.
     * This method assumes the queue is not empty when called.
     *
     * Time Complexity: O(1) amortized.
     *   - In the worst case (when outputStack is empty), transferring N elements takes O(N) time.
     *   - However, each element is transferred only once from inputStack to outputStack.
     *   - Over N operations, the total cost for transfers is O(N), making the amortized cost O(1) per pop.
     * Space Complexity: O(1)
     *
     * @return The element at the front of the queue.
     */
    public T pop() {
        // Ensure outputStack has elements ready to be popped.
        // If outputStack is empty, transfer elements from inputStack.
        transferElementsIfNeeded();
        // Now outputStack must not be empty (unless the queue was originally empty).
        return outputStack.pop();
    }

    /**
     * Returns the element at the front of the queue without removing it.
     * This method assumes the queue is not empty when called.
     *
     * Time Complexity: O(1) amortized (same reasoning as pop).
     * Space Complexity: O(1)
     *
     * @return The element at the front of the queue.
     */
    public T peek() {
        // Ensure outputStack has elements ready to be peeked.
        transferElementsIfNeeded();
        // Now outputStack must not be empty (unless the queue was originally empty).
        return outputStack.peek();
    }

    /**
     * Helper method to transfer elements from inputStack to outputStack.
     * This operation is performed only when outputStack is empty and a pop/peek is requested.
     */
    private void transferElementsIfNeeded() {
        if (outputStack.isEmpty()) {
            // While there are elements in inputStack, pop them and push them onto outputStack.
            // This reverses their order, effectively putting the oldest element (FIFO) at the top of outputStack.
            while (!inputStack.isEmpty()) {
                outputStack.push(inputStack.pop());
            }
        }
    }

    /**
     * Checks whether the queue is empty.
     *
     * Time Complexity: O(1)
     *   - Checking emptiness of two stacks is O(1).
     * Space Complexity: O(1)
     *
     * @return true if the queue is empty, false otherwise.
     */
    public boolean empty() {
        return inputStack.isEmpty() && outputStack.isEmpty();
    }

    /**
     * Returns the total number of elements in the queue.
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     *
     * @return The number of elements in the queue.
     */
    public int size() {
        return inputStack.size() + outputStack.size();
    }
}
```