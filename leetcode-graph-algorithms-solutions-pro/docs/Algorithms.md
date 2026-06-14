```markdown
# Graph Algorithms - Detailed Explanations

This document provides in-depth explanations of the graph algorithms implemented in this project, including their principles, pseudocode, and illustrative ASCII art diagrams.

## 1. Shortest Path in Unweighted Graph (BFS)

**Algorithm:** Breadth-First Search (BFS)

**Concept:**
BFS is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root (or some arbitrary node of a graph, sometimes referred to as a 'search key') and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.

For unweighted graphs, BFS naturally finds the shortest path in terms of the number of edges. This is because it explores the graph layer by layer: all nodes at distance `d` from the source are visited before any nodes at distance `d+1`.

**How it works (for shortest path):**
1.  **Initialization:**
    *   Maintain a `queue` for nodes to visit.
    *   Maintain a `visited` set to prevent revisiting nodes and cycles.
    *   Maintain a `parentMap` to reconstruct the path: `parentMap[v]` stores the node from which `v` was first reached.
    *   Enqueue the `start` node, mark it as visited, and set its parent to `null`.
2.  **Traversal:**
    *   While the `queue` is not empty:
        *   Dequeue a `current` node.
        *   If `current` is the `end` node, the path has been found. Reconstruct it using `parentMap`.
        *   For each `neighbor` of `current`:
            *   If `neighbor` has not been `visited`:
                *   Mark `neighbor` as visited.
                *   Set `parentMap[neighbor] = current`.
                *   Enqueue `neighbor`.
3.  **Path Reconstruction:**
    *   Starting from the `end` node, backtrack using `parentMap` until the `start` node is reached. Reverse this sequence to get the path from `start` to `end`.

**Pseudocode:**

```
function findShortestPath(graph, start, end):
    if start == end:
        return [start]
    
    queue = new Queue()
    visited = new Set()
    parentMap = new Map()

    queue.enqueue(start)
    visited.add(start)
    parentMap.put(start, null)

    while queue is not empty:
        current = queue.dequeue()

        if current == end:
            return reconstructPath(parentMap, start, end)

        for neighbor in graph.getNeighbors(current):
            if neighbor is not in visited:
                visited.add(neighbor)
                parentMap.put(neighbor, current)
                queue.enqueue(neighbor)
    
    return empty_list // No path found

function reconstructPath(parentMap, start, end):
    path = new LinkedList()
    current = end
    while current is not null:
        path.addFirst(current)
        if current == start:
            break
        current = parentMap.get(current)
    return path
```

**ASCII Art Example:**

Graph:
```
  0 --- 1
  |     |
  2 --- 3
        |
        4
```
Find shortest path from 0 to 4:

1.  **Queue: [0]**, Visited: {0}, Parent: {0:null}
2.  Dequeue 0. Neighbors 1, 2.
    *   **Queue: [1, 2]**, Visited: {0, 1, 2}, Parent: {0:null, 1:0, 2:0}
3.  Dequeue 1. Neighbors 0 (visited), 3.
    *   **Queue: [2, 3]**, Visited: {0, 1, 2, 3}, Parent: {0:null, 1:0, 2:0, 3:1}
4.  Dequeue 2. Neighbors 0 (visited), 3 (visited).
    *   **Queue: [3]**, Visited: {0, 1, 2, 3}, Parent: {0:null, 1:0, 2:0, 3:1}
5.  Dequeue 3. Neighbors 1 (visited), 2 (visited), 4.
    *   **Queue: [4]**, Visited: {0, 1, 2, 3, 4}, Parent: {0:null, 1:0, 2:0, 3:1, 4:3}
6.  Dequeue 4. `current == end`. Path found!

Reconstruct path from `parentMap`:
4 <- 3 <- 1 <- 0.
Reversed: `[0, 1, 3, 4]`

---

## 2. Cycle Detection in Undirected Graph

### Approach 1: Depth-First Search (DFS)

**Concept:**
DFS explores as far as possible along each branch before backtracking. In an undirected graph, an edge (u, v) means you can go from u to v and from v to u. During DFS, if we encounter a visited vertex `v` that is not the direct `parent` of the `current` vertex `u`, it implies a back-edge and thus a cycle.

**How it works:**
1.  **Initialization:**
    *   Maintain a `visited` set to keep track of nodes already explored.
    *   Iterate through all vertices of the graph. If a vertex is unvisited, start a DFS traversal from it (to handle disconnected components).
2.  **DFS Traversal (`dfs(current, parent)`):**
    *   Mark `current` as visited.
    *   For each `neighbor` of `current`:
        *   If `neighbor` is unvisited:
            *   Recursively call `dfs(neighbor, current)`. If this call returns `true` (cycle detected), propagate `true` up.
        *   Else if `neighbor` is visited **and** `neighbor` is not `parent`:
            *   A cycle is detected. Return `true`.
3.  If the DFS completes without detecting a cycle, return `false`.

**Pseudocode:**

```
function detectCycleDFS(graph):
    visited = new Set()
    for vertex in graph.getVertices():
        if vertex is not in visited:
            if dfs(graph, vertex, null, visited): // null for initial parent
                return true
    return false

