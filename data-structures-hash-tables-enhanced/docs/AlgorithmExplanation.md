```markdown
# Algorithm Explanations, Diagrams, Edge Cases, and Interview Tips

This document provides a detailed breakdown of the algorithms implemented in `HashTableProblems.java`, including conceptual explanations, visual aids (ASCII diagrams), considerations for edge cases, and useful interview tips.

---

## 1. Two Sum

**Problem Statement:** Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

### Optimal Solution: Using a HashMap

**Concept:**
The core idea is to quickly check if the "complement" of the current number (i.e., `target - currentNum`) has been seen before. A Hash Map (or Hash Table) is ideal for this because it offers average O(1) time complexity for insertions and lookups.

**Algorithm:**
1.  Initialize an empty `HashMap` where keys are numbers from the array and values are their indices. `Map<Integer, Integer> numMap = new HashMap<>();`
2.  Iterate through the `nums` array with an index `i` from `0` to `nums.length - 1`.
3.  For each `nums[i]`:
    a.  Calculate the `complement = target - nums[i]`.
    b.  Check if `numMap` already contains `complement` as a key.
        *   If `numMap.containsKey(complement)` is true, it means we have found two numbers that sum up to `target`: the `complement` (whose index is `numMap.get(complement)`) and the `currentNum` (at index `i`). Return `[numMap.get(complement), i]`.
        *   If `complement` is not in the map, add the `currentNum` and its index `i` to the map: `numMap.put(nums[i], i)`. This makes `currentNum` available as a complement for future numbers.
4.  If the loop completes without finding a solution (though the problem guarantees one), throw an `IllegalArgumentException`.

**Time Complexity:** O(N)
*   The array is iterated once.
*   HashMap `put` and `containsKey` operations are O(1) on average.

**Space Complexity:** O(N)
*   In the worst case (e.g., solution is the last two elements), all N elements might be stored in the HashMap.

**ASCII Diagram (Example: nums = [2, 7, 11, 15], target = 9)**

```
Iteration 1: i = 0, nums[0] = 2
  complement = 9 - 2 = 7
  numMap: {}
  numMap.containsKey(7)? No
  Add (2 -> 0) to map.
  numMap: {2: 0}

Iteration 2: i = 1, nums[1] = 7
  complement = 9 - 7 = 2
  numMap: {2: 0}
  numMap.containsKey(2)? Yes! (value is 0)
  Found pair: indices are 0 (for 2) and 1 (for 7).
  Return [0, 1]
```

**Edge Cases & Gotchas:**
*   **Duplicate Numbers:** If `nums = [3, 3]` and `target = 6`, the algorithm correctly finds `[0, 1]` because `nums[0]` is added to the map before `nums[1]` is processed. When `nums[1]` is processed, `complement = 3` is found, referring to `nums[0]`'s index.
*   **Empty Array/Single Element:** The problem implies at least two numbers as it asks for *two* indices. An empty or single-element array would naturally not yield a solution.
*   **Large Numbers/Negative Numbers:** HashMap handles `Integer` objects correctly, so these don't pose a special problem.

**Interview Tips & Variations:**
*   **Follow-up 1:** What if there are multiple pairs that sum to the target?
    *   Modify to return a `List<int[]>` or `List<Pair<Integer, Integer>>`.
*   **Follow-up 2:** What if you need to return the numbers themselves, not their indices?
    *   Slightly simpler, just return `[complement, currentNum]`.
*   **Follow-up 3:** What if you can use the same element twice (e.g., for `target = 6` in `[3, 5]`, return `[0, 0]`)?
    *   The current solution implicitly handles this if the complement is the number itself (`target = 2 * currentNum`) and that number's index is different from the current index. If same index is allowed, one might add `nums[i]` before the `containsKey` check, or use a `Map<Integer, List<Integer>>` to store all indices for a number. For standard "two sum", distinct elements are usually implied.
*   **Constraint: O(N) time.** This is the prompt for the HashMap solution. If not specified, a brute-force approach (O(N^2)) would be a valid first step to discuss.

---

## 2. Longest Consecutive Sequence

**Problem Statement:** Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence. The algorithm must run in O(N) time.

### Optimal Solution: Using a HashSet

**Concept:**
The challenge is to achieve O(N) without sorting (which is O(N log N)). A `HashSet` allows for O(1) average time lookups, which is key. We want to find the *start* of each potential sequence and then extend it. If a number `x` has `x-1` in the set, `x` cannot be the start of a new sequence (it's part of a sequence starting at `x-1` or earlier).

**Algorithm:**
1.  Initialize a `HashSet<Integer>` and add all elements from `nums` into it. This allows O(1) average time checking for existence.
2.  Initialize `maxLength = 0`.
3.  Iterate through each `num` in the `HashSet` (or original `nums` array).
4.  For each `num`:
    a.  Check if `num - 1` **is NOT** present in the `HashSet`. This is the crucial step to identify the start of a consecutive sequence.
        *   If `num - 1` is present, `num` is part of an existing sequence, so we skip it to avoid redundant calculations.
    b.  If `num - 1` is not present, then `num` is a potential starting point of a new consecutive sequence.
        *   Initialize `currentNum = num` and `currentLength = 1`.
        *   While `numSet.contains(currentNum + 1)`:
            *   Increment `currentNum` and `currentLength`.
        *   Update `maxLength = Math.max(maxLength, currentLength)`.
5.  Return `maxLength`.

**Time Complexity:** O(N)
*   Adding N elements to `HashSet`: O(N) average.
*   Iterating through `nums` (or `numSet`): O(N).
*   Inside the loop, `numSet.contains()` is O(1) average.
*   The inner `while` loop iterates `currentLength` times. Importantly, each number in the `numSet` is visited at most a constant number of times across all `while` loops combined (once when checking if it's a start, and once when being incremented `currentNum++`). Thus, the total work for all inner `while` loops is O(N).
*   Total: O(N).

**Space Complexity:** O(N)
*   To store all unique numbers in the `HashSet`.

**ASCII Diagram (Example: nums = [100, 4, 200, 1, 3, 2])**

```
1. numSet = {100, 4, 200, 1, 3, 2}
2. maxLength = 0

