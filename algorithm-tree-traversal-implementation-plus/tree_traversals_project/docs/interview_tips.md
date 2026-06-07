```markdown
# Interview Tips and Variations for Tree Traversals

This document provides advice for tackling tree traversal problems in coding interviews, including common pitfalls, follow-up questions, and variations.

## 1. General Interview Strategy for Tree Problems

*   **Clarify:**
    *   Is it a Binary Tree or a N-ary Tree? (All problems in this project assume Binary Trees)
    *   Are node values unique?
    *   Can the tree be empty? A single node? Skewed?
    *   What are the constraints on node values (positive, negative, range)?
    *   What is the expected output format? (flat list, list of lists, `void` function modifying an external list, etc.)
*   **Start with Base Cases:** Always consider `nullptr` (empty tree) and single-node trees.
*   **Recursive vs. Iterative:**
    *   **Recursion:** Often simpler to write and understand for DFS.
        *   *Pros:* Elegant, concise.
        *   *Cons:* Can lead to stack overflow for very deep (skewed) trees if not optimized (Tail Call Optimization is not guaranteed in C++). Might be harder to debug.
    *   **Iteration:** Uses an explicit stack (for DFS) or queue (for BFS), giving more control.
        *   *Pros:* No stack overflow risk. Explicit control over state.
        *   *Cons:* Can be more verbose and harder to reason about for some people.
    *   **Recommendation:** Be prepared to implement both for standard DFS traversals. Iterative solutions are often a good "optimized" alternative.
*   **Time & Space Complexity:** Always state and justify your complexity.
    *   *Time:* Typically O(N) as each node is visited once.
    *   *Space:*
        *   DFS (recursive): O(H) due to recursion stack (worst case O(N) for skewed tree).
        *   DFS (iterative): O(H) due to explicit stack (worst case O(N)).
        *   BFS: O(W) due to queue (worst case O(N) for wide trees).
*   **"Draw it out" / Examples:** Use small examples to trace your logic, especially for complex traversals like Zigzag or Boundary. This helps catch mistakes and explain your approach.
*   **Test Cases:** Think about edge cases: null tree, single node, skewed tree (left/right), complete tree, incomplete tree.

## 2. Tips for Specific Traversal Types

### Standard DFS (Inorder, Preorder, Postorder)

*   **Recursive:** This should be your first thought for DFS. It's concise.
    *   **Inorder:** Left, Root, Right. Key for BSTs (sorted order).
    *   **Preorder:** Root, Left, Right. Key for copying/serializing trees.
    *   **Postorder:** Left, Right, Root. Key for deleting/deserializing (postfix expr).
*   **Iterative (Stack-based):**
    *   **Preorder:** Push Root. While stack not empty, pop, add to result, push Right, push Left.
    *   **Inorder:** While current or stack not empty, go left pushing to stack; then pop, add to result, go right.
    *   **Postorder:** Most complex with one stack. Easier with two stacks (push to `s1`, move to `s2`; then pop `s2` for result).

**Common Variations/Follow-ups:**
*   **Path problems:** "Find all paths from root to leaf." (DFS backtracking)
*   **Sum problems:** "Sum of all paths from root to leaf." (DFS backtracking)
*   **Validation:** "Is this a valid BST?" (Use inorder traversal: check if `prev` < `current`).
*   **Serialization/Deserialization:** Preorder traversal is often used.
*   **Construct tree from traversals:** Given inorder and preorder (or postorder), reconstruct the tree. (Advanced, but common).

### Level Order Traversal (BFS)

*   **Key Data Structure:** `std::queue`.
*   **Variants:**
    *   **Levels Separated:** Use a `for` loop `level_size` times in the `while` loop to process one level at a time.
    *   **Right/Left View:** The last (or first) element of each level's list (from levels separated traversal) gives the right (or left) view.
    *   **Bottom-Up Level Order:** Perform regular level order, then reverse the outer vector of vectors.
    *   **Minimum/Maximum Depth/Height:** Level order can find minimum depth easily (first leaf encountered). Maximum depth requires full traversal.

**Common Variations/Follow-ups:**
*   **N-ary Tree Level Order:** Same logic, just iterate over `node->children` vector.
*   **Connect nodes at same level:** Store `next` pointer (e.g., LeetCode "Populating Next Right Pointers in Each Node").
*   **Max width of tree:** Keep track of the maximum `level_size`.

### Zigzag Level Order Traversal

*   **Key Idea:** Alternate direction for levels.
*   **Implementation:**
    1.  Use `std::queue` for standard BFS to get nodes for a level.
    2.  Collect current level nodes.
    3.  If it's an "even" level (0-indexed, `0, 2, 4...`), add normally.
    4.  If it's an "odd" level (`1, 3, 5...`), `std::reverse` the collected level nodes before adding.
    *   Alternative: Use `std::deque` and `push_front/push_back` strategically. This can be more complex to implement correctly on the fly. Stick to queue + reverse unless comfortable.

**Common Variations/Follow-ups:**
*   Could be combined with other level order variations (e.g., zigzag right view, though that's less common).

### Boundary Traversal

*   **Key Idea:** Combine left boundary (top-down), leaves (left-to-right), right boundary (bottom-up).
*   **Pitfalls:**
    *   **Root handling:** Add root separately. If root is also a leaf, it's the only node.
    *   **Duplicates:** Ensure nodes aren't added twice (e.g., a leaf shouldn't be added as part of left boundary and then again as a leaf). The common solution avoids adding leaves in boundary-collecting functions.
    *   **Empty branches:** If a node has only a right child but no left child, the right child (and its left subtree) might be part of the "left boundary". Vice versa for right boundary.

**Common Variations/Follow-ups:**
*   Variations might involve only specific parts of the boundary or different definitions of what constitutes a "boundary" node (e.g., all nodes except those directly under a child that's not a boundary node).

### Kth Smallest Element in a BST

*   **Key Idea:** Inorder traversal of a BST gives elements in sorted order.
*   **Approaches:**
    1.  **Inorder Traversal (Recursive or Iterative):** Perform inorder traversal and count. Stop when `k` becomes 0.
        *   *Time:* O(H + k) or O(N) in worst case.
        *   *Space:* O(H) or O(N) in worst case.
    2.  **Augmented BST:** If modifications to the BST are allowed, each node could store the size of its left subtree. This allows finding the Kth smallest in O(H) time. (More advanced).
    3.  **Morris Traversal:** O(N) time, O(1) space, but modifies the tree temporarily. (Advanced, rarely expected unless specifically asked).

**Common Variations/Follow-ups:**
*   **Kth Largest:** Similar, but either reverse inorder traversal (Right -> Root -> Left) or find `(N-k+1)`-th smallest.
*   **Find `k` in range `[L, R]`:** Modify inorder to only count within the range.
*   **BST Iterator:** Design an iterator for a BST that returns elements in sorted order (uses iterative inorder traversal internally).

## 3. Interview "Gotchas" and Edge Cases

*   **Empty Tree (`nullptr` root):** Your code should handle this gracefully (usually return empty list/0/-1).
*   **Single Node Tree:** Often a simpler base case.
*   **Skewed Trees (linked list-like):**
    *   `1 -> 2 -> 3` (right skewed)
    *   `1 <- 2 <- 3` (left skewed)
    *   Recursive solutions can hit stack overflow errors if the height `H` is very large (e.g., 10^5 nodes) and the recursion depth limit is exceeded. Iterative solutions avoid this. This is why interviewers often ask for iterative DFS.
*   **Disconnected Tree/Graph Cycles:** Tree traversal algorithms assume a valid tree structure (no cycles, single root).
*   **Mutable Tree:** If the problem allows tree modification (e.g., Morris traversal, augmenting nodes with subtree sizes), be aware of side effects.
*   **Large Node Values:** Ensure your data type (`int`, `long long`) can handle the values.
*   **Input Format:** Always confirm the input format (e.g., adjacency list for graph, linked structure for tree, array representation for binary heaps). Here, we use `TreeNode*` and a helper to build from `vector<optional<int>>`.

By understanding these concepts, practicing implementations, and preparing for variations, you'll be well-equipped to handle tree traversal problems in coding interviews.