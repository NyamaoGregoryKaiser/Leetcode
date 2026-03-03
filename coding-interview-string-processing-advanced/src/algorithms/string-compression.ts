```typescript
/**
 * Problem: String Compression
 * Implement a function to perform basic string compression using the counts of repeated characters.
 * For example, the string "aabcccccaaa" would become "a2b1c5a3".
 * If the "compressed" string would not become smaller than the original string,
 * your method should return the original string.
 * You can assume the string has only uppercase and lowercase letters (a-z).
 *
 * Example:
 * Input: s = "aabcccccaaa"
 * Output: "a2b1c5a3"
 */

/**
 * Solution: Iterative Builder with Two Pointers / Current Character Tracking
 *
 * This approach iterates through the string, keeping track of the current character
 * and its consecutive count. It builds the compressed string using an array
 * of characters, which is more efficient for string concatenation in JavaScript
 * than repeatedly using `+=` on a string.
 *
 * Algorithm:
 * 1. Initialize an empty array, `compressedChars`, to store parts of the compressed string.
 * 2. Initialize `i = 0` as the main pointer for iterating through the input string `s`.
 * 3. Loop while `i < s.length`:
 *    a. Set `currentChar = s[i]`.
 *    b. Initialize `count = 0`.
 *    c. Use a nested loop or a second pointer `j` to count consecutive occurrences
 *       of `currentChar` starting from `i`.
 *       While `j < s.length` AND `s[j] === currentChar`, increment `count` and `j`.
 *    d. Append `currentChar` to `compressedChars`.
 *    e. Append `count.toString()` to `compressedChars`.
 *    f. Set `i = j` to continue the main loop from the next distinct character.
 * 4. After the loop, join `compressedChars` to form the `compressedString`.
 * 5. Compare the length of `compressedString` with the original `s.length`.
 *    If `compressedString.length < s.length`, return `compressedString`.
 *    Otherwise, return the original `s`.
 *
 * Time Complexity: O(N)
 * The main pointer `i` traverses the string exactly once. The inner loop (or `j` pointer)
 * also traverses the string once in total across all iterations, as it's essentially
 * a segment of the overall traversal. Array pushes and string conversions for counts
 * are constant time operations per character group.
 *
 * Space Complexity: O(N)
 * In the worst case (e.g., "abcde"), no characters repeat, and the compressed string
 * becomes "a1b1c1d1e1", which is twice the length of the original.
 * The `compressedChars` array can grow up to `2 * N` elements.
 */
export function stringCompression(s: string): string {
  if (s.length === 0) {
    return '';
  }

  const compressedParts: (string | number)[] = [];
  let i = 0; // Main pointer

  while (i < s.length) {
    const currentChar = s[i];
    let count = 0;
    let j = i; // Second pointer to count consecutive characters

    // Count consecutive occurrences of currentChar
    while (j < s.length && s[j] === currentChar) {
      count++;
      j++;
    }

    compressedParts.push(currentChar);
    compressedParts.push(count); // Push as number, it will be converted to string by join

    i = j; // Move main pointer to the start of the next distinct character group
  }

  const compressedString = compressedParts.join('');

  // Return the original string if the compressed one is not shorter
  return compressedString.length < s.length ? compressedString : s;
}
```