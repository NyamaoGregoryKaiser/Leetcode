```typescript
// src/utils.ts
// Implement benchmarking functions here.  For example:
function benchmark(func: () => void, iterations: number): number {
  const startTime = performance.now();
  for (let i = 0; i < iterations; i++) {
    func();
  }
  const endTime = performance.now();
  return endTime - startTime;
}

export { benchmark };
```