# Algorithm Explanations

This document provides detailed explanations for the algorithms used to solve the problems in this project. Each problem is discussed, covering the optimal approach, why it's chosen, and alternative (often less efficient) considerations.

---

## 1. Valid Parentheses (`Problem1_ValidParentheses.js`)

**Problem Description:** Determine if an input string containing only parentheses `( ) { } [ ]` is valid. A valid string ensures open brackets are closed by the same type and in the correct order.

### Optimal Approach: Using a Stack

**Logic:**
The core idea is that when we encounter an opening bracket, we expect its corresponding closing bracket to appear later, but *before* any other opening bracket that follows it is closed. This "last in, first out" nature is a perfect fit for a stack.

1.  **Initialization**:
    *   Create an empty stack to store opening brackets.
    *   Create a map (or object) to quickly check the corresponding opening bracket for each closing bracket. E.g., `map = {')': '(', '}': '{', ']': '['}`.
2.  **Iteration**:
    *   Iterate through each character of the input string.
    *   **If it's an opening bracket** (`(`, `{`, `[`): Push it onto the stack. We'll wait for its corresponding closing bracket.
    *   **If it's a closing bracket** (`)`, `}`, `]`):
        *   First, check if the stack is empty. If it is, this means we've found a closing bracket without any preceding opening bracket to match it. So, the string is invalid.
        *   If the stack is not empty, pop the top element. This `topElement` should be the *expected* opening bracket for the current closing `char`.
        *   Compare `topElement` with `map[char]`. If they don't match, the brackets are either of different types or are out of order. So, the string is invalid.
3.  **Final Check**:
    *   After iterating through the entire string:
        *   If the stack is empty, it means every opening bracket found had a correct corresponding closing bracket. The string is valid.
        *   If the stack is not empty, it means there are still unmatched opening brackets. The string is invalid.

**Why this is optimal:**
*   **Time Complexity: O(N)** - We iterate through the string once. Each operation (stack push/pop, map lookup) is O(1).
*   **Space Complexity: O(N)** - In the worst case (e.g., `(((((`), the stack stores up to N/2 opening brackets. The map is constant space. This is the best possible space complexity as we might need to remember all opening brackets.

### Alternative Approach (Less Optimal): String Replacement

**Logic:**
This approach involves repeatedly finding and removing all valid `()`, `[]`, `{}` pairs from the string until no more such pairs can be found. If the string becomes empty, it's valid.

**Example:** `s = "({[]})"`
1.  `s` becomes `({[]})` -> `({})` (after removing `[]`)
2.  `s` becomes `({})` -> `()` (after removing `{}`)
3.  `s` becomes `()` -> `` (after removing `()`)
4.  String is empty, so it's valid.

**Why it's less optimal:**
*   **Time Complexity: O(N^2)** - String `replace` operations in many languages can be O(N) because they might involve creating new strings or scanning the string multiple times. If the replacement occurs in a loop, it leads to O(N^2) in the worst case (e.g., `((((()))))`).
*   **Space Complexity: O(N)** - Each string replacement often creates a new string, potentially leading to O(N) temporary space per iteration.

---

## 2. Min Stack (`Problem2_MinStack.js`)

**Problem Description:** Design a stack that supports `push`, `pop`, `top`, and `getMin` operations, all in O(1) time complexity.

### Optimal Approach 1: Using Two Stacks

**Logic:**
The challenge is `getMin` in O(1). A normal stack gives O(1) for `push`, `pop`, `top`. To get `min` in O(1), we need to keep track of the minimums efficiently.
This approach uses an auxiliary stack (`minStack`) to store the minimum value encountered *up to each point* in the main stack (`dataStack`).

1.  **`dataStack`**: This is the regular stack storing all elements.
2.  **`minStack`**: This stack stores the minimum values. The key idea is that for every element `x` pushed onto `dataStack`, `minStack` stores the minimum value of `dataStack` up to and including `x`.

**Operations:**

*   **`push(val)`:**
    1.  Push `val` onto `dataStack`.
    2.  Determine the new minimum:
        *   If `minStack` is empty OR `val` is less than or equal to `minStack.peek()`, then `val` is the new minimum. Push `val` onto `minStack`.
        *   Otherwise (if `val` is greater than the current minimum), the minimum doesn't change. To maintain a 1:1 correspondence between `dataStack` and `minStack` (which is crucial for `pop`): push `minStack.peek()` onto `minStack` again. This ensures `minStack` always has an element to pop when `dataStack` is popped.
