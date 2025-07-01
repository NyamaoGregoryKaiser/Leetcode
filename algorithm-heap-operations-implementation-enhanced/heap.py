import heapq

class MinHeap:
    def __init__(self, data=None):
        self.heap = data if data else []
        heapq.heapify(self.heap)

    def push(self, item):
        heapq.heappush(self.heap, item)

    def pop(self):
        return heapq.heappop(self.heap)

    def peek(self):
        return self.heap[0] if self.heap else None

    def is_empty(self):
        return len(self.heap) == 0

class MaxHeap:
    def __init__(self, data=None):
        self.heap = data if data else []
        heapq.heapify(self.heap)
        self.heap = [-x for x in self.heap]  #negate for max-heap

    def push(self, item):
        heapq.heappush(self.heap, -item)

    def pop(self):
        return -heapq.heappop(self.heap)

    def peek(self):
        return -self.heap[0] if self.heap else None

    def is_empty(self):
        return len(self.heap) == 0