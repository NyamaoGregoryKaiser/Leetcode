import { Stack } from '../data-structures/stack';
import { Queue, Deque } from '../data-structures/queue'; // Import Queue and Deque

/**
 * --- Problem 1: Valid Parentheses ---
 *
 * Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`,
 * determine if the input string is valid.
 *
 * An input string is valid if:
 * 1. Open brackets must be closed by the same type of brackets.
 * 2. Open brackets must be closed in the correct order.
 * 3. Every close bracket has a corresponding open bracket of the same type.
 *
 * Example 1:
 * Input: s = "()"
 * Output: true
 *
 * Example 2:
 * Input: s = "()[]{}"
 * Output: true
 *
 * Example 3:
 * Input: s = "(]"
 * Output: false
 */
export function isValidParentheses(s: string): boolean {
    // Edge case: Empty string is considered valid.
    if (s.length === 0) {
        return true;
    }

    // Optimization: If string length is odd, it cannot be valid.
    if (s.length % 2 !== 0) {
        return false;
    }

    // Use a custom Stack to keep track of open brackets.
    const stack = new Stack<string>();
    const map: { [key: string]: string } = {
        '(': ')',
        '{': '}',
        '[': ']',
    };

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        // If it's an opening bracket, push it onto the stack.
        if (map[char]) {
            stack.push(char);
        } else {
            // If it's a closing bracket:
            // 1. If the stack is empty, there's no corresponding open bracket.
            // 2. Pop the top element and check if it's the correct matching open bracket.
            if (stack.isEmpty()) {
                return false;
            }
            const lastOpen = stack.pop();
            if (map[lastOpen] !== char) {
                return false;
            }
        }
    }

    // After iterating through the entire string, if the stack is empty,
    // all open brackets have been correctly closed.
    return stack.isEmpty();
}

/**
 * --- Problem 1 Analysis ---
 * Time Complexity: O(N)
 *   We iterate through the string once. Each `push`, `pop`, `isEmpty` operation on our custom
 *   array-based stack takes O(1) time.
 * Space Complexity: O(N)
 *   In the worst case (e.g., "((((()))))"), the stack could store up to N/2 elements,
 *   where N is the length of the string. So, space is proportional to N.
 */


/**
 * --- Problem 2: Min Stack ---
 *
 * Design a stack that supports `push`, `pop`, `top`, and retrieving the minimum element in constant time.
 *
 * Implement the `MinStack` class:
 * - `MinStack()`: Initializes the stack object.
 * - `push(val)`: Pushes the element `val` onto the stack.
 * - `pop()`: Removes the element on top of the stack.
 * - `top()`: Gets the top element of the stack.
 * - `getMin()`: Retrieves the minimum element in the stack.
 *
 * Each function should run in O(1) time complexity.
 */
export class MinStack {
    private stack: Stack<number>;
    private minStack: Stack<number>; // Auxiliary stack to keep track of minimums

    /**
     * Initializes the MinStack object.
     * Time: O(1)
     * Space: O(1)
     */
    constructor() {
        this.stack = new Stack<number>();
        this.minStack = new Stack<number>();
    }

    /**
     * Pushes an element `val` onto the stack.
     * When pushing, also update the `minStack`. If `val` is less than or equal to
     * the current minimum (or `minStack` is empty), push `val` onto `minStack`.
     * @param val The value to push.
     * Time: O(1)
     * Space: O(1) per push (amortized average, as `minStack` only grows if new minimum is found)
     */
    push(val: number): void {
        this.stack.push(val);
        if (this.minStack.isEmpty() || val <= this.minStack.peek()) {
            this.minStack.push(val);
        }
    }

    /**
     * Removes the element on top of the stack.
     * When popping, if the element being popped is the current minimum,
     * also pop from `minStack`.
     * Time: O(1)
     * Space: O(1)
     */
    pop(): void {
        if (this.stack.isEmpty()) {
            throw new Error("Stack is empty, cannot pop.");
        }
        const poppedValue = this.stack.pop();
        if (poppedValue === this.minStack.peek()) {
            this.minStack.pop();
        }
    }

