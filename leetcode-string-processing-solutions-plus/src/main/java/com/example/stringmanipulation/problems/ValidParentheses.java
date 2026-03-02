```java
package com.example.stringmanipulation.problems;

import java.util.Stack;

/**
 * ValidParentheses
 * Determines if an input string containing just the characters '(', ')', '{', '}', '[' and ']'
 * is valid.
 *
 * An input string is valid if:
 * 1. Open brackets must be closed by the same type of brackets.
 * 2. Open brackets must be closed in the correct order.
 * 3. Every close bracket has a corresponding open bracket of the same type.
 * Note that an empty string is also considered valid.
 */
public class ValidParentheses {

    /**
     * Checks if the input string contains a valid sequence of parentheses using a Stack.
     *
     * Time Complexity: O(N) where N is the length of the string.
     *                  We iterate through the string once, and stack operations (push, pop, peek, isEmpty)
     *                  take O(1) time on average.
     * Space Complexity: O(N) in the worst case.
     *                   For example, a string like "(((((" will push N characters onto the stack.
     *                   A string like "()[]{}" will push and pop, keeping stack size minimal.
     *
     * @param s The input string containing parentheses.
     * @return true if the string is valid, false otherwise.
     */
    public static boolean isValid(String s) {
        // Edge case: Empty string is considered valid.
        if (s == null || s.isEmpty()) {
            return true;
        }

        // If the string has an odd length, it cannot be valid
        // as every opening bracket must have a closing one.
        if (s.length() % 2 != 0) {
            return false;
        }

        // Use a stack to keep track of opening brackets
        Stack<Character> stack = new Stack<>();

        // Iterate through each character in the string
        for (char c : s.toCharArray()) {
            switch (c) {
                // If it's an opening bracket, push it onto the stack
                case '(':
                case '{':
                case '[':
                    stack.push(c);
                    break;
                // If it's a closing bracket
                case ')':
                    // If the stack is empty, there's no corresponding opening bracket
                    if (stack.isEmpty() || stack.pop() != '(') {
                        return false;
                    }
                    break;
                case '}':
                    // If the stack is empty, there's no corresponding opening bracket
                    if (stack.isEmpty() || stack.pop() != '{') {
                        return false;
                    }
                    break;
                case ']':
                    // If the stack is empty, there's no corresponding opening bracket
                    if (stack.isEmpty() || stack.pop() != '[') {
                        return false;
                    }
                    break;
                // Handle invalid characters (optional, depending on problem constraints)
                default:
                    // If problem statement guarantees only valid bracket chars, this is not needed
                    // For robustness, we can consider any other char as invalid
                    // return false;
            }
        }

        // After iterating through the entire string, if the stack is empty,
        // all opening brackets have been correctly closed.
        return stack.isEmpty();
    }
}
```