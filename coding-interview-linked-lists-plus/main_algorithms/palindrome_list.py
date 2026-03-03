# main_algorithms/palindrome_list.py

from utils.linked_list_utils import ListNode
from main_algorithms.reverse_list import SolutionReverseList

class SolutionPalindromeList:
    """
    Problem: Palindrome Linked List
    Given the head of a singly linked list, return true if it is a palindrome or false otherwise.

    Example 1:
    Input: head = [1,2,2,1]
    Output: true

    Example 2:
    Input: head = [1,2]
    Output: false
    """

    def isPalindrome(self, head: ListNode) -> bool:
        """
        Approach 1: Optimized Approach (Find middle, reverse second half, compare)
        This method checks for a palindrome in O(N) time and O(1) space (excluding
        recursion stack if using recursive reverse, but iterative reverse is O(1) space).

        Algorithm:
        1. Handle Edge Cases: If the list is empty or has only one node, it's a palindrome.
           Return `True`.
        2. Find the Middle of the List: Use the fast and slow pointer approach.
           - `slow` pointer moves one step at a time.
           - `fast` pointer moves two steps at a time.
           - When `fast` reaches the end (or `fast.next` is `None`), `slow` will be at the middle.
           - If the list has an odd number of nodes, `fast` will be `None`, and `slow` will be the exact middle node.
             Move `slow` one step further to start the second half *after* the middle node.
           - If the list has an even number of nodes, `fast` will be at the last node, and `slow` will be the first node of the second half.
             No need to move `slow` further.
        3. Reverse the Second Half of the List:
           - Use the `reverseList_iterative` method (from `SolutionReverseList`) starting from `slow`.
           - Let the head of the reversed second half be `second_half_head`.
        4. Compare the First Half with the Reversed Second Half:
           - Initialize `p1 = head` (start of the original list) and `p2 = second_half_head`.
           - Iterate while `p2` is not `None`:
             - If `p1.val != p2.val`, then it's not a palindrome. Return `False`.
             - Move `p1 = p1.next` and `p2 = p2.next`.
        5. If the loop completes, it means the list is a palindrome. Return `True`.

        Important Note: To restore the list to its original state (if required, e.g., in a
        real-world scenario where the list should not be modified), you would reverse the
        second half *again* and re-attach it. This problem usually doesn't require restoration.

        Complexity Analysis:
        - Time Complexity: O(N), where N is the number of nodes in the linked list.
          - Finding middle: O(N/2) ~ O(N)
          - Reversing second half: O(N/2) ~ O(N)
          - Comparing: O(N/2) ~ O(N)
          Total is O(N).
        - Space Complexity: O(1). We only use a few extra pointers. The iterative reverse
          operation also uses O(1) space.
        """
        if not head or not head.next:
            return True

        # 1. Find the middle of the list
        slow = head
        fast = head
        while fast.next and fast.next.next: # Careful with conditions for odd/even length
            slow = slow.next
            fast = fast.next.next
        
        # At this point, slow is the end of the first half (or just before the true middle for odd lists)
        # For [1,2,3,4,5], slow is 3. fast is 5.
        # For [1,2,3,4], slow is 2. fast is 4.

        # 2. Reverse the second half of the list
        # The head of the second half starts from slow.next
        second_half_start = slow.next
        
        reverse_solver = SolutionReverseList()
        reversed_second_half_head = reverse_solver.reverseList_iterative(second_half_start)
        
        # Temporarily disconnect the first half from the second half for comparison
        # (This is implicitly done by `reverseList_iterative` since `slow.next` is passed as new head)
        # However, it's good practice to make `slow.next = None` if we truly want to separate.
        # But here, we just need to compare, so it's fine.

        # 3. Compare the first half and the reversed second half
        p1 = head
        p2 = reversed_second_half_head
        is_palindrome = True

        while p2: # Iterate until the reversed second half is exhausted
            if p1.val != p2.val:
                is_palindrome = False
                break
            p1 = p1.next
            p2 = p2.next
        
        # Optional: Restore the list to its original state
        # (reverse the reversed second half back and re-attach)
        # This is usually not required for the problem, but good for interview discussion.
        # restored_second_half_head = reverse_solver.reverseList_iterative(reversed_second_half_head)
        # slow.next = restored_second_half_head

        return is_palindrome

    def isPalindrome_aux_space(self, head: ListNode) -> bool:
        """
        Approach 2: Using Auxiliary Space (e.g., list or stack)
        This method converts the linked list values into a Python list and then
        checks if the list is a palindrome.

        Algorithm:
        1. Traverse the linked list and store all node values into a Python list.
        2. Check if the Python list is a palindrome (e.g., `my_list == my_list[::-1]`).

        Complexity Analysis:
        - Time Complexity: O(N), where N is the number of nodes.
          - Traversing the list and copying values: O(N)
          - Checking if Python list is palindrome: O(N)
          Total is O(N).
        - Space Complexity: O(N). We store all N node values in an auxiliary list.
        """
        if not head or not head.next:
            return True

        values = []
        current = head
        while current:
            values.append(current.val)
            current = current.next
        
        return values == values[::-1]