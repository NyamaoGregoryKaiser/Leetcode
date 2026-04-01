import unittest
from src.tree_node import build_tree_from_array, TreeNode
from src.bst_traversals import BSTTraversals

class TestBSTTraversals(unittest.TestCase):

    def setUp(self):
        self.bst_ops = BSTTraversals()

        # Test Case 1: Valid BST
        #       2
        #      / \
        #     1   3
        self.bst1_nodes = [2, 1, 3]
        self.bst1_root = build_tree_from_array(self.bst1_nodes) # Kth smallest for k=1,2,3 -> 1,2,3

        # Test Case 2: Invalid BST (right child of 3 is 1, not > 3)
        #       5
        #      / \
        #     1   4
        #        / \
        #       3   6  (invalid, should be 1 < 4 and 4 < 6, but 3 < 4)
        self.invalid_bst1_nodes = [5, 1, 4, None, None, 3, 6]
        self.invalid_bst1_root = build_tree_from_array(self.invalid_bst1_nodes)

        # Test Case 3: Valid BST (larger)
        #          10
        #         /  \
        #        5    15
        #       / \  /  \
        #      3   7 12  18
        #     /     \
        #    2       8
        self.bst2_nodes = [10, 5, 15, 3, 7, 12, 18, 2, None, None, 8]
        self.bst2_root = build_tree_from_array(self.bst2_nodes)
        # Inorder: [2, 3, 5, 7, 8, 10, 12, 15, 18]

        # Test Case 4: Empty tree
        self.empty_tree_nodes = []
        self.empty_tree_root = build_tree_from_array(self.empty_tree_nodes)

        # Test Case 5: Single node tree (valid BST)
        self.single_node_nodes = [7]
        self.single_node_root = build_tree_from_array(self.single_node_nodes)

        # Test Case 6: Left skewed tree (valid BST)
        #     5
        #    /
        #   4
        #  /
        # 3
        self.left_skewed_nodes = [5, 4, None, 3]
        self.left_skewed_root = build_tree_from_array(self.left_skewed_nodes)
        # Inorder: [3, 4, 5]

        # Test Case 7: Right skewed tree (valid BST)
        # 3
        #  \
        #   4
        #    \
        #     5
        self.right_skewed_nodes = [3, None, 4, None, None, None, 5]
        self.right_skewed_root = build_tree_from_array(self.right_skewed_nodes)
        # Inorder: [3, 4, 5]

        # Test Case 8: Invalid BST (root = 2, left = 3, 3 is not < 2)
        #   2
        #  / \
        # 3   1
        self.invalid_bst2_nodes = [2, 3, 1]
        self.invalid_bst2_root = build_tree_from_array(self.invalid_bst2_nodes)

        # Test Case 9: Invalid BST (right child of 10 is 5, not > 10)
        #    10
        #   /  \
        #  5    5
        self.invalid_bst3_nodes = [10, 5, 5]
        self.invalid_bst3_root = build_tree_from_array(self.invalid_bst3_nodes)


    # --- is_valid_bst_recursive tests ---
    def test_is_valid_bst_recursive_valid_cases(self):
        self.assertTrue(self.bst_ops.is_valid_bst_recursive(self.bst1_root))
        self.assertTrue(self.bst_ops.is_valid_bst_recursive(self.bst2_root))
        self.assertTrue(self.bst_ops.is_valid_bst_recursive(self.empty_tree_root))
        self.assertTrue(self.bst_ops.is_valid_bst_recursive(self.single_node_root))
        self.assertTrue(self.bst_ops.is_valid_bst_recursive(self.left_skewed_root))
        self.assertTrue(self.bst_ops.is_valid_bst_recursive(self.right_skewed_root))

    def test_is_valid_bst_recursive_invalid_cases(self):
        self.assertFalse(self.bst_ops.is_valid_bst_recursive(self.invalid_bst1_root))
        self.assertFalse(self.bst_ops.is_valid_bst_recursive(self.invalid_bst2_root))
        self.assertFalse(self.bst_ops.is_valid_bst_recursive(self.invalid_bst3_root))


    # --- is_valid_bst_inorder_iterative tests ---
    def test_is_valid_bst_inorder_iterative_valid_cases(self):
        self.assertTrue(self.bst_ops.is_valid_bst_inorder_iterative(self.bst1_root))
        self.assertTrue(self.bst_ops.is_valid_bst_inorder_iterative(self.bst2_root))
        self.assertTrue(self.bst_ops.is_valid_bst_inorder_iterative(self.empty_tree_root))
        self.assertTrue(self.bst_ops.is_valid_bst_inorder_iterative(self.single_node_root))
        self.assertTrue(self.bst_ops.is_valid_bst_inorder_iterative(self.left_skewed_root))
        self.assertTrue(self.bst_ops.is_valid_bst_inorder_iterative(self.right_skewed_root))

    def test_is_valid_bst_inorder_iterative_invalid_cases(self):
        self.assertFalse(self.bst_ops.is_valid_bst_inorder_iterative(self.invalid_bst1_root))
        self.assertFalse(self.bst_ops.is_valid_bst_inorder_iterative(self.invalid_bst2_root))
        self.assertFalse(self.bst_ops.is_valid_bst_inorder_iterative(self.invalid_bst3_root))


    # --- kth_smallest_recursive tests ---
    def test_kth_smallest_recursive(self):
        self.assertEqual(self.bst_ops.kth_smallest_recursive(self.bst1_root, 1), 1)
        self.assertEqual(self.bst_ops.kth_smallest_recursive(self.bst1_root, 2), 2)
        self.assertEqual(self.bst_ops.kth_smallest_recursive(self.bst1_root, 3), 3)

        self.assertEqual(self.bst_ops.kth_smallest_recursive(self.bst2_root, 1), 2)
        self.assertEqual(self.bst_ops.kth_smallest_recursive(self.bst2_root, 5), 8)
        self.assertEqual(self.bst_ops.kth_smallest_recursive(self.bst2_root, 9), 18)

        self.assertEqual(self.bst_ops.kth_smallest_recursive(self.single_node_root, 1), 7)
        self.assertEqual(self.bst_ops.kth_smallest_recursive(self.left_skewed_root, 1), 3)
        self.assertEqual(self.bst_ops.kth_smallest_recursive(self.left_skewed_root, 3), 5)
        self.assertEqual(self.bst_ops.kth_smallest_recursive(self.right_skewed_root, 1), 3)
        self.assertEqual(self.bst_ops.kth_smallest_recursive(self.right_skewed_root, 3), 5)


    # --- kth_smallest_iterative tests ---
    def test_kth_smallest_iterative(self):
        self.assertEqual(self.bst_ops.kth_smallest_iterative(self.bst1_root, 1), 1)
        self.assertEqual(self.bst_ops.kth_smallest_iterative(self.bst1_root, 2), 2)
        self.assertEqual(self.bst_ops.kth_smallest_iterative(self.bst1_root, 3), 3)

        self.assertEqual(self.bst_ops.kth_smallest_iterative(self.bst2_root, 1), 2)
        self.assertEqual(self.bst_ops.kth_smallest_iterative(self.bst2_root, 5), 8)
        self.assertEqual(self.bst_ops.kth_smallest_iterative(self.bst2_root, 9), 18)

        self.assertEqual(self.bst_ops.kth_smallest_iterative(self.single_node_root, 1), 7)
        self.assertEqual(self.bst_ops.kth_smallest_iterative(self.left_skewed_root, 1), 3)
        self.assertEqual(self.bst_ops.kth_smallest_iterative(self.left_skewed_root, 3), 5)
        self.assertEqual(self.bst_ops.kth_smallest_iterative(self.right_skewed_root, 1), 3)
        self.assertEqual(self.bst_ops.kth_smallest_iterative(self.right_skewed_root, 3), 5)

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)