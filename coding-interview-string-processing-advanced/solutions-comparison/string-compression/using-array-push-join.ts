```typescript
/**
 * Problem: String Compression
 * Alternative Solution: Using Array Push and Join (Explicitly)
 *
 * This solution is fundamentally the same as the "Iterative Builder"
 * but explicitly highlights the use of `Array.prototype.push` for
 * building segments of the compressed string and `Array.prototype.join`
 * for the final string construction. This is a common and efficient
 * pattern in JavaScript for string manipulation that avoids potential
 * `O(N^2)` overhead of repeated string concatenation (`+=`).
 *
 * Time Complexity: O(N)
 * - The primary loop iterates through the string once.
 * - Array `push` operations are O(1) on average.
 * - The `join` operation at the end takes O(L) time where L is the total length
 *   of the characters being joined (which can be up to 2N).
 * - Overall, O(N).
 *
 * Space Complexity: O(N)
 * - The `compressedResult` array can store up to `2 * N` elements in the worst case
 *   (e.g., "a1b1c1d1e1" for "abcde").
 * - This auxiliary space is proportional to the length of the string.
 */
export function stringCompression(s: string): string {
  if (s.length === 0) {
    return '';
  }

  const compressedResult: string[] = []; // Use string[] to be explicit about types being joined
  let i = 0; // Pointer for the start of the current character group

  while (i < s.length) {
    const char = s[i];
    let count = 0;
    let j = i; // Pointer to count consecutive characters

    // Count consecutive occurrences of 'char'
    while (j < s.length && s[j] === char) {
      count++;
      j++;
    }

    // Append the character and its count to the result array
    compressedResult.push(char);
    compressedResult.push(count.toString()); // Convert count to string before pushing

    // Move the main pointer 'i' to the start of the next character group
    i = j;
  }

  // Join the array parts into a single string
  const compressedString = compressedResult.join('');

  // Compare lengths and return the shorter string
  return compressedString.length < s.length ? compressedString : s;
}
```