# Graph Algorithms Explained

This document provides a deeper dive into the graph algorithms implemented in this project, explaining their core concepts, steps, and why they work.

---

## 1. Breadth-First Search (BFS) for Shortest Path in Unweighted Graph

### Concept
BFS is a graph traversal algorithm that explores all the neighbor nodes at the present depth before moving on to the nodes at the next depth level. It systematically "broadcasts" its search outwards from a starting node.

### How it Works (for Shortest Path)
1.  **Initialization**:
    *   Start at a `startNode`.
    *   Maintain a `queue` to store nodes to visit.
    *   Maintain a `visited` set to prevent cycles and re-processing nodes.
    *   Maintain a `distance` map to store the shortest distance from `startNode` to every other node.
    *   Enqueue `startNode`, mark it `visited`, and set its `distance` to 0.
2.  **Traversal**:
    *   While the `queue` is not empty:
        *   Dequeue a `currentNode`.
        *   If `currentNode` is the `endNode`, its `distance` is the shortest path length. Return it.
        *   For each `neighbor` of `currentNode`:
            *   If `neighbor` has not been `visited`:
                *   Mark `neighbor` as `visited`.
                *   Set `distance[neighbor] = distance[currentNode] + 1`.
                *   Enqueue `neighbor`.
3.  **Result**: If the `endNode` is found, its recorded distance is the shortest path length. If the queue becomes empty and `endNode` was never reached, it means there is no path.

### Why it Guarantees Shortest Path (Unweighted)
BFS explores nodes layer by layer. All nodes at distance `k` from the `startNode` are visited before any node at distance `k+1`. This ensures that the first time `endNode` is discovered, it must be through a path of the minimum possible number of edges.

### Time and Space Complexity
*   **Time Complexity**: `O(V + E)`, where V is the number of vertices and E is the number of edges.
    *   Each vertex is visited (added to queue and dequeued) at most once.
    *   Each edge is examined at most twice (once for each direction in an undirected graph, once for directed).
*   **Space Complexity**: `O(V)`
    *   The `queue` can hold up to `V` nodes in the worst case (e.g., a star graph where all leaves are neighbors of the center).
    *   The `visited` set and `distance` map store information for up to `V` nodes.

### Edge Cases and Gotchas
*   **Disconnected Graph**: If `endNode` is in a different component, BFS will finish without reaching it, returning -1.
*   **Start = End**: Path length is 0.
*   **Non-existent Nodes**: Handled by returning -1 or `null`.
*   **Weighted Graphs**: BFS does *not* guarantee the shortest path in weighted graphs. Dijkstra's algorithm is required for that.

### Interview Tips and Variations
*   **Path Reconstruction**: Instead of just length, interviews often ask for the actual path. This requires storing a `predecessor` map (or `parent` pointers) during BFS, then backtracking from `endNode` to `startNode`.
*   **Multi-source BFS**: Find the shortest distance from *any* of a set of start nodes. Initialize the queue with all start nodes, and their distances to 0.
*   **0-1 BFS**: A variation for graphs with only 0 or 1 edge weights, using a deque instead of a queue.
*   **Applications**: Finding shortest paths (unweighted), connectivity, checking bipartiteness, web crawlers, garbage collection.

---

## 2. Depth-First Search (DFS) for Cycle Detection in Directed Graph

### Concept
DFS is a graph traversal algorithm that explores as far as possible along each branch before backtracking. It dives deep into the graph, following one path until it hits a dead end, then backtracks to explore other paths.

### How it Works (for Cycle Detection in Directed Graphs)
For directed graphs, cycle detection using DFS relies on node states to identify back-edges.
1.  **Node States**: During DFS, each node can be in one of three states:
    *   `UNVISITED`: The node has not been encountered yet.
    *   `VISITING`: The node is currently in the recursion stack (i.e., we are exploring its descendants). This is also sometimes called "gray" or "on-stack".
    *   `VISITED`: The node has been completely processed, and all its descendants have been explored. This is also sometimes called "black".
2.  **Initialization**:
    *   Initialize all nodes to `UNVISITED`.
    *   Iterate through all nodes. If an `UNVISITED` node is found, start a DFS traversal from it (this handles disconnected components).
