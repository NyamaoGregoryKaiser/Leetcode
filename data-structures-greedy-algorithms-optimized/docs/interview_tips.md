# Greedy Algorithms: Interview Tips and Variations

Greedy algorithms are a common topic in coding interviews because they test your ability to identify the core components of a problem, make logical local choices, and, critically, reason about the optimality of those choices.

## Interview Approach for Greedy Problems

1.  **Understand the Problem Thoroughly**:
    *   Clarify constraints: input size, data types, time/space limits.
    *   Ask about edge cases: empty input, single element, negative numbers, zeros, duplicates.
    *   Work through a small example manually.

2.  **Look for a Greedy Choice**:
    *   **What is the "best" immediate decision you can make at any step?**
        *   Smallest? Largest? Earliest? Latest? Highest ratio?
    *   **Does this choice seem to lead towards a global optimum?**
    *   Try different greedy choices if your first thought doesn't work.

3.  **Formulate the Greedy Strategy**:
    *   Describe the steps you would take.
    *   How would you sort the input (if necessary)?
    *   What data structures would you use to efficiently make your greedy choices (e.g., priority queue, sorted array/list)?

4.  **Test with Examples (Crucial!):**
    *   Run your proposed greedy strategy against the example(s) you worked through.
    *   **Crucially, try to find a counter-example where your greedy strategy fails.** This is where most candidates (and interviewers) learn the most. If you find one, it's a great opportunity to pivot to another approach (like Dynamic Programming) or refine your greedy choice.

5.  **Argue for Optimality (or explain why it fails):**
    *   If you believe your greedy strategy is optimal, be prepared to explain *why*. A high-level exchange argument is often sufficient: "Suppose there's a better solution... I can transform it into my greedy solution without loss of optimality."
    *   If your greedy strategy fails, clearly articulate *why* it fails. This shows critical thinking. "The greedy choice here prevents us from making a better overall choice later."

6.  **Code the Solution**:
    *   Write clean, well-commented code.
    *   Handle edge cases you discussed.
    *   Use appropriate data structures and standard library functions (e.g., `std::sort`, `std::priority_queue`).

7.  **Analyze Complexity**:
    *   Determine the time and space complexity of your solution.
    *   Discuss trade-offs if multiple implementations are possible.

## Common Greedy Algorithm Patterns

*   **Sorting-based**: Many greedy problems become easier after sorting the input by a specific criterion (e.g., finish time for Activity Selection, ratio for Fractional Knapsack).
*   **Priority Queue-based**: When you need to repeatedly extract the "best" element from a collection that changes, a min- or max-priority queue is often the right tool (e.g., Huffman Coding).
*   **Two-pointer approach**: Sometimes used in combination with sorting to make greedy choices by moving pointers inward or outward.
*   **Iterative Construction**: Build the solution piece by piece, making the optimal choice at each step.

## Interview Tips & Gotchas

*   **Don't force greedy**: If it feels like a greedy choice is *not* obviously correct, or if you can quickly come up with a counterexample, don't waste too much time trying to prove it. Consider Dynamic Programming or backtracking.
*   **Clarify constraints on inputs**: For example, "Are coin denominations sorted?" or "Can item weights be zero?"
*   **Be explicit about your greedy choice**: Clearly state what criterion you're using for your local optimum.
*   **Think about tie-breaking**: What happens if two items have the same ratio or two activities finish at the same time? Does it affect correctness? (Usually not, but worth considering).
*   **Edge cases**: Always explicitly discuss and handle empty inputs, single element inputs, and constraints limits (e.g., `capacity = 0`).
*   **Proof Sketch**: You don't usually need a formal mathematical proof in an interview, but a convincing high-level argument (like the exchange argument) is highly valued.
*   **Recognize classic problems**: Knowing classic greedy problems (Activity Selection, Fractional Knapsack, Huffman, Minimum Spanning Tree algorithms like Prim's/Kruskal's, Dijkstra's) helps you quickly identify patterns.

## Variations and Related Problems

*   **Job Sequencing with Deadlines**: Given jobs with deadlines and profits, maximize total profit. (Sort by profit, place in earliest available slot from deadline backwards).
*   **Minimum Spanning Tree (MST)**: Prim's and Kruskal's algorithms are greedy.
    *   Prim's: Greedily add the cheapest edge connecting a vertex in the MST to a vertex outside the MST.
    *   Kruskal's: Greedily add the cheapest edge that does not form a cycle.
*   **Shortest Path (Dijkstra's Algorithm)**: Greedy algorithm that always extracts the unvisited vertex with the smallest known distance.
*   **Interval Scheduling**: A generalization of Activity Selection where you might have weights on activities (then it often becomes DP).
*   **Change-making (General)**: When the coin denominations are arbitrary (non-canonical), greedy fails. This problem requires Dynamic Programming.
*   **0/1 Knapsack**: The classic problem where items cannot be broken. Greedy on value/weight ratio fails. This requires Dynamic Programming.

By understanding these principles and practicing with various problems, you'll be well-prepared to tackle greedy algorithm questions in your coding interviews.

---