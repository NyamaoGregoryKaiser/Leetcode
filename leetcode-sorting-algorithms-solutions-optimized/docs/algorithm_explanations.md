# Algorithm Explanations

This document provides detailed explanations for the sorting algorithms and related problems implemented in this project. Each section covers the core idea, step-by-step logic, and a breakdown of its time and space complexity.

---

## 1. Basic Sorting Algorithms (`algorithms/sorting_algorithms.py`)

### 1.1. Insertion Sort

**Core Idea:**
Insertion sort builds the final sorted array (or list) one item at a time. It iterates through the input array and removes one element at a time, finds the place where it belongs within the already sorted part, and inserts it there. The sorted part grows from left to right.

**Step-by-Step Logic:**
1.  Start from the second element (`i = 1`). Assume the first element (`arr[0]`) is already sorted.
2.  Take the current element (`arr[i]`) and store it as `key`.
3.  Compare `key` with elements in the sorted sub-array (elements to its left, `arr[0...i-1]`).
4.  Shift all elements in the sorted sub-array that are greater than `key` one position to their right to make space.
5.  Insert `key` into its correct position.
6.  Repeat for all elements from `i=1` to `n-1`.

**Example Walkthrough:**
Array: `[5, 2, 4, 6, 1, 3]`

1.  `i = 1`, `key = 2`. Sorted part: `[5]`.
    *   `2 < 5`. Shift `5` to the right. Array: `[?, 5, 4, 6, 1, 3]`.
    *   Insert `2`. Array: `[2, 5, 4, 6, 1, 3]`.
2.  `i = 2`, `key = 4`. Sorted part: `[2, 5]`.
    *   `4` is not `< 2`.
    *   `4 < 5`. Shift `5` to the right. Array: `[2, ?, 5, 6, 1, 3]`.
    *   Insert `4`. Array: `[2, 4, 5, 6, 1, 3]`.
3.  `i = 3`, `key = 6`. Sorted part: `[2, 4, 5]`.
    *   `6` is not `< 5`. No shifts. Array: `[2, 4, 5, 6, 1, 3]`.
4.  `i = 4`, `key = 1`. Sorted part: `[2, 4, 5, 6]`.
    *   `1 < 6`. Shift `6`. `[..., 6, 1, 3]` becomes `[..., ?, 6, 3]`.
    *   `1 < 5`. Shift `5`. `[..., 5, 6, 3]` becomes `[..., ?, 5, 6, 3]`.
    *   `1 < 4`. Shift `4`. `[..., 4, 5, 6, 3]` becomes `[..., ?, 4, 5, 6, 3]`.
    *   `1 < 2`. Shift `2`. `[?, 2, 4, 5, 6, 3]` becomes `[?, ?, 4, 5, 6, 3]`.
    *   Insert `1`. Array: `[1, 2, 4, 5, 6, 3]`.
5.  `i = 5`, `key = 3`. Sorted part: `[1, 2, 4, 5, 6]`.
    *   `3 < 6`. Shift `6`.
    *   `3 < 5`. Shift `5`.
    *   `3 < 4`. Shift `4`.
    *   `3` is not `< 2`.
    *   Insert `3`. Array: `[1, 2, 3, 4, 5, 6]`.

**Complexity:**
*   **Time:**
    *   **Worst-case:** O(N^2) (e.g., reverse sorted array, each element shifts maximum times)
    *   **Average-case:** O(N^2)
    *   **Best-case:** O(N) (e.g., already sorted array, minimal comparisons)
*   **Space:** O(1) (in-place)

**Pros:**
*   Simple to implement.
*   Efficient for small data sets.
*   Efficient for data sets that are already substantially sorted.
*   Stable (preserves relative order of equal elements).

**Cons:**
*   Inefficient for large, unsorted data sets.

---

### 1.2. Merge Sort

**Core Idea:**
Merge sort is a divide-and-conquer algorithm. It recursively divides an array in half until it gets to single-element arrays (which are inherently sorted), then merges those halves back together in sorted order.

**Step-by-Step Logic:**
1.  **Divide:** If the array has more than one element, divide it into two halves.
2.  **Conquer:** Recursively sort each half using Merge Sort.
3.  **Combine (Merge):** Merge the two sorted halves back into a single sorted array. This is the crucial step where the actual sorting work happens.

**`_merge` Helper Function Logic:**
Given two already sorted lists, `left` and `right`:
1.  Initialize an empty `merged_list`.
2.  Use two pointers, `i` for `left` and `j` for `right`, both starting at 0.
3.  While both `i` and `j` are within their respective list bounds:
    *   Compare `left[i]` and `right[j]`.
    *   Append the smaller element to `merged_list` and advance its pointer.
