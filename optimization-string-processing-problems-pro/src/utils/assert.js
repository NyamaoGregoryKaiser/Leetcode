```javascript
/**
 * @fileoverview A simple assertion utility for unit testing.
 * This file provides basic assertion functions to be used in test files.
 * It's designed to be minimal and not rely on any external test frameworks.
 */

class AssertionError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AssertionError';
    }
}

/**
 * Asserts that a value is truthy.
 * @param {*} value - The value to check.
 * @param {string} [message] - Optional message to display if the assertion fails.
 */
function assert(value, message = 'Expected value to be truthy') {
    if (!value) {
        throw new AssertionError(message);
    }
}

/**
 * Asserts that two values are strictly equal.
 * @param {*} actual - The actual value.
 * @param {*} expected - The expected value.
 * @param {string} [message] - Optional message.
 */
function assertStrictEquals(actual, expected, message) {
    if (actual !== expected) {
        throw new AssertionError(message || `Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}`);
    }
}

/**
 * Asserts that two arrays or objects have deep equality.
 * This function handles simple objects and arrays, not circular references or complex types.
 * @param {*} actual - The actual value.
 * @param {*} expected - The expected value.
 * @param {string} [message] - Optional message.
 */
function assertDeepEquals(actual, expected, message) {
    const areEqual = (a, b) => {
        if (a === b) return true;

        if (a && typeof a === 'object' && b && typeof b === 'object') {
            if (Array.isArray(a) && Array.isArray(b)) {
                if (a.length !== b.length) return false;
                for (let i = 0; i < a.length; i++) {
                    if (!areEqual(a[i], b[i])) return false;
                }
                return true;
            } else if (!Array.isArray(a) && !Array.isArray(b)) {
                const keysA = Object.keys(a);
                const keysB = Object.keys(b);

                if (keysA.length !== keysB.length) return false;

                for (const key of keysA) {
                    if (!keysB.includes(key) || !areEqual(a[key], b[key])) {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    };

    if (!areEqual(actual, expected)) {
        throw new AssertionError(message || `Expected deep equality for ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}`);
    }
}

/**
 * Asserts that a function throws an error.
 * @param {function} fn - The function to execute.
 * @param {string} [message] - Optional message.
 */
function assertThrows(fn, message = 'Expected function to throw an error') {
    let thrown = false;
    try {
        fn();
    } catch (e) {
        thrown = true;
    }
    if (!thrown) {
        throw new AssertionError(message);
    }
}

/**
 * Runs a test suite and reports results.
 * @param {string} suiteName - The name of the test suite.
 * @param {function} testsCallback - A callback function containing test cases.
 */
function testSuite(suiteName, testsCallback) {
    console.log(`\n--- Running Test Suite: ${suiteName} ---`);
    let passed = 0;
    let failed = 0;

    const originalAssert = global.assert;
    const originalAssertStrictEquals = global.assertStrictEquals;
    const originalAssertDeepEquals = global.assertDeepEquals;
    const originalAssertThrows = global.assertThrows;

    global.assert = assert;
    global.assertStrictEquals = assertStrictEquals;
    global.assertDeepEquals = assertDeepEquals;
    global.assertThrows = assertThrows;

    const runTest = (testName, testFn) => {
        try {
            testFn();
            console.log(`  ✓ ${testName}`);
            passed++;
        } catch (e) {
            failed++;
            console.error(`  ✗ ${testName}`);
            if (e instanceof AssertionError) {
                console.error(`    Assertion Failed: ${e.message}`);
            } else {
                console.error(`    Unexpected Error: ${e.message}`);
            }
            if (e.stack) {
                // Filter out the assert.js stack frames for cleaner output
                const stackLines = e.stack.split('\n');
                const filteredStack = stackLines.filter(line => !line.includes('assert.js')).join('\n');
                console.error(filteredStack);
            }
        }
    };

    global.it = runTest; // Provide 'it' for test cases

    try {
        testsCallback();
    } finally {
        global.assert = originalAssert;
        global.assertStrictEquals = originalAssertStrictEquals;
        global.assertDeepEquals = originalAssertDeepEquals;
        global.assertThrows = originalAssertThrows;
        delete global.it; // Clean up the global 'it'
    }

    console.log(`\nResults: ${passed} passed, ${failed} failed.`);
    if (failed > 0) {
        process.exitCode = 1; // Indicate failure to the shell
    }
}

module.exports = {
    assert,
    assertStrictEquals,
    assertDeepEquals,
    assertThrows,
    testSuite,
    AssertionError
};
```