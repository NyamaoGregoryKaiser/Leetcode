# Graph Algorithms: Deep Dive for Interview Preparation

This document provides a detailed explanation of the graph algorithms implemented in this project, including problem descriptions, high-level logic, ASCII diagrams, complexity analysis, edge cases, and interview tips.

---

## 1. Breadth-First Search (BFS) & Depth-First Search (DFS)

### Problem Description
Given a graph and two vertices, a start vertex and an end vertex:
1.  **Path Existence:** Determine if a path exists from the start vertex to the end vertex.
2.  **Shortest Path (Unweighted):** Find a shortest path in terms of the number of edges.

### High-Level Explanation

Both BFS and DFS are graph traversal algorithms. They differ in their exploration strategy:

*   **BFS (Breadth-First Search):** Explores all the neighbor nodes at the present depth level before moving on to the nodes at the next depth level. It uses a queue to keep track of nodes to visit.
*   **DFS (Depth-First Search):** Explores as far as possible along each branch before backtracking. It uses a stack (or recursion implicit stack) to keep track of nodes to visit.

### Algorithm Steps

#### BFS (Path Existence & Shortest Path)
1.  Initialize a `queue` with the `startVertex`.
2.  Initialize a `visited` set to keep track of visited vertices and add `startVertex` to it.
3.  For shortest path reconstruction, initialize a `previous` map to store the predecessor of each vertex. Set `previous[startVertex] = null`.
4.  While the `queue` is not empty:
    a.  Dequeue a `currentVertex`.
    b.  If `currentVertex` is the `endVertex`, a path is found. For shortest path, you can reconstruct it here.
    c.  For each `neighbor` of `currentVertex`:
        i.  If `neighbor` has not been `visited`:
            *   Mark `neighbor` as `visited`.
            *   Set `previous[neighbor] = currentVertex` (for shortest path).
            *   Enqueue `neighbor`.
5.  If the queue becomes empty and `endVertex` was not reached, no path exists.
6.  To reconstruct the path: Start from `endVertex` and backtrack using the `previous` map until `startVertex` is reached, then reverse the path.

#### DFS (Path Existence)
1.  Initialize a `visited` set.
2.  Define a recursive helper function `dfsRecursive(currentVertex)`:
    a.  Mark `currentVertex` as `visited`.
    b.  If `currentVertex` is the `endVertex`, return `true` (path found).
    c.  For each `neighbor` of `currentVertex`:
        i.  If `neighbor` has not been `visited`:
            *   Recursively call `dfsRecursive(neighbor)`. If it returns `true`, propagate `true` upwards.
    d.  If no neighbor leads to `endVertex`, return `false`.
3.  Call `dfsRecursive(startVertex)`.

### Visual Diagram (ASCII Art)

```
  A ---- B
  |    / |
  |   /  |
  C ---- D ---- E
```

*   **BFS (from A to E):**
    *   Queue: [A]
    *   Dequeue A. Neighbors B, C.
    *   Queue: [B, C]. Visited: {A, B, C}
    *   Dequeue B. Neighbors D (A, C already visited).
    *   Queue: [C, D]. Visited: {A, B, C, D}
    *   Dequeue C. Neighbors D (already visited).
    *   Queue: [D]. Visited: {A, B, C, D}
    *   Dequeue D. Neighbor E. Path found!
    *   Shortest path: A -> C -> D -> E (length 3)

*   **DFS (from A to E):**
    *   Call dfs(A). Visited: {A}
    *   Neighbor B. Call dfs(B). Visited: {A, B}
    *   Neighbor D. Call dfs(D). Visited: {A, B, D}
    *   Neighbor E. Path found! Returns true.
    *   DFS Path: A -> B -> D -> E (length 3). Note: DFS doesn't guarantee shortest path in unweighted graphs unless specifically modified.

### Time and Space Complexity

*   **Time Complexity:**
    *   Both BFS and DFS: **O(V + E)**, where V is the number of vertices and E is the number of edges. Each vertex and edge is processed at most once.
