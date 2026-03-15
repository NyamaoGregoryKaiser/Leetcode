import timeit
import random
import sys
from src.data_structures import TreeNode, build_tree_from_list, serialize_tree_to_list
from src.traversals import DFSTraversals, BFSTraversals, BSTValidation, AllPaths
from src.morris_traversal import MorrisTraversal

# Increase recursion limit for deep trees in recursive benchmarks
sys.setrecursionlimit(5000)

def create_balanced_tree(depth):
    """Creates a balanced binary tree of a given depth."""
    if depth == 0:
        return None
    root = TreeNode(random.randint(0, 1000))
    queue = [root]
    curr_depth = 1
    
    while queue and curr_depth < depth:
        level_size = len(queue)
        for _ in range(level_size):
            node = queue.pop(0)
            if node:
                node.left = TreeNode(random.randint(0, 1000))
                node.right = TreeNode(random.randint(0, 1000))
                queue.append(node.left)
                queue.append(node.right)
        curr_depth += 1
    
    return root

def create_skewed_tree(n_nodes, direction='left'):
    """Creates a skewed tree with n_nodes."""
    if n_nodes == 0:
        return None
    root = TreeNode(0)
    current = root
    for i in range(1, n_nodes):
        if direction == 'left':
            current.left = TreeNode(i)
            current = current.left
        else: # 'right'
            current.right = TreeNode(i)
            current = current.right
    return root

def run_benchmark(setup_code, statement_code, number=1000):
    """Helper to run timeit benchmarks."""
    times = timeit.repeat(stmt=statement_code, setup=setup_code, number=number, repeat=5)
    return min(times) / number # Average time per execution

# --- Benchmarking Setup ---
TREE_SIZES = [100, 1000, 2000] # Number of nodes

print(f"Benchmarking Tree Traversals (Python recursion limit: {sys.getrecursionlimit()})\n")
print("-" * 60)

