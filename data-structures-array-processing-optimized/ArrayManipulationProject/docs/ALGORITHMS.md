# Detailed Algorithm Explanations

This document provides in-depth explanations for each array manipulation problem, including problem statements, examples, multiple solution approaches, ASCII diagrams for better visualization, and a thorough analysis of time and space complexity.

---

## 1. Rotate Array

### Problem Statement

Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.

**Example:**
`nums = [1,2,3,4,5,6,7], k = 3`
Output: `[5,6,7,1,2,3,4]`

**Explanation:**
1.  Rotate 1 step to the right: `[7,1,2,3,4,5,6]`
2.  Rotate 2 steps to the right: `[6,7,1,2,3,4,5]`
3.  Rotate 3 steps to the right: `[5,6,7,1,2,3,4]`

### Approach 1: Using a Temporary Array

**Concept:**
The simplest way to rotate an array is to use a temporary array to store the rotated elements and then copy them back. Each element `nums[i]` moves to index `(i + k) % n`, where `n` is the array length.

**Algorithm:**
1.  Calculate `k = k % n` to handle rotations greater than the array length.
2.  Create a new array `temp` of the same size as `nums`.
3.  Iterate through `nums` from `i = 0` to `n-1`. For each `nums[i]`, place it at `temp[(i + k) % n]`.
4.  Copy all elements from `temp` back into `nums`.

**Diagram:**
```
nums = [1, 2, 3, 4, 5, 6, 7], k = 3, n = 7

Initial array:
Index: 0 1 2 3 4 5 6
Value: 1 2 3 4 5 6 7

temp array (all zeros initially):
Index: 0 1 2 3 4 5 6
Value: 0 0 0 0 0 0 0

Processing nums[0]=1: new_idx = (0+3)%7 = 3. temp[3] = 1
temp: [0, 0, 0, 1, 0, 0, 0]

Processing nums[1]=2: new_idx = (1+3)%7 = 4. temp[4] = 2
temp: [0, 0, 0, 1, 2, 0, 0]

... and so on ...

Processing nums[4]=5: new_idx = (4+3)%7 = 0. temp[0] = 5
temp: [5, 0, 0, 1, 2, 0, 0]

After all elements are placed:
temp: [5, 6, 7, 1, 2, 3, 4]

Finally, nums = temp.
```

**Complexity Analysis:**
*   **Time Complexity:** O(N), where N is the number of elements in `nums`. We iterate through the array twice (once to fill `temp`, once to copy back).
*   **Space Complexity:** O(N) for the temporary array `temp`.

### Approach 2: Using the Reverse Technique (Optimal In-Place)

**Concept:**
This clever trick leverages the `reverse` operation to achieve rotation in-place.
The idea is that rotating an array `[A, B]` by `k` positions to the right results in `[B, A]`.
If we want to move `k` elements from the end to the front, we can reverse the whole array, then reverse the first `k` elements, and finally reverse the remaining `n-k` elements.

**Algorithm:**
1.  Calculate `k = k % n` to handle `k` being larger than `n`.
2.  Reverse the entire array.
3.  Reverse the first `k` elements of the array.
4.  Reverse the remaining `n-k` elements of the array (from index `k` to `n-1`).

**Diagram:**
```
nums = [1, 2, 3, 4, 5, 6, 7], k = 3, n = 7

Original:     [1, 2, 3, 4, 5, 6, 7]
Indices:      <-------> <----->
              (n-k elements) (k elements)

Step 1: Reverse the entire array
[7, 6, 5, 4, 3, 2, 1]

Step 2: Reverse the first k elements (k=3)
Original first k:   [7, 6, 5] -> Reversed: [5, 6, 7]
Array becomes:      [5, 6, 7, 4, 3, 2, 1]

Step 3: Reverse the remaining n-k elements (n-k=4, from index 3 to 6)
Original remaining: [4, 3, 2, 1] -> Reversed: [1, 2, 3, 4]
Array becomes:      [5, 6, 7, 1, 2, 3, 4] (Rotated!)
```

**Complexity Analysis:**
*   **Time Complexity:** O(N). Each `std::reverse` operation takes O(length of sub-array) time. Since we reverse the whole array once and then two sub-arrays that sum up to the whole array, the total time is proportional to N.
*   **Space Complexity:** O(1). The rotation is performed in-place.

### Approach 3: Juggling Algorithm (Optimal In-Place)

**Concept:**
The Juggling Algorithm is a more advanced in-place rotation method that avoids the extra space of the temporary array and potentially fewer swaps than the reverse method for certain architectures (though asymptotically the same). It works by moving elements in cycles. The number of such cycles is equal to `gcd(n, k)`, where `n` is the array length and `k` is the number of rotations.

**Algorithm:**
1.  Calculate `k = k % n`. If `k` is 0, no rotation is needed.
2.  Calculate `num_cycles = gcd(n, k)`.
3.  For each cycle (from `i = 0` to `num_cycles - 1`):
    a.  Store `nums[i]` in a `temp` variable.
    b.  Start `current_idx = i`.
    c.  Loop:
        i.   Calculate `next_idx = (current_idx - k + n) % n`. (Using `(current_idx - k + n)` ensures the index is non-negative before modulo).
        ii.  If `next_idx` is equal to the starting index `i` of the current cycle, break the loop.
        iii. Move `nums[next_idx]` to `nums[current_idx]`.
        iv.  Update `current_idx = next_idx`.
    d.  Place `temp` (the original `nums[i]`) into `nums[current_idx]`.

