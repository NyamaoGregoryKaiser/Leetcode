```markdown
# Interview Guide: Array Manipulation

This guide provides strategies, tips, and common variations for approaching array manipulation problems in a coding interview setting.

---

## General Strategies for Array Problems

1.  **Understand the Constraints:**
    *   **Size of N:** Small N (`<50`) might allow `O(N^3)` or `O(N^2)`. Large N (`>10^5`) requires `O(N)` or `O(N log N)`.
    *   **Element Range:** `[1, N]` (like `findDuplicate`) often hints at special techniques (Pigeonhole, XOR, cycle detection). Large values might require maps.
    *   **Negative Numbers/Zeros:** Do they change the logic (e.g., prefix sums for non-negative only vs. general)?
    *   **Modification Allowed?**: In-place requirement (O(1) space) changes everything. If not, extra data structures are fair game.
    *   **Sorted/Unsorted**: If sorted, think two pointers, binary search. If unsorted, consider sorting first (adds `O(N log N)` time).

2.  **Clarify Edge Cases:**
    *   Empty array `[]`
    *   Single-element array `[x]`
    *   Two-element array `[x, y]`
    *   All elements same `[x, x, x]`
    *   Alternating patterns `[1, 0, 1, 0]`
    *   Extremes (min/max values, `k=0` or `k=N`)

3.  **Brainstorm Approaches (Brute Force First):**
    *   **Brute Force:** Always start here. It helps understand the problem deeply and sets a baseline for optimization. (e.g., nested loops for all subarrays).
    *   **Improvement Techniques:**
        *   **Two Pointers:** For sorted arrays, or problems where interaction from both ends is useful (`trappingRainWater`).
        *   **Sliding Window:** For problems involving contiguous subarrays/subsequences of a certain property (e.g., max/min sum, specific count).
        *   **Prefix Sums:** For quickly calculating sum of any subarray (`subarraySum`). Can be combined with hash maps.
        *   **Hash Maps/Sets:** For `O(1)` average time lookups, tracking seen elements, frequencies, or complement values.
        *   **Sorting:** If order helps, but remember `O(N log N)` time.
        *   **Stack/Queue:** For problems involving monotonic sequences or nearest greater/smaller element.
        *   **Binary Search:** For finding elements in a sorted array or search space.
        *   **Dynamic Programming:** If optimal substructure and overlapping subproblems are present.
        *   **Bit Manipulation:** For unique properties (e.g., XOR for single unique number).
        *   **Cycle Detection (Floyd's Tortoise and Hare):** For problems that can be mapped to linked lists with cycles (`findDuplicate`).

4.  **Walk Through an Example:**
    *   Pick a small, representative example.
    *   Trace your chosen algorithm step-by-step. This often reveals flaws or edge cases.

5.  **Analyze Complexity:**
    *   State time and space complexity clearly for all proposed approaches.
    *   Justify why one approach is more optimal than another based on these metrics.

6.  **Write Clean Code:**
    *   Use meaningful variable names.
    *   Add comments for complex logic.
    *   Handle edge cases explicitly.
    *   Write modular code if possible (e.g., helper functions).

---

## Problem-Specific Tips and Variations

### P1: Rotate Array

*   **Key Concept:** In-place modification, modular arithmetic.
*   **Variations:**
    *   Rotate left instead of right. (Similar reversal logic, just adjust which parts are reversed).
    *   Rotate a 2D matrix (can be done with transposing and reversing rows/columns).
    *   Rotate elements in a specific range.
*   **Gotchas:**
    *   For `k > n`, remember `k = k % n`.
    *   Handle `k=0` or `n=0/1` gracefully.

### P2: Merge Intervals

*   **Key Concept:** Sorting by start time simplifies overlap detection.
*   **Variations:**
    *   Insert a new interval into an already sorted list of non-overlapping intervals (often a sub-problem).
    *   Find the intersection of intervals instead of merging.
    *   Given intervals, find the maximum number of overlapping intervals at any point (e.g., for scheduling). Requires a sweep-line algorithm (sort all start/end points).
*   **Gotchas:**
    *   Intervals touching at boundaries `[1,2], [2,3]` should be merged to `[1,3]`. `last_end >= current_start` is the correct overlap condition.
    *   Make sure to handle empty input or single interval correctly.

### P3: Subarray Sum Equals K

*   **Key Concept:** Prefix sums, hash maps for O(1) lookups of previous sums.
*   **Variations:**
    *   Find the *longest* subarray with sum `k`.
    *   Find the subarray with the *maximum* sum (Kadane's algorithm if positive, DP if negative too).
    *   Subarray with sum divisible by `k`.
    *   Given positive numbers, find subarray sum `k` (can use sliding window, O(N) time, O(1) space). If negative numbers, prefix sum + hash map is needed.
*   **Gotchas:**
    *   Initialize map with `(0, 1)` for cases where `currentSum` itself equals `k`.
    *   Negative numbers are crucial for why sliding window isn't universally applicable here.

### P4: Trapping Rain Water

*   **Key Concept:** Two pointers, maintaining `maxLeft` and `maxRight` effectively. The limiting factor for water at any point is the `min` of its left and right boundaries.
*   **Variations:**
    *   Trapping water in a 2D elevation map (much harder, involves min-heap and BFS/Dijkstra-like approach).
    *   Find largest rectangle in histogram (uses monotonic stack, a related concept).
*   **Gotchas:**
    *   Edge bars (first and last) cannot trap water.
    *   The `min(maxLeft, maxRight)` calculation is essential. The two-pointer approach cleverly determines which `max` is the true limiter at each step.

### P5: Find the Duplicate Number

*   **Key Concept:** Floyd's Tortoise and Hare algorithm (cycle detection in linked list). Map array indices to values.
*   **Variations:**
    *   Find `k` duplicates.
    *   Find missing number (e.g., XOR, sum comparison, or hash set).
    *   Find first repeating character/number.
    *   Given `n` distinct numbers in `[0, n]`, find the missing one. (e.g. XOR all numbers with `0` to `n`).
*   **Gotchas:**
    *   The array is `nums`, but `nums[i]` is treated as the *next index*. This can be confusing.
    *   The problem specifically requires O(1) space and no modification, ruling out hash sets (O(N) space) and sorting (modifies array or O(N) space).
    *   The `nums[0]` is a special starting point for the "linked list" because `0` is not in the range `[1, n]`.

---

## Key Data Structures and Algorithms for Arrays

*   **Two Pointers:** Efficiently scan arrays from both ends or with two pointers moving in the same direction.
*   **Sliding Window:** Optimal for finding subarrays/subsequences with specific properties (often fixed size or variable size with monotonic updates).
*   **Prefix Sums:** Precomputing cumulative sums for O(1) range sum queries.
*   **Hash Maps / Sets:** Store frequencies, seen elements, or `(value -> index)` mappings for `O(1)` average lookup.
*   **Sorting Algorithms:** `O(N log N)` baseline for many problems. Know the implications of in-place vs. out-of-place sorts.
*   **Stack:** Useful for monotonic problems (e.g., finding next greater element, `trappingRainWater` monotonic stack approach).
*   **Binary Search:** For searching in sorted arrays or on a "search space" (e.g., finding a minimum value that satisfies a condition).

Good luck with your interviews! Consistent practice and a deep understanding of these fundamental techniques will be your greatest assets.
```