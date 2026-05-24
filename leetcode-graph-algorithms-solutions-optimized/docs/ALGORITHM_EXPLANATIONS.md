```markdown
# Graph Algorithm Explanations

This document provides detailed explanations, pseudocode, and visual diagrams for the core graph algorithms implemented in this project.

## 1. Breadth-First Search (BFS)

BFS is an algorithm for traversing or searching tree or graph data structures. It explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.

### Concept
Imagine a ripple spreading out from a stone dropped in water. BFS explores the graph in the same way, expanding outwards from the starting node layer by layer. It uses a **queue** to manage which nodes to visit next, ensuring that nodes closer to the source are visited first.

### Problem Context: Shortest Path in Binary Matrix
For unweighted graphs (where each edge has a cost of 1), BFS inherently finds the shortest path because it explores all paths of length `k` before exploring any path of length `k+1`. In a grid, moving from one cell to an adjacent cell is considered one "step" or "edge".

### Algorithm Steps
1.  Initialize a queue and add the starting node to it.
2.  Mark the starting node as visited and record its distance (usually 0 or 1, depending on problem definition).
3.  While the queue is not empty:
    a.  Dequeue a node `u`.
    b.  If `u` is the target node, we've found the shortest path.
    c.  For each unvisited neighbor `v` of `u`:
        i.  Mark `v` as visited.
        ii. Record its distance as `distance(u) + 1`.
        iii. Enqueue `v`.

### Pseudocode (for Shortest Path in Binary Matrix)

```
function shortestPathBinaryMatrix(grid):
    N = grid.length

    if grid[0][0] == 1 or grid[N-1][N-1] == 1:
        return -1
    if N == 1:
        return 1

    queue = []
    distances = N x N matrix initialized to Infinity

    queue.enqueue([0, 0, 1]) // [row, col, distance]
    distances[0][0] = 1

    while queue is not empty:
        r, c, dist = queue.dequeue()

        if r == N-1 and c == N-1:
            return dist

        for each 8-directional neighbor (nr, nc) of (r, c):
            if nr, nc are in bounds AND grid[nr][nc] == 0 AND distances[nr][nc] == Infinity:
                distances[nr][nc] = dist + 1
                queue.enqueue([nr, nc, dist + 1])

    return -1 // Target unreachable
```

### Time and Space Complexity
*   **Time:** O(V + E), where V is the number of vertices (cells in grid: N*N) and E is the number of edges (connections: up to 8 per cell). For a grid, this simplifies to O(R * C) where R is rows, C is columns.
*   **Space:** O(V) for the queue and visited/distance array. O(R * C) for a grid.

### Visual Diagram (ASCII Art)

```
Grid:
+---+---+---+
| S | 0 | 0 |
+---+---+---+
| 1 | 1 | 0 |
+---+---+---+
| 0 | 0 | E |
+---+---+---+
S = Start (0,0), E = End (2,2)

BFS Traversal (distances shown):
Queue: [[0,0,1]]
Distances:
+---+---+---+
| 1 |inf|inf|
+---+---+---+
|inf|inf|inf|
+---+---+---+
|inf|inf|inf|
+---+---+---+

Pop [0,0,1]. Neighbors: [0,1], [1,0], [1,1] (8-dir)
Valid neighbors (value 0, unvisited): [0,1]
Enqueue [0,1,2]. Distances[0][1]=2

Pop [0,1,2]. Neighbors: [0,0], [0,2], [1,0], [1,1], [1,2]
Valid neighbors: [0,2], [1,2] (1,1 is blocked)
Enqueue [0,2,3], [1,2,3]. Distances[0][2]=3, Distances[1][2]=3

... and so on ...

