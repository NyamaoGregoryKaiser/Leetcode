import pytest
from algorithms.problem_4_design_hashmap import MyHashMap
from utils.custom_hash_map import CustomHashMap # For internal testing of CustomHashMap if needed

# Test CustomHashMap directly first, as MyHashMap is a wrapper
@pytest.fixture
def custom_map():
    return CustomHashMap(initial_capacity=4, load_factor_threshold=0.75)

def test_custom_map_put_get(custom_map):
    custom_map.put(1, 10)
    assert custom_map.get(1) == 10
    custom_map.put(2, 20)
    assert custom_map.get(2) == 20
    custom_map[3] = 30 # __setitem__
    assert custom_map[3] == 30 # __getitem__

def test_custom_map_update(custom_map):
    custom_map.put(1, 10)
    custom_map.put(1, 15)
    assert custom_map.get(1) == 15
    custom_map[1] = 20
    assert custom_map[1] == 20

def test_custom_map_remove(custom_map):
    custom_map.put(1, 10)
    custom_map.put(2, 20)
    custom_map.remove(1)
    with pytest.raises(KeyError):
        custom_map.get(1)
    assert custom_map.get(2) == 20
    del custom_map[2] # __delitem__
    with pytest.raises(KeyError):
        custom_map.get(2)

def test_custom_map_remove_non_existent(custom_map):
    custom_map.put(1, 10)
    with pytest.raises(KeyError):
        custom_map.remove(99)
    with pytest.raises(KeyError):
        del custom_map[99]

def test_custom_map_get_non_existent(custom_map):
    with pytest.raises(KeyError):
        custom_map.get(99)

def test_custom_map_contains(custom_map):
    custom_map.put(1, 10)
    assert custom_map.contains(1) is True
    assert custom_map.contains(99) is False

def test_custom_map_size(custom_map):
    assert custom_map.size() == 0
    assert len(custom_map) == 0
    custom_map.put(1, 10)
    assert custom_map.size() == 1
    assert len(custom_map) == 1
    custom_map.put(2, 20)
    assert custom_map.size() == 2
    assert len(custom_map) == 2
    custom_map.remove(1)
    assert custom_map.size() == 1
    assert len(custom_map) == 1
    custom_map.put(2, 25) # Update, size should not change
    assert custom_map.size() == 1

def test_custom_map_resize(custom_map):
    assert custom_map._capacity == 4
    custom_map.put(0, 0)
    custom_map.put(1, 1)
    custom_map.put(2, 2)
    # Size 3, capacity 4. Load factor 0.75. Next put should trigger resize.
    assert custom_map._size == 3
    custom_map.put(3, 3) # This should trigger resize
    assert custom_map._capacity == 8
    assert custom_map._size == 4
    assert custom_map.get(0) == 0 # Ensure elements are rehashed correctly
    assert custom_map.get(3) == 3

    # Add enough elements to trigger another resize
    for i in range(4, 8):
        custom_map.put(i, i)
    assert custom_map._capacity == 8 # Still 8, size 8. Load factor 1.0.
    custom_map.put(8,8) # Should trigger resize
    assert custom_map._capacity == 16
    assert custom_map._size == 9
    assert custom_map.get(8) == 8


# --- MyHashMap (wrapper) tests ---
@pytest.fixture
def my_hash_map():
    return MyHashMap()

def test_my_hash_map_put_get(my_hash_map):
    my_hash_map.put(1, 1)
    my_hash_map.put(2, 2)
    assert my_hash_map.get(1) == 1
    assert my_hash_map.get(2) == 2
    assert my_hash_map.get(3) == -1 # Non-existent key

def test_my_hash_map_update(my_hash_map):
    my_hash_map.put(1, 1)
    my_hash_map.put(1, 10)
    assert my_hash_map.get(1) == 10

def test_my_hash_map_remove(my_hash_map):
    my_hash_map.put(1, 1)
    my_hash_map.put(2, 2)
    my_hash_map.remove(1)
    assert my_hash_map.get(1) == -1
    assert my_hash_map.get(2) == 2

def test_my_hash_map_remove_non_existent(my_hash_map):
    my_hash_map.put(1, 1)
    my_hash_map.remove(99) # Should not raise error, just do nothing
    assert my_hash_map.get(1) == 1 # Existing key still there

def test_my_hash_map_size_and_len(my_hash_map):
    assert len(my_hash_map) == 0
    my_hash_map.put(1, 1)
    assert len(my_hash_map) == 1
    my_hash_map.put(2, 2)
    assert len(my_hash_map) == 2
    my_hash_map.remove(1)
    assert len(my_hash_map) == 1
    my_hash_map.put(2, 20) # Update, size should not change
    assert len(my_hash_map) == 1

def test_my_hash_map_zero_key_value(my_hash_map):
    my_hash_map.put(0, 0)
    assert my_hash_map.get(0) == 0
    my_hash_map.remove(0)
    assert my_hash_map.get(0) == -1

def test_my_hash_map_large_number_of_operations(my_hash_map):
    num_ops = 1000
    for i in range(num_ops):
        my_hash_map.put(i, i * 2)
    
    assert len(my_hash_map) == num_ops
    for i in range(num_ops):
        assert my_hash_map.get(i) == i * 2
    
    for i in range(num_ops // 2):
        my_hash_map.remove(i)
    
    assert len(my_hash_map) == num_ops // 2
    for i in range(num_ops // 2):
        assert my_hash_map.get(i) == -1
    for i in range(num_ops // 2, num_ops):
        assert my_hash_map.get(i) == i * 2