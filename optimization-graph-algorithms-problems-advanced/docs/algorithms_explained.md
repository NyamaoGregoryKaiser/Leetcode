```markdown
# Graph Algorithms Explained

This document provides a detailed explanation of the graph algorithms implemented in this project, including their concepts, step-by-step logic, complexity analysis, visual diagrams, edge cases, and variations.

---

## 1. Graph Traversals (BFS & DFS)

### A. Breadth-First Search (BFS)

**Concept:**
BFS is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root (or some arbitrary node of a graph, sometimes referred to as a 'search key') and explores all of the neighbor nodes at the present depth before moving on to the nodes at the next depth level. It uses a **queue** to manage the order of nodes to visit.

**Steps:**
1.  Create a `queue` and a `visited` array (or set). Initialize `dist` array.
2.  Enqueue the `startNode` and mark it as visited. Set `dist[startNode] = 0`.
3.  While the queue is not empty:
    a.  Dequeue a node `u`. Add `u` to the `traversal_order`.
    b.  For each unvisited neighbor `v` of `u`:
        i.  Mark `v` as visited.
        ii. Set `dist[v] = dist[u] + 1`.
        iii. Enqueue `v`.

**ASCII Diagram (BFS):**

```
Graph:
    0 -- 1
   /    / \
  2 ----  3
   \    /
    4 -- 5

Queue: [0]
Visited: {0}
Dist: [0, inf, inf, inf, inf, inf]

1. Dequeue 0. Add 0 to order.
   Neighbors of 0: 1, 2
   - Enqueue 1, visited[1]=T, dist[1]=1
   - Enqueue 2, visited[2]=T, dist[2]=1
Queue: [1, 2]
Order: [0]
Visited: {0,1,2}
Dist: [0, 1, 1, inf, inf, inf]

2. Dequeue 1. Add 1 to order.
   Neighbors of 1: 0 (visited), 3, 4
   - Enqueue 3, visited[3]=T, dist[3]=2
   - Enqueue 4, visited[4]=T, dist[4]=2
Queue: [2, 3, 4]
Order: [0, 1]
Visited: {0,1,2,3,4}
Dist: [0, 1, 1, 2, 2, inf]

3. Dequeue 2. Add 2 to order.
   Neighbors of 2: 0 (visited), 4 (visited), 5
   - Enqueue 5, visited[5]=T, dist[5]=2
Queue: [3, 4, 5]
Order: [0, 1, 2]
Visited: {0,1,2,3,4,5}
Dist: [0, 1, 1, 2, 2, 2]

... (continue until queue empty)

Final Order: [0, 1, 2, 3, 4, 5] (example)
Final Distances: [0, 1, 1, 2, 2, 2] (example)
```

**Time Complexity:** O(V + E), where V is the number of vertices and E is the number of edges. Each vertex is enqueued and dequeued at most once. Each edge is examined at most twice (once from each direction in an undirected graph, or once from source in a directed graph).
**Space Complexity:** O(V) for the queue, `visited` array, and `dist` array.

**Edge Cases & Gotchas:**
*   **Disconnected graphs:** BFS only visits nodes reachable from `startNode`. To visit all nodes in a disconnected graph, you'd need to run BFS from unvisited nodes multiple times.
*   **Empty graph/single node:** Handled by checks for `V=0` or `startNode` validity.
*   **Graph with cycles:** BFS handles cycles correctly by using the `visited` array, ensuring nodes are processed only once.
*   **Weighted graphs:** BFS finds shortest paths in *unweighted* graphs (in terms of number of edges). For weighted graphs, Dijkstra's is needed.

**Interview Tips & Variations:**
*   Finding the shortest path in an unweighted graph.
*   Checking if a path exists between two nodes.
*   Finding connected components.
*   Bipartite graph check.
*   "Level order" traversal (like a tree).

---

### B. Depth-First Search (DFS)

**Concept:**
DFS is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root (or any arbitrary node) and explores as far as possible along each branch before backtracking. It uses a **stack** (explicitly for iterative, implicitly for recursive call stack) to manage the order of nodes to visit.

#### i. Recursive DFS

**Steps:**
1.  Create a `visited` array (or set).
2.  Define a recursive helper function `dfs_util(u, adj, visited, traversal_order)`:
    a.  Mark `u` as visited. Add `u` to `traversal_order`.
    b.  For each unvisited neighbor `v` of `u`:
        i.  Recursively call `dfs_util(v, adj, visited, traversal_order)`.
3.  Call `dfs_util` for the `startNode`.

**ASCII Diagram (Recursive DFS):**

```
Graph:
    0 -- 1
   /    / \
  2 ----  3
   \    /
    4 -- 5

