```javascript
/**
 * @fileoverview Performance benchmarking script for tree traversal algorithms.
 * Compares recursive vs iterative solutions and optimized vs brute-force.
 */

const { buildTreeFromArray } = require('../src/utils/TreeBuilder');
const {
    preorderTraversalRecursive, preorderTraversalIterative,
    inorderTraversalRecursive, inorderTraversalIterative,
    postorderTraversalRecursive, postorderTraversalIterativeTwoStacks
} = require('../src/problems/TraversalBasics');
const { levelOrderTraversal } = require('../src/problems/LevelOrderTraversal');
const { zigzagLevelOrder } = require('../src/problems/ZigzagLevelOrder');
const {
    maxDepthRecursive, maxDepthIterativeBFS, maxDepthIterativeDFS
} = require('../src/problems/MaxDepth');
const { pathSum, pathSumBruteForce } = require('../src/problems/PathSumIII');

/**
 * Generates a deep skewed tree.
 * @param {number} depth The desired depth of the tree.
 * @param {string} type 'left' or 'right' for skew direction.
 * @returns {Array<number|null>} Array representation of the skewed tree.
 */
function generateSkewedTreeArray(depth, type = 'left') {
    if (depth === 0) return [];
    const arr = new Array(Math.pow(2, depth) - 1).fill(null);
    let currentVal = 1;
    let idx = 0;
    arr[idx] = currentVal++;

    for (let i = 0; i < depth - 1; i++) {
        if (type === 'left') {
            idx = 2 * idx + 1; // Go left
        } else {
            idx = 2 * idx + 2; // Go right
        }
        if (idx < arr.length) {
            arr[idx] = currentVal++;
        } else {
            break; // Should not happen if depth is reasonable
        }
    }
    // Fill the rest with some values if array is bigger than path
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === null) {
            arr[i] = currentVal++;
        }
    }
    return arr;
}

/**
 * Generates a complete binary tree array.
 * @param {number} depth The desired depth of the tree.
 * @returns {Array<number|null>} Array representation of the complete tree.
 */
function generateCompleteTreeArray(depth) {
    if (depth === 0) return [];
    const numNodes = Math.pow(2, depth) - 1;
    const arr = new Array(numNodes);
    for (let i = 0; i < numNodes; i++) {
        arr[i] = i + 1;
    }
    return arr;
}

/**
 * Runs a benchmark for a given function.
 * @param {string} name The name of the function being benchmarked.
 * @param {function} func The function to benchmark.
 * @param {Array<any>} args The arguments to pass to the function.
 * @param {number} iterations Number of times to run the function.
 * @returns {number} The average execution time in milliseconds.
 */
function runBenchmark(name, func, args, iterations = 1000) {
    let totalTime = 0;
    for (let i = 0; i < iterations; i++) {
        const startTime = process.hrtime.bigint();
        func(...args);
        const endTime = process.hrtime.bigint();
        totalTime += Number(endTime - startTime) / 1_000_000; // Convert nanoseconds to milliseconds
    }
    const avgTime = totalTime / iterations;
    console.log(`  ${name}: ${avgTime.toFixed(4)} ms (avg over ${iterations} runs)`);
    return avgTime;
}

console.log("--- Starting Tree Traversal Benchmarks ---");

const SMALL_TREE_DEPTH = 5; // ~31 nodes
const MEDIUM_TREE_DEPTH = 10; // ~1023 nodes
const LARGE_TREE_DEPTH = 14; // ~16383 nodes (Max for recursion stack without increasing limit)
const XL_TREE_DEPTH = 17; // ~131071 nodes (Can hit stack limits, iterative solutions only)

const treeSizes = {
    small_complete: buildTreeFromArray(generateCompleteTreeArray(SMALL_TREE_DEPTH)),
    medium_complete: buildTreeFromArray(generateCompleteTreeArray(MEDIUM_TREE_DEPTH)),
    large_complete: buildTreeFromArray(generateCompleteTreeArray(LARGE_TREE_DEPTH)),
    small_skewed: buildTreeFromArray(generateSkewedTreeArray(SMALL_TREE_DEPTH, 'right')),
    medium_skewed: buildTreeFromArray(generateSkewedTreeArray(MEDIUM_TREE_DEPTH, 'right')),
    large_skewed: buildTreeFromArray(generateSkewedTreeArray(LARGE_TREE_DEPTH, 'right'))
};

// For very large trees, recursive solutions might hit stack limits.
// We only benchmark iterative for XL.
const xl_complete_array = generateCompleteTreeArray(XL_TREE_DEPTH);
const xl_skewed_array = generateSkewedTreeArray(XL_TREE_DEPTH, 'right');

// --- Benchmark Basic DFS Traversals ---
console.log("\n### Basic DFS Traversals (Preorder, Inorder, Postorder) ###");
for (const [key, root] of Object.entries(treeSizes)) {
    if (!root) continue;
    console.log(`\n--- Tree Size: ${key} (${key.includes('complete') ? (Math.pow(2, key.split('_')[0] === 'small' ? SMALL_TREE_DEPTH : key.split('_')[0] === 'medium' ? MEDIUM_TREE_DEPTH : LARGE_TREE_DEPTH) - 1) : (key.split('_')[0] === 'small' ? SMALL_TREE_DEPTH : key.split('_')[0] === 'medium' ? MEDIUM_TREE_DEPTH : LARGE_TREE_DEPTH)} nodes) ---`);

    console.log("Preorder:");
    runBenchmark("  Recursive", preorderTraversalRecursive, [root]);
    runBenchmark("  Iterative", preorderTraversalIterative, [root]);

    console.log("Inorder:");
    runBenchmark("  Recursive", inorderTraversalRecursive, [root]);
    runBenchmark("  Iterative", inorderTraversalIterative, [root]);

    console.log("Postorder:");
    runBenchmark("  Recursive", postorderTraversalRecursive, [root]);
    runBenchmark("  Iterative (Two Stacks)", postorderTraversalIterativeTwoStacks, [root]);
    // The one-stack iterative postorder is significantly more complex and often slower
    // due to repeated stack peeking and conditions, so it's not included in basic comparison.
}

// --- Benchmark BFS Traversals ---
console.log("\n### BFS Traversals (Level Order, Zigzag Level Order) ###");
for (const [key, root] of Object.entries(treeSizes)) {
    if (!root) continue;
    console.log(`\n--- Tree Size: ${key} (${key.includes('complete') ? (Math.pow(2, key.split('_')[0] === 'small' ? SMALL_TREE_DEPTH : key.split('_')[0] === 'medium' ? MEDIUM_TREE_DEPTH : LARGE_TREE_DEPTH) - 1) : (key.split('_')[0] === 'small' ? SMALL_TREE_DEPTH : key.split('_')[0] === 'medium' ? MEDIUM_TREE_DEPTH : LARGE_TREE_DEPTH)} nodes) ---`);

    console.log("Level Order:");
    runBenchmark("  Level Order", levelOrderTraversal, [root]);

    console.log("Zigzag Level Order:");
    runBenchmark("  Zigzag Level Order", zigzagLevelOrder, [root]);
}

// --- Benchmark Max Depth ---
console.log("\n### Max Depth of Binary Tree ###");
for (const [key, root] of Object.entries(treeSizes)) {
    if (!root) continue;
    console.log(`\n--- Tree Size: ${key} (${key.includes('complete') ? (Math.pow(2, key.split('_')[0] === 'small' ? SMALL_TREE_DEPTH : key.split('_')[0] === 'medium' ? MEDIUM_TREE_DEPTH : LARGE_TREE_DEPTH) - 1) : (key.split('_')[0] === 'small' ? SMALL_TREE_DEPTH : key.split('_')[0] === 'medium' ? MEDIUM_TREE_DEPTH : LARGE_TREE_DEPTH)} nodes) ---`);

    console.log("Max Depth:");
    runBenchmark("  Recursive (DFS)", maxDepthRecursive, [root]);
    runBenchmark("  Iterative (BFS)", maxDepthIterativeBFS, [root]);
    runBenchmark("  Iterative (DFS with explicit stack)", maxDepthIterativeDFS, [root]);
}

// Special benchmark for XL trees to test iterative solutions vs potential stack overflow for recursive
console.log("\n### Max Depth for VERY LARGE trees (Iterative Only) ###");
try {
    const xl_complete_root = buildTreeFromArray(xl_complete_array);
    console.log(`\n--- Tree Size: XL Complete (~${xl_complete_array.length} nodes) ---`);
    runBenchmark("  Max Depth Iterative (BFS)", maxDepthIterativeBFS, [xl_complete_root], 100);
    runBenchmark("  Max Depth Iterative (DFS with explicit stack)", maxDepthIterativeDFS, [xl_complete_root], 100);
} catch (e) {
    console.warn(`  Could not build XL_COMPLETE tree due to memory limits: ${e.message}`);
}
try {
    const xl_skewed_root = buildTreeFromArray(xl_skewed_array);
    console.log(`\n--- Tree Size: XL Skewed (~${xl_skewed_array.length} nodes) ---`);
    runBenchmark("  Max Depth Iterative (BFS)", maxDepthIterativeBFS, [xl_skewed_root], 100);
    runBenchmark("  Max Depth Iterative (DFS with explicit stack)", maxDepthIterativeDFS, [xl_skewed_root], 100);
} catch (e) {
    console.warn(`  Could not build XL_SKEWED tree due to memory limits: ${e.message}`);
}


// --- Benchmark Path Sum III ---
console.log("\n### Path Sum III ###");
const PS_TARGET = 8;
const ps_tree_small = buildTreeFromArray([10, 5, -3, 3, 2, null, 11, 3, -2, null, 1]); // Example tree from problem
const ps_tree_medium = buildTreeFromArray(generateCompleteTreeArray(10)); // Complete tree, values 1 to 1023
const ps_tree_large_skewed = buildTreeFromArray(generateSkewedTreeArray(14, 'right')); // Skewed tree, values 1 to 14

console.log("\n--- Small Tree (Problem Example) ---");
runBenchmark("  Path Sum (Optimized)", pathSum, [ps_tree_small, PS_TARGET]);
runBenchmark("  Path Sum (Brute Force)", pathSumBruteForce, [ps_tree_small, PS_TARGET]);

console.log("\n--- Medium Complete Tree (values 1 to 1023) ---");
const medium_complete_target_sum = 250; // Example target sum
runBenchmark("  Path Sum (Optimized)", pathSum, [ps_tree_medium, medium_complete_target_sum], 100);
runBenchmark("  Path Sum (Brute Force)", pathSumBruteForce, [ps_tree_medium, medium_complete_target_sum], 10); // Brute force is O(N^2), reduce iterations

console.log("\n--- Large Skewed Tree (values 1 to 14) ---");
const large_skewed_target_sum = 10; // Example target sum
runBenchmark("  Path Sum (Optimized)", pathSum, [ps_tree_large_skewed, large_skewed_target_sum], 100);
runBenchmark("  Path Sum (Brute Force)", pathSumBruteForce, [ps_tree_large_skewed, large_skewed_target_sum], 1); // Very slow for large skewed

console.log("\n--- Benchmarks Finished ---");
```