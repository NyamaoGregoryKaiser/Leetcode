#include "tree_utils.hpp"
#include "tree_traversals.hpp"
#include "../problems/problem_solutions.hpp"
#include <iostream>
#include <chrono> // For basic timing

void run_basic_traversal_demo() {
    std::cout << "\n--- Basic Traversal Demonstrations ---" << std::endl;

    // Example Tree 1:
    //      1
    //     / \
    //    2   3
    //   / \
    //  4   5
    TreeNode* root1 = buildTreeFromArray({1, 2, 3, 4, 5, std::nullopt, std::nullopt});
    std::cout << "\nTree 1 (Standard):" << std::endl;
    printTree(root1);

    std::cout << "\nPreorder Traversal (Root, Left, Right):" << std::endl;
    std::cout << "  Recursive: " << vecToString(preorderTraversal_recursive(root1)) << std::endl;
    std::cout << "  Iterative: " << vecToString(preorderTraversal_iterative(root1)) << std::endl;

    std::cout << "\nInorder Traversal (Left, Root, Right):" << std::endl;
    std::cout << "  Recursive: " << vecToString(inorderTraversal_recursive(root1)) << std::endl;
    std::cout << "  Iterative: " << vecToString(inorderTraversal_iterative(root1)) << std::endl;

    std::cout << "\nPostorder Traversal (Left, Right, Root):" << std::endl;
    std::cout << "  Recursive: " << vecToString(postorderTraversal_recursive(root1)) << std::endl;
    std::cout << "  Iterative: " << vecToString(postorderTraversal_iterative(root1)) << std::endl;

    std::cout << "\nLevel Order Traversal (BFS):" << std::endl;
    std::cout << "  " << vecOfVecsToString(levelOrderTraversal(root1)) << std::endl;
    deleteTree(root1);

    // Example Tree 2 (Skewed):
    //      1
    //       \
    //        2
    //         \
    //          3
    TreeNode* root2 = buildTreeFromArray({1, std::nullopt, 2, std::nullopt, std::nullopt, std::nullopt, 3});
    std::cout << "\nTree 2 (Right Skewed):" << std::endl;
    printTree(root2);

    std::cout << "\nInorder Traversal (Recursive): " << vecToString(inorderTraversal_recursive(root2)) << std::endl;
    std::cout << "Inorder Traversal (Iterative): " << vecToString(inorderTraversal_iterative(root2)) << std::endl;
    deleteTree(root2);

    // Example Tree 3 (Empty):
    TreeNode* root3 = buildTreeFromArray({});
    std::cout << "\nTree 3 (Empty):" << std::endl;
    std::cout << "Preorder Recursive: " << vecToString(preorderTraversal_recursive(root3)) << std::endl;
    deleteTree(root3);
}

