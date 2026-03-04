```markdown
# Graph Algorithms Interview Project

This project provides a comprehensive set of implementations, tests, benchmarks, and documentation for common graph algorithms frequently encountered in coding interviews. It aims to be a complete resource for understanding, practicing, and mastering graph-related problems.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Building and Running](#building-and-running)
3.  [Graph Data Structure](#graph-data-structure)
4.  [Problems Implemented](#problems-implemented)
    *   [Problem 1: Graph Traversals (BFS & DFS)](#problem-1-graph-traversals-bfs--dfs)
    *   [Problem 2: Shortest Path (Dijkstra's Algorithm)](#problem-2-shortest-path-dijkstras-algorithm)
    *   [Problem 3: Minimum Spanning Tree (Kruskal's Algorithm)](#problem-3-minimum-spanning-tree-kruskals-algorithm)
    *   [Problem 4: Topological Sort (Kahn's & DFS-based)](#problem-4-topological-sort-kahns--dfs-based)
5.  [Testing](#testing)
6.  [Benchmarking](#benchmarking)
7.  [Documentation](#documentation)
    *   [Algorithms Explained](#algorithms-explained)
    *   [Interview Guide](#interview-guide)

## Project Structure

```
graph_algorithms_project/
├── CMakeLists.txt            # CMake build configuration
├── README.md                 # This file
├── src/                      # Source code for graph data structure and algorithms
│   ├── graph.h               # Graph class definition (adjacency list)
│   ├── graph.cpp             # Graph class implementation
│   ├── problem1_traversals.cpp      # BFS, DFS (recursive, iterative)
│   ├── problem2_shortest_path.cpp   # Dijkstra's Algorithm
│   ├── problem3_mst.cpp             # Kruskal's Algorithm (with DSU)
│   └── problem4_topological_sort.cpp# Kahn's Algorithm, DFS-based Topological Sort
├── tests/                    # Unit tests for each problem
│   ├── test_traversals.cpp
│   ├── test_shortest_path.cpp
│   ├── test_mst.cpp
│   └── test_topological_sort.cpp
├── benchmarks/               # Performance benchmarking code
│   └── benchmark_main.cpp
└── docs/                     # Documentation files
    ├── algorithms_explained.md   # Detailed explanation of algorithms, complexities, diagrams
    └── interview_guide.md        # Tips, common questions, edge cases for graph interviews
```

## Building and Running

To build and run this project, you will need `CMake` and a C++17 compatible compiler (e.g., g++ or clang++).

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your_username/graph_algorithms_project.git
    cd graph_algorithms_project
    ```
    *(Note: Replace `https://github.com/your_username/graph_algorithms_project.git` with your actual repo URL if you host this project.)*

2.  **Create a build directory and configure CMake:**
    ```bash
    mkdir build
    cd build
    cmake ..
    ```

3.  **Build the project:**
    ```bash
    cmake --build .
    ```
    This will compile all executables (main algorithm demonstrations, tests, and benchmarks).

4.  **Run specific algorithm demonstrations:**
    After building, you can find the executables in the `build` directory.
    ```bash
    ./traversals_main
    ./shortest_path_main
    ./mst_main
    ./topological_sort_main
    ```

## Graph Data Structure

The project uses an `Adjacency List` representation for the `Graph` class. This is generally preferred for sparse graphs (fewer edges relative to nodes) which are common in interviews, as it's more memory-efficient than an adjacency matrix.

**Key Features:**
*   Supports weighted graphs (edges stored as `std::pair<int, int>` where the second element is the weight).
*   Flexible for directed or undirected graphs (addEdge can be called once for directed, twice for undirected).

## Problems Implemented

### Problem 1: Graph Traversals (BFS & DFS)

**Description:**
Explore all reachable nodes from a starting node.
*   **Breadth-First Search (BFS):** Explores all neighbor nodes at the current depth level before moving on to nodes at the next depth level. Uses a queue.
*   **Depth-First Search (DFS):** Explores as far as possible along each branch before backtracking. Can be implemented recursively or iteratively using a stack.

