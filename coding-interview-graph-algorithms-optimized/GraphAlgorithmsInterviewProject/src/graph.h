```cpp
#ifndef GRAPH_H
#define GRAPH_H

#include <vector>
#include <iostream>
#include <utility> // For std::pair

// Enum for node states, useful in algorithms like DFS for cycle detection
enum NodeState {
    UNVISITED = 0,
    VISITING = 1, // Currently in recursion stack (for DFS) or processing (for BFS)
    VISITED = 2   // Finished processing all descendants
};

// Represents a graph using an adjacency list.
// Supports both unweighted and weighted edges.
class Graph {
private:
    int V; // Number of vertices
    // Adjacency list for unweighted graph: adj[u] contains list of v such that u -> v
    std::vector<std::vector<int>> adj_unweighted;
    // Adjacency list for weighted graph: adj_weighted[u] contains list of {v, weight} for u -> v
    std::vector<std::vector<std::pair<int, int>>> adj_weighted;

public:
    // Constructor: Initializes a graph with V vertices.
    // By default, initializes both unweighted and weighted adjacency lists.
    Graph(int vertices) : V(vertices) {
        if (V < 0) {
            throw std::invalid_argument("Number of vertices cannot be negative.");
        }
        adj_unweighted.resize(V);
        adj_weighted.resize(V);
    }

    // Returns the number of vertices in the graph.
    int getNumVertices() const {
        return V;
    }

    // Adds an unweighted directed edge from u to v.
    // For an undirected graph, addEdge(u, v) and addEdge(v, u).
    void addEdge(int u, int v) {
        if (u < 0 || u >= V || v < 0 || v >= V) {
            throw std::out_of_range("Vertex index out of bounds when adding unweighted edge.");
        }
        adj_unweighted[u].push_back(v);
        // For weighted graphs, we might also add to adj_weighted with a default weight (e.g., 1)
        // For simplicity, this method only affects the unweighted list.
    }

    // Adds a weighted directed edge from u to v with a given weight.
    // For an undirected graph, addWeightedEdge(u, v, w) and addWeightedEdge(v, u, w).
    void addWeightedEdge(int u, int v, int weight) {
        if (u < 0 || u >= V || v < 0 || v >= V) {
            throw std::out_of_range("Vertex index out of bounds when adding weighted edge.");
        }
        adj_weighted[u].push_back({v, weight});
    }

    // Returns the unweighted adjacency list.
    const std::vector<std::vector<int>>& getAdjUnweighted() const {
        return adj_unweighted;
    }

    // Returns the weighted adjacency list.
    const std::vector<std::vector<std::pair<int, int>>>& getAdjWeighted() const {
        return adj_weighted;
    }

    // Utility function to print the graph (unweighted)
    void printGraphUnweighted() const {
        std::cout << "Unweighted Graph Adjacency List (V=" << V << "):" << std::endl;
        for (int i = 0; i < V; ++i) {
            std::cout << i << ": ";
            for (int neighbor : adj_unweighted[i]) {
                std::cout << neighbor << " ";
            }
            std::cout << std::endl;
        }
    }

    // Utility function to print the graph (weighted)
    void printGraphWeighted() const {
        std::cout << "Weighted Graph Adjacency List (V=" << V << "):" << std::endl;
        for (int i = 0; i < V; ++i) {
            std::cout << i << ": ";
            for (const auto& edge : adj_weighted[i]) {
                std::cout << "(" << edge.first << ", " << edge.second << ") ";
            }
            std::cout << std::endl;
        }
    }
};

#endif // GRAPH_H
```