**Diagram:**
```
nums = [1, 2, 3, 4, 5, 6, 7], k = 3, n = 7
gcd(7, 3) = 1. So there will be 1 cycle.

Cycle 1 (starts at i=0):
temp = nums[0] = 1
current_idx = 0

Loop 1:
  next_idx = (0 - 3 + 7) % 7 = 4
  nums[0] = nums[4] = 5
  nums: [5, 2, 3, 4, 5, 6, 7]
  current_idx = 4

Loop 2:
  next_idx = (4 - 3 + 7) % 7 = 1
  nums[4] = nums[1] = 2
  nums: [5, 2, 3, 4, 2, 6, 7]
  current_idx = 1

Loop 3:
  next_idx = (1 - 3 + 7) % 7 = 5
  nums[1] = nums[5] = 6
  nums: [5, 6, 3, 4, 2, 6, 7]
  current_idx = 5

Loop 4:
  next_idx = (5 - 3 + 7) % 7 = 2
  nums[5] = nums[2] = 3
  nums: [5, 6, 3, 4, 2, 3, 7]
  current_idx = 2

Loop 5:
  next_idx = (2 - 3 + 7) % 7 = 6
  nums[2] = nums[6] = 7
  nums: [5, 6, 7, 4, 2, 3, 7]
  current_idx = 6

Loop 6:
  next_idx = (6 - 3 + 7) % 7 = 3
  nums[6] = nums[3] = 4
  nums: [5, 6, 7, 4, 2, 3, 4]
  current_idx = 3

Loop 7:
  next_idx = (3 - 3 + 7) % 7 = 0
  next_idx == i (0). Break.

Place temp (original 1) into nums[current_idx=3]:
nums[3] = 1
Final nums: [5, 6, 7, 1, 2, 3, 4] (Rotated!)
```

**Complexity Analysis:**
*   **Time Complexity:** O(N). Each element is visited and moved exactly once. `gcd` calculation is logarithmic.
*   **Space Complexity:** O(1). Only a few temporary variables are used.

### Approach 4: Brute-Force (Rotate One Step `k` Times)

**Concept:**
This is the most straightforward but least efficient approach. To rotate by `k` steps, simply perform a 1-step rotation `k` times. A 1-step rotation involves moving the last element to the first position and shifting all other elements one position to the right.

**Algorithm:**
1.  Calculate `k = k % n`.
2.  Repeat `k` times:
    a.  Store the last element (`nums[n-1]`) in a `temp` variable.
    b.  Shift all elements from `nums[n-2]` down to `nums[0]` one position to the right (`nums[i] = nums[i-1]`).
    c.  Place `temp` into `nums[0]`.

**Diagram:**
```
nums = [1, 2, 3, 4, 5], k = 2

Initial: [1, 2, 3, 4, 5]

Step 1 (k=1):
  temp = nums[4] = 5
  Shift: [1, 2, 3, 4, 5] -> [_, 1, 2, 3, 4]
  nums[0] = temp: [5, 1, 2, 3, 4]

Step 2 (k=2):
  temp = nums[4] = 4
  Shift: [5, 1, 2, 3, 4] -> [_, 5, 1, 2, 3]
  nums[0] = temp: [4, 5, 1, 2, 3] (Rotated!)
```

**Complexity Analysis:**
*   **Time Complexity:** O(N\*k). Each 1-step rotation takes O(N) time, and this is done `k` times. In the worst case, `k` can be close to `N`, leading to O(N^2).
*   **Space Complexity:** O(1). The rotation is performed in-place.

---

## 2. Find the Duplicate Number

### Problem Statement

Given an array `nums` containing `n + 1` integers where each integer is between `1` and `n` (inclusive).
Prove that at least one duplicate number must exist.
Assume that there is only one duplicate number, find the duplicate one.

**Constraints:**
*   You must not modify the array (assume it is read-only).
*   You must use only O(1) extra space.
*   Your runtime complexity should be less than O(n^2).

**Example:**
`nums = [1,3,4,2,2]`
Output: `2`

`nums = [3,1,3,4,2]`
Output: `3`

### Proof of Duplicate Existence (Pigeonhole Principle)

Given `n + 1` integers, and each integer is between `1` and `n` (inclusive).
Consider the numbers `1, 2, ..., n` as `n` pigeonholes.
We have `n + 1` integers (pigeons).
According to the Pigeonhole Principle, if you have more pigeons than pigeonholes, at least one pigeonhole must contain more than one pigeon.
Therefore, at least one number from `1` to `n` must appear more than once in the array, meaning a duplicate exists.

### Approach 1: Sort the Array

**Concept:**
If we sort the array, any duplicate numbers will appear consecutively. We can then iterate through the sorted array and find the adjacent equal elements.

**Algorithm:**
1.  Create a copy of the array `nums` to respect the "read-only" constraint of the original.
2.  Sort the copied array.
3.  Iterate through the sorted array from the first element up to the second-to-last element.
4.  If `nums[i] == nums[i+1]`, then `nums[i]` is the duplicate.

**Diagram:**
```
nums = [1, 3, 4, 2, 2]

Copy nums: [1, 3, 4, 2, 2]

Sort the copy:
[1, 2, 2, 3, 4]

Iterate and compare adjacent elements:
i=0: nums[0]=1, nums[1]=2. Not equal.
i=1: nums[1]=2, nums[2]=2. Equal! Found duplicate: 2.
```

**Complexity Analysis:**
*   **Time Complexity:** O(N log N) due to the sorting step.
*   **Space Complexity:** O(N) for creating a copy of the array. If the problem allowed modifying the input array, it would be O(log N) or O(1) depending on the sort implementation (e.g., in-place quicksort uses O(log N) stack space, heapsort uses O(1)).
*   **Violates Constraints:** Modifies (a copy of) the array and uses O(N) space. Not optimal for the strict constraints.

