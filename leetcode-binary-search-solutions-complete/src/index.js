```javascript
/**
 * src/index.js
 * Main entry point for the binary-search-project.
 * Exports all problem solutions.
 */

const problems = require('./problems');
const Logger = require('./utils/logger');
const ArrayUtils = require('./utils/arrayUtils');

// Export all problem solutions for easy access
module.exports = {
    ...problems,
    Logger,
    ArrayUtils
};

// Example usage (optional, primarily for demonstrating exports)
if (require.main === module) {
    Logger.section("Binary Search Project - Example Usage");

    const arr = ArrayUtils.generateSortedArray(10, 10, 2); // [10, 12, 14, 16, 18, 20, 22, 24, 26, 28]
    Logger.info(`Array: ${arr}`);

    let target = 20;
    let index = problems.binarySearchIterative(arr, target);
    Logger.log(`Iterative binary search for ${target}: Found at index ${index}`); // Expected: 5

    target = 15;
    index = problems.binarySearchRecursive(arr, target);
    Logger.log(`Recursive binary search for ${target}: Found at index ${index}`); // Expected: -1

    const arrWithDuplicates = [1, 2, 3, 3, 3, 4, 5];
    Logger.info(`Array with duplicates: ${arrWithDuplicates}`);
    target = 3;
    let first = problems.findFirstOccurrence(arrWithDuplicates, target);
    let last = problems.findLastOccurrence(arrWithDuplicates, target);
    Logger.log(`First occurrence of ${target}: ${first}`); // Expected: 2
    Logger.log(`Last occurrence of ${target}: ${last}`);   // Expected: 4

    const rotatedArr = [4, 5, 6, 7, 0, 1, 2];
    Logger.info(`Rotated Array: ${rotatedArr}`);
    target = 0;
    index = problems.searchRotatedArray(rotatedArr, target);
    Logger.log(`Search in Rotated Array for ${target}: Found at index ${index}`); // Expected: 4

    const peakArr = [1, 2, 1, 3, 5, 6, 4];
    Logger.info(`Peak Element Array: ${peakArr}`);
    index = problems.findPeakElement(peakArr);
    Logger.log(`Peak element found at index: ${index}`); // Expected: 1 or 5

    let num = 8;
    let sqrtVal = problems.mySqrt(num);
    Logger.info(`Square root of ${num}: ${sqrtVal}`); // Expected: 2

    Logger.section("End of Example Usage");
}
```