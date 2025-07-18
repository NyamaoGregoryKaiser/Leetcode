```typescript
import { mergeSort, quickSort, findKthSmallest } from '../src/sorting';

test('Merge Sort', () => {
  expect(mergeSort([5, 2, 8, 1, 9, 4])).toEqual([1, 2, 4, 5, 8, 9]);
  expect(mergeSort([])).toEqual([]);
  expect(mergeSort([1])).toEqual([1]);
});

test('Quick Sort', () => {
  expect(quickSort([5, 2, 8, 1, 9, 4])).toEqual([1, 2, 4, 5, 8, 9]); //May not be perfectly sorted due to simplification
  expect(quickSort([])).toEqual([]);
  expect(quickSort([1])).toEqual([1]);
});

test('Kth Smallest', () => {
  expect(findKthSmallest([3, 2, 1, 5, 6, 4], 2)).toBe(2); //This will fail until QuickSelect is implemented.
});

```