from typing import List

def next_greater_elements_optimal(nums: List[int]) -> List[int]:
    """
    Finds the next greater element for each element in a circular array `nums`.

    This problem can be solved efficiently using a monotonic stack. Since the array
    is circular, we effectively iterate through the array twice (or by extending it
    virtually to `nums + nums`). The stack stores indices of elements for which
    we haven't yet found a next greater element. The stack maintains a decreasing
    order of elements by value (from bottom to top).

    Algorithm:
    1. Initialize `result` array with -1 for all elements (default if no NGE found).
    2. Initialize an empty stack (stores indices).
    3. Iterate through the array twice (equivalent to `2 * n` iterations for a length `n` array).
       Use `i % n` to get the actual index in `nums`.
    4. For each `num = nums[current_idx]`:
        a. While the stack is not empty AND `nums[stack.top()]` is less than `num`:
           This means `num` is the next greater element for `nums[stack.top()]`.
           Pop the top index from the stack, and set `result[popped_idx] = num`.
        b. If `i < n` (i.e., we are in the first pass over the original array):
           Push `current_idx` onto the stack. This is important to only push each
           original index once, so we don't process it multiple times if it keeps
           being less than subsequent elements.

    After the loop, any remaining indices in the stack do not have a next greater
    element in the circular array, and their `result` value will remain -1.

    Args:
        nums (List[int]): The input circular array of integers.

    Returns:
        List[int]: An array where `result[i]` is the next greater element for `nums[i]`.

    Time Complexity: O(N), where N is the length of `nums`.
                     Each element is pushed onto the stack and popped from the stack at most once.
                     We iterate through the array roughly twice.
    Space Complexity: O(N) in the worst case (e.g., a strictly decreasing array),
                      as the stack could store all N elements.
    """
    n = len(nums)
    if n == 0:
        return []

    # Initialize result array with -1s
    result = [-1] * n
    # Stack stores indices of elements
    stack: List[int] = []

    # Iterate through the array twice to handle circularity.
    # The `i % n` ensures we access elements from `nums` correctly.
    for i in range(2 * n):
        current_idx = i % n
        current_num = nums[current_idx]

        # While stack is not empty and the element at the top of the stack
        # is less than the current number:
        # The current number is the next greater element for the stack top.
        while stack and nums[stack[-1]] < current_num:
            result[stack.pop()] = current_num

        # Only push indices from the first pass (0 to n-1) onto the stack.
        # This prevents duplicate indices and ensures `result` is only updated once per original index.
        if i < n:
            stack.append(current_idx)

    return result

if __name__ == '__main__':
    test_cases = [
        ([1, 2, 1], [2, -1, 2]),
        ([1, 2, 3, 4, 3], [2, 3, 4, -1, 4]),
        ([5, 4, 3, 2, 1], [-1, 5, 5, 5, 5]),
        ([1, 1, 1, 1, 1], [-1, -1, -1, -1, -1]),
        ([100, 1, 11, 1, 120, 111, 123, 1], [120, 11, 120, 120, 123, 123, -1, 100]),
        ([13, 7, 6, 12], [-1, 12, 12, 13]), # Example to trace
        ([], []),
        ([7], [-1]),
        ([7, 7, 7], [-1, -1, -1]),
    ]

    print("--- Testing next_greater_elements_optimal ---")
    for nums_input, expected in test_cases:
        result = next_greater_elements_optimal(nums_input)
        print(f"Input: {nums_input}, Expected: {expected}, Got: {result} {'✅' if result == expected else '❌'}")

    print("\n--- Detailed Walkthrough for [13, 7, 6, 12] ---")
    nums = [13, 7, 6, 12]
    n = len(nums)
    result = [-1] * n
    stack = [] # Stores indices

    print(f"Initial: nums={nums}, result={result}, stack={stack}")

    for i in range(2 * n):
        current_idx = i % n
        current_num = nums[current_idx]
        print(f"\nIteration {i}: current_idx={current_idx}, current_num={current_num}")
        print(f"  Stack before processing: {stack}")

        while stack and nums[stack[-1]] < current_num:
            popped_idx = stack.pop()
            result[popped_idx] = current_num
            print(f"    Popped index {popped_idx} (value {nums[popped_idx]}), set result[{popped_idx}] = {current_num}. Result now: {result}")

        if i < n: # Only push original indices during the first pass
            stack.append(current_idx)
            print(f"  Pushed index {current_idx}. Stack now: {stack}")
        else:
            print(f"  Second pass, not pushing index {current_idx} to stack.")

    print(f"\nFinal result for {nums}: {result}")
    assert result == [-1, 12, 12, 13]