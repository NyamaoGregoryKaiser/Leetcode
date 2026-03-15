# Hash Table Algorithms: Concepts and Deep Dive

This document provides a deeper understanding of Hash Tables, their internal workings, and detailed explanations of the algorithms implemented in this project.

## 1. Introduction to Hash Tables

A **Hash Table** (also known as a Hash Map, Dictionary, or Associative Array) is a data structure that implements an associative array abstract data type, a structure that can map keys to values. A hash table uses a hash function to compute an index, also called a hash code or hash, into an array of buckets or slots, from which the desired value can be found.

**Key Features:**
*   **Fast Lookups:** On average, hash tables provide O(1) time complexity for insertions, deletions, and retrievals.
*   **Key-Value Pairs:** Stores data as pairs of (key, value). Keys must be hashable.
*   **Underlying Array:** Internally, hash tables use an array to store data.
*   **Hash Function:** A critical component that maps keys to array indices.

### How it Works (High-Level):

1.  **Hash Function:** When you want to store a (key, value) pair, the key is passed to a hash function. This function computes an integer, the hash value.
2.  **Bucket Mapping:** The hash value is then typically modulated by the size of the internal array to get an index (bucket number) within the array.
    `index = hash_function(key) % array_size`
3.  **Storage:** The (key, value) pair is stored in the bucket at the calculated index.
4.  **Retrieval:** To retrieve a value, the same hash function is applied to the key, leading to the same index. The value can then be retrieved from that bucket.

## 2. Hash Table Core Concepts

### 2.1. Hash Function
A good hash function is crucial for hash table performance. It should:
*   Be **deterministic**: The same key must always produce the same hash value.
*   Be **efficient** to compute.
*   Distribute keys **uniformly** across the hash table's buckets to minimize collisions.

**Python's `dict` Hash Function:**
Python's built-in `hash()` function is used for objects in `dict` keys and `set` elements.
*   For immutable types like integers, strings, and tuples, `hash()` returns a hash value.
*   For custom objects, you can implement the `__hash__` method.
*   Mutable objects (like lists, dictionaries, sets) are unhashable by default because their hash value could change, making them impossible to retrieve once stored.

### 2.2. Collisions and Collision Resolution
A **collision** occurs when two different keys hash to the same index in the array. Since two distinct keys can't occupy the same array slot, collision resolution strategies are needed.

Common strategies:
*   **Chaining (Separate Chaining):** Each array slot points to a linked list (or another data structure like a balanced tree if many collisions) of key-value pairs that hash to that index.
    *   **Pros:** Simple to implement, table never truly "full," less sensitive to hash function quality.
    *   **Cons:** Requires extra space for pointers, potentially slower access if linked lists become long.
    *   **Python's `dict` uses a variation of open addressing, not chaining directly for its primary storage, but a combination of techniques for optimized memory layout and cache performance.**

    ```
    +-----------------+
    | Bucket 0: [K1,V1] -> [K5,V5]
    +-----------------+
    | Bucket 1: [K2,V2]
    +-----------------+
    | Bucket 2: [K3,V3] -> [K6,V6] -> [K9,V9]
    +-----------------+
    | ...             |
    +-----------------+
    ```

*   **Open Addressing (Probing):** When a collision occurs, the system probes (searches) for another empty slot in the array.
    *   **Linear Probing:** Searches sequentially `(index + 1) % array_size`, `(index + 2) % array_size`, etc.
        *   **Problem:** Can lead to **primary clustering** (long runs of occupied slots), slowing down performance.
    *   **Quadratic Probing:** Searches `(index + 1^2) % array_size`, `(index + 2^2) % array_size`, etc.
        *   **Problem:** Can lead to **secondary clustering**.
    *   **Double Hashing:** Uses a second hash function to determine the step size for probing.
        *   **Pros:** Good distribution, avoids clustering issues effectively.
        *   **Cons:** More complex hash function logic.

### 2.3. Load Factor and Resizing
The **load factor** (`α`) of a hash table is the ratio of the number of items stored (`n`) to the number of buckets (`m`): `α = n / m`.
*   A high load factor increases the probability of collisions, degrading performance.
*   To maintain O(1) average time complexity, hash tables usually **resize** (or rehash) when the load factor exceeds a certain threshold (e.g., 0.7 or 0.75).
*   **Resizing** involves creating a new, larger array (e.g., double the size) and re-inserting all existing key-value pairs into the new array using the new `array_size` for modulo operations. This is an O(N) operation, but amortized over many insertions, it results in O(1) average.

## 3. Algorithm Explanations

### 3.1. Two Sum
**Concept:** Utilize a hash map to quickly check for the existence of a required "complement" number. If `num1 + num2 = target`, then `num2 = target - num1`. As we iterate through numbers, we store `num: index` in the hash map. For each `num`, we check if `target - num` is already in the map.

