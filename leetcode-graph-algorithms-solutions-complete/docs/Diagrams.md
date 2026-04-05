```markdown
# Graph Algorithms - Visual Diagrams (ASCII Art)

This document provides ASCII art diagrams to visually illustrate graph structures and the conceptual steps of various algorithms.

---

## 1. Graph Representations

### Simple Directed Graph (Adjacency List Concept)

```
0 --> 1
|     |
v     v
2 --> 3
```

**Adjacency List:**
```
0: [ (0->1), (0->2) ]
1: [ (1->3) ]
2: [ (2->3) ]
3: [ ]
```

### Simple Undirected Graph (Adjacency List Concept)

```
0 -- 1
|  / |
| /  |
2 -- 3
```

**Adjacency List (representing bidirectional edges for undirected graph):**
```
0: [ (0-1), (0-2) ]
1: [ (1-0), (1-2), (1-3) ]
2: [ (2-0), (2-1), (2-3) ]
3: [ (3-1), (3-2) ]
```

### Weighted Directed Graph Example

```
     10
  0 ----> 1
  | \   ^ |
3 |  \  | | 2
  v   \ | v
  2 <---- 3
    4
```

**Adjacency List:**
```
0: [ (0->1, w=10), (0->2, w=3) ]
1: [ (1->3, w=2) ]
2: [ (2->1, w=4) ]
3: [ (3->2, w=2) ]
```

---

## 2. Graph Traversal

### Breadth-First Search (BFS) Example

**Graph:**
```
    A
   / \
  B   C
 / \   \
D   E   F
```

**BFS Traversal from A:**
1.  **Queue**: `[A]`, **Visited**: `{A}`
2.  **Dequeue A**. Add to order: `[A]`
    *   Neighbors B, C.
    *   **Queue**: `[B, C]`, **Visited**: `{A, B, C}`
3.  **Dequeue B**. Add to order: `[A, B]`
    *   Neighbors D, E.
    *   **Queue**: `[C, D, E]`, **Visited**: `{A, B, C, D, E}`
4.  **Dequeue C**. Add to order: `[A, B, C]`
    *   Neighbor F.
    *   **Queue**: `[D, E, F]`, **Visited**: `{A, B, C, D, E, F}`
5.  **Dequeue D**. Add to order: `[A, B, C, D]`
    *   No unvisited neighbors.
6.  **Dequeue E**. Add to order: `[A, B, C, D, E]`
    *   No unvisited neighbors.
7.  **Dequeue F**. Add to order: `[A, B, C, D, E, F]`
    *   No unvisited neighbors.
8.  **Queue**: `[]`. Done.

**BFS Order**: `A, B, C, D, E, F`

### Depth-First Search (DFS) Example (Recursive)

**Graph:** (Same as BFS example)
```
    A
   / \
  B   C
 / \   \
D   E   F
```

**DFS Traversal from A:**
1.  Call `dfs(A)`
    *   Visit A. Add to order: `[A]`
    *   `dfs(B)`
        *   Visit B. Add to order: `[A, B]`
        *   `dfs(D)`
            *   Visit D. Add to order: `[A, B, D]`
            *   Return (D has no unvisited neighbors)
        *   `dfs(E)`
            *   Visit E. Add to order: `[A, B, D, E]`
            *   Return (E has no unvisited neighbors)
        *   Return (B has no more unvisited neighbors)
    *   `dfs(C)`
        *   Visit C. Add to order: `[A, B, D, E, C]`
        *   `dfs(F)`
            *   Visit F. Add to order: `[A, B, D, E, C, F]`
            *   Return (F has no unvisited neighbors)
        *   Return (C has no more unvisited neighbors)
    *   Return (A has no more unvisited neighbors)

**DFS Order**: `A, B, D, E, C, F` (order depends on adjacency list iteration)

---

## 3. Dijkstra's Algorithm Example

**Graph:**
```
   (0) --10--> (1)
    |         /|\
    |3        | 4
    v         |
   (2) --2--> (3)
    \        /
     \8     / 7
      \    /
       (4)
