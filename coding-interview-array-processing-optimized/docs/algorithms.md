# Algorithm Explanations

This document provides detailed explanations for the algorithms implemented in `src/problems.py`. Each section covers the problem statement, different approaches (including brute force and optimal), and a thorough analysis of their time and space complexity.

---

## Problem 1: Container With Most Water (LeetCode 11)

### Problem Statement
Given `n` non-negative integers `a_1, a_2, ..., a_n` where each represents a point at coordinate `(i, a_i)`. `n` vertical lines are drawn such that the two endpoints of line `i` is at `(i, a_i)` and `(i, 0)`. Find two lines, which, together with the x-axis, forms a container, such that the container contains the most water.

**Constraint:** You may not slant the container. `n` is at least 2.

### Approach 1: Brute Force

**Concept:**
The most straightforward way is to consider every possible pair of lines. For each pair `(i, j)` where `i < j`, calculate the area formed by `min(height[i], height[j]) * (j - i)`. Keep track of the maximum area found.

**Algorithm:**
1. Initialize `max_area = 0`.
2. Use a nested loop:
   - Outer loop `i` from `0` to `n-1`.
   - Inner loop `j` from `i+1` to `n-1`.
3. Inside the inner loop, calculate `current_height = min(height[i], height[j])`.
4. Calculate `current_width = j - i`.
5. Calculate `current_area = current_height * current_width`.
6. Update `max_area = max(max_area, current_area)`.
7. Return `max_area`.

**Time Complexity:** O(N^2)
- The nested loops iterate `(N-1) + (N-2) + ... + 1 = N * (N-1) / 2` pairs, which is quadratic.

**Space Complexity:** O(1)
- Only a few variables are used to store `max_area`, `i`, `j`, `current_height`, `current_width`, and `current_area`.

### Approach 2: Two Pointers (Optimal)

**Concept:**
This approach uses two pointers, one starting at the beginning (`left`) and one at the end (`right`) of the `height` array. The key insight is to realize that the bottleneck for the water level is always the shorter of the two lines. To potentially increase the area, we need to try to increase the `min(height[left], height[right])`. Moving the pointer corresponding to the shorter line gives us a chance to find a taller line, whereas moving the pointer corresponding to the taller line will definitely decrease the width without any guarantee of increasing the height.

**Algorithm:**
1. Initialize `max_area = 0`, `left = 0`, `right = len(height) - 1`.
2. While `left < right`:
   a. Calculate `current_width = right - left`.
   b. Calculate `current_height = min(height[left], height[right])`.
   c. Calculate `current_area = current_width * current_height`.
   d. Update `max_area = max(max_area, current_area)`.
   e. If `height[left] < height[right]`, increment `left` (move the shorter line inward).
   f. Else (if `height[right] <= height[left]`), decrement `right` (move the shorter or equal line inward).
3. Return `max_area`.

**Why this works (Proof by contradiction):**
Assume `height[left] < height[right]`. If we moved `right` inward instead of `left`, the new width `(right - 1) - left` would be smaller. The new height `min(height[left], height[right-1])` would be at most `height[left]` (since `height[left]` is still the bottleneck or a new, even shorter `height[right-1]` could appear). Therefore, the new area would be at most `height[left] * ((right - 1) - left)`, which is definitely smaller than `height[left] * (right - left)`. So, moving the taller pointer `right` would never lead to a larger area in this case. Hence, we must move `left`. A similar argument applies if `height[right] < height[left]`. If `height[left] == height[right]`, moving either pointer is fine, as both could lead to a better solution, but moving one is sufficient.

**Time Complexity:** O(N)
- The two pointers `left` and `right` start at the ends and move towards each other, meeting in the middle. Each pointer makes at most `N` moves, resulting in a single pass.

**Space Complexity:** O(1)
- Only a few variables are used.

---

## Problem 2: Product of Array Except Self (LeetCode 238)

### Problem Statement
Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.
The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.
You must write an algorithm that runs in `O(n)` time and without using the division operation.

