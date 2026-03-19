```java
package com.graphinterview.tests;

import com.graphinterview.algorithms.CourseScheduleII;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Test class for CourseScheduleII algorithm.
 * Since topological sort can have multiple valid orders, tests need to verify
 * correctness of order (prerequisites met) rather than exact array equality for all cases.
 */
public class CourseScheduleIITest {

    private CourseScheduleII solver;

    @BeforeEach
    void setUp() {
        solver = new CourseScheduleII();
    }

    // Helper to verify a topological order:
    // 1. All unique courses are present.
    // 2. All prerequisites are satisfied.
    private boolean isValidTopologicalOrder(int numCourses, int[][] prerequisites, int[] order) {
        if (order.length != numCourses) {
            return false; // Not all courses are taken, or cycle detected
        }

        // Track completed courses
        Set<Integer> completed = new HashSet<>();
        for (int course : order) {
            completed.add(course);
        }
        if (completed.size() != numCourses) {
            return false; // Duplicate courses in order, or missing
        }

        // Verify prerequisites
        Set<Integer> taken = new HashSet<>();
        for (int course : order) {
            for (int[] prereq : prerequisites) {
                if (prereq[0] == course) { // Current course 'course' requires 'prereq[1]'
                    if (!taken.contains(prereq[1])) {
                        return false; // Prerequisite not taken before the course
                    }
                }
            }
            taken.add(course);
        }
        return true;
    }

    // --- Kahn's Algorithm Tests (BFS-based) ---

    @Test
    @DisplayName("Kahn's: Example 1 - Basic prerequisite")
    void testFindOrderKahn_Example1() {
        int numCourses = 2;
        int[][] prerequisites = {{1, 0}};
        int[] result = solver.findOrderKahn(numCourses, prerequisites);
        assertTrue(isValidTopologicalOrder(numCourses, prerequisites, result), "Order: " + Arrays.toString(result));
        assertArrayEquals(new int[]{0, 1}, result); // For this simple case, order is unique
    }

    @Test
    @DisplayName("Kahn's: Example 2 - Multiple valid orders")
    void testFindOrderKahn_Example2() {
        int numCourses = 4;
        int[][] prerequisites = {{1, 0}, {2, 0}, {3, 1}, {3, 2}};
        int[] result = solver.findOrderKahn(numCourses, prerequisites);
        assertTrue(isValidTopologicalOrder(numCourses, prerequisites, result), "Order: " + Arrays.toString(result));
        // Possible valid orders: [0, 1, 2, 3] or [0, 2, 1, 3]
        // Kahn's exact output depends on queue order, which depends on adjacency list order.
        // So just check if it's valid.
    }

    @Test
    @DisplayName("Kahn's: Example 3 - No prerequisites")
    void testFindOrderKahn_Example3() {
        int numCourses = 1;
        int[][] prerequisites = {};
        int[] result = solver.findOrderKahn(numCourses, prerequisites);
        assertTrue(isValidTopologicalOrder(numCourses, prerequisites, result), "Order: " + Arrays.toString(result));
        assertArrayEquals(new int[]{0}, result);
    }

    @Test
    @DisplayName("Kahn's: Example 4 - Cycle detected")
    void testFindOrderKahn_Cycle() {
        int numCourses = 2;
        int[][] prerequisites = {{1, 0}, {0, 1}}; // 0 -> 1 -> 0
        int[] result = solver.findOrderKahn(numCourses, prerequisites);
        assertEquals(0, result.length); // Empty array indicates cycle
    }

    @Test
    @DisplayName("Kahn's: Disconnected components")
    void testFindOrderKahn_Disconnected() {
        int numCourses = 5;
        int[][] prerequisites = {{1, 0}, {3, 2}}; // 0->1, 2->3, 4 is independent
        int[] result = solver.findOrderKahn(numCourses, prerequisites);
        assertTrue(isValidTopologicalOrder(numCourses, prerequisites, result), "Order: " + Arrays.toString(result));
        assertEquals(numCourses, result.length); // All courses should be in the order
    }

    @Test
    @DisplayName("Kahn's: Linear chain")
    void testFindOrderKahn_Linear() {
        int numCourses = 6;
        int[][] prerequisites = {{1, 0}, {2, 1}, {3, 2}, {4, 3}, {5, 4}}; // 0->1->2->3->4->5
        int[] result = solver.findOrderKahn(numCourses, prerequisites);
        assertTrue(isValidTopologicalOrder(numCourses, prerequisites, result), "Order: " + Arrays.toString(result));
        assertArrayEquals(new int[]{0, 1, 2, 3, 4, 5}, result); // Unique order
    }

    @Test
    @DisplayName("Kahn's: Empty prerequisites list, multiple courses")
    void testFindOrderKahn_EmptyPrereqsMultiCourses() {
        int numCourses = 3;
        int[][] prerequisites = {};
        int[] result = solver.findOrderKahn(numCourses, prerequisites);
        assertTrue(isValidTopologicalOrder(numCourses, prerequisites, result), "Order: " + Arrays.toString(result));
        assertEquals(numCourses, result.length);
        // Order could be [0,1,2], [0,2,1], etc. Just check validity.
    }

    // --- DFS-based Algorithm Tests ---

    @Test
    @DisplayName("DFS: Example 1 - Basic prerequisite")
    void testFindOrderDFS_Example1() {
        int numCourses = 2;
        int[][] prerequisites = {{1, 0}};
        int[] result = solver.findOrderDFS(numCourses, prerequisites);
        assertTrue(isValidTopologicalOrder(numCourses, prerequisites, result), "Order: " + Arrays.toString(result));
        assertArrayEquals(new int[]{0, 1}, result);
    }

    @Test
    @DisplayName("DFS: Example 2 - Multiple valid orders")
    void testFindOrderDFS_Example2() {
        int numCourses = 4;
        int[][] prerequisites = {{1, 0}, {2, 0}, {3, 1}, {3, 2}};
        int[] result = solver.findOrderDFS(numCourses, prerequisites);
        assertTrue(isValidTopologicalOrder(numCourses, prerequisites, result), "Order: " + Arrays.toString(result));
        // DFS order might be different from Kahn's but should still be valid.
    }

    @Test
    @DisplayName("DFS: Example 3 - No prerequisites")
    void testFindOrderDFS_Example3() {
        int numCourses = 1;
        int[][] prerequisites = {};
        int[] result = solver.findOrderDFS(numCourses, prerequisites);
        assertTrue(isValidTopologicalOrder(numCourses, prerequisites, result), "Order: " + Arrays.toString(result));
        assertArrayEquals(new int[]{0}, result);
    }

    @Test
    @DisplayName("DFS: Example 4 - Cycle detected")
    void testFindOrderDFS_Cycle() {
        int numCourses = 2;
        int[][] prerequisites = {{1, 0}, {0, 1}}; // 0 -> 1 -> 0
        int[] result = solver.findOrderDFS(numCourses, prerequisites);
        assertEquals(0, result.length); // Empty array indicates cycle
    }

    @Test
    @DisplayName("DFS: Disconnected components")
    void testFindOrderDFS_Disconnected() {
        int numCourses = 5;
        int[][] prerequisites = {{1, 0}, {3, 2}}; // 0->1, 2->3, 4 is independent
        int[] result = solver.findOrderDFS(numCourses, prerequisites);
        assertTrue(isValidTopologicalOrder(numCourses, prerequisites, result), "Order: " + Arrays.toString(result));
        assertEquals(numCourses, result.length);
    }

    @Test
    @DisplayName("DFS: Linear chain")
    void testFindOrderDFS_Linear() {
        int numCourses = 6;
        int[][] prerequisites = {{1, 0}, {2, 1}, {3, 2}, {4, 3}, {5, 4}}; // 0->1->2->3->4->5
        int[] result = solver.findOrderDFS(numCourses, prerequisites);
        assertTrue(isValidTopologicalOrder(numCourses, prerequisites, result), "Order: " + Arrays.toString(result));
        assertArrayEquals(new int[]{0, 1, 2, 3, 4, 5}, result);
    }

    @Test
    @DisplayName("DFS: Empty prerequisites list, multiple courses")
    void testFindOrderDFS_EmptyPrereqsMultiCourses() {
        int numCourses = 3;
        int[][] prerequisites = {};
        int[] result = solver.findOrderDFS(numCourses, prerequisites);
        assertTrue(isValidTopologicalOrder(numCourses, prerequisites, result), "Order: " + Arrays.toString(result));
        assertEquals(numCourses, result.length);
    }

    @Test
    @DisplayName("DFS: Complex cycle involving multiple nodes")
    void testFindOrderDFS_ComplexCycle() {
        int numCourses = 5;
        int[][] prerequisites = {{1,0}, {2,1}, {3,2}, {4,3}, {1,4}}; // 0->1->2->3->4->1 (cycle)
        int[] result = solver.findOrderDFS(numCourses, prerequisites);
        assertEquals(0, result.length);
    }

    @Test
    @DisplayName("Kahn's: Complex cycle involving multiple nodes")
    void testFindOrderKahn_ComplexCycle() {
        int numCourses = 5;
        int[][] prerequisites = {{1,0}, {2,1}, {3,2}, {4,3}, {1,4}}; // 0->1->2->3->4->1 (cycle)
        int[] result = solver.findOrderKahn(numCourses, prerequisites);
        assertEquals(0, result.length);
    }
}
```