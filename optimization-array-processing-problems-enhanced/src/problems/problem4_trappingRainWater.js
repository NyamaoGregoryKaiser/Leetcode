```javascript
/**
 * Problem 4: Trapping Rain Water
 *
 * Given `n` non-negative integers representing an elevation map where the width of each bar is 1,
 * compute how much water it can trap after raining.
 *
 * Example 1:
 * Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
 * Output: 6
 * Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1].
 * In this case, 6 units of rain water (blue section) are being trapped.
 *
 * Example 2:
 * Input: height = [4,2,0,3,2,5]
 * Output: 9
 *
 * Constraints:
 * n == height.length
 * 1 <= n <= 2 * 10^4
 * 0 <= height[i] <= 10^5
 */

/**
 * Approach 1: Brute Force (for each bar)
 *
 * For each bar at index `i`, the amount of water it can trap is determined by the minimum
 * of the maximum height to its left and the maximum height to its right, minus its own height.
 * `water_trapped_at_i = min(max_left_height, max_right_height) - height[i]`
 * This is only positive if `min(max_left_height, max_right_height) > height[i]`.
 *
 * Steps:
 * 1. Initialize `totalWater = 0`.
 * 2. Iterate from `i = 1` to `n-2` (the edge bars cannot trap water).
 *    a. For each `i`, find `maxLeft`: iterate from `0` to `i` to find the maximum height.
 *    b. For each `i`, find `maxRight`: iterate from `i` to `n-1` to find the maximum height.
 *    c. Calculate `waterAtCurrentBar = Math.min(maxLeft, maxRight) - height[i]`.
 *    d. If `waterAtCurrentBar > 0`, add it to `totalWater`.
 * 3. Return `totalWater`.
 *
 * @param {number[]} height The array representing the elevation map.
 * @returns {number} The total amount of trapped rain water.
 */
function trapRainWaterBruteForce(height) {
    let totalWater = 0;
    const n = height.length;

    if (n <= 2) { // No water can be trapped with 2 or fewer bars
        return 0;
    }

    for (let i = 1; i < n - 1; i++) { // Edges cannot trap water, so start from 1 and end at n-2
        let maxLeft = 0;
        let maxRight = 0;

        // Find max height on the left of current bar (including current bar)
        for (let j = 0; j <= i; j++) {
            maxLeft = Math.max(maxLeft, height[j]);
        }

        // Find max height on the right of current bar (including current bar)
        for (let j = i; j < n; j++) { // Use j=i to include current bar's right
            maxRight = Math.max(maxRight, height[j]);
        }

        // Water trapped at current bar is min of max left and max right, minus current bar's height.
        // Ensure it's non-negative.
        totalWater += Math.max(0, Math.min(maxLeft, maxRight) - height[i]);
    }

    return totalWater;
}

/**
 * Complexity Analysis for trapRainWaterBruteForce:
 * - Time Complexity: O(N^2)
 *   - The outer loop runs N-2 times.
 *   - Inside the outer loop, `maxLeft` calculation takes O(i) and `maxRight` calculation takes O(N-i) in worst case.
 *   - Total: Summation from i=1 to N-2 of (O(i) + O(N-i)) which approximately sums to O(N^2).
 * - Space Complexity: O(1)
 *   - Only a few constant extra variables are used.
 */


/**
 * Approach 2: Using Precomputed Max Heights (Dynamic Programming/Pre-processing)
 *
 * Instead of recalculating `maxLeft` and `maxRight` for each bar in the inner loops,
 * we can precompute these values in two separate passes.
 *
 * Steps:
 * 1. Create two arrays: `leftMax` and `rightMax` of size `n`.
 * 2. Populate `leftMax`:
 *    `leftMax[0] = height[0]`
 *    `leftMax[i] = Math.max(leftMax[i-1], height[i])` for `i > 0`.
 *    This stores the maximum height encountered so far from the left up to index `i`.
 * 3. Populate `rightMax`:
 *    `rightMax[n-1] = height[n-1]`
 *    `rightMax[i] = Math.max(rightMax[i+1], height[i])` for `i < n-1`.
 *    This stores the maximum height encountered so far from the right up to index `i`.
 * 4. Initialize `totalWater = 0`.
 * 5. Iterate from `i = 1` to `n-2`:
 *    `water_trapped_at_i = Math.min(leftMax[i], rightMax[i]) - height[i]`
 *    Add `water_trapped_at_i` to `totalWater`.
 * 6. Return `totalWater`.
 *
 * @param {number[]} height The array representing the elevation map.
 * @returns {number} The total amount of trapped rain water.
 */
function trapRainWaterPrecomputedMax(height) {
    const n = height.length;
    if (n <= 2) {
        return 0;
    }

    const leftMax = new Array(n).fill(0);
    const rightMax = new Array(n).fill(0);

    // Calculate leftMax array
    leftMax[0] = height[0];
    for (let i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], height[i]);
    }

    // Calculate rightMax array
    rightMax[n - 1] = height[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], height[i]);
    }

    let totalWater = 0;
    // Calculate trapped water
    for (let i = 1; i < n - 1; i++) {
        totalWater += Math.max(0, Math.min(leftMax[i], rightMax[i]) - height[i]);
    }

    return totalWater;
}

/**
 * Complexity Analysis for trapRainWaterPrecomputedMax:
 * - Time Complexity: O(N)
 *   - One pass to calculate `leftMax` (N operations).
 *   - One pass to calculate `rightMax` (N operations).
 *   - One pass to calculate `totalWater` (N operations).
 *   - Total: O(N) + O(N) + O(N) = O(N).
 * - Space Complexity: O(N)
 *   - Two auxiliary arrays (`leftMax`, `rightMax`) of size N are created.
 *   - Total: O(N) + O(N) = O(N).
 */


/**
 * Approach 3: Optimal - Two Pointers (In-place/Constant Space)
 *
 * This approach reduces the space complexity to O(1) by using two pointers
 * and dynamically updating `maxLeft` and `maxRight` as we traverse.
 *
 * The core idea is that the amount of water trapped at a certain bar `i` is determined
 * by `min(max_left, max_right) - height[i]`. We can find this `min` value efficiently.
 *
 * We maintain two pointers, `left` (starting at 0) and `right` (starting at `n-1`).
 * We also maintain `maxLeft` (maximum height seen from `left` up to current `left` pointer)
 * and `maxRight` (maximum height seen from `right` down to current `right` pointer).
 *
 * Steps:
 * 1. Initialize `left = 0`, `right = n - 1`.
 * 2. Initialize `maxLeft = 0`, `maxRight = 0`.
 * 3. Initialize `totalWater = 0`.
 * 4. While `left < right`:
 *    a. If `height[left] < height[right]`:
 *       - This means the water level at `left` is currently limited by `height[left]` or `maxLeft`.
 *       - If `height[left] >= maxLeft`, update `maxLeft = height[left]`. (No water trapped yet or new max wall)
 *       - Else (`height[left] < maxLeft`), water can be trapped: `totalWater += maxLeft - height[left]`.
 *       - Move `left` pointer: `left++`.
 *    b. Else (`height[left] >= height[right]`):
 *       - This means the water level at `right` is currently limited by `height[right]` or `maxRight`.
 *       - If `height[right] >= maxRight`, update `maxRight = height[right]`.
 *       - Else (`height[right] < maxRight`), water can be trapped: `totalWater += maxRight - height[right]`.
 *       - Move `right` pointer: `right--`.
 * 5. Return `totalWater`.
 *
 * The logic `height[left] < height[right]` is crucial:
 * If `height[left]` is smaller, we know for sure that `height[left]` will be the limiting factor
 * for water calculation at index `left` because there's *at least one* wall on the right (`height[right]`)
 * that is taller or equal to `height[left]`. The actual `maxRight` for `left` is guaranteed to be
 * at least `height[right]`, which is >= `height[left]`. So, `min(maxLeft_at_left, maxRight_at_left)` will be
 * `maxLeft_at_left`. The amount of water is `maxLeft_at_left - height[left]`. We can confidently move `left`.
 * The symmetric logic applies when `height[right]` is smaller.
 *
 * @param {number[]} height The array representing the elevation map.
 * @returns {number} The total amount of trapped rain water.
 */
function trapRainWaterTwoPointers(height) {
    const n = height.length;
    if (n <= 2) {
        return 0;
    }

    let left = 0;
    let right = n - 1;
    let maxLeft = 0;
    let maxRight = 0;
    let totalWater = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            // The water level at 'left' is limited by the maximum seen on its left (maxLeft)
            // because there's a taller or equal wall on the right (height[right] or beyond it).
            if (height[left] >= maxLeft) {
                maxLeft = height[left]; // Update maxLeft if current bar is taller
            } else {
                totalWater += maxLeft - height[left]; // Trap water
            }
            left++; // Move left pointer
        } else {
            // The water level at 'right' is limited by the maximum seen on its right (maxRight)
            // because there's a taller or equal wall on the left (height[left] or beyond it).
            if (height[right] >= maxRight) {
                maxRight = height[right]; // Update maxRight if current bar is taller
            } else {
                totalWater += maxRight - height[right]; // Trap water
            }
            right--; // Move right pointer
        }
    }

    return totalWater;
}

/**
 * Complexity Analysis for trapRainWaterTwoPointers:
 * - Time Complexity: O(N)
 *   - The `while` loop iterates as the `left` and `right` pointers move towards each other,
 *     covering each element at most once.
 *   - Operations inside the loop are constant time.
 *   - Total: O(N).
 * - Space Complexity: O(1)
 *   - Only a few constant extra variables are used. No auxiliary arrays are created.
 */

/**
 * Approach 4: Using a Monotonic Stack (Advanced, for further optimization discussions)
 *
 * A stack can be used to store indices of bars in decreasing order of height.
 * When we encounter a bar taller than the top of the stack, it means we've found
 * a potential right boundary for previous bars.
 *
 * Steps:
 * 1. Initialize `stack = []` and `totalWater = 0`.
 * 2. Iterate `i` from `0` to `n-1`:
 *    a. While `stack` is not empty and `height[i]` is greater than `height[stack.top()]`:
 *       - Pop the top index `topIndex = stack.pop()`. This is a bar that can trap water.
 *       - If `stack` becomes empty, it means there's no left boundary for `topIndex`, so break.
 *       - Calculate `distance = i - stack.top() - 1`. This is the width of the water segment.
 *       - Calculate `boundedHeight = Math.min(height[i], height[stack.top()]) - height[topIndex]`.
 *       - `totalWater += distance * boundedHeight`.
 *    b. Push `i` onto the stack.
 * 3. Return `totalWater`.
 *
 * This approach is also O(N) time and O(N) space (for the stack in worst case).
 * It's another excellent method to know and discuss in an interview as it demonstrates
 * advanced data structure usage.
 *
 * @param {number[]} height The array representing the elevation map.
 * @returns {number} The total amount of trapped rain water.
 */
function trapRainWaterMonotonicStack(height) {
    let totalWater = 0;
    const stack = []; // Stores indices of bars in decreasing order of height
    const n = height.length;

    for (let i = 0; i < n; i++) {
        // While stack is not empty and current bar is taller than the bar at stack's top
        while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
            const topIndex = stack.pop(); // Pop the bar that potentially holds water

            if (stack.length === 0) {
                // If stack becomes empty, there's no left boundary, so no water can be trapped.
                break;
            }

            // The left boundary is now stack.top(), the right boundary is current 'i'
            // and the popped bar 'topIndex' is between them.
            const leftBoundaryIndex = stack[stack.length - 1];
            const distance = i - leftBoundaryIndex - 1; // Width of the pool
            const boundedHeight = Math.min(height[i], height[leftBoundaryIndex]) - height[topIndex];

            totalWater += distance * boundedHeight;
        }
        stack.push(i); // Push current bar's index onto the stack
    }

    return totalWater;
}

/**
 * Complexity Analysis for trapRainWaterMonotonicStack:
 * - Time Complexity: O(N)
 *   - Each element is pushed onto and popped from the stack at most once.
 *   - The main loop runs N times.
 *   - Total: O(N).
 * - Space Complexity: O(N)
 *   - In the worst case (e.g., a decreasing sequence like [5,4,3,2,1]), the stack can store all N indices.
 *   - Total: O(N).
 */


module.exports = {
    trapRainWaterBruteForce,
    trapRainWaterPrecomputedMax,
    trapRainWaterTwoPointers, // Optimal space complexity
    trapRainWaterMonotonicStack, // Alternative optimal time complexity
};
```