4.  After one list is exhausted, append all remaining elements from the other list to `merged_list`.

**Example Walkthrough:**
Array: `[38, 27, 43, 3, 9, 82, 10]`

1.  **Divide:**
    `[38, 27, 43, 3]` | `[9, 82, 10]`
2.  **Recursively sort left:**
    `[38, 27]` | `[43, 3]` -> `[27, 38]` | `[3, 43]` -> `[3, 27, 38, 43]` (after merging)
3.  **Recursively sort right:**
    `[9, 82]` | `[10]` -> `[9, 82]` | `[10]` -> `[9, 10, 82]` (after merging)
4.  **Merge final halves:**
    `[3, 27, 38, 43]` and `[9, 10, 82]`
    *   Compare 3 and 9. Add 3. `merged=[3]`
    *   Compare 27 and 9. Add 9. `merged=[3, 9]`
    *   Compare 27 and 10. Add 10. `merged=[3, 9, 10]`
    *   Compare 27 and 82. Add 27. `merged=[3, 9, 10, 27]`
    *   Compare 38 and 82. Add 38. `merged=[3, 9, 10, 27, 38]`
    *   Compare 43 and 82. Add 43. `merged=[3, 9, 10, 27, 38, 43]`
    *   `left` is exhausted. Add remaining from `right`.
    *   Final: `[3, 9, 10, 27, 38, 43, 82]`

**Complexity:**
*   **Time:**
    *   **Worst-case:** O(N log N)
    *   **Average-case:** O(N log N)
    *   **Best-case:** O(N log N) (even if input is sorted, it still divides and merges)
*   **Space:** O(N) (due to auxiliary arrays created during merging)