DFS(0):
- Visit 0. Order: [0]
  DFS(1): (from 0)
  - Visit 1. Order: [0, 1]
    DFS(3): (from 1)
    - Visit 3. Order: [0, 1, 3]
      DFS(5): (from 3)
      - Visit 5. Order: [0, 1, 3, 5]
        Neighbors of 5: 2 (unvisited), 4 (unvisited) - assuming 2 and 4 are from 5's perspective as neighbors
        - DFS(2): (from 5)
          - Visit 2. Order: [0, 1, 3, 5, 2]
            Neighbors of 2: 0 (visited), 4 (visited)
            Return from DFS(2)
        - DFS(4): (from 5) (Note: if 4 is already visited via 1->4 route, this branch will be skipped)
          ... if 4 is not visited ...
          - Visit 4. Order: [0, 1, 3, 5, 2, 4]
            Neighbors of 4: 1 (visited), 2 (visited)
            Return from DFS(4)
      Return from DFS(5)
    Return from DFS(3)
    DFS(4): (from 1) (if 4 not visited via 5)
    ...
  Return from DFS(1)
  DFS(2): (from 0) (if 2 not visited via 5)
  ...
Return from DFS(0)

Final Order: [0, 1, 3, 5, 2, 4] (example, depends on adjacency list order)
```

**Time Complexity:** O(V + E). Each vertex and edge is visited once.
**Space Complexity:** O(V) for the recursion stack and `visited` array. In the worst case (a highly skewed graph resembling a linked list), the recursion depth can be V.

#### ii. Iterative DFS

**Steps:**
1.  Create a `stack` and a `visited` array.
2.  Push `startNode` onto the stack and mark it as visited.
3.  While the stack is not empty:
    a.  Pop a node `u` from the stack. Add `u` to `traversal_order`.
    b.  For each unvisited neighbor `v` of `u`:
        i.  Mark `v` as visited.
        ii. Push `v` onto the stack.

**Time Complexity:** O(V + E).
**Space Complexity:** O(V) for the stack and `visited` array.

**Edge Cases & Gotchas (DFS):**
*   Same as BFS: disconnected graphs, empty/single node, graphs with cycles.
*   Order matters: The exact DFS traversal order can vary depending on the order of neighbors in the adjacency list. Recursive DFS explores the first neighbor fully before moving to the next, while iterative DFS behavior depends on how neighbors are pushed/popped.

**Interview Tips & Variations:**
*   Cycle detection in directed and undirected graphs.
*   Topological sort (for DAGs).
*   Finding connected components.
*   Finding strongly connected components (Tarjan's, Kosaraju's).
*   Pathfinding where path length isn't the primary concern (e.g., any path exists).

---

## 2. Shortest Path (Dijkstra's Algorithm)

**Concept:**
Dijkstra's algorithm finds the shortest paths from a single source node to all other nodes in a graph with non-negative edge weights. It is a greedy algorithm that explores the graph by always choosing the unvisited node with the smallest known distance from the source. It uses a **priority queue** to efficiently select the next node.

**Steps:**
1.  Initialize `dist` array with `infinity` for all nodes and `0` for `startNode`.
2.  Create a `min-priority queue` and push `{0, startNode}` (distance, vertex).
3.  While the priority queue is not empty:
    a.  Extract the node `u` with the smallest distance `d` from the priority queue.
    b.  If `d > dist[u]`, continue (this is an outdated entry for `u`).
    c.  For each neighbor `v` of `u` with edge weight `w`:
        i.  If `dist[u] + w < dist[v]`:
            1.  Update `dist[v] = dist[u] + w`.
            2.  Push `{dist[v], v}` to the priority queue.

**ASCII Diagram (Dijkstra's):**

```
Graph (weighted, directed):
    (0) --10--> (1)
     |           |
     3           1
     |           |
    (2) --4----> (1) (back-edge)
     | \         |
     8  2        2
     |   \       |
    (3) --5--> (4)

