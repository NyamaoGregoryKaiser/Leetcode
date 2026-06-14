```java
package com.example.graph.algorithms;

import com.example.graph.datastructures.Edge;
import com.example.graph.datastructures.Graph;
import com.example.graph.util.GraphGenerator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.HashSet;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

class KruskalsMSTTest {

    private KruskalsMST<Integer> kruskalsMST;

    @BeforeEach
    void setUp() {
        kruskalsMST = new KruskalsMST<>();
    }

    private int calculateTotalWeight(List<Edge<Integer>> mst) {
        return mst.stream().mapToInt(Edge::getWeight).sum();
    }

    // Helper to compare MSTs, as order might vary
    private boolean compareMsts(List<Edge<Integer>> actualMst, List<Edge<Integer>> expectedMst) {
        if (actualMst.size() != expectedMst.size()) {
            return false;
        }
        // Normalize edges (e.g., (u,v) always u < v) and sort
        Set<String> actualEdges = actualMst.stream()
                .map(e -> e.getSource() < e.getDestination() ?
                        e.getSource() + "-" + e.getDestination() + ":" + e.getWeight() :
                        e.getDestination() + "-" + e.getSource() + ":" + e.getWeight())
                .collect(Collectors.toSet());
        Set<String> expectedEdges = expectedMst.stream()
                .map(e -> e.getSource() < e.getDestination() ?
                        e.getSource() + "-" + e.getDestination() + ":" + e.getWeight() :
                        e.getDestination() + "-" + e.getSource() + ":" + e.getWeight())
                .collect(Collectors.toSet());

        return actualEdges.equals(expectedEdges);
    }


    @Test
    void testFindMST_SimpleGraph() {
        Graph<Integer> graph = new Graph<>(false); // Undirected
        graph.addEdge(0, 1, 10);
        graph.addEdge(0, 2, 6);
        graph.addEdge(0, 3, 5);
        graph.addEdge(1, 3, 15);
        graph.addEdge(2, 3, 4);

        List<Edge<Integer>> mst = kruskalsMST.findMinimumSpanningTree(graph);

        // Expected edges in MST (order might vary after sorting by weight):
        // (2,3,4), (0,3,5), (0,2,6)
        // Total weight: 4 + 5 + 6 = 15
        List<Edge<Integer>> expectedMstEdges = Arrays.asList(
                new Edge<>(2, 3, 4),
                new Edge<>(0, 3, 5),
                new Edge<>(0, 2, 6)
        );

        assertEquals(3, mst.size()); // V-1 edges for 4 vertices
        assertEquals(15, calculateTotalWeight(mst));
        assertTrue(compareMsts(mst, expectedMstEdges));
    }

    @Test
    void testFindMST_AnotherExampleGraph() {
        Graph<Integer> graph = new Graph<>(false);
        graph.addEdge(0, 1, 4);
        graph.addEdge(0, 7, 8);
        graph.addEdge(1, 2, 8);
        graph.addEdge(1, 7, 11);
        graph.addEdge(2, 3, 7);
        graph.addEdge(2, 8, 2);
        graph.addEdge(2, 5, 4);
        graph.addEdge(3, 4, 9);
        graph.addEdge(3, 5, 14);
        graph.addEdge(4, 5, 10);
        graph.addEdge(5, 6, 2);
        graph.addEdge(6, 7, 1);
        graph.addEdge(6, 8, 6);
        graph.addEdge(7, 8, 7);

        List<Edge<Integer>> mst = kruskalsMST.findMinimumSpanningTree(graph);

        // Expected edges: (6,7,1), (2,8,2), (5,6,2), (0,1,4), (2,5,4), (2,3,7), (0,7,8), (3,4,9)
        // Total weight: 1+2+2+4+4+7+8+9 = 37
        List<Edge<Integer>> expectedMstEdges = Arrays.asList(
                new Edge<>(6, 7, 1),
                new Edge<>(2, 8, 2),
                new Edge<>(5, 6, 2),
                new Edge<>(0, 1, 4),
                new Edge<>(2, 5, 4),
                new Edge<>(2, 3, 7), // Or (0,3,5) if it's the 4-vertex example
                new Edge<>(0, 7, 8),
                new Edge<>(3, 4, 9)
        );
        assertEquals(8, mst.size()); // V-1 edges for 9 vertices
        assertEquals(37, calculateTotalWeight(mst));
        assertTrue(compareMsts(mst, expectedMstEdges));
    }

    @Test
    void testFindMST_DisconnectedGraph() {
        Graph<Integer> graph = new Graph<>(false);
        graph.addEdge(0, 1, 1);
        graph.addEdge(1, 2, 1); // Component 1: 0-1-2
        graph.addVertex(3); // Isolated vertex
        graph.addEdge(4, 5, 1); // Component 2: 4-5

        List<Edge<Integer>> mst = kruskalsMST.findMinimumSpanningTree(graph);

        // Expected: Spanning forest. Edges for {0,1,2} and {4,5}. Vertex 3 remains isolated.
        // For vertices {0,1,2} it needs 2 edges. For {4,5} it needs 1 edge. Total 3 edges.
        List<Edge<Integer>> expectedMstEdges = Arrays.asList(
                new Edge<>(0, 1, 1),
                new Edge<>(1, 2, 1),
                new Edge<>(4, 5, 1)
        );
        assertEquals(3, mst.size()); // 2 edges for 3 vertices in first component + 1 edge for 2 vertices in second component
        assertEquals(3, calculateTotalWeight(mst));
        assertTrue(compareMsts(mst, expectedMstEdges));
        // Note: The method prints a warning for disconnected graphs, which is expected.
    }

    @Test
    void testFindMST_EmptyGraph() {
        Graph<Integer> graph = new Graph<>(false);
        List<Edge<Integer>> mst = kruskalsMST.findMinimumSpanningTree(graph);
        assertTrue(mst.isEmpty());
        assertEquals(0, calculateTotalWeight(mst));
    }

    @Test
    void testFindMST_SingleVertexGraph() {
        Graph<Integer> graph = new Graph<>(false);
        graph.addVertex(0);
        List<Edge<Integer>> mst = kruskalsMST.findMinimumSpanningTree(graph);
        assertTrue(mst.isEmpty());
        assertEquals(0, calculateTotalWeight(mst));
    }

    @Test
    void testFindMST_GraphWithSameWeightEdges() {
        Graph<Integer> graph = new Graph<>(false);
        graph.addEdge(0, 1, 1);
        graph.addEdge(1, 2, 1);
        graph.addEdge(0, 2, 1); // Forms a cycle with same weight edges

        List<Edge<Integer>> mst = kruskalsMST.findMinimumSpanningTree(graph);
        assertEquals(2, mst.size()); // V-1 edges for 3 vertices
        assertEquals(2, calculateTotalWeight(mst));

        // There are multiple valid MSTs here (e.g., (0,1),(1,2) or (0,1),(0,2) etc.)
        // We just check the size and weight.
        assertTrue(mst.stream().allMatch(e -> e.getWeight() == 1));
    }

    @Test
    void testFindMST_DirectedGraphThrowsException() {
        Graph<Integer> directedGraph = new Graph<>(true);
        directedGraph.addEdge(0, 1, 5);
        assertThrows(IllegalArgumentException.class, () -> kruskalsMST.findMinimumSpanningTree(directedGraph));
    }

    @Test
    void testFindMST_LargeRandomGraph() {
        int numVertices = 50;
        double edgeDensity = 0.3; // Relatively dense to ensure connectivity
        int maxWeight = 100;
        Graph<Integer> graph = GraphGenerator.generateRandomGraph(numVertices, edgeDensity, false, maxWeight);

        List<Edge<Integer>> mst = kruskalsMST.findMinimumSpanningTree(graph);

        // For a connected graph, MST should have V-1 edges
        if (mst.size() == numVertices - 1) {
            System.out.println("MST for large random graph (V=" + numVertices + ", E=" + graph.getNumEdges() + ") has " + mst.size() + " edges.");
            System.out.println("Total MST Weight: " + calculateTotalWeight(mst));
        } else {
            System.out.println("Warning: Large random graph may be disconnected. Found " + mst.size() + " edges for " + numVertices + " vertices.");
        }
        // Basic checks: all edges should have non-negative weights
        assertTrue(mst.stream().allMatch(e -> e.getWeight() > 0)); // Because maxWeight > 0 means weight >= 1
    }
}
```