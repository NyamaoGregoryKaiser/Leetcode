```javascript
//Helper functions for generating test data, etc.
function generateSortedArray(n) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(Math.floor(Math.random() * 100)); // Adjust range as needed
  }
  arr.sort((a, b) => a - b);
  return arr;
}

module.exports = { generateSortedArray };
```