```markdown
# Algorithm Explanations

This document provides a detailed breakdown of the graph algorithms implemented in this project, including their principles, time/space complexity, and visual ASCII diagrams.

---

## 1. Number of Islands (Connected Components)

**Problem:** Given a 2D binary grid, count the number of islands. An island is a group of connected '1's (land) surrounded by '0's (water). Connection is horizontal or vertical.

### Core Idea

The problem is a classic application of graph traversal algorithms (BFS or DFS) on a grid. Each '1' can be considered a node in an implicit graph, and adjacent '1's are connected by edges. When we find an unvisited '1', it signifies the discovery of a new island. We then traverse all connected '1's of this island, marking them as visited, to ensure they are not counted again.

### Approach 1: Breadth-First Search (BFS)

**Principle:** BFS explores all the neighbor nodes at the current depth level before moving on to the nodes at the next depth level. It uses a queue data structure.

**Algorithm Steps:**

1.  Initialize `islandCount = 0`.
2.  Iterate through each cell `(r, c)` of the grid.
3.  If `grid[r][c]` is '1':
    a.  Increment `islandCount`.
    b.  Start a BFS:
        i.  Mark `grid[r][c]` as '0' (visited).
        ii. Add `(r, c)` to a queue.
        iii. While the queue is not empty:
            -   Dequeue a cell `(currR, currC)`.
            -   For each of its four neighbors `(nR, nC)`:
                -   If `(nR, nC)` is within bounds and `grid[nR][nC]` is '1':
                    -   Mark `grid[nR][nC]` as '0'.
                    -   Enqueue `(nR, nC)`.
4.  Return `islandCount`.

**Time Complexity:** O(R \* C)
Each cell is visited at most once (by the outer loop, and then by BFS if it's land), and constant time operations are performed for each.
**Space Complexity:** O(R \* C)
In the worst case (grid full of land), the queue can hold up to all R\*C cells.

**Visual Diagram (BFS):**

```
Initial Grid:
1 1 0 0
0 1 1 0
0 0 0 1

1. Find (0,0) = '1'. Increment islands=1. Start BFS.
   Queue: [(0,0)]
   Mark (0,0) as '0'.

2. Dequeue (0,0). Neighbors: (0,1), (1,0). Both '1'.
   Mark (0,1) as '0'. Enqueue (0,1).
   Mark (1,0) as '0'. Enqueue (1,0).
   Grid:
   0 0 0 0
   0 0 1 0
   0 0 0 1
   Queue: [(0,1), (1,0)]

3. Dequeue (0,1). Neighbors: (0,0)-visited, (1,1). (1,1) is '1'.
   Mark (1,1) as '0'. Enqueue (1,1).
   Grid:
   0 0 0 0
   0 0 0 0
   0 0 0 1
   Queue: [(1,0), (1,1)]

4. Dequeue (1,0). Neighbors: (0,0)-visited, (1,1)-visited, (2,0)-water.
   Queue: [(1,1)]

5. Dequeue (1,1). Neighbors: (0,1)-visited, (1,0)-visited, (1,2). (1,2) is '1'.
   Mark (1,2) as '0'. Enqueue (1,2).
   Grid:
   0 0 0 0
   0 0 0 0
   0 0 0 1
   Queue: [(1,2)]

6. Dequeue (1,2). Neighbors: (1,1)-visited, (0,2)-water, (2,2)-water.
   Queue: []

7. BFS for first island complete. Grid scanned, find (2,3) = '1'.
   Increment islands=2. Start BFS.
   Queue: [(2,3)]
   Mark (2,3) as '0'.

8. Dequeue (2,3). Neighbors: (1,3)-water, (3,3)-water, (2,2)-water.
   Queue: []

