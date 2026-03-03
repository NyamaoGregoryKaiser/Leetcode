```typescript
/**
 * Problem: String Compression
 * Optimal Solution: Iterative Builder
 *
 * This is the same optimal solution as in `src/algorithms/string-compression.ts`.
 * It's included here for comparison with other string building methods.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
export function stringCompression(s: string): string {
  if (s.length === 0) {
    return '';
  }

  const compressedParts: (string | number)[] = [];
  let i = 0;

  while (i < s.length) {
    const currentChar = s[i];
    let count = 0;
    let j = i;

    while (j < s.length && s[j] === currentChar) {
      count++;
      j++;
    }

    compressedParts.push(currentChar);
    compressedParts.push(count);

    i = j;
  }

  const compressedString = compressedParts.join('');

  return compressedString.length < s.length ? compressedString : s;
}
```