# tests/test_linked_lists.py

import pytest
from utils.linked_list_utils import (
    ListNode,
    create_linked_list_from_list,
    convert_linked_list_to_list,
    create_linked_list_with_cycle
)

# Import all solutions
from main_algorithms.reverse_list import SolutionReverseList
from main_algorithms.merge_sorted_lists import SolutionMergeSortedLists
from main_algorithms.detect_cycle import SolutionDetectCycle
from main_algorithms.remove_nth_from_end import SolutionRemoveNthFromEnd
from main_algorithms.palindrome_list import SolutionPalindromeList

# --- Fixtures for common objects ---
@pytest.fixture
def reverse_solver():
    return SolutionReverseList()

@pytest.fixture
def merge_solver():
    return SolutionMergeSortedLists()

@pytest.fixture
def cycle_solver():
    return SolutionDetectCycle()

@pytest.fixture
def remove_nth_solver():
    return SolutionRemoveNthFromEnd()

@pytest.fixture
def palindrome_solver():
    return SolutionPalindromeList()

# --- Test Cases for Reverse Linked List ---
@pytest.mark.parametrize("input_list, expected_list", [
    ([], []),
    ([1], [1]),
    ([1, 2], [2, 1]),
    ([1, 2, 3, 4, 5], [5, 4, 3, 2, 1]),
    ([10, 20, 30, 40], [40, 30, 20, 10]),
])
def test_reverse_list(reverse_solver, input_list, expected_list):
    head = create_linked_list_from_list(input_list)
    
    # Test iterative approach
    # Need to recreate list for each test function run, as the list is modified in-place
    reversed_head_iterative = reverse_solver.reverseList_iterative(create_linked_list_from_list(input_list))
    assert convert_linked_list_to_list(reversed_head_iterative) == expected_list

    # Test recursive approach
    reversed_head_recursive = reverse_solver.reverseList_recursive(head) # head from fixture
    assert convert_linked_list_to_list(reversed_head_recursive) == expected_list


# --- Test Cases for Merge Two Sorted Lists ---
@pytest.mark.parametrize("list1_vals, list2_vals, expected_vals", [
    ([], [], []),
    ([1], [], [1]),
    ([], [1], [1]),
    ([1, 2, 4], [1, 3, 4], [1, 1, 2, 3, 4, 4]),
    ([5, 6, 7], [1, 2, 3], [1, 2, 3, 5, 6, 7]),
    ([1, 3, 5], [2, 4, 6], [1, 2, 3, 4, 5, 6]),
    ([1, 1, 1], [1, 1, 1], [1, 1, 1, 1, 1, 1]),
    ([10], [20], [10, 20]),
])
def test_merge_two_lists(merge_solver, list1_vals, list2_vals, expected_vals):
    # For iterative, recreate lists as they are modified in place
    list1_head_iterative = create_linked_list_from_list(list1_vals)
    list2_head_iterative = create_linked_list_from_list(list2_vals)
    merged_head_iterative = merge_solver.mergeTwoLists_iterative(list1_head_iterative, list2_head_iterative)
    assert convert_linked_list_to_list(merged_head_iterative) == expected_vals

    # For recursive, recreate lists as they are modified in place
    list1_head_recursive = create_linked_list_from_list(list1_vals)
    list2_head_recursive = create_linked_list_from_list(list2_vals)
    merged_head_recursive = merge_solver.mergeTwoLists_recursive(list1_head_recursive, list2_head_recursive)
    assert convert_linked_list_to_list(merged_head_recursive) == expected_vals


# --- Test Cases for Detect Cycle ---
@pytest.mark.parametrize("input_list, pos, expected_has_cycle", [
    ([], -1, False),
    ([1], -1, False),
    ([1, 2], -1, False),
    ([1, 2], 0, True),  # Cycle at head
    ([3, 2, 0, -4], 1, True), # Cycle in middle
    ([1, 2, 3, 4, 5], 4, True), # Cycle at tail
    ([1, 2, 3, 4, 5], 2, True), # Cycle at 3
])
def test_has_cycle(cycle_solver, input_list, pos, expected_has_cycle):
    head = create_linked_list_with_cycle(input_list, pos)
    assert cycle_solver.hasCycle(head) == expected_has_cycle

