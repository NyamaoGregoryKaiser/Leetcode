```cpp
#include <iostream>
#include <string>
#include <vector>
#include "graph.h"
#include "graph_problems.cpp" // Include the implementation file directly for easier compilation
#include "../tests/test_graph_problems.cpp" // Include test runner
#include "../benchmarks/benchmark_runner.cpp" // Include benchmark runner

// Main function to drive the application
int main(int argc, char* argv[]) {
    // Check command line arguments for running tests or benchmarks
    if (argc > 1) {
        std::string arg = argv[1];
        if (arg == "test") {
            TestFramework::runAllTests();
        } else if (arg == "benchmark") {
            runBenchmarks();
        } else {
            std::cout << "Usage: " << argv[0] << " [test|benchmark]" << std::endl;
            std::cout << "  'test' to run unit tests." << std::endl;
            std::cout << "  'benchmark' to run performance benchmarks." << std::endl;
        }
    } else {
        std::cout << "--- Graph Algorithms Interview Project ---" << std::endl;
        std::cout << "Run with 'test' argument to execute unit tests: ./graph_solver test" << std::endl;
        std::cout << "Run with 'benchmark' argument to execute performance benchmarks: ./graph_solver benchmark" << std::endl;
        std::cout << "\n--- Example Usage (Manual) ---" << std::endl;

        // Example: Shortest Path Unweighted BFS
        Graph g_bfs(6);
        g_bfs.addEdge(0, 1); g_bfs.addEdge(0, 2);
        g_bfs.addEdge(1, 3); g_bfs.addEdge(2, 4);
        g_bfs.addEdge(3, 5); g_bfs.addEdge(4, 5);
        std::cout << "BFS - Shortest Path from 0 to 5:" << std::endl;
        std::vector<int> path = GraphAlgorithms::shortestPathUnweightedBFS(g_bfs, 0, 5);
        if (!path.empty()) {
            for (size_t i = 0; i < path.size(); ++i) {
                std::cout << path[i] << (i == path.size() - 1 ? "" : " -> ");
            }
            std::cout << std::endl; // Expected: 0 -> 2 -> 4 -> 5 (or 0 -> 1 -> 3 -> 5)
        } else {
            std::cout << "No path found." << std::endl;
        }

        // Example: Dijkstra's Algorithm
        Graph g_dijkstra(5);
        g_dijkstra.addWeightedEdge(0, 1, 10);
        g_dijkstra.addWeightedEdge(0, 2, 3);
        g_dijkstra.addWeightedEdge(1, 3, 2);
        g_dijkstra.addWeightedEdge(2, 1, 4);
        g_dijkstra.addWeightedEdge(2, 3, 8);
        g_dijkstra.addWeightedEdge(2, 4, 2);
        g_dijkstra.addWeightedEdge(3, 4, 5);
        std::cout << "\nDijkstra - Shortest Distances from 0:" << std::endl;
        std::vector<int> distances = GraphAlgorithms::dijkstra(g_dijkstra, 0);
        for (size_t i = 0; i < distances.size(); ++i) {
            if (distances[i] == std::numeric_limits<int>::max()) {
                std::cout << "0 -> " << i << ": INF" << std::endl;
            } else {
                std::cout << "0 -> " << i << ": " << distances[i] << std::endl;
            }
        }
        // Expected: 0->0:0, 0->1:7, 0->2:3, 0->3:9, 0->4:5

        // Example: Cycle Detection
        Graph g_cycle(4);
        g_cycle.addEdge(0, 1);
        g_cycle.addEdge(1, 2);
        g_cycle.addEdge(2, 0); // Creates a cycle 0->1->2->0
        std::cout << "\nCycle Detection (0->1->2->0): " << (GraphAlgorithms::detectCycleDirectedDFS(g_cycle) ? "Cycle detected!" : "No cycle.") << std::endl; // Expected: Cycle detected!

        Graph g_no_cycle(3);
        g_no_cycle.addEdge(0, 1);
        g_no_cycle.addEdge(1, 2);
        std::cout << "Cycle Detection (0->1->2): " << (GraphAlgorithms::detectCycleDirectedDFS(g_no_cycle) ? "Cycle detected!" : "No cycle.") << std::endl; // Expected: No cycle.

        // Example: Topological Sort
        Graph g_topo(6); // As in Kahn's algorithm example
        g_topo.addEdge(5, 2); g_topo.addEdge(5, 0);
        g_topo.addEdge(4, 0); g_topo.addEdge(4, 1);
        g_topo.addEdge(2, 3);
        g_topo.addEdge(3, 1);
        std::cout << "\nTopological Sort:" << std::endl;
        std::vector<int> topo_order = GraphAlgorithms::topologicalSortKahn(g_topo);
        if (!topo_order.empty()) {
            for (int node : topo_order) {
                std::cout << node << " ";
            }
            std::cout << std::endl; // Expected (one possible): 4 5 0 2 3 1
        } else {
            std::cout << "Graph contains a cycle, topological sort not possible." << std::endl;
        }

        Graph g_topo_cycle(3);
        g_topo_cycle.addEdge(0, 1); g_topo_cycle.addEdge(1, 2); g_topo_cycle.addEdge(2, 0);
        std::cout << "\nTopological Sort (with cycle):" << std::endl;
        std::vector<int> topo_order_cycle = GraphAlgorithms::topologicalSortKahn(g_topo_cycle);
        if (!topo_order_cycle.empty()) {
            for (int node : topo_order_cycle) {
                std::cout << node << " ";
            }
            std::cout << std::endl;
        } else {
            std::cout << "Graph contains a cycle, topological sort not possible." << std::endl; // Expected
        }
    }

    return 0;
}
```