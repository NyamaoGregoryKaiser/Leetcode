```markdown
# Algorithm Explanations for Stack and Queue Problems

This document provides detailed explanations for the algorithms implemented in `src/algorithms/stack-queue-problems.js`, including problem statements, conceptual approaches, step-by-step logic, time/space complexity analysis, and ASCII diagrams where appropriate.

---

## 1. Implement Queue using Stacks (LeetCode 232)

### Problem Statement
Implement a first-in-first-out (FIFO) queue using only two last-in-first-out (LIFO) stacks. The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`).

### Conceptual Approach
The core idea is to use one stack (`inStack`) for `push` operations and another stack (`outStack`) for `pop` and `peek` operations. When a `pop` or `peek` is requested, and `outStack` is empty, we transfer all elements from `inStack` to `outStack`. This reversal ensures that the element that was pushed first (FIFO order) ends up at the top of `outStack`, ready to be popped.

### Step-by-Step Logic

#### `MyQueue` Class Structure:
*   `inStack`: A `Stack` instance used for `push` operations. New elements are always pushed here.
*   `outStack`: A `Stack` instance used for `pop` and `peek` operations. It stores elements in reverse order, so the oldest element is at its top.

#### `push(x)`:
1.  Simply push `x` onto `inStack`. This is an O(1) operation.

#### `pop()`:
1.  Call the helper method `_transferElements()` to ensure `outStack` is populated if it's empty.
2.  Pop the top element from `outStack` and return it. This is an O(1) operation.

#### `peek()`:
1.  Call the helper method `_transferElements()` to ensure `outStack` is populated if it's empty.
2.  Peek at the top element of `outStack` and return it. This is an O(1) operation.

#### `empty()`:
1.  Return `true` if both `inStack` and `outStack` are empty, `false` otherwise. This is an O(1) operation.

#### `_transferElements()` (Helper):
1.  Check if `outStack` is empty. If it's not, do nothing (elements are already in correct order for popping).
2.  If `outStack` *is* empty, continuously pop elements from `inStack` and push them onto `outStack` until `inStack` is empty.
    *   Example: `inStack = [1, 2, 3]` (1 is oldest, at bottom).
    *   Pop 3 from `inStack`, push to `outStack`: `inStack = [1, 2]`, `outStack = [3]`
    *   Pop 2 from `inStack`, push to `outStack`: `inStack = [1]`, `outStack = [3, 2]`
    *   Pop 1 from `inStack`, push to `outStack`: `inStack = []`, `outStack = [3, 2, 1]`
    *   Now, `outStack` has `1` at its top, which is the oldest element, correctly simulating FIFO.

### Time and Space Complexity

*   **`push`**: O(1) amortized. A single stack `push` is O(1).
*   **`pop`**: O(1) amortized. In the worst case (when `outStack` is empty), transferring `N` elements from `inStack` to `outStack` takes O(N). However, each element is moved at most once across the two stacks over its lifetime. So, a sequence of `M` operations will take O(M) time, making each operation O(1) on average.
*   **`peek`**: O(1) amortized (same as `pop`).
*   **`empty`**: O(1).
*   **Space Complexity**: O(N) where `N` is the total number of elements currently in the queue. In the worst case, all elements might be in `inStack` or `outStack`.

### ASCII Diagram (Example)

```
Initial:
inStack: []
outStack: []

Push 1:
inStack: [1]
outStack: []

Push 2:
inStack: [1, 2]
outStack: []

Push 3:
inStack: [1, 2, 3]
outStack: []

Pop (outStack is empty, transfer from inStack):
inStack: [1, 2] <- pop 3
outStack: [3]

inStack: [1] <- pop 2
outStack: [3, 2]

inStack: [] <- pop 1
outStack: [3, 2, 1]

Result of Pop: 1
inStack: []
outStack: [3, 2] <- pop 1

Peek (outStack not empty):
inStack: []
outStack: [3, 2]
Peek Result: 2

Push 4:
inStack: [4]
outStack: [3, 2]

Pop (outStack not empty):
Result of Pop: 2
inStack: [4]
outStack: [3] <- pop 2
```

---

## 2. Implement Stack using Queues (LeetCode 225)

