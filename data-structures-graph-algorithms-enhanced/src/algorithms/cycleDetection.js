```javascript
const Graph = require('../data_structures/Graph');

/**
 * Detects a cycle in a Directed Graph using DFS.
 * Relies on three states for each node during DFS:
 * 1. Unvisited (not in `visited` or `recursionStack`)
 * 2. Visiting (in `recursionStack`, but not fully processed yet)
 * 3. Visited (in `visited`, fully processed)
 *
 * A cycle is detected if we encounter a node that is currently in the `recursionStack`
 * during a DFS traversal. This indicates a back-edge.
 *
 * @param {Graph} graph - The directed graph instance.
 * @returns {boolean} - True if a cycle is detected, false otherwise.
 *
 * Time Complexity: O(V + E) - Each vertex and each edge is visited once.
 * Space Complexity: O(V) - For `visited` set, `recursionStack` set, and recursion stack of DFS.
 */
function detectCycleDirected(graph) {
    if (!graph.directed) {
        console.warn("detectCycleDirected called on an undirected graph. Please use detectCycleUndirected for undirected graphs.");
        return false; // Or throw an error, depending on desired strictness.
    }

    const visited = new Set();         // Stores all nodes whose DFS traversal has started or completed.
    const recursionStack = new Set();  // Stores nodes currently in the recursion stack (current DFS path).

    // Helper DFS function to check for cycles
    function dfs(vertex) {
        visited.add(vertex);
        recursionStack.add(vertex); // Mark current node as part of the recursion stack

        // Explore neighbors
        for (const neighborInfo of graph.getNeighbors(vertex)) {
            const neighbor = neighborInfo.vertex;

            // If neighbor is in recursionStack, a cycle is detected (back-edge).
            if (recursionStack.has(neighbor)) {
                return true; // Cycle found
            }

            // If neighbor has not been visited, recurse
            if (!visited.has(neighbor)) {
                if (dfs(neighbor)) {
                    return true; // Propagate cycle detection upwards
                }
            }
        }

        // After visiting all neighbors and their subtrees, remove from recursion stack.
        // This node's DFS path is complete.
        recursionStack.delete(vertex);
        return false; // No cycle found in this path
    }

    // Iterate over all vertices to ensure all disconnected components are covered.
    for (const vertex of graph.getVertices()) {
        if (!visited.has(vertex)) {
            if (dfs(vertex)) {
                return true; // Cycle found in one of the DFS traversals
            }
        }
    }

    return false; // No cycles found in any component
}

/**
 * Detects a cycle in an Undirected Graph using DFS.
 * For an undirected graph, a cycle is detected if we encounter an already visited vertex
 * that is not the direct parent of the current vertex in the DFS tree.
 *
 * @param {Graph} graph - The undirected graph instance.
 * @returns {boolean} - True if a cycle is detected, false otherwise.
 *
 * Time Complexity: O(V + E) - Each vertex and each edge is visited once.
 * Space Complexity: O(V) - For `visited` set and recursion stack of DFS.
 */
function detectCycleUndirected(graph) {
    if (graph.directed) {
        console.warn("detectCycleUndirected called on a directed graph. Please use detectCycleDirected for directed graphs.");
        return false; // Or throw an error.
    }

    const visited = new Set(); // Stores all nodes whose DFS traversal has completed.

    // Helper DFS function to check for cycles
    // `parent` is crucial here to distinguish back-edges from tree-edges.
    function dfs(vertex, parent) {
        visited.add(vertex); // Mark current node as visited

        // Explore neighbors
        for (const neighborInfo of graph.getNeighbors(vertex)) {
            const neighbor = neighborInfo.vertex;

            // If neighbor is visited AND is not the parent, a cycle is detected.
            // This is a back-edge to an already visited node that's not its immediate parent.
            if (visited.has(neighbor) && neighbor !== parent) {
                return true; // Cycle found
            }

            // If neighbor has not been visited, recurse
            if (!visited.has(neighbor)) {
                if (dfs(neighbor, vertex)) { // Pass current vertex as parent for the recursive call
                    return true; // Propagate cycle detection upwards
                }
            }
        }
        return false; // No cycle found in this path
    }

    // Iterate over all vertices to ensure all disconnected components are covered.
    for (const vertex of graph.getVertices()) {
        if (!visited.has(vertex)) {
            // Start DFS from this unvisited vertex. Parent is null for the root of a DFS tree.
            if (dfs(vertex, null)) {
                return true; // Cycle found in one of the DFS traversals
            }
        }
    }

    return false; // No cycles found in any component
}

module.exports = {
    detectCycleDirected,
    detectCycleUndirected
};
```