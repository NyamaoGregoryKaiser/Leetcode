```markdown
# Graph Algorithm Explanations

This document provides a detailed explanation of the graph algorithms implemented in this project. For each algorithm, we cover its core concept, step-by-step logic, time and space complexity analysis, and important considerations.

---

## 1. Shortest Path in Unweighted Graph (BFS)

### Concept
Breadth-First Search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root (or some arbitrary node of a graph, sometimes referred to as a 'search key'), and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.

When applied to an **unweighted graph**, BFS finds the shortest path (in terms of the number of edges) from a source node to all other reachable nodes. This is because BFS explores nodes layer by layer, ensuring that the first time a node is visited, it is reached via the minimum number of edges.

### Algorithm Logic (Step-by-Step)

1.  **Initialization**:
    *   Create a `distance` array (or map) initialized to `infinity` for all nodes, and `0` for the source node `s`.
    *   Create a `parent` array (or map) to reconstruct the path, initialized to `null` or `-1`.
    *   Create a `visited` array (or set) to keep track of visited nodes, initialized to `false` for all nodes. Mark `s` as visited.
    *   Create an empty `queue` and add the source node `s` to it.

2.  **Traversal**:
    *   While the `queue` is not empty:
        *   Dequeue a node `u`.
        *   For each unvisited neighbor `v` of `u`:
            *   Mark `v` as visited.
            *   Set `distance[v] = distance[u] + 1`.
            *   Set `parent[v] = u`.
            *   Enqueue `v`.

3.  **Result**: After the BFS completes, `distance[d]` will contain the shortest path length from `s` to `d`. The path itself can be reconstructed by backtracking from `d` using the `parent` array until `s` is reached.

### ASCII Diagram Example

Consider an unweighted graph:
```
(0)---(1)
 |     |
(2)---(3)
```
BFS from source `0` to destination `3`:

*   **Start:** `Q = [0]`, `dist = {0:0, 1:inf, 2:inf, 3:inf}`
*   **Dequeue 0:** Neighbors of 0: 1, 2
    *   Visit 1: `dist[1]=1`, `parent[1]=0`, `Q = [1]`
    *   Visit 2: `dist[2]=1`, `parent[2]=0`, `Q = [1, 2]`
*   **Dequeue 1:** Neighbors of 1: 0 (visited), 3
    *   Visit 3: `dist[3]=2`, `parent[3]=1`, `Q = [2, 3]`
*   **Dequeue 2:** Neighbors of 2: 0 (visited), 3 (visited)
    *   `Q = [3]`
*   **Dequeue 3:** Neighbors of 3: 1 (visited), 2 (visited)
    *   `Q = []`

Shortest distance to 3 is 2. Path: `0 -> 1 -> 3`.

### Time and Space Complexity

*   **Time Complexity:** O(V + E)
    *   Each vertex is enqueued and dequeued at most once.
    *   Each edge is examined at most twice (once for each direction in an undirected graph, once for a directed edge).
    *   V = Number of vertices, E = Number of edges.
*   **Space Complexity:** O(V + E)
    *   `queue`: Stores at most O(V) vertices.
    *   `distance`, `parent`, `visited` arrays: O(V) space.
    *   Adjacency list: O(V + E) space.

### Edge Cases and Gotchas

*   **Disconnected Graph:** If the destination is unreachable from the source, its distance will remain `infinity` (or `std::numeric_limits<int>::max()`).
*   **Source = Destination:** The distance should be `0`, and the path is just the source node itself.
*   **Empty Graph/Single Node Graph:** Handled correctly; BFS will simply process the source and terminate.

---

## 2. Dijkstra's Algorithm (Shortest Path in Weighted Graph)

### Concept
Dijkstra's algorithm finds the shortest paths from a single source node to all other nodes in a graph with **non-negative edge weights**. It's a greedy algorithm that works by iteratively expanding the set of nodes for which the shortest path from the source has been definitively determined.

It's similar to BFS but uses a priority queue to always extract the vertex with the smallest known distance from the source, ensuring that paths are always extended optimally.

### Algorithm Logic (Step-by-Step)

1.  **Initialization**:
    *   Create a `distance` array (or map) initialized to `infinity` for all nodes, and `0` for the source node `s`.
    *   Create a `parent` array (or map) to reconstruct paths, initialized to `null` or `-1`.
    *   Create a `min-priority queue` and add the pair `{0, s}` (distance, node) to it.

2.  **Traversal**:
    *   While the `priority queue` is not empty:
        *   Extract the node `u` with the smallest `current_dist` from the `priority queue`.
        *   If `current_dist > distance[u]`, continue (this means we've found a shorter path to `u` already, so this older entry is stale).
        *   For each neighbor `v` of `u` with edge weight `w`:
            *   Calculate `new_dist = distance[u] + w`.
            *   If `new_dist < distance[v]`:
                *   Update `distance[v] = new_dist`.
                *   Set `parent[v] = u`.
                *   Add the pair `{new_dist, v}` to the `priority queue`.

3.  **Result**: After the algorithm completes, `distance[d]` will contain the shortest path length from `s` to `d`.

### ASCII Diagram Example

Consider a weighted directed graph:
```
      2
