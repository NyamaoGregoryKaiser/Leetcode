```markdown
# Binary Search: A Comprehensive Explanation

Binary Search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.

## Prerequisites

The most crucial prerequisite for Binary Search is that the input data **must be sorted**. If the data is unsorted, Binary Search cannot be applied directly, and you would typically need to sort it first (which adds O(N log N) time complexity) or use a linear scan (O(N)).

## Core Principle: Divide and Conquer

The fundamental idea behind Binary Search is "divide and conquer":

1.  **Initialize Pointers**: Start with two pointers, `left` and `right`, representing the bounds of your search space. `left` usually points to the first element (index 0) and `right` to the last element (index `N-1`).
2.  **Calculate Midpoint**: Calculate the middle index `mid = left + floor((right - left) / 2)`. This calculation is preferred over `(left + right) / 2` to prevent potential integer overflow in languages with fixed-size integers when `left` and `right` are very large (though less critical in JavaScript).
3.  **Compare**:
    *   If `nums[mid]` is the `target`, you've found it! Return `mid`.
    *   If `target` is less than `nums[mid]`, the target must be in the left half of the search space. Update `right = mid - 1`.
    *   If `target` is greater than `nums[mid]`, the target must be in the right half of the search space. Update `left = mid + 1`.
4.  **Repeat**: Continue steps 2-3 until `left > right`. If the loop finishes, it means the search space has become empty, and the target was not found.

## Time and Space Complexity

*   **Time Complexity**: O(log N)
    *   In each step, the search space is roughly halved. For an array of N elements, it takes approximately `log2(N)` steps to narrow down to a single element. This is extremely efficient for large datasets.
*   **Space Complexity**:
    *   **Iterative**: O(1) because only a constant number of variables (e.g., `left`, `right`, `mid`) are used.
    *   **Recursive**: O(log N) due to the recursion stack. Each recursive call adds a frame to the stack, and in the worst case, the depth of the stack is proportional to `log N`.

## ASCII Diagrams: Standard Binary Search

Let's trace `standardBinarySearchIterative([1, 3, 5, 7, 9, 11, 13, 15, 17, 19], 13)`:

```
Array: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
Indices: 0  1  2  3  4   5   6   7   8   9
Target: 13

Initial:
left = 0, right = 9
Search space: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
                ^                        ^

Iteration 1:
mid = 0 + floor((9 - 0) / 2) = 4
nums[mid] (nums[4]) = 9
Target (13) > nums[mid] (9) => target is in the right half.
left = mid + 1 = 5
right = 9
Search space:               [11, 13, 15, 17, 19]
                             ^                 ^

Iteration 2:
mid = 5 + floor((9 - 5) / 2) = 5 + floor(4 / 2) = 5 + 2 = 7
nums[mid] (nums[7]) = 15
Target (13) < nums[mid] (15) => target is in the left half.
left = 5
right = mid - 1 = 6
Search space:               [11, 13]
                             ^   ^

Iteration 3:
mid = 5 + floor((6 - 5) / 2) = 5 + floor(1 / 2) = 5 + 0 = 5
nums[mid] (nums[5]) = 11
Target (13) > nums[mid] (11) => target is in the right half.
left = mid + 1 = 6
right = 6
Search space:                   [13]
                                 ^

Iteration 4:
mid = 6 + floor((6 - 6) / 2) = 6
nums[mid] (nums[6]) = 13
Target (13) == nums[mid] (13) => Target found!
Return mid = 6
```

## Problem Patterns and Variations

Binary search is not just for finding an exact element. It's a powerful technique for any problem where you can eliminate half of the search space based on a comparison.

### 1. Finding First/Last Occurrence

When an array contains duplicates, a standard binary search might return any index of the target. To find the *first* or *last* occurrence, we modify the standard algorithm:

*   **Find First Occurrence**:
    *   When `nums[mid] == target`, we store `mid` as a potential answer (`firstIndex = mid`).
    *   Crucially, we then continue searching in the `left` half (`right = mid - 1`) to see if an even earlier occurrence exists.
*   **Find Last Occurrence**:
    *   When `nums[mid] == target`, we store `mid` as a potential answer (`lastIndex = mid`).
    *   We then continue searching in the `right` half (`left = mid + 1`) to see if an even later occurrence exists.

```
Example: findFirstAndLastOccurrence([1, 3, 3, 3, 5], 3)

