#include <iostream>
#include <vector>
#include <chrono>
#include <random>
#include <algorithm> // For std::shuffle

#include "../src/tree_utils.hpp"
#include "../src/tree_traversals.hpp"
#include "../problems/problem_solutions.hpp"

// Utility to measure time
template <typename Func>
long long measure_time_ms(Func func) {
    auto start = std::chrono::high_resolution_clock::now();
    func();
    auto end = std::chrono::high_resolution_clock::now();
    return std::chrono::duration_cast<std::chrono::milliseconds>(end - start).count();
}

// Function to generate a perfectly balanced binary tree
TreeNode* generateBalancedTree(int depth) {
    if (depth == 0) return nullptr;
    TreeNode* root = new TreeNode(0); // Value doesn't matter for structure
    root->left = generateBalancedTree(depth - 1);
    root->right = generateBalancedTree(depth - 1);
    return root;
}

// Function to generate a skewed binary tree (right-skewed)
TreeNode* generateSkewedTree(int num_nodes) {
    if (num_nodes == 0) return nullptr;
    TreeNode* root = new TreeNode(0);
    TreeNode* current = root;
    for (int i = 1; i < num_nodes; ++i) {
        current->right = new TreeNode(i);
        current = current->right;
    }
    return root;
}

// Helper to calculate tree depth from node count for balanced tree
int log2_floor(int n) {
    int depth = 0;
    while ((1 << (depth + 1)) - 1 <= n) {
        depth++;
    }
    return depth;
}

