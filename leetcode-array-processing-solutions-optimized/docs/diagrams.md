```markdown
# Visual Diagrams (ASCII Art) for Array Manipulation

This document provides ASCII art diagrams to help visualize the logic behind some of the algorithms, especially for "Trapping Rain Water" and "Product of Array Except Self".

---

## 1. Product of Array Except Self (Two-Pass Optimal)

**Problem**: `nums = [1, 2, 3, 4]`

**Goal**: `answer = [24, 12, 8, 6]`

### Step 1: Initialize `answer` array and `left_product`

```
nums:    [ 1,  2,  3,  4 ]
index:     0   1   2   3

answer:  [ 1,  1,  1,  1 ]
left_product = 1
```

### Step 2: First Pass (Left-to-Right) - Calculate prefix products

At each `i`, `answer[i]` gets `left_product`, then `left_product` is updated.

```
i = 0:
  answer[0] = 1 (left_product)
  left_product = 1 * nums[0] = 1 * 1 = 1
answer:  [ 1,  1,  1,  1 ]

i = 1:
  answer[1] = 1 (left_product)
  left_product = 1 * nums[1] = 1 * 2 = 2
answer:  [ 1,  1,  1,  1 ]

i = 2:
  answer[2] = 2 (left_product)
  left_product = 2 * nums[2] = 2 * 3 = 6
answer:  [ 1,  1,  2,  1 ]

i = 3:
  answer[3] = 6 (left_product)
  left_product = 6 * nums[3] = 6 * 4 = 24
answer:  [ 1,  1,  2,  6 ]
```

After First Pass: `answer` holds `[ P_left_0, P_left_1, P_left_2, P_left_3 ]`
where `P_left_i` is product of elements strictly to the left of `i`.
`answer`: `[ 1, 1, 2, 6 ]`

### Step 3: Second Pass (Right-to-Left) - Combine with suffix products

At each `i`, `answer[i]` is multiplied by `right_product`, then `right_product` is updated.

```
right_product = 1

i = 3:
  answer[3] = 6 * 1 (right_product) = 6
  right_product = 1 * nums[3] = 1 * 4 = 4
answer:  [ 1,  1,  2,  6 ]

i = 2:
  answer[2] = 2 * 4 (right_product) = 8
  right_product = 4 * nums[2] = 4 * 3 = 12
answer:  [ 1,  1,  8,  6 ]

i = 1:
  answer[1] = 1 * 12 (right_product) = 12
  right_product = 12 * nums[1] = 12 * 2 = 24
answer:  [ 1, 12,  8,  6 ]

i = 0:
  answer[0] = 1 * 24 (right_product) = 24
  right_product = 24 * nums[0] = 24 * 1 = 24
answer:  [24, 12,  8,  6 ]
```

Final `answer`: `[24, 12, 8, 6]`

---

## 2. Trapping Rain Water (Two-Pointers Optimal)

**Problem**: `height = [0,1,0,2,1,0,1,3,2,1,2,1]`

**Goal**: Total trapped water = 6

### Setup

```
index:   0 1 2 3 4 5 6 7 8 9 10 11
height: [0,1,0,2,1,0,1,3,2,1, 2, 1]

left = 0, right = 11
max_left = 0, max_right = 0
total_water = 0
```

### Iteration Steps (Conceptual Flow)

Imagine two walls moving inwards. Water is trapped if the current bar is shorter than the minimum of the two "most recent" highest walls (`max_left` and `max_right`).

```
height: [0,1,0,2,1,0,1,3,2,1,2,1]
         L                           R
        ml=0                        mr=0
        h[L]=0, h[R]=1. h[L] < h[R].
        ml = max(ml, h[L]) = max(0,0)=0. L++.
        -> L=1, R=11, ml=0, mr=0, water=0

height: [0,1,0,2,1,0,1,3,2,1,2,1]
           L                         R
          ml=0                      mr=0
        h[L]=1, h[R]=1. h[L] <= h[R].
        mr = max(mr, h[R]) = max(0,1)=1. R--.
        -> L=1, R=10, ml=0, mr=1, water=0

height: [0,1,0,2,1,0,1,3,2,1,2,1]
           L                       R
          ml=0                    mr=1
        h[L]=1, h[R]=2. h[L] < h[R].
        ml = max(ml, h[L]) = max(0,1)=1. L++.
        -> L=2, R=10, ml=1, mr=1, water=0

height: [0,1,0,2,1,0,1,3,2,1,2,1]
             L                     R
            ml=1                  mr=1
        h[L]=0, h[R]=2. h[L] < h[R].
        h[L]=0 < ml=1. Add water: ml - h[L] = 1 - 0 = 1.
        total_water = 1. L++.
        -> L=3, R=10, ml=1, mr=1, water=1

height: [0,1,0,2,1,0,1,3,2,1,2,1]
               L                   R
              ml=1                mr=1
        h[L]=2, h[R]=2. h[L] <= h[R].
        mr = max(mr, h[R]) = max(1,2)=2. R--.
        -> L=3, R=9, ml=1, mr=2, water=1

height: [0,1,0,2,1,0,1,3,2,1,2,1]
               L                 R
              ml=1              mr=2
        h[L]=2, h[R]=1. h[L] > h[R].
        h[R]=1 < mr=2. Add water: mr - h[R] = 2 - 1 = 1.
        total_water = 1 + 1 = 2. R--.
        -> L=3, R=8, ml=1, mr=2, water=2

... and so on ... (This is effectively how the algorithm proceeds)
```

The key is that if you move `L`, you know `max_left` is the true left boundary for `height[L]`. If `max_left < max_right`, then the actual right boundary for `height[L]` will be at least `max_right`, so `min(max_left, actual_right_boundary)` will be `max_left`.

---

## 3. Rotate Array (Reversal Method Optimal)

**Problem**: `nums = [1,2,3,4,5,6,7]`, `k=3`

**Goal**: `nums = [5,6,7,1,2,3,4]`

### Step 1: Original Array

```
[ 1, 2, 3, 4, 5, 6, 7 ]
```

### Step 2: Reverse the entire array

```
Reverse(nums[0...n-1])
[ 7, 6, 5, 4, 3, 2, 1 ]
```

### Step 3: Reverse the first `k` elements (0 to k-1)

Here, `k=3`. Reverse `nums[0...2]`.

```
Reverse(nums[0...k-1])
[ 5, 6, 7, 4, 3, 2, 1 ]
```

### Step 4: Reverse the remaining `n-k` elements (k to n-1)

Here, `n-k=4`. Reverse `nums[3...6]`.

```
Reverse(nums[k...n-1])
[ 5, 6, 7, 1, 2, 3, 4 ]
```

This is the final rotated array.

---
```