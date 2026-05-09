def next_permutation_in_place(nums: list[int]) -> None:
    """
    Rearranges numbers into the lexicographically next greater permutation.
    If such an arrangement is not possible, it must rearrange it as the lowest
    possible order (i.e., sorted in ascending order).
    The replacement must be in-place and use only constant extra memory.

    Algorithm (Lexicographical Permutation):
    1.  **Find the `pivot` (or `k`):** Iterate from right to left to find the first index `k`
        such that `nums[k] < nums[k+1]`. This `k` is the "pivot" where the change needs to happen.
        If no such `k` is found, the array is in descending order (e.g., [3,2,1]),
        meaning it's the largest permutation, so reverse the entire array to get
        the smallest permutation (e.g., [1,2,3]).

    2.  **Find the `swap_with_pivot` (or `l`):** Iterate from right to left to find the first index `l`
        such that `nums[l] > nums[k]`. This `nums[l]` is the smallest element
        to the right of `k` that is greater than `nums[k]`.

    3.  **Swap:** Swap `nums[k]` and `nums[l]`. Now `nums[k]` has a larger value, but the
        suffix `nums[k+1:]` is still in descending order relative to itself,
        which is not the lexicographically smallest arrangement.

    4.  **Reverse the suffix:** Reverse the subarray `nums[k+1:]`. This makes the suffix
        the smallest possible permutation, achieving the lexicographically next permutation.

    Example: `nums = [1, 5, 8, 4, 7, 6, 5, 3, 1]`

    1.  Find `k`:
        *   `nums[7]=3 < nums[8]=1` (false)
        *   `nums[6]=5 < nums[7]=3` (false)
        *   `nums[5]=6 < nums[6]=5` (false)
        *   `nums[4]=7 < nums[5]=6` (false)
        *   `nums[3]=4 < nums[4]=7` (true!) -> `k = 3` (nums[k] = 4)
        Current array: `[1, 5, 8, **4**, 7, 6, 5, 3, 1]`

    2.  Find `l` (first element from right > nums[k]=4):
        *   `nums[8]=1 > 4` (false)
        *   `nums[7]=3 > 4` (false)
        *   `nums[6]=5 > 4` (true!) -> `l = 6` (nums[l] = 5)
        Current array: `[1, 5, 8, **4**, 7, 6, **5**, 3, 1]`

    3.  Swap `nums[k]` and `nums[l]`: `nums[3]` and `nums[6]`
        `[1, 5, 8, **5**, 7, 6, **4**, 3, 1]`

    4.  Reverse suffix `nums[k+1:]` (from index 4 to end): `[7, 6, 4, 3, 1]` becomes `[1, 3, 4, 6, 7]`
        `[1, 5, 8, 5, **1, 3, 4, 6, 7**]` -> This is the next permutation.

    Time Complexity: O(n), where n is the length of the array.
                     In the worst case, it involves one pass to find `k`, one pass
                     to find `l`, and one pass to reverse the suffix. Each pass is O(n).
    Space Complexity: O(1), as it performs all operations in-place.
    """
    n = len(nums)
    if n <= 1:
        return

    # Step 1: Find the largest index k such that nums[k] < nums[k+1]
    k = n - 2
    while k >= 0 and nums[k] >= nums[k + 1]:
        k -= 1

    # If no such k is found, the array is in descending order.
    # This means it's the largest permutation, so reverse the entire array
    # to get the smallest (ascending) permutation.
    if k == -1:
        nums.reverse()
        return

    # Step 2: Find the largest index l greater than k such that nums[k] < nums[l]
    l = n - 1
    while l > k and nums[l] <= nums[k]:
        l -= 1

    # Step 3: Swap nums[k] and nums[l]
    nums[k], nums[l] = nums[l], nums[k]

    # Step 4: Reverse the sub-array from index k+1 to the end
    # This makes the suffix the smallest possible permutation
    start = k + 1
    end = n - 1
    while start < end:
        nums[start], nums[end] = nums[end], nums[start]
        start += 1
        end -= 1

# Example Usage (demonstrated in main.py)
if __name__ == '__main__':
    def test_permutation(arr, expected):
        original = list(arr)
        next_permutation_in_place(arr)
        print(f"Original: {original}, Next Permutation: {arr}, Expected: {expected}")
        assert arr == expected, f"Failed for {original}. Expected {expected}, got {arr}"

    test_permutation([1, 2, 3], [1, 3, 2])
    test_permutation([3, 2, 1], [1, 2, 3]) # Should become sorted
    test_permutation([1, 1, 5], [1, 5, 1])
    test_permutation([1, 3, 2], [2, 1, 3])
    test_permutation([2, 1, 3], [2, 3, 1])
    test_permutation([2, 3, 1], [3, 1, 2])
    test_permutation([5, 4, 7, 5, 3, 2], [5, 4, 7, 2, 3, 5])
    test_permutation([1], [1])
    test_permutation([], [])
    test_permutation([1, 2], [2, 1])
    test_permutation([2, 1], [1, 2])

    print("\nAll test cases passed!")