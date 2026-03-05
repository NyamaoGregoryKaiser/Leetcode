```markdown
# Hash Table Algorithms: Detailed Explanations and Analysis

This document provides in-depth explanations for the hash table problems implemented in `src/main_algorithms.cpp`. Each problem includes a detailed breakdown of its solution, time and space complexity analysis, and a discussion of alternative approaches.

---

## Problem 1: Two Sum

**Problem Statement:** Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.

### Approach 1: Brute Force

**Logic:**
The simplest way to solve this is to check every possible pair of numbers in the array. We use two nested loops: the outer loop iterates from the first element to the second-to-last, and the inner loop iterates from the element *after* the outer loop's current element to the last element. For each pair `(nums[i], nums[j])`, we check if their sum equals the `target`.

**Time Complexity:** `O(N^2)`
*   The outer loop runs `N-1` times.
*   The inner loop runs approximately `N` times in the worst case (for the first iteration of the outer loop).
*   This results in `(N-1) + (N-2) + ... + 1` operations, which is roughly `N^2 / 2`, hence `O(N^2)`.

**Space Complexity:** `O(1)`
*   No additional data structures are used beyond a few variables for loop counters and storing the result.

**Edge Cases & Gotchas:**
*   **Small Arrays:** Works fine for arrays of size 2.
*   **Duplicate Numbers:** If the input array `nums` contains duplicate numbers, this approach correctly handles them as distinct elements due to their distinct indices.
*   **Guaranteed Solution:** The problem statement guarantees exactly one solution, so we don't need to handle cases where no pair sums to the target.

### Approach 2: Using a Hash Map (One Pass) - Optimal

**Logic:**
The brute force approach is slow because it re-scans the array for each element to find its complement. A hash map allows us to look up elements in nearly `O(1)` time.
The idea is to iterate through the array once. For each number `nums[i]`:
1.  Calculate its `complement` needed to reach the `target`: `complement = target - nums[i]`.
2.  Check if this `complement` already exists as a key in our hash map.
    *   If it does, we've found our pair! The hash map stores the index of the `complement`, and `i` is the index of the current number. We return these two indices.
    *   If it doesn't, we add the current number `nums[i]` and its index `i` to the hash map. We do this *after* checking for the complement to ensure we don't use the same element twice (e.g., if `target = 6` and `nums[i] = 3`, we don't want to use `3` with itself if it's the only `3` in the array).

**Time Complexity:** `O(N)`
*   We iterate through the array once (`N` elements).
*   For each element, hash map operations (insertion `num_to_index[nums[i]] = i` and lookup `num_to_index.count(complement)`) take `O(1)` time on average.
*   Therefore, the total time complexity is `O(N * 1) = O(N)`.

**Space Complexity:** `O(N)`
*   In the worst case, if no pair is found until the very end, we might store up to `N-1` elements in the hash map.
*   Thus, the space required grows linearly with the input size.

**Edge Cases & Gotchas:**
*   **Order of Operations:** It's crucial to check for the complement *before* adding the current number to the map. If `target = 6` and `nums = [3, 3]`, and we add `3` (at index 0) to the map *then* check for `target - 3 = 3`, we might incorrectly use `nums[0]` with itself if we haven't processed `nums[1]` yet. By checking first, we find the `3` from `nums[0]` when processing `nums[1]`.
*   **No Solution:** While the problem guarantees a solution, in a general `Two Sum` problem without this guarantee, you'd need to handle the case where the loop finishes without finding a pair.

---

## Problem 2: Longest Consecutive Sequence

**Problem Statement:** Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in `O(n)` time.

### Approach 1: Sorting

**Logic:**
A straightforward (but not `O(N)`) approach is to sort the array first. Once sorted, consecutive elements will be adjacent. We can iterate through the sorted array, keeping track of the current consecutive streak. We also need to handle duplicates by skipping them when checking for `nums[i] == nums[i-1] + 1`.

**Time Complexity:** `O(N log N)`
*   The dominant factor is sorting the array, which takes `O(N log N)` time.
*   The subsequent linear scan takes `O(N)` time.
*   Total: `O(N log N)`.

**Space Complexity:** `O(1)` or `O(N)`
*   `O(1)` if sorting is done in-place (e.g., `std::sort` for `std::vector` in many implementations).
*   `O(N)` if a copy of the array is made for sorting or if the sorting algorithm requires `O(N)` auxiliary space.

**Limitations:** Does not meet the `O(N)` requirement.

### Approach 2: Using a Hash Set - Optimal

**Logic:**
To achieve `O(N)` time, we need `O(1)` average time lookups. A hash set (`std::unordered_set`) is perfect for this.
1.  **Populate Set:** First, put all numbers from the input array `nums` into an `unordered_set`. This allows `O(1)` average time checking for the existence of any number.
2.  **Iterate and Find Starts:** Iterate through each number `num` in the original `num_set`. For each `num`, we want to determine if it's the *start* of a consecutive sequence. A number `x` is the start of a sequence if `x - 1` is *not* present in the `num_set`.
3.  **Extend Sequence:** If `num` is a start, we then increment `current_num` (starting from `num`) and check if `current_num + 1` exists in the set. We continue this process, extending the sequence, and increment `current_sequence_length` until `current_num + 1` is no longer found.
4.  **Update Max:** After finding the length of the current sequence, update `longest_sequence` if `current_sequence_length` is greater.

**Why is this `O(N)`?**
Although there's a nested `while` loop, the overall time complexity is `O(N)`. Each number in the `num_set` is visited:
*   At most once by the outer `for` loop as a potential start of a sequence.
*   At most once by the inner `while` loop when it is *part* of an existing sequence.
Since hash set operations (`count`, `insert`) take `O(1)` on average, the total operations amount to `N` hash set lookups/inserts, making it `O(N)`.

**Time Complexity:** `O(N)` on average.
*   Inserting `N` elements into the `unordered_set`: `O(N)` average.
*   Iterating through `N` elements: `O(N)`. Each element is effectively processed a constant number of times (once as a potential start, once as a member of a sequence).
*   Total: `O(N)`.

**Space Complexity:** `O(N)`
*   In the worst case, all `N` unique numbers are stored in the `unordered_set`.

**Edge Cases & Gotchas:**
*   **Empty Array:** Return 0. Handled by explicit check.
*   **Duplicates:** The `unordered_set` automatically handles duplicates, as it only stores unique elements. This simplifies the logic compared to the sorting approach.
*   **Large Sequences:** The `while` loop efficiently extends the sequence.
*   **Disconnected Sequences:** The outer loop ensures that every distinct sequence is found by starting from its lowest element.

---

## Problem 3: Group Anagrams

**Problem Statement:** Given an array of strings `strs`, group the anagrams together. You can return the answer in any order. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

### Approach 1: Using a Hash Map with Sorted String as Key - Optimal for general alphabet

**Logic:**
The core idea is that anagrams become identical if their letters are sorted alphabetically. For example, "eat", "tea", and "ate" all become "aet" when sorted. We can use this "sorted string" as the key in a hash map. The value associated with this key will be a list of all original strings that produce this sorted key (i.e., all anagrams).

1.  **Iterate Strings:** Loop through each `string s` in the input `strs` array.
2.  **Generate Key:** Create a temporary string `key` by copying `s` and then sorting `key` alphabetically.
3.  **Store in Map:** Use this `key` to access an entry in an `unordered_map<string, vector<string>>`. Add the *original* string `s` to the `vector<string>` associated with `key`. If `key` doesn't exist, a new entry (key with an empty vector) will be created, and `s` will be pushed back.
4.  **Collect Results:** After processing all strings, iterate through the `anagram_groups` map and collect all the `vector<string>` (the values) into the final result `vector<vector<string>>`.

**Time Complexity:** `O(N * K log K)`
*   `N`: number of strings in `strs`.
*   `K`: maximum length of a string in `strs`.
*   For each of the `N` strings:
    *   We make a copy of the string (`O(K)`).
    *   We sort the string (`O(K log K)`).
    *   We perform a hash map operation (insertion/lookup, `O(1)` on average for typical string hashing, but `O(K)` in worst-case for string comparisons if many collisions or string hashing takes `O(K)` time).
*   The dominant factor is `N` times the string sorting. Total: `O(N * K log K)`.

**Space Complexity:** `O(N * K)`
*   In the worst case, all strings are distinct anagram groups (e.g., `["a", "b", "c"]`), so we store `N` keys and `N` strings.
*   The total length of all strings stored in the map (keys and values) can be up to `N * K`.

**Edge Cases & Gotchas:**
*   **Empty Input:** If `strs` is empty, return an empty `vector<vector<string>>`.
*   **Empty Strings:** `""` is an anagram of itself. Sorted `""` is `""`.
*   **Single Character Strings:** Handled correctly.
*   **Ordering of Output:** The problem states "You can return the answer in any order," so the order of groups in the outer vector, and the order of strings within each group, does not matter for correctness. Our sorting helper function in tests handles this.

### Approach 2: Using a Hash Map with Character Count Array as Key - Optimal for small, fixed alphabet

**Logic:**
Instead of sorting the string, we can count the frequency of each character in the string. For a fixed, small alphabet (like 26 lowercase English letters), this count array can then be converted into a unique string key. For example, "aab" would become "#2#1#0#0...#0" (2 'a's, 1 'b', 0 'c's etc.). This avoids the `K log K` sorting step.

1.  **Iterate Strings:** Loop through each `string s` in the input `strs` array.
2.  **Generate Char Counts:** Create a fixed-size array (e.g., `array<int, 26>`) initialized to zeros. Iterate through `s` and increment the count for each character `c` (e.g., `counts[c - 'a']++`). This takes `O(K)` time.
3.  **Convert to Key:** Convert this `char_counts` array into a `string` key. A simple way is to concatenate `#` and the count for each character: `"#count_a#count_b#..."`. This takes `O(A)` time where `A` is the alphabet size (26).
4.  **Store in Map:** Similar to Approach 1, use this `key` to store the original string `s` in `unordered_map<string, vector<string>>`.
5.  **Collect Results:** Same as Approach 1.