3.  **DFS Traversal (`dfsVisit` function)**:
    *   When visiting `currentNode`:
        *   Mark `currentNode` as `VISITING`.
        *   For each `neighbor` of `currentNode`:
            *   If `neighbor` is `VISITING`: A back-edge is found! This means `neighbor` is an ancestor of `currentNode` in the current DFS path, so we've found a cycle. Return `true`.
            *   If `neighbor` is `UNVISITED`: Recursively call `dfsVisit` on `neighbor`. If the recursive call returns `true` (found a cycle), propagate `true` upwards.
            *   If `neighbor` is `VISITED`: Ignore it. It's already fully processed and won't lead to a cycle from this path.
    *   After exploring all neighbors, mark `currentNode` as `VISITED` (it's no longer in the recursion stack). Return `false` (no cycle found through this particular path).

### Why it Works
A cycle `A -> B -> C -> A` means that when DFS explores `A`, it moves to `B`, then `C`. From `C`, if it encounters `A` again while `A` is still in the `VISITING` state (i.e., `A` is an ancestor in the current DFS tree), then a cycle is detected. If `A` were already `VISITED`, it would mean `A` was part of a previously explored branch and is not an ancestor in the current path.

### Time and Space Complexity
*   **Time Complexity**: `O(V + E)`
    *   Each vertex is processed once (visited, then marked visited).
    *   Each edge is examined once.
*   **Space Complexity**: `O(V)`
    *   `nodeStates` map: Stores state for all `V` nodes.
    *   Recursion stack: In the worst case (a long path without cycles), it can go `V` deep. For iterative DFS, this is explicit `stack` data structure.

### Edge Cases and Gotchas
*   **Self-Loops**: `A -> A` is a cycle, detected because `A` will be `VISITING` when its neighbor `A` is examined.
*   **Parallel Edges**: Handled correctly.
*   **Disconnected Components**: The outer loop that iterates through all `UNVISITED` nodes ensures all components are checked.
*   **Undirected Graphs**: This specific algorithm for directed graphs would incorrectly find cycles in undirected graphs (e.g., `A-B` would be treated as `A->B` and `B->A`, forming a cycle). For undirected graphs, cycle detection typically involves passing the parent node to DFS and ensuring a back-edge doesn't point to the immediate parent.

### Interview Tips and Variations
*   **Iterative vs. Recursive DFS**: The project includes both. Iterative DFS can be more challenging to implement but avoids potential stack overflow issues for very deep graphs.
*   **Topological Sort**: A directed acyclic graph (DAG) can be topologically sorted. A cycle detection algorithm is often a prerequisite, as topological sort is only possible on DAGs. If a cycle is detected, topological sort is impossible.
*   **Finding all cycles**: More complex, typically involves storing paths and careful backtracking.
*   **DFS applications**: Topological sort, strongly connected components, finding paths, maze solving.

---

## 3. Dijkstra's Algorithm for Shortest Path in Weighted Graph

### Concept
Dijkstra's algorithm finds the shortest paths from a single source node to all other nodes in a weighted graph, where all edge weights are non-negative. It operates like a "greedy" BFS, always extending the shortest path found so far to an unvisited neighbor.

### How it Works
1.  **Initialization**:
    *   Start at a `startNode`.
    *   Maintain a `distances` map: stores the shortest distance from `startNode` to every other node. Initialize `distances[startNode] = 0` and all other `distances` to `Infinity`.
    *   Maintain a `previousNodes` map: stores the predecessor of each node in the shortest path (useful for path reconstruction). Initialize all to `null`.
    *   Use a `Min-Priority Queue`: Stores nodes to be processed, prioritized by their current shortest distance. Enqueue `(startNode, 0)`.
2.  **Processing**:
    *   While the `priority queue` is not empty:
        *   Dequeue the `currentNode` with the smallest `currentDistance`.
        *   **Optimization**: If `currentDistance > distances[currentNode]`, this means we've already found a shorter path to `currentNode` and processed it. Skip this entry (it's a stale entry in the PQ).
        *   For each `neighbor` of `currentNode`:
            *   Calculate `newDistance = currentDistance + weight(currentNode, neighbor)`.
            *   If `newDistance < distances[neighbor]`:
                *   Update `distances[neighbor] = newDistance`.
                *   Set `previousNodes[neighbor] = currentNode`.
                *   Enqueue `(neighbor, newDistance)` into the `priority queue`.