*   **Space Complexity:**
    *   BFS: **O(V)** for the queue and `visited`/`previous` maps. In the worst case, the queue can hold all vertices in a dense graph.
    *   DFS: **O(V)** for the recursion stack (in a sparse, linear graph) and `visited` set.

### Edge Cases and Gotchas

*   **Disconnected Graph:** If the `endVertex` is in a disconnected component from `startVertex`, both algorithms correctly report no path.
*   **Start/End Vertex Not in Graph:** Handle by returning `null` or throwing an error.
*   **Self-Loop (Path to Self):** A path from A to A exists and is just `[A]`.
*   **Cycles:** Both BFS and DFS handle cycles correctly by using a `visited` set/map to prevent infinite loops.
*   **Weighted Graphs:** For shortest paths in weighted graphs, BFS is *not* sufficient. Dijkstra's or Bellman-Ford algorithms are needed. `bfsShortestPath` specifically states "unweighted graph".

### Interview Tips and Variations

*   **BFS vs. DFS Choice:**
    *   **BFS:** Good for finding shortest paths (in terms of number of edges) in unweighted graphs, or for "closest" problems.
    *   **DFS:** Good for connectivity, cycle detection, topological sort, and pathfinding where path length isn't critical. Often simpler to implement recursively.
*   **Path Reconstruction:** Be prepared to explain how to reconstruct the path (using a `previous` map/array).
*   **Iterative DFS:** Sometimes interviewers ask for an iterative DFS using an explicit stack instead of recursion (to avoid stack overflow for very deep graphs).
*   **Variations:**
    *   Find all paths between two nodes.
    *   Detect cycles in a graph.
    *   Find connected components.
    *   Bipartite check (using BFS/DFS with coloring).

---

## 2. Dijkstra's Algorithm

### Problem Description
Given a graph with weighted edges (non-negative weights) and a source (start) vertex, find the shortest path from the source to all other reachable vertices.

### High-Level Explanation
Dijkstra's algorithm is a greedy algorithm that finds the shortest paths from a single source vertex to all other vertices in a weighted graph with non-negative edge weights. It maintains a set of visited vertices for which the shortest path from the source is finalized. It iteratively selects the unvisited vertex with the smallest known distance from the source, adds it to the visited set, and updates the distances to its neighbors.

### Algorithm Steps
1.  Initialize `distances` map: Set `distance[startVertex] = 0` and `distance[otherVertices] = Infinity`.
2.  Initialize `paths` map: To reconstruct paths, `paths[vertex]` stores the predecessor of `vertex` in the shortest path. Initialize all to `null`.
3.  Initialize a `PriorityQueue` (Min-Heap) and `enqueue` `startVertex` with priority `0`. The priority queue will store `{vertex, distance_from_source}` pairs.
4.  While the `PriorityQueue` is not empty:
    a.  `Dequeue` the `vertex` (`currentVertex`) with the smallest `distance` (`currentDistance`) from the priority queue.
    b.  **Optimization/Guard:** If `currentDistance` is greater than `distances.get(currentVertex)`, it means a shorter path to `currentVertex` has already been found and processed, so skip this (stale) entry.
    c.  For each `neighbor` of `currentVertex`:
        i.  Calculate `newDistance = currentDistance + weight(currentVertex, neighbor)`.
        ii. If `newDistance < distances.get(neighbor)`:
            *   Update `distances.set(neighbor, newDistance)`.
            *   Update `paths.set(neighbor, currentVertex)`.
            *   `Enqueue` (or `updatePriority`) `neighbor` with `newDistance` in the priority queue.
5.  After the loop, the `distances` map contains the shortest distances, and `paths` map allows path reconstruction.

### Visual Diagram (ASCII Art)

```
       A---(4)---B
       | \       |
      (2)(5)    (3)
       |   \     |
       C---(2)---D---(3)---E
```
*   **Start from A:**
    *   `distances = {A:0, B:∞, C:∞, D:∞, E:∞}`
    *   `pq = [{A,0}]`