Finding First:
[1, 3, 3, 3, 5], target = 3
L=0, R=4, mid=2, nums[2]=3. Match! firstIndex=2. Search left: R=1.
[1, 3, 3, 3, 5]
 ^  ^
L=0, R=1, mid=0, nums[0]=1. 1 < 3. Search right: L=1.
[1, 3, 3, 3, 5]
    ^
L=1, R=1, mid=1, nums[1]=3. Match! firstIndex=1. Search left: R=0.
[1, 3, 3, 3, 5]
 ^
L=1, R=0. L > R. Loop ends.
Return firstIndex = 1.

Finding Last:
[1, 3, 3, 3, 5], target = 3
L=0, R=4, mid=2, nums[2]=3. Match! lastIndex=2. Search right: L=3.
[1, 3, 3, 3, 5]
          ^   ^
L=3, R=4, mid=3, nums[3]=3. Match! lastIndex=3. Search right: L=4.
[1, 3, 3, 3, 5]
            ^ ^
L=4, R=4, mid=4, nums[4]=5. 5 > 3. Search left: R=3.
[1, 3, 3, 3, 5]
            ^
L=4, R=3. L > R. Loop ends.
Return lastIndex = 3.

Combined: [1, 3]
```

### 2. Search in Rotated Sorted Array

This problem requires identifying which half of the rotated array is *sorted* and then deciding which half the target might reside in.

*   **Key Idea**: In a rotated sorted array, at least one half (from `left` to `mid` or `mid` to `right`) will always be conventionally sorted.
*   **Algorithm**:
    1.  Calculate `mid`.
    2.  If `nums[mid]` is the `target`, return `mid`.
    3.  **Identify Sorted Half**: Check if `nums[left] <= nums[mid]`.
        *   If true, the left half `[left...mid]` is sorted.
            *   Check if `target` is within this sorted range: `nums[left] <= target < nums[mid]`.
            *   If yes, search left: `right = mid - 1`.
            *   If no, target must be in the unsorted right half: `left = mid + 1`.
        *   If false, the right half `[mid...right]` is sorted.
            *   Check if `target` is within this sorted range: `nums[mid] < target <= nums[right]`.
            *   If yes, search right: `left = mid + 1`.
            *   If no, target must be in the unsorted left half: `right = mid - 1`.

```
Example: searchInRotatedSortedArray([4, 5, 6, 7, 0, 1, 2], 0)
Target = 0

Initial:
[4, 5, 6, 7, 0, 1, 2]
 ^                 ^
L=0, R=6, mid=3, nums[3]=7

Iteration 1:
nums[mid] (7) != target (0).
nums[left] (4) <= nums[mid] (7) => Left half [4, 5, 6, 7] is sorted.
Is target (0) in [4, 7]? No (0 is not >= 4 and < 7).
So, target must be in the unsorted right half.
left = mid + 1 = 4.
[4, 5, 6, 7, 0, 1, 2]
                   ^
               ^
L=4, R=6, mid=5, nums[5]=1

Iteration 2:
nums[mid] (1) != target (0).
nums[left] (0) <= nums[mid] (1) => Left half [0, 1] is sorted (this is the rotated portion, but now looks sorted).
Is target (0) in [0, 1]? Yes (0 is >= 0 and < 1).
So, target is in the sorted left half.
right = mid - 1 = 4.
[4, 5, 6, 7, 0, 1, 2]
                   ^
             ^
L=4, R=4, mid=4, nums[4]=0

