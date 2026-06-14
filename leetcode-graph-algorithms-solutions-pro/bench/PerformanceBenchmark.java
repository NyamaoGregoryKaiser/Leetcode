```java
package com.example.graph.bench;

import com.example.graph.algorithms.CourseSchedule;
import com.example.graph.algorithms.CycleDetection;
import com.example.graph.algorithms.KruskalsMST;
import com.example.graph.algorithms.ShortestPathBFS;
import com.example.graph.datastructures.Graph;
import com.example.graph.util.GraphGenerator;

import java.util.List;
import java.util.Random;

/**
 * Performance benchmarking class for the implemented graph algorithms.
 * Measures execution time for different algorithms on various graph sizes and densities.
 *
 * To run this benchmark:
 * 1. Compile the project: `mvn clean install`
 * 2. Run this class directly (e.g., from an IDE, or using `mvn exec:java -Dexec.mainClass="com.example.graph.bench.PerformanceBenchmark"`)
 */
public class PerformanceBenchmark {

    private static final int WARMUP_ITERATIONS = 5;
    private static final int MEASUREMENT_ITERATIONS = 10;

    public static void main(String[] args) {
        System.out.println("Starting Graph Algorithm Performance Benchmark...\n");

        runShortestPathBFSBenchmarks();
        System.out.println("\n------------------------------------\n");
        runCycleDetectionBenchmarks();
        System.out.println("\n------------------------------------\n");
        runKruskalsMSTBenchmarks();
        System.out.println("\n------------------------------------\n");
        runCourseScheduleBenchmarks();

        System.out.println("\nGraph Algorithm Performance Benchmark Finished.");
    }

    private static void runShortestPathBFSBenchmarks() {
        System.out.println("--- ShortestPathBFS Benchmarks ---");
        int[] numVertices = {100, 1000, 5000}; // Vary number of vertices
        double[] densities = {0.01, 0.1, 0.5}; // Sparse, medium, dense

        for (int V : numVertices) {
            for (double D : densities) {
                // For BFS, unweighted graphs are typical, weight doesn't affect complexity.
                // We'll use undirected graphs for general pathfinding.
                Graph<Integer> graph = GraphGenerator.generateRandomGraph(V, D, false, 0);
                Random rand = new Random();
                Integer start = rand.nextInt(V);
                Integer end = rand.nextInt(V);
                if (V > 1) { // Ensure start != end if possible
                    while (start.equals(end)) {
                        end = rand.nextInt(V);
                    }
                }

                ShortestPathBFS<Integer> bfs = new ShortestPathBFS<>();

                // Warmup
                for (int i = 0; i < WARMUP_ITERATIONS; i++) {
                    bfs.findShortestDistance(graph, start, end);
                }

                // Measurement
                long totalTime = 0;
                for (int i = 0; i < MEASUREMENT_ITERATIONS; i++) {
                    long startTime = System.nanoTime();
                    bfs.findShortestDistance(graph, start, end);
                    long endTime = System.nanoTime();
                    totalTime += (endTime - startTime);
                }
                double avgTimeMs = (double) totalTime / MEASUREMENT_ITERATIONS / 1_000_000.0;
                System.out.printf("BFS (V=%d, D=%.2f, E=%d): Avg Time = %.4f ms%n",
                        V, D, graph.getNumEdges(), avgTimeMs);
            }
        }
    }

    private static void runCycleDetectionBenchmarks() {
        System.out.println("--- CycleDetection Benchmarks (Undirected) ---");
        int[] numVertices = {100, 1000, 5000};
        double[] densities = {0.01, 0.1, 0.5}; // DSU performance heavily depends on E

        for (int V : numVertices) {
            for (double D : densities) {
                // Generate a graph that might have cycles
                Graph<Integer> graph = GraphGenerator.generateRandomGraph(V, D, false, 0);
                CycleDetection<Integer> cd = new CycleDetection<>();

                // Warmup and Measurement for DFS
                for (int i = 0; i < WARMUP_ITERATIONS; i++) { cd.detectCycleDFS(graph); }
                long totalTimeDFS = 0;
                for (int i = 0; i < MEASUREMENT_ITERATIONS; i++) {
                    long startTime = System.nanoTime();
                    cd.detectCycleDFS(graph);
                    long endTime = System.nanoTime();
                    totalTimeDFS += (endTime - startTime);
                }
                double avgTimeDFS_Ms = (double) totalTimeDFS / MEASUREMENT_ITERATIONS / 1_000_000.0;
                System.out.printf("DFS Cycle Detection (V=%d, D=%.2f, E=%d): Avg Time = %.4f ms%n",
                        V, D, graph.getNumEdges(), avgTimeDFS_Ms);

                // Warmup and Measurement for DSU
                for (int i = 0; i < WARMUP_ITERATIONS; i++) { cd.detectCycleDSU(graph); }
                long totalTimeDSU = 0;
                for (int i = 0; i < MEASUREMENT_ITERATIONS; i++) {
                    long startTime = System.nanoTime();
                    cd.detectCycleDSU(graph);
                    long endTime = System.nanoTime();
                    totalTimeDSU += (endTime - startTime);
                }
                double avgTimeDSU_Ms = (double) totalTimeDSU / MEASUREMENT_ITERATIONS / 1_000_000.0;
                System.out.printf("DSU Cycle Detection (V=%d, D=%.2f, E=%d): Avg Time = %.4f ms%n",
                        V, D, graph.getNumEdges(), avgTimeDSU_Ms);
            }
        }
    }

    private static void runKruskalsMSTBenchmarks() {
        System.out.println("--- KruskalsMST Benchmarks ---");
        int[] numVertices = {100, 1000, 5000};
        double[] densities = {0.05, 0.2, 0.8}; // For MST, graphs should be connected, higher density helps.
        int maxWeight = 1000;

        for (int V : numVertices) {
            for (double D : densities) {
                // Kruskal's requires weighted undirected graph
                Graph<Integer> graph = GraphGenerator.generateRandomGraph(V, D, false, maxWeight);
                KruskalsMST<Integer> kruskal = new KruskalsMST<>();

                // Warmup
                for (int i = 0; i < WARMUP_ITERATIONS; i++) {
                    kruskal.findMinimumSpanningTree(graph);
                }

                // Measurement
                long totalTime = 0;
                for (int i = 0; i < MEASUREMENT_ITERATIONS; i++) {
                    long startTime = System.nanoTime();
                    List<com.example.graph.datastructures.Edge<Integer>> mst = kruskal.findMinimumSpanningTree(graph);
                    long endTime = System.nanoTime();
                    totalTime += (endTime - startTime);
                }
                double avgTimeMs = (double) totalTime / MEASUREMENT_ITERATIONS / 1_000_000.0;
                System.out.printf("Kruskal's MST (V=%d, D=%.2f, E=%d): Avg Time = %.4f ms%n",
                        V, D, graph.getNumEdges(), avgTimeMs);
            }
        }
    }

    private static void runCourseScheduleBenchmarks() {
        System.out.println("--- CourseSchedule (Topological Sort) Benchmarks (Directed) ---");
        int[] numVertices = {100, 1000, 5000};
        double[] densities = {0.01, 0.1, 0.5}; // DAGs

        for (int V : numVertices) {
            for (double D : densities) {
                // Topological sort requires a DAG
                Graph<Integer> graph = GraphGenerator.generateRandomDAG(V, D, 0);
                CourseSchedule<Integer> cs = new CourseSchedule<>();

                // Warmup and Measurement for Kahn's (BFS)
                for (int i = 0; i < WARMUP_ITERATIONS; i++) { cs.findOrderKahn(graph); }
                long totalTimeKahn = 0;
                for (int i = 0; i < MEASUREMENT_ITERATIONS; i++) {
                    long startTime = System.nanoTime();
                    cs.findOrderKahn(graph);
                    long endTime = System.nanoTime();
                    totalTimeKahn += (endTime - startTime);
                }
                double avgTimeKahn_Ms = (double) totalTimeKahn / MEASUREMENT_ITERATIONS / 1_000_000.0;
                System.out.printf("Kahn's Algo (V=%d, D=%.2f, E=%d): Avg Time = %.4f ms%n",
                        V, D, graph.getNumEdges(), avgTimeKahn_Ms);

                // Warmup and Measurement for DFS
                for (int i = 0; i < WARMUP_ITERATIONS; i++) { cs.findOrderDFS(graph); }
                long totalTimeDFS = 0;
                for (int i = 0; i < MEASUREMENT_ITERATIONS; i++) {
                    long startTime = System.nanoTime();
                    cs.findOrderDFS(graph);
                    long endTime = System.nanoTime();
                    totalTimeDFS += (endTime - startTime);
                }
                double avgTimeDFS_Ms = (double) totalTimeDFS / MEASUREMENT_ITERATIONS / 1_000_000.0;
                System.out.printf("DFS Topo Sort (V=%d, D=%.2f, E=%d): Avg Time = %.4f ms%n",
                        V, D, graph.getNumEdges(), avgTimeDFS_Ms);
            }
        }
    }
}
```