```markdown
# Stack and Queue Interview Project: Detailed Algorithm Explanations

This document provides in-depth explanations for each problem, covering the rationale behind the solutions, step-by-step logic, complexity analysis, and illustrative ASCII diagrams where helpful.

---

## 1. Implement Queue using Stacks (`MyQueue`)

### Problem Statement
Implement a first-in-first-out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, `empty`).

### High-Level Idea
The core challenge is transforming the LIFO behavior of stacks into FIFO behavior. We can achieve this by using one stack (`inStack`) for pushing new elements (enqueue) and another stack (`outStack`) for popping/peeking elements (dequeue). When `outStack` becomes empty, all elements are transferred from `inStack` to `outStack` to reverse their order, effectively making the first element pushed to `inStack` (which is at the bottom of `inStack`) appear at the top of `outStack`.

### Solution Approach: Two Stacks

#### Step-by-step Logic

1.  **`push(x)` operation (Enqueue):**
    *   Simply push the new element `x` onto `inStack`. This is an O(1) operation.
    *   `inStack` always holds new elements ready to be transferred.

2.  **`pop()` operation (Dequeue):**
    *   First, check if `outStack` is empty.
    *   If `outStack` is empty, it means we need to "reverse" the elements from `inStack` into `outStack`. This is done by popping all elements from `inStack` and pushing them onto `outStack`. After this transfer, the element that was pushed first into `inStack` will now be at the top of `outStack`.
    *   Once `outStack` is guaranteed to have elements (either it wasn't empty initially, or elements were transferred), pop the top element from `outStack`. This is an O(1) operation *after* potential transfer.

3.  **`peek()` operation (Front Element):**
    *   Similar to `pop()`, first ensure `outStack` is not empty by potentially transferring elements from `inStack`.
    *   Then, `peek` at the top element of `outStack`. This is an O(1) operation *after* potential transfer.

4.  **`empty()` operation:**
    *   The queue is empty if and only if both `inStack` and `outStack` are empty.

#### ASCII Diagram for `push` and `pop`

Let's trace `push(1), push(2), push(3), pop(), push(4), pop()`

```
Initial:
inStack: []
outStack: []

push(1):
inStack: [1]
outStack: []

push(2):
inStack: [1, 2]
outStack: []

push(3):
inStack: [1, 2, 3]  (bottom -> top)
outStack: []

pop():
  outStack is empty, transfer from inStack:
  1. Pop 3 from inStack, push to outStack: inStack: [1, 2], outStack: [3]
  2. Pop 2 from inStack, push to outStack: inStack: [1], outStack: [3, 2]
  3. Pop 1 from inStack, push to outStack: inStack: [], outStack: [3, 2, 1] (bottom -> top, so 1 is at top)
  Now pop from outStack: pop 1. Result: 1
inStack: []
outStack: [3, 2]

push(4):
inStack: [4]
outStack: [3, 2]

pop():
  outStack is NOT empty. Pop from outStack: pop 2. Result: 2
