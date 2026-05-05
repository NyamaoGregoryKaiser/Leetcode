# Hash Tables: A Deep Dive for Interview Preparation

Hash tables are one of the most fundamental and powerful data structures, offering highly efficient average-case performance for insertion, deletion, and lookup operations. They are a staple in coding interviews due to their versatility and ability to optimize solutions from `O(N^2)` or `O(N log N)` to `O(N)` or even `O(1)`.

## 1. What are Hash Tables?

A hash table (also known as a hash map or dictionary) is a data structure that implements an associative array abstract data type, a structure that can map keys to values. A hash table uses a **hash function** to compute an index into an array of buckets or slots, from which the desired value can be found.

**Key Characteristics:**
*   **Key-Value Pairs**: Stores data as pairs of (key, value).
*   **Direct Access (average)**: Aims for O(1) average time complexity for insertions, deletions, and lookups.
*   **Underlying Array**: Internally, a hash table uses an array (often called the "bucket array").
*   **Hash Function**: Maps keys to indices in the bucket array.
*   **Collision Resolution**: Handles cases where different keys map to the same index.

### ASCII Art: Basic Hash Table Structure

```
+----------------+
|    Key         |
+----------------+
      | hash_function()
      v
+----------------+
|    Index       |
+----------------+
      |
      v
+----------------+    +----------------+
| Bucket Array   |    | Linked List    |  (Collision Resolution: Chaining)
| Index 0:       |----| Key1 -> Value1 |
|                |    +----------------+
| Index 1:       |----| Key2 -> Value2 |
|                |    | Key3 -> Value3 |
| Index 2:       |----| Key4 -> Value4 |
|                |    +----------------+
| ...            |
| Index N-1:     |----| KeyX -> ValueX |
+----------------+    +----------------+
```

## 2. Core Components

### a. Hash Function
A hash function takes a key and converts it into a fixed-size integer, which is then used as an index in the internal array.
*   **Deterministic**: Must always produce the same hash value for the same key.
*   **Uniform Distribution**: Ideally, it should distribute keys as evenly as possible across the entire range of hash values to minimize collisions.
*   **Efficiency**: Should be fast to compute.

In C++, `std::unordered_map` and `std::unordered_set` use `std::hash` as their default hash function, which works well for built-in types like integers and strings. For custom objects, you might need to provide a custom hash function.

### b. Collision Resolution
A **collision** occurs when two different keys hash to the same index in the bucket array. There are two primary strategies to handle collisions:

1.  **Chaining (used by `std::unordered_map`/`std::unordered_set`):**
    *   Each bucket in the hash table array points to a linked list (or another data structure like a `std::vector`) of key-value pairs that hash to that index.
    *   When searching, the bucket is located, and then the linked list is traversed to find the desired key.
    *   **Pros**: Simple to implement, handles high load factors gracefully.
    *   **Cons**: Requires extra space for pointers, can lead to cache misses.

    ```
    Bucket Array
    Index 0: -> (K1, V1) -> (K5, V5) -> NULL
    Index 1: -> (K2, V2) -> NULL
    Index 2: -> (K3, V3) -> (K6, V6) -> (K9, V9) -> NULL
    ...
    ```

2.  **Open Addressing:**
    *   All key-value pairs are stored directly within the hash table array itself (no linked lists).
    *   When a collision occurs, the algorithm probes for an alternative empty slot in the array.
    *   Common probing strategies:
        *   **Linear Probing**: Check the next slot, then the next, etc. (e.g., `index + 1`, `index + 2`).
        *   **Quadratic Probing**: Check `index + 1^2`, `index + 2^2`, etc.
        *   **Double Hashing**: Use a second hash function to determine the step size for probing.
    *   **Pros**: Better cache performance (data is contiguous), no extra space for pointers.
    *   **Cons**: More complex deletion (must mark slots as "deleted"), sensitive to load factor, can suffer from clustering.

### c. Load Factor
The **load factor** of a hash table is the ratio of the number of elements (N) to the number of buckets (M): `Load Factor = N / M`.
*   A **low load factor** means more empty buckets, reducing collisions but wasting space.
*   A **high load factor** means more elements per bucket, increasing collisions and potentially degrading performance towards O(N) in worst-case scenarios for operations.
*   When the load factor exceeds a certain threshold (e.g., 0.7 or 1.0 for chaining), the hash table typically **rehashes** (resizes its internal array to a larger size and re-inserts all existing elements). This is an `O(N)` operation but happens infrequently, so the *amortized* average time complexity for insertions remains O(1).

## 3. `std::unordered_map` vs `std::unordered_set` vs `std::map`