### Approach 2: Using a Hash Set (unordered_set)

**Concept:**
A hash set (or `std::unordered_set` in C++) allows for O(1) average time complexity for insertion and lookup. We can iterate through the array, adding each number to the hash set. If we encounter a number that is already in the set, it's a duplicate.

**Algorithm:**
1.  Initialize an empty hash set.
2.  Iterate through each `num` in `nums`.
3.  For each `num`:
    a.  Check if `num` is already present in the hash set.
    b.  If yes, return `num` as it's the duplicate.
    c.  If no, insert `num` into the hash set.

**Diagram:**
```
nums = [1, 3, 4, 2, 2]
seen_numbers = {}

1. num = 1. Not in seen_numbers. Add 1. seen_numbers = {1}
2. num = 3. Not in seen_numbers. Add 3. seen_numbers = {1, 3}
3. num = 4. Not in seen_numbers. Add 4. seen_numbers = {1, 3, 4}
4. num = 2. Not in seen_numbers. Add 2. seen_numbers = {1, 2, 3, 4}
5. num = 2. Is in seen_numbers! Return 2.
```

**Complexity Analysis:**
*   **Time Complexity:** O(N) on average, as insertion and lookup operations in a hash set take O(1) average time. In the worst case (hash collisions), it can degrade to O(N).
*   **Space Complexity:** O(N) in the worst case, if all numbers are unique before the duplicate is found at the end of the array.
*   **Violates Constraints:** Uses O(N) extra space. Not optimal for the strict constraints.

### Approach 3: Floyd's Tortoise and Hare (Cycle Detection) - Optimal Solution

**Concept:**
This is the brilliant solution that satisfies all constraints. The problem can be cleverly transformed into finding the start of a cycle in a linked list.

Imagine the array `nums` as a linked list where `index -> nums[index]` is a pointer.
Since there are `n+1` numbers in the range `[1, n]`, and only `n` unique values, one number `x` must be pointed to by at least two different indices. This `x` is our duplicate. If we follow the "pointers", eventually we must enter a cycle because `n+1` numbers map into `n` possible values. The duplicate number is the *entrance* to this cycle.

**Algorithm:**
1.  **Phase 1: Detect a Cycle:**
    a.  Initialize two pointers, `slow` and `fast`.
    b.  `slow` starts at `nums[0]`.
    c.  `fast` starts at `nums[nums[0]]`.
    d.  Move `slow` one step at a time (`slow = nums[slow]`).
    e.  Move `fast` two steps at a time (`fast = nums[nums[fast]]`).
    f.  Continue until `slow == fast`. This meeting point is guaranteed to be within the cycle.

2.  **Phase 2: Find the Cycle Entrance (the duplicate):**
    a.  Reset `fast` pointer to the start of the "list" (index `0`).
    b.  Keep `slow` at its meeting point from Phase 1.
    c.  Move both `slow` and `fast` one step at a time (`slow = nums[slow]`, `fast = nums[fast]`).
    d.  The point where `slow == fast` again is the entrance to the cycle, which is the duplicate number.

**Diagram:**
```
nums = [1, 3, 4, 2, 2] (n=4, elements 1 to 4)
Consider indices as nodes and values as pointers:
0 -> nums[0] = 1
1 -> nums[1] = 3
2 -> nums[2] = 4
3 -> nums[3] = 2
4 -> nums[4] = 2 (This is the start of a cycle, as 3 and 4 both point to 2)

Graph representation:
0 -> 1 -> 3 -> 2 <- 4
               ^
               |____| (cycle: 2 -> 4 -> 2)
Duplicate is 2.

Phase 1: Find intersection
slow = nums[0] = 1
fast = nums[nums[0]] = nums[1] = 3

Iteration 1:
slow = nums[1] = 3
fast = nums[nums[3]] = nums[2] = 4
slow = 3, fast = 4. Not equal.

Iteration 2:
slow = nums[3] = 2
fast = nums[nums[4]] = nums[2] = 4
slow = 2, fast = 4. Not equal.

Iteration 3:
slow = nums[2] = 4
fast = nums[nums[4]] = nums[2] = 4
slow = 4, fast = 4. Equal! Intersection found at 4.

Phase 2: Find cycle entrance
fast = 0
slow = 4 (from Phase 1)

Iteration 1:
slow = nums[4] = 2
fast = nums[0] = 1
slow = 2, fast = 1. Not equal.

Iteration 2:
slow = nums[2] = 4
fast = nums[1] = 3
slow = 4, fast = 3. Not equal.

Iteration 3:
slow = nums[4] = 2
fast = nums[3] = 2
slow = 2, fast = 2. Equal! Cycle entrance (duplicate) found at 2.
```

**Complexity Analysis:**
*   **Time Complexity:** O(N). In the worst case, both pointers traverse the entire "list" (array) twice.
*   **Space Complexity:** O(1). Only a few pointers (variables) are used.
*   **Meets all Constraints:** Read-only array, O(1) space, O(N) time.

### Approach 4: Binary Search on the Answer Range

**Concept:**
Since the numbers are in the range `[1, n]`, we can perform a binary search on this range to find the duplicate. The key idea is to count how many numbers in `nums` are less than or equal to a `mid` value from our search range `[1, n]`.

If the count of numbers `num <= mid` is greater than `mid`, it implies that at least one duplicate must exist within the range `[1, mid]`. This is because if all numbers `1` to `mid` were unique, there would be exactly `mid` numbers. If we have more than `mid` numbers, one must be a duplicate.
If the count `num <= mid` is not greater than `mid`, then the duplicate must be in the range `[mid + 1, n]`.