Final Path (e.g., (0,0)->(0,1)->(0,2)->(1,2)->(2,2)) length 5
```

### Edge Cases and Gotchas
*   **Start/End blocked:** If `grid[0][0]` or `grid[N-1][N-1]` is `1`, return -1 immediately.
*   **1x1 grid:** If `N=1` and `grid[0][0]=0`, path is 1.
*   **Disconnected graph:** If the target is unreachable, the queue will eventually empty, and -1 should be returned.
*   **Visited check:** Ensure cells are marked visited *when enqueued* or processed *only if shorter path*. The `distances[nr][nc] === Infinity` check effectively acts as a `!visited` check.

## 2. Depth-First Search (DFS)

DFS is an algorithm for traversing or searching tree or graph data structures. It explores as far as possible along each branch before backtracking.

### Concept
Imagine navigating a maze by always choosing the left-most path. You go as deep as you can, and only when you hit a dead end, do you backtrack to the last junction and try another path. DFS uses a **stack** (either explicit or implicit via recursion call stack) to remember which path to take when backtracking.

### Problem Context: Number of Islands
To count islands, when a piece of land ('1') is found, DFS is initiated to explore its entire connected component (the whole island). All cells of this island are "sunk" (marked '0') so they won't be counted again. Each time a new '1' is discovered (meaning a new island), the island count increments.

### Algorithm Steps
1.  Iterate through each cell of the grid.
2.  If a cell `(r, c)` contains '1' (land):
    a.  Increment the island count.
    b.  Start a DFS (recursive or iterative) from `(r, c)`:
        i.  Mark `(r, c)` as visited (e.g., change `grid[r][c]` to '0').
        ii. For each 4-directional neighbor `(nr, nc)` of `(r, c)`:
            1.  If `(nr, nc)` is in bounds, is land ('1'), and not visited, recursively (or iteratively via stack) call DFS on `(nr, nc)`.

### Pseudocode (for Number of Islands - Recursive DFS)

```
function numIslands(grid):
    rows = grid.length
    cols = grid[0].length
    islandCount = 0

    function dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == '0':
            return
        
        grid[r][c] = '0' // Mark as visited (sink island)

        dfs(r + 1, c) // Down
        dfs(r - 1, c) // Up
        dfs(r, c + 1) // Right
        dfs(r, c - 1) // Left

    for r from 0 to rows-1:
        for c from 0 to cols-1:
            if grid[r][c] == '1':
                islandCount = islandCount + 1
                dfs(r, c)
                
    return islandCount
```

### Time and Space Complexity
*   **Time:** O(R * C), where R is the number of rows and C is the number of columns. Each cell is visited at most once.
*   **Space:** O(R * C) in the worst case. This is for the recursion stack (if the grid is a single large island) or the explicit stack in an iterative DFS.

### Visual Diagram (ASCII Art)

```
Grid:
+---+---+---+---+
| 1 | 1 | 0 | 0 |
+---+---+---+---+
| 1 | 1 | 0 | 0 |
+---+---+---+---+
| 0 | 0 | 1 | 0 |
+---+---+---+---+

Start: (0,0) is '1'. islandCount = 1. Call DFS(0,0).
DFS(0,0): grid[0][0]='0'
  DFS(1,0): grid[1][0]='0'
    DFS(2,0) -> out of bounds
    DFS(0,0) -> visited
    DFS(1,1): grid[1][1]='0'
      DFS(2,1) -> out of bounds
      DFS(0,1): grid[0][1]='0'
        DFS(1,1) -> visited
        DFS(0,0) -> visited
        DFS(0,2) -> '0' (water)
        DFS(-1,1) -> out of bounds
      Return
    DFS(1,2) -> '0' (water)
    DFS(2,1) -> out of bounds
  Return
  DFS(0,1) -> visited
  DFS(-1,0) -> out of bounds
  DFS(0,1) -> visited
Return from initial DFS(0,0).

Grid becomes:
+---+---+---+---+
| 0 | 0 | 0 | 0 |
+---+---+---+---+
| 0 | 0 | 0 | 0 |
+---+---+---+---+
| 0 | 0 | 1 | 0 |
+---+---+---+---+

Continue scanning: (2,2) is '1'. islandCount = 2. Call DFS(2,2).
  DFS(2,2): grid[2][2]='0'
  ... (no other neighbors for (2,2) are '1')
Return from DFS(2,2).

