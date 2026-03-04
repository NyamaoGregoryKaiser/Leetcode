```cpp
#include "graph.h"

/**
 * @brief Constructor for the Graph class.
 * @param V The number of vertices in the graph.
 */
Graph::Graph(int V) : V(V) {
    // Initialize adjacency list with V empty vectors.
    // Each vector will store the neighbors of a vertex.
    adj.resize(V);
}

/**
 * @brief Adds an edge to the graph.
 *        For an undirected graph, call addEdge(u, v, w) and addEdge(v, u, w).
 * @param u The source vertex.
 * @param v The destination vertex.
 * @param weight The weight of the edge (default to 1 for unweighted).
 */
void Graph::addEdge(int u, int v, int weight) {
    // Basic validation for vertex indices
    if (u < 0 || u >= V || v < 0 || v >= V) {
        std::cerr << "Error: Vertex " << u << " or " << v << " is out of bounds (0-" << V - 1 << ")." << std::endl;
        return;
    }
    // Add an edge from u to v with the given weight.
    // In an adjacency list, this means adding {v, weight} to adj[u].
    adj[u].push_back({v, weight});
}

/**
 * @brief Returns the number of vertices in the graph.
 * @return The number of vertices.
 */
int Graph::getV() const {
    return V;
}

/**
 * @brief Returns the adjacency list of the graph.
 * @return A constant reference to the adjacency list.
 */
const AdjacencyList& Graph::getAdj() const {
    return adj;
}

/**
 * @brief Prints the graph in adjacency list format.
 */
void Graph::printGraph() const {
    std::cout << "Graph (V=" << V << "):" << std::endl;
    for (int i = 0; i < V; ++i) {
        std::cout << "  Vertex " << i << ":";
        for (const auto& edge : adj[i]) {
            // edge.first is the destination vertex, edge.second is the weight
            std::cout << " -> (" << edge.first << ", w:" << edge.second << ")";
        }
        std::cout << std::endl;
    }
}
```