Dist: [0, inf, inf, inf, inf]
PQ: [{0,0}]

1. Pop {0,0}. u=0, d=0. dist[0]=0.
   Neighbors of 0: (1,w=10), (2,w=3)
   - Relax (0,1): dist[1]=min(inf, 0+10)=10. PQ.push({10,1})
   - Relax (0,2): dist[2]=min(inf, 0+3)=3. PQ.push({3,2})
Dist: [0, 10, 3, inf, inf]
PQ: [{3,2}, {10,1}]

2. Pop {3,2}. u=2, d=3. dist[2]=3.
   Neighbors of 2: (1,w=4), (3,w=8), (4,w=2)
   - Relax (2,1): dist[1]=min(10, 3+4)=7. PQ.push({7,1})
   - Relax (2,3): dist[3]=min(inf, 3+8)=11. PQ.push({11,3})
   - Relax (2,4): dist[4]=min(inf, 3+2)=5. PQ.push({5,4})
Dist: [0, 7, 3, 11, 5]
PQ: [{5,4}, {7,1}, {10,1 (old)}, {11,3}]

3. Pop {5,4}. u=4, d=5. dist[4]=5.
   Neighbors of 4: (none)
Dist: [0, 7, 3, 11, 5]
PQ: [{7,1}, {10,1 (old)}, {11,3}]

4. Pop {7,1}. u=1, d=7. dist[1]=7.
   Neighbors of 1: (2,w=1), (3,w=2)
   - Relax (1,2): dist[2]=min(3, 7+1)=3. No update (3 is already smaller).
   - Relax (1,3): dist[3]=min(11, 7+2)=9. PQ.push({9,3})
Dist: [0, 7, 3, 9, 5]
PQ: [{9,3}, {10,1 (old)}, {11,3 (old)}]

5. Pop {9,3}. u=3, d=9. dist[3]=9.
   Neighbors of 3: (4,w=5)
   - Relax (3,4): dist[4]=min(5, 9+5)=5. No update (5 is already smaller).
Dist: [0, 7, 3, 9, 5]
PQ: [{10,1 (old)}, {11,3 (old)}]

... (continue to process remaining old entries in PQ, which will be skipped)

Final Distances from 0: [0, 7, 3, 9, 5]
```

**Time Complexity:** O(E log V) using a binary heap (standard `std::priority_queue`).
*   Each of E edges is relaxed at most once. Each relaxation involves a priority queue `push` (O(log V)).
*   Each of V vertices is extracted from the priority queue at most once. Each `pop` (O(log V)).
**Space Complexity:** O(V + E) for storing distances, priority queue, and adjacency list.

**Edge Cases & Gotchas:**
*   **Negative edge weights:** Dijkstra's algorithm does **not** work correctly with negative edge weights. It might produce incorrect shortest paths. For graphs with negative weights (but no negative cycles), use Bellman-Ford.
*   **Disconnected graphs:** Dijkstra's will correctly find shortest paths to all reachable nodes from the source. Unreachable nodes will retain `infinity` distance.
*   **Directed vs. Undirected:** Works for both, but for undirected graphs, edges are typically added in both directions `(u,v)` and `(v,u)` to the adjacency list with the same weight.
*   **No path:** If a node is unreachable, its distance remains `infinity`.

**Interview Tips & Variations:**
*   Finding shortest path in weighted graphs with non-negative weights.
*   Used as a sub-routine in other algorithms (e.g., Johnson's all-pairs shortest path).
*   Variations involve finding k-shortest paths, shortest path with exactly k edges, etc.
*   Understand the difference and when to use Bellman-Ford (negative weights) or Floyd-Warshall (all-pairs).

---

## 3. Minimum Spanning Tree (Kruskal's Algorithm)

**Concept:**
A Minimum Spanning Tree (MST) for a connected, edge-weighted undirected graph is a subset of the edges that connects all the vertices together, without any cycles and with the minimum possible total edge weight.
Kruskal's algorithm is a greedy algorithm that finds an MST by iteratively adding the smallest-weight edges that do not form a cycle. It relies on a **Disjoint Set Union (DSU)** data structure to efficiently detect cycles.

**Steps:**
1.  Create a list of all edges in the graph. Each edge is represented as `{weight, u, v}`.
2.  Sort all edges in non-decreasing order of their weights.
3.  Initialize a **DSU** data structure where each vertex is in its own set.
4.  Initialize `mst_weight = 0` and `mst_edges` list.
5.  Iterate through the sorted edges:
    a.  For the current edge `{w, u, v}`:
        i.  If `u` and `v` are in different sets (checked using DSU's `find` operation):
            1.  Add `w` to `mst_weight`.
            2.  Add edge `{u, v}` to `mst_edges`.
            3.  Unite the sets of `u` and `v` (using DSU's `unite` operation).
6.  The algorithm stops when V-1 edges have been added to the MST (for a connected graph) or all edges have been processed.

**ASCII Diagram (Kruskal's):**

```
Graph (undirected, weighted):
   (0) --4-- (1)
   | \       | \
   8  11     8  7
   |   \     |   \
  (7) -1-- (6) --2-- (5)
   |   /   / \       /
   7  6   14  10    4
   | /   /      \  /
  (8) --2-- (2) --9-- (3)
              \  /
               9

