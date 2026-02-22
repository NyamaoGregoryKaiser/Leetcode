# Interview Guide for Array Manipulation

This document provides tips for approaching array manipulation problems in coding interviews, discusses common edge cases and potential pitfalls, and suggests variations or follow-up questions.

---

## General Interview Tips for Array Problems

1.  **Clarify the Problem:**
    *   Always start by asking clarifying questions. What are the constraints on array size (N)? What are the value ranges (integers, floats, negative numbers, zeros)? Are duplicates allowed? Is the array sorted?
    *   For matrix problems: is it always square? What if it's rectangular?
    *   Ask about time and space complexity requirements. "Optimal" usually means the most efficient known solution.

2.  **Think of Edge Cases Early:**
    *   Empty array `[]` or `matrix = []`
    *   Single element array `[x]` or `matrix = [[x]]`
    *   Arrays with all identical elements `[x,x,x]`
    *   Arrays with two elements `[x,y]` (common for two-pointer problems)
    *   Arrays with min/max possible integer values.
    *   For problems involving sums/products, consider zeros and negative numbers carefully.

3.  **Brainstorm Multiple Approaches:**
    *   Start with the simplest idea, often brute force. This shows you understand the problem and can establish a baseline.
    *   Then, consider how to optimize:
        *   Can I use extra space (hash maps, auxiliary arrays) to improve time?
        *   Can I avoid nested loops (two pointers, sliding window, prefix/suffix sums, sorting, data structures like heaps)?
        *   Can I modify the input in-place?

4.  **Visualize with Examples:**
    *   Draw out small examples on a whiteboard or paper. This helps in tracing logic, especially for two-pointers or matrix problems.
    *   Use ASCII art to represent arrays, pointers, or matrix states.

5.  **Talk Through Your Thought Process:**
    *   Explain your current approach, why you chose it, and its time/space complexity.
    *   If you hit a roadblock, vocalize your struggle and what you've tried.
    *   Explain trade-offs (e.g., more space for less time).

6.  **Write Clean, Readable Code:**
    *   Use meaningful variable names.
    *   Add comments for complex logic blocks.
    *   Structure your code logically (e.g., helper functions if needed).

7.  **Test Your Code:**
    *   After writing, manually walk through your code with a few test cases, including edge cases.
    *   Point out potential bugs and how you'd fix them.

---

## Edge Cases and Gotchas for Specific Problems

### Problem 1: Container With Most Water
*   **Edge Case:** `height` array with only two elements. The logic still works.
*   **Edge Case:** All heights are 0. Result should be 0.
*   **Gotcha:** Incorrectly moving both pointers or moving the taller pointer: This leads to suboptimal results. The core idea is that moving the shorter height *might* find a taller height, while moving the taller height will always reduce width and use the same or shorter height, thus always reducing or keeping the area the same.

### Problem 2: Product of Array Except Self
*   **Edge Case:** Empty array: Return empty array.
*   **Edge Case:** Single element array `[X]`: Return `[1]`.
*   **Gotcha: Zeros:**
    *   If there's *one* zero in `nums`: Only `answer[i]` where `nums[i]` is the zero will be non-zero (product of all other numbers). All other elements in `answer` will be `0`.
    *   If there are *two or more* zeros in `nums`: All elements in `answer` will be `0`.
    *   The prefix/suffix product approach naturally handles zeros correctly without special conditions because any multiplication by zero propagates.
*   **Gotcha: No Division:** The problem specifically forbids division. This forces the prefix/suffix product approach.

### Problem 3: Rotate Image (Matrix)
*   **Edge Case:** 1x1 matrix: `[[1]]` should remain `[[1]]`.
*   **Edge Case:** Empty matrix `[]` or `[[]]`: Handle gracefully (do nothing).
*   **Gotcha: Non-square matrix:** The problem states `n x n`, but it's good to consider how to handle non-square if it was allowed (or state assumption). Our solutions implicitly handle it by checking `len(matrix) == 0` or `n != len(matrix[0])`.
*   **Gotcha: Off-by-one errors in layer-by-layer:** Calculating indices `first`, `last`, and `i` can be tricky. Careful visualization helps. `last - (i - first)` is a common pattern to map an `i` on one side to its corresponding index on another side.

