# Algorithm Explanations: Bit Manipulation Project

This document provides detailed explanations for the algorithms implemented in `src/algorithms.py`. It covers the logic behind each approach, time and space complexity analysis, and considers edge cases and common pitfalls.

---

## 1. Count Set Bits (Hamming Weight)

**Problem:** Count the number of '1' bits in the binary representation of an integer.

### Approach 1: Iterating through bits (Right Shift and AND)

**Logic:**
This is the most straightforward method. We check the least significant bit (LSB) of the number. If it's a '1', we increment a counter. Then, we right-shift the number by one position, effectively discarding the LSB and bringing the next bit to the LSB position. We repeat this process until the number becomes zero.

*   `n & 1`: This operation isolates the LSB. If the LSB is 1, the result is 1; otherwise, it's 0.
*   `n >>= 1`: This is a right shift operation. It divides `n` by 2 (integer division) and moves all bits one position to the right. The MSB is filled with 0 (for positive numbers).

**Example (n = 13, binary 1101):**
```
n = 1101 (13) , count = 0
1. LSB: 13 & 1 = 1. count = 1. n = 13 >> 1 = 0110 (6)
2. LSB: 6 & 1 = 0. count = 1. n = 6 >> 1 = 0011 (3)
3. LSB: 3 & 1 = 1. count = 2. n = 3 >> 1 = 0001 (1)
4. LSB: 1 & 1 = 1. count = 3. n = 1 >> 1 = 0000 (0)
Loop ends.
Result: 3
```

**Complexity Analysis:**
*   **Time Complexity:** O(B), where B is the number of bits in the integer. For a standard 32-bit integer, this is O(32). This is equivalent to O(log N) where N is the value of the number.
*   **Space Complexity:** O(1)

**Edge Cases & Gotchas:**
*   **`n = 0`**: The loop condition `current_num > 0` immediately fails, and `count` remains 0, which is correct.
*   **Negative Numbers**: In Python, negative numbers are represented using two's complement. The `>>=` operator performs an *arithmetic* right shift, preserving the sign bit. This means `n` will never become 0 for negative `n` (it approaches -1). For `count_set_bits`, the standard interpretation is usually for unsigned integers. The provided code implicitly assumes positive numbers. If negative numbers are passed, they should first be converted to their unsigned 32-bit equivalent using `n & 0xFFFFFFFF` (or `n & ((1 << num_bits) - 1)` for general `num_bits`). The test cases reflect this by pre-converting.

---

### Approach 2: Brian Kernighan's Algorithm

**Logic:**
This is a more efficient method. The key idea is that the operation `n & (n - 1)` clears the least significant set bit (i.e., the rightmost '1' bit) in `n`. We repeatedly apply this operation and increment a counter until `n` becomes 0. The number of times we perform this operation is exactly the number of set bits.

**How `n & (n - 1)` works:**
Consider a number `n` and its binary representation. Let the LSB be at position `k`.
`n`: `... X 1 0 0 ... 0` (where `X` is any sequence of bits, and the '1' is at position `k`)
`n - 1`: `... X 0 1 1 ... 1` (the '1' at `k` becomes '0', and all subsequent '0's become '1's)
`n & (n - 1)`: `... X 0 0 0 ... 0` (the '1' at `k` is cleared, and all bits to its right remain 0)

**Example (n = 13, binary 1101):**
```
n = 1101 (13) , count = 0
1. n = 1101 (13), n-1 = 1100 (12). n & (n-1) = 1100 (12). count = 1.
2. n = 1100 (12), n-1 = 1011 (11). n & (n-1) = 1000 (8). count = 2.
3. n = 1000 (8) , n-1 = 0111 (7) . n & (n-1) = 0000 (0). count = 3.
Loop ends.
Result: 3
```

**Complexity Analysis:**
*   **Time Complexity:** O(K), where K is the number of set bits. In the worst case (all bits are set), K can be B (number of bits), but typically K is much smaller. This makes it faster than Approach 1 when K is small.
*   **Space Complexity:** O(1)

**Edge Cases & Gotchas:**
*   **`n = 0`**: The loop condition `current_num > 0` immediately fails, and `count` remains 0, which is correct.
*   **Negative Numbers**: Similar to Approach 1, this algorithm is designed for positive integers. For negative numbers, `n - 1` and subsequent `n & (n - 1)` operations behave incorrectly due to two's complement representation if not properly handled (e.g., converted to unsigned equivalent).

---

## 2. Power of Two

**Problem:** Determine if a given integer is a power of two.

### Approach 1: Loop and Divide

