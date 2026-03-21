# Graph Algorithms Interview Project

This project is a comprehensive resource for mastering common graph algorithms, designed specifically for coding interview preparation. It includes implementations of core graph algorithms, essential data structures, extensive test cases, performance benchmarking, and detailed documentation.

## Features

-   **Core Graph Algorithms:** BFS, DFS, Dijkstra's, Prim's, Topological Sort (Kahn's and DFS-based).
-   **Multiple Approaches:** Demonstrates different ways to solve problems (e.g., iterative vs. recursive, different topological sort methods).
-   **Optimal Solutions:** Focuses on efficient algorithms with detailed time and space complexity analysis.
-   **Essential Data Structures:** Custom `Graph` (Adjacency List) and `PriorityQueue` (Min-Heap) implementations.
-   **Extensive Testing:** Dedicated test files with diverse test cases for each algorithm.
-   **Performance Benchmarking:** Simple utilities to measure execution time.
-   **Comprehensive Documentation:** Detailed explanations, ASCII art diagrams, edge cases, and interview tips.
-   **Modern JavaScript:** All code written in ES6+.

## Problems Solved

1.  **Path Existence & Shortest Path (Unweighted Graph):** Using Breadth-First Search (BFS) and Depth-First Search (DFS).
2.  **Single Source Shortest Path (Weighted Graph, Non-Negative Edges):** Dijkstra's Algorithm.
3.  **Minimum Spanning Tree (Undirected, Weighted Graph):** Prim's Algorithm.
4.  **Topological Sort (Directed Acyclic Graph):** Kahn's Algorithm (BFS-based) and DFS-based approach.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/graph-interview-project.git
    cd graph-interview-project
    ```
2.  **No external dependencies:** All code is self-contained. You can run it directly with Node.js.

## Usage

### Running Tests

To run all tests, you can execute each test file directly using Node.js. Although not using a formal test runner like Jest, the test files are structured with `console.assert` and `console.log` for clarity.

```bash
node tests/bfsDfs.test.js
node tests/dijkstra.test.js
node tests/prims.test.js
node tests/topologicalSort.test.js
```

You can also create a simple script to run all tests:
```bash
# create a file named run_tests.sh
#!/bin/bash
echo "Running BFS/DFS tests..."
node tests/bfsDfs.test.js
echo "\nRunning Dijkstra tests..."
node tests/dijkstra.test.js
echo "\nRunning Prim's tests..."
node tests/prims.test.js
echo "\nRunning Topological Sort tests..."
node tests/topologicalSort.test.js
```
Then run `bash run_tests.sh`.

### Running Benchmarks

Each algorithm's test file often includes a small benchmark example. You can also integrate the `benchmark.js` utility into your own scripts.

```javascript
// Example in your custom script
const { timeExecution } = require('./src/utils/benchmark');
const { dijkstra } = require('./src/algorithms/dijkstra');
const { Graph } = require('./src/data-structures/Graph');

const graph = new Graph();
// ... populate graph ...

timeExecution(() => dijkstra(graph, 'A'), 'Dijkstra execution');
```

### Exploring Algorithms and Documentation

All algorithm explanations, visual diagrams, edge cases, and interview tips are available in `docs/algorithms.md`.

## Contributing

Feel free to open issues or submit pull requests to improve the project. Suggestions for new algorithms, more test cases, or enhanced documentation are always welcome.

## License

This project is open-source and available under the MIT License.

---