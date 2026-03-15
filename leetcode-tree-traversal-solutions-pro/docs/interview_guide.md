# Interview Guide: Tree Traversals

This guide provides tips for tackling tree traversal questions in coding interviews, covers common variations, discusses edge cases, and highlights potential "gotchas."

## Table of Contents
1.  [General Interview Tips](#1-general-interview-tips)
2.  [Common Variations and Related Problems](#2-common-variations-and-related-problems)
    *   [DFS Variations](#dfs-variations)
    *   [BFS Variations](#bfs-variations)
    *   [BST Specific Problems](#bst-specific-problems)
    *   [Structure Modification Problems](#structure-modification-problems)
3.  [Edge Cases and Gotchas](#3-edge-cases-and-gotchas)
4.  [Recursive vs. Iterative: When to Use Which?](#4-recursive-vs-iterative-when-to-use-which)

---

## 1. General Interview Tips

*   **Clarify Assumptions:**
    *   **Tree Type:** Is it a Binary Tree, Binary Search Tree (BST), N-ary Tree, or something else?
    *   **Node Structure:** What does a `TreeNode` look like (e.g., `val`, `left`, `right`)?
    *   **Empty Tree:** How should an empty tree be handled? Return empty list, `None`, error?
    *   **Return Type:** What format should the output be (list of integers, list of lists, string)?
    *   **Duplicates:** Are duplicate values allowed? If it's a BST, how are duplicates handled (e.g., left < root, right > root, or left <= root, right > root)? Assume strict inequality unless specified.

*   **Start with Brute Force/Simple Approach (if applicable):**
    *   For basic traversals, the recursive approach is often the most straightforward to explain first.
    *   For more complex problems, identify the core traversal needed (DFS or BFS) and start with that framework.

*   **Think Aloud & Explain Your Logic:**
    *   Verbally walk through your thought process.
    *   Explain why you chose a particular traversal (e.g., "I'm using DFS here because I need to explore paths to leaves," or "BFS is suitable for level-by-level processing").
    *   Explain data structures used (stack for iterative DFS, queue for BFS).

*   **Draw Diagrams:**
    *   Always draw a sample tree. Use the diagram to trace your algorithm step-by-step.
    *   For recursive solutions, visualize the call stack.
    *   For iterative solutions, show the state of the stack/queue.
    *   This helps you catch errors and demonstrates your understanding.

*   **Discuss Time and Space Complexity:**
    *   For any tree traversal:
        *   **Time:** Usually O(N) because every node is visited once.
        *   **Space (Recursive):** O(H) for the recursion stack, where H is the height.
        *   **Space (Iterative DFS):** O(H) for the explicit stack.
        *   **Space (Iterative BFS):** O(W) for the queue, where W is the maximum width of the tree (can be O(N) in worst case for a complete tree).
    *   Be ready to explain how H and W relate to N for balanced vs. skewed trees.

*   **Test Cases (Mental Walkthrough):**
    *   **Base cases:** Empty tree, single-node tree.
    *   **Edge cases:** Skewed trees (left-heavy, right-heavy), complete trees, highly incomplete trees.
    *   **Typical cases:** A balanced, moderately sized tree.
    *   **Specific problem edge cases:** For BST validation, trees that *look* like BSTs but aren't due to global property violations (e.g., a right child of a left node is greater than the root).

*   **Code Structure and Readability:**
    *   Use meaningful variable names (`current_node`, `stack`, `queue`, `result`).
    *   Keep functions concise and focused.
    *   Add comments for complex logic or non-obvious parts.

## 2. Common Variations and Related Problems

Many tree problems are variations of or build upon basic traversals.

### DFS Variations

*   **Max/Min Depth of Binary Tree:** Use DFS to find the longest path to a leaf (max depth) or shortest (min depth).
*   **Symmetric Tree:** Check if a tree is a mirror image of itself. A recursive DFS approach comparing left and right subtrees is common.
*   **Same Tree:** Check if two trees are structurally identical and have the same node values. Simple DFS comparison.
*   **Invert/Mirror Binary Tree:** Swap left and right children recursively.
*   **Lowest Common Ancestor (LCA) of a Binary Tree:** DFS can be used to find paths to nodes or recursively check subtrees.
*   **Count/Sum of Nodes:** Simple DFS where you aggregate values.
*   **Path Sum (I & II):**
    *   **I (Exists):** Check if any root-to-leaf path sums to a target. DFS with sum tracking.
    *   **II (All Paths):** Return all such paths. DFS with backtracking (as implemented in this project).
*   **Flatten Binary Tree to Linked List:** Modify tree structure using a postorder-like traversal.

### BFS Variations

*   **Binary Tree Right/Left Side View:** For each level, return the rightmost/leftmost node. A slight modification to level order.
*   **Average of Levels in Binary Tree:** Calculate the average for each level during level order traversal.
*   **Connect Nodes at Same Level (Populating Next Right Pointers):** Maintain `prev` and `curr` pointers during BFS.
*   **N-ary Tree Level Order Traversal:** Generalize the queue-based BFS for N children.

### BST Specific Problems

*   **Kth Smallest Element in a BST:** Inorder traversal naturally visits nodes in sorted order. You can stop after visiting K nodes.
*   **Convert Sorted Array to BST:** Recursive approach building from the middle element.
*   **Delete Node in a BST:** Find the node, then handle deletion cases (no child, one child, two children). Inorder successor/predecessor is key for two-child case.
*   **Insert Node in a BST:** Standard traversal to find insertion point.

### Structure Modification Problems

*   **Serialize and Deserialize Binary Tree:** Convert a tree to a string (or list) and vice-versa. Preorder (for DFS) or Level Order (for BFS) are common serialization methods.
*   **Construct Binary Tree from Preorder and Inorder Traversal:** A classic problem that requires understanding how these traversals relate to tree structure.

## 3. Edge Cases and Gotchas

*   **Empty Tree:** Always consider `root == None`. Most traversals return an empty list or `None` in this case.
*   **Single Node Tree:** Ensure your code correctly handles a tree with only a root node.
*   **Skewed Trees (Linked Lists):**
    *   A completely left-skewed or right-skewed tree (e.g., `1 -> 2 -> 3 -> ...`) can lead to **Stack Overflow** for recursive solutions if the tree is very deep. This is why iterative solutions (especially using an explicit stack) are preferred for production code in languages without tail-call optimization or with limited recursion depth.
    *   Example: A tree with 10,000 nodes, all on the left, will cause 10,000 recursive calls. Python's default recursion limit is often 1000-3000.
*   **`None` Nodes in `build_tree_from_list`:** Understand how `None` values in the input list correspond to missing children in the tree structure.
*   **Strict vs. Non-Strict Inequalities in BSTs:** For `is_valid_bst`, clarify if `node.val` can be equal to values in its left/right subtrees. Usually, BST implies strict `left < root < right`.
*   **Path Copying (Deep Copy):** When collecting paths (e.g., `All Paths from Root to Leaf`), remember to append a *copy* of the current path list (`list(current_path)`) to the result list, especially in recursive solutions with backtracking. Otherwise, all paths in your result list will reference the same `current_path` object, which will be empty by the end of the recursion.
*   **Morris Traversal (Tree Modification):** Be aware that Morris traversal temporarily modifies the tree structure. If the interviewer asks for a traversal without modifying the tree, Morris is not suitable (unless you guarantee restoration). The provided implementation restores the tree.

## 4. Recursive vs. Iterative: When to Use Which?

**Recursive:**
*   **Pros:** Often more intuitive, concise, and easier to write for intrinsically recursive problems like tree traversals.
*   **Cons:**
    *   **Stack Overflow:** Can lead to stack overflow for very deep trees due to recursion depth limits (especially in Python).
    *   **Memory Usage:** Uses call stack memory, which can be less efficient than an explicit stack for iterative solutions in some cases.

**Iterative (using explicit stack/queue):**
*   **Pros:**
    *   **No Stack Overflow:** Avoids recursion depth limits, making it suitable for arbitrarily deep trees.
    *   **Explicit Control:** You have direct control over the stack/queue, which can sometimes allow for more optimized or specialized logic.
    *   **Memory:** Often has predictable memory usage with an explicit data structure.
*   **Cons:**
    *   **More Complex:** Can be harder to write and debug, especially for Postorder traversal with a single stack.
    *   **Less Intuitive:** The logic might not map as directly to the tree's recursive definition.

**Recommendation for Interviews:**
1.  **Start with Recursive:** For DFS problems, begin by explaining the recursive approach. It's often easier to reason about and demonstrates a fundamental understanding.
2.  **Discuss Iterative as an Alternative:** If time permits, or if the interviewer probes about performance/stack overflow, explain how to convert to an iterative solution using a stack. This shows a deeper understanding and handles practical limitations.
3.  **BFS is Almost Always Iterative:** For BFS problems, the iterative approach using a queue is the standard and most intuitive method.
4.  **Morris Traversal for O(1) Space:** If O(1) space is a specific constraint, be prepared to discuss or implement Morris Traversal. This is an advanced topic that can impress if correctly applied and explained.

By mastering these concepts and practicing with various problems and their nuances, you'll be well-prepared to tackle tree traversal questions in any coding interview.