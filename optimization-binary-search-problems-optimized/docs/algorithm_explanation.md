# Understanding Binary Search: A Deep Dive

Binary Search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.

## Prerequisites

The **absolute prerequisite** for Binary Search is that the data structure must be **sorted**. If the data is unsorted, Binary Search cannot be applied directly, and you would typically need to sort it first (which adds O(N log N) complexity) or use a linear scan (O(N)).

## Core Idea: Divide and Conquer

1.  **Start with the entire list**: You have a search space defined by `low` (start index) and `high` (end index).
2.  **Find the middle element**: Calculate `mid = low + (high - low) / 2`. (Using `low + (high - low) / 2` instead of `(low + high) / 2` prevents potential integer overflow in languages like C++/Java when `low` and `high` are very large. In JavaScript, numbers are floating-point, so overflow is less of a concern for typical array indices, but it's good practice).
3.  **Compare**:
    *   If the middle element is your target, you've found it!
    *   If the target is less than the middle element, discard the right half of the list (including the middle element). Your new search space is `[low, mid - 1]`.
    *   If the target is greater than the middle element, discard the left half of the list (including the middle element). Your new search space is `[mid + 1, high]`.
4.  **Repeat**: Continue this process until the search space is empty (`low > high`) or the target is found.

## Visualizing Binary Search (ASCII Art)

Let's find `target = 7` in `[1, 3, 5, 7, 9, 11, 13]`

**Initial State:**
```
Array: [1, 3, 5, 7, 9, 11, 13]
       ^                     ^
       low                   high
       (0)                   (6)
```

**Iteration 1:**
*   `low = 0`, `high = 6`
*   `mid = 0 + (6 - 0) / 2 = 3`
*   `arr[mid]` (i.e., `arr[3]`) is `7`.
*   `arr[mid] == target`. Found!

**Example 2: Find `target = 4` in `[1, 3, 5, 7, 9, 11, 13]`**

**Initial State:**
```
Array: [1, 3, 5, 7, 9, 11, 13]
       ^                     ^
       low                   high
       (0)                   (6)
```

**Iteration 1:**
*   `low = 0`, `high = 6`
*   `mid = 3`
*   `arr[mid]` (i.e., `arr[3]`) is `7`.
*   `target (4) < arr[mid] (7)`. Discard right half.
*   New search space: `[low, mid - 1]` => `[0, 2]`

```
Array: [1, 3, 5, 7, 9, 11, 13]
       ^     ^
       low   high
       (0)   (2)
```

**Iteration 2:**
*   `low = 0`, `high = 2`
*   `mid = 0 + (2 - 0) / 2 = 1`
*   `arr[mid]` (i.e., `arr[1]`) is `3`.
*   `target (4) > arr[mid] (3)`. Discard left half.
*   New search space: `[mid + 1, high]` => `[2, 2]`

```
Array: [1, 3, 5, 7, 9, 11, 13]
             ^
             low, high
             (2)
```

**Iteration 3:**
*   `low = 2`, `high = 2`
*   `mid = 2 + (2 - 2) / 2 = 2`
*   `arr[mid]` (i.e., `arr[2]`) is `5`.
*   `target (4) < arr[mid] (5)`. Discard right half.
*   New search space: `[low, mid - 1]` => `[2, 1]`

```
Array: [1, 3, 5, 7, 9, 11, 13]
             ^
             high
             (1)
       (low = 2, high = 1) -> low > high
```

**Loop Termination:**
*   `low = 2`, `high = 1`. Now `low > high`. The loop terminates.
*   Target not found.

## Time and Space Complexity

*   **Time Complexity: O(log N)**
    *   In each step, the search space is halved.
    *   For an array of size `N`, it takes `log₂N` steps to narrow down to a single element.
*   **Space Complexity:**
    *   **Iterative:** O(1) - constant space, as only a few variables (`low`, `high`, `mid`) are used.
    *   **Recursive:** O(log N) - due to the recursion stack. Each recursive call adds a new stack frame.

## Implementation Paradigms

### 1. Iterative Binary Search (Preferred for interviews)

*   **Pros**:
    *   O(1) space complexity.
    *   Avoids recursion depth limits for very large inputs.
*   **Cons**:
    *   Can be slightly less intuitive to write for some complex variations compared to recursion.

### 2. Recursive Binary Search

*   **Pros**:
    *   Often more concise and elegant for simple cases.
    *   Maps directly to the divide-and-conquer strategy.
*   **Cons**:
    *   O(log N) space complexity due to the call stack.
    *   Risk of stack overflow for extremely large `N`.

## Common Binary Search Templates

While the core idea remains the same, how you adjust `low` and `high` (and what you return) changes based on the specific problem. Here are common templates:

### Template 1: Exact Match (Find *any* occurrence)
This is the most straightforward. The loop condition is usually `low <= high`.

```javascript
// Example: src/algorithms/binarySearchCore.js -> findTargetIterative
let low = 0;
let high = arr.length - 1;
while (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);
    if (arr[mid] === target) {
        return mid; // Found it!
    } else if (arr[mid] < target) {
        low = mid + 1; // Target is in the right half
    } else {
        high = mid - 1; // Target is in the left half
    }
}
return -1; // Not found
```
**Key**: The search space is `[low, high]` (inclusive). `mid` can be a valid answer. If not, we shrink the search space by `mid-1` or `mid+1`.

### Template 2: Find First Occurrence / Smallest Element >= Target
Often used for problems like "find first bad version" or "find first occurrence of X". The key is to potentially keep `mid` as a candidate and try to search further left. Loop condition is usually `low <= high` or `low < high`.

```javascript
// Example: src/algorithms/problems/problem5_findRange.js -> findFirstOccurrence
let low = 0;
let high = nums.length - 1;
let firstOccurrence = -1;
while (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);
    if (nums[mid] === target) {
        firstOccurrence = mid; // Found a potential first occurrence
        high = mid - 1;        // Try to find an even earlier one
    } else if (nums[mid] < target) {
        low = mid + 1;
    } else {
        high = mid - 1;
    }
}
return firstOccurrence;
```
**Key**: When `nums[mid] == target`, we store `mid` as a possible answer and attempt to find an earlier one by setting `high = mid - 1`. If `nums[mid] > target`, `mid` itself *could* be the answer (e.g., first element `>= target`), so we might set `high = mid - 1` and store `mid` as an answer. This template is highly flexible.

### Template 3: Find Last Occurrence / Largest Element <= Target
Similar to finding the first occurrence, but we try to search further right.

```javascript
// Example: src/algorithms/problems/problem5_findRange.js -> findLastOccurrence
let low = 0;
let high = nums.length - 1;
let lastOccurrence = -1;
while (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);
    if (nums[mid] === target) {
        lastOccurrence = mid;  // Found a potential last occurrence
        low = mid + 1;         // Try to find an even later one
    } else if (nums[mid] < target) {
        low = mid + 1;
    } else {
        high = mid - 1;
    }
}
return lastOccurrence;
```
**Key**: When `nums[mid] == target`, we store `mid` and attempt to find a later one by setting `low = mid + 1`.

## When to use Binary Search

Binary Search isn't just for finding elements in sorted arrays. It's applicable whenever you need to find a "boundary" or an "optimal value" in a search space that has a **monotonic property**.

**Key Indicators:**
*   **Sorted Data**: The most obvious case.
*   **"Find the first/last/smallest/largest..."**: These often indicate a boundary search.
*   **Monotonic Property**: The ability to check a `mid` value and confidently discard half of the search space. This often applies to functions `f(x)` where `f(x)` is either always increasing or always decreasing. If `f(mid)` is true, can we say something about `f(mid+1)` or `f(mid-1)`?
*   **"Binary Search on the Answer"**: Problems where the answer itself falls within a range, and you can define a `check(answer)` function that is monotonic. For example, "find the minimum capacity to ship all packages in D days." If you can ship with capacity `X`, you can also ship with capacity `X+1`. This monotonicity allows binary search on `X`.

Understanding these templates and the underlying principles will enable you to solve a wide range of Binary Search problems effectively.