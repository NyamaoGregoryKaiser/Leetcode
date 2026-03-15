from src.data_structures import TreeNode

class MorrisTraversal:
    """
    Implements Morris Traversal for Inorder and Preorder.
    Morris Traversal is an O(1) space complexity traversal algorithm.
    It works by temporarily modifying the tree structure to create "threaded" links,
    and then restoring the original structure.
    """

    @staticmethod
    def morris_inorder_traversal(root: TreeNode) -> list[int]:
        """
        Performs an Inorder Traversal using Morris Traversal algorithm.
        Time Complexity: O(N), where N is the number of nodes. Each edge is traversed at most twice.
        Space Complexity: O(1) auxiliary space.

        Algorithm:
        1. Initialize `current` node to `root`.
        2. While `current` is not None:
           a. If `current.left` is None:
              This node has no left child, so it is the next node in inorder sequence.
              Add `current.val` to result.
              Move `current` to its right child.
           b. Else (`current.left` exists):
              Find the rightmost node in the left subtree (predecessor of `current`).
              The predecessor is the node that would be visited just before `current` in inorder.
              `predecessor = current.left`
              While `predecessor.right` is not None AND `predecessor.right` is not `current`:
                  `predecessor = predecessor.right`
              
              i. If `predecessor.right` is None (first time visiting `current`'s left subtree):
                 This means we haven't linked `predecessor` back to `current` yet.
                 Create a temporary link: `predecessor.right = current`.
                 Move `current` to its left child.
              ii. If `predecessor.right` is `current` (second time visiting `current`'s left subtree):
                  This means the left subtree has been fully processed, and we're returning to `current`.
                  Remove the temporary link: `predecessor.right = None`.
                  Add `current.val` to result (now `current` is visited after its left subtree).
                  Move `current` to its right child.
        """
        result = []
        current = root

        while current:
            if current.left is None:
                # No left child, so current node is the next in inorder sequence
                result.append(current.val)
                current = current.right # Move to the right subtree
            else:
                # Left child exists, find the inorder predecessor
                predecessor = current.left
                while predecessor.right is not None and predecessor.right != current:
                    predecessor = predecessor.right
                
                if predecessor.right is None:
                    # First time visiting current.left's subtree
                    # Establish a temporary link (thread) from predecessor to current
                    predecessor.right = current
                    current = current.left # Move to the left subtree
                else:
                    # Second time visiting current.left's subtree (left subtree is processed)
                    # This means we've returned via the thread.
                    # Remove the thread and visit current node.
                    predecessor.right = None # Remove the temporary link
                    result.append(current.val)
                    current = current.right # Move to the right subtree
        return result

    @staticmethod
    def morris_preorder_traversal(root: TreeNode) -> list[int]:
        """
        Performs a Preorder Traversal using Morris Traversal algorithm.
        Time Complexity: O(N).
        Space Complexity: O(1) auxiliary space.

        Algorithm (similar to Inorder, but visit Root when it's first encountered):
        1. Initialize `current` node to `root`.
        2. While `current` is not None:
           a. If `current.left` is None:
              Add `current.val` to result (Root is visited).
              Move `current` to its right child.
           b. Else (`current.left` exists):
              Find the rightmost node in the left subtree (predecessor of `current`).
              `predecessor = current.left`
              While `predecessor.right` is not None AND `predecessor.right` is not `current`:
                  `predecessor = predecessor.right`

              i. If `predecessor.right` is None (first time visiting `current`'s left subtree):
                 Add `current.val` to result (Root is visited, as this is preorder).
                 Create a temporary link: `predecessor.right = current`.
                 Move `current` to its left child.
              ii. If `predecessor.right` is `current` (second time visiting `current`'s left subtree):
                  This means the left subtree has been fully processed.
                  Remove the temporary link: `predecessor.right = None`.
                  Move `current` to its right child (no visit here, as it was visited in step i).
        """
        result = []
        current = root

        while current:
            if current.left is None:
                # No left child, so current node is the next in preorder sequence after itself
                result.append(current.val)
                current = current.right # Move to the right subtree
            else:
                # Left child exists, find the inorder predecessor
                predecessor = current.left
                while predecessor.right is not None and predecessor.right != current:
                    predecessor = predecessor.right
                
                if predecessor.right is None:
                    # First time visiting current's left subtree
                    # Visit current node now (Preorder)
                    result.append(current.val)
                    # Establish a temporary link (thread) from predecessor to current
                    predecessor.right = current
                    current = current.left # Move to the left subtree
                else:
                    # Second time visiting current's left subtree (left subtree is processed)
                    # This means we've returned via the thread.
                    # Remove the thread. Current node was already visited.
                    predecessor.right = None # Remove the temporary link
                    current = current.right # Move to the right subtree
        return result