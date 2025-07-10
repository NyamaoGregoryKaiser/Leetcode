#include "graph.h"
#include <iostream>


int main() {
    Graph<int> g(6);
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 2);
    g.addEdge(2, 0);
    g.addEdge(2, 3);
    g.addEdge(3, 3);


    cout << "BFS from node 0: ";
    for (int dist : g.bfs(0)) {
        cout << dist << " ";
    }
    cout << endl;

    cout << "DFS from node 0: ";
    for (int node : g.dfs(0)) {
        cout << node << " ";
    }
    cout << endl;


    //Add Dijkstra's and Topological Sort calls here...

    return 0;
}