# Graph Algorithms Interview Project

This project is a comprehensive resource for understanding and implementing fundamental graph algorithms, crucial for coding interviews. It provides optimized TypeScript implementations, detailed explanations, extensive test suites, and benchmarking tools.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Features](#features)
3.  [Graph Algorithms Covered](#graph-algorithms-covered)
    *   [1. BFS Shortest Path (Unweighted Graphs)](#1-bfs-shortest-path-unweighted-graphs)
    *   [2. Dijkstra's Algorithm (Weighted Graphs)](#2-dijkstras-algorithm-weighted-graphs)
    *   [3. Topological Sort (Kahn's Algorithm)](#3-topological-sort-kahns-algorithm)
    *   [4. Detect Cycle in Directed Graph (DFS)](#4-detect-cycle-in-directed-graph-dfs)
4.  [Project Structure](#project-structure)
5.  [Setup and Installation](#setup-and-installation)
6.  [Running Tests](#running-tests)
7.  [Running Benchmarks](#running-benchmarks)
8.  [Documentation](#documentation)
9.  [Contributing](#contributing)
10. [License](#license)

## Project Overview

This repository serves as a robust study guide and practical implementation hub for common graph algorithm problems. Each algorithm is implemented with clarity, optimality, and thorough commentary.

## Features

*   **TypeScript Implementation**: Strongly typed, modern JavaScript for better maintainability and readability.
*   **Optimal Solutions**: Each problem provides an efficient, standard algorithm.
*   **Detailed Comments**: In-depth explanations within the code for logic and thought process.
*   **Complexity Analysis**: Clear statements of time and space complexity for each algorithm.
*   **Comprehensive Tests**: Extensive Jest test suites covering various scenarios, including edge cases.
*   **Custom Data Structures**: `Graph` (adjacency list) and `PriorityQueue` (min-heap) implementations tailored for graph problems.
*   **Performance Benchmarking**: Script to measure algorithm performance with varying input sizes.
*   **Rich Documentation**: Separate markdown files for detailed algorithm explanations, ASCII diagrams, edge cases, and interview tips.

## Graph Algorithms Covered

### 1. BFS Shortest Path (Unweighted Graphs)

*   **Problem**: Find the shortest path (minimum number of edges) between two nodes in an unweighted graph.
*   **Approach**: Breadth-First Search (BFS).
*   **Location**: `src/algorithms/bfs-shortest-path.ts`
*   **Complexity**:
    *   **Time**: O(V + E), where V is the number of vertices and E is the number of edges.
    *   **Space**: O(V) for the queue, visited set, and parent map.

### 2. Dijkstra's Algorithm (Weighted Graphs)

*   **Problem**: Find the shortest path (minimum total weight) from a single source node to all other nodes in a weighted graph with non-negative edge weights.
*   **Approach**: Dijkstra's algorithm using a min-priority queue.
*   **Location**: `src/algorithms/dijkstra.ts`
*   **Complexity**:
    *   **Time**: O((V + E) log V) with a binary heap priority queue, or O(E + V log V) if V is small compared to E.
    *   **Space**: O(V + E) for distances, parent map, and priority queue.

### 3. Topological Sort (Kahn's Algorithm)

*   **Problem**: Given a Directed Acyclic Graph (DAG), produce a linear ordering of its vertices such that for every directed edge `u -> v`, vertex `u` comes before vertex `v` in the ordering.
*   **Approach**: Kahn's algorithm (BFS-based).
*   **Location**: `src/algorithms/topological-sort-kahn.ts`
*   **Complexity**:
    *   **Time**: O(V + E).
    *   **Space**: O(V) for in-degrees and queue.

### 4. Detect Cycle in Directed Graph (DFS)

*   **Problem**: Determine if a directed graph contains any cycles.
*   **Approach**: Depth-First Search (DFS) with three states for nodes (unvisited, visiting, visited).
*   **Location**: `src/algorithms/detect-cycle-dfs.ts`
*   **Complexity**:
    *   **Time**: O(V + E).
    *   **Space**: O(V) for recursion stack and state tracking.

## Project Structure

```
graph-algorithms-project/
├── src/
│   ├── data-structures/        # Core data structures (Graph, PriorityQueue)
│   ├── algorithms/             # Implementations of graph algorithms
│   └── index.ts                # Example usage / entry point
├── tests/                      # Jest test files for data structures and algorithms
├── docs/                       # Detailed documentation, explanations, and interview tips
│   ├── ALGORITHM_EXPLANATIONS.md # In-depth algorithm theory and diagrams
│   └── INTERVIEW_TIPS.md       # General interview advice, common variations
├── benchmarking/               # Scripts to benchmark algorithm performance
├── README.md                   # Project overview (this file)
├── package.json                # Node.js project configuration
├── tsconfig.json               # TypeScript compiler configuration
```

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/graph-algorithms-project.git
    cd graph-algorithms-project
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Running Tests

To run all unit tests:

```bash
npm test
```

To run tests for a specific file (e.g., Dijkstra's algorithm):

```bash
npm test tests/algorithms/dijkstra.test.ts
```

## Running Benchmarks

To execute the performance benchmark script:

```bash
npm run benchmark
```

This will run each algorithm with varying input sizes and print the execution times to the console.

## Documentation

*   **`docs/ALGORITHM_EXPLANATIONS.md`**: Dive deep into the theory behind each algorithm with step-by-step breakdowns and ASCII diagrams.
*   **`docs/INTERVIEW_TIPS.md`**: Get practical advice on how to approach graph problems in interviews, discuss variations, and handle common pitfalls.

## Contributing

Feel free to open issues, submit pull requests, or suggest improvements. Any contributions are welcome!

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---