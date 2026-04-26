```markdown
# 🖼️ Visual Diagrams for Bit Manipulation

Understanding bit manipulation often benefits from visual representations. Here are some ASCII art diagrams illustrating key concepts and operations.

---

## 1. `n & (n - 1)`: Clearing the Rightmost Set Bit

This is a fundamental trick used in Brian Kernighan's algorithm for counting set bits and checking for powers of two.

**Example: `n = 12` (Binary `1100`)**

```
  n = 12 : ...0000 1100
           ^
  n-1 = 11 : ...0000 1011
           ^

  Operation: n & (n-1)

  Bit Position:  7 6 5 4 3 2 1 0
  n             : 0 0 0 0 1 1 0 0
  n-1           : 0 0 0 0 1 0 1 1
  ------------------------------
  n & (n-1)     : 0 0 0 0 1 0 0 0   (Result = 8)
                 ^
                 |--- The rightmost '1' bit in `n` (at position 2) has been cleared to '0'.
```

**Explanation:**

*   When you subtract 1 from a number `n`, all the `0`s from the Least Significant Bit (LSB) up to the rightmost `1` become `1`s.
*   The rightmost `1` in `n` becomes a `0`.
*   All bits to the left of that rightmost `1` remain unchanged.
*   When you `AND` `n` with `(n - 1)`:
    *   The unchanged bits to the left are `X & X = X`.
    *   The rightmost `1` in `n` becomes `1 & 0 = 0`.
    *   The `0`s to its right in `n` become `0 & 1 = 0`.
*   Thus, `n & (n - 1)` effectively clears the rightmost set bit.

---

## 2. Reversing Bits (Iterative Approach)

Reversing bits involves taking the Least Significant Bit (LSB) from the original number and appending it to the Most Significant Bit (MSB) of the result, then shifting both numbers.

**Example: Reversing a 4-bit number `n = 1011` (11)**

Let `n = 1011`, `reversed = 0000`

**Iteration 1:**
*   `reversed <<= 1`: `0000`
*   `lsb = n & 1`: `1011 & 0001 = 0001` (1)
*   `reversed |= lsb`: `0000 | 0001 = 0001`
*   `n >>>= 1`: `0101`

```
Original n: 1011
Reversed  : ____

Step 1:
n          : 101[1] <- LSB of n
reversed   : [0]000 <- Shift reversed left
           :   1   <- Add LSB of n to reversed
           = 0001

n          : 0101
reversed   : 0001
```

**Iteration 2:**
*   `reversed <<= 1`: `0010`
*   `lsb = n & 1`: `0101 & 0001 = 0001` (1)
*   `reversed |= lsb`: `0010 | 0001 = 0011`
*   `n >>>= 1`: `0010`

```
Step 2:
n          : 010[1] <- LSB of n
reversed   : 000[1] <- Shift reversed left
           : 001[0]
           :   1   <- Add LSB of n to reversed
           = 0011

n          : 0010
reversed   : 0011
```

**Iteration 3:**
*   `reversed <<= 1`: `0110`
*   `lsb = n & 1`: `0010 & 0001 = 0000` (0)
*   `reversed |= lsb`: `0110 | 0000 = 0110`
*   `n >>>= 1`: `0001`

```
Step 3:
n          : 001[0] <- LSB of n
reversed   : 001[1] <- Shift reversed left
           : 011[0]
           :   0   <- Add LSB of n to reversed
           = 0110

n          : 0001
reversed   : 0110
```

**Iteration 4:**
*   `reversed <<= 1`: `1100`
*   `lsb = n & 1`: `0001 & 0001 = 0001` (1)
*   `reversed |= lsb`: `1100 | 0001 = 1101`
*   `n >>>= 1`: `0000`

```
Step 4:
n          : 000[1] <- LSB of n
reversed   : 011[0] <- Shift reversed left
           : 110[0]
           :   1   <- Add LSB of n to reversed
           = 1101