function dfs(graph, current, parent, visited):
    visited.add(current)
    for neighbor in graph.getNeighbors(current):
        if neighbor is not in visited:
            if dfs(graph, neighbor, current, visited):
                return true
        else if neighbor != parent: // Cycle detected if visited neighbor is not parent
            return true
    return false
```

**ASCII Art Example:**

Graph:
```
0 --- 1
|   / |
|  /  |
3 --- 2
```
Detect cycle in (0,1,2,3) with DFS:

1.  `dfs(0, null)`:
    *   Visited: {0}
    *   Neighbors of 0: 1, 3
    *   `dfs(1, 0)`:
        *   Visited: {0, 1}
        *   Neighbors of 1: 0 (parent), 2
        *   `dfs(2, 1)`:
            *   Visited: {0, 1, 2}
            *   Neighbors of 2: 1 (parent), 3
            *   `dfs(3, 2)`:
                *   Visited: {0, 1, 2, 3}
                *   Neighbors of 3: 0, 2 (parent)
                *   Neighbor 0 is visited and not parent (0 != 2). **Cycle Detected!** Return true.
            *   Propagate true.
        *   Propagate true.
    *   Propagate true.
Return true.

### Approach 2: Disjoint Set Union (DSU)

**Concept:**
The Disjoint Set Union (DSU) data structure efficiently manages a collection of disjoint sets. For cycle detection in an undirected graph, we can process edges one by one. If an edge connects two vertices that are already in the same connected component (i.e., their representatives in DSU are the same), then adding this edge would create a cycle.

**How it works:**
1.  **Initialization:**
    *   Create a DSU structure where each vertex in the graph is initially in its own separate set.
2.  **Edge Processing:**
    *   Iterate through each edge `(u, v)` in the graph.
    *   For each edge, use the `find` operation to determine the representative (root) of the set containing `u` and the representative of the set containing `v`.
    *   If `find(u)` is equal to `find(v)`:
        *   This means `u` and `v` are already connected (belong to the same set). Adding the edge `(u, v)` would form a cycle. Return `true`.
    *   If `find(u)` is not equal to `find(v)`:
        *   This means `u` and `v` are in different connected components. Use the `union` operation to merge their sets.
3.  If all edges are processed without finding a cycle, return `false`.

**Pseudocode:**

```
function detectCycleDSU(graph):
    dsu = new DisjointSet(graph.getVertices()) // Each vertex in its own set
    for edge (u, v) in graph.getAllEdges():
        rootU = dsu.find(u)
        rootV = dsu.find(v)
        if rootU == rootV: // u and v are already connected
            return true // Cycle detected
        dsu.union(u, v) // Merge their sets
    return false
