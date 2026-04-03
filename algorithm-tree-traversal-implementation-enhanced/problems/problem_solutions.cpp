#include "problem_solutions.hpp"

// --- Problem 3: Zigzag Level Order Traversal ---

std::vector<std::vector<int>> zigzagLevelOrderTraversal(TreeNode* root) {
    std::vector<std::vector<int>> result;
    if (root == nullptr) {
        return result;
    }

    std::queue<TreeNode*> q;
    q.push(root);
    bool left_to_right = true; // Flag to alternate traversal direction

    while (!q.empty()) {
        int level_size = q.size();
        std::vector<int> current_level_values;

        // Process all nodes at the current level
        for (int i = 0; i < level_size; ++i) {
            TreeNode* current = q.front();
            q.pop();
            current_level_values.push_back(current->val);

            // Enqueue children for the next level (always left then right for queue)
            if (current->left) {
                q.push(current->left);
            }
            if (current->right) {
                q.push(current->right);
            }
        }

        // If direction is right-to-left, reverse the current level's values
        if (!left_to_right) {
            std::reverse(current_level_values.begin(), current_level_values.end());
        }
        result.push_back(current_level_values);

        left_to_right = !left_to_right; // Toggle direction for the next level
    }
    return result;
}


// --- Problem 4: Validate Binary Search Tree ---

// Helper function for isValidBST (recursive with range constraints)
bool isValidBST_helper(TreeNode* node, long min_val, long max_val) {
    // An empty tree is a valid BST
    if (node == nullptr) {
        return true;
    }

    // Current node's value must be within the specified (exclusive) range
    if (node->val <= min_val || node->val >= max_val) {
        return false;
    }

    // Recursively check left and right subtrees
    // For left child: update max_val to current node's value
    // For right child: update min_val to current node's value
    return isValidBST_helper(node->left, min_val, node->val) &&
           isValidBST_helper(node->right, node->val, max_val);
}

// Main function to check if a binary tree is a valid BST
bool isValidBST(TreeNode* root) {
    // Use long min/max to handle cases where node values can be INT_MIN or INT_MAX
    return isValidBST_helper(root, std::numeric_limits<long>::min(), std::numeric_limits<long>::max());
}

// Helper function for isValidBST (recursive inorder traversal check)
bool isValidBST_inorder_helper(TreeNode* node, long& prev_val) {
    if (!node) {
        return true;
    }

    // Traverse left
    if (!isValidBST_inorder_helper(node->left, prev_val)) {
        return false;
    }

    // Visit current node: check if current node's value is greater than previous
    if (node->val <= prev_val) {
        return false;
    }
    prev_val = node->val; // Update previous value

    // Traverse right
    return isValidBST_inorder_helper(node->right, prev_val);
}

// Main function to check if a binary tree is a valid BST using inorder traversal property
bool isValidBST_inorder(TreeNode* root) {
    long prev_val = std::numeric_limits<long>::min(); // Initialize with smallest possible long value
    return isValidBST_inorder_helper(root, prev_val);
}


// --- Problem 5: Serialize and Deserialize Binary Tree ---

// Serializes a binary tree into a string representation using Preorder Traversal.
std::string serialize(TreeNode* root) {
    std::ostringstream oss;
    std::function<void(TreeNode*)> preorder =
        [&](TreeNode* node) {
        if (node == nullptr) {
            oss << "#,"; // Mark null nodes
            return;
        }
        oss << node->val << ","; // Add node value
        preorder(node->left);    // Recurse left
        preorder(node->right);   // Recurse right
    };

    preorder(root);
    std::string result = oss.str();
    // Remove the trailing comma if present
    if (!result.empty() && result.back() == ',') {
        result.pop_back();
    }
    return result;
}

// Deserializes a string representation back into a binary tree.
TreeNode* deserialize(const std::string& data) {
    if (data.empty()) {
        return nullptr;
    }

    std::stringstream ss(data);
    std::string token;
    std::queue<std::string> nodes_queue; // Use a queue to easily manage tokens

    // Split the string by comma and add tokens to queue
    while (std::getline(ss, token, ',')) {
        nodes_queue.push(token);
    }

    std::function<TreeNode*()> deserialize_helper =
        [&]() -> TreeNode* {
        if (nodes_queue.empty()) {
            return nullptr; // Should not happen if data is well-formed
        }

        std::string current_val = nodes_queue.front();
        nodes_queue.pop();

        if (current_val == "#") {
            return nullptr; // Null node marker
        }

        TreeNode* node = new TreeNode(std::stoi(current_val)); // Create node
        node->left = deserialize_helper(); // Recursively build left subtree
        node->right = deserialize_helper(); // Recursively build right subtree
        return node;
    };

    return deserialize_helper();
}