/**
 * Two Sum
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = (nums, target) => {
  //Approach 1: Brute Force - O(n^2) time, O(1) space
  // for(let i=0; i<nums.length; i++){
  //   for(let j=i+1; j<nums.length; j++){
  //     if(nums[i] + nums[j] === target) return [i,j];
  //   }
  // }

  //Approach 2: Hash Map - O(n) time, O(n) space
  const numMap = {};
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (complement in numMap) {
      return [numMap[complement], i];
    }
    numMap[nums[i]] = i;
  }
  return []; // No solution found
};


/**
 * Reverse Array In-Place
 * @param {number[]} nums
 * @return {void}
 */
const reverseArray = (nums) => {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]]; //Swap elements
    left++;
    right--;
  }
};


/**
 * Max Subarray Sum (Kadane's Algorithm)
 * @param {number[]} nums
 * @return {number}
 */
const maxSubArraySum = (nums) => {
  let maxSoFar = nums[0];
  let maxEndingHere = nums[0];
  for (let i = 1; i < nums.length; i++) {
    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }
  return maxSoFar;
};

/**
 * Remove Duplicates from Sorted Array
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates = (nums) => {
  if (nums.length === 0) return 0;
  let k = 1; // Index for unique elements
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[k] = nums[i];
      k++;
    }
  }
  return k;
};

module.exports = { twoSum, reverseArray, maxSubArraySum, removeDuplicates };