**Logic:**
A positive integer `n` is a power of two if it can be repeatedly divided by 2 until it reaches 1. If at any point during this division, the number is not divisible by 2 (and not 1), it is not a power of two.
First, handle the base and invalid cases: numbers less than or equal to 0 are not powers of two. `n=1` is `2^0`, so it's a power of two.

**Example (n = 16):**
```
n = 16
1. 16 % 2 == 0. n = 16 // 2 = 8.
2. 8 % 2 == 0. n = 8 // 2 = 4.
3. 4 % 2 == 0. n = 4 // 2 = 2.
4. 2 % 2 == 0. n = 2 // 2 = 1.
Loop ends. n == 1 is True.
Result: True
```

**Complexity Analysis:**
*   **Time Complexity:** O(log N). Each division by 2 reduces the number by half.
*   **Space Complexity:** O(1)

**Edge Cases & Gotchas:**
*   **`n <= 0`**: Handled explicitly by returning `False`.
*   **`n = 1`**: The loop is skipped, and `n == 1` returns `True`, which is correct.

---

### Approach 2: Bit Manipulation

**Logic:**
A positive integer `n` is a power of two if and only if its binary representation has exactly one set bit.
For example:
*   `1 (2^0)`: `0001`
*   `2 (2^1)`: `0010`
*   `4 (2^2)`: `0100`
*   `8 (2^3)`: `1000`

We can leverage the property used in Brian Kernighan's algorithm: `n & (n - 1)` clears the least significant set bit. If `n` has only one set bit, then `n & (n - 1)` will result in `0`.

We must also ensure that `n` is strictly positive, as `0` has all zero bits but is not considered a power of two, and `n & (n-1)` would evaluate to `0` for `n=0` which is misleading.

**Example (n = 8, binary 1000):**
```
n   = 1000 (8)
n-1 = 0111 (7)
n & (n-1) = 0000 (0)
Since n > 0 and (n & (n-1)) == 0, result is True.
```

**Example (n = 6, binary 0110):**
```
n   = 0110 (6)
n-1 = 0101 (5)
n & (n-1) = 0100 (4)
Since n & (n-1) is not 0, result is False.
```

**Complexity Analysis:**
*   **Time Complexity:** O(1). All bitwise operations are constant time.
*   **Space Complexity:** O(1)

**Edge Cases & Gotchas:**
*   **`n <= 0`**: Handled explicitly by checking `n > 0`. Without this check, `n=0` would return `True` (as `0 & -1` is `0` in Python), which is incorrect.
*   **`n = 1`**: `1 & (1 - 1) = 1 & 0 = 0`. Correctly returns `True`.

---

## 3. Reverse Bits

**Problem:** Reverse the bits of a given 32-bit unsigned integer.

### Approach 1: Iterative Shifting and Building

**Logic:**
This approach constructs the reversed number bit by bit. We iterate `num_bits` times (typically 32). In each iteration:
1.  We left-shift our `reversed_num` by one position. This makes space for the next bit from the original number `n`.
2.  We extract the LSB of `n` using `n & 1`.
3.  We OR the extracted LSB into the `reversed_num`.
4.  We right-shift `n` by one position to process its next bit.

**Visual Example (n = 0b1101, num_bits = 4):**
```
n          = 0b1101
reversed_num = 0b0000

Iteration 1 (k=0):
  reversed_num <<= 1 : 0b0000
  n & 1              : 0b0001 (LSB of n)
  reversed_num |= 1  : 0b0001
  n >>= 1            : 0b0110 (n is now 6)

Iteration 2 (k=1):
  reversed_num <<= 1 : 0b0010
  n & 1              : 0b0000 (LSB of n)
  reversed_num |= 0  : 0b0010
  n >>= 1            : 0b0011 (n is now 3)

Iteration 3 (k=2):
  reversed_num <<= 1 : 0b0100
  n & 1              : 0b0001 (LSB of n)
  reversed_num |= 1  : 0b0101
  n >>= 1            : 0b0001 (n is now 1)

Iteration 4 (k=3):
  reversed_num <<= 1 : 0b1010
  n & 1              : 0b0001 (LSB of n)
  reversed_num |= 1  : 0b1011
  n >>= 1            : 0b0000 (n is now 0)

Result: 0b1011 (decimal 11)
```

**Complexity Analysis:**
*   **Time Complexity:** O(B), where B is the number of bits (e.g., 32). The loop runs `B` times, and each operation inside is O(1).
*   **Space Complexity:** O(1)

