import timeit
from src.tree_node import build_tree_from_array
from src.basic_traversals import BasicTraversals
from src.bst_traversals import BSTTraversals
import random

def generate_random_balanced_bst_array(size):
    """Generates a sorted list of unique numbers for a BST, then shuffles
    to create a balanced-like insertion order for `build_tree_from_array`.
    This is not a perfect balanced tree builder, but better than sequential.
    For perfect balanced tree, specific logic needed. This is a compromise.
    """
    if size == 0:
        return []
    
    # Generate unique sorted numbers
    nums = sorted(random.sample(range(1, size * 2), size))
    
    # Simulate balanced tree structure by picking middle, then recursively left/right
    def _build_array_from_sorted(arr):
        if not arr:
            return []
        mid = len(arr) // 2
        root_val = arr[mid]
        left_subtree = _build_array_from_sorted(arr[:mid])
        right_subtree = _build_array_from_sorted(arr[mid+1:])
        
        # Merge order for level-order like array representation
        # This is a bit tricky to get a perfect level-order representation from
        # recursive construction. A more direct level-order construction approach
        # would be needed for perfect 'build_tree_from_array' usage.
        # For simplicity, let's just use a simple sorted array for tree_node's
        # build_tree_from_array, and accept it might create skewed or less balanced.
        # For actual performance test, using actual balanced/skewed tree builder is better.
        
        # A simpler way to get a somewhat balanced-tree array for `build_tree_from_array`:
        # This approximates a level-order fill, but is not guaranteed to be optimally balanced
        # when converted by `build_tree_from_array`.
        # For benchmarking, we're mostly interested in N.
        
        # Let's create an actual array for build_tree_from_array that tries to be balanced
        # by recursively filling levels.
        queue_nodes = collections.deque([None]*size) # To store values in level order
        current_idx = 0

        # This part generates a level-order representation of a *conceptually* balanced BST.
        # It's not the build_tree_from_array's input directly, but for 'kth_smallest' it works.
        # For `build_tree_from_array`, we would need the input array to represent `None` children.
        # For simplicity, let's just make `build_tree_from_array` handle this.
        
        # For `build_tree_from_array`, it's often best to provide a list that is generated
        # by *serializing* a balanced tree, not directly by just sorting the numbers.
        # Let's just create a list of numbers and rely on `build_tree_from_array` to make a tree.
        # For true benchmarking, we need control over tree shape.
        
        # For this benchmark, let's just use a simple randomized list, as `build_tree_from_array`
        # is meant to take LeetCode-style array which doesn't guarantee balanced.
        # Or even better, explicitly build a skewed tree.
        
        # Let's create a *perfectly skewed* tree to test worst-case
        return nums # For general `build_tree_from_array` test case

def generate_skewed_tree_array(size, direction='left'):
    """Generates a skewed tree array representation."""
    if size == 0:
        return []
    
    nodes = []
    if direction == 'left':
        # [1, 2, None, 3, None, None, None, 4...]
        # `build_tree_from_array` takes this: [root, left, right, left_of_left, right_of_left...]
        # So for a left-skewed: [1, 2, None, 3, None, None, None, 4...]
        nodes.append(1) # Root
        current_level_nodes_count = 1
        num_generated = 1
        
        while num_generated < size:
            # Add child
            if direction == 'left':
                nodes.append(num_generated + 1)
                nodes.append(None) # Right child is None
            else: # Right skewed
                nodes.append(None) # Left child is None
                nodes.append(num_generated + 1)
            num_generated += 1
            # Add padding for children of previously added None nodes
            if current_level_nodes_count > 0:
                nodes.extend([None] * (current_level_nodes_count * 2 - 2))
            current_level_nodes_count = 1 # Only one actual node on next level

        return nodes[:size*2+1] # Approx size, might be larger due to Nones.

    elif direction == 'right':
        nodes.append(1) # Root
        num_generated = 1
        while num_generated < size:
            nodes.append(None) # Left child is None
            nodes.append(num_generated + 1) # Right child
            num_generated += 1
            nodes.extend([None] * ((num_generated - 1) * 2 - 2)) # Padding for Nones
        
        return nodes[:size*2+1] # Approx size
    else:
        raise ValueError("Direction must be 'left' or 'right'")

    # Simpler: just generate sequential numbers for testing Kth smallest.
    # The actual structure depends on build_tree_from_array.
    # Let's use ordered numbers for build_tree_from_array to produce skewed trees.
    if direction == 'left':
        # [N, N-1, None, N-2, None, None, None, ...]
        tree_arr = [i for i in range(size, 0, -1)]
    else: # right
        # [1, None, 2, None, None, None, 3, ...]
        tree_arr = [i for i in range(1, size + 1)]
    return tree_arr

