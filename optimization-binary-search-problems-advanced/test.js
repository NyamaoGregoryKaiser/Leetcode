```javascript
const { binarySearch, firstOccurrence, lastOccurrence, findClosest, searchRotated, findPeak } = require('./binary_search');

//Jest test cases (examples)
test('Binary Search finds target', () => {
  expect(binarySearch([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 23)).toBe(6);
});

test('Binary Search does not find target', () => {
  expect(binarySearch([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 99)).toBe(-1);
});

// Add test cases for other functions (firstOccurrence, lastOccurrence, etc.)
// ... more test cases ...

```