**Time Complexity:** `O(N * (K + A))` which simplifies to `O(N * K)` since `A` (alphabet size) is a constant (e.g., 26).
*   `N`: number of strings.
*   `K`: maximum length of a string.
*   `A`: size of the alphabet (e.g., 26 for lowercase English).
*   For each of the `N` strings:
    *   Populating `char_counts`: `O(K)`.
    *   Converting `char_counts` to string key: `O(A)`.
    *   Hash map operation: `O(1)` on average.
*   Total: `O(N * (K + A))`.

**Space Complexity:** `O(N * K + A)`
*   `O(N * K)` for storing the strings and their generated keys in the map.
*   `O(A)` for the temporary `char_counts` array.
*   Overall dominated by `O(N * K)`.

**Trade-offs:**
*   This approach is generally faster than the sorted string key if `K log K` is significantly larger than `K + A`. For small `K` or large `A` (e.g., full Unicode), the sorted string key might be better. For typical competitive programming problems (small alphabet, reasonable string lengths), this is often preferred.
*   Requires knowledge of the character set (e.g., only lowercase English letters).

---

## Problem 4: First Unique Character in a String

**Problem Statement:** Given a string `s`, find the first non-repeating character in it and return its index. If it does not exist, return -1.

### Approach 1: Two-Pass using Hash Map (Frequency Map) - Optimal for arbitrary characters