### Problem Statement
Implement a last-in-first-out (LIFO) stack using only two first-in-first-out (FIFO) queues. The implemented stack should support all the functions of a normal stack (`push`, `top`, `pop`, and `empty`).

### Conceptual Approach (Push O(N), Pop O(1))
This approach prioritizes O(1) for `pop` and `top`, which are frequently accessed stack operations. The key is to always keep the most recently pushed element at the *front* of the primary queue (`q1`). This requires reordering elements during a `push` operation.

### Step-by-Step Logic

#### `MyStack` Class Structure:
*   `q1`: A `Queue` instance, serves as the primary storage. It always keeps the stack's top element at its front.
*   `q2`: A `Queue` instance, an auxiliary queue used for temporarily holding elements during `push` reordering.

#### `push(x)`:
1.  **Enqueue `x` to `q1`**: Add the new element `x` to the back of `q1`. At this point, `q1` contains `[old_top, ..., old_bottom, x]`.
2.  **Move existing elements to `q2`**: Dequeue all elements from `q1` *except* for the newly added `x` and enqueue them into `q2`.
    *   `q1` becomes `[x]`.
    *   `q2` becomes `[old_top, ..., old_bottom]`.
3.  **Move elements back to `q1`**: Dequeue all elements from `q2` and enqueue them back into `q1`.
    *   `q1` becomes `[x, old_top, ..., old_bottom]`.
    *   `q2` becomes `[]`.
    Now, `x` is at the front of `q1`, correctly making it the new top of the stack.

#### `pop()`:
1.  Since `q1` always has the top element at its front, simply dequeue from `q1` and return it. This is an O(1) operation.

#### `top()`:
1.  Simply peek at the front element of `q1` and return it. This is an O(1) operation.

#### `empty()`:
1.  Return `true` if `q1` is empty, `false` otherwise. This is an O(1) operation.

### Time and Space Complexity

*   **`push`**: O(N) where `N` is the current number of elements in the stack. Each push involves dequeuing and enqueuing all existing `N` elements twice.
*   **`pop`**: O(1).
*   **`top`**: O(1).
*   **`empty`**: O(1).
*   **Space Complexity**: O(N) where `N` is the total number of elements currently in the stack. All elements reside in `q1`.

### Alternative Approach: Push O(1), Pop O(N)
*   **`push(x)`**: Simply enqueue `x` to `q1`. O(1).
*   **`pop()`**: To remove the top element, you must dequeue all elements from `q1` *except* the last one, and enqueue them into `q2`. The last remaining element in `q1` is the actual top. Dequeue it and return. Then, swap `q1` and `q2` (e.g., assign `q1 = q2`, then `q2 = new Queue()`). This takes O(N) operations.
*   **`top()`**: Similar to `pop()`, but after identifying the last element, enqueue it back to `q2` before swapping. O(N).

The chosen approach (Push O(N), Pop O(1)) is generally preferred in interviews if pop/top operations are expected to be frequent, as O(1) access for these is very efficient.

### ASCII Diagram (Example)

```
Initial:
q1: []
q2: []

Push 1:
1. q1.enqueue(1)   => q1: [1], q2: []
2. q1.size() is 1, so loop `while (currentSize > 1)` does not run.
3. q2 is empty, so loop `while (!q2.isEmpty())` does not run.
q1: [1] (1 is top)

Push 2:
1. q1.enqueue(2)   => q1: [1, 2], q2: []
2. q1.size() is 2. `currentSize = 2`.
   - `while (currentSize > 1)` (currentSize=2 > 1):
     q2.enqueue(q1.dequeue()) => q2: [1], q1: [2]
     `currentSize` becomes 1. Loop exits.
3. `while (!q2.isEmpty())`:
   q1.enqueue(q2.dequeue()) => q1: [2, 1], q2: []
q1: [2, 1] (2 is top)

Push 3:
1. q1.enqueue(3)   => q1: [2, 1, 3], q2: []
2. q1.size() is 3. `currentSize = 3`.
   - `while (currentSize > 1)` (currentSize=3 > 1):
     q2.enqueue(q1.dequeue()) => q2: [2], q1: [1, 3]
     `currentSize` becomes 2.
   - `while (currentSize > 1)` (currentSize=2 > 1):
     q2.enqueue(q1.dequeue()) => q2: [2, 1], q1: [3]
     `currentSize` becomes 1. Loop exits.
3. `while (!q2.isEmpty())`:
   q1.enqueue(q2.dequeue()) => q1: [3, 2], q2: [1]
   q1.enqueue(q2.dequeue()) => q1: [3, 2, 1], q2: []
q1: [3, 2, 1] (3 is top)

Pop:
q1.dequeue() => 3
q1: [2, 1] (2 is top)

Top:
q1.peek() => 2
q1: [2, 1] (2 is top)
```

