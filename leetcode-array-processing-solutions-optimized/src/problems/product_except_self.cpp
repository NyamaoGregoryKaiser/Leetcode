#include "array_manipulation.h"
#include <vector>

namespace ProductExceptSelf {

/**
 * @brief Calculates the product of all elements except self for each element in the array.
 * This approach uses two passes (prefix and suffix products) to achieve optimal time complexity
 * without using division.
 *
 * Algorithm:
 * 1. Initialize an `answer` array of the same size as `nums`, filled with 1s.
 * 2. Calculate prefix products: Iterate from left to right. `answer[i]` will store the product
 *    of all elements to the left of `nums[i]`.
 *    `answer[0]` is 1 (no elements to its left).
 *    `answer[i] = nums[i-1] * answer[i-1]` for `i > 0`.
 * 3. Calculate suffix products: Iterate from right to left. Maintain a `right_product` variable.
 *    For each `i`, `answer[i]` (which currently holds prefix product) is multiplied by `right_product`.
 *    Then, `right_product` is updated by multiplying it with `nums[i]`.
 *    `right_product` starts at 1 (no elements to its right for the last element).
 *
 * Example: nums = [1,2,3,4]
 * N = 4
 *
 * Initial:
 * answer = [1,1,1,1]
 *
 * Pass 1 (Prefix Products):
 * `left_product` starts at 1
 * i = 0: answer[0] = 1 (left_product) => answer = [1,1,1,1]
 *          left_product = 1 * nums[0] = 1 * 1 = 1
 * i = 1: answer[1] = left_product = 1 => answer = [1,1,1,1]
 *          left_product = 1 * nums[1] = 1 * 2 = 2
 * i = 2: answer[2] = left_product = 2 => answer = [1,1,2,1]
 *          left_product = 2 * nums[2] = 2 * 3 = 6
 * i = 3: answer[3] = left_product = 6 => answer = [1,1,2,6]
 *          left_product = 6 * nums[3] = 6 * 4 = 24
 * After Pass 1: answer = [1,1,2,6] (These are products of elements *to the left*)
 *
 * Pass 2 (Suffix Products):
 * `right_product` starts at 1
 * i = 3: answer[3] = answer[3] * right_product = 6 * 1 = 6 => answer = [1,1,2,6]
 *          right_product = 1 * nums[3] = 1 * 4 = 4
 * i = 2: answer[2] = answer[2] * right_product = 2 * 4 = 8 => answer = [1,1,8,6]
 *          right_product = 4 * nums[2] = 4 * 3 = 12
 * i = 1: answer[1] = answer[1] * right_product = 1 * 12 = 12 => answer = [1,12,8,6]
 *          right_product = 12 * nums[1] = 12 * 2 = 24
 * i = 0: answer[0] = answer[0] * right_product = 1 * 24 = 24 => answer = [24,12,8,6]
 *          right_product = 24 * nums[0] = 24 * 1 = 24
 * After Pass 2: answer = [24,12,8,6] (Final result)
 *
 * @param nums The input array of integers.
 * @return A new vector where `answer[i]` is the product of all elements except `nums[i]`.
 *
 * @complexity
 *   Time: O(N), where N is the number of elements in `nums`. We iterate through the array twice.
 *   Space: O(1) auxiliary space, if the output array `answer` does not count towards extra space.
 *          If it counts, then O(N) for the result array. The problem statement usually implies
 *          that the output array space is not counted.
 */
std::vector<int> productExceptSelf_approach1(const std::vector<int>& nums) {
    int n = nums.size();
    if (n == 0) {
        return {};
    }

    std::vector<int> answer(n);

    // Pass 1: Calculate prefix products
    // answer[i] stores product of elements to the left of nums[i]
    // For answer[0], there are no elements to the left, so product is 1
    answer[0] = 1;
    for (int i = 1; i < n; ++i) {
        answer[i] = nums[i - 1] * answer[i - 1];
    }

    // Pass 2: Calculate suffix products and combine with prefix products
    // right_product stores product of elements to the right of nums[i]
    int right_product = 1;
    for (int i = n - 1; i >= 0; --i) {
        // For each element, answer[i] already has the product of elements to its left.
        // Multiply it by the product of elements to its right (right_product).
        answer[i] *= right_product;
        // Update right_product for the next iteration (to the left).
        right_product *= nums[i];
    }

    return answer;
}

} // namespace ProductExceptSelf
---