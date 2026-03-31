```markdown
# Interview Tips & Variations for Tree Traversals

This document covers common interview strategies, typical edge cases, and variations for tree traversal problems.

---

## General Interview Tips for Tree Problems

1.  **Clarify the Problem:**
    *   **Binary Tree vs. BST:** Is it a general binary tree or a Binary Search Tree? (BST property: left < root < right is crucial for problems like Kth smallest).
    *   **Data Type:** What are the node values (integers, strings, objects)? Are duplicates allowed?
    *   **Output Format:** List of integers, list of lists, string, boolean?
    *   **Constraints:** Tree size (N), value range, time/space limits.
    *   **Definition of Leaf:** Node with no children? Or just a node without a specific child? (Usually no children).

2.  **Draw Examples:**
    *   Always start with a small, simple tree.
    *   Consider a slightly more complex, balanced tree.
    *   Draw edge cases (see below).
    *   Walk through your algorithm step-by-step with the diagrams.

3.  **Choose the Right Traversal:**
    *   **DFS (Preorder, Inorder, Postorder):** Good for problems where you need to process nodes in a depth-first manner, or when the order of processing parent/children matters for a given path.
        *   **Preorder (Root-Left-Right):** Useful for creating a copy, serialization, or when the root must be processed before its children.
        *   **Inorder (Left-Root-Right):** Essential for BSTs (sorted order), or when processing the root *between* its children.
        *   **Postorder (Left-Right-Root):** Useful for deletion (processing children before parent), or when the root must be processed *after* its children.
    *   **BFS (Level Order):** Good for problems requiring level-by-level processing, finding shortest paths in unweighted graphs, or when all nodes at a certain depth need to be processed before going deeper.

4.  **Recursive vs. Iterative:**
    *   **Recursive:** Often more intuitive and concise for DFS. Easier to write initially.
    *   **Iterative (Stack-based DFS):** Important to know for avoiding stack overflow on very deep trees, or for interviews specifically asking for iterative solutions. More explicit control over the traversal.
    *   **Iterative (Queue-based BFS):** Standard for BFS.
    *   **Morris Traversal (O(1) space DFS):** Advanced, often a bonus question. Demonstrates deep understanding of tree manipulation. Be prepared to explain how threads are created and broken.

5.  **Complexity Analysis:**
    *   Always state Time and Space complexity.
    *   Be mindful of recursion stack space (O(H)) vs. explicit stack/queue space (O(H) or O(W)).

6.  **Code Structure:**
    *   Use helper functions for recursion (e.g., `helper(node, resultList)`).
    *   Handle null root explicitly at the beginning of your main function.
    *   Clear variable names.

---

## Edge Cases and Gotchas

1.  **Empty Tree:** `root == null`. Your code should gracefully handle this, usually by returning an empty list or `false`.

2.  **Single Node Tree:** `root` exists, but `root.left` and `root.right` are null. All traversals should correctly return a list containing only the root's value.

3.  **Skewed Trees (Linked List like):**
    *   **Left-skewed:** Only left children exist.
    *   **Right-skewed:** Only right children exist.
    *   These trees expose the worst-case space complexity for recursive (and stack-based iterative) DFS traversals due to maximum recursion depth/stack size (O(N)).

    ```
    Left Skewed:       Right Skewed:
          1                1
         /                  \
        2                    2
       /                      \
      3                        3
    ```

4.  **Complete/Full Binary Trees:**
    *   These trees represent the best-case for recursive DFS space complexity (O(log N)) and worst-case for BFS queue space complexity (O(N/2) = O(N)).

    ```
          1
         / \
        2   3
       / \ / \
      4  5 6  7
    ```

5.  **Binary Search Trees (BSTs):**
    *   Remember the BST property: `left.val < root.val < right.val`.
    *   Inorder traversal of a BST yields sorted elements. This is a critical property for problems like "Kth Smallest Element".

6.  **Disconnected Nodes:** A binary tree by definition has connected nodes from a single root. Ensure you don't accidentally assume such a structure.

7.  **Mutable Tree vs. Immutable Tree:**
    *   If your traversal temporarily modifies the tree (like Morris traversal or `flattenIterativeO1Space`), ensure you understand if the problem requires the tree to be restored to its original state. Morris traversal *does* restore the tree, which is a key part of its elegance.

---

## Interview Variations

### Standard Traversal Variations:

*   **Return a list of lists:** For level order, return nodes by level. This is standard for `levelOrderTraversal`.
*   **Return an iterator:** Implement `Iterator<Integer>` for inorder traversal. This is good for large trees where you don't want to store all nodes in memory.
*   **Print vs. Return:** Some problems ask to print the traversal, others to return a list. Be clear about the output.

### Common Problems Using Traversals:

1.  **Tree Height/Max Depth:**
    *   Recursive DFS: `1 + Math.max(height(root.left), height(root.right))`
    *   Iterative BFS: Count levels.
2.  **Tree Diameter:** Longest path between any two nodes. Often involves calculating height.
3.  **Maximum Path Sum:** Path can start and end anywhere in the tree. Uses postorder-like processing.
4.  **Symmetric Tree:** Check if a tree is a mirror image of itself. Can use two simultaneous traversals (e.g., one preorder-like, one reverse preorder-like).
5.  **Same Tree:** Check if two trees are structurally identical and have the same values. Preorder traversal is suitable.
6.  **Count Nodes:** Simple traversal (any type) and increment a counter.
7.  **Invert/Mirror Tree:** Swap left and right children. Postorder or preorder recursive is straightforward.
8.  **Lowest Common Ancestor (LCA):** Find the LCA of two nodes. Can involve path tracing (DFS) or a single pass (DFS).
9.  **Construct Tree from Traversals:** Given two traversals (e.g., inorder and preorder), reconstruct the unique binary tree. This requires careful use of the properties of each traversal.
10. **Boundary Traversal:** Print left boundary, then leaves, then right boundary (in reverse order). Combines aspects of DFS and BFS.
11. **Vertical Order / Diagonal Order:** More complex BFS variations requiring coordinate tracking.
12. **Right/Left View:** BFS variations to find visible nodes from a specific side.
13. **Count Good Nodes in Binary Tree:** A node is 'good' if its value is greater than or equal to the maximum value on the path from the root to that node. A DFS problem passing down `maxValueSoFar`.

### Questions to Ask the Interviewer:

*   "Are node values unique?"
*   "What should I do if the tree is empty?"
*   "Are there any constraints on the size of the tree or the values of the nodes?"
*   "Is this a BST or a general binary tree?"
*   "Should I consider edge cases like highly skewed trees?"
*   "Is the space complexity of the result list counted against the O(1) space requirement (for Morris Traversal, for example)?" (Usually, it's not.)

By understanding these core concepts, practicing the implementations, and being prepared for variations and edge cases, you'll be well-equipped for tree traversal questions in coding interviews.
```