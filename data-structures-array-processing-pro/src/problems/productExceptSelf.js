```javascript
/**
 * @fileoverview Problem: Product of Array Except Self
 * Given an integer array nums, return an array answer such that answer[i] is equal to
 * the product of all the elements of nums except nums[i].
 *
 * The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
 * You must write an algorithm that runs in O(n) time and without using the division operation.
 *
 * Constraints:
 * 2 <= nums.length <= 10^5
 * -30 <= nums[i] <= 30
 * The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
 */

/**
 * Approach 1: Using Division (Not allowed by problem constraints for optimal solution, but a valid approach if division is permitted).
 * This is the simplest approach if division is allowed.
 *
 * 1. Calculate the total product of all elements in the array.
 * 2. For each element `nums[i]`, `answer[i]` is `totalProduct / nums[i]`.
 * 3. Special handling for zeros:
 *    - If there are two or more zeros, all elements in `answer` will be 0.
 *    - If there is exactly one zero at index `k`, `answer[k]` will be the product of all non-zero elements, and all other `answer[i]` will be 0.
 *
 * @param {number[]} nums - The input array of numbers.
 * @returns {number[]} An array where `answer[i]` is the product of all elements except `nums[i]`.
 *
 * Time Complexity: O(N), for one pass to calculate total product and one pass to populate the result.
 * Space Complexity: O(1) (excluding the output array).
 */
function productExceptSelf_division(nums) {
    const n = nums.length;
    const answer = new Array(n).fill(0);

    let totalProduct = 1;
    let zeroCount = 0;
    let zeroIndex = -1;

    for (let i = 0; i < n; i++) {
        if (nums[i] === 0) {
            zeroCount++;
            zeroIndex = i;
        } else {
            totalProduct *= nums[i];
        }
    }

    if (zeroCount > 1) {
        // If more than one zero, all products will be zero
        return answer; // Already filled with zeros
    } else if (zeroCount === 1) {
        // If exactly one zero, only the element at zeroIndex will have a non-zero product
        answer[zeroIndex] = totalProduct; // totalProduct here is product of non-zero elements
        return answer;
    } else {
        // No zeros, use division
        for (let i = 0; i < n; i++) {
            answer[i] = totalProduct / nums[i];
        }
        return answer;
    }
}

/**
 * Approach 2: Two-Pass Prefix and Suffix Products (Optimal, O(N) Time, O(1) Space excluding output array).
 * This approach respects the constraint of not using division.
 *
 * It uses two passes:
 * 1. **First pass (Prefix products):** `answer[i]` will store the product of all elements to the left of `i`.
 *    - Initialize `answer[0]` to 1.
 *    - For `i` from 1 to `n-1`, `answer[i] = answer[i-1] * nums[i-1]`.
 *    After this pass, `answer` array looks like:
 *    `[1, nums[0], nums[0]*nums[1], nums[0]*nums[1]*nums[2], ...]`
 *
 * 2. **Second pass (Suffix products):** `answer[i]` is multiplied by the product of all elements to the right of `i`.
 *    - Initialize a `rightProduct` variable to 1.
 *    - For `i` from `n-1` down to 0:
 *      - `answer[i] = answer[i] * rightProduct;`
 *      - `rightProduct = rightProduct * nums[i];` (update `rightProduct` for the next iteration to the left)
 *
 * @param {number[]} nums - The input array of numbers.
 * @returns {number[]} An array where `answer[i]` is the product of all elements except `nums[i]`.
 *
 * Time Complexity: O(N), for two passes over the array.
 * Space Complexity: O(1), as the output array `answer` does not count towards extra space
 *                  (as per common interview conventions, or if it counts, then O(N)).
 *                  No additional arrays are created.
 */
function productExceptSelf_twoPass(nums) {
    const n = nums.length;
    const answer = new Array(n);

    // Pass 1: Calculate prefix products
    // answer[i] will store product of nums[0...i-1]
    answer[0] = 1;
    for (let i = 1; i < n; i++) {
        answer[i] = answer[i - 1] * nums[i - 1];
    }
    // After this loop, for nums = [1,2,3,4]:
    // answer will be [1, 1, 2, 6]

    // Pass 2: Calculate suffix products and combine
    // rightProduct will store product of nums[i+1...n-1]
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        // For each index i, answer[i] already has product of elements to its left.
        // Multiply it by the product of elements to its right (stored in rightProduct).
        answer[i] = answer[i] * rightProduct;

        // Update rightProduct for the next iteration (moving left)
        // rightProduct will include nums[i] for the next calculation
        rightProduct = rightProduct * nums[i];
    }
    // After this loop, for nums = [1,2,3,4]:
    // i=3: answer[3] = answer[3] * 1 = 6 * 1 = 6. rightProduct = 1 * nums[3] = 4. answer becomes [1,1,2,6]
    // i=2: answer[2] = answer[2] * 4 = 2 * 4 = 8. rightProduct = 4 * nums[2] = 12. answer becomes [1,1,8,6]
    // i=1: answer[1] = answer[1] * 12 = 1 * 12 = 12. rightProduct = 12 * nums[1] = 24. answer becomes [1,12,8,6]
    // i=0: answer[0] = answer[0] * 24 = 1 * 24 = 24. rightProduct = 24 * nums[0] = 24. answer becomes [24,12,8,6]

    return answer;
}

module.exports = {
    productExceptSelf_division, // Included for demonstrating a simpler but disallowed approach.
    productExceptSelf_twoPass
};
```