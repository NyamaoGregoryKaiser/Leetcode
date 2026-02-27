```typescript
/**
 * @fileoverview Problem: Min Stack
 *
 * Design a stack that supports `push`, `pop`, `top`, and retrieving the minimum
 * element in constant time.
 *
 * Implement the `MinStack` class:
 * - `MinStack()` initializes the stack object.
 * - `void push(val)` pushes the element `val` onto the stack.
 * - `void pop()` removes the element on the top of the stack.
 * - `int top()` gets the top element of the stack.
 * - `int getMin()` retrieves the minimum element in the stack.
 *
 * You must implement a solution with O(1) time complexity for `getMin`, `push`,
 * `pop`, and `top` operations.
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
 *
 * Constraints:
 * -2^31 <= val <= 2^31 - 1
 * Methods `pop`, `top`, and `getMin` will always be called on non-empty stacks.
 * At most 3 * 10^4 calls will be made to push, pop, top, and getMin.
 */

/**
 * Approach 1: Optimal - Using a single stack of objects (value, current_min)
 *
 * This approach is very common and effective. Instead of storing just the value,
 * each element pushed onto the stack is an object containing two pieces of information:
 * 1. The actual value being pushed.
 * 2. The minimum value of the stack *up to and including* this element.
 *
 * Algorithm:
 * - `MinStack()`: Initialize an empty array (acting as a stack).
 * - `push(val)`:
 *   - If the stack is empty, the `current_min` is `val` itself.
 *   - If the stack is not empty, the `current_min` for the new element will be
 *     `min(val, stack.peek().min)`.
 *   - Push ` { value: val, min: current_min } ` onto the stack.
 * - `pop()`: Simply pop the top element from the stack.
 * - `top()`: Return the `value` property of the top element.
 * - `getMin()`: Return the `min` property of the top element.
 *
 * Time Complexity: O(1) for all operations (push, pop, top, getMin).
 *    Each operation involves a constant number of array push/pop/peek operations.
 *
 * Space Complexity: O(N), where N is the number of elements in the stack.
 *    Each element stores two numbers, so it's proportional to N. This is generally
 *    the most space-efficient O(1) time complexity solution.
 */
export class MinStackOptimal {
    // Each element in the stack stores both the value and the minimum
    // encountered *up to that point* in the stack.
    private stack: { value: number; min: number }[];

    constructor() {
        this.stack = [];
    }

    /**
     * Pushes an element `val` onto the stack.
     * Time: O(1)
     * Space: O(1) (for the new element)
     */
    push(val: number): void {
        if (this.stack.length === 0) {
            // If the stack is empty, this is the first element, so it's also the minimum.
            this.stack.push({ value: val, min: val });
        } else {
            // The new minimum is the smaller of the current value and the minimum
            // value of the previous stack state (which is stored in the current top element).
            const currentMin = Math.min(val, this.getMin());
            this.stack.push({ value: val, min: currentMin });
        }
    }

    /**
     * Removes the element on the top of the stack.
     * Assumes `pop` is always called on a non-empty stack per constraints.
     * Time: O(1)
     * Space: O(1)
     */
    pop(): void {
        // As per constraints, pop is called on non-empty stack.
        this.stack.pop();
    }

    /**
     * Gets the top element of the stack.
     * Assumes `top` is always called on a non-empty stack per constraints.
     * Time: O(1)
     * Space: O(1)
     */
    top(): number {
        // As per constraints, top is called on non-empty stack.
        return this.stack[this.stack.length - 1].value;
    }

    /**
     * Retrieves the minimum element in the stack.
     * Assumes `getMin` is always called on a non-empty stack per constraints.
     * Time: O(1)
     * Space: O(1)
     */
    getMin(): number {
        // As per constraints, getMin is called on non-empty stack.
        return this.stack[this.stack.length - 1].min;
    }
}


/**
 * Approach 2: Optimal - Using two stacks
 *
 * This is another common and equally optimal approach. It uses two separate stacks:
 * 1. `mainStack`: Stores all the actual values pushed onto the stack.
 * 2. `minTrackerStack`: Stores the minimum values. The key idea is that `minTrackerStack`
 *    only ever pushes a new minimum if the incoming value is less than or equal to
 *    its current top. When an element is popped from `mainStack`, if it was the
 *    current minimum, it must also be popped from `minTrackerStack`.
 *
 * Algorithm:
 * - `MinStack()`: Initialize two empty arrays (acting as stacks), `mainStack` and `minTrackerStack`.
 * - `push(val)`:
 *   - Push `val` onto `mainStack`.
 *   - If `minTrackerStack` is empty OR `val <= minTrackerStack.peek()`, push `val` onto `minTrackerStack`.
 * - `pop()`:
 *   - Pop an element from `mainStack`.
 *   - If the popped element from `mainStack` is equal to `minTrackerStack.peek()`,
 *     then also pop from `minTrackerStack`.
 * - `top()`: Return `mainStack.peek()`.
 * - `getMin()`: Return `minTrackerStack.peek()`.
 *
 * Time Complexity: O(1) for all operations.
 *    Each operation involves a constant number of array push/pop/peek operations.
 *
 * Space Complexity: O(N) in the worst case.
 *    `mainStack` always stores N elements. `minTrackerStack` can store up to N elements
 *    if the values are pushed in strictly decreasing order (e.g., [5, 4, 3, 2, 1]).
 *    If values are pushed in increasing order (e.g., [1, 2, 3, 4, 5]), `minTrackerStack`
 *    will only contain one element (the initial minimum). On average, it typically
 *    uses less space than `mainStack` but worst-case is N.
 */
export class MinStackTwoStacks {
    private mainStack: number[];
    private minTrackerStack: number[];

    constructor() {
        this.mainStack = [];
        this.minTrackerStack = [];
    }

    /**
     * Pushes an element `val` onto the stack.
     * Time: O(1)
     * Space: O(1)
     */
    push(val: number): void {
        this.mainStack.push(val);

        // Only push to minTrackerStack if `val` is less than or equal to the current minimum.
        // Equal is important to handle duplicates correctly (e.g., push 5, push 5, pop 5, pop 5).
        if (this.minTrackerStack.length === 0 || val <= this.minTrackerStack[this.minTrackerStack.length - 1]) {
            this.minTrackerStack.push(val);
        }
    }

    /**
     * Removes the element on the top of the stack.
     * Assumes `pop` is always called on a non-empty stack.
     * Time: O(1)
     * Space: O(1)
     */
    pop(): void {
        // If the element being popped from the main stack is the current minimum,
        // then it must also be popped from the minTrackerStack.
        const poppedValue = this.mainStack.pop();
        if (poppedValue !== undefined && poppedValue === this.minTrackerStack[this.minTrackerStack.length - 1]) {
            this.minTrackerStack.pop();
        }
    }

    /**
     * Gets the top element of the stack.
     * Assumes `top` is always called on a non-empty stack.
     * Time: O(1)
     * Space: O(1)
     */
    top(): number {
        // Assumes non-empty stack per constraints.
        return this.mainStack[this.mainStack.length - 1];
    }

    /**
     * Retrieves the minimum element in the stack.
     * Assumes `getMin` is always called on a non-empty stack.
     * Time: O(1)
     * Space: O(1)
     */
    getMin(): number {
        // Assumes non-empty stack per constraints.
        return this.minTrackerStack[this.minTrackerStack.length - 1];
    }
}


/**
 * Brute Force / Naive approach (for context, not suitable for O(1) requirement)
 *
 * A naive approach would be to store just the values in a single stack,
 * and for `getMin()`, iterate through the entire stack to find the minimum.
 *
 * - `MinStackNaive()`: Initialize an empty array `stack`.
 * - `push(val)`: `stack.push(val)`. (O(1))
 * - `pop()`: `stack.pop()`. (O(1))
 * - `top()`: `stack[stack.length - 1]`. (O(1))
 * - `getMin()`: `Math.min(...stack)`. (O(N) - iterates through all N elements).
 *
 * Time Complexity: `getMin` is O(N).
 * Space Complexity: O(N).
 *
 * This approach fails the O(1) requirement for `getMin()`. It's provided
 * here just to illustrate why the other two solutions are considered "optimal"
 * as they achieve the O(1) constraint.
 */
```