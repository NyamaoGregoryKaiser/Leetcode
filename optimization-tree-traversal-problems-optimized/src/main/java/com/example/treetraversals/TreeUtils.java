```java
package com.example.treetraversals;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

/**
 * A utility class for common operations on Binary Trees,
 * such as building a tree from an array, serializing, and printing.
 */
public class TreeUtils {

    /**
     * Builds a binary tree from an array representation (level order).
     * Null values in the array represent missing nodes.
     *
     * Example: [3,9,20,null,null,15,7]
     *       3
     *      / \
     *     9  20
     *       /  \
     *      15   7
     *
     * @param arr The array of Integers representing the tree in level order.
     *            Nulls indicate no child.
     * @return The root TreeNode of the constructed binary tree.
     */
    public static TreeNode buildTreeFromArray(Integer[] arr) {
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
            if (i < arr.length && arr[i] != null) {
                current.left = new TreeNode(arr[i]);
                queue.offer(current.left);
            }
            i++;

            // Add right child
            if (i < arr.length && arr[i] != null) {
                current.right = new TreeNode(arr[i]);
                queue.offer(current.right);
            }
            i++;
        }
        return root;
    }

    /**
     * Serializes a binary tree into an array representation (level order).
     * This is the reverse operation of buildTreeFromArray and can be used
     * to check if a tree has been correctly modified or constructed.
     *
     * @param root The root of the binary tree to serialize.
     * @return A List of Integers representing the tree in level order,
     *         with nulls for empty nodes. Trailing nulls are trimmed.
     */
    public static List<Integer> serializeTreeToArray(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            TreeNode current = queue.poll();
            if (current == null) {
                result.add(null);
            } else {
                result.add(current.val);
                queue.offer(current.left);
                queue.offer(current.right);
            }
        }

        // Remove trailing nulls to match common array representation standards
        while (result.size() > 0 && result.get(result.size() - 1) == null) {
            result.remove(result.size() - 1);
        }

        return result;
    }

    /**
     * Prints a binary tree structure to the console using a level-order traversal
     * with indentation to visualize the hierarchy.
     *
     * This is a basic text-based visualization and might not be perfect for very wide trees.
     *
     * @param root The root of the tree to print.
     */
    public static void printTree(TreeNode root) {
        if (root == null) {
            System.out.println("Tree is empty.");
            return;
        }

        List<List<String>> lines = new ArrayList<>();
        List<TreeNode> level = new ArrayList<>();
        List<TreeNode> nextLevel = new ArrayList<>();
        level.add(root);
        int nn = 1; // Number of nodes in current level
        int widest = 0; // Widest value string length

        while (nn != 0) {
            List<String> line = new ArrayList<>();
            nn = 0;
            for (TreeNode n : level) {
                if (n == null) {
                    line.add(" ");
                    nextLevel.add(null);
                    nextLevel.add(null);
                } else {
                    String val = String.valueOf(n.val);
                    line.add(val);
                    if (val.length() > widest) widest = val.length();
                    nextLevel.add(n.left);
                    nextLevel.add(n.right);
                    if (n.left != null) nn++;
                    if (n.right != null) nn++;
                }
            }
            if (nn != 0) {
                lines.add(line);
            }
            level = nextLevel;
            nextLevel = new ArrayList<>();
        }

        int perPiece = widest + 4; // space for numbers + 2 on each side
        for (int i = 0; i < lines.size(); i++) {
            List<String> line = lines.get(i);
            int floor = lines.size() - i - 1;
            int edgeLines = (int) Math.pow(2, Math.max(0, floor - 1));
            int firstSpaces = (int) Math.pow(2, floor) - 1;
            int betweenSpaces = (int) Math.pow(2, floor + 1) - 1;

            printSpaces(firstSpaces * perPiece / 2); // adjusted spacing

            for (int j = 0; j < line.size(); j++) {
                if (line.get(j).equals(" ")) {
                    printSpaces(perPiece);
                    continue;
                }
                String val = line.get(j);
                int gap = perPiece - val.length();
                printSpaces(gap / 2);
                System.out.print(val);
                printSpaces(gap - gap / 2);
                if (j < line.size() - 1) {
                    printSpaces(betweenSpaces * perPiece / 2); // adjusted spacing
                }
            }
            System.out.println();

            if (floor > 0) {
                for (int j = 0; j < line.size(); j++) {
                    printSpaces(firstSpaces * perPiece / 2 - 1);
                    if (line.get(j).equals(" ")) {
                        printSpaces(perPiece + 2);
                        continue;
                    }
                    if (lines.get(i+1).get(j*2).equals(" ") && lines.get(i+1).get(j*2+1).equals(" ")) {
                        printSpaces(perPiece + 2);
                        continue;
                    }

                    if (!lines.get(i+1).get(j*2).equals(" ")) { // Has left child
                        System.out.print("/");
                    } else {
                        printSpaces(1);
                    }
                    printSpaces(perPiece - 2);
                    if (!lines.get(i+1).get(j*2+1).equals(" ")) { // Has right child
                        System.out.print("\\");
                    } else {
                        printSpaces(1);
                    }

                    if (j < line.size() - 1) {
                        printSpaces(betweenSpaces * perPiece / 2);
                    }
                }
                System.out.println();
            }
        }
        System.out.println("\n");
    }

    private static void printSpaces(int count) {
        for (int i = 0; i < count; i++) {
            System.out.print(" ");
        }
    }
}
```