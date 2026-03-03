```typescript
/**
 * Problem: Longest Substring Without Repeating Characters
 * Given a string s, find the length of the longest substring without repeating characters.
 *
 * Example:
 * Input: s = "abcabcbb"
 * Output: 3 (The answer is "abc", with the length of 3.)
 */

/**
 * Solution: Optimal Sliding Window with a Hash Map
 *
 * This problem can be efficiently solved using the "Sliding Window" technique.
 * We maintain a window `[left, right]` which represents the current substring
 * without repeating characters.
 *
 * Algorithm:
 * 1. Initialize `left = 0` (start of the window), `maxLength = 0`.
 * 2. Use a `Map` (or `Set`, or an array for ASCII characters) to store the
 *    last seen index of each character within the current window.
 *    The `Map` will store `char -> index`.
 * 3. Iterate with `right` pointer from `0` to `s.length - 1`:
 *    a. Get the character `currentChar = s[right]`.
 *    b. Check if `currentChar` is already in the `Map` AND its last seen index
 *       (`map.get(currentChar)`) is greater than or equal to `left`.
 *       If this condition is true, it means `currentChar` is a duplicate *within*
 *       the current window `[left, right]`. To make the window valid again
 *       (without duplicates), we need to move the `left` pointer to
 *       `map.get(currentChar) + 1`. This effectively "shrinks" the window from the left.
 *    c. Update the last seen index of `currentChar` in the `Map` to `right`.
 *    d. Calculate the current window length (`right - left + 1`).
 *    e. Update `maxLength = Math.max(maxLength, current window length)`.
 * 4. After the loop finishes, `maxLength` will hold the length of the longest
 *    substring without repeating characters.
 *
 * Time Complexity: O(N)
 * The `right` pointer iterates through the string once. The `left` pointer also
 * moves forward, and in total, it moves at most N steps. Map operations
 * (get, set) take O(1) average time. Therefore, the total time complexity is O(N).
 *
 * Space Complexity: O(min(N, M))
 * The `Map` stores characters and their indices. In the worst case, all characters
 * in the string are unique, so it stores N characters. However, if the character
 * set is limited (e.g., ASCII characters, M=128 or 256), the map will store at most
 * M distinct characters. So, it's O(min(N, M)).
 */
export function lengthOfLongestSubstring(s: string): number {
  if (s.length === 0) {
    return 0;
  }

  const charIndexMap = new Map<string, number>(); // Stores char -> its last seen index
  let maxLength = 0;
  let left = 0; // Left pointer of the sliding window

  // Iterate with the right pointer
  for (let right = 0; right < s.length; right++) {
    const currentChar = s[right];

    // If the current character is already in the map AND its last seen index
    // is within or at the start of the current window (>= left),
    // then it's a duplicate. We need to move the left pointer to the right
    // of the previous occurrence of this character to make the window valid.
    if (charIndexMap.has(currentChar) && charIndexMap.get(currentChar)! >= left) {
      left = charIndexMap.get(currentChar)! + 1;
    }

    // Always update the last seen index of the current character
    charIndexMap.set(currentChar, right);

    // Calculate the current window length and update maxLength
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}
```