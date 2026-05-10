# Greedy Algorithms - Interview Tips and Variations

Greedy algorithms are a common topic in coding interviews because they test your ability to identify problems with specific structural properties and to prove the correctness of a chosen heuristic.

## 1. How to Identify a Greedy Problem

It's often challenging to distinguish problems solvable by a greedy approach from those requiring Dynamic Programming or other techniques. Look for these signs:

*   **Optimal Substructure:** A problem exhibits optimal substructure if an optimal solution to the problem contains optimal solutions to subproblems. This is common to both greedy algorithms and dynamic programming.
*   **Greedy Choice Property:** This is the distinguishing factor. Can you make a "locally optimal" choice at each step that always leads to a "globally optimal" solution? If picking the "best" immediate option doesn't jeopardize future optimal choices, it might be greedy.
*   **No "Look Back" Needed:** If your decision at any step doesn't depend on future optimal solutions to subproblems, and once made, it's final and doesn't need to be reconsidered, it leans towards greedy. Dynamic programming often requires considering results of all possible previous subproblems.
*   **Maximization/Minimization Problems:** Many greedy problems involve maximizing or minimizing a certain quantity (e.g., max activities, min coins, max profit).

**Common Themes:**
*   Sorting is often a prerequisite step for greedy algorithms (e.g., by finish time, by profit, by value/weight ratio).
*   Interval scheduling, activity selection, knapsack (fractional), minimum spanning tree, Dijkstra's algorithm.

## 2. Common Pitfalls and Gotchas

*   **Premature Optimization:** Don't assume a problem is greedy. Always try to prove the greedy choice property. If you can find a counterexample, then greedy won't work optimally (e.g., Coin Change for arbitrary denominations).
*   **Incorrect Greedy Choice:** Even if a greedy approach seems plausible, the specific greedy choice might be wrong. For instance, in Activity Selection, sorting by start time wouldn't work, but sorting by finish time does.
*   **Overlapping Subproblems vs. Disjoint Subproblems:**
    *   If subproblems created by a greedy choice are *disjoint* (don't share common sub-subproblems), then a greedy algorithm is often appropriate.
    *   If subproblems *overlap*, dynamic programming is usually more suitable.
*   **Proof Difficulty:** Proving the greedy choice property can be tricky. Often, a proof by contradiction or an exchange argument (showing you can swap a non-greedy choice with a greedy one without loss of optimality) is used. In an interview, explaining the intuition clearly might be sufficient if a formal proof is too time-consuming.

## 3. Interview Strategies and Tips

*   **Listen Carefully to Constraints:** Pay attention to whether items can be fractional (Knapsack) or if a specific coin system is canonical (Coin Change). These details determine if greedy is applicable.
*   **Start with Brute Force (Mentally):** Understand the full search space first. This helps in formulating the problem and identifying where a greedy heuristic could cut down the search.
*   **Formulate a Greedy Strategy:** Propose a greedy choice. What is the "best" immediate decision?
*   **Test with Examples (Crucial!):** Use small, diverse examples to test your greedy strategy. Try to find a counterexample. If you find one, your greedy strategy is likely incorrect, and you might need DP or another approach.
*   **Explain Your Reasoning:**
    *   Clearly state your greedy choice.
    *   Explain *why* you think it works (intuition for greedy choice property).
    *   Explain optimal substructure.
    *   Describe the algorithm steps, including any pre-processing like sorting.
    *   Analyze time and space complexity.
*   **Be Prepared for Alternatives:** If your greedy approach fails or isn't optimal, be ready to discuss dynamic programming or other algorithms. For example, for 0/1 Knapsack or general Coin Change, discuss DP.
*   **Corner Cases:** Think about empty inputs, single element inputs, all-overlapping/non-overlapping scenarios, zero values/weights, etc.
*   **Communicate Clearly:** Talk through your thought process. Even if you're stuck, explaining your current ideas and why they might not work shows problem-solving skills.

## 4. Common Variations

*   **Activity Selection:**
    *   Selecting activities with maximum profit (activities have weights/values). This usually leads to DP.
    *   Minimum number of machines to schedule all activities.
*   **Knapsack:**
    *   0/1 Knapsack (items cannot be split) - Requires DP.
    *   Bounded Knapsack (multiple copies of items) - Requires DP.
    *   Unbounded Knapsack (infinite copies of items) - Requires DP.
*   **Coin Change:**
    *   Number of ways to make change (not minimum coins) - Requires DP.
*   **Job Sequencing:**
    *   Jobs with different processing times.
    *   Jobs with deadlines and profits (as covered) but with more complex dependencies.
*   **Other Greedy Algorithms:**
    *   **Dijkstra's Algorithm:** Shortest path in graphs with non-negative edge weights. Greedy choice: always pick the unvisited vertex with the smallest known distance.
    *   **Prim's / Kruskal's Algorithms:** For Minimum Spanning Trees (MST). Greedy choice: Prim's grows tree by adding cheapest edge from tree to non-tree vertex; Kruskal's adds cheapest edge that doesn't form a cycle.
    *   **Huffman Coding:** For data compression. Greedy choice: repeatedly combine the two least frequent symbols/trees.

By understanding these principles, common pitfalls, and variations, you can approach greedy algorithm problems in interviews with greater confidence.