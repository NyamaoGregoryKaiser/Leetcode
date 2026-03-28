```markdown
# Algorithms and Data Structures: Hash Tables Deep Dive

This document provides a detailed explanation of the custom `HashTable` implementation and the various problem solutions included in this project. It covers the logic, time/space complexity analysis, and visual aids (ASCII diagrams) where appropriate.

## 1. Custom Hash Table Implementation (`src/main.ts`)

Our custom `HashTable` class is a foundational component of this project, demonstrating the core principles of hash table design. It uses **separate chaining** to handle collisions and implements dynamic resizing.

### 1.1. Core Concepts

*   **Hashing Function**: A function that takes a key and returns an integer index (hash code) for the bucket array. A good hash function distributes keys uniformly.
*   **Collision Resolution**: When two different keys hash to the same index, a collision occurs. Separate chaining resolves this by storing a linked list (or other dynamic data structure) at each bucket index.
*   **Load Factor**: The ratio of the number of stored items to the number of buckets (`size / capacity`). When this ratio exceeds a certain threshold, the hash table is resized to maintain performance.
*   **Resizing**: When the load factor is too high, the hash table's capacity (number of buckets) is increased, and all existing items are rehashed into the new, larger set of buckets. This operation is `O(N)` where N is the number of items.

### 1.2. `HashTable<K, V>` Class Details

*   **`_buckets: SinglyLinkedList<[K, V]>[]`**: The underlying array of buckets. Each bucket is a `SinglyLinkedList` (from `src/utils.ts`) storing key-value pairs as tuples `[K, V]`.
*   **`_size: number`**: Tracks the number of key-value pairs currently in the table.
*   **`_capacity: number`**: The current number of buckets in the table.
*   **`_hashFunction: HashCodeFunction<K>`**: A user-definable function to convert a key into an integer hash code. Default implementations for `string` and `number` are provided in `src/utils.ts`.
*   **`_equalityFunction: EqualityFunction<K>`**: A user-definable function to compare two keys for equality. Essential for finding and deleting items within a collision chain. Defaults to strict equality `===`.

#### ASCII Diagram: Hash Table Structure with Separate Chaining

```
+--------------------+
|  HashTable Object  |
+--------------------+
| _size: 5           |
| _capacity: 8       |
| _buckets: [        |
|   0: null          |
|   1: [K1, V1] -> [K5, V5] -> null  (Linked List for collision)
|   2: [K2, V2] -> null
|   3: null          |
|   4: [K3, V3] -> null
|   5: null          |
|   6: null          |
|   7: [K4, V4] -> null
| ]                  |
+--------------------+
```

#### `set(key: K, value: V)`
1.  **Load Factor Check**: Before inserting, checks if `_size / _capacity` exceeds `DEFAULT_LOAD_FACTOR_THRESHOLD` (0.75). If so, it triggers `_resize()`.
2.  **Get Index**: Calculates the bucket index using `_getIndex(key)`.
3.  **Find in Bucket**: Iterates through the `SinglyLinkedList` at that index.
    *   If `key` is found (using `_equalityFunction`), its `value` is updated.
    *   If `key` is not found, a new `[key, value]` tuple is `prepend`ed to the `SinglyLinkedList` (O(1) insertion at head).
4.  **Increment Size**: If a new entry was added (not an update), `_size` is incremented.

*   **Time Complexity**:
    *   **Average**: O(1) - Assuming a good hash function and sufficient capacity, operations primarily involve calculating a hash and accessing a short linked list.
    *   **Worst Case**: O(N) - If all keys hash to the same bucket (poor hash function or adversarial input), the linked list becomes `N` elements long, degrading to a linear scan. Resizing itself is O(N).
*   **Space Complexity**: O(N) - Stores N key-value pairs.

#### `get(key: K)`
1.  **Get Index**: Calculates the bucket index using `_getIndex(key)`.
2.  **Find in Bucket**: Iterates through the `SinglyLinkedList` at that index.
    *   If `key` is found, its `value` is returned.
    *   If `key` is not found, `undefined` is returned.

*   **Time Complexity**:
    *   **Average**: O(1)
    *   **Worst Case**: O(N)
*   **Space Complexity**: O(1)

#### `delete(key: K)`
1.  **Get Index**: Calculates the bucket index.
2.  **Delete from Bucket**: Calls the `delete` method on the `SinglyLinkedList` for the given key.
3.  **Decrement Size**: If deletion was successful, `_size` is decremented.

*   **Time Complexity**:
    *   **Average**: O(1)
    *   **Worst Case**: O(N)
*   **Space Complexity**: O(1)

#### `_resize()`
1.  **Save Old Entries**: Retrieves all existing `[K, V]` entries.
2.  **Increase Capacity**: Doubles `_capacity`.
3.  **Initialize New Buckets**: Creates a new array of empty `SinglyLinkedLists` for the new capacity.
4.  **Rehash Entries**: Iterates through all saved old entries and calls `set(key, value)` for each, effectively re-distributing them into the new, larger set of buckets.

*   **Time Complexity**: O(N) - Must iterate through all N existing items and rehash them.
*   **Space Complexity**: O(N) - For storing the old entries temporarily and the new buckets.

## 2. Problem Solutions

### 2.1. Problem 1: Two Sum (`twoSum`)

**Problem Description**: Given an array `nums` and a `target`, find two indices `i`, `j` such that `nums[i] + nums[j] == target`.

#### Approach 1: Brute Force (`twoSumBruteForce` in `implementations/brute-force-problems.ts`)

*   **Logic**: Use nested loops to check every possible pair of numbers `(nums[i], nums[j])` where `j > i`.
*   **Time Complexity**: O(N^2) - For an array of N elements, there are N * (N-1) / 2 pairs.
*   **Space Complexity**: O(1) - No extra data structures used beyond output storage.

#### Approach 2: Optimal (Hash Map) (`twoSum` in `src/main.ts`)

*   **Logic**:
    1.  Initialize a `Map<number, number>` (or `HashTable`) to store `(number, index)` pairs.
    2.  Iterate through `nums` with index `i` and value `num = nums[i]`.
    3.  Calculate the `complement = target - num`.
    4.  Check if `complement` exists as a key in the map.
        *   If `map.has(complement)` is true, we found the pair! Return `[map.get(complement)!, i]`.
        *   If not, add the current `num` and its `i` to the map: `map.set(num, i)`.
*   **Time Complexity**: O(N)
    *   We iterate through the array once.
    *   Each `Map` operation (`has`, `get`, `set`) takes O(1) average time.
*   **Space Complexity**: O(N)
    *   In the worst case, all N numbers might be stored in the map before finding the solution.

#### ASCII Diagram: Two Sum with Hash Map

```
nums = [2, 7, 11, 15], target = 9