---

## 3. Valid Parentheses (LeetCode 20)

### Problem Statement
Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid. An input string is valid if:
1.  Open brackets must be closed by the same type of brackets.
2.  Open brackets must be closed in the correct order.
3.  Every close bracket has a corresponding open bracket of the same type.

### Conceptual Approach
This is a classic problem perfectly suited for a stack. We process the string character by character.
*   When we see an opening bracket, we push it onto the stack. This signifies that we're expecting a matching closing bracket later.
*   When we see a closing bracket, we check the top of the stack. If the stack is empty, there's no opening bracket to match, so it's invalid. Otherwise, we pop the top element and check if it's the correct type of opening bracket for the current closing one. If not, it's invalid.
*   After processing the entire string, if the stack is empty, all opening brackets were correctly closed, and the string is valid. If the stack is not empty, there are unclosed opening brackets, making the string invalid.

### Step-by-Step Logic

1.  Initialize an empty `Stack`.
2.  Create a `bracketMap` (e.g., an object or hash map) that maps each opening bracket to its corresponding closing bracket: `{ '(': ')', '{': '}', '[': ']' }`.
3.  Iterate through each character `char` in the input string `s`:
    *   **If `char` is an opening bracket** (i.e., `bracketMap[char]` exists):
        *   Push `char` onto the stack.
    *   **Else (`char` is a closing bracket)**:
        *   **Check for empty stack**: If `stack.isEmpty()` is `true`, it means we encountered a closing bracket without a preceding opening bracket. Return `false`.
        *   **Pop and Match**: Pop the top element from the stack (`lastOpenBracket`).
        *   **Check for type mismatch**: Compare `bracketMap[lastOpenBracket]` with `char`. If they are not equal, it means the closing bracket doesn't match the type of the last opened bracket. Return `false`.
4.  After the loop finishes, **check if the stack is empty**:
    *   If `stack.isEmpty()` is `true`, all opening brackets have been correctly matched and closed. Return `true`.
    *   If `stack.isEmpty()` is `false`, there are unclosed opening brackets left in the stack. Return `false`.

### Time and Space Complexity

*   **Time Complexity**: O(N) where `N` is the length of the input string `s`. We iterate through the string once, and each stack operation (`push`, `pop`, `peek`, `isEmpty`) takes O(1) time.
*   **Space Complexity**: O(N) in the worst case. For a string like "((((((", the stack will hold all `N` opening brackets. In the best case (e.g., "()()()"), the stack size remains constant, leading to O(1) space.

### ASCII Diagram (Example: `s = "([{}])"`)

```
String: "([{}])"

1. char = '('
   - Is opening. Push '('.
   Stack: ['(']

2. char = '['
   - Is opening. Push '['.
   Stack: ['(', '[']

3. char = '{'
   - Is opening. Push '{'.
   Stack: ['(', '[', '{']

4. char = '}'
   - Is closing. Stack not empty. Pop. lastOpenBracket = '{'.
   - bracketMap['{'] === '}' (true). Match.
   Stack: ['(', '[']

5. char = ']'
   - Is closing. Stack not empty. Pop. lastOpenBracket = '['.
   - bracketMap['['] === ']' (true). Match.
   Stack: ['(']

6. char = ')'
   - Is closing. Stack not empty. Pop. lastOpenBracket = '('.
   - bracketMap['('] === ')' (true). Match.
   Stack: []

End of string. Stack is empty. Return `true`.
```

---

## 4. Sliding Window Maximum (LeetCode 239)

### Problem Statement
You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.