    /**
     * Gets the top element of the stack.
     * Time: O(1)
     * Space: O(1)
     */
    top(): number {
        return this.stack.peek();
    }

    /**
     * Retrieves the minimum element in the stack.
     * Time: O(1)
     * Space: O(1)
     */
    getMin(): number {
        return this.minStack.peek();
    }
}

/**
 * --- Problem 2 Analysis ---
 *
 * The key to achieving O(1) for `getMin` is to maintain the minimum value alongside the main stack.
 *
 * Alternative approaches:
 * 1. Store `(value, current_min)` pairs in a single stack.
 *    - `push(val)`: Push `(val, min(val, current_min_so_far))`
 *    - `getMin()`: Just peek the `current_min` from the top pair.
 *    - This uses slightly more space per element (two numbers instead of one) but simplifies logic.
 *    - Space Complexity: O(N) always, as every element stores its own minimum.
 * 2. Recalculate minimum on pop:
 *    - `getMin()` would iterate through the whole stack to find the minimum.
 *    - Time Complexity: O(N) for `getMin`, which violates the O(1) requirement.
 *
 * Our chosen approach (using an auxiliary `minStack`):
 * Time Complexity: O(1) for all operations (`push`, `pop`, `top`, `getMin`).
 *   Each operation involves a constant number of stack operations, which are O(1).
 * Space Complexity: O(N) in the worst case.
 *   `stack` stores N elements. `minStack` also stores elements.
 *   Worst case for `minStack`: if elements are pushed in strictly decreasing order (e.g., 5, 4, 3, 2, 1),
 *   then `minStack` will also store N elements.
 *   Best case for `minStack`: if elements are pushed in increasing order (e.g., 1, 2, 3, 4, 5),
 *   `minStack` will only store the first element (1).
 *   Average case for `minStack`: It will store log(N) elements on average.
 *   Overall space is dominated by `stack` and `minStack`, so O(N).
 */


/**
 * --- Problem 3: Implement Queue using Stacks ---
 *
 * Implement a first-in-first-out (FIFO) queue using only two stacks.
 * The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`).
 *
 * Implement the `MyQueue` class:
 * - `MyQueue()`: Initializes the queue object.
 * - `push(x)`: Pushes element `x` to the back of the queue.
 * - `pop()`: Removes the element from the front of the queue and returns it.
 * - `peek()`: Returns the element at the front of the queue.
 * - `empty()`: Returns `true` if the queue is empty, `false` otherwise.
 *
 * Notes:
 * - You must use *only* the standard operations of a stack, which means only `push`, `peek/top`, `pop`, and `isEmpty`
 *   operations are valid.
 */
export class MyQueue<T> {
    private inStack: Stack<T>;    // Used for pushing new elements
    private outStack: Stack<T>;   // Used for popping/peeking elements

    /**
     * Initializes the queue object.
     * Time: O(1)
     * Space: O(1)
     */
    constructor() {
        this.inStack = new Stack<T>();
        this.outStack = new Stack<T>();
    }

    /**
     * Pushes element `x` to the back of the queue.
     * Elements are simply pushed onto `inStack`.
     * Time: O(1)
     * Space: O(1) per push
     */
    push(x: T): void {
        this.inStack.push(x);
    }

    /**
     * Removes the element from the front of the queue and returns it.
     * If `outStack` is empty, transfer all elements from `inStack` to `outStack`.
     * Then, pop from `outStack`.
     * Time: Amortized O(1). Worst case O(N) when transfer happens.
     * Space: O(1)
     */
    pop(): T {
        this.transferElementsIfNeeded();
        if (this.outStack.isEmpty()) {
            throw new Error("Queue is empty, cannot pop.");
        }
        return this.outStack.pop();
    }

    /**
     * Returns the element at the front of the queue.
     * Similar logic to `pop` but uses `peek`.
     * Time: Amortized O(1). Worst case O(N) when transfer happens.
     * Space: O(1)
     */
    peek(): T {
        this.transferElementsIfNeeded();
        if (this.outStack.isEmpty()) {
            throw new Error("Queue is empty, no front element.");
        }
        return this.outStack.peek();
    }

