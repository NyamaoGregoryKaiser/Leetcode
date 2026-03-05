```markdown
# Hash Table Interview Tips and Variations

This document provides guidance on how to approach hash table questions in coding interviews, common variations, and general tips for success.

---

## 1. When to Consider Hash Tables

Hash tables (`std::unordered_map`, `std::unordered_set` in C++) are incredibly versatile and should be considered whenever you need:

*   **`O(1)` Average Time Complexity for Lookup/Insertion/Deletion:** This is the primary advantage. If you need quick access to elements based on a key, a hash table is usually the first choice.
*   **Frequency Counting:** Counting occurrences of elements (characters, words, numbers) in a collection.
*   **Checking for Existence/Duplicates:** Efficiently determining if an element is present in a collection or identifying unique elements.
*   **Grouping/Categorization:** Grouping items based on a derived key (e.g., anagrams, objects with similar properties).
*   **Mapping Relationships:** Storing `key -> value` pairs where `key` is not necessarily sequential or ordered.
*   **Caching:** Storing frequently accessed data for quick retrieval.

**When NOT to use them (or consider alternatives):**

*   **Ordered Data:** If you need elements to be sorted or iterated in a specific order (e.g., ascending/descending keys), a `std::map` (tree-based) is a better choice.
*   **Range Queries:** Hash tables are not efficient for finding all elements within a certain range.
*   **Guaranteed Worst-Case Performance:** While average-case is `O(1)`, worst-case (due to many collisions or poor hash function) can degrade to `O(N)`. If strict `O(log N)` or `O(N)` worst-case guarantees are needed, tree-based maps (`std::map`) might be preferred.
*   **Memory Constraints:** Hash tables typically consume more memory than other data structures due to storing keys, values, and managing buckets/chains, especially with a low load factor.
*   **Predictable Iteration Order:** Iterating `unordered_map`/`unordered_set` has no guaranteed order.

---

## 2. Common Hash Table Problem Patterns

*   **Frequency Maps:** Keep track of how many times each item appears.
    *   *Example:* First Unique Character, find majority element.
*   **Two-Pass Scan:** First pass to build the map, second pass to use it.
    *   *Example:* First Unique Character.
*   **One-Pass Scan:** Build the map and use it concurrently.
    *   *Example:* Two Sum.
*   **Preprocessing for Fast Lookups:** Store all elements in a set/map for quick `O(1)` checks later.
    *   *Example:* Longest Consecutive Sequence.
*   **Custom Keys:** Transform input data into a canonical form to serve as a hash map key.
    *   *Example:* Group Anagrams (sorted string or character count array).
*   **Prefix Sums/XOR:** For problems involving subarrays or ranges, hash maps can store prefix sums/XORs to find specific sub-ranges efficiently.
    *   *Example:* Subarray sum equals K, longest subarray with sum K.
*   **Sliding Window with Hash Map:** Maintain counts/presence of elements in a window.
    *   *Example:* Longest substring without repeating characters, minimum window substring.

---

## 3. Interview Questions and Variations

Be prepared for variations and follow-up questions for common problems:

### Two Sum
*   **Variation 1: Multiple Solutions:** If there are multiple pairs, return *any* pair, *all* pairs, or the pair with the *smallest/largest* indices.
*   **Variation 2: Sorted Array:** If the array is sorted, you can use a two-pointer approach (`O(N)` time, `O(1)` space), which is often preferred over hash map for space efficiency.
*   **Variation 3: Return Elements/Values:** Instead of indices, return the actual numbers.
*   **Variation 4: Three Sum/K-Sum:** How would you extend this to find three numbers (or K numbers) that sum to a target? (Often involves sorting and reducing to `Two Sum` subproblems for `K > 2`).

### Longest Consecutive Sequence
*   **Variation 1: Return the Sequence Itself:** Instead of just length, return the actual numbers in the longest sequence.
*   **Variation 2: Negative Numbers/Large Numbers:** Ensure your solution handles the full integer range.
*   **Variation 3: Gaps:** What if there are large gaps? Does your `O(N)` approach still hold up? (Yes, because it only explores sequences that might exist).

### Group Anagrams
*   **Variation 1: Different Character Sets:** What if the input strings contain Unicode characters, or numbers, or special symbols? How would your key generation strategy adapt? (Sorted string key is more general).
*   **Variation 2: Case Sensitivity:** Treat 'A' and 'a' as same or different?
*   **Variation 3: Return Smallest/Largest Anagram Group:** After grouping, filter based on size.

### First Unique Character
*   **Variation 1: Multiple Unique Characters:** Return index of the first one.
*   **Variation 2: Different Character Sets:** As discussed, `unordered_map` handles general ASCII/Unicode, fixed array is better for small, known alphabets.
*   **Variation 3: String Stream:** If the input is a stream of characters, how would you find the first unique character at any point? (Often involves a queue for order + a frequency map).

### Designing a Hash Map (Follow-up to Using Hash Maps)
If you use `std::unordered_map`, be prepared to answer questions about its internal workings:
*   **Hash Function:** What is a hash function? What makes a good one? How would you design one for strings? Custom objects?
*   **Collision Resolution:** Explain chaining vs. open addressing (linear probing, quadratic probing). Discuss their trade-offs (memory, cache performance, deletion complexity).
*   **Load Factor and Resizing:** What is the load factor? When and why does a hash table resize? What are the implications of resizing?
*   **Time Complexity Analysis:** Explain why average-case is `O(1)` and worst-case is `O(N)`.
*   **`std::map` vs. `std::unordered_map`:** When to choose one over the other. (Ordering, worst-case guarantees, memory usage).

---

## 4. General Interview Tips for Hash Table Problems

*   **Clarify Constraints:** Before coding, ask about input size (N, K), character set, range of numbers, duplicates, negative numbers, empty inputs, guaranteed solutions, time/space complexity requirements.
*   **Start with Brute Force (if applicable):** If you don't immediately see the optimal solution, explain a brute-force approach first. This shows you understand the problem and can establish a baseline. Then, identify its inefficiencies and brainstorm improvements.
*   **Think Hash Tables:** If you see any of the "when to consider" keywords (lookup, frequency, existence, grouping), immediately think hash tables.
*   **Identify the Key:** What information will you use to group/lookup elements? This forms your hash map key.
*   **Identify the Value:** What information do you need to store with that key? This forms your hash map value.
*   **Walk Through Examples:** Manually trace your chosen algorithm with small examples, including edge cases. This helps catch bugs and clarify your logic.
*   **Discuss Complexity:** Always state and justify the time and space complexity of your solution. Compare it to other approaches you considered.
*   **Talk Through Your Code:** Explain your thought process as you code. This lets the interviewer understand your reasoning, even if you make minor syntax errors.
*   **Test Cases:** After coding, provide a few test cases (happy path, edge cases, tricky inputs) and explain what you expect the output to be.
*   **Language-Specifics:** Understand the `unordered_map` and `unordered_set` in your chosen language (e.g., C++ `std::unordered_map`, Java `HashMap`, Python `dict`). Know their average and worst-case complexities. Be aware of custom hash functions for user-defined types.

By mastering these concepts and practicing with a variety of problems, you'll be well-prepared to tackle hash table questions in any technical interview.
```