```javascript
/**
 * @fileoverview Test cases for Maximum Depth of Binary Tree.
 */

const { buildTreeFromArray } = require('../src/utils/TreeBuilder');
const {
    maxDepthRecursive,
    maxDepthIterativeBFS,
    maxDepthIterativeDFS
} = require('../src/problems/MaxDepth');

/**
 * Test suite for Maximum Depth of Binary Tree.
 * @param {function} assert The assertion function.
 */
function testMaxDepth(assert) {
    // Test Case 1: Empty tree
    let root = buildTreeFromArray([]);
    assert(maxDepthRecursive(root), 0, "Max Depth Recursive: Empty tree");
    assert(maxDepthIterativeBFS(root), 0, "Max Depth Iterative BFS: Empty tree");
    assert(maxDepthIterativeDFS(root), 0, "Max Depth Iterative DFS: Empty tree");

    // Test Case 2: Single node tree
    root = buildTreeFromArray([1]);
    assert(maxDepthRecursive(root), 1, "Max Depth Recursive: Single node");
    assert(maxDepthIterativeBFS(root), 1, "Max Depth Iterative BFS: Single node");
    assert(maxDepthIterativeDFS(root), 1, "Max Depth Iterative DFS: Single node");

    // Test Case 3: Simple tree
    root = buildTreeFromArray([1, 2, 3]); //   1 \n 2   3
    assert(maxDepthRecursive(root), 2, "Max Depth Recursive: Simple tree");
    assert(maxDepthIterativeBFS(root), 2, "Max Depth Iterative BFS: Simple tree");
    assert(maxDepthIterativeDFS(root), 2, "Max Depth Iterative DFS: Simple tree");

    // Test Case 4: Complete tree (Example from problem)
    root = buildTreeFromArray([3, 9, 20, null, null, 15, 7]); //   3 \n 9   20 \n     15  7
    assert(maxDepthRecursive(root), 3, "Max Depth Recursive: Complete tree");
    assert(maxDepthIterativeBFS(root), 3, "Max Depth Iterative BFS: Complete tree");
    assert(maxDepthIterativeDFS(root), 3, "Max Depth Iterative DFS: Complete tree");

    // Test Case 5: Left skewed tree
    root = buildTreeFromArray([1, 2, null, 3, null, null, null, 4]); // 1 -> 2 -> 3 -> 4
    assert(maxDepthRecursive(root), 4, "Max Depth Recursive: Left skewed tree");
    assert(maxDepthIterativeBFS(root), 4, "Max Depth Iterative BFS: Left skewed tree");
    assert(maxDepthIterativeDFS(root), 4, "Max Depth Iterative DFS: Left skewed tree");

    // Test Case 6: Right skewed tree
    root = buildTreeFromArray([1, null, 2, null, null, null, 3, null, null, null, null, null, null, null, 4]); // 1 -> 2 -> 3 -> 4
    assert(maxDepthRecursive(root), 4, "Max Depth Recursive: Right skewed tree");
    assert(maxDepthIterativeBFS(root), 4, "Max Depth Iterative BFS: Right skewed tree");
    assert(maxDepthIterativeDFS(root), 4, "Max Depth Iterative DFS: Right skewed tree");

    // Test Case 7: Tree with only left children (another one)
    root = buildTreeFromArray([1, 2, null, 3, null, null, null, 4, null, null, null, null, null, null, null, 5]);
    assert(maxDepthRecursive(root), 5, "Max Depth Recursive: Left-only chain");
    assert(maxDepthIterativeBFS(root), 5, "Max Depth Iterative BFS: Left-only chain");
    assert(maxDepthIterativeDFS(root), 5, "Max Depth Iterative DFS: Left-only chain");

    // Test Case 8: Complex balanced tree
    root = buildTreeFromArray([1, 2, 3, 4, 5, 6, 7]);
    assert(maxDepthRecursive(root), 3, "Max Depth Recursive: Complex balanced tree");
    assert(maxDepthIterativeBFS(root), 3, "Max Depth Iterative BFS: Complex balanced tree");
    assert(maxDepthIterativeDFS(root), 3, "Max Depth Iterative DFS: Complex balanced tree");

    // Test Case 9: Tree with nulls in middle
    root = buildTreeFromArray([1, 2, 3, 4, null, null, 5, 6, 7]);
    //      1
    //     / \
    //    2   3
    //   /     \
    //  4       5
    // / \
    // 6  7
    assert(maxDepthRecursive(root), 4, "Max Depth Recursive: Tree with nulls in middle");
    assert(maxDepthIterativeBFS(root), 4, "Max Depth Iterative BFS: Tree with nulls in middle");
    assert(maxDepthIterativeDFS(root), 4, "Max Depth Iterative DFS: Tree with nulls in middle");
}

module.exports = {
    testMaxDepth
};
```