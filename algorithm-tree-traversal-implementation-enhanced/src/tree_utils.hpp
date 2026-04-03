#pragma once

#include <vector>
#include <string>
#include <queue>
#include <iostream>
#include <sstream>
#include <optional>
#include <limits> // For numeric_limits

// Definition for a binary tree node.
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

// --- Tree Utility Functions ---

/**
 * @brief Builds a binary tree from a vector of optional integers (level order traversal).
 *        `std::nullopt` represents a null node.
 * @param values A vector representing the tree in level order.
 *               E.g., {1, 2, 3, std::nullopt, 4} creates:
 *                     1
 *                    / \
 *                   2   3
 *                        \
 *                         4
 * @return A pointer to the root of the constructed tree.
 */
TreeNode* buildTreeFromArray(const std::vector<std::optional<int>>& values);

/**
 * @brief Deletes a binary tree to free memory.
 * @param root Pointer to the root of the tree to delete.
 */
void deleteTree(TreeNode* root);

/**
 * @brief Prints the binary tree structure using ASCII art.
 * @param root Pointer to the root of the tree.
 * @param prefix String prefix for current node.
 * @param isLeft True if the current node is a left child.
 */
void printTree(TreeNode* root, const std::string& prefix = "", bool isLeft = false);

/**
 * @brief Helper function to convert a vector of integers to a string.
 * @param vec The vector of integers.
 * @return A string representation of the vector.
 */
std::string vecToString(const std::vector<int>& vec);

/**
 * @brief Helper function to convert a vector of vectors of integers to a string.
 * @param vec_of_vecs The vector of vectors of integers.
 * @return A string representation of the vector of vectors.
 */
std::string vecOfVecsToString(const std::vector<std::vector<int>>& vec_of_vecs);

/**
 * @brief Compares two vectors of integers for equality.
 * @param v1 First vector.
 * @param v2 Second vector.
 * @return True if vectors are equal, false otherwise.
 */
bool compareVectors(const std::vector<int>& v1, const std::vector<int>& v2);

/**
 * @brief Compares two vectors of vectors of integers for equality.
 * @param vv1 First vector of vectors.
 * @param vv2 Second vector of vectors.
 * @return True if vectors of vectors are equal, false otherwise.
 */
bool compareVecOfVecs(const std::vector<std::vector<int>>& vv1, const std::vector<std::vector<int>>& vv2);