### Approach 1: Using Two Auxiliary Arrays

**Concept:**
To find the product of all elements except `nums[i]`, we can think of it as `(product of elements to the left of nums[i]) * (product of elements to the right of nums[i])`.
This approach explicitly calculates these two products for all indices and then combines them.

**Algorithm:**
1. Initialize three arrays of size `N`: `prefix_products`, `suffix_products`, and `answer`. All elements initially 1 or 0.
2. **First Pass (Calculate Prefix Products):**
   - `prefix_products[0] = 1` (no elements to the left of `nums[0]`).
   - For `i` from `1` to `N-1`, `prefix_products[i] = prefix_products[i-1] * nums[i-1]`.
   - After this pass, `prefix_products[i]` holds the product of `nums[0] * ... * nums[i-1]`.
3. **Second Pass (Calculate Suffix Products):**
   - `suffix_products[N-1] = 1` (no elements to the right of `nums[N-1]`).
   - For `i` from `N-2` down to `0`, `suffix_products[i] = suffix_products[i+1] * nums[i+1]`.
   - After this pass, `suffix_products[i]` holds the product of `nums[i+1] * ... * nums[N-1]`.
4. **Third Pass (Calculate Final Answer):**
   - For `i` from `0` to `N-1`, `answer[i] = prefix_products[i] * suffix_products[i]`.
5. Return `answer`.

**Time Complexity:** O(N)
- Three separate passes over the array, each taking O(N) time. Total is O(N).

**Space Complexity:** O(N)
- Two additional arrays (`prefix_products` and `suffix_products`) of size `N` are created. The `answer` array is usually not counted as auxiliary space since it's the required output. If it were, it would be O(N) as well.

### Approach 2: Optimal O(1) Space (Excluding Output Array)

**Concept:**
We can optimize the space by realizing that we don't need to store all prefix and suffix products in separate arrays simultaneously. We can use the `answer` array itself to store the prefix products and then calculate suffix products "on the fly" during a single backward pass, multiplying them with the pre-calculated prefix products.

**Algorithm:**
1. Initialize an `answer` array of size `N` with all elements set to 1.
2. **First Pass (Calculate Prefix Products into `answer` array):**
   - `answer[0]` is already 1.
   - For `i` from `1` to `N-1`: `answer[i] = answer[i-1] * nums[i-1]`.
   - After this pass, `answer[i]` stores the product of all elements to the left of `nums[i]`.
3. **Second Pass (Calculate Suffix Products and Combine):**
   - Initialize a variable `right_product = 1`. This variable will accumulate the product of elements to the right of the current index `i`.
   - Iterate `i` from `N-1` down to `0`:
     a. Multiply `answer[i]` (which currently holds the prefix product) by `right_product` (which holds the suffix product). `answer[i] = answer[i] * right_product`.
     b. Update `right_product` to include the current `nums[i]` for the next iteration (i.e., for `nums[i-1]`): `right_product = right_product * nums[i]`.
4. Return `answer`.

**Time Complexity:** O(N)
- Two passes over the array: one forward pass and one backward pass. Each takes O(N). Total is O(N).

**Space Complexity:** O(1)
- The `answer` array is the output, so it's not counted as auxiliary space. Only a single variable `right_product` is used for auxiliary storage.

---

## Problem 3: Rotate Image (Matrix) (LeetCode 48)

### Problem Statement
You are given an `n x n` 2D matrix representing an image, rotate the image by 90 degrees (clockwise).
You have to rotate the image in-place, which means you modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

### Approach 1: Using an Auxiliary Matrix (Not In-Place)

**Concept:**
This approach is conceptually simple: create a new matrix of the same size, and for each element `matrix[row][col]` in the original matrix, determine its new position `(new_row, new_col)` after a 90-degree clockwise rotation. Then copy the elements. This is explicitly *not* an in-place solution, but it's a good starting point for understanding the mapping.

