```java
package com.example.graph.algorithms;

import com.example.graph.datastructures.Graph;

import java.util.*;

/**
 * Implements Breadth-First Search (BFS) to find the shortest path
 * (in terms of number of edges) in an unweighted graph.
 * This algorithm works for both directed and undirected graphs.
 */
public class ShortestPathBFS<V> {

    /**
     * Finds the shortest path between a start vertex and an end vertex in an unweighted graph.
     * The path returned is a list of vertices from start to end.
     *
     * @param graph The graph to search.
     * @param start The starting vertex.
     * @param end   The target vertex.
     * @return A list of vertices representing the shortest path, or an empty list if no path exists.
     *         Returns null if start or end vertex is not in the graph.
     *
     * Time Complexity: O(V + E), where V is the number of vertices and E is the number of edges.
     *                  Each vertex and edge is visited at most once.
     * Space Complexity: O(V + E), for storing parent map, distance map, and the queue.
     */
    public List<V> findShortestPath(Graph<V> graph, V start, V end) {
        // Check if start or end vertices exist in the graph
        if (!graph.getVertices().contains(start) || !graph.getVertices().contains(end)) {
            System.err.println("Start or end vertex not found in the graph.");
            return null; // Indicate invalid input
        }

        // If start and end are the same, the path is just the start/end vertex.
        if (start.equals(end)) {
            return Collections.singletonList(start);
        }

        // Queue for BFS traversal
        Queue<V> queue = new LinkedList<>();
        // Map to store the predecessor of each vertex in the shortest path
        Map<V, V> parentMap = new HashMap<>();
        // Set to keep track of visited vertices to avoid cycles and redundant processing
        Set<V> visited = new HashSet<>();

        // Initialize BFS
        queue.offer(start);
        visited.add(start);
        parentMap.put(start, null); // Start node has no parent

        // Perform BFS
        while (!queue.isEmpty()) {
            V current = queue.poll();

            // If we reached the end vertex, reconstruct and return the path
            if (current.equals(end)) {
                return reconstructPath(parentMap, start, end);
            }

            // Explore neighbors
            for (V neighbor : graph.getNeighbors(current)) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    parentMap.put(neighbor, current); // Set current as neighbor's parent
                    queue.offer(neighbor);
                }
            }
        }

        // If the queue becomes empty and the end vertex was not reached, no path exists.
        return Collections.emptyList();
    }

    /**
     * Reconstructs the path from the parent map.
     *
     * @param parentMap The map storing parent pointers.
     * @param start     The starting vertex of the path.
     * @param end       The ending vertex of the path.
     * @return A list of vertices representing the path from start to end.
     */
    private List<V> reconstructPath(Map<V, V> parentMap, V start, V end) {
        LinkedList<V> path = new LinkedList<>();
        V current = end;
        while (current != null && parentMap.containsKey(current)) {
            path.addFirst(current); // Add to the front to build path from start to end
            current = parentMap.get(current);
            if (current != null && current.equals(start)) { // If start is the parent, add it and break
                path.addFirst(start);
                break;
            }
        }
        return path;
    }

    /**
     * Finds the shortest distance (number of edges) between a start vertex and an end vertex.
     *
     * @param graph The graph to search.
     * @param start The starting vertex.
     * @param end   The target vertex.
     * @return The shortest distance, or -1 if no path exists or vertices are invalid.
     *
     * Time Complexity: O(V + E)
     * Space Complexity: O(V)
     */
    public int findShortestDistance(Graph<V> graph, V start, V end) {
        if (!graph.getVertices().contains(start) || !graph.getVertices().contains(end)) {
            System.err.println("Start or end vertex not found in the graph.");
            return -1;
        }

        if (start.equals(end)) {
            return 0;
        }

        Queue<V> queue = new LinkedList<>();
        Map<V, Integer> distance = new HashMap<>();
        Set<V> visited = new HashSet<>();

        queue.offer(start);
        visited.add(start);
        distance.put(start, 0);

        while (!queue.isEmpty()) {
            V current = queue.poll();

            if (current.equals(end)) {
                return distance.get(end);
            }

            for (V neighbor : graph.getNeighbors(current)) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    distance.put(neighbor, distance.get(current) + 1);
                    queue.offer(neighbor);
                }
            }
        }
        return -1; // No path found
    }
}
```