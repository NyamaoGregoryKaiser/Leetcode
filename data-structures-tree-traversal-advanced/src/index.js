```javascript
const { buildTree } = require('./utils/treeBuilder');
const { inorderTraversal, preorderTraversal, postorderTraversal } = require('./traversals/recursiveTraversals');
const { inorderTraversalIterative, preorderTraversalIterative, postorderTraversalIterative } = require('./traversals/iterativeTraversals');
const { levelOrderTraversal } = require('./traversals/bfsLevelOrder');
const { maxDepthDFS, maxDepthBFS } = require('./problems/p1_maxDepth');
const { zigzagLevelOrder } = require('./problems/p2_levelOrderZigzag');
const { countGoodNodes } = require('./problems/p3_countGoodNodes');
const { pathSum, pathSumOptimized } = require('./problems/p4_pathSumIII');

/**
 * Main entry point for demonstrating all tree traversal algorithms and problems.
 */
function runDemo() {
    console.log("--- Tree Traversals Project Demo ---");
    console.log("\n--- Building a Sample Tree ---");
    // Example tree 1: [3,9,20,null,null,15,7]
    //     3
    //    / \
    //   9  20
    //     /  \
    //    15   7
    const tree1 = buildTree([3,9,20,null,null,15,7]);
    console.log("Tree 1 (Root: 3):", tree1 ? "Built successfully" : "Failed to build");

    // Example tree 2: [1,null,2,3]
    //   1
    //    \
    //     2
    //    /
    //   3
    const tree2 = buildTree([1,null,2,3]);
    console.log("Tree 2 (Root: 1):", tree2 ? "Built successfully" : "Failed to build");

    // Example tree 3: [1,2,3,4,5,6,7]
    //       1
    //      / \
    //     2   3
    //    / \ / \
    //   4  5 6  7
    const tree3 = buildTree([1,2,3,4,5,6,7]);
    console.log("Tree 3 (Root: 1):", tree3 ? "Built successfully" : "Failed to build");


    console.log("\n--- Core Traversal Algorithms (Tree 1: [3,9,20,null,null,15,7]) ---");
    if (tree1) {
        console.log("Recursive Inorder:", inorderTraversal(tree1));    // Expected: [9,3,15,20,7]
        console.log("Iterative Inorder:", inorderTraversalIterative(tree1)); // Expected: [9,3,15,20,7]
        console.log("Recursive Preorder:", preorderTraversal(tree1));  // Expected: [3,9,20,15,7]
        console.log("Iterative Preorder:", preorderTraversalIterative(tree1)); // Expected: [3,9,20,15,7]
        console.log("Recursive Postorder:", postorderTraversal(tree1)); // Expected: [9,15,7,20,3]
        console.log("Iterative Postorder:", postorderTraversalIterative(tree1)); // Expected: [9,15,7,20,3]
        console.log("Level Order (BFS):", levelOrderTraversal(tree1)); // Expected: [[3], [9,20], [15,7]]
    } else {
        console.log("Tree 1 is null, skipping traversals.");
    }

    console.log("\n--- Problem 1: Maximum Depth of Binary Tree ---");
    console.log("Tree 1 Max Depth (DFS):", maxDepthDFS(tree1)); // Expected: 3
    console.log("Tree 1 Max Depth (BFS):", maxDepthBFS(tree1)); // Expected: 3
    console.log("Tree 2 Max Depth (DFS):", maxDepthDFS(tree2)); // Expected: 3
    console.log("Tree 2 Max Depth (BFS):", maxDepthBFS(tree2)); // Expected: 3
    console.log("Empty Tree Max Depth:", maxDepthDFS(null));    // Expected: 0

    console.log("\n--- Problem 2: Binary Tree Zigzag Level Order Traversal ---");
    console.log("Tree 1 Zigzag Level Order:", zigzagLevelOrder(tree1)); // Expected: [[3], [20, 9], [15, 7]]
    console.log("Empty Tree Zigzag Level Order:", zigzagLevelOrder(null)); // Expected: []

    console.log("\n--- Problem 3: Count Good Nodes in Binary Tree ---");
    // Input: root = [3,1,4,3,null,1,5]
    // Output: 4 (Good nodes: root 3, 4, 3 (left child of 1), 5)
    const treeGoodNodes = buildTree([3,1,4,3,null,1,5]);
    console.log("Good Nodes in [3,1,4,3,null,1,5]:", countGoodNodes(treeGoodNodes)); // Expected: 4
    // Input: root = [3,3,null,4,2]
    // Output: 3 (Good nodes: root 3, 3 (left child), 4 (right child of 3, path 3->3->4, max 4) )
    const treeGoodNodes2 = buildTree([3,3,null,4,2]);
    console.log("Good Nodes in [3,3,null,4,2]:", countGoodNodes(treeGoodNodes2)); // Expected: 3
    console.log("Good Nodes in Empty Tree:", countGoodNodes(null)); // Expected: 0

    console.log("\n--- Problem 4: Path Sum III ---");
    // Input: root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
    // Output: 3 (Paths: 5->3, 5->2->1, -3->11)
    const treePathSum = buildTree([10,5,-3,3,2,null,11,3,-2,null,1]);
    const targetSum = 8;
    console.log(`Paths Sum III (O(N^2)) for Target ${targetSum}:`, pathSum(treePathSum, targetSum)); // Expected: 3
    console.log(`Paths Sum III (O(N)) for Target ${targetSum}:`, pathSumOptimized(treePathSum, targetSum)); // Expected: 3

    // Another example: [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
    // Expected Output: 3 (Paths: 5->4->11->2, 5->8->4->5, 4->13->5) - actually it's just 3 (5->4->11->2), (5->8->13), (5->8->4->5) => paths are 3
    // Let's recheck the example from LC, it's 3 indeed for 22, and for some specific paths.
    // My small check on paper shows for 22, it's 5->4->11->2 (22), and 5->8->13 (26, no), 5->8->4->5 (22).
    // Let's try simpler tree:
    const treeSimplePathSum = buildTree([1,2,3]); // Path: 1->2 (sum 3), 1->3 (sum 4), 2 (sum 2), 3 (sum 3)
    console.log(`Paths Sum III (O(N^2)) for Target 3 in [1,2,3]:`, pathSum(treeSimplePathSum, 3)); // Expected: 2 (1->2 and 3)
    console.log(`Paths Sum III (O(N)) for Target 3 in [1,2,3]:`, pathSumOptimized(treeSimplePathSum, 3)); // Expected: 2
    console.log(`Paths Sum III (O(N)) for Target 100 (non-existent):`, pathSumOptimized(treeSimplePathSum, 100)); // Expected: 0
    console.log(`Paths Sum III (O(N)) for Empty Tree:`, pathSumOptimized(null, 5)); // Expected: 0

    console.log("\n--- Demo Complete ---");
}

runDemo();
```