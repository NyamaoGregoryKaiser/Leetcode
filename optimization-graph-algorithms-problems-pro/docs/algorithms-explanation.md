```markdown
# Graph Algorithms: In-Depth Explanations

This document provides detailed explanations for the core graph algorithms implemented in this project. Each section covers the algorithm's purpose, underlying principles, step-by-step process, and a formal analysis of its time and space complexity.

---

## 1. Shortest Path in Unweighted Graph (BFS)

*   **Problem:** Given an unweighted, undirected (or directed) graph, find the shortest path (minimum number of edges) between a source node and a destination node. Also, determine if a node is reachable, and count connected components.

*   **Core Idea:** Breadth-First Search (BFS) explores a graph level by level. It starts at the source node, visits all its immediate neighbors, then all their unvisited neighbors, and so on. Because it explores in layers, the first time it reaches a target node, it guarantees that it has found the path with the fewest number of edges.

*   **Detailed Steps:**
    1.  **Initialization:**
        *   Create a `queue` and add the `startNode` to it.
        *   Create a `visited` set to keep track of visited nodes and add `startNode`.
        *   Create a `parentMap` (or `predecessorMap`) to store the parent of each node in the shortest path, enabling path reconstruction. Set `startNode`'s parent to `null`.
    2.  **Traversal:**
        *   While the `queue` is not empty:
            *   Dequeue a `currentNode` from the front of the queue.
            *   **If `currentNode` is the `endNode`:** Path found! Reconstruct the path using the `parentMap` by tracing back from `endNode` to `startNode`. Return the path.
            *   For each `neighbor` of `currentNode`:
                *   If `neighbor` has not been `visited`:
                    *   Mark `neighbor` as `visited`.
                    *   Set `parentMap.set(neighbor, currentNode)`.
                    *   Enqueue `neighbor`.
    3.  **No Path:** If the queue becomes empty and the `endNode` was never reached, it means there is no path between `startNode` and `endNode`. Return `null`.

*   **Path Reconstruction:**
    *   Start from the `endNode`.
    *   Add `endNode` to the path list (or `unshift` to build in correct order).
    *   Move to its parent using `parentMap`.
    *   Repeat until the `startNode` is reached (or `null` if no path).
    *   Reverse the path list if elements were `push`ed.

*   **Variations Implemented:**
    *   `shortestPathBFS`: Returns the actual path.
    *   `isReachableBFS`: Returns `boolean` if `endNode` is reachable. (Simpler version of BFS, stops early).
    *   `countConnectedComponentsBFS`: For an undirected graph, iterate through all nodes. If a node is unvisited, increment component count and start a BFS from it to find all nodes in its component.

*   **Time Complexity:** O(V + E)
    *   Each vertex (V) is enqueued and dequeued at most once.
    *   Each edge (E) is examined at most once (for directed graphs) or twice (for undirected graphs, once from each direction).

*   **Space Complexity:** O(V)
    *   `queue`: Stores at most all vertices in a level, worst case O(V).
    *   `visited` set: Stores all vertices, O(V).
    *   `parentMap`: Stores parent for all reachable vertices, worst case O(V).

---

## 2. Dijkstra's Shortest Path Algorithm

*   **Problem:** Given a weighted graph (directed or undirected) with **non-negative** edge weights, find the shortest path from a single source node to all other reachable nodes.

*   **Core Idea:** Dijkstra's algorithm is a greedy algorithm that finds the shortest path from a single source to all other vertices. It maintains a set of visited vertices whose shortest path from the source is finalized, and iteratively selects the unvisited vertex with the smallest known distance from the source. A min-priority queue is used to efficiently find this vertex.

*   **Detailed Steps:**
    1.  **Initialization:**
        *   Create a `distances` map: `NodeId -> number`. Initialize `startNode` distance to `0`, all other nodes to `Infinity`.
        *   Create a `paths` map: `NodeId -> NodeId | null`. Initialize all to `null`, `startNode` parent to `null`.
        *   Create a `priorityQueue` (min-heap) and `enqueue` `{ nodeId: startNode, distance: 0, priority: 0 }`.
        *   Create a `visited` set to keep track of nodes whose shortest path has been finalized.
    2.  **Traversal:**
        *   While `priorityQueue` is not empty:
            *   `dequeue` the node `{ currentNode, currentDistance, priority }` with the smallest `priority` (which is `currentDistance`).
            *   **Optimization:** If `currentNode` is already in `visited`, or if `currentDistance > distances.get(currentNode)`, continue (this handles stale entries in the priority queue).
            *   Add `currentNode` to `visited`.
            *   **Explore Neighbors (Relaxation):** For each `edge` from `currentNode` to `neighbor` with `weight`:
                *   Calculate `distanceThroughCurrent = currentDistance + weight`.
                *   If `distanceThroughCurrent < distances.get(neighbor)`: (A shorter path to `neighbor` is found)
                    *   Update `distances.set(neighbor, distanceThroughCurrent)`.
                    *   Update `paths.set(neighbor, currentNode)`.
                    *   `enqueue` `{ nodeId: neighbor, distance: distanceThroughCurrent, priority: distanceThroughCurrent }` into the `priorityQueue`.
    3.  **Result:** After the loop, `distances` contains the shortest path distances from `startNode` to all reachable nodes, and `paths` can be used to reconstruct the paths.

*   **Important Constraint:** Dijkstra's algorithm **requires non-negative edge weights**. If negative weights are present, it may produce incorrect results. For graphs with negative edge weights (but no negative cycles), the Bellman-Ford algorithm is used.

*   **Time Complexity:**
    *   Using a Binary Heap (as implemented here): O(E log V) or O(E + V log V).
        *   Each vertex `V` is extracted from the priority queue once: `V * O(log V)`.
        *   Each edge `E` leads to a potential `enqueue` operation (or `decrease-key` if supported, which is effectively `enqueue` for our implementation, leading to "stale" entries): `E * O(log V)`.
        *   Total: O((V + E) log V). For connected graphs where `E >= V`, this simplifies to O(E log V).
    *   Using a Fibonacci Heap (more complex, not implemented here): O(E + V log V).

*   **Space Complexity:** O(V + E)
    *   `distances` map: O(V)
    *   `paths` map: O(V)
    *   `priorityQueue`: Stores at most O(E) elements (multiple entries for same node possible, but usually bounded by V or E)
    *   `visited` set: O(V)

---

## 3. Detect Cycle in Directed Graph (DFS)

*   **Problem:** Determine if a given directed graph contains any cycles.

*   **Core Idea:** Depth-First Search (DFS) can be adapted for cycle detection in directed graphs by tracking the state of nodes during traversal. We use three states:
    1.  **UNVISITED:** The node has not been visited yet.
    2.  **VISITING:** The node is currently in the recursion stack (part of the current DFS path). This is often called "gray" in algorithms literature.
    3.  **VISITED:** The node has been fully explored, and all its descendants have been visited. This is often called "black".

    A cycle is detected if, during a DFS traversal, we encounter a `neighbor` that is in the `VISITING` state. This means there's a back-edge to an ancestor in the current DFS path.

*   **Detailed Steps:**
    1.  **Initialization:**
        *   Create a `nodeStates` map: `NodeId -> NodeState`. Initialize all nodes to `UNVISITED`.
    2.  **Iterate Nodes:**
        *   For each `node` in the graph:
            *   If `nodeStates.get(node)` is `UNVISITED`:
                *   Start a DFS traversal from this `node` (`dfsVisitForDirectedCycle(node, graph, nodeStates)`).
                *   If this DFS path detects a cycle, immediately return `true`.
    3.  **`dfsVisitForDirectedCycle(currentNode, graph, nodeStates)` function:**
        *   Set `nodeStates.set(currentNode, VISITING)`.
        *   For each `neighbor` of `currentNode`:
            *   Get `neighborState = nodeStates.get(neighbor)`.
            *   If `neighborState` is `UNVISITED`:
                *   Recursively call `dfsVisitForDirectedCycle(neighbor, graph, nodeStates)`. If it returns `true`, propagate `true` (cycle found).
            *   If `neighborState` is `VISITING`:
                *   **Cycle Detected!** Return `true`.
            *   If `neighborState` is `VISITED`:
                *   Ignore; this path has already been fully explored.
        *   After exploring all neighbors, set `nodeStates.set(currentNode, VISITED)` (it's no longer in the recursion stack).
        *   Return `false` (no cycle found from this path).
    4.  **No Cycle:** If the loop finishes and no cycle was detected, return `false`.

*   **Time Complexity:** O(V + E)
    *   Each vertex is visited at most once (enters `VISITING` state once, transitions to `VISITED` once).
    *   Each edge is examined at most once.

*   **Space Complexity:** O(V)
    *   `nodeStates` map: O(V).
    *   Recursion stack: In the worst case (a path graph), it can be O(V).

*   **Comparison (Undirected Graphs):** For undirected graphs, a cycle is detected if, during DFS, a visited neighbor is encountered that is *not* the immediate parent of the current node in the DFS tree. A separate function `detectCycleInUndirectedGraphDFS` is provided to demonstrate this specific logic.

---

## 4. Topological Sort (Kahn's & DFS-based)

*   **Problem:** Given a Directed Acyclic Graph (DAG), produce a linear ordering of its vertices such that for every directed edge `u -> v`, vertex `u` comes before vertex `v` in the ordering. If the graph contains a cycle, topological sort is not possible.

*   **Constraint:** Topological sort is only defined for Directed Acyclic Graphs (DAGs).

### 4.1. Kahn's Algorithm (BFS-based)

*   **Core Idea:** Kahn's algorithm works by iteratively finding and removing nodes that have no incoming edges (an in-degree of 0). These nodes can be placed first in the topological order. When a node is "removed", its outgoing edges are also conceptually removed, which may reduce the in-degree of its neighbors, potentially making them new candidates for in-degree 0.

*   **Detailed Steps:**
    1.  **Initialization:**
        *   Compute the `in-degree` for every node in the graph. Store in a map `NodeId -> number`.
        *   Create a `queue` and add all nodes with an `in-degree` of `0` to it.
        *   Initialize an empty `sortedOrder` list.
        *   Initialize `visitedNodesCount = 0`.
    2.  **Processing:**
        *   While the `queue` is not empty:
            *   Dequeue `currentNode`.
            *   Add `currentNode` to `sortedOrder`.
            *   Increment `visitedNodesCount`.
            *   For each `neighbor` of `currentNode`:
                *   Decrement the `in-degree` of `neighbor`.
                *   If `neighbor`'s `in-degree` becomes `0`, enqueue `neighbor`.
    3.  **Cycle Detection:**
        *   After the loop, if `visitedNodesCount` is not equal to the total number of nodes in the graph, it means there was a cycle, and not all nodes could be added to the topological order. Return `null`.
    4.  **Result:** Return `sortedOrder`.

*   **Time Complexity:** O(V + E)
    *   Computing initial in-degrees: O(V + E).
    *   Each vertex is enqueued/dequeued once.
    *   Each edge is processed once (when decrementing in-degree of a neighbor).

*   **Space Complexity:** O(V)
    *   `inDegrees` map: O(V).
    *   `queue`: O(V) in worst case.
    *   `sortedOrder` list: O(V).

### 4.2. DFS-based Algorithm

*   **Core Idea:** The DFS-based approach leverages the property that in a DAG, a node can only be added to the topological sort list *after* all its descendants (nodes reachable from it) have been processed. This means nodes are added to the list in decreasing order of their finish times in DFS. By adding a node to the front of the list (or pushing and then reversing) when its DFS subtree is complete, we get the topological order. Cycle detection is integrated using the three-state mechanism from directed cycle detection.

*   **Detailed Steps:**
    1.  **Initialization:**
        *   Create a `nodeStates` map (`NodeId -> NodeState`) for cycle detection (UNVISITED, VISITING, VISITED). Initialize all to `UNVISITED`.
        *   Initialize an empty `sortedOrder` list.
    2.  **Iterate Nodes:**
        *   For each `node` in the graph:
            *   If `nodeStates.get(node)` is `UNVISITED`:
                *   Call `dfsVisitForTopologicalSort(node, graph, nodeStates, sortedOrder)`.
                *   If this DFS call returns `false` (indicating a cycle), immediately return `null`.
    3.  **`dfsVisitForTopologicalSort(currentNode, graph, nodeStates, sortedOrder)` function:**
        *   Set `nodeStates.set(currentNode, VISITING)`.
        *   For each `neighbor` of `currentNode`:
            *   Get `neighborState = nodeStates.get(neighbor)`.
            *   If `neighborState` is `UNVISITED`:
                *   Recursively call `dfsVisitForTopologicalSort(neighbor, graph, nodeStates, sortedOrder)`. If it returns `false`, propagate `false` (cycle found).
            *   If `neighborState` is `VISITING`:
                *   **Cycle Detected!** Return `false`.
            *   If `neighborState` is `VISITED`:
                *   Ignore.
        *   After exploring all neighbors, set `nodeStates.set(currentNode, VISITED)`.
        *   **Add to result:** `sortedOrder.push(currentNode)`. (This means nodes are added after their entire subtree is explored. The list will be reversed at the end for the correct topological order).
        *   Return `true` (no cycle found from this path).
    4.  **Result:** `sortedOrder` will contain the nodes in reverse topological order. `reverse()` the `sortedOrder` list and return it.

*   **Time Complexity:** O(V + E)
    *   Each vertex and edge is visited exactly once during the DFS traversal.

*   **Space Complexity:** O(V)
    *   `nodeStates` map: O(V).
    *   Recursion stack: O(V) in worst case.
    *   `sortedOrder` list: O(V).

---
```