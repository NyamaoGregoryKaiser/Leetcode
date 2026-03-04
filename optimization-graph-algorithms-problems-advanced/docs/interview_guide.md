```markdown
# Graph Algorithms: Interview Guide

This guide provides strategies, tips, common questions, and potential follow-ups for graph algorithm problems in coding interviews.

## 1. General Approach to Graph Problems

1.  **Understand the Problem:**
    *   What are the nodes and edges representing?
    *   Is the graph **directed** or **undirected**?
    *   Are the edges **weighted** or **unweighted**? If weighted, can weights be negative?
    *   Can the graph have **cycles**? Is it always **connected**?
    *   What are the constraints on V (number of vertices) and E (number of edges)? This dictates complexity.
    *   What exactly is the output required? (e.g., path, distance, count, order).

2.  **Choose a Graph Representation:**
    *   **Adjacency List (`std::vector<std::vector<int>>` or `std::vector<std::vector<std::pair<int, int>>>`):**
        *   **Pros:** Space efficient for sparse graphs (E << V^2), faster to find all neighbors of a vertex (O(degree)).
        *   **Cons:** Slower to check if an edge (u, v) exists (O(degree)).
        *   **Recommendation:** Default to adjacency list unless told otherwise or if the problem specifically benefits from an adjacency matrix (e.g., very dense graphs, need for O(1) edge lookup).
    *   **Adjacency Matrix (`std::vector<std::vector<int>>`):**
        *   **Pros:** O(1) to check if an edge (u, v) exists.
        *   **Cons:** Space inefficient for sparse graphs (always O(V^2)), slower to find all neighbors (O(V)).

3.  **Identify the Core Algorithm:**
    *   **Traversal (BFS/DFS):**
        *   Path existence? Reachability? Connected components? Cycle detection? Topological sort (DFS-based)? Shortest path in unweighted graph (BFS)?
    *   **Shortest Path:**
        *   Non-negative weights: Dijkstra's.
        *   Negative weights (no negative cycles): Bellman-Ford.
        *   All-pairs shortest path: Floyd-Warshall (or repeated Dijkstra/Bellman-Ford).
    *   **Minimum Spanning Tree (MST):**
        *   Kruskal's or Prim's (for undirected, weighted graphs).
    *   **Topological Sort:**
        *   For DAGs only (Kahn's or DFS-based).
    *   **Specific Advanced Algorithms:** (e.g., Max Flow, Min Cut, Strongly Connected Components) - less common for standard interviews but good to know if applicable.

4.  **Consider Edge Cases and Constraints:**
    *   Empty graph (V=0)
    *   Single node graph (V=1)
    *   Disconnected components
    *   Cycles (if not a DAG)
    *   Self-loops, parallel edges (how does your representation handle them?)
    *   Large V, E (complexity matters!)

5.  **Walk Through an Example:**
    *   Always use a small example to trace your algorithm. This helps find bugs and clarify logic.
    *   Explain your thought process aloud.

6.  **Analyze Complexity:**
    *   Time complexity (Big O notation: O(V+E), O(E log V), O(V^3), etc.)
    *   Space complexity (O(V), O(V+E), O(V^2), etc.)
    *   Justify your analysis based on chosen data structures and operations.

## 2. Common Interview Questions & Follow-ups

### A. Graph Traversals (BFS/DFS)

**Typical Questions:**
*   Given a graph, implement BFS/DFS.
*   Find if there's a path between two given nodes.
*   Count the number of connected components.
*   Detect a cycle in a directed/undirected graph.
*   Find all paths between two nodes.
*   Bipartite graph check.
*   Solve a maze (often modeled as a grid graph).

**Follow-up Questions:**
*   What if the graph is very large (millions of nodes)? (Discuss memory, distributed BFS/DFS).
*   How would you find the shortest path in an unweighted graph? (BFS).
*   How would you find all nodes reachable from a given node? (BFS/DFS).
*   Can you modify your DFS to detect cycles in a directed graph? (Use a `recursion_stack` or `color` array).

### B. Shortest Path (Dijkstra's Algorithm)

**Typical Questions:**
*   Implement Dijkstra's algorithm.
*   Find the shortest path from a source to all other nodes in a weighted graph (non-negative weights).
*   Find the shortest path between two specific nodes.
*   What's the shortest time to travel between cities with varying flight durations?

**Follow-up Questions:**
*   What if there are negative edge weights? (Bellman-Ford, mention its complexity and limitations).
*   What if you need all-pairs shortest paths? (Floyd-Warshall, or repeated Dijkstra/Bellman-Ford).
*   How would you reconstruct the path itself, not just the distance? (Store `parent` pointers).
*   What data structure would you use for the priority queue and why? (Binary heap `std::priority_queue` is common and efficient).

### C. Minimum Spanning Tree (Kruskal's Algorithm)

**Typical Questions:**
*   Implement Kruskal's algorithm.
*   Find the cheapest way to connect all cities/nodes in a network.
*   Given a list of connections and their costs, what's the minimum cost to ensure all components are connected?

**Follow-up Questions:**
*   Explain the Disjoint Set Union (DSU) data structure. Why is it efficient? (Path compression, union by rank/size).
*   What's another algorithm for MST? (Prim's algorithm). When would you prefer one over the other? (Kruskal's for sparse, Prim's for dense or when starting from a single node).
*   What if the graph is disconnected? (Kruskal's finds an MSF).
*   How would you handle duplicate edge weights? (Doesn't affect total weight, just specific edges chosen).

### D. Topological Sort

**Typical Questions:**
*   Implement topological sort (Kahn's or DFS-based).
*   Given a list of tasks and their prerequisites, determine a valid order to complete them.
*   Order courses such that all prerequisites are met.
*   Detect if a given graph is a Directed Acyclic Graph (DAG).

**Follow-up Questions:**
*   What if the graph contains a cycle? How does your algorithm handle it?
*   Can a DAG have multiple topological sorts? If so, how can you find a specific one (e.g., lexicographically smallest)?
*   What is the use case for topological sort?
*   Which approach (Kahn's/DFS) would you prefer and why? (Kahn's might be slightly more intuitive for cycle detection; DFS often more concise code).

## 3. Important Concepts and Gotchas

*   **Directed vs. Undirected:** Pay attention to arrow directions. An undirected edge (u, v) often means two directed edges (u,v) and (v,u) in adjacency list.
*   **Weighted vs. Unweighted:** Use appropriate algorithms. BFS for unweighted shortest paths; Dijkstra for non-negative weighted.
*   **Connected vs. Disconnected:** Your algorithm might need to iterate through all nodes to ensure all components are covered (e.g., for finding all connected components, or for topological sort if the graph is not guaranteed connected).
*   **Cycles:** Graph algorithms like DFS need a `visited` array to prevent infinite loops in cyclic graphs. Topological sort explicitly requires no cycles.
*   **Self-loops and Parallel Edges:** Clarify with the interviewer how these should be handled. Standard adjacency lists generally handle them without issue, but algorithms might need slight adjustments (e.g., minimum edge weight for parallel edges).
*   **`std::numeric_limits<int>::max()` for Infinity:** Be careful with integer overflow when adding to `max()`. Using `long long` for distances can sometimes mitigate this, or check `dist[u] != INF` before adding weights.
*   **Off-by-one errors:** Node indexing (0-based vs. 1-based) is a common source of bugs. Be consistent.

## 4. Interview Tips

*   **Communicate Clearly:** Talk through your thought process, assumptions, and choices. Explain why you pick a certain data structure or algorithm.
*   **Ask Clarifying Questions:** Don't assume. Ask about graph type, constraints, edge cases, etc.
*   **Start Simple:** If stuck, consider a brute-force or simpler approach first, then optimize.
*   **Test Thoroughly:** Use small, diverse test cases: empty graph, single node, linear, star, dense, sparse, disconnected, with cycles (if allowed).
*   **Practice, Practice, Practice:** The more graph problems you solve, the better you'll become at pattern recognition and efficient implementation.
*   **Be Aware of Standard Library:** Know how to use `std::vector`, `std::queue`, `std::stack`, `std::priority_queue`, `std::set`, `std::map`, `std::numeric_limits`. Reimplementing these in an interview is usually not expected unless explicitly asked.
*   **Clean Code:** Use meaningful variable names, add comments for complex logic, and structure your code well.

By following this guide and consistently practicing, you can significantly improve your performance in graph algorithm interviews. Good luck!
```