Iteration 3:
nums[mid] (0) == target (0). Found!
Return mid = 4.
```

### 3. Find Peak Element

This problem leverages the property `nums[-1] = nums[n] = -Infinity` to guarantee a peak exists. The search eliminates halves based on the local slope.

*   **Key Idea**: If `nums[mid] < nums[mid + 1]`, you are on an ascending slope. The peak must be to the right (including `mid + 1`). If `nums[mid] > nums[mid + 1]`, you are on a descending slope or at a peak. The peak must be at or to the left of `mid`.
*   **Algorithm**:
    1.  Initialize `left = 0`, `right = nums.length - 1`.
    2.  Loop while `left < right` (when `left == right`, it's the peak).
    3.  Calculate `mid`.
    4.  If `nums[mid] < nums[mid + 1]`: You are going uphill. The peak is to the right. `left = mid + 1`.
    5.  Else (`nums[mid] > nums[mid + 1]`): You are going downhill or at a peak. The peak is at `mid` or to its left. `right = mid`.
    6.  Return `left` (or `right`) when the loop terminates.

```
Example: findPeakElement([1, 2, 1, 3, 5, 6, 4])

Initial:
[1, 2, 1, 3, 5, 6, 4]
 ^                 ^
L=0, R=6

Iteration 1:
mid = 3, nums[3]=3. nums[mid+1] (nums[4]) = 5.
nums[3] (3) < nums[4] (5) => Uphill slope. Peak is to the right.
left = mid + 1 = 4.
[1, 2, 1, 3, 5, 6, 4]
                   ^
               ^
L=4, R=6

Iteration 2:
mid = 5, nums[5]=6. nums[mid+1] (nums[6]) = 4.
nums[5] (6) > nums[6] (4) => Downhill slope or peak. Peak is at mid or left.
right = mid = 5.
[1, 2, 1, 3, 5, 6, 4]
                 ^
             ^
L=4, R=5

Iteration 3:
mid = 4, nums[4]=5. nums[mid+1] (nums[5]) = 6.
nums[4] (5) < nums[5] (6) => Uphill slope. Peak is to the right.
left = mid + 1 = 5.
[1, 2, 1, 3, 5, 6, 4]
                 ^
                 ^
L=5, R=5. Loop terminates (left == right).

Return left = 5. (nums[5] = 6 is a peak).
```

### 4. Binary Search on the Answer (Koko Eating Bananas)

This is a powerful pattern where the binary search is applied not on an input array, but on the *range of possible answers* to the problem.

*   **When to Use**: When a problem asks for the "minimum possible `X`" or "maximum possible `X`" that satisfies a certain condition, and the condition is *monotonic* with respect to `X`. Monotonic means:
    *   If `X` works, then `X+1`, `X+2`, ... will also work.
    *   If `X` doesn't work, then `X-1`, `X-2`, ... will also not work.
*   **Algorithm**:
    1.  **Define Search Space for the Answer**: Determine the minimum (`min_val`) and maximum (`max_val`) possible values for `X`. This defines `left` and `right`.
        *   For Koko: `k` (speed) can be `1` (min) to `max(piles)` (max).
    2.  **Define `check(X)` Function**: Create a helper function `check(X)` that determines if `X` is a feasible solution. This function typically iterates through the input data, taking O(N) time.
        *   For Koko: `canFinishEating(piles, k, h)` checks if Koko can finish within `h` hours with speed `k`.
    3.  **Perform Binary Search**:
        *   Calculate `mid = left + floor((right - left) / 2)`.
        *   If `check(mid)` is true: `mid` is a possible answer. Store it and try to find an *even better* (e.g., smaller) answer in the `left` half. `result = mid`, `right = mid - 1`.
        *   If `check(mid)` is false: `mid` is not sufficient. Need a larger answer. `left = mid + 1`.
    4.  Return `result`.

```
Example: minEatingSpeed([3, 6, 7, 11], 8)
Piles = [3, 6, 7, 11], H = 8

Search space for K (speed):
Min K = 1
Max K = max(piles) = 11
So, left = 1, right = 11. result = 11 (max possible k is a valid but not optimal answer initially)

Function canFinishEating(piles, k, H_limit):
  hours = 0
  for p in piles: hours += ceil(p / k)
  return hours <= H_limit

Iteration 1:
L=1, R=11, mid=6.
canFinishEating([3,6,7,11], 6, 8)?
  hours = ceil(3/6) + ceil(6/6) + ceil(7/6) + ceil(11/6)
        = 1 + 1 + 2 + 2 = 6.
  6 <= 8? Yes.
