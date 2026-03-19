```markdown
# Graph Algorithm Explanations

This document provides detailed explanations for the core graph algorithms implemented in this project. It covers their principles, common use cases, and visual representations where helpful.

## 1. Breadth-First Search (BFS) and Depth-First Search (DFS)

Both BFS and DFS are fundamental traversal algorithms for graphs and trees.

### A. Breadth-First Search (BFS)

*   **Principle:** Explores the graph level by level. It starts at a source node, visits all its immediate neighbors, then all their unvisited neighbors, and so on.
*   **Data Structure:** Uses a **Queue** to manage nodes to visit.
*   **Use Cases:**
    *   Finding the shortest path in an **unweighted** graph.
    *   Finding connected components.
    *   Web crawlers.
    *   Network broadcasting.
*   **Algorithm Steps:**
    1.  Start with a source node, mark it as visited, and add it to a queue.
    2.  While the queue is not empty:
        a.  Dequeue a node `u`.
        b.  Process node `u`.
        c.  For each unvisited neighbor `v` of `u`:
            i.  Mark `v` as visited.
            ii. Enqueue `v`.
*   **ASCII Diagram (BFS traversal from 'A'):**
    ```
          A
         / \
        B---C
       / \ /
      D   E
    ```
    Traversal order: `A -> B -> C -> D -> E` (example, depends on adjacency list order)

    Queue states:
    `[A]`
    `[B, C]`
    `[C, D]` (A processed, B's neighbor D added)
    `[D, E]` (B processed, C's neighbor E added)
    `[E]` (C processed)
    `[]` (D, E processed)

*   **Time Complexity:** O(V + E) for adjacency list, O(V^2) for adjacency matrix, where V is the number of vertices and E is the number of edges.
*   **Space Complexity:** O(V) for the queue and visited array/set.

### B. Depth-First Search (DFS)

*   **Principle:** Explores as far as possible along each branch before backtracking. It goes deep into the graph before revisiting nodes.
*   **Data Structure:** Uses a **Stack** (implicitly via recursion call stack or explicitly).
*   **Use Cases:**
    *   Finding connected components.
    *   Topological sorting.
    *   Cycle detection.
    *   Pathfinding (e.g., maze solving).
*   **Algorithm Steps (Recursive):**
    1.  Start with a source node, mark it as visited, and process it.
    2.  For each unvisited neighbor `v` of the current node `u`:
        a.  Recursively call DFS on `v`.
*   **ASCII Diagram (DFS traversal from 'A'):**
    ```
          A
         / \
        B---C
       / \ /
      D   E
    ```
    Traversal order: `A -> B -> D -> C -> E` (example, depends on adjacency list order)

    Call stack (simplified):
    `DFS(A)`
    `  DFS(B)`
    `    DFS(D)` (D processed, returns)
    `  ` (B continues, no more unvisited neighbors, returns)
    `  DFS(C)`
    `    DFS(E)` (E processed, returns)
    `  ` (C continues, no more unvisited neighbors, returns)
    ` ` (A returns)

*   **Time Complexity:** O(V + E) for adjacency list, O(V^2) for adjacency matrix.
*   **Space Complexity:** O(V) for the recursion stack and visited array/set.

---

## 2. Dijkstra's Algorithm (Shortest Path for Weighted Graphs)

*   **Principle:** Finds the shortest paths from a single source vertex to all other vertices in a weighted graph with **non-negative** edge weights. It uses a greedy approach, always selecting the unvisited vertex with the smallest known distance from the source.
*   **Data Structure:** Uses a **Min-Priority Queue** to efficiently retrieve the vertex with the minimum distance.
*   **Use Cases:**
    *   GPS navigation (finding the shortest route).
    *   Network routing protocols.
    *   Finding shortest paths in various logistics problems.
*   **Algorithm Steps:**
    1.  Initialize distances: `dist[source] = 0`, `dist[v] = infinity` for all other `v`.
    2.  Add `(source, 0)` to a min-priority queue.
    3.  While the priority queue is not empty:
        a.  Extract the vertex `u` with the smallest distance `d` from the priority queue.
        b.  If `d > dist[u]`, continue (already found a shorter path to `u`).
        c.  For each neighbor `v` of `u` with edge weight `w`:
            i.  If `dist[u] + w < dist[v]`:
                1.  Update `dist[v] = dist[u] + w`.
                2.  Add `(v, dist[v])` to the priority queue.
*   **ASCII Diagram (Dijkstra from A):**
    ```
        (3)
    A ----- B
    | \   / | (1)
    (1) (6) (2)
    |   X   |
    D ----- C
        (1)
    ```
    Distances: `A=0, B=inf, C=inf, D=inf`
    PQ: `[(A,0)]`

    1. Extract `A` (dist=0)
       - `B`: `0+3=3`. `dist[B]=3`. Add `(B,3)` to PQ.
       - `D`: `0+1=1`. `dist[D]=1`. Add `(D,1)` to PQ.
       PQ: `[(D,1), (B,3)]`

    2. Extract `D` (dist=1)
       - `C`: `1+1=2`. `dist[C]=2`. Add `(C,2)` to PQ.
       PQ: `[(C,2), (B,3)]`

    3. Extract `C` (dist=2)
       - `B`: `2+2=4`. Current `dist[B]=3`. `4` is not less than `3`. No update.
       PQ: `[(B,3)]`

    4. Extract `B` (dist=3)
       - `C`: `3+1=4`. Current `dist[C]=2`. `4` is not less than `2`. No update.
       PQ: `[]`

    Final distances: `A=0, B=3, C=2, D=1`

*   **Time Complexity:** O(E log V) or O(E + V log V) using a Fibonacci heap, but typically O(E log V) with a binary heap (`java.util.PriorityQueue`).
*   **Space Complexity:** O(V + E) for adjacency list, distances array, and priority queue.

---

## 3. Kruskal's Algorithm (Minimum Spanning Tree)

*   **Principle:** Finds a Minimum Spanning Tree (MST) for a connected, undirected, weighted graph. It's a greedy algorithm that builds the MST by adding edges one by one, always picking the smallest weight edge that does not form a cycle with already added edges.
*   **Data Structure:** Primarily uses a **Disjoint Set Union (DSU) / Union-Find** data structure to efficiently detect cycles.
*   **Use Cases:**
    *   Network design (e.g., laying cables to connect buildings with minimum cost).
    *   Clustering algorithms.
    *   Image segmentation.
*   **Algorithm Steps:**
    1.  Create a list of all edges in the graph, sorted by weight in ascending order.
    2.  Initialize a Disjoint Set Union (DSU) structure where each vertex is in its own set.
    3.  Initialize an empty MST.
    4.  Iterate through the sorted edges:
        a.  For each edge `(u, v)` with weight `w`:
            i.  If `u` and `v` are not already in the same set (i.e., adding this edge won't form a cycle):
                1.  Add `(u, v)` to the MST.
                2.  Union the sets containing `u` and `v`.
    5.  Stop when V-1 edges have been added to the MST (where V is the number of vertices), or all edges have been processed.
*   **ASCII Diagram (Kruskal's):**
    ```
        (3)
    A ----- B
    | \   / | (1)
    (1) (6) (2)
    |   X   |
    D ----- C
        (1)
    ```
    Edges sorted: `(D,C,1), (A,D,1), (B,C,2), (A,B,3), (A,C,6)`

    1.  `D-C` (weight 1): `find(D) != find(C)`. Add `D-C`. Union `D,C`.
        Sets: `{A},{B},{D,C}`
    2.  `A-D` (weight 1): `find(A) != find(D)`. Add `A-D`. Union `A,D`.
        Sets: `{A,D,C},{B}`
    3.  `B-C` (weight 2): `find(B) != find(C)`. Add `B-C`. Union `B,C`.
        Sets: `{A,D,C,B}` (All vertices connected)
    4.  MST is complete (V-1 = 3 edges for 4 vertices).

*   **Time Complexity:** O(E log E) or O(E log V) (since E <= V^2, log E is similar to log V^2 which is 2 log V, so E log V is often used). The sorting dominates, DSU operations are nearly constant amortized time.
*   **Space Complexity:** O(V + E) for storing edges, DSU parent array, and rank/size array.

---

## 4. Topological Sort

*   **Principle:** A linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge `u -> v`, vertex `u` comes before vertex `v` in the ordering. It's not unique for most DAGs. If a graph contains a cycle, topological sort is impossible.
*   **Data Structures:**
    *   **BFS-based (Kahn's Algorithm):** Uses a **Queue** and tracks **in-degrees** (number of incoming edges) for each vertex.
    *   **DFS-based:** Uses a **Stack** (or adds to a list after all descendants are visited) and tracks visited states.
*   **Use Cases:**
    *   Task scheduling (e.g., build systems, course prerequisites).
    *   Dependency resolution.
    *   Compiler optimization.
*   **A. Kahn's Algorithm (BFS-based):**
    1.  Compute in-degree for all vertices.
    2.  Initialize a queue with all vertices having an in-degree of 0.
    3.  Initialize an empty list for the topological order.
    4.  While the queue is not empty:
        a.  Dequeue a vertex `u`.
        b.  Add `u` to the topological order list.
        c.  For each neighbor `v` of `u`:
            i.  Decrement `in-degree[v]`.
            ii. If `in-degree[v]` becomes 0, enqueue `v`.
    5.  If the size of the topological order list is less than V, the graph contains a cycle.
*   **B. DFS-based Algorithm:**
    1.  Initialize a stack and a `visited` array (or set) with three states: unvisited, visiting (in current recursion stack), visited (finished processing).
    2.  For each vertex `u` in the graph:
        a.  If `u` is unvisited, call a recursive helper `dfs_visit(u)`.
    3.  `dfs_visit(u)`:
        a.  Mark `u` as `visiting`.
        b.  For each neighbor `v` of `u`:
            i.  If `v` is `visiting`, a cycle is detected (return failure).
            ii. If `v` is unvisited, recursively call `dfs_visit(v)`.
        c.  Mark `u` as `visited`.
        d.  Push `u` onto the stack (or add to a list *before* marking visited if building the result in reverse).
    4.  The topological order is obtained by popping elements from the stack.
*   **ASCII Diagram (Kahn's algorithm for Course Schedule):**
    ```
    0 <--- 1 <--- 2
    ^      |
    |      v
    3 <--- 4
    ```
    (0: DB, 1: Calculus, 2: Linear Algebra, 3: OS, 4: Data Structures)
    Prerequisites: `[0,1], [1,2], [3,1], [3,4], [4,2]`
    In-degrees:
    `deg[0]=1 (from 1)`
    `deg[1]=2 (from 2, from 4)`
    `deg[2]=0`
    `deg[3]=0`
    `deg[4]=1 (from 2)`

    Queue: `[2, 3]` (Initially courses with no prerequisites)

    1.  Dequeue `2`. Add `2` to order.
        Neighbors of 2: `1`, `4`.
        `deg[1]` becomes 1. `deg[4]` becomes 0. Enqueue `4`.
        Order: `[2]`
        Queue: `[3, 4]`

    2.  Dequeue `3`. Add `3` to order.
        Neighbors of 3: `1`.
        `deg[1]` becomes 0. Enqueue `1`.
        Order: `[2, 3]`
        Queue: `[4, 1]`

    3.  Dequeue `4`. Add `4` to order.
        Neighbors of 4: `1`.
        `deg[1]` becomes -1 (already 0, indicates error or redundant edge for problem context). Wait, this is `Course Schedule II` where `[0,1]` means 0 requires 1.
        Let's re-interpret: `[0,1]` means `1 -> 0`.
        Graph:
        `2 -> 1 -> 0`
        `2 -> 4 -> 3`
        `1 -> 3` (if `[3,1]` means 3 requires 1)

        Correct graph interpretation for `[course, prerequisite]`: `prerequisite` points to `course`.
        `1 -> 0`
        `2 -> 1`
        `1 -> 3`
        `4 -> 3`
        `2 -> 4`

        In-degrees:
        `deg[0]=1 (from 1)`
        `deg[1]=1 (from 2)`
        `deg[2]=0`
        `deg[3]=2 (from 1, from 4)`
        `deg[4]=1 (from 2)`

        Queue: `[2]`

        1.  Dequeue `2`. Add `2` to order.
            Neighbors of 2: `1`, `4`.
            `deg[1]` becomes 0. Enqueue `1`.
            `deg[4]` becomes 0. Enqueue `4`.
            Order: `[2]`
            Queue: `[1, 4]`

        2.  Dequeue `1`. Add `1` to order.
            Neighbors of 1: `0`, `3`.
            `deg[0]` becomes 0. Enqueue `0`.
            `deg[3]` becomes 1.
            Order: `[2, 1]`
            Queue: `[4, 0]`

        3.  Dequeue `4`. Add `4` to order.
            Neighbors of 4: `3`.
            `deg[3]` becomes 0. Enqueue `3`.
            Order: `[2, 1, 4]`
            Queue: `[0, 3]`

        4.  Dequeue `0`. Add `0` to order.
            No neighbors.
            Order: `[2, 1, 4, 0]`
            Queue: `[3]`

        5.  Dequeue `3`. Add `3` to order.
            No neighbors.
            Order: `[2, 1, 4, 0, 3]`
            Queue: `[]`

        Final Order: `[2, 1, 4, 0, 3]` (One valid topological sort)

*   **Time Complexity:** O(V + E) for both Kahn's and DFS-based.
*   **Space Complexity:** O(V + E) for adjacency list, in-degree array/queue/stack, and visited array.

---
```