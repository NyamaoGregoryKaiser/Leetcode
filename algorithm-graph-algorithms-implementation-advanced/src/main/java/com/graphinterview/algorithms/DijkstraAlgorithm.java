```java
package com.graphinterview.algorithms;

import com.graphinterview.datastructures.Graph;

import java.util.Arrays;
import java.util.Comparator;
import java.util.PriorityQueue;

/**
 * Problem: Dijkstra's Algorithm for Shortest Paths
 *
 * Implements Dijkstra's algorithm to find the shortest paths from a single source vertex
 * to all other vertices in a weighted, directed graph with non-negative edge weights.
 *
 * Example:
 * Graph (V=4):
 * Edges: (0,1,10), (0,2,5), (1,2,2), (1,3,1), (2,1,3), (2,3,9), (3,0,4)
 * Source: 0
 *
 * Expected Output (shortest distances from source 0):
 * Vertex 0: 0
 * Vertex 1: 8 (Path: 0 -> 2 -> 1)
 * Vertex 2: 5 (Path: 0 -> 2)
 * Vertex 3: 9 (Path: 0 -> 2 -> 1 -> 3)
 */
public class DijkstraAlgorithm {

    // Represents a vertex and its current distance from the source.
    // Used in the PriorityQueue to always extract the vertex with the minimum distance.
    private static class Node {
        int vertex;
        int distance;

        public Node(int vertex, int distance) {
            this.vertex = vertex;
            this.distance = distance;
        }
    }

    /**
     * Solves the single-source shortest path problem using Dijkstra's algorithm.
     *
     * Strategy:
     * 1. Initialize an array `distances` to store the shortest distance from the source
     *    to each vertex. Set `distances[source]` to 0 and all others to infinity.
     * 2. Use a `PriorityQueue` to store `Node` objects (vertex, distance). The priority
     *    queue is ordered by distance, always extracting the node with the minimum distance.
     * 3. Add the source node to the priority queue.
     * 4. While the priority queue is not empty:
     *    a. Extract the node `u` with the smallest `distance` from the queue.
     *    b. If the extracted distance `d` is greater than `distances[u]`, it means we
     *       have already found a shorter path to `u` and processed it, so skip.
     *    c. For each neighbor `v` of `u`:
     *       i. Calculate a new distance: `newDist = distances[u] + weight(u,v)`.
     *       ii. If `newDist` is less than `distances[v]`, update `distances[v] = newDist`
     *           and add `(v, newDist)` to the priority queue.
     *
     * Time Complexity: O(E log V) or O(E + V log V) with a Fibonacci heap.
     *   - E is the number of edges, V is the number of vertices.
     *   - Using `java.util.PriorityQueue` (binary heap), each `add` and `poll` operation
     *     takes O(log K) where K is the number of elements in the queue. In the worst case,
     *     K can be up to E. Each edge relaxation involves a `decrease-key` operation (which
     *     is an add + check if current is better), leading to O(E log V).
     * Space Complexity: O(V + E)
     *   - `distances` array: O(V)
     *   - `priorityQueue`: O(E) in worst case (stores nodes as they are updated)
     *   - Adjacency list in `Graph` object: O(V + E)
     *
     * @param graph  The input graph. Must have non-negative edge weights.
     * @param source The starting vertex for shortest path calculation.
     * @return An array where `result[i]` is the shortest distance from `source` to `i`.
     *         Returns `null` if graph or source is invalid.
     */
    public int[] findShortestPaths(Graph graph, int source) {
        if (graph == null || source < 0 || source >= graph.getNumVertices()) {
            System.err.println("Invalid graph or source vertex.");
            return null;
        }

        int numVertices = graph.getNumVertices();
        int[] distances = new int[numVertices];
        // Initialize all distances to infinity
        Arrays.fill(distances, Integer.MAX_VALUE);
        // Distance to source itself is 0
        distances[source] = 0;

        // Priority queue stores nodes based on their current shortest distance
        // Node: {vertex, distance from source}
        PriorityQueue<Node> pq = new PriorityQueue<>(Comparator.comparingInt(node -> node.distance));
        pq.offer(new Node(source, 0));

        while (!pq.isEmpty()) {
            Node currentNode = pq.poll();
            int u = currentNode.vertex;
            int currentDist = currentNode.distance;

            // If we've already found a shorter path to 'u', skip this entry.
            // This is crucial because PQ might contain stale entries (nodes with larger distances)
            // that were added before a shorter path was discovered and updated.
            if (currentDist > distances[u]) {
                continue;
            }

            // Iterate over all neighbors 'v' of 'u'
            for (Graph.Edge edge : graph.getAdj(u)) {
                int v = edge.destination;
                int weight = edge.weight;

                // Relaxation step: If a shorter path to 'v' is found through 'u'
                if (distances[u] != Integer.MAX_VALUE && distances[u] + weight < distances[v]) {
                    distances[v] = distances[u] + weight;
                    pq.offer(new Node(v, distances[v]));
                }
            }
        }
        return distances;
    }

    public static void main(String[] args) {
        DijkstraAlgorithm dijkstra = new DijkstraAlgorithm();

        // Example 1: Graph from problem description
        Graph graph1 = new Graph(4);
        graph1.addEdge(0, 1, 10, true); // 0 -> 1 (10)
        graph1.addEdge(0, 2, 5, true);  // 0 -> 2 (5)
        graph1.addEdge(1, 2, 2, true);  // 1 -> 2 (2)
        graph1.addEdge(1, 3, 1, true);  // 1 -> 3 (1)
        graph1.addEdge(2, 1, 3, true);  // 2 -> 1 (3)
        graph1.addEdge(2, 3, 9, true);  // 2 -> 3 (9)
        graph1.addEdge(3, 0, 4, true);  // 3 -> 0 (4)

        System.out.println("Graph 1 (4 vertices):");
        graph1.printGraph();
        int[] distances1 = dijkstra.findShortestPaths(graph1, 0);
        System.out.println("\nShortest distances from source 0:");
        if (distances1 != null) {
            for (int i = 0; i < distances1.length; i++) {
                System.out.println("Vertex " + i + ": " + (distances1[i] == Integer.MAX_VALUE ? "Infinity" : distances1[i]));
            }
        }
        // Expected: 0:0, 1:8, 2:5, 3:9

        System.out.println("\n-----------------------------------\n");

        // Example 2: Disconnected Graph
        Graph graph2 = new Graph(5);
        graph2.addEdge(0, 1, 1, true);
        graph2.addEdge(0, 2, 6, true);
        graph2.addEdge(1, 3, 2, true);
        graph2.addEdge(3, 2, 3, true);
        // Vertex 4 is unreachable from 0

        System.out.println("Graph 2 (5 vertices, disconnected):");
        graph2.printGraph();
        int[] distances2 = dijkstra.findShortestPaths(graph2, 0);
        System.out.println("\nShortest distances from source 0:");
        if (distances2 != null) {
            for (int i = 0; i < distances2.length; i++) {
                System.out.println("Vertex " + i + ": " + (distances2[i] == Integer.MAX_VALUE ? "Infinity" : distances2[i]));
            }
        }
        // Expected: 0:0, 1:1, 2:6 (path 0->1->3->2 or 0->2 direct), 3:3, 4:Infinity

        System.out.println("\n-----------------------------------\n");

        // Example 3: Single vertex graph
        Graph graph3 = new Graph(1);
        System.out.println("Graph 3 (1 vertex):");
        graph3.printGraph();
        int[] distances3 = dijkstra.findShortestPaths(graph3, 0);
        System.out.println("\nShortest distances from source 0:");
        if (distances3 != null) {
            for (int i = 0; i < distances3.length; i++) {
                System.out.println("Vertex " + i + ": " + (distances3[i] == Integer.MAX_VALUE ? "Infinity" : distances3[i]));
            }
        }
        // Expected: 0:0

        System.out.println("\n-----------------------------------\n");

        // Example 4: Graph with all equal weights (effectively unweighted)
        Graph graph4 = new Graph(3);
        graph4.addEdge(0, 1, 1, true);
        graph4.addEdge(1, 2, 1, true);
        graph4.addEdge(0, 2, 5, true); // Longer path
        System.out.println("Graph 4 (Equal weights, but one longer path):");
        graph4.printGraph();
        int[] distances4 = dijkstra.findShortestPaths(graph4, 0);
        System.out.println("\nShortest distances from source 0:");
        if (distances4 != null) {
            for (int i = 0; i < distances4.length; i++) {
                System.out.println("Vertex " + i + ": " + (distances4[i] == Integer.MAX_VALUE ? "Infinity" : distances4[i]));
            }
        }
        // Expected: 0:0, 1:1, 2:2 (via 0->1->2)

        System.out.println("\n-----------------------------------\n");

        // Example 5: Graph with negative weights (Dijkstra's will fail/give incorrect results)
        // This is a crucial point for interviews - Dijkstra does NOT work with negative weights.
        Graph graph5 = new Graph(3);
        graph5.addEdge(0, 1, 1, true);
        graph5.addEdge(1, 2, -3, true); // Negative weight
        graph5.addEdge(0, 2, 5, true);
        System.out.println("Graph 5 (Negative weight edge, Dijkstra's will yield incorrect result):");
        graph5.printGraph();
        int[] distances5 = dijkstra.findShortestPaths(graph5, 0);
        System.out.println("\nShortest distances from source 0 (Dijkstra's on negative weights):");
        if (distances5 != null) {
            for (int i = 0; i < distances5.length; i++) {
                System.out.println("Vertex " + i + ": " + (distances5[i] == Integer.MAX_VALUE ? "Infinity" : distances5[i]));
            }
        }
        // Expected correct path for 0->2: 0->1->2 (1 + -3 = -2)
        // Dijkstra's will output: 0->1(dist 1), then 1->2 (dist 1-3 = -2).
        // It might actually output correctly for this specific simple case, because the -3 edge won't cause issues for vertices that
        // are processed *before* a better path to them is found.
        // It's when a negative edge creates a *shorter path to an already settled node* or a *negative cycle* that it truly fails.
        // E.g., if there was an edge (2,0,-1) then 0 would become 0->1->2->0 (1-3-1 = -3), which violates the settled property.
        // In this specific case (0-1-2 with negative edge 1->2), Dijkstra works.
        // Shortest from 0 to 2 is -2. Dijkstra computes correctly here.
        // Corrected explanation: Dijkstra fails when negative edges cause a node to be relaxed *after* it has been extracted from the priority queue and marked as 'finalized', which would then allow a shorter path to be found for it or its neighbors.
        // For example, if there was an edge 0 -> 2 with weight 2, and 0 -> 1 with weight 1, and 1 -> 2 with weight -5.
        // Dijkstra would pick 0 -> 1 (dist 1). Add (1,1) to PQ.
        // Then pick 0 -> 2 (dist 2). Add (2,2) to PQ.
        // Now suppose PQ is empty and it already "finalized" 2. But if it then picked 1, and relaxed 1->2 with -5, then 2's distance would become 1 + -5 = -4, which is better than 2. Dijkstra would have already finalized 2 with distance 2.
        // This is why it is fundamentally flawed with negative weights.
        // In this specific example, it gets lucky because the negative edge is towards the end.
    }
}
```