Iterate through numSet:

- num = 100:
  - numSet.contains(99)? No. -> 100 is a start.
  - currentNum = 100, currentLength = 1
  - numSet.contains(101)? No.
  - maxLength = max(0, 1) = 1

- num = 4:
  - numSet.contains(3)? Yes. Skip. (3 is handled when we start from 1)

- num = 200:
  - numSet.contains(199)? No. -> 200 is a start.
  - currentNum = 200, currentLength = 1
  - numSet.contains(201)? No.
  - maxLength = max(1, 1) = 1

- num = 1:
  - numSet.contains(0)? No. -> 1 is a start.
  - currentNum = 1, currentLength = 1
  - numSet.contains(2)? Yes. currentNum=2, currentLength=2
  - numSet.contains(3)? Yes. currentNum=3, currentLength=3
  - numSet.contains(4)? Yes. currentNum=4, currentLength=4
  - numSet.contains(5)? No.
  - maxLength = max(1, 4) = 4

- num = 3:
  - numSet.contains(2)? Yes. Skip.

- num = 2:
  - numSet.contains(1)? Yes. Skip.

Final maxLength = 4
```

**Edge Cases & Gotchas:**
*   **Empty Array:** Return 0. Handled.
*   **Single Element:** Return 1. Handled.
*   **Duplicates:** `HashSet` automatically handles duplicates, ensuring each unique number is considered once.
*   **Discontiguous Numbers:** The algorithm correctly finds longest sequences even if numbers are far apart in the original array.
*   **Negative Numbers:** `HashSet` handles negative integers correctly.

**Interview Tips & Variations:**
*   **Why O(N) and not N log N?** The O(N log N) solution involves sorting. The O(N) requirement strongly hints at using a hash-based data structure.
*   **How to prove O(N)?** Emphasize that each number is visited a constant number of times: once for insertion into the set, once as an element in the outer loop, and at most once as an incremented `currentNum` in an inner `while` loop.
*   **What if the array elements are very large (e.g., `long`)?** The approach remains the same, using `HashSet<Long>`.
*   **Return the sequence itself?** Store the `start` and `length` when `maxLength` is updated.

---

## 3. Group Anagrams

**Problem Statement:** Given an array of strings `strs`, group the anagrams together.

### Optimal Solution: Using a HashMap with Character Count Array as Key

**Concept:**
Anagrams are words formed by rearranging the letters of another. This means they have the same characters with the same frequencies. Instead of sorting the string (O(K log K) for string length K), we can count character frequencies (O(K)) and use this frequency distribution as a unique key in our HashMap.

**Algorithm:**
1.  Initialize an `HashMap<String, List<String>>` where the key is a canonical representation of the character counts, and the value is a list of strings that share this canonical form.
2.  Iterate through each `str` in the input array `strs`.
3.  For each `str`:
    a.  Create an `int[26]` array (for 'a' through 'z') to store character counts.
    b.  Iterate through the characters of `str` and increment the count for `c - 'a'` in the `charCounts` array.
    c.  Construct a unique `String` key from this `charCounts` array. A simple way is to append `#` and then the count for each character, e.g., `"#1#0#0#1..."`. This ensures different counts lead to different keys.
    d.  Use `anagramGroups.computeIfAbsent(key, k -> new ArrayList<>()).add(str);` This line is concise: if the `key` is not present, it creates a new `ArrayList` for it; otherwise, it retrieves the existing list. Then, it adds the original `str` to this list.
