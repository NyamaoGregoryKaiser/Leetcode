# Graph Algorithms Explained

This document provides detailed explanations for each graph algorithm implemented in this project, covering problem statements, core logic, time/space complexity, ASCII art diagrams, edge cases, and interview tips.

---

## 1. Breadth-First Search (BFS)

### Problem Statement
Given an unweighted graph and two vertices, a starting vertex (`startVertex`) and a target vertex (`targetVertex`), find the shortest path between them in terms of the number of edges.

### Core Logic
BFS explores the graph layer by layer, ensuring that all vertices at a given distance `k` from the `startVertex` are visited before any vertices at distance `k+1`. This property makes BFS ideal for finding the shortest path in unweighted graphs.

1.  **Initialization**:
    *   Create a `queue` and add `startVertex` to it.
    *   Create a `visited` set and add `startVertex`.
    *   Create a `parentMap` (or `predecessorMap`) to store the parent of each vertex, which is used to reconstruct the path.

2.  **Traversal**:
    *   While the `queue` is not empty:
        *   Dequeue a `currentVertex`.
        *   For each `neighbor` of `currentVertex`:
            *   If `neighbor` has not been `visited`:
                *   Mark `neighbor` as `visited`.
                *   Record `currentVertex` as the `parent` of `neighbor` in `parentMap`.
                *   Enqueue `neighbor`.
                *   If `neighbor` is the `targetVertex`, stop and reconstruct the path.

3.  **Path Reconstruction**:
    *   Start from `targetVertex` and trace back using the `parentMap` until `startVertex` is reached. Reverse the collected path to get the correct order.

### ASCII Art Diagram (BFS Traversal)

```
        A
       / \
      B---C
     / \ /
    D   E

BFS from A to D:

Queue: [A]
Visited: {A}
Parent: {}

1. Dequeue A. Neighbors: B, C
   - B: Not visited. Visited:{A,B}. Parent:{B:A}. Enqueue B.
   - C: Not visited. Visited:{A,B,C}. Parent:{B:A, C:A}. Enqueue C.
Queue: [B, C]

2. Dequeue B. Neighbors: A, D
   - A: Visited. Skip.
   - D: Not visited. Visited:{A,B,C,D}. Parent:{B:A, C:A, D:B}. Enqueue D.
Queue: [C, D]

3. Dequeue C. Neighbors: A, E
   - A: Visited. Skip.
   - E: Not visited. Visited:{A,B,C,D,E}. Parent:{B:A, C:A, D:B, E:C}. Enqueue E.
Queue: [D, E]

4. Dequeue D. TARGET FOUND! D is the target.
   Reconstruct path:
   D <- Parent[D]=B
   B <- Parent[B]=A
   A <- START. Stop.
   Path: [A, B, D]
```

### Time and Space Complexity
*   **Time Complexity**: O(V + E)
    *   Each vertex (V) is enqueued and dequeued at most once.
    *   Each edge (E) is examined at most once (for directed graphs) or twice (for undirected graphs).
*   **Space Complexity**: O(V)
    *   The `queue` can hold up to V vertices.
    *   The `visited` set can hold up to V vertices.
    *   The `parentMap` can store up to V entries.

### Edge Cases and Gotchas
*   **Disconnected Graph**: If the `targetVertex` is in a different component than `startVertex`, BFS will finish without finding the target, correctly returning `null`.
*   **Start = Target**: The path is just `[startVertex]`.
*   **Non-existent Vertices**: If `startVertex` or `targetVertex` are not in the graph, the algorithm should handle this (e.g., return `null` or throw an error).
*   **Cycles**: BFS handles cycles gracefully in unweighted graphs. It will mark nodes as visited and avoid re-processing them, still finding the shortest path.
*   **Weighted Graphs**: BFS does NOT find the shortest path in weighted graphs. For weighted graphs, Dijkstra's algorithm is required.