Iteration 1: num = 2, i = 0
  complement = 9 - 2 = 7
  Map: {}
  Map does NOT have 7.
  Add (2, 0) to Map. Map: {2: 0}

Iteration 2: num = 7, i = 1
  complement = 9 - 7 = 2
  Map: {2: 0}
  Map HAS 2!
  Return [Map.get(2), 1] -> [0, 1]
```

### 2.2. Problem 2: Longest Consecutive Sequence (`longestConsecutiveSequence`)

**Problem Description**: Find the length of the longest consecutive elements sequence in an unsorted array. Must be O(N).

#### Approach: Optimal (Hash Set) (`longestConsecutiveSequence` in `src/main.ts`)

*   **Logic**:
    1.  Convert the input array `nums` into a `Set<number>` for O(1) average time lookups.
    2.  Initialize `longestStreak = 0`.
    3.  Iterate through each `num` in the `Set`.
    4.  **Crucial Optimization**: For each `num`, check if `num - 1` is *not* in the set.
        *   If `num - 1` is *not* in the set, it means `num` is the potential start of a consecutive sequence.
        *   If `num - 1` *is* in the set, then `num` is part of a longer sequence that started earlier, so we can skip it.
    5.  If `num` is a sequence start:
        *   Initialize `currentNum = num` and `currentStreak = 1`.
        *   While `currentNum + 1` exists in the set:
            *   Increment `currentNum` and `currentStreak`.
        *   Update `longestStreak = Math.max(longestStreak, currentStreak)`.
*   **Time Complexity**: O(N)
    *   Populating the `Set` takes O(N).
    *   The outer loop iterates N times (for unique numbers).
    *   The inner `while` loop, despite appearing nested, only visits each number in `nums` at most a constant number of times *across all sequence checks*. This is because `num - 1` check ensures we only start counting from the true beginning of a sequence. Once a number is part of a `currentStreak` increment, it won't be revisited as a sequence start.
*   **Space Complexity**: O(N)
    *   To store all unique numbers in the `Set`.

#### ASCII Diagram: Longest Consecutive Sequence with Hash Set

```
nums = [100, 4, 200, 1, 3, 2]
numSet = {1, 2, 3, 4, 100, 200}
longestStreak = 0