### `std::unordered_map`
*   **Associative container**: Stores (key, value) pairs.
*   **Unordered**: Elements are not stored in any particular order (based on key values).
*   **Hash Table Implementation**: Uses a hash table internally.
*   **Average Time Complexity**: O(1) for insertion, deletion, lookup.
*   **Worst-Case Time Complexity**: O(N) if all keys hash to the same bucket (poor hash function or malicious input).
*   **Use Case**: When fast average-case lookups/insertions are critical, and element order doesn't matter.

### `std::unordered_set`
*   **Associative container**: Stores unique keys (no associated values).
*   **Unordered**: Elements are not stored in any particular order.
*   **Hash Table Implementation**: Uses a hash table internally.
*   **Average Time Complexity**: O(1) for insertion, deletion, lookup.
*   **Worst-Case Time Complexity**: O(N).
*   **Use Case**: When you need to quickly check for the presence of an element, or store a collection of unique items without particular order. (e.g., `containsDuplicate`, `longestConsecutive`).

### `std::map`
*   **Associative container**: Stores (key, value) pairs.
*   **Ordered**: Elements are stored in ascending order of keys.
*   **Balanced Binary Search Tree Implementation**: Typically implemented as a Red-Black Tree.
*   **Time Complexity**: O(log N) for insertion, deletion, lookup.
*   **Use Case**: When keys need to be stored and retrieved in a sorted order, or when worst-case performance guarantees are more important than average-case speed.

**Summary Comparison:**

| Feature          | `std::unordered_map`/`_set` | `std::map`/`_set`      |
| :--------------- | :-------------------------- | :--------------------- |
| Underlying Data  | Hash Table                  | Red-Black Tree         |
| Ordering         | No specific order           | Keys are sorted        |
| Lookup/Insert/Delete (Avg) | O(1)              | O(log N)               |
| Lookup/Insert/Delete (Worst) | O(N)              | O(log N)               |
| Memory Locality  | Poor (scattered buckets)    | Good (tree nodes linked) |
| Performance      | Faster on average           | Slower but consistent  |

## 4. Algorithm Explanations (Walk-through for Optimal Solutions)

Let's break down the optimal solutions presented in `src/main_problems.cpp`.

### Problem 1: Two Sum (`twoSum_Optimal`)

**Problem:** Find two numbers in an array that sum to a target, returning their indices.

**Algorithm:**
1.  Initialize an `unordered_map<int, int> num_map`. This map will store `(number -> index)` for numbers we've encountered so far.
2.  Iterate through the `nums` array with index `i` from `0` to `N-1`:
    a.  Let `current_num = nums[i]`.
    b.  Calculate the `complement = target - current_num`.
    c.  Check if `complement` exists as a key in `num_map`.
        *   If `num_map.count(complement)` is true, it means we've seen the `complement` before. We have found our pair! Return `{num_map[complement], i}`.
    d.  If `complement` is not in the map, add the `current_num` and its index `i` to the `num_map`: `num_map[current_num] = i`. This ensures `current_num` is available for future numbers to find their complement.
3.  The problem guarantees a solution, so the loop will always find and return a pair.

**ASCII Art Example: `nums = [2, 7, 11, 15]`, `target = 9`**

```
Initial: num_map = {}

i = 0, nums[0] = 2
  complement = 9 - 2 = 7
  7 not in num_map.
  Add (2, 0) to num_map.
  num_map = {2: 0}

i = 1, nums[1] = 7
  complement = 9 - 7 = 2
  2 IS in num_map! num_map[2] is 0.
  Found pair! Return [num_map[2], 1] = [0, 1].

Result: [0, 1]
```

**Complexity:**
*   Time: O(N) average, due to O(1) average hash map operations.
*   Space: O(N) in worst case (all elements inserted before finding a pair).

### Problem 2: Longest Consecutive Sequence (`longestConsecutive_Optimal`)

**Problem:** Find the length of the longest consecutive elements sequence in an unsorted array in O(N) time.

**Algorithm:**
1.  Handle edge case: if `nums` is empty, return 0.
2.  Insert all elements of `nums` into an `unordered_set<int> num_set`. This allows O(1) average time lookups.
3.  Initialize `longest_streak = 0`.
4.  Iterate through each `num` in the original `nums` array (or `num_set`):
    a.  **Crucial Optimization:** Check if `num - 1` exists in `num_set`.
        *   If `num_set.find(num - 1) != num_set.end()`, it means `num` is *not* the start of a consecutive sequence (it has a predecessor). We can skip this `num` because its sequence will be processed when its predecessor is encountered.
        *   If `num_set.find(num - 1) == num_set.end()`, it means `num` *is* the start of a potential consecutive sequence.
            *   Initialize `current_num = num` and `current_streak = 1`.
            *   Start extending the sequence: While `num_set.find(current_num + 1) != num_set.end()`:
                *   Increment `current_num`.
                *   Increment `current_streak`.
            *   Update `longest_streak = max(longest_streak, current_streak)`.
