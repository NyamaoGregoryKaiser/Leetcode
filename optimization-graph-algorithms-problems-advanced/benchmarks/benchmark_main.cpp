```cpp
#include "../src/graph.h"
#include <chrono>
#include <vector>
#include <random>
#include <iostream>
#include <algorithm> // For std::shuffle

// Declare functions from problem files
// Traversals
std::pair<std::vector<int>, std::vector<int>> bfs(const Graph& g, int startNode);
std::vector<int> dfs_recursive(const Graph& g, int startNode);
std::vector<int> dfs_iterative(const Graph& g, int startNode);

// Shortest Path
std::vector<int> dijkstra(const Graph& g, int startNode);

// MST
std::pair<int, std::vector<Edge>> kruskal(const Graph& g);

// Topological Sort
std::vector<int> kahn_topological_sort(const Graph& g);
std::vector<int> dfs_topological_sort(const Graph& g);


// Helper function to generate a random graph
Graph generateRandomGraph(int V, int E, bool is_weighted, bool is_directed, bool allow_cycles) {
    Graph g(V);
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib_nodes(0, V - 1);
    std::uniform_int_distribution<> distrib_weights(1, 100); // Weights between 1 and 100

    // To prevent duplicate edges and self-loops during generation
    std::set<std::pair<int, int>> existing_edges;

    int edges_added = 0;
    while (edges_added < E) {
        int u = distrib_nodes(gen);
        int v = distrib_nodes(gen);
        int weight = is_weighted ? distrib_weights(gen) : 1;

        if (u == v) continue; // No self-loops

        if (is_directed) {
            if (existing_edges.find({u, v}) == existing_edges.end()) {
                g.addEdge(u, v, weight);
                existing_edges.insert({u, v});
                edges_added++;
            }
        } else {
            // For undirected, add (u,v) and (v,u) but count as one edge.
            // Ensure canonical representation for 'existing_edges' (e.g., smaller node first)
            int min_node = std::min(u, v);
            int max_node = std::max(u, v);
            if (existing_edges.find({min_node, max_node}) == existing_edges.end()) {
                g.addEdge(u, v, weight);
                g.addEdge(v, u, weight); // Add reverse edge for undirected interpretation
                existing_edges.insert({min_node, max_node});
                edges_added++;
            }
        }
    }
    return g;
}

// Helper for generating a random DAG for topological sort
Graph generateRandomDAG(int V, int E, bool is_weighted) {
    Graph g(V);
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib_weights(1, 100);

    // To ensure DAG, only add edges from smaller index to larger index
    // This naturally prevents cycles.
    std::set<std::pair<int, int>> existing_edges;
    int edges_added = 0;
    while (edges_added < E) {
        int u = std::uniform_int_distribution<>(0, V - 2)(gen); // Source node always < V-1
        int v = std::uniform_int_distribution<>(u + 1, V - 1)(gen); // Dest node always > u
        int weight = is_weighted ? distrib_weights(gen) : 1;

        if (existing_edges.find({u, v}) == existing_edges.end()) {
            g.addEdge(u, v, weight);
            existing_edges.insert({u, v});
            edges_added++;
        }
    }
    return g;
}


// Benchmarking function
template <typename Func>
void benchmark_algorithm(const std::string& name, Func algo, int V, int E, bool is_weighted, bool is_directed, bool is_dag = false) {
    std::cout << "Benchmarking " << name << " (V=" << V << ", E=" << E << "): ";
    
    Graph g(0);
    if (is_dag) {
        g = generateRandomDAG(V, E, is_weighted);
    } else {
        g = generateRandomGraph(V, E, is_weighted, is_directed, true); // true allows cycles for general graph
    }

    auto start = std::chrono::high_resolution_clock::now();
    
    // Call the specific algorithm
    if (name.find("BFS") != std::string::npos || name.find("DFS") != std::string::npos) {
        algo(g, 0); // Start from node 0 for traversals
    } else if (name.find("Dijkstra") != std::string::npos) {
        algo(g, 0); // Start from node 0 for Dijkstra
    } else if (name.find("Kruskal") != std::string::npos) {
        // Kruskal's expects undirected edges, so graph generation needs to reflect this.
        // `generateRandomGraph` adds reverse edges if `is_directed` is false.
        algo(g); 
    } else if (name.find("Topological Sort") != std::string::npos) {
        algo(g);
    }
    
    auto end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double, std::milli> duration = end - start;
    std::cout << duration.count() << " ms" << std::endl;
}

int main() {
    std::cout << "--- Performance Benchmarking of Graph Algorithms ---" << std::endl;

    // Define graph sizes for benchmarking
    const int V_small = 100;    const int E_small_sparse = 200;   const int E_small_dense = V_small * (V_small - 1) / 2;
    const int V_medium = 1000;  const int E_medium_sparse = 5000; const int E_medium_dense = V_medium * (V_medium - 1) / 2;
    const int V_large = 5000;   const int E_large_sparse = 20000; const int E_large_dense = V_large * (V_large - 1) / 2;

    std::cout << "\n### Traversals (BFS/DFS) - Unweighted, Directed ###" << std::endl;
    // BFS & DFS complexities are O(V+E)
    benchmark_algorithm("BFS",                     [](const Graph& g, int s){ bfs(g,s); },            V_medium, E_medium_sparse, false, true);
    benchmark_algorithm("DFS Recursive",           [](const Graph& g, int s){ dfs_recursive(g,s); },  V_medium, E_medium_sparse, false, true);
    benchmark_algorithm("DFS Iterative",           [](const Graph& g, int s){ dfs_iterative(g,s); },  V_medium, E_medium_sparse, false, true);
    
    benchmark_algorithm("BFS (Dense)",             [](const Graph& g, int s){ bfs(g,s); },            V_small, E_small_dense, false, true);
    benchmark_algorithm("DFS Recursive (Dense)",   [](const Graph& g, int s){ dfs_recursive(g,s); },  V_small, E_small_dense, false, true);
    benchmark_algorithm("DFS Iterative (Dense)",   [](const Graph& g, int s){ dfs_iterative(g,s); },  V_small, E_small_dense, false, true);

    std::cout << "\n### Shortest Path (Dijkstra) - Weighted, Directed ###" << std::endl;
    // Dijkstra complexity O(E log V)
    benchmark_algorithm("Dijkstra (Sparse)", [](const Graph& g, int s){ dijkstra(g,s); }, V_medium, E_medium_sparse, true, true);
    benchmark_algorithm("Dijkstra (Dense)",  [](const Graph& g, int s){ dijkstra(g,s); }, V_medium, E_medium_dense,  true, true);
    
    // For larger graphs, use sparse to avoid excessively long runtimes for dense
    benchmark_algorithm("Dijkstra (Large Sparse)", [](const Graph& g, int s){ dijkstra(g,s); }, V_large, E_large_sparse, true, true);


    std::cout << "\n### Minimum Spanning Tree (Kruskal) - Weighted, Undirected ###" << std::endl;
    // Kruskal complexity O(E log E) or O(E log V)
    // Need to generate undirected graph explicitly (addEdge in both directions for generated edges)
    benchmark_algorithm("Kruskal (Sparse)", [](const Graph& g){ kruskal(g); }, V_medium, E_medium_sparse, true, false); // is_directed=false for undirected graph generation
    benchmark_algorithm("Kruskal (Dense)",  [](const Graph& g){ kruskal(g); }, V_medium, E_medium_dense,  true, false);

    benchmark_algorithm("Kruskal (Large Sparse)", [](const Graph& g){ kruskal(g); }, V_large, E_large_sparse, true, false);


    std::cout << "\n### Topological Sort (Kahn's & DFS-based) - Unweighted, Directed Acyclic Graph (DAG) ###" << std::endl;
    // Topological Sort complexities are O(V+E)
    benchmark_algorithm("Kahn's Topological Sort",      [](const Graph& g){ kahn_topological_sort(g); },       V_medium, E_medium_sparse, false, true, true);
    benchmark_algorithm("DFS Topological Sort",         [](const Graph& g){ dfs_topological_sort(g); },        V_medium, E_medium_sparse, false, true, true);

    benchmark_algorithm("Kahn's Topological Sort (Dense)", [](const Graph& g){ kahn_topological_sort(g); },    V_small, E_small_dense, false, true, true);
    benchmark_algorithm("DFS Topological Sort (Dense)",    [](const Graph& g){ dfs_topological_sort(g); },     V_small, E_small_dense, false, true, true);
    
    std::cout << "\n--- Benchmarking Complete ---" << std::endl;

    return 0;
}
```