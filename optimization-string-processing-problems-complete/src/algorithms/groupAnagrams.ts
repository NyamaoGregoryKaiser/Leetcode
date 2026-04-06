```typescript
/**
 * src/algorithms/groupAnagrams.ts
 *
 * Problem: Group Anagrams
 * Given an array of strings `strs`, group the anagrams together.
 * You can return the answer in any order.
 *
 * An Anagram is a word or phrase formed by rearranging the letters of a
 * different word or phrase, typically using all the original letters exactly once.
 *
 * Example 1:
 * Input: strs = ["eat","tea","tan","ate","nat","bat"]
 * Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
 *
 * Example 2:
 * Input: strs = [""]
 * Output: [[""]]
 *
 * Example 3:
 * Input: strs = ["a"]
 * Output: [["a"]]
 */

/**
 * Approach 1: Sort String as Key
 *
 * The core idea is that anagrams, when sorted alphabetically, will result in the same string.
 * For example, "eat", "tea", and "ate" all become "aet" when sorted.
 *
 * We can use a hash map (Map in TypeScript/JavaScript) where the key is the sorted version
 * of a string, and the value is a list of all original strings that produce that sorted key.
 *
 * Algorithm:
 * 1. Initialize an empty hash map `map` where keys are sorted strings and values are arrays of strings.
 * 2. Iterate through each string `str` in the input array `strs`.
 * 3. For each `str`, sort its characters alphabetically to create a `sortedStr`.
 *    - Convert `str` to a character array.
 *    - Sort the character array.
 *    - Join the character array back into a string.
 * 4. Use `sortedStr` as the key for the hash map.
 *    - If `sortedStr` is already a key in `map`, append `str` to its corresponding value (array).
 *    - If `sortedStr` is not yet a key, create a new entry in `map` with `sortedStr` as the key
 *      and an array containing `str` as its initial value.
 * 5. After iterating through all strings, the values of the hash map will be the grouped anagrams.
 *    Return these values as an array of arrays.
 *
 * Time Complexity: O(N * K log K)
 *   - N is the number of strings in the input array `strs`.
 *   - K is the maximum length of a string in `strs`.
 *   - For each of the N strings, we perform:
 *     - Conversion to char array, sorting, and joining: O(K log K) due to sorting.
 *     - Hash map operations (insertion/lookup): O(K) on average (due to string hashing, max K length).
 *   - Total: N * (K log K + K) which simplifies to O(N * K log K).
 *
 * Space Complexity: O(N * K)
 *   - In the worst case, all strings are distinct (no anagrams). The hash map will store N entries.
 *   - Each entry stores the original string (max K length) and its sorted key (max K length).
 *   - The total space used by the hash map (keys and values) is proportional to the total length
 *     of all strings, which is O(N * K).
 */
export function groupAnagramsSortKey(strs: string[]): string[][] {
  if (!strs || strs.length === 0) {
    return [];
  }

  // Map to store sorted string -> list of original anagrams
  const anagramMap = new Map<string, string[]>();

  for (const str of strs) {
    // Sort the characters of the string to create a canonical key
    const sortedStr = str.split('').sort().join('');

    // If the key exists, add the current string to its list
    if (anagramMap.has(sortedStr)) {
      anagramMap.get(sortedStr)!.push(str);
    } else {
      // Otherwise, create a new list with the current string
      anagramMap.set(sortedStr, [str]);
    }
  }

  // Return all the values (arrays of anagrams) from the map
  return Array.from(anagramMap.values());
}

/**
 * Approach 2: Character Count as Key
 *
 * Instead of sorting strings, which takes O(K log K) time, we can create a frequency map
 * (or array) of character counts for each string. This frequency map can then be converted
 * into a string representation to be used as a hash map key.
 * For example, "eat" would have counts {e:1, a:1, t:1}. This could be represented as "1a1e1t".
 * A more robust representation could be "counts: [1,0,0,0,1,0...1,0,...]" for a-z.
 *
 * Algorithm:
 * 1. Initialize an empty hash map `map` where keys are character count representations
 *    and values are arrays of strings.
 * 2. Iterate through each string `str` in the input array `strs`.
 * 3. For each `str`, create a character count array of size 26 (for 'a' through 'z').
 *    - Initialize the array with zeros.
 *    - Iterate through each character `char` in `str`.
 *    - Increment the count for `char` at `count[char.charCodeAt(0) - 'a'.charCodeAt(0)]`.
 * 4. Convert this character count array into a unique string key. A common way is to join
 *    the counts with a delimiter, e.g., "1#0#0#0#1#...#1" for `[1,0,0,0,1,...,1,...]`
 *    (representing `a`, `e`, `t`).
 * 5. Use this `countKey` for the hash map, similar to Approach 1.
 *    - If `countKey` exists, append `str` to its value list.
 *    - Else, create a new entry with `countKey` and `[str]`.
 * 6. Return all values from the hash map.
 *
 * Time Complexity: O(N * K)
 *   - N is the number of strings.
 *   - K is the maximum length of a string.
 *   - For each of the N strings, we perform:
 *     - Creating character count array: O(K) (iterate through string characters).
 *     - Converting count array to string key: O(alphabet_size), which is O(1) (26 characters).
 *     - Hash map operations: O(1) average.
 *   - Total: N * (K + 1) which simplifies to O(N * K).
 *   This is generally faster than O(N * K log K) if K is large.
 *
 * Space Complexity: O(N * K)
 *   - Similar to Approach 1, the hash map stores all strings and their keys.
 *   - The total space used by the map (keys and values) is proportional to the total length
 *     of all strings. O(N * K).
 */
export function groupAnagramsCountKey(strs: string[]): string[][] {
  if (!strs || strs.length === 0) {
    return [];
  }

  // Map to store character count string -> list of original anagrams
  const anagramMap = new Map<string, string[]>();
  const aCharCode = 'a'.charCodeAt(0); // Char code for 'a' to calculate offsets

  for (const str of strs) {
    // Initialize a frequency array for 26 lowercase English letters
    const counts = Array(26).fill(0);

    // Populate the frequency array for the current string
    for (const char of str) {
      counts[char.charCodeAt(0) - aCharCode]++;
    }

    // Create a unique key from the frequency array.
    // E.g., for "eat", counts will be [1,0,0,0,1,0...1...].
    // This key could be "1#0#0#0#1#0#0#0#0#0#0#0#0#0#0#0#0#0#0#1#0#0#0#0#0#0"
    // Using a separator like '#' is crucial to differentiate keys like "12" from "1#2".
    const countKey = counts.join('#');

    // Add the string to the list corresponding to its count key
    if (anagramMap.has(countKey)) {
      anagramMap.get(countKey)!.push(str);
    } else {
      anagramMap.set(countKey, [str]);
    }
  }

  // Return all the values (arrays of anagrams) from the map
  return Array.from(anagramMap.values());
}
```