Example:
`nums = [1,3,-1,-3,5,3,6,7]`, `k = 3`
Output: `[3,3,5,5,6,7]`

### Conceptual Approach: Monotonic Deque
A naive approach would be to iterate through each window and find the maximum (O(N*K)). We need something more efficient. A monotonic deque (double-ended queue) is the perfect data structure for this.

The deque will store *indices* of elements from `nums` within the current window. Crucially, these indices will correspond to elements that are in *decreasing order* from the front to the back of the deque.
*   The element at the front of the deque will always be the maximum for the current window.
*   Elements at the back are smaller or equal, and potentially older.

### Step-by-Step Logic

1.  Initialize an empty `Deque` (our custom `Deque` supports O(1) ops from both ends). This deque will store indices.
2.  Initialize an empty `result` array to store the maximums of each window.
3.  Iterate through the `nums` array using an index `i` from `0` to `nums.length - 1`:

    a.  **Remove elements outside the window (from front):**
        *   If the deque is not empty AND the index at the front of the deque (`deque.peekFront()`) is less than or equal to `i - k`, it means this element's index is no longer within the current window `[i - k + 1, ..., i]`.
        *   Remove it from the front of the deque (`deque.removeFront()`).

    b.  **Maintain monotonic decreasing order (from back):**
        *   While the deque is not empty AND `nums[i]` (the current element) is greater than or equal to the element at the index at the back of the deque (`nums[deque.peekBack()]`):
            *   Remove the index from the back of the deque (`deque.removeBack()`).
        *   This step ensures that if a new element `nums[i]` is larger than or equal to existing elements at the back of the deque, those smaller/older elements are irrelevant as they can no longer be the maximum. The deque maintains only potentially useful candidates, in decreasing order.

    c.  **Add current element's index:**
        *   Add the current index `i` to the back of the deque (`deque.addBack(i)`).

    d.  **Record maximum for current window:**
        *   If `i` is greater than or equal to `k - 1` (meaning the first full window has been formed or the window is now sliding):
            *   The maximum element in the current window is `nums[deque.peekFront()]` (because the deque is monotonically decreasing, the front holds the largest element's index).
            *   Add this value to the `result` array.

4.  After the loop, return the `result` array.

### Time and Space Complexity

*   **Time Complexity**: O(N) where `N` is the length of `nums`. Each element in `nums` is added to the deque exactly once and removed from the deque at most twice (once from the back for being smaller, once from the front for being out of window). Thus, operations are amortized O(1) per element.
*   **Space Complexity**: O(K) in the worst case. The deque can store at most `k` elements (indices) if the elements within a window are strictly decreasing (e.g., `[k, k-1, ..., 1]`).

### ASCII Diagram (Example: `nums = [1,3,-1,-3,5,3,6,7], k = 3`)

```
nums: [ 1,  3, -1, -3,  5,  3,  6,  7 ]
idx:   0   1   2   3    4   5   6   7
k = 3

result = []
deque = []

i = 0, nums[0] = 1
  - window start = 0-3+1 = -2. deque empty or front > -2. (No removal)
  - deque empty.
  - addBack(0)      => deque: [0] (nums[0]=1)
  - i=0 < k-1=2. (No result)
  deque state: [0]

i = 1, nums[1] = 3
  - window start = 1-3+1 = -1. deque empty or front > -1. deque.peekFront()=0 > -1. (No removal)
  - nums[1]=3 > nums[deque.peekBack()]=nums[0]=1. removeBack(0) => deque: []
  - addBack(1)      => deque: [1] (nums[1]=3)
  - i=1 < k-1=2. (No result)
  deque state: [1]

i = 2, nums[2] = -1
  - window start = 2-3+1 = 0. deque.peekFront()=1 > 0. (No removal)
  - nums[2]=-1 < nums[deque.peekBack()]=nums[1]=3. (No removal)
  - addBack(2)      => deque: [1, 2] (nums[1]=3, nums[2]=-1)
  - i=2 >= k-1=2. window fully formed. result.push(nums[deque.peekFront()]) => result.push(nums[1]=3)
  result: [3]
  deque state: [1, 2]

i = 3, nums[3] = -3
  - window start = 3-3+1 = 1. deque.peekFront()=1 <= 1. removeFront(1) => deque: [2]
  - nums[3]=-3 < nums[deque.peekBack()]=nums[2]=-1. (No removal)
  - addBack(3)      => deque: [2, 3] (nums[2]=-1, nums[3]=-3)
  - i=3 >= k-1=2. result.push(nums[deque.peekFront()]) => result.push(nums[2]=-1) => result.push(-1)
  Wait, expected is [3,3,...]. What went wrong?
  Ah, nums[2] is -1. Max is not -1. Max should be nums[1]=3. The front was removed.

Let's retrace the `deque.peekFront() <= i - k` condition.
Window `[i - k + 1, i]`
For i=3, k=3, window is `[1, 2, 3]`.
Indices in deque: `[1, 2]`
`deque.peekFront() = 1`. `i-k = 3-3 = 0`.
`1 <= 0` is FALSE. So `1` should *not* be removed. The index `1` (value 3) is still in window `[1,2,3]`.
The condition `deque.peekFront() <= i - k` should be `deque.peekFront() < i - k + 1`.

Correct logic for `i=3, k=3`:
Window is `[nums[1], nums[2], nums[3]]`. Indices `1, 2, 3`.
Current `i = 3`.
Elements in deque before `i=3` processing: `[1, 2]` (corresponds to values 3, -1)

i = 3, nums[3] = -3
  - Remove elements outside window: `deque.peekFront()=1`. Current window starts at `i-k+1 = 3-3+1 = 1`.
    `1 < 1` is FALSE. So `1` is NOT removed. (This was the bug in my manual trace.)
  - Maintain monotonic decreasing: `nums[3]=-3` is not `>= nums[deque.peekBack()]=nums[2]=-1`. (No removal from back)
  - Add current index: `addBack(3)`. => deque: `[1, 2, 3]` (nums[1]=3, nums[2]=-1, nums[3]=-3)
  - Window formed: `i=3 >= k-1=2`. `result.push(nums[deque.peekFront()])` => `result.push(nums[1]=3)`.
  result: `[3, 3]`
  deque state: `[1, 2, 3]`

i = 4, nums[4] = 5
  - Remove elements outside window: `deque.peekFront()=1`. Current window starts at `i-k+1 = 4-3+1 = 2`.
    `1 < 2` is TRUE. Remove `1` from front. => deque: `[2, 3]`
  - Maintain monotonic decreasing: `nums[4]=5`.
    `5 >= nums[deque.peekBack()]=nums[3]=-3`. Remove `3`. => deque: `[2]`
    `5 >= nums[deque.peekBack()]=nums[2]=-1`. Remove `2`. => deque: `[]`
  - Add current index: `addBack(4)`. => deque: `[4]` (nums[4]=5)
  - Window formed: `i=4 >= k-1=2`. `result.push(nums[deque.peekFront()])` => `result.push(nums[4]=5)`.
  result: `[3, 3, 5]`
  deque state: `[4]`

i = 5, nums[5] = 3
  - Remove elements outside window: `deque.peekFront()=4`. Current window starts at `i-k+1 = 5-3+1 = 3`.
    `4 < 3` is FALSE. (No removal)
  - Maintain monotonic decreasing: `nums[5]=3` is not `>= nums[deque.peekBack()]=nums[4]=5`. (No removal from back)
  - Add current index: `addBack(5)`. => deque: `[4, 5]` (nums[4]=5, nums[5]=3)
  - Window formed: `i=5 >= k-1=2`. `result.push(nums[deque.peekFront()])` => `result.push(nums[4]=5)`.
  result: `[3, 3, 5, 5]`
  deque state: `[4, 5]`

i = 6, nums[6] = 6
  - Remove elements outside window: `deque.peekFront()=4`. Current window starts at `i-k+1 = 6-3+1 = 4`.
    `4 < 4` is FALSE. (No removal)
  - Maintain monotonic decreasing: `nums[6]=6`.
    `6 >= nums[deque.peekBack()]=nums[5]=3`. Remove `5`. => deque: `[4]`
    `6 >= nums[deque.peekBack()]=nums[4]=5`. Remove `4`. => deque: `[]`
  - Add current index: `addBack(6)`. => deque: `[6]` (nums[6]=6)
  - Window formed: `i=6 >= k-1=2`. `result.push(nums[deque.peekFront()])` => `result.push(nums[6]=6)`.
  result: `[3, 3, 5, 5, 6]`
  deque state: `[6]`

i = 7, nums[7] = 7
  - Remove elements outside window: `deque.peekFront()=6`. Current window starts at `i-k+1 = 7-3+1 = 5`.
    `6 < 5` is FALSE. (No removal)
  - Maintain monotonic decreasing: `nums[7]=7`.
    `7 >= nums[deque.peekBack()]=nums[6]=6`. Remove `6`. => deque: `[]`
  - Add current index: `addBack(7)`. => deque: `[7]` (nums[7]=7)
  - Window formed: `i=7 >= k-1=2`. `result.push(nums[deque.peekFront()])` => `result.push(nums[7]=7)`.
  result: `[3, 3, 5, 5, 6, 7]`
  deque state: `[7]`

End loop. Return `[3, 3, 5, 5, 6, 7]`. This matches the expected output.

---

## 5. Trapping Rain Water (LeetCode 42)

### Problem Statement
Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.

Example: `height = [0,1,0,2,1,0,1,3,2,1,2,1]`
Output: `6`

### Conceptual Approach: Monotonic Stack
The two-pointer approach is another common solution for this, but a monotonic stack provides a very elegant way to solve this. The idea is to iterate through the heights and use a stack to keep track of bars that *could* potentially trap water.

We maintain a *monotonically decreasing* stack of bar indices. When we encounter a bar `height[i]` that is *taller* than the bar at the top of the stack (`height[stack.peek()]`), it means we've found a right boundary for a "well". The popped element `stack.pop()` becomes the bottom of this well, and the new top of the stack `stack.peek()` becomes the left boundary.

### Step-by-Step Logic

1.  Initialize `water = 0` to accumulate the total trapped water.
2.  Initialize an empty `Stack`. This stack will store indices of bars.
3.  Iterate through the `height` array with index `i` from `0` to `height.length - 1`:

    a.  **Process potential wells:**
        *   While the stack is *not empty* AND the current bar `height[i]` is *greater than* the height of the bar at the top of the stack (`height[stack.peek()]`):
            *   This means `height[i]` can act as a right wall for a well.
            *   **Pop `prevIdx`**: Let `prevIdx = stack.pop()`. This `prevIdx` represents the index of the bar at the bottom of the current well.
            *   **Check for left boundary**: If the stack becomes empty after popping `prevIdx`, it means there's no left boundary for this well. So, no water can be trapped with this `prevIdx` as the bottom. `break` from this inner `while` loop.
            *   **Identify `leftIdx`**: Otherwise, `leftIdx = stack.peek()`. This is the index of the bar forming the left wall of the well.
            *   **Calculate `distance` (width of the well)**: `distance = i - leftIdx - 1`. This is the number of units between the left and right walls, excluding the walls themselves.
            *   **Calculate `trappedHeight`**: `trappedHeight = Math.min(height[i], height[leftIdx]) - height[prevIdx]`. The water level is limited by the shorter of the two walls (`height[i]` and `height[leftIdx]`), and the water is trapped *above* the `height[prevIdx]` bar.
            *   **Add water**: `water += distance * trappedHeight`.

    b.  **Push current bar's index:**
        *   Push the current index `i` onto the stack. This maintains the monotonic decreasing property (or adds it as a candidate for a future left boundary).

4.  After the loop finishes, return the total `water` trapped.

### Time and Space Complexity

*   **Time Complexity**: O(N) where `N` is the length of the `height` array. Each bar's index is pushed onto the stack at most once and popped from the stack at most once.
*   **Space Complexity**: O(N) in the worst case. If the `height` array is strictly decreasing (e.g., `[5, 4, 3, 2, 1]`), all elements will be pushed onto the stack before any are popped, leading to a stack size of N.

### ASCII Diagram (Example: `height = [0,1,0,2,1,0,1,3,2,1,2,1]`)

```
height: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
idx:     0  1  2  3  4  5  6  7  8  9 10 11

water = 0
stack = []

i = 0, height[0] = 0
  - Stack is empty. Push 0.
  stack: [0]

i = 1, height[1] = 1
  - height[1]=1 > height[stack.peek()=0]=0.
    - pop prevIdx = 0.
    - stack is empty. Break from while loop.
  - Push 1.
  stack: [1]

i = 2, height[2] = 0
  - height[2]=0 < height[stack.peek()=1]=1. (No pop)
  - Push 2.
  stack: [1, 2]

i = 3, height[3] = 2
  - height[3]=2 > height[stack.peek()=2]=0.
    - pop prevIdx = 2.
    - stack not empty. leftIdx = stack.peek()=1.
    - distance = i - leftIdx - 1 = 3 - 1 - 1 = 1.
    - trappedHeight = min(height[3]=2, height[1]=1) - height[2]=0 = 1 - 0 = 1.
    - water += 1 * 1 = 1.
  - stack: [1]. height[3]=2 > height[stack.peek()=1]=1.
    - pop prevIdx = 1.
    - stack is empty. Break from while loop.
  - Push 3.
  water: 1
  stack: [3]

i = 4, height[4] = 1
  - height[4]=1 < height[stack.peek()=3]=2. (No pop)
  - Push 4.
  stack: [3, 4]

i = 5, height[5] = 0
  - height[5]=0 < height[stack.peek()=4]=1. (No pop)
  - Push 5.
  stack: [3, 4, 5]

i = 6, height[6] = 1
  - height[6]=1 > height[stack.peek()=5]=0.
    - pop prevIdx = 5.
    - stack not empty. leftIdx = stack.peek()=4.
    - distance = i - leftIdx - 1 = 6 - 4 - 1 = 1.
    - trappedHeight = min(height[6]=1, height[4]=1) - height[5]=0 = 1 - 0 = 1.
    - water += 1 * 1 = 2.
  - stack: [3, 4]. height[6]=1 == height[stack.peek()=4]=1. (No pop - condition is `>`)
  - Push 6.
  water: 2
  stack: [3, 4, 6]

i = 7, height[7] = 3
  - height[7]=3 > height[stack.peek()=6]=1.
    - pop prevIdx = 6.
    - stack not empty. leftIdx = stack.peek()=4.
    - distance = i - leftIdx - 1 = 7 - 4 - 1 = 2.
    - trappedHeight = min(height[7]=3, height[4]=1) - height[6]=1 = 1 - 1 = 0.
    - water += 2 * 0 = 2.
  - stack: [3, 4]. height[7]=3 > height[stack.peek()=4]=1.
    - pop prevIdx = 4.
    - stack not empty. leftIdx = stack.peek()=3.
    - distance = i - leftIdx - 1 = 7 - 3 - 1 = 3.
    - trappedHeight = min(height[7]=3, height[3]=2) - height[4]=1 = 2 - 1 = 1.
    - water += 3 * 1 = 5.
  - stack: [3]. height[7]=3 > height[stack.peek()=3]=2.
    - pop prevIdx = 3.
    - stack is empty. Break from while loop.
  - Push 7.
  water: 5
  stack: [7]

i = 8, height[8] = 2
  - height[8]=2 < height[stack.peek()=7]=3. (No pop)
  - Push 8.
  stack: [7, 8]

i = 9, height[9] = 1
  - height[9]=1 < height[stack.peek()=8]=2. (No pop)
  - Push 9.
  stack: [7, 8, 9]

i = 10, height[10] = 2
  - height[10]=2 > height[stack.peek()=9]=1.
    - pop prevIdx = 9.
    - stack not empty. leftIdx = stack.peek()=8.
    - distance = i - leftIdx - 1 = 10 - 8 - 1 = 1.
    - trappedHeight = min(height[10]=2, height[8]=2) - height[9]=1 = 2 - 1 = 1.
    - water += 1 * 1 = 6.
  - stack: [7, 8]. height[10]=2 == height[stack.peek()=8]=2. (No pop)
  - Push 10.
  water: 6
  stack: [7, 8, 10]

i = 11, height[11] = 1
  - height[11]=1 < height[stack.peek()=10]=2. (No pop)
  - Push 11.
  water: 6
  stack: [7, 8, 10, 11]

End of loop. Final water trapped: 6.
```
This matches the expected output.
```