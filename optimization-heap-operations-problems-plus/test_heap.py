```python
import pytest
from heap_operations import heap_sort, find_kth_largest

def test_heap_sort():
    assert heap_sort([5, 2, 8, 1, 9, 4]) == [1, 2, 4, 5, 8, 9]
    assert heap_sort([]) == []
    assert heap_sort([1]) == [1]


def test_find_kth_largest():
    assert find_kth_largest([3,2,1,5,6,4], 2) == 5
    assert find_kth_largest([3,2,3,1,2,4,5,5,6], 4) == 4
    assert find_kth_largest([1],1) == 1

```