/**
 * src/algorithms/kruskal.ts
 * Implements Kruskal's Algorithm to find the Minimum Spanning Tree (MST)
 * for a connected, undirected, weighted graph.
 */

import { UnionFind } from '@data-structures/union-find';
import { Graph } from '@data-structures/graph';
import { Edge } from '@src/types';
import { getAllEdgesFromWeightedGraph } from '@utils/graph-generator';

/**
 * Represents the result of Kruskal's algorithm.
 */
export interface MSTResult<T> {
  mstWeight: number; // Total weight of the Minimum Spanning Tree
  mstEdges: Edge<T>[]; // Array of edges that form the MST
}

/**
 * Implements Kruskal's algorithm to find the Minimum Spanning Tree (MST)
 * for a connected, undirected, weighted graph.
 *
 * Kruskal's algorithm works by sorting all edges in the graph by weight in ascending order.
 * It then iterates through the sorted edges, adding an edge to the MST if it connects two
 * previously disconnected components (i.e., does not form a cycle with already added edges).
 * A Union-Find data structure is used to efficiently determine if adding an edge creates a cycle.
 *
 * @template T The type of the node identifiers.
 * @param graph The undirected, weighted Graph instance.
 * @returns An `MSTResult` object containing the total weight and the edges of the MST.
 *          Returns { mstWeight: 0, mstEdges: [] } if the graph is empty or has only one node.
 *          If the graph is not connected, it returns the MST of the connected components
 *          (a Minimum Spanning Forest).
 *
 * Time Complexity: O(E log E) or O(E log V)
 *   - Dominant factor is sorting the edges: O(E log E).
 *   - The loop runs E times. Each `union` and `find` operation using Union-Find
 *     with path compression and union by rank/size takes amortized O(α(V)) time,
 *     where α is the inverse Ackermann function, which is practically constant.
 *     So, E * O(α(V)) is effectively O(E).
 *   - Therefore, total complexity is O(E log E + E) = O(E log E).
 *   - Since E can be at most V*(V-1)/2, log E is roughly 2 log V. So O(E log V) is also a common expression.
 * Space Complexity: O(V + E)
 *   - `unionFind`: O(V) for parent and rank maps.
 *   - `allEdges`: O(E) to store all edges.
 *   - `mstEdges`: O(V) in the worst case (MST has V-1 edges).
 */
export function kruskal<T>(graph: Graph<T>): MSTResult<T> {
  // Input validation: Kruskal's expects an undirected, weighted graph.
  // It handles disconnected components by finding a Minimum Spanning Forest (MSF).
  // If the graph is empty or has only one node, no edges are needed for MST.
  if (graph.size() <= 1) {
    return { mstWeight: 0, mstEdges: [] };
  }

  // 1. Get all edges from the graph.
  // This helper function ensures that for undirected graphs, each edge (u,v) is considered only once.
  const allEdges = getAllEdgesFromWeightedGraph(graph);

  // 2. Sort all edges by weight in ascending order.
  allEdges.sort((a, b) => a.weight - b.weight);

  // 3. Initialize a Union-Find data structure.
  // Each node initially belongs to its own set.
  const nodes = graph.getNodes();
  const unionFind = new UnionFind<T>(nodes);

  const mstEdges: Edge<T>[] = [];
  let mstWeight = 0;
  let edgesCount = 0; // Keep track of edges added to MST (should be V-1 for a connected graph)

  // A connected graph with V vertices has V-1 edges in its MST.
  const maxEdgesInMST = nodes.length - 1;

  // 4. Iterate through the sorted edges.
  for (const edge of allEdges) {
    const { u, v, weight } = edge;

    // Check if adding this edge creates a cycle.
    // A cycle is formed if u and v are already in the same set (connected).
    if (!unionFind.areConnected(u, v)) {
      // If they are not connected, add the edge to the MST.
      unionFind.union(u, v); // Merge the sets containing u and v
      mstEdges.push(edge);
      mstWeight += weight;
      edgesCount++;

      // Optimization: If we have added V-1 edges, we have found the MST for a connected graph.
      // We can stop early. This prevents unnecessary iterations if the graph is fully connected.
      if (edgesCount === maxEdgesInMST) {
        break;
      }
    }
  }

  return { mstWeight, mstEdges };
}