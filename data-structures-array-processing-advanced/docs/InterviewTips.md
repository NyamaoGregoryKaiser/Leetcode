```markdown
# Interview Tips and Variations for Array Manipulation Problems

Array manipulation problems are fundamental in coding interviews. They test your understanding of basic data structures, algorithmic thinking, and ability to optimize for time and space. Here are some general tips, common pitfalls, and specific variations for the problems covered.

---

## General Interview Tips for Array Problems

1.  **Clarify Constraints and Edge Cases:**
    *   **Input size:** Empty array? Single element? Very large arrays (`10^5` or `10^9`)?
    *   **Element values:** Positive, negative, zero? Duplicates? Sorted or unsorted?
    *   **`k` value (for rotation/sliding window):** Can `k` be 0, negative, or greater than array length?
    *   **Output requirements:** Modify in-place or return a new array?
    *   **Time/Space complexity:** Any specific requirements (e.g., `O(1)` space, `O(N)` time, no division)?

2.  **Start with Brute Force (if stuck):**
    *   Even if not optimal, explaining a brute-force approach shows you understand the problem.
    *   It also provides a baseline for optimization.
    *   Clearly state its complexity.

3.  **Think about Optimization Strategies:**
    *   **Two Pointers:** Useful for problems involving sorted arrays, finding pairs/triplets, or processing from both ends (e.g., `Trapping Rain Water`, `Reverse Array`).
    *   **Sliding Window:** For problems requiring a contiguous subarray/substring with certain properties (e.g., `Max Subarray Sum` is a form of this).
    *   **Prefix Sums/Products:** Precomputing cumulative sums/products can turn `O(N)` subarray sum/product calculations into `O(1)` (e.g., `Product of Array Except Self`).
    *   **Hashing/Hash Maps:** Useful for `O(1)` average time lookups, counting frequencies, or storing seen elements (e.g., `Two Sum`).
    *   **Sorting:** Sometimes sorting the array first simplifies the problem, but remember the `O(N log N)` cost.
    *   **In-place Modification:** Consider if you can reuse existing space to avoid `O(N)` extra space.
    *   **Divide and Conquer:** Break down a large problem into smaller, similar subproblems.
    *   **Dynamic Programming:** If optimal substructure and overlapping subproblems exist.

4.  **Walk Through Examples:**
    *   Use the given example, a simple example, and an edge case (e.g., empty, single element, all same values, boundary values).
    *   Verbally explain what your code does step-by-step for the example. This helps you catch errors and demonstrates your thought process.

5.  **Write Clean, Readable Code:**
    *   Use meaningful variable names.
    *   Add comments for complex logic.
    *   Break down larger problems into helper functions.

6.  **Analyze Complexity:**
    *   Always state the time and space complexity of your solution.
    *   Explain how you arrived at those complexities.

7.  **Practice Communication:**
    *   Think out loud. Explain your assumptions, alternative ideas, and why you choose a particular approach.
    *   Ask clarifying questions.

---

## Problem-Specific Interview Tips and Variations

### Problem 1: Rotate Array

**Interview Focus:** In-place modification, handling `k > n`.

**Common Pitfalls:**
*   Not handling `k % n`.
*   Off-by-one errors in `reverse` function or indexing.
*   Not considering `nums` being empty or having one element.

**Variations/Follow-up Questions:**
1.  **Rotate Left by `k` steps:** Instead of right. (Solution is very similar, adjust `k` or reversal ranges).
    *   Rotate left by `k` is equivalent to rotating right by `n - k`.
2.  **Rotate 2D Array (Matrix Rotation):** Rotate an image by 90 degrees. (Often solved by transpose + reverse rows/columns).
3.  **Min/Max of Rotated Sorted Array:** Find the minimum or maximum element in a rotated sorted array. (Binary search).
4.  **Search in Rotated Sorted Array:** Search for an element in a rotated sorted array. (Modified binary search).

### Problem 2: Maximum Subarray Sum

**Interview Focus:** Dynamic Programming intuition, greedy approach.

**Common Pitfalls:**
*   Incorrectly initializing `globalMax` and `currentMax` (e.g., to `0` instead of `nums[0]` if all numbers are negative).
*   Off-by-one errors in loop ranges for brute force.

**Variations/Follow-up Questions:**
1.  **Return the Subarray Itself:** Instead of just the sum, return the start and end indices or the actual subarray. (Modify Kadane's to store start/end pointers).
2.  **Max Sum Subarray of Size `k`:** Find the maximum sum of a contiguous subarray of *exactly* size `k`. (Sliding window).
3.  **Max Sum Subarray in a Circular Array:** The ends of the array can connect. (Kadane's + handle wrapping case).
    *   Max sum either lies entirely within the linear array (standard Kadane's) OR wraps around (total sum - min subarray sum).
4.  **Max Product Subarray:** Similar to max sum, but with products, which means negative numbers can turn a small product into a large one. (Track `min_so_far` and `max_so_far`).
5.  **Max Sum of `k` Non-Overlapping Subarrays:** More complex DP.

### Problem 3: Trapping Rain Water

**Interview Focus:** Two-pointer technique, understanding bounding walls.

**Common Pitfalls:**
*   Off-by-one errors when calculating water (e.g., not subtracting `height[i]`).
*   Not handling edge cases like short arrays (`n < 3`).
*   Incorrectly updating `maxLeft` / `maxRight` in two-pointer approach.

**Variations/Follow-up Questions:**
1.  **Trapping Rain Water II (3D):** For a 2D elevation map. (Priority Queue / BFS-like approach from borders). This is significantly harder.
2.  **Smallest Rectangle with Max Water:** Find two bars that would form a container holding the most water. (Two pointers, move pointer from smaller height). This is "Container With Most Water" (LeetCode 11).
3.  **Variant with Slopes:** What if the "width" of the bars could vary?

### Problem 4: Product of Array Except Self

**Interview Focus:** `O(N)` time, `O(1)` space (excluding output), no division. This problem tests careful array traversal and managing intermediate states.

**Common Pitfalls:**
*   Using division (violates constraint).
*   Forgetting to initialize `answer[0]` or `rightProduct`.
*   Incorrectly updating `rightProduct` in the second pass.
*   Not considering edge cases like single-element arrays (problem usually specifies `n >= 2`).

**Variations/Follow-up Questions:**
1.  **Allow Division:** If division were allowed, the problem would be much simpler (compute total product, then divide). Discuss why division is problematic (zeros, overflow potential for total product if not careful with language `int` limits).
2.  **Product of Array Except Self (with zeros allowed in input, but result not fitting in 32-bit):** What if intermediate products could overflow? (Use `long` or BigInteger, but problem specifies 32-bit for product, so it's handled by input constraints).
3.  **Sum of Array Except Self:** (Trivial: total sum - `nums[i]`).
4.  **Generic prefix/suffix computation:** This pattern applies to many problems where you need information from both left and right sides of an element (e.g., visible elements in a line, maximum elements in a window).

---

By understanding these common problems, their various solutions, and potential extensions, you'll be well-prepared for a wide range of array manipulation questions in coding interviews. Good luck!
```