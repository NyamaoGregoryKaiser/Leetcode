import collections
from src.tree_node import TreeNode

class BasicTraversals:
    """
    Implements fundamental tree traversal algorithms: Inorder, Preorder, Postorder.
    Both recursive and iterative approaches are provided for each.
    """

    # --- Inorder Traversal ---
    # Order: Left -> Root -> Right
    # For a BST, this yields elements in non-decreasing order.

    def inorder_traversal_recursive(self, root: TreeNode) -> list[int]:
        """
        Performs inorder traversal using a recursive approach.
        Time Complexity: O(N), where N is the number of nodes in the tree.
                         Each node is visited exactly once.
        Space Complexity: O(H), where H is the height of the tree.
                          This is due to the recursion stack. In the worst case
                          (skewed tree), H can be N, so O(N).
        """
        result = []

        def _inorder(node):
            if not node:
                return
            _inorder(node.left)    # Traverse left subtree
            result.append(node.val) # Visit root
            _inorder(node.right)   # Traverse right subtree

        _inorder(root)
        return result

    def inorder_traversal_iterative(self, root: TreeNode) -> list[int]:
        """
        Performs inorder traversal using an iterative approach with a stack.
        This approach explicitly manages the call stack.
        Time Complexity: O(N), where N is the number of nodes. Each node is pushed
                         and popped from the stack at most once.
        Space Complexity: O(H), where H is the height of the tree.
                          This is due to the stack. In the worst case (skewed tree),
                          H can be N, so O(N).
        """
        result = []
        stack = []
        current = root

        while current or stack:
            # Go as far left as possible, pushing nodes onto the stack
            while current:
                stack.append(current)
                current = current.left
            
            # Pop the top node (which is the leftmost unvisited node)
            current = stack.pop()
            result.append(current.val) # Visit the node

            # Now move to the right subtree
            current = current.right
        
        return result

    # --- Preorder Traversal ---
    # Order: Root -> Left -> Right
    # Useful for creating a copy of the tree.

    def preorder_traversal_recursive(self, root: TreeNode) -> list[int]:
        """
        Performs preorder traversal using a recursive approach.
        Time Complexity: O(N), where N is the number of nodes.
        Space Complexity: O(H), where H is the height of the tree (recursion stack).
        """
        result = []

        def _preorder(node):
            if not node:
                return
            result.append(node.val) # Visit root
            _preorder(node.left)    # Traverse left subtree
            _preorder(node.right)   # Traverse right subtree

        _preorder(root)
        return result

    def preorder_traversal_iterative(self, root: TreeNode) -> list[int]:
        """
        Performs preorder traversal using an iterative approach with a stack.
        Time Complexity: O(N), where N is the number of nodes.
        Space Complexity: O(H), where H is the height of the tree (stack).
        """
        if not root:
            return []

        result = []
        stack = [root] # Start with the root node

        while stack:
            node = stack.pop() # Pop the current node
            result.append(node.val) # Visit it

            # Push right child first, then left child, so left is processed first
            if node.right:
                stack.append(node.right)
            if node.left:
                stack.append(node.left)
        
        return result

    # --- Postorder Traversal ---
    # Order: Left -> Right -> Root
    # Useful for deleting a tree (children deleted before parent).

    def postorder_traversal_recursive(self, root: TreeNode) -> list[int]:
        """
        Performs postorder traversal using a recursive approach.
        Time Complexity: O(N), where N is the number of nodes.
        Space Complexity: O(H), where H is the height of the tree (recursion stack).
        """
        result = []

        def _postorder(node):
            if not node:
                return
            _postorder(node.left)    # Traverse left subtree
            _postorder(node.right)   # Traverse right subtree
            result.append(node.val) # Visit root

        _postorder(root)
        return result

    def postorder_traversal_iterative(self, root: TreeNode) -> list[int]:
        """
        Performs postorder traversal using an iterative approach with two stacks.
        This is a common method. A single-stack approach is possible but more complex.
        
        The idea is:
        1. Preorder traversal is Root -> Left -> Right.
        2. If we do a modified preorder (Root -> Right -> Left), then reverse the result,
           we get Left -> Right -> Root, which is postorder.

        Time Complexity: O(N), where N is the number of nodes.
        Space Complexity: O(N) in the worst case (for the two stacks, as a skewed tree
                          could push all nodes onto stack1 before processing).
                          More precisely, O(H) for stack1 and O(N) for stack2 (result list).
                          If stack2 is considered part of output, then O(H) for auxiliary space.
        """
        if not root:
            return []

        result = []
        stack1 = [root]
        stack2 = [] # This stack will store nodes in Root -> Right -> Left order

        while stack1:
            node = stack1.pop()
            stack2.append(node.val) # Add to stack2 (effectively Root -> Right -> Left)

            # Push left child first, then right child to stack1
            # So, when popped from stack1, right is processed before left
            if node.left:
                stack1.append(node.left)
            if node.right:
                stack1.append(node.right)
        
        # Reverse stack2 to get Left -> Right -> Root order
        return stack2[::-1]

    def postorder_traversal_iterative_single_stack(self, root: TreeNode) -> list[int]:
        """
        Performs postorder traversal using a single stack.
        This approach is more complex than the two-stack method.
        It requires checking if the right child has been visited before processing the root.

        Time Complexity: O(N), where N is the number of nodes.
        Space Complexity: O(H), where H is the height of the tree (stack).
        """
        if not root:
            return []

        result = []
        stack = []
        current = root
        last_visited = None # Keep track of the last node whose value was added to result

        while current or stack:
            # Go as far left as possible
            while current:
                stack.append(current)
                current = current.left
            
            # Peek at the top of the stack
            node = stack[-1]

            # If node has no right child OR right child has already been visited,
            # then process the node and pop it.
            if not node.right or node.right == last_visited:
                result.append(node.val)
                last_visited = stack.pop() # Mark this node as last visited
                current = None # Reset current to None to ensure we process stack top
                               # instead of immediately going right (which we already handled)
            else:
                # Else, the right subtree needs to be visited
                current = node.right
        
        return result