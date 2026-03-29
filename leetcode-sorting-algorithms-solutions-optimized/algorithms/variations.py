import heapq
import functools

# --- Problem 1: Custom Object Sorting ---

class Person:
    """
    A simple class representing a person with an age and a name.
    Used for custom sorting demonstrations.
    """
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age

    def __repr__(self):
        return f"Person(name='{self.name}', age={self.age})"

    def __lt__(self, other):
        """
        Default less-than comparison, useful for built-in sort and min-heaps.
        Sorts by age, then by name.
        """
        if self.age != other.age:
            return self.age < other.age
        return self.name < other.name

def sort_people_by_age_then_name(people_list: list[Person]) -> None:
    """
    Sorts a list of Person objects in-place.
    Primary sort key: age (ascending).
    Secondary sort key: name (ascending).

    Uses Python's built-in `list.sort()` with a lambda function for the key.
    This is generally the most Pythonic and efficient way for custom sorts.

    Args:
        people_list: A list of Person objects to be sorted. Modified in-place.

    Time Complexity:
        - O(N log N) - Dominated by Python's Timsort algorithm.
    Space Complexity:
        - O(N) or O(log N) - Timsort requires O(N) in worst case,
          O(log N) in best case for auxiliary space.
    """
    people_list.sort(key=lambda person: (person.age, person.name))

def sort_people_with_custom_cmp(people_list: list[Person]) -> None:
    """
    Sorts a list of Person objects using a custom comparison function
    and `functools.cmp_to_key`.
    This approach is useful when the comparison logic is complex or
    doesn't fit well into a simple key function.

    Primary sort key: age (ascending).
    Secondary sort key: name (ascending).

    Args:
        people_list: A list of Person objects to be sorted. Modified in-place.

    Time Complexity:
        - O(N log N) - Dominated by Python's Timsort algorithm.
    Space Complexity:
        - O(N) or O(log N) - Timsort auxiliary space.
    """
    def compare_people(p1: Person, p2: Person) -> int:
        if p1.age != p2.age:
            return p1.age - p2.age  # Ascending age
        if p1.name < p2.name:
            return -1  # Ascending name
        if p1.name > p2.name:
            return 1
        return 0

    people_list.sort(key=functools.cmp_to_key(compare_people))


# --- Problem 2: Kth Largest Element in an Array ---

def find_kth_largest_by_sorting(nums: list[int], k: int) -> int:
    """
    Finds the k-th largest element in an array by sorting the entire array.
    This is a simple, brute-force approach for this specific problem.

    Args:
        nums: The list of integers.
        k: The k-th largest element to find (1-indexed).

    Returns:
        The k-th largest element.

    Time Complexity:
        - O(N log N) - Due to sorting the entire array.
    Space Complexity:
        - O(N) or O(log N) - Depends on the sorting algorithm used by Python's `sort()`.
    """
    nums.sort()
    return nums[len(nums) - k]

def find_kth_largest_by_heap(nums: list[int], k: int) -> int:
    """
    Finds the k-th largest element in an array using a min-heap.
    This approach is efficient for large N and small k, or when elements
    arrive in a stream.

    Args:
        nums: The list of integers.
        k: The k-th largest element to find (1-indexed).

    Returns:
        The k-th largest element.

    Time Complexity:
        - O(N log K) - Each of N elements is pushed into a heap of size K,
          which takes O(log K) time.
    Space Complexity:
        - O(K) - To store K elements in the min-heap.
    """
    min_heap = []
    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap) # Remove smallest element if heap exceeds size k

    return min_heap[0] # The root of the min-heap is the k-th largest element

def find_kth_largest_by_quickselect(nums: list[int], k: int) -> int:
    """
    Finds the k-th largest element in an array using the Quickselect algorithm.
    Quickselect is a selection algorithm, a variation of Quick Sort. It
    finds the k-th smallest element (or k-th largest) in linear average time.

    Args:
        nums: The list of integers.
        k: The k-th largest element to find (1-indexed).

    Returns:
        The k-th largest element.

    Time Complexity:
        - Average Case: O(N) - On average, partitioning reduces the problem
          size by a constant factor in each step.
        - Worst Case: O(N^2) - If pivot selection consistently leads to
          unbalanced partitions (rare with randomized pivot).
    Space Complexity:
        - O(log N) average-case for the recursion stack.
        - O(N) worst-case for the recursion stack.
    """
    # Convert k-th largest to k-th smallest index (0-indexed)
    # The (k)-th largest element is at index (n - k) if the array were sorted.
    target_idx = len(nums) - k

    def _partition(arr: list[int], left: int, right: int) -> int:
        """
        Partitions the sub-array arr[left...right] around a pivot.
        Uses a random pivot to mitigate worst-case scenarios.
        """
        # Choose a random pivot index to improve average case performance
        pivot_idx = random.randint(left, right)
        pivot_value = arr[pivot_idx]

        # Move pivot to the end
        arr[pivot_idx], arr[right] = arr[right], arr[pivot_idx]

        store_idx = left
        for i in range(left, right):
            if arr[i] < pivot_value:
                arr[store_idx], arr[i] = arr[i], arr[store_idx]
                store_idx += 1

        # Move pivot to its final sorted position
        arr[right], arr[store_idx] = arr[store_idx], arr[right]
        return store_idx

    def _quickselect_recursive(arr: list[int], left: int, right: int) -> int:
        """
        Recursive helper function for Quickselect.
        """
        if left == right: # Base case: if the list contains only one element
            return arr[left]

        # Partition the array and get the pivot's final position
        pivot_final_idx = _partition(arr, left, right)

        if target_idx == pivot_final_idx:
            return arr[target_idx]
        elif target_idx < pivot_final_idx:
            # If target is in the left partition
            return _quickselect_recursive(arr, left, pivot_final_idx - 1)
        else:
            # If target is in the right partition
            return _quickselect_recursive(arr, pivot_final_idx + 1, right)

    # Make a copy of the list to avoid modifying the original during recursive calls
    # as the problem statement usually implies finding the element without modifying input
    # for competitive programming. If in-place modification is allowed, pass nums directly.
    nums_copy = list(nums)
    return _quickselect_recursive(nums_copy, 0, len(nums_copy) - 1)


