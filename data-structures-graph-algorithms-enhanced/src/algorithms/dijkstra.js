```javascript
const Graph = require('../data_structures/Graph');
const PriorityQueue = require('../data_structures/PriorityQueue');

/**
 * Implements Dijkstra's Algorithm to find the shortest paths from a single source
 * to all other vertices in a weighted graph with non-negative edge weights.
 *
 * @param {Graph} graph - The graph instance. Expected to be directed or undirected.
 *                        Weights must be non-negative.
 * @param {any} startVertex - The starting vertex for finding shortest paths.
 * @returns {object|null} - An object containing:
 *                          - `distances`: A Map where key is vertex and value is its shortest distance from startVertex.
 *                          - `paths`: A Map where key is vertex and value is the previous vertex in the shortest path.
 *                          Returns null if startVertex is not in the graph.
 *
 * Time Complexity: O(E log V) using a binary heap (PriorityQueue).
 *                  E is the number of edges, V is the number of vertices.
 *                  If a simple array scan for min-distance is used, it becomes O(V^2 + E) or O(V^2).
 * Space Complexity: O(V + E) for distances, paths, visited sets, and priority queue.
 *
 * Assumptions:
 * - Edge weights are non-negative. Dijkstra's does not work correctly with negative weights.
 * - Graph can be disconnected. Nodes unreachable from the start will have `Infinity` distance.
 *
 * Algorithm Steps:
 * 1. Initialize `distances` map with `Infinity` for all vertices and `0` for the `startVertex`.
 * 2. Initialize `paths` map to keep track of the predecessor for reconstructing paths.
 * 3. Create a `PriorityQueue` and add the `startVertex` with priority `0`.
 * 4. While the priority queue is not empty:
 *    a. Extract the vertex `u` with the smallest distance from the priority queue.
 *    b. If `u` has already been visited with a shorter path, skip it (due to lazy updates in PQ).
 *    c. Mark `u` as visited.
 *    d. For each neighbor `v` of `u`:
 *       i. Calculate the distance from `startVertex` to `v` through `u`: `dist_u + weight_uv`.
 *       ii. If this calculated distance is less than the currently known distance to `v`:
 *           - Update `distances[v]`.
 *           - Update `paths[v]` to `u`.
 *           - Add `v` to the priority queue with the new, lower priority.
 */
function dijkstra(graph, startVertex) {
    if (!graph.hasVertex(startVertex)) {
        console.warn(`Dijkstra Warning: Start vertex '${startVertex}' not found in graph.`);
        return null;
    }

    const distances = new Map(); // Stores the shortest distance from startVertex to each vertex.
    const paths = new Map();     // Stores the predecessor vertex for path reconstruction.
    const pq = new PriorityQueue(); // Min-Priority Queue to get the next vertex with the smallest distance.

    // Initialize distances for all vertices.
    for (const vertex of graph.getVertices()) {
        distances.set(vertex, Infinity);
        paths.set(vertex, null); // No predecessor initially
    }

    // Distance to the start vertex itself is 0.
    distances.set(startVertex, 0);
    // Add the start vertex to the priority queue with priority 0.
    pq.enqueue({
        value: startVertex,
        priority: 0
    });

    // We don't need an explicit 'visited' set if we correctly handle
    // redundant entries from the priority queue (i.e., if we extract a node
    // that has already been processed with a shorter path, we just ignore it).
    // The check `currentDistance > distances.get(currentVertex)` handles this.

    while (!pq.isEmpty()) {
        const {
            value: currentVertex,
            priority: currentDistance
        } = pq.dequeue();

        // If we have already found a shorter path to currentVertex, skip this entry.
        // This handles "lazy updates" in the priority queue where a vertex might be
        // enqueued multiple times with different priorities. We only care about the first one (lowest priority).
        if (currentDistance > distances.get(currentVertex)) {
            continue;
        }

        // Explore neighbors of the current vertex
        for (const neighborInfo of graph.getNeighbors(currentVertex)) {
            const neighbor = neighborInfo.vertex;
            const weight = neighborInfo.weight;

            // Calculate distance to neighbor through currentVertex
            const distanceThroughCurrent = currentDistance + weight;

            // If a shorter path to the neighbor is found
            if (distanceThroughCurrent < distances.get(neighbor)) {
                distances.set(neighbor, distanceThroughCurrent); // Update distance
                paths.set(neighbor, currentVertex); // Update predecessor
                pq.enqueue({
                    value: neighbor,
                    priority: distanceThroughCurrent
                }); // Add/update neighbor in PQ
            }
        }
    }

    return {
        distances,
        paths
    };
}

/**
 * Helper function to reconstruct the shortest path from the 'paths' map.
 * @param {any} startVertex - The original start vertex used in Dijkstra.
 * @param {any} targetVertex - The target vertex for which to reconstruct the path.
 * @param {Map} paths - The map of predecessors returned by Dijkstra's.
 * @returns {Array<any>|null} - An array representing the shortest path, or null if no path exists.
 */
function reconstructPath(startVertex, targetVertex, paths) {
    const path = [];
    let current = targetVertex;

    // Check if target is unreachable (no path recorded to it, or it's the start and paths map is empty)
    if (paths.get(targetVertex) === null && targetVertex !== startVertex) {
        return null;
    }

    while (current !== null) {
        path.unshift(current); // Add current vertex to the beginning of the path
        current = paths.get(current); // Move to the predecessor
        if (current === startVertex && path[0] !== startVertex) { // Handle case where start is not pushed yet
            path.unshift(startVertex);
            break;
        }
    }

    // If the path starts with the start vertex and ends with target, it's valid.
    // Otherwise, it might be an isolated target or unreachable.
    if (path.length > 0 && path[0] === startVertex && path[path.length - 1] === targetVertex) {
        return path;
    }
    return null; // No path found
}


module.exports = {
    dijkstra,
    reconstructPath
};
```