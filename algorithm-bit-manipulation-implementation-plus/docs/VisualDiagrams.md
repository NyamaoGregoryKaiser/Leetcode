```markdown
# Bit Manipulation: Visual Diagrams (ASCII Art)

Visualizing bitwise operations can greatly aid understanding. Here are some ASCII art diagrams illustrating key concepts and problems.

---

## 1. Representing Integers in Binary

A 32-bit integer `int` in Java.
Example: `n = 11` (decimal)

```
Bit Position: 31 30 ... 7  6  5  4  3  2  1  0
              ---------------------------------
Value (n=11): 0  0  ... 0  0  0  0  1  0  1  1
              ---------------------------------
```
- `0` at bit 31 indicates positive.
- `1` at bit 3, `0` at bit 2, `1` at bit 1, `1` at bit 0.
  `2^3 + 2^1 + 2^0 = 8 + 2 + 1 = 11`

---

## 2. Bitwise AND (`&`) Operation

Used for checking bits, masking, etc.
Example: `a = 5 (0101)`, `b = 3 (0011)`

```
  Bit Position: 3 2 1 0
                -------
  a = 5 (0101): 0 1 0 1
  b = 3 (0011): 0 0 1 1
                -------
a & b = 1 (0001): 0 0 0 1
                -------
```
- Only bit 0 is set in both `a` and `b`, so only bit 0 is set in the result.

---

## 3. Bitwise OR (`|`) Operation

Used for setting bits.
Example: `a = 5 (0101)`, `b = 3 (0011)`

```
  Bit Position: 3 2 1 0
                -------
  a = 5 (0101): 0 1 0 1
  b = 3 (0011): 0 0 1 1
                -------
a | b = 7 (0111): 0 1 1 1
                -------
```
- If a bit is 1 in `a` OR `b` (or both), it's 1 in the result.

---

## 4. Bitwise XOR (`^`) Operation (Key for `Single Number`)

Used for toggling bits, finding differences, and its properties for `Single Number`.
Example: `a = 5 (0101)`, `b = 3 (0011)`

```
  Bit Position: 3 2 1 0
                -------
  a = 5 (0101): 0 1 0 1
  b = 3 (0011): 0 0 1 1
                -------
a ^ b = 6 (0110): 0 1 1 0
                -------
```
- If bits are different, result is 1. If same, result is 0.

**Property `X ^ X = 0` and `X ^ 0 = X`**
This is the core of the `Single Number` problem.
If an array is `[A, B, A, C, C]`, then `A^B^A^C^C`
`= (A^A) ^ B ^ (C^C)` (due to associativity and commutativity)
`= 0 ^ B ^ 0`
`= B` (the single number)

---

## 5. Left Shift (`<<`) Operation

Multiplies by 2 for each shift.
Example: `a = 5 (0101)`, `a << 2`

```
  Bit Position: 3 2 1 0
                -------
  a = 5 (0101): 0 1 0 1  (decimal 5)

  Shift left by 2:
                -------
                1 0 1 0 0  (decimal 20)
                -------
```
- Bits shift left, new bits on the right are filled with `0`.

---

## 6. Signed Right Shift (`>>`) and Unsigned Right Shift (`>>>`)

**Signed Right Shift (`>>`)**: Preserves the sign bit.
Example: `n = -12 (11110100_2)` (8-bit two's complement)
`n >> 2`

```
  Bit Position: 7 6 5 4 3 2 1 0
                ---------------
  n = -12     : 1 1 1 1 0 1 0 0

  Shift right by 2 (signed):
                ---------------
                1 1 1 1 1 1 0 1   (decimal -3)
                ---------------
```
- The sign bit (MSB) `1` is copied to the new positions on the left.

**Unsigned Right Shift (`>>>`)**: Fills with zeros.
Example: `n = -12 (11110100_2)` (8-bit two's complement)
`n >>> 2`

```
  Bit Position: 7 6 5 4 3 2 1 0
                ---------------
  n = -12     : 1 1 1 1 0 1 0 0

  Shift right by 2 (unsigned):
                ---------------
                0 0 1 1 1 1 0 1   (decimal 61)
                ---------------
```
- New bits on the left are filled with `0`. This is crucial for problems treating `int` as an unsigned 32-bit number, like `countSetBits_Iteration` for negative numbers.

---

## 7. Brian Kernighan's Algorithm (`n & (n - 1)`)

Clears the rightmost set bit.
Example: `n = 12 (01100_2)`

```
  n        (01100): 0 1 1 0 0
  n - 1    (01011): 0 1 0 1 1
                   ---------
  n & (n - 1) = 8 (01000): 0 1 0 0 0
                   ---------