**Logic:**
We need to know the frequency of each character to determine if it's unique. We also need to preserve the original order to find the *first* unique character. This suggests a two-pass approach:

1.  **First Pass (Frequency Count):** Iterate through the string once. Use an `unordered_map<char, int>` to store the frequency (count) of each character encountered.
2.  **Second Pass (Find First Unique):** Iterate through the string *again*, from the beginning. For each character `s[i]`:
    *   Check its frequency in the `char_frequencies` map.
    *   If `char_frequencies[s[i]] == 1`, this is the first non-repeating character in the string, so return its index `i`.
3.  **No Unique Character:** If the second loop finishes without returning an index, it means no unique character was found, so return -1.

**Time Complexity:** `O(N)`
*   First pass iterates through `N` characters: `O(N)` hash map insertions/increments.
*   Second pass iterates through `N` characters: `O(N)` hash map lookups.
*   Total: `O(N)`.

**Space Complexity:** `O(1)`
*   The `unordered_map` will store at most a distinct set of characters present in the string. For English lowercase letters, this is at most 26 entries. For extended ASCII, it's at most 256 entries. Since the alphabet size is constant and independent of the string's length `N`, the space complexity is considered `O(1)`.

**Edge Cases & Gotchas:**
*   **Empty String:** Returns -1.
*   **Single Character String:** Returns 0.
*   **All Unique Characters:** First character is returned (index 0).
*   **No Unique Characters:** Returns -1.
*   **Character Set:** This approach handles any character set (ASCII, Unicode if `char` can represent it) as long as `char` can be used as a key in `unordered_map`.

### Approach 2: Two-Pass using Fixed-Size Array (Frequency Array) - Optimal for small, fixed alphabet

**Logic:**
This is similar to Approach 1, but instead of a hash map, we use a fixed-size array to store frequencies. This is highly efficient when the character set is small and known (e.g., 26 lowercase English letters).

1.  **First Pass (Frequency Count):** Initialize an `array<int, 26>` (or `vector<int>(26)`) to all zeros. Iterate through the string `s`. For each character `c`, increment `counts[c - 'a']`.
2.  **Second Pass (Find First Unique):** Iterate through the string `s` again. For each character `s[i]`:
    *   Check `counts[s[i] - 'a']`.
    *   If it's `1`, return `i`.
3.  **No Unique Character:** Return -1.

**Time Complexity:** `O(N)`
*   Both passes iterate through `N` characters. Array access `counts[index]` is `O(1)`.
*   Total: `O(N)`.

**Space Complexity:** `O(1)`
*   The fixed-size array (26 integers) uses constant space, regardless of `N`.

**Trade-offs:**
*   This approach is generally slightly faster than using `unordered_map` due to direct array access (no hashing overhead or collision resolution).
*   It's limited to character sets that fit into the array mapping (e.g., `c - 'a'` assumes 'a' through 'z' or similar contiguous range). For full ASCII, an array of size 256 would be needed. For arbitrary Unicode, a hash map is necessary.

