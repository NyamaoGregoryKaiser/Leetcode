import collections
from src.data_structures import TreeNode

# --- Problem 1: Basic DFS Traversals (Inorder, Preorder, Postorder) ---

class DFSTraversals:
    """
    Implements standard Depth-First Search (DFS) traversals:
    Inorder, Preorder, Postorder, with both recursive and iterative approaches.
    """

    @staticmethod
    def inorder_recursive(root: TreeNode) -> list[int]:
        """
        Performs an Inorder Traversal recursively.
        Visits nodes in the order: Left -> Root -> Right.
        This traversal, when applied to a BST, yields elements in sorted order.

        Time Complexity: O(N), where N is the number of nodes in the tree.
                         Each node is visited exactly once.
        Space Complexity: O(H) in the worst case (skewed tree), where H is the height of the tree.
                          This space is used by the recursion stack. In a balanced tree, H = log N.
                          In a skewed tree, H = N.
        """
        result = []
        def _traverse(node: TreeNode):
            if not node:
                return
            _traverse(node.left)
            result.append(node.val)
            _traverse(node.right)
        _traverse(root)
        return result

    @staticmethod
    def inorder_iterative(root: TreeNode) -> list[int]:
        """
        Performs an Inorder Traversal iteratively using a stack.
        Visits nodes in the order: Left -> Root -> Right.

        Algorithm:
        1. Initialize an empty stack and an empty result list.
        2. Set current node to root.
        3. Loop while current node is not None or stack is not empty:
           a. While current node is not None:
              Push current node onto the stack.
              Move current node to its left child (go left as much as possible).
           b. Pop a node from the stack. This is the 'Root' part.
              Add its value to the result list.
           c. Move current node to its right child (process right subtree).

        Time Complexity: O(N), where N is the number of nodes. Each node is pushed and popped once.
        Space Complexity: O(H) in the worst case (skewed tree), where H is the height of the tree.
                          This space is used by the stack.
        """
        result = []
        stack = []
        current = root
        
        while current or stack:
            # Reach the leftmost node of the current subtree
            while current:
                stack.append(current)
                current = current.left
            
            # Current must be None at this point, so pop from stack
            current = stack.pop()
            result.append(current.val) # Visit the node (Root)
            
            # Now go to the right subtree
            current = current.right
            
        return result

    @staticmethod
    def preorder_recursive(root: TreeNode) -> list[int]:
        """
        Performs a Preorder Traversal recursively.
        Visits nodes in the order: Root -> Left -> Right.
        This traversal is useful for creating a copy of the tree or for prefix expressions.

        Time Complexity: O(N), where N is the number of nodes.
        Space Complexity: O(H) in the worst case (skewed tree), for the recursion stack.
        """
        result = []
        def _traverse(node: TreeNode):
            if not node:
                return
            result.append(node.val) # Visit root first
            _traverse(node.left)
            _traverse(node.right)
        _traverse(root)
        return result

    @staticmethod
    def preorder_iterative(root: TreeNode) -> list[int]:
        """
        Performs a Preorder Traversal iteratively using a stack.
        Visits nodes in the order: Root -> Left -> Right.

        Algorithm:
        1. Initialize an empty stack and an empty result list.
        2. If root is None, return empty result.
        3. Push root onto the stack.
        4. While stack is not empty:
           a. Pop a node from the stack.
           b. Add its value to the result list (Visit Root).
           c. Push its right child onto the stack (if exists).
           d. Push its left child onto the stack (if exists).
              (Right child is pushed before left because stack is LIFO,
               so left child will be processed first).

        Time Complexity: O(N), where N is the number of nodes.
        Space Complexity: O(H) in the worst case (skewed tree), for the stack.
        """
        result = []
        if not root:
            return result
        
        stack = [root]
        while stack:
            node = stack.pop()
            result.append(node.val) # Visit Root
            
            # Push right child first so left child is processed next
            if node.right:
                stack.append(node.right)
            if node.left:
                stack.append(node.left)
                
        return result

    @staticmethod
    def postorder_recursive(root: TreeNode) -> list[int]:
        """
        Performs a Postorder Traversal recursively.
        Visits nodes in the order: Left -> Right -> Root.
        This traversal is useful for deleting a tree or for postfix expressions.

        Time Complexity: O(N), where N is the number of nodes.
        Space Complexity: O(H) in the worst case (skewed tree), for the recursion stack.
        """
        result = []
        def _traverse(node: TreeNode):
            if not node:
                return
            _traverse(node.left)
            _traverse(node.right)
            result.append(node.val) # Visit root last
        _traverse(root)
        return result

    @staticmethod
    def postorder_iterative(root: TreeNode) -> list[int]:
        """
        Performs a Postorder Traversal iteratively using two stacks.
        Visits nodes in the order: Left -> Right -> Root.

        Algorithm (Two-Stack Approach):
        1. Initialize two stacks, s1 and s2, and an empty result list.
        2. Push root onto s1.
        3. While s1 is not empty:
           a. Pop a node from s1.
           b. Push this node onto s2.
           c. Push its left child onto s1 (if exists).
           d. Push its right child onto s1 (if exists).
        4. While s2 is not empty:
           Pop nodes from s2 and append their values to the result list.
           (s2 will contain nodes in Root -> Right -> Left order,
            popping from it reverses this to Left -> Right -> Root).

        Time Complexity: O(N), where N is the number of nodes.
        Space Complexity: O(N) in the worst case, as both stacks could hold up to N nodes.
        """
        result = []
        if not root:
            return result
        
        s1 = [root]
        s2 = []
        
        while s1:
            node = s1.pop()
            s2.append(node)
            
            if node.left:
                s1.append(node.left)
            if node.right:
                s1.append(node.right)
                
        while s2:
            result.append(s2.pop().val)
            
        return result

    # Alternative iterative postorder (one stack, more complex)
    @staticmethod
    def postorder_iterative_one_stack(root: TreeNode) -> list[int]:
        """
        Performs a Postorder Traversal iteratively using a single stack.
        This approach is more complex than the two-stack method but saves some space.

        Algorithm:
        1. Initialize an empty stack and an empty result list.
        2. Set current node to root.
        3. Loop while current node is not None or stack is not empty:
           a. While current node is not None:
              Push current node onto the stack.
              Move current node to its left child.
           b. Peek at the top of the stack (node_from_stack).
           c. If node_from_stack has a right child AND the right child
              was NOT the last node processed (i.e., it hasn't been visited yet):
              Move current node to node_from_stack.right.
           d. Else (no right child, or right child already visited):
              Pop node_from_stack from the stack.
              Add its value to the result list.
              Set current node to None (to avoid re-visiting left subtree).
              Keep track of last visited node to handle right child condition.

        Time Complexity: O(N).
        Space Complexity: O(H) for the stack.
        """
        result = []
        stack = []
        current = root
        last_visited_node = None # To distinguish between returning from left vs. right subtree
        
        while current or stack:
            if current:
                stack.append(current)
                current = current.left
            else:
                peek_node = stack[-1]
                # If right child exists and has not been visited yet
                if peek_node.right and peek_node.right != last_visited_node:
                    current = peek_node.right
                else:
                    # No right child or right child has been visited
                    last_visited_node = stack.pop()
                    result.append(last_visited_node.val)
                    current = None # Important: ensures we don't go left again
        return result


