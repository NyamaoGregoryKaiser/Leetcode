```markdown
# Binary Search: Interview Tips and Variations

Binary Search is a classic algorithm often used in coding interviews. It tests your ability to handle edge cases, precise pointer manipulation, and adapt a core algorithm to various problem constraints.

## General Interview Strategy for Binary Search Problems

1.  **Clarify Prerequisites:**
    *   **Is the array sorted?** This is the #1 question. If not, can it be sorted? If sorting is allowed, is it efficient enough (O(N log N) + O(log N) might be too slow if N is huge).
    *   **Are there duplicates?** If so, what should be returned (any index, first, last)?
    *   **What are the constraints?** (Array size, element range, time/space limits).

2.  **Brute-Force (If Applicable):**
    *   Briefly mention the brute-force approach (e.g., linear scan for O(N)). This shows you can identify simpler solutions and then contrast it with the optimal one.

3.  **Core Binary Search Logic:**
    *   Explain the divide-and-conquer principle.
    *   Define `low`, `high`, and `mid` pointers.
    *   Outline the comparison logic: `arr[mid] == target`, `arr[mid] < target`, `arr[mid] > target`.

4.  **Pointer Updates and Loop Condition (`low <= high` vs `low < high`):**
    *   This is where precision matters. Clearly state your choice and why.
    *   For `low <= high`: When `arr[mid]` matches `target`, you `return mid`. If not, `low = mid + 1` or `high = mid - 1`. Loop ends when `low > high`.
    *   For `low < high`: This is often used when the final `low` (or `high`) is the answer, and `mid` is part of the shrinking search space. Be careful with `mid` calculation and `low = mid` updates to avoid infinite loops (use `mid = low + (high - low + 1) / 2` if `low = mid` is a possibility).

5.  **Edge Cases and Error Handling:**
    *   **Empty array, null array:** How do you handle them?
    *   **Single-element array:** Does your logic work?
    *   **Target at first/last index:** Check these boundaries.
    *   **Target not found:** What's the return value?
    *   **Integer Overflow:** Mention `mid = low + (high - low) / 2`.
    *   **Duplicates:** Discuss how your solution handles them, especially if the problem asks for first/last occurrence.

6.  **Walkthrough with an Example:**
    *   Pick a small, non-trivial example (e.g., `[2, 5, 7, 8, 11, 12]` target 13, or target 7).
    *   Trace `low`, `high`, `mid`, and `arr[mid]` values through each step. This demonstrates clarity of thought.

7.  **Code and Test:**
    *   Write clean, well-commented code.
    *   Verbally test your code with the edge cases you discussed.
    *   Consider one custom test case you haven't yet discussed.

8.  **Complexity Analysis:**
    *   Clearly state Time (O(log N)) and Space (O(1) for iterative, O(log N) for recursive) complexities and justify them.

## Common Variations and Follow-ups

Interviewers often start with a basic binary search and then ask variations to gauge your adaptability.

1.  **Find First/Last Occurrence (Lower Bound / Upper Bound):**
    *   "Given a sorted array with duplicates, find the index of the first `X`."
    *   *Tip:* When `arr[mid] == target`, save `mid` as a potential answer and continue searching in the left half (`high = mid - 1`) to find an even earlier occurrence. For last, search right (`low = mid + 1`).

2.  **Search in Rotated Sorted Array:**
    *   "A sorted array `[0,1,2,4,5,6,7]` is rotated to `[4,5,6,7,0,1,2]`. Search for a target."
    *   *Tip:* Determine which half (`[low...mid]` or `[mid...high]`) is sorted by comparing `arr[low]` with `arr[mid]`. Then check if the target falls within the sorted half. If not, it must be in the unsorted half.

3.  **Find Minimum/Maximum in Rotated Sorted Array:**
    *   "Find the minimum element in a rotated sorted array (no duplicates)."
    *   *Tip:* The minimum element is the only one that is smaller than its previous element (or `arr[0]` if not rotated). Binary search can quickly find the "discontinuity" point. Compare `arr[mid]` with `arr[high]`. If `arr[mid] > arr[high]`, the minimum is in `[mid+1, high]`. Else, it's in `[low, mid]`.

4.  **Find `sqrt(x)`:**
    *   "Implement `int sqrt(int x)`."
    *   *Tip:* Binary search on the *answer range* `[0, x]` (or `[0, x/2 + 1]` for optimization). Check `mid * mid`. Be careful about `mid * mid` overflow for large `mid` values (use `long` for `mid` or check `mid > x / mid`).

5.  **Find Peak Element:**
    *   "Find a peak element in an array (an element greater than its neighbors)."
    *   *Tip:* If `nums[mid] < nums[mid+1]`, you are on an ascending slope, so a peak must exist to the right (including `mid+1`). Set `low = mid + 1`. Otherwise, `nums[mid] > nums[mid+1]`, you are on a descending slope or at a peak. A peak must exist at `mid` or to its left. Set `high = mid`.

6.  **Binary Search on "Answer" or Predicate:**
    *   "Minimize the maximum capacity to ship packages within `D` days."
    *   *Tip:* The "answer" (maximum capacity) is not an index but a value within a range (e.g., `[max(weights), sum(weights)]`). You binary search on this value range. For each `mid` value, you write a helper function `canShip(capacity)` which returns true/false, effectively transforming the problem into "find the smallest `mid` for which `canShip(mid)` is true."

## Key Takeaways for Interview Success

*   **Communicate your thought process:** Explain *why* you're making certain decisions (e.g., why `mid + 1` vs `mid`).
*   **Be precise:** Off-by-one errors are common; show you're aware of them and how to prevent them.
*   **Handle edge cases:** This is a major differentiator between a good and an average solution.
*   **Practice, practice, practice:** The more variations you solve, the more comfortable you'll become.

Good luck with your interviews!
```