(0) ----> (1)
 | \     /|
1|  \   / |3
 |   5 /  |
 V    \/  V
(2) <---- (3)
      1
```
Dijkstra from source `0`:

*   **Start:** `PQ = [{0,0}]`, `dist = {0:0, 1:inf, 2:inf, 3:inf}`
*   **Extract {0,0}:**
    *   Edge 0->1 (weight 2): `new_dist = 0+2 = 2`. `2 < dist[1]` (inf). `dist[1]=2`, `parent[1]=0`. `PQ.push({2,1})`.
    *   Edge 0->2 (weight 1): `new_dist = 0+1 = 1`. `1 < dist[2]` (inf). `dist[2]=1`, `parent[2]=0`. `PQ.push({1,2})`.
    *   Edge 0->3 (weight 5): `new_dist = 0+5 = 5`. `5 < dist[3]` (inf). `dist[3]=5`, `parent[3]=0`. `PQ.push({5,3})`.
    *   `PQ = [{1,2}, {2,1}, {5,3}]`
*   **Extract {1,2}:**
    *   Edge 2->3 (weight 1): `new_dist = dist[2]+1 = 1+1 = 2`. `2 < dist[3]` (current 5). `dist[3]=2`, `parent[3]=2`. `PQ.push({2,3})`.
    *   `PQ = [{2,1}, {2,3}, {5,3}]` (note: {5,3} is now stale)
*   **Extract {2,1}:**
    *   Edge 1->3 (weight 3): `new_dist = dist[1]+3 = 2+3 = 5`. `5 > dist[3]` (current 2). Do nothing.
    *   `PQ = [{2,3}, {5,3}]`
*   **Extract {2,3}:** (This is the new entry for node 3, with distance 2)
    *   No outgoing edges from 3 in this example.
    *   `PQ = [{5,3}]`
*   **Extract {5,3}:** (This is the stale entry for node 3, with distance 5. `5 > dist[3]` (current 2). Skip.)
    *   `PQ = []`

Final distances from 0: `dist = {0:0, 1:2, 2:1, 3:2}`.

### Time and Space Complexity

Using a binary heap (priority queue):

*   **Time Complexity:** O(E log V) or O(E + V log V)
    *   Each vertex is extracted from the priority queue once: V extractions, each O(log V).
    *   Each edge might lead to a `decrease-key` (or insertion) operation in the priority queue: E operations, each O(log V).
    *   V = Number of vertices, E = Number of edges.
*   **Space Complexity:** O(V + E)
    *   `distance`, `parent` arrays: O(V) space.
    *   `priority queue`: Stores at most O(E) elements in worst-case (if all edges lead to updates).
    *   Adjacency list: O(V + E) space.

### Edge Cases and Gotchas

*   **Negative Edge Weights:** Dijkstra's algorithm **fails** with negative edge weights. For graphs with negative weights (but no negative cycles), use Bellman-Ford.
*   **Disconnected Graph:** Nodes unreachable from the source will retain `infinity` distance.
*   **Dense vs. Sparse Graphs:** For dense graphs (E ~ V^2), an O(V^2) array-based Dijkstra (without priority queue) can be faster than O(E log V). For sparse graphs (E ~ V), O(E log V) is superior.
*   **Directed vs. Undirected:** Works for both. For undirected, treat each undirected edge as two directed edges.

---

## 3. Cycle Detection in Directed Graph (DFS)

### Concept
Detecting cycles in a directed graph is crucial for many applications, such as identifying deadlocks, validating dependencies (e.g., in build systems or course prerequisites), or ensuring a graph is a Directed Acyclic Graph (DAG) for topological sorting.

A cycle exists in a directed graph if, during a Depth-First Search (DFS) traversal, we encounter a node that is currently in the recursion stack (i.e., being visited, but not yet finished processing).

### Algorithm Logic (Step-by-Step)

We use three states for each node during DFS:

*   **0 (UNVISITED):** The node has not been visited yet.
*   **1 (VISITING):** The node is currently in the recursion stack (i.e., we are exploring its descendants). This is sometimes called `processing` or `grey`.
*   **2 (VISITED):** The node and all its descendants have been fully explored. This is sometimes called `processed` or `black`.

1.  **Initialization**:
    *   Create a `state` array (or map) for all nodes, initialized to `UNVISITED`.
    *   For each node `u` from `0` to `V-1`:
        *   If `u` is `UNVISITED`, call a recursive helper function `dfs_check_cycle(u, state)`.
        *   If `dfs_check_cycle` returns `true` at any point, a cycle is found, return `true`.

2.  **`dfs_check_cycle(u, state)` function**:
    *   Set `state[u] = VISITING`.
    *   For each neighbor `v` of `u`:
        *   If `state[v] == VISITING`: A back-edge to an ancestor is found. **Cycle detected! Return `true`.**
        *   If `state[v] == UNVISITED`:
            *   Recursively call `dfs_check_cycle(v, state)`.
            *   If the recursive call returns `true`, propagate `true` upwards (cycle found).
    *   Set `state[u] = VISITED` (all descendants of `u` have been explored, and no cycle was found through `u` for now).
    *   Return `false` (no cycle found through this path).

### ASCII Diagram Example

Consider a directed graph with a cycle:
```
(0) ----> (1)
 ^         |
 |         V