5.  Return `longest_streak`.

**ASCII Art Example: `nums = [100, 4, 200, 1, 3, 2]`**

```
1. num_set = {100, 4, 200, 1, 3, 2}
2. longest_streak = 0

Iterate num in nums:

num = 100:
  Is 99 in num_set? No. (100 is a sequence start)
  current_num = 100, current_streak = 1
  Is 101 in num_set? No.
  longest_streak = max(0, 1) = 1

num = 4:
  Is 3 in num_set? Yes. (4 is NOT a sequence start, it's part of [1,2,3,4])
  Skip.

num = 200:
  Is 199 in num_set? No. (200 is a sequence start)
  current_num = 200, current_streak = 1
  Is 201 in num_set? No.
  longest_streak = max(1, 1) = 1

num = 1:
  Is 0 in num_set? No. (1 is a sequence start)
  current_num = 1, current_streak = 1
  Is 2 in num_set? Yes. current_num = 2, current_streak = 2
  Is 3 in num_set? Yes. current_num = 3, current_streak = 3
  Is 4 in num_set? Yes. current_num = 4, current_streak = 4
  Is 5 in num_set? No.
  longest_streak = max(1, 4) = 4

num = 3:
  Is 2 in num_set? Yes. (3 is NOT a sequence start)
  Skip.

num = 2:
  Is 1 in num_set? Yes. (2 is NOT a sequence start)
  Skip.

Result: 4
```

**Complexity:**
*   Time: O(N) average. Each number is inserted into the set once (O(N)), and then for each number, it's checked if it's a sequence start once. If it is, the inner `while` loop runs. Importantly, the inner `while` loop only increments `current_num` and `current_streak` for numbers that are *not* sequence starts (i.e., `num+1, num+2,...`). Thus, each number is visited by the inner `while` loop at most once across all sequence checks. This amortizes to O(N).
*   Space: O(N) for the `unordered_set`.

### Problem 3: Group Anagrams (`groupAnagrams_Optimal`)

**Problem:** Group strings from an array that are anagrams of each other.

**Algorithm:**
1.  Initialize an `unordered_map<string, vector<string>> anagram_groups`. The key will be the canonical form of an anagram, and the value will be a list of original strings that produce that canonical form.
2.  For each `string s` in the input `strs` array:
    a.  Create a copy `key_str = s`.
    b.  Sort `key_str`: `std::sort(key_str.begin(), key_str.end())`. This `key_str` is now the canonical form (e.g., "eat", "tea", "ate" all become "aet").
    c.  Use this `key_str` to access the map. Add the *original* string `s` to the vector associated with `key_str`: `anagram_groups[key_str].push_back(s)`. If `key_str` doesn't exist, a new empty vector is default-constructed and `s` is pushed into it.
3.  After processing all strings, create a `vector<vector<string>> result`.
4.  Iterate through `anagram_groups` and add each `value` (the `vector<string>` of anagrams) to `result`.
5.  Return `result`.

**ASCII Art Example: `strs = ["eat", "tea", "tan", "ate", "nat", "bat"]`**

```
Initial: anagram_groups = {}

s = "eat":
  key_str = "aet"
  anagram_groups["aet"].push_back("eat")
  anagram_groups = {"aet": ["eat"]}

s = "tea":
  key_str = "aet"
  anagram_groups["aet"].push_back("tea")
  anagram_groups = {"aet": ["eat", "tea"]}

s = "tan":
  key_str = "ant"
  anagram_groups["ant"].push_back("tan")
  anagram_groups = {"aet": ["eat", "tea"], "ant": ["tan"]}

s = "ate":
  key_str = "aet"
  anagram_groups["aet"].push_back("ate")
  anagram_groups = {"aet": ["eat", "tea", "ate"], "ant": ["tan"]}

s = "nat":
  key_str = "ant"
  anagram_groups["ant"].push_back("nat")
  anagram_groups = {"aet": ["eat", "tea", "ate"], "ant": ["tan", "nat"]}

s = "bat":
  key_str = "abt"
  anagram_groups["abt"].push_back("bat")
  anagram_groups = {"aet": ["eat", "tea", "ate"], "ant": ["tan", "nat"], "abt": ["bat"]}

Collect results:
result = [ ["eat", "tea", "ate"], ["tan", "nat"], ["bat"] ] (order of inner/outer vectors might vary)
```

