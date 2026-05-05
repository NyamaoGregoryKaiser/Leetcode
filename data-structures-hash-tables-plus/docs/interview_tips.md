# Hash Tables: Interview Tips and Variations

Hash tables are frequently tested in coding interviews because they demonstrate an understanding of efficient data structures and algorithms. Here's a guide to approaching hash table problems, what to ask, and common variations.

## 1. How to Approach a Hash Table Problem in an Interview

A structured approach can help you tackle any problem, especially those solvable with hash tables.

1.  **Understand the Problem (Clarification)**:
    *   **Input**: What are the constraints on input size (N), element values (range, negative, zero, duplicates?), string length, character set?
    *   **Output**: What is the expected format? Indices? Booleans? Collections?
    *   **Edge Cases**: Ask about empty inputs, single element inputs, very large/small values.
    *   **Uniqueness/Order**: Does the order of elements matter in the output? Are duplicates allowed in the input/output?
    *   **Guarantees**: Is there always a solution (e.g., "exactly one solution" for Two Sum)?
    *   **Time/Space Constraints**: Are there explicit `O(N)` or `O(1)` space requirements? (This is a huge hint for hash tables vs. sorting).

2.  **Generate Examples**:
    *   Start with a simple example provided by the interviewer.
    *   Create one or two more complex examples that cover edge cases (e.g., duplicates, negatives, large inputs).
    *   Walk through your examples manually to ensure you understand the desired output.

3.  **Brainstorm Approaches (Brute Force First)**:
    *   **Brute Force**: Always start with the simplest, most straightforward solution. This shows you can solve the problem, even if inefficiently. Describe its time and space complexity.
        *   Example (Two Sum): Nested loops `O(N^2)`.
    *   **Optimization**: How can we improve the brute force?
        *   **Sorting**: Can sorting help? This often brings `O(N log N)` solutions. (e.g., Longest Consecutive Sequence, Contains Duplicate).
        *   **Hash Table**: This is where you pivot if lookups/frequency counting are key. If you need to check for existence, count frequencies, or group items by a derived key, a hash table is likely the answer.
            *   "Can I store previously seen data for quick lookups?"
            *   "Do I need to count occurrences of items?"
            *   "Can items be grouped by a canonical representation?"

4.  **Deep Dive into Hash Table Solution**:
    *   **Data Structure Choice**: `unordered_map<Key, Value>` for key-value pairs, `unordered_set<Key>` for unique elements/existence checks.
    *   **Key Design**: What will be the key? The element itself? A transformation of the element (e.g., sorted string for anagrams)?
    *   **Value Design**: What needs to be stored with the key? Index? Count? List of items?
    *   **Algorithm Steps**: Outline the steps clearly.
    *   **Walkthrough**: Explain how your hash table solution works with one of your examples.

5.  **Complexity Analysis**:
    *   Clearly state the **Time Complexity** (average and worst-case for hash tables) and **Space Complexity** of your optimized solution.
    *   Justify why it's better than brute force or other alternatives.

6.  **Code the Solution**:
    *   Write clean, readable code.
    *   Use meaningful variable names.
    *   Add comments for non-obvious logic.
    *   Handle edge cases (from step 1 and 2) explicitly.

7.  **Test and Debug**:
    *   Manually test your code with your chosen examples, including edge cases.
    *   Mentally trace the execution. Look for off-by-one errors, infinite loops, or incorrect map/set accesses.
    *   Consider the maximum possible values and how they interact with `int` limits.

## 2. Common Interviewer Questions and Discussion Points

*   **"Why did you choose `unordered_map` over `map` (or `unordered_set` over `set`)?"**
    *   Answer: `unordered_map` provides average O(1) time complexity for operations, which is faster than `map`'s O(log N). I chose it because the problem doesn't require sorted keys, and optimal average-case speed is preferred. I'm aware of the worst-case O(N) for `unordered_map` but it's rare with good hash functions.
*   **"What is a hash collision? How do hash tables handle them?"**
    *   Answer: A collision is when two different keys produce the same hash value. `std::unordered_map` typically uses **chaining**, where each bucket contains a linked list (or vector) of all key-value pairs that hash to that bucket. Other methods include **open addressing** (linear/quadratic probing).
*   **"What is the load factor? How does it affect performance?"**
    *   Answer: Load factor is `(number of elements) / (number of buckets)`. A high load factor increases collisions, degrading performance towards O(N). When it exceeds `max_load_factor()`, the hash table rehashes, which is an O(N) operation.