**Algorithm:**
1.  Initialize `low = 1`, `high = n`, and `duplicate = -1`. (`n` is `nums.size() - 1`).
2.  While `low <= high`:
    a.  Calculate `mid = low + (high - low) / 2`.
    b.  Count how many elements in `nums` are less than or equal to `mid`.
    c.  If `count > mid`:
        i.   This `mid` is a possible duplicate, or the duplicate is smaller than `mid`. Store `mid` as a potential answer.
        ii.  Set `high = mid - 1` to search in the left half.
    d.  Else (`count <= mid`):
        i.   The duplicate must be in the right half.
        ii.  Set `low = mid + 1`.
3.  Return `duplicate`.

**Diagram:**
```
nums = [1, 3, 4, 2, 2], n = 4 (range [1, 4])

Initial: low=1, high=4, duplicate=-1

Iteration 1:
  mid = (1+4)/2 = 2
  Count numbers <= 2 in nums: {1, 2, 2} -> count = 3
  count (3) > mid (2) is TRUE.
  duplicate = 2
  high = 2 - 1 = 1
  (low=1, high=1, duplicate=2)

Iteration 2:
  low (1) <= high (1) is TRUE.
  mid = (1+1)/2 = 1
  Count numbers <= 1 in nums: {1} -> count = 1
  count (1) > mid (1) is FALSE.
  low = 1 + 1 = 2
  (low=2, high=1, duplicate=2)

Loop terminates because low > high.
Return duplicate = 2.
```

**Complexity Analysis:**
*   **Time Complexity:** O(N log N). The binary search performs `log N` iterations. In each iteration, we traverse the array to count elements, which takes O(N) time.
*   **Space Complexity:** O(1). Only a few variables are used.
*   **Meets Constraints:** Read-only array, O(1) space, O(N log N) time (which is less than O(N^2)).

---

## 3. Trapping Rain Water

### Problem Statement

Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much rainwater it can trap after raining.

**Example:**
`height = [0,1,0,2,1,0,1,3,2,1,2,1]`
Output: `6`

**Visual Representation:**
```
       _
   _  | | _   _
 _|_|_|X|_|X|_|_|X|_
| | | | | | | | | | | |
0 1 0 2 1 0 1 3 2 1 2 1  <-- height values
  X X   X X X   X        <-- trapped water (total 6)
```

### Approach 1: Two Pointers (Optimal Solution)

**Concept:**
This approach leverages the fact that the amount of water trapped at a particular position `i` is determined by the minimum of the maximum height to its left (`left_max`) and the maximum height to its right (`right_max`), minus the current bar's height (`height[i]`).
`water_at_i = max(0, min(left_max, right_max) - height[i])`

The two-pointer approach avoids explicitly calculating `left_max` and `right_max` for every index by maintaining `left_max` and `right_max` as we iterate inwards from both ends. The crucial observation is:
*   If `left_max < right_max`, then the water level at the current `left` pointer position is limited by `left_max`. We can calculate water for `height[left]` and move `left` inward, because we know there's a bar to the right that is at least `left_max` (specifically, `height[right]` is greater than or equal to current `right_max`, which is greater than `left_max`).
*   Conversely, if `right_max <= left_max`, the water level at `height[right]` is limited by `right_max`. We calculate water for `height[right]` and move `right` inward.

**Algorithm:**
1.  Initialize `left = 0`, `right = n - 1` (where `n` is `height.size()`).
2.  Initialize `left_max = 0`, `right_max = 0`.
3.  Initialize `trapped_water = 0`.
4.  While `left < right`:
    a.  Update `left_max = max(left_max, height[left])`.
    b.  Update `right_max = max(right_max, height[right])`.
    c.  If `left_max < right_max`:
        i.   Add `left_max - height[left]` to `trapped_water`.
        ii.  Increment `left`.
    d.  Else (`right_max <= left_max`):
        i.   Add `right_max - height[right]` to `trapped_water`.
        ii.  Decrement `right`.
5.  Return `trapped_water`.

**Diagram:**
```
height = [0,1,0,2,1,0,1,3,2,1,2,1]

Initial: left=0, right=11, left_max=0, right_max=0, water=0

1. left=0 (0), right=11 (1)
   left_max=0, right_max=1
   left_max (0) < right_max (1)
   water += (0 - 0) = 0. water=0.
   left=1.

2. left=1 (1), right=11 (1)
   left_max=1 (max(0,1)), right_max=1
   left_max (1) < right_max (1) is FALSE. (1 <= 1)
   water += (1 - 1) = 0. water=0.
   right=10.

3. left=1 (1), right=10 (2)
   left_max=1, right_max=2 (max(1,2))
   left_max (1) < right_max (2)
   water += (1 - 1) = 0. water=0.
   left=2.

4. left=2 (0), right=10 (2)
   left_max=1, right_max=2
   left_max (1) < right_max (2)
   water += (1 - 0) = 1. water=1.
   left=3.

5. left=3 (2), right=10 (2)
   left_max=2 (max(1,2)), right_max=2
   left_max (2) < right_max (2) is FALSE. (2 <= 2)
   water += (2 - 2) = 0. water=1.
   right=9.

6. left=3 (2), right=9 (1)
   left_max=2, right_max=2 (max(2,1))
   left_max (2) < right_max (2) is FALSE. (2 <= 2)
   water += (2 - 1) = 1. water=2.
   right=8.

7. left=3 (2), right=8 (2)
   left_max=2, right_max=2
   left_max (2) < right_max (2) is FALSE. (2 <= 2)
   water += (2 - 2) = 0. water=2.
   right=7.

8. left=3 (2), right=7 (3)
   left_max=2, right_max=3 (max(2,3))
   left_max (2) < right_max (3)
   water += (2 - 2) = 0. water=2.
   left=4.

9. left=4 (1), right=7 (3)
   left_max=2 (max(2,1)), right_max=3
   left_max (2) < right_max (3)
   water += (2 - 1) = 1. water=3.
   left=5.

10. left=5 (0), right=7 (3)
    left_max=2, right_max=3
    left_max (2) < right_max (3)
    water += (2 - 0) = 2. water=5.
    left=6.

11. left=6 (1), right=7 (3)
    left_max=2 (max(2,1)), right_max=3
    left_max (2) < right_max (3)
    water += (2 - 1) = 1. water=6.
    left=7.

12. left=7, right=7. Loop terminates (left not < right).
Return trapped_water = 6.
```

