#include "array_manipulation.h"
#include <algorithm> // For std::max
#include <stack>     // For stack-based approach

namespace TrappingRainWater {

/**
 * @brief Calculates the amount of trapped rain water using the two-pointer approach.
 * This approach is optimal in terms of both time and space complexity.
 *
 * Algorithm:
 * 1. Initialize `left = 0`, `right = n - 1`.
 * 2. Initialize `max_left = 0`, `max_right = 0`. These store the maximum height encountered
 *    from the left and right sides respectively, up to the current `left` and `right` pointers.
 * 3. Initialize `trapped_water = 0`.
 * 4. Loop while `left <= right`:
 *    a. If `height[left] <= height[right]`:
 *       This means the water level for the current `left` position is limited by `max_left` (or `height[left]` itself).
 *       If `height[left] >= max_left`, update `max_left = height[left]`. No water can be trapped at `left` if it forms a new highest boundary from left.
 *       Else (`height[left] < max_left`), water is trapped: `trapped_water += max_left - height[left]`.
 *       Increment `left`.
 *    b. Else (`height[left] > height[right]`):
 *       This means the water level for the current `right` position is limited by `max_right`.
 *       If `height[right] >= max_right`, update `max_right = height[right]`. No water can be trapped at `right` if it forms a new highest boundary from right.
 *       Else (`height[right] < max_right`), water is trapped: `trapped_water += max_right - height[right]`.
 *       Decrement `right`.
 * 5. Return `trapped_water`.
 *
 * The intuition is that at any point `i`, the amount of water trapped is `min(max_left_so_far, max_right_so_far) - height[i]`.
 * With two pointers, when `height[left] <= height[right]`, we know that `max_left` is the limiting factor for `height[left]`.
 * This is because even if `height[right]` is greater than `max_left`, there's definitely a wall as tall as `height[right]`
 * or taller on the right side. So, the effective water level for `left` is `max_left`. A similar logic applies when `height[right] < height[left]`.
 *
 * Example: height = [0,1,0,2,1,0,1,3,2,1,2,1]
 * n = 12
 * left = 0, right = 11, max_left = 0, max_right = 0, trapped_water = 0
 *
 * Iterations:
 * 1. `h[0]=0, h[11]=1`. `h[0] <= h[11]`. `h[0](0) >= max_left(0)`. `max_left = 0`. `left = 1`.
 * 2. `h[1]=1, h[11]=1`. `h[1] <= h[11]`. `h[1](1) >= max_left(0)`. `max_left = 1`. `left = 2`.
 * 3. `h[2]=0, h[11]=1`. `h[2] <= h[11]`. `h[2](0) < max_left(1)`. `water += (1-0) = 1`. `trapped_water = 1`. `left = 3`.
 * 4. `h[3]=2, h[11]=1`. `h[3] > h[11]`. `h[11](1) >= max_right(0)`. `max_right = 1`. `right = 10`.
 * 5. `h[3]=2, h[10]=2`. `h[3] <= h[10]`. `h[3](2) >= max_left(1)`. `max_left = 2`. `left = 4`.
 * 6. `h[4]=1, h[10]=2`. `h[4] <= h[10]`. `h[4](1) < max_left(2)`. `water += (2-1) = 1`. `trapped_water = 2`. `left = 5`.
 * 7. `h[5]=0, h[10]=2`. `h[5] <= h[10]`. `h[5](0) < max_left(2)`. `water += (2-0) = 2`. `trapped_water = 4`. `left = 6`.
 * 8. `h[6]=1, h[10]=2`. `h[6] <= h[10]`. `h[6](1) < max_left(2)`. `water += (2-1) = 1`. `trapped_water = 5`. `left = 7`.
 * 9. `h[7]=3, h[10]=2`. `h[7] > h[10]`. `h[10](2) >= max_right(1)`. `max_right = 2`. `right = 9`.
 * 10. `h[7]=3, h[9]=1`. `h[7] > h[9]`. `h[9](1) < max_right(2)`. `water += (2-1) = 1`. `trapped_water = 6`. `right = 8`.
 * 11. `h[7]=3, h[8]=2`. `h[7] > h[8]`. `h[8](2) >= max_right(2)`. `max_right = 2`. `right = 7`.
 * 12. `left(7) == right(7)`. Loop terminates (or continues one more step depending on `left <= right` vs `left < right`)
 *     If it was `left < right`: loop ends.
 *     If it was `left <= right`:
 *     `h[7]=3, h[7]=3`. `h[7] <= h[7]`. `h[7](3) >= max_left(2)`. `max_left = 3`. `left = 8`.
 *     Now `left = 8, right = 7`. `left > right`. Loop terminates.
 *
 * Final `trapped_water = 6`.
 *
 * @param height A vector of integers representing the elevation map.
 * @return The total amount of water that can be trapped.
 *
 * @complexity
 *   Time: O(N), where N is the number of elements in `height`. The two pointers traverse the array once.
 *   Space: O(1) as no extra data structures are used apart from a few variables.
 */
int trap_approach1(const std::vector<int>& height) {
    int n = height.size();
    if (n <= 2) { // Need at least 3 bars to trap water
        return 0;
    }

    int left = 0;
    int right = n - 1;
    int max_left = 0;
    int max_right = 0;
    int trapped_water = 0;

    while (left <= right) {
        if (height[left] <= height[right]) {
            // The water level is limited by `max_left` for the current `left` bar.
            // If height[left] is higher than or equal to `max_left`, it becomes the new `max_left`.
            // Otherwise, water can be trapped based on `max_left`.
            if (height[left] >= max_left) {
                max_left = height[left];
            } else {
                trapped_water += max_left - height[left];
            }
            left++;
        } else {
            // The water level is limited by `max_right` for the current `right` bar.
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
 * @brief Calculates the amount of trapped rain water using a stack.
 *
 * Algorithm:
 * 1. Initialize an empty stack.
 * 2. Initialize `trapped_water = 0`.
 * 3. Iterate through the `height` array with index `i` from `0` to `n-1`:
 *    a. While the stack is not empty AND `height[i]` is greater than `height[stack.top()]`:
 *       i. Pop the `top` index from the stack. This `top` bar is a potential candidate for trapping water.
 *       ii. If the stack becomes empty after popping `top`, it means there's no left boundary for the `top` bar, so break.
 *       iii. Calculate the `distance` between the current `i` (right boundary) and `stack.top()` (left boundary).
 *            `distance = i - stack.top() - 1`.
 *       iv. Calculate the `bounded_height`, which is the minimum of the left and right boundaries, minus the height of the `top` bar.
 *            `bounded_height = std::min(height[i], height[stack.top()]) - height[popped_idx]`.
 *       v. Add `distance * bounded_height` to `trapped_water`.
 *    b. Push the current index `i` onto the stack.
 * 4. Return `trapped_water`.
 *
 * The stack stores indices of bars in decreasing order of height. When we encounter a bar `height[i]`
 * that is taller than the bar at `stack.top()`, it means `stack.top()` can potentially trap water
 * between `stack.second_top()` (left boundary) and `i` (right boundary).
 *
 * Example: height = [0,1,0,2,1,0,1,3,2,1,2,1]
 * n = 12
 * stack = [], trapped_water = 0
 *
 * i=0, h[0]=0: Stack: [0]
 * i=1, h[1]=1: h[1] > h[0]. Pop 0. Stack empty. Push 1. Stack: [1]
 * i=2, h[2]=0: h[2] < h[1]. Push 2. Stack: [1,2]
 * i=3, h[3]=2:
 *    h[3](2) > h[2](0). Pop 2. `popped_idx = 2`.
 *    Stack: [1]. `left_boundary_idx = stack.top() = 1`.
 *    `distance = i - left_boundary_idx - 1 = 3 - 1 - 1 = 1`.
 *    `bounded_height = min(h[i](2), h[left_boundary_idx](1)) - h[popped_idx](0) = min(2,1) - 0 = 1 - 0 = 1`.
 *    `trapped_water += 1 * 1 = 1`. `trapped_water = 1`.
 *    h[3](2) > h[1](1). Pop 1. `popped_idx = 1`.
 *    Stack empty. Break inner while.
 * Push 3. Stack: [3]
 * i=4, h[4]=1: h[4] < h[3]. Push 4. Stack: [3,4]
 * i=5, h[5]=0: h[5] < h[4]. Push 5. Stack: [3,4,5]
 * i=6, h[6]=1:
 *    h[6](1) > h[5](0). Pop 5. `popped_idx = 5`.
 *    Stack: [3,4]. `left_boundary_idx = stack.top() = 4`.
 *    `distance = 6 - 4 - 1 = 1`.
 *    `bounded_height = min(h[6](1), h[4](1)) - h[5](0) = min(1,1) - 0 = 1`.
 *    `trapped_water += 1 * 1 = 1`. `trapped_water = 2`.
 *    h[6](1) == h[4](1). Break inner while.
 * Push 6. Stack: [3,4,6]
 * i=7, h[7]=3:
 *    h[7](3) > h[6](1). Pop 6. `popped_idx = 6`.
 *    Stack: [3,4]. `left_boundary_idx = stack.top() = 4`.
 *    `distance = 7 - 4 - 1 = 2`.
 *    `bounded_height = min(h[7](3), h[4](1)) - h[6](1) = min(3,1) - 1 = 1 - 1 = 0`.
 *    `trapped_water += 2 * 0 = 0`. `trapped_water = 2`.
 *    h[7](3) > h[4](1). Pop 4. `popped_idx = 4`.
 *    Stack: [3]. `left_boundary_idx = stack.top() = 3`.
 *    `distance = 7 - 3 - 1 = 3`.
 *    `bounded_height = min(h[7](3), h[3](2)) - h[4](1) = min(3,2) - 1 = 2 - 1 = 1`.
 *    `trapped_water += 3 * 1 = 3`. `trapped_water = 5`.
 *    h[7](3) > h[3](2). Pop 3. `popped_idx = 3`.
 *    Stack empty. Break inner while.
 * Push 7. Stack: [7]
 * i=8, h[8]=2: h[8] < h[7]. Push 8. Stack: [7,8]
 * i=9, h[9]=1: h[9] < h[8]. Push 9. Stack: [7,8,9]
 * i=10, h[10]=2:
 *    h[10](2) > h[9](1). Pop 9. `popped_idx = 9`.
 *    Stack: [7,8]. `left_boundary_idx = stack.top() = 8`.
 *    `distance = 10 - 8 - 1 = 1`.
 *    `bounded_height = min(h[10](2), h[8](2)) - h[9](1) = min(2,2) - 1 = 1`.
 *    `trapped_water += 1 * 1 = 1`. `trapped_water = 6`.
 *    h[10](2) == h[8](2). Break inner while.
 * Push 10. Stack: [7,8,10]
 * i=11, h[11]=1: h[11] < h[10]. Push 11. Stack: [7,8,10,11]
 *
 * Loop ends. Final `trapped_water = 6`.
 *
 * @param height A vector of integers representing the elevation map.
 * @return The total amount of water that can be trapped.
 *
 * @complexity
 *   Time: O(N), where N is the number of elements in `height`. Each element is pushed and popped from the stack at most once.
 *   Space: O(N) in the worst case, if the heights are strictly decreasing (e.g., `[5,4,3,2,1]`), all elements will be in the stack.
 */
int trap_approach2(const std::vector<int>& height) {
    int n = height.size();
    if (n <= 2) {
        return 0;
    }

    std::stack<int> s; // Stores indices of bars
    int trapped_water = 0;

    for (int i = 0; i < n; ++i) {
        // While current bar is taller than the bar at stack's top,
        // it means we found a potential right boundary for the bar at stack.top().
        while (!s.empty() && height[i] > height[s.top()]) {
            int popped_idx = s.top(); // The bar that is potentially trapping water
            s.pop();

            if (s.empty()) {
                // No left boundary for the popped bar, so it cannot trap water.
                break;
            }

            int left_boundary_idx = s.top();
            // The effective height of the water is determined by the shorter of the two boundaries
            // (current bar `i` and `left_boundary_idx`) minus the height of the popped bar.
            int bounded_height = std::min(height[i], height[left_boundary_idx]) - height[popped_idx];
            // The width of the water trapped is the distance between boundaries minus the popped bar itself.
            int distance = i - left_boundary_idx - 1;

            trapped_water += distance * bounded_height;
        }
        s.push(i); // Push current bar's index onto the stack
    }

    return trapped_water;
}

} // namespace TrappingRainWater
---