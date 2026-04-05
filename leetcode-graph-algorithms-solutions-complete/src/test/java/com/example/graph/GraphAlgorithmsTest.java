```java
package com.example.graph;

import com.example.graph.model.Graph;
import com.example.graph.model.GraphEdge;
import com.example.graph.model.GraphNode;
import com.example.graph.problems.*;
import com.example.graph.problems.DijkstraAlgorithm.DijkstraResult;
import com.example.graph.util.GraphGenerator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.util.*;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Graph Algorithms Test Suite")
class GraphAlgorithmsTest {

    private Graph simpleDirectedGraph;
    private Graph simpleUndirectedGraph;
    private Graph directedGraphWithCycle;
    private Graph dagForTopologicalSort;
    private Graph weightedDirectedGraphForDijkstra;
    private Graph weightedUndirectedGraphForPrim;
    private Graph disconnectedGraph;

    @BeforeEach
    void setUp() {
        simpleDirectedGraph = GraphGenerator.createSimpleDirectedGraph();
        simpleUndirectedGraph = GraphGenerator.createSimpleUndirectedGraph();
        directedGraphWithCycle = GraphGenerator.createDirectedGraphWithCycle();
        dagForTopologicalSort = GraphGenerator.createDAGForTopologicalSort();
        weightedDirectedGraphForDijkstra = GraphGenerator.createWeightedDirectedGraphForDijkstra();
        weightedUndirectedGraphForPrim = GraphGenerator.createWeightedUndirectedGraphForPrim();
        disconnectedGraph = GraphGenerator.createDisconnectedGraph();
    }

    // Helper to get nodes from graph by ID
    private GraphNode getNode(Graph graph, int id) {
        return graph.getNode(id);
    }

    @Nested
    @DisplayName("Graph Traversal (BFS & DFS)")
    class GraphTraversalTest {
        private GraphTraversal traversal;

        @BeforeEach
        void setup() {
            traversal = new GraphTraversal();
        }

        @Test
        @DisplayName("BFS on simple directed graph")
        void testBfsSimpleDirectedGraph() {
            List<GraphNode> expectedOrder = List.of(
                    getNode(simpleDirectedGraph, 0),
                    getNode(simpleDirectedGraph, 1),
                    getNode(simpleDirectedGraph, 2),
                    getNode(simpleDirectedGraph, 3),
                    getNode(simpleDirectedGraph, 4)
            );
            List<GraphNode> actualOrder = traversal.bfs(simpleDirectedGraph, getNode(simpleDirectedGraph, 0));
            assertEquals(expectedOrder, actualOrder);
        }

        @Test
        @DisplayName("BFS on simple undirected graph")
        void testBfsSimpleUndirectedGraph() {
            List<GraphNode> expectedOrder = List.of(
                    getNode(simpleUndirectedGraph, 0),
                    getNode(simpleUndirectedGraph, 1),
                    getNode(simpleUndirectedGraph, 2),
                    getNode(simpleUndirectedGraph, 3)
            ); // Order might vary slightly for undirected graphs if adj list not sorted
            List<GraphNode> actualOrder = traversal.bfs(simpleUndirectedGraph, getNode(simpleUndirectedGraph, 0));
            // Check content and size, order might not be strictly fixed for ties
            assertTrue(actualOrder.containsAll(expectedOrder) && expectedOrder.containsAll(actualOrder));
            assertEquals(expectedOrder.size(), actualOrder.size());
        }

        @Test
        @DisplayName("DFS Recursive on simple directed graph")
        void testDfsRecursiveSimpleDirectedGraph() {
            List<GraphNode> expectedOrder = List.of(
                    getNode(simpleDirectedGraph, 0),
                    getNode(simpleDirectedGraph, 1),
                    getNode(simpleDirectedGraph, 3),
                    getNode(simpleDirectedGraph, 4),
                    getNode(simpleDirectedGraph, 2)
            );
            List<GraphNode> actualOrder = traversal.dfsRecursive(simpleDirectedGraph, getNode(simpleDirectedGraph, 0));
            assertEquals(expectedOrder, actualOrder);
        }

        @Test
        @DisplayName("DFS Iterative on simple directed graph")
        void testDfsIterativeSimpleDirectedGraph() {
            List<GraphNode> expectedOrder = List.of(
                    getNode(simpleDirectedGraph, 0),
                    getNode(simpleDirectedGraph, 2), // Due to reverse on neighbors and stack pop
                    getNode(simpleDirectedGraph, 4),
                    getNode(simpleDirectedGraph, 1),
                    getNode(simpleDirectedGraph, 3)
            ); // Order differs from recursive due to stack mechanics and adjacency list iteration order
            List<GraphNode> actualOrder = traversal.dfsIterative(simpleDirectedGraph, getNode(simpleDirectedGraph, 0));
            assertEquals(expectedOrder, actualOrder);
        }

        @Test
        @DisplayName("Traversal of a single node graph")
        void testTraversalSingleNodeGraph() {
            Graph graph = new Graph(true);
            graph.addNode(new GraphNode(0));
            GraphNode start = getNode(graph, 0);

            assertEquals(List.of(start), traversal.bfs(graph, start));
            assertEquals(List.of(start), traversal.dfsRecursive(graph, start));
            assertEquals(List.of(start), traversal.dfsIterative(graph, start));
        }

        @Test
        @DisplayName("Traversal of an empty graph throws exception for non-existent start node")
        void testTraversalEmptyGraph() {
            Graph graph = new Graph(true);
            GraphNode start = new GraphNode(0);
            assertThrows(IllegalArgumentException.class, () -> traversal.bfs(graph, start));
            assertThrows(IllegalArgumentException.class, () -> traversal.dfsRecursive(graph, start));
            assertThrows(IllegalArgumentException.class, () -> traversal.dfsIterative(graph, start));
        }

        @Test
        @DisplayName("Traversal of a disconnected graph from one component")
        void testTraversalDisconnectedGraph() {
            List<GraphNode> bfsExpected = List.of(
                    getNode(disconnectedGraph, 0),
                    getNode(disconnectedGraph, 1),
                    getNode(disconnectedGraph, 2)
            );
            List<GraphNode> bfsActual = traversal.bfs(disconnectedGraph, getNode(disconnectedGraph, 0));
            assertTrue(bfsActual.containsAll(bfsExpected) && bfsExpected.containsAll(bfsActual));
            assertEquals(bfsExpected.size(), bfsActual.size());

            List<GraphNode> dfsRecExpected = List.of(
                    getNode(disconnectedGraph, 0),
                    getNode(disconnectedGraph, 1),
                    getNode(disconnectedGraph, 2)
            ); // Depending on adj list order, 0->2->1 or 0->1->2 etc
            List<GraphNode> dfsRecActual = traversal.dfsRecursive(disconnectedGraph, getNode(disconnectedGraph, 0));
            assertTrue(dfsRecActual.containsAll(dfsRecExpected) && dfsRecExpected.containsAll(dfsRecActual));
            assertEquals(dfsRecExpected.size(), dfsRecActual.size());
        }
    }

    @Nested
    @DisplayName("Shortest Path BFS (Unweighted)")
    class ShortestPathBFSTest {
        private ShortestPathBFS shortestPathBFS;

        @BeforeEach
        void setup() {
            shortestPathBFS = new ShortestPathBFS();
        }

        @Test
        @DisplayName("Shortest path in simple directed graph")
        void testShortestPathSimpleDirectedGraph() {
            List<GraphNode> expectedPath = List.of(
                    getNode(simpleDirectedGraph, 0),
                    getNode(simpleDirectedGraph, 2),
                    getNode(simpleDirectedGraph, 4)
            );
            List<GraphNode> actualPath = shortestPathBFS.findShortestPath(
                    simpleDirectedGraph, getNode(simpleDirectedGraph, 0), getNode(simpleDirectedGraph, 4)
            );
            assertEquals(expectedPath, actualPath);
        }

        @Test
        @DisplayName("Shortest path in simple undirected graph")
        void testShortestPathSimpleUndirectedGraph() {
            List<GraphNode> expectedPath = List.of(
                    getNode(simpleUndirectedGraph, 0),
                    getNode(simpleUndirectedGraph, 3)
            ); // Path 0-1-3 or 0-2-3
            List<GraphNode> actualPath = shortestPathBFS.findShortestPath(
                    simpleUndirectedGraph, getNode(simpleUndirectedGraph, 0), getNode(simpleUndirectedGraph, 3)
            );
            // BFS finds one shortest path, either 0->1->3 or 0->2->3. Both are length 2.
            // Check if length is 2 and start/end are correct.
            assertEquals(2, actualPath.size());
            assertEquals(getNode(simpleUndirectedGraph, 0), actualPath.get(0));
            assertEquals(getNode(simpleUndirectedGraph, 3), actualPath.get(1));
        }


        @Test
        @DisplayName("No path between two nodes")
        void testNoPath() {
            List<GraphNode> actualPath = shortestPathBFS.findShortestPath(
                    disconnectedGraph, getNode(disconnectedGraph, 0), getNode(disconnectedGraph, 3)
            );
            assertTrue(actualPath.isEmpty());
        }

        @Test
        @DisplayName("Path from node to itself")
        void testPathToSelf() {
            List<GraphNode> actualPath = shortestPathBFS.findShortestPath(
                    simpleDirectedGraph, getNode(simpleDirectedGraph, 0), getNode(simpleDirectedGraph, 0)
            );
            assertEquals(List.of(getNode(simpleDirectedGraph, 0)), actualPath);
        }

        @Test
        @DisplayName("Start or end node not in graph")
        void testInvalidNodes() {
            GraphNode nonExistentNode = new GraphNode(99);
            assertTrue(shortestPathBFS.findShortestPath(simpleDirectedGraph, nonExistentNode, getNode(simpleDirectedGraph, 0)).isEmpty());
            assertTrue(shortestPathBFS.findShortestPath(simpleDirectedGraph, getNode(simpleDirectedGraph, 0), nonExistentNode).isEmpty());
        }
    }

    @Nested
    @DisplayName("Dijkstra's Algorithm (Weighted Shortest Path)")
    class DijkstraAlgorithmTest {
        private DijkstraAlgorithm dijkstra;

        @BeforeEach
        void setup() {
            dijkstra = new DijkstraAlgorithm();
        }

        @Test
        @DisplayName("Dijkstra on weighted directed graph")
        void testDijkstraWeightedDirectedGraph() {
            GraphNode startNode = getNode(weightedDirectedGraphForDijkstra, 0);
            DijkstraResult result = dijkstra.findShortestPaths(weightedDirectedGraphForDijkstra, startNode);

            // Expected distances from node 0
            Map<GraphNode, Integer> expectedDistances = Map.of(
                    getNode(weightedDirectedGraphForDijkstra, 0), 0,
                    getNode(weightedDirectedGraphForDijkstra, 1), 7, // 0->2(3)->1(4) = 7
                    getNode(weightedDirectedGraphForDijkstra, 2), 3, // 0->2(3) = 3
                    getNode(weightedDirectedGraphForDijkstra, 3), 9, // 0->2(3)->1(4)->3(2) = 9
                    getNode(weightedDirectedGraphForDijkstra, 4), 5  // 0->2(3)->4(2) = 5
            );

            assertEquals(expectedDistances, result.distances);

            // Test a specific path reconstruction
            List<GraphNode> expectedPathTo4 = List.of(
                    getNode(weightedDirectedGraphForDijkstra, 0),
                    getNode(weightedDirectedGraphForDijkstra, 2),
                    getNode(weightedDirectedGraphForDijkstra, 4)
            );
            assertEquals(expectedPathTo4, result.getShortestPathTo(getNode(weightedDirectedGraphForDijkstra, 4)));

            List<GraphNode> expectedPathTo3 = List.of(
                    getNode(weightedDirectedGraphForDijkstra, 0),
                    getNode(weightedDirectedGraphForDijkstra, 2),
                    getNode(weightedDirectedGraphForDijkstra, 1),
                    getNode(weightedDirectedGraphForDijkstra, 3)
            );
            assertEquals(expectedPathTo3, result.getShortestPathTo(getNode(weightedDirectedGraphForDijkstra, 3)));
        }

        @Test
        @DisplayName("Dijkstra handles unreachable nodes")
        void testDijkstraUnreachableNodes() {
            Graph graph = new Graph(true);
            graph.addEdge(0, 1, 1);
            graph.addNode(new GraphNode(2)); // Node 2 is isolated
            GraphNode startNode = getNode(graph, 0);
            DijkstraResult result = dijkstra.findShortestPaths(graph, startNode);

            assertEquals(0, result.distances.get(getNode(graph, 0)));
            assertEquals(1, result.distances.get(getNode(graph, 1)));
            assertEquals(Integer.MAX_VALUE, result.distances.get(getNode(graph, 2))); // Unreachable
            assertTrue(result.getShortestPathTo(getNode(graph, 2)).isEmpty());
        }

        @Test
        @DisplayName("Dijkstra throws exception for negative edge weights")
        void testDijkstraNegativeWeights() {
            Graph graph = new Graph(true);
            graph.addEdge(0, 1, 1);
            graph.addEdge(1, 2, -5); // Negative weight
            GraphNode startNode = getNode(graph, 0);
            assertThrows(IllegalArgumentException.class, () -> dijkstra.findShortestPaths(graph, startNode));
        }

        @Test
        @DisplayName("Dijkstra on a single node graph")
        void testDijkstraSingleNode() {
            Graph graph = new Graph(true);
            graph.addNode(new GraphNode(0));
            GraphNode startNode = getNode(graph, 0);
            DijkstraResult result = dijkstra.findShortestPaths(graph, startNode);
            assertEquals(0, result.distances.get(startNode));
            assertEquals(1, result.distances.size());
            assertEquals(List.of(startNode), result.getShortestPathTo(startNode));
        }
    }

    @Nested
    @DisplayName("Cycle Detection and Topological Sort")
    class CycleDetectionAndTopologicalSortTest {
        private CycleDetectionAndTopologicalSort alg;

        @BeforeEach
        void setup() {
            alg = new CycleDetectionAndTopologicalSort();
        }

        @Test
        @DisplayName("Detect cycle in directed graph")
        void testHasCycleDirectedGraph() {
            assertTrue(alg.hasCycle(directedGraphWithCycle));
        }

        @Test
        @DisplayName("No cycle in DAG")
        void testNoCycleDAG() {
            assertFalse(alg.hasCycle(dagForTopologicalSort));
        }

        @Test
        @DisplayName("No cycle in simple directed graph")
        void testNoCycleSimpleDirectedGraph() {
            assertFalse(alg.hasCycle(simpleDirectedGraph));
        }

        @Test
        @DisplayName("Topological sort on DAG (DFS-based)")
        void testTopologicalSortDFS() {
            List<GraphNode> expectedOrder = List.of(
                    getNode(dagForTopologicalSort, 5),
                    getNode(dagForTopologicalSort, 4),
                    getNode(dagForTopologicalSort, 2),
                    getNode(dagForTopologicalSort, 3),
                    getNode(dagForTopologicalSort, 0),
                    getNode(dagForTopologicalSort, 1)
            ); // One possible valid topological order
            List<GraphNode> actualOrder = alg.topologicalSort(dagForTopologicalSort);
            assertEquals(expectedOrder, actualOrder);
        }

        @Test
        @DisplayName("Topological sort on DAG (Kahn's/BFS-based)")
        void testTopologicalSortKahn() {
            List<GraphNode> expectedOrder = List.of(
                    getNode(dagForTopologicalSort, 4),
                    getNode(dagForTopologicalSort, 5),
                    getNode(dagForTopologicalSort, 0),
                    getNode(dagForTopologicalSort, 2),
                    getNode(dagForTopologicalSort, 3),
                    getNode(dagForTopologicalSort, 1)
            ); // One possible valid topological order from Kahn's. Order depends on iteration over inDegree=0 nodes.
            List<GraphNode> actualOrder = alg.topologicalSortKahn(dagForTopologicalSort);

            // Kahn's can have multiple valid outputs if multiple nodes have in-degree 0 at the same time.
            // Check if the output is a valid topological sort (i.e., for every edge (u,v), u comes before v).
            // A more robust test would verify the property rather than exact order if multiple are valid.
            // For now, let's stick to the specific order expected by the implementation.
            assertEquals(expectedOrder, actualOrder);
        }


        @Test
        @DisplayName("Topological sort throws exception for graph with cycle")
        void testTopologicalSortWithCycle() {
            assertThrows(IllegalArgumentException.class, () -> alg.topologicalSort(directedGraphWithCycle));
            assertThrows(IllegalArgumentException.class, () -> alg.topologicalSortKahn(directedGraphWithCycle));
        }

        @Test
        @DisplayName("Topological sort throws exception for undirected graph")
        void testTopologicalSortUndirected() {
            assertThrows(IllegalArgumentException.class, () -> alg.topologicalSort(simpleUndirectedGraph));
            assertThrows(IllegalArgumentException.class, () -> alg.topologicalSortKahn(simpleUndirectedGraph));
        }

        @Test
        @DisplayName("Cycle detection throws exception for undirected graph (as logic is specific to directed)")
        void testCycleDetectionUndirected() {
            assertThrows(IllegalArgumentException.class, () -> alg.hasCycle(simpleUndirectedGraph));
        }

        @Test
        @DisplayName("Topological sort on empty graph")
        void testTopologicalSortEmptyGraph() {
            Graph emptyGraph = new Graph(true);
            assertTrue(alg.topologicalSort(emptyGraph).isEmpty());
            assertTrue(alg.topologicalSortKahn(emptyGraph).isEmpty());
        }
    }

    @Nested
    @DisplayName("Prim's Algorithm (Minimum Spanning Tree)")
    class PrimAlgorithmTest {
        private PrimAlgorithm prim;

        @BeforeEach
        void setup() {
            prim = new PrimAlgorithm();
        }

        @Test
        @DisplayName("Prim's on weighted undirected graph")
        void testPrimWeightedUndirectedGraph() {
            List<GraphEdge> mst = prim.findMinimumSpanningTree(weightedUndirectedGraphForPrim);

            // Expected edges and total weight for the given graph (standard MST example)
            // Edges (node IDs): 6-7 (1), 2-8 (2), 5-6 (2), 0-1 (4), 2-5 (4), 2-3 (7), 0-7 (8), 1-2 (8), 3-4 (9), 4-5 (10), 1-7 (11), 3-5 (14), 6-8 (6), 7-8 (7)
            // Expected MST total weight: 37
            // Expected Edges (sorted by weight then by node IDs for consistent comparison):
            // 6-7 (1)
            // 2-8 (2)
            // 5-6 (2)
            // 0-1 (4)
            // 2-5 (4)
            // 2-3 (7)
            // 3-4 (9) -> this path 0-1-2-3-4 (4+8+7+9 = 28) vs 0-7-6-5-3-4 (8+1+2+14+9 = 34)
            // There are a few valid edges depending on tie-breaking.
            // Using a set for comparison to avoid order issues, and checking total weight.
            Set<String> expectedEdges = Set.of(
                    "Edge(6 -> 7, weight=1)", // G-H
                    "Edge(2 -> 8, weight=2)", // C-I
                    "Edge(5 -> 6, weight=2)", // F-G
                    "Edge(0 -> 1, weight=4)", // A-B
                    "Edge(2 -> 5, weight=4)", // C-F
                    "Edge(2 -> 3, weight=7)", // C-D
                    "Edge(3 -> 4, weight=9)"  // D-E
            ); // Sum: 1+2+2+4+4+7+9 = 29. Wait, one more node. Total 9 nodes, so 8 edges.
            // My example graph had 9 nodes (0-8), so MST should have 8 edges.
            // Re-evaluating standard Prim MST for this graph, total weight is 37.
            // 6-7 (1)
            // 2-8 (2)
            // 5-6 (2)
            // 0-1 (4)
            // 2-5 (4)
            // 2-3 (7)
            // 0-7 (8) (this path 0-7 is better than 0-1-...)
            // 3-4 (9)
            // Wait, I messed up my manual MST example. A-B(4), A-H(8), B-C(8), B-H(11), C-D(7), C-F(4), C-I(2), D-E(9), D-F(14), E-F(10), F-G(2), G-H(1), G-I(6), H-I(7)
            //
            // Correct Kruskal/Prim total weight is 37 (from online calculators)
            // Edges (sorted by weight):
            // (G,H) 1
            // (C,I) 2
            // (F,G) 2
            // (A,B) 4
            // (C,F) 4
            // (C,D) 7
            // (H,I) 7 (this one can be variable - 7 or 8 for A-H or B-C or G-I)
            // (D,E) 9
            //
            // Let's use the sum of weights, which is unambiguous.
            int expectedTotalWeight = 37;
            int actualTotalWeight = mst.stream().mapToInt(GraphEdge::getWeight).sum();

            assertEquals(expectedTotalWeight, actualTotalWeight);
            assertEquals(weightedUndirectedGraphForPrim.size() - 1, mst.size()); // MST should have V-1 edges
        }

        @Test
        @DisplayName("Prim's on a single node graph")
        void testPrimSingleNodeGraph() {
            Graph graph = new Graph(false);
            graph.addNode(new GraphNode(0));
            List<GraphEdge> mst = prim.findMinimumSpanningTree(graph);
            assertTrue(mst.isEmpty()); // An MST of a single node has 0 edges.
        }

        @Test
        @DisplayName("Prim's on an empty graph")
        void testPrimEmptyGraph() {
            Graph emptyGraph = new Graph(false);
            List<GraphEdge> mst = prim.findMinimumSpanningTree(emptyGraph);
            assertTrue(mst.isEmpty());
        }

        @Test
        @DisplayName("Prim's throws exception for directed graph")
        void testPrimDirectedGraph() {
            assertThrows(IllegalArgumentException.class, () -> prim.findMinimumSpanningTree(simpleDirectedGraph));
        }

        @Test
        @DisplayName("Prim's on disconnected graph (returns MST for reachable component)")
        void testPrimDisconnectedGraph() {
            List<GraphEdge> mst = prim.findMinimumSpanningTree(disconnectedGraph);
            // From node 0, it should find MST for {0,1,2} which has 2 edges (0-1, 1-2 or 0-2, 1-2 etc).
            // Example: 0-1 (weight 1), 1-2 (weight 1). Total weight 2.
            int expectedTotalWeight = 2; // (0-1) + (1-2) or similar minimal edges
            int actualTotalWeight = mst.stream().mapToInt(GraphEdge::getWeight).sum();
            assertEquals(expectedTotalWeight, actualTotalWeight);
            assertEquals(disconnectedGraph.size() - 4, mst.size()); // Only 3 nodes in component from 0, so 2 edges. Original graph has 7 nodes.
                                                                    // nodes {0,1,2} are connected. {3,4,5} are connected. {6} is isolated.
                                                                    // The findMinimumSpanningTree method should produce MST for one component.
            // The method currently initializes with the first node from `getAllNodes()`.
            // The `disconnectedGraph` has 0-1, 1-2, 2-0 as a triangle.
            // For a triangle with edges (0,1,1), (1,2,1), (2,0,1), MST will be 2 edges, total weight 2.
            // Nodes are {0,1,2,3,4,5,6}. Total 7 nodes.
            // If start from 0: visited={0,1,2}. Size 3. Edges: 2.
            assertEquals(2, mst.size());
        }
    }
}
```