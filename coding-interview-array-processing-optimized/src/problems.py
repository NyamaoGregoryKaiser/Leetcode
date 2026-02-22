import heapq

# --- Problem 1: Container With Most Water (LeetCode 11) ---

class ContainerWithMostWater:
    """
    Given n non-negative integers a_1, a_2, ..., a_n where each represents a point at
    coordinate (i, a_i). n vertical lines are drawn such that the two endpoints
    of line i is at (i, a_i) and (i, 0). Find two lines, which, together with the x-axis,
    forms a container, such that the container contains the most water.

    Note: You may not slant the container and n is at least 2.
    """

    @staticmethod
    def brute_force(height: list[int]) -> int:
        """
        Approach 1: Brute Force
        Calculates the area for every possible pair of lines and returns the maximum.

        Time Complexity: O(N^2)
            - We use nested loops, where the outer loop iterates from 0 to N-1
              and the inner loop iterates from i+1 to N-1.
              This results in (N-1) + (N-2) + ... + 1 = O(N^2) operations.
        Space Complexity: O(1)
            - We only use a few variables to store the maximum area and loop indices.
        """
        max_area = 0
        n = len(height)
        for i in range(n):
            for j in range(i + 1, n):
                # The width of the container is the distance between the lines.
                width = j - i
                # The height of the container is limited by the shorter line.
                h = min(height[i], height[j])
                # Calculate the area and update max_area if current area is larger.
                max_area = max(max_area, width * h)
        return max_area

    @staticmethod
    def two_pointers_optimal(height: list[int]) -> int:
        """
        Approach 2: Two Pointers (Optimal)
        Uses two pointers, one at the beginning (left) and one at the end (right)
        of the array. In each step, it calculates the area and moves the pointer
        pointing to the shorter line inward. The intuition is that moving the
        shorter line has the potential to increase the height, whereas moving
        the taller line will only decrease the width without guarantee of increasing
        height, as the current shorter line will still be the bottleneck.

        Time Complexity: O(N)
            - The two pointers traverse the array from opposite ends, meeting in the middle.
              Each pointer moves at most N times, resulting in a single pass.
        Space Complexity: O(1)
            - We only use a few variables for pointers, max_area, and current_area.
        """
        max_area = 0
        left = 0
        right = len(height) - 1

        while left < right:
            # Calculate the current width.
            width = right - left
            # Determine the height, limited by the shorter of the two lines.
            h = min(height[left], height[right])
            # Calculate the current area.
            current_area = width * h
            # Update the maximum area found so far.
            max_area = max(max_area, current_area)

            # Move the pointer associated with the shorter line.
            # The goal is to potentially find a taller line to form a larger container.
            if height[left] < height[right]:
                left += 1
            else:
                right -= 1
        return max_area

# --- Problem 2: Product of Array Except Self (LeetCode 238) ---

