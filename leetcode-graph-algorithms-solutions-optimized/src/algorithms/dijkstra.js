```javascript
/**
 * dijkstra.js
 *
 * Implements Dijkstra's algorithm to find the shortest paths from a single source
 * to all other vertices in a weighted graph with non-negative edge weights.
 */

const MinPriorityQueue = require('../data_structures/MinPriorityQueue');
const Graph = require('../data_structures/Graph'); // For type hinting/understanding graph structure

/**
 * Dijkstra's Algorithm for Shortest Path.
 *
 * @param {Graph} graph - The graph represented by an Adjacency List.
 *                        Assumes non-negative edge weights.
 * @param {any} startVertex - The starting vertex for finding shortest paths.
 * @returns {object} An object containing:
 *   - `distances`: A Map where keys are vertices and values are their shortest distances from `startVertex`.
 *                  Infinity if unreachable.
 *   - `paths`: A Map where keys are vertices and values are the preceding vertex in the shortest path.
 *              Can be used to reconstruct the path.
 *
 * Time Complexity: O(E log V)
 *   - Where V is the number of vertices and E is the number of edges.
 *   - Each edge relaxation (updating distance) involves a priority queue `enqueue` or `decrease-key` operation.
 *     With a binary heap, `enqueue` is O(log V) and `decrease-key` can be O(log V) if implemented efficiently
 *     (though standard JS `Map` and re-enqueue might make it O(E log E) or O(E log V) depending on how you count).
 *   - In this implementation, we re-enqueue. The PQ size can grow up to E, but only V distinct vertices are dequeued.
 *     If we consider the actual number of useful `dequeue` operations (V), and E edge relaxations,
 *     it's typically E log V. Each `enqueue` and `dequeue` operation takes `log K` time, where K is the number of elements in the PQ.
 *     In worst case, K could be E. But often analyzed as V `dequeue`s and E `enqueue`s.
 * Space Complexity: O(V + E)
 *   - `distances` and `paths` Maps store V entries.
 *   - The priority queue can store up to E entries in the worst case (if many relaxations cause multiple entries for the same vertex).
 */
function dijkstra(graph, startVertex) {
    if (!graph.hasVertex(startVertex)) {
        throw new Error(`Start vertex ${startVertex} not found in the graph.`);
    }

    // Initialize distances: all to Infinity, startVertex to 0
    const distances = new Map();
    const paths = new Map(); // To reconstruct shortest paths
    const pq = new MinPriorityQueue();

    for (const vertex of graph.getAllVertices()) {
        distances.set(vertex, Infinity);
        paths.set(vertex, null); // No predecessor initially
    }
    distances.set(startVertex, 0);

    // Add startVertex to priority queue with priority 0
    pq.enqueue(startVertex, 0);

    while (!pq.isEmpty()) {
        const { value: currentVertex, priority: currentDistance } = pq.dequeue();

        // If we've already found a shorter path to currentVertex, skip
        // This is important because we might have multiple entries for the same vertex in the PQ
        // due to lazy updates (re-enqueuing instead of decrease-key).
        if (currentDistance > distances.get(currentVertex)) {
            continue;
        }

        // Explore neighbors of the currentVertex
        for (const [neighbor, weight] of graph.getNeighbors(currentVertex)) {
            const distance = currentDistance + weight;

            // If a shorter path to neighbor is found
            if (distance < distances.get(neighbor)) {
                distances.set(neighbor, distance); // Update distance
                paths.set(neighbor, currentVertex); // Update predecessor
                pq.enqueue(neighbor, distance);     // Add or update in priority queue
            }
        }
    }

    return { distances, paths };
}

/**
 * Helper function to reconstruct the path from startVertex to endVertex.
 *
 * @param {any} startVertex - The starting vertex.
 * @param {any} endVertex - The destination vertex.
 * @param {Map<any, any>} paths - The 'paths' map returned by Dijkstra's algorithm.
 * @returns {Array<any> | null} An array of vertices representing the path, or null if no path.
 */
function reconstructPath(startVertex, endVertex, paths) {
    const path = [];
    let current = endVertex;

    // Traverse back from endVertex using the paths map
    while (current !== null) {
        path.unshift(current); // Add to the beginning of the array
        if (current === startVertex) break; // Reached the start
        current = paths.get(current);
    }

    // If the path doesn't start with startVertex, it means endVertex was unreachable
    if (path[0] !== startVertex) {
        return null;
    }

    return path;
}


module.exports = {
    dijkstra,
    reconstructPath
};
```