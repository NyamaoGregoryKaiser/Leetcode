const { twoSum, reverseArray, maxSubArraySum, removeDuplicates } = require('./algorithms');
const { test, expect } = require('@jest/globals');


test('twoSum', () => {
  expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
  expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
  expect(twoSum([3,3], 6)).toEqual([0,1]);
});

test('reverseArray', () => {
  const arr = [1, 2, 3, 4, 5];
  reverseArray(arr);
  expect(arr).toEqual([5, 4, 3, 2, 1]);
});

test('maxSubArraySum', () => {
  expect(maxSubArraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6);
  expect(maxSubArraySum([1,2,3,4,5])).toBe(15);
  expect(maxSubArraySum([-1,-2,-3])).toBe(-1);
});


test('removeDuplicates', () => {
  const arr1 = [1, 1, 2];
  expect(removeDuplicates(arr1)).toBe(2);
  expect(arr1).toEqual([1,2]); //in place modification

  const arr2 = [0,0,1,1,1,2,2,3,3,4];
  expect(removeDuplicates(arr2)).toBe(5);
  expect(arr2).toEqual([0,1,2,3,4]);
});