```

**ASCII Art Example:**

Graph:
```
0 --- 1
|     |
3 --- 2
```
Detect cycle using DSU:

Initial DSU sets: {0}, {1}, {2}, {3}

1.  Edge (0, 1):
    *   `find(0)` = 0, `find(1)` = 1. Different.
    *   `union(0, 1)`. Sets: {0,1}, {2}, {3}
2.  Edge (1, 2):
    *   `find(1)` = 0 (or 1), `find(2)` = 2. Different.
    *   `union(1, 2)`. Sets: {0,1,2}, {3}
3.  Edge (2, 3):
    *   `find(2)` = 0 (or 1/2), `find(3)` = 3. Different.
    *   `union(2, 3)`. Sets: {0,1,2,3}
4.  Edge (3, 0): (Implicit from graph visualization)
    *   `find(3)` = 0 (or 1/2/3), `find(0)` = 0 (or 1/2/3). **Same!**
    *   **Cycle Detected!** Return true.

---

## 3. Minimum Spanning Tree (MST) using Kruskal's Algorithm

**Algorithm:** Kruskal's Algorithm

**Concept:**
Kruskal's algorithm finds a Minimum Spanning Tree (MST) for a connected, undirected, edge-weighted graph. It is a greedy algorithm that works by selecting edges in increasing order of weights, as long as adding an edge does not form a cycle. It also uses the Disjoint Set Union (DSU) data structure to efficiently detect cycles.

**How it works:**
1.  **Preparation:**
    *   Create a list of all edges in the graph.
    *   Sort all edges in non-decreasing order of their weights.
2.  **Initialization:**
    *   Initialize an empty list `mst` to store the edges of the MST.
    *   Initialize a DSU structure where each vertex is in its own set.
3.  **Edge Selection (Greedy Approach):**
    *   Iterate through the sorted edges:
        *   For each edge `(u, v)` with weight `w`:
            *   Use DSU's `find` operation to check if `u` and `v` are already in the same set.
            *   If `find(u)` is not equal to `find(v)` (i.e., `u` and `v` are in different components, so adding this edge won't form a cycle):
                *   Add the edge `(u, v)` to the `mst` list.
                *   Use DSU's `union` operation to merge the sets containing `u` and `v`.
                *   Increment the count of edges in the `mst`.
            *   If the `mst` contains `V-1` edges (where `V` is the number of vertices), the MST is complete. Stop.
4.  The `mst` list now contains the edges of the Minimum Spanning Tree.

**Pseudocode:**

```
function findMinimumSpanningTree(graph):
    if graph is directed or empty:
        handle error / return empty list
    
    allEdges = graph.getAllEdges()
    sort(allEdges by weight ascending)

    dsu = new DisjointSet(graph.getVertices())
    mst = new List<Edge>()
    numVertices = graph.getNumVertices()

    for edge (u, v, weight) in allEdges:
        if dsu.find(u) != dsu.find(v): // If u and v are in different components
            mst.add(edge)
            dsu.union(u, v)
            if mst.size() == numVertices - 1: // MST is complete
                break
    
    return mst
```

**ASCII Art Example:**

Graph with weights:
```
  (7)   (8)
0 --- 1 --- 2
| \   | \   |
(5) (9) (7) (15)
|  \  |  \  |
3 --- 4 --- 5
  (8)   (6)
```
Edges sorted by weight: (0,3,5), (4,5,6), (1,4,7), (1,2,8), (0,1,7), (0,4,9), (3,4,8), (2,5,15) (ties broken arbitrarily)

1.  Initial DSU sets: {0}, {1}, {2}, {3}, {4}, {5}
2.  Edge (0,3,5): `find(0)!=find(3)`. Add (0,3), `union(0,3)`.
    *   MST: [(0,3,5)]
    *   Sets: {0,3}, {1}, {2}, {4}, {5}
3.  Edge (4,5,6): `find(4)!=find(5)`. Add (4,5), `union(4,5)`.
    *   MST: [(0,3,5), (4,5,6)]
    *   Sets: {0,3}, {1}, {2}, {4,5}
4.  Edge (0,1,7): `find(0)!=find(1)`. Add (0,1), `union(0,1)`.
    *   MST: [(0,3,5), (4,5,6), (0,1,7)]
    *   Sets: {0,1,3}, {2}, {4,5}
5.  Edge (1,4,7): `find(1)!=find(4)`. Add (1,4), `union(1,4)`.
    *   MST: [(0,3,5), (4,5,6), (0,1,7), (1,4,7)]
    *   Sets: {0,1,3,4,5}, {2}
6.  Edge (1,2,8): `find(1)!=find(2)`. Add (1,2), `union(1,2)`.
    *   MST: [(0,3,5), (4,5,6), (0,1,7), (1,4,7), (1,2,8)]
    *   Sets: {0,1,2,3,4,5}
    *   MST size is 5, which is V-1. Stop.

Final MST edges: `[(0,3,5), (4,5,6), (0,1,7), (1,4,7), (1,2,8)]`. Total weight = 5 + 6 + 7 + 7 + 8 = 33.

---

## 4. Course Schedule (Topological Sort / Cycle Detection in Directed Graph)

**Problem:** Given courses and prerequisites, determine if all courses can be finished, and if so, return a valid order. This is equivalent to finding a topological sort of a directed graph. If a topological sort is not possible, it means there's a cycle in the prerequisites.

### Approach 1: Kahn's Algorithm (BFS-based Topological Sort)

**Concept:**
Kahn's algorithm is a BFS-based approach for topological sorting. It works by repeatedly finding vertices with an in-degree of zero (no incoming edges, meaning no prerequisites) and removing them from the graph.

**How it works:**
1.  **In-degree Calculation:**
    *   Compute the in-degree for every vertex in the graph. The in-degree of a vertex is the number of incoming edges.
2.  **Initialization:**
    *   Create a `queue` and add all vertices with an in-degree of 0 to it. These are the courses that can be taken first.
    *   Initialize an empty list `topologicalOrder` to store the result.
    *   Initialize a `visitedCount` to keep track of processed vertices.
3.  **Traversal:**
    *   While the `queue` is not empty:
        *   Dequeue a `current` vertex.
        *   Add `current` to `topologicalOrder`.
        *   Increment `visitedCount`.
        *   For each `neighbor` of `current`:
            *   Decrement `neighbor`'s in-degree.
            *   If `neighbor`'s in-degree becomes 0, enqueue `neighbor`.
4.  **Cycle Detection:**
    *   After the loop, if `visitedCount` is less than the total number of vertices in the graph, it means there was a cycle. In this case, not all courses could be processed, and no valid topological order exists. Return an empty list.
    *   Otherwise, `topologicalOrder` contains a valid sequence.

**Pseudocode:**

```
function findOrderKahn(graph):
    if graph is undirected: handle error

    inDegree = new Map<V, Integer>()
    for vertex in graph.getVertices():
        inDegree.put(vertex, 0)
    
    // Calculate in-degrees
    for vertex in graph.getVertices():
        for neighbor in graph.getNeighbors(vertex):
            inDegree.put(neighbor, inDegree.get(neighbor) + 1)
    
    queue = new Queue()
    for vertex in graph.getVertices():
        if inDegree.get(vertex) == 0:
            queue.enqueue(vertex)
    
    topologicalOrder = new List<V>()
    visitedCount = 0

    while queue is not empty:
        current = queue.dequeue()
        topologicalOrder.add(current)
        visitedCount++

        for neighbor in graph.getNeighbors(current):
            inDegree.put(neighbor, inDegree.get(neighbor) - 1)
            if inDegree.get(neighbor) == 0:
                queue.enqueue(neighbor)
    
    if visitedCount == graph.getNumVertices():
        return topologicalOrder // Valid order found
    else:
        return empty_list // Cycle detected
