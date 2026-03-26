/**
 * src/algorithms/validParentheses.js
 *
 * Problem: Valid Parentheses
 *
 * Problem Description:
 * Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`,
 * determine if the input string is valid. An input string is valid if:
 * 1. Open brackets must be closed by the same type of brackets.
 * 2. Open brackets must be closed in the correct order.
 * 3. Every close bracket has a corresponding open bracket of the same type.
 *
 * Example:
 * Input: `"([{}])"`
 * Output: `true`
 * Input: `"({[)))"`
 * Output: `false`
 *
 * Solution Approach: Stack
 * This problem is a classic application of the Stack data structure.
 * We iterate through the string:
 * - If an opening bracket is encountered, push it onto the stack.
 * - If a closing bracket is encountered:
 *   - Check if the stack is empty. If it is, there's no matching opening bracket, so it's invalid.
 *   - Pop the top element from the stack.
 *   - Check if the popped element is the corresponding opening bracket for the current closing bracket.
 *     If not, it's invalid.
 * After iterating through the entire string, if the stack is empty, all brackets were matched correctly.
 * Otherwise, there are unmatched opening brackets, making the string invalid.
 */

const { Stack } = require('../utils/dataStructures'); // Import custom Stack

/**
 * Approach 1: Optimal using JavaScript Array as a Stack
 * This solution leverages the built-in array methods `push` and `pop` to simulate a stack.
 * It's concise and efficient in JavaScript.
 *
 * Time Complexity: O(n) - We iterate through the string once. Each push/pop operation on an array
 *                          (at the end) takes O(1) time on average.
 * Space Complexity: O(n) - In the worst case (e.g., "((((("), the stack can grow to contain all
 *                           opening brackets, taking up space proportional to the string length.
 *
 * @param {string} s - The input string containing parentheses.
 * @returns {boolean} True if the string is valid, false otherwise.
 */
function isValidParenthesesUsingArrayAsStack(s) {
    if (typeof s !== 'string') {
        throw new TypeError("Input must be a string.");
    }
    // Early exit for odd length strings - cannot be valid
    if (s.length % 2 !== 0) {
        return false;
    }

    const stack = []; // Using a JS array as a stack
    const bracketMap = {
        '(': ')',
        '{': '}',
        '[': ']'
    };

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        // If it's an opening bracket, push its corresponding closing bracket onto the stack
        // This is a common optimization: push the *expected* closing bracket.
        // Then, when a closing bracket is encountered, just compare it to the top of stack.
        if (bracketMap[char]) {
            stack.push(bracketMap[char]);
        } else {
            // It's a closing bracket
            // If stack is empty or the top of stack doesn't match the current closing bracket
            if (stack.length === 0 || stack.pop() !== char) {
                return false;
            }
        }
    }

    // If the stack is empty, all opening brackets were matched
    return stack.length === 0;
}

/**
 * Approach 2: Optimal using Custom Stack Data Structure
 * This solution uses the `Stack` class defined in `src/utils/dataStructures.js` to demonstrate
 * the explicit use of a custom stack. The logic remains identical to the array-based approach.
 *
 * Time Complexity: O(n) - Same as above. Operations on the custom stack are O(1) on average.
 * Space Complexity: O(n) - Same as above.
 *
 * @param {string} s - The input string containing parentheses.
 * @returns {boolean} True if the string is valid, false otherwise.
 */
function isValidParenthesesUsingCustomStack(s) {
    if (typeof s !== 'string') {
        throw new TypeError("Input must be a string.");
    }
    if (s.length % 2 !== 0) {
        return false;
    }

    const stack = new Stack(); // Using our custom Stack
    const bracketMap = {
        '(': ')',
        '{': '}',
        '[': ']'
    };

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        if (bracketMap[char]) { // It's an opening bracket
            stack.push(bracketMap[char]);
        } else { // It's a closing bracket
            if (stack.isEmpty() || stack.pop() !== char) {
                return false;
            }
        }
    }

    return stack.isEmpty();
}

module.exports = {
    isValidParenthesesUsingArrayAsStack,
    isValidParenthesesUsingCustomStack
};