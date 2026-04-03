#pragma once

#include "tree_utils.hpp" // For TreeNode definition
#include <vector>
#include <stack>
#include <queue>
#include <algorithm> // For std::reverse

// --- Basic DFS Traversals ---

/**
 * @brief Performs a Preorder Traversal (Root, Left, Right) recursively.
 * @param root Pointer to the root of the tree.
 * @return A vector of integers representing the preorder traversal.
 * @complexity Time: O(N), Space: O(H) (H = tree height, N = number of nodes)
 */
std::vector<int> preorderTraversal_recursive(TreeNode* root);

/**
 * @brief Performs a Preorder Traversal (Root, Left, Right) iteratively using a stack.
 * @param root Pointer to the root of the tree.
 * @return A vector of integers representing the preorder traversal.
 * @complexity Time: O(N), Space: O(H) (H = tree height, N = number of nodes)
 */
std::vector<int> preorderTraversal_iterative(TreeNode* root);

/**
 * @brief Performs an Inorder Traversal (Left, Root, Right) recursively.
 * @param root Pointer to the root of the tree.
 * @return A vector of integers representing the inorder traversal.
 * @complexity Time: O(N), Space: O(H) (H = tree height, N = number of nodes)
 */
std::vector<int> inorderTraversal_recursive(TreeNode* root);

/**
 * @brief Performs an Inorder Traversal (Left, Root, Right) iteratively using a stack.
 * @param root Pointer to the root of the tree.
 * @return A vector of integers representing the inorder traversal.
 * @complexity Time: O(N), Space: O(H) (H = tree height, N = number of nodes)
 */
std::vector<int> inorderTraversal_iterative(TreeNode* root);

/**
 * @brief Performs a Postorder Traversal (Left, Right, Root) recursively.
 * @param root Pointer to the root of the tree.
 * @return A vector of integers representing the postorder traversal.
 * @complexity Time: O(N), Space: O(H) (H = tree height, N = number of nodes)
 */
std::vector<int> postorderTraversal_recursive(TreeNode* root);

/**
 * @brief Performs a Postorder Traversal (Left, Right, Root) iteratively using two stacks.
 * @param root Pointer to the root of the tree.
 * @return A vector of integers representing the postorder traversal.
 * @complexity Time: O(N), Space: O(N) (N = number of nodes, due to two stacks potentially holding N nodes)
 */
std::vector<int> postorderTraversal_iterative(TreeNode* root);

// --- Basic BFS Traversal ---

/**
 * @brief Performs a Level Order Traversal (BFS) using a queue.
 * @param root Pointer to the root of the tree.
 * @return A vector of vectors of integers, where each inner vector represents a level.
 * @complexity Time: O(N), Space: O(W) (W = maximum width of the tree, N = number of nodes)
 */
std::vector<std::vector<int>> levelOrderTraversal(TreeNode* root);