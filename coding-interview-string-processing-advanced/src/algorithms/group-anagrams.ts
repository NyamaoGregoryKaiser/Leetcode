```typescript
/**
 * Problem: Group Anagrams
 * Given an array of strings strs, group the anagrams together. You can return the answer in any order.
 * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
 * typically using all the original letters exactly once.
 *
 * Example:
 * Input: strs = ["eat","tea","tan","ate","nat","bat"]
 * Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
 */

/**
 * Solution: Hash Map with Character Count Array as Key
 *
 * This is an optimal approach for grouping anagrams. The core idea is that anagrams
 * will have the same character counts. We can create a unique "key" for each group of
 * anagrams based on their character frequencies.
 *
 * Algorithm:
 * 1. Initialize a `Map` where the keys will be string representations of character counts
 *    and values will be arrays of strings (the anagrams).
 * 2. Iterate through each string `str` in the input array `strs`.
 * 3. For each `str`, create a character count array of size 26 (for 'a' through 'z').
 *    Initialize all counts to 0.
 * 4. Iterate through the characters of `str`. For each character `char`, increment the
 *    count at `char.charCodeAt(0) - 'a'.charCodeAt(0)` in the count array.
 * 5. Convert this count array into a unique string key. A common way is to join the counts
 *    with a delimiter (e.g., `"#"` or `""`), potentially prefixed by the character itself (e.g., "a1#b0#c1").
 *    A simpler but effective way is just `countArray.join('#')`.
 * 6. Use this key to store `str` in the map. If the key doesn't exist, create a new
 *    array for it. Otherwise, push `str` to the existing array.
 * 7. After iterating through all strings, the values of the map will be the grouped anagrams.
 *
 * Time Complexity: O(N * K), where N is the number of strings and K is the maximum length of a string.
 * - Iterating through N strings.
 * - For each string of length K:
 *   - Creating and filling the character count array takes O(K) time.
 *   - Converting the count array to a string key takes O(26) (constant) or O(K) if the key includes chars. `join('#')` is O(26).
 *   - Map operations (get, set) are O(1) on average.
 * - Total: N * (K + 26) which simplifies to O(N * K).
 *   This is generally faster than sorting each string (O(N * K log K)).
 *
 * Space Complexity: O(N * K)
 * - The map stores all N strings, each of average length K, in its values.
 * - The character count array is O(26) constant space per string, but this is temporary.
 * - Total space for the output list is O(N * K).
 */
export function groupAnagrams(strs: string[]): string[][] {
  if (strs.length === 0) {
    return [];
  }

  // Map to store anagrams. Key: char count string, Value: array of anagrams.
  const anagramGroups = new Map<string, string[]>();

  for (const str of strs) {
    // Initialize character count array for 26 lowercase English letters
    const charCounts = new Array(26).fill(0);

    // Populate character counts for the current string
    for (const char of str) {
      charCounts[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }

    // Create a unique key from the character counts.
    // Example: "eat" -> [1,0,0,0,1,0...1] -> "1#0#0#0#1#0...1#"
    const key = charCounts.join('#');

    // Add the string to the corresponding group in the map
    if (anagramGroups.has(key)) {
      anagramGroups.get(key)!.push(str);
    } else {
      anagramGroups.set(key, [str]);
    }
  }

  // Return all the grouped anagrams (the values of the map)
  return Array.from(anagramGroups.values());
}
```