1.  **Dequeue A (0)**
    *   Neighbors B (4), C (2).
    *   `distances = {A:0, B:4, C:2, D:∞, E:∞}`
    *   `paths = {A:null, B:A, C:A}`
    *   `pq = [{C,2}, {B,4}]`

2.  **Dequeue C (2)**
    *   Neighbors A (visited), D (2).
    *   Path to D via C: 2 (C) + 2 (C-D) = 4. `4 < ∞`.
    *   `distances = {A:0, B:4, C:2, D:4, E:∞}`
    *   `paths = {A:null, B:A, C:A, D:C}`
    *   `pq = [{B,4}, {D,4}]` (Order might vary for equal priority)

3.  **Dequeue B (4)**
    *   Neighbors A (visited), D (5).
    *   Path to D via B: 4 (B) + 5 (B-D) = 9. `9 > 4` (current distance to D is 4). No update.
    *   Neighbors E (3).
    *   Path to E via B: 4 (B) + 3 (B-E) = 7. `7 < ∞`.
    *   `distances = {A:0, B:4, C:2, D:4, E:7}`
    *   `paths = {A:null, B:A, C:A, D:C, E:B}`
    *   `pq = [{D,4}, {E,7}]`

4.  **Dequeue D (4)**
    *   Neighbors C (visited), E (3).
    *   Path to E via D: 4 (D) + 3 (D-E) = 7. `7 === 7` (current distance to E is 7). No update.
    *   `pq = [{E,7}]`

5.  **Dequeue E (7)**
    *   No unvisited neighbors with shorter paths.
    *   `pq = []`

*   **Final Distances from A:**
    *   A: 0
    *   B: 4 (A->B)
    *   C: 2 (A->C)
    *   D: 4 (A->C->D)
    *   E: 7 (A->C->D->E) OR (A->B->E) - if first path through C->D->E discovered, it becomes 7. If A->B->E, it's 7.
        In this example, A->C->D takes 4, D->E takes 3, total 7. A->B takes 4, B->E takes 3, total 7. Both are shortest. The algorithm picks one arbitrarily based on processing order.

### Time and Space Complexity

*   **Time Complexity:**
    *   Using a Binary Heap (like our `PriorityQueue`): **O(E log V)**.
        *   Each vertex is extracted once from PQ: `V` extractions, each `O(log V)`.
        *   Each edge relaxation (distance update): `E` edges, each `O(log V)` for `enqueue` or `updatePriority`.
*   **Space Complexity:** **O(V + E)** for `distances` map, `paths` map, and `PriorityQueue`.

### Edge Cases and Gotchas

*   **Negative Edge Weights:** Dijkstra's fails with negative edge weights as its greedy approach assumes once a vertex's shortest path is found, it's final. For negative weights, use Bellman-Ford or SPFA.
*   **Disconnected Graph:** Vertices in unreachable components will retain `Infinity` distance.
*   **Invalid Start Vertex:** Handle by returning `null` or throwing an error.
*   **Graph with No Edges:** Correctly returns 0 for start vertex, Infinity for others.
*   **Directed vs. Undirected:** Works for both. For undirected, treat each undirected edge as two directed edges with the same weight.
*   **No Path to a Vertex:** The `distances` for unreachable vertices will remain `Infinity`. The `reconstructPath` helper handles this by returning `null`.

### Interview Tips and Variations

