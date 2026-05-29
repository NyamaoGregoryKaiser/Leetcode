"""
CustomHashMap Implementation

This file provides a basic implementation of a hash map (dictionary) from scratch.
It uses chaining for collision resolution and dynamic resizing.

Key concepts demonstrated:
- Hashing function: Converts a key into an index for the underlying array.
- Buckets: An array (list in Python) where each element can hold multiple key-value pairs
           (often implemented as a linked list, but here we use Python's list of tuples).
- Collision Resolution: Chaining (multiple items hashing to the same index are stored
                        in a list at that index).
- Load Factor: The ratio of the number of items to the number of buckets.
- Resizing: When the load factor exceeds a threshold, the hash map's underlying array
            is expanded, and all items are rehashed and redistributed.
"""

class CustomHashMap:
    """
    A simplified custom hash map implementation using chaining for collision resolution.
    Supports basic dictionary-like operations: put (set item), get, remove, contains, size.
    """

    DEFAULT_INITIAL_CAPACITY = 16  # Must be a power of 2 for bitwise hash optimization
    DEFAULT_LOAD_FACTOR_THRESHOLD = 0.75

    def __init__(self, initial_capacity: int = DEFAULT_INITIAL_CAPACITY,
                 load_factor_threshold: float = DEFAULT_LOAD_FACTOR_THRESHOLD):
        if not (initial_capacity > 0 and (initial_capacity & (initial_capacity - 1) == 0)):
            raise ValueError("Initial capacity must be a positive power of 2.")
        if not (0 < load_factor_threshold <= 1.0):
            raise ValueError("Load factor threshold must be between 0 and 1 (inclusive).")

        self._capacity = initial_capacity
        # Using a list of lists/tuples for buckets (chaining)
        # Each bucket (self._buckets[index]) will be a list of (key, value) tuples.
        self._buckets: list[list[tuple]] = [[] for _ in range(self._capacity)]
        self._size = 0  # Number of key-value pairs currently in the map
        self._load_factor_threshold = load_factor_threshold

    def _hash(self, key) -> int:
        """
        Computes the hash value for a given key and maps it to an index within the
        current capacity. Uses Python's built-in `hash()` function.

        For optimal performance, the capacity should be a power of 2,
        allowing for a simple bitwise AND operation to get the index.
        """
        # Python's hash() returns an integer.
        # We then use bitwise AND with (capacity - 1) to ensure the index is within [0, capacity - 1].
        # This works efficiently when capacity is a power of 2.
        return hash(key) & (self._capacity - 1)

    def _resize(self):
        """
        Resizes the hash map when the load factor exceeds the threshold.
        Doubles the capacity and rehashes all existing key-value pairs into the new buckets.
        """
        old_buckets = self._buckets
        old_capacity = self._capacity

        self._capacity *= 2  # Double the capacity
        self._buckets = [[] for _ in range(self._capacity)]
        self._size = 0 # Reset size, it will be re-counted during rehash

        # Rehash all existing key-value pairs into the new, larger buckets
        for bucket in old_buckets:
            for key, value in bucket:
                self.put(key, value) # Use put method, which will re-hash and insert

        # print(f"Resized from {old_capacity} to {self._capacity}. New size: {self._size}")

    def put(self, key, value):
        """
        Inserts or updates a key-value pair in the hash map.
        Handles collision by chaining. Checks for resizing.
        """
        # Check if resizing is needed BEFORE adding the new element,
        # to ensure the load factor doesn't exceed the threshold *after* insertion.
        # Or, check after insertion, and then potentially resize and re-insert.
        # Checking before insertion is safer to maintain the load factor.
        if (self._size + 1) / self._capacity >= self._load_factor_threshold:
            self._resize()

        index = self._hash(key)
        bucket = self._buckets[index]

        # Check if the key already exists in the bucket (for updates)
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value) # Update existing value
                return

        # Key not found, add new key-value pair
        bucket.append((key, value))
        self._size += 1

    def get(self, key):
        """
        Retrieves the value associated with the given key.
        Returns the value if found, otherwise raises KeyError.
        """
        index = self._hash(key)
        bucket = self._buckets[index]

        for k, v in bucket:
            if k == key:
                return v
        raise KeyError(f"Key '{key}' not found in HashMap.")

    def remove(self, key):
        """
        Removes the key-value pair associated with the given key.
        Raises KeyError if the key is not found.
        """
        index = self._hash(key)
        bucket = self._buckets[index]

        for i, (k, v) in enumerate(bucket):
            if k == key:
                del bucket[i]
                self._size -= 1
                return
        raise KeyError(f"Key '{key}' not found in HashMap.")

    def contains(self, key) -> bool:
        """
        Checks if the hash map contains the given key.
        """
        index = self._hash(key)
        bucket = self._buckets[index]
        for k, _ in bucket:
            if k == key:
                return True
        return False

    def size(self) -> int:
        """
        Returns the number of key-value pairs in the hash map.
        """
        return self._size

    def __len__(self) -> int:
        """Allows use of len(hashmap)."""
        return self._size

    def __getitem__(self, key):
        """Allows dictionary-like access: hashmap[key]."""
        return self.get(key)

    def __setitem__(self, key, value):
        """Allows dictionary-like assignment: hashmap[key] = value."""
        self.put(key, value)

    def __delitem__(self, key):
        """Allows dictionary-like deletion: del hashmap[key]."""
        self.remove(key)

    def __str__(self) -> str:
        """String representation of the hash map."""
        items = []
        for i, bucket in enumerate(self._buckets):
            if bucket:
                items.append(f"Bucket {i}: {bucket}")
        if not items:
            return f"CustomHashMap(size=0, capacity={self._capacity})"
        return "{\n  " + ",\n  ".join(items) + "\n}"

    def __repr__(self) -> str:
        """Official string representation for developers."""
        return self.__str__()

