```javascript
const {
    inorderTraversalRecursive,
    inorderTraversalIterative,
    preorderTraversalRecursive,
    preorderTraversalIterative,
    postorderTraversalRecursive,
    postorderTraversalIterativeTwoStacks,
    postorderTraversalIterativeOneStack,
    maxDepthRecursive,
    maxDepthIterativeBFS,
    pathSumIII_BruteForceDFS,
    pathSumIII_OptimizedDFS
} = require('../algorithms/traversalProblems');
const { buildTree } = require('../utils/treeBuilder');
const TreeNode = require('../algorithms/TreeNode'); // For building skewed trees manually

/**
 * Helper function to generate a deep skewed tree.
 * @param {number} depth - The desired depth of the tree.
 * @param {string} type - 'left' or 'right' for skew.
 * @returns {TreeNode} - The root of the skewed tree.
 */
function createDeepSkewedTree(depth, type = 'left') {
    if (depth <= 0) return null;

    let root = new TreeNode(1);
    let current = root;

    for (let i = 2; i <= depth; i++) {
        const newNode = new TreeNode(i);
        if (type === 'left') {
            current.left = newNode;
        } else {
            current.right = newNode;
        }
        current = newNode;
    }
    return root;
}

/**
 * Helper function to generate a complete binary tree of a given depth.
 * This will have N = 2^(depth)-1 nodes.
 * @param {number} depth - The desired depth of the tree.
 * @returns {TreeNode} - The root of the complete binary tree.
 */
function createCompleteBinaryTree(depth) {
    if (depth <= 0) return null;

    let nodesCount = Math.pow(2, depth) - 1;
    const values = Array.from({ length: nodesCount }, (_, i) => i + 1);
    // Use the buildTree utility, as it handles the array-to-tree conversion for complete trees well.
    return buildTree(values);
}

// --- Benchmarking Setup ---
console.log('--- Performance Benchmarks for Tree Traversals ---');

const RUNS = 1000; // Number of times to run each test to average performance

function benchmark(name, func, tree, ...args) {
    const start = process.hrtime.bigint();
    for (let i = 0; i < RUNS; i++) {
        func(tree, ...args);
    }
    const end = process.hrtime.bigint();
    const durationNs = end - start;
    const durationMs = Number(durationNs) / 1_000_000;
    console.log(`  ${name}: ${durationMs.toFixed(3)} ms (avg per run: ${(durationMs / RUNS).toFixed(6)} ms)`);
}

// --- Test Cases ---

// 1. Small Balanced Tree
const smallBalancedTree = createCompleteBinaryTree(3); // 7 nodes
console.log('\nBenchmarking on Small Balanced Tree (Depth 3, 7 nodes):');
benchmark('Inorder Recursive', inorderTraversalRecursive, smallBalancedTree);
benchmark('Inorder Iterative', inorderTraversalIterative, smallBalancedTree);
benchmark('Preorder Recursive', preorderTraversalRecursive, smallBalancedTree);
benchmark('Preorder Iterative', preorderTraversalIterative, smallBalancedTree);
benchmark('Postorder Recursive', postorderTraversalRecursive, smallBalancedTree);
benchmark('Postorder Iterative (Two Stacks)', postorderTraversalIterativeTwoStacks, smallBalancedTree);
benchmark('Postorder Iterative (One Stack)', postorderTraversalIterativeOneStack, smallBalancedTree);
benchmark('Max Depth Recursive', maxDepthRecursive, smallBalancedTree);
benchmark('Max Depth Iterative (BFS)', maxDepthIterativeBFS, smallBalancedTree);
benchmark('Path Sum III (Brute Force)', pathSumIII_BruteForceDFS, smallBalancedTree, 6);
benchmark('Path Sum III (Optimized DFS)', pathSumIII_OptimizedDFS, smallBalancedTree, 6);


// 2. Medium Balanced Tree
const mediumBalancedTree = createCompleteBinaryTree(10); // 1023 nodes
console.log('\nBenchmarking on Medium Balanced Tree (Depth 10, 1023 nodes):');
benchmark('Inorder Recursive', inorderTraversalRecursive, mediumBalancedTree);
benchmark('Inorder Iterative', inorderTraversalIterative, mediumBalancedTree);
benchmark('Preorder Recursive', preorderTraversalRecursive, mediumBalancedTree);
benchmark('Preorder Iterative', preorderTraversalIterative, mediumBalancedTree);
benchmark('Postorder Recursive', postorderTraversalRecursive, mediumBalancedTree);
benchmark('Postorder Iterative (Two Stacks)', postorderTraversalIterativeTwoStacks, mediumBalancedTree);
benchmark('Postorder Iterative (One Stack)', postorderTraversalIterativeOneStack, mediumBalancedTree);
benchmark('Max Depth Recursive', maxDepthRecursive, mediumBalancedTree);
benchmark('Max Depth Iterative (BFS)', maxDepthIterativeBFS, mediumBalancedTree);
benchmark('Path Sum III (Brute Force)', pathSumIII_BruteForceDFS, mediumBalancedTree, 15);
benchmark('Path Sum III (Optimized DFS)', pathSumIII_OptimizedDFS, mediumBalancedTree, 15);


// 3. Large Skewed Tree (Deep recursion stack vs. iterative)
// Note: For very deep recursion, Node.js default stack limit might be hit.
// You might need to increase it with `node --stack-size=2000` for depths > ~1000.
// Let's use a depth that usually works without explicit stack increase.
const largeSkewedTreeDepth = 1000;
const largeSkewedTree = createDeepSkewedTree(largeSkewedTreeDepth, 'right'); // 1000 nodes
console.log(`\nBenchmarking on Large Skewed Tree (Depth ${largeSkewedTreeDepth}, ${largeSkewedTreeDepth} nodes):`);
// Note: Recursive solutions might throw "Maximum call stack size exceeded" for very deep trees.
// For this depth, they might still pass depending on Node.js version/env.
// The primary goal here is to show *relative* performance, especially where iterative shines.
try {
    benchmark('Inorder Recursive', inorderTraversalRecursive, largeSkewedTree);
} catch (e) { console.log('  Inorder Recursive: Stack overflow for deep skewed tree.'); }
benchmark('Inorder Iterative', inorderTraversalIterative, largeSkewedTree);
try {
    benchmark('Preorder Recursive', preorderTraversalRecursive, largeSkewedTree);
} catch (e) { console.log('  Preorder Recursive: Stack overflow for deep skewed tree.'); }
benchmark('Preorder Iterative', preorderTraversalIterative, largeSkewedTree);
try {
    benchmark('Postorder Recursive', postorderTraversalRecursive, largeSkewedTree);
} catch (e) { console.log('  Postorder Recursive: Stack overflow for deep skewed tree.'); }
benchmark('Postorder Iterative (Two Stacks)', postorderTraversalIterativeTwoStacks, largeSkewedTree);
benchmark('Postorder Iterative (One Stack)', postorderTraversalIterativeOneStack, largeSkewedTree);
try {
    benchmark('Max Depth Recursive', maxDepthRecursive, largeSkewedTree);
} catch (e) { console.log('  Max Depth Recursive: Stack overflow for deep skewed tree.'); }
benchmark('Max Depth Iterative (BFS)', maxDepthIterativeBFS, largeSkewedTree);
// Path Sum III target chosen to be a sum that's likely found on a path.
// Sum of 1 to N is N*(N+1)/2. For N=1000, sum = 500500. Let's pick a smaller target.
// A path from 1 to 10 will sum to 1+2+..+10 = 55.
benchmark('Path Sum III (Brute Force)', pathSumIII_BruteForceDFS, largeSkewedTree, 55);
benchmark('Path Sum III (Optimized DFS)', pathSumIII_OptimizedDFS, largeSkewedTree, 55);


// 4. Large Balanced Tree (More nodes, but less recursion depth for some)
const largeBalancedTreeDepth = 15; // ~32k nodes
const largeBalancedTree = createCompleteBinaryTree(largeBalancedTreeDepth);
console.log(`\nBenchmarking on Large Balanced Tree (Depth ${largeBalancedTreeDepth}, ${Math.pow(2, largeBalancedTreeDepth) - 1} nodes):`);
benchmark('Inorder Recursive', inorderTraversalRecursive, largeBalancedTree);
benchmark('Inorder Iterative', inorderTraversalIterative, largeBalancedTree);
benchmark('Preorder Recursive', preorderTraversalRecursive, largeBalancedTree);
benchmark('Preorder Iterative', preorderTraversalIterative, largeBalancedTree);
benchmark('Postorder Recursive', postorderTraversalRecursive, largeBalancedTree);
benchmark('Postorder Iterative (Two Stacks)', postorderTraversalIterativeTwoStacks, largeBalancedTree);
benchmark('Postorder Iterative (One Stack)', postorderTraversalIterativeOneStack, largeBalancedTree);
benchmark('Max Depth Recursive', maxDepthRecursive, largeBalancedTree);
benchmark('Max Depth Iterative (BFS)', maxDepthIterativeBFS, largeBalancedTree);
// A simple target sum for large balanced tree, e.g., sum of path to a leaf at depth 3
benchmark('Path Sum III (Brute Force)', pathSumIII_BruteForceDFS, largeBalancedTree, 15); // e.g. 1->2->4->8 == 15
benchmark('Path Sum III (Optimized DFS)', pathSumIII_OptimizedDFS, largeBalancedTree, 15);

console.log('\n--- Benchmarks Complete ---');
```