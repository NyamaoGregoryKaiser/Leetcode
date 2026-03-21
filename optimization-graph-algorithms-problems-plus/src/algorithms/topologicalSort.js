const { Graph } = require('../data-structures/Graph');

/**
 * Performs a topological sort using Kahn's algorithm (BFS-based).
 * This algorithm works only for Directed Acyclic Graphs (DAGs).
 *
 * @param {Graph} graph - The directed graph to sort.
 * @returns {Array<*> | null} An array of vertices in topological order, or null if a cycle is detected.
 *
 * Time Complexity: O(V + E), where V is the number of vertices and E is the number of edges.
 *   Calculating in-degrees takes O(V+E). BFS-like traversal takes O(V+E).
 * Space Complexity: O(V) for the in-degree map and the queue.
 */
function topologicalSortKahn(graph) {
    if (!graph.isDirected) {
        console.error("Kahn's algorithm is for directed graphs only.");
        return null;
    }

    /**
     * Map to store the in-degree of each vertex.
     * @type {Map<*, number>}
     */
    const inDegrees = new Map();
    for (const vertex of graph.getVertices()) {
        inDegrees.set(vertex, 0); // Initialize all in-degrees to 0
    }

    // Calculate in-degrees for all vertices
    for (const vertex of graph.getVertices()) {
        const neighbors = graph.getNeighbors(vertex);
        if (neighbors) {
            for (const edge of neighbors) {
                const neighbor = edge.neighbor;
                inDegrees.set(neighbor, inDegrees.get(neighbor) + 1);
            }
        }
    }

    /**
     * Queue for vertices with an in-degree of 0.
     * These are the starting points for the topological sort.
     * @type {Array<*>}
     */
    const queue = [];
    for (const [vertex, degree] of inDegrees.entries()) {
        if (degree === 0) {
            queue.push(vertex);
        }
    }

    /**
     * The result array storing the topologically sorted vertices.
     * @type {Array<*>}
     */
    const result = [];
    let visitedCount = 0; // To detect cycles

    while (queue.length > 0) {
        const currentVertex = queue.shift();
        result.push(currentVertex);
        visitedCount++;

        const neighbors = graph.getNeighbors(currentVertex);
        if (neighbors) {
            for (const edge of neighbors) {
                const neighbor = edge.neighbor;
                inDegrees.set(neighbor, inDegrees.get(neighbor) - 1); // Decrement in-degree of neighbor
                if (inDegrees.get(neighbor) === 0) {
                    queue.push(neighbor); // If in-degree becomes 0, add to queue
                }
            }
        }
    }

    // If the number of visited vertices is less than the total number of vertices,
    // it means there's a cycle in the graph.
    if (visitedCount !== graph.getVertices().size) {
        console.warn("Kahn's algorithm: Cycle detected in graph. Topological sort not possible.");
        return null;
    }

    return result;
}

/**
 * Performs a topological sort using Depth-First Search (DFS) based approach.
 * This algorithm works only for Directed Acyclic Graphs (DAGs).
 *
 * @param {Graph} graph - The directed graph to sort.
 * @returns {Array<*> | null} An array of vertices in topological order, or null if a cycle is detected.
 *
 * Time Complexity: O(V + E), where V is the number of vertices and E is the number of edges.
 *   Each vertex and edge is visited once.
 * Space Complexity: O(V) for the recursion stack, visited set, and recursion status map.
 */
function topologicalSortDFS(graph) {
    if (!graph.isDirected) {
        console.error("DFS-based topological sort is for directed graphs only.");
        return null;
    }

    const visited = new Set(); // Stores vertices that have been fully processed (all descendants visited).
    const recursionStack = new Set(); // Stores vertices currently in the recursion stack (i.e., being visited).
    const result = []; // Stores the sorted vertices in reverse order of finish time.

    /**
     * Recursive DFS helper function.
     * @param {*} vertex - The current vertex being visited.
     * @returns {boolean} True if no cycle is detected in the subtree rooted at `vertex`, false otherwise.
     */
    function dfs(vertex) {
        visited.add(vertex);
        recursionStack.add(vertex); // Mark as currently in recursion stack

        const neighbors = graph.getNeighbors(vertex);
        if (neighbors) {
            for (const edge of neighbors) {
                const neighbor = edge.neighbor;

                // If neighbor is in recursion stack, a back-edge (cycle) is detected.
                if (recursionStack.has(neighbor)) {
                    return false; // Cycle detected
                }

                // If neighbor has not been fully visited, recurse.
                if (!visited.has(neighbor)) {
                    if (!dfs(neighbor)) {
                        return false; // Cycle detected further down
                    }
                }
            }
        }

        recursionStack.delete(vertex); // Remove from recursion stack as all descendants processed.
        result.unshift(vertex); // Add to the front of the result list (reverse order of finish time).
        return true;
    }

    // Iterate over all vertices to ensure disconnected components are also processed.
    for (const vertex of graph.getVertices()) {
        if (!visited.has(vertex)) {
            if (!dfs(vertex)) {
                console.warn("DFS-based topological sort: Cycle detected in graph. Topological sort not possible.");
                return null; // Cycle detected
            }
        }
    }

    return result;
}

module.exports = {
    topologicalSortKahn,
    topologicalSortDFS,
};