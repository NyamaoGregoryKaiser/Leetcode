# Graph Algorithms Project

This project is a comprehensive resource for understanding and implementing core graph algorithms, designed particularly for coding interview preparation. It provides detailed implementations in TypeScript, along with thorough explanations, test cases, and performance benchmarks.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Algorithms Implemented](#algorithms-implemented)
    *   [1. Breadth-First Search (BFS) for Shortest Path in Unweighted Graph](#1-breadth-first-search-bfs-for-shortest-path-in-unweighted-graph)
    *   [2. Depth-First Search (DFS) for Cycle Detection in Directed Graph](#2-depth-first-search-dfs-for-cycle-detection-in-directed-graph)
    *   [3. Dijkstra's Algorithm for Shortest Path in Weighted Graph](#3-dijkstras-algorithm-for-shortest-path-in-weighted-graph)
    *   [4. Kruskal's Algorithm for Minimum Spanning Tree (MST)](#4-kruskals-algorithm-for-minimum-spanning-tree-mst)
3.  [Supporting Data Structures](#supporting-data-structures)
4.  [Setup and Installation](#setup-and-installation)
5.  [Running Tests](#running-tests)
6.  [Running Benchmarks](#running-benchmarks)
7.  [Documentation](#documentation)
    *   [Algorithm Explanations](#algorithm-explanations)
    *   [Visual Diagrams](#visual-diagrams)
    *   [Interview Tips & Variations](#interview-tips--variations)
8.  [Contribution](#contribution)
9.  [License](#license)

## Project Structure

```
graph-algorithms-project/
├── src/
│   ├── algorithms/               # Main algorithm implementations
│   ├── data-structures/          # Core data structures (Graph, PriorityQueue, UnionFind)
│   ├── utils/                    # Utility functions (e.g., graph generator)
│   └── types.ts                  # Shared TypeScript types
├── tests/                        # Jest test files for algorithms and data structures
├── docs/                         # Documentation (explanations, diagrams, interview tips)
├── benchmarks/                   # Performance testing scripts
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Algorithms Implemented

Each algorithm implementation includes:
*   Optimal solution.
*   Detailed comments explaining logic.
*   Time and space complexity analysis.
*   Consideration of edge cases.

### 1. Breadth-First Search (BFS) for Shortest Path in Unweighted Graph

**Problem:** Given an unweighted graph and two nodes, `start` and `end`, find the length of the shortest path between them.

**Algorithm:** BFS explores the graph layer by layer, guaranteeing that the first time a node is reached, it's via the shortest path from the start node.

**File:** `src/algorithms/bfs.ts`

### 2. Depth-First Search (DFS) for Cycle Detection in Directed Graph

**Problem:** Determine if a given directed graph contains a cycle.

**Algorithm:** DFS is used to traverse the graph. We keep track of nodes in the current recursion stack (visiting state) to detect back-edges, which indicate a cycle.

**File:** `src/algorithms/dfs-cycle-detection.ts`

### 3. Dijkstra's Algorithm for Shortest Path in Weighted Graph

**Problem:** Given a weighted graph with non-negative edge weights and a `start` node, find the shortest path from `start` to all other nodes.

**Algorithm:** Dijkstra's algorithm uses a priority queue to iteratively explore the node with the smallest known distance from the `start` node, relaxing edges to update distances of its neighbors.

**File:** `src/algorithms/dijkstra.ts`

### 4. Kruskal's Algorithm for Minimum Spanning Tree (MST)

**Problem:** Given a connected, undirected, weighted graph, find a subset of the edges that forms a tree, connects all the vertices, and has the minimum possible total edge weight.

**Algorithm:** Kruskal's algorithm sorts all edges by weight in ascending order and adds them to the MST if they don't form a cycle with already added edges. It uses a Union-Find data structure to efficiently detect cycles.

**File:** `src/algorithms/kruskal.ts`

## Supporting Data Structures

*   `src/data-structures/graph.ts`: A generic `Graph` class using an adjacency list representation, supporting both directed/undirected and weighted/unweighted graphs.
*   `src/data-structures/priority-queue.ts`: A min-priority queue implementation using a binary heap, crucial for Dijkstra's algorithm.
*   `src/data-structures/union-find.ts`: A `UnionFind` (Disjoint Set Union) data structure with path compression and union by rank/size, essential for Kruskal's algorithm.

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
3.  **Build the project:**
    ```bash
    npm run build
    ```

## Running Tests

Tests are implemented using [Jest](https://jestjs.io/).

To run all tests:
```bash
npm test
```

To run tests in watch mode (reruns on file changes):
```bash
npm run test:watch
```

## Running Benchmarks

Performance benchmarks are located in the `benchmarks/performance.ts` file.

To run benchmarks:
```bash
npm run benchmark
```

## Documentation

Comprehensive documentation is provided in the `docs/` directory.

### Algorithm Explanations
*   `docs/algorithms-explanation.md`: Detailed explanations of each algorithm, including their principles, steps, and typical use cases.

### Visual Diagrams
*   `docs/diagrams.txt`: ASCII art diagrams illustrating graph structures and algorithm steps.

### Interview Tips & Variations
*   `docs/interview-tips.md`: Advice for approaching graph problems in interviews, common variations, edge cases to consider, and typical follow-up questions.

## Contribution

Feel free to open issues or submit pull requests if you have suggestions, find bugs, or want to add more algorithms/features.

## License

This project is licensed under the MIT License. See the `LICENSE` file (not explicitly generated here, but good practice) for details.