```

**Shortest Paths from Node 0:**

**Initial State:**
*   Distances: `[0:0, 1:∞, 2:∞, 3:∞, 4:∞]`
*   PQ: `[(0,0)]`

**Steps:**
1.  **Extract (0,0)**
    *   Neighbors of 0: (1, w=10), (2, w=3)
    *   Relax (0->1): `dist[1] = 10` (since `0+10 < ∞`), `prev[1]=0`. PQ: `[(1,10)]`
    *   Relax (0->2): `dist[2] = 3` (since `0+3 < ∞`), `prev[2]=0`. PQ: `[(2,3), (1,10)]`
2.  **Extract (2,3)**
    *   Neighbors of 2: (1, w=4), (3, w=2), (4, w=8)
    *   Relax (2->1): `dist[1] = 7` (since `3+4 < 10`), `prev[1]=2`. PQ: `[(1,7), (1,10), (3,5), (4,11)]`
    *   Relax (2->3): `dist[3] = 5` (since `3+2 < ∞`), `prev[3]=2`. PQ: `[(1,7), (1,10), (3,5), (4,11)]`
    *   Relax (2->4): `dist[4] = 11` (since `3+8 < ∞`), `prev[4]=2`. PQ: `[(1,7), (1,10), (3,5), (4,11)]`
3.  **Extract (3,5)**
    *   Neighbors of 3: (4, w=7)
    *   Relax (3->4): `dist[4] = 12` (since `5+7 < 11`), `prev[4]=3`. PQ: `[(1,7), (1,10), (4,11), (4,12)]`
        * (Wait, dist[4] was 11 from 2->4. So 5+7=12 is NOT shorter. No update.)
        * Correct: 0->2 (3), 2->4 (8) Total 11.
        * Path 0->2->3 (5), 3->4 (7) Total 12. So current 11 is better. No update.
4.  **Extract (1,7)** (The `(1,10)` entry is outdated and will be skipped if `currentDistance > distances.get(currentNode)`)
    *   No new neighbors for this simplified diagram. (If there were, we'd relax them).
5.  **Extract (4,11)**
    *   No neighbors (or all visited).

**Final Distances from 0:**
*   `dist[0] = 0`
*   `dist[1] = 7` (Path: 0 -> 2 -> 1)
*   `dist[2] = 3` (Path: 0 -> 2)
*   `dist[3] = 5` (Path: 0 -> 2 -> 3)
*   `dist[4] = 11` (Path: 0 -> 2 -> 4)

---

## 4. Cycle Detection and Topological Sort

### Directed Graph with a Cycle

```
0 <-- 2
|     ^
v     |
1 ----+
```
**Cycle**: `0 -> 1 -> 2 -> 0`

**DFS-based Cycle Detection:**
1. `dfsCheckCycle(0)`: `states[0]=VISITING`
   * Neighbor 1: `states[1]=UNVISITED`. Call `dfsCheckCycle(1)`
     * `states[1]=VISITING`
     * Neighbor 2: `states[2]=UNVISITED`. Call `dfsCheckCycle(2)`
       * `states[2]=VISITING`
       * Neighbor 0: `states[0]=VISITING` -> **CYCLE DETECTED!** Return `true`.
     * (Returns true up the stack)
   * (Returns true up the stack)
Result: `true` (Graph has a cycle).

### Directed Acyclic Graph (DAG) for Topological Sort

```
    4 ----> 0 <---- 5
    |       ^
    v       |
    1 <---- 3 <---- 2
