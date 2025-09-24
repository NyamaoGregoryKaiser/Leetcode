/**
 * Algorithms for array manipulation.
 */

//Problem 1: Two Sum
function twoSum(nums, target) {
  const numMap = {}; //Hashmap for efficient lookup
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (numMap.hasOwnProperty(complement)) {
      return [numMap[complement], i]; //Return indices
    }
    numMap[nums[i]] = i; //Store number and its index
  }
  return null; //No solution found
}


//Problem 2: Remove Duplicates from Sorted Array
function removeDuplicates(nums) {
  let k = 1; // Index to place next unique element
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[k] = nums[i];
      k++;
    }
  }
  return k; //Return the number of unique elements
}

//Problem 3: Max Subarray Sum (Kadane's Algorithm)
function maxSubArraySum(nums) {
    let maxSoFar = nums[0];
    let maxEndingHere = nums[0];

    for (let i = 1; i < nums.length; i++) {
        maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    return maxSoFar;
}


//Problem 4: Merge Intervals (Requires Interval class - see below)
//Problem 5: Rotate Array (Implementation omitted for brevity)


//Helper Class for Problem 4
class Interval {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

module.exports = { twoSum, removeDuplicates, maxSubArraySum };