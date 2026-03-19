```java
package com.graphinterview.tests;

import com.graphinterview.algorithms.KruskalAlgorithm;
import com.graphinterview.datastructures.Graph;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Test class for KruskalAlgorithm.
 */
public class KruskalAlgorithmTest {

    private KruskalAlgorithm solver;

    @BeforeEach
    void setUp() {
        solver = new KruskalAlgorithm();
    }

    // Helper to calculate total weight of an MST
    private long calculateTotalWeight(List<Graph.Edge> mst) {
        if (mst == null) return -1; // Indicate error or no MST
        return mst.stream().mapToLong(e -> e.weight).sum();
    }

    @Test
    @DisplayName("Example 1: Standard graph from problem description")
    void testFindMinimumSpanningTree_Example1() {
        Graph graph = new Graph(4);
        graph.addEdge(0, 1, 10, false); // Undirected
        graph.addEdge(0, 2, 6, false);
        graph.addEdge(0, 3, 5, false);
        graph.addEdge(1, 3, 15, false);
        graph.addEdge(2, 3, 4, false);

        List<Graph.Edge> mst = solver.findMinimumSpanningTree(graph);
        assertNotNull(mst);
        assertEquals(3, mst.size()); // V-1 edges for V=4
        assertEquals(19, calculateTotalWeight(mst)); // 4+5+10 = 19
        // Edges can be in any order, so check for presence rather than exact order
        List<String> edgeStrings = mst.stream().map(e -> String.format("(%d,%d,%d)", Math.min(e.source, e.destination), Math.max(e.source, e.destination), e.weight)).collect(Collectors.toList());
        assertTrue(edgeStrings.contains("(2,3,4)"));
        assertTrue(edgeStrings.contains("(0,3,5)"));
        assertTrue(edgeStrings.contains("(0,1,10)"));
    }

    @Test
    @DisplayName("Example 2: Disconnected graph")
    void testFindMinimumSpanningTree_DisconnectedGraph() {
        Graph graph = new Graph(5);
        graph.addEdge(0, 1, 1, false);
        graph.addEdge(0, 2, 2, false);
        graph.addEdge(3, 4, 3, false); // Separate component

        List<Graph.Edge> mst = solver.findMinimumSpanningTree(graph);
        assertNull(mst); // Should return null for a disconnected graph
    }

    @Test
    @DisplayName("Example 3: Single vertex graph")
    void testFindMinimumSpanningTree_SingleVertexGraph() {
        Graph graph = new Graph(1); // Vertex 0
        List<Graph.Edge> mst = solver.findMinimumSpanningTree(graph);
        assertNotNull(mst);
        assertTrue(mst.isEmpty()); // MST for single vertex has no edges
        assertEquals(0, calculateTotalWeight(mst));
    }

    @Test
    @DisplayName("Example 4: Graph with all equal weights")
    void testFindMinimumSpanningTree_EqualWeights() {
        Graph graph = new Graph(3);
        graph.addEdge(0, 1, 5, false);
        graph.addEdge(1, 2, 5, false);
        graph.addEdge(0, 2, 5, false);

        List<Graph.Edge> mst = solver.findMinimumSpanningTree(graph);
        assertNotNull(mst);
        assertEquals(2, mst.size()); // V-1 edges for V=3
        assertEquals(10, calculateTotalWeight(mst)); // 5+5=10
    }

    @Test
    @DisplayName("Edge Case: Null graph")
    void testFindMinimumSpanningTree_NullGraph() {
        List<Graph.Edge> mst = solver.findMinimumSpanningTree(null);
        assertNotNull(mst); // Should return empty list, not null, as per implementation
        assertTrue(mst.isEmpty());
    }

    @Test
    @DisplayName("Edge Case: Graph with 0 vertices")
    void testFindMinimumSpanningTree_ZeroVertices() {
        Graph graph = new Graph(0);
        List<Graph.Edge> mst = solver.findMinimumSpanningTree(graph);
        assertNotNull(mst);
        assertTrue(mst.isEmpty());
    }

    @Test
    @DisplayName("Graph with no edges (multiple vertices)")
    void testFindMinimumSpanningTree_NoEdgesMultipleVertices() {
        Graph graph = new Graph(3); // 3 vertices, no edges
        List<Graph.Edge> mst = solver.findMinimumSpanningTree(graph);
        assertNull(mst); // Disconnected, should return null
    }

    @Test
    @DisplayName("Complex graph with many edges")
    void testFindMinimumSpanningTree_ComplexGraph() {
        Graph graph = new Graph(7);
        graph.addEdge(0, 1, 7, false);
        graph.addEdge(0, 3, 5, false);
        graph.addEdge(1, 2, 8, false);
        graph.addEdge(1, 3, 9, false);
        graph.addEdge(1, 4, 7, false);
        graph.addEdge(2, 4, 5, false);
        graph.addEdge(3, 4, 15, false);
        graph.addEdge(3, 5, 6, false);
        graph.addEdge(4, 5, 8, false);
        graph.addEdge(4, 6, 9, false);
        graph.addEdge(5, 6, 11, false);

        List<Graph.Edge> mst = solver.findMinimumSpanningTree(graph);
        assertNotNull(mst);
        assertEquals(6, mst.size()); // V-1 edges for V=7
        assertEquals(39, calculateTotalWeight(mst));
        // Expected edges: (0,3,5), (2,4,5), (3,5,6), (0,1,7), (1,4,7), (4,6,9) (order varies)
    }

    @Test
    @DisplayName("Graph with 2 vertices and one edge")
    void testFindMinimumSpanningTree_TwoVerticesOneEdge() {
        Graph graph = new Graph(2);
        graph.addEdge(0, 1, 10, false);
        List<Graph.Edge> mst = solver.findMinimumSpanningTree(graph);
        assertNotNull(mst);
        assertEquals(1, mst.size());
        assertEquals(10, calculateTotalWeight(mst));
    }
}
```