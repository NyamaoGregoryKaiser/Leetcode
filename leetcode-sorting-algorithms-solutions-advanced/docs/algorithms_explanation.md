# Algorithm Explanations

This document provides in-depth explanations of the core algorithms and techniques used to solve the problems in this project.

---

## 1. Quickselect Algorithm

**Purpose:** To find the k-th smallest (or k-th largest) element in an unsorted array in linear time on average.

**Concept:**
Quickselect is a selection algorithm related to QuickSort. Both algorithms use the same partitioning sub-routine.
In QuickSort, we recursively sort *both* partitions. In Quickselect, we only recurse on the partition that contains our target k-th element, discarding the other partition. This significantly reduces the average time complexity.

**Steps:**

1.  **Choose a Pivot:** Select an element from the array to be the pivot. A good practice is to choose a random pivot to ensure average-case performance and avoid worst-case scenarios with already sorted/reverse-sorted data.
2.  **Partition:** Rearrange the array such that all elements smaller than the pivot come before it, and all elements greater than the pivot come after it. Elements equal to the pivot can go on either side, but often grouped with the larger or smaller elements depending on the partition scheme. The pivot ends up at its final sorted position. Let `pivot_final_index` be this position.
3.  **Compare and Recurse:**
    *   If `pivot_final_index` is equal to the target index `k` (0-indexed), then the pivot element is the k-th element, and we return it.
    *   If `k` is less than `pivot_final_index`, the k-th element must be in the left partition. Recursively call Quickselect on the left subarray.
    *   If `k` is greater than `pivot_final_index`, the k-th element must be in the right partition. Recursively call Quickselect on the right subarray.

**Time Complexity:**
*   **Average Case:** O(N). Each recursive call roughly halves the search space. The sum of work in each level of recursion `N + N/2 + N/4 + ... + 1` is approximately `2N`.
*   **Worst Case:** O(N^2). This happens if the pivot is consistently chosen poorly (e.g., always the smallest or largest element), leading to highly unbalanced partitions. Random pivot selection largely mitigates this.

**Space Complexity:**
*   **Average Case:** O(log N) for the recursion stack.
*   **Worst Case:** O(N) for the recursion stack if partitions are consistently unbalanced.

**Relation to Kth Largest:**
To find the `k`-th largest element in an array of size `N`, we look for the `(N - k)`-th smallest element (using 0-indexed positions). For example, in an array of size 6, the 2nd largest element (k=2) is the (6-2)=4th smallest element (0-indexed is at index 3).

---

## 2. Interval Merging Algorithm (Greedy Approach)

**Purpose:** To merge all overlapping intervals into a set of non-overlapping intervals.

**Concept:**
The core idea is to sort the intervals by their start times. Once sorted, we can iterate through them and make local greedy decisions to merge. Because intervals are sorted by start time, any potential overlap with the current interval must involve an interval that starts after or at the same time as the current one.

**Steps:**

1.  **Sort Intervals:** Sort the input `intervals` list based on the start time of each interval. If two intervals have the same start time, their relative order doesn't significantly impact correctness but can be consistent (e.g., by end time).
2.  **Initialize Result:** Create an empty list, say `merged_intervals`, to store the non-overlapping intervals.
3.  **Iterate and Merge:** Iterate through the sorted intervals. For each `current_interval = [current_start, current_end]`:
    *   **No Overlap:** If `merged_intervals` is empty, or if `current_start` is greater than the `end_time` of the `last_merged_interval` in `merged_intervals`, then there is no overlap. Add `current_interval` directly to `merged_intervals`.
    *   **Overlap:** If `current_start` is less than or equal to the `end_time` of the `last_merged_interval`, an overlap exists. Update the `end_time` of the `last_merged_interval` to `max(last_merged_interval.end_time, current_end)`. This effectively extends the last merged interval to cover the current one.

**Time Complexity:**
*   **O(N log N)**: Dominated by the initial sorting step. The iteration and merging takes O(N) time.

**Space Complexity:**
*   **O(N)**: For storing the sorted intervals (if not in-place sort) and for the `merged_intervals` list in the worst case (e.g., no overlaps, all original intervals are added). O(log N) for the recursion stack of `sort` if using a recursive sort like Merge Sort.

---

## 3. Anagram Grouping Algorithm

**Purpose:** To group strings that are anagrams of each other.

