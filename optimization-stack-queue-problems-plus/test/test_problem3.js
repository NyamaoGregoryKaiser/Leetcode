```javascript
/**
 * @fileoverview Test suite for Problem 3: Moving Average from Data Stream.
 * Uses Node.js's built-in `node:test` module.
 */

import { test, assert } from 'node:test';
import {
    MovingAverageOptimal,
    MovingAverageCircularBuffer
} from '../src/problems/problem3_moving_average_from_data_stream.js';

// Helper function to run a sequence of operations and check results
function runMovingAverageOperations(MovingAverageClass, size, operations, expectedOutputs, testName) {
    const ma = new MovingAverageClass(size);
    const actualOutputs = [];

    operations.forEach(val => {
        actualOutputs.push(ma.next(val));
    });

    // Use a small epsilon for floating point comparison
    const epsilon = 1e-5;
    const areClose = (a, b) => Math.abs(a - b) < epsilon;

    assert.strictEqual(actualOutputs.length, expectedOutputs.length, `${testName}: Output length mismatch`);
    for (let i = 0; i < actualOutputs.length; i++) {
        assert.ok(areClose(actualOutputs[i], expectedOutputs[i]),
            `${testName}: Output at index ${i} expected ${expectedOutputs[i]}, got ${actualOutputs[i]}`);
    }
}

test('Problem 3: Moving Average from Data Stream - MovingAverageOptimal', (t) => {
    // Test Case 1: Example from problem description
    runMovingAverageOperations(
        MovingAverageOptimal, 3,
        [1, 10, 3, 5],
        [1.0, 5.5, 4.666666666666667, 6.0],
        "Test Case 1: Basic example"
    );

    // Test Case 2: Window size 1
    runMovingAverageOperations(
        MovingAverageOptimal, 1,
        [10, 20, 30, 40],
        [10.0, 20.0, 30.0, 40.0],
        "Test Case 2: Window size 1"
    );

    // Test Case 3: Window size larger than number of elements
    runMovingAverageOperations(
        MovingAverageOptimal, 5,
        [1, 2, 3],
        [1.0, 1.5, 2.0],
        "Test Case 3: Window larger than elements"
    );

    // Test Case 4: Negative numbers
    runMovingAverageOperations(
        MovingAverageOptimal, 2,
        [10, -2, 4, -8],
        [10.0, 4.0, 1.0, -2.0],
        "Test Case 4: Negative numbers"
    );

    // Test Case 5: Zeroes
    runMovingAverageOperations(
        MovingAverageOptimal, 3,
        [0, 0, 0, 10, 0],
        [0.0, 0.0, 0.0, 3.3333333333333335, 3.3333333333333335],
        "Test Case 5: Zeroes"
    );

    // Test Case 6: Larger values and window
    runMovingAverageOperations(
        MovingAverageOptimal, 4,
        [100, 200, 300, 400, 500, 600, 700],
        [100.0, 150.0, 200.0, 250.0, 350.0, 475.0, 600.0],
        "Test Case 6: Larger values and window"
    );
});

test('Problem 3: Moving Average from Data Stream - MovingAverageCircularBuffer', (t) => {
    // Test Case 1: Example from problem description
    runMovingAverageOperations(
        MovingAverageCircularBuffer, 3,
        [1, 10, 3, 5],
        [1.0, 5.5, 4.666666666666667, 6.0],
        "Test Case 1: Basic example"
    );

    // Test Case 2: Window size 1
    runMovingAverageOperations(
        MovingAverageCircularBuffer, 1,
        [10, 20, 30, 40],
        [10.0, 20.0, 30.0, 40.0],
        "Test Case 2: Window size 1"
    );

    // Test Case 3: Window size larger than number of elements
    runMovingAverageOperations(
        MovingAverageCircularBuffer, 5,
        [1, 2, 3],
        [1.0, 1.5, 2.0],
        "Test Case 3: Window larger than elements"
    );

    // Test Case 4: Negative numbers
    runMovingAverageOperations(
        MovingAverageCircularBuffer, 2,
        [10, -2, 4, -8],
        [10.0, 4.0, 1.0, -2.0],
        "Test Case 4: Negative numbers"
    );

    // Test Case 5: Zeroes
    runMovingAverageOperations(
        MovingAverageCircularBuffer, 3,
        [0, 0, 0, 10, 0],
        [0.0, 0.0, 0.0, 3.3333333333333335, 3.3333333333333335],
        "Test Case 5: Zeroes"
    );

    // Test Case 6: Larger values and window
    runMovingAverageOperations(
        MovingAverageCircularBuffer, 4,
        [100, 200, 300, 400, 500, 600, 700],
        [100.0, 150.0, 200.0, 250.0, 350.0, 475.0, 600.0],
        "Test Case 6: Larger values and window"
    );
});
```