# Problem Descriptions

This document outlines the problems addressed in the `stack_queue_interview_project`. Each problem description includes the problem statement, examples, and constraints. For detailed algorithm explanations, complexity analysis, and visual diagrams, please refer to `algorithm_explanation.md`.

---

## 1. Valid Parentheses

**Problem Statement:**
Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1.  Open brackets must be closed by the same type of brackets.
2.  Open brackets must be closed in the correct order.
3.  Every close bracket has a corresponding open bracket of the same type.

**Examples:**
```
Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "()[]{}"
Output: true

Example 3:
Input: s = "(]"
Output: false
```

**Constraints:**
*   `1 <= s.length <= 10^4`
*   `s` consists of parentheses only `'()[]{}'`.

---

## 2. Min Stack

**Problem Statement:**
Design a stack that supports `push`, `pop`, `top`, and retrieving the minimum element in constant time.

Implement the `MinStack` class:
*   `MinStack()` initializes the stack object.
*   `void push(int val)` pushes the element `val` onto the stack.
*   `void pop()` removes the element on the top of the stack.
*   `int top()` gets the top element of the stack.
*   `int getMin()` retrieves the minimum element in the stack.

Each function call should operate in O(1) time complexity.

**Example:**
```
Input
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]
Output
[null,null,null,null,-3,null,0,-2]

Explanation
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2
```

**Constraints:**
*   `-2^31 <= val <= 2^31 - 1`
*   Methods `pop`, `top`, and `getMin` operations will always be called on non-empty stacks.
*   At most `3 * 10^4` calls will be made to `push`, `pop`, `top`, and `getMin`.

---

## 3. Implement Queue using Stacks

**Problem Statement:**
Implement a first in, first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`).

Implement the `MyQueue` class:
*   `void push(int x)`: Pushes element `x` to the back of the queue.
*   `int pop()`: Removes the element from the front of the queue and returns it.
*   `int peek()`: Returns the element at the front of the queue.
*   `boolean empty()`: Returns `true` if the queue is empty, `false` otherwise.

**Notes:**
*   You must use only standard operations of a stack, which means only `push to top`, `peek/pop from top`, `size`, and `is empty` operations are valid.
*   Depending on your language, a stack may be implemented using a list or deque.

**Example:**
```
Input
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
Output
[null, null, null, 1, 1, false]

Explanation
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (left-most is front)
myQueue.peek();  // return 1
myQueue.pop();   // return 1, queue is [2]
myQueue.empty(); // return false
```

**Constraints:**
*   `1 <= x <= 9`
*   At most `100` calls will be made to `push`, `pop`, `peek`, and `empty`.
*   All calls to `pop` and `peek` are valid (i.e., the queue will not be empty when pop or peek is called).

---

## 4. Sliding Window Maximum

**Problem Statement:**
You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.

**Example:**
```
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation:
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
```

**Constraints:**
*   `1 <= nums.length <= 10^5`
*   `-10^4 <= nums[i] <= 10^4`
*   `1 <= k <= nums.length`

---

## 5. Rotten Oranges

**Problem Statement:**
You are given an `m x n` grid where each cell can have one of three values:
*   `0` representing an empty cell,
*   `1` representing a fresh orange, or
*   `2` representing a rotten orange.

Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no fresh oranges remain. If it is impossible to make all fresh oranges rotten, return `-1`.

**Example:**
```
Example 1:
Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4

Example 2:
Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
Explanation: The fresh orange at (2,0) (zero-indexed) cannot be reached.

Example 3:
Input: grid = [[0,2]]
Output: 0
Explanation: There are no fresh oranges, so 0 minutes is needed.
```

**Constraints:**
*   `m == grid.length`
*   `n == grid[i].length`
*   `1 <= m, n <= 10`
*   `grid[i][j]` is `0`, `1`, or `2`.

---