# Example Usage:
if __name__ == "__main__":
    print("--- Testing CustomHashMap ---")

    # Test 1: Basic operations
    my_map = CustomHashMap(initial_capacity=4, load_factor_threshold=0.75)
    print(f"Initial map (capacity {my_map._capacity}): {my_map}")

    my_map.put("apple", 10)
    my_map.put("banana", 20)
    my_map["cherry"] = 30 # Using __setitem__
    print(f"After adding 3 items (size {len(my_map)}, capacity {my_map._capacity}): {my_map}")
    # Capacity should still be 4. Load factor is 3/4 = 0.75.
    # Next put will trigger resize.

    print(f"Value of 'apple': {my_map.get('apple')}")
    print(f"Value of 'cherry': {my_map['cherry']}") # Using __getitem__

    # Test 2: Resizing
    my_map.put("date", 40) # This should trigger a resize
    print(f"After adding 'date' (size {len(my_map)}, capacity {my_map._capacity}): {my_map}")
    # Capacity should now be 8. Load factor 4/8 = 0.5.

    my_map.put("elderberry", 50)
    my_map.put("fig", 60)
    my_map.put("grape", 70)
    my_map.put("honeydew", 80)
    print(f"After adding more items (size {len(my_map)}, capacity {my_map._capacity}): {my_map}")
    # Size 8, capacity 8. Load factor 8/8 = 1.0. Next put should resize to 16.

    # Test 3: Updates
    my_map.put("apple", 100) # Update existing key
    my_map["banana"] = 200
    print(f"After updating 'apple' and 'banana' (size {len(my_map)}, capacity {my_map._capacity}): {my_map}")
    print(f"New value of 'apple': {my_map.get('apple')}")

    # Test 4: Contains
    print(f"Contains 'cherry': {my_map.contains('cherry')}")
    print(f"Contains 'kiwi': {my_map.contains('kiwi')}")

    # Test 5: Remove
    print("--- Testing Remove ---")
    my_map.remove("cherry")
    print(f"After removing 'cherry' (size {len(my_map)}, capacity {my_map._capacity}): {my_map}")
    print(f"Contains 'cherry' after removal: {my_map.contains('cherry')}")
    try:
        my_map.get("cherry")
    except KeyError as e:
        print(f"Tried to get 'cherry': {e}")

    del my_map["date"] # Using __delitem__
    print(f"After deleting 'date' (size {len(my_map)}, capacity {my_map._capacity}): {my_map}")
    
    # Test 6: Removing non-existent key
    try:
        my_map.remove("kiwi")
    except KeyError as e:
        print(f"Tried to remove 'kiwi': {e}")

    # Test 7: Getting non-existent key
    try:
        my_map.get("mango")
    except KeyError as e:
        print(f"Tried to get 'mango': {e}")

    # Test 8: Empty map
    empty_map = CustomHashMap()
    print(f"\nEmpty map (size {len(empty_map)}, capacity {empty_map._capacity}): {empty_map}")
    empty_map.put("single", 1)
    print(f"After adding single item: {empty_map}")
    del empty_map["single"]
    print(f"After deleting single item: {empty_map}")