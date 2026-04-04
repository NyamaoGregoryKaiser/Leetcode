```javascript
/**
 * src/graphAlgorithms.js
 *
 * This file contains the main implementations of several core graph algorithms.
 * Each algorithm includes optimal solutions, detailed comments, and complexity analysis.
 */

const { Graph, PriorityQueue } = require('./utils/dataStructures');

/**
 * 1. Breadth-First Search (BFS) and Depth-First Search (DFS) for Pathfinding
 *
 * Problem: Find a path from a start node to an end node in a graph.
 *
 * Approaches:
 * a) BFS: Finds the shortest path in an unweighted graph. Explores layer by layer.
 * b) DFS: Finds *a* path. Explores as far as possible along each branch before backtracking.
 *
 * Optimal Solution for BFS/DFS traversal: Use a queue for BFS, a stack (or recursion) for DFS,
 * and a `visited` set to prevent cycles and redundant work.
 */
class PathFinding {
    /**
     * Finds a path from startNode to endNode using either BFS or DFS.
     * @param {Graph} graph - The graph to search.
     * @param {any} startNode - The starting node.
     * @param {any} endNode - The target node.
     * @param {'bfs'|'dfs'} type - The type of search to perform ('bfs' or 'dfs').
     * @returns {Array<any> | null} - An array representing the path, or null if no path exists.
     *
     * Time Complexity: O(V + E) - Visits each vertex and edge at most once.
     * Space Complexity: O(V) - For the visited set and the queue/stack (stores nodes for path reconstruction).
     */
    static findPath(graph, startNode, endNode, type = 'bfs') {
        if (!graph.hasNode(startNode) || !graph.hasNode(endNode)) {
            return null; // Start or end node not in graph
        }
        if (startNode === endNode) {
            return [startNode]; // Path to self
        }

        const visited = new Set();
        const parentMap = new Map(); // To reconstruct the path

        let queueOrStack;
        if (type === 'bfs') {
            queueOrStack = [startNode]; // Queue for BFS
        } else if (type === 'dfs') {
            queueOrStack = [startNode]; // Stack for DFS
        } else {
            throw new Error('Invalid search type. Must be "bfs" or "dfs".');
        }

        visited.add(startNode);

        let head = 0; // For BFS, act as a queue pointer
        while (queueOrStack.length > head) {
            const currentNode = type === 'bfs' ? queueOrStack[head++] : queueOrStack.pop();

            if (currentNode === endNode) {
                // Path found, reconstruct it
                const path = [];
                let curr = endNode;
                while (curr !== undefined) {
                    path.unshift(curr);
                    curr = parentMap.get(curr);
                }
                return path;
            }

            const neighbors = graph.getNeighbors(currentNode);
            if (!neighbors) continue; // No neighbors for this node

            // For DFS, we need to add neighbors to the stack in reverse order
            // if we want to process the "first" neighbor first when iterating `neighbors.keys()`.
            // However, the order of adding to stack or queue generally doesn't affect correctness,
            // only the specific path found by DFS or traversal order.
            // Iterating `neighbors.keys()` gives a consistent order.
            const neighborNodes = Array.from(neighbors.keys());
            if (type === 'dfs') {
                neighborNodes.reverse(); // Ensures a consistent exploration order for DFS if desired
            }

            for (const neighbor of neighborNodes) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    parentMap.set(neighbor, currentNode);
                    queueOrStack.push(neighbor);
                }
            }
        }

        return null; // No path found
    }

    /**
     * Finds the shortest path in an unweighted graph using BFS.
     * This is a specialized version of `findPath` with `type='bfs'`,
     * demonstrating BFS's specific use case for shortest paths in unweighted graphs.
     * @param {Graph} graph - The graph to search.
     * @param {any} startNode - The starting node.
     * @param {any} endNode - The target node.
     * @returns {Array<any> | null} - An array representing the shortest path, or null if no path exists.
     *
     * Time Complexity: O(V + E)
     * Space Complexity: O(V)
     */
    static findShortestPathBFS(graph, startNode, endNode) {
        return PathFinding.findPath(graph, startNode, endNode, 'bfs');
    }

    /**
     * Finds *a* path using DFS.
     * This is a specialized version of `findPath` with `type='dfs'`.
     * @param {Graph} graph - The graph to search.
     * @param {any} startNode - The starting node.
     * @param {any} endNode - The target node.
     * @returns {Array<any> | null} - An array representing a path, or null if no path exists.
     *
     * Time Complexity: O(V + E)
     * Space Complexity: O(V) (due to recursion stack or explicit stack)
     */
    static findAnyPathDFS(graph, startNode, endNode) {
        // For a recursive DFS, the stack is implicit.
        // We'll implement an iterative one to match the `findPath` structure.
        return PathFinding.findPath(graph, startNode, endNode, 'dfs');
    }

    // --- Recursive DFS approach (alternative for demonstration) ---
    /**
     * Finds *a* path using recursive DFS.
     * This approach directly returns the path without using parentMap explicitly.
     * @param {Graph} graph - The graph to search.
     * @param {any} startNode - The starting node.
     * @param {any} endNode - The target node.
     * @returns {Array<any> | null} - An array representing a path, or null if no path exists.
     *
     * Time Complexity: O(V + E)
     * Space Complexity: O(V) (due to recursion stack)
     */
    static findPathRecursiveDFS(graph, startNode, endNode) {
        if (!graph.hasNode(startNode) || !graph.hasNode(endNode)) {
            return null;
        }
        if (startNode === endNode) {
            return [startNode];
        }

        const visited = new Set();
        const path = [];

        function dfs(currentNode) {
            visited.add(currentNode);
            path.push(currentNode);

            if (currentNode === endNode) {
                return true; // Path found
            }

            const neighbors = graph.getNeighbors(currentNode);
            if (neighbors) {
                for (const neighbor of neighbors.keys()) {
                    if (!visited.has(neighbor)) {
                        if (dfs(neighbor)) {
                            return true; // Path found in a deeper recursion
                        }
                    }
                }
            }

            path.pop(); // Backtrack: remove current node if no path found through it
            return false;
        }

        if (dfs(startNode)) {
            return path;
        } else {
            return null;
        }
    }
}


/**
 * 2. Dijkstra's Algorithm
 *
 * Problem: Find the shortest path from a single source node to all other nodes in a
 *          weighted graph with non-negative edge weights.
 *
 * Optimal Solution: Uses a Min-Priority Queue to efficiently select the unvisited
 *                   node with the smallest known distance.
 */
class Dijkstra {
    /**
     * Computes the shortest path distances and parent pointers from a startNode to all other nodes.
     * @param {Graph} graph - The graph to analyze. Must have non-negative edge weights.
     * @param {any} startNode - The starting node.
     * @returns {{distances: Map<any, number>, previous: Map<any, any>}} - An object containing:
     *          - `distances`: A map from node to its shortest distance from `startNode`.
     *          - `previous`: A map from node to its predecessor on the shortest path.
     *
     * Time Complexity: O((V + E) log V) where V is the number of vertices and E is the number of edges.
     *                  This is because:
     *                  - Each edge relaxation (decrease-key operation or enqueue) takes O(log V) in a binary heap.
     *                  - There are at most E relaxations.
     *                  - Each vertex is extracted from the priority queue once (O(log V) per extraction).
     *                  - There are V extractions.
     *                  If a Fibonacci heap is used, it can be O(E + V log V). With a standard binary heap, it's E log V.
     * Space Complexity: O(V + E) - For storing distances, previous nodes, and the priority queue.
     */
    static dijkstra(graph, startNode) {
        if (!graph.hasNode(startNode)) {
            throw new Error(`Start node '${startNode}' not found in the graph.`);
        }

        const distances = new Map(); // Stores shortest distance from startNode to each node
        const previous = new Map();  // Stores predecessor node for path reconstruction
        const pq = new PriorityQueue(); // Min-priority queue to select next node to visit
        const visited = new Set();   // To keep track of nodes whose shortest path is finalized

        // Initialize distances: 0 for startNode, Infinity for all others
        for (const node of graph.getAllNodes()) {
            distances.set(node, Infinity);
            previous.set(node, null);
        }
        distances.set(startNode, 0);

        // Enqueue the startNode with priority 0
        pq.enqueue(startNode, 0);

        while (!pq.isEmpty()) {
            // Extract the node with the smallest distance from the priority queue
            const { value: currentNode, priority: currentDistance } = pq.dequeue();

            // If we've already finalized the shortest path to this node, skip
            if (visited.has(currentNode)) {
                continue;
            }
            visited.add(currentNode);

            // If currentDistance is Infinity, it means all remaining nodes are unreachable
            if (currentDistance === Infinity) {
                break;
            }

            const neighbors = graph.getNeighbors(currentNode);
            if (!neighbors) continue;

            // Iterate over neighbors to relax edges
            for (const [neighbor, weight] of neighbors.entries()) {
                // Ensure non-negative weights
                if (weight < 0) {
                    throw new Error("Dijkstra's algorithm does not support negative edge weights.");
                }

                // Calculate distance to neighbor through currentNode
                const distanceThroughCurrent = currentDistance + weight;

                // If a shorter path to neighbor is found
                if (distanceThroughCurrent < distances.get(neighbor)) {
                    distances.set(neighbor, distanceThroughCurrent);
                    previous.set(neighbor, currentNode);
                    pq.enqueue(neighbor, distanceThroughCurrent); // Add to PQ (or update if using advanced PQ)
                }
            }
        }

        return { distances, previous };
    }

    /**
     * Reconstructs the shortest path from startNode to endNode using the `previous` map.
     * @param {any} startNode - The starting node.
     * @param {any} endNode - The target node.
     * @param {Map<any, any>} previous - The map of predecessors generated by Dijkstra's.
     * @returns {Array<any> | null} - An array representing the shortest path, or null if no path.
     */
    static reconstructPath(startNode, endNode, previous) {
        const path = [];
        let curr = endNode;

        // Traverse backwards from endNode using previous map
        while (curr !== null && previous.has(curr)) {
            path.unshift(curr);
            if (curr === startNode) break; // Path found from start to end
            curr = previous.get(curr);
        }

        // Check if the path actually starts with startNode and ends with endNode
        if (path.length > 0 && path[0] === startNode) {
            return path;
        }
        return null; // No path found
    }
}


/**
 * 3. Prim's Algorithm for Minimum Spanning Tree (MST)
 *
 * Problem: Find a minimum spanning tree for a connected, undirected weighted graph.
 *          A MST is a subset of the edges of a connected, edge-weighted undirected graph
 *          that connects all the vertices together, without any cycles and with the minimum
 *          possible total edge weight.
 *
 * Optimal Solution: Uses a Min-Priority Queue to greedily select the lightest edge
 *                   that connects a vertex in the MST to a vertex not yet in the MST.
 */
class Prim {
    /**
     * Computes the Minimum Spanning Tree (MST) of a connected, undirected weighted graph.
     * @param {Graph} graph - The graph to analyze. Must be undirected and weighted.
     * @param {any} startNode - The starting node for Prim's algorithm. MST will be built for its connected component.
     * @returns {{mstEdges: Array<{from: any, to: any, weight: number}>, totalWeight: number}} - An object containing:
     *          - `mstEdges`: An array of objects, each representing an edge in the MST.
     *          - `totalWeight`: The sum of weights of all edges in the MST.
     *
     * Time Complexity: O((V + E) log V) where V is the number of vertices and E is the number of edges.
     *                  Similar to Dijkstra's, each edge potentially causes an enqueue operation (or decrease-key),
     *                  and each vertex is extracted once.
     * Space Complexity: O(V + E) - For storing distances, parent edges, priority queue.
     */
    static prim(graph, startNode) {
        if (!graph.hasNode(startNode)) {
            throw new Error(`Start node '${startNode}' not found in the graph.`);
        }
        if (graph.numNodes() === 0) {
            return { mstEdges: [], totalWeight: 0 };
        }

        const minCostToReach = new Map(); // Stores minimum weight to connect a node to the MST
        const parentEdge = new Map();     // Stores the edge (from parent to current node) that provides minCostToReach
        const pq = new PriorityQueue();   // Min-priority queue to select next edge
        const inMST = new Set();          // Tracks nodes already included in MST

        // Initialize minCostToReach: 0 for startNode, Infinity for others
        for (const node of graph.getAllNodes()) {
            minCostToReach.set(node, Infinity);
            parentEdge.set(node, null); // { from: node, to: parent, weight: w }
        }
        minCostToReach.set(startNode, 0);

        // Enqueue the startNode with priority 0
        pq.enqueue(startNode, 0);

        const mstEdges = [];
        let totalWeight = 0;

        while (!pq.isEmpty() && inMST.size < graph.numNodes()) {
            const { value: currentNode, priority: currentMinWeight } = pq.dequeue();

            // If this node is already in MST, skip
            if (inMST.has(currentNode)) {
                continue;
            }

            // Add currentNode to MST
            inMST.add(currentNode);
            totalWeight += currentMinWeight;

            // If it's not the start node, add the edge that brought it into the MST
            const edgeInfo = parentEdge.get(currentNode);
            if (edgeInfo) {
                mstEdges.push({ from: edgeInfo.from, to: currentNode, weight: edgeInfo.weight });
            }

            const neighbors = graph.getNeighbors(currentNode);
            if (!neighbors) continue;

            // Iterate over neighbors to find potential edges to add to MST
            for (const [neighbor, weight] of neighbors.entries()) {
                // Only consider neighbors not yet in MST
                if (!inMST.has(neighbor)) {
                    // If a lighter edge to this neighbor is found from the current MST component
                    if (weight < minCostToReach.get(neighbor)) {
                        minCostToReach.set(neighbor, weight);
                        // Store the edge that provides this minimum cost
                        parentEdge.set(neighbor, { from: currentNode, weight: weight });
                        pq.enqueue(neighbor, weight); // Add to PQ
                    }
                }
            }
        }

        // Check if the graph was connected for all initial nodes in `graph.getAllNodes()`
        // If not all nodes were included, it means the graph (or component of startNode) is disconnected
        // and a full MST for all nodes cannot be formed.
        // For example, if we started at A in A-B, C-D, only A-B would be included.
        // The result will be an MST for the connected component reachable from startNode.
        if (inMST.size !== graph.numNodes() && graph.numNodes() > 0) {
            // Optional: return null or throw error if strictly requiring MST of the entire graph
            // For disconnected graphs, Prim's finds MST for the component of startNode.
            // If all nodes *should* be connected, this indicates a disconnected graph.
            console.warn(`Prim's algorithm did not cover all nodes. Graph might be disconnected from '${startNode}'. MST found for ${inMST.size} nodes out of ${graph.numNodes()}.`);
        }

        return { mstEdges, totalWeight };
    }
}


