# Algorithm Explanations

## Two Sum

**Algorithm:** Uses a hash map to store each number and its index. For each number, it checks if the complement (target - number) exists in the hash map. If it does, it returns the indices of the two numbers.

**Time Complexity:** O(n) - Linear time due to single pass through the array.
**Space Complexity:** O(n) - In the worst case, the hash map could store all numbers.


## Remove Duplicates from Sorted Array

**Algorithm:** Iterates through the array, keeping track of the index of the last unique element. If a number is different from the previous one, it's a new unique element, and it's placed at the next available index.

**Time Complexity:** O(n) - Linear time because of a single pass.
**Space Complexity:** O(1) - Constant space because it modifies the array in-place.


## Max Subarray Sum (Kadane's Algorithm)

**Algorithm:** Kadane's algorithm maintains two variables: `maxSoFar` (the maximum sum found so far) and `maxEndingHere` (the maximum sum ending at the current position). It iterates through the array, updating these variables based on whether adding the current number increases the sum or it's better to start a new subarray.

**Time Complexity:** O(n) - Linear time due to single pass.
**Space Complexity:** O(1) - Constant space as only a few variables are used.


...(Add explanations for other algorithms)...