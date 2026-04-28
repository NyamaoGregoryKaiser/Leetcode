# Graph Algorithms Interview Project

This project is a comprehensive resource for mastering common graph algorithms for coding interviews. It provides optimized JavaScript implementations, thorough testing, performance benchmarking, and detailed documentation.

## Table of Contents
1.  [Project Overview](#project-overview)
2.  [Features](#features)
3.  [Graph Problems Covered](#graph-problems-covered)
4.  [Setup](#setup)
5.  [Usage](#usage)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
    *   [Exploring Algorithms](#exploring-algorithms)
6.  [Project Structure](#project-structure)
7.  [Documentation](#documentation)
8.  [Contributing](#contributing)
9.  [License](#license)

## Project Overview

Mastering graph algorithms is crucial for many technical interviews. This project aims to equip you with robust, well-tested, and well-explained solutions to several fundamental graph problems. Each algorithm is implemented with attention to optimality, readability, and interview-readiness.

## Features

*   **Optimal Algorithm Implementations:** Efficient JavaScript code for classic graph algorithms.
*   **Core Data Structures:** Custom `Graph` (adjacency list) and `PriorityQueue` (min-heap) implementations.
*   **Multiple Approaches:** Where applicable, different solution paradigms (e.g., iterative vs. recursive DFS, Kahn's vs. DFS for topological sort) are discussed or implemented.
*   **Comprehensive Test Suite:** Extensive test cases covering various scenarios including empty graphs, single nodes, disconnected components, cycles, and complex structures.
*   **Performance Benchmarking:** Tools to measure the execution time of algorithms on different graph sizes.
*   **Detailed Documentation (`ALGORITHMS.md`):** In-depth explanations of each algorithm, including:
    *   Problem statements
    *   Solution approaches
    *   Step-by-step logic
    *   Time and Space Complexity analysis
    *   ASCII art diagrams for visualization
    *   Edge cases and common gotchas
    *   Interview tips and variations
*   **Clear Code Comments:** Every significant piece of logic is explained within the code itself.

## Graph Problems Covered

1.  **Breadth-First Search (BFS) / Shortest Path in Unweighted Graph:**
    *   Finds the shortest path between two nodes in an unweighted graph.
    *   Core traversal algorithm.
2.  **Topological Sort:**
    *   Orders the vertices of a Directed Acyclic Graph (DAG) such that for every directed edge `u -> v`, vertex `u` comes before vertex `v`.
    *   Implemented using both DFS and Kahn's algorithm (as a discussed alternative).
3.  **Dijkstra's Algorithm:**
    *   Finds the shortest paths between nodes in a graph with non-negative edge weights.
    *   Utilizes a min-priority queue for efficiency.
4.  **Cycle Detection:**
    *   Determines if a given graph (directed or undirected) contains a cycle.
    *   Separate logic for directed graphs (using DFS and recursion stack) and undirected graphs (using DFS/BFS and parent tracking).

## Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/graph-algorithms-project.git
    cd graph-algorithms-project
    ```
2.  **Install Node.js (if not already installed):**
    This project requires Node.js to run the JavaScript code, tests, and benchmarks. You can download it from [nodejs.org](https://nodejs.org/).

3.  **Install dependencies:**
    This project primarily uses native Node.js features, so there are no external `npm` dependencies for the core logic. However, a `package.json` is provided for standard project structure.
    ```bash
    npm install
    ```

## Usage

### Running Tests

To run the comprehensive test suite for all algorithms:

```bash
node tests/testRunner.js
```

This will execute all `*.test.js` files in the `tests/` directory and report the results.

### Running Benchmarks

To measure the performance of the implemented algorithms on various graph sizes:

```bash
node benchmarks/benchmark.js
```

This will run each algorithm against randomly generated graphs of increasing complexity and output their execution times.

### Exploring Algorithms

All algorithms are exported from `src/index.js`. You can easily import and use them in your own scripts:

```javascript
// myScript.js
const {
    bfs,
    dijkstra,
    topologicalSort,
    detectCycleDirected,
    detectCycleUndirected,
    Graph
} = require('./src'); // Adjust path as needed

// Example: Create a graph and run BFS
const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addEdge('A', 'B');
graph.addEdge('B', 'C');

const path = bfs(graph, 'A', 'C');
console.log('Shortest path from A to C:', path); // Output: [ 'A', 'B', 'C' ]
```

## Project Structure

Refer to the `tree` diagram at the top of this `README.md` for a visual overview of the project's file structure.

## Documentation

The `docs/ALGORITHMS.md` file contains detailed explanations for each algorithm, including:
*   Problem statements and examples.
*   Step-by-step walkthroughs.
*   Time and space complexity analysis.
*   ASCII art diagrams for visualizing graphs and algorithm steps.
*   Discussion of common edge cases and potential pitfalls.
*   Interview tips, common variations, and follow-up questions.

**It is highly recommended to read `docs/ALGORITHMS.md` alongside exploring the code.**

## Contributing

Feel free to open issues or submit pull requests if you have suggestions for improvements, find bugs, or want to add more algorithms/problems.

## License

This project is open-sourced under the MIT License. See the `LICENSE` file (if present, otherwise assume MIT) for details.