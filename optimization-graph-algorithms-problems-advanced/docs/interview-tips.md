# Coding Interview Tips for Graph Algorithms

Graph problems are common in coding interviews because they test a wide range of problem-solving skills, including data structures, algorithms, recursion, and iterative thinking. Here's a guide to excel:

## 1. Understand the Problem and Clarify Constraints

Before writing any code, ensure you deeply understand the problem. Ask clarifying questions:
*   **Graph Type**: Is it directed or undirected?
*   **Weights**: Are edges weighted? If so, are weights positive, non-negative, or can they be negative?
*   **Cycles**: Can the graph contain cycles? (DAG vs. general graph).
*   **Connectivity**: Is the graph guaranteed to be connected?
*   **Number of Nodes/Edges**: What are the typical constraints (e.g., V up to 100, 1000, 10^5)? This helps determine complexity requirements.
*   **Input/Output**: How is the graph given (adjacency list, matrix, list of edges)? What format should the output be?
*   **Goal**: Shortest path? All paths? Detect cycle? Connectivity? Bipartite? MST? Max flow?

## 2. Choose the Right Graph Representation

*   **Adjacency List (Map or Object of Arrays/Sets)**:
    *   **Pros**: Space-efficient for sparse graphs (fewer edges `E` than `V^2`). Efficient for finding neighbors `O(degree(V))`.
    *   **Cons**: Checking for edge existence `(u, v)` can be `O(degree(u))` for weighted/directed or `O(1)` for unweighted/Set based.
    *   **Use Case**: Most common and preferred for typical interview graph problems.
*   **Adjacency Matrix (2D Array)**:
    *   **Pros**: `O(1)` for checking edge existence `(u, v)`. Good for dense graphs (many edges).
    *   **Cons**: Space-inefficient `O(V^2)` even for sparse graphs. Finding neighbors requires iterating `O(V)`.
    *   **Use Case**: When `V` is small (e.g., `V <= 500`) and frequent `hasEdge` checks are needed, or for problems like Floyd-Warshall.

## 3. Master Core Traversal Algorithms

### Breadth-First Search (BFS)
*   **When to Use**:
    *   **Shortest Path in Unweighted Graph**: Guarantees the shortest path in terms of number of edges.
    *   Finding all reachable nodes.
    *   Level-order traversal.
    *   Checking bipartiteness.
*   **Key Data Structures**: Queue, `visited` set/array.
*   **Complexity**: `O(V + E)`.

### Depth-First Search (DFS)
*   **When to Use**:
    *   **Cycle Detection** (especially in directed graphs).
    *   **Topological Sort**.
    *   Finding connected components / strongly connected components.
    *   Path finding (any path, not necessarily shortest).
    *   Maze solving.
*   **Key Data Structures**: Recursion stack (implicit) or explicit stack, `visited` set/array (often with states for directed graphs).
*   **Complexity**: `O(V + E)`.

## 4. Know Specialized Algorithms

### Dijkstra's Algorithm
*   **When to Use**: **Shortest Path in Weighted Graph with NON-NEGATIVE edge weights** from a single source.
*   **Key Data Structures**: Priority Queue (min-heap), `distances` map, `previousNodes` map.
*   **Complexity**: `O(E log V)` or `O((V+E) log V)` with a binary heap.
*   **Gotcha**: Fails with negative edge weights.

### Kruskal's Algorithm
*   **When to Use**: **Minimum Spanning Tree (MST)** for connected, undirected, weighted graphs.
*   **Key Data Structures**: Union-Find (Disjoint Set Union) for cycle detection, sorted list of edges.
*   **Complexity**: `O(E log E)` (dominated by sorting edges).
*   **Comparison with Prim's**: Kruskal's is generally better for sparse graphs; Prim's (similar to Dijkstra's structure) is often better for dense graphs.

### Other (Good to know for advanced problems):
*   **Bellman-Ford**: Shortest paths with negative edge weights (detects negative cycles). `O(VE)`.
*   **Floyd-Warshall**: All-pairs shortest paths. `O(V^3)`.
*   **Topological Sort**: Linear ordering of vertices such that for every directed edge (u, v), u comes before v. Only for DAGs. Can be done with DFS or Kahn's algorithm (BFS-based). `O(V + E)`.