class ProductOfArrayExceptSelf:
    """
    Given an integer array nums, return an array answer such that answer[i] is equal to
    the product of all the elements of nums except nums[i].
    The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
    You must write an algorithm that runs in O(n) time and without using the division operation.
    """

    @staticmethod
    def two_arrays_approach(nums: list[int]) -> list[int]:
        """
        Approach 1: Using two auxiliary arrays (Prefix and Suffix Products).
        This approach computes prefix products and suffix products into two separate arrays.
        `prefix_products[i]` stores the product of all elements to the left of `nums[i]`.
        `suffix_products[i]` stores the product of all elements to the right of `nums[i]`.
        Then, `answer[i]` is simply `prefix_products[i] * suffix_products[i]`.

        Time Complexity: O(N)
            - Three passes over the array: one for prefix products, one for suffix products,
              and one to compute the final answer. Each pass takes O(N) time.
        Space Complexity: O(N)
            - Two additional arrays (`prefix_products` and `suffix_products`) of size N are used.
              (If the output array is not counted, this is still O(N) auxiliary space).
        """
        n = len(nums)
        if n == 0:
            return []

        # Initialize prefix and suffix product arrays
        prefix_products = [1] * n
        suffix_products = [1] * n
        answer = [0] * n

        # Calculate prefix products
        # prefix_products[i] = product of nums[0]...nums[i-1]
        for i in range(1, n):
            prefix_products[i] = prefix_products[i-1] * nums[i-1]

        # Calculate suffix products
        # suffix_products[i] = product of nums[i+1]...nums[n-1]
        for i in range(n - 2, -1, -1):
            suffix_products[i] = suffix_products[i+1] * nums[i+1]

        # Calculate the final answer
        # answer[i] = prefix_products[i] * suffix_products[i]
        for i in range(n):
            answer[i] = prefix_products[i] * suffix_products[i]

        return answer

    @staticmethod
    def optimal_o1_space(nums: list[int]) -> list[int]:
        """
        Approach 2: Optimal O(1) space (excluding output array).
        This approach optimizes the space complexity by using the `answer` array itself
        to store prefix products and then calculating suffix products on the fly
        during a second pass.

        1. Initialize `answer` array:
           - First, `answer[i]` will store the product of all elements to the left of `nums[i]`.
           - `answer[0]` is initialized to 1 (nothing to its left).
           - `answer[i] = answer[i-1] * nums[i-1]` for `i > 0`.
        2. Calculate suffix products and combine:
           - Initialize a `right_product` variable to 1. This variable will keep track
             of the product of all elements to the right of the current index `i`.
           - Iterate from `n-1` down to `0`:
             - `answer[i] = answer[i] * right_product` (multiply prefix product by suffix product).
             - `right_product = right_product * nums[i]` (update right product for the next iteration).

        Time Complexity: O(N)
            - Two passes over the array: one forward pass for prefix products
              and one backward pass for suffix products and final computation.
        Space Complexity: O(1)
            - The `answer` array is considered the output and not extra space
              for complexity analysis. Only a few auxiliary variables are used.
        """
        n = len(nums)
        if n == 0:
            return []

        answer = [1] * n

        # Pass 1: Calculate prefix products and store in answer array
        # answer[i] will contain product of nums[0...i-1]
        # For i=0, there are no elements to the left, so answer[0] remains 1.
        for i in range(1, n):
            answer[i] = answer[i-1] * nums[i-1]

        # Pass 2: Calculate suffix products and combine with prefix products
        # 'right_product' will accumulate product of elements to the right
        right_product = 1
        for i in range(n - 1, -1, -1):
            # For the current element answer[i], it already holds the prefix product.
            # We multiply it by the accumulated product of elements to its right.
            answer[i] = answer[i] * right_product
            # Update 'right_product' to include the current element for the next iteration.
            right_product = right_product * nums[i]

        return answer

# --- Problem 3: Rotate Image (Matrix) (LeetCode 48) ---