**Why Hash Map is Optimal:**
*   Brute-force: O(N^2) time to check all pairs.
*   Sorting + Two Pointers: O(N log N) time for sorting, O(N) for two pointers. This is good but not O(N) if sorting is included.
*   Hash Map: O(N) time (one pass), O(N) space. Each lookup/insertion is O(1) on average.

### 3.2. Group Anagrams
**Concept:** Anagrams have the same characters with the same counts. A unique "canonical form" for anagrams can be used as a hash map key to group them.

**Two Optimal Approaches:**
1.  **Sorted String as Key:**
    *   For each string `s`, sort it to get `sorted(s)` (e.g., "eat" -> "aet").
    *   Use this sorted string as the key in a hash map. The value is a list of all original strings that map to this key.
    *   Time: O(N * K log K) where N is number of strings, K is max string length. (K log K for sorting each string).
    *   Space: O(N * K) to store all strings and their sorted keys.

    ```
    Input: ["eat", "tea", "tan", "ate", "nat", "bat"]

    1. "eat" -> "aet" : groups["aet"] = ["eat"]
    2. "tea" -> "aet" : groups["aet"] = ["eat", "tea"]
    3. "tan" -> "ant" : groups["ant"] = ["tan"]
    4. "ate" -> "aet" : groups["aet"] = ["eat", "tea", "ate"]
    5. "nat" -> "ant" : groups["ant"] = ["tan", "nat"]
    6. "bat" -> "abt" : groups["abt"] = ["bat"]

    Result: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
    ```

2.  **Character Count Tuple as Key:**
    *   For each string `s`, create a frequency array/tuple of 26 integers (for 'a' through 'z').
    *   Use this tuple as the key in a hash map.
    *   Time: O(N * K) where N is number of strings, K is max string length. (K for counting chars, 26 for tuple creation). This is faster if K log K > K.
    *   Space: O(N * K) for strings, plus O(N * 26) for keys (which is O(N) effectively as 26 is constant).

### 3.3. Longest Consecutive Sequence
**Concept:** Find the longest sequence of consecutive integers in an unsorted array. A hash set is used to efficiently check for number existence. The key insight is to only start counting a sequence if the current number `n` is the *beginning* of a sequence (i.e., `n-1` is not present in the set).

**Algorithm:**
1.  Put all numbers into a `HashSet` (Python `set`) for O(1) average lookups.
2.  Initialize `longest_streak = 0`.
3.  Iterate through each `num` in the original array (or the set itself).
4.  **Crucial Check:** If `num - 1` is *not* in the set, then `num` is a potential start of a consecutive sequence.
    *   Start `current_num = num` and `current_streak = 1`.
    *   While `current_num + 1` *is* in the set, increment `current_num` and `current_streak`.
    *   Update `longest_streak = max(longest_streak, current_streak)`.
5.  If `num - 1` *is* in the set, it means `num` is part of a sequence that started earlier. We skip it to avoid redundant calculations, ensuring O(N) overall.

**Time Complexity: O(N)** (average)
Each number is visited:
*   Once for insertion into the set.
*   At most once as a `num` in the outer loop check `if num - 1 not in num_set:`.
*   At most once as `current_num + 1` in the inner `while` loop across all sequences.
This amortized traversal makes it O(N).

**Space Complexity: O(N)** for the hash set.

### 3.4. Subarray Sum Equals K
**Concept:** Find the number of contiguous subarrays whose sum is `k`. This uses the prefix sum technique combined with a hash map to store frequencies of prefix sums.

**Prefix Sum Definition:** `P[i] = nums[0] + ... + nums[i-1]`.
Therefore, `sum(nums[i...j-1]) = P[j] - P[i]`.
We are looking for `sum(nums[i...j-1]) = k`, which means `P[j] - P[i] = k`, or `P[i] = P[j] - k`.

**Algorithm:**
1.  Initialize `count = 0` (for subarrays that sum to `k`).
2.  Initialize `current_sum = 0`.
3.  Initialize a `prefix_sum_counts` hash map (Python `dict`). Store `{0: 1}` initially. This handles cases where a subarray *starting from index 0* sums to `k`. (Effectively, `P[j] - P[0] = k` where `P[0]` is considered 0).
4.  Iterate through `num` in `nums`:
    *   Update `current_sum += num`. (`current_sum` acts as `P[j]`)
    *   Check `prefix_sum_counts` for `current_sum - k`. If this value `(P[i])` exists, it means we found `prefix_sum_counts[current_sum - k]` subarrays ending at the current position whose sum is `k`. Add this count to `total_count`.
    *   Increment the frequency of `current_sum` in `prefix_sum_counts`.

**Time Complexity: O(N)** (average)
One pass through the array. Each hash map operation is O(1) average.

