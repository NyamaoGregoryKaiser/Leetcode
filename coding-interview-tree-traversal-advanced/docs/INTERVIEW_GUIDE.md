```markdown
# 🤝 Interview Guide: Tree Traversals 🤝

This document provides tips, common variations, edge cases, and best practices for discussing tree traversals in coding interviews.

## 🎯 General Interview Tips for Tree Problems

1.  **Clarify the Problem**:
    *   Is it a Binary Tree, Binary Search Tree (BST), N-ary Tree, or general tree? (This project focuses on Binary Trees).
    *   What are the constraints on node values (integers, negatives, duplicates)?
    *   What are the constraints on the number of nodes (empty tree, single node, large trees)?
    *   What is the expected output format (list of values, list of lists for levels)?

2.  **Start with the Simplest Approach (Often Recursive DFS)**:
    *   Recursive solutions are often the most intuitive and easiest to reason about for DFS problems.
    *   Explain the base case (e.g., `if (node === null) return;`).
    *   Explain the recursive steps and how the problem breaks down.

3.  **Discuss Time and Space Complexity**:
    *   Always analyze the complexity of your proposed solution.
    *   For recursive DFS:
        *   **Time**: O(N) because each node is visited once.
        *   **Space**: O(H) for the recursion stack, where H is the height of the tree. This is O(log N) for balanced trees and O(N) for skewed trees.
    *   For iterative BFS (Level Order):
        *   **Time**: O(N) because each node is enqueued and dequeued once.
        *   **Space**: O(W) for the queue, where W is the maximum width of the tree. This is O(N) in the worst case (e.g., a complete binary tree where the last level has N/2 nodes).

4.  **Consider Edge Cases**:
    *   **Empty Tree**: `root = null`. Your code should handle this gracefully.
    *   **Single Node Tree**: `root = { val: X, left: null, right: null }`.
    *   **Skewed Trees**: A tree where all nodes are on one side (e.g., all left children). This tests the worst-case space complexity for recursive DFS (O(N)).

5.  **Alternative Approaches (if time permits or asked)**:
    *   After providing a recursive DFS, mention how to do it iteratively using an explicit stack.
    *   After providing BFS, discuss how it differs from DFS.
    *   For problems like Path Sum III, contrast a brute-force approach with an optimized one.

6.  **Articulate Your Thoughts**:
    *   "I'll start by thinking about a recursive solution because tree problems often lend themselves well to recursion."
    *   "The base case will be when we hit a null node..."
    *   "To keep track of nodes at each level, I'll use a queue, which is standard for BFS."
    *   "The time complexity will be O(N) because we visit each node once."
    *   "The space complexity will be O(H) for the call stack, where H is the height of the tree. In the worst case of a skewed tree, this could be O(N)."

## 🧠 Common Variations and Follow-ups

### Basic DFS Traversals (Preorder, Inorder, Postorder)

*   **Implement iteratively without recursion**: This is a classic follow-up. Demonstrate using an explicit stack. (Covered in `TraversalBasics.js`)
*   **Morris Traversal**: A more advanced O(1) space complexity inorder traversal. Good to mention if you know it, but usually not expected unless specifically asked for O(1) space.
*   **What if it's an N-ary tree?**: DFS becomes a loop over `children` array. BFS uses a queue, processing all children of a node.

### Level Order Traversal (BFS)

*   **Return average value of each level**: Modify BFS to sum values at each level and divide by `levelSize`.
*   **Return max/min value of each level**: Modify BFS to track max/min during `currentLevelNodes` processing.
*   **Connect nodes at the same level (Next Right Pointer)**: In BFS, after processing `levelSize` nodes, you can connect them.
*   **Bottom-up Level Order Traversal**: Collect levels as usual, then reverse the entire `result` list at the end.

### Maximum Depth of Binary Tree

*   **Minimum Depth**: Similar to max depth, but you stop when you hit the *first* leaf node. For recursive, `1 + min(minDepth(left), minDepth(right))`, but need to handle cases where one child is null. For iterative BFS, it's simply the first time you pop a leaf node from the queue.
*   **Check if tree is balanced**: A tree is height-balanced if the depth of the two subtrees of every node never differs by more than one. Requires calculating height for each node.
*   **Diameter of Binary Tree**: The longest path between any two nodes in a tree. This path may or may not pass through the root. It's often solved by a DFS approach that simultaneously calculates height and diameter at each node.

### Path Sum III

*   **Path Sum I**: Check if there's *any* path from root to leaf that sums to `targetSum`. (Easier, simple recursive DFS).
*   **Path Sum II**: Return *all such paths* from root to leaf. (DFS, collect paths, backtrack).
*   **Smallest/Largest Path Sum**: Find the path with the smallest/largest sum from root to leaf.
*   **Path Sum in a Directed Acyclic Graph (DAG)**: If the problem extends to a DAG, the approach might need to change (e.g., memoization for overlapping subproblems).

## ⚠️ Edge Cases and Gotchas

*   **Empty Tree**: Always the first check: `if (!root) return ...;`
*   **Single Node Tree**: Should always return expected behavior (e.g., `[1]` for traversals, `1` for max depth if root is the only node).
*   **Skewed Trees**:
    *   **Recursive DFS**: Can lead to stack overflow errors in languages with small default stack limits (like JavaScript in some environments). This is why iterative solutions are valuable.
    *   **BFS (Queue size)**: The queue can grow up to O(N) for a complete tree. For skewed trees, it's O(1) (apart from results).
*   **Negative Values**: Node values can be negative. Ensure your sum logic correctly handles this (e.g., a path `[10, -2, -8]` sums to `0`). Path Sum III specifically handles this with prefix sums.
*   **Large Sums**: If node values can be very large or the tree is deep, the sum might exceed standard integer limits. JavaScript numbers handle large integers up to `2^53 - 1`, but in other languages, this could necessitate `long` or `BigInteger`. The problem constraints typically indicate if this is a concern.
*   **Null Children Handling**: Be careful not to dereference `null.left` or `null.right`. Always check for `null` before accessing children.
*   **Backtracking for Stateful DFS**: For problems like Path Sum III where you maintain a running sum or path, ensure you "undo" changes to shared state (like the `prefixSumCount` map) when backtracking from a recursive call. This prevents pollution of sibling branches.

## 🌟 Conclusion

Mastering tree traversals is key for many tree-related problems. Understand the fundamental differences between DFS and BFS, know their common implementations (recursive and iterative), and be prepared to discuss their time/space complexities and handle edge cases. Good luck!
```