```markdown
# Graph Algorithms Interview Project

This project is a comprehensive guide and implementation set for common graph algorithms, designed to help developers prepare for coding interviews. It includes well-commented TypeScript code, detailed explanations, extensive test cases, and performance benchmarks.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Setup and Running](#setup-and-running)
3.  [Problem Descriptions](#problem-descriptions)
    *   [Problem 1: Shortest Path in Binary Matrix (BFS)](#problem-1-shortest-path-in-binary-matrix-bfs)
    *   [Problem 2: Number of Islands (DFS)](#problem-2-number-of-islands-dfs)
    *   [Problem 3: Network Delay Time (Dijkstra's)](#problem-3-network-delay-time-dijkstras)
    *   [Problem 4: Connecting Cities With Minimum Cost (Kruskal's)](#problem-4-connecting-cities-with-minimum-cost-kruskals)
4.  [Core Data Structures](#core-data-structures)
5.  [Documentation](#documentation)
6.  [Interview Tips and Variations](#interview-tips-and-variations)
7.  [License](#license)

## Project Overview

The goal of this project is to provide a solid foundation for understanding and implementing graph algorithms. Each algorithm comes with:
*   Optimal TypeScript implementation.
*   Detailed comments explaining the logic.
*   Time and Space Complexity analysis.
*   Multiple approaches where applicable (e.g., iterative vs. recursive DFS).
*   Extensive unit tests using Jest.
*   Helper data structures (Min-Heap, Union-Find).
*   Performance benchmarking tools.
*   Comprehensive documentation with ASCII diagrams.

## Setup and Running

To get this project up and running on your local machine:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/graph-algorithms-project.git
    cd graph-algorithms-project
    ```
2.  **Install dependencies:**
    This project uses `npm` for package management.
    ```bash
    npm install
    ```
3.  **Compile TypeScript:**
    ```bash
    npm run build
    ```
    This will compile all `.ts` files from `src/` into JavaScript in the `dist/` directory.

4.  **Run Tests:**
    To execute all unit tests:
    ```bash
    npm test
    ```
    You can also run specific test files, e.g., `jest tests/bfs.test.ts`.

5.  **Run Benchmarks:**
    To measure the performance of algorithms on large inputs:
    ```bash
    npm run benchmark
    ```

## Problem Descriptions

Here are the specific problems tackled by the algorithms in this project.

### Problem 1: Shortest Path in Binary Matrix (BFS)

**Description:**
Given an `n x n` binary matrix `grid`, return the length of the shortest clear path in the matrix. A clear path is a path from the top-left cell `(0, 0)` to the bottom-right cell `(n-1, n-1)` such that:
*   All visited cells are `0`.
*   Adjacent cells are connected 8-directionally (horizontally, vertically, or diagonally).

If there is no clear path, return -1.

**Example:**
Input: `grid = [[0,1],[1,0]]`
Output: `2` (Path: `(0,0) -> (1,1)`)

**Algorithm Focus:** Breadth-First Search (BFS) is ideal here because it explores the graph level by level, naturally finding the shortest path in an unweighted graph (where each step has a cost of 1).

**File:** `src/algorithms/bfs.ts`

### Problem 2: Number of Islands (DFS)

**Description:**
Given an `m x n` 2D binary grid `grid` which represents a map of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

**Example:**
Input:
```
grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
```
Output: `3`

**Algorithm Focus:** Depth-First Search (DFS) or Breadth-First Search (BFS) can be used. DFS is particularly intuitive for "exploring" and "sinking" an entire island once a part of it is found. We'll provide both iterative and recursive DFS approaches.

**File:** `src/algorithms/dfs.ts`

### Problem 3: Network Delay Time (Dijkstra's)

**Description:**
There are `n` network nodes, labeled from 1 to `n`. You are given `times`, a list of travel `time[i] = [u, v, w]`, where `u` is the source node, `v` is the target node, and `w` is the time it takes for a signal to travel from `u` to `v`. We send a signal from a given node `k`. Return the minimum time it takes for all `n` nodes to receive the signal. If it is impossible for all `n` nodes to receive the signal, return -1.

