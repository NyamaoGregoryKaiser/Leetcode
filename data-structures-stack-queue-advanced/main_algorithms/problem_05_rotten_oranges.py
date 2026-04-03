from collections import deque
from typing import List

"""
Problem 5: Rotten Oranges

You are given an m x n grid where each cell can have one of three values:
- 0 representing an empty cell,
- 1 representing a fresh orange, or
- 2 representing a rotten orange.

Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no fresh oranges remain.
If it is impossible to make all fresh oranges rotten, return -1.

Example 1:
Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4
Explanation:
Minute 0:
[2,1,1]
[1,1,0]
[0,1,1]

Minute 1:
[2,2,1]
[2,1,0]
[0,1,1]

Minute 2:
[2,2,2]
[2,2,0]
[0,1,1]

Minute 3:
[2,2,2]
[2,2,0]
[0,2,1]

Minute 4:
[2,2,2]
[2,2,0]
[0,2,2]

Example 2:
Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
Explanation: The fresh orange at (2,0) (zero-indexed) cannot be reached.

Example 3:
Input: grid = [[0,2]]
Output: 0
Explanation: There are no fresh oranges, so 0 minutes is needed.

Constraints:
m == grid.length
n == grid[i].length
1 <= m, n <= 10
grid[i][j] is 0, 1, or 2.
"""

class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        """
        Calculates the minimum time for all fresh oranges to rot using Breadth-First Search (BFS).

        This problem is a classic multi-source BFS problem. All initial rotten oranges
        start rotting their neighbors simultaneously, spreading layer by layer.
        BFS naturally finds the shortest path (minimum time) in an unweighted graph.

        Algorithm:
        1. **Initialization:**
           - Get grid dimensions `rows` and `cols`.
           - Initialize a `queue` (deque) for BFS.
           - Count `fresh_oranges`.
           - Iterate through the grid:
             - If `grid[r][c] == 2` (rotten), add `(r, c)` to the `queue`.
             - If `grid[r][c] == 1` (fresh), increment `fresh_oranges`.
           - Initialize `minutes = 0`.

        2. **Edge Cases:**
           - If `fresh_oranges == 0`, return `0` (no fresh oranges to rot).

        3. **BFS Traversal:**
           - While the `queue` is not empty and there are still `fresh_oranges`:
             - Increment `minutes` (this signifies one minute has passed, and all oranges
               at the current "level" in the queue will rot their neighbors).
             - Process all oranges currently in the queue (this is important for
               level-by-level BFS, ensuring minutes increment correctly).
             - `size = len(queue)`
             - Loop `size` times:
               - Dequeue `(r, c)`.
               - Check its 4-directional neighbors `(nr, nc)`:
                 - `dr = [-1, 1, 0, 0]`
                 - `dc = [0, 0, -1, 1]`
                 - For each neighbor:
                   - Check boundaries (`0 <= nr < rows`, `0 <= nc < cols`).
                   - If the neighbor is a `fresh_orange` (`grid[nr][nc] == 1`):
                     - Mark it as `rotten` (`grid[nr][nc] = 2`).
                     - Decrement `fresh_oranges`.
                     - Enqueue `(nr, nc)`.

        4. **Result:**
           - After the BFS loop:
             - If `fresh_oranges == 0`, all fresh oranges have rotted. Return `minutes`.
             - Otherwise, some fresh oranges could not be reached. Return `-1`.

        Time Complexity: O(R * C), where R is the number of rows and C is the number of columns.
                         Each cell is visited and processed at most a constant number of times
                         (once added to the queue, and its neighbors are checked).
        Space Complexity: O(R * C) in the worst case.
                          The queue can hold up to all cells in the grid (e.g., if all oranges are rotten).
        """
        rows, cols = len(grid), len(grid[0])
        
        # Queue to store the positions of rotten oranges (r, c)
        q = deque()
        
        # Count fresh oranges and add initial rotten oranges to the queue
        fresh_oranges = 0
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == 2:
                    q.append((r, c))
                elif grid[r][c] == 1:
                    fresh_oranges += 1
        
        # If there are no fresh oranges initially, 0 minutes are needed.
        if fresh_oranges == 0:
            return 0
        
        minutes = 0
        
        # Directions for 4-directional adjacency (up, down, left, right)
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)] # dr, dc

        # Perform BFS
        while q and fresh_oranges > 0:
            # Increment minutes for each "level" of rotting spread
            minutes += 1
            
            # Process all rotten oranges at the current minute (current level)
            current_level_size = len(q)
            for _ in range(current_level_size):
                r, c = q.popleft() # Dequeue a rotten orange
                
                # Check neighbors
                for dr, dc in directions:
                    nr, nc = r + dr, c + dc
                    
                    # Check boundary conditions and if the neighbor is a fresh orange
                    if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                        # This fresh orange rots
                        grid[nr][nc] = 2
                        fresh_oranges -= 1
                        q.append((nr, nc)) # Add newly rotten orange to queue for next minute's spread
        
        # After BFS, if all fresh oranges are rotten, return minutes.
        # Otherwise, some fresh oranges remain unrotten.
        return minutes if fresh_oranges == 0 else -1

# Example usage:
if __name__ == "__main__":
    sol = Solution()

    # Test cases
    grid1 = [[2,1,1],[1,1,0],[0,1,1]]
    print(f"Grid: {grid1} -> Minutes to rot: {sol.orangesRotting(grid1)}") # Expected: 4

    grid2 = [[2,1,1],[0,1,1],[1,0,1]]
    print(f"Grid: {grid2} -> Minutes to rot: {sol.orangesRotting(grid2)}") # Expected: -1

    grid3 = [[0,2]]
    print(f"Grid: {grid3} -> Minutes to rot: {sol.orangesRotting(grid3)}") # Expected: 0

    grid4 = [[0]]
    print(f"Grid: {grid4} -> Minutes to rot: {sol.orangesRotting(grid4)}") # Expected: 0

    grid5 = [[1]]
    print(f"Grid: {grid5} -> Minutes to rot: {sol.orangesRotting(grid5)}") # Expected: -1

    grid6 = [[2,2,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1]]
    print(f"Grid: {grid6} -> Minutes to rot: {sol.orangesRotting(grid6)}") # Expected: 4 (spread from two initial sources)

    grid7 = [[1,1,1],[1,1,1],[1,1,2]]
    print(f"Grid: {grid7} -> Minutes to rot: {sol.orangesRotting(grid7)}") # Expected: 4