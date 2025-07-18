```typescript
// Merge Sort
function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left: number[], right: number[]): number[] {
  let result: number[] = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}


// Quick Sort (simplified -  a more robust implementation would handle edge cases better)
function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = arr.slice(1).filter(x => x <= pivot);
  const right = arr.slice(1).filter(x => x > pivot);
  return quickSort(left).concat([pivot], quickSort(right));
}


// Heap Sort (requires a Max-Heap implementation - omitted for brevity)
function heapSort(arr: number[]): number[] {
    //Implementation of Heap Sort using a Max Heap would go here.
    throw new Error("Heap Sort not yet implemented");
}


// Kth Smallest Element (using QuickSelect -  a simplified version)
function findKthSmallest(arr: number[], k: number): number {
    if (k <= 0 || k > arr.length) throw new Error("Invalid k");
    //Implementation of QuickSelect would go here.
    throw new Error("QuickSelect not yet implemented");
}


export { mergeSort, quickSort, heapSort, findKthSmallest };
```