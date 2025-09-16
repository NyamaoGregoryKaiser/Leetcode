```javascript
const { twoSum, twoSumOptimized, removeDuplicates } = require('./algorithm');

// Jest test cases (example)
test('Two Sum - Brute Force', () => {
  expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
});

test('Two Sum - Optimized', () => {
  expect(twoSumOptimized([2, 7, 11, 15], 9)).toEqual([0, 1]);
});

test('Remove Duplicates', () => {
  const nums = [1, 1, 2, 2, 3, 4, 4, 5];
  const k = removeDuplicates(nums);
  expect(k).toBe(5);
  expect(nums.slice(0, k)).toEqual([1, 2, 3, 4, 5]);
});

// ... (add more test cases for all algorithms) ...
```