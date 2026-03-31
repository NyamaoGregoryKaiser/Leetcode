```java
package tree_traversals;

import java.util.*;

/**
 * This class provides implementations for various binary tree traversal problems.
 * It includes classic DFS (Inorder, Preorder, Postorder) using both recursive and iterative approaches,
 * and BFS (Level Order, Zigzag, Right Side View, Vertical Order) traversals.
 */
public class TreeTraversals {

    // --- Problem 1: Standard Traversals (Inorder, Preorder, Postorder) ---

    // --- Inorder Traversal (Left -> Root -> Right) ---

    /**
     * Performs an Inorder Traversal recursively.
     * The order of visiting nodes is Left child, then Root, then Right child.
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the inorder traversal of the tree.
     *
     * Time Complexity: O(N), where N is the number of nodes in the tree. Each node is visited once.
     * Space Complexity: O(H), where H is the height of the tree. This is due to the recursion stack.
     *                   In the worst case (skewed tree), H can be N, so O(N).
     *                   In the best case (balanced tree), H is log N, so O(log N).
     */
    public List<Integer> inorderTraversalRecursive(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        inorderHelperRecursive(root, result);
        return result;
    }

    private void inorderHelperRecursive(TreeNode node, List<Integer> result) {
        if (node == null) {
            return;
        }
        inorderHelperRecursive(node.left, result);  // Traverse left subtree
        result.add(node.val);                       // Visit root
        inorderHelperRecursive(node.right, result); // Traverse right subtree
    }

    /**
     * Performs an Inorder Traversal iteratively using a stack.
     * This approach mimics the recursion call stack explicitly.
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the inorder traversal of the tree.
     *
     * Time Complexity: O(N), where N is the number of nodes in the tree. Each node is pushed and popped once.
     * Space Complexity: O(H), where H is the height of the tree. This is due to the stack.
     *                   In the worst case (skewed tree), H can be N, so O(N).
     *                   In the best case (balanced tree), H is log N, so O(log N).
     */
    public List<Integer> inorderTraversalIterative(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        Stack<TreeNode> stack = new Stack<>();
        TreeNode current = root;

        while (current != null || !stack.isEmpty()) {
            // Traverse to the leftmost node, pushing all visited nodes onto the stack
            while (current != null) {
                stack.push(current);
                current = current.left;
            }

            // Pop the top node (which is the leftmost unvisited node)
            current = stack.pop();
            result.add(current.val); // Visit the node

            // Now, process its right subtree
            current = current.right;
        }
        return result;
    }

    // --- Preorder Traversal (Root -> Left -> Right) ---

    /**
     * Performs a Preorder Traversal recursively.
     * The order of visiting nodes is Root, then Left child, then Right child.
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the preorder traversal of the tree.
     *
     * Time Complexity: O(N). Each node is visited once.
     * Space Complexity: O(H) for recursion stack.
     */
    public List<Integer> preorderTraversalRecursive(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        preorderHelperRecursive(root, result);
        return result;
    }

    private void preorderHelperRecursive(TreeNode node, List<Integer> result) {
        if (node == null) {
            return;
        }
        result.add(node.val);                       // Visit root
        preorderHelperRecursive(node.left, result);  // Traverse left subtree
        preorderHelperRecursive(node.right, result); // Traverse right subtree
    }

    /**
     * Performs a Preorder Traversal iteratively using a stack.
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the preorder traversal of the tree.
     *
     * Time Complexity: O(N). Each node is pushed and popped once.
     * Space Complexity: O(H) for stack.
     */
    public List<Integer> preorderTraversalIterative(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);

        while (!stack.isEmpty()) {
            TreeNode current = stack.pop();
            result.add(current.val); // Visit the node

            // Push right child first, then left child.
            // This ensures left child is processed before right child
            // because stack is LIFO.
            if (current.right != null) {
                stack.push(current.right);
            }
            if (current.left != null) {
                stack.push(current.left);
            }
        }
        return result;
    }

    // --- Postorder Traversal (Left -> Right -> Root) ---

    /**
     * Performs a Postorder Traversal recursively.
     * The order of visiting nodes is Left child, then Right child, then Root.
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the postorder traversal of the tree.
     *
     * Time Complexity: O(N). Each node is visited once.
     * Space Complexity: O(H) for recursion stack.
     */
    public List<Integer> postorderTraversalRecursive(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        postorderHelperRecursive(root, result);
        return result;
    }

    private void postorderHelperRecursive(TreeNode node, List<Integer> result) {
        if (node == null) {
            return;
        }
        postorderHelperRecursive(node.left, result);  // Traverse left subtree
        postorderHelperRecursive(node.right, result); // Traverse right subtree
        result.add(node.val);                       // Visit root
    }

    /**
     * Performs a Postorder Traversal iteratively using two stacks.
     * This is a common method for iterative postorder.
     * The first stack is used for standard preorder-like processing (Root, Right, Left).
     * The second stack collects the elements in reverse postorder (Root, Right, Left becomes Left, Right, Root when popped).
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the postorder traversal of the tree.
     *
     * Time Complexity: O(N). Each node is pushed and popped twice (once from s1, once from s2).
     * Space Complexity: O(H) for both stacks.
     */
    public List<Integer> postorderTraversalIterativeTwoStacks(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        Stack<TreeNode> s1 = new Stack<>(); // Main stack for processing
        Stack<TreeNode> s2 = new Stack<>(); // Stack to store result in reverse order

        s1.push(root);

        while (!s1.isEmpty()) {
            TreeNode current = s1.pop();
            s2.push(current); // Push to s2 (will be popped in L->R->Root order)

            // Push left child first, then right child to s1.
            // This ensures right child is processed before left child on s1's next pop.
            if (current.left != null) {
                s1.push(current.left);
            }
            if (current.right != null) {
                s1.push(current.right);
            }
        }

        // Pop all elements from s2 to get the final postorder traversal
        while (!s2.isEmpty()) {
            result.add(s2.pop().val);
        }
        return result;
    }

    /**
     * Performs a Postorder Traversal iteratively using one stack.
     * This method is more complex but uses less space than two stacks.
     * It relies on tracking the `lastVisited` node to determine if the right child has been processed.
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the postorder traversal of the tree.
     *
     * Time Complexity: O(N). Each node is visited multiple times (pushed, popped, peeked).
     * Space Complexity: O(H) for the stack.
     */
    public List<Integer> postorderTraversalIterativeOneStack(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        Stack<TreeNode> stack = new Stack<>();
        TreeNode current = root;
        TreeNode lastVisited = null; // Tracks the last node added to the result

        while (current != null || !stack.isEmpty()) {
            // Traverse to the leftmost node
            while (current != null) {
                stack.push(current);
                current = current.left;
            }

            // Peek at the top of the stack
            TreeNode peekNode = stack.peek();

            // If the right child exists and hasn't been visited yet, go right
            if (peekNode.right != null && peekNode.right != lastVisited) {
                current = peekNode.right;
            } else {
                // Otherwise, pop the node (both left and right subtrees processed or null)
                result.add(peekNode.val);
                lastVisited = stack.pop(); // Mark as last visited
            }
        }
        return result;
    }

    // --- Problem 2: Level Order Traversal (BFS) ---

    /**
     * Performs a Level Order Traversal (Breadth-First Search).
     * Visits nodes level by level from left to right.
     *
     * @param root The root of the binary tree.
     * @return A list of lists of integers, where each inner list represents a level of the tree.
     *
     * Time Complexity: O(N). Each node is visited and enqueued/dequeued exactly once.
     * Space Complexity: O(W), where W is the maximum width of the tree. In the worst case (complete binary tree),
     *                   W can be N/2, so O(N). In the best case (skewed tree), W is 1, so O(1).
     */
    public List<List<Integer>> levelOrderTraversal(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size(); // Number of nodes at the current level
            List<Integer> currentLevelNodes = new ArrayList<>();

            for (int i = 0; i < levelSize; i++) {
                TreeNode current = queue.poll();
                currentLevelNodes.add(current.val);

                if (current.left != null) {
                    queue.offer(current.left);
                }
                if (current.right != null) {
                    queue.offer(current.right);
                }
            }
            result.add(currentLevelNodes);
        }
        return result;
    }

    // --- Problem 3: Zigzag Level Order Traversal ---

    /**
     * Performs a Zigzag Level Order Traversal.
     * Nodes are traversed level by level, but the order alternates:
     * - Level 0: Left to Right
     * - Level 1: Right to Left
     * - Level 2: Left to Right
     * ... and so on.
     *
     * This is achieved using a Deque (double-ended queue) for each level,
     * or by adding elements to the result list from the beginning/end based on level parity.
     *
     * @param root The root of the binary tree.
     * @return A list of lists of integers, representing the zigzag traversal.
     *
     * Time Complexity: O(N). Each node is visited and enqueued/dequeued once.
     * Space Complexity: O(W), where W is the maximum width of the tree (for the queue).
     */
    public List<List<Integer>> zigzagLevelOrderTraversal(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        boolean leftToRight = true; // Direction flag for current level

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            // Use a LinkedList to efficiently add elements to front/back
            LinkedList<Integer> currentLevelNodes = new LinkedList<>();

            for (int i = 0; i < levelSize; i++) {
                TreeNode current = queue.poll();

                if (leftToRight) {
                    currentLevelNodes.addLast(current.val); // Add to end for L-R
                } else {
                    currentLevelNodes.addFirst(current.val); // Add to front for R-L
                }

                if (current.left != null) {
                    queue.offer(current.left);
                }
                if (current.right != null) {
                    queue.offer(current.right);
                }
            }
            result.add(currentLevelNodes);
            leftToRight = !leftToRight; // Toggle direction for next level
        }
        return result;
    }

    // --- Problem 4: Binary Tree Right Side View ---

    /**
     * Given the `root` of a binary tree, imagine you stand on the right side of it,
     * return the values of the nodes you can see ordered from top to bottom.
     * This can be solved efficiently using a Level Order Traversal (BFS).
     * For each level, the last node encountered (or the first node if traversing right-to-left)
     * will be the one visible from the right side.
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the right side view of the tree.
     *
     * Time Complexity: O(N). Each node is visited and enqueued/dequeued once.
     * Space Complexity: O(W) for the queue.
     */
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            // The value of the first node popped from the queue at each level (when processing left to right)
            // will be the rightmost node for that level, because we add children left then right.
            // If we add nodes to queue from left to right, then the last node processed for a level will be visible.
            // A simpler approach: add the value of the first node of each level to the result list.
            // Wait, this is `right side view`. So, for each level, we want the rightmost node.
            // If we traverse L->R for a level, the last element processed is the rightmost.
            // Or, more robust: iterate from right to left in the current level.
            // Let's stick with the common pattern: iterate L->R, and the LAST node processed is the rightmost.

            for (int i = 0; i < levelSize; i++) {
                TreeNode current = queue.poll();

                // If it's the last node of the current level, it's visible from the right side
                if (i == levelSize - 1) {
                    result.add(current.val);
                }

                // Enqueue children for the next level (left first, then right)
                if (current.left != null) {
                    queue.offer(current.left);
                }
                if (current.right != null) {
                    queue.offer(current.right);
                }
            }
        }
        return result;
    }


    // --- Problem 5: Vertical Order Traversal ---

    /**
     * Performs a Vertical Order Traversal of a binary tree.
     * Nodes are ordered by their column index. Within each column, nodes are ordered by row index (depth).
     * If nodes are at the same column and row, they are ordered by their value.
     *
     * This problem requires tracking both the node itself and its column index (horizontal distance from root).
     * A BFS approach is suitable, using a Queue to store `(Node, Column)` pairs.
     * A `TreeMap` is used to store nodes grouped by column, ensuring columns are naturally sorted.
     * Each column then stores a list of nodes, which can be further sorted by row then value.
     *
     * @param root The root of the binary tree.
     * @return A list of lists of integers, representing the vertical traversal.
     *
     * Time Complexity: O(N log W) where N is the number of nodes and W is the width of the tree.
     *                  N nodes are processed. For each node, map operations take log W time (if using TreeMap),
     *                  and sorting within columns can add to this if there are many nodes at the same column.
     *                  If a simple HashMap is used and then keys are sorted: O(N + W log W + N log D) where D is max nodes in a column.
     * Space Complexity: O(N) for the map and queue.
     */
    public List<List<Integer>> verticalOrderTraversal(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        // TreeMap to store nodes by column index.
        // Key: Column index (horizontal distance from root, root is 0).
        // Value: Another TreeMap to store nodes by row index (depth).
        // Key: Row index (depth from root, root is 0).
        // Value: List of node values at that specific column and row.
        TreeMap<Integer, TreeMap<Integer, List<Integer>>> columns = new TreeMap<>();
        Queue<NodeInfo> queue = new LinkedList<>();

        // Start with the root at column 0, row 0
        queue.offer(new NodeInfo(root, 0, 0));

        // Keep track of min and max column indices to iterate through later
        int minCol = 0, maxCol = 0;

        while (!queue.isEmpty()) {
            NodeInfo current = queue.poll();
            TreeNode node = current.node;
            int col = current.col;
            int row = current.row;

            // Update min/max column indices
            minCol = Math.min(minCol, col);
            maxCol = Math.max(maxCol, col);

            // Add node to the map
            columns.putIfAbsent(col, new TreeMap<>());
            columns.get(col).putIfAbsent(row, new ArrayList<>());
            columns.get(col).get(row).add(node.val);

            if (node.left != null) {
                queue.offer(new NodeInfo(node.left, col - 1, row + 1));
            }
            if (node.right != null) {
                queue.offer(new NodeInfo(node.right, col + 1, row + 1));
            }
        }

        // Construct the final result list
        for (int col = minCol; col <= maxCol; col++) {
            List<Integer> verticalList = new ArrayList<>();
            // Get all nodes for the current column, ordered by row
            if (columns.containsKey(col)) {
                for (List<Integer> nodesAtRow : columns.get(col).values()) {
                    // For nodes at the same column and row, sort by value as per problem statement
                    Collections.sort(nodesAtRow);
                    verticalList.addAll(nodesAtRow);
                }
            }
            result.add(verticalList);
        }

        return result;
    }

    // Helper class to store Node with its column and row indices
    private static class NodeInfo {
        TreeNode node;
        int col;
        int row;

        NodeInfo(TreeNode node, int col, int row) {
            this.node = node;
            this.col = col;
            this.row = row;
        }
    }
}
```