Final islandCount = 2 (if this was the grid, problem example has 3)
```

### Edge Cases and Gotchas
*   **Empty grid:** Handle `grid.length === 0` or `grid[0].length === 0`.
*   **Grid with only water:** `islandCount` remains 0.
*   **In-place modification:** Modifying the grid (`'1'` to `'0'`) is a common trick. If the grid cannot be modified, a separate `visited` 2D array is needed.
*   **Recursion depth:** For very large grids that form a single island, recursive DFS can lead to stack overflow. An iterative DFS using an explicit stack is a more robust alternative.

## 3. Dijkstra's Algorithm

Dijkstra's algorithm is a single-source shortest path algorithm for a graph with non-negative edge weights.

### Concept
Dijkstra's works like a greedy exploration. It always picks the unvisited node with the smallest known distance from the source. When it visits a node, it updates the distances of its neighbors if a shorter path through the current node is found. This process guarantees finding the shortest path to each node because edge weights are non-negative.

A **Min-Heap** (priority queue) is crucial for efficiently selecting the unvisited node with the smallest distance.

### Problem Context: Network Delay Time
The problem asks for the minimum time for a signal to reach *all* `n` nodes from a source node `k`. This is exactly what Dijkstra's calculates: shortest paths from a single source to all other nodes. The "minimum time for all nodes" is then simply the maximum of all shortest path times to reachable nodes. If any node is unreachable, it's impossible, so we return -1.

### Algorithm Steps
1.  **Initialize:**
    *   Create an adjacency list to represent the graph from the given `times` (edges).
    *   Create a `distances` map/array, initializing all distances to infinity, and the source node `k`'s distance to 0.
    *   Create a Min-Heap (priority queue) and add `[k, 0]` (node, distance).
2.  **Main Loop:** While the Min-Heap is not empty:
    a.  Extract the node `u` with the smallest `currentDist` from the Min-Heap.
    b.  If `currentDist` is greater than `distances[u]`, continue (this is a stale entry in the heap, we've found a shorter path to `u` already).
    c.  For each neighbor `v` of `u` with edge weight `w`:
        i.  Calculate a `newDist = currentDist + w`.
        ii. If `newDist < distances[v]`:
            1.  Update `distances[v] = newDist`.
            2.  Insert `[v, newDist]` into the Min-Heap.
3.  **Result:** After the loop, iterate through all nodes' distances. If any node still has `Infinity` distance, it's unreachable, return -1. Otherwise, return the maximum value among all calculated shortest distances.

### Pseudocode (with Min-Heap)

```
function networkDelayTime(times, n, k):
    adjList = buildAdjacencyList(n, times, isDirected=true, isOneIndexed=true)
    
    distances = Map<node_id, distance> initialized to Infinity for all 1..n
    distances[k] = 0

    minHeap = MinHeap() // Stores [distance, node_id]
    minHeap.insert(k, 0)

    visitedCount = 0 // Track how many nodes finalized shortest path

    while not minHeap.isEmpty():
        currentDist, u = minHeap.extractMin()

        if currentDist > distances[u]: // Stale entry
            continue

        visitedCount++

        for each neighbor (v, weight) of u:
            newDist = currentDist + weight
            if newDist < distances[v]:
                distances[v] = newDist
                minHeap.insert(v, newDist)

    if visitedCount != n: // Not all nodes reached
        return -1
    
    maxDelay = 0
    for dist in distances.values():
        maxDelay = max(maxDelay, dist)
    
    return maxDelay
```

### Time and Space Complexity
*   **Time (with Min-Heap):** O(E log V) or O(E log E) (since E <= V^2, log E <= 2 log V), where V is the number of vertices and E is the number of edges.
    *   Building adjacency list: O(E)
    *   Min-Heap operations: Each vertex is extracted once (V extractions, O(log V) each). Each edge causes at most one `insert` or `decrease-key` operation (E operations, O(log V) each).
*   **Time (with Array Scan - Less Optimized):** O(V^2 + E).
    *   Building adjacency list: O(E)
    *   Outer loop runs V times. Inside, finding min distance takes O(V), relaxing edges takes O(E) in total.
*   **Space:** O(V + E) for adjacency list, distances map, and Min-Heap.

### Visual Diagram (ASCII Art)

```
Graph: (Nodes 1,2,3,4. Source K=2)
     1 --- 1 --- 4
    /             ^
   1              |
  /               |
 2 --- 1 --- 3 ---
       ^

