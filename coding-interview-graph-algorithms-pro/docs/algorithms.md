# Graph Algorithms: Detailed Explanations

This document provides in-depth explanations for each graph algorithm implemented in this project, covering their core logic, step-by-step processes, and complexity analysis.

---

## 1. Breadth-First Search (BFS) and Depth-First Search (DFS) for Pathfinding

### Introduction

BFS and DFS are fundamental graph traversal algorithms. While both explore a graph, they do so in different orders, leading to different applications. In the context of pathfinding, BFS is optimal for finding the shortest path in unweighted graphs, while DFS finds *any* path.

### 1.1 Breadth-First Search (BFS)

#### Concept
BFS explores a graph layer by layer, visiting all neighbors at the current depth level before moving on to the nodes at the next depth level. It uses a queue data structure to manage which nodes to visit next.

#### Logic
1.  **Initialization**:
    *   Create a `queue` and add the `startNode` to it.
    *   Create a `visited` set to keep track of visited nodes and add `startNode`.
    *   Create a `parentMap` to store the predecessor of each node, crucial for reconstructing the path. Initialize `parentMap.set(startNode, null)`.
2.  **Traversal**:
    *   While the `queue` is not empty:
        *   Dequeue a `currentNode`.
        *   If `currentNode` is the `endNode`, a path has been found. Reconstruct it using the `parentMap` by tracing back from `endNode` to `startNode`.
        *   For each `neighbor` of `currentNode`:
            *   If `neighbor` has not been `visited`:
                *   Mark `neighbor` as `visited`.
                *   Set `parentMap.set(neighbor, currentNode)`.
                *   Enqueue `neighbor`.
3.  **No Path**: If the `queue` becomes empty and `endNode` was not reached, no path exists.

#### Why it Works for Shortest Path (Unweighted)
BFS guarantees the shortest path in unweighted graphs because it explores nodes in increasing order of their distance from the `startNode`. The first time BFS reaches the `endNode`, it must have done so via the minimum number of edges.

#### Time Complexity
*   **O(V + E)**: Where V is the number of vertices and E is the number of edges. Each vertex is enqueued and dequeued once, and each edge is examined at most twice (once for each direction in an undirected graph).
#### Space Complexity
*   **O(V)**: For the `visited` set and the `queue`. In the worst case (e.g., a star graph), the queue might hold almost all vertices. The `parentMap` also stores V entries.

### 1.2 Depth-First Search (DFS)

#### Concept
DFS explores as far as possible along each branch before backtracking. It uses a stack data structure (explicitly or implicitly via recursion) to manage the order of visits.

#### Logic (Iterative using a stack)
1.  **Initialization**:
    *   Create a `stack` and push the `startNode` onto it.
    *   Create a `visited` set and add `startNode`.
    *   Create a `parentMap` (similar to BFS for path reconstruction).
2.  **Traversal**:
    *   While the `stack` is not empty:
        *   Pop a `currentNode`.
        *   If `currentNode` is the `endNode`, reconstruct and return the path using `parentMap`.
        *   For each `neighbor` of `currentNode`:
            *   If `neighbor` has not been `visited`:
                *   Mark `neighbor` as `visited`.
                *   Set `parentMap.set(neighbor, currentNode)`.
                *   Push `neighbor` onto the `stack`.
    *   Note: The order of pushing neighbors matters for which specific path is found first, but not for finding *a* path. Often, neighbors are pushed in reverse order of desired processing.

#### Logic (Recursive)
1.  **Initialization**:
    *   Create a `visited` set.
    *   Create a `path` array to store the current path being explored.
    *   Define a recursive helper function `dfs(currentNode)`.
2.  **Recursive Step**:
    *   Add `currentNode` to `visited` and `path`.
    *   If `currentNode` is `endNode`, return `true` (path found).
    *   For each `neighbor` of `currentNode`:
        *   If `neighbor` is not `visited`:
            *   Call `dfs(neighbor)`. If it returns `true`, propagate `true` upwards.
    *   If no path found through `currentNode`'s neighbors, `pop` `currentNode` from `path` (backtrack) and return `false`.
3.  **Return**: If initial `dfs(startNode)` returns `true`, return `path`; otherwise, `null`.

#### Why it Works
DFS systematically explores all reachable nodes from the `startNode`. It will eventually find a path if one exists, but not necessarily the shortest one in unweighted graphs.

