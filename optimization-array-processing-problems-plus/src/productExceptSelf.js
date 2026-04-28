/**
 * @fileoverview Solutions for the "Product of Array Except Self" problem.
 *
 * Problem Description:
 * Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to
 * the product of all the elements of `nums` except `nums[i]`.
 * The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.
 * You must write an algorithm that runs in `O(n)` time and without using the division operation.
 *
 * Examples:
 * 1. Input: nums = [1,2,3,4]
 *    Output: [24,12,8,6]
 * 2. Input: nums = [-1,1,0,-3,3]
 *    Output: [0,0,9,0,0]
 */

/**
 * Calculates the product of all elements except self using the optimal O(N) time
 * and O(1) auxiliary space (output array doesn't count) approach.
 * This method avoids division.
 *
 * Algorithm:
 * 1. Initialize an `answer` array of the same size as `nums`, filled with 1s.
 * 2. Calculate prefix products:
 *    Iterate from left to right. `answer[i]` will store the product of elements to its left.
 *    `answer[i] = product of nums[0]...nums[i-1]`.
 * 3. Calculate suffix products and combine with prefix products:
 *    Initialize a `R` variable (right product) to 1.
 *    Iterate from right to left.
 *    `answer[i]` is now `(product of elements to its left) * (product of elements to its right)`.
 *    The product of elements to its right is `R`.
 *    Update `R` by multiplying it with `nums[i]`.
 *
 * Example: nums = [1,2,3,4]
 * n = 4
 * answer = [1,1,1,1]
 *
 * Pass 1 (Left-to-Right - Prefix Products):
 * let_product = 1
 * i=0: answer[0] = 1 (left_product); left_product = 1 * nums[0] = 1 * 1 = 1
 * i=1: answer[1] = 1 (left_product); left_product = 1 * nums[1] = 1 * 2 = 2
 * i=2: answer[2] = 2 (left_product); left_product = 2 * nums[2] = 2 * 3 = 6
 * i=3: answer[3] = 6 (left_product); left_product = 6 * nums[3] = 6 * 4 = 24
 *
 * After Pass 1: answer = [1, 1, 2, 6] (These are the prefix products up to i-1)
 *
 * Pass 2 (Right-to-Left - Suffix Products combined with Prefix):
 * right_product = 1
 * i=3: answer[3] = answer[3] * right_product = 6 * 1 = 6; right_product = 1 * nums[3] = 1 * 4 = 4
 * i=2: answer[2] = answer[2] * right_product = 2 * 4 = 8; right_product = 4 * nums[2] = 4 * 3 = 12
 * i=1: answer[1] = answer[1] * right_product = 1 * 12 = 12; right_product = 12 * nums[1] = 12 * 2 = 24
 * i=0: answer[0] = answer[0] * right_product = 1 * 24 = 24; right_product = 24 * nums[0] = 24 * 1 = 24
 *
 * Final answer: [24,12,8,6]
 *
 * @param {number[]} nums The input array of numbers.
 * @returns {number[]} An array where `answer[i]` is the product of all elements of `nums` except `nums[i]`.
 *
 * Time Complexity: O(N), where N is the length of the array. We iterate through the array twice.
 * Space Complexity: O(1) auxiliary space (the output array does not count towards extra space).
 *                   If the output array *does* count, then O(N).
 */
function productExceptSelfOptimal(nums) {
    const n = nums.length;
    const answer = new Array(n).fill(1); // Initialize answer array with 1s

    // Calculate prefix products and store them in the answer array
    // answer[i] will contain product of nums[0]...nums[i-1]
    let prefixProduct = 1;
    for (let i = 0; i < n; i++) {
        answer[i] = prefixProduct;
        prefixProduct *= nums[i];
    }
    // After this loop, answer = [1, nums[0], nums[0]*nums[1], ...]

    // Calculate suffix products and multiply them with the existing prefix products in answer array
    // answer[i] = (product of elements to its left) * (product of elements to its right)
    let suffixProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        answer[i] *= suffixProduct; // Multiply with suffix product from right
        suffixProduct *= nums[i];
    }
    // After this loop, answer contains the final result.

    return answer;
}

/**
 * Calculates the product of all elements except self using a brute-force approach.
 * This method uses nested loops and is less efficient.
 *
 * Algorithm:
 * 1. Initialize an `answer` array of the same size as `nums`.
 * 2. For each element at index `i`:
 *    Initialize a `currentProduct` to 1.
 *    Iterate through the `nums` array with index `j`.
 *    If `i` is not equal to `j`, multiply `currentProduct` by `nums[j]`.
 * 3. Store `currentProduct` in `answer[i]`.
 *
 * @param {number[]} nums The input array of numbers.
 * @returns {number[]} An array where `answer[i]` is the product of all elements of `nums` except `nums[i]`.
 *
 * Time Complexity: O(N^2), where N is the length of the array, due to nested loops.
 * Space Complexity: O(N) for the output array.
 */
function productExceptSelfBruteForce(nums) {
    const n = nums.length;
    const answer = new Array(n);

    for (let i = 0; i < n; i++) {
        let currentProduct = 1;
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                currentProduct *= nums[j];
            }
        }
        answer[i] = currentProduct;
    }

    return answer;
}

module.exports = {
    productExceptSelfOptimal,
    productExceptSelfBruteForce
};