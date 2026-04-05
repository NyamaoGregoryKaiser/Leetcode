```java
package com.example.graph.model;

import java.util.Objects;

/**
 * Represents a node (vertex) in a graph.
 * Nodes are identified by a unique integer ID and can optionally hold a value.
 */
public class GraphNode {
    private final int id;
    private final String value; // Optional descriptive value for the node

    /**
     * Constructs a new GraphNode with the given ID.
     * The value is set to a default string representation of the ID.
     * @param id The unique integer ID for this node.
     */
    public GraphNode(int id) {
        this(id, String.valueOf(id));
    }

    /**
     * Constructs a new GraphNode with the given ID and value.
     * @param id The unique integer ID for this node.
     * @param value A string value associated with the node.
     */
    public GraphNode(int id, String value) {
        this.id = id;
        this.value = value;
    }

    /**
     * Returns the unique ID of this node.
     * @return The node's ID.
     */
    public int getId() {
        return id;
    }

    /**
     * Returns the value associated with this node.
     * @return The node's value.
     */
    public String getValue() {
        return value;
    }

    /**
     * Compares this GraphNode to another object for equality.
     * Two GraphNodes are considered equal if they have the same ID.
     * @param o The object to compare with.
     * @return True if the objects are equal, false otherwise.
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GraphNode graphNode = (GraphNode) o;
        return id == graphNode.id;
    }

    /**
     * Returns a hash code for this GraphNode.
     * The hash code is based solely on the node's ID to maintain consistency with `equals()`.
     * @return The hash code.
     */
    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    /**
     * Returns a string representation of this GraphNode.
     * @return A string in the format "Node(id=ID, value=VALUE)".
     */
    @Override
    public String toString() {
        return "Node(id=" + id + (value != null && !value.equals(String.valueOf(id)) ? ", value=" + value : "") + ")";
    }
}
```