```javascript
/**
 * src/graph-problems.js
 *
 * This file contains implementations of various graph algorithms commonly
 * encountered in coding interviews. Each problem includes detailed comments,
 * complexity analysis, and potentially multiple approaches.
 */

const { Graph, MinPriorityQueue, DisjointSetUnion } = require('./utils/dataStructures');

/**
 * PROBLEM 1: Shortest Path in an Unweighted Graph (BFS)
 *
 * Problem Description:
 * Given an unweighted, undirected graph and a source node and a destination node,
 * find the shortest path (minimum number of edges) between the source and destination.
 * If no path exists, return `null`.
 *
 * Approach:
 * Breadth-First Search (BFS) is naturally suited for finding the shortest path
 * in unweighted graphs because it explores all neighbors at the current depth
 * before moving to the next depth level. This guarantees that the first time
 * the destination is reached, it will be via the shortest possible path.
 *
 * We keep track of the distance from the source and the parent of each visited node
 * to reconstruct the path.
 *
 * Time Complexity: O(V + E)
 *   - V: number of vertices (nodes)
 *   - E: number of edges
 *   Each vertex and each edge will be visited at most once.
 *
 * Space Complexity: O(V + E)
 *   - V: for `visited` set, `distances` map, `parents` map, and queue.
 *   - E: for adjacency list representation (inherent to Graph class, but contributes here too).
 *
 * @param {Graph} graph - The graph instance (unweighted, undirected assumed).
 * @param {any} startNode - The starting node.
 * @param {any} endNode - The destination node.
 * @returns {Array<any> | null} An array representing the shortest path from start to end,
 *                               or null if no path exists.
 */
function shortestPathUnweighted(graph, startNode, endNode) {
    // 1. Validate inputs: Ensure start and end nodes exist in the graph.
    if (!graph.hasNode(startNode) || !graph.hasNode(endNode)) {
        console.warn("Start or end node not found in the graph.");
        return null;
    }
    if (startNode === endNode) {
        return [startNode]; // Path to self is just the node itself
    }

    // Initialize BFS data structures
    const queue = [];
    const visited = new Set(); // Keep track of visited nodes to avoid cycles and redundant processing
    const parents = new Map(); // Stores parent of each node to reconstruct path

    // Start BFS from the source node
    queue.push(startNode);
    visited.add(startNode);
    parents.set(startNode, null); // Source has no parent

    let pathFound = false;

    while (queue.length > 0) {
        const currentNode = queue.shift();

        // If we reached the end node, mark pathFound and break
        if (currentNode === endNode) {
            pathFound = true;
            break;
        }

        // Explore neighbors
        for (const { node: neighbor } of graph.getNeighbors(currentNode)) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                parents.set(neighbor, currentNode); // Set current node as parent of neighbor
                queue.push(neighbor);
            }
        }
    }

    // 2. Reconstruct the path if found
    if (pathFound) {
        const path = [];
        let currentNode = endNode;
        while (currentNode !== null) {
            path.unshift(currentNode); // Add to the beginning of the path
            currentNode = parents.get(currentNode);
        }
        return path;
    }

    // 3. No path found
    return null;
}

/**
 * PROBLEM 2: Cycle Detection in a Directed Graph (DFS)
 *
 * Problem Description:
 * Given a directed graph, determine if it contains any cycles. A cycle exists if
 * you can start at a node, traverse a sequence of directed edges, and return to the same node.
 *
 * Approach:
 * Depth-First Search (DFS) is used here. To detect cycles in a directed graph,
 * we need to track three states for each node during DFS traversal:
 *   - UNVISITED (0): Node has not been visited yet.
 *   - VISITING (1): Node is currently in the recursion stack (being visited).
 *                   If we encounter a VISITING node, it means we found a back-edge, hence a cycle.
 *   - VISITED (2): Node has been completely processed and its DFS subtree is explored.
 *                   If we encounter a VISITED node, it means it's part of an already explored path,
 *                   and not a back-edge to the current recursion stack.
 *
 * We iterate through all nodes, and for each unvisited node, we start a DFS traversal.
 *
 * Time Complexity: O(V + E)
 *   - V: number of vertices
 *   - E: number of edges
 *   Each vertex and each edge will be processed exactly once across all DFS calls.
 *
 * Space Complexity: O(V)
 *   - V: for `nodeStates` map and recursion stack (in worst case, a path can include all V nodes).
 *
 * @param {Graph} graph - The directed graph instance.
 * @returns {boolean} True if the graph contains a cycle, false otherwise.
 */
function hasCycleDirected(graph) {
    const UNVISITED = 0;
    const VISITING = 1; // In current DFS path
    const VISITED = 2;  // Fully explored

    // Map to store the state of each node
    const nodeStates = new Map();
    for (const node of graph.getNodes()) {
        nodeStates.set(node, UNVISITED);
    }

    /**
     * Recursive DFS helper function.
     * @param {any} node - The current node being visited.
     * @returns {boolean} True if a cycle is detected starting from this node, false otherwise.
     */
    function dfs(node) {
        nodeStates.set(node, VISITING); // Mark current node as visiting

        for (const { node: neighbor } of graph.getNeighbors(node)) {
            const neighborState = nodeStates.get(neighbor);

            if (neighborState === VISITING) {
                // Found a back-edge to a node currently in the recursion stack -> cycle detected!
                return true;
            }
            if (neighborState === UNVISITED) {
                // If neighbor is unvisited, recurse
                if (dfs(neighbor)) {
                    return true; // Cycle detected in deeper recursion
                }
            }
            // If neighborState is VISITED (2), it means that path has already been processed
            // and we don't need to re-explore or worry about cycles through it for current path.
        }

        nodeStates.set(node, VISITED); // Mark current node as fully visited
        return false; // No cycle detected from this node's path
    }

    // Iterate through all nodes to handle disconnected components
    for (const node of graph.getNodes()) {
        if (nodeStates.get(node) === UNVISITED) {
            if (dfs(node)) {
                return true; // Cycle found in one of the connected components
            }
        }
    }

    return false; // No cycles found in the entire graph
}

/**
 * PROBLEM 3: Dijkstra's Algorithm (Shortest Path in Weighted Graph)
 *
 * Problem Description:
 * Given a weighted, directed graph with non-negative edge weights and a source node,
 * find the shortest path (minimum total weight) from the source node to all other
 * reachable nodes in the graph.
 *
 * Approach:
 * Dijkstra's algorithm iteratively explores the graph, always selecting the unvisited
 * node with the smallest known distance from the source. A MinPriorityQueue is crucial
 * for efficiently retrieving this "closest" unvisited node.
 *
 * 1. Initialize `distances` map with `Infinity` for all nodes and `0` for the source.
 * 2. Initialize `previousNodes` map to reconstruct paths.
 * 3. Add the source node to a `MinPriorityQueue` with priority 0.
 * 4. While the priority queue is not empty:
 *    a. Extract the node `u` with the smallest distance from the queue.
 *    b. If `u` has already been finalized (processed with its shortest distance), skip.
 *    c. For each neighbor `v` of `u`:
 *       i. Calculate distance `alt = distances[u] + weight(u, v)`.
 *       ii. If `alt < distances[v]`, update `distances[v]` to `alt`, set `previousNodes[v] = u`,
 *           and enqueue `v` with priority `alt`.
 *
 * This implementation finds shortest distances from `startNode` to *all* other nodes.
 * If you only need to find the path to a specific `endNode`, you can optimize by stopping
 * once `endNode` is dequeued.
 *
 * Time Complexity: O(E log V) or O(E + V log V) depending on priority queue implementation.
 *   - Using a binary heap (like our `MinPriorityQueue`): O(E log V) because each of E edges
 *     might lead to a decrease-key operation (enqueue with new priority), which is log V.
 *     Each of V vertices is extracted once (log V).
 *   - V: number of vertices
 *   - E: number of edges
 *
 * Space Complexity: O(V + E)
 *   - V: for `distances`, `previousNodes`, and `MinPriorityQueue` (stores up to V elements).
 *   - E: for graph adjacency list (inherent).
 *
 * Constraints:
 *   - Works only with non-negative edge weights. For negative weights, Bellman-Ford or SPFA is needed.
 *
 * @param {Graph} graph - The weighted, directed graph instance.
 * @param {any} startNode - The starting node.
 * @returns {Object} An object containing:
 *                    - `distances`: A Map where keys are nodes and values are their shortest distance from `startNode`.
 *                    - `paths`: A Map where keys are nodes and values are the previous node in the shortest path.
 */
function dijkstra(graph, startNode) {
    if (!graph.hasNode(startNode)) {
        throw new Error(`Start node '${startNode}' not found in the graph.`);
    }

    const distances = new Map(); // Stores the shortest distance from startNode to each node
    const previousNodes = new Map(); // Stores the predecessor of each node in the shortest path
    const pq = new MinPriorityQueue(); // Min-priority queue to extract node with min distance efficiently

    // Initialize distances: All nodes to Infinity, startNode to 0
    for (const node of graph.getNodes()) {
        distances.set(node, Infinity);
        previousNodes.set(node, null);
    }
    distances.set(startNode, 0);

    // Enqueue the start node with priority 0
    pq.enqueue(startNode, 0);

    while (!pq.isEmpty()) {
        const { value: currentNode, priority: currentDistance } = pq.dequeue();

        // If we've already found a shorter path to currentNode (meaning it was
        // enqueued multiple times, and an earlier, shorter path already processed it), skip.
        if (currentDistance > distances.get(currentNode)) {
            continue;
        }

        // Explore neighbors of the currentNode
        for (const { node: neighbor, weight } of graph.getNeighbors(currentNode)) {
            const distanceThroughCurrent = currentDistance + weight;

            // If a shorter path to neighbor is found through currentNode
            if (distanceThroughCurrent < distances.get(neighbor)) {
                distances.set(neighbor, distanceThroughCurrent);
                previousNodes.set(neighbor, currentNode);
                pq.enqueue(neighbor, distanceThroughCurrent); // Enqueue neighbor with its new, shorter distance
            }
        }
    }

    return { distances, previousNodes };
}

/**
 * Helper function to reconstruct path from Dijkstra's results.
 * @param {any} startNode - The source node.
 * @param {any} endNode - The target node.
 * @param {Map<any, any>} previousNodes - The map of predecessors from Dijkstra's.
 * @returns {Array<any> | null} The shortest path, or null if no path exists.
 */
function reconstructPathDijkstra(startNode, endNode, previousNodes) {
    const path = [];
    let currentNode = endNode;

    // Check if endNode is reachable at all (has a predecessor or is the startNode)
    if (!previousNodes.has(endNode) || (previousNodes.get(endNode) === null && startNode !== endNode)) {
        return null; // endNode not in graph or not reachable
    }

    while (currentNode !== null) {
        path.unshift(currentNode);
        currentNode = previousNodes.get(currentNode);
        // Safety break for cycles (shouldn't happen with correct Dijkstra, but good for robustness)
        if (path.length > previousNodes.size) { // Max possible path length is V
             console.warn("Path reconstruction detected potential loop or invalid previousNodes map.");
             return null;
        }
    }

    // If the path starts with the startNode, it's a valid path
    if (path[0] === startNode) {
        return path;
    }
    // This case might occur if endNode was unreachable but got a 'null' previous,
    // and startNode was not actually reached.
    return null;
}


/**
 * PROBLEM 4: Kruskal's Algorithm (Minimum Spanning Tree - MST)
 *
 * Problem Description:
 * Given a connected, undirected graph with weighted edges, find a Minimum Spanning Tree (MST).
 * An MST is a subgraph that connects all vertices with the minimum possible total edge weight
 * and contains no cycles.
 *
 * Approach:
 * Kruskal's algorithm is a greedy algorithm that finds an MST for a connected weighted undirected graph.
 *
 * 1. Collect all edges from the graph.
 * 2. Sort all edges in non-decreasing order of their weights.
 * 3. Initialize a Disjoint Set Union (DSU) data structure where each node is in its own set.
 * 4. Iterate through the sorted edges:
 *    a. For each edge (u, v) with weight w:
 *    b. If `u` and `v` are not already in the same set (checked using DSU's `find` operation),
 *       then adding this edge will not form a cycle.
 *       i. Add the edge to the MST.
 *       ii. Union the sets containing `u` and `v` using DSU's `union` operation.
 * 5. Continue until V-1 edges are added to the MST (where V is the number of vertices)
 *    or all edges have been processed.
 *
 * Time Complexity: O(E log E) or O(E log V)
 *   - E: number of edges, V: number of vertices.
 *   - Sorting edges takes O(E log E). Since E can be at most V^2, log E is at most 2 log V,
 *     so O(E log E) is roughly O(E log V).
 *   - DSU operations (find, union) with path compression and union by rank/size are
 *     almost constant time (amortized O(alpha(V)), where alpha is inverse Ackermann function,
 *     which is practically < 5 for any realistic V).
 *   - So, the overall complexity is dominated by sorting, O(E log E) or O(E log V).
 *
 * Space Complexity: O(V + E)
 *   - V: for DSU parent/rank maps.
 *   - E: for storing all edges initially and the resulting MST edges.
 *
 * Constraints:
 *   - Graph must be connected. If not, it finds a Minimum Spanning Forest.
 *   - Edges can have positive or negative weights, but typically used for non-negative.
 *
 * @param {Graph} graph - The undirected, weighted graph instance.
 * @returns {Array<Object>} An array of edge objects { u, v, weight } forming the MST,
 *                           or null if the graph is empty or not connected.
 */
function kruskal(graph) {
    const nodes = graph.getNodes();
    if (nodes.length === 0) {
        return []; // Empty graph has an empty MST
    }
    if (nodes.length === 1) {
        return []; // Single node graph has an empty MST (no edges)
    }

    // 1. Get all edges and sort them by weight
    const allEdges = graph.getAllEdges();
    allEdges.sort((a, b) => a.weight - b.weight);

    // 2. Initialize DSU with all graph nodes
    const dsu = new DisjointSetUnion(nodes);

    const mstEdges = [];
    let edgesCount = 0; // To track if we have (V-1) edges

    // 3. Iterate through sorted edges
    for (const edge of allEdges) {
        const { u, v, weight } = edge;

        // If adding this edge does not form a cycle (i.e., u and v are in different sets)
        if (!dsu.areConnected(u, v)) {
            dsu.union(u, v);       // Union the sets
            mstEdges.push(edge);   // Add edge to MST
            edgesCount++;

            // Optimization: If we have V-1 edges, we've found the MST
            if (edgesCount === nodes.length - 1) {
                break;
            }
        }
    }

    // Check if the graph was connected and an MST was formed
    // An MST for a connected graph with V vertices must have V-1 edges.
    if (edgesCount !== nodes.length - 1) {
        // This means the graph was not connected, so we found a Minimum Spanning Forest
        // Or if the problem strictly asks for MST of a connected graph, you might return null.
        // For interview, clarify if "Minimum Spanning Forest" is acceptable for disconnected.
        // Here, we return what was found.
        console.warn("Graph might be disconnected. Found a Minimum Spanning Forest.");
    }

    return mstEdges;
}

/**
 * PROBLEM 5: Number of Islands (BFS & DFS Approaches)
 *
 * Problem Description:
 * Given an `m x n` 2D binary grid, which represents a map of '1's (land) and '0's (water),
 * return the number of islands. An island is surrounded by water and is formed by connecting
 * adjacent lands horizontally or vertically. You may assume all four edges of the grid are
 * all surrounded by water.
 *
 * This problem is a classic application of graph traversal algorithms (BFS or DFS) on a grid,
 * where each '1' is a node and adjacency is defined by horizontal/vertical connections.
 */

// Helper to define directions for grid traversal
const DIRECTIONS = [
    [-1, 0], // Up
    [1, 0],  // Down
    [0, -1], // Left
    [0, 1],  // Right
];

/**
 * APPROACH 1: Number of Islands using Breadth-First Search (BFS)
 *
 * For each land cell ('1') encountered, increment island count, then start a BFS from it.
 * During BFS, mark all connected land cells as visited (e.g., change '1' to '0')
 * to ensure they are not counted again and to prevent cycles.
 *
 * Time Complexity: O(M * N)
 *   - M: number of rows, N: number of columns.
 *   - Each cell is visited at most a constant number of times (once by outer loop,
 *     once by BFS if it's '1', once by its neighbors).
 *
 * Space Complexity: O(M * N)
 *   - In the worst case (grid full of '1's), the BFS queue could hold up to M*N elements.
 *   - The grid itself is modified in-place, not extra space for visited set.
 *
 * @param {string[][]} grid - The 2D binary grid.
 * @returns {number} The number of islands.
 */
function numIslandsBFS(grid) {
    if (!grid || grid.length === 0 || grid[0].length === 0) {
        return 0;
    }

    const rows = grid.length;
    const cols = grid[0].length;
    let numIslands = 0;

    // Helper to check if coordinates are within grid bounds
    const isValid = (r, c) => r >= 0 && r < rows && c >= 0 && c < cols;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // If we find a '1', it's the start of a new island
            if (grid[r][c] === '1') {
                numIslands++;
                // Start BFS to mark all connected land as visited ('0')
                const queue = [[r, c]];
                grid[r][c] = '0'; // Mark as visited (sunk)

                while (queue.length > 0) {
                    const [currR, currC] = queue.shift();

                    for (const [dr, dc] of DIRECTIONS) {
                        const nextR = currR + dr;
                        const nextC = currC + dc;

                        if (isValid(nextR, nextC) && grid[nextR][nextC] === '1') {
                            grid[nextR][nextC] = '0'; // Mark as visited
                            queue.push([nextR, nextC]);
                        }
                    }
                }
            }
        }
    }

    return numIslands;
}

/**
 * APPROACH 2: Number of Islands using Depth-First Search (DFS)
 *
 * Similar to BFS, for each land cell ('1') encountered, increment island count,
 * then start a DFS from it. During DFS, recursively explore all connected land
 * cells and mark them as visited ('0').
 *
 * Time Complexity: O(M * N)
 *   - M: number of rows, N: number of columns.
 *   - Each cell is visited at most a constant number of times.
 *
 * Space Complexity: O(M * N)
 *   - In the worst case (grid full of '1's), the recursion stack depth can go up to M*N.
 *   - The grid itself is modified in-place.
 *
 * @param {string[][]} grid - The 2D binary grid.
 * @returns {number} The number of islands.
 */
function numIslandsDFS(grid) {
    if (!grid || grid.length === 0 || grid[0].length === 0) {
        return 0;
    }

    const rows = grid.length;
    const cols = grid[0].length;
    let numIslands = 0;

    // Helper to check if coordinates are within grid bounds
    const isValid = (r, c) => r >= 0 && r < rows && c >= 0 && c < cols;

    /**
     * Recursive DFS helper function to sink an island.
     * @param {number} r - Current row.
     * @param {number} c - Current column.
     */
    function dfs(r, c) {
        // Base cases: out of bounds or water
        if (!isValid(r, c) || grid[r][c] === '0') {
            return;
        }

        grid[r][c] = '0'; // Mark current land cell as visited (sunk)

        // Explore neighbors recursively
        for (const [dr, dc] of DIRECTIONS) {
            dfs(r + dr, c + dc);
        }
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // If we find a '1', it's the start of a new island
            if (grid[r][c] === '1') {
                numIslands++;
                dfs(r, c); // Start DFS to sink the entire island
            }
        }
    }

    return numIslands;
}


module.exports = {
    shortestPathUnweighted,
    hasCycleDirected,
    dijkstra,
    reconstructPathDijkstra,
    kruskal,
    numIslandsBFS,
    numIslandsDFS,
};
```