# --- Problem 3: Sort Colors (Dutch National Flag Problem) ---

def sort_colors_dutch_national_flag(nums: list[int]) -> None:
    """
    Sorts an array containing 0s, 1s, and 2s in-place using the
    Dutch National Flag algorithm (one-pass approach).

    This algorithm uses three pointers:
    - `low`: Points to the end of the 0s section. Elements arr[0...low-1] are 0s.
    - `mid`: Current element being considered. Elements arr[low...mid-1] are 1s.
    - `high`: Points to the start of the 2s section. Elements arr[high+1...n-1] are 2s.

    Args:
        nums: The list of integers (0s, 1s, 2s) to be sorted. Modified in-place.

    Time Complexity:
        - O(N) - Each element is visited at most twice (once by `mid`, and
          potentially once by a swap).
    Space Complexity:
        - O(1) - It's an in-place sorting algorithm, requiring minimal
          additional space.
    """
    low = 0
    mid = 0
    high = len(nums) - 1

    while mid <= high:
        if nums[mid] == 0:
            # If current element is 0, swap it with the element at `low`.
            # Then increment both `low` and `mid`.
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            # If current element is 1, it's already in its correct "middle" section.
            # Just move to the next element.
            mid += 1
        else: # nums[mid] == 2
            # If current element is 2, swap it with the element at `high`.
            # Decrement `high`. Do NOT increment `mid` here, because the
            # swapped element from `high` position needs to be checked.
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1

def sort_colors_counting_sort(nums: list[int]) -> None:
    """
    Sorts an array containing 0s, 1s, and 2s using a two-pass counting sort approach.

    This method counts the occurrences of each color (0, 1, 2) and then
    reconstructs the array based on these counts.

    Args:
        nums: The list of integers (0s, 1s, 2s) to be sorted. Modified in-place.

    Time Complexity:
        - O(N) - One pass to count, one pass to rebuild.
    Space Complexity:
        - O(1) - If the number of distinct colors (3) is considered a constant.
          Otherwise, O(k) where k is the number of distinct colors.
    """
    counts = {0: 0, 1: 0, 2: 0}
    for num in nums:
        counts[num] += 1

    idx = 0
    for color in range(3): # Iterate 0, 1, 2
        for _ in range(counts[color]):
            nums[idx] = color
            idx += 1


# --- Problem 4: Wiggle Sort ---

def wiggle_sort_sort_then_swap(nums: list[int]) -> None:
    """
    Reorders an array in-place such that `nums[0] <= nums[1] >= nums[2] <= nums[3]...`
    This approach sorts the array first and then performs swaps.

    Args:
        nums: The list of integers to be wiggle-sorted. Modified in-place.

    Time Complexity:
        - O(N log N) - Dominated by the initial sorting step.
    Space Complexity:
        - O(N) or O(log N) - Depends on the sorting algorithm used by Python's `sort()`.
    """
    nums.sort()
    n = len(nums)
    # Swap elements from index 1, 3, 5...
    # For a[0] <= a[1] >= a[2] <= a[3] >= a[4]...
    # After sorting: a0, a1, a2, a3, a4, a5...
    # Swap (a1, a2), (a3, a4), (a5, a6)...
    for i in range(1, n - 1, 2): # Start at 1, go up to n-2 (inclusive), step by 2
        nums[i], nums[i+1] = nums[i+1], nums[i]

def wiggle_sort_linear_pass(nums: list[int]) -> None:
    """
    Reorders an array in-place such that `nums[0] <= nums[1] >= nums[2] <= nums[3]...`
    This approach makes a single pass through the array.

    The idea is to iterate through the array and ensure the wiggle condition
    is met for each pair.
    - If `i` is an even index, we expect `nums[i] <= nums[i+1]`.
    - If `i` is an odd index, we expect `nums[i] >= nums[i+1]`.

    If the condition is violated, we swap `nums[i]` and `nums[i+1]`.

    Args:
        nums: The list of integers to be wiggle-sorted. Modified in-place.

    Time Complexity:
        - O(N) - A single pass through the array.
    Space Complexity:
        - O(1) - In-place modification.
    """
    n = len(nums)
    if n <= 1:
        return

    for i in range(n - 1):
        if i % 2 == 0: # Even index, expect nums[i] <= nums[i+1]
            if nums[i] > nums[i+1]:
                nums[i], nums[i+1] = nums[i+1], nums[i]
        else: # Odd index, expect nums[i] >= nums[i+1]
            if nums[i] < nums[i+1]:
                nums[i], nums[i+1] = nums[i+1], nums[i]