Iterate through numSet:

1. num = 1:
   numSet.has(0)? No. -> 1 is a sequence start.
   currentNum = 1, currentStreak = 1
   numSet.has(2)? Yes. currentNum=2, currentStreak=2
   numSet.has(3)? Yes. currentNum=3, currentStreak=3
   numSet.has(4)? Yes. currentNum=4, currentStreak=4
   numSet.has(5)? No. Stop.
   longestStreak = max(0, 4) = 4

2. num = 2:
   numSet.has(1)? Yes. -> 2 is NOT a sequence start. Skip.

3. num = 3:
   numSet.has(2)? Yes. -> 3 is NOT a sequence start. Skip.

4. num = 4:
   numSet.has(3)? Yes. -> 4 is NOT a sequence start. Skip.

5. num = 100:
   numSet.has(99)? No. -> 100 is a sequence start.
   currentNum = 100, currentStreak = 1
   numSet.has(101)? No. Stop.
   longestStreak = max(4, 1) = 4

6. num = 200:
   numSet.has(199)? No. -> 200 is a sequence start.
   currentNum = 200, currentStreak = 1
   numSet.has(201)? No. Stop.
   longestStreak = max(4, 1) = 4

Result: 4
```

### 2.3. Problem 3: Group Anagrams (`groupAnagrams`)

**Problem Description**: Given an array of strings, group strings that are anagrams of each other.

#### Approach 1: Brute Force (`groupAnagramsBruteForce` in `implementations/brute-force-problems.ts`)

*   **Logic**:
    1.  Maintain a `visited` array to keep track of strings already grouped.
    2.  For each unvisited string `strs[i]`:
        *   Start a new group.
        *   Iterate through all subsequent unvisited strings `strs[j]`.
        *   For each `strs[j]`, check if it's an anagram of `strs[i]` (by sorting both strings and comparing).
        *   If they are anagrams, add `strs[j]` to the current group and mark it visited.
*   **Time Complexity**: O(N^2 * L log L)
    *   N nested loops (N * N comparisons).
    *   Each comparison involves sorting two strings of average length L, which is O(L log L).
*   **Space Complexity**: O(N * L) for storing results and `visited` array.

#### Approach 2: Optimal (Hash Map) (`groupAnagrams` in `src/main.ts`)

*   **Logic**:
    1.  Create a `Map<string, string[]>` (or `HashTable`). The key will be the *canonical form* of an anagram, and the value will be a list of original strings that are anagrams of each other.
    2.  Iterate through each string `s` in the input array.
    3.  Generate the canonical key for `s` by:
        *   Splitting `s` into characters.
        *   Sorting the characters.
        *   Joining them back into a string (e.g., "eat" -> "aet"). This is done by `getAnagramKey` from `src/utils.ts`.
    4.  Use this `key` to interact with the map:
        *   Retrieve the list of strings associated with `key` (or an empty list if not present).
        *   Add `s` to this list.
        *   Update the map with the `key` and the modified list.
    5.  Finally, collect all the values (the `string[]` arrays) from the map.
*   **Time Complexity**: O(N * L log L)
    *   N iterations for N strings.
    *   In each iteration, the dominant operation is sorting the string to generate the key, which takes O(L log L) for a string of length L.
    *   Map operations (get, set) are O(1) on average after key generation.
*   **Space Complexity**: O(N * L)
    *   In the worst case (no anagrams), the map stores N distinct keys, and each string of length L is stored once.

#### ASCII Diagram: Group Anagrams with Hash Map

```
strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
anagramMap = {}

