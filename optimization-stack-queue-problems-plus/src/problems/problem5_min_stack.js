```javascript
/**
 * @fileoverview Problem 5: Min Stack
 * Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
 *
 * Implement the `MinStack` class:
 * - `MinStack()` initializes the stack object.
 * - `void push(int val)` pushes the element `val` onto the stack.
 * - `void pop()` removes the element on the top of the stack.
 * - `int top()` gets the top element of the stack.
 * - `int getMin()` retrieves the minimum element in the stack.
 *
 * You must implement a solution with O(1) time complexity for `push`, `pop`, `top`, and `getMin`.
 *
 * Constraints:
 * -2^31 <= val <= 2^31 - 1
 * Methods `pop`, `top` and `getMin` will always be called on non-empty stacks.
 * At most 3 * 10^4 calls will be made to push, pop, top, and getMin.
 */

import { Stack } from '../utils/stack.js'; // Using our custom Stack for consistency

/**
 * Solution 1 (Optimal): Using an Auxiliary Stack.
 *
 * Intuition:
 * The challenge is `getMin()` in O(1). If we only use a single stack, finding the minimum
 * requires iterating through all elements, which is O(N). To achieve O(1), we need to
 * store minimum information alongside the elements or in a separate structure.
 *
 * An auxiliary stack (`minStack`) can store the minimum values encountered so far.
 * When we `push` an element:
 *   - Push the element onto the main stack.
 *   - Push the *current minimum* (which is `Math.min(new_element, minStack.peek())`)
 *      onto the `minStack`. This way, `minStack.peek()` always tells us the minimum
 *     value up to that point in the main stack.
 * When we `pop` an element:
 *   - Pop from both the main stack and the `minStack`. This keeps them synchronized.
 * When we `getMin`:
 *   - Simply return `minStack.peek()`.
 *
 * This works because when `minStack.pop()` removes an element, the new `minStack.peek()`
 * will correctly reflect the minimum of the remaining elements.
 *
 * Algorithm:
 * 1. Initialize two stacks: `dataStack` for regular elements and `minStack` for tracking minimums.
 * 2. `push(val)`:
 *    a. Push `val` onto `dataStack`.
 *    b. Determine the value to push onto `minStack`:
 *       - If `minStack` is empty or `val` is less than or equal to `minStack.peek()`, push `val`.
 *       - Else, push `minStack.peek()` (to maintain the current minimum for later pops).
 * 3. `pop()`:
 *    a. Pop an element from `dataStack`.
 *    b. Pop an element from `minStack`.
 * 4. `top()`:
 *    a. Return `dataStack.peek()`.
 * 5. `getMin()`:
 *    a. Return `minStack.peek()`.
 *
 * Time Complexity: O(1) for all operations (`push`, `pop`, `top`, `getMin`).
 *   Stack operations are O(1).
 *
 * Space Complexity: O(N)
 * In the worst case (monotonically decreasing elements), `minStack` will grow to the same size as `dataStack`.
 * So, we use ~2N space.
 */
export class MinStackOptimal {
    constructor() {
        this.dataStack = new Stack(); // Stores all elements
        this.minStack = new Stack();  // Stores minimums corresponding to states of dataStack
    }

    /**
     * Pushes the element `val` onto the stack.
     * @param {number} val The value to push.
     * @return {void}
     */
    push(val) {
        this.dataStack.push(val);

        // If minStack is empty, or new value is less than or equal to current minimum,
        // push new value onto minStack. Equality is important for duplicates
        // and ensures correct behavior when the current min is popped.
        if (this.minStack.isEmpty() || val <= this.minStack.peek()) {
            this.minStack.push(val);
        } else {
            // Otherwise, push the current minimum again to maintain synchronization
            // This ensures minStack.peek() always reflects the min for dataStack.peek()
            this.minStack.push(this.minStack.peek());
        }
    }

    /**
     * Removes the element on the top of the stack.
     * @return {void}
     */
    pop() {
        // Since pop is always called on non-empty stacks, we don't need isEmpty checks here.
        this.dataStack.pop();
        this.minStack.pop(); // Keep minStack synchronized
    }

    /**
     * Gets the top element of the stack.
     * @return {number} The top element.
     */
    top() {
        return this.dataStack.peek();
    }

    /**
     * Retrieves the minimum element in the stack.
     * @return {number} The minimum element.
     */
    getMin() {
        return this.minStack.peek();
    }
}

/**
 * Solution 2 (Memory Optimized): Using a single stack with value-min pairs.
 *
 * Intuition:
 * Instead of two separate stacks, we can store pairs `[value, current_min_so_far]`
 * on a single stack. When `getMin` is called, we just look at the second element
 * of the top pair.
 *
 * Algorithm:
 * 1. Initialize a single stack `dataStack`. This stack will store arrays `[value, min_at_this_point]`.
 * 2. `push(val)`:
 *    a. Calculate the `currentMin`: If `dataStack` is empty, `currentMin` is `val`.
 *       Otherwise, `currentMin = Math.min(val, dataStack.peek()[1])`.
 *    b. Push the pair `[val, currentMin]` onto `dataStack`.
 * 3. `pop()`:
 *    a. Pop an element from `dataStack`.
 * 4. `top()`:
 *    a. Return `dataStack.peek()[0]` (the actual value).
 * 5. `getMin()`:
 *    a. Return `dataStack.peek()[1]` (the minimum value stored in the pair).
 *
 * Time Complexity: O(1) for all operations.
 *   Stack operations are O(1), and array access `[0]` or `[1]` is O(1).
 *
 * Space Complexity: O(N)
 * The stack stores N elements, but each element is a pair. So, it effectively uses `2N` storage
 * for numbers, similar to the auxiliary stack approach. However, it's often considered
 * conceptually simpler than managing two distinct stacks.
 */
export class MinStackMemoryOptimized {
    constructor() {
        // Stack stores [value, min_at_this_point] pairs
        this.dataStack = new Stack();
    }

    /**
     * Pushes the element `val` onto the stack.
     * @param {number} val The value to push.
     * @return {void}
     */
    push(val) {
        let currentMin;
        if (this.dataStack.isEmpty()) {
            currentMin = val;
        } else {
            // The minimum at this point is the smaller of the new value and the
            // minimum stored with the previous top element.
            currentMin = Math.min(val, this.dataStack.peek()[1]);
        }
        this.dataStack.push([val, currentMin]);
    }

    /**
     * Removes the element on the top of the stack.
     * @return {void}
     */
    pop() {
        this.dataStack.pop();
    }

    /**
     * Gets the top element of the stack.
     * @return {number} The top element.
     */
    top() {
        return this.dataStack.peek()[0]; // Return the actual value
    }

    /**
     * Retrieves the minimum element in the stack.
     * @return {number} The minimum element.
     */
    getMin() {
        return this.dataStack.peek()[1]; // Return the minimum stored in the pair
    }
}

/**
 * Solution 3 (Further Memory Optimization - Storing differences):
 * This approach aims to reduce memory usage when the min values are redundant.
 * It stores only `value` on the stack, but when a new minimum is set, it stores
 * `value - old_min` instead of `value`, and updates `min` state.
 * This is more complex to implement and debug.
 *
 * Algorithm:
 * 1. Initialize a stack `dataStack` and a variable `min` (initially `Infinity`).
 * 2. `push(val)`:
 *    a. If `dataStack` is empty:
 *       - Push `0` onto `dataStack`.
 *       - Set `min = val`.
 *    b. Else (`dataStack` is not empty):
 *       - Push `val - min` onto `dataStack`.
 *       - If `val < min`, update `min = val`.
 * 3. `pop()`:
 *    a. Pop `diff` from `dataStack`.
 *    b. If `diff < 0` (meaning the popped element was the old min):
 *       - Restore the previous min: `min = min - diff`.
 * 4. `top()`:
 *    a. Get `diff = dataStack.peek()`.
 *    b. If `diff < 0`, the current `min` is the top value.
 *    c. Else, the top value is `min + diff`.
 * 5. `getMin()`:
 *    a. Return `min`.
 *
 * This implementation is typically more error-prone for interviews but demonstrates
 * advanced space optimization. The previous two solutions are generally preferred.
 *
 * Time Complexity: O(1) for all operations.
 * Space Complexity: O(N) but potentially saves space if many values are greater than the current min,
 * as it stores smaller numbers (differences) instead of full values or pairs.
 */
export class MinStackDiffOptimized {
    constructor() {
        this.dataStack = new Stack();
        this.min = Infinity; // Current minimum value in the stack
    }

    /**
     * Pushes the element `val` onto the stack.
     * @param {number} val The value to push.
     * @return {void}
     */
    push(val) {
        if (this.dataStack.isEmpty()) {
            this.dataStack.push(0); // For the first element, push 0 and set it as min
            this.min = val;
        } else {
            const diff = val - this.min;
            this.dataStack.push(diff);
            if (diff < 0) { // If val is the new minimum
                this.min = val;
            }
        }
    }

    /**
     * Removes the element on the top of the stack.
     * @return {void}
     */
    pop() {
        const diff = this.dataStack.pop();
        if (diff < 0) { // If the popped element was the minimum
            this.min = this.min - diff; // Restore previous minimum
        }
        // No change to 'min' needed if diff >= 0
    }

    /**
     * Gets the top element of the stack.
     * @return {number} The top element.
     */
    top() {
        const diff = this.dataStack.peek();
        if (diff < 0) {
            // If diff < 0, the current min is the actual value that was pushed (it became the new min).
            return this.min;
        } else {
            // Otherwise, the value pushed was (min + diff).
            return this.min + diff;
        }
    }

    /**
     * Retrieves the minimum element in the stack.
     * @return {number} The minimum element.
     */
    getMin() {
        return this.min;
    }
}
```