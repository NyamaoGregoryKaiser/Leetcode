```markdown
# Bit Manipulation Algorithms: Detailed Explanations

This document provides in-depth explanations for each bit manipulation problem implemented in the project, including the logic, various approaches, time/space complexity analysis, and illustrative ASCII diagrams.

---

## 1. Count Set Bits (Hamming Weight)

**Problem:** Write a function that takes an unsigned 32-bit integer and returns the number of '1' bits it has (also known as the Hamming weight).

### Approach 1: Brute-Force (Iterative Check)

**Logic:**
The simplest way to count set bits is to iterate through each bit of the number. We can check the Least Significant Bit (LSB) using the bitwise AND operator with 1 (`n & 1`). If the LSB is 1, we increment a counter. After checking, we right-shift the number by 1 (`n >>= 1`) to bring the next bit to the LSB position. We repeat this process 32 times for a 32-bit integer.

**ASCII Diagram:**
```
n = 12 (0000 1100)
Initial count = 0

Iteration 1:
  n        = 0000 1100
  n & 1    = 0000 1100 & 0000 0001 = 0 (LSB is 0)
  count    = 0
  n >>= 1  = 0000 0110

Iteration 2:
  n        = 0000 0110
  n & 1    = 0000 0110 & 0000 0001 = 0 (LSB is 0)
  count    = 0
  n >>= 1  = 0000 0011

Iteration 3:
  n        = 0000 0011
  n & 1    = 0000 0011 & 0000 0001 = 1 (LSB is 1)
  count    = 1
  n >>= 1  = 0000 0001

... (continue for 32 iterations)
```

**Complexity:**
*   **Time:** O(1) because the number of iterations is fixed at 32 (for a 32-bit integer). More generally, O(log N) where N is the value of the number, or O(number of bits).
*   **Space:** O(1) as only a few variables are used.

### Approach 2: Brian Kernighan's Algorithm

**Logic:**
This is an optimized approach. It's based on the observation that `n & (n - 1)` clears the least significant set bit (rightmost '1' bit) in `n`. By repeatedly performing this operation and incrementing a counter until `n` becomes 0, we can count the total number of set bits. This method is faster when the number of set bits (`k`) is small, as it only runs `k` times, not 32 times.

**How `n & (n - 1)` works:**
*   Consider `n = 12` (binary `...01100`).
*   `n - 1` would be `11` (binary `...01011`).
*   `n & (n - 1)`:
    ```
      ...01100 (n)
    & ...01011 (n-1)
    ------------
      ...01000 (result is 8)
    ```
    The rightmost '1' at position 2 (0-indexed) has been cleared.

**ASCII Diagram:**
```
n = 12 (0000 1100)
Initial count = 0

Iteration 1:
  n        = 0000 1100
  n - 1    = 0000 1011
  n & (n-1)= 0000 1000 (n becomes 8)
  count    = 1

Iteration 2:
  n        = 0000 1000
  n - 1    = 0000 0111
  n & (n-1)= 0000 0000 (n becomes 0)
  count    = 2

Loop terminates as n is 0. Total count = 2.
```

**Complexity:**
*   **Time:** O(k) where `k` is the number of set bits. In the worst case, `k=32`, so O(1). This is generally faster than brute-force for sparse numbers.
*   **Space:** O(1).

### Approach 3: Lookup Table

**Logic:**
For fixed-size integers (like 32-bit), we can precompute the number of set bits for all possible byte values (0-255) into a lookup table. Then, to count set bits in a 32-bit integer, we break it into 4 bytes, look up the count for each byte in the table, and sum the results. This is extremely fast for repeated calls.

**ASCII Diagram:**
```
n = 0x12345678 (0001 0010 0011 0100 0101 0110 0111 1000)

Precomputed table: BIT_COUNT_LOOKUP_TABLE[value] = count of set bits in value

1. Extract LSB byte:
   byte0 = n & 0xFF  = 0x78 (0111 1000)
   count += BIT_COUNT_LOOKUP_TABLE[0x78] = 6
   n >>= 8           = 0x123456

2. Extract next byte:
   byte1 = n & 0xFF  = 0x56 (0101 0110)
   count += BIT_COUNT_LOOKUP_TABLE[0x56] = 4
   n >>= 8           = 0x1234

3. Extract next byte:
   byte2 = n & 0xFF  = 0x34 (0011 0100)
   count += BIT_COUNT_LOOKUP_TABLE[0x34] = 3
   n >>= 8           = 0x12

4. Extract MSB byte:
   byte3 = n & 0xFF  = 0x12 (0001 0010)
   count += BIT_COUNT_LOOKUP_TABLE[0x12] = 2
   n >>= 8           = 0x0

