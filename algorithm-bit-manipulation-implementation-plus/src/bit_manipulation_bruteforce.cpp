```cpp
#include <vector>
#include <map> // For singleNumber_brute
#include <numeric> // For std::accumulate (less common in brute-force but might be used)
#include <algorithm> // For std::reverse
#include "bit_manipulation_utils.h" // For printBinary, if needed for debugging

namespace BitManipulation
{

// --- Problem 1: Count Set Bits (Hamming Weight) - Brute Force ---
// Simple iteration by checking modulus 2 and dividing.

/**
 * @brief Counts the number of set bits (1s) in an unsigned 32-bit integer using repeated division and modulus.
 *        This is a basic, typically less efficient, approach for comparison.
 *
 * @param n The unsigned 32-bit integer.
 * @return The number of set bits.
 *
 * @complexity
 *   Time: O(log N) where N is the value of the integer. Specifically, O(number of bits), which is 32 for uint32_t.
 *         Each iteration effectively checks one bit.
 *   Space: O(1)
 */
int countSetBits_Brute(uint32_t n)
{
    int count = 0;
    while (n > 0)
    {
        // Check if the least significant bit is 1
        if (n % 2 == 1)
        {
            count++;
        }
        // Right shift n by 1 (equivalent to integer division by 2)
        n /= 2;
    }
    return count;
}


// --- Problem 2: Single Number - Brute Force / Alternative ---
// Using a hash map to count frequencies.

/**
 * @brief Finds the single unique element in an array using a hash map to store frequencies.
 *        This approach is general and can handle cases where numbers appear more than twice,
 *        but it uses additional space.
 *
 * @param nums A vector of integers.
 * @return The single unique integer.
 *
 * @complexity
 *   Time: O(N) on average, where N is the number of elements in the vector.
 *         Each insertion and lookup in a hash map takes O(1) average time.
 *   Space: O(N) in the worst case, as the hash map could store up to N/2 + 1 unique numbers.
 */
int singleNumber_Brute_HashMap(const std::vector<int>& nums)
{
    std::map<int, int> counts; // Using std::map for simplicity, std::unordered_map is usually preferred for performance
    for (int num : nums)
    {
        counts[num]++;
    }

    for (const auto& pair : counts)
    {
        if (pair.second == 1)
        {
            return pair.first;
        }
    }
    return 0; // Should not reach here if problem guarantees a single number exists
}

// --- Problem 3: Reverse Bits - Brute Force / Direct Iteration ---
// Building the reversed number bit by bit without relying on advanced shifts.

/**
 * @brief Reverses the bits of an unsigned 32-bit integer by explicitly iterating through bits
 *        and constructing the new number.
 *
 * @param n The unsigned 32-bit integer to reverse.
 * @return The integer with its bits reversed.
 *
 * @complexity
 *   Time: O(1) (specifically O(number of bits), which is 32). The loop runs a fixed number of times.
 *   Space: O(1)
 *
 * @explanation
 *   This approach builds the reversed number `reversed_num` bit by bit.
 *   In each iteration:
 *   1. `reversed_num = (reversed_num * 2)`: Equivalent to `reversed_num <<= 1`. Shifts the existing
 *      reversed bits to the left to make room for the next bit.
 *   2. `reversed_num += (n % 2)`: Equivalent to `reversed_num |= (n & 1)`. Adds the least significant bit
 *      of `n` to the `reversed_num`.
 *   3. `n /= 2`: Equivalent to `n >>= 1`. Moves to the next bit of `n`.
 */
uint32_t reverseBits_Brute(uint32_t n)
{
    uint32_t reversed_num = 0;
    for (int i = 0; i < 32; ++i)
    {
        reversed_num *= 2; // Shift existing bits left
        reversed_num += (n % 2); // Add current LSB of n
        n /= 2; // Move to next bit of n
    }
    return reversed_num;
}

// --- Problem 4: Check if a number is a Power of Two - Brute Force ---
// Repeatedly dividing by two until it's 1.

/**
 * @brief Checks if an integer is a power of two by repeatedly dividing by 2.
 *        If `n` is a power of two, it will eventually become 1 by successive divisions by 2.
 *
 * @param n The integer to check.
 * @return True if n is a power of two, false otherwise.
 *
 * @complexity
 *   Time: O(log N) where N is the value of the integer. The number of divisions is proportional to log2(N).
 *   Space: O(1)
 */
bool isPowerOfTwo_Brute(int n)
{
    if (n <= 0)
    {
        return false; // Powers of two are positive
    }
    while (n % 2 == 0)
    {
        n /= 2;
    }
    return n == 1;
}

// --- Problem 5: Check if a number is a Power of Four - Brute Force ---
// Repeatedly dividing by four until it's 1.

/**
 * @brief Checks if an integer is a power of four by repeatedly dividing by 4.
 *        If `n` is a power of four, it will eventually become 1 by successive divisions by 4.
 *
 * @param n The integer to check.
 * @return True if n is a power of four, false otherwise.
 *
 * @complexity
 *   Time: O(log4 N) which is equivalent to O(log N). The number of divisions is proportional to log4(N).
 *   Space: O(1)
 */
bool isPowerOfFour_Brute(int n)
{
    if (n <= 0)
    {
        return false; // Powers of four are positive
    }
    while (n % 4 == 0)
    {
        n /= 4;
    }
    return n == 1;
}

} // namespace BitManipulation

```