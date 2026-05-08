```markdown
# Graph Algorithms Interview Preparation Project

This project is a comprehensive resource for mastering graph algorithms often encountered in coding interviews. It includes implementations of key algorithms, robust testing, performance benchmarking, and detailed documentation.

## Project Structure

```
graph-algorithms-interview-prep/
├── src/
│   ├── graph-problems.js           # Main graph algorithm implementations
│   └── utils/
│       ├── dataStructures.js       # Custom data structures (Priority Queue, DSU, Graph)
│       └── helpers.js              # General utility functions
├── tests/
│   └── graph-problems.test.js      # Jest tests for all implemented algorithms
├── benchmarks/
│   └── benchmark.js                # Performance benchmarking script
├── docs/
│   ├── algorithms.md               # Detailed explanations of algorithms
│   ├── diagrams.txt                # ASCII art diagrams for visualization
│   ├── edge-cases-gotchas.md       # Common pitfalls and tricky scenarios
│   └── interview-tips.md           # General advice for graph interviews
├── package.json                    # Project dependencies and scripts
└── README.md                       # Project overview, setup, and problem descriptions
```

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd graph-algorithms-interview-prep
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Running Tests

We use [Jest](https://jestjs.io/) for testing. To run all tests:

```bash
npm test
```

## Running Benchmarks

To run the performance comparison benchmarks:

```bash
npm run benchmark
```

## Problem Descriptions and Implementations

The `src/graph-problems.js` file contains implementations for the following graph problems, each with optimal solutions, multiple approaches where applicable, detailed comments, and complexity analysis.

### 1. Shortest Path in an Unweighted Graph (BFS)

**Problem:** Given an unweighted, undirected graph and a source node and a destination node, find the shortest path (minimum number of edges) between the source and destination. If no path exists, return `null`.

**Implementation Details:**
*   Uses Breadth-First Search (BFS).
*   Tracks parents to reconstruct the path.

### 2. Cycle Detection in a Directed Graph (DFS)

**Problem:** Given a directed graph, determine if it contains any cycles. A cycle exists if you can start at a node, traverse a sequence of directed edges, and return to the same node.

**Implementation Details:**
*   Uses Depth-First Search (DFS).
*   Employs three states for nodes: `UNVISITED`, `VISITING` (currently in recursion stack), and `VISITED` (finished processing). A cycle is detected if DFS encounters a `VISITING` node.

### 3. Dijkstra's Algorithm (Shortest Path in Weighted Graph)

**Problem:** Given a weighted, directed graph with non-negative edge weights and a source node, find the shortest path (minimum total weight) from the source node to all other nodes in the graph.

**Implementation Details:**
*   Uses Dijkstra's algorithm with a `MinPriorityQueue` to efficiently select the next node to visit.
*   Calculates shortest distances from the source to all reachable nodes.

### 4. Kruskal's Algorithm (Minimum Spanning Tree)

**Problem:** Given a connected, undirected graph with weighted edges, find a Minimum Spanning Tree (MST). An MST is a subgraph that connects all vertices with the minimum possible total edge weight and contains no cycles.

**Implementation Details:**
*   Uses Kruskal's algorithm.
*   Edges are sorted by weight.
*   A `DisjointSetUnion` (DSU) data structure is used to efficiently check for cycles when adding edges.

### 5. Number of Islands (BFS & DFS Approaches)

**Problem:** Given an `m x n` 2D binary grid, which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

**Implementation Details:**
*   Provides two distinct solutions: one using Breadth-First Search (BFS) and another using Depth-First Search (DFS).
*   Both approaches "sink" visited land cells (change '1' to '0') to avoid recounting.

## Helper Utilities and Data Structures

*   **`src/utils/dataStructures.js`**:
    *   `Graph`: A class to represent graphs using an adjacency list. Supports adding nodes and directed/undirected edges.
    *   `MinPriorityQueue`: A min-priority queue implementation essential for Dijkstra's and Prim's algorithms.
    *   `DisjointSetUnion`: (DSU) A data structure for efficiently managing disjoint sets, crucial for Kruskal's algorithm.
*   **`src/utils/helpers.js`**: Contains general utility functions (currently empty, but can be extended).

## Documentation (`docs/`)

The `docs/` directory contains comprehensive explanations and tips:

*   **`algorithms.md`**: Detailed descriptions of how BFS, DFS, Dijkstra, and Kruskal's algorithms work, including their theoretical foundations.
*   **`diagrams.txt`**: ASCII art diagrams to visually illustrate graph representations, traversals, and algorithm steps.
*   **`edge-cases-gotchas.md`**: A list of common edge cases (e.g., disconnected graphs, single-node graphs, negative cycles) and potential pitfalls in graph problems.
*   **`interview-tips.md`**: Advice on how to approach graph problems in an interview setting, common follow-up questions, and communication strategies.

---
```