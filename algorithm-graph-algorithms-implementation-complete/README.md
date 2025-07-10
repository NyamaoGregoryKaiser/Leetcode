# Graph Algorithms Project

This project contains implementations of several graph algorithms, including their complexities and alternative approaches.

## Problems:

1. **Breadth-First Search (BFS):**  Find the shortest path from a source node to all other reachable nodes in an unweighted graph.
2. **Depth-First Search (DFS):** Explore a graph by going as deep as possible along each branch before backtracking.  Includes cycle detection.
3. **Dijkstra's Algorithm:** Find the shortest path from a source node to all other nodes in a weighted graph with non-negative edge weights.
4. **Topological Sort (Kahn's Algorithm):** Find a linear ordering of nodes in a directed acyclic graph (DAG) such that for every directed edge from node A to node B, node A appears before node B in the ordering.

## Project Structure:

* `graph.h`: Header file for graph data structures and utility functions.
* `graph.cpp`: Implementation of graph data structures and algorithms.
* `main.cpp`: Main program to test the algorithms.
* `test_cases.cpp`:  Test cases for various scenarios. (To be expanded)
* `algorithms.md`: Detailed explanations of algorithms.