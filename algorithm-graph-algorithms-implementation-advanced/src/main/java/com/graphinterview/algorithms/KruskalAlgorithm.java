```java
package com.graphinterview.algorithms;

import com.graphinterview.datastructures.DisjointSet;
import com.graphinterview.datastructures.Graph;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Problem: Kruskal's Algorithm for Minimum Spanning Tree (MST)
 *
 * Implements Kruskal's algorithm to find the Minimum Spanning Tree (MST)
 * of a connected, undirected, weighted graph.
 *
 * An MST is a subset of the edges of a connected, edge-weighted undirected graph
 * that connects all the vertices together, without any cycles and with the minimum
 * possible total edge weight.
 *
 * Example:
 * Graph (V=4): Edges: (0,1,10), (0,2,6), (0,3,5), (1,3,15), (2,3,4)
 * Source is not relevant for MST. All edges should be considered undirected for MST.
 *
 * Sorted Edges:
 * (2,3,4)
 * (0,3,5)
 * (0,2,6)
 * (0,1,10)
 * (1,3,15)
 *
 * Expected MST Edges and Total Weight:
 * Edges: (2,3,4), (0,3,5), (0,1,10)
 * Total Weight: 4 + 5 + 10 = 19
 */
public class KruskalAlgorithm {

    /**
     * Finds the Minimum Spanning Tree (MST) of a given graph using Kruskal's algorithm.
     *
     * Strategy:
     * 1. Get all edges from the graph and sort them by weight in ascending order.
     * 2. Initialize a Disjoint Set Union (DSU) data structure where each vertex is in its own set.
     * 3. Iterate through the sorted edges:
     *    a. For each edge `(u, v)` with weight `w`:
     *       i. Check if `u` and `v` are already in the same set using `dsu.find()`.
     *       ii. If they are in different sets, it means adding this edge will not form a cycle.
     *           Add this edge to the MST and merge the sets of `u` and `v` using `dsu.union()`.
     * 4. Continue until V-1 edges have been added to the MST (where V is the number of vertices),
     *    or all edges have been processed.
     *
     * Time Complexity: O(E log E) or O(E log V)
     *   - E log E: Dominated by sorting all edges. If E is large, log E is larger.
     *   - E log V: Since E can be at most V^2, log E is at most 2 log V, so E log E is effectively E log V.
     *   - DSU operations (find and union) with path compression and union by rank/size are amortized
     *     O(alpha(V)), where alpha is the inverse Ackermann function, which is practically constant.
     * Space Complexity: O(V + E)
     *   - `allEdges` list: O(E)
     *   - `mst` list: O(V) (stores V-1 edges)
     *   - `DisjointSet` arrays: O(V)
     *
     * @param graph The input graph. It must be connected, undirected, and weighted with non-negative weights.
     * @return A list of edges forming the MST. Returns an empty list if graph is null or has no vertices.
     *         Returns null if the graph is not connected and an MST cannot span all vertices.
     */
    public List<Graph.Edge> findMinimumSpanningTree(Graph graph) {
        if (graph == null || graph.getNumVertices() == 0) {
            return Collections.emptyList();
        }

        int numVertices = graph.getNumVertices();
        List<Graph.Edge> allEdges = new ArrayList<>(graph.getAllEdges());
        // For Kruskal's, we need undirected edges. The Graph class `addEdge(..., false)`
        // adds `(u,v)` and `(v,u)` to `adj` but only `(u,v)` to `allEdges`.
        // This is sufficient for Kruskal's because we process each unique edge once.

        // Step 1: Sort all edges by weight
        Collections.sort(allEdges);

        // Step 2: Initialize Disjoint Set Union (DSU)
        DisjointSet dsu = new DisjointSet(numVertices);

        List<Graph.Edge> mst = new ArrayList<>();
        long totalWeight = 0; // Use long for total weight to prevent overflow

        // Step 3: Iterate through sorted edges
        for (Graph.Edge edge : allEdges) {
            // Step 3.a: Check if adding this edge forms a cycle
            if (!dsu.inSameSet(edge.source, edge.destination)) {
                // Step 3.aii: If not, add to MST and union the sets
                mst.add(edge);
                totalWeight += edge.weight;
                dsu.union(edge.source, edge.destination);

                // Optimization: MST will have V-1 edges for a connected graph
                if (mst.size() == numVertices - 1) {
                    break;
                }
            }
        }

        // Check if the graph was connected (i.e., we found V-1 edges)
        if (mst.size() != numVertices - 1 && numVertices > 1) {
            System.out.println("Warning: Graph is not connected. A spanning forest was found, not a spanning tree.");
            // Depending on problem requirements, could return null or the forest.
            // For a strict "spanning tree", return null here indicating failure.
            return null;
        }

        System.out.println("Total MST weight: " + totalWeight);
        return mst;
    }

    public static void main(String[] args) {
        KruskalAlgorithm kruskal = new KruskalAlgorithm();

        // Example 1: Graph from problem description
        Graph graph1 = new Graph(4);
        // Edges should be undirected for MST, so ensure addEdge uses 'false' for directed param
        graph1.addEdge(0, 1, 10, false);
        graph1.addEdge(0, 2, 6, false);
        graph1.addEdge(0, 3, 5, false);
        graph1.addEdge(1, 3, 15, false);
        graph1.addEdge(2, 3, 4, false);

        System.out.println("Graph 1 (4 vertices, connected):");
        graph1.printGraph();
        List<Graph.Edge> mst1 = kruskal.findMinimumSpanningTree(graph1);
        System.out.println("MST Edges:");
        if (mst1 != null) {
            for (Graph.Edge edge : mst1) {
                System.out.println(edge);
            }
        }
        // Expected edges: (2,3,4), (0,3,5), (0,1,10). Total weight: 19.

        System.out.println("\n-----------------------------------\n");

        // Example 2: Disconnected graph (should return null or fewer than V-1 edges)
        Graph graph2 = new Graph(5);
        graph2.addEdge(0, 1, 1, false);
        graph2.addEdge(0, 2, 2, false);
        graph2.addEdge(3, 4, 3, false); // This component is separate

        System.out.println("Graph 2 (5 vertices, disconnected):");
        graph2.printGraph();
        List<Graph.Edge> mst2 = kruskal.findMinimumSpanningTree(graph2);
        System.out.println("MST Edges:");
        if (mst2 != null) {
            for (Graph.Edge edge : mst2) {
                System.out.println(edge);
            }
        } else {
            System.out.println("No MST found (graph is disconnected or invalid).");
        }
        // Expected: warning about disconnected graph, return null (or forest with 3 edges).

        System.out.println("\n-----------------------------------\n");

        // Example 3: Graph with a single vertex
        Graph graph3 = new Graph(1);
        System.out.println("Graph 3 (1 vertex):");
        graph3.printGraph();
        List<Graph.Edge> mst3 = kruskal.findMinimumSpanningTree(graph3);
        System.out.println("MST Edges:");
        if (mst3 != null) {
            for (Graph.Edge edge : mst3) {
                System.out.println(edge);
            }
        }
        // Expected: Empty list, Total MST weight: 0.

        System.out.println("\n-----------------------------------\n");

        // Example 4: Graph with all equal weights
        Graph graph4 = new Graph(3);
        graph4.addEdge(0, 1, 5, false);
        graph4.addEdge(1, 2, 5, false);
        graph4.addEdge(0, 2, 5, false);
        System.out.println("Graph 4 (3 vertices, all equal weights):");
        graph4.printGraph();
        List<Graph.Edge> mst4 = kruskal.findMinimumSpanningTree(graph4);
        System.out.println("MST Edges:");
        if (mst4 != null) {
            for (Graph.Edge edge : mst4) {
                System.out.println(edge);
            }
        }
        // Expected: Two edges, total weight 10. E.g., (0,1,5), (1,2,5).
    }
}
```