# --- Problem 2: Basic BFS Traversals (Level Order) ---

class BFSTraversals:
    """
    Implements standard Breadth-First Search (BFS) / Level Order Traversal.
    """

    @staticmethod
    def level_order(root: TreeNode) -> list[list[int]]:
        """
        Performs a Level Order Traversal (BFS).
        Visits nodes level by level, from left to right.

        Algorithm:
        1. Initialize an empty list of lists for the result.
        2. If root is None, return the empty result.
        3. Initialize a deque (double-ended queue) and add the root to it.
        4. While the queue is not empty:
           a. Get the number of nodes at the current level (queue size).
           b. Initialize an empty list for nodes at the current level.
           c. For each node at the current level:
              i. Dequeue a node.
              ii. Add its value to the current level's list.
              iii. Enqueue its left child (if exists).
              iv. Enqueue its right child (if exists).
           d. Add the current level's list to the overall result.

        Time Complexity: O(N), where N is the number of nodes. Each node is enqueued and dequeued once.
        Space Complexity: O(W) in the worst case, where W is the maximum width of the tree.
                          In a complete binary tree, W can be up to N/2, so O(N).
        """
        result = []
        if not root:
            return result
        
        queue = collections.deque([root])
        
        while queue:
            level_size = len(queue)
            current_level_nodes = []
            
            for _ in range(level_size):
                node = queue.popleft()
                current_level_nodes.append(node.val)
                
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            
            result.append(current_level_nodes)
            
        return result