def run_benchmarks():
    basic_traversals = BasicTraversals()
    bst_traversals = BSTTraversals()

    tree_sizes = [100, 1000, 5000] # Number of nodes

    print("--- Benchmarking Tree Traversals ---")
    print("All times are in seconds (s).\n")

    for size in tree_sizes:
        print(f"Benchmarking for Tree Size: {size} nodes")

        # --- Generate trees for testing ---
        # For `build_tree_from_array`, a simple sequential array often produces a skewed tree
        # or a tree that isn't perfectly balanced. For benchmarks this is fine as it tests
        # typical cases rather than perfectly balanced.
        
        # Generate a "somewhat" balanced tree (by taking random numbers)
        # For build_tree_from_array, it's about the insertion order.
        # A simple range will produce skewed. Let's use a shuffled range.
        nums_shuffled = list(range(1, size + 1))
        random.shuffle(nums_shuffled)
        
        # Build the tree array from shuffled list. This often results in a somewhat
        # "bushy" tree, though not strictly balanced.
        # We need to manually build a balanced/skewed structure for comparison.
        
        # For simplicity, let's just make a very skewed tree to stress-test.
        # A right-skewed tree for build_tree_from_array:
        # [1, None, 2, None, None, None, 3, ...]
        
        # Let's create an actual skewed tree structure for worst-case analysis.
        skewed_arr = []
        for i in range(1, size + 1):
            skewed_arr.append(i)
            if i < size:
                # Add 'None' for left children to ensure right-skew.
                # The build_tree_from_array is level order.
                # So to make it right skewed, need to fill with many Nones
                # This is actually hard to represent cleanly with `build_tree_from_array` input
                # for very large `size` without having a huge array.
                # Instead, let's just build it programmatically to ensure it's skewed.
                pass # Use a simpler build for 'skewed' root object, not from array
        
        # Creating a truly skewed tree without relying on build_tree_from_array's behavior
        # is better for controlled benchmarking.
        skewed_root = None
        if size > 0:
            skewed_root = TreeNode(1)
            current = skewed_root
            for i in range(2, size + 1):
                current.right = TreeNode(i)
                current = current.right

        # Creating a reasonably balanced tree (e.g., full or nearly full)
        # This can be approximated by building from a sorted array's middle elements first
        def build_balanced_bst_from_sorted_list(arr_sorted):
            if not arr_sorted:
                return None
            mid = len(arr_sorted) // 2
            root = TreeNode(arr_sorted[mid])
            root.left = build_balanced_bst_from_sorted_list(arr_sorted[:mid])
            root.right = build_balanced_bst_from_sorted_list(arr_sorted[mid+1:])
            return root
        
        sorted_nums = list(range(1, size + 1))
        balanced_root = build_balanced_bst_from_sorted_list(sorted_nums)

        # --- Benchmarking Basic Traversals (Inorder) ---
        print(f"\n  Inorder Traversal (Balanced Tree, N={size}):")
        time_rec = timeit.timeit(lambda: basic_traversals.inorder_traversal_recursive(balanced_root), number=100)
        time_iter = timeit.timeit(lambda: basic_traversals.inorder_traversal_iterative(balanced_root), number=100)
        print(f"    Recursive: {time_rec:.6f}s")
        print(f"    Iterative: {time_iter:.6f}s")

        print(f"\n  Inorder Traversal (Skewed Tree, N={size}):")
        time_rec_skewed = timeit.timeit(lambda: basic_traversals.inorder_traversal_recursive(skewed_root), number=100)
        time_iter_skewed = timeit.timeit(lambda: basic_traversals.inorder_traversal_iterative(skewed_root), number=100)
        print(f"    Recursive: {time_rec_skewed:.6f}s")
        print(f"    Iterative: {time_iter_skewed:.6f}s")
        
        # Observe that for skewed trees, recursive might hit stack depth limit for very large N.
        # For Python's default recursion limit (usually 1000-3000), a size=5000 skewed tree might error.
        # This is where iterative shines. We should demonstrate this.
        if size > 1000 and size <= 5000: # Adjust based on default recursion limit
            try:
                timeit.timeit(lambda: basic_traversals.inorder_traversal_recursive(skewed_root), number=10)
            except RecursionError:
                print(f"    Recursive (skewed, N={size}): RecursionError (expected for large skewed tree)")

        # --- Benchmarking BST Kth Smallest Element ---
        print(f"\n  Kth Smallest Element (Balanced BST, N={size}):")
        k_val_small = max(1, size // 10) # Small k
        k_val_medium = max(1, size // 2) # Medium k
        k_val_large = size # Large k

        for k in [k_val_small, k_val_medium, k_val_large]:
            time_kth_rec = timeit.timeit(lambda: bst_traversals.kth_smallest_recursive(balanced_root, k), number=50)
            time_kth_iter = timeit.timeit(lambda: bst_traversals.kth_smallest_iterative(balanced_root, k), number=50)
            print(f"    K={k}: Recursive: {time_kth_rec:.6f}s, Iterative: {time_kth_iter:.6f}s")

        print(f"\n  Kth Smallest Element (Skewed BST, N={size}):")
        for k in [k_val_small, k_val_medium, k_val_large]:
            time_kth_rec_skewed = timeit.timeit(lambda: bst_traversals.kth_smallest_recursive(skewed_root, k), number=50)
            time_kth_iter_skewed = timeit.timeit(lambda: bst_traversals.kth_smallest_iterative(skewed_root, k), number=50)
            print(f"    K={k}: Recursive: {time_kth_rec_skewed:.6f}s, Iterative: {time_kth_iter_skewed:.6f}s")
            
            if size > 1000 and size <= 5000: # Demonstrate recursion error
                try:
                    timeit.timeit(lambda: bst_traversals.kth_smallest_recursive(skewed_root, k), number=10)
                except RecursionError:
                    print(f"      Recursive (skewed, N={size}, K={k}): RecursionError (expected for large skewed tree)")
        
        print("-" * 50)

if __name__ == '__main__':
    # Increase recursion limit for larger trees, but still expect errors for very skewed trees
    # to demonstrate iterative solution's advantage.
    # The default is often 1000. Let's try to push it.
    import sys
    sys.setrecursionlimit(2000) 
    
    # Using `collections.deque` for internal tree building helper for balanced_root.
    # This is fine, as it's not part of the algorithm logic itself.
    import collections 
    run_benchmarks()