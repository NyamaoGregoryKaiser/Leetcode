const { twoSum, removeDuplicates, maxSubArraySum } = require('./algorithms');
const { test, expect } = require('@jest/globals');


test('twoSum finds correct indices', () => {
  expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
  expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
  expect(twoSum([3,3],6)).toEqual([0,1]);
});

test('removeDuplicates removes duplicates', () => {
  const nums1 = [1, 1, 2];
  expect(removeDuplicates(nums1)).toBe(2);
  expect(nums1).toEqual([1, 2,2]); //In-place modification

  const nums2 = [0,0,1,1,1,2,2,3,3,4];
  expect(removeDuplicates(nums2)).toBe(5);
  expect(nums2).toEqual([0,1,2,3,4,2,2,3,3,4]); //In-place modification

});

test('maxSubArraySum finds maximum subarray sum', () => {
  expect(maxSubArraySum([-2,1,-3,4,-1,2,1,-5,4])).toBe(6);
  expect(maxSubArraySum([5,4,-1,7,8])).toBe(23);
  expect(maxSubArraySum([-1])).toBe(-1);
});

//Add more tests for other functions...