#### Time Complexity
*   **O(V + E)**: Similar to BFS, each vertex and edge is processed once.
#### Space Complexity
*   **O(V)**: For the `visited` set and the recursion stack (which can go up to V levels deep in the worst case for a path graph).

---

## 2. Dijkstra's Algorithm for Shortest Paths

### Introduction
Dijkstra's algorithm finds the shortest paths from a single source node to all other nodes in a graph with non-negative edge weights. It is a greedy algorithm that uses a priority queue to efficiently explore nodes.

### Concept
Starting from a source node, Dijkstra's algorithm iteratively identifies the unvisited node that has the shortest confirmed distance from the source. It then updates the distances to its neighbors if a shorter path through the newly confirmed node is found. This process is repeated until all reachable nodes have their shortest paths determined.

### Logic
1.  **Initialization**:
    *   Create `distances` map: stores the shortest distance from `startNode` to every other node. Initialize `distances.set(startNode, 0)` and `distances.set(node, Infinity)` for all other nodes.
    *   Create `previous` map: stores the predecessor of each node on its shortest path, used for path reconstruction. Initialize `previous.set(node, null)` for all nodes.
    *   Create a `PriorityQueue` (min-heap): stores `{ node, distance }` pairs, ordered by `distance`. Add `{ startNode, 0 }` to the PQ.
    *   Create a `visited` set: to keep track of nodes whose shortest distance has been finalized.
2.  **Main Loop**:
    *   While the `PriorityQueue` is not empty:
        *   Extract the node `u` with the smallest `distance` from the PQ.
        *   If `u` has already been `visited`, continue (this handles redundant entries in PQ for nodes updated multiple times).
        *   Add `u` to `visited`.
        *   If `distances.get(u)` is `Infinity`, it means remaining nodes in PQ are unreachable, so break.
        *   For each `neighbor v` of `u`:
            *   Calculate `newDistance = distances.get(u) + weight(u, v)`.
            *   **Relaxation**: If `newDistance` is less than `distances.get(v)`:
                *   Update `distances.set(v, newDistance)`.
                *   Update `previous.set(v, u)`.
                *   Add `{ v, newDistance }` to the `PriorityQueue`.

#### Why it Works
Dijkstra's works due to the "optimal substructure" property of shortest paths and the non-negative edge weights. When a node `u` is extracted from the priority queue, it's guaranteed that `distances.get(u)` is its true shortest distance. This is because any other path to `u` would either involve an unvisited node (which would have a higher or equal priority, contradicting that `u` was chosen) or a path through a visited node that was already processed.

#### Restrictions
*   **Non-negative edge weights**: Dijkstra's algorithm fails with negative edge weights as it assumes that once a node's distance is finalized, it won't be improved by future paths. For graphs with negative weights (but no negative cycles), Bellman-Ford algorithm can be used.

#### Time Complexity
*   **O((V + E) log V)**: Using a binary heap (like the `PriorityQueue` implemented). Each `V` node is extracted once (O(log V)), and each `E` edge causes a relaxation (enqueue/update, O(log V)).
*   **O(E + V log V)**: If a Fibonacci heap is used (more complex to implement, rarely asked in interviews).
#### Space Complexity
*   **O(V + E)**: For `distances` map, `previous` map, `visited` set, and `PriorityQueue`.

---

## 3. Prim's Algorithm for Minimum Spanning Tree (MST)

### Introduction
Prim's algorithm finds a Minimum Spanning Tree (MST) for a connected, undirected weighted graph. An MST is a subset of the graph's edges that connects all the vertices together, without any cycles and with the minimum possible total edge weight.

### Concept
Prim's algorithm starts with an arbitrary node and grows the MST by iteratively adding the cheapest edge that connects a node already in the MST to a node not yet in the MST. It is a greedy algorithm, similar in structure to Dijkstra's.

### Logic
1.  **Initialization**:
    *   Create `minCostToReach` map: stores the minimum weight of an edge connecting a node `v` to the current MST. Initialize `minCostToReach.set(startNode, 0)` and `minCostToReach.set(node, Infinity)` for all other nodes.
    *   Create `parentEdge` map: stores the edge `{ from, weight }` that provides the `minCostToReach` for each node, used to reconstruct the MST edges. Initialize `parentEdge.set(node, null)`.
    *   Create a `PriorityQueue` (min-heap): stores `{ node, cost }` pairs, ordered by `cost`. Add `{ startNode, 0 }` to the PQ.
    *   Create `inMST` set: to keep track of nodes already included in the MST.
