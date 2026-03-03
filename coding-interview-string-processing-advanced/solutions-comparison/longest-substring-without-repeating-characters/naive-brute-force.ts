```typescript
/**
 * Problem: Longest Substring Without Repeating Characters
 * Naive Brute-Force Approach:
 *
 * This approach checks every possible substring of the given string `s`.
 * For each substring, it then checks if all characters within that substring are unique.
 *
 * Time Complexity: O(N^3)
 * - There are approximately N^2 possible substrings (N choices for start, N choices for end).
 * - For each substring, checking if all characters are unique takes O(K) time,
 *   where K is the length of the substring (using a Set). K can be up to N.
 * - Total: N^2 * N = O(N^3).
 *
 * Space Complexity: O(min(N, M))
 * - For storing characters in the Set during uniqueness check. M is alphabet size.
 */
export function lengthOfLongestSubstring(s: string): number {
  if (s.length === 0) {
    return 0;
  }

  let maxLength = 0;

  // Outer loop: starting index of substring
  for (let i = 0; i < s.length; i++) {
    // Inner loop: ending index of substring
    for (let j = i; j < s.length; j++) {
      const currentSubstring = s.substring(i, j + 1);

      // Check if currentSubstring has all unique characters
      const charSet = new Set<string>();
      let isUnique = true;
      for (const char of currentSubstring) {
        if (charSet.has(char)) {
          isUnique = false;
          break;
        }
        charSet.add(char);
      }

      if (isUnique) {
        maxLength = Math.max(maxLength, currentSubstring.length);
      }
    }
  }

  return maxLength;
}
```