```java
package com.example.stringmanipulation.problems;

/**
 * Problem: String to Integer (atoi)
 * Implement the `myAtoi(String s)` function, which converts a string to a 32-bit signed integer
 * (similar to C/C++'s `atoi` function).
 *
 * The algorithm should work as follows:
 * 1.  **Read and ignore whitespace:** Start by skipping any leading whitespace (`' '`) characters.
 * 2.  **Check for sign:** Next, check if the next character is `'-'` or `'+'`. If either is present, it should be
 *     recorded as the sign (negative if `'-'`, positive otherwise). If neither is present, assume positive.
 *     If both are present, or more than one sign character, this is an invalid format.
 * 3.  **Read digits:** Read the remaining characters until a non-digit character or the end of the input is reached.
 *     The digits should be converted into an integer.
 * 4.  **Handle non-digit characters:** If the first non-whitespace character is not a digit or a sign,
 *     no valid conversion can be performed, and 0 should be returned.
 * 5.  **Handle overflow/underflow:** If the integer exceeds the range of a 32-bit signed integer
 *     (`[-2^31, 2^31 - 1]`), then clamp the integer to be within the range.
 *     Specifically, if the integer is less than `-2^31`, return `-2^31`.
 *     If the integer is greater than `2^31 - 1`, return `2^31 - 1`.
 * 6.  **Return the result:** The final integer.
 *
 * Examples:
 * Input: s = "42"          Output: 42
 * Input: s = "   -42"       Output: -42
 * Input: s = "4193 with words" Output: 4193
 * Input: s = "words and 987" Output: 0
 * Input: s = "-91283472332" Output: -2147483648 (INT_MIN)
 *
 * Constraints:
 * 0 <= s.length <= 200
 * `s` consists of English letters (lower-case and upper-case), digits (`0-9`), `'+'`, `'-'`, and `' '`.
 */
public class StringToIntegerAtoi {

    /**
     * Approach: State-Machine-like Iterative Parsing
     *
     * This method directly implements the rules specified, processing the string character by character.
     *
     * Algorithm:
     * 1.  **Initialization:**
     *     - `index`: Pointer to current character in string. Start at 0.
     *     - `sign`: +1 for positive, -1 for negative. Default to +1.
     *     - `total`: The accumulated integer value. Default to 0.
     *     - `INT_MAX`, `INT_MIN`: Constants for 32-bit integer limits.
     *
     * 2.  **Skip Whitespace:** Iterate `index` forward while `s.charAt(index)` is a space.
     *     If `index` reaches end of string, return 0.
     *
     * 3.  **Handle Sign:**
     *     - If `s.charAt(index)` is `'-'`, set `sign = -1` and increment `index`.
     *     - Else if `s.charAt(index)` is `'+'`, set `sign = +1` (optional) and increment `index`.
     *
     * 4.  **Process Digits and Check for Overflow:**
     *     - Iterate while `index` is within bounds and `s.charAt(index)` is a digit:
     *         a. Get the digit value: `digit = s.charAt(index) - '0'`.
     *         b. **Crucial Overflow Check before multiplication/addition:**
     *            If `sign == 1`:
     *                If `total > INT_MAX / 10` OR (`total == INT_MAX / 10` AND `digit > 7`),
     *                then an overflow will occur. Return `INT_MAX`.
     *                (Why digit > 7? Because `INT_MAX` is `2147483647`. If `total` is `214748364`,
     *                and the next digit is `8` or `9`, it overflows. If `digit` is `7`, it's exactly `INT_MAX`).
     *            If `sign == -1`:
     *                If `total < INT_MIN / 10` OR (`total == INT_MIN / 10` AND `digit > 8`),
     *                then an underflow will occur. Return `INT_MIN`.
     *                (Why digit > 8? Because `INT_MIN` is `-2147483648`. If `total` is `-214748364`,
     *                and the next digit is `9`, it underflows. If `digit` is `8`, it's exactly `INT_MIN`).
     *                Note: `INT_MIN / 10` is `-214748364`.
     *
     *         c. Update `total`: `total = total * 10 + digit`.
     *         d. Increment `index`.
     *
     * 5.  **Final Result:** Return `total * sign`.
     *
     * Time Complexity: O(L)
     * Where L is the length of the string `s`. We iterate through the string at most once.
     *
     * Space Complexity: O(1)
     * Only a few variables are used.
     */
    public int myAtoi(String s) {
        if (s == null || s.length() == 0) {
            return 0;
        }

        int index = 0;
        int sign = 1; // +1 for positive, -1 for negative
        long total = 0; // Use long to detect overflow easily before clamping
        int n = s.length();

        // 1. Read and ignore leading whitespace
        while (index < n && s.charAt(index) == ' ') {
            index++;
        }

        // If after skipping spaces, we reach the end of the string, return 0
        if (index == n) {
            return 0;
        }

        // 2. Check for sign
        if (s.charAt(index) == '-') {
            sign = -1;
            index++;
        } else if (s.charAt(index) == '+') {
            index++;
        }

        // 3. Read digits and handle overflow
        while (index < n) {
            char currentChar = s.charAt(index);

            // If current character is not a digit, stop parsing
            if (currentChar < '0' || currentChar > '9') {
                break;
            }

            int digit = currentChar - '0';

            // Check for overflow BEFORE adding the new digit
            // For positive numbers:
            // If total > Integer.MAX_VALUE / 10, then total * 10 will definitely overflow.
            // If total == Integer.MAX_VALUE / 10, then total * 10 + digit will overflow
            // if digit > 7 (since Integer.MAX_VALUE ends in 7).
            // Example: If total = 214748364, and digit is 8, (214748364 * 10 + 8) > 2147483647
            if (sign == 1) {
                if (total > Integer.MAX_VALUE / 10 ||
                        (total == Integer.MAX_VALUE / 10 && digit > 7)) {
                    return Integer.MAX_VALUE;
                }
            }
            // For negative numbers:
            // Similar logic, but for Integer.MIN_VALUE, which is -2147483648 (ends in 8).
            // We're accumulating a positive 'total' then applying the sign at the end.
            // So, check if -(total * 10 + digit) would underflow.
            // This is equivalent to checking if (total * 10 + digit) > Integer.MAX_VALUE,
            // or if we're building the positive part, checking against 2147483648 for MIN_VALUE.
            // Since we're accumulating `total` as a positive value and multiply by `sign` at the end,
            // we check if `total` exceeds the magnitude that INT_MIN can hold.
            // INT_MIN has a larger magnitude (by 1) than INT_MAX.
            // (long)Integer.MIN_VALUE = -2147483648
            // (long)Integer.MAX_VALUE = 2147483647
            // So for negative, the magnitude limit is 2147483648.
            else { // sign == -1
                if (total > Integer.MAX_VALUE / 10 ||
                        (total == Integer.MAX_VALUE / 10 && digit > 8)) {
                    // If total*10 + digit exceeds 2147483648 in magnitude, it's an underflow for negative.
                    // This comparison (digit > 8) correctly covers Integer.MIN_VALUE ending in 8.
                    return Integer.MIN_VALUE;
                }
            }

            total = total * 10 + digit;
            index++;
        }

        // 4. Return the result after applying the sign
        return (int) (total * sign);
    }
}
```