9. BFS for second island complete. All cells scanned. Return islands = 2.
```

### Approach 2: Depth-First Search (DFS)

**Principle:** DFS explores as far as possible along each branch before backtracking. It naturally uses the call stack for recursion or an explicit stack for iteration.

**Algorithm Steps:**

1.  Initialize `islandCount = 0`.
2.  Iterate through each cell `(r, c)` of the grid.
3.  If `grid[r][c]` is '1':
    a.  Increment `islandCount`.
    b.  Call a `dfs(r, c)` helper function:
        i.  Base Case: If `(r, c)` is out of bounds or `grid[r][c]` is '0', return.
        ii. Mark `grid[r][c]` as '0' (visited).
        iii. Recursively call `dfs` for its four neighbors: `(r+1, c), (r-1, c), (r, c+1), (r, c-1)`.
4.  Return `islandCount`.

**Time Complexity:** O(R \* C)
Similar to BFS, each cell is visited at most once.
**Space Complexity:** O(R \* C)
In the worst case (grid full of land), the recursion stack depth can go up to R\*C.

**Visual Diagram (DFS):**

```
Initial Grid:
1 1 0 0
0 1 1 0
0 0 0 1

1. Find (0,0) = '1'. Increment islands=1. Call dfs(0,0).
   dfs(0,0):
     Mark (0,0) as '0'.
     dfs(1,0):
       Mark (1,0) as '0'.
       dfs(2,0): (out of bounds/water) -> return
       dfs(0,0): (visited) -> return
       dfs(1,1):
         Mark (1,1) as '0'.
         dfs(2,1): (out of bounds/water) -> return
         dfs(0,1):
           Mark (0,1) as '0'.
           dfs(1,1): (visited) -> return
           dfs(-1,1): (out of bounds) -> return
           dfs(0,2): (water) -> return
         dfs(1,2):
           Mark (1,2) as '0'.
           dfs(2,2): (water) -> return
           dfs(0,2): (water) -> return
           dfs(1,3): (water) -> return
         dfs(1,0): (visited) -> return
       dfs(1,-1): (out of bounds) -> return
     dfs(0,1): (visited) -> return
     dfs(-1,0): (out of bounds) -> return
     dfs(0,-1): (out of bounds) -> return
   dfs(0,0) returns.

   Grid after first island DFS:
   0 0 0 0
   0 0 0 0
   0 0 0 1

2. Scan grid, find (2,3) = '1'. Increment islands=2. Call dfs(2,3).
   dfs(2,3):
     Mark (2,3) as '0'.
     dfs(3,3): (out of bounds/water) -> return
     dfs(1,3): (water) -> return
     dfs(2,4): (out of bounds) -> return
     dfs(2,2): (water) -> return
   dfs(2,3) returns.

3. All cells scanned. Return islands = 2.
```

---

## 2. Dijkstra's Shortest Path Algorithm

**Problem:** Find the shortest path from a single source vertex to all other vertices in a weighted graph with non-negative edge weights.

### Core Idea

Dijkstra's algorithm is a greedy algorithm that finds the shortest path by iteratively selecting the unvisited vertex with the smallest known distance from the source, and then relaxing its edges. Relaxation means updating the distances to its neighbors if a shorter path is found through the current vertex. A Min-Priority Queue is crucial for efficiently selecting the next vertex.

### Algorithm Steps

1.  Initialize `distances` map: `distances[source] = 0`, all other `distances[v] = Infinity`.
2.  Initialize `paths` map: `paths[v] = null` for all `v`. This stores the predecessor for path reconstruction.
3.  Create a Min-Priority Queue and `enqueue(source, 0)`.
4.  While the priority queue is not empty:
    a.  Dequeue the vertex `u` with the smallest `priority` (which is its current shortest distance).
    b.  If the dequeued distance to `u` is greater than `distances[u]` (this can happen with lazy priority queue updates), continue to the next iteration (a shorter path to `u` has already been found and processed).
    c.  For each neighbor `v` of `u` with edge weight `w`:
        i.  Calculate `newDistance = distances[u] + w`.
        ii. If `newDistance < distances[v]`:
            -   Update `distances[v] = newDistance`.
            -   Set `paths[v] = u`.
            -   Enqueue `(v, newDistance)` into the priority queue.
5.  Return `distances` and `paths`.

**Time Complexity:** O(E log V) (using a binary heap)
-   Each vertex is dequeued once (V operations, each O(log V)).
-   Each edge is relaxed once (E operations, each involving priority queue `enqueue` or `decrease-key`, O(log V)).
**Space Complexity:** O(V + E)
-   `distances` and `paths` maps: O(V).
-   Priority queue: O(E) in worst case (if many redundant entries due to lazy updates), typically O(V).

**Visual Diagram (Dijkstra - conceptual flow):**

```
Graph: A --(4)--> B
       | \       /|
       (2)(9)   (3)
       |   \   /  |
       V    V /   V
       C --(2)--> D --(1)--> E

