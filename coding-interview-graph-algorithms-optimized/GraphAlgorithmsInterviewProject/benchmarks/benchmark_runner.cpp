```cpp
#include "../src/graph.h"
#include "../src/graph_problems.cpp" // Include implementations for benchmarking
#include <chrono>
#include <iostream>
#include <random>
#include <vector>

// Helper to generate a random unweighted graph
Graph generateRandomUnweightedGraph(int V, int E) {
    Graph g(V);
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> dis_v(0, V - 1);

    for (int i = 0; i < E; ++i) {
        int u = dis_v(gen);
        int v = dis_v(gen);
        if (u != v) { // Avoid self-loops for simplicity in unweighted
            g.addEdge(u, v);
        }
    }
    return g;
}

// Helper to generate a random weighted graph
Graph generateRandomWeightedGraph(int V, int E, int minWeight, int maxWeight) {
    Graph g(V);
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> dis_v(0, V - 1);
    std::uniform_int_distribution<> dis_w(minWeight, maxWeight);

    for (int i = 0; i < E; ++i) {
        int u = dis_v(gen);
        int v = dis_v(gen);
        int w = dis_w(gen);
        if (u != v) { // Avoid self-loops for simplicity
            g.addWeightedEdge(u, v, w);
        }
    }
    return g;
}

// Helper to generate a random DAG for topological sort
Graph generateRandomDAG(int V, int E) {
    Graph g(V);
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> dis_v(0, V - 1);

    int added_edges = 0;
    while (added_edges < E) {
        int u = dis_v(gen);
        int v = dis_v(gen);
        if (u < v) { // Enforce u < v to prevent cycles (simple way to ensure DAG property)
            g.addEdge(u, v);
            added_edges++;
        }
    }
    return g;
}


void runBenchmarks() {
    std::cout << "--- Running Graph Algorithm Benchmarks ---" << std::endl;

    std::vector<std::pair<int, int>> graph_configs = {
        {100, 500},     // Small
        {1000, 5000},   // Medium sparse
        {1000, 20000},  // Medium dense (E=20*V)
        {5000, 25000},  // Large sparse
        {5000, 100000}  // Large dense (E=20*V)
    };

    for (const auto& config : graph_configs) {
        int V = config.first;
        int E = config.second;
        std::cout << "\nBenchmarking with V=" << V << ", E=" << E << std::endl;

        // --- BFS Benchmarking ---
        Graph g_bfs = generateRandomUnweightedGraph(V, E);
        int bfs_start_node = 0; // Fixed start node for consistency
        int bfs_end_node = V - 1;

        auto start_bfs = std::chrono::high_resolution_clock::now();
        GraphAlgorithms::shortestPathUnweightedBFS(g_bfs, bfs_start_node, bfs_end_node);
        auto end_bfs = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double, std::milli> duration_bfs = end_bfs - start_bfs;
        std::cout << "  BFS (Shortest Path): " << duration_bfs.count() << " ms" << std::endl;

        // --- Dijkstra Benchmarking ---
        Graph g_dijkstra = generateRandomWeightedGraph(V, E, 1, 100);
        int dijkstra_start_node = 0;

        auto start_dijkstra = std::chrono::high_resolution_clock::now();
        GraphAlgorithms::dijkstra(g_dijkstra, dijkstra_start_node);
        auto end_dijkstra = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double, std::milli> duration_dijkstra = end_dijkstra - start_dijkstra;
        std::cout << "  Dijkstra's Algorithm: " << duration_dijkstra.count() << " ms" << std::endl;

        // --- Cycle Detection Benchmarking ---
        Graph g_cycle_no = generateRandomUnweightedGraph(V, E / 2); // Less edges for faster non-cycle
        Graph g_cycle_yes = generateRandomUnweightedGraph(V, E);    // More edges for higher chance of cycle
        // Adding a guaranteed cycle for cycle-yes graph
        if (V >= 3) {
            g_cycle_yes.addEdge(0, 1);
            g_cycle_yes.addEdge(1, 2);
            g_cycle_yes.addEdge(2, 0);
        }

        auto start_cycle_no = std::chrono::high_resolution_clock::now();
        GraphAlgorithms::detectCycleDirectedDFS(g_cycle_no);
        auto end_cycle_no = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double, std::milli> duration_cycle_no = end_cycle_no - start_cycle_no;
        std::cout << "  Cycle Detection (No Cycle): " << duration_cycle_no.count() << " ms" << std::endl;

        auto start_cycle_yes = std::chrono::high_resolution_clock::now();
        GraphAlgorithms::detectCycleDirectedDFS(g_cycle_yes);
        auto end_cycle_yes = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double, std::milli> duration_cycle_yes = end_cycle_yes - start_cycle_yes;
        std::cout << "  Cycle Detection (With Cycle): " << duration_cycle_yes.count() << " ms" << std::endl;
        
        // --- Topological Sort Benchmarking ---
        Graph g_topo = generateRandomDAG(V, E);

        auto start_topo = std::chrono::high_resolution_clock::now();
        GraphAlgorithms::topologicalSortKahn(g_topo);
        auto end_topo = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double, std::milli> duration_topo = end_topo - start_topo;
        std::cout << "  Topological Sort (Kahn's): " << duration_topo.count() << " ms" << std::endl;
    }

    std::cout << "\n--- Benchmarks Finished ---" << std::endl;
}
```