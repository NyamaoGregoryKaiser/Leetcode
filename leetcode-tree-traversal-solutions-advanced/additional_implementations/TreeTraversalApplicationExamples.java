```java
package additional_implementations;

import com.example.treetraversals.datastructures.TreeNode;
import com.example.treetraversals.utils.TreeBuilder;

import java.util.LinkedList;
import java.util.Queue;

/**
 * This class provides examples of how basic tree traversals can be applied
 * to solve common tree-related problems.
 */
public class TreeTraversalApplicationExamples {

    /**
     * Counts the number of leaf nodes in a binary tree using recursive DFS (postorder-like).
     * A leaf node is a node that has no children.
     *
     * Time Complexity: O(N), where N is the number of nodes. Each node is visited once.
     * Space Complexity: O(H) due to recursion stack, where H is the height of the tree.
     *                   O(N) in worst case (skewed tree), O(logN) in best case (balanced tree).
     *
     * @param root The root of the binary tree.
     * @return The total count of leaf nodes.
     */
    public int countLeafNodesDFS(TreeNode root) {
        if (root == null) {
            return 0; // An empty tree has no leaf nodes.
        }
        // If it's a leaf node (no left and no right children)
        if (root.left == null && root.right == null) {
            return 1; // This node is a leaf.
        }
        // Recursively count leaf nodes in left and right subtrees.
        return countLeafNodesDFS(root.left) + countLeafNodesDFS(root.right);
    }

    /**
     * Counts the number of leaf nodes in a binary tree using iterative BFS (level order).
     *
     * Time Complexity: O(N), where N is the number of nodes. Each node is enqueued/dequeued once.
     * Space Complexity: O(W) due to the queue, where W is the maximum width of the tree.
     *                   O(N) in worst case (complete tree), O(1) in best case (skewed tree).
     *
     * @param root The root of the binary tree.
     * @return The total count of leaf nodes.
     */
    public int countLeafNodesBFS(TreeNode root) {
        if (root == null) {
            return 0;
        }

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        int leafCount = 0;

        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();

            // Check if the current node is a leaf
            if (node.left == null && node.right == null) {
                leafCount++;
            }

            // Enqueue children
            if (node.left != null) {
                queue.offer(node.left);
            }
            if (node.right != null) {
                queue.offer(node.right);
            }
        }
        return leafCount;
    }

    /**
     * Calculates the sum of all node values in a binary tree using recursive DFS (preorder-like).
     *
     * Time Complexity: O(N)
     * Space Complexity: O(H) due to recursion stack.
     *
     * @param root The root of the binary tree.
     * @return The sum of all node values.
     */
    public int sumAllNodesDFS(TreeNode root) {
        if (root == null) {
            return 0; // An empty tree contributes 0 to the sum.
        }
        // Sum current node's value and recursively sum values in left and right subtrees.
        return root.val + sumAllNodesDFS(root.left) + sumAllNodesDFS(root.right);
    }

    /**
     * Calculates the sum of all node values in a binary tree using iterative BFS (level order).
     *
     * Time Complexity: O(N)
     * Space Complexity: O(W) due to the queue.
     *
     * @param root The root of the binary tree.
     * @return The sum of all node values.
     */
    public int sumAllNodesBFS(TreeNode root) {
        if (root == null) {
            return 0;
        }

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        int totalSum = 0;

        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            totalSum += node.val; // Add current node's value to sum

            // Enqueue children
            if (node.left != null) {
                queue.offer(node.left);
            }
            if (node.right != null) {
                queue.offer(node.right);
            }
        }
        return totalSum;
    }

    /**
     * Main method to demonstrate these application examples.
     * @param args Command line arguments (not used).
     */
    public static void main(String[] args) {
        TreeTraversalApplicationExamples appExamples = new TreeTraversalApplicationExamples();

        // Sample Tree:
        //       3
        //      / \
        //     9  20
        //       /  \
        //      15   7
        Integer[] values = {3, 9, 20, null, null, 15, 7};
        TreeNode root = TreeBuilder.buildTree(values);
        System.out.println("Tree (Level Order): " + TreeBuilder.toLevelOrderList(root));

        System.out.println("\n--- Leaf Node Count ---");
        System.out.println("  DFS: " + appExamples.countLeafNodesDFS(root)); // Expected: 3 (9, 15, 7)
        System.out.println("  BFS: " + appExamples.countLeafNodesBFS(root)); // Expected: 3

        System.out.println("\n--- Sum of All Nodes ---");
        System.out.println("  DFS: " + appExamples.sumAllNodesDFS(root)); // Expected: 3+9+20+15+7 = 54
        System.out.println("  BFS: " + appExamples.sumAllNodesBFS(root)); // Expected: 54

        // Example with a single node tree
        TreeNode singleNodeRoot = TreeBuilder.buildTree(new Integer[]{10});
        System.out.println("\nSingle Node Tree (Level Order): " + TreeBuilder.toLevelOrderList(singleNodeRoot));
        System.out.println("  Leaf Nodes (DFS): " + appExamples.countLeafNodesDFS(singleNodeRoot)); // Expected: 1
        System.out.println("  Sum All Nodes (DFS): " + appExamples.sumAllNodesDFS(singleNodeRoot)); // Expected: 10

        // Example with an empty tree
        TreeNode emptyRoot = TreeBuilder.buildTree(new Integer[]{});
        System.out.println("\nEmpty Tree (Level Order): " + TreeBuilder.toLevelOrderList(emptyRoot));
        System.out.println("  Leaf Nodes (DFS): " + appExamples.countLeafNodesDFS(emptyRoot)); // Expected: 0
        System.out.println("  Sum All Nodes (DFS): " + appExamples.sumAllNodesDFS(emptyRoot)); // Expected: 0
    }
}
```