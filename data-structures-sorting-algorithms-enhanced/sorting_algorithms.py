```python
import random
import heapq

def merge_sort(arr):
    """Sorts an array using merge sort."""
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    """Merges two sorted arrays."""
    merged = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1
    merged.extend(left[i:])
    merged.extend(right[j:])
    return merged

def quick_sort(arr):
    """Sorts an array using quick sort."""
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)


def heap_sort(arr):
    """Sorts an array using heap sort."""
    heapq.heapify(arr)
    return [heapq.heappop(arr) for _ in range(len(arr))]

def bubble_sort(arr): #Inefficient but included for comparison.
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1] :
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

def kth_smallest(arr, k):
    """Finds the kth smallest element using a sorted array."""
    return sorted(arr)[k-1]

# Add more functions for linked list sorting and string sorting here.

```