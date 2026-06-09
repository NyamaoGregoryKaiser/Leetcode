from typing import List

def is_valid_parentheses_optimal(s: str) -> bool:
    """
    Determines if the input string contains valid parentheses using a stack.

    This optimal approach iterates through the string once. When an opening
    bracket is encountered, its corresponding closing bracket is pushed onto
    the stack. When a closing bracket is encountered, it's compared with
    the top of the stack. If they match, the stack is popped. If not, or
    if the stack is empty, the string is invalid. Finally, if the stack is
    empty, all brackets were matched.

    Args:
        s (str): The input string containing parentheses.

    Returns:
        bool: True if the parentheses are valid, False otherwise.

    Time Complexity: O(N), where N is the length of the string `s`.
                     Each character is processed once.
    Space Complexity: O(N) in the worst case (e.g., "((((("), where N is
                      the length of the string, as the stack could store all
                      opening brackets. In the best case (e.g., "()[]{}"), it's O(1).
    """
    stack: List[str] = []
    # Map opening brackets to their corresponding closing brackets
    mapping = {")": "(", "}": "{", "]": "["}

    for char in s:
        if char in mapping:  # It's a closing bracket
            # Get the top element from the stack. If the stack is empty, assign a dummy value.
            top_element = stack.pop() if stack else '#'
            # If the popped element is not the corresponding opening bracket, it's invalid
            if mapping[char] != top_element:
                return False
        else:  # It's an opening bracket
            stack.append(char)

    # After iterating through the entire string, if the stack is empty,
    # all opening brackets have been correctly matched.
    return not stack

def is_valid_parentheses_alternative(s: str) -> bool:
    """
    An alternative approach to checking valid parentheses.
    This method is functionally identical to the optimal one but
    demonstrates a slightly different way of handling the `mapping`
    and `stack` checks. It's conceptually the same O(N) time and space.

    Args:
        s (str): The input string containing parentheses.

    Returns:
        bool: True if the parentheses are valid, False otherwise.

    Time Complexity: O(N), where N is the length of the string `s`.
                     Each character is processed once.
    Space Complexity: O(N) in the worst case, for the stack.
    """
    stack: List[str] = []
    # Map opening brackets to their corresponding closing brackets
    brackets = {
        '(': ')',
        '{': '}',
        '[': ']'
    }

    for char in s:
        if char in brackets:  # It's an opening bracket
            stack.append(char)
        else:  # It's a closing bracket
            if not stack:
                # No open bracket to match the current closing bracket
                return False
            last_open = stack.pop()
            # Check if the closing bracket matches the last opened bracket
            if brackets[last_open] != char:
                return False

    # If the stack is empty, all brackets are matched.
    return not stack

if __name__ == '__main__':
    test_cases = [
        ("()", True),
        ("()[]{}", True),
        ("{[]}", True),
        ("([{}])", True),
        ("((()))", True),
        ("(", False),
        ("]", False),
        (")(", False),
        ("([)]", False),
        ("{[}]", False),
        ("", True),
        ("{{{", False),
        (")))", False),
        ("{([])}", True),
    ]

    print("--- Testing is_valid_parentheses_optimal ---")
    for s_input, expected in test_cases:
        result = is_valid_parentheses_optimal(s_input)
        print(f"Input: '{s_input}', Expected: {expected}, Got: {result} {'✅' if result == expected else '❌'}")

    print("\n--- Testing is_valid_parentheses_alternative ---")
    for s_input, expected in test_cases:
        result = is_valid_parentheses_alternative(s_input)
        print(f"Input: '{s_input}', Expected: {expected}, Got: {result} {'✅' if result == expected else '❌'}")

    # Edge cases not in test_cases
    print("\n--- Additional Edge Cases ---")
    print(f"Input: '(', Expected: False, Got: {is_valid_parentheses_optimal('(')} {'✅' if is_valid_parentheses_optimal('(') == False else '❌'}")
    print(f"Input: ']', Expected: False, Got: {is_valid_parentheses_optimal(']')} {'✅' if is_valid_parentheses_optimal(']') == False else '❌'}")
    print(f"Input: ']', Expected: False, Got: {is_valid_parentheses_alternative(']')} {'✅' if is_valid_parentheses_alternative(']') == False else '❌'}")