// Benchmarking functions
void benchmark_traversals(int num_nodes, bool is_skewed) {
    std::cout << "Benchmarking with " << num_nodes << " nodes (" << (is_skewed ? "skewed" : "balanced") << ")..." << std::endl;

    TreeNode* root;
    if (is_skewed) {
        root = generateSkewedTree(num_nodes);
    } else {
        int depth = log2_floor(num_nodes);
        root = generateBalancedTree(depth);
        // Fill remaining nodes to reach num_nodes if not a perfect power of 2 - 1
        // For simplicity, just use a complete tree from array for balanced.
        // A direct build from array is more robust for a specific count.
        std::vector<std::optional<int>> values(num_nodes);
        for(int i=0; i<num_nodes; ++i) values[i] = i;
        root = buildTreeFromArray(values);
    }
    

    std::vector<int> dummy_result;
    std::vector<std::vector<int>> dummy_vec_of_vec_result;
    std::string dummy_str_result;
    TreeNode* dummy_tree_result;

    long long time_recursive_pre = measure_time_ms([&]() { dummy_result = preorderTraversal_recursive(root); });
    std::cout << "  Preorder Recursive:   " << time_recursive_pre << " ms" << std::endl;

    long long time_iterative_pre = measure_time_ms([&]() { dummy_result = preorderTraversal_iterative(root); });
    std::cout << "  Preorder Iterative:   " << time_iterative_pre << " ms" << std::endl;

    long long time_recursive_in = measure_time_ms([&]() { dummy_result = inorderTraversal_recursive(root); });
    std::cout << "  Inorder Recursive:    " << time_recursive_in << " ms" << std::endl;

    long long time_iterative_in = measure_time_ms([&]() { dummy_result = inorderTraversal_iterative(root); });
    std::cout << "  Inorder Iterative:    " << time_iterative_in << " ms" << std::endl;

    long long time_recursive_post = measure_time_ms([&]() { dummy_result = postorderTraversal_recursive(root); });
    std::cout << "  Postorder Recursive:  " << time_recursive_post << " ms" << std::endl;

    long long time_iterative_post = measure_time_ms([&]() { dummy_result = postorderTraversal_iterative(root); });
    std::cout << "  Postorder Iterative:  " << time_iterative_post << " ms" << std::endl;

    long long time_level_order = measure_time_ms([&]() { dummy_vec_of_vec_result = levelOrderTraversal(root); });
    std::cout << "  Level Order (BFS):    " << time_level_order << " ms" << std::endl;

    long long time_zigzag_level_order = measure_time_ms([&]() { dummy_vec_of_vec_result = zigzagLevelOrderTraversal(root); });
    std::cout << "  Zigzag Level Order:   " << time_zigzag_level_order << " ms" << std::endl;

    // For BST validation, we need a valid BST.
    // For skewed trees, values 0, 1, 2... automatically form a valid BST.
    // For balanced trees, we build it explicitly.
    TreeNode* bst_root;
    if (is_skewed) {
        bst_root = generateSkewedTree(num_nodes); // Already a BST
    } else {
        std::vector<std::optional<int>> bst_values(num_nodes);
        std::iota(bst_values.begin(), bst_values.end(), 0); // 0, 1, 2...
        std::random_device rd;
        std::mt19937 g(rd());
        // For a general balanced tree, building a BST is more involved.
        // For benchmarking purposes, we'll just build a complete tree and use it,
        // noting it might not be a *perfectly balanced BST*, but rather a balanced *binary tree*.
        // The isValidBST check still works.
        std::vector<std::optional<int>> balanced_bst_vals(num_nodes);
        std::vector<int> temp_sorted_vals(num_nodes);
        std::iota(temp_sorted_vals.begin(), temp_sorted_vals.end(), 0);
        // Simple way to build a somewhat balanced BST for specific numbers:
        std::function<TreeNode*(int, int)> build_bst_from_sorted =
            [&](int start, int end) -> TreeNode* {
            if (start > end) return nullptr;
            int mid = start + (end - start) / 2;
            TreeNode* node = new TreeNode(temp_sorted_vals[mid]);
            node->left = build_bst_from_sorted(start, mid - 1);
            node->right = build_bst_from_sorted(mid + 1, end);
            return node;
        };
        bst_root = build_bst_from_sorted(0, num_nodes - 1);
    }
    
    long long time_is_valid_bst = measure_time_ms([&]() { isValidBST(bst_root); });
    std::cout << "  Validate BST (Range): " << time_is_valid_bst << " ms" << std::endl;

    long long time_is_valid_bst_inorder = measure_time_ms([&]() { isValidBST_inorder(bst_root); });
    std::cout << "  Validate BST (Inorder): " << time_is_valid_bst_inorder << " ms" << std::endl;
    deleteTree(bst_root);


    long long time_serialize = measure_time_ms([&]() { dummy_str_result = serialize(root); });
    std::cout << "  Serialize:            " << time_serialize << " ms" << std::endl;

    // Deserialization from the previously serialized string
    // This requires `root` to be a correct serialized string.
    // If serialize takes 0ms for small trees, dummy_str_result might be empty.
    // Ensure `dummy_str_result` is correctly populated.
    std::string serialized_data = serialize(root); 
    long long time_deserialize = measure_time_ms([&]() { dummy_tree_result = deserialize(serialized_data); });
    std::cout << "  Deserialize:          " << time_deserialize << " ms" << std::endl;
    deleteTree(dummy_tree_result); // Clean up deserialized tree


    deleteTree(root);
    std::cout << std::endl;
}

int main() {
    std::cout << "--- Performance Benchmarks ---" << std::endl;

    // Node counts to test
    std::vector<int> node_counts = {10000, 100000, 500000}; // Increased up to 500k nodes

    for (int count : node_counts) {
        benchmark_traversals(count, false); // Balanced trees
        // For skewed trees, avoid very large N for recursive versions due to potential stack overflow.
        // Or compile with larger stack size.
        if (count <= 100000) { // Limit skewed tree size for recursion safety
            benchmark_traversals(count, true);  // Skewed trees
        } else {
             std::cout << "Skipping skewed tree benchmark for " << count << " nodes to prevent stack overflow on default settings." << std::endl << std::endl;
        }
    }

    std::cout << "--- Benchmarks Complete ---" << std::endl;
    return 0;
}