```typescript
/**
 * Problem: Valid Palindrome II
 * Brute-Force Approach:
 * Generate all possible N-1 length substrings by removing one character,
 * then check if any of them are palindromes.
 *
 * This approach is generally too slow for typical interview constraints (N up to 10^5).
 *
 * Time Complexity: O(N^3)
 * - There are N possible characters to remove.
 * - For each removal, creating a substring takes O(N) time.
 * - Checking if the N-1 length substring is a palindrome takes O(N) time.
 * - Total: N * (N + N) = O(N^3).
 *
 * Space Complexity: O(N)
 * - For storing the temporary substrings.
 */
function isPalindrome(s: string): boolean {
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

export function validPalindrome(s: string): boolean {
  if (isPalindrome(s)) {
    return true;
  }

  // Try deleting each character one by one
  for (let i = 0; i < s.length; i++) {
    const temp = s.substring(0, i) + s.substring(i + 1);
    if (isPalindrome(temp)) {
      return true;
    }
  }

  return false;
}
```