3.  **Result**: The `distances` map contains the shortest distances from `startNode` to all reachable nodes. Unreachable nodes will have `Infinity`. The `previousNodes` map can be used to reconstruct any shortest path.

### Why it Works
Dijkstra's greedy approach works because of the non-negative edge weight constraint. When a node `u` is extracted from the priority queue, it's guaranteed that `distances[u]` holds the true shortest distance from the source. Any other path to `u` would have involved edges with positive weights, thus being longer, or would have already been processed if it was shorter. This property allows us to "finalize" the distance to `u` and then relax its outgoing edges.

### Time and Space Complexity
*   **Time Complexity**: `O(E log V)` or `O(E + V log V)` when using a binary heap for the priority queue.
    *   `V` extractions from the priority queue (each `log V`).
    *   `E` edge relaxations (each potentially an `enqueue` or `decrease-key` operation in PQ, which is `log V`).
    *   Total: `V log V + E log V = (V + E) log V`. Since `E` can be up to `V^2` (dense graph), this is often simplified to `O(E log V)`.
*   **Space Complexity**: `O(V + E)`
    *   `distances`, `previousNodes`: `O(V)`.
    *   `priorityQueue`: `O(V)` in the worst case (all nodes might be in the PQ).
    *   Adjacency List: `O(V + E)`.

### Edge Cases and Gotchas
*   **Negative Edge Weights**: Dijkstra's algorithm *fails* with negative edge weights or negative cycles. For such graphs, the Bellman-Ford algorithm is used.
*   **Disconnected Graph**: Nodes in disconnected components from `startNode` will retain `Infinity` distance.
*   **Non-existent Start Node**: Handled gracefully by returning an empty map.
*   **Large Graphs**: The `log V` factor can be significant for very large graphs; a Fibonacci heap can improve the theoretical complexity to `O(E + V log V)` but is rarely implemented in practice due to higher constant factors.

### Interview Tips and Variations
*   **Path Reconstruction**: Always be prepared to implement `reconstructPath` using the `previousNodes` map.
*   **Single Target**: If only the shortest path to a specific `endNode` is needed, the algorithm can be terminated once `endNode` is dequeued from the priority queue.
*   **Variations**:
    *   **Uniform Cost Search**: Dijkstra's is a form of Uniform Cost Search.
    *   **A* Search**: An informed search algorithm that uses a heuristic function to guide Dijkstra's towards the target, often faster for single-source, single-target problems.
*   **Applications**: GPS navigation, network routing protocols (OSPF, IS-IS), finding closest points of interest, resource allocation.

---

## 4. Kruskal's Algorithm for Minimum Spanning Tree (MST)

### Concept
Kruskal's algorithm finds a Minimum Spanning Tree (MST) for a connected, undirected, weighted graph. An MST is a subset of the graph's edges that connects all the vertices together, without any cycles and with the minimum possible total edge weight. If the graph is disconnected, Kruskal's finds a Minimum Spanning Forest (MSF), which is an MST for each connected component.

### How it Works
Kruskal's is a greedy algorithm that builds the MST by adding edges one by one, always picking the lightest available edge that does not form a cycle with already chosen edges.

1.  **Initialization**:
    *   Create a list of all edges in the graph.
    *   Initialize a `Union-Find` (Disjoint Set Union) data structure. Each vertex is initially in its own separate set. The `Union-Find` will be used to efficiently check for cycles.
2.  **Edge Sorting**:
    *   Sort all edges in the graph by their weight in ascending order.
3.  **Iterative Edge Selection**:
    *   Iterate through the sorted edges: `(u, v, weight)`
        *   Use `Union-Find` to check if `u` and `v` are already in the same connected component (i.e., `unionFind.areConnected(u, v)`).
        *   If `u` and `v` are **not** connected (adding this edge will not form a cycle):
            *   Add the edge `(u, v, weight)` to the MST.
            *   Add `weight` to the total MST weight.
            *   Merge the sets containing `u` and `v` using `unionFind.union(u, v)`.
        *   If `u` and `v` **are** already connected (adding this edge would form a cycle):
            *   Skip this edge.
