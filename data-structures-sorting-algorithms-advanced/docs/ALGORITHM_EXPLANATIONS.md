```markdown
# Algorithm Explanations

This document provides detailed explanations of the sorting algorithms implemented in this project (`src/sort_implementations.cpp`) and the core logic behind the solutions to the main interview problems (`src/main_algorithms.cpp`).

---

## I. Core Sorting Algorithms

### 1. Bubble Sort

*   **Concept**: Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, which indicates that the list is sorted.
*   **Mechanism**:
    *   Start from the first element. Compare it with the next element. If the first is greater, swap them.
    *   Move to the next pair. Repeat until the end of the array. The largest element will "bubble up" to its correct position.
    *   Repeat this process for the remaining unsorted portion of the array.
    *   An optimization: if no swaps occur in a pass, the array is sorted, and we can stop early.
*   **Time Complexity**:
    *   **Worst-case**: O(N^2) (e.g., reverse sorted array)
    *   **Average-case**: O(N^2)
    *   **Best-case**: O(N) (already sorted array, due to optimization)
*   **Space Complexity**: O(1) (in-place)
*   **Use Case**: Primarily for educational purposes or extremely small arrays. Inefficient for larger datasets.

### 2. Selection Sort

*   **Concept**: Divides the input list into two parts: a sorted sublist built up from left to right, and the remaining unsorted sublist. It repeatedly finds the minimum element from the unsorted sublist and puts it at the beginning of the sorted sublist.
*   **Mechanism**:
    *   Find the minimum element in the unsorted portion of the array.
    *   Swap it with the first element of the unsorted portion.
    *   Consider the first element now sorted and repeat the process for the remaining unsorted portion.
*   **Time Complexity**:
    *   **Worst-case**: O(N^2)
    *   **Average-case**: O(N^2)
    *   **Best-case**: O(N^2) (doesn't benefit from already sorted data)
*   **Space Complexity**: O(1) (in-place)
*   **Use Case**: Simple to implement, but generally outperforms Bubble Sort only marginally. Not practical for large lists.

### 3. Insertion Sort

*   **Concept**: Builds the final sorted array (or list) one item at a time. It iterates through the input elements and removes one element at a time, finds the place within the sorted list, and inserts it there.
*   **Mechanism**:
    *   Start from the second element (the first is considered sorted by itself).
    *   Take the current element and compare it with elements to its left.
    *   Shift elements greater than the current element one position to the right.
    *   Insert the current element into the correct position.
*   **Time Complexity**:
    *   **Worst-case**: O(N^2) (e.g., reverse sorted array)
    *   **Average-case**: O(N^2)
    *   **Best-case**: O(N) (already sorted array)
*   **Space Complexity**: O(1) (in-place)
*   **Use Case**: Efficient for small data sets, or for data sets that are already substantially sorted. Also good for online algorithms where elements are received one by one.

### 4. Quick Sort

*   **Concept**: A highly efficient, comparison-based sorting algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively.
*   **Mechanism**:
    1.  **Pick a Pivot**: Choose an element from the array as the pivot. (Randomized pivot selection is used in this project to improve average-case performance and avoid worst-case for specific input patterns).
    2.  **Partition**: Rearrange the array such that all elements less than the pivot come before it, and all elements greater than the pivot come after it. Elements equal to the pivot can go on either side. The pivot is then in its final sorted position. (Lomuto partition scheme is used here).
    3.  **Recursion**: Recursively apply the above steps to the sub-array of elements with smaller values and separately to the sub-array of elements with greater values.
*   **Time Complexity**:
    *   **Worst-case**: O(N^2) (occurs when pivot selection consistently results in highly unbalanced partitions, e.g., always picking smallest/largest element in already sorted/reverse-sorted array without randomization)
    *   **Average-case**: O(N log N) (due to randomized pivot)
    *   **Best-case**: O(N log N)
*   **Space Complexity**:
    *   **Average-case**: O(log N) (due to recursion stack for balanced partitions)
    *   **Worst-case**: O(N) (for highly unbalanced partitions)
*   **Use Case**: One of the fastest practical general-purpose sorting algorithms. Widely used in libraries (e.g., `std::sort` often uses IntroSort, a hybrid that starts with QuickSort).

### 5. Merge Sort

*   **Concept**: A divide-and-conquer algorithm. It divides the unsorted list into N sublists, each containing one element (a list of one element is considered sorted). Then, it repeatedly merges sublists to produce new sorted sublists until there is only one sorted list remaining.
*   **Mechanism**:
    1.  **Divide**: If the list has `N > 1` elements, divide it into two sublists of approximately `N/2` elements.
    2.  **Conquer**: Recursively sort each sublist.
    3.  **Combine (Merge)**: Merge the two sorted sublists back into one sorted list. The merging process involves comparing elements from both sublists and picking the smaller one to place into the combined list.
*   **Time Complexity**:
    *   **Worst-case**: O(N log N)
    *   **Average-case**: O(N log N)
    *   **Best-case**: O(N log N)
*   **Space Complexity**: O(N) (for the temporary arrays used during the merge step)
*   **Use Case**: Stable sort, guaranteed O(N log N) performance. Often preferred for sorting linked lists (due to efficient merging) and external sorting (when data doesn't fit in memory).

### 6. Heap Sort

*   **Concept**: A comparison-based sorting algorithm that uses a binary heap data structure. It's an in-place algorithm, but not a stable sort.
*   **Mechanism**:
    1.  **Build Max-Heap**: Transform the input array into a max-heap. In a max-heap, the largest element is at the root. This step takes O(N) time.
    2.  **Extract Max and Heapify**:
        *   Swap the root (largest element) with the last element of the heap.
        *   Reduce the heap size by 1.
        *   "Heapify" the new root to maintain the max-heap property. This takes O(log N) time.
        *   Repeat step 2 until the heap size is 1. The array will be sorted in ascending order.
*   **Time Complexity**:
    *   **Worst-case**: O(N log N)
    *   **Average-case**: O(N log N)
    *   **Best-case**: O(N log N)
*   **Space Complexity**: O(1) (in-place)
*   **Use Case**: Good general-purpose sort, especially when memory is a concern (O(1) space) and guaranteed O(N log N) performance is needed (unlike QuickSort's worst-case).

### 7. QuickSelect (for Kth Element)

*   **Concept**: An algorithm to find the k-th smallest (or largest) element in an unsorted list. It is a selection algorithm related to QuickSort. Unlike QuickSort, which sorts both sides of the pivot, QuickSelect only needs to recurse into one side.
*   **Mechanism**:
    1.  **Pick a Pivot**: Choose a pivot element (randomized pivot is crucial for average case).
    2.  **Partition**: Partition the array around the pivot, placing the pivot at its sorted position `p`.
    3.  **Compare and Recurse**:
        *   If `p` is `k-1` (0-indexed position for k-th smallest), then `arr[p]` is the k-th smallest element. Return it.
        *   If `p < k-1`, the k-th smallest element must be in the right sub-array. Recurse on the right side.
        *   If `p > k-1`, the k-th smallest element must be in the left sub-array. Recurse on the left side.
*   **Time Complexity**:
    *   **Average-case**: O(N) (linear time)
    *   **Worst-case**: O(N^2) (if pivot selection consistently leads to highly unbalanced partitions, similar to QuickSort)
*   **Space Complexity**:
    *   **Average-case**: O(log N) (due to recursion stack)
    *   **Worst-case**: O(N) (for highly unbalanced partitions)
*   **Use Case**: Highly efficient for finding the k-th order statistic. Much faster than sorting the entire array if only one element's rank is needed.

---

## II. Main Interview Problems

### 1. Kth Largest Element in an Array (LeetCode 215)

**Problem**: Given an integer array `nums` and an integer `k`, return the k-th largest element in the array. Note that it is the k-th largest element in the sorted order, not the k-th distinct element.

**Approaches:**

*   **A. QuickSelect (Optimal - Average Case)**
    *   **Core Idea**: Adapt the QuickSelect algorithm. To find the k-th largest, we effectively search for the `(N - k + 1)`-th smallest element. This leverages the partitioning idea of QuickSort, but only explores the relevant partition.
    *   **Algorithm**:
        1.  Determine `target_k = nums.size() - k + 1` (to find the `target_k`-th smallest element).
        2.  Implement `quickSelect` function:
            *   Randomly choose a pivot.
            *   Partition the array around the pivot.
            *   If the pivot's final index is `target_k - 1`, return `nums[pivot_index]`.
            *   If `pivot_index < target_k - 1`, recurse on the right sub-array.
            *   If `pivot_index > target_k - 1`, recurse on the left sub-array.
    *   **Time Complexity**: O(N) average, O(N^2) worst case (rare with randomized pivot).
    *   **Space Complexity**: O(log N) average, O(N) worst case (recursion stack).
    *   **Pros**: In-place, optimal average time complexity.
    *   **Cons**: Worst-case O(N^2) is possible, though unlikely with randomization.

*   **B. Min-Heap (Optimal - Robust)**
    *   **Core Idea**: Maintain a min-heap of size `k`. As you iterate through the array, add elements to the heap. If the heap size exceeds `k`, remove the smallest element (heap's root). The heap will always contain the `k` largest elements encountered so far, and its root will be the `k`-th largest.
    *   **Algorithm**:
        1.  Initialize a min-priority queue (`std::priority_queue<int, std::vector<int>, std::greater<int>>`).
        2.  For each `num` in `nums`:
            *   `min_heap.push(num)`.
            *   If `min_heap.size() > k`, `min_heap.pop()`.
        3.  After iterating through all elements, `min_heap.top()` will be the k-th largest element.
    *   **Time Complexity**: O(N log K). Each of N insertions/deletions takes O(log K).
    *   **Space Complexity**: O(K) for the heap.
    *   **Pros**: Guaranteed O(N log K) performance, robust, simple to implement.
    *   **Cons**: Requires O(K) extra space.

*   **C. Sorting (Brute Force / Simple)**
    *   **Core Idea**: Sort the entire array and then pick the element at the `(N - k)`-th index (for 0-indexed array).
    *   **Algorithm**:
        1.  Sort the input array `nums` in ascending order.
        2.  Return `nums[nums.size() - k]`.
    *   **Time Complexity**: O(N log N) (due to sorting).
    *   **Space Complexity**: O(1) if an in-place sort like HeapSort or QuickSort is used, or O(N) if MergeSort or a similar non-in-place sort is used.
    *   **Pros**: Easiest to understand and implement.
    *   **Cons**: Suboptimal time complexity compared to QuickSelect or Min-Heap for finding only one element.

### 2. Sort Colors (Dutch National Flag Problem) (LeetCode 75)

**Problem**: Given an array `nums` with `n` objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue. We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

**Approaches:**

*   **A. One-Pass (Dutch National Flag - Optimal)**
    *   **Core Idea**: Use three pointers (`low`, `mid`, `high`) to partition the array in a single pass.
        *   `low`: points to the last known 0. Elements to the left of `low` are 0s.
        *   `mid`: current element being considered.
        *   `high`: points to the first known 2. Elements to the right of `high` are 2s.
    *   **Algorithm**:
        1.  Initialize `low = 0`, `mid = 0`, `high = nums.size() - 1`.
        2.  While `mid <= high`:
            *   If `nums[mid]` is `0`: Swap `nums[low]` and `nums[mid]`. Increment `low` and `mid`.
            *   If `nums[mid]` is `1`: Increment `mid`.
            *   If `nums[mid]` is `2`: Swap `nums[mid]` and `nums[high]`. Decrement `high`. (Do not increment `mid` here, as the new `nums[mid]` might be 0 or 1 and needs to be re-evaluated).
    *   **Time Complexity**: O(N) (single pass).
    *   **Space Complexity**: O(1) (in-place).
    *   **Pros**: Highly efficient, single pass, constant space.

*   **B. Two-Pass Counting Sort**
    *   **Core Idea**: Count the occurrences of each color (0, 1, 2) in the first pass. Then, overwrite the array in the second pass based on these counts.
    *   **Algorithm**:
        1.  Create an array `counts` of size 3, initialized to zeros.
        2.  **First Pass**: Iterate through `nums`. Increment `counts[0]` for each 0, `counts[1]` for each 1, and `counts[2]` for each 2.
        3.  **Second Pass**: Iterate from `i = 0` to `nums.size() - 1`.
            *   Fill the first `counts[0]` positions with `0`.
            *   Fill the next `counts[1]` positions with `1`.
            *   Fill the remaining `counts[2]` positions with `2`.
    *   **Time Complexity**: O(N) (two passes).
    *   **Space Complexity**: O(1) (constant size `counts` array).
    *   **Pros**: Relatively simple to implement.
    *   **Cons**: Two passes, though still linear time.

### 3. Merge Intervals (LeetCode 56)

**Problem**: Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

**Approach:**

*   **A. Sort by Start Time, Then Merge (Optimal)**
    *   **Core Idea**: Sorting is the key insight. If intervals are sorted by their start times, overlaps can only happen with adjacent intervals (or intervals that start later but end within the current interval). This allows for a single pass to merge.
    *   **Algorithm**:
        1.  If the input `intervals` list is empty, return an empty list.
        2.  **Sort**: Sort the `intervals` array based on their start times. If start times are equal, sort by end times (though primary sort by start is sufficient for correctness, it helps with deterministic output).
        3.  Initialize an empty `merged_intervals` list and add the first interval from the sorted list to it.
        4.  Iterate through the remaining sorted intervals:
            *   Let `last_merged = merged_intervals.back()` and `current = intervals[i]`.
            *   **Check for Overlap**: If `current.start <= last_merged.end`, it means there's an overlap. Merge them by updating `last_merged.end = std::max(last_merged.end, current.end)`.
            *   **No Overlap**: If `current.start > last_merged.end`, there's no overlap. Add `current` to `merged_intervals`.
        5.  Return `merged_intervals`.
    *   **Time Complexity**: O(N log N) (dominated by the initial sort). The merging pass is O(N).
    *   **Space Complexity**: O(N) (for the `merged_intervals` list in the worst case where no intervals overlap).
    *   **Pros**: Optimal time complexity for comparison-based merging, relatively straightforward implementation after sorting.

### 4. Meeting Rooms II (LeetCode 253)

**Problem**: Given an array of meeting time `intervals` `[[s1,e1],[s2,e2],...]`, find the minimum number of conference rooms required.

**Approaches:**

*   **A. Sort and Min-Heap (Optimal)**
    *   **Core Idea**: Sort meetings by their start times. Use a min-heap to keep track of the end times of meetings currently occupying rooms. The size of the heap at any point represents the number of active meetings (rooms currently in use). If a new meeting starts after the earliest current meeting ends (heap's top), we can reuse that room. Otherwise, a new room is needed.
    *   **Algorithm**:
        1.  If `meetings` list is empty, return 0.
        2.  **Sort**: Sort the `meetings` by their start times.
        3.  Initialize a min-priority queue (`std::priority_queue<int, std::vector<int>, std::greater<int>>`) to store the *end times* of currently active meetings.
        4.  Add the end time of the first meeting to the heap.
        5.  Iterate through the rest of the sorted meetings:
            *   Let `current_meeting = meetings[i]`.
            *   **Check for Room Reuse**: If `current_meeting.start >= min_heap.top()`, it means the room ending earliest is free. Pop its end time from the heap.
            *   **Assign Room**: Push `current_meeting.end` into the heap (either reusing a room or allocating a new one).
        6.  The final size of the `min_heap` is the minimum number of rooms required.
    *   **Time Complexity**: O(N log N) (N for sorting, N for heap operations, each O(log N)).
    *   **Space Complexity**: O(N) (for the min-heap in the worst case where all meetings overlap).
    *   **Pros**: Intuitive, robust, widely used.

*   **B. Sweep Line Algorithm (Optimal)**
    *   **Core Idea**: Represent each meeting as two events: a start event (+1 room) and an end event (-1 room). Collect all these events, sort them by time, and then process them chronologically. Keep a running count of active rooms. The maximum count observed is the answer.
    *   **Algorithm**:
        1.  If `meetings` list is empty, return 0.
        2.  Create a list of events. For each meeting `[start, end]`:
            *   Add event `(start, +1)` to the list.
            *   Add event `(end, -1)` to the list.
        3.  **Sort Events**: Sort the events primarily by time. If times are equal, process start events (+1) before end events (-1) to correctly handle meetings that end exactly when another begins (they can reuse the room). This is crucial. A `std::map<int, int>` naturally handles sorting by time and combining changes at the same timestamp.
        4.  Initialize `max_rooms = 0` and `current_rooms = 0`.
        5.  Iterate through the sorted events (or map entries):
            *   `current_rooms += event.type`.
            *   `max_rooms = std::max(max_rooms, current_rooms)`.
        6.  Return `max_rooms`.
    *   **Time Complexity**: O(N log N) (N for sorting events, N for processing events).
    *   **Space Complexity**: O(N) (for storing events).
    *   **Pros**: Elegant and generalizable to similar scheduling problems.
    *   **Cons**: Requires careful handling of tie-breaking for events at the same timestamp.
```