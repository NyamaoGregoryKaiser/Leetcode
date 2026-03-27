```java
package com.example.treetraversals;

import com.example.treetraversals.datastructures.TreeNode;
import com.example.treetraversals.problems.BinaryTreeTraversals;
import com.example.treetraversals.problems.MaxDepthBinaryTree;
import com.example.treetraversals.problems.TreeDiameter;
import com.example.treetraversals.problems.ZigzagLevelOrderTraversal;
import com.example.treetraversals.utils.PerformanceBenchmark;
import com.example.treetraversals.utils.TreeBuilder;

import java.util.Arrays;
import java.util.List;

/**
 * Main class to demonstrate the usage of various tree traversal algorithms
 * and perform a basic performance benchmark.
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("--- Tree Traversals Project Demo ---");
        System.out.println();

        // --- Problem 1: Standard Binary Tree Traversals ---
        System.out.println("--- Problem 1: Standard Binary Tree Traversals ---");
        BinaryTreeTraversals btTraversals = new BinaryTreeTraversals();

        // Build a sample tree:
        //       3
        //      / \
        //     9  20
        //       /  \
        //      15   7
        Integer[] values = {3, 9, 20, null, null, 15, 7};
        TreeNode root = TreeBuilder.buildTree(values);
        System.out.println("Sample Tree (Level Order): " + TreeBuilder.toLevelOrderList(root));

        System.out.println("\n  Preorder Traversal:");
        System.out.println("    Recursive: " + btTraversals.preorderTraversalRecursive(root));
        System.out.println("    Iterative: " + btTraversals.preorderTraversalIterative(root));

        System.out.println("\n  Inorder Traversal:");
        System.out.println("    Recursive: " + btTraversals.inorderTraversalRecursive(root));
        System.out.println("    Iterative: " + btTraversals.inorderTraversalIterative(root));

        System.out.println("\n  Postorder Traversal:");
        System.out.println("    Recursive: " + btTraversals.postorderTraversalRecursive(root));
        System.out.println("    Iterative (Two Stacks): " + btTraversals.postorderTraversalIterativeTwoStacks(root));
        System.out.println("    Iterative (One Stack): " + btTraversals.postorderTraversalIterativeOneStack(root));

        System.out.println("\n  Level Order Traversal (BFS):");
        System.out.println("    Result: " + btTraversals.levelOrderTraversal(root));
        System.out.println();

        // --- Problem 2: Zigzag Level Order Traversal ---
        System.out.println("--- Problem 2: Zigzag Level Order Traversal ---");
        ZigzagLevelOrderTraversal zigzagTraversal = new ZigzagLevelOrderTraversal();
        List<List<Integer>> zigzagResult = zigzagTraversal.zigzagLevelOrder(root);
        System.out.println("  Zigzag Level Order: " + zigzagResult);
        System.out.println();

        // --- Problem 3: Maximum Depth of Binary Tree ---
        System.out.println("--- Problem 3: Maximum Depth of Binary Tree ---");
        MaxDepthBinaryTree maxDepthFinder = new MaxDepthBinaryTree();
        System.out.println("  Max Depth (DFS Recursive): " + maxDepthFinder.maxDepthDFSRecursive(root));
        System.out.println("  Max Depth (DFS Iterative): " + maxDepthFinder.maxDepthDFSIterative(root));
        System.out.println("  Max Depth (BFS): " + maxDepthFinder.maxDepthBFS(root));
        System.out.println();

        // --- Problem 4: Diameter of Binary Tree ---
        System.out.println("--- Problem 4: Diameter of Binary Tree ---");
        TreeDiameter treeDiameter = new TreeDiameter();
        System.out.println("  Diameter of Binary Tree: " + treeDiameter.diameterOfBinaryTree(root)); // Output should be 3 (15-20-7 or 9-3-20-15) - Path 9-3-20-15 has 3 edges.
                                                                                                    // My tree: [3,9,20,null,null,15,7]
                                                                                                    //    3
                                                                                                    //   / \
                                                                                                    //  9  20
                                                                                                    //    /  \
                                                                                                    //   15   7
                                                                                                    // Max path: 9 - 3 - 20 - 15 (3 edges) or 9 - 3 - 20 - 7 (3 edges)
                                                                                                    // My `calculateHeight` returns max edges from node down.
                                                                                                    // Expected diameter for this tree is 3. (9-3-20-15 or 9-3-20-7)
        System.out.println();


        // --- Performance Benchmarking ---
        System.out.println("--- Performance Benchmarking ---");

        // Create a large, somewhat balanced tree for benchmarking
        // Example: a tree of depth 10 would have ~2^11 nodes = 2047 nodes
        // depth 15: ~2^16 = 65535 nodes.
        // depth 18: ~2^19 = 524287 nodes.
        int treeSize = 100000; // Adjust for larger/smaller trees
        Integer[] largeTreeValues = new Integer[treeSize];
        for (int i = 0; i < treeSize; i++) {
            largeTreeValues[i] = i + 1;
        }
        TreeNode largeRoot = TreeBuilder.buildTree(largeTreeValues);
        System.out.println("Benchmarking with a large tree (approx " + treeSize + " nodes)...");

        int iterations = 100; // Number of times to run each algorithm for averaging

        PerformanceBenchmark.measurePerformance("Preorder Traversal (Recursive)",
                () -> btTraversals.preorderTraversalRecursive(largeRoot), iterations);

        PerformanceBenchmark.measurePerformance("Preorder Traversal (Iterative)",
                () -> btTraversals.preorderTraversalIterative(largeRoot), iterations);

        PerformanceBenchmark.measurePerformance("Inorder Traversal (Recursive)",
                () -> btTraversals.inorderTraversalRecursive(largeRoot), iterations);

        PerformanceBenchmark.measurePerformance("Inorder Traversal (Iterative)",
                () -> btTraversals.inorderTraversalIterative(largeRoot), iterations);

        PerformanceBenchmark.measurePerformance("Postorder Traversal (Recursive)",
                () -> btTraversals.postorderTraversalRecursive(largeRoot), iterations);

        PerformanceBenchmark.measurePerformance("Postorder Traversal (Iterative Two Stacks)",
                () -> btTraversals.postorderTraversalIterativeTwoStacks(largeRoot), iterations);

        PerformanceBenchmark.measurePerformance("Postorder Traversal (Iterative One Stack)",
                () -> btTraversals.postorderTraversalIterativeOneStack(largeRoot), iterations);

        PerformanceBenchmark.measurePerformance("Level Order Traversal (BFS)",
                () -> btTraversals.levelOrderTraversal(largeRoot), iterations);

        PerformanceBenchmark.measurePerformance("Zigzag Level Order Traversal",
                () -> zigzagTraversal.zigzagLevelOrder(largeRoot), iterations);

        PerformanceBenchmark.measurePerformance("Max Depth (DFS Recursive)",
                () -> maxDepthFinder.maxDepthDFSRecursive(largeRoot), iterations);

        PerformanceBenchmark.measurePerformance("Max Depth (DFS Iterative)",
                () -> maxDepthFinder.maxDepthDFSIterative(largeRoot), iterations);

        PerformanceBenchmark.measurePerformance("Max Depth (BFS)",
                () -> maxDepthFinder.maxDepthBFS(largeRoot), iterations);

        PerformanceBenchmark.measurePerformance("Tree Diameter",
                () -> treeDiameter.diameterOfBinaryTree(largeRoot), iterations);

        System.out.println("\n--- Demo End ---");
    }
}
```