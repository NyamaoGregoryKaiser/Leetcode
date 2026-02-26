```javascript
/**
 * @fileoverview Test suite for Problem 5: Min Stack.
 * Uses Node.js's built-in `node:test` module.
 */

import { test, assert } from 'node:test';
import {
    MinStackOptimal,
    MinStackMemoryOptimized,
    MinStackDiffOptimized
} from '../src/problems/problem5_min_stack.js';

// Helper function to run a sequence of operations and check results
function runMinStackOperations(MinStackClass, operations, expectedOutputs, testName) {
    const minStack = new MinStackClass();
    const actualOutputs = [];

    operations.forEach(([op, arg]) => {
        if (op === 'push') {
            minStack.push(arg);
            actualOutputs.push(null); // Push operation doesn't return a value to check
        } else if (op === 'pop') {
            minStack.pop();
            actualOutputs.push(null); // Pop operation doesn't return a value to check in this context
        } else if (op === 'top') {
            actualOutputs.push(minStack.top());
        } else if (op === 'getMin') {
            actualOutputs.push(minStack.getMin());
        }
    });

    assert.deepStrictEqual(actualOutputs, expectedOutputs, testName);
}

test('Problem 5: Min Stack - MinStackOptimal', (t) => {
    // Test Case 1: Example from problem description
    runMinStackOperations(
        MinStackOptimal,
        [['push', -2], ['push', 0], ['push', -3], ['getMin', null], ['pop', null], ['top', null], ['getMin', null]],
        [null, null, null, -3, null, 0, -2],
        "Test Case 1: Basic example"
    );

    // Test Case 2: Monotonically increasing values
    runMinStackOperations(
        MinStackOptimal,
        [['push', 1], ['push', 2], ['getMin', null], ['push', 3], ['pop', null], ['getMin', null], ['top', null]],
        [null, null, 1, null, null, 1, 2],
        "Test Case 2: Monotonically increasing"
    );

    // Test Case 3: Monotonically decreasing values
    runMinStackOperations(
        MinStackOptimal,
        [['push', 5], ['push', 4], ['getMin', null], ['push', 3], ['pop', null], ['getMin', null], ['top', null]],
        [null, null, 4, null, null, 4, 4],
        "Test Case 3: Monotonically decreasing"
    );

    // Test Case 4: Values with duplicates and fluctuating minimum
    runMinStackOperations(
        MinStackOptimal,
        [['push', 2], ['push', 2], ['push', 1], ['getMin', null], ['pop', null], ['getMin', null], ['pop', null], ['getMin', null], ['pop', null], ['getMin', null]],
        [null, null, null, 1, null, 2, null, 2, null, undefined], // undefined for getMin after last pop (empty stack) is for my custom stack; LeetCode guarantees non-empty
        "Test Case 4: Duplicates and fluctuating min"
    );

    // Test Case 5: Single element
    runMinStackOperations(
        MinStackOptimal,
        [['push', 7], ['getMin', null], ['top', null], ['pop', null]],
        [null, 7, 7, null],
        "Test Case 5: Single element"
    );

    // Test Case 6: Larger values
    runMinStackOperations(
        MinStackOptimal,
        [['push', 100], ['push', 50], ['getMin', null], ['push', 75], ['getMin', null], ['pop', null], ['getMin', null], ['top', null]],
        [null, null, 50, null, 50, null, 50, 50],
        "Test Case 6: Larger values"
    );
});

test('Problem 5: Min Stack - MinStackMemoryOptimized', (t) => {
    // Test Case 1: Example from problem description
    runMinStackOperations(
        MinStackMemoryOptimized,
        [['push', -2], ['push', 0], ['push', -3], ['getMin', null], ['pop', null], ['top', null], ['getMin', null]],
        [null, null, null, -3, null, 0, -2],
        "Test Case 1: Basic example"
    );

    // Test Case 2: Monotonically increasing values
    runMinStackOperations(
        MinStackMemoryOptimized,
        [['push', 1], ['push', 2], ['getMin', null], ['push', 3], ['pop', null], ['getMin', null], ['top', null]],
        [null, null, 1, null, null, 1, 2],
        "Test Case 2: Monotonically increasing"
    );

    // Test Case 3: Monotonically decreasing values
    runMinStackOperations(
        MinStackMemoryOptimized,
        [['push', 5], ['push', 4], ['getMin', null], ['push', 3], ['pop', null], ['getMin', null], ['top', null]],
        [null, null, 4, null, null, 4, 4],
        "Test Case 3: Monotonically decreasing"
    );

    // Test Case 4: Values with duplicates and fluctuating minimum
    runMinStackOperations(
        MinStackMemoryOptimized,
        [['push', 2], ['push', 2], ['push', 1], ['getMin', null], ['pop', null], ['getMin', null], ['pop', null], ['getMin', null], ['pop', null], ['getMin', null]],
        [null, null, null, 1, null, 2, null, 2, null, undefined], // undefined for getMin after last pop (empty stack) is for my custom stack; LeetCode guarantees non-empty
        "Test Case 4: Duplicates and fluctuating min"
    );

    // Test Case 5: Single element
    runMinStackOperations(
        MinStackMemoryOptimized,
        [['push', 7], ['getMin', null], ['top', null], ['pop', null]],
        [null, 7, 7, null],
        "Test Case 5: Single element"
    );
});

test('Problem 5: Min Stack - MinStackDiffOptimized', (t) => {
    // Test Case 1: Example from problem description
    runMinStackOperations(
        MinStackDiffOptimized,
        [['push', -2], ['push', 0], ['push', -3], ['getMin', null], ['pop', null], ['top', null], ['getMin', null]],
        [null, null, null, -3, null, 0, -2],
        "Test Case 1: Basic example"
    );

    // Test Case 2: Monotonically increasing values
    runMinStackOperations(
        MinStackDiffOptimized,
        [['push', 1], ['push', 2], ['getMin', null], ['push', 3], ['pop', null], ['getMin', null], ['top', null]],
        [null, null, 1, null, null, 1, 2],
        "Test Case 2: Monotonically increasing"
    );

    // Test Case 3: Monotonically decreasing values
    runMinStackOperations(
        MinStackDiffOptimized,
        [['push', 5], ['push', 4], ['getMin', null], ['push', 3], ['pop', null], ['getMin', null], ['top', null]],
        [null, null, 4, null, null, 4, 4],
        "Test Case 3: Monotonically decreasing"
    );

    // Test Case 4: Values with duplicates and fluctuating minimum
    runMinStackOperations(
        MinStackDiffOptimized,
        [['push', 2], ['push', 2], ['push', 1], ['getMin', null], ['pop', null], ['getMin', null], ['pop', null], ['getMin', null], ['pop', null]],
        [null, null, null, 1, null, 2, null, 2, null],
        "Test Case 4: Duplicates and fluctuating min"
    );
    // Note: getMin after all pops in DiffOptimized might be problematic if not carefully handled for empty stack
    // LeetCode guarantees non-empty stack for getMin/top/pop calls.
    const minStack = new MinStackDiffOptimized();
    minStack.push(2); minStack.push(2); minStack.push(1); // Stack state: [1, 2, 2] with min 1
    assert.strictEqual(minStack.getMin(), 1);
    minStack.pop(); // Popped 1. min becomes 2. Stack state: [2, 2]
    assert.strictEqual(minStack.getMin(), 2);
    minStack.pop(); // Popped 2. min remains 2. Stack state: [2]
    assert.strictEqual(minStack.getMin(), 2);
    minStack.pop(); // Popped 2. min changes to Infinity (initial state). Stack state: []
    assert.strictEqual(minStack.getMin(), Infinity); // This behaviour is expected for an empty stack with this implementation.

    // Test Case 5: Single element
    runMinStackOperations(
        MinStackDiffOptimized,
        [['push', 7], ['getMin', null], ['top', null], ['pop', null]],
        [null, 7, 7, null],
        "Test Case 5: Single element"
    );
});
```