Edges: (2,1,1), (2,3,1), (3,4,1)

Initial:
distances = {1:inf, 2:0, 3:inf, 4:inf}
MinHeap = [[0,2]] // [dist, node]

1. Pop [0,2] (node 2, dist 0)
   visitedCount = 1, maxDelay = 0
   Neighbors of 2: (1,1), (3,1)
   New dist to 1: 0+1=1. distances[1]=1. MinHeap.insert(1,1)
   New dist to 3: 0+1=1. distances[3]=1. MinHeap.insert(3,1)
   MinHeap = [[1,1], [1,3]]

2. Pop [1,1] (node 1, dist 1)
   visitedCount = 2, maxDelay = max(0,1) = 1
   Neighbors of 1: None
   MinHeap = [[1,3]]

3. Pop [1,3] (node 3, dist 1)
   visitedCount = 3, maxDelay = max(1,1) = 1
   Neighbors of 3: (4,1)
   New dist to 4: 1+1=2. distances[4]=2. MinHeap.insert(4,2)
   MinHeap = [[2,4]]

4. Pop [2,4] (node 4, dist 2)
   visitedCount = 4, maxDelay = max(1,2) = 2
   Neighbors of 4: None
   MinHeap = []

All nodes visited (visitedCount=4 == n=4).
Max delay = 2. Result: 2.
```

### Edge Cases and Gotchas
*   **Negative edge weights:** Dijkstra's algorithm does NOT work correctly with negative edge weights. For such graphs, Bellman-Ford algorithm is used.
*   **Disconnected graph:** If some nodes are unreachable from the source `k`, their `distances` will remain `Infinity`. The check `visitedCount !== n` (or checking for `Infinity` in final distances) handles this.
*   **Node indexing:** Be careful if nodes are 0-indexed or 1-indexed. Adjust array sizes and access accordingly.
*   **Stale entries in Min-Heap:** The check `currentDist > distances[u]` is vital for correctness when using a Min-Heap. It ensures that you only process a node's neighbors when you've truly found the shortest path to that node, not an outdated entry.

## 4. Kruskal's Algorithm

Kruskal's algorithm finds a Minimum Spanning Tree (MST) for a connected, undirected graph.

### Concept
An MST is a subset of the edges of a connected, edge-weighted undirected graph that connects all the vertices together, without any cycles and with the minimum possible total edge weight.

Kruskal's is a **greedy algorithm**. It works by:
1.  Sorting all edges in the graph by weight in ascending order.
2.  Iterating through the sorted edges. For each edge:
    a.  If adding the edge does not form a cycle with the edges already chosen for the MST, add it.
    b.  Otherwise, discard it.
3.  Repeat until V-1 edges are chosen (where V is the number of vertices), or all edges have been considered.

To efficiently detect cycles, Kruskal's uses the **Union-Find (Disjoint Set) data structure**. `Union(u, v)` merges the sets containing `u` and `v`, and `Find(u)` returns the representative of `u`'s set. If `Find(u) == Find(v)`, then `u` and `v` are already in the same connected component, and adding edge `(u, v)` would create a cycle.

### Problem Context: Connecting Cities With Minimum Cost
This problem is a direct application of finding the MST. Cities are vertices, connections are edges with costs as weights. We want to connect all cities with minimum total cost, which is precisely the definition of an MST.

### Algorithm Steps
1.  **Represent Edges:** Convert the `connections` input into a list of `[city1, city2, cost]` edges.
2.  **Sort Edges:** Sort this list of edges by their `cost` in ascending order.
3.  **Initialize Union-Find:** Create a `UnionFind` instance for `n` cities (or `n+1` if 1-indexed to accommodate dummy index 0). Initially, each city is in its own disjoint set.
4.  **Iterate and Build MST:**
    a.  Initialize `totalCost = 0` and `edgesUsed = 0`.
    b.  For each `[u, v, cost]` edge in the sorted list:
        i.  If `UnionFind.find(u)` is not equal to `UnionFind.find(v)` (meaning `u` and `v` are in different components, so adding this edge won't form a cycle):
            1.  Call `UnionFind.union(u, v)` to merge their components.
            2.  Add `cost` to `totalCost`.
            3.  Increment `edgesUsed`.
            4.  If `edgesUsed` equals `n - 1` (we have an MST connecting all `n` cities), break early.
5.  **Result:** If `edgesUsed` is `n - 1`, return `totalCost`. Otherwise, return -1 (it's impossible to connect all cities).

### Pseudocode

```
function minimumCost(n, connections):
    // 1. Sort edges by cost
    connections.sort(by_cost_ascending) // e.g., [[u,v,w], ...]

    // 2. Initialize Union-Find
    uf = UnionFind(n + 1) // For 1-indexed cities 1 to n

    totalCost = 0
    edgesUsed = 0

    // 3. Iterate through sorted edges
    for each [u, v, cost] in connections:
        if uf.find(u) != uf.find(v): // If u and v are not already connected
            uf.union(u, v)          // Connect them
            totalCost += cost
            edgesUsed++
            if edgesUsed == n - 1: // MST complete for n vertices
                break

    // 4. Check if all cities are connected
    if edgesUsed == n - 1:
        return totalCost
    else:
        return -1 // Not all cities could be connected
