```java
package benchmarking;

import com.example.treetraversals.TreeNode;
import com.example.treetraversals.TreeTraversalsRecursive;
import com.example.treetraversals.TreeTraversalsIterative;
import com.example.treetraversals.BSTIterator;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class PerformanceBenchmarking {

    // Builds a nearly complete binary tree of given depth.
    // For depth D, nodes are 2^(D+1) - 1.
    // This tree generation primarily focuses on creating a tree of a certain size, not a BST.
    private static TreeNode buildLargeTree(int depth) {
        int numNodes = (1 << (depth + 1)) - 1; // 2^(depth+1) - 1 nodes
        Integer[] array = new Integer[numNodes];
        Random rand = new Random();

        // Fill array with random values
        for (int i = 0; i < numNodes; i++) {
            array[i] = rand.nextInt(1000); // Values from 0-999
        }
        return TreeNode.fromArray(array);
    }

    // Builds a skewed tree to simulate worst-case recursion stack depth.
    private static TreeNode buildSkewedTree(int size) {
        if (size <= 0) return null;
        TreeNode root = new TreeNode(0);
        TreeNode current = root;
        for (int i = 1; i < size; i++) {
            current.left = new TreeNode(i);
            current = current.left;
        }
        return root;
    }

    public static void main(String[] args) {
        System.out.println("--- Tree Traversal Performance Benchmarking ---");

        TreeTraversalsRecursive recursiveTraversals = new TreeTraversalsRecursive();
        TreeTraversalsIterative iterativeTraversals = new TreeTraversalsIterative();

        // Test with different tree sizes/depths
        int[] treeDepths = {10, 15, 18, 20}; // Max depth for recursive might hit stack limit around 2000-8000
        int[] skewedTreeSizes = {1000, 5000, 10000, 20000}; // Skewed tree sizes

        System.out.println("\nBenchmarking for Balanced/Complete-like Trees:");
        for (int depth : treeDepths) {
            TreeNode largeTree = buildLargeTree(depth);
            int numNodes = (1 << (depth + 1)) - 1; // Correct node count for complete tree

            System.out.println(String.format("\nTree Depth: %d, Nodes: %d", depth, numNodes));

            // Preorder Recursive
            long startTime = System.nanoTime();
            recursiveTraversals.preorderTraversal(largeTree);
            long endTime = System.nanoTime();
            System.out.println("Preorder (Recursive): " + (endTime - startTime) / 1_000_000.0 + " ms");

            // Preorder Iterative
            startTime = System.nanoTime();
            iterativeTraversals.preorderTraversal(largeTree);
            endTime = System.nanoTime();
            System.out.println("Preorder (Iterative): " + (endTime - startTime) / 1_000_000.0 + " ms");

            // Inorder Recursive
            startTime = System.nanoTime();
            recursiveTraversals.inorderTraversal(largeTree);
            endTime = System.nanoTime();
            System.out.println("Inorder (Recursive): " + (endTime - startTime) / 1_000_000.0 + " ms");

            // Inorder Iterative
            startTime = System.nanoTime();
            iterativeTraversals.inorderTraversal(largeTree);
            endTime = System.nanoTime();
            System.out.println("Inorder (Iterative): " + (endTime - startTime) / 1_000_000.0 + " ms");

            // Postorder Recursive
            startTime = System.nanoTime();
            recursiveTraversals.postorderTraversal(largeTree);
            endTime = System.nanoTime();
            System.out.println("Postorder (Recursive): " + (endTime - startTime) / 1_000_000.0 + " ms");

            // Postorder Iterative
            startTime = System.nanoTime();
            iterativeTraversals.postorderTraversal(largeTree);
            endTime = System.nanoTime();
            System.out.println("Postorder (Iterative): " + (endTime - startTime) / 1_000_000.0 + " ms");

            // Level Order (BFS)
            startTime = System.nanoTime();
            recursiveTraversals.levelOrder(largeTree); // BFS is usually iterative
            endTime = System.nanoTime();
            System.out.println("Level Order (BFS):    " + (endTime - startTime) / 1_000_000.0 + " ms");

            // Zigzag Level Order (BFS)
            startTime = System.nanoTime();
            recursiveTraversals.zigzagLevelOrder(largeTree); // BFS is usually iterative
            endTime = System.nanoTime();
            System.out.println("Zigzag Level Order (BFS): " + (endTime - startTime) / 1_000_000.0 + " ms");
        }

        System.out.println("\nBenchmarking for Skewed Trees (Worst-case stack depth for recursive DFS):");
        for (int size : skewedTreeSizes) {
            TreeNode skewedTree = buildSkewedTree(size);
            System.out.println(String.format("\nSkewed Tree Size: %d", size));

            // Recursive DFS for skewed trees might cause StackOverflowError for large sizes.
            // Adjust JVM stack size if needed (e.g., -Xss4m or -Xss8m)
            try {
                long startTime = System.nanoTime();
                recursiveTraversals.inorderTraversal(skewedTree);
                long endTime = System.nanoTime();
                System.out.println("Inorder (Recursive): " + (endTime - startTime) / 1_000_000.0 + " ms");
            } catch (StackOverflowError e) {
                System.out.println("Inorder (Recursive): StackOverflowError for size " + size + ". Try increasing JVM stack size (-Xss flag).");
            }

            // Iterative Inorder
            long startTime = System.nanoTime();
            iterativeTraversals.inorderTraversal(skewedTree);
            long endTime = System.nanoTime();
            System.out.println("Inorder (Iterative): " + (endTime - startTime) / 1_000_000.0 + " ms");
        }

        // --- BSTIterator Benchmarking ---
        System.out.println("\n--- BSTIterator Performance Benchmarking ---");
        int bstSize = 1_000_000;
        Integer[] bstArray = new Integer[bstSize];
        for (int i = 0; i < bstSize; i++) {
            bstArray[i] = i; // Creates a skewed right BST from TreeNode.fromArray
        }
        TreeNode bstRoot = TreeNode.fromArray(bstArray);

        System.out.println(String.format("\nBST Size: %d", bstSize));

        // Test BSTIterator
        long startTime = System.nanoTime();
        BSTIterator bstIterator = new BSTIterator(bstRoot);
        int count = 0;
        while (bstIterator.hasNext()) {
            bstIterator.next();
            count++;
        }
        long endTime = System.nanoTime();
        System.out.println("BSTIterator (next calls): " + (endTime - startTime) / 1_000_000.0 + " ms for " + count + " elements.");

        // Compare with full inorder traversal
        // Note: this uses iterative inorder as recursive would SOF for such a large skewed tree
        startTime = System.nanoTime();
        iterativeTraversals.inorderTraversal(bstRoot);
        endTime = System.nanoTime();
        System.out.println("Full Inorder Traversal: " + (endTime - startTime) / 1_000_000.0 + " ms");
    }
}
```