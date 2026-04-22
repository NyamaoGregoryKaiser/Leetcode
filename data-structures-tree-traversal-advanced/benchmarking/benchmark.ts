```typescript
import { performance } from 'perf_hooks';
import { TreeNode } from '../src/data-structures/TreeNode';
import { buildTreeFromArray, createPerfectBinaryTree } from '../src/utils/treeUtils';
import {
    inorderTraversalRecursive, inorderTraversalIterative,
    preorderTraversalRecursive, preorderTraversalIterative,
    postorderTraversalRecursive, postorderTraversalIterativeTwoStacks, postorderTraversalIterativeOneStack
} from '../src/problems/Problem1_DFS_Traversals';
import { levelOrderTraversal } from '../src/problems/Problem2_BFS_LevelOrder';
import { zigzagLevelOrderTraversal } from '../src/problems/Problem3_BFS_ZigzagLevelOrder';
import { isValidBSTRecursive, isValidBSTInorderIterative } from '../src/problems/Problem4_ValidateBST';
import { maxDepthDFS_Recursive, maxDepthBFS_Iterative } from '../src/problems/Problem5_MaxDepth';

// --- Benchmarking Setup ---

interface BenchmarkFunction {
    name: string;
    func: (root: TreeNode | null) => any;
}

function runBenchmark(
    description: string,
    funcGroup: BenchmarkFunction[],
    treeGenerator: (size: number) => TreeNode | null,
    sizes: number[]
) {
    console.log(`\n--- Benchmarking: ${description} ---`);

    for (const size of sizes) {
        let tree: TreeNode | null = null;
        try {
            tree = treeGenerator(size);
            if (tree === null && size > 0) {
                 console.warn(`  Warning: Tree generator returned null for size ${size}. Skipping.`);
                 continue;
            }
        } catch (e) {
            console.error(`  Error creating tree for size ${size}: ${e}`);
            continue;
        }


        console.log(`\n  Tree Size (approx. nodes): ${size}`);

        for (const { name, func } of funcGroup) {
            const start = performance.now();
            let result;
            try {
                result = func(tree);
            } catch (e) {
                console.error(`    Function ${name} failed for size ${size}: ${e}`);
                continue;
            }
            const end = performance.now();
            const timeTaken = (end - start).toFixed(4);
            console.log(`    ${name}: ${timeTaken} ms`);
            // Optional: Log a small part of the result to ensure correctness
            // if (Array.isArray(result) && result.length > 0) {
            //     console.log(`      Sample result: ${JSON.stringify(result.slice(0, 5))}${result.length > 5 ? '...' : ''}`);
            // } else if (typeof result === 'boolean' || typeof result === 'number') {
            //     console.log(`      Result: ${result}`);
            // }
        }
    }
    console.log(`--- End Benchmarking: ${description} ---`);
}


// --- Tree Generation Utilities for Benchmarking ---

/**
 * Generates a perfectly balanced binary tree of a given depth.
 * Number of nodes N = 2^(depth+1) - 1.
 * Example: depth 0 -> 1 node; depth 1 -> 3 nodes; depth 2 -> 7 nodes.
 */
function generatePerfectTree(depth: number): TreeNode | null {
    if (depth < 0) return null;
    return createPerfectBinaryTree(depth);
}

/**
 * Generates a skewed binary tree (right-skewed for simplicity) of a given number of nodes.
 * This ensures worst-case space complexity for recursive DFS.
 */
function generateSkewedTree(numNodes: number): TreeNode | null {
    if (numNodes <= 0) return null;
    let root = new TreeNode(1);
    let current = root;
    for (let i = 2; i <= numNodes; i++) {
        current.right = new TreeNode(i);
        current = current.right;
    }
    return root;
}

// --- Define Test Sizes ---
// These sizes can be adjusted based on system performance and desired test duration.
const SMALL_SIZES = [10, 100];
const MEDIUM_SIZES = [1000, 5000];
const LARGE_SIZES = [10000, 50000]; // Be cautious with very large skewed trees for recursive solutions due to stack limits.

// Combine sizes for comprehensive testing
const TEST_SIZES_BALANCED = [4, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095]; // Nodes for perfect trees (depth 1 to 11)
const TEST_SIZES_SKEWED = [1000, 5000, 10000, 20000]; // Number of nodes for skewed trees (can hit stack limit)

// --- Run Benchmarks ---

// Problem 1: DFS Traversals
runBenchmark(
    "DFS Traversals (Balanced Tree)",
    [
        { name: "Inorder Recursive", func: inorderTraversalRecursive },
        { name: "Inorder Iterative", func: inorderTraversalIterative },
        { name: "Preorder Recursive", func: preorderTraversalRecursive },
        { name: "Preorder Iterative", func: preorderTraversalIterative },
        { name: "Postorder Recursive", func: postorderTraversalRecursive },
        { name: "Postorder Iterative (Two Stacks)", func: postorderTraversalIterativeTwoStacks },
        { name: "Postorder Iterative (One Stack)", func: postorderTraversalIterativeOneStack }
    ],
    (size) => { // Size here is approximate number of nodes. Convert to depth for perfect tree
        // N = 2^(D+1) - 1 => D+1 = log2(N+1) => D = log2(N+1) - 1
        const depth = Math.floor(Math.log2(size + 1)) - 1;
        return generatePerfectTree(Math.max(0, depth));
    },
    TEST_SIZES_BALANCED
);

runBenchmark(
    "DFS Traversals (Skewed Tree - Worst Case for Recursion Stack)",
    [
        { name: "Inorder Recursive", func: inorderTraversalRecursive },
        { name: "Inorder Iterative", func: inorderTraversalIterative },
        { name: "Preorder Recursive", func: preorderTraversalRecursive },
        { name: "Preorder Iterative", func: preorderTraversalIterative },
        { name: "Postorder Recursive", func: postorderTraversalRecursive },
        { name: "Postorder Iterative (Two Stacks)", func: postorderTraversalIterativeTwoStacks },
        { name: "Postorder Iterative (One Stack)", func: postorderTraversalIterativeOneStack }
    ],
    generateSkewedTree,
    TEST_SIZES_SKEWED // Be aware of stack overflow for recursive solutions with large N
);


// Problem 2: BFS Level Order Traversal
runBenchmark(
    "BFS Level Order Traversal (Balanced Tree)",
    [
        { name: "Level Order", func: levelOrderTraversal }
    ],
    (size) => { // Size here is approximate number of nodes. Convert to depth for perfect tree
        const depth = Math.floor(Math.log2(size + 1)) - 1;
        return generatePerfectTree(Math.max(0, depth));
    },
    TEST_SIZES_BALANCED
);

// Problem 3: BFS Zigzag Level Order Traversal
runBenchmark(
    "BFS Zigzag Level Order Traversal (Balanced Tree)",
    [
        { name: "Zigzag Level Order", func: zigzagLevelOrderTraversal }
    ],
    (size) => {
        const depth = Math.floor(Math.log2(size + 1)) - 1;
        return generatePerfectTree(Math.max(0, depth));
    },
    TEST_SIZES_BALANCED
);

// Problem 4: Validate BST
runBenchmark(
    "Validate BST (Balanced Tree)",
    [
        { name: "isValidBST Recursive (Range Check)", func: isValidBSTRecursive },
        { name: "isValidBST Iterative (Inorder)", func: isValidBSTInorderIterative }
    ],
    (size) => {
        // For BST validation, we need a valid BST. Let's make a simple one.
        // Node values are important here. Let's make them increasing.
        if (size === 0) return null;
        let root = new TreeNode(size / 2); // approximate middle for root
        const queue: (TreeNode | null)[] = [root];
        let i = 0; // Current index for values
        while (i < size && queue.length > 0) {
            const node = queue.shift();
            if (!node) continue;

            const leftVal = node.val - Math.floor(size / (i * 2 + 3));
            const rightVal = node.val + Math.floor(size / (i * 2 + 3));

            if (i * 2 + 1 < size) { // Left child
                if (node.val > 1) { // Ensure left child is smaller than parent
                    node.left = new TreeNode(node.val - 1); // Simple decreasing values
                    queue.push(node.left);
                } else {
                     // Add some strategy to maintain BST property for large trees
                     // For very large trees, a simple sequential value assignment is easier for performance test
                     // but might not be a "perfect" BST representation for real-world scenarios.
                     // The `createPerfectBinaryTree` with just incrementing numbers is technically a valid BST if values are assigned appropriately.
                     // For benchmarking `isValidBST`, the exact values don't matter as much as the tree structure.
                     // Let's rely on `createPerfectBinaryTree` and adjust values to make it a BST later, if needed.
                     // For now, let's just make it balanced. The `isValidBST` function ensures it's actually tested as a BST.
                     node.left = new TreeNode(node.val - Math.floor(Math.random() * node.val / 2) - 1);
                     if (node.left.val < -1000000000) node.left.val = -1000000000; // prevent too small numbers
                     queue.push(node.left);
                }
            }
            if (i * 2 + 2 < size) { // Right child
                if (node.val < size * 2) { // Ensure right child is larger than parent
                     node.right = new TreeNode(node.val + 1); // Simple increasing values
                     queue.push(node.right);
                } else {
                     node.right = new TreeNode(node.val + Math.floor(Math.random() * (size - node.val) / 2) + 1);
                     if (node.right.val > 1000000000) node.right.val = 1000000000; // prevent too large numbers
                     queue.push(node.right);
                }
            }
            i++;
        }
        return root;
    },
    TEST_SIZES_BALANCED.filter(s => s < 20000) // Filter for smaller sizes as BST creation is more complex
);

// Problem 5: Max Depth
runBenchmark(
    "Max Depth (Balanced Tree)",
    [
        { name: "Max Depth Recursive (DFS)", func: maxDepthDFS_Recursive },
        { name: "Max Depth Iterative (BFS)", func: maxDepthBFS_Iterative }
    ],
    (size) => {
        const depth = Math.floor(Math.log2(size + 1)) - 1;
        return generatePerfectTree(Math.max(0, depth));
    },
    TEST_SIZES_BALANCED
);

runBenchmark(
    "Max Depth (Skewed Tree - Worst Case for DFS Recursion Stack)",
    [
        { name: "Max Depth Recursive (DFS)", func: maxDepthDFS_Recursive },
        { name: "Max Depth Iterative (BFS)", func: maxDepthBFS_Iterative }
    ],
    generateSkewedTree,
    TEST_SIZES_SKEWED
);
```