inStack: [4]
outStack: [3]
```

### Complexity Analysis

*   **Time Complexity:**
    *   `push`: O(1). We just push to `inStack`.
    *   `pop`, `peek`: Amortized O(1).
        *   A single `pop` or `peek` operation might take O(N) time in the worst case (when elements are transferred from `inStack` to `outStack`). However, each element is pushed onto `inStack` once, and popped from `inStack` once, then pushed onto `outStack` once, and finally popped from `outStack` once. Across a sequence of N operations, each element undergoes a constant number of stack operations. Thus, the total time for N operations is O(N), making the amortized time for each operation O(1).
*   **Space Complexity:** O(N), where N is the total number of elements currently in the queue. In the worst case, all elements might reside in `inStack` or `outStack`, or split between them.

### Edge Cases and Gotchas

*   **Empty queue:** `pop()` or `peek()` on an empty queue should ideally throw an exception or handle it according to problem spec (e.g., return null). Our implementation will use `java.util.Stack` which handles this by throwing `EmptyStackException`.
*   **Mixed operations:** The amortized analysis holds true even with mixed `push` and `pop` operations. The cost of transferring elements is distributed over the `push` operations that loaded `inStack`.

---

## 2. Implement Stack using Queues (`MyStack`)

### Problem Statement
Implement a last-in-first-out (LIFO) stack using only one or two queues. The implemented stack should support all the functions of a normal stack (`push`, `top`, `pop`, `empty`).

### High-Level Idea
To simulate LIFO using FIFO queues, the trick is to ensure that the most recently added element (which should be the "top" of the stack) is always at the front of the queue, ready for `pop` or `top` operations.

### Solution Approach: One Queue

We'll use a single `LinkedList` which implements the `Queue` interface.

#### Step-by-step Logic

1.  **`push(x)` operation:**
    *   Add the new element `x` to the rear of the queue (`q.offer(x)`).
    *   Now, to make `x` the front element (top of the stack), we need to move all elements that were *before* `x` to the rear of the queue. We do this by repeatedly removing elements from the front and adding them to the rear, `q.size() - 1` times.
    *   This ensures `x` becomes the new front.
    *   This is an O(N) operation because we move all existing elements.

2.  **`pop()` operation:**
    *   Simply remove and return the element from the front of the queue (`q.poll()`). This is an O(1) operation.

3.  **`top()` operation:**
    *   Simply peek at the element at the front of the queue (`q.peek()`). This is an O(1) operation.

4.  **`empty()` operation:**
    *   The stack is empty if and only if the queue is empty.

#### ASCII Diagram for `push` operation

Let's trace `push(1), push(2), push(3)`

```
Initial:
q: []

push(1):
  q.offer(1) -> q: [1]
  Loop 0 times (size-1 = 0)
q: [1] (Top is 1)

push(2):
  q.offer(2) -> q: [1, 2]
  Loop (size-1 = 1) time:
    q.offer(q.poll()) -> q.offer(1) -> q: [2, 1]
q: [2, 1] (Top is 2)

push(3):
  q.offer(3) -> q: [2, 1, 3]
  Loop (size-1 = 2) times:
    q.offer(q.poll()) -> q.offer(2) -> q: [1, 3, 2]
    q.offer(q.poll()) -> q.offer(1) -> q: [3, 2, 1]
q: [3, 2, 1] (Top is 3)
```

### Complexity Analysis

*   **Time Complexity:**
    *   `push`: O(N), where N is the current number of elements in the stack. This is because we add the new element and then rotate all N-1 previous elements.
    *   `pop`, `top`: O(1). We just perform a standard queue `poll` or `peek` operation.
*   **Space Complexity:** O(N), where N is the total number of elements in the stack.

### Edge Cases and Gotchas

*   **Empty stack:** `pop()` or `top()` on an empty stack should be handled. `java.util.Queue.poll()` returns null for empty, `peek()` also returns null.
*   **Performance Trade-off**: This approach prioritizes O(1) for `pop`/`top` at the cost of O(N) for `push`. An alternative using two queues could make `push` O(1) and `pop`/`top` O(N). The one-queue approach is often preferred for its simplicity and fewer data structure manipulations.

---

## 3. Valid Parentheses (`StackAndQueueProblems::isValid`)

### Problem Statement
Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if:
1.  Open brackets must be closed by the same type of brackets.
2.  Open brackets must be closed in the correct order.
3.  Every close bracket has a corresponding open bracket of the same type.

### High-Level Idea
This is a classic application of a stack. When we encounter an opening bracket, we push it onto the stack, expecting its corresponding closing bracket later. When we encounter a closing bracket, we check the top of the stack. If it's the matching opening bracket, we pop it. If not, or if the stack is empty, the string is invalid. At the end, if the stack is empty, all brackets were matched correctly.

### Solution Approach: Using a Stack

#### Step-by-step Logic

1.  Initialize an empty `Stack<Character>`.
2.  Iterate through each character `c` in the input string `s`.
3.  **If `c` is an opening bracket ('(', '{', '['):**
    *   Push `c` onto the stack.
4.  **If `c` is a closing bracket (')', '}', ']'):**
    *   **Check for empty stack:** If the stack is empty, it means we encountered a closing bracket without a corresponding open bracket. The string is invalid, return `false`.
    *   **Check for match:** Pop the top character from the stack. Let this be `topChar`.
    *   Compare `c` with `topChar`.
        *   If `c` is ')' and `topChar` is not '(', return `false`.
        *   If `c` is '}' and `topChar` is not '{', return `false`.
        *   If `c` is ']' and `topChar` is not '[', return `false`.
    *   If they match, continue to the next character.
5.  **After iterating through the entire string:**
    *   If the stack is empty, it means all opening brackets have been correctly closed. The string is valid, return `true`.
    *   If the stack is not empty, it means there are unmatched opening brackets left. The string is invalid, return `false`.

#### ASCII Diagram

Let's trace `s = "({[]})"`

```
String: " ( { [ ] } ) "
Stack: []

