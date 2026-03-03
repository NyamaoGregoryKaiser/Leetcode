```typescript
/**
 * Problem: Valid Palindrome II
 * Optimal Solution: Two Pointers with One Skip
 *
 * This is the same optimal solution as in `src/algorithms/valid-palindrome-ii.ts`.
 * It's included here for comparison with brute-force and recursive variants.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

/**
 * Helper function to check if a substring is a palindrome.
 */
function isPalindromeRange(s: string, left: number, right: number): boolean {
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
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] === s[right]) {
      left++;
      right--;
    } else {
      // Mismatch found. Try skipping left char OR skipping right char.
      return isPalindromeRange(s, left + 1, right) || isPalindromeRange(s, left, right - 1);
    }
  }

  // String is already a palindrome or became one with one deletion
  return true;
}
```