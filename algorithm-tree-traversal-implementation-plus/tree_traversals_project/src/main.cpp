```cpp
#include "problems.hpp"
#include "utils.hpp"
#include <iostream>
#include <vector>
#include <optional>

// Function to print a separator
void print_separator(const std::string& title) {
    std::cout << "\n--- " << title << " ---" << std::endl;
}

int main() {
    TreeTraversalProblems solver;

    // --- Test Cases for Tree Creation and Traversal Problems ---

    // Example Tree 1: Complete Binary Tree
    //        1
    //       / \
    //      2   3
    //     / \ / \
    //    4  5 6  7
    TreeNode* tree1 = TreeUtils::createTree({1, 2, 3, 4, 5, 6, 7});
    print_separator("Example Tree 1 (Complete Binary Tree): {1,2,3,4,5,6,7}");

    std::cout << "Inorder Traversal (Recursive): ";
    TreeUtils::printVector(solver.inorderTraversal(tree1, false));
    std::cout << "Inorder Traversal (Iterative): ";
    TreeUtils::printVector(solver.inorderTraversal(tree1, true));

    std::cout << "Preorder Traversal (Recursive): ";
    TreeUtils::printVector(solver.preorderTraversal(tree1, false));
    std::cout << "Preorder Traversal (Iterative): ";
    TreeUtils::printVector(solver.preorderTraversal(tree1, true));

    std::cout << "Postorder Traversal (Recursive): ";
    TreeUtils::printVector(solver.postorderTraversal(tree1, false));
    std::cout << "Postorder Traversal (Iterative - Two Stacks): ";
    TreeUtils::printVector(solver.postorderTraversal(tree1, true));

    std::cout << "Level Order Traversal: ";
    TreeUtils::printVector(solver.levelOrderTraversal(tree1));
    std::cout << "Level Order Traversal (Levels Separated):" << std::endl;
    TreeUtils::printVectorOfVectors(solver.levelOrderTraversal_LevelsSeparated(tree1));

    std::cout << "Zigzag Level Order Traversal:" << std::endl;
    TreeUtils::printVectorOfVectors(solver.zigzagLevelOrder(tree1));

    std::cout << "Boundary Traversal: ";
    TreeUtils::printVector(solver.boundaryTraversal(tree1));

    // Kth Smallest in BST (tree1 is not a BST, but let's test for behavior)
    std::cout << "Kth Smallest (k=3, iterative) on tree1 (not BST, behavior undefined for BST logic): "
              << solver.kthSmallest(tree1, 3, true) << std::endl;
    TreeUtils::deleteTree(tree1);


    // Example Tree 2: Skewed Tree (Right Skewed)
    //    1
    //     \
    //      2
    //       \
    //        3
    //         \
    //          4
    TreeNode* tree2 = TreeUtils::createTree({1, std::nullopt, 2, std::nullopt, std::nullopt, std::nullopt, 3, std::nullopt, std::nullopt, std::nullopt, std::nullopt, std::nullopt, std::nullopt, std::nullopt, 4});
    print_separator("Example Tree 2 (Right Skewed): {1, null, 2, null, null, null, 3, null, null, null, null, null, null, null, 4}");

    std::cout << "Inorder Traversal (Iterative): ";
    TreeUtils::printVector(solver.inorderTraversal(tree2, true));
    std::cout << "Preorder Traversal (Iterative): ";
    TreeUtils::printVector(solver.preorderTraversal(tree2, true));
    std::cout << "Postorder Traversal (Iterative): ";
    TreeUtils::printVector(solver.postorderTraversal(tree2, true));

    std::cout << "Level Order Traversal: ";
    TreeUtils::printVector(solver.levelOrderTraversal(tree2));
    std::cout << "Zigzag Level Order Traversal:" << std::endl;
    TreeUtils::printVectorOfVectors(solver.zigzagLevelOrder(tree2));
    TreeUtils::deleteTree(tree2);


    // Example Tree 3: Custom Tree
    //        3
    //       / \
    //      9  20
    //         /  \
    //        15   7
    TreeNode* tree3 = TreeUtils::createTree({3, 9, 20, std::nullopt, std::nullopt, 15, 7});
    print_separator("Example Tree 3 (Custom): {3,9,20,null,null,15,7}");

    std::cout << "Inorder Traversal (Recursive): ";
    TreeUtils::printVector(solver.inorderTraversal(tree3, false));
    std::cout << "Preorder Traversal (Iterative): ";
    TreeUtils::printVector(solver.preorderTraversal(tree3, true));
    std::cout << "Postorder Traversal (Iterative): ";
    TreeUtils::printVector(solver.postorderTraversal(tree3, true));

    std::cout << "Level Order Traversal: ";
    TreeUtils::printVector(solver.levelOrderTraversal(tree3));
    std::cout << "Level Order Traversal (Levels Separated):" << std::endl;
    TreeUtils::printVectorOfVectors(solver.levelOrderTraversal_LevelsSeparated(tree3));
    std::cout << "Zigzag Level Order Traversal:" << std::endl;
    TreeUtils::printVectorOfVectors(solver.zigzagLevelOrder(tree3));

    std::cout << "Boundary Traversal: ";
    TreeUtils::printVector(solver.boundaryTraversal(tree3));
    TreeUtils::deleteTree(tree3);


    // Example Tree 4: Single Node
    //      100
    TreeNode* tree4 = TreeUtils::createTree({100});
    print_separator("Example Tree 4 (Single Node): {100}");
    std::cout << "Inorder Traversal: ";
    TreeUtils::printVector(solver.inorderTraversal(tree4));
    std::cout << "Preorder Traversal: ";
    TreeUtils::printVector(solver.preorderTraversal(tree4));
    std::cout << "Postorder Traversal: ";
    TreeUtils::printVector(solver.postorderTraversal(tree4));
    std::cout << "Level Order Traversal: ";
    TreeUtils::printVector(solver.levelOrderTraversal(tree4));
    std::cout << "Zigzag Level Order Traversal:" << std::endl;
    TreeUtils::printVectorOfVectors(solver.zigzagLevelOrder(tree4));
    std::cout << "Boundary Traversal: ";
    TreeUtils::printVector(solver.boundaryTraversal(tree4)); // Should just be [100]
    std::cout << "Kth Smallest (k=1, iterative): " << solver.kthSmallest(tree4, 1, true) << std::endl;
    std::cout << "Kth Smallest (k=2, iterative): " << solver.kthSmallest(tree4, 2, true) << " (Expected -1)" << std::endl;
    TreeUtils::deleteTree(tree4);


    // Example Tree 5: Null Tree
    TreeNode* tree5 = nullptr;
    print_separator("Example Tree 5 (Null Tree)");
    std::cout << "Inorder Traversal: ";
    TreeUtils::printVector(solver.inorderTraversal(tree5));
    std::cout << "Level Order Traversal: ";
    TreeUtils::printVector(solver.levelOrderTraversal(tree5));
    std::cout << "Boundary Traversal: ";
    TreeUtils::printVector(solver.boundaryTraversal(tree5));
    std::cout << "Kth Smallest (k=1): " << solver.kthSmallest(tree5, 1) << " (Expected -1)" << std::endl;


    // Example Tree 6: Valid BST for Kth Smallest
    //        8
    //       / \
    //      3  10
    //     / \   \
    //    1   6   14
    //       / \
    //      4   7
    TreeNode* tree6 = TreeUtils::createTree({8, 3, 10, 1, 6, std::nullopt, 14, std::nullopt, std::nullopt, 4, 7});
    print_separator("Example Tree 6 (BST for Kth Smallest): {8,3,10,1,6,null,14,null,null,4,7}");

    std::cout << "Inorder Traversal (confirms BST order): ";
    TreeUtils::printVector(solver.inorderTraversal(tree6)); // Should be [1,3,4,6,7,8,10,14]

    std::cout << "Kth Smallest (k=1, recursive): " << solver.kthSmallest(tree6, 1, false) << " (Expected 1)" << std::endl;
    std::cout << "Kth Smallest (k=3, iterative): " << solver.kthSmallest(tree6, 3, true) << " (Expected 4)" << std::endl;
    std::cout << "Kth Smallest (k=5, recursive): " << solver.kthSmallest(tree6, 5, false) << " (Expected 7)" << std::endl;
    std::cout << "Kth Smallest (k=8, iterative): " << solver.kthSmallest(tree6, 8, true) << " (Expected 14)" << std::endl;
    std::cout << "Kth Smallest (k=9, iterative): " << solver.kthSmallest(tree6, 9, true) << " (Expected -1)" << std::endl;
    std::cout << "Kth Smallest (k=0, iterative): " << solver.kthSmallest(tree6, 0, true) << " (Expected -1)" << std::endl;

    TreeUtils::deleteTree(tree6);

    return 0;
}
```