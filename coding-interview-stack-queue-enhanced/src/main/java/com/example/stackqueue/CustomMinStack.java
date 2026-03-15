```java
package com.example.stackqueue;

import java.util.Stack;

/**
 * Problem 1: Min Stack
 * Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
 *
 * Constraints:
 * - Each function call (push, pop, top, getMin) must operate in O(1) time complexity.
 * - The stack can contain any integer values.
 * - pop and top methods will always be called on non-empty stacks.
 *
 * Approaches:
 * 1. Two Stacks (Optimal):
 *    - Use one stack (mainStack) to store all elements.
 *    - Use a second stack (minStack) to store the minimum elements encountered so far.
 *    - When pushing an element `x`:
 *      - Push `x` onto `mainStack`.
 *      - If `minStack` is empty or `x` is less than or equal to the current top of `minStack`, push `x` onto `minStack`.
 *    - When popping an element:
 *      - Pop from `mainStack`.
 *      - If the popped element is equal to the current top of `minStack`, pop from `minStack` as well.
 *    - `top()`: Return `mainStack.peek()`.
 *    - `getMin()`: Return `minStack.peek()`.
 *    - Time Complexity: O(1) for all operations.
 *    - Space Complexity: O(N) in the worst case (e.g., elements pushed in decreasing order), where N is the number of elements in the stack.
 *
 * 2. Single Stack with Pairs (Alternative Optimal, similar space usage):
 *    - Store pairs (value, current_min) in a single stack.
 *    - When pushing (x):
 *      - The current min would be `min(x, stack.peek().min_value)` if stack is not empty, else `x`.
 *      - Push `(x, current_min)` onto the stack.
 *    - When popping: just pop the top pair.
 *    - `top()`: Return `stack.peek().value`.
 *    - `getMin()`: Return `stack.peek().min_value`.
 *    - Time Complexity: O(1) for all operations.
 *    - Space Complexity: O(N) since each element stored is a pair.
 *
 * 3. Single Stack with Difference (Space-optimized for specific cases):
 *    - This approach stores `value - current_min` instead of the actual value for numbers that are not new minimums, and updates a separate `min` variable.
 *    - It's more complex to implement correctly and can have issues with integer overflow if differences are very large.
 *    - While it can theoretically save space if many values are larger than the current min, practically it's often not simpler or safer than two stacks.
 *    - Space Complexity: Can be O(1) additional space in specific scenarios (when min changes rarely) or O(N) if min changes frequently.
 *
 * Chosen Approach for implementation: Two Stacks (Approach 1) - It's clear, robust, and commonly preferred in interviews.
 */
public class CustomMinStack {

    // The main stack to store all elements.
    private Stack<Integer> mainStack;
    // The auxiliary stack to store minimum elements encountered so far.
    private Stack<Integer> minStack;

    /**
     * Constructor to initialize the MinStack object.
     * Initializes both the main stack and the min stack.
     */
    public CustomMinStack() {
        mainStack = new Stack<>();
        minStack = new Stack<>();
    }

    /**
     * Pushes the element val onto the stack.
     *
     * Time Complexity: O(1)
     *   - Stack push operation is O(1).
     *   - Comparison and conditional push are also O(1).
     * Space Complexity: O(1) amortized for each element pushed.
     *   - In the worst case (elements pushed in decreasing order), minStack will also store N elements.
     *   - So, total space is O(N) where N is the number of elements.
     *
     * @param val The integer value to be pushed.
     */
    public void push(int val) {
        mainStack.push(val); // Always push to the main stack

        // Only push to minStack if it's empty or `val` is less than or equal to the current minimum.
        // Using `<=` is crucial for handling duplicate minimums correctly.
        // If we used only `<`, popping a duplicate minimum would incorrectly remove the actual minimum from minStack.
        if (minStack.isEmpty() || val <= minStack.peek()) {
            minStack.push(val);
        }
    }

    /**
     * Removes the element on the top of the stack.
     * This method assumes the stack is not empty when called.
     *
     * Time Complexity: O(1)
     *   - Stack pop operation is O(1).
     *   - Comparison and conditional pop are also O(1).
     * Space Complexity: O(1)
     */
    public void pop() {
        // If the element being popped from mainStack is the current minimum,
        // then it must also be popped from minStack.
        // Use equals() for Integer objects, or simply == for primitive types if auto-unboxed.
        // mainStack.peek() and minStack.peek() return Integer objects,
        // but the comparison `==` works for small integer values due to integer caching.
        // For robustness and larger values, `Objects.equals(mainStack.peek(), minStack.peek())`
        // or comparing intValue() would be safer, but for typical contest constraints, `==` is fine.
        if (mainStack.peek().equals(minStack.peek())) {
            minStack.pop();
        }
        mainStack.pop(); // Always pop from the main stack
    }

    /**
     * Gets the top element of the stack.
     * This method assumes the stack is not empty when called.
     *
     * Time Complexity: O(1)
     *   - Stack peek operation is O(1).
     * Space Complexity: O(1)
     *
     * @return The top element of the stack.
     */
    public int top() {
        return mainStack.peek();
    }

    /**
     * Retrieves the minimum element in the stack.
     * This method assumes the stack is not empty when called.
     *
     * Time Complexity: O(1)
     *   - Stack peek operation is O(1).
     * Space Complexity: O(1)
     *
     * @return The minimum element in the stack.
     */
    public int getMin() {
        return minStack.peek();
    }

    /**
     * Checks if the stack is empty.
     *
     * @return true if the stack is empty, false otherwise.
     */
    public boolean isEmpty() {
        return mainStack.isEmpty();
    }

    /**
     * Returns the number of elements in the stack.
     *
     * @return The size of the stack.
     */
    public int size() {
        return mainStack.size();
    }
}
```