**Complexity Analysis:**
*   **Time Complexity:** O(N) where N is the number of elements in `height`. We make a single pass with two pointers.
*   **Space Complexity:** O(1) as only a few variables are used.

### Approach 2: Dynamic Programming (Pre-compute Maxes)

**Concept:**
This approach explicitly calculates `left_max[i]` (the maximum height to the left of or including `i`) and `right_max[i]` (the maximum height to the right of or including `i`) for all indices. Then, for each position `i`, the water trapped is `min(left_max[i], right_max[i]) - height[i]`. We take `max(0, ...)` to ensure no negative water (when `height[i]` is a peak).

**Algorithm:**
1.  Handle edge case: If `height` is empty, return `0`.
2.  Initialize `n = height.size()`.
3.  Create two arrays `left_max` and `right_max` of size `n`, initialized to 0.
4.  **Populate `left_max` array:**
    a.  `left_max[0] = height[0]`.
    b.  For `i` from 1 to `n-1`: `left_max[i] = max(left_max[i-1], height[i])`.
5.  **Populate `right_max` array:**
    a.  `right_max[n-1] = height[n-1]`.
    b.  For `i` from `n-2` down to 0: `right_max[i] = max(right_max[i+1], height[i])`.
6.  Initialize `trapped_water = 0`.
7.  **Calculate total trapped water:**
    a.  For `i` from 0 to `n-1`: `trapped_water += max(0, min(left_max[i], right_max[i]) - height[i])`.
8.  Return `trapped_water`.

**Diagram:**
```
height =    [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
Index:      0  1  2  3  4  5  6  7  8  9 10 11

left_max: (max from left)
idx 0: height[0]=0. left_max[0]=0
idx 1: max(left_max[0], height[1]) = max(0,1)=1. left_max[1]=1
idx 2: max(left_max[1], height[2]) = max(1,0)=1. left_max[2]=1
...
left_max =  [0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3]

right_max: (max from right)
idx 11: height[11]=1. right_max[11]=1
idx 10: max(right_max[11], height[10]) = max(1,2)=2. right_max[10]=2
idx 9:  max(right_max[10], height[9]) = max(2,1)=2. right_max[9]=2
...
right_max = [3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 1]

Water for each index: max(0, min(left_max[i], right_max[i]) - height[i])
idx 0: min(0,3)-0 = 0
idx 1: min(1,3)-1 = 0
idx 2: min(1,3)-0 = 1
idx 3: min(2,3)-2 = 0
idx 4: min(2,3)-1 = 1
idx 5: min(2,3)-0 = 2
idx 6: min(2,3)-1 = 1
idx 7: min(3,3)-3 = 0
idx 8: min(3,2)-2 = 0
idx 9: min(3,2)-1 = 1
idx 10:min(3,2)-2 = 0
idx 11:min(3,1)-1 = 0

Total water = 0+0+1+0+1+2+1+0+0+1+0+0 = 6.
```

**Complexity Analysis:**
*   **Time Complexity:** O(N). We make three passes over the array (one for `left_max`, one for `right_max`, one for total water).
*   **Space Complexity:** O(N) for storing `left_max` and `right_max` arrays.

### Approach 3: Using a Monotonic Stack

**Concept:**
A monotonic stack can be used to solve this problem by keeping track of bars that could potentially form the left boundary of a well. The stack stores indices of bars in decreasing order of height.

When we encounter a bar `height[i]` that is shorter than or equal to the stack top, it means this bar might be part of an increasing sequence or a local dip. We push its index onto the stack.

When we encounter a bar `height[i]` that is *taller* than the stack top (`height[s.top()]`), it means we've found a right boundary for a potential well. We pop elements from the stack (these are the bars that form the "bottom" of the well) and calculate the trapped water:
1.  `top_idx = s.top()` (the bar that just got "submerged").
2.  Pop `top_idx`.
3.  If the stack is now empty, there's no left boundary, so break.
4.  `left_boundary_idx = s.top()`.
5.  `width = i - left_boundary_idx - 1`.
6.  `water_height = min(height[left_boundary_idx], height[i]) - height[top_idx]`.
7.  `trapped_water += water_height * width`.

**Algorithm:**
1.  Initialize `trapped_water = 0`.
2.  Initialize an empty stack `s` (to store indices).
3.  Iterate `i` from 0 to `n-1` (where `n` is `height.size()`):
    a.  While `s` is not empty AND `height[i] > height[s.top()]`:
        i.   `top_idx = s.top()`. Pop from `s`.
        ii.  If `s` is empty, break (no left boundary for this well).
        iii. `left_boundary_idx = s.top()`.
        iv.  `width = i - left_boundary_idx - 1`.
        v.   `water_level = min(height[left_boundary_idx], height[i])`.
        vi.  `trapped_water += (water_level - height[top_idx]) * width`.
    b.  Push `i` onto `s`.
4.  Return `trapped_water`.

