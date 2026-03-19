```java
package com.graphinterview.utilities;

import com.graphinterview.algorithms.CourseScheduleII;
import com.graphinterview.algorithms.DijkstraAlgorithm;
import com.graphinterview.algorithms.KruskalAlgorithm;
import com.graphinterview.algorithms.NumberOfIslands;
import com.graphinterview.algorithms.ShortestPathBinaryMatrix;
import com.graphinterview.datastructures.Graph;

import java.util.Random;

/**
 * Utility class for benchmarking the performance of various graph algorithms.
 * It generates random graph inputs and measures the execution time for different algorithms.
 */
public class PerformanceBenchmarker {

    private static final Random RANDOM = new Random();

    public static void main(String[] args) {
        System.out.println("--- Graph Algorithm Performance Benchmarker ---");

        // Benchmarking NumberOfIslands
        System.out.println("\nBenchmarking NumberOfIslands (DFS vs BFS):");
        runNumberOfIslandsBenchmark(500, 500); // 500x500 grid
        runNumberOfIslandsBenchmark(1000, 1000); // 1000x1000 grid (can be slow for deep recursion DFS without iterative conversion)

        // Benchmarking ShortestPathBinaryMatrix
        System.out.println("\nBenchmarking ShortestPathBinaryMatrix (BFS):");
        runShortestPathBinaryMatrixBenchmark(500); // 500x500 grid
        runShortestPathBinaryMatrixBenchmark(1000); // 1000x1000 grid

        // Benchmarking DijkstraAlgorithm
        System.out.println("\nBenchmarking DijkstraAlgorithm:");
        runDijkstraBenchmark(500, 5000); // 500 vertices, 5000 edges
        runDijkstraBenchmark(1000, 10000); // 1000 vertices, 10000 edges
        runDijkstraBenchmark(1000, 50000); // 1000 vertices, 50000 edges (denser)

        // Benchmarking KruskalAlgorithm
        System.out.println("\nBenchmarking KruskalAlgorithm:");
        runKruskalBenchmark(500, 5000); // 500 vertices, 5000 edges
        runKruskalBenchmark(1000, 10000); // 1000 vertices, 10000 edges
        runKruskalBenchmark(1000, 50000); // 1000 vertices, 50000 edges

        // Benchmarking CourseScheduleII
        System.out.println("\nBenchmarking CourseScheduleII (Kahn's BFS vs DFS):");
        runCourseScheduleBenchmark(1000, 2000); // 1000 courses, 2000 prerequisites
        runCourseScheduleBenchmark(5000, 10000); // 5000 courses, 10000 prerequisites
    }

    /**
     * Helper to measure execution time.
     * @param runnable The code to benchmark.
     * @return Execution time in milliseconds.
     */
    private static long measureTime(Runnable runnable) {
        long startTime = System.currentTimeMillis();
        runnable.run();
        long endTime = System.currentTimeMillis();
        return endTime - startTime;
    }

    // --- NumberOfIslands Benchmarks ---
    private static void runNumberOfIslandsBenchmark(int rows, int cols) {
        System.out.printf("  Grid size: %dx%d\n", rows, cols);
        char[][] gridDFS = generateRandomBinaryGrid(rows, cols, 0.4); // 40% land
        char[][] gridBFS = deepCopyGrid(gridDFS); // BFS modifies grid, so need a copy

        NumberOfIslands solver = new NumberOfIslands();

        long dfsTime = measureTime(() -> solver.numIslandsDFS(gridDFS));
        System.out.printf("    DFS Time: %d ms\n", dfsTime);

        long bfsTime = measureTime(() -> solver.numIslandsBFS(gridBFS));
        System.out.printf("    BFS Time: %d ms\n", bfsTime);
    }

    private static char[][] generateRandomBinaryGrid(int rows, int cols, double landProbability) {
        char[][] grid = new char[rows][cols];
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                grid[i][j] = RANDOM.nextDouble() < landProbability ? '1' : '0';
            }
        }
        return grid;
    }

    private static char[][] deepCopyGrid(char[][] original) {
        if (original == null) return null;
        char[][] copy = new char[original.length][];
        for (int i = 0; i < original.length; i++) {
            copy[i] = Arrays.copyOf(original[i], original[i].length);
        }
        return copy;
    }

    // --- ShortestPathBinaryMatrix Benchmarks ---
    private static void runShortestPathBinaryMatrixBenchmark(int n) {
        System.out.printf("  Grid size: %dx%d\n", n, n);
        int[][] grid = generateRandomBinaryMatrix(n, n, 0.2); // 20% obstacles
        // Ensure start and end are clear for a valid path
        if (grid[0][0] == 1) grid[0][0] = 0;
        if (grid[n-1][n-1] == 1) grid[n-1][n-1] = 0;

        ShortestPathBinaryMatrix solver = new ShortestPathBinaryMatrix();

        // For this problem, the grid is modified, so we need to copy it for repeated runs or just run once.
        long time = measureTime(() -> solver.shortestPathBinaryMatrix(grid));
        System.out.printf("    BFS Time: %d ms\n", time);
    }

    private static int[][] generateRandomBinaryMatrix(int rows, int cols, double obstacleProbability) {
        int[][] grid = new int[rows][cols];
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                grid[i][j] = RANDOM.nextDouble() < obstacleProbability ? 1 : 0;
            }
        }
        return grid;
    }

    // --- DijkstraAlgorithm Benchmarks ---
    private static void runDijkstraBenchmark(int numVertices, int numEdges) {
        System.out.printf("  Vertices: %d, Edges: %d\n", numVertices, numEdges);
        Graph graph = generateRandomWeightedDirectedGraph(numVertices, numEdges, 1, 100);
        int source = RANDOM.nextInt(numVertices);

        DijkstraAlgorithm solver = new DijkstraAlgorithm();

        long time = measureTime(() -> solver.findShortestPaths(graph, source));
        System.out.printf("    Dijkstra Time: %d ms\n", time);
    }

    // --- KruskalAlgorithm Benchmarks ---
    private static void runKruskalBenchmark(int numVertices, int numEdges) {
        System.out.printf("  Vertices: %d, Edges: %d\n", numVertices, numEdges);
        // Kruskal's needs connected graph generally, and undirected edges.
        Graph graph = generateRandomWeightedUndirectedGraph(numVertices, numEdges, 1, 100);

        KruskalAlgorithm solver = new KruskalAlgorithm();

        long time = measureTime(() -> solver.findMinimumSpanningTree(graph));
        System.out.printf("    Kruskal Time: %d ms\n", time);
    }


    // --- CourseScheduleII Benchmarks ---
    private static void runCourseScheduleBenchmark(int numCourses, int numPrerequisites) {
        System.out.printf("  Courses: %d, Prerequisites: %d\n", numCourses, numPrerequisites);
        int[][] prerequisitesKahn = generateRandomPrerequisites(numCourses, numPrerequisites);
        int[][] prerequisitesDFS = deepCopyPrerequisites(prerequisitesKahn); // Copy for DFS

        CourseScheduleII solver = new CourseScheduleII();

        long kahnTime = measureTime(() -> solver.findOrderKahn(numCourses, prerequisitesKahn));
        System.out.printf("    Kahn's (BFS) Time: %d ms\n", kahnTime);

        long dfsTime = measureTime(() -> solver.findOrderDFS(numCourses, prerequisitesDFS));
        System.out.printf("    DFS Time: %d ms\n", dfsTime);
    }

    private static int[][] generateRandomPrerequisites(int numCourses, int numPrerequisites) {
        // Simple generation, might produce duplicates or cycles.
        // For benchmarking purposes, this is usually acceptable, as algorithms should handle cycles.
        int[][] prereqs = new int[numPrerequisites][2];
        for (int i = 0; i < numPrerequisites; i++) {
            int course = RANDOM.nextInt(numCourses);
            int preCourse = RANDOM.nextInt(numCourses);
            while (course == preCourse) { // Avoid self-prerequisites immediately
                preCourse = RANDOM.nextInt(numCourses);
            }
            prereqs[i] = new int[]{course, preCourse};
        }
        return prereqs;
    }

    private static int[][] deepCopyPrerequisites(int[][] original) {
        if (original == null) return null;
        int[][] copy = new int[original.length][];
        for (int i = 0; i < original.length; i++) {
            copy[i] = Arrays.copyOf(original[i], original[i].length);
        }
        return copy;
    }

    // --- Graph Generation Helpers ---
    private static Graph generateRandomWeightedDirectedGraph(int numVertices, int numEdges, int minWeight, int maxWeight) {
        Graph graph = new Graph(numVertices);
        for (int i = 0; i < numEdges; i++) {
            int u = RANDOM.nextInt(numVertices);
            int v = RANDOM.nextInt(numVertices);
            int weight = RANDOM.nextInt(maxWeight - minWeight + 1) + minWeight;
            if (u != v) { // Avoid self-loops for simplicity in many algorithms
                graph.addEdge(u, v, weight, true);
            }
        }
        return graph;
    }

    private static Graph generateRandomWeightedUndirectedGraph(int numVertices, int numEdges, int minWeight, int maxWeight) {
        Graph graph = new Graph(numVertices);
        // Ensure connectivity for MST problems.
        // A simple way is to build a path/star, then add random edges.
        // Connect all nodes to 0 first to ensure connectivity.
        if (numVertices > 1) {
            for (int i = 1; i < numVertices; i++) {
                int weight = RANDOM.nextInt(maxWeight - minWeight + 1) + minWeight;
                graph.addEdge(0, i, weight, false); // Connected to 0
            }
        }

        // Add remaining random edges
        int currentEdges = graph.getAllEdges().size(); // Count initial edges from connectivity step
        for (int i = currentEdges; i < numEdges; i++) {
            int u = RANDOM.nextInt(numVertices);
            int v = RANDOM.nextInt(numVertices);
            int weight = RANDOM.nextInt(maxWeight - minWeight + 1) + minWeight;
            if (u != v) {
                // Check for existing edge to avoid redundant addition if Graph.addEdge doesn't handle it
                // For performance, simply add, Kruskal's will handle duplicates/parallel edges by sorting.
                graph.addEdge(u, v, weight, false);
            }
        }
        return graph;
    }
}

```