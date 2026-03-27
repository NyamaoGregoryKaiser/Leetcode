import pytest
from problems.problem_05_sudoku_solver import SudokuSolver, OptimizedSudokuSolver, solve_sudoku, print_board
import copy

# Example solvable Sudoku board (0 for empty)
solvable_board_1 = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
]

solved_board_1 = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
]

# Another solvable board
solvable_board_2 = [
    [0,0,3,0,2,0,6,0,0],
    [9,0,0,3,0,5,0,0,1],
    [0,0,1,8,0,6,4,0,0],
    [0,0,8,1,0,2,9,0,0],
    [7,0,0,0,0,0,0,0,8],
    [0,0,6,7,0,8,2,0,0],
    [0,0,2,6,0,9,5,0,0],
    [8,0,0,2,0,3,0,0,9],
    [0,0,5,0,1,0,3,0,0]
]

solved_board_2 = [
    [4,8,3,9,2,1,6,5,7],
    [9,6,7,3,4,5,8,2,1],
    [2,5,1,8,7,6,4,9,3],
    [5,4,8,1,3,2,9,7,6],
    [7,2,9,5,6,4,1,3,8],
    [1,3,6,7,9,8,2,4,5],
    [3,7,2,6,8,9,5,1,4],
    [8,1,4,2,5,3,7,6,9],
    [6,9,5,4,1,7,3,8,2]
]

# Almost full board (edge case: few empty cells)
solvable_board_3_almost_full = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 0, 9] # Only one empty cell (0, 7) should be 7
]
solved_board_3_almost_full = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
]


# Test for SudokuSolver (simple version)
def test_sudoku_solver_1_simple():
    board = copy.deepcopy(solvable_board_1)
    solver = SudokuSolver()
    assert solver.solve(board) == True
    assert solver.get_solved_board() == solved_board_1

def test_sudoku_solver_2_simple():
    board = copy.deepcopy(solvable_board_2)
    solver = SudokuSolver()
    assert solver.solve(board) == True
    assert solver.get_solved_board() == solved_board_2

def test_sudoku_solver_almost_full_simple():
    board = copy.deepcopy(solvable_board_3_almost_full)
    solver = SudokuSolver()
    assert solver.solve(board) == True
    assert solver.get_solved_board() == solved_board_3_almost_full

# Test for OptimizedSudokuSolver
def test_sudoku_solver_1_optimized():
    board = copy.deepcopy(solvable_board_1)
    solver = OptimizedSudokuSolver(board)
    assert solver.solve() == True
    assert solver.get_solved_board() == solved_board_1

def test_sudoku_solver_2_optimized():
    board = copy.deepcopy(solvable_board_2)
    solver = OptimizedSudokuSolver(board)
    assert solver.solve() == True
    assert solver.get_solved_board() == solved_board_2

def test_sudoku_solver_almost_full_optimized():
    board = copy.deepcopy(solvable_board_3_almost_full)
    solver = OptimizedSudokuSolver(board)
    assert solver.solve() == True
    assert solver.get_solved_board() == solved_board_3_almost_full

# Test the wrapper function `solve_sudoku`
def test_solve_sudoku_wrapper_1():
    board = copy.deepcopy(solvable_board_1)
    solved = solve_sudoku(board)
    assert solved == solved_board_1

def test_solve_sudoku_wrapper_2():
    board = copy.deepcopy(solvable_board_2)
    solved = solve_sudoku(board)
    assert solved == solved_board_2

def test_solve_sudoku_wrapper_almost_full():
    board = copy.deepcopy(solvable_board_3_almost_full)
    solved = solve_sudoku(board)
    assert solved == solved_board_3_almost_full

# Test unsolvable board (if a problem allows it, this would return None/False)
def test_sudoku_unsolvable():
    # Create an unsolvable board by placing conflicting numbers
    unsolvable_board = copy.deepcopy(solvable_board_1)
    unsolvable_board[0][2] = 1 # original 0, changed to 1, valid so far
    unsolvable_board[0][3] = 1 # original 0, but now 1 is already in row 0 at [0][2]
    
    simple_solver = SudokuSolver()
    board_copy_simple = copy.deepcopy(unsolvable_board)
    assert simple_solver.solve(board_copy_simple) == False

    optimized_solver = OptimizedSudokuSolver(unsolvable_board)
    board_copy_optimized = copy.deepcopy(unsolvable_board)
    # Re-initialize optimized_solver with the copy
    optimized_solver_reinit = OptimizedSudokuSolver(board_copy_optimized)
    assert optimized_solver_reinit.solve() == False

    board_copy_wrapper = copy.deepcopy(unsolvable_board)
    assert solve_sudoku(board_copy_wrapper) == None

# Test already solved board
def test_sudoku_already_solved():
    board = copy.deepcopy(solved_board_1)
    simple_solver = SudokuSolver()
    assert simple_solver.solve(board) == True
    assert simple_solver.get_solved_board() == solved_board_1

    optimized_solver = OptimizedSudokuSolver(board)
    assert optimized_solver.solve() == True
    assert optimized_solver.get_solved_board() == solved_board_1

    board_copy_wrapper = copy.deepcopy(solved_board_1)
    assert solve_sudoku(board_copy_wrapper) == solved_board_1

# Test helper function _is_valid for SudokuSolver
def test_is_valid_simple_solver():
    solver = SudokuSolver()
    solver.board = copy.deepcopy(solvable_board_1)

    # Test valid placement
    assert solver._is_valid(4, 0, 2) == True # 4 is not in row 0, col 2, or box (0,0)
    assert solver._is_valid(1, 0, 7) == True # 1 is not in row 0, col 7, or box (0,2)

    # Test invalid placement - row conflict
    assert solver._is_valid(5, 0, 2) == False # 5 is already in board[0][0]

    # Test invalid placement - column conflict
    assert solver._is_valid(6, 0, 0) == False # 6 is already in board[1][0]

    # Test invalid placement - box conflict
    assert solver._is_valid(5, 1, 1) == False # 5 is already in box (0,0) (board[0][0])

# Test helper function _is_valid for OptimizedSudokuSolver
def test_is_valid_optimized_solver():
    board = copy.deepcopy(solvable_board_1)
    solver = OptimizedSudokuSolver(board)

    # Test valid placement
    assert solver._is_valid(4, 0, 2) == True # 4 is not in row 0, col 2, or box (0,0)
    assert solver._is_valid(1, 0, 7) == True # 1 is not in row 0, col 7, or box (0,2)

    # Test invalid placement - row conflict
    assert solver._is_valid(5, 0, 2) == False # 5 is already in row 0 set

    # Test invalid placement - column conflict
    assert solver._is_valid(6, 0, 0) == False # 6 is already in col 0 set

    # Test invalid placement - box conflict
    assert solver._is_valid(5, 1, 1) == False # 5 is already in box (0,0) set