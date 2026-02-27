```typescript
/**
 * @fileoverview Problem: Valid Parentheses
 *
 * Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[`, `]`,
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
 * Input: s = "{[]}"
 * Output: true
 *
 * Constraints:
 * 1 <= s.length <= 10^4
 * s consists of parentheses only '()[]{}'.
 */

import { Stack } from '../data-structures/Stack'; // Using our custom Stack implementation

/**
 * Solution 1: Optimal - Using a Stack and a Map
 *
 * This approach iterates through the string once, using a stack to keep track
 * of opening brackets. When a closing bracket is encountered, it checks if the
 * stack's top matches the corresponding opening bracket.
 *
 * Algorithm:
 * 1. Initialize an empty stack.
 * 2. Create a map to store the relationships between closing and opening brackets
 *    (e.g., `')' -> '('`, `'}' -> '{'`, `']' -> '['`). This allows for quick lookup.
 * 3. Iterate through each character of the input string `s`.
 *    a. If the character is an opening bracket (`(`, `{`, `[`), push it onto the stack.
 *    b. If the character is a closing bracket (`)`, `}`, `]`):
 *       i. Check if the stack is empty. If it is, this closing bracket has no
 *          corresponding opening bracket, so the string is invalid. Return `false`.
 *       ii. Pop the top element from the stack.
 *       iii. Compare the popped element with the expected opening bracket for the
 *            current closing bracket (lookup from the map). If they don't match,
 *            the brackets are mismatched, so the string is invalid. Return `false`.
 * 4. After iterating through all characters, if the stack is empty, it means all
 *    opening brackets have been correctly closed. The string is valid. Return `true`.
 *    If the stack is not empty, it means there are unclosed opening brackets,
 *    so the string is invalid. Return `false`.
 *
 * Time Complexity: O(N), where N is the length of the input string `s`.
 *    We iterate through the string once. Stack operations (push, pop, peek, isEmpty)
 *    are O(1) on average for array-based stacks. Map lookups are also O(1) on average.
 *
 * Space Complexity: O(N), where N is the length of the input string `s`.
 *    In the worst-case scenario (e.g., "((((((()))))))"), the stack could store
 *    all opening brackets, leading to space proportional to N/2 (approximately N).
 */
export function isValidParenthesesOptimal(s: string): boolean {
    // Edge case: Empty string is considered valid.
    if (s.length === 0) {
        return true;
    }

    // Edge case: Odd length string cannot be valid as brackets must come in pairs.
    if (s.length % 2 !== 0) {
        return false;
    }

    const stack = new Stack<string>();
    const bracketMap: { [key: string]: string } = {
        ')': '(',
        '}': '{',
        ']': '[',
    };

    for (const char of s) {
        // If it's an opening bracket, push it onto the stack
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else if (char === ')' || char === '}' || char === ']') {
            // If it's a closing bracket
            // Check if the stack is empty (no opening bracket to match)
            if (stack.isEmpty()) {
                return false;
            }
            // Pop the top element and check if it matches the expected opening bracket
            const lastOpenBracket = stack.pop();
            if (lastOpenBracket !== bracketMap[char]) {
                return false;
            }
        }
        // If character is not a bracket, it's an invalid input, but problem constraints
        // say s consists of parentheses only.
    }

    // After iterating, if the stack is empty, all brackets are matched.
    return stack.isEmpty();
}

/**
 * Solution 2: Alternative/Less Optimal (Conceptually same, but avoids custom Stack)
 *
 * This approach uses a native JavaScript array as a stack. The logic is identical
 * to Solution 1. The performance characteristics are also the same in practice.
 * This is merely an illustration of how one might implement without a custom `Stack` class.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
export function isValidParenthesesNativeArray(s: string): boolean {
    if (s.length === 0) {
        return true;
    }
    if (s.length % 2 !== 0) {
        return false;
    }

    const stack: string[] = []; // Using a JS array as a stack
    const bracketMap: { [key: string]: string } = {
        ')': '(',
        '}': '{',
        ']': '[',
    };

    for (const char of s) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else if (char === ')' || char === '}' || char === ']') {
            if (stack.length === 0) { // Check if stack is empty
                return false;
            }
            const lastOpenBracket = stack.pop(); // Pop from stack
            if (lastOpenBracket !== bracketMap[char]) {
                return false;
            }
        }
    }

    return stack.length === 0; // Check if stack is empty
}

/*
 * Brute force solutions for this problem are not practical.
 * A brute force approach might involve trying to match every opening bracket
 * with every subsequent closing bracket, leading to deeply nested loops or
 * complex recursion with memoization. However, the stack-based approach
 * is already optimal in terms of time complexity (linear scan) and space
 * (proportional to nesting depth), making a "brute force" that is truly worse
 * yet still correct very difficult to construct without being overly artificial.
 * The stack directly provides the "last opened, first closed" logic needed,
 * making it the natural and optimal fit.
 */
```