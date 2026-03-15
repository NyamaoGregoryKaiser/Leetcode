import unittest
from src.data_structures import TreeNode, build_tree_from_list, serialize_tree_to_list

class TestDataStructures(unittest.TestCase):

    def test_tree_node_creation(self):
        node = TreeNode(10)
        self.assertEqual(node.val, 10)
        self.assertIsNone(node.left)
        self.assertIsNone(node.right)

        left_child = TreeNode(5)
        right_child = TreeNode(15)
        node.left = left_child
        node.right = right_child
        self.assertEqual(node.left.val, 5)
        self.assertEqual(node.right.val, 15)

    def test_build_tree_from_empty_list(self):
        root = build_tree_from_list([])
        self.assertIsNone(root)

    def test_build_tree_from_single_node_list(self):
        root = build_tree_from_list([1])
        self.assertIsNotNone(root)
        self.assertEqual(root.val, 1)
        self.assertIsNone(root.left)
        self.assertIsNone(root.right)

    def test_build_tree_from_complete_tree(self):
        # [1, 2, 3, 4, 5, 6, 7]
        #     1
        #    / \
        #   2   3
        #  /|\ /|\
        # 4 5 6 7
        root = build_tree_from_list([1, 2, 3, 4, 5, 6, 7])
        self.assertEqual(root.val, 1)
        self.assertEqual(root.left.val, 2)
        self.assertEqual(root.right.val, 3)
        self.assertEqual(root.left.left.val, 4)
        self.assertEqual(root.left.right.val, 5)
        self.assertEqual(root.right.left.val, 6)
        self.assertEqual(root.right.right.val, 7)

    def test_build_tree_from_incomplete_tree(self):
        # [3, 9, 20, None, None, 15, 7]
        #     3
        #    / \
        #   9  20
        #     /  \
        #    15   7
        root = build_tree_from_list([3, 9, 20, None, None, 15, 7])
        self.assertEqual(root.val, 3)
        self.assertEqual(root.left.val, 9)
        self.assertIsNone(root.left.left)
        self.assertIsNone(root.left.right)
        self.assertEqual(root.right.val, 20)
        self.assertEqual(root.right.left.val, 15)
        self.assertEqual(root.right.right.val, 7)

    def test_build_tree_from_skewed_left_tree(self):
        # [1, 2, None, 3, None, None, None, 4] -> Should build correctly up to 3, 4 will be ignored as no parent
        #     1
        #    /
        #   2
        #  /
        # 3
        root = build_tree_from_list([1, 2, None, 3])
        self.assertEqual(root.val, 1)
        self.assertEqual(root.left.val, 2)
        self.assertIsNone(root.right)
        self.assertEqual(root.left.left.val, 3)
        self.assertIsNone(root.left.right)

    def test_serialize_tree_empty(self):
        self.assertEqual(serialize_tree_to_list(None), [])

    def test_serialize_tree_single_node(self):
        root = TreeNode(1)
        self.assertEqual(serialize_tree_to_list(root), [1])

    def test_serialize_tree_complete_tree(self):
        root = build_tree_from_list([1, 2, 3, 4, 5, 6, 7])
        self.assertEqual(serialize_tree_to_list(root), [1, 2, 3, 4, 5, 6, 7])

    def test_serialize_tree_incomplete_tree(self):
        root = build_tree_from_list([3, 9, 20, None, None, 15, 7])
        self.assertEqual(serialize_tree_to_list(root), [3, 9, 20, None, None, 15, 7])
        
        root2 = build_tree_from_list([1,2,None,3,4,None,5,6])
        #     1
        #    /
        #   2
        #  / \
        # 3   4
        #    /
        #   5
        #  /
        # 6
        expected = [1,2,None,3,4,None,None,None,5,None,None,None,6] # Adjusted to show full serialization, trailing Nones removed by func
        # Actual output of serialize_tree_to_list for [1,2,None,3,4,None,5,6] would be:
        # [1, 2, None, 3, 4, None, None, None, 5, None, None, None, 6]
        # after removing trailing Nones this becomes [1, 2, None, 3, 4, None, None, None, 5, None, None, None, 6]
        # Oh, I missed that serialize_tree_to_list trims trailing Nones.
        # Let's re-verify the expected output for the given input pattern.
        # Tree:
        #      1
        #     /
        #    2
        #   / \
        #  3   4
        #     /
        #    5
        #   /
        #  6
        # Level 0: [1]
        # Level 1: [2, None]
        # Level 2: [3, 4, None, None] (children of 2 are 3,4. Children of None are None,None)
        # Level 3: [None, None, None, 5, None, None, None, None] (children of 3 are N,N. children of 4 is N,5. child of N is N,N. child of N is N,N)
        # Level 4: [None, None, None, None, 6, None, None, None, None, None, None, None, None, None, None, None] (children of 5 is 6,N)
        # after removing trailing Nones: [1, 2, None, 3, 4, None, None, None, 5, None, None, None, 6]
        self.assertEqual(serialize_tree_to_list(root2), [1,2,None,3,4,None,None,None,5,None,None,None,6])

    def test_serialize_tree_skewed_tree(self):
        # Left skewed
        root_left = build_tree_from_list([1, 2, None, 3])
        self.assertEqual(serialize_tree_to_list(root_left), [1, 2, None, 3])

        # Right skewed
        root_right = build_tree_from_list([1, None, 2, None, None, None, 3])
        #     1
        #      \
        #       2
        #        \
        #         3
        # serialize_tree_to_list(root_right) should be [1, None, 2, None, None, None, 3]
        # Level 0: [1]
        # Level 1: [None, 2]
        # Level 2: [None, None, None, 3]
        # Trailing Nones will be trimmed.
        self.assertEqual(serialize_tree_to_list(root_right), [1, None, 2, None, None, None, 3])


if __name__ == '__main__':
    unittest.main()