mid=6 is a possible answer. Store it: result = 6. Try smaller K: R = mid - 1 = 5.
[1, 5]
 ^ ^
L=1, R=5, mid=3

Iteration 2:
L=1, R=5, mid=3.
canFinishEating([3,6,7,11], 3, 8)?
  hours = ceil(3/3) + ceil(6/3) + ceil(7/3) + ceil(11/3)
        = 1 + 2 + 3 + 4 = 10.
  10 <= 8? No.
mid=3 is too slow. Need faster K: L = mid + 1 = 4.
[4, 5]
 ^ ^
L=4, R=5, mid=4

Iteration 3:
L=4, R=5, mid=4.
canFinishEating([3,6,7,11], 4, 8)?
  hours = ceil(3/4) + ceil(6/4) + ceil(7/4) + ceil(11/4)
        = 1 + 2 + 2 + 3 = 8.
  8 <= 8? Yes.
mid=4 is a possible answer. Store it: result = 4. Try smaller K: R = mid - 1 = 3.
[4, 3]
 ^
   ^
L=4, R=3. L > R. Loop ends.

Return result = 4.
```

## Edge Cases and Gotchas

1.  **Empty Array**: Always check for `nums.length === 0`. Binary search won't work, typically return -1.
2.  **Single Element Array**: Ensure your logic handles `left == right` correctly (e.g., `mid` calculation and pointer updates).
3.  **Target Not Found**: The `while (left <= right)` condition and how `left`/`right` are updated (`mid + 1`, `mid - 1`) are crucial. If `target` is not found, `left` will eventually become `right + 1`.
4.  **Integer Overflow (`mid` calculation)**: While `(left + right) / 2` works in JavaScript (due to arbitrary precision numbers), in languages like C++/Java, `left + floor((right - left) / 2)` or `left + ((right - left) >> 1)` is safer to prevent overflow when `left + right` exceeds the maximum integer value.
5.  **Infinite Loops**: Incorrectly updating `left` or `right` (e.g., `left = mid` instead of `left = mid + 1`) can lead to infinite loops, especially when `mid` might not change. This is common in problems like "Find First Occurrence" or "Find Peak Element" where the `right = mid` vs `right = mid - 1` distinction is subtle but critical.
6.  **Off-by-one Errors**: Pay close attention to inclusive vs. exclusive bounds (`left <= right` vs `left < right`) and pointer adjustments (`mid+1` vs `mid`). The exact conditions depend on the problem and how you define your search space.
7.  **Duplicate Elements**: If duplicates are present and you need a specific occurrence (first/last), standard binary search isn't enough; you need modifications as shown above.
8.  **"Binary Search on Answer"**: Remember that the search space is the *possible range of answers*, not necessarily the input array. Ensure the `check()` function is monotonic.

## General Template for Binary Search Problems

```javascript
function binarySearchTemplate(nums, target) {
    let left = 0;
    let right = nums.length - 1; // Or nums.length for upper bound problems

    let result = -1; // Or some initial best answer for "binary search on answer" problems

    while (left <= right) { // Or left < right depending on conditions and pointer updates
        const mid = left + Math.floor((right - left) / 2);

        // --- Core Logic based on comparison with nums[mid] ---
        if (nums[mid] === target) {
            result = mid; // Found it! Maybe keep searching (e.g., for first/last occurrence)
            // Example for first occurrence: right = mid - 1;
            // Example for last occurrence: left = mid + 1;
            // Example for exact match: return mid;
        } else if (nums[mid] < target) {
            left = mid + 1; // Target is in the right half
        } else { // nums[mid] > target
            right = mid - 1; // Target is in the left half
        }
        // --- End Core Logic ---

        // For "Binary Search on Answer" problems, the logic might look like this:
        // if (check(mid)) { // mid is a feasible answer
        //     result = mid;
        //     right = mid - 1; // Try to find a smaller/better answer
        // } else { // mid is not feasible
        //     left = mid + 1; // Need a larger/different answer
        // }
    }

    return result; // Or the best found answer for "binary search on answer"
}
```

By understanding these principles, common patterns, and potential pitfalls, you'll be well-equipped to tackle a wide range of Binary Search problems in interviews.
```