```javascript
// Standard Binary Search
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1; // Target not found
}

// First Occurrence
function firstOccurrence(arr, target) {
  // ... (Implementation similar to binarySearch, but adjusts the right pointer)
}

//Last Occurrence
function lastOccurrence(arr, target){
    // ... (Implementation similar to binarySearch, but adjusts the left pointer)
}


// Find Closest Element
function findClosest(arr, target) {
  // ... (Implementation using binary search to find the closest element)
}

// Search in Rotated Sorted Array
function searchRotated(arr, target) {
  // ... (Implementation using modified binary search to handle rotation)
}

//Find Peak Element
function findPeak(arr){
    // ... (Implementation using binary search to find a peak)
}


//Time and Space Complexity (Example for standard Binary Search)
//Time Complexity: O(log n)
//Space Complexity: O(1)

module.exports = { binarySearch, firstOccurrence, lastOccurrence, findClosest, searchRotated, findPeak };
```