# Visual Diagrams (ASCII Art)

This document provides ASCII art diagrams to help visualize the key steps of some algorithms.

---

## 1. Rotate Array (Reverse Method)

**Problem:** `nums = [1, 2, 3, 4, 5, 6, 7]`, `k = 3`

Original Array:
```
[ 1 | 2 | 3 | 4 | 5 | 6 | 7 ]
  0   1   2   3   4   5   6
```

**Step 1: Reverse the entire array** (`_reverse(nums, 0, n-1)`)
```
[ 7 | 6 | 5 | 4 | 3 | 2 | 1 ]
  0   1   2   3   4   5   6
```

**Step 2: Reverse the first `k` elements** (`_reverse(nums, 0, k-1)`)
`k = 3`, so reverse `nums[0...2]`
```
  _ _ _ _ _ _ _ _ _ _ _ _ _
[ 5 | 6 | 7 | 4 | 3 | 2 | 1 ]
  0   1   2   3   4   5   6
```
(Elements `5,6,7` are now in place relative to each other)

**Step 3: Reverse the remaining `n-k` elements** (`_reverse(nums, k, n-1)`)
`k = 3`, `n-k = 4`, so reverse `nums[3...6]`
```
                  _ _ _ _ _ _ _ _ _ _ _ _ _
[ 5 | 6 | 7 | 1 | 2 | 3 | 4 ]
  0   1   2   3   4   5   6
```
(Elements `1,2,3,4` are now in place relative to each other)

Final Rotated Array:
```
[ 5 | 6 | 7 | 1 | 2 | 3 | 4 ]
```

---

## 2. Maximum Subarray Sum (Kadane's Algorithm)

**Problem:** `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]`

Initialize: `global_max = -2`, `current_max = -2`

Iteration:

| Index | Element | `current_max` logic (`max(nums[i], current_max + nums[i])`) | `global_max` | Subarray ending at `i` with `current_max` |
|-------|---------|---------------------------------------------------------------|--------------|---------------------------------------------|
| **0** | -2      | -2                                                            | -2           | `[-2]`                                      |
| **1** | 1       | `max(1, -2+1) = 1`                                            | 1            | `[1]`                                       |
| **2** | -3      | `max(-3, 1-3) = -2`                                           | 1            | `[1, -3]` (better to start new -3, but we keep track of max ending here) |
| **3** | 4       | `max(4, -2+4) = 4`                                            | 4            | `[4]`                                       |
| **4** | -1      | `max(-1, 4-1) = 3`                                            | 4            | `[4, -1]`                                   |
| **5** | 2       | `max(2, 3+2) = 5`                                             | 5            | `[4, -1, 2]`                                |
| **6** | 1       | `max(1, 5+1) = 6`                                             | **6**        | `[4, -1, 2, 1]`                             |
| **7** | -5      | `max(-5, 6-5) = 1`                                            | 6            | `[4, -1, 2, 1, -5]`                         |
| **8** | 4       | `max(4, 1+4) = 5`                                             | 6            | `[4, -1, 2, 1, -5, 4]`                      |

Final `global_max = 6`.

---

## 3. Merge Intervals

**Problem:** `intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]`

1.  **Sorted Intervals:**
    ```
    [1,3]   [2,6]   [8,10]   [15,18]
    ```

2.  **`merged_intervals = []`**

Process:

*   **`[1, 3]`**: `merged_intervals` is empty. Add `[1, 3]`.
    `merged_intervals = [[1, 3]]`
    Current view:
    ```
    [1,3]
    ```

*   **`[2, 6]`**: Overlaps with `[1, 3]` because `2 <= 3`. Merge!
    Update last interval in `merged_intervals`: `max(3, 6) = 6`.
    `merged_intervals = [[1, 6]]`
    Current view:
    ```
    [1,------------6]
    ```

*   **`[8, 10]`**: Does NOT overlap with `[1, 6]` because `8 > 6`. Add `[8, 10]`.
    `merged_intervals = [[1, 6], [8, 10]]`
    Current view:
    ```
    [1,------------6] [8,------10]
    ```

*   **`[15, 18]`**: Does NOT overlap with `[8, 10]` because `15 > 10`. Add `[15, 18]`.
    `merged_intervals = [[1, 6], [8, 10], [15, 18]]`
    Current view:
    ```
    [1,------------6] [8,------10] [15,-------18]
    ```

Final Result: `[[1, 6], [8, 10], [15, 18]]`

---

## 4. Two Sum (Hash Map)

**Problem:** `nums = [2, 7, 11, 15]`, `target = 9`

`num_map = {}` (empty dictionary)

Iteration:

| Index | Element (`num`) | `complement = target - num` | Is `complement` in `num_map`? | Action                       | `num_map` (after action)    |
|-------|-----------------|-----------------------------|-------------------------------|------------------------------|-----------------------------|
| 0     | 2               | `9 - 2 = 7`                 | No                            | Add `(2: 0)`                 | `{2: 0}`                    |
| 1     | 7               | `9 - 7 = 2`                 | Yes (`2` is in `num_map`)     | Found! Return `[num_map[2], 1] = [0, 1]` | `{2: 0}` (stops here)       |

Result: `[0, 1]`

---

## 5. Next Permutation

**Problem:** `nums = [5, 4, 7, 5, 3, 2]`

Original:
```
[ 5 | 4 | 7 | 5 | 3 | 2 ]
  0   1   2   3   4   5
```

**Step 1: Find `k` (pivot from right: `nums[k] < nums[k+1]`)**

Scanning from right:
- `k=4 (3) < k+1=5 (2)`? No (3 not < 2)
- `k=3 (5) < k+1=4 (3)`? No (5 not < 3)
- `k=2 (7) < k+1=3 (5)`? No (7 not < 5)
- `k=1 (4) < k+1=2 (7)`? Yes! **`k = 1` (`nums[k] = 4`)**

Array:
```
[ 5 |(4)| 7 | 5 | 3 | 2 ]
      ^ k=1
```

**Step 2: Find `l` (first from right > `nums[k]`)**

`nums[k] = 4`. Scan `l` from `n-1` down to `k+1`:
- `l=5 (2) > 4`? No
- `l=4 (3) > 4`? No
- `l=3 (5) > 4`? Yes! **`l = 3` (`nums[l] = 5`)**

Array:
```
[ 5 |(4)| 7 |(5)| 3 | 2 ]
      ^ k=1     ^ l=3
```

**Step 3: Swap `nums[k]` and `nums[l]`** (`nums[1]` and `nums[3]`)
```
[ 5 |(5)| 7 |(4)| 3 | 2 ]
```

**Step 4: Reverse suffix `nums[k+1:]`** (from index `k+1=2` to `n-1=5`)
Suffix is `[7, 4, 3, 2]`. Reverse it to `[2, 3, 4, 7]`.

Final Array:
```
[ 5 | 5 | 2 | 3 | 4 | 7 ]
```
---