```

**ASCII Art Example:**

Graph:
```
3 --> 1 --> 0
|     ^
v     |
2 ----
```
(Courses: 0, 1, 2, 3. Prerequisites: (1 before 0), (2 before 0), (3 before 1), (3 before 2))

1.  **In-degrees:**
    *   0: 2 (from 1, 2)
    *   1: 1 (from 3)
    *   2: 1 (from 3)
    *   3: 0
2.  **Queue:** [3] (only 3 has in-degree 0)
3.  Dequeue 3. Add 3 to `topologicalOrder`. `visitedCount = 1`.
    *   Neighbors of 3: 1, 2.
    *   Decrement in-degree of 1 (to 0). Enqueue 1.
    *   Decrement in-degree of 2 (to 0). Enqueue 2.
    *   **Queue: [1, 2]**, `topologicalOrder: [3]`
4.  Dequeue 1. Add 1 to `topologicalOrder`. `visitedCount = 2`.
    *   Neighbors of 1: 0.
    *   Decrement in-degree of 0 (to 1).
    *   **Queue: [2]**, `topologicalOrder: [3, 1]`
5.  Dequeue 2. Add 2 to `topologicalOrder`. `visitedCount = 3`.
    *   Neighbors of 2: 0.
    *   Decrement in-degree of 0 (to 0). Enqueue 0.
    *   **Queue: [0]**, `topologicalOrder: [3, 1, 2]`
6.  Dequeue 0. Add 0 to `topologicalOrder`. `visitedCount = 4`.
    *   Neighbors of 0: None.
    *   **Queue: []**, `topologicalOrder: [3, 1, 2, 0]`
7.  Queue empty. `visitedCount` (4) == `numVertices` (4). Return `[3, 1, 2, 0]`.

### Approach 2: DFS-based Topological Sort

**Concept:**
DFS can also be used for topological sorting. When a DFS traversal finishes exploring all descendants of a node, that node can be added to the topological order. By processing nodes in a post-order traversal (adding them to the list after all their children are visited), and then reversing the list, we get a topological sort. Cycle detection is done by tracking nodes currently in the recursion stack.

**How it works:**
1.  **Initialization:**
    *   Maintain a map `visitedState` for each vertex, with three possible states:
        *   `UNVISITED`: Not yet encountered.
        *   `VISITING`: Currently in the recursion stack (part of the current DFS path).
        *   `VISITED`: Finished processing (all descendants explored).
    *   Initialize an empty list (or stack) `topologicalOrder`.
    *   Iterate through all vertices of the graph. If a vertex is `UNVISITED`, start a DFS from it.
2.  **DFS Traversal (`dfsVisit(current)`):**
    *   Mark `current` as `VISITING`.
    *   For each `neighbor` of `current`:
        *   If `neighbor` is `VISITING`: A back-edge is found, meaning a cycle exists. Return `false` (cycle detected).
        *   If `neighbor` is `UNVISITED`:
            *   Recursively call `dfsVisit(neighbor)`. If it returns `false`, propagate `false` (cycle detected).
        *   If `neighbor` is `VISITED`: It has been fully processed and does not lead to a cycle from `current`. Continue.
    *   After visiting all neighbors and ensuring no cycle was found, mark `current` as `VISITED`.
    *   Add `current` to the front of the `topologicalOrder` list (or push onto a stack).
3.  **Result:** If all DFS calls complete without detecting a cycle, the `topologicalOrder` list (or reversed stack) contains a valid topological sequence. Otherwise, return an empty list.

**Pseudocode:**

```
enum State { UNVISITED, VISITING, VISITED }