Edges (sorted by weight):
(6,7,1)
(2,8,2) (5,6,2)
(0,1,4) (2,5,4)
(2,3,7) (7,8,7)
(1,2,8) (0,7,8)
(3,4,9) (2,4,9) (4,5,10) (1,7,11) (3,5,14)

DSU:
Initial: {0},{1},{2},{3},{4},{5},{6},{7},{8}

1. Edge (6,7,w=1):
   find(6)!=find(7) => True. Unite(6,7). mst_weight=1. MST: {(6,7)}
   DSU: {0},{1},{2},{3},{4},{5},{6,7},{8}

2. Edge (2,8,w=2):
   find(2)!=find(8) => True. Unite(2,8). mst_weight=1+2=3. MST: {(6,7),(2,8)}
   DSU: {0},{1},{6,7},{3},{4},{5},{2,8}

3. Edge (5,6,w=2):
   find(5)!=find(6) => True. Unite(5,6). mst_weight=3+2=5. MST: {(6,7),(2,8),(5,6)}
   DSU: {0},{1},{3},{4},{6,7,5},{2,8}

4. Edge (0,1,w=4):
   find(0)!=find(1) => True. Unite(0,1). mst_weight=5+4=9. MST: {(6,7),(2,8),(5,6),(0,1)}
   DSU: {0,1},{3},{4},{6,7,5},{2,8}

5. Edge (2,5,w=4):
   find(2)!=find(5) => True. Unite(2,5). mst_weight=9+4=13. MST: {(6,7),(2,8),(5,6),(0,1),(2,5)}
   DSU: {0,1},{3},{4},{6,7,5,2,8} (many connected here)

... continue for all 8 edges (V-1 edges for 9 vertices) ...

