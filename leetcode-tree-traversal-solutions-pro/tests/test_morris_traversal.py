import unittest
from src.data_structures import build_tree_from_list
from src.morris_traversal import MorrisTraversal

class TestMorrisTraversal(unittest.TestCase):

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

    # --- Morris Inorder Traversal Tests ---
    def test_morris_inorder_traversal(self):
        self.assertEqual(MorrisTraversal.morris_inorder_traversal(self.tree1), [4, 2, 5, 1, 6, 3, 7])
        self.assertEqual(MorrisTraversal.morris_inorder_traversal(self.tree2), [9, 3, 15, 20, 7])
        self.assertEqual(MorrisTraversal.morris_inorder_traversal(self.tree3), [10])
        self.assertEqual(MorrisTraversal.morris_inorder_traversal(self.tree4), [])
        self.assertEqual(MorrisTraversal.morris_inorder_traversal(self.tree5), [3, 2, 1])
        self.assertEqual(MorrisTraversal.morris_inorder_traversal(self.tree6), [1, 2, 3])

    # --- Morris Preorder Traversal Tests ---
    def test_morris_preorder_traversal(self):
        self.assertEqual(MorrisTraversal.morris_preorder_traversal(self.tree1), [1, 2, 4, 5, 3, 6, 7])
        self.assertEqual(MorrisTraversal.morris_preorder_traversal(self.tree2), [3, 9, 20, 15, 7])
        self.assertEqual(MorrisTraversal.morris_preorder_traversal(self.tree3), [10])
        self.assertEqual(MorrisTraversal.morris_preorder_traversal(self.tree4), [])
        self.assertEqual(MorrisTraversal.morris_preorder_traversal(self.tree5), [1, 2, 3])
        self.assertEqual(MorrisTraversal.morris_preorder_traversal(self.tree6), [1, 2, 3])

if __name__ == '__main__':
    unittest.main()