```java
package com.example.treetraversals;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.function.Function;

/**
 * Simple performance benchmarking for different tree traversal algorithms.
 * This uses System.nanoTime() for basic timing. For more robust and accurate
 * benchmarking, especially for micro-benchmarks, consider using JMH (Java Microbenchmark Harness).
 *
 * To run:
 * From the project root, navigate to 'benchmarking' directory:
 * cd benchmarking
 * Then, compile and run:
 * mvn compile exec:java -Dexec.mainClass="com.example.treetraversals.PerformanceBenchmark"
 * (or use 'mvn compile exec:exec -Dexec.executable="java" -Dexec.args="-classpath %classpath com.example.treetraversals.PerformanceBenchmark" -f ../pom.xml' from project root if running from a specific directory is an issue)
 *
 * Simpler way to run from project root:
 * mvn clean install
 * mvn exec:java -Dexec.mainClass="com.example.treetraversals.PerformanceBenchmark"
 *
 * The pom.xml in the main project directory has a plugin setup to run this.
 * From project root: `mvn exec:java@run-benchmark`
 */
public class PerformanceBenchmark {

    private static final int WARMUP_ITERATIONS = 5;
    private static final int MEASUREMENT_ITERATIONS = 10;
    private static final int[] TREE_SIZES = {100, 1000, 10000, 50000, 100000}; // Number of nodes

    public static void main(String[] args) {
        System.out.println("Starting Tree Traversal Performance Benchmark...");
        System.out.println("Note: This is a basic benchmark using System.nanoTime(). For production-grade analysis, consider JMH.");
        System.out.println("--------------------------------------------------");

        for (int size : TREE_SIZES) {
            System.out.println("\nBenchmarking for tree with " + size + " nodes:");

            // Generate a balanced tree for benchmarking
            // For skewed trees, recursion depth might be an issue (StackOverflowError)
            // or iterative/Morris might show even more significant advantages.
            TreeNode root = generateBalancedTree(size);

            // Using TreeTraversalSolutions for recursive implementations
            TreeTraversalSolutions recursiveSolutions = new TreeTraversalSolutions();
            // Using IterativeTreeTraversalSolutions for iterative implementations
            IterativeTreeTraversalSolutions iterativeSolutions = new IterativeTreeTraversalSolutions();
            // Using MorrisTreeTraversalSolutions for space-optimized implementations
            MorrisTreeTraversalSolutions morrisSolutions = new MorrisTreeTraversalSolutions();

            System.out.println("  Preorder Traversal:");
            runBenchmark("Recursive Preorder", recursiveSolutions::preorderTraversalRecursive, root);
            runBenchmark("Iterative Preorder", iterativeSolutions::preorderTraversalIterative, root);
            runBenchmark("Morris Preorder", morrisSolutions::preorderTraversalMorris, root); // Morris modifies tree, so need to regenerate
            
            // Regenerate tree for Inorder as Morris traversal modifies the tree
            root = generateBalancedTree(size);
            System.out.println("  Inorder Traversal:");
            runBenchmark("Recursive Inorder", recursiveSolutions::inorderTraversalRecursive, root);
            runBenchmark("Iterative Inorder", iterativeSolutions::inorderTraversalIterative, root);
            runBenchmark("Morris Inorder", morrisSolutions::inorderTraversalMorris, root); // Morris modifies tree, so need to regenerate

            // Regenerate tree for Postorder as Morris traversal modifies the tree
            root = generateBalancedTree(size);
            System.out.println("  Postorder Traversal:");
            runBenchmark("Recursive Postorder", recursiveSolutions::postorderTraversalRecursive, root);
            runBenchmark("Iterative Postorder (Two Stacks)", iterativeSolutions::postorderTraversalIterativeTwoStacks, root);
            runBenchmark("Iterative Postorder (One Stack)", iterativeSolutions::postorderTraversalIterativeOneStack, root);
        }

        System.out.println("\n--------------------------------------------------");
        System.out.println("Benchmark finished.");
    }

    private static void runBenchmark(String name, Function<TreeNode, List<Integer>> method, TreeNode originalRoot) {
        long totalTime = 0;
        TreeNode rootForMethod;

        // Warmup phase
        for (int i = 0; i < WARMUP_ITERATIONS; i++) {
            // For methods that modify the tree (like Morris), always pass a fresh copy.
            rootForMethod = deepCopyTree(originalRoot);
            method.apply(rootForMethod);
        }

        // Measurement phase
        for (int i = 0; i < MEASUREMENT_ITERATIONS; i++) {
            rootForMethod = deepCopyTree(originalRoot); // Ensure method always starts with original tree state
            long startTime = System.nanoTime();
            method.apply(rootForMethod);
            long endTime = System.nanoTime();
            totalTime += (endTime - startTime);
        }

        double averageTimeMs = (double) totalTime / MEASUREMENT_ITERATIONS / 1_000_000.0;
        System.out.printf("    %-30s : %.4f ms%n", name, averageTimeMs);
    }

    /**
     * Generates a roughly balanced binary tree using a level-order array construction.
     * This avoids extremely skewed trees that could cause StackOverflowError for recursive methods
     * with large N.
     */
    private static TreeNode generateBalancedTree(int size) {
        if (size <= 0) return null;

        Integer[] arr = new Integer[size];
        for (int i = 0; i < size; i++) {
            arr[i] = i + 1; // Populate with sequential values
        }
        return TreeUtils.buildTreeFromArray(arr);
    }

    /**
     * Creates a deep copy of a TreeNode. Essential for Morris Traversal benchmarks
     * as it modifies the tree in-place.
     */
    private static TreeNode deepCopyTree(TreeNode root) {
        if (root == null) {
            return null;
        }

        // Using TreeUtils' serialize and deserialize for deep copy
        List<Integer> serialized = TreeUtils.serializeTreeToArray(root);
        return TreeUtils.buildTreeFromArray(serialized.toArray(new Integer[0]));
    }
}
```