**Edge Cases & Gotchas:**
*   **`n = 0`**: `reversed_num` remains 0, which is correct.
*   **`n` with all 1s (e.g., `0xFFFFFFFF`)**: `reversed_num` also becomes all 1s.
*   **Negative `n`**: The problem specifies "unsigned integer." If a negative `n` is provided, it should typically be treated as its `num_bits`-bit unsigned equivalent (e.g., `n & 0xFFFFFFFF` for 32-bit). The code handles this by converting negative `n` to its unsigned equivalent before processing.
*   **Python's arbitrary precision integers**: Python integers automatically adjust their size. For this problem, we explicitly limit the context to `num_bits` (default 32) and mask the final result to ensure it fits within `num_bits` for unsigned context.

### Approach 2: Optimized Swapping (for fixed-size integers) - *Discussed, not fully generalized in code*

**Logic:**
This method performs bit reversals in stages. For a 32-bit integer, it involves 5 stages (since `log2(32) = 5`). Each stage swaps adjacent groups of bits of increasing size:
1.  Swap adjacent 1-bit groups.
2.  Swap adjacent 2-bit groups.
3.  Swap adjacent 4-bit groups.
4.  Swap adjacent 8-bit groups.
5.  Swap adjacent 16-bit groups.

This is done by using specific bitmasks and shifts. For example, to swap adjacent 1-bit groups (i.e., bit `i` with bit `i+1`):
*   Mask out all bits at odd positions (`0x55555555` = `01010101...`). Shift these left by 1.
*   Mask out all bits at even positions (`0xAAAAAAAA` = `10101010...`). Shift these right by 1.
*   OR the two results.

This approach is faster because it does more work in parallel (using bitwise parallelism).

**Example (32-bit, first stage: swapping 1-bit groups):**
`n = b31 b30 b29 b28 ... b3 b2 b1 b0`
`mask_01 = 0x55555555` (`01010101...01`)
`mask_10 = 0xAAAAAAAA` (`10101010...10`)

1.  `(n & mask_01) << 1`: Extracts `0 b30 0 b28 ... 0 b2 0 b0`, then shifts left: `b30 0 b28 0 ... b2 0 b0 0`
2.  `(n & mask_10) >> 1`: Extracts `b31 0 b29 0 ... b3 0 b1 0`, then shifts right: `0 b31 0 b29 ... 0 b3 0 b1`
3.  `|`: ORs them to get `b30 b31 b28 b29 ... b2 b3 b0 b1`

**Complexity Analysis:**
*   **Time Complexity:** O(log B), where B is the number of bits. For 32-bit, it's 5 operations.
*   **Space Complexity:** O(1)

**Drawbacks:**
*   More complex to implement and understand.
*   Relies on specific bitmasks that are hardcoded for `num_bits`. Generalizing this for arbitrary `num_bits` would require dynamic mask generation, making it less elegant.
*   Often not expected in a general interview unless you are specializing in low-level optimizations.

---

## 4. Single Number

**Problem:** Find the single element in an array where every other element appears twice.

### Approach 1: Hash Map (Brute Force / Common non-bit approach)

**Logic:**
This approach uses a hash map (dictionary in Python) to count the occurrences of each number in the array. After iterating through the array and populating the map, we iterate through the map to find the number with a count of 1.

**Example (nums = [4, 1, 2, 1, 2]):**
1.  Initialize `counts = {}`
2.  `4`: `counts = {4: 1}`
3.  `1`: `counts = {4: 1, 1: 1}`
4.  `2`: `counts = {4: 1, 1: 1, 2: 1}`
5.  `1`: `counts = {4: 1, 1: 2, 2: 1}`
6.  `2`: `counts = {4: 1, 1: 2, 2: 2}`
7.  Iterate `counts`:
    *   `4`: count is 1. Return 4.

**Complexity Analysis:**
*   **Time Complexity:** O(N) for iterating through the array and populating the hash map. Another O(N) in the worst case for iterating through the map. Total O(N).
*   **Space Complexity:** O(N) in the worst case (if all numbers were unique, or if the single number appeared last in a large unique set).

**Drawbacks:** Uses extra space, which bit manipulation can avoid.

---

### Approach 2: Bit Manipulation (XOR Property)

**Logic:**
This is the optimal approach using bitwise XOR. The XOR operation (`^`) has several useful properties:
*   **Identity:** `a ^ 0 = a`
*   **Self-inverse:** `a ^ a = 0`
*   **Commutative:** `a ^ b = b ^ a`
*   **Associative:** `a ^ (b ^ c) = (a ^ b) ^ c`

By XORing all numbers in the array, all numbers that appear twice will effectively "cancel each other out" due to `a ^ a = 0`. The unique number, which appears only once, will be XORed with `0` (the result of all pairs canceling out), leaving the unique number itself (`0 ^ unique_num = unique_num`).

