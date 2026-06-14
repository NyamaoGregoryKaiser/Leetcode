```java
package com.example.graph.algorithms;

import com.example.graph.datastructures.DisjointSet;
import com.example.graph.datastructures.Graph;
import com.example.graph.datastructures.Edge;

import java.util.*;

/**
 * Provides algorithms for detecting cycles in undirected graphs.
 * Two primary approaches are demonstrated: Depth-First Search (DFS) and Disjoint Set Union (DSU).
 */
public class CycleDetection<V> {

    /**
     * Detects a cycle in an undirected graph using Depth-First Search (DFS).
     *
     * <p>Algorithm:</p>
     * <p>1. Keep track of visited nodes and the parent of the current node in the DFS tree.</p>
     * <p>2. For each unvisited neighbor of the current node, recursively call DFS.</p>
     * <p>3. If a visited neighbor is encountered and it is NOT the parent of the current node,
     *    then a cycle is detected.</p>
     * <p>4. This approach works for undirected graphs because an edge (u, v) means v is a neighbor of u
     *    and u is a neighbor of v. We need to ignore the edge that leads back to the parent in the DFS tree
     *    to avoid falsely detecting a cycle.</p>
     *
     * @param graph The undirected graph to check for cycles.
     * @return true if a cycle is detected, false otherwise.
     * @throws IllegalArgumentException if the graph is directed.
     *
     * Time Complexity: O(V + E) where V is the number of vertices and E is the number of edges.
     *                  Each vertex and edge is visited once.
     * Space Complexity: O(V) for the visited set and recursion stack.
     */
    public boolean detectCycleDFS(Graph<V> graph) {
        if (graph.isDirected()) {
            throw new IllegalArgumentException("DFS cycle detection with parent tracking is suitable for UNDIRECTED graphs.");
        }

        Set<V> visited = new HashSet<>();
        // Iterate over all vertices to handle disconnected components
        for (V vertex : graph.getVertices()) {
            if (!visited.contains(vertex)) {
                // Call DFS starting from this unvisited vertex. Pass null as initial parent.
                if (dfs(graph, vertex, null, visited)) {
                    return true; // Cycle detected in this component
                }
            }
        }
        return false; // No cycle found in any component
    }

    /**
     * Recursive helper for DFS-based cycle detection.
     *
     * @param graph   The graph.
     * @param current The current vertex being visited.
     * @param parent  The parent of the current vertex in the DFS traversal path.
     * @param visited Set of visited vertices.
     * @return true if a cycle is detected, false otherwise.
     */
    private boolean dfs(Graph<V> graph, V current, V parent, Set<V> visited) {
        visited.add(current); // Mark current vertex as visited

        // Explore neighbors
        for (V neighbor : graph.getNeighbors(current)) {
            // If neighbor is not visited, recurse
            if (!visited.contains(neighbor)) {
                if (dfs(graph, neighbor, current, visited)) {
                    return true; // Cycle found in recursive call
                }
            } else if (!neighbor.equals(parent)) {
                // If neighbor is visited AND it's not the parent of current, then a cycle is detected.
                // This condition is crucial for undirected graphs to avoid considering
                // the edge that brought us to 'current' from 'parent' as a cycle.
                return true;
            }
        }
        return false; // No cycle found from this vertex
    }

    /**
     * Detects a cycle in an undirected graph using the Disjoint Set Union (DSU) data structure.
     * This approach processes edges one by one. If an edge connects two vertices that are
     * already in the same set (meaning they are already connected), then adding this edge
     * would form a cycle.
     *
     * <p>Algorithm:</p>
     * <p>1. Initialize a DSU structure where each vertex is in its own set.</p>
     * <p>2. Iterate through all edges (u, v) in the graph.</p>
     * <p>3. For each edge, find the representatives (roots) of the sets containing u and v.</p>
     * <p>4. If the representatives are the same, it means u and v are already connected,
     *    and adding this edge creates a cycle. Return true.</p>
     * <p>5. If the representatives are different, union the sets containing u and v.</p>
     * <p>6. If all edges are processed without finding a cycle, return false.</p>
     *
     * @param graph The undirected graph to check for cycles.
     * @return true if a cycle is detected, false otherwise.
     * @throws IllegalArgumentException if the graph is directed.
     *
     * Time Complexity: O(E * α(V)), where E is the number of edges, V is the number of vertices,
     *                  and α is the inverse Ackermann function, which is practically constant.
     *                  Effectively, it's O(E) for practical purposes.
     * Space Complexity: O(V) for the DisjointSet structure.
     */
    public boolean detectCycleDSU(Graph<V> graph) {
        if (graph.isDirected()) {
            throw new IllegalArgumentException("DSU cycle detection is suitable for UNDIRECTED graphs.");
        }

        DisjointSet<V> dsu = new DisjointSet<>(graph.getVertices());

        // Iterate through all edges
        for (Edge<V> edge : graph.getAllEdges()) {
            V u = edge.getSource();
            V v = edge.getDestination();

            // Find representatives of u and v
            V rootU = dsu.find(u);
            V rootV = dsu.find(v);

            // If they are already in the same set, adding this edge creates a cycle
            if (rootU.equals(rootV)) {
                return true;
            }

            // Otherwise, union their sets
            dsu.union(u, v);
        }
        return false; // No cycle found
    }
}
```