*   **Explain Greedy Choice:** Why is selecting the smallest-distance unvisited vertex always optimal? (Because non-negative weights ensure future paths won't make an already shortest path shorter).
*   **Priority Queue Importance:** Emphasize why a PQ is crucial for efficiency (instead of `O(V)` scan for min-distance at each step, making it `O(V^2)`).
*   **Data Structures for PQ:** Discuss alternatives like Fibonacci heap (theoretical `O(E + V log V)`) vs. Binary Heap (practical `O(E log V)`).
*   **Variations:**
    *   Find the shortest path to a *specific* destination (can stop Dijkstra's early).
    *   Find the K-shortest paths.
    *   Variant with multiple source nodes (add all to PQ with 0 distance initially).
    *   Apply to grid-based problems (e.g., shortest path in a maze where cells have 'cost').

---

## 3. Prim's Algorithm

### Problem Description
Given a connected, undirected, weighted graph, find a Minimum Spanning Tree (MST). An MST is a subgraph that connects all vertices with the minimum possible total edge weight and contains no cycles.

### High-Level Explanation
Prim's algorithm is a greedy algorithm that builds an MST by progressively adding the cheapest edge that connects a new vertex to the growing tree. It starts with an arbitrary vertex and expands the MST by always choosing the minimum-weight edge connecting a vertex in the MST to a vertex outside the MST.

### Algorithm Steps
1.  Initialize `minCost` map: `minCost[startVertex] = 0` and `minCost[otherVertices] = Infinity`. This represents the minimum weight of an edge connecting a vertex to the current MST.
2.  Initialize `parentEdge` map: `parentEdge[vertex]` stores `[predecessor, weight]` of the edge that brings `vertex` into the MST. Initialize all to `null`.
3.  Initialize `visited` set to keep track of vertices already included in the MST.
4.  Initialize a `PriorityQueue` (Min-Heap) and `enqueue` `startVertex` with priority `0`. The priority queue stores `{vertex, cost_to_connect_to_MST}` pairs.
5.  Initialize `mstWeight = 0` and `mstEdges = []`.
6.  While the `PriorityQueue` is not empty and not all vertices are processed:
    a.  `Dequeue` the `vertex` (`currentVertex`) with the smallest `cost` (`currentCost`) from the priority queue.
    b.  **Optimization/Guard:** If `currentVertex` is already `visited` or `currentCost` is greater than `minCost.get(currentVertex)`, skip (stale entry).
    c.  Add `currentVertex` to `visited`.
    d.  If `parentEdge.get(currentVertex)` is not `null` (i.e., it's not the start vertex), add its `parentEdge` to `mstEdges` and add its weight to `mstWeight`.
    e.  For each `neighbor` of `currentVertex`:
        i.  If `neighbor` has not been `visited`:
            *   Get `weight = weight(currentVertex, neighbor)`.
            *   If `weight < minCost.get(neighbor)`:
                *   Update `minCost.set(neighbor, weight)`.
                *   Update `parentEdge.set(neighbor, [currentVertex, weight])`.
                *   `Enqueue` (or `updatePriority`) `neighbor` with `weight` in the priority queue.
7.  After the loop, check if `visited` contains all vertices. If not, the graph is disconnected, and no full MST exists.

### Visual Diagram (ASCII Art)

```
        A---(7)---B---(10)---C
        |\        | \        |
       (9)(14)   (15)(11)   (2)
        |    \     |    \    |
        F---(9)---E---(6)---D
```
*   **Start from A:**
    *   `minCost = {A:0, B:∞, C:∞, D:∞, E:∞, F:∞}`
    *   `pq = [{A,0}]`

1.  **Dequeue A (0)**. Add A to `visited`.
    *   Neighbors B (7), C (9), F (14).
    *   `minCost = {A:0, B:7, C:9, D:∞, E:∞, F:14}`
    *   `parentEdge = {B: [A,7], C: [A,9], F: [A,14]}`
    *   `pq = [{B,7}, {C,9}, {F,14}]`

2.  **Dequeue B (7)**. Add B to `visited`. Add `(A,B,7)` to `mstEdges`. `mstWeight = 7`.
    *   Neighbors A (visited), C (10), D (15).
    *   C: current `minCost[C]=9` (via A). New cost via B is 10. `9 < 10`. No update.
    *   D: current `minCost[D]=∞`. New cost via B is 15. `15 < ∞`.
    *   `minCost[D]=15`, `parentEdge[D]=[B,15]`.
    *   `pq = [{C,9}, {F,14}, {D,15}]`

3.  **Dequeue C (9)**. Add C to `visited`. Add `(A,C,9)` to `mstEdges`. `mstWeight = 7+9=16`.
    *   Neighbors A, B (visited), D (11), F (2).
    *   D: current `minCost[D]=15` (via B). New cost via C is 11. `11 < 15`. Update.
    *   `minCost[D]=11`, `parentEdge[D]=[C,11]`. `pq.updatePriority(D,11)`.
    *   F: current `minCost[F]=14` (via A). New cost via C is 2. `2 < 14`. Update.
    *   `minCost[F]=2`, `parentEdge[F]=[C,2]`. `pq.updatePriority(F,2)`.
    *   `pq = [{F,2}, {D,11}]` (order might change due to priority updates)

4.  **Dequeue F (2)**. Add F to `visited`. Add `(C,F,2)` to `mstEdges`. `mstWeight = 16+2=18`.
    *   Neighbors A, C (visited), E (9).
    *   E: current `minCost[E]=∞`. New cost via F is 9. `9 < ∞`.
    *   `minCost[E]=9`, `parentEdge[E]=[F,9]`.
    *   `pq = [{D,11}, {E,9}]`

5.  **Dequeue E (9)**. Add E to `visited`. Add `(F,E,9)` to `mstEdges`. `mstWeight = 18+9=27`.
    *   Neighbors D (6), F (visited).
    *   D: current `minCost[D]=11` (via C). New cost via E is 6. `6 < 11`. Update.
    *   `minCost[D]=6`, `parentEdge[D]=[E,6]`. `pq.updatePriority(D,6)`.
    *   `pq = [{D,6}]`

6.  **Dequeue D (6)**. Add D to `visited`. Add `(E,D,6)` to `mstEdges`. `mstWeight = 27+6=33`.
    *   Neighbors B, C, E (all visited).
    *   `pq = []`

*   **Final MST Weight:** 33
*   **Final MST Edges (set of unique edges):** {(A,B,7), (A,C,9), (C,F,2), (F,E,9), (E,D,6)}

### Time and Space Complexity

*   **Time Complexity:**
    *   Using a Binary Heap (like our `PriorityQueue`): **O(E log V)**.
        *   Each vertex is extracted once from PQ: `V` extractions, each `O(log V)`.
        *   Each edge considered: `E` edges. For each neighbor, a potential `enqueue` or `updatePriority` takes `O(log V)`.
*   **Space Complexity:** **O(V + E)** for `minCost` map, `parentEdge` map, `visited` set, and `PriorityQueue`.

### Edge Cases and Gotchas

*   **Disconnected Graph:** Prim's algorithm only finds an MST for connected graphs. If the graph is disconnected, it will only find an MST for the connected component of the starting vertex. The implementation returns `null` if not all vertices are included.
*   **Empty Graph / Single Vertex:** Returns an MST with 0 weight and no edges/single vertex, respectively.
*   **Negative Edge Weights:** Prim's algorithm works correctly with negative edge weights as long as the graph is undirected. The definition of MST doesn't preclude negative weights.
*   **Not Undirected:** Prim's is designed for undirected graphs. If a directed graph is given, it will effectively build an MST on the underlying undirected graph (ignoring direction). The `Graph` class constructor takes `isDirected`.
*   **Multiple MSTs:** If there are edges with equal weights, there might be multiple MSTs with the same total weight. Prim's will find one of them.

### Interview Tips and Variations

*   **Kruskal's vs. Prim's:** Be ready to compare Prim's (vertex-centric, good for dense graphs) with Kruskal's (edge-centric, good for sparse graphs).
*   **Proof of Correctness:** Understand why the greedy choice works (cut property).
*   **Data Structures:** Emphasize the role of the Priority Queue for efficiency.
*   **Variations:**
    *   Find the maximum spanning tree.
    *   Solve problems where you need to connect components with minimum cost.
    *   Discuss how to implement efficiently (e.g., array-based for dense graphs `O(V^2)` vs. heap for sparse `O(E log V)`).

---

## 4. Topological Sort

### Problem Description
Given a Directed Acyclic Graph (DAG), produce a linear ordering of its vertices such that for every directed edge `u -> v`, vertex `u` comes before vertex `v` in the ordering. If the graph contains a cycle, a topological sort is not possible.

### High-Level Explanation
A topological sort is essentially an ordering of tasks where prerequisites come first. There are two main algorithms:

*   **Kahn's Algorithm (BFS-based):** Uses in-degrees of vertices. It iteratively removes vertices with an in-degree of 0 and decrements the in-degrees of their neighbors.
*   **DFS-based Algorithm:** Uses a modification of DFS. It relies on the fact that in a DAG, a vertex only gets added to the topological sort list after all its dependent vertices (i.e., vertices reachable from it) have been processed.

### Algorithm Steps

#### Kahn's Algorithm (BFS-based)
1.  Compute the in-degree for all vertices. (`inDegree[vertex]` = number of incoming edges).
2.  Initialize a `queue` and add all vertices with an in-degree of 0.
3.  Initialize an empty `result` list and a `visitedCount = 0`.
4.  While the `queue` is not empty:
    a.  `Dequeue` a `currentVertex`.
    b.  Add `currentVertex` to `result`.
    c.  Increment `visitedCount`.
    d.  For each `neighbor` of `currentVertex`:
        i.  Decrement `inDegree[neighbor]`.
        ii. If `inDegree[neighbor]` becomes 0, `enqueue` `neighbor`.
5.  After the loop, if `visitedCount` is less than the total number of vertices in the graph, it means there's a cycle, and a topological sort is impossible (return `null`).
6.  Otherwise, `result` contains a valid topological sort.

#### DFS-based Algorithm
1.  Initialize a `visited` set (for fully processed nodes), a `recursionStack` set (for nodes currently in the recursion path to detect cycles), and an empty `result` list.
2.  Define a recursive helper function `dfs(currentVertex)`:
    a.  Mark `currentVertex` as `visited`.
    b.  Add `currentVertex` to `recursionStack`.
    c.  For each `neighbor` of `currentVertex`:
        i.  If `neighbor` is in `recursionStack`, a cycle is detected (return `false`).
        ii. If `neighbor` has not been `visited`:
            *   Recursively call `dfs(neighbor)`. If it returns `false`, propagate `false` (cycle detected).
    d.  Remove `currentVertex` from `recursionStack` (it has been fully processed).
    e.  `Prepend` `currentVertex` to the `result` list (this is a key difference from standard DFS, as nodes are added after all descendants are visited). Return `true`.
3.  Iterate through all vertices in the graph. If a vertex has not been `visited`, call `dfs(vertex)`. If any `dfs` call returns `false`, a cycle exists (return `null`).
4.  If all calls complete, `result` contains a valid topological sort.

### Visual Diagram (ASCII Art)

```
       A ----> B
       |       |
       v       v
       C ----> D ----> F
       |       ^
       v       |
       E -------
```

*   **In-Degrees:** A:0, B:1, C:1, D:2, E:1, F:2
*   **Kahn's Algorithm:**
    1.  Queue: [A]
    2.  Dequeue A. Result: [A]. Decrement in-degree of B, C.
        In-degrees: A:0, B:0, C:0, D:2, E:1, F:2
        Queue: [B, C]
    3.  Dequeue B. Result: [A, B]. Decrement in-degree of D.
        In-degrees: A:0, B:0, C:0, D:1, E:1, F:2
        Queue: [C]
    4.  Dequeue C. Result: [A, B, C]. Decrement in-degree of D, E.
        In-degrees: A:0, B:0, C:0, D:0, E:0, F:2
        Queue: [D, E]
    5.  Dequeue D. Result: [A, B, C, D]. Decrement in-degree of F.
        In-degrees: A:0, B:0, C:0, D:0, E:0, F:1
        Queue: [E]
    6.  Dequeue E. Result: [A, B, C, D, E]. Decrement in-degree of F.
        In-degrees: A:0, B:0, C:0, D:0, E:0, F:0
        Queue: [F]
    7.  Dequeue F. Result: [A, B, C, D, E, F].
        Queue: []
    *   **Final Topological Sort (Kahn's):** `[A, B, C, D, E, F]` (one possible valid order)

*   **DFS-based Algorithm (Starting from A, assuming neighbors A->B then A->C):**
    1.  `dfs(A)`: visit A, add to recursionStack.
        *   `dfs(B)`: visit B, add to recursionStack.
            *   `dfs(D)`: visit D, add to recursionStack.
                *   `dfs(F)`: visit F, add to recursionStack.
                    *   F has no unvisited neighbors. Remove F from recursionStack. Prepend F to result. `result = [F]`. Return true.
                *   Remove D from recursionStack. Prepend D to result. `result = [D, F]`. Return true.
            *   Remove B from recursionStack. Prepend B to result. `result = [B, D, F]`. Return true.
        *   `dfs(C)`: visit C, add to recursionStack.
            *   `dfs(E)`: visit E, add to recursionStack.
                *   E has no unvisited neighbors. Remove E from recursionStack. Prepend E to result. `result = [E, B, D, F]`. Return true.
            *   Remove C from recursionStack. Prepend C to result. `result = [C, E, B, D, F]`. Return true.
        *   Remove A from recursionStack. Prepend A to result. `result = [A, C, E, B, D, F]`. Return true.
    *   **Final Topological Sort (DFS):** `[A, C, E, B, D, F]` (one possible valid order, depends on neighbor iteration order)

### Time and Space Complexity

*   **Time Complexity:**
    *   Both Kahn's and DFS-based: **O(V + E)**.
        *   Kahn's: Calculating in-degrees is `O(V + E)`. The BFS traversal is also `O(V + E)`.
        *   DFS-based: Each vertex and edge is visited once by DFS, `O(V + E)`.
*   **Space Complexity:**
    *   Kahn's: **O(V)** for `inDegrees` map and the `queue`.
    *   DFS-based: **O(V)** for `visited` set, `recursionStack` set, and the recursion call stack (worst case `V` for a linear graph).

### Edge Cases and Gotchas

*   **Cycles:** The most important edge case. Both algorithms explicitly detect and handle cycles by returning `null` or throwing an error. For Kahn's, it's detected if `visitedCount < V`. For DFS, it's detected by encountering a node already in the `recursionStack`.
*   **Disconnected DAGs:** Both algorithms correctly handle disconnected components, producing a valid topological sort that includes all vertices.
*   **Empty Graph / Single Vertex:** Returns an empty array or an array with the single vertex, respectively.
*   **Not a Directed Graph:** Topological sort is only defined for directed graphs. The implementations check for `graph.isDirected` and return `null` if false.
*   **Multiple Valid Sorts:** Most DAGs have multiple valid topological sorts. The specific order produced depends on internal iteration order (e.g., of `Map.entries()` or `Set.values()`) and how elements are added to the queue/stack.

### Interview Tips and Variations

*   **"Task Scheduling" / "Course Pre-requisites":** These are classic applications. Be ready to map such problems to topological sort.
*   **Cycle Detection:** Often a follow-up question. Both algorithms naturally include cycle detection.
*   **Comparing Kahn's vs. DFS-based:**
    *   **Kahn's:** Easier to understand for many, naturally iterative, provides a "lexicographical" sort if the queue is managed deterministically.
    *   **DFS-based:** More concise, relies on recursion, good for problems needing reversed post-order traversal.
*   **When to Use Which:** Both are equivalent for correctness. Kahn's might be slightly preferred for detecting cycles quickly if only in-degrees are needed. DFS might be more intuitive if you're already familiar with DFS for other graph problems.
*   **Finding *a* topological sort vs. *all* topological sorts:** Usually just one is required. Finding all is a much harder problem (NP-hard).
*   **Variations:**
    *   Find if a graph is a DAG.
    *   Find a critical path in a project schedule (often combined with shortest/longest path on a DAG).
    *   Detect parallelizable tasks.

---