### Interview Tips and Variations
*   **Common Applications**: Finding shortest path (unweighted), determining connectivity, network broadcast, web crawlers.
*   **Variations**: Can be used to find all nodes reachable from a source, or to compute shortest distances to *all* reachable nodes (by storing distances in `parentMap` instead of just parents).
*   **Two-End BFS**: For very large graphs or specific pathfinding problems, BFS can be run simultaneously from both `startVertex` and `targetVertex` to meet in the middle, potentially reducing search space.
*   **BFS vs DFS**: Understand when to use which. BFS for shortest path/level order traversal, DFS for cycle detection, topological sort, finding connected components.

---

## 2. Topological Sort

### Problem Statement
Given a Directed Acyclic Graph (DAG), produce a linear ordering of its vertices such that for every directed edge `u -> v`, vertex `u` comes before vertex `v` in the ordering. If the graph contains a cycle, topological sort is not possible.

### Core Logic (DFS-based)
The DFS-based approach leverages the fact that in a DAG, a vertex `u` can only be put into the topological order *after* all its dependencies (i.e., vertices reachable from `u`) have been processed.

1.  **Initialization**:
    *   `visited`: A set to keep track of all nodes whose DFS traversal has either started or completed.
    *   `recursionStack`: A set to keep track of nodes currently in the *current* DFS recursion path. This is crucial for cycle detection.
    *   `resultStack`: An array to store the sorted nodes.

2.  **DFS Function (`dfs(vertex)`):**
    *   Mark `vertex` as `visited` and add it to `recursionStack`.
    *   For each `neighbor` of `vertex`:
        *   If `neighbor` is in `recursionStack`: **Cycle Detected!** Return `true` (indicating a cycle).
        *   If `neighbor` is not `visited`:
            *   Recursively call `dfs(neighbor)`. If it returns `true` (cycle detected), propagate `true` upwards.
    *   After exploring all neighbors and their subtrees, remove `vertex` from `recursionStack` (its path is complete).
    *   Push `vertex` onto `resultStack`.
    *   Return `false` (no cycle found in this path).

3.  **Main Loop**:
    *   Iterate through all vertices in the graph. For each unvisited vertex, call `dfs()`.
    *   If `dfs()` ever returns `true`, immediately return `null` (or throw error) as a cycle exists.

4.  **Final Result**:
    *   After all DFS calls complete without detecting cycles, `resultStack` will contain the vertices in reverse topological order. Reverse it to get the final topological order.

### ASCII Art Diagram (DFS-based Topological Sort)

```
       A ----> B
       |       ^
       v       |
       C ----> D

1. Call DFS(A):
   visited: {A}
   recursionStack: {A}
   resultStack: []

   - Explore B from A:
     Call DFS(B):
       visited: {A,B}
       recursionStack: {A,B}
       resultStack: []

       - Explore D from B:
         Call DFS(D):
           visited: {A,B,D}
           recursionStack: {A,B,D}
           resultStack: []

           - D has no unvisited neighbors.
           - Remove D from recursionStack. resultStack.push(D).
           recursionStack: {A,B}
           resultStack: [D]
         Return from DFS(D).

       - B has no other unvisited neighbors.
       - Remove B from recursionStack. resultStack.push(B).
       recursionStack: {A}
       resultStack: [D, B]
     Return from DFS(B).

   - Explore C from A:
     Call DFS(C):
       visited: {A,B,D,C}
       recursionStack: {A,C}  (D is not on A's direct recursion path anymore)
       resultStack: [D, B]

       - Explore D from C:
         D is visited (in `visited`), but NOT in `recursionStack`. Skip.
       - C has no other unvisited neighbors.
       - Remove C from recursionStack. resultStack.push(C).
       recursionStack: {A}
       resultStack: [D, B, C]
     Return from DFS(C).

   - A has no other unvisited neighbors.
   - Remove A from recursionStack. resultStack.push(A).
   recursionStack: {}
   resultStack: [D, B, C, A]
Return from DFS(A).

Final resultStack: [D, B, C, A]
Reversed: [A, C, B, D] or [A, B, C, D] (both valid topological sorts)
```

