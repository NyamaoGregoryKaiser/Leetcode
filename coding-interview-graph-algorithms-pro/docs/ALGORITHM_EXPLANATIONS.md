# Algorithm Explanations

This document provides detailed explanations for each graph algorithm implemented in the project. It covers the core idea, step-by-step logic, data structures used, time/space complexity, and important considerations.

---

## 1. BFS Shortest Path (Unweighted Graphs)

### Problem Statement
Given an unweighted graph (where all edges have a weight of 1) and two nodes, a `startNode` and an `endNode`, find the shortest path (in terms of the minimum number of edges) between them.

### Core Idea / Intuition
Breadth-First Search (BFS) explores a graph level by level. It starts at the `startNode` and visits all its immediate neighbors (distance 1), then all their unvisited neighbors (distance 2), and so on. This "expanding wave" behavior naturally finds the shortest path in an unweighted graph because it guarantees that the first time a node is discovered, it's discovered via the shortest possible path from the `startNode`.

### Step-by-Step Logic
1.  **Initialization**:
    *   Create a `queue` to hold nodes to visit.
    *   Create a `visited` set to keep track of nodes already processed, preventing infinite loops in cycles and redundant work.
    *   Create a `parentMap` to reconstruct the path: `parentMap.set(child, parent)`.
    *   Create a `distances` map to store the shortest distance from `startNode` to each node.
2.  **Start Node**:
    *   Add `startNode` to the `queue`.
    *   Mark `startNode` as `visited`.
    *   Set `parentMap.set(startNode, null)`.
    *   Set `distances.set(startNode, 0)`.
3.  **Traversal Loop**:
    *   While the `queue` is not empty:
        *   `Dequeue` a `currentNode` from the front of the `queue`.
        *   Retrieve its `currentDistance` from `distances`.
        *   **Check for Target**: If `currentNode` is the `endNode`, we have found the shortest path. Reconstruct and return.
        *   **Explore Neighbors**: For each `neighbor` of `currentNode`:
            *   If `neighbor` has not been `visited`:
                *   Mark `neighbor` as `visited`.
                *   Set `parentMap.set(neighbor, currentNode)`.
                *   Set `distances.set(neighbor, currentDistance + 1)`.
                *   `Enqueue` `neighbor`.
4.  **No Path**: If the queue becomes empty and `endNode` was never reached, it means `endNode` is unreachable from `startNode`.

### Data Structures Used
*   `Graph<T>`: Adjacency list representation.
*   `Queue<T>`: Typically implemented using an array (`push` and `shift`/`splice` or a `head` pointer for optimization) for nodes to visit.
*   `Set<T>`: For `visited` nodes (O(1) average time for add/check).
*   `Map<T, T | null>`: For `parentMap` to store predecessors for path reconstruction.
*   `Map<T, number>`: For `distances` to store the shortest distance to each node.

### Visual Diagram (Example: A to F)

```
Graph:
A -- B
|    |
C -- D
|    |
F -- E

Start: A, End: F

Step 0: Queue: [A], Visited: {A}, Parents: {A: null}, Distances: {A: 0}
---------------------------------------------------------------------
Step 1: Dequeue A. Dist(A)=0.
        Neighbors B, C.
        Enqueue B. Parents: {B: A}, Distances: {B: 1}. Visited: {A, B}
        Enqueue C. Parents: {C: A}, Distances: {C: 1}. Visited: {A, B, C}
        Queue: [B, C]
---------------------------------------------------------------------
Step 2: Dequeue B. Dist(B)=1.
        Neighbors A (visited), D.
        Enqueue D. Parents: {D: B}, Distances: {D: 2}. Visited: {A, B, C, D}
        Queue: [C, D]
---------------------------------------------------------------------
Step 3: Dequeue C. Dist(C)=1.
        Neighbors A (visited), D (visited), F.
        Enqueue F. Parents: {F: C}, Distances: {F: 2}. Visited: {A, B, C, D, F}
        Queue: [D, F]
        -> F is the endNode. Path found!
```

**Path Reconstruction (from F to A):**
*   F (dist 2) -> Parent C
*   C (dist 1) -> Parent A
*   A (dist 0) -> Parent null (Stop)
Reverse path: `A -> C -> F`. Distance: `2`.

### Time Complexity
O(V + E), where V is the number of vertices and E is the number of edges.
*   Each vertex is enqueued and dequeued at most once.
*   Each edge is traversed at most once (for directed graphs) or twice (for undirected graphs, once from each direction).

