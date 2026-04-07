# Greedy Algorithms: Interview Guide

Greedy algorithms are a common topic in coding interviews due to their elegance, efficiency, and the need for careful proof of correctness. This guide provides tips on how to approach, solve, and discuss greedy problems in an interview setting.

## 1. How to Identify a Greedy Problem

*   **Optimization Goal:** The problem usually asks to maximize or minimize something (e.g., "maximum number," "minimum cost," "largest sum").
*   **Sequential Choices:** You need to make a sequence of choices or decisions.
*   **No Backtracking/Look-ahead:** The crucial hint for greedy is often that choices made now don't seem to negatively impact future choices in a way that would require revisiting previous decisions. There's a strong local optimum that "feels" like it should lead to the global optimum.
*   **Simple Local Heuristic:** There's usually an obvious metric to sort by or a simple rule to follow at each step (e.g., "always pick the cheapest," "always pick the earliest," "always pick the most valuable per unit").

## 2. Approach Strategy in an Interview

1.  **Understand the Problem (The What):**
    *   Clarify inputs, outputs, constraints (e.g., `N` size, time limits, value ranges).
    *   Ask about edge cases (empty input, single element, all elements same).
    *   Work through a small example manually to fully grasp the rules.

2.  **Brainstorm Approaches (The How - Initial):**
    *   **Brute Force:** Briefly describe the brute-force way (e.g., trying all subsets/permutations). This shows you understand the problem space and confirms the need for optimization.
    *   **Dynamic Programming (DP):** Consider if optimal substructure (common to both greedy and DP) or overlapping subproblems are present. DP is a good alternative to greedy if the greedy choice property doesn't hold.
    *   **Greedy:** This is where you test your intuition. "What if I just always pick the `X`? Does that seem to work?" This is the core of identifying a greedy solution.

3.  **Formulate the Greedy Choice:**
    *   Clearly state your greedy heuristic (e.g., "sort by finish time and pick the first compatible").
    *   Test it with a few simple examples (including your manual walkthrough example).
    *   Try to find a counterexample where your greedy choice fails. If you can't, that's a good sign.

4.  **Prove Correctness (The Why - Crucial for Greedy):**
    *   This is often the most challenging and important part for greedy problems. Don't just state the algorithm; explain *why* it's optimal.
    *   **Use an Exchange Argument:**
        *   "Assume there is an optimal solution `O` that does NOT make my greedy choice..."
        *   "Let `G` be my greedy choice. If `G` is not in `O`, or `O` makes a 'bad' choice where `G` would have made a 'good' one..."
        *   "I can swap out part of `O` for `G` to form `O'` such that `O'` is still optimal (or better) and now includes `G` (or makes the 'good' choice)."
        *   "By repeatedly applying this, we can transform any optimal solution into one that matches the greedy strategy, thus proving the greedy strategy is optimal."
    *   Even an informal, intuitive explanation of the exchange argument is better than no explanation. For example, for Activity Selection: "Picking the earliest finishing activity leaves the most time for subsequent activities, so it can't be worse than picking a later-finishing one."

5.  **Implement the Solution:**
    *   Translate your greedy strategy into code.
    *   Pay attention to data structures that support efficient greedy choices (e.g., sorting, priority queues).
    *   Write clean, readable code with meaningful variable names.
    *   Add comments for complex logic.

6.  **Test and Validate:**
    *   Run through your initial example with the code.
    *   Consider edge cases:
        *   Empty input.
        *   Single element.
        *   All elements same.
        *   Maximum/minimum values in constraints.
        *   Cases where greedy might seem to fail (e.g., non-canonical coins for Coin Change).
    *   If you found a counterexample during step 3, demonstrate how your refined greedy algorithm handles it (or explain why the greedy algorithm doesn't apply there, and a different approach is needed).

7.  **Analyze Complexity:**
    *   **Time Complexity:** Identify dominant operations (sorting, loop iterations).
    *   **Space Complexity:** Account for extra data structures used (arrays, maps, etc.).
    *   Discuss trade-offs if multiple greedy implementations are possible (e.g., using a Priority Queue vs. full sort).

## 3. Interview Tips and Variations

*   **Communicate Constantly:** Talk through your thought process. Explain what you're doing and why.
*   **Don't Rush to Code:** Spend enough time discussing the approach and its correctness. A well-justified solution is better than a quickly coded but unproven one.
*   **Be Aware of Greedy's Limitations:** Always question if the greedy choice is *always* optimal. If you suspect it's not, bring it up. This shows maturity.
    *   **Coin Change:** This is the classic example. If denominations are arbitrary, greedy often fails, and DP is required. Be ready to explain this distinction.
    *   **0/1 Knapsack vs. Fractional Knapsack:** Greedy works for fractional (sort by value/weight ratio), but not for 0/1 (requires DP).
*   **Practice Proofs:** The more you practice exchange arguments, the easier they become.
*   **Look for Sorting Opportunities:** Many greedy algorithms involve sorting by a specific key (finish time, ratio, profit, etc.).
*   **Data Structures for Greedy:**
    *   **Sorting:** `Array.prototype.sort()` (O(N log N))
    *   **Priority Queue/Min-Heap/Max-Heap:** For continuously picking the "best" element without re-sorting (O(log N) per operation, total O(N log N)). E.g., Dijkstra's, Prim's.
    *   **Disjoint Set Union (DSU):** For managing sets and finding representatives, useful in some complex greedy problems like optimizing slot finding in Job Sequencing.

## 4. Edge Cases and Gotchas

*   **Empty Input:** Always handle `null`, `undefined`, or empty arrays/lists gracefully.
*   **Single Element:** Does your algorithm still work correctly with just one item?
*   **All Identical Elements:** What if all profits are the same, or all finish times are identical?
*   **Zero/Negative Values:** Can inputs be zero or negative? How should these be handled (e.g., zero capacity, zero profit)?
*   **Floating Point Precision:** For problems involving ratios (like Fractional Knapsack), be mindful of floating-point inaccuracies. You might need to use `toFixed` for comparisons or final results if exact numbers are expected.
*   **Overlaps/Boundaries:** For interval-based problems (like Activity Selection), clarify if `start >= finish` means non-overlapping or if `start > finish` is strictly required. Your solution should match the problem's definition.
*   **Off-by-one Errors:** Especially when dealing with indices, deadlines, or slot numbers (1-based vs. 0-based indexing).

By following this guide, you'll be well-equipped to tackle greedy algorithm problems with confidence in your next coding interview. Good luck!

---