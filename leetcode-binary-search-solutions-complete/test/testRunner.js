```javascript
/**
 * test/testRunner.js
 * A simple custom test runner for the project.
 */

const Logger = require('../src/utils/logger');

class TestRunner {
    constructor() {
        this.totalTests = 0;
        this.failedTests = 0;
        this.testSuites = [];
    }

    /**
     * Defines a test suite.
     * @param {string} description - Description of the test suite.
     * @param {Function} callback - Function containing the test cases.
     */
    suite(description, callback) {
        this.testSuites.push({ description, callback });
    }

    /**
     * Asserts that a value is strictly equal to an expected value.
     * @param {*} actual - The actual value.
     * @param {*} expected - The expected value.
     * @param {string} message - Description of the assertion.
     */
    assertEqual(actual, expected, message) {
        this.totalTests++;
        if (actual === expected) {
            Logger.success(`  ${message}`);
        } else {
            this.failedTests++;
            Logger.error(`  ${message} - FAILED: Expected "${expected}", Got "${actual}"`);
        }
    }

    /**
     * Asserts that a condition is true.
     * @param {boolean} condition - The condition to check.
     * @param {string} message - Description of the assertion.
     */
    assertTrue(condition, message) {
        this.totalTests++;
        if (condition) {
            Logger.success(`  ${message}`);
        } else {
            this.failedTests++;
            Logger.error(`  ${message} - FAILED: Expected true, Got false`);
        }
    }

    /**
     * Asserts that a condition is false.
     * @param {boolean} condition - The condition to check.
     * @param {string} message - Description of the assertion.
     */
    assertFalse(condition, message) {
        this.totalTests++;
        if (!condition) {
            Logger.success(`  ${message}`);
        } else {
            this.failedTests++;
            Logger.error(`  ${message} - FAILED: Expected false, Got true`);
        }
    }

    /**
     * Asserts that two arrays are deeply equal.
     * @param {Array} actual - The actual array.
     * @param {Array} expected - The expected array.
     * @param {string} message - Description of the assertion.
     */
    assertDeepEqual(actual, expected, message) {
        this.totalTests++;
        let isEqual = true;
        if (actual.length !== expected.length) {
            isEqual = false;
        } else {
            for (let i = 0; i < actual.length; i++) {
                if (actual[i] !== expected[i]) {
                    isEqual = false;
                    break;
                }
            }
        }

        if (isEqual) {
            Logger.success(`  ${message}`);
        } else {
            this.failedTests++;
            Logger.error(`  ${message} - FAILED: Expected "${JSON.stringify(expected)}", Got "${JSON.stringify(actual)}"`);
        }
    }

    /**
     * Runs all registered test suites.
     */
    run() {
        Logger.section("Running All Tests");
        this.totalTests = 0;
        this.failedTests = 0;

        for (const suite of this.testSuites) {
            Logger.subSection(`Test Suite: ${suite.description}`);
            try {
                suite.callback(this);
            } catch (e) {
                this.failedTests++;
                Logger.error(`  Unhandled error in suite "${suite.description}":`, e);
            }
        }

        Logger.section("Test Summary");
        if (this.failedTests === 0) {
            Logger.success(`All ${this.totalTests} tests passed.`);
        } else {
            Logger.error(`${this.failedTests} of ${this.totalTests} tests failed.`);
        }
        console.log('\n'); // Add some spacing
        return this.failedTests === 0;
    }
}

module.exports = TestRunner;
```