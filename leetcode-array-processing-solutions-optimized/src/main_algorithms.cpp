```cpp
#include <vector>
#include <numeric> // For std::accumulate
#include <algorithm> // For std::max, std::min, std::swap, std::reverse
#include <stack> // For Trapping Rain Water (Stack approach)

namespace ArrayManipulation {

// --- Problem 1: Maximum Subarray Sum (Kadane's Algorithm) ---
// Given an integer array nums, find the contiguous subarray (containing at least one number)
// which has the largest sum and return its sum.
namespace MaxSubarraySum {

    /**
     * @brief Optimal solution for Maximum Subarray Sum using Kadane's Algorithm.
     *
     * This algorithm iterates through the array, keeping track of the current maximum sum
     * ending at the current position, and the overall maximum sum found so far.
     * If the current sum becomes negative, it's reset to 0 because a negative sum
     * will only decrease the sum of any subsequent subarray.
     *
     * Example: nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
     * Iteration:
     * i=0: num=-2. current_max=max(-2, -2)=-2. global_max=max(-2, -2)=-2.
     * i=1: num=1. current_max=max(1, -2+1)=1. global_max=max(-2, 1)=1.
     * i=2: num=-3. current_max=max(-3, 1-3)=-2. global_max=max(1, -2)=1.
     *      (Reset current_max if it implies not starting a new subarray makes it better)
     *      A common variant of Kadane's handles negative `current_max` by restarting
     *      the sum from the current element if `current_max` goes below 0.
     *      Here, `current_max = max(num, current_max + num)` correctly applies this.
     *      For this problem, if all numbers are negative, the largest sum is the largest single element.
     *      Initialize `global_max` and `current_max` with `nums[0]`.
     *
     * Let's refine for `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]`
     * current_max = nums[0] = -2
     * global_max = nums[0] = -2
     *
     * i=1, num=1:
     *   current_max = max(1, -2+1) = max(1, -1) = 1
     *   global_max = max(-2, 1) = 1
     * i=2, num=-3:
     *   current_max = max(-3, 1-3) = max(-3, -2) = -2
     *   global_max = max(1, -2) = 1
     * i=3, num=4:
     *   current_max = max(4, -2+4) = max(4, 2) = 4
     *   global_max = max(1, 4) = 4
     * i=4, num=-1:
     *   current_max = max(-1, 4-1) = max(-1, 3) = 3
     *   global_max = max(4, 3) = 4
     * i=5, num=2:
     *   current_max = max(2, 3+2) = max(2, 5) = 5
     *   global_max = max(4, 5) = 5
     * i=6, num=1:
     *   current_max = max(1, 5+1) = max(1, 6) = 6
     *   global_max = max(5, 6) = 6
     * i=7, num=-5:
     *   current_max = max(-5, 6-5) = max(-5, 1) = 1
     *   global_max = max(6, 1) = 6
     * i=8, num=4:
     *   current_max = max(4, 1+4) = max(4, 5) = 5
     *   global_max = max(6, 5) = 6
     *
     * Corrected Logic (common implementation):
     * Initialize `max_so_far = -infinity`, `current_max = 0`.
     * Iterate: `current_max += num`. If `current_max > max_so_far`, `max_so_far = current_max`.
     * If `current_max < 0`, `current_max = 0`. This doesn't work for all negative numbers.
     *
     * The standard Kadane's handles all-negative arrays correctly if `max_so_far` is initialized
     * with the first element and `current_max` with the first element, then loop from the second.
     * Or, initialize `max_so_far` to `INT_MIN` (or `nums[0]`) and `current_max` to `0`. If all numbers are negative,
     * `max_so_far` will be updated to the largest negative number when `current_max` is updated.
     *
     * A more robust way:
     * Initialize `max_so_far = nums[0]`, `current_max = nums[0]`.
     * For i from 1 to n-1:
     *   `current_max = max(nums[i], current_max + nums[i])`
     *   `max_so_far = max(max_so_far, current_max)`
     *
     * @param nums The input integer array.
     * @return The maximum subarray sum.
     *
     * @complexity
     * Time: O(N) - We iterate through the array once.
     * Space: O(1) - We use a few constant extra variables.
     */
    int kadanesAlgorithm(const std::vector<int>& nums) {
        if (nums.empty()) {
            // According to problem statement "containing at least one number",
            // an empty array is an invalid input or should return specific value.
            // For competitive programming, usually assume non-empty.
            return 0; // Or throw an exception
        }

        int max_so_far = nums[0];
        int current_max = nums[0];

        for (size_t i = 1; i < nums.size(); ++i) {
            current_max = std::max(nums[i], current_max + nums[i]);
            max_so_far = std::max(max_so_far, current_max);
        }

        return max_so_far;
    }

} // namespace MaxSubarraySum

// --- Problem 2: Product of Array Except Self ---
// Given an integer array nums, return an array answer such that answer[i] is equal
// to the product of all the elements of nums except nums[i].
// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
// You must write an algorithm that runs in O(n) time and without using the division operation.
namespace ProductExceptSelf {

    /**
     * @brief Optimal solution for Product of Array Except Self using two passes.
     *
     * The core idea is to calculate prefix products and suffix products separately.
     * For an element at index `i`, its result will be (product of elements to its left) * (product of elements to its right).
     *
     * Approach:
     * 1. Initialize an `answer` array of the same size as `nums`, filled with 1s.
     * 2. First pass (left to right): Calculate prefix products.
     *    `answer[i]` will store the product of all elements to the left of `nums[i]`.
     *    Initialize a `left_product` variable to 1.
     *    For `i` from 0 to `n-1`:
     *      `answer[i] = left_product`
     *      `left_product *= nums[i]`
     *    After this pass, `answer[i]` contains `nums[0] * ... * nums[i-1]`.
     *    For `i=0`, `answer[0]` is correctly 1 (empty prefix product).
     *
     * 3. Second pass (right to left): Calculate suffix products and combine with prefix products.
     *    Initialize a `right_product` variable to 1.
     *    For `i` from `n-1` down to 0:
     *      `answer[i] *= right_product` (multiply with existing left product)
     *      `right_product *= nums[i]`
     *    After this pass, `answer[i]` contains `(nums[0] * ... * nums[i-1]) * (nums[i+1] * ... * nums[n-1])`,
     *    which is the desired result.
     *
     * Example: nums = [1, 2, 3, 4]
     * n = 4
     * answer = [1, 1, 1, 1]
     *
     * First Pass (left_product):
     * i=0: answer[0] = 1 (left_product). left_product = 1 * nums[0] = 1 * 1 = 1. answer = [1, 1, 1, 1]
     * i=1: answer[1] = 1 (left_product). left_product = 1 * nums[1] = 1 * 2 = 2. answer = [1, 1, 1, 1]
     * i=2: answer[2] = 2 (left_product). left_product = 2 * nums[2] = 2 * 3 = 6. answer = [1, 1, 2, 1]
     * i=3: answer[3] = 6 (left_product). left_product = 6 * nums[3] = 6 * 4 = 24. answer = [1, 1, 2, 6]
     * After first pass: answer = [1, 1, 2, 6] (left products: [1, 1, 2, 6])
     *
     * Second Pass (right_product):
     * i=3: answer[3] = 6 * 1 (right_product) = 6. right_product = 1 * nums[3] = 1 * 4 = 4. answer = [1, 1, 2, 6]
     * i=2: answer[2] = 2 * 4 (right_product) = 8. right_product = 4 * nums[2] = 4 * 3 = 12. answer = [1, 1, 8, 6]
     * i=1: answer[1] = 1 * 12 (right_product) = 12. right_product = 12 * nums[1] = 12 * 2 = 24. answer = [1, 12, 8, 6]
     * i=0: answer[0] = 1 * 24 (right_product) = 24. right_product = 24 * nums[0] = 24 * 1 = 24. answer = [24, 12, 8, 6]
     * Final answer: [24, 12, 8, 6]
     *
     * @param nums The input integer array.
     * @return An array where answer[i] is the product of all elements except nums[i].
     *
     * @complexity
     * Time: O(N) - Two passes over the array.
     * Space: O(1) - The output array does not count as extra space per problem constraints.
     *              We use only a few constant variables (`left_product`, `right_product`).
     */
    std::vector<int> productExceptSelfOptimal(const std::vector<int>& nums) {
        int n = nums.size();
        if (n == 0) return {};
        if (n == 1) return {1}; // Or as per specific problem edge case, usually product of empty set is 1.

        std::vector<int> answer(n, 1);

        // Calculate left products
        int left_product = 1;
        for (int i = 0; i < n; ++i) {
            answer[i] = left_product;
            left_product *= nums[i];
        }

        // Calculate right products and combine
        int right_product = 1;
        for (int i = n - 1; i >= 0; --i) {
            answer[i] *= right_product;
            right_product *= nums[i];
        }

        return answer;
    }

} // namespace ProductExceptSelf

// --- Problem 3: Trapping Rain Water ---
// Given n non-negative integers representing an elevation map where the width of each bar is 1,
// compute how much water it can trap after raining.
namespace TrappingRainWater {

    /**
     * @brief Optimal solution for Trapping Rain Water using the Two-Pointer technique.
     *
     * This approach optimizes the O(N) space DP solution to O(1) space.
     * We observe that the amount of water trapped at an index `i` is `min(left_max[i], right_max[i]) - height[i]`.
     * In the two-pointer approach, we maintain `max_left` and `max_right` from the current
     * left and right pointers.
     * We move the pointer whose corresponding max is smaller. Why?
     * If `max_left < max_right`:
     *   The water trapped at `left` depends on `max_left` and `max_right`.
     *   Since `max_left` is smaller, it's the limiting factor. The actual `max_right` for `left`
     *   will be at least `max_right` (current) or higher, so `max_left` will indeed be `min(left_max[left], right_max[left])`.
     *   We can calculate water at `left` and then move `left` pointer.
     * If `max_right <= max_left`:
     *   Similarly, `max_right` is the limiting factor for `right`.
     *   We calculate water at `right` and move `right` pointer.
     *
     * Variables:
     * `left`: Left pointer, starting at 0.
     * `right`: Right pointer, starting at n-1.
     * `max_left`: Maximum height encountered from the left up to `left` pointer.
     * `max_right`: Maximum height encountered from the right up to `right` pointer.
     * `total_water`: Accumulator for trapped water.
     *
     * Example: height = [0,1,0,2,1,0,1,3,2,1,2,1]
     *
     * Initial: left=0, right=11, max_left=0, max_right=0, total_water=0
     *
     * Loop:
     * 1. height[left]=0, height[right]=1. max_left=0, max_right=1.
     *    max_left <= max_right (0 <= 1) is true.
     *    `left` is processed. water = max(0, max_left - height[left]) = max(0, 0-0) = 0.
     *    total_water += 0. left++. max_left = max(0, height[0]) = 0.
     *    (max_left needs to be updated with `height[left]` *before* `left++` or updated using `height[left]` after).
     *    Let's use `max_left = max(max_left, height[left])`
     *
     * Corrected Logic:
     * left = 0, right = n - 1
     * max_left = 0, max_right = 0
     * trapped_water = 0
     *
     * While left <= right:
     *   If height[left] < height[right]:
     *     If height[left] >= max_left: max_left = height[left]
     *     Else: trapped_water += max_left - height[left]
     *     left++
     *   Else (height[right] <= height[left]):
     *     If height[right] >= max_right: max_right = height[right]
     *     Else: trapped_water += max_right - height[right]
     *     right--
     *
     * Example Dry Run with `[0,1,0,2,1,0,1,3,2,1,2,1]`
     * n=12
     * left=0, right=11, max_left=0, max_right=0, water=0
     *
     * 1. height[0]=0, height[11]=1. height[left] < height[right] (0 < 1).
     *    height[0] (0) >= max_left (0) -> max_left = 0.
     *    left=1.
     *
     * 2. height[1]=1, height[11]=1. height[left] <= height[right] (1 <= 1).
     *    height[11] (1) >= max_right (0) -> max_right = 1.
     *    right=10.
     *
     * 3. height[1]=1, height[10]=2. height[left] < height[right] (1 < 2).
     *    height[1] (1) >= max_left (0) -> max_left = 1.
     *    left=2.
     *
     * 4. height[2]=0, height[10]=2. height[left] < height[right] (0 < 2).
     *    height[2] (0) < max_left (1) -> water += 1 - 0 = 1.
     *    left=3. water=1.
     *
     * 5. height[3]=2, height[10]=2. height[left] <= height[right] (2 <= 2).
     *    height[10] (2) >= max_right (1) -> max_right = 2.
     *    right=9.
     *
     * 6. height[3]=2, height[9]=1. height[left] > height[right] (2 > 1).
     *    height[9] (1) < max_right (2) -> water += 2 - 1 = 1. water=1+1=2.
     *    right=8.
     *
     * 7. height[3]=2, height[8]=2. height[left] <= height[right] (2 <= 2).
     *    height[8] (2) >= max_right (2) -> max_right = 2.
     *    right=7.
     *
     * 8. height[3]=2, height[7]=3. height[left] < height[right] (2 < 3).
     *    height[3] (2) >= max_left (1) -> max_left = 2.
     *    left=4.
     *
     * 9. height[4]=1, height[7]=3. height[left] < height[right] (1 < 3).
     *    height[4] (1) < max_left (2) -> water += 2 - 1 = 1. water=2+1=3.
     *    left=5.
     *
     * 10. height[5]=0, height[7]=3. height[left] < height[right] (0 < 3).
     *     height[5] (0) < max_left (2) -> water += 2 - 0 = 2. water=3+2=5.
     *     left=6.
     *
     * 11. height[6]=1, height[7]=3. height[left] < height[right] (1 < 3).
     *     height[6] (1) < max_left (2) -> water += 2 - 1 = 1. water=5+1=6.
     *     left=7.
     *
     * 12. left=7, right=7. Loop terminates (left > right is now false, as left and right meet).
     *     Actually, it should continue `while left < right`.
     *     When left == right, no water can be trapped. So `while (left < right)`
     *
     * Redo with `while (left < right)`:
     * left=0, right=11, max_left=0, max_right=0, water=0
     *
     * 1. (0<11). h[0]=0, h[11]=1. h[0]<h[11]. max_left=max(0,0)=0. water+=0. left=1.
     * 2. (1<11). h[1]=1, h[11]=1. h[1]<=h[11]. max_right=max(0,1)=1. water+=0. right=10.
     * 3. (1<10). h[1]=1, h[10]=2. h[1]<h[10]. max_left=max(0,1)=1. water+=0. left=2.
     * 4. (2<10). h[2]=0, h[10]=2. h[2]<h[10]. h[2](0) < max_left(1). water+=1-0=1. left=3. water=1.
     * 5. (3<10). h[3]=2, h[10]=2. h[3]<=h[10]. max_right=max(1,2)=2. water+=0. right=9.
     * 6. (3<9). h[3]=2, h[9]=1. h[3]>h[9]. h[9](1) < max_right(2). water+=2-1=1. right=8. water=2.
     * 7. (3<8). h[3]=2, h[8]=2. h[3]<=h[8]. max_right=max(2,2)=2. water+=0. right=7.
     * 8. (3<7). h[3]=2, h[7]=3. h[3]<h[7]. max_left=max(1,2)=2. water+=0. left=4.
     * 9. (4<7). h[4]=1, h[7]=3. h[4]<h[7]. h[4](1) < max_left(2). water+=2-1=1. left=5. water=3.
     * 10. (5<7). h[5]=0, h[7]=3. h[5]<h[7]. h[5](0) < max_left(2). water+=2-0=2. left=6. water=5.
     * 11. (6<7). h[6]=1, h[7]=3. h[6]<h[7]. h[6](1) < max_left(2). water+=2-1=1. left=7. water=6.
     * 12. (7<7) is false. Loop terminates.
     * Final water = 6. This is correct for the example!
     *
     * @param height The elevation map.
     * @return The total amount of trapped rain water.
     *
     * @complexity
     * Time: O(N) - Single pass with two pointers.
     * Space: O(1) - Constant extra variables.
     */
    int trapRainWaterTwoPointers(const std::vector<int>& height) {
        if (height.empty()) {
            return 0;
        }

        int left = 0;
        int right = height.size() - 1;
        int max_left = 0;
        int max_right = 0;
        int trapped_water = 0;

        while (left < right) {
            if (height[left] < height[right]) {
                // If the left bar is shorter, its potential water is limited by max_left
                // because max_right is guaranteed to be >= height[right] which is > height[left].
                if (height[left] >= max_left) {
                    max_left = height[left];
                } else {
                    trapped_water += max_left - height[left];
                }
                left++;
            } else {
                // If the right bar is shorter or equal, its potential water is limited by max_right.
                if (height[right] >= max_right) {
                    max_right = height[right];
                } else {
                    trapped_water += max_right - height[right];
                }
                right--;
            }
        }

        return trapped_water;
    }

    /**
     * @brief Trapping Rain Water using a Monotonic Stack.
     *
     * This approach processes bars one by one and uses a stack to keep track of
     * bars that might be able to trap water. The stack stores indices of bars in
     * decreasing order of height (monotonic decreasing stack).
     *
     * When we encounter a bar `height[i]` that is taller than the top of the stack:
     * 1. Pop the top element `prev_idx` from the stack. This `height[prev_idx]` is a "bottom" or "middle" bar.
     * 2. If the stack is not empty, it means we found a `left_boundary` (the new stack top)
     *    and `height[i]` acts as the `right_boundary`.
     * 3. The water trapped above `height[prev_idx]` is calculated using:
     *    `distance = i - stack.top() - 1` (width of the water block)
     *    `min_height = std::min(height[i], height[stack.top()]) - height[prev_idx]` (height of water)
     *    `water = distance * min_height`
     * 4. Repeat until stack is empty or `height[i]` is no longer taller than stack top.
     * 5. Push `i` onto the stack.
     *
     * Example: height = [0,1,0,2,1,0,1,3,2,1,2,1]
     * total_water = 0, stack = []
     *
     * i=0, h[0]=0: Push 0. stack=[0]
     * i=1, h[1]=1: h[1] > h[stack.top()]=h[0]=0.
     *   Pop 0. prev_idx=0.
     *   Stack not empty? No (now empty).
     *   Push 1. stack=[1]
     *
     * i=2, h[2]=0: h[2] < h[stack.top()]=h[1]=1. Push 2. stack=[1, 2]
     *
     * i=3, h[3]=2: h[3] > h[stack.top()]=h[2]=0.
     *   Pop 2. prev_idx=2.
     *   Stack not empty? Yes. left_boundary_idx=stack.top()=1.
     *   width = i - left_boundary_idx - 1 = 3 - 1 - 1 = 1.
     *   water_height = min(h[i], h[left_boundary_idx]) - h[prev_idx] = min(h[3], h[1]) - h[2] = min(2, 1) - 0 = 1 - 0 = 1.
     *   water_trapped = 1 * 1 = 1. total_water = 1.
     *   (h[3]=2) > (h[stack.top()]=h[1]=1). Pop 1. prev_idx=1.
     *   Stack empty? Yes. Break inner loop.
     *   Push 3. stack=[3]
     *
     * i=4, h[4]=1: h[4] < h[stack.top()]=h[3]=2. Push 4. stack=[3, 4]
     * i=5, h[5]=0: h[5] < h[stack.top()]=h[4]=1. Push 5. stack=[3, 4, 5]
     *
     * i=6, h[6]=1: h[6] == h[stack.top()]=h[5]=0 -> WRONG, h[6] > h[5].
     *   Pop 5. prev_idx=5.
     *   Stack not empty? Yes. left_boundary_idx=stack.top()=4.
     *   width = 6 - 4 - 1 = 1.
     *   water_height = min(h[6], h[4]) - h[5] = min(1, 1) - 0 = 1.
     *   water_trapped = 1 * 1 = 1. total_water = 1 + 1 = 2.
     *   (h[6]=1) == (h[stack.top()]=h[4]=1). No pop.
     *   Push 6. stack=[3, 4, 6]
     *
     * i=7, h[7]=3: h[7] > h[stack.top()]=h[6]=1.
     *   Pop 6. prev_idx=6.
     *   Stack not empty? Yes. left_boundary_idx=stack.top()=4.
     *   width = 7 - 4 - 1 = 2.
     *   water_height = min(h[7], h[4]) - h[6] = min(3, 1) - 1 = 1 - 1 = 0.
     *   water_trapped = 2 * 0 = 0. total_water = 2.
     *   (h[7]=3) > (h[stack.top()]=h[4]=1). Pop 4. prev_idx=4.
     *   Stack not empty? Yes. left_boundary_idx=stack.top()=3.
     *   width = 7 - 3 - 1 = 3.
     *   water_height = min(h[7], h[3]) - h[4] = min(3, 2) - 1 = 2 - 1 = 1.
     *   water_trapped = 3 * 1 = 3. total_water = 2 + 3 = 5.
     *   (h[7]=3) > (h[stack.top()]=h[3]=2). Pop 3. prev_idx=3.
     *   Stack empty? Yes. Break inner loop.
     *   Push 7. stack=[7]
     *
     * i=8, h[8]=2: h[8] < h[stack.top()]=h[7]=3. Push 8. stack=[7, 8]
     * i=9, h[9]=1: h[9] < h[stack.top()]=h[8]=2. Push 9. stack=[7, 8, 9]
     *
     * i=10, h[10]=2: h[10] > h[stack.top()]=h[9]=1.
     *   Pop 9. prev_idx=9.
     *   Stack not empty? Yes. left_boundary_idx=stack.top()=8.
     *   width = 10 - 8 - 1 = 1.
     *   water_height = min(h[10], h[8]) - h[9] = min(2, 2) - 1 = 2 - 1 = 1.
     *   water_trapped = 1 * 1 = 1. total_water = 5 + 1 = 6.
     *   (h[10]=2) == (h[stack.top()]=h[8]=2). No pop.
     *   Push 10. stack=[7, 8, 10]
     *
     * i=11, h[11]=1: h[11] < h[stack.top()]=h[10]=2. Push 11. stack=[7, 8, 10, 11]
     *
     * End of loop. total_water = 6. Correct!
     *
     * @param height The elevation map.
     * @return The total amount of trapped rain water.
     *
     * @complexity
     * Time: O(N) - Each element is pushed and popped from the stack at most once.
     * Space: O(N) - In the worst case (e.g., [5,4,3,2,1]), the stack can store all indices.
     */
    int trapRainWaterStack(const std::vector<int>& height) {
        if (height.empty()) {
            return 0;
        }

        std::stack<int> s; // Stores indices of bars
        int total_water = 0;

        for (int i = 0; i < height.size(); ++i) {
            // While stack is not empty and current bar is taller than the bar at stack top
            while (!s.empty() && height[i] > height[s.top()]) {
                int bottom_bar_idx = s.top();
                s.pop();

                if (s.empty()) {
                    // No left boundary, cannot trap water with this bottom bar
                    break;
                }

                int left_boundary_idx = s.top();
                int distance = i - left_boundary_idx - 1; // Width of the pool
                int min_wall_height = std::min(height[i], height[left_boundary_idx]) - height[bottom_bar_idx];
                total_water += distance * min_wall_height;
            }
            s.push(i); // Push current bar's index
        }

        return total_water;
    }

} // namespace TrappingRainWater

// --- Problem 4: Rotate Array ---
// Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.
namespace RotateArray {

    /**
     * @brief Optimal solution for Rotate Array using the Reversal method.
     *
     * The strategy is based on reversing parts of the array.
     * To rotate `[1,2,3,4,5,6,7]` by `k=3` steps:
     * 1. Normalize `k` to be within array bounds: `k = k % n`.
     * 2. Reverse the entire array: `[7,6,5,4,3,2,1]`
     * 3. Reverse the first `k` elements: `[5,6,7,4,3,2,1]` (reverse `[7,6,5]`)
     * 4. Reverse the remaining `n-k` elements: `[5,6,7,1,2,3,4]` (reverse `[4,3,2,1]`)
     * This achieves the desired right rotation.
     *
     * Example: nums = [1,2,3,4,5,6,7], k = 3
     * n = 7
     * k = 3 % 7 = 3
     *
     * 1. Reverse all: [7,6,5,4,3,2,1]
     * 2. Reverse first k=3 elements (indices 0 to 2):
     *    `std::reverse(nums.begin(), nums.begin() + k)`
     *    `[7,6,5]` becomes `[5,6,7]` -> `[5,6,7,4,3,2,1]`
     * 3. Reverse remaining n-k=4 elements (indices 3 to 6):
     *    `std::reverse(nums.begin() + k, nums.end())`
     *    `[4,3,2,1]` becomes `[1,2,3,4]` -> `[5,6,7,1,2,3,4]`
     *
     * @param nums The integer array to be rotated (modified in-place).
     * @param k The number of steps to rotate to the right.
     *
     * @complexity
     * Time: O(N) - Three reversals, each taking O(N) time.
     * Space: O(1) - All operations are performed in-place.
     */
    void rotateReversal(std::vector<int>& nums, int k) {
        int n = nums.size();
        if (n == 0 || k == 0) {
            return;
        }

        k %= n; // Normalize k to be within [0, n-1]

        // 1. Reverse the entire array
        std::reverse(nums.begin(), nums.end());

        // 2. Reverse the first k elements
        std::reverse(nums.begin(), nums.begin() + k);

        // 3. Reverse the remaining n-k elements
        std::reverse(nums.begin() + k, nums.end());
    }

    /**
     * @brief Alternative solution for Rotate Array using a Temporary Array.
     *
     * This method copies elements to a new position, wrapping around if needed.
     * The element at index `i` moves to `(i + k) % n`.
     *
     * Approach:
     * 1. Create a new temporary array `temp` of the same size.
     * 2. Iterate through the original `nums` array. For each element `nums[i]`:
     *    Place it into `temp[(i + k) % n]`.
     * 3. Copy all elements from `temp` back to `nums`.
     *
     * Example: nums = [1,2,3,4,5,6,7], k = 3
     * n = 7
     * k = 3 % 7 = 3
     * temp = [_,_,_,_,_,_,_]
     *
     * i=0, nums[0]=1: temp[(0+3)%7] = temp[3] = 1. temp = [_,_,_,1,_,_,_]
     * i=1, nums[1]=2: temp[(1+3)%7] = temp[4] = 2. temp = [_,_,_,1,2,_,_]
     * i=2, nums[2]=3: temp[(2+3)%7] = temp[5] = 3. temp = [_,_,_,1,2,3,_]
     * i=3, nums[3]=4: temp[(3+3)%7] = temp[6] = 4. temp = [_,_,_,1,2,3,4]
     * i=4, nums[4]=5: temp[(4+3)%7] = temp[0] = 5. temp = [5,_,_,1,2,3,4]
     * i=5, nums[5]=6: temp[(5+3)%7] = temp[1] = 6. temp = [5,6,_,1,2,3,4]
     * i=6, nums[6]=7: temp[(6+3)%7] = temp[2] = 7. temp = [5,6,7,1,2,3,4]
     *
     * Copy temp back to nums. nums becomes [5,6,7,1,2,3,4].
     *
     * @param nums The integer array to be rotated (modified in-place).
     * @param k The number of steps to rotate to the right.
     *
     * @complexity
     * Time: O(N) - One pass to copy to temp, one pass to copy back.
     * Space: O(N) - A temporary array of size N is used.
     */
    void rotateTempArray(std::vector<int>& nums, int k) {
        int n = nums.size();
        if (n == 0 || k == 0) {
            return;
        }

        k %= n;

        std::vector<int> temp(n);
        for (int i = 0; i < n; ++i) {
            temp[(i + k) % n] = nums[i];
        }

        nums = temp; // Or use std::copy(temp.begin(), temp.end(), nums.begin());
    }

} // namespace RotateArray

// --- Problem 5: Merge Sorted Arrays ---
// You are given two integer arrays nums1 and nums2, sorted in non-decreasing order,
// and two integers m and n, representing the number of elements in nums1 and nums2 respectively.
// Merge nums2 into nums1 as one sorted array.
// The final sorted array should not be returned by the function, but instead be stored inside the array nums1.
// To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements
// that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.
namespace MergeSortedArrays {

    /**
     * @brief Optimal solution for Merge Sorted Arrays using the Two-Pointer (from end) technique.
     *
     * Merging from the beginning typically requires shifting elements in `nums1`
     * to make space, which can be O(m*n).
     * Since `nums1` has enough space at the end, we can merge from the end of both arrays.
     *
     * Approach:
     * 1. Initialize three pointers:
     *    `p1`: points to the last valid element in `nums1` (index `m-1`).
     *    `p2`: points to the last element in `nums2` (index `n-1`).
     *    `write_idx`: points to the last available position in `nums1` (index `m+n-1`).
     * 2. While `p1` and `p2` are both valid (>=0):
     *    Compare `nums1[p1]` and `nums2[p2]`.
     *    Place the larger element into `nums1[write_idx]`.
     *    Decrement the pointer of the element placed and `write_idx`.
     * 3. If there are remaining elements in `nums2` (i.e., `p2 >= 0`):
     *    Copy them directly to `nums1` starting from `write_idx` downwards.
     *    (No need to handle remaining elements in `nums1` because they are already in place and sorted).
     *
     * Example: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
     * Initial:
     * p1 = m-1 = 2 (points to 3)
     * p2 = n-1 = 2 (points to 6)
     * write_idx = m+n-1 = 5
     * nums1 = [1,2,3,0,0,0]
     * nums2 = [2,5,6]
     *
     * Loop:
     * 1. p1=2, p2=2, write_idx=5. nums1[2]=3, nums2[2]=6.
     *    6 > 3. nums1[5] = 6. p2=1, write_idx=4.
     *    nums1 = [1,2,3,0,0,6]
     *
     * 2. p1=2, p2=1, write_idx=4. nums1[2]=3, nums2[1]=5.
     *    5 > 3. nums1[4] = 5. p2=0, write_idx=3.
     *    nums1 = [1,2,3,0,5,6]
     *
     * 3. p1=2, p2=0, write_idx=3. nums1[2]=3, nums2[0]=2.
     *    3 >= 2. nums1[3] = 3. p1=1, write_idx=2.
     *    nums1 = [1,2,3,3,5,6]
     *
     * After loop: p1=1, p2=0, write_idx=2.
     * p2 is still >= 0. Copy remaining nums2 elements:
     *
     * While p2 >= 0:
     * 1. p2=0, write_idx=2. nums1[2] = nums2[0] = 2. p2=-1, write_idx=1.
     *    nums1 = [1,2,2,3,5,6]
     *
     * p2=-1. Loop terminates.
     * Final nums1 = [1,2,2,3,5,6]. Correct.
     *
     * @param nums1 The first array with m elements, followed by n zeros (modified in-place).
     * @param m The number of valid elements in nums1.
     * @param nums2 The second array with n elements.
     * @param n The number of valid elements in nums2.
     *
     * @complexity
     * Time: O(m + n) - Each element is compared and placed once.
     * Space: O(1) - All operations are performed in-place.
     */
    void mergeOptimal(std::vector<int>& nums1, int m, const std::vector<int>& nums2, int n) {
        int p1 = m - 1;         // Pointer for nums1's valid elements
        int p2 = n - 1;         // Pointer for nums2's elements
        int write_idx = m + n - 1; // Pointer for the merged array (nums1's end)

        // Merge from the end of both arrays
        while (p1 >= 0 && p2 >= 0) {
            if (nums1[p1] > nums2[p2]) {
                nums1[write_idx] = nums1[p1];
                p1--;
            } else {
                nums1[write_idx] = nums2[p2];
                p2--;
            }
            write_idx--;
        }

        // If there are remaining elements in nums2, copy them to nums1.
        // Elements in nums1 (if p1 >= 0) are already in their correct place relative to each other
        // and smaller than anything remaining from nums2 (which would have been processed).
        while (p2 >= 0) {
            nums1[write_idx] = nums2[p2];
            p2--;
            write_idx--;
        }
    }

} // namespace MergeSortedArrays

} // namespace ArrayManipulation
```