4.  Return a new `ArrayList` containing all the values (lists of anagrams) from the `anagramGroups` map.

**Time Complexity:** O(N * K)
*   N: number of strings in `strs`.
*   K: maximum length of a string.
*   For each of N strings:
    *   Iterating characters to build `charCounts`: O(K).
    *   Building the `key` string from `charCounts`: O(alpha) where alpha is the size of the alphabet (26 for English lowercase, a constant).
    *   HashMap operations (`computeIfAbsent`, `add` to `ArrayList`): O(1) on average.
*   Total: O(N * (K + alpha)) which simplifies to O(N * K).

**Space Complexity:** O(N * K)
*   The `HashMap` stores up to N entries (in the worst case, all strings are unique anagram groups).
*   Each `value` (list of strings) stores the original strings, totaling O(N * K) characters.
*   Each `key` (count string) has a fixed length (alpha), so `N * alpha` is negligible compared to `N * K`.

**ASCII Diagram (Example: strs = ["eat", "tea", "tan", "ate"])**

```
1. anagramGroups = {}

2. str = "eat"
   charCounts = [a:1, b:0, c:0, d:0, e:1, ..., t:1, ...]
   key = "#1#0#0#0#1#0...#1"
   anagramGroups.computeIfAbsent(key, ...) -> adds "eat"
   anagramGroups: { "#1#0#0#0#1#0...#1": ["eat"] }

3. str = "tea"
   charCounts = [a:1, b:0, c:0, d:0, e:1, ..., t:1, ...]
   key = "#1#0#0#0#1#0...#1" (Same key as "eat")
   anagramGroups.computeIfAbsent(key, ...) -> adds "tea" to existing list
   anagramGroups: { "#1#0#0#0#1#0...#1": ["eat", "tea"] }

4. str = "tan"
   charCounts = [a:1, b:0, c:0, d:0, e:0, ..., n:1, t:1, ...]
   key = "#1#0#0#0#0#0...#1...#1" (New key)
   anagramGroups.computeIfAbsent(key, ...) -> adds "tan"
   anagramGroups: {
     "#1#0#0#0#1#0...#1": ["eat", "tea"],
     "#1#0#0#0#0#0...#1...#1": ["tan"]
   }

5. str = "ate"
   charCounts = [a:1, b:0, c:0, d:0, e:1, ..., t:1, ...]
   key = "#1#0#0#0#1#0...#1" (Same key as "eat", "tea")
   anagramGroups.computeIfAbsent(key, ...) -> adds "ate"
   anagramGroups: {
     "#1#0#0#0#1#0...#1": ["eat", "tea", "ate"],
     "#1#0#0#0#0#0...#1...#1": ["tan"]
   }

Result: [ ["eat", "tea", "ate"], ["tan"] ] (order of lists and items within lists may vary)
```

**Alternative Optimal Approach: Sorted String as Key**
*   **Concept**: Anagrams have the same characters, so if you sort the characters of each string, they will yield the exact same sorted string. This sorted string can serve as the HashMap key.
*   **Time Complexity**: O(N * K log K) because sorting a string of length K takes K log K.
*   **Space Complexity**: O(N * K).
*   **Comparison**: The character count array method (O(NK)) is asymptotically faster than sorting strings (O(NK log K)) when K is large. For typical string lengths in interview problems, both are generally acceptable.

**Edge Cases & Gotchas:**
*   **Empty String:** `[""]` should result in `[[""]]`. The char count array handles this (all zeros), and `""` as a sorted string is also `""`.
*   **Single Character String:** `["a"]` -> `[["a"]]`.
*   **Case Sensitivity:** The current solution assumes lowercase English letters. If mixed case is possible (e.g., "Eat" vs "Tea"), you'd need to normalize the strings (e.g., `str.toLowerCase()`) before counting characters or sorting.
*   **Non-alphabetic Characters:** If strings contain digits, spaces, or symbols, the `charCounts` array size needs to be adjusted (e.g., `int[256]` for ASCII) or a different key generation logic (like a `Map<Character, Integer>` for counts) would be needed.