# --- Problem 3: Zigzag Level Order Traversal ---

    @staticmethod
    def zigzag_level_order(root: TreeNode) -> list[list[int]]:
        """
        Performs a Zigzag Level Order Traversal.
        Alternates between left-to-right and right-to-left for each level.

        Algorithm:
        1. Similar to regular Level Order Traversal, using a deque.
        2. Maintain a `left_to_right` boolean flag, initialized to True.
        3. For each level:
           a. Collect nodes for the current level.
           b. If `left_to_right` is True, append nodes as collected.
           c. If `left_to_right` is False, reverse the collected nodes before appending.
           d. Toggle `left_to_right` for the next level.

        Time Complexity: O(N), where N is the number of nodes. Each node is processed once.
        Space Complexity: O(W), where W is the maximum width of the tree.
                          Storing nodes for a level can take O(W) space.
        """
        result = []
        if not root:
            return result
        
        queue = collections.deque([root])
        left_to_right = True # Flag to control traversal direction
        
        while queue:
            level_size = len(queue)
            current_level_nodes = []
            
            for _ in range(level_size):
                node = queue.popleft()
                current_level_nodes.append(node.val)
                
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            
            if not left_to_right:
                current_level_nodes.reverse() # Reverse for right-to-left
            
            result.append(current_level_nodes)
            left_to_right = not left_to_right # Toggle direction for next level
            
        return result

# --- Problem 4: Validate Binary Search Tree ---

class BSTValidation:
    """
    Checks if a given binary tree is a valid Binary Search Tree (BST).
    """

    @staticmethod
    def is_valid_bst_recursive(root: TreeNode) -> bool:
        """
        Determines if a binary tree is a valid BST recursively.
        Uses a helper function to pass min_val and max_val bounds.

        Algorithm (Recursive with Bounds):
        1. Define a helper function `_is_valid(node, min_val, max_val)`.
        2. Base case: If `node` is None, it's a valid BST subtree, return True.
        3. Check current node's value:
           If `node.val <= min_val` or `node.val >= max_val`, it violates BST property, return False.
           (Note: Using `float('-inf')` and `float('inf')` for initial bounds.)
        4. Recursively check left subtree:
           `_is_valid(node.left, min_val, node.val)` - The left child must be less than current node.
        5. Recursively check right subtree:
           `_is_valid(node.right, node.val, max_val)` - The right child must be greater than current node.
        6. If both recursive calls return True, then current subtree is valid.

        Time Complexity: O(N), where N is the number of nodes. Each node is visited once.
        Space Complexity: O(H) in the worst case (skewed tree), for the recursion stack.
        """
        def _is_valid(node: TreeNode, min_val: float, max_val: float) -> bool:
            if not node:
                return True
            
            # Check current node's value against its bounds
            if not (min_val < node.val < max_val):
                return False
            
            # Recursively check left and right subtrees
            # For left child, new max_val is node.val
            # For right child, new min_val is node.val
            return _is_valid(node.left, min_val, node.val) and \
                   _is_valid(node.right, node.val, max_val)
        
        return _is_valid(root, float('-inf'), float('inf'))

    @staticmethod
    def is_valid_bst_iterative_inorder(root: TreeNode) -> bool:
        """
        Determines if a binary tree is a valid BST iteratively using Inorder Traversal.
        The inorder traversal of a BST should yield values in strictly increasing order.

        Algorithm (Iterative Inorder):
        1. Perform an iterative inorder traversal (similar to `inorder_iterative`).
        2. Keep track of the `prev_val` (the value of the previously visited node).
        3. Initialize `prev_val` to `float('-inf')`.
        4. During traversal, when a node is visited (popped from stack):
           a. If `node.val <= prev_val`, it violates the strictly increasing property, return False.
           b. Update `prev_val = node.val`.
        5. If the entire traversal completes without violation, return True.

        Time Complexity: O(N), where N is the number of nodes.
        Space Complexity: O(H) for the stack.
        """
        stack = []
        current = root
        prev_val = float('-inf') # Represents the value of the previously visited node

        while current or stack:
            while current:
                stack.append(current)
                current = current.left
            
            current = stack.pop()
            
            # Check if inorder sequence is strictly increasing
            if current.val <= prev_val:
                return False
            
            prev_val = current.val
            current = current.right
            
        return True

