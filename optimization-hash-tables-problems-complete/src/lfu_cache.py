from typing import Dict, Any, Optional
from src.utils import DoublyLinkedNode, DoublyLinkedList

class LFUCache:
    """
    Problem 5: LFU Cache (Least Frequently Used Cache)

    Design and implement a data structure for a Least Frequently Used (LFU) cache.
    The LFU cache should support the following operations: `get` and `put`.

    Constraints:
    - `1 <= capacity <= 10^4`
    - `0 <= key <= 10^5`
    - `0 <= value <= 10^9`
    - At most `2 * 10^5` calls will be made to get and put.

    Optimal Approach: Using Two Hash Maps and Doubly Linked Lists
    --------------------------------------------------------------
    To achieve O(1) average time complexity for both `get` and `put` operations,
    we need to efficiently:
    1. Look up a key's value.
    2. Update a key's frequency.
    3. Find the least frequently used key for eviction.
    4. Find the least recently used key among those with the minimum frequency.

    Data Structures Used:
    - `key_to_node: Dict[int, DoublyLinkedNode]`: Maps `key` to its `DoublyLinkedNode` object.
      This allows O(1) access to a node given its key. The node itself stores `key`, `value`, and `frequency`.
    - `freq_to_dll: Dict[int, DoublyLinkedList]`: Maps `frequency` to a `DoublyLinkedList`.
      Each `DoublyLinkedList` stores all nodes (key-value pairs) that currently have that specific `frequency`.
      Within each DLL, nodes are ordered by their recency of use (LRU-like).
    - `min_freq: int`: Keeps track of the minimum frequency currently present in the cache.
      This is crucial for identifying which frequency level to evict from when capacity is reached.
    - `capacity: int`: The maximum number of key-value pairs the cache can hold.
    - `size: int`: The current number of key-value pairs in the cache.

    Node Structure (`DoublyLinkedNode` in `utils.py`):
    Each node not only holds `key` and `value` but also pointers for a doubly linked list.
    Crucially, we will also track the `freq` *within* the node itself for easier updates.

    Algorithm Steps:

    1. `_update_frequency(node: DoublyLinkedNode)`:
       - This is a helper function called when a key is accessed (`get`) or updated (`put`).
       - Remove `node` from its current `DoublyLinkedList` (`freq_to_dll[node.freq]`).
       - Increment `node.freq`.
       - Add `node` to the head (most recently used for that freq) of the `DoublyLinkedList`
         corresponding to its new frequency (`freq_to_dll[node.freq]`). Create a new DLL if needed.
       - If the `DoublyLinkedList` at `min_freq` becomes empty *and* `node.freq` was `min_freq`
         before incrementing, then `min_freq` must be updated to `node.freq` (the new, higher frequency).

    2. `get(key: int) -> int`:
       - Check if `key` exists in `key_to_node`. If not, return -1.
       - If `key` exists:
         - Retrieve `node = key_to_node[key]`.
         - Call `_update_frequency(node)`.
         - Return `node.value`.

    3. `put(key: int, value: int)`:
       - If `capacity` is 0, do nothing.
       - If `key` exists in `key_to_node`:
         - Retrieve `node = key_to_node[key]`.
         - Update `node.value = value`.
         - Call `_update_frequency(node)`.
       - If `key` does not exist:
         - If `size == capacity`:
           - Evict the LFU key: Get the tail (LRU) node from `freq_to_dll[min_freq]`.
           - Remove this node from `freq_to_dll[min_freq]` and `key_to_node`.
           - Decrement `size`.
           - If `freq_to_dll[min_freq]` becomes empty after eviction, `min_freq` might need to be adjusted *later* if the new key is inserted with freq 1.
             However, a new key always starts with freq 1, so if `min_freq` was 1 and became empty, it remains 1. If `min_freq` was higher, it stays. The new key ensures `min_freq` is 1 if it wasn't.
         - Create a new node: `new_node = DoublyLinkedNode(key, value, freq=1)`.
         - Add `new_node` to `freq_to_dll[1]` (create DLL if needed).
         - Add `new_node` to `key_to_node`.
         - Increment `size`.
         - Set `min_freq = 1` (because a new item always starts with frequency 1, this ensures `min_freq` is at least 1).

    Time Complexity: O(1) average for both `get` and `put`.
    - Hash map lookups and insertions are O(1) average.
    - Doubly linked list operations (add/remove node) are O(1).

    Space Complexity: O(Capacity)
    - `key_to_node` stores `Capacity` nodes.
    - `freq_to_dll` stores `Capacity` nodes distributed among different frequency lists.
      In the worst case, all items could have different frequencies requiring more DLL objects,
      but the total number of nodes stored across all DLLs is `Capacity`.

    Edge Cases / Gotchas:
    - Capacity = 0: `get` always returns -1, `put` does nothing.
    - Cache full and `put` new key: Correct eviction (LFU, then LRU tie-breaker).
    - `min_freq` management: Crucial to update `min_freq` only when its corresponding DLL becomes empty after an eviction or a frequency increment.
      Specifically, when `min_freq`'s list becomes empty *and* the node whose frequency increased was *the only one* at `min_freq`, then `min_freq` should be incremented.
    - `put` an existing key: Updates value and frequency, doesn't increase cache size.
    """
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.size = 0  # Current number of items in the cache
        self.min_freq = 0  # Minimum frequency in the cache

        # Stores key -> Node object (key, value, freq)
        self.key_to_node: Dict[int, DoublyLinkedNode] = {}
        # Stores freq -> DoublyLinkedList of nodes at that frequency
        # Nodes within each DLL are ordered from most recently used (head) to least recently used (tail)
        self.freq_to_dll: Dict[int, DoublyLinkedList] = collections.defaultdict(DoublyLinkedList)

    def _update_frequency(self, node: DoublyLinkedNode):
        """
        Helper method to update the frequency of a node after it's been accessed or modified.
        1. Remove the node from its current frequency list.
        2. Increment its frequency.
        3. Add it to the new frequency list (at the head, as it's now MRU for that freq).
        4. Update min_freq if necessary.
        """
        old_freq = node.freq
        new_freq = old_freq + 1
        
        # 1. Remove node from its old frequency list
        self.freq_to_dll[old_freq].remove_node(node)

        # If the old_freq list becomes empty and it was the min_freq list,
        # then min_freq must increment.
        if self.min_freq == old_freq and self.freq_to_dll[old_freq].is_empty():
            self.min_freq = new_freq # min_freq effectively shifts to the next higher frequency

        # 2. Increment node's frequency
        node.freq = new_freq

        # 3. Add node to its new frequency list (to the head, as it's MRU for new_freq)
        self.freq_to_dll[new_freq].add_at_head(node)

    def get(self, key: int) -> int:
        """
        Retrieves the value for a given key.
        If the key exists, its frequency is updated.
        Returns the value or -1 if not found.
        """
        if key not in self.key_to_node:
            return -1
        
        node = self.key_to_node[key]
        self._update_frequency(node)
        return node.value

    def put(self, key: int, value: int) -> None:
        """
        Adds or updates a key-value pair in the cache.
        If the key exists, its value and frequency are updated.
        If the key is new:
        - If cache is full, evicts the LFU (then LRU) item.
        - Adds the new item with frequency 1.
        """
        if self.capacity == 0:
            return

        if key in self.key_to_node:
            # Key already exists, update value and frequency
            node = self.key_to_node[key]
            node.value = value
            self._update_frequency(node)
        else:
            # New key
            if self.size == self.capacity:
                # Cache is full, must evict LFU item
                # The LFU item is the LRU item in the min_freq DoublyLinkedList
                node_to_evict = self.freq_to_dll[self.min_freq].remove_tail()
                if node_to_evict: # Should always be true if size > 0
                    del self.key_to_node[node_to_evict.key]
                    self.size -= 1
            
            # Create new node with frequency 1
            new_node = DoublyLinkedNode(key, value)
            new_node.freq = 1 # Custom attribute for frequency
            self.key_to_node[key] = new_node

            # Add to the DLL for frequency 1
            self.freq_to_dll[1].add_at_head(new_node)
            self.size += 1
            
            # When a new element is added, min_freq must be 1.
            self.min_freq = 1