**Diagram:**
```
height = [0,1,0,2,1,0,1,3,2,1,2,1]

i=0, h[0]=0: Stack: [0]
i=1, h[1]=1: Stack: [0, 1]
i=2, h[2]=0: Stack: [0, 1, 2] (h[2]=0 < h[1]=1)

i=3, h[3]=2: h[3]=2 > h[s.top()]=h[2]=0
  Pop 2 (h=0). left_boundary_idx=1 (h=1). width=(3-1-1)=1. water_level=min(h[1],h[3])-h[2] = min(1,2)-0 = 1. Add 1*1=1. water=1.
  h[3]=2 > h[s.top()]=h[1]=1
  Pop 1 (h=1). left_boundary_idx=0 (h=0). width=(3-0-1)=2. water_level=min(h[0],h[3])-h[1] = min(0,2)-1 = -1. Wait, this min(0,2) is an issue.
  The 'water_level' should be min(left_boundary, right_boundary).
  So water_level should be `min(height[left_boundary_idx], height[i])`.
  Let's retrace i=3 step:
  h[3]=2 > h[s.top()]=h[2]=0. Pop 2.
    left_boundary_idx = 1 (h[1]=1). width = (3-1-1)=1.
    water_level = min(height[1], height[3]) = min(1,2) = 1.
    water_for_bar = water_level - height[2] = 1 - 0 = 1.
    trapped_water += (1 * 1) = 1. (water=1)
  h[3]=2 > h[s.top()]=h[1]=1. Pop 1.
    left_boundary_idx = 0 (h[0]=0). width = (3-0-1)=2.
    water_level = min(height[0], height[3]) = min(0,2) = 0.
    water_for_bar = water_level - height[1] = 0 - 1 = -1. (Incorrect calculation)

My formula for trapped_water is `(water_level - height[top_idx]) * width`.
If `height[top_idx]` is greater than `water_level`, it means no water can be trapped.
The water level is indeed `min(height[left_boundary_idx], height[i])`.
If `height[top_idx]` is 1, and `min(height[left], height[right])` is 0, then `0-1=-1`. This means water_for_bar will be negative. This is correct if we assume we are filling from lowest point.

Let's use the standard monotonic stack interpretation:
`top_idx` is the *bottom* of the well.
`s.top()` (after pop) is the *left wall*.
`i` is the *right wall*.
The *actual water level* is `min(height[left_wall], height[right_wall])`.
The water trapped *above `top_idx`* is `water_level - height[top_idx]`.
The *width* of this specific well segment is `right_wall - left_wall - 1`.

Let's restart the diagram logic with this definition:
height = [0,1,0,2,1,0,1,3,2,1,2,1]

i=0, h[0]=0: Stack: [0]
i=1, h[1]=1: h[1] > h[0]. Pop 0. Stack empty. No left boundary. Push 1. Stack: [1]
  Wait, this is if stack contains increasing order. If it's decreasing, 1 pushes.
  The definition is `stack stores indices of bars in decreasing order of height`.
  So `h[0]=0` -> push 0. Stack: [0]
  `h[1]=1`. `h[1]>h[0]`. Pop 0. Now stack empty. No left boundary.
  This means `h[0]` cannot be a left boundary because `h[1]` is taller. It's not a `decreasing` stack.

Correct Monotonic Stack (increasing order of height of bars, indices on stack):
Stack stores indices of bars in *increasing* order of height. When `h[i] < h[s.top()]`, push. When `h[i] > h[s.top()]`, we pop and calculate.
Let's use the provided code's logic. Stack stores indices. When `height[i] > height[s.top()]`, pop.

`height = [0,1,0,2,1,0,1,3,2,1,2,1]`
`stack = []`
`water = 0`

`i=0, height[0]=0`: stack empty. Push 0. `stack = [0]`
`i=1, height[1]=1`: `height[1]>height[stack.top()] (1>0)`.
    Pop 0. `top_idx=0`. Stack empty. Break.
    Push 1. `stack = [1]`
`i=2, height[2]=0`: `height[2] <= height[stack.top()] (0 <= 1)`. Push 2. `stack = [1, 2]`
`i=3, height[3]=2`: `height[3] > height[stack.top()] (2 > 0)`.
    Pop 2. `top_idx=2`.
    Stack not empty. `left_boundary_idx=1`.
    `width = i - left_boundary_idx - 1 = 3 - 1 - 1 = 1`.
    `water_level = min(height[left_boundary_idx], height[i]) = min(height[1], height[3]) = min(1,2) = 1`.
    `trapped_water += (water_level - height[top_idx]) * width = (1 - 0) * 1 = 1`. `water=1`.
    Now `height[3] > height[stack.top()] (2 > 1)`.
    Pop 1. `top_idx=1`.
    Stack not empty. `left_boundary_idx=0`.
    `width = i - left_boundary_idx - 1 = 3 - 0 - 1 = 2`.
    `water_level = min(height[left_boundary_idx], height[i]) = min(height[0], height[3]) = min(0,2) = 0`.
    `trapped_water += (water_level - height[top_idx]) * width = (0 - 1) * 2 = -2`. `water = 1 + (-2) = -1`.
    This implies my code's monotonic stack interpretation is incorrect or my example trace is.
    The issue is `min(height[0], height[3]) - height[1]` when `height[0]=0, height[3]=2, height[1]=1`.
    `min(0,2)` is 0. `0-1` is negative. This calculation is for adding water. If the `water_level` is less than `height[top_idx]`, it means no water can be trapped at that point.

Let's re-verify the standard monotonic stack approach for trapping water:
The standard approach involves pushing indices of bars onto a stack. When `height[i]` is greater than `height[stack.top()]`, it means we've found a right boundary. We pop `stack.top()` (which is the bottom of the well). The new `stack.top()` is the left boundary.
If `height[i]` is the right boundary, then `min(height[stack.top()], height[i])` is the true water level.
This should be the case. Let's trace it again carefully.
```cpp
// Corrected logic for illustration based on standard algorithm:
// The `while` loop pops elements from stack as long as current bar `height[i]` is taller.
// `top_idx` is the "middle" bar (or part of the declining sequence).
// `s.top()` (after `top_idx` is popped) is the "left wall".
// `i` is the "right wall".
// The water level is `min(height[s.top()], height[i])`.
// Water contribution is `(min(height[s.top()], height[i]) - height[top_idx]) * (i - s.top() - 1)`.
```

`height = [0,1,0,2,1,0,1,3,2,1,2,1]`
`stack = []` (stores indices of bars in *decreasing order of height from top to bottom*)
`water = 0`

`i=0, height[0]=0`: Push 0. `stack = [0]`
`i=1, height[1]=1`: `height[1] > height[s.top()] (1 > 0)`.
    Pop 0. `top_idx=0`. Stack empty. Break.
    Push 1. `stack = [1]`
`i=2, height[2]=0`: `height[2] <= height[s.top()] (0 <= 1)`. Push 2. `stack = [1, 2]`
`i=3, height[3]=2`: `height[3] > height[s.top()] (2 > 0)`.
    Pop 2. `top_idx=2`.
    Stack not empty. `left_boundary_idx=1`. (This is height[1]=1)
    `width = i - left_boundary_idx - 1 = 3 - 1 - 1 = 1`.
    `water_level = min(height[left_boundary_idx], height[i]) = min(height[1], height[3]) = min(1,2) = 1`.
    `trapped_water += (water_level - height[top_idx]) * width = (1 - 0) * 1 = 1`. `water=1`.
    Now stack is `[1]`. `height[3] (2) > height[s.top()] (1)`.
    Pop 1. `top_idx=1`.
    Stack now empty. Break.
    Push 3. `stack = [3]` (h[3]=2)
`i=4, height[4]=1`: `height[4] <= height[s.top()] (1 <= 2)`. Push 4. `stack = [3, 4]`
`i=5, height[5]=0`: `height[5] <= height[s.top()] (0 <= 1)`. Push 5. `stack = [3, 4, 5]`
`i=6, height[6]=1`: `height[6] > height[s.top()] (1 > 0)`.
    Pop 5. `top_idx=5`.
    Stack not empty. `left_boundary_idx=4`. (This is height[4]=1)
    `width = i - left_boundary_idx - 1 = 6 - 4 - 1 = 1`.
    `water_level = min(height[left_boundary_idx], height[i]) = min(height[4], height[6]) = min(1,1) = 1`.
    `trapped_water += (water_level - height[top_idx]) * width = (1 - 0) * 1 = 1`. `water=1+1=2`.
    Now stack is `[3, 4]`. `height[6] (1) <= height[s.top()] (1)`. Push 6. `stack = [3, 4, 6]`
`i=7, height[7]=3`: `height[7] > height[s.top()] (3 > 1)`.
    Pop 6. `top_idx=6`.
    Stack not empty. `left_boundary_idx=4`. (h[4]=1)
    `width = i - left_boundary_idx - 1 = 7 - 4 - 1 = 2`.
    `water_level = min(height[left_boundary_idx], height[i]) = min(height[4], height[7]) = min(1,3) = 1`.
    `trapped_water += (water_level - height[top_idx]) * width = (1 - 1) * 2 = 0`. `water=2+0=2`.
    Now stack is `[3, 4]`. `height[7] (3) > height[s.top()] (1)`.
    Pop 4. `top_idx=4`.
    Stack not empty. `left_boundary_idx=3`. (h[3]=2)
    `width = i - left_boundary_idx - 1 = 7 - 3 - 1 = 3`.
    `water_level = min(height[left_boundary_idx], height[i]) = min(height[3], height[7]) = min(2,3) = 2`.
    `trapped_water += (water_level - height[top_idx]) * width = (2 - 1) * 3 = 3`. `water=2+3=5`.
    Now stack is `[3]`. `height[7] (3) > height[s.top()] (2)`.
    Pop 3. `top_idx=3`.
    Stack empty. Break.
    Push 7. `stack = [7]`
`i=8, height[8]=2`: `height[8] <= height[s.top()] (2 <= 3)`. Push 8. `stack = [7, 8]`
`i=9, height[9]=1`: `height[9] <= height[s.top()] (1 <= 2)`. Push 9. `stack = [7, 8, 9]`
`i=10, height[10]=2`: `height[10] > height[s.top()] (2 > 1)`.
    Pop 9. `top_idx=9`.
    Stack not empty. `left_boundary_idx=8`. (h[8]=2)
    `width = i - left_boundary_idx - 1 = 10 - 8 - 1 = 1`.
    `water_level = min(height[left_boundary_idx], height[i]) = min(height[8], height[10]) = min(2,2) = 2`.
    `trapped_water += (water_level - height[top_idx]) * width = (2 - 1) * 1 = 1`. `water=5+1=6`.
    Now stack is `[7, 8]`. `height[10] (2) <= height[s.top()] (2)`. Push 10. `stack = [7, 8, 10]`
`i=11, height[11]=1`: `height[11] <= height[s.top()] (1 <= 2)`. Push 11. `stack = [7, 8, 10, 11]`

Loop ends. Final water = 6. This trace is correct.

**Complexity Analysis:**
*   **Time Complexity:** O(N). Each element is pushed onto the stack and popped from the stack at most once.
*   **Space Complexity:** O(N) in the worst case (e.g., if heights are strictly decreasing, the stack will store all indices).

---

## 4. Product of Array Except Self

### Problem Statement

Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.

The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.

**Constraints:**
*   You must write an algorithm that runs in O(N) time.
*   You must not use the division operation.

**Example:**
`nums = [1,2,3,4]`
Output: `[24,12,8,6]`

**Explanation:**
`answer[0] = 2 * 3 * 4 = 24`
`answer[1] = 1 * 3 * 4 = 12`
`answer[2] = 1 * 2 * 4 = 8`
`answer[3] = 1 * 2 * 3 = 6`

### Approach 1: Two-Pass (Prefix and Suffix Products) - Optimal Solution

**Concept:**
To calculate `answer[i]` without division, we need the product of elements to its left and the product of elements to its right. We can compute these two products separately and then multiply them for each index.

1.  **First Pass (Left Products):** Create an array `answer` where `answer[i]` stores the product of all elements to the *left* of `nums[i]`. For `answer[0]`, the product to its left is `1` (empty prefix product).
2.  **Second Pass (Right Products):** Iterate from right to left. Maintain a `right_product` variable that accumulates the product of elements to the *right* of the current index. For `answer[i]`, multiply `answer[i]` (which currently holds the left product) by `right_product`. Then, update `right_product` by multiplying it with `nums[i]`.

**Algorithm:**
1.  Initialize `n = nums.size()`.
2.  Create an `answer` array of size `n`.
3.  **First Pass (Prefix Products):**
    a.  `answer[0] = 1`. (The product of elements to the left of the first element is 1).
    b.  For `i` from 1 to `n-1`: `answer[i] = answer[i-1] * nums[i-1]`.
        (At this point, `answer[i]` contains the product of `nums[0]` through `nums[i-1]`).
4.  **Second Pass (Suffix Products and Final Calculation):**
    a.  Initialize `right_product = 1`. (The product of elements to the right of the last element is 1).
    b.  For `i` from `n-1` down to 0:
        i.   `answer[i] = answer[i] * right_product`. (Multiply the left product by the right product).
        ii.  `right_product = right_product * nums[i]`. (Update `right_product` for the next iteration).
5.  Return `answer`.

**Diagram:**
```
nums = [1, 2, 3, 4]

