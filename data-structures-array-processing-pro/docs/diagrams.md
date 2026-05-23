# Visual Diagrams for Array Manipulation Problems

This document provides ASCII art diagrams to help visualize the logic behind some of the algorithms.

---

## 1. Rotate Array (Reverse Technique)

**Problem:** Rotate `[1, 2, 3, 4, 5, 6, 7]` to the right by `k = 3` steps.

```
Initial Array:
[ 1, 2, 3, 4, 5, 6, 7 ]
  ^         ^
  |         k elements to be rotated
  n-k elements

Step 1: Reverse the entire array
[ 7, 6, 5, 4, 3, 2, 1 ]
  ^                 ^
  0                 n-1

Step 2: Reverse the first `k` elements (0 to k-1)
Original array elements 5, 6, 7 are now at indices 0, 1, 2. Reversing them puts them in order.
[ 5, 6, 7, 4, 3, 2, 1 ]
  ^   ^
  0   k-1

Step 3: Reverse the remaining `n-k` elements (k to n-1)
Original array elements 1, 2, 3, 4 are now at indices 3, 4, 5, 6 (reverse order). Reversing them puts them in order.
[ 5, 6, 7, 1, 2, 3, 4 ]
          ^         ^
          k         n-1

Final Result:
[ 5, 6, 7, 1, 2, 3, 4 ]
```

---

## 2. Trapping Rain Water (Two Pointers)

**Problem:** `height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]`

```
Elevation Map Visualization:
           #
     #     # # #
   # # # # # # # # #
 # # # # # # # # # # # #
 0 1 0 2 1 0 1 3 2 1 2 1  (Heights)
 ^                     ^
 L                     R

Initial State:
L = 0, R = 11
maxL = 0, maxR = 0
totalWater = 0

Iteration 1: height[L]=0, height[R]=1. height[L] < height[R]
  maxL = max(0, height[0]) = 0.
  height[0]=0 < maxL=0 (false). Water = 0.
  L++ (L=1)
  State: L=1, R=11, maxL=0, maxR=0, totalWater=0

Iteration 2: height[L]=1, height[R]=1. height[L] >= height[R] (tie-breaker goes to right usually)
  maxR = max(0, height[11]) = 1.
  height[11]=1 >= maxR=1 (false). Water = 0.
  R-- (R=10)
  State: L=1, R=10, maxL=0, maxR=1, totalWater=0

Iteration 3: height[L]=1, height[R]=2. height[L] < height[R]
  maxL = max(0, height[1]) = 1.
  height[1]=1 >= maxL=1 (true). maxL updates to 1.
  L++ (L=2)
  State: L=2, R=10, maxL=1, maxR=1, totalWater=0

Iteration 4: height[L]=0, height[R]=2. height[L] < height[R]
  height[2]=0 < maxL=1 (true). Water = maxL - height[2] = 1 - 0 = 1. totalWater = 1.
  L++ (L=3)
  State: L=3, R=10, maxL=1, maxR=1, totalWater=1

Iteration 5: height[L]=2, height[R]=2. height[L] >= height[R]
  maxR = max(1, height[10]) = 2.
  height[10]=2 >= maxR=2 (true). maxR updates to 2.
  R-- (R=9)
  State: L=3, R=9, maxL=1, maxR=2, totalWater=1

Iteration 6: height[L]=2, height[R]=1. height[L] >= height[R]
  maxR = max(2, height[9]) = 2.
  height[9]=1 < maxR=2 (true). Water = maxR - height[9] = 2 - 1 = 1. totalWater = 1 + 1 = 2.
  R-- (R=8)
  State: L=3, R=8, maxL=1, maxR=2, totalWater=2

Iteration 7: height[L]=2, height[R]=2. height[L] >= height[R]
  maxR = max(2, height[8]) = 2.
  height[8]=2 >= maxR=2 (true). maxR updates to 2.
  R-- (R=7)
  State: L=3, R=7, maxL=1, maxR=2, totalWater=2

Iteration 8: height[L]=2, height[R]=3. height[L] < height[R]
  height[3]=2 >= maxL=1 (true). maxL updates to 2.
  L++ (L=4)
  State: L=4, R=7, maxL=2, maxR=2, totalWater=2

Iteration 9: height[L]=1, height[R]=3. height[L] < height[R]
  height[4]=1 < maxL=2 (true). Water = maxL - height[4] = 2 - 1 = 1. totalWater = 2 + 1 = 3.
  L++ (L=5)
  State: L=5, R=7, maxL=2, maxR=2, totalWater=3

Iteration 10: height[L]=0, height[R]=3. height[L] < height[R]
  height[5]=0 < maxL=2 (true). Water = maxL - height[5] = 2 - 0 = 2. totalWater = 3 + 2 = 5.
  L++ (L=6)
  State: L=6, R=7, maxL=2, maxR=2, totalWater=5

Iteration 11: height[L]=1, height[R]=3. height[L] < height[R]
  height[6]=1 < maxL=2 (true). Water = maxL - height[6] = 2 - 1 = 1. totalWater = 5 + 1 = 6.
  L++ (L=7)
  State: L=7, R=7, maxL=2, maxR=2, totalWater=6

Loop ends because L is no longer less than R.
Final totalWater = 6.
```

