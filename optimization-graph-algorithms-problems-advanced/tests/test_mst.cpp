```cpp
#include "../src/graph.h"
#include <vector>
#include <iostream>
#include <numeric>   // For std::iota
#include <algorithm> // For std::sort, std::all_of

// Declare Kruskal's function and Edge struct from problem3_mst.cpp
std::pair<int, std::vector<Edge>> kruskal(const Graph& g);

// Helper function to print test results
void print_test_result(const std::string& test_name, bool passed) {
    std::cout << "[" << (passed ? "PASS" : "FAIL") << "] " << test_name << std::endl;
}

// Helper to compare two vectors of edges (order doesn't matter, but contents do)
bool compare_edge_vectors(std::vector<Edge> v1, std::vector<Edge> v2) {
    if (v1.size() != v2.size()) return false;
    // Normalize edges (u,v) to ensure u <= v for consistent comparison
    for (auto& e : v1) if (e.u > e.v) std::swap(e.u, e.v);
    for (auto& e : v2) if (e.u > e.v) std::swap(e.u, e.v);
    
    // Sort both vectors for comparison
    std::sort(v1.begin(), v1.end(), [](const Edge& a, const Edge& b){
        if (a.weight != b.weight) return a.weight < b.weight;
        if (a.u != b.u) return a.u < b.u;
        return a.v < b.v;
    });
    std::sort(v2.begin(), v2.end(), [](const Edge& a, const Edge& b){
        if (a.weight != b.weight) return a.weight < b.weight;
        if (a.u != b.u) return a.u < b.u;
        return a.v < b.v;
    });

    for (size_t i = 0; i < v1.size(); ++i) {
        if (v1[i].weight != v2[i].weight || v1[i].u != v2[i].u || v1[i].v != v2[i].v) {
            return false;
        }
    }
    return true;
}

void test_kruskal() {
    std::cout << "--- Running Kruskal's MST Tests ---" << std::endl;

    // Test Case 1: Standard graph from example
    Graph g1(9);
    g1.addEdge(0, 1, 4); g1.addEdge(1, 0, 4);
    g1.addEdge(0, 7, 8); g1.addEdge(7, 0, 8);
    g1.addEdge(1, 2, 8); g1.addEdge(2, 1, 8);
    g1.addEdge(1, 7, 11); g1.addEdge(7, 1, 11);
    g1.addEdge(2, 3, 7); g1.addEdge(3, 2, 7);
    g1.addEdge(2, 8, 2); g1.addEdge(8, 2, 2);
    g1.addEdge(2, 5, 4); g1.addEdge(5, 2, 4);
    g1.addEdge(3, 4, 9); g1.addEdge(4, 3, 9);
    g1.addEdge(3, 5, 14); g1.addEdge(5, 3, 14);
    g1.addEdge(4, 5, 10); g1.addEdge(5, 4, 10);
    g1.addEdge(5, 6, 2); g1.addEdge(6, 5, 2);
    g1.addEdge(6, 7, 1); g1.addEdge(7, 6, 1);
    g1.addEdge(6, 8, 6); g1.addEdge(8, 6, 6);
    g1.addEdge(7, 8, 7); g1.addEdge(8, 7, 7);

    auto mst_res1 = kruskal(g1);
    print_test_result("Kruskal_1: Standard graph total weight", mst_res1.first == 37);
    std::vector<Edge> expected_edges1 = {
        {1, 6, 7}, {2, 2, 8}, {2, 5, 6}, {4, 0, 1},
        {4, 2, 5}, {7, 2, 3}, {7, 7, 8}, {9, 3, 4}
    };
    print_test_result("Kruskal_1: Standard graph MST edges", compare_edge_vectors(mst_res1.second, expected_edges1));

    // Test Case 2: Disconnected graph (should find MSF)
    Graph g2(6);
    g2.addEdge(0, 1, 1); g2.addEdge(1, 0, 1);
    g2.addEdge(0, 2, 5); g2.addEdge(2, 0, 5);
    g2.addEdge(3, 4, 2); g2.addEdge(4, 3, 2);
    g2.addEdge(4, 5, 3); g2.addEdge(5, 4, 3);
    auto mst_res2 = kruskal(g2);
    print_test_result("Kruskal_2: Disconnected graph total weight", mst_res2.first == 6); // 1 + 2 + 3
    std::vector<Edge> expected_edges2 = {
        {1, 0, 1}, {2, 3, 4}, {3, 4, 5}
    };
    print_test_result("Kruskal_2: Disconnected graph MSF edges", compare_edge_vectors(mst_res2.second, expected_edges2));

    // Test Case 3: Single node graph
    Graph g3(1);
    auto mst_res3 = kruskal(g3);
    print_test_result("Kruskal_3: Single node graph total weight", mst_res3.first == 0);
    print_test_result("Kruskal_3: Single node graph MST edges", mst_res3.second.empty());

    // Test Case 4: Empty graph
    Graph g4(0);
    auto mst_res4 = kruskal(g4);
    print_test_result("Kruskal_4: Empty graph total weight", mst_res4.first == 0);
    print_test_result("Kruskal_4: Empty graph MST edges", mst_res4.second.empty());

    // Test Case 5: Linear graph
    Graph g5(4);
    g5.addEdge(0, 1, 10); g5.addEdge(1, 0, 10);
    g5.addEdge(1, 2, 1); g5.addEdge(2, 1, 1);
    g5.addEdge(2, 3, 5); g5.addEdge(3, 2, 5);
    auto mst_res5 = kruskal(g5);
    print_test_result("Kruskal_5: Linear graph total weight", mst_res5.first == 16); // 10 + 1 + 5
    std::vector<Edge> expected_edges5 = {{1, 1, 2}, {5, 2, 3}, {10, 0, 1}};
    print_test_result("Kruskal_5: Linear graph MST edges", compare_edge_vectors(mst_res5.second, expected_edges5));

    // Test Case 6: Star graph
    Graph g6(5); // 0 is center, 1,2,3,4 are leaves
    g6.addEdge(0, 1, 1); g6.addEdge(1, 0, 1);
    g6.addEdge(0, 2, 5); g6.addEdge(2, 0, 5);
    g6.addEdge(0, 3, 2); g6.addEdge(3, 0, 2);
    g6.addEdge(0, 4, 4); g6.addEdge(4, 0, 4);
    auto mst_res6 = kruskal(g6);
    print_test_result("Kruskal_6: Star graph total weight", mst_res6.first == 12); // 1+5+2+4
    std::vector<Edge> expected_edges6 = {{1,0,1}, {2,0,3}, {4,0,4}, {5,0,2}};
    print_test_result("Kruskal_6: Star graph MST edges", compare_edge_vectors(mst_res6.second, expected_edges6));


    std::cout << "-----------------------------------" << std::endl;
}

int main() {
    std::cout << "Running all MST tests...\n" << std::endl;
    test_kruskal();
    std::cout << "\nAll MST tests finished." << std::endl;
    return 0;
}
```