Initial answer: [_, _, _, _]

Pass 1: Left Products
answer[0] = 1
answer[1] = answer[0] * nums[0] = 1 * 1 = 1
answer[2] = answer[1] * nums[1] = 1 * 2 = 2
answer[3] = answer[2] * nums[2] = 2 * 3 = 6
Current answer: [1, 1, 2, 6]
(answer[i] now holds product of nums[0...i-1])

Pass 2: Right Products and Final Result
right_product = 1

i = 3 (nums[3]=4):
  answer[3] = answer[3] * right_product = 6 * 1 = 6
  right_product = right_product * nums[3] = 1 * 4 = 4
  Current answer: [1, 1, 2, 6]

i = 2 (nums[2]=3):
  answer[2] = answer[2] * right_product = 2 * 4 = 8
  right_product = right_product * nums[2] = 4 * 3 = 12
  Current answer: [1, 1, 8, 6]

i = 1 (nums[1]=2):
  answer[1] = answer[1] * right_product = 1 * 12 = 12
  right_product = right_product * nums[1] = 12 * 2 = 24
  Current answer: [1, 12, 8, 6]

i = 0 (nums[0]=1):
  answer[0] = answer[0] * right_product = 1 * 24 = 24
  right_product = right_product * nums[0] = 24 * 1 = 24
  Current answer: [24, 12, 8, 6]