    /**
     * Returns `true` if the queue is empty, `false` otherwise.
     * The queue is empty if both `inStack` and `outStack` are empty.
     * Time: O(1)
     * Space: O(1)
     */
    empty(): boolean {
        return this.inStack.isEmpty() && this.outStack.isEmpty();
    }

    /**
     * Helper function to transfer elements from `inStack` to `outStack`
     * if `outStack` is empty. This reverses the order, preparing for FIFO.
     * Time: O(N) where N is the number of elements in `inStack`.
     * Space: O(1) (excluding stack internal storage).
     */
    private transferElementsIfNeeded(): void {
        if (this.outStack.isEmpty()) {
            while (!this.inStack.isEmpty()) {
                this.outStack.push(this.inStack.pop());
            }
        }
    }
}

/**
 * --- Problem 3 Analysis ---
 *
 * Time Complexity:
 * - `push`: O(1). Elements are simply pushed to `inStack`.
 * - `pop`: Amortized O(1).
 *   - Most `pop` calls are O(1) as they just pop from `outStack`.
 *   - A `pop` operation becomes O(N) only when `outStack` is empty and a transfer
 *     from `inStack` is needed (where N is the number of elements in `inStack`).
 *   - However, each element is pushed once to `inStack` and popped once, then pushed once to `outStack`
 *     and popped once. Over a sequence of N operations, the total cost of transfers is O(N),
 *     making the amortized cost per `pop` O(1).
 * - `peek`: Amortized O(1), for the same reasons as `pop`.
 * - `empty`: O(1).
 *
 * Space Complexity: O(N)
 *   In the worst case (e.g., N pushes followed by no pops), all N elements will be in `inStack`.
 *   If a pop then triggers a transfer, all N elements move to `outStack`. At no point do we
 *   store more than N elements across both stacks combined. So, space is O(N).
 */


/**
 * --- Problem 4: Implement Stack using Queues ---
 *
 * Implement a last-in-first-out (LIFO) stack using only two queues.
 * The implemented stack should support all the functions of a normal stack (`push`, `top`, `pop`, and `empty`).
 *
 * Implement the `MyStack` class:
 * - `MyStack()`: Initializes the stack object.
 * - `push(x)`: Pushes element `x` onto the stack.
 * - `pop()`: Removes the element on top of the stack and returns it.
 * - `top()`: Returns the element on top of the stack.
 * - `empty()`: Returns `true` if the stack is empty, `false` otherwise.
 *
 * Notes:
 * - You must use *only* the standard operations of a queue, which means only `enqueue`, `peek`, `dequeue`, and `isEmpty`
 *   operations are valid.
 * - The custom `Queue` implementation has `dequeue` as O(N). For this problem, assume an amortized O(1) `dequeue`
 *   for the underlying queue structure to analyze complexities typically expected in interviews.
 *   However, in our current setup, `dequeue` is truly O(N) which will make overall operations slower.
 *   The provided solution (Strategy 1) still reflects the common interview approach.
 */
export class MyStack<T> {
    private q1: Queue<T>; // Main queue for elements
    private q2: Queue<T>; // Auxiliary queue for transfers

    /**
     * Initializes the stack object.
     * Time: O(1)
     * Space: O(1)
     */
    constructor() {
        this.q1 = new Queue<T>();
        this.q2 = new Queue<T>();
    }

    /**
     * Pushes element `x` onto the stack.
     * Strategy 1: Make push O(N), pop O(1).
     *   When a new element `x` is pushed, it must become the "top" of the stack.
     *   To achieve this with queues, we enqueue `x` into `q2`, then dequeue all elements
     *   from `q1` and enqueue them into `q2`. Finally, swap `q1` and `q2`.
     * @param x The element to push.
     * Time: O(N) where N is the current size of the stack. (Assuming O(1) queue ops)
     *       With our O(N) custom queue.dequeue, this becomes O(N^2).
     * Space: O(1) extra space per push (beyond queue's internal storage).
     */
    push(x: T): void {
        // Enqueue the new element into q2
        this.q2.enqueue(x);

        // Move all elements from q1 to q2
        while (!this.q1.isEmpty()) {
            this.q2.enqueue(this.q1.dequeue());
        }

        // Swap q1 and q2 (q1 now contains all elements, with 'x' at the front)
        const temp = this.q1;
        this.q1 = this.q2;
        this.q2 = temp;
    }

