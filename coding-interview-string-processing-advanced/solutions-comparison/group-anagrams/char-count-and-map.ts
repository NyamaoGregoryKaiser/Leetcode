```typescript
/**
 * Problem: Group Anagrams
 * Optimal Solution: Hash Map with Character Count Array as Key
 *
 * This is the same optimal solution as in `src/algorithms/group-anagrams.ts`.
 * It's included here for comparison with the sort-and-map approach.
 *
 * Time Complexity: O(N * K)
 * Space Complexity: O(N * K)
 */
export function groupAnagrams(strs: string[]): string[][] {
  if (strs.length === 0) {
    return [];
  }

  const anagramGroups = new Map<string, string[]>();

  for (const str of strs) {
    const charCounts = new Array(26).fill(0); // For 'a' through 'z'

    for (const char of str) {
      charCounts[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }

    const key = charCounts.join('#'); // Unique key from char counts

    if (anagramGroups.has(key)) {
      anagramGroups.get(key)!.push(str);
    } else {
      anagramGroups.set(key, [str]);
    }
  }

  return Array.from(anagramGroups.values());
}
```