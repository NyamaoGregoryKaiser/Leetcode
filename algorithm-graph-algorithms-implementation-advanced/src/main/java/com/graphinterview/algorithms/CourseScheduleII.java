```java
package com.graphinterview.algorithms;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

/**
 * Problem: Course Schedule II
 *
 * There are `n` courses you have to take, labeled from `0` to `n-1`. Some courses may have prerequisites.
 * For example, to take course `0` you have to first take course `1`, which is expressed as a pair `[0,1]`.
 * Given the total number of courses and a list of prerequisite pairs, return the ordering of courses
 * you should take to finish all courses. If it's impossible to finish all courses (due to a cycle),
 * return an empty array.
 *
 * Example:
 * Input: numCourses = 2, prerequisites = [[1,0]]
 * Output: [0,1]
 * Explanation: To take course 1 you have to first take course 0. So the correct course order is [0,1].
 *
 * Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
 * Output: [0,1,2,3] or [0,2,1,3]
 * Explanation: To take course 1 you have to first take course 0,
 * to take course 2 you have to first take course 0,
 * and to take course 3 you have to first take course 1 or 2.
 * So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].
 *
 * Input: numCourses = 1, prerequisites = []
 * Output: [0]
 */
public class CourseScheduleII {

    /**
     * Solution 1: Kahn's Algorithm (BFS-based Topological Sort)
     *
     * Strategy:
     * This algorithm is based on the idea of finding vertices with no incoming edges (in-degree 0),
     * processing them, and then removing them from the graph conceptually. This process is repeated
     * until all vertices are processed.
     *
     * 1. **Build Adjacency List and In-degrees:**
     *    Represent the courses as a directed graph where an edge `u -> v` means `u` is a prerequisite for `v`.
     *    `prerequisites[i] = [course, pre_course]` means `pre_course -> course`.
     *    Calculate the `in-degree` for each course (number of prerequisites it has).
     * 2. **Initialize Queue:** Add all courses with an `in-degree` of 0 to a queue. These are courses
     *    that have no prerequisites and can be taken first.
     * 3. **Process Queue:**
     *    While the queue is not empty:
     *    a. Dequeue a course `u`. Add `u` to the result list (topological order).
     *    b. For each neighbor `v` of `u` (i.e., courses that `u` is a prerequisite for):
     *       i. Decrement `in-degree[v]`.
     *       ii. If `in-degree[v]` becomes 0, it means all prerequisites for `v` are now met.
     *           Enqueue `v`.
     * 4. **Check for Cycle:** If the number of courses in the result list is less than the total
     *    number of courses, it means there was a cycle in the graph, and it's impossible to
     *    finish all courses. Return an empty array. Otherwise, return the result list.
     *
     * Time Complexity: O(V + E)
     *   - V is `numCourses`, E is `prerequisites.length`.
     *   - Building adjacency list and in-degrees: O(V + E).
     *   - BFS traversal: Each vertex is enqueued/dequeued once, and each edge is processed once. O(V + E).
     * Space Complexity: O(V + E)
     *   - Adjacency list: O(V + E).
     *   - In-degree array: O(V).
     *   - Queue: O(V) in worst case (e.g., all courses have 0 in-degree initially).
     *   - Result array: O(V).
     *
     * @param numCourses The total number of courses.
     * @param prerequisites A 2D array where `prerequisites[i] = [course, pre_course]`.
     * @return An array of courses representing a valid topological order, or an empty array if a cycle exists.
     */
    public int[] findOrderKahn(int numCourses, int[][] prerequisites) {
        // 1. Build Adjacency List (graph) and In-degree array
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) {
            adj.add(new ArrayList<>());
        }

        int[] inDegree = new int[numCourses];
        for (int[] prerequisite : prerequisites) {
            int course = prerequisite[0];
            int preCourse = prerequisite[1];
            adj.get(preCourse).add(course); // preCourse -> course
            inDegree[course]++;
        }

        // 2. Initialize Queue with courses having 0 in-degree
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) {
                queue.offer(i);
            }
        }

        // 3. Process Queue
        List<Integer> result = new ArrayList<>();
        while (!queue.isEmpty()) {
            int u = queue.poll();
            result.add(u);

            for (int v : adj.get(u)) {
                inDegree[v]--; // Decrement in-degree of neighbors
                if (inDegree[v] == 0) {
                    queue.offer(v); // If neighbor's in-degree becomes 0, add to queue
                }
            }
        }

        // 4. Check for Cycle
        if (result.size() == numCourses) {
            return result.stream().mapToInt(i -> i).toArray();
        } else {
            return new int[0]; // Cycle detected, impossible to finish all courses
        }
    }

    /**
     * Solution 2: DFS-based Topological Sort
     *
     * Strategy:
     * This method uses recursion (DFS) to traverse the graph. A topological sort can be
     * obtained by performing a DFS and adding vertices to a list/stack *after* all their
     * descendants have been visited. It also includes explicit cycle detection.
     *
     * 1. **Build Adjacency List:** Same as Kahn's algorithm.
     * 2. **State Tracking:** Use a `visited` array with three states:
     *    * `0`: Unvisited
     *    * `1`: Visiting (currently in recursion stack)
     *    * `2`: Visited (finished processing, added to topological order)
     * 3. **DFS Traversal:**
     *    Iterate through all courses. For each unvisited course, perform a DFS:
     *    a. Mark current course `u` as `visiting` (`state = 1`).
     *    b. For each neighbor `v` of `u`:
     *       i. If `v` is `visiting` (`state = 1`), a cycle is detected. Return `false` (cannot sort).
     *       ii. If `v` is `unvisited` (`state = 0`), recursively call DFS on `v`. If this call returns `false`, propagate `false`.
     *    c. After visiting all neighbors, mark `u` as `visited` (`state = 2`) and add `u` to the *front* of the result list (or push to a stack and reverse later).
     * 4. **Result:** If DFS completes without cycle detection, the result list contains the topological order.
     *
     * Time Complexity: O(V + E)
     *   - Building adjacency list: O(V + E).
     *   - DFS traversal: Each vertex and edge is visited at most once. O(V + E).
     * Space Complexity: O(V + E)
     *   - Adjacency list: O(V + E).
     *   - `visited` array: O(V).
     *   - Recursion stack: O(V) in worst case (linear graph).
     *   - Result list: O(V).
     *
     * @param numCourses The total number of courses.
     * @param prerequisites A 2D array where `prerequisites[i] = [course, pre_course]`.
     * @return An array of courses representing a valid topological order, or an empty array if a cycle exists.
     */
    public int[] findOrderDFS(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) {
            adj.add(new ArrayList<>());
        }

        for (int[] prerequisite : prerequisites) {
            int course = prerequisite[0];
            int preCourse = prerequisite[1];
            adj.get(preCourse).add(course); // preCourse -> course
        }

        // 0: unvisited, 1: visiting (in current DFS path), 2: visited (processed)
        int[] visited = new int[numCourses];
        List<Integer> result = new ArrayList<>(); // Store topological order in reverse

        // Iterate through all courses to ensure disconnected components are also processed
        for (int i = 0; i < numCourses; i++) {
            if (visited[i] == 0) { // If unvisited
                if (!dfs(i, adj, visited, result)) {
                    return new int[0]; // Cycle detected
                }
            }
        }

        // The DFS adds courses to `result` in reverse topological order.
        // Reverse the list to get the correct order.
        int[] finalOrder = new int[numCourses];
        for (int i = 0; i < numCourses; i++) {
            finalOrder[i] = result.get(numCourses - 1 - i);
        }
        return finalOrder;
    }

    /**
     * Recursive DFS helper for topological sort.
     *
     * @param u         Current course vertex.
     * @param adj       Adjacency list.
     * @param visited   Array to track visited states (0=unvisited, 1=visiting, 2=visited).
     * @param result    List to build the topological order (in reverse initially).
     * @return True if no cycle detected, false if a cycle is found.
     */
    private boolean dfs(int u, List<List<Integer>> adj, int[] visited, List<Integer> result) {
        visited[u] = 1; // Mark as visiting

        for (int v : adj.get(u)) {
            if (visited[v] == 1) {
                return false; // Cycle detected (back edge to a node currently in recursion stack)
            }
            if (visited[v] == 0) { // If unvisited
                if (!dfs(v, adj, visited, result)) {
                    return false; // Propagate cycle detection
                }
            }
            // If visited[v] == 2, it means 'v' has already been processed and added to result.
            // No need to revisit or check for cycle.
        }

        visited[u] = 2; // Mark as fully visited
        result.add(u); // Add to result list AFTER all descendants are processed
        return true;
    }

    public static void main(String[] args) {
        CourseScheduleII solver = new CourseScheduleII();

        // Example 1: Basic
        int numCourses1 = 2;
        int[][] prerequisites1 = {{1, 0}};
        System.out.println("Kahn's Example 1: " + Arrays.toString(solver.findOrderKahn(numCourses1, prerequisites1))); // Expected: [0, 1]
        System.out.println("DFS Example 1: " + Arrays.toString(solver.findOrderDFS(numCourses1, prerequisites1)));   // Expected: [0, 1]

        // Example 2: Multiple valid orders
        int numCourses2 = 4;
        int[][] prerequisites2 = {{1, 0}, {2, 0}, {3, 1}, {3, 2}};
        System.out.println("Kahn's Example 2: " + Arrays.toString(solver.findOrderKahn(numCourses2, prerequisites2))); // Expected: [0, 1, 2, 3] or [0, 2, 1, 3]
        System.out.println("DFS Example 2: " + Arrays.toString(solver.findOrderDFS(numCourses2, prerequisites2)));   // Expected: [0, 2, 1, 3] (order can differ)

        // Example 3: No prerequisites
        int numCourses3 = 1;
        int[][] prerequisites3 = {};
        System.out.println("Kahn's Example 3: " + Arrays.toString(solver.findOrderKahn(numCourses3, prerequisites3))); // Expected: [0]
        System.out.println("DFS Example 3: " + Arrays.toString(solver.findOrderDFS(numCourses3, prerequisites3)));   // Expected: [0]

        // Example 4: Cycle detected
        int numCourses4 = 2;
        int[][] prerequisites4 = {{1, 0}, {0, 1}}; // 0 -> 1 -> 0 (cycle)
        System.out.println("Kahn's Example 4 (Cycle): " + Arrays.toString(solver.findOrderKahn(numCourses4, prerequisites4))); // Expected: []
        System.out.println("DFS Example 4 (Cycle): " + Arrays.toString(solver.findOrderDFS(numCourses4, prerequisites4)));   // Expected: []

        // Example 5: Disconnected components
        int numCourses5 = 5;
        int[][] prerequisites5 = {{1, 0}, {3, 2}}; // 0->1, 2->3, 4 is independent
        // Expected: [0, 2, 4, 1, 3] or [4, 0, 2, 1, 3] etc.
        System.out.println("Kahn's Example 5 (Disconnected): " + Arrays.toString(solver.findOrderKahn(numCourses5, prerequisites5)));
        System.out.println("DFS Example 5 (Disconnected): " + Arrays.toString(solver.findOrderDFS(numCourses5, prerequisites5)));

        // Example 6: More complex graph with unique order
        int numCourses6 = 6;
        int[][] prerequisites6 = {{1,0}, {2,1}, {3,2}, {4,3}, {5,4}}; // Linear chain: 0->1->2->3->4->5
        System.out.println("Kahn's Example 6 (Linear): " + Arrays.toString(solver.findOrderKahn(numCourses6, prerequisites6))); // Expected: [0,1,2,3,4,5]
        System.out.println("DFS Example 6 (Linear): " + Arrays.toString(solver.findOrderDFS(numCourses6, prerequisites6)));   // Expected: [0,1,2,3,4,5]
    }
}
```