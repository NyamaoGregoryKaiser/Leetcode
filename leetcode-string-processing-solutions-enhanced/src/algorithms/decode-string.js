```javascript
/**
 * @fileoverview Implements various approaches to decode an encoded string.
 * The encoding rule is `k[encoded_string]`, where `encoded_string` inside the
 * square brackets is repeated `k` times. `k` is a positive integer.
 * Examples:
 * "3[a]2[bc]" -> "aaabcbc"
 * "3[a2[c]]" -> "accaccacc"
 * "2[abc]3[cd]ef" -> "abcabccdcdcdef"
 *
 * Constraints:
 * - The input string is always valid.
 * - Digits are only for repeat numbers, not part of encoded string characters.
 * - There are no extra white spaces.
 * - The maximum depth of encoding is 10.
 * - The maximum length of the string before decoding is 50.
 */

const { isDigit } = require('../utils/string-helpers');

/**
 * Solution 1: Stack-based Iterative Approach (Optimal)
 * This approach uses two stacks: one for numbers (repetition counts) and one for strings (partially decoded strings).
 * It processes the string character by character.
 * When a digit is encountered, it builds the repetition count.
 * When '[' is encountered, the current number and current string are pushed onto their respective stacks,
 * and we reset for the new segment.
 * When ']' is encountered, we pop from both stacks, repeat the current string, and append it to the popped string.
 * When a letter is encountered, it's appended to the current string segment.
 *
 * @param {string} s The encoded string.
 * @returns {string} The decoded string.
 *
 * Time Complexity: O(maxK * N) where `maxK` is the maximum repetition count and `N` is the length of the string.
 *   - Each character is processed once.
 *   - The `repeat()` operation can take up to O(k * M) time where M is the length of the string being repeated.
 *   - In the worst case, the decoded string length can grow exponentially with nesting, e.g., 10[10[10[a]]].
 *   - The actual time complexity depends on the final length of the decoded string, let's call it L_decoded.
 *   - So, typically O(L_decoded).
 * Space Complexity: O(maxK * N) in the worst case, which is also O(L_decoded).
 *   - The stacks store intermediate strings and numbers. The total length of strings stored can be large.
 *   - In the worst case, it could be O(L_decoded) if many large intermediate strings are pushed.
 */
function decodeStringStack(s) {
    // Stacks to store repetition counts and intermediate string segments.
    const numStack = [];
    const strStack = [];

    let currentNum = 0;   // Stores the current repetition number being parsed.
    let currentStr = "";  // Stores the string segment being built.

    // Iterate through each character of the input string.
    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        if (isDigit(char)) {
            // If the character is a digit, build the number.
            // This handles multi-digit numbers like '100'.
            currentNum = currentNum * 10 + parseInt(char, 10);
        } else if (char === '[') {
            // If an opening bracket is found:
            // 1. Push the current `currentStr` onto the `strStack`. This saves the string
            //    segment that was built *before* this new repetition block.
            strStack.push(currentStr);
            // 2. Push the `currentNum` onto the `numStack`. This saves the repetition count
            //    for the upcoming block.
            numStack.push(currentNum);
            // 3. Reset `currentStr` and `currentNum` for the new inner segment.
            currentStr = "";
            currentNum = 0;
        } else if (char === ']') {
            // If a closing bracket is found:
            // 1. Pop the last repetition count from `numStack`.
            const num = numStack.pop();
            // 2. Pop the previous string segment from `strStack`.
            const prevStr = strStack.pop();
            // 3. Repeat `currentStr` (the content inside the brackets) `num` times.
            // 4. Append this repeated string to `prevStr`. This becomes the new `currentStr`.
            currentStr = prevStr + currentStr.repeat(num);
        } else {
            // If the character is a letter, append it to the `currentStr`.
            currentStr += char;
        }
    }

    // After iterating through the entire string, `currentStr` will hold the fully decoded result.
    return currentStr;
}

/**
 * Solution 2: Recursive Approach
 * This approach uses recursion to handle nested brackets. The main idea is to recursively
 * decode substrings within brackets.
 *
 * @param {string} s The encoded string.
 * @returns {string} The decoded string.
 *
 * Time Complexity: O(maxK * N) or O(L_decoded). Similar to stack approach.
 *   - Each character is processed. Recursion depth can be up to the nesting level.
 *   - String concatenation and repetition can be expensive.
 * Space Complexity: O(maxK * N) or O(L_decoded) due to recursive call stack and intermediate string creations.
 *   - Max recursion depth is limited by max nesting (e.g., 10).
 *   - Intermediate strings created during concatenation and repetition contribute significantly to space.
 */
function decodeStringRecursive(s) {
    let index = 0; // Global pointer to keep track of current position in string

    function decode() {
        let currentStr = "";
        let currentNum = 0;

        while (index < s.length) {
            const char = s[index];

            if (isDigit(char)) {
                // Build the number
                currentNum = currentNum * 10 + parseInt(char, 10);
                index++;
            } else if (char === '[') {
                // When '[' is encountered, increment index to move past it,
                // then recursively call decode for the inner string.
                index++;
                const decodedInnerStr = decode(); // Recursive call
                // After the inner string is decoded, repeat it and append to currentStr.
                currentStr += decodedInnerStr.repeat(currentNum);
                // Reset currentNum for the next segment.
                currentNum = 0;
            } else if (char === ']') {
                // When ']' is encountered, this segment is complete.
                // Increment index to move past it and return the decoded string for this level.
                index++;
                return currentStr;
            } else {
                // If it's a letter, append it to the current string.
                currentStr += char;
                index++;
            }
        }
        // If the loop finishes (reached end of string), return the accumulated string.
        return currentStr;
    }

    return decode();
}

module.exports = {
    decodeStringStack,
    decodeStringRecursive
};
```