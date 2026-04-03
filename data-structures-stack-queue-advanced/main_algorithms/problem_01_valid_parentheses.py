from collections import deque

"""
Problem 1: Valid Parentheses

Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', 
determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "()[]{}"
Output: true

Example 3:
Input: s = "(]"
Output: false

Constraints:
1 <= s.length <= 10^4
s consists of parentheses only '()[]{}'.
"""

class Solution:
    def isValid(self, s: str) -> bool:
        """
        Determines if the input string of parentheses is valid.

        This approach uses a stack (implemented with collections.deque) to keep track of
        open brackets. When a closing bracket is encountered, it checks if the top of
        the stack contains the corresponding open bracket.

        Time Complexity: O(N), where N is the length of the string `s`.
                         We iterate through the string once, performing constant time
                         stack operations (push, pop, peek).
        Space Complexity: O(N) in the worst case. For a string like "((((()))))",
                          the stack can grow up to N/2 elements. In the best case
                          (e.g., "()()()"), space is O(1) if balanced pairs immediately
                          cancel out.
        """
        # A dictionary to map closing brackets to their corresponding open brackets.
        bracket_map = {")": "(", "}": "{", "]": "["}
        
        # Use a deque from the collections module as a stack for efficient appends and pops.
        stack = deque() 

        for char in s:
            if char in bracket_map:  # If the character is a closing bracket
                # Pop the top element from the stack. If the stack is empty, 
                # assign a dummy value (like '#') to 'top_element' to avoid errors.
                # An empty stack at this point means a closing bracket appeared without
                # a corresponding opening bracket.
                top_element = stack.pop() if stack else '#'
                
                # Check if the popped element is the corresponding open bracket.
                if bracket_map[char] != top_element:
                    return False
            else:  # If the character is an opening bracket
                # Push the opening bracket onto the stack.
                stack.append(char)
        
        # After iterating through the entire string, if the stack is empty,
        # it means all open brackets have been correctly closed.
        # Otherwise, there are unmatched open brackets.
        return not stack

# Example usage:
if __name__ == "__main__":
    sol = Solution()

    # Test cases
    print(f"\"()\" is valid: {sol.isValid(\"()\")}")         # Expected: True
    print(f"\"()[]{}\" is valid: {sol.isValid(\"()[]{}\")}") # Expected: True
    print(f"\"(]\" is valid: {sol.isValid(\"(]\")}")         # Expected: False
    print(f"\"([{}])\" is valid: {sol.isValid(\"([{}])\")}") # Expected: True
    print(f"\"((()))\" is valid: {sol.isValid(\"((()))\")}") # Expected: True
    print(f"\"{{{)}\" is valid: {sol.isValid(\"{{{)}\")}")   # Expected: False
    print(f"\"\" is valid: {sol.isValid(\"\")}")             # Expected: True (empty string is valid)
    print(f"\"[\" is valid: {sol.isValid(\"[\")}")           # Expected: False
    print(f"\"]\" is valid: {sol.isValid(\"]\")}")           # Expected: False