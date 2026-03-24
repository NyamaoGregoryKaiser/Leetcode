# Visual Diagrams (ASCII Art)

This document provides ASCII art diagrams to illustrate the concepts of core sorting algorithms and key operations.

---

## 1. Merge Sort - Merge Step

Imagine merging two already sorted subarrays: `[1, 5, 8]` and `[2, 3, 9]`.

```
Left Sorted Array:  [ 1 , 5 , 8 ]
                    ^ i
Right Sorted Array: [ 2 , 3 , 9 ]
                    ^ j
Merged Array:       [ ]
```

**Step 1:** Compare `1` and `2`. `1` is smaller.

```
Left Sorted Array:  [ 1 , 5 , 8 ]
                        ^ i
Right Sorted Array: [ 2 , 3 , 9 ]
                    ^ j
Merged Array:       [ 1 ]
```

**Step 2:** Compare `5` and `2`. `2` is smaller.

```
Left Sorted Array:  [ 1 , 5 , 8 ]
                        ^ i
Right Sorted Array: [ 2 , 3 , 9 ]
                          ^ j
Merged Array:       [ 1 , 2 ]
```

**Step 3:** Compare `5` and `3`. `3` is smaller.

```
Left Sorted Array:  [ 1 , 5 , 8 ]
                        ^ i
Right Sorted Array: [ 2 , 3 , 9 ]
                            ^ j
Merged Array:       [ 1 , 2 , 3 ]
```

**Step 4:** Compare `5` and `9`. `5` is smaller.

```
Left Sorted Array:  [ 1 , 5 , 8 ]
                            ^ i
Right Sorted Array: [ 2 , 3 , 9 ]
                            ^ j
Merged Array:       [ 1 , 2 , 3 , 5 ]
```

**Step 5:** Compare `8` and `9`. `8` is smaller.

```
Left Sorted Array:  [ 1 , 5 , 8 ]
                                ^ i
Right Sorted Array: [ 2 , 3 , 9 ]
                            ^ j
Merged Array:       [ 1 , 2 , 3 , 5 , 8 ]
```

**Step 6:** Left array exhausted. Append remaining from Right array.

```
Left Sorted Array:  [ 1 , 5 , 8 ]
                                ^ i
Right Sorted Array: [ 2 , 3 , 9 ]
                                ^ j
Merged Array:       [ 1 , 2 , 3 , 5 , 8 , 9 ]
```

---

## 2. Quick Sort - Partition Step (Lomuto Partition Scheme)

Given an array `arr` and a pivot `p` (typically the last element).
Goal: `[elements <= p | p | elements > p]`

Example: `arr = [7, 2, 1, 6, 8, 5, 3]` (pivot `p = 3`)
`low = 0`, `high = 6`
`pivot = arr[high] = 3`
`i = low - 1 = -1` (index of smaller element)

**Initial State:**
```
[ 7,  2,  1,  6,  8,  5,  3 ]
  ^low                       ^high (pivot)
```

**Iteration `j=0` (`arr[0]=7`):** `7 > 3`. Do nothing.
`i = -1`
`j = 0`

**Iteration `j=1` (`arr[1]=2`):** `2 <= 3`. Increment `i` to 0. Swap `arr[0]` and `arr[1]`.
`i = 0`
`arr = [2, 7, 1, 6, 8, 5, 3]`
         ^i   ^j

**Iteration `j=2` (`arr[2]=1`):** `1 <= 3`. Increment `i` to 1. Swap `arr[1]` and `arr[2]`.
`i = 1`
`arr = [2, 1, 7, 6, 8, 5, 3]`
            ^i  ^j

**Iteration `j=3` (`arr[3]=6`):** `6 > 3`. Do nothing.
`i = 1`
`j = 3`

**Iteration `j=4` (`arr[4]=8`):** `8 > 3`. Do nothing.
`i = 1`
`j = 4`

**Iteration `j=5` (`arr[5]=5`):** `5 > 3`. Do nothing.
`i = 1`
`j = 5`

**After loop (`j` reaches `high-1`):**
`arr = [2, 1, 7, 6, 8, 5, 3]`
            ^i                ^high
Now, swap `arr[i+1]` (`arr[2]=7`) with `arr[high]` (`arr[6]=3`).
`arr = [2, 1, 3, 6, 8, 5, 7]`
            ^pivot_final_index (i+1=2)

**Final State of Partition:**
```
[ 2,  1,  3,  6,  8,  5,  7 ]
< pivot  ^pivot  > pivot
```
The pivot `3` is now at its correct sorted position. The elements to its left are smaller, and to its right are larger.

---

## 3. Wiggle Sort II - Simple Approach Interleaving

Example: `nums = [1, 5, 1, 1, 6, 4]`

1.  **Sort `nums`:** `sorted_nums = [1, 1, 1, 4, 5, 6]`

2.  **Split into halves:**
    *   `small_half = [1, 1, 1]` (`(n+1)//2 = 3` elements for `n=6`)
    *   `large_half = [4, 5, 6]` (remaining `n - (n+1)//2 = 3` elements)

3.  **Interleave (from end of halves):**
    `s_ptr` points to `small_half[-1]` (value `1`).
    `l_ptr` points to `large_half[-1]` (value `6`).
    `result = []` (or modify `nums` in-place)

    **Iteration `i = 0` (even index):**
    Take from `small_half` (last element): `nums[0] = 1`.
    `s_ptr` moves to `small_half[-2]` (value `1`).
    `nums` state: `[1, _, _, _, _, _]`

    **Iteration `i = 1` (odd index):**
    Take from `large_half` (last element): `nums[1] = 6`.
    `l_ptr` moves to `large_half[-2]` (value `5`).
    `nums` state: `[1, 6, _, _, _, _]`

    **Iteration `i = 2` (even index):**
    Take from `small_half`: `nums[2] = 1`.
    `s_ptr` moves to `small_half[-3]` (value `1`).
    `nums` state: `[1, 6, 1, _, _, _]`

    **Iteration `i = 3` (odd index):**
    Take from `large_half`: `nums[3] = 5`.
    `l_ptr` moves to `large_half[-3]` (value `4`).
    `nums` state: `[1, 6, 1, 5, _, _]`

    **Iteration `i = 4` (even index):**
    Take from `small_half`: `nums[4] = 1`.
    `s_ptr` moves to exhausted.
    `nums` state: `[1, 6, 1, 5, 1, _]`

    **Iteration `i = 5` (odd index):**
    Take from `large_half`: `nums[5] = 4`.
    `l_ptr` moves to exhausted.
    `nums` state: `[1, 6, 1, 5, 1, 4]`

**Final Wiggle Sorted Array:** `[1, 6, 1, 5, 1, 4]`
This satisfies the `nums[0] < nums[1] > nums[2] < nums[3] > nums[4] < nums[5]` condition.

---