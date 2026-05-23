```javascript
/**
 * @fileoverview Functional-style solution for Rotate Array.
 * This solution uses array methods like `slice` and `concat` which are not in-place.
 * It returns a new rotated array rather than modifying the original.
 *
 * @param {number[]} nums - The array to rotate.
 * @param {number} k - The number of steps to rotate.
 * @returns {number[]} A new array with elements rotated to the right.
 *
 * Time Complexity: O(N), due to `slice` and `concat` operations.
 * Space Complexity: O(N), as new arrays are created.
 */
function rotateArray_functional(nums, k) {
    const n = nums.length;
    if (n === 0) {
        return [];
    }

    k %= n; // Normalize k

    // If k is 0 or no effective rotation, return a shallow copy to indicate a new array (or original if immutable concept)
    if (k === 0) {
        return nums.slice();
    }

    // Split the array into two parts:
    // The last k elements that will move to the front.
    const lastK = nums.slice(n - k);
    // The first n-k elements that will move to the back.
    const firstNK = nums.slice(0, n - k);

    // Concatenate them in the new order
    return lastK.concat(firstNK);
}

module.exports = {
    rotateArray_functional
};
```