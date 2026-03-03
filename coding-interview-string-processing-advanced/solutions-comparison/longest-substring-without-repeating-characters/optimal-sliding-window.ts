```typescript
/**
 * Problem: Longest Substring Without Repeating Characters
 * Optimal Solution: Sliding Window with a Hash Map
 *
 * This is the same optimal solution as in `src/algorithms/longest-substring-without-repeating-characters.ts`.
 * It's included here for comparison with the naive brute-force approach.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(min(N, M))
 */
export function lengthOfLongestSubstring(s: string): number {
  if (s.length === 0) {
    return 0;
  }

  const charIndexMap = new Map<string, number>();
  let maxLength = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const currentChar = s[right];

    if (charIndexMap.has(currentChar) && charIndexMap.get(currentChar)! >= left) {
      left = charIndexMap.get(currentChar)! + 1;
    }

    charIndexMap.set(currentChar, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}
```