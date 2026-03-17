```markdown
# Graph Algorithms Interview Project

This project is a comprehensive resource for mastering common graph algorithms, designed specifically for coding interview preparation. It provides multiple implementations, detailed explanations, extensive test cases, and performance benchmarks.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Graph Problems Covered](#graph-problems-covered)
3.  [Setup and Installation](#setup-and-installation)
4.  [Running Tests](#running-tests)
5.  [Running Benchmarks](#running-benchmarks)
6.  [Documentation](#documentation)
7.  [Key Features](#key-features)

## Project Structure

```
graph-algorithms-project/
├── src/
│   ├── algorithms/                 # Main algorithm implementations
│   ├── data_structures/            # Helper data structures (Graph, Priority Queue)
│   └── utils/                      # Utility functions (e.g., performance)
├── tests/                          # Extensive test cases for each algorithm
├── benchmarks/                     # Performance benchmarking scripts
├── docs/                           # Detailed explanations, diagrams, interview guide
├── README.md                       # This file
├── package.json                    # Project metadata and scripts
└── runTests.js                     # Script to execute all tests
```

## Graph Problems Covered

The project includes implementations for the following fundamental graph algorithms:

1.  **Number of Islands (Connected Components)**
    *   **Description:** Given a 2D grid map of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.
    *   **Algorithms:** Breadth-First Search (BFS) and Depth-First Search (DFS).
    *   **Variations:** Can be extended to count connected components in a general graph.

2.  **Dijkstra's Shortest Path Algorithm**
    *   **Description:** Find the shortest path from a single source vertex to all other vertices in a weighted graph with non-negative edge weights.
    *   **Algorithm:** Greedy approach using a Min-Priority Queue.

3.  **Detect Cycle in a Directed Graph**
    *   **Description:** Determine if a given directed graph contains a cycle.
    *   **Algorithm:** DFS-based coloring approach (White, Gray, Black states).

4.  **Topological Sort**
    *   **Description:** For a Directed Acyclic Graph (DAG), produce a linear ordering of its vertices such that for every directed edge `u -> v`, vertex `u` comes before `v` in the ordering.
    *   **Algorithms:** Kahn's Algorithm (BFS-based, using in-degrees) and DFS-based.

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/graph-algorithms-project.git
    cd graph-algorithms-project
    ```
    (Note: Replace `your-username` with your actual GitHub username or remove if not cloning from a remote repo).

2.  **Install dependencies:**
    This project uses only Node.js built-in modules, so there are no external `npm` packages to install.
    However, running `npm install` is harmless if a `package.json` exists.

## Running Tests

To execute all the test cases for the implemented algorithms:

```bash
npm test
# Or directly: node runTests.js
```

The test runner will output the results for each algorithm, indicating whether all test cases passed or if any failed.

## Running Benchmarks

To evaluate the performance of the algorithms on varying input sizes:

```bash
npm run benchmark
# Or directly: node benchmarks/benchmarkRunner.js
```

The benchmark script will generate random graphs, run the algorithms, and report the execution times. This helps in understanding the practical performance characteristics and how they align with theoretical time complexities.

## Documentation

Comprehensive documentation is provided in the `docs/` directory:

*   **`docs/ALGORITHM_EXPLANATIONS.md`**: Detailed explanations of each algorithm, including their working principles, pseudocode (implicitly via comments), ASCII visual diagrams, and formal time/space complexity analysis.
*   **`docs/INTERVIEW_GUIDE.md`**: A guide for preparing for graph algorithm interviews, covering common variations, edge cases, "gotchas," and tips for effective communication during an interview.

## Key Features

*   **Multiple Approaches:** Demonstrates different ways to solve problems (e.g., BFS vs. DFS for islands, Kahn's vs. DFS for topological sort).
*   **Optimal Solutions:** Each problem provides an optimal solution with thorough complexity analysis.
*   **Detailed Comments:** Code is heavily commented to explain logic, data structures, and algorithmic steps.
*   **Custom Data Structures:** Includes a `Graph` class (adjacency list) and `MinPriorityQueue` (min-heap) implementations.
*   **Extensive Test Cases:** A wide range of test cases, including edge cases, to ensure correctness.
*   **Performance Benchmarking:** Tools to measure and compare algorithm execution times.
*   **In-depth Documentation:** Beyond code, the project offers comprehensive written explanations and visual aids.
*   **Interview Focus:** Specifically tailored with interview scenarios, variations, and common discussion points in mind.
```