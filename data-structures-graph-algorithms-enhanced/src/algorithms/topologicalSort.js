```javascript
const Graph = require('../data_structures/Graph');

/**
 * Performs Topological Sort using Depth-First Search (DFS).
 * Topological sort is possible only for Directed Acyclic Graphs (DAGs).
 * If a cycle is detected, it returns null.
 *
 * @param {Graph} graph - The graph instance. Must be a directed graph.
 * @returns {Array<any>|null} - An array of vertices in topological order, or null if a cycle is detected.
 *
 * Time Complexity: O(V + E) - Each vertex and edge is visited once.
 * Space Complexity: O(V) - For visited, recursion stack, and recursionStack maps.
 *
 * Key Concepts:
 * - `visited`: Set to keep track of globally visited nodes (nodes whose DFS is complete or in progress).
 * - `recursionStack`: Set to keep track of nodes currently in the recursion stack of the *current* DFS path.
 *   If we encounter a node in `recursionStack` again, it means we found a back-edge, indicating a cycle.
 * - `resultStack`: Stores nodes in post-order traversal. Reversing this gives topological order.
 */
function topologicalSort(graph) {
    if (!graph.directed) {
        // Topological sort is inherently for directed graphs.
        // While an undirected graph might technically have an ordering,
        // the concept of "u comes before v" for (u,v) edges doesn't apply cleanly.
        // It's usually a strong indicator of a misunderstanding if asked for undirected.
        console.error("Topological sort is applicable only to Directed Acyclic Graphs (DAGs). The provided graph is undirected.");
        return null;
    }

    const visited = new Set(); // Stores all nodes whose DFS traversal has started or completed.
    const recursionStack = new Set(); // Stores nodes currently in the recursion stack (current DFS path).
    const resultStack = []; // Stores the sorted nodes in reverse topological order (post-order traversal).

    // Helper DFS function
    function dfs(vertex) {
        visited.add(vertex);
        recursionStack.add(vertex); // Mark current node as part of the recursion stack

        // Explore neighbors
        for (const neighborInfo of graph.getNeighbors(vertex)) {
            const neighbor = neighborInfo.vertex;

            // If neighbor is in recursionStack, a cycle is detected.
            if (recursionStack.has(neighbor)) {
                // Cycle detected: a back-edge to a node currently being processed.
                return true; // Indicate cycle found
            }

            // If neighbor has not been visited, recurse
            if (!visited.has(neighbor)) {
                if (dfs(neighbor)) {
                    return true; // Propagate cycle detection upwards
                }
            }
        }

        // After visiting all neighbors and their subtrees, remove from recursion stack
        // and add to result stack.
        recursionStack.delete(vertex);
        resultStack.push(vertex); // Add to the stack in post-order
        return false; // No cycle found in this path
    }

    // Iterate over all vertices to ensure all disconnected components are covered.
    for (const vertex of graph.getVertices()) {
        if (!visited.has(vertex)) {
            if (dfs(vertex)) {
                // If a cycle is detected in any DFS traversal, topological sort is not possible.
                console.error("Topological sort failed: Cycle detected in graph.");
                return null;
            }
        }
    }

    // The resultStack holds nodes in reverse topological order.
    return resultStack.reverse();
}


/**
 * Alternative approach: Kahn's Algorithm (BFS-based Topological Sort)
 * This algorithm is also O(V + E) and can be easier to implement iteratively.
 * It works by repeatedly finding nodes with an in-degree of 0, adding them to the result,
 * and decrementing the in-degree of their neighbors.
 * If at the end, the number of processed nodes is less than total nodes, a cycle exists.
 *
 * @param {Graph} graph - The graph instance. Must be a directed graph.
 * @returns {Array<any>|null} - An array of vertices in topological order, or null if a cycle is detected.
 *
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
function topologicalSortKahn(graph) {
    if (!graph.directed) {
        console.error("Kahn's algorithm is applicable only to Directed Acyclic Graphs (DAGs). The provided graph is undirected.");
        return null;
    }

    const inDegree = new Map();
    const queue = [];
    const result = [];
    const vertices = graph.getVertices();

    // Initialize in-degrees for all vertices to 0
    for (const v of vertices) {
        inDegree.set(v, 0);
    }

    // Calculate in-degrees for all vertices
    for (const v of vertices) {
        for (const neighborInfo of graph.getNeighbors(v)) {
            const neighbor = neighborInfo.vertex;
            inDegree.set(neighbor, (inDegree.get(neighbor) || 0) + 1);
        }
    }

    // Add all vertices with in-degree 0 to the queue
    for (const v of vertices) {
        if (inDegree.get(v) === 0) {
            queue.push(v);
        }
    }

    let processedCount = 0;
    while (queue.length > 0) {
        const u = queue.shift();
        result.push(u);
        processedCount++;

        // For each neighbor v of u, decrement its in-degree
        // If v's in-degree becomes 0, add it to the queue
        for (const neighborInfo of graph.getNeighbors(u)) {
            const v = neighborInfo.vertex;
            inDegree.set(v, inDegree.get(v) - 1);
            if (inDegree.get(v) === 0) {
                queue.push(v);
            }
        }
    }

    // If the number of processed vertices is less than the total number of vertices,
    // it means there's a cycle in the graph.
    if (processedCount !== vertices.length) {
        console.error("Kahn's algorithm failed: Cycle detected in graph.");
        return null;
    }

    return result;
}


// Export the DFS-based topological sort as the primary one,
// but keep Kahn's as an internally available alternative for reference.
module.exports = topologicalSort;
// You can also export: module.exports = { topologicalSort: topologicalSort, topologicalSortKahn: topologicalSortKahn };
```