**Space Complexity: O(N)** for the `prefix_sum_counts` hash map.

### 3.5. LFU Cache (Least Frequently Used)
**Concept:** A cache that evicts the item with the lowest frequency. If there's a tie in frequency, the least recently used (LRU) item among them is evicted.

**Data Structure Design (Complex Hash Table Application):**
To achieve O(1) for `get` and `put`, we need efficient ways to:
1.  Access a key's value and its frequency.
2.  Update a key's frequency and its position in its frequency group.
3.  Find the minimum frequency.
4.  Find the LRU item within the minimum frequency group.

This requires a combination of hash maps and doubly linked lists:

*   **`key_to_node: Dict[int, DoublyLinkedNode]`**: Maps a `key` to its corresponding `DoublyLinkedNode` object. This node stores the `key`, `value`, and its `frequency`. This allows O(1) access to any item in the cache.

*   **`freq_to_dll: Dict[int, DoublyLinkedList]`**: Maps a `frequency` (e.g., 1, 2, 3...) to a `DoublyLinkedList`. Each DLL in this map holds all `DoublyLinkedNode`s that currently have that exact frequency. The DLL itself is ordered by recency of use (MRU at head, LRU at tail).

*   **`min_freq: int`**: An integer variable tracking the smallest frequency value currently present in *any* item within the cache. This is vital for finding which DLL to evict from.

**ASCII Diagram of LFU Cache Structure:**

```
                                            min_freq = 1
                                            (or 2, or 3...)
        key_to_node Hash Map                  freq_to_dll Hash Map
     +-------------------+                 +--------------------------------+
     | key: Node object  |                 | freq: DoublyLinkedList object  |
     +-------------------+                 +--------------------------------+
     | 1: Node(1, val1, 2) ------->        | 1: DoublyLinkedList_1          |
     | 2: Node(2, val2, 1) ------->        |      (Nodes with freq 1, MRU->LRU)
     | 3: Node(3, val3, 2) ------->        |      Head <-> Node(2,val2,1) <-> Tail
     | ...               |                 | 2: DoublyLinkedList_2          |
     +-------------------+                 |      (Nodes with freq 2, MRU->LRU)
                                           |      Head <-> Node(3,val3,2) <-> Node(1,val1,2) <-> Tail
                                           | 3: DoublyLinkedList_3          |
                                           |      (Nodes with freq 3, MRU->LRU)
                                           |      Head <-> ... <-> Tail
                                           +--------------------------------+
```

**Operations Explained:**

*   **`_update_frequency(node)`**:
    1.  Remove `node` from `freq_to_dll[old_freq]`.
    2.  If `freq_to_dll[old_freq]` becomes empty AND `old_freq == min_freq`, then `min_freq` becomes `old_freq + 1`.
    3.  Increment `node.freq`.
    4.  Add `node` to the head of `freq_to_dll[new_freq]` (as it's now MRU for this frequency).

*   **`get(key)`**:
    1.  If `key` not in `key_to_node`, return -1.
    2.  Retrieve `node = key_to_node[key]`.
    3.  Call `_update_frequency(node)`.
    4.  Return `node.value`.

*   **`put(key, value)`**:
    1.  Handle `capacity == 0` edge case.
    2.  If `key` exists:
        *   Update `node.value = value`.
        *   Call `_update_frequency(node)`.
    3.  If `key` is new:
        *   If `size == capacity`:
            *   Evict LFU item: Remove the `tail` node from `freq_to_dll[min_freq]`.
            *   Remove this evicted node from `key_to_node`.
            *   Decrement `size`.
        *   Create `new_node = DoublyLinkedNode(key, value, freq=1)`.
        *   Add `new_node` to `key_to_node`.
        *   Add `new_node` to the head of `freq_to_dll[1]`.
        *   Increment `size`.
        *   Set `min_freq = 1` (a new item always starts with freq 1, so 1 is the new minimum freq).

This elaborate structure ensures O(1) operations by using hash maps for direct access and doubly linked lists for maintaining order within frequency groups and efficient eviction.

## 4. Hash Table in Python (`dict` and `set`)

Python's `dict` (and `set`, which is a dict without values) is a highly optimized hash table implementation.
*   **Implementation:** CPython's `dict` is an implementation of **open addressing** with **Robin Hood hashing** (a sophisticated variant of probing) and carefully tuned resizing. It is not a simple chaining implementation.
*   **Performance:** Generally provides excellent average-case O(1) performance.
*   **Worst Case:** In rare, contrived scenarios (e.g., hash collision attacks), performance can degrade to O(N). Python 3.3+ uses a randomized hash seed to mitigate these attacks.
*   **Key Requirements:** Keys must be hashable (immutable or implement `__hash__` and `__eq__`).

---