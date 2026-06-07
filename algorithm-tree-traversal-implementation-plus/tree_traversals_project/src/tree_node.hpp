```cpp
#ifndef TREE_TRAVERSALS_TREE_NODE_HPP
#define TREE_TRAVERSALS_TREE_NODE_HPP

#include <vector>
#include <iostream>
#include <memory> // For std::shared_ptr or std::unique_ptr if desired

/**
 * @brief Definition for a binary tree node.
 * Uses raw pointers for simplicity, common in interview settings.
 * Consider std::unique_ptr or std::shared_ptr for production code
 * to manage memory automatically.
 */
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;

    // Default constructor
    TreeNode() : val(0), left(nullptr), right(nullptr) {}

    // Constructor with value
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}

    // Constructor with value and children
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}

    // Destructor to deallocate memory for children
    // This assumes ownership of children. Be careful with shared nodes.
    // For general interview problems where trees are built dynamically and
    // then processed, manual deletion or smart pointers are necessary.
    // For simple test cases where trees are constructed once and then
    // the program exits, explicit deletion might be omitted for brevity
    // but is crucial for good practice.
    ~TreeNode() {
        delete left;
        delete right;
        left = nullptr;
        right = nullptr;
    }

    // Helper function to print a single node's value (useful for debugging)
    void print() const {
        std::cout << val << " ";
    }
};

#endif // TREE_TRAVERSALS_TREE_NODE_HPP
```