```javascript
/**
 * detectCycleDirected.js
 *
 * Problem: Detect if a directed graph contains a cycle.
 *
 * This file implements an optimal solution using Depth-First Search (DFS)
 * and a coloring scheme to track visited states.
 */

const Graph = require('../data_structures/Graph'); // For type hinting/understanding graph structure

/**
 * Detects if a directed graph contains a cycle using DFS and a coloring scheme.
 *
 * Algorithm:
 * 1. Initialize three sets for tracking vertex states during DFS:
 *    - `visited`: Stores all vertices that have been completely processed (finished DFS from them).
 *                 (Equivalent to 'black' state in some terminologies).
 *    - `recursionStack`: Stores vertices currently in the recursion stack of the current DFS path.
 *                        (Equivalent to 'gray' state).
 * 2. Iterate through all vertices in the graph. For each vertex `v`:
 *    a. If `v` has not been visited (not in `visited`):
 *       i. Call a recursive helper function `dfs(v)`.
 *       ii. If `dfs(v)` returns true (a cycle was detected), then immediately return true.
 * 3. If the loop completes without finding any cycles, return false.
 *
 * Helper function `dfs(vertex)`:
 * 1. Mark `vertex` as currently in the recursion stack (`recursionStack.add(vertex)`).
 * 2. For each `neighbor` of `vertex`:
 *    a. If `neighbor` is in `recursionStack`:
 *       i. A back-edge to a node currently in the DFS path is found, indicating a cycle. Return true.
 *    b. If `neighbor` has not been completely visited (`!visited.has(neighbor)`):
 *       i. Recursively call `dfs(neighbor)`.
 *       ii. If the recursive call returns true (cycle detected deeper in the path), return true.
 * 3. After exploring all neighbors, `vertex` is no longer in the current DFS path.
 *    Remove `vertex` from `recursionStack` (`recursionStack.delete(vertex)`).
 * 4. Mark `vertex` as completely visited (`visited.add(vertex)`).
 * 5. Return false (no cycle found from this vertex).
 *
 * Time Complexity: O(V + E)
 *   - Each vertex and each edge is visited at most once.
 *   - V is the number of vertices, E is the number of edges.
 * Space Complexity: O(V)
 *   - `visited` and `recursionStack` sets store up to V vertices.
 *   - The recursion call stack can go up to V depth in the worst case (e.g., a long path).
 */
function detectCycleInDirectedGraph(graph) {
    // These sets track the state of vertices during DFS traversal.
    // 'visited' (black nodes): Nodes whose DFS traversal is complete.
    // 'recursionStack' (gray nodes): Nodes currently in the DFS recursion stack (being visited).
    // Unvisited nodes (white nodes) are neither in visited nor recursionStack.
    const visited = new Set();
    const recursionStack = new Set();

    /**
     * Recursive DFS helper function.
     * @param {any} vertex - The current vertex being explored.
     * @returns {boolean} True if a cycle is detected, false otherwise.
     */
    const dfs = (vertex) => {
        // Mark the current vertex as being processed (in the recursion stack)
        recursionStack.add(vertex);

        // Iterate over all neighbors of the current vertex
        for (const [neighbor] of graph.getNeighbors(vertex)) {
            // Case 1: Neighbor is in the current recursion stack. This means a back-edge
            //         is found, pointing to an ancestor in the DFS tree, hence a cycle exists.
            if (recursionStack.has(neighbor)) {
                return true;
            }

            // Case 2: Neighbor has not been fully visited yet (it's 'white').
            //         Perform DFS on this neighbor. If it leads to a cycle, propagate true.
            if (!visited.has(neighbor)) {
                if (dfs(neighbor)) {
                    return true;
                }
            }
            // Case 3: Neighbor has been fully visited (it's 'black').
            //         This means it's part of another completed DFS path and doesn't lead to a cycle from this path.
            //         No action needed, just continue to next neighbor.
        }

        // After visiting all neighbors, remove the current vertex from the recursion stack
        // as its processing is complete for this path.
        recursionStack.delete(vertex);
        // Mark the vertex as fully visited.
        visited.add(vertex);
        return false; // No cycle found from this vertex
    };

    // Iterate over all vertices in the graph.
    // This ensures that all disconnected components are also checked.
    for (const vertex of graph.getAllVertices()) {
        // If a vertex has not been fully visited, start a new DFS traversal from it.
        if (!visited.has(vertex)) {
            if (dfs(vertex)) {
                return true; // Cycle detected
            }
        }
    }

    return false; // No cycle found in the entire graph
}

module.exports = {
    detectCycleInDirectedGraph
};
```