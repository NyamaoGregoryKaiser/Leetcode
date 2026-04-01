import sys
from src.tree_node import TreeNode

class BSTTraversals:
    """
    Implements algorithms specific to Binary Search Trees (BSTs) that often
    leverage traversal properties.
    """

    # --- Validate Binary Search Tree ---
    # Problem: Determine if a given binary tree is a valid BST.
    # A BST's inorder traversal is sorted. Also, each node's value must be
    # within a specific min/max range defined by its ancestors.

    def is_valid_bst_recursive(self, root: TreeNode) -> bool:
        """
        Determines if a binary tree is a valid BST using a recursive approach
        with min/max bounds. This is the most common and robust approach.

        A node `p` must satisfy:
        1. `min_val < p.val < max_val`
        2. Its left child must satisfy `min_val < p.left.val < p.val`
        3. Its right child must satisfy `p.val < p.right.val < max_val`

        Time Complexity: O(N), where N is the number of nodes, as each node
                         is visited exactly once.
        Space Complexity: O(H), where H is the height of the tree, due to the
                          recursion stack. In the worst case (skewed tree),
                          H can be N, so O(N).
        """
        # Using -sys.maxsize - 1 and sys.maxsize for initial min/max bounds
        # ensures proper comparison even for int_min and int_max values.
        # Python's integers handle arbitrary size, so float('-inf') and float('inf')
        # are also safe and often clearer.
        return self._is_valid_bst_helper(root, float('-inf'), float('inf'))

    def _is_valid_bst_helper(self, node: TreeNode, min_val: float, max_val: float) -> bool:
        """
        Helper function for is_valid_bst_recursive.
        Checks if the subtree rooted at 'node' is a valid BST within the given
        (exclusive) min and max bounds.
        """
        if not node:
            return True # An empty tree is a valid BST

        # Check if the current node's value violates the BST property
        if not (min_val < node.val < max_val):
            return False

        # Recursively check the left subtree:
        # Its values must be less than node.val, so update max_val to node.val
        if not self._is_valid_bst_helper(node.left, min_val, node.val):
            return False
        
        # Recursively check the right subtree:
        # Its values must be greater than node.val, so update min_val to node.val
        if not self._is_valid_bst_helper(node.right, node.val, max_val):
            return False
        
        return True # If both subtrees are valid, and current node is valid

    def is_valid_bst_inorder_iterative(self, root: TreeNode) -> bool:
        """
        Determines if a binary tree is a valid BST using an iterative inorder traversal.
        The property of BSTs is that an inorder traversal produces elements in
        strictly increasing order. We track the `prev_val` encountered.

        Time Complexity: O(N), as each node is visited once.
        Space Complexity: O(H), where H is the height of the tree (for the stack).
                          In the worst case (skewed tree), H can be N, so O(N).
        """
        stack = []
        current = root
        prev_val = float('-inf') # Initialize with negative infinity to allow any first value

        while current or stack:
            # Go left as far as possible
            while current:
                stack.append(current)
                current = current.left
            
            # Pop the next node in inorder sequence
            current = stack.pop()

            # Check if current node's value violates the inorder property
            if current.val <= prev_val:
                return False
            
            prev_val = current.val # Update prev_val
            current = current.right # Move to the right subtree

        return True # If the loop completes, the tree is a valid BST

    # --- Kth Smallest Element in a BST ---
    # Problem: Find the Kth smallest element in a BST.
    # Leveraging the property that an inorder traversal visits nodes in sorted order.

    def kth_smallest_recursive(self, root: TreeNode, k: int) -> int:
        """
        Finds the Kth smallest element in a BST using a recursive inorder traversal.
        The traversal is stopped early once the Kth element is found.

        Time Complexity: O(H + k) in the average case (if K is small or tree is balanced),
                         or O(N) in the worst case (if K is large or tree is skewed).
                         We visit nodes until the Kth one is found.
        Space Complexity: O(H), due to the recursion stack. In the worst case (skewed tree),
                          H can be N, so O(N).
        """
        self.count = 0      # Tracks the number of nodes visited
        self.result = None  # Stores the Kth smallest value

        def _inorder(node):
            # Stop if we've already found the result
            if not node or self.result is not None:
                return
            
            _inorder(node.left)

            # If result is already found by left subtree call, return
            if self.result is not None:
                return

            self.count += 1
            if self.count == k:
                self.result = node.val
                return
            
            _inorder(node.right)

        _inorder(root)
        return self.result

    def kth_smallest_iterative(self, root: TreeNode, k: int) -> int:
        """
        Finds the Kth smallest element in a BST using an iterative inorder traversal.
        The traversal is stopped early once the Kth element is found.

        Time Complexity: O(H + k) in the average case (if K is small or tree is balanced),
                         or O(N) in the worst case (if K is large or tree is skewed).
        Space Complexity: O(H), for the stack. In the worst case (skewed tree), H can be N,
                          so O(N).
        """
        stack = []
        current = root
        count = 0 # Tracks the number of nodes visited

        while current or stack:
            # Go left as far as possible, pushing nodes onto the stack
            while current:
                stack.append(current)
                current = current.left
            
            # Pop the top node (which is the leftmost unvisited node)
            current = stack.pop()
            count += 1 # Increment count for the current node

            if count == k:
                return current.val # Found the Kth smallest

            # Now move to the right subtree
            current = current.right
        
        return -1 # Should not happen if k is valid and tree is non-empty