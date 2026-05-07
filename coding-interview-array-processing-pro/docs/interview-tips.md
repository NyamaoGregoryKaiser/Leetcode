```markdown
# Interview Tips for Array Manipulation Problems

Array manipulation problems are fundamental in coding interviews. They test your understanding of basic data structures, pointers, space optimization, and algorithmic paradigms. Here are some tips, common pitfalls, edge cases, and variations to keep in mind.

## General Tips for Array Problems

1.  **Understand the Constraints:**
    *   **Array size:** `N` (e.g., `0 <= N <= 10^5`). Does it fit in memory? Does `O(N^2)` pass for small `N`?
    *   **Element values:** Positive, negative, zero, range (`-10^9` to `10^9`). Does `0` or negative numbers affect your logic (e.g., product problems)?
    *   **Data type:** Integers, floats, objects?
    *   **`k` value:** Is `k` always positive? Can it be larger than `N`? (e.g., rotate array)
    *   **Time/Space Complexity:** What are the requirements? `O(N)` time? `O(1)` space (in-place)?

2.  **Clarify Edge Cases Upfront:**
    *   Empty array (`[]`)
    *   Single-element array (`[5]`)
    *   Array with all same elements (`[3,3,3]`)
    *   Array with only two elements (`[1,2]`)
    *   `k=0` (no rotation), `k=nums.length` (full rotation) for rotation problems.

3.  **Draw Diagrams & Use Examples:**
    *   For problems involving indices, pointers, or windowing, drawing the array and moving pointers/windows is crucial. Use ASCII art or pen and paper.
    *   Walk through your logic with a small, concrete example. This helps identify flaws early.

4.  **Consider Multiple Approaches:**
    *   **Brute Force:** Always start here. It's often easier to reason about and provides a baseline. State its complexity.
    *   **Optimized:** Think about how to reduce redundant calculations.
        *   **Two Pointers:** For sorted arrays, finding pairs, expanding/shrinking windows.
        *   **Sliding Window:** For contiguous subarrays/subsequences of fixed or variable size.
        *   **Prefix/Suffix Sums/Products:** For efficiently querying sums/products over ranges.
        *   **Sorting:** Does sorting the array simplify the problem? (e.g., merge intervals).
        *   **Hashing/Maps:** For `O(1)` lookups (e.g., frequency counts, two-sum variations).
        *   **In-place Modification:** Can you solve it without extra space? This often involves clever swaps or using the array itself to store auxiliary information.

5.  **Talk Through Your Thought Process:**
    *   Explain your initial brute-force idea.
    *   Explain why it's not optimal and how you're trying to improve it.
    *   Clearly state your chosen approach, its steps, and its time/space complexity.
    *   Verbally walk through an example.

6.  **Code Cleanly:**
    *   Use meaningful variable names.
    *   Break down complex logic into helper functions (e.g., a `reverse` helper for array rotation).
    *   Add comments for tricky parts, especially for in-place algorithms.

## Problem-Specific Edge Cases & Gotchas

### 1. Maximum Sum of K-sized Subarray (Sliding Window)
*   **Edge Cases:**
    *   `nums` is empty or `null`: Return `0` or throw error.
    *   `k` is `0`: Sum of 0 elements is `0`.
    *   `k` is greater than `nums.length`: Invalid input, or return `0` / throw error. The current solution assumes `k <= nums.length`.
    *   `nums` contains negative numbers: The window logic still works correctly; it will find the maximum sum even if it's negative.
    *   `nums.length == k`: The entire array is the only window.
*   **Gotchas:**
    *   Forgetting to initialize `maxSum` with the first window's sum.
    *   Incorrectly updating the window (subtracting/adding the wrong elements).
    *   Loop boundaries (e.g., `i` should start from `k` for sliding).
*   **Variations:**
    *   Maximum sum of *variable*-sized subarray (Kadane's algorithm).
    *   Smallest subarray with sum `>= S`.
    *   Longest subarray with K distinct characters.

### 2. Rotate Array
*   **Edge Cases:**
    *   `nums` is empty or `null`: Return or handle.
    *   `k = 0`: No rotation needed.
    *   `k` is a multiple of `nums.length` (e.g., `k = nums.length`, `k = 2 * nums.length`): Effectively no rotation. `k = k % nums.length` handles this.
    *   `nums.length = 1`: No rotation needed.
*   **Gotchas:**
    *   Not handling `k = k % nums.length` correctly, leading to out-of-bounds access or incorrect rotations for large `k`.
    *   Creating a new array (using `slice` and `splice`) when `O(1)` extra space is required.
    *   Off-by-one errors in reversal indices.
*   **Variations:**
    *   Rotate left instead of right.
    *   Rotate a 2D matrix (different problem, but related concept of in-place transformation).
    *   Cyclic shifts of specific elements.

### 3. Product of Array Except Self
*   **Edge Cases:**
    *   `nums` is empty or `null`: Return `[]` or handle.
    *   `nums.length = 1`: The product of elements except self is `1` (or `0` if context implies).
    *   Presence of `0`s:
        *   **One zero:** All elements except the one at the zero's index will be `0`. The element at the zero's index will be the product of all *other* non-zero elements.
        *   **Two or more zeros:** All elements in the result array will be `0`.
        The prefix/suffix product approach inherently handles this correctly, but it's a good mental check.
    *   Presence of negative numbers: Does not affect the logic.
*   **Gotchas:**
    *   Using division (explicitly forbidden).
    *   Incorrectly calculating prefix/suffix products (off-by-one, or not resetting product for each element).
    *   Not realizing that the `answer` array can be used to store intermediate prefix products, saving space.
*   **Variations:**
    *   Sum of array except self.
    *   Prefix sums/products queries for arbitrary ranges.
    *   Product of all elements (simple, but a base for this).

### 4. Merge Overlapping Intervals
*   **Edge Cases:**
    *   `intervals` is empty or `null`: Return `[]`.
    *   `intervals.length = 1`: Return the single interval.
    *   All intervals are non-overlapping: Should return the sorted input array.
    *   All intervals completely overlap (e.g., `[[1,5], [2,4], [3,6]]`): Should merge into one `[1,6]`.
    *   Intervals with identical start/end points (e.g., `[[1,3], [1,3]]`): Merges into `[1,3]`.
*   **Gotchas:**
    *   Forgetting to sort the intervals first. This is critical.
    *   Incorrectly updating the end of the last merged interval (`Math.max` is key).
    *   Improper loop conditions or indexing when iterating through the sorted intervals and `merged` list.
*   **Variations:**
    *   Insert new interval into a list of sorted, non-overlapping intervals.
    *   Find the intersection of intervals.
    *   Meeting room scheduling problems.
    *   Remove covered intervals.

By keeping these points in mind, you can approach array manipulation problems systematically and demonstrate strong problem-solving skills in your interviews. Good luck!
```