Char '(': push '('
Stack: ['(']

Char '{': push '{'
Stack: ['(', '{']

Char '[': push '['
Stack: ['(', '{', '[']

Char ']': stack.peek() -> '['. Match ']' with '['. Pop '['.
Stack: ['(', '{']

Char '}': stack.peek() -> '{'. Match '}' with '{'. Pop '{'.
Stack: ['(']

Char ')': stack.peek() -> '('. Match ')' with '('. Pop '('.
Stack: []

End of string. Stack is empty. Result: true.
```

Let's trace `s = "([)]"`

```
String: " ( [ ) ] "
Stack: []

Char '(': push '('
Stack: ['(']

Char '[': push '['
Stack: ['(', '[']

Char ')': stack.peek() -> '['. Does ')' match '['? No. Result: false.
```

### Complexity Analysis

*   **Time Complexity:** O(N), where N is the length of the input string. We iterate through the string once, and each stack operation (push, pop, peek, empty) takes O(1) time.
*   **Space Complexity:** O(N) in the worst case. For a string like "((((()))))", the stack will hold N/2 opening brackets.

### Edge Cases and Gotchas

*   **Empty string:** An empty string is considered valid. Our loop won't run, stack remains empty, `true` is returned.
*   **String with only opening brackets:** `s = "((("`. Stack won't be empty at the end, returns `false`.
*   **String with only closing brackets:** `s = ")))"`. First closing bracket will find an empty stack, returns `false`.
*   **Mismatched types:** `s = "([)]"`. Handled by the explicit matching logic.
*   **Incorrect order:** `s = "(][)"`. Also handled correctly.

---

## 4. Daily Temperatures (`StackAndQueueProblems::dailyTemperatures`)

### Problem Statement
Given an array of integers `temperatures` representing the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i`-th day to get a warmer temperature. If there is no future day for which this is possible, keep `answer[i] == 0` instead.

### High-Level Idea
For each day `i`, we need to find the *next* day `j` such that `temperatures[j] > temperatures[i]`. This "next greater element" pattern is a classic application of a monotonic stack. A monotonic stack maintains elements in either strictly increasing or strictly decreasing order. For this problem, we need a decreasing monotonic stack.

### Solution Approaches

#### Approach 1: Brute Force

Iterate through each day `i`. For each `i`, iterate through subsequent days `j` (from `i+1` to end) to find the first day with a warmer temperature.

*   **Time Complexity**: O(N^2) where N is the number of days. For each of N days, we might iterate up to N-1 subsequent days.
*   **Space Complexity**: O(1) (excluding output array).

```java
// Example Brute Force (not included in primary solution file but good for comparison)
public int[] dailyTemperaturesBruteForce(int[] temperatures) {
    int n = temperatures.length;
    int[] answer = new int[n];
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (temperatures[j] > temperatures[i]) {
                answer[i] = j - i;
                break;
            }
        }
    }
    return answer;
}
```

#### Approach 2: Optimized using Monotonic Stack

We use a stack to store the *indices* of days whose warmer day has not yet been found. We maintain the invariant that the temperatures corresponding to indices in the stack are in *decreasing order* from bottom to top.

#### Step-by-step Logic

