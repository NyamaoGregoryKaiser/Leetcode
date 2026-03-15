import unittest
from src.data_structures import build_tree_from_list, TreeNode
from src.traversals import DFSTraversals, BFSTraversals, BSTValidation, AllPaths

class TestDFSTraversals(unittest.TestCase):

    def setUp(self):
        # Test tree 1: Complete tree
        #       1
        #      / \
        #     2   3
        #    / \ / \
        #   4  5 6  7
        self.tree1 = build_tree_from_list([1, 2, 3, 4, 5, 6, 7])

        # Test tree 2: Incomplete tree
        #       3
        #      / \
        #     9  20
        #       /  \
        #      15   7
        self.tree2 = build_tree_from_list([3, 9, 20, None, None, 15, 7])

        # Test tree 3: Single node tree
        self.tree3 = build_tree_from_list([10])

        # Test tree 4: Empty tree
        self.tree4 = None

        # Test tree 5: Left-skewed tree
        #       1
        #      /
        #     2
        #    /
        #   3
        self.tree5 = build_tree_from_list([1, 2, None, 3])

        # Test tree 6: Right-skewed tree
        #       1
        #        \
        #         2
        #          \
        #           3
        self.tree6 = build_tree_from_list([1, None, 2, None, None, None, 3])

    # --- Inorder Traversal Tests ---
    def test_inorder_recursive(self):
        self.assertEqual(DFSTraversals.inorder_recursive(self.tree1), [4, 2, 5, 1, 6, 3, 7])
        self.assertEqual(DFSTraversals.inorder_recursive(self.tree2), [9, 3, 15, 20, 7])
        self.assertEqual(DFSTraversals.inorder_recursive(self.tree3), [10])
        self.assertEqual(DFSTraversals.inorder_recursive(self.tree4), [])
        self.assertEqual(DFSTraversals.inorder_recursive(self.tree5), [3, 2, 1])
        self.assertEqual(DFSTraversals.inorder_recursive(self.tree6), [1, 2, 3])

    def test_inorder_iterative(self):
        self.assertEqual(DFSTraversals.inorder_iterative(self.tree1), [4, 2, 5, 1, 6, 3, 7])
        self.assertEqual(DFSTraversals.inorder_iterative(self.tree2), [9, 3, 15, 20, 7])
        self.assertEqual(DFSTraversals.inorder_iterative(self.tree3), [10])
        self.assertEqual(DFSTraversals.inorder_iterative(self.tree4), [])
        self.assertEqual(DFSTraversals.inorder_iterative(self.tree5), [3, 2, 1])
        self.assertEqual(DFSTraversals.inorder_iterative(self.tree6), [1, 2, 3])

    # --- Preorder Traversal Tests ---
    def test_preorder_recursive(self):
        self.assertEqual(DFSTraversals.preorder_recursive(self.tree1), [1, 2, 4, 5, 3, 6, 7])
        self.assertEqual(DFSTraversals.preorder_recursive(self.tree2), [3, 9, 20, 15, 7])
        self.assertEqual(DFSTraversals.preorder_recursive(self.tree3), [10])
        self.assertEqual(DFSTraversals.preorder_recursive(self.tree4), [])
        self.assertEqual(DFSTraversals.preorder_recursive(self.tree5), [1, 2, 3])
        self.assertEqual(DFSTraversals.preorder_recursive(self.tree6), [1, 2, 3])

    def test_preorder_iterative(self):
        self.assertEqual(DFSTraversals.preorder_iterative(self.tree1), [1, 2, 4, 5, 3, 6, 7])
        self.assertEqual(DFSTraversals.preorder_iterative(self.tree2), [3, 9, 20, 15, 7])
        self.assertEqual(DFSTraversals.preorder_iterative(self.tree3), [10])
        self.assertEqual(DFSTraversals.preorder_iterative(self.tree4), [])
        self.assertEqual(DFSTraversals.preorder_iterative(self.tree5), [1, 2, 3])
        self.assertEqual(DFSTraversals.preorder_iterative(self.tree6), [1, 2, 3])

    # --- Postorder Traversal Tests ---
    def test_postorder_recursive(self):
        self.assertEqual(DFSTraversals.postorder_recursive(self.tree1), [4, 5, 2, 6, 7, 3, 1])
        self.assertEqual(DFSTraversals.postorder_recursive(self.tree2), [9, 15, 7, 20, 3])
        self.assertEqual(DFSTraversals.postorder_recursive(self.tree3), [10])
        self.assertEqual(DFSTraversals.postorder_recursive(self.tree4), [])
        self.assertEqual(DFSTraversals.postorder_recursive(self.tree5), [3, 2, 1])
        self.assertEqual(DFSTraversals.postorder_recursive(self.tree6), [3, 2, 1])

    def test_postorder_iterative_two_stacks(self):
        self.assertEqual(DFSTraversals.postorder_iterative(self.tree1), [4, 5, 2, 6, 7, 3, 1])
        self.assertEqual(DFSTraversals.postorder_iterative(self.tree2), [9, 15, 7, 20, 3])
        self.assertEqual(DFSTraversals.postorder_iterative(self.tree3), [10])
        self.assertEqual(DFSTraversals.postorder_iterative(self.tree4), [])
        self.assertEqual(DFSTraversals.postorder_iterative(self.tree5), [3, 2, 1])
        self.assertEqual(DFSTraversals.postorder_iterative(self.tree6), [3, 2, 1])

    def test_postorder_iterative_one_stack(self):
        self.assertEqual(DFSTraversals.postorder_iterative_one_stack(self.tree1), [4, 5, 2, 6, 7, 3, 1])
        self.assertEqual(DFSTraversals.postorder_iterative_one_stack(self.tree2), [9, 15, 7, 20, 3])
        self.assertEqual(DFSTraversals.postorder_iterative_one_stack(self.tree3), [10])
        self.assertEqual(DFSTraversals.postorder_iterative_one_stack(self.tree4), [])
        self.assertEqual(DFSTraversals.postorder_iterative_one_stack(self.tree5), [3, 2, 1])
        self.assertEqual(DFSTraversals.postorder_iterative_one_stack(self.tree6), [3, 2, 1])