(3) <---- (2)
```
Cycle: `0 -> 1 -> 2 -> 3 -> 0`

DFS from node 0:

*   `dfs_check_cycle(0)`:
    *   `state[0] = VISITING`
    *   Neighbor 1:
        *   `state[1] = UNVISITED`. Call `dfs_check_cycle(1)`:
            *   `state[1] = VISITING`
            *   Neighbor 2:
                *   `state[2] = UNVISITED`. Call `dfs_check_cycle(2)`:
                    *   `state[2] = VISITING`
                    *   Neighbor 3:
                        *   `state[3] = UNVISITED`. Call `dfs_check_cycle(3)`:
                            *   `state[3] = VISITING`
                            *   Neighbor 0:
                                *   `state[0] = VISITING`. **Cycle detected! Return true.**
                        *   Returns `true`.
                    *   Returns `true`.
                *   Returns `true`.
            *   Returns `true`.
        *   Returns `true`.
    *   Returns `true`.

Result: Cycle detected.

### Time and Space Complexity

*   **Time Complexity:** O(V + E)
    *   Each vertex and each edge is visited at most once by the DFS.
    *   V = Number of vertices, E = Number of edges.
*   **Space Complexity:** O(V + E)
    *   `state` array: O(V) space.
    *   Recursion stack: O(V) in worst case (skewed graph).
    *   Adjacency list: O(V + E) space.

### Edge Cases and Gotchas

*   **Disconnected Graph:** The outer loop ensures all components are checked.
*   **Self-Loops:** A node having an edge to itself (`u -> u`) is a cycle. Handled correctly by checking `state[u] == VISITING` when processing `u`'s neighbors.
*   **Parallel Edges:** Multiple edges between the same two nodes don't change correctness; they are simply processed.
*   **Undirected Graphs:** This specific algorithm is for directed graphs. For undirected graphs, a cycle is detected if DFS encounters an already visited node that is *not* the direct parent of the current node in the DFS tree. Union-Find can also detect cycles in undirected graphs.

---

## 4. Topological Sort (Kahn's Algorithm)

### Concept
A topological sort (or topological ordering) of a directed acyclic graph (DAG) is a linear ordering of its vertices such that for every directed edge `u -> v`, `u` comes before `v` in the ordering. Topological sorting is only possible for DAGs. If the graph contains a cycle, no topological sort exists.

Kahn's algorithm is a BFS-based approach for topological sorting. It works by repeatedly finding nodes that have no incoming edges, adding them to the sort, and then removing them (and their outgoing edges) from the graph.

### Algorithm Logic (Step-by-Step)

1.  **Initialization**:
    *   Compute the **in-degree** (number of incoming edges) for every node in the graph.
    *   Create an empty `queue`.
    *   Add all nodes with an in-degree of `0` to the `queue`.
    *   Create an empty `topological_order` list.
    *   Initialize `visited_nodes_count = 0`.

2.  **Traversal**:
    *   While the `queue` is not empty:
        *   Dequeue a node `u`.
        *   Add `u` to `topological_order`.
        *   Increment `visited_nodes_count`.
        *   For each neighbor `v` of `u`:
            *   Decrement `in_degree[v]`.
            *   If `in_degree[v]` becomes `0`, enqueue `v`.

3.  **Cycle Check and Result**:
    *   After the loop, if `visited_nodes_count` is not equal to the total number of nodes in the graph (V), it means there's a cycle in the graph, and a topological sort is not possible.
    *   Otherwise, `topological_order` contains a valid topological sort.

### ASCII Diagram Example

Consider a DAG for course prerequisites:
```
  Start
  /   \
 V     V
