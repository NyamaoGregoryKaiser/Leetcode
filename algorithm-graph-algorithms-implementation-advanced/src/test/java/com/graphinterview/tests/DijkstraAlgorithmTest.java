```java
package com.graphinterview.tests;

import com.graphinterview.algorithms.DijkstraAlgorithm;
import com.graphinterview.datastructures.Graph;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

/**
 * Test class for DijkstraAlgorithm.
 */
public class DijkstraAlgorithmTest {

    private DijkstraAlgorithm solver;

    @BeforeEach
    void setUp() {
        solver = new DijkstraAlgorithm();
    }

    @Test
    @DisplayName("Example 1: Standard graph from problem description")
    void testFindShortestPaths_Example1() {
        Graph graph = new Graph(4);
        graph.addEdge(0, 1, 10, true);
        graph.addEdge(0, 2, 5, true);
        graph.addEdge(1, 2, 2, true);
        graph.addEdge(1, 3, 1, true);
        graph.addEdge(2, 1, 3, true);
        graph.addEdge(2, 3, 9, true);
        graph.addEdge(3, 0, 4, true);

        int[] expected = {0, 8, 5, 9}; // Distances from source 0
        int[] actual = solver.findShortestPaths(graph, 0);
        assertNotNull(actual);
        assertArrayEquals(expected, actual);
    }

    @Test
    @DisplayName("Example 2: Disconnected graph")
    void testFindShortestPaths_DisconnectedGraph() {
        Graph graph = new Graph(5);
        graph.addEdge(0, 1, 1, true);
        graph.addEdge(0, 2, 6, true);
        graph.addEdge(1, 3, 2, true);
        graph.addEdge(3, 2, 3, true);
        // Vertex 4 is isolated

        int[] expected = {0, 1, 6, 3, Integer.MAX_VALUE}; // Distances from source 0
        int[] actual = solver.findShortestPaths(graph, 0);
        assertNotNull(actual);
        assertArrayEquals(expected, actual);
    }

    @Test
    @DisplayName("Example 3: Single vertex graph")
    void testFindShortestPaths_SingleVertexGraph() {
        Graph graph = new Graph(1); // Vertex 0
        int[] expected = {0};
        int[] actual = solver.findShortestPaths(graph, 0);
        assertNotNull(actual);
        assertArrayEquals(expected, actual);
    }

    @Test
    @DisplayName("Example 4: Graph with all equal weights")
    void testFindShortestPaths_EqualWeights() {
        Graph graph = new Graph(3);
        graph.addEdge(0, 1, 1, true);
        graph.addEdge(1, 2, 1, true);
        graph.addEdge(0, 2, 5, true); // This path is longer, Dijkstra should pick 0->1->2

        int[] expected = {0, 1, 2}; // Distances from source 0
        int[] actual = solver.findShortestPaths(graph, 0);
        assertNotNull(actual);
        assertArrayEquals(expected, actual);
    }

    @Test
    @DisplayName("Example 5: Graph with negative weights (Dijkstra is not guaranteed to work correctly)")
    void testFindShortestPaths_NegativeWeights() {
        Graph graph = new Graph(3);
        graph.addEdge(0, 1, 1, true);
        graph.addEdge(1, 2, -3, true); // Negative weight
        graph.addEdge(0, 2, 5, true);

        // Expected correct shortest path: 0 -> 1 -> 2 (1 + -3 = -2)
        // Dijkstra's output will be 0:0, 1:1, 2:-2.
        // For this *specific* simple graph, Dijkstra happens to get the correct answer.
        // It's important to know *why* it can fail in general with negative weights.
        int[] expected = {0, 1, -2};
        int[] actual = solver.findShortestPaths(graph, 0);
        assertNotNull(actual);
        assertArrayEquals(expected, actual);
    }

    @Test
    @DisplayName("Edge Case: Invalid source vertex (out of bounds)")
    void testFindShortestPaths_InvalidSource() {
        Graph graph = new Graph(3);
        assertNull(solver.findShortestPaths(graph, -1));
        assertNull(solver.findShortestPaths(graph, 3));
    }

    @Test
    @DisplayName("Edge Case: Null graph")
    void testFindShortestPaths_NullGraph() {
        assertNull(solver.findShortestPaths(null, 0));
    }

    @Test
    @DisplayName("Graph with no edges")
    void testFindShortestPaths_NoEdges() {
        Graph graph = new Graph(3);
        int[] expected = {0, Integer.MAX_VALUE, Integer.MAX_VALUE};
        int[] actual = solver.findShortestPaths(graph, 0);
        assertNotNull(actual);
        assertArrayEquals(expected, actual);
    }

    @Test
    @DisplayName("Graph with a cycle but non-negative weights")
    void testFindShortestPaths_CycleNonNegative() {
        Graph graph = new Graph(3);
        graph.addEdge(0, 1, 1, true);
        graph.addEdge(1, 2, 1, true);
        graph.addEdge(2, 0, 1, true); // Cycle 0->1->2->0
        graph.addEdge(0, 2, 5, true); // Longer path 0->2 directly

        int[] expected = {0, 1, 2}; // From 0: 0->1 (1), 0->1->2 (2)
        int[] actual = solver.findShortestPaths(graph, 0);
        assertNotNull(actual);
        assertArrayEquals(expected, actual);
    }

    @Test
    @DisplayName("Complex graph with multiple paths")
    void testFindShortestPaths_ComplexGraph() {
        Graph graph = new Graph(6); // 0-5
        graph.addEdge(0, 1, 2, true);
        graph.addEdge(0, 2, 4, true);
        graph.addEdge(1, 2, 1, true);
        graph.addEdge(1, 3, 7, true);
        graph.addEdge(2, 4, 3, true);
        graph.addEdge(3, 5, 1, true);
        graph.addEdge(4, 3, 2, true);
        graph.addEdge(4, 5, 5, true);

        // Path from 0:
        // 0 -> 0 (0)
        // 0 -> 1 (2)
        // 0 -> 1 -> 2 (2+1 = 3). 0->2 (4). Min 3 for 2.
        // 0 -> 1 -> 2 -> 4 (3+3 = 6)
        // 0 -> 1 -> 2 -> 4 -> 3 (6+2 = 8). 0->1->3 (2+7=9). Min 8 for 3.
        // 0 -> 1 -> 2 -> 4 -> 3 -> 5 (8+1 = 9). 0->1->2->4->5 (6+5=11). Min 9 for 5.
        int[] expected = {0, 2, 3, 8, 6, 9};
        int[] actual = solver.findShortestPaths(graph, 0);
        assertNotNull(actual);
        assertArrayEquals(expected, actual);
    }
}
```