Start from A.

Initial:
Distances: {A:0, B:∞, C:∞, D:∞, E:∞}
Paths:     {A:null, B:null, C:null, D:null, E:null}
PQ:        [(A,0)]

1. Dequeue (A,0).
   Neighbors: B (dist 4), C (dist 2).
   Update B: dist=4, path=A. PQ.enqueue(B,4)
   Update C: dist=2, path=A. PQ.enqueue(C,2)
   Distances: {A:0, B:4, C:2, D:∞, E:∞}
   PQ:        [(C,2), (B,4)]

2. Dequeue (C,2).
   Neighbors: B (dist 2+10=12 > 4, skip), D (dist 2+2=4).
   Update D: dist=4, path=C. PQ.enqueue(D,4)
   Distances: {A:0, B:4, C:2, D:4, E:∞}
   PQ:        [(B,4), (D,4)]

3. Dequeue (B,4) (or D,4 - order might vary). Let's say B.
   Neighbors: D (dist 4+3=7 > 4, skip).
   Distances: {A:0, B:4, C:2, D:4, E:∞}
   PQ:        [(D,4)]

4. Dequeue (D,4).
   Neighbors: E (dist 4+1=5).
   Update E: dist=5, path=D. PQ.enqueue(E,5)
   Distances: {A:0, B:4, C:2, D:4, E:5}
   PQ:        [(E,5)]

5. Dequeue (E,5).
   Neighbors: None.
   Distances: {A:0, B:4, C:2, D:4, E:5}
   PQ:        [] (empty)

Resulting Shortest Distances from A:
A: 0
B: 4 (A -> B)
C: 2 (A -> C)
D: 4 (A -> C -> D)
E: 5 (A -> C -> D -> E)
```

---

## 3. Detect Cycle in a Directed Graph

**Problem:** Determine if a given directed graph contains a cycle.

### Core Idea

Cycle detection in a directed graph can be efficiently done using Depth-First Search (DFS) with a coloring scheme. We classify nodes into three states during the traversal:

1.  **White:** Node not yet visited.
2.  **Gray:** Node currently being visited (in the current DFS recursion stack).
3.  **Black:** Node completely visited (all its descendants have been explored and are black or gray).

A cycle is detected if, during a DFS traversal from a node `u`, we encounter a neighbor `v` that is currently in the **Gray** state. This means `v` is an ancestor of `u` in the current DFS path, and an edge `u -> v` forms a back-edge, closing a cycle.

### Algorithm Steps

1.  Initialize three sets: `visited` (for black nodes), `recursionStack` (for gray nodes).
2.  For each vertex `v` in the graph:
    a.  If `v` has not been added to `visited` (i.e., it's a white node, or part of a new component):
        i.  Call a recursive helper function `dfs(v)`.
        ii. If `dfs(v)` returns `true` (indicating a cycle), immediately return `true` from the main function.
3.  If the loop completes without finding any cycles, return `false`.

**`dfs(vertex)` Helper Function:**

1.  Add `vertex` to `recursionStack` (mark as gray).
2.  For each `neighbor` of `vertex`:
    a.  If `neighbor` is in `recursionStack`: **Cycle detected!** Return `true`.
    b.  If `neighbor` is NOT in `visited` (i.e., it's a white node):
        i.  Recursively call `dfs(neighbor)`.
        ii. If `dfs(neighbor)` returns `true`, propagate the cycle detection: return `true`.
3.  After exploring all neighbors, `vertex` is no longer in the current recursion path. Remove `vertex` from `recursionStack` (mark as no longer gray).
4.  Add `vertex` to `visited` (mark as black).
5.  Return `false` (no cycle found through this vertex's path).

**Time Complexity:** O(V + E)
Each vertex is visited by DFS once, and each edge is traversed once.
**Space Complexity:** O(V)
`visited` and `recursionStack` sets store up to V vertices. The recursion call stack can go up to V depth.

**Visual Diagram (Cycle Detection):**

```
Graph: A -> B
       ^    |
       |    V
       C <- D