    /**
     * Removes the element on top of the stack and returns it.
     * Since the `push` operation ensures the top element is at `q1`'s front,
     * we just dequeue from `q1`.
     * Time: O(1) (Assuming O(1) queue ops)
     *       With our O(N) custom queue.dequeue, this becomes O(N).
     * Space: O(1)
     */
    pop(): T {
        if (this.q1.isEmpty()) {
            throw new Error("Stack is empty, cannot pop.");
        }
        return this.q1.dequeue();
    }

    /**
     * Returns the element on top of the stack.
     * Similar to `pop`, just peek.
     * Time: O(1) (Assuming O(1) queue ops)
     *       With our O(N) custom queue.peek, this becomes O(1).
     * Space: O(1)
     */
    top(): T {
        if (this.q1.isEmpty()) {
            throw new Error("Stack is empty, no top element.");
        }
        return this.q1.peek();
    }

    /**
     * Returns `true` if the stack is empty, `false` otherwise.
     * The stack is empty if `q1` (our main queue) is empty.
     * Time: O(1)
     * Space: O(1)
     */
    empty(): boolean {
        return this.q1.isEmpty();
    }
}

/**
 * --- Problem 4 Analysis ---
 *
 * There are two main strategies for implementing Stack using Queues:
 *
 * Strategy 1 (Implemented above): Make `push` O(N), `pop` O(1).
 *   - `push`: When a new element `x` arrives, to make it the "top", it must be at the front of the main queue.
 *     We achieve this by first enqueueing `x` into an auxiliary queue, then moving all existing elements
 *     from the main queue to the auxiliary queue (after `x`), and finally swapping the main and auxiliary queues.
 *     This ensures `x` is now at the front of the (new) main queue.
 *     - Time Complexity: O(N) for `push` (N queue operations, each O(1) with efficient queues).
 *       *NOTE*: With our custom `Queue` where `dequeue` is O(N), `push` becomes O(N * N) = O(N^2).
 *   - `pop`: O(1) (one `dequeue` operation).
 *     *NOTE*: With our custom `Queue` where `dequeue` is O(N), `pop` becomes O(N).
 *   - `top`: O(1) (one `peek` operation).
 *   - `empty`: O(1).
 *   - Space Complexity: O(N) as all elements are stored across the two queues.
 *
 * Strategy 2: Make `push` O(1), `pop` O(N).
 *   - `push`: Simply enqueue the new element into `q1`.
 *     - Time Complexity: O(1).
 *   - `pop`: To get the LIFO element (which is at the back of `q1` for FIFO queues),
 *     we must dequeue `N-1` elements from `q1` and enqueue them into `q2`. The `N`-th element
 *     is then dequeued from `q1` (this is our result). Then `q1` and `q2` are swapped.
 *     - Time Complexity: O(N) for `pop` (N queue operations).
 *       *NOTE*: With our custom `Queue` where `dequeue` is O(N), `pop` becomes O(N * N) = O(N^2).
 *   - `top`: Similar to `pop`, dequeue `N-1` elements, peek the last one, then enqueue all back. Or
 *     do the same as pop, but remember to enqueue the popped element back to preserve the stack.
 *     This is typically O(N).
 *   - `empty`: O(1).
 *   - Space Complexity: O(N).
 *
 * The implemented `MyStack` uses Strategy 1. For interview purposes, it's generally assumed
 * that the underlying Queue operations (`enqueue`, `dequeue`, `peek`) are O(1) amortized.
 */


