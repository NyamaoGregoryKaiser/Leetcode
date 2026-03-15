import collections

class TreeNode:
    """
    Definition for a binary tree node.
    """
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

    def __repr__(self):
        """
        Custom representation for easier debugging.
        """
        return f"TreeNode({self.val})"

def build_tree_from_list(values):
    """
    Builds a binary tree from a list representation (level order).
    `None` in the list represents a null node.
    Example: [3,9,20,None,None,15,7] ->
            3
           / \
          9  20
            /  \
           15   7
    """
    if not values:
        return None

    root = TreeNode(values[0])
    queue = collections.deque([root])
    i = 1

    while queue and i < len(values):
        current_node = queue.popleft()

        # Add left child
        if i < len(values) and values[i] is not None:
            current_node.left = TreeNode(values[i])
            queue.append(current_node.left)
        i += 1

        # Add right child
        if i < len(values) and values[i] is not None:
            current_node.right = TreeNode(values[i])
            queue.append(current_node.right)
        i += 1
    
    return root

def serialize_tree_to_list(root):
    """
    Serializes a binary tree into a list representation (level order).
    This is useful for verifying tree structures in tests.
    """
    if not root:
        return []

    result = []
    queue = collections.deque([root])

    while queue:
        node = queue.popleft()
        if node:
            result.append(node.val)
            queue.append(node.left)
            queue.append(node.right)
        else:
            result.append(None)
    
    # Remove trailing Nones
    while result and result[-1] is None:
        result.pop()

    return result

def tree_to_string(root):
    """
    Helper to visualize tree structure in a more readable format (BFS).
    Similar to serialize_tree_to_list, but includes level information.
    """
    if not root:
        return "Empty Tree"

    levels = []
    queue = collections.deque([(root, 0)]) # (node, level)
    
    while queue:
        node, level = queue.popleft()
        if len(levels) <= level:
            levels.append([])
        
        if node:
            levels[level].append(str(node.val))
            queue.append((node.left, level + 1))
            queue.append((node.right, level + 1))
        else:
            levels[level].append("None")
            # Don't add children for None nodes to avoid infinite expansion for full trees

    # Clean up trailing None levels
    while levels and all(x == "None" for x in levels[-1]):
        levels.pop()

    output = []
    for i, level_nodes in enumerate(levels):
        output.append(f"Level {i}: [{' '.join(level_nodes)}]")
    return "\n".join(output)