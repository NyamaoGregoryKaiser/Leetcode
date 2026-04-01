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
        # A simple representation for debugging purposes
        return f"TreeNode({self.val})"

def build_tree_from_array(nodes):
    """
    Builds a binary tree from a list representation (like LeetCode's style).
    None values in the list represent null nodes.

    Example: [3, 9, 20, None, None, 15, 7]
             3
            / \
           9  20
             /  \
            15   7
    """
    if not nodes:
        return None

    root = TreeNode(nodes[0])
    queue = collections.deque([root])
    i = 1

    while queue and i < len(nodes):
        current_node = queue.popleft()

        # Left child
        if i < len(nodes) and nodes[i] is not None:
            current_node.left = TreeNode(nodes[i])
            queue.append(current_node.left)
        i += 1

        # Right child
        if i < len(nodes) and nodes[i] is not None:
            current_node.right = TreeNode(nodes[i])
            queue.append(current_node.right)
        i += 1
    return root

def print_tree_bfs(root):
    """
    Prints the tree level by level (BFS) for visualization and debugging.
    Uses 'None' for null nodes at the end of levels to show structure.
    """
    if not root:
        print("[]")
        return

    result = []
    queue = collections.deque([root])
    
    # Track if we've encountered any non-None nodes to stop printing trailing Nones
    has_non_none = True 

    while queue and has_non_none:
        has_non_none = False
        level_size = len(queue)
        current_level_vals = []
        for _ in range(level_size):
            node = queue.popleft()
            if node:
                current_level_vals.append(node.val)
                queue.append(node.left)
                queue.append(node.right)
                if node.left or node.right:
                    has_non_none = True
            else:
                current_level_vals.append(None)
                # We still append None children to keep the BFS structure,
                # but they won't trigger `has_non_none` to stay True
                # and won't add to the result if it's all Nones.
                queue.append(None)
                queue.append(None)
        
        # Only add to result if there are actual nodes or significant Nones
        # Prune trailing Nones for cleaner output, but keep internal Nones.
        while current_level_vals and current_level_vals[-1] is None:
            current_level_vals.pop()
        
        if current_level_vals: # If level isn't entirely empty after pruning
            result.extend(current_level_vals)
        elif result: # If this level is empty, and previous levels had nodes, stop
            break
        
    # Trim trailing Nones from the overall result
    while result and result[-1] is None:
        result.pop()

    print(f"Tree BFS: {result}")

# Example Usage (uncomment to test):
# if __name__ == "__main__":
#     # Example 1: Basic tree
#     nodes1 = [3, 9, 20, None, None, 15, 7]
#     root1 = build_tree_from_array(nodes1)
#     print_tree_bfs(root1) # Expected: Tree BFS: [3, 9, 20, 15, 7]

#     # Example 2: Skewed tree
#     nodes2 = [1, None, 2, None, None, None, 3]
#     root2 = build_tree_from_array(nodes2)
#     print_tree_bfs(root2) # Expected: Tree BFS: [1, 2, 3]

#     # Example 3: Single node tree
#     nodes3 = [5]
#     root3 = build_tree_from_array(nodes3)
#     print_tree_bfs(root3) # Expected: Tree BFS: [5]

#     # Example 4: Empty tree
#     nodes4 = []
#     root4 = build_tree_from_array(nodes4)
#     print_tree_bfs(root4) # Expected: []

#     # Example 5: Tree with internal Nones
#     nodes5 = [1, 2, 3, 4, None, None, 5]
#     root5 = build_tree_from_array(nodes5)
#     print_tree_bfs(root5) # Expected: Tree BFS: [1, 2, 3, 4, None, 5]