import unittest
from src.lfu_cache import LFUCache
from src.utils import DoublyLinkedNode, DoublyLinkedList

class TestLFUCache(unittest.TestCase):

    def test_lfu_example_case(self):
        cache = LFUCache(2)
        cache.put(1, 1)
        cache.put(2, 2)
        self.assertEqual(cache.get(1), 1)  # returns 1
        cache.put(3, 3)                   # evicts key 2
        self.assertEqual(cache.get(2), -1) # returns -1 (not found)
        self.assertEqual(cache.get(3), 3)  # returns 3
        cache.put(4, 4)                   # evicts key 1
        self.assertEqual(cache.get(1), -1) # returns -1 (not found)
        self.assertEqual(cache.get(3), 3)  # returns 3
        self.assertEqual(cache.get(4), 4)  # returns 4

    def test_lfu_capacity_zero(self):
        cache = LFUCache(0)
        cache.put(1, 1)
        self.assertEqual(cache.get(1), -1)

    def test_lfu_capacity_one_single_item(self):
        cache = LFUCache(1)
        cache.put(1, 10)
        self.assertEqual(cache.get(1), 10)
        cache.put(2, 20) # evicts 1
        self.assertEqual(cache.get(1), -1)
        self.assertEqual(cache.get(2), 20)

    def test_lfu_put_existing_key(self):
        cache = LFUCache(2)
        cache.put(1, 1)
        cache.put(2, 2)
        self.assertEqual(cache.get(1), 1) # freq 1 becomes 2
        cache.put(1, 10) # update value, freq 1 becomes 3
        self.assertEqual(cache.get(1), 10)
        self.assertEqual(cache.get(2), 2) # freq 2 becomes 2

    def test_lfu_min_freq_progression(self):
        cache = LFUCache(3)
        cache.put(1, 1) # {1:1} min_freq=1
        cache.put(2, 2) # {1:1, 2:1} min_freq=1
        cache.put(3, 3) # {1:1, 2:1, 3:1} min_freq=1
        
        self.assertEqual(cache.get(1), 1) # {1:2, 2:1, 3:1} min_freq=1
        self.assertEqual(cache.get(2), 2) # {1:2, 2:2, 3:1} min_freq=1
        self.assertEqual(cache.get(3), 3) # {1:2, 2:2, 3:2} min_freq=2 (freq 1 list becomes empty)
        
        cache.put(4, 4) # evicts from freq 2. (1,2,3 all have freq 2). LRU among freq 2 is 1 (accessed first).
                        # Expect 1 to be evicted.
        self.assertEqual(cache.get(1), -1)
        self.assertEqual(cache.get(2), 2)
        self.assertEqual(cache.get(3), 3)
        self.assertEqual(cache.get(4), 4) # new item, freq 1. min_freq=1
        
        # Now cache has {2:2, 3:2, 4:1}
        # get(2) makes freq 2->3
        self.assertEqual(cache.get(2), 2) # {2:3, 3:2, 4:1} min_freq=1
        cache.put(5,5) # evicts 4 (freq 1). {2:3, 3:2, 5:1} min_freq=1
        self.assertEqual(cache.get(4), -1)
        self.assertEqual(cache.get(5), 5)

    def test_lfu_only_one_item_in_min_freq_list_eviction(self):
        cache = LFUCache(2)
        cache.put(1,1) # min_freq = 1, freq_to_dll = {1: [1]}
        cache.put(2,2) # min_freq = 1, freq_to_dll = {1: [2, 1]}
        cache.get(1)   # min_freq = 1, freq_to_dll = {1: [2], 2: [1]}
        cache.get(2)   # min_freq = 2, freq_to_dll = {2: [2, 1]} (freq 1 list is empty)
        cache.put(3,3) # evicts LRU from freq 2, which is 1.
                       # min_freq = 1, freq_to_dll = {1: [3], 2: [2]}
        self.assertEqual(cache.get(1), -1)
        self.assertEqual(cache.get(2), 2)
        self.assertEqual(cache.get(3), 3)

    def test_lfu_extensive_access_pattern(self):
        cache = LFUCache(3)
        cache.put(1,1) # {1:1}
        cache.put(2,2) # {1:1, 2:1}
        cache.put(3,3) # {1:1, 2:1, 3:1}
        
        self.assertEqual(cache.get(1),1) # {1:2, 2:1, 3:1}
        self.assertEqual(cache.get(2),2) # {1:2, 2:2, 3:1}
        self.assertEqual(cache.get(1),1) # {1:3, 2:2, 3:1}
        
        cache.put(4,4) # evicts 3 (freq 1, only one).
                       # {1:3, 2:2, 4:1}
        self.assertEqual(cache.get(3),-1)
        
        self.assertEqual(cache.get(2),2) # {1:3, 2:3, 4:1}
        cache.put(5,5) # evicts 4 (freq 1, only one).
                       # {1:3, 2:3, 5:1}
        self.assertEqual(cache.get(4),-1)
        
        self.assertEqual(cache.get(1),1) # {1:4, 2:3, 5:1}
        self.assertEqual(cache.get(2),2) # {1:4, 2:4, 5:1}
        self.assertEqual(cache.get(5),5) # {1:4, 2:4, 5:2}
        
        cache.put(6,6) # evicts LRU of min_freq 2 (which is 5).
                       # {1:4, 2:4, 6:1}
        self.assertEqual(cache.get(5),-1)
        self.assertEqual(cache.get(6),6)

    def test_lfu_all_items_same_freq_then evict_lru(self):
        cache = LFUCache(3)
        cache.put(1,1) # {1:1}
        cache.put(2,2) # {1:1, 2:1}
        cache.put(3,3) # {1:1, 2:1, 3:1}
        
        # All items are freq 1. The order they were added is 1, 2, 3.
        # So 1 is LRU, 3 is MRU in freq 1 DLL.
        cache.put(4,4) # Evicts 1
        self.assertEqual(cache.get(1), -1)
        self.assertEqual(cache.get(2), 2)
        self.assertEqual(cache.get(3), 3)
        self.assertEqual(cache.get(4), 4)
        
        # Now {2:1, 3:1, 4:1}. LRU is 2.
        cache.put(5,5) # Evicts 2
        self.assertEqual(cache.get(2), -1)
        self.assertEqual(cache.get(3), 3)
        self.assertEqual(cache.get(4), 4)
        self.assertEqual(cache.get(5), 5)


