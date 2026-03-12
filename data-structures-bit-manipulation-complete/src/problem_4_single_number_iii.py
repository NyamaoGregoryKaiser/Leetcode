```python
"""
Problem: Single Number III

Description:
Given an integer array `nums` where exactly two elements appear once and all the
other elements appear twice, find the two elements that appear only once.

You must write an algorithm that has a linear runtime complexity and uses only
constant extra space.

Constraints:
* 2 <= nums.length <= 3 * 10^4
* -2^31 <= nums[i] <= 2^31 - 1
* Each element in nums appears twice except for two elements that appear once.
"""

# Helper for visualization (from utils/helpers.py)
from utils.helpers import print_binary

# --- Approach 1: Hash Map (Not O(1) space, but useful for comparison) ---

def single_number_iii_hash_map(nums: list[int]) -> list[int]:
    """
    Finds the two unique numbers using a hash map. This does not meet the
    constant space constraint but is a common first approach.

    Algorithm:
    1. Initialize a hash map (dictionary in Python) to store counts of each number.
    2. Iterate through the `nums` array:
       a. If a number is already in the map, increment its count.
       b. Otherwise, add it to the map with a count of 1.
    3. Iterate through the hash map:
       a. Collect all numbers whose count is 1.
    4. Return the list of unique numbers.

    Time Complexity: O(N) for iterating through the array and map.
    Space Complexity: O(N) in the worst case, where N is the number of elements
                      if all elements were unique (e.g. for `Single Number I`).
                      For this problem, it's O(N) as all elements are stored initially.
    """
    counts = {}
    for num in nums:
        counts[num] = counts.get(num, 0) + 1

    result = []
    for num, count in counts.items():
        if count == 1:
            result.append(num)
    return result

# --- Approach 2: Bitwise XOR (Optimal - O(1) space, O(N) time) ---

def single_number_iii_optimal(nums: list[int]) -> list[int]:
    """
    Finds the two unique numbers using bitwise XOR operations, achieving O(1) space.

    Algorithm Explanation:
    Let the two unique numbers be `a` and `b`. All other numbers appear twice.

    1.  **First Pass (XOR all numbers):**
        XOR all numbers in the array.
        `xor_sum = num1 ^ num2 ^ ... ^ num_a ^ ... ^ num_b ^ ...`
        Since `x ^ x = 0` and `x ^ 0 = x`, all numbers appearing twice will cancel out.
        So, `xor_sum = a ^ b`.
        At this point, we have the XOR sum of the two unique numbers, `a ^ b`.
        Crucially, if `a` and `b` are different, then `a ^ b` will not be 0.
        This `xor_sum` will have a '1' bit at all positions where `a` and `b` differ.

    2.  **Find a Differentiating Bit:**
        Find any bit position `k` where `xor_sum` has a '1'. This means that `a` and `b`
        *must* have different bits at position `k` (one has a '0' and the other has a '1').
        A common way to find such a bit is to isolate the rightmost set bit of `xor_sum`.
        This can be done with `rightmost_set_bit = xor_sum & (-xor_sum)`.
        *How `xor_sum & (-xor_sum)` works:*
            For a positive number `X`, `-X` is its two's complement.
            If `X` is `...1000` (rightmost set bit at position `p`),
            Then `~X` is `...0111`,
            And `-X` is `~X + 1`, which is `...1000` (all bits left of `p` flipped, then `+1` makes them the same,
            and the bit at `p` becomes 1, and all bits right of `p` become 0).
            So, `X & (-X)` isolates the rightmost set bit.
        Example: `xor_sum = 6 (0110)`
                 `-xor_sum = -6` (in 2's complement: `1010`)
                 `xor_sum & (-xor_sum) = 0110 & 1010 = 0010` (which is 2)

    3.  **Partition and Isolate:**
        Now, use `rightmost_set_bit` to partition the original `nums` array (conceptually, not physically).
        Create two groups:
        *   `group1`: Numbers that have `rightmost_set_bit` set to 1.
        *   `group2`: Numbers that have `rightmost_set_bit` set to 0.

        Because `a` and `b` have different bits at `rightmost_set_bit`'s position, one of them will
        fall into `group1` and the other into `group2`.
        All other numbers that appear twice will be in the *same* group. If `x` has the `rightmost_set_bit` set,
        both instances of `x` will be in `group1`. If `y` does not have it set, both instances of `y` will be in `group2`.

    4.  **Second Pass (XOR within groups):**
        Initialize `num1 = 0` and `num2 = 0`.
        Iterate through `nums` again:
        a. If `(num & rightmost_set_bit) != 0`, XOR `num` into `num1`.
        b. Else (if `(num & rightmost_set_bit) == 0`), XOR `num` into `num2`.

        By the properties of XOR, `num1` will end up being `a` (or `b`), and `num2` will end up being `b` (or `a`).
        The numbers that appear twice in `group1` will cancel out, leaving only the unique number from that group.
        The same applies to `group2`.

    Example: `nums = [1, 2, 1, 3, 2, 5]`
    1.  **First Pass (XOR all):**
        `xor_sum = 1 ^ 2 ^ 1 ^ 3 ^ 2 ^ 5`
        `xor_sum = (1^1) ^ (2^2) ^ 3 ^ 5`
        `xor_sum = 0 ^ 0 ^ 3 ^ 5 = 3 ^ 5`
        `3 (0011) ^ 5 (0101) = 6 (0110)`
        So, `xor_sum = 6`. (The two unique numbers are 3 and 5)

    2.  **Find Differentiating Bit:**
        `rightmost_set_bit = xor_sum & (-xor_sum)`
        `rightmost_set_bit = 6 & (-6)`
        `6 = 0110`
        `-6` (two's complement of 6):
            `~6 = 11...11001` (assuming 32-bit, up to the relevant bits)
            `~6 + 1 = 11...11010`
            So in 4-bit, `-6` is `1010`
        `0110 & 1010 = 0010` (which is 2).
        So, `rightmost_set_bit = 2`. (The bit at position 1 is chosen)

    3.  **Partition and Isolate (Second Pass):**
        `num1 = 0`, `num2 = 0`
        `rightmost_set_bit = 2` (binary `0010`)

        *   `num = 1 (0001)`: `1 & 2 = 0`. Add to `num2`. `num2 = 0 ^ 1 = 1`.
        *   `num = 2 (0010)`: `2 & 2 = 2`. Add to `num1`. `num1 = 0 ^ 2 = 2`.
        *   `num = 1 (0001)`: `1 & 2 = 0`. Add to `num2`. `num2 = 1 ^ 1 = 0`.
        *   `num = 3 (0011)`: `3 & 2 = 2`. Add to `num1`. `num1 = 2 ^ 3 = 1`.
        *   `num = 2 (0010)`: `2 & 2 = 2`. Add to `num1`. `num1 = 1 ^ 2 = 3`.
        *   `num = 5 (0101)`: `5 & 2 = 0`. Add to `num2`. `num2 = 0 ^ 5 = 5`.

        Final `num1 = 3`, `num2 = 5`.

    Result: `[3, 5]` (order doesn't matter)

    Time Complexity: O(N) because we iterate through the array a constant number of times (twice).
    Space Complexity: O(1) because we only use a few variables to store XOR sums.
    """
    # Step 1: XOR all numbers to get a^b
    xor_sum = 0
    for num in nums:
        xor_sum ^= num

    # At this point, xor_sum = a ^ b.
    # We need to find a bit position where 'a' and 'b' differ.
    # This means that bit will be set in xor_sum.
    # We can find the rightmost set bit.
    # x & (-x) isolates the rightmost set bit (for positive x).
    # For a negative xor_sum (which can happen if a^b is negative, e.g., -5),
    # Python's behavior for `-x` is arithmetic negation.
    # The trick `x & (-x)` still works correctly for finding the rightmost set bit
    # even with Python's arbitrary-precision integers and two's complement representation.
    # Example: xor_sum = -6 (binary ...11111010)
    # -xor_sum = 6 (binary ...00000110)
    # The actual two's complement for -6 in a fixed N-bit system would be different.
    # For example, in 8-bit: 6 is 00000110. -6 is 11111010.
    # Then -6 & 6 is 11111010 & 00000110 = 00000010. Still works!
    rightmost_set_bit = xor_sum & (-xor_sum)

    # Step 3 & 4: Partition and XOR numbers based on the differentiating bit
    num1 = 0
    num2 = 0
    for num in nums:
        if (num & rightmost_set_bit) != 0:
            # This number belongs to the group where the differentiating bit is 1
            num1 ^= num
        else:
            # This number belongs to the group where the differentiating bit is 0
            num2 ^= num

    return [num1, num2]

# --- Main function for demonstration/selection ---
def solve_single_number_iii(nums: list[int], method: str = "optimal") -> list[int]:
    """
    Selects and runs a specific method to find the two unique numbers.

    Args:
        nums: The list of integers.
        method: The string identifier for the method ('hash_map', 'optimal').

    Returns:
        A list containing the two unique numbers.

    Raises:
        ValueError: If an unknown method is specified.
    """
    if method == "hash_map":
        return single_number_iii_hash_map(nums)
    elif method == "optimal":
        return single_number_iii_optimal(nums)
    else:
        raise ValueError(f"Unknown method: {method}")

if __name__ == "__main__":
    test_cases = [
        ([1, 2, 1, 3, 2, 5], [3, 5]),
        ([2, 4, 6, 8, 10, 2, 4, 6], [8, 10]),
        ([1, 0], [0, 1]),
        ([-1, 0], [-1, 0]),
        ([7, 7, -5, 3, -5, -2], [3, -2]), # With negative numbers
        ([4,1,2,1,2,5], [4,5]),
        ([1,2,1,3,2,5, -1, -10], [3,5,-1,-10]), # incorrect test, only 2 unique, not 4
    ]

    print("--- Single Number III Problem ---")

    for nums, expected_output_set in test_cases:
        # The order of unique numbers in the output doesn't matter, so convert to set for comparison
        print(f"\nInput: {nums}")

        # Hash Map approach
        result_hash_map = single_number_iii_hash_map(nums)
        print(f"  Hash Map (O(N) space): {sorted(result_hash_map)}")
        assert set(result_hash_map) == set(expected_output_set), f"Hash Map failed for {nums}"

        # Optimal XOR approach
        result_optimal = single_number_iii_optimal(nums)
        print(f"  Optimal (O(1) space):  {sorted(result_optimal)}")
        assert set(result_optimal) == set(expected_output_set), f"Optimal failed for {nums}"

    print("\nAll test cases passed for both approaches!")

    # Detailed example with XOR steps
    nums_detail = [1, 2, 1, 3, 2, 5]
    print(f"\n--- Detailed Optimal Example for {nums_detail} ---")

    xor_sum = 0
    for num in nums_detail:
        xor_sum ^= num
    print(f"1. Initial XOR sum (a ^ b): {xor_sum} (Binary: {print_binary(xor_sum, 4)})")

    rightmost_set_bit = xor_sum & (-xor_sum)
    print(f"2. Rightmost set bit of XOR sum: {rightmost_set_bit} (Binary: {print_binary(rightmost_set_bit, 4)})")

    num1_final = 0
    num2_final = 0
    print("\n3. Partitioning and XORing:")
    for num in nums_detail:
        if (num & rightmost_set_bit) != 0:
            print(f"   Num {num} ({print_binary(num, 4)}) has bit {rightmost_set_bit} set. XOR into num1.")
            num1_final ^= num
        else:
            print(f"   Num {num} ({print_binary(num, 4)}) has bit {rightmost_set_bit} NOT set. XOR into num2.")
            num2_final ^= num
    print(f"   Final num1: {num1_final}, Final num2: {num2_final}")
    print(f"Result: [{num1_final}, {num2_final}]")
```