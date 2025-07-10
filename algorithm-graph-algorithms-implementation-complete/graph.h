#ifndef GRAPH_H
#define GRAPH_H

#include <vector>
#include <limits> // for numeric_limits
#include <queue>
#include <iostream>
#include <algorithm>


using namespace std;


template <typename T>
class Graph {
public:
    Graph(int numNodes);
    void addEdge(int u, int v, int weight = 1); // weight defaults to 1 for unweighted graphs
    vector<int> bfs(int startNode);
    vector<int> dfs(int startNode);
    vector<int> dijkstra(int startNode);
    vector<int> topologicalSort();
    bool isCyclic();

private:
    int numNodes;
    vector<vector<pair<int, int>>> adjList; // Adjacency list: {neighbor, weight}
    vector<bool> visited;
    vector<int> recursionStack;

};

#include "graph.cpp" // Include implementation in header for simplicity (Not ideal for large projects)

#endif