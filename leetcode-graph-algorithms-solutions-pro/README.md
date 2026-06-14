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
│   ├── README.md                               // Project overview and instructions
│   ├── Algorithms.md                           // Detailed explanations, pseudocode, ASCII diagrams
│   └── InterviewTips.md                        // Edge cases, gotchas, interview variations, complexity analysis
├── bench/
│   └── PerformanceBenchmark.java               // Benchmarking code for algorithms