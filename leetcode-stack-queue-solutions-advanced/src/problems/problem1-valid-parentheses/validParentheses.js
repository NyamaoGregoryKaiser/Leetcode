/**
 * @file Implements the solution for the Valid Parentheses problem.
 * @module problems/validParentheses
 */

const Stack = require('../../data-structures/Stack');

/**
 * Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`,
 * determine if the input string is valid.
 *
 * An input string is valid if:
 * 1. Open brackets must be closed by the same type of brackets.
 * 2. Open brackets must be closed in the correct order.
 * 3. Every close bracket has a corresponding open bracket of the same type.
 *
 * @param {string} s The input string containing parentheses characters.
 * @returns {boolean} `true` if the input string is valid, `false` otherwise.
 *
 * @example
 * validParentheses("()"); // true
 * validParentheses("()[]{}"); // true
 * validParentheses("(]"); // false
 * validParentheses("([{}])"); // true
 * validParentheses("{[]}"); // true
 * validParentheses("]"); // false
 * validParentheses(""); // true (empty string is valid)
 */
function validParentheses(s) {
    // If the string is empty, it's considered valid.
    if (s.length === 0) {
        return true;
    }

    // A stack to keep track of opening brackets.
    // When an opening bracket is encountered, it's pushed onto the stack.
    // When a closing bracket is encountered, the top of the stack is popped and checked for a match.
    const stack = new Stack();

    // A map to quickly check for matching bracket pairs.
    // Key: closing bracket, Value: corresponding opening bracket.
    const bracketMap = {
        ')': '(',
        '}': '{',
        ']': '[',
    };

    // Iterate through each character in the input string.
    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        // Case 1: If the character is a closing bracket.
        // We check if it exists as a key in our bracketMap.
        if (bracketMap[char]) {
            // If the stack is empty, it means we found a closing bracket
            // without a corresponding opening bracket. This is invalid.
            // Also, if the top element of the stack does not match the
            // expected opening bracket for the current closing bracket,
            // it's an invalid sequence.
            if (stack.isEmpty() || stack.pop() !== bracketMap[char]) {
                return false;
            }
        }
        // Case 2: If the character is an opening bracket.
        // We push it onto the stack.
        else {
            stack.push(char);
        }
    }

    // After iterating through the entire string, if the stack is empty,
    // it means all opening brackets have been correctly closed.
    // If the stack is not empty, it means there are unmatched opening brackets.
    return stack.isEmpty();
}

/**
 * Time Complexity Analysis:
 * O(N), where N is the length of the input string `s`.
 * We iterate through the string once, and each stack operation (push, pop, peek, isEmpty)
 * takes O(1) time.
 *
 * Space Complexity Analysis:
 * O(N), in the worst case, if the string contains only opening brackets (e.g., "((((("),
 * the stack will store all N characters.
 * In the best case (e.g., "()()()"), the stack size remains constant (max 1 element).
 */

module.exports = validParentheses;