# Binary Search Diagrams (ASCII Art)

These diagrams illustrate the iterative binary search process.

## 1. Basic Iterative Binary Search

**Problem:** Find `target = 9` in `nums = [-1, 0, 3, 5, 9, 12]`.

Initial state:
```
nums = [-1, 0, 3, 5, 9, 12]
Indices:   0  1  2  3  4   5
           ^                  ^
         left              right
```

**Iteration 1:**
`left = 0`, `right = 5`
`mid = 0 + (5 - 0) // 2 = 2`
`nums[mid]` (`nums[2]`) is `3`.
`3 < 9` (target), so search in the right half. `left = mid + 1 = 3`.

```
nums = [-1, 0, 3, 5, 9, 12]
Indices:   0  1  2  3  4   5
                      ^     ^
                    left   right
```

**Iteration 2:**
`left = 3`, `right = 5`
`mid = 3 + (5 - 3) // 2 = 4`
`nums[mid]` (`nums[4]`) is `9`.
`9 == 9` (target), **Target Found! Return `mid = 4`.**

```
nums = [-1, 0, 3, 5, 9, 12]
Indices:   0  1  2  3  4   5
                         ^
                       mid (target found)
```

---

## 2. Target Not Found Example

**Problem:** Find `target = 2` in `nums = [-1, 0, 3, 5, 9, 12]`.

Initial state:
```
nums = [-1, 0, 3, 5, 9, 12]
Indices:   0  1  2  3  4   5
           ^                  ^
         left              right
```

**Iteration 1:**
`left = 0`, `right = 5`
`mid = 2`, `nums[2] = 3`
`3 > 2` (target), so search in the left half. `right = mid - 1 = 1`.

```
nums = [-1, 0, 3, 5, 9, 12]
Indices:   0  1  2  3  4   5
           ^  ^
         left right
```

**Iteration 2:**
`left = 0`, `right = 1`
`mid = 0 + (1 - 0) // 2 = 0`
`nums[mid]` (`nums[0]`) is `-1`.
`-1 < 2` (target), so search in the right half. `left = mid + 1 = 1`.

```
nums = [-1, 0, 3, 5, 9, 12]
Indices:   0  1  2  3  4   5
              ^ ^
           right left (left > right, loop terminates)
```

**Iteration 3:**
`left = 1`, `right = 1`
`mid = 1 + (1 - 1) // 2 = 1`
`nums[mid]` (`nums[1]`) is `0`.
`0 < 2` (target), so search in the right half. `left = mid + 1 = 2`.

```
nums = [-1, 0, 3, 5, 9, 12]
Indices:   0  1  2  3  4   5
                 ^
           right (old)
                    ^
                   left (new)
```

Now `left = 2`, `right = 1`. Since `left > right`, the loop terminates. **Target not found. Return -1.**

---

## 3. Searching for First/Last Occurrence (Example: First Occurrence of 7)

**Problem:** Find first occurrence of `target = 7` in `nums = [5, 7, 7, 8, 8, 10]`.

Initial state:
```
nums = [5, 7, 7, 8, 8, 10]
Indices:   0  1  2  3  4   5
           ^                  ^
         left              right
ans = -1
```

**Iteration 1:**
`left = 0`, `right = 5`
`mid = 2`, `nums[2] = 7`
`nums[mid] == target`. Set `ans = mid = 2`. Try to find an earlier `7`. `right = mid - 1 = 1`.

```
nums = [5, 7, 7, 8, 8, 10]
Indices:   0  1  2  3  4   5
           ^  ^
         left right
ans = 2
```

**Iteration 2:**
`left = 0`, `right = 1`
`mid = 0`, `nums[0] = 5`
`nums[mid] < target`. Target is to the right. `left = mid + 1 = 1`.

```
nums = [5, 7, 7, 8, 8, 10]
Indices:   0  1  2  3  4   5
              ^ ^
            right left (now left = right)
ans = 2
```

**Iteration 3:**
`left = 1`, `right = 1`
`mid = 1`, `nums[1] = 7`
`nums[mid] == target`. Set `ans = mid = 1`. Try to find an earlier `7`. `right = mid - 1 = 0`.

```
nums = [5, 7, 7, 8, 8, 10]
Indices:   0  1  2  3  4   5
           ^
        right
              ^
             left (old)
ans = 1
```

Now `left = 1`, `right = 0`. Since `left > right`, the loop terminates. **Return `ans = 1`.**
This correctly identifies the first occurrence of `7`. A similar logic, but adjusting `left = mid + 1` when `nums[mid] == target`, would find the last occurrence.