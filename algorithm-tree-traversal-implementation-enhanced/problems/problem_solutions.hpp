#pragma once

#include "../src/tree_utils.hpp" // For TreeNode definition
#include <vector>
#include <string>
#include <queue>
#include <stack>
#include <algorithm> // For std::reverse
#include <sstream>

// --- Problem 3: Zigzag Level Order Traversal ---

/**
 * @brief Performs a Zigzag Level Order Traversal (BFS with alternating direction).
 * @param root Pointer to the root of the tree.
 * @return A vector of vectors of integers, where each inner vector represents a level,
 *         with alternating left-to-right and right-to-left order.
 * @complexity Time: O(N), Space: O(W) (W = maximum width of the tree, N = number of nodes)
 */
std::vector<std::vector<int>> zigzagLevelOrderTraversal(TreeNode* root);

// --- Problem 4: Validate Binary Search Tree ---

/**
 * @brief Helper function for isValidBST (recursive with range constraints).
 * @param node Current node being checked.
 * @param min_val The minimum allowed value for nodes in this subtree.
 * @param max_val The maximum allowed value for nodes in this subtree.
 * @return True if the subtree rooted at `node` is a valid BST within the given range, false otherwise.
 */
bool isValidBST_helper(TreeNode* node, long min_val, long max_val);

/**
 * @brief Checks if a binary tree is a valid Binary Search Tree (BST) using recursive range checks.
 * @param root Pointer to the root of the tree.
 * @return True if the tree is a valid BST, false otherwise.
 * @complexity Time: O(N), Space: O(H) (H = tree height, N = number of nodes)
 */
bool isValidBST(TreeNode* root);

/**
 * @brief Helper function for isValidBST (recursive inorder traversal check).
 * @param node Current node being checked.
 * @param prev_val Reference to the value of the previously visited node in inorder traversal.
 * @return True if the subtree rooted at `node` is a valid BST according to inorder sequence, false otherwise.
 */
bool isValidBST_inorder_helper(TreeNode* node, long& prev_val);

/**
 * @brief Checks if a binary tree is a valid Binary Search Tree (BST) using inorder traversal.
 *        The inorder traversal of a BST should yield a strictly increasing sequence.
 * @param root Pointer to the root of the tree.
 * @return True if the tree is a valid BST, false otherwise.
 * @complexity Time: O(N), Space: O(H) (H = tree height, N = number of nodes)
 */
bool isValidBST_inorder(TreeNode* root);


// --- Problem 5: Serialize and Deserialize Binary Tree ---

/**
 * @brief Serializes a binary tree into a string representation using Preorder Traversal.
 *        Null nodes are represented by "#". Values are separated by commas.
 *        Example: 1,2,#,#,3,4,#,#,#
 * @param root Pointer to the root of the tree.
 * @return A string representation of the serialized tree.
 * @complexity Time: O(N), Space: O(N) (N = number of nodes, includes string storage)
 */
std::string serialize(TreeNode* root);

/**
 * @brief Deserializes a string representation back into a binary tree.
 * @param data The serialized string.
 * @return A pointer to the root of the deserialized tree.
 * @complexity Time: O(N), Space: O(N) (N = number of nodes, includes queue/stack for parsing)
 */
TreeNode* deserialize(const std::string& data);