Final MST Weight: 37
Final MST Edges (example order): (6,7,1), (2,8,2), (5,6,2), (0,1,4), (2,5,4), (2,3,7), (7,8,7), (3,4,9)
```

**Time Complexity:** O(E log E) or O(E log V).
*   Sorting all edges: O(E log E). Since E can be at most V^2, log E is at most log V^2 = 2 log V. So E log E is roughly E log V for dense graphs, and E log E for sparse graphs where E << V^2.
*   DSU operations (find and unite): Amortized O(alpha(V)) per operation, where alpha is the inverse Ackermann function, which is practically a very small constant (less than 5 for any practical V). Total DSU operations for E edges is O(E * alpha(V)).
*   Overall, the sorting step usually dominates, making it O(E log E) or O(E log V).
**Space Complexity:** O(V + E) for storing edges, DSU arrays, and the MST result.

**Edge Cases & Gotchas:**
*   **Disconnected graphs:** Kruskal's will find a Minimum Spanning Forest (MSF), which is a set of MSTs for each connected component. The total weight will be the sum of weights of all these MSTs. If you strictly need an MST (i.e., the graph must be connected), you need to check if `V-1` edges were added.
*   **Empty graph/single node:** Handled by checks, MST weight is 0.
*   **Duplicate edge weights:** If multiple edges have the same weight, Kruskal's can pick any of them, leading to potentially different sets of edges in the MST, but the total weight will be the same.
*   **Directed graphs:** Kruskal's is inherently for undirected graphs. If given a directed graph, it's typically pre-processed to treat edges as undirected (e.g., by adding `(u,v,w)` and `(v,u,w)` for each edge).

**Interview Tips & Variations:**
*   Understand the DSU data structure (find, unite, path compression, union by rank/size).
*   Prim's algorithm is another MST algorithm, often preferred for dense graphs (O(E log V) with binary heap, O(E + V log V) with Fibonacci heap). Kruskal's is often simpler to implement and reason about.
*   Applications: network design, cluster analysis, image segmentation.
*   Variations: Bottleneck MST (find MST where max edge weight is minimized).

---

## 4. Topological Sort

**Concept:**
A topological sort (or topological ordering) of a Directed Acyclic Graph (DAG) is a linear ordering of its vertices such that for every directed edge `u -> v`, vertex `u` comes before `v` in the ordering. It's not unique for most graphs. A topological sort is only possible if and only if the graph has no directed cycles.

### A. Kahn's Algorithm (BFS-based)

**Concept:**
Kahn's algorithm is a BFS-based approach. It identifies vertices that have no incoming edges (in-degree of 0), adds them to the topological sort, and then "removes" them from the graph by decrementing the in-degree of their neighbors. This process continues until no more vertices with in-degree 0 can be found.

**Steps:**
1.  Compute the **in-degree** (number of incoming edges) for every vertex.
2.  Initialize a `queue` and add all vertices with an in-degree of `0`.
3.  Initialize an empty `topological_order` list and `visited_count = 0`.
4.  While the queue is not empty:
    a.  Dequeue a vertex `u`. Add `u` to `topological_order`. Increment `visited_count`.
    b.  For each neighbor `v` of `u`:
        i.  Decrement `in_degree[v]`.
        ii. If `in_degree[v]` becomes `0`, enqueue `v`.
5.  After the loop, if `visited_count` is less than `V` (total number of vertices), it means the graph contains a cycle and no topological sort is possible.

**ASCII Diagram (Kahn's Algorithm):**

```
Graph (DAG):
  5 --- 0
 / \   /
4 -- 2 --- 3 --- 1

In-degrees:
0: 2 (from 5, 4)
1: 2 (from 4, 3)
2: 1 (from 5)
3: 1 (from 2)
4: 0
5: 0

Initial Queue: [4, 5]
Order: []
Visited Count: 0

1. Dequeue 4. Add 4 to Order. Visited: 1.
   Neighbors of 4: 0, 1
   - in_degree[0]-- (now 1)
   - in_degree[1]-- (now 1)
   Queue: [5]
   Order: [4]

2. Dequeue 5. Add 5 to Order. Visited: 2.
   Neighbors of 5: 0, 2
   - in_degree[0]-- (now 0) -> Enqueue 0
   - in_degree[2]-- (now 0) -> Enqueue 2
   Queue: [0, 2]
   Order: [4, 5]

3. Dequeue 0. Add 0 to Order. Visited: 3.
   Neighbors of 0: (none)
   Queue: [2]
   Order: [4, 5, 0]

4. Dequeue 2. Add 2 to Order. Visited: 4.
   Neighbors of 2: 3
   - in_degree[3]-- (now 0) -> Enqueue 3
   Queue: [3]
   Order: [4, 5, 0, 2]

5. Dequeue 3. Add 3 to Order. Visited: 5.
   Neighbors of 3: 1
   - in_degree[1]-- (now 0) -> Enqueue 1
   Queue: [1]
   Order: [4, 5, 0, 2, 3]

6. Dequeue 1. Add 1 to Order. Visited: 6.
   Neighbors of 1: (none)
   Queue: []
   Order: [4, 5, 0, 2, 3, 1]

