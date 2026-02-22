```markdown
# Graph Algorithms: Interview Tips and Variations

Mastering graph algorithms is crucial for many technical interviews. This document provides guidance on how to approach graph problems, common interview questions, variations to expect, and tips for articulation.

---

## General Approach to Graph Problems

1.  **Understand the Graph Type:**
    *   **Directed vs. Undirected:** Does edge `A->B` imply `B->A`?
    *   **Weighted vs. Unweighted:** Are there costs associated with edges? Are they non-negative?
    *   **Cyclic vs. Acyclic (DAG):** Can you revisit nodes on a path?
    *   **Connected vs. Disconnected:** Is the graph a single component or multiple?
    *   **Sparse vs. Dense:** Does `E` (edges) approximate `V` (vertices) or `V^2`? (Influences choice of adjacency list vs. matrix).
    *   **Implicit vs. Explicit:** Is the graph given directly (adjacency list/matrix) or do you need to construct it (e.g., from a grid, puzzles)?

2.  **Choose the Right Representation:**
    *   **Adjacency List (Map<NodeId, Edge[]>):** Generally preferred for sparse graphs, efficient for iterating neighbors (O(degree(V))), O(V+E) space.
    *   **Adjacency Matrix (boolean[][] or number[][]):** Good for dense graphs, O(1) checking for edge existence, O(V^2) space. Less common in interviews unless specifically requested.

3.  **Select the Appropriate Algorithm:**
    *   **BFS (Breadth-First Search):**
        *   Shortest path in **unweighted** graphs.
        *   Finding all reachable nodes/connected components.
        *   Level-order traversal.
    *   **DFS (Depth-First Search):**
        *   Cycle detection (both directed and undirected).
        *   Topological sort.
        *   Finding strongly connected components (SCCs).
        *   Path finding (any path, not necessarily shortest).
    *   **Dijkstra's Algorithm:**
        *   Shortest path from **single source** in **weighted graphs with non-negative** edge weights.
    *   **Bellman-Ford Algorithm:**
        *   Shortest path from **single source** in **weighted graphs with negative** edge weights (detects negative cycles).
    *   **Floyd-Warshall Algorithm:**
        *   All-pairs shortest paths (works with negative weights, detects negative cycles).
    *   **Prim's / Kruskal's Algorithms:**
        *   Minimum Spanning Tree (MST) in undirected, weighted graphs.
    *   **Topological Sort:**
        *   Ordering tasks with dependencies (e.g., course schedule, build systems) in **DAGs**.

4.  **Handle Edge Cases:**
    *   Empty graph.
    *   Single-node graph.
    *   Disconnected components.
    *   Self-loops.
    *   Parallel edges (multiple edges between same two nodes).
    *   Non-existent start/end nodes.

5.  **Complexity Analysis:** Always state and justify time and space complexity. This is crucial.

---

## Interview Tips

*   **Clarify Constraints:** Ask about the graph type, size limits (V, E), edge weights, and expected output. Don't assume anything.
*   **Draw Diagrams:** Use examples to walk through your logic. ASCII art on a whiteboard or a simple drawing tool can be very helpful. Visualize the queue/stack/visited set.
*   **Explain Your Thinking:** Verbalize your thought process. Why are you choosing BFS over DFS? How does the priority queue work? What data structures are you using and why?
*   **Start with Brute Force (if applicable):** Sometimes, a simpler, less optimal solution can be a good starting point to establish correctness before optimizing. However, for most fundamental graph algos, the "optimal" is often the standard one.
*   **Practice Data Structures:** A strong grasp of `Maps`, `Sets`, `Queues`, `Stacks`, and `Priority Queues` is essential. Implement them yourself to understand their mechanics.
*   **Pre-computation:** Mention if some parts of the algorithm can be pre-computed for multiple queries (e.g., running Dijkstra once for all source-destination queries).
*   **Discuss Variations:** After solving the core problem, be prepared to discuss variations or extensions.

---

## Common Interview Questions & Variations

### Graph Traversal (BFS/DFS)

1.  **Reachability:** Is node `X` reachable from node `Y`? (BFS/DFS)
2.  **Shortest Path (Unweighted):** Find the shortest path between `A` and `B` (number of edges). (BFS)
    *   **Variation:** Return *all* shortest paths.
    *   **Variation:** Shortest path on a grid (often implicitly a graph problem).
3.  **Connected Components:** Count the number of connected components in an undirected graph. (BFS/DFS)
    *   **Variation:** Find all nodes in each component.
    *   **Variation (Directed):** Find Strongly Connected Components (SCCs - typically Kosaraju's or Tarjan's, more advanced).
4.  **Cycle Detection:**
    *   Undirected graph. (DFS with parent tracking)
    *   Directed graph. (DFS with 3 states: unvisited, visiting, visited)
5.  **Flood Fill / Island Counting:** Given a 2D grid, count islands, or fill an area. (BFS/DFS on grid)
6.  **Bipartite Check:** Is the graph bipartite? (BFS/DFS with 2-coloring)

### Shortest Path (Weighted)

1.  **Dijkstra's Core:** Find the shortest path from a source to all other nodes in a weighted graph (non-negative weights).
    *   **Variation:** Shortest path between two specific nodes (can stop Dijkstra early).
    *   **Variation:** Handling edge cases like disconnected nodes.
    *   **Variation:** What if there are negative weights? (Bellman-Ford discussion)
2.  **K-th Shortest Path:** Find the K-th shortest path (more advanced, usually involving Yen's algorithm or modified Dijkstra with multiple path tracking).

### Topological Sort

1.  **Course Schedule:** Given a list of courses and their prerequisites, return a valid course order. (Topological Sort)
    *   **Variation:** Return `true` if a valid schedule exists, `false` otherwise (cycle detection).
    *   **Variation:** Return *any* valid schedule.
    *   **Variation:** Return *all* valid schedules.
2.  **Build System Dependencies:** Order tasks in a build system based on dependencies. (Topological Sort)
3.  **Dependency Resolution:** Determine the order of execution for jobs with dependencies.

### Minimum Spanning Tree (MST - Not implemented in this project, but common)

1.  **Prim's Algorithm / Kruskal's Algorithm:** Find the MST of an undirected, weighted graph.
    *   **Variation:** Finding a Maximum Spanning Tree.
    *   **Variation:** Applying it to network design or clustering problems.

---

## Articulating Your Solution

*   **Problem Statement:** Restate the problem in your own words to confirm understanding.
*   **Assumptions:** Clearly state any assumptions you're making (e.g., "assuming node IDs are unique strings").
*   **High-Level Idea:** Briefly explain the core algorithm you plan to use and why it's suitable.
*   **Data Structures:** Detail the data structures you'll use (adjacency list, queue, set, map, priority queue) and their purpose.
*   **Step-by-Step Walkthrough:** Use a small example to demonstrate the algorithm's flow.
*   **Edge Cases:** Discuss how your solution handles edge cases.
*   **Complexity Analysis:** Provide time and space complexity, justifying your reasoning.
*   **Trade-offs:** If multiple approaches exist, discuss their trade-offs (e.g., BFS for unweighted shortest path vs. Dijkstra for weighted).
*   **Test Cases:** Be ready to suggest test cases (including edge cases).

Remember, the goal is not just to get the right answer, but to demonstrate your problem-solving process, communication skills, and understanding of fundamental computer science concepts.
```