**Concept:**
The fundamental idea is that anagrams have the same characters with the same frequencies. Therefore, we can create a "canonical form" or "signature" for each word. Anagrams will have identical signatures. We then use these signatures as keys in a hash map (dictionary) to group the original words.

**Approaches:**

### a) Sort Characters to Create a Key

1.  **Generate Key:** For each string `s`, convert it into an ordered sequence of its characters. This is typically done by converting the string to a list of characters, sorting the list, and then converting it back to an immutable type (like a tuple or a string) to use as a dictionary key.
    *   Example: `"eat"` -> `['e', 'a', 't']` -> `['a', 'e', 't']` -> `('a', 'e', 't')` (tuple) or `"aet"` (string).
2.  **Group:** Use a `defaultdict(list)` where the keys are these sorted character tuples/strings, and the values are lists of the original strings that produce that key.
3.  **Result:** The values of the `defaultdict` form the final groups of anagrams.

**Time Complexity:**
*   **O(N \* L log L)**:
    *   `N`: number of strings.
    *   `L`: maximum length of a string.
    *   Sorting characters for each string takes O(L log L).
    *   Hashing the key and dictionary insertion/lookup takes O(L) on average.

**Space Complexity:**
*   **O(N \* L)**: In the worst case, all strings are distinct anagrams, and we store all original strings and their `L`-length keys in the dictionary.

### b) Count Characters to Create a Key

This approach is more efficient for a fixed and small alphabet (like lowercase English letters).

1.  **Generate Key:** For each string `s`, create a frequency map (or an array/tuple of counts) of its characters.
    *   For lowercase English letters, an array of 26 integers is sufficient. Each index `i` (0 to 25) stores the count of the character `'a' + i`.
    *   Example: `"bbaa"` -> `[2, 2, 0, ..., 0]` (2 'a's, 2 'b's). This count array (converted to a tuple) serves as the key.
2.  **Group:** Similar to the sorting approach, use a `defaultdict(list)` with these count tuples as keys.
3.  **Result:** The values of the `defaultdict` are the anagram groups.

**Time Complexity:**
*   **O(N \* (L + K))**:
    *   `N`: number of strings.
    *   `L`: maximum length of a string.
    *   `K`: size of the alphabet (e.g., 26 for English lowercase letters).
    *   Building the character count array for each string takes O(L).
    *   Converting the array to a tuple (for hashing) takes O(K).
    *   Dictionary operations are O(K) on average.
*   For fixed `K` (like 26), this simplifies to **O(N \* L)**, which is generally faster than O(N \* L log L) when `L` is large.

**Space Complexity:**
*   **O(N \* L)**: Similar to the sorting approach, as we store all original strings. The keys are `K`-length tuples, so O(N \* K) space for keys. If `K` is small, it's approximately O(N \* L).

---

## 4. Wiggle Sort II Algorithm

**Purpose:** To reorder an array `nums` such that `nums[0] < nums[1] > nums[2] < nums[3]...`.

**Concept:**
The strict inequality (`<` and `>`) makes this problem more challenging than Wiggle Sort I (`<=` and `>=`). The key insight for Wiggle Sort II is to involve the **median** of the array. If we can partition the array into elements smaller than the median, elements equal to the median, and elements larger than the median, we can then distribute these elements to achieve the wiggle pattern.

Specifically, we want small numbers at even indices and large numbers at odd indices (or vice-versa).
*   `nums[even_idx] < nums[odd_idx]`
*   `nums[odd_idx] > nums[even_idx + 1]`

This implies that after sorting, the smallest `(N+1)//2` elements should occupy the "low" positions (even indices), and the largest `N//2` elements should occupy the "high" positions (odd indices).

**Approaches:**

### a) Optimal (Quickselect + 3-Way Partition + Distribution)

This approach aims for O(N) average time complexity. Achieving O(1) space *in-place* with a 3-way partition and virtual indexing is extremely complex and rarely expected in interviews. A more practical "optimal" solution often involves O(N) auxiliary space.

**Steps (O(N) Average Time, O(N) Space):**