4.  **Termination**:
    *   The algorithm stops when `V-1` edges have been added to the MST (for a connected graph with `V` vertices) or when all edges have been processed.

### Why it Works
*   **Greedy Choice Property**: At each step, choosing the lightest edge that connects two previously disconnected components is locally optimal. This property ensures that Kruskal's leads to a globally optimal solution (an MST).
*   **Cut Property**: If you partition the vertices of a graph into two disjoint sets (a "cut"), and if an edge is the minimum weight edge crossing that cut, then that edge must be part of *some* MST. Kruskal's effectively explores many such cuts by considering edges in increasing order of weight.
*   **Cycle Property**: An edge `(u, v)` with weight `w` is part of an MST if and only if there is no path between `u` and `v` consisting solely of edges with weights strictly less than `w`. Kruskal's prioritizes lower-weight edges and only adds an edge if it connects two previously separate components, naturally avoiding cycles with lower-weight edges.

### Time and Space Complexity
*   **Time Complexity**: `O(E log E)` or `O(E log V)`
    *   Sorting all `E` edges takes `O(E log E)` time. Since `E` can be at most `V*(V-1)/2`, `log E` is `O(log V)`. Thus, `O(E log E)` is often equivalent to `O(E log V)`.
    *   The loop iterates `E` times. Each `union` and `find` operation with path compression and union by rank/size in the `Union-Find` data structure takes amortized `O(α(V))` time, where `α` is the inverse Ackermann function, which is practically a constant (very small number) for any realistic number of vertices `V`.
    *   Total time complexity is dominated by the sorting step: `O(E log E)`.
*   **Space Complexity**: `O(V + E)`
    *   `allEdges`: `O(E)` to store all edges.
    *   `Union-Find` data structure: `O(V)` to store `parent` and `rank` for `V` vertices.
    *   `mstEdges`: `O(V)` as an MST for `V` vertices has exactly `V-1` edges.

### Edge Cases and Gotchas
*   **Disconnected Graphs**: Kruskal's will correctly find a Minimum Spanning Forest (MSF), which is an MST for each connected component. The total number of edges in the MSF will be `V - C`, where `C` is the number of connected components.
*   **Graph with few edges**: Kruskal's is often preferred over Prim's algorithm for sparse graphs (E is much smaller than V^2) because of the `E log E` vs `E log V` time complexity relationship.
*   **Duplicate Edge Weights**: If multiple edges have the same weight, the choice between them might vary, but the total MST weight will remain the same. The set of edges in the MST might differ, but its properties won't.

### Interview Tips and Variations
*   **Union-Find**: Understanding and being able to implement Union-Find (with path compression and union by rank/size) is crucial for Kruskal's.
*   **Prim's Algorithm**: The other major MST algorithm. Prim's is generally better for dense graphs (E is closer to V^2) and is similar in structure to Dijkstra's, using a priority queue to grow the MST from a single starting vertex. Be ready to compare/contrast Kruskal's and Prim's.
*   **Applications**: Network design, cluster analysis, image segmentation, circuit design.

---
**General Advice for Graph Interviews:**
*   **Clarify Constraints**: Always ask about graph type (directed/undirected), weights (positive/negative/none), number of nodes/edges, and if cycles are present.
*   **Representation**: Understand adjacency list vs. adjacency matrix and when to use which (adjacency list for sparse graphs, matrix for dense or when quick `hasEdge` check is needed). Adjacency list is more common.
*   **Traversal**: BFS and DFS are fundamental. Know when to use each. BFS for shortest path (unweighted), DFS for connectivity, cycle detection, topological sort.
*   **Complexity**: Be ready to analyze time and space complexity for your solution and explain your reasoning.
*   **Edge Cases**: Empty graph, single node, disconnected components, self-loops, parallel edges.
*   **Dry Run**: Walk through your algorithm with a small example to demonstrate understanding and catch bugs.
*   **Communication**: Articulate your thought process, discuss trade-offs, and explain choices.