```cpp
#ifndef TREE_TRAVERSALS_UTILS_HPP
#define TREE_TRAVERSALS_UTILS_HPP

#include "tree_node.hpp"
#include <vector>
#include <queue>
#include <optional> // For std::optional in tree creation
#include <iostream>

/**
 * @brief Utility functions for tree operations.
 */
namespace TreeUtils {

    /**
     * @brief Creates a binary tree from a vector representation (level order).
     * Null values are represented by std::nullopt.
     * Example: {1, 2, 3, std::nullopt, 4, 5} creates:
     *        1
     *       / \
     *      2   3
     *       \ /
     *       4 5
     *
     * @param values A vector of optional integers representing the tree in level order.
     * @return A pointer to the root of the created TreeNode.
     */
    TreeNode* createTree(const std::vector<std::optional<int>>& values) {
        if (values.empty() || !values[0].has_value()) {
            return nullptr;
        }

        TreeNode* root = new TreeNode(values[0].value());
        std::queue<TreeNode*> q;
        q.push(root);

        int i = 1;
        while (!q.empty() && i < values.size()) {
            TreeNode* current = q.front();
            q.pop();

            // Left child
            if (i < values.size() && values[i].has_value()) {
                current->left = new TreeNode(values[i].value());
                q.push(current->left);
            }
            i++;

            // Right child
            if (i < values.size() && values[i].has_value()) {
                current->right = new TreeNode(values[i].value());
                q.push(current->right);
            }
            i++;
        }
        return root;
    }

    /**
     * @brief Deletes a tree to free up memory.
     * Uses post-order traversal to ensure children are deleted before parent.
     * NOTE: If TreeNode destructor is implemented correctly (as shown in tree_node.hpp),
     * a simple `delete root` is sufficient. This function provides an alternative
     * explicit traversal for deletion.
     * @param root The root of the tree to delete.
     */
    void deleteTree(TreeNode* root) {
        // If TreeNode has a proper destructor, just `delete root;` is enough.
        // This function is for demonstrating explicit recursive deletion.
        if (root == nullptr) {
            return;
        }
        deleteTree(root->left);
        deleteTree(root->right);
        delete root; // The destructor of TreeNode will also be called here
    }


    /**
     * @brief Prints a vector of integers.
     * @param vec The vector to print.
     */
    void printVector(const std::vector<int>& vec) {
        std::cout << "[";
        for (size_t i = 0; i < vec.size(); ++i) {
            std::cout << vec[i] << (i == vec.size() - 1 ? "" : ", ");
        }
        std::cout << "]" << std::endl;
    }

    /**
     * @brief Prints a vector of vectors of integers.
     * @param vec2d The 2D vector to print.
     */
    void printVectorOfVectors(const std::vector<std::vector<int>>& vec2d) {
        std::cout << "[" << std::endl;
        for (const auto& vec : vec2d) {
            std::cout << "  ";
            printVector(vec);
        }
        std::cout << "]" << std::endl;
    }

} // namespace TreeUtils

#endif // TREE_TRAVERSALS_UTILS_HPP
```