**Example:**
Input: `times = [[2,1,1],[2,3,1],[3,4,1]]`, `n = 4`, `k = 2`
Output: `2` (Signal travels: `2->1 (1 unit)`, `2->3 (1 unit)`, `3->4 (1 unit)`. Max time is `2->3->4 = 2` for node 4.)

**Algorithm Focus:** Dijkstra's Algorithm is perfect for finding the shortest paths from a single source node (`k`) to all other nodes in a weighted graph with non-negative edge weights. A Min-Heap is crucial for its optimal performance.

**File:** `src/algorithms/dijkstra.ts`

### Problem 4: Connecting Cities With Minimum Cost (Kruskal's)

**Description:**
You are given `n` cities, and `connections`, where `connections[i] = [city1, city2, cost]` represents the cost to connect `city1` and `city2`. We need to connect all cities such that the total cost is minimized. Return the minimum cost to connect all `n` cities. If it is impossible to connect all cities, return -1.
The cities are labeled from 1 to `n`.

**Example:**
Input: `n = 3`, `connections = [[1,2,5],[1,3,6],[2,3,1]]`
Output: `6` (Connect `(2,3)` with cost 1, then `(1,2)` with cost 5. Total `1+5=6`.)

**Algorithm Focus:** Kruskal's Algorithm, which uses a greedy approach and a Union-Find (Disjoint Set) data structure, is ideal for finding the Minimum Spanning Tree (MST) in a graph. The MST connects all vertices with the minimum possible total edge weight.

**File:** `src/algorithms/kruskal.ts`

## Core Data Structures

To support the graph algorithms, we've implemented essential data structures:

*   **Min-Heap (`src/data-structures/min-heap.ts`):** A binary heap where the parent node's value is less than or equal to its children's values. Crucial for efficiently extracting the minimum-distance node in Dijkstra's algorithm.
    *   **Time Complexity:** `insert`: O(log N), `extractMin`: O(log N), `peek`: O(1).
    *   **Space Complexity:** O(N) for storing N elements.

*   **Union-Find / Disjoint Set (`src/data-structures/union-find.ts`):** A data structure that keeps track of a set of elements partitioned into a number of disjoint (non-overlapping) subsets. Used to efficiently determine if two vertices are already connected and to merge components in Kruskal's algorithm.
    *   **Time Complexity:** `find`: Nearly O(1) (amortized inverse Ackermann function) due to path compression. `union`: Nearly O(1) (amortized inverse Ackermann function) due to union by rank/size.
    *   **Space Complexity:** O(N) for N elements.

## Documentation

*   **`docs/ALGORITHM_EXPLANATIONS.md`**: This document provides in-depth explanations for each algorithm, including:
    *   High-level concepts.
    *   Step-by-step walkthroughs.
    *   Pseudocode.
    *   ASCII art diagrams to visualize graph operations.
    *   Detailed discussion of edge cases and common pitfalls.

*   **`docs/interview_tips.md`**: Offers general advice for tackling graph problems in interviews, including common patterns, how to represent graphs, and important questions to ask.

## Interview Tips and Variations

For each problem, consider the following variations and discussion points:

*   **BFS:**
    *   What if the graph has obstacles (like in the binary matrix)?
    *   How would you find *all* shortest paths?
    *   BFS on a general graph vs. a grid.
    *   Finding connected components.
*   **DFS:**
    *   Recursive vs. iterative implementations – pros and cons (stack overflow, memory usage).
    *   Cycle detection in directed/undirected graphs.
    *   Topological sort (for DAGs).
    *   Finding strongly connected components.
*   **Dijkstra's:**
    *   Why doesn't Dijkstra's work with negative edge weights? (Bellman-Ford is the answer here).
    *   What if you need to find the shortest path between all pairs of nodes? (Floyd-Warshall).
    *   Using different priority queue implementations (binary heap, Fibonacci heap, simple array scan) and their complexity implications.
*   **Kruskal's:**
    *   Comparing Kruskal's with Prim's algorithm for MST.
    *   What if the graph is disconnected? (Kruskal's finds an MST for each component).
    *   How does the `Union-Find` data structure optimize this algorithm?

Always discuss your approach, data structures, complexity, and handle edge cases during an interview.

## License

This project is open-sourced under the MIT License.
```