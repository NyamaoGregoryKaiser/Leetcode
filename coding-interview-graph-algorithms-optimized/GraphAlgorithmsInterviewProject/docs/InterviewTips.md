```markdown
# Interview Tips for Graph Algorithms

Graph algorithms are a staple in technical interviews. Being able to correctly identify the type of graph problem, choose the optimal algorithm, implement it flawlessly, and communicate your thought process effectively are critical skills.

## General Approach to Graph Problems

1.  **Understand the Problem (The 5 W's):**
    *   **What** is the goal? (Shortest path, cycle detection, connectivity, etc.)
    *   **Which** graph type? (Directed/Undirected, Weighted/Unweighted, Cyclic/Acyclic)
    *   **Why** this structure? (Why is it a graph problem? What are nodes and edges?)
    *   **When** to use certain algorithms?
    *   **Where** are the constraints? (Number of nodes/edges, value ranges, time/memory limits)
    *   **Draw an Example:** Always start with a small example. Walk through it manually.

2.  **Choose the Right Representation:**
    *   **Adjacency List:** Most common, space-efficient for sparse graphs (E << V^2). Preferred for BFS/DFS, Dijkstra, topological sort. `std::vector<std::vector<int>>` or `std::vector<std::vector<std::pair<int, int>>>`.
    *   **Adjacency Matrix:** Space-efficient for dense graphs (E ~ V^2), easy to check `(u, v)` edge existence in O(1). `std::vector<std::vector<bool>>` or `std::vector<std::vector<int>>`. Less common in interviews unless specified.
    *   **Edge List:** Useful for algorithms like Kruskal's (MST) or Bellman-Ford. `std::vector<Edge>`.

3.  **Identify the Core Algorithm:**
    *   **Unweighted Shortest Path / Reachability:** BFS.
    *   **Weighted Shortest Path (Non-negative weights):** Dijkstra's Algorithm.
    *   **Weighted Shortest Path (Negative weights, no negative cycles):** Bellman-Ford.
    *   **All-Pairs Shortest Path:** Floyd-Warshall.
    *   **Connectivity / Traversal:** DFS or BFS.
    *   **Cycle Detection (Directed):** DFS with 3 states (UNVISITED, VISITING, VISITED).
    *   **Cycle Detection (Undirected):** DFS (detect back-edges to non-parent visited nodes) or Union-Find.
    *   **Topological Sort:** Kahn's (BFS-based with in-degrees) or DFS-based (post-order traversal). Only for DAGs.
    *   **Minimum Spanning Tree (MST):** Prim's or Kruskal's.

4.  **Discuss Time and Space Complexity:**
    *   Before coding, explain your chosen algorithm's complexity.
    *   Justify why it's optimal (or suitable given constraints).
    *   Be prepared to compare with brute force or less optimal approaches.

5.  **Code (Think Aloud!):**
    *   **Clarity:** Use meaningful variable names.
    *   **Modularity:** Break down the solution into helper functions if necessary.
    *   **Edge Cases:** Think about empty graph, single node, disconnected components, source=destination, invalid inputs (if applicable).
    *   **Data Structures:** Choose appropriate ones (queue for BFS, priority queue for Dijkstra, stack for iterative DFS, `std::vector<bool>` for visited arrays, `std::unordered_map` for non-integer nodes).
    *   **Error Handling:** Discuss if not implementing.

6.  **Test and Debug:**
    *   Walk through your code with the example you drew.
    *   Consider edge cases. What happens with an empty graph? A graph with only one node? A disconnected graph?
    *   If using iterative DFS, be careful with stack management.

## Common Graph Variations & Interviewer Questions

*   **Grid Problems:** Often disguised graph problems. Each cell is a node, adjacent cells are edges. BFS/DFS for shortest path, island counting, etc.
    *   *Tip:* Convert (row, col) to a single integer index `row * num_cols + col` if needed, or just pass `(r,c)` tuples.
*   **Implicit Graphs:** The graph isn't explicitly given, but implied by relationships (e.g., word ladders, state-space search puzzles). You construct nodes/edges on the fly.
*   **"Find if path exists":** BFS or DFS.
*   **"All paths between two nodes":** Usually DFS. Be careful with cycles; may need path tracking.
*   **"Connected Components":** BFS/DFS from each unvisited node.
*   **"Strongly Connected Components (SCCs)":** Tarjan's or Kosaraju's algorithm (more advanced, less common for typical interviews but good to know for context).
*   **Bipartite Check:** BFS/DFS with 2-coloring. If an adjacent node has the same color, it's not bipartite.
*   **Minimum Spanning Tree (MST):** Prim's (like Dijkstra for edges) or Kruskal's (Union-Find).
    *   *Variation:* "Minimum cost to connect all computers/cities."
*   **Graph Coloring:** Assign colors to nodes such that no two adjacent nodes have the same color. Usually NP-hard, but specific cases (e.g., 2-coloring for bipartite) are solvable.
*   **Negative Cycles:** Bellman-Ford can detect them. Crucial for some financial or arbitrage problems.

## Specific Tips for Each Implemented Algorithm

### BFS for Shortest Path (Unweighted)
*   **Key:** Queue, `visited` array (or distance array initialized to -1).
*   **Remember:** First time a node is visited, it's via the shortest path.
*   **Path Reconstruction:** Keep track of `parent` pointers.

### Dijkstra's Algorithm (Weighted, Non-Negative)
*   **Key:** Min-priority queue storing `{distance, node}`, `distance` array initialized to `infinity`.
*   **Optimization:** Use `std::priority_queue` with `std::greater` for min-heap.
*   **Stale Entries:** Handle cases where you extract a node from PQ but its distance in the `dist` array is already shorter (meaning a better path was found and processed earlier).

### Cycle Detection (Directed, DFS)
*   **Key:** Three states for nodes: `UNVISITED`, `VISITING` (in current DFS recursion stack), `VISITED` (fully processed).
*   **Detection:** Encountering a `VISITING` node means a back-edge to an ancestor, hence a cycle.
*   **Recursive Nature:** Understand the recursion stack and how states are updated upon entering/exiting a recursion.

### Topological Sort (Kahn's Algorithm - BFS based)
*   **Key:** Calculate initial `in_degrees` for all nodes. Use a queue to store nodes with `in_degree == 0`.
*   **Process:** Dequeue a node, add to result, decrement in-degree of its neighbors. If a neighbor's in-degree becomes 0, enqueue it.
*   **Cycle Detection:** If the number of nodes in the topological sort is less than the total number of nodes, a cycle exists.
*   **Alternative:** DFS-based topological sort (post-order traversal, reversed).

## C++ Specific Tips

*   **`std::vector<std::vector<int>> adj;`** for adjacency list.
*   **`std::vector<std::vector<std::pair<int, int>>> adj_weighted;`** for weighted adjacency list (pair is usually `{neighbor, weight}`).
*   **`std::queue<int> q;`** for BFS.
*   **`std::priority_queue<std::pair<int, int>, std::vector<std::pair<int, int>>, std::greater<std::pair<int, int>>> pq;`** for min-priority queue (e.g., Dijkstra). Stores `{distance, node_index}`.
*   **`std::vector<bool> visited;`** or `std::vector<int> dist;` for state tracking.
*   **`std::numeric_limits<int>::max()`** for infinity.
*   **`#include <vector>`, `<queue>`, `<stack>`, `<limits>`, `<map>`, `<set>`.**
*   Pass graph objects or adjacency lists by `const reference` (`const Graph& g`) to avoid unnecessary copies.

By understanding these concepts, practicing regularly, and focusing on clear communication, you'll be well-prepared to tackle graph algorithm questions in your interviews. Good luck!
```