2.  **Main Loop**:
    *   While the `PriorityQueue` is not empty AND `inMST.size < graph.numNodes()`:
        *   Extract the node `u` with the smallest `cost` (which is `minCostToReach.get(u)`) from the PQ.
        *   If `u` is already in `inMST`, continue.
        *   Add `u` to `inMST`.
        *   Add the edge that connected `u` to the MST (from `parentEdge.get(u)`) to the `mstEdges` list, and add `minCostToReach.get(u)` to `totalWeight`.
        *   For each `neighbor v` of `u`:
            *   If `v` is not in `inMST` and `weight(u, v)` is less than `minCostToReach.get(v)`:
                *   Update `minCostToReach.set(v, weight(u, v))`.
                *   Update `parentEdge.set(v, { from: u, weight: weight(u, v) })`.
                *   Add `{ v, weight(u, v) }` to the `PriorityQueue`.

#### Why it Works
Prim's algorithm works based on the "cut property": for any cut (a division of vertices into two disjoint sets) of a connected graph, if an edge crosses the cut and has strictly smaller weight than any other edge crossing the cut, then this edge must be part of *every* MST. Prim's greedily adds such edges.

#### Restrictions
*   **Connected Graph**: Prim's algorithm finds an MST for the connected component reachable from the `startNode`. If the entire graph is disconnected, it will only find an MST for that component.
*   **Undirected Graph**: The graph must be undirected for the concept of "spanning tree" to apply in the standard sense. Edge weights must be comparable.

#### Time Complexity
*   **O((V + E) log V)**: Similar to Dijkstra's, using a binary heap. Each `V` node is extracted once, and each `E` edge potentially triggers an update/enqueue.
#### Space Complexity
*   **O(V + E)**: For `minCostToReach` map, `parentEdge` map, `inMST` set, and `PriorityQueue`.

---

## 4. Topological Sort (Kahn's Algorithm)

### Introduction
A topological sort (or topological ordering) of a directed acyclic graph (DAG) is a linear ordering of its vertices such that for every directed edge `u -> v`, vertex `u` comes before `v` in the ordering. It's useful for scheduling tasks with dependencies.

### Concept
Kahn's algorithm for topological sort works by repeatedly finding nodes with no incoming edges (in-degree 0), adding them to the sorted list, and then "removing" them and their outgoing edges from the graph. This process updates the in-degrees of their neighbors, potentially creating new nodes with in-degree 0.

### Logic
1.  **Calculate In-Degrees**:
    *   Create an `inDegrees` map: stores the number of incoming edges for each node. Initialize all nodes' in-degrees to 0.
    *   Iterate through all edges in the graph: for each edge `u -> v`, increment `inDegrees.get(v)`.
2.  **Initialize Queue**:
    *   Create a `queue`.
    *   Add all nodes with an `inDegrees` count of 0 to the `queue`.
3.  **Process Queue**:
    *   Create an empty `sortedOrder` list to store the result.
    *   While the `queue` is not empty:
        *   Dequeue a `currentNode`.
        *   Add `currentNode` to `sortedOrder`.
        *   For each `neighbor v` of `currentNode`:
            *   Decrement `inDegrees.get(v)`.
            *   If `inDegrees.get(v)` becomes 0, enqueue `v`.
4.  **Cycle Detection**:
    *   After the loop, if the `sortedOrder.length` is not equal to the total number of nodes in the graph, it means a cycle was detected (some nodes could never reach an in-degree of 0), and a topological sort is impossible. Return `null` in this case.
    *   Otherwise, return `sortedOrder`.

#### Why it Works
Kahn's algorithm works because any node with an in-degree of 0 has no preceding dependencies and can be safely placed first. Removing it effectively resolves its dependencies for its neighbors, allowing them to eventually reach an in-degree of 0. If a cycle exists, nodes within the cycle will always have an in-degree greater than 0, preventing them from being added to the queue and thus never processed.

#### Restrictions
*   **Directed Acyclic Graph (DAG)**: Topological sort is only possible for DAGs. If the graph contains cycles, no valid topological ordering exists.

#### Time Complexity
*   **O(V + E)**: Each vertex is processed once when calculating in-degrees, added/removed from the queue, and added to the sorted list. Each edge is examined once when decrementing the in-degree of a neighbor.
#### Space Complexity
*   **O(V)**: For `inDegrees` map, `queue`, and `sortedOrder` list.

---