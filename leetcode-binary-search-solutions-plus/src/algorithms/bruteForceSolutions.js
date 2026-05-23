```javascript
/**
 * src/algorithms/bruteForceSolutions.js
 *
 * This file contains brute-force or naive implementations for some of the problems
 * covered in `binarySearchProblems.js`. These are primarily for comparison
 * during performance benchmarking to highlight the efficiency gains of binary search.
 */

// --- Problem 1: Standard Binary Search ---

/**
 * Standard Search - Brute Force (Linear Scan)
 * Finds the index of a target value in an array by iterating through all elements.
 *
 * @param {number[]} nums - The array of integers. (Sorting is not required for this approach).
 * @param {number} target - The integer to search for.
 * @returns {number} The index of the target if found, otherwise -1.
 *
 * Time Complexity: O(N)
 *   - In the worst case (target at the end or not present), it iterates through all N elements.
 * Space Complexity: O(1)
 */
function standardLinearSearch(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) {
      return i;
    }
  }
  return -1;
}

// --- Problem 2: Find First and Last Occurrence of an Element ---

/**
 * Finds the first and last occurrence of a target using brute force (linear scan).
 *
 * @param {number[]} nums - The sorted array of integers.
 * @param {number} target - The integer to search for.
 * @returns {number[]} `[first_occurrence_index, last_occurrence_index]` or `[-1, -1]`.
 *
 * Time Complexity: O(N)
 *   - Iterates through the entire array potentially twice (or once for finding both).
 * Space Complexity: O(1)
 */
function findFirstAndLastOccurrenceBruteForce(nums, target) {
  let firstIndex = -1;
  let lastIndex = -1;

  // Find first occurrence
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) {
      firstIndex = i;
      break; // Found the first, exit loop
    }
  }

  // If target not found at all, return early
  if (firstIndex === -1) {
    return [-1, -1];
  }

  // Find last occurrence (can start from firstIndex for slight optimization, but worst case still O(N))
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] === target) {
      lastIndex = i;
      break; // Found the last, exit loop
    }
  }

  return [firstIndex, lastIndex];
}

// --- Problem 3: Search in Rotated Sorted Array ---

/**
 * Searches for a target in a rotated sorted array using brute force (linear scan).
 *
 * @param {number[]} nums - The rotated sorted array of integers.
 * @param {number} target - The integer to search for.
 * @returns {number} The index of the target if found, otherwise -1.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
function searchInRotatedSortedArrayBruteForce(nums, target) {
  return standardLinearSearch(nums, target); // Linear search works directly.
}

// --- Problem 4: Find Peak Element ---

/**
 * Finds a peak element using brute force (linear scan).
 *
 * @param {number[]} nums - The input array.
 * @returns {number} The index of a peak element.
 *
 * Time Complexity: O(N)
 *   - Iterates through the array to check each element against its neighbors.
 * Space Complexity: O(1)
 */
function findPeakElementBruteForce(nums) {
  if (nums.length === 0) return -1; // Or throw error, depending on problem spec
  if (nums.length === 1) return 0;

  // Check first element
  if (nums[0] > nums[1]) return 0;
  // Check last element
  if (nums[nums.length - 1] > nums[nums.length - 2]) return nums.length - 1;

  // Check elements in between
  for (let i = 1; i < nums.length - 1; i++) {
    if (nums[i] > nums[i - 1] && nums[i] > nums[i + 1]) {
      return i;
    }
  }
  return -1; // Should not happen given problem constraints (a peak always exists).
}

// --- Problem 5: Koko Eating Bananas ---

/**
 * Helper function to calculate total hours needed for a given speed `k`.
 * (Same as the optimized version's helper, as it's already optimal for a single `k`).
 */
function calculateHours(piles, k) {
  let hoursNeeded = 0;
  for (const pile of piles) {
    hoursNeeded += Math.ceil(pile / k);
  }
  return hoursNeeded;
}

/**
 * Finds the minimum eating speed `k` using brute force.
 * It iterates through all possible `k` values from 1 up to `max(piles)`
 * and checks if each `k` is feasible.
 *
 * @param {number[]} piles - An array of banana pile sizes.
 * @param {number} h - The maximum allowed hours.
 * @returns {number} The minimum integer `k`.
 *
 * Time Complexity: O(N * M)
 *   - Where N is the number of piles and M is the maximum pile size (range of `k`).
 *   - Iterates `M` times for `k`, and in each iteration, calls `calculateHours` which takes `O(N)`.
 * Space Complexity: O(1)
 */
function minEatingSpeedBruteForce(piles, h) {
  if (piles.length === 0) return 0;

  const maxPile = Math.max(...piles);
  // Iterate through all possible speeds from 1 up to the maximum pile size.
  for (let k = 1; k <= maxPile; k++) {
    if (calculateHours(piles, k) <= h) {
      return k; // The first `k` that satisfies the condition is the minimum.
    }
  }
  return maxPile; // Should not be reached if a solution is guaranteed.
}


module.exports = {
  standardLinearSearch,
  findFirstAndLastOccurrenceBruteForce,
  searchInRotatedSortedArrayBruteForce,
  findPeakElementBruteForce,
  minEatingSpeedBruteForce,
};
```