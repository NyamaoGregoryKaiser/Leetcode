```cpp
#include "graph.h"
#include <vector>
#include <queue>
#include <stack>
#include <iostream>
#include <algorithm> // For std::reverse

// Helper function for recursive DFS
void dfs_recursive_util(int u, const AdjacencyList& adj, std::vector<bool>& visited, std::vector<int>& traversal_order) {
    visited[u] = true;
    traversal_order.push_back(u);

    // Iterate over all neighbors of the current vertex u
    for (const auto& edge : adj[u]) {
        int v = edge.first; // Get the neighbor vertex
        if (!visited[v]) {
            dfs_recursive_util(v, adj, visited, traversal_order);
        }
    }
}

/**
 * @brief Performs a Breadth-First Search (BFS) traversal starting from a given node.
 *        BFS explores all nodes at the present depth level before moving on to nodes at the next depth level.
 * @param g The graph to traverse.
 * @param startNode The starting node for the traversal.
 * @return A pair:
 *         - first: A vector containing the order of nodes visited during BFS.
 *         - second: A vector containing the shortest distance from startNode to each node.
 *                   `std::numeric_limits<int>::max()` for unreachable nodes.
 *
 * @complexity
 *   Time: O(V + E), where V is the number of vertices and E is the number of edges.
 *         Each vertex is enqueued/dequeued once, and each edge is examined once.
 *   Space: O(V) for the queue and visited array.
 */
std::pair<std::vector<int>, std::vector<int>> bfs(const Graph& g, int startNode) {
    int V = g.getV();
    if (V == 0) return {{}, {}};
    if (startNode < 0 || startNode >= V) {
        std::cerr << "BFS: Start node " << startNode << " is out of bounds." << std::endl;
        return {{}, {}};
    }

    std::vector<int> traversal_order;
    std::vector<int> dist(V, std::numeric_limits<int>::max()); // Store distances from startNode
    std::vector<bool> visited(V, false); // Keep track of visited nodes
    std::queue<int> q; // Queue for BFS traversal

    // Initialize with the start node
    q.push(startNode);
    visited[startNode] = true;
    dist[startNode] = 0;

    while (!q.empty()) {
        int u = q.front();
        q.pop();
        traversal_order.push_back(u); // Add current node to traversal order

        // Iterate over all neighbors of u
        for (const auto& edge : g.getAdj()[u]) {
            int v = edge.first; // Neighbor vertex
            // If neighbor v has not been visited, visit it
            if (!visited[v]) {
                visited[v] = true;
                dist[v] = dist[u] + 1; // Distance is one more than parent's distance
                q.push(v);
            }
        }
    }
    return {traversal_order, dist};
}

/**
 * @brief Performs a Depth-First Search (DFS) traversal recursively starting from a given node.
 *        DFS explores as far as possible along each branch before backtracking.
 * @param g The graph to traverse.
 * @param startNode The starting node for the traversal.
 * @return A vector containing the order of nodes visited during DFS.
 *
 * @complexity
 *   Time: O(V + E), where V is the number of vertices and E is the number of edges.
 *         Each vertex and edge is visited once.
 *   Space: O(V) for the recursion stack and visited array. In worst case (skewed graph), recursion depth is V.
 */
std::vector<int> dfs_recursive(const Graph& g, int startNode) {
    int V = g.getV();
    if (V == 0) return {};
    if (startNode < 0 || startNode >= V) {
        std::cerr << "DFS Recursive: Start node " << startNode << " is out of bounds." << std::endl;
        return {};
    }

    std::vector<bool> visited(V, false);
    std::vector<int> traversal_order;
    dfs_recursive_util(startNode, g.getAdj(), visited, traversal_order);
    return traversal_order;
}

/**
 * @brief Performs a Depth-First Search (DFS) traversal iteratively using a stack starting from a given node.
 *        DFS explores as far as possible along each branch before backtracking.
 * @param g The graph to traverse.
 * @param startNode The starting node for the traversal.
 * @return A vector containing the order of nodes visited during DFS.
 *
 * @complexity
 *   Time: O(V + E), where V is the number of vertices and E is the number of edges.
 *         Each vertex and edge is visited once.
 *   Space: O(V) for the stack and visited array.
 */
std::vector<int> dfs_iterative(const Graph& g, int startNode) {
    int V = g.getV();
    if (V == 0) return {};
    if (startNode < 0 || startNode >= V) {
        std::cerr << "DFS Iterative: Start node " << startNode << " is out of bounds." << std::endl;
        return {};
    }

    std::vector<int> traversal_order;
    std::vector<bool> visited(V, false);
    std::stack<int> s;

    // Push the start node onto the stack and mark as visited
    s.push(startNode);
    visited[startNode] = true;

    while (!s.empty()) {
        int u = s.top();
        s.pop();
        traversal_order.push_back(u); // Add to traversal order

        // Iterate over neighbors. For DFS, it's common to process neighbors in reverse
        // order to get similar results to recursive DFS (which processes first neighbor first).
        // Or just push them in order, the iterative DFS just explores based on stack.
        // To mimic recursive DFS (where the 'first' neighbor gets explored deeply first),
        // we push neighbors in reverse order onto the stack.
        const auto& neighbors = g.getAdj()[u];
        for (auto it = neighbors.rbegin(); it != neighbors.rend(); ++it) {
            int v = it->first;
            if (!visited[v]) {
                visited[v] = true;
                s.push(v);
            }
        }
    }
    return traversal_order;
}

int main() {
    std::cout << "--- Graph Traversal Algorithms ---" << std::endl;

    // Example 1: Simple connected graph
    Graph g1(6); // 6 vertices (0 to 5)
    g1.addEdge(0, 1);
    g1.addEdge(0, 2);
    g1.addEdge(1, 3);
    g1.addEdge(1, 4);
    g1.addEdge(2, 4);
    g1.addEdge(3, 5);
    g1.addEdge(4, 5); // Example of a simple DAG for now (could be undirected if we add reverse edges)

    std::cout << "\nGraph 1 (Directed):" << std::endl;
    g1.printGraph();

    std::cout << "\nBFS Traversal from node 0:" << std::endl;
    auto bfs_result = bfs(g1, 0);
    std::cout << "  Order: ";
    for (int node : bfs_result.first) {
        std::cout << node << " ";
    }
    std::cout << std::endl;
    std::cout << "  Distances from 0: ";
    for (int i = 0; i < g1.getV(); ++i) {
        if (bfs_result.second[i] == std::numeric_limits<int>::max()) {
            std::cout << "INF ";
        } else {
            std::cout << bfs_result.second[i] << " ";
        }
    }
    std::cout << std::endl;
    // Expected BFS from 0: 0 1 2 3 4 5
    // Expected Distances: 0 1 1 2 2 3

    std::cout << "\nDFS Recursive Traversal from node 0:" << std::endl;
    std::vector<int> dfs_rec_order = dfs_recursive(g1, 0);
    std::cout << "  Order: ";
    for (int node : dfs_rec_order) {
        std::cout << node << " ";
    }
    std::cout << std::endl;
    // Expected DFS_Rec from 0 (depends on adjacency list order): 0 1 3 5 4 2 (or 0 2 4 1 3 5)

    std::cout << "\nDFS Iterative Traversal from node 0:" << std::endl;
    std::vector<int> dfs_iter_order = dfs_iterative(g1, 0);
    std::cout << "  Order: ";
    for (int node : dfs_iter_order) {
        std::cout << node << " ";
    }
    std::cout << std::endl;
    // Expected DFS_Iter from 0 (depends on adjacency list order and how neighbors are pushed): 0 2 4 5 1 3 (if neighbors pushed reversed)


    // Example 2: Disconnected graph
    Graph g2(5); // 5 vertices
    g2.addEdge(0, 1);
    g2.addEdge(0, 2);
    g2.addEdge(3, 4);

    std::cout << "\nGraph 2 (Disconnected, Directed):" << std::endl;
    g2.printGraph();

    std::cout << "\nBFS Traversal from node 0 (disconnected):" << std::endl;
    auto bfs_result_g2 = bfs(g2, 0);
    std::cout << "  Order: ";
    for (int node : bfs_result_g2.first) {
        std::cout << node << " ";
    }
    std::cout << std::endl;
    std::cout << "  Distances from 0: ";
    for (int i = 0; i < g2.getV(); ++i) {
        if (bfs_result_g2.second[i] == std::numeric_limits<int>::max()) {
            std::cout << "INF ";
        } else {
            std::cout << bfs_result_g2.second[i] << " ";
        }
    }
    std::cout << std::endl;
    // Expected BFS from 0: 0 1 2
    // Expected Distances: 0 1 1 INF INF

    std::cout << "\nDFS Recursive Traversal from node 0 (disconnected):" << std::endl;
    std::vector<int> dfs_rec_order_g2 = dfs_recursive(g2, 0);
    std::cout << "  Order: ";
    for (int node : dfs_rec_order_g2) {
        std::cout << node << " ";
    }
    std::cout << std::endl;
    // Expected DFS_Rec from 0: 0 1 2

    // Example 3: Graph with a cycle (for BFS/DFS it doesn't matter, visited handles it)
    Graph g3(4);
    g3.addEdge(0, 1);
    g3.addEdge(1, 2);
    g3.addEdge(2, 0); // Cycle: 0-1-2-0
    g3.addEdge(2, 3);

    std::cout << "\nGraph 3 (Directed with cycle):" << std::endl;
    g3.printGraph();

    std::cout << "\nBFS Traversal from node 0 (with cycle):" << std::endl;
    auto bfs_result_g3 = bfs(g3, 0);
    std::cout << "  Order: ";
    for (int node : bfs_result_g3.first) {
        std::cout << node << " ";
    }
    std::cout << std::endl;
    // Expected BFS from 0: 0 1 2 3

    std::cout << "\nDFS Recursive Traversal from node 0 (with cycle):" << std::endl;
    std::vector<int> dfs_rec_order_g3 = dfs_recursive(g3, 0);
    std::cout << "  Order: ";
    for (int node : dfs_rec_order_g3) {
        std::cout << node << " ";
    }
    std::cout << std::endl;
    // Expected DFS_Rec from 0: 0 1 2 3

    return 0;
}
```