/**
 * 4. Topological Sort (Kahn's Algorithm)
 *
 * Problem: Find a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that
 *          for every directed edge `u -> v`, vertex `u` comes before `v` in the ordering.
 *
 * Approach: Kahn's algorithm (based on in-degrees).
 *
 * Optimal Solution: Maintain a count of in-degrees for each node and use a queue
 *                   to process nodes with zero in-degree.
 */
class TopologicalSort {
    /**
     * Performs a topological sort on a Directed Acyclic Graph (DAG) using Kahn's algorithm.
     * @param {Graph} graph - The graph to sort. Must be a DAG.
     * @returns {Array<any> | null} - An array representing the topological order, or null if a cycle is detected.
     *
     * Time Complexity: O(V + E) - Each vertex and each edge is processed a constant number of times.
     * Space Complexity: O(V) - For storing in-degrees, queue, and the result array.
     */
    static topologicalSort(graph) {
        const inDegrees = new Map(); // Stores the in-degree for each node (number of incoming edges)
        const queue = [];            // Queue for nodes with in-degree 0
        const sortedOrder = [];      // Resulting topological order

        // 1. Initialize in-degrees for all nodes
        for (const node of graph.getAllNodes()) {
            inDegrees.set(node, 0);
        }

        // Calculate in-degrees for all nodes
        for (const [node, neighbors] of graph.adjList.entries()) {
            for (const neighbor of neighbors.keys()) {
                inDegrees.set(neighbor, inDegrees.get(neighbor) + 1);
            }
        }

        // 2. Add all nodes with an in-degree of 0 to the queue
        for (const [node, degree] of inDegrees.entries()) {
            if (degree === 0) {
                queue.push(node);
            }
        }

        // 3. Process nodes from the queue
        let head = 0; // Use a pointer for efficient queue operations
        while (queue.length > head) {
            const currentNode = queue[head++];
            sortedOrder.push(currentNode);

            const neighbors = graph.getNeighbors(currentNode);
            if (neighbors) {
                for (const neighbor of neighbors.keys()) {
                    // Decrement in-degree of neighbors
                    inDegrees.set(neighbor, inDegrees.get(neighbor) - 1);

                    // If a neighbor's in-degree becomes 0, add it to the queue
                    if (inDegrees.get(neighbor) === 0) {
                        queue.push(neighbor);
                    }
                }
            }
        }

        // 4. Check for cycles
        // If the number of nodes in the sorted order is not equal to the total number of nodes,
        // it implies there was a cycle in the graph.
        if (sortedOrder.length !== graph.numNodes()) {
            console.warn("Cycle detected in graph. Topological sort not possible.");
            return null; // Graph is not a DAG
        }

        return sortedOrder;
    }

    // Alternative: DFS-based topological sort
    // Not implemented here for brevity, but a valid alternative.
    // Involves recursively calling DFS, and adding nodes to a stack *after* visiting all their neighbors.
    // A node is pushed to the stack only when all its dependencies (neighbors) have been processed.
    // Cycle detection involves tracking nodes in the current recursion stack.
}

module.exports = {
    PathFinding,
    Dijkstra,
    Prim,
    TopologicalSort,
    Graph // Exporting Graph for convenience in tests/benchmarks
};
```
---