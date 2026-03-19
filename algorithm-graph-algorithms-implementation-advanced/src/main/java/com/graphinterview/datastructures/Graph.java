```java
package com.graphinterview.datastructures;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

/**
 * Represents a graph using an adjacency list.
 * Supports both directed and undirected graphs, and weighted or unweighted edges.
 */
public class Graph {

    /**
     * Represents an edge in the graph.
     */
    public static class Edge implements Comparable<Edge> {
        public int source;
        public int destination;
        public int weight; // For weighted graphs

        public Edge(int source, int destination) {
            this(source, destination, 1); // Default weight for unweighted graphs
        }

        public Edge(int source, int destination, int weight) {
            this.source = source;
            this.destination = destination;
            this.weight = weight;
        }

        @Override
        public String toString() {
            return "(" + source + " -> " + destination + ", W=" + weight + ")";
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Edge edge = (Edge) o;
            // For undirected graphs, (u,v) is same as (v,u) if weights are ignored for equality.
            // But for directed graphs, order matters. Here, we assume directed comparison.
            return source == edge.source &&
                    destination == edge.destination &&
                    weight == edge.weight;
        }

        @Override
        public int hashCode() {
            return Objects.hash(source, destination, weight);
        }

        /**
         * Compares edges primarily by weight.
         * Useful for algorithms like Kruskal's where edges need to be sorted.
         */
        @Override
        public int compareTo(Edge other) {
            return Integer.compare(this.weight, other.weight);
        }
    }

    private int numVertices;
    private List<List<Edge>> adj; // Adjacency list: adj[u] contains edges starting from u
    private List<Edge> allEdges; // Stores all edges for algorithms like Kruskal's

    /**
     * Initializes a graph with a specified number of vertices.
     *
     * @param numVertices The total number of vertices in the graph.
     */
    public Graph(int numVertices) {
        this.numVertices = numVertices;
        adj = new ArrayList<>(numVertices);
        for (int i = 0; i < numVertices; i++) {
            adj.add(new ArrayList<>());
        }
        allEdges = new ArrayList<>();
    }

    /**
     * Adds a directed edge to the graph.
     *
     * @param source      The starting vertex of the edge.
     * @param destination The ending vertex of the edge.
     */
    public void addEdge(int source, int destination) {
        addEdge(source, destination, 1, true); // Default to weighted 1, directed
    }

    /**
     * Adds a directed or undirected edge with a specified weight.
     *
     * @param source      The starting vertex.
     * @param destination The ending vertex.
     * @param weight      The weight of the edge.
     * @param directed    True if the edge is directed, false for undirected.
     * @throws IllegalArgumentException if source or destination are out of bounds.
     */
    public void addEdge(int source, int destination, int weight, boolean directed) {
        if (source < 0 || source >= numVertices || destination < 0 || destination >= numVertices) {
            throw new IllegalArgumentException("Vertex index out of bounds.");
        }

        // Add the forward edge
        Edge forwardEdge = new Edge(source, destination, weight);
        adj.get(source).add(forwardEdge);
        allEdges.add(forwardEdge);

        // If undirected, add the backward edge
        if (!directed) {
            Edge backwardEdge = new Edge(destination, source, weight);
            adj.get(destination).add(backwardEdge);
            // For undirected, we usually only store one edge in allEdges list for Kruskal's.
            // But if specific problem needs both representations, we could add both.
            // For Kruskal, we'll sort `allEdges` anyway and only pick if not forming cycle.
        }
    }

    /**
     * Returns the number of vertices in the graph.
     *
     * @return The number of vertices.
     */
    public int getNumVertices() {
        return numVertices;
    }

    /**
     * Returns the adjacency list for a given vertex.
     *
     * @param vertex The vertex for which to get the adjacency list.
     * @return A list of edges starting from the given vertex.
     * @throws IllegalArgumentException if the vertex is out of bounds.
     */
    public List<Edge> getAdj(int vertex) {
        if (vertex < 0 || vertex >= numVertices) {
            throw new IllegalArgumentException("Vertex index out of bounds.");
        }
        return adj.get(vertex);
    }

    /**
     * Returns an unmodifiable list of all edges in the graph.
     * Useful for algorithms like Kruskal's.
     * Note: If edges were added as undirected, the `allEdges` list will only contain the forward edges
     * from `addEdge` calls if `directed=false` was passed. For Kruskal's, this means one
     * `(u,v,w)` edge for an undirected `u-v` connection.
     *
     * @return A list of all edges.
     */
    public List<Edge> getAllEdges() {
        // Return a copy or unmodifiable list to prevent external modification
        return Collections.unmodifiableList(allEdges);
    }

    /**
     * Prints the graph's adjacency list representation.
     */
    public void printGraph() {
        System.out.println("Graph Adjacency List:");
        for (int i = 0; i < numVertices; i++) {
            System.out.print("Vertex " + i + ": ");
            for (Edge edge : adj.get(i)) {
                System.out.print(" -> " + edge.destination + "(W" + edge.weight + ")");
            }
            System.out.println();
        }
    }

    // Example Usage (for testing the Graph class itself)
    public static void main(String[] args) {
        // Directed Weighted Graph
        Graph directedWeightedGraph = new Graph(4);
        directedWeightedGraph.addEdge(0, 1, 10, true);
        directedWeightedGraph.addEdge(0, 2, 5, true);
        directedWeightedGraph.addEdge(1, 2, 2, true);
        directedWeightedGraph.addEdge(1, 3, 1, true);
        directedWeightedGraph.addEdge(2, 1, 3, true);
        directedWeightedGraph.addEdge(2, 3, 9, true);
        directedWeightedGraph.addEdge(3, 0, 4, true);
        directedWeightedGraph.printGraph();
        System.out.println("All edges for directed graph: " + directedWeightedGraph.getAllEdges());

        System.out.println("\n---------------------\n");

        // Undirected Unweighted Graph
        Graph undirectedUnweightedGraph = new Graph(5);
        undirectedUnweightedGraph.addEdge(0, 1, 1, false); // weight 1, undirected
        undirectedUnweightedGraph.addEdge(0, 4, 1, false);
        undirectedUnweightedGraph.addEdge(1, 2, 1, false);
        undirectedUnweightedGraph.addEdge(1, 3, 1, false);
        undirectedUnweightedGraph.addEdge(1, 4, 1, false);
        undirectedUnweightedGraph.addEdge(2, 3, 1, false);
        undirectedUnweightedGraph.addEdge(3, 4, 1, false);
        undirectedUnweightedGraph.printGraph();
        System.out.println("All edges for undirected graph (note: only one direction stored in this list): " + undirectedUnweightedGraph.getAllEdges());
    }
}

```