1.  Initialize an `int[] answer` of the same size as `temperatures`, filled with zeros.
2.  Initialize an empty `Stack<Integer>` to store indices.
3.  Iterate through `temperatures` array with index `i` from `0` to `n-1`:
    *   **While the stack is not empty AND the temperature at the index on top of the stack (`temperatures[stack.peek()]`) is LESS THAN the current temperature (`temperatures[i]`):**
        *   This means we found a warmer day (`i`) for the day `prevDayIndex = stack.pop()`.
        *   Calculate the waiting days: `answer[prevDayIndex] = i - prevDayIndex`.
    *   **After the while loop (or if it never executed):**
        *   Push the current day's index `i` onto the stack. This maintains the decreasing order property.
4.  After iterating through all days, the `answer` array will contain the results. Any indices remaining in the stack have no warmer day in the future, and their `answer` values will remain `0` (initialized default).

#### ASCII Diagram

Let's trace `temperatures = [73, 74, 75, 71, 69, 72, 76, 73]`

```
Temperatures: [73, 74, 75, 71, 69, 72, 76, 73]
Indices:      [0,  1,  2,  3,  4,  5,  6,  7 ]
Answer:       [0,  0,  0,  0,  0,  0,  0,  0 ]
Stack (stores indices): []

i = 0, temp = 73:
  Stack empty. Push 0.
Stack: [0] (temp 73)

i = 1, temp = 74:
  Stack not empty, temp[stack.peek()] (temp[0]=73) < current temp (74).
  Pop 0. answer[0] = 1 - 0 = 1.
  Stack: []
  Push 1.
Stack: [1] (temp 74)
Answer: [1, 0, 0, 0, 0, 0, 0, 0]

i = 2, temp = 75:
  Stack not empty, temp[stack.peek()] (temp[1]=74) < current temp (75).
  Pop 1. answer[1] = 2 - 1 = 1.
  Stack: []
  Push 2.
Stack: [2] (temp 75)
Answer: [1, 1, 0, 0, 0, 0, 0, 0]

i = 3, temp = 71:
  Stack not empty, temp[stack.peek()] (temp[2]=75) > current temp (71). (Condition false)
  Push 3.
Stack: [2, 3] (temps 75, 71)

i = 4, temp = 69:
  Stack not empty, temp[stack.peek()] (temp[3]=71) > current temp (69). (Condition false)
  Push 4.
Stack: [2, 3, 4] (temps 75, 71, 69)

i = 5, temp = 72:
  Stack not empty, temp[stack.peek()] (temp[4]=69) < current temp (72).
  Pop 4. answer[4] = 5 - 4 = 1.
  Stack: [2, 3]
  Stack not empty, temp[stack.peek()] (temp[3]=71) < current temp (72).
  Pop 3. answer[3] = 5 - 3 = 2.
  Stack: [2]
  Stack not empty, temp[stack.peek()] (temp[2]=75) > current temp (72). (Condition false)
  Push 5.
Stack: [2, 5] (temps 75, 72)
Answer: [1, 1, 0, 2, 1, 0, 0, 0]

i = 6, temp = 76:
  Stack not empty, temp[stack.peek()] (temp[5]=72) < current temp (76).
  Pop 5. answer[5] = 6 - 5 = 1.
  Stack: [2]
  Stack not empty, temp[stack.peek()] (temp[2]=75) < current temp (76).
  Pop 2. answer[2] = 6 - 2 = 4.
  Stack: []
  Push 6.
Stack: [6] (temp 76)
Answer: [1, 1, 4, 2, 1, 1, 0, 0]

i = 7, temp = 73:
  Stack not empty, temp[stack.peek()] (temp[6]=76) > current temp (73). (Condition false)
  Push 7.
Stack: [6, 7] (temps 76, 73)

End of loop.
Stack: [6, 7]. Indices 6 and 7 have no warmer day. Their answer remains 0.
Final Answer: [1, 1, 4, 2, 1, 1, 0, 0]
```

### Complexity Analysis

*   **Time Complexity:** O(N), where N is the number of days. Each temperature is pushed onto the stack once and popped from the stack at most once. This makes the overall traversal and stack operations linear.
*   **Space Complexity:** O(N) in the worst case. If `temperatures` is in strictly decreasing order (e.g., `[5, 4, 3, 2, 1]`), all indices will be pushed onto the stack and never popped until the end (if no warmer day exists).

