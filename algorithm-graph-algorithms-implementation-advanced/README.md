```markdown
# Graph Algorithms Interview Project

This project provides a comprehensive collection of graph algorithm problems, their optimal solutions in Java, accompanying tests, documentation, and performance benchmarks. It's designed to be a thorough preparation resource for coding interviews focused on graph theory.

## Project Structure

```
graph-interview-project/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── graphinterview/
│   │   │           ├── algorithms/             # Core algorithm implementations
│   │   │           │   ├── CourseScheduleII.java         # Topological Sort
│   │   │           │   ├── DijkstraAlgorithm.java        # Shortest Path (weighted)
│   │   │           │   ├── KruskalAlgorithm.java         # Minimum Spanning Tree
│   │   │           │   ├── NumberOfIslands.java          # BFS/DFS Traversal (grid)
│   │   │           │   └── ShortestPathBinaryMatrix.java # Shortest Path (unweighted, grid)
│   │   │           ├── datastructures/         # Custom data structures
│   │   │           │   ├── DisjointSet.java              # Union-Find for Kruskal's
│   │   │           │   └── Graph.java                  # Adjacency List representation
│   │   │           └── utilities/              # Helper utilities
│   │   │               └── PerformanceBenchmarker.java   # Benchmarking tool
│   └── test/
│       └── java/
│           └── com/
│               └── graphinterview/
│                   └── tests/                  # JUnit test files for each algorithm
├── .gitignore
├── pom.xml                                 # Maven project configuration
├── README.md                               # Project overview (this file)
├── ALGORITHM_EXPLANATIONS.md               # Detailed algorithm explanations, ASCII diagrams
└── INTERVIEW_GUIDE.md                      # Interview tips, variations, edge cases
```

## Problems Covered

This project tackles 5 fundamental graph problems, each demonstrating a key graph algorithm or technique:

1.  **Number of Islands** (Traversal - BFS/DFS)
    *   **Description:** Given a 2D grid map of `'1'`s (land) and `'0'`s (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.
    *   **Algorithms:** Breadth-First Search (BFS) / Depth-First Search (DFS)
    *   **Concepts:** Grid traversal, connected components, matrix manipulation.

2.  **Shortest Path in Binary Matrix** (Shortest Path - BFS for unweighted)
    *   **Description:** Given an `n x n` binary matrix `grid`, return the length of the shortest clear path in the matrix. A clear path is a path from the top-left cell `(0, 0)` to the bottom-right cell `(n-1, n-1)` such that all visited cells are `0` and all adjacent cells are connected in 8 directions (horizontally, vertically, or diagonally).
    *   **Algorithms:** Breadth-First Search (BFS)
    *   **Concepts:** Multi-directional grid traversal, shortest path on unweighted graphs.

3.  **Dijkstra's Algorithm** (Shortest Path - weighted)
    *   **Description:** Implement Dijkstra's algorithm to find the shortest paths from a single source vertex to all other vertices in a weighted, directed graph with non-negative edge weights.
    *   **Algorithms:** Dijkstra's Algorithm
    *   **Concepts:** Weighted graphs, priority queues, greedy approach.

4.  **Kruskal's Algorithm** (Minimum Spanning Tree)
    *   **Description:** Implement Kruskal's algorithm to find the Minimum Spanning Tree (MST) of a connected, undirected, weighted graph.
    *   **Algorithms:** Kruskal's Algorithm, Union-Find (Disjoint Set)
    *   **Concepts:** Minimum Spanning Trees, greedy algorithms, disjoint set data structure.

5.  **Course Schedule II** (Topological Sort)
    *   **Description:** There are `n` courses you have to take, labeled from `0` to `n-1`. Some courses may have prerequisites. For example, to take course `0` you have to first take course `1`, which is expressed as a pair `[0,1]`. Given the total number of courses and a list of prerequisite pairs, return the ordering of courses you should take to finish all courses. If it's impossible to finish all courses, return an empty array.
    *   **Algorithms:** Topological Sort (Kahn's algorithm using BFS, or DFS-based approach)
    *   **Concepts:** Directed Acyclic Graphs (DAGs), cycle detection, in-degrees, queue/stack.

## Setup and Running

This project uses Maven.

### Prerequisites

*   Java Development Kit (JDK) 11 or higher
*   Maven (usually bundled with IDEs like IntelliJ or available as a standalone installation)

### Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/graph-interview-project.git
    cd graph-interview-project
    ```

2.  **Build the project:**
    ```bash
    mvn clean install
    ```

3.  **Run tests:**
    ```bash
    mvn test
    ```

4.  **Run specific algorithms or benchmarks:**
    You can run the `main` methods within individual algorithm files (if provided for demonstration) or use the `PerformanceBenchmarker` to test various algorithms.
    For example, to run the benchmarker:
    ```bash
    mvn exec:java -Dexec.mainClass="com.graphinterview.utilities.PerformanceBenchmarker"
    ```

## Documentation

*   **`ALGORITHM_EXPLANATIONS.md`**: Provides in-depth explanations of the core graph algorithms used, including their theoretical foundations, step-by-step logic, and ASCII diagrams for better visualization.
*   **`INTERVIEW_GUIDE.md`**: Contains valuable interview tips, common variations of these problems, discussions on edge cases, and potential follow-up questions to help you prepare effectively.

## Contribution

Feel free to fork this project, add more problems, alternative solutions, or improve existing explanations/tests.

---
```