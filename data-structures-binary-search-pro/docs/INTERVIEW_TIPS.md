# Binary Search: Interview Tips and Variations

Binary search is a favorite topic in coding interviews because it tests not only your understanding of the algorithm but also your ability to handle edge cases, adapt to variations, and think critically about problem constraints.

## 1. How to Identify Binary Search Problems

Binary search isn't just about finding an element in a sorted array. Look for these clues:

*   **Sorted Data**: This is the most obvious hint. If the input array/list is sorted, or can be easily sorted, binary search is a strong candidate.
*   **Search for a "Specific" Value**: "Find X", "find the first Y", "find the smallest Z that satisfies a condition".
*   **Range-based Questions**: Problems asking for minimum/maximum values, or "a value within a range" (e.g., finding a peak element, finding the smallest divisor).
*   **Monotonicity**: The most crucial indicator. If the answer space or a condition is monotonic (either strictly increasing or decreasing) with respect to some parameter, binary search can likely be applied.
    *   Example: Is `x` an answer? If `x` is too small, we need a larger `x`. If `x` is too large, we need a smaller `x`. This is "binary search on the answer space".
*   **"Divide and Conquer" Implied**: If you can eliminate half of the remaining search space with each step, think binary search.
*   **Logarithmic Time Complexity Requirement**: If the time constraint is `O(log N)` or `O(log N * F(N))` (where `F(N)` is some other linear or logarithmic operation), binary search is often the way.

## 2. Common Variations and Problem Patterns

Be prepared to adapt the basic binary search to these scenarios:

*   **Finding First/Last Occurrence**: (Covered in `ALGORITHM.md`) Essential for arrays with duplicates.
*   **Search in Rotated Sorted Array**: (Covered in `ALGORITHM.md`) Requires identifying the sorted half.
    *   **Follow-up**: What if there are duplicates in the rotated array? This makes it harder as `arr[low] == arr[mid] == arr[high]` can exist, making it impossible to determine which half is sorted. In such cases, you might have to linearly advance `low` or `high` and potentially fall back to `O(N)` in the worst case (e.g., `[1,1,1,1,1,1,1,0,1,1,1,1]`).
*   **Binary Search on the Answer**: (Covered in `ALGORITHM.md`) This is a powerful technique.
    *   **Examples**:
        *   `mySqrt(x)`
        *   Find the smallest divisor given a threshold.
        *   Minimum capacity to ship packages within D days.
        *   Koko eating bananas (minimum speed).
        *   Minimize maximum distance to gas station.
        *   Finding the Nth root of a number.
*   **Finding a Peak Element**: In an array where `arr[i-1] < arr[i] > arr[i+1]`. Can be solved in `O(log N)` by checking `arr[mid]` against `arr[mid+1]` to decide which half contains a peak.
*   **Finding a Missing Element/Duplicate in a Sorted Range**: Use binary search to find the "break point" in the expected sequence.
*   **Kth Smallest/Largest Element**: Especially in combined/imaginary sorted structures (like two sorted arrays, or a matrix).
*   **Problems on Bitonic Arrays**: An array that first increases and then decreases. Find max element, search for an element.
*   **Implicitly Sorted Data**: Data that isn't explicitly in an array but has a monotonic property. Example: Search space for optimal resource allocation.

## 3. Interview Tips

*   **Clarify Constraints and Edge Cases**: Always ask about array size (empty, single element), duplicates, range of numbers, and whether target always exists. This shows thoughtfulness.
*   **Choose Your Template**: Decide on `low <= high` vs `low < high`, and how `low`/`high` are updated. Stick to one pattern you're comfortable with. I recommend `while (low <= high)` for its robustness in many scenarios.
*   **Handle `mid` Calculation Safely**: `mid = low + (high - low) / 2;` to prevent overflow.
*   **Draw Diagrams**: For complex binary search problems (e.g., rotated array, `k`th smallest), drawing out the `low`, `high`, `mid` pointers and the comparisons can help you reason about the logic. Use a small example.
*   **Talk Through Your Logic**: Explain why `low` moves to `mid + 1` or `mid`, and `high` moves to `mid - 1` or `mid`. Articulate your loop invariant and what `low` and `high` represent at each step.
*   **Test with Examples**: Always manually trace your code with a few test cases:
    *   Target not found.
    *   Target at beginning, middle, end.
    *   Single element array.
    *   Array with duplicates (if applicable).
    *   Edge cases specific to the problem (e.g., rotation point for rotated arrays).
*   **Be Mindful of Return Values**: What should be returned if the element is not found? -1? An index indicating insertion point?
*   **Time and Space Complexity Analysis**: Always state and justify the O(log N) time and O(1) space (for iterative) or O(log N) (for recursive) complexities.

By approaching binary search problems with a structured mindset, understanding its variations, and practicing common pitfalls, you'll be well-prepared for any binary search question an interviewer throws at you.

---