function findOrderDFS(graph):
    if graph is undirected: handle error

    visitedState = new Map<V, State>()
    for vertex in graph.getVertices():
        visitedState.put(vertex, UNVISITED)
    
    topologicalOrder = new LinkedList<V>() // Use LinkedList to addFirst

    for vertex in graph.getVertices():
        if visitedState.get(vertex) == UNVISITED:
            if not dfsVisit(graph, vertex, visitedState, topologicalOrder):
                return empty_list // Cycle detected
    
    return topologicalOrder // Valid order found

function dfsVisit(graph, current, visitedState, topologicalOrder):
    visitedState.put(current, VISITING)

    for neighbor in graph.getNeighbors(current):
        if visitedState.get(neighbor) == VISITING:
            return false // Cycle detected (back-edge)
        if visitedState.get(neighbor) == UNVISITED:
            if not dfsVisit(graph, neighbor, visitedState, topologicalOrder):
                return false // Propagate cycle detection
    
    visitedState.put(current, VISITED)
    topologicalOrder.addFirst(current) // Add to front for correct order
    return true
```

**ASCII Art Example:**

Graph:
```
3 --> 1 --> 0
|     ^
v     |
2 ----
```
(Courses: 0, 1, 2, 3. Prerequisites: (1 before 0), (2 before 0), (3 before 1), (3 before 2))

Initial `visitedState`: {0:U, 1:U, 2:U, 3:U}, `topologicalOrder`: []

1.  `findOrderDFS` iterates. Starts `dfsVisit(3)` (assuming 3 is iterated first).
    *   `dfsVisit(3)`:
        *   `visitedState`: {0:U, 1:U, 2:U, 3:V_ing}
        *   Neighbors of 3: 1, 2
        *   `dfsVisit(1)`:
            *   `visitedState`: {0:U, 1:V_ing, 2:U, 3:V_ing}
            *   Neighbors of 1: 0
            *   `dfsVisit(0)`:
                *   `visitedState`: {0:V_ing, 1:V_ing, 2:U, 3:V_ing}
                *   Neighbors of 0: None.
                *   Mark 0 as `VISITED`. Add 0 to `topologicalOrder`.
                *   `visitedState`: {0:V_ed, 1:V_ing, 2:U, 3:V_ing}, `topologicalOrder`: [0]
                *   Return true.
            *   (Back to `dfsVisit(1)`) 0 is `VISITED`. Continue.
            *   Mark 1 as `VISITED`. Add 1 to `topologicalOrder`.
            *   `visitedState`: {0:V_ed, 1:V_ed, 2:U, 3:V_ing}, `topologicalOrder`: [1, 0]
            *   Return true.
        *   (Back to `dfsVisit(3)`) 1 is `VISITED`. Continue.
        *   `dfsVisit(2)`:
            *   `visitedState`: {0:V_ed, 1:V_ed, 2:V_ing, 3:V_ing}
            *   Neighbors of 2: 0
            *   0 is `VISITED`. Continue.
            *   Mark 2 as `VISITED`. Add 2 to `topologicalOrder`.
            *   `visitedState`: {0:V_ed, 1:V_ed, 2:V_ed, 3:V_ing}, `topologicalOrder`: [2, 1, 0]
            *   Return true.
        *   (Back to `dfsVisit(3)`) 2 is `VISITED`. Continue.
        *   Mark 3 as `VISITED`. Add 3 to `topologicalOrder`.
        *   `visitedState`: {0:V_ed, 1:V_ed, 2:V_ed, 3:V_ed}, `topologicalOrder`: [3, 2, 1, 0]
        *   Return true.

Final `topologicalOrder`: `[3, 2, 1, 0]`.
```