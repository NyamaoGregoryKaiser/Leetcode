# Graph Algorithms Interview Project

This project contains implementations of various graph algorithms, along with test cases and performance benchmarks.  It's designed to help prepare for coding interviews focused on graph traversal and manipulation.

**Problems:**

1. **Breadth-First Search (BFS):** Find the shortest path from a source node to all reachable nodes in an unweighted graph.
2. **Depth-First Search (DFS):** Traverse a graph using depth-first exploration.  Includes applications like topological sort and cycle detection.
3. **Dijkstra's Algorithm:** Find the shortest paths from a single source node to all other nodes in a weighted graph with non-negative edge weights.
4. **Minimum Spanning Tree (Prim's Algorithm):** Find a minimum-weight spanning tree for a connected, weighted, undirected graph.
5. **Topological Sort (DFS-based):** Find a linear ordering of nodes in a directed acyclic graph (DAG) such that for every directed edge from node A to node B, node A appears before node B in the ordering.


**Project Structure:**

- `graph_algorithms.py`: Main implementation of graph algorithms.
- `test_graph_algorithms.py`: Unit tests.
- `utils.py`: Helper functions and data structures (Graph class).
- `benchmark.py`: Performance benchmarking code.
- `algorithms_explanation.md`: Detailed explanations of the algorithms.