States:
White: Not visited
Gray:  Visiting (in current DFS path)
Black: Visited (DFS path completed)

Initial:
White: {A,B,C,D}
Gray:  {}
Black: {}

Start DFS from A:
dfs(A):
  Gray: {A}
  Neighbors of A: B
  dfs(B):
    Gray: {A,B}
    Neighbors of B: D
    dfs(D):
      Gray: {A,B,D}
      Neighbors of D: C
      dfs(C):
        Gray: {A,B,D,C}
        Neighbors of C: A
        A is in Gray! -> CYCLE DETECTED (C -> A is a back-edge)
        Return true from dfs(C)
      Return true from dfs(D)
    Return true from dfs(B)
  Return true from dfs(A)

Result: Cycle Detected.
```

---

## 4. Topological Sort

**Problem:** Given a Directed Acyclic Graph (DAG), produce a linear ordering of its vertices such that for every directed edge `u -> v`, vertex `u` comes before `v` in the ordering. (If the graph has a cycle, topological sort is not possible).

### Core Idea

Topological sort is used for scheduling tasks, resolving dependencies, etc. There are two primary algorithms: Kahn's Algorithm (BFS-based) and a DFS-based approach. Both rely on the fact that in a DAG, there must be at least one vertex with an in-degree of 0 (no incoming edges) and at least one vertex with an out-degree of 0 (no outgoing edges).

### Approach 1: Kahn's Algorithm (BFS-based)

**Principle:** Iteratively identify and remove vertices that have no incoming edges. These vertices can be placed first in the topological order.

**Algorithm Steps:**

1.  Calculate the in-degree for every vertex in the graph.
2.  Initialize a queue and add all vertices with an in-degree of 0 to it.
3.  Initialize an empty list `topologicalOrder`.
4.  While the queue is not empty:
    a.  Dequeue a vertex `u`.
    b.  Add `u` to `topologicalOrder`.
    c.  For each neighbor `v` of `u`:
        i.  Decrement the in-degree of `v`.
        ii. If `v`'s in-degree becomes 0, enqueue `v`.
5.  After the loop, compare the number of vertices in `topologicalOrder` with the total number of vertices in the graph. If they don't match, it means a cycle was present, and a topological sort is not possible.

**Time Complexity:** O(V + E)
-   Calculating in-degrees: O(V + E).
-   BFS traversal: Each vertex enqueued/dequeued once, each edge processed once.
**Space Complexity:** O(V)
-   `inDegrees` map: O(V).
-   Queue: O(V).
-   `topologicalOrder` list: O(V).

**Visual Diagram (Kahn's Algorithm):**

```
Graph: (5) -> (11) -> (2)
       |      |
       V      V
      (10)   (9)
       ^      ^
       |      |
      (3) -> (8)
       ^
       |
      (7) (isolated for now)

1. Calculate In-degrees:
   2: 1 (from 11)
   3: 0
   5: 0
   7: 0
   8: 1 (from 3)
   9: 2 (from 8, 11)
   10: 2 (from 5, 3, 11)
   11: 2 (from 5, 7)

2. Initialize Queue: Add nodes with in-degree 0: [3, 5, 7] (order might vary)
   Topological Order: []

3. Dequeue 3. Add to order: [3]
   Neighbors of 3: 8, 10
   Decrement in-degree[8] (to 0). Enqueue 8.
   Decrement in-degree[10] (to 1).
   Queue: [5, 7, 8]

4. Dequeue 5. Add to order: [3, 5]
   Neighbors of 5: 11, 10
   Decrement in-degree[11] (to 1).
   Decrement in-degree[10] (to 0). Enqueue 10.
   Queue: [7, 8, 10]

5. Dequeue 7. Add to order: [3, 5, 7]
   Neighbors of 7: 11
   Decrement in-degree[11] (to 0). Enqueue 11.
   Queue: [8, 10, 11]

