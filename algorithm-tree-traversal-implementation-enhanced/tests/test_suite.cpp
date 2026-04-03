#include <iostream>
#include <vector>
#include <string>
#include <cassert>
#include <functional>
#include <algorithm> // For std::is_permutation

#include "../src/tree_utils.hpp"
#include "../src/tree_traversals.hpp"
#include "../problems/problem_solutions.hpp"

// Simple testing framework
int g_tests_run = 0;
int g_tests_passed = 0;

#define TEST_CASE(name) \
    void name() { \
        g_tests_run++; \
        std::cout << "Running " << #name << "..." << std::endl;

#define END_TEST_CASE \
        g_tests_passed++; \
        std::cout << "  PASSED" << std::endl; \
    }

#define ASSERT_EQ_VEC(actual, expected, msg) \
    if (!compareVectors(actual, expected)) { \
        std::cerr << "  FAILED: " << msg << std::endl; \
        std::cerr << "    Expected: " << vecToString(expected) << std::endl; \
        std::cerr << "    Actual:   " << vecToString(actual) << std::endl; \
        return; \
    }

#define ASSERT_EQ_VEC_VEC(actual, expected, msg) \
    if (!compareVecOfVecs(actual, expected)) { \
        std::cerr << "  FAILED: " << msg << std::endl; \
        std::cerr << "    Expected:\n" << vecOfVecsToString(expected) << std::endl; \
        std::cerr << "    Actual:  \n" << vecOfVecsToString(actual) << std::endl; \
        return; \
    }

#define ASSERT_TRUE(condition, msg) \
    if (!(condition)) { \
        std::cerr << "  FAILED: " << msg << std::endl; \
        return; \
    }

#define ASSERT_FALSE(condition, msg) \
    if (condition) { \
        std::cerr << "  FAILED: " << msg << std::endl; \
        return; \
    }

#define ASSERT_EQ_STR(actual, expected, msg) \
    if (actual != expected) { \
        std::cerr << "  FAILED: " << msg << std::endl; \
        std::cerr << "    Expected: \"" << expected << "\"" << std::endl; \
        std::cerr << "    Actual:   \"" << actual << "\"" << std::endl; \
        return; \
    }


// --- Test Cases for Basic Traversals (Problem 1 & 2) ---

TEST_CASE(test_preorder_traversal)
    // Tree:      1
    //           / \
    //          2   3
    //         / \
    //        4   5
    TreeNode* root = buildTreeFromArray({1, 2, 3, 4, 5, std::nullopt, std::nullopt});
    std::vector<int> expected = {1, 2, 4, 5, 3};

    ASSERT_EQ_VEC(preorderTraversal_recursive(root), expected, "Recursive preorder failed for standard tree");
    ASSERT_EQ_VEC(preorderTraversal_iterative(root), expected, "Iterative preorder failed for standard tree");
    deleteTree(root);

    // Empty tree
    root = buildTreeFromArray({});
    expected = {};
    ASSERT_EQ_VEC(preorderTraversal_recursive(root), expected, "Recursive preorder failed for empty tree");
    ASSERT_EQ_VEC(preorderTraversal_iterative(root), expected, "Iterative preorder failed for empty tree");
    deleteTree(root);

    // Single node tree
    root = buildTreeFromArray({10});
    expected = {10};
    ASSERT_EQ_VEC(preorderTraversal_recursive(root), expected, "Recursive preorder failed for single node tree");
    ASSERT_EQ_VEC(preorderTraversal_iterative(root), expected, "Iterative preorder failed for single node tree");
    deleteTree(root);

    // Skewed left tree
    //   1
    //  /
    // 2
    // /
    // 3
    root = buildTreeFromArray({1, 2, std::nullopt, 3});
    expected = {1, 2, 3};
    ASSERT_EQ_VEC(preorderTraversal_recursive(root), expected, "Recursive preorder failed for left-skewed tree");
    ASSERT_EQ_VEC(preorderTraversal_iterative(root), expected, "Iterative preorder failed for left-skewed tree");
    deleteTree(root);

    // Skewed right tree
    // 1
    //  \
    //   2
    //    \
    //     3
    root = buildTreeFromArray({1, std::nullopt, 2, std::nullopt, std::nullopt, std::nullopt, 3});
    expected = {1, 2, 3};
    ASSERT_EQ_VEC(preorderTraversal_recursive(root), expected, "Recursive preorder failed for right-skewed tree");
    ASSERT_EQ_VEC(preorderTraversal_iterative(root), expected, "Iterative preorder failed for right-skewed tree");
    deleteTree(root);