class TestBFSTraversals(unittest.TestCase):
    def setUp(self):
        # Test tree 1: Complete tree
        #       1
        #      / \
        #     2   3
        #    / \ / \
        #   4  5 6  7
        self.tree1 = build_tree_from_list([1, 2, 3, 4, 5, 6, 7])

        # Test tree 2: Incomplete tree
        #       3
        #      / \
        #     9  20
        #       /  \
        #      15   7
        self.tree2 = build_tree_from_list([3, 9, 20, None, None, 15, 7])

        # Test tree 3: Single node tree
        self.tree3 = build_tree_from_list([10])

        # Test tree 4: Empty tree
        self.tree4 = None

        # Test tree 5: Left-skewed tree
        #       1
        #      /
        #     2
        #    /
        #   3
        self.tree5 = build_tree_from_list([1, 2, None, 3])

        # Test tree 6: Right-skewed tree
        #       1
        #        \
        #         2
        #          \
        #           3
        self.tree6 = build_tree_from_list([1, None, 2, None, None, None, 3])

    # --- Level Order Traversal Tests ---
    def test_level_order(self):
        self.assertEqual(BFSTraversals.level_order(self.tree1), [[1], [2, 3], [4, 5, 6, 7]])
        self.assertEqual(BFSTraversals.level_order(self.tree2), [[3], [9, 20], [15, 7]])
        self.assertEqual(BFSTraversals.level_order(self.tree3), [[10]])
        self.assertEqual(BFSTraversals.level_order(self.tree4), [])
        self.assertEqual(BFSTraversals.level_order(self.tree5), [[1], [2], [3]])
        self.assertEqual(BFSTraversals.level_order(self.tree6), [[1], [2], [3]])

    # --- Zigzag Level Order Traversal Tests ---
    def test_zigzag_level_order(self):
        self.assertEqual(BFSTraversals.zigzag_level_order(self.tree1), [[1], [3, 2], [4, 5, 6, 7]])
        self.assertEqual(BFSTraversals.zigzag_level_order(self.tree2), [[3], [20, 9], [15, 7]])
        self.assertEqual(BFSTraversals.zigzag_level_order(self.tree3), [[10]])
        self.assertEqual(BFSTraversals.zigzag_level_order(self.tree4), [])
        self.assertEqual(BFSTraversals.zigzag_level_order(self.tree5), [[1], [2], [3]])
        self.assertEqual(BFSTraversals.zigzag_level_order(self.tree6), [[1], [2], [3]])

