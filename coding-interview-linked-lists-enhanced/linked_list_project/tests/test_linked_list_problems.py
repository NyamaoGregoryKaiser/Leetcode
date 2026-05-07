```python
import unittest
from typing import List, Optional

# Adjust imports based on your project structure
# Assuming tests are run from the project root or main_algorithms is in PYTHONPATH
from main_algorithms.linked_list_problems import LinkedListProblems
from utils.linked_list_utils import ListNode, list_to_linked_list, linked_list_to_list, print_linked_list

class TestLinkedListProblems(unittest.TestCase):

    def _assert_linked_lists_equal(self, l1: Optional[ListNode], l2: Optional[ListNode], msg: str = ""):
        """Helper to assert if two linked lists are equal in value sequence."""
        list1 = linked_list_to_list(l1)
        list2 = linked_list_to_list(l2)
        self.assertEqual(list1, list2, msg=msg)

    # --- Test Cases for Problem 1: Reverse Linked List ---
    def test_reverse_list_iterative_empty(self):
        head = list_to_linked_list([])
        reversed_head = LinkedListProblems.reverse_list_iterative(head)
        self._assert_linked_lists_equal(reversed_head, list_to_linked_list([]), "Iterative: Empty list")

    def test_reverse_list_iterative_single_node(self):
        head = list_to_linked_list([1])
        reversed_head = LinkedListProblems.reverse_list_iterative(head)
        self._assert_linked_lists_equal(reversed_head, list_to_linked_list([1]), "Iterative: Single node list")

    def test_reverse_list_iterative_multiple_nodes(self):
        head = list_to_linked_list([1, 2, 3, 4, 5])
        reversed_head = LinkedListProblems.reverse_list_iterative(head)
        self._assert_linked_lists_equal(reversed_head, list_to_linked_list([5, 4, 3, 2, 1]), "Iterative: Multiple nodes")

    def test_reverse_list_iterative_two_nodes(self):
        head = list_to_linked_list([1, 2])
        reversed_head = LinkedListProblems.reverse_list_iterative(head)
        self._assert_linked_lists_equal(reversed_head, list_to_linked_list([2, 1]), "Iterative: Two nodes")

    def test_reverse_list_recursive_empty(self):
        head = list_to_linked_list([])
        reversed_head = LinkedListProblems.reverse_list_recursive(head)
        self._assert_linked_lists_equal(reversed_head, list_to_linked_list([]), "Recursive: Empty list")

    def test_reverse_list_recursive_single_node(self):
        head = list_to_linked_list([1])
        reversed_head = LinkedListProblems.reverse_list_recursive(head)
        self._assert_linked_lists_equal(reversed_head, list_to_linked_list([1]), "Recursive: Single node list")

    def test_reverse_list_recursive_multiple_nodes(self):
        head = list_to_linked_list([1, 2, 3, 4, 5])
        reversed_head = LinkedListProblems.reverse_list_recursive(head)
        self._assert_linked_lists_equal(reversed_head, list_to_linked_list([5, 4, 3, 2, 1]), "Recursive: Multiple nodes")

    def test_reverse_list_recursive_two_nodes(self):
        head = list_to_linked_list([1, 2])
        reversed_head = LinkedListProblems.reverse_list_recursive(head)
        self._assert_linked_lists_equal(reversed_head, list_to_linked_list([2, 1]), "Recursive: Two nodes")


    # --- Test Cases for Problem 2: Detect Cycle ---
    def test_has_cycle_no_cycle_empty(self):
        head = list_to_linked_list([])
        self.assertFalse(LinkedListProblems.has_cycle(head), "No cycle: Empty list")

    def test_has_cycle_no_cycle_single_node(self):
        head = list_to_linked_list([1])
        self.assertFalse(LinkedListProblems.has_cycle(head), "No cycle: Single node")

    def test_has_cycle_no_cycle_multiple_nodes(self):
        head = list_to_linked_list([1, 2, 3, 4, 5])
        self.assertFalse(LinkedListProblems.has_cycle(head), "No cycle: Multiple nodes")

    def test_has_cycle_cycle_at_start(self):
        head = list_to_linked_list([1, 2, 3], pos=0) # 3 -> 1
        self.assertTrue(LinkedListProblems.has_cycle(head), "Cycle: At start")

    def test_has_cycle_cycle_in_middle(self):
        head = list_to_linked_list([1, 2, 3, 4, 5], pos=2) # 5 -> 3
        self.assertTrue(LinkedListProblems.has_cycle(head), "Cycle: In middle")

    def test_has_cycle_cycle_tail_to_head(self):
        head = list_to_linked_list([1, 2, 3, 4], pos=0) # 4 -> 1
        self.assertTrue(LinkedListProblems.has_cycle(head), "Cycle: Tail to head")

    def test_has_cycle_cycle_single_node_loop(self):
        head = ListNode(1)
        head.next = head
        self.assertTrue(LinkedListProblems.has_cycle(head), "Cycle: Single node loop")

    def test_detect_cycle_start_no_cycle(self):
        head = list_to_linked_list([1, 2, 3])
        self.assertIsNone(LinkedListProblems.detect_cycle_start(head), "Cycle Start: No cycle")

    def test_detect_cycle_start_empty(self):
        head = list_to_linked_list([])
        self.assertIsNone(LinkedListProblems.detect_cycle_start(head), "Cycle Start: Empty list")

    def test_detect_cycle_start_cycle_at_head(self):
        head = list_to_linked_list([1, 2, 3], pos=0) # 3 -> 1
        self.assertEqual(LinkedListProblems.detect_cycle_start(head), head, "Cycle Start: At head")

    def test_detect_cycle_start_cycle_in_middle(self):
        nodes = [1, 2, 3, 4, 5]
        head = list_to_linked_list(nodes, pos=2) # 5 -> 3
        expected_start_node_val = nodes[2] # Value of node at index 2 is 3
        
        actual_start_node = LinkedListProblems.detect_cycle_start(head)
        self.assertIsNotNone(actual_start_node)
        self.assertEqual(actual_start_node.val, expected_start_node_val, "Cycle Start: In middle")

    def test_detect_cycle_start_cycle_tail_to_second_node(self):
        nodes = [1, 2, 3, 4, 5]
        head = list_to_linked_list(nodes, pos=1) # 5 -> 2
        expected_start_node_val = nodes[1] # Value of node at index 1 is 2
        
        actual_start_node = LinkedListProblems.detect_cycle_start(head)
        self.assertIsNotNone(actual_start_node)
        self.assertEqual(actual_start_node.val, expected_start_node_val, "Cycle Start: Tail to second node")

    def test_detect_cycle_start_single_node_loop(self):
        head = ListNode(1)
        head.next = head
        self.assertEqual(LinkedListProblems.detect_cycle_start(head), head, "Cycle Start: Single node loop")


    # --- Test Cases for Problem 3: Merge Two Sorted Lists ---
    def test_merge_two_lists_iterative_both_empty(self):
        l1 = list_to_linked_list([])
        l2 = list_to_linked_list([])
        merged = LinkedListProblems.merge_two_lists_iterative(l1, l2)
        self._assert_linked_lists_equal(merged, list_to_linked_list([]), "Iterative: Both empty")

    def test_merge_two_lists_iterative_l1_empty(self):
        l1 = list_to_linked_list([])
        l2 = list_to_linked_list([1, 2, 3])
        merged = LinkedListProblems.merge_two_lists_iterative(l1, l2)
        self._assert_linked_lists_equal(merged, list_to_linked_list([1, 2, 3]), "Iterative: L1 empty")

    def test_merge_two_lists_iterative_l2_empty(self):
        l1 = list_to_linked_list([1, 2, 3])
        l2 = list_to_linked_list([])
        merged = LinkedListProblems.merge_two_lists_iterative(l1, l2)
        self._assert_linked_lists_equal(merged, list_to_linked_list([1, 2, 3]), "Iterative: L2 empty")

    def test_merge_two_lists_iterative_normal_case(self):
        l1 = list_to_linked_list([1, 2, 4])
        l2 = list_to_linked_list([1, 3, 4])
        merged = LinkedListProblems.merge_two_lists_iterative(l1, l2)
        self._assert_linked_lists_equal(merged, list_to_linked_list([1, 1, 2, 3, 4, 4]), "Iterative: Normal case")

    def test_merge_two_lists_iterative_different_lengths(self):
        l1 = list_to_linked_list([1, 5, 7])
        l2 = list_to_linked_list([2, 3, 4, 6])
        merged = LinkedListProblems.merge_two_lists_iterative(l1, l2)
        self._assert_linked_lists_equal(merged, list_to_linked_list([1, 2, 3, 4, 5, 6, 7]), "Iterative: Different lengths")

    def test_merge_two_lists_iterative_one_long_one_short(self):
        l1 = list_to_linked_list([10])
        l2 = list_to_linked_list([1, 2, 3, 4, 5])
        merged = LinkedListProblems.merge_two_lists_iterative(l1, l2)
        self._assert_linked_lists_equal(merged, list_to_linked_list([1, 2, 3, 4, 5, 10]), "Iterative: One long, one short")
    
    def test_merge_two_lists_recursive_both_empty(self):
        l1 = list_to_linked_list([])
        l2 = list_to_linked_list([])
        merged = LinkedListProblems.merge_two_lists_recursive(l1, l2)
        self._assert_linked_lists_equal(merged, list_to_linked_list([]), "Recursive: Both empty")

    def test_merge_two_lists_recursive_l1_empty(self):
        l1 = list_to_linked_list([])
        l2 = list_to_linked_list([1, 2, 3])
        merged = LinkedListProblems.merge_two_lists_recursive(l1, l2)
        self._assert_linked_lists_equal(merged, list_to_linked_list([1, 2, 3]), "Recursive: L1 empty")

    def test_merge_two_lists_recursive_l2_empty(self):
        l1 = list_to_linked_list([1, 2, 3])
        l2 = list_to_linked_list([])
        merged = LinkedListProblems.merge_two_lists_recursive(l1, l2)
        self._assert_linked_lists_equal(merged, list_to_linked_list([1, 2, 3]), "Recursive: L2 empty")

    def test_merge_two_lists_recursive_normal_case(self):
        l1 = list_to_linked_list([1, 2, 4])
        l2 = list_to_linked_list([1, 3, 4])
        merged = LinkedListProblems.merge_two_lists_recursive(l1, l2)
        self._assert_linked_lists_equal(merged, list_to_linked_list([1, 1, 2, 3, 4, 4]), "Recursive: Normal case")

    def test_merge_two_lists_recursive_different_lengths(self):
        l1 = list_to_linked_list([1, 5, 7])
        l2 = list_to_linked_list([2, 3, 4, 6])
        merged = LinkedListProblems.merge_two_lists_recursive(l1, l2)
        self._assert_linked_lists_equal(merged, list_to_linked_list([1, 2, 3, 4, 5, 6, 7]), "Recursive: Different lengths")


    # --- Test Cases for Problem 4: Remove Nth Node From End of List ---
    def test_remove_nth_from_end_normal(self):
        head = list_to_linked_list([1, 2, 3, 4, 5])
        result = LinkedListProblems.remove_nth_from_end(head, 2)
        self._assert_linked_lists_equal(result, list_to_linked_list([1, 2, 3, 5]), "Remove Nth: Normal case")

    def test_remove_nth_from_end_remove_head(self):
        head = list_to_linked_list([1, 2, 3, 4, 5])
        result = LinkedListProblems.remove_nth_from_end(head, 5)
        self._assert_linked_lists_equal(result, list_to_linked_list([2, 3, 4, 5]), "Remove Nth: Remove head")

    def test_remove_nth_from_end_remove_tail(self):
        head = list_to_linked_list([1, 2, 3, 4, 5])
        result = LinkedListProblems.remove_nth_from_end(head, 1)
        self._assert_linked_lists_equal(result, list_to_linked_list([1, 2, 3, 4]), "Remove Nth: Remove tail")

    def test_remove_nth_from_end_single_node(self):
        head = list_to_linked_list([1])
        result = LinkedListProblems.remove_nth_from_end(head, 1)
        self._assert_linked_lists_equal(result, list_to_linked_list([]), "Remove Nth: Single node")

    def test_remove_nth_from_end_two_nodes_remove_first(self):
        head = list_to_linked_list([1, 2])
        result = LinkedListProblems.remove_nth_from_end(head, 2)
        self._assert_linked_lists_equal(result, list_to_linked_list([2]), "Remove Nth: Two nodes, remove first")
    
    def test_remove_nth_from_end_two_nodes_remove_second(self):
        head = list_to_linked_list([1, 2])
        result = LinkedListProblems.remove_nth_from_end(head, 1)
        self._assert_linked_lists_equal(result, list_to_linked_list([1]), "Remove Nth: Two nodes, remove second")

    def test_remove_nth_from_end_n_equals_length(self):
        head = list_to_linked_list([1, 2, 3])
        result = LinkedListProblems.remove_nth_from_end(head, 3)
        self._assert_linked_lists_equal(result, list_to_linked_list([2, 3]), "Remove Nth: n equals length")

    # The problem description typically guarantees `n` is valid.
    # def test_remove_nth_from_end_n_too_large(self):
    #     head = list_to_linked_list([1, 2, 3])
    #     result = LinkedListProblems.remove_nth_from_end(head, 4)
    #     self._assert_linked_lists_equal(result, list_to_linked_list([1, 2, 3]), "Remove Nth: n too large (no change expected)")


    # --- Test Cases for Problem 5: Add Two Numbers ---
    def test_add_two_numbers_normal(self):
        l1 = list_to_linked_list([2, 4, 3]) # 342
        l2 = list_to_linked_list([5, 6, 4]) # 465
        result = LinkedListProblems.add_two_numbers(l1, l2) # 342 + 465 = 807 -> [7,0,8]
        self._assert_linked_lists_equal(result, list_to_linked_list([7, 0, 8]), "Add Two Numbers: Normal case")

    def test_add_two_numbers_different_lengths(self):
        l1 = list_to_linked_list([9, 9, 9]) # 999
        l2 = list_to_linked_list([1])       # 1
        result = LinkedListProblems.add_two_numbers(l1, l2) # 999 + 1 = 1000 -> [0,0,0,1]
        self._assert_linked_lists_equal(result, list_to_linked_list([0, 0, 0, 1]), "Add Two Numbers: Different lengths, with carry")
    
    def test_add_two_numbers_with_carry_at_end(self):
        l1 = list_to_linked_list([9, 9]) # 99
        l2 = list_to_linked_list([1])    # 1
        result = LinkedListProblems.add_two_numbers(l1, l2) # 99 + 1 = 100 -> [0,0,1]
        self._assert_linked_lists_equal(result, list_to_linked_list([0, 0, 1]), "Add Two Numbers: Carry at end")

    def test_add_two_numbers_one_list_empty(self):
        l1 = list_to_linked_list([1, 2, 3])
        l2 = list_to_linked_list([])
        result = LinkedListProblems.add_two_numbers(l1, l2)
        self._assert_linked_lists_equal(result, list_to_linked_list([1, 2, 3]), "Add Two Numbers: One list empty")

    def test_add_two_numbers_both_empty_or_zero(self):
        l1 = list_to_linked_list([0])
        l2 = list_to_linked_list([0])
        result = LinkedListProblems.add_two_numbers(l1, l2)
        self._assert_linked_lists_equal(result, list_to_linked_list([0]), "Add Two Numbers: Both zeros")

    def test_add_two_numbers_large_values(self):
        l1 = list_to_linked_list([9, 9, 9, 9, 9, 9, 9]) # 9,999,999
        l2 = list_to_linked_list([9, 9, 9, 9])         # 9,999
        result = LinkedListProblems.add_two_numbers(l1, l2) # 9,999,999 + 9,999 = 10,009,998
        expected = list_to_linked_list([8, 9, 9, 0, 0, 0, 1])
        self._assert_linked_lists_equal(result, expected, "Add Two Numbers: Large values")


if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)
```