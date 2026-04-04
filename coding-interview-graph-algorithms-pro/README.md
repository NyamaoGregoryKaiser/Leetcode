# Graph Algorithms Interview Project

This project is a comprehensive resource for mastering fundamental graph algorithms, designed for software engineering interview preparation. It includes optimal implementations of key algorithms, detailed explanations, various approaches, robust testing, performance benchmarking, and extensive documentation.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Features](#features)
3.  [Graph Representation](#graph-representation)
4.  [Algorithms Implemented](#algorithms-implemented)
5.  [Setup and Installation](#setup-and-installation)
6.  [Running Tests](#running-tests)
7.  [Running Benchmarks](#running-benchmarks)
8.  [Documentation](#documentation)
9.  [Contribution](#contribution)
10. [License](#license)

## Project Structure

```
graph-algorithms-interview/
├── src/
│   ├── graphAlgorithms.js          # Main implementations (BFS/DFS, Dijkstra, Prim, Topological Sort)
│   ├── utils/
│   │   ├── dataStructures.js       # Graph class, PriorityQueue
│   │   └── performanceBenchBenchmarking.js # Script for performance testing
│   └── alternativeSolutions/
│       ├── bruteForcePath.js       # Brute-force approach for finding all paths
│       └── memoryEfficientDFSPath.js # Memory-efficient DFS pathfinding
├── tests/
│   └── graphAlgorithms.test.js     # Extensive test suite using Jest
├── docs/
│   ├── algorithms.md               # Detailed explanation of each algorithm
│   ├── diagrams.txt                # ASCII art diagrams for graph visualization
│   └── interviewTips.md            # Edge cases, common variations, interview strategies
├── .gitignore
├── package.json
└── README.md
```

## Features

*   **Core Algorithms:** Implementations of Breadth-First Search (BFS), Depth-First Search (DFS), Dijkstra's Shortest Path, Prim's Minimum Spanning Tree, and Topological Sort.
*   **Optimal Solutions:** Each algorithm is implemented with its optimal time and space complexity in mind.
*   **Multiple Approaches:** Demonstrations of different traversal types (BFS vs DFS for pathfinding), and alternative solutions for specific problems.
*   **Detailed Comments:** In-depth comments within the code explain the logic, data structures, and algorithmic steps.
*   **Complexity Analysis:** Time and space complexity for each algorithm is provided in the code comments and documentation.
*   **Extensive Test Suite:** Comprehensive unit tests using Jest cover various scenarios, including edge cases, empty graphs, disconnected graphs, and complex structures.
*   **Performance Benchmarking:** Tools to measure the real-world performance of algorithms on different graph sizes.
*   **Helper Data Structures:** Custom `Graph` class and `PriorityQueue` implementation for efficient algorithm execution.
*   **Rich Documentation:**
    *   **Algorithm Explanations:** Step-by-step breakdown of each algorithm's logic.
    *   **Visual Diagrams:** ASCII art to visualize graph structures and algorithm steps.
    *   **Interview Tips:** Guidance on handling edge cases, common variations, and effective communication during interviews.
*   **Alternative Implementations:** Examples of brute-force and memory-efficient solutions to highlight tradeoffs.

## Graph Representation

The project uses an **adjacency list** representation for graphs, implemented in the `Graph` class (`src/utils/dataStructures.js`). This representation is generally efficient for sparse graphs (graphs with relatively few edges) and is common in interview settings.

*   **Nodes:** Can be any primitive type (numbers, strings).
*   **Edges:** Can be weighted or unweighted, directed or undirected.

## Algorithms Implemented

1.  **BFS & DFS Path Finding (`findPath`)**
    *   Finds a path between two nodes. BFS finds the shortest path in unweighted graphs.
    *   Complexity: O(V + E) for both.

2.  **Dijkstra's Shortest Path (`dijkstra`)**
    *   Finds the shortest paths from a single source node to all other nodes in a weighted graph with non-negative edge weights.
    *   Complexity: O((V + E) log V) or O(E log V) using a min-priority queue.

3.  **Prim's Minimum Spanning Tree (`prim`)**
    *   Finds a minimum spanning tree for a connected, undirected weighted graph.
    *   Complexity: O((V + E) log V) or O(E log V) using a min-priority queue.

4.  **Topological Sort (`topologicalSort`)**
    *   Linear ordering of vertices such that for every directed edge uv, vertex u comes before v in the ordering. Applicable only to Directed Acyclic Graphs (DAGs).
    *   Uses Kahn's algorithm (in-degree based).
    *   Complexity: O(V + E).

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/graph-algorithms-interview.git
    cd graph-algorithms-interview
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    This will install `jest` for testing.

## Running Tests

To run the comprehensive test suite for all algorithms:

```bash
npm test
```

You should see output indicating all tests passing.

## Running Benchmarks

To run the performance benchmarks for a quick comparison of execution times:

```bash
npm run benchmark
```

This script will generate various graph sizes and measure the execution time of selected algorithms, printing the results to the console.

## Documentation

The `docs/` directory contains detailed explanations and resources:

*   `docs/algorithms.md`: In-depth explanation of each algorithm's logic, steps, and complexity.
*   `docs/diagrams.txt`: ASCII art visualizations of graphs and algorithm concepts.
*   `docs/interviewTips.md`: Strategies for tackling graph problems in interviews, covering common pitfalls and variations.

It's highly recommended to review these documents alongside the code.

## Contribution

Feel free to open issues or submit pull requests if you have suggestions, find bugs, or want to add more algorithms/features.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
---