# Interview Tips and Problem Variations for Array Manipulation

This document provides advice on how to approach array manipulation problems in a coding interview, highlights common edge cases, and suggests potential variations.

---

## General Interview Tips for Array Problems

1.  **Understand the Problem Thoroughly:**
    *   What are the inputs and outputs? (e.g., array of numbers, strings, objects).
    *   Are there constraints on size (N), element values?
    *   Is the array sorted? Does it contain duplicates?
    *   Crucially: **Is the manipulation required in-place?** This heavily impacts space complexity and algorithm choice.
    *   Can you use extra space? How much? (O(1), O(N), O(logN)?)
    *   What are the time complexity requirements? (O(N), O(N log N), O(N^2)?)

2.  **Start with Brute Force (if stuck):**
    *   Don't be afraid to describe a naive, inefficient solution first. This shows you understand the problem.
    *   This also provides a baseline for correctness and complexity.
    *   It can help you identify patterns or subproblems that lead to optimization.

3.  **Think about Edge Cases:**
    *   Empty array `[]`
    *   Single-element array `[x]`
    *   Two-element array `[x, y]`
    *   Arrays with all same elements `[1, 1, 1]`
    *   Arrays with all unique elements
    *   Arrays with only positive/negative/zero values
    *   `k` (for rotation) being 0, equal to `N`, or greater than `N`.

4.  **Common Array Techniques/Patterns:**
    *   **Two Pointers:** Often used for sorted arrays, or to process from both ends (e.g., `Trapping Rain Water`, `Reverse Array`, `Two Sum` with sorted input).
    *   **Sliding Window:** For problems involving contiguous subarrays/subsequences of a certain size or satisfying a condition (e.g., `Max Subarray Sum`, `Longest Substring Without Repeating Characters`).
    *   **Prefix Sums/Products:** Precomputing sums/products of prefixes can turn O(N) sum/product calculation for each subarray into O(1) (e.g., `Product Except Self`, `Range Sum Query`).
    *   **Sorting:** Sometimes sorting the array first simplifies the problem, but remember its `O(N log N)` cost.
    *   **Hashing/Maps:** Efficiently store and retrieve elements or their counts (e.g., `Two Sum`, `Contains Duplicate`).
    *   **In-place manipulation:** Look for ways to swap elements, use the array itself for temporary storage, or reverse parts.
    *   **Dynamic Programming:** If optimal substructure and overlapping subproblems exist (`Max Subarray Sum`, `Trapping Rain Water` DP approach).

5.  **Talk Through Your Thoughts:**
    *   Explain your current approach, even if it's just a brute force.
    *   Articulate trade-offs (time vs. space).
    *   Mention alternative ideas you considered and why you discarded them (or why they might be better for different constraints).
    *   Don't be silent for too long.

6.  **Write Clean, Readable Code:**
    *   Meaningful variable names.
    *   Clear logic, possibly with comments for complex parts.
    *   Modular functions if possible.

7.  **Test Your Code:**
    *   Verbally walk through your code with an example.
    *   Test with the edge cases you identified.

---

## Problem-Specific Edge Cases & Gotchas

### Rotate Array

*   **`k` values:**
    *   `k = 0`: No rotation needed.
    *   `k = nums.length`: No effective rotation needed (same as `k=0`).
    *   `k > nums.length`: `k` should be normalized using `k = k % nums.length`.
*   **Array size:** Empty array `[]`, single element `[x]`.
*   **In-place requirement:** This is the most common trick. Approaches using `splice`, `slice`, `concat` might create new arrays and thus not be truly in-place. The reverse technique or cyclic replacement are the go-to in-place optimal solutions.

### Maximum Subarray Sum

