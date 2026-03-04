```cpp
#include "../src/graph.h"
#include <vector>
#include <iostream>
#include <numeric> // For std::iota
#include <algorithm> // For std::find, std::all_of
#include <set>     // For comparing traversal orders when order doesn't strictly matter
#include <limits>  // For std::numeric_limits

// Declare traversal functions from problem1_traversals.cpp
std::pair<std::vector<int>, std::vector<int>> bfs(const Graph& g, int startNode);
std::vector<int> dfs_recursive(const Graph& g, int startNode);
std::vector<int> dfs_iterative(const Graph& g, int startNode);

// Helper function to print test results
void print_test_result(const std::string& test_name, bool passed) {
    std::cout << "[" << (passed ? "PASS" : "FAIL") << "] " << test_name << std::endl;
}

// Helper to check if two vectors are identical
bool compare_vectors(const std::vector<int>& v1, const std::vector<int>& v2) {
    return v1 == v2;
}

// Helper to check if all expected nodes are visited, regardless of order
bool check_all_visited(const std::vector<int>& traversal, const std::vector<int>& expected_reachable) {
    if (traversal.size() != expected_reachable.size()) return false;
    std::multiset<int> s1(traversal.begin(), traversal.end());
    std::multiset<int> s2(expected_reachable.begin(), expected_reachable.end());
    return s1 == s2;
}


void test_bfs() {
    std::cout << "--- Running BFS Tests ---" << std::endl;

    // Test Case 1: Simple connected graph
    Graph g1(6);
    g1.addEdge(0, 1); g1.addEdge(0, 2);
    g1.addEdge(1, 3); g1.addEdge(1, 4);
    g1.addEdge(2, 4);
    g1.addEdge(3, 5);
    g1.addEdge(4, 5);
    auto bfs_res1 = bfs(g1, 0);
    print_test_result("BFS_1: Simple graph order", compare_vectors(bfs_res1.first, {0, 1, 2, 3, 4, 5}));
    print_test_result("BFS_1: Simple graph distances", compare_vectors(bfs_res1.second, {0, 1, 1, 2, 2, 3}));

    // Test Case 2: Disconnected graph
    Graph g2(5);
    g2.addEdge(0, 1);
    g2.addEdge(0, 2);
    g2.addEdge(3, 4);
    auto bfs_res2 = bfs(g2, 0);
    print_test_result("BFS_2: Disconnected graph order", compare_vectors(bfs_res2.first, {0, 1, 2}));
    print_test_result("BFS_2: Disconnected graph distances", compare_vectors(bfs_res2.second, {0, 1, 1, std::numeric_limits<int>::max(), std::numeric_limits<int>::max()}));

    // Test Case 3: Single node graph
    Graph g3(1);
    auto bfs_res3 = bfs(g3, 0);
    print_test_result("BFS_3: Single node graph order", compare_vectors(bfs_res3.first, {0}));
    print_test_result("BFS_3: Single node graph distances", compare_vectors(bfs_res3.second, {0}));

    // Test Case 4: Empty graph
    Graph g4(0);
    auto bfs_res4 = bfs(g4, 0); // Should print error for start node out of bounds
    print_test_result("BFS_4: Empty graph order", bfs_res4.first.empty());
    print_test_result("BFS_4: Empty graph distances", bfs_res4.second.empty());

    // Test Case 5: Graph with cycle, start node is part of cycle
    Graph g5(3);
    g5.addEdge(0, 1); g5.addEdge(1, 2); g5.addEdge(2, 0);
    auto bfs_res5 = bfs(g5, 0);
    print_test_result("BFS_5: Graph with cycle order", compare_vectors(bfs_res5.first, {0, 1, 2}));
    print_test_result("BFS_5: Graph with cycle distances", compare_vectors(bfs_res5.second, {0, 1, 2}));

    // Test Case 6: Start node unreachable (should return empty path / all INF distances)
    Graph g6(3);
    g6.addEdge(1, 2);
    auto bfs_res6 = bfs(g6, 0);
    print_test_result("BFS_6: Unreachable start (no edges from start)", compare_vectors(bfs_res6.first, {0}));
    print_test_result("BFS_6: Unreachable start (distances)", compare_vectors(bfs_res6.second, {0, std::numeric_limits<int>::max(), std::numeric_limits<int>::max()}));

    // Test Case 7: Larger linear graph
    Graph g7(10);
    for (int i = 0; i < 9; ++i) g7.addEdge(i, i + 1);
    auto bfs_res7 = bfs(g7, 0);
    std::vector<int> expected_order7(10);
    std::iota(expected_order7.begin(), expected_order7.end(), 0);
    std::vector<int> expected_dist7(10);
    std::iota(expected_dist7.begin(), expected_dist7.end(), 0);
    print_test_result("BFS_7: Linear graph order", compare_vectors(bfs_res7.first, expected_order7));
    print_test_result("BFS_7: Linear graph distances", compare_vectors(bfs_res7.second, expected_dist7));

    std::cout << "-------------------------" << std::endl;
}

void test_dfs_recursive() {
    std::cout << "--- Running DFS Recursive Tests ---" << std::endl;

    // Test Case 1: Simple connected graph
    Graph g1(6);
    g1.addEdge(0, 1); g1.addEdge(0, 2);
    g1.addEdge(1, 3); g1.addEdge(1, 4);
    g1.addEdge(2, 4);
    g1.addEdge(3, 5);
    g1.addEdge(4, 5);
    std::vector<int> dfs_rec_res1 = dfs_recursive(g1, 0);
    // DFS order can vary, so check if all reachable nodes are present.
    print_test_result("DFS_Rec_1: Simple graph all reachable", check_all_visited(dfs_rec_res1, {0, 1, 2, 3, 4, 5}));

    // Test Case 2: Disconnected graph
    Graph g2(5);
    g2.addEdge(0, 1);
    g2.addEdge(0, 2);
    g2.addEdge(3, 4);
    std::vector<int> dfs_rec_res2 = dfs_recursive(g2, 0);
    print_test_result("DFS_Rec_2: Disconnected graph all reachable", check_all_visited(dfs_rec_res2, {0, 1, 2}));

    // Test Case 3: Single node graph
    Graph g3(1);
    std::vector<int> dfs_rec_res3 = dfs_recursive(g3, 0);
    print_test_result("DFS_Rec_3: Single node graph", compare_vectors(dfs_rec_res3, {0}));

    // Test Case 4: Empty graph
    Graph g4(0);
    std::vector<int> dfs_rec_res4 = dfs_recursive(g4, 0);
    print_test_result("DFS_Rec_4: Empty graph", dfs_rec_res4.empty());

    // Test Case 5: Graph with cycle
    Graph g5(3);
    g5.addEdge(0, 1); g5.addEdge(1, 2); g5.addEdge(2, 0);
    std::vector<int> dfs_rec_res5 = dfs_recursive(g5, 0);
    print_test_result("DFS_Rec_5: Graph with cycle all reachable", check_all_visited(dfs_rec_res5, {0, 1, 2}));
    
    // Test Case 6: Deeper DFS path
    Graph g6(5);
    g6.addEdge(0, 1);
    g6.addEdge(1, 2);
    g6.addEdge(2, 3);
    g6.addEdge(3, 4);
    g6.addEdge(0, 4); // Shortcut
    std::vector<int> dfs_rec_res6 = dfs_recursive(g6, 0);
    // One possible order (0,1,2,3,4). Must contain all nodes and be valid.
    print_test_result("DFS_Rec_6: Deeper path all reachable", check_all_visited(dfs_rec_res6, {0,1,2,3,4}));
    // A specific path example, note that 0->1->2->3->4 could be taken first
    // or 0->4 first. The exact order depends on adjacency list implementation.
    // So `check_all_visited` is more robust for DFS.

    std::cout << "-------------------------" << std::endl;
}

void test_dfs_iterative() {
    std::cout << "--- Running DFS Iterative Tests ---" << std::endl;

    // Test Case 1: Simple connected graph
    Graph g1(6);
    g1.addEdge(0, 1); g1.addEdge(0, 2);
    g1.addEdge(1, 3); g1.addEdge(1, 4);
    g1.addEdge(2, 4);
    g1.addEdge(3, 5);
    g1.addEdge(4, 5);
    std::vector<int> dfs_iter_res1 = dfs_iterative(g1, 0);
    print_test_result("DFS_Iter_1: Simple graph all reachable", check_all_visited(dfs_iter_res1, {0, 1, 2, 3, 4, 5}));

    // Test Case 2: Disconnected graph
    Graph g2(5);
    g2.addEdge(0, 1);
    g2.addEdge(0, 2);
    g2.addEdge(3, 4);
    std::vector<int> dfs_iter_res2 = dfs_iterative(g2, 0);
    print_test_result("DFS_Iter_2: Disconnected graph all reachable", check_all_visited(dfs_iter_res2, {0, 1, 2}));

    // Test Case 3: Single node graph
    Graph g3(1);
    std::vector<int> dfs_iter_res3 = dfs_iterative(g3, 0);
    print_test_result("DFS_Iter_3: Single node graph", compare_vectors(dfs_iter_res3, {0}));

    // Test Case 4: Empty graph
    Graph g4(0);
    std::vector<int> dfs_iter_res4 = dfs_iterative(g4, 0);
    print_test_result("DFS_Iter_4: Empty graph", dfs_iter_res4.empty());

    // Test Case 5: Graph with cycle
    Graph g5(3);
    g5.addEdge(0, 1); g5.addEdge(1, 2); g5.addEdge(2, 0);
    std::vector<int> dfs_iter_res5 = dfs_iterative(g5, 0);
    print_test_result("DFS_Iter_5: Graph with cycle all reachable", check_all_visited(dfs_iter_res5, {0, 1, 2}));
    
    // Test Case 6: Deeper DFS path
    Graph g6(5);
    g6.addEdge(0, 1);
    g6.addEdge(1, 2);
    g6.addEdge(2, 3);
    g6.addEdge(3, 4);
    g6.addEdge(0, 4); // Shortcut
    std::vector<int> dfs_iter_res6 = dfs_iterative(g6, 0);
    print_test_result("DFS_Iter_6: Deeper path all reachable", check_all_visited(dfs_iter_res6, {0,1,2,3,4}));

    std::cout << "-------------------------" << std::endl;
}


int main() {
    std::cout << "Running all traversal tests...\n" << std::endl;
    test_bfs();
    test_dfs_recursive();
    test_dfs_iterative();
    std::cout << "\nAll traversal tests finished." << std::endl;
    return 0;
}
```