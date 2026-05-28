```javascript
const Stack = require('../data-structures/stack');
const Queue = require('../data-structures/queue');
const Deque = require('../data-structures/deque'); // For Sliding Window Maximum

// =====================================================================================
// Problem 1: Implement Queue using Stacks (LeetCode 232)
// =====================================================================================

/**
 * Implements a FIFO (First-In, First-Out) queue using two LIFO (Last-In, First-Out) stacks.
 * This approach ensures that the oldest element is always at the top of the `outStack`
 * when a dequeue or peek operation is requested.
 */
class MyQueue {
    constructor() {
        this.inStack = new Stack();  // Used for pushing new elements
        this.outStack = new Stack(); // Used for popping/peeking elements
    }

    /**
     * Pushes element x to the back of the queue.
     * This operation is straightforward: simply add to the `inStack`.
     * Time Complexity: O(1) amortized. (Stack push is O(1)).
     * Space Complexity: O(1) for this operation.
     * @param {number} x The element to push.
     */
    push(x) {
        this.inStack.push(x);
    }

    /**
     * Removes the element from the front of the queue and returns it.
     * If `outStack` is empty, all elements from `inStack` are moved to `outStack`
     * to reverse their order, making the oldest element accessible.
     * Time Complexity: O(1) amortized. In the worst case (when `outStack` is empty),
     *                  moving N elements from `inStack` to `outStack` takes O(N).
     *                  However, each element is moved at most once, leading to
     *                  amortized O(1) per pop operation over a sequence of operations.
     * Space Complexity: O(1) for this operation.
     * @returns {number} The element removed from the front.
     */
    pop() {
        this._transferElements(); // Ensure outStack is ready
        return this.outStack.pop();
    }

    /**
     * Returns the element at the front of the queue without removing it.
     * Similar logic to `pop()`, ensures `outStack` has elements.
     * Time Complexity: O(1) amortized. (Same reasoning as `pop`).
     * Space Complexity: O(1) for this operation.
     * @returns {number} The element at the front.
     */
    peek() {
        this._transferElements(); // Ensure outStack is ready
        return this.outStack.peek();
    }

    /**
     * Returns `true` if the queue is empty, `false` otherwise.
     * The queue is empty if both internal stacks are empty.
     * Time Complexity: O(1).
     * Space Complexity: O(1).
     * @returns {boolean} `true` if empty, `false` otherwise.
     */
    empty() {
        return this.inStack.isEmpty() && this.outStack.isEmpty();
    }

    /**
     * Helper function to transfer elements from `inStack` to `outStack`.
     * This is done only when `outStack` is empty, ensuring that elements
     * are reversed only when necessary.
     * All elements from `inStack` are popped and pushed onto `outStack`.
     * This effectively reverses their order, so the first element pushed into `inStack`
     * becomes the last one pushed into `outStack`, thus appearing at its top.
     * Time Complexity: O(N) where N is the number of elements in `inStack`.
     * Space Complexity: O(1) beyond the stacks themselves.
     * @private
     */
    _transferElements() {
        if (this.outStack.isEmpty()) {
            while (!this.inStack.isEmpty()) {
                this.outStack.push(this.inStack.pop());
            }
        }
    }
}


// =====================================================================================
// Problem 2: Implement Stack using Queues (LeetCode 225)
// =====================================================================================

/**
 * Implements a LIFO (Last-In, First-Out) stack using two FIFO (First-In, First-Out) queues.
 * This approach ensures that the most recently added element is always at the front of `q1`.
 *
 * Approach chosen: Push O(N), Pop O(1).
 * When pushing an element `x`:
 * 1. Enqueue `x` to `q1`.
 * 2. Move all existing elements from `q1` (that were added before `x`) to `q2`.
 *    This makes `x` the only element in `q1`.
 * 3. Move all elements from `q2` back to `q1`.
 *    This effectively puts `x` at the front of `q1`, followed by all previously added elements
 *    in their original relative order.
 */
class MyStack {
    constructor() {
        this.q1 = new Queue(); // Main queue, stores elements in stack order (newest at front)
        this.q2 = new Queue(); // Auxiliary queue, used for reordering during push
    }

    /**
     * Pushes element x onto the stack.
     * Time Complexity: O(N) where N is the current number of elements in the stack.
     *                  Each push operation involves moving all existing N elements twice.
     * Space Complexity: O(1) for this operation (ignoring the space for N elements).
     * @param {number} x The element to push.
     */
    push(x) {
        // Step 1: Add new element to q1
        this.q1.enqueue(x);

        // Step 2 & 3: Move all elements except the newly added one from q1 to q2, then back to q1.
        // This ensures the new element 'x' is at the front of q1.
        // We only move (size - 1) elements because 'x' is already at the end of q1.
        // After 'x' is enqueued, q1.size() will be old_size + 1.
        // We need to move 'old_size' elements to q2 and then back.
        // The element 'x' itself should remain in q1 to be at the front.
        // So we iterate `old_size` times.
        let currentSize = this.q1.size();
        while (currentSize > 1) { // Leave the 'x' at the end of q1
            this.q2.enqueue(this.q1.dequeue());
            currentSize--;
        }

        // Now 'x' is the only element left in q1, and all others are in q2.
        // Transfer elements from q2 back to q1.
        while (!this.q2.isEmpty()) {
            this.q1.enqueue(this.q2.dequeue());
        }

        // After these operations, q1 contains [x, old_top, ..., old_bottom]
        // where x is the new top, and old_top is the previous top.
    }

    /**
     * Removes the element on top of the stack and returns it.
     * Since `q1` is maintained such that the top element is always at its front,
     * this is a simple dequeue operation.
     * Time Complexity: O(1).
     * Space Complexity: O(1).
     * @returns {number} The element removed from the top.
     */
    pop() {
        if (this.empty()) {
            return undefined; // Stack is empty
        }
        return this.q1.dequeue();
    }

    /**
     * Returns the element on top of the stack without removing it.
     * Similarly, this is a simple peek operation on `q1`.
     * Time Complexity: O(1).
     * Space Complexity: O(1).
     * @returns {number} The element at the top.
     */
    top() {
        if (this.empty()) {
            return undefined; // Stack is empty
        }
        return this.q1.peek();
    }

    /**
     * Returns `true` if the stack is empty, `false` otherwise.
     * The stack is empty if `q1` is empty (since all elements are kept in `q1`).
     * Time Complexity: O(1).
     * Space Complexity: O(1).
     * @returns {boolean} `true` if empty, `false` otherwise.
     */
    empty() {
        return this.q1.isEmpty();
    }

    /**
     * Alternative Approach: Push O(1), Pop O(N).
     *
     * In this approach:
     * - `push(x)`: Enqueue `x` to `q1`. O(1).
     * - `pop()`: To get the top element, we must dequeue all but the last element
     *            from `q1` and enqueue them into `q2`. The last remaining element
     *            in `q1` is the top. Dequeue it. Then swap `q1` and `q2`. O(N).
     * - `top()`: Same as `pop` but re-enqueue the last element back to `q1` or `q2`
     *            before swapping. O(N).
     *
     * The chosen approach (Push O(N), Pop O(1)) is often preferred in interviews
     * because pop/top are frequently called, and O(1) is highly desirable for these operations.
     */
}


// =====================================================================================
// Problem 3: Valid Parentheses (LeetCode 20)
// =====================================================================================

/**
 * Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']',
 * determine if the input string is valid.
 * An input string is valid if:
 * 1. Open brackets must be closed by the same type of brackets.
 * 2. Open brackets must be closed in the correct order.
 * 3. Every close bracket has a corresponding open bracket of the same type.
 *
 * This is a classic stack problem.
 *
 * Optimal Solution:
 * Iterate through the string.
 * If an opening bracket is encountered, push it onto the stack.
 * If a closing bracket is encountered:
 *   - If the stack is empty, it's an invalid string (no matching opening bracket).
 *   - Pop the top element from the stack.
 *   - Check if the popped opening bracket matches the current closing bracket.
 *     If not, it's an invalid string.
 * After iterating through the entire string, if the stack is empty, the string is valid.
 * Otherwise, there are unclosed opening brackets, so it's invalid.
 *
 * @param {string} s The input string.
 * @returns {boolean} True if the string is valid, false otherwise.
 *
 * Time Complexity: O(N) where N is the length of the string `s`.
 *                  Each character is processed once, with O(1) stack operations.
 * Space Complexity: O(N) in the worst case. E.g., for "((((((", the stack will
 *                   store all N opening brackets. In the best case (e.g., "()()"),
 *                   space is O(1) if elements are pushed and immediately popped.
 */
function isValid(s) {
    const stack = new Stack();
    // Map opening brackets to their corresponding closing brackets.
    const bracketMap = {
        '(': ')',
        '{': '}',
        '[': ']'
    };

    // Iterate through each character in the string
    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        // If the character is an opening bracket, push it onto the stack
        if (bracketMap[char]) {
            stack.push(char);
        } else {
            // If the character is a closing bracket
            // Check if the stack is empty. If so, no opening bracket to match.
            if (stack.isEmpty()) {
                return false;
            }

            // Pop the top element from the stack. This should be the corresponding opening bracket.
            const lastOpenBracket = stack.pop();

            // Check if the popped opening bracket matches the current closing bracket.
            // E.g., if char is ')' and lastOpenBracket is '(', they match.
            // If bracketMap['('] (which is ')') != char, then it's a mismatch.
            if (bracketMap[lastOpenBracket] !== char) {
                return false;
            }
        }
    }

    // After iterating through the entire string, if the stack is empty,
    // all opening brackets have been correctly closed.
    return stack.isEmpty();
}


// =====================================================================================
// Problem 4: Sliding Window Maximum (LeetCode 239)
// =====================================================================================

/**
 * You are given an array of integers `nums`, there is a sliding window of size `k`
 * which is moving from the very left of the array to the very right.
 * Return the max sliding window.
 *
 * Example:
 * nums = [1,3,-1,-3,5,3,6,7], k = 3
 * Window position          Max
 * ---------------          -----
 * [1  3  -1] -3  5  3  6  7   3
 *  1 [3  -1  -3] 5  3  6  7   3
 *  1  3 [-1  -3  5] 3  6  7   5
 *  1  3  -1 [-3  5  3] 6  7   5
 *  1  3  -1  -3 [5  3  6] 7   6
 *  1  3  -1  -3  5 [3  6  7]  7
 *
 * Output: [3,3,5,5,6,7]
 *
 * Optimal Solution: Using a Monotonic Deque (Double-Ended Queue).
 * A deque is used to store indices of elements. The deque maintains elements in
 * decreasing order from front to back.
 *
 * Algorithm:
 * 1. Initialize an empty `Deque` to store indices and an empty `result` array.
 * 2. Iterate through `nums` with index `i` from `0` to `n-1`:
 *    a. **Remove elements outside the window:** If the deque is not empty and its
 *       front element's index (`deque.peekFront()`) is `i - k` (meaning it's
 *       no longer in the current window), remove it from the front (`deque.removeFront()`).
 *    b. **Maintain monotonic decreasing order:** While the deque is not empty AND
 *       the element at the back of the deque (`nums[deque.peekBack()]`) is less than
 *       or equal to the current element (`nums[i]`), remove elements from the back
 *       (`deque.removeBack()`). This ensures the deque only contains relevant
 *       (potentially maximum) elements, and the largest is at the front.
 *    c. **Add current element:** Add the current index `i` to the back of the deque (`deque.addBack(i)`).
 *    d. **Record maximum:** If `i` is greater than or equal to `k - 1` (i.e., the window has
 *       fully formed and is moving), the maximum element in the current window is
 *       `nums[deque.peekFront()]`. Add this to the `result` array.
 * 3. Return the `result` array.
 *
 * @param {number[]} nums The input array of integers.
 * @param {number} k The size of the sliding window.
 * @returns {number[]} An array containing the maximum for each sliding window.
 *
 * Time Complexity: O(N) where N is the length of `nums`.
 *                  Each element is added to and removed from the deque at most once.
 * Space Complexity: O(K) in the worst case, as the deque can store up to `k` elements/indices.
 */
function maxSlidingWindow(nums, k) {
    if (nums === null || nums.length === 0 || k <= 0) {
        return [];
    }
    if (k === 1) {
        return nums; // Each element is its own max
    }

    const result = [];
    const deque = new Deque(); // Stores indices of elements

    for (let i = 0; i < nums.length; i++) {
        // 1. Remove elements from the front if they are out of the current window
        // The element at deque.peekFront() is the index of the current maximum.
        // If this index is less than i - k + 1 (or equivalently, deque.peekFront() <= i - k),
        // it means it's outside the window [i-k+1, i].
        if (!deque.isEmpty() && deque.peekFront() <= i - k) {
            deque.removeFront();
        }

        // 2. Remove elements from the back that are smaller than the current number nums[i].
        // These elements can never be the maximum in any future window that includes nums[i]
        // because nums[i] is greater and appears later.
        while (!deque.isEmpty() && nums[deque.peekBack()] <= nums[i]) {
            deque.removeBack();
        }

        // 3. Add the current element's index to the back of the deque.
        deque.addBack(i);

        // 4. If the window has fully formed (i.e., `i` has reached `k-1` or beyond),
        // the maximum for the current window is at the front of the deque.
        if (i >= k - 1) {
            result.push(nums[deque.peekFront()]);
        }
    }

    return result;
}

// =====================================================================================
// Problem 5: Trapping Rain Water (LeetCode 42)
// =====================================================================================

/**
 * Given `n` non-negative integers representing an elevation map where the width of each bar is `1`,
 * compute how much water it can trap after raining.
 *
 * Example: height = [0,1,0,2,1,0,1,3,2,1,2,1]
 * Output: 6
 *
 * Visualization:
 *          _
 *      _  | | _
 *    _|=| | | | | _
 * _|_|S|_|_|S|S|_|_|_
 * [0,1,0,2,1,0,1,3,2,1,2,1]
 * S = water trapped
 *
 * Optimal Solution: Using a Monotonic Stack.
 * The idea is to find potential "wells" (valleys) and calculate the water they can hold.
 * A monotonic decreasing stack stores indices of bars.
 *
 * Algorithm:
 * 1. Initialize `water = 0` and an empty `Stack`.
 * 2. Iterate through the `height` array with index `i` from `0` to `n-1`:
 *    a. **While the stack is NOT empty AND `height[i]` is GREATER THAN `height[stack.peek()]`:**
 *       This means we found a right boundary (`height[i]`) that is higher than the bar
 *       at the top of the stack, forming a potential well.
 *       i. Pop `prevIdx` from the stack. This `prevIdx` represents the bottom of the well.
 *       ii. If the stack becomes empty after popping `prevIdx`, it means there's no left
 *           boundary for this well (or the left boundary is further left than any previous
 *           bar, effectively making it unbounded to the left for this calculation). Break this inner loop.
 *       iii. Otherwise, `leftIdx = stack.peek()`. This is our left boundary.
 *       iv. Calculate the distance (width) of the well: `distance = i - leftIdx - 1`.
 *           (Current index `i` is right boundary, `leftIdx` is left boundary, minus 1 for the `prevIdx` bar itself).
 *       v. Calculate the height of the water above `prevIdx`: `h = Math.min(height[i], height[leftIdx]) - height[prevIdx]`.
 *          The water level is limited by the shorter of the two boundaries.
 *       vi. Add trapped water: `water += distance * h`.
 *    b. **Push current index `i` onto the stack.** This maintains the monotonic decreasing property.
 * 3. Return `water`.
 *
 * @param {number[]} height An array of non-negative integers representing the elevation map.
 * @returns {number} The total amount of water trapped.
 *
 * Time Complexity: O(N) where N is the length of `height`.
 *                  Each element is pushed onto and popped from the stack at most once.
 * Space Complexity: O(N) in the worst case, if the heights are strictly decreasing
 *                   (e.g., [5,4,3,2,1]), the stack will store all N elements.
 */
function trap(height) {
    let water = 0;
    const stack = new Stack(); // Stores indices of bars in decreasing order of height

    for (let i = 0; i < height.length; i++) {
        // While the stack is not empty AND the current bar is taller than the bar at the stack's top
        // This indicates we've found a right boundary for a potential well.
        while (!stack.isEmpty() && height[i] > height[stack.peek()]) {
            const prevIdx = stack.pop(); // This is the bottom of our current well.

            // If the stack becomes empty, it means there's no left boundary for this `prevIdx`.
            // So, no water can be trapped with `prevIdx` as the bottom.
            if (stack.isEmpty()) {
                break;
            }

            const leftIdx = stack.peek(); // The bar to the left acting as a boundary.

            // Calculate the width of the well
            // (Current right boundary index - left boundary index - 1 for the `prevIdx` bar itself)
            const distance = i - leftIdx - 1;

            // Calculate the height of the water that can be trapped above `prevIdx` bar
            // It's limited by the shorter of the two boundaries (left and right),
            // minus the height of the `prevIdx` bar itself.
            const trappedHeight = Math.min(height[i], height[leftIdx]) - height[prevIdx];

            // Add the water trapped in this segment
            water += distance * trappedHeight;
        }

        // Push the current bar's index onto the stack.
        // This maintains the monotonic decreasing order (or stores candidates for left boundaries).
        stack.push(i);
    }

    return water;
}


module.exports = {
    MyQueue,
    MyStack,
    isValid,
    maxSlidingWindow,
    trap,
};
```