```typescript
// Helper function to print a 2D array
function printMatrix(matrix: number[][]): void {
    for (let i = 0; i < matrix.length; i++) {
        console.log(matrix[i].join(" "));
    }
    console.log("\n");
}


// N-Queens
function solveNQueens(n: number): number[][][] {
  const results: number[][][] = [];
  const board: number[] = new Array(n).fill(0);

  function isSafe(row: number, col: number): boolean {
    for (let i = 0; i < row; i++) {
      if (board[i] === col || Math.abs(board[i] - col) === row - i) {
        return false;
      }
    }
    return true;
  }

  function backtrack(row: number): void {
    if (row === n) {
      results.push(board.map((col) => Array(n).fill(0).map((_,i)=>i===col?1:0))); // Convert to matrix representation
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
  return results;
}


// Subset Sum (example - needs completion)
function subsetSum(nums: number[], target: number): number[][] {
    const results: number[][] = [];
    const subset: number[] = [];

    function backtrack(index: number, currentSum: number) {
        if (currentSum === target) {
            results.push([...subset]); //Important: create a copy to avoid modification
            return;
        }
        if (index >= nums.length || currentSum > target) {
            return;
        }

        // Include the current number
        subset.push(nums[index]);
        backtrack(index + 1, currentSum + nums[index]);

        // Exclude the current number
        subset.pop();
        backtrack(index + 1, currentSum);
    }

    backtrack(0, 0);
    return results;
}

// ... (Add Sudoku Solver, Combination Sum, Graph Coloring)

export {solveNQueens, subsetSum};
```