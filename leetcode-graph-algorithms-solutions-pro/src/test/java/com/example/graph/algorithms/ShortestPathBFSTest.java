```java
package com.example.graph.algorithms;

import com.example.graph.datastructures.Graph;
import com.example.graph.util.GraphGenerator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ShortestPathBFSTest {

    private ShortestPathBFS<Integer> shortestPathBFS;

    @BeforeEach
    void setUp() {
        shortestPathBFS = new ShortestPathBFS<>();
    }

    @Test
    void testFindShortestPath_SimpleUndirectedGraph() {
        Graph<Integer> graph = new Graph<>(false); // Undirected
        graph.addEdge(0, 1);
        graph.addEdge(0, 2);
        graph.addEdge(1, 3);
        graph.addEdge(2, 3);
        graph.addEdge(3, 4);

        // Path 0 -> 1 -> 3 -> 4
        List<Integer> path = shortestPathBFS.findShortestPath(graph, 0, 4);
        assertNotNull(path);
        assertEquals(Arrays.asList(0, 1, 3, 4), path);
        assertEquals(3, shortestPathBFS.findShortestDistance(graph, 0, 4));

        // Path 0 -> 2 -> 3 -> 4 (also valid shortest path)
        graph = new Graph<>(false);
        graph.addEdge(0, 1);
        graph.addEdge(0, 2);
        graph.addEdge(1, 3);
        graph.addEdge(2, 3);
        graph.addEdge(3, 4);
        // BFS explores 0->1 then 0->2. Path via 1 might be found first depending on adjacency list iteration order.
        // Both (0,1,3,4) and (0,2,3,4) are valid.
        List<Integer> path1 = Arrays.asList(0, 1, 3, 4);
        List<Integer> path2 = Arrays.asList(0, 2, 3, 4);
        List<Integer> actualPath = shortestPathBFS.findShortestPath(graph, 0, 4);
        assertTrue(path1.equals(actualPath) || path2.equals(actualPath));
        assertEquals(3, shortestPathBFS.findShortestDistance(graph, 0, 4));
    }

    @Test
    void testFindShortestPath_SimpleDirectedGraph() {
        Graph<Integer> graph = new Graph<>(true); // Directed
        graph.addEdge(0, 1);
        graph.addEdge(1, 2);
        graph.addEdge(0, 3);
        graph.addEdge(3, 2);

        List<Integer> path = shortestPathBFS.findShortestPath(graph, 0, 2);
        assertNotNull(path);
        // Both 0->1->2 and 0->3->2 are length 2. BFS might pick one.
        List<Integer> expectedPath1 = Arrays.asList(0, 1, 2);
        List<Integer> expectedPath2 = Arrays.asList(0, 3, 2);
        assertTrue(expectedPath1.equals(path) || expectedPath2.equals(path));
        assertEquals(2, shortestPathBFS.findShortestDistance(graph, 0, 2));

        // No path from 2 to 0
        assertEquals(Collections.emptyList(), shortestPathBFS.findShortestPath(graph, 2, 0));
        assertEquals(-1, shortestPathBFS.findShortestDistance(graph, 2, 0));
    }

    @Test
    void testFindShortestPath_DisconnectedGraph() {
        Graph<Integer> graph = new Graph<>(false);
        graph.addEdge(0, 1);
        graph.addEdge(2, 3); // Disconnected component

        assertEquals(Collections.emptyList(), shortestPathBFS.findShortestPath(graph, 0, 2));
        assertEquals(-1, shortestPathBFS.findShortestDistance(graph, 0, 2));
    }

    @Test
    void testFindShortestPath_SameStartAndEnd() {
        Graph<Integer> graph = new Graph<>(false);
        graph.addEdge(0, 1);
        graph.addEdge(1, 2);

        assertEquals(Collections.singletonList(0), shortestPathBFS.findShortestPath(graph, 0, 0));
        assertEquals(0, shortestPathBFS.findShortestDistance(graph, 0, 0));
    }

    @Test
    void testFindShortestPath_SingleVertexGraph() {
        Graph<Integer> graph = new Graph<>(false);
        graph.addVertex(0);

        assertEquals(Collections.singletonList(0), shortestPathBFS.findShortestPath(graph, 0, 0));
        assertEquals(0, shortestPathBFS.findShortestDistance(graph, 0, 0));
    }

    @Test
    void testFindShortestPath_EmptyGraph() {
        Graph<Integer> graph = new Graph<>(false);

        assertNull(shortestPathBFS.findShortestPath(graph, 0, 1)); // Vertices not in graph
        assertEquals(-1, shortestPathBFS.findShortestDistance(graph, 0, 1));
    }

    @Test
    void testFindShortestPath_StartOrEndNotInGraph() {
        Graph<Integer> graph = new Graph<>(false);
        graph.addVertex(0);
        graph.addVertex(1);

        assertNull(shortestPathBFS.findShortestPath(graph, 0, 99)); // End not in graph
        assertEquals(-1, shortestPathBFS.findShortestDistance(graph, 0, 99));

        assertNull(shortestPathBFS.findShortestPath(graph, 99, 0)); // Start not in graph
        assertEquals(-1, shortestPathBFS.findShortestDistance(graph, 99, 0));
    }

    @Test
    void testFindShortestPath_LongerPath() {
        Graph<Integer> graph = new Graph<>(false);
        graph.addEdge(0, 1);
        graph.addEdge(1, 2);
        graph.addEdge(2, 3);
        graph.addEdge(3, 4);
        graph.addEdge(4, 5);
        graph.addEdge(5, 6);

        List<Integer> path = shortestPathBFS.findShortestPath(graph, 0, 6);
        assertNotNull(path);
        assertEquals(Arrays.asList(0, 1, 2, 3, 4, 5, 6), path);
        assertEquals(6, shortestPathBFS.findShortestDistance(graph, 0, 6));
    }

    @Test
    void testFindShortestPath_GraphWithCycles() {
        Graph<Integer> graph = new Graph<>(false);
        graph.addEdge(0, 1);
        graph.addEdge(1, 2);
        graph.addEdge(2, 0); // Cycle: 0-1-2-0
        graph.addEdge(2, 3);
        graph.addEdge(3, 4);

        // Shortest path shouldn't be affected by cycles as BFS finds minimum edges first
        List<Integer> path = shortestPathBFS.findShortestPath(graph, 0, 4);
        assertNotNull(path);
        assertEquals(Arrays.asList(0, 1, 2, 3, 4), path); // 0->1->2->3->4
        assertEquals(4, shortestPathBFS.findShortestDistance(graph, 0, 4));
    }

    @Test
    void testFindShortestPath_ComplexDirectedGraph() {
        Graph<Integer> graph = new Graph<>(true);
        graph.addEdge(1, 2);
        graph.addEdge(1, 3);
        graph.addEdge(2, 4);
        graph.addEdge(3, 4);
        graph.addEdge(4, 5);
        graph.addEdge(0, 1); // Add a source

        List<Integer> path = shortestPathBFS.findShortestPath(graph, 0, 5);
        assertNotNull(path);
        // Possible paths: 0->1->2->4->5 (4 edges) or 0->1->3->4->5 (4 edges)
        List<Integer> expectedPath1 = Arrays.asList(0, 1, 2, 4, 5);
        List<Integer> expectedPath2 = Arrays.asList(0, 1, 3, 4, 5);
        assertTrue(expectedPath1.equals(path) || expectedPath2.equals(path));
        assertEquals(4, shortestPathBFS.findShortestDistance(graph, 0, 5));
    }

    @Test
    void testFindShortestPath_LargeGraphGenerated() {
        int numVertices = 100;
        double edgeDensity = 0.05; // Sparse graph
        Graph<Integer> graph = GraphGenerator.generateRandomGraph(numVertices, edgeDensity, false, 0);

        // Test path from 0 to last vertex (if connected)
        List<Integer> path = shortestPathBFS.findShortestPath(graph, 0, numVertices - 1);
        int distance = shortestPathBFS.findShortestDistance(graph, 0, numVertices - 1);

        if (!path.isEmpty()) {
            System.out.println("Path in large graph: " + path);
            System.out.println("Distance: " + distance);
            assertEquals(distance, path.size() - 1);
            assertEquals(0, path.get(0));
            assertEquals(numVertices - 1, path.get(path.size() - 1));
        } else {
            System.out.println("No path found from 0 to " + (numVertices - 1) + " in large graph.");
            assertEquals(-1, distance);
        }
        // This test mostly ensures it doesn't crash and path length matches distance.
        // Due to randomness, asserting specific paths is not feasible.
    }
}
```