```typescript
import { fibonacciIterative, fibonacciRecursiveMemo } from '../src/fibonacci';

test('Fibonacci Iterative', () => {
  expect(fibonacciIterative(0)).toBe(0);
  expect(fibonacciIterative(1)).toBe(1);
  expect(fibonacciIterative(2)).toBe(1);
  expect(fibonacciIterative(5)).toBe(5);
  expect(fibonacciIterative(10)).toBe(55);
});

test('Fibonacci Recursive Memo', () => {
  expect(fibonacciRecursiveMemo(0)).toBe(0);
  expect(fibonacciRecursiveMemo(1)).toBe(1);
  expect(fibonacciRecursiveMemo(2)).toBe(1);
  expect(fibonacciRecursiveMemo(5)).toBe(5);
  expect(fibonacciRecursiveMemo(10)).toBe(55);
});

```