*   **"Can you implement a custom hash function for `std::pair<int, int>` (or a custom object)?"**
    *   Be ready to show how `std::hash` works or provide a custom struct. For `std::pair`, you'd combine hashes of individual elements.
*   **"What are the pros and cons of hash tables?"**
    *   **Pros**: Average O(1) operations, fast lookups, efficient for frequency counting/grouping.
    *   **Cons**: Worst-case O(N) operations, higher memory usage than arrays/vectors, elements are unordered, performance depends on good hash function.
*   **"When would you choose a hash table over a balanced binary search tree (like `std::map`)?"**
    *   Choose hash table for fastest average-case performance when order doesn't matter.
    *   Choose BST (`std::map`) when you need ordered traversal, guaranteed O(log N) worst-case performance, or when memory locality is a concern.

## 3. Interview Tips Specific to Hash Table Problems

*   **Look for "Existence" or "Frequency"**: Phrases like "check if an element exists," "count occurrences," "group by a property," or "find pairs/triplets" are strong indicators for hash tables.
*   **"O(N) Time" Constraint**: If a problem has an O(N) time constraint and a naive solution is O(N^2) (e.g., nested loops), a hash table is often the key to optimizing it to O(N).
*   **Don't Forget Space Complexity**: Hash tables often use O(N) space. Be prepared to justify this trade-off for the improved time complexity.
*   **Clear Key/Value Logic**: Clearly articulate what your keys and values will represent and why.
*   **Handle Duplicates in Input**: Consider how duplicates might affect your hash table logic. `unordered_set` naturally handles unique elements, while `unordered_map` allows you to count them.
*   **Mutable Keys are Dangerous**: If you pass a custom object as a key, ensure its hash-relevant fields are immutable or that you don't modify the object while it's in the map.

## 4. Common Variations of Problems

### General Patterns
*   **k-Sum Problem**: A generalization of Two Sum. Find `k` numbers that sum to a target. Can be solved by extending the hash map idea (e.g., for 3-Sum, fix one number, then solve 2-Sum for the rest) or by sorting + two pointers.
*   **Sliding Window with Hash Map**: For problems involving subarrays or substrings with certain properties (e.g., "longest substring with K distinct characters"), hash maps can track frequencies of characters/elements within the window.
*   **LRU Cache / LFU Cache**: These data structures combine a hash map (for O(1) lookups) with a doubly linked list (for O(1) updates to recency/frequency).
*   **Disjoint Set Union (DSU)**: While not directly a hash table problem, DSU often uses a `map<int, int>` or `map<Node*, Node*>` to represent parent pointers if the elements are not contiguous integers.

### Variations of Project Problems

*   **Two Sum**:
    *   Return the elements themselves instead of indices.
    *   Find *all* pairs that sum to target.
    *   Find triplets (3-Sum) or k-tuples (k-Sum).
    *   Return only `true`/`false` if a pair exists.
*   **Longest Consecutive Sequence**:
    *   Return the actual sequence, not just its length.
    *   Find `k` longest consecutive sequences.
    *   Given an array of ranges `[start, end]`, merge overlapping ranges. (Can be solved with sorting, but also map-based approaches for complex merge criteria).
*   **Group Anagrams**:
    *   Handle strings with mixed cases or non-alphabetic characters (e.g., `groupAnagrams({"Race", "Care"})` should group them).
    *   Find if two specific strings are anagrams of each other (simpler, just sort both or count chars).
*   **First Unique Character**:
    *   Find *all* unique characters and their indices.
    *   Find the `k`-th unique character.
    *   Handle strings with extended ASCII or Unicode characters (requires a larger frequency map, e.g., `std::unordered_map<char, int>`).
    *   First non-repeating character in a *stream* (requires more advanced data structures like `std::list` + `std::unordered_map`).
*   **Contains Duplicate**:
    *   Contains duplicate II: `nums` and `k`, return true if there are two distinct indices `i` and `j` in the array such that `nums[i] == nums[j]` and `abs(i - j) <= k`. (Sliding window with hash set).
    *   Contains duplicate III: `nums`, `k`, and `t`, return true if there are two distinct indices `i` and `j` in the array such that `abs(nums[i] - nums[j]) <= t` and `abs(i - j) <= k`. (More complex, often uses a `multiset` or `map` in a sliding window).
    *   Find all duplicates (return a list of duplicates).

By familiarizing yourself with these variations and understanding the core principles of hash tables, you'll be well-prepared to tackle a wide range of interview questions.