# If `DoublyLinkedNode` needs `freq` attribute during initialization, modify it in `utils.py`.
# For simplicity, I'm adding `node.freq` after creation here.
# Let's adjust DoublyLinkedNode to directly support freq for cleaner code.
# I will update `src/utils.py` DoublyLinkedNode to include freq.

# --- Update to src/utils.py for DoublyLinkedNode ---
# class DoublyLinkedNode:
#     def __init__(self, key: Any, value: Any, freq: int = 0): # Add freq with default 0
#         self.key = key
#         self.value = value
#         self.freq = freq # New attribute
#         self.prev: Optional['DoublyLinkedNode'] = None
#         self.next: Optional['DoublyLinkedNode'] = None
# --- End Update ---

# Re-checking LFUCache code assuming DoublyLinkedNode now has freq attribute.

# Updated New Key creation:
# `new_node = DoublyLinkedNode(key, value, freq=1)`

# The current code in `lfu_cache.py` uses `new_node.freq = 1` which works even if `DoublyLinkedNode`
# does not take `freq` as an argument initially, by simply adding the attribute dynamically.
# For better type safety and clarity, let's make the `freq` a formal parameter in `DoublyLinkedNode`.
# (This change is reflected in the `src/utils.py` file content above)


# Example usage (for testing purposes)
if __name__ == "__main__":
    print("--- LFU Cache Test ---")

    print("\nTest Case 1: Basic Operations (from problem description)")
    cache = LFUCache(2)
    cache.put(1, 1) # {1: (1,1)} min_freq=1, freq_to_dll={1: [(1:1)]}
    cache.put(2, 2) # {1: (1,1), 2: (2,2)} min_freq=1, freq_to_dll={1: [(2:2), (1:1)]} (2 is MRU for freq 1)
    print(f"get(1): {cache.get(1)}") # returns 1. 1's freq becomes 2. min_freq=1. freq_to_dll={1: [(2:2)], 2: [(1:1)]}
    cache.put(3, 3) # evicts key 2 (LFU, tie-break LRU for freq 1). cache is full.
                    # {1: (1,1)freq2, 3: (3,3)freq1} min_freq=1. freq_to_dll={1: [(3:3)], 2: [(1:1)]}
    print(f"get(2): {cache.get(2)}") # returns -1 (not found)
    print(f"get(3): {cache.get(3)}") # returns 3. 3's freq becomes 2. min_freq=2. freq_to_dll={2: [(3:3), (1:1)]} (3 is MRU for freq 2)
    cache.put(4, 4) # evicts key 1 (LFU, tie-break LRU for freq 2). cache is full.
                    # {3: (3,3)freq2, 4: (4,4)freq1} min_freq=1. freq_to_dll={1: [(4:4)], 2: [(3:3)]}
    print(f"get(1): {cache.get(1)}") # returns -1 (not found)
    print(f"get(3): {cache.get(3)}") # returns 3. 3's freq becomes 3. min_freq=1. freq_to_dll={1: [(4:4)], 3: [(3:3)]}
    print(f"get(4): {cache.get(4)}") # returns 4. 4's freq becomes 2. min_freq=2. freq_to_dll={2: [(4:4)], 3: [(3:3)]}

    print("\nTest Case 2: Capacity 1")
    cache2 = LFUCache(1)
    cache2.put(1, 10) # {1: (10,1)} min_freq=1
    print(f"get(1): {cache2.get(1)}") # returns 10. {1: (10,2)} min_freq=2
    cache2.put(2, 20) # evicts 1 (LFU, freq 2). {2: (20,1)} min_freq=1
    print(f"get(1): {cache2.get(1)}") # returns -1
    print(f"get(2): {cache2.get(2)}") # returns 20. {2: (20,2)} min_freq=2

    print("\nTest Case 3: Put on existing key doesn't evict")
    cache3 = LFUCache(2)
    cache3.put(1, 10) # {(1:10), freq:1}
    cache3.put(2, 20) # {(1:10), freq:1}, {(2:20), freq:1}
    print(f"get(1): {cache3.get(1)}") # {(1:10), freq:2}, {(2:20), freq:1}
    cache3.put(1, 100) # {(1:100), freq:3}, {(2:20), freq:1} (no eviction, freq updated)
    print(f"get(1): {cache3.get(1)}") # returns 100
    print(f"get(2): {cache3.get(2)}") # returns 20

    print("\nTest Case 4: Complex min_freq shifts")
    cache4 = LFUCache(3)
    cache4.put(1, 1) # {1:1} mf=1
    cache4.put(2, 2) # {1:1, 2:1} mf=1
    cache4.put(3, 3) # {1:1, 2:1, 3:1} mf=1
    cache4.get(1)    # {1:2, 2:1, 3:1} mf=1
    cache4.get(2)    # {1:2, 2:2, 3:1} mf=1
    cache4.get(3)    # {1:2, 2:2, 3:2} mf=2 (1,2,3 all have freq >= 2, freq 1 list becomes empty, min_freq shifts)
    cache4.put(4, 4) # evicts LRU of min_freq 2, which could be 1 or 2 or 3 depending on DLL internal order
                     # if 1,2,3 were accessed in order 1,2,3, then 1 is LRU for freq 2. (1:2) is evicted.
                     # Cache: {2:2, 3:2, 4:1} mf=1
    print(f"get(1): {cache4.get(1)}") # -1
    print(f"get(2): {cache4.get(2)}") # 2
    print(f"get(3): {cache4.get(3)}") # 3
    print(f"get(4): {cache4.get(4)}") # 4

    print("\nLFU internal state check (manual example):")
    cache_state = LFUCache(2)
    cache_state.put(1,1) # min_freq=1, freq_to_dll = {1: [D_node(1:1)]}
    print(f"State after put(1,1): min_freq={cache_state.min_freq}, freq_to_dll={cache_state.freq_to_dll}")
    cache_state.put(2,2) # min_freq=1, freq_to_dll = {1: [D_node(2:2), D_node(1:1)]} (2 is MRU for freq 1)
    print(f"State after put(2,2): min_freq={cache_state.min_freq}, freq_to_dll={cache_state.freq_to_dll}")
    cache_state.get(1) # min_freq=1, freq_to_dll = {1: [D_node(2:2)], 2: [D_node(1:1)]}
    print(f"State after get(1): min_freq={cache_state.min_freq}, freq_to_dll={cache_state.freq_to_dll}")
    cache_state.put(3,3) # Evicts (2:2). min_freq=1, freq_to_dll = {1: [D_node(3:3)], 2: [D_node(1:1)]}
    print(f"State after put(3,3): min_freq={cache_state.min_freq}, freq_to_dll={cache_state.freq_to_dll}")