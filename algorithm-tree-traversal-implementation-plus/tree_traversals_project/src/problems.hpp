```cpp
#ifndef TREE_TRAVERSALS_PROBLEMS_HPP
#define TREE_TRAVERSALS_PROBLEMS_HPP

#include "tree_node.hpp"
#include <vector>
#include <stack>
#include <queue>
#include <deque>
#include <algorithm> // For std::reverse

/**
 * @brief Class containing solutions for various tree traversal problems.
 *
 * Each public method represents a problem, with often multiple approaches
 * (e.g., recursive vs. iterative) implemented as private helper methods.
 *
 * Time and Space Complexity Analysis:
 *
 * In general, for any traversal that visits every node once:
 * Time Complexity: O(N), where N is the number of nodes in the tree.
 * Space Complexity:
 *   - Recursive: O(H) in the average case (balanced tree), O(N) in the worst case (skewed tree),
 *     due to recursion stack space, where H is the height of the tree.
 *   - Iterative (using explicit stack/queue): O(W) for level order (BFS), where W is max width,
 *     O(H) for DFS-like traversals (inorder, preorder, postorder) using a stack.
 *     In worst case for skewed trees, H can be N, so O(N).
 *     For level order, W can be N/2 for a complete binary tree, so also O(N).
 *     Therefore, both recursive and iterative approaches typically have O(N) space in the worst case.
 */
class TreeTraversalProblems {
public:
    // --- Problem 1: Standard DFS Traversals (Inorder, Preorder, Postorder) ---

    /**
     * @brief Performs Inorder Traversal (Left -> Root -> Right).
     *
     * Inorder traversal of a Binary Search Tree (BST) visits nodes in non-decreasing order.
     * Approaches:
     *   1. Recursive: Simple and intuitive.
     *   2. Iterative: Using an explicit stack, avoids recursion depth limits.
     *
     * @param root The root of the tree.
     * @param use_iterative If true, use iterative approach; otherwise, use recursive.
     * @return A vector of integers representing the inorder traversal.
     */
    std::vector<int> inorderTraversal(TreeNode* root, bool use_iterative = false);

    /**
     * @brief Performs Preorder Traversal (Root -> Left -> Right).
     *
     * Preorder traversal is useful for creating a prefix expression of an expression tree
     * or for making a copy of a tree.
     * Approaches:
     *   1. Recursive: Straightforward.
     *   2. Iterative: Using an explicit stack.
     *
     * @param root The root of the tree.
     * @param use_iterative If true, use iterative approach; otherwise, use recursive.
     * @return A vector of integers representing the preorder traversal.
     */
    std::vector<int> preorderTraversal(TreeNode* root, bool use_iterative = false);

    /**
     * @brief Performs Postorder Traversal (Left -> Right -> Root).
     *
     * Postorder traversal is useful for deleting a tree or for generating a postfix
     * expression of an expression tree.
     * Approaches:
     *   1. Recursive: Standard.
     *   2. Iterative (Two Stacks): Simpler iterative approach.
     *   3. Iterative (One Stack): More complex, but uses less memory in some scenarios.
     *
     * @param root The root of the tree.
     * @param use_iterative_two_stacks If true, use iterative approach with two stacks;
     *                                 otherwise, use recursive.
     * @return A vector of integers representing the postorder traversal.
     */
    std::vector<int> postorderTraversal(TreeNode* root, bool use_iterative_two_stacks = false);


    // --- Problem 2: Level Order Traversal (BFS) ---

    /**
     * @brief Performs Level Order Traversal (Breadth-First Search).
     *
     * Visits nodes level by level, from left to right.
     * Uses a queue for implementation.
     *
     * @param root The root of the tree.
     * @return A vector of integers representing the level order traversal.
     */
    std::vector<int> levelOrderTraversal(TreeNode* root);

    /**
     * @brief Performs Level Order Traversal, returning nodes grouped by level.
     *
     * @param root The root of the tree.
     * @return A vector of vectors, where each inner vector contains nodes at that level.
     */
    std::vector<std::vector<int>> levelOrderTraversal_LevelsSeparated(TreeNode* root);


    // --- Problem 3: Zigzag Level Order Traversal ---

    /**
     * @brief Performs Zigzag Level Order Traversal.
     *
     * Traverses the tree level by level. The first level is traversed left to right,
     * the second level right to left, the third level left to right, and so on.
     *
     * @param root The root of the tree.
     * @return A vector of vectors, where each inner vector contains nodes at that level
     *         in zigzag order.
     */
    std::vector<std::vector<int>> zigzagLevelOrder(TreeNode* root);


    // --- Problem 4: Boundary Traversal ---

    /**
     * @brief Performs Boundary Traversal of a Binary Tree.
     *
     * The boundary traversal consists of three parts:
     * 1. Left boundary (nodes from root to the leftmost leaf, excluding the leaf itself).
     * 2. All leaf nodes traversed from left to right.
     * 3. Right boundary (nodes from the rightmost leaf to the root, excluding the leaf itself, in reverse order).
     * Duplicates (e.g., if root is also a leaf, or if a left/right boundary node is also a leaf)
     * should be handled to ensure each node is added only once.
     *
     * @param root The root of the tree.
     * @return A vector of integers representing the boundary traversal.
     */
    std::vector<int> boundaryTraversal(TreeNode* root);


    // --- Problem 5: Kth Smallest Element in a BST ---

    /**
     * @brief Finds the Kth smallest element in a Binary Search Tree (BST).
     *
     * This problem leverages the property that an inorder traversal of a BST
     * visits nodes in non-decreasing order.
     * Approaches:
     *   1. Recursive Inorder: Perform inorder traversal and count.
     *   2. Iterative Inorder: Perform iterative inorder traversal and count.
     *   3. Morris Traversal (Space-optimized): Can find Kth smallest in O(N) time and O(1) space,
     *      but modifies the tree structure temporarily. (Not implemented here for brevity,
     *      but a good advanced topic).
     *   4. Augmenting Tree Structure: Add size/count to each node, allowing O(H) search.
     *      (Not implemented here for brevity, requires tree modification).
     *
     * @param root The root of the BST.
     * @param k The desired rank (1-indexed).
     * @param use_iterative If true, use iterative inorder; otherwise, use recursive.
     * @return The value of the Kth smallest element, or -1 if k is out of bounds.
     */
    int kthSmallest(TreeNode* root, int k, bool use_iterative = false);

private:
    // --- Helper methods for Problem 1: Standard DFS Traversals ---

    // Recursive Inorder
    void _inorderRecursive(TreeNode* node, std::vector<int>& result);
    // Iterative Inorder
    std::vector<int> _inorderIterative(TreeNode* root);

    // Recursive Preorder
    void _preorderRecursive(TreeNode* node, std::vector<int>& result);
    // Iterative Preorder
    std::vector<int> _preorderIterative(TreeNode* root);

    // Recursive Postorder
    void _postorderRecursive(TreeNode* node, std::vector<int>& result);
    // Iterative Postorder (using two stacks)
    std::vector<int> _postorderIterativeTwoStacks(TreeNode* root);
    // Iterative Postorder (using one stack) - More complex, but often asked
    std::vector<int> _postorderIterativeOneStack(TreeNode* root);


    // --- Helper methods for Problem 4: Boundary Traversal ---
    // Note: The root is handled separately in the main boundaryTraversal method.
    // These helpers add elements *without* considering the root, or duplicate leaves.

    // Adds left boundary nodes (from root down to leftmost non-leaf, excluding the leaf)
    void _addLeftBoundary(TreeNode* node, std::vector<int>& result);
    // Adds leaf nodes
    void _addLeaves(TreeNode* node, std::vector<int>& result);
    // Adds right boundary nodes (from rightmost non-leaf up to root, excluding the leaf, in reverse order)
    void _addRightBoundary(TreeNode* node, std::vector<int>& result);


    // --- Helper methods for Problem 5: Kth Smallest in BST ---
    // Recursive Kth Smallest
    void _kthSmallestRecursiveHelper(TreeNode* node, int& k, int& result);
    // Iterative Kth Smallest
    int _kthSmallestIterativeHelper(TreeNode* root, int k);
};

#endif // TREE_TRAVERSALS_PROBLEMS_HPP
```