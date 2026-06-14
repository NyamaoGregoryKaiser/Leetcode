```java
package com.example.graph.algorithms;

import com.example.graph.datastructures.Graph;
import com.example.graph.util.GraphGenerator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.HashSet;

import static org.junit.jupiter.api.Assertions.*;

class CourseScheduleTest {

    private CourseSchedule<Integer> courseSchedule;

    @BeforeEach
    void setUp() {
        courseSchedule = new CourseSchedule<>();
    }

    // Helper to check if a given order is a valid topological sort
    private boolean isValidTopologicalOrder(Graph<Integer> graph, List<Integer> order) {
        if (order.isEmpty() && !graph.getVertices().isEmpty()) { // An empty list means cycle detected
            return false;
        }
        if (order.size() != graph.getVertices().size()) {
            return false; // Not all courses included (implies cycle or incomplete graph)
        }

        // Keep track of courses taken
        Set<Integer> takenCourses = new HashSet<>();
        for (Integer course : order) {
            // Check if all prerequisites for 'course' have been taken
            for (Integer prerequisite : graph.getVertices()) { // Iterate through all potential prerequisites
                if (graph.getNeighbors(prerequisite).contains(course)) { // If 'prerequisite' is a prerequisite for 'course'
                    if (!takenCourses.contains(prerequisite)) {
                        return false; // Prerequisite not taken yet
                    }
                }
            }
            takenCourses.add(course);
        }
        return true;
    }


    // --- Kahn's Algorithm Tests ---

    @Test
    void testFindOrderKahn_BasicValidOrder() {
        Graph<Integer> graph = new Graph<>(true);
        graph.addEdge(1, 0); // To take course 0, you have to first take course 1
        graph.addEdge(2, 0); // To take course 0, you have to first take course 2
        graph.addEdge(3, 1); // To take course 1, you have to first take course 3
        graph.addEdge(3, 2); // To take course 2, you have to first take course 3

        List<Integer> order = courseSchedule.findOrderKahn(graph);
        assertFalse(order.isEmpty()); // Should find an order
        assertTrue(isValidTopologicalOrder(graph, order));
        System.out.println("Kahn's Order 1: " + order);
        // Possible orders: [3, 1, 2, 0] or [3, 2, 1, 0]
    }

    @Test
    void testFindOrderKahn_GraphWithCycle() {
        Graph<Integer> graph = new Graph<>(true);
        graph.addEdge(0, 1);
        graph.addEdge(1, 2);
        graph.addEdge(2, 0); // Cycle: 0 -> 1 -> 2 -> 0

        List<Integer> order = courseSchedule.findOrderKahn(graph);
        assertTrue(order.isEmpty()); // Should detect a cycle
    }

    @Test
    void testFindOrderKahn_NoPrerequisites() {
        Graph<Integer> graph = new Graph<>(true);
        graph.addVertex(0);
        graph.addVertex(1);
        graph.addVertex(2);

        List<Integer> order = courseSchedule.findOrderKahn(graph);
        assertFalse(order.isEmpty());
        assertTrue(order.containsAll(Arrays.asList(0, 1, 2))); // Any permutation is fine
        assertTrue(isValidTopologicalOrder(graph, order));
    }

    @Test
    void testFindOrderKahn_DisconnectedDAG() {
        Graph<Integer> graph = new Graph<>(true);
        graph.addEdge(0, 1); // Component 1: 0 -> 1
        graph.addEdge(2, 3); // Component 2: 2 -> 3

        List<Integer> order = courseSchedule.findOrderKahn(graph);
        assertFalse(order.isEmpty());
        assertTrue(isValidTopologicalOrder(graph, order));
        System.out.println("Kahn's Order Disconnected: " + order);
        // Possible: [0, 2, 1, 3] or [2, 0, 3, 1] etc.
    }

    @Test
    void testFindOrderKahn_EmptyGraph() {
        Graph<Integer> graph = new Graph<>(true);
        List<Integer> order = courseSchedule.findOrderKahn(graph);
        assertTrue(order.isEmpty()); // No courses, so empty order is valid
        assertTrue(isValidTopologicalOrder(graph, order)); // True for empty graph/order
    }

    @Test
    void testFindOrderKahn_SingleCourse() {
        Graph<Integer> graph = new Graph<>(true);
        graph.addVertex(0);
        List<Integer> order = courseSchedule.findOrderKahn(graph);
        assertEquals(Collections.singletonList(0), order);
        assertTrue(isValidTopologicalOrder(graph, order));
    }

    @Test
    void testFindOrderKahn_UndirectedGraphThrowsException() {
        Graph<Integer> undirectedGraph = new Graph<>(false);
        undirectedGraph.addEdge(0, 1);
        assertThrows(IllegalArgumentException.class, () -> courseSchedule.findOrderKahn(undirectedGraph));
    }

    @Test
    void testFindOrderKahn_ComplexDAG() {
        Graph<Integer> graph = new Graph<>(true);
        graph.addEdge(0, 1);
        graph.addEdge(0, 2);
        graph.addEdge(1, 3);
        graph.addEdge(2, 3);
        graph.addEdge(3, 4);
        graph.addEdge(5, 6);
        graph.addEdge(4, 6);

        List<Integer> order = courseSchedule.findOrderKahn(graph);
        assertFalse(order.isEmpty());
        assertTrue(isValidTopologicalOrder(graph, order));
        System.out.println("Kahn's Order Complex: " + order);
        // Ex: [0, 5, 1, 2, 3, 4, 6] or [5, 0, 1, 2, 3, 4, 6]
    }


    // --- DFS Algorithm Tests ---

    @Test
    void testFindOrderDFS_BasicValidOrder() {
        Graph<Integer> graph = new Graph<>(true);
        graph.addEdge(1, 0); // To take course 0, you have to first take course 1
        graph.addEdge(2, 0); // To take course 0, you have to first take course 2
        graph.addEdge(3, 1); // To take course 1, you have to first take course 3
        graph.addEdge(3, 2); // To take course 2, you have to first take course 3

        List<Integer> order = courseSchedule.findOrderDFS(graph);
        assertFalse(order.isEmpty());
        assertTrue(isValidTopologicalOrder(graph, order));
        System.out.println("DFS Order 1: " + order);
        // Possible orders: [3, 1, 2, 0] or [3, 2, 1, 0]
    }

    @Test
    void testFindOrderDFS_GraphWithCycle() {
        Graph<Integer> graph = new Graph<>(true);
        graph.addEdge(0, 1);
        graph.addEdge(1, 2);
        graph.addEdge(2, 0); // Cycle: 0 -> 1 -> 2 -> 0

        List<Integer> order = courseSchedule.findOrderDFS(graph);
        assertTrue(order.isEmpty());
    }

    @Test
    void testFindOrderDFS_NoPrerequisites() {
        Graph<Integer> graph = new Graph<>(true);
        graph.addVertex(0);
        graph.addVertex(1);
        graph.addVertex(2);

        List<Integer> order = courseSchedule.findOrderDFS(graph);
        assertFalse(order.isEmpty());
        assertTrue(order.containsAll(Arrays.asList(0, 1, 2)));
        assertTrue(isValidTopologicalOrder(graph, order));
    }

    @Test
    void testFindOrderDFS_DisconnectedDAG() {
        Graph<Integer> graph = new Graph<>(true);
        graph.addEdge(0, 1); // Component 1: 0 -> 1
        graph.addEdge(2, 3); // Component 2: 2 -> 3

        List<Integer> order = courseSchedule.findOrderDFS(graph);
        assertFalse(order.isEmpty());
        assertTrue(isValidTopologicalOrder(graph, order));
        System.out.println("DFS Order Disconnected: " + order);
    }

    @Test
    void testFindOrderDFS_EmptyGraph() {
        Graph<Integer> graph = new Graph<>(true);
        List<Integer> order = courseSchedule.findOrderDFS(graph);
        assertTrue(order.isEmpty());
        assertTrue(isValidTopologicalOrder(graph, order));
    }

    @Test
    void testFindOrderDFS_SingleCourse() {
        Graph<Integer> graph = new Graph<>(true);
        graph.addVertex(0);
        List<Integer> order = courseSchedule.findOrderDFS(graph);
        assertEquals(Collections.singletonList(0), order);
        assertTrue(isValidTopologicalOrder(graph, order));
    }

    @Test
    void testFindOrderDFS_UndirectedGraphThrowsException() {
        Graph<Integer> undirectedGraph = new Graph<>(false);
        undirectedGraph.addEdge(0, 1);
        assertThrows(IllegalArgumentException.class, () -> courseSchedule.findOrderDFS(undirectedGraph));
    }

    @Test
    void testFindOrderDFS_ComplexDAG() {
        Graph<Integer> graph = new Graph<>(true);
        graph.addEdge(0, 1);
        graph.addEdge(0, 2);
        graph.addEdge(1, 3);
        graph.addEdge(2, 3);
        graph.addEdge(3, 4);
        graph.addEdge(5, 6);
        graph.addEdge(4, 6);

        List<Integer> order = courseSchedule.findOrderDFS(graph);
        assertFalse(order.isEmpty());
        assertTrue(isValidTopologicalOrder(graph, order));
        System.out.println("DFS Order Complex: " + order);
    }

    @Test
    void testFindOrder_LargeDAG() {
        int numCourses = 100;
        double edgeDensity = 0.1; // Sparse DAG
        Graph<Integer> graph = GraphGenerator.generateRandomDAG(numCourses, edgeDensity, 0);

        List<Integer> kahnOrder = courseSchedule.findOrderKahn(graph);
        assertFalse(kahnOrder.isEmpty()); // Should always find an order for a DAG
        assertTrue(isValidTopologicalOrder(graph, kahnOrder));
        System.out.println("Kahn's Order Large: First 10 courses: " + kahnOrder.subList(0, Math.min(10, kahnOrder.size())));

        List<Integer> dfsOrder = courseSchedule.findOrderDFS(graph);
        assertFalse(dfsOrder.isEmpty()); // Should always find an order for a DAG
        assertTrue(isValidTopologicalOrder(graph, dfsOrder));
        System.out.println("DFS Order Large: First 10 courses: " + dfsOrder.subList(0, Math.min(10, dfsOrder.size())));

        assertEquals(numCourses, kahnOrder.size());
        assertEquals(numCourses, dfsOrder.size());
    }

    @Test
    void testFindOrder_LargeGraphWithCycle() {
        int numCourses = 100;
        Graph<Integer> graph = GraphGenerator.generateRandomGraph(numCourses, 0.05, true, 0);
        // Ensure there's at least one cycle for this test to be meaningful
        if (numCourses >= 3) {
            graph.addEdge(0, 1);
            graph.addEdge(1, 2);
            graph.addEdge(2, 0); // Introduce a cycle
        }


        List<Integer> kahnOrder = courseSchedule.findOrderKahn(graph);
        List<Integer> dfsOrder = courseSchedule.findOrderDFS(graph);

        // If a cycle is present, both should return an empty list or a list shorter than numCourses
        // Due to randomness, graph might be a DAG even with random edges if no specific cycle is added.
        // Adding a guaranteed cycle:
        if (numCourses >= 3) {
            assertFalse(isValidTopologicalOrder(graph, kahnOrder));
            assertTrue(kahnOrder.isEmpty()); // If it's empty, it means cycle was detected.

            assertFalse(isValidTopologicalOrder(graph, dfsOrder));
            assertTrue(dfsOrder.isEmpty()); // If it's empty, it means cycle was detected.
        }
    }
}
```