## 5. Standard Interview Questions & Variations

*   **Shortest Path**:
    *   Unweighted: BFS. Variations: path reconstruction, multi-source BFS.
    *   Weighted (non-negative): Dijkstra's. Variations: path reconstruction, single-target optimization.
    *   Weighted (negative): Bellman-Ford (rarely asked for full implementation).
*   **Cycle Detection**:
    *   Directed: DFS with 3 states (unvisited, visiting, visited).
    *   Undirected: DFS with parent tracking.
*   **Connectivity**:
    *   Number of connected components (undirected: BFS/DFS, directed: Kosaraju/Tarjan for SCCs).
    *   Path exists between two nodes (BFS/DFS).
*   **Topological Sort**:
    *   Implement using DFS (post-order traversal) or Kahn's algorithm (BFS with in-degrees).
    *   Problem examples: Course scheduling, build dependencies.
*   **Minimum Spanning Tree**:
    *   Kruskal's (with Union-Find).
    *   Prim's (with Priority Queue).
*   **Specific Graph Problems**:
    *   "Word Ladder" (BFS).
    *   "Number of Islands" (BFS/DFS).
    *   "Course Schedule" (Topological Sort, Cycle Detection).
    *   "Network Delay Time" (Dijkstra's).
    *   "Cheapest Flights Within K Stops" (BFS/Dijkstra variant).
    *   "Clone Graph" (BFS/DFS).

## 6. How to Approach a Graph Problem in an Interview

1.  **Listen and Clarify**: Re-read the problem statement. Ask all clarifying questions (see point 1).
2.  **Example Input/Output**: Work through a small example to understand the mechanics and constraints. This often reveals edge cases.
3.  **High-Level Plan**: Based on the problem type (shortest path, cycle, etc.) and graph properties (weighted, directed), determine which algorithm (BFS, DFS, Dijkstra, Kruskal, etc.) is appropriate.
4.  **Data Structures**: Decide on the graph representation (adjacency list usually) and any helper data structures (queue, stack, priority queue, set for visited, map for distances/predecessors, Union-Find).
5.  **Algorithm Steps**: Outline the steps of your chosen algorithm.
6.  **Complexity Analysis**: State the time and space complexity and justify it. Discuss any trade-offs.
7.  **Edge Cases**: Explicitly mention how your algorithm handles edge cases (empty graph, single node, disconnected components, start=end).
8.  **Coding**: Start coding, focusing on clean, readable code with meaningful variable names.
9.  **Test and Debug**: Mentally or physically dry run your code with your example cases and identified edge cases. Look for off-by-one errors, infinite loops, and incorrect conditions.

## 7. Common Gotchas and Pitfalls

*   **Forgetting `visited` Set**: Leads to infinite loops in cyclic graphs or incorrect paths/distances.
*   **Incorrectly Handling Directed vs. Undirected**: Reversing edges for undirected graphs vs. strictly following direction for directed.
*   **Weighted vs. Unweighted**: Using BFS for shortest path in a weighted graph is a common mistake.
*   **Negative Weights**: Using Dijkstra's with negative weights.
*   **Disconnected Components**: Not ensuring all nodes/components are visited (e.g., only calling DFS/BFS once from a single start node).
*   **Off-by-one Errors**: Especially with array-based adjacency matrices or indices.
*   **Language-Specific Queue/Stack**: Using `Array.shift()` in JavaScript as a queue can be `O(N)`. Prefer two pointers or a `Deque` implementation for `O(1)` dequeue. This project uses a two-pointer approach for BFS queue in `bfs.ts`.
*   **Priority Queue Implementation**: A custom `PriorityQueue` (like the one in this project) is often needed in JavaScript, as built-in arrays don't support heap operations directly.

By following these tips and studying the provided implementations, you'll be well-prepared to tackle graph algorithm questions in technical interviews.