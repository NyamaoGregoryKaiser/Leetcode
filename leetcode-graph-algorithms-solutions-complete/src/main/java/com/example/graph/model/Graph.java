```java
package com.example.graph.model;

import java.util.*;

/**
 * Represents a graph using an adjacency list representation.
 * Supports both directed and undirected graphs.
 */
public class Graph {
    // Adjacency list: maps each node to a list of edges originating from it.
    private final Map<GraphNode, List<GraphEdge>> adjList;
    private final boolean directed; // True if directed, false if undirected
    // Map to quickly access nodes by their ID
    private final Map<Integer, GraphNode> nodes;

    /**
     * Constructs a new Graph.
     * @param directed True for a directed graph, false for an undirected graph.
     */
    public Graph(boolean directed) {
        this.adjList = new HashMap<>();
        this.directed = directed;
        this.nodes = new HashMap<>();
    }

    /**
     * Adds a node to the graph if it doesn't already exist.
     * @param node The GraphNode to add.
     */
    public void addNode(GraphNode node) {
        if (!adjList.containsKey(node)) {
            adjList.put(node, new ArrayList<>());
            nodes.put(node.getId(), node);
        }
    }

    /**
     * Adds an edge to the graph.
     * Automatically adds source and destination nodes if they don't exist.
     * For undirected graphs, an edge is added in both directions (u -> v and v -> u).
     *
     * @param sourceId The ID of the source node.
     * @param destinationId The ID of the destination node.
     * @param weight The weight of the edge.
     */
    public void addEdge(int sourceId, int destinationId, int weight) {
        GraphNode source = nodes.computeIfAbsent(sourceId, id -> {
            GraphNode newNode = new GraphNode(id);
            adjList.put(newNode, new ArrayList<>());
            return newNode;
        });
        GraphNode destination = nodes.computeIfAbsent(destinationId, id -> {
            GraphNode newNode = new GraphNode(id);
            adjList.put(newNode, new ArrayList<>());
            return newNode;
        });

        adjList.get(source).add(new GraphEdge(source, destination, weight));

        // If undirected, add edge in the reverse direction as well
        if (!directed) {
            adjList.get(destination).add(new GraphEdge(destination, source, weight));
        }
    }

    /**
     * Adds an edge to the graph with a default weight of 1.
     * @param sourceId The ID of the source node.
     * @param destinationId The ID of the destination node.
     */
    public void addEdge(int sourceId, int destinationId) {
        addEdge(sourceId, destinationId, 1);
    }

    /**
     * Retrieves a node by its ID.
     * @param nodeId The ID of the node to retrieve.
     * @return The GraphNode corresponding to the ID, or null if not found.
     */
    public GraphNode getNode(int nodeId) {
        return nodes.get(nodeId);
    }

    /**
     * Returns a list of all nodes present in the graph.
     * @return A new ArrayList containing all nodes.
     */
    public List<GraphNode> getAllNodes() {
        return new ArrayList<>(nodes.values());
    }

    /**
     * Returns a list of edges originating from the given node.
     * @param node The GraphNode whose neighbors are to be retrieved.
     * @return A List of GraphEdge objects, or an empty list if the node is not in the graph.
     */
    public List<GraphEdge> getEdges(GraphNode node) {
        return adjList.getOrDefault(node, Collections.emptyList());
    }

    /**
     * Returns a list of GraphNodes that are neighbors of the given node.
     * @param node The GraphNode whose neighbors are to be retrieved.
     * @return A List of GraphNode objects, or an empty list if the node is not in the graph.
     */
    public List<GraphNode> getNeighbors(GraphNode node) {
        List<GraphNode> neighbors = new ArrayList<>();
        for (GraphEdge edge : getEdges(node)) {
            neighbors.add(edge.getDestination());
        }
        return neighbors;
    }

    /**
     * Checks if the graph is directed.
     * @return True if directed, false if undirected.
     */
    public boolean isDirected() {
        return directed;
    }

    /**
     * Returns the total number of nodes in the graph.
     * @return The size of the graph (number of nodes).
     */
    public int size() {
        return nodes.size();
    }

    /**
     * Returns the adjacency list of the graph.
     * Note: This returns an unmodifiable view to prevent external modification of the graph's internal structure.
     * @return An unmodifiable map representing the adjacency list.
     */
    public Map<GraphNode, List<GraphEdge>> getAdjList() {
        return Collections.unmodifiableMap(adjList);
    }

    /**
     * Provides a string representation of the graph.
     * @return A string showing nodes and their outgoing edges.
     */
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("Graph (")
                .append(directed ? "Directed" : "Undirected")
                .append(") Nodes: ")
                .append(nodes.size())
                .append("\n");
        for (Map.Entry<GraphNode, List<GraphEdge>> entry : adjList.entrySet()) {
            sb.append("  ").append(entry.getKey()).append(" -> ");
            if (entry.getValue().isEmpty()) {
                sb.append("[]\n");
            } else {
                sb.append(entry.getValue()).append("\n");
            }
        }
        return sb.toString();
    }
}
```