**Complexity:**
*   Time: O(N * M log M)
    *   N: number of strings.
    *   M: average length of a string.
    *   For each string, sorting takes `O(M log M)`. Hash map operations for `std::string` keys are `O(M)` in worst case (due to string comparison/hashing) but average `O(1)` amortized. The `M log M` dominates.
*   Space: O(N * M) in the worst case (all characters of all strings stored for keys and values).

### Problem 4: First Unique Character in a String (`firstUniqChar_Optimal`)

**Problem:** Find the index of the first non-repeating character in a string.

**Algorithm:**
1.  Initialize a `std::vector<int> char_counts(26, 0)`. This array acts as a frequency map for lowercase English letters ('a' through 'z'). `char_counts[0]` for 'a', `char_counts[1]` for 'b', etc.
2.  **First Pass (Frequency Counting):** Iterate through the input string `s`. For each character `c`, increment its count in `char_counts`: `char_counts[c - 'a']++`.
3.  **Second Pass (Find First Unique):** Iterate through the input string `s` again, this time with index `i`.
    a.  For each character `s[i]`, check its count in `char_counts`: `char_counts[s[i] - 'a']`.
    b.  If the count is `1`, it means this is the first occurrence of a character that only appears once in the entire string. Return its index `i`.
4.  If the loop completes without returning, it means no unique character was found. Return `-1`.

**Complexity:**
*   Time: O(N) where N is the length of the string. Two passes over the string. Constant time array access.
*   Space: O(1) because the size of the `char_counts` array is fixed at 26 (alphabet size), regardless of input string length.

### Problem 5: Contains Duplicate (`containsDuplicate_Optimal`)

**Problem:** Check if an array contains any duplicate values.

**Algorithm:**
1.  Initialize an `unordered_set<int> seen_numbers`. This set will store all unique numbers encountered so far.
2.  Iterate through each `num` in the input `nums` array:
    a.  Check if `num` is already present in `seen_numbers`: `seen_numbers.count(num)`.
        *   If `seen_numbers.count(num)` is true, a duplicate has been found. Return `true` immediately.
    b.  If `num` is not in the set, insert it: `seen_numbers.insert(num)`.
3.  If the loop completes without finding any duplicates, return `false`.

**Complexity:**
*   Time: O(N) average, due to O(1) average hash set operations.
*   Space: O(N) in worst case (all elements are unique and inserted into the set).

---
## 5. Visual Diagrams (ASCII Art)

### Basic Hash Table (Chaining)

```
Hash Function: H(key) -> index
Capacity: M buckets

+---+     +------------------+
| 0 | --> | (Key1, Val1) ->  | (Linked List/Vector)
+---+     +------------------+
| 1 | --> | (Key2, Val2) -> (Key3, Val3) -> |
+---+     +---------------------------------+
| 2 | --> | (Key4, Val4) ->  |
+---+     +------------------+
| ..|
+---+     +------------------+
|M-1| --> | (KeyX, ValX) ->  |
+---+     +------------------+

```

### `std::unordered_map` for Two Sum: `num_map = {val: index}`

```
Target = 9
nums = [2, 7, 11, 15]

Iteration 1: num = 2, index = 0
  complement = 7
  Is 7 in map? No.
  Add (2 -> 0)
  num_map:
  +-----+-----+
  | Key | Val |
  +-----+-----+
  |  2  |  0  |
  +-----+-----+

Iteration 2: num = 7, index = 1
  complement = 2
  Is 2 in map? Yes. Value is 0.
  Return [map[2], 1] = [0, 1]

Result: [0, 1]
```

### `std::unordered_set` for Longest Consecutive Sequence

```
nums = [100, 4, 200, 1, 3, 2]

1. Populate set:
   num_set = {100, 4, 200, 1, 3, 2}

2. Iterate through nums:

   - num = 100:
     Is 99 in set? No. -> Start of sequence [100]
     Extend: 101? No.
     Current streak = 1. Max streak = 1.

   - num = 4:
     Is 3 in set? Yes. -> Not a start. Skip.

   - num = 200:
     Is 199 in set? No. -> Start of sequence [200]
     Extend: 201? No.
     Current streak = 1. Max streak = 1.

   - num = 1:
     Is 0 in set? No. -> Start of sequence [1]
     Extend:
       2? Yes. -> [1,2]
       3? Yes. -> [1,2,3]
       4? Yes. -> [1,2,3,4]
       5? No.
     Current streak = 4. Max streak = 4.

   - num = 3:
     Is 2 in set? Yes. -> Not a start. Skip.

   - num = 2:
     Is 1 in set? Yes. -> Not a start. Skip.

Final Max Streak = 4
```

This concludes the deep dive into hash tables and the detailed walkthrough of the problems. The following documents will cover edge cases, gotchas, and interview tips.