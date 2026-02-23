```cpp
#ifndef WORD_SEARCH_HPP
#define WORD_SEARCH_HPP

#include <vector>
#include <string>

/**
 * @brief Solution for the Word Search problem.
 *
 * Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.
 * The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are
 * horizontally or vertically neighboring. The same letter cell may not be used more than once.
 *
 * @complexity
 * Time Complexity: O(M * N * 3^L) - Where M is the number of rows, N is the number of columns,
 * and L is the length of the word.
 * We iterate through each cell (M*N). From each cell, we perform a DFS. In the DFS,
 * at each step, we have at most 3 directions to explore (since we cannot go back to the cell we just came from).
 * The length of the path is L. So, roughly 3^L operations per starting cell.
 *
 * Space Complexity: O(L) - For the recursion stack depth (at most L, the length of the word).
 * No additional data structures are used beyond modifying the board in-place (and then backtracking it).
 */
class WordSearch {
public:
    /**
     * @brief Checks if a given word exists in the board.
     * @param board The character grid.
     * @param word The word to search for.
     * @return True if the word is found, false otherwise.
     */
    bool exist(std::vector<std::vector<char>>& board, std::string word) {
        if (word.empty()) {
            return true;
        }
        if (board.empty() || board[0].empty()) {
            return false;
        }

        int m = board.size();
        int n = board[0].size();

        // Iterate through each cell of the board as a potential starting point for the word.
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                // If the current cell matches the first character of the word, start a DFS.
                if (board[r][c] == word[0]) {
                    if (dfs(board, word, 0, r, c, m, n)) {
                        return true; // Word found!
                    }
                }
            }
        }

        return false; // Word not found after checking all possible starting points.
    }

private:
    /**
     * @brief Recursive DFS (Depth-First Search) helper function for word search.
     * This function uses backtracking by temporarily marking visited cells.
     * @param board The character grid (mutable, for in-place marking).
     * @param word The word to search for.
     * @param index The current character index in `word` that we are trying to match.
     * @param r The current row coordinate.
     * @param c The current column coordinate.
     * @param m The number of rows in the board.
     * @param n The number of columns in the board.
     * @return True if the path from (r, c) leads to a full match of the remaining word, false otherwise.
     */
    bool dfs(std::vector<std::vector<char>>& board, const std::string& word,
             int index, int r, int c, int m, int n) {
        // Base case 1: If we have successfully matched all characters in the word.
        if (index == word.length()) {
            return true;
        }

        // Base case 2: Check boundaries and character match.
        // If current position is out of bounds, or if the character at board[r][c]
        // does not match the current character of the word, then this path is invalid.
        if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] != word[index]) {
            return false;
        }

        // Choose: Mark the current cell as visited to prevent reusing it.
        // A common trick is to change its character to a special value (e.g., '#').
        char original_char = board[r][c];
        board[r][c] = '#'; // Mark as visited

        // Explore: Recursively check all 4 adjacent directions (up, down, left, right).
        // If any of these paths return true, it means the word is found.
        bool found = dfs(board, word, index + 1, r + 1, c, m, n) || // Down
                     dfs(board, word, index + 1, r - 1, c, m, n) || // Up
                     dfs(board, word, index + 1, r, c + 1, m, n) || // Right
                     dfs(board, word, index + 1, r, c - 1, m, n);   // Left

        // Unchoose (Backtrack): Restore the board cell to its original character.
        // This is crucial because other starting paths might need to use this cell later.
        board[r][c] = original_char;

        return found;
    }
    /*
    Alternative approach discussion:
    Instead of modifying the board in-place, one could use a separate `visited` 2D boolean array.
    This avoids modifying the original board and then restoring it, which might be cleaner
    conceptually for some. However, modifying in-place often leads to slightly better performance
    due to cache locality and less memory overhead for the `visited` array. Both are valid
    backtracking approaches for this problem. The time/space complexity remains similar.
    */
};

#endif // WORD_SEARCH_HPP
```