"""
linked_list_problems.py

This file contains the implementations for various common Linked List problems.
Each problem includes one or more solutions, detailed comments, and complexity analysis.
"""

from typing import Optional, List
from linked_list_utils import ListNode # Import our ListNode definition

class LinkedListProblems:
    """
    A collection of solutions for classic Linked List problems.
    """

    def reverse_list(self, head: Optional[ListNode]) -> Optional[ListNode]:
        """
        Problem 1: Reverse Linked List
        Given the head of a singly linked list, reverse the list, and return the reversed list.

        Example:
        Input: 1 -> 2 -> 3 -> 4 -> 5 -> None
        Output: 5 -> 4 -> 3 -> 2 -> 1 -> None

        Solution 1: Iterative Approach (Optimal)
        Uses three pointers: `prev`, `curr`, and `next_temp`.
        `prev` tracks the already reversed part, `curr` is the node being processed,
        `next_temp` temporarily stores the next node before `curr.next` is changed.

        Algorithm:
        1. Initialize `prev` to None (the new tail of the reversed list).
        2. Initialize `curr` to `head` (the node we are currently processing).
        3. Loop while `curr` is not None:
            a. Store `curr.next` in `next_temp` to not lose the rest of the list.
            b. Set `curr.next` to `prev` (reversing the pointer).
            c. Move `prev` forward to `curr`.
            d. Move `curr` forward to `next_temp`.
        4. After the loop, `prev` will be the new head of the reversed list.

        Time Complexity: O(N), where N is the number of nodes in the linked list.
                         Each node is visited exactly once.
        Space Complexity: O(1), as only a few extra pointers are used regardless of N.
        """
        prev: Optional[ListNode] = None
        curr: Optional[ListNode] = head

        while curr:
            # Store the next node temporarily
            # This is crucial to avoid losing the rest of the list
            next_temp: Optional[ListNode] = curr.next

            # Reverse the current node's pointer
            # It now points to the previous node (which is the head of the reversed part)
            curr.next = prev

            # Move pointers one step forward
            # `prev` becomes the current node
            prev = curr
            # `curr` becomes the next node (stored in next_temp)
            curr = next_temp

        # After the loop, `curr` is None, and `prev` points to the last node
        # of the original list, which is now the new head of the reversed list.
        return prev

    def reverse_list_recursive(self, head: Optional[ListNode]) -> Optional[ListNode]:
        """
        Problem 1: Reverse Linked List - Recursive Approach

        Solution 2: Recursive Approach
        This approach reverses the list by breaking it down into subproblems.
        The base cases are an empty list or a single-node list.
        For a list `head -> next_node -> ...`, it recursively reverses the sublist
        `next_node -> ...` and then fixes the pointers of `head` and `next_node`.

        Algorithm:
        1. Base Cases:
            a. If `head` is None or `head.next` is None, the list is empty or has one node,
               which is already reversed. Return `head`.
        2. Recursive Step:
            a. Recursively call `reverse_list_recursive` on `head.next`. This call
               will return the new head of the reversed sublist (e.g., `reversed_tail`
               will be the original last node).
            b. Let `next_node` be `head.next`. After the recursive call, `next_node`
               is still the node that was originally after `head`. In the reversed
               sublist, `next_node` is now the tail.
            c. The original `head` should now follow `next_node`. So, `next_node.next`
               should point to `head`.
            d. The original `head` is now the new tail of the sublist, so its `next`
               pointer should be None.
            e. The `reversed_head` returned from the recursive call is the new head
               of the entirely reversed list.

        Time Complexity: O(N), where N is the number of nodes. Each node is processed once.
        Space Complexity: O(N), due to the recursion stack. In the worst case (a long list),
                          N stack frames will be created.
        """
        # Base case: empty list or single node list
        if head is None or head.next is None:
            return head

        # Recursively reverse the rest of the list
        # `reversed_head` will be the new head of the reversed sublist (e.g., 5 for 1->2->3->4->5)
        # For list 1->2->3->4->5:
        #   - first call: reverse_list_recursive(2->3->4->5) returns 5
        #   - next_node is 2
        #   - 2.next.next (which is 3.next after recursive call) points to 2
        #   - 2.next becomes None
        #   - returns 5
        reversed_head: Optional[ListNode] = self.reverse_list_recursive(head.next)

        # After the recursive call, `head.next` still points to the node that was
        # originally after `head`. Let's call this `next_node`.
        # E.g., if head=1, next_node=2. The sublist 2->3->4->5 is now 5->4->3->2.
        # We need to make `2` (the current `next_node`) point to `1` (the `head`).
        # And `1` (the `head`) should point to `None` as it's now the new tail of this part.
        head.next.next = head # Make the next node point back to the current head
        head.next = None     # Make the current head point to None (it's now the tail)

        # The head of the completely reversed list is `reversed_head`
        return reversed_head


    def detect_cycle(self, head: Optional[ListNode]) -> bool:
        """
        Problem 2: Detect Cycle in Linked List
        Given the head of a linked list, return true if there is a cycle in the linked list.
        A cycle means that some node in the list can be reached again by continuously
        following the `next` pointer.

        Example:
        Input: 3 -> 2 -> 0 -> -4 (tail connects to node with val 2)
        Output: True

        Solution 1: Floyd's Tortoise and Hare (Two-Pointer) Algorithm (Optimal)
        Uses two pointers, a 'slow' pointer moving one step at a time and a 'fast' pointer
        moving two steps at a time. If there is a cycle, the fast pointer will eventually
        catch up to the slow pointer within the cycle.

        Algorithm:
        1. Initialize `slow` and `fast` pointers to `head`.
        2. Loop while `fast` and `fast.next` are not None:
            a. Move `slow` one step: `slow = slow.next`.
            b. Move `fast` two steps: `fast = fast.next.next`.
            c. If `slow` and `fast` meet (i.e., `slow == fast`), a cycle is detected. Return True.
        3. If the loop finishes, it means `fast` or `fast.next` became None,
           indicating the end of the list was reached, so there is no cycle. Return False.

        Time Complexity: O(N), where N is the number of nodes in the linked list.
                         In the worst case (no cycle or cycle detected near the end),
                         the pointers traverse the list at most twice.
        Space Complexity: O(1), as only two extra pointers are used.
        """
        if not head or not head.next:
            return False # An empty list or a single-node list cannot have a cycle

        slow: Optional[ListNode] = head
        fast: Optional[ListNode] = head

        while fast and fast.next: # Ensure fast and its next exist to avoid AttributeError
            slow = slow.next          # Move slow by 1 step
            fast = fast.next.next     # Move fast by 2 steps

            if slow == fast:
                return True # Cycle detected

        return False # Fast pointer reached the end of the list, no cycle


    def detect_cycle_hash_table(self, head: Optional[ListNode]) -> bool:
        """
        Problem 2: Detect Cycle in Linked List - Hash Table Approach

        Solution 2: Hash Table (Set) Approach
        This approach iterates through the linked list, adding each node to a hash set.
        If a node is encountered that is already in the hash set, it means a cycle exists.

        Algorithm:
        1. Initialize an empty hash set (Python `set`).
        2. Initialize `current` pointer to `head`.
        3. Loop while `current` is not None:
            a. Check if `current` is already in the hash set. If yes, a cycle is detected. Return True.
            b. Add `current` to the hash set.
            c. Move `current` to `current.next`.
        4. If the loop finishes, no cycle was found. Return False.

        Time Complexity: O(N), where N is the number of nodes. Each node is visited once,
                         and hash set operations (add, check existence) take O(1) on average.
        Space Complexity: O(N), as in the worst case (no cycle), all N nodes are stored in the hash set.
        """
        if not head:
            return False

        visited_nodes: set[ListNode] = set() # Use a set to store visited nodes
        current: Optional[ListNode] = head

        while current:
            if current in visited_nodes:
                return True # Node already visited, cycle detected
            visited_nodes.add(current) # Add current node to set
            current = current.next     # Move to the next node

        return False # Reached the end of the list, no cycle


    def merge_two_lists(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        """
        Problem 3: Merge Two Sorted Lists
        Merge two sorted singly linked lists into a single sorted linked list.
        The list should be made by splicing together the nodes of the first two lists.

        Example:
        Input: l1 = 1 -> 2 -> 4, l2 = 1 -> 3 -> 4
        Output: 1 -> 1 -> 2 -> 3 -> 4 -> 4

        Solution 1: Iterative Approach (Optimal)
        Uses a dummy node to simplify the logic of handling the head of the new merged list.
        It then iteratively compares the values of the current nodes from both lists and
        appends the smaller one to the merged list.

        Algorithm:
        1. Create a `dummy_head` node (e.g., with value 0) and a `current` pointer
           initialized to `dummy_head`. This helps avoid special casing for the first node.
        2. Loop while both `l1` and `l2` are not None:
            a. If `l1.val` is less than or equal to `l2.val`:
                i. Append `l1` to `current.next`.
                ii. Move `l1` forward: `l1 = l1.next`.
            b. Else (if `l2.val` is smaller):
                i. Append `l2` to `current.next`.
                ii. Move `l2` forward: `l2 = l2.next`.
            c. Move `current` forward to the newly appended node: `current = current.next`.
        3. After the loop, one of the lists might still have remaining elements (because the other became None).
           Append the rest of the non-empty list to `current.next`.
           (`current.next = l1 if l1 is not None else l2` or `current.next = l1 or l2`)
        4. The merged list starts from `dummy_head.next`.

        Time Complexity: O(M + N), where M and N are the lengths of l1 and l2 respectively.
                         Each node from both lists is visited exactly once.
        Space Complexity: O(1), as only a few extra pointers and a dummy node are used.
                          No new nodes are created; existing nodes are simply re-linked.
        """
        # Create a dummy node to simplify handling the head of the merged list.
        # Its 'next' will eventually point to the actual head.
        dummy_head: ListNode = ListNode(0)
        # `current` pointer will traverse the new merged list, appending nodes.
        current: ListNode = dummy_head

        # Loop until at least one of the lists becomes empty
        while l1 is not None and l2 is not None:
            if l1.val <= l2.val:
                current.next = l1  # Append node from l1
                l1 = l1.next       # Move l1's pointer forward
            else:
                current.next = l2  # Append node from l2
                l2 = l2.next       # Move l2's pointer forward
            current = current.next # Move current pointer forward in the merged list

        # If one list is exhausted, append the remaining nodes of the other list.
        # This handles cases where one list is longer or initially empty.
        current.next = l1 if l1 is not None else l2

        # The merged list starts from the node after the dummy head.
        return dummy_head.next

    def merge_two_lists_recursive(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        """
        Problem 3: Merge Two Sorted Lists - Recursive Approach

        Solution 2: Recursive Approach
        This approach leverages recursion by comparing the heads of the two lists.
        The smaller node becomes the head of the merged list, and its `next` pointer
        is set to the result of merging the rest of its list with the other list.

        Algorithm:
        1. Base Cases:
            a. If `l1` is None, return `l2` (the rest of `l2` is the merged list).
            b. If `l2` is None, return `l1` (the rest of `l1` is the merged list).
        2. Recursive Step:
            a. If `l1.val` is less than or equal to `l2.val`:
                i. The head of the merged list will be `l1`.
                ii. Recursively merge `l1.next` with `l2`, and set `l1.next` to the result.
                iii. Return `l1`.
            b. Else (if `l2.val` is smaller):
                i. The head of the merged list will be `l2`.
                ii. Recursively merge `l1` with `l2.next`, and set `l2.next` to the result.
                iii. Return `l2`.

        Time Complexity: O(M + N), where M and N are the lengths of l1 and l2 respectively.
                         Each node is visited once.
        Space Complexity: O(M + N), due to the recursion stack. In the worst case,
                          the depth of the recursion can be the sum of the lengths of the two lists.
        """
        # Base cases: if one list is exhausted, return the other list
        if not l1:
            return l2
        if not l2:
            return l1

        # Compare the values of the current nodes
        if l1.val <= l2.val:
            # If l1's current node is smaller or equal, it becomes the head of the merged list.
            # Then, recursively merge the rest of l1 (l1.next) with l2.
            l1.next = self.merge_two_lists_recursive(l1.next, l2)
            return l1 # Return l1 as the head of the merged list
        else:
            # If l2's current node is smaller, it becomes the head of the merged list.
            # Then, recursively merge l1 with the rest of l2 (l2.next).
            l2.next = self.merge_two_lists_recursive(l1, l2.next)
            return l2 # Return l2 as the head of the merged list


    def remove_nth_from_end(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        """
        Problem 4: Remove Nth Node From End of List
        Given the head of a singly linked list, remove the nth node from the end of the list,
        and return its head.

        Example:
        Input: head = 1 -> 2 -> 3 -> 4 -> 5, n = 2
        Output: 1 -> 2 -> 3 -> 5
        (The 2nd node from the end is 4. Removing it results in 1 -> 2 -> 3 -> 5)

        Solution 1: Two-Pointer Approach (Optimal)
        Uses two pointers, `fast` and `slow`. The `fast` pointer moves `n` steps ahead of `slow`.
        Then, both pointers move one step at a time until `fast` reaches the end of the list.
        At this point, `slow` will be at the node *before* the one to be removed.

        Algorithm:
        1. Create a `dummy_head` node pointing to the original `head`. This simplifies
           the edge case of removing the head of the original list.
        2. Initialize `fast` and `slow` pointers to `dummy_head`.
        3. Move `fast` `n` steps forward. After this, `fast` is `n` nodes ahead of `slow`.
           This establishes the gap.
        4. Move both `fast` and `slow` one step at a time until `fast` reaches the end
           (i.e., `fast.next` is None).
        5. At this point, `slow` will be pointing to the node directly *before* the Nth node
           from the end.
        6. To remove the Nth node, update `slow.next` to `slow.next.next`. This bypasses
           the node to be removed.
        7. Return `dummy_head.next`.

        Edge Cases:
        *   Removing the head of the list (when `n` is equal to the list's length).
            The `dummy_head` handles this gracefully. If the head is removed,
            `dummy_head.next` will point to the second node, which is the new head.
        *   An empty list or invalid `n` are typically handled by constraints,
            but a robust solution should consider them.

        Time Complexity: O(L), where L is the length of the linked list.
                         `fast` traverses the list once (n steps + L-n steps).
        Space Complexity: O(1), as only a few extra pointers and a dummy node are used.
        """
        # Create a dummy node to handle edge cases, especially removing the head.
        # The dummy node's next points to the original head.
        dummy_head: ListNode = ListNode(0, head)

        slow: Optional[ListNode] = dummy_head
        fast: Optional[ListNode] = dummy_head

        # Move `fast` pointer `n` steps ahead
        # This creates a gap of `n` nodes between `slow` and `fast`
        for _ in range(n + 1): # +1 because we need slow to stop *before* the node to remove
            if fast is None:
                # This could happen if n is greater than the list length.
                # Depending on problem constraints, might raise an error or handle gracefully.
                # For typical interview problems, n is guaranteed to be valid.
                return head # Or raise an error
            fast = fast.next

        # Move both pointers until `fast` reaches the end of the list
        # When `fast` is None, `slow` will be at the node *before* the Nth node from the end.
        while fast is not None:
            slow = slow.next
            fast = fast.next

        # `slow` is now pointing to the node just before the node to be removed.
        # Bypass the Nth node from the end.
        if slow and slow.next:
            slow.next = slow.next.next

        # Return the new head of the list (which is dummy_head.next)
        return dummy_head.next


    def remove_nth_from_end_two_pass(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        """
        Problem 4: Remove Nth Node From End of List - Two-Pass Approach

        Solution 2: Two-Pass Approach
        This approach first calculates the total length of the linked list.
        Then, it determines the index of the node to remove from the beginning
        and iterates again to remove it.

        Algorithm:
        1. Create a `dummy_head` node pointing to the original `head`.
        2. First pass: Traverse the list to find its `length`.
        3. Calculate the position `k` from the beginning to remove: `k = length - n`.
           The node at this `k`-th index (0-indexed) is the one to remove.
        4. Second pass: Initialize a `current` pointer to `dummy_head`.
           Traverse `k` steps forward (`current` will then be at the node *before* the one to remove).
        5. Update `current.next` to `current.next.next` to remove the node.
        6. Return `dummy_head.next`.

        Time Complexity: O(L), where L is the length of the linked list.
                         The list is traversed twice.
        Space Complexity: O(1), as only a few extra pointers and a dummy node are used.
        """
        # Create a dummy node to handle edge cases, especially removing the head.
        dummy_head: ListNode = ListNode(0, head)
        current: Optional[ListNode] = dummy_head
        length: int = 0

        # First pass: Calculate the length of the list
        temp = head
        while temp:
            length += 1
            temp = temp.next

        # Calculate the position of the node to remove from the beginning (0-indexed)
        # We need to reach the node *before* the one to be removed.
        # So, we need to iterate `length - n` times from `dummy_head`.
        steps_to_reach_prev = length - n

        # Second pass: Traverse to the node before the one to remove
        for _ in range(steps_to_reach_prev):
            if current: # Ensure current is not None, though it shouldn't be with valid n
                current = current.next

        # `current` is now at the node just before the target node to be removed.
        # Perform the removal by bypassing the target node.
        if current and current.next:
            current.next = current.next.next

        return dummy_head.next

# Example Usage (optional, for direct script execution/testing):
if __name__ == "__main__":
    from linked_list_utils import list_to_linked_list, linked_list_to_list, print_linked_list, create_cycle_list

    ll_problems = LinkedListProblems()

    print("--- Problem 1: Reverse Linked List ---")
    # Test cases for reverse_list
    list_to_reverse = [1, 2, 3, 4, 5]
    ll_orig = list_to_linked_list(list_to_reverse)
    print(f"Original list: {list_to_reverse}")
    print("Original linked list: ", end="")
    print_linked_list(ll_orig)

    reversed_ll = ll_problems.reverse_list(ll_orig)
    print("Reversed (iterative) linked list: ", end="")
    print_linked_list(reversed_ll) # Expected: 5 -> 4 -> 3 -> 2 -> 1
    assert linked_list_to_list(reversed_ll) == [5, 4, 3, 2, 1]

    # Test recursive reverse
    ll_orig_rec = list_to_linked_list([10, 20, 30])
    print(f"Original list for recursive: {[10, 20, 30]}")
    reversed_ll_rec = ll_problems.reverse_list_recursive(ll_orig_rec)
    print("Reversed (recursive) linked list: ", end="")
    print_linked_list(reversed_ll_rec) # Expected: 30 -> 20 -> 10
    assert linked_list_to_list(reversed_ll_rec) == [30, 20, 10]

    ll_empty = list_to_linked_list([])
    print("Empty list reversed: ", end="")
    print_linked_list(ll_problems.reverse_list(ll_empty)) # Expected: Empty List

    ll_single = list_to_linked_list([1])
    print("Single node list reversed: ", end="")
    print_linked_list(ll_problems.reverse_list(ll_single)) # Expected: 1

    print("\n--- Problem 2: Detect Cycle in Linked List ---")
    # Test cases for detect_cycle
    ll_no_cycle = list_to_linked_list([1, 2, 3, 4, 5])
    print(f"List [1,2,3,4,5] has cycle: {ll_problems.detect_cycle(ll_no_cycle)}") # Expected: False
    print(f"List [1,2,3,4,5] has cycle (hash table): {ll_problems.detect_cycle_hash_table(ll_no_cycle)}") # Expected: False

    ll_cycle_at_pos_1 = create_cycle_list([3, 2, 0, -4], 1) # tail points to node with val 2
    print(f"List [3,2,0,-4] with cycle at pos 1 has cycle: {ll_problems.detect_cycle(ll_cycle_at_pos_1)}") # Expected: True
    print(f"List [3,2,0,-4] with cycle at pos 1 has cycle (hash table): {ll_problems.detect_cycle_hash_table(ll_cycle_at_pos_1)}") # Expected: True

    ll_single_node_cycle = create_cycle_list([1], 0)
    print(f"List [1] with cycle at pos 0 has cycle: {ll_problems.detect_cycle(ll_single_node_cycle)}") # Expected: True
    print(f"List [1] with cycle at pos 0 has cycle (hash table): {ll_problems.detect_cycle_hash_table(ll_single_node_cycle)}") # Expected: True

    ll_empty_cycle = create_cycle_list([], -1)
    print(f"Empty list has cycle: {ll_problems.detect_cycle(ll_empty_cycle)}") # Expected: False

    print("\n--- Problem 3: Merge Two Sorted Lists ---")
    # Test cases for merge_two_lists
    l1_a = list_to_linked_list([1, 2, 4])
    l2_a = list_to_linked_list([1, 3, 4])
    merged_a = ll_problems.merge_two_lists(l1_a, l2_a)
    print("Merge [1,2,4] and [1,3,4] (iterative): ", end="")
    print_linked_list(merged_a) # Expected: 1 -> 1 -> 2 -> 3 -> 4 -> 4
    assert linked_list_to_list(merged_a) == [1, 1, 2, 3, 4, 4]

    l1_b = list_to_linked_list([5])
    l2_b = list_to_linked_list([1, 2, 3])
    merged_b = ll_problems.merge_two_lists(l1_b, l2_b)
    print("Merge [5] and [1,2,3] (iterative): ", end="")
    print_linked_list(merged_b) # Expected: 1 -> 2 -> 3 -> 5
    assert linked_list_to_list(merged_b) == [1, 2, 3, 5]

    l1_c = list_to_linked_list([])
    l2_c = list_to_linked_list([0])
    merged_c = ll_problems.merge_two_lists_recursive(l1_c, l2_c)
    print("Merge [] and [0] (recursive): ", end="")
    print_linked_list(merged_c) # Expected: 0
    assert linked_list_to_list(merged_c) == [0]

    l1_d = list_to_linked_list([1, 3, 5])
    l2_d = list_to_linked_list([2, 4, 6])
    merged_d = ll_problems.merge_two_lists_recursive(l1_d, l2_d)
    print("Merge [1,3,5] and [2,4,6] (recursive): ", end="")
    print_linked_list(merged_d) # Expected: 1 -> 2 -> 3 -> 4 -> 5 -> 6
    assert linked_list_to_list(merged_d) == [1, 2, 3, 4, 5, 6]

    print("\n--- Problem 4: Remove Nth Node From End of List ---")
    # Test cases for remove_nth_from_end
    ll_rem1 = list_to_linked_list([1, 2, 3, 4, 5])
    removed_ll1 = ll_problems.remove_nth_from_end(ll_rem1, 2)
    print("Remove 2nd from end of [1,2,3,4,5] (two-pointer): ", end="")
    print_linked_list(removed_ll1) # Expected: 1 -> 2 -> 3 -> 5
    assert linked_list_to_list(removed_ll1) == [1, 2, 3, 5]

    ll_rem2 = list_to_linked_list([1])
    removed_ll2 = ll_problems.remove_nth_from_end(ll_rem2, 1)
    print("Remove 1st from end of [1] (two-pointer): ", end="")
    print_linked_list(removed_ll2) # Expected: Empty List
    assert linked_list_to_list(removed_ll2) == []

    ll_rem3 = list_to_linked_list([1, 2])
    removed_ll3 = ll_problems.remove_nth_from_end(ll_rem3, 2)
    print("Remove 2nd from end of [1,2] (two-pointer, remove head): ", end="")
    print_linked_list(removed_ll3) # Expected: 2
    assert linked_list_to_list(removed_ll3) == [2]

    ll_rem4 = list_to_linked_list([1, 2, 3, 4, 5, 6])
    removed_ll4 = ll_problems.remove_nth_from_end_two_pass(ll_rem4, 3) # Remove 4
    print("Remove 3rd from end of [1,2,3,4,5,6] (two-pass): ", end="")
    print_linked_list(removed_ll4) # Expected: 1 -> 2 -> 3 -> 5 -> 6
    assert linked_list_to_list(removed_ll4) == [1, 2, 3, 5, 6]

    ll_rem5 = list_to_linked_list([10, 20, 30])
    removed_ll5 = ll_problems.remove_nth_from_end_two_pass(ll_rem5, 1) # Remove 30
    print("Remove 1st from end of [10,20,30] (two-pass): ", end="")
    print_linked_list(removed_ll5) # Expected: 10 -> 20
    assert linked_list_to_list(removed_ll5) == [10, 20]