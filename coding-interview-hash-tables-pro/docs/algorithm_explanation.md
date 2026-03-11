# Algorithm Explanation Document

This document provides a detailed explanation of the algorithms used for each problem, focusing on the optimal hash table-based solutions. It covers the core logic, design choices, and how hash tables contribute to efficiency.

---

## 1. Two Sum

**Problem:** Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

### Brute Force Approach (O(N^2) Time, O(1) Space)

**Logic:**
The most straightforward approach is to check every possible pair of numbers in the array.
1.  Use a nested loop: the outer loop iterates from the first element to the second-to-last.
2.  The inner loop iterates from the element *after* the current outer loop element to the last element. This ensures each pair is checked only once and no element is used with itself.
3.  If `nums[i] + nums[j]` equals `target`, return their indices `[i, j]`.

**Why it's not optimal for interviews:** While simple to implement, its quadratic time complexity makes it inefficient for large inputs. An interviewer would typically expect a more optimized solution.

### Hash Map (Optimal) Approach (O(N) Time, O(N) Space)

**Logic:**
The key insight is that for any number `x` in the array, we are looking for its "complement" (`target - x`). A hash map (or hash table) allows us to quickly check if this complement has been encountered before and, if so, retrieve its index.

1.  **Initialize an `unordered_map`**: This map will store `(number, index)` pairs.
    *   `key`: The integer value from `nums`.
    *   `value`: The index of that integer in `nums`.
2.  **Iterate through `nums` with an index `i`**:
    *   For each `current_num = nums[i]`:
        *   Calculate the `complement = target - current_num`.
        *   **Check the map**: Look for `complement` in the `unordered_map`.
            *   **If `complement` exists in the map**: This means we've found the two numbers. The `complement` was encountered at `num_map[complement]` and the `current_num` is at `i`. Return `[num_map[complement], i]`.
            *   **If `complement` does NOT exist in the map**: This `current_num` cannot form a pair with any previous number to reach `target`. So, add `current_num` and its index `i` to the `num_map` for future lookups.
3.  If the loop finishes without finding a pair (which shouldn't happen based on the problem statement's guarantee), return an empty result.

**Why Hash Map is optimal:**
*   **Time Complexity:** O(N). Each number is visited once. Hash map insertion and lookup operations take O(1) time on average. In the worst-case (hash collisions leading to linked lists), it could degrade to O(N) for a single operation, but for `std::unordered_map` with good hash functions, this is rare.
*   **Space Complexity:** O(N). In the worst case, we might store all N numbers in the hash map if no pair is found until the very end.

**Interview Tips:**
*   Mention the trade-off: improved time complexity at the cost of increased space complexity.
*   Discuss the average vs. worst-case performance of hash map operations.

---

## 2. Longest Consecutive Sequence

**Problem:** Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence. Must run in O(n) time.

### Sort-Based Approach (O(N log N) Time, O(1) or O(N) Space)

**Logic:**
A common initial thought is to sort the array. Once sorted, consecutive elements will be adjacent.

