```javascript
/**
 * test/allTests.js
 * Orchestrates and runs all test suites.
 */

const Logger = require('../src/utils/logger');
const TestRunner = require('./testRunner');

// Import individual test suites
const testBinarySearch = require('./testBinarySearch');
const testRotatedArray = require('./testRotatedArray');
const testFindPeakElement = require('./testFindPeakElement');
const testSqrtX = require('./testSqrtX');

// Create a main test runner instance to aggregate results
const mainRunner = new TestRunner();

// Add all individual test suites to the main runner
mainRunner.testSuites.push(...testBinarySearch.testSuites);
mainRunner.testSuites.push(...testRotatedArray.testSuites);
mainRunner.testSuites.push(...testFindPeakElement.testSuites);
mainRunner.testSuites.push(...testSqrtX.testSuites);

// Run all tests
const allTestsPassed = mainRunner.run();

// Exit with appropriate code for CI/CD
process.exit(allTestsPassed ? 0 : 1);
```