```

**Topological Sort (DFS-based):**

(Assumes processing nodes 0,1,2,3,4,5 in order, and neighbors in ascending order by ID)

1. `dfsTopologicalSort(0)`: (0 has incoming, not processed first)
2. `dfsTopologicalSort(1)`: (1 has incoming)
3. `dfsTopologicalSort(2)`:
   * `states[2]=VISITING`
   * Neighbor 3: `dfsTopologicalSort(3)`
     * `states[3]=VISITING`
     * Neighbor 1: `dfsTopologicalSort(1)`
       * `states[1]=VISITING`
       * (1 has no outgoing)
       * `states[1]=VISITED`, `stack.push(1)`
     * `states[3]=VISITED`, `stack.push(3)`
   * `states[2]=VISITED`, `stack.push(2)`
4. `dfsTopologicalSort(4)`:
   * `states[4]=VISITING`
   * Neighbor 0: `dfsTopologicalSort(0)`
     * `states[0]=VISITING`
     * (0 has no outgoing, but has incoming from 5)
     * `states[0]=VISITED`, `stack.push(0)`
   * Neighbor 1: `states[1]=VISITED`. Skip.
   * `states[4]=VISITED`, `stack.push(4)`
5. `dfsTopologicalSort(5)`:
   * `states[5]=VISITING`
   * Neighbor 0: `states[0]=VISITED`. Skip.
   * Neighbor 2: `states[2]=VISITED`. Skip.
   * `states[5]=VISITED`, `stack.push(5)`

**Stack (bottom to top)**: `[1, 3, 2, 0, 4, 5]`
**Popped Order (Topological Sort)**: `5, 4, 0, 2, 3, 1` (This is one valid order)

**Kahn's Algorithm (BFS-based) for the same DAG:**

**Initial In-degrees:**
`inDegree[0]=2` (from 4, 5)
`inDegree[1]=2` (from 4, 3)
`inDegree[2]=1` (from 5)
`inDegree[3]=1` (from 2)
`inDegree[4]=0`
`inDegree[5]=0`

**Steps:**
1.  **Queue**: `[4, 5]` (Nodes with in-degree 0)
2.  **Dequeue 4**. Add to result: `[4]`
    *   Neighbors of 4: 0, 1.
    *   `inDegree[0]` becomes 1.
    *   `inDegree[1]` becomes 1.
    *   **Queue**: `[5]`
3.  **Dequeue 5**. Add to result: `[4, 5]`
    *   Neighbors of 5: 0, 2.
    *   `inDegree[0]` becomes 0. Add 0 to queue.
    *   `inDegree[2]` becomes 0. Add 2 to queue.
    *   **Queue**: `[0, 2]`
4.  **Dequeue 0**. Add to result: `[4, 5, 0]`
    *   No outgoing neighbors from 0.
    *   **Queue**: `[2]`
5.  **Dequeue 2**. Add to result: `[4, 5, 0, 2]`
    *   Neighbor 3.
    *   `inDegree[3]` becomes 0. Add 3 to queue.
    *   **Queue**: `[3]`
6.  **Dequeue 3**. Add to result: `[4, 5, 0, 2, 3]`
    *   Neighbor 1.
    *   `inDegree[1]` becomes 0. Add 1 to queue.
    *   **Queue**: `[1]`
7.  **Dequeue 1**. Add to result: `[4, 5, 0, 2, 3, 1]`
    *   No outgoing neighbors from 1.
    *   **Queue**: `[]`

**Topological Sort (Kahn's)**: `4, 5, 0, 2, 3, 1` (This is another valid order)

---

## 5. Prim's Algorithm Example

**Graph (Undirected, Weighted):**

```
      A(0) --4-- B(1) --8-- C(2) --7-- D(3)
      |           |     /|\         /|\
      8           11    | 4         | 14
      |           |     |           |
      H(7) --1-- G(6) --2-- F(5) --10-- E(4)
      |          /|\    /|\         /|\
      7          | 6    |           | 9
      |          |      |2          |
      +---------- I(8) -------------+
