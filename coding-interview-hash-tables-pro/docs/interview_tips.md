# Hash Table Interview Tips and Variations

Hash tables (often implemented as `std::unordered_map` or `std::unordered_set` in C++) are fundamental data structures and a staple in coding interviews. Mastering them involves understanding their core principles, performance characteristics, and common application patterns.

---

## 1. Why Hash Tables? (The Core Pitch)

Always start with *why* a hash table is a good fit for the problem.
*   **Fast Lookups/Insertions/Deletions**: Explain that on average, these operations are O(1). This is the primary reason for choosing them.
*   **Efficient Frequency Counting**: Perfect for counting occurrences of elements (e.g., character frequencies, word counts).
*   **Eliminating Duplicates**: `std::unordered_set` automatically stores unique elements, making it ideal for problems requiring distinct values.
*   **Grouping/Categorization**: When items need to be grouped based on a characteristic (e.g., anagrams, custom object attributes), a hash table can map the characteristic to a list of items.
*   **Caching/Memoization**: For storing results of expensive computations.

---

## 2. Key Concepts to Discuss (Be Ready for Follow-ups)

*   **Hash Function**:
    *   What it does: Maps a key to an integer index (hash code).
    *   Qualities of a good hash function: deterministic, uniform distribution, fast to compute.
    *   `std::hash`: Mention that C++'s `unordered_map`/`set` use `std::hash` by default for primitive types and strings.
    *   **Custom Objects**: If your key is a custom struct/class, you *must* provide a custom hash function (by specializing `std::hash` or passing a custom hash functor to the `unordered_map` constructor).
*   **Collisions**:
    *   What they are: When two different keys produce the same hash code.
    *   How they're handled:
        *   **Chaining**: Each bucket stores a linked list of key-value pairs. This is common in `std::unordered_map`.
        *   **Open Addressing**: If a target bucket is occupied, probe for the next available slot (linear probing, quadratic probing, double hashing).
    *   Impact: Poor collision resolution (or a bad hash function) leads to many elements in the same bucket, degrading average O(1) to O(N) (like a linked list lookup).
*   **Load Factor and Resizing**:
    *   **Load Factor**: `(number of elements) / (number of buckets)`.
    *   **Resizing**: When the load factor exceeds a threshold, the hash table resizes (creates more buckets). This involves rehashing all existing elements into the new, larger table.
    *   Impact: Resizing is an O(N) operation. While individual operations are amortized O(1), it's important to be aware of this cost. Pre-allocating buckets (e.g., `reserve` method or constructor) can avoid early resizes.
*   **Trade-offs**:
    *   **Time vs. Space**: Hash tables offer great time complexity (O(1) average) but typically at the cost of O(N) space complexity. Always articulate this trade-off.
    *   **Unordered vs. Ordered**: `std::unordered_map` provides O(1) average time but no order guarantee. `std::map` (a balanced binary search tree) provides O(log N) time but maintains sorted order. Choose based on problem requirements.

---

## 3. Common Problem Patterns

*   **Frequency/Count Problems**:
    *   "Find the most frequent element."
    *   "Are two strings anagrams?" (Count characters).
    *   "Find duplicates in an array."
*   **Lookup/Existence Problems**:
    *   "Two Sum" (check for complement).
    *   "Contains Duplicate."
    *   "Longest Consecutive Sequence" (check for `num - 1` and `num + 1`).
*   **Grouping Problems**:
    *   "Group Anagrams" (canonical form as key).
    *   "Group similar objects."
*   **Caching**:
    *   LRU, LFU, etc., often use hash maps as a core component for O(1) access to items.
*   **Finding Intersections/Differences**:
    *   `std::unordered_set` can efficiently find common elements or unique elements between collections.

---

## 4. Interview Strategy and Variations

*   **Clarify Constraints**:
    *   Input size (`N`)? Data range? Time/Space complexity requirements?
    *   What about duplicates? Negative numbers? Empty inputs?
    *   Are keys mutable? (Modifying a key in a hash map can lead to undefined behavior if its hash code changes).
*   **Start with Brute Force (if applicable)**: Briefly explain the brute-force O(N^2) or O(N log N) solution. This shows you understand the problem fully and establishes a baseline.
*   **Transition to Optimal**: Explain *how* the hash table improves on the brute force, specifically targeting the bottleneck.
*   **Walk Through an Example**: Use a small, custom example to demonstrate your algorithm's steps clearly. Show how the hash table's state changes.
*   **Analyze Complexity**: Clearly state the time and space complexity for your optimal solution, explaining *why* it's O(N) or O(1) on average. Mention worst-case for hash tables.
*   **Discuss Edge Cases**: Proactively bring up relevant edge cases (empty input, duplicates, large values, etc.) and explain how your solution handles them.
*   **Code Cleanly**: Use meaningful variable names, add comments for complex logic, and organize your code well.
*   **Ask Questions**:
    *   "Are there any specific constraints on the input values, like positive integers only?"
    *   "Should I prioritize time or space complexity if there's a trade-off?"
    *   "How should I handle ties for eviction in LFU cache?" (Crucial for LFU).

### Common Variations/Extensions:

*   **Custom Hashable Objects**: Be prepared to define `struct MyKey { int x, y; };` and a custom hash functor:
    ```cpp
    struct PointHash {
        size_t operator()(const MyKey& p) const {
            return std::hash<int>()(p.x) ^ (std::hash<int>()(p.y) << 1);
        }
    };
    std::unordered_map<MyKey, int, PointHash> myMap;
    ```
    And potentially `operator==` if not using default comparison.
*   **Two Sum Variations**:
    *   Return actual numbers instead of indices.
    *   Return all pairs that sum to target.
    *   Find triplets/quadruplets that sum to target (often solvable with hash tables in N^2 or N^3).
*   **LRU/LFU without standard library lists**: If restricted from `std::list`, you might need to implement a basic doubly linked list manually. This is a significantly harder task.
*   **"Top K" or "K Most Frequent"**: Often use a hash map for counts, then a min-heap (priority queue) to find the top K.

By being articulate, thoughtful, and proactive in discussing these points, you can significantly impress interviewers and demonstrate a deep understanding beyond just getting the code to work.

---