---

## Problem 5: Design a Simple Hash Map (Concept & Basic Chaining)

**Problem Statement:** Implement a simplified HashMap with basic `put`, `get`, and `remove` functionalities. Assume keys and values are non-negative integers.

### Approach: Chaining with Fixed-Size Array of Linked Lists

**Logic:**
A hash map fundamentally consists of:
1.  **Hash Function:** Converts a key into an integer index (hash code).
2.  **Buckets (Array):** An underlying array where elements are stored. Each element of this array is called a "bucket."
3.  **Collision Resolution:** A strategy to handle cases where multiple keys hash to the same bucket. Chaining is a common method where each bucket stores a linked list (or dynamic array) of key-value pairs.

**Implementation Details:**

*   **`BUCKET_SIZE`:** A constant integer (e.g., 1000) defines the number of buckets in our hash map. Choosing a prime number is often recommended for better distribution, but any reasonable size works for demonstration.
*   **`buckets`:** A `std::vector<std::list<std::pair<int, int>>>` is used to represent the buckets. Each element in the vector is a `std::list` (our "chain") which holds `std::pair<int, int>` (key-value pairs).
*   **`hash(int key)`:** A simple modulo operator `key % BUCKET_SIZE` is used as the hash function. This maps any non-negative integer key to an index within `[0, BUCKET_SIZE - 1]`.
*   **`find_in_bucket(int key, int h_idx)`:** A helper function that iterates through the `std::list` at `buckets[h_idx]` to find an iterator pointing to the `std::pair` with the given `key`. If not found, it returns `buckets[h_idx].end()`.

**Methods:**

1.  **`put(int key, int value)`:**
    *   Calculate `h_idx = hash(key)`.
    *   Use `find_in_bucket` to see if `key` already exists in `buckets[h_idx]`.
    *   If found, update the `value` of the existing `pair`.
    *   If not found, create a new `pair<int, int>(key, value)` and add it to the front of the list (`push_front`) in `buckets[h_idx]`. (Adding to front is `O(1)`).

2.  **`get(int key)`:**
    *   Calculate `h_idx = hash(key)`.
    *   Use `find_in_bucket` to search for `key`.
    *   If found, return the `value` from the `pair`.
    *   If not found, return -1 (as per problem spec).

3.  **`remove(int key)`:**
    *   Calculate `h_idx = hash(key)`.
    *   Use `find_in_bucket` to search for `key`.
    *   If found, remove the `pair` from the list using the iterator (`buckets[h_idx].erase(it)`).

**Time Complexity:**
*   **Average Case:** `O(1)` for `put`, `get`, `remove`.
    *   Assuming a good hash function and sufficient `BUCKET_SIZE`, keys are distributed evenly across buckets.
    *   List operations (`push_front`, iterating a small list) take `O(1)` on average.
*   **Worst Case:** `O(N)` for `put`, `get`, `remove`.
    *   If all `N` keys hash to the same bucket (due to a poor hash function or malicious input), then that single list will contain all elements.
    *   Searching/inserting/removing in a list of size `N` takes `O(N)` time.

**Space Complexity:** `O(BUCKET_SIZE + N)`
*   `O(BUCKET_SIZE)` for the vector of lists.
*   `O(N)` for storing all `N` key-value pairs across all lists.
*   Overall, it's `O(N)` as `BUCKET_SIZE` is a constant or can be considered proportional to `N` for optimal performance.

**Trade-offs & Considerations:**
*   **`BUCKET_SIZE`:** A crucial parameter. Too small, and collisions increase, leading to worse average-case performance. Too large, and memory is wasted. In `std::unordered_map`, `BUCKET_SIZE` is dynamic and managed by the load factor.
*   **Hash Function:** The quality of the hash function significantly impacts performance. A poor hash function leads to many collisions, degrading average performance towards worst-case.
*   **Collision Resolution:** Chaining (using linked lists) is one method. Another is Open Addressing (linear probing, quadratic probing, double hashing), where collisions are resolved by finding another empty slot in the array. Open addressing can be more memory-efficient but more complex to implement correctly (especially `remove`).
*   **Load Factor:** Ratio of number of elements to number of buckets. When this ratio exceeds a certain threshold, a real hash map would typically "resize" (create a larger array of buckets and rehash all elements), which is a costly but necessary operation to maintain `O(1)` average time. Our simple `MyHashMap` does not implement resizing.
*   **Key Range:** This implementation assumes non-negative integer keys. For other types (strings, custom objects), a custom hash function would be needed.

This simplified `MyHashMap` provides a fundamental understanding of how hash tables work internally, demonstrating hashing, bucket organization, and basic chaining for collision resolution.

---
```