```java
package com.example.linkedlist;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("LinkedListProblems Test Suite")
class LinkedListProblemsTest {

    private LinkedListProblems problems;

    @BeforeEach
    void setUp() {
        problems = new LinkedListProblems();
    }

    @Nested
    @DisplayName("Problem 1: Reverse Linked List")
    class ReverseLinkedListTests {

        private static Stream<Arguments> reverseListTestData() {
            return Stream.of(
                    // Test Case 1: Empty list
                    Arguments.of(null, null),
                    // Test Case 2: Single node list
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{1}), LinkedListUtils.createLinkedList(new int[]{1})),
                    // Test Case 3: Two node list
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{1, 2}), LinkedListUtils.createLinkedList(new int[]{2, 1})),
                    // Test Case 4: Multiple node list (even)
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4}), LinkedListUtils.createLinkedList(new int[]{4, 3, 2, 1})),
                    // Test Case 5: Multiple node list (odd)
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4, 5}), LinkedListUtils.createLinkedList(new int[]{5, 4, 3, 2, 1})),
                    // Test Case 6: List with duplicate values
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{1, 1, 2, 2}), LinkedListUtils.createLinkedList(new int[]{2, 2, 1, 1})),
                    // Test Case 7: Larger list
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{10, 20, 30, 40, 50, 60}), LinkedListUtils.createLinkedList(new int[]{60, 50, 40, 30, 20, 10}))
            );
        }

        @ParameterizedTest(name = "Iterative: Input: {0} -> Expected: {1}")
        @MethodSource("reverseListTestData")
        void testReverseListIterative(LinkedListNode head, LinkedListNode expected) {
            LinkedListNode actual = problems.reverseListIterative(head);
            assertTrue(LinkedListUtils.compareLinkedLists(expected, actual),
                    () -> "Iterative reverse failed. Expected: " + LinkedListUtils.toArrayList(expected) + ", Got: " + LinkedListUtils.toArrayList(actual));
        }

        @ParameterizedTest(name = "Recursive: Input: {0} -> Expected: {1}")
        @MethodSource("reverseListTestData")
        void testReverseListRecursive(LinkedListNode head, LinkedListNode expected) {
            // For recursive tests, we need to create a new head for each test case
            // because the recursive function modifies the list in place,
            // and the head provided for iterative might already be reversed/modified.
            LinkedListNode headForRecursive = (head == null) ? null : LinkedListUtils.createLinkedList(LinkedListUtils.toArrayList(head).stream().mapToInt(i->i).toArray());

            LinkedListNode actual = problems.reverseListRecursive(headForRecursive);
            assertTrue(LinkedListUtils.compareLinkedLists(expected, actual),
                    () -> "Recursive reverse failed. Expected: " + LinkedListUtils.toArrayList(expected) + ", Got: " + LinkedListUtils.toArrayList(actual));
        }
    }

    @Nested
    @DisplayName("Problem 2: Merge Two Sorted Lists")
    class MergeTwoSortedListsTests {

        private static Stream<Arguments> mergeListsTestData() {
            return Stream.of(
                    // Test Case 1: Both lists empty
                    Arguments.of(null, null, null),
                    // Test Case 2: One list empty, one non-empty
                    Arguments.of(null, LinkedListUtils.createLinkedList(new int[]{1, 2, 3}), LinkedListUtils.createLinkedList(new int[]{1, 2, 3})),
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{1, 2, 3}), null, LinkedListUtils.createLinkedList(new int[]{1, 2, 3})),
                    // Test Case 3: Standard merge
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{1, 3, 5}), LinkedListUtils.createLinkedList(new int[]{2, 4, 6}), LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4, 5, 6})),
                    // Test Case 4: Overlapping values
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{1, 2, 4}), LinkedListUtils.createLinkedList(new int[]{1, 3, 4}), LinkedListUtils.createLinkedList(new int[]{1, 1, 2, 3, 4, 4})),
                    // Test Case 5: One list ends much earlier
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{1, 2}), LinkedListUtils.createLinkedList(new int[]{3, 4, 5, 6}), LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4, 5, 6})),
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{3, 4, 5, 6}), LinkedListUtils.createLinkedList(new int[]{1, 2}), LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4, 5, 6})),
                    // Test Case 6: Duplicate values across lists
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{0, 0, 0}), LinkedListUtils.createLinkedList(new int[]{0, 0, 0}), LinkedListUtils.createLinkedList(new int[]{0, 0, 0, 0, 0, 0})),
                    // Test Case 7: Larger lists
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{1, 5, 9, 13, 17}), LinkedListUtils.createLinkedList(new int[]{2, 6, 10, 14, 18}), LinkedListUtils.createLinkedList(new int[]{1, 2, 5, 6, 9, 10, 13, 14, 17, 18}))
            );
        }

        @ParameterizedTest(name = "Iterative: List1: {0}, List2: {1} -> Expected: {2}")
        @MethodSource("mergeListsTestData")
        void testMergeTwoListsIterative(LinkedListNode list1, LinkedListNode list2, LinkedListNode expected) {
            LinkedListNode actual = problems.mergeTwoListsIterative(list1, list2);
            assertTrue(LinkedListUtils.compareLinkedLists(expected, actual),
                    () -> "Iterative merge failed. Expected: " + LinkedListUtils.toArrayList(expected) + ", Got: " + LinkedListUtils.toArrayList(actual));
        }

        @ParameterizedTest(name = "Recursive: List1: {0}, List2: {1} -> Expected: {2}")
        @MethodSource("mergeListsTestData")
        void testMergeTwoListsRecursive(LinkedListNode list1, LinkedListNode list2, LinkedListNode expected) {
            // Create new lists for recursive test to avoid interference if previous test modified them.
            LinkedListNode list1ForRecursive = (list1 == null) ? null : LinkedListUtils.createLinkedList(LinkedListUtils.toArrayList(list1).stream().mapToInt(i->i).toArray());
            LinkedListNode list2ForRecursive = (list2 == null) ? null : LinkedListUtils.createLinkedList(LinkedListUtils.toArrayList(list2).stream().mapToInt(i->i).toArray());

            LinkedListNode actual = problems.mergeTwoListsRecursive(list1ForRecursive, list2ForRecursive);
            assertTrue(LinkedListUtils.compareLinkedLists(expected, actual),
                    () -> "Recursive merge failed. Expected: " + LinkedListUtils.toArrayList(expected) + ", Got: " + LinkedListUtils.toArrayList(actual));
        }
    }

    @Nested
    @DisplayName("Problem 3: Detect Cycle and Find Cycle Start")
    class DetectCycleTests {

        @Test
        void testNoCycle() {
            LinkedListNode head = LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4, 5});
            assertNull(problems.detectCycleAndFindStartUsingHashSet(head));
            assertNull(problems.detectCycleAndFindStartFloyd(head));
        }

        @Test
        void testSingleNodeNoCycle() {
            LinkedListNode head = LinkedListUtils.createLinkedList(new int[]{1});
            assertNull(problems.detectCycleAndFindStartUsingHashSet(head));
            assertNull(problems.detectCycleAndFindStartFloyd(head));
        }

        @Test
        void testEmptyList() {
            assertNull(problems.detectCycleAndFindStartUsingHashSet(null));
            assertNull(problems.detectCycleAndFindStartFloyd(null));
        }

        @Test
        void testCycleAtHead() {
            LinkedListNode head = LinkedListUtils.createLinkedListWithCycle(new int[]{1, 2, 3}, 0); // 3 -> 1
            assertEquals(head, problems.detectCycleAndFindStartUsingHashSet(head));
            assertEquals(head, problems.detectCycleAndFindStartFloyd(head));
        }

        @Test
        void testCycleInMiddle() {
            LinkedListNode head = LinkedListUtils.createLinkedListWithCycle(new int[]{1, 2, 3, 4, 5}, 2); // 5 -> 3
            LinkedListNode cycleStart = head.next.next; // Node with value 3
            assertEquals(cycleStart, problems.detectCycleAndFindStartUsingHashSet(head));
            assertEquals(cycleStart, problems.detectCycleAndFindStartFloyd(head));
        }

        @Test
        void testCycleAtTailPointsToMiddle() {
            LinkedListNode head = LinkedListUtils.createLinkedListWithCycle(new int[]{1, 2, 3, 4, 5, 6}, 3); // 6 -> 4
            LinkedListNode cycleStart = head.next.next.next; // Node with value 4
            assertEquals(cycleStart, problems.detectCycleAndFindStartUsingHashSet(head));
            assertEquals(cycleStart, problems.detectCycleAndFindStartFloyd(head));
        }

        @Test
        void testCyclePointsToSecondNode() {
            LinkedListNode head = LinkedListUtils.createLinkedListWithCycle(new int[]{1, 2, 3, 4}, 1); // 4 -> 2
            LinkedListNode cycleStart = head.next; // Node with value 2
            assertEquals(cycleStart, problems.detectCycleAndFindStartUsingHashSet(head));
            assertEquals(cycleStart, problems.detectCycleAndFindStartFloyd(head));
        }

        @Test
        void testTwoNodesCycle() {
            LinkedListNode head = LinkedListUtils.createLinkedListWithCycle(new int[]{1, 2}, 0); // 2 -> 1
            LinkedListNode cycleStart = head; // Node with value 1
            assertEquals(cycleStart, problems.detectCycleAndFindStartUsingHashSet(head));
            assertEquals(cycleStart, problems.detectCycleAndFindStartFloyd(head));
        }
    }

    @Nested
    @DisplayName("Problem 4: Remove Nth Node From End of List")
    class RemoveNthFromEndTests {

        private static Stream<Arguments> removeNthFromEndTestData() {
            return Stream.of(
                    // Test Case 1: Remove the head (n = length)
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4, 5}), 5, LinkedListUtils.createLinkedList(new int[]{2, 3, 4, 5})),
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{1}), 1, null), // Single node, remove head
                    // Test Case 2: Remove a node from the middle
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4, 5}), 2, LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 5})),
                    // Test Case 3: Remove the last node (n = 1)
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4, 5}), 1, LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4})),
                    // Test Case 4: List with two nodes, remove first
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{1, 2}), 2, LinkedListUtils.createLinkedList(new int[]{2})),
                    // Test Case 5: List with two nodes, remove second
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{1, 2}), 1, LinkedListUtils.createLinkedList(new int[]{1})),
                    // Test Case 6: Larger list
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{10, 20, 30, 40, 50, 60}), 3, LinkedListUtils.createLinkedList(new int[]{10, 20, 30, 50, 60})),
                    // Test Case 7: Larger list, remove first
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{10, 20, 30, 40, 50, 60}), 6, LinkedListUtils.createLinkedList(new int[]{20, 30, 40, 50, 60}))
            );
        }

        @ParameterizedTest(name = "Two Pass: Input: {0}, n={1} -> Expected: {2}")
        @MethodSource("removeNthFromEndTestData")
        void testRemoveNthFromEndTwoPass(LinkedListNode head, int n, LinkedListNode expected) {
            // Make a deep copy of head for each test, as problem modifies list
            LinkedListNode headCopy = (head == null) ? null : LinkedListUtils.createLinkedList(LinkedListUtils.toArrayList(head).stream().mapToInt(i->i).toArray());
            LinkedListNode actual = problems.removeNthFromEndTwoPass(headCopy, n);
            assertTrue(LinkedListUtils.compareLinkedLists(expected, actual),
                    () -> "Two-pass removal failed. Expected: " + LinkedListUtils.toArrayList(expected) + ", Got: " + LinkedListUtils.toArrayList(actual));
        }

        @ParameterizedTest(name = "One Pass: Input: {0}, n={1} -> Expected: {2}")
        @MethodSource("removeNthFromEndTestData")
        void testRemoveNthFromEndOnePass(LinkedListNode head, int n, LinkedListNode expected) {
            // Make a deep copy of head for each test
            LinkedListNode headCopy = (head == null) ? null : LinkedListUtils.createLinkedList(LinkedListUtils.toArrayList(head).stream().mapToInt(i->i).toArray());
            LinkedListNode actual = problems.removeNthFromEndOnePass(headCopy, n);
            assertTrue(LinkedListUtils.compareLinkedLists(expected, actual),
                    () -> "One-pass removal failed. Expected: " + LinkedListUtils.toArrayList(expected) + ", Got: " + LinkedListUtils.toArrayList(actual));
        }

        @Test
        @DisplayName("Edge case: empty list should return null")
        void testRemoveNthFromEndEmptyList() {
            assertNull(problems.removeNthFromEndOnePass(null, 1));
            assertNull(problems.removeNthFromEndTwoPass(null, 1));
        }
    }

    @Nested
    @DisplayName("Problem 5: Palindrome Linked List")
    class PalindromeLinkedListTests {
        private static Stream<Arguments> palindromeTestData() {
            return Stream.of(
                    // Test Case 1: Empty list
                    Arguments.of(null, true),
                    // Test Case 2: Single node list
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{1}), true),
                    // Test Case 3: Two node palindrome
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{1, 1}), true),
                    // Test Case 4: Two node not palindrome
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{1, 2}), false),
                    // Test Case 5: Odd length palindrome
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{1, 2, 1}), true),
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 2, 1}), true),
                    // Test Case 6: Odd length not palindrome
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{1, 2, 3}), false),
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4, 5}), false),
                    // Test Case 7: Even length palindrome
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{1, 2, 2, 1}), true),
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 3, 2, 1}), true),
                    // Test Case 8: Even length not palindrome
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4}), false),
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 1}), false),
                    // Test Case 9: All same values (palindrome)
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{7, 7, 7, 7}), true),
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{7, 7, 7}), true),
                    // Test Case 10: Mixed values
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{1, 0, 0, 1}), true),
                    Arguments.of(LinkedListUtils.createLinkedList(new int[]{1, 0, 1, 0, 1}), true)
            );
        }

        @ParameterizedTest(name = "Using Stack: Input: {0} -> Expected: {1}")
        @MethodSource("palindromeTestData")
        void testIsPalindromeUsingStack(LinkedListNode head, boolean expected) {
            // Make a deep copy of head for each test. Stack solution does not modify the list.
            LinkedListNode headCopy = (head == null) ? null : LinkedListUtils.createLinkedList(LinkedListUtils.toArrayList(head).stream().mapToInt(i->i).toArray());
            boolean actual = problems.isPalindromeUsingStack(headCopy);
            assertEquals(expected, actual, "Stack solution failed for list: " + LinkedListUtils.toArrayList(head));
        }

        @ParameterizedTest(name = "Optimal (Reverse Half): Input: {0} -> Expected: {1}")
        @MethodSource("palindromeTestData")
        void testIsPalindromeOptimal(LinkedListNode head, boolean expected) {
            // Make a deep copy of head for each test. The optimal solution modifies and restores the list.
            LinkedListNode headCopy = (head == null) ? null : LinkedListUtils.createLinkedList(LinkedListUtils.toArrayList(head).stream().mapToInt(i->i).toArray());
            LinkedListNode originalHeadState = (head == null) ? null : LinkedListUtils.createLinkedList(LinkedListUtils.toArrayList(head).stream().mapToInt(i->i).toArray());

            boolean actual = problems.isPalindromeOptimal(headCopy);
            assertEquals(expected, actual, "Optimal solution failed for list: " + LinkedListUtils.toArrayList(head));

            // Verify that the list structure is restored
            assertTrue(LinkedListUtils.compareLinkedLists(originalHeadState, headCopy),
                    () -> "Optimal solution failed to restore original list state for: " + LinkedListUtils.toArrayList(originalHeadState) + ". Current state: " + LinkedListUtils.toArrayList(headCopy));
        }
    }
}
```