"""
Problem 4: Design HashMap

Design a HashMap without using any built-in hash table libraries.

Your HashMap should support the following operations:
- `put(key, value)`: Inserts a (key, value) pair into the HashMap. If the key already exists,
  the original value will be updated.
- `get(key)`: Returns the value to which the specified key is mapped, or -1 if this map
  contains no mapping for the key. (Note: For this problem, we'll follow our custom_hash_map
  behavior of raising KeyError, which is more Pythonic. Interviewers might ask for -1).
- `remove(key)`: Removes the mapping for the specified key if this map contains the mapping.

Constraints:
- All keys and values will be in the range [0, 1,000,000].
- The number of operations will be in the range [1, 10,000].
- Please do not use the built-in HashMap library.
"""

# We will leverage the CustomHashMap implementation from `utils`.
# This file will act as the "solution" demonstrating how to use it,
# potentially adapting its interface if needed for specific problem constraints (e.g., returning -1).

from utils.custom_hash_map import CustomHashMap

class MyHashMap:
    """
    Implements a HashMap using the CustomHashMap utility.
    Adapts the interface to potentially match typical LeetCode problem constraints
    like returning -1 for a non-existent key instead of raising KeyError.
    """

    def __init__(self):
        """
        Initializes the HashMap with a default capacity and load factor.
        """
        self._map = CustomHashMap() # Use our custom implementation

    def put(self, key: int, value: int) -> None:
        """
        Inserts a (key, value) pair into the HashMap. If the key already exists,
        the original value will be updated.
        """
        self._map.put(key, value)

    def get(self, key: int) -> int:
        """
        Returns the value to which the specified key is mapped, or -1 if this map
        contains no mapping for the key.
        """
        try:
            return self._map.get(key)
        except KeyError:
            return -1

    def remove(self, key: int) -> None:
        """
        Removes the mapping for the specified key if this map contains the mapping.
        """
        try:
            self._map.remove(key)
        except KeyError:
            # If key doesn't exist, remove() typically does nothing,
            # so we just catch the KeyError and proceed.
            pass
    
    def __str__(self) -> str:
        return str(self._map)

    def __len__(self) -> int:
        return len(self._map)

# Time and Space Complexity Analysis for MyHashMap using CustomHashMap:
# (These complexities are averages, assuming a good hash function and proper resizing.)

# put(key, value):
#   - Time Complexity: O(1) on average. In the worst case (many collisions or resize), O(N),
#     where N is the number of elements in the map. Resizing involves rehashing all elements.
#   - Space Complexity: O(1) for adding one element. If a resize happens, it might temporarily
#     require O(N) space for the new buckets.

# get(key):
#   - Time Complexity: O(1) on average. In the worst case (many collisions leading to a long chain), O(N).
#   - Space Complexity: O(1)

# remove(key):
#   - Time Complexity: O(1) on average. In the worst case (many collisions leading to a long chain), O(N).
#   - Space Complexity: O(1)

# Overall Space Complexity of MyHashMap: O(N), where N is the number of elements stored.
# This is due to storing key-value pairs across all buckets.

# Example Usage:
if __name__ == "__main__":
    print("--- Testing MyHashMap (using CustomHashMap) ---")

    # Initialize your hash map
    my_hash_map = MyHashMap()
    print(f"Initial map (empty): {my_hash_map}")

    # Test put and get
    my_hash_map.put(1, 10)
    my_hash_map.put(2, 20)
    print(f"Map after put(1,10) and put(2,20): {my_hash_map}")
    print(f"Get(1): {my_hash_map.get(1)}") # Expected: 10
    print(f"Get(2): {my_hash_map.get(2)}") # Expected: 20
    print(f"Get(3): {my_hash_map.get(3)}") # Expected: -1 (key not found)

    # Test update
    my_hash_map.put(2, 25)
    print(f"Map after put(2,25) (update): {my_hash_map}")
    print(f"Get(2): {my_hash_map.get(2)}") # Expected: 25

    # Test remove
    my_hash_map.remove(2)
    print(f"Map after remove(2): {my_hash_map}")
    print(f"Get(2): {my_hash_map.get(2)}") # Expected: -1 (key removed)
    print(f"Get(1): {my_hash_map.get(1)}") # Expected: 10 (still exists)

    # Test remove non-existent key
    my_hash_map.remove(3) # Should do nothing, no error
    print(f"Map after remove(3) (non-existent): {my_hash_map}")

    # Test with more elements and potential resizing
    for i in range(10, 20):
        my_hash_map.put(i, i * 10)
    print(f"\nMap after adding more elements (size {len(my_hash_map)}): {my_hash_map}")
    print(f"Get(15): {my_hash_map.get(15)}") # Expected: 150
    print(f"Get(9): {my_hash_map.get(9)}")   # Expected: -1
    my_hash_map.remove(15)
    print(f"Get(15) after removal: {my_hash_map.get(15)}") # Expected: -1
    print(f"Current map size: {len(my_hash_map)}")
    print(f"Underlying custom map capacity: {my_hash_map._map._capacity}")

    # Test edge cases:
    my_hash_map_edge = MyHashMap()
    print("\n--- Testing Edge Cases ---")
    my_hash_map_edge.put(0, 0)
    print(f"Map with key 0: {my_hash_map_edge}")
    print(f"Get(0): {my_hash_map_edge.get(0)}")
    my_hash_map_edge.remove(0)
    print(f"Map after removing key 0: {my_hash_map_edge}")
    print(f"Get(0): {my_hash_map_edge.get(0)}")