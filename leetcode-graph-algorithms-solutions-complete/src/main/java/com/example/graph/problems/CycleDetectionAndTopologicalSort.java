```java
package com.example.graph.problems;

import com.example.graph.model.Graph;
import com.example.graph.model.GraphEdge;
import com.example.graph.model.GraphNode;

import java.util.*;

/**
 * Implements algorithms for cycle detection and topological sorting in directed graphs.
 * Topological sort is only possible on Directed Acyclic Graphs (DAGs).
 */
public class CycleDetectionAndTopologicalSort {

    // States for DFS traversal to detect cycles
    private enum NodeState {
        UNVISITED,  // Node has not been visited yet
        VISITING,   // Node is currently in the recursion stack (being visited)
        VISITED     // Node has been completely visited (all its descendants explored)
    }

    /**
     * Detects if a directed graph contains a cycle using Depth-First Search (DFS).
     *
     * Time Complexity: O(V + E), where V is the number of vertices and E is the number of edges.
     *                  Each vertex and edge is processed at most once.
     * Space Complexity: O(V) for the recursion stack and the state map.
     *
     * @param graph The directed graph to check for cycles.
     * @return True if the graph contains a cycle, false otherwise.
     * @throws IllegalArgumentException if the graph is undirected.
     */
    public boolean hasCycle(Graph graph) {
        if (!graph.isDirected()) {
            throw new IllegalArgumentException("Cycle detection using DFS states is primarily for directed graphs.");
        }

        // Map to keep track of the state of each node during DFS
        Map<GraphNode, NodeState> states = new HashMap<>();
        for (GraphNode node : graph.getAllNodes()) {
            states.put(node, NodeState.UNVISITED);
        }

        // Iterate through all nodes to handle disconnected components
        for (GraphNode node : graph.getAllNodes()) {
            if (states.get(node) == NodeState.UNVISITED) {
                if (dfsCheckCycle(graph, node, states)) {
                    return true; // Cycle found
                }
            }
        }
        return false; // No cycle found after checking all components
    }

    /**
     * Recursive helper for cycle detection using DFS.
     * @param graph The graph.
     * @param currentNode The current node being visited.
     * @param states Map of node states.
     * @return True if a cycle is detected originating from this path, false otherwise.
     */
    private boolean dfsCheckCycle(Graph graph, GraphNode currentNode, Map<GraphNode, NodeState> states) {
        states.put(currentNode, NodeState.VISITING); // Mark current node as 'visiting'

        for (GraphEdge edge : graph.getEdges(currentNode)) {
            GraphNode neighbor = edge.getDestination();

            if (states.get(neighbor) == NodeState.VISITING) {
                return true; // Found a back edge to a node already in current DFS path, so a cycle exists
            }

            if (states.get(neighbor) == NodeState.UNVISITED) {
                if (dfsCheckCycle(graph, neighbor, states)) {
                    return true; // Cycle found in a deeper path
                }
            }
        }

        states.put(currentNode, NodeState.VISITED); // Mark current node as 'visited' (finished exploring)
        return false;
    }

    /**
     * Performs a topological sort on a Directed Acyclic Graph (DAG).
     * The result is a linear ordering of vertices such that for every directed edge (u, v),
     * vertex u comes before v in the ordering.
     *
     * This implementation uses a DFS-based approach.
     *
     * Time Complexity: O(V + E), same as DFS.
     * Space Complexity: O(V) for the recursion stack, state map, and result list.
     *
     * @param graph The directed graph to sort.
     * @return A list of GraphNodes in topological order.
     * @throws IllegalArgumentException if the graph is undirected or contains a cycle.
     */
    public List<GraphNode> topologicalSort(Graph graph) {
        if (!graph.isDirected()) {
            throw new IllegalArgumentException("Topological sort is only applicable to directed graphs.");
        }

        // Map to track node states during DFS for cycle detection
        Map<GraphNode, NodeState> states = new HashMap<>();
        for (GraphNode node : graph.getAllNodes()) {
            states.put(node, NodeState.UNVISITED);
        }

        // Stack to store the topological order (nodes are pushed in post-order)
        Stack<GraphNode> stack = new Stack<>();

        // Iterate through all nodes to handle disconnected components
        for (GraphNode node : graph.getAllNodes()) {
            if (states.get(node) == NodeState.UNVISITED) {
                if (dfsTopologicalSort(graph, node, states, stack)) {
                    // If dfsTopologicalSort returns true, it means a cycle was detected
                    throw new IllegalArgumentException("Graph contains a cycle; topological sort is not possible.");
                }
            }
        }

        // Pop nodes from stack to get topological order (reverse of post-order DFS traversal)
        List<GraphNode> topologicalOrder = new ArrayList<>();
        while (!stack.isEmpty()) {
            topologicalOrder.add(stack.pop());
        }
        return topologicalOrder;
    }

    /**
     * Recursive helper for topological sort using DFS.
     * Integrates cycle detection: if a cycle is found, it returns true immediately.
     * @param graph The graph.
     * @param currentNode The current node being visited.
     * @param states Map of node states for cycle detection.
     * @param stack The stack to build the topological order.
     * @return True if a cycle is detected, false otherwise.
     */
    private boolean dfsTopologicalSort(Graph graph, GraphNode currentNode, Map<GraphNode, NodeState> states, Stack<GraphNode> stack) {
        states.put(currentNode, NodeState.VISITING);

        for (GraphEdge edge : graph.getEdges(currentNode)) {
            GraphNode neighbor = edge.getDestination();

            if (states.get(neighbor) == NodeState.VISITING) {
                return true; // Cycle detected
            }

            if (states.get(neighbor) == NodeState.UNVISITED) {
                if (dfsTopologicalSort(graph, neighbor, states, stack)) {
                    return true; // Cycle detected in a deeper path
                }
            }
        }

        states.put(currentNode, NodeState.VISITED);
        stack.push(currentNode); // Push node to stack only after all its descendants are processed
        return false;
    }

    /**
     * Alternative topological sort using Kahn's algorithm (BFS-based).
     * This method is useful for demonstrating a different paradigm.
     * It relies on tracking in-degrees of nodes.
     *
     * Time Complexity: O(V + E)
     * Space Complexity: O(V)
     *
     * @param graph The directed graph to sort.
     * @return A list of GraphNodes in topological order.
     * @throws IllegalArgumentException if the graph is undirected or contains a cycle.
     */
    public List<GraphNode> topologicalSortKahn(Graph graph) {
        if (!graph.isDirected()) {
            throw new IllegalArgumentException("Topological sort is only applicable to directed graphs.");
        }

        Map<GraphNode, Integer> inDegree = new HashMap<>();
        // Initialize in-degrees for all nodes to 0
        for (GraphNode node : graph.getAllNodes()) {
            inDegree.put(node, 0);
        }

        // Calculate in-degrees for all nodes
        for (GraphNode node : graph.getAllNodes()) {
            for (GraphEdge edge : graph.getEdges(node)) {
                GraphNode neighbor = edge.getDestination();
                inDegree.put(neighbor, inDegree.get(neighbor) + 1);
            }
        }

        Queue<GraphNode> queue = new LinkedList<>();
        // Add all nodes with in-degree 0 to the queue
        for (GraphNode node : graph.getAllNodes()) {
            if (inDegree.get(node) == 0) {
                queue.offer(node);
            }
        }

        List<GraphNode> topologicalOrder = new ArrayList<>();
        int visitedNodesCount = 0;

        while (!queue.isEmpty()) {
            GraphNode currentNode = queue.poll();
            topologicalOrder.add(currentNode);
            visitedNodesCount++;

            // For each neighbor of the current node
            for (GraphEdge edge : graph.getEdges(currentNode)) {
                GraphNode neighbor = edge.getDestination();
                // Decrement its in-degree
                inDegree.put(neighbor, inDegree.get(neighbor) - 1);
                // If in-degree becomes 0, add to queue
                if (inDegree.get(neighbor) == 0) {
                    queue.offer(neighbor);
                }
            }
        }

        // If the number of visited nodes is less than total nodes, a cycle exists
        if (visitedNodesCount != graph.getAllNodes().size()) {
            throw new IllegalArgumentException("Graph contains a cycle; topological sort is not possible.");
        }

        return topologicalOrder;
    }
}
```