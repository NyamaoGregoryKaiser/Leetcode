```typescript
/**
 * src/algorithms/myAtoi.ts
 *
 * Problem: String to Integer (atoi)
 * Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer
 * (similar to C/C++'s `atoi` function).
 *
 * The algorithm for `myAtoi(string s)` is as follows:
 * 1. Read in and ignore any leading whitespace.
 * 2. Check if the next character is `'-'` or `'+'`. Read this character in if it is either.
 *    This determines the sign. If neither is present, assume positive.
 * 3. Read in the next characters until the next non-digit character or the end of the input is reached.
 *    The rest of the string is ignored.
 * 4. Convert these digits into an integer. If no digits were read, the integer is `0`.
 * 5. If the integer is out of the 32-bit signed integer range `[-2^31, 2^31 - 1]`, then clamp the integer
 *    to stay within the range. Specifically, integers less than `-2^31` should be clamped to `-2^31`,
 *    and integers greater than `2^31 - 1` should be clamped to `2^31 - 1`.
 * 6. Return the integer as the final result.
 *
 * Example 1:
 * Input: s = "42"
 * Output: 42
 * Explanation: "42" is converted to 42.
 *
 * Example 2:
 * Input: s = "   -42"
 * Output: -42
 * Explanation: First, "   " is ignored. Then, '-' is read, determining the sign. "42" is read and converted to 42.
 *              Combining with the sign, the final result is -42.
 *
 * Example 3:
 * Input: s = "4193 with words"
 * Output: 4193
 * Explanation: "4193" is read and converted to 4193. The remainder of the string (" with words") is ignored.
 *
 * Example 4:
 * Input: s = "words and 987"
 * Output: 0
 * Explanation: The first non-whitespace character is 'w', which is not a digit or a sign. Therefore no valid
 *              conversion could occur.
 *
 * Example 5:
 * Input: s = "-91283472332"
 * Output: -2147483648
 * Explanation: The number "-91283472332" is out of the range of a 32-bit signed integer.
 *              The final result is clamped to -2^31, which is -2147483648.
 */

/**
 * Approach: Iterative Parsing with Edge Case Handling
 *
 * This problem requires careful handling of several edge cases and state changes as we parse the string.
 *
 * Algorithm Steps:
 * 1.  **Initialize**:
 *     - `index = 0` (current position in the string).
 *     - `sign = 1` (default positive).
 *     - `result = 0` (the integer being built).
 *     - Define `MAX_INT = 2^31 - 1` and `MIN_INT = -2^31`.
 *
 * 2.  **Handle Leading Whitespace**:
 *     - Iterate `index` forward as long as `s[index]` is a space character.
 *
 * 3.  **Handle Sign**:
 *     - If `s[index]` is `'-'`, set `sign = -1` and increment `index`.
 *     - Else if `s[index]` is `'+'`, increment `index`.
 *
 * 4.  **Process Digits**:
 *     - Iterate `index` forward as long as `s[index]` is a digit.
 *     - For each digit `d = s[index] - '0'`:
 *       a.  **Check for Overflow (before multiplication)**:
 *           - If `result` is already greater than `MAX_INT / 10`, or if `result` is equal to `MAX_INT / 10`
 *             and the current digit `d` is greater than `7` (because `MAX_INT` ends with 7: `2147483647`),
 *             then an overflow will occur.
 *           - If `sign` is `1`: return `MAX_INT`.
 *           - If `sign` is `-1`: return `MIN_INT`.
 *       b.  Update `result = result * 10 + d`.
 *       c.  Increment `index`.
 *
 * 5.  **Apply Sign and Return**:
 *     - Return `result * sign`. The clamping for MAX/MIN INT should already be handled by step 4a.
 *
 * Time Complexity: O(N)
 *   - N is the length of the input string `s`.
 *   - We iterate through the string at most once.
 *   - Each character processing involves constant time operations.
 *
 * Space Complexity: O(1)
 *   - We only use a few constant variables.
 */
export function myAtoi(s: string): number {
  if (!s || s.length === 0) {
    return 0;
  }

  const MAX_INT = 2 ** 31 - 1; // 2147483647
  const MIN_INT = -(2 ** 31);   // -2147483648

  let index = 0;
  let sign = 1; // Default to positive
  let result = 0;

  // 1. Handle leading whitespace
  while (index < s.length && s[index] === ' ') {
    index++;
  }

  // If we reached the end of the string after skipping spaces
  if (index === s.length) {
    return 0;
  }

  // 2. Handle sign
  if (s[index] === '-') {
    sign = -1;
    index++;
  } else if (s[index] === '+') {
    index++;
  }

  // 3. Process digits
  // Check if character is a digit
  const isDigit = (char: string): boolean => char >= '0' && char <= '9';

  while (index < s.length && isDigit(s[index])) {
    const digit = parseInt(s[index], 10);

    // 4. Check for overflow before multiplying and adding
    // If result * 10 + digit would exceed MAX_INT or MIN_INT
    // Consider positive overflow:
    // If result > MAX_INT / 10, then result * 10 will definitely overflow.
    // If result == MAX_INT / 10, then if digit > 7, result * 10 + digit will overflow (2147483647 ends in 7).
    if (sign === 1 && (result > MAX_INT / 10 || (result === MAX_INT / 10 && digit > 7))) {
      return MAX_INT;
    }
    // Consider negative overflow (with current `result` being positive, as `sign` is applied at the end):
    // If result > -MIN_INT / 10, then -(result * 10) will definitely underflow.
    // If result == -MIN_INT / 10, then if digit > 8, -(result * 10 + digit) will underflow (-2147483648 ends in 8).
    // Note: -MIN_INT is 2147483648.
    if (sign === -1 && (result > -MIN_INT / 10 || (result === -MIN_INT / 10 && digit > 8))) {
      return MIN_INT;
    }

    result = result * 10 + digit;
    index++;
  }

  // 5. Apply sign and return
  return result * sign;
}
```