const Stack = require('../data-structures/Stack');

/**
 * Problem 1: Valid Parentheses
 *
 * Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`,
 * determine if the input string is valid.
 *
 * An input string is valid if:
 * 1. Open brackets must be closed by the same type of brackets.
 * 2. Open brackets must be closed in the correct order.
 * 3. Every close bracket has a corresponding open bracket of the same type.
 *
 * Example 1:
 * Input: s = "()"
 * Output: true
 *
 * Example 2:
 * Input: s = "()[]{}"
 * Output: true
 *
 * Example 3:
 * Input: s = "(]"
 * Output: false
 *
 * Example 4:
 * Input: s = "([{}])"
 * Output: true
 *
 * Example 5:
 * Input: s = "]"
 * Output: false
 */

/**
 * Optimal Approach: Using a Stack
 *
 * This approach leverages the LIFO nature of a stack to ensure brackets are closed in the correct order.
 *
 * Algorithm:
 * 1. Initialize an empty stack.
 * 2. Create a map to store the relationships between closing and opening brackets.
 *    E.g., `')': '('`, `'}': '{'`, `']': '['`.
 * 3. Iterate through each character `char` in the input string `s`:
 *    a. If `char` is an opening bracket (`(`, `{`, `[`), push it onto the stack.
 *    b. If `char` is a closing bracket (`)`, `}`, `]`):
 *       i. Check if the stack is empty. If it is, this means we have a closing bracket
 *          without a corresponding opening bracket, so the string is invalid. Return `false`.
 *       ii. Pop the top element from the stack. Let's call it `topElement`.
 *       iii. Compare `topElement` with the expected opening bracket for `char` (obtained from our map).
 *            If they don't match, the order is incorrect or types don't match, so the string is invalid. Return `false`.
 * 4. After iterating through all characters, if the stack is empty, it means all opening brackets
 *    have been correctly closed. The string is valid. Return `true`.
 * 5. If the stack is not empty, it means there are unmatched opening brackets. The string is invalid. Return `false`.
 *
 * Time Complexity: O(N)
 *   - We iterate through the string once.
 *   - Each character involves a constant number of operations (map lookup, stack push/pop).
 * Space Complexity: O(N)
 *   - In the worst case (e.g., "((((("), the stack can hold up to N/2 opening brackets.
 *   - The map for bracket pairs is constant space.
 */
function isValidParentheses(s) {
    // Edge case: An odd length string can never be valid as brackets must come in pairs.
    if (s.length % 2 !== 0) {
        return false;
    }

    const stack = new Stack();
    const map = {
        ')': '(',
        '}': '{',
        ']': '['
    };

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        // If it's an opening bracket, push it to the stack
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        }
        // If it's a closing bracket
        else {
            // If the stack is empty, there's no matching opening bracket
            if (stack.isEmpty()) {
                return false;
            }

            // Pop the top element and check if it's the corresponding opening bracket
            const topElement = stack.pop();
            if (map[char] !== topElement) {
                return false; // Mismatch in bracket type or order
            }
        }
    }

    // After iterating through the entire string, if the stack is empty,
    // all opening brackets have been correctly closed.
    return stack.isEmpty();
}

/**
 * Alternative Approach (Conceptual - less common for interviews unless specifically asked for recursive,
 * or as a less efficient brute-force idea for discussion)
 *
 * Brute-force/Recursive Replacement (Less Optimal):
 * One could repeatedly find and replace "()", "[]", "{}" pairs in the string until no more replacements can be made.
 * If the string becomes empty, it's valid. Otherwise, it's invalid.
 *
 * Example: "({[]})"
 * 1. "({})"
 * 2. "()"
 * 3. "" -> Valid
 *
 * Time Complexity: O(N^2) in worst case (string manipulation can be costly, e.g., if you use `replace` in a loop).
 * Space Complexity: O(N) for new string creations.
 * This is generally not the preferred interview solution due to efficiency.
 */
function isValidParenthesesBruteForce(s) {
    // This is less efficient and typically not the desired solution,
    // but serves as a conceptual alternative.
    let prevLength = s.length + 1; // Initialize with a value > s.length
    while (s.length > 0 && s.length < prevLength) {
        prevLength = s.length;
        s = s.replace('()', '');
        s = s.replace('[]', '');
        s = s.replace('{}', '');
    }
    return s.length === 0;
}


module.exports = { isValidParentheses, isValidParenthesesBruteForce };