*   **`pop()`:**
    1.  Pop from `dataStack`.
    2.  Pop from `minStack`. (This works because of the 1:1 correspondence ensured by `push`).
*   **`top()`:** Return `dataStack.peek()`.
*   **`getMin()`:** Return `minStack.peek()`.

**Why this is optimal:**
*   **Time Complexity: O(1)** for all operations. All stack operations (push, pop, peek, isEmpty, size) are O(1) in our custom `Stack` implementation.
*   **Space Complexity: O(N)** - In the worst case (elements are pushed in descending order), `minStack` will store N elements, similar to `dataStack`. So, it uses up to 2N space, asymptotically O(N).

### Optimal Approach 2: Using a Single Stack of Custom Objects (or pairs)

**Logic:**
Instead of two separate stacks, we can store `(value, current_min)` pairs (or objects) directly onto a single stack.

**Operations:**

*   **`push(val)`:**
    1.  Calculate `currentMin`: If the stack is empty, `currentMin` is `val`. Otherwise, `currentMin` is `Math.min(val, this.top().min)`.
    2.  Push an object `{ value: val, min: currentMin }` onto the stack.
*   **`pop()`:** Pop an element from the stack.
*   **`top()`:** Return `this.items[this.items.length - 1].value`.
*   **`getMin()`:** Return `this.items[this.items.length - 1].min`.

**Why this is optimal:**
*   **Time Complexity: O(1)** for all operations.
*   **Space Complexity: O(N)** - Each element pushed stores an object with two properties. While potentially using slightly more memory per element than just a number, asymptotically it's still O(N), similar to the two-stack approach. The actual memory footprint might be marginally better if `minStack` in the two-stack approach has many duplicate minimums.

---

## 3. Implement Queue using Stacks (`Problem3_QueueUsingStacks.js`)

**Problem Description:** Implement a FIFO (First-In, First-Out) queue using only two LIFO (Last-In, First-Out) stacks.

### Optimal Approach: Two Stacks (Input Stack and Output Stack)

**Logic:**
The core idea is to use one stack (`inputStack`) for `push` operations and another stack (`outputStack`) for `pop` and `peek` operations.
Elements are pushed onto `inputStack` in LIFO order. When we need to `pop` or `peek` (which require FIFO order), we transfer elements from `inputStack` to `outputStack`. This transfer naturally reverses the order, making the oldest element (which was at the bottom of `inputStack`) appear at the top of `outputStack`.

1.  **`inputStack`**: Used solely for `push` operations. New elements are added here.
2.  **`outputStack`**: Used for `pop` and `peek` operations. When `outputStack` is empty, elements are moved from `inputStack` to `outputStack`.

**Operations:**

*   **`push(x)`:**
    *   Push `x` onto `inputStack`. (O(1))
*   **`pop()`:**
    *   Before popping, ensure `outputStack` has elements. If `outputStack` is empty:
        *   While `inputStack` is not empty, pop from `inputStack` and push onto `outputStack`. This "flips" the elements.
    *   Now, `outputStack` contains elements in FIFO order. Pop from `outputStack`. (Amortized O(1))
*   **`peek()`:**
    *   Similar to `pop`, ensure `outputStack` is populated by transferring from `inputStack` if necessary.
    *   Then, `peek` at the top of `outputStack`. (Amortized O(1))
*   **`empty()`:**
    *   The queue is empty if and only if both `inputStack` and `outputStack` are empty. (O(1))

**Why this is optimal (Amortized Analysis):**
*   **Time Complexity: Amortized O(1)** for all operations.
    *   `push` is always O(1).
    *   For `pop` and `peek`, a transfer operation (from `inputStack` to `outputStack`) might take O(N) if `inputStack` has N elements. However, each element is moved from `inputStack` to `outputStack` only once. Once in `outputStack`, it stays there until popped. Over a sequence of M operations, each element is pushed once, transferred once, and popped once. This constant number of operations per element leads to an amortized O(1) cost per operation.
*   **Space Complexity: O(N)** - In the worst case, all N elements are either in `inputStack` or `outputStack`, requiring space proportional to N.

---

## 4. LRU Cache (`Problem4_LRUCache.js`)

**Problem Description:** Design a Least Recently Used (LRU) cache with `get` and `put` operations, both running in O(1) average time complexity.

### Optimal Approach: Hash Map (Map) + Doubly Linked List

