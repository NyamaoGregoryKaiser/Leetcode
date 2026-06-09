from collections import deque
from typing import List

def max_sliding_window_optimal(nums: List[int], k: int) -> List[int]:
    """
    Finds the maximum in each sliding window of size `k` using a monotonic deque.

    This optimal approach uses a `deque` (double-ended queue) to store indices
    of elements in the current window. The deque is maintained in a strictly
    decreasing order of values.
    - When adding an element: Pop elements from the back of the deque that are
      smaller than the current element, ensuring the decreasing order. Then append
      the current element's index.
    - When removing an element (window slides): If the index at the front of the
      deque falls outside the current window (i.e., `deque[0] == i - k`), pop it
      from the front.
    - The maximum element for the current window is always at `nums[deque[0]]`.

    Args:
        nums (List[int]): The input array of integers.
        k (int): The size of the sliding window.

    Returns:
        List[int]: A list containing the maximum value for each sliding window.

    Time Complexity: O(N), where N is the length of `nums`.
                     Each element is pushed onto the deque and popped from the deque
                     at most once.
    Space Complexity: O(k), as the deque stores at most `k` elements (indices).
    """
    if not nums or k == 0:
        return []
    if k == 1:
        return nums

    n = len(nums)
    result = []
    # Deque stores indices of elements, maintaining a decreasing order of values
    # from front to back. The front element is always the index of the maximum.
    dq = deque() # Stores indices

    for i in range(n):
        # 1. Remove elements from the front if they are outside the current window
        #    (i.e., their index is `k` positions behind the current index `i`).
        if dq and dq[0] == i - k:
            dq.popleft()

        # 2. Remove elements from the back that are smaller than the current element.
        #    This maintains the decreasing order in the deque.
        #    If current element `nums[i]` is greater than `nums[dq[-1]]`, then `nums[dq[-1]]`
        #    can never be the maximum of a future window starting after `dq[-1]`
        #    because `nums[i]` is larger and appears later.
        while dq and nums[dq[-1]] < nums[i]:
            dq.pop()

        # 3. Add the current element's index to the back of the deque.
        dq.append(i)

        # 4. If the window has fully formed (i.e., `i + 1 >= k`), add the maximum
        #    of the current window to the result. The maximum is always at `nums[dq[0]]`.
        if i >= k - 1:
            result.append(nums[dq[0]])

    return result

def max_sliding_window_bruteforce(nums: List[int], k: int) -> List[int]:
    """
    Finds the maximum in each sliding window of size `k` using a brute-force approach.

    This method iterates through all possible sliding windows. For each window,
    it finds the maximum element by iterating through all `k` elements within that window.

    Args:
        nums (List[int]): The input array of integers.
        k (int): The size of the sliding window.

    Returns:
        List[int]: A list containing the maximum value for each sliding window.

    Time Complexity: O(N * k), where N is the length of `nums`.
                     There are `N - k + 1` windows, and finding the maximum in each
                     window takes O(k) time.
    Space Complexity: O(1) for extra space, excluding the result list.
    """
    if not nums or k == 0:
        return []
    if k == 1:
        return nums

    n = len(nums)
    result = []

    # Iterate from the first possible window start to the last possible window start
    for i in range(n - k + 1):
        current_window_max = float('-inf')
        # Iterate through the current window to find its maximum
        for j in range(i, i + k):
            current_window_max = max(current_window_max, nums[j])
        result.append(current_window_max)

    return result

if __name__ == '__main__':
    test_cases = [
        ([1, 3, -1, -3, 5, 3, 6, 7], 3, [3, 3, 5, 5, 6, 7]),
        ([1], 1, [1]),
        ([1, -1], 1, [1, -1]),
        ([9, 11], 2, [11]),
        ([4, -2], 2, [4]),
        ([7, 2, 4], 2, [7, 4]),
        ([1, 2, 3, 4, 5], 3, [3, 4, 5]),
        ([5, 4, 3, 2, 1], 3, [5, 4, 3]),
        ([1, 3, 1, 2, 0, 5], 3, [3, 3, 2, 5]),
        ([], 0, []),
        ([1, 2, 3], 0, []),
        ([1,2,3,4,5], 1, [1,2,3,4,5]),
        ([1,2,3,4,5], 5, [5]),
    ]

    print("--- Testing max_sliding_window_optimal ---")
    for nums, k, expected in test_cases:
        result = max_sliding_window_optimal(nums, k)
        print(f"Input: {nums}, k: {k}, Expected: {expected}, Got: {result} {'✅' if result == expected else '❌'}")

    print("\n--- Testing max_sliding_window_bruteforce ---")
    for nums, k, expected in test_cases:
        result = max_sliding_window_bruteforce(nums, k)
        print(f"Input: {nums}, k: {k}, Expected: {expected}, Got: {result} {'✅' if result == expected else '❌'}")

    # Additional edge case for empty input
    print("\n--- Additional Edge Cases ---")
    print(f"Input: [], k: 3, Expected: [], Got: {max_sliding_window_optimal([], 3)} {'✅' if max_sliding_window_optimal([], 3) == [] else '❌'}")
    print(f"Input: [1,2,3], k: 4, Expected: [], Got: {max_sliding_window_optimal([1,2,3], 4)} {'✅' if max_sliding_window_optimal([1,2,3], 4) == [] else '❌'}")