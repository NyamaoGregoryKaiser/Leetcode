#include "heap.h"
#include <iostream>
#include <vector>

int main() {
    // Example usage of MinHeap for Find Kth Largest Element
    std::vector<int> nums = {3, 2, 1, 5, 6, 4};
    int k = 2;
    MinHeap<int> minHeap(k);
    for (int num : nums) {
        minHeap.insert(num);
    }
    std::cout << "Kth largest element: " << minHeap.peekMin() << std::endl; //Should print 4

    return 0;
}