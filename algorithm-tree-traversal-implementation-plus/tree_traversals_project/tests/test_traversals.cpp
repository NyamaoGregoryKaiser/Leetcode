```cpp
#include "gtest/gtest.h"
#include "../src/problems.hpp"
#include "../src/utils.hpp"
#include <vector>
#include <optional>

// Custom matcher for vector equality, to provide better error messages
MATCHER_P(VectorEq, expected_vector, "") {
    if (arg.size() != expected_vector.size()) {
        *result_listener << "Vectors have different sizes: " << arg.size() << " vs " << expected_vector.size();
        return false;
    }
    for (size_t i = 0; i < arg.size(); ++i) {
        if (arg[i] != expected_vector[i]) {
            *result_listener << "Vectors differ at index " << i << ": " << arg[i] << " vs " << expected_vector[i];
            return false;
        }
    }
    return true;
}

// Custom matcher for vector of vectors equality
MATCHER_P(VectorOfVectorsEq, expected_vector_of_vectors, "") {
    if (arg.size() != expected_vector_of_vectors.size()) {
        *result_listener << "Outer vectors have different sizes: " << arg.size() << " vs " << expected_vector_of_vectors.size();
        return false;
    }
    for (size_t i = 0; i < arg.size(); ++i) {
        if (!VectorEq(expected_vector_of_vectors[i]).Match(arg[i])) {
            *result_listener << "Inner vectors differ at index " << i << ": ";
            VectorEq(expected_vector_of_vectors[i]).MatchAndExplain(arg[i], result_listener);
            return false;
        }
    }
    return true;
}


// Fixture for TreeTraversalProblems tests
class TreeTraversalTests : public ::testing::Test {
protected:
    TreeTraversalProblems solver;
    TreeNode* root1; // Example tree: {1,2,3,4,5,6,7}
    TreeNode* root2; // Example tree: {3,9,20,null,null,15,7}
    TreeNode* root3; // Example tree: single node {100}
    TreeNode* root4; // Example tree: skewed right {1,null,2,null,null,null,3}
    TreeNode* root5; // Example tree: BST {8,3,10,1,6,null,14,null,null,4,7}

    void SetUp() override {
        root1 = TreeUtils::createTree({1, 2, 3, 4, 5, 6, 7});
        root2 = TreeUtils::createTree({3, 9, 20, std::nullopt, std::nullopt, 15, 7});
        root3 = TreeUtils::createTree({100});
        root4 = TreeUtils::createTree({1, std::nullopt, 2, std::nullopt, std::nullopt, std::nullopt, 3});
        root5 = TreeUtils::createTree({8, 3, 10, 1, 6, std::nullopt, 14, std::nullopt, std::nullopt, 4, 7});
    }

    void TearDown() override {
        TreeUtils::deleteTree(root1);
        TreeUtils::deleteTree(root2);
        TreeUtils::deleteTree(root3);
        TreeUtils::deleteTree(root4);
        TreeUtils::deleteTree(root5);
    }
};

// --- Test Cases for Problem 1: Standard DFS Traversals ---

TEST_F(TreeTraversalTests, InorderTraversalRecursive) {
    EXPECT_THAT(solver.inorderTraversal(root1, false), VectorEq({4, 2, 5, 1, 6, 3, 7}));
    EXPECT_THAT(solver.inorderTraversal(root2, false), VectorEq({9, 3, 15, 20, 7}));
    EXPECT_THAT(solver.inorderTraversal(root3, false), VectorEq({100}));
    EXPECT_THAT(solver.inorderTraversal(nullptr, false), VectorEq({}));
}

TEST_F(TreeTraversalTests, InorderTraversalIterative) {
    EXPECT_THAT(solver.inorderTraversal(root1, true), VectorEq({4, 2, 5, 1, 6, 3, 7}));
    EXPECT_THAT(solver.inorderTraversal(root2, true), VectorEq({9, 3, 15, 20, 7}));
    EXPECT_THAT(solver.inorderTraversal(root3, true), VectorEq({100}));
    EXPECT_THAT(solver.inorderTraversal(nullptr, true), VectorEq({}));
}

TEST_F(TreeTraversalTests, PreorderTraversalRecursive) {
    EXPECT_THAT(solver.preorderTraversal(root1, false), VectorEq({1, 2, 4, 5, 3, 6, 7}));
    EXPECT_THAT(solver.preorderTraversal(root2, false), VectorEq({3, 9, 20, 15, 7}));
    EXPECT_THAT(solver.preorderTraversal(root3, false), VectorEq({100}));
    EXPECT_THAT(solver.preorderTraversal(nullptr, false), VectorEq({}));
}

TEST_F(TreeTraversalTests, PreorderTraversalIterative) {
    EXPECT_THAT(solver.preorderTraversal(root1, true), VectorEq({1, 2, 4, 5, 3, 6, 7}));
    EXPECT_THAT(solver.preorderTraversal(root2, true), VectorEq({3, 9, 20, 15, 7}));
    EXPECT_THAT(solver.preorderTraversal(root3, true), VectorEq({100}));
    EXPECT_THAT(solver.preorderTraversal(nullptr, true), VectorEq({}));
}

TEST_F(TreeTraversalTests, PostorderTraversalRecursive) {
    EXPECT_THAT(solver.postorderTraversal(root1, false), VectorEq({4, 5, 2, 6, 7, 3, 1}));
    EXPECT_THAT(solver.postorderTraversal(root2, false), VectorEq({9, 15, 7, 20, 3}));
    EXPECT_THAT(solver.postorderTraversal(root3, false), VectorEq({100}));
    EXPECT_THAT(solver.postorderTraversal(nullptr, false), VectorEq({}));
}

TEST_F(TreeTraversalTests, PostorderTraversalIterativeTwoStacks) {
    EXPECT_THAT(solver.postorderTraversal(root1, true), VectorEq({4, 5, 2, 6, 7, 3, 1}));
    EXPECT_THAT(solver.postorderTraversal(root2, true), VectorEq({9, 15, 7, 20, 3}));
    EXPECT_THAT(solver.postorderTraversal(root3, true), VectorEq({100}));
    EXPECT_THAT(solver.postorderTraversal(nullptr, true), VectorEq({}));
}

// Test cases for skewed tree (recursive vs iterative stack depth)
TEST_F(TreeTraversalTests, SkewedTreeTraversals) {
    // Right skewed: 1 -> null -> 2 -> null -> 3 -> null -> 4
    // Values: {1, null, 2, null, null, null, 3, null, null, null, null, null, null, null, 4}
    // Inorder: 1 2 3 4
    // Preorder: 1 2 3 4
    // Postorder: 4 3 2 1
    TreeNode* skewed_root = TreeUtils::createTree({1, std::nullopt, 2, std::nullopt, std::nullopt, std::nullopt, 3, std::nullopt, std::nullopt, std::nullopt, std::nullopt, std::nullopt, std::nullopt, std::nullopt, 4});

    EXPECT_THAT(solver.inorderTraversal(skewed_root, false), VectorEq({1, 2, 3, 4}));
    EXPECT_THAT(solver.inorderTraversal(skewed_root, true), VectorEq({1, 2, 3, 4}));
    EXPECT_THAT(solver.preorderTraversal(skewed_root, false), VectorEq({1, 2, 3, 4}));
    EXPECT_THAT(solver.preorderTraversal(skewed_root, true), VectorEq({1, 2, 3, 4}));
    EXPECT_THAT(solver.postorderTraversal(skewed_root, false), VectorEq({4, 3, 2, 1}));
    EXPECT_THAT(solver.postorderTraversal(skewed_root, true), VectorEq({4, 3, 2, 1}));

    TreeUtils::deleteTree(skewed_root);
}


// --- Test Cases for Problem 2: Level Order Traversal ---

TEST_F(TreeTraversalTests, LevelOrderTraversal) {
    EXPECT_THAT(solver.levelOrderTraversal(root1), VectorEq({1, 2, 3, 4, 5, 6, 7}));
    EXPECT_THAT(solver.levelOrderTraversal(root2), VectorEq({3, 9, 20, 15, 7}));
    EXPECT_THAT(solver.levelOrderTraversal(root3), VectorEq({100}));
    EXPECT_THAT(solver.levelOrderTraversal(nullptr), VectorEq({}));
}

TEST_F(TreeTraversalTests, LevelOrderTraversalLevelsSeparated) {
    std::vector<std::vector<int>> expected1 = {{1}, {2, 3}, {4, 5, 6, 7}};
    EXPECT_THAT(solver.levelOrderTraversal_LevelsSeparated(root1), VectorOfVectorsEq(expected1));

    std::vector<std::vector<int>> expected2 = {{3}, {9, 20}, {15, 7}};
    EXPECT_THAT(solver.levelOrderTraversal_LevelsSeparated(root2), VectorOfVectorsEq(expected2));

    std::vector<std::vector<int>> expected3 = {{100}};
    EXPECT_THAT(solver.levelOrderTraversal_LevelsSeparated(root3), VectorOfVectorsEq(expected3));

    EXPECT_THAT(solver.levelOrderTraversal_LevelsSeparated(nullptr), VectorOfVectorsEq({}));
}

// --- Test Cases for Problem 3: Zigzag Level Order Traversal ---

TEST_F(TreeTraversalTests, ZigzagLevelOrder) {
    // Level 0: [1]
    // Level 1: [3, 2] (R->L)
    // Level 2: [4, 5, 6, 7] (L->R)
    std::vector<std::vector<int>> expected1 = {{1}, {3, 2}, {4, 5, 6, 7}};
    EXPECT_THAT(solver.zigzagLevelOrder(root1), VectorOfVectorsEq(expected1));

    // Level 0: [3]
    // Level 1: [20, 9] (R->L)
    // Level 2: [15, 7] (L->R)
    std::vector<std::vector<int>> expected2 = {{3}, {20, 9}, {15, 7}};
    EXPECT_THAT(solver.zigzagLevelOrder(root2), VectorOfVectorsEq(expected2));

    std::vector<std::vector<int>> expected3 = {{100}};
    EXPECT_THAT(solver.zigzagLevelOrder(root3), VectorOfVectorsEq(expected3));

    EXPECT_THAT(solver.zigzagLevelOrder(nullptr), VectorOfVectorsEq({}));
}

// --- Test Cases for Problem 4: Boundary Traversal ---

TEST_F(TreeTraversalTests, BoundaryTraversal) {
    // Root1:        1
    //              / \
    //             2   3
    //            / \ / \
    //           4  5 6  7
    // Expected: [1, 2, 4, 5, 6, 7, 3] (Left: 1,2; Leaves: 4,5,6,7; Right: 3)
    EXPECT_THAT(solver.boundaryTraversal(root1), VectorEq({1, 2, 4, 5, 6, 7, 3}));

    // Root2:        3
    //              / \
    //             9  20
    //               /  \
    //              15   7
    // Expected: [3, 9, 15, 7, 20] (Left: 3,9; Leaves: 15,7; Right: 20)
    EXPECT_THAT(solver.boundaryTraversal(root2), VectorEq({3, 9, 15, 7, 20}));

    // Root3: 100
    // Expected: [100]
    EXPECT_THAT(solver.boundaryTraversal(root3), VectorEq({100}));

    // Skewed right: 1 -> null -> 2 -> null -> 3 -> null -> 4
    // Expected: [1, 4] (Root: 1; Leaves: 4; Right Boundary: 3,2 (reversed))
    // Note: The logic handles cases where nodes are both part of boundary and leaves.
    // For a skewed right tree, left boundary is just root (if it has no left child).
    // Leaves is just the last node. Right boundary (excluding last node) is empty.
    // So for 1->2->3->4, left is [1], leaves is [4], right is [] (reversed)
    // The current implementation of boundary traversal _addLeftBoundary skips leaves
    // and _addRightBoundary skips leaves.
    // For 1->2->3->4:
    // root: 1
    // _addLeftBoundary(1->left): does nothing since 1->left is null
    // _addLeaves(1->left): does nothing
    // _addLeaves(1->right) which is node 2: calls _addLeaves(2->left), _addLeaves(2->right which is node 3) ... until node 4. Adds 4.
    // _addRightBoundary(1->right which is node 2): calls _addRightBoundary(2->right which is node 3)... calls for node 4 (which is a leaf, so stops).
    // Then returns to 3, adds 3. Returns to 2, adds 2. Result: [2,3]. Reversed: [3,2].
    // Final: [1, 4, 3, 2]
    EXPECT_THAT(solver.boundaryTraversal(root4), VectorEq({1, 4, 3, 2}));

    EXPECT_THAT(solver.boundaryTraversal(nullptr), VectorEq({}));
}

// --- Test Cases for Problem 5: Kth Smallest Element in BST ---

TEST_F(TreeTraversalTests, KthSmallestBSTRecursive) {
    // root5 (BST): {8,3,10,1,6,null,14,null,null,4,7}
    // Inorder: [1,3,4,6,7,8,10,14]
    EXPECT_EQ(solver.kthSmallest(root5, 1, false), 1);
    EXPECT_EQ(solver.kthSmallest(root5, 3, false), 4);
    EXPECT_EQ(solver.kthSmallest(root5, 5, false), 7);
    EXPECT_EQ(solver.kthSmallest(root5, 8, false), 14); // Max element
    EXPECT_EQ(solver.kthSmallest(root5, 0, false), -1); // k out of bounds
    EXPECT_EQ(solver.kthSmallest(root5, 9, false), -1); // k out of bounds
    EXPECT_EQ(solver.kthSmallest(nullptr, 1, false), -1);
}

TEST_F(TreeTraversalTests, KthSmallestBSTIterative) {
    // root5 (BST): {8,3,10,1,6,null,14,null,null,4,7}
    // Inorder: [1,3,4,6,7,8,10,14]
    EXPECT_EQ(solver.kthSmallest(root5, 1, true), 1);
    EXPECT_EQ(solver.kthSmallest(root5, 3, true), 4);
    EXPECT_EQ(solver.kthSmallest(root5, 5, true), 7);
    EXPECT_EQ(solver.kthSmallest(root5, 8, true), 14); // Max element
    EXPECT_EQ(solver.kthSmallest(root5, 0, true), -1); // k out of bounds
    EXPECT_EQ(solver.kthSmallest(root5, 9, true), -1); // k out of bounds
    EXPECT_EQ(solver.kthSmallest(nullptr, 1, true), -1);
}

// Test Kth Smallest on a single node tree
TEST_F(TreeTraversalTests, KthSmallestSingleNode) {
    EXPECT_EQ(solver.kthSmallest(root3, 1), 100);
    EXPECT_EQ(solver.kthSmallest(root3, 2), -1);
}

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
```