class TestBSTValidation(unittest.TestCase):

    def setUp(self):
        # Valid BSTs
        #       2
        #      / \
        #     1   3
        self.bst1 = build_tree_from_list([2, 1, 3])

        #       5
        #      / \
        #     3   7
        #    / \ / \
        #   2  4 6  8
        self.bst2 = build_tree_from_list([5, 3, 7, 2, 4, 6, 8])

        # Single node BST
        self.bst3 = build_tree_from_list([10])

        # Empty tree
        self.bst4 = None

        # Invalid BSTs
        #       5
        #      / \
        #     1   4
        #        / \
        #       3   6  (4's left child 3 is < 4, but > 1) -> This is invalid because 3 > 1.
        # But this tree should be built as:
        #      5
        #     / \
        #    1   4
        #       / \
        #      3   6 (this tree, based on BFS, actually becomes a BST, 3<4, 6>4, but 3 must be > 1.
        # This is invalid by definition, as 3 is in right subtree of 1, but 3 > 1.
        # The build_tree_from_list doesn't enforce BST property.
        # So, the tree is (values, not BST property yet)
        #       5
        #      / \
        #     1   4
        #        / \
        #       3   6
        self.invalid_bst1 = build_tree_from_list([5, 1, 4, None, None, 3, 6]) # 3 is left child of 4, ok. But 3 > 1 for BST parent.

        #       1
        #      / \
        #     2   3  (left child 2 > root 1)
        self.invalid_bst2 = build_tree_from_list([1, 2, 3])

        # BST with duplicate values (not allowed in strict BST)
        #       2
        #      / \
        #     2   3  (left child 2 == root 2, strict BST invalidates)
        self.invalid_bst3_strict = build_tree_from_list([2, 2, 3])

        # Skewed invalid BST
        #       10
        #      /
        #     5
        #    /
        #   12 (12 > 10, should be on right)
        self.invalid_bst4_skewed = build_tree_from_list([10, 5, None, 12])

        #       10
        #         \
        #          15
        #           \
        #            8 (8 < 10, should be on left)
        self.invalid_bst5_skewed = build_tree_from_list([10, None, 15, None, None, None, 8])


    # --- is_valid_bst_recursive Tests ---
    def test_is_valid_bst_recursive_valid(self):
        self.assertTrue(BSTValidation.is_valid_bst_recursive(self.bst1))
        self.assertTrue(BSTValidation.is_valid_bst_recursive(self.bst2))
        self.assertTrue(BSTValidation.is_valid_bst_recursive(self.bst3))
        self.assertTrue(BSTValidation.is_valid_bst_recursive(self.bst4)) # Empty tree is valid BST

    def test_is_valid_bst_recursive_invalid(self):
        self.assertFalse(BSTValidation.is_valid_bst_recursive(self.invalid_bst1))
        self.assertFalse(BSTValidation.is_valid_bst_recursive(self.invalid_bst2))
        self.assertFalse(BSTValidation.is_valid_bst_recursive(self.invalid_bst3_strict))
        self.assertFalse(BSTValidation.is_valid_bst_recursive(self.invalid_bst4_skewed))
        self.assertFalse(BSTValidation.is_valid_bst_recursive(self.invalid_bst5_skewed))
        
        # Test case: right child is too small
        #    5
        #   / \
        #  1   4 (4 is smaller than root's bound for right subtree, which is 5. This is okay.
        # This one is invalid because 4 < 5. But BST says right child must be > root. So 4 must be > 5, this is wrong.
        # Oh, no, the root of 5 is valid with its children 1, 4. But 4's LEFT child is 3.
        # The problem with [5, 1, 4, None, None, 3, 6] is that when checking `is_valid(root.right=4, min=5, max=inf)`
        # `node.val` (4) < `min_val` (5) is false. `node.val` (4) > `max_val` (inf) is false.
        # Correct check is `min_val < node.val < max_val`. So 5 < 4 < inf is false.
        # This specific tree `[5, 1, 4, None, None, 3, 6]` is invalid as 4 (right child of 5)
        # must be > 5. But 4 is not > 5. So it's correctly flagged as false.
        # It's not about the `3` being problematic against `1` here.

    # --- is_valid_bst_iterative_inorder Tests ---
    def test_is_valid_bst_iterative_inorder_valid(self):
        self.assertTrue(BSTValidation.is_valid_bst_iterative_inorder(self.bst1))
        self.assertTrue(BSTValidation.is_valid_bst_iterative_inorder(self.bst2))
        self.assertTrue(BSTValidation.is_valid_bst_iterative_inorder(self.bst3))
        self.assertTrue(BSTValidation.is_valid_bst_iterative_inorder(self.bst4))

    def test_is_valid_bst_iterative_inorder_invalid(self):
        self.assertFalse(BSTValidation.is_valid_bst_iterative_inorder(self.invalid_bst1))
        self.assertFalse(BSTValidation.is_valid_bst_iterative_inorder(self.invalid_bst2))
        self.assertFalse(BSTValidation.is_valid_bst_iterative_inorder(self.invalid_bst3_strict))
        self.assertFalse(BSTValidation.is_valid_bst_iterative_inorder(self.invalid_bst4_skewed))
        self.assertFalse(BSTValidation.is_valid_bst_iterative_inorder(self.invalid_bst5_skewed))