**Interview Tips & Variations:**
*   **Start with sorting as key:** This is often the more intuitive first thought. After presenting it, the interviewer might ask for a more optimal approach, leading to the character count array.
*   **Why a HashMap?** Explain that it groups elements based on a calculated property (the canonical key) with efficient lookups.
*   **Why not store `List<char[]>`?** `char[]` arrays do not implement `equals()` and `hashCode()` based on their content, so they can't be used directly as `HashMap` keys without wrapping them or converting them to `String`.
*   **Custom hash function for character count array:** An advanced topic would be to create a custom `CharCountKey` class that implements `equals` and `hashCode` based on its internal `int[]` for direct use as a key, avoiding `StringBuilder` overhead.

---

## 4. Subarray Sum Equals K

**Problem Statement:** Given an array of integers `nums` and an integer `k`, return the total number of continuous subarrays whose sum equals to `k`.

### Optimal Solution: Using a HashMap for Prefix Sums

**Concept:**
This problem leverages the idea of "prefix sums." A prefix sum `P[i]` is the sum of elements from `nums[0]` up to `nums[i-1]`.
The sum of any subarray `nums[j...i]` can be calculated as `P[i+1] - P[j]`.
We are looking for subarrays where `P[i+1] - P[j] = k`.
Rearranging this, we get `P[j] = P[i+1] - k`.

So, as we iterate through the array and calculate the `currentSum` (which represents `P[i+1]`), we need to check if a previous prefix sum `P[j]` exists such that `P[j] = currentSum - k`. If it does, then the subarray from `j` to `i` sums to `k`. The HashMap helps us efficiently count how many times such a `P[j]` has occurred.

**Algorithm:**
1.  Initialize `count = 0` (to store the total number of valid subarrays) and `currentSum = 0` (to track the running prefix sum).
2.  Initialize a `HashMap<Integer, Integer>` called `prefixSumCounts`.
    *   `Key`: A prefix sum encountered so far.
    *   `Value`: The number of times that prefix sum has been encountered.
3.  **Crucially, add `(0, 1)` to `prefixSumCounts` initially:** `prefixSumCounts.put(0, 1)`. This handles the case where a subarray starting from index 0 itself sums to `k`. For example, if `currentSum` becomes `k`, then `currentSum - k = 0`. If `0` is in the map, it means the subarray from index 0 to current index sums to `k`.
4.  Iterate through each `num` in the `nums` array:
    a.  Update `currentSum += num`.
    b.  Check if `prefixSumCounts` contains the key `currentSum - k`.
        *   If it does, it means there was a previous prefix sum `P[j]` equal to `currentSum - k`. All subarrays starting from the index *after* that `P[j]` and ending at the current index `i` sum to `k`. Add `prefixSumCounts.get(currentSum - k)` to `count`.
    c.  Add or update the count for the `currentSum` in the map: `prefixSumCounts.put(currentSum, prefixSumCounts.getOrDefault(currentSum, 0) + 1);`.
5.  Return `count`.

**Time Complexity:** O(N)
*   The array is iterated once.
*   HashMap `get` and `put` operations are O(1) on average.

**Space Complexity:** O(N)
*   In the worst case, all N prefix sums could be distinct and stored in the HashMap.

**ASCII Diagram (Example: nums = [1, 1, 1], k = 2)**

```
1. count = 0, currentSum = 0
2. prefixSumCounts = {0: 1}

Iteration 1: num = 1
  currentSum = 0 + 1 = 1
  complement = currentSum - k = 1 - 2 = -1
  prefixSumCounts.containsKey(-1)? No.
  prefixSumCounts.put(1, 1)
  prefixSumCounts: {0: 1, 1: 1}

Iteration 2: num = 1
  currentSum = 1 + 1 = 2
  complement = currentSum - k = 2 - 2 = 0
  prefixSumCounts.containsKey(0)? Yes! (count is 1)
  count += 1  -> count = 1 (Found subarray [1,1] from index 0)
  prefixSumCounts.put(2, 1)
  prefixSumCounts: {0: 1, 1: 1, 2: 1}

Iteration 3: num = 1
  currentSum = 2 + 1 = 3
  complement = currentSum - k = 3 - 2 = 1
  prefixSumCounts.containsKey(1)? Yes! (count is 1)
  count += 1  -> count = 2 (Found subarray [1,1] from index 1)
  prefixSumCounts.put(3, 1)
  prefixSumCounts: {0: 1, 1: 1, 2: 1, 3: 1}

Final count = 2
```

