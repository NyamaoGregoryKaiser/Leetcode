```javascript
/**
 * @fileoverview Test cases for Problem 3: Detect Linked List Cycle.
 */

const { LinkedList } = require('../src/data-structures/LinkedList');
const { hasCycle, detectCycle } = require('../src/problems/Problem3_DetectCycle');

testSuite('Problem 3: Detect Linked List Cycle', () => {

    // --- Test hasCycle ---
    console.log("\nTesting hasCycle (Boolean Check)...");

    // Test Case 1: No cycle (empty list)
    let list = new LinkedList();
    assert(hasCycle(list.getHead()) === false, 'hasCycle - Test Case: Empty list - Expected: false, Got: true');

    // Test Case 2: No cycle (single node)
    list = new LinkedList();
    list.add(1);
    assert(hasCycle(list.getHead()) === false, 'hasCycle - Test Case: Single node, no cycle - Expected: false, Got: true');

    // Test Case 3: No cycle (multiple nodes)
    list = new LinkedList();
    list.add(1).add(2).add(3).add(4);
    assert(hasCycle(list.getHead()) === false, 'hasCycle - Test Case: Multiple nodes, no cycle - Expected: false, Got: true');

    // Test Case 4: Cycle exists (tail points to head)
    list = new LinkedList();
    list.add(1).add(2).add(3);
    const headCycleHead = list.hasCycle(0); // pos = 0 means tail points to head
    assert(hasCycle(headCycleHead) === true, 'hasCycle - Test Case: Tail points to head - Expected: true, Got: false');

    // Test Case 5: Cycle exists (tail points to middle)
    list = new LinkedList();
    list.add(1).add(2).add(3).add(4).add(5);
    const middleCycleHead = list.hasCycle(2); // pos = 2 (value 3)
    assert(hasCycle(middleCycleHead) === true, 'hasCycle - Test Case: Tail points to middle - Expected: true, Got: false');

    // Test Case 6: Cycle exists (tail points to itself, single node loop)
    list = new LinkedList();
    list.add(1);
    const selfLoopHead = list.hasCycle(0); // pos = 0
    assert(hasCycle(selfLoopHead) === true, 'hasCycle - Test Case: Single node, self loop - Expected: true, Got: false');

    // Test Case 7: Cycle exists (longer list, cycle in middle)
    list = new LinkedList();
    list.add(1).add(2).add(3).add(4).add(5).add(6).add(7).add(8);
    const longMiddleCycleHead = list.hasCycle(3); // pos = 3 (value 4)
    assert(hasCycle(longMiddleCycleHead) === true, 'hasCycle - Test Case: Longer list, cycle in middle - Expected: true, Got: false');


    // --- Test detectCycle (Find Cycle Start Node) ---
    console.log("\nTesting detectCycle (Find Cycle Start Node)...");

    // Test Case 1: No cycle (empty list)
    list = new LinkedList();
    assert(detectCycle(list.getHead()) === null, 'detectCycle - Test Case: Empty list - Expected: null, Got: non-null');

    // Test Case 2: No cycle (single node)
    list = new LinkedList();
    list.add(1);
    assert(detectCycle(list.getHead()) === null, 'detectCycle - Test Case: Single node, no cycle - Expected: null, Got: non-null');

    // Test Case 3: No cycle (multiple nodes)
    list = new LinkedList();
    list.add(1).add(2).add(3).add(4);
    assert(detectCycle(list.getHead()) === null, 'detectCycle - Test Case: Multiple nodes, no cycle - Expected: null, Got: non-null');

    // Test Case 4: Cycle exists (tail points to head - pos 0)
    list = new LinkedList();
    list.add(1).add(2).add(3);
    const headCycleList = new LinkedList(list.getHead()); // Deep copy to avoid modifying original list state for re-use
    const headCycleStart = headCycleList.hasCycle(0); // cycle starts at 1 (head)
    assert(detectCycle(headCycleStart) === headCycleList.getHead(), `detectCycle - Test Case: Tail points to head (1->2->3->1) - Expected: 1, Got: ${detectCycle(headCycleStart)?.val}`);

    // Test Case 5: Cycle exists (tail points to middle - pos 2)
    list = new LinkedList();
    list.add(1).add(2).add(3).add(4).add(5);
    const middleCycleList = new LinkedList(list.getHead());
    const middleCycleStart = middleCycleList.hasCycle(2); // cycle starts at 3 (index 2)
    // To get the node at index 2 without traversing the full list with cycle again
    let expectedNode = middleCycleList.getHead();
    for (let i = 0; i < 2; i++) {
        expectedNode = expectedNode.next;
    }
    assert(detectCycle(middleCycleStart) === expectedNode, `detectCycle - Test Case: Tail points to middle (1->2->3->4->5->3) - Expected: 3, Got: ${detectCycle(middleCycleStart)?.val}`);

    // Test Case 6: Cycle exists (single node, self loop - pos 0)
    list = new LinkedList();
    list.add(1);
    const selfLoopList = new LinkedList(list.getHead());
    const selfLoopStart = selfLoopList.hasCycle(0); // cycle starts at 1
    assert(detectCycle(selfLoopStart) === selfLoopList.getHead(), `detectCycle - Test Case: Single node, self loop (1->1) - Expected: 1, Got: ${detectCycle(selfLoopStart)?.val}`);

    // Test Case 7: Cycle exists (longer list, cycle in middle - pos 3)
    list = new LinkedList();
    list.add(1).add(2).add(3).add(4).add(5).add(6).add(7).add(8);
    const longListWithCycle = new LinkedList(list.getHead());
    const longCycleStart = longListWithCycle.hasCycle(3); // cycle starts at 4 (index 3)
    expectedNode = longListWithCycle.getHead();
    for (let i = 0; i < 3; i++) {
        expectedNode = expectedNode.next;
    }
    assert(detectCycle(longCycleStart) === expectedNode, `detectCycle - Test Case: Longer list, cycle in middle (1->...->8->4) - Expected: 4, Got: ${detectCycle(longCycleStart)?.val}`);

    // Test Case 8: List with only two nodes, cycle from last to first
    list = new LinkedList();
    list.add(1).add(2);
    const twoNodeCycle = new LinkedList(list.getHead());
    const twoNodeCycleStart = twoNodeCycle.hasCycle(0); // 2 points to 1
    assert(detectCycle(twoNodeCycleStart) === twoNodeCycle.getHead(), `detectCycle - Test Case: Two node list (1->2->1) - Expected: 1, Got: ${detectCycle(twoNodeCycleStart)?.val}`);

    // Test Case 9: List with only two nodes, cycle from last to itself
    list = new LinkedList();
    list.add(1).add(2);
    const twoNodeSelfLoop = new LinkedList(list.getHead());
    expectedNode = twoNodeSelfLoop.getHead().next; // Node with value 2
    const twoNodeSelfLoopStart = twoNodeSelfLoop.hasCycle(1); // 2 points to 2
    assert(detectCycle(twoNodeSelfLoopStart) === expectedNode, `detectCycle - Test Case: Two node list (1->2->2) - Expected: 2, Got: ${detectCycle(twoNodeSelfLoopStart)?.val}`);
});
```