### Edge Cases and Gotchas

*   **Empty input:** Handled by returning an empty array or an appropriate error (our code will gracefully handle an empty `temperatures` array).
*   **All temperatures increasing:** `[30, 40, 50, 60]`. Each element will pop the previous one immediately, giving `[1, 1, 1, 0]`.
*   **All temperatures decreasing:** `[60, 50, 40, 30]`. All elements will be pushed onto the stack, none popped. All answers remain `0`.
*   **All temperatures same:** `[30, 30, 30, 30]`. All elements pushed, none popped. All answers remain `0`.

---

## 5. Sliding Window Maximum (`StackAndQueueProblems::maxSlidingWindow`)

### Problem Statement
You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Return the maximum sliding window.

### High-Level Idea
For each window, we need to find the maximum element efficiently. A naive approach of iterating through each window takes O(N*K) time. We need something faster. A `Deque` (double-ended queue) can be used to maintain candidate maximums within the current window in decreasing order. The front of the deque will always store the index of the maximum element.

### Solution Approaches

#### Approach 1: Brute Force

Iterate from `i = 0` to `n - k`. For each `i`, the window is `nums[i...i+k-1]`. Find the maximum in this subarray.

*   **Time Complexity**: O(N*K).
*   **Space Complexity**: O(1) (excluding output array).

```java
// Example Brute Force (not included in primary solution file)
public int[] maxSlidingWindowBruteForce(int[] nums, int k) {
    int n = nums.length;
    if (n == 0 || k == 0) return new int[0];
    int[] result = new int[n - k + 1];
    for (int i = 0; i <= n - k; i++) {
        int max = nums[i];
        for (int j = 1; j < k; j++) {
            if (nums[i + j] > max) {
                max = nums[i + j];
            }
        }
        result[i] = max;
    }
    return result;
}
```

#### Approach 2: Optimized using Deque

We use a `Deque<Integer>` (specifically, a `LinkedList` in Java, which implements `Deque`) to store *indices* of elements from `nums`. This deque will maintain two properties:
1.  **Monotonically Decreasing**: Elements in the deque (corresponding to `nums[index]`) are in decreasing order from front to back. `nums[deque.peekFirst()]` is the largest.
2.  **Window Constraint**: Only indices within the current `[i - k + 1, i]` window are kept.

#### Step-by-step Logic

