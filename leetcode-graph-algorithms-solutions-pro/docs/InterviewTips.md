```markdown
# Graph Algorithms - Interview Tips, Edge Cases, and Variations

This document provides insights into common pitfalls, edge cases, and typical interview questions related to the graph algorithms implemented in this project.

## General Interview Tips for Graph Problems

1.  **Clarify the Graph Type:** Always ask:
    *   Is it directed or undirected?
    *   Is it weighted or unweighted?
    *   Are there negative weights? (Changes shortest path algorithms: Dijkstra fails, Bellman-Ford/SPFA needed)
    *   Are there self-loops or parallel edges?
    *   Is it guaranteed to be connected?
    *   Is it a DAG (Directed Acyclic Graph)?
    *   What are the constraints on V (number of vertices) and E (number of edges)? (Crucial for complexity analysis)

2.  **Representations:** Understand and be ready to implement both Adjacency List (for sparse graphs) and Adjacency Matrix (for dense graphs). Adjacency List is generally preferred unless specified.

3.  **Traversal Strategy:**
    *   **BFS:** Good for shortest paths in unweighted graphs, finding connected components, level-order traversal.
    *   **DFS:** Good for cycle detection, topological sort, finding connected components (and SCCs in directed graphs), pathfinding (not necessarily shortest).

4.  **Handle Disconnected Components:** Remember to iterate through all vertices and start BFS/DFS from any unvisited vertex to ensure all components are covered.

5.  **Complexity Analysis:** Always provide Time and Space Complexity (Big O notation) for your solution.
    *   BFS/DFS: `O(V + E)` for adjacency list, `O(V^2)` for adjacency matrix.
    *   DSU: `O(α(V))` per operation (practically `O(1)`), so `O(V)` for initialization and `O(E * α(V))` for E operations.
    *   Sorting (e.g., Kruskal's): `O(E log E)`.

6.  **Edge Cases:**
    *   Empty graph (V=0, E=0).
    *   Single-node graph (V=1, E=0).
    *   Graph with two nodes, no edge.
    *   Disconnected graphs.
    *   Graphs with only one path/component.
    *   Graphs with many parallel paths/components.

7.  **Talk Through Your Thought Process:** Explain your chosen algorithm, why it's suitable, how you handle edge cases, and its complexity before writing code. Pseudocode can be helpful.

## Algorithm-Specific Tips and Variations

### 1. Shortest Path in Unweighted Graph (BFS)

*   **Core Idea:** BFS explores layer by layer, naturally finding the path with the fewest edges.
*   **Edge Cases:**
    *   `start` or `end` node not in the graph: Handle by returning `null` or `empty list` and printing an error.
    *   `start` == `end`: Path is just `[start]`, distance is `0`.
    *   Disconnected graph: If `end` is unreachable, BFS queue will empty. Return `empty list` or `-1` distance.
*   **Variations/Follow-ups:**
    *   **Shortest path in weighted graph:** Dijkstra's (non-negative weights) or Bellman-Ford (negative weights).
    *   **All-pairs shortest path:** Floyd-Warshall.
    *   **Number of shortest paths:** Modify BFS to count paths when multiple paths of the same shortest length are found.
    *   **Path with specific constraints:** (e.g., shortest path visiting specific nodes, shortest path avoiding certain nodes/edges). This often requires modifications to BFS/DFS state or using advanced techniques.
    *   **Grid problems:** Often map to unweighted graph BFS where cells are nodes and valid moves are edges.

### 2. Cycle Detection in Undirected Graph

*   **DFS Approach:**
    *   **Key Idea:** Back-edge to a visited node that isn't the immediate parent signifies a cycle.
    *   **Gotchas:** *Crucially*, ignore the edge leading back to the parent in the DFS tree. Without `if (neighbor != parent)`, every edge `(u,v)` in an undirected graph would falsely appear as a cycle `u -> v -> u`.
    *   **Edge Cases:** Self-loops `(u, u)` count as a cycle. The `neighbor != parent` check needs careful thought for self-loops; usually, `parent` is `null` for the root, so `neighbor == parent` would be false for a self-loop on the root, correctly detecting it.
*   **DSU Approach:**
    *   **Key Idea:** If an edge `(u, v)` connects two nodes already in the same set, a cycle exists.
    *   **Gotchas:** DSU is very efficient for *undirected* graphs. Do not apply it directly to *directed* graphs for general cycle detection (it would only detect cycles that are undirected paths).
    *   **Efficiency:** Path compression and union by rank/size are vital for `O(α(V))` (amortized constant time) operations.
*   **Variations/Follow-ups:**
    *   **Detect cycle in directed graph:** Requires DFS with 3 states (`UNVISITED`, `VISITING` (on current recursion stack), `VISITED`). A back-edge to a `VISITING` node indicates a cycle. (See `CourseSchedule.java` DFS approach).
    *   **Find *a* cycle:** Instead of just detecting, modify DFS to store the path and print the cycle when found.
    *   **Count cycles:** Much harder, often NP-hard, usually not an interview question unless constraints are tiny or specific type of cycle.

### 3. Minimum Spanning Tree (MST) using Kruskal's Algorithm

*   **Core Idea:** Greedy approach: always pick the cheapest edge that doesn't form a cycle. DSU is perfect for cycle detection.
*   **Edge Cases:**
    *   Disconnected graph: Kruskal's will find a Minimum Spanning *Forest* (an MST for each connected component). If the problem specifies a single MST, you should check if `V-1` edges were found for `V > 1` (i.e., `mst.size() == graph.getNumVertices() - 1`). If not, the graph is disconnected.
    *   Graph with a single vertex: MST is empty, total weight 0.
    *   Graph with parallel edges: Kruskal's will naturally pick the one with the minimum weight.
    *   All edge weights are the same: Any valid spanning tree will be an MST. Kruskal's will pick an arbitrary one.
*   **Variations/Follow-ups:**
    *   **Prim's Algorithm:** Another common MST algorithm (often preferred for dense graphs or when starting from a specific node). Be prepared to discuss it.
    *   **Second best MST:** More complex, usually involves finding the MST, then systematically replacing one edge with the next cheapest non-MST edge that doesn't form a cycle.
    *   **Maximum Spanning Tree:** Sort edges in descending order instead of ascending.

### 4. Course Schedule (Topological Sort / Cycle Detection in Directed Graph)

*   **Core Idea:** Finding a linear ordering of vertices in a DAG such that for every directed edge `(u, v)`, vertex `u` comes before `v` in the ordering. This is only possible if the graph is a DAG (i.e., contains no cycles).
*   **Kahn's Algorithm (BFS-based):**
    *   **Key Idea:** Start with nodes that have no prerequisites (in-degree 0). Remove them, then update in-degrees of their neighbors. Repeat.
    *   **Cycle Detection:** If the number of nodes in the topological sort is less than the total number of nodes, a cycle exists.
    *   **Advantages:** Non-recursive, easy to understand how it builds the order.
*   **DFS-based Topological Sort:**
    *   **Key Idea:** Process nodes in post-order traversal. Add a node to the front of the result list (or push to a stack) *after* visiting all its descendants.
    *   **Cycle Detection:** Use 3 states (`UNVISITED`, `VISITING`, `VISITED`). If DFS encounters a `VISITING` node, a cycle exists.
    *   **Advantages:** Often more intuitive for recursive thinkers.
*   **Edge Cases:**
    *   Empty graph or no prerequisites: Any order (or empty order) of available courses is valid.
    *   Disconnected DAGs: Both algorithms correctly handle them, producing a valid combined topological sort.
    *   Cycles: Both algorithms correctly detect cycles and return an empty list.
*   **Variations/Follow-ups:**
    *   **Course Schedule II (return *an* order):** Covered by both implementations.
    *   **Course Schedule I (can you finish *all* courses):** Simply check if the returned list size equals total courses.
    *   **All possible topological orders:** NP-hard, usually not asked.
    *   **Lexicographically smallest/largest topological order:** Requires specific tie-breaking rules, e.g., using a `PriorityQueue` for Kahn's algorithm.

## Complexity Analysis Summary

| Algorithm                            | Time Complexity         | Space Complexity        | Notes                                                                      |
| :----------------------------------- | :---------------------- | :---------------------- | :------------------------------------------------------------------------- |
| **Shortest Path (BFS)**              | `O(V + E)`              | `O(V + E)`              | `E` for `parentMap`, `V` for `queue` and `visited`                         |
| **Cycle Detection (DFS Undirected)** | `O(V + E)`              | `O(V)`                  | `V` for `visited` and recursion stack                                      |
| **Cycle Detection (DSU Undirected)** | `O(E * α(V))` (`~O(E)`) | `O(V)`                  | `α(V)` is inverse Ackermann function, practically constant. `V` for DSU.  |
| **Kruskal's MST**                    | `O(E log E)`            | `O(V + E)`              | `E log E` for sorting edges, `V` for DSU                                   |
| **Course Schedule (Kahn's - BFS)**   | `O(V + E)`              | `O(V + E)`              | `E` for in-degree counting, `V` for queue & in-degree map                  |
| **Course Schedule (DFS)**            | `O(V + E)`              | `O(V)`                  | `V` for visited states & recursion stack                                   |

*   `V`: Number of vertices
*   `E`: Number of edges
*   `α(V)`: Inverse Ackermann function, grows extremely slowly, practically constant.

Knowing these complexities and being able to derive them is crucial for interview success.
```