### Space Complexity
O(V)
*   `queue`: Stores at most O(V) nodes (in the worst case, all nodes at one level).
*   `visited` set: Stores O(V) nodes.
*   `parentMap` and `distances` map: Stores O(V) nodes.

### Edge Cases and Gotchas
*   **Disconnected Graph**: If the `endNode` is in a different connected component than the `startNode`, BFS will eventually exhaust the `startNode`'s component, and the `endNode` will not be found. The algorithm correctly returns an empty path and -1 distance.
*   **Start Node equals End Node**: The path is just the node itself, distance 0. This should be handled as an initial check.
*   **Non-existent Nodes**: If `startNode` or `endNode` are not in the graph, return an empty path and -1 distance.
*   **Graph Representation**: Adjacency list is efficient for sparse graphs (fewer edges) and BFS. Adjacency matrix works but can be less efficient for sparse graphs.

---

## 2. Dijkstra's Algorithm (Shortest Path in Weighted Graphs)

### Problem Statement
Given a weighted graph with non-negative edge weights and a `startNode`, find the shortest path (minimum total weight) from the `startNode` to all other reachable nodes in the graph.

### Core Idea / Intuition
Dijkstra's algorithm is a greedy algorithm that works on graphs with non-negative edge weights. It iteratively finds the shortest paths from the `startNode` to other nodes. It maintains a set of "visited" nodes for which the shortest path has already been finalized. It uses a **priority queue** to efficiently select the unvisited node with the smallest known distance from the `startNode`.

### Step-by-Step Logic
1.  **Initialization**:
    *   Create a `distances` map: `distances.set(node, Infinity)` for all nodes, `distances.set(startNode, 0)`.
    *   Create a `parentMap`: `parentMap.set(node, null)` for all nodes.
    *   Create a `min-priority queue` (PQ). Store elements as `{ node: T, priority: number }`, where `priority` is the current shortest distance to `node`.
    *   `Enqueue` `startNode` into the PQ with priority 0.
2.  **Traversal Loop**:
    *   While the `priority queue` is not empty:
        *   `Extract` the `currentNode` with the minimum `currentDistance` from the PQ.
        *   **Stale Entry Check**: If `currentDistance` (from PQ) is greater than the `distances.get(currentNode)` (from map), it means we've already found a shorter path to `currentNode` and processed it. Skip this `currentNode` (it's a stale entry). This is crucial if the PQ doesn't support efficient `decreaseKey`.
        *   **Explore Neighbors**: For each `neighbor` of `currentNode` with `edgeWeight`:
            *   Calculate `newDistance = currentDistance + edgeWeight`.
            *   **Relaxation**: If `newDistance` is less than `distances.get(neighbor)`:
                *   Update `distances.set(neighbor, newDistance)`.
                *   Set `parentMap.set(neighbor, currentNode)`.
                *   `Enqueue` `neighbor` into the PQ with `newDistance` as its priority. (Note: this re-inserts, creating potential stale entries, which the stale entry check handles).
3.  **Result**: After the loop finishes, `distances` will contain the shortest distances from `startNode` to all reachable nodes, and `parentMap` can be used to reconstruct paths.

### Data Structures Used
*   `Graph<T>`: Adjacency list representation (should support weighted edges).
*   `PriorityQueue<T>`: A min-heap implementation is standard. Stores `{ value: T, priority: number }`.
*   `Map<T, number>`: For `distances` (stores shortest distance from `startNode` to each node).
*   `Map<T, T | null>`: For `parentMap` (stores predecessors for path reconstruction).

### Visual Diagram (Example: A to Z)

