```java
package com.example;

public class BitManipulation {

    /**
     * Counts the number of set bits in an integer.
     * Time Complexity: O(log n)
     * Space Complexity: O(1)
     */
    public int countSetBits(int n) {
        int count = 0;
        while (n > 0) {
            count += (n & 1);
            n >>= 1;
        }
        return count;
    }


    /**
     * Reverses the bits of an unsigned integer.
     * Time Complexity: O(log n)
     * Space Complexity: O(1)
     */
    public int reverseBits(int n) {
        int reversed = 0;
        for (int i = 0; i < 32; i++) {
            reversed <<= 1;
            reversed |= (n & 1);
            n >>= 1;
        }
        return reversed;
    }


    /**
     * Finds the single number that appears an odd number of times in an array.
     * Time Complexity: O(n)
     * Space Complexity: O(1)
     */
    public int singleNumber(int[] nums) {
        int result = 0;
        for (int num : nums) {
            result ^= num;
        }
        return result;
    }


    /**
     * Swaps the odd and even bits of an integer.
     * Time Complexity: O(log n)
     * Space Complexity: O(1)
     */
    public int swapOddEvenBits(int n) {
        int evenBits = n & 0xAAAAAAAA; // Get even bits
        int oddBits = n & 0x55555555;  // Get odd bits
        return (evenBits >>> 1) | (oddBits << 1);
    }
}
```