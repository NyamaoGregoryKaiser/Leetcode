```java
package com.example.graph.datastructures;

/**
 * Represents an edge in a weighted graph.
 *
 * @param <V> The type of the vertex.
 */
public class Edge<V> implements Comparable<Edge<V>> {
    private final V source;
    private final V destination;
    private final int weight;

    /**
     * Constructs an Edge.
     *
     * @param source      The source vertex.
     * @param destination The destination vertex.
     * @param weight      The weight of the edge.
     */
    public Edge(V source, V destination, int weight) {
        this.source = source;
        this.destination = destination;
        this.weight = weight;
    }

    /**
     * Returns the source vertex of the edge.
     *
     * @return The source vertex.
     */
    public V getSource() {
        return source;
    }

    /**
     * Returns the destination vertex of the edge.
     *
     * @return The destination vertex.
     */
    public V getDestination() {
        return destination;
    }

    /**
     * Returns the weight of the edge.
     *
     * @return The weight.
     */
    public int getWeight() {
        return weight;
    }

    /**
     * Compares this edge with another edge based on their weights.
     * This is crucial for algorithms like Kruskal's that sort edges by weight.
     *
     * @param other The other edge to compare to.
     * @return A negative integer, zero, or a positive integer as this edge's weight
     *         is less than, equal to, or greater than the specified object's weight.
     */
    @Override
    public int compareTo(Edge<V> other) {
        return Integer.compare(this.weight, other.weight);
    }

    @Override
    public String toString() {
        return "(" + source + " -> " + destination + ", weight=" + weight + ")";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Edge<?> edge = (Edge<?>) o;
        // For undirected graphs, (u,v) is same as (v,u) if weights are also same
        // But for distinct edge objects, we check source and destination directly
        // The current implementation treats (u,v) and (v,u) as distinct Edge objects,
        // which is fine for algorithms like Kruskal's where we iterate through all edges.
        return weight == edge.weight &&
               source.equals(edge.source) &&
               destination.equals(edge.destination);
    }

    @Override
    public int hashCode() {
        // Hash for an edge might be tricky if we want (u,v) and (v,u) to have same hash.
        // For now, a simple hash is fine given `equals` distinctness.
        return 31 * source.hashCode() + 31 * destination.hashCode() + weight;
    }
}
```