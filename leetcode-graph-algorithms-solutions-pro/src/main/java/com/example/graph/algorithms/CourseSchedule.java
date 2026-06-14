```java
package com.example.graph.algorithms;

import com.example.graph.datastructures.Graph;

import java.util.*;

/**
 * Solves the Course Schedule problem, which is a classic application of Topological Sort
 * and cycle detection in directed graphs.
 *
 * Problem Statement:
 * Given the total number of courses `numCourses` and a list of `prerequisites` (pairs like [course, prerequisite]),
 * where `prerequisite` must be taken before `course`, determine if it's possible to finish all courses.
 * If possible, return one valid order of courses.
 *
 * This problem essentially asks if a directed graph contains a cycle (Course Schedule I)
 * and if not, to return a topological sort of its vertices (Course Schedule II).
 *
 * Two main approaches are implemented:
 * 1. Kahn's Algorithm (BFS-based topological sort)
 * 2. DFS-based topological sort
 */
public class CourseSchedule<V> {

    /**
     * Solves Course Schedule using Kahn's Algorithm (BFS-based topological sort).
     * This method also implicitly detects cycles. If a valid topological order
     * cannot be formed (i.e., not all vertices are included), a cycle exists.
     *
     * <p>Algorithm:</p>
     * <p>1. Calculate the in-degree for each vertex (number of incoming edges).</p>
     * <p>2. Initialize a queue with all vertices that have an in-degree of 0.</p>
     * <p>3. While the queue is not empty:</p>
     * <p>   a. Dequeue a vertex `u`. Add `u` to the topological order.</p>
     * <p>   b. For each neighbor `v` of `u`:</p>
     * <p>      i. Decrement `v`'s in-degree.</p>
     * <p>      ii. If `v`'s in-degree becomes 0, enqueue `v`.</p>
     * <p>4. If the size of the topological order list equals the total number of vertices,
     *    then a valid order exists (no cycle). Otherwise, a cycle exists.</p>
     *
     * @param graph The directed graph representing courses and prerequisites.
     * @return A list of courses in a valid order, or an empty list if a cycle is detected.
     * @throws IllegalArgumentException if the graph is undirected.
     *
     * Time Complexity: O(V + E) where V is the number of vertices and E is the number of edges.
     *                  Calculating in-degrees takes O(V+E). BFS traversal is O(V+E).
     * Space Complexity: O(V + E) for adjacency list, in-degree map, and queue.
     */
    public List<V> findOrderKahn(Graph<V> graph) {
        if (!graph.isDirected()) {
            throw new IllegalArgumentException("Kahn's Algorithm is for DIRECTED graphs.");
        }

        Map<V, Integer> inDegree = new HashMap<>();
        // Initialize in-degrees for all vertices to 0
        for (V vertex : graph.getVertices()) {
            inDegree.put(vertex, 0);
        }

        // Calculate in-degrees
        for (V vertex : graph.getVertices()) {
            for (V neighbor : graph.getNeighbors(vertex)) {
                inDegree.put(neighbor, inDegree.get(neighbor) + 1);
            }
        }

        Queue<V> queue = new LinkedList<>();
        // Add all vertices with in-degree 0 to the queue
        for (V vertex : graph.getVertices()) {
            if (inDegree.get(vertex) == 0) {
                queue.offer(vertex);
            }
        }

        List<V> topologicalOrder = new ArrayList<>();
        int visitedCount = 0;

        while (!queue.isEmpty()) {
            V current = queue.poll();
            topologicalOrder.add(current);
            visitedCount++;

            // For each neighbor, decrement its in-degree
            for (V neighbor : graph.getNeighbors(current)) {
                inDegree.put(neighbor, inDegree.get(neighbor) - 1);
                // If neighbor's in-degree becomes 0, add it to the queue
                if (inDegree.get(neighbor) == 0) {
                    queue.offer(neighbor);
                }
            }
        }

        // If all vertices were visited, a topological order exists (no cycle)
        if (visitedCount == graph.getVertices().size()) {
            return topologicalOrder;
        } else {
            // A cycle exists, so no valid topological order can be formed
            return Collections.emptyList();
        }
    }

    /**
     * Solves Course Schedule using DFS-based topological sort.
     * This method uses a visited states system to detect cycles during DFS traversal.
     *
     * <p>Algorithm:</p>
     * <p>1. Maintain three states for each vertex: UNVISITED, VISITING (in current DFS path), VISITED (finished processing).</p>
     * <p>2. Iterate through all vertices:</p>
     * <p>   a. If a vertex `u` is UNVISITED, start a DFS from `u`.</p>
     * <p>3. During DFS from `u`:</p>
     * <p>   a. Mark `u` as VISITING.</p>
     * <p>   b. For each neighbor `v` of `u`:</p>
     * <p>      i. If `v` is VISITING, a back-edge is found, meaning a cycle exists. Return `false` immediately.</p>
     * <p>      ii. If `v` is UNVISITED, recursively call DFS on `v`. If the recursive call returns `false` (cycle detected), propagate `false`.</p>
     * <p>      iii. If `v` is VISITED, it means `v` and its subtree have already been processed and don't contain a cycle relative to `u`.</p>
     * <p>   c. After visiting all neighbors, mark `u` as VISITED and push it onto a stack or add it to the front of a list.</p>
     * <p>4. If DFS completes for all components without detecting a cycle, the reversed order of elements in the stack/list is the topological sort.</p>
     *
     * @param graph The directed graph representing courses and prerequisites.
     * @return A list of courses in a valid order, or an empty list if a cycle is detected.
     * @throws IllegalArgumentException if the graph is undirected.
     *
     * Time Complexity: O(V + E). Each vertex and edge is visited once.
     * Space Complexity: O(V + E) for adjacency list, visited states map, and recursion stack.
     */
    public List<V> findOrderDFS(Graph<V> graph) {
        if (!graph.isDirected()) {
            throw new IllegalArgumentException("DFS-based topological sort is for DIRECTED graphs.");
        }

        Map<V, State> visitedState = new HashMap<>();
        // Initialize all vertices as UNVISITED
        for (V vertex : graph.getVertices()) {
            visitedState.put(vertex, State.UNVISITED);
        }

        // Stack to store the topological order (reverse order initially)
        LinkedList<V> topologicalOrder = new LinkedList<>();

        // Iterate over all vertices to ensure all components are covered
        for (V vertex : graph.getVertices()) {
            if (visitedState.get(vertex) == State.UNVISITED) {
                // If DFS finds a cycle, return empty list
                if (!dfsVisit(graph, vertex, visitedState, topologicalOrder)) {
                    return Collections.emptyList();
                }
            }
        }

        // If no cycle was detected, the topologicalOrder list (which is a LinkedList
        // where elements are added to the front) is already in the correct order.
        return topologicalOrder;
    }

    /**
     * Recursive helper for DFS-based topological sort and cycle detection.
     *
     * @param graph          The graph.
     * @param current        The current vertex being visited.
     * @param visitedState   Map to track the state of each vertex (UNVISITED, VISITING, VISITED).
     * @param topologicalOrder LinkedList to build the topological order (elements added to front).
     * @return true if no cycle is detected from this path, false if a cycle is found.
     */
    private boolean dfsVisit(Graph<V> graph, V current, Map<V, State> visitedState, LinkedList<V> topologicalOrder) {
        visitedState.put(current, State.VISITING); // Mark current as being visited (in current recursion stack)

        for (V neighbor : graph.getNeighbors(current)) {
            if (visitedState.get(neighbor) == State.VISITING) {
                // If a neighbor is in VISITING state, it means we found a back-edge, hence a cycle.
                return false;
            }
            if (visitedState.get(neighbor) == State.UNVISITED) {
                // If neighbor is unvisited, recurse
                if (!dfsVisit(graph, neighbor, visitedState, topologicalOrder)) {
                    return false; // Propagate cycle detection
                }
            }
            // If neighbor is VISITED, it means it's already processed, no need to visit again.
        }

        visitedState.put(current, State.VISITED); // Mark current as fully visited
        topologicalOrder.addFirst(current); // Add to the front of the list for correct topological order
        return true;
    }

    /**
     * Enum to represent the state of a vertex during DFS for cycle detection/topological sort.
     * UNVISITED: Vertex has not been visited yet.
     * VISITING: Vertex is currently in the recursion stack (part of the current DFS path).
     * VISITED: Vertex has been fully processed (all its descendants explored).
     */
    private enum State {
        UNVISITED,
        VISITING,
        VISITED
    }
}
```