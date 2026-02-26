```javascript
/**
 * @fileoverview Problem 1: Valid Parentheses
 * Given a string `s` containing just the characters '(', ')', '{', '}', '[', ']',
 * determine if the input string is valid.
 *
 * An input string is valid if:
 * 1. Open brackets must be closed by the same type of brackets.
 * 2. Open brackets must be closed in the correct order.
 * 3. Every close bracket has a corresponding open bracket of the same type.
 *
 * Constraints:
 * 1 <= s.length <= 10^4
 * s consists of parentheses only '()[]{}'.
 */

import { Stack } from '../utils/stack.js';

/**
 * Solution 1 (Optimal): Using a Stack to track open brackets.
 *
 * Intuition:
 * As we iterate through the string, when we see an opening bracket, we push it onto a stack.
 * When we see a closing bracket, we check if the top of the stack has its corresponding opening bracket.
 * If it does, we pop the stack. If it doesn't, or if the stack is empty, the string is invalid.
 * After iterating through the entire string, if the stack is empty, all brackets were correctly matched.
 * If the stack is not empty, it means some opening brackets were never closed.
 *
 * Algorithm:
 * 1. Initialize an empty stack.
 * 2. Create a map to store the relationships between closing and opening brackets.
 *    E.g., `')': '(', '}': '{', ']': '['`.
 * 3. Iterate through each character `char` in the input string `s`.
 *    a. If `char` is an opening bracket ('(', '{', '['), push it onto the stack.
 *    b. If `char` is a closing bracket (')', '}', ']'):
 *       i. Check if the stack is empty. If it is, this closing bracket has no corresponding opening bracket,
 *          so the string is invalid. Return `false`.
 *       ii. Pop the top element from the stack. Let's call it `topElement`.
 *       iii. Compare `topElement` with the expected opening bracket for `char` (using the map).
 *            If `topElement` does not match, the brackets are mismatched, so the string is invalid.
 *            Return `false`.
 * 4. After iterating through all characters, if the stack is empty, all brackets were correctly matched.
 *    Return `true`. Otherwise, there are unmatched opening brackets, so return `false`.
 *
 * Time Complexity: O(N)
 * Where N is the length of the input string `s`. We iterate through the string once,
 * and each stack operation (push, pop, peek, isEmpty) takes O(1) time.
 *
 * Space Complexity: O(N)
 * In the worst case (e.g., "((((((("), the stack could store all N opening brackets.
 * The map for bracket relationships uses constant space.
 *
 * @param {string} s The input string containing parentheses.
 * @returns {boolean} True if the input string is valid, false otherwise.
 */
export function isValidParenthesesOptimal(s) {
    const stack = new Stack();
    const map = {
        ')': '(',
        '}': '{',
        ']': '['
    };

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        // If it's a closing bracket
        if (map[char]) {
            // Check if stack is empty or if the top element doesn't match the corresponding open bracket
            if (stack.isEmpty() || stack.pop() !== map[char]) {
                return false;
            }
        } else {
            // It's an opening bracket, push it onto the stack
            stack.push(char);
        }
    }

    // After iterating through all characters, if the stack is empty,
    // all opening brackets have been matched with their corresponding closing brackets.
    return stack.isEmpty();
}

/**
 * Solution 2 (Brute Force / Conceptual - less applicable here):
 * For valid parentheses, there isn't a typical "brute force" that is significantly
 * less efficient than the stack-based approach without being fundamentally wrong
 * (like trying all permutations, which doesn't apply).
 *
 * A "conceptual brute force" might involve repeatedly removing valid pairs "()", "{}", "[]"
 * until no more pairs can be removed. If the string is empty at the end, it's valid.
 * However, this approach is less intuitive and significantly less efficient than using a stack.
 * It's presented here more as a thought exercise to contrast with the optimal stack solution.
 *
 * Algorithm:
 * 1. Continuously replace all occurrences of "()", "{}", "[]" with an empty string.
 * 2. If, after a pass, no replacements were made, and the string is not empty, then it's invalid.
 * 3. Repeat until no more replacements can be made.
 * 4. If the final string is empty, it's valid; otherwise, it's invalid.
 *
 * Time Complexity: O(N^2) in worst case.
 * Each `replace` operation can take O(N) time (string creation and scanning).
 * In the worst case (e.g., `((()))`), we might perform O(N) replacements, leading to O(N^2).
 *
 * Space Complexity: O(N)
 * Due to string immutability in JavaScript, `replace` creates new strings, potentially up to N length.
 *
 * @param {string} s The input string containing parentheses.
 * @returns {boolean} True if the input string is valid, false otherwise.
 */
export function isValidParenthesesBruteForce(s) {
    let prevLength = s.length;
    let currentS = s;

    // Loop until no more valid pairs can be removed
    while (true) {
        currentS = currentS.replace('()', '');
        currentS = currentS.replace('{}', '');
        currentS = currentS.replace('[]', '');

        // If the length hasn't changed, no more pairs were removed
        if (currentS.length === prevLength) {
            break;
        }
        prevLength = currentS.length;
    }

    // If the string is empty, all parentheses were validly matched
    return currentS.length === 0;
}

```