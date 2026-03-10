import { ListNode } from '@data-structures/ListNode';
import { arrayToLinkedList, linkedListToArray, printLinkedList, createCycleList, getNodeAtIndex } from '@utils/listUtils';

// Problem 1: Reverse Linked List
import { reverseLinkedListIterative, reverseLinkedListRecursive } from '@problems/reverseLinkedList';

// Problem 2: Merge Two Sorted Lists
import { mergeTwoSortedListsIterative, mergeTwoSortedListsRecursive } from '@problems/mergeTwoSortedLists';

// Problem 3: Detect Cycle in Linked List
import { detectCycleFloyd, detectCycleHashSet } from '@problems/detectCycle';

// Problem 4: Remove Nth Node From End of List
import { removeNthFromEndOnePass, removeNthFromEndTwoPass } from '@problems/removeNthFromEnd';

function runProblem1Examples(): void {
    console.log("\n--- Problem 1: Reverse Linked List ---");

    const list1 = arrayToLinkedList([1, 2, 3, 4, 5]);
    printLinkedList(list1, "Original List 1");
    const reversedList1Iterative = reverseLinkedListIterative(list1);
    printLinkedList(reversedList1Iterative, "Reversed List 1 (Iterative)");

    const list2 = arrayToLinkedList([1, 2]);
    printLinkedList(list2, "Original List 2");
    const reversedList2Recursive = reverseLinkedListRecursive(list2);
    printLinkedList(reversedList2Recursive, "Reversed List 2 (Recursive)");

    const list3 = arrayToLinkedList([]);
    printLinkedList(list3, "Original List 3");
    const reversedList3 = reverseLinkedListIterative(list3);
    printLinkedList(reversedList3, "Reversed List 3 (Iterative)");
}

function runProblem2Examples(): void {
    console.log("\n--- Problem 2: Merge Two Sorted Lists ---");

    const list1_1 = arrayToLinkedList([1, 2, 4]);
    const list1_2 = arrayToLinkedList([1, 3, 4]);
    printLinkedList(list1_1, "List 1 (A)");
    printLinkedList(list1_2, "List 2 (A)");
    const mergedListA = mergeTwoSortedListsIterative(list1_1, list1_2);
    printLinkedList(mergedListA, "Merged List (Iterative)");

    const list2_1 = arrayToLinkedList([5]);
    const list2_2 = arrayToLinkedList([1, 2, 3]);
    printLinkedList(list2_1, "List 1 (B)");
    printLinkedList(list2_2, "List 2 (B)");
    const mergedListB = mergeTwoSortedListsRecursive(list2_1, list2_2);
    printLinkedList(mergedListB, "Merged List (Recursive)");

    const list3_1 = arrayToLinkedList([]);
    const list3_2 = arrayToLinkedList([0]);
    printLinkedList(list3_1, "List 1 (C)");
    printLinkedList(list3_2, "List 2 (C)");
    const mergedListC = mergeTwoSortedListsIterative(list3_1, list3_2);
    printLinkedList(mergedListC, "Merged List (Iterative)");
}

function runProblem3Examples(): void {
    console.log("\n--- Problem 3: Detect Cycle in Linked List ---");

    // Example 1: Cycle at pos 1
    const list1 = createCycleList([3, 2, 0, -4], 1);
    console.log("List 1: [3 -> 2 -> 0 -> -4] (tail connects to 2)");
    const cycleStart1_floyd = detectCycleFloyd(list1);
    console.log(`Cycle Start (Floyd): ${cycleStart1_floyd ? cycleStart1_floyd.val : "null"}`); // Expected: 2
    const cycleStart1_hashset = detectCycleHashSet(list1);
    console.log(`Cycle Start (HashSet): ${cycleStart1_hashset ? cycleStart1_hashset.val : "null"}`); // Expected: 2

    // Example 2: Cycle at pos 0
    const list2 = createCycleList([1, 2], 0);
    console.log("List 2: [1 -> 2] (tail connects to 1)");
    const cycleStart2_floyd = detectCycleFloyd(list2);
    console.log(`Cycle Start (Floyd): ${cycleStart2_floyd ? cycleStart2_floyd.val : "null"}`); // Expected: 1
    const cycleStart2_hashset = detectCycleHashSet(list2);
    console.log(`Cycle Start (HashSet): ${cycleStart2_hashset ? cycleStart2_hashset.val : "null"}`); // Expected: 1

    // Example 3: No cycle
    const list3 = arrayToLinkedList([1]);
    printLinkedList(list3, "List 3");
    const cycleStart3_floyd = detectCycleFloyd(list3);
    console.log(`Cycle Start (Floyd): ${cycleStart3_floyd ? cycleStart3_floyd.val : "null"}`); // Expected: null
    const cycleStart3_hashset = detectCycleHashSet(list3);
    console.log(`Cycle Start (HashSet): ${cycleStart3_hashset ? cycleStart3_hashset.val : "null"}`); // Expected: null

    // Example 4: No cycle, longer list
    const list4 = arrayToLinkedList([1, 2, 3, 4, 5]);
    printLinkedList(list4, "List 4");
    const cycleStart4_floyd = detectCycleFloyd(list4);
    console.log(`Cycle Start (Floyd): ${cycleStart4_floyd ? cycleStart4_floyd.val : "null"}`); // Expected: null
    const cycleStart4_hashset = detectCycleHashSet(list4);
    console.log(`Cycle Start (HashSet): ${cycleStart4_hashset ? cycleStart4_hashset.val : "null"}`); // Expected: null
}

function runProblem4Examples(): void {
    console.log("\n--- Problem 4: Remove Nth Node From End of List ---");

    // Example 1: Remove 2nd from end
    const list1 = arrayToLinkedList([1, 2, 3, 4, 5]);
    printLinkedList(list1, "Original List 1");
    const modifiedList1_onePass = removeNthFromEndOnePass(list1, 2);
    printLinkedList(modifiedList1_onePass, "Modified List 1 (One-Pass, n=2)"); // Expected: [1,2,3,5]

    // Example 2: Remove 1st from end (single node list)
    const list2 = arrayToLinkedList([1]);
    printLinkedList(list2, "Original List 2");
    const modifiedList2_twoPass = removeNthFromEndTwoPass(list2, 1);
    printLinkedList(modifiedList2_twoPass, "Modified List 2 (Two-Pass, n=1)"); // Expected: []

    // Example 3: Remove 1st from end
    const list3 = arrayToLinkedList([1, 2]);
    printLinkedList(list3, "Original List 3");
    const modifiedList3_onePass = removeNthFromEndOnePass(list3, 1);
    printLinkedList(modifiedList3_onePass, "Modified List 3 (One-Pass, n=1)"); // Expected: [1]

    // Example 4: Remove head (e.g., n=2 from [1,2])
    const list4 = arrayToLinkedList([1, 2]);
    printLinkedList(list4, "Original List 4");
    const modifiedList4_twoPass = removeNthFromEndTwoPass(list4, 2);
    printLinkedList(modifiedList4_twoPass, "Modified List 4 (Two-Pass, n=2)"); // Expected: [2]
}

// Run all examples
runProblem1Examples();
runProblem2Examples();
runProblem3Examples();
runProblem4Examples();