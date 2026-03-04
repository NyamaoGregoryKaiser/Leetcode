```cpp
#ifndef GRAPH_H
#define GRAPH_H

#include <vector>
#include <iostream>
#include <algorithm> // For std::reverse
#include <queue>     // For BFS
#include <stack>     // For DFS iterative
#include <limits>    // For numeric_limits in Dijkstra

// Pair to represent an edge: {destination_node, weight}
using WeightedEdge = std::pair<int, int>;
// Adjacency list: vector of vectors of weighted edges
using AdjacencyList = std::vector<std::vector<WeightedEdge>>;
// Structure to represent an edge for Kruskal's: {weight, source, destination}
struct Edge {
    int weight;
    int u, v;

    // Custom comparator for sorting edges by weight
    bool operator<(const Edge& other) const {
        return weight < other.weight;
    }
};


/**
 * @class Graph
 * @brief Implements a graph data structure using an adjacency list.
 *        Supports weighted, directed/undirected graphs.
 */
class Graph {
private:
    int V;             // Number of vertices
    AdjacencyList adj; // Adjacency list: adj[u] stores a list of pairs {v, weight}

public:
    /**
     * @brief Constructor for the Graph class.
     * @param V The number of vertices in the graph.
     */
    Graph(int V);

    /**
     * @brief Adds an edge to the graph.
     *        For an undirected graph, call addEdge(u, v, w) and addEdge(v, u, w).
     * @param u The source vertex.
     * @param v The destination vertex.
     * @param weight The weight of the edge (default to 1 for unweighted).
     */
    void addEdge(int u, int v, int weight = 1);

    /**
     * @brief Returns the number of vertices in the graph.
     * @return The number of vertices.
     */
    int getV() const;

    /**
     * @brief Returns the adjacency list of the graph.
     * @return A constant reference to the adjacency list.
     */
    const AdjacencyList& getAdj() const;

    /**
     * @brief Prints the graph in adjacency list format.
     */
    void printGraph() const;
};

#endif // GRAPH_H
```