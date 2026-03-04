```cpp
#include "graph.h"
#include <vector>
#include <queue>
#include <stack>
#include <iostream>
#include <algorithm> // For std::reverse

/**
 * @brief Performs a Topological Sort using Kahn's algorithm (BFS-based).
 *        Kahn's algorithm works by repeatedly finding nodes with no incoming edges,
 *        adding them to the sort, and removing them from the graph.
 * @param g The graph to sort (must be a Directed Acyclic Graph - DAG).
 * @return A vector containing the topological order of nodes. Returns an empty vector
 *         if the graph contains a cycle (not a DAG).
 *
 * @complexity
 *   Time: O(V + E), where V is the number of vertices and E is the number of edges.
 *         Calculating in-degrees takes O(V+E). Each vertex is enqueued/dequeued once,
 *         and each edge is processed once.
 *   Space: O(V) for in-degree array, queue, and result vector.
 */
std::vector<int> kahn_topological_sort(const Graph& g) {
    int V = g.getV();
    if (V == 0) return {};

    std::vector<int> in_degree(V, 0);
    const AdjacencyList& adj = g.getAdj();

    // 1. Calculate in-degrees for all vertices
    for (int u = 0; u < V; ++u) {
        for (const auto& edge : adj[u]) {
            int v = edge.first;
            in_degree[v]++;
        }
    }

    // 2. Initialize queue with all vertices having an in-degree of 0
    std::queue<int> q;
    for (int i = 0; i < V; ++i) {
        if (in_degree[i] == 0) {
            q.push(i);
        }
    }

    // 3. Process nodes
    std::vector<int> topological_order;
    int visited_count = 0; // To detect cycles

    while (!q.empty()) {
        int u = q.front();
        q.pop();
        topological_order.push_back(u);
        visited_count++;

        // For each neighbor v of u
        for (const auto& edge : adj[u]) {
            int v = edge.first;
            in_degree[v]--; // Decrement in-degree of v
            // If v's in-degree becomes 0, add it to the queue
            if (in_degree[v] == 0) {
                q.push(v);
            }
        }
    }

    // 4. Check for cycles
    if (visited_count != V) {
        // If visited_count is less than V, it means there's a cycle in the graph,
        // as some nodes could not be processed (their in-degree never reached 0).
        std::cerr << "Kahn's Topological Sort: Graph contains a cycle, no topological order exists." << std::endl;
        return {}; // Return empty vector indicating no valid topological sort
    }

    return topological_order;
}

// Helper function for recursive DFS-based topological sort
void dfs_topological_sort_util(int u, const AdjacencyList& adj, std::vector<bool>& visited,
                               std::vector<bool>& recursion_stack, std::stack<int>& s, bool& has_cycle) {
    visited[u] = true;
    recursion_stack[u] = true; // Mark node as being in the current recursion path

    for (const auto& edge : adj[u]) {
        int v = edge.first;
        if (has_cycle) return; // Stop if a cycle is already detected

        if (!visited[v]) {
            dfs_topological_sort_util(v, adj, visited, recursion_stack, s, has_cycle);
        } else if (recursion_stack[v]) {
            // If v is visited AND it's in the current recursion stack, then we found a back-edge, i.e., a cycle.
            has_cycle = true;
            return;
        }
    }

    recursion_stack[u] = false; // Remove node from recursion path after all its descendants are visited
    s.push(u); // Push node to stack after all its adjacent vertices are processed
}

/**
 * @brief Performs a Topological Sort using DFS-based algorithm.
 *        The idea is to do a DFS traversal and push vertices onto a stack
 *        after all their dependencies (neighbors) have been visited.
 * @param g The graph to sort (must be a Directed Acyclic Graph - DAG).
 * @return A vector containing the topological order of nodes. Returns an empty vector
 *         if the graph contains a cycle (not a DAG).
 *
 * @complexity
 *   Time: O(V + E), where V is the number of vertices and E is the number of edges.
 *         Each vertex and edge is visited once.
 *   Space: O(V) for visited array, recursion stack, and result stack.
 */
std::vector<int> dfs_topological_sort(const Graph& g) {
    int V = g.getV();
    if (V == 0) return {};

    std::vector<bool> visited(V, false);
    std::vector<bool> recursion_stack(V, false); // To detect cycles
    std::stack<int> s; // Stack to store the topological order
    bool has_cycle = false;

    // Iterate through all vertices to handle disconnected components
    for (int i = 0; i < V; ++i) {
        if (!visited[i]) {
            dfs_topological_sort_util(i, g.getAdj(), visited, recursion_stack, s, has_cycle);
            if (has_cycle) {
                std::cerr << "DFS Topological Sort: Graph contains a cycle, no topological order exists." << std::endl;
                return {}; // Return empty vector if cycle detected
            }
        }
    }

    // Pop elements from stack to get the topological order
    std::vector<int> topological_order;
    while (!s.empty()) {
        topological_order.push_back(s.top());
        s.pop();
    }

    return topological_order;
}


int main() {
    std::cout << "--- Topological Sort Algorithms ---" << std::endl;

    // Example 1: Standard DAG (Directed Acyclic Graph)
    // Dependencies: 5->0, 4->0, 5->2, 4->1, 2->3, 3->1
    Graph g1(6); // 6 vertices
    g1.addEdge(5, 0);
    g1.addEdge(4, 0);
    g1.addEdge(5, 2);
    g1.addEdge(4, 1);
    g1.addEdge(2, 3);
    g1.addEdge(3, 1);

    std::cout << "\nGraph 1 (DAG):" << std::endl;
    g1.printGraph();

    std::cout << "\nKahn's Topological Sort (BFS-based):" << std::endl;
    std::vector<int> kahn_order1 = kahn_topological_sort(g1);
    std::cout << "  Order: ";
    if (!kahn_order1.empty()) {
        for (int node : kahn_order1) {
            std::cout << node << " ";
        }
    } else {
        std::cout << "No valid topological order (cycle detected or empty graph).";
    }
    std::cout << std::endl;
    // Expected Kahn's (one possible order): 4 5 0 2 3 1

    std::cout << "\nDFS-based Topological Sort:" << std::endl;
    std::vector<int> dfs_order1 = dfs_topological_sort(g1);
    std::cout << "  Order: ";
    if (!dfs_order1.empty()) {
        for (int node : dfs_order1) {
            std::cout << node << " ";
        }
    } else {
        std::cout << "No valid topological order (cycle detected or empty graph).";
    }
    std::cout << std::endl;
    // Expected DFS-based (one possible order): 5 4 2 3 1 0 (order depends on adjacency list iteration)


    // Example 2: Graph with a cycle
    Graph g2(4);
    g2.addEdge(0, 1);
    g2.addEdge(1, 2);
    g2.addEdge(2, 0); // Cycle: 0 -> 1 -> 2 -> 0
    g2.addEdge(2, 3);

    std::cout << "\nGraph 2 (with a cycle):" << std::endl;
    g2.printGraph();

    std::cout << "\nKahn's Topological Sort (BFS-based) for cyclic graph:" << std::endl;
    std::vector<int> kahn_order2 = kahn_topological_sort(g2);
    std::cout << "  Order: ";
    if (!kahn_order2.empty()) {
        for (int node : kahn_order2) {
            std::cout << node << " ";
        }
    } else {
        std::cout << "No valid topological order (cycle detected or empty graph).";
    }
    std::cout << std::endl;
    // Expected: Error message "Graph contains a cycle", empty order.

    std::cout << "\nDFS-based Topological Sort for cyclic graph:" << std::endl;
    std::vector<int> dfs_order2 = dfs_topological_sort(g2);
    std::cout << "  Order: ";
    if (!dfs_order2.empty()) {
        for (int node : dfs_order2) {
            std::cout << node << " ";
        }
    } else {
        std::cout << "No valid topological order (cycle detected or empty graph).";
    }
    std::cout << std::endl;
    // Expected: Error message "Graph contains a cycle", empty order.


    // Example 3: Disconnected DAG
    Graph g3(5);
    g3.addEdge(0, 1);
    g3.addEdge(2, 3);
    g3.addEdge(3, 4);

    std::cout << "\nGraph 3 (Disconnected DAG):" << std::endl;
    g3.printGraph();

    std::cout << "\nKahn's Topological Sort for disconnected DAG:" << std::endl;
    std::vector<int> kahn_order3 = kahn_topological_sort(g3);
    std::cout << "  Order: ";
    if (!kahn_order3.empty()) {
        for (int node : kahn_order3) {
            std::cout << node << " ";
        }
    } else {
        std::cout << "No valid topological order (cycle detected or empty graph).";
    }
    std::cout << std::endl;
    // Expected: 0 2 3 4 1 (or 2 3 4 0 1, depending on queue processing)

    std::cout << "\nDFS-based Topological Sort for disconnected DAG:" << std::endl;
    std::vector<int> dfs_order3 = dfs_topological_sort(g3);
    std::cout << "  Order: ";
    if (!dfs_order3.empty()) {
        for (int node : dfs_order3) {
            std::cout << node << " ";
        }
    } else {
        std::cout << "No valid topological order (cycle detected or empty graph).";
    }
    std::cout << std::endl;
    // Expected: 2 3 4 0 1 (or similar, depending on iteration order)

    return 0;
}
```