class TestDoublyLinkedList(unittest.TestCase):
    def test_dll_add_remove(self):
        dll = DoublyLinkedList()
        self.assertTrue(dll.is_empty())
        self.assertEqual(len(dll), 0)

        node1 = DoublyLinkedNode(1, "A", 1)
        dll.add_at_head(node1)
        self.assertFalse(dll.is_empty())
        self.assertEqual(len(dll), 1)
        self.assertEqual(dll.get_head().key, 1)
        self.assertEqual(dll.get_tail().key, 1)

        node2 = DoublyLinkedNode(2, "B", 1)
        dll.add_at_tail(node2)
        self.assertEqual(len(dll), 2)
        self.assertEqual(dll.get_head().key, 1)
        self.assertEqual(dll.get_tail().key, 2)
        
        node3 = DoublyLinkedNode(3, "C", 1)
        dll.add_at_head(node3)
        self.assertEqual(len(dll), 3)
        self.assertEqual(dll.get_head().key, 3)
        self.assertEqual(dll.get_tail().key, 2)

        removed_head = dll.remove_head()
        self.assertEqual(removed_head.key, 3)
        self.assertEqual(len(dll), 2)
        self.assertEqual(dll.get_head().key, 1)

        removed_tail = dll.remove_tail()
        self.assertEqual(removed_tail.key, 2)
        self.assertEqual(len(dll), 1)
        self.assertEqual(dll.get_tail().key, 1)

        dll.remove_node(node1)
        self.assertTrue(dll.is_empty())
        self.assertEqual(len(dll), 0)
        self.assertIsNone(dll.get_head())
        self.assertIsNone(dll.get_tail())
    
    def test_dll_remove_from_empty(self):
        dll = DoublyLinkedList()
        self.assertIsNone(dll.remove_head())
        self.assertIsNone(dll.remove_tail())
        node = DoublyLinkedNode(1, "A", 1)
        dll.remove_node(node) # Should not error
        self.assertEqual(len(dll), 0)

if __name__ == '__main__':
    unittest.main()