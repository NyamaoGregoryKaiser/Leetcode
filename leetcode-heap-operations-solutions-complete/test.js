// test.js (using Jest)
const {MinHeap, heapSort} = require('./heap');

describe('MinHeap', () => {
  it('should insert and extract elements correctly', () => {
    const heap = new MinHeap();
    heap.insert(5);
    heap.insert(3);
    heap.insert(10);
    heap.insert(1);
    expect(heap.extractMin()).toBe(1);
    expect(heap.extractMin()).toBe(3);
    expect(heap.size()).toBe(2);
  });
});


describe('heapSort', () => {
  it('should sort an array correctly', () => {
    const arr = [5, 2, 8, 1, 9, 4];
    const sortedArr = heapSort(arr);
    expect(sortedArr).toEqual([1, 2, 4, 5, 8, 9]);
  });

  it('should handle empty array', () => {
    expect(heapSort([])).toEqual([]);
  });


});


//Add more tests for other problems (Problems 2-5)