```java
package com.example.graph.problems;

import com.example.graph.model.Graph;
import com.example.graph.model.GraphEdge;
import com.example.graph.model.GraphNode;

import java.util.*;

/**
 * Implements various graph traversal algorithms: Breadth-First Search (BFS) and Depth-First Search (DFS).
 * These are fundamental algorithms for exploring graph structures.
 */
public class GraphTraversal {

    /**
     * Performs a Breadth-First Search (BFS) starting from a given node.
     * BFS explores all nodes at the present depth level before moving on to the nodes at the next depth level.
     * It uses a queue to keep track of nodes to visit.
     *
     * Time Complexity: O(V + E), where V is the number of vertices and E is the number of edges.
     *                  Each vertex and each edge is processed at most once.
     * Space Complexity: O(V) for the queue and the visited set in the worst case (e.g., a star graph).
     *
     * @param graph The graph to traverse.
     * @param startNode The node from which to start the traversal.
     * @return A list of nodes in the order they were visited by BFS.
     * @throws IllegalArgumentException if the startNode is not in the graph.
     */
    public List<GraphNode> bfs(Graph graph, GraphNode startNode) {
        if (!graph.getAllNodes().contains(startNode)) {
            throw new IllegalArgumentException("Start node is not in the graph.");
        }

        List<GraphNode> visitedOrder = new ArrayList<>();
        Set<GraphNode> visited = new HashSet<>();
        Queue<GraphNode> queue = new LinkedList<>();

        // Start BFS from the initial node
        queue.offer(startNode);
        visited.add(startNode);

        while (!queue.isEmpty()) {
            GraphNode currentNode = queue.poll();
            visitedOrder.add(currentNode);

            // Explore neighbors
            for (GraphEdge edge : graph.getEdges(currentNode)) {
                GraphNode neighbor = edge.getDestination();
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.offer(neighbor);
                }
            }
        }
        return visitedOrder;
    }

    /**
     * Performs a Depth-First Search (DFS) starting from a given node using recursion.
     * DFS explores as far as possible along each branch before backtracking.
     *
     * Time Complexity: O(V + E), where V is the number of vertices and E is the number of edges.
     *                  Each vertex and each edge is processed at most once.
     * Space Complexity: O(V) for the recursion stack and the visited set in the worst case (e.g., a long path).
     *
     * @param graph The graph to traverse.
     * @param startNode The node from which to start the traversal.
     * @return A list of nodes in the order they were visited by recursive DFS.
     * @throws IllegalArgumentException if the startNode is not in the graph.
     */
    public List<GraphNode> dfsRecursive(Graph graph, GraphNode startNode) {
        if (!graph.getAllNodes().contains(startNode)) {
            throw new IllegalArgumentException("Start node is not in the graph.");
        }

        List<GraphNode> visitedOrder = new ArrayList<>();
        Set<GraphNode> visited = new HashSet<>();
        dfsRecursiveHelper(graph, startNode, visited, visitedOrder);
        return visitedOrder;
    }

    /**
     * Helper method for recursive DFS.
     * @param graph The graph to traverse.
     * @param currentNode The current node being visited.
     * @param visited A set of nodes already visited to prevent cycles and redundant work.
     * @param visitedOrder A list to store the order of visited nodes.
     */
    private void dfsRecursiveHelper(Graph graph, GraphNode currentNode, Set<GraphNode> visited, List<GraphNode> visitedOrder) {
        visited.add(currentNode);
        visitedOrder.add(currentNode);

        for (GraphEdge edge : graph.getEdges(currentNode)) {
            GraphNode neighbor = edge.getDestination();
            if (!visited.contains(neighbor)) {
                dfsRecursiveHelper(graph, neighbor, visited, visitedOrder);
            }
        }
    }

    /**
     * Performs a Depth-First Search (DFS) starting from a given node using an iterative approach.
     * It uses an explicit stack to simulate recursion.
     *
     * Time Complexity: O(V + E), where V is the number of vertices and E is the number of edges.
     *                  Each vertex and each edge is processed at most once.
     * Space Complexity: O(V) for the stack and the visited set in the worst case.
     *
     * @param graph The graph to traverse.
     * @param startNode The node from which to start the traversal.
     * @return A list of nodes in the order they were visited by iterative DFS.
     * @throws IllegalArgumentException if the startNode is not in the graph.
     */
    public List<GraphNode> dfsIterative(Graph graph, GraphNode startNode) {
        if (!graph.getAllNodes().contains(startNode)) {
            throw new IllegalArgumentException("Start node is not in the graph.");
        }

        List<GraphNode> visitedOrder = new ArrayList<>();
        Set<GraphNode> visited = new HashSet<>();
        Stack<GraphNode> stack = new Stack<>();

        // Start DFS from the initial node
        stack.push(startNode);
        visited.add(startNode); // Mark as visited when pushing to stack

        while (!stack.isEmpty()) {
            GraphNode currentNode = stack.pop();
            visitedOrder.add(currentNode);

            // Explore neighbors in reverse order so that the first neighbor in the list
            // is processed last (and thus first when popping from stack), mimicking
            // recursive behavior for consistent output if desired.
            // For general DFS, order doesn't strictly matter.
            List<GraphEdge> neighbors = new ArrayList<>(graph.getEdges(currentNode));
            Collections.reverse(neighbors); // To process neighbors in original order, reverse this.

            for (GraphEdge edge : neighbors) {
                GraphNode neighbor = edge.getDestination();
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor); // Mark as visited when pushing to stack
                    stack.push(neighbor);
                }
            }
        }
        return visitedOrder;
    }

    /**
     * A more common iterative DFS where a node is marked visited when it's *processed* (popped),
     * and only unvisited neighbors are pushed. This results in the "post-order" traversal-like output
     * similar to the recursive DFS.
     *
     * This version can produce a different `visitedOrder` compared to `dfsIterative` above
     * due to when nodes are added to `visitedOrder` and how duplicates might be handled on the stack.
     * The `dfsIterative` above marks visited on `push`, ensuring each node is processed once.
     * This version below ensures that the `visitedOrder` closely matches the recursive one by
     * only adding to `visitedOrder` *after* all its children are processed in DFS.
     *
     * NOTE: The `dfsIterative` provided earlier is a "pre-order" like traversal where nodes are added to `visitedOrder`
     * when they are first encountered (pushed onto stack / added to visited set).
     * The recursive DFS also tends to be "pre-order" in terms of when `visitedOrder.add(currentNode)` happens.
     *
     * For consistency with the `dfsRecursive` output, the first `dfsIterative` implementation
     * (marking visited on push and adding to visitedOrder on pop) is generally closer to the typical
     * iterative DFS where nodes are added to the result list when they are first popped and processed.
     * The `dfsIterative` provided is correct for simply visiting all nodes.
     */
}
```