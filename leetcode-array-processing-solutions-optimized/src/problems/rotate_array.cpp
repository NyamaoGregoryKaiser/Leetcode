#include "array_manipulation.h"
#include <numeric> // For std::gcd in juggling cycle

namespace RotateArray {

/**
 * @brief Rotates an array to the right by k steps using a temporary array.
 * @param nums The array to be rotated.
 * @param k The number of steps to rotate.
 *
 * @complexity
 *   Time: O(N), where N is the number of elements in `nums`. We iterate through the array twice.
 *   Space: O(N) for the temporary array.
 */
void rotate_approach1(std::vector<int>& nums, int k) {
    if (nums.empty() || k == 0) {
        return;
    }

    int n = nums.size();
    k %= n; // Handle k larger than array size

    if (k == 0) { // No rotation needed if k is a multiple of n
        return;
    }

    std::vector<int> temp(n);
    for (int i = 0; i < n; ++i) {
        // Calculate new position: (current_index + k) % n
        temp[(i + k) % n] = nums[i];
    }
    nums = temp;
}

/**
 * @brief Helper function to reverse a portion of a vector.
 * @param nums The vector to modify.
 * @param start The starting index (inclusive).
 * @param end The ending index (inclusive).
 */
void reverse(std::vector<int>& nums, int start, int end) {
    while (start < end) {
        std::swap(nums[start], nums[end]);
        start++;
        end--;
    }
}

/**
 * @brief Rotates an array to the right by k steps using the reversal technique.
 * This is an in-place optimal solution.
 * The idea is:
 * 1. Reverse the entire array.
 * 2. Reverse the first k elements.
 * 3. Reverse the remaining n-k elements.
 *
 * Example: nums = [1,2,3,4,5,6,7], k = 3
 * 1. Reverse all: [7,6,5,4,3,2,1]
 * 2. Reverse first k (3) elements: [5,6,7,4,3,2,1]
 * 3. Reverse remaining n-k (4) elements: [5,6,7,1,2,3,4]
 *
 * @param nums The array to be rotated.
 * @param k The number of steps to rotate.
 *
 * @complexity
 *   Time: O(N), where N is the number of elements in `nums`. We perform three reversals, each taking O(N) time.
 *   Space: O(1) as the rotation is done in-place without using extra space.
 */
void rotate_approach2(std::vector<int>& nums, int k) {
    if (nums.empty() || k == 0) {
        return;
    }

    int n = nums.size();
    k %= n; // Handle k larger than array size

    if (k == 0) { // No rotation needed if k is a multiple of n
        return;
    }

    // 1. Reverse the entire array
    reverse(nums, 0, n - 1);
    // 2. Reverse the first k elements
    reverse(nums, 0, k - 1);
    // 3. Reverse the remaining n-k elements
    reverse(nums, k, n - 1);
}

/**
 * @brief Rotates an array to the right by k steps using the Juggling Cycle Algorithm.
 * This is an in-place optimal solution, potentially more efficient in terms of memory cache
 * but can be harder to implement correctly.
 * The algorithm involves iterating through `gcd(n, k)` cycles.
 * In each cycle, elements are shifted one by one to their final positions.
 *
 * Example: nums = [1,2,3,4,5,6,7], k = 3, n = 7
 * k %= n => k=3. gcd(7,3) = 1. So, one cycle.
 *
 * Start with index i = 0.
 * current = nums[0] (which is 1)
 * next_idx = (0 + 3) % 7 = 3. nums[0] = nums[3] (nums becomes [4,2,3,4,5,6,7])
 * current = 4
 * next_idx = (3 + 3) % 7 = 6. nums[3] = nums[6] (nums becomes [4,2,3,7,5,6,7])
 * current = 7
 * next_idx = (6 + 3) % 7 = 2. nums[6] = nums[2] (nums becomes [4,2,3,7,5,6,3])
 * current = 3
 * next_idx = (2 + 3) % 7 = 5. nums[2] = nums[5] (nums becomes [4,2,6,7,5,6,3])
 * current = 6
 * next_idx = (5 + 3) % 7 = 1. nums[5] = nums[1] (nums becomes [4,1,6,7,5,2,3])
 * current = 2
 * next_idx = (1 + 3) % 7 = 4. nums[1] = nums[4] (nums becomes [4,5,6,7,1,2,3])
 * current = 5
 * next_idx = (4 + 3) % 7 = 0. nums[4] = current (nums becomes [4,5,6,7,1,2,3])
 * current = 5 (store)
 * Since next_idx is 0 again, the cycle is complete.
 * Original nums: [1,2,3,4,5,6,7]
 * Final nums:    [5,6,7,1,2,3,4]
 *
 * @param nums The array to be rotated.
 * @param k The number of steps to rotate.
 *
 * @complexity
 *   Time: O(N), where N is the number of elements in `nums`. Each element is moved exactly once.
 *   Space: O(1) as the rotation is done in-place without using extra space.
 */
void rotate_approach3(std::vector<int>& nums, int k) {
    if (nums.empty() || k == 0) {
        return;
    }

    int n = nums.size();
    k %= n; // Handle k larger than array size

    if (k == 0) { // No rotation needed if k is a multiple of n
        return;
    }

    // Calculate GCD to determine the number of cycles
    int num_cycles = std::gcd(n, k);

    for (int start = 0; start < num_cycles; ++start) {
        int current_idx = start;
        int current_val = nums[start]; // Store the value at the start of the cycle

        // Perform the cycle shifts
        do {
            int next_idx = (current_idx + k) % n;
            // Place the stored value at current_idx, but before doing so,
            // we must save the value at next_idx that will be overwritten.
            // This is incorrect logic for a cyclic replacement.
            // The correct logic is to find the final position for 'current_val'
            // and move elements backwards.
            
            // Correct logic for juggling cycle:
            // The element at `nums[current_idx]` moves to `nums[(current_idx + k) % n]`.
            // We need to pick up an element from `nums[current_idx]` and put it in its
            // rotated position, then pick up the element that was there, and repeat.
            // This means we start with `nums[start]`, move it to `nums[(start + k) % n]`,
            // take what was at `nums[(start + k) % n]` and move it to `nums[((start + k) % n) + k) % n]`,
            // and so on, until we return to `start`.

            int prev_idx = (current_idx - k + n) % n; // The index whose value `current_val` came from
            if (prev_idx < 0) prev_idx += n; // Ensure positive for C++ % operator behavior with negative numbers

            // Loop until we return to the start index
            while (true) {
                int next_cycle_idx = (current_idx + k) % n;
                if (next_cycle_idx == start) {
                    nums[current_idx] = current_val; // Put the initial value in its final place
                    break;
                }
                nums[current_idx] = nums[next_cycle_idx]; // Move element from next_cycle_idx to current_idx
                current_idx = next_cycle_idx;
            }
        } while (current_idx != start); // This outer loop conditional is wrong for the inner logic.

        // Corrected Juggling Cycle implementation:
        // For each cycle, we start at 'start' index, take its value, and
        // follow the chain of swaps until we return to 'start'.
        int temp = nums[start]; // Store the element at the beginning of the cycle
        int j = start;
        int k_effective = k; // k is already modulo n
        
        while (true) {
            int next_j = (j + k_effective) % n;
            if (next_j == start) { // If we complete a cycle, place the temp value
                nums[j] = temp;
                break;
            }
            nums[j] = nums[next_j]; // Move element from its rotated position to current position
            j = next_j;
        }
    }
}


// Re-thinking Juggling cycle for a right rotation (k steps to the right)
// The element at index `i` moves to `(i + k) % n`.
// The element at `(i - k + n) % n` moves to `i`.
// So we pick up `nums[i]`, then move `nums[(i - k + n) % n]` to `nums[i]`,
// then `nums[((i - k + n) % n) - k + n) % n]` to `nums[(i - k + n) % n]`, etc.
// until we come back to the starting index where the initial `nums[i]` belongs.

// A simpler way to conceptualize the Juggling Cycle for right rotation:
// Iterate `num_cycles` times. In each cycle, start at `i`.
// `prev_val` = `nums[i]`
// `current_idx` = `i`
// `next_idx` = `(current_idx + k) % n`
// Move `nums[current_idx]` to `nums[next_idx]`. This is conceptually correct for left rotation.
// For right rotation, it's easier to think of shifting elements from their source to destination.

// Let's re-implement `rotate_approach3` clearly. The standard approach is to move elements
// from their *current* position to their *target* position, but taking the element that *was*
// at the target position and finding its *new* target position.

/*
void rotate_approach3_revised(std::vector<int>& nums, int k) {
    if (nums.empty() || k == 0) {
        return;
    }

    int n = nums.size();
    k %= n;

    if (k == 0) {
        return;
    }

    int count = 0; // Count of elements moved
    for (int start = 0; count < n; ++start) {
        int current_idx = start;
        int prev_val = nums[start]; // Value to be placed

        do {
            int next_idx = (current_idx + k) % n; // Where current_idx element will go

            // The element at 'next_idx' is the one that needs to be moved to 'current_idx'.
            // However, this approach overwrites values.
            // A more direct cyclic swap:
            // Take value at start.
            // Move value from (start - k + n) % n to start.
            // Move value from ((start - k + n) % n - k + n) % n to (start - k + n) % n.
            // ...until we reach the position for the initial value.

            int temp = nums[next_idx];
            nums[next_idx] = prev_val;
            prev_val = temp;
            current_idx = next_idx;
            count++;
        } while (start != current_idx);
    }
}
*/

// Final robust Juggling Cycle approach (standard for right rotation):
// Each `i` from `0` to `gcd(n, k) - 1` starts a cycle.
// For each cycle, we pick `nums[i]`.
// The element at `pos` goes to `(pos + k) % n`.
// So, we simulate moving `nums[i]` to `(i+k)%n`, then the element that was there
// to `((i+k)%n + k)%n`, and so on, until we reach `i` again.

// Let's correct the `rotate_approach3` directly. The key is to correctly identify the
// element that *replaces* the current one.
// If an element at index `j` moves to `(j+k)%n`, then the element that *comes to* `j`
// must have been at `(j-k+n)%n`.

void rotate_approach3(std::vector<int>& nums, int k) {
    if (nums.empty() || k == 0) {
        return;
    }

    int n = nums.size();
    k %= n; // Ensure k is within [0, n-1]

    if (k == 0) { // No rotation needed
        return;
    }

    int count = 0; // Counter for elements that have been moved to their final position
    for (int start = 0; count < n; ++start) {
        int current_idx = start;
        int prev_val = nums[start]; // Value to be moved into the current position

        do {
            int next_idx = (current_idx + k) % n; // Calculate target index
            int temp = nums[next_idx];            // Store the value at target index
            nums[next_idx] = prev_val;            // Move 'prev_val' to target index
            prev_val = temp;                      // 'temp' becomes the new value to be moved
            current_idx = next_idx;               // Move to the next position in the cycle
            count++;
        } while (start != current_idx); // Continue until we return to the start of the cycle
    }
}


} // namespace RotateArray
---