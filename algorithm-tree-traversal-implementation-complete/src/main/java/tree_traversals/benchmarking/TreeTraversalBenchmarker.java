```java
package tree_traversals.benchmarking;

import tree_traversals.*;
import tree_traversals.util.TreeBuilder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.function.BiConsumer;
import java.util.function.Function;

/**
 * This class provides functionality to benchmark the performance of different
 * tree traversal algorithms. It measures the execution time for various traversal types
 * on trees of different sizes and structures.
 */
public class TreeTraversalBenchmarker {

    private static final int WARMUP_ITERATIONS = 5;
    private static final int MEASUREMENT_ITERATIONS = 10;
    private static final int MAX_TREE_SIZE = 1_000_000; // Up to 1 million nodes

    private final Random random = new Random();

    public static void main(String[] args) {
        TreeTraversalBenchmarker benchmarker = new TreeTraversalBenchmarker();
        System.out.println("--- Tree Traversal Benchmarking ---");
        System.out.println("Warmup: " + WARMUP_ITERATIONS + " iterations, Measurement: " + MEASUREMENT_ITERATIONS + " iterations.");
        System.out.println("Max Tree Size: " + MAX_TREE_SIZE + " nodes.\n");

        benchmarker.runBenchmarks();
    }

    public void runBenchmarks() {
        // Benchmark different traversal types on various tree structures
        benchmarkTraversal(
                "Inorder Traversal",
                size -> generateRandomTree(size, 100), // Balanced to slightly skewed
                (root, tt) -> tt.inorderTraversalRecursive(root),
                (root, tt) -> tt.inorderTraversalIterative(root),
                (root, mtt) -> mtt.morrisInorderTraversal(root)
        );

        benchmarkTraversal(
                "Preorder Traversal",
                size -> generateRandomTree(size, 100),
                (root, tt) -> tt.preorderTraversalRecursive(root),
                (root, tt) -> tt.preorderTraversalIterative(root),
                (root, mtt) -> mtt.morrisPreorderTraversal(root)
        );

        benchmarkTraversal(
                "Postorder Traversal",
                size -> generateRandomTree(size, 100),
                (root, tt) -> tt.postorderTraversalRecursive(root),
                (root, tt) -> tt.postorderTraversalIterativeOneStack(root), // Using one-stack version for comparison
                (root, mtt) -> mtt.morrisPostorderTraversal(root)
        );

        benchmarkTraversal(
                "Level Order Traversal",
                size -> generateRandomTree(size, 100),
                (root, tt) -> tt.levelOrderTraversal(root)
        );

        benchmarkTraversal(
                "Zigzag Level Order Traversal",
                size -> generateRandomTree(size, 100),
                (root, tt) -> tt.zigzagLevelOrderTraversal(root)
        );

        benchmarkTraversal(
                "Right Side View Traversal",
                size -> generateRandomTree(size, 100),
                (root, tt) -> tt.rightSideView(root)
        );

        benchmarkTraversal(
                "Vertical Order Traversal",
                size -> generateRandomTree(size, 100),
                (root, tt) -> tt.verticalOrderTraversal(root)
        );

        // Benchmark Kth Smallest in BST
        benchmarkKthSmallest("Kth Smallest in BST (Iterative)",
                size -> generateBST(size), // Specifically a BST
                (root, it) -> it.kthSmallestInBSTIterative(root, random.nextInt(size) + 1)); // Random k
    }

    /**
     * General benchmark method for traversals that return List<Integer> or List<List<Integer>>.
     * Supports comparing recursive, iterative (stack-based), and Morris traversals.
     */
    private <T> void benchmarkTraversal(
            String name,
            Function<Integer, TreeNode> treeGenerator,
            BiConsumer<TreeNode, TreeTraversals> ... implementations) {

        System.out.println("\n--- Benchmarking " + name + " ---");
        System.out.printf("%-15s %-25s %-15s\n", "Tree Size", "Algorithm", "Avg Time (ms)");
        System.out.println("------------------------------------------------------------------");

        int[] treeSizes = {1000, 10000, 100000, MAX_TREE_SIZE};

        String[] implNames = {
                "Recursive (TreeTraversals)",
                "Iterative (TreeTraversals)",
                "Morris (MorrisTreeTraversals)" // Morris is for standard traversals only
        };

        for (int size : treeSizes) {
            TreeNode root = treeGenerator.apply(size);
            TreeNode morrisRoot = null; // Morris modifies the tree, so need a fresh copy

            for (int i = 0; i < implementations.length; i++) {
                BiConsumer<TreeNode, TreeTraversals> impl = implementations[i];
                String implName = implNames[i];

                if (implName.startsWith("Morris")) {
                    morrisRoot = copyTree(root); // Create a copy for Morris
                }

                // Warmup
                for (int j = 0; j < WARMUP_ITERATIONS; j++) {
                    if (implName.startsWith("Morris")) {
                        ((BiConsumer<TreeNode, MorrisTreeTraversals>)impl).accept(copyTree(root), new MorrisTreeTraversals());
                    } else {
                        impl.accept(root, new TreeTraversals());
                    }
                }

                long totalTime = 0;
                for (int j = 0; j < MEASUREMENT_ITERATIONS; j++) {
                    long startTime = System.nanoTime();
                    if (implName.startsWith("Morris")) {
                        ((BiConsumer<TreeNode, MorrisTreeTraversals>)impl).accept(copyTree(root), new MorrisTreeTraversals());
                    } else {
                        impl.accept(root, new TreeTraversals());
                    }
                    long endTime = System.nanoTime();
                    totalTime += (endTime - startTime);
                }
                double avgTimeMs = (double) totalTime / MEASUREMENT_ITERATIONS / 1_000_000.0;
                System.out.printf("%-15d %-25s %-15.4f\n", size, implName, avgTimeMs);
            }
        }
    }

    /**
     * Specialized benchmark for Kth Smallest problem.
     */
    private void benchmarkKthSmallest(
            String name,
            Function<Integer, TreeNode> treeGenerator,
            BiConsumer<TreeNode, IterativeTreeTraversals> implementation) {

        System.out.println("\n--- Benchmarking " + name + " ---");
        System.out.printf("%-15s %-25s %-15s\n", "Tree Size", "Algorithm", "Avg Time (ms)");
        System.out.println("------------------------------------------------------------------");

        int[] treeSizes = {1000, 10000, 100000, MAX_TREE_SIZE};
        String implName = "Iterative (IterativeTreeTraversals)";

        for (int size : treeSizes) {
            TreeNode root = treeGenerator.apply(size); // BST specifically
            int k = random.nextInt(size) + 1; // Random valid k

            // Warmup
            for (int j = 0; j < WARMUP_ITERATIONS; j++) {
                implementation.accept(root, new IterativeTreeTraversals());
            }

            long totalTime = 0;
            for (int j = 0; j < MEASUREMENT_ITERATIONS; j++) {
                long startTime = System.nanoTime();
                implementation.accept(root, new IterativeTreeTraversals());
                long endTime = System.nanoTime();
                totalTime += (endTime - startTime);
            }
            double avgTimeMs = (double) totalTime / MEASUREMENT_ITERATIONS / 1_000_000.0;
            System.out.printf("%-15d %-25s %-15.4f\n", size, implName, avgTimeMs);
        }
    }


    /**
     * Generates a random binary tree of a given size.
     * The `skewness` parameter (0-100) controls how balanced the tree is.
     * 0 = perfectly balanced (not truly, but tries to fill levels)
     * 100 = completely skewed (like a linked list)
     */
    private TreeNode generateRandomTree(int size, int skewness) {
        if (size <= 0) return null;

        List<Integer> values = new ArrayList<>();
        for (int i = 1; i <= size; i++) {
            values.add(i);
        }
        Collections.shuffle(values, random);

        Integer[] arr = new Integer[size];
        for (int i = 0; i < size; i++) {
            arr[i] = values.get(i);
        }

        TreeNode root = new TreeNode(arr[0]);
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        int i = 1;
        while (!queue.isEmpty() && i < size) {
            TreeNode current = queue.poll();

            // Introduce randomness in adding children based on skewness
            boolean addLeft = random.nextInt(100) >= skewness;
            boolean addRight = random.nextInt(100) >= skewness;

            if (addLeft && i < size) {
                current.left = new TreeNode(arr[i++]);
                queue.offer(current.left);
            }
            if (addRight && i < size) {
                current.right = new TreeNode(arr[i++]);
                queue.offer(current.right);
            }
        }
        return root;
    }

    /**
     * Generates a BST of a given size with random values.
     * Values are inserted randomly to create a somewhat balanced tree on average.
     */
    private TreeNode generateBST(int size) {
        if (size <= 0) return null;

        TreeNode root = null;
        for (int i = 0; i < size; i++) {
            root = insertIntoBST(root, random.nextInt(size * 10)); // Use larger range for values
        }
        return root;
    }

    private TreeNode insertIntoBST(TreeNode root, int val) {
        if (root == null) {
            return new TreeNode(val);
        }
        if (val < root.val) {
            root.left = insertIntoBST(root.left, val);
        } else if (val > root.val) { // Allow duplicates to go right, or handle as error
            root.right = insertIntoBST(root.right, val);
        }
        return root;
    }

    /**
     * Creates a deep copy of a tree. Necessary for Morris Traversal benchmarking
     * as it modifies the tree in-place.
     */
    private TreeNode copyTree(TreeNode root) {
        if (root == null) {
            return null;
        }
        TreeNode newRoot = new TreeNode(root.val);
        newRoot.left = copyTree(root.left);
        newRoot.right = copyTree(root.right);
        return newRoot;
    }
}
```