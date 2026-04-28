```javascript
const Graph = require('../data_structures/Graph');

/**
 * Performs a Breadth-First Search (BFS) on an unweighted graph to find the shortest path.
 * BFS guarantees the shortest path in terms of number of edges for unweighted graphs.
 *
 * @param {Graph} graph - The graph instance.
 * @param {any} startVertex - The starting vertex for the BFS.
 * @param {any} targetVertex - The target vertex to find the shortest path to.
 * @returns {Array<any>|null} - An array representing the shortest path from startVertex to targetVertex,
 *                               or null if no path exists or if start/target vertex is invalid.
 *
 * Time Complexity: O(V + E), where V is the number of vertices and E is the number of edges.
 *                  Each vertex and each edge is visited at most once.
 * Space Complexity: O(V), for the queue and the visited/parent maps.
 *
 * Edge Cases:
 * - Empty graph
 * - Graph with a single node
 * - Disconnected graph (start and target in different components)
 * - Start and target are the same
 * - Non-existent start or target vertices
 */
function bfs(graph, startVertex, targetVertex) {
    // Input validation: Check if start and target vertices exist in the graph.
    if (!graph.hasVertex(startVertex) || !graph.hasVertex(targetVertex)) {
        console.warn(`BFS Warning: Start or target vertex not found in graph. Start: ${startVertex}, Target: ${targetVertex}`);
        return null;
    }

    // Base case: If start and target are the same, the path is just the start vertex.
    if (startVertex === targetVertex) {
        return [startVertex];
    }

    // Queue for BFS traversal. Stores vertices to visit.
    const queue = [startVertex];

    // Set to keep track of visited vertices to prevent infinite loops and redundant processing.
    const visited = new Set();
    visited.add(startVertex);

    // Map to reconstruct the path: child -> parent
    const parentMap = new Map();

    while (queue.length > 0) {
        const currentVertex = queue.shift(); // Dequeue the front vertex

        // Explore neighbors of the current vertex
        for (const neighborInfo of graph.getNeighbors(currentVertex)) {
            const neighbor = neighborInfo.vertex;

            if (!visited.has(neighbor)) {
                visited.add(neighbor); // Mark as visited
                parentMap.set(neighbor, currentVertex); // Record parent for path reconstruction
                queue.push(neighbor); // Enqueue for further exploration

                // If the target is found, reconstruct and return the path
                if (neighbor === targetVertex) {
                    const path = [];
                    let crawl = targetVertex;
                    while (crawl !== null) {
                        path.unshift(crawl); // Add to the beginning of the path array
                        crawl = parentMap.get(crawl); // Move to the parent
                        if (crawl === startVertex) { // Add start vertex and break
                            path.unshift(startVertex);
                            break;
                        }
                    }
                    return path;
                }
            }
        }
    }

    // If the loop finishes and target was not found, no path exists.
    return null;
}

module.exports = bfs;
```