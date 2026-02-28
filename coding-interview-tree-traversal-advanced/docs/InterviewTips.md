```markdown
# Interview Tips for Tree Traversal Problems

Tree traversal problems are a cornerstone of data structure and algorithm interviews. Mastering them demonstrates a strong grasp of recursion, iteration, and fundamental data structures like stacks and queues. Here are some tips and considerations for your interview:

## 1. Understand the Fundamentals

*   **Recursion vs. Iteration:** Be comfortable implementing all three DFS traversals (Inorder, Preorder, Postorder) both recursively and iteratively. Iterative solutions typically use a stack.
*   **DFS vs. BFS:** Know when to apply DFS (e.g., finding paths, checking existence, max depth) and when to apply BFS (e.g., shortest path in unweighted graph, level-by-level processing, min depth). BFS uses a queue.
*   **Time & Space Complexity:** Always be prepared to analyze the complexity of your solutions.
    *   **Time:** Almost always O(N) for traversals (visiting each node once).
    *   **Space (DFS):** O(H) where H is the height of the tree, for the recursion stack or explicit stack. H can be N (skewed tree) or logN (balanced tree).
    *   **Space (BFS):** O(W) where W is the maximum width of the tree, for the queue. W can be N (complete tree's last level) or 1 (skewed tree).

## 2. Asking Clarifying Questions

Before jumping into code, clarify details with your interviewer:

*   **Binary Tree vs. N-ary Tree:** Assume binary unless stated otherwise, but clarify if it's N-ary (more than 2 children).
*   **Node Structure:** What does a `TreeNode` look like? (e.g., `value`, `left`, `right`).
*   **Input/Output:** How is the tree given (e.g., `TreeNode root` object)? What's the expected output format (e.g., `List<Integer>`, `List<List<Integer>>`)?
*   **Empty Tree/Single Node:** How should an empty tree or a tree with a single node be handled? These are crucial edge cases.
*   **Value Range:** Are node values unique? Are they positive/negative?
*   **Constraints:** What are the maximum number of nodes? This can inform complexity choices (e.g., recursion depth limits).

## 3. Step-by-Step Approach

1.  **Understand the Problem:** Clearly grasp the specific traversal or tree problem.
2.  **Example:** Work through a small example tree manually to confirm the expected output.
3.  **High-Level Algorithm:** Explain your chosen traversal strategy (e.g., "I'll use recursive inorder traversal").
4.  **Data Structures:** Mention the data structures you'll use (e.g., "a Stack for iterative DFS," "a Queue for BFS").
5.  **Edge Cases:** Discuss how you'll handle `null` root, single nodes, and skewed trees.
6.  **Code:** Write your code, explaining your logic as you go.
7.  **Test:** Walk through your code with the example tree, tracing variables and data structures (stack/queue).
8.  **Optimize & Analyze:** Discuss time/space complexity and potential optimizations or alternative approaches.

## 4. Key Traversal Logic and Gotchas

### DFS Traversals (Inorder, Preorder, Postorder)

*   **Recursive:**
    *   Very clean and concise.
    *   Potential for `StackOverflowError` with very deep (skewed) trees due to recursion depth limits (JVM default stack size). Be aware of this trade-off.
    *   The `result` list is often passed by reference or collected in a class member variable.

*   **Iterative:**
    *   Avoids `StackOverflowError` and gives more control over memory.
    *   **Inorder Iterative:** The "go left as far as possible, push to stack, pop, add to result, then go right" pattern is fundamental.
    *   **Preorder Iterative:** Push root, then pop. Push right child, then left child (to ensure left is processed first).
    *   **Postorder Iterative (Two Stacks):** This is often the easiest to grasp. Simulates `Root -> Right -> Left` and then reverses it. Be clear on *why* you push left then right to the first stack.
    *   **Postorder Iterative (One Stack):** More complex, often requires tracking the `lastVisited` node to know if the right subtree has been processed. Good to know, but two stacks are usually acceptable.

### BFS Traversals (Level Order, Zigzag Level Order)

*   **Standard Level Order:**
    *   Use a `Queue` (e.g., `LinkedList` in Java).
    *   The pattern `int levelSize = queue.size(); for (int i=0; i<levelSize; i++) { ... }` is critical to process one level at a time.
    *   Always enqueue children (left then right) for the next level.

*   **Zigzag Level Order:**
    *   Still use a `Queue` for level-by-level processing.
    *   To handle alternating directions, use a `Deque` (e.g., `LinkedList`) for storing the values of the *current* level.
    *   For left-to-right levels, add to `deque.addLast()`.
    *   For right-to-left levels, add to `deque.addFirst()`.
    *   Remember to toggle a boolean flag (`leftToRight`) after each level.

## 5. Variations and Related Problems

Be prepared for variations or problems that use traversals as a building block:

*   **Validate Binary Search Tree (BST):** Inorder traversal of a BST gives sorted elements. You can check this property.
*   **Symmetric Tree:** Check if left and right subtrees are mirror images.
*   **Path Sum / Path Sum II / Path Sum III:** Find paths that sum to a target. Often involves DFS.
*   **Lowest Common Ancestor (LCA):** Find the LCA of two nodes.
*   **Tree Serialization/Deserialization:** Preorder or level order are commonly used for this.
*   **Min/Max Depth:** As implemented in this project.
*   **Count Nodes:** Simple traversal and count.
*   **Check if Two Trees are Identical:** Recursive check of value and structure.

## 6. Interview Etiquette

*   **Communicate:** Talk through your thought process, even if you're stuck.
*   **Code Clarity:** Write clean, readable code with meaningful variable names.
*   **Handle Edge Cases:** Explicitly check for `root == null` at the beginning of your functions.
*   **Stay Calm:** If you get stuck, take a deep breath, review your logic, and ask for hints if appropriate.

By following these tips and thoroughly understanding the material in this project, you'll be well-prepared to tackle tree traversal problems in your coding interviews. Good luck!
```