(A)   (B)
 |     |
 V     V
(C)   (D)
  \   /
   V V
   (E)
```
In-degrees: A:0, B:0, C:1, D:1, E:2

1.  **Init:** `Q = [A, B]`, `in_degree = {A:0, B:0, C:1, D:1, E:2}`, `order = []`
2.  **Dequeue A:** `order = [A]`. Neighbors: C.
    *   `in_degree[C] = 0`. `Q = [B, C]`
3.  **Dequeue B:** `order = [A, B]`. Neighbors: D.
    *   `in_degree[D] = 0`. `Q = [C, D]`
4.  **Dequeue C:** `order = [A, B, C]`. Neighbors: E.
    *   `in_degree[E] = 1`. `Q = [D]`
5.  **Dequeue D:** `order = [A, B, C, D]`. Neighbors: E.
    *   `in_degree[E] = 0`. `Q = [E]`
6.  **Dequeue E:** `order = [A, B, C, D, E]`. No neighbors.
    *   `Q = []`

Final order: `[A, B, C, D, E]` (one possible valid topological sort)

### Time and Space Complexity

*   **Time Complexity:** O(V + E)
    *   Calculating in-degrees: O(V + E).
    *   Each vertex is enqueued/dequeued once: O(V).
    *   Each edge is processed once when its source node is dequeued: O(E).
    *   V = Number of vertices, E = Number of edges.
*   **Space Complexity:** O(V + E)
    *   `in_degree` array: O(V) space.
    *   `queue`: Stores at most O(V) vertices.
    *   `topological_order` list: O(V) space.
    *   Adjacency list: O(V + E) space.

### Edge Cases and Gotchas

*   **Graph with Cycles:** If `visited_nodes_count != V` at the end, the graph contains a cycle and no topological sort is possible. The algorithm effectively detects this.
*   **Multiple Topological Orders:** A DAG can have multiple valid topological sorts if there are parallel paths or independent components. Kahn's algorithm produces one valid order.
*   **Disconnected DAGs:** Handled correctly; nodes in different components with in-degree 0 will be added to the queue.
*   **Empty Graph/Single Node Graph:** Handled correctly.

---
```