```
Graph: (Weighted, Directed)
A --(4)--> B
|          |
(2)        (3)
|          |
C --(2)--> D --(3)--> E --(1)--> Z
|          |
(4)        (1)
|          |
F ---------> Z
       (3)

Start Node: A

Step 0: PQ: [{A, 0}], Distances: {A:0, B:∞, C:∞, D:∞, E:∞, F:∞, Z:∞}
        Parents: {A:null, B:null, ..., Z:null}
---------------------------------------------------------------------
Step 1: Extract {A, 0}. CurrentNode=A, CurrentDist=0.
        Neighbors: B (4), C (2).
        Relax B: newDist=0+4=4. distances.set(B, 4), parentMap.set(B, A). PQ.insert({B,4}).
        Relax C: newDist=0+2=2. distances.set(C, 2), parentMap.set(C, A). PQ.insert({C,2}).
        PQ: [{C, 2}, {B, 4}]
---------------------------------------------------------------------
Step 2: Extract {C, 2}. CurrentNode=C, CurrentDist=2.
        Neighbors: D (2), F (4).
        Relax D: newDist=2+2=4. distances.set(D, 4), parentMap.set(D, C). PQ.insert({D,4}).
        Relax F: newDist=2+4=6. distances.set(F, 6), parentMap.set(F, C). PQ.insert({F,6}).
        PQ: [{B, 4}, {D, 4}, {F, 6}]
---------------------------------------------------------------------
Step 3: Extract {B, 4} (or {D, 4}, depending on tie-break, let's say B). CurrentNode=B, CurrentDist=4.
        Neighbors: E (3).
        Relax E: newDist=4+3=7. distances.set(E, 7), parentMap.set(E, B). PQ.insert({E,7}).
        PQ: [{D, 4}, {F, 6}, {E, 7}]
---------------------------------------------------------------------
Step 4: Extract {D, 4}. CurrentNode=D, CurrentDist=4.
        Neighbors: E (3), F (1).
        Relax E: newDist=4+3=7. distances.get(E) is 7. No shorter path. (PQ might have old {E,7} but ignore)
        Relax F: newDist=4+1=5. distances.get(F) is 6. This is shorter!
                 distances.set(F, 5), parentMap.set(F, D). PQ.insert({F,5}).
        PQ: [{F, 5 (new)}, {F, 6 (stale)}, {E, 7}]
---------------------------------------------------------------------
... continue until PQ is empty ...

Final Distances: {A:0, B:4, C:2, D:4, E:7, F:5, Z:8}
Final Path A to Z (reconstructed via parentMap): A -> C -> D -> F -> Z
```

### Time Complexity
O((V + E) log V) with a binary heap priority queue.
*   Each vertex is inserted into the PQ at most once (or more if `decreaseKey` is simulated by re-insertion). For a standard `PriorityQueue` without `decreaseKey`, it can be inserted multiple times. The `currentDistance > distances.get(currentNode)` check makes sure each vertex is "processed" (neighbors explored) only once.
*   Each extraction from PQ is O(log V). There are V extractions. (V log V)
*   Each edge relaxation (`newDistance < distances.get(neighbor)`) causes an `insert` into the PQ, which is O(log V). There are E relaxations in total. (E log V)
*   Total: O(V log V + E log V) = O((V + E) log V).

### Space Complexity
O(V + E)
*   `distances` map: O(V)
*   `parentMap`: O(V)
*   `priorityQueue`: O(E) in the worst case if `decreaseKey` is not implemented efficiently and many stale entries are added. O(V) if `decreaseKey` is O(log V) and removes older entries.

### Edge Cases and Gotchas
*   **Negative Edge Weights**: Dijkstra's algorithm *does not work correctly* with negative edge weights. It might produce incorrect results or get stuck in negative cycles. For graphs with negative weights, Bellman-Ford or SPFA algorithms are needed.
*   **Disconnected Graph**: Nodes unreachable from `startNode` will retain `Infinity` distance.
*   **Start Node Not in Graph**: Handle by returning empty maps.
*   **Dense vs. Sparse Graphs**: For dense graphs (E close to V^2), a Fibonacci heap (O(E + V log V)) is theoretically faster, but binary heaps (O((V+E)logV)) are simpler and often faster in practice due to constant factors. For sparse graphs (E close to V), binary heaps are efficient.
*   **Path Reconstruction**: Requires `parentMap`.

---

## 3. Topological Sort (Kahn's Algorithm - BFS Based)

### Problem Statement
Given a Directed Acyclic Graph (DAG), produce a linear ordering of its vertices such that for every directed edge `u -> v`, vertex `u` comes before vertex `v` in the ordering. If the graph is not a DAG (i.e., contains a cycle), a topological sort is impossible.

### Core Idea / Intuition
Kahn's algorithm is an iterative, BFS-based approach. The key insight is that any DAG must have at least one vertex with an in-degree of zero (a "source" node). Such a node can be placed first in the topological order. Once processed, it can be conceptually "removed" from the graph, which might make new nodes become sources (their in-degree drops to zero). This process continues until all nodes are ordered or a cycle is detected.

