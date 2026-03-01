```javascript
const TreeNode = require('../data-structures/TreeNode');

/**
 * @problem 2: Binary Tree Zigzag Level Order Traversal
 * @description Given the `root` of a binary tree, return the zigzag level order traversal of its nodes' values.
 * (i.e., from left to right, then right to left for the next level and so on).
 *
 * Example:
 *     3
 *    / \
 *   9  20
 *     /  \
 *    15   7
 * Expected Output: [[3], [20, 9], [15, 7]]
 *
 * Constraints:
 * The number of nodes in the tree is in the range [0, 2000].
 * -100 <= Node.val <= 100
 */

/**
 * Approach 1: Iterative BFS with Deque/Direction Flag
 *
 * Logic:
 * This problem is a variation of standard level order traversal (BFS).
 * The key is to alternate the order of adding elements to the current level's list.
 * We use a standard queue for BFS to manage levels. For each level:
 * 1. Determine the number of nodes at the current level.
 * 2. Create a temporary list for current level nodes.
 * 3. Iterate through nodes at this level:
 *    a. Dequeue a node.
 *    b. Add its value to the temporary list. The crucial part is *where* to add:
 *       - If it's an even-numbered level (0-indexed, e.g., level 0, 2, ...): add to the end (left-to-right).
 *       - If it's an odd-numbered level (1-indexed, e.g., level 1, 3, ...): add to the beginning (right-to-left).
 *    c. Enqueue children for the next level.
 * 4. Add the temporary list to the overall result.
 * 5. Increment the level counter to toggle the direction for the next level.
 *
 * This approach effectively uses a `level` counter or a `leftToRight` boolean flag
 * to decide whether to `push` (add to end) or `unshift` (add to beginning) elements
 * into the current level's list.
 *
 * @param {TreeNode | null} root - The root of the binary tree.
 * @returns {Array<Array<number>>} A 2D array representing the zigzag level order traversal.
 *
 * Time Complexity: O(N) where N is the number of nodes. Each node is enqueued and dequeued once.
 *                  Adding elements to the beginning of an array (`unshift`) can be O(K) where K is the
 *                  size of the array. In the worst case, a level can have O(N) nodes.
 *                  So, theoretically, `unshift` could make it O(N^2) in the worst case for densely populated wide trees.
 *                  However, if using a `deque` or a `LinkedList` (or two-pointer approach after collection),
 *                  it can be strictly O(N). For standard JS arrays, it's typically O(N) amortized for this pattern.
 * Space Complexity: O(W) where W is the maximum width of the tree (queue and temporary level array).
 *                   In the worst case (complete binary tree), W can be N/2, so O(N).
 */
function zigzagLevelOrder(root) {
    const result = [];
    if (!root) {
        return result;
    }

    const queue = [root];
    let level = 0; // To keep track of the current level for direction switching

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevelNodes = []; // Using an array as a temporary storage

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();

            // Depending on the level, add to the beginning or end of the currentLevelNodes array
            if (level % 2 === 0) { // Even level (0, 2, ...): left to right, add to end
                currentLevelNodes.push(node.val);
            } else { // Odd level (1, 3, ...): right to left, add to beginning
                currentLevelNodes.unshift(node.val);
            }

            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
        result.push(currentLevelNodes);
        level++; // Move to the next level
    }

    return result;
}

module.exports = {
    zigzagLevelOrder
};
```