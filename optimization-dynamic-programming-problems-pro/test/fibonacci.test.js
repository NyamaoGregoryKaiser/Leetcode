```javascript
/**
 * test/fibonacci.test.js
 *
 * Test cases for the Fibonacci Number problem implementations.
 */

const {
    fibonacciRecursive,
    fibonacciMemoization,
    fibonacciTabulation,
    fibonacciSpaceOptimized
} = require('../src/dp_problems');

module.exports = function(assert) {
    // Helper to run all fibonacci versions against a single test case
    function testFibonacci(n, expected, description) {
        console.log(`  Testing n=${n}, expected=${expected} (${description})`);
        assert.strictEqual(fibonacciRecursive(n), expected, `Recursive: F(${n}) should be ${expected}`);
        assert.strictEqual(fibonacciMemoization(n), expected, `Memoization: F(${n}) should be ${expected}`);
        assert.strictEqual(fibonacciTabulation(n), expected, `Tabulation: F(${n}) should be ${expected}`);
        assert.strictEqual(fibonacciSpaceOptimized(n), expected, `Space-Optimized: F(${n}) should be ${expected}`);
    }

    // Test Cases
    testFibonacci(0, 0, 'Base case F(0)');
    testFibonacci(1, 1, 'Base case F(1)');
    testFibonacci(2, 1, 'F(2)');
    testFibonacci(3, 2, 'F(3)');
    testFibonacci(4, 3, 'F(4)');
    testFibonacci(5, 5, 'F(5)');
    testFibonacci(6, 8, 'F(6)');
    testFibonacci(7, 13, 'F(7)');
    testFibonacci(10, 55, 'F(10)');
    testFibonacci(15, 610, 'F(15)');
    testFibonacci(20, 6765, 'F(20)');

    // Edge cases
    testFibonacci(-1, 0, 'Negative input (treated as F(0))'); // Our implementation handles n<=0 as 0
    testFibonacci(-5, 0, 'Negative input (treated as F(0))');
};
```