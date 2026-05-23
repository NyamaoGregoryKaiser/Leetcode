```javascript
const TreeNode = require('./TreeNode');

/**
 * @module TreeTraversalProblems
 * @description Contains various tree traversal algorithms,
 * including basic traversals (inorder, preorder, postorder)
 * with recursive and iterative approaches, and more advanced problems
 * like Level Order, Zigzag Level Order, Max Depth, and Path Sum III.
 */

// --- Problem 1: Basic Traversals (Inorder, Preorder, Postorder) ---

/**
 * Performs Inorder Traversal (Left -> Root -> Right) recursively.
 * @param {TreeNode|null} root - The root of the binary tree.
 * @param {number[]} result - The array to store traversal results.
 * @returns {void}
 *
 * Time Complexity: O(N) - Visits each node exactly once.
 * Space Complexity: O(H) - Where H is the height of the tree.
 *   In the worst case (skewed tree), H can be N (O(N) for recursion stack).
 *   In the best case (balanced tree), H is logN (O(logN) for recursion stack).
 */
function inorderTraversalRecursive(root, result = []) {
    if (!root) {
        return;
    }
    inorderTraversalRecursive(root.left, result);
    result.push(root.val);
    inorderTraversalRecursive(root.right, result);
    return result;
}

/**
 * Performs Inorder Traversal (Left -> Root -> Right) iteratively using a stack.
 * @param {TreeNode|null} root - The root of the binary tree.
 * @returns {number[]} - An array containing the node values in inorder sequence.
 *
 * Time Complexity: O(N) - Each node is pushed and popped onto the stack once.
 * Space Complexity: O(H) - Where H is the height of the tree.
 *   In the worst case (skewed tree), H can be N (O(N) for stack).
 *   In the best case (balanced tree), H is logN (O(logN) for stack).
 */
function inorderTraversalIterative(root) {
    const result = [];
    const stack = [];
    let current = root;

    while (current || stack.length > 0) {
        // Traverse to the leftmost node, pushing all visited nodes onto the stack
        while (current) {
            stack.push(current);
            current = current.left;
        }

        // Pop the top node (which is the leftmost unvisited node)
        current = stack.pop();
        result.push(current.val);

        // Now move to its right subtree
        current = current.right;
    }
    return result;
}

/**
 * Performs Preorder Traversal (Root -> Left -> Right) recursively.
 * @param {TreeNode|null} root - The root of the binary tree.
 * @param {number[]} result - The array to store traversal results.
 * @returns {void}
 *
 * Time Complexity: O(N) - Visits each node exactly once.
 * Space Complexity: O(H) - For recursion stack, similar to inorder.
 */
function preorderTraversalRecursive(root, result = []) {
    if (!root) {
        return;
    }
    result.push(root.val);
    preorderTraversalRecursive(root.left, result);
    preorderTraversalRecursive(root.right, result);
    return result;
}

/**
 * Performs Preorder Traversal (Root -> Left -> Right) iteratively using a stack.
 * @param {TreeNode|null} root - The root of the binary tree.
 * @returns {number[]} - An array containing the node values in preorder sequence.
 *
 * Time Complexity: O(N) - Each node is pushed and popped once.
 * Space Complexity: O(H) - For the stack, similar to inorder.
 */
function preorderTraversalIterative(root) {
    const result = [];
    if (!root) {
        return result;
    }

    const stack = [root]; // Start with the root

    while (stack.length > 0) {
        const node = stack.pop(); // Pop the current node
        result.push(node.val);   // Add its value to the result

        // Push right child first, then left child, so left is processed first (LIFO)
        if (node.right) {
            stack.push(node.right);
        }
        if (node.left) {
            stack.push(node.left);
        }
    }
    return result;
}

/**
 * Performs Postorder Traversal (Left -> Right -> Root) recursively.
 * @param {TreeNode|null} root - The root of the binary tree.
 * @param {number[]} result - The array to store traversal results.
 * @returns {void}
 *
 * Time Complexity: O(N) - Visits each node exactly once.
 * Space Complexity: O(H) - For recursion stack, similar to inorder.
 */
function postorderTraversalRecursive(root, result = []) {
    if (!root) {
        return;
    }
    postorderTraversalRecursive(root.left, result);
    postorderTraversalRecursive(root.right, result);
    result.push(root.val);
    return result;
}

/**
 * Performs Postorder Traversal (Left -> Right -> Root) iteratively using two stacks.
 * This is a common and relatively straightforward iterative postorder approach.
 * @param {TreeNode|null} root - The root of the binary tree.
 * @returns {number[]} - An array containing the node values in postorder sequence.
 *
 * Time Complexity: O(N) - Each node is pushed and popped onto both stacks once.
 * Space Complexity: O(N) - In the worst case, both stacks can hold all nodes (e.g., skewed tree).
 */
function postorderTraversalIterativeTwoStacks(root) {
    const result = [];
    if (!root) {
        return result;
    }

    const s1 = [root]; // Stack 1: for processing nodes
    const s2 = [];      // Stack 2: for storing results in reverse postorder

    while (s1.length > 0) {
        const node = s1.pop();
        s2.push(node.val); // Push node's value to s2 (will be reversed later)

        // Push left child, then right child to s1.
        // This ensures right child is processed before left from s1 perspective.
        // The order in s2 will be Root, Right, Left... so reversing s2 gives Left, Right, Root.
        if (node.left) {
            s1.push(node.left);
        }
        if (node.right) {
            s1.push(node.right);
        }
    }
    // Reverse s2 to get the correct postorder traversal
    return s2.reverse();
}

/**
 * Performs Postorder Traversal (Left -> Right -> Root) iteratively using a single stack.
 * This approach is more complex but more memory-efficient in certain cases than two stacks.
 * It uses a `peek` functionality and tracks the last visited node to determine traversal direction.
 * @param {TreeNode|null} root - The root of the binary tree.
 * @returns {number[]} - An array containing the node values in postorder sequence.
 *
 * Time Complexity: O(N) - Each node is pushed and popped at most a few times.
 * Space Complexity: O(H) - Where H is the height of the tree.
 *   In the worst case (skewed tree), H can be N (O(N) for stack).
 */
function postorderTraversalIterativeOneStack(root) {
    const result = [];
    if (!root) {
        return result;
    }

    const stack = [];
    let current = root;
    let lastVisitedNode = null;

    while (current || stack.length > 0) {
        // Traverse to the leftmost node
        while (current) {
            stack.push(current);
            current = current.left;
        }

        // Peek the top node in the stack
        const peekNode = stack[stack.length - 1];

        // If right child exists and hasn't been visited yet
        if (peekNode.right && peekNode.right !== lastVisitedNode) {
            current = peekNode.right; // Move to the right child
        } else {
            // Otherwise, process the peekNode (it's a leaf or its right child has been visited)
            result.push(peekNode.val);
            lastVisitedNode = stack.pop(); // Pop and mark as last visited
        }
    }
    return result;
}


// --- Problem 2: Level Order Traversal (BFS) ---

/**
 * Performs Level Order Traversal (Breadth-First Search).
 * Traverses the tree level by level, from left to right.
 * @param {TreeNode|null} root - The root of the binary tree.
 * @returns {number[][]} - An array of arrays, where each inner array contains
 *   the values of nodes at a specific level.
 *
 * Time Complexity: O(N) - Each node is enqueued and dequeued exactly once.
 * Space Complexity: O(W) - Where W is the maximum width of the tree.
 *   In the worst case (complete binary tree), W can be N/2, so O(N).
 */
function levelOrderTraversal(root) {
    const result = [];
    if (!root) {
        return result;
    }

    const queue = [root]; // Initialize queue with the root node

    while (queue.length > 0) {
        const levelSize = queue.length; // Number of nodes at the current level
        const currentLevelNodes = [];

        // Process all nodes at the current level
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift(); // Dequeue the front node
            currentLevelNodes.push(node.val);

            // Enqueue children for the next level
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
        result.push(currentLevelNodes); // Add the current level's nodes to the result
    }
    return result;
}


// --- Problem 3: Zigzag Level Order Traversal ---

/**
 * Performs Zigzag Level Order Traversal.
 * Traverses the tree level by level, alternating direction (left-to-right, then right-to-left).
 * @param {TreeNode|null} root - The root of the binary tree.
 * @returns {number[][]} - An array of arrays, where each inner array contains
 *   the values of nodes at a specific level in zigzag order.
 *
 * Time Complexity: O(N) - Each node is processed exactly once.
 * Space Complexity: O(W) - Maximum width of the tree, similar to level order.
 */
function zigzagLevelOrderTraversal(root) {
    const result = [];
    if (!root) {
        return result;
    }

    const queue = [root];
    let leftToRight = true; // Flag to determine traversal direction

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevelNodes = [];

        // Process nodes for the current level
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();

            // Add node value to the current level array based on direction
            if (leftToRight) {
                currentLevelNodes.push(node.val);
            } else {
                currentLevelNodes.unshift(node.val); // Add to the beginning for right-to-left
            }

            // Enqueue children for the next level (standard left-to-right order)
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
        result.push(currentLevelNodes);
        leftToRight = !leftToRight; // Toggle direction for the next level
    }
    return result;
}


// --- Problem 4: Maximum Depth of Binary Tree ---

/**
 * Calculates the maximum depth (height) of a binary tree recursively.
 * The depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
 * An empty tree has a depth of 0. A tree with only a root node has a depth of 1.
 * @param {TreeNode|null} root - The root of the binary tree.
 * @returns {number} - The maximum depth of the tree.
 *
 * Time Complexity: O(N) - Visits each node once.
 * Space Complexity: O(H) - For the recursion stack. H is height of the tree.
 *   Worst case (skewed tree): O(N). Best case (balanced tree): O(logN).
 */
function maxDepthRecursive(root) {
    if (!root) {
        return 0; // Base case: an empty tree has depth 0
    }

    // Recursively find the maximum depth of left and right subtrees
    const leftDepth = maxDepthRecursive(root.left);
    const rightDepth = maxDepthRecursive(root.right);

    // The depth of the current tree is 1 (for the current node) plus the maximum of its children's depths
    return 1 + Math.max(leftDepth, rightDepth);
}

/**
 * Calculates the maximum depth (height) of a binary tree iteratively using BFS (Level Order Traversal).
 * The depth is counted by the number of levels.
 * @param {TreeNode|null} root - The root of the binary tree.
 * @returns {number} - The maximum depth of the tree.
 *
 * Time Complexity: O(N) - Each node is enqueued and dequeued once.
 * Space Complexity: O(W) - Maximum width of the tree, similar to level order.
 */
function maxDepthIterativeBFS(root) {
    if (!root) {
        return 0;
    }

    const queue = [root];
    let depth = 0;

    while (queue.length > 0) {
        depth++; // Increment depth for each new level
        const levelSize = queue.length;

        // Process all nodes at the current level
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
    }
    return depth;
}


// --- Problem 5: Path Sum III ---

/**
 * Counts the number of paths in a binary tree that sum up to a given target.
 * The path does not need to start or end at the root or a leaf, but it must go downwards.
 * This solution uses a DFS approach with a helper function to check all paths starting from a given node.
 *
 * @param {TreeNode|null} root - The root of the binary tree.
 * @param {number} targetSum - The target sum to find.
 * @returns {number} - The total number of such paths.
 *
 * Time Complexity: O(N^2) in the worst case (skewed tree) because for each node,
 *   we potentially traverse all paths downwards from it.
 *   O(N log N) for a balanced tree, as the path sum check takes O(log N) on average.
 * Space Complexity: O(H) for the recursion stack, where H is the height of the tree.
 *   Worst case (skewed tree): O(N). Best case (balanced tree): O(logN).
 */
function pathSumIII_BruteForceDFS(root, targetSum) {
    if (!root) {
        return 0;
    }

    /**
     * Helper function to count paths that sum to targetSum starting from `node`.
     * @param {TreeNode|null} node - The current node.
     * @param {number} currentSum - The sum of values from the starting node to `node`.
     * @returns {number} - Number of paths summing to targetSum starting from `node`.
     */
    const countPathsFromNode = (node, currentSum) => {
        if (!node) {
            return 0;
        }

        let count = 0;
        currentSum += node.val;

        if (currentSum === targetSum) {
            count++;
        }

        // Recursively check paths in left and right subtrees
        count += countPathsFromNode(node.left, currentSum);
        count += countPathsFromNode(node.right, currentSum);

        return count;
    };

    // Total paths is the sum of paths starting from current root,
    // plus paths in left subtree, plus paths in right subtree.
    let totalPaths = countPathsFromNode(root, 0); // Paths starting at the current root
    totalPaths += pathSumIII_BruteForceDFS(root.left, targetSum); // Paths entirely in left subtree
    totalPaths += pathSumIII_BruteForceDFS(root.right, targetSum); // Paths entirely in right subtree

    return totalPaths;
}

/**
 * Counts the number of paths in a binary tree that sum up to a given target.
 * Optimized solution using DFS with a hash map to store prefix sums.
 * This avoids re-calculating sums for every sub-path.
 *
 * The idea is: if `currentSum - targetSum` exists in `prefixSumCount`, it means
 * there's a path ending at the current node whose sum is `targetSum`.
 *
 * @param {TreeNode|null} root - The root of the binary tree.
 * @param {number} targetSum - The target sum to find.
 * @returns {number} - The total number of such paths.
 *
 * Time Complexity: O(N) - Each node is visited once.
 * Space Complexity: O(H) - For the recursion stack and the hash map.
 *   The hash map stores at most H distinct prefix sums along the current path.
 *   Worst case (skewed tree): O(N). Best case (balanced tree): O(logN).
 */
function pathSumIII_OptimizedDFS(root, targetSum) {
    // Map to store the frequency of prefix sums encountered from root to current node.
    // Key: prefix sum, Value: count of times this sum has been encountered.
    // Initialize with {0: 1} to handle paths that start from the root itself and sum to targetSum.
    const prefixSumCount = new Map();
    prefixSumCount.set(0, 1);
    let count = 0; // Total number of paths found

    /**
     * Recursive DFS helper function.
     * @param {TreeNode|null} node - The current node.
     * @param {number} currentSum - The sum of values from the root to the current node.
     */
    const dfs = (node, currentSum) => {
        if (!node) {
            return;
        }

        currentSum += node.val;

        // Check if there's a prefix sum `currentSum - targetSum` that would make a valid path
        if (prefixSumCount.has(currentSum - targetSum)) {
            count += prefixSumCount.get(currentSum - targetSum);
        }

        // Add the current sum to the map (or increment its count)
        prefixSumCount.set(currentSum, (prefixSumCount.get(currentSum) || 0) + 1);

        // Recurse on children
        dfs(node.left, currentSum);
        dfs(node.right, currentSum);

        // Backtrack: remove the current sum from the map as we exit this path
        // This is crucial to ensure counts are only for paths starting *above* or *at* the current node.
        prefixSumCount.set(currentSum, prefixSumCount.get(currentSum) - 1);
    };

    dfs(root, 0); // Start DFS from the root with an initial sum of 0
    return count;
}


// Export all functions for testing and external use
module.exports = {
    inorderTraversalRecursive,
    inorderTraversalIterative,
    preorderTraversalRecursive,
    preorderTraversalIterative,
    postorderTraversalRecursive,
    postorderTraversalIterativeTwoStacks,
    postorderTraversalIterativeOneStack,
    levelOrderTraversal,
    zigzagLevelOrderTraversal,
    maxDepthRecursive,
    maxDepthIterativeBFS,
    pathSumIII_BruteForceDFS,
    pathSumIII_OptimizedDFS,
    TreeNode // Also export TreeNode for convenience in tests/utils
};
```