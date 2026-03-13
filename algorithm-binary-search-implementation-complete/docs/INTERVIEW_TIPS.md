# Binary Search Interview Tips and Variations

Binary Search is a cornerstone algorithm in coding interviews. Mastering it requires understanding not just the basic implementation but also its subtle variations, edge cases, and how to apply it to a wide range of problems.

## Table of Contents

1.  [General Approach to Binary Search Problems](#general-approach-to-binary-search-problems)
2.  [Key Questions to Ask](#key-questions-to-ask)
3.  [Common Binary Search Patterns/Variations](#common-binary-search-patterns-variations)
    *   [Finding an Exact Match](#finding-an-exact-match)
    *   [Finding First/Last Occurrence](#finding-firstlast-occurrence)
    *   [Finding a Boundary/Transition Point](#finding-a-boundarytransition-point)
    *   [Searching in a Rotated Sorted Array](#searching-in-a-rotated-sorted-array)
    *   [Searching for an "Answer" (on result)](#searching-for-an-answer-on-result)
    *   [Finding a Peak/Minimum](#finding-a-peakminimum)
4.  [Binary Search Template and Loop Invariants](#binary-search-template-and-loop-invariants)
5.  [Debugging Strategies](#debugging-strategies)
6.  [Common Pitfalls and Gotchas](#common-pitfalls-and-gotchas)
7.  [Practice Resources](#practice-resources)

---

## 1. General Approach to Binary Search Problems

1.  **Identify if Binary Search is Applicable:**
    *   Is the data *sorted* or can it be made sorted (e.g., by sorting the array, or by recognizing a monotonic property in the search space)?
    *   Can the problem be solved by repeatedly eliminating half of the search space based on a condition?
    *   Are you looking for an index, a value, or an "answer" that can be found by checking a range?

2.  **Define the Search Space (`low`, `high`):**
    *   What are the absolute minimum and maximum possible values/indices for your answer? These become your initial `low` and `high`.
    *   For arrays, `low = 0`, `high = nums.length - 1`.
    *   For searching for an answer (e.g., `sqrt(x)`), `low = 0` (or 1), `high = x` (or `MAX_VALUE`).

3.  **Determine the `mid` Calculation:**
    *   Always use `mid = low + (high - low) / 2` to prevent integer overflow.

4.  **Formulate the Comparison Logic:**
    *   This is the heart of Binary Search. What condition do you check at `nums[mid]`?
    *   Based on `nums[mid]` compared to your `target` or problem-specific condition, how do you adjust `low` and `high`?
        *   `low = mid + 1` (target is strictly in the right half)
        *   `high = mid - 1` (target is strictly in the left half)
        *   `low = mid` (target could be `mid`, or in the right half)
        *   `high = mid` (target could be `mid`, or in the left half)

5.  **Choose the `while` Loop Condition:**
    *   `while (low <= high)`: This means `low` and `high` can eventually cross. Useful when `low = mid + 1` and `high = mid - 1`. The answer is usually `mid` or `low` (after loop) / `high` (before loop).
    *   `while (low < high)`: This means `low` and `high` will converge to a single element. Useful when `low = mid` or `high = mid`. The answer is `low` (or `high`) after the loop. Be careful with `mid` calculation: `mid = low + (high - low) / 2` (rounds down) implies `low = mid` can lead to infinite loop if `low = high - 1` and `mid = low`. In such cases, `mid = low + (high - low + 1) / 2` (rounds up) is safer if `low` is updated to `mid`.

6.  **Determine the Return Value:**
    *   If found during the loop, return `mid`.
    *   If searching for boundary, you might need to store the best `mid` found so far and return it after the loop.
    *   If not found, return `-1` or throw an exception.
    *   If searching for an "answer", `low` or `high` after the loop could be the answer.

## 2. Key Questions to Ask

*   "Is the array sorted? If not, can I sort it (and what would be the complexity implications)?"
*   "Are there duplicates? How should they be handled (first, last, any occurrence)?"
*   "What are the constraints on the input size (`N`) and value range? (e.g., `Integer.MAX_VALUE` for `sqrt(x)` implies `mid*mid` can overflow `int`.)"
*   "What should I return if the target is not found?"
*   "Are the boundaries inclusive or exclusive?" (e.g., `[low, high]` or `[low, high)`)

## 3. Common Binary Search Patterns/Variations

This section highlights the different ways Binary Search can be applied, often requiring slight modifications to the standard template.

### Finding an Exact Match
(e.g., `BinarySearchProblems.find`)
*   **Goal:** Find *any* index of the target.
*   **Template:** Standard `while (low <= high)`, `low = mid + 1`, `high = mid - 1`.
*   **Return:** `mid` if found, `-1` otherwise.

### Finding First/Last Occurrence
(e.g., `BinarySearchProblems.findFirst`, `BinarySearchProblems.findLast`)
*   **Goal:** Find the smallest/largest index of the target.
*   **Template:** `while (low <= high)`, `ans` variable to store potential result.
    *   If `nums[mid] == target`: `ans = mid`; then `high = mid - 1` (for first) or `low = mid + 1` (for last).
    *   Else: normal `low = mid + 1` or `high = mid - 1`.
*   **Return:** `ans`.

### Finding a Boundary/Transition Point
(e.g., "find the smallest number `x` such that `condition(x)` is true")
*   **Goal:** Find a specific point where a property changes (e.g., first `true` in `[F,F,T,T,T]`).
*   **Template:** `while (low <= high)`, `ans` variable.
    *   If `condition(mid)` is true: `ans = mid`; `high = mid - 1` (try for smaller `mid`).
    *   Else: `low = mid + 1`.
*   **Return:** `ans`.

### Searching in a Rotated Sorted Array
(e.g., `BinarySearchProblems.searchInRotatedSortedArray`)
*   **Goal:** Find a target in an array that was originally sorted but has been rotated.
*   **Template:** `while (low <= high)`. The core logic is to identify which half (`[low, mid]` or `[mid, high]`) is sorted, then check if the target falls within that sorted half.
*   **Key:** `if (nums[low] <= nums[mid])` (left half sorted) else (right half sorted).

### Searching for an "Answer" (on result)
(e.g., `BinarySearchProblems.mySqrt`, "minimum time to complete tasks", "kth smallest pair distance")
*   **Goal:** The array itself is not the search space, but the *range of possible answers* is monotonic.
*   **Search Space:** `low` and `high` represent the minimum and maximum possible values for the answer.
*   **`check(mid)` function:** Define a helper function that can efficiently check if a given `mid` value is a *possible* answer, or if the actual answer must be larger/smaller than `mid`.
*   **Template:** Similar to "Finding a Boundary", where `condition(mid)` is replaced by `check(mid)`.

### Finding a Peak/Minimum
(e.g., `BinarySearchProblems.findPeakElement`)
*   **Goal:** Find an element that satisfies a local property (e.g., greater than neighbors).
*   **Template:** Often `while (low < high)`.
    *   Compare `nums[mid]` with `nums[mid+1]` (or `nums[mid-1]`).
    *   `low = mid` or `high = mid` (or `mid+1`/`mid-1` based on specific rules).
    *   Crucial for `while (low < high)`: if `low = mid` is a possible update, use `mid = low + (high - low + 1) / 2` to prevent infinite loops when `low = high - 1`. If `high = mid` is possible, `mid = low + (high - low) / 2` is fine.
*   **Return:** `low` (or `high`) after the loop.

## 4. Binary Search Template and Loop Invariants

There are typically two main templates, each with slightly different loop conditions and update rules:

1.  **Template 1: `while (low <= high)`**
    *   `low = mid + 1`
    *   `high = mid - 1`
    *   **Invariant:** `target` (if exists) is always in `[low, high]`.
    *   **Exit Condition:** `low > high`. The element is not found, or `low` points to the insertion point.

2.  **Template 2: `while (low < high)`**
    *   `low = mid` (potentially)
    *   `high = mid` (potentially)
    *   **Invariant:** `target` (or desired property) is always in `[low, high)`.
    *   **Exit Condition:** `low == high`. `low` (or `high`) is the answer.
    *   **Careful with `mid`:**
        *   If `low = mid + 1` and `high = mid`, use `mid = low + (high - low) / 2` (rounds down).
        *   If `low = mid` and `high = mid - 1`, use `mid = low + (high - low + 1) / 2` (rounds up) to avoid `low` getting stuck.

Understanding these templates and when to use each one is key to solving variations correctly.

## 5. Debugging Strategies

*   **Print `low`, `high`, `mid`, and `nums[mid]`** in each iteration to trace the search space.
*   **Use small, simple test cases:**
    *   Empty array `[]`
    *   Single element `[5]`
    *   Two elements `[1, 5]`
    *   Target at `0`, `length-1`, `middle`.
    *   Target not found.
*   **Draw diagrams:** Visualizing `low`, `high`, `mid` and how they move can quickly expose logic errors. (See ASCII diagrams in `ALGORITHM_EXPLANATION.md`).
*   **Step through with a debugger:** Essential for complex logic like rotated arrays.

## 6. Common Pitfalls and Gotchas

*   **Integer Overflow:** `low + high` for `mid` calculation. (Always use `low + (high - low) / 2`).
*   **Off-by-one errors:** In `low = mid + 1`, `high = mid - 1`, `while` loop conditions (`<=` vs `<`).
*   **Infinite Loops:** When `low` or `high` don't move sufficiently, or `mid` calculation combined with updates creates a loop. This is common when `low = mid` or `high = mid` is used.
*   **Ignoring Edge Cases:** Empty arrays, single-element arrays, target outside the range, target at boundaries.
*   **Not handling duplicates correctly:** If the problem specifies first/last occurrence.
*   **Incorrectly assuming sortedness:** For example, in rotated arrays, only *one* half is sorted at any given time.

## 7. Practice Resources

*   LeetCode: Many problems tagged "Binary Search."
    *   Easy: `704. Binary Search`
    *   Medium: `33. Search in Rotated Sorted Array`, `153. Find Minimum in Rotated Sorted Array`, `34. Find First and Last Position of Element in Sorted Array`, `69. Sqrt(x)`, `162. Find Peak Element`
    *   Hard: `4. Median of Two Sorted Arrays`, `719. Find K-th Smallest Pair Distance`
*   HackerRank, Codeforces, TopCoder, etc.

By diligently practicing and applying these tips, you will significantly improve your ability to tackle Binary Search problems effectively in interviews.