**Pros:**
*   Guaranteed O(N log N) performance in all cases.
*   Stable sort.
*   Well-suited for parallel processing.
*   Good for external sorting (when data doesn't fit in memory).

**Cons:**
*   Requires O(N) auxiliary space, which can be an issue for very large datasets or memory-constrained environments.
*   Can be slower than Quick Sort in practice due to higher constant factors and cache performance.

---

### 1.3. Quick Sort

**Core Idea:**
Quick Sort is also a divide-and-conquer algorithm. It picks an element as a `pivot` and partitions the given array around the picked pivot. The pivot is placed at its correct sorted position in the array. This process is applied recursively to the sub-arrays on either side of the pivot.

**Step-by-Step Logic (Lomuto Partition Scheme):**
1.  **Choose a Pivot:** Select an element from the array to be the pivot. (Common choices: first, last, middle, or random element. Using last element for simplicity in Lomuto.)
2.  **Partition:** Rearrange the array such that all elements smaller than the pivot come before it, and all elements greater than the pivot come after it. Elements equal to the pivot can go on either side.
    *   Maintain an index `i` (index of smaller element), initially `low - 1`.
    *   Iterate `j` from `low` to `high-1` (excluding pivot at `high`):
        *   If `arr[j]` is less than or equal to the pivot, increment `i` and swap `arr[i]` with `arr[j]`.
    *   Finally, swap `arr[i+1]` with `arr[high]` (the pivot). This places the pivot in its correct sorted position.
    *   Return `i+1` (the pivot's final index).
3.  **Recurse:** Recursively apply Quick Sort to the sub-array of elements smaller than the pivot and to the sub-array of elements greater than the pivot.

**Example Walkthrough (Lomuto, last element as pivot):**
Array: `[10, 80, 30, 90, 40, 50, 70]`

`_quicksort_recursive([10, 80, 30, 90, 40, 50, 70], 0, 6)`
*   `low = 0`, `high = 6`. `pivot = arr[6] = 70`.
*   `i = -1`.
*   `j = 0`: `arr[0] = 10 <= 70`. `i=0`. Swap `arr[0]` with `arr[0]`. Array: `[10, 80, 30, 90, 40, 50, 70]`
*   `j = 1`: `arr[1] = 80 > 70`. No swap.
*   `j = 2`: `arr[2] = 30 <= 70`. `i=1`. Swap `arr[1]` (`80`) with `arr[2]` (`30`). Array: `[10, 30, 80, 90, 40, 50, 70]`
*   `j = 3`: `arr[3] = 90 > 70`. No swap.
*   `j = 4`: `arr[4] = 40 <= 70`. `i=2`. Swap `arr[2]` (`80`) with `arr[4]` (`40`). Array: `[10, 30, 40, 90, 80, 50, 70]`
*   `j = 5`: `arr[5] = 50 <= 70`. `i=3`. Swap `arr[3]` (`90`) with `arr[5]` (`50`). Array: `[10, 30, 40, 50, 80, 90, 70]`
*   End loop. `i=3`. Swap `arr[i+1]` (`arr[4]=80`) with `arr[high]` (`arr[6]=70`).
    Array: `[10, 30, 40, 50, 70, 90, 80]`. Pivot `70` is at index `4`.
*   Partition index (`pi`) is `4`.
*   Recursively sort left sub-array: `[10, 30, 40, 50]` (indices 0 to 3)
*   Recursively sort right sub-array: `[90, 80]` (indices 5 to 6)

**Complexity:**
*   **Time:**
    *   **Worst-case:** O(N^2) (e.g., if pivot selection consistently picks the smallest/largest element, leading to highly unbalanced partitions)
    *   **Average-case:** O(N log N) (with a good pivot strategy, partitions are relatively balanced)
    *   **Best-case:** O(N log N)
*   **Space:**
    *   O(log N) average-case (for the recursion stack)
    *   O(N) worst-case (for the recursion stack, if partitions are highly unbalanced)

**Pros:**
*   Generally faster in practice than Merge Sort due to better constant factors and cache performance (often in-place partitioning).
*   Can be implemented in-place (minimal auxiliary space for the data itself, recursion stack is the main space user).

**Cons:**
*   Worst-case O(N^2) performance is a concern, though rare with randomized pivot selection.
*   Not a stable sort.

---

## 2. Custom Object Sorting (`algorithms/variations.py`)

**Problem:** Sort a list of `Person` objects (with `age` and `name`) first by `age` (ascending), then by `name` (ascending) for people with the same age.

**Core Idea:**
Python's built-in `list.sort()` and `sorted()` functions are highly optimized (using Timsort). They accept a `key` argument which is a function that extracts a comparison key from each element. For multi-level sorting, a tuple can be returned by the `key` function. Python compares tuples lexicographically.

**Approach 1: Using `key=lambda` (Pythonic and Recommended)**
*   The `lambda` function `lambda person: (person.age, person.name)` generates a tuple `(age, name)` for each `Person` object.
*   Python's sort will then compare these tuples: it first compares the first elements (age). If they are equal, it compares the second elements (name), and so on.

**Approach 2: Using `functools.cmp_to_key` (For complex custom comparison logic)**
*   This approach is a bridge from Python 2's `cmp` style functions to Python 3's `key` style.
*   You define a `compare_people(p1, p2)` function that returns:
    *   `-1` if `p1` should come before `p2`
    *   `1` if `p1` should come after `p2`
    *   `0` if they are considered equal for sorting purposes
*   `functools.cmp_to_key(compare_people)` converts this old-style comparison function into a key function suitable for `sort()`.

**Complexity:**
*   **Time:** O(N log N) (dominated by Timsort).
*   **Space:** O(N) or O(log N) (Timsort's auxiliary space).

---

## 3. Kth Largest Element in an Array (`algorithms/variations.py`)

**Problem:** Find the `k`-th largest element in an unsorted array.

### Approach 1: Sorting (Brute Force)

**Core Idea:**
The simplest way is to sort the entire array and then pick the element at the `(N - k)`-th index (for 0-indexed arrays).

**Logic:**
1.  Sort the `nums` array in ascending order.
2.  Return `nums[len(nums) - k]`.

**Complexity:**
*   **Time:** O(N log N) (due to sorting).
*   **Space:** O(N) or O(log N) (depending on the sort implementation).

### Approach 2: Min-Heap / Priority Queue (Optimized for repeated queries or streaming data)

**Core Idea:**
Maintain a min-heap of size `k`. As you iterate through the array, add elements to the heap. If the heap size exceeds `k`, remove the smallest element (the root of the min-heap). After processing all elements, the smallest element remaining in the heap will be the `k`-th largest overall.

**Logic:**
1.  Initialize an empty min-heap.
2.  For each `num` in `nums`:
    *   Push `num` onto the min-heap.
    *   If the heap's size becomes greater than `k`, pop the smallest element from the heap.
3.  After iterating through all numbers, the root of the min-heap (`min_heap[0]`) is the `k`-th largest element.

**Complexity:**
*   **Time:** O(N log K) (N insertions/deletions into a heap of size K).
*   **Space:** O(K) (to store K elements in the heap).

### Approach 3: Quickselect (Optimal Average Case)

**Core Idea:**
Quickselect is a selection algorithm, a close cousin to Quick Sort. Instead of recursively sorting both partitions, it only recurses into the partition that contains the desired `k`-th element. This significantly reduces the average-case complexity.

**Logic:**
1.  Determine the `target_idx` for the `k`-th largest element. If the array has `N` elements, the `k`-th largest is at index `N - k` (0-indexed) in a sorted array.
2.  Implement a `_partition` function similar to Quick Sort, which partitions a sub-array `arr[left...right]` around a chosen pivot, returning the pivot's final index. Randomized pivot selection is highly recommended to avoid worst-case scenarios.
3.  Implement a recursive `_quickselect_recursive(arr, left, right)`:
    *   Base case: If `left == right`, return `arr[left]`.
    *   Partition the sub-array `arr[left...right]`. Let `pivot_final_idx` be the index where the pivot ends up.
    *   If `pivot_final_idx == target_idx`, we found our element, return `arr[target_idx]`.
    *   If `target_idx < pivot_final_idx`, the `k`-th largest element must be in the left partition, so recurse on `arr[left...pivot_final_idx - 1]`.
    *   If `target_idx > pivot_final_idx`, the `k`-th largest element must be in the right partition, so recurse on `arr[pivot_final_idx + 1...right]`.

**Complexity:**
*   **Time:**
    *   **Average-case:** O(N) (each step processes a fraction of the remaining elements).
    *   **Worst-case:** O(N^2) (if pivot selection consistently leads to unbalanced partitions; mitigated by randomized pivot).
*   **Space:**
    *   O(log N) average-case (for recursion stack).
    *   O(N) worst-case (for recursion stack).

---

## 4. Sort Colors (Dutch National Flag Problem) (`algorithms/variations.py`)

**Problem:** Sort an array of `0`s, `1`s, and `2`s (representing red, white, blue) in-place.

### Approach 1: One-Pass Algorithm (Dutch National Flag)

**Core Idea:**
This algorithm uses three pointers to partition the array into three sections in a single pass:
*   `low`: Points to the end of the `0`s section. Elements `arr[0...low-1]` are `0`s.
*   `mid`: Current element being considered. Elements `arr[low...mid-1]` are `1`s.
*   `high`: Points to the start of the `2`s section. Elements `arr[high+1...n-1]` are `2`s.

**Logic:**
1.  Initialize `low = 0`, `mid = 0`, `high = len(nums) - 1`.
2.  While `mid <= high`:
    *   If `nums[mid]` is `0`:
        *   Swap `nums[low]` and `nums[mid]`.
        *   Increment `low` and `mid`. (The element swapped from `low` is guaranteed to be a `0` or `1`, if it was `1`, it moves to `mid`'s old position, which is still correct for `1`s; if it was `0`, it's now correctly placed. If `low == mid`, then `0` is swapped with itself, and both advance.)
    *   If `nums[mid]` is `1`:
        *   Increment `mid`. (It's in its correct "middle" position).
    *   If `nums[mid]` is `2`:
        *   Swap `nums[mid]` and `nums[high]`.
        *   Decrement `high`. (The element swapped into `mid`'s position *must be re-evaluated* because it could be a `0`, `1`, or `2`. So, do NOT increment `mid`.)

**Example Walkthrough:**
Array: `[2, 0, 2, 1, 1, 0]`

| `low` | `mid` | `high` | `nums`                 | Action                        |
| :---- | :---- | :----- | :--------------------- | :---------------------------- |
| 0     | 0     | 5      | `[2, 0, 2, 1, 1, 0]`   | `nums[0]=2`. Swap `nums[0]` with `nums[5]`. `high--`. |
| 0     | 0     | 4      | `[0, 0, 2, 1, 1, 2]`   | `nums[0]=0`. Swap `nums[0]` with `nums[0]`. `low++`, `mid++`. |
| 1     | 1     | 4      | `[0, 0, 2, 1, 1, 2]`   | `nums[1]=0`. Swap `nums[1]` with `nums[1]`. `low++`, `mid++`. |
| 2     | 2     | 4      | `[0, 0, 2, 1, 1, 2]`   | `nums[2]=2`. Swap `nums[2]` with `nums[4]`. `high--`. |
| 2     | 2     | 3      | `[0, 0, 1, 1, 2, 2]`   | `nums[2]=1`. `mid++`.         |
| 2     | 3     | 3      | `[0, 0, 1, 1, 2, 2]`   | `nums[3]=1`. `mid++`.         |
| 2     | 4     | 3      | `[0, 0, 1, 1, 2, 2]`   | `mid > high`. Loop terminates. |

Final: `[0, 0, 1, 1, 2, 2]`

**Complexity:**
*   **Time:** O(N) (single pass).
*   **Space:** O(1) (in-place).

### Approach 2: Two-Pass Counting Sort (Alternative)

**Core Idea:**
Count the occurrences of each color (0, 1, 2), then overwrite the array based on these counts.

**Logic:**
1.  Initialize counts for 0s, 1s, and 2s to zero.
2.  First pass: Iterate through the array and increment the respective count for each number.
3.  Second pass: Overwrite the original array:
    *   Place `count[0]` zeros at the beginning.
    *   Then place `count[1]` ones.
    *   Finally, place `count[2]` twos.

**Complexity:**
*   **Time:** O(N) (one pass for counting, one pass for rebuilding).
*   **Space:** O(1) (if the number of distinct colors, 3, is considered constant).

---

## 5. Wiggle Sort (`algorithms/variations.py`)

**Problem:** Reorder an array `nums` in-place such that `nums[0] <= nums[1] >= nums[2] <= nums[3]...`.

### Approach 1: Sort then Swap (Brute Force)

**Core Idea:**
If the array is sorted, it's easy to create the wiggle pattern by simply swapping adjacent elements from the second position onwards.

**Logic:**
1.  Sort the `nums` array in ascending order.
2.  Iterate from `i = 1` up to `n - 2` (exclusive of `n-1` to avoid index out of bounds on `i+1`), with a step of 2.
3.  Swap `nums[i]` and `nums[i+1]`.

**Example Walkthrough:**
Array: `[3, 5, 2, 1, 6, 4]`

1.  Sort: `[1, 2, 3, 4, 5, 6]`
2.  Swaps:
    *   `i=1`: Swap `nums[1]` (2) and `nums[2]` (3). Array: `[1, 3, 2, 4, 5, 6]`
    *   `i=3`: Swap `nums[3]` (4) and `nums[4]` (5). Array: `[1, 3, 2, 5, 4, 6]`
3.  Final: `[1, 3, 2, 5, 4, 6]` (1 <= 3 >= 2 <= 5 >= 4 <= 6)

**Complexity:**
*   **Time:** O(N log N) (dominated by sorting).
*   **Space:** O(N) or O(log N) (depending on the sort implementation).

### Approach 2: Single Pass (Optimal)

**Core Idea:**
Iterate through the array and ensure the wiggle condition is met for each adjacent pair. If a condition is violated, swap the elements.

The conditions are:
*   For even indices `i` (`0, 2, 4, ...`): `nums[i] <= nums[i+1]`
*   For odd indices `i` (`1, 3, 5, ...`): `nums[i] >= nums[i+1]`

**Logic:**
1.  Iterate from `i = 0` to `n - 2`.
2.  If `i` is an even index:
    *   If `nums[i] > nums[i+1]`, swap them. (Ensures `nums[i] <= nums[i+1]`)
3.  If `i` is an odd index:
    *   If `nums[i] < nums[i+1]`, swap them. (Ensures `nums[i] >= nums[i+1]`)

**Example Walkthrough:**
Array: `[3, 5, 2, 1, 6, 4]`

| i | `nums`                 | Condition Check              | Action                |
| :- | :--------------------- | :--------------------------- | :-------------------- |
| 0 | `[3, 5, 2, 1, 6, 4]`   | Even, `nums[0] <= nums[1]`?  | `3 <= 5` (True).      |
| 1 | `[3, 5, 2, 1, 6, 4]`   | Odd, `nums[1] >= nums[2]`?   | `5 >= 2` (True).      |
| 2 | `[3, 5, 2, 1, 6, 4]`   | Even, `nums[2] <= nums[3]`?  | `2 <= 1` (False). Swap `nums[2]` and `nums[3]`. |
|   | `[3, 5, 1, 2, 6, 4]`   |                              |                       |
| 3 | `[3, 5, 1, 2, 6, 4]`   | Odd, `nums[3] >= nums[4]`?   | `2 >= 6` (False). Swap `nums[3]` and `nums[4]`. |
|   | `[3, 5, 1, 6, 2, 4]`   |                              |                       |
| 4 | `[3, 5, 1, 6, 2, 4]`   | Even, `nums[4] <= nums[5]`?  | `2 <= 4` (True).      |

Final: `[3, 5, 1, 6, 2, 4]` (3 <= 5 >= 1 <= 6 >= 2 <= 4)

**Complexity:**
*   **Time:** O(N) (single pass).
*   **Space:** O(1) (in-place).

---