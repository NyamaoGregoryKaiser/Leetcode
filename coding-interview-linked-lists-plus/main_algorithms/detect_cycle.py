# main_algorithms/detect_cycle.py

from utils.linked_list_utils import ListNode

class SolutionDetectCycle:
    """
    Problem: Linked List Cycle
    Given the head of a linked list, return the node where the cycle begins.
    If there is no cycle, return None.

    There is a cycle in a linked list if there is some node in the list
    that can be reached again by continuously following the next pointer.
    Internally, pos is used to denote the index of the node that tail's
    next pointer is connected to. Note that pos is not passed as a parameter.

    Example 1:
    Input: head = [3,2,0,-4], pos = 1 (tail connects to node index 1)
    Output: tail connects to node index 1
    Explanation: There is a cycle in the linked list, where the tail connects to the second node.

    Example 2:
    Input: head = [1,2], pos = 0
    Output: tail connects to node index 0
    Explanation: There is a cycle in the linked list, where the tail connects to the first node.

    Example 3:
    Input: head = [1], pos = -1
    Output: no cycle
    Explanation: There is no cycle in the linked list.
    """

    def hasCycle(self, head: ListNode) -> bool:
        """
        Approach 1: Detect if a cycle exists using Floyd's Tortoise and Hare algorithm.

        Algorithm:
        1. Initialize two pointers, `slow` and `fast`, both pointing to `head`.
        2. Move `slow` one step at a time, and `fast` two steps at a time.
        3. If there is a cycle, `fast` will eventually meet `slow`.
           (Because the relative speed difference is 1, they are moving towards each other
           in the cycle).
        4. If `fast` or `fast.next` becomes `None`, it means `fast` has reached the end
           of the list, and thus there is no cycle.

        Complexity Analysis:
        - Time Complexity: O(N), where N is the number of nodes in the linked list.
          In the worst case (no cycle or cycle at the end), `fast` traverses the list.
          Each step, `fast` advances by 2, `slow` by 1. The distance between them
          either increases by 1 or decreases by 1.
          If there's no cycle, `fast` reaches end in N/2 steps.
          If there's a cycle, `fast` enters the cycle and eventually meets `slow`.
          The time taken to reach the meeting point is proportional to N.
        - Space Complexity: O(1). We only use two pointers.
        """
        if not head or not head.next:
            return False

        slow = head
        fast = head

        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                return True # Cycle detected
        
        return False # No cycle

    def detectCycle(self, head: ListNode) -> ListNode:
        """
        Approach 2: Detect the start node of the cycle.
        Leverages Floyd's Tortoise and Hare algorithm.

        Algorithm:
        1. Use `hasCycle` logic to find if a cycle exists and where `slow` and `fast` meet.
           If no cycle, return `None`.
        2. If a cycle exists, reset `slow` to `head`.
        3. Move both `slow` and `fast` one step at a time.
        4. The node where `slow` and `fast` meet again is the start of the cycle.

        Mathematical Proof (Briefly):
        Let L be the distance from head to cycle start.
        Let C be the length of the cycle.
        Let K be the distance from cycle start to meeting point (for fast/slow).

        When they meet:
        Distance by slow = L + K
        Distance by fast = L + K + n*C (where n is number of full cycles fast completed)
        Also, distance by fast = 2 * Distance by slow

        So, 2 * (L + K) = L + K + n*C
        2L + 2K = L + K + n*C
        L + K = n*C
        L = n*C - K

        If we move `slow` to `head` and keep `fast` at meeting point,
        and both move one step at a time:
        After L steps:
        - `slow` will be at cycle start.
        - `fast` will be at (K + L) steps from cycle start. Since L = n*C - K,
          K + L = K + n*C - K = n*C.
          This means `fast` will also be at the cycle start after `L` steps.
        Thus, they meet at the cycle start.

        Complexity Analysis:
        - Time Complexity: O(N). The first phase (detecting cycle) is O(N).
          The second phase (finding start node) involves traversing `L` steps (distance to cycle start),
          which is at most N. So, total is O(N).
        - Space Complexity: O(1). Only a few pointers.
        """
        if not head or not head.next:
            return None

        slow = head
        fast = head

        # Phase 1: Detect cycle and find meeting point
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                break # Cycle detected
        else:
            return None # No cycle

        # Phase 2: Find cycle start
        # Reset slow pointer to head
        slow = head
        while slow != fast:
            slow = slow.next
            fast = fast.next
        
        return slow # Both pointers meet at the cycle start node

    def cycleLength(self, head: ListNode) -> int:
        """
        Approach 3: Calculate the length of the cycle.
        Assumes a cycle exists. If not, behavior is undefined or errors might occur.

        Algorithm:
        1. First, detect a cycle and find the meeting point using `hasCycle` logic.
           If no cycle, return 0 or handle error.
        2. Once `slow` and `fast` meet, keep `slow` at the meeting point.
        3. Move `fast` one step at a time and count how many steps it takes to
           meet `slow` again. This count is the cycle length.

        Complexity Analysis:
        - Time Complexity: O(N). Similar to `detectCycle`, involves two phases,
          each proportional to N.
        - Space Complexity: O(1).
        """
        if not head or not head.next:
            return 0 # No cycle, or list too short for a meaningful cycle.

        slow = head
        fast = head
        
        # Phase 1: Detect cycle and find meeting point
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                break # Cycle detected
        else:
            return 0 # No cycle

        # Phase 2: Calculate cycle length
        # Both pointers are at the meeting point inside the cycle.
        # Move one pointer and count until it meets the other again.
        count = 0
        current = slow # Start from the meeting point
        while True:
            current = current.next
            count += 1
            if current == slow:
                break
        
        return count