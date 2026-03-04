```cpp
#include "../src/graph.h"
#include <vector>
#include <iostream>
#include <numeric> // For std::iota
#include <limits>  // For std::numeric_limits

// Declare Dijkstra's function from problem2_shortest_path.cpp
std::vector<int> dijkstra(const Graph& g, int startNode);

// Helper function to print test results
void print_test_result(const std::string& test_name, bool passed) {
    std::cout << "[" << (passed ? "PASS" : "FAIL") << "] " << test_name << std::endl;
}

// Helper to compare two vectors
bool compare_vectors(const std::vector<int>& v1, const std::vector<int>& v2) {
    return v1 == v2;
}

void test_dijkstra() {
    std::cout << "--- Running Dijkstra's Shortest Path Tests ---" << std::endl;
    const int INF = std::numeric_limits<int>::max();

    // Test Case 1: Simple connected graph
    Graph g1(5);
    g1.addEdge(0, 1, 10);
    g1.addEdge(0, 2, 3);
    g1.addEdge(1, 2, 1);
    g1.addEdge(1, 3, 2);
    g1.addEdge(2, 1, 4);
    g1.addEdge(2, 3, 8);
    g1.addEdge(2, 4, 2);
    g1.addEdge(3, 4, 5);
    std::vector<int> dist1 = dijkstra(g1, 0);
    print_test_result("Dijkstra_1: Simple graph from 0", compare_vectors(dist1, {0, 7, 3, 9, 5}));

    // Test Case 2: Disconnected graph
    Graph g2(4);
    g2.addEdge(0, 1, 5);
    g2.addEdge(2, 3, 10);
    std::vector<int> dist2 = dijkstra(g2, 0);
    print_test_result("Dijkstra_2: Disconnected graph from 0", compare_vectors(dist2, {0, 5, INF, INF}));

    // Test Case 3: Single node graph
    Graph g3(1);
    std::vector<int> dist3 = dijkstra(g3, 0);
    print_test_result("Dijkstra_3: Single node graph from 0", compare_vectors(dist3, {0}));

    // Test Case 4: Empty graph
    Graph g4(0);
    std::vector<int> dist4 = dijkstra(g4, 0); // Will print an error for start node
    print_test_result("Dijkstra_4: Empty graph", dist4.empty());

    // Test Case 5: All nodes unreachable from start
    Graph g5(3);
    g5.addEdge(1, 2, 5);
    std::vector<int> dist5 = dijkstra(g5, 0);
    print_test_result("Dijkstra_5: Start 0, other nodes unreachable", compare_vectors(dist5, {0, INF, INF}));

    // Test Case 6: Larger graph, dense-ish
    Graph g6(6);
    g6.addEdge(0, 1, 7); g6.addEdge(0, 2, 9); g6.addEdge(0, 5, 14);
    g6.addEdge(1, 2, 10); g6.addEdge(1, 3, 15);
    g6.addEdge(2, 3, 11); g6.addEdge(2, 5, 2);
    g6.addEdge(3, 4, 6);
    g6.addEdge(4, 5, 9);
    g6.addEdge(5, 4, 9); // Undirected link
    
    std::vector<int> dist6 = dijkstra(g6, 0);
    // Expected:
    // 0 -> 0 : 0
    // 0 -> 1 : 7
    // 0 -> 2 : 9
    // 0 -> 3 : 0->2->3 = 9+11 = 20 (shorter than 0->1->3 = 7+15=22)
    // 0 -> 4 : 0->2->5->4 = 9+2+9 = 20
    // 0 -> 5 : 0->2->5 = 9+2 = 11 (shorter than 0->5=14)
    print_test_result("Dijkstra_6: Larger dense graph from 0", compare_vectors(dist6, {0, 7, 9, 20, 20, 11}));

    // Test Case 7: Graph where direct path is longer than indirect path
    Graph g7(3);
    g7.addEdge(0, 1, 10);
    g7.addEdge(0, 2, 1);
    g7.addEdge(2, 1, 2);
    std::vector<int> dist7 = dijkstra(g7, 0);
    // 0->1 is 10. 0->2->1 is 1+2=3.
    print_test_result("Dijkstra_7: Indirect path shorter", compare_vectors(dist7, {0, 3, 1}));

    // Test Case 8: Graph with no edges
    Graph g8(5);
    std::vector<int> dist8 = dijkstra(g8, 0);
    print_test_result("Dijkstra_8: No edges from 0", compare_vectors(dist8, {0, INF, INF, INF, INF}));


    std::cout << "----------------------------------------------" << std::endl;
}

int main() {
    std::cout << "Running all shortest path tests...\n" << std::endl;
    test_dijkstra();
    std::cout << "\nAll shortest path tests finished." << std::endl;
    return 0;
}
```