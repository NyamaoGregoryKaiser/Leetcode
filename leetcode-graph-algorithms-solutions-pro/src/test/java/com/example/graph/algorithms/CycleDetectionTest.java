```java
package com.example.graph.algorithms;

import com.example.graph.datastructures.Graph;
import com.example.graph.util.GraphGenerator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CycleDetectionTest {

    private CycleDetection<Integer> cycleDetection;

    @BeforeEach
    void setUp() {
        cycleDetection = new CycleDetection<>();
    }

    // --- DFS Cycle Detection Tests (Undirected) ---

    @Test
    void testDetectCycleDFS_Undirected_NoCyclePathGraph() {
        Graph<Integer> graph = GraphGenerator.generatePathGraph(5, false); // 0-1-2-3-4
        assertFalse(cycleDetection.detectCycleDFS(graph));
    }

    @Test
    void testDetectCycleDFS_Undirected_SimpleCycleGraph() {
        Graph<Integer> graph = GraphGenerator.generateCycleGraph(4, false); // 0-1-2-3-0
        assertTrue(cycleDetection.detectCycleDFS(graph));
    }

    @Test
    void testDetectCycleDFS_Undirected_GraphWithMultipleCycles() {
        Graph<Integer> graph = new Graph<>(false);
        graph.addEdge(0, 1);
        graph.addEdge(1, 2);
        graph.addEdge(2, 0); // Cycle 0-1-2
        graph.addEdge(2, 3);
        graph.addEdge(3, 4);
        graph.addEdge(4, 2); // Cycle 2-3-4
        assertTrue(cycleDetection.detectCycleDFS(graph));
    }

    @Test
    void testDetectCycleDFS_Undirected_DisconnectedGraphWithCycle() {
        Graph<Integer> graph = new Graph<>(false);
        graph.addEdge(0, 1);
        graph.addEdge(1, 2);
        graph.addEdge(2, 0); // Component 1: 0-1-2 (cycle)

        graph.addEdge(3, 4); // Component 2: 3-4 (no cycle)
        assertTrue(cycleDetection.detectCycleDFS(graph));
    }

    @Test
    void testDetectCycleDFS_Undirected_DisconnectedGraphNoCycle() {
        Graph<Integer> graph = new Graph<>(false);
        graph.addEdge(0, 1);
        graph.addEdge(2, 3);
        graph.addEdge(3, 4);
        assertFalse(cycleDetection.detectCycleDFS(graph));
    }

    @Test
    void testDetectCycleDFS_Undirected_SelfLoopIgnoredIfExplicitlyChecked() {
        // Our addEdge method for undirected graphs will add (u,v) and (v,u),
        // effectively making a self-loop on a single vertex 0-0 a 0->0 edge.
        // It's technically a cycle, but depends on definition.
        // For general graph cycle detection, usually a self-loop counts.
        Graph<Integer> graph = new Graph<>(false);
        graph.addEdge(0, 0); // Should be handled as a cycle
        assertTrue(cycleDetection.detectCycleDFS(graph)); // In DFS, 0 is parent of 0 for neighbor 0, so it will be ignored by `!neighbor.equals(parent)`
        // Wait, self-loops need special handling for DFS. `parent` is `null` for root.
        // If 0 -> 0, `current` is 0, `neighbor` is 0. `parent` is null.
        // `!neighbor.equals(parent)` would be `!0.equals(null)`, which is true.
        // So `visited.contains(neighbor)` is true, and it correctly detects the self-loop as a cycle.
    }

    @Test
    void testDetectCycleDFS_Undirected_EmptyGraph() {
        Graph<Integer> graph = new Graph<>(false);
        assertFalse(cycleDetection.detectCycleDFS(graph));
    }

    @Test
    void testDetectCycleDFS_Undirected_SingleVertexGraph() {
        Graph<Integer> graph = new Graph<>(false);
        graph.addVertex(0);
        assertFalse(cycleDetection.detectCycleDFS(graph));
    }

    @Test
    void testDetectCycleDFS_Undirected_DirectedGraphThrowsException() {
        Graph<Integer> directedGraph = new Graph<>(true);
        directedGraph.addEdge(0, 1);
        assertThrows(IllegalArgumentException.class, () -> cycleDetection.detectCycleDFS(directedGraph));
    }

    // --- DSU Cycle Detection Tests (Undirected) ---

    @Test
    void testDetectCycleDSU_Undirected_NoCyclePathGraph() {
        Graph<Integer> graph = GraphGenerator.generatePathGraph(5, false); // 0-1-2-3-4
        assertFalse(cycleDetection.detectCycleDSU(graph));
    }

    @Test
    void testDetectCycleDSU_Undirected_SimpleCycleGraph() {
        Graph<Integer> graph = GraphGenerator.generateCycleGraph(4, false); // 0-1-2-3-0
        assertTrue(cycleDetection.detectCycleDSU(graph));
    }

    @Test
    void testDetectCycleDSU_Undirected_GraphWithMultipleCycles() {
        Graph<Integer> graph = new Graph<>(false);
        graph.addEdge(0, 1);
        graph.addEdge(1, 2);
        graph.addEdge(2, 0); // Cycle 0-1-2
        graph.addEdge(2, 3);
        graph.addEdge(3, 4);
        graph.addEdge(4, 2); // Cycle 2-3-4
        assertTrue(cycleDetection.detectCycleDSU(graph));
    }

    @Test
    void testDetectCycleDSU_Undirected_DisconnectedGraphWithCycle() {
        Graph<Integer> graph = new Graph<>(false);
        graph.addEdge(0, 1);
        graph.addEdge(1, 2);
        graph.addEdge(2, 0); // Component 1: 0-1-2 (cycle)

        graph.addEdge(3, 4); // Component 2: 3-4 (no cycle)
        assertTrue(cycleDetection.detectCycleDSU(graph));
    }

    @Test
    void testDetectCycleDSU_Undirected_DisconnectedGraphNoCycle() {
        Graph<Integer> graph = new Graph<>(false);
        graph.addEdge(0, 1);
        graph.addEdge(2, 3);
        graph.addEdge(3, 4);
        assertFalse(cycleDetection.detectCycleDSU(graph));
    }

    @Test
    void testDetectCycleDSU_Undirected_SelfLoop() {
        Graph<Integer> graph = new Graph<>(false);
        graph.addEdge(0, 0); // Self-loop (0,0) - DSU should detect as cycle
        assertTrue(cycleDetection.detectCycleDSU(graph));
    }

    @Test
    void testDetectCycleDSU_Undirected_EmptyGraph() {
        Graph<Integer> graph = new Graph<>(false);
        assertFalse(cycleDetection.detectCycleDSU(graph));
    }

    @Test
    void testDetectCycleDSU_Undirected_SingleVertexGraph() {
        Graph<Integer> graph = new Graph<>(false);
        graph.addVertex(0);
        assertFalse(cycleDetection.detectCycleDSU(graph));
    }

    @Test
    void testDetectCycleDSU_Undirected_DirectedGraphThrowsException() {
        Graph<Integer> directedGraph = new Graph<>(true);
        directedGraph.addEdge(0, 1);
        assertThrows(IllegalArgumentException.class, () -> cycleDetection.detectCycleDSU(directedGraph));
    }
}
```