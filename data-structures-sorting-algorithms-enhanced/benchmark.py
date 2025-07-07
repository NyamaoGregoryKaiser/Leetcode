```python
import time
import random
from sorting_algorithms import merge_sort, quick_sort, heap_sort, bubble_sort

def benchmark(sort_func, arr_size):
    arr = [random.randint(1, 1000) for _ in range(arr_size)]
    start_time = time.time()
    sort_func(arr.copy()) #Copy to avoid modifying the original
    end_time = time.time()
    return end_time - start_time


if __name__ == "__main__":
    arr_sizes = [100, 1000, 10000, 100000] # Adjust as needed
    functions = [merge_sort, quick_sort, heap_sort, bubble_sort]
    function_names = ["Merge Sort", "Quick Sort", "Heap Sort", "Bubble Sort"]

    for size in arr_sizes:
        print(f"Array Size: {size}")
        for i, func in enumerate(functions):
            time_taken = benchmark(func, size)
            print(f"  {function_names[i]}: {time_taken:.4f} seconds")
        print("-" * 20)


```