### Problem 4: Meeting Rooms II
*   **Edge Case:** Empty `intervals`: Return 0.
*   **Edge Case:** Single interval: Return 1.
*   **Edge Case:** Meetings that start exactly when another ends (e.g., `[[1,5],[5,10]]`): These should *not* require an additional room. Both optimal solutions (min-heap and line sweep) handle this correctly by checking `start >= earliest_end`.
*   **Gotcha: Incorrect Sorting:** Not sorting by start times first will lead to incorrect results for both optimal approaches.
*   **Gotcha: Heap logic (min-heap vs max-heap):** A min-heap on *end times* is crucial because we always want to free up the room that becomes available soonest. A max-heap would keep the room busy longest at the top, which isn't what we want.
*   **Gotcha: Line sweep tie-breaking:** If `start_time == end_time`, it's critical to process the `end_time` event *first* (decrement rooms) before processing the `start_time` event (increment rooms). This ensures the room is considered freed and then immediately reused, rather than requiring a new room momentarily.

---

## Interview Variations and Follow-up Questions

### General Array Variations:
*   **Find specific elements:** Kth largest, missing number, duplicates.
*   **Rearrangement/Sorting:** Sort an array with specific constraints (e.g., 0s, 1s, 2s).
*   **Subarrays/Subsequences:** Max subarray sum, longest increasing subsequence.
*   **Sliding Window:** For problems involving a contiguous subarray of a certain size or property.
*   **Two-pointer variations:** In-place reversal, partitioning, finding pairs/triplets with specific sums.

### Problem Specific Follow-ups:

**Container With Most Water:**
*   What if the lines can be slanted? (Much harder, geometry, potentially calculus).
*   What if `height` can contain negative numbers? (Makes no physical sense for "water", clarify problem, might imply distance, not height).

**Product of Array Except Self:**
*   What if division *was* allowed? (Simpler: calculate total product, then `answer[i] = total_product / nums[i]`. Handle zeros carefully: if one zero, `total_product` is 0; if multiple zeros, then all results are 0 except the index of the zero itself).
*   What if output array space *was* counted as auxiliary? (Then the O(1) solution would be O(N) space, as you need to store the result).
*   What about very large numbers that might overflow a 64-bit integer? (Discuss using arbitrary precision arithmetic or specific modulus operations).

**Rotate Image (Matrix):**
*   Rotate counter-clockwise? (Change swap pattern or transpose then reverse columns).
    *   Transpose then reverse columns: `matrix[r][c]` to `matrix[c][r]` (transpose), then `matrix[r][c]` to `matrix[r][n-1-c]` (reverse columns).
    *   Direct 4-way swap: `(r, c) -> (n-1-c, r) -> (n-1-r, n-1-c) -> (c, n-1-r) -> (r, c)`
*   Rotate by arbitrary angle (e.g., 180 degrees)? (Rotate 90 degrees twice, or reverse rows then reverse columns).
*   Rotate a non-square matrix? (More complex. Requires a new matrix as simple in-place rotations aren't possible for arbitrary shapes).

**Meeting Rooms II:**
*   Return the actual schedule of meetings in each room. (Modify the heap approach to store `[end_time, meeting_id]` and a list of lists for rooms).
*   Find the maximum number of people attending a conference simultaneously (if intervals represented attendance). (Same problem, different phrasing).
*   What if intervals are `[start, end, attendees]` and we want max attendees? (Different problem, potentially a line sweep over `(time, type, attendees_change)` events).
*   Meeting Rooms I: Can a person attend all meetings? (Just check if `intervals[i][1] <= intervals[i+1][0]` after sorting. Requires only one room for all).
---