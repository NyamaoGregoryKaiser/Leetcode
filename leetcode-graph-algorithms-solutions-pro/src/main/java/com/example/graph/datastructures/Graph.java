```java
package com.example.graph.datastructures;

import java.util.*;

/**
 * Represents a graph using an adjacency list.
 * Supports both directed and undirected graphs.
 * Can store generic vertex types.
 *
 * @param <V> The type of the vertex (e.g., Integer, String).
 */
public class Graph<V> {
    // Adjacency list: maps a vertex to a list of its neighbors.
    private final Map<V, List<V>> adjList;
    // Map to store weights for edges if the graph is weighted.
    // Key: source vertex, Value: Map (Key: destination vertex, Value: weight)
    private final Map<V, Map<V, Integer>> weights;
    private final boolean isDirected;

    /**
     * Constructs a new Graph.
     *
     * @param isDirected true if the graph is directed, false for undirected.
     */
    public Graph(boolean isDirected) {
        this.adjList = new HashMap<>();
        this.weights = new HashMap<>();
        this.isDirected = isDirected;
    }

    /**
     * Adds a vertex to the graph.
     * If the vertex already exists, it does nothing.
     *
     * @param vertex The vertex to add.
     */
    public void addVertex(V vertex) {
        adjList.putIfAbsent(vertex, new ArrayList<>());
        weights.putIfAbsent(vertex, new HashMap<>()); // Initialize weights map for new vertex
    }

    /**
     * Adds an edge between two vertices.
     * If the vertices do not exist, they are added to the graph.
     * For undirected graphs, an edge is added in both directions.
     *
     * @param source      The source vertex.
     * @param destination The destination vertex.
     */
    public void addEdge(V source, V destination) {
        addEdge(source, destination, 1); // Default weight of 1 for unweighted graphs
    }

    /**
     * Adds a weighted edge between two vertices.
     * If the vertices do not exist, they are added to the graph.
     * For undirected graphs, an edge is added in both directions with the same weight.
     *
     * @param source      The source vertex.
     * @param destination The destination vertex.
     * @param weight      The weight of the edge.
     */
    public void addEdge(V source, V destination, int weight) {
        // Ensure both source and destination vertices exist in the graph
        addVertex(source);
        addVertex(destination);

        // Add edge from source to destination
        adjList.get(source).add(destination);
        weights.get(source).put(destination, weight);

        // If undirected, add edge from destination to source as well
        if (!isDirected) {
            adjList.get(destination).add(source);
            weights.get(destination).put(source, weight);
        }
    }

    /**
     * Returns the list of neighbors for a given vertex.
     *
     * @param vertex The vertex.
     * @return A list of neighboring vertices, or an empty list if the vertex is not in the graph.
     */
    public List<V> getNeighbors(V vertex) {
        return adjList.getOrDefault(vertex, Collections.emptyList());
    }

    /**
     * Returns the weight of an edge between two vertices.
     *
     * @param source      The source vertex.
     * @param destination The destination vertex.
     * @return The weight of the edge, or -1 if the edge does not exist or vertices are not found.
     */
    public int getWeight(V source, V destination) {
        if (weights.containsKey(source) && weights.get(source).containsKey(destination)) {
            return weights.get(source).get(destination);
        }
        return -1; // Indicate no edge or not found
    }

    /**
     * Returns a set of all vertices in the graph.
     *
     * @return A set of all vertices.
     */
    public Set<V> getVertices() {
        return adjList.keySet();
    }

    /**
     * Returns all edges in the graph as a list of Edge objects.
     * Useful for algorithms like Kruskal's.
     * For undirected graphs, each edge (u, v) is returned only once.
     *
     * @return A list of all edges.
     */
    public List<Edge<V>> getAllEdges() {
        List<Edge<V>> allEdges = new ArrayList<>();
        Set<String> addedEdges = new HashSet<>(); // To avoid adding duplicate edges for undirected graphs

        for (Map.Entry<V, List<V>> entry : adjList.entrySet()) {
            V source = entry.getKey();
            for (V destination : entry.getValue()) {
                int weight = getWeight(source, destination);

                if (isDirected) {
                    allEdges.add(new Edge<>(source, destination, weight));
                } else {
                    // For undirected, add (u,v) only once, not (v,u)
                    String edgeKey1 = source.toString() + "-" + destination.toString();
                    String edgeKey2 = destination.toString() + "-" + source.toString();
                    if (!addedEdges.contains(edgeKey1) && !addedEdges.contains(edgeKey2)) {
                        allEdges.add(new Edge<>(source, destination, weight));
                        addedEdges.add(edgeKey1); // Mark this edge as added
                    }
                }
            }
        }
        return allEdges;
    }

    /**
     * Checks if the graph is directed.
     *
     * @return true if directed, false if undirected.
     */
    public boolean isDirected() {
        return isDirected;
    }

    /**
     * Returns the number of vertices in the graph.
     *
     * @return The number of vertices.
     */
    public int getNumVertices() {
        return adjList.size();
    }

    /**
     * Returns the number of edges in the graph.
     * For undirected graphs, each (u,v) edge counts as one.
     *
     * @return The number of edges.
     */
    public int getNumEdges() {
        int count = 0;
        for (List<V> neighbors : adjList.values()) {
            count += neighbors.size();
        }
        // For undirected graphs, each edge is stored twice (u->v and v->u), so divide by 2.
        return isDirected ? count : count / 2;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Graph (").append(isDirected ? "Directed" : "Undirected").append("):\n");
        for (Map.Entry<V, List<V>> entry : adjList.entrySet()) {
            sb.append("  ").append(entry.getKey()).append(" -> ");
            boolean first = true;
            for (V neighbor : entry.getValue()) {
                if (!first) {
                    sb.append(", ");
                }
                sb.append(neighbor).append(" (").append(getWeight(entry.getKey(), neighbor)).append(")");
                first = false;
            }
            sb.append("\n");
        }
        return sb.toString();
    }
}
```