END_TEST_CASE

TEST_CASE(test_inorder_traversal)
    // Tree:      1
    //           / \
    //          2   3
    //         / \
    //        4   5
    TreeNode* root = buildTreeFromArray({1, 2, 3, 4, 5, std::nullopt, std::nullopt});
    std::vector<int> expected = {4, 2, 5, 1, 3};

    ASSERT_EQ_VEC(inorderTraversal_recursive(root), expected, "Recursive inorder failed for standard tree");
    ASSERT_EQ_VEC(inorderTraversal_iterative(root), expected, "Iterative inorder failed for standard tree");
    deleteTree(root);

    // Empty tree
    root = buildTreeFromArray({});
    expected = {};
    ASSERT_EQ_VEC(inorderTraversal_recursive(root), expected, "Recursive inorder failed for empty tree");
    ASSERT_EQ_VEC(inorderTraversal_iterative(root), expected, "Iterative inorder failed for empty tree");
    deleteTree(root);

    // Single node tree
    root = buildTreeFromArray({10});
    expected = {10};
    ASSERT_EQ_VEC(inorderTraversal_recursive(root), expected, "Recursive inorder failed for single node tree");
    ASSERT_EQ_VEC(inorderTraversal_iterative(root), expected, "Iterative inorder failed for single node tree");
    deleteTree(root);

    // Skewed left tree
    //   1
    //  /
    // 2
    // /
    // 3
    root = buildTreeFromArray({1, 2, std::nullopt, 3});
    expected = {3, 2, 1};
    ASSERT_EQ_VEC(inorderTraversal_recursive(root), expected, "Recursive inorder failed for left-skewed tree");
    ASSERT_EQ_VEC(inorderTraversal_iterative(root), expected, "Iterative inorder failed for left-skewed tree");
    deleteTree(root);

    // Skewed right tree
    // 1
    //  \
    //   2
    //    \
    //     3
    root = buildTreeFromArray({1, std::nullopt, 2, std::nullopt, std::nullopt, std::nullopt, 3});
    expected = {1, 2, 3};
    ASSERT_EQ_VEC(inorderTraversal_recursive(root), expected, "Recursive inorder failed for right-skewed tree");
    ASSERT_EQ_VEC(inorderTraversal_iterative(root), expected, "Iterative inorder failed for right-skewed tree");
    deleteTree(root);

END_TEST_CASE

TEST_CASE(test_postorder_traversal)
    // Tree:      1
    //           / \
    //          2   3
    //         / \
    //        4   5
    TreeNode* root = buildTreeFromArray({1, 2, 3, 4, 5, std::nullopt, std::nullopt});
    std::vector<int> expected = {4, 5, 2, 3, 1};

    ASSERT_EQ_VEC(postorderTraversal_recursive(root), expected, "Recursive postorder failed for standard tree");
    ASSERT_EQ_VEC(postorderTraversal_iterative(root), expected, "Iterative postorder failed for standard tree");
    deleteTree(root);

    // Empty tree
    root = buildTreeFromArray({});
    expected = {};
    ASSERT_EQ_VEC(postorderTraversal_recursive(root), expected, "Recursive postorder failed for empty tree");
    ASSERT_EQ_VEC(postorderTraversal_iterative(root), expected, "Iterative postorder failed for empty tree");
    deleteTree(root);

    // Single node tree
    root = buildTreeFromArray({10});
    expected = {10};
    ASSERT_EQ_VEC(postorderTraversal_recursive(root), expected, "Recursive postorder failed for single node tree");
    ASSERT_EQ_VEC(postorderTraversal_iterative(root), expected, "Iterative postorder failed for single node tree");
    deleteTree(root);

    // Skewed left tree
    //   1
    //  /
    // 2
    // /
    // 3
    root = buildTreeFromArray({1, 2, std::nullopt, 3});
    expected = {3, 2, 1};
    ASSERT_EQ_VEC(postorderTraversal_recursive(root), expected, "Recursive postorder failed for left-skewed tree");
    ASSERT_EQ_VEC(postorderTraversal_iterative(root), expected, "Iterative postorder failed for left-skewed tree");
    deleteTree(root);

    // Skewed right tree
    // 1
    //  \
    //   2
    //    \
    //     3
    root = buildTreeFromArray({1, std::nullopt, 2, std::nullopt, std::nullopt, std::nullopt, 3});
    expected = {3, 2, 1};
    ASSERT_EQ_VEC(postorderTraversal_recursive(root), expected, "Recursive postorder failed for right-skewed tree");
    ASSERT_EQ_VEC(postorderTraversal_iterative(root), expected, "Iterative postorder failed for right-skewed tree");
    deleteTree(root);

