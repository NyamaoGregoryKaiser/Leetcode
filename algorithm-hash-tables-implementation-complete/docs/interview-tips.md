```markdown
# Hash Table Interview Tips and Variations

Hash Tables are one of the most frequently tested data structures in coding interviews. Mastering them involves not just knowing how to use `Map` or `Set` in your language, but understanding their underlying principles, trade-offs, and common applications.

## General Interview Strategy for Hash Table Problems

1.  **Clarify the Problem**:
    *   Understand inputs (data types, ranges, constraints, duplicates, empty inputs).
    *   Understand outputs (format, return value).
    *   Ask about edge cases (empty array, single element, all duplicates, no solution if not guaranteed).
    *   Confirm time/space complexity requirements (e.g., "Can I do better than O(N^2)?").

2.  **Start with Brute Force (if applicable)**:
    *   This shows you can solve the problem, even if not optimally.
    *   It provides a baseline for comparison.
    *   For example, nested loops for `Two Sum` or `Contains Duplicate`.
    *   State its complexity and then articulate why it's not ideal.

3.  **Identify Bottlenecks**:
    *   Why is the brute-force slow? Usually, it's repeated searches or comparisons.
    *   "I'm iterating over the array multiple times, or I have nested loops. Can I speed up lookups?"

4.  **Introduce Hash Tables as a Solution**:
    *   "We need faster lookups. A hash table (or hash map/set) provides average O(1) time complexity for insertions and lookups."
    *   Explain *what* you would store in the hash table:
        *   For `Two Sum`: `Map<number, index>`
        *   For `Longest Consecutive Sequence`: `Set<number>`
        *   For `Group Anagrams`: `Map<canonical_string, list_of_strings>`
        *   For `Contains Duplicate`: `Set<number>`
    *   Walk through your optimized algorithm step-by-step with an example.

5.  **Analyze Complexity (Time & Space)**:
    *   Always state the time and space complexity for your optimal solution.
    *   Explain why the hash table improves the complexity (e.g., reduces `O(N)` lookups in loops to `O(1)` average).
    *   Discuss the trade-off: usually, `O(1)` average time comes at the cost of `O(N)` space.

6.  **Discuss Edge Cases and Gotchas**:
    *   Empty input? Single element? All elements same?
    *   Negative numbers? Zero? Large numbers?
    *   Floating-point numbers (less common for hash tables due to precision issues)?
    *   What if keys are objects? (Requires custom hash/equality functions).
    *   Collision handling (briefly mention separate chaining or open addressing for custom implementations).

7.  **Consider Follow-up Questions & Variations**:
    *   Be prepared for questions that modify the problem constraints or ask about the hash table internals.

## Common Hash Table Interview Questions & Variations

Here are some common problems and their core Hash Table application:

*   **Two Sum**:
    *   Variation: Return actual numbers instead of indices.
    *   Variation: Find three sum/four sum (often involves two pointers *after* sorting, or nested hash table approach for partial sums).
    *   Variation: Two Sum II - Input array is sorted (can use two pointers, or hash table for faster `O(N)`).
*   **Contains Duplicate**:
    *   Variation: Find `k` duplicates (use `Map` to store frequencies).
    *   Variation: Contains Nearby Duplicate (use `Map` to store last seen index).
*   **Longest Consecutive Sequence**:
    *   Variation: Return the actual sequence.
*   **Group Anagrams**:
    *   Variation: Check if two strings are anagrams (sort both, or use character frequency maps).
*   **Valid Anagram**: Check if two strings are anagrams of each other.
    *   Solution: Use a frequency map (or array if character set is small) for one string, then decrement for the second.
*   **First Unique Character in a String**:
    *   Solution: Use a frequency map to count character occurrences, then iterate through the string again to find the first character with a count of 1.
*   **Ransom Note**: Determine if a ransom note can be constructed from a magazine.
    *   Solution: Frequency map for magazine characters, then check against note characters.
*   **Top K Frequent Elements**:
    *   Solution: Frequency map, then heap/priority queue or bucket sort for top K.
*   **LRU Cache**: (Least Recently Used Cache)
    *   Solution: Requires a `Map` (for O(1) lookups by key) and a `DoublyLinkedList` (for O(1) order updates and removing LRU). This is a more advanced problem testing both data structures.
*   **Design a Hash Map/Set**: (As implemented in this project!)
    *   This tests your fundamental understanding of collision resolution, resizing, hash functions, and equality.
    *   Be ready to discuss the trade-offs between separate chaining and open addressing.
*   **Intersection of Two Arrays**:
    *   Solution: Put elements of one array into a `Set`, then iterate through the second array, adding common elements to a result set.
*   **Subarray Sum Equals K**:
    *   Solution: Uses a prefix sum with a hash map to count occurrences of `(prefix_sum - K)`.

## When *NOT* to use a Hash Table

While powerful, hash tables aren't always the best choice:

*   **Ordered Data**: If you need to maintain order or find elements based on order (e.g., minimum/maximum, nearest neighbor), a balanced binary search tree (like a TreeMap or TreeSet) or a sorted array might be better. Hash tables have no inherent order.
*   **Memory Constraints**: Hash tables often require more memory than other data structures due to storing keys, values, pointers for collision chains, and potentially empty buckets.
*   **Worst-Case Performance**: While average case is O(1), worst-case can be O(N) for all operations if hash collisions are not handled well (or maliciously exploited). This is a concern in security-sensitive applications.
*   **Range Queries**: Finding all elements within a certain range is inefficient (requires iterating through all buckets).

## Deep Dive: Hash Table Internals

If asked to implement a hash table from scratch (like in `src/main.ts`), be ready to explain:

1.  **Hash Function**:
    *   Purpose: Convert key to integer index.
    *   Qualities: Deterministic, fast, distributes keys uniformly across buckets.
    *   Examples: Polynomial rolling hash for strings, simple modulo for integers.
    *   Handling `hashCode` results: Often, `(hashCode % capacity)` is used to get the bucket index. Remember to handle negative hash codes (e.g., `(hashCode & 0x7fffffff) % capacity`).

2.  **Collision Resolution**:
    *   **Separate Chaining**: Each bucket stores a linked list (or dynamic array) of key-value pairs that hash to that index.
        *   **Pros**: Simple to implement, never "runs out" of space, graceful degradation.
        *   **Cons**: Extra memory for pointers, cache performance can be worse due to scattered nodes.
    *   **Open Addressing**: All elements stored directly in the bucket array. When a collision occurs, find the *next available slot*.
        *   **Linear Probing**: Check `(index + 1) % capacity`, then `(index + 2) % capacity`, etc.
            *   **Pros**: Good cache performance (sequential access).
            *   **Cons**: **Primary clustering** (long runs of occupied slots), can lead to slow performance.
        *   **Quadratic Probing**: Check `(index + 1^2) % capacity`, `(index + 2^2) % capacity`, etc.
            *   **Pros**: Reduces primary clustering.
            *   **Cons**: **Secondary clustering** (elements with same initial hash follow same probe sequence).
        *   **Double Hashing**: Use a second hash function to determine the step size for probing.
            *   **Pros**: Reduces both types of clustering.
            *   **Cons**: More complex, requires a second hash function.
        *   **Open Addressing Considerations**: Requires a deletion strategy (e.g., marking slots as `DELETED` instead of `null` to avoid breaking probe sequences).

3.  **Resizing (Rehashing)**:
    *   When the `load factor` (items / capacity) exceeds a threshold (e.g., 0.7 or 0.75 for separate chaining, lower for open addressing).
    *   Create a new, larger array (e.g., double the size).
    *   Iterate through *all* existing items in the old hash table and `re-insert` them into the new table. This is because `(hash_code % old_capacity)` is different from `(hash_code % new_capacity)`.
    *   This is an `O(N)` operation, but amortized cost over many operations keeps average time O(1).

## Conclusion

Hash Tables are incredibly versatile and efficient for a wide range of problems. A strong grasp of their implementation details, performance characteristics, and common applications will significantly boost your confidence and success in technical interviews.
```