### Step-by-Step Logic
1.  **Calculate In-Degrees**:
    *   For every node in the graph, calculate its `in-degree` (the number of incoming edges). Store these in a `Map<T, number>`.
2.  **Initialize Queue**:
    *   Create a `queue`.
    *   Add all nodes with an `in-degree` of 0 to the `queue`. These are the initial "source" nodes.
3.  **Process Queue**:
    *   Create an empty `result` list to store the topological order.
    *   While the `queue` is not empty:
        *   `Dequeue` a `currentNode` from the front of the `queue`.
        *   Add `currentNode` to the `result` list.
        *   **Process Neighbors**: For each `neighbor` of `currentNode`:
            *   Decrement the `in-degree` of `neighbor`.
            *   If `neighbor`'s `in-degree` becomes 0, `Enqueue` `neighbor`.
4.  **Cycle Detection**:
    *   After the loop, if the number of nodes in `result` is less than the total number of nodes in the graph, it means there are remaining nodes that could not be processed (they always had an in-degree > 0), indicating the presence of a cycle. In this case, return `null`.
    *   Otherwise, `result` contains a valid topological sort.

### Data Structures Used
*   `Graph<T>`: Adjacency list representation (must be directed).
*   `Map<T, number>`: For `inDegrees` (stores the in-degree of each node).
*   `Queue<T>`: For nodes to process (implemented using an array).
*   `Array<T>`: For `result` (the final topological order).

### Visual Diagram (Example: Course Prerequisites)

```
Graph: (Directed)
                 +----> C <----+
                /             \
       A <-----+               +---> D
      /        \             /
     v          +----> F <----+
    B

Start Nodes (in-degree 0): A, B

Step 0: InDegrees: {A:0, B:0, C:2, D:2, F:1}
        Queue: [A, B], Result: []
---------------------------------------------------------------------
Step 1: Dequeue A. Result: [A].
        Neighbors: C. Decrement in-degree(C) to 1.
        Queue: [B]
---------------------------------------------------------------------
Step 2: Dequeue B. Result: [A, B].
        Neighbors: C, F.
        Decrement in-degree(C) to 0. Enqueue C.
        Decrement in-degree(F) to 0. Enqueue F.
        Queue: [C, F]
---------------------------------------------------------------------
Step 3: Dequeue C. Result: [A, B, C].
        Neighbors: D. Decrement in-degree(D) to 1.
        Queue: [F]
---------------------------------------------------------------------
Step 4: Dequeue F. Result: [A, B, C, F].
        Neighbors: D. Decrement in-degree(D) to 0. Enqueue D.
        Queue: [D]
---------------------------------------------------------------------
Step 5: Dequeue D. Result: [A, B, C, F, D].
        Neighbors: (none).
        Queue: []
---------------------------------------------------------------------
Queue is empty. Result length (5) == Graph node count (5). No cycle.
Final Topological Order: [A, B, C, F, D] (one possible valid order)
```

### Time Complexity
O(V + E)
*   **Calculating in-degrees**: Iterating through all nodes and their neighbors takes O(V + E).
*   **Initializing queue**: Iterating through all nodes takes O(V).
*   **Processing queue**: Each node is enqueued and dequeued once (V operations). Each edge is processed once when its source node is dequeued (E operations).
*   Total: O(V + E).

### Space Complexity
O(V)
*   `inDegrees` map: O(V)
*   `queue`: O(V) in the worst case (e.g., a star graph where all nodes are leaves).
*   `result` list: O(V)

### Edge Cases and Gotchas
*   **Cycles**: The most important edge case. If `result.length !== graph.nodeCount()`, a cycle exists.
*   **Disconnected Components**: Kahn's algorithm correctly handles disconnected components by ensuring all nodes are initialized with their in-degrees and processed if they become sources.
*   **Multiple Valid Orders**: For many DAGs, there can be multiple valid topological orders. Kahn's algorithm will produce one of them, depending on the order in which nodes are added to the queue when their in-degrees become 0.
*   **Empty Graph**: Returns an empty array.
*   **Single Node**: Returns an array with that single node.

---

## 4. Detect Cycle in Directed Graph (DFS)

### Problem Statement
Determine if a given directed graph contains any cycles. A cycle is a path of edges and vertices wherein a vertex is reachable from itself.

