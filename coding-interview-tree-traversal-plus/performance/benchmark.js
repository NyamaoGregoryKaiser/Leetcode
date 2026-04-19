```javascript
const { buildTreeFromArray } = require('../src/utils/treeNode');
const { inorderTraversalRecursive, inorderTraversalIterative } = require('../src/problems/inorderTraversal');
const { preorderTraversalRecursive, preorderTraversalIterative } = require('../src/problems/preorderTraversal');
const { postorderTraversalRecursive, postorderTraversalIterativeTwoStacks, postorderTraversalIterativeOneStack } = require('../src/problems/postorderTraversal');
const { levelOrderTraversal } = require('../src/problems/levelOrderTraversal');
const { zigzagLevelOrder } = require('../src/problems/zigzagLevelOrder');
const { maxDepthDFS, maxDepthBFS } = require('../src/problems/maxDepth');
const { pathSumRecursive, pathSumOptimized } = require('../src/problems/pathSumIII');
const { morrisInorderTraversal } = require('../src/problems/morrisTraversal');

/**
 * @function generateLargeSkewedTree
 * @description Generates a large right-skewed binary tree.
 * @param {number} size - The number of nodes in the tree.
 * @returns {import('../src/utils/treeNode').TreeNode} The root of the generated tree.
 */
function generateLargeSkewedTree(size) {
    if (size === 0) return null;
    let root = new (require('../src/utils/treeNode').TreeNode)(0);
    let current = root;
    for (let i = 1; i < size; i++) {
        current.right = new (require('../src/utils/treeNode').TreeNode)(i);
        current = current.right;
    }
    return root;
}

/**
 * @function generateLargeBalancedTree
 * @description Generates a large approximately balanced binary tree.
 * @param {number} size - The number of nodes in the tree.
 * @returns {import('../src/utils/treeNode').TreeNode} The root of the generated tree.
 */
function generateLargeBalancedTree(size) {
    if (size === 0) return null;
    const arr = Array.from({ length: size }, (_, i) => i + 1);
    return buildTreeFromArray(arr);
}

console.log('--- Tree Traversal Benchmarks ---');

const SMALL_TREE_SIZE = 1000;
const MEDIUM_TREE_SIZE = 10000;
const LARGE_TREE_SIZE = 50000; // Increased for more noticeable differences

console.log(`\nBenchmarking with a skewed tree of size ${LARGE_TREE_SIZE}...`);
const skewedTree = generateLargeSkewedTree(LARGE_TREE_SIZE);
// const skewedTreeArr = generateLargeSkewedTree(LARGE_TREE_SIZE); // For buildTreeFromArray

console.log(`\nBenchmarking with a balanced tree of size ${LARGE_TREE_SIZE}...`);
const balancedTree = generateLargeBalancedTree(LARGE_TREE_SIZE);
// const balancedTreeArr = generateLargeBalancedTree(LARGE_TREE_SIZE); // For buildTreeFromArray

// Helper to run benchmark
function runBenchmark(name, func, tree, ...args) {
    console.time(name);
    func(tree, ...args);
    console.timeEnd(name);
}

console.log('\n--- Inorder Traversal (Skewed Tree) ---');
runBenchmark('Inorder Recursive (Skewed)', inorderTraversalRecursive, skewedTree);
runBenchmark('Inorder Iterative (Skewed)', inorderTraversalIterative, skewedTree);
runBenchmark('Morris Inorder (Skewed) O(1) space', morrisInorderTraversal, skewedTree);

console.log('\n--- Inorder Traversal (Balanced Tree) ---');
runBenchmark('Inorder Recursive (Balanced)', inorderTraversalRecursive, balancedTree);
runBenchmark('Inorder Iterative (Balanced)', inorderTraversalIterative, balancedTree);
runBenchmark('Morris Inorder (Balanced) O(1) space', morrisInorderTraversal, balancedTree);


console.log('\n--- Preorder Traversal (Skewed Tree) ---');
runBenchmark('Preorder Recursive (Skewed)', preorderTraversalRecursive, skewedTree);
runBenchmark('Preorder Iterative (Skewed)', preorderTraversalIterative, skewedTree);

console.log('\n--- Preorder Traversal (Balanced Tree) ---');
runBenchmark('Preorder Recursive (Balanced)', preorderTraversalRecursive, balancedTree);
runBenchmark('Preorder Iterative (Balanced)', preorderTraversalIterative, balancedTree);


console.log('\n--- Postorder Traversal (Skewed Tree) ---');
runBenchmark('Postorder Recursive (Skewed)', postorderTraversalRecursive, skewedTree);
runBenchmark('Postorder Iterative (Two Stacks) (Skewed)', postorderTraversalIterativeTwoStacks, skewedTree);
runBenchmark('Postorder Iterative (One Stack) (Skewed)', postorderTraversalIterativeOneStack, skewedTree);

console.log('\n--- Postorder Traversal (Balanced Tree) ---');
runBenchmark('Postorder Recursive (Balanced)', postorderTraversalRecursive, balancedTree);
runBenchmark('Postorder Iterative (Two Stacks) (Balanced)', postorderTraversalIterativeTwoStacks, balancedTree);
runBenchmark('Postorder Iterative (One Stack) (Balanced)', postorderTraversalIterativeOneStack, balancedTree);


console.log('\n--- Level Order Traversal (BFS) ---');
runBenchmark('Level Order (Skewed)', levelOrderTraversal, skewedTree);
runBenchmark('Level Order (Balanced)', levelOrderTraversal, balancedTree);


console.log('\n--- Zigzag Level Order Traversal ---');
runBenchmark('Zigzag Level Order (Skewed)', zigzagLevelOrder, skewedTree);
runBenchmark('Zigzag Level Order (Balanced)', zigzagLevelOrder, balancedTree);


console.log('\n--- Maximum Depth ---');
runBenchmark('Max Depth DFS (Skewed)', maxDepthDFS, skewedTree);
runBenchmark('Max Depth BFS (Skewed)', maxDepthBFS, skewedTree);
runBenchmark('Max Depth DFS (Balanced)', maxDepthDFS, balancedTree);
runBenchmark('Max Depth BFS (Balanced)', maxDepthBFS, balancedTree);


console.log('\n--- Path Sum III (Target 100 for Skewed Tree, 25000 for Balanced Tree) ---');
runBenchmark('Path Sum III Recursive (Skewed)', pathSumRecursive, skewedTree, 100); // Target sum that might exist
runBenchmark('Path Sum III Optimized (Skewed)', pathSumOptimized, skewedTree, 100);
runBenchmark('Path Sum III Recursive (Balanced)', pathSumRecursive, balancedTree, 25000); // Target sum that might exist (mid-range value)
runBenchmark('Path Sum III Optimized (Balanced)', pathSumOptimized, balancedTree, 25000);
```