Final Order: [4, 5, 0, 2, 3, 1] (one possible order)
Visited Count == V, so no cycle.
```

**Time Complexity:** O(V + E).
*   Calculating in-degrees: O(V + E).
*   Each vertex is enqueued/dequeued once, and each edge is processed once when updating neighbor in-degrees.
**Space Complexity:** O(V) for in-degree array, queue, and result vector.

### B. DFS-based Topological Sort

**Concept:**
A DFS-based approach uses the fact that in a DAG, a vertex `u` should appear before `v` in the topological sort if there's an edge `u -> v`. This implies that `u` finishes its DFS exploration after `v` has finished (or at least `v` is processed and pushed to the stack before `u` if we use a stack). The topological sort is essentially the reverse of the finishing times of nodes in a DFS.

**Steps:**
1.  Create `visited` and `recursion_stack` arrays (or sets). `recursion_stack` helps detect cycles.
2.  Create an empty `stack` to store the topological order.
3.  Define a recursive helper function `dfs_util(u, adj, visited, recursion_stack, stack, has_cycle)`:
    a.  Mark `u` as visited and `recursion_stack[u] = true`.
    b.  For each neighbor `v` of `u`:
        i.  If `has_cycle` is true, return immediately.
        ii. If `v` is not visited, recursively call `dfs_util(v, ...)`.
        iii. Else if `recursion_stack[v]` is true, a back-edge (cycle) is detected. Set `has_cycle = true` and return.
    c.  Set `recursion_stack[u] = false`.
    d.  Push `u` onto the result stack.
4.  Iterate through all vertices `i` from `0` to `V-1`:
    a.  If `i` is not visited, call `dfs_util(i, ...)`. If `has_cycle` becomes true, stop and report a cycle.
5.  Pop elements from the result stack one by one to get the topological order.

**ASCII Diagram (DFS-based Topological Sort):**

```
Graph (DAG):
  5 --- 0
 / \   /
4 -- 2 --- 3 --- 1

Stack: []
Visited: []
Recursion Stack: []
has_cycle: false

DFS(0 to 5):
Start DFS from unvisited nodes:

DFS(5):
- Visit 5, RecStack[5]=T. Push 5 to order. (Not yet, push after all children)
  DFS(0): (from 5)
  - Visit 0, RecStack[0]=T.
    Neighbors of 0: (none)
    RecStack[0]=F. Push 0. Stack: [0]
  DFS(2): (from 5)
  - Visit 2, RecStack[2]=T.
    DFS(3): (from 2)
    - Visit 3, RecStack[3]=T.
      DFS(1): (from 3)
      - Visit 1, RecStack[1]=T.
        Neighbors of 1: (none)
        RecStack[1]=F. Push 1. Stack: [0, 1]
      RecStack[3]=F. Push 3. Stack: [0, 1, 3]
    RecStack[2]=F. Push 2. Stack: [0, 1, 3, 2]
  RecStack[5]=F. Push 5. Stack: [0, 1, 3, 2, 5]

DFS(4): (now unvisited)
- Visit 4, RecStack[4]=T.
  DFS(0): (from 4) - 0 is visited, not on RecStack. Skip.
  DFS(1): (from 4) - 1 is visited, not on RecStack. Skip.
  RecStack[4]=F. Push 4. Stack: [0, 1, 3, 2, 5, 4]

(Others are visited)

Pop from Stack: [4, 5, 2, 3, 1, 0] (example order)
Final Order: [4, 5, 2, 3, 1, 0] (reverse of finishing order, one possible result)
```

**Time Complexity:** O(V + E).
*   Each vertex and edge is visited once.
**Space Complexity:** O(V) for visited array, recursion stack, and result stack.

**Edge Cases & Gotchas:**
*   **Cycles:** Both algorithms correctly detect cycles. If a cycle is present, they will indicate that a topological sort is not possible by returning an empty list or throwing an error.
*   **Disconnected graphs:** Both algorithms handle disconnected components correctly by iterating through all vertices and initiating a traversal if a vertex hasn't been visited yet.
*   **Empty graph/single node:** Handled.
*   **Multiple valid orders:** Most DAGs have multiple valid topological sorts. Both algorithms produce *a* valid order, not necessarily the same one, and not necessarily the "lexicographically smallest" or any specific order without additional constraints.

**Interview Tips & Variations:**
*   **Cycle detection:** The `recursion_stack` in DFS-based topological sort is crucial for detecting cycles in directed graphs. Kahn's algorithm implicitly detects cycles by checking `visited_count`.
*   **Prerequisite problems:** Task scheduling, course scheduling, build system dependencies.
*   **Critical path analysis** in project management (PERT/CPM) uses topological sort.
*   Understanding the difference between the two approaches (BFS vs. DFS) and their characteristics.

---
```