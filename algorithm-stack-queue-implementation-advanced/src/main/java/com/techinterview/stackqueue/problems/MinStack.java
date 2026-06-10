```java
package com.techinterview.stackqueue.problems;

import java.util.Stack;

/**
 * Problem: Min Stack
 * Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
 *
 * Implement the MinStack class:
 * - MinStack() initializes the stack object.
 * - void push(int val) pushes the element val onto the stack.
 * - void pop() removes the element on the top of the stack.
 * - int top() gets the top element of the stack.
 * - int getMin() retrieves the minimum element in the stack.
 *
 * All functions must run in O(1) time complexity.
 */
public class MinStack {

    // Main stack to store all elements
    private Stack<Integer> mainStack;
    // Auxiliary stack to store minimums encountered so far
    private Stack<Integer> minStack;

    /**
     * Constructor to initialize the MinStack.
     * Initializes both the main stack and the auxiliary min stack.
     * Time Complexity: O(1)
     * Space Complexity: O(1) (for initial object creation)
     */
    public MinStack() {
        mainStack = new Stack<>();
        minStack = new Stack<>();
    }

    /**
     * Pushes an element 'val' onto the stack.
     * When pushing, we always push 'val' onto the mainStack.
     * For the minStack, we push 'val' only if it's less than or equal to the current minimum.
     * If minStack is empty, 'val' is the first minimum.
     * This ensures the top of minStack always holds the current minimum.
     * Time Complexity: O(1) - Stack operations (push) are constant time.
     * Space Complexity: O(N) in worst case, where N is the number of elements.
     *                  If elements are pushed in decreasing order, minStack will store N elements.
     *                  In best case (increasing order), minStack stores O(1) elements.
     */
    public void push(int val) {
        mainStack.push(val);
        // Push to minStack only if it's less than or equal to the current minimum.
        // The equality check is crucial: if we push a value equal to the current minimum,
        // it means that when this value is popped, the true minimum (the previous one)
        // will still be available at the top of minStack.
        if (minStack.isEmpty() || val <= minStack.peek()) {
            minStack.push(val);
        }
    }

    /**
     * Removes the element on the top of the stack.
     * If the element being popped from mainStack is the current minimum (i.e., it's equal
     * to the top of minStack), then we must also pop it from minStack to maintain correctness.
     * Time Complexity: O(1) - Stack operations (pop) are constant time.
     * Space Complexity: O(1)
     * Throws an exception if the stack is empty (handled by Stack.pop()).
     */
    public void pop() {
        if (mainStack.isEmpty()) {
            throw new IllegalStateException("MinStack is empty. Cannot pop.");
        }
        int poppedValue = mainStack.pop();
        // If the popped value is the current minimum, pop it from minStack too.
        // We use .equals for Integer objects to avoid potential issues, though == works for small ints.
        // For primitive int, == is fine. For wrapper objects, .equals is safer.
        if (!minStack.isEmpty() && poppedValue == minStack.peek()) {
            minStack.pop();
        }
    }

    /**
     * Gets the top element of the stack.
     * Time Complexity: O(1) - Stack operation (peek) is constant time.
     * Space Complexity: O(1)
     * Throws an exception if the stack is empty (handled by Stack.peek()).
     */
    public int top() {
        if (mainStack.isEmpty()) {
            throw new IllegalStateException("MinStack is empty. Cannot get top element.");
        }
        return mainStack.peek();
    }

    /**
     * Retrieves the minimum element in the stack.
     * The top of the minStack always holds the current minimum element.
     * Time Complexity: O(1) - Stack operation (peek) is constant time.
     * Space Complexity: O(1)
     * Throws an exception if the stack is empty.
     */
    public int getMin() {
        if (minStack.isEmpty()) {
            throw new IllegalStateException("MinStack is empty. Cannot get minimum element.");
        }
        return minStack.peek();
    }

    /**
     * Alternative Approach: Single Stack storing (value, current_min) pairs.
     * This approach uses a single stack where each element is a custom object or a pair
     * storing both the actual value and the minimum value *when that value was pushed*.
     *
     * Pros: No need for a second stack.
     * Cons: Each stack element uses more memory (stores two integers).
     *
     * Example:
     * Stack: [(val1, min_at_val1), (val2, min_at_val2), ...]
     *
     * public class MinStackSingleStack {
     *     private Stack<int[]> stack; // Stores {value, current_min}
     *
     *     public MinStackSingleStack() {
     *         stack = new Stack<>();
     *     }
     *
     *     public void push(int val) {
     *         if (stack.isEmpty()) {
     *             stack.push(new int[]{val, val}); // First element is its own min
     *         } else {
     *             int currentMin = stack.peek()[1]; // Get min from previous element
     *             stack.push(new int[]{val, Math.min(val, currentMin)});
     *         }
     *     }
     *
     *     public void pop() {
     *         if (stack.isEmpty()) throw new IllegalStateException("Stack is empty");
     *         stack.pop();
     *     }
     *
     *     public int top() {
     *         if (stack.isEmpty()) throw new IllegalStateException("Stack is empty");
     *         return stack.peek()[0]; // Return the actual value
     *     }
     *
     *     public int getMin() {
     *         if (stack.isEmpty()) throw new IllegalStateException("Stack is empty");
     *         return stack.peek()[1]; // Return the minimum value recorded at this point
     *     }
     * }
     */

    /**
     * Another Alternative: Single Stack with optimized memory for min values
     * This approach uses a single stack, but instead of storing (value, min) pairs,
     * it stores only the difference between the current value and the current minimum.
     * When a new value 'x' is pushed:
     * - If x <= current_min: push (x - current_min) onto the stack, update current_min = x.
     * - If x > current_min: push (x - current_min) onto the stack.
     *
     * This saves memory when x > current_min as we only store a difference.
     * The actual 'current_min' needs to be stored in a separate variable.
     *
     * This approach is more complex to implement and error-prone during pop operations,
     * as you need to reconstruct the previous minimum if the popped value was the current minimum.
     * For interviews, the two-stack solution is generally preferred for its clarity and robustness,
     * unless explicitly asked for a more space-optimized single-stack solution.
     *
     * For example:
     * private Stack<Long> stack;
     * private long min;
     *
     * public void push(int x) {
     *     if (stack.isEmpty()) {
     *         stack.push(0L); // Difference is 0 for first element
     *         min = x;
     *     } else {
     *         stack.push(x - min);
     *         if (x < min) min = x;
     *     }
     * }
     *
     * public void pop() {
     *     long diff = stack.pop();
     *     if (diff < 0) { // If the diff is negative, it means this popped value was the min
     *         min = min - diff; // Restore previous min
     *     }
     * }
     *
     * This method is more memory-efficient in scenarios where many elements are greater than the current min,
     * but adds complexity.
     */
}
```