**Example (nums = [4, 1, 2, 1, 2]):**
```
single = 0
single ^= 4  (0 ^ 4 = 4)
single ^= 1  (4 ^ 1 = 5)
single ^= 2  (5 ^ 2 = 7)
single ^= 1  (7 ^ 1 = 6)
single ^= 2  (6 ^ 2 = 4)

Result: 4
```
Let's trace the binary:
`000_2` (initial)
`000 ^ 100 = 100` (4)
`100 ^ 001 = 101` (5)
`101 ^ 010 = 111` (7)
`111 ^ 001 = 110` (6)
`110 ^ 010 = 100` (4)

**Complexity Analysis:**
*   **Time Complexity:** O(N) because we iterate through the array once.
*   **Space Complexity:** O(1) because we only use a single variable to store the XOR sum.

**Advantages:** Optimal in both time and space complexity. This is the preferred solution for this problem in an interview.

---

## 5. Insert M into N

**Problem:** Insert a shorter `M` into a longer `N` between bit positions `i` and `j`.

### Approach: Clear bits in N, then OR with M shifted.

**Logic:**
This problem can be broken down into two main steps:
1.  **Clear the target bits in `N`**: Create a mask that has `0`s from bit `i` to bit `j` (inclusive) and `1`s everywhere else. Then, `AND` `N` with this mask to clear the bits in the target range.
2.  **Shift `M` and insert**: Shift `M` left by `i` positions so that its LSB aligns with bit `i` of `N`. Then, `OR` this shifted `M` with the cleared `N`. Since the target bits in `N` are now `0`s, the `OR` operation will correctly insert `M`'s bits without affecting other bits of `N`.

**Visualizing the mask creation (for `num_bits=32`, `i=2`, `j=6`):**

1.  **Create `left_mask`**: All ones up to bit `j+1`, then zeros.
    *   `~0` (all 1s)
    *   `~0 << (j + 1)`: Shifts all 1s left by `j+1` positions. This creates `...11111` followed by `j+1` zeros.
    *   Example `j=6`, `j+1=7`: `...111110000000` (7 zeros)
    ```
    MSB                                 LSB
    ... 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 (~0)
    << (j+1) = 7
    ... 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 (left_mask)
                                                            ^ ^ ^ ^ ^ ^ ^
                                                            | j+1=7     | i=2
                                                            j=6
    ```
2.  **Create `right_mask`**: All ones from bit `0` up to bit `i-1`, then zeros.
    *   `(1 << i)`: Creates a '1' at bit `i`, all other bits 0. (`00...0100` for `i=2`)
    *   `(1 << i) - 1`: Creates `i` number of '1's from bit `0` to `i-1`. (`00...00011` for `i=2`)
    ```
    MSB                                 LSB
    ... 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 (right_mask)
                                                                    ^ ^
                                                                    | i-1=1
                                                                    i=2
    ```
3.  **Combine masks**: `mask = left_mask | right_mask`. This creates a mask with `0`s between `i` and `j` and `1`s everywhere else.
    ```
    MSB                                 LSB
    ... 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 1 1 (mask)
                                                            ^ ^ ^ ^ ^ ^ ^
                                                            | j=6     | i=2
    ```
4.  **Clear bits in N**: `N_cleared = N & mask`.
    *   Example: `N = ...10100010100_2` (where `...` are other bits)
    *   `N & mask` will result in `...10100000000_2` (bits `i` to `j` are now 0s).
5.  **Shift M**: `M_shifted = M << i`.
    *   Example: `M = 0b10011` (`10011_2`). `i=2`.
    *   `M_shifted = 0b10011 << 2 = 0b1001100_2`.
6.  **Insert M**: `result = N_cleared | M_shifted`.
    *   `N_cleared = ...10100000000_2`
    *   `M_shifted =   ...0001001100_2`
    *   `result    = ...1011001100_2`

**Complexity Analysis:**
*   **Time Complexity:** O(1) as all operations are fixed-time bitwise operations.
*   **Space Complexity:** O(1)

**Edge Cases & Gotchas:**
*   **`i` and `j` bounds**: `0 <= i <= j < num_bits` must be enforced. If `i > j`, the mask creation logic breaks. If `i` or `j` are out of `num_bits` bounds, bit shifts can behave unexpectedly or target non-existent bits.
*   **`M` size**: The problem statement assumes `M` fits. If `M` is too large for the `(j - i + 1)` bit slot, the higher-order bits of `M` will overflow into `N`'s other bits. A robust solution might check `M < (1 << (j - i + 1))`.
*   **Python's arbitrary precision**: The final result is masked with `(1 << num_bits) - 1` to ensure it represents an `num_bits`-length unsigned integer, as Python integers can grow arbitrarily large. This mimics fixed-width integer behavior found in languages like C/Java.

---
*(End of Algorithm Explanation Document)*