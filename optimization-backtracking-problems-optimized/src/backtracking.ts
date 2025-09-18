```typescript
// N-Queens
function solveNQueens(n: number): string[][] {
  const result: string[][] = [];
  const board: number[] = new Array(n).fill(0); //Represent queen positions

  function isSafe(row: number, col: number): boolean {
    for (let i = 0; i < row; i++) {
      // Check column and diagonals
      if (board[i] === col || Math.abs(board[i] - col) === row - i) return false;
    }
    return true;
  }

  function backtrack(row: number): void {
    if (row === n) {
      result.push(board.map(col => {
        const rowStr = new Array(n).fill('.');
        rowStr[col] = 'Q';
        return rowStr.join('');
      }));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (isSafe(row, col)) {
        board[row] = col;
        backtrack(row + 1);
      }
    }
  }

  backtrack(0);
  return result;
}

// Subsets (Example - Other functions can be added similarly)
function subsets(nums: number[]): number[][] {
  const result: number[][] = [];
  const subset: number[] = [];

  function backtrack(index: number): void {
    result.push([...subset]); // Add current subset

    for (let i = index; i < nums.length; i++) {
      subset.push(nums[i]);
      backtrack(i + 1);
      subset.pop();
    }
  }

  backtrack(0);
  return result;
}

export {solveNQueens, subsets};
```