```typescript
import { TreeNode } from '../data-structures/TreeNode';

/**
 * @function buildTreeFromArray
 * @description Builds a binary tree from an array representation.
 * The array representation is similar to how LeetCode problems often define trees.
 * `null` values in the array represent missing children.
 *
 * Example: `[3,9,20,null,null,15,7]`
 * Represents:
 *      3
 *     / \
 *    9  20
 *      /  \
 *     15   7
 *
 * @param {Array<(number | null)>} arr An array representing the tree in level-order.
 * @returns {TreeNode | null} The root of the constructed binary tree, or null if the array is empty.
 *
 * @complexity
 * Time: O(N), where N is the number of nodes in the tree (or elements in the array).
 *       Each element is processed once, and each node is created once.
 * Space: O(W), where W is the maximum width of the tree (for the queue). In the worst case (a complete tree), W is O(N).
 *        So, O(N) space complexity.
 */
export function buildTreeFromArray(arr: (number | null)[]): TreeNode | null {
    if (!arr || arr.length === 0 || arr[0] === null) {
        return null;
    }

    // Create the root node
    const root = new TreeNode(arr[0] as number);
    // Initialize a queue for BFS-like tree construction
    const queue: (TreeNode | null)[] = [root];
    let i = 1; // Pointer to the current element in the array

    // Iterate through the array using BFS logic
    while (queue.length > 0 && i < arr.length) {
        const currentNode = queue.shift(); // Get the next node to attach children to

        if (currentNode) {
            // Process left child
            if (i < arr.length && arr[i] !== null) {
                currentNode.left = new TreeNode(arr[i] as number);
                queue.push(currentNode.left);
            }
            i++; // Move to the next element in the array

            // Process right child
            if (i < arr.length && arr[i] !== null) {
                currentNode.right = new TreeNode(arr[i] as number);
                queue.push(currentNode.right);
            }
            i++; // Move to the next element in the array
        }
    }

    return root;
}

/**
 * @function treeToArray
 * @description Converts a binary tree back into its level-order array representation.
 * This is useful for testing purposes to compare constructed trees with expected arrays.
 * The array will include `null` for missing children to maintain structure.
 *
 * @param {TreeNode | null} root The root of the binary tree.
 * @returns {(number | null)[]} An array representing the tree in level-order.
 *
 * @complexity
 * Time: O(N), where N is the number of nodes in the tree. Each node is visited once.
 * Space: O(W), where W is the maximum width of the tree (for the queue). In the worst case (a complete tree), W is O(N).
 *        So, O(N) space complexity.
 */
export function treeToArray(root: TreeNode | null): (number | null)[] {
    if (!root) {
        return [];
    }

    const result: (number | null)[] = [];
    const queue: (TreeNode | null)[] = [root];
    let hasNonNull = true; // Flag to stop processing after all non-null nodes are processed

    while (queue.length > 0 && hasNonNull) {
        let levelLength = queue.length;
        hasNonNull = false; // Assume no more non-null nodes in the next iteration

        for (let i = 0; i < levelLength; i++) {
            const node = queue.shift();

            if (node) {
                result.push(node.val);
                queue.push(node.left);
                queue.push(node.right);
                // If we push any non-null children, we need to continue iterating
                if (node.left || node.right) {
                    hasNonNull = true;
                }
            } else {
                result.push(null);
                // We still push null placeholders to maintain structure,
                // but don't add to queue or set hasNonNull for nulls
            }
        }
    }

    // Trim trailing nulls that result from completely empty levels at the bottom
    // e.g., [1,2,null,3,null,null,null] should be [1,2,null,3]
    while (result.length > 0 && result[result.length - 1] === null) {
        result.pop();
    }

    return result;
}

/**
 * @function createPerfectBinaryTree
 * @description Creates a perfect binary tree of a given depth.
 * Used for performance testing to generate large, balanced trees.
 *
 * @param {number} depth The desired depth of the tree (0 for a single node, 1 for root + 2 children, etc.)
 * @returns {TreeNode | null} The root of the perfect binary tree.
 *
 * @complexity
 * Time: O(2^(depth+1) - 1) = O(N), where N is the number of nodes.
 * Space: O(2^depth) = O(N), for the recursion stack or queue.
 */
export function createPerfectBinaryTree(depth: number): TreeNode | null {
    if (depth < 0) {
        return null;
    }

    let counter = 1;
    const createNode = (currentDepth: number): TreeNode | null => {
        if (currentDepth > depth) {
            return null;
        }
        const node = new TreeNode(counter++);
        node.left = createNode(currentDepth + 1);
        node.right = createNode(currentDepth + 1);
        return node;
    };

    return createNode(0);
}
```