The mapping for a 90-degree clockwise rotation is:
Original `(r, c)` becomes `(c, n - 1 - r)`.

**Algorithm:**
1. Get the size `n` of the matrix. Handle empty or non-square matrices.
2. Create a new `n x n` matrix `rotated_matrix` initialized with zeros.
3. Iterate `r` from `0` to `n-1` and `c` from `0` to `n-1`:
   - `rotated_matrix[c][n - 1 - r] = matrix[r][c]`.
4. After filling `rotated_matrix`, copy all its elements back to the original `matrix`.

**Time Complexity:** O(N^2)
- Iterating through all `N*N` elements twice (once for filling `rotated_matrix`, once for copying back).

**Space Complexity:** O(N^2)
- An entirely new `N x N` matrix is created.

### Approach 2: In-place using Transpose and Reverse (Optimal for clarity/efficiency)

**Concept:**
This elegant in-place method achieves 90-degree clockwise rotation in two distinct steps:
1.  **Transpose the matrix:** Swap elements across the main diagonal. `matrix[i][j]` becomes `matrix[j][i]`.
    This flips the matrix over its diagonal.
2.  **Reverse each row:** After transposing, each row needs to be reversed to complete the clockwise rotation.

**Example (3x3):**
Original Matrix:
```
1 2 3
4 5 6
7 8 9
```

1.  **Transpose:** (Swap (2,1) with (1,2), (3,1) with (1,3), etc.)
    ```
    1 4 7
    2 5 8
    3 6 9
    ```

2.  **Reverse each row:**
    ```
    7 4 1
    8 5 2
    9 6 3
    ```
    This is the desired 90-degree clockwise rotation.

**Algorithm:**
1. Get the size `n` of the matrix. Handle empty or non-square matrices.
2. **Step 1: Transpose**
   - Iterate `r` from `0` to `n-1`.
   - Iterate `c` from `r` to `n-1` (important: `c` starts from `r` to avoid swapping elements twice).
   - Swap `matrix[r][c]` with `matrix[c][r]`.