END_TEST_CASE

TEST_CASE(test_level_order_traversal)
    // Tree:      3
    //           / \
    //          9  20
    //            /  \
    //           15   7
    TreeNode* root = buildTreeFromArray({3, 9, 20, std::nullopt, std::nullopt, 15, 7});
    std::vector<std::vector<int>> expected = {{3}, {9, 20}, {15, 7}};
    ASSERT_EQ_VEC_VEC(levelOrderTraversal(root), expected, "Level order failed for standard tree");
    deleteTree(root);

    // Empty tree
    root = buildTreeFromArray({});
    expected = {};
    ASSERT_EQ_VEC_VEC(levelOrderTraversal(root), expected, "Level order failed for empty tree");
    deleteTree(root);

    // Single node tree
    root = buildTreeFromArray({10});
    expected = {{10}};
    ASSERT_EQ_VEC_VEC(levelOrderTraversal(root), expected, "Level order failed for single node tree");
    deleteTree(root);

    // Skewed left tree
    //   1
    //  /
    // 2
    // /
    // 3
    root = buildTreeFromArray({1, 2, std::nullopt, 3});
    expected = {{1}, {2}, {3}};
    ASSERT_EQ_VEC_VEC(levelOrderTraversal(root), expected, "Level order failed for left-skewed tree");
    deleteTree(root);

    // Skewed right tree
    // 1
    //  \
    //   2
    //    \
    //     3
    root = buildTreeFromArray({1, std::nullopt, 2, std::nullopt, std::nullopt, std::nullopt, 3});
    expected = {{1}, {2}, {3}};
    ASSERT_EQ_VEC_VEC(levelOrderTraversal(root), expected, "Level order failed for right-skewed tree");
    deleteTree(root);

END_TEST_CASE

// --- Test Cases for Problem Solutions ---

TEST_CASE(test_zigzag_level_order_traversal)
    // Tree:      3
    //           / \
    //          9  20
    //            /  \
    //           15   7
    TreeNode* root = buildTreeFromArray({3, 9, 20, std::nullopt, std::nullopt, 15, 7});
    std::vector<std::vector<int>> expected = {{3}, {20, 9}, {15, 7}};
    ASSERT_EQ_VEC_VEC(zigzagLevelOrderTraversal(root), expected, "Zigzag level order failed for standard tree");
    deleteTree(root);

    // Empty tree
    root = buildTreeFromArray({});
    expected = {};
    ASSERT_EQ_VEC_VEC(zigzagLevelOrderTraversal(root), expected, "Zigzag level order failed for empty tree");
    deleteTree(root);

    // Single node tree
    root = buildTreeFromArray({1});
    expected = {{1}};
    ASSERT_EQ_VEC_VEC(zigzagLevelOrderTraversal(root), expected, "Zigzag level order failed for single node tree");
    deleteTree(root);

    // Tree with 4 levels
    //          1
    //         / \
    //        2   3
    //       / \ / \
    //      4  5 6  7
    //     /
    //    8
    root = buildTreeFromArray({1, 2, 3, 4, 5, 6, 7, 8});
    expected = {{1}, {3, 2}, {4, 5, 6, 7}, {8}};
    ASSERT_EQ_VEC_VEC(zigzagLevelOrderTraversal(root), expected, "Zigzag level order failed for 4-level tree");
    deleteTree(root);

