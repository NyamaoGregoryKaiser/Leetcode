```markdown
# Hash Table Visual Diagrams (ASCII Art)

This document provides ASCII art diagrams to help visualize the fundamental concepts behind hash tables and how they are used in solving the problems.

---

## 1. Basic Hash Table Structure (Chaining)

A hash table consists of an array of "buckets." When multiple keys hash to the same bucket, "collisions" occur. Chaining resolves collisions by storing a linked list (or another dynamic structure) of key-value pairs at each bucket.

```
+----------------+
|  BUCKET_ARRAY  |
+----------------+
| [0] -> NULL
|      
| [1] -> (Key1, Val1) -> (Key_Collision, Val_Collision) -> NULL
|                         / \
|                        /   \
| (Key1 % BUCKET_SIZE) = 1   (Key_Collision % BUCKET_SIZE) = 1
|      
| [2] -> (Key2, Val2) -> NULL
|      
| [3] -> (Key3, Val3) -> (Key_AnotherCollision, Val_AnotherCollision) -> NULL
|                         / \
|                        /   \
| (Key3 % BUCKET_SIZE) = 3   (Key_AnotherCollision % BUCKET_SIZE) = 3
| .
| .
| .
| [N-1] -> (KeyN-1, ValN-1) -> NULL
+----------------+
```

**Explanation:**
*   The `BUCKET_ARRAY` is the main array. Its size is usually fixed or dynamically resized.
*   Each `[index]` in the array is a "bucket."
*   `Key % BUCKET_SIZE` is a simple hash function. It determines which bucket a key maps to.
*   `NULL` indicates an empty bucket or the end of a linked list.
*   When `Key1` and `Key_Collision` both hash to bucket `[1]`, they are stored as nodes in a linked list at that bucket.

---

## 2. Two Sum with Hash Map Walkthrough

**Problem:** `nums = [2, 7, 11, 15]`, `target = 9`

**Hash Map State (number -> index):**

```
Initial state: empty map {}

1. Process `nums[0] = 2` (index 0):
   - Complement = 9 - 2 = 7
   - Is 7 in map? No.
   - Add (2 -> 0) to map.
   Map: { 2: 0 }

2. Process `nums[1] = 7` (index 1):
   - Complement = 9 - 7 = 2
   - Is 2 in map? Yes! (Key 2, Value 0)
   - Found pair: indices (map_value=0, current_index=1)
   Return [0, 1]
```

**Visual Flow:**

```
Input: nums = [2, 7, 11, 15], target = 9

Iteration 1 (i=0, nums[0]=2):
  target - nums[0] = 7
  Map does NOT contain 7.
  Add (2, 0) to Map.
  Map:
    +---+---+
    | 2 | 0 |
    +---+---+

Iteration 2 (i=1, nums[1]=7):
  target - nums[1] = 2
  Map DOES contain 2! (Value is 0)
  Return [0, 1] (Map value, current index)
```

---

## 3. Longest Consecutive Sequence with Hash Set Walkthrough

**Problem:** `nums = [100, 4, 200, 1, 3, 2]`

**Hash Set State:**

```
Initial `num_set` (all unique elements): {1, 2, 3, 4, 100, 200}
`longest_sequence = 0`

Iterate through `num_set`:

1. `num = 1`:
   - Is `0` in `num_set`? No. (1 is a sequence start)
   - `current_num = 1`, `current_sequence_length = 1`
   - Is `2` in `num_set`? Yes. `current_num = 2`, `current_sequence_length = 2`
   - Is `3` in `num_set`? Yes. `current_num = 3`, `current_sequence_length = 3`
   - Is `4` in `num_set`? Yes. `current_num = 4`, `current_sequence_length = 4`
   - Is `5` in `num_set`? No.
   - `longest_sequence = max(0, 4) = 4`

2. `num = 2`:
   - Is `1` in `num_set`? Yes. (2 is NOT a sequence start, skip)

3. `num = 3`:
   - Is `2` in `num_set`? Yes. (3 is NOT a sequence start, skip)

4. `num = 4`:
   - Is `3` in `num_set`? Yes. (4 is NOT a sequence start, skip)

5. `num = 100`:
   - Is `99` in `num_set`? No. (100 is a sequence start)
   - `current_num = 100`, `current_sequence_length = 1`
   - Is `101` in `num_set`? No.
   - `longest_sequence = max(4, 1) = 4`

6. `num = 200`:
   - Is `199` in `num_set`? No. (200 is a sequence start)
   - `current_num = 200`, `current_sequence_length = 1`
   - Is `201` in `num_set`? No.
   - `longest_sequence = max(4, 1) = 4`

Final Result: `4`
```

---

## 4. Group Anagrams with Hash Map (Sorted Key) Walkthrough

**Problem:** `strs = ["eat", "tea", "tan", "ate", "nat", "bat"]`

**Hash Map State (sorted_string -> vector_of_original_strings):**

```
Initial `anagram_groups`: {}

1. Process "eat":
   - Sort "eat" -> "aet"
   - `anagram_groups["aet"]` becomes `{"eat"}`
   Map: { "aet": ["eat"] }

2. Process "tea":
   - Sort "tea" -> "aet"
   - `anagram_groups["aet"]` now exists. Push "tea".
   - `anagram_groups["aet"]` becomes `{"eat", "tea"}`
   Map: { "aet": ["eat", "tea"] }

3. Process "tan":
   - Sort "tan" -> "ant"
   - `anagram_groups["ant"]` becomes `{"tan"}`
   Map: { "aet": ["eat", "tea"], "ant": ["tan"] }

4. Process "ate":
   - Sort "ate" -> "aet"
   - `anagram_groups["aet"]` now exists. Push "ate".
   - `anagram_groups["aet"]` becomes `{"eat", "tea", "ate"}`
   Map: { "aet": ["eat", "tea", "ate"], "ant": ["tan"] }

5. Process "nat":
   - Sort "nat" -> "ant"
   - `anagram_groups["ant"]` now exists. Push "nat".
   - `anagram_groups["ant"]` becomes `{"tan", "nat"}`
   Map: { "aet": ["eat", "tea", "ate"], "ant": ["tan", "nat"] }

6. Process "bat":
   - Sort "bat" -> "abt"
   - `anagram_groups["abt"]` becomes `{"bat"}`
   Map: { "aet": ["eat", "tea", "ate"], "ant": ["tan", "nat"], "abt": ["bat"] }

Collect results from map values:
Result:
[
  ["eat", "tea", "ate"],
  ["tan", "nat"],
  ["bat"]
]
(Order of groups and strings within groups may vary, but content is consistent)
```

---
```