Total count = 6 + 4 + 3 + 2 = 15.
```

**Complexity:**
*   **Time:** O(1) as it involves a fixed number of bitwise operations, shifts, and 4 table lookups.
*   **Space:** O(2^8) = O(256) for the lookup table.

---

## 2. Check if a number is a Power of Two

**Problem:** Given a positive integer `n`, determine if it is a power of two.

**Logic:**
A positive integer `n` is a power of two if and only if it has exactly one set bit in its binary representation.
For example:
*   1 (2^0) = `0001`
*   2 (2^1) = `0010`
*   4 (2^2) = `0100`
*   8 (2^3) = `1000`

The trick `n & (n - 1)` clears the least significant set bit. If `n` is a power of two, it has only one set bit. So, `n - 1` will have all bits to the right of that set bit as 1s, and that set bit itself will become 0. When you AND `n` with `n - 1`, the result will be 0.

We also need to ensure `n > 0`, because `0 & (-1)` (or `0 & (~0u)`) would also be 0, but 0 is not a power of two.

**ASCII Diagram:**
```
Case 1: n is a power of two (e.g., n = 8)
  n     = 0000 1000
  n - 1 = 0000 0111
  n & (n - 1)
  --------------
    0000 1000
  & 0000 0111
  ------------
    0000 0000 (Result is 0) -> True

Case 2: n is NOT a power of two (e.g., n = 6)
  n     = 0000 0110
  n - 1 = 0000 0101
  n & (n - 1)
  --------------
    0000 0110
  & 0000 0101
  ------------
    0000 0100 (Result is 4, not 0) -> False

Case 3: n = 0 (edge case)
  n     = 0000 0000
  n - 1 (for unsigned) = 1111 1111 (all 1s)
  n & (n - 1) = 0 & ~0u = 0.
  However, `n > 0` check handles this: `(0 > 0)` is false.
```

**Complexity:**
*   **Time:** O(1) as it involves a fixed number of bitwise operations and a comparison.
*   **Space:** O(1).

---

## 3. Reverse Bits

**Problem:** Reverse the bits of a given 32-bit unsigned integer.

**Logic:**
We need to create a new 32-bit integer where the bits of the original number are in reverse order. This can be done by iterating 32 times. In each iteration:
1.  Shift the `result` (reversed number) one position to the left. This makes space for the next bit from the original number.
2.  Check the LSB of the original number `n` using `n & 1`.
3.  If `n & 1` is 1, set the LSB of `result` to 1 (using `result |= 1`).
4.  Right-shift `n` by 1 (`n >>= 1`) to move the next bit to its LSB position.

**ASCII Diagram:**
```
n = 0b00000000000000000000000000000001 (1)
reversed_n = 0

Iteration 1 (i=0):
  reversed_n <<= 1 : 0 (still 0)
  n & 1            : 1
  reversed_n |= 1  : 00...0001
  n >>= 1          : 0 (n becomes 0)

Iteration 2 (i=1):
  reversed_n <<= 1 : 00...0010
  n & 1            : 0
  reversed_n       : 00...0010
  n >>= 1          : 0

... (continue until i=30)

Iteration 31 (i=30):
  reversed_n <<= 1 : ... (moves the 1 from LSB to bit 30)
  n & 1            : 0
  reversed_n       : ...
  n >>= 1          : 0

Iteration 32 (i=31):
  reversed_n <<= 1 : (moves the 1 from bit 30 to bit 31)
  reversed_n       = 1000...000 (1 << 31)
  n & 1            : 0
  reversed_n       : 1000...000
  n >>= 1          : 0

Final result: 1000...000 (2147483648)
```

**Complexity:**
*   **Time:** O(1) as it iterates 32 times for a 32-bit integer.
*   **Space:** O(1).

---

## 4. Single Number

**Problem:** Given a non-empty array of integers, every element appears twice except for one. Find that single one.

**Logic:**
This problem can be elegantly solved using the XOR bitwise operator due to its unique properties:
1.  **`a ^ 0 = a`**: XORing any number with 0 gives the number itself.
2.  **`a ^ a = 0`**: XORing any number with itself gives 0.
3.  **Associativity and Commutativity**: `(a ^ b) ^ c = a ^ (b ^ c)` and `a ^ b = b ^ a`. This means the order of XOR operations doesn't matter.

If we XOR all the numbers in the array together, all numbers that appear twice will cancel each other out (because `X ^ X = 0`). The unique number will be XORed with 0 (which is the cumulative result of all pairs canceling out), leaving the unique number itself.

**ASCII Diagram:**
```
nums = [4, 1, 2, 1, 2]

unique_num = 0

unique_num = 0 ^ 4  = 4  (0100)
unique_num = 4 ^ 1  = 5  (0101)  <-- 0100 ^ 0001
unique_num = 5 ^ 2  = 7  (0111)  <-- 0101 ^ 0010
unique_num = 7 ^ 1  = 6  (0110)  <-- 0111 ^ 0001 (The '1' from the second '1' cancels the first '1')
unique_num = 6 ^ 2  = 4  (0100)  <-- 0110 ^ 0010 (The '2' from the second '2' cancels the first '2')