# --- Problem 5: All Paths from Root to Leaf ---

class AllPaths:
    """
    Finds all root-to-leaf paths in a binary tree.
    """

    @staticmethod
    def all_paths_to_leaf_recursive(root: TreeNode) -> list[list[int]]:
        """
        Finds all root-to-leaf paths in a binary tree using a recursive DFS approach
        with backtracking.

        Algorithm:
        1. Initialize an empty list `all_paths` to store results.
        2. Define a recursive helper function `_dfs(node, current_path)`:
           a. Base case: If `node` is None, return.
           b. Add `node.val` to `current_path`.
           c. If `node` is a leaf (i.e., `node.left` is None and `node.right` is None):
              Append a copy of `current_path` to `all_paths`.
           d. Recursively call `_dfs(node.left, current_path)`.
           e. Recursively call `_dfs(node.right, current_path)`.
           f. Backtrack: Remove `node.val` from `current_path` (to explore other branches).

        Time Complexity: O(N), where N is the number of nodes. Each node is visited once.
                         Building paths takes O(H) for each leaf path (where H is height).
                         If L is the number of leaves, total path construction could be O(L*H).
                         In worst case (skewed tree), L=1, H=N. In a balanced tree, L=N/2, H=logN.
                         Overall, still dominated by visiting N nodes and path construction.
        Space Complexity: O(H) for the recursion stack and `current_path`.
        """
        all_paths = []
        current_path = []

        def _dfs(node: TreeNode, current_path: list[int]):
            if not node:
                return

            # Add current node to path
            current_path.append(node.val)

            # If it's a leaf node, add the path to our results
            if not node.left and not node.right:
                all_paths.append(list(current_path)) # Append a copy of the path
            else:
                # Recurse on children
                _dfs(node.left, current_path)
                _dfs(node.right, current_path)
            
            # Backtrack: remove current node to explore other paths
            current_path.pop()

        _dfs(root, current_path)
        return all_paths

    @staticmethod
    def all_paths_to_leaf_iterative(root: TreeNode) -> list[list[int]]:
        """
        Finds all root-to-leaf paths iteratively using a stack for DFS.

        Algorithm:
        1. Initialize `all_paths` list.
        2. If root is None, return `all_paths`.
        3. Initialize a stack, push a tuple `(root, [root.val])` onto it.
           Each stack item stores `(node, current_path_list)`.
        4. While stack is not empty:
           a. Pop `(node, current_path)` from stack.
           b. If `node` is a leaf:
              Append `current_path` to `all_paths`.
           c. If `node.right` exists:
              Push `(node.right, current_path + [node.right.val])` onto stack.
           d. If `node.left` exists:
              Push `(node.left, current_path + [node.left.val])` onto stack.
              (Push right first so left is processed earlier, similar to preorder iterative).

        Time Complexity: O(N*H) in worst case (skewed tree), where H is height.
                         Creating new path lists for each push on stack can be O(H).
                         Each node visited once, but path copying adds up.
        Space Complexity: O(N*H) in worst case (skewed tree), as stack can store multiple paths.
                          Each path is O(H) length. Total space is sum of path lengths on stack.
        """
        all_paths = []
        if not root:
            return all_paths
        
        # Stack stores tuples: (node, list_of_values_to_this_node)
        stack = [(root, [root.val])]
        
        while stack:
            node, current_path = stack.pop()
            
            # If it's a leaf node
            if not node.left and not node.right:
                all_paths.append(current_path)
            
            # Push right child first so left is processed earlier (DFS behavior)
            if node.right:
                stack.append((node.right, current_path + [node.right.val]))
            if node.left:
                stack.append((node.left, current_path + [node.left.val]))
                
        return all_paths