**Implementations:**
*   `bfs(const Graph& g, int startNode)`
*   `dfs_recursive(const Graph& g, int startNode)`
*   `dfs_iterative(const Graph& g, int startNode)`

**File:** `src/problem1_traversals.cpp`

### Problem 2: Shortest Path (Dijkstra's Algorithm)

**Description:**
Finds the shortest paths from a single source node to all other nodes in a graph with non-negative edge weights. It uses a greedy approach and a priority queue to efficiently select the next closest node.

**Implementation:**
*   `dijkstra(const Graph& g, int startNode)`: Returns distances to all nodes.

**File:** `src/problem2_shortest_path.cpp`
*(Note: For graphs with negative edge weights, Bellman-Ford algorithm would be required, but it's not implemented here to keep the project focused on common interview staples.)*

### Problem 3: Minimum Spanning Tree (Kruskal's Algorithm)

**Description:**
Finds a subset of the edges of a connected, edge-weighted undirected graph that connects all the vertices together, without any cycles and with the minimum possible total edge weight.

**Implementation:**
*   `kruskal(const Graph& g)`: Uses a Disjoint Set Union (DSU) data structure to efficiently detect cycles. It sorts all edges by weight and iteratively adds the smallest-weight edges that do not form a cycle.

**File:** `src/problem3_mst.cpp`
*(Note: Prim's algorithm is another popular MST algorithm, often better for dense graphs. Kruskal's is implemented here due to its intuitive nature and reliance on DSU, another important data structure.)*

### Problem 4: Topological Sort (Kahn's & DFS-based)

**Description:**
For a Directed Acyclic Graph (DAG), a topological sort is a linear ordering of its vertices such that for every directed edge `u -> v`, vertex `u` comes before `v` in the ordering.

**Implementations:**
*   `kahn_topological_sort(const Graph& g)`: BFS-based approach that uses in-degrees of nodes.
*   `dfs_topological_sort(const Graph& g)`: DFS-based approach that uses a stack to store vertices in reverse finish time order.

**File:** `src/problem4_topological_sort.cpp`

## Testing

Unit tests are provided for each algorithm to ensure correctness across various scenarios including:
*   Empty graphs
*   Single node graphs
*   Disconnected graphs
*   Linear graphs
*   Cyclic graphs (where applicable, e.g., BFS/DFS)
*   Dense and sparse graphs
*   Graphs with various edge weights

To run all tests:
```bash
cd build
cmake --build . --target run_all_tests
# OR
./run_tests_traversals
./run_tests_shortest_path
./run_tests_mst
./run_tests_topological_sort
```

## Benchmarking

Performance benchmarking code is included to measure the execution time of each algorithm on large, randomly generated graphs. This helps to understand their practical time complexity characteristics.

To run benchmarks:
```bash
cd build
./run_benchmarks
```

## Documentation

The `docs/` directory contains detailed explanations:

### Algorithms Explained (`docs/algorithms_explained.md`)

*   **Detailed Concepts:** In-depth explanation of how each algorithm works.
*   **Step-by-step logic:** Breakdown of the process.
*   **ASCII Diagrams:** Visual representations of graph states and algorithm flow.
*   **Time and Space Complexity Analysis:** A thorough examination of the Big O notation for each algorithm.
*   **Edge Cases and Gotchas:** Common pitfalls and specific scenarios to consider.
*   **Variations and Extensions:** Discussions on how algorithms can be adapted or related to other problems.

### Interview Guide (`docs/interview_guide.md`)

*   **General Tips:** Strategies for approaching graph problems in an interview setting.
*   **Common Interview Questions:** Example questions related to each algorithm.
*   **Follow-up Questions:** How interviewers might extend initial questions.
*   **Design Choices:** Discussion on adjacency list vs. matrix, directed vs. undirected, weighted vs. unweighted.
*   **Debugging Strategies:** Tips for finding errors in graph implementations.

---
```
```bash
# Example usage:
# cd build
# cmake ..
# cmake --build .

# Run specific problem demos:
# ./traversals_main
# ./shortest_path_main
# ./mst_main
# ./topological_sort_main

# Run tests:
# ./run_all_tests # or ./run_tests_traversals etc.

# Run benchmarks:
# ./run_benchmarks
```
---
```
```markdown
# Graph Algorithms Interview Project

This project provides a comprehensive set of implementations, tests, benchmarks, and documentation for common graph algorithms frequently encountered in coding interviews. It aims to be a complete resource for understanding, practicing, and mastering graph-related problems.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Building and Running](#building-and-running)
3.  [Graph Data Structure](#graph-data-structure)
4.  [Problems Implemented](#problems-implemented)
    *   [Problem 1: Graph Traversals (BFS & DFS)](#problem-1-graph-traversals-bfs--dfs)
    *   [Problem 2: Shortest Path (Dijkstra's Algorithm)](#problem-2-shortest-path-dijkstras-algorithm)
    *   [Problem 3: Minimum Spanning Tree (Kruskal's Algorithm)](#problem-3-minimum-spanning-tree-kruskals-algorithm)
    *   [Problem 4: Topological Sort (Kahn's & DFS-based)](#problem-4-topological-sort-kahns--dfs-based)
5.  [Testing](#testing)
6.  [Benchmarking](#benchmarking)
7.  [Documentation](#documentation)
    *   [Algorithms Explained](#algorithms-explained)
    *   [Interview Guide](#interview-guide)

## Project Structure

```
graph_algorithms_project/
├── CMakeLists.txt            # CMake build configuration
├── README.md                 # This file
├── src/                      # Source code for graph data structure and algorithms
│   ├── graph.h               # Graph class definition (adjacency list)
│   ├── graph.cpp             # Graph class implementation
│   ├── problem1_traversals.cpp      # BFS, DFS (recursive, iterative)
│   ├── problem2_shortest_path.cpp   # Dijkstra's Algorithm
│   ├── problem3_mst.cpp             # Kruskal's Algorithm (with DSU)
│   └── problem4_topological_sort.cpp# Kahn's Algorithm, DFS-based Topological Sort
├── tests/                    # Unit tests for each problem
│   ├── test_traversals.cpp
│   ├── test_shortest_path.cpp
│   ├── test_mst.cpp
│   └── test_topological_sort.cpp
├── benchmarks/               # Performance benchmarking code
│   └── benchmark_main.cpp
└── docs/                     # Documentation files
    ├── algorithms_explained.md   # Detailed explanation of algorithms, complexities, diagrams
    └── interview_guide.md        # Tips, common questions, edge cases for graph interviews
```

## Building and Running

To build and run this project, you will need `CMake` and a C++17 compatible compiler (e.g., g++ or clang++).

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your_username/graph_algorithms_project.git
    cd graph_algorithms_project
    ```
    *(Note: Replace `https://github.com/your_username/graph_algorithms_project.git` with your actual repo URL if you host this project.)*

2.  **Create a build directory and configure CMake:**
    ```bash
    mkdir build
    cd build
    cmake ..
    ```

3.  **Build the project:**
    ```bash
    cmake --build .
    ```
    This will compile all executables (main algorithm demonstrations, tests, and benchmarks).

4.  **Run specific algorithm demonstrations:**
    After building, you can find the executables in the `build` directory.
    ```bash
    ./traversals_main
    ./shortest_path_main
    ./mst_main
    ./topological_sort_main
    ```

## Graph Data Structure

The project uses an `Adjacency List` representation for the `Graph` class. This is generally preferred for sparse graphs (fewer edges relative to nodes) which are common in interviews, as it's more memory-efficient than an adjacency matrix.

**Key Features:**
*   Supports weighted graphs (edges stored as `std::pair<int, int>` where the second element is the weight).
*   Flexible for directed or undirected graphs (addEdge can be called once for directed, twice for undirected).

## Problems Implemented

### Problem 1: Graph Traversals (BFS & DFS)

**Description:**
Explore all reachable nodes from a starting node.
*   **Breadth-First Search (BFS):** Explores all neighbor nodes at the current depth level before moving on to nodes at the next depth level. Uses a queue.
*   **Depth-First Search (DFS):** Explores as far as possible along each branch before backtracking. Can be implemented recursively or iteratively using a stack.

**Implementations:**
*   `bfs(const Graph& g, int startNode)`
*   `dfs_recursive(const Graph& g, int startNode)`
*   `dfs_iterative(const Graph& g, int startNode)`

**File:** `src/problem1_traversals.cpp`

### Problem 2: Shortest Path (Dijkstra's Algorithm)

**Description:**
Finds the shortest paths from a single source node to all other nodes in a graph with non-negative edge weights. It uses a greedy approach and a priority queue to efficiently select the next closest node.

**Implementation:**
*   `dijkstra(const Graph& g, int startNode)`: Returns distances to all nodes.

**File:** `src/problem2_shortest_path.cpp`
*(Note: For graphs with negative edge weights, Bellman-Ford algorithm would be required, but it's not implemented here to keep the project focused on common interview staples.)*

### Problem 3: Minimum Spanning Tree (Kruskal's Algorithm)

**Description:**
Finds a subset of the edges of a connected, edge-weighted undirected graph that connects all the vertices together, without any cycles and with the minimum possible total edge weight.

**Implementation:**
*   `kruskal(const Graph& g)`: Uses a Disjoint Set Union (DSU) data structure to efficiently detect cycles. It sorts all edges by weight and iteratively adds the smallest-weight edges that do not form a cycle.

**File:** `src/problem3_mst.cpp`
*(Note: Prim's algorithm is another popular MST algorithm, often better for dense graphs. Kruskal's is implemented here due to its intuitive nature and reliance on DSU, another important data structure.)*

### Problem 4: Topological Sort (Kahn's & DFS-based)

**Description:**
For a Directed Acyclic Graph (DAG), a topological sort is a linear ordering of its vertices such that for every directed edge `u -> v`, vertex `u` comes before `v` in the ordering.

**Implementations:**
*   `kahn_topological_sort(const Graph& g)`: BFS-based approach that uses in-degrees of nodes.
*   `dfs_topological_sort(const Graph& g)`: DFS-based approach that uses a stack to store vertices in reverse finish time order.

**File:** `src/problem4_topological_sort.cpp`

## Testing

Unit tests are provided for each algorithm to ensure correctness across various scenarios including:
*   Empty graphs
*   Single node graphs
*   Disconnected graphs
*   Linear graphs
*   Cyclic graphs (where applicable, e.g., BFS/DFS)
*   Dense and sparse graphs
*   Graphs with various edge weights

To run all tests:
```bash
cd build
cmake --build . --target run_all_tests
# OR
./run_tests_traversals
./run_tests_shortest_path
./run_tests_mst
./run_tests_topological_sort
```

## Benchmarking

Performance benchmarking code is included to measure the execution time of each algorithm on large, randomly generated graphs. This helps to understand their practical time complexity characteristics.

To run benchmarks:
```bash
cd build
./run_benchmarks
```

## Documentation

The `docs/` directory contains detailed explanations:

### Algorithms Explained (`docs/algorithms_explained.md`)

*   **Detailed Concepts:** In-depth explanation of how each algorithm works.
*   **Step-by-step logic:** Breakdown of the process.
*   **ASCII Diagrams:** Visual representations of graph states and algorithm flow.
*   **Time and Space Complexity Analysis:** A thorough examination of the Big O notation for each algorithm.
*   **Edge Cases and Gotchas:** Common pitfalls and specific scenarios to consider.
*   **Variations and Extensions:** Discussions on how algorithms can be adapted or related to other problems.

### Interview Guide (`docs/interview_guide.md`)

*   **General Tips:** Strategies for approaching graph problems in an interview setting.
*   **Common Interview Questions:** Example questions related to each algorithm.
*   **Follow-up Questions:** How interviewers might extend initial questions.
*   **Design Choices:** Discussion on adjacency list vs. matrix, directed vs. undirected, weighted vs. unweighted.
*   **Debugging Strategies:** Tips for finding errors in graph implementations.
```