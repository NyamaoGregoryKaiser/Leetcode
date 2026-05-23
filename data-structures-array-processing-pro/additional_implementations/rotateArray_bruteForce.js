```javascript
/**
 * @fileoverview Brute-force (and less optimal in-place) solution for Rotate Array.
 * This approach repeatedly shifts elements one by one.
 *
 * @param {number[]} nums - The array to rotate.
 * @param {number} k - The number of steps to rotate.
 * @returns {void} Modifies the original array in-place.
 *
 * Time Complexity: O(N * k), where N is the length of nums.
 *                  In the worst case (k = N-1), this is O(N^2).
 * Space Complexity: O(1), as it performs in-place swaps.
 */
function rotateArray_bruteForce(nums, k) {
    const n = nums.length;
    k %= n; // Normalize k

    if (k === 0 || n === 0) {
        return;
    }

    // Perform k rotations. Each rotation moves the last element to the front.
    for (let i = 0; i < k; i++) {
        const lastElement = nums[n - 1]; // Store the last element

        // Shift all elements from right to left by one position
        for (let j = n - 1; j > 0; j--) {
            nums[j] = nums[j - 1];
        }

        nums[0] = lastElement; // Place the stored last element at the beginning
    }
}

module.exports = {
    rotateArray_bruteForce
};
```