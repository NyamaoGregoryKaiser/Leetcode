import collections
from src.tree_node import TreeNode

class LevelOrderTraversals:
    """
    Implements Level Order Traversal (BFS) and its variation, Zigzag Level Order Traversal.
    """

    def level_order_traversal(self, root: TreeNode) -> list[list[int]]:
        """
        Performs level order traversal (Breadth-First Search) of a binary tree.
        Nodes are visited level by level, from left to right.
        The result is a list of lists, where each inner list contains the nodes'
        values for a single level.

        Time Complexity: O(N), where N is the number of nodes in the tree.
                         Each node is enqueued and dequeued exactly once.
        Space Complexity: O(W), where W is the maximum width of the tree.
                          In the worst case (a complete binary tree), the last level
                          can contain N/2 nodes, so O(N).
        """
        if not root:
            return []

        result = []
        queue = collections.deque([root]) # Use a deque for efficient appends and pops from both ends

        while queue:
            level_size = len(queue) # Number of nodes at the current level
            current_level_nodes = []

            for _ in range(level_size):
                node = queue.popleft() # Dequeue from the front
                current_level_nodes.append(node.val)

                if node.left:
                    queue.append(node.left) # Enqueue left child
                if node.right:
                    queue.append(node.right) # Enqueue right child
            
            result.append(current_level_nodes) # Add the completed level to the result
        
        return result

    def zigzag_level_order_traversal(self, root: TreeNode) -> list[list[int]]:
        """
        Performs zigzag level order traversal of a binary tree.
        The first level is processed from left to right, the second level from right to left,
        and so on for alternating levels.

        Time Complexity: O(N), where N is the number of nodes in the tree.
                         Each node is enqueued and dequeued exactly once.
        Space Complexity: O(W), where W is the maximum width of the tree.
                          In the worst case (a complete binary tree), the last level
                          can contain N/2 nodes, so O(N). The deque used for level
                          nodes also contributes to this.
        """
        if not root:
            return []

        result = []
        queue = collections.deque([root])
        left_to_right = True # Flag to determine traversal direction for the current level

        while queue:
            level_size = len(queue)
            # Use a deque for current_level_nodes to efficiently add from left/right
            current_level_nodes = collections.deque() 

            for _ in range(level_size):
                node = queue.popleft() # Always dequeue from left

                if left_to_right:
                    current_level_nodes.append(node.val) # Add to right for L->R
                else:
                    current_level_nodes.appendleft(node.val) # Add to left for R->L

                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            
            result.append(list(current_level_nodes)) # Convert deque to list for result
            left_to_right = not left_to_right # Toggle direction for the next level
        
        return result