for size in TREE_SIZES:
    print(f"Tree Size: {size} nodes")
    
    # Balanced Tree
    # Depth for approx `size` nodes: log2(size)
    balanced_depth = int(size**0.5) # approx depth for balanced tree
    if balanced_depth < 1: balanced_depth = 1
    
    balanced_tree = create_balanced_tree(balanced_depth)
    if balanced_tree is None:
        print(f"  Skipping balanced tree for size {size} due to construction limitations.")
        continue

    # Create a simple list to build balanced tree from to keep consistent.
    # We can't use build_tree_from_list with create_balanced_tree output directly
    # because build_tree_from_list generates a balanced structure from a list,
    # and create_balanced_tree here creates a balanced tree by structure.
    # Let's generate a list for build_tree_from_list.
    # For simplicity, we'll just use the `create_balanced_tree` directly.
    # The actual node count for create_balanced_tree(D) is 2^D-1. So, for size, we need to find D s.t. 2^D-1 ~ size.
    # D = log2(size+1). Let's use `size` directly as n_nodes for create_skewed_tree
    # and use approx. depth for balanced trees.

    # Re-evaluating balanced tree creation: The earlier `create_balanced_tree(depth)` creates a tree
    # with 2^depth - 1 nodes. To have `size` nodes, depth should be `log2(size+1)`.
    # Let's create a simpler balanced tree from a list for more accurate node counts.
    balanced_list = list(range(1, size + 1))
    balanced_tree_from_list = build_tree_from_list(balanced_list) # Will be somewhat balanced, but not perfectly for large lists

    # Skewed Tree (right-skewed for easier list representation)
    skewed_tree = create_skewed_tree(size, direction='right')
    # For very large skewed trees, recursive methods might hit Python's recursion limit.
    # We'll see that in the benchmark results.

    print("  Balanced Tree:")
    setup_balanced = f"""
from src.data_structures import TreeNode, build_tree_from_list
from src.traversals import DFSTraversals, BFSTraversals, BSTValidation, AllPaths
from src.morris_traversal import MorrisTraversal
import sys
# sys.setrecursionlimit({sys.getrecursionlimit()}) # Already set globally
balanced_tree = build_tree_from_list(list(range(1, {size} + 1)))
    """

    # --- DFS Traversals Benchmarks ---
    print("    DFS Traversals:")
    
    # Inorder
    time_rec = run_benchmark(setup_balanced, "DFSTraversals.inorder_recursive(balanced_tree)")
    time_iter = run_benchmark(setup_balanced, "DFSTraversals.inorder_iterative(balanced_tree)")
    print(f"      Inorder Recursive: {time_rec:.6f}s")
    print(f"      Inorder Iterative: {time_iter:.6f}s")

    # Preorder
    time_rec = run_benchmark(setup_balanced, "DFSTraversals.preorder_recursive(balanced_tree)")
    time_iter = run_benchmark(setup_balanced, "DFSTraversals.preorder_iterative(balanced_tree)")
    print(f"      Preorder Recursive: {time_rec:.6f}s")
    print(f"      Preorder Iterative: {time_iter:.6f}s")

    # Postorder
    time_rec = run_benchmark(setup_balanced, "DFSTraversals.postorder_recursive(balanced_tree)")
    time_iter_two_stack = run_benchmark(setup_balanced, "DFSTraversals.postorder_iterative(balanced_tree)")
    time_iter_one_stack = run_benchmark(setup_balanced, "DFSTraversals.postorder_iterative_one_stack(balanced_tree)")
    print(f"      Postorder Recursive: {time_rec:.6f}s")
    print(f"      Postorder Iterative (Two Stacks): {time_iter_two_stack:.6f}s")
    print(f"      Postorder Iterative (One Stack): {time_iter_one_stack:.6f}s")

    # --- BFS Traversals Benchmarks ---
    print("    BFS Traversals:")
    time_level_order = run_benchmark(setup_balanced, "BFSTraversals.level_order(balanced_tree)")
    time_zigzag_level_order = run_benchmark(setup_balanced, "BFSTraversals.zigzag_level_order(balanced_tree)")
    print(f"      Level Order: {time_level_order:.6f}s")
    print(f"      Zigzag Level Order: {time_zigzag_level_order:.6f}s")

    # --- BST Validation Benchmarks ---
    # Create a valid BST for validation tests
    bst_list_valid = sorted(list(set(random.sample(range(1, size * 2), size)))) # Unique sorted numbers
    valid_bst_tree = build_tree_from_list(bst_list_valid)
    setup_valid_bst = f"""
from src.data_structures import TreeNode, build_tree_from_list
from src.traversals import DFSTraversals, BFSTraversals, BSTValidation, AllPaths
from src.morris_traversal import MorrisTraversal
valid_bst_tree = build_tree_from_list({bst_list_valid})
    """
    
    print("    BST Validation:")
    time_bst_rec = run_benchmark(setup_valid_bst, "BSTValidation.is_valid_bst_recursive(valid_bst_tree)")
    time_bst_inorder = run_benchmark(setup_valid_bst, "BSTValidation.is_valid_bst_iterative_inorder(valid_bst_tree)")
    print(f"      BST Recursive: {time_bst_rec:.6f}s")
    print(f"      BST Iterative Inorder: {time_bst_inorder:.6f}s")

    # --- All Paths from Root to Leaf Benchmarks ---
    print("    All Paths to Leaf:")
    time_paths_rec = run_benchmark(setup_balanced, "AllPaths.all_paths_to_leaf_recursive(balanced_tree)")
    time_paths_iter = run_benchmark(setup_balanced, "AllPaths.all_paths_to_leaf_iterative(balanced_tree)")
    print(f"      All Paths Recursive: {time_paths_rec:.6f}s")
    print(f"      All Paths Iterative: {time_paths_iter:.6f}s")

    # --- Morris Traversal Benchmarks (Inorder, Preorder) ---
    print("    Morris Traversal (O(1) Space):")
    time_morris_inorder = run_benchmark(setup_balanced, "MorrisTraversal.morris_inorder_traversal(balanced_tree)")
    time_morris_preorder = run_benchmark(setup_balanced, "MorrisTraversal.morris_preorder_traversal(balanced_tree)")
    print(f"      Morris Inorder: {time_morris_inorder:.6f}s")
    print(f"      Morris Preorder: {time_morris_preorder:.6f}s")

    print("\n  Skewed Tree (Right Skewed):")
    setup_skewed = f"""
from src.data_structures import TreeNode, build_tree_from_list, serialize_tree_to_list
from src.traversals import DFSTraversals, BFSTraversals, BSTValidation, AllPaths
from src.morris_traversal import MorrisTraversal
import sys
# sys.setrecursionlimit({sys.getrecursionlimit()}) # Already set globally
skewed_tree = build_tree_from_list([i for i in range(1, {size} + 1)] + [None] * {size}) # Approx right-skewed
# A better skewed tree:
def create_skewed_tree_for_benchmark(n_nodes, direction='right'):
    if n_nodes == 0:
        return None
    root = TreeNode(1)
    current = root
    for i in range(2, n_nodes + 1):
        if direction == 'left':
            current.left = TreeNode(i)
            current = current.left
        else: # 'right'
            current.right = TreeNode(i)
            current = current.right
    return root
skewed_tree = create_skewed_tree_for_benchmark({size}, 'right')

    """

    # --- DFS Traversals Benchmarks (Skewed) ---
    print("    DFS Traversals:")
    try:
        time_rec = run_benchmark(setup_skewed, "DFSTraversals.inorder_recursive(skewed_tree)")
        print(f"      Inorder Recursive: {time_rec:.6f}s")
    except RecursionError:
        print("      Inorder Recursive: RecursionError (Tree too deep)")
    time_iter = run_benchmark(setup_skewed, "DFSTraversals.inorder_iterative(skewed_tree)")
    print(f"      Inorder Iterative: {time_iter:.6f}s")

    try:
        time_rec = run_benchmark(setup_skewed, "DFSTraversals.preorder_recursive(skewed_tree)")
        print(f"      Preorder Recursive: {time_rec:.6f}s")
    except RecursionError:
        print("      Preorder Recursive: RecursionError (Tree too deep)")
    time_iter = run_benchmark(setup_skewed, "DFSTraversals.preorder_iterative(skewed_tree)")
    print(f"      Preorder Iterative: {time_iter:.6f}s")

    try:
        time_rec = run_benchmark(setup_skewed, "DFSTraversals.postorder_recursive(skewed_tree)")
        print(f"      Postorder Recursive: {time_rec:.6f}s")
    except RecursionError:
        print("      Postorder Recursive: RecursionError (Tree too deep)")
    time_iter_two_stack = run_benchmark(setup_skewed, "DFSTraversals.postorder_iterative(skewed_tree)")
    print(f"      Postorder Iterative (Two Stacks): {time_iter_two_stack:.6f}s")
    time_iter_one_stack = run_benchmark(setup_skewed, "DFSTraversals.postorder_iterative_one_stack(skewed_tree)")
    print(f"      Postorder Iterative (One Stack): {time_iter_one_stack:.6f}s")

    # --- BFS Traversals Benchmarks (Skewed) ---
    print("    BFS Traversals:")
    time_level_order = run_benchmark(setup_skewed, "BFSTraversals.level_order(skewed_tree)")
    time_zigzag_level_order = run_benchmark(setup_skewed, "BFSTraversals.zigzag_level_order(skewed_tree)")
    print(f"      Level Order: {time_level_order:.6f}s")
    print(f"      Zigzag Level Order: {time_zigzag_level_order:.6f}s")

    # --- All Paths from Root to Leaf Benchmarks (Skewed) ---
    print("    All Paths to Leaf:")
    try:
        time_paths_rec = run_benchmark(setup_skewed, "AllPaths.all_paths_to_leaf_recursive(skewed_tree)")
        print(f"      All Paths Recursive: {time_paths_rec:.6f}s")
    except RecursionError:
        print("      All Paths Recursive: RecursionError (Tree too deep)")
    time_paths_iter = run_benchmark(setup_skewed, "AllPaths.all_paths_to_leaf_iterative(skewed_tree)")
    print(f"      All Paths Iterative: {time_paths_iter:.6f}s") # Note: iterative AllPaths is O(N*H) which for skewed is O(N^2)

    # --- Morris Traversal Benchmarks (Skewed) ---
    print("    Morris Traversal (O(1) Space):")
    time_morris_inorder = run_benchmark(setup_skewed, "MorrisTraversal.morris_inorder_traversal(skewed_tree)")
    time_morris_preorder = run_benchmark(setup_skewed, "MorrisTraversal.morris_preorder_traversal(skewed_tree)")
    print(f"      Morris Inorder: {time_morris_inorder:.6f}s")
    print(f"      Morris Preorder: {time_morris_preorder:.6f}s")

    print("-" * 60)

print("\nBenchmark Complete.")