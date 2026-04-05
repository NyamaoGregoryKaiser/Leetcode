```markdown
# Graph Algorithms Interview Project

This project provides a comprehensive set of implementations for fundamental graph algorithms, designed to be a thorough preparation resource for coding interviews. It includes optimal solutions, detailed explanations, extensive test cases, and performance benchmarking.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Project Structure](#project-structure)
3.  [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Building and Running](#building-and-running)
4.  [Algorithm Problems and Implementations](#algorithm-problems-and-implementations)
    *   [1. Graph Traversal (BFS & DFS)](#1-graph-traversal-bfs--dfs)
    *   [2. Shortest Path in Unweighted Graph (BFS)](#2-shortest-path-in-unweighted-graph-bfs)
    *   [3. Shortest Path in Weighted Graph (Dijkstra's Algorithm)](#3-shortest-path-in-weighted-graph-dijkstras-algorithm)
    *   [4. Cycle Detection and Topological Sort (Directed Graphs)](#4-cycle-detection-and-topological-sort-directed-graphs)
    *   [5. Minimum Spanning Tree (Prim's Algorithm)](#5-minimum-spanning-tree-prims-algorithm)
5.  [Documentation](#documentation)
    *   [Detailed Algorithm Explanations](#detailed-algorithm-explanations)
    *   [Visual Diagrams](#visual-diagrams)
6.  [Testing](#testing)
7.  [Performance Benchmarking](#performance-benchmarking)
8.  [Interview Tips and Best Practices](#interview-tips-and-best-practices)
9.  [Contributing](#contributing)
10. [License](#license)

## Project Overview

The goal of this project is to provide a solid foundation in graph algorithms. Each algorithm is implemented with:
*   Optimal time and space complexity.
*   Clear, commented Java code.
*   Support for directed and undirected graphs (where applicable).
*   Multiple approaches (e.g., iterative vs. recursive DFS).

The project also includes:
*   Robust test suites using JUnit 5 to ensure correctness.
*   A benchmarking utility to observe performance characteristics.
*   Comprehensive documentation covering theory, edge cases, and interview strategies.

## Project Structure

```
graph-algorithms-project/
├── src/
│   ├── main/
│   │   └── java/
│   │       └── com/
│   │           └── example/
│   │               └── graph/
│   │                   ├── model/                # Basic Graph Node, Edge, and Graph representations
│   │                   ├── problems/             # Main algorithm implementations
│   │                   └── util/                 # Utility for graph generation
│   ├── test/
│   │   └── java/
│   │       └── com/
│   │           └── example/
│   │               └── graph/
│   │                   └── GraphAlgorithmsTest.java # JUnit test cases
│   └── benchmark/
│       └── java/
│           └── com/
│               └── example/
│                   └── graph/
│                       └── PerformanceBenchmark.java # Performance measurement
├── docs/                                 # Documentation files
│   ├── AlgorithmsExplanation.md
│   └── Diagrams.md
├── pom.xml                               # Maven project configuration
└── README.md
```

## Getting Started

### Prerequisites

*   Java Development Kit (JDK) 11 or higher.
*   Apache Maven (optional, but recommended for dependency management and building).

### Building and Running

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/graph-algorithms-project.git
    cd graph-algorithms-project
    ```

2.  **Compile the project (using Maven):**
    ```bash
    mvn clean install
    ```
    If you don't use Maven, you can compile manually:
    ```bash
    javac -d target/classes src/main/java/com/example/graph/**/*.java src/test/java/com/example/graph/**/*.java src/benchmark/java/com/example/graph/**/*.java
    ```
    (Note: Manual compilation requires handling JUnit JARs on the classpath for tests).

3.  **Run Tests (using Maven):**
    ```bash
    mvn test
    ```
    This will execute `GraphAlgorithmsTest.java`.

4.  **Run Benchmarks:**
    You can run the `PerformanceBenchmark` class directly from your IDE or via Maven/javac.
    Using Maven (after `mvn clean install`):
    ```bash
    java -cp target/classes:target/test-classes com.example.graph.PerformanceBenchmark
    ```
    (Adjust classpath as needed for your environment, especially if not using Maven).

## Algorithm Problems and Implementations

### 1. Graph Traversal (BFS & DFS)

*   **Problem**: Explore all reachable nodes in a graph from a starting node.
*   **Implementation**: `GraphTraversal.java`
    *   `bfs(Graph graph, GraphNode startNode)`: Breadth-First Search, finding nodes level by level.
    *   `dfsRecursive(Graph graph, GraphNode startNode)`: Depth-First Search using recursion.
    *   `dfsIterative(Graph graph, GraphNode startNode)`: Depth-First Search using an explicit stack.