### Core Idea / Intuition
Depth-First Search (DFS) is well-suited for cycle detection in directed graphs. The core idea is to track the state of each node during the DFS traversal. When performing a DFS, we can identify a cycle if, while exploring from `currentNode`, we encounter a `neighbor` that is currently in the "visiting" state (meaning it's an ancestor in the current recursion path).

We use three states for each node:
1.  **Unvisited (0/White)**: The node has not been visited yet.
2.  **Visiting (1/Grey)**: The node is currently in the recursion stack; its subtree is being explored.
3.  **Visited (2/Black)**: The node has been completely processed, and all its descendants have been visited. It's no longer in the recursion stack.

### Step-by-Step Logic
1.  **Initialization**:
    *   Create a `nodeStates` map, initially setting all nodes to `0` (Unvisited).
2.  **DFS Helper Function (`dfs(node)`):**
    *   **Mark as Visiting**: Set `nodeStates.set(node, 1)` (Visiting).
    *   **Explore Neighbors**: For each `neighbor` of `node`:
        *   Get `neighborState = nodeStates.get(neighbor)`.
        *   **Cycle Detected**: If `neighborState === 1` (Visiting), a cycle is found. Return `true`.
        *   **Unvisited Neighbor**: If `neighborState === 0` (Unvisited):
            *   Recursively call `dfs(neighbor)`. If it returns `true` (cycle found in subtree), immediately return `true` to propagate the cycle detection.
        *   **Visited Neighbor**: If `neighborState === 2` (Visited), skip this neighbor as its subtree has already been fully processed and found to be acyclic.
    *   **Mark as Visited**: After exploring all neighbors of `node` and no cycle was detected from this path, set `nodeStates.set(node, 2)` (Visited). This node is now fully processed and can be removed from the recursion stack conceptually.
    *   **No Cycle from this Path**: Return `false`.
3.  **Main Loop**:
    *   Iterate through all nodes in the graph.
    *   If a `node` is `Unvisited` (`nodeStates.get(node) === 0`), call `dfs(node)`.
    *   If `dfs(node)` returns `true`, then a cycle exists in the graph, so immediately return `true`.
4.  **No Cycle Found**: If the loop finishes without detecting any cycles, return `false`.

### Data Structures Used
*   `Graph<T>`: Adjacency list representation (must be directed).
*   `Map<T, 0 | 1 | 2>`: For `nodeStates` (tracks the DFS state of each node).
*   Call Stack: For DFS recursion.

### Visual Diagram (Example: Cycle A-B-C-A)

```
Graph: (Directed)
A ---> B
^      |
|      v
C <----D

Initial: States: {A:0, B:0, C:0, D:0}

Call dfs('A'):
  States: {A:1, B:0, C:0, D:0} (A is visiting)
  Neighbors of A: [B]
  Call dfs('B'):
    States: {A:1, B:1, C:0, D:0} (B is visiting)
    Neighbors of B: [D]
    Call dfs('D'):
      States: {A:1, B:1, C:0, D:1} (D is visiting)
      Neighbors of D: [C]
      Call dfs('C'):
        States: {A:1, B:1, C:1, D:1} (C is visiting)
        Neighbors of C: [A]
        Neighbor A's state is 1 (Visiting)! -> CYCLE DETECTED!
        Return true from dfs('C')
      Return true from dfs('D')
    Return true from dfs('B')
  Return true from dfs('A')

Result: true (Cycle detected)
```

### Time Complexity
O(V + E)
*   Each vertex is visited once.
*   Each edge is traversed once.
*   The `dfs` function marks nodes as `Visiting` and `Visited`, ensuring constant time operations per node/edge after initial setup.

### Space Complexity
O(V)
*   `nodeStates` map: O(V)
*   Recursion stack: In the worst case (a very long path without branching), the depth of the recursion stack can be O(V).

### Edge Cases and Gotchas
*   **Disconnected Components**: The main loop that iterates through all nodes and starts `dfs` if a node is unvisited ensures that all connected components are checked for cycles.
*   **Self-Loops**: A self-loop (`A -> A`) is a cycle. When `dfs(A)` is called, `A` is marked `Visiting`. Its neighbor is `A` itself. `A`'s state is `1` (`Visiting`), so a cycle is detected.
*   **Parallel Edges**: The algorithm correctly handles parallel edges (`A -> B`, `A -> B`). It still processes `B` once as a neighbor.
*   **DAGs**: For a Directed Acyclic Graph, the algorithm will correctly return `false`. All nodes will eventually be marked `Visited` (state 2) after their subtrees are explored.

---