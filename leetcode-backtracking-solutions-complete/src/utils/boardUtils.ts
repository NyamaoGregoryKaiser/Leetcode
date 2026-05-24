/**
 * @fileoverview Utility functions for board-related problems, e.g., N-Queens.
 * Provides functions to visualize the board.
 */

/**
 * Converts a 2D array board representation into a string array representation
 * where 'Q' denotes a queen and '.' an empty space.
 * This is useful for N-Queens problem output format.
 *
 * @param board The N x N board as a 2D array of booleans (true for queen, false for empty).
 * @returns A string array where each string represents a row on the board.
 */
export function formatBoard(board: boolean[][]): string[] {
    return board.map(row =>
        row.map(cell => (cell ? 'Q' : '.')).join('')
    );
}

/**
 * Prints a formatted board to the console.
 * Useful for debugging and visualizing N-Queens solutions.
 *
 * @param board A string array representation of the board.
 */
export function printBoard(board: string[]): void {
    if (!board || board.length === 0) {
        console.log("Empty board.");
        return;
    }
    const n = board.length;
    console.log(`Board (${n}x${n}):`);
    console.log("--------------------");
    board.forEach(row => console.log(row));
    console.log("--------------------");
}

/**
 * Creates an empty N x N board initialized with false (empty cells).
 *
 * @param n The size of the board (N).
 * @returns An N x N 2D boolean array.
 */
export function createEmptyBoard(n: number): boolean[][] {
    return Array.from({ length: n }, () => Array(n).fill(false));
}