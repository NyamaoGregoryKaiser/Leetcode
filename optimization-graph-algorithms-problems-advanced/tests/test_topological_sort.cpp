```cpp
#include "../src/graph.h"
#include <vector>
#include <iostream>
#include <numeric>   // For std::iota
#include <algorithm> // For std::find, std::all_of

// Declare topological sort functions from problem4_topological_sort.cpp
std::vector<int> kahn_topological_sort(const Graph& g);
std::vector<int> dfs_topological_sort(const Graph& g);

// Helper function to print test results
void print_test_result(const std::string& test_name, bool passed) {
    std::cout << "[" << (passed ? "PASS" : "FAIL") << "] " << test_name << std::endl;
}

// Helper to check if a given order is a valid topological sort
// A valid topological sort requires that for every directed edge u -> v, u comes before v.
bool is_valid_topological_sort(const Graph& g, const std::vector<int>& order) {
    if (order.empty() && g.getV() > 0) { // If order is empty but graph has nodes, it implies a cycle or error
        return false;
    }
    if (order.size() != g.getV()) { // Should contain all vertices if graph is a DAG
        return false;
    }

    std::vector<int> pos(g.getV());
    for (int i = 0; i < order.size(); ++i) {
        pos[order[i]] = i; // Store position of each node in the sorted order
    }

    const AdjacencyList& adj = g.getAdj();
    for (int u = 0; u < g.getV(); ++u) {
        for (const auto& edge : adj[u]) {
            int v = edge.first;
            // If u -> v exists, u must appear before v in the topological order
            if (pos[u] > pos[v]) {
                return false; // Invalid order: u comes after v
            }
        }
    }
    return true;
}

void test_kahn_topological_sort() {
    std::cout << "--- Running Kahn's Topological Sort Tests ---" << std::endl;

    // Test Case 1: Standard DAG
    Graph g1(6);
    g1.addEdge(5, 0); g1.addEdge(4, 0);
    g1.addEdge(5, 2); g1.addEdge(4, 1);
    g1.addEdge(2, 3); g1.addEdge(3, 1);
    std::vector<int> kahn_order1 = kahn_topological_sort(g1);
    print_test_result("Kahn_1: Standard DAG", is_valid_topological_sort(g1, kahn_order1));

    // Test Case 2: Graph with a cycle
    Graph g2(4);
    g2.addEdge(0, 1); g2.addEdge(1, 2); g2.addEdge(2, 0); // Cycle
    g2.addEdge(2, 3);
    std::vector<int> kahn_order2 = kahn_topological_sort(g2);
    print_test_result("Kahn_2: Graph with cycle (should be empty)", kahn_order2.empty());
    
    // Test Case 3: Disconnected DAG
    Graph g3(5);
    g3.addEdge(0, 1);
    g3.addEdge(2, 3);
    g3.addEdge(3, 4);
    std::vector<int> kahn_order3 = kahn_topological_sort(g3);
    print_test_result("Kahn_3: Disconnected DAG", is_valid_topological_sort(g3, kahn_order3));

    // Test Case 4: Single node graph
    Graph g4(1);
    std::vector<int> kahn_order4 = kahn_topological_sort(g4);
    print_test_result("Kahn_4: Single node graph", is_valid_topological_sort(g4, kahn_order4));

    // Test Case 5: Empty graph
    Graph g5(0);
    std::vector<int> kahn_order5 = kahn_topological_sort(g5);
    print_test_result("Kahn_5: Empty graph", kahn_order5.empty());

    // Test Case 6: Linear DAG
    Graph g6(5);
    g6.addEdge(0, 1); g6.addEdge(1, 2); g6.addEdge(2, 3); g6.addEdge(3, 4);
    std::vector<int> kahn_order6 = kahn_topological_sort(g6);
    print_test_result("Kahn_6: Linear DAG", is_valid_topological_sort(g6, kahn_order6));
    print_test_result("Kahn_6: Linear DAG specific order", (kahn_order6 == std::vector<int>{0,1,2,3,4}));


    std::cout << "------------------------------------------" << std::endl;
}

void test_dfs_topological_sort() {
    std::cout << "--- Running DFS-based Topological Sort Tests ---" << std::endl;

    // Test Case 1: Standard DAG
    Graph g1(6);
    g1.addEdge(5, 0); g1.addEdge(4, 0);
    g1.addEdge(5, 2); g1.addEdge(4, 1);
    g1.addEdge(2, 3); g1.addEdge(3, 1);
    std::vector<int> dfs_order1 = dfs_topological_sort(g1);
    print_test_result("DFS_Topo_1: Standard DAG", is_valid_topological_sort(g1, dfs_order1));

    // Test Case 2: Graph with a cycle
    Graph g2(4);
    g2.addEdge(0, 1); g2.addEdge(1, 2); g2.addEdge(2, 0); // Cycle
    g2.addEdge(2, 3);
    std::vector<int> dfs_order2 = dfs_topological_sort(g2);
    print_test_result("DFS_Topo_2: Graph with cycle (should be empty)", dfs_order2.empty());
    
    // Test Case 3: Disconnected DAG
    Graph g3(5);
    g3.addEdge(0, 1);
    g3.addEdge(2, 3);
    g3.addEdge(3, 4);
    std::vector<int> dfs_order3 = dfs_topological_sort(g3);
    print_test_result("DFS_Topo_3: Disconnected DAG", is_valid_topological_sort(g3, dfs_order3));

    // Test Case 4: Single node graph
    Graph g4(1);
    std::vector<int> dfs_order4 = dfs_topological_sort(g4);
    print_test_result("DFS_Topo_4: Single node graph", is_valid_topological_sort(g4, dfs_order4));

    // Test Case 5: Empty graph
    Graph g5(0);
    std::vector<int> dfs_order5 = dfs_topological_sort(g5);
    print_test_result("DFS_Topo_5: Empty graph", dfs_order5.empty());

    // Test Case 6: Linear DAG
    Graph g6(5);
    g6.addEdge(0, 1); g6.addEdge(1, 2); g6.addEdge(2, 3); g6.addEdge(3, 4);
    std::vector<int> dfs_order6 = dfs_topological_sort(g6);
    print_test_result("DFS_Topo_6: Linear DAG", is_valid_topological_sort(g6, dfs_order6));
    // DFS topological sort typically reverses the "finish order".
    // For 0->1->2->3->4, DFS might visit 0, then 1, then 2, then 3, then 4.
    // When returning from 4, push 4. Then from 3, push 3, etc.
    // So the stack would be [0,1,2,3,4] (bottom to top), meaning result is 0,1,2,3,4.
    print_test_result("DFS_Topo_6: Linear DAG specific order", (dfs_order6 == std::vector<int>{0,1,2,3,4}));


    std::cout << "------------------------------------------" << std::endl;
}


int main() {
    std::cout << "Running all topological sort tests...\n" << std::endl;
    test_kahn_topological_sort();
    test_dfs_topological_sort();
    std::cout << "\nAll topological sort tests finished." << std::endl;
    return 0;
}
```