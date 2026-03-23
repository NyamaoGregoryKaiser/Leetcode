```javascript
/**
 * test/climbing_stairs.test.js
 *
 * Test cases for the Climbing Stairs problem implementations.
 */

const {
    climbStairsRecursive,
    climbStairsMemoization,
    climbStairsTabulation,
    climbStairsSpaceOptimized
} = require('../src/dp_problems');

module.exports = function(assert) {
    // Helper to run all climbing stairs versions against a single test case
    function testClimbStairs(n, expected, description) {
        console.log(`  Testing n=${n}, expected=${expected} (${description})`);
        assert.strictEqual(climbStairsRecursive(n), expected, `Recursive: CS(${n}) should be ${expected}`);
        assert.strictEqual(climbStairsMemoization(n), expected, `Memoization: CS(${n}) should be ${expected}`);
        assert.strictEqual(climbStairsTabulation(n), expected, `Tabulation: CS(${n}) should be ${expected}`);
        assert.strictEqual(climbStairsSpaceOptimized(n), expected, `Space-Optimized: CS(${n}) should be ${expected}`);
    }

    // Test Cases
    testClimbStairs(0, 1, 'Base case: 0 steps (1 way to do nothing)');
    testClimbStairs(1, 1, '1 step (1 way: 1)');
    testClimbStairs(2, 2, '2 steps (2 ways: 1+1, 2)');
    testClimbStairs(3, 3, '3 steps (3 ways: 1+1+1, 1+2, 2+1)');
    testClimbStairs(4, 5, '4 steps (5 ways)');
    testClimbStairs(5, 8, '5 steps (8 ways)');
    testClimbStairs(10, 89, '10 steps');
    testClimbStairs(15, 987, '15 steps');
    testClimbStairs(20, 10946, '20 steps');

    // Edge cases
    testClimbStairs(-1, 1, 'Negative input (treated as 0 steps)'); // Our implementation handles n<=0 as 1
    testClimbStairs(-5, 1, 'Negative input (treated as 0 steps)');
};
```