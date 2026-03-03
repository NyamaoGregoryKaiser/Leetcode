```typescript
/**
 * Problem: Group Anagrams
 * Alternative Solution: Sort and Map
 *
 * This approach uses sorting to create a canonical key for each anagram group.
 * Anagrams, when sorted, will result in identical strings.
 *
 * Algorithm:
 * 1. Initialize a `Map` where keys are sorted strings and values are arrays of original strings.
 * 2. Iterate through each string `str` in the input array `strs`.
 * 3. For each `str`, sort its characters to create a `sortedStr` (the key).
 *    - Convert `str` to a character array.
 *    - Sort the character array.
 *    - Join the sorted characters back into a string.
 * 4. Use this `sortedStr` as the key to store the original `str` in the map.
 *    If the key doesn't exist, create a new array for it. Otherwise, push `str` to the existing array.
 * 5. Return all the values (anagram groups) from the map.
 *
 * Time Complexity: O(N * K log K)
 * - N is the number of strings.
 * - K is the maximum length of a string.
 * - Iterating through N strings.
 * - For each string, sorting its characters takes O(K log K) time.
 * - Map operations are O(1) on average.
 * - Total: N * O(K log K).
 *
 * Space Complexity: O(N * K)
 * - The map stores all N strings (each of length K) in its values.
 * - Temporary space for sorting each string (converting to array, then joining) is O(K).
 * - Total space: O(N * K) for the output.
 */
export function groupAnagrams(strs: string[]): string[][] {
  if (strs.length === 0) {
    return [];
  }

  const anagramGroups = new Map<string, string[]>();

  for (const str of strs) {
    // Create a sorted version of the string to use as a key
    const sortedStr = str.split('').sort().join('');

    // Add the original string to the corresponding group in the map
    if (anagramGroups.has(sortedStr)) {
      anagramGroups.get(sortedStr)!.push(str);
    } else {
      anagramGroups.set(sortedStr, [str]);
    }
  }

  // Return all the grouped anagrams (the values of the map)
  return Array.from(anagramGroups.values());
}
```