*   **All negative numbers:** The answer is the single largest negative number (e.g., `[-5, -1, -3]` -> `-1`). Kadane's algorithm handles this correctly by initializing `currentMax` and `globalMax` with `nums[0]`.
*   **Single element array:** `[5]` -> `5`, `[-5]` -> `-5`.
*   **Array with zeros:** Zeros can extend a negative sum to 0 or have no effect on a positive sum.
*   **Empty array:** Typically problem constraints prevent this, but if allowed, the sum could be 0 or negative infinity.

### Trapping Rain Water

*   **`N < 3`:** No water can be trapped with less than three bars.
*   **Monotonic arrays:** `[1,2,3,4,5]` or `[5,4,3,2,1]` will trap 0 water.
*   **Uniform heights:** `[2,2,2,2,2]` will trap 0 water.
*   **Bars at ends:** The first and last bars cannot trap water. The logic usually focuses on inner bars or accounts for boundaries.
*   **Zero heights:** `[2,0,2]` traps 2 units. `[0,1,0,2,0,1,0]` traps water.
*   **Large heights/many bars:** `O(N^2)` solutions will TLE (Time Limit Exceeded). `O(N)` is required.

### Product of Array Except Self

*   **Zeroes:** This is the biggest gotcha.
    *   **One zero:** If `nums` contains exactly one zero at index `i`, then `answer[i]` will be the product of all *non-zero* elements, and all other `answer[j]` (where `j != i`) will be `0`.
    *   **Two or more zeros:** If `nums` contains two or more zeros, then all elements in `answer` will be `0`.
*   **No division constraint:** This pushes you away from the most intuitive solution (`total_product / nums[i]`) towards prefix/suffix products.
*   **Large numbers:** The problem typically states that the product will fit in a 32-bit integer to avoid overflow concerns, but be mindful in other languages where explicit handling might be needed.
*   **Small array size:** `N=2` is the minimum. Example: `[1,2]` -> `[2,1]`.

---

## Problem Variations

### Rotate Array

*   **Rotate left:** Same logic as rotate right, but `k` steps left is equivalent to `n - k` steps right (where `n` is array length). Or, adjust indices: `(i - k + n) % n`.
*   **Rotate a 2D matrix (in-place):** More complex, often involves transposing and then reversing rows/columns, or layer-by-layer rotation.
*   **Rotate specific window/subarray:** Modify the problem to rotate only a part of the array.

### Maximum Subarray Sum

*   **Return the subarray itself:** Instead of just the sum, return the start and end indices of the subarray. Kadane's can be extended to track these.
*   **Maximum subarray product:** Similar to sum, but handles negative numbers differently (e.g., two negatives make a positive). Requires tracking `minCurrentProduct` as well.
*   **Maximum sum of a *circular* subarray:** The subarray can wrap around the ends of the array. This can be solved by Kadane's algorithm (max subarray sum of normal array) and `totalSum - minSubarraySum` (where `minSubarraySum` is the minimum sum of a normal subarray).
*   **Kadane's for 2D arrays:** Find the maximum sum sub-rectangle. More complex, involves applying Kadane's on each possible column range.

### Trapping Rain Water

*   **Using a stack:** An alternative `O(N)` time, `O(N)` space solution uses a monotonic stack to find bounding walls. Good to mention as an alternative.
*   **Trapping rain water II (3D):** Given a 2D elevation map, compute how much water it can trap. This is a significantly harder problem, usually solved with a min-heap (priority queue) and BFS/Dijkstra-like approach.
*   **Finding highest peaks/lowest valleys:** Related problems involving local maxima/minima.

### Product of Array Except Self

*   **Return product of *k* largest/smallest elements:** Requires sorting or a min/max heap.
*   **Product of array elements within a sliding window:** Use a deque or manually track products as the window slides. Handling zeros becomes critical here.
*   **Product of array except self *with* division allowed:** Simple one-pass solution.
*   **Follow up: What if the array contains very large numbers such that their product overflows a 32-bit (or 64-bit) integer?** Discuss using BigInt in JavaScript, or custom large number arithmetic in other languages.
```