1.  **Handle edge cases**: If the array is empty, return 0.
2.  **Sort the array**: This takes O(N log N) time.
3.  **Iterate through the sorted array**:
    *   Keep track of `current_streak` and `longest_streak`.
    *   Skip duplicate numbers (they don't extend a *new* consecutive sequence).
    *   If `nums[i]` is `nums[i-1] + 1`, increment `current_streak`.
    *   Otherwise, if it's not consecutive, reset `current_streak` to 1.
    *   Update `longest_streak = max(longest_streak, current_streak)` after each step.

**Why it's not optimal for this problem:** The sorting step dominates the time complexity, making it O(N log N), which violates the O(N) requirement.

### Hash Set (Optimal) Approach (O(N) Time, O(N) Space)

**Logic:**
To achieve O(N) time, we need a way to check for the presence of numbers in O(1) average time. A hash set (`unordered_set`) is perfect for this. The key insight is to only start counting a consecutive sequence if we are sure we are at its *beginning*.

1.  **Handle edge cases**: If the array is empty, return 0.
2.  **Populate a `unordered_set`**: Insert all numbers from `nums` into a `unordered_set`. This allows for O(1) average time lookups. (O(N) time, O(N) space).
3.  **Initialize `longest_streak = 0`**.
4.  **Iterate through each `num` in the original `nums` array**:
    *   **Check if `num` is the start of a sequence**: The crucial optimization is to only process numbers that *could* be the start of a sequence. A number `num` is the start of a sequence if `num - 1` is NOT present in the hash set.
        *   `if (num_set.find(num - 1) == num_set.end())`: This means `num` is a potential starting point.
    *   **If `num` is a starting point**:
        *   Initialize `current_num = num` and `current_streak = 1`.
        *   **Extend the sequence**: While `current_num + 1` exists in the `num_set`:
            *   Increment `current_num` and `current_streak`.
        *   Update `longest_streak = max(longest_streak, current_streak)`.
5.  Return `longest_streak`.

**Why Hash Set is optimal:**
*   **Time Complexity:** O(N).
    *   Adding all elements to the hash set: O(N).
    *   The outer loop iterates N times. The inner `while` loop (extending the sequence) seems like it could lead to N^2. However, each number is checked by the `while` loop at most *twice*: once when it's the `num` in the outer loop, and once when it's `current_num + 1` in an inner loop. Because numbers are only processed as starting points if `num - 1` is absent, and then they are effectively "consumed" by the `while` loop, each check/increment contributes to the overall streak only once. Thus, the total work for finding and extending all sequences is amortized O(N).
*   **Space Complexity:** O(N) to store all numbers in the hash set.

**Interview Tips:**
*   Emphasize the "start of sequence" optimization. Without it, you might re-evaluate already processed elements, leading to a higher complexity in explanations.
*   Discuss the amortized O(N) time complexity.

---

## 3. Group Anagrams

**Problem:** Given an array of strings `strs`, group the anagrams together.

### Brute Force Approach (O(N^2 * M) Time, O(N) Space)

**Logic:**
Similar to Two Sum, a brute-force approach involves comparing every string with every other string.

1.  Initialize a `result` vector of string vectors and a `visited` boolean array.
2.  Iterate through `strs` with index `i`.
3.  If `strs[i]` has not been `visited`:
    *   Create a `current_group` and add `strs[i]` to it. Mark `strs[i]` as `visited`.
    *   Iterate through `strs` with index `j` from `i+1` to `N-1`.
    *   If `strs[j]` has not been `visited` and `areAnagrams(strs[i], strs[j])` is true:
        *   Add `strs[j]` to `current_group` and mark `strs[j]` as `visited`.
    *   Add `current_group` to `result`.
4.  The `areAnagrams` helper function would typically involve sorting both strings (O(M log M)) or using a frequency map/array (O(M)).

**Why it's not optimal:** The nested loops (O(N^2)) combined with string comparison (O(M) or O(M log M)) make it highly inefficient.

### Hash Map (Optimal) Approach (O(N * M log M) Time, O(N * M) Space)

**Logic:**
The core idea for grouping anagrams is that all anagrams of a given word will have the same "canonical form" when their characters are arranged alphabetically. This canonical form can serve as a unique key in a hash map.

1.  **Initialize an `unordered_map`**:
    *   `key`: A `std::string` representing the sorted (canonical) form of an anagram.
    *   `value`: A `std::vector<std::string>` to store all original strings that produce this canonical key.
2.  **Iterate through each `s` in the input `strs` array**:
    *   **Create a canonical key**:
        *   Make a copy of `s`, let's call it `key_str`.
        *   Sort `key_str` alphabetically. For a string of length M, this takes O(M log M).
    *   **Add to map**: Use `key_str` as the key to store the *original* string `s` in the `unordered_map`.
        *   `anagram_groups[key_str].push_back(s);`
        *   Hash map operations (insertion, lookup) for string keys take O(M) on average (due to hashing/comparing the entire string).
3.  **Collect results**: After iterating through all strings, the `anagram_groups` map will contain all groups. Iterate through the map and add each `pair.second` (the vector of strings) to the `result` vector.

**Why Hash Map is optimal:**
*   **Time Complexity:** O(N * M log M).
    *   There are N strings. For each string:
        *   Sorting the string takes O(M log M).
        *   Hash map operations (hashing a string key, insertion/lookup) take O(M) on average.
    *   The dominant factor is `N * M log M`.
*   **Space Complexity:** O(N * M). In the worst case, all strings are distinct anagrams, and each original string (of length M) is stored within the map's values, plus their sorted keys.

**Alternative Key Generation (O(N * M) Time, O(N * M) Space - but constant M for key):**
Instead of sorting, you can create a frequency count array (e.g., `int counts[26]`) for each string. Convert this frequency array into a string (e.g., "a1b0c2..." or "#1#0#2...") to use as the hash map key.
*   Generating this key takes O(M) time for a string of length M.
*   The key itself is of fixed length (e.g., 26 for lowercase English letters), so hashing this key is O(1) (assuming a good hash for short, fixed-length strings).
*   This improves time complexity to O(N * M) overall.

**Interview Tips:**
*   Explain the canonical form concept.
*   Discuss the `M log M` vs. `M` for key generation and justify the choice. The frequency count method is often preferred for its better theoretical complexity, but sorting is simpler to implement correctly in an interview.
*   Consider character set (ASCII, Unicode, only lowercase English).

---

## 4. LFU Cache

**Problem:** Design and implement a Least Frequently Used (LFU) cache with `get` and `put` operations in O(1) time.

**Logic (Complex - uses multiple Hash Maps and Doubly Linked Lists):**
An LFU cache needs to track not just recently used items (like LRU) but also *how often* items are used. When evicting, it removes the item with the lowest frequency. If there's a tie in frequency, it evicts the least recently used among those with the lowest frequency. This requires managing items by their frequency and recency.

The optimal O(1) solution typically involves:
1.  **`key_to_node_map` ( `unordered_map<int, CacheNode>` )**:
    *   Maps a `key` to its actual `CacheNode` object. `CacheNode` stores `key`, `value`, `frequency`, and an iterator to its position in the `freq_to_key_list_map`. This allows O(1) access to node data and quick removal from its frequency list.
2.  **`freq_to_key_list_map` ( `unordered_map<int, list<int>>` )**:
    *   Maps a `frequency` count to a doubly linked list (`std::list`).
    *   Each `std::list` stores `keys` (not full `CacheNode`s) that currently have that specific `frequency`.
    *   The lists are ordered by *recency*: Most Recently Used (MRU) keys are at the front, Least Recently Used (LRU) keys are at the back.
3.  **`min_frequency` ( `int` )**:
    *   Keeps track of the smallest frequency count currently present in the cache. This is crucial for efficient eviction.

### `CacheNode` Structure:

```cpp
struct CacheNode {
    int key;
    int value;
    int frequency;
    std::list<int>::iterator it; // Iterator to its position in freq_to_key_list_map[frequency]
    CacheNode(int k, int v) : key(k), value(v), frequency(1) {}
};
```

### `update_frequency(int key)` Method:

This is the core helper method called by both `get` and `put` when a key is accessed or updated.

1.  **Retrieve Node**: Get the `CacheNode` for `key` from `key_to_node_map`.
2.  **Remove from Old List**: Erase `key` from `freq_to_key_list_map[node.frequency]`. Use `node.it` for O(1) removal.
3.  **Update `min_frequency`**: If the old frequency list (`freq_to_key_list_map[node.frequency]`) becomes empty *and* that frequency was equal to `min_frequency`, then increment `min_frequency` (because there are no longer any elements with the previous minimum frequency). Also, erase the empty list from the map.
4.  **Increment Frequency**: Increment `node.frequency`.
5.  **Add to New List**: Add `key` to the *front* of `freq_to_key_list_map[node.frequency]` (the new frequency list). This makes it MRU for its new frequency level.
6.  **Update Node Iterator**: Store the iterator to this new position (`freq_to_key_list_map[node.frequency].begin()`) back into `node.it`.

### `get(int key)` Method:

1.  **Check `key_to_node_map`**: If `key` is not found, return -1.
2.  **Update Frequency**: If found, call `update_frequency(key)`.
3.  **Return Value**: Return `key_to_node_map[key].value`.

### `put(int key, int value)` Method:

1.  **Handle Capacity 0**: If `capacity == 0`, do nothing and return.
2.  **Key Exists**: If `key` is already in `key_to_node_map`:
    *   Update `key_to_node_map[key].value = value`.
    *   Call `update_frequency(key)`.
    *   Return.
3.  **Key Does Not Exist (New Insertion)**:
    *   **Eviction (if cache is full)**: If `size == capacity`:
        *   Get the `key_to_evict` from the *back* of `freq_to_key_list_map[min_frequency]`. This is the LRU element among the LFU elements.
        *   Remove `key_to_evict` from `freq_to_key_list_map[min_frequency]`.
        *   Remove `key_to_evict` from `key_to_node_map`.
        *   Decrement `size`.
    *   **Insert New Node**:
        *   Create a `CacheNode` for the new `(key, value)` with `frequency = 1`.
        *   Add this `CacheNode` to `key_to_node_map`.
        *   Add `key` to the *front* of `freq_to_key_list_map[1]` (it's new, so frequency is 1).
        *   Store the iterator to this position in `key_to_node_map[key].it`.
        *   Set `min_frequency = 1` (a new element always starts with frequency 1).
        *   Increment `size`.

**Why this is optimal:**
*   **Time Complexity:** O(1) for `get` and `put` on average. All operations (hash map lookups, list insertions/deletions via iterators) are O(1) on average.
*   **Space Complexity:** O(Capacity). Stores `Capacity` `CacheNode`s and `Capacity` elements across `std::list`s.

**Interview Tips:**
*   This is a complex problem. Start with clarifying questions: what happens on tie-breaking? What is the capacity constraint?
*   Break down the problem into smaller parts: tracking key-value, tracking frequency, tracking recency for each frequency level.
*   Draw diagrams to explain the interaction between the two hash maps and the linked lists.
*   Emphasize the role of `min_frequency` and the `std::list::iterator` for O(1) operations.
*   Walk through an example with the interviewer.

---