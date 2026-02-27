```typescript
/**
 * @fileoverview Problem: Implement Queue using Stacks
 *
 * Implement a first-in, first-out (FIFO) queue using only two stacks.
 * The implemented queue should support all the functions of a normal queue
 * (`push`, `peek`, `pop`, and `empty`).
 *
 * Implement the `MyQueue` class:
 * - `MyQueue()` initializes the queue object.
 * - `void push(x)` pushes element `x` to the back of the queue.
 * - `int pop()` removes the element from the front of the queue and returns it.
 * - `int peek()` returns the element at the front of the queue.
 * - `boolean empty()` returns `true` if the queue is empty, `false` otherwise.
 *
 * Notes:
 * - You must use only standard operations of a stack, meaning only `push to top`,
 *   `peek/pop from top`, `size`, and `is empty` operations are valid.
 * - Each of the operations should have an amortized O(1) time complexity.
 * - The number of calls to `push`, `pop`, `peek`, and `empty` will be at most 100.
 */

import { Stack } from '../data-structures/Stack'; // Using our custom Stack implementation

/**
 * Approach: Two Stacks for Amortized O(1) Operations
 *
 * The core idea is to use two stacks: an `inputStack` and an `outputStack`.
 *
 * - `inputStack`: Used for all `push` operations. Elements are pushed directly here.
 *   This stack essentially stores elements in reverse order of how they should be dequeued.
 * - `outputStack`: Used for `pop` and `peek` operations. When `outputStack` is empty
 *   and a `pop` or `peek` is requested, all elements from `inputStack` are transferred
 *   to `outputStack`. This reversal ensures that the elements are now in the correct
 *   FIFO order for dequeuing.
 *
 * Algorithm:
 * 1. **`constructor()`:** Initialize `inputStack` and `outputStack` as empty stacks.
 *
 * 2. **`push(x)`:**
 *    - Simply push `x` onto `inputStack`.
 *    - Time Complexity: O(1)
 *
 * 3. **`pop()`:**
 *    - First, ensure that `outputStack` is ready with elements in FIFO order.
 *      This is done by calling a helper method, say `transferElements()`.
 *    - Then, pop and return the top element from `outputStack`.
 *    - Time Complexity: Amortized O(1).
 *      - Most calls are O(1) if `outputStack` is not empty.
 *      - If `outputStack` is empty, `transferElements()` takes O(N) where N is the number of elements
 *        in `inputStack`. However, each element is pushed and popped at most once
 *        between a full `inputStack` transfer, making the total cost of N operations
 *        (N pushes + N pops) for N elements, thus O(1) amortized.
 *
 * 4. **`peek()`:**
 *    - Similar to `pop()`, ensure `outputStack` is ready via `transferElements()`.
 *    - Then, return the top element of `outputStack` without removing it.
 *    - Time Complexity: Amortized O(1) (same reasoning as `pop`).
 *
 * 5. **`empty()`:**
 *    - The queue is empty if and only if both `inputStack` and `outputStack` are empty.
 *    - Time Complexity: O(1)
 *
 * Helper Method: `transferElements()` (or `_moveElements`)
 * - If `outputStack` is empty:
 *   - While `inputStack` is not empty, pop an element from `inputStack` and push it onto `outputStack`.
 *
 * This approach correctly simulates queue behavior using only stack operations and
 * achieves the amortized O(1) time complexity requirement.
 *
 * Space Complexity: O(N), where N is the total number of elements currently in the queue.
 * The elements are distributed between `inputStack` and `outputStack`.
 */
export class MyQueue {
    private inputStack: Stack<number>;
    private outputStack: Stack<number>;

    constructor() {
        this.inputStack = new Stack<number>();
        this.outputStack = new Stack<number>();
    }

    /**
     * Pushes element x to the back of the queue.
     * Time Complexity: O(1)
     * Space Complexity: O(1) for the new element
     */
    push(x: number): void {
        this.inputStack.push(x);
    }

    /**
     * Removes the element from the front of the queue and returns it.
     * Assumes `pop` is always called on non-empty queues per problem constraints implicitly.
     * Time Complexity: Amortized O(1). Worst case O(N) when `outputStack` is empty and
     *                  `inputStack` has N elements.
     * Space Complexity: O(1)
     */
    pop(): number | undefined {
        this.transferElements(); // Ensure outputStack is ready
        return this.outputStack.pop();
    }

    /**
     * Returns the element at the front of the queue.
     * Assumes `peek` is always called on non-empty queues per problem constraints implicitly.
     * Time Complexity: Amortized O(1). Worst case O(N).
     * Space Complexity: O(1)
     */
    peek(): number | undefined {
        this.transferElements(); // Ensure outputStack is ready
        return this.outputStack.peek();
    }

    /**
     * Returns `true` if the queue is empty, `false` otherwise.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    empty(): boolean {
        return this.inputStack.isEmpty() && this.outputStack.isEmpty();
    }

    /**
     * Private helper method to transfer elements from `inputStack` to `outputStack`.
     * This ensures that `outputStack` contains elements in FIFO order ready for `pop` or `peek`.
     * This operation only happens when `outputStack` is empty.
     * Time Complexity: O(N) where N is the number of elements in `inputStack` at the time of transfer.
     *                  Each element is transferred once, contributing to amortized O(1).
     * Space Complexity: O(1) (elements are moved, not duplicated significantly).
     */
    private transferElements(): void {
        // Only transfer if outputStack is empty. If it has elements, they are
        // already in the correct order for dequeuing.
        if (this.outputStack.isEmpty()) {
            while (!this.inputStack.isEmpty()) {
                const element = this.inputStack.pop();
                if (element !== undefined) {
                    this.outputStack.push(element);
                }
            }
        }
    }
}


/**
 * Alternative Approach: Naive / Less Optimal (Not O(1) amortized for pop/peek)
 *
 * A less optimal approach might involve transferring elements on *every* `pop` or `peek`
 * call, even if the `outputStack` is not empty. This would ensure `outputStack` always
 * has the elements in the correct order, but it would lead to a `pop` or `peek`
 * being O(N) in the worst case (and not amortized O(1)) because elements might be
 * transferred multiple times for each pop operation if not managed carefully.
 *
 * For example, if you push 1,2,3,4,5.
 * Then `pop()`: transfer 5 elements, then pop 1. (O(5))
 * Then `pop()`: transfer 4 elements, then pop 2. (O(4))
 * This clearly becomes O(N^2) for N pops after N pushes.
 *
 * The current `transferElements` logic (only transfer when `outputStack` is empty)
 * is crucial for achieving amortized O(1).
 */
```