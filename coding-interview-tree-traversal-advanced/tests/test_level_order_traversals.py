import unittest
from src.tree_node import build_tree_from_array, TreeNode
from src.level_order_traversals import LevelOrderTraversals

class TestLevelOrderTraversals(unittest.TestCase):

    def setUp(self):
        self.traversals = LevelOrderTraversals()

        # Test Case 1: Standard tree
        #       3
        #      / \
        #     9  20
        #    / \ / \
        #   4   5 15 7
        self.tree1_nodes = [3, 9, 20, 4, 5, 15, 7]
        self.tree1_root = build_tree_from_array(self.tree1_nodes)
        self.tree1_level_order = [[3], [9, 20], [4, 5, 15, 7]]
        self.tree1_zigzag_order = [[3], [20, 9], [4, 5, 15, 7]]

        # Test Case 2: Empty tree
        self.tree2_nodes = []
        self.tree2_root = build_tree_from_array(self.tree2_nodes)
        self.tree2_expected = []

        # Test Case 3: Single node tree
        #   1
        self.tree3_nodes = [1]
        self.tree3_root = build_tree_from_array(self.tree3_nodes)
        self.tree3_level_order = [[1]]
        self.tree3_zigzag_order = [[1]]

        # Test Case 4: Skewed left tree
        #     3
        #    /
        #   2
        #  /
        # 1
        self.tree4_nodes = [3, 2, None, 1]
        self.tree4_root = build_tree_from_array(self.tree4_nodes)
        self.tree4_level_order = [[3], [2], [1]]
        self.tree4_zigzag_order = [[3], [2], [1]] # Zigzag is same for skewed

        # Test Case 5: Skewed right tree
        # 1
        #  \
        #   2
        #    \
        #     3
        self.tree5_nodes = [1, None, 2, None, None, None, 3]
        self.tree5_root = build_tree_from_array(self.tree5_nodes)
        self.tree5_level_order = [[1], [2], [3]]
        self.tree5_zigzag_order = [[1], [2], [3]] # Zigzag is same for skewed

        # Test Case 6: Tree with only one side for some levels
        #          1
        #         / \
        #        2   3
        #       /     \
        #      4       5
        #     /         \
        #    6           7
        self.tree6_nodes = [1, 2, 3, 4, None, None, 5, 6, None, None, None, None, None, None, 7]
        self.tree6_root = build_tree_from_array(self.tree6_nodes)
        self.tree6_level_order = [[1], [2, 3], [4, 5], [6, 7]]
        self.tree6_zigzag_order = [[1], [3, 2], [4, 5], [7, 6]]


    # --- Level Order Traversal Tests ---
    def test_level_order_traversal(self):
        self.assertEqual(self.traversals.level_order_traversal(self.tree1_root), self.tree1_level_order)
        self.assertEqual(self.traversals.level_order_traversal(self.tree2_root), self.tree2_expected)
        self.assertEqual(self.traversals.level_order_traversal(self.tree3_root), self.tree3_level_order)
        self.assertEqual(self.traversals.level_order_traversal(self.tree4_root), self.tree4_level_order)
        self.assertEqual(self.traversals.level_order_traversal(self.tree5_root), self.tree5_level_order)
        self.assertEqual(self.traversals.level_order_traversal(self.tree6_root), self.tree6_level_order)

    # --- Zigzag Level Order Traversal Tests ---
    def test_zigzag_level_order_traversal(self):
        self.assertEqual(self.traversals.zigzag_level_order_traversal(self.tree1_root), self.tree1_zigzag_order)
        self.assertEqual(self.traversals.zigzag_level_order_traversal(self.tree2_root), self.tree2_expected)
        self.assertEqual(self.traversals.zigzag_level_order_traversal(self.tree3_root), self.tree3_zigzag_order)
        self.assertEqual(self.traversals.zigzag_level_order_traversal(self.tree4_root), self.tree4_zigzag_order)
        self.assertEqual(self.traversals.zigzag_level_order_traversal(self.tree5_root), self.tree5_zigzag_order)
        self.assertEqual(self.traversals.zigzag_level_order_traversal(self.tree6_root), self.tree6_zigzag_order)

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)