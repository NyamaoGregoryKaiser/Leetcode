```java
package tree_traversals.util;

import tree_traversals.TreeNode;

import java.util.LinkedList;
import java.util.Queue;

/**
 * Utility class to build a binary tree from an array representation.
 * This is useful for creating test cases easily.
 * The array representation is similar to how LeetCode inputs are often described:
 * [3,9,20,null,null,15,7] means:
 *        3
 *       / \
 *      9  20
 *         / \
 *        15  7
 * 'null' indicates an empty child.
 */
public class TreeBuilder {

    /**
     * Builds a binary tree from an array of Integer values.
     * Null values in the array represent missing nodes.
     * The array is interpreted level by level (BFS order).
     *
     * @param arr An array of Integers where null represents a missing node.
     * @return The root TreeNode of the constructed binary tree.
     */
    public static TreeNode buildTree(Integer[] arr) {
        if (arr == null || arr.length == 0 || arr[0] == null) {
            return null;
        }

        TreeNode root = new TreeNode(arr[0]);
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        int i = 1;
        while (!queue.isEmpty() && i < arr.length) {
            TreeNode current = queue.poll();

            // Add left child
            if (i < arr.length) {
                if (arr[i] != null) {
                    current.left = new TreeNode(arr[i]);
                    queue.offer(current.left);
                }
                i++;
            }

            // Add right child
            if (i < arr.length) {
                if (arr[i] != null) {
                    current.right = new TreeNode(arr[i]);
                    queue.offer(current.right);
                }
                i++;
            }
        }
        return root;
    }

    /**
     * Converts a binary tree back into its level-order array representation.
     * Useful for verifying tree construction or for equality checks in tests.
     *
     * @param root The root of the binary tree.
     * @return An array of Integers representing the tree in level order, with nulls for missing nodes.
     */
    public static Integer[] toLevelOrderArray(TreeNode root) {
        if (root == null) {
            return new Integer[]{};
        }

        LinkedList<Integer> resultList = new LinkedList<>();
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            TreeNode current = queue.poll();

            if (current == null) {
                resultList.add(null);
                continue;
            }

            resultList.add(current.val);
            queue.offer(current.left);
            queue.offer(current.right);
        }

        // Trim trailing nulls that result from last level leaves
        while (!resultList.isEmpty() && resultList.getLast() == null) {
            resultList.removeLast();
        }

        return resultList.toArray(new Integer[0]);
    }

    // Example Usage (for internal testing/demonstration)
    public static void main(String[] args) {
        // Example 1: Basic tree
        Integer[] arr1 = {3, 9, 20, null, null, 15, 7};
        TreeNode root1 = buildTree(arr1);
        System.out.println("Tree 1 built. Level order: " + java.util.Arrays.toString(toLevelOrderArray(root1)));
        // Expected: [3, 9, 20, null, null, 15, 7]

        // Example 2: Single node
        Integer[] arr2 = {1};
        TreeNode root2 = buildTree(arr2);
        System.out.println("Tree 2 built. Level order: " + java.util.Arrays.toString(toLevelOrderArray(root2)));
        // Expected: [1]

        // Example 3: Skewed left
        Integer[] arr3 = {1, 2, null, 3, null, 4};
        TreeNode root3 = buildTree(arr3);
        System.out.println("Tree 3 built. Level order: " + java.util.Arrays.toString(toLevelOrderArray(root3)));
        // Expected: [1, 2, null, 3, null, null, null, 4] (trailing nulls get trimmed from toLevelOrderArray)
        // Note: The buildTree creates a tree that looks like:
        //      1
        //     /
        //    2
        //   /
        //  3
        // /
        // 4
        // toLevelOrderArray will show [1, 2, null, 3, null, null, null, 4] and then trim nulls.
        // It's mainly for building a tree, not necessarily for a perfect serialized representation that matches input 1:1 if input has unnecessary trailing nulls.

        // Example 4: Empty tree
        Integer[] arr4 = {};
        TreeNode root4 = buildTree(arr4);
        System.out.println("Tree 4 built. Level order: " + java.util.Arrays.toString(toLevelOrderArray(root4)));
        // Expected: []
    }
}
```