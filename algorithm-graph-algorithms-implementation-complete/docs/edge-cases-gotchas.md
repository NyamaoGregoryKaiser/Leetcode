```markdown
# Graph Algorithms: Edge Cases and Gotchas

Graph problems are notorious for having many tricky edge cases. Being aware of these during an interview and knowing how to handle them (or at least discuss them) is a strong signal of expertise.

---

## General Graph Considerations

1.  **Empty Graph:**
    *   **Description:** A graph with no nodes and no edges.
    *   **Handling:** Most algorithms should gracefully return an empty result (e.g., empty path, 0 cycles, empty MST). Ensure your code doesn't crash on `null` or empty adjacency lists.
    *   **Example:** `shortestPathUnweighted` should return `null` if start/end nodes don't exist. `kruskal` should return `[]`.

2.  **Single Node Graph:**
    *   **Description:** A graph with only one node and no edges.
    *   **Handling:**
        *   Shortest path from node to itself: `[node]`.
        *   No cycles.
        *   MST: empty list (no edges to connect).
    *   **Example:** `shortestPathUnweighted(graph, 'A', 'A')` should return `['A']`.

3.  **Disconnected Graph:**
    *   **Description:** A graph where not all nodes are reachable from each other.
    *   **Handling:**
        *   **Traversal (BFS/DFS):** A single BFS/DFS call from one node will only visit its connected component. To visit all nodes, you need to iterate through all nodes and start a new traversal for any unvisited nodes. (e.g., `hasCycleDirected` does this).
        *   **Shortest Path:** Paths to unreachable nodes should result in `Infinity` (Dijkstra) or `null` (shortestPathUnweighted).
        *   **MST:** For disconnected graphs, Kruskal's algorithm naturally finds a Minimum Spanning *Forest* (an MST for each connected component). Clarify with the interviewer if only an MST for a *connected* graph is expected, in which case you might return `null` or an error if `V-1` edges aren't found.

4.  **Self-Loops (Edge from a node to itself):**
    *   **Description:** An edge `(u, u)`.
    *   **Handling:**
        *   **Cycle Detection (Directed):** A self-loop is a cycle. Your DFS cycle detection should identify this.
        *   **Shortest Path:** Typically, self-loops with positive weight won't be part of a shortest path unless they are the *only* edge available to a node (rare).
        *   **MST:** Kruskal's algorithm will ignore self-loops as they always connect a node to itself, which is already in the same set in DSU.

5.  **Parallel Edges (Multiple edges between the same two nodes):**
    *   **Description:** Two or more edges `(u, v)` with potentially different weights.
    *   **Handling:**
        *   **Adjacency List:** Easily handled; just add all edges to the list.
        *   **Shortest Path (Dijkstra):** The algorithm will naturally prefer the edge with the minimum weight when updating distances.
        *   **MST (Kruskal):** When sorting edges, if multiple edges have the same weight, the order doesn't strictly matter for correctness, but it's good to be consistent. Kruskal's will pick one such edge (the first one encountered in the sorted list) that connects two different components, and subsequent parallel edges between those already-connected components will be ignored.

---

## Specific Algorithm Edge Cases / Gotchas

### BFS (Shortest Path Unweighted)

*   **No Path to Destination:** Handled by returning `null` if the destination is never reached.
*   **Start Node == End Node:** Path is `[startNode]`.
*   **Isolated Nodes:** If `startNode` has no neighbors and `endNode` is different, path is `null`.

### DFS (Cycle Detection in Directed Graph)

*   **Incorrect State Tracking:** The common bug is using only `visited` (boolean) without `visiting` (recursion stack). This leads to incorrectly identifying cycles or missing them. The three-state approach (`UNVISITED`, `VISITING`, `VISITED`) is critical.
*   **Disconnected Components:** Must iterate through all nodes in the graph and start DFS if unvisited to catch cycles in all parts of the graph.

### Dijkstra's Algorithm

*   **Negative Edge Weights:**
    *   **Gotcha:** Dijkstra's **fails** with negative edge weights because its greedy assumption (that the shortest path to an unvisited node is finalized) breaks down. A later negative edge could shorten an already "finalized" path.
    *   **Solution:** For graphs with negative weights (but no negative cycles), use Bellman-Ford algorithm.
*   **Negative Cycles:**
    *   **Gotcha:** If a graph contains a negative cycle reachable from the source, the shortest path becomes undefined (can infinitely decrease by traversing the cycle).
    *   **Solution:** Bellman-Ford can detect negative cycles.
*   **Unreachable Nodes:** Distances should remain `Infinity`. `reconstructPathDijkstra` should return `null`.
*   **Start Node not in Graph:** Should throw an error or return an empty/invalid result.

### Kruskal's Algorithm (MST)

*   **Disconnected Graph:** Kruskal's will find a Minimum Spanning Forest (MSF). Be prepared to discuss this distinction. If an MST is strictly required for connected graphs, you might need to check if `V-1` edges were added.
*   **All Edges Have Same Weight:** Any spanning tree will be an MST. Kruskal's will still work by sorting and adding edges.
*   **Graph is a Tree:** If the input is already a tree, Kruskal's will return the same tree (or an equivalent one if edge weights are tied) as its MST.
*   **Self-Loops/Parallel Edges:** Handled naturally as discussed in general graph considerations.

### Number of Islands (Grid Traversal)

*   **Modifying the Grid:** The most common approach (and implemented here) is to modify '1's to '0's (or some other marker) in-place to mark visited land cells. If the original grid needs to be preserved, make a deep copy first or use a separate `visited` 2D array/set.
*   **Boundary Conditions:** Ensure `isValid(r, c)` checks are correct (e.g., `r >= 0 && r < rows && c >= 0 && c < cols`). Off-by-one errors are common here.
*   **Empty/Invalid Grid:** `null`, empty array, or empty rows should be handled gracefully (return 0 islands).
*   **All Water / All Land:**
    *   **All Water:** 0 islands.
    *   **All Land:** 1 island.
*   **Corner Cases (1x1 grid, 1xN, Nx1 grids):** Ensure correct traversal and counting.

---

### Interview Tips for Edge Cases

*   **Clarify Assumptions:** Always ask clarifying questions. "Is the graph directed or undirected? Weighted or unweighted? Can it have negative weights/cycles? Is it always connected? What about self-loops or parallel edges?"
*   **Test Cases:** Think out loud about your test cases, explicitly mentioning edge cases (empty graph, single node, disconnected components, etc.). This shows foresight.
*   **Discuss Trade-offs:** If a specific edge case leads to a different algorithm (e.g., negative weights -> Bellman-Ford), discuss why your current algorithm fails and what the alternative is.
*   **Error Handling:** Decide with the interviewer how to handle invalid inputs (e.g., return `null`, throw an error, print a warning).