@pytest.mark.parametrize("input_list, pos, expected_cycle_start_val", [
    ([], -1, None),
    ([1], -1, None),
    ([1, 2], -1, None),
    ([1, 2], 0, 1),  # Cycle at head (val 1)
    ([3, 2, 0, -4], 1, 2), # Cycle at node with value 2
    ([1, 2, 3, 4, 5], 4, 5), # Cycle at node with value 5
    ([1, 2, 3, 4, 5], 2, 3), # Cycle at node with value 3
])
def test_detect_cycle(cycle_solver, input_list, pos, expected_cycle_start_val):
    head = create_linked_list_with_cycle(input_list, pos)
    cycle_start_node = cycle_solver.detectCycle(head)
    
    if expected_cycle_start_val is None:
        assert cycle_start_node is None
    else:
        assert cycle_start_node is not None
        assert cycle_start_node.val == expected_cycle_start_val

@pytest.mark.parametrize("input_list, pos, expected_cycle_length", [
    ([], -1, 0),
    ([1], -1, 0),
    ([1, 2], -1, 0),
    ([1, 2], 0, 2),  # Cycle: 1->2->1 (length 2)
    ([3, 2, 0, -4], 1, 3), # Cycle: 2->0->-4->2 (length 3)
    ([1, 2, 3, 4, 5], 4, 1), # Cycle: 5->5 (length 1)
    ([1, 2, 3, 4, 5], 2, 3), # Cycle: 3->4->5->3 (length 3)
])
def test_cycle_length(cycle_solver, input_list, pos, expected_cycle_length):
    head = create_linked_list_with_cycle(input_list, pos)
    actual_length = cycle_solver.cycleLength(head)
    assert actual_length == expected_cycle_length


# --- Test Cases for Remove Nth Node From End ---
@pytest.mark.parametrize("input_list, n, expected_list", [
    ([1, 2, 3, 4, 5], 2, [1, 2, 3, 5]),
    ([1], 1, []),
    ([1, 2], 1, [1]),
    ([1, 2], 2, [2]),
    ([1, 2, 3, 4, 5], 1, [1, 2, 3, 4]), # Remove last
    ([1, 2, 3, 4, 5], 5, [2, 3, 4, 5]), # Remove first
    ([10, 20, 30], 3, [20, 30]),
    ([10, 20, 30], 1, [10, 20]),
])
def test_remove_nth_from_end(remove_nth_solver, input_list, n, expected_list):
    # Test two-pass approach
    # Need to recreate list as it is modified in-place
    head_two_pass = create_linked_list_from_list(input_list)
    result_head_two_pass = remove_nth_solver.removeNthFromEnd_two_pass(head_two_pass, n)
    assert convert_linked_list_to_list(result_head_two_pass) == expected_list

    # Test one-pass approach
    # Need to recreate list as it is modified in-place
    head_one_pass = create_linked_list_from_list(input_list)
    result_head_one_pass = remove_nth_solver.removeNthFromEnd_one_pass(head_one_pass, n)
    assert convert_linked_list_to_list(result_head_one_pass) == expected_list


# --- Test Cases for Palindrome Linked List ---
@pytest.mark.parametrize("input_list, expected_is_palindrome", [
    ([], True),
    ([1], True),
    ([1, 1], True),
    ([1, 2, 1], True),
    ([1, 2, 2, 1], True),
    ([1, 2, 3, 2, 1], True),
    ([1, 2], False),
    ([1, 2, 3], False),
    ([1, 2, 3, 4], False),
    ([1, 5, 1, 5, 1], True),
    ([1, 5, 1, 1, 5, 1], True), # Even list palindrome
    ([1, 2, 3, 3, 2, 1], True), # Even list palindrome
    ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], True) # Long palindrome
])
def test_is_palindrome(palindrome_solver, input_list, expected_is_palindrome):
    # Test optimized approach
    # Need to recreate list as it is modified in-place (during reverse, though restored)
    head_optimized = create_linked_list_from_list(input_list)
    assert palindrome_solver.isPalindrome(head_optimized) == expected_is_palindrome

    # Test auxiliary space approach
    head_aux_space = create_linked_list_from_list(input_list)
    assert palindrome_solver.isPalindrome_aux_space(head_aux_space) == expected_is_palindrome