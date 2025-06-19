```typescript
import { solveNQueens, subsetSum } from '../src/backtracking';

test('N-Queens: 4x4 board', () => {
  const solutions = solveNQueens(4);
  expect(solutions.length).toBeGreaterThan(0); // Check for solutions
  // Add more specific assertions as needed
});

test('Subset Sum: simple case', () => {
  expect(subsetSum([2, 3, 7, 8, 10], 11)).toBe(true); // Example test case
  expect(subsetSum([1,2,3], 7)).toBe(false);
});

// Add more test cases for other functions
```