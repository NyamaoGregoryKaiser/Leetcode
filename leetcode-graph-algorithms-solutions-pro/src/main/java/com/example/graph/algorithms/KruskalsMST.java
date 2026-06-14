```java
package com.example.graph.algorithms;

import com.example.graph.datastructures.DisjointSet;
import com.example.graph.datastructures.Edge;
import com.example.graph.datastructures.Graph;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Implements Kruskal's Algorithm to find the Minimum Spanning Tree (MST)
 * of a connected, undirected, weighted graph.
 */
public class KruskalsMST<V> {

    /**
     * Finds the Minimum Spanning Tree (MST) of a graph using Kruskal's Algorithm.
     *
     * <p>Algorithm steps:</p>
     * <p>1. Sort all edges in non-decreasing order of their weights.</p>
     * <p>2. Initialize a Disjoint Set Union (DSU) data structure where each vertex
     *    is in its own set.</p>
     * <p>3. Iterate through the sorted edges:</p>
     * <p>   a. For each edge (u, v) with weight w, check if u and v are already
     *      in the same set using DSU's `find` operation.</p>
     * <p>   b. If they are in different sets, add the edge to the MST and
     *      perform a `union` operation on u and v (merging their sets).</p>
     * <p>4. Continue until V-1 edges have been added to the MST (where V is the
     *    number of vertices) or all edges have been processed. If the graph is
     *    connected, V-1 edges will form the MST.</p>
     *
     * @param graph The undirected, weighted graph.
     * @return A list of edges that form the MST, or an empty list if the graph
     *         is empty or not connected (no MST can be formed).
     * @throws IllegalArgumentException if the graph is directed.
     *
     * Time Complexity: O(E log E) or O(E log V) depending on how sorting is counted.
     *                  Sorting edges takes O(E log E). DSU operations (E times find/union)
     *                  take O(E * α(V)), where α is the inverse Ackermann function,
     *                  which is practically constant. So, overall complexity is dominated
     *                  by sorting.
     * Space Complexity: O(V + E) for storing edges, MST, and DSU structure.
     */
    public List<Edge<V>> findMinimumSpanningTree(Graph<V> graph) {
        if (graph.isDirected()) {
            throw new IllegalArgumentException("Kruskal's Algorithm is for UNDIRECTED graphs.");
        }
        if (graph.getVertices().isEmpty()) {
            return Collections.emptyList();
        }

        List<Edge<V>> allEdges = graph.getAllEdges();
        // Step 1: Sort all edges by weight in ascending order
        Collections.sort(allEdges);

        // Step 2: Initialize DSU where each vertex is in its own set
        DisjointSet<V> dsu = new DisjointSet<>(graph.getVertices());

        List<Edge<V>> mst = new ArrayList<>();
        int mstWeight = 0;
        int numVertices = graph.getVertices().size();

        // Step 3: Iterate through sorted edges
        for (Edge<V> edge : allEdges) {
            V u = edge.getSource();
            V v = edge.getDestination();

            // Check if adding this edge forms a cycle
            if (!dsu.areInSameSet(u, v)) {
                // If u and v are in different sets, add the edge to MST and union their sets
                mst.add(edge);
                mstWeight += edge.getWeight();
                dsu.union(u, v);

                // Optimization: If MST has V-1 edges, we're done (for a connected graph)
                if (mst.size() == numVertices - 1) {
                    break;
                }
            }
        }

        // Check if the graph was connected and an MST was formed (V-1 edges)
        if (mst.size() != numVertices - 1 && numVertices > 1) {
            // This case implies the graph is disconnected or has only one vertex,
            // or we couldn't form a spanning tree with V-1 edges.
            // For disconnected graphs, we get a Minimum Spanning Forest.
            // For a strict MST, it must be connected.
            System.out.println("Warning: Graph may be disconnected. Found " + mst.size() + " edges for " + numVertices + " vertices.");
            // If numVertices is 1, MST size should be 0.
            if (numVertices == 1 && mst.isEmpty()) return mst;
            // Otherwise, it's a spanning forest, not a full spanning tree.
            // Depending on requirements, could return an empty list or the forest.
            // For a "Minimum Spanning Tree" a connected graph is usually assumed.
            // Let's assume we return the found forest, but log a warning.
        }

        System.out.println("Total MST weight: " + mstWeight);
        return mst;
    }
}
```