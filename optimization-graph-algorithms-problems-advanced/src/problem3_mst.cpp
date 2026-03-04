```cpp
#include "graph.h"
#include <vector>
#include <algorithm> // For std::sort
#include <numeric>   // For std::iota
#include <iostream>
#include <tuple>     // For std::tuple (edge representation)

/**
 * @class DisjointSetUnion
 * @brief Implements the Disjoint Set Union (DSU) data structure with path compression and union by rank/size.
 *        Used to efficiently determine if two vertices are connected and to unite components.
 */
class DisjointSetUnion {
private:
    std::vector<int> parent; // parent[i] stores the parent of element i
    std::vector<int> rank;   // rank[i] stores the rank (or size) of the tree rooted at i

public:
    /**
     * @brief Constructor for DSU. Initializes each element as its own parent.
     * @param n The number of elements.
     */
    DisjointSetUnion(int n) {
        parent.resize(n);
        std::iota(parent.begin(), parent.end(), 0); // parent[i] = i
        rank.assign(n, 0); // Initialize ranks to 0 (or sizes to 1)
    }

    /**
     * @brief Finds the representative (root) of the set containing element 'i'.
     *        Applies path compression for optimization.
     * @param i The element whose representative is to be found.
     * @return The representative of the set.
     */
    int find(int i) {
        if (parent[i] == i)
            return i;
        return parent[i] = find(parent[i]); // Path compression
    }

    /**
     * @brief Unites the sets containing elements 'i' and 'j'.
     *        Applies union by rank (or size) for optimization.
     * @param i An element in the first set.
     * @param j An element in the second set.
     * @return True if the sets were different and were united, false otherwise (already in same set).
     */
    bool unite(int i, int j) {
        int root_i = find(i);
        int root_j = find(j);

        if (root_i != root_j) {
            // Union by rank: Attach smaller rank tree under root of high rank tree
            if (rank[root_i] < rank[root_j])
                parent[root_i] = root_j;
            else if (rank[root_i] > rank[root_j])
                parent[root_j] = root_i;
            else {
                // If ranks are same, make one root parent of other and increment its rank
                parent[root_j] = root_i;
                rank[root_i]++;
            }
            return true; // Sets were united
        }
        return false; // Already in the same set (would form a cycle)
    }
};

/**
 * @brief Finds the Minimum Spanning Tree (MST) of a connected, undirected graph
 *        using Kruskal's algorithm.
 * @param g The graph to find the MST for.
 * @return A pair:
 *         - first: The total weight of the MST.
 *         - second: A vector of edges (weight, u, v) included in the MST.
 *                   Returns an empty vector and 0 total weight if the graph is empty or not connected.
 *
 * @pre The graph must be undirected and connected. Kruskal's works on disconnected graphs
 *      to find a Minimum Spanning Forest (MSF), but total weight typically refers to a single MST.
 *      For this implementation, we assume a connected graph or identify an MSF.
 *
 * @complexity
 *   Time: O(E log E) or O(E log V).
 *         Sorting all edges takes O(E log E).
 *         DSU operations (find and unite) take nearly constant time on average due to path compression
 *         and union by rank/size (amortized O(alpha(V)), where alpha is inverse Ackermann function).
 *         Since E can be at most O(V^2), log E is at most O(log V^2) = O(2 log V) = O(log V).
 *         Thus, E log E is effectively E log V in sparse graphs.
 *   Space: O(V + E) for storing edges, DSU arrays, and the MST result.
 */
std::pair<int, std::vector<Edge>> kruskal(const Graph& g) {
    int V = g.getV();
    if (V <= 1) { // An MST requires at least 2 vertices to have an edge, 1 vertex has 0 cost MST
        return {0, {}};
    }

    std::vector<Edge> all_edges;
    // Extract all edges from the graph. Since Kruskal's operates on an undirected graph,
    // we should ensure each undirected edge (u, v) with weight w is added only once.
    // The Graph class `addEdge` adds directed edges. We need to iterate and add (u, v, w) once.
    // To handle this, we can either assume the input graph `g` has `addEdge(u,v,w)` and `addEdge(v,u,w)`
    // called for each undirected edge, and then process edges carefully or build an 'Edge' list.
    // A more robust way is to build a canonical list of undirected edges.
    // We'll collect all edges (u,v,w) and then sort them. Duplicate edges (v,u,w) are fine for sorting,
    // but the DSU will prevent adding a redundant edge from 'v' back to 'u' if 'u' and 'v' are already connected.

    for (int u = 0; u < V; ++u) {
        for (const auto& edge_pair : g.getAdj()[u]) {
            int v = edge_pair.first;
            int weight = edge_pair.second;
            // Add edge (u, v, weight). We only need to add each undirected edge once.
            // To avoid adding (u,v) and (v,u) if we process `g` as undirected,
            // a common strategy is to only add if u < v or use a set to track edges.
            // For simplicity in this implementation, we will add all directed edges
            // as Kruskal's `unite` operation naturally handles avoiding cycles.
            all_edges.push_back({weight, u, v});
        }
    }

    // Sort all edges by weight in non-decreasing order
    std::sort(all_edges.begin(), all_edges.end());

    DisjointSetUnion dsu(V);
    int mst_weight = 0;
    std::vector<Edge> mst_edges;
    int edges_in_mst = 0; // Counter for edges in MST

    // Kruskal's algorithm: Iterate through sorted edges
    for (const auto& edge : all_edges) {
        // If adding this edge does not form a cycle (i.e., u and v are in different sets)
        if (dsu.unite(edge.u, edge.v)) {
            mst_weight += edge.weight;
            mst_edges.push_back(edge);
            edges_in_mst++;
            // An MST of V vertices has exactly V-1 edges. Once we have V-1 edges, we can stop.
            if (edges_in_mst == V - 1) {
                break;
            }
        }
    }

    // Check if the graph was connected. If not, edges_in_mst will be less than V-1 (for V > 0).
    // An empty MST is valid for V=0 or V=1.
    if (V > 1 && edges_in_mst < V - 1) {
        std::cout << "Warning: Graph is disconnected. Found a Minimum Spanning Forest, not a single MST." << std::endl;
        // The current mst_weight and mst_edges represent an MSF.
        // For strict MST, you might return an error or indicate disconnection.
    }

    return {mst_weight, mst_edges};
}

int main() {
    std::cout << "--- Kruskal's Minimum Spanning Tree Algorithm ---" << std::endl;

    // Example 1: Standard undirected weighted graph
    Graph g1(9); // 9 vertices
    // Add edges for a common Kruskal's example. Remember to add reverse edges for undirected interpretation.
    g1.addEdge(0, 1, 4); g1.addEdge(1, 0, 4);
    g1.addEdge(0, 7, 8); g1.addEdge(7, 0, 8);
    g1.addEdge(1, 2, 8); g1.addEdge(2, 1, 8);
    g1.addEdge(1, 7, 11); g1.addEdge(7, 1, 11);
    g1.addEdge(2, 3, 7); g1.addEdge(3, 2, 7);
    g1.addEdge(2, 8, 2); g1.addEdge(8, 2, 2);
    g1.addEdge(2, 5, 4); g1.addEdge(5, 2, 4);
    g1.addEdge(3, 4, 9); g1.addEdge(4, 3, 9);
    g1.addEdge(3, 5, 14); g1.addEdge(5, 3, 14);
    g1.addEdge(4, 5, 10); g1.addEdge(5, 4, 10);
    g1.addEdge(5, 6, 2); g1.addEdge(6, 5, 2);
    g1.addEdge(6, 7, 1); g1.addEdge(7, 6, 1);
    g1.addEdge(6, 8, 6); g1.addEdge(8, 6, 6);
    g1.addEdge(7, 8, 7); g1.addEdge(8, 7, 7);


    std::cout << "\nGraph 1 (Undirected, Weighted):" << std::endl;
    g1.printGraph();

    auto mst_result1 = kruskal(g1);
    std::cout << "\nMST for Graph 1 (from node 0):" << std::endl;
    std::cout << "  Total MST Weight: " << mst_result1.first << std::endl;
    std::cout << "  Edges in MST:" << std::endl;
    for (const auto& edge : mst_result1.second) {
        std::cout << "    (" << edge.u << ", " << edge.v << ") Weight: " << edge.weight << std::endl;
    }
    // Expected MST Weight: 37

    // Example 2: Disconnected graph
    Graph g2(6);
    g2.addEdge(0, 1, 1); g2.addEdge(1, 0, 1);
    g2.addEdge(0, 2, 5); g2.addEdge(2, 0, 5);
    g2.addEdge(3, 4, 2); g2.addEdge(4, 3, 2);
    g2.addEdge(4, 5, 3); g2.addEdge(5, 4, 3);

    std::cout << "\nGraph 2 (Disconnected, Undirected, Weighted):" << std::endl;
    g2.printGraph();

    auto mst_result2 = kruskal(g2);
    std::cout << "\nMST/MSF for Graph 2:" << std::endl;
    std::cout << "  Total MST/MSF Weight: " << mst_result2.first << std::endl;
    std::cout << "  Edges in MST/MSF:" << std::endl;
    for (const auto& edge : mst_result2.second) {
        std::cout << "    (" << edge.u << ", " << edge.v << ") Weight: " << edge.weight << std::endl;
    }
    // Expected MSF Weight: (0-1, w:1), (3-4, w:2), (4-5, w:3) -> Total 6
    // Note: The warning about disconnected graph will be printed.

    // Example 3: Single node graph
    Graph g3(1);
    std::cout << "\nGraph 3 (Single Node):" << std::endl;
    g3.printGraph();
    auto mst_result3 = kruskal(g3);
    std::cout << "\nMST for Graph 3:" << std::endl;
    std::cout << "  Total MST Weight: " << mst_result3.first << std::endl;
    std::cout << "  Edges in MST: " << mst_result3.second.size() << std::endl;
    // Expected MST Weight: 0, 0 edges

    // Example 4: Empty graph
    Graph g4(0);
    std::cout << "\nGraph 4 (Empty):" << std::endl;
    g4.printGraph();
    auto mst_result4 = kruskal(g4);
    std::cout << "\nMST for Graph 4:" << std::endl;
    std::cout << "  Total MST Weight: " << mst_result4.first << std::endl;
    std::cout << "  Edges in MST: " << mst_result4.second.size() << std::endl;
    // Expected MST Weight: 0, 0 edges

    return 0;
}
```