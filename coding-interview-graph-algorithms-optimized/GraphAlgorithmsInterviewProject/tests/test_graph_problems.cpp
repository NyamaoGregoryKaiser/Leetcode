```cpp
#include "../src/graph.h"
#include "../src/graph_problems.cpp" // Include the implementation file directly for testing
#include <iostream>
#include <vector>
#include <string>
#include <algorithm> // For std::sort

// Custom testing framework
namespace TestFramework {

    int total_tests = 0;
    int passed_tests = 0;

    // Helper to print vector contents
    template <typename T>
    std::string vectorToString(const std::vector<T>& vec) {
        if (vec.empty()) return "{}";
        std::string s = "{";
        for (size_t i = 0; i < vec.size(); ++i) {
            s += std::to_string(vec[i]);
            if (i < vec.size() - 1) s += ", ";
        }
        s += "}";
        return s;
    }

    // Helper for comparing vectors for equality
    template <typename T>
    bool compareVectors(const std::vector<T>& actual, const std::vector<T>& expected) {
        if (actual.size() != expected.size()) {
            return false;
        }
        for (size_t i = 0; i < actual.size(); ++i) {
            if (actual[i] != expected[i]) {
                return false;
            }
        }
        return true;
    }

    // Test function for shortestPathUnweightedBFS
    void testShortestPathUnweightedBFS(const std::string& testName, const Graph& g, int start, int end, const std::vector<int>& expected) {
        total_tests++;
        std::vector<int> actual = GraphAlgorithms::shortestPathUnweightedBFS(g, start, end);
        if (compareVectors(actual, expected)) {
            std::cout << "[PASS] " << testName << std::endl;
            passed_tests++;
        } else {
            std::cout << "[FAIL] " << testName << std::endl;
            std::cout << "       Expected: " << vectorToString(expected) << std::endl;
            std::cout << "       Actual:   " << vectorToString(actual) << std::endl;
        }
    }

    // Test function for dijkstra
    void testDijkstra(const std::string& testName, const Graph& g, int start, const std::vector<int>& expected) {
        total_tests++;
        std::vector<int> actual = GraphAlgorithms::dijkstra(g, start);
        if (compareVectors(actual, expected)) {
            std::cout << "[PASS] " << testName << std::endl;
            passed_tests++;
        } else {
            std::cout << "[FAIL] " << testName << std::endl;
            std::cout << "       Expected distances: " << vectorToString(expected) << std::endl;
            std::cout << "       Actual distances:   " << vectorToString(actual) << std::endl;
        }
    }

    // Test function for detectCycleDirectedDFS
    void testDetectCycleDirectedDFS(const std::string& testName, const Graph& g, bool expected) {
        total_tests++;
        bool actual = GraphAlgorithms::detectCycleDirectedDFS(g);
        if (actual == expected) {
            std::cout << "[PASS] " << testName << std::endl;
            passed_tests++;
        } else {
            std::cout << "[FAIL] " << testName << std::endl;
            std::cout << "       Expected: " << (expected ? "true" : "false") << std::endl;
            std::cout << "       Actual:   " << (actual ? "true" : "false") << std::endl;
        }
    }

    // Test function for topologicalSortKahn
    // For topological sort, multiple valid orders might exist.
    // So, we'll compare sets of neighbors or simply verify properties.
    // For simplicity here, we assume a unique expected order or compare against one known valid order.
    // A more robust test for topological sort would verify if the output is *a* valid topological sort,
    // which involves checking edge constraints. For now, we compare against a specific expected ordering.
    void testTopologicalSortKahn(const std::string& testName, const Graph& g, const std::vector<int>& expected) {
        total_tests++;
        std::vector<int> actual = GraphAlgorithms::topologicalSortKahn(g);
        // Special handling for empty result (cycle detected)
        if (expected.empty() && actual.empty()) {
             std::cout << "[PASS] " << testName << " (Cycle detected as expected)" << std::endl;
             passed_tests++;
             return;
        }

        if (compareVectors(actual, expected)) {
            std::cout << "[PASS] " << testName << std::endl;
            passed_tests++;
        } else {
            std::cout << "[FAIL] " << testName << std::endl;
            std::cout << "       Expected: " << vectorToString(expected) << std::endl;
            std::cout << "       Actual:   " << vectorToString(actual) << std::endl;
        }
    }

    void runAllTests() {
        std::cout << "--- Running Graph Algorithm Tests ---" << std::endl;

        // --- Test Cases for Shortest Path in Unweighted Graph (BFS) ---
        {
            Graph g(5); // 0-1, 0-2, 1-3, 2-4, 3-4
            g.addEdge(0, 1); g.addEdge(0, 2);
            g.addEdge(1, 3);
            g.addEdge(2, 4);
            g.addEdge(3, 4);
            testShortestPathUnweightedBFS("BFS: Simple path 0->4", g, 0, 4, {0, 2, 4});
            testShortestPathUnweightedBFS("BFS: Simple path 0->3", g, 0, 3, {0, 1, 3});
            testShortestPathUnweightedBFS("BFS: Source=Dest 0->0", g, 0, 0, {0});
            testShortestPathUnweightedBFS("BFS: No path 4->0", g, 4, 0, {}); // Directed graph, no reverse path
        }
        {
            Graph g(4); // Disconnected
            g.addEdge(0, 1);
            testShortestPathUnweightedBFS("BFS: Disconnected 0->2", g, 0, 2, {});
            testShortestPathUnweightedBFS("BFS: Disconnected 0->1", g, 0, 1, {0, 1});
        }
        {
            Graph g(1); // Single node
            testShortestPathUnweightedBFS("BFS: Single node 0->0", g, 0, 0, {0});
        }
        {
            Graph g(6); // Complex path
            g.addEdge(0,1); g.addEdge(0,2);
            g.addEdge(1,3); g.addEdge(2,3);
            g.addEdge(3,4); g.addEdge(3,5);
            g.addEdge(4,5);
            testShortestPathUnweightedBFS("BFS: Complex path 0->5", g, 0, 5, {0,1,3,5}); // Path via 1 is shorter
        }

        std::cout << std::endl;

        // --- Test Cases for Dijkstra's Algorithm ---
        const int INF = std::numeric_limits<int>::max();
        {
            Graph g(5); // Example from slides/textbooks
            g.addWeightedEdge(0, 1, 10);
            g.addWeightedEdge(0, 2, 3);
            g.addWeightedEdge(1, 3, 2);
            g.addWeightedEdge(2, 1, 4);
            g.addWeightedEdge(2, 3, 8);
            g.addWeightedEdge(2, 4, 2);
            g.addWeightedEdge(3, 4, 5);
            g.addWeightedEdge(4, 3, 7);
            testDijkstra("Dijkstra: Simple weighted graph 0->All", g, 0, {0, 7, 3, 9, 5}); // Expected: dist[0]=0, dist[1]=7 (0->2->1), dist[2]=3, dist[3]=9 (0->2->4->3), dist[4]=5 (0->2->4)
        }
        {
            Graph g(4); // Disconnected weighted graph
            g.addWeightedEdge(0, 1, 1);
            g.addWeightedEdge(2, 3, 1);
            testDijkstra("Dijkstra: Disconnected graph 0->All", g, 0, {0, 1, INF, INF});
        }
        {
            Graph g(1); // Single node weighted
            testDijkstra("Dijkstra: Single node 0->All", g, 0, {0});
        }
        {
            Graph g(3); // Linear graph 0->1->2
            g.addWeightedEdge(0,1,1);
            g.addWeightedEdge(1,2,1);
            testDijkstra("Dijkstra: Linear graph 0->All", g, 0, {0, 1, 2});
        }
        {
            Graph g(4); // 0-1(1), 0-2(5), 1-2(1), 1-3(2), 2-3(1)
            g.addWeightedEdge(0,1,1);
            g.addWeightedEdge(0,2,5);
            g.addWeightedEdge(1,2,1);
            g.addWeightedEdge(1,3,2);
            g.addWeightedEdge(2,3,1);
            testDijkstra("Dijkstra: More complex 0->All", g, 0, {0,1,2,3}); // 0->1->2->3 is 1+1+1=3. 0->1->3 is 1+2=3.
        }

        std::cout << std::endl;

        // --- Test Cases for Cycle Detection in Directed Graph (DFS) ---
        {
            Graph g(4); // No cycle: 0->1->2->3
            g.addEdge(0, 1); g.addEdge(1, 2); g.addEdge(2, 3);
            testDetectCycleDirectedDFS("Cycle Detect: No cycle (linear)", g, false);
        }
        {
            Graph g(4); // Cycle: 0->1->2->0
            g.addEdge(0, 1); g.addEdge(1, 2); g.addEdge(2, 0);
            testDetectCycleDirectedDFS("Cycle Detect: Simple cycle 0->1->2->0", g, true);
        }
        {
            Graph g(4); // Self-loop cycle: 0->0
            g.addEdge(0, 0);
            testDetectCycleDirectedDFS("Cycle Detect: Self-loop", g, true);
        }
        {
            Graph g(5); // Cycle in one component, no cycle in another
            g.addEdge(0, 1); g.addEdge(1, 2); g.addEdge(2, 0); // Cycle
            g.addEdge(3, 4); // No cycle
            testDetectCycleDirectedDFS("Cycle Detect: Disconnected with cycle", g, true);
        }
        {
            Graph g(5); // No cycle in disconnected
            g.addEdge(0,1);
            g.addEdge(2,3); g.addEdge(3,4);
            testDetectCycleDirectedDFS("Cycle Detect: Disconnected no cycle", g, false);
        }
        {
            Graph g(1); // Single node, no self-loop
            testDetectCycleDirectedDFS("Cycle Detect: Single node no cycle", g, false);
        }
        {
            Graph g(0); // Empty graph
            testDetectCycleDirectedDFS("Cycle Detect: Empty graph", g, false);
        }


        std::cout << std::endl;

        // --- Test Cases for Topological Sort (Kahn's Algorithm) ---
        {
            Graph g(6); // Example DAG from lecture
            g.addEdge(5, 2); g.addEdge(5, 0);
            g.addEdge(4, 0); g.addEdge(4, 1);
            g.addEdge(2, 3);
            g.addEdge(3, 1);
            // One possible valid order: {5, 4, 2, 0, 3, 1}
            // Another: {4, 5, 0, 2, 3, 1}
            // Another: {5, 4, 0, 2, 3, 1}
            testTopologicalSortKahn("Topological Sort: Simple DAG", g, {4, 5, 0, 2, 3, 1}); // Using default output of current Kahn implementation
        }
        {
            Graph g(4); // Linear DAG: 0->1->2->3
            g.addEdge(0, 1); g.addEdge(1, 2); g.addEdge(2, 3);
            testTopologicalSortKahn("Topological Sort: Linear DAG", g, {0, 1, 2, 3});
        }
        {
            Graph g(3); // Cycle: 0->1->2->0
            g.addEdge(0, 1); g.addEdge(1, 2); g.addEdge(2, 0);
            testTopologicalSortKahn("Topological Sort: Graph with cycle", g, {}); // Expect empty result
        }
        {
            Graph g(5); // Disconnected DAG
            g.addEdge(0, 1);
            g.addEdge(2, 3);
            testTopologicalSortKahn("Topological Sort: Disconnected DAG", g, {0, 2, 3, 1, 4}); // One possible order
        }
        {
            Graph g(1); // Single node DAG
            testTopologicalSortKahn("Topological Sort: Single node", g, {0});
        }
        {
            Graph g(0); // Empty graph
            testTopologicalSortKahn("Topological Sort: Empty graph", g, {});
        }
        {
            Graph g(4); // A -> B, A -> C, B -> D, C -> D
            g.addEdge(0, 1); g.addEdge(0, 2);
            g.addEdge(1, 3); g.addEdge(2, 3);
            testTopologicalSortKahn("Topological Sort: Diamond DAG", g, {0, 1, 2, 3});
        }


        std::cout << "\n--- Test Summary ---" << std::endl;
        std::cout << "Total Tests: " << total_tests << std::endl;
        std::cout << "Passed:      " << passed_tests << std::endl;
        std::cout << "Failed:      " << (total_tests - passed_tests) << std::endl;
    }

} // namespace TestFramework

```