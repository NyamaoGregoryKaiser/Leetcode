```javascript
/**
 * @fileoverview Test suite for Problem 2: Implement Queue using Stacks.
 * Uses Node.js's built-in `node:test` module.
 */

import { test, assert } from 'node:test';
import {
    MyQueueOptimal,
    MyQueueEagerTransfer
} from '../src/problems/problem2_implement_queue_using_stacks.js';

// Helper function to run a sequence of operations and check results
function runQueueOperations(QueueClass, operations, expectedOutputs, testName) {
    const myQueue = new QueueClass();
    const actualOutputs = [];

    operations.forEach(([op, arg]) => {
        if (op === 'push') {
            myQueue.push(arg);
            actualOutputs.push(null); // Push operation doesn't return a value to check
        } else if (op === 'pop') {
            actualOutputs.push(myQueue.pop());
        } else if (op === 'peek') {
            actualOutputs.push(myQueue.peek());
        } else if (op === 'empty') {
            actualOutputs.push(myQueue.empty());
        }
    });

    assert.deepStrictEqual(actualOutputs, expectedOutputs, testName);
}

test('Problem 2: Implement Queue using Stacks - MyQueueOptimal', (t) => {
    // Test Case 1: Basic operations
    runQueueOperations(
        MyQueueOptimal,
        [['push', 1], ['push', 2], ['peek', null], ['pop', null], ['empty', null]],
        [null, null, 1, 1, false],
        "Test Case 1: Basic operations"
    );

    // Test Case 2: Empty queue after operations
    runQueueOperations(
        MyQueueOptimal,
        [['push', 1], ['pop', null], ['empty', null]],
        [null, 1, true],
        "Test Case 2: Empty queue after operations"
    );

    // Test Case 3: Multiple pushes, pops, peeks
    runQueueOperations(
        MyQueueOptimal,
        [['push', 1], ['push', 2], ['push', 3], ['peek', null], ['pop', null], ['peek', null], ['pop', null], ['empty', null], ['pop', null], ['empty', null]],
        [null, null, null, 1, 1, 2, 2, false, 3, true],
        "Test Case 3: Multiple operations"
    );

    // Test Case 4: Alternating push/pop
    runQueueOperations(
        MyQueueOptimal,
        [['push', 1], ['pop', null], ['push', 2], ['push', 3], ['pop', null], ['peek', null], ['push', 4], ['pop', null], ['empty', null]],
        [null, 1, null, null, 2, 3, null, 3, false],
        "Test Case 4: Alternating push/pop"
    );

    // Test Case 5: Many pushes, then many pops
    runQueueOperations(
        MyQueueOptimal,
        [['push', 1], ['push', 2], ['push', 3], ['push', 4], ['push', 5], ['pop', null], ['pop', null], ['pop', null], ['pop', null], ['pop', null], ['empty', null]],
        [null, null, null, null, null, 1, 2, 3, 4, 5, true],
        "Test Case 5: Many pushes, then many pops"
    );
});

test('Problem 2: Implement Queue using Stacks - MyQueueEagerTransfer', (t) => {
    // Test Case 1: Basic operations
    runQueueOperations(
        MyQueueEagerTransfer,
        [['push', 1], ['push', 2], ['peek', null], ['pop', null], ['empty', null]],
        [null, null, 1, 1, false],
        "Test Case 1: Basic operations"
    );

    // Test Case 2: Empty queue after operations
    runQueueOperations(
        MyQueueEagerTransfer,
        [['push', 1], ['pop', null], ['empty', null]],
        [null, 1, true],
        "Test Case 2: Empty queue after operations"
    );

    // Test Case 3: Multiple pushes, pops, peeks
    runQueueOperations(
        MyQueueEagerTransfer,
        [['push', 1], ['push', 2], ['push', 3], ['peek', null], ['pop', null], ['peek', null], ['pop', null], ['empty', null], ['pop', null], ['empty', null]],
        [null, null, null, 1, 1, 2, 2, false, 3, true],
        "Test Case 3: Multiple operations"
    );

    // Test Case 4: Alternating push/pop
    runQueueOperations(
        MyQueueEagerTransfer,
        [['push', 1], ['pop', null], ['push', 2], ['push', 3], ['pop', null], ['peek', null], ['push', 4], ['pop', null], ['empty', null]],
        [null, 1, null, null, 2, 3, null, 3, false],
        "Test Case 4: Alternating push/pop"
    );

    // Test Case 5: Many pushes, then many pops
    runQueueOperations(
        MyQueueEagerTransfer,
        [['push', 1], ['push', 2], ['push', 3], ['push', 4], ['push', 5], ['pop', null], ['pop', null], ['pop', null], ['pop', null], ['pop', null], ['empty', null]],
        [null, null, null, null, null, 1, 2, 3, 4, 5, true],
        "Test Case 5: Many pushes, then many pops"
    );
});
```