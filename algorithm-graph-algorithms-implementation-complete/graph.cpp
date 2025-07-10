#include "graph.h"

template <typename T>
Graph<T>::Graph(int numNodes) : numNodes(numNodes), adjList(numNodes), visited(numNodes, false), recursionStack(numNodes, false) {}

template <typename T>
void Graph<T>::addEdge(int u, int v, int weight) {
    adjList[u].push_back({v, weight});
}


template <typename T>
vector<int> Graph<T>::bfs(int startNode) {
    vector<int> distances(numNodes, -1);
    queue<int> q;
    q.push(startNode);
    distances[startNode] = 0;

    while (!q.empty()) {
        int u = q.front();
        q.pop();

        for (auto& edge : adjList[u]) {
            int v = edge.first;
            if (distances[v] == -1) {
                distances[v] = distances[u] + 1;
                q.push(v);
            }
        }
    }
    return distances;
}


template <typename T>
vector<int> Graph<T>::dfs(int startNode) {
    vector<int> visitedNodes;
    vector<bool> visited(numNodes, false);
    function<void(int)> dfsRecursive = [&](int u) {
        visited[u] = true;
        visitedNodes.push_back(u);
        for (auto& edge : adjList[u]) {
            int v = edge.first;
            if (!visited[v]) {
                dfsRecursive(v);
            }
        }
    };
    dfsRecursive(startNode);
    return visitedNodes;

}


template <typename T>
vector<int> Graph<T>::dijkstra(int startNode) {
    vector<int> distances(numNodes, numeric_limits<int>::max());
    distances[startNode] = 0;
    vector<bool> visited(numNodes, false);

    for (int count = 0; count < numNodes - 1; count++) {
        int u = minDistance(distances, visited);
        visited[u] = true;

        for (auto& edge : adjList[u]) {
            int v = edge.first;
            int weight = edge.second;
            if (!visited[v] && distances[u] != numeric_limits<int>::max() && distances[u] + weight < distances[v]) {
                distances[v] = distances[u] + weight;
            }
        }
    }
    return distances;
}

template <typename T>
int Graph<T>::minDistance(const vector<int>& dist, const vector<bool>& visited) {
    int min = numeric_limits<int>::max(), min_index = -1;
    for (int v = 0; v < numNodes; v++) {
        if (!visited[v] && dist[v] <= min) {
            min = dist[v];
            min_index = v;
        }
    }
    return min_index;
}

//Placeholder for Topological Sort and Cycle Detection (Kahn's Algorithm and DFS based cycle detection would go here)
template <typename T>
vector<int> Graph<T>::topologicalSort() { return {}; } // Placeholder

template <typename T>
bool Graph<T>::isCyclic() { return false; } //Placeholder