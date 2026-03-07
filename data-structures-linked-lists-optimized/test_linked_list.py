"""
test_linked_list.py

Unit tests for the Linked List problems implemented in linked_list_problems.py.
Uses the unittest framework to provide comprehensive test cases for correctness.
"""

import unittest
from typing import List, Optional

# Import the ListNode and helper functions
from linked_list_utils import ListNode, list_to_linked_list, linked_list_to_list, create_cycle_list
# Import the problem solutions class
from linked_list_problems import LinkedListProblems

class TestLinkedListProblems(unittest.TestCase):
    """
    Test suite for LinkedListProblems class.
    Each test method covers a specific problem and its various edge cases.
    """

    def setUp(self):
        """
        Set up method runs before each test.
        Initializes an instance of LinkedListProblems for reuse.
        """
        self.solver = LinkedListProblems()

    # --- Test Cases for Problem 1: Reverse Linked List ---
    def test_reverse_list_empty(self):
        """Test reversing an empty list (iterative)."""
        head = list_to_linked_list([])
        reversed_head = self.solver.reverse_list(head)
        self.assertIsNone(reversed_head, "Reversing an empty list should return None.")
        self.assertEqual(linked_list_to_list(reversed_head), [], "Reversed empty list should be empty.")

    def test_reverse_list_single_node(self):
        """Test reversing a single-node list (iterative)."""
        head = list_to_linked_list([1])
        reversed_head = self.solver.reverse_list(head)
        self.assertEqual(linked_list_to_list(reversed_head), [1], "Reversing a single-node list should return itself.")

    def test_reverse_list_multiple_nodes_even(self):
        """Test reversing a list with even number of nodes (iterative)."""
        head = list_to_linked_list([1, 2, 3, 4])
        expected = [4, 3, 2, 1]
        reversed_head = self.solver.reverse_list(head)
        self.assertEqual(linked_list_to_list(reversed_head), expected, "Even length list reversed incorrectly.")

    def test_reverse_list_multiple_nodes_odd(self):
        """Test reversing a list with odd number of nodes (iterative)."""
        head = list_to_linked_list([1, 2, 3, 4, 5])
        expected = [5, 4, 3, 2, 1]
        reversed_head = self.solver.reverse_list(head)
        self.assertEqual(linked_list_to_list(reversed_head), expected, "Odd length list reversed incorrectly.")

    def test_reverse_list_recursive_empty(self):
        """Test reversing an empty list (recursive)."""
        head = list_to_linked_list([])
        reversed_head = self.solver.reverse_list_recursive(head)
        self.assertIsNone(reversed_head, "Reversing an empty list recursively should return None.")
        self.assertEqual(linked_list_to_list(reversed_head), [], "Reversed empty list recursively should be empty.")

    def test_reverse_list_recursive_single_node(self):
        """Test reversing a single-node list (recursive)."""
        head = list_to_linked_list([1])
        reversed_head = self.solver.reverse_list_recursive(head)
        self.assertEqual(linked_list_to_list(reversed_head), [1], "Reversing a single-node list recursively should return itself.")

    def test_reverse_list_recursive_multiple_nodes(self):
        """Test reversing a list with multiple nodes (recursive)."""
        head = list_to_linked_list([10, 20, 30, 40])
        expected = [40, 30, 20, 10]
        reversed_head = self.solver.reverse_list_recursive(head)
        self.assertEqual(linked_list_to_list(reversed_head), expected, "Recursive reverse for multiple nodes failed.")

    # --- Test Cases for Problem 2: Detect Cycle in Linked List ---
    def test_detect_cycle_no_cycle(self):
        """Test case for a list with no cycle (two-pointer)."""
        head = list_to_linked_list([1, 2, 3, 4, 5])
        self.assertFalse(self.solver.detect_cycle(head), "List without cycle should return False.")

    def test_detect_cycle_empty_list(self):
        """Test case for an empty list (two-pointer)."""
        head = list_to_linked_list([])
        self.assertFalse(self.solver.detect_cycle(head), "Empty list should not have a cycle.")

    def test_detect_cycle_single_node_no_cycle(self):
        """Test case for a single node list with no cycle (two-pointer)."""
        head = list_to_linked_list([1])
        self.assertFalse(self.solver.detect_cycle(head), "Single node list without self-loop should not have a cycle.")

    def test_detect_cycle_cycle_at_head(self):
        """Test case for a cycle where tail points to head (two-pointer)."""
        head = create_cycle_list([1, 2, 3], 0) # 3 -> 1
        self.assertTrue(self.solver.detect_cycle(head), "Cycle at head not detected.")

    def test_detect_cycle_cycle_in_middle(self):
        """Test case for a cycle where tail points to a middle node (two-pointer)."""
        head = create_cycle_list([1, 2, 3, 4, 5], 2) # 5 -> 3
        self.assertTrue(self.solver.detect_cycle(head), "Cycle in middle not detected.")

    def test_detect_cycle_self_loop(self):
        """Test case for a single node with a self-loop (two-pointer)."""
        head = create_cycle_list([1], 0) # 1 -> 1
        self.assertTrue(self.solver.detect_cycle(head), "Self-loop not detected.")

    def test_detect_cycle_long_list_no_cycle(self):
        """Test a longer list with no cycle (two-pointer)."""
        head = list_to_linked_list(list(range(100)))
        self.assertFalse(self.solver.detect_cycle(head), "Long list without cycle should return False.")

    def test_detect_cycle_long_list_with_cycle(self):
        """Test a longer list with a cycle (two-pointer)."""
        head = create_cycle_list(list(range(100)), 50) # 99 -> 50
        self.assertTrue(self.solver.detect_cycle(head), "Long list with cycle not detected.")

    def test_detect_cycle_hash_table_no_cycle(self):
        """Test case for a list with no cycle (hash table)."""
        head = list_to_linked_list([1, 2, 3])
        self.assertFalse(self.solver.detect_cycle_hash_table(head), "Hash table: No cycle detected incorrectly.")

    def test_detect_cycle_hash_table_with_cycle(self):
        """Test case for a list with a cycle (hash table)."""
        head = create_cycle_list([1, 2, 3, 4], 1)
        self.assertTrue(self.solver.detect_cycle_hash_table(head), "Hash table: Cycle not detected.")

    # --- Test Cases for Problem 3: Merge Two Sorted Lists ---
    def test_merge_two_lists_empty_l1(self):
        """Test merging with an empty list l1 (iterative)."""
        l1 = list_to_linked_list([])
        l2 = list_to_linked_list([1, 2, 3])
        expected = [1, 2, 3]
        merged_head = self.solver.merge_two_lists(l1, l2)
        self.assertEqual(linked_list_to_list(merged_head), expected, "Merged list incorrect when l1 is empty.")

    def test_merge_two_lists_empty_l2(self):
        """Test merging with an empty list l2 (iterative)."""
        l1 = list_to_linked_list([1, 2, 3])
        l2 = list_to_linked_list([])
        expected = [1, 2, 3]
        merged_head = self.solver.merge_two_lists(l1, l2)
        self.assertEqual(linked_list_to_list(merged_head), expected, "Merged list incorrect when l2 is empty.")

    def test_merge_two_lists_both_empty(self):
        """Test merging two empty lists (iterative)."""
        l1 = list_to_linked_list([])
        l2 = list_to_linked_list([])
        expected = []
        merged_head = self.solver.merge_two_lists(l1, l2)
        self.assertIsNone(merged_head, "Merging two empty lists should return None.")
        self.assertEqual(linked_list_to_list(merged_head), expected, "Merged list incorrect when both are empty.")

    def test_merge_two_lists_general_case(self):
        """Test merging two non-empty lists (iterative)."""
        l1 = list_to_linked_list([1, 2, 4])
        l2 = list_to_linked_list([1, 3, 4])
        expected = [1, 1, 2, 3, 4, 4]
        merged_head = self.solver.merge_two_lists(l1, l2)
        self.assertEqual(linked_list_to_list(merged_head), expected, "General merge case incorrect.")

    def test_merge_two_lists_different_lengths(self):
        """Test merging lists of different lengths (iterative)."""
        l1 = list_to_linked_list([1, 5, 7])
        l2 = list_to_linked_list([2, 3, 4, 6])
        expected = [1, 2, 3, 4, 5, 6, 7]
        merged_head = self.solver.merge_two_lists(l1, l2)
        self.assertEqual(linked_list_to_list(merged_head), expected, "Different length lists merged incorrectly.")

    def test_merge_two_lists_recursive_empty_l1(self):
        """Test merging with an empty list l1 (recursive)."""
        l1 = list_to_linked_list([])
        l2 = list_to_linked_list([1, 2, 3])
        expected = [1, 2, 3]
        merged_head = self.solver.merge_two_lists_recursive(l1, l2)
        self.assertEqual(linked_list_to_list(merged_head), expected, "Recursive merge with empty l1 incorrect.")

    def test_merge_two_lists_recursive_general_case(self):
        """Test merging two non-empty lists (recursive)."""
        l1 = list_to_linked_list([1, 3, 5])
        l2 = list_to_linked_list([2, 4, 6])
        expected = [1, 2, 3, 4, 5, 6]
        merged_head = self.solver.merge_two_lists_recursive(l1, l2)
        self.assertEqual(linked_list_to_list(merged_head), expected, "Recursive general merge case incorrect.")

    def test_merge_two_lists_recursive_all_from_l1(self):
        """Test case where all elements come from l1 first (recursive)."""
        l1 = list_to_linked_list([1, 2, 3])
        l2 = list_to_linked_list([4, 5, 6])
        expected = [1, 2, 3, 4, 5, 6]
        merged_head = self.solver.merge_two_lists_recursive(l1, l2)
        self.assertEqual(linked_list_to_list(merged_head), expected, "Recursive all from l1 first incorrect.")

    # --- Test Cases for Problem 4: Remove Nth Node From End of List ---
    def test_remove_nth_from_end_normal_case(self):
        """Test removing a middle node (two-pointer)."""
        head = list_to_linked_list([1, 2, 3, 4, 5])
        expected = [1, 2, 3, 5] # Remove 4 (2nd from end)
        removed_head = self.solver.remove_nth_from_end(head, 2)
        self.assertEqual(linked_list_to_list(removed_head), expected, "Removing middle node failed.")

    def test_remove_nth_from_end_remove_head(self):
        """Test removing the head of the list (when n = length) (two-pointer)."""
        head = list_to_linked_list([1, 2, 3])
        expected = [2, 3] # Remove 1 (3rd from end)
        removed_head = self.solver.remove_nth_from_end(head, 3)
        self.assertEqual(linked_list_to_list(removed_head), expected, "Removing head node failed.")

    def test_remove_nth_from_end_remove_tail(self):
        """Test removing the tail of the list (when n = 1) (two-pointer)."""
        head = list_to_linked_list([1, 2, 3])
        expected = [1, 2] # Remove 3 (1st from end)
        removed_head = self.solver.remove_nth_from_end(head, 1)
        self.assertEqual(linked_list_to_list(removed_head), expected, "Removing tail node failed.")

    def test_remove_nth_from_end_single_node(self):
        """Test removing the only node in a list (two-pointer)."""
        head = list_to_linked_list([1])
        expected = [] # Remove 1 (1st from end)
        removed_head = self.solver.remove_nth_from_end(head, 1)
        self.assertIsNone(removed_head, "Removing the only node should result in an empty list (None).")
        self.assertEqual(linked_list_to_list(removed_head), expected, "Removing the only node failed.")

    def test_remove_nth_from_end_two_nodes_remove_head(self):
        """Test removing head from a two-node list (n=2) (two-pointer)."""
        head = list_to_linked_list([1, 2])
        expected = [2] # Remove 1 (2nd from end)
        removed_head = self.solver.remove_nth_from_end(head, 2)
        self.assertEqual(linked_list_to_list(removed_head), expected, "Removing head of two-node list failed.")

    def test_remove_nth_from_end_two_nodes_remove_tail(self):
        """Test removing tail from a two-node list (n=1) (two-pointer)."""
        head = list_to_linked_list([1, 2])
        expected = [1] # Remove 2 (1st from end)
        removed_head = self.solver.remove_nth_from_end(head, 1)
        self.assertEqual(linked_list_to_list(removed_head), expected, "Removing tail of two-node list failed.")

    def test_remove_nth_from_end_two_pass_normal_case(self):
        """Test removing a middle node (two-pass)."""
        head = list_to_linked_list([1, 2, 3, 4, 5])
        expected = [1, 2, 3, 5] # Remove 4 (2nd from end)
        removed_head = self.solver.remove_nth_from_end_two_pass(head, 2)
        self.assertEqual(linked_list_to_list(removed_head), expected, "Two-pass removing middle node failed.")

    def test_remove_nth_from_end_two_pass_remove_head(self):
        """Test removing the head of the list (n = length) (two-pass)."""
        head = list_to_linked_list([1, 2, 3])
        expected = [2, 3] # Remove 1 (3rd from end)
        removed_head = self.solver.remove_nth_from_end_two_pass(head, 3)
        self.assertEqual(linked_list_to_list(removed_head), expected, "Two-pass removing head node failed.")

    def test_remove_nth_from_end_two_pass_single_node(self):
        """Test removing the only node in a list (two-pass)."""
        head = list_to_linked_list([1])
        expected = [] # Remove 1 (1st from end)
        removed_head = self.solver.remove_nth_from_end_two_pass(head, 1)
        self.assertIsNone(removed_head, "Two-pass removing the only node should result in an empty list (None).")
        self.assertEqual(linked_list_to_list(removed_head), expected, "Two-pass removing the only node failed.")

    # Additional tests to ensure non-modification of original objects where applicable
    def test_reverse_list_original_modified(self):
        """
        Verify that the original list reference passed to reverse_list
        is indeed modified as it's an in-place reversal.
        """
        original_list_vals = [1, 2, 3]
        head = list_to_linked_list(original_list_vals)
        # Store a reference to the original head node before reversal
        original_head_ref = head

        # Reverse the list
        reversed_head = self.solver.reverse_list(head)

        # Check if the original head's `next` pointer has changed
        # The node that was originally `1` should now point to None as it's the new tail
        self.assertIsNone(original_head_ref.next, "Original head's next pointer should be None after reversal.")
        self.assertEqual(original_head_ref.val, 1, "Original head's value should remain unchanged.")
        self.assertEqual(linked_list_to_list(reversed_head), [3, 2, 1], "Reversed list content correct.")

    def test_merge_two_lists_nodes_reused(self):
        """
        Verify that merge_two_lists reuses nodes from input lists
        and does not create new nodes for values.
        """
        l1_vals = [1, 3]
        l2_vals = [2, 4]
        l1 = list_to_linked_list(l1_vals)
        l2 = list_to_linked_list(l2_vals)

        # Get references to original nodes
        l1_node1 = l1
        l1_node2 = l1.next
        l2_node1 = l2
        l2_node2 = l2.next

        merged_head = self.solver.merge_two_lists(l1, l2)

        # Check if nodes in the merged list are the same objects as in original lists
        # Example: the first node in merged list should be l1_node1 (val 1)
        # The second node should be l2_node1 (val 2)
        # ... and so on
        self.assertIs(merged_head, l1_node1, "First node of merged list should be original l1 node 1.")
        self.assertIs(merged_head.next, l2_node1, "Second node of merged list should be original l2 node 1.")
        self.assertIs(merged_head.next.next, l1_node2, "Third node of merged list should be original l1 node 2.")
        self.assertIs(merged_head.next.next.next, l2_node2, "Fourth node of merged list should be original l2 node 2.")

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)