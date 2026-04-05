```java
package com.example.graph.util;

import com.example.graph.model.Graph;
import com.example.graph.model.GraphNode;

import java.util.Random;

/**
 * Utility class for generating various types of graphs for testing and benchmarking purposes.
 */
public class GraphGenerator {

    /**
     * Creates a simple directed graph for basic testing.
     * Nodes: 0, 1, 2, 3, 4
     * Edges: 0->1, 0->2, 1->3, 2->4, 3->4
     * @return A simple directed graph.
     */
    public static Graph createSimpleDirectedGraph() {
        Graph graph = new Graph(true); // Directed
        graph.addEdge(0, 1);
        graph.addEdge(0, 2);
        graph.addEdge(1, 3);
        graph.addEdge(2, 4);
        graph.addEdge(3, 4);
        return graph;
    }

    /**
     * Creates a simple undirected graph for basic testing.
     * Nodes: 0, 1, 2, 3
     * Edges: 0-1, 0-2, 1-3, 2-3
     * @return A simple undirected graph.
     */
    public static Graph createSimpleUndirectedGraph() {
        Graph graph = new Graph(false); // Undirected
        graph.addEdge(0, 1);
        graph.addEdge(0, 2);
        graph.addEdge(1, 3);
        graph.addEdge(2, 3);
        return graph;
    }

    /**
     * Creates a directed graph with a cycle.
     * Nodes: 0, 1, 2, 3
     * Edges: 0->1, 1->2, 2->0 (cycle), 2->3
     * @return A directed graph with a cycle.
     */
    public static Graph createDirectedGraphWithCycle() {
        Graph graph = new Graph(true);
        graph.addEdge(0, 1);
        graph.addEdge(1, 2);
        graph.addEdge(2, 0); // Cycle: 0 -> 1 -> 2 -> 0
        graph.addEdge(2, 3);
        return graph;
    }

    /**
     * Creates a directed acyclic graph (DAG) suitable for topological sort.
     * Nodes: 0, 1, 2, 3, 4, 5
     * Edges: 5->2, 5->0, 4->0, 4->1, 2->3, 3->1
     * (Classic example for topological sort)
     * @return A DAG.
     */
    public static Graph createDAGForTopologicalSort() {
        Graph graph = new Graph(true);
        graph.addEdge(5, 2);
        graph.addEdge(5, 0);
        graph.addEdge(4, 0);
        graph.addEdge(4, 1);
        graph.addEdge(2, 3);
        graph.addEdge(3, 1);
        return graph;
    }

    /**
     * Creates a weighted directed graph for Dijkstra's algorithm.
     * Node IDs match standard examples (e.g., from CLRS)
     * @return A weighted directed graph.
     */
    public static Graph createWeightedDirectedGraphForDijkstra() {
        Graph graph = new Graph(true);
        graph.addEdge(0, 1, 10);
        graph.addEdge(0, 2, 3);
        graph.addEdge(1, 2, 1);
        graph.addEdge(1, 3, 2);
        graph.addEdge(2, 1, 4);
        graph.addEdge(2, 3, 8);
        graph.addEdge(2, 4, 2);
        graph.addEdge(3, 4, 7);
        graph.addEdge(4, 3, 9);
        return graph;
    }

    /**
     * Creates a weighted undirected graph for Prim's algorithm.
     * Nodes: A(0), B(1), C(2), D(3), E(4), F(5), G(6), H(7), I(8)
     * @return A weighted undirected graph.
     */
    public static Graph createWeightedUndirectedGraphForPrim() {
        Graph graph = new Graph(false); // Undirected
        graph.addEdge(0, 1, 4); // A-B
        graph.addEdge(0, 7, 8); // A-H
        graph.addEdge(1, 2, 8); // B-C
        graph.addEdge(1, 7, 11); // B-H
        graph.addEdge(2, 3, 7); // C-D
        graph.addEdge(2, 5, 4); // C-F
        graph.addEdge(2, 8, 2); // C-I
        graph.addEdge(3, 4, 9); // D-E
        graph.addEdge(3, 5, 14); // D-F
        graph.addEdge(4, 5, 10); // E-F
        graph.addEdge(5, 6, 2); // F-G
        graph.addEdge(6, 7, 1); // G-H
        graph.addEdge(6, 8, 6); // G-I
        graph.addEdge(7, 8, 7); // H-I
        return graph;
    }

    /**
     * Creates a large random graph.
     * @param numNodes The number of nodes in the graph.
     * @param density Percentage of possible edges to add (0-100). Higher density means more edges.
     * @param directed True for a directed graph, false for an undirected graph.
     * @param weighted True for weighted edges (random weights), false for unweighted (weight 1).
     * @return A randomly generated graph.
     */
    public static Graph createRandomGraph(int numNodes, int density, boolean directed, boolean weighted) {
        Graph graph = new Graph(directed);
        Random random = new Random();

        // Add all nodes first
        for (int i = 0; i < numNodes; i++) {
            graph.addNode(new GraphNode(i));
        }

        // Add edges
        for (int i = 0; i < numNodes; i++) {
            for (int j = 0; j < numNodes; j++) {
                if (i == j) continue; // No self-loops

                // For undirected, only add for i < j to avoid duplicate edges being considered for 'density'
                // The graph.addEdge handles the other direction if undirected=false
                if (!directed && i >= j) continue;

                if (random.nextInt(100) < density) { // Add edge based on density
                    int weight = weighted ? random.nextInt(100) + 1 : 1; // Random weight between 1 and 100
                    graph.addEdge(i, j, weight);
                }
            }
        }
        return graph;
    }

    /**
     * Creates a grid graph (e.g., for maze problems).
     * Each cell (i, j) is connected to (i+1, j), (i-1, j), (i, j+1), (i, j-1)
     * @param rows Number of rows in the grid.
     * @param cols Number of columns in the grid.
     * @param directed True for directed, false for undirected.
     * @param weighted True for weighted, false for unweighted.
     * @return A grid graph.
     */
    public static Graph createGridGraph(int rows, int cols, boolean directed, boolean weighted) {
        Graph graph = new Graph(directed);
        Random random = new Random();

        // Create nodes
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                graph.addNode(new GraphNode(r * cols + c));
            }
        }

        // Add edges
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                int currentNodeId = r * cols + c;

                // Connect to right
                if (c + 1 < cols) {
                    int neighborNodeId = r * cols + (c + 1);
                    int weight = weighted ? random.nextInt(10) + 1 : 1;
                    graph.addEdge(currentNodeId, neighborNodeId, weight);
                }
                // Connect to down
                if (r + 1 < rows) {
                    int neighborNodeId = (r + 1) * cols + c;
                    int weight = weighted ? random.nextInt(10) + 1 : 1;
                    graph.addEdge(currentNodeId, neighborNodeId, weight);
                }
            }
        }
        return graph;
    }

    /**
     * Creates a disconnected graph.
     * @return A graph with two disconnected components.
     */
    public static Graph createDisconnectedGraph() {
        Graph graph = new Graph(false);
        // Component 1
        graph.addEdge(0, 1);
        graph.addEdge(1, 2);
        graph.addEdge(2, 0);
        // Component 2 (not connected to component 1)
        graph.addEdge(3, 4);
        graph.addEdge(4, 5);
        // Add an isolated node
        graph.addNode(new GraphNode(6));
        return graph;
    }
}
```