**Logic:**
To achieve O(1) for both `get` and `put`, we need two properties:
1.  **O(1) lookup by key**: A Hash Map (`Map` in JavaScript) provides this.
2.  **O(1) ordering and eviction**: A Doubly Linked List (DLL) provides this.

We combine these two data structures:
*   **`cacheMap` (Map)**: Stores `key -> ListNode`. This allows direct O(1) access to any node in the DLL given its key.
*   **`cacheList` (Doubly Linked List)**: Stores the actual `(key, value)` data as `ListNode` objects.
    *   The **head** of the list (right after the dummy head) represents the **Most Recently Used (MRU)** item.
    *   The **tail** of the list (right before the dummy tail) represents the **Least Recently Used (LRU)** item.
    *   Using dummy head and tail nodes simplifies edge cases (empty list, single node).

**Operations:**

*   **`LRUCache(capacity)`:**
    *   Initializes `cacheMap`, `cacheList`, and `capacity`.
*   **`get(key)`:**
    1.  Check `cacheMap` for `key`.
    2.  If `key` not found, return -1.
    3.  If `key` found:
        *   Get the corresponding `ListNode` from `cacheMap`.
        *   **Crucially**: This item has just been accessed, so it becomes MRU. Move this `ListNode` to the front of `cacheList` using `cacheList.moveToFront(node)`.
        *   Return the node's `value`.
*   **`put(key, value)`:**
    1.  Check `cacheMap` for `key`.
    2.  **If `key` exists**:
        *   Get the existing `ListNode` from `cacheMap`.
        *   Update its `value`.
        *   **Crucially**: This item has just been modified, so it becomes MRU. Move this `ListNode` to the front of `cacheList`.
    3.  **If `key` does not exist**:
        *   Create a `new ListNode(key, value)`.
        *   Add this `newNode` to the front of `cacheList` (it's MRU).
        *   Add `key -> newNode` to `cacheMap`.
        *   **Check capacity**: If `cacheList.getLength()` now exceeds `capacity`:
            *   Evict the LRU item: Remove the node from the tail of `cacheList` using `cacheList.removeTail()`.
            *   Get the `key` of the evicted node and remove it from `cacheMap`.

**Why this is optimal:**
*   **Time Complexity: O(1)** for both `get` and `put`.
    *   `Map` operations (set, get, delete) are O(1) on average.
    *   `DoublyLinkedList` operations (addFront, removeNode, removeTail, moveToFront) are O(1) because pointers are directly updated without traversal.
*   **Space Complexity: O(Capacity)** - The `cacheMap` stores `Capacity` entries, and the `cacheList` stores `Capacity` nodes. Each node stores key, value, and two pointers. This is proportional to the cache's maximum size.

---

## 5. Moving Average from Data Stream (`Problem5_MovingAverageFromDataStream.js`)

**Problem Description:** Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window.

### Optimal Approach: Using a Queue

**Logic:**
The problem describes a "sliding window" scenario where we are interested in the *most recent `size` elements*. A Queue, being a FIFO (First-In, First-Out) data structure, is perfectly suited for this. When a new element enters the window, the oldest element must leave if the window is full.

1.  **Initialization**:
    *   Store the `size` of the window.
    *   Initialize a `Queue` (our custom `Queue` class) to hold the elements currently within the window.
    *   Initialize `currentSum` to 0. This will maintain the sum of all elements currently in the queue, allowing O(1) average calculation.

**Operations:**

*   **`next(val)`:**
    1.  **Add new value**:
        *   Add `val` to `currentSum`.
        *   Enqueue `val` into the `queue`.
    2.  **Handle window overflow**:
        *   If `queue.size()` > `this.size` (the maximum window size):
            *   Dequeue the oldest element (`oldestVal`).
            *   Subtract `oldestVal` from `currentSum`.
    3.  **Calculate average**:
        *   Return `currentSum / queue.size()`.

**Why this is optimal:**
*   **Time Complexity: O(1)** for `next()` operation.
    *   Queue `enqueue` (push to end) and `dequeue` (shift from beginning) operations are generally O(1) amortized for array-backed queues in modern JavaScript engines (though `shift()` can be O(N) in worst-case raw array implementations or for very large dense arrays, for typical interview constraints and window sizes, it's treated as constant).
    *   Sum updates and division are O(1).
*   **Space Complexity: O(size)** - The queue will store at most `size` elements, proportional to the window size.

---