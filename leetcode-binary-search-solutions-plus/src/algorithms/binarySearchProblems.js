```javascript
/**
 * src/algorithms/binarySearchProblems.js
 *
 * This file contains implementations for several common Binary Search problems,
 * demonstrating various patterns and modifications of the core algorithm.
 * Each problem includes:
 * - Optimal solution(s)
 * - Detailed comments explaining logic
 * - Time and space complexity analysis
 */

// --- Problem 1: Standard Binary Search (Iterative and Recursive) ---

/**
 * Problem Description:
 * Given a sorted array of integers `nums` and an integer `target`,
 * return the index of `target` if it is in the array, otherwise return -1.
 * You must write an algorithm with O(log n) runtime complexity.
 */

/**
 * Standard Binary Search - Iterative Approach
 * Finds the index of a target value in a sorted array.
 *
 * @param {number[]} nums - The sorted array of integers.
 * @param {number} target - The integer to search for.
 * @returns {number} The index of the target if found, otherwise -1.
 *
 * Time Complexity: O(log N)
 *   - At each step, the search space is halved.
 *   - This logarithmic reduction leads to O(log N) comparisons.
 * Space Complexity: O(1)
 *   - Only a few constant space variables (left, right, mid) are used.
 */
function standardBinarySearchIterative(nums, target) {
  // Initialize pointers for the search space.
  let left = 0;
  let right = nums.length - 1;

  // Continue searching as long as the search space is valid (left <= right).
  while (left <= right) {
    // Calculate the middle index.
    // Using `left + Math.floor((right - left) / 2)` prevents potential integer overflow
    // that `(left + right) / 2` might cause with very large `left` and `right` values
    // in languages with fixed-size integers (though less of an issue in JS).
    const mid = left + Math.floor((right - left) / 2);

    // Check if the middle element is the target.
    if (nums[mid] === target) {
      return mid; // Target found, return its index.
    }

    // If target is greater than the middle element, discard the left half.
    if (nums[mid] < target) {
      left = mid + 1; // New search space starts from mid + 1.
    }
    // If target is less than the middle element, discard the right half.
    else {
      right = mid - 1; // New search space ends at mid - 1.
    }
  }

  // If the loop finishes, the target was not found in the array.
  return -1;
}

/**
 * Standard Binary Search - Recursive Approach
 * Finds the index of a target value in a sorted array using recursion.
 *
 * @param {number[]} nums - The sorted array of integers.
 * @param {number} target - The integer to search for.
 * @param {number} [left=0] - The starting index of the current search space.
 * @param {number} [right=nums.length-1] - The ending index of the current search space.
 * @returns {number} The index of the target if found, otherwise -1.
 *
 * Time Complexity: O(log N)
 *   - Similar to iterative, search space is halved in each recursive call.
 * Space Complexity: O(log N)
 *   - Due to the recursion stack depth. In the worst case (target not found or at ends),
 *     the stack depth will be proportional to log N.
 */
function standardBinarySearchRecursive(nums, target, left = 0, right = nums.length - 1) {
  // Base case: If the search space is invalid (left > right), target is not found.
  if (left > right) {
    return -1;
  }

  // Calculate the middle index.
  const mid = left + Math.floor((right - left) / 2);

  // Check if the middle element is the target.
  if (nums[mid] === target) {
    return mid; // Target found, return its index.
  }

  // If target is greater, search in the right half.
  if (nums[mid] < target) {
    return standardBinarySearchRecursive(nums, target, mid + 1, right);
  }
  // If target is less, search in the left half.
  else {
    return standardBinarySearchRecursive(nums, target, left, mid - 1);
  }
}


// --- Problem 2: Find First and Last Occurrence of an Element ---

/**
 * Problem Description:
 * Given a sorted array `nums` with potentially duplicate elements and a `target` value,
 * return an array of two integers `[first_occurrence_index, last_occurrence_index]`.
 * If the target is not found, return `[-1, -1]`.
 * You must write an algorithm with O(log n) runtime complexity.
 */

/**
 * Finds the first occurrence of a target in a sorted array with duplicates.
 * This is a modified binary search.
 *
 * @param {number[]} nums - The sorted array of integers.
 * @param {number} target - The integer to search for.
 * @returns {number} The index of the first occurrence of the target, or -1 if not found.
 *
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
function findFirstOccurrence(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let firstIndex = -1; // Stores the potential first index found so far.

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      firstIndex = mid; // Found a target, but it might not be the *first*.
      right = mid - 1;  // Try to find an even earlier occurrence in the left half.
    } else if (nums[mid] < target) {
      left = mid + 1; // Target is in the right half.
    } else {
      right = mid - 1; // Target is in the left half.
    }
  }
  return firstIndex;
}

/**
 * Finds the last occurrence of a target in a sorted array with duplicates.
 * This is a modified binary search.
 *
 * @param {number[]} nums - The sorted array of integers.
 * @param {number} target - The integer to search for.
 * @returns {number} The index of the last occurrence of the target, or -1 if not found.
 *
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
function findLastOccurrence(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let lastIndex = -1; // Stores the potential last index found so far.

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      lastIndex = mid;  // Found a target, but it might not be the *last*.
      left = mid + 1;   // Try to find an even later occurrence in the right half.
    } else if (nums[mid] < target) {
      left = mid + 1; // Target is in the right half.
    } else {
      right = mid - 1; // Target is in the left half.
    }
  }
  return lastIndex;
}

/**
 * Combines findFirstOccurrence and findLastOccurrence to solve the problem.
 * @param {number[]} nums - The sorted array of integers.
 * @param {number} target - The integer to search for.
 * @returns {number[]} `[first_occurrence_index, last_occurrence_index]` or `[-1, -1]`.
 *
 * Time Complexity: O(log N) + O(log N) = O(log N)
 * Space Complexity: O(1)
 */
function findFirstAndLastOccurrence(nums, target) {
  const first = findFirstOccurrence(nums, target);
  // If the target is not found at all, no need to search for the last occurrence.
  if (first === -1) {
    return [-1, -1];
  }
  const last = findLastOccurrence(nums, target);
  return [first, last];
}


// --- Problem 3: Search in Rotated Sorted Array ---

/**
 * Problem Description:
 * There is an integer array `nums` sorted in ascending order (with distinct values).
 * Prior to being passed to your function, `nums` is possibly rotated at an unknown pivot index `k` (0 <= k < nums.length).
 * For example, `[0,1,2,4,5,6,7]` might become `[4,5,6,7,0,1,2]` if it was rotated at pivot index 4.
 * Given `nums` after the possible rotation and an integer `target`,
 * return the index of `target` if it is in `nums`, or -1 if it is not in `nums`.
 * You must write an algorithm with O(log n) runtime complexity.
 */

/**
 * Searches for a target in a rotated sorted array.
 *
 * The key idea is that one half of the array (from `left` to `mid` or `mid` to `right`)
 * will always be sorted. We identify which half is sorted and then determine
 * if the target lies within that sorted half. If it does, we narrow our search
 * to that half. Otherwise, we search in the other (unsorted) half.
 *
 * @param {number[]} nums - The rotated sorted array of integers.
 * @param {number} target - The integer to search for.
 * @returns {number} The index of the target if found, otherwise -1.
 *
 * Time Complexity: O(log N)
 *   - Each iteration halves the search space.
 * Space Complexity: O(1)
 */
function searchInRotatedSortedArray(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    // Case 1: Target found at mid.
    if (nums[mid] === target) {
      return mid;
    }

    // Determine which half is sorted.
    // Check if the left half (from `left` to `mid`) is sorted.
    if (nums[left] <= nums[mid]) {
      // Left half is sorted.
      // Check if target is within the bounds of this sorted left half.
      if (nums[left] <= target && target < nums[mid]) {
        // Target is in the sorted left half.
        right = mid - 1; // Discard right half.
      } else {
        // Target is in the unsorted right half.
        left = mid + 1; // Discard left half.
      }
    }
    // Else, the right half (from `mid` to `right`) must be sorted.
    else {
      // Right half is sorted.
      // Check if target is within the bounds of this sorted right half.
      if (nums[mid] < target && target <= nums[right]) {
        // Target is in the sorted right half.
        left = mid + 1; // Discard left half.
      } else {
        // Target is in the unsorted left half.
        right = mid - 1; // Discard right half.
      }
    }
  }

  // Target not found.
  return -1;
}


// --- Problem 4: Find Peak Element ---

/**
 * Problem Description:
 * A peak element is an element that is strictly greater than its neighbors.
 * Given a 0-indexed integer array `nums`, where `nums[i] != nums[i+1]` for all valid `i`,
 * find a peak element and return its index.
 * You may imagine that `nums[-1] = nums[n] = -Infinity`.
 * You must write an algorithm that runs in O(log n) time.
 */

/**
 * Finds a peak element in an array where `nums[i] != nums[i+1]`.
 * We are guaranteed that a peak always exists.
 *
 * @param {number[]} nums - The input array.
 * @returns {number} The index of a peak element.
 *
 * Time Complexity: O(log N)
 *   - Each iteration halves the search space.
 * Space Complexity: O(1)
 */
function findPeakElement(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);

    // If nums[mid] is less than its right neighbor, it means
    // we are on an ascending slope (or at a trough).
    // The peak must be to the right of mid, including mid+1.
    // So, we discard mid and everything to its left.
    if (nums[mid] < nums[mid + 1]) {
      left = mid + 1;
    }
    // If nums[mid] is greater than its right neighbor, it means
    // we are on a descending slope (or at a peak).
    // The peak could be at mid, or to its left.
    // So, we discard mid+1 and everything to its right.
    else {
      right = mid;
    }
  }

  // When left === right, we have converged to a single element, which must be a peak.
  return left;
}


// --- Problem 5: Koko Eating Bananas ---

/**
 * Problem Description:
 * Koko loves to eat bananas. There are `n` piles of bananas, the `i`-th pile has `piles[i]` bananas.
 * Koko can decide her eating speed of `k` bananas per hour.
 * Each hour, she chooses some pile and eats `k` bananas from it. If the pile has less than `k` bananas, she eats all of them instead
 * and will not eat any more bananas during that hour.
 * Koko wants to finish eating all the bananas within `h` hours.
 * Return the minimum integer `k` such that she can eat all the bananas within `h` hours.
 *
 * This is a classic "binary search on the answer" problem.
 * The search space for `k` is not the input array, but the possible values of `k` itself.
 * `k` can range from 1 (slowest possible) to `max(piles)` (fastest possible, eating the largest pile in one hour).
 */

/**
 * Helper function to check if a given eating speed `k` is feasible within `h` hours.
 *
 * @param {number[]} piles - An array of banana pile sizes.
 * @param {number} k - Koko's eating speed per hour.
 * @param {number} h - The maximum allowed hours.
 * @returns {boolean} True if Koko can eat all bananas within `h` hours with speed `k`, false otherwise.
 *
 * Time Complexity: O(N) where N is the number of piles, as we iterate through all piles once.
 * Space Complexity: O(1)
 */
function canFinishEating(piles, k, h) {
  let hoursNeeded = 0;
  for (const pile of piles) {
    // For each pile, calculate hours needed: Math.ceil(pile / k)
    // Math.ceil(a/b) can be calculated as (a + b - 1) / b using integer division
    hoursNeeded += Math.ceil(pile / k);
  }
  return hoursNeeded <= h;
}

/**
 * Finds the minimum eating speed `k` for Koko to eat all bananas within `h` hours.
 *
 * This problem uses binary search on the *answer* (`k`), not on the input array.
 * The range for `k` is `[1, max(piles)]`.
 *
 * @param {number[]} piles - An array of banana pile sizes.
 * @param {number} h - The maximum allowed hours.
 * @returns {number} The minimum integer `k`.
 *
 * Time Complexity: O(N log M)
 *   - Where N is the number of piles and M is the maximum pile size (or the range of `k`).
 *   - The `log M` factor comes from the binary search on `k`.
 *   - The `N` factor comes from the `canFinishEating` helper function, which is called in each iteration.
 * Space Complexity: O(1)
 */
function minEatingSpeed(piles, h) {
  // Edge case: if no piles, no speed needed. Or handle as error.
  if (piles.length === 0) return 0;
  if (piles.length > h) {
      // If there are more piles than hours, it's impossible to finish unless some piles are 0.
      // Given piles[i] >= 1, this means it's impossible.
      // However, per problem statement, it is guaranteed that h is always sufficient.
      // This implies max_piles_length <= h or average k is sufficient.
      // So, this case should imply an error in problem constraints or return max possible k.
      // For standard interpretation, this implies no solution or an error in problem constraints.
      // Let's assume valid inputs where a solution always exists.
  }


  // Define the search space for `k`.
  // `left` (minimum possible speed): 1 banana per hour.
  // `right` (maximum possible speed): The size of the largest pile (eating it in 1 hour).
  let left = 1;
  let right = Math.max(...piles);

  let minK = right; // Initialize minimum k to the maximum possible (a valid but not optimal answer).

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    // If Koko can finish eating all bananas with speed `mid` within `h` hours...
    if (canFinishEating(piles, mid, h)) {
      minK = mid;    // This `mid` is a possible answer, store it.
      right = mid - 1; // Try to find an even smaller `k` in the left half.
    }
    // If Koko cannot finish with speed `mid`...
    else {
      left = mid + 1; // `mid` is too slow, need to increase speed. Search in the right half.
    }
  }

  return minK; // The smallest `k` that satisfies the condition.
}

module.exports = {
  standardBinarySearchIterative,
  standardBinarySearchRecursive,
  findFirstAndLastOccurrence,
  searchInRotatedSortedArray,
  findPeakElement,
  minEatingSpeed,
  // Export helper functions for testing if necessary, but generally not directly
  // findFirstOccurrence, // Not directly part of the problem's public API
  // findLastOccurrence,  // Not directly part of the problem's public API
  // canFinishEating,     // Not directly part of the problem's public API
};
```