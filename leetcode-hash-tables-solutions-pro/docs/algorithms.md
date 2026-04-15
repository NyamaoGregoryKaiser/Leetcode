```markdown
# 📚 Algorithm Explanations

This document provides detailed explanations for each problem, including problem statements, different approaches (where applicable), step-by-step logic, and time/space complexity analysis.

---

## 1. Two Sum

### Problem Statement

Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.

**Example:**
`nums = [2, 7, 11, 15]`, `target = 9`
Output: `[0, 1]` (because `nums[0] + nums[1] == 9`)

---

### Approach 1: Brute Force (Nested Loops)

#### Description
The most straightforward way to solve this is to check every possible pair of numbers in the array.

#### Steps
1.  Use an outer loop to iterate from the first element up to the second-to-last element (index `i`).
2.  Use an inner loop to iterate from the element *after* the current outer loop element (index `j = i + 1`) up to the last element. This ensures that we don't use the same element twice and avoid redundant pairs (e.g., checking `(nums[0], nums[1])` and then `(nums[1], nums[0])`).
3.  Inside the inner loop, check if `nums[i] + nums[j]` equals `target`.
4.  If they do, return `[i, j]`.
5.  If the loops complete without finding a pair, return an empty array (though problem constraints guarantee a solution).

#### Time Complexity
*   **O(N^2)**: The nested loops result in N * (N-1) / 2 comparisons in the worst case, which simplifies to quadratic time complexity.

#### Space Complexity
*   **O(1)**: Only a few variables are used for loop indices and comparison, requiring constant extra space.

---

### Approach 2: Optimal Solution (Hash Map)

#### Description
This approach leverages a Hash Map (or `Map` in JavaScript/TypeScript) to drastically reduce the lookup time for the complement number.

#### Steps
1.  Initialize an empty hash map. The map will store `(number: index)` pairs.
2.  Iterate through the `nums` array using an index `i` from 0 to `nums.length - 1`.
3.  For each `currentNum = nums[i]`:
    a.  Calculate the `complement` needed to reach the `target`: `complement = target - currentNum`.
    b.  Check if this `complement` already exists as a key in the hash map.
        *   If `map.has(complement)` is true, it means we have found the two numbers. The `complement` was encountered earlier at `map.get(complement)` and the `currentNum` is at index `i`. Return `[map.get(complement), i]`.
        *   If `map.has(complement)` is false, it means the `complement` has not been seen yet. In this case, add the `currentNum` and its index `i` to the hash map (`map.set(currentNum, i)`). This makes `currentNum` available as a `complement` for future numbers.
4.  Per problem constraints, a solution is guaranteed, so the loop will always find a pair and return.

#### Why Hash Tables are suitable
Hash tables provide average O(1) time complexity for insertions and lookups. This allows us to check for the existence of a `complement` in constant time, leading to an overall linear time solution.

#### Time Complexity
*   **O(N)**: We iterate through the array once. Each hash map operation (insertion and lookup) takes O(1) time on average.

#### Space Complexity
*   **O(N)**: In the worst case, if no pair sums to the target until the last element, we might store all N numbers and their indices in the hash map.

---

## 2. Longest Consecutive Sequence

### Problem Statement

Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(N) time.

**Example:**
`nums = [100, 4, 200, 1, 3, 2]`
Output: `4` (The longest consecutive sequence is `[1, 2, 3, 4]`)

---

### Approach 1: Sorting (Suboptimal for O(N) constraint)

#### Description
A simpler approach is to sort the array first, which brings consecutive numbers adjacent to each other. Then, iterate through the sorted array to find the longest sequence.

#### Steps
1.  Handle edge cases: If the array is empty, return 0.
2.  Sort the input array `nums`.
3.  Initialize `longestStreak = 0` and `currentStreak = 0`.
4.  Iterate through the sorted array:
    a.  If the current number is the same as the previous number, skip it (handle duplicates).
    b.  If the current number is `previousNumber + 1`, increment `currentStreak`.
    c.  Otherwise (a gap is found or it's the start of a new sequence), reset `currentStreak = 1`.
    d.  Update `longestStreak = Math.max(longestStreak, currentStreak)`.
5.  Return `longestStreak`.

#### Time Complexity
*   **O(N log N)**: Dominated by the sorting step.

#### Space Complexity
*   **O(1)** or **O(N)**: Depends on the sorting algorithm used. In-place sorts are O(1) auxiliary space, but some language-specific sorts (like JavaScript's `sort()`) might use O(N) space.

---

### Approach 2: Optimal Solution (Hash Set)

#### Description
To achieve O(N) time complexity, we need to avoid sorting. A Hash Set (or `Set` in JavaScript/TypeScript) provides O(1) average time lookups, which is key. The trick is to efficiently determine if a number is the *start* of a sequence and then extend that sequence.

#### Steps
1.  **Preprocessing:** Create a Hash Set and add all numbers from the input array `nums` into it. This allows for O(1) average time checks for the existence of any number. Handle the empty array edge case by returning 0 if `nums.length` is 0.
2.  Initialize `longestStreak = 0`.
3.  Iterate through each `num` in the `numSet`.
4.  **Check for potential start of a sequence:** For each `num`, check if `num - 1` exists in the `numSet`.
    *   If `numSet.has(num - 1)` is `true`, it means `num` is *not* the start of a sequence (it's part of a longer sequence that begins with `num - 1` or earlier). We can skip `num` and let the process for `num - 1` handle the full sequence.
    *   If `numSet.has(num - 1)` is `false`, it means `num` *is* the potential start of a new consecutive sequence.
        a.  Initialize `currentNum = num` and `currentStreak = 1`.
        b.  Start an inner `while` loop: While `numSet.has(currentNum + 1)` is `true`:
            *   Increment `currentNum`.
            *   Increment `currentStreak`.
        c.  After the inner loop finishes (meaning `currentNum + 1` is not in the set, thus the sequence ends), update `longestStreak = Math.max(longestStreak, currentStreak)`.
5.  Return `longestStreak`.

#### Why Hash Tables are suitable
The hash set is crucial for two reasons:
*   **O(1) existence checks:** Quickly determine if a number `N` or `N-1` or `N+1` is present in the collection.
*   **Efficiently identifying sequence starts:** By only processing numbers where `num - 1` is *not* in the set, we ensure that each consecutive sequence is processed exactly once from its true starting point. This avoids redundant checks and keeps the overall time complexity linear.

#### Time Complexity
*   **O(N)**:
    *   Populating the hash set takes O(N).
    *   The outer loop iterates through each unique number in the `numSet` (at most N times).
    *   The inner `while` loop (extending the `currentStreak`) might seem like it could lead to N^2, but each number in the array is visited by the inner `while` loop at most once *across all iterations of the outer loop*. Once a number is part of a sequence, it's effectively "consumed." Therefore, the total work done by the inner `while` loops over the entire algorithm is also O(N).

#### Space Complexity
*   **O(N)**: To store all numbers in the hash set.

---

## 3. LRU Cache

### Problem Statement

Design and implement a Least Recently Used (LRU) cache.

The `LRUCache` class should support two operations: `get` and `put`.

*   `get(key)`: Get the value of the `key` if the `key` exists in the cache, otherwise return -1. If the key is found, it's considered recently used and should be moved to the front of the cache.
*   `put(key, value)`: Update the value of the `key` if the `key` exists. Otherwise, add the `key-value` pair to the cache. When the number of keys exceeds the `capacity` from this operation, evict the least recently used key.

Both `get` and `put` operations must run in O(1) average time complexity.

---

### Approach: Hash Map + Doubly Linked List

#### Description
To achieve O(1) for both `get` and `put` operations, we need a data structure that provides fast lookups *and* fast reordering based on usage. A combination of a Hash Map and a Doubly Linked List is the standard optimal solution.

#### Data Structures Used
1.  **`cacheMap` (Hash Map): `Map<key, NodeReference>`**
    *   **Purpose:** Provides O(1) average time complexity for checking if a `key` exists and for retrieving its associated `value`. Crucially, it stores a *reference* to the corresponding node in the Doubly Linked List. This reference is what allows O(1) deletion and reordering within the linked list.
    *   **Key:** The cache key (e.g., `number`).
    *   **Value:** A direct reference (`pointer`) to the `DoublyLinkedListNode` that holds the actual `key-value` pair.

2.  **`lruList` (Doubly Linked List): `DoublyLinkedList<value>`**
    *   **Purpose:** Maintains the order of usage of items.
        *   The **Head** of the list represents the **Most Recently Used (MRU)** item.
        *   The **Tail** of the list represents the **Least Recently Used (LRU)** item.
    *   **Operations (all O(1)):**
        *   `addHead(key, value)`: Adds a new node to the MRU end.
        *   `removeNode(node)`: Removes a specific node from anywhere in the list (given its reference).
        *   `removeTail()`: Removes the LRU node.
        *   `moveToHead(node)`: Moves an existing node to the MRU end.

#### `LRUNode` Structure (within `DoublyLinkedList.ts` and `types.ts`)
Each node in the doubly linked list will store:
*   `key`: The original cache key (needed when evicting from the tail to update the `cacheMap`).
*   `value`: The actual data associated with the key.
*   `prev`: Reference to the previous node.
*   `next`: Reference to the next node.

#### Operations Implementation

##### `get(key)`
1.  **Check existence:** Use `cacheMap.has(key)` to quickly determine if the key is in the cache.
    *   If `false`, return -1.
2.  **Retrieve & Update Usage:** If `true`:
    a.  Get the node reference from `cacheMap`: `const node = cacheMap.get(key)!;`
    b.  Mark this node as most recently used: Call `lruList.moveToHead(node)`. This involves removing the node from its current position and re-adding it to the head of the list.
    c.  Return the `node.value`.

##### `put(key, value)`
1.  **Key exists?** Use `cacheMap.has(key)`.
    *   If `true`:
        a.  Get the existing `node` reference from `cacheMap`.
        b.  Update its `node.value = value`.
        c.  Mark this node as most recently used: Call `lruList.moveToHead(node)`.
    *   If `false` (new key):
        a.  **Check capacity:** If `lruList.size >= capacity`:
            i.  Evict the LRU item: Call `const tailNode = lruList.removeTail()`.
            ii. Remove the evicted key from `cacheMap`: `cacheMap.delete(tailNode.key)`.
        b.  **Add new item:**
            i.  Create a new node for the `(key, value)` pair: `const newNode = lruList.addHead(key, value)`.
            ii. Add the new key to `cacheMap`, pointing to the `newNode`: `cacheMap.set(key, newNode)`.

#### Why Hash Tables are suitable
The Hash Map is fundamental for the O(1) `get` and `put` operations. Without it, finding an element to update its position in the linked list or to retrieve its value would require traversing the list, making operations O(N). By storing direct references to list nodes, the hash map effectively "bridges" the O(1) access property of hash tables with the ordered, O(1) insertion/deletion property of doubly linked lists.

#### Time Complexity
*   **`get(key)`: O(1) average**
    *   `Map.has()`: O(1) average.
    *   `Map.get()`: O(1) average.
    *   `DoublyLinkedList.moveToHead()`: O(1) (requires O(1) removal and O(1) insertion).
*   **`put(key, value)`: O(1) average**
    *   `Map.has()`, `Map.get()`, `Map.set()`, `Map.delete()`: All O(1) average.
    *   `DoublyLinkedList.addHead()`, `DoublyLinkedList.removeTail()`, `DoublyLinkedList.moveToHead()`: All O(1).

#### Space Complexity
*   **O(Capacity)**: Both the `cacheMap` and `lruList` store at most `capacity` elements.

---

## 4. Group Anagrams

### Problem Statement

Given an array of strings `strs`, group the anagrams together. You can return the answer in any order. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Example:**
`strs = ["eat", "tea", "tan", "ate", "nat", "bat"]`
Output: `[["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]` (order of groups and strings within groups may vary)

---

### Approach: Optimal Solution (Hash Map with Canonical Key)

#### Description
The key insight here is that anagrams are essentially permutations of the same set of characters. Therefore, if we can find a "canonical" representation for each string that is identical for all its anagrams, we can use this canonical form as a key in a hash map to group them.

#### Steps
1.  Initialize an empty hash map. This map will store:
    *   **Key:** The canonical form of a string.
    *   **Value:** An array (list) of strings that are anagrams and share this canonical form.
2.  Iterate through each `str` in the input array `strs`.
3.  For each `str`, generate its unique **canonical key**:
    *   The most common and straightforward method is to convert the string into a character array, sort the array alphabetically, and then join the characters back into a string.
        *   Example:
            *   "eat" -> `['e', 'a', 't']` -> sort -> `['a', 'e', 't']` -> join -> `"aet"`
            *   "tea" -> `['t', 'e', 'a']` -> sort -> `['a', 'e', 't']` -> join -> `"aet"`
            *   "ate" -> `['a', 't', 'e']` -> sort -> `['a', 'e', 't']` -> join -> `"aet"`
    *   *(Alternative key generation: Frequency Count String)* Another method is to count the occurrences of each character (e.g., using an array of size 26 for lowercase English letters), then convert this frequency array into a unique string. For example, `[1, 0, 1, 0, ..., 1]` for "eat" could become `"1#0#1#...#1"`. This avoids sorting, which might be faster for very long strings, but is often more complex to implement than simple string sorting. For typical interview constraints, sorting is fine.
4.  Use this generated `key` to interact with the hash map:
    *   If `anagramGroups.has(key)` is `false`, it means this is the first time we've encountered an anagram group with this `key`. Create a new empty array for it: `anagramGroups.set(key, [])`.
    *   Add the original `str` to the array associated with the `key`: `anagramGroups.get(key)!.push(str)`.
5.  After iterating through all strings in `strs`, the `anagramGroups` map will contain all the grouped anagrams. Extract all the value arrays from the map and return them as a `string[][]`.

#### Why Hash Tables are suitable
Hash tables are ideal here because they allow for:
*   **Efficient Grouping:** By using the canonical form of an anagram as the key, all anagrams map to the same key. The hash map then directly gives us the group to which the current string belongs (or allows us to start a new group).
*   **O(1) Average Lookup/Insertion:** Retrieving or inserting a list of strings associated with a key takes O(1) on average.

#### Time Complexity
*   **O(N * M log M)**:
    *   `N` is the number of strings in the input array `strs`.
    *   `M` is the average length of a string in `strs`.
    *   For each of the `N` strings, we perform:
        *   `str.split('')`: O(M)
        *   `.sort()`: O(M log M) (for a string of length M)
        *   `.join('')`: O(M)
    *   Hash map operations (`has`, `get`, `set`): O(1) on average for string keys, though in worst-case with poor hash functions or very long keys, it could be O(M).
    *   The dominant factor is `M log M` for sorting each string. So, the total time complexity is O(N * M log M).
*   If using the frequency count array method, the key generation is O(M + `alphabet_size`), which simplifies to O(M) as `alphabet_size` is constant (26 for lowercase English). In that case, the total time complexity would be **O(N * M)**.

#### Space Complexity
*   **O(N * M)**:
    *   In the worst case, all strings could be unique (no anagrams). The hash map would then store `N` keys, each being an `M`-length sorted string, and `N` value arrays, each containing one `M`-length original string. This sums up to O(N * M) space for storing the keys and the strings themselves.
    *   Intermediate arrays/strings for key generation also take O(M) space.
```