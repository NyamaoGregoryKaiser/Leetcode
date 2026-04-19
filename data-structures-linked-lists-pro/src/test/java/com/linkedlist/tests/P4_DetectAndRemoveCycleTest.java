```java
package com.linkedlist.tests;

import com.linkedlist.ListNode;
import com.linkedlist.LinkedListUtils;
import com.linkedlist.problems.P4_DetectAndRemoveCycle;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;

@DisplayName("P4: Detect and Remove Cycle Tests")
class P4_DetectAndRemoveCycleTest {

    private final P4_DetectAndRemoveCycle solver = new P4_DetectAndRemoveCycle();

    // Helper to verify that a list has no cycle and matches an expected array
    private void assertNoCycleAndEquals(ListNode head, int[] expectedArray, String message) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            assertNotEquals(slow, fast, "List should not have a cycle after removal: " + message);
        }
        assertTrue(LinkedListUtils.areEqual(LinkedListUtils.createLinkedList(expectedArray), head), message);
    }

    // --- Floyd's Tortoise and Hare Tests ---

    @Test
    @DisplayName("Floyd's: Should detect and remove cycle at an internal node")
    void testDetectAndRemoveCycleFloyds_InternalCycle() {
        int[] arr = {3, 2, 0, -4};
        int pos = 1; // Cycle at node 2 (value 2)
        ListNode head = LinkedListUtils.createListWithCycle(arr, pos);
        // head is 3 -> 2 -> 0 -> -4
        //              ^         |
        //              |_________|

        ListNode cycleStart = solver.detectAndRemoveCycleFloyds(head);
        assertNotNull(cycleStart, "Cycle should be detected.");
        assertEquals(2, cycleStart.val, "Cycle should start at node with value 2.");

        // After removal, list should be 3 -> 2 -> 0 -> -4 -> NULL
        assertNoCycleAndEquals(head, new int[]{3, 2, 0, -4}, "Cycle at internal node should be removed.");
    }

    @Test
    @DisplayName("Floyd's: Should detect and remove cycle at the head node")
    void testDetectAndRemoveCycleFloyds_CycleAtHead() {
        int[] arr = {1, 2};
        int pos = 0; // Cycle at node 1 (value 1)
        ListNode head = LinkedListUtils.createListWithCycle(arr, pos);
        // head is 1 -> 2
        //         ^    |
        //         |____|

        ListNode cycleStart = solver.detectAndRemoveCycleFloyds(head);
        assertNotNull(cycleStart, "Cycle should be detected.");
        assertEquals(1, cycleStart.val, "Cycle should start at node with value 1.");

        // After removal, list should be 1 -> 2 -> NULL
        assertNoCycleAndEquals(head, new int[]{1, 2}, "Cycle at head should be removed.");
    }

    @Test
    @DisplayName("Floyd's: Should detect and remove self-loop on a single node")
    void testDetectAndRemoveCycleFloyds_SingleNodeSelfLoop() {
        int[] arr = {1};
        int pos = 0; // Cycle at node 1 (value 1)
        ListNode head = LinkedListUtils.createListWithCycle(arr, pos);
        // head is 1
        //         ^
        //         |___|

        ListNode cycleStart = solver.detectAndRemoveCycleFloyds(head);
        assertNotNull(cycleStart, "Cycle should be detected for single node self-loop.");
        assertEquals(1, cycleStart.val, "Cycle should start at node with value 1.");

        // After removal, list should be 1 -> NULL
        assertNoCycleAndEquals(head, new int[]{1}, "Single node self-loop should be removed.");
    }

    @Test
    @DisplayName("Floyd's: Should return null for a list with no cycle")
    void testDetectAndRemoveCycleFloyds_NoCycle() {
        ListNode head = LinkedListUtils.createListWithCycle(new int[]{1, 2, 3, 4, 5}, -1);
        ListNode cycleStart = solver.detectAndRemoveCycleFloyds(head);
        assertNull(cycleStart, "No cycle should be detected.");

        // List should remain unchanged: 1 -> 2 -> 3 -> 4 -> 5 -> NULL
        assertNoCycleAndEquals(head, new int[]{1, 2, 3, 4, 5}, "List with no cycle should remain unchanged.");
    }

    @Test
    @DisplayName("Floyd's: Should return null for an empty list")
    void testDetectAndRemoveCycleFloyds_EmptyList() {
        ListNode head = LinkedListUtils.createListWithCycle(new int[]{}, -1);
        ListNode cycleStart = solver.detectAndRemoveCycleFloyds(head);
        assertNull(cycleStart, "Empty list should return null.");
    }

    @Test
    @DisplayName("Floyd's: Should return null for a single-node list with no cycle")
    void testDetectAndRemoveCycleFloyds_SingleNodeNoCycle() {
        ListNode head = LinkedListUtils.createListWithCycle(new int[]{1}, -1);
        ListNode cycleStart = solver.detectAndRemoveCycleFloyds(head);
        assertNull(cycleStart, "Single node list with no cycle should return null.");
        assertNoCycleAndEquals(head, new int[]{1}, "Single node list should remain unchanged.");
    }

    @Test
    @DisplayName("Floyd's: Should handle a long list with a cycle")
    void testDetectAndRemoveCycleFloyds_LongListCycle() {
        int[] arr = new int[100];
        for (int i = 0; i < 100; i++) arr[i] = i;
        int pos = 50; // Cycle at index 50
        ListNode head = LinkedListUtils.createListWithCycle(arr, pos);

        ListNode cycleStart = solver.detectAndRemoveCycleFloyds(head);
        assertNotNull(cycleStart);
        assertEquals(arr[pos], cycleStart.val); // Value at cycle start

        // Expected array after removal
        int[] expectedArr = Arrays.copyOf(arr, arr.length); // Full original list
        assertNoCycleAndEquals(head, expectedArr, "Long list with cycle should be handled.");
    }

    // --- HashSet Tests ---

    @Test
    @DisplayName("HashSet: Should detect and remove cycle at an internal node")
    void testDetectAndRemoveCycleHashSet_InternalCycle() {
        int[] arr = {3, 2, 0, -4};
        int pos = 1; // Cycle at node 2 (value 2)
        ListNode head = LinkedListUtils.createListWithCycle(arr, pos);

        ListNode cycleStart = solver.detectAndRemoveCycleHashSet(head);
        assertNotNull(cycleStart, "Cycle should be detected by HashSet.");
        assertEquals(2, cycleStart.val, "Cycle should start at node with value 2.");

        // After removal, list should be 3 -> 2 -> 0 -> -4 -> NULL
        assertNoCycleAndEquals(head, new int[]{3, 2, 0, -4}, "HashSet should remove internal cycle.");
    }

    @Test
    @DisplayName("HashSet: Should detect and remove cycle at the head node")
    void testDetectAndRemoveCycleHashSet_CycleAtHead() {
        int[] arr = {1, 2};
        int pos = 0; // Cycle at node 1 (value 1)
        ListNode head = LinkedListUtils.createListWithCycle(arr, pos);

        ListNode cycleStart = solver.detectAndRemoveCycleHashSet(head);
        assertNotNull(cycleStart, "Cycle should be detected by HashSet.");
        assertEquals(1, cycleStart.val, "Cycle should start at node with value 1.");

        // After removal, list should be 1 -> 2 -> NULL
        assertNoCycleAndEquals(head, new int[]{1, 2}, "HashSet should remove cycle at head.");
    }

    @Test
    @DisplayName("HashSet: Should detect and remove self-loop on a single node")
    void testDetectAndRemoveCycleHashSet_SingleNodeSelfLoop() {
        int[] arr = {1};
        int pos = 0; // Cycle at node 1 (value 1)
        ListNode head = LinkedListUtils.createListWithCycle(arr, pos);

        ListNode cycleStart = solver.detectAndRemoveCycleHashSet(head);
        assertNotNull(cycleStart, "Cycle should be detected by HashSet for single node self-loop.");
        assertEquals(1, cycleStart.val, "Cycle should start at node with value 1.");

        // After removal, list should be 1 -> NULL
        assertNoCycleAndEquals(head, new int[]{1}, "HashSet should remove single node self-loop.");
    }

    @Test
    @DisplayName("HashSet: Should return null for a list with no cycle")
    void testDetectAndRemoveCycleHashSet_NoCycle() {
        ListNode head = LinkedListUtils.createListWithCycle(new int[]{1, 2, 3, 4, 5}, -1);
        ListNode cycleStart = solver.detectAndRemoveCycleHashSet(head);
        assertNull(cycleStart, "HashSet should detect no cycle.");

        // List should remain unchanged: 1 -> 2 -> 3 -> 4 -> 5 -> NULL
        assertNoCycleAndEquals(head, new int[]{1, 2, 3, 4, 5}, "List with no cycle should remain unchanged.");
    }

    @Test
    @DisplayName("HashSet: Should return null for an empty list")
    void testDetectAndRemoveCycleHashSet_EmptyList() {
        ListNode head = LinkedListUtils.createListWithCycle(new int[]{}, -1);
        ListNode cycleStart = solver.detectAndRemoveCycleHashSet(head);
        assertNull(cycleStart, "Empty list should return null.");
    }

    @Test
    @DisplayName("HashSet: Should return null for a single-node list with no cycle")
    void testDetectAndRemoveCycleHashSet_SingleNodeNoCycle() {
        ListNode head = LinkedListUtils.createListWithCycle(new int[]{1}, -1);
        ListNode cycleStart = solver.detectAndRemoveCycleHashSet(head);
        assertNull(cycleStart, "Single node list with no cycle should return null.");
        assertNoCycleAndEquals(head, new int[]{1}, "Single node list should remain unchanged.");
    }

    @Test
    @DisplayName("HashSet: Should handle a long list with a cycle")
    void testDetectAndRemoveCycleHashSet_LongListCycle() {
        int[] arr = new int[100];
        for (int i = 0; i < 100; i++) arr[i] = i;
        int pos = 50; // Cycle at index 50
        ListNode head = LinkedListUtils.createListWithCycle(arr, pos);

        ListNode cycleStart = solver.detectAndRemoveCycleHashSet(head);
        assertNotNull(cycleStart);
        assertEquals(arr[pos], cycleStart.val); // Value at cycle start

        // Expected array after removal
        int[] expectedArr = Arrays.copyOf(arr, arr.length); // Full original list
        assertNoCycleAndEquals(head, expectedArr, "HashSet should handle long lists with cycle.");
    }
}
```