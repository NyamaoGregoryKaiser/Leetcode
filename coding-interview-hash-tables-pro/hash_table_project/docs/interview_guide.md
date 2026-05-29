# Hash Table Interview Guide

Hash tables (or hash maps) are one of the most frequently tested data structures in coding interviews. Mastering them is crucial for success. This guide provides tips, common scenarios, and follow-up questions.

## 1. Why Hash Tables? When to Use Them?

**Key Advantage**: O(1) average time complexity for insertion, deletion, and lookup.

**Use Cases / When to Consider**:
1.  **Fast Lookups/Membership Testing**: When you need to quickly check if an item exists (`contains`, `get`).
    -   *Example*: Checking for complements in Two Sum.
    -   *Example*: Detecting duplicates.
    -   *Example*: `set` data structure is often implemented using hash tables.
2.  **Frequency Counting**: When you need to count occurrences of items.
    -   *Example*: Counting characters in a string, words in a document.
    -   *Example*: Grouping anagrams by character counts.
3.  **Grouping/Categorization**: When you need to group items based on a common property.
    -   *Example*: Grouping anagrams using a canonical form (e.g., sorted string) as the key.
4.  **Memoization/Caching**: Storing results of expensive function calls to avoid recomputing.
    -   *Example*: Dynamic programming problems.
5.  **Unique Element Storage**: When you need to store only unique elements.
    -   *Example*: `set` in Python, `HashSet` in Java.

## 2. Common Pitfalls & Considerations

1.  **Key Choice**: The most critical aspect.
    -   **Keys must be hashable (immutable)**: Integers, strings, tuples are hashable. Lists, sets, dictionaries are *not*.
    -   **Canonical Representation**: For problems like "Group Anagrams," you need a consistent (canonical) key for all equivalent items.
        -   *Example*: `sorted("eat")` and `sorted("tea")` both become `"aet"`.
        -   *Example*: A tuple of character counts `(freq_a, freq_b, ..., freq_z)`.
2.  **Collisions**: Be aware that hash collisions can degrade performance to O(N) in the worst case.
    -   Python's `dict` is highly optimized to minimize this, but it's a theoretical consideration.
3.  **Space-Time Tradeoff**: Hash tables offer speed at the cost of space (O(N) space complexity). Always mention this trade-off.
4.  **Order**: Hash maps generally do *not* guarantee order of insertion (Python's `dict` preserves insertion order since 3.7, but this is an implementation detail not a guaranteed property for abstract hash maps). If order matters, you might need a `collections.OrderedDict` or a different data structure.
5.  **Edge Cases**:
    -   Empty input (`[]`, `""`, `None`)
    -   Single element input
    -   Duplicates
    -   Negative numbers, zeros
    -   Very large inputs (impacts performance/memory)
    -   All elements are the same (e.g., `[1,1,1,1]`)
    -   All elements are unique

## 3. Interview Walkthrough Steps

1.  **Understand the Problem**: Clarify constraints, input/output format, examples.
2.  **Brainstorm Approaches**:
    -   Start with brute force (e.g., nested loops for `Two Sum`). Analyze its complexity. This shows you understand the baseline.
    -   **Identify opportunities for hash tables**:
        -   "Do I need fast lookups?" -> Yes, use `dict` or `set`.
        -   "Am I counting frequencies?" -> Yes, use `dict` or `collections.Counter`.
        -   "Am I grouping items by a property?" -> Yes, use `dict` with a canonical key.
3.  **Choose Optimal Hash Table Approach**:
    -   Decide what will be your `key` and what will be your `value`.
    -   Walk through an example with the chosen approach.
4.  **Analyze Complexity**: State time and space complexity for your chosen solution. Explain average vs. worst case.
5.  **Code**: Write clean, commented code.
6.  **Test**: Mentally walk through your code with edge cases.

## 4. Interview Tips & Discussion Points

-   **Talk through your thought process**: Don't just jump to the optimal solution. Explain *why* you considered brute force and *why* a hash table improves it.
-   **Explain the trade-offs**: Always mention that hash tables offer O(1) average time but use O(N) space.
-   **Discuss different hash table implementations**: Briefly mention chaining vs. open addressing if asked about internals. Our `CustomHashMap` in `utils/` uses chaining.
-   **Discuss Python's `dict`**: Python's dictionary is a highly optimized hash map. It handles collisions, resizing, and provides excellent average-case performance.
-   **"What if..." follow-up questions**:
    -   "What if the keys are mutable objects?" (Answer: Cannot be directly used as keys. Need a hashable representation or unique ID).
    -   "What if there are memory constraints?" (Answer: Might need to consider space-saving alternatives, or a more memory-efficient custom hash table (e.g., using `bytearray` for very specific character sets, but usually Python's objects are not the bottleneck). Or, if dealing with a huge number of items, external hashing or databases).
    -   "What if the hash function is bad?" (Answer: Performance degrades to O(N) worst case. A good hash function is crucial.)
    -   "What if duplicates are allowed/handled differently?" (Adjust logic to store lists of indices or counts in values).

## 5. Example Questions (Beyond the Project)

-   **Contains Duplicate**: Given an array, return `true` if any value appears at least twice. (Hash Set)
-   **Valid Anagram**: Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`. (Hash Map/Count Array)
-   **Intersection of Two Arrays**: Find all common elements. (Hash Sets)
-   **First Unique Character in a String**: Find the first non-repeating character and return its index. (Hash Map for counts, then iterate string)
-   **Majority Element**: Find the element that appears more than `n/2` times. (Hash Map for counts)
-   **Ransom Note**: Check if a ransom note can be constructed from a magazine. (Hash Map for character counts)
-   **Longest Substring Without Repeating Characters**: Find the length of the longest substring without repeating characters. (Sliding Window + Hash Set/Map)

By understanding these concepts and practicing with the provided problems, you will be well-prepared for hash table questions in coding interviews.