```java
package com.example.linkedlist;

import java.util.HashSet;
import java.util.Set;
import java.util.Stack;

/**
 * This class contains implementations for various common Linked List problems.
 * Each problem provides optimal solutions, and where applicable, multiple approaches
 * (e.g., iterative vs. recursive), along with detailed comments and complexity analysis.
 */
public class LinkedListProblems {

    /*
     * ==============================================================================
     * Problem 1: Reverse Linked List
     * Given the head of a singly linked list, reverse the list, and return the reversed list.
     * ==============================================================================
     */

    /**
     * Approach 1.1: Iterative Solution for Reversing a Linked List.
     *
     * This method reverses a singly linked list iteratively. It traverses the list,
     * changing the `next` pointer of each node to point to its previous node.
     *
     * Logic:
     * We use three pointers:
     * - `prev`: Keeps track of the previously processed node. Initially null.
     * - `current`: The node currently being processed. Initially `head`.
     * - `nextTemp`: Temporarily stores the `next` node of `current` before `current.next` is changed.
     *
     * In each iteration:
     * 1. Store `current.next` in `nextTemp`.
     * 2. Change `current.next` to `prev`. This reverses the link.
     * 3. Move `prev` to `current` (the node just processed).
     * 4. Move `current` to `nextTemp` (the next node to process).
     *
     * The loop continues until `current` becomes null, at which point `prev` will be
     * pointing to the new head of the reversed list.
     *
     * Time Complexity: O(N), where N is the number of nodes in the linked list.
     *                  We traverse the list once.
     * Space Complexity: O(1) auxiliary space, as we only use a few extra pointers.
     *
     * @param head The head of the linked list to be reversed.
     * @return The head of the reversed linked list.
     */
    public LinkedListNode reverseListIterative(LinkedListNode head) {
        LinkedListNode prev = null;       // Pointer to the previous node, initially null
        LinkedListNode current = head;    // Pointer to the current node, starts at head

        while (current != null) {
            LinkedListNode nextTemp = current.next; // Store next node before changing current.next
            current.next = prev;                   // Reverse the current node's pointer
            prev = current;                        // Move prev to current node
            current = nextTemp;                    // Move current to next node
        }
        return prev; // prev will be the new head of the reversed list
    }

    /**
     * Approach 1.2: Recursive Solution for Reversing a Linked List.
     *
     * This method reverses a singly linked list recursively. The base cases handle
     * an empty list or a single-node list. For a list with two or more nodes,
     * it recursively reverses the rest of the list and then adjusts the pointers.
     *
     * Logic:
     * 1. Base Case: If `head` is null (empty list) or `head.next` is null (single node list),
     *    the list is already reversed, so return `head`.
     * 2. Recursive Step:
     *    - Call `reverseListRecursive` on `head.next`. This call returns the new head
     *      of the reversed sublist (e.g., for `1->2->3->4`, it returns `4` after `2->3->4` is reversed to `4->3->2`).
     *    - Let `reversedHead` be the result of the recursive call. This is the new head of the entire reversed list.
     *    - Now, we need to append the current `head` to the end of the `reversedHead` sublist.
     *      The `head.next` node (which was originally `2` if current `head` is `1`) now points to `3`.
     *      After recursion, `head.next` (`2`) will have its `next` pointing to `null` initially (after `2->3->null` became `null<-2<-3`).
     *      We need to make the original `head.next` point to `head`.
     *      So, `head.next.next = head;` effectively links `2 -> 1`.
     *    - Finally, `head.next` must be set to `null` to ensure the original head becomes the tail of the new list.
     *
     * Time Complexity: O(N), where N is the number of nodes.
     *                  Each node is processed once.
     * Space Complexity: O(N) due to the recursion call stack. In the worst case (a long list),
     *                   this could lead to StackOverflowError for very large N.
     *
     * @param head The head of the linked list to be reversed.
     * @return The head of the reversed linked list.
     */
    public LinkedListNode reverseListRecursive(LinkedListNode head) {
        // Base case: empty list or single node list
        if (head == null || head.next == null) {
            return head;
        }

        // Recursively reverse the rest of the list
        // `reversedHead` will be the new head of the entire list (e.g., '4' in 1->2->3->4)
        LinkedListNode reversedHead = reverseListRecursive(head.next);

        // Adjust pointers:
        // `head.next` is the second node (e.g., '2'). Its `next` was null after being reversed.
        // We make it point back to the current `head` (e.g., 2 -> 1).
        head.next.next = head;

        // Set the current `head`'s next to null, as it will be the new tail.
        head.next = null;

        return reversedHead; // Return the new head of the fully reversed list
    }

    /*
     * ==============================================================================
     * Problem 2: Merge Two Sorted Lists
     * Given the heads of two sorted linked lists `list1` and `list2`,
     * merge the two lists in a one sorted list. The list should be made by splicing
     * together the nodes of the first two lists.
     * Return the head of the merged linked list.
     * ==============================================================================
     */

    /**
     * Approach 2.1: Iterative Solution for Merging Two Sorted Lists.
     *
     * This method merges two sorted linked lists into a single sorted linked list iteratively.
     * It uses a dummy head node to simplify the logic of appending to the merged list.
     *
     * Logic:
     * 1. Create a `dummyHead` node (e.g., with value 0 or any placeholder) and a `current` pointer
     *    initialized to `dummyHead`. This allows us to easily append nodes without special casing
     *    the first node.
     * 2. Iterate while both `list1` and `list2` are not null:
     *    - Compare the values of the current nodes in `list1` and `list2`.
     *    - Append the smaller node to `current.next`.
     *    - Move `current` to the newly appended node.
     *    - Advance the pointer of the list from which the node was taken.
     * 3. After the loop, one of the lists might still have remaining nodes (because the other became null).
     *    Append the entire remainder of the non-null list to `current.next`.
     * 4. Return `dummyHead.next`, which is the actual head of the merged list.
     *
     * Time Complexity: O(M + N), where M and N are the lengths of `list1` and `list2` respectively.
     *                  We iterate through both lists once.
     * Space Complexity: O(1) auxiliary space, as we only use a few extra pointers.
     *
     * @param list1 The head of the first sorted linked list.
     * @param list2 The head of the second sorted linked list.
     * @return The head of the merged sorted linked list.
     */
    public LinkedListNode mergeTwoListsIterative(LinkedListNode list1, LinkedListNode list2) {
        // Create a dummy node to simplify the merging process.
        // The actual head will be dummyHead.next.
        LinkedListNode dummyHead = new LinkedListNode(0);
        LinkedListNode current = dummyHead; // Pointer to the last node of the merged list

        // Iterate while both lists have nodes
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                current.next = list1;   // Append node from list1
                list1 = list1.next;     // Advance list1 pointer
            } else {
                current.next = list2;   // Append node from list2
                list2 = list2.next;     // Advance list2 pointer
            }
            current = current.next; // Move current to the newly appended node
        }

        // If one list is exhausted, append the remaining nodes of the other list
        if (list1 != null) {
            current.next = list1;
        } else if (list2 != null) {
            current.next = list2;
        }

        return dummyHead.next; // The merged list starts after the dummy node
    }

    /**
     * Approach 2.2: Recursive Solution for Merging Two Sorted Lists.
     *
     * This method merges two sorted linked lists recursively.
     *
     * Logic:
     * 1. Base Cases:
     *    - If `list1` is null, return `list2` (the remainder of list2).
     *    - If `list2` is null, return `list1` (the remainder of list1).
     * 2. Recursive Step:
     *    - Compare `list1.val` and `list2.val`.
     *    - If `list1.val` is smaller or equal:
     *      - Set `list1.next` to the result of merging `list1.next` and `list2`.
     *      - Return `list1` as the head of the merged sublist.
     *    - Else (`list2.val` is smaller):
     *      - Set `list2.next` to the result of merging `list1` and `list2.next`.
     *      - Return `list2` as the head of the merged sublist.
     *
     * Time Complexity: O(M + N), where M and N are the lengths of `list1` and `list2`.
     *                  Each comparison and pointer adjustment processes one node, and we visit all nodes.
     * Space Complexity: O(M + N) due to the recursion call stack. In the worst case (e.g., one list much longer),
     *                   the stack depth can be M+N.
     *
     * @param list1 The head of the first sorted linked list.
     * @param list2 The head of the second sorted linked list.
     * @return The head of the merged sorted linked list.
     */
    public LinkedListNode mergeTwoListsRecursive(LinkedListNode list1, LinkedListNode list2) {
        // Base cases
        if (list1 == null) {
            return list2;
        }
        if (list2 == null) {
            return list1;
        }

        // Recursive step
        if (list1.val <= list2.val) {
            // If list1's current node is smaller, it becomes the head of the merged list
            // Recursively merge the rest of list1 with list2
            list1.next = mergeTwoListsRecursive(list1.next, list2);
            return list1;
        } else {
            // If list2's current node is smaller, it becomes the head of the merged list
            // Recursively merge list1 with the rest of list2
            list2.next = mergeTwoListsRecursive(list1, list2.next);
            return list2;
        }
    }

    /*
     * ==============================================================================
     * Problem 3: Detect Cycle and Find Cycle Start
     * Given the head of a linked list, return the node where the cycle begins.
     * If there is no cycle, return null.
     *
     * There is a cycle in a linked list if there is some node in the list
     * that can be reached again by continuously following the `next` pointer.
     * ==============================================================================
     */

    /**
     * Approach 3.1: Using a HashSet to Detect Cycle and Find Cycle Start.
     *
     * This method traverses the linked list, storing each visited node in a `HashSet`.
     * If it encounters a node that is already in the set, it means a cycle is detected,
     * and that node is the start of the cycle.
     *
     * Logic:
     * 1. Initialize an empty `HashSet` to store visited nodes.
     * 2. Iterate through the linked list starting from `head`.
     * 3. In each step:
     *    - If `current` is null, it means we reached the end of the list without finding a cycle. Return null.
     *    - Try to add `current` to the `HashSet`.
     *    - If `add()` returns `false`, it means `current` was already in the set. This is the cycle start. Return `current`.
     *    - Otherwise, move to the next node: `current = current.next`.
     *
     * Time Complexity: O(N), where N is the number of nodes in the linked list.
     *                  In the worst case (no cycle or cycle at the very end), we visit each node once.
     *                  HashSet operations (add, contains) take O(1) on average.
     * Space Complexity: O(N), as in the worst case (no cycle), we store all N nodes in the hash set.
     *
     * @param head The head of the linked list.
     * @return The node where the cycle begins, or null if there is no cycle.
     */
    public LinkedListNode detectCycleAndFindStartUsingHashSet(LinkedListNode head) {
        Set<LinkedListNode> visitedNodes = new HashSet<>();
        LinkedListNode current = head;

        while (current != null) {
            // If we've seen this node before, it's the start of the cycle
            if (visitedNodes.contains(current)) {
                return current;
            }
            // Otherwise, add it to the set and move to the next node
            visitedNodes.add(current);
            current = current.next;
        }

        return null; // No cycle found
    }

    /**
     * Approach 3.2: Floyd's Tortoise and Hare Algorithm (Fast and Slow Pointers).
     *
     * This is an optimized approach that uses two pointers, a "slow" pointer and a "fast" pointer.
     * The slow pointer moves one step at a time, while the fast pointer moves two steps at a time.
     *
     * Logic:
     * Phase 1: Detect Cycle
     * 1. Initialize `slow` and `fast` pointers to `head`.
     * 2. Move `slow` one step and `fast` two steps until they meet or `fast` reaches null.
     *    - If `fast` or `fast.next` becomes null, there is no cycle. Return null.
     *    - If `slow` and `fast` meet, a cycle is detected.
     *
     * Phase 2: Find Cycle Start
     * 1. Once `slow` and `fast` meet, reset one of the pointers (e.g., `slow`) back to `head`.
     * 2. Now, move both `slow` and `fast` one step at a time.
     * 3. The point where they meet again is the start of the cycle.
     *
     * Mathematical Proof for Phase 2:
     * Let `L` be the length of the list before the cycle starts, `C` be the length of the cycle.
     * When `slow` and `fast` meet:
     * - `slow` has traveled `x` steps.
     * - `fast` has traveled `2x` steps.
     * - The difference `2x - x = x` must be a multiple of `C` (i.e., `x = k * C` for some integer `k`).
     * The meeting point is `L + offset` steps from the head (where `offset` is some distance into the cycle).
     *
     * Now, reset `slow` to `head`. `slow` needs to travel `L` steps to reach the cycle start.
     * `fast` is at `L + offset` (modulo C) within the cycle.
     * If `slow` moves `L` steps, it reaches the cycle start.
     * At the same time, `fast` also moves `L` steps from its meeting point.
     * The distance `(L + offset) + L` within the cycle will bring `fast` to the start of the cycle.
     * Why? `L + offset` is `(k*C + offset)`. If `fast` moves another `L` steps, it is at `(k*C + offset + L)`.
     * Since `L` steps from head reaches cycle start, `fast` (from the meeting point) will also reach `L` steps from its current position inside the cycle, effectively meeting `slow` at cycle start.
     *
     * Time Complexity: O(N), where N is the number of nodes in the linked list.
     *                  Both pointers traverse the list at most twice.
     * Space Complexity: O(1) auxiliary space, as we only use a few extra pointers. This is better than HashSet.
     *
     * @param head The head of the linked list.
     * @return The node where the cycle begins, or null if there is no cycle.
     */
    public LinkedListNode detectCycleAndFindStartFloyd(LinkedListNode head) {
        if (head == null || head.next == null) {
            return null; // No cycle possible with 0 or 1 node
        }

        LinkedListNode slow = head;
        LinkedListNode fast = head;

        // Phase 1: Detect if a cycle exists
        // Fast pointer moves twice as fast as slow. If they meet, a cycle exists.
        while (fast != null && fast.next != null) {
            slow = slow.next;         // Slow moves one step
            fast = fast.next.next;    // Fast moves two steps

            if (slow == fast) {
                // Cycle detected, proceed to Phase 2 to find the start node
                break;
            }
        }

        // If fast (or fast.next) is null, it means we reached the end of the list, no cycle
        if (fast == null || fast.next == null) {
            return null;
        }

        // Phase 2: Find the starting node of the cycle
        // Reset one pointer (e.g., slow) to the head.
        // Move both slow and fast one step at a time.
        // They will meet at the cycle's starting node.
        LinkedListNode pointer1 = head;
        LinkedListNode pointer2 = slow; // slow is currently at the meeting point from Phase 1

        while (pointer1 != pointer2) {
            pointer1 = pointer1.next;
            pointer2 = pointer2.next;
        }

        return pointer1; // They meet at the cycle start
    }

    /*
     * ==============================================================================
     * Problem 4: Remove Nth Node From End of List
     * Given the head of a linked list, remove the nth node from the end of the list
     * and return its head.
     *
     * Constraints: The number of nodes in the list is sz.
     *              1 <= sz <= 30
     *              0 <= Node.val <= 100
     *              1 <= n <= sz
     * ==============================================================================
     */

    /**
     * Approach 4.1: Two-Pass Solution for Removing Nth Node From End.
     *
     * This approach involves two passes through the linked list:
     * 1. First Pass: Calculate the total number of nodes (length of the list).
     * 2. Second Pass: Determine the position of the node to remove from the beginning,
     *    then traverse to the node just before it and adjust pointers to remove.
     *
     * Logic:
     * - Handle edge case: if `n` is equal to the total length, it means we need to remove
     *   the head node. In this case, simply return `head.next`.
     * - Otherwise, calculate the index of the node to remove from the beginning: `indexToDelete = length - n`.
     * - Traverse the list again, stopping at `indexToDelete - 1` (the node *before* the one to be removed).
     * - Update pointers: `prev.next = prev.next.next`.
     *
     * Time Complexity: O(N) because we traverse the list twice (once to count, once to find and remove).
     * Space Complexity: O(1) auxiliary space.
     *
     * @param head The head of the linked list.
     * @param n The position from the end of the list to remove.
     * @return The head of the modified linked list.
     */
    public LinkedListNode removeNthFromEndTwoPass(LinkedListNode head, int n) {
        if (head == null) {
            return null;
        }

        // First pass: Calculate the length of the list
        int length = 0;
        LinkedListNode current = head;
        while (current != null) {
            length++;
            current = current.next;
        }

        // If n is equal to the length, it means we need to remove the head node
        if (n == length) {
            return head.next;
        }

        // Calculate the position of the node to remove from the beginning (0-indexed)
        int indexToDeleteFromStart = length - n;

        // Second pass: Traverse to the node *before* the one to be removed
        current = head;
        for (int i = 0; i < indexToDeleteFromStart - 1; i++) {
            current = current.next;
        }

        // current is now the node before the one to be removed.
        // Skip the next node (the one to be removed).
        current.next = current.next.next;

        return head;
    }

    /**
     * Approach 4.2: One-Pass Solution using Two Pointers (Fast and Slow).
     *
     * This is an optimized approach that uses two pointers, `fast` and `slow`,
     * to solve the problem in a single pass.
     *
     * Logic:
     * 1. Create a `dummyHead` node pointing to the original `head`. This simplifies
     *    handling the edge case where the head node itself needs to be removed.
     *    Initialize `fast` and `slow` pointers to `dummyHead`.
     * 2. Move `fast` pointer `n+1` steps ahead. This creates a gap of `n` nodes
     *    between `slow` and `fast`. The `+1` is crucial because `slow` will stop
     *    *before* the node to be removed (at the node whose `next` pointer needs to be updated).
     * 3. Move both `fast` and `slow` pointers one step at a time until `fast` reaches the end of the list (becomes null).
     * 4. When `fast` reaches null, `slow` will be pointing to the node just before the
     *    `nth` node from the end.
     * 5. Remove the `nth` node: `slow.next = slow.next.next`.
     * 6. Return `dummyHead.next` as the new head of the list.
     *
     * Time Complexity: O(N), as we traverse the list once.
     * Space Complexity: O(1) auxiliary space.
     *
     * @param head The head of the linked list.
     * @param n The position from the end of the list to remove.
     * @return The head of the modified linked list.
     */
    public LinkedListNode removeNthFromEndOnePass(LinkedListNode head, int n) {
        // Create a dummy node to handle edge cases, especially removing the head node.
        // dummy.next points to the actual head.
        LinkedListNode dummyHead = new LinkedListNode(0);
        dummyHead.next = head;

        LinkedListNode fast = dummyHead; // Fast pointer
        LinkedListNode slow = dummyHead; // Slow pointer

        // Move fast pointer n+1 steps ahead.
        // This ensures a gap of n nodes between slow and fast.
        // When fast reaches the end, slow will be at the node *before* the one to be removed.
        for (int i = 0; i < n + 1; i++) {
            // This loop assumes n is valid (1 <= n <= sz).
            // No need to check for null 'fast' here because dummyHead ensures it's not null initially,
            // and n <= sz ensures fast won't go out of bounds before the main loop starts
            // (or if it does, it's a valid condition for removal).
            fast = fast.next;
        }

        // Move both fast and slow pointers one step at a time
        // until fast reaches the end of the list (becomes null).
        while (fast != null) {
            slow = slow.next;
            fast = fast.next;
        }

        // At this point, slow is pointing to the node immediately preceding
        // the node to be removed.
        // Skip the nth node from the end.
        slow.next = slow.next.next;

        return dummyHead.next; // Return the new head of the list
    }

    /*
     * ==============================================================================
     * Problem 5: Palindrome Linked List
     * Given the head of a singly linked list, return true if it is a palindrome or false otherwise.
     * ==============================================================================
     */

    /**
     * Approach 5.1: Using a Stack to Check Palindrome (O(N) space).
     *
     * This method uses a stack to store the values of the first half of the linked list.
     * Then, it compares the values in the second half with the values popped from the stack.
     *
     * Logic:
     * 1. Traverse the list using two pointers, `slow` and `fast`. `fast` moves twice as fast as `slow`.
     *    Simultaneously, push `slow`'s value onto a stack.
     * 2. When `fast` reaches the end, `slow` will be at the middle of the list.
     * 3. If the list has an odd number of nodes, `slow` will be exactly at the middle node,
     *    which doesn't need to be compared. So, advance `slow` one more step (`slow = slow.next`).
     * 4. Now, `slow` is at the beginning of the second half. Traverse from `slow` to the end,
     *    comparing each node's value with the value popped from the stack.
     * 5. If any comparison fails, return `false`. If all comparisons pass, return `true`.
     *
     * Time Complexity: O(N), where N is the number of nodes. We traverse the list twice effectively.
     * Space Complexity: O(N/2) = O(N) due to storing half of the nodes in the stack.
     *
     * @param head The head of the linked list.
     * @return True if the list is a palindrome, false otherwise.
     */
    public boolean isPalindromeUsingStack(LinkedListNode head) {
        if (head == null || head.next == null) {
            return true; // An empty list or single-node list is a palindrome
        }

        Stack<Integer> stack = new Stack<>();
        LinkedListNode slow = head;
        LinkedListNode fast = head;

        // Traverse with slow and fast pointers, pushing slow's value to stack
        while (fast != null && fast.next != null) {
            stack.push(slow.val);
            slow = slow.next;
            fast = fast.next.next;
        }

        // If fast is not null, it means the list has an odd number of nodes.
        // Move slow one step further to skip the middle element.
        if (fast != null) { // odd number of nodes
            slow = slow.next;
        }

        // Compare the second half of the list with elements popped from the stack
        while (slow != null) {
            if (stack.isEmpty() || stack.pop() != slow.val) {
                return false;
            }
            slow = slow.next;
        }

        return true;
    }

    /**
     * Approach 5.2: Reversing the Second Half (O(1) space).
     *
     * This is an optimized approach that achieves O(1) space complexity by reversing
     * the second half of the linked list.
     *
     * Logic:
     * 1. Find the middle of the linked list using slow and fast pointers.
     * 2. Split the list into two halves: the first half (from head to `slow` before reversal)
     *    and the second half (from `slow` after `fast` reaches end)
     * 3. Reverse the second half of the list.
     * 4. Compare the first half with the (now reversed) second half element by element.
     * 5. (Optional but good practice) Revert the changes to restore the original list structure.
     *
     * Time Complexity: O(N), where N is the number of nodes.
     *                  1. Finding middle: O(N/2)
     *                  2. Reversing second half: O(N/2)
     *                  3. Comparing halves: O(N/2)
     *                  Total: O(N).
     * Space Complexity: O(1) auxiliary space, as we only use a few extra pointers.
     *
     * @param head The head of the linked list.
     * @return True if the list is a palindrome, false otherwise.
     */
    public boolean isPalindromeOptimal(LinkedListNode head) {
        if (head == null || head.next == null) {
            return true;
        }

        // Step 1: Find the middle of the linked list
        LinkedListNode slow = head;
        LinkedListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        // At this point, slow is at the middle (or first node of the second half for even length lists)
        // For odd length lists, fast is not null, slow is exactly the middle node.
        // For even length lists, fast is null, slow is the first node of the second half.

        // Step 2: Reverse the second half of the list
        // `secondHalfHead` will be the head of the reversed second half
        LinkedListNode secondHalfHead = reverseListIterative(slow); // Reuses the reverse function

        // Store original second half head to restore later
        LinkedListNode originalSecondHalfHead = secondHalfHead;

        // Step 3: Compare the first half with the reversed second half
        LinkedListNode firstHalfCurrent = head;
        LinkedListNode secondHalfCurrent = secondHalfHead;
        boolean isPalindrome = true; // Assume true until mismatch found

        while (secondHalfCurrent != null) { // Iterate until the end of the shorter (reversed) second half
            if (firstHalfCurrent.val != secondHalfCurrent.val) {
                isPalindrome = false;
                break;
            }
            firstHalfCurrent = firstHalfCurrent.next;
            secondHalfCurrent = secondHalfCurrent.next;
        }

        // Step 4 (Optional but good practice): Restore the original list structure
        // Reverse the second half again to revert it to its original order.
        // This is important if the caller expects the list to remain unchanged.
        reverseListIterative(originalSecondHalfHead); // Reversing the reversed part restores it.
                                                     // The head of the restored part will be `slow` again.

        return isPalindrome;
    }
}
```