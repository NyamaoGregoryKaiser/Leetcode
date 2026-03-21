const { Graph } = require('../data-structures/Graph');

/**
 * Finds if a path exists between two vertices using Breadth-First Search (BFS).
 * This also finds *a* shortest path in terms of number of edges for an unweighted graph.
 *
 * @param {Graph} graph - The graph to search.
 * @param {*} startVertex - The starting vertex.
 * @param {*} endVertex - The target vertex.
 * @returns {boolean | null} True if a path exists, false otherwise. Returns null if start/end vertex is not in the graph.
 *
 * Time Complexity: O(V + E), where V is the number of vertices and E is the number of edges.
 *   Each vertex is visited once, and each edge is examined once.
 * Space Complexity: O(V) for the queue and visited set.
 */
function bfsPathExists(graph, startVertex, endVertex) {
    if (!graph.hasVertex(startVertex) || !graph.hasVertex(endVertex)) {
        console.warn(`BFS Path Exists: Start or end vertex not found in graph.`);
        return null; // Invalid input vertices
    }
    if (startVertex === endVertex) {
        return true; // Path to self always exists
    }

    const queue = [startVertex];
    const visited = new Set();
    visited.add(startVertex);

    while (queue.length > 0) {
        const currentVertex = queue.shift();

        for (const edge of graph.getNeighbors(currentVertex)) {
            const neighbor = edge.neighbor;
            if (neighbor === endVertex) {
                return true; // Path found
            }
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }

    return false; // No path found
}

/**
 * Finds if a path exists between two vertices using Depth-First Search (DFS) recursively.
 *
 * @param {Graph} graph - The graph to search.
 * @param {*} startVertex - The starting vertex.
 * @param {*} endVertex - The target vertex.
 * @returns {boolean | null} True if a path exists, false otherwise. Returns null if start/end vertex is not in the graph.
 *
 * Time Complexity: O(V + E), where V is the number of vertices and E is the number of edges.
 *   Each vertex is visited once, and each edge is examined once.
 * Space Complexity: O(V) for the recursion stack and visited set in the worst case (e.g., a long path).
 */
function dfsPathExists(graph, startVertex, endVertex) {
    if (!graph.hasVertex(startVertex) || !graph.hasVertex(endVertex)) {
        console.warn(`DFS Path Exists: Start or end vertex not found in graph.`);
        return null; // Invalid input vertices
    }
    if (startVertex === endVertex) {
        return true; // Path to self always exists
    }

    const visited = new Set();

    /**
     * Recursive helper function for DFS.
     * @param {*} currentVertex - The current vertex being visited.
     * @returns {boolean} True if a path from currentVertex to endVertex is found, false otherwise.
     */
    function dfsRecursive(currentVertex) {
        visited.add(currentVertex);

        if (currentVertex === endVertex) {
            return true;
        }

        for (const edge of graph.getNeighbors(currentVertex)) {
            const neighbor = edge.neighbor;
            if (!visited.has(neighbor)) {
                if (dfsRecursive(neighbor)) {
                    return true; // Path found through this neighbor
                }
            }
        }
        return false; // No path found from this branch
    }

    return dfsRecursive(startVertex);
}

/**
 * Finds *a* shortest path (in terms of number of edges) between two vertices in an unweighted graph using BFS.
 * Reconstructs the path by backtracking from the end vertex to the start vertex using `previous` map.
 *
 * @param {Graph} graph - The graph to search.
 * @param {*} startVertex - The starting vertex.
 * @param {*} endVertex - The target vertex.
 * @returns {Array<*> | null} An array of vertices representing the shortest path, or null if no path exists or invalid vertices.
 *
 * Time Complexity: O(V + E), where V is the number of vertices and E is the number of edges.
 * Space Complexity: O(V) for the queue, visited set, and `previous` map.
 */
function bfsShortestPath(graph, startVertex, endVertex) {
    if (!graph.hasVertex(startVertex) || !graph.hasVertex(endVertex)) {
        console.warn(`BFS Shortest Path: Start or end vertex not found in graph.`);
        return null; // Invalid input vertices
    }
    if (startVertex === endVertex) {
        return [startVertex]; // Path to self is just the vertex
    }

    const queue = [startVertex];
    const visited = new Set();
    visited.add(startVertex);
    /**
     * Stores the predecessor of each vertex in the shortest path found so far.
     * @type {Map<*, *>}
     */
    const previous = new Map();
    previous.set(startVertex, null); // Start vertex has no predecessor

    let pathFound = false;

    while (queue.length > 0) {
        const currentVertex = queue.shift();

        // If we reached the end, no need to explore further from here
        if (currentVertex === endVertex) {
            pathFound = true;
            break;
        }

        for (const edge of graph.getNeighbors(currentVertex)) {
            const neighbor = edge.neighbor;
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                previous.set(neighbor, currentVertex); // Mark currentVertex as predecessor
                queue.push(neighbor);
            }
        }
    }

    if (!pathFound) {
        return null; // No path found
    }

    // Reconstruct the path from endVertex back to startVertex
    const path = [];
    let current = endVertex;
    while (current !== null) {
        path.unshift(current); // Add to the beginning of the path
        current = previous.get(current);
    }

    return path;
}

module.exports = {
    bfsPathExists,
    dfsPathExists,
    bfsShortestPath,
};