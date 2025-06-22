#include "heap.h"
#include <cassert>
#include <vector>

void testMinHeap() {
    MinHeap<int> minHeap(10);
    minHeap.insert(5);
    minHeap.insert(3);
    minHeap.insert(10);
    minHeap.insert(1);
    assert(minHeap.extractMin() == 1);
    assert(minHeap.extractMin() == 3);
    // Add more assertions...
}

int main() {
  testMinHeap();
  std::cout << "All test cases passed!" << std::endl;
  return 0;
}