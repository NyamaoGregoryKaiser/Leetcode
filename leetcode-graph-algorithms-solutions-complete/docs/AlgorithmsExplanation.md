```markdown
# Graph Algorithms Explained

This document provides detailed explanations of the graph algorithms implemented in this project, covering their core concepts, step-by-step logic, complexity analysis, edge cases, and interview considerations.

## Table of Contents

1.  [Introduction to Graph Theory](#1-introduction-to-graph-theory)
2.  [Graph Traversal (BFS & DFS)](#2-graph-traversal-bfs--dfs)
    *   [Breadth-First Search (BFS)](#breadth-first-search-bfs)
    *   [Depth-First Search (DFS)](#depth-first-search-dfs)
3.  [Shortest Path in Unweighted Graph (BFS)](#3-shortest-path-in-unweighted-graph-bfs)
4.  [Shortest Path in Weighted Graph (Dijkstra's Algorithm)](#4-shortest-path-in-weighted-graph-dijkstras-algorithm)
5.  [Cycle Detection and Topological Sort](#5-cycle-detection-and-topological-sort)
    *   [Cycle Detection](#cycle-detection)
    *   [Topological Sort (DFS-based)](#topological-sort-dfs-based)
    *   [Topological Sort (Kahn's / BFS-based)](#topological-sort-kahns--bfs-based)
6.  [Minimum Spanning Tree (Prim's Algorithm)](#6-minimum-spanning-tree-prims-algorithm)
7.  [General Interview Tips and Best Practices](#7-general-interview-tips-and-best-practices)

---

## 1. Introduction to Graph Theory

A **graph** is a non-linear data structure consisting of **vertices** (or nodes) and **edges** that connect these vertices.

*   **Vertices (V)**: The fundamental units of a graph.
*   **Edges (E)**: Connections between vertices. Edges can be:
    *   **Directed**: `(u, v)` means an edge from `u` to `v`, but not necessarily from `v` to `u`. Often called a "digraph".
    *   **Undirected**: `(u, v)` means an edge between `u` and `v`, implying `(v, u)` also exists.
    *   **Weighted**: Edges have an associated numerical value (cost, distance, etc.).
    *   **Unweighted**: All edges have an implied weight of 1.

**Representations:**
*   **Adjacency Matrix**: A `V x V` matrix where `matrix[i][j]` is 1 (or weight) if an edge exists from `i` to `j`, 0 otherwise.
    *   **Pros**: Fast lookup for `(u, v)` edge existence (`O(1)`), easy to add/remove edges.
    *   **Cons**: High space complexity `O(V^2)`, inefficient for sparse graphs (many zeros).
*   **Adjacency List**: An array or map where each index/key `u` stores a list of vertices adjacent to `u`.
    *   **Pros**: Space efficient `O(V + E)`, efficient for sparse graphs, easy to find all neighbors.
    *   **Cons**: `O(V)` worst-case for `(u, v)` edge existence (if not optimized with a `HashSet` per list).

This project primarily uses an **adjacency list** representation (`Map<GraphNode, List<GraphEdge>>`) due to its efficiency for most graph algorithms, especially on sparse graphs common in interview problems.

## 2. Graph Traversal (BFS & DFS)

Graph traversal algorithms are used to visit all the nodes in a graph exactly once, systematically. They form the basis for many other graph algorithms.

### Breadth-First Search (BFS)

**Problem**: Systematically explore all reachable nodes in a graph level by level, starting from a given source node.

**High-Level Idea**:
BFS explores all the neighbor nodes at the current depth level before moving on to the nodes at the next depth level. It uses a **queue** data structure to manage the order of nodes to visit.

**Step-by-Step Logic**:
1.  Create a `queue` and a `visited` set (or boolean array).
2.  Add the `startNode` to the queue and mark it as visited.
3.  While the queue is not empty:
    a.  Dequeue a `currentNode`.
    b.  Process `currentNode` (e.g., add to a result list, print).
    c.  For each `neighbor` of `currentNode`:
        i.  If `neighbor` has not been visited:
            1.  Mark `neighbor` as visited.
            2.  Enqueue `neighbor`.

**Code (`GraphTraversal.java` - `bfs`)**:
The `bfs` method uses `java.util.LinkedList` as a queue and `java.util.HashSet` for visited nodes.

**Time Complexity**:
*   **`O(V + E)`**: Where `V` is the number of vertices and `E` is the number of edges. Each vertex is enqueued/dequeued once, and each edge is examined once.

**Space Complexity**:
*   **`O(V)`**: For the `queue` and `visited` set. In the worst case (e.g., a star graph), all `V` nodes might be in the queue or visited set simultaneously.

**Edge Cases & Gotchas**:
*   **Disconnected Graphs**: BFS will only visit nodes reachable from the `startNode`. To visit all nodes in a disconnected graph, you'd iterate through all nodes and run BFS on any unvisited node.
*   **Self-loops/Parallel Edges**: The `visited` set correctly handles these, preventing infinite loops or redundant processing.
*   **Start node not in graph**: Handled by checking `graph.getAllNodes().contains(startNode)`.

**Interview Tips & Variations**:
*   **Shortest Path in Unweighted Graphs**: BFS naturally finds the shortest path in terms of the number of edges. (Covered in `ShortestPathBFS.java`).
*   **Connectivity**: Determine if a graph is connected.
*   **Level Order Traversal**: Applicable to trees (a special type of graph).
*   **Cycle Detection**: BFS can detect cycles in undirected graphs. If a neighbor is already visited and it's not the immediate parent, a cycle exists.

### Depth-First Search (DFS)

**Problem**: Systematically explore all reachable nodes in a graph by going as deep as possible along each branch before backtracking.

**High-Level Idea**:
DFS explores a path completely to its end before moving on to explore other paths. It uses a **stack** (explicitly or implicitly via recursion) to manage nodes.

**Step-by-Step Logic (Recursive)**:
1.  Create a `visited` set.
2.  Define a recursive helper function `dfs(currentNode)`:
    a.  Mark `currentNode` as visited.
    b.  Process `currentNode`.
    c.  For each `neighbor` of `currentNode`:
        i.  If `neighbor` has not been visited:
            1.  Recursively call `dfs(neighbor)`.
3.  Call `dfs(startNode)`.

**Step-by-Step Logic (Iterative)**:
1.  Create a `stack` and a `visited` set.
2.  Push `startNode` onto the stack and mark it as visited.
3.  While the stack is not empty:
    a.  Pop a `currentNode`.
    b.  Process `currentNode`.
    c.  For each `neighbor` of `currentNode`:
        i.  If `neighbor` has not been visited:
            1.  Mark `neighbor` as visited.
            2.  Push `neighbor` onto the stack.
            *Note*: The order of adding neighbors to the stack can affect the exact traversal order, but not the set of visited nodes. Typically, pushing neighbors in reverse order (compared to their adjacency list order) can mimic the recursive behavior more closely if specific output order is desired.

**Code (`GraphTraversal.java` - `dfsRecursive`, `dfsIterative`)**:
Both recursive and iterative versions are provided. The recursive version uses the call stack implicitly, while the iterative one uses `java.util.Stack` explicitly.

**Time Complexity**:
*   **`O(V + E)`**: Where `V` is the number of vertices and `E` is the number of edges. Each vertex and edge is processed at most once.

**Space Complexity**:
*   **`O(V)`**: For the `recursion stack` (recursive version) or explicit `stack` (iterative version) and the `visited` set. In the worst case (e.g., a long linear path), the stack depth can be `V`.

**Edge Cases & Gotchas**:
*   **Stack Overflow**: Deep recursive calls can lead to stack overflow on very large graphs with long paths. The iterative approach avoids this.
*   **Disconnected Graphs**: Similar to BFS, DFS will only visit reachable nodes.
*   **Start node not in graph**: Handled by checking `graph.getAllNodes().contains(startNode)`.

**Interview Tips & Variations**:
*   **Cycle Detection in Directed Graphs**: (Covered in `CycleDetectionAndTopologicalSort.java`).
*   **Topological Sort**: (Covered in `CycleDetectionAndTopologicalSort.java`).
*   **Finding Connected Components**: Run DFS/BFS from each unvisited node.
*   **Path Finding**: Can find *a* path, but not necessarily the shortest in unweighted graphs.
*   **Strongly Connected Components (SCCs)**: Algorithms like Kosaraju's or Tarjan's use DFS.

---

## 3. Shortest Path in Unweighted Graph (BFS)

**Problem**: Find the shortest path (minimum number of edges) between a source node and a target node in an unweighted graph.

**High-Level Idea**:
BFS naturally explores the graph in "layers" or "levels" starting from the source node. The first time BFS reaches the target node, it guarantees that it has found a path with the minimum number of edges. By keeping track of the predecessor for each node, the path can be reconstructed.

**Step-by-Step Logic**:
1.  Initialize a `queue`, a `visited` set, and a `parentMap` (to store `node -> its_predecessor`).
2.  Enqueue `startNode`, mark it visited, and set its parent to `null`.
3.  While the queue is not empty:
    a.  Dequeue `currentNode`.
    b.  If `currentNode` is the `endNode`, a shortest path has been found. Break the loop.
    c.  For each `neighbor` of `currentNode`:
        i.  If `neighbor` has not been visited:
            1.  Mark `neighbor` as visited.
            2.  Set `parentMap[neighbor] = currentNode`.
            3.  Enqueue `neighbor`.
4.  If `endNode` was reached, reconstruct the path by backtracking from `endNode` using `parentMap` until `startNode` is reached. Reverse the path to get it in correct order.
5.  If `endNode` was not reached, no path exists.

**Code (`ShortestPathBFS.java` - `findShortestPath`)**:
The implementation uses a `Queue` for exploration and a `Map` to store predecessors.

**Time Complexity**:
*   **`O(V + E)`**: BFS itself is `O(V + E)`. Path reconstruction takes `O(V)` in the worst case (a path through all nodes). So, overall `O(V + E)`.

**Space Complexity**:
*   **`O(V)`**: For the `queue`, `visited` set, and `parentMap`.

**Edge Cases & Gotchas**:
*   **No Path**: If `endNode` is unreachable, `parentMap` won't contain it, and an empty list is returned.
*   **Start = End**: If `startNode` is the same as `endNode`, the path is just the `startNode` itself.
*   **Start/End not in graph**: Handled by initial checks.

**Brute Force vs. Optimized**:
A "brute-force" approach to finding the shortest path might involve enumerating all possible paths from source to destination and picking the shortest. This is computationally expensive, often exponential in `V`. BFS is highly optimized for unweighted shortest paths because it explores the graph in increasing order of distance from the source, guaranteeing that the first time a node is reached, it's via the shortest path.

---

## 4. Shortest Path in Weighted Graph (Dijkstra's Algorithm)

**Problem**: Find the shortest paths from a single source node to all other nodes in a weighted graph with **non-negative** edge weights.

**High-Level Idea**:
Dijkstra's algorithm is a greedy algorithm that maintains a set of nodes for which the shortest path from the source has been finalized. It iteratively selects the unvisited node with the smallest known distance from the source, adds it to the set, and then updates (relaxes) the distances to its neighbors. It uses a **priority queue** to efficiently retrieve the node with the minimum distance.

**Step-by-Step Logic**:
1.  Initialize `distances` map (node -> distance from source) with `source` distance 0 and all others `infinity`.
2.  Initialize `predecessors` map (node -> previous node in shortest path) to `null` for all nodes.
3.  Create a `priority queue` that stores `(node, distance)` pairs, ordered by `distance` (min-heap).
4.  Add `(source, 0)` to the priority queue.
5.  While the priority queue is not empty:
    a.  Extract `(currentNode, currentDistance)` with the smallest `currentDistance` from the PQ.
    b.  If `currentDistance` is greater than the already recorded `distances[currentNode]`, continue (this is an outdated entry from the PQ).
    c.  For each `edge` from `currentNode` to `neighbor`:
        i.  Calculate `newDistance = currentDistance + edge.weight`.
        ii. **Relaxation**: If `newDistance` is less than `distances[neighbor]`:
            1.  Update `distances[neighbor] = newDistance`.
            2.  Set `predecessors[neighbor] = currentNode`.
            3.  Add `(neighbor, newDistance)` to the priority queue.

**Code (`DijkstraAlgorithm.java` - `findShortestPaths`)**:
The implementation uses `java.util.PriorityQueue` to manage nodes by their current shortest distance and `java.util.HashMap` for `distances` and `predecessors`.

**Time Complexity**:
*   Using a binary heap (like Java's `PriorityQueue`): **`O(E log V)`** or **`O(E + V log V)`**. Each edge relaxation involves a potential `decrease-key` operation (implicitly, by adding a new entry to the PQ) taking `O(log V)`, and there are `E` edges. Each node extraction takes `O(log V)`.
*   With a Fibonacci heap (not commonly implemented in interviews): `O(E + V log V)`.

**Space Complexity**:
*   **`O(V + E)`**: For `distances` map (`O(V)`), `predecessors` map (`O(V)`), and `priority queue` (`O(E)` in worst case if all edges lead to unique distance entries for the same node).

**Edge Cases & Gotchas**:
*   **Negative Edge Weights**: Dijkstra's algorithm *does not work correctly* with negative edge weights or negative cycles. It will throw an `IllegalArgumentException` in this implementation. For graphs with negative weights, Bellman-Ford algorithm or SPFA (Shortest Path Faster Algorithm) should be used.
*   **Disconnected Graphs**: Dijkstra's will correctly find shortest paths to all reachable nodes. Unreachable nodes will retain their `infinity` distance.
*   **Start node not in graph**: Handled by initial checks.

**Brute Force vs. Optimized**:
A brute-force approach for weighted shortest paths would be to enumerate all simple paths from source to all other nodes, calculate their total weights, and pick the minimum. This is exponential `O(V!)` and highly impractical. Dijkstra's is a highly optimized greedy approach.

---

## 5. Cycle Detection and Topological Sort

These algorithms are primarily relevant for **directed graphs**.

### Cycle Detection

**Problem**: Determine if a directed graph contains a cycle.

**High-Level Idea**:
A cycle in a directed graph can be detected using DFS. During a DFS traversal, we keep track of three states for each node:
1.  **UNVISITED**: Node has not been visited yet.
2.  **VISITING**: Node is currently in the recursion stack (part of the current DFS path).
3.  **VISITED**: Node has been completely explored (all its descendants visited and popped from stack).

If, during DFS from a `currentNode`, we encounter a `neighbor` that is in the **VISITING** state, it means we have found a back edge to a node already in the current path, hence a cycle exists.

**Step-by-Step Logic (DFS-based)**:
1.  Initialize a `state` map for all nodes to **UNVISITED**.
2.  For each `node` in the graph (to handle disconnected components):
    a.  If `node` is **UNVISITED**:
        i.  Call a recursive `dfsCheckCycle(node)` helper.
        ii. If `dfsCheckCycle` returns `true`, a cycle is found.
3.  `dfsCheckCycle(currentNode)`:
    a.  Set `state[currentNode] = VISITING`.
    b.  For each `neighbor` of `currentNode`:
        i.  If `state[neighbor] == VISITING`: Return `true` (cycle detected).
        ii. If `state[neighbor] == UNVISITED`:
            1.  If `dfsCheckCycle(neighbor)` returns `true`: Return `true` (cycle in deeper path).
    c.  Set `state[currentNode] = VISITED`.
    d.  Return `false`.

**Code (`CycleDetectionAndTopologicalSort.java` - `hasCycle`, `dfsCheckCycle`)**:
Uses an enum `NodeState` to track the three states.

**Time Complexity**:
*   **`O(V + E)`**: Standard DFS complexity. Each node and edge is processed once.

**Space Complexity**:
*   **`O(V)`**: For the `recursion stack` and the `state` map.

**Edge Cases & Gotchas**:
*   **Undirected Graphs**: This specific state-based DFS logic is for directed graphs. For undirected graphs, a cycle is detected if you visit an already visited node that is not the immediate parent of the current node. This algorithm throws `IllegalArgumentException` for undirected graphs.
*   **Disconnected Components**: The outer loop ensures all components are checked.

### Topological Sort (DFS-based)

**Problem**: For a Directed Acyclic Graph (DAG), produce a linear ordering of its vertices such that for every directed edge `(u, v)`, vertex `u` comes before `v` in the ordering. This is not possible if the graph has a cycle.

**High-Level Idea**:
The DFS-based topological sort relies on the fact that in a DAG, if we traverse a path `u -> ... -> v`, node `v` must be processed before `u` in the topological order. This means that a node should be added to the topological sort list *after* all of its dependencies (nodes reachable from it) have been processed. This is exactly what happens when nodes are finished (all descendants explored) during a DFS traversal. If we push nodes onto a stack in their "post-order" (after all neighbors are visited), popping them will give a valid topological order.

**Step-by-Step Logic (DFS-based)**:
1.  Initialize a `state` map for all nodes to **UNVISITED** (same as cycle detection).
2.  Create an empty `stack` to store the topological order.
3.  For each `node` in the graph:
    a.  If `node` is **UNVISITED**:
        i.  Call a recursive `dfsTopologicalSort(node)` helper.
        ii. If `dfsTopologicalSort` returns `true` (indicating a cycle), throw an exception.
4.  Pop nodes from the `stack` one by one into a result list. This reversed order is the topological sort.

5.  `dfsTopologicalSort(currentNode)`:
    a.  Set `state[currentNode] = VISITING`.
    b.  For each `neighbor` of `currentNode`:
        i.  If `state[neighbor] == VISITING`: Return `true` (cycle detected).
        ii. If `state[neighbor] == UNVISITED`:
            1.  If `dfsTopologicalSort(neighbor)` returns `true`: Return `true` (cycle in deeper path).
    c.  Set `state[currentNode] = VISITED`.
    d.  **Push `currentNode` onto the stack.** (This happens only after all its children/descendants have been processed).
    e.  Return `false`.

**Code (`CycleDetectionAndTopologicalSort.java` - `topologicalSort`, `dfsTopologicalSort`)**:
This method combines cycle detection with the stack-based topological sort.

**Time Complexity**:
*   **`O(V + E)`**: Standard DFS complexity.

**Space Complexity**:
*   **`O(V)`**: For `recursion stack`, `state` map, and the `stack` holding the result.

**Edge Cases & Gotchas**:
*   **Cycles**: Throws an `IllegalArgumentException` if a cycle is detected.
*   **Disconnected DAGs**: The outer loop ensures all components are correctly sorted.
*   **Multiple Valid Orders**: For some DAGs, multiple topological orders are possible. This algorithm produces one specific valid order depending on the traversal order of neighbors.

### Topological Sort (Kahn's / BFS-based)

**Problem**: Same as above, but using a different approach.

**High-Level Idea**:
Kahn's algorithm is an iterative, BFS-based approach. It relies on the concept of **in-degree** (the number of incoming edges to a node). In a topological sort, nodes with an in-degree of zero can be processed first. Once a node is processed, its outgoing edges are "removed", decrementing the in-degree of its neighbors. This process continues until all nodes are processed.

**Step-by-Step Logic**:
1.  Calculate the `in-degree` for every node in the graph. Store in a map.
2.  Create a `queue` and add all nodes with an `in-degree` of 0 to it.
3.  Initialize an empty `result` list and a `count` of visited nodes.
4.  While the queue is not empty:
    a.  Dequeue `currentNode`.
    b.  Add `currentNode` to the `result` list.
    c.  Increment `count`.
    d.  For each `neighbor` of `currentNode`:
        i.  Decrement `in-degree[neighbor]`.
        ii. If `in-degree[neighbor]` becomes 0, enqueue `neighbor`.
5.  After the loop, if `count` is less than the total number of nodes in the graph, it implies a cycle was present (some nodes could not reach an in-degree of 0), so throw an exception. Otherwise, `result` contains the topological order.

**Code (`CycleDetectionAndTopologicalSort.java` - `topologicalSortKahn`)**:
This provides an alternative, iterative implementation for topological sort.

**Time Complexity**:
*   **`O(V + E)`**: Calculating in-degrees takes `O(V + E)`. The main loop processes each node and edge once.

**Space Complexity**:
*   **`O(V)`**: For `in-degree` map, `queue`, and `result` list.

**Edge Cases & Gotchas**:
*   **Cycles**: If `visitedNodesCount` is not equal to `graph.size()` at the end, a cycle exists.
*   **Multiple Valid Orders**: Similar to DFS-based, this can produce different valid orders depending on the order in which nodes are added to the queue when their in-degree becomes zero.

**Brute Force vs. Optimized**:
For cycle detection, a "brute-force" approach might involve checking all permutations of nodes for paths that return to the start, which is factorial. DFS with states is the standard optimal approach.
For topological sort, Kahn's algorithm (BFS-based) and the DFS-based approach are both optimal for DAGs. There isn't a practical "brute force" that would generate all possible orderings and then validate them against graph edges, as the number of permutations is `V!`.

---

## 6. Minimum Spanning Tree (Prim's Algorithm)

**Problem**: Given a connected, edge-weighted undirected graph, find a subset of the edges that connects all the vertices together, without any cycles and with the minimum possible total edge weight. This subset of edges forms a Minimum Spanning Tree (MST).

**High-Level Idea**:
Prim's algorithm is a greedy algorithm that builds an MST by starting from an arbitrary node and incrementally adding the "cheapest" edge that connects a node in the growing MST to a node outside the MST, without forming a cycle. It also uses a **priority queue** to efficiently find this cheapest edge.

**Step-by-Step Logic**:
1.  Initialize an empty `mstEdges` list to store the edges of the MST.
2.  Initialize a `visited` set to keep track of nodes already included in the MST.
3.  Create a `priority queue` that stores `PrimEdge` objects (representing `(source, destination, weight)`), ordered by `weight` (min-heap). These are "candidate edges" from nodes *in* the MST to nodes *outside* the MST.
4.  Choose an arbitrary `startNode` from the graph.
5.  Add `startNode` to the `visited` set.
6.  For each `edge` connected to `startNode`:
    a.  Add it to the `priority queue`.
7.  While the priority queue is not empty AND the `visited` set does not contain all nodes:
    a.  Extract the `currentPrimEdge` with the minimum `weight` from the PQ.
    b.  Let `u` be one endpoint and `v` be the other endpoint of `currentPrimEdge`.
    c.  Determine `nodeToAddToMST` - this is the node among `u` and `v` that is *not* yet in `visited`. If both are in `visited`, this edge would form a cycle, so skip it.
    d.  Add `currentPrimEdge` to `mstEdges`.
    e.  Add `nodeToAddToMST` to `visited`.
    f.  For each `edge` connected to `nodeToAddToMST`:
        i.  If the `neighbor` of `nodeToAddToMST` through this edge is *not* in `visited`:
            1.  Add this `edge` to the `priority queue`.

**Code (`PrimAlgorithm.java` - `findMinimumSpanningTree`)**:
Uses a custom `PrimEdge` class and `java.util.PriorityQueue`.

**Time Complexity**:
*   Using a binary heap (like Java's `PriorityQueue`): **`O(E log V)`** or **`O(E + V log V)`**. Each edge addition to PQ takes `O(log V)`, and each extraction takes `O(log V)`.
*   With a Fibonacci heap: `O(E + V log V)`.

**Space Complexity**:
*   **`O(V + E)`**: For `visited` set (`O(V)`), `mstEdges` list (`O(V)` as MST has `V-1` edges), and `priority queue` (`O(E)` in worst case, as an edge could be added multiple times before being processed).

**Edge Cases & Gotchas**:
*   **Directed Graphs**: Prim's algorithm is specifically for undirected graphs. The implementation throws an `IllegalArgumentException` for directed graphs.
*   **Disconnected Graphs**: If the graph is disconnected, Prim's will find an MST only for the connected component reachable from the `startNode`. The returned `mstEdges` list will contain `V_component - 1` edges, where `V_component` is the number of nodes in that component, not the total nodes in the graph. The code includes a warning for this. To find a Minimum Spanning Forest (MSF) for a disconnected graph, Prim's would need to be run for each unvisited connected component.
*   **Empty Graph/Single Node**: Handled correctly, returning an empty list of edges.
*   **Negative Edge Weights**: Prim's algorithm works correctly with negative edge weights as long as there are no negative cycles (which are not relevant in MSTs anyway as MSTs are acyclic by definition). However, Bellman-Ford or similar shortest path algorithms are not needed.

**Brute Force vs. Optimized**:
A brute-force approach to finding an MST would involve generating all possible spanning trees, calculating their total weights, and picking the minimum. The number of spanning trees can be extremely large (Kirchhoff's matrix tree theorem gives a way to count them, but not enumerate). This is computationally infeasible. Prim's (and Kruskal's) are optimal greedy algorithms for this problem.

---

## 7. General Interview Tips and Best Practices

1.  **Understand the Problem**:
    *   **Graph Type**: Directed or Undirected? Ask!
    *   **Weighted/Unweighted**: Does the length of an edge matter?
    *   **Cycles**: Are cycles possible? Are they allowed? Is it a DAG?
    *   **Connectivity**: Is the graph guaranteed to be connected? What about disconnected components?
    *   **Constraints**: Number of nodes/edges (V, E). This guides complexity analysis.
    *   **Data Representation**: How are nodes/edges given? (Adjacency list, matrix, list of edges).

2.  **Choose the Right Algorithm**:
    *   **Shortest Path**:
        *   Unweighted: BFS (`O(V+E)`)
        *   Weighted, Non-negative weights: Dijkstra's (`O(E log V)`)
        *   Weighted, Negative weights (no negative cycles): Bellman-Ford (`O(V*E)`)
        *   All-Pairs Shortest Path: Floyd-Warshall (`O(V^3)`)
    *   **Traversal**: BFS, DFS for reachability, exploring components.
    *   **Cycle Detection**: DFS with states (directed), BFS/DFS with parent tracking (undirected).
    *   **Topological Sort**: DFS-based (stack) or Kahn's (BFS-based, in-degree). Only for DAGs.
    *   **MST**: Prim's or Kruskal's (`O(E log E)` or `O(E log V)`). Only for undirected, weighted graphs.
    *   **Connectivity/Components**: DFS/BFS.

3.  **Data Structures**:
    *   **Graph Representation**: Adjacency List (`Map<Node, List<Edge>>`) is generally preferred for its `O(V+E)` space complexity and `O(deg(u))` neighbor lookup, especially for sparse graphs. Adjacency Matrix (`V x V` array) is `O(V^2)` space, good for dense graphs or `O(1)` edge existence checks.
    *   **Traversal**: `Queue` for BFS, `Stack` (or recursion) for DFS.
    *   **Visited Tracking**: `Set<Node>` or `boolean[]` for `Node.id` to avoid cycles and redundant work.
    *   **Priority Queue**: For Dijkstra's and Prim's.

4.  **Common Pitfalls**:
    *   **Infinite Loops/Cycles**: Forget to use a `visited` set.
    *   **Disconnected Components**: Algorithms often only process the component reachable from the start. Remember to loop through all nodes and start the algorithm on unvisited ones if all components need to be covered.
    *   **Negative Cycles**: Algorithms like Dijkstra's fail. Bellman-Ford detects them.
    *   **Stack Overflow**: Recursive DFS on deep graphs. Consider iterative DFS.
    *   **Off-by-one errors**: Especially with array indexing.
    *   **Cloning Graph**: Be careful when modifying a graph during traversal. If you need original structure, clone.
    *   **Immutability**: Ensure `GraphNode` `equals()` and `hashCode()` are correctly implemented if using them as map keys or in sets. (Handled in this project).

5.  **Talk Through Your Approach**:
    *   **Initial Thoughts**: How would you approach it intuitively?
    *   **Algorithm Choice**: Why are you choosing BFS/DFS/Dijkstra's etc.?
    *   **Data Structures**: Which ones will you use and why?
    *   **Walkthrough**: Trace your algorithm with a small example.
    *   **Complexity Analysis**: State Time and Space Complexity with Big O notation.

6.  **Optimizations**:
    *   Can you reduce space? (e.g., if problem allows modifying input, reuse `visited` array).
    *   Can you reduce time? (e.g., using a more efficient priority queue if `E log V` is too slow).
    *   Is there a special property of the graph (e.g., tree, DAG, planar) that allows for a simpler/faster solution?

7.  **Testing**:
    *   **Base cases**: Empty graph, single node graph.
    *   **Typical cases**: Small, medium graphs.
    *   **Edge cases**: Disconnected, dense, sparse, cycles (where appropriate), no path/MST.
    *   **Constraints**: Max V, E.

By following these guidelines and studying the provided implementations and documentation, you should be well-prepared to tackle graph algorithm questions in coding interviews.

---

## Diagrams

For visual diagrams using ASCII art, please refer to the `Diagrams.md` file. It includes illustrations of example graphs, traversal paths, and algorithm steps to aid understanding.
```