void run_problem_solutions_demo() {
    std::cout << "\n--- Problem Solutions Demonstrations ---" << std::endl;

    // --- Problem 3: Zigzag Level Order Traversal ---
    std::cout << "\n### Problem 3: Zigzag Level Order Traversal ###" << std::endl;
    // Example:
    //      3
    //     / \
    //    9  20
    //      /  \
    //     15   7
    TreeNode* zigzag_root = buildTreeFromArray({3, 9, 20, std::nullopt, std::nullopt, 15, 7});
    std::cout << "\nTree for Zigzag Traversal:" << std::endl;
    printTree(zigzag_root);
    std::cout << "\nZigzag Level Order: " << vecOfVecsToString(zigzagLevelOrderTraversal(zigzag_root)) << std::endl;
    deleteTree(zigzag_root);

    // --- Problem 4: Validate Binary Search Tree ---
    std::cout << "\n### Problem 4: Validate Binary Search Tree ###" << std::endl;

    // Valid BST
    //      2
    //     / \
    //    1   3
    TreeNode* bst_root_valid = buildTreeFromArray({2, 1, 3});
    std::cout << "\nValid BST:" << std::endl;
    printTree(bst_root_valid);
    std::cout << "  Is Valid BST (range check)? " << (isValidBST(bst_root_valid) ? "True" : "False") << std::endl;
    std::cout << "  Is Valid BST (inorder check)? " << (isValidBST_inorder(bst_root_valid) ? "True" : "False") << std::endl;
    deleteTree(bst_root_valid);

    // Invalid BST (left child > root)
    //      5
    //     / \
    //    6   7
    TreeNode* bst_root_invalid_left = buildTreeFromArray({5, 6, 7});
    std::cout << "\nInvalid BST (left child > root):" << std::endl;
    printTree(bst_root_invalid_left);
    std::cout << "  Is Valid BST (range check)? " << (isValidBST(bst_root_invalid_left) ? "True" : "False") << std::endl;
    std::cout << "  Is Valid BST (inorder check)? " << (isValidBST_inorder(bst_root_invalid_left) ? "True" : "False") << std::endl;
    deleteTree(bst_root_invalid_left);

    // Invalid BST (right subtree node violates root constraint)
    //      10
    //     /  \
    //    5    15
    //        /  \
    //       6    20  (6 < 10, but in right subtree of 10)
    TreeNode* bst_root_invalid_subtree = buildTreeFromArray({10, 5, 15, std::nullopt, std::nullopt, 6, 20});
    std::cout << "\nInvalid BST (right subtree node violates root constraint):" << std::endl;
    printTree(bst_root_invalid_subtree);
    std::cout << "  Is Valid BST (range check)? " << (isValidBST(bst_root_invalid_subtree) ? "True" : "False") << std::endl;
    std::cout << "  Is Valid BST (inorder check)? " << (isValidBST_inorder(bst_root_invalid_subtree) ? "True" : "False") << std::endl;
    deleteTree(bst_root_invalid_subtree);

    // Edge case: single node
    TreeNode* bst_root_single = buildTreeFromArray({42});
    std::cout << "\nSingle node BST (42):" << std::endl;
    printTree(bst_root_single);
    std::cout << "  Is Valid BST (range check)? " << (isValidBST(bst_root_single) ? "True" : "False") << std::endl;
    std::cout << "  Is Valid BST (inorder check)? " << (isValidBST_inorder(bst_root_single) ? "True" : "False") << std::endl;
    deleteTree(bst_root_single);

    // --- Problem 5: Serialize and Deserialize Binary Tree ---
    std::cout << "\n### Problem 5: Serialize and Deserialize Binary Tree ###" << std::endl;

    // Example tree:
    //      1
    //     / \
    //    2   3
    //       / \
    //      4   5
    TreeNode* ser_des_root = buildTreeFromArray({1, 2, 3, std::nullopt, std::nullopt, 4, 5});
    std::cout << "\nOriginal Tree for Serialize/Deserialize:" << std::endl;
    printTree(ser_des_root);

    std::string serialized_data = serialize(ser_des_root);
    std::cout << "Serialized: " << serialized_data << std::endl;

    TreeNode* deserialized_root = deserialize(serialized_data);
    std::cout << "Deserialized Tree:" << std::endl;
    printTree(deserialized_root);

    std::cout << "\nVerifying deserialization (Preorder traversal check):" << std::endl;
    std::vector<int> original_preorder = preorderTraversal_recursive(ser_des_root);
    std::vector<int> deserialized_preorder = preorderTraversal_recursive(deserialized_root);
    std::cout << "  Original Preorder: " << vecToString(original_preorder) << std::endl;
    std::cout << "  Deserialized Preorder: " << vecToString(deserialized_preorder) << std::endl;
    std::cout << "  Match? " << (compareVectors(original_preorder, deserialized_preorder) ? "True" : "False") << std::endl;

    deleteTree(ser_des_root);
    deleteTree(deserialized_root);

    // Edge case: empty tree
    TreeNode* empty_root = nullptr;
    std::cout << "\nEmpty Tree Serialize/Deserialize:" << std::endl;
    std::string empty_serialized = serialize(empty_root);
    std::cout << "  Serialized empty: " << empty_serialized << std::endl;
    TreeNode* empty_deserialized = deserialize(empty_serialized);
    std::cout << "  Deserialized empty is null? " << (empty_deserialized == nullptr ? "True" : "False") << std::endl;
    deleteTree(empty_deserialized); // Should be nullptr, safe to call
}

int main() {
    std::cout << "Starting Tree Traversals Project Demonstrations" << std::endl;

    run_basic_traversal_demo();
    run_problem_solutions_demo();

    std::cout << "\nAll demonstrations complete." << std::endl;
    return 0;
}