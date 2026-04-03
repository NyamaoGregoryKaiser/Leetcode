#include "tree_utils.hpp"
#include <queue>
#include <iostream>
#include <iomanip> // For std::setw

// Helper function to build a binary tree from a vector (level order)
TreeNode* buildTreeFromArray(const std::vector<std::optional<int>>& values) {
    if (values.empty() || !values[0].has_value()) {
        return nullptr;
    }

    TreeNode* root = new TreeNode(values[0].value());
    std::queue<TreeNode*> q;
    q.push(root);

    size_t i = 1;
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

// Helper function to delete a binary tree to free memory
void deleteTree(TreeNode* root) {
    if (root == nullptr) {
        return;
    }
    std::queue<TreeNode*> q;
    q.push(root);

    while (!q.empty()) {
        TreeNode* current = q.front();
        q.pop();

        if (current->left) {
            q.push(current->left);
        }
        if (current->right) {
            q.push(current->right);
        }
        delete current;
    }
}

// Helper function to print tree structure (ASCII art)
// Reference: https://stackoverflow.com/questions/36802321/how-to-print-binary-tree-in-ascii-art
void printTree(TreeNode* root, const std::string& prefix, bool isLeft) {
    if (root == nullptr) {
        return;
    }

    std::cout << prefix;
    std::cout << (isLeft ? "├──" : "└──");

    // Print the value of the node
    std::cout << root->val << std::endl;

    // Enter the next tree level - left and right branch
    printTree(root->left, prefix + (isLeft ? "│   " : "    "), true);
    printTree(root->right, prefix + (isLeft ? "│   " : "    "), false);
}

// Helper function to convert a vector of integers to a string.
std::string vecToString(const std::vector<int>& vec) {
    std::ostringstream oss;
    oss << "[";
    for (size_t i = 0; i < vec.size(); ++i) {
        oss << vec[i];
        if (i < vec.size() - 1) {
            oss << ", ";
        }
    }
    oss << "]";
    return oss.str();
}

// Helper function to convert a vector of vectors of integers to a string.
std::string vecOfVecsToString(const std::vector<std::vector<int>>& vec_of_vecs) {
    std::ostringstream oss;
    oss << "[\n";
    for (size_t i = 0; i < vec_of_vecs.size(); ++i) {
        oss << "  " << vecToString(vec_of_vecs[i]);
        if (i < vec_of_vecs.size() - 1) {
            oss << ",\n";
        }
    }
    oss << "\n]";
    return oss.str();
}

// Compares two vectors of integers for equality.
bool compareVectors(const std::vector<int>& v1, const std::vector<int>& v2) {
    return v1 == v2;
}

// Compares two vectors of vectors of integers for equality.
bool compareVecOfVecs(const std::vector<std::vector<int>>& vv1, const std::vector<std::vector<int>>& vv2) {
    return vv1 == vv2;
}