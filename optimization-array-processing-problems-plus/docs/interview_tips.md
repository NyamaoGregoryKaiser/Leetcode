# Array Manipulation Interview Tips and Variations

This document provides general tips for tackling array manipulation problems in coding interviews, common patterns, how to approach edge cases, and typical variations of problems.

---

## General Interview Tips for Array Problems

1.  **Understand the Problem Thoroughly:**
    *   **Input/Output:** What are the types? Are they numbers, strings, objects? What should the output format be?
    *   **Constraints:** What are the array size limits (empty, single element, N up to 10^5)? Value range (positive, negative, zeros)? Are there duplicates?
    *   **In-Place vs. New Array:** Does the problem require modifying the input array in-place, or can you return a new array? This is crucial for space complexity.
    *   **Time/Space Complexity:** What are the expected constraints? `O(N)`, `O(N log N)`, `O(1)` space?

2.  **Start with a Simple Example:**
    *   Work through a small example manually. This helps clarify the logic and often reveals edge cases.
    *   Example: `[1,2,3,4], k=2` for rotate array.

3.  **Brainstorm Approaches (Brute Force First):**
    *   **Brute Force:** How would you solve it simply, even if inefficiently? This establishes a baseline and ensures you understand the core logic. Articulate its complexity.
    *   **Optimization:** How can you improve on the brute force?
        *   Can you reduce nested loops?
        *   Can you use extra space to speed up time (time-space trade-off)?
        *   Can you sort the array?
        *   Can you use a hash map/set?

4.  **Common Array Patterns and Techniques:**

    *   **Two Pointers:**
        *   **Same Direction:** E.g., fast/slow pointers (detecting cycles, removing duplicates), sliding window (max subarray sum of fixed size).
        *   **Opposite Direction:** E.g., finding pairs with a certain sum in a sorted array, reversing an array, partitioning.
        *   *Example:* `rotateArrayByReverse` uses two pointers in the `reverse` helper function.

    *   **Sliding Window:**
        *   Used for contiguous subarrays/substrings. Maintain a "window" of elements and slide it across the array, expanding or shrinking it based on conditions.
        *   *Example:* Can be used for problems like "Longest Substring Without Repeating Characters" (though on strings, the concept applies to arrays). `maxSubarraySumKadane` implicitly uses a form of this.

    *   **Prefix Sums / Suffix Sums:**
        *   Precompute sums of prefixes (or suffixes) to quickly query sums of any subarray. `sum(i, j) = prefixSum[j] - prefixSum[i-1]`.
        *   *Example:* `productExceptSelfOptimal` uses this concept for products.

    *   **Sorting:**
        *   Many problems become much simpler if the array is sorted. Don't forget to account for `O(N log N)` time complexity.
        *   *Example:* `mergeIntervals` heavily relies on sorting.

    *   **Hashing (Maps/Sets):**
        *   Used for `O(1)` average time lookups, tracking frequency, or detecting duplicates.
        *   *Example:* Finding duplicates, two sum problem.

    *   **In-Place Manipulation:**
        *   Look for opportunities to swap elements, use two pointers, or reverse parts of the array to achieve `O(1)` auxiliary space.
        *   *Example:* `rotateArrayByReverse`.

    *   **Dynamic Programming:**
        *   Identify overlapping subproblems and optimal substructure. Build up solutions from smaller subproblems.
        *   *Example:* `maxSubarraySumKadane` is a classic DP problem.

5.  **Handle Edge Cases:**
    *   **Empty array:** `[]`
    *   **Single element array:** `[5]`
    *   **Two element array:** `[1,2]`
    *   **All same elements:** `[5,5,5]`
    *   **Alternating/Mixed elements:** `[1, -1, 1, -1]`
    *   **Minimum/Maximum allowed values:** Numbers at the boundary of `MIN_INT`/`MAX_INT`.
    *   **Zeros/Nulls:** Specifically important for product/sum problems.

6.  **Walk Through Your Optimized Solution:**
    *   Once you have an algorithm, trace it with an example (especially an edge case or a tricky one).
    *   Talk through your thought process out loud.

7.  **Analyze Complexity:**
    *   Clearly state the Time Complexity (worst case) and Space Complexity (auxiliary space). Justify your analysis.
    *   Discuss trade-offs if you chose an approach over another (e.g., O(N) time with O(N) space vs. O(N log N) time with O(1) space).

8.  **Write Clean, Readable Code:**
    *   Meaningful variable names.
    *   Consistent formatting.
    *   Modularize (helper functions).
    *   Add comments where logic is complex.

---

## Interview Variations and Problem Extensions

### Rotate Array Variations:

*   **Rotate Left:** Equivalent to rotating right by `N - k` steps.
*   **Rotate Matrix:** Rotate a 2D array (matrix) by 90 degrees clockwise or anti-clockwise. (Often involves transposing and then reversing rows/columns).
*   **Cyclic Permutations/Dependencies:** If rotation is `k` elements at a time, what if elements need to be moved one by one in a cycle? (e.g., placing `nums[i]` at `nums[(i+k)%N]`, then taking `nums[(i+k)%N]` and moving it, etc., until the cycle completes). The "cyclic replacement" method for rotate array directly implements this.

### Product of Array Except Self Variations:

*   **With Division:** If division is allowed, calculate total product, then `answer[i] = totalProduct / nums[i]`. Handle zeros carefully (if totalProduct is zero due to one zero, then only that zero's corresponding `answer[i]` is non-zero).
*   **Sum of Array Except Self:** Similar logic, but with sums. `totalSum - nums[i]`.
*   **Generalize to `M` except `N`:** What if you need to calculate product of elements except `M` smallest elements, or `N` largest? (This would involve sorting or min/max heaps).

### Maximum Subarray Sum Variations:

*   **Return Subarray Indices:** Instead of just the sum, return the start and end indices of the subarray. Kadane's can be extended to track these: `currentStart` for `currentMax`, and `maxStart`, `maxEnd` for `maxSoFar`.
*   **Max Subarray Sum with K-size Window:** Use a fixed-size sliding window.
*   **Max Subarray Product:** Similar to sum, but needs to handle negative numbers carefully (a product of two negatives is positive). You'd track `currentMaxProduct` and `currentMinProduct`.
*   **Max Subarray Sum in a Circular Array:** This can be broken down into two cases:
    1.  The max subarray is non-wrapping (standard Kadane's).
    2.  The max subarray wraps around (e.g., `[...5,6,7...,1,2,3...]`). This is equivalent to `totalSum - minSubarraySum`. Take the maximum of these two cases.
*   **Max Sum Submatrix (2D array):** Much more complex, often solved by reducing it to 1D Kadane's for each possible pair of row boundaries.

### Merge Overlapping Intervals Variations:

*   **Insert Interval:** Given a sorted list of non-overlapping intervals, insert a new interval and merge it with existing ones if necessary. (Find insertion point, then merge forward/backward).
*   **Interval Intersection:** Given two lists of intervals, find all intersections. (Often uses a two-pointer approach after sorting or processing one list against the other).
*   **Minimum Number of Arrows to Burst Balloons / Non-overlapping Intervals:** Problems that ask for the minimum number of intervals to remove to make the rest non-overlapping, or to find max number of non-overlapping intervals. These often involve sorting by end times and a greedy approach.
*   **Meeting Rooms I/II:** Check if a person can attend all meetings (I) or find the minimum number of meeting rooms required (II). Sorting by start time is key, and then using a min-heap for end times for problem II.

---

By understanding these core problems, common patterns, and their variations, you'll be well-equipped to tackle a wide range of array manipulation challenges in your coding interviews. Practice is key!