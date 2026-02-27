```javascript
/**
 * src/problems/index.js
 * Exports all problem solutions from the 'problems' directory.
 */

const binarySearch = require('./binarySearch');
const searchRotatedArray = require('./searchRotatedArray');
const findPeakElement = require('./findPeakElement');
const sqrtX = require('./sqrtX');

module.exports = {
    ...binarySearch,
    ...searchRotatedArray,
    ...findPeakElement,
    ...sqrtX
};
```