```typescript
import { Edge } from '../types';
import { UnionFind } from '../data-structures/union-find';

/**
 * Kruskal's Algorithm implementation for finding the Minimum Spanning Tree (MST).
 *
 * Problem: Connecting Cities With Minimum Cost
 * Given `n` cities and a list of `connections = [[city1, city2, cost]]`.
 * Return the minimum cost to connect all cities. If impossible, return -1.
 */

/**
 * Finds the minimum cost to connect all cities using Kruskal's Algorithm.
 *
 * Kruskal's algorithm is a greedy algorithm that finds an MST for a connected,
 * undirected graph. It works by repeatedly adding the next cheapest edge that
 * does not form a cycle with the previously added edges.
 * A Union-Find data structure is used to efficiently detect cycles and manage
 * connected components.
 *
 * Time Complexity: O(E log E) or O(E log V)
 *                  - Sorting edges: O(E log E), where E is the number of edges.
 *                  - Union-Find operations: E calls to `find` and up to V-1 calls to `union`.
 *                                           Each `find`/`union` operation takes amortized O(α(V)) time,
 *                                           where α is the inverse Ackermann function, practically constant.
 *                  - Total: O(E log E) (sorting dominates)
 * Space Complexity: O(V + E)
 *                  - O(E) for storing edges.
 *                  - O(V) for the Union-Find data structure (parent and rank arrays).
 *
 * @param n The total number of cities (1-indexed).
 * @param connections An array of edges `[city1, city2, cost]`.
 * @returns The minimum total cost to connect all cities, or -1 if it's impossible.
 */
export function minimumCost(n: number, connections: Edge[]): number {
    // 1. Sort all connections by cost in ascending order.
    // This is the greedy step: always try the cheapest available edge.
    connections.sort((a, b) => a[2] - b[2]);

    // 2. Initialize Union-Find data structure.
    // We pass `n + 1` to UnionFind because cities are 1-indexed (from 1 to n).
    // UnionFind will internally map these to 0-indexed elements effectively.
    const uf = new UnionFind(n + 1); // For 1-indexed cities 1 to N

    let totalCost = 0;
    let edgesUsed = 0; // Number of edges successfully added to the MST

    // 3. Iterate through sorted connections
    for (const [u, v, cost] of connections) {
        // If cities `u` and `v` are not already in the same connected component,
        // adding this edge will not form a cycle.
        if (!uf.isConnected(u, v)) {
            uf.union(u, v);       // Unite their components
            totalCost += cost;    // Add cost to total
            edgesUsed++;          // Increment count of edges in MST
        }
    }

    // 4. Check if all cities are connected.
    // An MST for N vertices has exactly N-1 edges.
    // If we couldn't add N-1 edges, it means the graph is disconnected.
    // Alternatively, `uf.countSets()` should be 2 (one for dummy index 0, one for all connected nodes).
    // If using 0-indexed nodes (0 to n-1), `uf.countSets()` should be 1.
    // With 1-indexed cities from 1 to n, and UnionFind initialized for n+1 elements (0 to n),
    // the dummy element 0 will remain in its own set. So, we expect `n` cities to be connected
    // into one set, plus the dummy `0` in its own set. Thus, `numSets` should be 2.
    // Or, more simply, check if `edgesUsed` is `n - 1`.
    if (edgesUsed === n - 1) {
        return totalCost;
    } else {
        return -1; // Impossible to connect all cities (graph is disconnected)
    }
}
```