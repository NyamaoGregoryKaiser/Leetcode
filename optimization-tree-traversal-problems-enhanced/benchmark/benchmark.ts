/**
 * @fileoverview Performance benchmarking for tree traversal algorithms.
 * This file compares the execution time of different traversal methods (recursive vs. iterative)
 * and problem solutions on varying tree sizes.
 */

import { TreeNode, buildTreeFromArray } from '../src/utils/treeNode';
import { StandardTraversals } from '../src/problems/standardTraversals';
import { LevelOrderTraversal } from '../src/problems/levelOrderTraversal';
import { ZigzagLevelOrder } from '../src/problems/zigzagLevelOrder';
import { RightSideView } from '../src/problems/rightSideView';

// Initialize algorithm classes
const standardTraversals = new StandardTraversals();
const levelOrderTraversal = new LevelOrderTraversal();
const zigzagLevelOrder = new ZigzagLevelOrder();
const rightSideView = new RightSideView();

/**
 * Generates a full binary tree with a given number of nodes.
 * @param numNodes The total number of nodes in the tree.
 * @returns An array representation of a full binary tree.
 */
function generateFullTreeArray(numNodes: number): (number | null)[] {
    const arr: (number | null)[] = [];
    for (let i = 1; i <= numNodes; i++) {
        arr.push(i);
    }
    return arr;
}

/**
 * Generates a skewed binary tree (left-skewed) with a given number of nodes.
 * @param numNodes The total number of nodes in the tree.
 * @returns An array representation of a left-skewed binary tree.
 */
function generateSkewedTreeArray(numNodes: number): (number | null)[] {
    const arr: (number | null)[] = new Array(numNodes * 2).fill(null);
    for (let i = 0; i < numNodes; i++) {
        arr[i * 2] = i + 1; // Put nodes on the left side
    }
    return arr.slice(0, numNodes * 2 - 1); // Trim potentially unused nulls at the end
}


/**
 * Runs a benchmark for a given function and tree size.
 * @param name Name of the benchmark.
 * @param func The function to benchmark.
 * @param root The root of the tree to pass to the function.
 * @param iterations Number of times to run the function for measurement.
 * @returns The average execution time in milliseconds.
 */
function runBenchmark(name: string, func: (root: TreeNode | null) => any, root: TreeNode | null, iterations: number = 100): number {
    let totalTime = 0;
    for (let i = 0; i < iterations; i++) {
        const start = process.hrtime.bigint();
        func(root);
        const end = process.hrtime.bigint();
        totalTime += Number(end - start) / 1_000_000; // Convert nanoseconds to milliseconds
    }
    return totalTime / iterations;
}

const treeSizes = [100, 1000, 10000, 50000]; // Number of nodes

console.log('--- Binary Tree Traversal Benchmarks ---');
console.log('Note: Times are average over 100 iterations. Small numbers may have high variance due to system noise.');
console.log('----------------------------------------');