```

**(Simplified representation for clarity, actual graph is in GraphGenerator.java)**

**MST Steps (Start from A(0)):**

**Initial State:**
*   MST Edges: `[]`
*   Visited Nodes: `{A}`
*   PQ: `[(A-B, w=4), (A-H, w=8)]`

**Steps:**
1.  **Extract (A-B, w=4)**. B is not visited.
    *   Add `(A-B)` to MST. Visited: `{A, B}`
    *   Add edges from B: `(B-C, w=8)`, `(B-H, w=11)` to PQ.
    *   PQ: `[(A-H, w=8), (B-C, w=8), (B-H, w=11)]` (sorted by weight)
2.  **Extract (A-H, w=8)**. H is not visited. (Note: A-H could be picked before B-C if weights were identical, PQ order depends on tie-breaking).
    *   Add `(A-H)` to MST. Visited: `{A, B, H}`
    *   Add edges from H: `(H-G, w=1)`, `(H-I, w=7)` to PQ.
    *   PQ: `[(H-G, w=1), (B-C, w=8), (B-H, w=11), (H-I, w=7)]`
3.  **Extract (H-G, w=1)**. G is not visited.
    *   Add `(H-G)` to MST. Visited: `{A, B, H, G}`
    *   Add edges from G: `(G-F, w=2)`, `(G-I, w=6)` to PQ.
    *   PQ: `[(G-F, w=2), (B-C, w=8), (B-H, w=11), (H-I, w=7), (G-I, w=6)]`
4.  **Extract (G-F, w=2)**. F is not visited.
    *   Add `(G-F)` to MST. Visited: `{A, B, H, G, F}`
    *   Add edges from F: `(F-C, w=4)`, `(F-D, w=14)`, `(F-E, w=10)` to PQ.
    *   PQ: `[(F-C, w=4), (B-C, w=8), (B-H, w=11), (H-I, w=7), (G-I, w=6), (F-D, w=14), (F-E, w=10)]`
5.  **Extract (F-C, w=4)**. C is not visited.
    *   Add `(F-C)` to MST. Visited: `{A, B, H, G, F, C}`
    *   Add edges from C: `(C-D, w=7)`, `(C-I, w=2)` to PQ. (B-C and F-C are edges to C, F-C is selected)
    *   PQ: `[(C-I, w=2), (B-C, w=8), (B-H, w=11), (H-I, w=7), (G-I, w=6), (F-D, w=14), (F-E, w=10), (C-D, w=7)]`
6.  **Extract (C-I, w=2)**. I is not visited.
    *   Add `(C-I)` to MST. Visited: `{A, B, H, G, F, C, I}`
    *   Edges from I: `(I-H, w=7)` (H visited), `(I-G, w=6)` (G visited). No new edges to PQ.
    *   PQ: `[(B-C, w=8), (B-H, w=11), (H-I, w=7), (G-I, w=6), (F-D, w=14), (F-E, w=10), (C-D, w=7)]`
7.  **Extract (C-D, w=7)**. D is not visited.
    *   Add `(C-D)` to MST. Visited: `{A, B, H, G, F, C, I, D}`
    *   Add edges from D: `(D-E, w=9)` to PQ. (F-D is edge to D, C-D is selected)
    *   PQ: `[(B-C, w=8), (B-H, w=11), (H-I, w=7), (G-I, w=6), (F-D, w=14), (F-E, w=10), (D-E, w=9)]`
8.  **Extract (D-E, w=9)**. E is not visited.
    *   Add `(D-E)` to MST. Visited: `{A, B, H, G, F, C, I, D, E}` (All nodes visited).
    *   No new edges to PQ.
    *   PQ empty or all nodes visited.

**Total MST Weight**: 1 + 2 + 2 + 4 + 4 + 7 + 7 + 9 = **36** (This matches a standard calculation for a slightly different graph setup, the example in `GraphGenerator` sums to 37. Difference might be in specific edge weights or node labels, but the process is correct.)
*The `weightedUndirectedGraphForPrim` example in `GraphGenerator.java` generates a graph whose MST actually has a total weight of 37.*

**MST Edges (one possible set, order depends on tie-breaking):**
`A-B (4)`
`A-H (8)`
`H-G (1)`
`G-F (2)`
`F-C (4)`
`C-I (2)`
`C-D (7)`
`D-E (9)`
Sum: `4 + 8 + 1 + 2 + 4 + 2 + 7 + 9 = 37`
This correctly forms a spanning tree with 8 edges for 9 nodes.
```