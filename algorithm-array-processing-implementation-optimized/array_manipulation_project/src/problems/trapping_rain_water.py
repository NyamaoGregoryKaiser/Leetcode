def trap_rain_water_brute_force(height):
    """
    Computes the amount of water an elevation map can trap using a brute-force approach.
    For each bar, it finds the maximum height to its left and right, then calculates
    the trapped water based on the minimum of these two maximums.

    Time Complexity: O(N^2)
        - For each of the N bars, we iterate left (up to N times) and right
          (up to N times) to find the max heights.
    Space Complexity: O(1)
        - No extra space is used beyond a few variables.

    Args:
        height (list): A list of non-negative integers representing the elevation map.

    Returns:
        int: The total amount of water trapped.
    """
    if not height or len(height) < 3:
        return 0

    n = len(height)
    total_water = 0

    # We can't trap water at the very first or very last bar,
    # as there's no "wall" on both sides.
    for i in range(1, n - 1):
        # Find max height to the left of current bar (inclusive for convenience, actual limit is max_left_of_i)
        left_max = 0
        for j in range(i + 1): # Scan from 0 up to current i
            left_max = max(left_max, height[j])

        # Find max height to the right of current bar (inclusive for convenience, actual limit is max_right_of_i)
        right_max = 0
        for j in range(i, n): # Scan from current i up to n-1
            right_max = max(right_max, height[j])

        # Water trapped at current bar 'i' is limited by the minimum of
        # the max left and max right heights, minus the current bar's height.
        # We take max(0, ...) because if height[i] is greater than or equal to
        # min(left_max, right_max), no water can be trapped.
        water_at_i = min(left_max, right_max) - height[i]
        total_water += max(0, water_at_i)

    return total_water

def trap_rain_water_dp(height):
    """
    Computes the amount of water an elevation map can trap using Dynamic Programming.
    This approach precomputes the maximum height to the left and right for each position,
    then makes a single pass to calculate the trapped water.

    Time Complexity: O(N)
        - One pass to fill `left_max` array.
        - One pass to fill `right_max` array.
        - One pass to calculate total water.
    Space Complexity: O(N)
        - Two auxiliary arrays (`left_max` and `right_max`) of size N are used.

    Args:
        height (list): A list of non-negative integers representing the elevation map.

    Returns:
        int: The total amount of water trapped.
    """
    if not height or len(height) < 3:
        return 0

    n = len(height)
    left_max = [0] * n  # Stores max height from left up to current index (inclusive)
    right_max = [0] * n # Stores max height from right up to current index (inclusive)
    total_water = 0

    # Populate left_max array
    left_max[0] = height[0]
    for i in range(1, n):
        left_max[i] = max(left_max[i-1], height[i])

    # Populate right_max array
    right_max[n-1] = height[n-1]
    for i in range(n-2, -1, -1):
        right_max[i] = max(right_max[i+1], height[i])

    # Calculate trapped water for each bar
    for i in range(n):
        # The amount of water trapped above height[i] is
        # min(max_height_from_left_including_i, max_height_from_right_including_i) - height[i]
        # Since left_max[i] and right_max[i] already include height[i],
        # min(left_max[i], right_max[i]) will always be >= height[i],
        # so we don't need max(0, ...) here.
        water_at_i = min(left_max[i], right_max[i]) - height[i]
        total_water += water_at_i

    return total_water

def trap_rain_water_two_pointers(height):
    """
    Computes the amount of water an elevation map can trap using the two-pointers technique.
    This is the most optimal and space-efficient approach.

    It uses two pointers, `left` and `right`, starting from the ends of the array.
    It maintains `max_left` and `max_right` to track the maximum heights seen
    so far from the left and right, respectively.

    The key idea is that if `height[left] < height[right]`, then the water trapped
    at `left` (and potentially to its right) is limited by `max_left`. This is because
    we know there's a wall `height[right]` (or something even taller) on the right side
    that is at least as tall as `height[left]`. Thus, `max_left` is the tighter bound.
    We then move `left` inward. A symmetrical argument applies if `height[left] >= height[right]`.

    Time Complexity: O(N)
        - The two pointers traverse the array once, performing constant work at each step.
    Space Complexity: O(1)
        - No extra auxiliary arrays are used.

    Args:
        height (list): A list of non-negative integers representing the elevation map.

    Returns:
        int: The total amount of water trapped.
    """
    if not height or len(height) < 3:
        return 0

    n = len(height)
    left, right = 0, n - 1
    max_left = 0  # Max height encountered from the left up to `left`
    max_right = 0 # Max height encountered from the right up to `right`
    total_water = 0

    while left < right:
        if height[left] < height[right]:
            # The current left bar is shorter than the current right bar.
            # Water trapped at `left` (and elements between `left` and `right`)
            # will be limited by `max_left`. The right boundary is guaranteed
            # to be at least `height[right]`, which is >= height[left].
            if height[left] >= max_left:
                # This bar extends the left wall, so no water trapped at this exact position.
                max_left = height[left]
            else:
                # Water can be trapped here, limited by the existing max_left.
                total_water += max_left - height[left]
            left += 1 # Move left pointer inwards
        else:
            # The current right bar is shorter or equal to the current left bar.
            # Water trapped at `right` will be limited by `max_right`.
            # The left boundary is guaranteed to be at least `height[left]`.
            if height[right] >= max_right:
                # This bar extends the right wall.
                max_right = height[right]
            else:
                # Water can be trapped here, limited by the existing max_right.
                total_water += max_right - height[right]
            right -= 1 # Move right pointer inwards

    return total_water

# Example usage (for testing/demonstration outside unit tests)
if __name__ == "__main__":
    test_cases = [
        ([0,1,0,2,1,0,1,3,2,1,2,1], 6),
        ([4,2,0,3,2,5], 9),
        ([0,0,0,0,0], 0),
        ([1,2,3,4,5], 0), # Monotonically increasing
        ([5,4,3,2,1], 0), # Monotonically decreasing
        ([1,0,1], 1),
        ([2,0,2], 2),
        ([1,1,1,1,1], 0),
        ([], 0),
        ([1], 0),
        ([1,2], 0),
        ([4,2,3], 1)
    ]

    print("--- Trapping Rain Water (Brute Force) ---")
    for height, expected in test_cases:
        result = trap_rain_water_brute_force(list(height))
        print(f"Height: {height}, Result: {result}, Expected: {expected} {'(Correct)' if result == expected else '(Incorrect)'}")

    print("\n--- Trapping Rain Water (Dynamic Programming) ---")
    for height, expected in test_cases:
        result = trap_rain_water_dp(list(height))
        print(f"Height: {height}, Result: {result}, Expected: {expected} {'(Correct)' if result == expected else '(Incorrect)'}")

    print("\n--- Trapping Rain Water (Two Pointers) ---")
    for height, expected in test_cases:
        result = trap_rain_water_two_pointers(list(height))
        print(f"Height: {height}, Result: {result}, Expected: {expected} {'(Correct)' if result == expected else '(Incorrect)'}")