class TestAllPaths(unittest.TestCase):

    def setUp(self):
        # Test tree 1: Basic tree
        #       1
        #      / \
        #     2   3
        #      \
        #       5
        self.tree1 = build_tree_from_list([1, 2, 3, None, 5])

        # Test tree 2: Full tree
        #       1
        #      / \
        #     2   3
        #    / \ / \
        #   4  5 6  7
        self.tree2 = build_tree_from_list([1, 2, 3, 4, 5, 6, 7])

        # Test tree 3: Single node
        self.tree3 = build_tree_from_list([10])

        # Test tree 4: Empty tree
        self.tree4 = None

        # Test tree 5: Left skewed
        #       1
        #      /
        #     2
        #    /
        #   3
        self.tree5 = build_tree_from_list([1, 2, None, 3])

        # Test tree 6: Right skewed
        #       1
        #        \
        #         2
        #          \
        #           3
        self.tree6 = build_tree_from_list([1, None, 2, None, None, None, 3])

    def test_all_paths_to_leaf_recursive(self):
        # Note: Order of paths might vary based on traversal. We sort for consistent comparison.
        self.assertCountEqual(AllPaths.all_paths_to_leaf_recursive(self.tree1), [[1, 2, 5], [1, 3]])
        self.assertCountEqual(AllPaths.all_paths_to_leaf_recursive(self.tree2), [[1, 2, 4], [1, 2, 5], [1, 3, 6], [1, 3, 7]])
        self.assertCountEqual(AllPaths.all_paths_to_leaf_recursive(self.tree3), [[10]])
        self.assertCountEqual(AllPaths.all_paths_to_leaf_recursive(self.tree4), [])
        self.assertCountEqual(AllPaths.all_paths_to_leaf_recursive(self.tree5), [[1, 2, 3]])
        self.assertCountEqual(AllPaths.all_paths_to_leaf_recursive(self.tree6), [[1, 2, 3]])

    def test_all_paths_to_leaf_iterative(self):
        self.assertCountEqual(AllPaths.all_paths_to_leaf_iterative(self.tree1), [[1, 3], [1, 2, 5]])
        self.assertCountEqual(AllPaths.all_paths_to_leaf_iterative(self.tree2), [[1, 3, 7], [1, 3, 6], [1, 2, 5], [1, 2, 4]])
        self.assertCountEqual(AllPaths.all_paths_to_leaf_iterative(self.tree3), [[10]])
        self.assertCountEqual(AllPaths.all_paths_to_leaf_iterative(self.tree4), [])
        self.assertCountEqual(AllPaths.all_paths_to_leaf_iterative(self.tree5), [[1, 2, 3]])
        self.assertCountEqual(AllPaths.all_paths_to_leaf_iterative(self.tree6), [[1, 2, 3]])

if __name__ == '__main__':
    unittest.main()