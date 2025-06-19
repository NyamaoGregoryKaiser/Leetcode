```python
import heapq

def fractional_knapsack(capacity, items):
    """
    Fractional Knapsack using Greedy approach.

    Args:
        capacity: Knapsack weight capacity.
        items: List of (value, weight) tuples.

    Returns:
        Total value of items in the knapsack.
    """
    items.sort(key=lambda x: x[0] / x[1], reverse=True)  # Sort by value-to-weight ratio
    total_value = 0
    remaining_capacity = capacity
    for value, weight in items:
        if weight <= remaining_capacity:
            total_value += value
            remaining_capacity -= weight
        else:
            fraction = remaining_capacity / weight
            total_value += value * fraction
            break
    return total_value

# Add other algorithms (Huffman Coding, Activity Selection, Coin Change) here...


def huffman_coding(frequencies):
    """Huffman Coding Algorithm"""
    heap = [(freq, char) for char, freq in frequencies.items()]
    heapq.heapify(heap)

    while len(heap) > 1:
        lo = heapq.heappop(heap)
        hi = heapq.heappop(heap)
        for pair in lo[1:]:
            pair[0] = pair[0] + hi[0]
        heapq.heappush(heap,(lo[0] + hi[0],lo[1:] + hi[1:]))

    return heap[0]


def activity_selection(activities):
    """Activity Selection Problem"""
    activities.sort(key=lambda x: x[1])  # Sort by finish time
    selected_activities = []
    last_finish_time = 0
    for start, finish in activities:
        if start >= last_finish_time:
            selected_activities.append((start, finish))
            last_finish_time = finish
    return selected_activities

def min_coins(amount, coins):
    """Coin Change (Minimum Coins) using Greedy approach."""
    coins.sort(reverse=True)  # Sort coins in descending order
    num_coins = 0
    remaining_amount = amount
    for coin in coins:
        while remaining_amount >= coin:
            remaining_amount -= coin
            num_coins += 1
    if remaining_amount == 0:
        return num_coins
    else:
        return -1 # No solution found


```