/**
 * --- Problem 5: Sliding Window Maximum ---
 *
 * You are given an array of integers `nums`, there is a sliding window of size `k` which is
 * moving from the very left of the array to the very right. You can only see the `k` numbers
 * in the window. Each time the sliding window moves right by one position.
 * Return the *maximum* sliding window.
 *
 * Example 1:
 * Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
 * Output: [3,3,5,5,6,7]
 * Explanation:
 * Window position                Max
 * ---------------               -----
 * [1  3  -1] -3  5  3  6  7       3
 *  1 [3  -1  -3] 5  3  6  7       3
 *  1  3 [-1  -3  5] 3  6  7       5
 *  1  3  -1 [-3  5  3] 6  7       5
 *  1  3  -1  -3 [5  3  6] 7       6
 *  1  3  -1  -3  5 [3  6  7]      7
 *
 * Example 2:
 * Input: nums = [1], k = 1
 * Output: [1]
 */
export function slidingWindowMaximum(nums: number[], k: number): number[] {
    // Edge cases
    if (nums.length === 0 || k === 0) {
        return [];
    }
    if (k === 1) {
        return nums;
    }
    if (k > nums.length) { // Window size larger than array, max is simply max of all elements
        return [Math.max(...nums)];
    }

    const result: number[] = [];
    // A deque (double-ended queue) to store indices of elements.
    // The deque will always store indices of elements in *decreasing* order of their values.
    // The front of the deque will always be the index of the maximum element in the current window.
    const deque = new Deque<number>();

    for (let i = 0; i < nums.length; i++) {
        // 1. Remove elements from the front if they are out of the current window.
        // The element at deque.peekFront() is the oldest in the *potential* max candidate list.
        // If its index is less than `i - k + 1`, it means it's outside the current window.
        if (!deque.isEmpty() && deque.peekFront() < i - k + 1) {
            deque.removeFront();
        }

        // 2. Remove elements from the back if they are smaller than the current element `nums[i]`.
        // This maintains the decreasing order property and ensures the front is always the true max.
        // Any element in the deque that is smaller than or equal to `nums[i]` and appears before `nums[i]`
        // cannot be the maximum of any future window that `nums[i]` is part of.
        while (!deque.isEmpty() && nums[deque.peekBack()] <= nums[i]) {
            deque.removeBack();
        }

        // 3. Add the current element's index to the back of the deque.
        deque.addBack(i);

        // 4. If the window has fully formed (i.e., `i` is at least `k-1`),
        // the maximum element for the current window is at the front of the deque.
        if (i >= k - 1) {
            result.push(nums[deque.peekFront()]);
        }
    }

    return result;
}

/**
 * --- Problem 5 Analysis ---
 *
 * Algorithm: Using a Monotonic Decreasing Deque (Double-Ended Queue)
 *
 * The core idea is to maintain a deque that stores indices of `nums` elements.
 * The elements corresponding to these indices in the deque are always in *decreasing* order.
 * This means `nums[deque.front()] >= nums[deque.front()+1] ... >= nums[deque.back()]`.
 *
 * Time Complexity: O(N)
 *   - Each element `nums[i]` is processed:
 *     - It is pushed onto the deque at most once (`addBack`).
 *     - It is removed from the deque at most once (either from `removeFront` if it goes out of window,
 *       or `removeBack` if a larger element comes after it).
 *   - Deque operations (`addFront`, `addBack`, `removeFront`, `removeBack`, `peekFront`, `peekBack`, `isEmpty`)
 *     are all O(1) for our custom `Deque` implementation.
 *   - Therefore, the total time complexity is proportional to N, where N is the length of `nums`.
 *
 * Space Complexity: O(K)
 *   - The deque stores indices. In the worst case, if the window contains strictly decreasing elements
 *     (e.g., `[5,4,3,2,1]` and `k=5`), the deque could store up to K elements.
 *   - Therefore, the space complexity is proportional to K, the window size.
 *
 * Brute Force Approach (for comparison):
 *   - For each window, iterate through all `k` elements to find the maximum.
 *   - There are `N - K + 1` windows. Each window takes `O(K)` to find max.
 *   - Total Time Complexity: O((N - K + 1) * K) which simplifies to O(N * K).
 *   - Space Complexity: O(1) (excluding result array).
 *   - The deque-based solution is significantly more efficient when K is large.
 */