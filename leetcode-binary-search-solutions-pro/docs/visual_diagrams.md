# Visual Diagrams for Binary Search

These ASCII art diagrams illustrate the core concepts and steps of binary search.

---

## 1. Standard Binary Search (`[low, high]` inclusive search space)

**Initial State:**
```
Array: [2, 4, 6, 8, 10, 12, 14, 16] , Target = 10
Indexes: 0  1  2  3   4   5   6   7
         ^                        ^
       low                      high
```

**Iteration 1:**
```
low = 0, high = 7
mid = 0 + (7 - 0) // 2 = 3
arr[mid] = arr[3] = 8

Target (10) > arr[mid] (8)
Search in right half: low = mid + 1 = 4

Array: [2, 4, 6, 8, 10, 12, 14, 16]
Indexes: 0  1  2  3   4   5   6   7
                     ^            ^
                   low          high
```

**Iteration 2:**
```
low = 4, high = 7
mid = 4 + (7 - 4) // 2 = 5
arr[mid] = arr[5] = 12

Target (10) < arr[mid] (12)
Search in left half: high = mid - 1 = 4

Array: [2, 4, 6, 8, 10, 12, 14, 16]
Indexes: 0  1  2  3   4   5   6   7
                     ^
                   low,high
```

**Iteration 3:**
```
low = 4, high = 4
mid = 4 + (4 - 4) // 2 = 4
arr[mid] = arr[4] = 10

Target (10) == arr[mid] (10)
Found! Return mid (4).
```

---

## 2. Finding First Occurrence (Lower Bound)

**Goal:** Find the *first* `3` in `[1, 2, 3, 3, 3, 4, 5]`. Expected index: `2`.

**Initial State:**
```
Array: [1, 2, 3, 3, 3, 4, 5] , Target = 3
Indexes: 0  1  2  3  4  5  6
         ^                    ^
       low                  high
first_occurrence = -1
```

**Iteration 1:**
```
low = 0, high = 6
mid = 3
arr[mid] = arr[3] = 3

Target (3) == arr[mid] (3)
  Found a '3' at index 3. This could be the first. Store it.
  first_occurrence = 3
  But maybe there's an earlier '3'? Search left: high = mid - 1 = 2

Array: [1, 2, 3, 3, 3, 4, 5]
Indexes: 0  1  2  3  4  5  6
         ^     ^
       low   high
first_occurrence = 3
```

**Iteration 2:**
```
low = 0, high = 2
mid = 1
arr[mid] = arr[1] = 2

Target (3) > arr[mid] (2)
  Target is larger. Search right: low = mid + 1 = 2

Array: [1, 2, 3, 3, 3, 4, 5]
Indexes: 0  1  2  3  4  5  6
               ^
            low,high
first_occurrence = 3
```

**Iteration 3:**
```
low = 2, high = 2
mid = 2
arr[mid] = arr[2] = 3

Target (3) == arr[mid] (3)
  Found a '3' at index 2. This is earlier than 3. Store it.
  first_occurrence = 2
  Maybe there's an even earlier '3'? Search left: high = mid - 1 = 1

Array: [1, 2, 3, 3, 3, 4, 5]
Indexes: 0  1  2  3  4  5  6
         ^  ^
       low high
first_occurrence = 2
```

**Iteration 4:**
```
low = 2, high = 1
low > high. Loop terminates.

Return first_occurrence (2).
```

---

## 3. Search in Rotated Sorted Array

**Goal:** Find `0` in `[4, 5, 6, 7, 0, 1, 2]`. Expected index: `4`.

**Initial State:**
```
Array: [4, 5, 6, 7, 0, 1, 2] , Target = 0
Indexes: 0  1  2  3  4  5  6
         ^                    ^
       low                  high
```

**Iteration 1:**
```
low = 0, high = 6
mid = 3
arr[mid] = arr[3] = 7

arr[low] (4) <= arr[mid] (7) -> Left half [4, 5, 6, 7] is sorted.
Is target (0) in sorted left half (4 <= 0 < 7)? No.
So, target must be in the right (unsorted) half.
low = mid + 1 = 4

Array: [4, 5, 6, 7, 0, 1, 2]
Indexes: 0  1  2  3  4  5  6
                         ^  ^
                       low high
```

**Iteration 2:**
```
low = 4, high = 6
mid = 4 + (6 - 4) // 2 = 5
arr[mid] = arr[5] = 1

arr[low] (0) > arr[mid] (1) -> Right half [0, 1, 2] is sorted. (This is `arr[mid] < arr[high]` case)
Is target (0) in sorted right half (1 < 0 <= 2)? No. (Actually, 0 < 1 is false)
Let's re-evaluate the condition:
`arr[low] (0) <= arr[mid] (1)` is FALSE.
So, `arr[mid] (1) < arr[high] (2)` -> Right half `[1, 2]` is sorted.
Is target (0) in sorted right half (`arr[mid]` < target <= `arr[high]`) -> `1 < 0 <= 2`? No.
So, target must be in the left (unsorted) half.
high = mid - 1 = 4

Array: [4, 5, 6, 7, 0, 1, 2]
Indexes: 0  1  2  3  4  5  6
                         ^
                     low,high
```

**Iteration 3:**
```
low = 4, high = 4
mid = 4
arr[mid] = arr[4] = 0

Target (0) == arr[mid] (0)
Found! Return mid (4).
```

---