class RotateImage:
    """
    You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).
    You have to rotate the image in-place, which means you modify the input 2D matrix directly.
    DO NOT allocate another 2D matrix and do the rotation.
    """

    @staticmethod
    def rotate_with_extra_space(matrix: list[list[int]]) -> None:
        """
        Approach 1: Using an auxiliary matrix (Not in-place).
        Creates a new matrix and fills it with rotated elements, then copies back.
        This approach is simple to understand but violates the "in-place" constraint
        of the problem.

        Time Complexity: O(N^2)
            - We iterate through all N*N elements twice (once to copy to new, once to copy back).
        Space Complexity: O(N^2)
            - An entirely new N x N matrix is created to store the rotated image.
        """
        n = len(matrix)
        if n == 0 or n != len(matrix[0]): # Ensure it's a square matrix
            return

        rotated_matrix = [[0] * n for _ in range(n)]

        for r in range(n):
            for c in range(n):
                # A cell (r, c) in the original matrix moves to (c, n - 1 - r) in the rotated matrix.
                rotated_matrix[c][n - 1 - r] = matrix[r][c]

        # Copy the rotated_matrix back to the original matrix
        for r in range(n):
            for c in range(n):
                matrix[r][c] = rotated_matrix[r][c]

    @staticmethod
    def rotate_in_place_transpose_and_reverse(matrix: list[list[int]]) -> None:
        """
        Approach 2: In-place using Transpose and Reverse. (Optimal for clarity/efficiency)
        This method rotates the matrix in two steps:
        1. Transpose the matrix: Swap `matrix[i][j]` with `matrix[j][i]`. This effectively
           flips the matrix over its main diagonal.
        2. Reverse each row: After transposing, reverse the order of elements in each row.

        Example:
        Original:
        1 2 3
        4 5 6
        7 8 9

        Transpose:
        1 4 7
        2 5 8
        3 6 9

        Reverse each row:
        7 4 1
        8 5 2
        9 6 3 (This is the 90-degree clockwise rotation)

        Time Complexity: O(N^2)
            - Transposing takes O(N^2) (iterating over half the matrix).
            - Reversing each row takes O(N^2) (N rows, each reversal is O(N)).
            - Total time is dominated by N^2 operations.
        Space Complexity: O(1)
            - All operations are performed in-place without using additional significant space.
        """
        n = len(matrix)
        if n == 0 or n != len(matrix[0]):
            return

        # Step 1: Transpose the matrix
        # Iterate only for the upper triangle (or lower triangle) to avoid swapping elements twice.
        for r in range(n):
            for c in range(r, n): # Start 'c' from 'r'
                matrix[r][c], matrix[c][r] = matrix[c][r], matrix[r][c]

        # Step 2: Reverse each row
        # After transpose, each row represents a column in the original matrix,
        # but in reverse order for clockwise rotation.
        for r in range(n):
            # Python's list slicing `[::-1]` creates a new list.
            # To reverse in-place, use `list.reverse()` or two pointers.
            matrix[r].reverse() # This modifies the list in-place

    @staticmethod
    def rotate_in_place_layer_by_layer(matrix: list[list[int]]) -> None:
        """
        Approach 3: In-place Layer by Layer Rotation. (Another Optimal O(1) space)
        This method processes the matrix in concentric layers, starting from the outermost.
        For each layer, it rotates the four corresponding elements in a cycle:
        top -> right -> bottom -> left -> top.

        Consider a square matrix of side 'n'. There are `n // 2` layers.
        For each layer `k` (from 0 to `n // 2 - 1`):
        - The elements along the top edge are `(k, c)` where `c` goes from `k` to `n - 1 - k - 1`.
        - The corresponding right edge elements are `(c, n - 1 - k)`.
        - The corresponding bottom edge elements are `(n - 1 - k, n - 1 - c)`.
        - The corresponding left edge elements are `(n - 1 - c, k)`.

        Time Complexity: O(N^2)
            - We iterate through `n // 2` layers.
            - For each layer, we perform `(n - 1 - 2*k)` rotations (where `k` is the layer index).
            - This sums up to approximately N^2 operations.
        Space Complexity: O(1)
            - All operations are performed in-place. Only a temporary variable is used for swapping.
        """
        n = len(matrix)
        if n == 0 or n != len(matrix[0]):
            return

        # Iterate through layers (outermost to innermost)
        # We only need to go up to n // 2 because each layer has 4 sides and a single swap
        # operation handles all 4 sides.
        for layer in range(n // 2):
            first = layer                  # Starting index for the current layer
            last = n - 1 - layer           # Ending index for the current layer

            # Iterate through elements on the top edge of the current layer
            # `i` goes from `first` to `last - 1` (because `last` element is part of the next side segment)
            for i in range(first, last):
                # Store the top element
                top = matrix[first][i]

                # Move left element to top
                matrix[first][i] = matrix[last - (i - first)][first]

                # Move bottom element to left
                matrix[last - (i - first)][first] = matrix[last][last - (i - first)]

                # Move right element to bottom
                matrix[last][last - (i - first)] = matrix[i][last]

                # Move top (stored) element to right
                matrix[i][last] = top

# --- Problem 4: Meeting Rooms II (LeetCode 253) ---

class MeetingRoomsII:
    """
    Given an array of meeting time intervals where intervals[i] = [start_i, end_i],
    return the minimum number of conference rooms required.
    """

    @staticmethod
    def min_rooms_brute_force_conceptual(intervals: list[list[int]]) -> int:
        """
        Approach 1: Brute Force (Conceptual - often too complex to implement in interview)
        This approach would involve iterating through all meetings and for each meeting,
        checking if it can fit into any existing room. If not, a new room is needed.
        Tracking room availability precisely with brute force can become very complex,
        potentially O(N^2) for sorting intervals (if not sorted) and then another O(N^2)
        or O(N*num_rooms) for assigning, making it inefficient.
        A very naive approach might be:
        1. Sort intervals by start time.
        2. For each interval, check against all *active* rooms.
           If it overlaps with all, create a new room.
           This would involve a `List[List[Interval]]` structure where each inner list
           is a room. Checking for overlaps would be slow.
        Given its inefficiency and complexity, this method is usually discussed
        conceptually rather than fully implemented in an interview.
        """
        # This implementation simply provides a base case for the problem,
        # but a true brute-force (simulating rooms and checking all overlaps)
        # is complex and not usually asked to implement for this problem.
        # The simplest (and incorrect for N>1) brute-force might be:
        # if not intervals: return 0
        # if len(intervals) == 1: return 1
        # max_rooms = 0
        # for i in range(len(intervals)):
        #     current_rooms = 1
        #     for j in range(len(intervals)):
        #         if i != j and intervals[i][0] < intervals[j][1] and intervals[j][0] < intervals[i][1]:
        #             current_rooms += 1
        #     max_rooms = max(max_rooms, current_rooms)
        # return max_rooms // 2 if max_rooms > 1 else max_rooms # This is still wrong
        # The correct approach requires tracking simultaneous overlaps, which points to sorting + min-heap.
        print("Brute force for Meeting Rooms II is conceptually difficult and inefficient.")
        print("It's usually not implemented; optimal solutions are preferred.")
        if not intervals:
            return 0
        # A very basic "brute force" that only counts simultaneous overlaps
        # This is more like a conceptual approach and not truly "brute force" in typical interview sense
        # where you try all combinations.
        # This is actually a line sweep, but without a specific data structure to track events.
        # It's less efficient than the optimal heap solution.
        n = len(intervals)
        if n <= 1:
            return n

        # Sort intervals by start time
        intervals.sort(key=lambda x: x[0])

        max_concurrent_meetings = 0
        for i in range(n):
            current_meetings = 1 # The current meeting itself
            for j in range(i + 1, n):
                # Check for overlap: [A_start, A_end], [B_start, B_end]
                # Overlap if A_start < B_end AND B_start < A_end
                # Here, since sorted by start_time, B_start >= A_start
                # So we only need to check B_start < A_end
                if intervals[j][0] < intervals[i][1]:
                    current_meetings += 1
            max_concurrent_meetings = max(max_concurrent_meetings, current_meetings)
        return max_concurrent_meetings


    @staticmethod
    def min_rooms_optimal_heap(intervals: list[list[int]]) -> int:
        """
        Approach 2: Optimal using Sorting and a Min-Heap.
        This is the standard and most efficient approach.

        1. Sort the intervals by their start times.
        2. Initialize a min-heap to store the *end times* of meetings currently in rooms.
           The size of the heap will represent the number of active rooms.
        3. Iterate through the sorted intervals:
           a. If the heap is not empty and the current meeting's start time is
              greater than or equal to the earliest ending meeting (heap[0]),
              it means a room has become free. Remove that meeting's end time from the heap.
           b. Add the current meeting's end time to the heap. This effectively
              assigns the current meeting to a room (either a newly freed one or a new one).
        4. The final size of the heap will be the minimum number of rooms required,
           as it reflects the maximum number of simultaneously active meetings.

        Time Complexity: O(N log N)
            - Sorting the intervals takes O(N log N).
            - Iterating through N intervals: Each heap operation (push, pop) takes O(log K) time,
              where K is the number of elements in the heap (at most N).
            - Total time is dominated by sorting and heap operations: O(N log N + N log N) = O(N log N).
        Space Complexity: O(N)
            - The min-heap can store up to N meeting end times in the worst case
              (e.g., all meetings overlap).
        """
        if not intervals:
            return 0

        # 1. Sort intervals by their start times
        intervals.sort(key=lambda x: x[0])

        # 2. Initialize a min-heap to store the end times of meetings
        # The heap will effectively store the ending times of meetings that are
        # currently occupying rooms.
        # The top (smallest) element of the heap will be the earliest ending meeting.
        rooms = [] # min-heap

        # 3. Iterate through the sorted intervals
        for start, end in intervals:
            # Check if any room is free (i.e., if the earliest ending meeting has finished
            # before the current meeting starts).
            if rooms and start >= rooms[0]:
                # If a room is free, reuse it. Remove the earliest ending meeting.
                heapq.heappop(rooms)
            # Assign the current meeting to a room (either new or reused).
            # Add its end time to the heap.
            heapq.heappush(rooms, end)

        # 4. The number of elements in the heap is the minimum rooms required.
        # This is because the heap always contains the end times of currently
        # active meetings, and its size reflects the maximum concurrency.
        return len(rooms)

    @staticmethod
    def min_rooms_line_sweep(intervals: list[list[int]]) -> int:
        """
        Approach 3: Line Sweep (Alternative Optimal)
        This approach uses a "line sweep" or "event point" technique.
        1. Create two lists: one for all start times and one for all end times.
        2. Sort both lists independently.
        3. Iterate through the sorted start times and sorted end times simultaneously
           using two pointers.
           - If a meeting starts (`start_ptr` advances), increment a `rooms_needed` counter.
           - If a meeting ends (`end_ptr` advances), decrement `rooms_needed`.
           - The maximum value `rooms_needed` reaches is the answer.
        Crucially, if a meeting ends *at the same time* another starts, we prioritize
        releasing the room first (decrement then increment) so that the same room can be reused.
        This means if `start_times[s_ptr] == end_times[e_ptr]`, advance `e_ptr` first.

        Time Complexity: O(N log N)
            - Creating and sorting `start_times` and `end_times` lists takes O(N log N).
            - The two-pointer sweep takes O(N).
            - Total: O(N log N).
        Space Complexity: O(N)
            - Two additional lists of size N are created for start and end times.
        """
        if not intervals:
            return 0

        n = len(intervals)
        start_times = sorted([interval[0] for interval in intervals])
        end_times = sorted([interval[1] for interval in intervals])

        rooms_needed = 0
        max_rooms = 0
        s_ptr = 0 # Pointer for start times
        e_ptr = 0 # Pointer for end times

        while s_ptr < n:
            # If the current meeting starts before or at the same time as
            # the earliest ending meeting, a new room is needed (or a room
            # is just freed and immediately taken).
            # Prioritize ending a meeting if start time == end time
            if start_times[s_ptr] < end_times[e_ptr]:
                rooms_needed += 1
                s_ptr += 1
            else: # A meeting has ended, so a room is freed
                rooms_needed -= 1
                e_ptr += 1

            # Update the maximum rooms needed so far
            max_rooms = max(max_rooms, rooms_needed)

        return max_rooms
---