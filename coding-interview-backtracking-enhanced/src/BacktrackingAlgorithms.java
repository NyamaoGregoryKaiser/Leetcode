```java
package src;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class BacktrackingAlgorithms {

    // N-Queens
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> result = new ArrayList<>();
        int[] board = new int[n]; // Represents queen positions in each column
        solveNQueensHelper(board, 0, result);
        return result;
    }

    private void solveNQueensHelper(int[] board, int row, List<List<String>> result) {
        if (row == board.length) {
            result.add(constructBoard(board));
            return;
        }

        for (int col = 0; col < board.length; col++) {
            if (isSafe(board, row, col)) {
                board[row] = col;
                solveNQueensHelper(board, row + 1, result);
            }
        }
    }

    private boolean isSafe(int[] board, int row, int col) {
        //Check vertically and diagonally
        for (int i = 0; i < row; i++) {
            if (board[i] == col || Math.abs(board[i] - col) == row - i) return false;
        }
        return true;
    }

    private List<String> constructBoard(int[] board) {
        List<String> result = new ArrayList<>();
        for (int i = 0; i < board.length; i++) {
            StringBuilder sb = new StringBuilder();
            for (int j = 0; j < board.length; j++) {
                sb.append(j == board[i] ? "Q" : ".");
            }
            result.add(sb.toString());
        }
        return result;
    }


    //Subset Sum (example - needs completion)
    public List<List<Integer>> subsetSum(int[] nums, int target) {
        List<List<Integer>> result = new ArrayList<>();
        List<Integer> currentSubset = new ArrayList<>();
        subsetSumHelper(nums, target, 0, currentSubset, result);
        return result;
    }

    private void subsetSumHelper(int[] nums, int target, int index, List<Integer> currentSubset, List<List<Integer>> result){
        if(target == 0){
            result.add(new ArrayList<>(currentSubset));
            return;
        }
        if(target < 0 || index >= nums.length) return;

        //Include
        currentSubset.add(nums[index]);
        subsetSumHelper(nums, target - nums[index], index + 1, currentSubset, result);

        //Exclude
        currentSubset.remove(currentSubset.size() - 1);
        subsetSumHelper(nums, target, index + 1, currentSubset, result);
    }

    // ... (Add Sudoku Solver, Permutation Generator, Graph Coloring) ...
}
```