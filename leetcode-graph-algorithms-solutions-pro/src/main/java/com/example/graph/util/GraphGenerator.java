```java
package com.example.graph.util;

import com.example.graph.datastructures.Graph;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/**
 * Utility class for generating various types of graphs for testing and benchmarking.
 */
public class GraphGenerator {

    /**
     * Generates a simple path graph.
     *
     * @param numVertices Number of vertices.
     * @param isDirected  True for directed path, false for undirected.
     * @return A graph representing a path.
     */
    public static Graph<Integer> generatePathGraph(int numVertices, boolean isDirected) {
        Graph<Integer> graph = new Graph<>(isDirected);
        for (int i = 0; i < numVertices; i++) {
            graph.addVertex(i);
        }
        for (int i = 0; i < numVertices - 1; i++) {
            graph.addEdge(i, i + 1);
        }
        return graph;
    }

    /**
     * Generates a simple cycle graph.
     *
     * @param numVertices Number of vertices. Must be >= 3.
     * @param isDirected  True for directed cycle, false for undirected.
     * @return A graph representing a cycle.
     * @throws IllegalArgumentException if numVertices < 3.
     */
    public static Graph<Integer> generateCycleGraph(int numVertices, boolean isDirected) {
        if (numVertices < 3) {
            throw new IllegalArgumentException("Cycle graph requires at least 3 vertices.");
        }
        Graph<Integer> graph = new Graph<>(isDirected);
        for (int i = 0; i < numVertices; i++) {
            graph.addVertex(i);
        }
        for (int i = 0; i < numVertices - 1; i++) {
            graph.addEdge(i, i + 1);
        }
        graph.addEdge(numVertices - 1, 0); // Close the cycle
        return graph;
    }

    /**
     * Generates a complete graph (Kn).
     *
     * @param numVertices Number of vertices.
     * @param isDirected  True for directed complete graph, false for undirected.
     * @return A complete graph.
     */
    public static Graph<Integer> generateCompleteGraph(int numVertices, boolean isDirected) {
        Graph<Integer> graph = new Graph<>(isDirected);
        for (int i = 0; i < numVertices; i++) {
            graph.addVertex(i);
        }
        for (int i = 0; i < numVertices; i++) {
            for (int j = 0; j < numVertices; j++) {
                if (i != j) {
                    graph.addEdge(i, j);
                }
            }
        }
        return graph;
    }

    /**
     * Generates a random graph with a specified number of vertices and approximate edge density.
     *
     * @param numVertices Number of vertices.
     * @param edgeDensity A value between 0.0 and 1.0, representing the probability of an edge existing.
     * @param isDirected  True for directed graph, false for undirected.
     * @param maxWeight   Maximum weight for edges (inclusive). If 0, all weights are 1.
     * @return A random graph.
     */
    public static Graph<Integer> generateRandomGraph(int numVertices, double edgeDensity, boolean isDirected, int maxWeight) {
        if (edgeDensity < 0.0 || edgeDensity > 1.0) {
            throw new IllegalArgumentException("Edge density must be between 0.0 and 1.0.");
        }
        Graph<Integer> graph = new Graph<>(isDirected);
        Random random = new Random();

        // Add all vertices
        for (int i = 0; i < numVertices; i++) {
            graph.addVertex(i);
        }

        // Add edges based on density
        for (int i = 0; i < numVertices; i++) {
            for (int j = 0; j < numVertices; j++) {
                if (i == j) continue; // No self-loops

                // For undirected graphs, only consider (i, j) where i < j to avoid duplicate edges
                // when processing (j, i) later and to ensure correct density logic.
                if (!isDirected && i > j) continue;

                if (random.nextDouble() < edgeDensity) {
                    int weight = (maxWeight > 0) ? random.nextInt(maxWeight) + 1 : 1;
                    graph.addEdge(i, j, weight);
                }
            }
        }
        return graph;
    }

    /**
     * Generates a random DAG (Directed Acyclic Graph).
     * Edges only go from smaller vertex indices to larger ones to ensure acyclicity.
     *
     * @param numVertices Number of vertices.
     * @param edgeDensity A value between 0.0 and 1.0.
     * @param maxWeight   Maximum weight for edges (inclusive). If 0, all weights are 1.
     * @return A random DAG.
     */
    public static Graph<Integer> generateRandomDAG(int numVertices, double edgeDensity, int maxWeight) {
        if (edgeDensity < 0.0 || edgeDensity > 1.0) {
            throw new IllegalArgumentException("Edge density must be between 0.0 and 1.0.");
        }
        Graph<Integer> graph = new Graph<>(true); // DAGs are always directed
        Random random = new Random();

        for (int i = 0; i < numVertices; i++) {
            graph.addVertex(i);
        }

        for (int i = 0; i < numVertices; i++) {
            for (int j = i + 1; j < numVertices; j++) { // Ensure j > i for acyclicity
                if (random.nextDouble() < edgeDensity) {
                    int weight = (maxWeight > 0) ? random.nextInt(maxWeight) + 1 : 1;
                    graph.addEdge(i, j, weight);
                }
            }
        }
        return graph;
    }

    /**
     * Generates a disconnected graph by creating multiple connected components.
     *
     * @param totalVertices    Total number of vertices.
     * @param numComponents    Number of desired connected components.
     * @param isDirected       True for directed, false for undirected.
     * @param maxWeight        Maximum weight for edges.
     * @return A disconnected graph.
     * @throws IllegalArgumentException if numComponents > totalVertices.
     */
    public static Graph<Integer> generateDisconnectedGraph(int totalVertices, int numComponents, boolean isDirected, int maxWeight) {
        if (numComponents > totalVertices) {
            throw new IllegalArgumentException("Number of components cannot exceed total vertices.");
        }
        Graph<Integer> graph = new Graph<>(isDirected);
        Random random = new Random();

        // Assign vertices to components
        List<List<Integer>> components = new ArrayList<>();
        for (int i = 0; i < numComponents; i++) {
            components.add(new ArrayList<>());
        }
        for (int i = 0; i < totalVertices; i++) {
            graph.addVertex(i);
            components.get(i % numComponents).add(i); // Distribute vertices
        }

        // Build a complete graph within each component (or dense enough to be connected)
        for (List<Integer> component : components) {
            if (component.isEmpty()) continue;
            // Ensure each component is connected internally.
            // A simple way is to create a path or complete graph within each.
            // Here, we'll aim for a dense subgraph for connectivity.
            for (int i = 0; i < component.size(); i++) {
                for (int j = i + 1; j < component.size(); j++) {
                    int u = component.get(i);
                    int v = component.get(j);
                    // Add edges to ensure connectivity, maybe not all, but enough.
                    // For simplicity, connect every pair within a component
                    int weight = (maxWeight > 0) ? random.nextInt(maxWeight) + 1 : 1;
                    graph.addEdge(u, v, weight);
                }
            }
        }
        return graph;
    }
}
```