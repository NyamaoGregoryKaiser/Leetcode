```javascript
const { binarySearch } = require('./binary_search');
const { generateSortedArray } = require('./utils');

const arr = generateSortedArray(100000); // Generate a large array
const target = arr[Math.floor(Math.random() * arr.length)];

console.time('Binary Search');
binarySearch(arr, target);
console.timeEnd('Binary Search');
```