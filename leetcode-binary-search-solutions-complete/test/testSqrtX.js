```javascript
/**
 * test/testSqrtX.js
 * Test cases for sqrtX.js
 */

const TestRunner = require('./testRunner');
const { mySqrt, mySqrtBruteForce } = require('../src/problems/sqrtX');
const { Logger } = require('../src/index');

const test = new TestRunner();

function runTests(sqrtFn, descriptionSuffix) {
    test.suite(`Sqrt(x) - ${descriptionSuffix}`, (assert) => {
        assert.assertEqual(sqrtFn(0), 0, 'Should return 0 for x=0');
        assert.assertEqual(sqrtFn(1), 1, 'Should return 1 for x=1');
        assert.assertEqual(sqrtFn(4), 2, 'Should return 2 for x=4');
        assert.assertEqual(sqrtFn(8), 2, 'Should return 2 for x=8 (truncation)');
        assert.assertEqual(sqrtFn(9), 3, 'Should return 3 for x=9');
        assert.assertEqual(sqrtFn(15), 3, 'Should return 3 for x=15 (truncation)');
        assert.assertEqual(sqrtFn(16), 4, 'Should return 4 for x=16');
        assert.assertEqual(sqrtFn(2147395599), 46340, 'Should handle large number (max int sqrt)'); // Max sqrt(MAX_INT) for 32-bit signed
        assert.assertEqual(sqrtFn(2147483647), 46340, 'Should handle MAX_INT'); // MAX_INT = 2^31 - 1

        // Custom large numbers to push boundaries
        assert.assertEqual(sqrtFn(99), 9, 'Should handle x=99');
        assert.assertEqual(sqrtFn(100), 10, 'Should handle x=100');
        assert.assertEqual(sqrtFn(10000), 100, 'Should handle x=10000');
        assert.assertEqual(sqrtFn(999999999), 31622, 'Should handle large number near 1 billion');

        // Test for potential error (negative input - if function handles it)
        try {
            sqrtFn(-1);
            assert.fail('Should throw an error for negative input'); // This assertion will only run if no error
        } catch (e) {
            assert.assertTrue(e.message.includes('non-negative'), 'Should throw error for negative input');
        }

        // Test precision with Math.sqrt to ensure correctness for specific large numbers
        const testNumbers = [
            25, 12345, 987654321,
            Math.pow(2, 30), // Large power of 2
            Math.pow(2, 31) - 1, // Max signed 32-bit int
            Math.pow(2, 53) - 1, // Max safe integer for JS
            Math.pow(2, 40) // A very large number that still fits
        ];

        for (const num of testNumbers) {
            const expected = Math.floor(Math.sqrt(num));
            const actual = sqrtFn(num);
            assert.assertEqual(actual, expected, `Should correctly calculate sqrt(${num})`);
        }
    });
}

// Run tests for both optimized and brute-force (which uses Math.sqrt for convenience)
runTests(mySqrt, 'Optimized');
runTests(mySqrtBruteForce, 'Brute Force (Math.sqrt)'); // Note: BruteForce here uses Math.sqrt for practical comparison

module.exports = test; // Export the test runner instance for allTests.js
```