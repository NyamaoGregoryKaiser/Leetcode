```java
package com.example.graph.model;

import java.util.Objects;

/**
 * Represents an edge in a graph.
 * An edge connects a source node to a destination node and can have an associated weight.
 */
public class GraphEdge {
    private final GraphNode source;
    private final GraphNode destination;
    private final int weight; // Default weight 1 for unweighted graphs

    /**
     * Constructs a new GraphEdge with default weight 1.
     * Used primarily for unweighted graphs.
     * @param source The starting node of the edge.
     * @param destination The ending node of the edge.
     */
    public GraphEdge(GraphNode source, GraphNode destination) {
        this(source, destination, 1);
    }

    /**
     * Constructs a new GraphEdge with a specified weight.
     * @param source The starting node of the edge.
     * @param destination The ending node of the edge.
     * @param weight The weight of the edge.
     */
    public GraphEdge(GraphNode source, GraphNode destination, int weight) {
        this.source = Objects.requireNonNull(source, "Source node cannot be null");
        this.destination = Objects.requireNonNull(destination, "Destination node cannot be null");
        this.weight = weight;
    }

    /**
     * Returns the source node of this edge.
     * @return The source GraphNode.
     */
    public GraphNode getSource() {
        return source;
    }

    /**
     * Returns the destination node of this edge.
     * @return The destination GraphNode.
     */
    public GraphNode getDestination() {
        return destination;
    }

    /**
     * Returns the weight of this edge.
     * @return The integer weight.
     */
    public int getWeight() {
        return weight;
    }

    /**
     * Compares this GraphEdge to another object for equality.
     * Two GraphEdges are considered equal if they connect the same source and destination nodes,
     * and have the same weight. (For undirected graphs, order might not matter, but this implementation is directed).
     * @param o The object to compare with.
     * @return True if the objects are equal, false otherwise.
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GraphEdge graphEdge = (GraphEdge) o;
        return weight == graphEdge.weight &&
               source.equals(graphEdge.source) &&
               destination.equals(graphEdge.destination);
    }

    /**
     * Returns a hash code for this GraphEdge.
     * The hash code is based on source, destination, and weight.
     * @return The hash code.
     */
    @Override
    public int hashCode() {
        return Objects.hash(source, destination, weight);
    }

    /**
     * Returns a string representation of this GraphEdge.
     * @return A string in the format "Edge(SOURCE_ID -> DESTINATION_ID, weight=WEIGHT)".
     */
    @Override
    public String toString() {
        return String.format("Edge(%s -> %s, weight=%d)", source.getId(), destination.getId(), weight);
    }
}
```