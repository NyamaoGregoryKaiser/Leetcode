```markdown
# Graph Algorithms Interview Project

This project is a comprehensive resource for mastering fundamental graph algorithms, designed specifically for coding interview preparation. It provides robust TypeScript implementations, extensive test cases, detailed documentation, and performance benchmarks.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Features](#features)
3.  [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
4.  [Algorithms Implemented](#algorithms-implemented)
    *   [1. Shortest Path in Unweighted Graph (BFS)](#1-shortest-path-in-unweighted-graph-bfs)
    *   [2. Dijkstra's Shortest Path Algorithm](#2-dijkstras-shortest-path-algorithm)
    *   [3. Detect Cycle in Directed Graph (DFS)](#3-detect-cycle-in-directed-graph-dfs)
    *   [4. Topological Sort (Kahn's & DFS-based)](#4-topological-sort-kahns--dfs-based)
5.  [Running Tests](#running-tests)
6.  [Running Benchmarks](#running-benchmarks)
7.  [Documentation](#documentation)
    *   [Algorithm Explanations](#algorithm-explanations)
    *   [Visual Diagrams](#visual-diagrams)
    *   [Interview Tips](#interview-tips)
    *   [Edge Cases and Gotchas](#edge-cases-and-gotchas)
8.  [Contributing](#contributing)
9.  [License](#license)

## Project Overview

Mastering graph algorithms is crucial for many technical interviews. This project aims to provide a solid foundation by offering:

*   **Optimal Implementations:** Each algorithm is implemented with its most efficient approach.
*   **Clear & Commented Code:** Detailed comments explain the logic, data structures, and edge cases.
*   **Complexity Analysis:** Time and space complexity are explicitly stated for each algorithm.
*   **Comprehensive Testing:** Extensive test suites ensure correctness across various scenarios.
*   **Performance Benchmarking:** Tools to measure and compare algorithm efficiency.
*   **In-depth Documentation:** Explanations, visual aids, interview tips, and common pitfalls.

## Features

*   **TypeScript:** Type-safe and modern JavaScript development.
*   **Modular Design:** Algorithms, data structures, and utilities are organized into distinct modules.
*   **Jest:** Powerful testing framework.
*   **Performance Utility:** Custom benchmarking tool.

## Getting Started

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm (comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/graph-algorithms-interview-project.git
    cd graph-algorithms-interview-project
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Build the project (compile TypeScript to JavaScript):**
    ```bash
    npm run build
    ```

## Algorithms Implemented

This section provides a brief overview of the problems solved. For detailed explanations, refer to the `docs/algorithms-explanation.md`.

### 1. Shortest Path in Unweighted Graph (BFS)

**Problem:** Given an unweighted, undirected graph and a source and destination node, find the shortest path between them.

**Approach:** Utilizes Breadth-First Search (BFS) which guarantees the shortest path in unweighted graphs.

**File:** `src/algorithms/bfs.ts`

### 2. Dijkstra's Shortest Path Algorithm

**Problem:** Given a weighted, directed or undirected graph with non-negative edge weights, find the shortest path from a single source node to all other nodes.

**Approach:** Implements Dijkstra's algorithm using a Min-Priority Queue for efficient selection of the next node to visit.

**File:** `src/algorithms/dijkstra.ts`

### 3. Detect Cycle in Directed Graph (DFS)

**Problem:** Determine if a directed graph contains any cycles.

**Approach:** Employs Depth-First Search (DFS) with three states for each node (unvisited, visiting, visited) to detect back-edges which indicate a cycle.

**File:** `src/algorithms/cycle-detection.ts`

### 4. Topological Sort (Kahn's & DFS-based)

**Problem:** Given a Directed Acyclic Graph (DAG), produce a linear ordering of its vertices such such that for every directed edge `u -> v`, `u` comes before `v` in the ordering.

**Approach:**
*   **Kahn's Algorithm (BFS-based):** Uses in-degrees of nodes and a queue.
*   **DFS-based Algorithm:** Uses recursion and a stack to build the ordering.

**File:** `src/algorithms/topological-sort.ts`

## Running Tests

To run all tests:
```bash
npm test
```

To run tests in watch mode:
```bash
npm run test:watch
```

## Running Benchmarks

To run the performance benchmarks:
```bash
npm run benchmark
```

This will execute the `benchmark-runner.ts` script, which measures the execution time of different algorithms on various graph sizes and densities.

## Documentation

The `docs/` directory contains detailed explanations and resources:

### Algorithm Explanations
*   `docs/algorithms-explanation.md`: In-depth dive into each algorithm, including their principles, step-by-step process, pseudo-code, and formal complexity analysis.

### Visual Diagrams
*   `docs/visual-diagrams.md`: ASCII art diagrams illustrating key steps and concepts of algorithms like BFS and Dijkstra's.

### Interview Tips
*   `docs/interview-tips.md`: Guidance on how to approach graph problems in an interview setting, common questions, variations, and how to articulate your solutions.

### Edge Cases and Gotchas
*   `docs/edge-cases-gotchas.md`: A collection of tricky scenarios, common mistakes, and important considerations when implementing or discussing graph algorithms.

## Contributing

Feel free to open issues or submit pull requests. Any contributions to improve algorithms, add more problems, enhance documentation, or expand test coverage are welcome!

## License

This project is licensed under the MIT License - see the `LICENSE` file (if you want to add one) for details.
```