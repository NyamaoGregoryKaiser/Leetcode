```markdown
# 💡 Interview Tips and Variations for Hash Table Problems

Hash tables are fundamental data structures and are extremely common in coding interviews. Mastering their properties and common use cases is crucial.

---

## General Hash Table Knowledge for Interviews

1.  **Core Concepts:**
    *   **What is a Hash Table?** A data structure that maps keys to values.
    *   **How it works:** Uses a hash function to compute an index into an array of buckets or slots, from which the desired value can be found.
    *   **Average Time Complexity:** O(1) for insertion, deletion, and lookup.
    *   **Worst-Case Time Complexity:** O(N) if all keys hash to the same bucket (due to poor hash function or malicious input, leading to a linked list traversal).
    *   **Collision Handling:** Understand common strategies like Chaining (linked lists in buckets) and Open Addressing (linear probing, quadratic probing, double hashing).
    *   **Resizing/Rehashing:** Explain what happens when a hash table gets too full (load factor exceeded), and how it impacts performance temporarily.

2.  **When to use a Hash Table:**
    *   When you need fast lookups, insertions, or deletions.
    *   When you need to count frequencies of items.
    *   When you need to group items by a certain property.
    *   When you need to remove duplicates efficiently.
    *   When `contains` or `exists` check is a primary operation.

3.  **JavaScript/TypeScript Specifics:**
    *   **`Map` vs. `Object`:**
        *   `Map`: Stores key-value pairs, remembers insertion order, keys can be *any* value (objects, functions, primitives), provides `size` property. Generally preferred for arbitrary key-value mapping tasks in algorithms.
        *   `Object`: Can also store key-value pairs, but keys are always converted to strings. Has prototype chain issues. Less performant for large sets of data. Best for simple property bags.
    *   **`Set`:** Stores unique values of any type. O(1) average for `add`, `delete`, `has`. Useful for deduplication or quick existence checks.

---

## Edge Cases and Gotchas for Hash Table Problems

1.  **Empty Input:** Always consider what happens if the input array/list/string is empty.
    *   *Example (Two Sum):* `nums = []`, `target = 5` -> Should return `[]`.
    *   *Example (Longest Consecutive Sequence):* `nums = []` -> Should return `0`.

2.  **Single Element Input:**
    *   *Example (Two Sum):* `nums = [5]`, `target = 5` -> Should return `[]`. (Needs two distinct elements).
    *   *Example (Longest Consecutive Sequence):* `nums = [7]` -> Should return `1`.

3.  **Duplicate Numbers/Keys:**
    *   *Two Sum:* If `nums = [3, 3]`, `target = 6`, the solution should correctly find `[0, 1]`. The optimal hash map solution handles this correctly as `numMap.set(3, 0)` then `numMap.has(3)` for the second `3` would find `3` at index `0`.
    *   *Longest Consecutive Sequence:* The `Set` naturally handles duplicates, so `[1, 2, 0, 1]` becomes `{0, 1, 2}` in the set, and works correctly.
    *   *LRU Cache:* `put`ting an existing key should update its value and move it to MRU, not create a new entry.

4.  **Negative Numbers/Zero:** Ensure your logic correctly handles negative integers and zero if they are within the problem's constraints.
    *   *Two Sum:* `nums = [-1, -2]`, `target = -3` is valid.
    *   *Longest Consecutive Sequence:* `nums = [-3, -2, -1, 0]` is valid.

5.  **Large Numbers/Integer Overflow:** While TypeScript handles large numbers up to `Number.MAX_SAFE_INTEGER`, be mindful of potential issues in other languages or if values exceed this limit. Some problems might hint at using `BigInt`.

6.  **Case Sensitivity / Special Characters:**
    *   *Group Anagrams:* If `strs` could contain `"Eat"` and `"tea"`, would they be anagrams? Typically, problems specify "lowercase English letters." If not, clarification is needed (convert to lowercase? ignore special characters?). Our solution assumes lowercase.

7.  **Order of Output:** Does the order of results matter? (e.g., `[0,1]` vs `[1,0]` for Two Sum, or order of grouped arrays for Group Anagrams). Clarify if not specified. Sort output for consistent testing if order doesn't matter.

8.  **Constraints:** Always pay attention to constraints (e.g., `N <= 10^5` suggests O(N) or O(N log N), but not O(N^2)). `M <= 100` for string length in Group Anagrams makes `M log M` acceptable.

---

## Interview Tips for Specific Problems

### Two Sum
*   **Initial thought:** Brute-force O(N^2) (mention it, then optimize).
*   **Key question:** "Can we optimize lookup?" -> Hash Map.
*   **Variation:** "Two Sum II - Input array is sorted." -> Two Pointers (often better than hash map for sorted arrays if O(1) space is needed, otherwise hash map is still O(N) time).
*   **Variation:** "K-Sum" -> Extend with recursion/more loops, often involves sorting.

### Longest Consecutive Sequence
*   **Initial thought:** Sorting O(N log N) (mention it).
*   **Key question:** "How to do it in O(N)?" -> Hash Set.
*   **Crucial step:** The `num - 1` check to avoid redundant work is the most important optimization. Explain *why* it makes it O(N).
*   **Gotcha:** Duplicates in the input array. `Set` naturally handles this.

### LRU Cache
*   **Key components:** Need fast lookup (Hash Map) AND fast reordering/eviction (Doubly Linked List).
*   **Explain the `DLNode` structure:** Each node needs to store `key`, `value`, `prev`, `next`. `key` is essential for removing from the `Map` during eviction.
*   **`get` logic:** Lookup in map, move node to head, return value.
*   **`put` logic:**
    *   If exists: update value, move to head.
    *   If new: check capacity. If full, remove tail (LRU) and its key from map. Add new node to head, add to map.
*   **Common mistake:** Forgetting to update the `cacheMap` when a node is evicted from the `lruList`.

### Group Anagrams
*   **Key concept:** How to define a "canonical form" for anagrams?
*   **Method 1 (Sorted String Key):** `str.split('').sort().join('')`. Simple, easy to explain.
*   **Method 2 (Frequency Count Array/String Key):** Create an array of 26 (for 'a' through 'z') or 128 (for ASCII), count character frequencies, then convert this array to a string key (e.g., `"#1#0#0#1..."`). This is O(M) for string length M, which is theoretically faster than O(M log M) sort for very long strings, but often not necessary for typical interview constraints.
*   **Gotcha:** Case sensitivity, special characters (clarify constraints).

---

By understanding these fundamentals, specific problem approaches, and potential pitfalls, you'll be well-equipped to tackle Hash Table questions in your next coding interview. Good luck!
```