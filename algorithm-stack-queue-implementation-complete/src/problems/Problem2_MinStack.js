const Stack = require('../data-structures/Stack'); // Assuming a basic Stack class exists

/**
 * Problem 2: Min Stack
 *
 * Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
 *
 * Implement the `MinStack` class:
 * - `MinStack()` initializes the stack object.
 * - `void push(val)` pushes the element `val` onto the stack.
 * - `void pop()` removes the element on the top of the stack.
 * - `int top()` gets the top element of the stack.
 * - `int getMin()` retrieves the minimum element in the stack.
 *
 * Each function should run in O(1) time complexity.
 *
 * Example:
 * MinStack minStack = new MinStack();
 * minStack.push(-2);
 * minStack.push(0);
 * minStack.push(-3);
 * minStack.getMin(); // return -3
 * minStack.pop();
 * minStack.top();    // return 0
 * minStack.getMin(); // return -2
 */

/**
 * Optimal Approach 1: Using Two Stacks
 *
 * This is a common and intuitive approach to achieve O(1) `getMin`.
 *
 * Algorithm:
 * 1. Maintain two stacks:
 *    - `dataStack`: Stores all elements pushed onto the stack.
 *    - `minStack`: Stores the minimum element seen *so far* for each corresponding `dataStack` element.
 *
 * `push(val)`:
 *   - Push `val` onto `dataStack`.
 *   - If `minStack` is empty OR `val` is less than or equal to the `minStack`'s top element,
 *     push `val` onto `minStack`. Otherwise, push the current `minStack`'s top element onto `minStack`
 *     again (to maintain a 1:1 correspondence for `pop`).
 *     *Correction*: A simpler and more common approach is to only push `val` to `minStack` if `val <= currentMin`.
 *     However, this makes `pop` tricky. The described approach where `minStack` also grows with non-min values
 *     guarantees 1:1 correspondence and simplifies `pop`.
 *     Let's refine: The `minStack` stores the minimum *up to that point*.
 *     When we push `val`, the new minimum for the stack up to this point is `min(val, current_min_value_before_val)`.
 *     So, push `min(val, this.getMin())` onto `minStack`.
 *
 * `pop()`:
 *   - Pop an element from `dataStack`.
 *   - Pop an element from `minStack`. (This works because of the 1:1 correspondence).
 *
 * `top()`:
 *   - Return `dataStack.peek()`.
 *
 * `getMin()`:
 *   - Return `minStack.peek()`.
 *
 * Time Complexity: O(1) for all operations (push, pop, top, getMin).
 * Space Complexity: O(N) in the worst case, where N is the number of elements in the stack.
 *   - `dataStack` stores N elements.
 *   - `minStack` also stores N elements (as it grows in tandem with `dataStack`), potentially doubling space usage.
 */
class MinStackTwoStacks {
    constructor() {
        this.dataStack = new Stack(); // Stores all elements
        this.minStack = new Stack();  // Stores minimums corresponding to dataStack states
    }

    push(val) {
        this.dataStack.push(val);

        // If minStack is empty or current value is less than or equal to the current minimum,
        // push the current value onto minStack.
        // We use <= to handle cases where duplicate minimums are pushed.
        if (this.minStack.isEmpty() || val <= this.minStack.peek()) {
            this.minStack.push(val);
        } else {
            // Otherwise, push the current minimum again to maintain 1:1 correspondence.
            // This is crucial for pop to work correctly.
            this.minStack.push(this.minStack.peek());
        }
    }

    pop() {
        if (this.dataStack.isEmpty()) {
            return; // Or throw an error
        }
        this.dataStack.pop();
        this.minStack.pop(); // Pop from minStack regardless
    }

    top() {
        return this.dataStack.peek();
    }

    getMin() {
        return this.minStack.peek();
    }
}

/**
 * Optimal Approach 2: Using a Single Stack of Custom Objects (or pairs)
 *
 * This approach aims to reduce space complexity slightly or conceptually simplify the linking
 * of data and its current minimum.
 *
 * Algorithm:
 * 1. The stack `items` will store objects, where each object contains:
 *    - `value`: The actual value pushed by the user.
 *    - `min`: The minimum value in the stack *up to and including* this `value`.
 *
 * `push(val)`:
 *   - Calculate the current minimum:
 *     - If the stack is empty, `currentMin` is `val`.
 *     - Otherwise, `currentMin` is `Math.min(val, this.top().min)`.
 *   - Push a new object `{ value: val, min: currentMin }` onto the stack.
 *
 * `pop()`:
 *   - Pop an element from the stack.
 *
 * `top()`:
 *   - Return `this.items[this.items.length - 1].value`.
 *
 * `getMin()`:
 *   - Return `this.items[this.items.length - 1].min`.
 *
 * Time Complexity: O(1) for all operations.
 * Space Complexity: O(N) in the worst case.
 *   - Each element pushed requires storing an object with two properties, which uses
 *     slightly more memory per element than just the value, but avoids duplicating the entire stack's values
 *     like in the two-stack approach when non-min values are pushed.
 *     In JavaScript, `Stack` uses an array. Storing `{value, min}` objects still means `N` objects in the array.
 *     The *asymptotic* space complexity remains O(N).
 */
class MinStackCustomObject {
    constructor() {
        this.items = []; // Array to store {value, min} objects
    }

    push(val) {
        let currentMin;
        if (this.items.length === 0) {
            currentMin = val;
        } else {
            currentMin = Math.min(val, this.items[this.items.length - 1].min);
        }
        this.items.push({ value: val, min: currentMin });
    }

    pop() {
        if (this.items.length === 0) {
            return; // Or throw an error
        }
        this.items.pop();
    }

    top() {
        if (this.items.length === 0) {
            return undefined; // Or throw an error
        }
        return this.items[this.items.length - 1].value;
    }

    getMin() {
        if (this.items.length === 0) {
            return undefined; // Or throw an error
        }
        return this.items[this.items.length - 1].min;
    }
}


module.exports = {
    MinStackTwoStacks,
    MinStackCustomObject
};