1.  Initialize an `int[] result` of size `n - k + 1` (number of windows).
2.  Initialize an empty `Deque<Integer> dq`.
3.  Iterate `i` from `0` to `n-1` (process each element in `nums`):
    *   **Remove out-of-window elements from front:**
        *   If the deque is not empty AND the index at the front of the deque (`dq.peekFirst()`) is less than `i - k + 1` (meaning it's no longer in the current window `[i-k+1, i]`), then remove it from the front (`dq.removeFirst()`).
    *   **Maintain decreasing order from back:**
        *   While the deque is not empty AND the value at the index at the back of the deque (`nums[dq.peekLast()]`) is less than or equal to the current value (`nums[i]`):
            *   Remove elements from the back (`dq.removeLast()`). These elements are smaller than `nums[i]` and appear *before* `i`, so they cannot be the maximum in any future window containing `i` and beyond.
    *   **Add current element's index:**
        *   Add the current index `i` to the back of the deque (`dq.addLast(i)`).
    *   **Record maximum for current window:**
        *   If `i >= k - 1` (meaning we have formed a full window of size `k`):
            *   The maximum element for the current window is `nums[dq.peekFirst()]`.
            *   Store this in `result[i - k + 1]`.

#### ASCII Diagram

Let's trace `nums = [1, 3, -1, -3, 5, 3, 6, 7]`, `k = 3`

```
nums:   [1,  3,  -1, -3,  5,  3,  6,  7]
index:  [0,  1,   2,  3,  4,  5,  6,  7]
result: []
Deque (stores indices): []

i = 0, num = 1: (window: [1])
  dq empty. Push 0.
dq: [0] (val 1)

i = 1, num = 3: (window: [1, 3])
  dq.peekLast() (val 1) < num (3). Pop 0. dq: []
  Push 1.
dq: [1] (val 3)

i = 2, num = -1: (window: [1, 3, -1])  <-- First full window
  dq.peekLast() (val 3) > num (-1). Don't pop.
  Push 2.
dq: [1, 2] (vals 3, -1)
  i >= k-1 (2 >= 2) is true.
  result[2-3+1=0] = nums[dq.peekFirst()] = nums[1] = 3.
result: [3]

i = 3, num = -3: (window: [3, -1, -3])
  dq.peekFirst() (val 3 at index 1) is NOT < i-k+1 (3-3+1 = 1). (1 is not < 1)
  dq.peekLast() (val -1 at index 2) > num (-3). Don't pop.
  Push 3.
dq: [1, 2, 3] (vals 3, -1, -3)
  i >= k-1 (3 >= 2) is true.
  result[3-3+1=1] = nums[dq.peekFirst()] = nums[1] = 3.
result: [3, 3]

i = 4, num = 5: (window: [-1, -3, 5])
  dq.peekFirst() (val 3 at index 1) IS < i-k+1 (4-3+1 = 2). Pop 1. dq: [2, 3]
  dq.peekLast() (val -3 at index 3) < num (5). Pop 3. dq: [2]
  dq.peekLast() (val -1 at index 2) < num (5). Pop 2. dq: []
  Push 4.
dq: [4] (val 5)
  i >= k-1 (4 >= 2) is true.
  result[4-3+1=2] = nums[dq.peekFirst()] = nums[4] = 5.
result: [3, 3, 5]

i = 5, num = 3: (window: [-3, 5, 3])
  dq.peekFirst() (val 5 at index 4) is NOT < i-k+1 (5-3+1 = 3).
  dq.peekLast() (val 5 at index 4) > num (3). Don't pop.
  Push 5.
dq: [4, 5] (vals 5, 3)
  i >= k-1 (5 >= 2) is true.
  result[5-3+1=3] = nums[dq.peekFirst()] = nums[4] = 5.
result: [3, 3, 5, 5]

i = 6, num = 6: (window: [5, 3, 6])
  dq.peekFirst() (val 5 at index 4) is NOT < i-k+1 (6-3+1 = 4).
  dq.peekLast() (val 3 at index 5) < num (6). Pop 5. dq: [4]
  dq.peekLast() (val 5 at index 4) < num (6). Pop 4. dq: []
  Push 6.
dq: [6] (val 6)
  i >= k-1 (6 >= 2) is true.
  result[6-3+1=4] = nums[dq.peekFirst()] = nums[6] = 6.
result: [3, 3, 5, 5, 6]

i = 7, num = 7: (window: [3, 6, 7])
  dq.peekFirst() (val 6 at index 6) is NOT < i-k+1 (7-3+1 = 5).
  dq.peekLast() (val 6 at index 6) < num (7). Pop 6. dq: []
  Push 7.
dq: [7] (val 7)
  i >= k-1 (7 >= 2) is true.
  result[7-3+1=5] = nums[dq.peekFirst()] = nums[7] = 7.
result: [3, 3, 5, 5, 6, 7]

Final result: [3, 3, 5, 5, 6, 7]
```

### Complexity Analysis

*   **Time Complexity:** O(N), where N is the length of `nums`. Each element is added to the deque at most once and removed from the deque at most once. Each check (peekFirst, peekLast) is O(1).
*   **Space Complexity:** O(K), where K is the size of the window. In the worst case (e.g., a strictly increasing window `[1, 2, 3, 4, 5]`), the deque can hold up to K elements.

### Edge Cases and Gotchas

*   **Empty `nums` or `k=0`:** Handled by early return of an empty array.
*   **`k=1`:** Each element is its own window's maximum. The deque logic correctly handles this, pushing and immediately getting the max.
*   **`k > nums.length`:** If the problem specifies this, usually `k` is considered to be `nums.length`. Our current solution should still work, producing one result element which is the maximum of the entire array.
*   **All elements same:** `[5, 5, 5, 5, 5], k=3`. Deque will correctly hold `[i]` for the current max. Result: `[5, 5, 5]`.
*   **Negative numbers:** Handled correctly as comparison logic still holds.

---
```