n          : 0000
reversed   : 1101
```

Final `reversed` for `1011` is `1101`.

---

## 3. Inserting M into N: Clearing Bits

To insert `M` into `N` between bit `i` and `j`, we first need to clear the bits in `N` in that range.

**Example: Clear bits in `N` from `i=2` to `j=6` (32-bit integer)**

`N = ...00101010101010101010101010101010` (arbitrary example)
We want to clear bits at positions 2, 3, 4, 5, 6.

1.  **`allOnes = ~0`**: All 32 bits are `1`.
    `allOnes : 11111111111111111111111111111111` (32 ones)

2.  **`leftMask = allOnes << (j + 1)`**: `j=6`, so `j+1=7`. Shift `allOnes` left by 7.
    This creates `1`s from bit 7 to 31, and `0`s from bit 0 to 6.
    `leftMask : 11111111111111111111111110000000` (25 ones, 7 zeros)

3.  **`rightMask = (1 << i) - 1`**: `i=2`. `(1 << 2)` is `0...100`. Subtracting 1 gives `0...011`.
    This creates `1`s from bit 0 to `i-1`, and `0`s from bit `i` to 31.
    `rightMask: 00000000000000000000000000000011` (2 zeros, 2 ones)

4.  **`clearMask = leftMask | rightMask`**: Combine the two.
    `leftMask  : 11111111111111111111111110000000`
    `rightMask : 00000000000000000000000000000011`
    `---------------------------------------------`
    `clearMask : 11111111111111111111111110000011`
    (1s everywhere except bits 2-6, which are 0s)

5.  **`N_cleared = N & clearMask`**: This operation will set all bits in `N` from `i` to `j` to `0`, while preserving all other bits.

```
N           : ...1010 1010 1010 1010 1010 1010
Indices     :  j+1      j      i     i-1
              ^----------^
Clear Range:  (bits 6 to 2)

clearMask   : ...1111 1000 0011

Original N  : ...X X X X X Y Y Y Y Y Z Z
clearMask   : ...1 1 1 1 1 0 0 0 0 0 1 1
-----------------------------------------
N_cleared   : ...X X X X X 0 0 0 0 0 Z Z  (Bits YYYY between i and j are cleared)
```

---

## 4. Setting/Getting/Clearing a Specific Bit (Kth Bit)

These are common helper operations for more complex bit manipulation.

**Example: `num = 0b10110` (22)**

`Bit Position:   4 3 2 1 0`
`num         :   1 0 1 1 0`

### Get Bit `k=2` (Is bit 2 set?)

1.  **Create mask:** `1 << k` => `1 << 2` = `0b100`
2.  **`num & mask`**: `0b10110 & 0b00100 = 0b00100` (which is non-zero)
3.  **Result:** `true` (bit at position 2 is set)

```
num       : ...00010110
mask (1<<2): ...00000100
-----------------------
num & mask: ...00000100  (Non-zero, so bit is SET)
```

### Set Bit `k=0` (Set bit 0 to 1)

1.  **Create mask:** `1 << k` => `1 << 0` = `0b001`
2.  **`num | mask`**: `0b10110 | 0b00001 = 0b10111`
3.  **Result:** `0b10111` (23)

```
num       : ...00010110
mask (1<<0): ...00000001
-----------------------
num | mask: ...00010111  (Bit 0 is now 1)
```

### Clear Bit `k=4` (Clear bit 4 to 0)

1.  **Create mask:** `~(1 << k)` => `~(1 << 4)` = `~0b10000` = `0b01111` (assuming relevant bits)
2.  **`num & mask`**: `0b10110 & 0b01111 = 0b00110`
3.  **Result:** `0b00110` (6)

```
num       : ...00010110
mask (~(1<<4)): ...11101111 (for 8-bit example, it's 0b01111)
               mask (32-bit): 11111111111111111111111111101111
-----------------------
num & mask: ...00000110  (Bit 4 is now 0)
```

---
```