### Time and Space Complexity
*   **Time Complexity**: O(V + E)
    *   Each vertex (V) and edge (E) is visited exactly once.
*   **Space Complexity**: O(V)
    *   `visited` set: O(V)
    *   `recursionStack` set: O(V) (at most V nodes in a simple path)
    *   `resultStack`: O(V)
    *   Recursion call stack: O(V) (in worst case, a linear graph)

### Alternative: Kahn's Algorithm (BFS-based)
Kahn's algorithm uses a BFS-like approach:
1.  Compute the in-degree for all vertices.
2.  Initialize a `queue` with all vertices that have an in-degree of 0.
3.  While `queue` is not empty:
    *   Dequeue a vertex `u`. Add `u` to the topological order.
    *   For each neighbor `v` of `u`:
        *   Decrement `v`'s in-degree.
        *   If `v`'s in-degree becomes 0, enqueue `v`.
4.  If the total number of vertices in the topological order is less than the total number of vertices in the graph, a cycle exists.

Kahn's algorithm also has O(V+E) time and O(V) space complexity. It naturally detects cycles if not all nodes are processed.

### Edge Cases and Gotchas
*   **Cycles**: If a cycle exists, topological sort is impossible. The DFS-based approach detects this using `recursionStack`.
*   **Disconnected Components**: The algorithm must iterate over all vertices to ensure all components are covered.
*   **Undirected Graphs**: Topological sort is strictly for directed graphs. Applying it to an undirected graph usually implies a misunderstanding of the problem.
*   **Multiple Valid Orders**: For many DAGs, there can be multiple valid topological orders. Any correct order is acceptable.

