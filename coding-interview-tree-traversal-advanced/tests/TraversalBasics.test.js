```javascript
/**
 * @fileoverview Test cases for Inorder, Preorder, and Postorder traversals.
 */

const { buildTreeFromArray } = require('../src/utils/TreeBuilder');
const {
    preorderTraversalRecursive,
    preorderTraversalIterative,
    inorderTraversalRecursive,
    inorderTraversalIterative,
    postorderTraversalRecursive,
    postorderTraversalIterativeTwoStacks,
    postorderTraversalIterativeOneStack
} = require('../src/problems/TraversalBasics');

/**
 * Test suite for Preorder Traversal.
 * @param {function} assert The assertion function.
 */
function testPreorderTraversal(assert) {
    // Test Case 1: Empty tree
    let root = buildTreeFromArray([]);
    assert(preorderTraversalRecursive(root), [], "Preorder Recursive: Empty tree");
    assert(preorderTraversalIterative(root), [], "Preorder Iterative: Empty tree");

    // Test Case 2: Single node tree
    root = buildTreeFromArray([1]);
    assert(preorderTraversalRecursive(root), [1], "Preorder Recursive: Single node");
    assert(preorderTraversalIterative(root), [1], "Preorder Iterative: Single node");

    // Test Case 3: Simple tree
    root = buildTreeFromArray([1, 2, 3]); //   1 \n 2   3
    assert(preorderTraversalRecursive(root), [1, 2, 3], "Preorder Recursive: Simple tree");
    assert(preorderTraversalIterative(root), [1, 2, 3], "Preorder Iterative: Simple tree");

    // Test Case 4: Complete tree
    root = buildTreeFromArray([3, 9, 20, null, null, 15, 7]); //   3 \n 9   20 \n     15  7
    assert(preorderTraversalRecursive(root), [3, 9, 20, 15, 7], "Preorder Recursive: Complete tree");
    assert(preorderTraversalIterative(root), [3, 9, 20, 15, 7], "Preorder Iterative: Complete tree");

    // Test Case 5: Left skewed tree
    root = buildTreeFromArray([1, 2, null, 3, null, null, null, 4]); // 1 \n 2 \n 3 \n 4
    assert(preorderTraversalRecursive(root), [1, 2, 3, 4], "Preorder Recursive: Left skewed tree");
    assert(preorderTraversalIterative(root), [1, 2, 3, 4], "Preorder Iterative: Left skewed tree");

    // Test Case 6: Right skewed tree
    root = buildTreeFromArray([1, null, 2, null, null, null, 3, null, null, null, null, null, null, null, 4]); // 1 \n   2 \n     3 \n       4
    assert(preorderTraversalRecursive(root), [1, 2, 3, 4], "Preorder Recursive: Right skewed tree");
    assert(preorderTraversalIterative(root), [1, 2, 3, 4], "Preorder Iterative: Right skewed tree");

    // Test Case 7: Mixed tree with negative values
    root = buildTreeFromArray([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1]); // Complex
    assert(preorderTraversalRecursive(root), [5, 4, 11, 7, 2, 8, 13, 4, 1], "Preorder Recursive: Mixed tree with negatives");
    assert(preorderTraversalIterative(root), [5, 4, 11, 7, 2, 8, 13, 4, 1], "Preorder Iterative: Mixed tree with negatives");
}

/**
 * Test suite for Inorder Traversal.
 * @param {function} assert The assertion function.
 */
function testInorderTraversal(assert) {
    // Test Case 1: Empty tree
    let root = buildTreeFromArray([]);
    assert(inorderTraversalRecursive(root), [], "Inorder Recursive: Empty tree");
    assert(inorderTraversalIterative(root), [], "Inorder Iterative: Empty tree");

    // Test Case 2: Single node tree
    root = buildTreeFromArray([1]);
    assert(inorderTraversalRecursive(root), [1], "Inorder Recursive: Single node");
    assert(inorderTraversalIterative(root), [1], "Inorder Iterative: Single node");

    // Test Case 3: Simple tree
    root = buildTreeFromArray([1, 2, 3]); //   1 \n 2   3
    assert(inorderTraversalRecursive(root), [2, 1, 3], "Inorder Recursive: Simple tree");
    assert(inorderTraversalIterative(root), [2, 1, 3], "Inorder Iterative: Simple tree");

    // Test Case 4: Complete tree
    root = buildTreeFromArray([3, 9, 20, null, null, 15, 7]); //   3 \n 9   20 \n     15  7
    assert(inorderTraversalRecursive(root), [9, 3, 15, 20, 7], "Inorder Recursive: Complete tree");
    assert(inorderTraversalIterative(root), [9, 3, 15, 20, 7], "Inorder Iterative: Complete tree");

    // Test Case 5: Left skewed tree
    root = buildTreeFromArray([1, 2, null, 3, null, null, null, 4]); // 1 \n 2 \n 3 \n 4
    assert(inorderTraversalRecursive(root), [4, 3, 2, 1], "Inorder Recursive: Left skewed tree");
    assert(inorderTraversalIterative(root), [4, 3, 2, 1], "Inorder Iterative: Left skewed tree");

    // Test Case 6: Right skewed tree
    root = buildTreeFromArray([1, null, 2, null, null, null, 3, null, null, null, null, null, null, null, 4]); // 1 \n   2 \n     3 \n       4
    assert(inorderTraversalRecursive(root), [1, 2, 3, 4], "Inorder Recursive: Right skewed tree");
    assert(inorderTraversalIterative(root), [1, 2, 3, 4], "Inorder Iterative: Right skewed tree");

    // Test Case 7: Mixed tree with negative values
    root = buildTreeFromArray([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1]); // Complex
    assert(inorderTraversalRecursive(root), [7, 11, 2, 4, 5, 13, 8, 4, 1], "Inorder Recursive: Mixed tree with negatives");
    assert(inorderTraversalIterative(root), [7, 11, 2, 4, 5, 13, 8, 4, 1], "Inorder Iterative: Mixed tree with negatives");
}

/**
 * Test suite for Postorder Traversal.
 * @param {function} assert The assertion function.
 */
function testPostorderTraversal(assert) {
    // Test Case 1: Empty tree
    let root = buildTreeFromArray([]);
    assert(postorderTraversalRecursive(root), [], "Postorder Recursive: Empty tree");
    assert(postorderTraversalIterativeTwoStacks(root), [], "Postorder Iterative (Two Stacks): Empty tree");
    assert(postorderTraversalIterativeOneStack(root), [], "Postorder Iterative (One Stack): Empty tree");

    // Test Case 2: Single node tree
    root = buildTreeFromArray([1]);
    assert(postorderTraversalRecursive(root), [1], "Postorder Recursive: Single node");
    assert(postorderTraversalIterativeTwoStacks(root), [1], "Postorder Iterative (Two Stacks): Single node");
    assert(postorderTraversalIterativeOneStack(root), [1], "Postorder Iterative (One Stack): Single node");

    // Test Case 3: Simple tree
    root = buildTreeFromArray([1, 2, 3]); //   1 \n 2   3
    assert(postorderTraversalRecursive(root), [2, 3, 1], "Postorder Recursive: Simple tree");
    assert(postorderTraversalIterativeTwoStacks(root), [2, 3, 1], "Postorder Iterative (Two Stacks): Simple tree");
    assert(postorderTraversalIterativeOneStack(root), [2, 3, 1], "Postorder Iterative (One Stack): Simple tree");

    // Test Case 4: Complete tree
    root = buildTreeFromArray([3, 9, 20, null, null, 15, 7]); //   3 \n 9   20 \n     15  7
    assert(postorderTraversalRecursive(root), [9, 15, 7, 20, 3], "Postorder Recursive: Complete tree");
    assert(postorderTraversalIterativeTwoStacks(root), [9, 15, 7, 20, 3], "Postorder Iterative (Two Stacks): Complete tree");
    assert(postorderTraversalIterativeOneStack(root), [9, 15, 7, 20, 3], "Postorder Iterative (One Stack): Complete tree");

    // Test Case 5: Left skewed tree
    root = buildTreeFromArray([1, 2, null, 3, null, null, null, 4]); // 1 \n 2 \n 3 \n 4
    assert(postorderTraversalRecursive(root), [4, 3, 2, 1], "Postorder Recursive: Left skewed tree");
    assert(postorderTraversalIterativeTwoStacks(root), [4, 3, 2, 1], "Postorder Iterative (Two Stacks): Left skewed tree");
    assert(postorderTraversalIterativeOneStack(root), [4, 3, 2, 1], "Postorder Iterative (One Stack): Left skewed tree");

    // Test Case 6: Right skewed tree
    root = buildTreeFromArray([1, null, 2, null, null, null, 3, null, null, null, null, null, null, null, 4]); // 1 \n   2 \n     3 \n       4
    assert(postorderTraversalRecursive(root), [4, 3, 2, 1], "Postorder Recursive: Right skewed tree");
    assert(postorderTraversalIterativeTwoStacks(root), [4, 3, 2, 1], "Postorder Iterative (Two Stacks): Right skewed tree");
    assert(postorderTraversalIterativeOneStack(root), [4, 3, 2, 1], "Postorder Iterative (One Stack): Right skewed tree");

    // Test Case 7: Mixed tree with negative values
    root = buildTreeFromArray([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1]); // Complex
    assert(postorderTraversalRecursive(root), [7, 2, 11, 4, 1, 4, 13, 8, 5], "Postorder Recursive: Mixed tree with negatives");
    assert(postorderTraversalIterativeTwoStacks(root), [7, 2, 11, 4, 1, 4, 13, 8, 5], "Postorder Iterative (Two Stacks): Mixed tree with negatives");
    assert(postorderTraversalIterativeOneStack(root), [7, 2, 11, 4, 1, 4, 13, 8, 5], "Postorder Iterative (One Stack): Mixed tree with negatives");
}

module.exports = {
    testPreorderTraversal,
    testInorderTraversal,
    testPostorderTraversal
};
```