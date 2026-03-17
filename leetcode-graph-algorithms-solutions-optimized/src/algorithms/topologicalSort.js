```javascript
/**
 * topologicalSort.js
 *
 * Problem: For a Directed Acyclic Graph (DAG), produce a linear ordering of its vertices
 * such that for every directed edge `u -> v`, vertex `u` comes before `v` in the ordering.
 *
 * This file provides two optimal solutions: Kahn's Algorithm (BFS-based) and DFS-based.
 */

const Graph = require('../data_structures/Graph'); // For type hinting/understanding graph structure

/**
 * --- Approach 1: Kahn's Algorithm (BFS-based) ---
 *
 * Algorithm:
 * 1. Compute the in-degree for every vertex in the graph. The in-degree of a vertex `v`
 *    is the number of incoming edges to `v`.
 * 2. Initialize a queue and add all vertices with an in-degree of 0 to it.
 *    These are the starting points for the topological sort.
 * 3. Initialize an empty list `topologicalOrder` to store the sorted vertices.
 * 4. While the queue is not empty:
 *    a. Dequeue a vertex `u`.
 *    b. Add `u` to `topologicalOrder`.
 *    c. For each neighbor `v` of `u`:
 *       i. Decrement the in-degree of `v`. (Conceptually, `u` is now processed, so its outgoing
 *          edge to `v` no longer contributes to `v`'s dependency count).
 *       ii. If `v`'s in-degree becomes 0, enqueue `v`.
 * 5. After the loop, if the number of vertices in `topologicalOrder` is less than the total
 *    number of vertices in the graph, it implies there was a cycle (and thus, no valid
 *    topological sort can be formed).
 *
 * Time Complexity: O(V + E)
 *   - Computing in-degrees: O(V + E)
 *   - Iterating through vertices and edges using BFS: Each vertex is enqueued/dequeued once,
 *     and each edge is processed once to decrement a neighbor's in-degree.
 * Space Complexity: O(V)
 *   - `inDegrees` map: O(V)
 *   - Queue: O(V) in the worst case (e.g., a graph with many sources initially).
 *   - `topologicalOrder` list: O(V)
 */
function topologicalSortKahn(graph) {
    // 1. Calculate in-degrees for all vertices
    const inDegrees = graph.getInDegrees();

    // 2. Initialize a queue with all vertices that have an in-degree of 0
    const queue = [];
    for (const vertex of graph.getAllVertices()) {
        if (inDegrees.get(vertex) === 0) {
            queue.push(vertex);
        }
    }

    // 3. Initialize the topological order list
    const topologicalOrder = [];
    let visitedCount = 0; // To detect cycles

    // 4. Process vertices in BFS manner
    while (queue.length > 0) {
        const u = queue.shift(); // Dequeue
        topologicalOrder.push(u);
        visitedCount++;

        // For each neighbor v of u
        for (const [v] of graph.getNeighbors(u)) {
            // Decrement in-degree of v
            inDegrees.set(v, inDegrees.get(v) - 1);
            // If v's in-degree becomes 0, it means all its prerequisites are met, enqueue it
            if (inDegrees.get(v) === 0) {
                queue.push(v);
            }
        }
    }

    // 5. Check for cycles: If visitedCount is less than total vertices, a cycle exists
    // (a cycle implies some vertices will never have their in-degree reduced to 0).
    if (visitedCount !== graph.numVertices) {
        throw new Error("Graph has a cycle, topological sort is not possible.");
    }

    return topologicalOrder;
}


/**
 * --- Approach 2: DFS-based Topological Sort ---
 *
 * Algorithm:
 * 1. Initialize an empty list `topologicalOrder` to store the sorted vertices.
 * 2. Initialize a set `visited` to keep track of vertices whose DFS has completed.
 * 3. Initialize a set `recursionStack` (or `visiting`) to detect cycles (vertices currently in recursion path).
 *    (This implementation implicitly uses the `visited` set to ensure each vertex is processed only once,
 *    and combines the cycle detection directly into the DFS structure).
 * 4. For each vertex `v` in the graph:
 *    a. If `v` has not been visited (`!visited.has(v)`):
 *       i. Call a recursive helper function `dfs(v)`.
 *       ii. If `dfs(v)` indicates a cycle, throw an error.
 *
 * Helper function `dfs(vertex)`:
 * 1. Add `vertex` to `recursionStack` (or `visiting` set). This marks it as 'gray'.
 * 2. For each `neighbor` of `vertex`:
 *    a. If `neighbor` is in `recursionStack`:
 *       i. Cycle detected. Return true to signal a cycle.
 *    b. If `neighbor` is not in `visited` (i.e., it's 'white'):
 *       i. Recursively call `dfs(neighbor)`.
 *       ii. If the recursive call returns true (cycle detected), propagate true.
 * 3. After visiting all neighbors, remove `vertex` from `recursionStack`. This marks it as 'black'.
 * 4. Add `vertex` to `visited`.
 * 5. Prepend `vertex` to `topologicalOrder`. (This is because `vertex` has no outgoing edges to unvisited nodes anymore,
 *    so it can be placed before any node that depends on it).
 * 6. Return false (no cycle found through this path).
 *
 * Time Complexity: O(V + E)
 *   - Each vertex and edge is visited once.
 * Space Complexity: O(V)
 *   - `visited` and `recursionStack` sets store up to V entries.
 *   - Recursion stack depth can be O(V) in the worst case (skewed graph).
 *   - `topologicalOrder` list stores V entries.
 */
function topologicalSortDFS(graph) {
    const topologicalOrder = [];
    const visited = new Set();        // Nodes whose DFS is complete (black nodes)
    const recursionStack = new Set(); // Nodes currently in the DFS path (gray nodes)

    const dfs = (vertex) => {
        // Mark current node as visiting
        recursionStack.add(vertex);

        for (const [neighbor] of graph.getNeighbors(vertex)) {
            if (recursionStack.has(neighbor)) {
                // Found a back-edge to an ancestor in the current DFS path -> Cycle!
                throw new Error("Graph has a cycle, topological sort is not possible.");
            }

            if (!visited.has(neighbor)) { // If neighbor hasn't been fully visited (is white)
                dfs(neighbor); // Recurse
            }
            // If neighbor is in 'visited' (black), it's already processed, no need to recurse
        }

        // After visiting all neighbors and their subtrees, this node is fully processed.
        // Remove from recursion stack (no longer 'gray')
        recursionStack.delete(vertex);
        // Mark as fully visited (now 'black')
        visited.add(vertex);
        // Prepend to topological order, as it has no dependencies left
        topologicalOrder.unshift(vertex);
    };

    // Iterate over all vertices to ensure all components are visited
    for (const vertex of graph.getAllVertices()) {
        if (!visited.has(vertex)) {
            dfs(vertex);
        }
    }

    return topologicalOrder;
}

module.exports = {
    topologicalSortKahn,
    topologicalSortDFS
};
```