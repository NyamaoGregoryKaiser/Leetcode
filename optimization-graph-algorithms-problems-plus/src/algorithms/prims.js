const { Graph } = require('../data-structures/Graph');
const PriorityQueue = require('../data-structures/PriorityQueue');

/**
 * Implements Prim's algorithm to find the Minimum Spanning Tree (MST)
 * for a connected, undirected, weighted graph.
 *
 * @param {Graph} graph - The undirected, weighted graph.
 * @returns {{mstWeight: number, mstEdges: Array<Array<*>>} | null} An object containing:
 *   - `mstWeight`: The total weight of the MST.
 *   - `mstEdges`: An array of edges `[u, v, weight]` that form the MST.
 *   Returns null if the graph is empty or not connected.
 *
 * Time Complexity: O(E log V) if using a binary heap (PriorityQueue),
 *   where V is the number of vertices and E is the number of edges.
 *   Each edge is added/updated in the PQ at most once (log V), and each vertex extracted once (log V).
 * Space Complexity: O(V + E) for storing costs, predecessors, visited set, and the priority queue.
 */
function prims(graph) {
    const vertices = Array.from(graph.getVertices());
    if (vertices.length === 0) {
        console.warn("Prim's: Graph is empty.");
        return null;
    }

    // Ensure graph is undirected (Prim's is for undirected graphs)
    // For this project, we assume the input Graph is correctly set up as undirected if isDirected=false.
    // A robust implementation might check or convert it.

    /**
     * Stores the minimum cost to reach a vertex from the MST.
     * Initialized to Infinity for all vertices except the startVertex (0).
     * @type {Map<*, number>}
     */
    const minCost = new Map();
    /**
     * Stores the edge that connects a vertex to the MST with `minCost`.
     * Maps `vertex` to `[predecessor_in_mst, weight]`.
     * @type {Map<*, Array<*>>}
     */
    const parentEdge = new Map();
    /**
     * Set of vertices already included in the MST.
     * @type {Set<*>}
     */
    const visited = new Set();
    /**
     * Priority Queue to efficiently retrieve the vertex with the smallest `minCost`.
     * Stores `{element: vertex, priority: cost_to_reach_vertex}`.
     */
    const pq = new PriorityQueue();

    // Pick an arbitrary starting vertex (e.g., the first one in the list)
    const startVertex = vertices[0];

    // Initialize costs: all to Infinity, startVertex to 0
    // Initialize parent edges: all to null
    for (const vertex of vertices) {
        minCost.set(vertex, Infinity);
        parentEdge.set(vertex, null); // [predecessor, weight]
    }
    minCost.set(startVertex, 0);

    // Enqueue the start vertex with priority 0
    pq.enqueue(startVertex, 0);

    let mstWeight = 0;
    const mstEdges = [];
    let processedVerticesCount = 0;

    while (!pq.isEmpty() && processedVerticesCount < vertices.length) {
        // Get the vertex with the smallest minCost from the priority queue
        const { element: currentVertex, priority: currentCost } = pq.dequeue();

        // If this vertex has already been visited or a shorter path was found, skip.
        // This is important because `updatePriority` might re-enqueue elements with new priorities,
        // leaving old, higher-priority entries in the queue that should be ignored.
        if (visited.has(currentVertex) || currentCost > minCost.get(currentVertex)) {
            continue;
        }

        visited.add(currentVertex);
        processedVerticesCount++;

        // If this is not the startVertex, add its connecting edge to the MST
        const parentInfo = parentEdge.get(currentVertex);
        if (parentInfo !== null) {
            const [predecessor, weight] = parentInfo;
            mstEdges.push([predecessor, currentVertex, weight]);
            mstWeight += weight;
        }

        // Explore neighbors of the current vertex
        for (const edge of graph.getNeighbors(currentVertex)) {
            const neighbor = edge.neighbor;
            const weight = edge.weight;

            // If the neighbor has not been visited and the current edge offers a lower cost to reach it
            if (!visited.has(neighbor) && weight < minCost.get(neighbor)) {
                minCost.set(neighbor, weight);
                parentEdge.set(neighbor, [currentVertex, weight]);
                pq.enqueue(neighbor, weight); // Update priority or add to PQ
            }
        }
    }

    // Check for disconnected graph (MST should include all vertices)
    if (processedVerticesCount < vertices.length) {
        console.warn("Prim's: Graph is not connected, MST cannot be formed for all vertices.");
        return null;
    }

    return { mstWeight, mstEdges };
}

module.exports = {
    prims,
};