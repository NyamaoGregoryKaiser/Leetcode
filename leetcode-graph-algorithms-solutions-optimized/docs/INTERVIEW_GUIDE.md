```markdown
# Graph Algorithms Interview Guide

This guide provides essential tips, common variations, edge cases, and "gotchas" for graph algorithm questions in coding interviews.

---

## General Interview Tips for Graph Problems

1.  **Clarify Graph Type:** Always ask if the graph is directed or undirected, weighted or unweighted, and if it can have cycles. Are self-loops or parallel edges allowed? Are vertex/edge values unique?
2.  **Choose Representation:** Decide early between Adjacency List (better for sparse graphs, `O(V+E)` space) and Adjacency Matrix (better for dense graphs, `O(V^2)` space). Adjacency list is usually preferred unless specified.
3.  **Start with Traversal:** Many graph problems are variations of BFS or DFS. If unsure, start by describing how you'd traverse the graph.
4.  **Manage Visited States:** Crucial for preventing infinite loops in cyclic graphs and redundant work. Use a `Set` or a boolean array/map to track visited nodes. For grid problems, in-place modification (e.g., changing '1' to '0') is often a valid way to mark visited.
5.  **Complexity Analysis:** Always be prepared to provide the time and space complexity. For graphs, this typically involves `V` (vertices) and `E` (edges).
6.  **Edge Cases First:** Think about empty graphs, single-node graphs, disconnected graphs, graphs with no edges, and very large/small graphs.
7.  **Draw Diagrams:** Use simple examples and trace your algorithm mentally or on a whiteboard. This helps catch errors and communicate your logic. ASCII diagrams are useful for documentation.
8.  **Talk Through Your Thought Process:** Explain your reasoning, assumptions, and trade-offs. This is as important as the correct code.
9.  **Ask for Constraints:** What are the maximum number of nodes/edges? This can influence algorithm choice (e.g., Bellman-Ford vs. Dijkstra, or if `V^2` is too slow).

---

## Common Variations & Gotchas

### 1. BFS & DFS (General Traversal)

*   **Variations:**
    *   **Connected Components:** Count how many distinct "islands" or groups of connected nodes exist. (Solved by `Number of Islands`).
    *   **Shortest Path (Unweighted):** BFS inherently finds the shortest path in terms of number of edges.
    *   **Bipartite Check:** Can the graph be colored with two colors such that no two adjacent vertices have the same color? (BFS/DFS).
    *   **Cycle Detection:**
        *   **Undirected:** BFS/DFS, if you visit an already visited node that's not your immediate parent, it's a cycle.
        *   **Directed:** DFS with 3-color states (gray nodes in recursion stack). (Solved by `Detect Cycle in Directed Graph`).
*   **Gotchas:**
    *   **Not marking visited:** Leads to infinite loops in cyclic graphs.
    *   **Incorrectly handling disconnected components:** Ensure your main loop iterates through all nodes, starting a new traversal if a node hasn't been visited yet.
    *   **Off-by-one errors with grid boundaries.**

### 2. Shortest Path Algorithms

*   **Dijkstra's Algorithm:**
    *   **Variations:**
        *   **Single Source Shortest Path:** The core problem.
        *   **All-Pairs Shortest Path (APSP):** Run Dijkstra from each node (if non-negative weights).
        *   **Limited K-shortest path:** More advanced.
    *   **Gotchas:**
        *   **Negative Edge Weights:** Dijkstra does NOT work correctly with negative edge weights. For negative weights, use Bellman-Ford.
        *   **Lazy Priority Queue Updates:** If not using a `decrease-key` operation in the PQ, you might have multiple entries for the same vertex. Ensure you handle this by checking `currentDistance > distances.get(currentVertex)` before processing.
        *   **Path Reconstruction:** Often an interviewer follow-up. Make sure to store predecessors.
*   **Bellman-Ford Algorithm:**
    *   **When to Use:** When a graph has negative edge weights.
    *   **Cycle Detection:** Can detect negative cycles. If after V-1 iterations, a relaxation is still possible in the V-th iteration, a negative cycle exists.
    *   **Time Complexity:** O(V\*E) - Slower than Dijkstra but handles more cases.
    *   **Space Complexity:** O(V) for distances and paths.

### 3. Topological Sort

*   **When to Use:** Only applicable to Directed Acyclic Graphs (DAGs). Used for task scheduling, course prerequisites, dependency resolution.
*   **Variations:**
    *   **Kahn's Algorithm (BFS-based):** Uses in-degrees. Finds "source" nodes first.
    *   **DFS-based:** Adds nodes to the *front* of the list after all descendants are visited.
*   **Gotchas:**
    *   **Graphs with Cycles:** Topological sort is not possible. Both Kahn's and DFS methods should detect this. Kahn's will result in fewer nodes in the sorted list than total graph nodes. DFS will detect a back-edge to a gray node.
    *   **Multiple Valid Orders:** Be prepared that your output might differ from the interviewer's "expected" one, but still be valid. You should be able to explain *why* your order is valid.

### 4. Graph Representation

*   **Adjacency List:**
    *   **Pros:** Memory efficient for sparse graphs (O(V+E)), faster to iterate neighbors.
    *   **Cons:** Checking if an edge exists is O(degree(u)) or O(log(degree(u))) if neighbors stored in a `Map`/`Set`.
*   **Adjacency Matrix:**
    *   **Pros:** O(1) to check if an edge exists, good for dense graphs (many edges).
    *   **Cons:** Space O(V^2), even for sparse graphs. Iterating neighbors is O(V).

### 5. Advanced / Follow-up Questions

*   **Minimum Spanning Tree (MST):** Prim's or Kruskal's algorithm. For undirected, weighted graphs.
*   **Tarjan's/Kosaraju's Algorithm:** For finding Strongly Connected Components (SCCs) in directed graphs.
*   **Flow Networks:** Ford-Fulkerson, Edmonds-Karp.
*   **Graph Reductions:** Can this problem be reduced to a known graph problem? (e.g., Sudoku to graph coloring, 2-SAT to SCCs).

---

## Interview Practice Checklist

*   **Implement BFS and DFS from scratch:** Be able to do both recursive and iterative DFS.
*   **Implement Dijkstra's with a Min-Priority Queue:** Understand how the PQ works.
*   **Implement Kahn's Algorithm for Topological Sort.**
*   **Implement DFS-based Cycle Detection for Directed Graphs.**
*   **Trace algorithms with examples:** Be ready to dry-run your code.
*   **Articulate time/space complexity:** Explain *why* it's V+E, V log E, etc.
*   **Discuss edge cases:** Empty graph, single node, disconnected components, cycles.
*   **Consider variations:** What if the graph is huge and doesn't fit in memory? (Graph streaming algorithms, parallel processing). What if weights are negative?

By focusing on these areas, you'll be well-prepared to tackle a wide range of graph algorithm problems in a coding interview. Good luck!
```