6. Dequeue 8. Add to order: [3, 5, 7, 8]
   Neighbors of 8: 9
   Decrement in-degree[9] (to 1).
   Queue: [10, 11]

7. Dequeue 10. Add to order: [3, 5, 7, 8, 10]
   Neighbors of 10: None
   Queue: [11]

8. Dequeue 11. Add to order: [3, 5, 7, 8, 10, 11]
   Neighbors of 11: 2, 9, 10
   Decrement in-degree[2] (to 0). Enqueue 2.
   Decrement in-degree[9] (to 0). Enqueue 9.
   Decrement in-degree[10] (already 0).
   Queue: [2, 9]

9. Dequeue 2. Add to order: [3, 5, 7, 8, 10, 11, 2]
   Neighbors of 2: None
   Queue: [9]

10. Dequeue 9. Add to order: [3, 5, 7, 8, 10, 11, 2, 9]
    Neighbors of 9: None
    Queue: []

Final Topological Order: [3, 5, 7, 8, 10, 11, 2, 9] (one possible valid order)
```

### Approach 2: DFS-based Topological Sort

**Principle:** Perform a DFS traversal. When a DFS call returns for a vertex `u` (meaning all its descendants have been visited), add `u` to the *front* of the topological order list. This ensures that a vertex appears before any of its descendants. Cycle detection is necessary to guarantee it's a DAG.

**Algorithm Steps:**

1.  Initialize an empty list `topologicalOrder`.
2.  Initialize `visited` set (for black nodes, fully processed) and `recursionStack` set (for gray nodes, currently in DFS path, for cycle detection).
3.  For each vertex `v` in the graph:
    a.  If `v` has not been added to `visited`:
        i.  Call a recursive helper function `dfs(v)`.
            (This `dfs` function will handle cycle detection and add vertices to `topologicalOrder`).

**`dfs(vertex)` Helper Function:**

1.  Add `vertex` to `recursionStack`. (Mark as gray).
2.  For each `neighbor` of `vertex`:
    a.  If `neighbor` is in `recursionStack`: **Cycle detected!** Throw an error.
    b.  If `neighbor` is NOT in `visited` (i.e., white node):
        i.  Recursively call `dfs(neighbor)`.
3.  After exploring all neighbors and their subgraphs:
    a.  Remove `vertex` from `recursionStack`. (Mark as no longer gray).
    b.  Add `vertex` to `visited`. (Mark as black, fully processed).
    c.  Prepend `vertex` to `topologicalOrder`. (This is the key step: it ensures `vertex` comes before its dependencies).

**Time Complexity:** O(V + E)
Each vertex and edge is visited once during DFS.
**Space Complexity:** O(V)
`visited` and `recursionStack` sets store up to V vertices. The recursion call stack can go up to V depth. `topologicalOrder` list stores V entries.

**Visual Diagram (DFS-based Topological Sort):**

```
Graph: A -> B
       |    |
       V    V
       C -> D

Initial:
Topological Order: []
Visited:   {}
RecStack:  {}

Vertices (assume alphabetical order for DFS starting points): A, B, C, D

Start DFS from A:
dfs(A):
  RecStack: {A}
  Neighbors of A: B, C
  dfs(B):
    RecStack: {A,B}
    Neighbors of B: D
    dfs(D):
      RecStack: {A,B,D}
      Neighbors of D: None
      Remove D from RecStack. Add D to Visited.
      Add D to front of Topological Order: [D]
      Returns.
    Remove B from RecStack. Add B to Visited.
    Add B to front of Topological Order: [B, D]
    Returns.
  dfs(C):
    RecStack: {A,C}
    Neighbors of C: D
    D is in Visited -> skip
    Remove C from RecStack. Add C to Visited.
    Add C to front of Topological Order: [C, B, D]
    Returns.
  Remove A from RecStack. Add A to Visited.
  Add A to front of Topological Order: [A, C, B, D]
  Returns.

All vertices visited.

Final Topological Order: [A, C, B, D] (one possible valid order)
```
```
Note: The DFS order depends on the iteration order of neighbors. If C was processed before B from A, the result might be [A, B, C, D]. Both are valid.
```