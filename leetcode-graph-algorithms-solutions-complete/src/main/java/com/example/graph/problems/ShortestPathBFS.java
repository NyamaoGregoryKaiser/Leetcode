```java
package com.example.graph.problems;

import com.example.graph.model.Graph;
import com.example.graph.model.GraphEdge;
import com.example.graph.model.GraphNode;

import java.util.*;

/**
 * Finds the shortest path in an unweighted graph using Breadth-First Search (BFS).
 * BFS guarantees the shortest path in terms of the number of edges for unweighted graphs.
 */
public class ShortestPathBFS {

    /**
     * Finds the shortest path (in terms of number of edges) between a start node and an end node
     * in an unweighted graph using BFS.
     *
     * Time Complexity: O(V + E), where V is the number of vertices and E is the number of edges.
     *                  Each vertex and edge is processed at most once.
     * Space Complexity: O(V) for the queue, visited set, and parent map.
     *
     * @param graph The unweighted graph to search.
     * @param startNode The starting node for the path.
     * @param endNode The destination node for the path.
     * @return A list of GraphNodes representing the shortest path from startNode to endNode.
     *         Returns an empty list if either node is not in the graph or if no path exists.
     *         Returns a list containing only the startNode if startNode equals endNode.
     */
    public List<GraphNode> findShortestPath(Graph graph, GraphNode startNode, GraphNode endNode) {
        // Handle edge cases: start or end node not in graph
        if (!graph.getAllNodes().contains(startNode) || !graph.getAllNodes().contains(endNode)) {
            return Collections.emptyList();
        }

        // If start and end are the same, path is just the start node
        if (startNode.equals(endNode)) {
            return Collections.singletonList(startNode);
        }

        Queue<GraphNode> queue = new LinkedList<>();
        Set<GraphNode> visited = new HashSet<>();
        Map<GraphNode, GraphNode> parentMap = new HashMap<>(); // Stores predecessor to reconstruct path

        queue.offer(startNode);
        visited.add(startNode);
        boolean pathFound = false;

        while (!queue.isEmpty()) {
            GraphNode currentNode = queue.poll();

            // If we reached the end node, we found the shortest path
            if (currentNode.equals(endNode)) {
                pathFound = true;
                break;
            }

            // Explore neighbors
            for (GraphEdge edge : graph.getEdges(currentNode)) {
                GraphNode neighbor = edge.getDestination();
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    parentMap.put(neighbor, currentNode); // Record parent for path reconstruction
                    queue.offer(neighbor);
                }
            }
        }

        // Reconstruct path if found
        if (pathFound) {
            List<GraphNode> path = new LinkedList<>();
            GraphNode current = endNode;
            while (current != null) {
                path.add(0, current); // Add to the beginning to get correct order
                current = parentMap.get(current);
            }
            return path;
        } else {
            // No path found
            return Collections.emptyList();
        }
    }
}
```