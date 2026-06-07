```cpp
#include "problems.hpp"

// --- Problem 1: Standard DFS Traversals ---

std::vector<int> TreeTraversalProblems::inorderTraversal(TreeNode* root, bool use_iterative) {
    if (use_iterative) {
        return _inorderIterative(root);
    } else {
        std::vector<int> result;
        _inorderRecursive(root, result);
        return result;
    }
}

void TreeTraversalProblems::_inorderRecursive(TreeNode* node, std::vector<int>& result) {
    if (node == nullptr) {
        return;
    }
    _inorderRecursive(node->left, result);  // Traverse left subtree
    result.push_back(node->val);           // Visit root
    _inorderRecursive(node->right, result); // Traverse right subtree
}

std::vector<int> TreeTraversalProblems::_inorderIterative(TreeNode* root) {
    std::vector<int> result;
    std::stack<TreeNode*> s;
    TreeNode* current = root;

    while (current != nullptr || !s.empty()) {
        // Traverse to the leftmost node, pushing all visited nodes onto the stack
        while (current != nullptr) {
            s.push(current);
            current = current->left;
        }

        // Current is now null, meaning we've reached the leftmost node of the current subtree.
        // Pop from stack, visit it, and then go to its right child.
        current = s.top();
        s.pop();
        result.push_back(current->val);

        current = current->right; // Move to the right subtree
    }
    return result;
}

std::vector<int> TreeTraversalProblems::preorderTraversal(TreeNode* root, bool use_iterative) {
    if (use_iterative) {
        return _preorderIterative(root);
    } else {
        std::vector<int> result;
        _preorderRecursive(root, result);
        return result;
    }
}

void TreeTraversalProblems::_preorderRecursive(TreeNode* node, std::vector<int>& result) {
    if (node == nullptr) {
        return;
    }
    result.push_back(node->val);            // Visit root
    _preorderRecursive(node->left, result);  // Traverse left subtree
    _preorderRecursive(node->right, result); // Traverse right subtree
}

std::vector<int> TreeTraversalProblems::_preorderIterative(TreeNode* root) {
    std::vector<int> result;
    if (root == nullptr) {
        return result;
    }

    std::stack<TreeNode*> s;
    s.push(root);

    while (!s.empty()) {
        TreeNode* current = s.top();
        s.pop();
        result.push_back(current->val);

        // Push right child first, so left child is processed first (LIFO stack)
        if (current->right != nullptr) {
            s.push(current->right);
        }
        if (current->left != nullptr) {
            s.push(current->left);
        }
    }
    return result;
}

std::vector<int> TreeTraversalProblems::postorderTraversal(TreeNode* root, bool use_iterative_two_stacks) {
    if (use_iterative_two_stacks) {
        // Alternatively, you can choose to implement _postorderIterativeOneStack(root)
        // and add a third option here, or use it as the default iterative.
        // For interview, two-stack is often easier to recall and implement quickly.
        return _postorderIterativeTwoStacks(root);
    } else {
        std::vector<int> result;
        _postorderRecursive(root, result);
        return result;
    }
}

void TreeTraversalProblems::_postorderRecursive(TreeNode* node, std::vector<int>& result) {
    if (node == nullptr) {
        return;
    }
    _postorderRecursive(node->left, result);  // Traverse left subtree
    _postorderRecursive(node->right, result); // Traverse right subtree
    result.push_back(node->val);             // Visit root
}

std::vector<int> TreeTraversalProblems::_postorderIterativeTwoStacks(TreeNode* root) {
    std::vector<int> result;
    if (root == nullptr) {
        return result;
    }

    std::stack<TreeNode*> s1; // Main stack, used like preorder but pushing right then left
    std::stack<TreeNode*> s2; // Output stack, stores nodes in correct postorder sequence

    s1.push(root);
    while (!s1.empty()) {
        TreeNode* current = s1.top();
        s1.pop();
        s2.push(current); // Push to s2

        // Push left then right to s1 (so right is popped first from s1 in next iter)
        if (current->left != nullptr) {
            s1.push(current->left);
        }
        if (current->right != nullptr) {
            s1.push(current->right);
        }
    }

    // Pop all elements from s2 to get the postorder traversal
    while (!s2.empty()) {
        result.push_back(s2.top()->val);
        s2.pop();
    }
    return result;
}

std::vector<int> TreeTraversalProblems::_postorderIterativeOneStack(TreeNode* root) {
    std::vector<int> result;
    if (root == nullptr) {
        return result;
    }

    std::stack<TreeNode*> s;
    TreeNode* current = root;
    TreeNode* last_visited = nullptr; // To track the last node added to result

    while (current != nullptr || !s.empty()) {
        // Traverse to the leftmost node
        if (current != nullptr) {
            s.push(current);
            current = current->left;
        } else {
            // Check top of stack
            TreeNode* peek_node = s.top();

            // If right child exists and has not been visited yet, go to right subtree
            if (peek_node->right != nullptr && peek_node->right != last_visited) {
                current = peek_node->right;
            } else {
                // Otherwise, both left and right (or no children) have been processed,
                // so visit the current node.
                result.push_back(peek_node->val);
                last_visited = peek_node;
                s.pop();
            }
        }
    }
    return result;
}

// --- Problem 2: Level Order Traversal ---

std::vector<int> TreeTraversalProblems::levelOrderTraversal(TreeNode* root) {
    std::vector<int> result;
    if (root == nullptr) {
        return result;
    }

    std::queue<TreeNode*> q;
    q.push(root);

    while (!q.empty()) {
        TreeNode* current = q.front();
        q.pop();
        result.push_back(current->val);

        if (current->left != nullptr) {
            q.push(current->left);
        }
        if (current->right != nullptr) {
            q.push(current->right);
        }
    }
    return result;
}

std::vector<std::vector<int>> TreeTraversalProblems::levelOrderTraversal_LevelsSeparated(TreeNode* root) {
    std::vector<std::vector<int>> result;
    if (root == nullptr) {
        return result;
    }

    std::queue<TreeNode*> q;
    q.push(root);

    while (!q.empty()) {
        int level_size = q.size(); // Number of nodes at the current level
        std::vector<int> current_level_nodes;

        for (int i = 0; i < level_size; ++i) {
            TreeNode* current = q.front();
            q.pop();
            current_level_nodes.push_back(current->val);

            if (current->left != nullptr) {
                q.push(current->left);
            }
            if (current->right != nullptr) {
                q.push(current->right);
            }
        }
        result.push_back(current_level_nodes);
    }
    return result;
}


// --- Problem 3: Zigzag Level Order Traversal ---

std::vector<std::vector<int>> TreeTraversalProblems::zigzagLevelOrder(TreeNode* root) {
    std::vector<std::vector<int>> result;
    if (root == nullptr) {
        return result;
    }

    std::deque<TreeNode*> q; // Using deque for efficient push_front/push_back
    q.push_back(root);
    bool left_to_right = true; // Flag to alternate traversal direction

    while (!q.empty()) {
        int level_size = q.size();
        std::vector<int> current_level_nodes;

        for (int i = 0; i < level_size; ++i) {
            TreeNode* node;
            if (left_to_right) {
                node = q.front();
                q.pop_front();
                current_level_nodes.push_back(node->val);
            } else {
                node = q.back();
                q.pop_back();
                current_level_nodes.push_back(node->val);
            }

            // Enqueue children for the *next* level in normal order,
            // direction of next level determines how we dequeue.
            // If the current level is LTR, next level will be RTL.
            // So, for RTL next level, we add children to front of deque.
            // If the current level is RTL, next level will be LTR.
            // So, for LTR next level, we add children to back of deque.
            // For standard queue implementation, we always enqueue children in L-R order,
            // then reverse the current_level_nodes vector if direction is RTL.
            // Let's use the more common and simpler approach with a standard queue and reverse.

            // Re-implementing with standard queue and reversing vector for clarity:
            // This is a common pattern for zigzag.
        }

        // Standard Queue + Reverse approach (easier to understand)
        // Re-initialize for this approach:
        // Result is cleared so we can demonstrate this approach.
        // In a real scenario, you'd choose one.
    }

    // --- Rerun with the standard queue and reverse logic ---
    result.clear(); // Clear previous attempt's result
    std::queue<TreeNode*> std_q;
    std_q.push(root);
    left_to_right = true;

    while (!std_q.empty()) {
        int level_size = std_q.size();
        std::vector<int> current_level_nodes;

        for (int i = 0; i < level_size; ++i) {
            TreeNode* current = std_q.front();
            std_q.pop();
            current_level_nodes.push_back(current->val);

            if (current->left != nullptr) {
                std_q.push(current->left);
            }
            if (current->right != nullptr) {
                std_q.push(current->right);
            }
        }

        if (!left_to_right) {
            std::reverse(current_level_nodes.begin(), current_level_nodes.end());
        }
        result.push_back(current_level_nodes);
        left_to_right = !left_to_right; // Toggle direction for next level
    }
    return result;
}


// --- Problem 4: Boundary Traversal ---

std::vector<int> TreeTraversalProblems::boundaryTraversal(TreeNode* root) {
    std::vector<int> result;
    if (root == nullptr) {
        return result;
    }

    // Add root (if not a leaf, it will be added as part of left boundary or just the root)
    result.push_back(root->val);

    // If root is a leaf, then just root is the answer.
    // Otherwise, its children (if any) will start the left/right boundaries or leaves.
    // This check prevents adding root value twice if it's the only node.
    if (root->left == nullptr && root->right == nullptr) {
        return result;
    }

    // Add left boundary (excluding root and leftmost leaf)
    _addLeftBoundary(root->left, result);

    // Add leaves
    // If root has children, its leaves are distinct from root itself
    // We start searching for leaves from left and right children
    _addLeaves(root->left, result);
    _addLeaves(root->right, result);

    // Add right boundary (excluding root and rightmost leaf)
    std::vector<int> right_boundary_nodes;
    _addRightBoundary(root->right, right_boundary_nodes);
    // Right boundary nodes are collected from bottom to top, so reverse them
    std::reverse(right_boundary_nodes.begin(), right_boundary_nodes.end());
    result.insert(result.end(), right_boundary_nodes.begin(), right_boundary_nodes.end());

    return result;
}

void TreeTraversalProblems::_addLeftBoundary(TreeNode* node, std::vector<int>& result) {
    if (node == nullptr || (node->left == nullptr && node->right == nullptr)) {
        // Stop if null or a leaf node (leaves are handled by _addLeaves)
        return;
    }
    result.push_back(node->val);
    if (node->left != nullptr) {
        _addLeftBoundary(node->left, result);
    } else {
        _addLeftBoundary(node->right, result); // If no left child, move to right child
    }
}

void TreeTraversalProblems::_addLeaves(TreeNode* node, std::vector<int>& result) {
    if (node == nullptr) {
        return;
    }
    if (node->left == nullptr && node->right == nullptr) {
        result.push_back(node->val);
        return;
    }
    _addLeaves(node->left, result);
    _addLeaves(node->right, result);
}

void TreeTraversalProblems::_addRightBoundary(TreeNode* node, std::vector<int>& result) {
    if (node == nullptr || (node->left == nullptr && node->right == nullptr)) {
        // Stop if null or a leaf node (leaves are handled by _addLeaves)
        return;
    }
    // Traverse right
    if (node->right != nullptr) {
        _addRightBoundary(node->right, result);
    } else {
        _addRightBoundary(node->left, result); // If no right child, move to left child
    }
    // Add node value after recursive call to get bottom-up order (before reversing)
    result.push_back(node->val);
}


// --- Problem 5: Kth Smallest Element in a BST ---

int TreeTraversalProblems::kthSmallest(TreeNode* root, int k, bool use_iterative) {
    if (k <= 0) return -1; // k must be positive

    if (use_iterative) {
        return _kthSmallestIterativeHelper(root, k);
    } else {
        int count = 0;
        int result_val = -1; // Default to -1 if k is out of bounds
        // The recursive helper needs to modify count and result_val across calls
        // so we pass them by reference.
        int current_k = k; // Use a copy of k for the recursive helper to decrement
        _kthSmallestRecursiveHelper(root, current_k, result_val);
        return result_val;
    }
}

void TreeTraversalProblems::_kthSmallestRecursiveHelper(TreeNode* node, int& k, int& result) {
    if (node == nullptr || k == 0) { // Optimization: if k becomes 0, we found it.
        return;
    }

    _kthSmallestRecursiveHelper(node->left, k, result);

    if (k > 0) { // Only process if k is still positive (i.e., not found yet)
        k--; // Decrement k for the current node
        if (k == 0) {
            result = node->val; // Found the Kth smallest
            return; // Stop further recursion as soon as found
        }
    }

    _kthSmallestRecursiveHelper(node->right, k, result);
}

int TreeTraversalProblems::_kthSmallestIterativeHelper(TreeNode* root, int k) {
    std::stack<TreeNode*> s;
    TreeNode* current = root;

    while (current != nullptr || !s.empty()) {
        while (current != nullptr) {
            s.push(current);
            current = current->left;
        }

        current = s.top();
        s.pop();

        k--; // Decrement k for the current node (inorder visit)
        if (k == 0) {
            return current->val; // Found the Kth smallest
        }

        current = current->right; // Move to the right subtree
    }
    return -1; // k is out of bounds (tree has fewer than k nodes)
}
```