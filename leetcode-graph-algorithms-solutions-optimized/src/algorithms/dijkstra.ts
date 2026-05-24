```typescript
import { AdjacencyList } from '../types';
import { MinHeap } from '../data-structures/min-heap';

/**
 * Dijkstra's Algorithm implementation for finding the shortest paths from a single source.
 *
 * Problem: Network Delay Time
 * Given a list of travel times `times = [[u, v, w]]`, `n` network nodes, and a source node `k`.
 * Return the minimum time it takes for all `n` nodes to receive the signal.
 * If not all nodes can receive the signal, return -1.
 */

/**
 * Finds the shortest time for a signal to reach all nodes from a source node `k`
 * using Dijkstra's algorithm with a Min-Heap.
 *
 * Dijkstra's algorithm finds the shortest paths from a single source node to all other nodes
 * in a graph with non-negative edge weights.
 *
 * Time Complexity: O(E log V) where E is the number of edges and V is the number of vertices.
 *                  - Building adjacency list: O(E)
 *                  - Min-Heap operations: Each of V vertices is extracted once (O(log V)).
 *                                         Each of E edges leads to an `insert` or `update` (effectively `insert`)
 *                                         operation on the heap (O(log V)).
 *                  - Total: O(E + V log V + E log V) = O(E log V) (since E >= V-1 for connected graphs)
 * Space Complexity: O(V + E) for the adjacency list, distances map, and the Min-Heap.
 *
 * @param times An array of edges `[u, v, w]` representing connections and their weights.
 * @param n The total number of nodes (1-indexed).
 * @param k The source node from which the signal originates (1-indexed).
 * @returns The minimum time for all nodes to receive the signal, or -1 if not all nodes can be reached.
 */
export function networkDelayTime(times: [number, number, number][], n: number, k: number): number {
    // 1. Build Adjacency List
    // The graph is 1-indexed, so we'll use 1-indexed keys in the map.
    const adjList: AdjacencyList = new Map();
    for (let i = 1; i <= n; i++) {
        adjList.set(i, []);
    }
    for (const [u, v, w] of times) {
        adjList.get(u)?.push([v, w]);
    }

    // 2. Initialize Distances and Priority Queue
    // `distances` map stores the shortest distance from `k` to each node.
    // Initialize all distances to Infinity.
    const distances: Map<number, number> = new Map();
    for (let i = 1; i <= n; i++) {
        distances.set(i, Infinity);
    }
    distances.set(k, 0); // Distance from source to itself is 0.

    // Min-Heap stores `[node, current_distance_to_node]`, prioritized by distance.
    const minHeap = new MinHeap<number>();
    minHeap.insert(k, 0); // Start with the source node k at distance 0.

    let visitedCount = 0; // To track how many nodes we've finalized a shortest path for.
    let maxDelay = 0;     // To track the maximum shortest path found to any node.

    // 3. Dijkstra's Main Loop
    while (!minHeap.isEmpty()) {
        const { value: u, priority: currentDist } = minHeap.extractMin()!;

        // If we've already found a shorter path to `u` and processed it, skip.
        // This check is important because `minHeap` can contain stale entries (nodes
        // for which a shorter path has already been found and processed).
        if (currentDist > distances.get(u)!) {
            continue;
        }

        // We've found the shortest path to node `u`. Increment visited count and update max delay.
        visitedCount++;
        maxDelay = Math.max(maxDelay, currentDist);

        // Explore neighbors of `u`
        for (const [v, weight] of adjList.get(u) || []) {
            const newDist = currentDist + weight;

            // If a shorter path to `v` is found through `u`
            if (newDist < distances.get(v)!) {
                distances.set(v, newDist); // Update distance
                minHeap.insert(v, newDist); // Add/update `v` in the priority queue
            }
        }
    }

    // 4. Check if all nodes were reachable
    // If `visitedCount` is not equal to `n`, it means some nodes are unreachable from `k`.
    if (visitedCount !== n) {
        return -1;
    }

    // The result is the maximum of all shortest path times to any reachable node.
    return maxDelay;
}

/**
 * --- Less Optimized Dijkstra's (Array Scan Version) ---
 * This version uses a linear scan to find the minimum distance node instead of a Min-Heap.
 * It's conceptually simpler but less efficient for dense graphs.
 *
 * Time Complexity: O(V^2 + E) where V is the number of vertices and E is the number of edges.
 *                  - Initialization: O(V)
 *                  - Outer loop runs V times.
 *                  - Inner loop (finding min distance node): O(V) each time. Total O(V^2).
 *                  - Inner loop (relaxing edges): O(E) over all iterations.
 *                  - Overall: O(V^2 + E)
 * Space Complexity: O(V) for distances and visited arrays.
 *
 * @param times An array of edges `[u, v, w]` representing connections and their weights.
 * @param n The total number of nodes (1-indexed).
 * @param k The source node from which the signal originates (1-indexed).
 * @returns The minimum time for all nodes to receive the signal, or -1 if not all nodes can be reached.
 */
export function networkDelayTimeArrayScan(times: [number, number, number][], n: number, k: number): number {
    // 1. Build Adjacency List
    const adjList: AdjacencyList = new Map();
    for (let i = 1; i <= n; i++) {
        adjList.set(i, []);
    }
    for (const [u, v, w] of times) {
        adjList.get(u)?.push([v, w]);
    }

    // 2. Initialize Distances and Visited set
    const distances: number[] = Array(n + 1).fill(Infinity); // 1-indexed
    distances[k] = 0;

    const visited: boolean[] = Array(n + 1).fill(false); // To track processed nodes

    // 3. Dijkstra's Main Loop (V iterations)
    for (let i = 1; i <= n; i++) {
        let minDistance = Infinity;
        let minNode = -1;

        // Find the node with the minimum distance among unvisited nodes
        for (let node = 1; node <= n; node++) {
            if (!visited[node] && distances[node] < minDistance) {
                minDistance = distances[node];
                minNode = node;
            }
        }

        // If no unvisited node is reachable (minNode is -1 or minDistance is Infinity), break
        if (minNode === -1 || minDistance === Infinity) {
            break;
        }

        visited[minNode] = true; // Mark as visited

        // Relax edges for the chosen minNode
        for (const [neighbor, weight] of adjList.get(minNode) || []) {
            if (!visited[neighbor]) { // Only relax edges to unvisited neighbors
                const newDist = distances[minNode] + weight;
                if (newDist < distances[neighbor]) {
                    distances[neighbor] = newDist;
                }
            }
        }
    }

    // 4. Check if all nodes were reachable and find max delay
    let maxDelay = 0;
    for (let i = 1; i <= n; i++) {
        if (distances[i] === Infinity) {
            return -1; // Not all nodes received the signal
        }
        maxDelay = Math.max(maxDelay, distances[i]);
    }

    return maxDelay;
}
```