treeSizes.forEach(size => {
    console.log(`\nBenchmarking with ${size} nodes:`);

    // Generate balanced tree
    const balancedTreeArray = generateFullTreeArray(size);
    const balancedTree = buildTreeFromArray(balancedTreeArray);

    // Generate skewed tree (worst case for recursion stack)
    const skewedTreeArray = generateSkewedTreeArray(size);
    const skewedTree = buildTreeFromArray(skewedTreeArray);

    // --- Standard Traversals ---
    console.log('\n  Standard DFS Traversals (Recursive vs Iterative):');
    const inorderRecTime = runBenchmark('Inorder Recursive', (r) => standardTraversals.inorderTraversalRecursive(r), balancedTree);
    const inorderIterTime = runBenchmark('Inorder Iterative', (r) => standardTraversals.inorderTraversalIterative(r), balancedTree);
    const preorderRecTime = runBenchmark('Preorder Recursive', (r) => standardTraversals.preorderTraversalRecursive(r), balancedTree);
    const preorderIterTime = runBenchmark('Preorder Iterative', (r) => standardTraversals.preorderTraversalIterative(r), balancedTree);
    const postorderRecTime = runBenchmark('Postorder Recursive', (r) => standardTraversals.postorderTraversalRecursive(r), balancedTree);
    const postorderIterTime = runBenchmark('Postorder Iterative (Two Stacks)', (r) => standardTraversals.postorderTraversalIterative(r), balancedTree);
    const postorderIterSingleStackTime = runBenchmark('Postorder Iterative (Single Stack)', (r) => standardTraversals.postorderTraversalIterativeSingleStack(r), balancedTree);

    console.log(`    Inorder Recursive (Balanced): ${inorderRecTime.toFixed(4)} ms`);
    console.log(`    Inorder Iterative (Balanced): ${inorderIterTime.toFixed(4)} ms`);
    console.log(`    Preorder Recursive (Balanced): ${preorderRecTime.toFixed(4)} ms`);
    console.log(`    Preorder Iterative (Balanced): ${preorderIterTime.toFixed(4)} ms`);
    console.log(`    Postorder Recursive (Balanced): ${postorderRecTime.toFixed(4)} ms`);
    console.log(`    Postorder Iterative (Two Stacks, Balanced): ${postorderIterTime.toFixed(4)} ms`);
    console.log(`    Postorder Iterative (Single Stack, Balanced): ${postorderIterSingleStackTime.toFixed(4)} ms`);

    // Test skewed tree for recursion stack depth impact
    if (size <= 10000) { // Avoid stack overflow for very large skewed trees with recursion
        const inorderRecSkewedTime = runBenchmark('Inorder Recursive (Skewed)', (r) => standardTraversals.inorderTraversalRecursive(r), skewedTree);
        const preorderRecSkewedTime = runBenchmark('Preorder Recursive (Skewed)', (r) => standardTraversals.preorderTraversalRecursive(r), skewedTree);
        const postorderRecSkewedTime = runBenchmark('Postorder Recursive (Skewed)', (r) => standardTraversals.postorderTraversalRecursive(r), skewedTree);
        console.log(`    Inorder Recursive (Skewed): ${inorderRecSkewedTime.toFixed(4)} ms`);
        console.log(`    Preorder Recursive (Skewed): ${preorderRecSkewedTime.toFixed(4)} ms`);
        console.log(`    Postorder Recursive (Skewed): ${postorderRecSkewedTime.toFixed(4)} ms`);
    } else {
        console.log(`    Recursive skewed tree benchmarks skipped for size ${size} to prevent stack overflow.`);
    }

    const inorderIterSkewedTime = runBenchmark('Inorder Iterative (Skewed)', (r) => standardTraversals.inorderTraversalIterative(r), skewedTree);
    const preorderIterSkewedTime = runBenchmark('Preorder Iterative (Skewed)', (r) => standardTraversals.preorderTraversalIterative(r), skewedTree);
    const postorderIterSkewedTime = runBenchmark('Postorder Iterative (Two Stacks, Skewed)', (r) => standardTraversals.postorderTraversalIterative(r), skewedTree);
    const postorderIterSingleStackSkewedTime = runBenchmark('Postorder Iterative (Single Stack, Skewed)', (r) => standardTraversals.postorderTraversalIterativeSingleStack(r), skewedTree);

    console.log(`    Inorder Iterative (Skewed): ${inorderIterSkewedTime.toFixed(4)} ms`);
    console.log(`    Preorder Iterative (Skewed): ${preorderIterSkewedTime.toFixed(4)} ms`);
    console.log(`    Postorder Iterative (Two Stacks, Skewed): ${postorderIterSkewedTime.toFixed(4)} ms`);
    console.log(`    Postorder Iterative (Single Stack, Skewed): ${postorderIterSingleStackSkewedTime.toFixed(4)} ms`);


    // --- Other Traversal Problems ---
    console.log('\n  Specialized Traversal Problems (Balanced Tree):');
    const levelOrderTime = runBenchmark('Level Order Traversal', (r) => levelOrderTraversal.levelOrder(r), balancedTree);
    const zigzagLevelOrderTime = runBenchmark('Zigzag Level Order', (r) => zigzagLevelOrder.zigzagLevelOrder(r), balancedTree);
    const rightSideViewBFSTime = runBenchmark('Right Side View (BFS)', (r) => rightSideView.rightSideViewBFS(r), balancedTree);
    const rightSideViewDFSTime = runBenchmark('Right Side View (DFS)', (r) => rightSideView.rightSideViewDFS(r), balancedTree);

    console.log(`    Level Order Traversal (BFS): ${levelOrderTime.toFixed(4)} ms`);
    console.log(`    Zigzag Level Order (BFS variation): ${zigzagLevelOrderTime.toFixed(4)} ms`);
    console.log(`    Right Side View (BFS): ${rightSideViewBFSTime.toFixed(4)} ms`);
    console.log(`    Right Side View (DFS): ${rightSideViewDFSTime.toFixed(4)} ms`);
});

console.log('\n--- Benchmarks Complete ---');