```

### Time and Space Complexity
*   **Time:** O(E log E) or O(E log V)
    *   Sorting edges dominates: O(E log E). (Since E can be at most V^2, E log E is roughly E log V^2 = 2E log V).
    *   Union-Find operations: E operations, each taking amortized O(α(V)) time, where α is the inverse Ackermann function (practically constant). So, O(E α(V)).
    *   Total: O(E log E + E α(V)) which simplifies to O(E log E).
*   **Space:** O(V + E)
    *   O(E) for storing edges.
    *   O(V) for the Union-Find structure (parent and rank arrays).

### Visual Diagram (ASCII Art)

```
Cities: 1, 2, 3
Connections: (1,2,5), (1,3,6), (2,3,1)

Sorted Edges:
1. (2,3,1)
2. (1,2,5)
3. (1,3,6)

UnionFind (N=3):
Initially: {1}, {2}, {3} (and {0} if 1-indexed)
totalCost = 0, edgesUsed = 0

Processing:

1. Edge (2,3,1):
   find(2) != find(3) (2 and 3 are in different sets)
   Union(2,3) -> {1}, {2,3}
   totalCost = 1
   edgesUsed = 1
   MST: (2,3)

   Graph state:
   1 ---?--- 2 ---1--- 3

2. Edge (1,2,5):
   find(1) != find(2) (1 is separate, 2 is with 3)
   Union(1,2) -> {1,2,3}
   totalCost = 1 + 5 = 6
   edgesUsed = 2
   MST: (2,3), (1,2)

   Graph state:
     1 --5-- 2 ---1--- 3
     |       |
     | Connected

   Now edgesUsed = 2 == N-1 (3-1). MST is complete. Break.

Final Cost = 6.
```

### Edge Cases and Gotchas
*   **Disconnected Graph:** If `edgesUsed` does not reach `n - 1` by the end, it means the graph is disconnected, and a single MST connecting all vertices cannot be formed. Return -1.
*   **Single Vertex:** For `n = 1`, `n - 1 = 0` edges are needed. `edgesUsed` starts at 0, so it matches. `totalCost` should be 0.
*   **Duplicate Edges:** Kruskal's handles duplicate edges naturally due to sorting. The cheaper duplicate would be considered first. If a connection is needed, it uses the first one. If not, it's skipped.
*   **Self-loops:** Edges `(u, u, w)` are typically ignored in MST problems. The problem description for `connections` usually implies `u != v`.
*   **Union-Find implementation:** Path compression and union by rank/size are crucial for amortized O(α(V)) performance of Union-Find operations. Without them, it could degrade to O(V) per operation in worst case, making Kruskal's O(E*V).
```