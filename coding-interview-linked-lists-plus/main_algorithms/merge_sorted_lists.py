# main_algorithms/merge_sorted_lists.py

from utils.linked_list_utils import ListNode

class SolutionMergeSortedLists:
    """
    Problem: Merge Two Sorted Lists
    You are given the heads of two sorted linked lists list1 and list2.
    Merge the two lists into a single sorted list. The list should be made by splicing
    together the nodes of the first two lists.
    Return the head of the merged linked list.

    Example 1:
    Input: list1 = [1,2,4], list2 = [1,3,4]
    Output: [1,1,2,3,4,4]

    Example 2:
    Input: list1 = [], list2 = []
    Output: []

    Example 3:
    Input: list1 = [], list2 = [0]
    Output: [0]
    """

    def mergeTwoLists_iterative(self, list1: ListNode, list2: ListNode) -> ListNode:
        """
        Approach 1: Iterative Method (Creating a new dummy head)
        This method uses a dummy node to simplify the logic of handling the head of the
        merged list, avoiding special checks for the first node.

        Algorithm:
        1. Create a `dummy_head` node (e.g., with value 0). This node will not be part
           of the final merged list but helps in building it.
        2. Create a `current` pointer and initialize it to `dummy_head`. This pointer
           will always point to the last node added to the merged list.
        3. Loop while both `list1` and `list2` are not `None`:
           a. Compare the values of `list1` and `list2`.
           b. If `list1.val <= list2.val`, append `list1` to `current.next`. Then move
              `list1` forward: `list1 = list1.next`.
           c. Else (if `list2.val < list1.val`), append `list2` to `current.next`. Then move
              `list2` forward: `list2 = list2.next`.
           d. Move `current` forward to the newly added node: `current = current.next`.
        4. After the loop, one of the lists might still have remaining nodes (because
           the other list became `None`). Append the rest of the non-null list to `current.next`.
           This is safe because both lists are already sorted.
           `current.next = list1 or list2` (this works because `None` is falsy).
        5. Return `dummy_head.next`, which is the true head of the merged list.

        Complexity Analysis:
        - Time Complexity: O(M + N), where M and N are the lengths of `list1` and `list2` respectively.
          In the worst case, we traverse both lists entirely.
        - Space Complexity: O(1). We only use a few extra pointers (`dummy_head`, `current`, `list1`, `list2`),
          which is constant space. We are splicing nodes, not creating new ones (except for `dummy_head`).
        """
        dummy_head = ListNode(0)  # Dummy node to simplify head creation
        current = dummy_head

        while list1 and list2:
            if list1.val <= list2.val:
                current.next = list1
                list1 = list1.next
            else:
                current.next = list2
                list2 = list2.next
            current = current.next
        
        # Append the remaining nodes from either list (one of them will be None)
        current.next = list1 or list2

        return dummy_head.next

    def mergeTwoLists_recursive(self, list1: ListNode, list2: ListNode) -> ListNode:
        """
        Approach 2: Recursive Method
        This method uses recursion to merge the two lists. The idea is to find the
        smaller head node and then recursively merge the rest of that list with the other list.

        Algorithm:
        1. Base Cases:
           a. If `list1` is `None`, return `list2` (nothing to merge from list1).
           b. If `list2` is `None`, return `list1` (nothing to merge from list2).
        2. Recursive Step:
           a. Compare `list1.val` and `list2.val`.
           b. If `list1.val <= list2.val`:
              The current `list1` node is the head of the merged list. Its `next`
              should be the result of merging `list1.next` with `list2`.
              `list1.next = self.mergeTwoLists_recursive(list1.next, list2)`
              Return `list1`.
           c. Else (if `list2.val < list1.val`):
              The current `list2` node is the head of the merged list. Its `next`
              should be the result of merging `list1` with `list2.next`.
              `list2.next = self.mergeTwoLists_recursive(list1, list2.next)`
              Return `list2`.

        Complexity Analysis:
        - Time Complexity: O(M + N). Each recursive call processes one node, and we
          make a total of M+N calls.
        - Space Complexity: O(M + N) due to the recursion stack. In the worst case
          (e.g., merging [1,2,3] and [4,5,6]), the depth of the recursion can be M+N.
        """
        if not list1:
            return list2
        if not list2:
            return list1

        if list1.val <= list2.val:
            list1.next = self.mergeTwoLists_recursive(list1.next, list2)
            return list1
        else:
            list2.next = self.mergeTwoLists_recursive(list1, list2.next)
            return list2