Final answer: [24, 12, 8, 6]
```

**Complexity Analysis:**
*   **Time Complexity:** O(N). We make two passes over the array.
*   **Space Complexity:** O(1) if we do not count the output array. If the output array is counted, then O(N). This solution fulfills the typical interview requirement for O(1) *additional* space.
*   **Meets all Constraints:** O(N) time, no division, O(1) additional space.

### Approach 2: Brute-Force

**Concept:**
For each element `nums[i]`, iterate through the entire array, multiplying all elements except `nums[i]` itself.

**Algorithm:**
1.  Initialize `n = nums.size()`.
2.  Create an `answer` array of size `n`.
3.  For `i` from 0 to `n-1`:
    a.  Initialize `current_product = 1`.
    b.  For `j` from 0 to `n-1`:
        i.   If `i == j`, skip this element.
        ii.  Else, `current_product = current_product * nums[j]`.
    c.  `answer[i] = current_product`.
4.  Return `answer`.

**Diagram:**
```
nums = [1, 2, 3, 4]

i = 0 (nums[0]=1):
  current_product = 1
  j=0: skip (i==j)
  j=1: current_product = 1 * nums[1] = 1 * 2 = 2
  j=2: current_product = 2 * nums[2] = 2 * 3 = 6
  j=3: current_product = 6 * nums[3] = 6 * 4 = 24
  answer[0] = 24

i = 1 (nums[1]=2):
  current_product = 1
  j=0: current_product = 1 * nums[0] = 1 * 1 = 1
  j=1: skip (i==j)
  j=2: current_product = 1 * nums[2] = 1 * 3 = 3
  j=3: current_product = 3 * nums[3] = 3 * 4 = 12
  answer[1] = 12

... and so on ...

Final answer: [24, 12, 8, 6]
```

**Complexity Analysis:**
*   **Time Complexity:** O(N^2). There are nested loops, each iterating up to `N` times.
*   **Space Complexity:** O(1) excluding the output array.
*   **Violates Constraints:** O(N^2) time complexity is not less than O(N).

---