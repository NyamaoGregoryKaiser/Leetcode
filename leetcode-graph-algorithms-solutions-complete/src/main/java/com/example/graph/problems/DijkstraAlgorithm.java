```java
package com.example.graph.problems;

import com.example.graph.model.Graph;
import com.example.graph.model.GraphEdge;
import com.example.graph.model.GraphNode;

import java.util.*;

/**
 * Implements Dijkstra's algorithm to find the shortest paths from a single source node
 * to all other nodes in a weighted graph with non-negative edge weights.
 */
public class DijkstraAlgorithm {

    // Represents the result of Dijkstra's: shortest distances and predecessors.
    public static class DijkstraResult {
        public final Map<GraphNode, Integer> distances;
        public final Map<GraphNode, GraphNode> predecessors;

        public DijkstraResult(Map<GraphNode, Integer> distances, Map<GraphNode, GraphNode> predecessors) {
            this.distances = distances;
            this.predecessors = predecessors;
        }

        /**
         * Reconstructs the shortest path from the start node to a target node.
         * @param targetNode The destination node.
         * @return A list of nodes representing the shortest path, or an empty list if no path exists.
         */
        public List<GraphNode> getShortestPathTo(GraphNode targetNode) {
            LinkedList<GraphNode> path = new LinkedList<>();
            if (!distances.containsKey(targetNode) || distances.get(targetNode) == Integer.MAX_VALUE) {
                return Collections.emptyList(); // No path to target
            }

            GraphNode current = targetNode;
            while (current != null) {
                path.addFirst(current); // Add to the beginning to get correct order
                current = predecessors.get(current);
            }
            return path;
        }
    }

    /**
     * Finds the shortest paths from a given start node to all other reachable nodes
     * in a weighted graph using Dijkstra's algorithm.
     * Assumes all edge weights are non-negative.
     *
     * Time Complexity: With a PriorityQueue implemented using a binary heap: O(E log V).
     *                  E is the number of edges, V is the number of vertices.
     *                  Each edge relaxation takes O(log V) time due to priority queue operations.
     * Space Complexity: O(V + E) for storing distances, predecessors, and the priority queue.
     *
     * @param graph The weighted graph.
     * @param startNode The starting node for shortest path calculations.
     * @return A DijkstraResult object containing maps of shortest distances and predecessors.
     * @throws IllegalArgumentException if the startNode is not in the graph or if negative edge weights are detected.
     */
    public DijkstraResult findShortestPaths(Graph graph, GraphNode startNode) {
        if (!graph.getAllNodes().contains(startNode)) {
            throw new IllegalArgumentException("Start node is not in the graph.");
        }

        // Initialize distances: all to infinity, start node to 0
        Map<GraphNode, Integer> distances = new HashMap<>();
        // Initialize predecessors: to reconstruct path
        Map<GraphNode, GraphNode> predecessors = new HashMap<>();
        // Priority queue to store (distance, node) pairs, ordered by distance
        // This allows efficiently retrieving the node with the smallest known distance
        PriorityQueue<Map.Entry<GraphNode, Integer>> pq =
                new PriorityQueue<>(Comparator.comparingInt(Map.Entry::getValue));

        // Initialize all distances to "infinity" and add all nodes to distances map
        for (GraphNode node : graph.getAllNodes()) {
            distances.put(node, Integer.MAX_VALUE);
            predecessors.put(node, null); // No predecessor initially
        }

        // Distance to start node is 0
        distances.put(startNode, 0);
        pq.offer(new AbstractMap.SimpleEntry<>(startNode, 0));

        while (!pq.isEmpty()) {
            Map.Entry<GraphNode, Integer> currentEntry = pq.poll();
            GraphNode currentNode = currentEntry.getKey();
            int currentDistance = currentEntry.getValue();

            // If we've already found a shorter path to currentNode, skip it
            // This can happen because PQ can hold outdated entries
            if (currentDistance > distances.get(currentNode)) {
                continue;
            }

            // Iterate over all neighbors (edges) of the current node
            for (GraphEdge edge : graph.getEdges(currentNode)) {
                GraphNode neighbor = edge.getDestination();
                int weight = edge.getWeight();

                // Dijkstra's does not work with negative edge weights
                if (weight < 0) {
                    throw new IllegalArgumentException("Dijkstra's algorithm does not support negative edge weights.");
                }

                // Calculate distance to neighbor through currentNode
                int newDistance = currentDistance + weight;

                // Relaxation step: If a shorter path to neighbor is found
                if (newDistance < distances.get(neighbor)) {
                    distances.put(neighbor, newDistance);
                    predecessors.put(neighbor, currentNode);
                    pq.offer(new AbstractMap.SimpleEntry<>(neighbor, newDistance));
                }
            }
        }
        return new DijkstraResult(distances, predecessors);
    }
}
```