```markdown
# Graph Algorithms Interview Project

Welcome to the Graph Algorithms Interview Project! This repository is designed to be a comprehensive resource for mastering common graph algorithms, crucial for technical interviews at top-tier companies. It provides C++ implementations of fundamental graph problems, extensive testing, performance benchmarking, and detailed documentation.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Features](#features)
3.  [Graph Problems Covered](#graph-problems-covered)
4.  [Project Structure](#project-structure)
5.  [Building and Running](#building-and-running)
    *   [Prerequisites](#prerequisites)
    *   [Build Instructions](#build-instructions)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
6.  [Documentation](#documentation)
7.  [Contributing](#contributing)
8.  [License](#license)

## Project Overview

Mastering graph algorithms is a key component of technical interview preparation. This project aims to provide a hands-on learning experience by offering:

*   **Optimal C++ Implementations:** Clean, efficient, and well-commented solutions for various graph problems.
*   **Multiple Approaches:** Discussion of different algorithmic strategies where applicable, highlighting trade-offs.
*   **Detailed Complexity Analysis:** Clear time and space complexity for all solutions.
*   **Robust Testing:** Extensive test cases to ensure correctness, including edge cases.
*   **Performance Benchmarking:** Tools to measure and understand the real-world performance of the algorithms.
*   **Comprehensive Documentation:** In-depth explanations of algorithms, visual aids, common pitfalls, and interview strategies.

## Features

*   **Adjacency List Graph Representation:** A flexible and efficient representation for most graph types.
*   **BFS-based Shortest Path:** For unweighted graphs.
*   **Dijkstra's Algorithm:** For shortest paths in weighted graphs with non-negative edge weights.
*   **Cycle Detection:** For directed graphs using DFS.
*   **Topological Sort:** For Directed Acyclic Graphs (DAGs), using Kahn's algorithm (BFS-based).
*   **Unit Testing:** Custom test framework for verification.
*   **Benchmarking:** Measure execution times for various graph sizes and densities.

## Graph Problems Covered

1.  **Shortest Path in Unweighted Graph (BFS)**
    *   Finds the shortest path (number of edges) between two nodes.
    *   Optimal approach: Breadth-First Search (BFS).
2.  **Dijkstra's Algorithm (Shortest Path in Weighted Graph)**
    *   Finds the shortest paths from a single source node to all other nodes in a weighted graph with non-negative edge weights.
    *   Optimal approach: Priority Queue-based Dijkstra.
3.  **Cycle Detection in Directed Graph (DFS)**
    *   Determines if a directed graph contains any cycles.
    *   Optimal approach: Depth-First Search (DFS) with state tracking.
4.  **Topological Sort (Kahn's Algorithm)**
    *   Produces a linear ordering of vertices such that for every directed edge `u -> v`, vertex `u` comes before `v` in the ordering. Applicable only to Directed Acyclic Graphs (DAGs).
    *   Optimal approach: Kahn's Algorithm (BFS-based).

## Project Structure

*   `src/`: Contains the core C++ source code.
    *   `graph.h`: Defines the `Graph` class and helper utilities.
    *   `graph_problems.cpp`: Implementations of the main graph algorithms.
    *   `main.cpp`: The entry point for running tests and benchmarks.
*   `tests/`: Contains test files.
    *   `test_graph_problems.cpp`: Contains various test cases for each algorithm.
*   `benchmarks/`: Contains performance testing code.
    *   `benchmark_runner.cpp`: Logic for measuring algorithm execution times.
*   `docs/`: Comprehensive documentation.
    *   `README.md`: This file.
    *   `AlgorithmExplanation.md`: Detailed explanations, complexity analysis, and ASCII diagrams for each algorithm.
    *   `InterviewTips.md`: Interview preparation guide, common variations, and edge cases.
*   `Makefile`: Automates the build process.

## Building and Running

### Prerequisites

*   A C++ compiler (g++ recommended)
*   `make` utility

### Build Instructions

Navigate to the project root directory and run `make`:

```bash
cd GraphAlgorithmsInterviewProject
make
```

This will compile all source files and create an executable named `graph_solver` in the project root.

### Running Tests

To execute the unit tests, simply run the compiled executable with the `test` argument:

```bash
./graph_solver test
```

The output will indicate whether each test case passed or failed.

### Running Benchmarks

To execute the performance benchmarks, run the compiled executable with the `benchmark` argument:

```bash
./graph_solver benchmark
```

The output will show execution times for different graph algorithms on various graph sizes.

## Documentation

The `docs/` directory contains crucial information:

*   **`AlgorithmExplanation.md`**: Dive deep into the logic, pseudo-code, and formal complexity analysis of each implemented algorithm. Includes helpful ASCII diagrams to visualize graph structures and algorithm steps.
*   **`InterviewTips.md`**: Get ready for your interviews with tips on common graph problem variations, how to approach problems, important edge cases to consider, and effective communication strategies during an interview.

## Contributing

Feel free to fork this repository, open issues, and submit pull requests. Any contributions that improve the clarity, correctness, efficiency, or completeness of this project are welcome!

## License

This project is licensed under the MIT License. See the `LICENSE` file (or refer to the standard MIT License text) for details.
```