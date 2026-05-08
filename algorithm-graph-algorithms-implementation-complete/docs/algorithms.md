```markdown
# Graph Algorithms: Detailed Explanations

This document provides in-depth explanations of the core graph algorithms implemented in this project. Understanding these algorithms is crucial for solving a wide range of graph-related problems.

---

## 1. Breadth-First Search (BFS)

**What it is:**
BFS is a graph traversal algorithm that explores nodes layer by layer. It starts at a source node, visits all its immediate neighbors, then all their unvisited neighbors, and so on. It uses a queue to keep track of nodes to visit.

**How it Works:**
1.  **Initialization:**
    *   Create a queue and add the starting node to it.
    *   Keep a set (or array) to mark visited nodes to avoid processing them multiple times and prevent infinite loops in cyclic graphs. Mark the starting node as visited.
2.  **Traversal:**
    *   While the queue is not empty:
        *   Dequeue a node `u`.
        *   Process `u` (e.g., print it, check if it's the target).
        *   For each unvisited neighbor `v` of `u`:
            *   Mark `v` as visited.
            *   Enqueue `v`.
3.  **Shortest Path in Unweighted Graphs:**
    BFS naturally finds the shortest path (in terms of number of edges) in unweighted graphs because it explores all nodes at depth `k` before moving to depth `k+1`. The first time it reaches a target node, it guarantees that it has found the shortest path. To reconstruct the path, you need to store the "parent" of each node as you visit it.

**When to Use It:**
*   Finding the shortest path (minimum number of edges) in an unweighted graph.
*   Finding all nodes within a certain distance from a source node.
*   Level order traversal of a tree (which is a specific type of graph).
*   Checking connectivity in a graph.
*   "Number of Islands" type problems (grid traversal).

**Time Complexity:** O(V + E)
*   V: number of vertices (nodes)
*   E: number of edges
Each vertex and each edge is visited and processed at most once.

**Space Complexity:** O(V)
*   For the queue and the `visited` set (or array), which can store up to all V vertices.

---

## 2. Depth-First Search (DFS)

**What it is:**
DFS is another graph traversal algorithm that explores as far as possible along each branch before backtracking. It uses a stack (or implicitly, the recursion call stack) to keep track of nodes.

**How it Works (Recursive):**
1.  **Initialization:**
    *   Keep a set (or array) to mark visited nodes.
2.  **Traversal (recursive `dfs` function):**
    *   Mark the current node `u` as visited.
    *   Process `u`.
    *   For each unvisited neighbor `v` of `u`:
        *   Recursively call `dfs(v)`.
3.  **Handling Disconnected Components:**
    If the graph is not guaranteed to be connected, you need to iterate through all nodes and start a DFS from any unvisited node.

**When to Use It:**
*   **Cycle Detection:** Especially in directed graphs (as implemented in `hasCycleDirected`).
*   **Topological Sorting:** For Directed Acyclic Graphs (DAGs).
*   **Finding Connected Components:** In undirected graphs.
*   **Path Finding:** Determining if a path exists between two nodes (though BFS is better for shortest path in unweighted graphs).
*   **Solving mazes or puzzles** that involve single path exploration.
*   "Number of Islands" type problems (grid traversal).

**Cycle Detection in Directed Graphs (using DFS):**
This is a key application. We use three states for nodes:
*   `UNVISITED`: Not yet encountered.
*   `VISITING` (or `RECURSION_STACK`): Currently in the recursion stack, its neighbors are being explored.
*   `VISITED`: All of its descendants have been explored and it's popped from the recursion stack.

A cycle is detected if, during DFS from node `u`, we encounter a neighbor `v` that is in the `VISITING` state. This means `v` is an ancestor of `u` in the current DFS tree, and there's a back-edge from `u` to `v`.

**Time Complexity:** O(V + E)
*   V: number of vertices
*   E: number of edges
Each vertex and each edge is visited and processed at most once.

**Space Complexity:** O(V)
*   For the recursion stack (in the worst case, a graph could be a long path, pushing all V nodes onto the stack).
*   For the `visited` set (or `nodeStates` map).

---

## 3. Dijkstra's Algorithm

**What it is:**
Dijkstra's algorithm finds the shortest paths from a single source node to all other nodes in a weighted graph with non-negative edge weights.

**How it Works (Greedy Approach with Priority Queue):**
1.  **Initialization:**
    *   Create a `distances` map, setting the distance to the `startNode` as `0` and all other nodes to `Infinity`.
    *   Create a `previousNodes` map to reconstruct paths, initially `null` for all nodes.
    *   Create a `MinPriorityQueue` and add `{ value: startNode, priority: 0 }`.
2.  **Iteration:**
    *   While the priority queue is not empty:
        *   Extract the node `u` with the smallest `priority` (distance) from the queue.
        *   If `u`'s extracted distance (`currentDistance`) is greater than the currently known shortest distance to `u` (`distances.get(u)`), skip it. (This handles cases where a node was enqueued multiple times with different distances, and we've already found a shorter path.)
        *   For each neighbor `v` of `u` with edge weight `w`:
            *   Calculate `newDistance = currentDistance + w`.
            *   If `newDistance < distances.get(v)`:
                *   Update `distances.set(v, newDistance)`.
                *   Set `previousNodes.set(v, u)`.
                *   Enqueue `v` into the priority queue with `newDistance` as its priority.
3.  **Result:**
    The `distances` map will contain the shortest distance from `startNode` to every other node. The `previousNodes` map can be used to reconstruct the actual paths.

**When to Use It:**
*   Finding the shortest path from a single source to all other nodes in a graph with non-negative edge weights.
*   GPS navigation systems (finding the shortest route).
*   Network routing protocols.

**Important Note:** Dijkstra's algorithm **does not work correctly with negative edge weights**. For graphs with negative weights (but no negative cycles), use Bellman-Ford algorithm.

**Time Complexity:** O(E log V) or O(E + V log V)
*   Using a binary heap (like our `MinPriorityQueue`): O(E log V) because each of E edges might lead to an update/enqueue operation (log V), and V vertices are extracted (log V).
*   V: number of vertices
*   E: number of edges

**Space Complexity:** O(V + E)
*   For `distances`, `previousNodes`, and `MinPriorityQueue` (stores up to V elements).
*   For adjacency list representation of the graph.

---

## 4. Kruskal's Algorithm

**What it is:**
Kruskal's algorithm is a greedy algorithm used to find a Minimum Spanning Tree (MST) for a connected, undirected graph with weighted edges. An MST is a subgraph that connects all vertices with the minimum possible total edge weight and contains no cycles.

**How it Works (Greedy Approach with Disjoint Set Union):**
1.  **Initialization:**
    *   Collect all edges from the graph.
    *   Sort all edges in non-decreasing order of their weights.
    *   Initialize a `DisjointSetUnion` (DSU) data structure, where each node is initially in its own separate set.
    *   Initialize an empty list `mstEdges` to store the edges of the MST.
2.  **Edge Selection:**
    *   Iterate through the sorted edges, from the smallest weight to the largest:
        *   For each edge `(u, v)` with weight `w`:
            *   Use the DSU's `find` operation to check if nodes `u` and `v` are already in the same set.
            *   If `find(u) !== find(v)` (meaning `u` and `v` are in different connected components):
                *   Adding this edge will *not* form a cycle.
                *   Add the edge `(u, v)` to `mstEdges`.
                *   Use the DSU's `union` operation to merge the sets containing `u` and `v`.
3.  **Termination:**
    *   Continue until `V-1` edges have been added to `mstEdges` (where `V` is the number of vertices) or all edges have been processed. If the graph is connected, an MST will have exactly `V-1` edges.

**When to Use It:**
*   Finding the Minimum Spanning Tree (or Forest, if the graph is disconnected).
*   Network design (e.g., laying cables to connect offices with minimum total cable length).
*   Clustering algorithms.

**Disjoint Set Union (DSU) (Union-Find Data Structure):**
Kruskal's algorithm relies heavily on DSU for efficient cycle detection. DSU allows two primary operations:
*   `find(element)`: Returns the representative (root) of the set that `element` belongs to. Optimized with path compression, which flattens the tree structure during `find` operations.
*   `union(element1, element2)`: Merges the sets containing `element1` and `element2`. Optimized with union by rank (or size), which always attaches the smaller tree under the root of the larger tree, keeping trees shallow.
These optimizations make DSU operations almost constant time (amortized O(α(V)), where α is the inverse Ackermann function, which grows extremely slowly and is practically less than 5).

**Time Complexity:** O(E log E) or O(E log V)
*   Sorting all edges takes O(E log E).
*   DSU operations (E `find` and up to V-1 `union` operations) take roughly O(E α(V)).
*   Since `log E` is at most `log(V^2)` which is `2 log V`, the sorting step usually dominates, resulting in O(E log E) or O(E log V).
*   V: number of vertices
*   E: number of edges

**Space Complexity:** O(V + E)
*   V: for DSU's `parent` and `rank` maps.
*   E: for storing all edges initially and the resulting MST edges.

---

## 5. Number of Islands

**What it is:**
A classic grid-traversal problem where you count connected components of 'land' cells in a 2D binary grid. Land cells are typically '1's and water cells are '0's. Connected implies horizontal or vertical adjacency.

**How it Works (BFS and DFS Approaches):**
Both BFS and DFS are excellent for solving this problem, showcasing their versatility in grid problems which can be modeled as graphs.
The general strategy for both is:
1.  Initialize an `islandCount` to 0.
2.  Iterate through each cell `(r, c)` of the grid.
3.  If `grid[r][c]` is '1' (land):
    *   Increment `islandCount`.
    *   Start a traversal (either BFS or DFS) from `(r, c)` to explore and mark all connected land cells as 'visited'. The common way to "mark as visited" is to change their value from '1' to '0' directly in the grid (effectively "sinking" the island). This prevents recounting and ensures each island is processed only once.
4.  Return `islandCount`.

**BFS Approach Details:**
*   When a '1' is found, add its coordinates to a queue.
*   Mark it as '0'.
*   While the queue is not empty:
    *   Dequeue `(currR, currC)`.
    *   For each of its four neighbors `(nextR, nextC)`:
        *   If `(nextR, nextC)` is within grid bounds AND is '1':
            *   Mark `grid[nextR][nextC]` as '0'.
            *   Enqueue `(nextR, nextC)`.

**DFS Approach Details:**
*   When a '1' is found, recursively call a `dfs(r, c)` function.
*   Inside `dfs(r, c)`:
    *   Mark `grid[r][c]` as '0'.
    *   Recursively call `dfs` for each of its four neighbors `(nextR, nextC)`, but only if `(nextR, nextC)` is within grid bounds AND is '1'. The base case for recursion is when a cell is out of bounds or is '0'.

**Time Complexity:** O(M * N)
*   M: number of rows, N: number of columns.
*   Both BFS and DFS visit each cell at most a constant number of times (once by the outer loops, and then possibly once by the traversal if it's part of an island).

**Space Complexity:** O(M * N)
*   **BFS:** In the worst case (grid full of '1's), the queue can hold up to `M*N` elements.
*   **DFS:** In the worst case (a long "snake" island), the recursion stack depth can go up to `M*N`.
*   The grid modification is in-place, so no extra space for a separate `visited` array is needed beyond the recursion stack/queue.
```