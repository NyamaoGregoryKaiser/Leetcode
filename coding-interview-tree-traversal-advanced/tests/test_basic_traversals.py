import unittest
from src.tree_node import build_tree_from_array, TreeNode
from src.basic_traversals import BasicTraversals

class TestBasicTraversals(unittest.TestCase):

    def setUp(self):
        self.traversals = BasicTraversals()
        # Test Case 1: Standard balanced tree
        #       4
        #      / \
        #     2   5
        #    / \
        #   1   3
        self.tree1_nodes = [4, 2, 5, 1, 3]
        self.tree1_root = build_tree_from_array(self.tree1_nodes)
        self.tree1_inorder = [1, 2, 3, 4, 5]
        self.tree1_preorder = [4, 2, 1, 3, 5]
        self.tree1_postorder = [1, 3, 2, 5, 4]

        # Test Case 2: Empty tree
        self.tree2_nodes = []
        self.tree2_root = build_tree_from_array(self.tree2_nodes)
        self.tree2_expected = []

        # Test Case 3: Single node tree
        #   1
        self.tree3_nodes = [1]
        self.tree3_root = build_tree_from_array(self.tree3_nodes)
        self.tree3_expected = [1]

        # Test Case 4: Skewed left tree
        #     3
        #    /
        #   2
        #  /
        # 1
        self.tree4_nodes = [3, 2, None, 1]
        self.tree4_root = build_tree_from_array(self.tree4_nodes)
        self.tree4_inorder = [1, 2, 3]
        self.tree4_preorder = [3, 2, 1]
        self.tree4_postorder = [1, 2, 3]

        # Test Case 5: Skewed right tree
        # 1
        #  \
        #   2
        #    \
        #     3
        self.tree5_nodes = [1, None, 2, None, None, None, 3]
        self.tree5_root = build_tree_from_array(self.tree5_nodes)
        self.tree5_inorder = [1, 2, 3]
        self.tree5_preorder = [1, 2, 3]
        self.tree5_postorder = [3, 2, 1]

        # Test Case 6: Larger tree
        #          10
        #         /  \
        #        5    15
        #       / \  /  \
        #      3   7 12  18
        #     /     \
        #    2       8
        self.tree6_nodes = [10, 5, 15, 3, 7, 12, 18, 2, None, None, 8]
        self.tree6_root = build_tree_from_array(self.tree6_nodes)
        self.tree6_inorder = [2, 3, 5, 7, 8, 10, 12, 15, 18]
        self.tree6_preorder = [10, 5, 3, 2, 7, 8, 15, 12, 18]
        self.tree6_postorder = [2, 3, 8, 7, 5, 12, 18, 15, 10]


    # --- Inorder Traversal Tests ---
    def test_inorder_recursive(self):
        self.assertEqual(self.traversals.inorder_traversal_recursive(self.tree1_root), self.tree1_inorder)
        self.assertEqual(self.traversals.inorder_traversal_recursive(self.tree2_root), self.tree2_expected)
        self.assertEqual(self.traversals.inorder_traversal_recursive(self.tree3_root), self.tree3_expected)
        self.assertEqual(self.traversals.inorder_traversal_recursive(self.tree4_root), self.tree4_inorder)
        self.assertEqual(self.traversals.inorder_traversal_recursive(self.tree5_root), self.tree5_inorder)
        self.assertEqual(self.traversals.inorder_traversal_recursive(self.tree6_root), self.tree6_inorder)

    def test_inorder_iterative(self):
        self.assertEqual(self.traversals.inorder_traversal_iterative(self.tree1_root), self.tree1_inorder)
        self.assertEqual(self.traversals.inorder_traversal_iterative(self.tree2_root), self.tree2_expected)
        self.assertEqual(self.traversals.inorder_traversal_iterative(self.tree3_root), self.tree3_expected)
        self.assertEqual(self.traversals.inorder_traversal_iterative(self.tree4_root), self.tree4_inorder)
        self.assertEqual(self.traversals.inorder_traversal_iterative(self.tree5_root), self.tree5_inorder)
        self.assertEqual(self.traversals.inorder_traversal_iterative(self.tree6_root), self.tree6_inorder)

    # --- Preorder Traversal Tests ---
    def test_preorder_recursive(self):
        self.assertEqual(self.traversals.preorder_traversal_recursive(self.tree1_root), self.tree1_preorder)
        self.assertEqual(self.traversals.preorder_traversal_recursive(self.tree2_root), self.tree2_expected)
        self.assertEqual(self.traversals.preorder_traversal_recursive(self.tree3_root), self.tree3_expected)
        self.assertEqual(self.traversals.preorder_traversal_recursive(self.tree4_root), self.tree4_preorder)
        self.assertEqual(self.traversals.preorder_traversal_recursive(self.tree5_root), self.tree5_preorder)
        self.assertEqual(self.traversals.preorder_traversal_recursive(self.tree6_root), self.tree6_preorder)

    def test_preorder_iterative(self):
        self.assertEqual(self.traversals.preorder_traversal_iterative(self.tree1_root), self.tree1_preorder)
        self.assertEqual(self.traversals.preorder_traversal_iterative(self.tree2_root), self.tree2_expected)
        self.assertEqual(self.traversals.preorder_traversal_iterative(self.tree3_root), self.tree3_expected)
        self.assertEqual(self.traversals.preorder_traversal_iterative(self.tree4_root), self.tree4_preorder)
        self.assertEqual(self.traversals.preorder_traversal_iterative(self.tree5_root), self.tree5_preorder)
        self.assertEqual(self.traversals.preorder_traversal_iterative(self.tree6_root), self.tree6_preorder)

    # --- Postorder Traversal Tests ---
    def test_postorder_recursive(self):
        self.assertEqual(self.traversals.postorder_traversal_recursive(self.tree1_root), self.tree1_postorder)
        self.assertEqual(self.traversals.postorder_traversal_recursive(self.tree2_root), self.tree2_expected)
        self.assertEqual(self.traversals.postorder_traversal_recursive(self.tree3_root), self.tree3_expected)
        self.assertEqual(self.traversals.postorder_traversal_recursive(self.tree4_root), self.tree4_postorder)
        self.assertEqual(self.traversals.postorder_traversal_recursive(self.tree5_root), self.tree5_postorder)
        self.assertEqual(self.traversals.postorder_traversal_recursive(self.tree6_root), self.tree6_postorder)

    def test_postorder_iterative(self):
        self.assertEqual(self.traversals.postorder_traversal_iterative(self.tree1_root), self.tree1_postorder)
        self.assertEqual(self.traversals.postorder_traversal_iterative(self.tree2_root), self.tree2_expected)
        self.assertEqual(self.traversals.postorder_traversal_iterative(self.tree3_root), self.tree3_expected)
        self.assertEqual(self.traversals.postorder_traversal_iterative(self.tree4_root), self.tree4_postorder)
        self.assertEqual(self.traversals.postorder_traversal_iterative(self.tree5_root), self.tree5_postorder)
        self.assertEqual(self.traversals.postorder_traversal_iterative(self.tree6_root), self.tree6_postorder)

    def test_postorder_iterative_single_stack(self):
        self.assertEqual(self.traversals.postorder_traversal_iterative_single_stack(self.tree1_root), self.tree1_postorder)
        self.assertEqual(self.traversals.postorder_traversal_iterative_single_stack(self.tree2_root), self.tree2_expected)
        self.assertEqual(self.traversals.postorder_traversal_iterative_single_stack(self.tree3_root), self.tree3_expected)
        self.assertEqual(self.traversals.postorder_traversal_iterative_single_stack(self.tree4_root), self.tree4_postorder)
        self.assertEqual(self.traversals.postorder_traversal_iterative_single_stack(self.tree5_root), self.tree5_postorder)
        self.assertEqual(self.traversals.postorder_traversal_iterative_single_stack(self.tree6_root), self.tree6_postorder)

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)