END_TEST_CASE

TEST_CASE(test_validate_bst)
    // Valid BST:
    //      2
    //     / \
    //    1   3
    TreeNode* root = buildTreeFromArray({2, 1, 3});
    ASSERT_TRUE(isValidBST(root), "isValidBST (range) failed for valid BST");
    ASSERT_TRUE(isValidBST_inorder(root), "isValidBST (inorder) failed for valid BST");
    deleteTree(root);

    // Invalid BST: left child > root
    //      5
    //     / \
    //    6   7
    root = buildTreeFromArray({5, 6, 7});
    ASSERT_FALSE(isValidBST(root), "isValidBST (range) failed for invalid BST (left child > root)");
    ASSERT_FALSE(isValidBST_inorder(root), "isValidBST (inorder) failed for invalid BST (left child > root)");
    deleteTree(root);

    // Invalid BST: right subtree node violates root constraint
    //      10
    //     /  \
    //    5    15
    //        /  \
    //       6    20
    root = buildTreeFromArray({10, 5, 15, std::nullopt, std::nullopt, 6, 20});
    ASSERT_FALSE(isValidBST(root), "isValidBST (range) failed for invalid BST (right subtree node violates root constraint)");
    ASSERT_FALSE(isValidBST_inorder(root), "isValidBST (inorder) failed for invalid BST (right subtree node violates root constraint)");
    deleteTree(root);

    // Valid BST: larger tree
    //        50
    //       /  \
    //      30   70
    //     / \   / \
    //    20 40 60 80
    root = buildTreeFromArray({50, 30, 70, 20, 40, 60, 80});
    ASSERT_TRUE(isValidBST(root), "isValidBST (range) failed for larger valid BST");
    ASSERT_TRUE(isValidBST_inorder(root), "isValidBST (inorder) failed for larger valid BST");
    deleteTree(root);

    // Edge case: empty tree
    root = buildTreeFromArray({});
    ASSERT_TRUE(isValidBST(root), "isValidBST (range) failed for empty tree");
    ASSERT_TRUE(isValidBST_inorder(root), "isValidBST (inorder) failed for empty tree");
    deleteTree(root);

    // Edge case: single node
    root = buildTreeFromArray({100});
    ASSERT_TRUE(isValidBST(root), "isValidBST (range) failed for single node tree");
    ASSERT_TRUE(isValidBST_inorder(root), "isValidBST (inorder) failed for single node tree");
    deleteTree(root);

    // Edge case: values INT_MIN and INT_MAX
    //        0
    //       / \
    //  INT_MIN INT_MAX
    root = new TreeNode(0);
    root->left = new TreeNode(std::numeric_limits<int>::min());
    root->right = new TreeNode(std::numeric_limits<int>::max());
    ASSERT_TRUE(isValidBST(root), "isValidBST (range) failed for tree with INT_MIN/MAX");
    ASSERT_TRUE(isValidBST_inorder(root), "isValidBST (inorder) failed for tree with INT_MIN/MAX");
    deleteTree(root);

    // Edge case: duplicate values (should be false for strict BST)
    //        5
    //       / \
    //      5   7
    root = buildTreeFromArray({5, 5, 7});
    ASSERT_FALSE(isValidBST(root), "isValidBST (range) failed for tree with duplicate values (strict BST)");
    ASSERT_FALSE(isValidBST_inorder(root), "isValidBST (inorder) failed for tree with duplicate values (strict BST)");
    deleteTree(root);

END_TEST_CASE