### Interview Tips and Variations
*   **Common Applications**: Task scheduling, course prerequisites, build systems, dependency resolution.
*   **Cycle Detection**: The `recursionStack` technique is a standard way to detect cycles in directed graphs.
*   **Follow-up**: "What if the graph has cycles? How would you detect them?" (already integrated). "What if there are multiple valid topological sorts?" (explain that any valid one is fine, or how to get a specific one, e.g., lexicographical, which requires a min-priority queue with Kahn's).
*   **DFS vs Kahn's**: Be prepared to discuss both. DFS might be more intuitive for some, while Kahn's can be iterative and thus avoid recursion limits for very deep graphs.

---

## 3. Dijkstra's Algorithm

### Problem Statement
Given a weighted graph (with non-negative edge weights) and a `startVertex`, find the shortest path from `startVertex` to all other vertices.

### Core Logic (using Priority Queue)
Dijkstra's is a greedy algorithm that finds the shortest path by iteratively selecting the unvisited vertex with the smallest known distance from the source. A min-priority queue (min-heap) is crucial for efficient selection.

1.  **Initialization**:
    *   `distances`: A map to store the shortest distance found so far from `startVertex` to every other vertex. Initialize `startVertex` distance to 0, and all others to `Infinity`.
    *   `paths`: A map to store the predecessor of each vertex in the shortest path tree (for path reconstruction). Initialize all to `null`.
    *   `priorityQueue (PQ)`: A min-priority queue. Add `startVertex` with priority 0 (`{ value: startVertex, priority: 0 }`).

2.  **Algorithm Loop**:
    *   While `PQ` is not empty:
        *   Extract `currentVertex` with the smallest `currentDistance` from `PQ`.
        *   **Optimization/Lazy Update Check**: If `currentDistance` is *greater* than `distances.get(currentVertex)`, it means we've already found a shorter path to `currentVertex` and processed it. Skip this entry (this handles redundant entries in PQ due to lazy updates).
        *   For each `neighbor` of `currentVertex`:
            *   Calculate `distanceThroughCurrent = currentDistance + weight(currentVertex, neighbor)`.
            *   If `distanceThroughCurrent` is less than `distances.get(neighbor)`:
                *   Update `distances.set(neighbor, distanceThroughCurrent)`.
                *   Update `paths.set(neighbor, currentVertex)`.
                *   Enqueue `neighbor` into `PQ` with `distanceThroughCurrent` as its new priority.

3.  **Result**:
    *   After the loop, `distances` will contain the shortest distances from `startVertex` to all other reachable vertices. `paths` can be used to reconstruct specific paths.

### ASCII Art Diagram (Dijkstra's Example)

```
     (4)     (8)
  A ----- B ----- C
  | \     |       |
(2)|  (5) |(2)     |(1)
  |   \   |       |
  D ----- E ----- F
     (1)     (10)

Start = A

1. Init:
   distances: {A:0, B:∞, C:∞, D:∞, E:∞, F:∞}
   paths: {A:null, B:null, C:null, D:null, E:null, F:null}
   PQ: [{value: A, priority: 0}]

2. Dequeue A (0):
   - Neighbors: B (4), D (2)
   - B: (0+4) < ∞. distances[B]=4, paths[B]=A. PQ.enqueue({B, 4})
   - D: (0+2) < ∞. distances[D]=2, paths[D]=A. PQ.enqueue({D, 2})
   PQ: [{D, 2}, {B, 4}]

3. Dequeue D (2):
   - Neighbors: A (2), E (1) (total edge weights not shown on diagram)
   - A: (2+2) > distances[A]. Skip.
   - E: (2+1) < ∞. distances[E]=3, paths[E]=D. PQ.enqueue({E, 3})
   PQ: [{B, 4}, {E, 3}] -> Sorted: [{E, 3}, {B, 4}]

4. Dequeue E (3):
   - Neighbors: D (1), B (2), F (10)
   - D: (3+1) > distances[D]. Skip.
   - B: (3+2) = 5. (5 > distances[B]=4). Skip (new path A->D->E->B is longer than A->B).
   - F: (3+10) < ∞. distances[F]=13, paths[F]=E. PQ.enqueue({F, 13})
   PQ: [{B, 4}, {F, 13}]

5. Dequeue B (4):
   - Neighbors: A (4), C (8), E (2)
   - A: (4+4) > distances[A]. Skip.
   - C: (4+8) < ∞. distances[C]=12, paths[C]=B. PQ.enqueue({C, 12})
   - E: (4+2) = 6. (6 > distances[E]=3). Skip.
   PQ: [{F, 13}, {C, 12}] -> Sorted: [{C, 12}, {F, 13}]

6. Dequeue C (12):
   - Neighbors: B (8), F (1)
   - B: (12+8) > distances[B]. Skip.
   - F: (12+1) = 13. (13 >= distances[F]=13). No improvement, or same distance. (If using strict <, skip. If <=, update path but not distance.)
     Let's assume strict < for this logic, so it skips. (A->D->E->F is current shortest to F).
   PQ: [{F, 13}]

7. Dequeue F (13):
   - Neighbors: E (10), C (1)
   - E: (13+10) > distances[E]. Skip.
   - C: (13+1) > distances[C]. Skip.
   PQ: []

All nodes processed.

Final Distances:
A: 0
B: 4 (via A->B)
C: 12 (via A->B->C)
D: 2 (via A->D)
E: 3 (via A->D->E)
F: 13 (via A->D->E->F)
```

### Time and Space Complexity
*   **Time Complexity**: O(E log V)
    *   `E`: Number of edges. Each edge relaxation involves a `decrease-key` operation on the priority queue, which is `O(log V)`.
    *   `V`: Number of vertices. Each vertex is extracted from the priority queue once. `extract-min` is `O(log V)`.
    *   Using a simple array to find min-distance node: O(V^2 + E) or O(V^2) if E is small.
*   **Space Complexity**: O(V + E)
    *   `distances` map: O(V)
    *   `paths` map: O(V)
    *   `priorityQueue`: O(V) (can hold up to V elements, although potentially more if "lazy updates" are used and old entries aren't removed).

### Edge Cases and Gotchas
*   **Negative Edge Weights**: Dijkstra's algorithm *fails* with negative edge weights or negative cycles. For such cases, Bellman-Ford or SPFA algorithms are required.
*   **Disconnected Graph**: Vertices unreachable from `startVertex` will retain an `Infinity` distance.
*   **Non-existent Start Vertex**: Should be handled gracefully (e.g., return `null`).
*   **Graph Representation**: Adjacency list is efficient for sparse graphs (E << V^2), making E log V more favorable than V^2. Adjacency matrix can be used but usually less efficient for pathfinding.
*   **Lazy Updates in PQ**: If the priority queue doesn't support efficient `decrease-key` (which standard binary heaps typically don't without extra data structures), we often simply add a new entry for an updated distance. The algorithm will then correctly process the entry with the smallest distance first and ignore older, higher-priority entries.

### Interview Tips and Variations
*   **Common Applications**: Network routing (OSPF), shortest path in mapping services, resource allocation.
*   **Path Reconstruction**: Always be prepared to reconstruct the actual path, not just the distance.
*   **Follow-up Questions**:
    *   "How would you handle negative weights?" (Bellman-Ford).
    *   "What if the graph is huge and sparse?" (Discuss Adjacency List + Binary Heap).
    *   "Can you optimize the priority queue?" (Fibonacci heap for O(E + V log V), but usually not expected in standard interviews).
    *   "Compare Dijkstra's with BFS/DFS."
*   **BFS vs Dijkstra's**: BFS for unweighted shortest paths (counts edges), Dijkstra's for weighted shortest paths (sums weights).

---

## 4. Cycle Detection

### Problem Statement
Determine if a given graph contains at least one cycle. This problem often differentiates between directed and undirected graphs, as the definition of a cycle and detection methods vary.

### Core Logic (Directed Graphs - DFS-based)
For directed graphs, a cycle is detected using DFS by keeping track of nodes currently in the recursion stack.

1.  **Node States**: During DFS, each node can be in one of three states:
    *   **Unvisited**: Not yet encountered in the current DFS.
    *   **Visiting (in recursion stack)**: Currently in the recursion stack of the DFS, meaning its subtree is being explored.
    *   **Visited (fully processed)**: All descendants have been explored and the node has been popped from the recursion stack.

2.  **Algorithm**:
    *   `visited`: A set to store all `visited` nodes (states 2 & 3).
    *   `recursionStack`: A set to store nodes currently in the `visiting` state (state 2).
    *   For each `vertex` in the graph (to handle disconnected components):
        *   If `vertex` is `unvisited`: call a helper `dfs(vertex)`.
        *   If `dfs()` returns `true`, a cycle is found, return `true`.

3.  **DFS Helper (`dfs(vertex)`):**
    *   Mark `vertex` as `visited` and add it to `recursionStack`.
    *   For each `neighbor` of `vertex`:
        *   If `neighbor` is in `recursionStack`: **Cycle detected!** A back-edge to an ancestor in the current DFS path. Return `true`.
        *   If `neighbor` is `unvisited`: Recursively call `dfs(neighbor)`. If it returns `true`, propagate `true`.
    *   Remove `vertex` from `recursionStack` (it's now fully processed).
    *   Return `false` (no cycle found in this path).

### ASCII Art Diagram (Directed Cycle Detection)

```
       A <--- D
       |      ^
       v      |
       B ---> C

DFS from A:
visited: {}
recursionStack: {}

dfs(A, null):
  visited: {A}
  recursionStack: {A}
  - Neighbor B:
    dfs(B, A):
      visited: {A,B}
      recursionStack: {A,B}
      - Neighbor C:
        dfs(C, B):
          visited: {A,B,C}
          recursionStack: {A,B,C}
          - Neighbor D:
            dfs(D, C):
              visited: {A,B,C,D}
              recursionStack: {A,B,C,D}
              - Neighbor A:
                A is in recursionStack {A,B,C,D}. -> CYCLE DETECTED (D -> A is a back-edge)! Return true.
            dfs(D) returns true. Propagate true.
        dfs(C) returns true. Propagate true.
    dfs(B) returns true. Propagate true.
  dfs(A) returns true.

Result: Cycle Detected!
```

### Core Logic (Undirected Graphs - DFS-based)
For undirected graphs, a cycle is detected if we encounter a `visited` vertex that is *not* the immediate parent of the current vertex in the DFS tree.

1.  **Algorithm**:
    *   `visited`: A set to store all `visited` nodes.
    *   For each `vertex` in the graph:
        *   If `vertex` is `unvisited`: call a helper `dfs(vertex, null)` (parent is `null` for the root of a DFS tree).
        *   If `dfs()` returns `true`, a cycle is found, return `true`.

2.  **DFS Helper (`dfs(vertex, parent)`):**
    *   Mark `vertex` as `visited`.
    *   For each `neighbor` of `vertex`:
        *   If `neighbor` is `visited` **AND** `neighbor` is *not* the `parent`: **Cycle detected!** This is a back-edge to an already visited node that's not its direct parent. Return `true`.
        *   If `neighbor` is `unvisited`: Recursively call `dfs(neighbor, vertex)`. If it returns `true`, propagate `true`.
    *   Return `false` (no cycle found in this path).

### ASCII Art Diagram (Undirected Cycle Detection)

```
        A
       / \
      B---C
       \ /
        D

DFS from A:
visited: {}

dfs(A, null):
  visited: {A}
  - Neighbor B:
    dfs(B, A):
      visited: {A,B}
      - Neighbor A: A is parent. Skip.
      - Neighbor C:
        dfs(C, B):
          visited: {A,B,C}
          - Neighbor A: A is not parent. A is visited. -> CYCLE DETECTED (C-A)! Return true.
        dfs(C) returns true. Propagate true.
    dfs(B) returns true. Propagate true.
  dfs(A) returns true.

Result: Cycle Detected!
```

### Time and Space Complexity
*   **Time Complexity**: O(V + E) for both directed and undirected graphs.
    *   Each vertex and each edge is visited at most once.
*   **Space Complexity**: O(V) for both.
    *   `visited` set: O(V)
    *   `recursionStack` set (for directed): O(V)
    *   Recursion call stack: O(V) in worst case (linear graph).

### Edge Cases and Gotchas
*   **Disconnected Graphs**: Both algorithms iterate through all vertices to ensure all components are checked.
*   **Self-Loops**: A self-loop (`A -> A` or `A -- A`) is considered a cycle and should be detected. The current implementations handle this.
*   **Parallel Edges**: Multiple edges between the same two vertices don't create new cycles beyond what's implicitly there, but the algorithms should handle them without issues.
*   **Graph Type Mismatch**: Using `detectCycleDirected` on an undirected graph (or vice-versa) can lead to incorrect results or warnings. The implementations include checks for this.

### Interview Tips and Variations
*   **BFS for Undirected Cycles**: An alternative for undirected graphs is BFS with parent tracking. If you enqueue a neighbor that's already visited and isn't its parent, it's a cycle.
*   **Cycle Path**: A common follow-up is to return *a* cycle path, not just `true`/`false`. This involves storing the path and backtracking when a cycle is detected.
*   **Topological Sort Connection**: A directed graph has a topological sort *if and only if* it is a DAG (i.e., has no cycles). Cycle detection is an inherent part of the DFS-based topological sort.
*   **Union-Find for Undirected Cycles**: For undirected graphs, the Union-Find data structure can efficiently detect cycles by checking if adding an edge connects two already-connected components. If they are already in the same set, adding an edge creates a cycle. This is particularly efficient for edge-list representations.

---