3. **Step 2: Reverse each row**
   - For each `r` from `0` to `n-1`:
     - Reverse the `r`-th row `matrix[r]`. (Python's `list.reverse()` method modifies in-place).

**Time Complexity:** O(N^2)
- Transposing iterates over half of the `N*N` elements (`N*(N-1)/2` swaps).
- Reversing each of `N` rows takes `N * (N/2)` swaps for elements in each row.
- Both steps are proportional to `N^2`.

**Space Complexity:** O(1)
- All operations are performed in-place.

### Approach 3: In-place Layer by Layer Rotation (Another Optimal O(1) space)

**Concept:**
This approach treats the matrix as a series of concentric squares or "layers". It performs a 4-way swap for elements on each layer, effectively rotating them in a cycle.
For an `n x n` matrix, there are `n // 2` layers. The outermost layer is at `layer = 0`, and it goes inward.

For each `layer`:
- The top row elements are `(layer, i)`
- The right column elements are `(i, n - 1 - layer)`
- The bottom row elements are `(n - 1 - layer, n - 1 - i)`
- The left column elements are `(n - 1 - i, layer)`

where `i` iterates from `layer` up to `n - 1 - layer - 1`.

**Algorithm:**
1. Get the size `n` of the matrix. Handle empty or non-square matrices.
2. Iterate `layer` from `0` to `n // 2 - 1` (this covers all concentric layers).
3. For each `layer`, define `first = layer` and `last = n - 1 - layer`.
4. Iterate `i` from `first` to `last - 1` (this moves along the top edge elements, excluding the corners which are handled by the next cycle iteration or are part of `first` and `last` definition).
5. For each `i`, perform a 4-way swap:
   - `temp = matrix[first][i]` (store top-left element of the current 4-group)
   - `matrix[first][i] = matrix[last - (i - first)][first]` (left moves to top)
   - `matrix[last - (i - first)][first] = matrix[last][last - (i - first)]` (bottom moves to left)
   - `matrix[last][last - (i - first)] = matrix[i][last]` (right moves to bottom)
   - `matrix[i][last] = temp` (stored top-left moves to right)

**Time Complexity:** O(N^2)
- There are `n // 2` layers. For each layer `k`, there are `(n - 1 - 2*k)` elements on one side (excluding the corner). Each such element is part of a 4-way swap.
- The total number of swaps is proportional to `N^2`.

**Space Complexity:** O(1)
- All operations are performed in-place. Only a temporary variable `temp` is used for swapping.

---

## Problem 4: Meeting Rooms II (LeetCode 253)

### Problem Statement
Given an array of meeting time intervals where each interval `intervals[i] = [start_i, end_i]`, return the minimum number of conference rooms required.

### Approach 1: Brute Force (Conceptual Discussion)

**Concept:**
A true brute-force approach would involve simulating the room allocation for every possible permutation or combination of meetings, which is prohibitively complex (factorial time complexity) and not practical.
A slightly less brute-force approach might be to:
1. Sort intervals by start time.
2. Maintain a list of currently occupied rooms, perhaps by storing the end time of the meeting in each room.
3. For each new meeting:
   - Iterate through all occupied rooms. If the new meeting's start time is after or equal to any room's end time, that room is freed.
   - If a room is freed, assign the new meeting to it (update its end time).
   - If no room is freed, a new room is required. Add it to the list.
This approach can be `O(N^2)` in the worst case (e.g., all meetings overlap, requiring scanning `N` rooms for each of `N` meetings). Because of its inefficiency and the existence of much better solutions, this approach is usually only discussed conceptually during an interview to contrast with optimal solutions.

**Time Complexity:** O(N^2) (if implemented inefficiently)
**Space Complexity:** O(N) (to store room end times)

### Approach 2: Optimal using Sorting and a Min-Heap

**Concept:**
This is the most common and efficient solution. The core idea is to process meetings in the order they *start* and use a min-heap to keep track of the *end times* of currently occupied rooms. The min-heap always gives us the earliest ending meeting among all active meetings.

**Algorithm:**
1. Handle edge case: If `intervals` is empty, return `0`.
2. **Sort:** Sort the `intervals` list by their start times (`interval[0]`). This ensures we process meetings chronologically.
3. **Initialize Min-Heap:** Create an empty min-heap (Python's `heapq` module provides this). This heap will store the `end_time` of each meeting currently occupying a room. The size of the heap at any point represents the number of rooms currently in use.
4. **Iterate and Allocate Rooms:**
   - For each `[start, end]` interval in the sorted `intervals`:
     a. **Check for Free Room:** If the heap is not empty AND the current meeting's `start` time is greater than or equal to the `earliest_ending_time` (which is `rooms[0]` due to min-heap property), it means a room has become free. Pop the `earliest_ending_time` from the heap. This room can be reused.
     b. **Occupy Room:** Push the current meeting's `end` time into the heap. This either occupies a newly freed room or a new room if no room was available.
5. **Result:** The maximum number of rooms simultaneously required is the maximum size the heap ever reached. Conveniently, at the end of iterating through all meetings, `len(rooms)` will be exactly this maximum size.

**Example Walkthrough:** `[[0,30],[5,10],[15,20]]`
1. Sorted: `[[0,30],[5,10],[15,20]]`
2. `rooms = []` (heap)
3. **Process [0,30]:**
   - `rooms` is empty, so push `30`. `rooms = [30]`
   - `len(rooms) = 1`
4. **Process [5,10]:**
   - `start = 5`. `rooms[0] = 30`. `5 < 30`. No room free.
   - Push `10`. `rooms = [10, 30]` (heap property maintained).
   - `len(rooms) = 2`
5. **Process [15,20]:**
   - `start = 15`. `rooms[0] = 10`. `15 >= 10`. A room is free (the one ending at 10).
   - Pop `10`. `rooms = [30]`
   - Push `20`. `rooms = [20, 30]` (heap property maintained).
   - `len(rooms) = 2`
6. All meetings processed. Return `len(rooms) = 2`.

**Time Complexity:** O(N log N)
- Sorting the `N` intervals takes O(N log N).
- Iterating through `N` intervals, each heap operation (push or pop) takes O(log K) where K is the current size of the heap (at most N). Total for heap operations: O(N log N).
- Overall: O(N log N).

**Space Complexity:** O(N)
- The min-heap can store up to `N` end times in the worst case (e.g., all meetings overlap).

### Approach 3: Line Sweep (Alternative Optimal)

**Concept:**
This approach uses a "line sweep" or "event point" algorithm. We separate the start and end times into two separate lists. When a meeting starts, it demands a room. When a meeting ends, it frees up a room. We sort all these events and sweep a conceptual line across the timeline.

**Algorithm:**
1. Handle edge case: If `intervals` is empty, return `0`.
2. **Create Event Lists:**
   - Create a list `start_times` containing all `interval[0]` values.
   - Create a list `end_times` containing all `interval[1]` values.
3. **Sort Event Lists:** Sort both `start_times` and `end_times` arrays independently.
4. **Line Sweep with Two Pointers:**
   - Initialize `rooms_needed = 0`, `max_rooms = 0`.
   - Initialize two pointers: `s_ptr = 0` (for `start_times`) and `e_ptr = 0` (for `end_times`).
   - While `s_ptr < N` (we iterate until all meetings have started):
     a. **Compare Events:**
        - If `start_times[s_ptr] < end_times[e_ptr]`: A meeting starts *before* an existing one ends. This means a new room is needed. Increment `rooms_needed` and advance `s_ptr`.
        - Else (`start_times[s_ptr] >= end_times[e_ptr]`): A meeting ends *before or at the same time* as a new one starts. This means a room is freed. Decrement `rooms_needed` and advance `e_ptr`.
          *(Important Note: If `start_times[s_ptr] == end_times[e_ptr]`, we prioritize the `end_time` event. This effectively means a room is freed just as a new meeting starts, allowing the room to be immediately reused. If we increment `s_ptr` first, we would momentarily count one extra room than necessary.)*
     b. **Update Maximum:** `max_rooms = max(max_rooms, rooms_needed)`.
5. Return `max_rooms`.

**Example Walkthrough:** `[[0,30],[5,10],[15,20]]`
1. `start_times = [0, 5, 15]`
2. `end_times = [10, 20, 30]`
3. `rooms_needed = 0`, `max_rooms = 0`, `s_ptr = 0`, `e_ptr = 0`

| Iteration | `s_ptr` | `e_ptr` | `start_times[s_ptr]` | `end_times[e_ptr]` | Condition (`s < e`?) | Action                               | `rooms_needed` | `max_rooms` |
|-----------|---------|---------|----------------------|--------------------|----------------------|--------------------------------------|----------------|-------------|
| 1         | 0       | 0       | 0                    | 10                 | True                 | `rooms_needed++`, `s_ptr++`          | 1              | 1           |
| 2         | 1       | 0       | 5                    | 10                 | True                 | `rooms_needed++`, `s_ptr++`          | 2              | 2           |
| 3         | 2       | 0       | 15                   | 10                 | False (`15 >= 10`)   | `rooms_needed--`, `e_ptr++`          | 1              | 2           |
| 4         | 2       | 1       | 15                   | 20                 | True                 | `rooms_needed++`, `s_ptr++`          | 2              | 2           |
| 5         | 3       | 1       | (End of `start_times` loop) |                    |                      | Loop terminates                      |                |             |

Final `max_rooms = 2`.

**Time Complexity:** O(N log N)
- Sorting `start_times` and `end_times` takes O(N log N) each.
- The two-pointer sweep takes O(N) because each pointer traverses its respective sorted list once.
- Overall: O(N log N).

**Space Complexity:** O(N)
- Two additional lists of size `N` are created for start and end times.
---