Result: 4
```

**Complexity:**
*   **Time:** O(N) where N is the number of elements in the array, as we iterate through the array once.
*   **Space:** O(1) as we only use a single variable to store the XOR sum.

---

## 5. Insert M into N

**Problem:** Insert the bits of number `M` into number `N` from bit position `j` down to bit position `i` (inclusive). Assume `N` is a 32-bit unsigned integer, `M` is also a 32-bit unsigned integer, and `j >= i`.

**Logic:**
This problem requires careful bit manipulation using masks. The general strategy is:
1.  **Clear the target bits in `N`**: Set the bits from `j` down to `i` in `N` to 0, while keeping all other bits of `N` intact.
2.  **Shift `M` to the correct position**: Move `M` left by `i` positions so its LSB aligns with bit `i` of `N`.
3.  **Combine `N` and `M`**: Use the bitwise OR operator to insert the shifted `M` into the cleared `N`.

**Detailed steps for creating the clear mask:**
A mask that has `0`s from bit `i` to `j` and `1`s everywhere else is needed.
This mask can be constructed by combining two parts:
*   `left_mask`: `1`s from bit `j+1` to `31`, and `0`s from bit `j` down to `0`. This can be generated by `(~0u) << (j + 1)`. `~0u` is an unsigned integer with all bits set to 1. Shifting it left by `j+1` creates `j+1` zeros on the right.
*   `right_mask`: `1`s from bit `0` to `i-1`, and `0`s from bit `i` to `31`. This can be generated by `(1 << i) - 1`. If `i=0`, this evaluates to `0`, which is correct (no bits to the right of bit 0).

The `clear_mask` is then `left_mask | right_mask`.

**ASCII Diagram:**
Let `N = 0b10000000000` (1024), `M = 0b10011` (19), `i = 2`, `j = 6`. (32-bit context shown only relevant bits)

```
Binary positions (0-indexed):
... 10 9 8 7 6 5 4 3 2 1 0

N = 0...010000000000
    (MSB) ^   ^ (LSB)
          bit 10 is 1

M = 0...00010011
          ^   ^
          bit 4 is 1

Target range [i, j]: [2, 6]

Step 1: Create `clear_mask`

a) `left_mask` for bits [j+1, 31]:
   j = 6 => j+1 = 7
   `(~0u) << (j + 1)` = `11...11111111` << 7 = `11...1110000000`
   Represents bits 7-31 as 1s, bits 0-6 as 0s.

b) `right_mask` for bits [0, i-1]:
   i = 2 => i-1 = 1
   `(1 << i) - 1` = `(1 << 2) - 1` = `4 - 1` = `3` = `0...00000011`
   Represents bits 0-1 as 1s, bits 2-31 as 0s.

c) `clear_mask = left_mask | right_mask`:
   left_mask:  11...1110000000
   right_mask: 00...000000011
   -------------------------
   clear_mask: 11...1110000011
   (This mask has 0s from bit 2 to bit 6, and 1s elsewhere)

Step 2: Clear bits in N: `N_cleared = N & clear_mask`
   N:         0...010000000000
   clear_mask:11...1110000011
   ---------------------------
   N_cleared: 0...010000000000  (bits 2-6 were already 0 in N)

Step 3: Shift M to position i: `M_shifted = M << i`
   M:            0...00010011
   i = 2
   M_shifted:    0...01001100  (M shifted left by 2 positions)

Step 4: Combine N_cleared and M_shifted: `result = N_cleared | M_shifted`
   N_cleared:    0...010000000000
   M_shifted:    0...0001001100
   ---------------------------
   result:       0...01001001100
   (decimal: 1024 + (19 << 2) = 1024 + 76 = 1100)
```

**Edge Cases & Gotchas:**
*   **`i > j` or `i`, `j` out of bounds (0-31):** The code should validate these inputs and throw an `std::invalid_argument`.
*   **`M` is too large for the segment `j-i+1`:** The problem statement usually implies `M` will fit, or that excess bits of `M` (those left of `j` after shifting) will simply be overwritten if `N` has 0s there, or `M` will be truncated by the mask. Our current solution will only insert `M`'s bits up to `j` if `M` is larger than `j-i+1` bits. Any bits of `M` that would extend beyond `j` would be outside the cleared range of N and would require additional mask consideration if they were to be kept or also cleared. The standard interpretation of this problem is that `M`'s length implies it fits into the `j-i+1` segment.

**Complexity:**
*   **Time:** O(1) as it involves a fixed number of bitwise operations and comparisons.
*   **Space:** O(1).

---
```