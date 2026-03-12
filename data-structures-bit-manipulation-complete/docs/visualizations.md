# Bit Manipulation Visualizations (ASCII Art)

Understanding bit manipulation often benefits greatly from visual representations. Here are some ASCII art diagrams illustrating key bitwise operations and patterns.

## 1. Bitwise AND (`&`)

Used for checking if a bit is set, or masking bits.

```
Example: Checking if the 2nd bit (0-indexed) is set in 5 (0101)
Number:  5  = 0101
Mask:    4  = 0100 (1 << 2, to check 2nd bit)
             ----
Result:  4  = 0100  (Result is non-zero, so the bit IS set)
```

```
Example: Clearing the 1st bit (0-indexed) in 7 (0111)
Number:  7  = 0111
Mask:   ~2  = 1101 (NOT (0010))
             ----
Result:  5  = 0101  (The 1st bit is cleared)
```

## 2. Bitwise OR (`|`)

Used for setting a specific bit.

```
Example: Setting the 2nd bit (0-indexed) in 3 (0011)
Number:  3  = 0011
Mask:    4  = 0100 (1 << 2, to set 2nd bit)
             ----
Result:  7  = 0111  (The 2nd bit is now set)
```

## 3. Bitwise XOR (`^`)

Used for toggling bits, finding unique elements, or comparing bits.

```
Example: Toggling the 1st bit (0-indexed) in 7 (0111)
Number:  7  = 0111
Mask:    2  = 0010 (1 << 1, to toggle 1st bit)
             ----
Result:  5  = 0101  (The 1st bit (was 1) is now 0)
```

```
Example: XORing two numbers (3 and 5) to find difference
Number A:  3  = 0011
Number B:  5  = 0101
             ----
Result:    6  = 0110  (Bits differ at 1st and 2nd position)
```

## 4. Left Shift (`<<`)

Multiplies by powers of 2, or creates masks.

```
Example: 3 << 2 (Shift 3 by 2 positions left)
Original:  3  = 0011
Shifted:  12  = 1100  (equivalent to 3 * 2^2 = 12)
```

## 5. Right Shift (`>>`)

Divides by powers of 2 (integer division).

```
Example: 12 >> 2 (Shift 12 by 2 positions right)
Original: 12  = 1100
Shifted:   3  = 0011  (equivalent to 12 // 2^2 = 3)
```

## 6. Brian Kernighan's Algorithm (`n & (n - 1)`)

Clears the rightmost set bit.

```
Example: n = 12 (binary 1100)

Step 1:
n        = 1100 (12)
n - 1    = 1011 (11)
           ---- (&)
Result   = 1000 (8)   <- Rightmost '1' bit (at position 2) is cleared.
Count = 1

Step 2:
n        = 1000 (8)
n - 1    = 0111 (7)
           ---- (&)
Result   = 0000 (0)   <- Rightmost '1' bit (at position 3) is cleared.
Count = 2

n is now 0, stop. Total set bits: 2.
```

## 7. Is Power of Two (`n > 0 and (n & (n - 1)) == 0`)

Identifies numbers with only one set bit.

```
Example: n = 8 (Is a power of two)
n        = 1000 (8)
n - 1    = 0111 (7)
           ---- (&)
Result   = 0000 (0)  <- Condition (result == 0) is true.

Example: n = 6 (Not a power of two)
n        = 0110 (6)
n - 1    = 0101 (5)
           ---- (&)
Result   = 0100 (4)  <- Condition (result == 0) is false.
```

## 8. Isolating Rightmost Set Bit (`x & (-x)`)

Used in Single Number III.

```
Example: x = 6 (binary 0110)

Assuming 4-bit two's complement for illustration:
x        = 0110 (6)

How -x works in 2's complement (Flip bits, then add 1):
~x       = 1001 (NOT 6)
~x + 1   = 1010 (-6)

x & (-x):
x        = 0110
-x       = 1010
           ---- (&)
Result   = 0010 (2)  <- The rightmost set bit (at position 1) is isolated.
```
---