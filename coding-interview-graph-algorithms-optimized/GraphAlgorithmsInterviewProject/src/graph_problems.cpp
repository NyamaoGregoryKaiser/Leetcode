```cpp
#include "graph.h"
#include <queue>
#include <stack> // Not directly used in these algorithms but useful for iterative DFS
#include <limits> // For numeric_limits
#include <algorithm> // For std::reverse
#include <map>      // For in-degree in topological sort if using map, but vector is better for 0..V-1 nodes

// Using a namespace to encapsulate graph problem solutions
namespace GraphAlgorithms {

    // Problem 1: Shortest Path in Unweighted Graph (BFS)
    // Goal: Find the shortest path (in terms of number of edges) from a source to a destination.
    // Returns: A vector representing the path. Empty if destination is unreachable.
    // If source == dest, returns {source}.
    std::vector<int> shortestPathUnweightedBFS(const Graph& g, int startNode, int endNode) {
        int V = g.getNumVertices();
        if (startNode < 0 || startNode >= V || endNode < 0 || endNode >= V) {
            std::cerr << "Error: startNode or endNode out of bounds." << std::endl;
            return {};
        }

        if (startNode == endNode) {
            return {startNode};
        }

        std::vector<int> parent(V, -1); // To reconstruct path
        std::vector<int> dist(V, -1);   // To store shortest distance (and act as visited array: -1 unvisited)
        std::queue<int> q;

        q.push(startNode);
        dist[startNode] = 0;

        while (!q.empty()) {
            int u = q.front();
            q.pop();

            // Optimization: If we reached the endNode, we can stop early
            // The first time we reach endNode, it's via the shortest path.
            if (u == endNode) {
                break;
            }

            for (int v : g.getAdjUnweighted()[u]) {
                if (dist[v] == -1) { // If not visited
                    dist[v] = dist[u] + 1;
                    parent[v] = u;
                    q.push(v);
                }
            }
        }

        // Reconstruct path
        std::vector<int> path;
        if (dist[endNode] == -1) { // endNode is unreachable
            return {};
        }

        int curr = endNode;
        while (curr != -1) {
            path.push_back(curr);
            curr = parent[curr];
        }
        std::reverse(path.begin(), path.end()); // Path is built backwards, so reverse it
        return path;
    }

    /*
    * Time Complexity: O(V + E)
    *   - Each vertex is enqueued and dequeued at most once: O(V)
    *   - Each edge is examined at most once (for directed graph): O(E)
    * Space Complexity: O(V + E)
    *   - `parent` and `dist` arrays: O(V)
    *   - `queue`: O(V) in worst case (e.g., star graph)
    *   - `path` vector: O(V) in worst case (path covers all nodes)
    *   - Adjacency list storage: O(V + E) for the graph itself.
    */

    // Problem 2: Dijkstra's Algorithm (Shortest Path in Weighted Graph with Non-Negative Weights)
    // Goal: Find the shortest path distances from a source node to all other nodes.
    // Returns: A vector of distances. `std::numeric_limits<int>::max()` if unreachable.
    // Does not return paths directly, but `parent` array could be added for path reconstruction.
    std::vector<int> dijkstra(const Graph& g, int startNode) {
        int V = g.getNumVertices();
        if (startNode < 0 || startNode >= V) {
            std::cerr << "Error: startNode out of bounds for Dijkstra." << std::endl;
            return {};
        }

        // distances[i] will hold the shortest distance from startNode to i
        std::vector<int> distances(V, std::numeric_limits<int>::max());
        // `parent` array can be added here for path reconstruction, if needed.
        // std::vector<int> parent(V, -1); 

        // Min-priority queue: stores pairs of {distance, vertex}
        // `std::greater` makes it a min-heap
        std::priority_queue<std::pair<int, int>,
                            std::vector<std::pair<int, int>>,
                            std::greater<std::pair<int, int>>> pq;

        distances[startNode] = 0;
        pq.push({0, startNode}); // {distance, vertex}

        while (!pq.empty()) {
            int d = pq.top().first;  // Current shortest distance to u
            int u = pq.top().second; // Current vertex
            pq.pop();

            // If we've found a shorter path to u already, skip this stale entry
            if (d > distances[u]) {
                continue;
            }

            // Iterate over all neighbors of u
            for (const auto& edge : g.getAdjWeighted()[u]) {
                int v = edge.first;     // Neighbor vertex
                int weight = edge.second; // Edge weight

                // If a shorter path to v is found through u
                if (distances[u] != std::numeric_limits<int>::max() && // Ensure distances[u] isn't infinity
                    distances[u] + weight < distances[v]) {
                    distances[v] = distances[u] + weight;
                    // parent[v] = u; // For path reconstruction
                    pq.push({distances[v], v});
                }
            }
        }
        return distances;
    }

    /*
    * Time Complexity: O(E log V)
    *   - Each vertex is extracted from the priority queue at most once: V extractions, each O(log V).
    *   - Each edge relaxation (update) leads to at most one insertion into the priority queue: E insertions, each O(log V).
    *   - Total: O(V log V + E log V) = O((V+E) log V). For sparse graphs (E ~ V), this is O(V log V).
    *   - If E is much larger than V (dense graphs), it can be closer to O(E log V).
    *   - V = Number of vertices, E = Number of edges.
    * Space Complexity: O(V + E)
    *   - `distances` array: O(V)
    *   - `priority_queue`: In worst case, can store up to O(E) elements.
    *   - Adjacency list storage: O(V + E) for the graph itself.
    */

    // Helper function for Problem 3: Cycle Detection in Directed Graph (DFS)
    // Returns true if a cycle is detected, false otherwise.
    bool dfs_check_cycle_util(int u, const Graph& g, std::vector<NodeState>& state) {
        state[u] = VISITING; // Mark current node as visiting (in recursion stack)

        for (int v : g.getAdjUnweighted()[u]) {
            if (state[v] == VISITING) {
                // Found a back-edge to an ancestor currently in recursion stack -> CYCLE!
                return true;
            }
            if (state[v] == UNVISITED) {
                if (dfs_check_cycle_util(v, g, state)) {
                    // Cycle found in a deeper recursion call, propagate it
                    return true;
                }
            }
            // If state[v] == VISITED, it means that subtree has been fully explored
            // and no cycle was found through it, so we can ignore it.
        }

        state[u] = VISITED; // Mark current node as fully visited (finished processing its descendants)
        return false;
    }

    // Problem 3: Cycle Detection in Directed Graph (DFS)
    // Goal: Determine if a directed graph contains any cycles.
    // Returns: True if a cycle is found, false otherwise.
    bool detectCycleDirectedDFS(const Graph& g) {
        int V = g.getNumVertices();
        // State for each node: 0=UNVISITED, 1=VISITING (in recursion stack), 2=VISITED (finished)
        std::vector<NodeState> state(V, UNVISITED);

        for (int i = 0; i < V; ++i) {
            if (state[i] == UNVISITED) {
                if (dfs_check_cycle_util(i, g, state)) {
                    return true; // Cycle found in this component
                }
            }
        }
        return false; // No cycle found in any component
    }

    /*
    * Time Complexity: O(V + E)
    *   - Each vertex is visited once by the DFS, and enters the recursion stack once.
    *   - Each edge is traversed once.
    * Space Complexity: O(V + E)
    *   - `state` array: O(V)
    *   - Recursion stack: O(V) in worst case (skewed graph).
    *   - Adjacency list storage: O(V + E) for the graph itself.
    */

    // Problem 4: Topological Sort (Kahn's Algorithm - BFS based)
    // Goal: Produce a linear ordering of vertices such that for every directed edge u -> v,
    // vertex u comes before v in the ordering. Only possible for Directed Acyclic Graphs (DAGs).
    // Returns: A vector representing a topological order. Empty if graph contains a cycle.
    std::vector<int> topologicalSortKahn(const Graph& g) {
        int V = g.getNumVertices();
        std::vector<int> in_degree(V, 0); // Stores in-degree for each node
        std::queue<int> q;                // Queue for nodes with in-degree 0
        std::vector<int> topological_order; // Resulting topological order
        
        // Calculate in-degrees for all nodes
        for (int u = 0; u < V; ++u) {
            for (int v : g.getAdjUnweighted()[u]) {
                in_degree[v]++;
            }
        }

        // Enqueue all nodes with in-degree 0
        for (int i = 0; i < V; ++i) {
            if (in_degree[i] == 0) {
                q.push(i);
            }
        }

        int visited_nodes_count = 0; // Count nodes added to topological_order

        while (!q.empty()) {
            int u = q.front();
            q.pop();
            topological_order.push_back(u);
            visited_nodes_count++;

            // For each neighbor v of u
            for (int v : g.getAdjUnweighted()[u]) {
                in_degree[v]--; // Decrement in-degree of v
                if (in_degree[v] == 0) {
                    q.push(v); // If v's in-degree becomes 0, add to queue
                }
            }
        }

        // If visited_nodes_count is not equal to V, a cycle exists
        // and a topological sort is not possible.
        if (visited_nodes_count != V) {
            // std::cerr << "Error: Graph contains a cycle, topological sort not possible." << std::endl;
            return {}; // Return empty vector indicating a cycle
        }

        return topological_order;
    }

    /*
    * Time Complexity: O(V + E)
    *   - Initial in-degree calculation: O(V + E) (iterating through all edges)
    *   - Each vertex is added to and removed from the queue at most once: O(V)
    *   - Each edge is processed once when its source vertex is popped from the queue: O(E)
    * Space Complexity: O(V + E)
    *   - `in_degree` array: O(V)
    *   - `queue`: O(V) in worst case (e.g., disconnected nodes).
    *   - `topological_order` vector: O(V)
    *   - Adjacency list storage: O(V + E) for the graph itself.
    */

} // namespace GraphAlgorithms
```