*   **Concepts**: Reachability, shortest path in unweighted graphs (BFS), cycle detection (DFS).

### 2. Shortest Path in Unweighted Graph (BFS)

*   **Problem**: Find the shortest path (minimum number of edges) between two nodes in an unweighted graph.
*   **Implementation**: `ShortestPathBFS.java`
    *   `findShortestPath(Graph graph, GraphNode startNode, GraphNode endNode)`: Returns a list of nodes forming the shortest path.
*   **Concepts**: BFS inherently finds the shortest path in unweighted graphs.

### 3. Shortest Path in Weighted Graph (Dijkstra's Algorithm)

*   **Problem**: Find the shortest paths from a single source node to all other nodes in a weighted graph with non-negative edge weights.
*   **Implementation**: `DijkstraAlgorithm.java`
    *   `findShortestPaths(Graph graph, GraphNode startNode)`: Returns a map of distances and predecessors.
*   **Concepts**: Greedy approach, priority queue, relaxation technique. Handles positive weights only.

### 4. Cycle Detection and Topological Sort (Directed Graphs)

*   **Problem**:
    *   Detect if a directed graph contains a cycle.
    *   For Directed Acyclic Graphs (DAGs), produce a linear ordering of its vertices such that for every directed edge `(u, v)`, vertex `u` comes before `v` in the ordering.
*   **Implementation**: `CycleDetectionAndTopologicalSort.java`
    *   `hasCycle(Graph graph)`: Detects if a cycle exists using DFS.
    *   `topologicalSort(Graph graph)`: Returns a topological order or throws an exception if a cycle is found.
*   **Concepts**: DFS states (unvisited, visiting, visited), DAGs, prerequisite problems.

### 5. Minimum Spanning Tree (Prim's Algorithm)

*   **Problem**: Find a subset of the edges of a connected, edge-weighted undirected graph that connects all the vertices together, without any cycles and with the minimum possible total edge weight.
*   **Implementation**: `PrimAlgorithm.java`
    *   `findMinimumSpanningTree(Graph graph)`: Returns a list of edges forming the MST.
*   **Concepts**: Greedy algorithm, priority queue, spanning forest (for disconnected graphs).

## Documentation

### Detailed Algorithm Explanations

Refer to `docs/AlgorithmsExplanation.md` for in-depth discussions on:
*   Problem definitions and intuition.
*   Step-by-step algorithmic logic.
*   Time and space complexity analysis (Big O notation).
*   Edge cases, limitations, and common pitfalls.
*   Variations and related problems.

### Visual Diagrams

Refer to `docs/Diagrams.md` for ASCII art representations of:
*   Example graph structures.
*   Illustrations of traversal paths (BFS, DFS).
*   Snapshots of algorithm execution (Dijkstra, Prim).

## Testing

The `src/test/java/com/example/graph/GraphAlgorithmsTest.java` file contains comprehensive JUnit 5 tests covering:
*   Small, medium, and complex graph structures.
*   Connected and disconnected graphs.
*   Graphs with cycles (where applicable) and acyclic graphs.
*   Edge cases like single-node graphs, empty graphs, and graphs with no paths between specific nodes.

## Performance Benchmarking

The `src/benchmark/java/com/example/graph/PerformanceBenchmark.java` file allows you to:
*   Execute each algorithm against graphs of varying sizes and densities.
*   Measure execution times to observe performance characteristics and validate complexity analyses empirically.
*   Understand how different input scales impact runtime.

## Interview Tips and Best Practices

The `docs/AlgorithmsExplanation.md` also includes a dedicated section on interview strategies:
*   **Understanding the problem**: Clarifying constraints, graph type, edge weights, etc.
*   **Choosing the right algorithm**: BFS vs. DFS, Dijkstra vs. Bellman-Ford, Prim vs. Kruskal.
*   **Common pitfalls**: Handling disconnected components, negative cycles, stack overflow for deep recursion, off-by-one errors.
*   **Space-time tradeoffs**: Discussing adjacency matrix vs. adjacency list.
*   **Communication**: Articulating thought process, explaining complexity, discussing alternatives.

## Contributing

Feel free to fork this repository, add more algorithms, refine explanations, or improve test cases. Pull requests are welcome!

## License

This project is licensed under the MIT License - see the LICENSE file for details (not included in this example, but standard practice).
```