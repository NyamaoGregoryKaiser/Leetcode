#include "tree_traversals.hpp"

// --- Preorder Traversal (Root, Left, Right) ---

// Recursive Preorder Traversal Helper
static void preorder_recursive_helper(TreeNode* node, std::vector<int>& result) {
    if (node == nullptr) {
        return;
    }
    result.push_back(node->val);        // Visit root
    preorder_recursive_helper(node->left, result);  // Traverse left
    preorder_recursive_helper(node->right, result); // Traverse right
}

// Recursive Preorder Traversal
std::vector<int> preorderTraversal_recursive(TreeNode* root) {
    std::vector<int> result;
    preorder_recursive_helper(root, result);
    return result;
}

// Iterative Preorder Traversal
std::vector<int> preorderTraversal_iterative(TreeNode* root) {
    std::vector<int> result;
    if (root == nullptr) {
        return result;
    }

    std::stack<TreeNode*> s;
    s.push(root); // Start with the root

    while (!s.empty()) {
        TreeNode* current = s.top(); // Get the top node
        s.pop();

        result.push_back(current->val); // Visit the current node

        // Push right child first, so left child is processed before right (LIFO)
        if (current->right) {
            s.push(current->right);
        }
        if (current->left) {
            s.push(current->left);
        }
    }
    return result;
}

// --- Inorder Traversal (Left, Root, Right) ---

// Recursive Inorder Traversal Helper
static void inorder_recursive_helper(TreeNode* node, std::vector<int>& result) {
    if (node == nullptr) {
        return;
    }
    inorder_recursive_helper(node->left, result);   // Traverse left
    result.push_back(node->val);         // Visit root
    inorder_recursive_helper(node->right, result);  // Traverse right
}

// Recursive Inorder Traversal
std::vector<int> inorderTraversal_recursive(TreeNode* root) {
    std::vector<int> result;
    inorder_recursive_helper(root, result);
    return result;
}

// Iterative Inorder Traversal
std::vector<int> inorderTraversal_iterative(TreeNode* root) {
    std::vector<int> result;
    std::stack<TreeNode*> s;
    TreeNode* current = root; // Start from the root

    while (current != nullptr || !s.empty()) {
        // Traverse left subtree, pushing all nodes onto stack
        while (current != nullptr) {
            s.push(current);
            current = current->left;
        }

        // Current is null, meaning we've reached the leftmost node (or a null child)
        current = s.top(); // Pop the top node (the leftmost unvisited node)
        s.pop();

        result.push_back(current->val); // Visit it

        current = current->right; // Move to the right subtree
    }
    return result;
}

// --- Postorder Traversal (Left, Right, Root) ---

// Recursive Postorder Traversal Helper
static void postorder_recursive_helper(TreeNode* node, std::vector<int>& result) {
    if (node == nullptr) {
        return;
    }
    postorder_recursive_helper(node->left, result);  // Traverse left
    postorder_recursive_helper(node->right, result); // Traverse right
    result.push_back(node->val);       // Visit root
}

// Recursive Postorder Traversal
std::vector<int> postorderTraversal_recursive(TreeNode* root) {
    std::vector<int> result;
    postorder_recursive_helper(root, result);
    return result;
}

// Iterative Postorder Traversal (using two stacks)
std::vector<int> postorderTraversal_iterative(TreeNode* root) {
    std::vector<int> result;
    if (root == nullptr) {
        return result;
    }

    std::stack<TreeNode*> s1; // Main stack for traversal
    std::stack<TreeNode*> s2; // Stack to store postorder sequence

    s1.push(root);

    while (!s1.empty()) {
        TreeNode* current = s1.top(); // Pop from s1
        s1.pop();
        s2.push(current);             // Push to s2

        // Push left and then right child to s1
        // This ensures right child is processed before left in s1's next iteration (LIFO)
        // Which means when pushed to s2, left child will be on top of right child,
        // so when s2 is popped, it's Left -> Right -> Root
        if (current->left) {
            s1.push(current->left);
        }
        if (current->right) {
            s1.push(current->right);
        }
    }

    // Pop all elements from s2 to get the postorder sequence
    while (!s2.empty()) {
        result.push_back(s2.top()->val);
        s2.pop();
    }
    return result;
}

// --- Level Order Traversal (BFS) ---

std::vector<std::vector<int>> levelOrderTraversal(TreeNode* root) {
    std::vector<std::vector<int>> result;
    if (root == nullptr) {
        return result;
    }

    std::queue<TreeNode*> q;
    q.push(root);

    while (!q.empty()) {
        int level_size = q.size(); // Number of nodes at current level
        std::vector<int> current_level_values;

        for (int i = 0; i < level_size; ++i) {
            TreeNode* current = q.front();
            q.pop();

            current_level_values.push_back(current->val); // Visit node

            // Enqueue children for the next level
            if (current->left) {
                q.push(current->left);
            }
            if (current->right) {
                q.push(current->right);
            }
        }
        result.push_back(current_level_values); // Add current level's values to result
    }
    return result;
}