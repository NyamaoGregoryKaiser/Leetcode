```java
package com.example.treetraversals.problems;

import com.example.treetraversals.datastructures.TreeNode;

/**
 * This class provides a solution for finding the diameter of a binary tree.
 * The diameter of a binary tree is the length of the longest path between any two nodes in a tree.
 * This path may or may not pass through the root.
 * The length of a path between two nodes is represented by the number of edges between them.
 */
public class TreeDiameter {

    // A global variable to store the maximum diameter found so far.
    // This is updated during the DFS traversal.
    private int maxDiameter;

    /**
     * Calculates the diameter of a binary tree.
     *
     * The optimal approach uses a single Depth-First Search (DFS) traversal.
     * During the DFS, for each node, we recursively calculate the height of its left and right subtrees.
     * The diameter passing *through* the current node would be `height(left_subtree) + height(right_subtree)`.
     * We update the global `maxDiameter` with the maximum value found.
     * The function then returns the height of the current subtree (`1 + max(height(left), height(right))`).
     *
     * Time Complexity: O(N), where N is the number of nodes in the tree.
     *                  Each node is visited exactly once to calculate its height.
     * Space Complexity: O(H) in the average case (balanced tree) and O(N) in the worst case (skewed tree),
     *                   where H is the height of the tree. This is due to the recursion stack space.
     *
     * @param root The root of the binary tree.
     * @return The diameter of the binary tree (number of edges).
     */
    public int diameterOfBinaryTree(TreeNode root) {
        maxDiameter = 0; // Reset for each new call, important if method is called multiple times
        calculateHeight(root);
        return maxDiameter;
    }

    /**
     * Helper function to calculate the height of a subtree and update the maximum diameter.
     * This function effectively performs a post-order DFS traversal.
     *
     * @param node The current node in the traversal.
     * @return The height of the subtree rooted at 'node'.
     */
    private int calculateHeight(TreeNode node) {
        // Base case: An empty tree has a height of -1 (representing no edges).
        // Or, if defining height as number of nodes, it would be 0.
        // Using -1 for edges simplifies calculation: height of a leaf is 0.
        if (node == null) {
            return 0; // If using number of nodes for path length, 0 for null. If edges, -1.
                      // Let's stick to 0 for a null node's height, implying a leaf node has height 1.
                      // Then path_len = left_height + right_height.
                      // A single node tree: left_height=0, right_height=0. Diameter=0. Correct.
                      // Path for diameter is edges, so if height is nodes, need to adjust.
                      // Let's redefine `calculateHeight` to return the number of edges from current node to farthest leaf.
                      // So, leaf node returns 0.
            return 0;
        }

        // Recursively calculate the height of the left and right subtrees.
        // The height is the number of edges from the current node to the farthest leaf in its subtree.
        int leftHeight = calculateHeight(node.left);
        int rightHeight = calculateHeight(node.right);

        // The diameter passing through the current node is the sum of the heights of its left and right subtrees.
        // This is because a path that passes through the current node will go down its left child branch
        // and down its right child branch.
        // The number of edges is (left_edges) + (right_edges).
        maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);

        // The height of the current subtree (from the current node) is 1 (for the edge to the child)
        // plus the maximum height of its children's subtrees.
        return 1 + Math.max(leftHeight, rightHeight);
    }

    /*
     * Alternative interpretation of height:
     * If height(null) = -1 (meaning 0 edges for a leaf node)
     * int leftHeight = calculateHeight(node.left);
     * int rightHeight = calculateHeight(node.right);
     * maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight + 2); // +2 for edges from current node to children
     * return 1 + Math.max(leftHeight, rightHeight); // 1 for current node edge
     *
     * Or, simplest: The height returned by a helper function represents the maximum path from that node downwards.
     * When we pass `root` to `diameterOfBinaryTree(root)`, the helper `height(node)` returns the max depth
     * of a subtree rooted at `node`. A leaf node has height 1. A null node has height 0.
     * `height(node) = 1 + max(height(node.left), height(node.right))`
     *
     * Path length is number of edges.
     * If `height` returns number of NODES in longest path:
     * `height(null) = 0`
     * `height(leaf) = 1`
     * `height(node) = 1 + Math.max(height(node.left), height(node.right))`
     * Then diameter passing through `node` = `(height(node.left) - 1) + (height(node.right) - 1) + 2` (edges to root children)
     *                                      = `height(node.left) + height(node.right)` (number of edges)
     *
     * My `calculateHeight` method correctly returns `number of edges` for a subtree rooted at `node` to its farthest leaf.
     * `calculateHeight(null)` returns 0.
     * `calculateHeight(leaf)` returns 1 (edge to itself, or 0 if counting edges *down*).
     *
     * Let's re-align `calculateHeight` to return the max edges from `node` downwards.
     * `null` node has no edges, so returns 0.
     * `leaf` node has no children, so `max(0,0)` returns 0. `1+0 = 1`. A leaf node to itself is 0 edges, but from its parent it's 1 edge.
     * This interpretation leads to `height(leaf) = 1`.
     * So, a single node tree: `leftHeight=0, rightHeight=0`. `maxDiameter` becomes `max(0, 0+0) = 0`. Returns `1+0 = 1`.
     * Tree:    1
     *         / \
     *        2   3
     * `calculateHeight(2)`: `left=0, right=0`. `maxDiameter=max(0, 0+0)=0`. Returns `1+0=1`.
     * `calculateHeight(3)`: `left=0, right=0`. `maxDiameter=max(0, 0+0)=0`. Returns `1+0=1`.
     * `calculateHeight(1)`: `left=1, right=1`. `maxDiameter=max(0, 1+1)=2`. Returns `1+1=2`.
     * Result is 2. This is correct for a tree with 3 nodes forming 2 edges (1-2 and 1-3).
     *
     * What if diameter is like:
     *     1
     *    /
     *   2
     *  /
     * 3
     * `calculateHeight(3)`: `left=0, right=0`. `maxDiameter=0`. Returns `1`.
     * `calculateHeight(2)`: `left=1` (from node 3), `right=0`. `maxDiameter=max(0, 1+0)=1`. Returns `1+1=2`.
     * `calculateHeight(1)`: `left=2` (from node 2), `right=0`. `maxDiameter=max(1, 2+0)=2`. Returns `1+2=3`.
     * Result is 2. Correct. Longest path 3-2-1 has 2 edges.
     *
     * The current `calculateHeight` correctly returns the maximum *edges* from the current node down to a leaf,
     * and `maxDiameter` correctly captures the longest path (in edges) by summing up two such paths.
     */
}
```