**Edge Cases & Gotchas:**
*   **Empty Array:** Return 0. Handled.
*   **`k = 0`:** The `prefixSumCounts.put(0, 1)` initialization is crucial. For `nums = [0, 0, 0], k = 0`:
    *   Initial: `count=0, currentSum=0, map={0:1}`
    *   `num=0`: `currentSum=0`. `map.containsKey(0-0)` (i.e., `0`)? Yes, `count+=1`. `map.put(0,2)`. `count=1, map={0:2}`. (Subarray `[0]` at index 0)
    *   `num=0`: `currentSum=0`. `map.containsKey(0-0)`? Yes, `count+=2`. `map.put(0,3)`. `count=3, map={0:3}`. (Subarrays `[0]` at index 1, `[0,0]` at index 0-1)
    *   `num=0`: `currentSum=0`. `map.containsKey(0-0)`? Yes, `count+=3`. `map.put(0,4)`. `count=6, map={0:4}`. (Subarrays `[0]` at index 2, `[0,0]` at index 1-2, `[0,0,0]` at index 0-2)
    This correctly identifies all 6 subarrays summing to 0.
*   **Negative Numbers:** The prefix sum logic works correctly with negative numbers.
*   **Integer Overflow:** If `nums` contains very large integers and `N` is large, `currentSum` could exceed `Integer.MAX_VALUE`. In such cases, `long` should be used for `currentSum` and keys in the map.

**Interview Tips & Variations:**
*   **Start with Brute Force:** It's often good to articulate the O(N^2) brute force (nested loops, summing all subarrays) first to show you understand the problem, then pivot to the optimized solution.
*   **Explain Prefix Sums:** Clearly define what a prefix sum is and how `P[i+1] - P[j]` relates to subarray sums.
*   **Importance of `map.put(0, 1)`:** This is the most common "gotcha" for this problem. Explain why it's necessary for subarrays starting from index 0.
*   **Follow-up 1:** Return the actual subarrays, not just the count.
    *   Store `List<Integer>` of starting indices for each prefix sum, or reconstruct them. More complex.
*   **Follow-up 2:** Find longest/shortest subarray with sum K.
    *   Requires tracking indices instead of just counts. For longest, store `first_occurrence_index` for each prefix sum. For shortest, track `min_length` between current index and `first_occurrence_index`.
*   **Follow-up 3:** Find subarrays whose sum is *at most* K or *at least* K.
    *   Often involves sliding window with a `TreeMap` or two pointers, not just a simple HashMap.

---

## General Hash Table Interview Tips

*   **Understand the Basics:**
    *   What is a hash function? What makes a good one?
    *   What is a hash collision? How are they handled (separate chaining vs. open addressing)?
    *   What is load factor? Why is rehashing important?
    *   What are the average and worst-case time complexities for `put`, `get`, `remove`? (Average O(1), Worst O(N) due to collisions).
*   **When to Use Hash Tables:**
    *   When you need fast lookups/insertions/deletions (average O(1)).
    *   When you need to store unique items (`HashSet`).
    *   When you need to map unique keys to values (`HashMap`).
    *   When counting frequencies of items.
    *   When detecting duplicates or missing elements.
*   **Trade-offs:**
    *   **Time vs. Space:** Hash tables often provide better time complexity at the cost of O(N) space.
    *   **Worst-case performance:** Be aware that poor hash functions or pathological data can degrade performance to O(N).
*   **Java Specifics:**
    *   `hashCode()` and `equals()` contract: If you override `equals()`, you *must* override `hashCode()`. Objects considered equal must have the same hash code.
    *   `HashMap` vs `HashTable` vs `ConcurrentHashMap`: `HashMap` is not thread-safe, `HashTable` is legacy and synchronized (slower), `ConcurrentHashMap` is thread-safe and performant.
    *   `HashSet`: Internally uses a `HashMap` where values are dummy objects.
*   **Common Patterns:**
    *   **Frequency Counting:** Use `HashMap<Item, Integer>` to count occurrences.
    *   **Visited Elements:** Use `HashSet<Item>` to quickly check if an item has been seen.
    *   **Complement/Difference:** Store items to quickly find a complement (`target - current`).
    *   **Caching/Memoization:** Store results of expensive computations (e.g., in Dynamic Programming).
    *   **Mapping to Canonical Form:** Group related items (like anagrams) by mapping them to a unique identifier.
    *   **Prefix Sums:** As seen in Subarray Sum Equals K.

By understanding these problems, their solutions, and the underlying principles, you'll be well-prepared to tackle hash table questions in coding interviews.
```