1. s = "eat":
   key = "aet" (sorted "eat")
   anagramMap.get("aet") -> undefined
   new group = ["eat"]
   anagramMap = {"aet": ["eat"]}

2. s = "tea":
   key = "aet" (sorted "tea")
   anagramMap.get("aet") -> ["eat"]
   group.push("tea") -> ["eat", "tea"]
   anagramMap = {"aet": ["eat", "tea"]}

3. s = "tan":
   key = "ant" (sorted "tan")
   anagramMap.get("ant") -> undefined
   new group = ["tan"]
   anagramMap = {"aet": ["eat", "tea"], "ant": ["tan"]}

4. s = "ate":
   key = "aet" (sorted "ate")
   anagramMap.get("aet") -> ["eat", "tea"]
   group.push("ate") -> ["eat", "tea", "ate"]
   anagramMap = {"aet": ["eat", "tea", "ate"], "ant": ["tan"]}

5. s = "nat":
   key = "ant" (sorted "nat")
   anagramMap.get("ant") -> ["tan"]
   group.push("nat") -> ["tan", "nat"]
   anagramMap = {"aet": ["eat", "tea", "ate"], "ant": ["tan", "nat"]}

6. s = "bat":
   key = "abt" (sorted "bat")
   anagramMap.get("abt") -> undefined
   new group = ["bat"]
   anagramMap = {"aet": ["eat", "tea", "ate"], "ant": ["tan", "nat"], "abt": ["bat"]}

Result: values of anagramMap
[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]] (order may vary)
```

### 2.4. Problem 4: Contains Duplicate (`containsDuplicate`)

**Problem Description**: Given an integer array `nums`, return `true` if any value appears at least twice, `false` if all elements are distinct.

#### Approach 1: Brute Force (`containsDuplicateBruteForce` in `implementations/brute-force-problems.ts`)

*   **Logic**: Use nested loops. For each `nums[i]`, iterate through `nums[j]` where `j > i` and check if `nums[i] === nums[j]`.
*   **Time Complexity**: O(N^2)
*   **Space Complexity**: O(1)

#### Approach 2: Optimal (Hash Set) (`containsDuplicate` in `src/main.ts`)

*   **Logic**:
    1.  Initialize an empty `Set<number>` to store numbers encountered so far.
    2.  Iterate through each `num` in the input array `nums`.
    3.  For each `num`:
        *   Check if `seenNumbers.has(num)`. If true, a duplicate exists, so return `true`.
        *   If false, add `num` to `seenNumbers`: `seenNumbers.add(num)`.
    4.  If the loop completes without returning `true`, no duplicates were found, so return `false`.
*   **Time Complexity**: O(N)
    *   We iterate through the array once.
    *   Each `Set` operation (`has`, `add`) takes O(1) average time.
*   **Space Complexity**: O(N)
    *   In the worst case (no duplicates), all N numbers will be stored in the `Set`.

#### ASCII Diagram: Contains Duplicate with Hash Set

```
nums = [1, 2, 3, 1]
seenNumbers = {}

1. num = 1:
   seenNumbers.has(1)? No.
   seenNumbers.add(1). seenNumbers = {1}

2. num = 2:
   seenNumbers.has(2)? No.
   seenNumbers.add(2). seenNumbers = {1, 2}

3. num = 3:
   seenNumbers.has(3)? No.
   seenNumbers.add(3). seenNumbers = {1, 2, 3}

4. num = 1:
   seenNumbers.has(1)? Yes!
   Return true.
```
```
nums = [1, 2, 3, 4]
seenNumbers = {}

1. num = 1: seenNumbers = {1}
2. num = 2: seenNumbers = {1, 2}
3. num = 3: seenNumbers = {1, 2, 3}
4. num = 4: seenNumbers = {1, 2, 3, 4}

Loop ends. No duplicates found.
Return false.
```
```