1.  **Find Median:** Use the Quickselect algorithm (O(N) average time, O(log N) average space) to find the actual `median_value` of the array. The median is typically the `(N-1)//2`-th smallest element (0-indexed).
2.  **Partition into Groups:** Iterate through the original `nums` array and partition all its elements into three temporary lists: `smaller` (elements `< median_value`), `equal` (elements `== median_value`), and `larger` (elements `> median_value`). This takes O(N) time and O(N) space.
3.  **Distribute into Wiggle Pattern:** Now, fill the original `nums` array (in-place) to create the wiggle pattern.
    *   Iterate through the *odd* indices (`1, 3, 5, ...`). For each odd index, place elements from the `larger` list (from its end, descending order) first. If `larger` runs out, use elements from `equal`.
    *   Iterate through the *even* indices (`0, 2, 4, ...`). For each even index, place elements from the `smaller` list (from its end, descending order) first. If `smaller` runs out, use remaining elements from `equal`.
    *   By filling from the end of the `larger` and `smaller` lists, we ensure that the largest `larger` elements are paired with the smallest `smaller` elements, helping to satisfy the strict inequality.

**Time Complexity:**
*   **O(N) Average:** Dominated by Quickselect and linear-time partitioning/distribution.
*   **O(N^2) Worst Case:** If Quickselect performs poorly (rare with random pivot).

**Space Complexity:**
*   **O(N):** For the temporary `smaller`, `equal`, `larger` lists.

**Note on True O(1) Space Optimal:** This involves a very tricky "virtual indexing" scheme applied to a 3-way partition (Dutch National Flag) around the median. The virtual index mapping allows for elements to be swapped to non-adjacent positions to achieve the `small, LARGE, small, LARGE` pattern efficiently without extra space. It's conceptually complex to implement correctly due to the mapping of logical iteration indices to physical array indices for swaps.

### b) Simple (Sort and Interleave)

This is a more straightforward approach, sacrificing time complexity for ease of implementation.

**Steps (O(N log N) Time, O(N) Space):**

1.  **Sort the Array:** Create a sorted copy of the input `nums` array. This takes O(N log N) time and O(N) space.
2.  **Split into Halves:** Divide the sorted array into two conceptual halves:
    *   `small_half`: Contains elements from index `0` up to `(N + 1) // 2 - 1`.
    *   `large_half`: Contains elements from index `(N + 1) // 2` up to `N - 1`.
    *   The `(N + 1) // 2` ensures that if `N` is odd, the middle element goes into the `small_half`.
3.  **Interleave Elements:** Fill the original `nums` array by interleaving elements from the end of `small_half` and `large_half`.
    *   Iterate `i` from `0` to `N-1`.
    *   If `i` is an *even* index, assign `nums[i]` an element from the end of `small_half` (and decrement `small_half`'s pointer).
    *   If `i` is an *odd* index, assign `nums[i]` an element from the end of `large_half` (and decrement `large_half`'s pointer).

**Time Complexity:**
*   **O(N log N):** Dominated by the initial sorting step.

**Space Complexity:**
*   **O(N):** For the `sorted_nums` copy and potentially the `small_half`/`large_half` lists.

**Example Walkthrough for Simple Approach:**
`nums = [1, 5, 1, 1, 6, 4]`, `N = 6`

1.  `sorted_nums = [1, 1, 1, 4, 5, 6]`
2.  `small_half = [1, 1, 1]` (indices 0, 1, 2)
    `large_half = [4, 5, 6]` (indices 3, 4, 5)
3.  Pointers: `s_ptr = 2` (points to last element of `small_half`), `l_ptr = 2` (points to last element of `large_half`).
    *   `i = 0` (even): `nums[0] = small_half[2] = 1`. `s_ptr = 1`. `nums = [1, _, _, _, _, _]`
    *   `i = 1` (odd): `nums[1] = large_half[2] = 6`. `l_ptr = 1`. `nums = [1, 6, _, _, _, _]`
    *   `i = 2` (even): `nums[2] = small_half[1] = 1`. `s_ptr = 0`. `nums = [1, 6, 1, _, _, _]`
    *   `i = 3` (odd): `nums[3] = large_half[1] = 5`. `l_ptr = 0`. `nums = [1, 6, 1, 5, _, _]`
    *   `i = 4` (even): `nums[4] = small_half[0] = 1`. `s_ptr = -1`. `nums = [1, 6, 1, 5, 1, _]`
    *   `i = 5` (odd): `nums[5] = large_half[0] = 4`. `l_ptr = -1`. `nums = [1, 6, 1, 5, 1, 4]`

Final Result: `[1, 6, 1, 5, 1, 4]`. This correctly satisfies `1 < 6 > 1 < 5 > 1 < 4`.

---