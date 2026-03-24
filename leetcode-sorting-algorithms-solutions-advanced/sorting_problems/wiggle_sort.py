import random

# Problem: Wiggle Sort II
# Given an integer array `nums`, reorder it such that `nums[0] < nums[1] > nums[2] < nums[3]...`.
# You may assume the input array always has a valid answer.

# Note: This is different from Wiggle Sort I where `nums[0] <= nums[1] >= nums[2] <= nums[3]...`
# For Wiggle Sort II, the strict inequality requires elements to be distinct enough or handled carefully.
# The median plays a crucial role.

# --- Optimal Approach: Quickselect + 3-Way Partition + Virtual Indexing ---
# Time Complexity: O(N) on average due to Quickselect and 3-way partition. O(N^2) worst case for Quickselect.
# Space Complexity: O(N) for auxiliary array during partitioning or O(log N) for recursion stack.
# This approach aims for O(N) time and O(1) extra space (in-place) as much as possible.
# The key idea is to find the median, then partition the array such that elements
# smaller than the median are placed on one side, equal to median in the middle,
# and larger than median on the other side. Finally, distribute these elements
# into the "wiggle" pattern using a virtual indexing scheme.

def _quickselect_kth(nums, k):
    """
    Finds the k-th smallest element (0-indexed) in nums using Quickselect.
    Modifies nums in place.
    """
    def partition(arr, left, right, pivot_idx):
        pivot_val = arr[pivot_idx]
        arr[pivot_idx], arr[right] = arr[right], arr[pivot_idx] # Move pivot to end
        store_idx = left
        for i in range(left, right):
            if arr[i] < pivot_val:
                arr[store_idx], arr[i] = arr[i], arr[store_idx]
                store_idx += 1
        arr[right], arr[store_idx] = arr[store_idx], arr[right] # Move pivot to its final place
        return store_idx

    left, right = 0, len(nums) - 1
    while True:
        if left == right:
            return nums[left]
        pivot_idx = random.randint(left, right)
        pivot_final_idx = partition(nums, left, right, pivot_idx)

        if pivot_final_idx == k:
            return nums[k]
        elif pivot_final_idx < k:
            left = pivot_final_idx + 1
        else:
            right = pivot_final_idx - 1

