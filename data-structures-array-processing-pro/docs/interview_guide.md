# Interview Guide: Array Manipulation

This document provides essential tips for approaching array manipulation problems in coding interviews, covering general strategies, common pitfalls, and variations.

---

## General Interview Tips for Array Problems

1.  **Clarify the Problem**:
    *   Ask about constraints: array size (empty? single element? very large?), data type (integers? floats? negative numbers?), value range.
    *   Ask about output: new array or in-place modification? Sorted output required?
    *   Ask about specific operations allowed/disallowed (e.g., division in Product Except Self).

2.  **Start with Brute Force (if stuck)**:
    *   If the optimal solution isn't immediately obvious, describe a brute-force approach first. This shows you can tackle the problem, even if inefficiently.
    *   Analyze its complexity and explain why it's not optimal. This sets the stage for optimization.

3.  **Optimize Systematically**:
    *   **Reduce Space**: Can you do it in-place? Can you reuse existing memory?
    *   **Reduce Time**: Can you avoid nested loops? Can you use hashing, sorting, or two-pointers?
    *   **Data Structures**: Could a stack, queue, map, or set simplify the problem or improve complexity? (Though for simple array manipulation, often not needed beyond a temporary array).

4.  **Edge Cases First**:
    *   Empty array `[]`
    *   Single element array `[5]`
    *   Two element array `[1,2]`
    *   All same elements `[3,3,3]`
    *   All negative/positive elements
    *   Zeroes (especially relevant for product problems)
    *   Max/Min integer values (potential overflow)

5.  **Talk Through Your Thought Process**:
    *   Explain *why* you're choosing a certain approach.
    *   Verbalize trade-offs (space vs. time).
    *   If you hit a roadblock, explain your current thinking and what you're trying next.

6.  **Write Clean, Readable Code**:
    *   Meaningful variable names.
    *   Consistent indentation.
    *   Comments for complex logic.
    *   Separate concerns (e.g., helper functions).

7.  **Test Your Code**:
    *   Walk through your code with a small example.
    *   Test the edge cases you identified.

---

## Problem-Specific Interview Tips & Variations

### 1. Rotate Array

*   **Key Concepts**: In-place modification, modular arithmetic, array reversal trick, cyclic shifts (Juggling Algorithm).
*   **Optimal Approach**: Three Reversals or Juggling Algorithm (both O(N) time, O(1) space).
*   **Common Pitfalls**:
    *   Not normalizing `k` (`k %= n`).
    *   Incorrectly handling edge cases like `k=0` or `k=n`.
    *   Off-by-one errors with indices during manual shifting or reversal points.
*   **Interview Discussion Points**:
    *   Discuss the trade-offs between space and time for different solutions (extra array vs. in-place).
    *   Explain *why* the three reversals work (it swaps groups of elements in two stages).
    *   Explain *why* Juggling Algorithm works (it breaks into cycles based on GCD).
*   **Variations**:
    *   **Left Rotation**: Same logic, just adjust the reversal points or `next_idx` calculation for Juggling. (e.g., For three reversals, reverse first `k`, reverse rest, then reverse whole).
    *   **Rotate a sub-array**: Apply the same techniques to a specified range `[start, end]`.
    *   **Rotate a 2D matrix**: More complex, often involves transposing and then reversing rows/columns.

### 2. Product of Array Except Self

*   **Key Concepts**: Prefix products, suffix products, handling zeros, no division.
*   **Optimal Approach**: Two-pass algorithm using prefix and suffix products (O(N) time, O(1) extra space excluding output).
*   **Common Pitfalls**:
    *   Forgetting to initialize `prefix_product` and `suffix_product` to 1.
    *   Incorrectly handling zeros:
        *   One zero: only the element at the zero's index will have a non-zero product.
        *   Multiple zeros: all elements' products will be zero.
    *   Off-by-one errors in loop boundaries.
*   **Interview Discussion Points**:
    *   Start by explaining the naive division approach and why it's problematic if division is disallowed or if there are zeros.
    *   Clearly articulate the idea of "left products" and "right products" and how combining them yields the result.
    *   Show how the `result` array can be used to store one of the passes (e.g., prefix products), optimizing space.
*   **Variations**:
    *   **Product of array except *two* elements**: More complex, might involve keeping track of smallest/largest elements.
    *   **Sum of array except self**: Trivial (total sum - current element).
    *   **Maximum product subarray**: A dynamic programming problem similar to Maximum Subarray Sum, but needs to track both max and min product ending at current index due to negative numbers.

### 3. Maximum Subarray Sum (Kadane's Algorithm)

*   **Key Concepts**: Dynamic Programming, Greedy approach, `current_max` vs `global_max`.
*   **Optimal Approach**: Kadane's Algorithm (O(N) time, O(1) space).
*   **Common Pitfalls**:
    *   Initializing `global_max` and `current_max` incorrectly (e.g., to 0 or `INT_MIN` for arrays with all negative numbers). Initialize to `nums[0]` or the minimum possible value.
    *   Misunderstanding the `max(nums[i], current_max + nums[i])` step. It's crucial for deciding whether to extend or start new.
*   **Interview Discussion Points**:
    *   Explain the DP recurrence relation: `dp[i] = max(nums[i], dp[i-1] + nums[i])`.
    *   Show how `dp[i]` can be optimized to `current_max` for O(1) space.
    *   Discuss how the greedy choice (`max(nums[i], current_max + nums[i])`) leads to the global optimum.
*   **Variations**:
    *   **Maximum subarray product**: Similar to max sum, but requires tracking both max and min products to handle negative numbers.
    *   **Maximum sum circular subarray**: If the subarray can wrap around, combine Kadane's with a check for `total_sum - min_subarray_sum`.
    *   **Maximum sum of K non-overlapping subarrays**: More complex DP, often requires a 2D or 3D DP table.
    *   **Maximum sum of a subarray with length at least K**: Sliding window or modified Kadane's.

### 4. Merge Intervals

*   **Key Concepts**: Sorting, greedy approach, interval overlapping conditions.
*   **Optimal Approach**: Sort by start time, then iterate and merge (O(N log N) time, O(N) space).
*   **Common Pitfalls**:
    *   Forgetting to sort the intervals first. This is the most crucial step.
    *   Incorrectly checking for overlap: `current.start <= last_merged.end` is the correct condition.
    *   Incorrectly merging: `last_merged.end = max(last_merged.end, current.end)`. Simply taking `current.end` might miss extending the interval properly if `current` is fully contained.
    *   Handling an empty input list.
*   **Interview Discussion Points**:
    *   Emphasize why sorting is fundamental for this problem.
    *   Explain the greedy choice: if intervals overlap, merge them immediately and continue with the merged interval.
    *   Walk through an example with overlapping, adjacent, and non-overlapping intervals.
*   **Variations**:
    *   **Insert a new interval**: Find the correct position for the new interval, then apply the merge logic.
    *   **Meeting rooms I/II**: Determine if a person can attend all meetings (I) or the minimum number of meeting rooms required (II). Requires sorting and often a min-heap.
    *   **Non-overlapping intervals**: Find the minimum number of intervals to remove to make the rest non-overlapping.
    *   **Erase overlapping intervals**: Given a collection of intervals, find the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

---

Remember, the goal is not just to get the correct answer, but to demonstrate your problem-solving process, ability to analyze trade-offs, and communication skills. Good luck!