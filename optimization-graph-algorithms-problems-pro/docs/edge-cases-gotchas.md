```markdown
# Graph Algorithms: Edge Cases and Gotchas

Graph problems often come with tricky edge cases and common pitfalls. Being aware of these and knowing how to handle them is crucial for robust solutions and successful interviews.

---

## 1. Graph Representation

*   **Implicit vs. Explicit Graphs:**
    *   **Gotcha:** Many problems (e.g., 2D grids, puzzles like a Rubik's Cube state space) are graphs but aren't explicitly given as such. You need to identify the nodes and edges, and how to construct/explore them on the fly.
    *   **Tip:** Define what a "node" is (e.g., a cell `(row, col)`, a string state) and what an "edge" is (e.g., move to adjacent cell, apply an operation).

*   **Adjacency List vs. Adjacency Matrix:**
    *   **Gotcha:** Using an adjacency matrix for a sparse graph (E << V^2) can lead to O(V^2) space and often O(V^2) time complexities where O(V+E) would be sufficient.
    *   **Tip:** Prefer adjacency lists (e.g., `Map<NodeId, Edge[]>`) for most interview problems unless the graph is very dense or O(1) edge lookup is critical.

*   **Node IDs:**
    *   **Gotcha:** Mixing string and number IDs, or assuming consecutive integer IDs.
    *   **Tip:** Use a consistent `NodeId` type (`string | number`). Ensure your data structures (Maps, Sets) handle them correctly.

---

## 2. Graph Types & Constraints

*   **Directed vs. Undirected:**
    *   **Gotcha:** Forgetting to add reverse edges for undirected graphs (if not explicitly handled by your `addEdge` function) or mistakenly adding reverse edges for directed graphs. This changes reachability, paths, and cycle detection.
    *   **Tip:** Be explicit in your graph construction (e.g., `new Graph(true)` for directed, `new Graph(false)` for undirected).

*   **Weighted vs. Unweighted:**
    *   **Gotcha:** Using BFS for shortest paths in weighted graphs (incorrect!) or Dijkstra for unweighted graphs (correct, but BFS is simpler and faster O(V+E) vs O(E log V)).
    *   **Tip:** BFS for unweighted shortest path. Dijkstra for non-negative weighted shortest path. Bellman-Ford for negative weighted shortest path.

*   **Negative Edge Weights:**
    *   **Gotcha:** Applying Dijkstra's algorithm to graphs with negative edge weights. Dijkstra's fails here because its greedy choice isn't always optimal.
    *   **Tip:** If negative weights are allowed (and no negative cycles), consider Bellman-Ford. If negative cycles are allowed, Bellman-Ford can detect them.

*   **Negative Cycles:**
    *   **Gotcha:** If a graph has a negative cycle reachable from the source, the shortest path becomes undefined (can be infinitely small).
    *   **Tip:** Bellman-Ford can detect negative cycles. Most interview problems with shortest paths usually assume no negative cycles or non-negative weights.

---

## 3. Algorithm-Specific Gotchas

### Traversal (BFS/DFS)

*   **`visited` set:**
    *   **Gotcha:** Forgetting to use a `visited` set (or marking nodes as visited) can lead to infinite loops in graphs with cycles or redundant computations.
    *   **Tip:** Always use a `Set<NodeId>` to keep track of visited nodes to prevent cycles and re-processing.

*   **Path Reconstruction:**
    *   **Gotcha:** Forgetting to store parent pointers (e.g., in a `parentMap`) or reconstructing the path in the wrong order (e.g., `push`ing to a list then forgetting to `reverse`).
    *   **Tip:** Use `Map<NodeId, NodeId | null>` for `parentMap`. When reconstructing, start from the destination and work backward to the source, then reverse the resulting array or use `unshift`.

*   **Disconnected Components:**
    *   **Gotcha:** If the problem requires visiting all nodes (e.g., counting components, topological sort), ensure your main loop iterates over all nodes and starts a new traversal (BFS/DFS) for any unvisited ones.
    *   **Tip:** `for (const node of graph.getNodes()) { if (!visited.has(node)) { startTraversal(node); } }`

### Dijkstra's Algorithm

*   **Priority Queue Implementation:**
    *   **Gotcha:** Using a standard queue instead of a priority queue, or an inefficient priority queue (e.g., `O(N)` find min instead of `O(log N)`).
    *   **Tip:** Use a Min-Priority Queue implemented with a binary heap. Ensure elements stored contain the priority and the node ID.

*   **Stale Entries in PQ:**
    *   **Gotcha:** A node might be added to the priority queue multiple times with different distances if a shorter path is found later. If not handled, you might process a "stale" (higher distance) entry.
    *   **Tip:** When extracting `(node, dist)` from PQ, check `if (dist > distances.get(node)!) continue;`. This efficiently skips stale entries because we've already processed a shorter path to `node`.

### Cycle Detection (Directed Graphs)

*   **Three States:**
    *   **Gotcha:** Using only `visited`/`unvisited` (two states) for directed graphs will fail to detect cycles reliably. A node being `visited` only means it was part of *some* DFS path, not necessarily the *current* one.
    *   **Tip:** Use three states: `UNVISITED`, `VISITING` (currently in recursion stack), `VISITED` (fully processed). A cycle is a back-edge to a `VISITING` node.

### Topological Sort

*   **Cycles:**
    *   **Gotcha:** Attempting topological sort on a graph with a cycle.
    *   **Tip:** Both Kahn's and DFS-based topological sort algorithms can detect cycles. If a cycle is present, a topological sort is impossible, and the algorithm should indicate this (e.g., by returning `null`). For Kahn's, check if `visitedNodesCount` equals `totalNodes`. For DFS, use the three-state system.

*   **Undirected Graphs:**
    *   **Gotcha:** Trying to perform topological sort on an undirected graph. Topological sort is only for DAGs.
    *   **Tip:** Topological sort requires a directed relationship. If given an undirected graph, consider if the problem implies a directed interpretation or if a different algorithm (e.g., connected components) is needed.

---

## 4. General Coding Gotchas

*   **Off-by-one errors:** Especially when dealing with array indices or loop bounds.
*   **Infinite loops:** Due to incorrect visited checks, cyclic graphs, or faulty logic.
*   **Null/Undefined Checks:** Always consider what happens if a node or edge doesn't exist (`graph.getNeighbors(nonExistentNode)` should return `[]`, not error).
*   **Deep vs. Shallow Copies:** Modifying graph data structures in helper functions without making proper copies can lead to unexpected side effects.
*   **Global State:** Be careful with global `visited` sets or `distances` maps in recursive functions, especially if solving multiple test cases within the same run. Pass them as parameters or re-initialize.

By being mindful of these common issues, you can write more robust and correct graph algorithm implementations.
```