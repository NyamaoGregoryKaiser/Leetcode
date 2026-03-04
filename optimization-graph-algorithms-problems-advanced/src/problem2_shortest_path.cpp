```cpp
#include "graph.h"
#include <vector>
#include <queue>
#include <limits> // For std::numeric_limits
#include <map>    // For path reconstruction (optional)
#include <algorithm> // For std::reverse

// Pair for priority queue: {distance, vertex}
using DistanceVertexPair = std::pair<int, int>;

/**
 * @brief Finds the shortest paths from a single source node to all other nodes in a graph
 *        with non-negative edge weights using Dijkstra's Algorithm.
 * @param g The graph to operate on.
 * @param startNode The starting node for shortest path calculations.
 * @return A vector `dist` where `dist[i]` is the shortest distance from `startNode` to node `i`.
 *         Returns `std::numeric_limits<int>::max()` for unreachable nodes.
 *
 * @complexity
 *   Time: O(E log V) using a binary heap (priority queue).
 *         Each of E edges is relaxed once, and each relaxation involves a priority queue operation (log V).
 *         If using a Fibonacci heap, it can be O(E + V log V), but binary heaps are more common in interviews.
 *   Space: O(V + E) for storing distances, priority queue, and adjacency list.
 */
std::vector<int> dijkstra(const Graph& g, int startNode) {
    int V = g.getV();
    if (V == 0) return {};
    if (startNode < 0 || startNode >= V) {
        std::cerr << "Dijkstra: Start node " << startNode << " is out of bounds." << std::endl;
        return std::vector<int>(); // Return an empty vector for invalid start node
    }

    std::vector<int> dist(V, std::numeric_limits<int>::max()); // Stores shortest distance from startNode to each vertex
    // Priority queue stores pairs of {distance, vertex}.
    // `std::greater<DistanceVertexPair>` makes it a min-priority queue (smallest distance at top).
    std::priority_queue<DistanceVertexPair, std::vector<DistanceVertexPair>, std::greater<DistanceVertexPair>> pq;

    // Initialize distance for the start node and push it to the priority queue
    dist[startNode] = 0;
    pq.push({0, startNode}); // {distance, vertex}

    while (!pq.empty()) {
        int d = pq.top().first;  // Current shortest distance to 'u'
        int u = pq.top().second; // Current vertex
        pq.pop();

        // If we found a shorter path to 'u' already, skip this entry
        // (This happens because we might push multiple {distance, u} pairs to PQ,
        //  but we only care about the one with the smallest distance).
        if (d > dist[u]) {
            continue;
        }

        // Iterate over all neighbors 'v' of 'u'
        for (const auto& edge : g.getAdj()[u]) {
            int v = edge.first;    // Neighbor vertex
            int weight = edge.second; // Weight of edge (u, v)

            // If a shorter path to 'v' is found through 'u'
            if (dist[u] != std::numeric_limits<int>::max() && dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight; // Update distance to 'v'
                pq.push({dist[v], v});      // Push updated distance to PQ
            }
        }
    }

    return dist;
}

// Optional: Path reconstruction function
std::vector<int> reconstructPath(int startNode, int endNode, const std::vector<int>& parent) {
    std::vector<int> path;
    if (parent[endNode] == -1 && endNode != startNode) { // No path or endNode is unreachable
        return {};
    }

    int curr = endNode;
    while (curr != -1) {
        path.push_back(curr);
        if (curr == startNode) break; // Reached start node
        curr = parent[curr];
    }
    std::reverse(path.begin(), path.end()); // Path from start to end
    return path;
}


int main() {
    std::cout << "--- Dijkstra's Shortest Path Algorithm ---" << std::endl;

    // Example 1: Basic weighted directed graph
    Graph g1(5); // 5 vertices (0 to 4)
    g1.addEdge(0, 1, 10);
    g1.addEdge(0, 2, 3);
    g1.addEdge(1, 2, 1);
    g1.addEdge(1, 3, 2);
    g1.addEdge(2, 1, 4); // Example of a cycle and different path
    g1.addEdge(2, 3, 8);
    g1.addEdge(2, 4, 2);
    g1.addEdge(3, 4, 5);

    std::cout << "\nGraph 1 (Directed, Weighted):" << std::endl;
    g1.printGraph();

    int startNode1 = 0;
    std::cout << "\nShortest paths from node " << startNode1 << ":" << std::endl;
    std::vector<int> dist1 = dijkstra(g1, startNode1);
    for (int i = 0; i < g1.getV(); ++i) {
        std::cout << "  Distance to " << i << ": ";
        if (dist1[i] == std::numeric_limits<int>::max()) {
            std::cout << "INF" << std::endl;
        } else {
            std::cout << dist1[i] << std::endl;
        }
    }
    // Expected output from start node 0:
    // Distances: 0 7 3 9 5

    // Example 2: Disconnected graph
    Graph g2(4);
    g2.addEdge(0, 1, 5);
    g2.addEdge(2, 3, 10);

    std::cout << "\nGraph 2 (Disconnected, Directed, Weighted):" << std::endl;
    g2.printGraph();

    int startNode2 = 0;
    std::cout << "\nShortest paths from node " << startNode2 << ":" << std::endl;
    std::vector<int> dist2 = dijkstra(g2, startNode2);
    for (int i = 0; i < g2.getV(); ++i) {
        std::cout << "  Distance to " << i << ": ";
        if (dist2[i] == std::numeric_limits<int>::max()) {
            std::cout << "INF" << std::endl;
        } else {
            std::cout << dist2[i] << std::endl;
        }
    }
    // Expected output from start node 0:
    // Distances: 0 5 INF INF

    // Example 3: Graph with only one node
    Graph g3(1);
    std::cout << "\nGraph 3 (Single Node):" << std::endl;
    g3.printGraph();
    int startNode3 = 0;
    std::cout << "\nShortest paths from node " << startNode3 << ":" << std::endl;
    std::vector<int> dist3 = dijkstra(g3, startNode3);
    for (int i = 0; i < g3.getV(); ++i) {
        std::cout << "  Distance to " << i << ": ";
        if (dist3[i] == std::numeric_limits<int>::max()) {
            std::cout << "INF" << std::endl;
        } else {
            std::cout << dist3[i] << std::endl;
        }
    }
    // Expected output from start node 0:
    // Distances: 0

    // Example 4: Empty graph
    Graph g4(0);
    std::cout << "\nGraph 4 (Empty):" << std::endl;
    g4.printGraph();
    int startNode4 = 0; // This will cause an error as V=0
    std::cout << "\nShortest paths from node " << startNode4 << ":" << std::endl;
    std::vector<int> dist4 = dijkstra(g4, startNode4);
    // Expected output: Error message, empty vector

    return 0;
}
```