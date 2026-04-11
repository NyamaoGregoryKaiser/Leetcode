```cpp
#include "array_manipulator.hpp"
#include <numeric> // For std::gcd

// --- Problem 1: Rotate Array ---

void ArrayManipulator::rotate_temp_array(std::vector<int>& nums, int k) {
    if (nums.empty() || k == 0) return;

    int n = nums.size();
    k %= n; // Effective rotations
    if (k == 0) return; // No rotation needed

    std::vector<int> temp(n);
    for (int i = 0; i < n; ++i) {
        temp[(i + k) % n] = nums[i]; // Place current element at its rotated position
    }
    nums = temp; // Copy back to original array
}

void ArrayManipulator::rotate_reverse(std::vector<int>& nums, int k) {
    if (nums.empty() || k == 0) return;

    int n = nums.size();
    k %= n; // Effective rotations
    if (k == 0) return; // No rotation needed

    // Example: nums = [1,2,3,4,5,6,7], k = 3
    // 1. Reverse the entire array: [7,6,5,4,3,2,1]
    std::reverse(nums.begin(), nums.end());
    // 2. Reverse the first k elements: [5,6,7,4,3,2,1] (first 3 elements)
    std::reverse(nums.begin(), nums.begin() + k);
    // 3. Reverse the remaining N-k elements: [5,6,7,1,2,3,4] (remaining 4 elements)
    std::reverse(nums.begin() + k, nums.end());
}

void ArrayManipulator::rotate_juggling(std::vector<int>& nums, int k) {
    if (nums.empty() || k == 0) return;

    int n = nums.size();
    k %= n; // Effective rotations
    if (k == 0) return; // No rotation needed

    // std::gcd is available in <numeric> since C++17
    int num_cycles = std::gcd(n, k);

    for (int i = 0; i < num_cycles; ++i) {
        // Start from current index, store its value
        int current_idx = i;
        int temp = nums[i];

        // Move elements within this cycle
        while (true) {
            // Calculate next position (k steps to the right, modulo N)
            int next_idx = (current_idx - k + n) % n; // (current_idx - k) handles wrap-around, +n to ensure positive
            
            // If we've wrapped around to the starting point of this cycle, break
            if (next_idx == i) {
                break;
            }
            
            nums[current_idx] = nums[next_idx]; // Move element from next_idx to current_idx
            current_idx = next_idx; // Update current_idx
        }
        nums[current_idx] = temp; // Place the stored original value into the last position of the cycle
    }
}


void ArrayManipulator::rotate_brute_force(std::vector<int>& nums, int k) {
    if (nums.empty() || k == 0) return;

    int n = nums.size();
    k %= n; // Effective rotations
    if (k == 0) return; // No rotation needed

    for (int step = 0; step < k; ++step) {
        int last_element = nums[n - 1];
        // Shift all elements to the right by one position
        for (int i = n - 1; i > 0; --i) {
            nums[i] = nums[i - 1];
        }
        nums[0] = last_element; // Place the last element at the beginning
    }
}


// --- Problem 2: Find the Duplicate Number ---

int ArrayManipulator::findDuplicate_sort(std::vector<int> nums) {
    // Sort the array (modifies a copy, so original is untouched)
    std::sort(nums.begin(), nums.end());
    for (size_t i = 0; i < nums.size() - 1; ++i) {
        if (nums[i] == nums[i+1]) {
            return nums[i];
        }
    }
    return -1; // Should not reach here based on problem constraints
}

int ArrayManipulator::findDuplicate_hashSet(const std::vector<int>& nums) {
    std::unordered_set<int> seen;
    for (int num : nums) {
        if (seen.count(num)) { // If num is already in the set, it's a duplicate
            return num;
        }
        seen.insert(num); // Otherwise, add it to the set
    }
    return -1; // Should not reach here based on problem constraints
}

int ArrayManipulator::findDuplicate_floyd(const std::vector<int>& nums) {
    // This problem can be transformed into finding the start of a cycle in a linked list.
    // The array values are pointers: `nums[i]` points to `nums[nums[i]]`.
    // Since numbers are 1 to n and array size is n+1, there must be a cycle.

    int slow = nums[0]; // Start slow pointer at nums[0]
    int fast = nums[nums[0]]; // Start fast pointer at nums[nums[0]]

    // Phase 1: Find the intersection point of the two pointers
    // The fast pointer moves twice as fast as the slow pointer.
    // They are guaranteed to meet inside the cycle if there is one.
    while (slow != fast) {
        slow = nums[slow];
        fast = nums[nums[fast]];
    }

    // Phase 2: Find the "entrance" to the cycle
    // Reset one pointer (e.g., fast) to the beginning of the "list" (index 0).
    // Move both pointers one step at a time. The point where they meet again
    // is the start of the cycle, which is our duplicate number.
    // The duplicate number is the value 'x' for which multiple indices point to 'x'.
    // If we view `i -> nums[i]` as a linked list, then the starting node of the cycle
    // is the duplicate number.
    fast = 0; // Reset fast pointer to index 0

    while (slow != fast) {
        slow = nums[slow];
        fast = nums[fast];
    }

    return slow; // Or fast, they are at the same position
}

int ArrayManipulator::findDuplicate_binarySearch(const std::vector<int>& nums) {
    int n = nums.size() - 1; // Numbers are 1 to n
    int low = 1;
    int high = n;
    int duplicate = -1;

    while (low <= high) {
        int mid = low + (high - low) / 2;
        int count = 0;
        // Count how many numbers in nums are less than or equal to mid
        for (int num : nums) {
            if (num <= mid) {
                count++;
            }
        }

        // If count is greater than mid, it means there are more numbers
        // in the range [1, mid] than unique numbers available in that range.
        // Thus, a duplicate must exist in this range, including mid.
        if (count > mid) {
            duplicate = mid; // This mid is a potential duplicate or on the high side of range
            high = mid - 1; // Try to find a smaller duplicate
        } else {
            // Otherwise, the duplicate must be in the range [mid+1, n]
            low = mid + 1;
        }
    }
    return duplicate;
}


// --- Problem 3: Trapping Rain Water ---

int ArrayManipulator::trap_twoPointers(const std::vector<int>& height) {
    if (height.empty()) return 0;

    int n = height.size();
    int left = 0, right = n - 1;
    int left_max = 0, right_max = 0;
    int trapped_water = 0;

    while (left < right) {
        // Update left_max and right_max
        left_max = std::max(left_max, height[left]);
        right_max = std::max(right_max, height[right]);

        // The key idea is that the amount of water trapped at an index
        // depends on the MINIMUM of the max height to its left and max height to its right.
        // We always process the side with the smaller current max, because that's the
        // "limiting factor" for water level at the current `left` or `right` index.

        if (left_max < right_max) {
            // If left_max is smaller, it means the water level at 'left' will be
            // determined by 'left_max'. Any bar to the right (including height[right])
            // is guaranteed to be >= left_max.
            trapped_water += left_max - height[left];
            left++;
        } else {
            // If right_max is smaller (or equal), the water level at 'right' will be
            // determined by 'right_max'. Any bar to the left (including height[left])
            // is guaranteed to be >= right_max.
            trapped_water += right_max - height[right];
            right--;
        }
    }

    return trapped_water;
}

int ArrayManipulator::trap_dynamicProgramming(const std::vector<int>& height) {
    if (height.empty()) return 0;

    int n = height.size();
    std::vector<int> left_max(n, 0);
    std::vector<int> right_max(n, 0);

    // Calculate left_max for each position
    left_max[0] = height[0];
    for (int i = 1; i < n; ++i) {
        left_max[i] = std::max(left_max[i-1], height[i]);
    }

    // Calculate right_max for each position
    right_max[n-1] = height[n-1];
    for (int i = n - 2; i >= 0; --i) {
        right_max[i] = std::max(right_max[i+1], height[i]);
    }

    int trapped_water = 0;
    // For each bar, the water it can trap is min(left_max[i], right_max[i]) - height[i]
    for (int i = 0; i < n; ++i) {
        trapped_water += std::max(0, std::min(left_max[i], right_max[i]) - height[i]);
    }

    return trapped_water;
}

int ArrayManipulator::trap_monotonicStack(const std::vector<int>& height) {
    int trapped_water = 0;
    std::stack<int> s; // Stores indices of bars in decreasing order of height

    for (int i = 0; i < height.size(); ++i) {
        // While stack is not empty and current bar is taller than the bar at stack top
        while (!s.empty() && height[i] > height[s.top()]) {
            int top_idx = s.top();
            s.pop();

            // If stack becomes empty, it means there is no left boundary to trap water
            if (s.empty()) {
                break;
            }

            // The 'left_boundary_idx' is the new stack top
            int left_boundary_idx = s.top();
            // The 'width' of the well is `current_idx - left_boundary_idx - 1`
            int width = i - left_boundary_idx - 1;
            // The 'water_level' is determined by the minimum of the left and right boundaries
            int water_level = std::min(height[left_boundary_idx], height[i]);
            // Water trapped is (water_level - height of popped bar) * width
            trapped_water += (water_level - height[top_idx]) * width;
        }
        s.push(i); // Push current bar's index onto the stack
    }
    return trapped_water;
}


// --- Problem 4: Product of Array Except Self ---

std::vector<int> ArrayManipulator::productExceptSelf_twoPass(const std::vector<int>& nums) {
    int n = nums.size();
    std::vector<int> answer(n);

    // Pass 1: Calculate prefix products
    // answer[i] will store product of nums[0...i-1]
    answer[0] = 1; // Product before the first element is 1
    for (int i = 1; i < n; ++i) {
        answer[i] = answer[i - 1] * nums[i - 1];
    }

    // Pass 2: Calculate suffix products and combine
    // 'right_product' stores the product of nums[i+1...n-1]
    int right_product = 1; // Product after the last element is 1
    for (int i = n - 1; i >= 0; --i) {
        answer[i] = answer[i] * right_product; // answer[i] now = (prefix product) * (suffix product)
        right_product *= nums[i]; // Update right_product for the next iteration (moving left)
    }

    return answer;
}

std::vector<int> ArrayManipulator::productExceptSelf_bruteForce(const std::vector<int>& nums) {
    int n = nums.size();
    std::vector<int> answer(n);

    for (int i = 0; i < n; ++i) {
        long long current_product = 1; // Use long long to prevent overflow during intermediate calculations
        for (int j = 0; j < n; ++j) {
            if (i == j) {
                continue; // Skip the element at index i
            }
            current_product *= nums[j];
        }
        answer[i] = static_cast<int>(current_product);
    }
    return answer;
}
```