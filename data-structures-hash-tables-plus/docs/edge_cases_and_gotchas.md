# Hash Tables: Edge Cases and Gotchas

When working with hash tables in interviews or real-world scenarios, it's crucial to consider various edge cases and potential pitfalls. These can drastically affect performance, correctness, or memory usage.

## 1. General Hash Table Gotchas

### a. Poor Hash Function
*   **Problem**: If keys are not distributed uniformly across buckets, many keys will map to the same bucket. This leads to **hash collisions** and degrades average-case performance.
*   **Impact**: Operations (insert, delete, lookup) can degrade from O(1) average to O(N) worst-case, resembling a linked list traversal.
*   **Mitigation**:
    *   For built-in types, `std::hash` is usually sufficient.
    *   For custom types, design a good `operator()` for `std::hash` or provide a custom hash function that spreads keys widely. Consider using prime numbers in calculations, XORing hash values of components, etc.
    *   Avoid simple sums or products that can easily collide for different inputs.

### b. Mutable Keys
*   **Problem**: If an object used as a key in a hash table (`unordered_map` or `unordered_set`) is modified *after* being inserted, its hash value might change. This means it will no longer be found when looking it up, as the lookup will go to the original hash bucket, not the new one.
*   **Impact**: Lost data, incorrect lookups.
*   **Mitigation**:
    *   **Use immutable types as keys**: `std::string` is generally safe because `std::string` objects are typically copied when used as keys, making the key itself immutable within the map.
    *   **Do not modify keys**: If using mutable objects as keys, ensure they are never modified while they are in the hash table. Remove them, modify, then re-insert.
    *   For custom classes, ensure `operator==` and the hash function depend only on immutable members.

### c. Load Factor and Rehashing
*   **Problem**: A very high load factor (many elements per bucket) leads to frequent collisions and degrades performance. Rehashing (resizing the internal array) is an `O(N)` operation. If it happens too often, it can slow down sequences of insertions.
*   **Impact**: Amortized O(1) average performance can be misleading; individual `insert` operations can be slow if they trigger a rehash.
*   **Mitigation**:
    *   **Pre-allocate size**: If the approximate number of elements is known, use `reserve()` to pre-allocate memory and avoid multiple rehashes.
    *   **Monitor load factor**: In performance-critical applications, monitor `load_factor()` and `max_load_factor()` to tune performance.

### d. Memory Usage
*   **Problem**: Hash tables often consume more memory than other data structures for the same number of elements due to:
    *   Empty buckets.
    *   Overhead for linked lists (pointers) in chaining.
    *   Overhead for storing the hash value (though often optimized).
*   **Impact**: Can lead to higher memory footprint, especially for small element types or when `max_load_factor` is set low.
*   **Mitigation**:
    *   Choose `std::vector<int>(26)` for frequency counting instead of `std::unordered_map<char, int>` when applicable (e.g., small, contiguous alphabet).
    *   Consider `std::map` if memory locality and minimal overhead per node are more critical than raw average speed for specific scenarios (though generally `unordered_map` is faster).

### e. Non-existent Keys
*   **Problem**: Accessing a non-existent key using `operator[]` on `std::unordered_map` will default-construct the value and insert it into the map. This might not be the desired behavior if you only want to check for existence or retrieve a value.
*   **Impact**: Unexpected insertions, potential memory usage, and logic errors.
*   **Mitigation**:
    *   **Use `count()` or `find()`**: To check for existence without insertion: `if (my_map.count(key)) { /* key exists */ }`.
    *   **Use `at()`**: To access an existing key and throw an exception if it doesn't exist: `my_map.at(key)`. This is safer for read-only access where existence is expected.

## 2. Problem-Specific Edge Cases and Gotchas

### Problem 1: Two Sum
*   **Empty array**: Problem statement usually guarantees at least one solution, implying non-empty. If not, handle gracefully (e.g., return empty vector).
*   **Array with one element**: Cannot form a pair. (Problem usually implies N >= 2).
*   **Target not found**: Problem usually guarantees a solution. If not, handle (e.g., return empty vector or throw error).
*   **Duplicate numbers in input**: Example: `nums = [3, 3], target = 6`. The optimal solution correctly handles this by storing `(3 -> 0)` then finding `(3 -> 1)` where `3` is the complement. It will return `[0, 1]`.
*   **Negative numbers / Zero**: Hash tables handle these fine.
*   **Large numbers**: Watch for `int` overflow if summing numbers before comparing to target, though usually `int` is sufficient for typical interview constraints.

### Problem 2: Longest Consecutive Sequence
*   **Empty array**: Returns 0. Handled.
*   **Array with one element**: Returns 1. Handled.
*   **All same elements**: e.g., `[5, 5, 5]`. Returns 1. Handled.
*   **No consecutive elements**: e.g., `[1, 5, 10]`. Returns 1. Handled.
*   **Negative numbers / Zero**: Hash sets handle these correctly.
*   **Duplicates**: `[1, 2, 0, 1]`. The `unordered_set` naturally handles duplicates by storing only unique values. The logic then correctly finds `[0, 1, 2]`. This is why the optimal solution uses a `set` and the sorting solution needs `continue` for duplicates.
*   **Maximum/Minimum integer values**: `INT_MAX`, `INT_MIN`. The `unordered_set` will store these, and `+1/-1` operations need to be careful about overflow/underflow if not using larger integer types, but generally for sequences, they fit.

### Problem 3: Group Anagrams
*   **Empty input array**: Returns empty `vector<vector<string>>`. Handled.
*   **Empty strings**: `strs = ["", ""]`. Both hash to `""` (or sorted `""`), correctly grouped.
*   **Single character strings**: `strs = ["a", "b"]`. Correctly treated as distinct.
*   **Long strings**: Sorting keys can be slow if string length (M) is very large. The `O(M log M)` factor dominates. The character counting approach `O(M)` per string could be faster for very long strings (but `M` is usually limited in interviews).
*   **Strings with non-alphabetic characters/different cases**: The current solution assumes lowercase English letters. If input can contain uppercase, numbers, or symbols, the sorting approach would work but `c - 'a'` counting approach would need modification (e.g., use a larger map or `std::map<char, int>`).
*   **Large number of strings (N)**: If N is very large, string hashing and comparisons can be significant, but usually `unordered_map` is robust.

### Problem 4: First Unique Character in a String
*   **Empty string**: Returns -1. Handled.
*   **String with all repeating characters**: e.g., `"aabb"`. Returns -1. Handled.
*   **String with only one character**: e.g., `"a"`. Returns 0. Handled.
*   **String with mixed case/non-alphabetic characters**: The `std::vector<int>(26)` approach only works for lowercase English letters. If other characters are possible, an `std::unordered_map<char, int>` would be necessary, with a slight performance cost but greater generality.
*   **Long string**: `O(N)` is optimal. Brute force `O(N^2)` would time out for large N.

### Problem 5: Contains Duplicate
*   **Empty array**: Returns `false`. Handled.
*   **Array with one element**: Returns `false`. Handled.
*   **Array with two identical elements**: `[5, 5]`. Returns `true`. Handled.
*   **Large numbers of elements (N)**: Optimal O(N) is critical here. Sorting O(N log N) is fine for moderate N, but brute force O(N^2) will be too slow.
*   **All elements are distinct**: `unordered_set` solution will iterate through all elements and insert them, then return `false`. This is the worst-case for space for this problem but still O(N) time.

By understanding these edge cases and potential problems, you can write more robust and performant hash table solutions during interviews and in your projects.