TEST_CASE(test_serialize_deserialize)
    // Standard tree:
    //      1
    //     / \
    //    2   3
    //       / \
    //      4   5
    TreeNode* root = buildTreeFromArray({1, 2, 3, std::nullopt, std::nullopt, 4, 5});
    std::string expected_serialized = "1,2,#,#,3,4,#,#,5,#,#"; // Preorder traversal with # for nulls
    std::string actual_serialized = serialize(root);
    ASSERT_EQ_STR(actual_serialized, expected_serialized, "Serialization failed for standard tree");

    TreeNode* deserialized_root = deserialize(actual_serialized);
    ASSERT_EQ_VEC(preorderTraversal_recursive(root), preorderTraversal_recursive(deserialized_root), "Deserialized tree's preorder does not match original");
    deleteTree(root);
    deleteTree(deserialized_root);

    // Empty tree
    root = buildTreeFromArray({});
    expected_serialized = "#";
    actual_serialized = serialize(root);
    ASSERT_EQ_STR(actual_serialized, expected_serialized, "Serialization failed for empty tree");

    deserialized_root = deserialize(actual_serialized);
    ASSERT_TRUE(deserialized_root == nullptr, "Deserialization of empty tree did not return nullptr");
    deleteTree(root); // Already null
    deleteTree(deserialized_root); // Already null

    // Single node tree
    root = buildTreeFromArray({100});
    expected_serialized = "100,#,#";
    actual_serialized = serialize(root);
    ASSERT_EQ_STR(actual_serialized, expected_serialized, "Serialization failed for single node tree");

    deserialized_root = deserialize(actual_serialized);
    ASSERT_EQ_VEC(preorderTraversal_recursive(root), preorderTraversal_recursive(deserialized_root), "Deserialized single node tree's preorder does not match original");
    deleteTree(root);
    deleteTree(deserialized_root);

    // Skewed right tree
    // 1
    //  \
    //   2
    //    \
    //     3
    root = buildTreeFromArray({1, std::nullopt, 2, std::nullopt, std::nullopt, std::nullopt, 3});
    expected_serialized = "1,#,2,#,3,#,#";
    actual_serialized = serialize(root);
    ASSERT_EQ_STR(actual_serialized, expected_serialized, "Serialization failed for right-skewed tree");

    deserialized_root = deserialize(actual_serialized);
    ASSERT_EQ_VEC(preorderTraversal_recursive(root), preorderTraversal_recursive(deserialized_root), "Deserialized right-skewed tree's preorder does not match original");
    deleteTree(root);
    deleteTree(deserialized_root);

    // Complex tree with many nulls
    //         1
    //        / \
    //       2   3
    //      /   /
    //     4   5
    //    /     \
    //   6       7
    root = buildTreeFromArray({1, 2, 3, 4, std::nullopt, 5, std::nullopt, 6, std::nullopt, std::nullopt, std::nullopt, std::nullopt, 7});
    expected_serialized = "1,2,4,6,#,#,#,#,3,5,#,7,#,#,#";
    actual_serialized = serialize(root);
    ASSERT_EQ_STR(actual_serialized, expected_serialized, "Serialization failed for complex tree");

    deserialized_root = deserialize(actual_serialized);
    ASSERT_EQ_VEC(preorderTraversal_recursive(root), preorderTraversal_recursive(deserialized_root), "Deserialized complex tree's preorder does not match original");
    deleteTree(root);
    deleteTree(deserialized_root);

END_TEST_CASE

int main() {
    std::cout << "--- Running Test Suite ---" << std::endl;

    test_preorder_traversal();
    test_inorder_traversal();
    test_postorder_traversal();
    test_level_order_traversal();
    test_zigzag_level_order_traversal();
    test_validate_bst();
    test_serialize_deserialize();

    std::cout << "\n--- Test Suite Summary ---" << std::endl;
    std::cout << "Total tests run: " << g_tests_run << std::endl;
    std::cout << "Tests passed: " << g_tests_passed << std::endl;
    std::cout << "Tests failed: " << (g_tests_run - g_tests_passed) << std::endl;

    if (g_tests_run == g_tests_passed) {
        std::cout << "All tests passed successfully!" << std::endl;
        return 0;
    } else {
        std::cerr << "Some tests failed!" << std::endl;
        return 1;
    }
}