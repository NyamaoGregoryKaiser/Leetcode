```javascript
const { buildTree } = require('../src/utils/treeBuilder');
const { inorderTraversal, preorderTraversal, postorderTraversal } = require('../src/traversals/recursiveTraversals');
const { inorderTraversalIterative, preorderTraversalIterative, postorderTraversalIterative } = require('../src/traversals/iterativeTraversals');
const { levelOrderTraversal } = require('../src/traversals/bfsLevelOrder');
const { maxDepthDFS, maxDepthBFS } = require('../src/problems/p1_maxDepth');
const { pathSum, pathSumOptimized } = require('../src/problems/p4_pathSumIII');

/**
 * @file traversalBenchmarks.js
 * @description Benchmarks the performance of various tree traversal algorithms and problem solutions.
 * Compares recursive vs iterative traversals, and O(N^2) vs O(N) solutions.
 */

// --- Helper for Tree Generation ---

/**
 * Generates a complete binary tree of a given depth.
 * @param {number} depth - The desired depth of the tree.
 * @returns {Array<number|null>} Array representation of the complete tree.
 */
function generateCompleteTreeArray(depth) {
    if (depth <= 0) return [];
    const numNodes = Math.pow(2, depth) - 1;
    const arr = [];
    for (let i = 0; i < numNodes; i++) {
        arr.push(i + 1); // Fill with sequential numbers
    }
    return arr;
}

/**
 * Generates a skewed binary tree (right skewed) of a given depth.
 * @param {number} depth - The desired depth of the tree.
 * @returns {Array<number|null>} Array representation of the skewed tree.
 */
function generateSkewedTreeArray(depth) {
    if (depth <= 0) return [];
    const arr = [];
    for (let i = 0; i < depth; i++) {
        arr.push(i + 1);
        if (i < depth - 1) {
            arr.push(null); // No left child
        }
    }
    return arr;
}

// --- Benchmarking Utility ---

function benchmark(name, func, ...args) {
    const start = performance.now();
    const result = func(...args);
    const end = performance.now();
    console.log(`- ${name}: ${(end - start).toFixed(4)} ms`);
    // Optional: return result for verification if needed
    return result;
}

// --- Main Benchmark Runner ---

function runBenchmarks() {
    console.log("--- Tree Traversal Benchmarks ---");
    console.log(`Node.js version: ${process.version}`);
    console.log(`Date: ${new Date().toISOString()}`);

    // --- Scenario 1: Small Tree (for sanity check) ---
    console.log("\n--- Small Tree (Depth 3, 7 nodes) ---");
    const smallTreeArray = generateCompleteTreeArray(3); // [1,2,3,4,5,6,7]
    const smallTree = buildTree(smallTreeArray);

    benchmark("Recursive Inorder (small)", inorderTraversal, smallTree);
    benchmark("Iterative Inorder (small)", inorderTraversalIterative, smallTree);
    benchmark("Recursive Preorder (small)", preorderTraversal, smallTree);
    benchmark("Iterative Preorder (small)", preorderTraversalIterative, smallTree);
    benchmark("Recursive Postorder (small)", postorderTraversal, smallTree);
    benchmark("Iterative Postorder (small)", postorderTraversalIterative, smallTree);
    benchmark("Level Order (BFS) (small)", levelOrderTraversal, smallTree);
    benchmark("Max Depth DFS (small)", maxDepthDFS, smallTree);
    benchmark("Max Depth BFS (small)", maxDepthBFS, smallTree);
    benchmark("Path Sum III (O(N^2)) (small)", pathSum, smallTree, 8); // Example target
    benchmark("Path Sum III (O(N)) (small)", pathSumOptimized, smallTree, 8); // Example target


    // --- Scenario 2: Medium-sized Balanced Tree ---
    const MEDIUM_DEPTH = 12; // ~4095 nodes
    const mediumTreeArray = generateCompleteTreeArray(MEDIUM_DEPTH);
    const mediumTree = buildTree(mediumTreeArray);
    console.log(`\n--- Medium Balanced Tree (Depth ${MEDIUM_DEPTH}, ${mediumTreeArray.length} nodes) ---`);

    benchmark("Recursive Inorder (medium)", inorderTraversal, mediumTree);
    benchmark("Iterative Inorder (medium)", inorderTraversalIterative, mediumTree);
    benchmark("Recursive Preorder (medium)", preorderTraversal, mediumTree);
    benchmark("Iterative Preorder (medium)", preorderTraversalIterative, mediumTree);
    benchmark("Recursive Postorder (medium)", postorderTraversal, mediumTree);
    benchmark("Iterative Postorder (medium)", postorderTraversalIterative, mediumTree);
    benchmark("Level Order (BFS) (medium)", levelOrderTraversal, mediumTree);
    benchmark("Max Depth DFS (medium)", maxDepthDFS, mediumTree);
    benchmark("Max Depth BFS (medium)", maxDepthBFS, mediumTree);
    benchmark("Path Sum III (O(N^2)) (medium)", pathSum, mediumTree, MEDIUM_DEPTH * 2); // Example target
    benchmark("Path Sum III (O(N)) (medium)", pathSumOptimized, mediumTree, MEDIUM_DEPTH * 2); // Example target


    // --- Scenario 3: Large Balanced Tree ---
    const LARGE_DEPTH = 16; // ~65535 nodes
    const largeTreeArray = generateCompleteTreeArray(LARGE_DEPTH);
    const largeTree = buildTree(largeTreeArray);
    console.log(`\n--- Large Balanced Tree (Depth ${LARGE_DEPTH}, ${largeTreeArray.length} nodes) ---`);

    benchmark("Recursive Inorder (large)", inorderTraversal, largeTree);
    benchmark("Iterative Inorder (large)", inorderTraversalIterative, largeTree);
    benchmark("Recursive Preorder (large)", preorderTraversal, largeTree);
    benchmark("Iterative Preorder (large)", preorderTraversalIterative, largeTree);
    benchmark("Recursive Postorder (large)", postorderTraversal, largeTree);
    benchmark("Iterative Postorder (large)", postorderTraversalIterative, largeTree);
    benchmark("Level Order (BFS) (large)", levelOrderTraversal, largeTree);
    benchmark("Max Depth DFS (large)", maxDepthDFS, largeTree);
    benchmark("Max Depth BFS (large)", maxDepthBFS, largeTree);
    benchmark("Path Sum III (O(N^2)) (large)", pathSum, largeTree, LARGE_DEPTH * 2); // Example target
    benchmark("Path Sum III (O(N)) (large)", pathSumOptimized, largeTree, LARGE_DEPTH * 2); // Example target


    // --- Scenario 4: Deep Skewed Tree (Recursive vs Iterative) ---
    // Note: JS recursion limit is around 10k-100k depending on engine/environment.
    // Setting it lower to avoid actual stack overflow during test, but demonstrate difference.
    const SKEWED_DEPTH = 1000; // Large depth for skewed tree
    const skewedTreeArray = generateSkewedTreeArray(SKEWED_DEPTH);
    const skewedTree = buildTree(skewedTreeArray);
    console.log(`\n--- Deep Skewed Tree (Depth ${SKEWED_DEPTH}, ${skewedTreeArray.filter(v => v !== null).length} nodes) ---`);

    // Recursive traversals will likely hit stack limit for SKEWED_DEPTH > ~10000 (default in Node is 10k stack frames)
    // For depth 1000, it should generally be fine on most systems, but iterative will show its robustness.
    console.log("  (Note: Recursive methods on skewed trees might hit stack limits for very high depths)");

    // Try/catch for recursive skewed to demonstrate potential stack overflow for extremely deep trees
    try {
        benchmark("Recursive Inorder (skewed)", inorderTraversal, skewedTree);
    } catch (e) {
        console.log(`- Recursive Inorder (skewed): FAILED with Error: ${e.message.split('\n')[0]}`);
    }
    benchmark("Iterative Inorder (skewed)", inorderTraversalIterative, skewedTree);

    try {
        benchmark("Recursive Preorder (skewed)", preorderTraversal, skewedTree);
    } catch (e) {
        console.log(`- Recursive Preorder (skewed): FAILED with Error: ${e.message.split('\n')[0]}`);
    }
    benchmark("Iterative Preorder (skewed)", preorderTraversalIterative, skewedTree);

    try {
        benchmark("Recursive Postorder (skewed)", postorderTraversal, skewedTree);
    } catch (e) {
        console.log(`- Recursive Postorder (skewed): FAILED with Error: ${e.message.split('\n')[0]}`);
    }
    benchmark("Iterative Postorder (skewed)", postorderTraversalIterative, skewedTree);

    // Max Depth
    try {
        benchmark("Max Depth DFS (skewed)", maxDepthDFS, skewedTree);
    } catch (e) {
        console.log(`- Max Depth DFS (skewed): FAILED with Error: ${e.message.split('\n')[0]}`);
    }
    benchmark("Max Depth BFS (skewed)", maxDepthBFS, skewedTree);

    // Path Sum III - O(N^2) for skewed tree is O(N^2), O(N) is O(N)
    // For SKEWED_DEPTH = 1000, N=1000. N^2 = 1,000,000. This might be slow.
    // Let's use a smaller skewed tree for O(N^2) comparison
    const SMALLER_SKEWED_DEPTH = 500;
    const smallerSkewedTree = buildTree(generateSkewedTreeArray(SMALLER_SKEWED_DEPTH));
    console.log(`\n--- Smaller Skewed Tree (Depth ${SMALLER_SKEWED_DEPTH}, ${SMALLER_SKEWED_DEPTH} nodes) for Path Sum III ---`);
    try {
        benchmark("Path Sum III (O(N^2)) (smaller skewed)", pathSum, smallerSkewedTree, 100);
    } catch (e) {
        console.log(`- Path Sum III (O(N^2)) (smaller skewed): FAILED with Error: ${e.message.split('\n')[0]}`);
    }
    benchmark("Path Sum III (O(N)) (smaller skewed)", pathSumOptimized, smallerSkewedTree, 100);

    console.log("\n--- Benchmarks Complete ---");
}

runBenchmarks();
```