---

## 3. Product of Array Except Self (Two-Pass)

**Problem:** `nums = [1, 2, 3, 4]`

```
Initial Array:
[ 1, 2, 3, 4 ]

Initialize Answer Array:
answer = [ ?, ?, ?, ? ]

--- Pass 1: Calculate Left Products ---
Initialize left_product_accumulator = 1.
For i from 0 to n-1:
  answer[i] = left_product_accumulator
  left_product_accumulator = left_product_accumulator * nums[i]

i = 0: nums[0]=1
  answer[0] = 1        (left_product_accumulator was 1)
  left_product_accumulator = 1 * 1 = 1
  answer = [ 1, ?, ?, ? ]

i = 1: nums[1]=2
  answer[1] = 1        (left_product_accumulator was 1)
  left_product_accumulator = 1 * 2 = 2
  answer = [ 1, 1, ?, ? ]

i = 2: nums[2]=3
  answer[2] = 2        (left_product_accumulator was 2)
  left_product_accumulator = 2 * 3 = 6
  answer = [ 1, 1, 2, ? ]

i = 3: nums[3]=4
  answer[3] = 6        (left_product_accumulator was 6)
  left_product_accumulator = 6 * 4 = 24
  answer = [ 1, 1, 2, 6 ]

--- Pass 2: Calculate Right Products and Final Result ---
Initialize right_product_accumulator = 1.
For i from n-1 down to 0:
  answer[i] = answer[i] * right_product_accumulator
  right_product_accumulator = right_product_accumulator * nums[i]

i = 3: nums[3]=4
  answer[3] = 6 * 1 = 6  (answer[3] was 6, right_product_accumulator was 1)
  right_product_accumulator = 1 * 4 = 4
  answer = [ 1, 1, 2, 6 ]

i = 2: nums[2]=3
  answer[2] = 2 * 4 = 8  (answer[2] was 2, right_product_accumulator was 4)
  right_product_accumulator = 4 * 3 = 12
  answer = [ 1, 1, 8, 6 ]

i = 1: nums[1]=2
  answer[1] = 1 * 12 = 12 (answer[1] was 1, right_product_accumulator was 12)
  right_product_accumulator = 12 * 2 = 24
  answer = [ 1, 12, 8, 6 ]

i = 0: nums[0]=1
  answer[0] = 1 * 24 = 24 (answer[0] was 1, right_product_accumulator was 24)
  right_product_accumulator = 24 * 1 = 24
  answer = [ 24, 12, 8, 6 ]

Final Result:
[ 24, 12, 8, 6 ]
```