```
- The rightmost `1` in `n` was at bit 2. `n-1` flips it to `0` and all bits to its right to `1`.
- `AND`ing them results in `0` at bit 2 and all bits to its right. All bits to the left remain unchanged.

---

## 8. Is Power of Two (`n > 0 && (n & (n - 1)) == 0`)

Example: `n = 8 (00001000_2)` (power of two)

```
  n        (00001000): 0 0 0 0 1 0 0 0
  n - 1    (00000111): 0 0 0 0 0 1 1 1
                     ------------
  n & (n - 1) = 0   (00000000): 0 0 0 0 0 0 0 0
                     ------------
```
- Since `n > 0` and `(n & (n - 1)) == 0`, it is a power of two.

Example: `n = 6 (00000110_2)` (NOT a power of two)

```
  n        (00000110): 0 0 0 0 0 1 1 0
  n - 1    (00000101): 0 0 0 0 0 1 0 1
                     ------------
  n & (n - 1) = 4   (00000100): 0 0 0 0 0 1 0 0
                     ------------
```
- `(n & (n - 1))` is not `0`, so it is not a power of two.

---

## 9. Reverse Bits

Example: `n = 11 (00000000000000000000000000001011_2)`

Let's trace `reverseBits_Iteration` for the first few bits.

Initial: `n = ...01011` (11), `result = 0`

**Iteration 1 (i=0):**
- `result <<= 1`: `result = 0`
- `lsb = n & 1`: `lsb = 11 & 1 = 1`
- `result |= lsb`: `result = 0 | 1 = 1`
- `n >>>= 1`: `n = ...0101` (5)

**Iteration 2 (i=1):**
- `result <<= 1`: `result = 1 << 1 = 10_2` (2)
- `lsb = n & 1`: `lsb = 5 & 1 = 1`
- `result |= lsb`: `result = 10_2 | 1 = 11_2` (3)
- `n >>>= 1`: `n = ...010` (2)

**Iteration 3 (i=2):**
- `result <<= 1`: `result = 11_2 << 1 = 110_2` (6)
- `lsb = n & 1`: `lsb = 2 & 1 = 0`
- `result |= lsb`: `result = 110_2 | 0 = 110_2` (6)
- `n >>>= 1`: `n = ...01` (1)

... and so on for 32 iterations.
The `lsb` of `n` (rightmost bit) is taken and appended to the *left* of `result`.

---

## 10. Update Bits (Insert M into N)

Problem: Insert `M = 0b10011` into `N = 0b10000000000` from bit `i=2` to `j=6`.

**Initial `N` (11 bits shown for clarity, conceptually 32):**
```
Position: 10 9 8 7 6 5 4 3 2 1 0
          -----------------------
N         : 1  0 0 0 0 0 0 0 0 0 0
          -----------------------
Target range (i=2 to j=6):  ^ ^ ^ ^ ^
```

**Step 1: Create Mask to clear bits i to j in N**
- `leftMask = ~0 << (j + 1)`: Creates `1`s from `j+1` onwards.
  For `j=6`, `j+1=7`. `~0 << 7` means `...11111111111111111111111110000000`
- `rightMask = (1 << i) - 1`: Creates `1`s from `0` to `i-1`.
  For `i=2`, `(1 << 2) - 1` means `...00000000000000000000000000000011`
- `combinedMask = leftMask | rightMask`:
```
   31 ... 7 6 5 4 3 2 1 0
   -----------------------
leftMask:  1 ... 1 0 0 0 0 0 0 0 0  (...111111110000000)
rightMask: 0 ... 0 0 0 0 0 0 0 1 1  (...000000000000011)
           -----------------------
combinedMask: 1 ... 1 0 0 0 0 0 0 1 1  (...111111110000011)
           -----------------------
```

**Step 2: Clear bits in N using `combinedMask`**
`nCleared = N & combinedMask`
```
N          : 00...010000000000  (1024)
combinedMask: 11...110000011
             -----------------------
nCleared   : 00...010000000000  (1024, bits 2-6 are 0s)
             -----------------------
```

**Step 3: Shift M to align with bit `i`**
`M = 0b10011` (19)
`mShifted = M << i` (M << 2)
```
M          : 00...00010011
Shift left by 2:
mShifted   : 00...01001100  (76)
```

**Step 4: OR `nCleared` with `mShifted`**
`result = nCleared | mShifted`
```
nCleared   : 00...010000000000
mShifted   : 00...0001001100
             -----------------------
Result     : 00...010001001100  (1164)
             -----------------------
```
This final result correctly inserts `M` into `N` at the specified positions.
```