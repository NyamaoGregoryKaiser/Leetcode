# Edge Cases and Gotchas for Hash Table Problems

When working with hash tables, especially in an interview setting, it's crucial to consider various edge cases and potential pitfalls. Addressing these proactively demonstrates a thorough understanding of the data structure and problem constraints.

---

## General Hash Table Considerations

1.  **Empty Input Collections**:
    *   **Arrays/Vectors**: What if `nums` or `strs` is empty? Solutions should typically return an empty collection or 0, depending on the problem.
    *   **Strings**: What if an individual string is empty? How should `groupAnagrams` handle `["", ""]`? (They are anagrams).
2.  **Single Element Input**:
    *   **Two Sum**: `[5]`, target `10`. No pair. Should return empty.
    *   **Longest Consecutive Sequence**: `[7]`. Length 1.
    *   **Group Anagrams**: `["abc"]`. Output: `[["abc"]]`.
3.  **Duplicate Elements**:
    *   **Two Sum**: `[3, 3]`, target `6`. The problem usually specifies "you may not use the same element twice", implying distinct indices, so `[0, 1]` is valid.
    *   **Longest Consecutive Sequence**: `[1, 2, 2, 3]`. The sequence is `1, 2, 3`, length 3. Duplicates should not increase the length. Hash sets naturally handle this by only storing unique elements.
    *   **Group Anagrams**: `["a", "a"]`. Should be `[["a", "a"]]`.
4.  **Negative Numbers**:
    *   Many hash table problems involve numerical calculations (e.g., `target - num`). Ensure these calculations handle negative numbers correctly and that keys/values can store them.
    *   For `Longest Consecutive Sequence`, `[-2, -1, 0]` is a valid consecutive sequence.
5.  **Large Numbers / Integer Overflow**:
    *   If sums or differences can exceed `int` limits, consider using `long long` in C++.
    *   Hash functions for very large numbers might need custom implementations or careful consideration of `std::hash` behavior.
6.  **All Elements Same**: `[5, 5, 5, 5]`.
    *   **Two Sum**: `[5, 5]`, target `10`. Indices `[0, 1]`.
    *   **Longest Consecutive Sequence**: `[5, 5, 5]`. Length 1.
7.  **Order of Elements**:
    *   **Two Sum**: If multiple solutions exist (rare per problem constraints, but possible), does the order of indices matter? (`[0, 1]` vs `[1, 0]`). Typically no.
    *   **Group Anagrams**: The order of groups in the outer vector and the order of strings within each group usually doesn't matter. Ensure test utilities can handle this non-deterministic ordering (e.g., by sorting for comparison).
8.  **Character Set (for strings)**:
    *   Are strings only lowercase English letters? (Our `areAnagrams` for brute force assumes this).
    *   What about uppercase, numbers, special characters, or Unicode? This affects frequency array sizes or the need for a `std::map<char, int>` for counts. `std::sort` for canonical key generation (Group Anagrams hash map) is more robust to character sets as it sorts by ASCII/Unicode values.
9.  **Hash Collisions**:
    *   While `std::unordered_map` and `std::unordered_set` handle collisions internally, you should be aware that worst-case scenarios (all elements hashing to the same bucket) can degrade average O(1) operations to O(N). This is a theoretical concern for most interviews, but worth mentioning if asked about performance guarantees.
    *   For custom hash tables, collision resolution (chaining vs. open addressing) is a key design choice.

---

## Problem-Specific Gotchas

### Two Sum
*   **Using the same element twice**: Make sure your solution doesn't return `[i, i]` for `nums[i] + nums[i] == target`. The problem explicitly says "you may not use the same element twice", meaning different indices. Brute force with `j = i + 1` naturally avoids this. Hash map approach must be careful: if `complement == current_num`, ensure `num_map[complement]` is not `i`. Our solution avoids this because `current_num` is only added to the map *after* checking for its complement. So, `num_map[complement]` will always refer to an index *before* `i`.

### Longest Consecutive Sequence
*   **Duplicates**: As mentioned, `[1, 2, 2, 3]` should yield length 3. Hash sets handle this implicitly. If not using a hash set, explicit checks for `nums[i] == nums[i-1]` are needed (as in our sort-based solution).
*   **Sparse numbers**: `[1, 100, 2, 200, 3]`. The longest consecutive sequence is still `1, 2, 3`. The `hashSet` approach efficiently skips over non-starting elements.

### Group Anagrams
*   **Empty strings**: `["", "b"]`. `""` is an anagram of itself. Output `[[""], ["b"]]`. `groupAnagrams` correctly groups empty strings.
*   **Performance of string sorting**: Sorting a string of length `M` is `M log M`. If `M` is very large, this can be a bottleneck. The frequency array method (O(M)) for key generation is better for very long strings.

### LFU Cache
*   **Capacity 0**: `LFUCache(0)`. All `get` operations should return -1, `put` operations should do nothing. Our implementation handles this.
*   **Tie-breaking for eviction**: Crucial and often missed. If multiple items have the same minimum frequency, which one is evicted? The problem statement specifies "least recently used". Our solution achieves this by storing items in `std::list` (which acts as a DLL) where new/accessed items go to the front (MRU) and old items are at the back (LRU). Evicting `list.back()` handles LRU.
*   **`min_frequency` update**: When an item is moved from `freq` to `freq+1`, and the list for `freq` becomes empty, `min_frequency` must be updated. This update is not necessarily just `min_frequency++`; it should become the *next available* lowest frequency, which `update_frequency` handles by `min_frequency++` because it implies there's a new minimum frequency, or 1 if a new element is put.
*   **`put` operation on existing key**: If `put(key, value)` is called for an existing `key`, it should update the `value` AND increase the `frequency` of `key` as if it were a `get` operation. Our `put` method correctly calls `update_frequency`.
*   **Correct iterator invalidation**: Using `std::list::erase` with an iterator is O(1). If you remove a node from a list, make sure its stored iterator (`CacheNode::it`) is updated or invalidated for future use if it points to an old list. Our design avoids this by explicitly getting a new iterator to the *new* list.

---