def wiggle_sort_ii_optimal(nums: list[int]) -> None:
    """
    Reorders the array `nums` in-place such that `nums[0] < nums[1] > nums[2] < nums[3]...`.
    This uses a three-way partition around the median and a virtual indexing scheme.

    Args:
        nums (list[int]): The input array of integers, modified in-place.
    """
    n = len(nums)
    if n <= 1:
        return

    # 1. Find the median using Quickselect.
    # The median for odd `n` is at index `n // 2`.
    # For even `n`, there are two medians, we can pick `(n - 1) // 2` or `n // 2`.
    # To ensure `nums[small] < median < nums[large]`, we target the lower median (0-indexed).
    median_idx = (n - 1) // 2
    median = _quickselect_kth(nums, median_idx)

    # 2. Three-way partition (Dutch National Flag) around the median.
    # Elements < median go to the left, > median to the right, = median in the middle.
    # This requires an auxiliary array for distribution or careful in-place partitioning.
    # For O(1) space, we need a "virtual index" mapping.
    # The target pattern is small, large, small, large...
    # The small elements should go to indices 0, 2, 4...
    # The large elements should go to indices 1, 3, 5...

    # Virtual Index Mapping:
    # This function maps a logical index `i` (0 to n-1) to a physical index in `nums`.
    # It ensures that odd indices (0,2,4,...) are filled with smaller elements (or median)
    # and even indices (1,3,5,...) are filled with larger elements (or median).
    # The actual mapping used here for Wiggle Sort II typically is:
    # mapped_index = (1 + 2 * i) % (n | 1)
    # where (n | 1) makes n odd if it's even, helping with wrapping for the last index.
    # E.g., for n=6, (1+2*0)%7=1, (1+2*1)%7=3, (1+2*2)%7=5, (1+2*3)%7=0, (1+2*4)%7=2, (1+2*5)%7=4
    # This maps [0,1,2,3,4,5] to [1,3,5,0,2,4].
    # This places smaller numbers at odd mapped indices (physical 1,3,5) and larger at even mapped indices (physical 0,2,4).
    # This setup for the virtual index ensures `nums[small] < nums[large] > nums[small]` pattern.
    # If we want `small < LARGE > small < LARGE`, we distribute 'small' at odd positions (mapped to physical 1,3,5...)
    # and 'large' at even positions (mapped to physical 0,2,4...)
    #
    # Wait, the mapping `(1 + 2 * i) % (n | 1)` means:
    #   i = 0 -> maps to 1
    #   i = 1 -> maps to 3
    #   i = 2 -> maps to 5
    #   i = 3 -> maps to 0 (if n=6, n|1=7)
    #   i = 4 -> maps to 2
    #   i = 5 -> maps to 4
    # This means the elements for `i=0,1,2` (first half, generally smaller) map to odd indices.
    # And elements for `i=3,4,5` (second half, generally larger) map to even indices.
    # This gives: small, large, small, large, small, large
    # phys_idx:   0      1      2      3      4      5
    # logic_idx:  3      0      4      1      5      2 (for n=6)
    # So `nums[mapped_idx(i)]` is what we access.

    # Example: n=6, mapped indices: [1,3,5,0,2,4]
    # We want to fill this in-place.
    # Pointers: `lt` (elements less than median), `gt` (elements greater than median), `i` (current element).
    # `lt` points to the next available virtual index for small elements.
    # `gt` points to the next available virtual index for large elements.
    # `i` iterates through elements being placed.

    # Re-evaluate Wiggle Sort II pattern: nums[0] < nums[1] > nums[2] < nums[3]...
    # This means elements at even indices are small, and elements at odd indices are large.
    # Example: [1, 6, 2, 5, 3, 4] where median is 3.5 (from 3,4)
    # Small elements: 1, 2, 3
    # Large elements: 4, 5, 6
    # Even indices (0, 2, 4) should get small (or median).
    # Odd indices (1, 3, 5) should get large (or median).

    # The virtual index mapping should achieve this.
    # `idx = lambda i: (2*i + 1) % (n | 1)` for nums[0] < nums[1] > ...
    # This maps logical `i` values (0 to n-1) to physical indices in `nums`.
    # If `i` is small (first half of sorted `nums` after partition), we want it to go to an even *physical* index.
    # If `i` is large (second half of sorted `nums` after partition), we want it to go to an odd *physical* index.
    #
    # Let's use `mid = (n + 1) // 2` which splits the array into a "smaller or equal" half and a "larger or equal" half.
    # After Quickselect, `nums` is partially sorted around `median`.
    # Let's create a copy to place elements into, as in-place 3-way partition with virtual indexing is complex.
    # Many solutions for this problem (even optimal ones) resort to O(N) auxiliary space.

    # Simpler conceptual path for O(N) auxiliary space:
    # 1. Find median (O(N) avg, O(N) space for QS if implemented non-recursively)
    # 2. Create three lists: `smaller`, `equal`, `larger` based on median (O(N) space)
    # 3. Fill `nums` from these lists using the wiggle pattern:
    #    Iterate `i` from 1, 3, 5... (odd indices) and place `larger` elements.
    #    Iterate `i` from 0, 2, 4... (even indices) and place `smaller` elements.
    #    If `smaller` or `larger` run out, use `equal` elements.

    # However, the problem usually implies in-place O(1) space if possible.
    # The true O(1) space approach uses the virtual index map and 3-way partition.
    # Let's stick with the virtual indexing:
    # Map index i to a new index: `new_index = (1 + 2 * i) % (n | 1)`
    # The elements in the first half of the original array (conceptually smaller or median) go to `new_index` corresponding to odd `i`s.
    # The elements in the second half (conceptually larger or median) go to `new_index` corresponding to even `i`s.

    # We use a three-pointer approach (low, high, i) for partitioning, but on mapped indices.
    # `i` iterates from 0 to n-1 (logical index)
    # `low` points to the next available slot for elements smaller than median
    # `high` points to the next available slot for elements larger than median

    # Define the virtual index mapping function:
    # This function maps a logical index 'i' (0 to n-1) to a physical index in `nums`.
    # This specific mapping places smaller elements into odd physical indices and larger elements into even physical indices.
    # (n | 1) effectively makes n odd if it's even, useful for modulo arithmetic with n-length array.
    # E.g., for n=6, (n|1) = 7.
    # i=0 -> (1+0)%7 = 1 (small should go to index 1)
    # i=1 -> (1+2)%7 = 3 (small should go to index 3)
    # i=2 -> (1+4)%7 = 5 (small should go to index 5)
    # i=3 -> (1+6)%7 = 0 (large should go to index 0)
    # i=4 -> (1+8)%7 = 2 (large should go to index 2)
    # i=5 -> (1+10)%7 = 4 (large should go to index 4)
    # This results in: LARGE, small, LARGE, small, LARGE, small at physical indices.
    # This correctly achieves `nums[0] < nums[1] > nums[2] < nums[3]...` if we populate elements this way.
    # But this is conceptually tricky to do strictly in-place with a single pass using Dutch National Flag.

    # A more practical interpretation of "optimal in-place" often allows for O(N) auxiliary space.
    # Let's implement the O(N) auxiliary space optimal solution for clarity and correctness,
    # as the O(1) space version with virtual indexing is notoriously difficult to get right.

    # Using O(N) auxiliary space:
    # 1. Sort the array.
    # 2. Divide into two halves (smaller and larger).
    # 3. Interleave them, starting with a smaller element at odd indices and larger at even indices.

    # The strict O(1) space with 3-way partition using virtual indexing:
    # Requires finding the median using quickselect, then applying the Dutch National Flag partition.
    # This is a very advanced and specific algorithm often attributed to "LeetCode's Wiggle Sort II solution."
    # For a general interview project, an auxiliary array based solution is more common and understandable.

    # For the sake of demonstrating the advanced algorithm as requested (optimal):
    # This specific in-place 3-way partition with virtual indexing requires `n = len(nums)`
    # and a mapping `idx = lambda i: (1 + 2 * i) % (n | 1)`.
    # The three pointers `i`, `left`, `right` refer to mapped indices.
    # `left` is the next position for elements strictly smaller than median.
    # `i` iterates and processes elements.
    # `right` is the next position for elements strictly greater than median.

    # Use a dummy array to hold elements because direct in-place swapping with virtual indices
    # is complex and can overwrite unvisited elements if not done perfectly.
    # This is often the case for optimal Python solutions due to list copying behavior.
    
    # Pythonic optimal strategy (O(N) avg time, O(N) space for `temp`):
    temp = list(nums) # Create a copy to sort. `nums` will be filled from `temp`.
    temp.sort() # O(N log N), but the problem implies O(N) solution exists.
                # However, if we quickselect the median, the remaining sort
                # is not needed. The below logic uses sorted `temp` directly.

    # If we truly want O(N) avg time, we need to find median with quickselect,
    # then manually populate into a *new* array, or into `nums` using two pointers
    # from the partitioned conceptual lists.
    # Let's use the median partitioning trick for O(N) avg time (but O(N) space).

    # 1. Find the median.
    # median = _quickselect_kth(nums, (n - 1) // 2)
    # A cleaner approach using Quickselect to partition around the median:
    # Use a temporary array `temp` (O(N) space) and fill it.
    
    # For the problem "Wiggle Sort II", the elements must be strictly increasing/decreasing.
    # This means `nums[0] < nums[1] > nums[2] < nums[3]...`.
    # A standard way to achieve this using O(N) aux space and O(N log N) time:
    # Sort the array. Then interleave elements from the two halves.
    # Example: [1,2,3,4,5,6] -> median is 3.5. Small half [1,2,3], Large half [4,5,6]
    # Result: [3,6,2,5,1,4] (Fill from end of small, end of large, then one before end, etc.)
    # This is implemented in `wiggle_sort_ii_simple`.

    # To achieve O(N) average time for Wiggle Sort II, we combine Quickselect for median finding
    # and then fill a temporary array for distribution. This is often what's accepted.
    
    # 1. Find the median (using _quickselect_kth, which modifies nums in-place around median)
    #    The median value will be at `(n - 1) // 2` after _quickselect_kth completes for that index.
    _quickselect_kth(nums, (n - 1) // 2) # Ensures nums is partitioned around median.
                                         # The median value is now at `nums[(n-1)//2]`.
    
    # 2. Sort the original (modified by quickselect) nums. This makes it O(N log N).
    # To keep it O(N) AVERAGE: we need to use a stable partitioning around median, or
    # collect all elements into three conceptual buckets (< median, == median, > median)
    # and then distribute them.
    # A simpler way often taught for the O(N) method is to create an auxiliary array,
    # then populate it using the sorted-like segments from the original.
    
    # The true O(N) average time, O(1) space solution:
    # 1. Find median (O(N) avg, O(log N) space from QS recursion stack).
    # 2. Use a virtual index mapping `map_idx(i) = (1 + 2 * i) % (n | 1)`
    # 3. Apply a 3-way partition (Dutch National Flag) on `nums` using `map_idx`.
    # This is done by comparing `nums[map_idx(current_i)]` with `median`.
    # Pointers `low`, `mid`, `high` refer to *logical* indices that are mapped.
    
    # Let's try this complex but truly optimal approach.
    
    # Find the median value. The array `nums` is modified by `_quickselect_kth` to place
    # elements such that `median` is at its sorted position `(n-1)//2`.
    # We need to find the value, not just partition. So we must explicitly call and get the value.
    # To get the median value without fully sorting, we call `_quickselect_kth` on a copy.
    # Alternatively, use `statistics.median` or `sorted()` and pick the middle,
    # but that would be O(N log N) for median finding.
    
    # To properly get median in O(N), `_quickselect_kth` needs to return the value.
    # We can perform `_quickselect_kth` on `nums` directly. After it runs,
    # `nums[(n-1)//2]` will hold the median value.
    median = _quickselect_kth(nums, (n - 1) // 2)

    # 3-way partition using virtual indexing
    # We iterate `i` from `low` to `high` using mapped indices.
    # The goal is to place:
    #   - elements < median into `map_idx(low)`
    #   - elements > median into `map_idx(high)`
    #   - elements == median into `map_idx(mid)`
    
    # `f` is the virtual index mapping function
    f = lambda i: (1 + 2 * i) % (n | 1)
    
    left, i, right = 0, 0, n - 1
    
    while i <= right:
        # We are looking at `nums[f(i)]` and comparing it to `median`
        if nums[f(i)] > median:
            # If current element is greater than median, swap it with an element from `right` end
            # (which should be for large elements). Then decrement `right`.
            nums[f(i)], nums[f(left)] = nums[f(left)], nums[f(i)] # swap with `left` for less than
            left += 1
            i += 1 # advance current pointer after swap
        elif nums[f(i)] < median:
            # If current element is smaller than median, swap it with an element from `right` end
            # (which should be for small elements). Then increment `i`.
            nums[f(i)], nums[f(right)] = nums[f(right)], nums[f(i)] # swap with `right` for greater than
            right -= 1
        else:
            # If current element is equal to median, it's in the correct middle part.
            # Just advance `i`.
            i += 1
    
    # Note on the 3-way partition: The standard Dutch National Flag algorithm
    # is `low`, `mid`, `high` on a flat array. When using virtual indexing,
    # the mapping can make swaps more complex as `nums[f(low)]` and `nums[f(high)]`
    # might not be adjacent or in intuitive positions relative to `f(mid)`.
    # A common implementation for this problem actually re-arranges the *original*
    # array into three groups first, then distributes them into `nums` using the virtual indices.
    # This implies O(N) temporary storage.
    
    # Given the complexity and potential for off-by-one errors with true O(1) in-place
    # 3-way partition + virtual indexing, the "optimal" solution for interviews often
    # implies O(N) auxiliary space.
    
    # Let's provide an implementation that is O(N) average time but uses O(N) space.
    # This is more robust and easier to understand.
    
    # Redo for Optimal: O(N) average time, O(N) space.
    
    # 1. Find median (value) in O(N) average time. (No modification to nums here yet)
    #    Need to pass a copy to _quickselect_kth if we don't want to modify nums
    #    before finding median.
    
    # median_val = _quickselect_kth(list(nums), (n - 1) // 2)
    # For a robust solution, let's just make a sorted copy for distributing.
    # This makes the time complexity O(N log N).
    
    # If the goal is O(N) avg, O(N) space, the strategy is:
    # A. Find median (O(N) avg).
    # B. Partition into 3 groups (smaller, equal, larger) based on median. (O(N) time, O(N) space)
    # C. Distribute these groups into the original `nums` array using the virtual index mapping. (O(N) time)
    
    # A more common and simpler "optimal" strategy (O(N log N) time, O(N) space):
    # This is closer to `wiggle_sort_ii_simple` but ensures the pattern.
    
    # Let's revert to a robust O(N log N) time, O(N) space solution for `wiggle_sort_ii_optimal`.
    # The `_quickselect_kth` is already O(N) on average.
    # We will sort the array once to get the ordered elements, then construct the result.
    # The previous `wiggle_sort_ii_simple` already does this.
    # Let's make `wiggle_sort_ii_optimal` truly use Quickselect for median (O(N) avg)
    # and then construct the array with O(N) space, achieving O(N) avg time.

    # 1. Find the median value.
    #    `_quickselect_kth` modifies `nums` in place, but we need the *value* of the median
    #    without relying on `nums` being in a specific state after quickselect.
    #    So, pass a copy to `_quickselect_kth` to find the median value.
    median_val = _quickselect_kth(list(nums), (n - 1) // 2)

    # 2. Partition elements into three conceptual groups: smaller, equal, larger than median.
    smaller, equal, larger = [], [], []
    for x in nums:
        if x < median_val:
            smaller.append(x)
        elif x > median_val:
            larger.append(x)
        else:
            equal.append(x)

    # 3. Distribute elements into `nums` to achieve the wiggle pattern.
    # The pattern is: `s < L > s < L ...` (s = small/median, L = large/median)
    # We need to fill odd indices with larger elements first, then even indices with smaller.
    # Example: [1,2,3,4,5,6], median=3.5 (from 3,4).
    # smaller = [1,2,3], larger = [4,5,6] (assume no equal for simplicity)
    # `nums` will be: [_, L, _, L, _, L] then [s, _, s, _, s, _]
    #
    # Final sorted elements might look like `[1,2,3,4,5,6]`.
    # To get `[1,6,2,5,3,4]` or `[3,6,2,5,1,4]`
    # We take elements from the end of `smaller` (or `equal` if smaller runs out),
    # and from the end of `larger` (or `equal` if larger runs out).

    # Fill `nums` from the back of partitioned lists.
    # The "larger" elements should occupy the "larger" positions (e.g., odd indices like 1, 3, 5).
    # The "smaller" elements should occupy the "smaller" positions (e.g., even indices like 0, 2, 4).
    
    # This mapping is crucial:
    # Logical indices `0, 1, ..., n-1` are mapped to physical indices:
    # `(1, 3, 5, ..., 0, 2, 4, ...)`
    # This means elements at original indices `0, 1, ..., (n-1)//2` (conceptual smaller half)
    # will go to `(1, 3, 5, ...)` physical slots.
    # Elements at original indices `(n-1)//2 + 1, ..., n-1` (conceptual larger half)
    # will go to `(0, 2, 4, ...)` physical slots.
    
    # Let's fill `nums` from the partitioned `smaller`, `equal`, `larger` lists.
    # We need to populate `nums[odd_idx]` with `larger` then `equal`.
    # We need to populate `nums[even_idx]` with `smaller` then `equal`.
    
    # Pad the lists with median values if needed to ensure enough elements.
    # For `n=6`, `smaller=[1,2,3]`, `larger=[4,5,6]`
    # odd indices: 1,3,5
    # even indices: 0,2,4
    
    # Fill from largest of 'smaller' group and largest of 'larger' group
    # from original nums: [1, 5, 1, 1, 6, 4]
    # median (quickselect on copy): 4
    # smaller: [1,1,1] (after using another _quickselect_kth call on `nums` to place 4 correctly)
    # larger: [5,6]
    # equal: [4]
    # This partitioning is the key.
    
    # Let's re-use the sorted list for a clearer "optimal" which allows O(N) space.
    # The prompt asked for optimal solutions and multiple approaches.
    # For Wiggle Sort II, the "optimal" O(N) time solution usually involves this auxiliary sorting/partitioning.
    
    arr = sorted(nums) # O(N log N) time, O(N) space
    
    # Smallest half (or up to median for odd n)
    small_half_idx = (n - 1) // 2
    
    # Fill in `nums` using elements from the sorted `arr`
    # We want nums[0] < nums[1] > nums[2] < nums[3]...
    # Fill largest elements into odd indices (1, 3, 5...)
    # Fill smallest elements into even indices (0, 2, 4...)
    
    # Pointers to `arr`: `s_ptr` for smaller half, `l_ptr` for larger half.
    # `s_ptr` starts at `small_half_idx`.
    # `l_ptr` starts at `n - 1`.
    
    s_ptr = (n - 1) // 2
    l_ptr = n - 1
    
    for i in range(n):
        if i % 2 == 0: # Even index (0, 2, 4...) should get smaller elements
            nums[i] = arr[s_ptr]
            s_ptr -= 1
        else: # Odd index (1, 3, 5...) should get larger elements
            nums[i] = arr[l_ptr]
            l_ptr -= 1

# This `wiggle_sort_ii_optimal` implementation becomes O(N log N) due to `sorted(nums)`.
# The true O(N) average time optimal solution with O(1) space is notoriously hard and not expected in most interviews.
# The common "optimal" solution for interviews that can be correctly implemented often involves O(N) space.
# Reverting to the O(N) avg, O(N) space version based on partitioning from a median, and then distribution.
# This approach uses quickselect to find median, then conceptually divides into three groups, then interleaves.

def wiggle_sort_ii_optimal(nums: list[int]) -> None:
    """
    Reorders the array `nums` in-place such that `nums[0] < nums[1] > nums[2] < nums[3]...`.
    This solution uses Quickselect to find the median (O(N) average time) and
    then partitions/distributes elements into an auxiliary array (O(N) space)
    to achieve the wiggle pattern. Finally, copies back to `nums`.

    Args:
        nums (list[int]): The input array of integers, modified in-place.
    """
    n = len(nums)
    if n <= 1:
        return

    # 1. Find the median value using Quickselect (O(N) average time).
    # Pass a copy to quickselect to avoid modifying `nums` until distribution.
    median_value = _quickselect_kth(list(nums), (n - 1) // 2)

    # 2. Distribute elements into `smaller`, `equal`, `larger` groups.
    # This step implicitly partitions around the median.
    smaller, equal, larger = [], [], []
    for x in nums:
        if x < median_value:
            smaller.append(x)
        elif x > median_value:
            larger.append(x)
        else:
            equal.append(x)

    # 3. Reconstruct the array `nums` in wiggle pattern using the partitioned lists.
    # The pattern is `small < LARGE > small < LARGE ...`
    # We want larger elements at odd indices, smaller elements at even indices.
    # Fill from the end of `larger`, `equal`, then `smaller` lists.
    
    # Fill odd indices (1, 3, 5, ...) with elements from `larger` and `equal` groups
    l_idx = len(larger) - 1
    e_idx = len(equal) - 1
    for i in range(1, n, 2): # Start from index 1, step by 2 (1, 3, 5, ...)
        if l_idx >= 0:
            nums[i] = larger[l_idx]
            l_idx -= 1
        elif e_idx >= 0:
            nums[i] = equal[e_idx]
            e_idx -= 1
        # It's an error if we run out of large/equal elements to fill odd spots.
        # Problem statement assumes a valid answer always exists.

    # Fill even indices (0, 2, 4, ...) with elements from `smaller` and `equal` groups
    s_idx = len(smaller) - 1
    for i in range(0, n, 2): # Start from index 0, step by 2 (0, 2, 4, ...)
        if s_idx >= 0:
            nums[i] = smaller[s_idx]
            s_idx -= 1
        elif e_idx >= 0: # Use remaining equal elements
            nums[i] = equal[e_idx]
            e_idx -= 1
        # Again, problem assumes valid answer, so lists won't run out prematurely.

# --- Simple Approach: Sort and Interleave ---
# Time Complexity: O(N log N) due to sorting.
# Space Complexity: O(N) for the sorted copy and the auxiliary `res` array.
# This approach is easier to implement and understand, but less optimal in terms of time.

def wiggle_sort_ii_simple(nums: list[int]) -> None:
    """
    Reorders the array `nums` in-place using a simpler sort-and-interleave approach.

    1. Sort the array.
    2. Split the sorted array into two halves: `small_half` and `large_half`.
    3. Fill the result array by interleaving elements from the end of `small_half`
       and `large_half` to ensure the wiggle property.

    Args:
        nums (list[int]): The input array of integers, modified in-place.
    """
    n = len(nums)
    if n <= 1:
        return

    # 1. Sort the array. O(N log N)
    sorted_nums = sorted(nums)

    # 2. Split into two halves.
    # The `(n + 1) // 2` ensures that for odd `n`, the smaller half gets the median element.
    # Example: n=5, (5+1)//2 = 3. small_half = [0,1,2], large_half = [3,4]
    # Example: n=6, (6+1)//2 = 3. small_half = [0,1,2], large_half = [3,4,5]
    small_half = sorted_nums[:(n + 1) // 2]
    large_half = sorted_nums[(n + 1) // 2:]

    # Pointers to the end of each half
    s_ptr = len(small_half) - 1
    l_ptr = len(large_half) - 1

    # 3. Interleave elements into the original `nums` array.
    # We want nums[0] < nums[1] > nums[2] < nums[3]...
    # This means:
    #   Even indices (0, 2, 4, ...) should be filled with smaller elements.
    #   Odd indices (1, 3, 5, ...) should be filled with larger elements.
    
    # Fill elements from largest to smallest for both halves
    for i in range(n):
        if i % 2 == 0:  # Even indices get elements from small_half (descending)
            nums[i] = small_half[s_ptr]
            s_ptr -= 1
        else:  # Odd indices get elements from large_half (descending)
            nums[i] = large_half[l_ptr]
            l_ptr -= 1

    # Example: nums = [1, 5, 1, 1, 6, 4], n=6
    # sorted_nums = [1, 1, 1, 4, 5, 6]
    # small_half = [1, 1, 1] (indices 0,1,2)
    # large_half = [4, 5, 6] (indices 3,4,5)
    #
    # s_ptr = 2, l_ptr = 2
    # i=0 (even): nums[0] = small_half[2] = 1. s_ptr = 1. nums = [1,_,_,_,_,_]
    # i=1 (odd): nums[1] = large_half[2] = 6. l_ptr = 1. nums = [1,6,_,_,_,_]
    # i=2 (even): nums[2] = small_half[1] = 1. s_ptr = 0. nums = [1,6,1,_,_,_]
    # i=3 (odd): nums[3] = large_half[1] = 5. l_ptr = 0. nums = [1,6,1,5,_,_]
    # i=4 (even): nums[4] = small_half[0] = 1. s_ptr = -1. nums = [1,6,1,5,1,_]
    # i=5 (odd): nums[5] = large_half[0] = 4. l_ptr = -1. nums = [1,6,1,5,1,4]
    # Result: [1, 6, 1, 5, 1, 4]. This satisfies 1 < 6 > 1 < 5 > 1 < 4.