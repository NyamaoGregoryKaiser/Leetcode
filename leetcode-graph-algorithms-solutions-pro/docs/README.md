```markdown
# Graph Algorithms Interview Project

This project provides a comprehensive set of implementations for common graph algorithms, designed to serve as a resource for coding interview preparation. It covers core algorithms, data structures, detailed explanations, test cases, and performance analysis.

## Project Structure

```
graph_algorithms_project/
├── pom.xml                                     // Maven build file
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── example/
│   │   │           └── graph/
│   │   │               ├── algorithms/
│   │   │               │   ├── ShortestPathBFS.java      // Problem 1: BFS for shortest path (unweighted)
│   │   │               │   ├── CycleDetection.java         // Problem 2: DFS & DSU for cycle detection (undirected)
│   │   │               │   ├── KruskalsMST.java            // Problem 3: Kruskal's Algorithm for MST (weighted undirected)
│   │   │               │   └── CourseSchedule.java         // Problem 4: Kahn's & DFS for topological sort/cycle detection (directed)
│   │   │               ├── datastructures/
│   │   │               │   ├── Graph.java                  // Adjacency list representation
│   │   │               │   ├── DisjointSet.java            // DSU with path compression and union by rank
│   │   │               │   └── Edge.java                   // Helper class for weighted edges
│   │   │               └── util/
│   │   │                   └── GraphGenerator.java         // Utility for generating various graph types
│   │   └── resources/
│   ├── test/
│   │   └── java/
│   │       └── com/
│   │           └── example/
│   │               └── graph/
│   │                   ├── algorithms/
│   │                   │   ├── ShortestPathBFSTest.java
│   │                   │   ├── CycleDetectionTest.java
│   │                   │   ├── KruskalsMSTTest.java
│   │                   │   └── CourseScheduleTest.java
│   │                   └── datastructures/
│   │                       └── DisjointSetTest.java
├── docs/
│   ├── README.md                               // Project overview and instructions (this file)
│   ├── Algorithms.md                           // Detailed explanations, pseudocode, ASCII diagrams for each algorithm
│   └── InterviewTips.md                        // Edge cases, gotchas, interview variations, complexity analysis summaries
├── bench/
│   └── PerformanceBenchmark.java               // Benchmarking code for algorithms
```

## Problems Covered

Here's a brief description of the problems and their core algorithms implemented in this project:

### Problem 1: Shortest Path in Unweighted Graph

*   **Algorithm:** Breadth-First Search (BFS)
*   **Description:** Find the shortest path (minimum number of edges) between two given nodes in an unweighted graph. The solution also includes path reconstruction.
*   **Location:** `src/main/java/com/example/graph/algorithms/ShortestPathBFS.java`

### Problem 2: Cycle Detection in Undirected Graph

*   **Algorithms:** Depth-First Search (DFS) and Disjoint Set Union (DSU)
*   **Description:** Determine if an undirected graph contains any cycles.
    *   **DFS Approach:** Traverses the graph, detecting back-edges to any visited node that is not the immediate parent in the DFS tree.
    *   **DSU Approach:** Iterates through edges; if an edge connects two nodes already in the same connected component, a cycle is found.
*   **Location:** `src/main/java/com/example/graph/algorithms/CycleDetection.java`

### Problem 3: Minimum Spanning Tree (MST) using Kruskal's Algorithm

*   **Algorithm:** Kruskal's Algorithm (utilizing Disjoint Set Union)
*   **Description:** Find a subset of the edges of a connected, edge-weighted undirected graph that connects all the vertices together, without any cycles and with the minimum possible total edge weight.
*   **Location:** `src/main/java/com/example/graph/algorithms/KruskalsMST.java`

### Problem 4: Course Schedule (Topological Sort / Cycle Detection in Directed Graph)

*   **Algorithms:** Kahn's Algorithm (BFS-based Topological Sort) and DFS-based Topological Sort
*   **Description:** Given `numCourses` and `prerequisites` (e.g., `[course, prerequisite]` meaning `prerequisite` must be taken before `course`), determine if it's possible to finish all courses. If so, return one valid order. This is a classic application of topological sorting and cycle detection in directed acyclic graphs (DAGs).
    *   **Kahn's Algorithm:** Uses in-degrees and a queue, suitable for detecting cycles where not all nodes can be included in the sort.
    *   **DFS Approach:** Uses recursion and states (unvisited, visiting, visited) to detect back-edges (cycles) and build the topological order.
*   **Location:** `src/main/java/com/example/graph/algorithms/CourseSchedule.java`

## Core Data Structures

*   `Graph.java`: Adjacency list representation for generic graphs (directed/undirected, weighted/unweighted).
*   `DisjointSet.java`: Optimized Disjoint Set Union (Union-Find) with path compression and union by rank.
*   `Edge.java`: Simple class to represent a weighted edge.

## How to Run

This project uses Maven.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/graph-algorithms-project.git
    cd graph-algorithms-project
    ```
    *(Note: Replace with actual repository URL if hosted)*

2.  **Compile the project:**
    ```bash
    mvn clean install
    ```

3.  **Run Tests:**
    To execute all JUnit tests:
    ```bash
    mvn test
    ```

4.  **Run Benchmarks:**
    To run the performance benchmarks (located in `bench/PerformanceBenchmark.java`):
    ```bash
    # Compile first if not already done
    mvn compile
    # Then run the main class directly
    mvn exec:java -Dexec.mainClass="com.example.graph.bench.PerformanceBenchmark"
    ```
    (You might need to add `bench` to your project's `pom.xml` build configuration if `mvn exec:java` doesn't find it automatically, or just compile and run from your IDE.)

## Documentation

*   `docs/Algorithms.md`: Provides detailed explanations, pseudocode, and ASCII art diagrams for each implemented algorithm.
*   `docs/InterviewTips.md`: Offers insights into common edge cases, potential pitfalls, and variations of these problems often encountered in interviews, along with complexity analysis summaries.

## Contributions

Feel free to contribute by opening issues or submitting pull requests for improvements, new algorithms, or more test cases.

---
```